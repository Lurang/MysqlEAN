export interface SessionInfo {
    session: Session
}
export interface Session{
    id: string,
    isValid: boolean,
    admin: boolean,
}