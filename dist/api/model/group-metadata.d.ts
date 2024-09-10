import { Id } from 'whatsapp-lp/dist/api/model';
export interface GroupMetadata {
    id: Id;
    creation: number;
    owner: {
        server: string;
        user: string;
        _serialized: string;
    };
    participants: any[];
    pendingParticipants: any[];
}
