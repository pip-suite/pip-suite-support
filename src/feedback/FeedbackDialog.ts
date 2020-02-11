import { IFeedbackDialogService } from './IFeedbackDialogService';

{
    class FeedbackDialogController {
        public $panel: any;
        public data: any;
        public callback: Function;
        public contentSwitchOption = {
            picture: true,
            document: true,
            location: false,
            event: false
        };
        constructor(
            $rootScope: ng.IRootScopeService,
            $state: ng.ui.IState,
            party,
            private $mdDialog: angular.material.IDialogService,
            private pipToasts: pip.controls.IToastService,
            private pipTranslate: pip.services.ITranslateService) {
            this.callback = () => {
                this.saveCallback();
            }
        }

        public onSave() {
            if (this.$panel) {
                this.$panel.onSave();

            }
        }

        public onTypeChange() {
            if (this.$panel) {
                this.$panel.onTypeChange(this.data);
            }
        }

        public saveCallback() {
            this.$mdDialog.cancel();
            this.pipToasts.showNotification(this.pipTranslate.translate('FEEDBACK_SUCCESS'), null, null, null, null);
        }

        public goBack() {
            this.$mdDialog.cancel();
        }
    }

    class FeedbackDialogService implements IFeedbackDialogService {
        constructor(private $mdDialog: angular.material.IDialogService) { };

        public show(params: any, successCallback?: (result) => void, cancelCallback?: () => void) {

            this.$mdDialog.show({
                targetEvent: params.event,
                controller: FeedbackDialogController,
                templateUrl: 'feedback/FeedbackDialog.html',
                clickOutsideToClose: true,
                controllerAs: '$ctrl',
                locals: {
                    party: params.party
                }
            })
                .then((result) => {

                    if (successCallback) {
                        successCallback(result);
                    }
                }, () => {

                    if (cancelCallback) {
                        cancelCallback();
                    }
                });
        }
    }


    angular.module('pipFeedbackDialog', [
        'pipAppBar', 'pipCommonRest', 'pipDropdown',
        'ngMaterial', 'pipTranslate', 'pipFeedbackData', 'pipToasts',
        'pipFeedback.Strings', 'pipFeedbackPanel', 'pipSupport.Templates'
    ])
        .service('pipFeedbackDialog', FeedbackDialogService)


}
