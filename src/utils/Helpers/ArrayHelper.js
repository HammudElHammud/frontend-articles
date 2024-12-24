export function range(start, end, step = 1) {
	if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
		return []
	}

	let result = []
	for (let i = start; step > 0 ? i < end : i > end; i += step) {
		result.push(i)
	}

	return result
}

export function removeOrAdd(arr, value) {
	if (value === undefined || value === null) return arr
	const index = arr.indexOf(value)
	if (index === -1) {
		return [...arr, value]
	} else {
		return [...arr.slice(0, index), ...arr.slice(index + 1)]
	}
}

export function getUniqueListBy(arr, key) {
	return [...new Map(arr.map(item => [item[key], item])).values()]
}
