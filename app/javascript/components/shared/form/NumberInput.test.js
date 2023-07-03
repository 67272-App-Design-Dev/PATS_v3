import { fireEvent, render, screen } from "@testing-library/react";
import NumberInput from "./NumberInput";
import React from "react";

test("renders provided value", async () => {
  const value = "1234";
  const setValue = jest.fn();
  render(<NumberInput value={value} setValue={setValue} />);

  expect(screen.getByRole("spinbutton").value).toBe(value);
});

test("calls provided callback when changing value", async () => {
  const setValue = jest.fn();
  const newValue = "888";
  render(<NumberInput setValue={setValue} />);
  // tests should mimic how a user would use the app.
  // in this case, we look for a input and change it
  const input = screen.getByRole("spinbutton");
  fireEvent.change(input, { target: { value: newValue } });

  expect(setValue).toHaveBeenCalledWith(newValue);
});
