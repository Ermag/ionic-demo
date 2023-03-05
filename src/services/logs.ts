import { useLogsStore } from '../store';

export const logRequests = (config: any) => {
    const { logRequest } = useLogsStore();
    const { baseURL, url } = config;

    logRequest(`${baseURL}${url}`);

    // TODO: Add persistance

	return config;
}
