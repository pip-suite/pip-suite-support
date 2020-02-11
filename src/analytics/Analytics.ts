import { IAnalyticsProvider } from './IAnalyticsProvider';

class AnalyticsProvider implements IAnalyticsProvider {
    public enabled: boolean = false;
    public trackingId: string = null;
    public window: any;

    public enable(newTrackingId: string): boolean {
        if (newTrackingId) {
            this.trackingId = newTrackingId;
            this.enabled = true;

            let wnd: any = window;
            wnd['GoogleAnalyticsObject'] = 'ga';
            wnd.ga = wnd.ga || function () {
                (wnd.ga.q = wnd.ga.q || []).push(arguments)
            };
            wnd.ga.l = 1 * new Date().getTime();

            wnd.ga('create', newTrackingId, 'auto');
            var script = document.createElement('script');
            var prevScript = document.getElementsByTagName('script')[0];
            script.async = true;
            script.src = '//www.google-analytics.com/analytics.js';
            prevScript.parentNode.insertBefore(script, prevScript);
        }
        return this.enabled;
    };

    public pageView(url: string, user: any, language: string): void {
        let wnd: any = window;

        if (this.enabled && wnd.ga) {
            wnd.ga('send', 'pageview', {
                page: url,
                userId: user,
                language: language
            });
        }
    };

    public event(category: string, action: string, value: string, user: any, language: string) {
        let wnd: any = window;
       
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

    public $get() {
        "ngInject";
        return {
            enabled: this.enabled,
            trackingId: this.trackingId,
            pageView: this.pageView,
            event: this.event
        };
    }
}


(() => {
    function AnalyticsRun(
        $rootScope: ng.IRootScopeService,
        $location: ng.ILocationService,
        pipAnalytics: AnalyticsProvider) {
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                let url: string = $location.url(),
                    user = $rootScope['$session'] && $rootScope['$session'].userId ? $rootScope['$session'].userId : ($rootScope['$identity'] || {}).id, 
                    language: string = ($rootScope['$language'] || 'en');

                // Remove query parameters from URL
                let pos: number = url.indexOf('?');
                if (pos > 0) url = url.substring(0, pos);

                // Record web analytics (if enabled)
                pipAnalytics.pageView(url, user, language);
            }
        );
    }
    angular.module('pipAnalytics', [])
        .run(AnalyticsRun)
        .provider('pipAnalytics', AnalyticsProvider);
})();