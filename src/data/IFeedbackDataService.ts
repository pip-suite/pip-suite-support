import { Feedback } from './Feedback';
import { PageData } from './PageData';

export interface IFeedbackDataService {
    readFeedbacks(params: any, successCallback?: (data: PageData) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    readFeedback(id: string, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    createFeedback(data: Feedback, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): void;
    updateFeedback(id: string, data: Feedback, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): void;
    deleteFeedback(id: string, successCallback?: () => void, errorCallback?: (error: any) => void): void;
}
