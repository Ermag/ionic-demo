import axios from 'axios';
import { APP_CONFIG  } from '../config';
import { authRequestDecorator } from '../services/auth';
import { logRequests } from '../services/logs';

axios.defaults.baseURL = APP_CONFIG.API_URL
axios.interceptors.request.use(authRequestDecorator)
axios.interceptors.request.use(logRequests)
