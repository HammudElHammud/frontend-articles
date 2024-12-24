import React, {useEffect, useState} from 'react'
import {createAxios} from "../../utils/Helpers/AxiosHelper";
import ArticleCard from "./ArticleCard";
import FilterSide from "./FilterSide";
import {isMobile} from "react-device-detect";
import {isSolidValue} from "../../utils/Helpers/VariableHelper";
import {overrideQueries} from "../../utils/Helpers/URLHelper";
import {useHistory} from "react-router-dom";
import Pagination from "./Pagination";
import {paginator} from "../../utils/Helpers/NumberHelper";
import queryString from "query-string";
import ArticleSkeleton from "./ArticleSkeleton";
import EmptyState from "../EmptyState";
import NewsFeedArticle from "../Article/NewsFeedArticle";
import {toast} from "react-toastify";
import {isLogin} from "../../utils/Helpers/UserHelper";


const ContentSearchWrap = () => {
    const api = createAxios()
    const history = useHistory();
    const [filter, setFilter] = useState({
        keyword: '',
        start_date: '',
        end_date: '',
        category_id: null,
        source_id: null,
        page: 1,
        per_page: isMobile ? 10 : 15,
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [source, setSources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);

    useEffect(() => {
        const initialFilters = getFilterParams();
        setFilter(initialFilters);
    }, []);

    useEffect(() => {
        gettingArticles();
    }, [filter]);

    useEffect(()=>{
        gettingCategories()
        gettingSources()
    }, [])

    useEffect(()=>{
        if (isLogin()){
            gettingFavorite()
        }

    }, [localStorage.getItem('access_token')])



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
    const gettingCategories = () => {
        api.get('/category')
            .then((response) => {
                const data = response.data.data
                setCategories(data)
            })
            .catch(() => {
                toast('Getting error while retrieving category', {
                    type: 'error',
                    autoClose: 1000,
                })
                console.log('Getting error while get categories')
            })
    }


    const gettingSources = () => {
        api.get('/source')
            .then((response) => {
                const data = response.data.data
                setSources(data)
            })
            .catch(() => {
                toast('Getting error while retrieving source', {
                    type: 'error',
                    autoClose: 1000,
                })
                console.log('Getting error while get categories')
            })
    }



    const getFilterParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            keyword: isSolidValue(params.get('keyword')) ? params.get('keyword') : '',
            start_date: isSolidValue(params.get('start_date')) ? params.get('start_date') : '',
            end_date: isSolidValue(params.get('end_date')) ? params.get('end_date') : '',
            category_id: isSolidValue(params.get('category_id')) ? parseInt(params.get('category_id')) : null,
            source_id: isSolidValue(params.get('source_id')) ? parseInt(params.get('source_id')) : null,
            page: isSolidValue(params.get('page')) ? parseInt(params.get('page')) : 1,
            per_page: isMobile ? 10 : 15,
        };
    };

    const gettingArticles = () => {
        setLoading(true)
        api.get('/article?' + queryString.stringify(filter))
            .then((response) => {
                const data = response.data.data;
                setTotal(data.total);
                setArticles(data.data);
                setTimeout(() => {
                    setLoading(false)
                }, 200)
            })
            .catch(() => {
                console.log('Error while getting articles');
            });
    };

    const setPage = (value) => {
        if (filter.page !== value) {
            const updatedFilter = {...filter, page: value};
            setFilter(updatedFilter);
            history.replace(overrideQueries(updatedFilter));
        }
    };

    const onClickToCategory = (value) => {
        if (filter.category_id !== value) {
            const updatedFilter = {...filter, category_id: value, page: 1};
            setFilter(updatedFilter);
            history.replace(overrideQueries(updatedFilter));
        }
    };

    const onClickToSource = (value) => {
        if (filter.source_id !== value) {
            const updatedFilter = {...filter, source_id: value, page: 1};
            setFilter(updatedFilter);
            history.replace(overrideQueries(updatedFilter));
        }
    };


    const onClickFilter = (filterResult) => {
        setFilter({...filterResult, page: 1})

        history.replace(overrideQueries({...filterResult, page: 1, perPage: filter.perPage,}))
    }

    return (
        <>
            <div className="section search-result-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <div className="heading">Category: {
                                filter.category_id === null ? "All Categories" : articles[0]?.category?.name
                            } </div>
                            <NewsFeedArticle
                             sources={source}
                             categories={categories}

                            />
                        </div>
                    </div>
                    <div className="row posts-entry">
                        <div className="col-lg-8">
                            {
                                loading ? (
                                        [1, 2, 3, 4].map((a) => {
                                            return <ArticleSkeleton key={a}/>
                                        })
                                    ) :
                                    (
                                        articles.length > 0 ? articles?.map((article) => {
                                            return (
                                                <ArticleCard
                                                    key={article.id}
                                                    article={article}
                                                    userFavorites={userFavorites}
                                                />
                                            )
                                        }) : <EmptyState/>
                                    )
                            }

                            <div className="row text-start pt-5 border-top d-flex justify-content-center text-center">
                                <Pagination
                                    {...paginator(filter.page, total, filter.per_page)}
                                    onPageChange={setPage}
                                />
                            </div>
                        </div>
                        <FilterSide
                            categories={categories}
                            sources={source}
                            filter={filter}
                            onClickToCategory={onClickToCategory}
                            onClickToSource={onClickToSource}
                            onClickFilter={onClickFilter}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default ContentSearchWrap