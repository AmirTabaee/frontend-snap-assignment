import React from "react";
import SearchContact from "./contact/SearchContact";

import { PURPLE, BACKGROUND } from "../helpers/colors";

const Navbar = ({ handleSearchContact, value }) => {
    return (
        <nav
            className="navbar navbar-dark navbar-expand-sm shadow-lg"
            style={{ backgroundColor: BACKGROUND }}
        >
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i
                                className="fas fa-id-badge"
                                style={{ color: PURPLE }}
                            />{" "}
                            <span style={{ color: PURPLE }}>
                                Contacts Manager
                            </span>{" "}
                            Web Application
                        </div>
                    </div>
                    <div className="col">
                        <SearchContact
                            handleSearchContact={handleSearchContact}
                            value={value}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
