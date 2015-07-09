var util = require("../core/utility");
var registerTag = require("../core/tag");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = registerTag("button", button, [], HTMLButtonElement);

///////////////////////////////////////////////////////////////////////////////
function button(){
  var tag = this;
  var action = undefined;
  var targets = [];
  var attributes = {};
  var active;

  window.addEventListener("load", function(){
    setEvents();
    setTargets();
    setAttributes();

  });

///////////////////////////////////////////////////////////////////////////////

  tag.addEventListener("attributeChangedCallback", attributeChangedCallback);  

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
  
  function attributeChangedCallback(data){
    if(util.testAttribute(/action/, data.name)) setEvents();
    if(util.testAttribute(/target/, data.name)) setTargets();
    if(util.testAttribute(/target-.*/, data.name)) setAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function targetAttributeChangedCallback(data) {
    setTimeout(checkAttributes,0);
  }

///////////////////////////////////////////////////////////////////////////////

  function eventHandler(e){

    syncAttributes();
    triggerEvents();

    if(util.getAttribute(tag, "bubble") === "false") 
      e.stopPropagation();
  }

///////////////////////////////////////////////////////////////////////////////

  function triggerEvents(){
    var trigger = util.getAttribute(tag, "trigger");
    
    if(trigger === undefined) return; 

    for(var i = 0; i < targets.length; i++){
      target = targets[i];
      util.triggerEvent(target.tag, trigger)
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function checkAttributes(){
    var target, targetValue;
    active = undefined;
    for(var i =0; i< targets.length; i++){
      target = targets[i];
      for(var name in attributes) {
        targetValue = util.getAttribute(target.tag, name);
        if(targetValue !== attributes[name]) {
          active = false;
          target.values[name]= targetValue;
        }
        if(active !== false) active = true;
      }
    }

    if(active === true){
      tag.classList.add("active");
    }
    else {
      tag.classList.remove("active");
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function syncAttributes(){
    var target, targetValue;
    var toggle = util.getAttribute(tag, "toggle") === "true";

    for(var i = 0; i < targets.length; i++){
      target = targets[i];

      for(var name in attributes) {
        targetValue = active === true && toggle === true ? target.values[name] : attributes[name];
        util.setAttribute(target.tag, name, targetValue); 
      }
    }
  }
  
///////////////////////////////////////////////////////////////////////////////

  function setAttributes(){
    var attributeBase;
    attributes = [];
    for(var i=0; i < tag.attributes.length; i++) {
      if(util.testAttribute(/target-.*/, tag.attributes[i].name)) {
        attributeBase = tag.attributes[i].name.match(/(?:data-)?target-(.*)/)[1];
        attributes[attributeBase] = tag.attributes[i].value;
      }
    }
    checkAttributes();
  }

///////////////////////////////////////////////////////////////////////////////

  function setTargets(){
    var selector = util.getAttribute(tag, "target");

    // Remove old target event handlers
    for(var i = 0; i < targets.length; i++){
      targtes[i].observer.disconnect();
    }

    if(selector === undefined) return;

    var potentialSidebar = tag.parentNode; 
    var potentialToolbar = potentialSidebar.parentNode;


    // restrict button by parent toolbar in general
    var context = util.getClosest(tag, "toolbar-bonaparte") || document;

    //only restrict button in toolbar sidebars.
    // var potentialToolbar = util.getClosest(tag, "toolbar-bonaparte");
    // var context = potentialToolbar && util.nodeContains(potentialToolbar.firstElementChild, tag)?
    //   potentialToolbar : document;

     
    var newTargets = context.querySelectorAll(selector);
    targets = [];

    for(var i=0; i < newTargets.length; i++) {
      targets.push({
        tag : newTargets[i],
        values : {},
        observer: new MutationObserver(targetAttributeChangedCallback)
      });
      targets[i].observer.observe(targets[i].tag, {attributes:true});
    }
  }

///////////////////////////////////////////////////////////////////////////////

  function setEvents(){
    var newAction = util.getAttribute(tag, "action");

    if(action === newAction) return;

    if(action !== undefined)
      tag.removeEventListener(action, eventHandler);

    if(newAction !== undefined)
      tag.addEventListener(newAction, eventHandler);

    action=newAction;
  }

///////////////////////////////////////////////////////////////////////////////

}

 ///////////////////////////////////////////////////////////////////////////////