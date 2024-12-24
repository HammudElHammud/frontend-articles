import React, {useEffect, useState} from 'react'
import {createAxios} from "../../utils/Helpers/AxiosHelper";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import moment from "moment";

const api = createAxios()
const Footer = () => {
    const history = useHistory()
    const [recentArticles, setRecentArticles] = useState([])

    useEffect(()=>{
        gettingRecentArticles()
    }, [])

    const gettingRecentArticles = () => {
        api.get('/recent/article' )
            .then((response) => {
                const responseData = response.data
                setRecentArticles(responseData.data)
            })
            .catch(() => {
                toast('Getting error while retrieving articles', {
                    type: 'error',
                    autoClose: 1000,
                })
            })
    }

    return (
        <>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="widget">
                                <h3 className="mb-4">About</h3>
                                <p>
                                    Far far away, behind the word mountains, far from the countries
                                    Vokalia and Consonantia, there live the blind texts.
                                </p>
                            </div>
                            <div className="widget">
                                <h3>Social</h3>
                                <ul className="list-unstyled social">
                                    <li>
                                        <a href="#">
                                            <span className="icon-instagram" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon-facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon-linkedin" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon-pinterest" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon-dribbble" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 ps-lg-5">
                            <div className="widget">
                                <h3 className="mb-4">Company</h3>
                                <ul className="list-unstyled float-start links">
                                    <li>
                                        <a href="#">About us</a>
                                    </li>
                                    <li>
                                        <a href="#">Services</a>
                                    </li>
                                    <li>
                                        <a href="#">Vision</a>
                                    </li>
                                    <li>
                                        <a href="#">Mission</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy</a>
                                    </li>
                                </ul>
                                <ul className="list-unstyled float-start links">
                                    <li>
                                        <a href="#">Partners</a>
                                    </li>
                                    <li>
                                        <a href="#">Business</a>
                                    </li>
                                    <li>
                                        <a href="#">Careers</a>
                                    </li>
                                    <li>
                                        <a href="#">Blog</a>
                                    </li>
                                    <li>
                                        <a href="#">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="#">Creative</a>
                                    </li>
                                </ul>
                            </div>

                        </div>{" "}

                        <div className="col-lg-4">
                            <div className="widget">
                                <h3 className="mb-4">Recent Post Entry</h3>
                                <div className="post-entry-footer">
                                    <ul>
                                        {
                                            recentArticles?.map((article)=>{
                                                return (
                                                    <li key={article.title}
                                                    >
                                                        <a href="#" onClick={(e)=>{
                                                            e.preventDefault();
                                                            history.replace('/article/' + article?.id)
                                                        }}>
                                                            <img
                                                                src={article?.urlToImage
                                                                    ? article?.urlToImage
                                                                    : 'https://picsum.photos/200'}
                                                                alt="Image placeholder"
                                                                className="me-4 rounded"
                                                            />
                                                            <div className="text">
                                                                <h4>
                                                                    {article?.title}
                                                                </h4>
                                                                <div className="post-meta">
                                                                    <span className="mr-2">{moment(article?.publishedAt).format('LL')} </span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>{" "}

                        </div>{" "}
                    </div>{" "}
                </div>{" "}
            </footer>
        </>
    )

}


export default Footer