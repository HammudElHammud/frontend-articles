import React, {useState, useEffect} from 'react'
import {toast} from "react-toastify";
import {createAxios} from "../../utils/Helpers/AxiosHelper";
import {isMobile} from "react-device-detect";
import ArticleSkeleton from "../layout/ArticleSkeleton";
import ArticleCard from "../layout/ArticleCard";
import EmptyState from "../EmptyState";
import Pagination from "../layout/Pagination";
import {paginator} from "../../utils/Helpers/NumberHelper";
import {overrideQueries} from "../../utils/Helpers/URLHelper";
import {useHistory} from "react-router-dom";
import {isSolidValue} from "../../utils/Helpers/VariableHelper";
import queryString from "query-string";
import { TabView, TabPanel } from 'primereact/tabview';

const api = createAxios()

const NewsFeedContent = (props) => {
    const history = useHistory()
    const [filter, setFilter] = useState({
        page: 1,
        per_page: isMobile ? 10 : 15,
    });
    const [loading, setLoading] = useState(false)
    const [NewFeedArticles, setNewFeedArticles] = useState([])
    const [userFavorites, setUserFavorites] = useState([]);
    const [total, setTotal] = useState(0)


    useEffect(() => {
        const initialFilters = getFilterParams();
        setFilter(initialFilters);
        gettingFavorite()
    }, []);

    useEffect(() => {
        gettingNewsFeed();
    }, [filter]);

    const gettingFavorite = () => {
        api.get('/user-favorites')
            .then((response) => {
                const data = response.data.data
                setUserFavorites(data)
            })
            .catch(() => {
                toast('Getting error while retrieving user favorite', {
                    type: 'error',
                    autoClose: 1000,
                })
                console.log('Getting error while get favorite')
            })
    }

    const gettingNewsFeed = () => {
        setLoading(true)
        api.get('/user-news-feed?' + queryString.stringify(filter))
            .then((response) => {
                const data = response.data.data;
                console.log({total_items: data?.total_items})
                setTotal(data?.total_items);
                setNewFeedArticles(data.data);
                setTimeout(() => {
                    setLoading(false)
                }, 200)
            })
            .catch(() => {
                toast('Getting error while retrieving news feed', {
                    type: 'error',
                    autoClose: 1000,
                })
                console.log('Getting error while get news feed')
            })
    }

    const setPage = (value) => {
        if (filter.page !== value) {
            const updatedFilter = {...filter, page: value};
            setFilter(updatedFilter);
            history.replace(overrideQueries(updatedFilter));
        }
    };

    const getFilterParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            page: isSolidValue(params.get('page')) ? parseInt(params.get('page')) : 1,
            per_page: isMobile ? 10 : 15,
        };
    };


    return (
        <>
            <div className="hero overlay inner-page bg-primary py-5">
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">
                        <div className="col-lg-6">
                            <h1 className="heading text-white mb-3" data-aos="fade-up">My News Feed</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <div className="row posts-entry w-100">
                        <TabView>
                            <TabPanel header="Your favorite">
                                <div className='col-md-11 col-lg-11 col-12 d-flex justify-content-center align-content-center'>
                                    <div className="col-lg-12 col-12 col-md-12 justify-content-center">
                                        {
                                            loading ? (
                                                    [1, 2, 3, 4].map((a) => {
                                                        return <ArticleSkeleton key={a}/>
                                                    })
                                                ) :
                                                (
                                                    userFavorites?.length > 0 ? userFavorites?.map((article) => {
                                                        return (
                                                            <ArticleCard
                                                                key={article.id}
                                                                article={article.article}
                                                                isNewsFeed={true}
                                                            />
                                                        )
                                                    }) : <EmptyState
                                                     title={"OooH, oH There no results to here."}
                                                     subTitle={"Will view when you add to your favorite"}
                                                    />
                                                )
                                        }
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="Your News Feed">
                                <div className='col-md-11 col-lg-11 col-12 d-flex justify-content-center align-content-center'>
                                    <div className="col-lg-12 col-12 col-md-12 justify-content-center">
                                        {
                                            loading ? (
                                                    [1, 2, 3, 4].map((a) => {
                                                        return <ArticleSkeleton key={a}/>
                                                    })
                                                ) :
                                                (
                                                    NewFeedArticles?.length > 0 ? NewFeedArticles?.map((article) => {
                                                        return (
                                                            <ArticleCard
                                                                key={article.id}
                                                                article={article}
                                                                isNewsFeed={true}
                                                            />
                                                        )
                                                    }) : <EmptyState
                                                        title={"OooH, oH There no results to here."}
                                                        subTitle={"Update your news feed to see the results here."}
                                                    />
                                                )
                                        }

                                        <div className="row text-start pt-5 border-top d-flex justify-content-center text-center">
                                            <Pagination
                                                {...paginator(filter.page, total, filter.per_page)}
                                                onPageChange={setPage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabView>

                    </div>
                </div>
            </div>
        </>
    )


}

export default NewsFeedContent