import { Page, Browser } from 'puppeteer';
import { CreateConfig } from 'whatsapp-lp/dist/config/create-config';
import { Message, SendFileResult, SendStickerResult } from 'whatsapp-lp/dist/api/model';
import { ChatState } from 'whatsapp-lp/dist/api/model/enum';
import { AutomateLayer } from 'whatsapp-lp/dist/api/layers/AutomateLayer';
export declare class SenderLayer extends AutomateLayer {
    browser: Browser;
    page: Page;
    constructor(browser: Browser, page: Page, session?: string, options?: CreateConfig);
    createCommunity(name: string, description: string): Promise<void>;
    /**
     * Send status text
     * @param text The text for the status
     */
    sendStatusText(text: string): Promise<unknown>;
    /**
     * Create poll
     * @param idUser chat id: xxxxx@us.c
     */
    sendPollCreation(idUser: string, poll: any): Promise<unknown>;
    /**
     * @param filePath path, http link or base64Encoded
     * @param filename
     */
    sendImageStatus(filePath: string, description?: string): Promise<SendFileResult>;
    /**
     * Sends file from path
     * @param filePath File path
     * @param caption
     */
    sendVideoStatus(filePath: string, description?: string): Promise<unknown>;
    /**
     * Sends a text message to given chat
     * @param to chat id: xxxxx@us.c
     * @param content text message
     * @param passId new id
     * @param checkNumber the number when submitting!
     * @param forcingReturn return without sending the message to the server!
     */
    sendText(to: string, content: string, passId?: any, checkNumber?: boolean, forcingReturn?: boolean, delSend?: boolean): Promise<Object>;
    /**
     * Automatically sends a link with the auto generated link preview. You can also add a custom message to be added.
     * @param chatId chat id: xxxxx@us.c
     * @param url string A link, for example for youtube. e.g https://www.youtube.com/watch?v=Zi_XLOBDo_Y&list=RDEMe12_MlgO8mGFdeeftZ2nOQ&start_radio=1
     * @param title custom text as the message body, this includes the link or will be attached after the link
     */
    sendLinkPreview(chatId: string, url: string, title: string, message: string): Promise<object>;
    /**
     * Sends image message base64
     * @param to Chat id
     * @param base64 File path, http link or base64Encoded
     * @param filename
     * @param caption
     */
    sendImageFromBase64(to: string, base64: string, filename?: string, caption?: string, status?: boolean): Promise<SendFileResult>;
    /**
     * only admin send messages
     * @param chatId Group
     * @param {boolean} type 'true' only admin can send messages or 'false' everyone can send
     */
    onlySendAdmin(chatId: string, type: boolean): Promise<unknown>;
    sendMessageOptions(chat: any, content: any, options?: any): Promise<Message>;
    /**
     * Sends image message
     * @param to Chat id
     * @param filePath File path or http link
     * @param filename
     * @param caption
     */
    sendImage(to: string, filePath: string, filename?: string, caption?: string, passId?: any): Promise<SendFileResult>;
    /**
     * Sends message with thumbnail
     * @param thumb
     * @param url
     * @param title
     * @param description
     * @param chatId
     */
    sendMessageWithThumb(thumb: string, url: string, title: string, description: string, chatId: string): Promise<void>;
    /**
     * Replies to given mesage id of given chat id
     * @param to Chat id
     * @param content Message body
     * @param quotedMsg Message id to reply to.
     */
    reply(to: string, content: string, quotedMsg: string): Promise<Message | object>;
    /**
     * Send audio base64
     * @param to Chat id
     * @param base64 base64 data
     * @param passId new id
     */
    sendVoiceBase64(to: string, base64: string, passId?: any): Promise<unknown>;
    /**
     * Send audio file
     * @param to Chat id
     * @param filePath Path file
     * @param passId new id
     * @param checkNumber the number when submitting!
     * @param forcingReturn return without sending the message to the server!
     */
    sendVoice(to: string, filePath: string, passId?: any, checkNumber?: boolean, forcingReturn?: boolean, delSend?: boolean): Promise<unknown>;
    /**
     * Sends file
     * base64 parameter should have mime type already defined
     * @param to Chat id
     * @param base64 base64 data
     * @param filename
     * @param caption
     */
    sendFileFromBase64(to: string, base64: string, filename: string, caption?: string, passId?: any): Promise<SendFileResult>;
    /**
     * Sends file from path
     * @param to Chat id
     * @param filePath File path
     * @param filename
     * @param caption
     */
    sendFile(to: string, filePath: string, filename?: string, caption?: string, passId?: any, checkNumber?: boolean, forcingReturn?: boolean, delSend?: boolean): Promise<unknown>;
    /**
     * Sends a video to given chat as a gif, with caption or not, using base64
     * @param to chat id xxxxx@us.c
     * @param base64 base64 data:video/xxx;base64,xxx
     * @param filename string xxxxx
     * @param caption string xxxxx
     */
    sendVideoAsGif(to: string, path: string, filename: string, caption: string): Promise<void>;
    /**
     * Sends a video to given chat as a gif, with caption or not, using base64
     * @param to chat id xxxxx@us.c
     * @param base64 base64 data:video/xxx;base64,xxx
     * @param filename string xxxxx
     * @param caption string xxxxx
     */
    sendVideoAsGifFromBase64(to: string, base64: string, filename: string, caption: string): Promise<void>;
    /**
     * Sends contact card to iven chat id
     * @param to Chat id
     * @param contactsId Example: 0000@c.us | [000@c.us, 1111@c.us]
     */
    sendContactVcard(to: string, contactsId: string | string[], name?: string): Promise<unknown>;
    /**
     * Send a list of contact cards
     * @param to Chat id
     * @param contacts Example: | [000@c.us, 1111@c.us]
     */
    sendContactVcardList(to: string, contacts: string[]): Promise<unknown>;
    /**
     * Forwards array of messages (could be ids or message objects)
     * @param to Chat id
     * @param messages Array of messages ids to be forwarded
     * @param skipMyMessages
     */
    forwardMessages(to: string, messages: string | string[], skipMyMessages: boolean): Promise<unknown>;
    /**
     * Generates sticker from the provided animated gif image and sends it (Send image as animated sticker)
     *  @param path image path imageBase64 A valid gif image is required. You can also send via http/https (http://www.website.com/img.gif)
     *  @param to chatId '000000000000@c.us'
     */
    sendImageAsStickerGif(to: string, path: string): Promise<SendStickerResult | false>;
    /**
     * Generates sticker from given image and sends it (Send Image As Sticker)
     * @param path image path imageBase64 A valid png, jpg and webp image is required. You can also send via http/https (http://www.website.com/img.gif)
     * @param to chatId '000000000000@c.us'
     */
    sendImageAsSticker(to: string, path: string): Promise<SendStickerResult | false>;
    /**
     * TODO: Fix message not being delivered
     * Sends location to given chat id
     * @param to Chat id
     * @param latitude Latitude
     * @param longitude Longitude
     * @param title Text caption
     */
    sendLocation(to: string, latitude: string, longitude: string, title: string): Promise<unknown>;
    /**
     * Starts typing ('Typing...' state)
     * @param chatId chat id: xxxxx@us.c
     * @param checkNumber the number when submitting!
     */
    startTyping(chatId: string, checkNumber: boolean): Promise<unknown>;
    /**
     * Start Recording
     * @param chatId Chat id
     * @param checkNumber the number when submitting!
     */
    startRecording(chatId: string, checkNumber: boolean): Promise<unknown>;
    /**
     * Mark Paused
     * @param chatId Chat id
     * @param checkNumber the number when submitting!
     */
    markPaused(chatId: string, checkNumber: boolean): Promise<unknown>;
    /**
     * Clear Presence
     * @param chatId Chat id
     */
    clearPresence(chatId: string): Promise<unknown>;
    /**
     * Presence Available
     */
    presenceAvailable(): Promise<void>;
    /**
     * Presence Available
     */
    presenceUnavailable(): Promise<void>;
    /**
     * Sends text with tags
     *
     */
    sendMentioned(to: string, message: string, mentioned: string[]): Promise<void>;
    /**
     * Sets the chat state
     * @param chatState
     * @param chatId
     */
    setChatState(chatId: string, chatState: ChatState): Promise<void>;
    sendReactions(IdMessage: string, emoji: string): Promise<void>;
}
