'use strict';
const client = require('request');
const SERVER_URL = "http://104.155.65.75:31000/api/delay";
//const SERVER_URL = "http://localhost:8080/api/delay";
const COUNTER_LIMIT = 10;
const CLIENT_NUMBER = process.argv[2] || 1;
const CLIENT_LIMIT = process.argv[3] || 100; 
var counter = 1;

function Client(callback) {
	console.log(`Request #${counter}`);
	client(SERVER_URL + '/' + CLIENT_NUMBER + '/' + counter, function Response(err, response, body) {

		if(err) {
			console.error(`Error: ${err}`);
		}


		if( body) {
			console.log(`===== RESPONSE ${JSON.parse(body).requestNumber} ====`);
			console.log(`Body: ${body}`);
			if (response) {
				console.log(`StatusCode: ${response.statusCode}`);
			}
			console.log("==== END RESPONSE ====\n\n");
		}
	});
}

console.log("Start launcher...");
Client();
const inter = setInterval(() => {
	if(counter >= CLIENT_LIMIT) {
		clearInterval(inter);
		return;
	}
	var delay = Math.round(Math.random() * (3600 - 1000)) + 1000;	
	setTimeout(() => {
		counter++;
		console.log(`Launching client #${counter}`);
		Client();
	}, delay);
}, 100);

