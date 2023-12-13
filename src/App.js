import { useEffect, useRef, useState } from "react";

import { Routes, Route } from "react-router-dom";

import { Contacts, Navbar, ViewContact } from "./components";
import { ContactApi } from "./services/contactServices";

const App = () => {
    const listInnerRef = useRef();

    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [userList, setUserList] = useState([]);
    const [lastList, setLastList] = useState(false);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const [value, setValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
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
        };
        if (!lastList && prevPage !== currPage) {
            fetchData();
        }
    }, [currPage, lastList, prevPage, userList]);

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } =
                listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage(currPage + 10);
            }
        }
    };

    let inputSearchTimeOut;
    const handleSearchContact = (value) => {
        clearTimeout(inputSearchTimeOut);
        inputSearchTimeOut = setTimeout(async () => {
            const numberRegex = /^[0-9\b]+$/;
            const letterRegex = /[^a-zA-Z' ']/g;
            let query;
            if (value === "" || numberRegex.test(value)) {
                value = value.replace(/^[0-9\b]+$/, "");
                setValue(value);
                query = `?where={"phone":{"contains":"${value}"}}`;
                const {
                    data: { items },
                } = await ContactApi.searchContact(query, 10);
                setFilteredContacts(items);
            } else if (!letterRegex.test(value)) {
                value = value.replace(/[^a-zA-Z' ']/g, "");
                setValue(value);
                if (value.includes(" ")) {
                    const [firstName, lastName] = value.split(" ");
                    query = `?where={"first_name":{"contains":"${firstName}"},"last_name":{"contains":"${lastName}"}}`;
                } else {
                    query = `?where={"first_name":{"contains":"${value}"}}`;
                }
                const {
                    data: { items },
                } = await ContactApi.searchContact(query, 10);
                setFilteredContacts(items);
            }
        }, 1000);
    };

    return (
        <div
            style={{
                height: "100vh",
                overflowY: "auto",
            }}
            ref={listInnerRef}
            onScroll={value ? null : onScroll}
        >
            <Navbar handleSearchContact={handleSearchContact} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Contacts
                            contacts={
                                value === "" ? userList : filteredContacts
                            }
                        />
                    }
                />
                <Route path="/contacts/:contactId" element={<ViewContact />} />
            </Routes>
        </div>
    );
};

export default App;
