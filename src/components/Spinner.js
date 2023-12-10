import React from "react";
import files from "../helpers/files";

const Spinner = () => {
    return (
        <>
            <img
                src={files.gif.Spinner}
                className="d-block m-auto"
                style={{ width: "200px" }}
            />
        </>
    );
};

export default Spinner;
