import './Attachment';
import './Feedback';
import './PageData';
import './PartyReference';
import './FeedbackDataService';
import './IFeedbackDataService';


angular
    .module('pipFeedback.Data', [
        'pipFeedbackData'
    ]);

export * from './IFeedbackDataService';
export * from './Attachment';
export * from './Feedback';
export * from './PageData';
export * from './PartyReference';