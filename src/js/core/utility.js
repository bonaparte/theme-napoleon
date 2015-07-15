var objct = require("objct");
// var easing = require("./easing");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = {
  nodeContains : nodeContains,
  getAttribute : getAttribute,
  matchAttribute : matchAttribute,
  setAttribute : setAttribute,
  removeAttribute : removeAttribute,
  getClosest : getClosest,
  triggerEvent : triggerEvent,
  observe : observe,
  map : map
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var observedElements = [];

function observe(element){
  if(observedElements.indexOf(element)>=0) return;
  if(typeof element.bonaparte === "object" && element.bonaparte.observer) return;

  
  element.bonaparte = element.bonaparte || {};
  element.bonaparte.observer = new MutationObserver(mutationHandler);

  element.bonaparte.observer.observe(element, {
    attributes:true,
    attributeOldValue:true
  });
  observedElements.push(element);

}

///////////////////////////////////////////////////////////////////////////////

function mutationHandler(mutations){
  var attribute, data;
  
  for(var i=0; i<mutations.length; i++) {
    attribute = mutations[i].attributeName;
    if(typeof tag.attributes[attribute] === "undefined") continue;

    data = {
      name : attribute,
      previousValue : mutations[i].oldValue,
      newValue : tag.attributes[attribute].value
    };

    triggerEvent("tag.attributeChanged", data);
  }
 
}

///////////////////////////////////////////////////////////////////////////////

function triggerEvent(tag, event, params){
    var newEvent = new CustomEvent(event, params);
    tag.dispatchEvent(newEvent);
}

///////////////////////////////////////////////////////////////////////////////


function nodeContains(parent, child) {
  while((child=child.parentNode)&&child!==parent); 
  return !!child; 
};

///////////////////////////////////////////////////////////////////////////////

function getClosest(tag, name){
  while((tag=tag.parentNode)&&tag.nodeName.toUpperCase()!==name.toUpperCase()); 
  return tag ? tag:false; 

}

///////////////////////////////////////////////////////////////////////////////

function getAttribute(tag, name){
  var attribute = tag.attributes[name] || tag.attributes["data-"+name];
  return attribute ? attribute.value : undefined; 
}
///////////////////////////////////////////////////////////////////////////////

function matchAttribute(patterns, name){
  var pattern, dataPattern;
  if(!objct.isArray(patterns)) patterns = [patterns];

  for(var i=0; i<patterns.length; i++) {
    pattern = patterns[i];
    dataPattern = new RegExp("data-"+pattern.source);
    if(pattern.test(name) ||  dataPattern.test(name)) 
      return true;
  }
  return false;
}

///////////////////////////////////////////////////////////////////////////////

function setAttribute(tag, name, value) {
  if(tag.attributes["data-"+name] !== undefined) 
    tag.setAttribute("data-"+name, value);
  else 
    tag.setAttribute(name, value);
}

///////////////////////////////////////////////////////////////////////////////

function removeAttribute(tag, name) {

  if(typeof tag.attributes[name] !== "object") return;

  var value = tag.attributes[name].value;
  // remove attribute
  tag.removeAttribute(name);
  tag.removeAttribute("data-"+name);

  // trigger Mutation event
  tag.bonaparte.triggerEvent("tag.attributeChanged", {
    name : name,
    previousValue : value,
    newValue : null
  });  

}

///////////////////////////////////////////////////////////////////////////////
// x: current Value, 
// cMin: current range min, 
// cMax: current range max, 
// tMin: target range min, 
// tMax: target range max, 
// easingFunction: easingFunction (string)

function map(x, cMin, cMax, tMin, tMax, easingFunction) {
  easingFunction = typeof easing === "object" && easing[easingFunction] !== undefined ? 
    easing[easingFunction] : 
    function (t, b, c, d) { return b+c*(t/=d) };
  if(x===0) return tMin;
  return easingFunction(x-cMin, tMin, tMax-tMin, cMax-cMin);  
}
///////////////////////////////////////////////////////////////////////////////
