'use strict';

var _functions = {};

process.on('message', function(payload) {

  console.log('in cp', payload);

  if (payload.action === 'ADDFUNC'){
    _functions[payload.name] = eval(payload.func); //rehydrate our function
    process.send({id: payload.id, action: 'ADDFUNC'});
  } else {
    try{
      var result = _functions[payload.action].apply(null, payload.args);
      process.send({id: payload.id, result: result});
    } catch(err){
      process.send({id: payload.id, error: err});
    } 
  }
  

});