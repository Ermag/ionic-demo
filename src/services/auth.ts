import { APP_CONFIG  } from '../config';
import { useAuthStore } from '../store';

export const authRequestDecorator = (config: any) => {
    const { token } = useAuthStore();

	if (!config.headers.Authorization && token) {
		config.headers[APP_CONFIG.API_AUTH_HEADER] = `${token}`;
	}

	return config;
}
