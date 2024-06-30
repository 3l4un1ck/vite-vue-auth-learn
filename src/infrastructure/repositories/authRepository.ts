import AuthRepository from '../../domain/repositories/AuthRepository';
import { login, register } from '../api/authApi';

class AuthRepositoryImpl implements AuthRepository {
    async login(email: string, password: string): Promise<any> {
        return login(email, password);
    }

    async register(email: string, password: string): Promise<any> {
        return register(email, password);
    }
}

export default new AuthRepositoryImpl();
