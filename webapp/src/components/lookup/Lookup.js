function lookup(method, endpoint, parameters, data) {
	data = JSON.stringify(data);
	const response = await fetch(endpoint, {
		method,
		credentials: 'include',
		body: method == "GET" ? data : undefined,
		mode: 'cors',
		headers: {
			"Content-type": "application/json; charset=UTF-8",
	});
};

export default lookup;

