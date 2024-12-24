import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from "react-router-dom";
import {createAxios} from "../../utils/Helpers/AxiosHelper";
import person1 from '../../assets/images/person_1.jpg'
import person2 from '../../assets/images/person_2.jpg'
import hero_5 from '../../assets/images/hero_5.jpg'
import {validateID} from "../../utils/Helpers/StringHelpers";
import {toast} from "react-toastify";
import moment from "moment";
import ArticleDetailsSkeleton from "./ArticleDetailsSkeleton";

const api = createAxios()
const ArticleContent = (props) => {
    const history = useHistory()
    const {id} = useParams()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(false)
    const [relatedArticles, setRelatedArticles] = useState([])

    const scrollToTop = () => {
        window.scroll({
            top: 150,
            left: 0,
            behavior: 'smooth'
        });
    }


    useEffect(() => {
        gettingItemById()
    }, [id])

    const gettingItemById = () => {
        if (validateID(id)) {
            setLoading(true)
            api.get('article/' + id)
                .then((response) => {
                    const responseData = response.data
                    setArticle(responseData.data.article)
                    setRelatedArticles(responseData.data.relatedArticles)

                    setTimeout(()=>{
                        setLoading(false)
                    }, 400)
                })
                .catch(() => {
                    toast('Getting error while retrieving article', {
                        type: 'error',
                        autoClose: 1000,
                    })
                    history.replace('/')
                })
        } else {
            toast('Invalid ID', {
                type: 'error',
                autoClose: 1000,
            })
            history.replace('/')
        }
    }


    return (
        <>
            <div>
                <div className="site-cover site-cover-sm same-height overlay single-page"
                     style={{backgroundImage: `url(${hero_5})`}}>
                    <div className="container">
                        <div className="row same-height justify-content-center">
                            <div className="col-md-6">
                                <div className="post-entry text-center">
                                    <h1 className="mb-4">{article?.title}</h1>
                                    <div className="post-meta align-items-center text-center">
                                        <figure className="author-figure mb-0 me-3 d-inline-block">
                                            <img src={person1}
                                                 alt="Image"
                                                 className="img-fluid"/>
                                        </figure>
                                        <span className="d-inline-block mt-1">By {article?.author}</span>
                                        <span>&nbsp;-&nbsp; {moment(article?.publishedAt).format('LL')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loading ? <ArticleDetailsSkeleton/> : <section className="section">
                        <div className="container">
                            <div className="row blog-entries element-animate">
                                <div className="col-md-12 col-lg-8 main-content">
                                    <div className="post-content-body">
                                        <p>{article?.description}</p>
                                        <p>{article?.content}</p>
                                        <div className="row my-4">
                                            <div className="col-md-12 mb-4">
                                                <img src={article?.urlToImage ? article?.urlToImage
                                                    : 'https://picsum.photos/200'}
                                                     alt="Image placeholder"
                                                     className="img-fluid rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-5">
                                        <p>Categories: <a href="#">{article?.category?.name}</a>
                                        </p>
                                        <p>Page Url <a href={article?.url} target="_blank">{article?.url}</a>
                                        </p>
                                    </div>

                                </div>
                                <div className="col-md-12 col-lg-4 sidebar">
                                    <div className="sidebar-box">
                                        <div className="bio text-center">
                                            <img src={person2} alt="Image Placeholder"
                                                 className="img-fluid mb-3"/>
                                            <div className="bio-body">
                                                <h2>{article?.author}</h2>
                                                <p><a href="#" className="btn btn-primary btn-sm rounded px-2 py-2">Read my
                                                    bio</a></p>
                                                <p className="social">
                                                    <a href="#" className="p-2"><span className="fa fa-facebook"/></a>
                                                    <a href="#" className="p-2"><span className="fa fa-twitter"/></a>
                                                    <a href="#" className="p-2"><span className="fa fa-instagram"/></a>
                                                    <a href="#" className="p-2"><span className="fa fa-youtube-play"/></a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sidebar-box">
                                        <h3 className="heading">Popular Posts</h3>
                                        <div className="post-entry-sidebar">
                                            <ul>
                                                {
                                                    relatedArticles.map((article) => {
                                                        return (
                                                            <li key={article.id}>
                                                                <a href onClick={() => {
                                                                    history.replace('/article/' + article.id)
                                                                    scrollToTop()
                                                                }}>
                                                                    <img
                                                                        src={article?.urlToImage ? article?.urlToImage
                                                                            : 'https://picsum.photos/200'}
                                                                        alt="Image placeholder"
                                                                        className="me-4 rounded"/>
                                                                    <div className="text">
                                                                        <h4>{article?.title}</h4>
                                                                        <div className="post-meta">
                                                                        <span
                                                                            className="mr-2">{moment(article?.publishedAt).format('LL')} </span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }

            </div>
        </>
    )


}

export default ArticleContent