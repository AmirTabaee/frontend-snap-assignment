import React from "react";
import { CURRENT_LINE, ORANGE } from "../../helpers/colors";
import Contact from "./Contact";
import files from "../../helpers/files";

const Contacts = ({ contacts }) => {
    return (
        <>
            <section className="container">
                <div className="row">
                    {contacts.length > 0 ? (
                        contacts.map((item) => (
                            <Contact key={item?.id} contact={item?.contact} />
                        ))
                    ) : (
                        <div
                            className="text-center py-5"
                            style={{ backgroundColor: CURRENT_LINE }}
                        >
                            <p className="h3" style={{ color: ORANGE }}>
                                No Contact Found
                            </p>
                            <img
                                src={files.gif.NotFound}
                                alt="Not found"
                                className="w-25"
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Contacts;
