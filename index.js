'use strict';
var sessionMap = new Map();
var request = require("request");
var async = require("async");

// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled 
function close(sessionAttributes, fulfillmentState, message, responseCard) {
    var result = {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
            responseCard
        },
    };
    
    console.log(result);
    return result;
}
//

function requestNextIntent(sessionAttributes, message, responseCard) {
    var result= {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitIntent',
            message,
            responseCard
        },
    };
    console.log(result);
    return result;
}//SessionEndedRequest : false. Waiting for another Intent


function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}
 
function elicitSlot(sessionAttributes, intentName, slots, slotToElicit, message, responseCard) {
    var result= {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
            responseCard,
        },
    };
    console.log('ElicitSlot-------------',result);
    return result;
}
// --------------- Events -----------------------

function dispatch(intentRequest, callback) {
    console.log(`Request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.intentName}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const source = intentRequest.invocationSource;


}


// --------------------- Main handler -----------------------
 
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    
    console.log("EVENTTT"+ JSON.stringify(event));
    console.log("CONTEXT:"+ JSON.stringify(context));
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
