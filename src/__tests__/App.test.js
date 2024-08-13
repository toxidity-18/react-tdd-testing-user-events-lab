import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `My Portfolio`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /my portfolio/i,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays a second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const checkboxes = ["Technology", "Science", "Art"];
  checkboxes.forEach((interest) => {
    expect(screen.getByLabelText(new RegExp(interest, "i"))).toBeInTheDocument();
  });
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const checkboxes = ["Technology", "Science", "Art"];
  checkboxes.forEach((interest) => {
    expect(screen.getByLabelText(new RegExp(interest, "i"))).not.toBeChecked();
  });
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  userEvent.type(nameInput, "John Doe");
  userEvent.type(emailInput, "john.doe@example.com");

  expect(nameInput).toHaveValue("John Doe");
  expect(emailInput).toHaveValue("john.doe@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const technologyCheckbox = screen.getByLabelText(/technology/i);
  const scienceCheckbox = screen.getByLabelText(/science/i);
  const artCheckbox = screen.getByLabelText(/art/i);

  // Check Technology checkbox
  userEvent.click(technologyCheckbox);
  expect(technologyCheckbox).toBeChecked();

  // Uncheck Technology checkbox
  userEvent.click(technologyCheckbox);
  expect(technologyCheckbox).not.toBeChecked();

  // Check Science checkbox
  userEvent.click(scienceCheckbox);
  expect(scienceCheckbox).toBeChecked();

  // Check Art checkbox
  userEvent.click(artCheckbox);
  expect(artCheckbox).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  // Fill in form fields
  userEvent.type(screen.getByLabelText(/name/i), "John Doe");
  userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");

  // Check some checkboxes
  userEvent.click(screen.getByLabelText(/technology/i));
  userEvent.click(screen.getByLabelText(/science/i));

  // Submit the form
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Check the thank you message and interests list
  expect(screen.getByText(/thank you, john doe!/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests: technology, science/i)).toBeInTheDocument();
});
