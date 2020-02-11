declare module pip.support {


export interface IAnalyticsProvider extends ng.IServiceProvider {
    enabled: boolean;
    trackingId: string;
    window: any;
    enable(newTrackingId: string): boolean;
    pageView(url: string, user: any, language: string): any;
    event(category: string, action: string, value: string, user: any, language: string): any;
}

export class Attachment {
    constructor(id?: string, uri?: string, name?: string);
    id?: string;
    uri?: string;
    name?: string;
}

export class Feedback {
    constructor(id: string, category: string, app?: string, sender?: PartyReference, title?: string, content?: string, sent_time?: Date);
    id: string;
    category: string;
    app?: string;
    sender: PartyReference;
    sent_time: Date;
    title?: string;
    content?: string;
    pics: Attachment[];
    docs: Attachment[];
    company_name?: string;
    company_addr?: string;
    copyright_holder?: string;
    original_loc?: string;
    copyrighted_work?: string;
    unauth_loc?: string;
    reply_time?: Date;
    replier?: PartyReference;
    reply?: string;
    custom_hdr?: any;
    custom_dat?: any;
}


export interface IFeedbackDataService {
    readFeedbacks(params: any, successCallback?: (data: PageData) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    readFeedback(id: string, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    createFeedback(data: Feedback, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): void;
    updateFeedback(id: string, data: Feedback, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): void;
    deleteFeedback(id: string, successCallback?: () => void, errorCallback?: (error: any) => void): void;
}


export class PageData {
    data: any[];
    total: number;
}

export class PartyReference {
    constructor(id: string, name?: string, email?: string);
    id: string;
    name?: string;
    email?: string;
}

class FeedbackController {
    private pipToasts;
    private pipTranslate;
    data: any;
    contentSwitchOption: {
        picture: boolean;
        document: boolean;
        location: boolean;
        event: boolean;
    };
    $panel: any;
    callback: Function;
    constructor($rootScope: ng.IRootScopeService, $state: ng.ui.IStateService, pipAppBar: pip.nav.IAppBarService, pipToasts: pip.controls.IToastService, pipTranslate: pip.services.ITranslateService);
    showAppBar(): void;
    onSave(): void;
    onTypeChange(): void;
    saveCallback(): void;
}


interface IFeedbackPanelBindings {
    [key: string]: any;
    data: any;
    created: any;
    showPictures: any;
    showDocuments: any;
    typeCollection: any;
    saveCallback: any;
}
const FeedbackPanelBindings: IFeedbackPanelBindings;
class FeedbackPanelChanges implements ng.IOnChangesObject, IFeedbackPanelBindings {
    [key: string]: ng.IChangesObject<any>;
    data: ng.IChangesObject<FeedbackPanelEntity>;
    created: ng.IChangesObject<any>;
    showPictures: ng.IChangesObject<boolean>;
    showDocuments: ng.IChangesObject<boolean>;
    typeCollection: ng.IChangesObject<FeedbackPanelTypeCollection[]>;
    saveCallback: ng.IChangesObject<Function>;
}
class FeedbackPanelEntity {
    sender_id: string;
    sender_name: string;
    sender_email: string;
    pic_ids: any[];
    docs: any[];
    type: string;
    signature?: string;
    request_conc?: boolean;
    copyright_conc?: boolean;
    unauth_loc?: string;
    copyrighted_work?: string;
    original_loc?: string;
    copyright_holder?: string;
    company_addr?: string;
    company_name?: string;
    content?: string;
    title?: string;
}
class FeedbackPanelTypeCollection {
    id: string;
    name: string;
}
class FeedbackPanelController {
    private pipFeedbackData;
    form: any;
    typeCollection: FeedbackPanelTypeCollection[];
    type: string;
    data: FeedbackPanelEntity;
    showPictures: boolean;
    showDocuments: boolean;
    saveCallback: Function;
    $control: any;
    typeIndex: number;
    pictures: any[];
    docs: any[];
    errorsWithHint: Function;
    $party: any;
    created: any;
    constructor($rootScope: ng.IRootScopeService, pipFeedbackData: any, pipTranslate: pip.services.ITranslateService, pipFormErrors: any);
    onSave(): void;
    onTypeChange(type: FeedbackPanelTypeCollection): void;
}


export interface IFeedbackDialogService {
    show(params: any, successCallback?: (answer) => void, cancelCallback?: () => void): void;
}


function pipFeedbackDataConfig(pipRestProvider: pip.rest.IRestProvider): void;


}
