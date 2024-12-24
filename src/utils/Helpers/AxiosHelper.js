import axios from 'axios'
import { getQueries } from './URLHelper'


export function createAxios(baseUrl = process.env.REACT_APP_BACKEND_URL) {
	axios.interceptors.response.use(
		function (response) {
			return response;
		},
		async function (error) {
			const originalRequest = error.config;
			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				try {
					const access_token = await axios.post(
						'token-refresh',
						{
							token: localStorage.getItem('refresh_token'),
						},
					);
					let data = access_token.data; // Added .data to access the response payload
					for (let [key, value] of Object.entries(data)) {
						if (typeof value === 'object') {
							localStorage.setItem(key, JSON.stringify(value));
						} else {
							localStorage.setItem(key, value);
						}
					}
					originalRequest.headers['Authorization'] =
						'Bearer ' + localStorage.getItem('access_token');
					return axios(originalRequest);
				} catch (e) {
					localStorage.clear();
					window.location.replace(
						(process.env.REACT_APP_PUBLIC_URL ?? '/') +
						(getQueries()?.redirect ?? '').substring(1),
					);
				}
			} else {
				return Promise.reject(error);
			}
		},
	);

	const instance = axios.create({
		baseURL: baseUrl,
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`,
			Accept: 'application/json',
		},
	});

	return instance;
}


