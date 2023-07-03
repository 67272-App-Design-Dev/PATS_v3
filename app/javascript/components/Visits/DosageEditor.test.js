import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "@testing-library/react";
import DosageEditor from "./DosageEditor";
import selectEvent from "react-select-event";

const visit = {
  id: "1",
};

const mockDosage = {
  id: "333",
};

// This mock server allows us to specify what we want to be returned
// when http calls are made to certain endpoints from the frontend.
// This allows us to run these as standalone frontend tests.
const server = setupServer(
  rest.get("/v1/visits/1/medicines", (req, res, ctx) => {
    return res(
      ctx.json({
        medicines: [
          {
            id: "1",
            name: "Tylenol",
          },
        ],
      })
    );
  }),
  rest.post("/v1/visits/1/create_dosage", (req, res, ctx) => {
    return res(ctx.json(mockDosage));
  })
);
let wrapper;

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  wrapper.unmount();
});
afterAll(() => server.close());

test("loads medication options and can enter and submit form", async () => {
  const onCreateDosage = jest.fn();
  server.printHandlers();

  wrapper = render(
    <DosageEditor visit={visit} onCreateDosage={onCreateDosage} />
  );
  // tests should mimic how a user would use the app.
  // in this case, we look for label text and buttons

  // this waits until Medicine appears in the DOM
  await screen.findByLabelText("Medicine");
  // select the form fields and click submit
  await selectEvent.select(screen.getByLabelText("Medicine"), ["Tylenol"]);

  const unitsInput = screen.getByLabelText("Units Given");
  await fireEvent.change(unitsInput, { target: { value: "3" } });

  const discountInput = screen.getByLabelText("Discount");
  await fireEvent.change(discountInput, { target: { value: "10" } });

  const submit = screen.getByRole("button");

  await fireEvent.click(submit);
  // wait for the button to api callback to finish
  await screen.findAllByText("Create", { disabled: false });
  expect(onCreateDosage).toHaveBeenCalledWith(mockDosage);
});
