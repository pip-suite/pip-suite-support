export interface IFeedbackDialogService {
    show(params: any, successCallback?: (answer) => void, cancelCallback?: () => void): void;
}