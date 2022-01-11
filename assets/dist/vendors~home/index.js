(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~home"],{

/***/ "./node_modules/react-lazyload/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-lazyload/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceVisible = exports.forceCheck = exports.lazyload = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _event = __webpack_require__(/*! ./utils/event */ "./node_modules/react-lazyload/lib/utils/event.js");

var _scrollParent = __webpack_require__(/*! ./utils/scrollParent */ "./node_modules/react-lazyload/lib/utils/scrollParent.js");

var _scrollParent2 = _interopRequireDefault(_scrollParent);

var _debounce = __webpack_require__(/*! ./utils/debounce */ "./node_modules/react-lazyload/lib/utils/debounce.js");

var _debounce2 = _interopRequireDefault(_debounce);

var _throttle = __webpack_require__(/*! ./utils/throttle */ "./node_modules/react-lazyload/lib/utils/throttle.js");

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * react-lazyload
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultBoundingClientRect = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
var LISTEN_FLAG = 'data-lazyload-listened';
var listeners = [];
var pending = [];

// try to handle passive events
var passiveEventSupported = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      passiveEventSupported = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {}
// if they are supported, setup the optional params
// IMPORTANT: FALSE doubles as the default CAPTURE value!
var passiveEvent = passiveEventSupported ? { capture: false, passive: true } : false;

/**
 * Check if `component` is visible in overflow container `parent`
 * @param  {node} component React component
 * @param  {node} parent    component's scroll parent
 * @return {bool}
 */
var checkOverflowVisible = function checkOverflowVisible(component, parent) {
  var node = _reactDom2.default.findDOMNode(component);
  // const node = component.ref;

  var parentTop = void 0;
  var parentLeft = void 0;
  var parentHeight = void 0;
  var parentWidth = void 0;

  try {
    var _parent$getBoundingCl = parent.getBoundingClientRect();

    parentTop = _parent$getBoundingCl.top;
    parentLeft = _parent$getBoundingCl.left;
    parentHeight = _parent$getBoundingCl.height;
    parentWidth = _parent$getBoundingCl.width;
  } catch (e) {
    parentTop = defaultBoundingClientRect.top;
    parentLeft = defaultBoundingClientRect.left;
    parentHeight = defaultBoundingClientRect.height;
    parentWidth = defaultBoundingClientRect.width;
  }

  var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;
  var windowInnerWidth = window.innerWidth || document.documentElement.clientWidth;

  // calculate top and height of the intersection of the element's scrollParent and viewport
  var intersectionTop = Math.max(parentTop, 0); // intersection's top relative to viewport
  var intersectionLeft = Math.max(parentLeft, 0); // intersection's left relative to viewport
  var intersectionHeight = Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop; // height
  var intersectionWidth = Math.min(windowInnerWidth, parentLeft + parentWidth) - intersectionLeft; // width

  // check whether the element is visible in the intersection
  var top = void 0;
  var left = void 0;
  var height = void 0;
  var width = void 0;

  try {
    var _node$getBoundingClie = node.getBoundingClientRect();

    top = _node$getBoundingClie.top;
    left = _node$getBoundingClie.left;
    height = _node$getBoundingClie.height;
    width = _node$getBoundingClie.width;
  } catch (e) {
    top = defaultBoundingClientRect.top;
    left = defaultBoundingClientRect.left;
    height = defaultBoundingClientRect.height;
    width = defaultBoundingClientRect.width;
  }

  var offsetTop = top - intersectionTop; // element's top relative to intersection
  var offsetLeft = left - intersectionLeft; // element's left relative to intersection

  var offsets = Array.isArray(component.props.offset) ? component.props.offset : [component.props.offset, component.props.offset]; // Be compatible with previous API

  return offsetTop - offsets[0] <= intersectionHeight && offsetTop + height + offsets[1] >= 0 && offsetLeft - offsets[0] <= intersectionWidth && offsetLeft + width + offsets[1] >= 0;
};

/**
 * Check if `component` is visible in document
 * @param  {node} component React component
 * @return {bool}
 */
var checkNormalVisible = function checkNormalVisible(component) {
  var node = _reactDom2.default.findDOMNode(component);
  // const node = component.ref;

  // If this element is hidden by css rules somehow, it's definitely invisible
  if (!(node.offsetWidth || node.offsetHeight || node.getClientRects().length)) return false;

  var top = void 0;
  var elementHeight = void 0;

  try {
    var _node$getBoundingClie2 = node.getBoundingClientRect();

    top = _node$getBoundingClie2.top;
    elementHeight = _node$getBoundingClie2.height;
  } catch (e) {
    top = defaultBoundingClientRect.top;
    elementHeight = defaultBoundingClientRect.height;
  }

  var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

  var offsets = Array.isArray(component.props.offset) ? component.props.offset : [component.props.offset, component.props.offset]; // Be compatible with previous API

  return top - offsets[0] <= windowInnerHeight && top + elementHeight + offsets[1] >= 0;
};

/**
 * Detect if element is visible in viewport, if so, set `visible` state to true.
 * If `once` prop is provided true, remove component as listener after checkVisible
 *
 * @param  {React} component   React component that respond to scroll and resize
 */
var checkVisible = function checkVisible(component) {
  var node = _reactDom2.default.findDOMNode(component);
  // const node = component.ref;
  if (!(node instanceof HTMLElement)) {
    return;
  }

  var parent = (0, _scrollParent2.default)(node);
  var isOverflow = component.props.overflow && parent !== node.ownerDocument && parent !== document && parent !== document.documentElement;
  var visible = isOverflow ? checkOverflowVisible(component, parent) : checkNormalVisible(component);
  if (visible) {
    // Avoid extra render if previously is visible
    if (!component.visible) {
      if (component.props.once) {
        pending.push(component);
      }

      component.visible = true;
      component.forceUpdate();
    }
  } else if (!(component.props.once && component.visible)) {
    component.visible = false;
    if (component.props.unmountIfInvisible) {
      component.forceUpdate();
    }
  }
};

var purgePending = function purgePending() {
  pending.forEach(function (component) {
    var index = listeners.indexOf(component);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  });

  pending = [];
};

var lazyLoadHandler = function lazyLoadHandler() {
  for (var i = 0; i < listeners.length; ++i) {
    var listener = listeners[i];
    checkVisible(listener);
  }
  // Remove `once` component in listeners
  purgePending();
};

/**
 * Forces the component to display regardless of whether the element is visible in the viewport.
 */
var forceVisible = function forceVisible() {
  for (var i = 0; i < listeners.length; ++i) {
    var listener = listeners[i];
    listener.visible = true;
    listener.forceUpdate();
  }
  // Remove `once` component in listeners
  purgePending();
};

// Depending on component's props
var delayType = void 0;
var finalLazyLoadHandler = null;

var isString = function isString(string) {
  return typeof string === 'string';
};

var LazyLoad = function (_Component) {
  _inherits(LazyLoad, _Component);

  function LazyLoad(props) {
    _classCallCheck(this, LazyLoad);

    var _this = _possibleConstructorReturn(this, (LazyLoad.__proto__ || Object.getPrototypeOf(LazyLoad)).call(this, props));

    _this.visible = false;
    // this.setRef = this.setRef.bind(this);
    return _this;
  }

  // setRef(element) {
  //   if (element) {
  //     this.ref = element;
  //   }
  // }

  _createClass(LazyLoad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // It's unlikely to change delay type on the fly, this is mainly
      // designed for tests
      var scrollport = window;
      var scrollContainer = this.props.scrollContainer;

      if (scrollContainer) {
        if (isString(scrollContainer)) {
          scrollport = scrollport.document.querySelector(scrollContainer);
        }
      }
      var needResetFinalLazyLoadHandler = this.props.debounce !== undefined && delayType === 'throttle' || delayType === 'debounce' && this.props.debounce === undefined;

      if (needResetFinalLazyLoadHandler) {
        (0, _event.off)(scrollport, 'scroll', finalLazyLoadHandler, passiveEvent);
        (0, _event.off)(window, 'resize', finalLazyLoadHandler, passiveEvent);
        finalLazyLoadHandler = null;
      }

      if (!finalLazyLoadHandler) {
        if (this.props.debounce !== undefined) {
          finalLazyLoadHandler = (0, _debounce2.default)(lazyLoadHandler, typeof this.props.debounce === 'number' ? this.props.debounce : 300);
          delayType = 'debounce';
        } else if (this.props.throttle !== undefined) {
          finalLazyLoadHandler = (0, _throttle2.default)(lazyLoadHandler, typeof this.props.throttle === 'number' ? this.props.throttle : 300);
          delayType = 'throttle';
        } else {
          finalLazyLoadHandler = lazyLoadHandler;
        }
      }

      if (this.props.overflow) {
        var parent = (0, _scrollParent2.default)(_reactDom2.default.findDOMNode(this));
        // const parent = scrollParent(this.ref);
        if (parent && typeof parent.getAttribute === 'function') {
          var listenerCount = 1 + +parent.getAttribute(LISTEN_FLAG);
          if (listenerCount === 1) {
            parent.addEventListener('scroll', finalLazyLoadHandler, passiveEvent);
          }
          parent.setAttribute(LISTEN_FLAG, listenerCount);
        }
      } else if (listeners.length === 0 || needResetFinalLazyLoadHandler) {
        var _props = this.props,
            scroll = _props.scroll,
            resize = _props.resize;


        if (scroll) {
          (0, _event.on)(scrollport, 'scroll', finalLazyLoadHandler, passiveEvent);
        }

        if (resize) {
          (0, _event.on)(window, 'resize', finalLazyLoadHandler, passiveEvent);
        }
      }

      listeners.push(this);
      checkVisible(this);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return this.visible;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.overflow) {
        var parent = (0, _scrollParent2.default)(_reactDom2.default.findDOMNode(this));
        // const parent = scrollParent(this.ref);
        if (parent && typeof parent.getAttribute === 'function') {
          var listenerCount = +parent.getAttribute(LISTEN_FLAG) - 1;
          if (listenerCount === 0) {
            parent.removeEventListener('scroll', finalLazyLoadHandler, passiveEvent);
            parent.removeAttribute(LISTEN_FLAG);
          } else {
            parent.setAttribute(LISTEN_FLAG, listenerCount);
          }
        }
      }

      var index = listeners.indexOf(this);
      if (index !== -1) {
        listeners.splice(index, 1);
      }

      if (listeners.length === 0 && typeof window !== 'undefined') {
        (0, _event.off)(window, 'resize', finalLazyLoadHandler, passiveEvent);
        (0, _event.off)(window, 'scroll', finalLazyLoadHandler, passiveEvent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.visible ? this.props.children : this.props.placeholder ? this.props.placeholder : _react2.default.createElement('div', { style: { height: this.props.height }, className: 'lazyload-placeholder' });
      // <span ref={this.setRef} className="lazyload-custom-placeholder">
      //   {this.props.placeholder}
      // </span> :
      // <div ref={this.setRef} style={{ height: this.props.height }} className="lazyload-placeholder" />;
    }
  }]);

  return LazyLoad;
}(_react.Component);

LazyLoad.propTypes = {
  once: _propTypes2.default.bool,
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  offset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),
  overflow: _propTypes2.default.bool,
  resize: _propTypes2.default.bool,
  scroll: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  throttle: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]),
  debounce: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]),
  placeholder: _propTypes2.default.node,
  scrollContainer: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  unmountIfInvisible: _propTypes2.default.bool
};

LazyLoad.defaultProps = {
  once: false,
  offset: 0,
  overflow: false,
  resize: false,
  scroll: true,
  unmountIfInvisible: false
};

var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

var decorator = function decorator() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function lazyload(WrappedComponent) {
    return function (_Component2) {
      _inherits(LazyLoadDecorated, _Component2);

      function LazyLoadDecorated() {
        _classCallCheck(this, LazyLoadDecorated);

        var _this2 = _possibleConstructorReturn(this, (LazyLoadDecorated.__proto__ || Object.getPrototypeOf(LazyLoadDecorated)).call(this));

        _this2.displayName = 'LazyLoad' + getDisplayName(WrappedComponent);
        return _this2;
      }

      _createClass(LazyLoadDecorated, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            LazyLoad,
            options,
            _react2.default.createElement(WrappedComponent, this.props)
          );
        }
      }]);

      return LazyLoadDecorated;
    }(_react.Component);
  };
};

exports.lazyload = decorator;
exports.default = LazyLoad;
exports.forceCheck = lazyLoadHandler;
exports.forceVisible = forceVisible;

/***/ }),

/***/ "./node_modules/react-lazyload/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-lazyload/lib/utils/debounce.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
function debounce(func, wait, immediate) {
  var timeout = void 0;
  var args = void 0;
  var context = void 0;
  var timestamp = void 0;
  var result = void 0;

  var later = function later() {
    var last = +new Date() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = null;
          args = null;
        }
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = +new Date();

    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
      context = null;
      args = null;
    }

    return result;
  };
}

/***/ }),

/***/ "./node_modules/react-lazyload/lib/utils/event.js":
/*!********************************************************!*\
  !*** ./node_modules/react-lazyload/lib/utils/event.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.off = off;
function on(el, eventName, callback, opts) {
  opts = opts || false;
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, opts);
  } else if (el.attachEvent) {
    el.attachEvent("on" + eventName, function (e) {
      callback.call(el, e || window.event);
    });
  }
}

function off(el, eventName, callback, opts) {
  opts = opts || false;
  if (el.removeEventListener) {
    el.removeEventListener(eventName, callback, opts);
  } else if (el.detachEvent) {
    el.detachEvent("on" + eventName, callback);
  }
}

/***/ }),

/***/ "./node_modules/react-lazyload/lib/utils/scrollParent.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-lazyload/lib/utils/scrollParent.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @fileOverview Find scroll parent
 */

exports.default = function (node) {
  if (!(node instanceof HTMLElement)) {
    return document.documentElement;
  }

  var excludeStaticParent = node.style.position === 'absolute';
  var overflowRegex = /(scroll|auto)/;
  var parent = node;

  while (parent) {
    if (!parent.parentNode) {
      return node.ownerDocument || document.documentElement;
    }

    var style = window.getComputedStyle(parent);
    var position = style.position;
    var overflow = style.overflow;
    var overflowX = style['overflow-x'];
    var overflowY = style['overflow-y'];

    if (position === 'static' && excludeStaticParent) {
      parent = parent.parentNode;
      continue;
    }

    if (overflowRegex.test(overflow) && overflowRegex.test(overflowX) && overflowRegex.test(overflowY)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return node.ownerDocument || node.documentElement || document.documentElement;
};

/***/ }),

/***/ "./node_modules/react-lazyload/lib/utils/throttle.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-lazyload/lib/utils/throttle.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;
/*eslint-disable */
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvcmVhY3QtbGF6eWxvYWQvbGliL2luZGV4LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL25vZGVfbW9kdWxlcy9yZWFjdC1sYXp5bG9hZC9saWIvdXRpbHMvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWxhenlsb2FkL2xpYi91dGlscy9ldmVudC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvcmVhY3QtbGF6eWxvYWQvbGliL3V0aWxzL3Njcm9sbFBhcmVudC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvcmVhY3QtbGF6eWxvYWQvbGliL3V0aWxzL3Rocm90dGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLGdDQUFnQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWpqQixhQUFhLG1CQUFPLENBQUMsb0JBQU87O0FBRTVCOztBQUVBLGdCQUFnQixtQkFBTyxDQUFDLDRCQUFXOztBQUVuQzs7QUFFQSxpQkFBaUIsbUJBQU8sQ0FBQyxzREFBWTs7QUFFckM7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHVFQUFlOztBQUVwQyxvQkFBb0IsbUJBQU8sQ0FBQyxxRkFBc0I7O0FBRWxEOztBQUVBLGdCQUFnQixtQkFBTyxDQUFDLDZFQUFrQjs7QUFFMUM7O0FBRUEsZ0JBQWdCLG1CQUFPLENBQUMsNkVBQWtCOztBQUUxQzs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0YsaURBQWlELDBD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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQzNDYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiIuL2Fzc2V0cy9kaXN0L3ZlbmRvcnN+aG9tZS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZm9yY2VWaXNpYmxlID0gZXhwb3J0cy5mb3JjZUNoZWNrID0gZXhwb3J0cy5sYXp5bG9hZCA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3REb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3REb20pO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9ldmVudCA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnQnKTtcblxudmFyIF9zY3JvbGxQYXJlbnQgPSByZXF1aXJlKCcuL3V0aWxzL3Njcm9sbFBhcmVudCcpO1xuXG52YXIgX3Njcm9sbFBhcmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY3JvbGxQYXJlbnQpO1xuXG52YXIgX2RlYm91bmNlID0gcmVxdWlyZSgnLi91dGlscy9kZWJvdW5jZScpO1xuXG52YXIgX2RlYm91bmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlYm91bmNlKTtcblxudmFyIF90aHJvdHRsZSA9IHJlcXVpcmUoJy4vdXRpbHMvdGhyb3R0bGUnKTtcblxudmFyIF90aHJvdHRsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90aHJvdHRsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH0gLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiByZWFjdC1sYXp5bG9hZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cblxudmFyIGRlZmF1bHRCb3VuZGluZ0NsaWVudFJlY3QgPSB7IHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xudmFyIExJU1RFTl9GTEFHID0gJ2RhdGEtbGF6eWxvYWQtbGlzdGVuZWQnO1xudmFyIGxpc3RlbmVycyA9IFtdO1xudmFyIHBlbmRpbmcgPSBbXTtcblxuLy8gdHJ5IHRvIGhhbmRsZSBwYXNzaXZlIGV2ZW50c1xudmFyIHBhc3NpdmVFdmVudFN1cHBvcnRlZCA9IGZhbHNlO1xudHJ5IHtcbiAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcGFzc2l2ZUV2ZW50U3VwcG9ydGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdHMpO1xufSBjYXRjaCAoZSkge31cbi8vIGlmIHRoZXkgYXJlIHN1cHBvcnRlZCwgc2V0dXAgdGhlIG9wdGlvbmFsIHBhcmFtc1xuLy8gSU1QT1JUQU5UOiBGQUxTRSBkb3VibGVzIGFzIHRoZSBkZWZhdWx0IENBUFRVUkUgdmFsdWUhXG52YXIgcGFzc2l2ZUV2ZW50ID0gcGFzc2l2ZUV2ZW50U3VwcG9ydGVkID8geyBjYXB0dXJlOiBmYWxzZSwgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2U7XG5cbi8qKlxuICogQ2hlY2sgaWYgYGNvbXBvbmVudGAgaXMgdmlzaWJsZSBpbiBvdmVyZmxvdyBjb250YWluZXIgYHBhcmVudGBcbiAqIEBwYXJhbSAge25vZGV9IGNvbXBvbmVudCBSZWFjdCBjb21wb25lbnRcbiAqIEBwYXJhbSAge25vZGV9IHBhcmVudCAgICBjb21wb25lbnQncyBzY3JvbGwgcGFyZW50XG4gKiBAcmV0dXJuIHtib29sfVxuICovXG52YXIgY2hlY2tPdmVyZmxvd1Zpc2libGUgPSBmdW5jdGlvbiBjaGVja092ZXJmbG93VmlzaWJsZShjb21wb25lbnQsIHBhcmVudCkge1xuICB2YXIgbm9kZSA9IF9yZWFjdERvbTIuZGVmYXVsdC5maW5kRE9NTm9kZShjb21wb25lbnQpO1xuICAvLyBjb25zdCBub2RlID0gY29tcG9uZW50LnJlZjtcblxuICB2YXIgcGFyZW50VG9wID0gdm9pZCAwO1xuICB2YXIgcGFyZW50TGVmdCA9IHZvaWQgMDtcbiAgdmFyIHBhcmVudEhlaWdodCA9IHZvaWQgMDtcbiAgdmFyIHBhcmVudFdpZHRoID0gdm9pZCAwO1xuXG4gIHRyeSB7XG4gICAgdmFyIF9wYXJlbnQkZ2V0Qm91bmRpbmdDbCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHBhcmVudFRvcCA9IF9wYXJlbnQkZ2V0Qm91bmRpbmdDbC50b3A7XG4gICAgcGFyZW50TGVmdCA9IF9wYXJlbnQkZ2V0Qm91bmRpbmdDbC5sZWZ0O1xuICAgIHBhcmVudEhlaWdodCA9IF9wYXJlbnQkZ2V0Qm91bmRpbmdDbC5oZWlnaHQ7XG4gICAgcGFyZW50V2lkdGggPSBfcGFyZW50JGdldEJvdW5kaW5nQ2wud2lkdGg7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBwYXJlbnRUb3AgPSBkZWZhdWx0Qm91bmRpbmdDbGllbnRSZWN0LnRvcDtcbiAgICBwYXJlbnRMZWZ0ID0gZGVmYXVsdEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgIHBhcmVudEhlaWdodCA9IGRlZmF1bHRCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0O1xuICAgIHBhcmVudFdpZHRoID0gZGVmYXVsdEJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aDtcbiAgfVxuXG4gIHZhciB3aW5kb3dJbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB2YXIgd2luZG93SW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAvLyBjYWxjdWxhdGUgdG9wIGFuZCBoZWlnaHQgb2YgdGhlIGludGVyc2VjdGlvbiBvZiB0aGUgZWxlbWVudCdzIHNjcm9sbFBhcmVudCBhbmQgdmlld3BvcnRcbiAgdmFyIGludGVyc2VjdGlvblRvcCA9IE1hdGgubWF4KHBhcmVudFRvcCwgMCk7IC8vIGludGVyc2VjdGlvbidzIHRvcCByZWxhdGl2ZSB0byB2aWV3cG9ydFxuICB2YXIgaW50ZXJzZWN0aW9uTGVmdCA9IE1hdGgubWF4KHBhcmVudExlZnQsIDApOyAvLyBpbnRlcnNlY3Rpb24ncyBsZWZ0IHJlbGF0aXZlIHRvIHZpZXdwb3J0XG4gIHZhciBpbnRlcnNlY3Rpb25IZWlnaHQgPSBNYXRoLm1pbih3aW5kb3dJbm5lckhlaWdodCwgcGFyZW50VG9wICsgcGFyZW50SGVpZ2h0KSAtIGludGVyc2VjdGlvblRvcDsgLy8gaGVpZ2h0XG4gIHZhciBpbnRlcnNlY3Rpb25XaWR0aCA9IE1hdGgubWluKHdpbmRvd0lubmVyV2lkdGgsIHBhcmVudExlZnQgKyBwYXJlbnRXaWR0aCkgLSBpbnRlcnNlY3Rpb25MZWZ0OyAvLyB3aWR0aFxuXG4gIC8vIGNoZWNrIHdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSBpbiB0aGUgaW50ZXJzZWN0aW9uXG4gIHZhciB0b3AgPSB2b2lkIDA7XG4gIHZhciBsZWZ0ID0gdm9pZCAwO1xuICB2YXIgaGVpZ2h0ID0gdm9pZCAwO1xuICB2YXIgd2lkdGggPSB2b2lkIDA7XG5cbiAgdHJ5IHtcbiAgICB2YXIgX25vZGUkZ2V0Qm91bmRpbmdDbGllID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRvcCA9IF9ub2RlJGdldEJvdW5kaW5nQ2xpZS50b3A7XG4gICAgbGVmdCA9IF9ub2RlJGdldEJvdW5kaW5nQ2xpZS5sZWZ0O1xuICAgIGhlaWdodCA9IF9ub2RlJGdldEJvdW5kaW5nQ2xpZS5oZWlnaHQ7XG4gICAgd2lkdGggPSBfbm9kZSRnZXRCb3VuZGluZ0NsaWUud2lkdGg7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0b3AgPSBkZWZhdWx0Qm91bmRpbmdDbGllbnRSZWN0LnRvcDtcbiAgICBsZWZ0ID0gZGVmYXVsdEJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0O1xuICAgIGhlaWdodCA9IGRlZmF1bHRCb3VuZGluZ0NsaWVudFJlY3QuaGVpZ2h0O1xuICAgIHdpZHRoID0gZGVmYXVsdEJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aDtcbiAgfVxuXG4gIHZhciBvZmZzZXRUb3AgPSB0b3AgLSBpbnRlcnNlY3Rpb25Ub3A7IC8vIGVsZW1lbnQncyB0b3AgcmVsYXRpdmUgdG8gaW50ZXJzZWN0aW9uXG4gIHZhciBvZmZzZXRMZWZ0ID0gbGVmdCAtIGludGVyc2VjdGlvbkxlZnQ7IC8vIGVsZW1lbnQncyBsZWZ0IHJlbGF0aXZlIHRvIGludGVyc2VjdGlvblxuXG4gIHZhciBvZmZzZXRzID0gQXJyYXkuaXNBcnJheShjb21wb25lbnQucHJvcHMub2Zmc2V0KSA/IGNvbXBvbmVudC5wcm9wcy5vZmZzZXQgOiBbY29tcG9uZW50LnByb3BzLm9mZnNldCwgY29tcG9uZW50LnByb3BzLm9mZnNldF07IC8vIEJlIGNvbXBhdGlibGUgd2l0aCBwcmV2aW91cyBBUElcblxuICByZXR1cm4gb2Zmc2V0VG9wIC0gb2Zmc2V0c1swXSA8PSBpbnRlcnNlY3Rpb25IZWlnaHQgJiYgb2Zmc2V0VG9wICsgaGVpZ2h0ICsgb2Zmc2V0c1sxXSA+PSAwICYmIG9mZnNldExlZnQgLSBvZmZzZXRzWzBdIDw9IGludGVyc2VjdGlvbldpZHRoICYmIG9mZnNldExlZnQgKyB3aWR0aCArIG9mZnNldHNbMV0gPj0gMDtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYGNvbXBvbmVudGAgaXMgdmlzaWJsZSBpbiBkb2N1bWVudFxuICogQHBhcmFtICB7bm9kZX0gY29tcG9uZW50IFJlYWN0IGNvbXBvbmVudFxuICogQHJldHVybiB7Ym9vbH1cbiAqL1xudmFyIGNoZWNrTm9ybWFsVmlzaWJsZSA9IGZ1bmN0aW9uIGNoZWNrTm9ybWFsVmlzaWJsZShjb21wb25lbnQpIHtcbiAgdmFyIG5vZGUgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUoY29tcG9uZW50KTtcbiAgLy8gY29uc3Qgbm9kZSA9IGNvbXBvbmVudC5yZWY7XG5cbiAgLy8gSWYgdGhpcyBlbGVtZW50IGlzIGhpZGRlbiBieSBjc3MgcnVsZXMgc29tZWhvdywgaXQncyBkZWZpbml0ZWx5IGludmlzaWJsZVxuICBpZiAoIShub2RlLm9mZnNldFdpZHRoIHx8IG5vZGUub2Zmc2V0SGVpZ2h0IHx8IG5vZGUuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIHRvcCA9IHZvaWQgMDtcbiAgdmFyIGVsZW1lbnRIZWlnaHQgPSB2b2lkIDA7XG5cbiAgdHJ5IHtcbiAgICB2YXIgX25vZGUkZ2V0Qm91bmRpbmdDbGllMiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB0b3AgPSBfbm9kZSRnZXRCb3VuZGluZ0NsaWUyLnRvcDtcbiAgICBlbGVtZW50SGVpZ2h0ID0gX25vZGUkZ2V0Qm91bmRpbmdDbGllMi5oZWlnaHQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0b3AgPSBkZWZhdWx0Qm91bmRpbmdDbGllbnRSZWN0LnRvcDtcbiAgICBlbGVtZW50SGVpZ2h0ID0gZGVmYXVsdEJvdW5kaW5nQ2xpZW50UmVjdC5oZWlnaHQ7XG4gIH1cblxuICB2YXIgd2luZG93SW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcblxuICB2YXIgb2Zmc2V0cyA9IEFycmF5LmlzQXJyYXkoY29tcG9uZW50LnByb3BzLm9mZnNldCkgPyBjb21wb25lbnQucHJvcHMub2Zmc2V0IDogW2NvbXBvbmVudC5wcm9wcy5vZmZzZXQsIGNvbXBvbmVudC5wcm9wcy5vZmZzZXRdOyAvLyBCZSBjb21wYXRpYmxlIHdpdGggcHJldmlvdXMgQVBJXG5cbiAgcmV0dXJuIHRvcCAtIG9mZnNldHNbMF0gPD0gd2luZG93SW5uZXJIZWlnaHQgJiYgdG9wICsgZWxlbWVudEhlaWdodCArIG9mZnNldHNbMV0gPj0gMDtcbn07XG5cbi8qKlxuICogRGV0ZWN0IGlmIGVsZW1lbnQgaXMgdmlzaWJsZSBpbiB2aWV3cG9ydCwgaWYgc28sIHNldCBgdmlzaWJsZWAgc3RhdGUgdG8gdHJ1ZS5cbiAqIElmIGBvbmNlYCBwcm9wIGlzIHByb3ZpZGVkIHRydWUsIHJlbW92ZSBjb21wb25lbnQgYXMgbGlzdGVuZXIgYWZ0ZXIgY2hlY2tWaXNpYmxlXG4gKlxuICogQHBhcmFtICB7UmVhY3R9IGNvbXBvbmVudCAgIFJlYWN0IGNvbXBvbmVudCB0aGF0IHJlc3BvbmQgdG8gc2Nyb2xsIGFuZCByZXNpemVcbiAqL1xudmFyIGNoZWNrVmlzaWJsZSA9IGZ1bmN0aW9uIGNoZWNrVmlzaWJsZShjb21wb25lbnQpIHtcbiAgdmFyIG5vZGUgPSBfcmVhY3REb20yLmRlZmF1bHQuZmluZERPTU5vZGUoY29tcG9uZW50KTtcbiAgLy8gY29uc3Qgbm9kZSA9IGNvbXBvbmVudC5yZWY7XG4gIGlmICghKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcGFyZW50ID0gKDAsIF9zY3JvbGxQYXJlbnQyLmRlZmF1bHQpKG5vZGUpO1xuICB2YXIgaXNPdmVyZmxvdyA9IGNvbXBvbmVudC5wcm9wcy5vdmVyZmxvdyAmJiBwYXJlbnQgIT09IG5vZGUub3duZXJEb2N1bWVudCAmJiBwYXJlbnQgIT09IGRvY3VtZW50ICYmIHBhcmVudCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB2YXIgdmlzaWJsZSA9IGlzT3ZlcmZsb3cgPyBjaGVja092ZXJmbG93VmlzaWJsZShjb21wb25lbnQsIHBhcmVudCkgOiBjaGVja05vcm1hbFZpc2libGUoY29tcG9uZW50KTtcbiAgaWYgKHZpc2libGUpIHtcbiAgICAvLyBBdm9pZCBleHRyYSByZW5kZXIgaWYgcHJldmlvdXNseSBpcyB2aXNpYmxlXG4gICAgaWYgKCFjb21wb25lbnQudmlzaWJsZSkge1xuICAgICAgaWYgKGNvbXBvbmVudC5wcm9wcy5vbmNlKSB7XG4gICAgICAgIHBlbmRpbmcucHVzaChjb21wb25lbnQpO1xuICAgICAgfVxuXG4gICAgICBjb21wb25lbnQudmlzaWJsZSA9IHRydWU7XG4gICAgICBjb21wb25lbnQuZm9yY2VVcGRhdGUoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIShjb21wb25lbnQucHJvcHMub25jZSAmJiBjb21wb25lbnQudmlzaWJsZSkpIHtcbiAgICBjb21wb25lbnQudmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmIChjb21wb25lbnQucHJvcHMudW5tb3VudElmSW52aXNpYmxlKSB7XG4gICAgICBjb21wb25lbnQuZm9yY2VVcGRhdGUoKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBwdXJnZVBlbmRpbmcgPSBmdW5jdGlvbiBwdXJnZVBlbmRpbmcoKSB7XG4gIHBlbmRpbmcuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgdmFyIGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoY29tcG9uZW50KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0pO1xuXG4gIHBlbmRpbmcgPSBbXTtcbn07XG5cbnZhciBsYXp5TG9hZEhhbmRsZXIgPSBmdW5jdGlvbiBsYXp5TG9hZEhhbmRsZXIoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgIGNoZWNrVmlzaWJsZShsaXN0ZW5lcik7XG4gIH1cbiAgLy8gUmVtb3ZlIGBvbmNlYCBjb21wb25lbnQgaW4gbGlzdGVuZXJzXG4gIHB1cmdlUGVuZGluZygpO1xufTtcblxuLyoqXG4gKiBGb3JjZXMgdGhlIGNvbXBvbmVudCB0byBkaXNwbGF5IHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIHRoZSB2aWV3cG9ydC5cbiAqL1xudmFyIGZvcmNlVmlzaWJsZSA9IGZ1bmN0aW9uIGZvcmNlVmlzaWJsZSgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgbGlzdGVuZXIudmlzaWJsZSA9IHRydWU7XG4gICAgbGlzdGVuZXIuZm9yY2VVcGRhdGUoKTtcbiAgfVxuICAvLyBSZW1vdmUgYG9uY2VgIGNvbXBvbmVudCBpbiBsaXN0ZW5lcnNcbiAgcHVyZ2VQZW5kaW5nKCk7XG59O1xuXG4vLyBEZXBlbmRpbmcgb24gY29tcG9uZW50J3MgcHJvcHNcbnZhciBkZWxheVR5cGUgPSB2b2lkIDA7XG52YXIgZmluYWxMYXp5TG9hZEhhbmRsZXIgPSBudWxsO1xuXG52YXIgaXNTdHJpbmcgPSBmdW5jdGlvbiBpc1N0cmluZyhzdHJpbmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnO1xufTtcblxudmFyIExhenlMb2FkID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKExhenlMb2FkLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBMYXp5TG9hZChwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMYXp5TG9hZCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoTGF6eUxvYWQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihMYXp5TG9hZCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAvLyB0aGlzLnNldFJlZiA9IHRoaXMuc2V0UmVmLmJpbmQodGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLy8gc2V0UmVmKGVsZW1lbnQpIHtcbiAgLy8gICBpZiAoZWxlbWVudCkge1xuICAvLyAgICAgdGhpcy5yZWYgPSBlbGVtZW50O1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIF9jcmVhdGVDbGFzcyhMYXp5TG9hZCwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgLy8gSXQncyB1bmxpa2VseSB0byBjaGFuZ2UgZGVsYXkgdHlwZSBvbiB0aGUgZmx5LCB0aGlzIGlzIG1haW5seVxuICAgICAgLy8gZGVzaWduZWQgZm9yIHRlc3RzXG4gICAgICB2YXIgc2Nyb2xscG9ydCA9IHdpbmRvdztcbiAgICAgIHZhciBzY3JvbGxDb250YWluZXIgPSB0aGlzLnByb3BzLnNjcm9sbENvbnRhaW5lcjtcblxuICAgICAgaWYgKHNjcm9sbENvbnRhaW5lcikge1xuICAgICAgICBpZiAoaXNTdHJpbmcoc2Nyb2xsQ29udGFpbmVyKSkge1xuICAgICAgICAgIHNjcm9sbHBvcnQgPSBzY3JvbGxwb3J0LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2Nyb2xsQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG5lZWRSZXNldEZpbmFsTGF6eUxvYWRIYW5kbGVyID0gdGhpcy5wcm9wcy5kZWJvdW5jZSAhPT0gdW5kZWZpbmVkICYmIGRlbGF5VHlwZSA9PT0gJ3Rocm90dGxlJyB8fCBkZWxheVR5cGUgPT09ICdkZWJvdW5jZScgJiYgdGhpcy5wcm9wcy5kZWJvdW5jZSA9PT0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmVlZFJlc2V0RmluYWxMYXp5TG9hZEhhbmRsZXIpIHtcbiAgICAgICAgKDAsIF9ldmVudC5vZmYpKHNjcm9sbHBvcnQsICdzY3JvbGwnLCBmaW5hbExhenlMb2FkSGFuZGxlciwgcGFzc2l2ZUV2ZW50KTtcbiAgICAgICAgKDAsIF9ldmVudC5vZmYpKHdpbmRvdywgJ3Jlc2l6ZScsIGZpbmFsTGF6eUxvYWRIYW5kbGVyLCBwYXNzaXZlRXZlbnQpO1xuICAgICAgICBmaW5hbExhenlMb2FkSGFuZGxlciA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghZmluYWxMYXp5TG9hZEhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGVib3VuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZpbmFsTGF6eUxvYWRIYW5kbGVyID0gKDAsIF9kZWJvdW5jZTIuZGVmYXVsdCkobGF6eUxvYWRIYW5kbGVyLCB0eXBlb2YgdGhpcy5wcm9wcy5kZWJvdW5jZSA9PT0gJ251bWJlcicgPyB0aGlzLnByb3BzLmRlYm91bmNlIDogMzAwKTtcbiAgICAgICAgICBkZWxheVR5cGUgPSAnZGVib3VuY2UnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMudGhyb3R0bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZpbmFsTGF6eUxvYWRIYW5kbGVyID0gKDAsIF90aHJvdHRsZTIuZGVmYXVsdCkobGF6eUxvYWRIYW5kbGVyLCB0eXBlb2YgdGhpcy5wcm9wcy50aHJvdHRsZSA9PT0gJ251bWJlcicgPyB0aGlzLnByb3BzLnRocm90dGxlIDogMzAwKTtcbiAgICAgICAgICBkZWxheVR5cGUgPSAndGhyb3R0bGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbmFsTGF6eUxvYWRIYW5kbGVyID0gbGF6eUxvYWRIYW5kbGVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLm92ZXJmbG93KSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSAoMCwgX3Njcm9sbFBhcmVudDIuZGVmYXVsdCkoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpKTtcbiAgICAgICAgLy8gY29uc3QgcGFyZW50ID0gc2Nyb2xsUGFyZW50KHRoaXMucmVmKTtcbiAgICAgICAgaWYgKHBhcmVudCAmJiB0eXBlb2YgcGFyZW50LmdldEF0dHJpYnV0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBsaXN0ZW5lckNvdW50ID0gMSArICtwYXJlbnQuZ2V0QXR0cmlidXRlKExJU1RFTl9GTEFHKTtcbiAgICAgICAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgcGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZpbmFsTGF6eUxvYWRIYW5kbGVyLCBwYXNzaXZlRXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJlbnQuc2V0QXR0cmlidXRlKExJU1RFTl9GTEFHLCBsaXN0ZW5lckNvdW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSAwIHx8IG5lZWRSZXNldEZpbmFsTGF6eUxvYWRIYW5kbGVyKSB7XG4gICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgICAgc2Nyb2xsID0gX3Byb3BzLnNjcm9sbCxcbiAgICAgICAgICAgIHJlc2l6ZSA9IF9wcm9wcy5yZXNpemU7XG5cblxuICAgICAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICAgICAgKDAsIF9ldmVudC5vbikoc2Nyb2xscG9ydCwgJ3Njcm9sbCcsIGZpbmFsTGF6eUxvYWRIYW5kbGVyLCBwYXNzaXZlRXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc2l6ZSkge1xuICAgICAgICAgICgwLCBfZXZlbnQub24pKHdpbmRvdywgJ3Jlc2l6ZScsIGZpbmFsTGF6eUxvYWRIYW5kbGVyLCBwYXNzaXZlRXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycy5wdXNoKHRoaXMpO1xuICAgICAgY2hlY2tWaXNpYmxlKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2libGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLm92ZXJmbG93KSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSAoMCwgX3Njcm9sbFBhcmVudDIuZGVmYXVsdCkoX3JlYWN0RG9tMi5kZWZhdWx0LmZpbmRET01Ob2RlKHRoaXMpKTtcbiAgICAgICAgLy8gY29uc3QgcGFyZW50ID0gc2Nyb2xsUGFyZW50KHRoaXMucmVmKTtcbiAgICAgICAgaWYgKHBhcmVudCAmJiB0eXBlb2YgcGFyZW50LmdldEF0dHJpYnV0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBsaXN0ZW5lckNvdW50ID0gK3BhcmVudC5nZXRBdHRyaWJ1dGUoTElTVEVOX0ZMQUcpIC0gMTtcbiAgICAgICAgICBpZiAobGlzdGVuZXJDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZpbmFsTGF6eUxvYWRIYW5kbGVyLCBwYXNzaXZlRXZlbnQpO1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUF0dHJpYnV0ZShMSVNURU5fRkxBRyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5zZXRBdHRyaWJ1dGUoTElTVEVOX0ZMQUcsIGxpc3RlbmVyQ291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZih0aGlzKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSAwICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICgwLCBfZXZlbnQub2ZmKSh3aW5kb3csICdyZXNpemUnLCBmaW5hbExhenlMb2FkSGFuZGxlciwgcGFzc2l2ZUV2ZW50KTtcbiAgICAgICAgKDAsIF9ldmVudC5vZmYpKHdpbmRvdywgJ3Njcm9sbCcsIGZpbmFsTGF6eUxvYWRIYW5kbGVyLCBwYXNzaXZlRXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2libGUgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogdGhpcy5wcm9wcy5wbGFjZWhvbGRlciA/IHRoaXMucHJvcHMucGxhY2Vob2xkZXIgOiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH0sIGNsYXNzTmFtZTogJ2xhenlsb2FkLXBsYWNlaG9sZGVyJyB9KTtcbiAgICAgIC8vIDxzcGFuIHJlZj17dGhpcy5zZXRSZWZ9IGNsYXNzTmFtZT1cImxhenlsb2FkLWN1c3RvbS1wbGFjZWhvbGRlclwiPlxuICAgICAgLy8gICB7dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cbiAgICAgIC8vIDwvc3Bhbj4gOlxuICAgICAgLy8gPGRpdiByZWY9e3RoaXMuc2V0UmVmfSBzdHlsZT17eyBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH19IGNsYXNzTmFtZT1cImxhenlsb2FkLXBsYWNlaG9sZGVyXCIgLz47XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIExhenlMb2FkO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuTGF6eUxvYWQucHJvcFR5cGVzID0ge1xuICBvbmNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIGhlaWdodDogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLCBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZ10pLFxuICBvZmZzZXQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlciwgX3Byb3BUeXBlczIuZGVmYXVsdC5hcnJheU9mKF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyKV0pLFxuICBvdmVyZmxvdzogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICByZXNpemU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgc2Nyb2xsOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIGNoaWxkcmVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm5vZGUsXG4gIHRocm90dGxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsIF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbF0pLFxuICBkZWJvdW5jZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLCBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2xdKSxcbiAgcGxhY2Vob2xkZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQubm9kZSxcbiAgc2Nyb2xsQ29udGFpbmVyOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XSksXG4gIHVubW91bnRJZkludmlzaWJsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sXG59O1xuXG5MYXp5TG9hZC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uY2U6IGZhbHNlLFxuICBvZmZzZXQ6IDAsXG4gIG92ZXJmbG93OiBmYWxzZSxcbiAgcmVzaXplOiBmYWxzZSxcbiAgc2Nyb2xsOiB0cnVlLFxuICB1bm1vdW50SWZJbnZpc2libGU6IGZhbHNlXG59O1xuXG52YXIgZ2V0RGlzcGxheU5hbWUgPSBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZShXcmFwcGVkQ29tcG9uZW50KSB7XG4gIHJldHVybiBXcmFwcGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IFdyYXBwZWRDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50Jztcbn07XG5cbnZhciBkZWNvcmF0b3IgPSBmdW5jdGlvbiBkZWNvcmF0b3IoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIGxhenlsb2FkKFdyYXBwZWRDb21wb25lbnQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKF9Db21wb25lbnQyKSB7XG4gICAgICBfaW5oZXJpdHMoTGF6eUxvYWREZWNvcmF0ZWQsIF9Db21wb25lbnQyKTtcblxuICAgICAgZnVuY3Rpb24gTGF6eUxvYWREZWNvcmF0ZWQoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMYXp5TG9hZERlY29yYXRlZCk7XG5cbiAgICAgICAgdmFyIF90aGlzMiA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChMYXp5TG9hZERlY29yYXRlZC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKExhenlMb2FkRGVjb3JhdGVkKSkuY2FsbCh0aGlzKSk7XG5cbiAgICAgICAgX3RoaXMyLmRpc3BsYXlOYW1lID0gJ0xhenlMb2FkJyArIGdldERpc3BsYXlOYW1lKFdyYXBwZWRDb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gX3RoaXMyO1xuICAgICAgfVxuXG4gICAgICBfY3JlYXRlQ2xhc3MoTGF6eUxvYWREZWNvcmF0ZWQsIFt7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgTGF6eUxvYWQsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoV3JhcHBlZENvbXBvbmVudCwgdGhpcy5wcm9wcylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBMYXp5TG9hZERlY29yYXRlZDtcbiAgICB9KF9yZWFjdC5Db21wb25lbnQpO1xuICB9O1xufTtcblxuZXhwb3J0cy5sYXp5bG9hZCA9IGRlY29yYXRvcjtcbmV4cG9ydHMuZGVmYXVsdCA9IExhenlMb2FkO1xuZXhwb3J0cy5mb3JjZUNoZWNrID0gbGF6eUxvYWRIYW5kbGVyO1xuZXhwb3J0cy5mb3JjZVZpc2libGUgPSBmb3JjZVZpc2libGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWJvdW5jZTtcbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICB2YXIgdGltZW91dCA9IHZvaWQgMDtcbiAgdmFyIGFyZ3MgPSB2b2lkIDA7XG4gIHZhciBjb250ZXh0ID0gdm9pZCAwO1xuICB2YXIgdGltZXN0YW1wID0gdm9pZCAwO1xuICB2YXIgcmVzdWx0ID0gdm9pZCAwO1xuXG4gIHZhciBsYXRlciA9IGZ1bmN0aW9uIGxhdGVyKCkge1xuICAgIHZhciBsYXN0ID0gK25ldyBEYXRlKCkgLSB0aW1lc3RhbXA7XG5cbiAgICBpZiAobGFzdCA8IHdhaXQgJiYgbGFzdCA+PSAwKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgIGNvbnRleHQgPSBudWxsO1xuICAgICAgICAgIGFyZ3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgY29udGV4dCA9IHRoaXM7XG4gICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICB0aW1lc3RhbXAgPSArbmV3IERhdGUoKTtcblxuICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGlmICghdGltZW91dCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgIH1cblxuICAgIGlmIChjYWxsTm93KSB7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgY29udGV4dCA9IG51bGw7XG4gICAgICBhcmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5vbiA9IG9uO1xuZXhwb3J0cy5vZmYgPSBvZmY7XG5mdW5jdGlvbiBvbihlbCwgZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0cykge1xuICBvcHRzID0gb3B0cyB8fCBmYWxzZTtcbiAgaWYgKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdHMpO1xuICB9IGVsc2UgaWYgKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgZWwuYXR0YWNoRXZlbnQoXCJvblwiICsgZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY2FsbGJhY2suY2FsbChlbCwgZSB8fCB3aW5kb3cuZXZlbnQpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9mZihlbCwgZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0cykge1xuICBvcHRzID0gb3B0cyB8fCBmYWxzZTtcbiAgaWYgKGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdHMpO1xuICB9IGVsc2UgaWYgKGVsLmRldGFjaEV2ZW50KSB7XG4gICAgZWwuZGV0YWNoRXZlbnQoXCJvblwiICsgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogQGZpbGVPdmVydmlldyBGaW5kIHNjcm9sbCBwYXJlbnRcbiAqL1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAoIShub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIHZhciBleGNsdWRlU3RhdGljUGFyZW50ID0gbm9kZS5zdHlsZS5wb3NpdGlvbiA9PT0gJ2Fic29sdXRlJztcbiAgdmFyIG92ZXJmbG93UmVnZXggPSAvKHNjcm9sbHxhdXRvKS87XG4gIHZhciBwYXJlbnQgPSBub2RlO1xuXG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBpZiAoIXBhcmVudC5wYXJlbnROb2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpO1xuICAgIHZhciBwb3NpdGlvbiA9IHN0eWxlLnBvc2l0aW9uO1xuICAgIHZhciBvdmVyZmxvdyA9IHN0eWxlLm92ZXJmbG93O1xuICAgIHZhciBvdmVyZmxvd1ggPSBzdHlsZVsnb3ZlcmZsb3cteCddO1xuICAgIHZhciBvdmVyZmxvd1kgPSBzdHlsZVsnb3ZlcmZsb3cteSddO1xuXG4gICAgaWYgKHBvc2l0aW9uID09PSAnc3RhdGljJyAmJiBleGNsdWRlU3RhdGljUGFyZW50KSB7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChvdmVyZmxvd1JlZ2V4LnRlc3Qob3ZlcmZsb3cpICYmIG92ZXJmbG93UmVnZXgudGVzdChvdmVyZmxvd1gpICYmIG92ZXJmbG93UmVnZXgudGVzdChvdmVyZmxvd1kpKSB7XG4gICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICB9XG5cbiAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlLmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdGhyb3R0bGU7XG4vKmVzbGludC1kaXNhYmxlICovXG5mdW5jdGlvbiB0aHJvdHRsZShmbiwgdGhyZXNoaG9sZCwgc2NvcGUpIHtcbiAgdGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XG4gIHZhciBsYXN0LCBkZWZlclRpbWVyO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb250ZXh0ID0gc2NvcGUgfHwgdGhpcztcblxuICAgIHZhciBub3cgPSArbmV3IERhdGUoKSxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICBpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNoaG9sZCkge1xuICAgICAgLy8gaG9sZCBvbiB0byBpdFxuICAgICAgY2xlYXJUaW1lb3V0KGRlZmVyVGltZXIpO1xuICAgICAgZGVmZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH0sIHRocmVzaGhvbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0ID0gbm93O1xuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfVxuICB9O1xufSJdLCJzb3VyY2VSb290IjoiIn0=