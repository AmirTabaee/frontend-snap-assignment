import { useEffect, useRef, useState } from "react";

import { Routes, Route } from "react-router-dom";

import { Contacts, Navbar, ViewContact } from "./components";
import { ContactApi } from "./services/contactServices";
import classes from "./App.module.scss";
import { ContactContext } from "./context/ContactContext";

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

    useEffect(() => {
        const fetchData = async () => {
            setFetchDataLoading(scrollLoading ? false : true);
            const response = await ContactApi.getContactsWithLimit(
                10,
                currPage
            );
            if (!response?.data?.items?.length) {
                setLastList(true);
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

    let inputSearchTimeOut;
    const handleSearchContact = async (value) => {
        clearTimeout(inputSearchTimeOut);
        setInputValue(value);
        setFetchDataLoading(true);
        inputSearchTimeOut = setTimeout(async () => {
            const numberRegex = /^[0-9\b]+$/;
            let amir = parseInt(value);
            let query;
            if (numberRegex.test(amir)) {
                query = `?where={"phone":{"contains":"${value}"}}`;
            } else {
                console.log(false);
                if (value.includes(" ")) {
                    const [firstName, lastName] = value.split(" ");
                    query = `?where={"first_name":{"contains":"${firstName}"},"last_name":{"contains":"${lastName}"}}`;
                } else {
                    query = `?where={"first_name":{"contains":"${value}"}}`;
                }
            }
            const {
                data: { items },
            } = await ContactApi.searchContact(query, 10);
            setFilteredContacts(items);
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
                <Navbar />
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
                </Routes>
            </div>
        </ContactContext.Provider>
    );
};

export default App;
