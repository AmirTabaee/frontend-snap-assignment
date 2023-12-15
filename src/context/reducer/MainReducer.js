import {
    SET_CURR_PAGE,
    SET_FETCH_DATA_LOADING,
    SET_FILTERED_CONTACTS,
    SET_INPUT_VALUE,
    SET_SCROLL_LOADING,
} from "../type";

export const MainReducer = (prevState, action) => {
    switch (action.type) {
        case SET_INPUT_VALUE:
            return {
                ...prevState,
                inputValue: action.data,
            };
        case SET_CURR_PAGE:
            return {
                ...prevState,
                currPage: action.data,
            };
        case SET_SCROLL_LOADING:
            return {
                ...prevState,
                scrollLoading: action.data,
            };
        case SET_FETCH_DATA_LOADING:
            return {
                ...prevState,
                fetchDataLoading: action.data,
            };
        case SET_FILTERED_CONTACTS:
            return {
                ...prevState,
                filteredContacts: action.data,
            };
    }
};
