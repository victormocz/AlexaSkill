const Alexa = require('ask-sdk-core');

const {LaunchRequestHandler} = require('./handlers/LaunchRequestHandler');
const {HelloWorldIntentHandler} = require('./handlers/HelloWorldIntentHandler');
const {HelpIntentHandler} = require('./handlers/HelpIntentHandler');
const {CancelAndStopIntentHandler} = require('./handlers/CancelAndStopIntentHandler');
const {SessionEndedRequestHandler} = require('./handlers/SessionEndedRequestHandler');
const {ErrorHandler} = require('./handlers/ErrorHandler');

let skill;

exports.handler = async function (event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                HelloWorldIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler,
            )
            .addErrorHandlers(ErrorHandler)
            .create();
    }

    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
};