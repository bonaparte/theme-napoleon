var util = require("./utility");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = events;

///////////////////////////////////////////////////////////////////////////////
function events(tag){

///////////////////////////////////////////////////////////////////////////////
// Public

  this.triggerEvent = triggerEvent;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function triggerEvent(event, data, bubbles, cancelable){
    util.triggerEvent(tag, event, data, bubbles, cancelable);
  }

///////////////////////////////////////////////////////////////////////////////


}



