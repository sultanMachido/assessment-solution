/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import ActivityDisplay from "../activity-display";
import "@testing-library/jest-dom";

describe("ActivityDisplay", () => {
  const mockActivity = {
    text: "User X logged in",
    timestamp: "12:34 PM",
  };

  it("renders the activity text and timestamp correctly", () => {
    render(<ActivityDisplay index={1} activity={mockActivity} />);

    const activityText = screen.getByText(mockActivity.text);
    expect(activityText).toBeInTheDocument();

    const timestamp = screen.getByText(mockActivity.timestamp);
    expect(timestamp).toBeInTheDocument();
  });

  it("applies the correct styles to the list item", () => {
    const { container } = render(
      <ActivityDisplay index={1} activity={mockActivity} />
    );

    const listItem = container.querySelector("li");
    expect(listItem).toHaveClass(
      "flex justify-between py-5 bg-blue-500 rounded-md shadow-md p-2 text-white my-2"
    );
  });
});
