import { Contact } from 'whatsapp-lp/dist/api/model/contact';
import { GroupMetadata } from 'whatsapp-lp/dist/api/model/group-metadata';
import { Id } from 'whatsapp-lp/dist/api/model/id';
export interface Chat {
    archive: boolean;
    changeNumberNewJid: Id;
    changeNumberOldJid: Id;
    contact: Contact;
    ephemeralDuration: number;
    ephemeralSettingTimestamp: number;
    groupMetadata: GroupMetadata;
    id: Id;
    isAnnounceGrpRestrict: boolean;
    isGroup: boolean;
    isOnline: null | boolean;
    isReadOnly: boolean;
    kind: string;
    lastReceivedKey: LastReceivedKey;
    lastSeen: null | number | boolean;
    modifyTag: number;
    msgs: null;
    muteExpiration: number;
    name: string;
    notSpam: boolean;
    pendingMsgs: boolean;
    pin: number;
    presence: Presence;
    t: number;
    unreadCount: number;
}
export interface ProfilePicThumbObj {
    eurl: string;
    id: Id;
    img: string;
    imgFull: string;
    raw: null;
    tag: string;
}
export interface LastReceivedKey {
    fromMe: boolean;
    remote: Id;
    id: string;
    _serialized: string;
}
export interface Presence {
    id: Id;
    chatstates: any[];
}
