'use strict';
const Hapi = require('hapi');


const server = new Hapi.Server();
const DELAY = process.env.DELAY || 10 * 1000;

server.connection({port: 8080});

server.route({
		method: 'GET',
		path:'/api/delay/{clientNumber}/{requestNumber}',
		handler: HandlerFunction
});

function HandlerFunction(request, reply) {
	
		console.log(`Client ${request.params.clientNumber} - Handling the request number: ${request.params.requestNumber}`);
	(() => {
		let requestNumber = request.params.requestNumber;
		let rep = {
			server: process.env.SERVER_NUMBER || '*',
			requestNumber: requestNumber
		}
		process.nextTick(() => {
		setTimeout(() =>reply(rep), DELAY);
		});

	})();

}


server.start((err) => {
	if (err) {
		throw err;
	}

	console.log(`Server run at: ${server.info.uri}`);
	process.on('SIGTERM', function () {
		console.log("Container going to shout down");
	});
	
});



