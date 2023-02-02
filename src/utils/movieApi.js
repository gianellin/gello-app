import tokenService from "./tokenService";
const BASE_URL = '/api/movies/';

export function create(movie){
	return fetch(BASE_URL, { // (form data) no need to do JSON things
		method: 'POST',
		body: movie,
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
		
		}

	}).then((responseFromTheServer) =>{
		if(responseFromTheServer.ok) return responseFromTheServer.json() // return -> everything okay
		// return -> there was an error from the server
		return responseFromTheServer.json().then(res => {
			console.log(res, ' <- this is the response in Movie create function in your utils folder')
			throw new Error('Something went wrong in create Movie'); // < this goes to the catch block
			// when you call the create function (in handleAddPost in the feed page)
		})
	})
}


export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => res.json());
  }

  export function deleteMovie(movieId) {
    return fetch(`${BASE_URL}/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken(),
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    })
}