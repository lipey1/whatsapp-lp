import { Id } from 'whatsapp-lp/dist/api/model/id';
import { AckType } from 'whatsapp-lp/dist/api/model/enum';
export interface Ack {
    id: Id;
    body: string;
    type: string;
    t: number;
    subtype: any;
    notifyName: string;
    from: string;
    to: string;
    self: string;
    ack: AckType;
    invis: boolean;
    isNewMsg: boolean;
    star: boolean;
    loc: string;
    lat: number;
    lng: number;
    mentionedJidList: any[];
    isForwarded: boolean;
    labels: any[];
    ephemeralStartTimestamp: number;
}
