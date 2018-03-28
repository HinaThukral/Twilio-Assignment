const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynObj = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
 const accountSid = ''; // my account_sid
 const authToken = ''; // my auth_token



// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.upload = (event) => {
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const eventType = record.eventName;
    const eventTime = record.eventTime;

    
    let msg = "Null";

    if(eventType == "ObjectCreated:Put"){
      msg = filename + " is added to your S3 bucket";
    }
    else{
      msg = filename + " is deleted from your S3 bucket";
    }
    

    const params = {
      TableName: 'minibox',
      Item: {
        "id" : uuid.v1(),
        "fileName" : filename,
        "Type" : eventType,
        "Time" : eventTime
      }
    }

    dynObj.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("data uploaded")
    })

     client.messages.create({
        
        to: '', // my own number
        from: '', // number i bought from twilio
        body: msg
    }).then((message) => console.log(message.sid));

  });
};



