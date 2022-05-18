const data = {
	'5-6': [49, 21],
	'6-6': [50, 21],
	'5-7': [49, 22],
	'6-7': [50, 22],
	'5-8': [49, 23],
	'6-8': [50, 23],
	'7-8': [51, 23],
	'7-7': [51, 22],
	'7-6': [51, 21],
};

let test = '8-9';
let newData = {};
Object.keys(data).forEach((i, idx, arr) => {
	let [now_x, now_y] = i.split('-').map((i) => Number(i));
	if (idx !== 0) {
		let [last_x, last_y] = arr[idx - 1].split('-').map((i) => Number(i));
		const [client_x, client_y] = Object.keys(newData)
			.pop()
			.split('-')
			.map((i) => Number(i));
		let test2 = `${client_x + (now_x - last_x)}-${client_y + (now_y - last_y)}`;
		newData[test2] = data[i];
		return;
	}
	newData[test] = data[i];
});

console.log(data);
