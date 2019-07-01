// code for AddPersonalInfo lambda function

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    if (!event.requestContext.authorizer) {
        errorResponse('Authorization not configured', context.awsRequestId, callback);
        return;
    }

    var par = {
        TableName : 'personInfo'
    };
    ddb.scan(par, function(err, data){
        if(err){
            callback(err, null);
        }else{
            callback(null, data.Items);
            console.log(data.Items)
        }
    });

    // Because we're using a Cognito User Pools authorizer, all of the claims
    // included in the authentication token are provided in the request context.
    // This includes the username as well as other attributes.
    const username = event.requestContext.authorizer.claims['cognito:username'];

    ddb.get({
        TableName: 'personInfo',
        Key: {
            personId: 'DvpLONxXapM4K3oIBxuytQ',
        },
        AttributesToGet: [
            Time, Race, User
        ],
    }, function(err, data) {
        if(err) {
            
        } else {
            
        }
    })
};

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage,
            Reference: awsRequestId,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
}