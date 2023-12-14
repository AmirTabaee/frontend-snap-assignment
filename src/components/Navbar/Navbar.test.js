import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

test("should render Navbar component", () => {
    render(<Navbar />);
    const navbarContainer = screen.getByTestId("navbar-container");
    expect(navbarContainer).toBeInTheDocument();
    expect(navbarContainer).toHaveTextContent("Contact Manager");
});
