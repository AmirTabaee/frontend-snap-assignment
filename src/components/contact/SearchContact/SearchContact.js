import React, { useContext } from "react";

import { lang } from "../../../locale/lang";
import classes from "./SearchContact.module.scss";
import { MainContext } from "../../../context/MainContextProvider";
import { ContactApi } from "../../../services/contactServices";

const SearchContact = () => {
    const { setInputValue, setFetchDataLoading, setFilteredContacts } =
        useContext(MainContext);

    let inputSearchTimeOut;
    const handleSearchContact = async (value) => {
        clearTimeout(inputSearchTimeOut);
        // this timeout handles debounce to prevent calling api on each input change
        inputSearchTimeOut = setTimeout(async () => {
            setInputValue(value);
            setFetchDataLoading(true);
            // here value checks to be a number
            const numberRegex = /^[0-9\b]+$/;
            const parsedValue = parseInt(value);
            let query;
            if (numberRegex.test(parsedValue)) {
                query = `?where={"phone":{"contains":"${value}"}}`;
            } else {
                console.log(false);
                // here string with space splits to firstName and lastName
                if (value.includes(" ")) {
                    const [firstName, lastName] = value.split(" ");
                    query = `?where={"first_name":{"contains":"${firstName}"},"last_name":{"contains":"${lastName}"}}`;
                } else {
                    query = `?where={"first_name":{"contains":"${value}"}}`;
                }
            }
            const response = await ContactApi.searchContact(query, 10);
            setFilteredContacts(response?.data?.items || []);
            setFetchDataLoading(false);
        }, 1000);
    };

    return (
        <div className="input-group">
            <span
                className={`input-group-text ${classes.icon_style}`}
                id="basic-addon1"
            >
                <i className="fas fa-search" />
            </span>

            <input
                type="text"
                className={`form-control ${classes.input_style}`}
                onChange={(event) => handleSearchContact(event.target.value)}
                placeholder={lang.searchContact}
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                data-testid="search-input"
            />
        </div>
    );
};

export default SearchContact;
