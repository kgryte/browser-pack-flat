(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.modulename = f()}})(function(){var define,module,exports;
var __module_1 = {};__module_1 = function a() {
  return 'A'
}

var __module_3 = {};__module_3 = function b() {
  return 'B'
}

var __module_2 = {};__module_2.a = __module_1
__module_2.b = __module_3

return __module_2
});