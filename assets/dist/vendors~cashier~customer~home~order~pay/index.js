(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~cashier~customer~home~order~pay"],{

/***/ "./node_modules/locutus/php/info/ini_get.js":
/*!**************************************************!*\
  !*** ./node_modules/locutus/php/info/ini_get.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function ini_get(varname) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/ini_get/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: The ini values must be set by ini_set or manually within an ini file
  //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //   example 1: ini_get('date.timezone')
  //   returns 1: 'Asia/Hong_Kong'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.ini = $locutus.php.ini || {};

  if ($locutus.php.ini[varname] && $locutus.php.ini[varname].local_value !== undefined) {
    if ($locutus.php.ini[varname].local_value === null) {
      return '';
    }
    return $locutus.php.ini[varname].local_value;
  }

  return '';
};
//# sourceMappingURL=ini_get.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/locutus/php/strings/echo.js":
/*!**************************************************!*\
  !*** ./node_modules/locutus/php/strings/echo.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function echo() {
  //  discuss at: https://locutus.io/php/echo/
  // original by: Philip Peterson
  // improved by: echo is bad
  // improved by: Nate
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //  revised by: Der Simon (https://innerdom.sourceforge.net/)
  // bugfixed by: Eugene Bulkin (https://doubleaw.com/)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: EdorFaus
  //      note 1: In 1.3.2 and earlier, this function wrote to the body of the document when it
  //      note 1: was called in webbrowsers, in addition to supporting XUL.
  //      note 1: This involved >100 lines of boilerplate to do this in a safe way.
  //      note 1: Since I can't imageine a complelling use-case for this, and XUL is deprecated
  //      note 1: I have removed this behavior in favor of just calling `console.log`
  //      note 2: You'll see functions depends on `echo` instead of `console.log` as we'll want
  //      note 2: to have 1 contact point to interface with the outside world, so that it's easy
  //      note 2: to support other ways of printing output.
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  //    input by: JB
  //   example 1: echo('Hello world')
  //   returns 1: undefined

  var args = Array.prototype.slice.call(arguments);
  return console.log(args.join(' '));
};
//# sourceMappingURL=echo.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/boolval.js":
/*!*************************************************!*\
  !*** ./node_modules/locutus/php/var/boolval.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function boolval(mixedVar) {
  // original by: Will Rowe
  //   example 1: boolval(true)
  //   returns 1: true
  //   example 2: boolval(false)
  //   returns 2: false
  //   example 3: boolval(0)
  //   returns 3: false
  //   example 4: boolval(0.0)
  //   returns 4: false
  //   example 5: boolval('')
  //   returns 5: false
  //   example 6: boolval('0')
  //   returns 6: false
  //   example 7: boolval([])
  //   returns 7: false
  //   example 8: boolval('')
  //   returns 8: false
  //   example 9: boolval(null)
  //   returns 9: false
  //   example 10: boolval(undefined)
  //   returns 10: false
  //   example 11: boolval('true')
  //   returns 11: true

  if (mixedVar === false) {
    return false;
  }

  if (mixedVar === 0 || mixedVar === 0.0) {
    return false;
  }

  if (mixedVar === '' || mixedVar === '0') {
    return false;
  }

  if (Array.isArray(mixedVar) && mixedVar.length === 0) {
    return false;
  }

  if (mixedVar === null || mixedVar === undefined) {
    return false;
  }

  return true;
};
//# sourceMappingURL=boolval.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/doubleval.js":
/*!***************************************************!*\
  !*** ./node_modules/locutus/php/var/doubleval.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function doubleval(mixedVar) {
  //  discuss at: https://locutus.io/php/doubleval/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: doubleval(186)
  //   returns 1: 186.00

  var floatval = __webpack_require__(/*! ../var/floatval */ "./node_modules/locutus/php/var/floatval.js");

  return floatval(mixedVar);
};
//# sourceMappingURL=doubleval.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/empty.js":
/*!***********************************************!*\
  !*** ./node_modules/locutus/php/var/empty.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function empty(mixedVar) {
  //  discuss at: https://locutus.io/php/empty/
  // original by: Philippe Baumann
  //    input by: Onno Marsman (https://twitter.com/onnomarsman)
  //    input by: LH
  //    input by: Stoyan Kyosev (https://www.svest.org/)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Francesco
  // improved by: Marc Jansen
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //   example 1: empty(null)
  //   returns 1: true
  //   example 2: empty(undefined)
  //   returns 2: true
  //   example 3: empty([])
  //   returns 3: true
  //   example 4: empty({})
  //   returns 4: true
  //   example 5: empty({'aFunc' : function () { alert('humpty'); } })
  //   returns 5: false

  var undef = void 0;
  var key = void 0;
  var i = void 0;
  var len = void 0;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }

  if ((typeof mixedVar === 'undefined' ? 'undefined' : _typeof(mixedVar)) === 'object') {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  return false;
};
//# sourceMappingURL=empty.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/floatval.js":
/*!**************************************************!*\
  !*** ./node_modules/locutus/php/var/floatval.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function floatval(mixedVar) {
  //  discuss at: https://locutus.io/php/floatval/
  // original by: Michael White (https://getsprink.com)
  //      note 1: The native parseFloat() method of JavaScript returns NaN
  //      note 1: when it encounters a string before an int or float value.
  //   example 1: floatval('150.03_page-section')
  //   returns 1: 150.03
  //   example 2: floatval('page: 3')
  //   example 2: floatval('-50 + 8')
  //   returns 2: 0
  //   returns 2: -50

  return parseFloat(mixedVar) || 0;
};
//# sourceMappingURL=floatval.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/gettype.js":
/*!*************************************************!*\
  !*** ./node_modules/locutus/php/var/gettype.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function gettype(mixedVar) {
  //  discuss at: https://locutus.io/php/gettype/
  // original by: Paulo Freitas
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Douglas Crockford (https://javascript.crockford.com)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: KELAN
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: gettype(1)
  //   returns 1: 'integer'
  //   example 2: gettype(undefined)
  //   returns 2: 'undefined'
  //   example 3: gettype({0: 'Kevin van Zonneveld'})
  //   returns 3: 'object'
  //   example 4: gettype('foo')
  //   returns 4: 'string'
  //   example 5: gettype({0: function () {return false;}})
  //   returns 5: 'object'
  //   example 6: gettype({0: 'test', length: 1, splice: function () {}})
  //   returns 6: 'object'
  //   example 7: gettype(['test'])
  //   returns 7: 'array'

  var isFloat = __webpack_require__(/*! ../var/is_float */ "./node_modules/locutus/php/var/is_float.js");

  var s = typeof mixedVar === 'undefined' ? 'undefined' : _typeof(mixedVar);
  var name = void 0;
  var _getFuncName = function _getFuncName(fn) {
    var name = /\W*function\s+([\w$]+)\s*\(/.exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  if (s === 'object') {
    if (mixedVar !== null) {
      // From: https://javascript.crockford.com/remedial.html
      // @todo: Break up this lengthy if statement
      if (typeof mixedVar.length === 'number' && !mixedVar.propertyIsEnumerable('length') && typeof mixedVar.splice === 'function') {
        s = 'array';
      } else if (mixedVar.constructor && _getFuncName(mixedVar.constructor)) {
        name = _getFuncName(mixedVar.constructor);
        if (name === 'Date') {
          // not in PHP
          s = 'date';
        } else if (name === 'RegExp') {
          // not in PHP
          s = 'regexp';
        } else if (name === 'LOCUTUS_Resource') {
          // Check against our own resource constructor
          s = 'resource';
        }
      }
    } else {
      s = 'null';
    }
  } else if (s === 'number') {
    s = isFloat(mixedVar) ? 'double' : 'integer';
  }

  return s;
};
//# sourceMappingURL=gettype.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/index.js":
/*!***********************************************!*\
  !*** ./node_modules/locutus/php/var/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.boolval = __webpack_require__(/*! ./boolval */ "./node_modules/locutus/php/var/boolval.js");
module.exports.doubleval = __webpack_require__(/*! ./doubleval */ "./node_modules/locutus/php/var/doubleval.js");
module.exports.empty = __webpack_require__(/*! ./empty */ "./node_modules/locutus/php/var/empty.js");
module.exports.floatval = __webpack_require__(/*! ./floatval */ "./node_modules/locutus/php/var/floatval.js");
module.exports.gettype = __webpack_require__(/*! ./gettype */ "./node_modules/locutus/php/var/gettype.js");
module.exports.intval = __webpack_require__(/*! ./intval */ "./node_modules/locutus/php/var/intval.js");
module.exports.is_array = __webpack_require__(/*! ./is_array */ "./node_modules/locutus/php/var/is_array.js");
module.exports.is_binary = __webpack_require__(/*! ./is_binary */ "./node_modules/locutus/php/var/is_binary.js");
module.exports.is_bool = __webpack_require__(/*! ./is_bool */ "./node_modules/locutus/php/var/is_bool.js");
module.exports.is_buffer = __webpack_require__(/*! ./is_buffer */ "./node_modules/locutus/php/var/is_buffer.js");
module.exports.is_callable = __webpack_require__(/*! ./is_callable */ "./node_modules/locutus/php/var/is_callable.js");
module.exports.is_double = __webpack_require__(/*! ./is_double */ "./node_modules/locutus/php/var/is_double.js");
module.exports.is_float = __webpack_require__(/*! ./is_float */ "./node_modules/locutus/php/var/is_float.js");
module.exports.is_int = __webpack_require__(/*! ./is_int */ "./node_modules/locutus/php/var/is_int.js");
module.exports.is_integer = __webpack_require__(/*! ./is_integer */ "./node_modules/locutus/php/var/is_integer.js");
module.exports.is_long = __webpack_require__(/*! ./is_long */ "./node_modules/locutus/php/var/is_long.js");
module.exports.is_null = __webpack_require__(/*! ./is_null */ "./node_modules/locutus/php/var/is_null.js");
module.exports.is_numeric = __webpack_require__(/*! ./is_numeric */ "./node_modules/locutus/php/var/is_numeric.js");
module.exports.is_object = __webpack_require__(/*! ./is_object */ "./node_modules/locutus/php/var/is_object.js");
module.exports.is_real = __webpack_require__(/*! ./is_real */ "./node_modules/locutus/php/var/is_real.js");
module.exports.is_scalar = __webpack_require__(/*! ./is_scalar */ "./node_modules/locutus/php/var/is_scalar.js");
module.exports.is_string = __webpack_require__(/*! ./is_string */ "./node_modules/locutus/php/var/is_string.js");
module.exports.is_unicode = __webpack_require__(/*! ./is_unicode */ "./node_modules/locutus/php/var/is_unicode.js");
module.exports.isset = __webpack_require__(/*! ./isset */ "./node_modules/locutus/php/var/isset.js");
module.exports.print_r = __webpack_require__(/*! ./print_r */ "./node_modules/locutus/php/var/print_r.js");
module.exports.serialize = __webpack_require__(/*! ./serialize */ "./node_modules/locutus/php/var/serialize.js");
module.exports.strval = __webpack_require__(/*! ./strval */ "./node_modules/locutus/php/var/strval.js");
module.exports.unserialize = __webpack_require__(/*! ./unserialize */ "./node_modules/locutus/php/var/unserialize.js");
module.exports.var_dump = __webpack_require__(/*! ./var_dump */ "./node_modules/locutus/php/var/var_dump.js");
module.exports.var_export = __webpack_require__(/*! ./var_export */ "./node_modules/locutus/php/var/var_export.js");
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/intval.js":
/*!************************************************!*\
  !*** ./node_modules/locutus/php/var/intval.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function intval(mixedVar, base) {
  //  discuss at: https://locutus.io/php/intval/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: stensi
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
  //    input by: Matteo
  //   example 1: intval('Kevin van Zonneveld')
  //   returns 1: 0
  //   example 2: intval(4.2)
  //   returns 2: 4
  //   example 3: intval(42, 8)
  //   returns 3: 42
  //   example 4: intval('09')
  //   returns 4: 9
  //   example 5: intval('1e', 16)
  //   returns 5: 30
  //   example 6: intval(0x200000001)
  //   returns 6: 8589934593
  //   example 7: intval('0xff', 0)
  //   returns 7: 255
  //   example 8: intval('010', 0)
  //   returns 8: 8

  var tmp = void 0,
      match = void 0;

  var type = typeof mixedVar === 'undefined' ? 'undefined' : _typeof(mixedVar);

  if (type === 'boolean') {
    return +mixedVar;
  } else if (type === 'string') {
    if (base === 0) {
      match = mixedVar.match(/^\s*0(x?)/i);
      base = match ? match[1] ? 16 : 8 : 10;
    }
    tmp = parseInt(mixedVar, base || 10);
    return isNaN(tmp) || !isFinite(tmp) ? 0 : tmp;
  } else if (type === 'number' && isFinite(mixedVar)) {
    return mixedVar < 0 ? Math.ceil(mixedVar) : Math.floor(mixedVar);
  } else {
    return 0;
  }
};
//# sourceMappingURL=intval.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_array.js":
/*!**************************************************!*\
  !*** ./node_modules/locutus/php/var/is_array.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function is_array(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_array/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Legaev Andrey
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Nathan Sepulveda
  // improved by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Cord
  // bugfixed by: Manish
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      note 1: In Locutus, javascript objects are like php associative arrays,
  //      note 1: thus JavaScript objects will also
  //      note 1: return true in this function (except for objects which inherit properties,
  //      note 1: being thus used as objects),
  //      note 1: unless you do ini_set('locutus.objectsAsArrays', 0),
  //      note 1: in which case only genuine JavaScript arrays
  //      note 1: will return true
  //   example 1: is_array(['Kevin', 'van', 'Zonneveld'])
  //   returns 1: true
  //   example 2: is_array('Kevin van Zonneveld')
  //   returns 2: false
  //   example 3: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 3: true
  //   example 4: ini_set('locutus.objectsAsArrays', 0)
  //   example 4: is_array({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 4: false
  //   example 5: is_array(function tmp_a (){ this.name = 'Kevin' })
  //   returns 5: false

  var _getFuncName = function _getFuncName(fn) {
    var name = /\W*function\s+([\w$]+)\s*\(/.exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };
  var _isArray = function _isArray(mixedVar) {
    // return Object.prototype.toString.call(mixedVar) === '[object Array]';
    // The above works, but let's do the even more stringent approach:
    // (since Object.prototype.toString could be overridden)
    // Null, Not an object, no length property so couldn't be an Array (or String)
    if (!mixedVar || (typeof mixedVar === 'undefined' ? 'undefined' : _typeof(mixedVar)) !== 'object' || typeof mixedVar.length !== 'number') {
      return false;
    }
    var len = mixedVar.length;
    mixedVar[mixedVar.length] = 'bogus';
    // The only way I can think of to get around this (or where there would be trouble)
    // would be to have an object defined
    // with a custom "length" getter which changed behavior on each call
    // (or a setter to mess up the following below) or a custom
    // setter for numeric properties, but even that would need to listen for
    // specific indexes; but there should be no false negatives
    // and such a false positive would need to rely on later JavaScript
    // innovations like __defineSetter__
    if (len !== mixedVar.length) {
      // We know it's an array since length auto-changed with the addition of a
      // numeric property at its length end, so safely get rid of our bogus element
      mixedVar.length -= 1;
      return true;
    }
    // Get rid of the property we added onto a non-array object; only possible
    // side-effect is if the user adds back the property later, it will iterate
    // this property in the older order placement in IE (an order which should not
    // be depended on anyways)
    delete mixedVar[mixedVar.length];
    return false;
  };

  if (!mixedVar || (typeof mixedVar === 'undefined' ? 'undefined' : _typeof(mixedVar)) !== 'object') {
    return false;
  }

  var isArray = _isArray(mixedVar);

  if (isArray) {
    return true;
  }

  var iniVal = ( true ? __webpack_require__(/*! ../info/ini_get */ "./node_modules/locutus/php/info/ini_get.js")('locutus.objectsAsArrays') : undefined) || 'on';
  if (iniVal === 'on') {
    var asString = Object.prototype.toString.call(mixedVar);
    var asFunc = _getFuncName(mixedVar.constructor);

    if (asString === '[object Object]' && asFunc === 'Object') {
      // Most likely a literal and intended as assoc. array
      return true;
    }
  }

  return false;
};
//# sourceMappingURL=is_array.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_binary.js":
/*!***************************************************!*\
  !*** ./node_modules/locutus/php/var/is_binary.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_binary(vr) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_binary/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: is_binary('This could be binary as far as JavaScript knows...')
  //   returns 1: true

  return typeof vr === 'string'; // If it is a string of any kind, it could be binary
};
//# sourceMappingURL=is_binary.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_bool.js":
/*!*************************************************!*\
  !*** ./node_modules/locutus/php/var/is_bool.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_bool(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_bool/
  // original by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: CoursesWeb (https://www.coursesweb.net/)
  //   example 1: is_bool(false)
  //   returns 1: true
  //   example 2: is_bool(0)
  //   returns 2: false

  return mixedVar === true || mixedVar === false; // Faster (in FF) than type checking
};
//# sourceMappingURL=is_bool.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_buffer.js":
/*!***************************************************!*\
  !*** ./node_modules/locutus/php/var/is_buffer.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_buffer(vr) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_buffer/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: is_buffer('This could be binary or a regular string...')
  //   returns 1: true

  return typeof vr === 'string';
};
//# sourceMappingURL=is_buffer.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_callable.js":
/*!*****************************************************!*\
  !*** ./node_modules/locutus/php/var/is_callable.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function is_callable(mixedVar, syntaxOnly, callableName) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_callable/
  // original by: Brett Zamir (https://brett-zamir.me)
  //    input by: François
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: KnightYoshi
  // improved by: Waldo Malqui Silva (https://fayr.us/waldo/)
  //      note 1: The variable callableName cannot work as a string variable passed by
  //      note 1: reference as in PHP (since JavaScript does not support passing
  //      note 1: strings by reference), but instead will take the name of
  //      note 1: a global variable and set that instead.
  //      note 1: When used on an object, depends on a constructor property
  //      note 1: being kept on the object prototype
  //      note 2: Depending on the `callableName` that is passed, this function can use eval.
  //      note 2: The eval input is however checked to only allow valid function names,
  //      note 2: So it should not be unsafer than uses without eval (seeing as you can)
  //      note 2: already pass any function to be executed here.
  //   example 1: is_callable('is_callable')
  //   returns 1: true
  //   example 2: is_callable('bogusFunction', true)
  //   returns 2: true // gives true because does not do strict checking
  //   example 3: function SomeClass () {}
  //   example 3: SomeClass.prototype.someMethod = function (){}
  //   example 3: var testObj = new SomeClass()
  //   example 3: is_callable([testObj, 'someMethod'], true, 'myVar')
  //   example 3: var $result = myVar
  //   returns 3: 'SomeClass::someMethod'
  //   example 4: is_callable(function () {})
  //   returns 4: true
  //   example 5: is_callable(class MyClass {})
  //   returns 5: false

  var $global = typeof window !== 'undefined' ? window : global;

  var validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

  var name = '';
  var obj = {};
  var method = '';
  var validFunctionName = false;

  var getFuncName = function getFuncName(fn) {
    var name = /\W*function\s+([\w$]+)\s*\(/.exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  // eslint-disable-next-line no-useless-escape
  if (/(^class|\(this\,)/.test(mixedVar.toString())) {
    return false;
  }

  if (typeof mixedVar === 'string') {
    obj = $global;
    method = mixedVar;
    name = mixedVar;
    validFunctionName = !!name.match(validJSFunctionNamePattern);
  } else if (typeof mixedVar === 'function') {
    return true;
  } else if (Object.prototype.toString.call(mixedVar) === '[object Array]' && mixedVar.length === 2 && _typeof(mixedVar[0]) === 'object' && typeof mixedVar[1] === 'string') {
    obj = mixedVar[0];
    method = mixedVar[1];
    name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method;
  }

  if (syntaxOnly || typeof obj[method] === 'function') {
    if (callableName) {
      $global[callableName] = name;
    }
    return true;
  }

  // validFunctionName avoids exploits
  if (validFunctionName && typeof eval(method) === 'function') {
    // eslint-disable-line no-eval
    if (callableName) {
      $global[callableName] = name;
    }
    return true;
  }

  return false;
};
//# sourceMappingURL=is_callable.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/locutus/php/var/is_double.js":
/*!***************************************************!*\
  !*** ./node_modules/locutus/php/var/is_double.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_double(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_double/
  // original by: Paulo Freitas
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_double(186.31)
  //   returns 1: true

  var _isFloat = __webpack_require__(/*! ../var/is_float */ "./node_modules/locutus/php/var/is_float.js");
  return _isFloat(mixedVar);
};
//# sourceMappingURL=is_double.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_float.js":
/*!**************************************************!*\
  !*** ./node_modules/locutus/php/var/is_float.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_float(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_float/
  // original by: Paulo Freitas
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // improved by: WebDevHobo (https://webdevhobo.blogspot.com/)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_float(186.31)
  //   returns 1: true

  return +mixedVar === mixedVar && (!isFinite(mixedVar) || !!(mixedVar % 1));
};
//# sourceMappingURL=is_float.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_int.js":
/*!************************************************!*\
  !*** ./node_modules/locutus/php/var/is_int.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_int(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_int/
  // original by: Alex
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: WebDevHobo (https://webdevhobo.blogspot.com/)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //  revised by: Matt Bradley
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_int(23)
  //   returns 1: true
  //   example 2: is_int('23')
  //   returns 2: false
  //   example 3: is_int(23.5)
  //   returns 3: false
  //   example 4: is_int(true)
  //   returns 4: false

  return mixedVar === +mixedVar && isFinite(mixedVar) && !(mixedVar % 1);
};
//# sourceMappingURL=is_int.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_integer.js":
/*!****************************************************!*\
  !*** ./node_modules/locutus/php/var/is_integer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_integer(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_integer/
  // original by: Paulo Freitas
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_integer(186.31)
  //   returns 1: false
  //   example 2: is_integer(12)
  //   returns 2: true

  var _isInt = __webpack_require__(/*! ../var/is_int */ "./node_modules/locutus/php/var/is_int.js");
  return _isInt(mixedVar);
};
//# sourceMappingURL=is_integer.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_long.js":
/*!*************************************************!*\
  !*** ./node_modules/locutus/php/var/is_long.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_long(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_long/
  // original by: Paulo Freitas
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_long(186.31)
  //   returns 1: true

  var _isFloat = __webpack_require__(/*! ../var/is_float */ "./node_modules/locutus/php/var/is_float.js");
  return _isFloat(mixedVar);
};
//# sourceMappingURL=is_long.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_null.js":
/*!*************************************************!*\
  !*** ./node_modules/locutus/php/var/is_null.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_null(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_null/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: is_null('23')
  //   returns 1: false
  //   example 2: is_null(null)
  //   returns 2: true

  return mixedVar === null;
};
//# sourceMappingURL=is_null.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_numeric.js":
/*!****************************************************!*\
  !*** ./node_modules/locutus/php/var/is_numeric.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_numeric(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_numeric/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: David
  // improved by: taith
  // bugfixed by: Tim de Koning
  // bugfixed by: WebDevHobo (https://webdevhobo.blogspot.com/)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Denis Chenu (https://shnoulle.net)
  //   example 1: is_numeric(186.31)
  //   returns 1: true
  //   example 2: is_numeric('Kevin van Zonneveld')
  //   returns 2: false
  //   example 3: is_numeric(' +186.31e2')
  //   returns 3: true
  //   example 4: is_numeric('')
  //   returns 4: false
  //   example 5: is_numeric([])
  //   returns 5: false
  //   example 6: is_numeric('1 ')
  //   returns 6: false

  var whitespace = [' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200A', '\u200B', '\u2028', '\u2029', '\u3000'].join('');

  // @todo: Break this up using many single conditions with early returns
  return (typeof mixedVar === 'number' || typeof mixedVar === 'string' && whitespace.indexOf(mixedVar.slice(-1)) === -1) && mixedVar !== '' && !isNaN(mixedVar);
};
//# sourceMappingURL=is_numeric.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_object.js":
/*!***************************************************!*\
  !*** ./node_modules/locutus/php/var/is_object.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function is_object(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_object/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Legaev Andrey
  // improved by: Michael White (https://getsprink.com)
  //   example 1: is_object('23')
  //   returns 1: false
  //   example 2: is_object({foo: 'bar'})
  //   returns 2: true
  //   example 3: is_object(null)
  //   returns 3: false

  if (Object.prototype.toString.call(mixedVar) === '[object Array]') {
    return false;
  }
  return mixedVar !== null && (typeof mixedVar === 'undefined' ? 'undefined' : _typeof(mixedVar)) === 'object';
};
//# sourceMappingURL=is_object.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_real.js":
/*!*************************************************!*\
  !*** ./node_modules/locutus/php/var/is_real.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_real(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_real/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_real(186.31)
  //   returns 1: true

  var _isFloat = __webpack_require__(/*! ../var/is_float */ "./node_modules/locutus/php/var/is_float.js");
  return _isFloat(mixedVar);
};
//# sourceMappingURL=is_real.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_scalar.js":
/*!***************************************************!*\
  !*** ./node_modules/locutus/php/var/is_scalar.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function is_scalar(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_scalar/
  // original by: Paulo Freitas
  //   example 1: is_scalar(186.31)
  //   returns 1: true
  //   example 2: is_scalar({0: 'Kevin van Zonneveld'})
  //   returns 2: false

  return (/boolean|number|string/.test(typeof mixedVar === "undefined" ? "undefined" : _typeof(mixedVar))
  );
};
//# sourceMappingURL=is_scalar.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_string.js":
/*!***************************************************!*\
  !*** ./node_modules/locutus/php/var/is_string.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_string(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_string/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: is_string('23')
  //   returns 1: true
  //   example 2: is_string(23.5)
  //   returns 2: false

  return typeof mixedVar === 'string';
};
//# sourceMappingURL=is_string.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/is_unicode.js":
/*!****************************************************!*\
  !*** ./node_modules/locutus/php/var/is_unicode.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function is_unicode(vr) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/is_unicode/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: Almost all strings in JavaScript should be Unicode
  //   example 1: is_unicode('We the peoples of the United Nations...!')
  //   returns 1: true

  if (typeof vr !== 'string') {
    return false;
  }

  // If surrogates occur outside of high-low pairs, then this is not Unicode
  var arr = [];
  var highSurrogate = '[\uD800-\uDBFF]';
  var lowSurrogate = '[\uDC00-\uDFFF]';
  var highSurrogateBeforeAny = new RegExp(highSurrogate + '([\\s\\S])', 'g');
  var lowSurrogateAfterAny = new RegExp('([\\s\\S])' + lowSurrogate, 'g');
  var singleLowSurrogate = new RegExp('^' + lowSurrogate + '$');
  var singleHighSurrogate = new RegExp('^' + highSurrogate + '$');

  while ((arr = highSurrogateBeforeAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleLowSurrogate)) {
      // If high not followed by low surrogate
      return false;
    }
  }
  while ((arr = lowSurrogateAfterAny.exec(vr)) !== null) {
    if (!arr[1] || !arr[1].match(singleHighSurrogate)) {
      // If low not preceded by high surrogate
      return false;
    }
  }

  return true;
};
//# sourceMappingURL=is_unicode.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/isset.js":
/*!***********************************************!*\
  !*** ./node_modules/locutus/php/var/isset.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isset() {
  //  discuss at: https://locutus.io/php/isset/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: FremyCompany
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Rafał Kukawski (https://blog.kukawski.pl)
  //   example 1: isset( undefined, true)
  //   returns 1: false
  //   example 2: isset( 'Kevin van Zonneveld' )
  //   returns 2: true

  var a = arguments;
  var l = a.length;
  var i = 0;
  var undef = void 0;

  if (l === 0) {
    throw new Error('Empty isset');
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null) {
      return false;
    }
    i++;
  }

  return true;
};
//# sourceMappingURL=isset.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/print_r.js":
/*!*************************************************!*\
  !*** ./node_modules/locutus/php/var/print_r.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function print_r(array, returnVal) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/print_r/
  // original by: Michael White (https://getsprink.com)
  // improved by: Ben Bryan
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Brett Zamir (https://brett-zamir.me)
  //   example 1: print_r(1, true)
  //   returns 1: '1'

  var echo = __webpack_require__(/*! ../strings/echo */ "./node_modules/locutus/php/strings/echo.js");

  var output = '';
  var padChar = ' ';
  var padVal = 4;

  var _repeatChar = function _repeatChar(len, padChar) {
    var str = '';
    for (var i = 0; i < len; i++) {
      str += padChar;
    }
    return str;
  };
  var _formatArray = function _formatArray(obj, curDepth, padVal, padChar) {
    if (curDepth > 0) {
      curDepth++;
    }

    var basePad = _repeatChar(padVal * curDepth, padChar);
    var thickPad = _repeatChar(padVal * (curDepth + 1), padChar);
    var str = '';

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.constructor) {
      str += 'Array\n' + basePad + '(\n';
      for (var key in obj) {
        if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
          str += thickPad;
          str += '[';
          str += key;
          str += '] => ';
          str += _formatArray(obj[key], curDepth + 1, padVal, padChar);
        } else {
          str += thickPad;
          str += '[';
          str += key;
          str += '] => ';
          str += obj[key];
          str += '\n';
        }
      }
      str += basePad + ')\n';
    } else if (obj === null || obj === undefined) {
      str = '';
    } else {
      // for our "resource" class
      str = obj.toString();
    }

    return str;
  };

  output = _formatArray(array, 0, padVal, padChar);

  if (returnVal !== true) {
    echo(output);
    return true;
  }
  return output;
};
//# sourceMappingURL=print_r.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/serialize.js":
/*!***************************************************!*\
  !*** ./node_modules/locutus/php/var/serialize.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function serialize(mixedValue) {
  //  discuss at: https://locutus.io/php/serialize/
  // original by: Arpad Ray (mailto:arpad@php.net)
  // improved by: Dino
  // improved by: Le Torbi (https://www.letorbi.de/)
  // improved by: Kevin van Zonneveld (https://kvz.io/)
  // bugfixed by: Andrej Pavlovic
  // bugfixed by: Garagoth
  // bugfixed by: Russell Walker (https://www.nbill.co.uk/)
  // bugfixed by: Jamie Beck (https://www.terabit.ca/)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io/)
  // bugfixed by: Ben (https://benblume.co.uk/)
  // bugfixed by: Codestar (https://codestarlive.com/)
  // bugfixed by: idjem (https://github.com/idjem)
  //    input by: DtTvB (https://dt.in.th/2008-09-16.string-length-in-bytes.html)
  //    input by: Martin (https://www.erlenwiese.de/)
  //      note 1: We feel the main purpose of this function should be to ease
  //      note 1: the transport of data between php & js
  //      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
  //   example 1: serialize(['Kevin', 'van', 'Zonneveld'])
  //   returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
  //   example 2: serialize({firstName: 'Kevin', midName: 'van'})
  //   returns 2: 'a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}'
  //   example 3: serialize( {'ü': 'ü', '四': '四', '𠜎': '𠜎'})
  //   returns 3: 'a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}'

  var val = void 0,
      key = void 0,
      okey = void 0;
  var ktype = '';
  var vals = '';
  var count = 0;

  var _utf8Size = function _utf8Size(str) {
    return ~-encodeURI(str).split(/%..|./).length;
  };

  var _getType = function _getType(inp) {
    var match = void 0;
    var key = void 0;
    var cons = void 0;
    var types = void 0;
    var type = typeof inp === 'undefined' ? 'undefined' : _typeof(inp);

    if (type === 'object' && !inp) {
      return 'null';
    }

    if (type === 'object') {
      if (!inp.constructor) {
        return 'object';
      }
      cons = inp.constructor.toString();
      match = cons.match(/(\w+)\(/);
      if (match) {
        cons = match[1].toLowerCase();
      }
      types = ['boolean', 'number', 'string', 'array'];
      for (key in types) {
        if (cons === types[key]) {
          type = types[key];
          break;
        }
      }
    }
    return type;
  };

  var type = _getType(mixedValue);

  switch (type) {
    case 'function':
      val = '';
      break;
    case 'boolean':
      val = 'b:' + (mixedValue ? '1' : '0');
      break;
    case 'number':
      val = (Math.round(mixedValue) === mixedValue ? 'i' : 'd') + ':' + mixedValue;
      break;
    case 'string':
      val = 's:' + _utf8Size(mixedValue) + ':"' + mixedValue + '"';
      break;
    case 'array':
    case 'object':
      val = 'a';
      /*
      if (type === 'object') {
        var objname = mixedValue.constructor.toString().match(/(\w+)\(\)/);
        if (objname === undefined) {
          return;
        }
        objname[1] = serialize(objname[1]);
        val = 'O' + objname[1].substring(1, objname[1].length - 1);
      }
      */

      for (key in mixedValue) {
        if (mixedValue.hasOwnProperty(key)) {
          ktype = _getType(mixedValue[key]);
          if (ktype === 'function') {
            continue;
          }

          okey = key.match(/^[0-9]+$/) ? parseInt(key, 10) : key;
          vals += serialize(okey) + serialize(mixedValue[key]);
          count++;
        }
      }
      val += ':' + count + ':{' + vals + '}';
      break;
    case 'undefined':
    default:
      // Fall-through
      // if the JS object has a property which contains a null value,
      // the string cannot be unserialized by PHP
      val = 'N';
      break;
  }
  if (type !== 'object' && type !== 'array') {
    val += ';';
  }

  return val;
};
//# sourceMappingURL=serialize.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/strval.js":
/*!************************************************!*\
  !*** ./node_modules/locutus/php/var/strval.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function strval(str) {
  //  discuss at: https://locutus.io/php/strval/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: strval({red: 1, green: 2, blue: 3, white: 4})
  //   returns 1: 'Object'

  var gettype = __webpack_require__(/*! ../var/gettype */ "./node_modules/locutus/php/var/gettype.js");
  var type = '';

  if (str === null) {
    return '';
  }

  type = gettype(str);

  // Comment out the entire switch if you want JS-like
  // behavior instead of PHP behavior
  switch (type) {
    case 'boolean':
      if (str === true) {
        return '1';
      }
      return '';
    case 'array':
      return 'Array';
    case 'object':
      return 'Object';
  }

  return str;
};
//# sourceMappingURL=strval.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/unserialize.js":
/*!*****************************************************!*\
  !*** ./node_modules/locutus/php/var/unserialize.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function initCache() {
  var store = [];
  // cache only first element, second is length to jump ahead for the parser
  var cache = function cache(value) {
    store.push(value[0]);
    return value;
  };

  cache.get = function (index) {
    if (index >= store.length) {
      throw RangeError('Can\'t resolve reference ' + (index + 1));
    }

    return store[index];
  };

  return cache;
}

function expectType(str, cache) {
  var types = /^(?:N(?=;)|[bidsSaOCrR](?=:)|[^:]+(?=:))/g;
  var type = (types.exec(str) || [])[0];

  if (!type) {
    throw SyntaxError('Invalid input: ' + str);
  }

  switch (type) {
    case 'N':
      return cache([null, 2]);
    case 'b':
      return cache(expectBool(str));
    case 'i':
      return cache(expectInt(str));
    case 'd':
      return cache(expectFloat(str));
    case 's':
      return cache(expectString(str));
    case 'S':
      return cache(expectEscapedString(str));
    case 'a':
      return expectArray(str, cache);
    case 'O':
      return expectObject(str, cache);
    case 'C':
      return expectClass(str, cache);
    case 'r':
    case 'R':
      return expectReference(str, cache);
    default:
      throw SyntaxError('Invalid or unsupported data type: ' + type);
  }
}

function expectBool(str) {
  var reBool = /^b:([01]);/;

  var _ref = reBool.exec(str) || [],
      _ref2 = _slicedToArray(_ref, 2),
      match = _ref2[0],
      boolMatch = _ref2[1];

  if (!boolMatch) {
    throw SyntaxError('Invalid bool value, expected 0 or 1');
  }

  return [boolMatch === '1', match.length];
}

function expectInt(str) {
  var reInt = /^i:([+-]?\d+);/;

  var _ref3 = reInt.exec(str) || [],
      _ref4 = _slicedToArray(_ref3, 2),
      match = _ref4[0],
      intMatch = _ref4[1];

  if (!intMatch) {
    throw SyntaxError('Expected an integer value');
  }

  return [parseInt(intMatch, 10), match.length];
}

function expectFloat(str) {
  var reFloat = /^d:(NAN|-?INF|(?:\d+\.\d*|\d*\.\d+|\d+)(?:[eE][+-]\d+)?);/;

  var _ref5 = reFloat.exec(str) || [],
      _ref6 = _slicedToArray(_ref5, 2),
      match = _ref6[0],
      floatMatch = _ref6[1];

  if (!floatMatch) {
    throw SyntaxError('Expected a float value');
  }

  var floatValue = void 0;

  switch (floatMatch) {
    case 'NAN':
      floatValue = Number.NaN;
      break;
    case '-INF':
      floatValue = Number.NEGATIVE_INFINITY;
      break;
    case 'INF':
      floatValue = Number.POSITIVE_INFINITY;
      break;
    default:
      floatValue = parseFloat(floatMatch);
      break;
  }

  return [floatValue, match.length];
}

function readBytes(str, len) {
  var escapedString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var bytes = 0;
  var out = '';
  var c = 0;
  var strLen = str.length;
  var wasHighSurrogate = false;
  var escapedChars = 0;

  while (bytes < len && c < strLen) {
    var chr = str.charAt(c);
    var code = chr.charCodeAt(0);
    var isHighSurrogate = code >= 0xd800 && code <= 0xdbff;
    var isLowSurrogate = code >= 0xdc00 && code <= 0xdfff;

    if (escapedString && chr === '\\') {
      chr = String.fromCharCode(parseInt(str.substr(c + 1, 2), 16));
      escapedChars++;

      // each escaped sequence is 3 characters. Go 2 chars ahead.
      // third character will be jumped over a few lines later
      c += 2;
    }

    c++;

    bytes += isHighSurrogate || isLowSurrogate && wasHighSurrogate
    // if high surrogate, count 2 bytes, as expectation is to be followed by low surrogate
    // if low surrogate preceded by high surrogate, add 2 bytes
    ? 2 : code > 0x7ff
    // otherwise low surrogate falls into this part
    ? 3 : code > 0x7f ? 2 : 1;

    // if high surrogate is not followed by low surrogate, add 1 more byte
    bytes += wasHighSurrogate && !isLowSurrogate ? 1 : 0;

    out += chr;
    wasHighSurrogate = isHighSurrogate;
  }

  return [out, bytes, escapedChars];
}

function expectString(str) {
  // PHP strings consist of one-byte characters.
  // JS uses 2 bytes with possible surrogate pairs.
  // Serialized length of 2 is still 1 JS string character
  var reStrLength = /^s:(\d+):"/g; // also match the opening " char

  var _ref7 = reStrLength.exec(str) || [],
      _ref8 = _slicedToArray(_ref7, 2),
      match = _ref8[0],
      byteLenMatch = _ref8[1];

  if (!match) {
    throw SyntaxError('Expected a string value');
  }

  var len = parseInt(byteLenMatch, 10);

  str = str.substr(match.length);

  var _readBytes = readBytes(str, len),
      _readBytes2 = _slicedToArray(_readBytes, 2),
      strMatch = _readBytes2[0],
      bytes = _readBytes2[1];

  if (bytes !== len) {
    throw SyntaxError('Expected string of ' + len + ' bytes, but got ' + bytes);
  }

  str = str.substr(strMatch.length);

  // strict parsing, match closing "; chars
  if (!str.startsWith('";')) {
    throw SyntaxError('Expected ";');
  }

  return [strMatch, match.length + strMatch.length + 2]; // skip last ";
}

function expectEscapedString(str) {
  var reStrLength = /^S:(\d+):"/g; // also match the opening " char

  var _ref9 = reStrLength.exec(str) || [],
      _ref10 = _slicedToArray(_ref9, 2),
      match = _ref10[0],
      strLenMatch = _ref10[1];

  if (!match) {
    throw SyntaxError('Expected an escaped string value');
  }

  var len = parseInt(strLenMatch, 10);

  str = str.substr(match.length);

  var _readBytes3 = readBytes(str, len, true),
      _readBytes4 = _slicedToArray(_readBytes3, 3),
      strMatch = _readBytes4[0],
      bytes = _readBytes4[1],
      escapedChars = _readBytes4[2];

  if (bytes !== len) {
    throw SyntaxError('Expected escaped string of ' + len + ' bytes, but got ' + bytes);
  }

  str = str.substr(strMatch.length + escapedChars * 2);

  // strict parsing, match closing "; chars
  if (!str.startsWith('";')) {
    throw SyntaxError('Expected ";');
  }

  return [strMatch, match.length + strMatch.length + 2]; // skip last ";
}

function expectKeyOrIndex(str) {
  try {
    return expectString(str);
  } catch (err) {}

  try {
    return expectEscapedString(str);
  } catch (err) {}

  try {
    return expectInt(str);
  } catch (err) {
    throw SyntaxError('Expected key or index');
  }
}

function expectObject(str, cache) {
  // O:<class name length>:"class name":<prop count>:{<props and values>}
  // O:8:"stdClass":2:{s:3:"foo";s:3:"bar";s:3:"bar";s:3:"baz";}
  var reObjectLiteral = /^O:(\d+):"([^"]+)":(\d+):\{/;

  var _ref11 = reObjectLiteral.exec(str) || [],
      _ref12 = _slicedToArray(_ref11, 4),
      objectLiteralBeginMatch = _ref12[0],
      /* classNameLengthMatch */className = _ref12[2],
      propCountMatch = _ref12[3];

  if (!objectLiteralBeginMatch) {
    throw SyntaxError('Invalid input');
  }

  if (className !== 'stdClass') {
    throw SyntaxError('Unsupported object type: ' + className);
  }

  var totalOffset = objectLiteralBeginMatch.length;

  var propCount = parseInt(propCountMatch, 10);
  var obj = {};
  cache([obj]);

  str = str.substr(totalOffset);

  for (var i = 0; i < propCount; i++) {
    var prop = expectKeyOrIndex(str);
    str = str.substr(prop[1]);
    totalOffset += prop[1];

    var value = expectType(str, cache);
    str = str.substr(value[1]);
    totalOffset += value[1];

    obj[prop[0]] = value[0];
  }

  // strict parsing, expect } after object literal
  if (str.charAt(0) !== '}') {
    throw SyntaxError('Expected }');
  }

  return [obj, totalOffset + 1]; // skip final }
}

function expectClass(str, cache) {
  // can't be well supported, because requires calling eval (or similar)
  // in order to call serialized constructor name
  // which is unsafe
  // or assume that constructor is defined in global scope
  // but this is too much limiting
  throw Error('Not yet implemented');
}

function expectReference(str, cache) {
  var reRef = /^[rR]:([1-9]\d*);/;

  var _ref13 = reRef.exec(str) || [],
      _ref14 = _slicedToArray(_ref13, 2),
      match = _ref14[0],
      refIndex = _ref14[1];

  if (!match) {
    throw SyntaxError('Expected reference value');
  }

  return [cache.get(parseInt(refIndex, 10) - 1), match.length];
}

function expectArray(str, cache) {
  var reArrayLength = /^a:(\d+):{/;

  var _ref15 = reArrayLength.exec(str) || [],
      _ref16 = _slicedToArray(_ref15, 2),
      arrayLiteralBeginMatch = _ref16[0],
      arrayLengthMatch = _ref16[1];

  if (!arrayLengthMatch) {
    throw SyntaxError('Expected array length annotation');
  }

  str = str.substr(arrayLiteralBeginMatch.length);

  var array = expectArrayItems(str, parseInt(arrayLengthMatch, 10), cache);

  // strict parsing, expect closing } brace after array literal
  if (str.charAt(array[1]) !== '}') {
    throw SyntaxError('Expected }');
  }

  return [array[0], arrayLiteralBeginMatch.length + array[1] + 1]; // jump over }
}

function expectArrayItems(str) {
  var expectedItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var cache = arguments[2];

  var key = void 0;
  var hasStringKeys = false;
  var item = void 0;
  var totalOffset = 0;
  var items = [];
  cache([items]);

  for (var i = 0; i < expectedItems; i++) {
    key = expectKeyOrIndex(str);

    // this is for backward compatibility with previous implementation
    if (!hasStringKeys) {
      hasStringKeys = typeof key[0] === 'string';
    }

    str = str.substr(key[1]);
    totalOffset += key[1];

    // references are resolved immediately, so if duplicate key overwrites previous array index
    // the old value is anyway resolved
    // fixme: but next time the same reference should point to the new value
    item = expectType(str, cache);
    str = str.substr(item[1]);
    totalOffset += item[1];

    items[key[0]] = item[0];
  }

  // this is for backward compatibility with previous implementation
  if (hasStringKeys) {
    items = Object.assign({}, items);
  }

  return [items, totalOffset];
}

module.exports = function unserialize(str) {
  //       discuss at: https://locutus.io/php/unserialize/
  //      original by: Arpad Ray (mailto:arpad@php.net)
  //      improved by: Pedro Tainha (https://www.pedrotainha.com)
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  //      improved by: Chris
  //      improved by: James
  //      improved by: Le Torbi
  //      improved by: Eli Skeggs
  //      bugfixed by: dptr1988
  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //      bugfixed by: Brett Zamir (https://brett-zamir.me)
  //      bugfixed by: philippsimon (https://github.com/philippsimon/)
  //       revised by: d3x
  //         input by: Brett Zamir (https://brett-zamir.me)
  //         input by: Martin (https://www.erlenwiese.de/)
  //         input by: kilops
  //         input by: Jaroslaw Czarniak
  //         input by: lovasoa (https://github.com/lovasoa/)
  //      improved by: Rafał Kukawski
  // reimplemented by: Rafał Kukawski
  //           note 1: We feel the main purpose of this function should be
  //           note 1: to ease the transport of data between php & js
  //           note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
  //        example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
  //        returns 1: ['Kevin', 'van', 'Zonneveld']
  //        example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
  //        returns 2: {firstName: 'Kevin', midName: 'van'}
  //        example 3: unserialize('a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}')
  //        returns 3: {'ü': 'ü', '四': '四', '𠜎': '𠜎'}
  //        example 4: unserialize(undefined)
  //        returns 4: false
  //        example 5: unserialize('O:8:"stdClass":1:{s:3:"foo";b:1;}')
  //        returns 5: { foo: true }
  //        example 6: unserialize('a:2:{i:0;N;i:1;s:0:"";}')
  //        returns 6: [null, ""]
  //        example 7: unserialize('S:7:"\\65\\73\\63\\61\\70\\65\\64";')
  //        returns 7: 'escaped'

  try {
    if (typeof str !== 'string') {
      return false;
    }

    return expectType(str, initCache())[0];
  } catch (err) {
    console.error(err);
    return false;
  }
};
//# sourceMappingURL=unserialize.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/var_dump.js":
/*!**************************************************!*\
  !*** ./node_modules/locutus/php/var/var_dump.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function var_dump() {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/var_dump/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Zahlii
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: For returning a string, use var_export() with the second argument set to true
  //        test: skip-all
  //   example 1: var_dump(1)
  //   returns 1: 'int(1)'

  var echo = __webpack_require__(/*! ../strings/echo */ "./node_modules/locutus/php/strings/echo.js");
  var output = '';
  var padChar = ' ';
  var padVal = 4;
  var lgth = 0;
  var i = 0;

  var _getFuncName = function _getFuncName(fn) {
    var name = /\W*function\s+([\w$]+)\s*\(/.exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  var _repeatChar = function _repeatChar(len, padChar) {
    var str = '';
    for (var _i = 0; _i < len; _i++) {
      str += padChar;
    }
    return str;
  };
  var _getInnerVal = function _getInnerVal(val, thickPad) {
    var ret = '';
    if (val === null) {
      ret = 'NULL';
    } else if (typeof val === 'boolean') {
      ret = 'bool(' + val + ')';
    } else if (typeof val === 'string') {
      ret = 'string(' + val.length + ') "' + val + '"';
    } else if (typeof val === 'number') {
      if (parseFloat(val) === parseInt(val, 10)) {
        ret = 'int(' + val + ')';
      } else {
        ret = 'float(' + val + ')';
      }
    } else if (typeof val === 'undefined') {
      // The remaining are not PHP behavior because these values
      // only exist in this exact form in JavaScript
      ret = 'undefined';
    } else if (typeof val === 'function') {
      var funcLines = val.toString().split('\n');
      ret = '';
      for (var _i2 = 0, fll = funcLines.length; _i2 < fll; _i2++) {
        ret += (_i2 !== 0 ? '\n' + thickPad : '') + funcLines[_i2];
      }
    } else if (val instanceof Date) {
      ret = 'Date(' + val + ')';
    } else if (val instanceof RegExp) {
      ret = 'RegExp(' + val + ')';
    } else if (val.nodeName) {
      // Different than PHP's DOMElement
      switch (val.nodeType) {
        case 1:
          if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'https://www.w3.org/1999/xhtml') {
            // Undefined namespace could be plain XML, but namespaceURI not widely supported
            ret = 'HTMLElement("' + val.nodeName + '")';
          } else {
            ret = 'XML Element("' + val.nodeName + '")';
          }
          break;
        case 2:
          ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
          break;
        case 3:
          ret = 'TEXT_NODE(' + val.nodeValue + ')';
          break;
        case 4:
          ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
          break;
        case 5:
          ret = 'ENTITY_REFERENCE_NODE';
          break;
        case 6:
          ret = 'ENTITY_NODE';
          break;
        case 7:
          ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
          break;
        case 8:
          ret = 'COMMENT_NODE(' + val.nodeValue + ')';
          break;
        case 9:
          ret = 'DOCUMENT_NODE';
          break;
        case 10:
          ret = 'DOCUMENT_TYPE_NODE';
          break;
        case 11:
          ret = 'DOCUMENT_FRAGMENT_NODE';
          break;
        case 12:
          ret = 'NOTATION_NODE';
          break;
      }
    }
    return ret;
  };

  var _formatArray = function _formatArray(obj, curDepth, padVal, padChar) {
    if (curDepth > 0) {
      curDepth++;
    }

    var basePad = _repeatChar(padVal * (curDepth - 1), padChar);
    var thickPad = _repeatChar(padVal * (curDepth + 1), padChar);
    var str = '';
    var val = '';

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
      if (obj.constructor && _getFuncName(obj.constructor) === 'LOCUTUS_Resource') {
        return obj.var_dump();
      }
      lgth = 0;
      for (var someProp in obj) {
        if (obj.hasOwnProperty(someProp)) {
          lgth++;
        }
      }
      str += 'array(' + lgth + ') {\n';
      for (var key in obj) {
        var objVal = obj[key];
        if ((typeof objVal === 'undefined' ? 'undefined' : _typeof(objVal)) === 'object' && objVal !== null && !(objVal instanceof Date) && !(objVal instanceof RegExp) && !objVal.nodeName) {
          str += thickPad;
          str += '[';
          str += key;
          str += '] =>\n';
          str += thickPad;
          str += _formatArray(objVal, curDepth + 1, padVal, padChar);
        } else {
          val = _getInnerVal(objVal, thickPad);
          str += thickPad;
          str += '[';
          str += key;
          str += '] =>\n';
          str += thickPad;
          str += val;
          str += '\n';
        }
      }
      str += basePad + '}\n';
    } else {
      str = _getInnerVal(obj, thickPad);
    }
    return str;
  };

  output = _formatArray(arguments[0], 0, padVal, padChar);
  for (i = 1; i < arguments.length; i++) {
    output += '\n' + _formatArray(arguments[i], 0, padVal, padChar);
  }

  echo(output);

  // Not how PHP does it, but helps us test:
  return output;
};
//# sourceMappingURL=var_dump.js.map

/***/ }),

/***/ "./node_modules/locutus/php/var/var_export.js":
/*!****************************************************!*\
  !*** ./node_modules/locutus/php/var/var_export.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function var_export(mixedExpression, boolReturn) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/var_export/
  // original by: Philip Peterson
  // improved by: johnrembo
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: Brian Tafoya (https://www.premasolutions.com/)
  //    input by: Hans Henrik (https://hanshenrik.tk/)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: simivar (https://github.com/simivar)
  // bugfixed by: simivar (https://github.com/simivar)
  // bugfixed by: simivar (https://github.com/simivar)
  //   example 1: var_export(null)
  //   returns 1: null
  //   example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true)
  //   returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld',\n)"
  //   example 3: var data = 'Kevin'
  //   example 3: var_export(data, true)
  //   returns 3: "'Kevin'"
  //   example 4: var_export({0: 'Kevin', 1: 'van', 'lastName': 'Zonneveld'}, true)
  //   returns 4: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  'lastName' => 'Zonneveld',\n)"
  //   example 5: var_export([], true)
  //   returns 5: "array (\n)"
  //   example 6: var_export({ test: [ 'a', 'b' ] }, true)
  //   returns 6: "array (\n  'test' =>\n  array (\n    0 => 'a',\n    1 => 'b',\n  ),\n)"

  var echo = __webpack_require__(/*! ../strings/echo */ "./node_modules/locutus/php/strings/echo.js");
  var retstr = '';
  var iret = '';
  var value = void 0;
  var cnt = 0;
  var x = [];
  var i = 0;
  var funcParts = [];
  // We use the last argument (not part of PHP) to pass in
  // our indentation level
  var idtLevel = arguments[2] || 2;
  var innerIndent = '';
  var outerIndent = '';
  var getFuncName = function getFuncName(fn) {
    var name = /\W*function\s+([\w$]+)\s*\(/.exec(fn);
    if (!name) {
      return '(Anonymous)';
    }
    return name[1];
  };

  var _isNormalInteger = function _isNormalInteger(string) {
    var number = Math.floor(Number(string));
    return number !== Infinity && String(number) === string && number >= 0;
  };

  var _makeIndent = function _makeIndent(idtLevel) {
    return new Array(idtLevel + 1).join(' ');
  };
  var __getType = function __getType(inp) {
    var i = 0;
    var match = void 0;
    var types = void 0;
    var cons = void 0;
    var type = typeof inp === 'undefined' ? 'undefined' : _typeof(inp);
    if (type === 'object' && inp && inp.constructor && getFuncName(inp.constructor) === 'LOCUTUS_Resource') {
      return 'resource';
    }
    if (type === 'function') {
      return 'function';
    }
    if (type === 'object' && !inp) {
      // Should this be just null?
      return 'null';
    }
    if (type === 'object') {
      if (!inp.constructor) {
        return 'object';
      }
      cons = inp.constructor.toString();
      match = cons.match(/(\w+)\(/);
      if (match) {
        cons = match[1].toLowerCase();
      }
      types = ['boolean', 'number', 'string', 'array'];
      for (i = 0; i < types.length; i++) {
        if (cons === types[i]) {
          type = types[i];
          break;
        }
      }
    }
    return type;
  };
  var type = __getType(mixedExpression);

  if (type === null) {
    retstr = 'NULL';
  } else if (type === 'array' || type === 'object') {
    outerIndent = _makeIndent(idtLevel - 2);
    innerIndent = _makeIndent(idtLevel);
    for (i in mixedExpression) {
      value = ' ';
      var subtype = __getType(mixedExpression[i]);
      if (subtype === 'array' || subtype === 'object') {
        value = '\n';
      }
      value += var_export(mixedExpression[i], 1, idtLevel + 2);
      i = _isNormalInteger(i) ? i : '\'' + i + '\'';
      x[cnt++] = innerIndent + i + ' =>' + value;
    }
    if (x.length > 0) {
      iret = x.join(',\n') + ',\n';
    }
    retstr = outerIndent + 'array (\n' + iret + outerIndent + ')';
  } else if (type === 'function') {
    funcParts = mixedExpression.toString().match(/function .*?\((.*?)\) \{([\s\S]*)\}/);

    // For lambda functions, var_export() outputs such as the following:
    // '\000lambda_1'. Since it will probably not be a common use to
    // expect this (unhelpful) form, we'll use another PHP-exportable
    // construct, create_function() (though dollar signs must be on the
    // variables in JavaScript); if using instead in JavaScript and you
    // are using the namespaced version, note that create_function() will
    // not be available as a global
    retstr = "create_function ('" + funcParts[1] + "', '" + funcParts[2].replace(new RegExp("'", 'g'), "\\'") + "')";
  } else if (type === 'resource') {
    // Resources treated as null for var_export
    retstr = 'NULL';
  } else {
    retstr = typeof mixedExpression !== 'string' ? mixedExpression : "'" + mixedExpression.replace(/(["'])/g, '\\$1').replace(/\0/g, '\\0') + "'";
  }

  if (!boolReturn) {
    echo(retstr);
    return null;
  }

  return retstr;
};
//# sourceMappingURL=var_export.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvaW5mby9pbmlfZ2V0LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9zdHJpbmdzL2VjaG8uanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9ib29sdmFsLmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvZG91YmxldmFsLmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvZW1wdHkuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9mbG9hdHZhbC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2dldHR5cGUuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9pbmRleC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2ludHZhbC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2lzX2FycmF5LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvaXNfYmluYXJ5LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvaXNfYm9vbC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2lzX2J1ZmZlci5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2lzX2NhbGxhYmxlLmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvaXNfZG91YmxlLmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvaXNfZmxvYXQuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9pc19pbnQuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9pc19pbnRlZ2VyLmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvaXNfbG9uZy5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2lzX251bGwuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9pc19udW1lcmljLmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvaXNfb2JqZWN0LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvaXNfcmVhbC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2lzX3NjYWxhci5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2lzX3N0cmluZy5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2lzX3VuaWNvZGUuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9pc3NldC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL3ByaW50X3IuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9zZXJpYWxpemUuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci9zdHJ2YWwuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL3Zhci91bnNlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL3Zhcl9kdW1wLmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC92YXIvdmFyX2V4cG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUM7Ozs7Ozs7Ozs7Ozs7QUMxQmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0M7Ozs7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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDBFQUEwRSxXQUFXOztBQUVyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQyIsImZpbGUiOiIuL2Fzc2V0cy9kaXN0L3ZlbmRvcnN+Y2FzaGllcn5jdXN0b21lcn5ob21lfm9yZGVyfnBheS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmlfZ2V0KHZhcm5hbWUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvaW5pX2dldC9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogVGhlIGluaSB2YWx1ZXMgbXVzdCBiZSBzZXQgYnkgaW5pX3NldCBvciBtYW51YWxseSB3aXRoaW4gYW4gaW5pIGZpbGVcbiAgLy8gICBleGFtcGxlIDE6IGluaV9zZXQoJ2RhdGUudGltZXpvbmUnLCAnQXNpYS9Ib25nX0tvbmcnKVxuICAvLyAgIGV4YW1wbGUgMTogaW5pX2dldCgnZGF0ZS50aW1lem9uZScpXG4gIC8vICAgcmV0dXJucyAxOiAnQXNpYS9Ib25nX0tvbmcnXG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcbiAgJGdsb2JhbC4kbG9jdXR1cyA9ICRnbG9iYWwuJGxvY3V0dXMgfHwge307XG4gIHZhciAkbG9jdXR1cyA9ICRnbG9iYWwuJGxvY3V0dXM7XG4gICRsb2N1dHVzLnBocCA9ICRsb2N1dHVzLnBocCB8fCB7fTtcbiAgJGxvY3V0dXMucGhwLmluaSA9ICRsb2N1dHVzLnBocC5pbmkgfHwge307XG5cbiAgaWYgKCRsb2N1dHVzLnBocC5pbmlbdmFybmFtZV0gJiYgJGxvY3V0dXMucGhwLmluaVt2YXJuYW1lXS5sb2NhbF92YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKCRsb2N1dHVzLnBocC5pbmlbdmFybmFtZV0ubG9jYWxfdmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuICRsb2N1dHVzLnBocC5pbmlbdmFybmFtZV0ubG9jYWxfdmFsdWU7XG4gIH1cblxuICByZXR1cm4gJyc7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5pX2dldC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZWNobygpIHtcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvZWNoby9cbiAgLy8gb3JpZ2luYWwgYnk6IFBoaWxpcCBQZXRlcnNvblxuICAvLyBpbXByb3ZlZCBieTogZWNobyBpcyBiYWRcbiAgLy8gaW1wcm92ZWQgYnk6IE5hdGVcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHBzOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gIHJldmlzZWQgYnk6IERlciBTaW1vbiAoaHR0cHM6Ly9pbm5lcmRvbS5zb3VyY2Vmb3JnZS5uZXQvKVxuICAvLyBidWdmaXhlZCBieTogRXVnZW5lIEJ1bGtpbiAoaHR0cHM6Ly9kb3VibGVhdy5jb20vKVxuICAvLyBidWdmaXhlZCBieTogQnJldHQgWmFtaXIgKGh0dHBzOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gYnVnZml4ZWQgYnk6IEVkb3JGYXVzXG4gIC8vICAgICAgbm90ZSAxOiBJbiAxLjMuMiBhbmQgZWFybGllciwgdGhpcyBmdW5jdGlvbiB3cm90ZSB0byB0aGUgYm9keSBvZiB0aGUgZG9jdW1lbnQgd2hlbiBpdFxuICAvLyAgICAgIG5vdGUgMTogd2FzIGNhbGxlZCBpbiB3ZWJicm93c2VycywgaW4gYWRkaXRpb24gdG8gc3VwcG9ydGluZyBYVUwuXG4gIC8vICAgICAgbm90ZSAxOiBUaGlzIGludm9sdmVkID4xMDAgbGluZXMgb2YgYm9pbGVycGxhdGUgdG8gZG8gdGhpcyBpbiBhIHNhZmUgd2F5LlxuICAvLyAgICAgIG5vdGUgMTogU2luY2UgSSBjYW4ndCBpbWFnZWluZSBhIGNvbXBsZWxsaW5nIHVzZS1jYXNlIGZvciB0aGlzLCBhbmQgWFVMIGlzIGRlcHJlY2F0ZWRcbiAgLy8gICAgICBub3RlIDE6IEkgaGF2ZSByZW1vdmVkIHRoaXMgYmVoYXZpb3IgaW4gZmF2b3Igb2YganVzdCBjYWxsaW5nIGBjb25zb2xlLmxvZ2BcbiAgLy8gICAgICBub3RlIDI6IFlvdSdsbCBzZWUgZnVuY3Rpb25zIGRlcGVuZHMgb24gYGVjaG9gIGluc3RlYWQgb2YgYGNvbnNvbGUubG9nYCBhcyB3ZSdsbCB3YW50XG4gIC8vICAgICAgbm90ZSAyOiB0byBoYXZlIDEgY29udGFjdCBwb2ludCB0byBpbnRlcmZhY2Ugd2l0aCB0aGUgb3V0c2lkZSB3b3JsZCwgc28gdGhhdCBpdCdzIGVhc3lcbiAgLy8gICAgICBub3RlIDI6IHRvIHN1cHBvcnQgb3RoZXIgd2F5cyBvZiBwcmludGluZyBvdXRwdXQuXG4gIC8vICByZXZpc2VkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwczovL2t2ei5pbylcbiAgLy8gICAgaW5wdXQgYnk6IEpCXG4gIC8vICAgZXhhbXBsZSAxOiBlY2hvKCdIZWxsbyB3b3JsZCcpXG4gIC8vICAgcmV0dXJucyAxOiB1bmRlZmluZWRcblxuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIHJldHVybiBjb25zb2xlLmxvZyhhcmdzLmpvaW4oJyAnKSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZWNoby5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYm9vbHZhbChtaXhlZFZhcikge1xuICAvLyBvcmlnaW5hbCBieTogV2lsbCBSb3dlXG4gIC8vICAgZXhhbXBsZSAxOiBib29sdmFsKHRydWUpXG4gIC8vICAgcmV0dXJucyAxOiB0cnVlXG4gIC8vICAgZXhhbXBsZSAyOiBib29sdmFsKGZhbHNlKVxuICAvLyAgIHJldHVybnMgMjogZmFsc2VcbiAgLy8gICBleGFtcGxlIDM6IGJvb2x2YWwoMClcbiAgLy8gICByZXR1cm5zIDM6IGZhbHNlXG4gIC8vICAgZXhhbXBsZSA0OiBib29sdmFsKDAuMClcbiAgLy8gICByZXR1cm5zIDQ6IGZhbHNlXG4gIC8vICAgZXhhbXBsZSA1OiBib29sdmFsKCcnKVxuICAvLyAgIHJldHVybnMgNTogZmFsc2VcbiAgLy8gICBleGFtcGxlIDY6IGJvb2x2YWwoJzAnKVxuICAvLyAgIHJldHVybnMgNjogZmFsc2VcbiAgLy8gICBleGFtcGxlIDc6IGJvb2x2YWwoW10pXG4gIC8vICAgcmV0dXJucyA3OiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgODogYm9vbHZhbCgnJylcbiAgLy8gICByZXR1cm5zIDg6IGZhbHNlXG4gIC8vICAgZXhhbXBsZSA5OiBib29sdmFsKG51bGwpXG4gIC8vICAgcmV0dXJucyA5OiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgMTA6IGJvb2x2YWwodW5kZWZpbmVkKVxuICAvLyAgIHJldHVybnMgMTA6IGZhbHNlXG4gIC8vICAgZXhhbXBsZSAxMTogYm9vbHZhbCgndHJ1ZScpXG4gIC8vICAgcmV0dXJucyAxMTogdHJ1ZVxuXG4gIGlmIChtaXhlZFZhciA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAobWl4ZWRWYXIgPT09IDAgfHwgbWl4ZWRWYXIgPT09IDAuMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChtaXhlZFZhciA9PT0gJycgfHwgbWl4ZWRWYXIgPT09ICcwJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG1peGVkVmFyKSAmJiBtaXhlZFZhci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAobWl4ZWRWYXIgPT09IG51bGwgfHwgbWl4ZWRWYXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb2x2YWwuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRvdWJsZXZhbChtaXhlZFZhcikge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9kb3VibGV2YWwvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IDEuMCBpcyBzaW1wbGlmaWVkIHRvIDEgYmVmb3JlIGl0IGNhbiBiZSBhY2Nlc3NlZCBieSB0aGUgZnVuY3Rpb24sIHRoaXMgbWFrZXNcbiAgLy8gICAgICBub3RlIDE6IGl0IGRpZmZlcmVudCBmcm9tIHRoZSBQSFAgaW1wbGVtZW50YXRpb24uIFdlIGNhbid0IGZpeCB0aGlzIHVuZm9ydHVuYXRlbHkuXG4gIC8vICAgZXhhbXBsZSAxOiBkb3VibGV2YWwoMTg2KVxuICAvLyAgIHJldHVybnMgMTogMTg2LjAwXG5cbiAgdmFyIGZsb2F0dmFsID0gcmVxdWlyZSgnLi4vdmFyL2Zsb2F0dmFsJyk7XG5cbiAgcmV0dXJuIGZsb2F0dmFsKG1peGVkVmFyKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb3VibGV2YWwuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW1wdHkobWl4ZWRWYXIpIHtcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvZW1wdHkvXG4gIC8vIG9yaWdpbmFsIGJ5OiBQaGlsaXBwZSBCYXVtYW5uXG4gIC8vICAgIGlucHV0IGJ5OiBPbm5vIE1hcnNtYW4gKGh0dHBzOi8vdHdpdHRlci5jb20vb25ub21hcnNtYW4pXG4gIC8vICAgIGlucHV0IGJ5OiBMSFxuICAvLyAgICBpbnB1dCBieTogU3RveWFuIEt5b3NldiAoaHR0cHM6Ly93d3cuc3Zlc3Qub3JnLylcbiAgLy8gYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHBzOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogT25ubyBNYXJzbWFuIChodHRwczovL3R3aXR0ZXIuY29tL29ubm9tYXJzbWFuKVxuICAvLyBpbXByb3ZlZCBieTogRnJhbmNlc2NvXG4gIC8vIGltcHJvdmVkIGJ5OiBNYXJjIEphbnNlblxuICAvLyBpbXByb3ZlZCBieTogUmFmYcWCIEt1a2F3c2tpIChodHRwczovL2Jsb2cua3VrYXdza2kucGwpXG4gIC8vICAgZXhhbXBsZSAxOiBlbXB0eShudWxsKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMjogZW1wdHkodW5kZWZpbmVkKVxuICAvLyAgIHJldHVybnMgMjogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMzogZW1wdHkoW10pXG4gIC8vICAgcmV0dXJucyAzOiB0cnVlXG4gIC8vICAgZXhhbXBsZSA0OiBlbXB0eSh7fSlcbiAgLy8gICByZXR1cm5zIDQ6IHRydWVcbiAgLy8gICBleGFtcGxlIDU6IGVtcHR5KHsnYUZ1bmMnIDogZnVuY3Rpb24gKCkgeyBhbGVydCgnaHVtcHR5Jyk7IH0gfSlcbiAgLy8gICByZXR1cm5zIDU6IGZhbHNlXG5cbiAgdmFyIHVuZGVmID0gdm9pZCAwO1xuICB2YXIga2V5ID0gdm9pZCAwO1xuICB2YXIgaSA9IHZvaWQgMDtcbiAgdmFyIGxlbiA9IHZvaWQgMDtcbiAgdmFyIGVtcHR5VmFsdWVzID0gW3VuZGVmLCBudWxsLCBmYWxzZSwgMCwgJycsICcwJ107XG5cbiAgZm9yIChpID0gMCwgbGVuID0gZW1wdHlWYWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAobWl4ZWRWYXIgPT09IGVtcHR5VmFsdWVzW2ldKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoKHR5cGVvZiBtaXhlZFZhciA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobWl4ZWRWYXIpKSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKGtleSBpbiBtaXhlZFZhcikge1xuICAgICAgaWYgKG1peGVkVmFyLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmbG9hdHZhbChtaXhlZFZhcikge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9mbG9hdHZhbC9cbiAgLy8gb3JpZ2luYWwgYnk6IE1pY2hhZWwgV2hpdGUgKGh0dHBzOi8vZ2V0c3ByaW5rLmNvbSlcbiAgLy8gICAgICBub3RlIDE6IFRoZSBuYXRpdmUgcGFyc2VGbG9hdCgpIG1ldGhvZCBvZiBKYXZhU2NyaXB0IHJldHVybnMgTmFOXG4gIC8vICAgICAgbm90ZSAxOiB3aGVuIGl0IGVuY291bnRlcnMgYSBzdHJpbmcgYmVmb3JlIGFuIGludCBvciBmbG9hdCB2YWx1ZS5cbiAgLy8gICBleGFtcGxlIDE6IGZsb2F0dmFsKCcxNTAuMDNfcGFnZS1zZWN0aW9uJylcbiAgLy8gICByZXR1cm5zIDE6IDE1MC4wM1xuICAvLyAgIGV4YW1wbGUgMjogZmxvYXR2YWwoJ3BhZ2U6IDMnKVxuICAvLyAgIGV4YW1wbGUgMjogZmxvYXR2YWwoJy01MCArIDgnKVxuICAvLyAgIHJldHVybnMgMjogMFxuICAvLyAgIHJldHVybnMgMjogLTUwXG5cbiAgcmV0dXJuIHBhcnNlRmxvYXQobWl4ZWRWYXIpIHx8IDA7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmxvYXR2YWwuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0dHlwZShtaXhlZFZhcikge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9nZXR0eXBlL1xuICAvLyBvcmlnaW5hbCBieTogUGF1bG8gRnJlaXRhc1xuICAvLyBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8pXG4gIC8vIGltcHJvdmVkIGJ5OiBEb3VnbGFzIENyb2NrZm9yZCAoaHR0cHM6Ly9qYXZhc2NyaXB0LmNyb2NrZm9yZC5jb20pXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgaW5wdXQgYnk6IEtFTEFOXG4gIC8vICAgICAgbm90ZSAxOiAxLjAgaXMgc2ltcGxpZmllZCB0byAxIGJlZm9yZSBpdCBjYW4gYmUgYWNjZXNzZWQgYnkgdGhlIGZ1bmN0aW9uLCB0aGlzIG1ha2VzXG4gIC8vICAgICAgbm90ZSAxOiBpdCBkaWZmZXJlbnQgZnJvbSB0aGUgUEhQIGltcGxlbWVudGF0aW9uLiBXZSBjYW4ndCBmaXggdGhpcyB1bmZvcnR1bmF0ZWx5LlxuICAvLyAgIGV4YW1wbGUgMTogZ2V0dHlwZSgxKVxuICAvLyAgIHJldHVybnMgMTogJ2ludGVnZXInXG4gIC8vICAgZXhhbXBsZSAyOiBnZXR0eXBlKHVuZGVmaW5lZClcbiAgLy8gICByZXR1cm5zIDI6ICd1bmRlZmluZWQnXG4gIC8vICAgZXhhbXBsZSAzOiBnZXR0eXBlKHswOiAnS2V2aW4gdmFuIFpvbm5ldmVsZCd9KVxuICAvLyAgIHJldHVybnMgMzogJ29iamVjdCdcbiAgLy8gICBleGFtcGxlIDQ6IGdldHR5cGUoJ2ZvbycpXG4gIC8vICAgcmV0dXJucyA0OiAnc3RyaW5nJ1xuICAvLyAgIGV4YW1wbGUgNTogZ2V0dHlwZSh7MDogZnVuY3Rpb24gKCkge3JldHVybiBmYWxzZTt9fSlcbiAgLy8gICByZXR1cm5zIDU6ICdvYmplY3QnXG4gIC8vICAgZXhhbXBsZSA2OiBnZXR0eXBlKHswOiAndGVzdCcsIGxlbmd0aDogMSwgc3BsaWNlOiBmdW5jdGlvbiAoKSB7fX0pXG4gIC8vICAgcmV0dXJucyA2OiAnb2JqZWN0J1xuICAvLyAgIGV4YW1wbGUgNzogZ2V0dHlwZShbJ3Rlc3QnXSlcbiAgLy8gICByZXR1cm5zIDc6ICdhcnJheSdcblxuICB2YXIgaXNGbG9hdCA9IHJlcXVpcmUoJy4uL3Zhci9pc19mbG9hdCcpO1xuXG4gIHZhciBzID0gdHlwZW9mIG1peGVkVmFyID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihtaXhlZFZhcik7XG4gIHZhciBuYW1lID0gdm9pZCAwO1xuICB2YXIgX2dldEZ1bmNOYW1lID0gZnVuY3Rpb24gX2dldEZ1bmNOYW1lKGZuKSB7XG4gICAgdmFyIG5hbWUgPSAvXFxXKmZ1bmN0aW9uXFxzKyhbXFx3JF0rKVxccypcXCgvLmV4ZWMoZm4pO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICcoQW5vbnltb3VzKSc7XG4gICAgfVxuICAgIHJldHVybiBuYW1lWzFdO1xuICB9O1xuXG4gIGlmIChzID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChtaXhlZFZhciAhPT0gbnVsbCkge1xuICAgICAgLy8gRnJvbTogaHR0cHM6Ly9qYXZhc2NyaXB0LmNyb2NrZm9yZC5jb20vcmVtZWRpYWwuaHRtbFxuICAgICAgLy8gQHRvZG86IEJyZWFrIHVwIHRoaXMgbGVuZ3RoeSBpZiBzdGF0ZW1lbnRcbiAgICAgIGlmICh0eXBlb2YgbWl4ZWRWYXIubGVuZ3RoID09PSAnbnVtYmVyJyAmJiAhbWl4ZWRWYXIucHJvcGVydHlJc0VudW1lcmFibGUoJ2xlbmd0aCcpICYmIHR5cGVvZiBtaXhlZFZhci5zcGxpY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcyA9ICdhcnJheSc7XG4gICAgICB9IGVsc2UgaWYgKG1peGVkVmFyLmNvbnN0cnVjdG9yICYmIF9nZXRGdW5jTmFtZShtaXhlZFZhci5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgbmFtZSA9IF9nZXRGdW5jTmFtZShtaXhlZFZhci5jb25zdHJ1Y3Rvcik7XG4gICAgICAgIGlmIChuYW1lID09PSAnRGF0ZScpIHtcbiAgICAgICAgICAvLyBub3QgaW4gUEhQXG4gICAgICAgICAgcyA9ICdkYXRlJztcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAnUmVnRXhwJykge1xuICAgICAgICAgIC8vIG5vdCBpbiBQSFBcbiAgICAgICAgICBzID0gJ3JlZ2V4cCc7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ0xPQ1VUVVNfUmVzb3VyY2UnKSB7XG4gICAgICAgICAgLy8gQ2hlY2sgYWdhaW5zdCBvdXIgb3duIHJlc291cmNlIGNvbnN0cnVjdG9yXG4gICAgICAgICAgcyA9ICdyZXNvdXJjZSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcyA9ICdudWxsJztcbiAgICB9XG4gIH0gZWxzZSBpZiAocyA9PT0gJ251bWJlcicpIHtcbiAgICBzID0gaXNGbG9hdChtaXhlZFZhcikgPyAnZG91YmxlJyA6ICdpbnRlZ2VyJztcbiAgfVxuXG4gIHJldHVybiBzO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldHR5cGUuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cy5ib29sdmFsID0gcmVxdWlyZSgnLi9ib29sdmFsJyk7XG5tb2R1bGUuZXhwb3J0cy5kb3VibGV2YWwgPSByZXF1aXJlKCcuL2RvdWJsZXZhbCcpO1xubW9kdWxlLmV4cG9ydHMuZW1wdHkgPSByZXF1aXJlKCcuL2VtcHR5Jyk7XG5tb2R1bGUuZXhwb3J0cy5mbG9hdHZhbCA9IHJlcXVpcmUoJy4vZmxvYXR2YWwnKTtcbm1vZHVsZS5leHBvcnRzLmdldHR5cGUgPSByZXF1aXJlKCcuL2dldHR5cGUnKTtcbm1vZHVsZS5leHBvcnRzLmludHZhbCA9IHJlcXVpcmUoJy4vaW50dmFsJyk7XG5tb2R1bGUuZXhwb3J0cy5pc19hcnJheSA9IHJlcXVpcmUoJy4vaXNfYXJyYXknKTtcbm1vZHVsZS5leHBvcnRzLmlzX2JpbmFyeSA9IHJlcXVpcmUoJy4vaXNfYmluYXJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy5pc19ib29sID0gcmVxdWlyZSgnLi9pc19ib29sJyk7XG5tb2R1bGUuZXhwb3J0cy5pc19idWZmZXIgPSByZXF1aXJlKCcuL2lzX2J1ZmZlcicpO1xubW9kdWxlLmV4cG9ydHMuaXNfY2FsbGFibGUgPSByZXF1aXJlKCcuL2lzX2NhbGxhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cy5pc19kb3VibGUgPSByZXF1aXJlKCcuL2lzX2RvdWJsZScpO1xubW9kdWxlLmV4cG9ydHMuaXNfZmxvYXQgPSByZXF1aXJlKCcuL2lzX2Zsb2F0Jyk7XG5tb2R1bGUuZXhwb3J0cy5pc19pbnQgPSByZXF1aXJlKCcuL2lzX2ludCcpO1xubW9kdWxlLmV4cG9ydHMuaXNfaW50ZWdlciA9IHJlcXVpcmUoJy4vaXNfaW50ZWdlcicpO1xubW9kdWxlLmV4cG9ydHMuaXNfbG9uZyA9IHJlcXVpcmUoJy4vaXNfbG9uZycpO1xubW9kdWxlLmV4cG9ydHMuaXNfbnVsbCA9IHJlcXVpcmUoJy4vaXNfbnVsbCcpO1xubW9kdWxlLmV4cG9ydHMuaXNfbnVtZXJpYyA9IHJlcXVpcmUoJy4vaXNfbnVtZXJpYycpO1xubW9kdWxlLmV4cG9ydHMuaXNfb2JqZWN0ID0gcmVxdWlyZSgnLi9pc19vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzLmlzX3JlYWwgPSByZXF1aXJlKCcuL2lzX3JlYWwnKTtcbm1vZHVsZS5leHBvcnRzLmlzX3NjYWxhciA9IHJlcXVpcmUoJy4vaXNfc2NhbGFyJyk7XG5tb2R1bGUuZXhwb3J0cy5pc19zdHJpbmcgPSByZXF1aXJlKCcuL2lzX3N0cmluZycpO1xubW9kdWxlLmV4cG9ydHMuaXNfdW5pY29kZSA9IHJlcXVpcmUoJy4vaXNfdW5pY29kZScpO1xubW9kdWxlLmV4cG9ydHMuaXNzZXQgPSByZXF1aXJlKCcuL2lzc2V0Jyk7XG5tb2R1bGUuZXhwb3J0cy5wcmludF9yID0gcmVxdWlyZSgnLi9wcmludF9yJyk7XG5tb2R1bGUuZXhwb3J0cy5zZXJpYWxpemUgPSByZXF1aXJlKCcuL3NlcmlhbGl6ZScpO1xubW9kdWxlLmV4cG9ydHMuc3RydmFsID0gcmVxdWlyZSgnLi9zdHJ2YWwnKTtcbm1vZHVsZS5leHBvcnRzLnVuc2VyaWFsaXplID0gcmVxdWlyZSgnLi91bnNlcmlhbGl6ZScpO1xubW9kdWxlLmV4cG9ydHMudmFyX2R1bXAgPSByZXF1aXJlKCcuL3Zhcl9kdW1wJyk7XG5tb2R1bGUuZXhwb3J0cy52YXJfZXhwb3J0ID0gcmVxdWlyZSgnLi92YXJfZXhwb3J0Jyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnR2YWwobWl4ZWRWYXIsIGJhc2UpIHtcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvaW50dmFsL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8pXG4gIC8vIGltcHJvdmVkIGJ5OiBzdGVuc2lcbiAgLy8gYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHBzOi8va3Z6LmlvKVxuICAvLyBidWdmaXhlZCBieTogQnJldHQgWmFtaXIgKGh0dHBzOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBSYWZhxYIgS3VrYXdza2kgKGh0dHBzOi8vYmxvZy5rdWthd3NraS5wbClcbiAgLy8gICAgaW5wdXQgYnk6IE1hdHRlb1xuICAvLyAgIGV4YW1wbGUgMTogaW50dmFsKCdLZXZpbiB2YW4gWm9ubmV2ZWxkJylcbiAgLy8gICByZXR1cm5zIDE6IDBcbiAgLy8gICBleGFtcGxlIDI6IGludHZhbCg0LjIpXG4gIC8vICAgcmV0dXJucyAyOiA0XG4gIC8vICAgZXhhbXBsZSAzOiBpbnR2YWwoNDIsIDgpXG4gIC8vICAgcmV0dXJucyAzOiA0MlxuICAvLyAgIGV4YW1wbGUgNDogaW50dmFsKCcwOScpXG4gIC8vICAgcmV0dXJucyA0OiA5XG4gIC8vICAgZXhhbXBsZSA1OiBpbnR2YWwoJzFlJywgMTYpXG4gIC8vICAgcmV0dXJucyA1OiAzMFxuICAvLyAgIGV4YW1wbGUgNjogaW50dmFsKDB4MjAwMDAwMDAxKVxuICAvLyAgIHJldHVybnMgNjogODU4OTkzNDU5M1xuICAvLyAgIGV4YW1wbGUgNzogaW50dmFsKCcweGZmJywgMClcbiAgLy8gICByZXR1cm5zIDc6IDI1NVxuICAvLyAgIGV4YW1wbGUgODogaW50dmFsKCcwMTAnLCAwKVxuICAvLyAgIHJldHVybnMgODogOFxuXG4gIHZhciB0bXAgPSB2b2lkIDAsXG4gICAgICBtYXRjaCA9IHZvaWQgMDtcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBtaXhlZFZhciA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobWl4ZWRWYXIpO1xuXG4gIGlmICh0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gK21peGVkVmFyO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGJhc2UgPT09IDApIHtcbiAgICAgIG1hdGNoID0gbWl4ZWRWYXIubWF0Y2goL15cXHMqMCh4PykvaSk7XG4gICAgICBiYXNlID0gbWF0Y2ggPyBtYXRjaFsxXSA/IDE2IDogOCA6IDEwO1xuICAgIH1cbiAgICB0bXAgPSBwYXJzZUludChtaXhlZFZhciwgYmFzZSB8fCAxMCk7XG4gICAgcmV0dXJuIGlzTmFOKHRtcCkgfHwgIWlzRmluaXRlKHRtcCkgPyAwIDogdG1wO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKG1peGVkVmFyKSkge1xuICAgIHJldHVybiBtaXhlZFZhciA8IDAgPyBNYXRoLmNlaWwobWl4ZWRWYXIpIDogTWF0aC5mbG9vcihtaXhlZFZhcik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnR2YWwuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfYXJyYXkobWl4ZWRWYXIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvaXNfYXJyYXkvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwczovL2t2ei5pbylcbiAgLy8gaW1wcm92ZWQgYnk6IExlZ2FldiBBbmRyZXlcbiAgLy8gaW1wcm92ZWQgYnk6IE9ubm8gTWFyc21hbiAoaHR0cHM6Ly90d2l0dGVyLmNvbS9vbm5vbWFyc21hbilcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogTmF0aGFuIFNlcHVsdmVkYVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHBzOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBDb3JkXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBNYW5pc2hcbiAgLy8gYnVnZml4ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogSW4gTG9jdXR1cywgamF2YXNjcmlwdCBvYmplY3RzIGFyZSBsaWtlIHBocCBhc3NvY2lhdGl2ZSBhcnJheXMsXG4gIC8vICAgICAgbm90ZSAxOiB0aHVzIEphdmFTY3JpcHQgb2JqZWN0cyB3aWxsIGFsc29cbiAgLy8gICAgICBub3RlIDE6IHJldHVybiB0cnVlIGluIHRoaXMgZnVuY3Rpb24gKGV4Y2VwdCBmb3Igb2JqZWN0cyB3aGljaCBpbmhlcml0IHByb3BlcnRpZXMsXG4gIC8vICAgICAgbm90ZSAxOiBiZWluZyB0aHVzIHVzZWQgYXMgb2JqZWN0cyksXG4gIC8vICAgICAgbm90ZSAxOiB1bmxlc3MgeW91IGRvIGluaV9zZXQoJ2xvY3V0dXMub2JqZWN0c0FzQXJyYXlzJywgMCksXG4gIC8vICAgICAgbm90ZSAxOiBpbiB3aGljaCBjYXNlIG9ubHkgZ2VudWluZSBKYXZhU2NyaXB0IGFycmF5c1xuICAvLyAgICAgIG5vdGUgMTogd2lsbCByZXR1cm4gdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMTogaXNfYXJyYXkoWydLZXZpbicsICd2YW4nLCAnWm9ubmV2ZWxkJ10pXG4gIC8vICAgcmV0dXJucyAxOiB0cnVlXG4gIC8vICAgZXhhbXBsZSAyOiBpc19hcnJheSgnS2V2aW4gdmFuIFpvbm5ldmVsZCcpXG4gIC8vICAgcmV0dXJucyAyOiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgMzogaXNfYXJyYXkoezA6ICdLZXZpbicsIDE6ICd2YW4nLCAyOiAnWm9ubmV2ZWxkJ30pXG4gIC8vICAgcmV0dXJucyAzOiB0cnVlXG4gIC8vICAgZXhhbXBsZSA0OiBpbmlfc2V0KCdsb2N1dHVzLm9iamVjdHNBc0FycmF5cycsIDApXG4gIC8vICAgZXhhbXBsZSA0OiBpc19hcnJheSh7MDogJ0tldmluJywgMTogJ3ZhbicsIDI6ICdab25uZXZlbGQnfSlcbiAgLy8gICByZXR1cm5zIDQ6IGZhbHNlXG4gIC8vICAgZXhhbXBsZSA1OiBpc19hcnJheShmdW5jdGlvbiB0bXBfYSAoKXsgdGhpcy5uYW1lID0gJ0tldmluJyB9KVxuICAvLyAgIHJldHVybnMgNTogZmFsc2VcblxuICB2YXIgX2dldEZ1bmNOYW1lID0gZnVuY3Rpb24gX2dldEZ1bmNOYW1lKGZuKSB7XG4gICAgdmFyIG5hbWUgPSAvXFxXKmZ1bmN0aW9uXFxzKyhbXFx3JF0rKVxccypcXCgvLmV4ZWMoZm4pO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICcoQW5vbnltb3VzKSc7XG4gICAgfVxuICAgIHJldHVybiBuYW1lWzFdO1xuICB9O1xuICB2YXIgX2lzQXJyYXkgPSBmdW5jdGlvbiBfaXNBcnJheShtaXhlZFZhcikge1xuICAgIC8vIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWl4ZWRWYXIpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIC8vIFRoZSBhYm92ZSB3b3JrcywgYnV0IGxldCdzIGRvIHRoZSBldmVuIG1vcmUgc3RyaW5nZW50IGFwcHJvYWNoOlxuICAgIC8vIChzaW5jZSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nIGNvdWxkIGJlIG92ZXJyaWRkZW4pXG4gICAgLy8gTnVsbCwgTm90IGFuIG9iamVjdCwgbm8gbGVuZ3RoIHByb3BlcnR5IHNvIGNvdWxkbid0IGJlIGFuIEFycmF5IChvciBTdHJpbmcpXG4gICAgaWYgKCFtaXhlZFZhciB8fCAodHlwZW9mIG1peGVkVmFyID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihtaXhlZFZhcikpICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgbWl4ZWRWYXIubGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbGVuID0gbWl4ZWRWYXIubGVuZ3RoO1xuICAgIG1peGVkVmFyW21peGVkVmFyLmxlbmd0aF0gPSAnYm9ndXMnO1xuICAgIC8vIFRoZSBvbmx5IHdheSBJIGNhbiB0aGluayBvZiB0byBnZXQgYXJvdW5kIHRoaXMgKG9yIHdoZXJlIHRoZXJlIHdvdWxkIGJlIHRyb3VibGUpXG4gICAgLy8gd291bGQgYmUgdG8gaGF2ZSBhbiBvYmplY3QgZGVmaW5lZFxuICAgIC8vIHdpdGggYSBjdXN0b20gXCJsZW5ndGhcIiBnZXR0ZXIgd2hpY2ggY2hhbmdlZCBiZWhhdmlvciBvbiBlYWNoIGNhbGxcbiAgICAvLyAob3IgYSBzZXR0ZXIgdG8gbWVzcyB1cCB0aGUgZm9sbG93aW5nIGJlbG93KSBvciBhIGN1c3RvbVxuICAgIC8vIHNldHRlciBmb3IgbnVtZXJpYyBwcm9wZXJ0aWVzLCBidXQgZXZlbiB0aGF0IHdvdWxkIG5lZWQgdG8gbGlzdGVuIGZvclxuICAgIC8vIHNwZWNpZmljIGluZGV4ZXM7IGJ1dCB0aGVyZSBzaG91bGQgYmUgbm8gZmFsc2UgbmVnYXRpdmVzXG4gICAgLy8gYW5kIHN1Y2ggYSBmYWxzZSBwb3NpdGl2ZSB3b3VsZCBuZWVkIHRvIHJlbHkgb24gbGF0ZXIgSmF2YVNjcmlwdFxuICAgIC8vIGlubm92YXRpb25zIGxpa2UgX19kZWZpbmVTZXR0ZXJfX1xuICAgIGlmIChsZW4gIT09IG1peGVkVmFyLmxlbmd0aCkge1xuICAgICAgLy8gV2Uga25vdyBpdCdzIGFuIGFycmF5IHNpbmNlIGxlbmd0aCBhdXRvLWNoYW5nZWQgd2l0aCB0aGUgYWRkaXRpb24gb2YgYVxuICAgICAgLy8gbnVtZXJpYyBwcm9wZXJ0eSBhdCBpdHMgbGVuZ3RoIGVuZCwgc28gc2FmZWx5IGdldCByaWQgb2Ygb3VyIGJvZ3VzIGVsZW1lbnRcbiAgICAgIG1peGVkVmFyLmxlbmd0aCAtPSAxO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIEdldCByaWQgb2YgdGhlIHByb3BlcnR5IHdlIGFkZGVkIG9udG8gYSBub24tYXJyYXkgb2JqZWN0OyBvbmx5IHBvc3NpYmxlXG4gICAgLy8gc2lkZS1lZmZlY3QgaXMgaWYgdGhlIHVzZXIgYWRkcyBiYWNrIHRoZSBwcm9wZXJ0eSBsYXRlciwgaXQgd2lsbCBpdGVyYXRlXG4gICAgLy8gdGhpcyBwcm9wZXJ0eSBpbiB0aGUgb2xkZXIgb3JkZXIgcGxhY2VtZW50IGluIElFIChhbiBvcmRlciB3aGljaCBzaG91bGQgbm90XG4gICAgLy8gYmUgZGVwZW5kZWQgb24gYW55d2F5cylcbiAgICBkZWxldGUgbWl4ZWRWYXJbbWl4ZWRWYXIubGVuZ3RoXTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaWYgKCFtaXhlZFZhciB8fCAodHlwZW9mIG1peGVkVmFyID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihtaXhlZFZhcikpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc0FycmF5ID0gX2lzQXJyYXkobWl4ZWRWYXIpO1xuXG4gIGlmIChpc0FycmF5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgaW5pVmFsID0gKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJy4uL2luZm8vaW5pX2dldCcpKCdsb2N1dHVzLm9iamVjdHNBc0FycmF5cycpIDogdW5kZWZpbmVkKSB8fCAnb24nO1xuICBpZiAoaW5pVmFsID09PSAnb24nKSB7XG4gICAgdmFyIGFzU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1peGVkVmFyKTtcbiAgICB2YXIgYXNGdW5jID0gX2dldEZ1bmNOYW1lKG1peGVkVmFyLmNvbnN0cnVjdG9yKTtcblxuICAgIGlmIChhc1N0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgYXNGdW5jID09PSAnT2JqZWN0Jykge1xuICAgICAgLy8gTW9zdCBsaWtlbHkgYSBsaXRlcmFsIGFuZCBpbnRlbmRlZCBhcyBhc3NvYy4gYXJyYXlcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19hcnJheS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfYmluYXJ5KHZyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwczovL2xvY3V0dXMuaW8vcGhwL2lzX2JpbmFyeS9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogaXNfYmluYXJ5KCdUaGlzIGNvdWxkIGJlIGJpbmFyeSBhcyBmYXIgYXMgSmF2YVNjcmlwdCBrbm93cy4uLicpXG4gIC8vICAgcmV0dXJucyAxOiB0cnVlXG5cbiAgcmV0dXJuIHR5cGVvZiB2ciA9PT0gJ3N0cmluZyc7IC8vIElmIGl0IGlzIGEgc3RyaW5nIG9mIGFueSBraW5kLCBpdCBjb3VsZCBiZSBiaW5hcnlcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19iaW5hcnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfYm9vbChtaXhlZFZhcikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9pc19ib29sL1xuICAvLyBvcmlnaW5hbCBieTogT25ubyBNYXJzbWFuIChodHRwczovL3R3aXR0ZXIuY29tL29ubm9tYXJzbWFuKVxuICAvLyBpbXByb3ZlZCBieTogQ291cnNlc1dlYiAoaHR0cHM6Ly93d3cuY291cnNlc3dlYi5uZXQvKVxuICAvLyAgIGV4YW1wbGUgMTogaXNfYm9vbChmYWxzZSlcbiAgLy8gICByZXR1cm5zIDE6IHRydWVcbiAgLy8gICBleGFtcGxlIDI6IGlzX2Jvb2woMClcbiAgLy8gICByZXR1cm5zIDI6IGZhbHNlXG5cbiAgcmV0dXJuIG1peGVkVmFyID09PSB0cnVlIHx8IG1peGVkVmFyID09PSBmYWxzZTsgLy8gRmFzdGVyIChpbiBGRikgdGhhbiB0eXBlIGNoZWNraW5nXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNfYm9vbC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfYnVmZmVyKHZyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwczovL2xvY3V0dXMuaW8vcGhwL2lzX2J1ZmZlci9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogaXNfYnVmZmVyKCdUaGlzIGNvdWxkIGJlIGJpbmFyeSBvciBhIHJlZ3VsYXIgc3RyaW5nLi4uJylcbiAgLy8gICByZXR1cm5zIDE6IHRydWVcblxuICByZXR1cm4gdHlwZW9mIHZyID09PSAnc3RyaW5nJztcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19idWZmZXIuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfY2FsbGFibGUobWl4ZWRWYXIsIHN5bnRheE9ubHksIGNhbGxhYmxlTmFtZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9pc19jYWxsYWJsZS9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICBpbnB1dCBieTogRnJhbsOnb2lzXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IEtuaWdodFlvc2hpXG4gIC8vIGltcHJvdmVkIGJ5OiBXYWxkbyBNYWxxdWkgU2lsdmEgKGh0dHBzOi8vZmF5ci51cy93YWxkby8pXG4gIC8vICAgICAgbm90ZSAxOiBUaGUgdmFyaWFibGUgY2FsbGFibGVOYW1lIGNhbm5vdCB3b3JrIGFzIGEgc3RyaW5nIHZhcmlhYmxlIHBhc3NlZCBieVxuICAvLyAgICAgIG5vdGUgMTogcmVmZXJlbmNlIGFzIGluIFBIUCAoc2luY2UgSmF2YVNjcmlwdCBkb2VzIG5vdCBzdXBwb3J0IHBhc3NpbmdcbiAgLy8gICAgICBub3RlIDE6IHN0cmluZ3MgYnkgcmVmZXJlbmNlKSwgYnV0IGluc3RlYWQgd2lsbCB0YWtlIHRoZSBuYW1lIG9mXG4gIC8vICAgICAgbm90ZSAxOiBhIGdsb2JhbCB2YXJpYWJsZSBhbmQgc2V0IHRoYXQgaW5zdGVhZC5cbiAgLy8gICAgICBub3RlIDE6IFdoZW4gdXNlZCBvbiBhbiBvYmplY3QsIGRlcGVuZHMgb24gYSBjb25zdHJ1Y3RvciBwcm9wZXJ0eVxuICAvLyAgICAgIG5vdGUgMTogYmVpbmcga2VwdCBvbiB0aGUgb2JqZWN0IHByb3RvdHlwZVxuICAvLyAgICAgIG5vdGUgMjogRGVwZW5kaW5nIG9uIHRoZSBgY2FsbGFibGVOYW1lYCB0aGF0IGlzIHBhc3NlZCwgdGhpcyBmdW5jdGlvbiBjYW4gdXNlIGV2YWwuXG4gIC8vICAgICAgbm90ZSAyOiBUaGUgZXZhbCBpbnB1dCBpcyBob3dldmVyIGNoZWNrZWQgdG8gb25seSBhbGxvdyB2YWxpZCBmdW5jdGlvbiBuYW1lcyxcbiAgLy8gICAgICBub3RlIDI6IFNvIGl0IHNob3VsZCBub3QgYmUgdW5zYWZlciB0aGFuIHVzZXMgd2l0aG91dCBldmFsIChzZWVpbmcgYXMgeW91IGNhbilcbiAgLy8gICAgICBub3RlIDI6IGFscmVhZHkgcGFzcyBhbnkgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgaGVyZS5cbiAgLy8gICBleGFtcGxlIDE6IGlzX2NhbGxhYmxlKCdpc19jYWxsYWJsZScpXG4gIC8vICAgcmV0dXJucyAxOiB0cnVlXG4gIC8vICAgZXhhbXBsZSAyOiBpc19jYWxsYWJsZSgnYm9ndXNGdW5jdGlvbicsIHRydWUpXG4gIC8vICAgcmV0dXJucyAyOiB0cnVlIC8vIGdpdmVzIHRydWUgYmVjYXVzZSBkb2VzIG5vdCBkbyBzdHJpY3QgY2hlY2tpbmdcbiAgLy8gICBleGFtcGxlIDM6IGZ1bmN0aW9uIFNvbWVDbGFzcyAoKSB7fVxuICAvLyAgIGV4YW1wbGUgMzogU29tZUNsYXNzLnByb3RvdHlwZS5zb21lTWV0aG9kID0gZnVuY3Rpb24gKCl7fVxuICAvLyAgIGV4YW1wbGUgMzogdmFyIHRlc3RPYmogPSBuZXcgU29tZUNsYXNzKClcbiAgLy8gICBleGFtcGxlIDM6IGlzX2NhbGxhYmxlKFt0ZXN0T2JqLCAnc29tZU1ldGhvZCddLCB0cnVlLCAnbXlWYXInKVxuICAvLyAgIGV4YW1wbGUgMzogdmFyICRyZXN1bHQgPSBteVZhclxuICAvLyAgIHJldHVybnMgMzogJ1NvbWVDbGFzczo6c29tZU1ldGhvZCdcbiAgLy8gICBleGFtcGxlIDQ6IGlzX2NhbGxhYmxlKGZ1bmN0aW9uICgpIHt9KVxuICAvLyAgIHJldHVybnMgNDogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgNTogaXNfY2FsbGFibGUoY2xhc3MgTXlDbGFzcyB7fSlcbiAgLy8gICByZXR1cm5zIDU6IGZhbHNlXG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcblxuICB2YXIgdmFsaWRKU0Z1bmN0aW9uTmFtZVBhdHRlcm4gPSAvXltfJGEtekEtWlxceEEwLVxcdUZGRkZdW18kYS16QS1aMC05XFx4QTAtXFx1RkZGRl0qJC87XG5cbiAgdmFyIG5hbWUgPSAnJztcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgbWV0aG9kID0gJyc7XG4gIHZhciB2YWxpZEZ1bmN0aW9uTmFtZSA9IGZhbHNlO1xuXG4gIHZhciBnZXRGdW5jTmFtZSA9IGZ1bmN0aW9uIGdldEZ1bmNOYW1lKGZuKSB7XG4gICAgdmFyIG5hbWUgPSAvXFxXKmZ1bmN0aW9uXFxzKyhbXFx3JF0rKVxccypcXCgvLmV4ZWMoZm4pO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICcoQW5vbnltb3VzKSc7XG4gICAgfVxuICAgIHJldHVybiBuYW1lWzFdO1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICBpZiAoLyheY2xhc3N8XFwodGhpc1xcLCkvLnRlc3QobWl4ZWRWYXIudG9TdHJpbmcoKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIG1peGVkVmFyID09PSAnc3RyaW5nJykge1xuICAgIG9iaiA9ICRnbG9iYWw7XG4gICAgbWV0aG9kID0gbWl4ZWRWYXI7XG4gICAgbmFtZSA9IG1peGVkVmFyO1xuICAgIHZhbGlkRnVuY3Rpb25OYW1lID0gISFuYW1lLm1hdGNoKHZhbGlkSlNGdW5jdGlvbk5hbWVQYXR0ZXJuKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbWl4ZWRWYXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWl4ZWRWYXIpID09PSAnW29iamVjdCBBcnJheV0nICYmIG1peGVkVmFyLmxlbmd0aCA9PT0gMiAmJiBfdHlwZW9mKG1peGVkVmFyWzBdKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1peGVkVmFyWzFdID09PSAnc3RyaW5nJykge1xuICAgIG9iaiA9IG1peGVkVmFyWzBdO1xuICAgIG1ldGhvZCA9IG1peGVkVmFyWzFdO1xuICAgIG5hbWUgPSAob2JqLmNvbnN0cnVjdG9yICYmIGdldEZ1bmNOYW1lKG9iai5jb25zdHJ1Y3RvcikpICsgJzo6JyArIG1ldGhvZDtcbiAgfVxuXG4gIGlmIChzeW50YXhPbmx5IHx8IHR5cGVvZiBvYmpbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChjYWxsYWJsZU5hbWUpIHtcbiAgICAgICRnbG9iYWxbY2FsbGFibGVOYW1lXSA9IG5hbWU7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gdmFsaWRGdW5jdGlvbk5hbWUgYXZvaWRzIGV4cGxvaXRzXG4gIGlmICh2YWxpZEZ1bmN0aW9uTmFtZSAmJiB0eXBlb2YgZXZhbChtZXRob2QpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG4gICAgaWYgKGNhbGxhYmxlTmFtZSkge1xuICAgICAgJGdsb2JhbFtjYWxsYWJsZU5hbWVdID0gbmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNfY2FsbGFibGUuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzX2RvdWJsZShtaXhlZFZhcikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9pc19kb3VibGUvXG4gIC8vIG9yaWdpbmFsIGJ5OiBQYXVsbyBGcmVpdGFzXG4gIC8vICAgICAgbm90ZSAxOiAxLjAgaXMgc2ltcGxpZmllZCB0byAxIGJlZm9yZSBpdCBjYW4gYmUgYWNjZXNzZWQgYnkgdGhlIGZ1bmN0aW9uLCB0aGlzIG1ha2VzXG4gIC8vICAgICAgbm90ZSAxOiBpdCBkaWZmZXJlbnQgZnJvbSB0aGUgUEhQIGltcGxlbWVudGF0aW9uLiBXZSBjYW4ndCBmaXggdGhpcyB1bmZvcnR1bmF0ZWx5LlxuICAvLyAgIGV4YW1wbGUgMTogaXNfZG91YmxlKDE4Ni4zMSlcbiAgLy8gICByZXR1cm5zIDE6IHRydWVcblxuICB2YXIgX2lzRmxvYXQgPSByZXF1aXJlKCcuLi92YXIvaXNfZmxvYXQnKTtcbiAgcmV0dXJuIF9pc0Zsb2F0KG1peGVkVmFyKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19kb3VibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfZmxvYXQobWl4ZWRWYXIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvaXNfZmxvYXQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBQYXVsbyBGcmVpdGFzXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IFdlYkRldkhvYm8gKGh0dHBzOi8vd2ViZGV2aG9iby5ibG9nc3BvdC5jb20vKVxuICAvLyBpbXByb3ZlZCBieTogUmFmYcWCIEt1a2F3c2tpIChodHRwczovL2Jsb2cua3VrYXdza2kucGwpXG4gIC8vICAgICAgbm90ZSAxOiAxLjAgaXMgc2ltcGxpZmllZCB0byAxIGJlZm9yZSBpdCBjYW4gYmUgYWNjZXNzZWQgYnkgdGhlIGZ1bmN0aW9uLCB0aGlzIG1ha2VzXG4gIC8vICAgICAgbm90ZSAxOiBpdCBkaWZmZXJlbnQgZnJvbSB0aGUgUEhQIGltcGxlbWVudGF0aW9uLiBXZSBjYW4ndCBmaXggdGhpcyB1bmZvcnR1bmF0ZWx5LlxuICAvLyAgIGV4YW1wbGUgMTogaXNfZmxvYXQoMTg2LjMxKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuXG4gIHJldHVybiArbWl4ZWRWYXIgPT09IG1peGVkVmFyICYmICghaXNGaW5pdGUobWl4ZWRWYXIpIHx8ICEhKG1peGVkVmFyICUgMSkpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzX2Zsb2F0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzX2ludChtaXhlZFZhcikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9pc19pbnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBBbGV4XG4gIC8vIGltcHJvdmVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwczovL2t2ei5pbylcbiAgLy8gaW1wcm92ZWQgYnk6IFdlYkRldkhvYm8gKGh0dHBzOi8vd2ViZGV2aG9iby5ibG9nc3BvdC5jb20vKVxuICAvLyBpbXByb3ZlZCBieTogUmFmYcWCIEt1a2F3c2tpIChodHRwczovL2Jsb2cua3VrYXdza2kucGwpXG4gIC8vICByZXZpc2VkIGJ5OiBNYXR0IEJyYWRsZXlcbiAgLy8gYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHBzOi8va3Z6LmlvKVxuICAvLyAgICAgIG5vdGUgMTogMS4wIGlzIHNpbXBsaWZpZWQgdG8gMSBiZWZvcmUgaXQgY2FuIGJlIGFjY2Vzc2VkIGJ5IHRoZSBmdW5jdGlvbiwgdGhpcyBtYWtlc1xuICAvLyAgICAgIG5vdGUgMTogaXQgZGlmZmVyZW50IGZyb20gdGhlIFBIUCBpbXBsZW1lbnRhdGlvbi4gV2UgY2FuJ3QgZml4IHRoaXMgdW5mb3J0dW5hdGVseS5cbiAgLy8gICBleGFtcGxlIDE6IGlzX2ludCgyMylcbiAgLy8gICByZXR1cm5zIDE6IHRydWVcbiAgLy8gICBleGFtcGxlIDI6IGlzX2ludCgnMjMnKVxuICAvLyAgIHJldHVybnMgMjogZmFsc2VcbiAgLy8gICBleGFtcGxlIDM6IGlzX2ludCgyMy41KVxuICAvLyAgIHJldHVybnMgMzogZmFsc2VcbiAgLy8gICBleGFtcGxlIDQ6IGlzX2ludCh0cnVlKVxuICAvLyAgIHJldHVybnMgNDogZmFsc2VcblxuICByZXR1cm4gbWl4ZWRWYXIgPT09ICttaXhlZFZhciAmJiBpc0Zpbml0ZShtaXhlZFZhcikgJiYgIShtaXhlZFZhciAlIDEpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzX2ludC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfaW50ZWdlcihtaXhlZFZhcikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9pc19pbnRlZ2VyL1xuICAvLyBvcmlnaW5hbCBieTogUGF1bG8gRnJlaXRhc1xuICAvLyAgICAgIG5vdGUgMTogMS4wIGlzIHNpbXBsaWZpZWQgdG8gMSBiZWZvcmUgaXQgY2FuIGJlIGFjY2Vzc2VkIGJ5IHRoZSBmdW5jdGlvbiwgdGhpcyBtYWtlc1xuICAvLyAgICAgIG5vdGUgMTogaXQgZGlmZmVyZW50IGZyb20gdGhlIFBIUCBpbXBsZW1lbnRhdGlvbi4gV2UgY2FuJ3QgZml4IHRoaXMgdW5mb3J0dW5hdGVseS5cbiAgLy8gICBleGFtcGxlIDE6IGlzX2ludGVnZXIoMTg2LjMxKVxuICAvLyAgIHJldHVybnMgMTogZmFsc2VcbiAgLy8gICBleGFtcGxlIDI6IGlzX2ludGVnZXIoMTIpXG4gIC8vICAgcmV0dXJucyAyOiB0cnVlXG5cbiAgdmFyIF9pc0ludCA9IHJlcXVpcmUoJy4uL3Zhci9pc19pbnQnKTtcbiAgcmV0dXJuIF9pc0ludChtaXhlZFZhcik7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNfaW50ZWdlci5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfbG9uZyhtaXhlZFZhcikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9pc19sb25nL1xuICAvLyBvcmlnaW5hbCBieTogUGF1bG8gRnJlaXRhc1xuICAvLyAgICAgIG5vdGUgMTogMS4wIGlzIHNpbXBsaWZpZWQgdG8gMSBiZWZvcmUgaXQgY2FuIGJlIGFjY2Vzc2VkIGJ5IHRoZSBmdW5jdGlvbiwgdGhpcyBtYWtlc1xuICAvLyAgICAgIG5vdGUgMTogaXQgZGlmZmVyZW50IGZyb20gdGhlIFBIUCBpbXBsZW1lbnRhdGlvbi4gV2UgY2FuJ3QgZml4IHRoaXMgdW5mb3J0dW5hdGVseS5cbiAgLy8gICBleGFtcGxlIDE6IGlzX2xvbmcoMTg2LjMxKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuXG4gIHZhciBfaXNGbG9hdCA9IHJlcXVpcmUoJy4uL3Zhci9pc19mbG9hdCcpO1xuICByZXR1cm4gX2lzRmxvYXQobWl4ZWRWYXIpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzX2xvbmcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfbnVsbChtaXhlZFZhcikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9pc19udWxsL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8pXG4gIC8vICAgZXhhbXBsZSAxOiBpc19udWxsKCcyMycpXG4gIC8vICAgcmV0dXJucyAxOiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgMjogaXNfbnVsbChudWxsKVxuICAvLyAgIHJldHVybnMgMjogdHJ1ZVxuXG4gIHJldHVybiBtaXhlZFZhciA9PT0gbnVsbDtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19udWxsLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc19udW1lcmljKG1peGVkVmFyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwczovL2xvY3V0dXMuaW8vcGhwL2lzX251bWVyaWMvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwczovL2t2ei5pbylcbiAgLy8gaW1wcm92ZWQgYnk6IERhdmlkXG4gIC8vIGltcHJvdmVkIGJ5OiB0YWl0aFxuICAvLyBidWdmaXhlZCBieTogVGltIGRlIEtvbmluZ1xuICAvLyBidWdmaXhlZCBieTogV2ViRGV2SG9ibyAoaHR0cHM6Ly93ZWJkZXZob2JvLmJsb2dzcG90LmNvbS8pXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gYnVnZml4ZWQgYnk6IERlbmlzIENoZW51IChodHRwczovL3Nobm91bGxlLm5ldClcbiAgLy8gICBleGFtcGxlIDE6IGlzX251bWVyaWMoMTg2LjMxKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMjogaXNfbnVtZXJpYygnS2V2aW4gdmFuIFpvbm5ldmVsZCcpXG4gIC8vICAgcmV0dXJucyAyOiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgMzogaXNfbnVtZXJpYygnICsxODYuMzFlMicpXG4gIC8vICAgcmV0dXJucyAzOiB0cnVlXG4gIC8vICAgZXhhbXBsZSA0OiBpc19udW1lcmljKCcnKVxuICAvLyAgIHJldHVybnMgNDogZmFsc2VcbiAgLy8gICBleGFtcGxlIDU6IGlzX251bWVyaWMoW10pXG4gIC8vICAgcmV0dXJucyA1OiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgNjogaXNfbnVtZXJpYygnMSAnKVxuICAvLyAgIHJldHVybnMgNjogZmFsc2VcblxuICB2YXIgd2hpdGVzcGFjZSA9IFsnICcsICdcXG4nLCAnXFxyJywgJ1xcdCcsICdcXGYnLCAnXFx4MGInLCAnXFx4YTAnLCAnXFx1MjAwMCcsICdcXHUyMDAxJywgJ1xcdTIwMDInLCAnXFx1MjAwMycsICdcXHUyMDA0JywgJ1xcdTIwMDUnLCAnXFx1MjAwNicsICdcXHUyMDA3JywgJ1xcdTIwMDgnLCAnXFx1MjAwOScsICdcXHUyMDBBJywgJ1xcdTIwMEInLCAnXFx1MjAyOCcsICdcXHUyMDI5JywgJ1xcdTMwMDAnXS5qb2luKCcnKTtcblxuICAvLyBAdG9kbzogQnJlYWsgdGhpcyB1cCB1c2luZyBtYW55IHNpbmdsZSBjb25kaXRpb25zIHdpdGggZWFybHkgcmV0dXJuc1xuICByZXR1cm4gKHR5cGVvZiBtaXhlZFZhciA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG1peGVkVmFyID09PSAnc3RyaW5nJyAmJiB3aGl0ZXNwYWNlLmluZGV4T2YobWl4ZWRWYXIuc2xpY2UoLTEpKSA9PT0gLTEpICYmIG1peGVkVmFyICE9PSAnJyAmJiAhaXNOYU4obWl4ZWRWYXIpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzX251bWVyaWMuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfb2JqZWN0KG1peGVkVmFyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwczovL2xvY3V0dXMuaW8vcGhwL2lzX29iamVjdC9cbiAgLy8gb3JpZ2luYWwgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHBzOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogTGVnYWV2IEFuZHJleVxuICAvLyBpbXByb3ZlZCBieTogTWljaGFlbCBXaGl0ZSAoaHR0cHM6Ly9nZXRzcHJpbmsuY29tKVxuICAvLyAgIGV4YW1wbGUgMTogaXNfb2JqZWN0KCcyMycpXG4gIC8vICAgcmV0dXJucyAxOiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgMjogaXNfb2JqZWN0KHtmb286ICdiYXInfSlcbiAgLy8gICByZXR1cm5zIDI6IHRydWVcbiAgLy8gICBleGFtcGxlIDM6IGlzX29iamVjdChudWxsKVxuICAvLyAgIHJldHVybnMgMzogZmFsc2VcblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1peGVkVmFyKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbWl4ZWRWYXIgIT09IG51bGwgJiYgKHR5cGVvZiBtaXhlZFZhciA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobWl4ZWRWYXIpKSA9PT0gJ29iamVjdCc7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNfb2JqZWN0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc19yZWFsKG1peGVkVmFyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwczovL2xvY3V0dXMuaW8vcGhwL2lzX3JlYWwvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IDEuMCBpcyBzaW1wbGlmaWVkIHRvIDEgYmVmb3JlIGl0IGNhbiBiZSBhY2Nlc3NlZCBieSB0aGUgZnVuY3Rpb24sIHRoaXMgbWFrZXNcbiAgLy8gICAgICBub3RlIDE6IGl0IGRpZmZlcmVudCBmcm9tIHRoZSBQSFAgaW1wbGVtZW50YXRpb24uIFdlIGNhbid0IGZpeCB0aGlzIHVuZm9ydHVuYXRlbHkuXG4gIC8vICAgZXhhbXBsZSAxOiBpc19yZWFsKDE4Ni4zMSlcbiAgLy8gICByZXR1cm5zIDE6IHRydWVcblxuICB2YXIgX2lzRmxvYXQgPSByZXF1aXJlKCcuLi92YXIvaXNfZmxvYXQnKTtcbiAgcmV0dXJuIF9pc0Zsb2F0KG1peGVkVmFyKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19yZWFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNfc2NhbGFyKG1peGVkVmFyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwczovL2xvY3V0dXMuaW8vcGhwL2lzX3NjYWxhci9cbiAgLy8gb3JpZ2luYWwgYnk6IFBhdWxvIEZyZWl0YXNcbiAgLy8gICBleGFtcGxlIDE6IGlzX3NjYWxhcigxODYuMzEpXG4gIC8vICAgcmV0dXJucyAxOiB0cnVlXG4gIC8vICAgZXhhbXBsZSAyOiBpc19zY2FsYXIoezA6ICdLZXZpbiB2YW4gWm9ubmV2ZWxkJ30pXG4gIC8vICAgcmV0dXJucyAyOiBmYWxzZVxuXG4gIHJldHVybiAoL2Jvb2xlYW58bnVtYmVyfHN0cmluZy8udGVzdCh0eXBlb2YgbWl4ZWRWYXIgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihtaXhlZFZhcikpXG4gICk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNfc2NhbGFyLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc19zdHJpbmcobWl4ZWRWYXIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvaXNfc3RyaW5nL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8pXG4gIC8vICAgZXhhbXBsZSAxOiBpc19zdHJpbmcoJzIzJylcbiAgLy8gICByZXR1cm5zIDE6IHRydWVcbiAgLy8gICBleGFtcGxlIDI6IGlzX3N0cmluZygyMy41KVxuICAvLyAgIHJldHVybnMgMjogZmFsc2VcblxuICByZXR1cm4gdHlwZW9mIG1peGVkVmFyID09PSAnc3RyaW5nJztcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19zdHJpbmcuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzX3VuaWNvZGUodnIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvaXNfdW5pY29kZS9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogQWxtb3N0IGFsbCBzdHJpbmdzIGluIEphdmFTY3JpcHQgc2hvdWxkIGJlIFVuaWNvZGVcbiAgLy8gICBleGFtcGxlIDE6IGlzX3VuaWNvZGUoJ1dlIHRoZSBwZW9wbGVzIG9mIHRoZSBVbml0ZWQgTmF0aW9ucy4uLiEnKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuXG4gIGlmICh0eXBlb2YgdnIgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gSWYgc3Vycm9nYXRlcyBvY2N1ciBvdXRzaWRlIG9mIGhpZ2gtbG93IHBhaXJzLCB0aGVuIHRoaXMgaXMgbm90IFVuaWNvZGVcbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgaGlnaFN1cnJvZ2F0ZSA9ICdbXFx1RDgwMC1cXHVEQkZGXSc7XG4gIHZhciBsb3dTdXJyb2dhdGUgPSAnW1xcdURDMDAtXFx1REZGRl0nO1xuICB2YXIgaGlnaFN1cnJvZ2F0ZUJlZm9yZUFueSA9IG5ldyBSZWdFeHAoaGlnaFN1cnJvZ2F0ZSArICcoW1xcXFxzXFxcXFNdKScsICdnJyk7XG4gIHZhciBsb3dTdXJyb2dhdGVBZnRlckFueSA9IG5ldyBSZWdFeHAoJyhbXFxcXHNcXFxcU10pJyArIGxvd1N1cnJvZ2F0ZSwgJ2cnKTtcbiAgdmFyIHNpbmdsZUxvd1N1cnJvZ2F0ZSA9IG5ldyBSZWdFeHAoJ14nICsgbG93U3Vycm9nYXRlICsgJyQnKTtcbiAgdmFyIHNpbmdsZUhpZ2hTdXJyb2dhdGUgPSBuZXcgUmVnRXhwKCdeJyArIGhpZ2hTdXJyb2dhdGUgKyAnJCcpO1xuXG4gIHdoaWxlICgoYXJyID0gaGlnaFN1cnJvZ2F0ZUJlZm9yZUFueS5leGVjKHZyKSkgIT09IG51bGwpIHtcbiAgICBpZiAoIWFyclsxXSB8fCAhYXJyWzFdLm1hdGNoKHNpbmdsZUxvd1N1cnJvZ2F0ZSkpIHtcbiAgICAgIC8vIElmIGhpZ2ggbm90IGZvbGxvd2VkIGJ5IGxvdyBzdXJyb2dhdGVcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKChhcnIgPSBsb3dTdXJyb2dhdGVBZnRlckFueS5leGVjKHZyKSkgIT09IG51bGwpIHtcbiAgICBpZiAoIWFyclsxXSB8fCAhYXJyWzFdLm1hdGNoKHNpbmdsZUhpZ2hTdXJyb2dhdGUpKSB7XG4gICAgICAvLyBJZiBsb3cgbm90IHByZWNlZGVkIGJ5IGhpZ2ggc3Vycm9nYXRlXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNfdW5pY29kZS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNzZXQoKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwczovL2xvY3V0dXMuaW8vcGhwL2lzc2V0L1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8pXG4gIC8vIGltcHJvdmVkIGJ5OiBGcmVteUNvbXBhbnlcbiAgLy8gaW1wcm92ZWQgYnk6IE9ubm8gTWFyc21hbiAoaHR0cHM6Ly90d2l0dGVyLmNvbS9vbm5vbWFyc21hbilcbiAgLy8gaW1wcm92ZWQgYnk6IFJhZmHFgiBLdWthd3NraSAoaHR0cHM6Ly9ibG9nLmt1a2F3c2tpLnBsKVxuICAvLyAgIGV4YW1wbGUgMTogaXNzZXQoIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgLy8gICByZXR1cm5zIDE6IGZhbHNlXG4gIC8vICAgZXhhbXBsZSAyOiBpc3NldCggJ0tldmluIHZhbiBab25uZXZlbGQnIClcbiAgLy8gICByZXR1cm5zIDI6IHRydWVcblxuICB2YXIgYSA9IGFyZ3VtZW50cztcbiAgdmFyIGwgPSBhLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgdW5kZWYgPSB2b2lkIDA7XG5cbiAgaWYgKGwgPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0VtcHR5IGlzc2V0Jyk7XG4gIH1cblxuICB3aGlsZSAoaSAhPT0gbCkge1xuICAgIGlmIChhW2ldID09PSB1bmRlZiB8fCBhW2ldID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzc2V0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHByaW50X3IoYXJyYXksIHJldHVyblZhbCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9wcmludF9yL1xuICAvLyBvcmlnaW5hbCBieTogTWljaGFlbCBXaGl0ZSAoaHR0cHM6Ly9nZXRzcHJpbmsuY29tKVxuICAvLyBpbXByb3ZlZCBieTogQmVuIEJyeWFuXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHBzOi8va3Z6LmlvKVxuICAvLyAgICBpbnB1dCBieTogQnJldHQgWmFtaXIgKGh0dHBzOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgZXhhbXBsZSAxOiBwcmludF9yKDEsIHRydWUpXG4gIC8vICAgcmV0dXJucyAxOiAnMSdcblxuICB2YXIgZWNobyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MvZWNobycpO1xuXG4gIHZhciBvdXRwdXQgPSAnJztcbiAgdmFyIHBhZENoYXIgPSAnICc7XG4gIHZhciBwYWRWYWwgPSA0O1xuXG4gIHZhciBfcmVwZWF0Q2hhciA9IGZ1bmN0aW9uIF9yZXBlYXRDaGFyKGxlbiwgcGFkQ2hhcikge1xuICAgIHZhciBzdHIgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBzdHIgKz0gcGFkQ2hhcjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcbiAgdmFyIF9mb3JtYXRBcnJheSA9IGZ1bmN0aW9uIF9mb3JtYXRBcnJheShvYmosIGN1ckRlcHRoLCBwYWRWYWwsIHBhZENoYXIpIHtcbiAgICBpZiAoY3VyRGVwdGggPiAwKSB7XG4gICAgICBjdXJEZXB0aCsrO1xuICAgIH1cblxuICAgIHZhciBiYXNlUGFkID0gX3JlcGVhdENoYXIocGFkVmFsICogY3VyRGVwdGgsIHBhZENoYXIpO1xuICAgIHZhciB0aGlja1BhZCA9IF9yZXBlYXRDaGFyKHBhZFZhbCAqIChjdXJEZXB0aCArIDEpLCBwYWRDaGFyKTtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICBpZiAoKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9iaikpID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzdHIgKz0gJ0FycmF5XFxuJyArIGJhc2VQYWQgKyAnKFxcbic7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW2tleV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgc3RyICs9IHRoaWNrUGFkO1xuICAgICAgICAgIHN0ciArPSAnWyc7XG4gICAgICAgICAgc3RyICs9IGtleTtcbiAgICAgICAgICBzdHIgKz0gJ10gPT4gJztcbiAgICAgICAgICBzdHIgKz0gX2Zvcm1hdEFycmF5KG9ialtrZXldLCBjdXJEZXB0aCArIDEsIHBhZFZhbCwgcGFkQ2hhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyICs9IHRoaWNrUGFkO1xuICAgICAgICAgIHN0ciArPSAnWyc7XG4gICAgICAgICAgc3RyICs9IGtleTtcbiAgICAgICAgICBzdHIgKz0gJ10gPT4gJztcbiAgICAgICAgICBzdHIgKz0gb2JqW2tleV07XG4gICAgICAgICAgc3RyICs9ICdcXG4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdHIgKz0gYmFzZVBhZCArICcpXFxuJztcbiAgICB9IGVsc2UgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgc3RyID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBvdXIgXCJyZXNvdXJjZVwiIGNsYXNzXG4gICAgICBzdHIgPSBvYmoudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xuICB9O1xuXG4gIG91dHB1dCA9IF9mb3JtYXRBcnJheShhcnJheSwgMCwgcGFkVmFsLCBwYWRDaGFyKTtcblxuICBpZiAocmV0dXJuVmFsICE9PSB0cnVlKSB7XG4gICAgZWNobyhvdXRwdXQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJpbnRfci5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXJpYWxpemUobWl4ZWRWYWx1ZSkge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9zZXJpYWxpemUvXG4gIC8vIG9yaWdpbmFsIGJ5OiBBcnBhZCBSYXkgKG1haWx0bzphcnBhZEBwaHAubmV0KVxuICAvLyBpbXByb3ZlZCBieTogRGlub1xuICAvLyBpbXByb3ZlZCBieTogTGUgVG9yYmkgKGh0dHBzOi8vd3d3LmxldG9yYmkuZGUvKVxuICAvLyBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8vKVxuICAvLyBidWdmaXhlZCBieTogQW5kcmVqIFBhdmxvdmljXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBHYXJhZ290aFxuICAvLyBidWdmaXhlZCBieTogUnVzc2VsbCBXYWxrZXIgKGh0dHBzOi8vd3d3Lm5iaWxsLmNvLnVrLylcbiAgLy8gYnVnZml4ZWQgYnk6IEphbWllIEJlY2sgKGh0dHBzOi8vd3d3LnRlcmFiaXQuY2EvKVxuICAvLyBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8vKVxuICAvLyBidWdmaXhlZCBieTogQmVuIChodHRwczovL2JlbmJsdW1lLmNvLnVrLylcbiAgLy8gYnVnZml4ZWQgYnk6IENvZGVzdGFyIChodHRwczovL2NvZGVzdGFybGl2ZS5jb20vKVxuICAvLyBidWdmaXhlZCBieTogaWRqZW0gKGh0dHBzOi8vZ2l0aHViLmNvbS9pZGplbSlcbiAgLy8gICAgaW5wdXQgYnk6IER0VHZCIChodHRwczovL2R0LmluLnRoLzIwMDgtMDktMTYuc3RyaW5nLWxlbmd0aC1pbi1ieXRlcy5odG1sKVxuICAvLyAgICBpbnB1dCBieTogTWFydGluIChodHRwczovL3d3dy5lcmxlbndpZXNlLmRlLylcbiAgLy8gICAgICBub3RlIDE6IFdlIGZlZWwgdGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB0byBlYXNlXG4gIC8vICAgICAgbm90ZSAxOiB0aGUgdHJhbnNwb3J0IG9mIGRhdGEgYmV0d2VlbiBwaHAgJiBqc1xuICAvLyAgICAgIG5vdGUgMTogQWltaW5nIGZvciBQSFAtY29tcGF0aWJpbGl0eSwgd2UgaGF2ZSB0byB0cmFuc2xhdGUgb2JqZWN0cyB0byBhcnJheXNcbiAgLy8gICBleGFtcGxlIDE6IHNlcmlhbGl6ZShbJ0tldmluJywgJ3ZhbicsICdab25uZXZlbGQnXSlcbiAgLy8gICByZXR1cm5zIDE6ICdhOjM6e2k6MDtzOjU6XCJLZXZpblwiO2k6MTtzOjM6XCJ2YW5cIjtpOjI7czo5OlwiWm9ubmV2ZWxkXCI7fSdcbiAgLy8gICBleGFtcGxlIDI6IHNlcmlhbGl6ZSh7Zmlyc3ROYW1lOiAnS2V2aW4nLCBtaWROYW1lOiAndmFuJ30pXG4gIC8vICAgcmV0dXJucyAyOiAnYToyOntzOjk6XCJmaXJzdE5hbWVcIjtzOjU6XCJLZXZpblwiO3M6NzpcIm1pZE5hbWVcIjtzOjM6XCJ2YW5cIjt9J1xuICAvLyAgIGV4YW1wbGUgMzogc2VyaWFsaXplKCB7J8O8JzogJ8O8JywgJ+Wbmyc6ICflm5snLCAn8KCcjic6ICfwoJyOJ30pXG4gIC8vICAgcmV0dXJucyAzOiAnYTozOntzOjI6XCLDvFwiO3M6MjpcIsO8XCI7czozOlwi5ZubXCI7czozOlwi5ZubXCI7czo0Olwi8KCcjlwiO3M6NDpcIvCgnI5cIjt9J1xuXG4gIHZhciB2YWwgPSB2b2lkIDAsXG4gICAgICBrZXkgPSB2b2lkIDAsXG4gICAgICBva2V5ID0gdm9pZCAwO1xuICB2YXIga3R5cGUgPSAnJztcbiAgdmFyIHZhbHMgPSAnJztcbiAgdmFyIGNvdW50ID0gMDtcblxuICB2YXIgX3V0ZjhTaXplID0gZnVuY3Rpb24gX3V0ZjhTaXplKHN0cikge1xuICAgIHJldHVybiB+LWVuY29kZVVSSShzdHIpLnNwbGl0KC8lLi58Li8pLmxlbmd0aDtcbiAgfTtcblxuICB2YXIgX2dldFR5cGUgPSBmdW5jdGlvbiBfZ2V0VHlwZShpbnApIHtcbiAgICB2YXIgbWF0Y2ggPSB2b2lkIDA7XG4gICAgdmFyIGtleSA9IHZvaWQgMDtcbiAgICB2YXIgY29ucyA9IHZvaWQgMDtcbiAgICB2YXIgdHlwZXMgPSB2b2lkIDA7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgaW5wID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihpbnApO1xuXG4gICAgaWYgKHR5cGUgPT09ICdvYmplY3QnICYmICFpbnApIHtcbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoIWlucC5jb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgICB9XG4gICAgICBjb25zID0gaW5wLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCk7XG4gICAgICBtYXRjaCA9IGNvbnMubWF0Y2goLyhcXHcrKVxcKC8pO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGNvbnMgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgICAgdHlwZXMgPSBbJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ3N0cmluZycsICdhcnJheSddO1xuICAgICAgZm9yIChrZXkgaW4gdHlwZXMpIHtcbiAgICAgICAgaWYgKGNvbnMgPT09IHR5cGVzW2tleV0pIHtcbiAgICAgICAgICB0eXBlID0gdHlwZXNba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHlwZTtcbiAgfTtcblxuICB2YXIgdHlwZSA9IF9nZXRUeXBlKG1peGVkVmFsdWUpO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIHZhbCA9ICcnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICB2YWwgPSAnYjonICsgKG1peGVkVmFsdWUgPyAnMScgOiAnMCcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHZhbCA9IChNYXRoLnJvdW5kKG1peGVkVmFsdWUpID09PSBtaXhlZFZhbHVlID8gJ2knIDogJ2QnKSArICc6JyArIG1peGVkVmFsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgdmFsID0gJ3M6JyArIF91dGY4U2l6ZShtaXhlZFZhbHVlKSArICc6XCInICsgbWl4ZWRWYWx1ZSArICdcIic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhcnJheSc6XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHZhbCA9ICdhJztcbiAgICAgIC8qXG4gICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIG9iam5hbWUgPSBtaXhlZFZhbHVlLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkubWF0Y2goLyhcXHcrKVxcKFxcKS8pO1xuICAgICAgICBpZiAob2JqbmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9iam5hbWVbMV0gPSBzZXJpYWxpemUob2JqbmFtZVsxXSk7XG4gICAgICAgIHZhbCA9ICdPJyArIG9iam5hbWVbMV0uc3Vic3RyaW5nKDEsIG9iam5hbWVbMV0ubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgICAqL1xuXG4gICAgICBmb3IgKGtleSBpbiBtaXhlZFZhbHVlKSB7XG4gICAgICAgIGlmIChtaXhlZFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBrdHlwZSA9IF9nZXRUeXBlKG1peGVkVmFsdWVba2V5XSk7XG4gICAgICAgICAgaWYgKGt0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBva2V5ID0ga2V5Lm1hdGNoKC9eWzAtOV0rJC8pID8gcGFyc2VJbnQoa2V5LCAxMCkgOiBrZXk7XG4gICAgICAgICAgdmFscyArPSBzZXJpYWxpemUob2tleSkgKyBzZXJpYWxpemUobWl4ZWRWYWx1ZVtrZXldKTtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YWwgKz0gJzonICsgY291bnQgKyAnOnsnICsgdmFscyArICd9JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEZhbGwtdGhyb3VnaFxuICAgICAgLy8gaWYgdGhlIEpTIG9iamVjdCBoYXMgYSBwcm9wZXJ0eSB3aGljaCBjb250YWlucyBhIG51bGwgdmFsdWUsXG4gICAgICAvLyB0aGUgc3RyaW5nIGNhbm5vdCBiZSB1bnNlcmlhbGl6ZWQgYnkgUEhQXG4gICAgICB2YWwgPSAnTic7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAodHlwZSAhPT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gJ2FycmF5Jykge1xuICAgIHZhbCArPSAnOyc7XG4gIH1cblxuICByZXR1cm4gdmFsO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcmlhbGl6ZS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RydmFsKHN0cikge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC9zdHJ2YWwvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHBzOi8va3Z6LmlvKVxuICAvLyBidWdmaXhlZCBieTogQnJldHQgWmFtaXIgKGh0dHBzOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgZXhhbXBsZSAxOiBzdHJ2YWwoe3JlZDogMSwgZ3JlZW46IDIsIGJsdWU6IDMsIHdoaXRlOiA0fSlcbiAgLy8gICByZXR1cm5zIDE6ICdPYmplY3QnXG5cbiAgdmFyIGdldHR5cGUgPSByZXF1aXJlKCcuLi92YXIvZ2V0dHlwZScpO1xuICB2YXIgdHlwZSA9ICcnO1xuXG4gIGlmIChzdHIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB0eXBlID0gZ2V0dHlwZShzdHIpO1xuXG4gIC8vIENvbW1lbnQgb3V0IHRoZSBlbnRpcmUgc3dpdGNoIGlmIHlvdSB3YW50IEpTLWxpa2VcbiAgLy8gYmVoYXZpb3IgaW5zdGVhZCBvZiBQSFAgYmVoYXZpb3JcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBpZiAoc3RyID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiAnMSc7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgY2FzZSAnYXJyYXknOlxuICAgICAgcmV0dXJuICdBcnJheSc7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHJldHVybiAnT2JqZWN0JztcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RydmFsLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5mdW5jdGlvbiBpbml0Q2FjaGUoKSB7XG4gIHZhciBzdG9yZSA9IFtdO1xuICAvLyBjYWNoZSBvbmx5IGZpcnN0IGVsZW1lbnQsIHNlY29uZCBpcyBsZW5ndGggdG8ganVtcCBhaGVhZCBmb3IgdGhlIHBhcnNlclxuICB2YXIgY2FjaGUgPSBmdW5jdGlvbiBjYWNoZSh2YWx1ZSkge1xuICAgIHN0b3JlLnB1c2godmFsdWVbMF0pO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBjYWNoZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPj0gc3RvcmUubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBSYW5nZUVycm9yKCdDYW5cXCd0IHJlc29sdmUgcmVmZXJlbmNlICcgKyAoaW5kZXggKyAxKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0b3JlW2luZGV4XTtcbiAgfTtcblxuICByZXR1cm4gY2FjaGU7XG59XG5cbmZ1bmN0aW9uIGV4cGVjdFR5cGUoc3RyLCBjYWNoZSkge1xuICB2YXIgdHlwZXMgPSAvXig/Ok4oPz07KXxbYmlkc1NhT0NyUl0oPz06KXxbXjpdKyg/PTopKS9nO1xuICB2YXIgdHlwZSA9ICh0eXBlcy5leGVjKHN0cikgfHwgW10pWzBdO1xuXG4gIGlmICghdHlwZSkge1xuICAgIHRocm93IFN5bnRheEVycm9yKCdJbnZhbGlkIGlucHV0OiAnICsgc3RyKTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ04nOlxuICAgICAgcmV0dXJuIGNhY2hlKFtudWxsLCAyXSk7XG4gICAgY2FzZSAnYic6XG4gICAgICByZXR1cm4gY2FjaGUoZXhwZWN0Qm9vbChzdHIpKTtcbiAgICBjYXNlICdpJzpcbiAgICAgIHJldHVybiBjYWNoZShleHBlY3RJbnQoc3RyKSk7XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gY2FjaGUoZXhwZWN0RmxvYXQoc3RyKSk7XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gY2FjaGUoZXhwZWN0U3RyaW5nKHN0cikpO1xuICAgIGNhc2UgJ1MnOlxuICAgICAgcmV0dXJuIGNhY2hlKGV4cGVjdEVzY2FwZWRTdHJpbmcoc3RyKSk7XG4gICAgY2FzZSAnYSc6XG4gICAgICByZXR1cm4gZXhwZWN0QXJyYXkoc3RyLCBjYWNoZSk7XG4gICAgY2FzZSAnTyc6XG4gICAgICByZXR1cm4gZXhwZWN0T2JqZWN0KHN0ciwgY2FjaGUpO1xuICAgIGNhc2UgJ0MnOlxuICAgICAgcmV0dXJuIGV4cGVjdENsYXNzKHN0ciwgY2FjaGUpO1xuICAgIGNhc2UgJ3InOlxuICAgIGNhc2UgJ1InOlxuICAgICAgcmV0dXJuIGV4cGVjdFJlZmVyZW5jZShzdHIsIGNhY2hlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgU3ludGF4RXJyb3IoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAnICsgdHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwZWN0Qm9vbChzdHIpIHtcbiAgdmFyIHJlQm9vbCA9IC9eYjooWzAxXSk7LztcblxuICB2YXIgX3JlZiA9IHJlQm9vbC5leGVjKHN0cikgfHwgW10sXG4gICAgICBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDIpLFxuICAgICAgbWF0Y2ggPSBfcmVmMlswXSxcbiAgICAgIGJvb2xNYXRjaCA9IF9yZWYyWzFdO1xuXG4gIGlmICghYm9vbE1hdGNoKSB7XG4gICAgdGhyb3cgU3ludGF4RXJyb3IoJ0ludmFsaWQgYm9vbCB2YWx1ZSwgZXhwZWN0ZWQgMCBvciAxJyk7XG4gIH1cblxuICByZXR1cm4gW2Jvb2xNYXRjaCA9PT0gJzEnLCBtYXRjaC5sZW5ndGhdO1xufVxuXG5mdW5jdGlvbiBleHBlY3RJbnQoc3RyKSB7XG4gIHZhciByZUludCA9IC9eaTooWystXT9cXGQrKTsvO1xuXG4gIHZhciBfcmVmMyA9IHJlSW50LmV4ZWMoc3RyKSB8fCBbXSxcbiAgICAgIF9yZWY0ID0gX3NsaWNlZFRvQXJyYXkoX3JlZjMsIDIpLFxuICAgICAgbWF0Y2ggPSBfcmVmNFswXSxcbiAgICAgIGludE1hdGNoID0gX3JlZjRbMV07XG5cbiAgaWYgKCFpbnRNYXRjaCkge1xuICAgIHRocm93IFN5bnRheEVycm9yKCdFeHBlY3RlZCBhbiBpbnRlZ2VyIHZhbHVlJyk7XG4gIH1cblxuICByZXR1cm4gW3BhcnNlSW50KGludE1hdGNoLCAxMCksIG1hdGNoLmxlbmd0aF07XG59XG5cbmZ1bmN0aW9uIGV4cGVjdEZsb2F0KHN0cikge1xuICB2YXIgcmVGbG9hdCA9IC9eZDooTkFOfC0/SU5GfCg/OlxcZCtcXC5cXGQqfFxcZCpcXC5cXGQrfFxcZCspKD86W2VFXVsrLV1cXGQrKT8pOy87XG5cbiAgdmFyIF9yZWY1ID0gcmVGbG9hdC5leGVjKHN0cikgfHwgW10sXG4gICAgICBfcmVmNiA9IF9zbGljZWRUb0FycmF5KF9yZWY1LCAyKSxcbiAgICAgIG1hdGNoID0gX3JlZjZbMF0sXG4gICAgICBmbG9hdE1hdGNoID0gX3JlZjZbMV07XG5cbiAgaWYgKCFmbG9hdE1hdGNoKSB7XG4gICAgdGhyb3cgU3ludGF4RXJyb3IoJ0V4cGVjdGVkIGEgZmxvYXQgdmFsdWUnKTtcbiAgfVxuXG4gIHZhciBmbG9hdFZhbHVlID0gdm9pZCAwO1xuXG4gIHN3aXRjaCAoZmxvYXRNYXRjaCkge1xuICAgIGNhc2UgJ05BTic6XG4gICAgICBmbG9hdFZhbHVlID0gTnVtYmVyLk5hTjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJy1JTkYnOlxuICAgICAgZmxvYXRWYWx1ZSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0lORic6XG4gICAgICBmbG9hdFZhbHVlID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGZsb2F0VmFsdWUgPSBwYXJzZUZsb2F0KGZsb2F0TWF0Y2gpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gW2Zsb2F0VmFsdWUsIG1hdGNoLmxlbmd0aF07XG59XG5cbmZ1bmN0aW9uIHJlYWRCeXRlcyhzdHIsIGxlbikge1xuICB2YXIgZXNjYXBlZFN0cmluZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgdmFyIGJ5dGVzID0gMDtcbiAgdmFyIG91dCA9ICcnO1xuICB2YXIgYyA9IDA7XG4gIHZhciBzdHJMZW4gPSBzdHIubGVuZ3RoO1xuICB2YXIgd2FzSGlnaFN1cnJvZ2F0ZSA9IGZhbHNlO1xuICB2YXIgZXNjYXBlZENoYXJzID0gMDtcblxuICB3aGlsZSAoYnl0ZXMgPCBsZW4gJiYgYyA8IHN0ckxlbikge1xuICAgIHZhciBjaHIgPSBzdHIuY2hhckF0KGMpO1xuICAgIHZhciBjb2RlID0gY2hyLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIGlzSGlnaFN1cnJvZ2F0ZSA9IGNvZGUgPj0gMHhkODAwICYmIGNvZGUgPD0gMHhkYmZmO1xuICAgIHZhciBpc0xvd1N1cnJvZ2F0ZSA9IGNvZGUgPj0gMHhkYzAwICYmIGNvZGUgPD0gMHhkZmZmO1xuXG4gICAgaWYgKGVzY2FwZWRTdHJpbmcgJiYgY2hyID09PSAnXFxcXCcpIHtcbiAgICAgIGNociA9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoc3RyLnN1YnN0cihjICsgMSwgMiksIDE2KSk7XG4gICAgICBlc2NhcGVkQ2hhcnMrKztcblxuICAgICAgLy8gZWFjaCBlc2NhcGVkIHNlcXVlbmNlIGlzIDMgY2hhcmFjdGVycy4gR28gMiBjaGFycyBhaGVhZC5cbiAgICAgIC8vIHRoaXJkIGNoYXJhY3RlciB3aWxsIGJlIGp1bXBlZCBvdmVyIGEgZmV3IGxpbmVzIGxhdGVyXG4gICAgICBjICs9IDI7XG4gICAgfVxuXG4gICAgYysrO1xuXG4gICAgYnl0ZXMgKz0gaXNIaWdoU3Vycm9nYXRlIHx8IGlzTG93U3Vycm9nYXRlICYmIHdhc0hpZ2hTdXJyb2dhdGVcbiAgICAvLyBpZiBoaWdoIHN1cnJvZ2F0ZSwgY291bnQgMiBieXRlcywgYXMgZXhwZWN0YXRpb24gaXMgdG8gYmUgZm9sbG93ZWQgYnkgbG93IHN1cnJvZ2F0ZVxuICAgIC8vIGlmIGxvdyBzdXJyb2dhdGUgcHJlY2VkZWQgYnkgaGlnaCBzdXJyb2dhdGUsIGFkZCAyIGJ5dGVzXG4gICAgPyAyIDogY29kZSA+IDB4N2ZmXG4gICAgLy8gb3RoZXJ3aXNlIGxvdyBzdXJyb2dhdGUgZmFsbHMgaW50byB0aGlzIHBhcnRcbiAgICA/IDMgOiBjb2RlID4gMHg3ZiA/IDIgOiAxO1xuXG4gICAgLy8gaWYgaGlnaCBzdXJyb2dhdGUgaXMgbm90IGZvbGxvd2VkIGJ5IGxvdyBzdXJyb2dhdGUsIGFkZCAxIG1vcmUgYnl0ZVxuICAgIGJ5dGVzICs9IHdhc0hpZ2hTdXJyb2dhdGUgJiYgIWlzTG93U3Vycm9nYXRlID8gMSA6IDA7XG5cbiAgICBvdXQgKz0gY2hyO1xuICAgIHdhc0hpZ2hTdXJyb2dhdGUgPSBpc0hpZ2hTdXJyb2dhdGU7XG4gIH1cblxuICByZXR1cm4gW291dCwgYnl0ZXMsIGVzY2FwZWRDaGFyc107XG59XG5cbmZ1bmN0aW9uIGV4cGVjdFN0cmluZyhzdHIpIHtcbiAgLy8gUEhQIHN0cmluZ3MgY29uc2lzdCBvZiBvbmUtYnl0ZSBjaGFyYWN0ZXJzLlxuICAvLyBKUyB1c2VzIDIgYnl0ZXMgd2l0aCBwb3NzaWJsZSBzdXJyb2dhdGUgcGFpcnMuXG4gIC8vIFNlcmlhbGl6ZWQgbGVuZ3RoIG9mIDIgaXMgc3RpbGwgMSBKUyBzdHJpbmcgY2hhcmFjdGVyXG4gIHZhciByZVN0ckxlbmd0aCA9IC9eczooXFxkKyk6XCIvZzsgLy8gYWxzbyBtYXRjaCB0aGUgb3BlbmluZyBcIiBjaGFyXG5cbiAgdmFyIF9yZWY3ID0gcmVTdHJMZW5ndGguZXhlYyhzdHIpIHx8IFtdLFxuICAgICAgX3JlZjggPSBfc2xpY2VkVG9BcnJheShfcmVmNywgMiksXG4gICAgICBtYXRjaCA9IF9yZWY4WzBdLFxuICAgICAgYnl0ZUxlbk1hdGNoID0gX3JlZjhbMV07XG5cbiAgaWYgKCFtYXRjaCkge1xuICAgIHRocm93IFN5bnRheEVycm9yKCdFeHBlY3RlZCBhIHN0cmluZyB2YWx1ZScpO1xuICB9XG5cbiAgdmFyIGxlbiA9IHBhcnNlSW50KGJ5dGVMZW5NYXRjaCwgMTApO1xuXG4gIHN0ciA9IHN0ci5zdWJzdHIobWF0Y2gubGVuZ3RoKTtcblxuICB2YXIgX3JlYWRCeXRlcyA9IHJlYWRCeXRlcyhzdHIsIGxlbiksXG4gICAgICBfcmVhZEJ5dGVzMiA9IF9zbGljZWRUb0FycmF5KF9yZWFkQnl0ZXMsIDIpLFxuICAgICAgc3RyTWF0Y2ggPSBfcmVhZEJ5dGVzMlswXSxcbiAgICAgIGJ5dGVzID0gX3JlYWRCeXRlczJbMV07XG5cbiAgaWYgKGJ5dGVzICE9PSBsZW4pIHtcbiAgICB0aHJvdyBTeW50YXhFcnJvcignRXhwZWN0ZWQgc3RyaW5nIG9mICcgKyBsZW4gKyAnIGJ5dGVzLCBidXQgZ290ICcgKyBieXRlcyk7XG4gIH1cblxuICBzdHIgPSBzdHIuc3Vic3RyKHN0ck1hdGNoLmxlbmd0aCk7XG5cbiAgLy8gc3RyaWN0IHBhcnNpbmcsIG1hdGNoIGNsb3NpbmcgXCI7IGNoYXJzXG4gIGlmICghc3RyLnN0YXJ0c1dpdGgoJ1wiOycpKSB7XG4gICAgdGhyb3cgU3ludGF4RXJyb3IoJ0V4cGVjdGVkIFwiOycpO1xuICB9XG5cbiAgcmV0dXJuIFtzdHJNYXRjaCwgbWF0Y2gubGVuZ3RoICsgc3RyTWF0Y2gubGVuZ3RoICsgMl07IC8vIHNraXAgbGFzdCBcIjtcbn1cblxuZnVuY3Rpb24gZXhwZWN0RXNjYXBlZFN0cmluZyhzdHIpIHtcbiAgdmFyIHJlU3RyTGVuZ3RoID0gL15TOihcXGQrKTpcIi9nOyAvLyBhbHNvIG1hdGNoIHRoZSBvcGVuaW5nIFwiIGNoYXJcblxuICB2YXIgX3JlZjkgPSByZVN0ckxlbmd0aC5leGVjKHN0cikgfHwgW10sXG4gICAgICBfcmVmMTAgPSBfc2xpY2VkVG9BcnJheShfcmVmOSwgMiksXG4gICAgICBtYXRjaCA9IF9yZWYxMFswXSxcbiAgICAgIHN0ckxlbk1hdGNoID0gX3JlZjEwWzFdO1xuXG4gIGlmICghbWF0Y2gpIHtcbiAgICB0aHJvdyBTeW50YXhFcnJvcignRXhwZWN0ZWQgYW4gZXNjYXBlZCBzdHJpbmcgdmFsdWUnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBwYXJzZUludChzdHJMZW5NYXRjaCwgMTApO1xuXG4gIHN0ciA9IHN0ci5zdWJzdHIobWF0Y2gubGVuZ3RoKTtcblxuICB2YXIgX3JlYWRCeXRlczMgPSByZWFkQnl0ZXMoc3RyLCBsZW4sIHRydWUpLFxuICAgICAgX3JlYWRCeXRlczQgPSBfc2xpY2VkVG9BcnJheShfcmVhZEJ5dGVzMywgMyksXG4gICAgICBzdHJNYXRjaCA9IF9yZWFkQnl0ZXM0WzBdLFxuICAgICAgYnl0ZXMgPSBfcmVhZEJ5dGVzNFsxXSxcbiAgICAgIGVzY2FwZWRDaGFycyA9IF9yZWFkQnl0ZXM0WzJdO1xuXG4gIGlmIChieXRlcyAhPT0gbGVuKSB7XG4gICAgdGhyb3cgU3ludGF4RXJyb3IoJ0V4cGVjdGVkIGVzY2FwZWQgc3RyaW5nIG9mICcgKyBsZW4gKyAnIGJ5dGVzLCBidXQgZ290ICcgKyBieXRlcyk7XG4gIH1cblxuICBzdHIgPSBzdHIuc3Vic3RyKHN0ck1hdGNoLmxlbmd0aCArIGVzY2FwZWRDaGFycyAqIDIpO1xuXG4gIC8vIHN0cmljdCBwYXJzaW5nLCBtYXRjaCBjbG9zaW5nIFwiOyBjaGFyc1xuICBpZiAoIXN0ci5zdGFydHNXaXRoKCdcIjsnKSkge1xuICAgIHRocm93IFN5bnRheEVycm9yKCdFeHBlY3RlZCBcIjsnKTtcbiAgfVxuXG4gIHJldHVybiBbc3RyTWF0Y2gsIG1hdGNoLmxlbmd0aCArIHN0ck1hdGNoLmxlbmd0aCArIDJdOyAvLyBza2lwIGxhc3QgXCI7XG59XG5cbmZ1bmN0aW9uIGV4cGVjdEtleU9ySW5kZXgoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGV4cGVjdFN0cmluZyhzdHIpO1xuICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZXhwZWN0RXNjYXBlZFN0cmluZyhzdHIpO1xuICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZXhwZWN0SW50KHN0cik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IFN5bnRheEVycm9yKCdFeHBlY3RlZCBrZXkgb3IgaW5kZXgnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBleHBlY3RPYmplY3Qoc3RyLCBjYWNoZSkge1xuICAvLyBPOjxjbGFzcyBuYW1lIGxlbmd0aD46XCJjbGFzcyBuYW1lXCI6PHByb3AgY291bnQ+Ons8cHJvcHMgYW5kIHZhbHVlcz59XG4gIC8vIE86ODpcInN0ZENsYXNzXCI6Mjp7czozOlwiZm9vXCI7czozOlwiYmFyXCI7czozOlwiYmFyXCI7czozOlwiYmF6XCI7fVxuICB2YXIgcmVPYmplY3RMaXRlcmFsID0gL15POihcXGQrKTpcIihbXlwiXSspXCI6KFxcZCspOlxcey87XG5cbiAgdmFyIF9yZWYxMSA9IHJlT2JqZWN0TGl0ZXJhbC5leGVjKHN0cikgfHwgW10sXG4gICAgICBfcmVmMTIgPSBfc2xpY2VkVG9BcnJheShfcmVmMTEsIDQpLFxuICAgICAgb2JqZWN0TGl0ZXJhbEJlZ2luTWF0Y2ggPSBfcmVmMTJbMF0sXG4gICAgICAvKiBjbGFzc05hbWVMZW5ndGhNYXRjaCAqL2NsYXNzTmFtZSA9IF9yZWYxMlsyXSxcbiAgICAgIHByb3BDb3VudE1hdGNoID0gX3JlZjEyWzNdO1xuXG4gIGlmICghb2JqZWN0TGl0ZXJhbEJlZ2luTWF0Y2gpIHtcbiAgICB0aHJvdyBTeW50YXhFcnJvcignSW52YWxpZCBpbnB1dCcpO1xuICB9XG5cbiAgaWYgKGNsYXNzTmFtZSAhPT0gJ3N0ZENsYXNzJykge1xuICAgIHRocm93IFN5bnRheEVycm9yKCdVbnN1cHBvcnRlZCBvYmplY3QgdHlwZTogJyArIGNsYXNzTmFtZSk7XG4gIH1cblxuICB2YXIgdG90YWxPZmZzZXQgPSBvYmplY3RMaXRlcmFsQmVnaW5NYXRjaC5sZW5ndGg7XG5cbiAgdmFyIHByb3BDb3VudCA9IHBhcnNlSW50KHByb3BDb3VudE1hdGNoLCAxMCk7XG4gIHZhciBvYmogPSB7fTtcbiAgY2FjaGUoW29ial0pO1xuXG4gIHN0ciA9IHN0ci5zdWJzdHIodG90YWxPZmZzZXQpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcENvdW50OyBpKyspIHtcbiAgICB2YXIgcHJvcCA9IGV4cGVjdEtleU9ySW5kZXgoc3RyKTtcbiAgICBzdHIgPSBzdHIuc3Vic3RyKHByb3BbMV0pO1xuICAgIHRvdGFsT2Zmc2V0ICs9IHByb3BbMV07XG5cbiAgICB2YXIgdmFsdWUgPSBleHBlY3RUeXBlKHN0ciwgY2FjaGUpO1xuICAgIHN0ciA9IHN0ci5zdWJzdHIodmFsdWVbMV0pO1xuICAgIHRvdGFsT2Zmc2V0ICs9IHZhbHVlWzFdO1xuXG4gICAgb2JqW3Byb3BbMF1dID0gdmFsdWVbMF07XG4gIH1cblxuICAvLyBzdHJpY3QgcGFyc2luZywgZXhwZWN0IH0gYWZ0ZXIgb2JqZWN0IGxpdGVyYWxcbiAgaWYgKHN0ci5jaGFyQXQoMCkgIT09ICd9Jykge1xuICAgIHRocm93IFN5bnRheEVycm9yKCdFeHBlY3RlZCB9Jyk7XG4gIH1cblxuICByZXR1cm4gW29iaiwgdG90YWxPZmZzZXQgKyAxXTsgLy8gc2tpcCBmaW5hbCB9XG59XG5cbmZ1bmN0aW9uIGV4cGVjdENsYXNzKHN0ciwgY2FjaGUpIHtcbiAgLy8gY2FuJ3QgYmUgd2VsbCBzdXBwb3J0ZWQsIGJlY2F1c2UgcmVxdWlyZXMgY2FsbGluZyBldmFsIChvciBzaW1pbGFyKVxuICAvLyBpbiBvcmRlciB0byBjYWxsIHNlcmlhbGl6ZWQgY29uc3RydWN0b3IgbmFtZVxuICAvLyB3aGljaCBpcyB1bnNhZmVcbiAgLy8gb3IgYXNzdW1lIHRoYXQgY29uc3RydWN0b3IgaXMgZGVmaW5lZCBpbiBnbG9iYWwgc2NvcGVcbiAgLy8gYnV0IHRoaXMgaXMgdG9vIG11Y2ggbGltaXRpbmdcbiAgdGhyb3cgRXJyb3IoJ05vdCB5ZXQgaW1wbGVtZW50ZWQnKTtcbn1cblxuZnVuY3Rpb24gZXhwZWN0UmVmZXJlbmNlKHN0ciwgY2FjaGUpIHtcbiAgdmFyIHJlUmVmID0gL15bclJdOihbMS05XVxcZCopOy87XG5cbiAgdmFyIF9yZWYxMyA9IHJlUmVmLmV4ZWMoc3RyKSB8fCBbXSxcbiAgICAgIF9yZWYxNCA9IF9zbGljZWRUb0FycmF5KF9yZWYxMywgMiksXG4gICAgICBtYXRjaCA9IF9yZWYxNFswXSxcbiAgICAgIHJlZkluZGV4ID0gX3JlZjE0WzFdO1xuXG4gIGlmICghbWF0Y2gpIHtcbiAgICB0aHJvdyBTeW50YXhFcnJvcignRXhwZWN0ZWQgcmVmZXJlbmNlIHZhbHVlJyk7XG4gIH1cblxuICByZXR1cm4gW2NhY2hlLmdldChwYXJzZUludChyZWZJbmRleCwgMTApIC0gMSksIG1hdGNoLmxlbmd0aF07XG59XG5cbmZ1bmN0aW9uIGV4cGVjdEFycmF5KHN0ciwgY2FjaGUpIHtcbiAgdmFyIHJlQXJyYXlMZW5ndGggPSAvXmE6KFxcZCspOnsvO1xuXG4gIHZhciBfcmVmMTUgPSByZUFycmF5TGVuZ3RoLmV4ZWMoc3RyKSB8fCBbXSxcbiAgICAgIF9yZWYxNiA9IF9zbGljZWRUb0FycmF5KF9yZWYxNSwgMiksXG4gICAgICBhcnJheUxpdGVyYWxCZWdpbk1hdGNoID0gX3JlZjE2WzBdLFxuICAgICAgYXJyYXlMZW5ndGhNYXRjaCA9IF9yZWYxNlsxXTtcblxuICBpZiAoIWFycmF5TGVuZ3RoTWF0Y2gpIHtcbiAgICB0aHJvdyBTeW50YXhFcnJvcignRXhwZWN0ZWQgYXJyYXkgbGVuZ3RoIGFubm90YXRpb24nKTtcbiAgfVxuXG4gIHN0ciA9IHN0ci5zdWJzdHIoYXJyYXlMaXRlcmFsQmVnaW5NYXRjaC5sZW5ndGgpO1xuXG4gIHZhciBhcnJheSA9IGV4cGVjdEFycmF5SXRlbXMoc3RyLCBwYXJzZUludChhcnJheUxlbmd0aE1hdGNoLCAxMCksIGNhY2hlKTtcblxuICAvLyBzdHJpY3QgcGFyc2luZywgZXhwZWN0IGNsb3NpbmcgfSBicmFjZSBhZnRlciBhcnJheSBsaXRlcmFsXG4gIGlmIChzdHIuY2hhckF0KGFycmF5WzFdKSAhPT0gJ30nKSB7XG4gICAgdGhyb3cgU3ludGF4RXJyb3IoJ0V4cGVjdGVkIH0nKTtcbiAgfVxuXG4gIHJldHVybiBbYXJyYXlbMF0sIGFycmF5TGl0ZXJhbEJlZ2luTWF0Y2gubGVuZ3RoICsgYXJyYXlbMV0gKyAxXTsgLy8ganVtcCBvdmVyIH1cbn1cblxuZnVuY3Rpb24gZXhwZWN0QXJyYXlJdGVtcyhzdHIpIHtcbiAgdmFyIGV4cGVjdGVkSXRlbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIHZhciBjYWNoZSA9IGFyZ3VtZW50c1syXTtcblxuICB2YXIga2V5ID0gdm9pZCAwO1xuICB2YXIgaGFzU3RyaW5nS2V5cyA9IGZhbHNlO1xuICB2YXIgaXRlbSA9IHZvaWQgMDtcbiAgdmFyIHRvdGFsT2Zmc2V0ID0gMDtcbiAgdmFyIGl0ZW1zID0gW107XG4gIGNhY2hlKFtpdGVtc10pO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRJdGVtczsgaSsrKSB7XG4gICAga2V5ID0gZXhwZWN0S2V5T3JJbmRleChzdHIpO1xuXG4gICAgLy8gdGhpcyBpcyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIHByZXZpb3VzIGltcGxlbWVudGF0aW9uXG4gICAgaWYgKCFoYXNTdHJpbmdLZXlzKSB7XG4gICAgICBoYXNTdHJpbmdLZXlzID0gdHlwZW9mIGtleVswXSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuXG4gICAgc3RyID0gc3RyLnN1YnN0cihrZXlbMV0pO1xuICAgIHRvdGFsT2Zmc2V0ICs9IGtleVsxXTtcblxuICAgIC8vIHJlZmVyZW5jZXMgYXJlIHJlc29sdmVkIGltbWVkaWF0ZWx5LCBzbyBpZiBkdXBsaWNhdGUga2V5IG92ZXJ3cml0ZXMgcHJldmlvdXMgYXJyYXkgaW5kZXhcbiAgICAvLyB0aGUgb2xkIHZhbHVlIGlzIGFueXdheSByZXNvbHZlZFxuICAgIC8vIGZpeG1lOiBidXQgbmV4dCB0aW1lIHRoZSBzYW1lIHJlZmVyZW5jZSBzaG91bGQgcG9pbnQgdG8gdGhlIG5ldyB2YWx1ZVxuICAgIGl0ZW0gPSBleHBlY3RUeXBlKHN0ciwgY2FjaGUpO1xuICAgIHN0ciA9IHN0ci5zdWJzdHIoaXRlbVsxXSk7XG4gICAgdG90YWxPZmZzZXQgKz0gaXRlbVsxXTtcblxuICAgIGl0ZW1zW2tleVswXV0gPSBpdGVtWzBdO1xuICB9XG5cbiAgLy8gdGhpcyBpcyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIHByZXZpb3VzIGltcGxlbWVudGF0aW9uXG4gIGlmIChoYXNTdHJpbmdLZXlzKSB7XG4gICAgaXRlbXMgPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtcyk7XG4gIH1cblxuICByZXR1cm4gW2l0ZW1zLCB0b3RhbE9mZnNldF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdW5zZXJpYWxpemUoc3RyKSB7XG4gIC8vICAgICAgIGRpc2N1c3MgYXQ6IGh0dHBzOi8vbG9jdXR1cy5pby9waHAvdW5zZXJpYWxpemUvXG4gIC8vICAgICAgb3JpZ2luYWwgYnk6IEFycGFkIFJheSAobWFpbHRvOmFycGFkQHBocC5uZXQpXG4gIC8vICAgICAgaW1wcm92ZWQgYnk6IFBlZHJvIFRhaW5oYSAoaHR0cHM6Ly93d3cucGVkcm90YWluaGEuY29tKVxuICAvLyAgICAgIGltcHJvdmVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwczovL2t2ei5pbylcbiAgLy8gICAgICBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8pXG4gIC8vICAgICAgaW1wcm92ZWQgYnk6IENocmlzXG4gIC8vICAgICAgaW1wcm92ZWQgYnk6IEphbWVzXG4gIC8vICAgICAgaW1wcm92ZWQgYnk6IExlIFRvcmJpXG4gIC8vICAgICAgaW1wcm92ZWQgYnk6IEVsaSBTa2VnZ3NcbiAgLy8gICAgICBidWdmaXhlZCBieTogZHB0cjE5ODhcbiAgLy8gICAgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cHM6Ly9rdnouaW8pXG4gIC8vICAgICAgYnVnZml4ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIGJ1Z2ZpeGVkIGJ5OiBwaGlsaXBwc2ltb24gKGh0dHBzOi8vZ2l0aHViLmNvbS9waGlsaXBwc2ltb24vKVxuICAvLyAgICAgICByZXZpc2VkIGJ5OiBkM3hcbiAgLy8gICAgICAgICBpbnB1dCBieTogQnJldHQgWmFtaXIgKGh0dHBzOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgICAgICAgaW5wdXQgYnk6IE1hcnRpbiAoaHR0cHM6Ly93d3cuZXJsZW53aWVzZS5kZS8pXG4gIC8vICAgICAgICAgaW5wdXQgYnk6IGtpbG9wc1xuICAvLyAgICAgICAgIGlucHV0IGJ5OiBKYXJvc2xhdyBDemFybmlha1xuICAvLyAgICAgICAgIGlucHV0IGJ5OiBsb3Zhc29hIChodHRwczovL2dpdGh1Yi5jb20vbG92YXNvYS8pXG4gIC8vICAgICAgaW1wcm92ZWQgYnk6IFJhZmHFgiBLdWthd3NraVxuICAvLyByZWltcGxlbWVudGVkIGJ5OiBSYWZhxYIgS3VrYXdza2lcbiAgLy8gICAgICAgICAgIG5vdGUgMTogV2UgZmVlbCB0aGUgbWFpbiBwdXJwb3NlIG9mIHRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gIC8vICAgICAgICAgICBub3RlIDE6IHRvIGVhc2UgdGhlIHRyYW5zcG9ydCBvZiBkYXRhIGJldHdlZW4gcGhwICYganNcbiAgLy8gICAgICAgICAgIG5vdGUgMTogQWltaW5nIGZvciBQSFAtY29tcGF0aWJpbGl0eSwgd2UgaGF2ZSB0byB0cmFuc2xhdGUgb2JqZWN0cyB0byBhcnJheXNcbiAgLy8gICAgICAgIGV4YW1wbGUgMTogdW5zZXJpYWxpemUoJ2E6Mzp7aTowO3M6NTpcIktldmluXCI7aToxO3M6MzpcInZhblwiO2k6MjtzOjk6XCJab25uZXZlbGRcIjt9JylcbiAgLy8gICAgICAgIHJldHVybnMgMTogWydLZXZpbicsICd2YW4nLCAnWm9ubmV2ZWxkJ11cbiAgLy8gICAgICAgIGV4YW1wbGUgMjogdW5zZXJpYWxpemUoJ2E6Mjp7czo5OlwiZmlyc3ROYW1lXCI7czo1OlwiS2V2aW5cIjtzOjc6XCJtaWROYW1lXCI7czozOlwidmFuXCI7fScpXG4gIC8vICAgICAgICByZXR1cm5zIDI6IHtmaXJzdE5hbWU6ICdLZXZpbicsIG1pZE5hbWU6ICd2YW4nfVxuICAvLyAgICAgICAgZXhhbXBsZSAzOiB1bnNlcmlhbGl6ZSgnYTozOntzOjI6XCLDvFwiO3M6MjpcIsO8XCI7czozOlwi5ZubXCI7czozOlwi5ZubXCI7czo0Olwi8KCcjlwiO3M6NDpcIvCgnI5cIjt9JylcbiAgLy8gICAgICAgIHJldHVybnMgMzogeyfDvCc6ICfDvCcsICflm5snOiAn5ZubJywgJ/CgnI4nOiAn8KCcjid9XG4gIC8vICAgICAgICBleGFtcGxlIDQ6IHVuc2VyaWFsaXplKHVuZGVmaW5lZClcbiAgLy8gICAgICAgIHJldHVybnMgNDogZmFsc2VcbiAgLy8gICAgICAgIGV4YW1wbGUgNTogdW5zZXJpYWxpemUoJ086ODpcInN0ZENsYXNzXCI6MTp7czozOlwiZm9vXCI7YjoxO30nKVxuICAvLyAgICAgICAgcmV0dXJucyA1OiB7IGZvbzogdHJ1ZSB9XG4gIC8vICAgICAgICBleGFtcGxlIDY6IHVuc2VyaWFsaXplKCdhOjI6e2k6MDtOO2k6MTtzOjA6XCJcIjt9JylcbiAgLy8gICAgICAgIHJldHVybnMgNjogW251bGwsIFwiXCJdXG4gIC8vICAgICAgICBleGFtcGxlIDc6IHVuc2VyaWFsaXplKCdTOjc6XCJcXFxcNjVcXFxcNzNcXFxcNjNcXFxcNjFcXFxcNzBcXFxcNjVcXFxcNjRcIjsnKVxuICAvLyAgICAgICAgcmV0dXJucyA3OiAnZXNjYXBlZCdcblxuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBleHBlY3RUeXBlKHN0ciwgaW5pdENhY2hlKCkpWzBdO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5zZXJpYWxpemUuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdmFyX2R1bXAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwczovL2xvY3V0dXMuaW8vcGhwL3Zhcl9kdW1wL1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHBzOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGltcHJvdmVkIGJ5OiBaYWhsaWlcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogRm9yIHJldHVybmluZyBhIHN0cmluZywgdXNlIHZhcl9leHBvcnQoKSB3aXRoIHRoZSBzZWNvbmQgYXJndW1lbnQgc2V0IHRvIHRydWVcbiAgLy8gICAgICAgIHRlc3Q6IHNraXAtYWxsXG4gIC8vICAgZXhhbXBsZSAxOiB2YXJfZHVtcCgxKVxuICAvLyAgIHJldHVybnMgMTogJ2ludCgxKSdcblxuICB2YXIgZWNobyA9IHJlcXVpcmUoJy4uL3N0cmluZ3MvZWNobycpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIHZhciBwYWRDaGFyID0gJyAnO1xuICB2YXIgcGFkVmFsID0gNDtcbiAgdmFyIGxndGggPSAwO1xuICB2YXIgaSA9IDA7XG5cbiAgdmFyIF9nZXRGdW5jTmFtZSA9IGZ1bmN0aW9uIF9nZXRGdW5jTmFtZShmbikge1xuICAgIHZhciBuYW1lID0gL1xcVypmdW5jdGlvblxccysoW1xcdyRdKylcXHMqXFwoLy5leGVjKGZuKTtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiAnKEFub255bW91cyknO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZVsxXTtcbiAgfTtcblxuICB2YXIgX3JlcGVhdENoYXIgPSBmdW5jdGlvbiBfcmVwZWF0Q2hhcihsZW4sIHBhZENoYXIpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxlbjsgX2krKykge1xuICAgICAgc3RyICs9IHBhZENoYXI7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH07XG4gIHZhciBfZ2V0SW5uZXJWYWwgPSBmdW5jdGlvbiBfZ2V0SW5uZXJWYWwodmFsLCB0aGlja1BhZCkge1xuICAgIHZhciByZXQgPSAnJztcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXQgPSAnTlVMTCc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldCA9ICdib29sKCcgKyB2YWwgKyAnKSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0ID0gJ3N0cmluZygnICsgdmFsLmxlbmd0aCArICcpIFwiJyArIHZhbCArICdcIic7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKHBhcnNlRmxvYXQodmFsKSA9PT0gcGFyc2VJbnQodmFsLCAxMCkpIHtcbiAgICAgICAgcmV0ID0gJ2ludCgnICsgdmFsICsgJyknO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJ2Zsb2F0KCcgKyB2YWwgKyAnKSc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGhlIHJlbWFpbmluZyBhcmUgbm90IFBIUCBiZWhhdmlvciBiZWNhdXNlIHRoZXNlIHZhbHVlc1xuICAgICAgLy8gb25seSBleGlzdCBpbiB0aGlzIGV4YWN0IGZvcm0gaW4gSmF2YVNjcmlwdFxuICAgICAgcmV0ID0gJ3VuZGVmaW5lZCc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgZnVuY0xpbmVzID0gdmFsLnRvU3RyaW5nKCkuc3BsaXQoJ1xcbicpO1xuICAgICAgcmV0ID0gJyc7XG4gICAgICBmb3IgKHZhciBfaTIgPSAwLCBmbGwgPSBmdW5jTGluZXMubGVuZ3RoOyBfaTIgPCBmbGw7IF9pMisrKSB7XG4gICAgICAgIHJldCArPSAoX2kyICE9PSAwID8gJ1xcbicgKyB0aGlja1BhZCA6ICcnKSArIGZ1bmNMaW5lc1tfaTJdO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0ID0gJ0RhdGUoJyArIHZhbCArICcpJztcbiAgICB9IGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0ID0gJ1JlZ0V4cCgnICsgdmFsICsgJyknO1xuICAgIH0gZWxzZSBpZiAodmFsLm5vZGVOYW1lKSB7XG4gICAgICAvLyBEaWZmZXJlbnQgdGhhbiBQSFAncyBET01FbGVtZW50XG4gICAgICBzd2l0Y2ggKHZhbC5ub2RlVHlwZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWwubmFtZXNwYWNlVVJJID09PSAndW5kZWZpbmVkJyB8fCB2YWwubmFtZXNwYWNlVVJJID09PSAnaHR0cHM6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnKSB7XG4gICAgICAgICAgICAvLyBVbmRlZmluZWQgbmFtZXNwYWNlIGNvdWxkIGJlIHBsYWluIFhNTCwgYnV0IG5hbWVzcGFjZVVSSSBub3Qgd2lkZWx5IHN1cHBvcnRlZFxuICAgICAgICAgICAgcmV0ID0gJ0hUTUxFbGVtZW50KFwiJyArIHZhbC5ub2RlTmFtZSArICdcIiknO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXQgPSAnWE1MIEVsZW1lbnQoXCInICsgdmFsLm5vZGVOYW1lICsgJ1wiKSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgcmV0ID0gJ0FUVFJJQlVURV9OT0RFKCcgKyB2YWwubm9kZU5hbWUgKyAnKSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICByZXQgPSAnVEVYVF9OT0RFKCcgKyB2YWwubm9kZVZhbHVlICsgJyknO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgcmV0ID0gJ0NEQVRBX1NFQ1RJT05fTk9ERSgnICsgdmFsLm5vZGVWYWx1ZSArICcpJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIHJldCA9ICdFTlRJVFlfUkVGRVJFTkNFX05PREUnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgcmV0ID0gJ0VOVElUWV9OT0RFJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgIHJldCA9ICdQUk9DRVNTSU5HX0lOU1RSVUNUSU9OX05PREUoJyArIHZhbC5ub2RlTmFtZSArICc6JyArIHZhbC5ub2RlVmFsdWUgKyAnKSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICByZXQgPSAnQ09NTUVOVF9OT0RFKCcgKyB2YWwubm9kZVZhbHVlICsgJyknO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgcmV0ID0gJ0RPQ1VNRU5UX05PREUnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgIHJldCA9ICdET0NVTUVOVF9UWVBFX05PREUnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDExOlxuICAgICAgICAgIHJldCA9ICdET0NVTUVOVF9GUkFHTUVOVF9OT0RFJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICByZXQgPSAnTk9UQVRJT05fTk9ERSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgdmFyIF9mb3JtYXRBcnJheSA9IGZ1bmN0aW9uIF9mb3JtYXRBcnJheShvYmosIGN1ckRlcHRoLCBwYWRWYWwsIHBhZENoYXIpIHtcbiAgICBpZiAoY3VyRGVwdGggPiAwKSB7XG4gICAgICBjdXJEZXB0aCsrO1xuICAgIH1cblxuICAgIHZhciBiYXNlUGFkID0gX3JlcGVhdENoYXIocGFkVmFsICogKGN1ckRlcHRoIC0gMSksIHBhZENoYXIpO1xuICAgIHZhciB0aGlja1BhZCA9IF9yZXBlYXRDaGFyKHBhZFZhbCAqIChjdXJEZXB0aCArIDEpLCBwYWRDaGFyKTtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgdmFyIHZhbCA9ICcnO1xuXG4gICAgaWYgKCh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmopKSA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsKSB7XG4gICAgICBpZiAob2JqLmNvbnN0cnVjdG9yICYmIF9nZXRGdW5jTmFtZShvYmouY29uc3RydWN0b3IpID09PSAnTE9DVVRVU19SZXNvdXJjZScpIHtcbiAgICAgICAgcmV0dXJuIG9iai52YXJfZHVtcCgpO1xuICAgICAgfVxuICAgICAgbGd0aCA9IDA7XG4gICAgICBmb3IgKHZhciBzb21lUHJvcCBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShzb21lUHJvcCkpIHtcbiAgICAgICAgICBsZ3RoKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0ciArPSAnYXJyYXkoJyArIGxndGggKyAnKSB7XFxuJztcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgdmFyIG9ialZhbCA9IG9ialtrZXldO1xuICAgICAgICBpZiAoKHR5cGVvZiBvYmpWYWwgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9ialZhbCkpID09PSAnb2JqZWN0JyAmJiBvYmpWYWwgIT09IG51bGwgJiYgIShvYmpWYWwgaW5zdGFuY2VvZiBEYXRlKSAmJiAhKG9ialZhbCBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgIW9ialZhbC5ub2RlTmFtZSkge1xuICAgICAgICAgIHN0ciArPSB0aGlja1BhZDtcbiAgICAgICAgICBzdHIgKz0gJ1snO1xuICAgICAgICAgIHN0ciArPSBrZXk7XG4gICAgICAgICAgc3RyICs9ICddID0+XFxuJztcbiAgICAgICAgICBzdHIgKz0gdGhpY2tQYWQ7XG4gICAgICAgICAgc3RyICs9IF9mb3JtYXRBcnJheShvYmpWYWwsIGN1ckRlcHRoICsgMSwgcGFkVmFsLCBwYWRDaGFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWwgPSBfZ2V0SW5uZXJWYWwob2JqVmFsLCB0aGlja1BhZCk7XG4gICAgICAgICAgc3RyICs9IHRoaWNrUGFkO1xuICAgICAgICAgIHN0ciArPSAnWyc7XG4gICAgICAgICAgc3RyICs9IGtleTtcbiAgICAgICAgICBzdHIgKz0gJ10gPT5cXG4nO1xuICAgICAgICAgIHN0ciArPSB0aGlja1BhZDtcbiAgICAgICAgICBzdHIgKz0gdmFsO1xuICAgICAgICAgIHN0ciArPSAnXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3RyICs9IGJhc2VQYWQgKyAnfVxcbic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IF9nZXRJbm5lclZhbChvYmosIHRoaWNrUGFkKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcblxuICBvdXRwdXQgPSBfZm9ybWF0QXJyYXkoYXJndW1lbnRzWzBdLCAwLCBwYWRWYWwsIHBhZENoYXIpO1xuICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0ICs9ICdcXG4nICsgX2Zvcm1hdEFycmF5KGFyZ3VtZW50c1tpXSwgMCwgcGFkVmFsLCBwYWRDaGFyKTtcbiAgfVxuXG4gIGVjaG8ob3V0cHV0KTtcblxuICAvLyBOb3QgaG93IFBIUCBkb2VzIGl0LCBidXQgaGVscHMgdXMgdGVzdDpcbiAgcmV0dXJuIG91dHB1dDtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD12YXJfZHVtcC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YXJfZXhwb3J0KG1peGVkRXhwcmVzc2lvbiwgYm9vbFJldHVybikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cHM6Ly9sb2N1dHVzLmlvL3BocC92YXJfZXhwb3J0L1xuICAvLyBvcmlnaW5hbCBieTogUGhpbGlwIFBldGVyc29uXG4gIC8vIGltcHJvdmVkIGJ5OiBqb2hucmVtYm9cbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICBpbnB1dCBieTogQnJpYW4gVGFmb3lhIChodHRwczovL3d3dy5wcmVtYXNvbHV0aW9ucy5jb20vKVxuICAvLyAgICBpbnB1dCBieTogSGFucyBIZW5yaWsgKGh0dHBzOi8vaGFuc2hlbnJpay50ay8pXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cHM6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gYnVnZml4ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwczovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBidWdmaXhlZCBieTogc2ltaXZhciAoaHR0cHM6Ly9naXRodWIuY29tL3NpbWl2YXIpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBzaW1pdmFyIChodHRwczovL2dpdGh1Yi5jb20vc2ltaXZhcilcbiAgLy8gYnVnZml4ZWQgYnk6IHNpbWl2YXIgKGh0dHBzOi8vZ2l0aHViLmNvbS9zaW1pdmFyKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyX2V4cG9ydChudWxsKVxuICAvLyAgIHJldHVybnMgMTogbnVsbFxuICAvLyAgIGV4YW1wbGUgMjogdmFyX2V4cG9ydCh7MDogJ0tldmluJywgMTogJ3ZhbicsIDI6ICdab25uZXZlbGQnfSwgdHJ1ZSlcbiAgLy8gICByZXR1cm5zIDI6IFwiYXJyYXkgKFxcbiAgMCA9PiAnS2V2aW4nLFxcbiAgMSA9PiAndmFuJyxcXG4gIDIgPT4gJ1pvbm5ldmVsZCcsXFxuKVwiXG4gIC8vICAgZXhhbXBsZSAzOiB2YXIgZGF0YSA9ICdLZXZpbidcbiAgLy8gICBleGFtcGxlIDM6IHZhcl9leHBvcnQoZGF0YSwgdHJ1ZSlcbiAgLy8gICByZXR1cm5zIDM6IFwiJ0tldmluJ1wiXG4gIC8vICAgZXhhbXBsZSA0OiB2YXJfZXhwb3J0KHswOiAnS2V2aW4nLCAxOiAndmFuJywgJ2xhc3ROYW1lJzogJ1pvbm5ldmVsZCd9LCB0cnVlKVxuICAvLyAgIHJldHVybnMgNDogXCJhcnJheSAoXFxuICAwID0+ICdLZXZpbicsXFxuICAxID0+ICd2YW4nLFxcbiAgJ2xhc3ROYW1lJyA9PiAnWm9ubmV2ZWxkJyxcXG4pXCJcbiAgLy8gICBleGFtcGxlIDU6IHZhcl9leHBvcnQoW10sIHRydWUpXG4gIC8vICAgcmV0dXJucyA1OiBcImFycmF5IChcXG4pXCJcbiAgLy8gICBleGFtcGxlIDY6IHZhcl9leHBvcnQoeyB0ZXN0OiBbICdhJywgJ2InIF0gfSwgdHJ1ZSlcbiAgLy8gICByZXR1cm5zIDY6IFwiYXJyYXkgKFxcbiAgJ3Rlc3QnID0+XFxuICBhcnJheSAoXFxuICAgIDAgPT4gJ2EnLFxcbiAgICAxID0+ICdiJyxcXG4gICksXFxuKVwiXG5cbiAgdmFyIGVjaG8gPSByZXF1aXJlKCcuLi9zdHJpbmdzL2VjaG8nKTtcbiAgdmFyIHJldHN0ciA9ICcnO1xuICB2YXIgaXJldCA9ICcnO1xuICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gIHZhciBjbnQgPSAwO1xuICB2YXIgeCA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBmdW5jUGFydHMgPSBbXTtcbiAgLy8gV2UgdXNlIHRoZSBsYXN0IGFyZ3VtZW50IChub3QgcGFydCBvZiBQSFApIHRvIHBhc3MgaW5cbiAgLy8gb3VyIGluZGVudGF0aW9uIGxldmVsXG4gIHZhciBpZHRMZXZlbCA9IGFyZ3VtZW50c1syXSB8fCAyO1xuICB2YXIgaW5uZXJJbmRlbnQgPSAnJztcbiAgdmFyIG91dGVySW5kZW50ID0gJyc7XG4gIHZhciBnZXRGdW5jTmFtZSA9IGZ1bmN0aW9uIGdldEZ1bmNOYW1lKGZuKSB7XG4gICAgdmFyIG5hbWUgPSAvXFxXKmZ1bmN0aW9uXFxzKyhbXFx3JF0rKVxccypcXCgvLmV4ZWMoZm4pO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICcoQW5vbnltb3VzKSc7XG4gICAgfVxuICAgIHJldHVybiBuYW1lWzFdO1xuICB9O1xuXG4gIHZhciBfaXNOb3JtYWxJbnRlZ2VyID0gZnVuY3Rpb24gX2lzTm9ybWFsSW50ZWdlcihzdHJpbmcpIHtcbiAgICB2YXIgbnVtYmVyID0gTWF0aC5mbG9vcihOdW1iZXIoc3RyaW5nKSk7XG4gICAgcmV0dXJuIG51bWJlciAhPT0gSW5maW5pdHkgJiYgU3RyaW5nKG51bWJlcikgPT09IHN0cmluZyAmJiBudW1iZXIgPj0gMDtcbiAgfTtcblxuICB2YXIgX21ha2VJbmRlbnQgPSBmdW5jdGlvbiBfbWFrZUluZGVudChpZHRMZXZlbCkge1xuICAgIHJldHVybiBuZXcgQXJyYXkoaWR0TGV2ZWwgKyAxKS5qb2luKCcgJyk7XG4gIH07XG4gIHZhciBfX2dldFR5cGUgPSBmdW5jdGlvbiBfX2dldFR5cGUoaW5wKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBtYXRjaCA9IHZvaWQgMDtcbiAgICB2YXIgdHlwZXMgPSB2b2lkIDA7XG4gICAgdmFyIGNvbnMgPSB2b2lkIDA7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgaW5wID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihpbnApO1xuICAgIGlmICh0eXBlID09PSAnb2JqZWN0JyAmJiBpbnAgJiYgaW5wLmNvbnN0cnVjdG9yICYmIGdldEZ1bmNOYW1lKGlucC5jb25zdHJ1Y3RvcikgPT09ICdMT0NVVFVTX1Jlc291cmNlJykge1xuICAgICAgcmV0dXJuICdyZXNvdXJjZSc7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gJ2Z1bmN0aW9uJztcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdvYmplY3QnICYmICFpbnApIHtcbiAgICAgIC8vIFNob3VsZCB0aGlzIGJlIGp1c3QgbnVsbD9cbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKCFpbnAuY29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgICAgfVxuICAgICAgY29ucyA9IGlucC5jb25zdHJ1Y3Rvci50b1N0cmluZygpO1xuICAgICAgbWF0Y2ggPSBjb25zLm1hdGNoKC8oXFx3KylcXCgvKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBjb25zID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgIH1cbiAgICAgIHR5cGVzID0gWydib29sZWFuJywgJ251bWJlcicsICdzdHJpbmcnLCAnYXJyYXknXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY29ucyA9PT0gdHlwZXNbaV0pIHtcbiAgICAgICAgICB0eXBlID0gdHlwZXNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHR5cGU7XG4gIH07XG4gIHZhciB0eXBlID0gX19nZXRUeXBlKG1peGVkRXhwcmVzc2lvbik7XG5cbiAgaWYgKHR5cGUgPT09IG51bGwpIHtcbiAgICByZXRzdHIgPSAnTlVMTCc7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FycmF5JyB8fCB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIG91dGVySW5kZW50ID0gX21ha2VJbmRlbnQoaWR0TGV2ZWwgLSAyKTtcbiAgICBpbm5lckluZGVudCA9IF9tYWtlSW5kZW50KGlkdExldmVsKTtcbiAgICBmb3IgKGkgaW4gbWl4ZWRFeHByZXNzaW9uKSB7XG4gICAgICB2YWx1ZSA9ICcgJztcbiAgICAgIHZhciBzdWJ0eXBlID0gX19nZXRUeXBlKG1peGVkRXhwcmVzc2lvbltpXSk7XG4gICAgICBpZiAoc3VidHlwZSA9PT0gJ2FycmF5JyB8fCBzdWJ0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YWx1ZSA9ICdcXG4nO1xuICAgICAgfVxuICAgICAgdmFsdWUgKz0gdmFyX2V4cG9ydChtaXhlZEV4cHJlc3Npb25baV0sIDEsIGlkdExldmVsICsgMik7XG4gICAgICBpID0gX2lzTm9ybWFsSW50ZWdlcihpKSA/IGkgOiAnXFwnJyArIGkgKyAnXFwnJztcbiAgICAgIHhbY250KytdID0gaW5uZXJJbmRlbnQgKyBpICsgJyA9PicgKyB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHgubGVuZ3RoID4gMCkge1xuICAgICAgaXJldCA9IHguam9pbignLFxcbicpICsgJyxcXG4nO1xuICAgIH1cbiAgICByZXRzdHIgPSBvdXRlckluZGVudCArICdhcnJheSAoXFxuJyArIGlyZXQgKyBvdXRlckluZGVudCArICcpJztcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZnVuY1BhcnRzID0gbWl4ZWRFeHByZXNzaW9uLnRvU3RyaW5nKCkubWF0Y2goL2Z1bmN0aW9uIC4qP1xcKCguKj8pXFwpIFxceyhbXFxzXFxTXSopXFx9Lyk7XG5cbiAgICAvLyBGb3IgbGFtYmRhIGZ1bmN0aW9ucywgdmFyX2V4cG9ydCgpIG91dHB1dHMgc3VjaCBhcyB0aGUgZm9sbG93aW5nOlxuICAgIC8vICdcXDAwMGxhbWJkYV8xJy4gU2luY2UgaXQgd2lsbCBwcm9iYWJseSBub3QgYmUgYSBjb21tb24gdXNlIHRvXG4gICAgLy8gZXhwZWN0IHRoaXMgKHVuaGVscGZ1bCkgZm9ybSwgd2UnbGwgdXNlIGFub3RoZXIgUEhQLWV4cG9ydGFibGVcbiAgICAvLyBjb25zdHJ1Y3QsIGNyZWF0ZV9mdW5jdGlvbigpICh0aG91Z2ggZG9sbGFyIHNpZ25zIG11c3QgYmUgb24gdGhlXG4gICAgLy8gdmFyaWFibGVzIGluIEphdmFTY3JpcHQpOyBpZiB1c2luZyBpbnN0ZWFkIGluIEphdmFTY3JpcHQgYW5kIHlvdVxuICAgIC8vIGFyZSB1c2luZyB0aGUgbmFtZXNwYWNlZCB2ZXJzaW9uLCBub3RlIHRoYXQgY3JlYXRlX2Z1bmN0aW9uKCkgd2lsbFxuICAgIC8vIG5vdCBiZSBhdmFpbGFibGUgYXMgYSBnbG9iYWxcbiAgICByZXRzdHIgPSBcImNyZWF0ZV9mdW5jdGlvbiAoJ1wiICsgZnVuY1BhcnRzWzFdICsgXCInLCAnXCIgKyBmdW5jUGFydHNbMl0ucmVwbGFjZShuZXcgUmVnRXhwKFwiJ1wiLCAnZycpLCBcIlxcXFwnXCIpICsgXCInKVwiO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyZXNvdXJjZScpIHtcbiAgICAvLyBSZXNvdXJjZXMgdHJlYXRlZCBhcyBudWxsIGZvciB2YXJfZXhwb3J0XG4gICAgcmV0c3RyID0gJ05VTEwnO1xuICB9IGVsc2Uge1xuICAgIHJldHN0ciA9IHR5cGVvZiBtaXhlZEV4cHJlc3Npb24gIT09ICdzdHJpbmcnID8gbWl4ZWRFeHByZXNzaW9uIDogXCInXCIgKyBtaXhlZEV4cHJlc3Npb24ucmVwbGFjZSgvKFtcIiddKS9nLCAnXFxcXCQxJykucmVwbGFjZSgvXFwwL2csICdcXFxcMCcpICsgXCInXCI7XG4gIH1cblxuICBpZiAoIWJvb2xSZXR1cm4pIHtcbiAgICBlY2hvKHJldHN0cik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gcmV0c3RyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZhcl9leHBvcnQuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==