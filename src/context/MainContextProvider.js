import React, { createContext } from "react";
import { MainReducer } from "./reducer/MainReducer";
import {
    SET_CURR_PAGE,
    SET_FETCH_DATA_LOADING,
    SET_FILTERED_CONTACTS,
    SET_INPUT_VALUE,
    SET_SCROLL_LOADING,
} from "./type";

export const MainContext = createContext();

const MainContextProvider = (props) => {
    const [state, dispatch] = React.useReducer(MainReducer, {
        inputValue: "",
        currPage: 1,
        scrollLoading: false,
        fetchDataLoading: false,
        filteredContacts: [],
    });

    const mainContext = React.useMemo(
        () => ({
            mainStateData: state,
            setInputValue: (data) => {
                dispatch({ type: SET_INPUT_VALUE, data });
            },
            setCurrPage: (data) => {
                dispatch({ type: SET_CURR_PAGE, data });
            },
            setScrollLoading: (data) => {
                dispatch({ type: SET_SCROLL_LOADING, data });
            },
            setFetchDataLoading: (data) => {
                dispatch({ type: SET_FETCH_DATA_LOADING, data });
            },
            setFilteredContacts: (data) => {
                dispatch({ type: SET_FILTERED_CONTACTS, data });
            },
        }),
        [state]
    );

    return (
        <MainContext.Provider value={mainContext}>
            {props.children}
        </MainContext.Provider>
    );
};

export { MainContextProvider };
