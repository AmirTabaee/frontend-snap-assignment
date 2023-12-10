import React, { useState } from "react";
import { Contacts, Navbar } from "./components";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);

    return (
        <div>
            <Navbar />
            <Contacts contacts={contacts} loading={loading} />
            <i class="fas fa-shopping-cart"></i>
        </div>
    );
};

export default App;
