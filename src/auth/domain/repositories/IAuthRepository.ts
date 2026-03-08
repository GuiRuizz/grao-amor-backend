export interface ITokenRepository {

    saveRefreshToken(userId: string, token: string): Promise<void>;

    findRefreshToken(token: string): Promise<string | null>;

    deleteRefreshToken(token: string): Promise<void>;

}