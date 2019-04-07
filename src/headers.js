let headers = { 
	headers: {
		"authorization": "Bearer " + document.cookie.split('token=')[1].split('; ')[0],
		"user_session": document.cookie.split('user_session=')[1].split('; ')[0],
		"user_authority": document.cookie.split('user_authority=')[1].split('; ')[0]
	}
}

export default headers;