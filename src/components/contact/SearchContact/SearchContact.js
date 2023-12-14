import React, { useContext } from "react";

import { lang } from "../../../locale/lang";
import classes from "./SearchContact.module.scss";
import { ContactContext } from "../../../context/ContactContext";

const SearchContact = () => {
    const { handleSearchContact } = useContext(ContactContext);
    return (
        <div className="input-group">
            <span
                className={`input-group-text ${classes.icon_style}`}
                id="basic-addon1"
            >
                <i className="fas fa-search" />
            </span>

            <input
                type="text"
                className={`form-control ${classes.input_style}`}
                onChange={(event) => handleSearchContact(event.target.value)}
                onKeyDown={(event) => /[a-z]/i.test(event.key)}
                placeholder={lang.searchContact}
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                data-testid="search-input"
            />
        </div>
    );
};

export default SearchContact;
