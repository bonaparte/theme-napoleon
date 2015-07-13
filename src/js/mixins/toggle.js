var util = require("../core/utility");

///////////////////////////////////////////////////////////////////////////////
// Public 

module.exports = toggleMixin;




function toggleMixin(tag){

  this.toggle = toggle;
  
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

  function toggle(attribute){
    var newValue = util.getAttribute(tag, attribute) === "true" ? "false" : "true";
    tag.setAttribute(attribute, newValue);
  }
}
