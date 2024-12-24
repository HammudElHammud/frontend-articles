import queryString from 'query-string'

export function getQueries() {
	const params = new URLSearchParams(window.location.search)
	const entries = Object.fromEntries(params.entries())
	Object.entries(entries).forEach(([key, value]) => {
		if (value === 'true') {
			entries[key] = true
		} else if (value === 'false') {
			entries[key] = false
		} else if (!isNaN(+value) && value != '') {
			entries[key] = +value
		}
	})
	return entries
}

export function getHash() {
	let hash = window.location.hash.replaceAll('#', '')
	hash = hash.substr(0, hash.indexOf('?') === -1 ? undefined : hash.indexOf('?'))
	hash = hash.substr(0, hash.indexOf('&') === -1 ? undefined : hash.indexOf('&'))

	return hash
}

export function getPath() {
	if (window.location.pathname.startsWith('/')) {
		return window.location.pathname.substr('/')
	}
	return window.location.pathname
}

export function overrideQueries(
	queries,
	hash,
) {
	return '?' + queryString.stringify(queries) + '#' + (!hash ? getHash() : hash)
}


