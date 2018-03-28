const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynObj = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();


// module.exports.remove = (event) => {
//   event.Records.forEach((record) => {
//     const filename = record.s3.object.key;
//     const eventType = record.eventName;
//     const eventTime = record.eventTime;

//     TableName: 'minibox',
//       Item: {
//         "id" : uuid.v1(),
//         "fileName" : filename,
//         "Type" : eventType,
//         "Time" : eventTime
//       }
//     }

//     dynObj.deleteItem(params, (err, result) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log("data deleted")
//     })

//   });
// };


module.exports.read = function(event, context, callback){
  let params = {
    TableName : 'minibox'
  };
  dynObj.scan(params, function(err, data){
    if(err){
        callback(err, null);
    }else{
        callback(null, data);
    }
  });
}