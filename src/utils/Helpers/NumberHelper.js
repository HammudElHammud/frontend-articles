export function numberFormat(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function paginator(currentPage, total, perPage = 20) {
	const last = Math.ceil(total / perPage)
	currentPage = currentPage > last ? 1 : currentPage
	return {
		first: 1,
		current: currentPage,
		perPage: perPage,
		total: total,
		last: last,
		next: currentPage + 1 > last ? currentPage : currentPage + 1,
		previous: currentPage - 1 < 1 ? 0 : currentPage - 1,
	}
}

export function random(start, end) {
	return Math.random() * (end - start) + start
}
