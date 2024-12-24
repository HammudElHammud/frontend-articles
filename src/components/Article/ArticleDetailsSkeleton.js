import React from 'react'
import {Skeleton} from 'primereact/skeleton';


const ArticleDetailsSkeleton = (props) => {

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row blog-entries element-animate">
                        <div className="col-md-12 col-lg-8 main-content">
                            <div className="post-content-body">
                                <p><Skeleton width="100%" height="10rem" className="mb-2"></Skeleton></p>
                                <p><Skeleton width="100%" height="10rem" className="mb-2"></Skeleton></p>
                                <div className="row my-4">
                                    <div className="col-md-12 mb-4">
                                        <Skeleton width="100%" height="10rem" className="mb-2"></Skeleton>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-5">
                                <p> <a href="#"><Skeleton width="10rem" height="2rem" className="mb-2"></Skeleton></a>
                                </p>
                                <p><Skeleton width="30rem" height="2rem" className="mb-2"></Skeleton>
                                </p>
                            </div>

                        </div>
                        <div className="col-md-12 col-lg-4 sidebar">
                            <div className="sidebar-box">
                                <div className="bio text-center justify-content-center">
                                    <div className='d-flex justify-content-center my-2 '>
                                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                    </div>
                                    <div className="bio-body">
                                        <h2><Skeleton className="mb-2"></Skeleton></h2>
                                        <p><Skeleton className="mb-2"></Skeleton></p>
                                        <p className="social">
                                            <a href="#" className="p-2"><span className="fa fa-facebook"/></a>
                                            <a href="#" className="p-2"><span className="fa fa-twitter"/></a>
                                            <a href="#" className="p-2"><span className="fa fa-instagram"/></a>
                                            <a href="#" className="p-2"><span className="fa fa-youtube-play"/></a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}


export default ArticleDetailsSkeleton