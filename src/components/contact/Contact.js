import { Link } from "react-router-dom";

import { CURRENT_LINE, CYAN, ORANGE, PURPLE, RED } from "../../helpers/colors";

const Contact = ({ contact }) => {
    console.log("contact", contact);
    return (
        <div className="col-md-6">
            <div
                style={{ backgroundColor: CURRENT_LINE }}
                className="card my-2"
            >
                <div className="card-body">
                    <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-md-4 col-sm-4">
                            <img
                                src={contact?.avatar}
                                alt={
                                    contact?.first_name +
                                    " " +
                                    contact?.last_name
                                }
                                style={{ border: `1px solid ${PURPLE}` }}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-md-7 col-sm-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    Full name :{"  "}
                                    <span className="fw-bold">
                                        {contact?.first_name +
                                            " " +
                                            contact?.last_name}
                                    </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    Phone number:{"  "}
                                    <span className="fw-bold">
                                        {contact?.phone}
                                    </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    City :{"  "}
                                    <span className="fw-bold">
                                        {contact?.address}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                            <Link
                                to={`/contacts/${contact?.id}`}
                                className="btn my-1"
                                style={{ backgroundColor: ORANGE }}
                            >
                                <i className="fa fa-eye" />
                            </Link>

                            <button
                                className="btn my-1"
                                style={{ backgroundColor: CYAN }}
                            >
                                <i className="fa fa-pencil" />
                            </button>
                            <button
                                className="btn my-1"
                                style={{ backgroundColor: RED }}
                            >
                                <i className="fa fa-trash" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
