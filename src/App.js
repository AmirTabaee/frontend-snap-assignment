import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";

const App = () => {
    const [contacts, setContacts] = useState([]);

    return (
        <div>
            <Navbar />
            <Contacts contacts={contacts} />
            <i class="fas fa-shopping-cart"></i>
        </div>
    );
};

export default App;
