import { Id } from 'whatsapp-lp/dist/api/model/id';
import { GroupChangeEvent } from 'whatsapp-lp/dist/api/model/enum';
export interface ParticipantEvent {
    by: Id;
    action: GroupChangeEvent;
    who: [Id];
}
