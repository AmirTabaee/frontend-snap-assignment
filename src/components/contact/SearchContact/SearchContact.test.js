import { render, fireEvent } from "@testing-library/react";
import SearchContact from "./SearchContact";

const setup = () => {
    const searchContact = render(<SearchContact />);
    const input = searchContact.getByTestId("search-input");
    return {
        input,
        ...searchContact,
    };
};

test("should first", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 23 } });
    expect(input.value).toBe("23");
});

test("should first", () => {
    const { input } = setup();
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "Amir" } });
    expect(input.value).toBe("Amir");
});
