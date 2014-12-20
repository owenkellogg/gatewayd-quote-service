
function Controller() {
}

Controller.prototype.index = function(request, response, next) {
  response.status(200).send({
    bridge_quotes: {
      destination_no_source: {
	get: '/v1/quotes/:destination_address/:destination_amount+:destination_currency'
      },
      destination_and_source_no_source_currency: {
	get: '/v1/quotes/:destination_address/:destination_amount+:destination_currency/:source_address'
      },
      destination_and_source_and_source_currency: {
	get: '/v1/quotes/:destination_address/:destination_amount+:destination_currency/:source_address/:source_currency'
      }
    }
  });
};

Controller.prototype.get = function(request, response, next) {
  console.log('DESTINATION_AMOUNT', request.params.destination_amount);
  console.log('DESTINATION_ADDRESS', request.params.destination_address);
  console.log('SOURCE_AMOUNT', request.params.source_amount);
  console.log('SOURCE_ADDRESS', request.params.source_address);

  amount_currency; request.params.destination_amount.split('+');
  if (amount_currency.length !== 2) {
    return next(new Error('destination_amount must be amount+currency'));
  }
  
  var destination = {
    address: request.params.destination_address,
    amount: amount_currency[0],
    currency: amount_currency[1]
  };

  var source = {
    address: request.params.source_address,
    currency: request.params.source_amount
  };

  response.status(200).send({
    destination: {
      address: request.params.destination_amount,
      amount: request.params.destination_address,
      currency: request.params.destination_address
    },
    source: {
      address: request.params.source_address,
      amount: request.params.source_amount,
      currency: request.params.source_amount
    }
  });
}

module.exports = Controller;

