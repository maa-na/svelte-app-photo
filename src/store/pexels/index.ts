import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';

type T = {
	[key: string]: string | number |  {
		[key: string]: string | number | {
			[key: string]: string
		}
	}[]
} | null

type initVal = {
	response: T
	photos: any[]
	error: any
}
export function initVal(): initVal {
	return {
		response: null,
		photos: [],
		error: null
	}
}

export function makeImagesStore(query: string): Readable<initVal> {
	const init = initVal();
	const store = readable(init, makeSubscribe(init, query)); 
	return store;
}

function unsubscribe(): void {
	// Nothing to do in this case
}

function makeSubscribe(data: initVal, query: string): any {
	return set => {
		getImagesApi(data, set, query);
		
		return unsubscribe;
	};
}

async function getImagesApi(data: initVal, set: any, query: string): Promise<void> {
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

