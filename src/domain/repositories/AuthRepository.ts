export default interface AuthRepository {
    login(email: string, password: string): Promise<any>;
    register(email: string, password: string): Promise<any>;
}
