import React from "react";
import SearchContact from "./contact/SearchContact";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg">
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <i className="fas fa-id-badge" />
                        <span style={{ color: "purple" }}>
                            Contacts Manager
                        </span>{" "}
                        Web Application
                    </div>
                    <div className="col">
                        <SearchContact />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
