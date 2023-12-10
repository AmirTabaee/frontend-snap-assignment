import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg">
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <i className="fas fa-id-badge" />
                        وب اپلیکیشن مدیریت
                        <span style={{ color: "purple" }}>مخاطبین</span>
                    </div>
                    <div className="col">
                        <div className="input-group mx-2 w-75">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                                style={{ backgroundColor: "purple" }}
                            >
                                <i className="fas fa-search" />
                                <input
                                    type="text"
                                    style={{
                                        backgroundColor: "gray",
                                        borderColor: "purple",
                                    }}
                                    className="from-control"
                                    placeholder="جستجو"
                                    aria-label="Search"
                                    aria-describedby="basic-addon1"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
