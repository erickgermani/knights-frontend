export function convertDate(date: Date, includeHours = false) {
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const hoursString = `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const timeString = `${day > 9 ? day : '0' + day}/${month > 9 ? month : '0' + month}/${year}`;

	const dateString = `${includeHours ? hoursString + ' - ' : ''}${timeString}`;

	return dateString;
}
