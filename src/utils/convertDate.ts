export function convertDate(date: Date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`} - ${day > 9 ? day : `0${day}`}/${month > 9 ? month : `0${month}`}/${year}`;
}
