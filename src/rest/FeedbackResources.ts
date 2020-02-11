
// configured Rest resource
function pipFeedbackDataConfig(pipRestProvider: pip.rest.IRestProvider) {
    pipRestProvider.registerPartyCollection('feedbacks', '/api/1.0/feedbacks/:id');
}

        // this.registerRoute('get', '/feedbacks', this.getFeedbacks);
        // this.registerRoute('get', '/feedbacks/:feedback_id', this.getFeedback);
        // this.registerRouteWithAuth('post', '/feedbacks', this._auth.signed(), this.sendFeedback);
        // this.registerRouteWithAuth('put', '/feedbacks/:feedback_id', this._auth.admin(), this.replyFeedback);
        // this.registerRouteWithAuth('del', '/feedbacks/:feedback_id', this._auth.admin(), this.deleteFeedback);


angular
    .module('pipFeedbackData')
    .config(pipFeedbackDataConfig);