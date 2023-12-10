import React from "react";

const SearchContact = () => {
    return (
        <div class="input-group">
            <span
                className="input-group-text"
                id="basic-addon1"
                style={{
                    backgroundColor: "purple",
                    borderColor: "purple",
                }}
            >
                <i className="fas fa-search" />
            </span>

            <input
                type="text"
                class="form-control"
                style={{
                    backgroundColor: "gray",
                    borderColor: "purple",
                }}
                placeholder="Input group example"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
            />
        </div>
    );
};

export default SearchContact;
