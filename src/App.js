import { useEffect, useRef, useState, lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import { ContactApi } from "./services/contactServices";
import classes from "./App.module.scss";
import { ContactContext } from "./context/ContactContext";
import { Home, NotFound, ViewContact } from "./pages";

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
        inputSearchTimeOut = setTimeout(async () => {
            setInputValue(value);
            setFetchDataLoading(true);
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
                <Suspense fallback={<div>...loading</div>}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
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
