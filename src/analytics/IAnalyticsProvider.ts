export interface IAnalyticsProvider extends ng.IServiceProvider {
    enabled: boolean;
    trackingId: string;
    window: any;

    enable(newTrackingId: string): boolean;
    pageView(url: string, user: any, language: string);
    event(category: string, action: string, value: string, user: any, language: string);
}