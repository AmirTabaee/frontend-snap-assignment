import { useEffect, useRef, useState, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import classes from "./App.module.scss";
import { ContactApi } from "./services/contactServices";
import { ContactContext } from "./context/ContactContext";
import { Contacts, NotFound, Spinner, ViewContact } from "./components";

const App = () => {
    const listInnerRef = useRef();

    const [fetchDataLoading, setFetchDataLoading] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);

    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [userList, setUserList] = useState([]);
    const [lastList, setLastList] = useState(false);

    const [filteredContacts, setFilteredContacts] = useState([]);

    const [inputValue, setInputValue] = useState("");

    // fetching contacts list base on dependencies of pagination handler
    useEffect(() => {
        const fetchData = async () => {
            setFetchDataLoading(scrollLoading ? false : true);
            const response = await ContactApi.getContactsWithLimit(
                10,
                currPage
            );
            if (!response?.data?.items?.length) {
                setLastList(true);
                setFetchDataLoading(false);
                return;
            }
            setPrevPage(currPage);
            setUserList([...userList, ...response?.data?.items]);
            setFetchDataLoading(false);
            setScrollLoading(false);
        };
        if (!lastList && prevPage !== currPage) {
            fetchData();
        }
    }, [currPage, lastList, prevPage, userList]);

    // This handler manages pagination and calls new contacts by scrolling to end of the list
    const onScroll = () => {
        if (listInnerRef.current) {
            if (scrollLoading) {
                return;
            }
            const { scrollTop, scrollHeight, clientHeight } =
                listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                setScrollLoading(true);
                setCurrPage(currPage + 10);
            }
        }
    };

    /*
    Base on input type value this handler calls the search contact api 
    if input value starts with numbers , handler calls the api with phone query
    if input value starts with letters , handler calls the api with firstName query
    and if user uses space between letters , handler calls the api with firstName and lastName query
*/
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
            setFilteredContacts(response?.data?.items);
            setFetchDataLoading(false);
        }, 1000);
    };

    return (
        <ContactContext.Provider value={{ handleSearchContact }}>
            <div
                ref={listInnerRef}
                className={classes.app_container}
                onScroll={inputValue ? null : onScroll}
            >
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Contacts
                                    contacts={
                                        inputValue === ""
                                            ? userList
                                            : filteredContacts
                                    }
                                    fetchDataLoading={fetchDataLoading}
                                    scrollLoading={scrollLoading}
                                    isShowingResult={
                                        inputValue === "" ? false : true
                                    }
                                />
                            }
                        />
                        <Route
                            path="/contacts/:contactId"
                            element={<ViewContact />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </ContactContext.Provider>
    );
};

export default App;
