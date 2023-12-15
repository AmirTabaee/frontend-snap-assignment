import { useNavigate } from "react-router-dom";

import files from "../../../helpers/files";
import classes from "./contact.module.scss";
import { lang } from "../../../locale/lang";

const Contact = ({ contact }) => {
    const navigate = useNavigate();

    return (
        <div className="col-md-6" data-testid="contact-1">
            <div className={`card my-2 ${classes.card_background}`}>
                <div
                    className={`card-body ${classes.cursor_pointer}`}
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
                                className={`img-fluid rounded ${classes.image_border}`}
                            />
                        </div>
                        <div className="col-md-7 col-sm-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    {lang.fullName} :{"  "}
                                    <span className="fw-bold">
                                        {contact?.first_name +
                                            " " +
                                            contact?.last_name}
                                    </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    {lang.phone}:{"  "}
                                    <span className="fw-bold">
                                        {contact?.phone}
                                    </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    {lang.address} :{"  "}
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
