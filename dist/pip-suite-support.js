(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).support = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnalyticsProvider = (function () {
    function AnalyticsProvider() {
        this.enabled = false;
        this.trackingId = null;
    }
    AnalyticsProvider.prototype.enable = function (newTrackingId) {
        if (newTrackingId) {
            this.trackingId = newTrackingId;
            this.enabled = true;
            var wnd_1 = window;
            wnd_1['GoogleAnalyticsObject'] = 'ga';
            wnd_1.ga = wnd_1.ga || function () {
                (wnd_1.ga.q = wnd_1.ga.q || []).push(arguments);
            };
            wnd_1.ga.l = 1 * new Date().getTime();
            wnd_1.ga('create', newTrackingId, 'auto');
            var script = document.createElement('script');
            var prevScript = document.getElementsByTagName('script')[0];
            script.async = true;
            script.src = '//www.google-analytics.com/analytics.js';
            prevScript.parentNode.insertBefore(script, prevScript);
        }
        return this.enabled;
    };
    ;
    AnalyticsProvider.prototype.pageView = function (url, user, language) {
        var wnd = window;
        if (this.enabled && wnd.ga) {
            wnd.ga('send', 'pageview', {
                page: url,
                userId: user,
                language: language
            });
        }
    };
    ;
    AnalyticsProvider.prototype.event = function (category, action, value, user, language) {
        var wnd = window;
        if (this.enabled && wnd.ga) {
            wnd.ga('send', 'event', {
                eventCategory: category,
                eventAction: action,
                eventValue: value,
                userId: user,
                language: language
            });
        }
    };
    ;
    AnalyticsProvider.prototype.$get = function () {
        "ngInject";
        return {
            enabled: this.enabled,
            trackingId: this.trackingId,
            pageView: this.pageView,
            event: this.event
        };
    };
    return AnalyticsProvider;
}());
(function () {
    AnalyticsRun.$inject = ['$rootScope', '$location', 'pipAnalytics'];
    function AnalyticsRun($rootScope, $location, pipAnalytics) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            var url = $location.url(), user = $rootScope['$session'] && $rootScope['$session'].userId ? $rootScope['$session'].userId : ($rootScope['$identity'] || {}).id, language = ($rootScope['$language'] || 'en');
            var pos = url.indexOf('?');
            if (pos > 0)
                url = url.substring(0, pos);
            pipAnalytics.pageView(url, user, language);
        });
    }
    angular.module('pipAnalytics', [])
        .run(AnalyticsRun)
        .provider('pipAnalytics', AnalyticsProvider);
})();
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Attachment = (function () {
    function Attachment(id, uri, name) {
        this.id = id;
        this.uri = uri;
        this.name = name;
    }
    return Attachment;
}());
exports.Attachment = Attachment;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Feedback = (function () {
    function Feedback(id, category, app, sender, title, content, sent_time) {
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
    return Feedback;
}());
exports.Feedback = Feedback;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeedbackData = (function () {
    FeedbackData.$inject = ['pipRest', 'pipFormat'];
    function FeedbackData(pipRest, pipFormat) {
        "ngInject";
        this.pipRest = pipRest;
        this.pipFormat = pipFormat;
        this.RESOURCE = 'feedbacks';
        this.PAGE_SIZE = 100;
        this.PAGE_START = 0;
        this.PAGE_TOTAL = true;
    }
    FeedbackData.prototype.readFeedbacks = function (params, successCallback, errorCallback) {
        params = params || {};
        if (params.filter) {
            params.filer = this.pipFormat.filterToString(params.filer);
        }
        return this.pipRest.getResource(this.RESOURCE).page(params, successCallback, errorCallback);
    };
    FeedbackData.prototype.readFeedback = function (id, successCallback, errorCallback) {
        return this.pipRest.getResource(this.RESOURCE).get({ Feedback_id: id }, successCallback, errorCallback);
    };
    FeedbackData.prototype.createFeedback = function (data, successCallback, errorCallback) {
        this.pipRest.getResource(this.RESOURCE).save(data, successCallback, errorCallback);
    };
    FeedbackData.prototype.updateFeedback = function (id, data, successCallback, errorCallback) {
        this.pipRest.getResource(this.RESOURCE).update({ Feedback_id: id }, data, successCallback, errorCallback);
    };
    FeedbackData.prototype.deleteFeedback = function (id, successCallback, errorCallback) {
        this.pipRest.getResource(this.RESOURCE).remove({ Feedback_id: id }, null, successCallback, errorCallback);
    };
    return FeedbackData;
}());
angular
    .module('pipFeedbackData', ['pipRest', 'pipServices'])
    .service('pipFeedbackData', FeedbackData);
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageData = (function () {
    function PageData() {
    }
    return PageData;
}());
exports.PageData = PageData;
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PartyReference = (function () {
    function PartyReference(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    return PartyReference;
}());
exports.PartyReference = PartyReference;
},{}],9:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./Attachment");
require("./Feedback");
require("./PageData");
require("./PartyReference");
require("./FeedbackDataService");
require("./IFeedbackDataService");
angular
    .module('pipFeedback.Data', [
    'pipFeedbackData'
]);
__export(require("./Attachment"));
__export(require("./Feedback"));
__export(require("./PageData"));
__export(require("./PartyReference"));
},{"./Attachment":3,"./Feedback":4,"./FeedbackDataService":5,"./IFeedbackDataService":6,"./PageData":7,"./PartyReference":8}],10:[function(require,module,exports){
var FeedbackController = (function () {
    function FeedbackController($rootScope, $state, pipAppBar, pipToasts, pipTranslate) {
        var _this = this;
        this.pipToasts = pipToasts;
        this.pipTranslate = pipTranslate;
        this.contentSwitchOption = {
            picture: true,
            document: true,
            location: false,
            event: false
        };
        this.callback = function () { _this.saveCallback(); };
    }
    FeedbackController.prototype.showAppBar = function () {
    };
    FeedbackController.prototype.onSave = function () {
        if (this.$panel)
            this.$panel.onSave();
    };
    FeedbackController.prototype.onTypeChange = function () {
        if (this.$panel)
            this.$panel.onTypeChange(this.data);
    };
    FeedbackController.prototype.saveCallback = function () {
        this.pipToasts.showNotification(this.pipTranslate.translate('FEEDBACK_SUCCESS'), null, null, null, null);
    };
    return FeedbackController;
}());
(function () {
    FeedbackConfig.$inject = ['pipAuthStateProvider'];
    function FeedbackConfig(pipAuthStateProvider) {
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
        .config(FeedbackConfig);
})();
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var FeedbackDialogController_1 = (function () {
        function FeedbackDialogController_1($rootScope, $state, party, $mdDialog, pipToasts, pipTranslate) {
            var _this = this;
            this.$mdDialog = $mdDialog;
            this.pipToasts = pipToasts;
            this.pipTranslate = pipTranslate;
            this.contentSwitchOption = {
                picture: true,
                document: true,
                location: false,
                event: false
            };
            this.callback = function () {
                _this.saveCallback();
            };
        }
        FeedbackDialogController_1.prototype.onSave = function () {
            if (this.$panel) {
                this.$panel.onSave();
            }
        };
        FeedbackDialogController_1.prototype.onTypeChange = function () {
            if (this.$panel) {
                this.$panel.onTypeChange(this.data);
            }
        };
        FeedbackDialogController_1.prototype.saveCallback = function () {
            this.$mdDialog.cancel();
            this.pipToasts.showNotification(this.pipTranslate.translate('FEEDBACK_SUCCESS'), null, null, null, null);
        };
        FeedbackDialogController_1.prototype.goBack = function () {
            this.$mdDialog.cancel();
        };
        return FeedbackDialogController_1;
    }());
    var FeedbackDialogService = (function () {
        FeedbackDialogService.$inject = ['$mdDialog'];
        function FeedbackDialogService($mdDialog) {
            this.$mdDialog = $mdDialog;
        }
        ;
        FeedbackDialogService.prototype.show = function (params, successCallback, cancelCallback) {
            this.$mdDialog.show({
                targetEvent: params.event,
                controller: FeedbackDialogController_1,
                templateUrl: 'feedback/FeedbackDialog.html',
                clickOutsideToClose: true,
                controllerAs: '$ctrl',
                locals: {
                    party: params.party
                }
            })
                .then(function (result) {
                if (successCallback) {
                    successCallback(result);
                }
            }, function () {
                if (cancelCallback) {
                    cancelCallback();
                }
            });
        };
        return FeedbackDialogService;
    }());
    angular.module('pipFeedbackDialog', [
        'pipAppBar', 'pipCommonRest', 'pipDropdown',
        'ngMaterial', 'pipTranslate', 'pipFeedbackData', 'pipToasts',
        'pipFeedback.Strings', 'pipFeedbackPanel', 'pipSupport.Templates'
    ])
        .service('pipFeedbackDialog', FeedbackDialogService);
}
},{}],12:[function(require,module,exports){
var FeedbackPanelBindings = {
    data: '=',
    created: '&pipCreated',
    showPictures: '=',
    showDocuments: '=',
    typeCollection: '<typeCollection',
    saveCallback: '='
};
var FeedbackPanelChanges = (function () {
    function FeedbackPanelChanges() {
    }
    return FeedbackPanelChanges;
}());
var FeedbackPanelEntity = (function () {
    function FeedbackPanelEntity() {
        this.pic_ids = [];
        this.docs = [];
    }
    return FeedbackPanelEntity;
}());
var FeedbackPanelTypeCollection = (function () {
    function FeedbackPanelTypeCollection() {
    }
    return FeedbackPanelTypeCollection;
}());
var FeedbackPanelController = (function () {
    FeedbackPanelController.$inject = ['$rootScope', 'pipFeedbackData', 'pipTranslate', 'pipFormErrors'];
    function FeedbackPanelController($rootScope, pipFeedbackData, pipTranslate, pipFormErrors) {
        var _this = this;
        this.pipFeedbackData = pipFeedbackData;
        this.typeCollection = [
            { id: 'support', name: 'SUPPORT' },
            { id: 'feedback', name: 'FEEDBACK' },
            { id: 'copyright', name: 'COPYRIGHT' },
            { id: 'business', name: 'BUSINESS' },
            { id: 'advertising', name: 'ADVERTISING' }
        ];
        this.data = new FeedbackPanelEntity();
        this.$control = {};
        this.pictures = [];
        this.docs = [];
        pipTranslate.translateObjects(this.typeCollection, 'name', 'name');
        this.$party = $rootScope['$party'];
        this.type = pipTranslate.translate('FEEDBACK');
        this.data.sender_id = this.$party.id;
        this.data.sender_name = this.$party.name;
        this.data.sender_email = this.$party.email;
        this.data.pic_ids = [];
        this.data.docs = [];
        this.data.type = this.typeCollection[0].id;
        this.$control.onSave = function () { _this.onSave(); };
        this.$control.onTypeChange = this.onTypeChange;
        this.errorsWithHint = pipFormErrors.errorsWithHint;
        if (this.created) {
            this.created({
                $control: this.$control
            });
        }
    }
    FeedbackPanelController.prototype.onSave = function () {
        var _this = this;
        this.pipFeedbackData.createFeedbackWithFiles({
            transaction: null,
            pictures: this.pictures,
            documents: this.docs,
            item: this.data
        }, function (data) {
            if (_this.saveCallback) {
                _this.saveCallback(data);
            }
        });
    };
    FeedbackPanelController.prototype.onTypeChange = function (type) {
        this.data.type = this.typeCollection[this.typeIndex].id;
        this.type = type.name;
    };
    return FeedbackPanelController;
}());
(function () {
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
    });
})();
},{}],13:[function(require,module,exports){
(function () {
    FeedbackStringsConfig.$inject = ['pipTranslateProvider'];
    function FeedbackStringsConfig(pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'FEEDBACK_TITLE': 'Contact us',
            'FEEDBACK_HINT_FEEDBACK': 'If you need help or you have some ideas or suggestions to improve Pip.Life just use form below',
            'FEEDBACK_HINT_COPYRIGHT': 'If you believe that content available on Pip.Life infringes one or more of your copyrights, you can use the form below to submit a DMCA notice. Upon receipt of a valid notice, we are required by law to respond to it by disabling access to the allegedly infringing content. Your Infringement Notice may be forwarded to the party that made the content available, or to third parties such as ChillingEffects.org.',
            'FEEDBACK_HINT_COPYRIGHT2': 'If you choose to request removal of content by submitting an infringement notification, please remember that you are initiating a legal process. Do not make false claims. Please be advised that under 17 U.S.C. § 512(f), you may be liable for damages (including costs and attorneys’ fees) if you knowingly misrepresent that a product or activity is infringing your copyrights. Thus, if you are not sure content located on or linked-to by Dribbble infringes your copyright, you should consider first contacting an attorney.',
            'FEEDBACK_COMPANY': 'Company name',
            'FEEDBACK_MESSAGE': 'Message',
            'FEEDBACK_ADDRESS': 'Address',
            'FEEDBACK_COPYRIGHT_HOLDER': 'Copyright holder you represent',
            'FEEDBACK_COPYRIGHT_HOLDER_HINT': 'If representing someone other than yourself',
            'FEEDBACK_ORIGINAL_LOCATION': 'Location of original copyrighted work',
            'FEEDBACK_DESCRIBE_COPYRIGHTED': 'Describe the copyrighted work',
            'FEEDBACK_DESCRIBE_COPYRIGHTED_HINT': 'Helps us identify the specific referenced work',
            'FEEDBACK_UNAUTHORIZE_LOCATION': 'Location of unauthorized material',
            'FEEDBACK_UNAUTHORIZE_LOCATION_HINT': 'Please provide specific page URLs, one per line',
            'FEEDBACK_COPYRIGHT_CONC': 'I have a good faith belief that use of the copyrighted materials described above as allegedly infringing is not authorized by the copyright owner, its agent, or the law',
            'FEEDBACK_REGUEST_CONC': 'I swear, under penalty of perjury, that the information in the notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.',
            'FEEDBACK_SIGNATURE': 'You first and last name',
            'FEEDBACK_SIGNATURE_HINT': 'Signature',
            'FEEDBACK_SUBJECT': 'Subject',
            'FEEDBACK_SUCCESS': 'Your message was sent to Pip.Life support team. They will contact you via personal messaging soon. Thanks for your interest in PipLife!'
        });
        pipTranslateProvider.translations('ru', {
            'FEEDBACK_TITLE': 'Обратная связь',
            'FEEDBACK_HINT_FEEDBACK': 'Если Вам нужна помощь или у вас есть идеи или предложения по улучшению Pip.Life используйте рассположенную ниже форму',
            'FEEDBACK_HINT_COPYRIGHT': 'Если вы считаете, что контент, доступный на Pip.Life нарушает одно или более ваших авторских прав, вы можете использовать форму ниже, чтобы представить уведомление DMCA. После получения уведомления, мы по закону обязаны ответить на него, отключив доступ к контенту, который предположительно нарушает авторские права. Уведомление может быть направлено со стороны, представившей контент или третьих сторон, таких как ChillingEffects.org.',
            'FEEDBACK_HINT_COPYRIGHT2': 'Если вы решите запросить удаление содержания, подав уведомление о нарушении, пожалуйста, помните, что вы инициируете судебный процесс. Пожалуйста, обратите внимание, что исодя из статьи 17 U.S.C. § 512 (F), вы можете нести ответственность за убытки (включая расходы и гонорары адвокатам), если вы сознательно искажаете действительность, что продукт или деятельность нарушает ваши авторские права. Таким образом, если вы не уверены, что содержание, расположенное на PipLife нарушает Ваши авторские права посоветуйтесь с адвокатом.',
            'FEEDBACK_COMPANY': 'Название компании',
            'FEEDBACK_MESSAGE': 'Сообщение',
            'FEEDBACK_ADDRESS': 'Адрес',
            'FEEDBACK_COPYRIGHT_HOLDER': 'Владелец авторского права',
            'FEEDBACK_COPYRIGHT_HOLDER_HINT': 'Заполните поле, если Вы  представляете кого-то кроме себя',
            'FEEDBACK_ORIGINAL_LOCATION': 'Расположение оригинальной авторской работы',
            'FEEDBACK_DESCRIBE_COPYRIGHTED': 'Опишите авторские права на произведение',
            'FEEDBACK_DESCRIBE_COPYRIGHTED_HINT': 'Это поможет нам идентифицировать ссылки на работу',
            'FEEDBACK_UNAUTHORIZE_LOCATION': 'Расположение несанкционированного материала',
            'FEEDBACK_UNAUTHORIZE_LOCATION_HINT': 'Пожалуйста, укажите конкретную страницу URL, по одной в строке',
            'FEEDBACK_COPYRIGHT_CONC': 'У меня есть добросовестное предположение, что использование защищенных авторским правом материалов, описанных выше, в качестве якобы нарушает авторские права, не разрешено владельцем авторского права, его агентом или законом',
            'FEEDBACK_REGUEST_CONC': 'Я клянусь под страхом наказания за лжесвидетельство, что содержащаяся в уведомлении информация верна и что я являюсь владельцем авторского права или имею право действовать от имени владельца эксклюзивных прав, которые якобы нарушены.',
            'FEEDBACK_SIGNATURE': 'Ваше имя и фамилия',
            'FEEDBACK_SIGNATURE_HINT': 'Подпись',
            'FEEDBACK_SUBJECT': 'Заголовок',
            'FEEDBACK_SUCCESS': 'Ваш запрос передан команде технической поддержки Pip.Life. C вами свяжутся в ближайшее время по электронной почте. Спасибо за ваш интерес и поддержку PipLife.'
        });
    }
    angular.module('pipFeedback.Strings', ['pipTranslate'])
        .config(FeedbackStringsConfig);
})();
},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./IFeedbackDialogService");
require("./Feedback");
require("./FeedbackDialog");
require("./FeedbackPanel");
require("./FeedbackStrings");
},{"./Feedback":10,"./FeedbackDialog":11,"./FeedbackPanel":12,"./FeedbackStrings":13,"./IFeedbackDialogService":14}],16:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./rest");
require("./data");
require("./analytics/Analytics");
require("./analytics/IAnalyticsProvider");
require("./feedback");
angular.module('pipSupport', [
    'pipFeedback.Data',
    'pipFeedback.Rest',
    'pipFeedback',
    'pipAnalytics'
]);
__export(require("./data"));
},{"./analytics/Analytics":1,"./analytics/IAnalyticsProvider":2,"./data":9,"./feedback":15,"./rest":18}],17:[function(require,module,exports){
pipFeedbackDataConfig.$inject = ['pipRestProvider'];
function pipFeedbackDataConfig(pipRestProvider) {
    pipRestProvider.registerPartyCollection('feedbacks', '/api/1.0/feedbacks/:id');
}
angular
    .module('pipFeedbackData')
    .config(pipFeedbackDataConfig);
},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
angular
    .module('pipFeedback.Rest', []);
require("./FeedbackResources");
},{"./FeedbackResources":17}],19:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipSupport.Templates');
} catch (e) {
  module = angular.module('pipSupport.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('feedback/Feedback.html',
    '<md-toolbar class="pip-appbar-ext"></md-toolbar>\n' +
    '<pip-document width="800">\n' +
    '\n' +
    '    <pip-feedback-panel data="$ctrl.data" pip-created="$ctrl.$panel = $control"\n' +
    '                        show-pictures="$ctrl.showPictures"\n' +
    '                        show-documents="$ctrl.showDocuments"\n' +
    '                        save-callback="$ctrl.callback"\n' +
    '                        type-collection="$ctrl.typeCollection"></pip-feedback-panel>\n' +
    '\n' +
    '    <div class="pip-footer">\n' +
    '        <pip-content-switch class="hide-xs" ></pip-content-switch>\n' +
    '\n' +
    '        <div class="flex"></div>\n' +
    '\n' +
    '        <div class="flex-fixed layout-row">\n' +
    '            <md-button ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" class="md-raised md-warn">\n' +
    '                {{::\'CANCEL\' | translate}}\n' +
    '            </md-button>\n' +
    '            <md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.goBack()">\n' +
    '                {{::\'CANCEL\' | translate}}\n' +
    '            </md-button>\n' +
    '            <md-button class="md-accent" ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.onSave()"\n' +
    '                       ng-disabled="$ctrl.data.content == \'\' && $ctrl.data.title == \'\'">\n' +
    '                {{::\'SEND\' | translate}}\n' +
    '            </md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</pip-document>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipSupport.Templates');
} catch (e) {
  module = angular.module('pipSupport.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('feedback/FeedbackDialog.html',
    '<md-dialog width="800" class="pip-feedback-dialog">\n' +
    '    <md-dialog-content class="lp24-flex rp24-flex">\n' +
    '        <pip-feedback-panel data="$ctrl.data" \n' +
    '                            pip-created="$ctrl.$panel = $control"\n' +
    '                            show-pictures="$ctrl.showPictures"\n' +
    '                            show-documents="$ctrl.showDocuments"\n' +
    '                            save-callback="$ctrl.callback"\n' +
    '                            type-collection="$ctrl.typeCollection"></pip-feedback-panel>\n' +
    '    </md-dialog-content>\n' +
    '    <md-dialog-actions class="layout-row">\n' +
    '        <pip-content-switch class="show-gt-sm"></pip-content-switch>\n' +
    '\n' +
    '        <div class="flex"></div>\n' +
    '\n' +
    '        <div class="layout-row flex-fixed">\n' +
    '            <md-button \n' +
    '                ng-show="$ctrl.transaction.busy()" \n' +
    '                ng-click="$ctrl.transaction.abort()" \n' +
    '                class="md-raised md-warn">\n' +
    '                {{::\'CANCEL\' | translate}}\n' +
    '            </md-button>\n' +
    '            <md-button \n' +
    '                ng-hide="$ctrl.transaction.busy()" \n' +
    '                ng-click="$ctrl.goBack()">\n' +
    '                {{::\'CANCEL\' | translate}}\n' +
    '            </md-button>\n' +
    '            <md-button class="md-accent rm8" \n' +
    '                ng-hide="$ctrl.transaction.busy()" \n' +
    '                ng-click="$ctrl.onSave()"\n' +
    '                ng-disabled="$ctrl.data.content == \'\' && $ctrl.data.title == \'\'">\n' +
    '                {{::\'SEND\' | translate}}\n' +
    '            </md-button>\n' +
    '        </div>\n' +
    '    </md-dialog-actions>\n' +
    '</md-dialog>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipSupport.Templates');
} catch (e) {
  module = angular.module('pipSupport.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('feedback/FeedbackPanel.html',
    '<div class="pip-body tp24-flex">\n' +
    '    <div class="pip-content layout-column">\n' +
    '        <md-progress-linear ng-show="$ctrl.transaction.busy()" md-mode="indeterminate"\n' +
    '                            class="pip-progress-ontop"></md-progress-linear>\n' +
    '\n' +
    '        <form name="form" novalidate>\n' +
    '            <md-input-container class="md-block hide-gt-xs">\n' +
    '                <md-select ng-model="typeIndex" ng-disabled="$ctrl.transaction.busy()" aria-label="DROPDOWN">\n' +
    '\n' +
    '                    <md-option ng-repeat="action in $ctrl.typeCollection" value="{{ ::$index }}">\n' +
    '                        {{ (action.title || action.name) | translate }}\n' +
    '                    </md-option>\n' +
    '                </md-select>\n' +
    '            </md-input-container>\n' +
    '\n' +
    '            <pip-toggle-buttons ng-model="$ctrl.data.type"\n' +
    '                                pip-buttons="$ctrl.typeCollection"\n' +
    '                                class="bm16 hide-xs">\n' +
    '            </pip-toggle-buttons>\n' +
    '            <p class="tm0 bm16 text-small text-grey line-height-string"\n' +
    '               ng-if="$ctrl.data.type == \'feedback\' || $ctrl.data.type == \'support\'">\n' +
    '                {{::\'FEEDBACK_HINT_FEEDBACK\' | translate}}\n' +
    '            </p>\n' +
    '\n' +
    '            <div ng-if="$ctrl.data.type == \'copyright\'">\n' +
    '                <p class="tm0 bm16 text-small text-grey line-height-string">\n' +
    '                    {{::\'FEEDBACK_HINT_COPYRIGHT\' | translate}}\n' +
    '                </p>\n' +
    '\n' +
    '                <p class="tm0 bm16 text-small text-grey line-height-string">\n' +
    '                    {{::\'FEEDBACK_HINT_COPYRIGHT2\' | translate }}\n' +
    '                </p>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="pip-ref-item">\n' +
    '                <pip-avatar pip-party-id="$ctrl.$party.id"\n' +
    '                            pip-party-name="$ctrl.$party.name"\n' +
    '                            class="pip-pic pip-face"></pip-avatar>\n' +
    '                <div class="pip-content">\n' +
    '                    <p class="pip-title">{{$ctrl.$party.name}} </p>\n' +
    '\n' +
    '                    <p class="pip-subtitle">{{$ctrl.$party.email}}</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div ng-if="$ctrl.data.type!=\'copyright\'">\n' +
    '                <md-input-container class="md-block" md-no-float>\n' +
    '                    <input type="text" ng-model="$ctrl.data.title"\n' +
    '                           ng-disabled="$ctrl.transaction.busy()"\n' +
    '                           placeholder="{{:: \'SUBJECT\' | translate}}"/>\n' +
    '                </md-input-container>\n' +
    '                <md-input-container class="md-block" md-no-float>\n' +
    '                        <textarea ng-model="$ctrl.data.content" ng-disabled="$ctrl.transaction.busy()"\n' +
    '                                  placeholder="{{::\'FEEDBACK_MESSAGE\'|translate}}">\n' +
    '                        </textarea>\n' +
    '                </md-input-container>\n' +
    '            </div>\n' +
    '\n' +
    '            <div ng-if="$ctrl.data.type==\'copyright\'">\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>{{::\'FEEDBACK_COMPANY\'|translate}}</label>\n' +
    '                    <input type="text" ng-model="$ctrl.data.company_name"\n' +
    '                           ng-disabled="$ctrl.transaction.busy()" placeholder="Company Name"/>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>{{::\'FEEDBACK_ADDRESS\'|translate}}</label>\n' +
    '                    <input type="text" ng-model="$ctrl.data.company_addr"\n' +
    '                           ng-disabled="$ctrl.transaction.busy()"/>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>{{::\'FEEDBACK_COPYRIGHT_HOLDER\' | translate}}</label>\n' +
    '                    <input name="$ctrl.data.copyright_holder" \n' +
    '                           ng-model="$ctrl.data.copyright_holder"\n' +
    '                           ng-disabled="$ctrl.transaction.busy()"\n' +
    '                           step="any" type="text" tabindex="0"\n' +
    '                           required/>\n' +
    '\n' +
    '                    <div ng-messages="$ctrl.errorsWithHint($ctrl.form.data.copyright_holder)">\n' +
    '                        <div ng-message="hint">\n' +
    '                            {{::\'FEEDBACK_COPYRIGHT_HOLDER_HINT\' | translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '                <md-input-container class="md-block flex">\n' +
    '                    <label>{{::\'FEEDBACK_ORIGINAL_LOCATION\'|translate}}</label>\n' +
    '                    <input type="text" ng-model="$ctrl.data.original_loc"\n' +
    '                           ng-disabled="$ctrl.transaction.busy()"/>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>{{::\'FEEDBACK_DESCRIBE_COPYRIGHTED\' | translate}}</label>\n' +
    '                    <input name="$ctrl.data.copyrighted_work" ng-model="$ctrl.data.copyrighted_work"\n' +
    '                           ng-disabled="$ctrl.transaction.busy()"\n' +
    '                           step="any" type="text" tabindex="0"\n' +
    '                           required/>\n' +
    '\n' +
    '                    <div ng-messages="$ctrl.errorsWithHint($ctrl.form.data.copyrighted_work)">\n' +
    '                        <div ng-message="hint">\n' +
    '                            {{::\'FEEDBACK_DESCRIBE_COPYRIGHTED_HINT\'| translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>{{::\'FEEDBACK_UNAUTHORIZE_LOCATION\' | translate}}</label>\n' +
    '                        <textarea name="$ctrl.data.unauth_loc" ng-model="$ctrl.data.unauth_loc"\n' +
    '                                  ng-disabled="$ctrl.transaction.busy()"\n' +
    '                                  step="any" type="text" tabindex="0"\n' +
    '                                  required></textarea>\n' +
    '\n' +
    '                    <div ng-messages="$ctrl.errorsWithHint(form.data.unauth_loc)">\n' +
    '                        <div ng-message="hint">\n' +
    '                            {{::\'FEEDBACK_UNAUTHORIZE_LOCATION_HINT\' | translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '                <div class="bm16 layout-row">\n' +
    '                    <md-checkbox ng-model="$ctrl.data.copyright_conc" class="lm0 bm0 flex-fixed"\n' +
    '                                 aria-label=\'FEEDBACK_COPYRIGHT_CONC\' style="min-width: 24px; margin-top: -2px">\n' +
    '                    </md-checkbox>\n' +
    '                    <p class="m0 text-small text-grey line-height-string">\n' +
    '                        {{::\'FEEDBACK_COPYRIGHT_CONC\'|translate}}\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="bm16 layout-row">\n' +
    '                    <md-checkbox ng-model="$ctrl.data.request_conc" class="lm0 bm0 flex-fixed"\n' +
    '                                 aria-label="FEEDBACK_REGUEST_CONC" style="min-width: 24px; margin-top: -2px">\n' +
    '                    </md-checkbox>\n' +
    '                    <p class="m0 text-small text-grey line-height-string">\n' +
    '                        {{::\'FEEDBACK_REGUEST_CONC\'|translate}}\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>{{::\'FEEDBACK_SIGNATURE\' | translate}}</label>\n' +
    '                    <input name="$ctrl.data.signature" \n' +
    '                           ng-model="$ctrl.data.signature"\n' +
    '                           ng-disabled="$ctrl.transaction.busy()"\n' +
    '                           step="any" type="text" tabindex="0"\n' +
    '                           required/>\n' +
    '\n' +
    '                    <div ng-messages="$ctrl.errorsWithHint($ctrl.form.data.signature)">\n' +
    '                        <div ng-message="hint">{{::\'FEEDBACK_SIGNATURE_HINT\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </md-input-container>\n' +
    '            </div>\n' +
    '\n' +
    '            <pip-picture-list-edit class="bm8" ng-show="$ctrl.showPictures"\n' +
    '                                   pip-picture-ids="$ctrl.data.pic_ids" \n' +
    '                                   pip-created="$ctrl.pictures = $event.sender"\n' +
    '                                   ng-disabled="$ctrl.transaction.busy()">\n' +
    '            </pip-picture-list-edit>\n' +
    '\n' +
    '            <pip-document-list-edit ng-show="$ctrl.showDocuments"\n' +
    '                                    pip-documents="$ctrl.data.docs" \n' +
    '                                    pip-created="$ctrl.docs = $event.sender"\n' +
    '                                    ng-disabled="$ctrl.transaction.busy()">\n' +
    '            </pip-document-list-edit>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();



},{}]},{},[19,1,2,3,4,5,6,9,7,8,10,11,12,13,14,15,16,17,18])(19)
});

//# sourceMappingURL=pip-suite-support.js.map
