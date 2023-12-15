import { useContext, useRef } from "react";

import { MainContext } from "../context/MainContextProvider";
import { Navbar } from "../components";
import classes from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
    const {
        setScrollLoading,
        setCurrPage,
        mainStateData: { scrollLoading, inputValue, currPage },
    } = useContext(MainContext);
    console.log("currPage", currPage);

    const listInnerRef = useRef();

    const onScroll = () => {
        if (listInnerRef.current) {
            if (scrollLoading) {
                return;
            }
            const { scrollTop, scrollHeight, clientHeight } =
                listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                setCurrPage(currPage + 10);
                setScrollLoading(true);
            }
        }
    };

    return (
        <div
            ref={listInnerRef}
            className={classes.app_container}
            onScroll={inputValue ? null : onScroll}
        >
            <Navbar />
            {children}
        </div>
    );
};

export default MainLayout;
