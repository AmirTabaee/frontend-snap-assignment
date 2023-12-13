import React from "react";
import files from "../../helpers/files";
import classes from "./Spinner.module.scss";

const Spinner = () => {
    return (
        <>
            <img
                src={files.gif.Spinner}
                className={`d-block m-auto ${classes.image_style}`}
            />
        </>
    );
};

export default Spinner;
