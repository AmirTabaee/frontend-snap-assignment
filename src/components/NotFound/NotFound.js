import files from "../../helpers/files";
import { lang } from "../../locale/lang";
import classes from "./NotFound.module.scss";

const NotFound = () => {
    return (
        <div className={`text-center py-5 ${classes.card_currentLine}`}>
            <p className={`h3 ${classes.text_orange}`}>{lang.pageNotFound}</p>
            <img src={files.gif.NotFound} alt="Not found" className="w-25" />
        </div>
    );
};

export default NotFound;
