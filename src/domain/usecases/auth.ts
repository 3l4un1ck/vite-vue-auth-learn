import authRepository from '../../infrastructure/repositories/authRepository';
import User from '../models/User';

export const loginUseCase = async (email: string, password: string): Promise<User> => {
    const userData = await authRepository.login(email, password);
    return new User(userData);
};

export const registerUseCase = async (email: string, password: string): Promise<User> => {
    const userData = await authRepository.register(email, password);
    return new User(userData);
};
