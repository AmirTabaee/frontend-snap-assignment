import React, { useEffect, useState } from "react";
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

    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Contacts contacts={contacts} loading={loading} />}
                />
                <Route path="/contacts/:contactId" element={<ViewContact />} />
            </Routes>
        </div>
    );
};

export default App;
