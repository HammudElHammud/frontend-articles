import React from 'react'
import {Skeleton} from 'primereact/skeleton';
import {isMobile} from "react-device-detect";


const ArticleSkeleton = (props) => {

    return (
        <>
            <div className="row">
                <div className="blog-entry d-flex justify-content-start blog-entry-search-item">
                    <a href="#" className="img-link me-4">
                        <Skeleton  height="10rem"  className="mr-2"></Skeleton>
                    </a>
                    <div className="blog-details">
                       <span className="date">
                          <Skeleton className="mb-2"></Skeleton>
                          </span>
                        <h2  >
                            <a href="#">
                                <Skeleton width={isMobile ? "30%" : "30rem"} height="5rem" className="mb-2"></Skeleton>
                            </a>
                        </h2>
                        <p
                        >
                            <Skeleton height="3rem"  className="mr-2"></Skeleton>
                        </p>
                        <p className='w-100'>
                            <a href="" className="btn btn-sm "
                            >
                                <Skeleton shape="circle"  className="mr-2"></Skeleton>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )

}


export default ArticleSkeleton