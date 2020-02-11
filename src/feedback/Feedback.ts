class FeedbackController {
    public data: any;
    public contentSwitchOption = {
        picture: true,
        document: true,
        location: false,
        event: false
    };
    public $panel: any;
    public callback: Function;
    constructor(
        $rootScope: ng.IRootScopeService,
        $state: ng.ui.IStateService,
        pipAppBar: pip.nav.IAppBarService,
        private pipToasts: pip.controls.IToastService,
        private pipTranslate: pip.services.ITranslateService) {
        
        this.callback = () => { this.saveCallback(); }
    }

    public showAppBar() {
    }

    public onSave() {
        if (this.$panel) this.$panel.onSave();
    }
    public onTypeChange() {
        if (this.$panel) this.$panel.onTypeChange(this.data);
    }

    public saveCallback() {
        this.pipToasts.showNotification(this.pipTranslate.translate('FEEDBACK_SUCCESS'), null, null, null, null);
    }
}

(() => {
    function FeedbackConfig(pipAuthStateProvider) {
        // Configure module routes
        pipAuthStateProvider
            .state('feedback', {
                url: '/feedback',
                controller: FeedbackController,
                controllerAs: '$ctrl',
                templateUrl: 'feedback/Feedback.html',
                auth: true
            });
    }

    angular.module('pipFeedback', [
        'pipAppBar', 'pipServices', 'pipCommonRest', 'pipFeedbackData', 'pipDropdown',
        'ngMaterial', 'pipTranslate', 'pipFeedbackData', 'pipToasts',
        'pipFeedback.Strings', "pipFeedbackPanel", 'pipSupport.Templates'
    ])
        .config(FeedbackConfig)

})();