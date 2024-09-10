import { Id } from 'whatsapp-lp/dist/api/model/id';
export interface WhatsappProfile {
    id: Id;
    status: number;
    isBusiness: boolean;
    canReceiveMessage: boolean;
    numberExists: boolean;
    profilePic: string;
}
