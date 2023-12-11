import React, { useState } from "react";
import { Contacts, Navbar, ViewContact } from "./components";
import { Routes, Route } from "react-router-dom";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);

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
