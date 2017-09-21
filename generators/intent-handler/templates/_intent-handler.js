const IntentFlowHandler = require('@abbott-platform/abbott-framework').IntentFlowHandler;

module.exports = class extends IntentFlowHandler {
  constructor(controller, message, nlpPayload, bot) {
    super('<%= props.handlerIntentActionName %>', controller, message, nlpPayload, bot);
  }
};

module.exports.isMatch = function (nlpPayload) {
  return (nlpPayload.result.action.startsWith('<%= props.handlerIntentActionName %>')) ? true : false;
};