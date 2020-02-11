import { PartyReference } from './PartyReference';
import { Attachment } from './Attachment';

export class Feedback {

    public constructor(id: string, category: string, app?: string,
        sender?: PartyReference, title?: string, content?: string, sent_time?: Date) {
        this.id = id;
        this.category = category;
        this.app = app;
        this.sender = sender;
        this.title = title;
        this.content = content;

        this.pics = [];
        this.docs = [];
        this.sent_time = sent_time;
    }

    /* Identification */
    public id: string;
    public category: string;
    public app?: string;

    /* Generic request properties */
    public sender: PartyReference;
    public sent_time: Date;

    /* Common properties */
    public title?: string;
    public content?: string;
    public pics: Attachment[];
    public docs: Attachment[];

    /* Copyright/Trademark Violation */
    public company_name?: string;
    public company_addr?: string;
    public copyright_holder?: string;
    public original_loc?: string;
    public copyrighted_work?: string;
    public unauth_loc?: string;

    /* Generic reply properties */
    public reply_time?: Date;
    public replier?: PartyReference;
    public reply?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
