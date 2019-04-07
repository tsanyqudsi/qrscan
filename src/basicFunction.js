let basicFunction = {
	getDate: function() {
		let currentdate = new Date();
		let date = currentdate.getDate();
		const monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];
		let month = monthNames[(currentdate.getMonth())];
		let year = currentdate.getFullYear();
		let second = currentdate.getSeconds();
	    let minute = currentdate.getMinutes();
	    let hour = currentdate.getHours();
		let dateObj = {
			date: date,
			month: month,
			year: year,
			second: second,
			minute: minute,
			hour: hour
		}
		return dateObj;
	},

	findMonth: function(fulldate) {
		let month = fulldate.split(" ")[1];
		const monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];

		for(let i = 0; i < monthNames.length; i++) {
			if(month == monthNames[i]) {
				return month;
				break;
			}
		}
	},

	capitalize: function(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	},

	deleteAllCookies: function() {
	    let cookies = document.cookie.split(";");

	    for (let i = 0; i < cookies.length; i++) {
	        let cookie = cookies[i];
	        let eqPos = cookie.indexOf("=");
	        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	}
}

export default basicFunction;