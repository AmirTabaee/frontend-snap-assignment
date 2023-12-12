import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { Spinner } from "../";
import { CURRENT_LINE, CYAN, PURPLE } from "../../helpers/colors";
import { ContactApi } from "../../services/contactServices";
import files from "../../helpers/files";

const ViewContact = () => {
    const { contactId } = useParams();
    const [loading, setLoading] = useState(false);
    const [contactInfo, setContactInfo] = useState(null);
    console.log("contactId", contactId);

    const handleSetLastVisitedContacts = (contactInfo) => {
        const visitedContactsList = JSON.parse(
            localStorage.getItem("visitedContactsList")
        );
        let tempArray = visitedContactsList ? [...visitedContactsList] : [];
        const contactExist =
            tempArray.find((item) => item.id === contactInfo.id) || null;
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
            const { data } = await ContactApi.getContact(Number(contactId));
            setContactInfo(data);
            setLoading(false);
            handleSetLastVisitedContacts(data);
        };
        getContactInfo();
    }, []);

    console.log("contactInfo", contactInfo);

    return (
        <>
            <section className="view-contact-intro p3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{ color: CYAN }}>
                            Contact Information
                        </p>
                    </div>
                </div>
            </section>

            <hr style={{ backgroundColor: CYAN }} />

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="view-contact mt-e">
                        <div
                            className="container p-2"
                            style={{
                                borderRadius: "1em",
                                backgroundColor: CURRENT_LINE,
                            }}
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
                                        className="img-fluid rounded"
                                        style={{
                                            border: `1px solid ${PURPLE}`,
                                        }}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark">
                                            Full name:{" "}
                                            <span className="fw-bold">
                                                {contactInfo?.first_name +
                                                    " " +
                                                    contactInfo?.last_name}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Gender:{" "}
                                            <span className="fw-bold">
                                                {contactInfo?.gender}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Phone number:{" "}
                                            <span className="fw-bold">
                                                {contactInfo?.phone}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Email:{" "}
                                            <span className="fw-bold">
                                                {contactInfo?.email}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Telegram:{" "}
                                            <span className="fw-bold">
                                                {contactInfo?.telegram}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Company:{" "}
                                            <span className="fw-bold">
                                                {contactInfo?.company}
                                            </span>
                                        </li>
                                        <li className="list-group-item list-group-item-dark">
                                            Address:{" "}
                                            <span className="fw-bold">
                                                {contactInfo?.address}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <Link
                                        to={"/"}
                                        className="btn"
                                        style={{ backgroundColor: PURPLE }}
                                    >
                                        Back to home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default ViewContact;
