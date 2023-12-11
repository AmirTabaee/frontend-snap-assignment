import React from "react";

import { PURPLE, COMMENT } from "../../helpers/colors";

const SearchContact = () => {
    return (
        <div className="input-group">
            <span
                className="input-group-text"
                id="basic-addon1"
                style={{
                    backgroundColor: PURPLE,
                    borderColor: PURPLE,
                }}
            >
                <i className="fas fa-search" />
            </span>

            <input
                type="text"
                className="form-control"
                style={{
                    backgroundColor: COMMENT,
                    borderColor: PURPLE,
                }}
                placeholder="Search Contact"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
            />
        </div>
    );
};

export default SearchContact;
