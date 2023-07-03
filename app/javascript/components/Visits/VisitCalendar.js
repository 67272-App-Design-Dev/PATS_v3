import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { get, post, put } from "../../api";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import NumberInput from "../shared/form/NumberInput";
import Select from "../shared/form/Select";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const DATE_FORMAT = "YYYY-MM-DD";

function visitToEvent(visit) {
  const visitData = visit.data.attributes;
  const startDate = moment(visitData.date, DATE_FORMAT);
  const pet = visitData.pet.data.attributes;
  return {
    start: startDate.toDate(),
    end: startDate.add(1, "day").toDate(),
    allDay: true,
    title: displayPet(pet),
    id: visitData.id,
  };
}

function displayPet(pet) {
  return `Pet ${pet.name} (${pet.animal.name}) - ${pet.owner.first_name} ${pet.owner.last_name}`;
}

function NewPetForm({ newDate, setNewDate, setEditorOpen, newEvent }) {
  const [weight, setWeight] = React.useState();
  const [petId, setPetId] = React.useState();
  const [pets, setPets] = React.useState();

  // useEffect will trigger any time the dependency array (second argument) changes.
  // in this case, the dependency array is empty, so it will only fire on load
  React.useEffect(() => {
    get("/v1/calendar/pets").then((response) => {
      setPets(
        response.pets.map((pet) => {
          const petData = pet.data.attributes;
          return {
            label: displayPet(petData),
            value: petData.id,
          };
        })
      );
    });
  }, []);

  if (!pets) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h4>Editor</h4>
      <label>Date</label>
      <br />
      {moment(newDate, DATE_FORMAT).format("MMMM Do YYYY")}
      <br />
      <label>Pet</label>
      <Select setValue={setPetId} options={pets} />
      <label>Weight</label>
      <NumberInput value={weight} setValue={setWeight} />
      <a onClick={() => setEditorOpen(false)}>cancel</a>{" "}
      <a
        onClick={() => {
          newEvent({
            pet_id: petId,
            date: newDate,
            weight,
          });
          setEditorOpen(false);
          setNewDate();
        }}
      >
        save
      </a>
    </div>
  );
}

const VisitCalendar = ({ visits }) => {
  const [events, setEvents] = React.useState(visits.map(visitToEvent));
  // pet name: owner: animal type
  // ideally if you click on it it'll go to visit show for that visit
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [newDate, setNewDate] = React.useState();

  function onEventDrop(data) {
    const { start, end, event } = data;
    const newDate = moment(start, DATE_FORMAT);
    const payload = { date: newDate.format(DATE_FORMAT) };
    put(`/v1/calendar/${event.id}/update`, { visit: payload }).then(
      (updatedVisit) => {
        setEvents(
          events.map((otherEvent) => {
            // replace the existing element with the updated json
            if (otherEvent.id === updatedVisit.data.attributes.id) {
              return visitToEvent(updatedVisit);
            }
            return otherEvent;
          })
        );
      }
    );
  }

  function newEvent(visit) {
    post("/v1/calendar/create", { visit }).then((newVisit) => {
      setEvents(events.concat(visitToEvent(newVisit)));
    });
  }

  function onSelectSlot(data) {
    if (!editorOpen) {
      setNewDate(data.start);
      setEditorOpen(true);
    }
  }

  if (!events || events.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div className="VisitCalendar">
      <DnDCalendar
        defaultDate={events[events.length - 1].start}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onSelectSlot={onSelectSlot}
        onDoubleClickEvent={(e) => {
          // navigate to the visit clicked on
          window.location = `/visits/${e.id}`;
        }}
        selectable
        style={{ height: "100vh" }}
      />
      {editorOpen && (
        <NewPetForm
          setNewDate={setNewDate}
          setEditorOpen={setEditorOpen}
          newDate={newDate}
          newEvent={newEvent}
        />
      )}
    </div>
  );
};

export default VisitCalendar;
