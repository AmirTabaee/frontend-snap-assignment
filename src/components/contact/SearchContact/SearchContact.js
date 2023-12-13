import React from "react";

import { lang } from "../../../locale/lang";
import classes from "./SearchContact.module.scss";

const SearchContact = ({ handleSearchContact }) => {
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
                placeholder={lang.searchContact}
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
            />
        </div>
    );
};

export default SearchContact;
