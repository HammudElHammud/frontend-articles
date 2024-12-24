import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const FilterSide = (props) => {
    const history = useHistory()
    const [keyword, setKeyword] = useState(props.filter.keyword)
    const [start_date, setStart_date] = useState(props.filter.start_date)
    const [end_date, setEnd_date] = useState(props.filter.end_date)
    const [categories, setCategories] = useState([])
    const [sources, setSources] = useState([])

    useEffect(()=>{
      setSources(props.sources)
      setCategories(props.categories)
    }, [props.categories, props.sources])



    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;

        if (end_date && new Date(newStartDate) > new Date(end_date)) {
            toast('Start date cannot be later than end date', {
                type: 'error',
                autoClose: 1000,
            })
        }else setStart_date(newStartDate);
    };

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;

        if (start_date && new Date(newEndDate) < new Date(start_date)) {
            toast('End date cannot be earlier than start date', {
                type: 'error',
                autoClose: 1000,
            })
        }else setEnd_date(newEndDate);
    };

    const handleFilterSubmit = (e) => {

        e.preventDefault()
        setTimeout(() => {
            props.onClickFilter({
                keyword,
                category_id: props.filter.category_id,
                end_date: end_date,
                start_date: start_date
            })
        }, 100)
    }


    return (
        <>
            <div className="col-lg-4 sidebar">
                <div className="sidebar-box search-form-wrap mb-4">
                    <form action=""
                          onSubmit={(e) => {
                              handleFilterSubmit(e)
                          }}
                          className="sidebar-search-form">
                        <span className="bi-search"/>
                        <input
                            type="text"
                            className="form-control"
                            id="keyword"
                            name='keyword'
                            value={keyword}
                            onChange={(e)=>setKeyword(e.target.value)}
                            placeholder="Type a keyword and hit enter"
                        />
                        <span className="bi-search"/>
                        <input
                            type="text"
                            className="form-control"
                            id="start_date"
                            name='start_date'
                            value={start_date}
                            onChange={(e)=>handleStartDateChange(e)}
                            placeholder="Select a start date and hit enter"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                        />
                        <span className="bi-search"/>
                        <input
                            type="text"
                            className="form-control"
                            id="end_date"
                            name='end_date'
                            value={end_date}
                            onChange={(e)=>handleEndDateChange(e)}
                            placeholder="Select a end date and hit enter"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                        />
                        <div className='d-flex justify-content-between'>
                            <button className="btn btn-sm btn-primary"
                             onClick={(e)=>{
                                 handleFilterSubmit(e)
                             }}
                            >
                                Filter
                            </button>
                            <button  className="btn btn-sm btn-outline-primary"
                             onClick={(e)=>{
                                 e.preventDefault()
                                 setKeyword('')
                                 setEnd_date('')
                                 setStart_date('')

                                 props.onClickFilter({
                                     keyword: '',
                                     category_id: null,
                                     start_date: '',
                                     end_date: ''
                                 })
                                 history.replace('/')
                             }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                <div className="sidebar-box">
                    <h3 className="heading">Categories</h3>
                    <ul className="categories">
                        {
                            categories?.map((category)=>{
                                return (
                                    <>
                                        <li
                                            className='pointer-event'
                                            onClick={()=>{
                                                props?.onClickToCategory(category?.id)
                                            } }
                                            key={category?.name}>
                                            <a className='pointer-event' >
                                                {category?.name} <span>({category?.articles_count})</span>
                                            </a>
                                        </li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="sidebar-box">
                    <h3 className="heading">Sources</h3>
                    <ul className="categories">
                        {
                            sources?.map((source)=>{
                                return (
                                    <>
                                        <li
                                            className='pointer-event'
                                            onClick={()=>{
                                                props?.onClickToSource(source?.id)
                                            } }
                                            key={source?.name}>
                                            <a className='pointer-event' >
                                                {source?.name} <span>({source?.articles_count})</span>
                                            </a>
                                        </li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )

}


export default FilterSide