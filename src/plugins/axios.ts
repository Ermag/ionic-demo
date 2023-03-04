import axios from 'axios';
import { APP_CONFIG  } from '../config';
import { useAuthStore } from '../store';

axios.defaults.baseURL = APP_CONFIG.API_URL

axios.interceptors.request.use(function (config) {
    const { token } = useAuthStore();
    console.log(token)
	if (!config.headers.Authorization && token) {
		config.headers.Authorization = `${token}`;
	}

	return config;
})
