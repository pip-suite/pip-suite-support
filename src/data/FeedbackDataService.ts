import { IFeedbackDataService } from './IFeedbackDataService';
import { Feedback } from './Feedback';
import { PageData } from './PageData';

class FeedbackData implements IFeedbackDataService {
    private RESOURCE: string = 'feedbacks'; 

    private PAGE_SIZE: number = 100;
    private PAGE_START: number = 0;
    private PAGE_TOTAL: boolean = true;

    constructor(
        private pipRest: pip.rest.IRestService,
        private pipFormat: pip.services.IFormat
    ) { 
         "ngInject";
    }

    public readFeedbacks(params: any, successCallback?: (data: PageData) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        params = params || {};
        if (params.filter) {
            params.filer = this.pipFormat.filterToString(params.filer);
        }

        return this.pipRest.getResource(this.RESOURCE).page(params, successCallback, errorCallback);
    }

    public readFeedback(id: string, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        return this.pipRest.getResource(this.RESOURCE).get(
            { Feedback_id: id },
            successCallback,
            errorCallback
        );
    }

    public createFeedback(data: Feedback, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): void {
        this.pipRest.getResource(this.RESOURCE).save(
            data,
            successCallback,
            errorCallback
        );
    }

    public updateFeedback(id: string, data: Feedback, successCallback?: (data: Feedback) => void, errorCallback?: (error: any) => void): void {
        this.pipRest.getResource(this.RESOURCE).update(
            { Feedback_id: id },
            data,
            successCallback,
            errorCallback
        );
    }

    public deleteFeedback(id: string, successCallback?: () => void, errorCallback?: (error: any) => void): void {
        this.pipRest.getResource(this.RESOURCE).remove(
            { Feedback_id: id },
            null,
            successCallback,
            errorCallback
        );
    }

}


angular
    .module('pipFeedbackData', ['pipRest', 'pipServices'])
    .service('pipFeedbackData', FeedbackData);

