import { Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import { Spinner } from "./components";
import { Home, NotFound, ViewContact } from "./pages";

const App = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacts/:contactId" element={<ViewContact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default App;
