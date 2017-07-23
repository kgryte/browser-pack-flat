(function(){
var _$empty_2 = {};

var _$doccy_3 = {};
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = _$empty_2;

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

_$doccy_3 = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
var _$attributeToProperty_5 = __attributeToProperty_5

var __transform_5 = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function __attributeToProperty_5 (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in __transform_5) {
        attrs[__transform_5[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

var __attrToProp_6 = _$attributeToProperty_5

var __VAR_6 = 0, __TEXT_6 = 1, __OPEN_6 = 2, __CLOSE_6 = 3, __ATTR_6 = 4
var __ATTR_KEY_6 = 5, __ATTR_KEY_W_6 = 6
var __ATTR_VALUE_W_6 = 7, __ATTR_VALUE_6 = 8
var __ATTR_VALUE_SQ_6 = 9, __ATTR_VALUE_DQ_6 = 10
var __ATTR_EQ_6 = 11, __ATTR_BREAK_6 = 12
var __COMMENT_6 = 13

var _$hyperx_6 = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = __attrToProp_6(h)
  }

  return function (strings) {
    var state = __TEXT_6, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === __ATTR_VALUE_DQ_6) xstate = __ATTR_VALUE_6
        if (xstate === __ATTR_VALUE_SQ_6) xstate = __ATTR_VALUE_6
        if (xstate === __ATTR_VALUE_W_6) xstate = __ATTR_VALUE_6
        if (xstate === __ATTR_6) xstate = __ATTR_KEY_6
        p.push([ __VAR_6, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === __OPEN_6 && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === __OPEN_6) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === __ATTR_KEY_6 || (s === __VAR_6 && p[1] === __ATTR_KEY_6)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === __ATTR_KEY_6) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === __VAR_6 && parts[i][1] === __ATTR_KEY_6) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === __ATTR_EQ_6) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === __ATTR_VALUE_6 || parts[i][0] === __ATTR_KEY_6) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === __VAR_6
          && (parts[i][1] === __ATTR_VALUE_6 || parts[i][1] === __ATTR_KEY_6)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === __CLOSE_6 || parts[i][0] === __ATTR_BREAK_6)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === __ATTR_KEY_6) {
        cur[1][p[1]] = true
      } else if (s === __VAR_6 && p[1] === __ATTR_KEY_6) {
        cur[1][p[2]] = true
      } else if (s === __CLOSE_6) {
        if (__selfClosing_6(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === __VAR_6 && p[1] === __TEXT_6) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === __TEXT_6) {
        cur[2].push(p[1])
      } else if (s === __ATTR_EQ_6 || s === __ATTR_BREAK_6) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === __ATTR_VALUE_W_6) state = __ATTR_6
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === __TEXT_6 && c === '<') {
          if (reg.length) res.push([__TEXT_6, reg])
          reg = ''
          state = __OPEN_6
        } else if (c === '>' && !__quot_6(state) && state !== __COMMENT_6) {
          if (state === __OPEN_6) {
            res.push([__OPEN_6,reg])
          } else if (state === __ATTR_KEY_6) {
            res.push([__ATTR_KEY_6,reg])
          } else if (state === __ATTR_VALUE_6 && reg.length) {
            res.push([__ATTR_VALUE_6,reg])
          }
          res.push([__CLOSE_6])
          reg = ''
          state = __TEXT_6
        } else if (state === __COMMENT_6 && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([__ATTR_VALUE_6,reg.substr(0, reg.length - 1)],[__CLOSE_6])
          }
          reg = ''
          state = __TEXT_6
        } else if (state === __OPEN_6 && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([__OPEN_6, reg],[__ATTR_KEY_6,'comment'],[__ATTR_EQ_6])
          }
          reg = c
          state = __COMMENT_6
        } else if (state === __TEXT_6 || state === __COMMENT_6) {
          reg += c
        } else if (state === __OPEN_6 && /\s/.test(c)) {
          res.push([__OPEN_6, reg])
          reg = ''
          state = __ATTR_6
        } else if (state === __OPEN_6) {
          reg += c
        } else if (state === __ATTR_6 && /[^\s"'=/]/.test(c)) {
          state = __ATTR_KEY_6
          reg = c
        } else if (state === __ATTR_6 && /\s/.test(c)) {
          if (reg.length) res.push([__ATTR_KEY_6,reg])
          res.push([__ATTR_BREAK_6])
        } else if (state === __ATTR_KEY_6 && /\s/.test(c)) {
          res.push([__ATTR_KEY_6,reg])
          reg = ''
          state = __ATTR_KEY_W_6
        } else if (state === __ATTR_KEY_6 && c === '=') {
          res.push([__ATTR_KEY_6,reg],[__ATTR_EQ_6])
          reg = ''
          state = __ATTR_VALUE_W_6
        } else if (state === __ATTR_KEY_6) {
          reg += c
        } else if ((state === __ATTR_KEY_W_6 || state === __ATTR_6) && c === '=') {
          res.push([__ATTR_EQ_6])
          state = __ATTR_VALUE_W_6
        } else if ((state === __ATTR_KEY_W_6 || state === __ATTR_6) && !/\s/.test(c)) {
          res.push([__ATTR_BREAK_6])
          if (/[\w-]/.test(c)) {
            reg += c
            state = __ATTR_KEY_6
          } else state = __ATTR_6
        } else if (state === __ATTR_VALUE_W_6 && c === '"') {
          state = __ATTR_VALUE_DQ_6
        } else if (state === __ATTR_VALUE_W_6 && c === "'") {
          state = __ATTR_VALUE_SQ_6
        } else if (state === __ATTR_VALUE_DQ_6 && c === '"') {
          res.push([__ATTR_VALUE_6,reg],[__ATTR_BREAK_6])
          reg = ''
          state = __ATTR_6
        } else if (state === __ATTR_VALUE_SQ_6 && c === "'") {
          res.push([__ATTR_VALUE_6,reg],[__ATTR_BREAK_6])
          reg = ''
          state = __ATTR_6
        } else if (state === __ATTR_VALUE_W_6 && !/\s/.test(c)) {
          state = __ATTR_VALUE_6
          i--
        } else if (state === __ATTR_VALUE_6 && /\s/.test(c)) {
          res.push([__ATTR_VALUE_6,reg],[__ATTR_BREAK_6])
          reg = ''
          state = __ATTR_6
        } else if (state === __ATTR_VALUE_6 || state === __ATTR_VALUE_SQ_6
        || state === __ATTR_VALUE_DQ_6) {
          reg += c
        }
      }
      if (state === __TEXT_6 && reg.length) {
        res.push([__TEXT_6,reg])
        reg = ''
      } else if (state === __ATTR_VALUE_6 && reg.length) {
        res.push([__ATTR_VALUE_6,reg])
        reg = ''
      } else if (state === __ATTR_VALUE_DQ_6 && reg.length) {
        res.push([__ATTR_VALUE_6,reg])
        reg = ''
      } else if (state === __ATTR_VALUE_SQ_6 && reg.length) {
        res.push([__ATTR_VALUE_6,reg])
        reg = ''
      } else if (state === __ATTR_KEY_6) {
        res.push([__ATTR_KEY_6,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function __quot_6 (state) {
  return state === __ATTR_VALUE_SQ_6 || state === __ATTR_VALUE_DQ_6
}

var __hasOwn_6 = Object.prototype.hasOwnProperty
function __has_6 (obj, key) { return __hasOwn_6.call(obj, key) }

var __closeRE_6 = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function __selfClosing_6 (tag) { return __closeRE_6.test(tag) }

var _$win_4 = {};
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

_$win_4 = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
/* global MutationObserver */
var __document_8 = _$doccy_3
var __window_8 = _$win_4
var __watch_8 = Object.create(null)
var __KEY_ID_8 = 'onloadid' + (new Date() % 9e6).toString(36)
var __KEY_ATTR_8 = 'data-' + __KEY_ID_8
var __INDEX_8 = 0

if (__window_8 && __window_8.MutationObserver) {
  var __observer_8 = new MutationObserver(function (mutations) {
    if (Object.keys(__watch_8).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === __KEY_ATTR_8) {
        __eachAttr_8(mutations[i], __turnon_8, __turnoff_8)
        continue
      }
      __eachMutation_8(mutations[i].removedNodes, __turnoff_8)
      __eachMutation_8(mutations[i].addedNodes, __turnon_8)
    }
  })
  __observer_8.observe(__document_8.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [__KEY_ATTR_8]
  })
}

var _$onload_8 = function onload (el, on, off, caller) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(__KEY_ATTR_8, 'o' + __INDEX_8)
  __watch_8['o' + __INDEX_8] = [on, off, 0, caller || onload.caller]
  __INDEX_8 += 1
  return el
}

function __turnon_8 (index, el) {
  if (__watch_8[index][0] && __watch_8[index][2] === 0) {
    __watch_8[index][0](el)
    __watch_8[index][2] = 1
  }
}

function __turnoff_8 (index, el) {
  if (__watch_8[index][1] && __watch_8[index][2] === 1) {
    __watch_8[index][1](el)
    __watch_8[index][2] = 0
  }
}

function __eachAttr_8 (mutation, on, off) {
  var newValue = mutation.target.getAttribute(__KEY_ATTR_8)
  if (__sameOrigin_8(mutation.oldValue, newValue)) {
    __watch_8[newValue] = __watch_8[mutation.oldValue]
    return
  }
  if (__watch_8[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (__watch_8[newValue]) {
    on(newValue, mutation.target)
  }
}

function __sameOrigin_8 (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return __watch_8[oldValue][3] === __watch_8[newValue][3]
}

function __eachMutation_8 (nodes, fn) {
  var keys = Object.keys(__watch_8)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(__KEY_ATTR_8)) {
      var onloadid = nodes[i].getAttribute(__KEY_ATTR_8)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      __eachMutation_8(nodes[i].childNodes, fn)
    }
  }
}

var _$bel_1 = {};
var __document_1 = _$doccy_3
var __hyperx_1 = _$hyperx_6
var __onload_1 = _$onload_8

var __SVGNS_1 = 'http://www.w3.org/2000/svg'
var __XLINKNS_1 = 'http://www.w3.org/1999/xlink'

var __BOOL_PROPS_1 = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var __COMMENT_TAG_1 = '!--'
var __SVG_TAGS_1 = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function __belCreateElement_1 (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (__SVG_TAGS_1.indexOf(tag) !== -1) {
    props.namespace = __SVGNS_1
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = __document_1.createElementNS(ns, tag)
  } else if (tag === __COMMENT_TAG_1) {
    return __document_1.createComment(props.comment)
  } else {
    el = __document_1.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    __onload_1(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    __belCreateElement_1.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (__BOOL_PROPS_1[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(__XLINKNS_1, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        typeof node === 'function' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = __document_1.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

_$bel_1 = __hyperx_1(__belCreateElement_1, {comments: true})
_$bel_1.default = _$bel_1
_$bel_1.createElement = __belCreateElement_1

'use strict';

var __range_7; // Create a range object for efficently rendering strings to elements.
var __NS_XHTML_7 = 'http://www.w3.org/1999/xhtml';

var __doc_7 = typeof document === 'undefined' ? undefined : document;

var __testEl_7 = __doc_7 ?
    __doc_7.body || __doc_7.createElement('div') :
    {};

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var __actualHasAttributeNS_7;

if (__testEl_7.hasAttributeNS) {
    __actualHasAttributeNS_7 = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (__testEl_7.hasAttribute) {
    __actualHasAttributeNS_7 = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    __actualHasAttributeNS_7 = function(el, namespaceURI, name) {
        return el.getAttributeNode(namespaceURI, name) != null;
    };
}

var __hasAttributeNS_7 = __actualHasAttributeNS_7;


function __toElement_7(str) {
    if (!__range_7 && __doc_7.createRange) {
        __range_7 = __doc_7.createRange();
        __range_7.selectNode(__doc_7.body);
    }

    var fragment;
    if (__range_7 && __range_7.createContextualFragment) {
        fragment = __range_7.createContextualFragment(str);
    } else {
        fragment = __doc_7.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function __compareNodeNames_7(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function __createElementNS_7(name, namespaceURI) {
    return !namespaceURI || namespaceURI === __NS_XHTML_7 ?
        __doc_7.createElement(name) :
        __doc_7.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function __moveChildren_7(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function __morphAttrs_7(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!__hasAttributeNS_7(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!__hasAttributeNS_7(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

function __syncBooleanAttrProp_7(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var __specialElHandlers_7 = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        __syncBooleanAttrProp_7(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        __syncBooleanAttrProp_7(fromEl, toEl, 'checked');
        __syncBooleanAttrProp_7(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!__hasAttributeNS_7(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!__hasAttributeNS_7(toEl, null, 'multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                var nodeName = curChild.nodeName;
                if (nodeName && nodeName.toUpperCase() === 'OPTION') {
                    if (__hasAttributeNS_7(curChild, null, 'selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};

var __ELEMENT_NODE_7 = 1;
var __TEXT_NODE_7 = 3;
var __COMMENT_NODE_7 = 8;

function __noop_7() {}

function __defaultGetNodeKey_7(node) {
    return node.id;
}

function __morphdomFactory_7(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = __doc_7.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = __toElement_7(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || __defaultGetNodeKey_7;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || __noop_7;
        var onNodeAdded = options.onNodeAdded || __noop_7;
        var onBeforeElUpdated = options.onBeforeElUpdated || __noop_7;
        var onElUpdated = options.onElUpdated || __noop_7;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || __noop_7;
        var onNodeDiscarded = options.onNodeDiscarded || __noop_7;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || __noop_7;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = {};
        var keyedRemovalList;

        function addKeyedRemoval(key) {
            if (keyedRemovalList) {
                keyedRemovalList.push(key);
            } else {
                keyedRemovalList = [key];
            }
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === __ELEMENT_NODE_7) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === __ELEMENT_NODE_7) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && __compareNodeNames_7(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);
            var curFromNodeKey;

            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
                return;
            }

            if (!childrenOnly) {
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                morphAttrs(fromEl, toEl);
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
                var curToNodeChild = toEl.firstChild;
                var curFromNodeChild = fromEl.firstChild;
                var curToNodeKey;

                var fromNextSibling;
                var toNextSibling;
                var matchingFromEl;

                outer: while (curToNodeChild) {
                    toNextSibling = curToNodeChild.nextSibling;
                    curToNodeKey = getNodeKey(curToNodeChild);

                    while (curFromNodeChild) {
                        fromNextSibling = curFromNodeChild.nextSibling;

                        if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        curFromNodeKey = getNodeKey(curFromNodeChild);

                        var curFromNodeType = curFromNodeChild.nodeType;

                        var isCompatible = undefined;

                        if (curFromNodeType === curToNodeChild.nodeType) {
                            if (curFromNodeType === __ELEMENT_NODE_7) {
                                // Both nodes being compared are Element nodes

                                if (curToNodeKey) {
                                    // The target node has a key so we want to match it up with the correct element
                                    // in the original DOM tree
                                    if (curToNodeKey !== curFromNodeKey) {
                                        // The current element in the original DOM tree does not have a matching key so
                                        // let's check our lookup to see if there is a matching element in the original
                                        // DOM tree
                                        if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                            if (curFromNodeChild.nextSibling === matchingFromEl) {
                                                // Special case for single element removals. To avoid removing the original
                                                // DOM node out of the tree (since that can break CSS transitions, etc.),
                                                // we will instead discard the current node and wait until the next
                                                // iteration to properly match up the keyed target element with its matching
                                                // element in the original tree
                                                isCompatible = false;
                                            } else {
                                                // We found a matching keyed element somewhere in the original DOM tree.
                                                // Let's moving the original DOM node into the current position and morph
                                                // it.

                                                // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                                // the `removeNode()` function for the node that is being discarded so that
                                                // all lifecycle hooks are correctly invoked
                                                fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                                fromNextSibling = curFromNodeChild.nextSibling;

                                                if (curFromNodeKey) {
                                                    // Since the node is keyed it might be matched up later so we defer
                                                    // the actual removal to later
                                                    addKeyedRemoval(curFromNodeKey);
                                                } else {
                                                    // NOTE: we skip nested keyed nodes from being removed since there is
                                                    //       still a chance they will be matched up later
                                                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                                }

                                                curFromNodeChild = matchingFromEl;
                                            }
                                        } else {
                                            // The nodes are not compatible since the "to" node has a key and there
                                            // is no matching keyed node in the source tree
                                            isCompatible = false;
                                        }
                                    }
                                } else if (curFromNodeKey) {
                                    // The original has a key
                                    isCompatible = false;
                                }

                                isCompatible = isCompatible !== false && __compareNodeNames_7(curFromNodeChild, curToNodeChild);
                                if (isCompatible) {
                                    // We found compatible DOM elements so transform
                                    // the current "from" node to match the current
                                    // target DOM node.
                                    morphEl(curFromNodeChild, curToNodeChild);
                                }

                            } else if (curFromNodeType === __TEXT_NODE_7 || curFromNodeType == __COMMENT_NODE_7) {
                                // Both nodes being compared are Text or Comment nodes
                                isCompatible = true;
                                // Simply update nodeValue on the original node to
                                // change the text value
                                if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                                }

                            }
                        }

                        if (isCompatible) {
                            // Advance both the "to" child and the "from" child since we found a match
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        // No compatible match so remove the old node from the DOM and continue trying to find a
                        // match in the original DOM. However, we only do this if the from node is not keyed
                        // since it is possible that a keyed node might match up with a node somewhere else in the
                        // target tree and we don't want to discard it just yet since it still might find a
                        // home in the final DOM tree. After everything is done we will remove any keyed nodes
                        // that didn't find a home
                        if (curFromNodeKey) {
                            // Since the node is keyed it might be matched up later so we defer
                            // the actual removal to later
                            addKeyedRemoval(curFromNodeKey);
                        } else {
                            // NOTE: we skip nested keyed nodes from being removed since there is
                            //       still a chance they will be matched up later
                            removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                        }

                        curFromNodeChild = fromNextSibling;
                    }

                    // If we got this far then we did not find a candidate match for
                    // our "to node" and we exhausted all of the children "from"
                    // nodes. Therefore, we will just append the current "to" node
                    // to the end
                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && __compareNodeNames_7(matchingFromEl, curToNodeChild)) {
                        fromEl.appendChild(matchingFromEl);
                        morphEl(matchingFromEl, curToNodeChild);
                    } else {
                        var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                        if (onBeforeNodeAddedResult !== false) {
                            if (onBeforeNodeAddedResult) {
                                curToNodeChild = onBeforeNodeAddedResult;
                            }

                            if (curToNodeChild.actualize) {
                                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || __doc_7);
                            }
                            fromEl.appendChild(curToNodeChild);
                            handleNodeAdded(curToNodeChild);
                        }
                    }

                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                }

                // We have processed all of the "to nodes". If curFromNodeChild is
                // non-null then we still have some from nodes left over that need
                // to be removed
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }
                    curFromNodeChild = fromNextSibling;
                }
            }

            var specialElHandler = __specialElHandlers_7[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphEl(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === __ELEMENT_NODE_7) {
                if (toNodeType === __ELEMENT_NODE_7) {
                    if (!__compareNodeNames_7(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = __moveChildren_7(fromNode, __createElementNS_7(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === __TEXT_NODE_7 || morphedNodeType === __COMMENT_NODE_7) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    if (morphedNode.nodeValue !== toNode.nodeValue) {
                        morphedNode.nodeValue = toNode.nodeValue;
                    }

                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || __doc_7);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var __morphdom_7 = __morphdomFactory_7(__morphAttrs_7);

var _$morphdom_7 = __morphdom_7;

var _$updateEvents_10 = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

var _$yoYo_9 = {};
var __bel_9 = _$bel_1 // turns template tag into DOM elements
var __morphdom_9 = _$morphdom_7 // efficiently diffs + morphs two DOM elements
var __defaultEvents_9 = _$updateEvents_10 // default events to be copied when dom elements update

_$yoYo_9 = __bel_9

// TODO move this + defaultEvents to a new module once we receive more feedback
_$yoYo_9.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return __morphdom_9(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || __defaultEvents_9
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    var oldValue = f.value
    var newValue = t.value
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (!newValue && !t.hasAttribute('value')) {
        t.value = f.value
      } else if (newValue !== oldValue) {
        f.value = newValue
      }
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

var __yo_12 = _$yoYo_9

var _$render_12 = function render (props) {
  return __yo_12`
    <body>
      <div>${props.counter}</div>
      <button onclick=${onclick}>
        +1
      </button>
    </body>
  `

  function onclick () {
    props.increment()
  }
}

var _$app_11 = {};
var __yo_11 = _$yoYo_9
var __view_11 = _$render_12
var __counter_11 = 0

function __render_11 () {
  __yo_11.update(document.body, __view_11({
    counter: __counter_11,
    increment: function () {
      __counter_11++
      __render_11()
    }
  }))
}

__render_11()

}());