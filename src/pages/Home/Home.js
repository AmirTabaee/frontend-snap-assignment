import { Helmet } from "react-helmet-async";

import files from "../../helpers/files";
import { lang } from "../../locale/lang";
import classes from "./Home.module.scss";
import MainLayout from "../../layout/MainLayout";
import { Contact, Spinner } from "../../components";
import { useContext, useEffect, useState } from "react";
import { ContactApi } from "../../services/contactServices";
import { MainContext } from "../../context/MainContextProvider";

const Home = () => {
    const {
        mainStateData: {
            scrollLoading,
            inputValue,
            filteredContacts,
            currPage,
        },
        setScrollLoading,
    } = useContext(MainContext);

    const visitedContactsList = JSON.parse(
        localStorage.getItem("visitedContactsList")
    );

    const [fetchDataLoading, setFetchDataLoading] = useState(false);

    const [prevPage, setPrevPage] = useState(0);
    const [userList, setUserList] = useState([]);
    const [lastList, setLastList] = useState(false);

    console.log("filteredContacts", filteredContacts);
    console.log("userList", userList);

    const fetchData = async (clearList = false) => {
        setFetchDataLoading(scrollLoading ? false : true);
        const response = await ContactApi.getContactsWithLimit(10, currPage);
        if (!response?.data?.items?.length) {
            setLastList(true);
            setFetchDataLoading(false);
            return;
        }
        setPrevPage(currPage);
        if (clearList) {
            setUserList([...response?.data?.items]);
        } else {
            setUserList([...userList, ...response?.data?.items]);
        }
        setFetchDataLoading(false);
        setScrollLoading(false);
    };

    useEffect(() => {
        if (!inputValue) {
            setUserList([]);
            fetchData(true);
        }
    }, [inputValue]);

    useEffect(() => {
        const temp = [...filteredContacts];
        if (inputValue) {
            setUserList(temp);
        }
    }, [filteredContacts]);

    useEffect(() => {
        if (!lastList && prevPage !== currPage) {
            fetchData(false);
        }
    }, [currPage, lastList, prevPage, userList, inputValue]);

    return (
        <MainLayout>
            <Helmet>
                <title>{lang.contactManagerHome}</title>
            </Helmet>
            {fetchDataLoading ? (
                <Spinner />
            ) : (
                <section className="container mt-4">
                    <div className="row">
                        {!inputValue && visitedContactsList && (
                            <>
                                <h4 className={classes.title_foreground}>
                                    {lang.visitedContacts}
                                </h4>
                                {visitedContactsList.map((item) => (
                                    <Contact key={item?.id} contact={item} />
                                ))}
                            </>
                        )}
                        {userList?.length > 0 ? (
                            <>
                                <h4 className={classes.title_foreground}>
                                    {inputValue
                                        ? lang.searchedContacts
                                        : lang.contactList}
                                </h4>
                                {userList.map((item) => (
                                    <Contact key={item?.id} contact={item} />
                                ))}
                                {scrollLoading ? <Spinner /> : null}
                            </>
                        ) : (
                            <div
                                className={`text-center py-5 ${classes.card_currentLine}`}
                            >
                                <p className={`h3 ${classes.text_orange}`}>
                                    {lang.noContactFound}
                                </p>
                                <img
                                    src={files.gif.NotFound}
                                    alt="Not found"
                                    className="w-25"
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}
        </MainLayout>
    );
};

export default Home;
