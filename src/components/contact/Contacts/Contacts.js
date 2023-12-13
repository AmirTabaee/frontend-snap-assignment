import Contact from "../Contact/Contact";
import files from "../../../helpers/files";
import Spinner from "../../Spinner/Spinner";
import { lang } from "../../../locale/lang";
import classes from "./Contacts.module.scss";

const Contacts = ({ contacts, fetchDataLoading, scrollLoading }) => {
    const visitedContactsList = JSON.parse(
        localStorage.getItem("visitedContactsList")
    );

    return (
        <>
            {fetchDataLoading ? (
                <Spinner />
            ) : (
                <section className="container mt-4">
                    <div className="row">
                        {visitedContactsList && (
                            <>
                                <h4 className={classes.title_foreground}>
                                    {lang.visitedContacts}
                                </h4>

                                {visitedContactsList.map((item) => (
                                    <Contact key={item?.id} contact={item} />
                                ))}
                            </>
                        )}
                        {contacts.length > 0 ? (
                            <>
                                <h4 className={classes.title_foreground}>
                                    {lang.contactList}
                                </h4>
                                {contacts.map((item) => (
                                    <Contact key={item?.id} contact={item} />
                                ))}
                                {scrollLoading ? <Spinner /> : null}
                            </>
                        ) : (
                            <div
                                className={`text-center py-5 ${classes.card_currentLine}`}
                            >
                                <p className={`h3 ${classes.text_orange}`}>
                                    {lang.noContactFound}
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
