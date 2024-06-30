import httpClient from '../../core/http';

export const login = async (email: string, password: string): Promise<any> => {
    const response = await httpClient.post('/login', { email, password });
    return response.data;
};

export const register = async (email: string, password: string): Promise<any> => {
    const response = await httpClient.post('/register', { email, password });
    return response.data;
};
