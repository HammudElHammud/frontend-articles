import React, { useState } from 'react'
import { range } from '../../utils/Helpers/ArrayHelper'
import { isMobile } from 'react-device-detect'

const Pagination = (props) => {
	const [paginationCount, setPaginationCount] = useState(isMobile ? 1 : 5)
	const scrollToTop = () => {
		window.scroll({
			top: 0, 
			left: 0, 
			behavior: 'smooth'
		});
	}

	if (props.total <= 0 || props.total <= props.perPage) {
		return <></>
	}
	return (
		<div className={ "mb-3 pt-0 d-flex  pagination  mt-2 justify-content-center"}
		style={{}}
		 >
			{props?.first !== props?.current ? (
				<li
					className={
						'page-item ' +
						(props.first === props.current
							? 'disabled cursor-not-allowed'
							: 'cursor-pointer')
					}
					onClick={() => {
						if (props.first !== props.current) {
							props.onPageChange(props.first)
						}
						scrollToTop()
					}}
				>
					<span className="page-link">&lt;&lt;</span>
				</li>
			) : null}

			<li
				className={
					'page-item ' +
					(props.previous < 1 ? 'disabled cursor-not-allowed' : 'cursor-pointer')
				}
				style={{
					borderTopLeftRadius: '30% !important'
				}}

				onClick={() => {
					if (props.previous >= 1) {
						props.onPageChange(props.previous)
					}
					scrollToTop()
				}}
			>
				<span className="page-link">&lt;</span>
			</li>

			{range(
				props.current - paginationCount <= 0 ? 1 : props.current - paginationCount,
				(props.current + paginationCount > props.last
					? props.last
					: props.current + paginationCount) + 1,
			).map((value) => {
				return (
					<li
						key={'pagination-index' + value}
						className={
							'page-item ' + (value === props.current ? 'active' : 'cursor-pointer')
						}
						onClick={() => {
							if (value !== props.current) {
								props.onPageChange(value)
							}
							scrollToTop()
						}}
					>
						<span className="page-link">{value}</span>
					</li>
				)
			})}

			<li
				className={
					'page-item ' +
					(props.next === props.last ? 'disabled cursor-not-allowed' : 'cursor-pointer')
				}
				onClick={() => {
					if (props.next !== props.last) {
						props.onPageChange(props.next)
					}
					scrollToTop()
				}}
			>
				<span className="page-link">&gt;</span>
			</li>
			{
				props?.last !== props?.current ? (
					<li
						className={
							'page-item ' +
							(props.last === props.current
								? 'disabled cursor-not-allowed'
								: 'cursor-pointer')
						}
						onClick={() => {
							if (props.last !== props.current) {
								props.onPageChange(props.last)
							}
							scrollToTop()
						}}
					>
						<span className="page-link">&gt;&gt;</span>
					</li>
				) : null
			}

		</div>
	)
}

export default Pagination