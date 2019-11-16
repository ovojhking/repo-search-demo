const DateFormat = class DateFormat {
	constructor() {
		this.dateFormated = null;
		this.monthsInEnglish = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	}

	init(date) {
		const dateFormated = new Date(date);
		this.dateFormated = dateFormated;
	}

	getAmericanFormat() {
		return `${this.monthsInEnglish[this.dateFormated.getMonth()]} ${this.dateFormated.getDate()} ${this.dateFormated.getFullYear()}`;
	}

	getBritishFormat() {
		return `${this.dateFormated.getDate()} ${this.monthsInEnglish[this.dateFormated.getMonth()]} ${this.dateFormated.getFullYear()}`;
	}
};

export default DateFormat;
