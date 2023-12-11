import { Link } from "react-router-dom";

import { Spinner } from "../";
import { CURRENT_LINE, CYAN, PURPLE } from "../../helpers/colors";

const ViewContact = () => {
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
                    {Object.keys(contact).length > 0 && (
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
                                            src={contact?.photo}
                                            alt=""
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
                                                    {contact?.fullname}
                                                </span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Phone number:{" "}
                                                <span className="fw-bold">
                                                    {contact?.mobile}
                                                </span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Email:{" "}
                                                <span className="fw-bold">
                                                    {contact?.email}
                                                </span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                job:{" "}
                                                <span className="fw-bold">
                                                    {contact?.job}
                                                </span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                group:{" "}
                                                <span className="fw-bold">
                                                    {group?.name}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <Link
                                            to={"/contacts"}
                                            className="btn"
                                            style={{ backgroundColor: PURPLE }}
                                        >
                                            برگشت به صفحه اصلی
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
};

export default ViewContact;
