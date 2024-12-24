import React from 'react'
import AuthWrapper from "../AuthWrapper";
import NewsFeedContent from "./NewsFeedContent";


const NewsFeedWrapper = (props) => {

    return (
        <>
            <AuthWrapper>
              <NewsFeedContent/>
            </AuthWrapper>
        </>
    )


}

export default NewsFeedWrapper