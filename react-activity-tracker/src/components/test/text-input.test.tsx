/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "../form-inputs/text-input";

describe("TextInput Component", () => {
  test("renders input with correct type", () => {
    render(<TextInput type="email" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "email");
  });

  test("renders input with additional props", () => {
    render(<TextInput type="text" placeholder="Enter text" required />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeRequired();
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<TextInput type="text" onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "Hello" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
