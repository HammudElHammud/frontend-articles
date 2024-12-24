import React from 'react'
import styled from "styled-components";
import {Tooltip as ReactTooltip} from 'react-tooltip'
import moment from "moment";
import {useHistory} from "react-router-dom";
import SaveArticle from "../Article/SaveArticle";


const StyledTooltip = styled(ReactTooltip)`
  white-space: normal;
  max-width: 300px;
  border-radius: 5px;
  background: #131c24;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #FFF;
`
const Tooltip = (props) => (
    <StyledTooltip
        effect="solid"
        getContent={function () {
            return (
                <div>
                    <p className="my-2">{props.content}</p>
                </div>
            )
        }}
        backgroundColor='rgba(0, 0, 0, 0.85)'
        textColor='#FFF'
        zIndex='9999999'
        place="top"
        {...props}
    />
)


const ArticleCard = (props) => {
    const history = useHistory()

    return (
        <>
            <div className="row col-12 col-md-12 col-lg-12">
                <div className="blog-entry d-flex justify-content-start blog-entry-search-item">
                    <a href="#" className="img-link me-4">
                        <img
                            src={props?.article?.urlToImage ? props?.article?.urlToImage : 'https://picsum.photos/200'}
                            alt={props?.article?.title}
                            className="img-fluid fixed-image article-image"
                        />
                    </a>
                    <div className="blog-details">
                       <span className="date">
                         {moment(props?.article?.publishedAt).format('LL')} • <a
                           href="#">{props?.article?.category?.name}</a>
                          </span>
                        <h2 data-tooltip-id="my-tooltip-title"
                            data-tooltip-content={props?.article?.title}>
                            <a href="#">
                                {props?.article?.title?.length > 50 ? props?.article?.title.substring(0, 50) + '...' : props?.article?.title}
                            </a>
                        </h2>
                        <Tooltip
                            content={props?.article?.title}
                            id={'my-tooltip-title'}/>
                        <p
                        >
                            {props?.article?.description?.length > 50 ? props?.article?.description?.substring(0, 50) : props?.article?.description}
                        </p>
                        <p className='d-flex'>
                            <a href="#" className="btn btn-sm btn-outline-primary"
                               onClick={(e) => {
                                   e.preventDefault();
                                   history.replace('/article/' + props?.article?.id)
                               }}
                            >
                                Read More
                            </a>
                            {
                                props.isNewsFeed ? null : <SaveArticle
                                    article={props.article}
                                    userFavorites={props.userFavorites}
                                />
                            }

                        </p>

                    </div>
                </div>
            </div>
        </>
    )

}


export default ArticleCard