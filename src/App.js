import { useEffect, useRef, useState, useTransition } from "react";

import { Routes, Route } from "react-router-dom";

import { Contacts, Navbar, ViewContact } from "./components";
import { ContactApi } from "./services/contactServices";

const App = () => {
    const [isPending, startTransition] = useTransition();

    const listInnerRef = useRef();

    const [loading, setLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [userList, setUserList] = useState([]);
    const [lastList, setLastList] = useState(false);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const [value, setValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const {
                data: { items },
            } = await ContactApi.getContactsWithLimit(10, currPage);
            if (!items.length) {
                setLastList(true);
                return;
            }
            setPrevPage(currPage);
            setUserList([...userList, ...items]);
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

    const handleSearchContact = (event) => {
        const numberRegex = /^[0-9\b]+$/;
        const letterRegex = /[^a-zA-Z' ']/g;

        let value = event.target.value;
        let query;
        if (event.target.value === "" || numberRegex.test(event.target.value)) {
            value = value.replace(/^[0-9\b]+$/, "");
            setValue(event.target.value);
            startTransition(async () => {
                query = `?where={"phone":{"contains":"${event.target.value}"}}`;
                const {
                    data: { items },
                } = await ContactApi.searchContact(query, 10);
                setFilteredContacts(items);
            });
        } else if (!letterRegex.test(value)) {
            value = value.replace(/[^a-zA-Z' ']/g, "");
            setValue(value);
            startTransition(async () => {
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
            });
        }
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
            <Navbar handleSearchContact={handleSearchContact} value={value} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Contacts
                            contacts={
                                value === "" ? userList : filteredContacts
                            }
                            // loading={isPending}
                        />
                    }
                />
                <Route path="/contacts/:contactId" element={<ViewContact />} />
            </Routes>
        </div>
    );
};

export default App;
