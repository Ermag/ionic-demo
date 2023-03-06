import { APP_CONFIG } from '../config';
import { useAuthStore } from '../store';

// Axios interceptor that attaches the auth header
export const authRequestDecorator = (config: any) => {
	const { token } = useAuthStore();

	if (!config.headers.Authorization && token) {
		config.headers[APP_CONFIG.API_AUTH_HEADER] = `${token}`;
	}

	return config;
}

// Handles vue routing based on auth
export const authRouterHook = async (to: any, from: any, next: any): Promise<void> => {
	const { requiresAuth } = to.meta;
	const { isLoggedIn } = useAuthStore();

	if (requiresAuth && !isLoggedIn) {
		return next({ name: 'login' });
	} else if (isLoggedIn && to.name === 'login') {
		return next({ name: 'home' });
	}

	next();
}
