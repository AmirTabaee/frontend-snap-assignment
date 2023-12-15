import { Component } from "react";

import classes from "./ErrorBoundary.module.scss";
import { lang } from "../../locale/lang";
import files from "../../helpers/files";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={`text-center py-5 ${classes.card_currentLine}`}>
                    {/* <p className={`h3 ${classes.text_orange}`}>
                        {lang.somethingWentWrongPleaseTryAgain}
                    </p>
                    <img
                        src={files.gif.NotFound}
                        alt="Not found"
                        className="w-25"
                    /> */}
                    amir
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
