import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import files from "../../helpers/files";
import { lang } from "../../locale/lang";
import classes from "./ViewContact.module.scss";
import { viewContactItems } from "../../mock/contact";
import { Spinner } from "../../components";
import { ContactApi } from "../../services/contactServices";

const ViewContact = () => {
    const { contactId } = useParams();
    const [loading, setLoading] = useState(false);
    const [contactInfo, setContactInfo] = useState(null);
    const [contactInfoArray, setContactInfoArray] = useState([]);

    const handleSetLastVisitedContacts = (contactInfo) => {
        const visitedContactsList = JSON.parse(
            localStorage.getItem("visitedContactsList")
        );
        let tempArray = visitedContactsList ? [...visitedContactsList] : [];
        const contactExist =
            tempArray.find((item) => item?.id === contactInfo?.id) || null;
        if (contactExist) {
            return;
        }
        if (tempArray.length < 4) {
            tempArray.unshift(contactInfo);
        } else {
            tempArray.pop(tempArray[3]);
            tempArray.unshift(contactInfo);
        }
        localStorage.setItem("visitedContactsList", JSON.stringify(tempArray));
    };

    useEffect(() => {
        const getContactInfo = async () => {
            setLoading(true);
            const response = await ContactApi.getContact(Number(contactId));
            setContactInfo(response?.data);
            setContactInfoArray(viewContactItems(lang, response?.data));
            handleSetLastVisitedContacts(response?.data);
            setLoading(false);
        };
        getContactInfo();
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    {contactInfo?.first_name + " " + contactInfo?.last_name}
                </title>
            </Helmet>
            <section className="view-contact-intro p3">
                <div className="container" data-testid="contact-1">
                    <div className="row my-2 text-center">
                        <p className={`h3 fw-bold ${classes.text_cyan}`}>
                            {lang.contactInfo}
                        </p>
                    </div>
                </div>
            </section>
            <hr className={classes.background_cyan} />
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="view-contact mt-e">
                        {contactInfo ? (
                            <div
                                className={`container p-2 ${classes.card_container_style}`}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={
                                                contactInfo?.avatar
                                                    ? contactInfo?.avatar
                                                    : files.png.UnknownUser
                                            }
                                            alt={
                                                contactInfo?.first_name +
                                                " " +
                                                contactInfo?.last_name
                                            }
                                            className={`img-fluid rounded ${classes.image_border}`}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <ul className="list-group">
                                            {contactInfoArray?.map((item) => (
                                                <li
                                                    className="list-group-item list-group-item-dark"
                                                    key={item?.id}
                                                >
                                                    {item?.title}:{" "}
                                                    <span className="fw-bold">
                                                        {item?.description}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="d-grid gap-2 col-2 mx-auto">
                                        <Link
                                            to={"/"}
                                            className={`btn ${classes.link_style}`}
                                        >
                                            {lang.backToHome}
                                        </Link>
                                    </div>
                                </div>
                            </div>
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
                    </section>
                </>
            )}
        </>
    );
};

export default ViewContact;
