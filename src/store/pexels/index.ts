import { readable } from 'svelte/store';

export function initVal() {
	return {
		response: '',
		photos: [],
	}
}

export function makeImagesStore(query: string) {
	const init = initVal();
	const store = readable(init, makeSubscribe(init, query)); 
	return store;
}

function unsubscribe() {
	// Nothing to do in this case
}

function makeSubscribe(data, query) {
	return set => {
		getImagesApi(data, set, query);
		
		return unsubscribe;
	};
}

async function getImagesApi(data, set, query: string) {
  const params = {
    query,
  };
	const queryParams = new URLSearchParams(params); 

	try {
	  await fetch(`https://api.pexels.com/v1/search?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': process.env.PEXELS_API_KEY,
        'Content-Type': 'application/json'
      },
    }).then(async response => {
			const res = await response.json()
			data.photos = res.photos
			data.response = res
			set(data)
		});
	} catch(error) {
		data.error = error;
		set(data);
	}
}

