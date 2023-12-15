import { lazy } from "react";

// Contact Components
export const Contact = lazy(() => import("./contact/Contact/Contact"));

export const SearchContact = lazy(() =>
    import("./contact/SearchContact/SearchContact")
);

//other Components
export const Navbar = lazy(() => import("./Navbar/Navbar"));
export const Spinner = lazy(() => import("./Spinner/Spinner"));
export const ErrorBoundary = lazy(() => import("./ErrorBoundry/ErrorBoundary"));
