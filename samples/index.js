

((angular) => {
    'use strict';

    var thisModule = angular.module('pipSample', [
        // 3rd Party Modules
        'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
        'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'ngAnimate', 'pipTheme',
        // Application Configuration must go first
        'pipSampleConfig', //'pipErrorHandling',
        // Modules from WebUI Framework
         'pipCommonRest', 'pipControls', 'pipLayout', 'pipNav', 'pipButtons', 
        //  'pipAvatar', "pipContentSwitch", 'pipComposite',
        // Sample Application Modules
        'pipEntry', 'pipSupport', 
        'pipFeedbackSamples', 'pipPopover', 'pipAnalytics'
    ]);

    thisModule.controller('pipSampleController',
        function ($scope, $rootScope) {
            // Sample controller code here...
        }
    );

})(window.angular);

