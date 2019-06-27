'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});


const BUCKET = process.env.BUCKET;
const ROOMS = process.env.ROOMS;


module.exports.air = async (event, context) => {
  let room = ROOMS.split(",");
  let roomdata = [];
  for (let i=0;i<room.length;i++){
    let data = await s3.getObject({
      Bucket: BUCKET,
      Key: room[i]+'.json'
    }).promise();
    roomdata.push(JSON.parse(data.Body.toString()));
  }

  return {
    statusCode: 200,
    body: roomdata
    //body: JSON.parse(data.Body.toString())
  };
};

