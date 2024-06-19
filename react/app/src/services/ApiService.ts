import { Endpoint } from "../enums";

/**
 * Retrieves all data that matches the provided type.
 * @param {Endpoint} type
 * @returns
 */
export async function getData<T>(type: Endpoint): Promise<T | false> {
	try {
		const uri = getUri(type);
		const response = await fetch(uri, {
			credentials: "include",
		});
		return await response.json();
	} catch (exception) {
		console.log("exception:", exception);
		return false;
	}
}

/**
 * Returns the URI that corresponds to the provided endpoint type and
 * the current runtime environment. If an id is provided, it will be appended
 * to the uri as such: uri/id.
 * @param {Endpoint} type
 * @param {number} id
 * @returns
 */
export function getUri(type: Endpoint, id?: number): string {
	let host: string;
	if (import.meta.env.DEV) {
		host = "http://localhost:8080";
	} else {
		host = "http://localhost:8080";
	}

	const endpoints = {
		[Endpoint.Categories]: "/api/categories",
		[Endpoint.Forecasts]: "/api/forecasts",
		[Endpoint.Transactions]: "/api/transactions",
		[Endpoint.Types]: "/api/types",
		[Endpoint.Users]: "/api/users",
	};

	let uri = `${host}${endpoints[type]}`;
	if (id) {
		uri = `${uri}/${id}`;
	}

	return uri;
}

/**
 * Sends a POST request to the appropriate endpoint. Any provided data
 * will be JSON serialized prior to sending.
 * @param {Endpoint} type
 * @param {object} data
 * @returns
 */
export async function postData<T>(
	type: Endpoint,
	data: object
): Promise<T | false> {
	try {
		const uri = getUri(type);
		const response = await fetch(uri, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			credentials: "include",
		});

		return await response.json();
	} catch (exception) {
		console.log("exception:", exception);
		return false;
	}
}

/**
 * Sends a DELETE request to the appropriate endpoint based on
 * the type and provided id.
 * @param {Endpoint} type
 * @param {number} id
 * @returns
 */
export async function deleteData(type: Endpoint, id: number) {
	try {
		const uri = getUri(type, id);
		const response = await fetch(uri, {
			method: "DELETE",
			credentials: "include",
		});

		if (response.status >= 200 && response.status < 300) {
			return true;
		} else {
			return false;
		}
	} catch (exception) {
		console.log("exception:", exception);
		throw exception;
	}
}

/**
 * Sends a PUT request to the appropriate endpoint. Any
 * provided data will be JSON serialized prior to sending.
 * @param {Endpoint} type
 * @param {object} data
 * @returns
 */
export async function putData(type: Endpoint, data: object) {
	try {
		const uri = getUri(type);
		const response = await fetch(uri, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			credentials: "include",
		});

		if (response.status >= 200 && response.status < 300) {
			return true;
		} else {
			return false;
		}
	} catch (exception) {
		console.log("exception:", exception);
		throw exception;
	}
}
