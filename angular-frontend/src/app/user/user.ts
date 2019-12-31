import { Board } from '../board/board';

export interface Session {
    id: string,
    isValid: boolean,
    admin: boolean,
};
export interface SessionInfo {
    session: Session,
};
export interface Chat {
    author: string,
    body: string,
    date: Date,
};
export interface Info {
    board: Board[],
    session: Session,
    chats: Chat[],
};