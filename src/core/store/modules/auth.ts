import { loginUseCase, registerUseCase } from '../../../domain/usecases/auth';
import User from '../../../domain/models/User';

export interface AuthState {
    user: User | null;
}

const state: AuthState = {
    user: JSON.parse(localStorage.getItem('user') as string) || null
};

const mutations = {
    setUser(state: AuthState, user: User) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state: AuthState) {
        state.user = null;
        localStorage.removeItem('user');
    }
};

const actions = {
    async login({ commit }: any, { email, password }: { email: string; password: string }) {
        const user = await loginUseCase(email, password);
        commit('setUser', user);
    },
    async register({ commit }: any, { email, password }: { email: string; password: string }) {
        const user = await registerUseCase(email, password);
        commit('setUser', user);
    },
    logout({ commit }: any) {
        commit('logout');
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
