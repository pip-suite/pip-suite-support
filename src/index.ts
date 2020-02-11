import './rest';
import './data';
import './analytics/Analytics';
import './analytics/IAnalyticsProvider';
import './feedback';

angular.module('pipSupport', [
    'pipFeedback.Data',
    'pipFeedback.Rest',
    'pipFeedback',
    'pipAnalytics'
]);

export * from './data';
export * from './feedback';
export * from './analytics/IAnalyticsProvider';