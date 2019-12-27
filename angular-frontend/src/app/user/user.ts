export interface User {
    id: string,
    password: string,
}
export interface Session {
    id: string,
    isValid: boolean,
    admin: boolean,
}
export interface Login {
    session: Session
}