export async function lookup(method,data,endpoint) {
    if (method==='GET'){
        const response = await fetch(`http://localhost:5000/api${endpoint}`,{
            method:method,
            credentials: 'include',
            mode:"cors",
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        });
        return await response.json();
        // return response
    }
    const response = await fetch(`http://localhost:5000/api${endpoint}`,{
            method:method,
            body: JSON.stringify(data),
            credentials: 'include',
            mode:"cors",
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        });
    return await response.json();
}