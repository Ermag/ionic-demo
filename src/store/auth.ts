import { defineStore } from 'pinia';
import axios from 'axios';

interface authState {
    token: null;
    error: null | string;
}

export const useAuthStore = defineStore('authStore', {
    state: (): authState => ({
      token: null,
      error: null,
    }),
    getters: {
      isLoggedIn: (state) => state.token !== null,
      authToken: (state) => state.token,
      authError: (state) => state.error,
    },
    actions: {
        async login (email: string, password: string) {
            const response = {
                status: ''
            }
            try {
                const loginReq = await axios.post('login', { 
                    email,
                    password
                });
                // Dirty fix, API sends improper JSON response
                loginReq.data = loginReq.data.replace('status', '"status"');
                const { status, auth_token } = JSON.parse(loginReq.data);
                response.status = status;

                if (status === 'success') {
                    this.token = auth_token;
                    this.error = null;
                }
            } catch (error: any) {
                console.error(error)
                response.status = 'failure';
                this.error = 'Unable to obtain credentials, please try again later.';
            }
            
            return response;
        },
        logout () {
            this.token = null;
            this.error = null;
            return true;
        }
    }
})
