import SearchContact from "../contact/SearchContact/SearchContact";
import { lang } from "../../locale/lang";
import classes from "./Navbar.module.scss";

const Navbar = () => {
    return (
        <nav
            className={`navbar navbar-dark navbar-expand-sm shadow-lg ${classes.nav_style}`}
        >
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i
                                className={`fas fa-id-badge ${classes.color_purple}`}
                            />{" "}
                            <span className={classes.color_purple}>
                                {lang.contactManager}
                            </span>{" "}
                            {lang.webApplication}
                        </div>
                    </div>
                    <div className="col">
                        <SearchContact />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
