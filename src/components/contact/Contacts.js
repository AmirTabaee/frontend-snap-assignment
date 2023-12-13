import { CURRENT_LINE, FOREGROUND, ORANGE } from "../../helpers/colors";
import Contact from "./Contact";
import files from "../../helpers/files";
import Spinner from "../Spinner";

const Contacts = ({ contacts, loading }) => {
    const visitedContactsList = JSON.parse(
        localStorage.getItem("visitedContactsList")
    );

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <section className="container mt-4">
                    <div className="row">
                        {visitedContactsList && (
                            <>
                                <h4 style={{ color: FOREGROUND }}>
                                    visitedContacts
                                </h4>

                                {visitedContactsList.map((item) => (
                                    <Contact key={item?.id} contact={item} />
                                ))}
                            </>
                        )}
                        {contacts.length > 0 ? (
                            <>
                                <h4 style={{ color: FOREGROUND }}>
                                    Contacts List
                                </h4>
                                {contacts.map((item) => (
                                    <Contact key={item?.id} contact={item} />
                                ))}
                            </>
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
            )}
        </>
    );
};

export default Contacts;
