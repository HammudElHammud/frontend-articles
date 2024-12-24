export function isSolidValue(value) {
	if (value === null || value === undefined) {
		return false
	}
	if (typeof value === 'string' && value.length === 0) {
		return false
	}

	if (Array.isArray(value) && value.length === 0) {
		return false
	}

	return !(typeof value === 'object' && Object.keys(value).length === 0)
}

export function  getFirstAndLastDayOfTheWeek () {
	let a = new Date();
	let b = new Date();
	const weekDay = a.getDay();

	if (weekDay === 0) {
		a.setDate(a.getDate() - 6);
	} else if (weekDay === 1) {
		b.setDate(b.getDate() + 7 - b.getDay());
	} else if (weekDay >= 1) {
		a.setDate(a.getDate() - a.getDay() + 1);
		b.setDate(b.getDate() + 7 - b.getDay());
	}

	return {firstWeekDate: a, lastWeekDate: b};
}
