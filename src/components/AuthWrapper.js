import React from 'react'
import TopHeader from "./layout/TopHeader";
import { useHistory} from 'react-router-dom';
import Footer from "./layout/Footer";
import {isLogin} from "../utils/Helpers/UserHelper";


const AuthWrapper = ({ children }) => {
    const history = useHistory()

    if (isLogin()){
        return (
            <>
                <TopHeader/>
                {children}
                <Footer/>
            </>
        )
    }else {
        history.replace('/')
    }



}

export default AuthWrapper