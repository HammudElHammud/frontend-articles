import React from 'react'
import TopHeader from "../layout/TopHeader";

import Footer from "../layout/Footer";
import ArticleContent from "./ArticleContent";


const ArticleWrapper = (props) => {

    return (
        <>
            <TopHeader/>
             <ArticleContent/>
            <Footer/>
        </>
    )


}

export default ArticleWrapper