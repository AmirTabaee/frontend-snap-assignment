import React, { useEffect, useRef, useState } from "react";
import { Contacts, Navbar, ViewContact } from "./components";
import { Routes, Route } from "react-router-dom";
import { ContactApi } from "./services/contactServices";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getAllContacts = async () => {
            const {
                data: { items },
            } = await ContactApi.getAllContacts();
            console.log("response", items);
            setContacts(items);
        };
        getAllContacts();
    }, []);

    const listInnerRef = useRef();
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [userList, setUserList] = useState([]);
    const [lastList, setLastList] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const {
                data: { items },
            } = await ContactApi.getContactsWithLimit(10, currPage);
            console.log("aaaaaa", items);
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
            console.log("scrollTop", scrollTop);
            console.log("scrollHeight", scrollHeight);
            console.log("clientHeight", clientHeight);
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage(currPage + 10);
            }
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                overflowY: "auto",
            }}
            ref={listInnerRef}
            onScroll={onScroll}
        >
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Contacts contacts={userList} loading={loading} />}
                />
                <Route path="/contacts/:contactId" element={<ViewContact />} />
            </Routes>
        </div>
    );
};

export default App;
