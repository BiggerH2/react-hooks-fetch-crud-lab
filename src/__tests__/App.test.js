import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";

// Test: Create a new question when the form is submitted
test("creates a new question when the form is submitted", async () => {
    render(<App />);

    // Wait for the initial questions list to load
    await waitFor(() => {
        expect(screen.findByText(/lorem testum 1/)).toBeInTheDocument();
    });

    // Navigate to the form page
    fireEvent.click(screen.queryByText("New Question"));

    // Fill out the form with a new question
    fireEvent.change(screen.getByLabelText(/Prompt/), {
        target: { value: "Test Prompt" },
    });
    fireEvent.change(screen.getByLabelText(/Answer 1/), {
        target: { value: "Test Answer 1" },
    });
    fireEvent.change(screen.getByLabelText(/Answer 2/), {
        target: { value: "Test Answer 2" },
    });
    fireEvent.change(screen.getByLabelText(/Correct Answer/), {
        target: { value: "1" },
    });

    // Submit the form
    fireEvent.submit(screen.queryByText(/Add Question/));

    // Go back to viewing questions
    fireEvent.click(screen.queryByText(/View Questions/));

    // Use waitFor to wait for the new question to appear in the DOM
    await waitFor(() => {
        expect(screen.findByText(/Test Prompt/)).toBeInTheDocument();
    });
});

// Test: Update the correct answer when the dropdown is changed
test("updates the answer when the dropdown is changed", async () => {
    render(<App />);

    // Navigate to the questions list page
    fireEvent.click(screen.queryByText(/View Questions/));

    // Wait for the initial list of questions to load
    await waitFor(() => {
        expect(screen.findByText(/lorem testum 2/)).toBeInTheDocument();
    });

    // Change the correct answer for the first question
    fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
        target: { value: "3" },
    });

    // Use waitFor to wait for the update to be reflected in the DOM
    await waitFor(() => {
        expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
    });

    // Re-render the component to check for persistence
    render(<App />);

    // Check that the correct answer remains updated
    expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
});
