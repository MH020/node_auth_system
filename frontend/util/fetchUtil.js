import { BASE_URL }  from '../src/store/generalstore'

export async function fetchGet(endpoint) {
    try {
        const response = await fetch(BASE_URL + endpoint, {
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function fetchPost(endpoint, body) {
    console.log("run fetch login ?")

    const response = await fetch("http://localhost:8080"+ endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    console.log(response)
    console.log(BASE_URL + endpoint)
    const data = await response.json(); 
    return {status: response.status , ...data};
}