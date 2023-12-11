import { Link, useNavigate } from "react-router-dom";

import { CURRENT_LINE, PURPLE } from "../../helpers/colors";
import files from "../../helpers/files";

const Contact = ({ contact }) => {
    const navigate = useNavigate();

    return (
        <div className="col-md-6">
            <div
                style={{ backgroundColor: CURRENT_LINE }}
                className="card my-2"
            >
                <div
                    className="card-body"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`contacts/${contact?.id}`)}
                >
                    <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-md-4 col-sm-4">
                            <img
                                src={
                                    contact?.avatar
                                        ? contact?.avatar
                                        : files.png.UnknownUser
                                }
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
                                    Address :{"  "}
                                    <span className="fw-bold">
                                        {contact?.address
                                            ? contact?.address
                                            : "---"}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
