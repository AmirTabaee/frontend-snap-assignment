import { lazy } from "react";

// Contact Components
export const Contact = lazy(() => import("./contact/Contact/Contact"));
export const Contacts = lazy(() => import("./contact/Contacts/Contacts"));
export const ViewContact = lazy(() =>
    import("./contact/ViewContact/ViewContact")
);

//other Components
export const NotFound = lazy(() => import("./NotFound/NotFound"));
export const Navbar = lazy(() => import("./Navbar/Navbar"));
export const Spinner = lazy(() => import("./Spinner/Spinner"));
export const ErrorBoundary = lazy(() => import("./ErrorBoundry/ErrorBoundary"));
