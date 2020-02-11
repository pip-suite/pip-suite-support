interface IFeedbackPanelBindings {
    [key: string]: any;

    data: any;
    created: any;
    showPictures: any;
    showDocuments: any;
    typeCollection: any;
    saveCallback: any;
}

const FeedbackPanelBindings: IFeedbackPanelBindings = {

    data: '=',
    created: '&pipCreated',
    showPictures: '=',
    showDocuments: '=',
    typeCollection: '<typeCollection',
    saveCallback: '='
}

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
    public sender_id: string;
    public sender_name: string;
    public sender_email: string;
    public pic_ids: any[] = [];
    public docs: any[] = [];
    public type: string;
    public signature?: string;
    public request_conc?: boolean;
    public copyright_conc?: boolean;
    public unauth_loc?: string;
    public copyrighted_work?: string;
    public original_loc?: string;
    public copyright_holder?: string;
    public company_addr?: string;
    public company_name?: string;
    public content?: string;
    public title?: string;
}

class FeedbackPanelTypeCollection {
    public id: string;
    public name: string;
}

class FeedbackPanelController {
    public form: any;
    // todo from enums
    public typeCollection: FeedbackPanelTypeCollection[] = [
        { id: 'support', name: 'SUPPORT' },
        { id: 'feedback', name: 'FEEDBACK' },
        { id: 'copyright', name: 'COPYRIGHT' },
        { id: 'business', name: 'BUSINESS' },
        { id: 'advertising', name: 'ADVERTISING' }
    ];
    public type: string;
    public data: FeedbackPanelEntity = new FeedbackPanelEntity();
    public showPictures: boolean;
    public showDocuments: boolean;
    public saveCallback: Function;
    public $control: any = {};  // todo type
    public typeIndex: number; // todo type
    public pictures: any[] = [];  // todo type
    public docs: any[] = []; // todo type
    public errorsWithHint: Function;
    public $party;
    public created: any;
    constructor(
        $rootScope: ng.IRootScopeService,
        private pipFeedbackData,
        pipTranslate: pip.services.ITranslateService,
        pipFormErrors) {

        pipTranslate.translateObjects(this.typeCollection, 'name', 'name');
        // todo use rootscope variable
        this.$party = $rootScope['$party'];
        this.type = pipTranslate.translate('FEEDBACK');
        this.data.sender_id = this.$party.id;
        this.data.sender_name = this.$party.name;
        this.data.sender_email = this.$party.email;
        this.data.pic_ids = [];
        this.data.docs = [];
        this.data.type = this.typeCollection[0].id;

        this.$control.onSave = () => { this.onSave(); };
        this.$control.onTypeChange = this.onTypeChange;
        this.errorsWithHint = pipFormErrors.errorsWithHint;
        if (this.created) {
            this.created({
                $control: this.$control
            });
        }

    }

    public onSave() {

        this.pipFeedbackData.createFeedbackWithFiles(
            {
                transaction: null,//$scope.transaction,
                pictures: this.pictures,
                documents: this.docs,
                item: this.data
            },
            (data) => {
                if (this.saveCallback) {
                    this.saveCallback(data);
                }
            }

        );
    }

    public onTypeChange(type: FeedbackPanelTypeCollection) {
        this.data.type = this.typeCollection[this.typeIndex].id;
        this.type = type.name;
    }
}

(() => {
    angular
        .module('pipFeedbackPanel', [
            'pipFocused',
            'pipCommonRest',
            'pipFeedbackData',
            'pipServices',
            'pipSupport.Templates'
        ])
        .component('pipFeedbackPanel', {
            bindings: FeedbackPanelBindings,
            templateUrl: 'feedback/FeedbackPanel.html',
            controller: FeedbackPanelController
        })

})();
