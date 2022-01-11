(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~customer~home~order"],{

/***/ "./node_modules/memoize-one/dist/memoize-one.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/memoize-one/dist/memoize-one.esm.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

/* harmony default export */ __webpack_exports__["default"] = (memoizeOne);


/***/ }),

/***/ "./node_modules/react-window/dist/index.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-window/dist/index.esm.js ***!
  \*****************************************************/
/*! exports provided: VariableSizeGrid, VariableSizeList, FixedSizeGrid, FixedSizeList, areEqual, shouldComponentUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariableSizeGrid", function() { return VariableSizeGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariableSizeList", function() { return VariableSizeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixedSizeGrid", function() { return FixedSizeGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixedSizeList", function() { return FixedSizeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areEqual", function() { return areEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldComponentUpdate", function() { return shouldComponentUpdate; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");







// Animation frame based implementation of setTimeout.
// Inspired by Joe Lambert, https://gist.github.com/joelambert/1002116#file-requesttimeout-js
var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
var now = hasNativePerformanceNow ? function () {
  return performance.now();
} : function () {
  return Date.now();
};
function cancelTimeout(timeoutID) {
  cancelAnimationFrame(timeoutID.id);
}
function requestTimeout(callback, delay) {
  var start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }

  var timeoutID = {
    id: requestAnimationFrame(tick)
  };
  return timeoutID;
}

var size = -1; // This utility copied from "dom-helpers" package.

function getScrollbarSize(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }

  if (size === -1 || recalculate) {
    var div = document.createElement('div');
    var style = div.style;
    style.width = '50px';
    style.height = '50px';
    style.overflow = 'scroll';
    document.body.appendChild(div);
    size = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }

  return size;
}
var cachedRTLResult = null; // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
// Chrome does not seem to adhere; its scrollLeft values are positive (measured relative to the left).
// Safari's elastic bounce makes detecting this even more complicated wrt potential false positives.
// The safest way to check this is to intentionally set a negative offset,
// and then verify that the subsequent "scroll" event matches the negative offset.
// If it does not match, then we can assume a non-standard RTL scroll implementation.

function getRTLOffsetType(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }

  if (cachedRTLResult === null || recalculate) {
    var outerDiv = document.createElement('div');
    var outerStyle = outerDiv.style;
    outerStyle.width = '50px';
    outerStyle.height = '50px';
    outerStyle.overflow = 'scroll';
    outerStyle.direction = 'rtl';
    var innerDiv = document.createElement('div');
    var innerStyle = innerDiv.style;
    innerStyle.width = '100px';
    innerStyle.height = '100px';
    outerDiv.appendChild(innerDiv);
    document.body.appendChild(outerDiv);

    if (outerDiv.scrollLeft > 0) {
      cachedRTLResult = 'positive-descending';
    } else {
      outerDiv.scrollLeft = 1;

      if (outerDiv.scrollLeft === 0) {
        cachedRTLResult = 'negative';
      } else {
        cachedRTLResult = 'positive-ascending';
      }
    }

    document.body.removeChild(outerDiv);
    return cachedRTLResult;
  }

  return cachedRTLResult;
}

var IS_SCROLLING_DEBOUNCE_INTERVAL = 150;

var defaultItemKey = function defaultItemKey(_ref) {
  var columnIndex = _ref.columnIndex,
      data = _ref.data,
      rowIndex = _ref.rowIndex;
  return rowIndex + ":" + columnIndex;
}; // In DEV mode, this Set helps us only log a warning once per component instance.
// This avoids spamming the console every time a render happens.


var devWarningsOverscanCount = null;
var devWarningsOverscanRowsColumnsCount = null;
var devWarningsTagName = null;

if (true) {
  if (typeof window !== 'undefined' && typeof window.WeakSet !== 'undefined') {
    devWarningsOverscanCount =
    /*#__PURE__*/
    new WeakSet();
    devWarningsOverscanRowsColumnsCount =
    /*#__PURE__*/
    new WeakSet();
    devWarningsTagName =
    /*#__PURE__*/
    new WeakSet();
  }
}

function createGridComponent(_ref2) {
  var _class, _temp;

  var getColumnOffset = _ref2.getColumnOffset,
      getColumnStartIndexForOffset = _ref2.getColumnStartIndexForOffset,
      getColumnStopIndexForStartIndex = _ref2.getColumnStopIndexForStartIndex,
      getColumnWidth = _ref2.getColumnWidth,
      getEstimatedTotalHeight = _ref2.getEstimatedTotalHeight,
      getEstimatedTotalWidth = _ref2.getEstimatedTotalWidth,
      getOffsetForColumnAndAlignment = _ref2.getOffsetForColumnAndAlignment,
      getOffsetForRowAndAlignment = _ref2.getOffsetForRowAndAlignment,
      getRowHeight = _ref2.getRowHeight,
      getRowOffset = _ref2.getRowOffset,
      getRowStartIndexForOffset = _ref2.getRowStartIndexForOffset,
      getRowStopIndexForStartIndex = _ref2.getRowStopIndexForStartIndex,
      initInstanceProps = _ref2.initInstanceProps,
      shouldResetStyleCacheOnItemSizeChange = _ref2.shouldResetStyleCacheOnItemSizeChange,
      validateProps = _ref2.validateProps;
  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Grid, _PureComponent);

    // Always use explicit constructor for React components.
    // It produces less code after transpilation. (#26)
    // eslint-disable-next-line no-useless-constructor
    function Grid(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this._instanceProps = initInstanceProps(_this.props, Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this)));
      _this._resetIsScrollingTimeoutId = null;
      _this._outerRef = void 0;
      _this.state = {
        instance: Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this)),
        isScrolling: false,
        horizontalScrollDirection: 'forward',
        scrollLeft: typeof _this.props.initialScrollLeft === 'number' ? _this.props.initialScrollLeft : 0,
        scrollTop: typeof _this.props.initialScrollTop === 'number' ? _this.props.initialScrollTop : 0,
        scrollUpdateWasRequested: false,
        verticalScrollDirection: 'forward'
      };
      _this._callOnItemsRendered = void 0;
      _this._callOnItemsRendered = Object(memoize_one__WEBPACK_IMPORTED_MODULE_3__["default"])(function (overscanColumnStartIndex, overscanColumnStopIndex, overscanRowStartIndex, overscanRowStopIndex, visibleColumnStartIndex, visibleColumnStopIndex, visibleRowStartIndex, visibleRowStopIndex) {
        return _this.props.onItemsRendered({
          overscanColumnStartIndex: overscanColumnStartIndex,
          overscanColumnStopIndex: overscanColumnStopIndex,
          overscanRowStartIndex: overscanRowStartIndex,
          overscanRowStopIndex: overscanRowStopIndex,
          visibleColumnStartIndex: visibleColumnStartIndex,
          visibleColumnStopIndex: visibleColumnStopIndex,
          visibleRowStartIndex: visibleRowStartIndex,
          visibleRowStopIndex: visibleRowStopIndex
        });
      });
      _this._callOnScroll = void 0;
      _this._callOnScroll = Object(memoize_one__WEBPACK_IMPORTED_MODULE_3__["default"])(function (scrollLeft, scrollTop, horizontalScrollDirection, verticalScrollDirection, scrollUpdateWasRequested) {
        return _this.props.onScroll({
          horizontalScrollDirection: horizontalScrollDirection,
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          verticalScrollDirection: verticalScrollDirection,
          scrollUpdateWasRequested: scrollUpdateWasRequested
        });
      });
      _this._getItemStyle = void 0;

      _this._getItemStyle = function (rowIndex, columnIndex) {
        var _this$props = _this.props,
            columnWidth = _this$props.columnWidth,
            direction = _this$props.direction,
            rowHeight = _this$props.rowHeight;

        var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && columnWidth, shouldResetStyleCacheOnItemSizeChange && direction, shouldResetStyleCacheOnItemSizeChange && rowHeight);

        var key = rowIndex + ":" + columnIndex;
        var style;

        if (itemStyleCache.hasOwnProperty(key)) {
          style = itemStyleCache[key];
        } else {
          var _offset = getColumnOffset(_this.props, columnIndex, _this._instanceProps);

          var isRtl = direction === 'rtl';
          itemStyleCache[key] = style = {
            position: 'absolute',
            left: isRtl ? undefined : _offset,
            right: isRtl ? _offset : undefined,
            top: getRowOffset(_this.props, rowIndex, _this._instanceProps),
            height: getRowHeight(_this.props, rowIndex, _this._instanceProps),
            width: getColumnWidth(_this.props, columnIndex, _this._instanceProps)
          };
        }

        return style;
      };

      _this._getItemStyleCache = void 0;
      _this._getItemStyleCache = Object(memoize_one__WEBPACK_IMPORTED_MODULE_3__["default"])(function (_, __, ___) {
        return {};
      });

      _this._onScroll = function (event) {
        var _event$currentTarget = event.currentTarget,
            clientHeight = _event$currentTarget.clientHeight,
            clientWidth = _event$currentTarget.clientWidth,
            scrollLeft = _event$currentTarget.scrollLeft,
            scrollTop = _event$currentTarget.scrollTop,
            scrollHeight = _event$currentTarget.scrollHeight,
            scrollWidth = _event$currentTarget.scrollWidth;

        _this.setState(function (prevState) {
          if (prevState.scrollLeft === scrollLeft && prevState.scrollTop === scrollTop) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          }

          var direction = _this.props.direction; // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
          // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
          // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
          // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.

          var calculatedScrollLeft = scrollLeft;

          if (direction === 'rtl') {
            switch (getRTLOffsetType()) {
              case 'negative':
                calculatedScrollLeft = -scrollLeft;
                break;

              case 'positive-descending':
                calculatedScrollLeft = scrollWidth - clientWidth - scrollLeft;
                break;
            }
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          calculatedScrollLeft = Math.max(0, Math.min(calculatedScrollLeft, scrollWidth - clientWidth));
          var calculatedScrollTop = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
          return {
            isScrolling: true,
            horizontalScrollDirection: prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
            scrollLeft: calculatedScrollLeft,
            scrollTop: calculatedScrollTop,
            verticalScrollDirection: prevState.scrollTop < scrollTop ? 'forward' : 'backward',
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._outerRefSetter = function (ref) {
        var outerRef = _this.props.outerRef;
        _this._outerRef = ref;

        if (typeof outerRef === 'function') {
          outerRef(ref);
        } else if (outerRef != null && typeof outerRef === 'object' && outerRef.hasOwnProperty('current')) {
          outerRef.current = ref;
        }
      };

      _this._resetIsScrollingDebounced = function () {
        if (_this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(_this._resetIsScrollingTimeoutId);
        }

        _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL);
      };

      _this._resetIsScrolling = function () {
        _this._resetIsScrollingTimeoutId = null;

        _this.setState({
          isScrolling: false
        }, function () {
          // Clear style cache after state update has been committed.
          // This way we don't break pure sCU for items that don't use isScrolling param.
          _this._getItemStyleCache(-1);
        });
      };

      return _this;
    }

    Grid.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      validateSharedProps(nextProps, prevState);
      validateProps(nextProps);
      return null;
    };

    var _proto = Grid.prototype;

    _proto.scrollTo = function scrollTo(_ref3) {
      var scrollLeft = _ref3.scrollLeft,
          scrollTop = _ref3.scrollTop;

      if (scrollLeft !== undefined) {
        scrollLeft = Math.max(0, scrollLeft);
      }

      if (scrollTop !== undefined) {
        scrollTop = Math.max(0, scrollTop);
      }

      this.setState(function (prevState) {
        if (scrollLeft === undefined) {
          scrollLeft = prevState.scrollLeft;
        }

        if (scrollTop === undefined) {
          scrollTop = prevState.scrollTop;
        }

        if (prevState.scrollLeft === scrollLeft && prevState.scrollTop === scrollTop) {
          return null;
        }

        return {
          horizontalScrollDirection: prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          scrollUpdateWasRequested: true,
          verticalScrollDirection: prevState.scrollTop < scrollTop ? 'forward' : 'backward'
        };
      }, this._resetIsScrollingDebounced);
    };

    _proto.scrollToItem = function scrollToItem(_ref4) {
      var _ref4$align = _ref4.align,
          align = _ref4$align === void 0 ? 'auto' : _ref4$align,
          columnIndex = _ref4.columnIndex,
          rowIndex = _ref4.rowIndex;
      var _this$props2 = this.props,
          columnCount = _this$props2.columnCount,
          height = _this$props2.height,
          rowCount = _this$props2.rowCount,
          width = _this$props2.width;
      var _this$state = this.state,
          scrollLeft = _this$state.scrollLeft,
          scrollTop = _this$state.scrollTop;
      var scrollbarSize = getScrollbarSize();

      if (columnIndex !== undefined) {
        columnIndex = Math.max(0, Math.min(columnIndex, columnCount - 1));
      }

      if (rowIndex !== undefined) {
        rowIndex = Math.max(0, Math.min(rowIndex, rowCount - 1));
      }

      var estimatedTotalHeight = getEstimatedTotalHeight(this.props, this._instanceProps);
      var estimatedTotalWidth = getEstimatedTotalWidth(this.props, this._instanceProps); // The scrollbar size should be considered when scrolling an item into view,
      // to ensure it's fully visible.
      // But we only need to account for its size when it's actually visible.

      var horizontalScrollbarSize = estimatedTotalWidth > width ? scrollbarSize : 0;
      var verticalScrollbarSize = estimatedTotalHeight > height ? scrollbarSize : 0;
      this.scrollTo({
        scrollLeft: columnIndex !== undefined ? getOffsetForColumnAndAlignment(this.props, columnIndex, align, scrollLeft, this._instanceProps, verticalScrollbarSize) : scrollLeft,
        scrollTop: rowIndex !== undefined ? getOffsetForRowAndAlignment(this.props, rowIndex, align, scrollTop, this._instanceProps, horizontalScrollbarSize) : scrollTop
      });
    };

    _proto.componentDidMount = function componentDidMount() {
      var _this$props3 = this.props,
          initialScrollLeft = _this$props3.initialScrollLeft,
          initialScrollTop = _this$props3.initialScrollTop;

      if (this._outerRef != null) {
        var outerRef = this._outerRef;

        if (typeof initialScrollLeft === 'number') {
          outerRef.scrollLeft = initialScrollLeft;
        }

        if (typeof initialScrollTop === 'number') {
          outerRef.scrollTop = initialScrollTop;
        }
      }

      this._callPropsCallbacks();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      var direction = this.props.direction;
      var _this$state2 = this.state,
          scrollLeft = _this$state2.scrollLeft,
          scrollTop = _this$state2.scrollTop,
          scrollUpdateWasRequested = _this$state2.scrollUpdateWasRequested;

      if (scrollUpdateWasRequested && this._outerRef != null) {
        // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
        // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
        // So we need to determine which browser behavior we're dealing with, and mimic it.
        var outerRef = this._outerRef;

        if (direction === 'rtl') {
          switch (getRTLOffsetType()) {
            case 'negative':
              outerRef.scrollLeft = -scrollLeft;
              break;

            case 'positive-ascending':
              outerRef.scrollLeft = scrollLeft;
              break;

            default:
              var clientWidth = outerRef.clientWidth,
                  scrollWidth = outerRef.scrollWidth;
              outerRef.scrollLeft = scrollWidth - clientWidth - scrollLeft;
              break;
          }
        } else {
          outerRef.scrollLeft = Math.max(0, scrollLeft);
        }

        outerRef.scrollTop = Math.max(0, scrollTop);
      }

      this._callPropsCallbacks();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    };

    _proto.render = function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          className = _this$props4.className,
          columnCount = _this$props4.columnCount,
          direction = _this$props4.direction,
          height = _this$props4.height,
          innerRef = _this$props4.innerRef,
          innerElementType = _this$props4.innerElementType,
          innerTagName = _this$props4.innerTagName,
          itemData = _this$props4.itemData,
          _this$props4$itemKey = _this$props4.itemKey,
          itemKey = _this$props4$itemKey === void 0 ? defaultItemKey : _this$props4$itemKey,
          outerElementType = _this$props4.outerElementType,
          outerTagName = _this$props4.outerTagName,
          rowCount = _this$props4.rowCount,
          style = _this$props4.style,
          useIsScrolling = _this$props4.useIsScrolling,
          width = _this$props4.width;
      var isScrolling = this.state.isScrolling;

      var _this$_getHorizontalR = this._getHorizontalRangeToRender(),
          columnStartIndex = _this$_getHorizontalR[0],
          columnStopIndex = _this$_getHorizontalR[1];

      var _this$_getVerticalRan = this._getVerticalRangeToRender(),
          rowStartIndex = _this$_getVerticalRan[0],
          rowStopIndex = _this$_getVerticalRan[1];

      var items = [];

      if (columnCount > 0 && rowCount) {
        for (var _rowIndex = rowStartIndex; _rowIndex <= rowStopIndex; _rowIndex++) {
          for (var _columnIndex = columnStartIndex; _columnIndex <= columnStopIndex; _columnIndex++) {
            items.push(Object(react__WEBPACK_IMPORTED_MODULE_4__["createElement"])(children, {
              columnIndex: _columnIndex,
              data: itemData,
              isScrolling: useIsScrolling ? isScrolling : undefined,
              key: itemKey({
                columnIndex: _columnIndex,
                data: itemData,
                rowIndex: _rowIndex
              }),
              rowIndex: _rowIndex,
              style: this._getItemStyle(_rowIndex, _columnIndex)
            }));
          }
        }
      } // Read this value AFTER items have been created,
      // So their actual sizes (if variable) are taken into consideration.


      var estimatedTotalHeight = getEstimatedTotalHeight(this.props, this._instanceProps);
      var estimatedTotalWidth = getEstimatedTotalWidth(this.props, this._instanceProps);
      return Object(react__WEBPACK_IMPORTED_MODULE_4__["createElement"])(outerElementType || outerTagName || 'div', {
        className: className,
        onScroll: this._onScroll,
        ref: this._outerRefSetter,
        style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          position: 'relative',
          height: height,
          width: width,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform',
          direction: direction
        }, style)
      }, Object(react__WEBPACK_IMPORTED_MODULE_4__["createElement"])(innerElementType || innerTagName || 'div', {
        children: items,
        ref: innerRef,
        style: {
          height: estimatedTotalHeight,
          pointerEvents: isScrolling ? 'none' : undefined,
          width: estimatedTotalWidth
        }
      }));
    };

    _proto._callPropsCallbacks = function _callPropsCallbacks() {
      var _this$props5 = this.props,
          columnCount = _this$props5.columnCount,
          onItemsRendered = _this$props5.onItemsRendered,
          onScroll = _this$props5.onScroll,
          rowCount = _this$props5.rowCount;

      if (typeof onItemsRendered === 'function') {
        if (columnCount > 0 && rowCount > 0) {
          var _this$_getHorizontalR2 = this._getHorizontalRangeToRender(),
              _overscanColumnStartIndex = _this$_getHorizontalR2[0],
              _overscanColumnStopIndex = _this$_getHorizontalR2[1],
              _visibleColumnStartIndex = _this$_getHorizontalR2[2],
              _visibleColumnStopIndex = _this$_getHorizontalR2[3];

          var _this$_getVerticalRan2 = this._getVerticalRangeToRender(),
              _overscanRowStartIndex = _this$_getVerticalRan2[0],
              _overscanRowStopIndex = _this$_getVerticalRan2[1],
              _visibleRowStartIndex = _this$_getVerticalRan2[2],
              _visibleRowStopIndex = _this$_getVerticalRan2[3];

          this._callOnItemsRendered(_overscanColumnStartIndex, _overscanColumnStopIndex, _overscanRowStartIndex, _overscanRowStopIndex, _visibleColumnStartIndex, _visibleColumnStopIndex, _visibleRowStartIndex, _visibleRowStopIndex);
        }
      }

      if (typeof onScroll === 'function') {
        var _this$state3 = this.state,
            _horizontalScrollDirection = _this$state3.horizontalScrollDirection,
            _scrollLeft = _this$state3.scrollLeft,
            _scrollTop = _this$state3.scrollTop,
            _scrollUpdateWasRequested = _this$state3.scrollUpdateWasRequested,
            _verticalScrollDirection = _this$state3.verticalScrollDirection;

        this._callOnScroll(_scrollLeft, _scrollTop, _horizontalScrollDirection, _verticalScrollDirection, _scrollUpdateWasRequested);
      }
    }; // Lazily create and cache item styles while scrolling,
    // So that pure component sCU will prevent re-renders.
    // We maintain this cache, and pass a style prop rather than index,
    // So that List can clear cached styles and force item re-render if necessary.


    _proto._getHorizontalRangeToRender = function _getHorizontalRangeToRender() {
      var _this$props6 = this.props,
          columnCount = _this$props6.columnCount,
          overscanColumnCount = _this$props6.overscanColumnCount,
          overscanColumnsCount = _this$props6.overscanColumnsCount,
          overscanCount = _this$props6.overscanCount,
          rowCount = _this$props6.rowCount;
      var _this$state4 = this.state,
          horizontalScrollDirection = _this$state4.horizontalScrollDirection,
          isScrolling = _this$state4.isScrolling,
          scrollLeft = _this$state4.scrollLeft;
      var overscanCountResolved = overscanColumnCount || overscanColumnsCount || overscanCount || 1;

      if (columnCount === 0 || rowCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getColumnStartIndexForOffset(this.props, scrollLeft, this._instanceProps);
      var stopIndex = getColumnStopIndexForStartIndex(this.props, startIndex, scrollLeft, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || horizontalScrollDirection === 'backward' ? Math.max(1, overscanCountResolved) : 1;
      var overscanForward = !isScrolling || horizontalScrollDirection === 'forward' ? Math.max(1, overscanCountResolved) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(columnCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    _proto._getVerticalRangeToRender = function _getVerticalRangeToRender() {
      var _this$props7 = this.props,
          columnCount = _this$props7.columnCount,
          overscanCount = _this$props7.overscanCount,
          overscanRowCount = _this$props7.overscanRowCount,
          overscanRowsCount = _this$props7.overscanRowsCount,
          rowCount = _this$props7.rowCount;
      var _this$state5 = this.state,
          isScrolling = _this$state5.isScrolling,
          verticalScrollDirection = _this$state5.verticalScrollDirection,
          scrollTop = _this$state5.scrollTop;
      var overscanCountResolved = overscanRowCount || overscanRowsCount || overscanCount || 1;

      if (columnCount === 0 || rowCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getRowStartIndexForOffset(this.props, scrollTop, this._instanceProps);
      var stopIndex = getRowStopIndexForStartIndex(this.props, startIndex, scrollTop, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || verticalScrollDirection === 'backward' ? Math.max(1, overscanCountResolved) : 1;
      var overscanForward = !isScrolling || verticalScrollDirection === 'forward' ? Math.max(1, overscanCountResolved) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(rowCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    return Grid;
  }(react__WEBPACK_IMPORTED_MODULE_4__["PureComponent"]), _class.defaultProps = {
    direction: 'ltr',
    itemData: undefined,
    useIsScrolling: false
  }, _temp;
}

var validateSharedProps = function validateSharedProps(_ref5, _ref6) {
  var children = _ref5.children,
      direction = _ref5.direction,
      height = _ref5.height,
      innerTagName = _ref5.innerTagName,
      outerTagName = _ref5.outerTagName,
      overscanColumnsCount = _ref5.overscanColumnsCount,
      overscanCount = _ref5.overscanCount,
      overscanRowsCount = _ref5.overscanRowsCount,
      width = _ref5.width;
  var instance = _ref6.instance;

  if (true) {
    if (typeof overscanCount === 'number') {
      if (devWarningsOverscanCount && !devWarningsOverscanCount.has(instance)) {
        devWarningsOverscanCount.add(instance);
        console.warn('The overscanCount prop has been deprecated. ' + 'Please use the overscanColumnCount and overscanRowCount props instead.');
      }
    }

    if (typeof overscanColumnsCount === 'number' || typeof overscanRowsCount === 'number') {
      if (devWarningsOverscanRowsColumnsCount && !devWarningsOverscanRowsColumnsCount.has(instance)) {
        devWarningsOverscanRowsColumnsCount.add(instance);
        console.warn('The overscanColumnsCount and overscanRowsCount props have been deprecated. ' + 'Please use the overscanColumnCount and overscanRowCount props instead.');
      }
    }

    if (innerTagName != null || outerTagName != null) {
      if (devWarningsTagName && !devWarningsTagName.has(instance)) {
        devWarningsTagName.add(instance);
        console.warn('The innerTagName and outerTagName props have been deprecated. ' + 'Please use the innerElementType and outerElementType props instead.');
      }
    }

    if (children == null) {
      throw Error('An invalid "children" prop has been specified. ' + 'Value should be a React component. ' + ("\"" + (children === null ? 'null' : typeof children) + "\" was specified."));
    }

    switch (direction) {
      case 'ltr':
      case 'rtl':
        // Valid values
        break;

      default:
        throw Error('An invalid "direction" prop has been specified. ' + 'Value should be either "ltr" or "rtl". ' + ("\"" + direction + "\" was specified."));
    }

    if (typeof width !== 'number') {
      throw Error('An invalid "width" prop has been specified. ' + 'Grids must specify a number for width. ' + ("\"" + (width === null ? 'null' : typeof width) + "\" was specified."));
    }

    if (typeof height !== 'number') {
      throw Error('An invalid "height" prop has been specified. ' + 'Grids must specify a number for height. ' + ("\"" + (height === null ? 'null' : typeof height) + "\" was specified."));
    }
  }
};

var DEFAULT_ESTIMATED_ITEM_SIZE = 50;

var getEstimatedTotalHeight = function getEstimatedTotalHeight(_ref, _ref2) {
  var rowCount = _ref.rowCount;
  var rowMetadataMap = _ref2.rowMetadataMap,
      estimatedRowHeight = _ref2.estimatedRowHeight,
      lastMeasuredRowIndex = _ref2.lastMeasuredRowIndex;
  var totalSizeOfMeasuredRows = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138

  if (lastMeasuredRowIndex >= rowCount) {
    lastMeasuredRowIndex = rowCount - 1;
  }

  if (lastMeasuredRowIndex >= 0) {
    var itemMetadata = rowMetadataMap[lastMeasuredRowIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }

  var numUnmeasuredItems = rowCount - lastMeasuredRowIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedRowHeight;
  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};

var getEstimatedTotalWidth = function getEstimatedTotalWidth(_ref3, _ref4) {
  var columnCount = _ref3.columnCount;
  var columnMetadataMap = _ref4.columnMetadataMap,
      estimatedColumnWidth = _ref4.estimatedColumnWidth,
      lastMeasuredColumnIndex = _ref4.lastMeasuredColumnIndex;
  var totalSizeOfMeasuredRows = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138

  if (lastMeasuredColumnIndex >= columnCount) {
    lastMeasuredColumnIndex = columnCount - 1;
  }

  if (lastMeasuredColumnIndex >= 0) {
    var itemMetadata = columnMetadataMap[lastMeasuredColumnIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }

  var numUnmeasuredItems = columnCount - lastMeasuredColumnIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedColumnWidth;
  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};

var getItemMetadata = function getItemMetadata(itemType, props, index, instanceProps) {
  var itemMetadataMap, itemSize, lastMeasuredIndex;

  if (itemType === 'column') {
    itemMetadataMap = instanceProps.columnMetadataMap;
    itemSize = props.columnWidth;
    lastMeasuredIndex = instanceProps.lastMeasuredColumnIndex;
  } else {
    itemMetadataMap = instanceProps.rowMetadataMap;
    itemSize = props.rowHeight;
    lastMeasuredIndex = instanceProps.lastMeasuredRowIndex;
  }

  if (index > lastMeasuredIndex) {
    var offset = 0;

    if (lastMeasuredIndex >= 0) {
      var itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;
    }

    for (var i = lastMeasuredIndex + 1; i <= index; i++) {
      var size = itemSize(i);
      itemMetadataMap[i] = {
        offset: offset,
        size: size
      };
      offset += size;
    }

    if (itemType === 'column') {
      instanceProps.lastMeasuredColumnIndex = index;
    } else {
      instanceProps.lastMeasuredRowIndex = index;
    }
  }

  return itemMetadataMap[index];
};

var findNearestItem = function findNearestItem(itemType, props, instanceProps, offset) {
  var itemMetadataMap, lastMeasuredIndex;

  if (itemType === 'column') {
    itemMetadataMap = instanceProps.columnMetadataMap;
    lastMeasuredIndex = instanceProps.lastMeasuredColumnIndex;
  } else {
    itemMetadataMap = instanceProps.rowMetadataMap;
    lastMeasuredIndex = instanceProps.lastMeasuredRowIndex;
  }

  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;

  if (lastMeasuredItemOffset >= offset) {
    // If we've already measured items within this range just use a binary search as it's faster.
    return findNearestItemBinarySearch(itemType, props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
    // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
    // The overall complexity for this approach is O(log n).
    return findNearestItemExponentialSearch(itemType, props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
};

var findNearestItemBinarySearch = function findNearestItemBinarySearch(itemType, props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = getItemMetadata(itemType, props, middle, instanceProps).offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};

var findNearestItemExponentialSearch = function findNearestItemExponentialSearch(itemType, props, instanceProps, index, offset) {
  var itemCount = itemType === 'column' ? props.columnCount : props.rowCount;
  var interval = 1;

  while (index < itemCount && getItemMetadata(itemType, props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }

  return findNearestItemBinarySearch(itemType, props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
};

var getOffsetForIndexAndAlignment = function getOffsetForIndexAndAlignment(itemType, props, index, align, scrollOffset, instanceProps, scrollbarSize) {
  var size = itemType === 'column' ? props.width : props.height;
  var itemMetadata = getItemMetadata(itemType, props, index, instanceProps); // Get estimated total size after ItemMetadata is computed,
  // To ensure it reflects actual measurements instead of just estimates.

  var estimatedTotalSize = itemType === 'column' ? getEstimatedTotalWidth(props, instanceProps) : getEstimatedTotalHeight(props, instanceProps);
  var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size, itemMetadata.offset));
  var minOffset = Math.max(0, itemMetadata.offset - size + scrollbarSize + itemMetadata.size);

  if (align === 'smart') {
    if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
      align = 'auto';
    } else {
      align = 'center';
    }
  }

  switch (align) {
    case 'start':
      return maxOffset;

    case 'end':
      return minOffset;

    case 'center':
      return Math.round(minOffset + (maxOffset - minOffset) / 2);

    case 'auto':
    default:
      if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
        return scrollOffset;
      } else if (minOffset > maxOffset) {
        // Because we only take into account the scrollbar size when calculating minOffset
        // this value can be larger than maxOffset when at the end of the list
        return minOffset;
      } else if (scrollOffset < minOffset) {
        return minOffset;
      } else {
        return maxOffset;
      }

  }
};

var VariableSizeGrid =
/*#__PURE__*/
createGridComponent({
  getColumnOffset: function getColumnOffset(props, index, instanceProps) {
    return getItemMetadata('column', props, index, instanceProps).offset;
  },
  getColumnStartIndexForOffset: function getColumnStartIndexForOffset(props, scrollLeft, instanceProps) {
    return findNearestItem('column', props, instanceProps, scrollLeft);
  },
  getColumnStopIndexForStartIndex: function getColumnStopIndexForStartIndex(props, startIndex, scrollLeft, instanceProps) {
    var columnCount = props.columnCount,
        width = props.width;
    var itemMetadata = getItemMetadata('column', props, startIndex, instanceProps);
    var maxOffset = scrollLeft + width;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;

    while (stopIndex < columnCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata('column', props, stopIndex, instanceProps).size;
    }

    return stopIndex;
  },
  getColumnWidth: function getColumnWidth(props, index, instanceProps) {
    return instanceProps.columnMetadataMap[index].size;
  },
  getEstimatedTotalHeight: getEstimatedTotalHeight,
  getEstimatedTotalWidth: getEstimatedTotalWidth,
  getOffsetForColumnAndAlignment: function getOffsetForColumnAndAlignment(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    return getOffsetForIndexAndAlignment('column', props, index, align, scrollOffset, instanceProps, scrollbarSize);
  },
  getOffsetForRowAndAlignment: function getOffsetForRowAndAlignment(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    return getOffsetForIndexAndAlignment('row', props, index, align, scrollOffset, instanceProps, scrollbarSize);
  },
  getRowOffset: function getRowOffset(props, index, instanceProps) {
    return getItemMetadata('row', props, index, instanceProps).offset;
  },
  getRowHeight: function getRowHeight(props, index, instanceProps) {
    return instanceProps.rowMetadataMap[index].size;
  },
  getRowStartIndexForOffset: function getRowStartIndexForOffset(props, scrollTop, instanceProps) {
    return findNearestItem('row', props, instanceProps, scrollTop);
  },
  getRowStopIndexForStartIndex: function getRowStopIndexForStartIndex(props, startIndex, scrollTop, instanceProps) {
    var rowCount = props.rowCount,
        height = props.height;
    var itemMetadata = getItemMetadata('row', props, startIndex, instanceProps);
    var maxOffset = scrollTop + height;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;

    while (stopIndex < rowCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata('row', props, stopIndex, instanceProps).size;
    }

    return stopIndex;
  },
  initInstanceProps: function initInstanceProps(props, instance) {
    var _ref5 = props,
        estimatedColumnWidth = _ref5.estimatedColumnWidth,
        estimatedRowHeight = _ref5.estimatedRowHeight;
    var instanceProps = {
      columnMetadataMap: {},
      estimatedColumnWidth: estimatedColumnWidth || DEFAULT_ESTIMATED_ITEM_SIZE,
      estimatedRowHeight: estimatedRowHeight || DEFAULT_ESTIMATED_ITEM_SIZE,
      lastMeasuredColumnIndex: -1,
      lastMeasuredRowIndex: -1,
      rowMetadataMap: {}
    };

    instance.resetAfterColumnIndex = function (columnIndex, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }

      instance.resetAfterIndices({
        columnIndex: columnIndex,
        shouldForceUpdate: shouldForceUpdate
      });
    };

    instance.resetAfterRowIndex = function (rowIndex, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }

      instance.resetAfterIndices({
        rowIndex: rowIndex,
        shouldForceUpdate: shouldForceUpdate
      });
    };

    instance.resetAfterIndices = function (_ref6) {
      var columnIndex = _ref6.columnIndex,
          rowIndex = _ref6.rowIndex,
          _ref6$shouldForceUpda = _ref6.shouldForceUpdate,
          shouldForceUpdate = _ref6$shouldForceUpda === void 0 ? true : _ref6$shouldForceUpda;

      if (typeof columnIndex === 'number') {
        instanceProps.lastMeasuredColumnIndex = Math.min(instanceProps.lastMeasuredColumnIndex, columnIndex - 1);
      }

      if (typeof rowIndex === 'number') {
        instanceProps.lastMeasuredRowIndex = Math.min(instanceProps.lastMeasuredRowIndex, rowIndex - 1);
      } // We could potentially optimize further by only evicting styles after this index,
      // But since styles are only cached while scrolling is in progress-
      // It seems an unnecessary optimization.
      // It's unlikely that resetAfterIndex() will be called while a user is scrolling.


      instance._getItemStyleCache(-1);

      if (shouldForceUpdate) {
        instance.forceUpdate();
      }
    };

    return instanceProps;
  },
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: function validateProps(_ref7) {
    var columnWidth = _ref7.columnWidth,
        rowHeight = _ref7.rowHeight;

    if (true) {
      if (typeof columnWidth !== 'function') {
        throw Error('An invalid "columnWidth" prop has been specified. ' + 'Value should be a function. ' + ("\"" + (columnWidth === null ? 'null' : typeof columnWidth) + "\" was specified."));
      } else if (typeof rowHeight !== 'function') {
        throw Error('An invalid "rowHeight" prop has been specified. ' + 'Value should be a function. ' + ("\"" + (rowHeight === null ? 'null' : typeof rowHeight) + "\" was specified."));
      }
    }
  }
});

var IS_SCROLLING_DEBOUNCE_INTERVAL$1 = 150;

var defaultItemKey$1 = function defaultItemKey(index, data) {
  return index;
}; // In DEV mode, this Set helps us only log a warning once per component instance.
// This avoids spamming the console every time a render happens.


var devWarningsDirection = null;
var devWarningsTagName$1 = null;

if (true) {
  if (typeof window !== 'undefined' && typeof window.WeakSet !== 'undefined') {
    devWarningsDirection =
    /*#__PURE__*/
    new WeakSet();
    devWarningsTagName$1 =
    /*#__PURE__*/
    new WeakSet();
  }
}

function createListComponent(_ref) {
  var _class, _temp;

  var getItemOffset = _ref.getItemOffset,
      getEstimatedTotalSize = _ref.getEstimatedTotalSize,
      getItemSize = _ref.getItemSize,
      getOffsetForIndexAndAlignment = _ref.getOffsetForIndexAndAlignment,
      getStartIndexForOffset = _ref.getStartIndexForOffset,
      getStopIndexForStartIndex = _ref.getStopIndexForStartIndex,
      initInstanceProps = _ref.initInstanceProps,
      shouldResetStyleCacheOnItemSizeChange = _ref.shouldResetStyleCacheOnItemSizeChange,
      validateProps = _ref.validateProps;
  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(List, _PureComponent);

    // Always use explicit constructor for React components.
    // It produces less code after transpilation. (#26)
    // eslint-disable-next-line no-useless-constructor
    function List(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this._instanceProps = initInstanceProps(_this.props, Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this)));
      _this._outerRef = void 0;
      _this._resetIsScrollingTimeoutId = null;
      _this.state = {
        instance: Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this)),
        isScrolling: false,
        scrollDirection: 'forward',
        scrollOffset: typeof _this.props.initialScrollOffset === 'number' ? _this.props.initialScrollOffset : 0,
        scrollUpdateWasRequested: false
      };
      _this._callOnItemsRendered = void 0;
      _this._callOnItemsRendered = Object(memoize_one__WEBPACK_IMPORTED_MODULE_3__["default"])(function (overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex) {
        return _this.props.onItemsRendered({
          overscanStartIndex: overscanStartIndex,
          overscanStopIndex: overscanStopIndex,
          visibleStartIndex: visibleStartIndex,
          visibleStopIndex: visibleStopIndex
        });
      });
      _this._callOnScroll = void 0;
      _this._callOnScroll = Object(memoize_one__WEBPACK_IMPORTED_MODULE_3__["default"])(function (scrollDirection, scrollOffset, scrollUpdateWasRequested) {
        return _this.props.onScroll({
          scrollDirection: scrollDirection,
          scrollOffset: scrollOffset,
          scrollUpdateWasRequested: scrollUpdateWasRequested
        });
      });
      _this._getItemStyle = void 0;

      _this._getItemStyle = function (index) {
        var _this$props = _this.props,
            direction = _this$props.direction,
            itemSize = _this$props.itemSize,
            layout = _this$props.layout;

        var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && itemSize, shouldResetStyleCacheOnItemSizeChange && layout, shouldResetStyleCacheOnItemSizeChange && direction);

        var style;

        if (itemStyleCache.hasOwnProperty(index)) {
          style = itemStyleCache[index];
        } else {
          var _offset = getItemOffset(_this.props, index, _this._instanceProps);

          var size = getItemSize(_this.props, index, _this._instanceProps); // TODO Deprecate direction "horizontal"

          var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
          var isRtl = direction === 'rtl';
          var offsetHorizontal = isHorizontal ? _offset : 0;
          itemStyleCache[index] = style = {
            position: 'absolute',
            left: isRtl ? undefined : offsetHorizontal,
            right: isRtl ? offsetHorizontal : undefined,
            top: !isHorizontal ? _offset : 0,
            height: !isHorizontal ? size : '100%',
            width: isHorizontal ? size : '100%'
          };
        }

        return style;
      };

      _this._getItemStyleCache = void 0;
      _this._getItemStyleCache = Object(memoize_one__WEBPACK_IMPORTED_MODULE_3__["default"])(function (_, __, ___) {
        return {};
      });

      _this._onScrollHorizontal = function (event) {
        var _event$currentTarget = event.currentTarget,
            clientWidth = _event$currentTarget.clientWidth,
            scrollLeft = _event$currentTarget.scrollLeft,
            scrollWidth = _event$currentTarget.scrollWidth;

        _this.setState(function (prevState) {
          if (prevState.scrollOffset === scrollLeft) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          }

          var direction = _this.props.direction;
          var scrollOffset = scrollLeft;

          if (direction === 'rtl') {
            // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
            // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
            // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
            // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.
            switch (getRTLOffsetType()) {
              case 'negative':
                scrollOffset = -scrollLeft;
                break;

              case 'positive-descending':
                scrollOffset = scrollWidth - clientWidth - scrollLeft;
                break;
            }
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollLeft ? 'forward' : 'backward',
            scrollOffset: scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._onScrollVertical = function (event) {
        var _event$currentTarget2 = event.currentTarget,
            clientHeight = _event$currentTarget2.clientHeight,
            scrollHeight = _event$currentTarget2.scrollHeight,
            scrollTop = _event$currentTarget2.scrollTop;

        _this.setState(function (prevState) {
          if (prevState.scrollOffset === scrollTop) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          var scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
            scrollOffset: scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._outerRefSetter = function (ref) {
        var outerRef = _this.props.outerRef;
        _this._outerRef = ref;

        if (typeof outerRef === 'function') {
          outerRef(ref);
        } else if (outerRef != null && typeof outerRef === 'object' && outerRef.hasOwnProperty('current')) {
          outerRef.current = ref;
        }
      };

      _this._resetIsScrollingDebounced = function () {
        if (_this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(_this._resetIsScrollingTimeoutId);
        }

        _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL$1);
      };

      _this._resetIsScrolling = function () {
        _this._resetIsScrollingTimeoutId = null;

        _this.setState({
          isScrolling: false
        }, function () {
          // Clear style cache after state update has been committed.
          // This way we don't break pure sCU for items that don't use isScrolling param.
          _this._getItemStyleCache(-1, null);
        });
      };

      return _this;
    }

    List.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      validateSharedProps$1(nextProps, prevState);
      validateProps(nextProps);
      return null;
    };

    var _proto = List.prototype;

    _proto.scrollTo = function scrollTo(scrollOffset) {
      scrollOffset = Math.max(0, scrollOffset);
      this.setState(function (prevState) {
        if (prevState.scrollOffset === scrollOffset) {
          return null;
        }

        return {
          scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
          scrollOffset: scrollOffset,
          scrollUpdateWasRequested: true
        };
      }, this._resetIsScrollingDebounced);
    };

    _proto.scrollToItem = function scrollToItem(index, align) {
      if (align === void 0) {
        align = 'auto';
      }

      var itemCount = this.props.itemCount;
      var scrollOffset = this.state.scrollOffset;
      index = Math.max(0, Math.min(index, itemCount - 1));
      this.scrollTo(getOffsetForIndexAndAlignment(this.props, index, align, scrollOffset, this._instanceProps));
    };

    _proto.componentDidMount = function componentDidMount() {
      var _this$props2 = this.props,
          direction = _this$props2.direction,
          initialScrollOffset = _this$props2.initialScrollOffset,
          layout = _this$props2.layout;

      if (typeof initialScrollOffset === 'number' && this._outerRef != null) {
        var outerRef = this._outerRef; // TODO Deprecate direction "horizontal"

        if (direction === 'horizontal' || layout === 'horizontal') {
          outerRef.scrollLeft = initialScrollOffset;
        } else {
          outerRef.scrollTop = initialScrollOffset;
        }
      }

      this._callPropsCallbacks();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      var _this$props3 = this.props,
          direction = _this$props3.direction,
          layout = _this$props3.layout;
      var _this$state = this.state,
          scrollOffset = _this$state.scrollOffset,
          scrollUpdateWasRequested = _this$state.scrollUpdateWasRequested;

      if (scrollUpdateWasRequested && this._outerRef != null) {
        var outerRef = this._outerRef; // TODO Deprecate direction "horizontal"

        if (direction === 'horizontal' || layout === 'horizontal') {
          if (direction === 'rtl') {
            // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
            // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
            // So we need to determine which browser behavior we're dealing with, and mimic it.
            switch (getRTLOffsetType()) {
              case 'negative':
                outerRef.scrollLeft = -scrollOffset;
                break;

              case 'positive-ascending':
                outerRef.scrollLeft = scrollOffset;
                break;

              default:
                var clientWidth = outerRef.clientWidth,
                    scrollWidth = outerRef.scrollWidth;
                outerRef.scrollLeft = scrollWidth - clientWidth - scrollOffset;
                break;
            }
          } else {
            outerRef.scrollLeft = scrollOffset;
          }
        } else {
          outerRef.scrollTop = scrollOffset;
        }
      }

      this._callPropsCallbacks();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    };

    _proto.render = function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          className = _this$props4.className,
          direction = _this$props4.direction,
          height = _this$props4.height,
          innerRef = _this$props4.innerRef,
          innerElementType = _this$props4.innerElementType,
          innerTagName = _this$props4.innerTagName,
          itemCount = _this$props4.itemCount,
          itemData = _this$props4.itemData,
          _this$props4$itemKey = _this$props4.itemKey,
          itemKey = _this$props4$itemKey === void 0 ? defaultItemKey$1 : _this$props4$itemKey,
          layout = _this$props4.layout,
          outerElementType = _this$props4.outerElementType,
          outerTagName = _this$props4.outerTagName,
          style = _this$props4.style,
          useIsScrolling = _this$props4.useIsScrolling,
          width = _this$props4.width;
      var isScrolling = this.state.isScrolling; // TODO Deprecate direction "horizontal"

      var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
      var onScroll = isHorizontal ? this._onScrollHorizontal : this._onScrollVertical;

      var _this$_getRangeToRend = this._getRangeToRender(),
          startIndex = _this$_getRangeToRend[0],
          stopIndex = _this$_getRangeToRend[1];

      var items = [];

      if (itemCount > 0) {
        for (var _index = startIndex; _index <= stopIndex; _index++) {
          items.push(Object(react__WEBPACK_IMPORTED_MODULE_4__["createElement"])(children, {
            data: itemData,
            key: itemKey(_index, itemData),
            index: _index,
            isScrolling: useIsScrolling ? isScrolling : undefined,
            style: this._getItemStyle(_index)
          }));
        }
      } // Read this value AFTER items have been created,
      // So their actual sizes (if variable) are taken into consideration.


      var estimatedTotalSize = getEstimatedTotalSize(this.props, this._instanceProps);
      return Object(react__WEBPACK_IMPORTED_MODULE_4__["createElement"])(outerElementType || outerTagName || 'div', {
        className: className,
        onScroll: onScroll,
        ref: this._outerRefSetter,
        style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          position: 'relative',
          height: height,
          width: width,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform',
          direction: direction
        }, style)
      }, Object(react__WEBPACK_IMPORTED_MODULE_4__["createElement"])(innerElementType || innerTagName || 'div', {
        children: items,
        ref: innerRef,
        style: {
          height: isHorizontal ? '100%' : estimatedTotalSize,
          pointerEvents: isScrolling ? 'none' : undefined,
          width: isHorizontal ? estimatedTotalSize : '100%'
        }
      }));
    };

    _proto._callPropsCallbacks = function _callPropsCallbacks() {
      if (typeof this.props.onItemsRendered === 'function') {
        var itemCount = this.props.itemCount;

        if (itemCount > 0) {
          var _this$_getRangeToRend2 = this._getRangeToRender(),
              _overscanStartIndex = _this$_getRangeToRend2[0],
              _overscanStopIndex = _this$_getRangeToRend2[1],
              _visibleStartIndex = _this$_getRangeToRend2[2],
              _visibleStopIndex = _this$_getRangeToRend2[3];

          this._callOnItemsRendered(_overscanStartIndex, _overscanStopIndex, _visibleStartIndex, _visibleStopIndex);
        }
      }

      if (typeof this.props.onScroll === 'function') {
        var _this$state2 = this.state,
            _scrollDirection = _this$state2.scrollDirection,
            _scrollOffset = _this$state2.scrollOffset,
            _scrollUpdateWasRequested = _this$state2.scrollUpdateWasRequested;

        this._callOnScroll(_scrollDirection, _scrollOffset, _scrollUpdateWasRequested);
      }
    }; // Lazily create and cache item styles while scrolling,
    // So that pure component sCU will prevent re-renders.
    // We maintain this cache, and pass a style prop rather than index,
    // So that List can clear cached styles and force item re-render if necessary.


    _proto._getRangeToRender = function _getRangeToRender() {
      var _this$props5 = this.props,
          itemCount = _this$props5.itemCount,
          overscanCount = _this$props5.overscanCount;
      var _this$state3 = this.state,
          isScrolling = _this$state3.isScrolling,
          scrollDirection = _this$state3.scrollDirection,
          scrollOffset = _this$state3.scrollOffset;

      if (itemCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getStartIndexForOffset(this.props, scrollOffset, this._instanceProps);
      var stopIndex = getStopIndexForStartIndex(this.props, startIndex, scrollOffset, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || scrollDirection === 'backward' ? Math.max(1, overscanCount) : 1;
      var overscanForward = !isScrolling || scrollDirection === 'forward' ? Math.max(1, overscanCount) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    return List;
  }(react__WEBPACK_IMPORTED_MODULE_4__["PureComponent"]), _class.defaultProps = {
    direction: 'ltr',
    itemData: undefined,
    layout: 'vertical',
    overscanCount: 2,
    useIsScrolling: false
  }, _temp;
} // NOTE: I considered further wrapping individual items with a pure ListItem component.
// This would avoid ever calling the render function for the same index more than once,
// But it would also add the overhead of a lot of components/fibers.
// I assume people already do this (render function returning a class component),
// So my doing it would just unnecessarily double the wrappers.

var validateSharedProps$1 = function validateSharedProps(_ref2, _ref3) {
  var children = _ref2.children,
      direction = _ref2.direction,
      height = _ref2.height,
      layout = _ref2.layout,
      innerTagName = _ref2.innerTagName,
      outerTagName = _ref2.outerTagName,
      width = _ref2.width;
  var instance = _ref3.instance;

  if (true) {
    if (innerTagName != null || outerTagName != null) {
      if (devWarningsTagName$1 && !devWarningsTagName$1.has(instance)) {
        devWarningsTagName$1.add(instance);
        console.warn('The innerTagName and outerTagName props have been deprecated. ' + 'Please use the innerElementType and outerElementType props instead.');
      }
    } // TODO Deprecate direction "horizontal"


    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';

    switch (direction) {
      case 'horizontal':
      case 'vertical':
        if (devWarningsDirection && !devWarningsDirection.has(instance)) {
          devWarningsDirection.add(instance);
          console.warn('The direction prop should be either "ltr" (default) or "rtl". ' + 'Please use the layout prop to specify "vertical" (default) or "horizontal" orientation.');
        }

        break;

      case 'ltr':
      case 'rtl':
        // Valid values
        break;

      default:
        throw Error('An invalid "direction" prop has been specified. ' + 'Value should be either "ltr" or "rtl". ' + ("\"" + direction + "\" was specified."));
    }

    switch (layout) {
      case 'horizontal':
      case 'vertical':
        // Valid values
        break;

      default:
        throw Error('An invalid "layout" prop has been specified. ' + 'Value should be either "horizontal" or "vertical". ' + ("\"" + layout + "\" was specified."));
    }

    if (children == null) {
      throw Error('An invalid "children" prop has been specified. ' + 'Value should be a React component. ' + ("\"" + (children === null ? 'null' : typeof children) + "\" was specified."));
    }

    if (isHorizontal && typeof width !== 'number') {
      throw Error('An invalid "width" prop has been specified. ' + 'Horizontal lists must specify a number for width. ' + ("\"" + (width === null ? 'null' : typeof width) + "\" was specified."));
    } else if (!isHorizontal && typeof height !== 'number') {
      throw Error('An invalid "height" prop has been specified. ' + 'Vertical lists must specify a number for height. ' + ("\"" + (height === null ? 'null' : typeof height) + "\" was specified."));
    }
  }
};

var DEFAULT_ESTIMATED_ITEM_SIZE$1 = 50;

var getItemMetadata$1 = function getItemMetadata(props, index, instanceProps) {
  var _ref = props,
      itemSize = _ref.itemSize;
  var itemMetadataMap = instanceProps.itemMetadataMap,
      lastMeasuredIndex = instanceProps.lastMeasuredIndex;

  if (index > lastMeasuredIndex) {
    var offset = 0;

    if (lastMeasuredIndex >= 0) {
      var itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;
    }

    for (var i = lastMeasuredIndex + 1; i <= index; i++) {
      var size = itemSize(i);
      itemMetadataMap[i] = {
        offset: offset,
        size: size
      };
      offset += size;
    }

    instanceProps.lastMeasuredIndex = index;
  }

  return itemMetadataMap[index];
};

var findNearestItem$1 = function findNearestItem(props, instanceProps, offset) {
  var itemMetadataMap = instanceProps.itemMetadataMap,
      lastMeasuredIndex = instanceProps.lastMeasuredIndex;
  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;

  if (lastMeasuredItemOffset >= offset) {
    // If we've already measured items within this range just use a binary search as it's faster.
    return findNearestItemBinarySearch$1(props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
    // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
    // The overall complexity for this approach is O(log n).
    return findNearestItemExponentialSearch$1(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
};

var findNearestItemBinarySearch$1 = function findNearestItemBinarySearch(props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = getItemMetadata$1(props, middle, instanceProps).offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};

var findNearestItemExponentialSearch$1 = function findNearestItemExponentialSearch(props, instanceProps, index, offset) {
  var itemCount = props.itemCount;
  var interval = 1;

  while (index < itemCount && getItemMetadata$1(props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }

  return findNearestItemBinarySearch$1(props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
};

var getEstimatedTotalSize = function getEstimatedTotalSize(_ref2, _ref3) {
  var itemCount = _ref2.itemCount;
  var itemMetadataMap = _ref3.itemMetadataMap,
      estimatedItemSize = _ref3.estimatedItemSize,
      lastMeasuredIndex = _ref3.lastMeasuredIndex;
  var totalSizeOfMeasuredItems = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138

  if (lastMeasuredIndex >= itemCount) {
    lastMeasuredIndex = itemCount - 1;
  }

  if (lastMeasuredIndex >= 0) {
    var itemMetadata = itemMetadataMap[lastMeasuredIndex];
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
  }

  var numUnmeasuredItems = itemCount - lastMeasuredIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;
  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
};

var VariableSizeList =
/*#__PURE__*/
createListComponent({
  getItemOffset: function getItemOffset(props, index, instanceProps) {
    return getItemMetadata$1(props, index, instanceProps).offset;
  },
  getItemSize: function getItemSize(props, index, instanceProps) {
    return instanceProps.itemMetadataMap[index].size;
  },
  getEstimatedTotalSize: getEstimatedTotalSize,
  getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment(props, index, align, scrollOffset, instanceProps) {
    var direction = props.direction,
        height = props.height,
        layout = props.layout,
        width = props.width; // TODO Deprecate direction "horizontal"

    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata$1(props, index, instanceProps); // Get estimated total size after ItemMetadata is computed,
    // To ensure it reflects actual measurements instead of just estimates.

    var estimatedTotalSize = getEstimatedTotalSize(props, instanceProps);
    var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size, itemMetadata.offset));
    var minOffset = Math.max(0, itemMetadata.offset - size + itemMetadata.size);

    if (align === 'smart') {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        return Math.round(minOffset + (maxOffset - minOffset) / 2);

      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getStartIndexForOffset: function getStartIndexForOffset(props, offset, instanceProps) {
    return findNearestItem$1(props, instanceProps, offset);
  },
  getStopIndexForStartIndex: function getStopIndexForStartIndex(props, startIndex, scrollOffset, instanceProps) {
    var direction = props.direction,
        height = props.height,
        itemCount = props.itemCount,
        layout = props.layout,
        width = props.width; // TODO Deprecate direction "horizontal"

    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata$1(props, startIndex, instanceProps);
    var maxOffset = scrollOffset + size;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;

    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata$1(props, stopIndex, instanceProps).size;
    }

    return stopIndex;
  },
  initInstanceProps: function initInstanceProps(props, instance) {
    var _ref4 = props,
        estimatedItemSize = _ref4.estimatedItemSize;
    var instanceProps = {
      itemMetadataMap: {},
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_ITEM_SIZE$1,
      lastMeasuredIndex: -1
    };

    instance.resetAfterIndex = function (index, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }

      instanceProps.lastMeasuredIndex = Math.min(instanceProps.lastMeasuredIndex, index - 1); // We could potentially optimize further by only evicting styles after this index,
      // But since styles are only cached while scrolling is in progress-
      // It seems an unnecessary optimization.
      // It's unlikely that resetAfterIndex() will be called while a user is scrolling.

      instance._getItemStyleCache(-1);

      if (shouldForceUpdate) {
        instance.forceUpdate();
      }
    };

    return instanceProps;
  },
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: function validateProps(_ref5) {
    var itemSize = _ref5.itemSize;

    if (true) {
      if (typeof itemSize !== 'function') {
        throw Error('An invalid "itemSize" prop has been specified. ' + 'Value should be a function. ' + ("\"" + (itemSize === null ? 'null' : typeof itemSize) + "\" was specified."));
      }
    }
  }
});

var FixedSizeGrid =
/*#__PURE__*/
createGridComponent({
  getColumnOffset: function getColumnOffset(_ref, index) {
    var columnWidth = _ref.columnWidth;
    return index * columnWidth;
  },
  getColumnWidth: function getColumnWidth(_ref2, index) {
    var columnWidth = _ref2.columnWidth;
    return columnWidth;
  },
  getRowOffset: function getRowOffset(_ref3, index) {
    var rowHeight = _ref3.rowHeight;
    return index * rowHeight;
  },
  getRowHeight: function getRowHeight(_ref4, index) {
    var rowHeight = _ref4.rowHeight;
    return rowHeight;
  },
  getEstimatedTotalHeight: function getEstimatedTotalHeight(_ref5) {
    var rowCount = _ref5.rowCount,
        rowHeight = _ref5.rowHeight;
    return rowHeight * rowCount;
  },
  getEstimatedTotalWidth: function getEstimatedTotalWidth(_ref6) {
    var columnCount = _ref6.columnCount,
        columnWidth = _ref6.columnWidth;
    return columnWidth * columnCount;
  },
  getOffsetForColumnAndAlignment: function getOffsetForColumnAndAlignment(_ref7, columnIndex, align, scrollLeft, instanceProps, scrollbarSize) {
    var columnCount = _ref7.columnCount,
        columnWidth = _ref7.columnWidth,
        width = _ref7.width;
    var lastColumnOffset = Math.max(0, columnCount * columnWidth - width);
    var maxOffset = Math.min(lastColumnOffset, columnIndex * columnWidth);
    var minOffset = Math.max(0, columnIndex * columnWidth - width + scrollbarSize + columnWidth);

    if (align === 'smart') {
      if (scrollLeft >= minOffset - width && scrollLeft <= maxOffset + width) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

        if (middleOffset < Math.ceil(width / 2)) {
          return 0; // near the beginning
        } else if (middleOffset > lastColumnOffset + Math.floor(width / 2)) {
          return lastColumnOffset; // near the end
        } else {
          return middleOffset;
        }

      case 'auto':
      default:
        if (scrollLeft >= minOffset && scrollLeft <= maxOffset) {
          return scrollLeft;
        } else if (minOffset > maxOffset) {
          // Because we only take into account the scrollbar size when calculating minOffset
          // this value can be larger than maxOffset when at the end of the list
          return minOffset;
        } else if (scrollLeft < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getOffsetForRowAndAlignment: function getOffsetForRowAndAlignment(_ref8, rowIndex, align, scrollTop, instanceProps, scrollbarSize) {
    var rowHeight = _ref8.rowHeight,
        height = _ref8.height,
        rowCount = _ref8.rowCount;
    var lastRowOffset = Math.max(0, rowCount * rowHeight - height);
    var maxOffset = Math.min(lastRowOffset, rowIndex * rowHeight);
    var minOffset = Math.max(0, rowIndex * rowHeight - height + scrollbarSize + rowHeight);

    if (align === 'smart') {
      if (scrollTop >= minOffset - height && scrollTop <= maxOffset + height) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

        if (middleOffset < Math.ceil(height / 2)) {
          return 0; // near the beginning
        } else if (middleOffset > lastRowOffset + Math.floor(height / 2)) {
          return lastRowOffset; // near the end
        } else {
          return middleOffset;
        }

      case 'auto':
      default:
        if (scrollTop >= minOffset && scrollTop <= maxOffset) {
          return scrollTop;
        } else if (minOffset > maxOffset) {
          // Because we only take into account the scrollbar size when calculating minOffset
          // this value can be larger than maxOffset when at the end of the list
          return minOffset;
        } else if (scrollTop < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getColumnStartIndexForOffset: function getColumnStartIndexForOffset(_ref9, scrollLeft) {
    var columnWidth = _ref9.columnWidth,
        columnCount = _ref9.columnCount;
    return Math.max(0, Math.min(columnCount - 1, Math.floor(scrollLeft / columnWidth)));
  },
  getColumnStopIndexForStartIndex: function getColumnStopIndexForStartIndex(_ref10, startIndex, scrollLeft) {
    var columnWidth = _ref10.columnWidth,
        columnCount = _ref10.columnCount,
        width = _ref10.width;
    var left = startIndex * columnWidth;
    var numVisibleColumns = Math.ceil((width + scrollLeft - left) / columnWidth);
    return Math.max(0, Math.min(columnCount - 1, startIndex + numVisibleColumns - 1 // -1 is because stop index is inclusive
    ));
  },
  getRowStartIndexForOffset: function getRowStartIndexForOffset(_ref11, scrollTop) {
    var rowHeight = _ref11.rowHeight,
        rowCount = _ref11.rowCount;
    return Math.max(0, Math.min(rowCount - 1, Math.floor(scrollTop / rowHeight)));
  },
  getRowStopIndexForStartIndex: function getRowStopIndexForStartIndex(_ref12, startIndex, scrollTop) {
    var rowHeight = _ref12.rowHeight,
        rowCount = _ref12.rowCount,
        height = _ref12.height;
    var top = startIndex * rowHeight;
    var numVisibleRows = Math.ceil((height + scrollTop - top) / rowHeight);
    return Math.max(0, Math.min(rowCount - 1, startIndex + numVisibleRows - 1 // -1 is because stop index is inclusive
    ));
  },
  initInstanceProps: function initInstanceProps(props) {// Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_ref13) {
    var columnWidth = _ref13.columnWidth,
        rowHeight = _ref13.rowHeight;

    if (true) {
      if (typeof columnWidth !== 'number') {
        throw Error('An invalid "columnWidth" prop has been specified. ' + 'Value should be a number. ' + ("\"" + (columnWidth === null ? 'null' : typeof columnWidth) + "\" was specified."));
      }

      if (typeof rowHeight !== 'number') {
        throw Error('An invalid "rowHeight" prop has been specified. ' + 'Value should be a number. ' + ("\"" + (rowHeight === null ? 'null' : typeof rowHeight) + "\" was specified."));
      }
    }
  }
});

var FixedSizeList =
/*#__PURE__*/
createListComponent({
  getItemOffset: function getItemOffset(_ref, index) {
    var itemSize = _ref.itemSize;
    return index * itemSize;
  },
  getItemSize: function getItemSize(_ref2, index) {
    var itemSize = _ref2.itemSize;
    return itemSize;
  },
  getEstimatedTotalSize: function getEstimatedTotalSize(_ref3) {
    var itemCount = _ref3.itemCount,
        itemSize = _ref3.itemSize;
    return itemSize * itemCount;
  },
  getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment(_ref4, index, align, scrollOffset) {
    var direction = _ref4.direction,
        height = _ref4.height,
        itemCount = _ref4.itemCount,
        itemSize = _ref4.itemSize,
        layout = _ref4.layout,
        width = _ref4.width;
    // TODO Deprecate direction "horizontal"
    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var lastItemOffset = Math.max(0, itemCount * itemSize - size);
    var maxOffset = Math.min(lastItemOffset, index * itemSize);
    var minOffset = Math.max(0, index * itemSize - size + itemSize);

    if (align === 'smart') {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        {
          // "Centered" offset is usually the average of the min and max.
          // But near the edges of the list, this doesn't hold true.
          var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

          if (middleOffset < Math.ceil(size / 2)) {
            return 0; // near the beginning
          } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
            return lastItemOffset; // near the end
          } else {
            return middleOffset;
          }
        }

      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getStartIndexForOffset: function getStartIndexForOffset(_ref5, offset) {
    var itemCount = _ref5.itemCount,
        itemSize = _ref5.itemSize;
    return Math.max(0, Math.min(itemCount - 1, Math.floor(offset / itemSize)));
  },
  getStopIndexForStartIndex: function getStopIndexForStartIndex(_ref6, startIndex, scrollOffset) {
    var direction = _ref6.direction,
        height = _ref6.height,
        itemCount = _ref6.itemCount,
        itemSize = _ref6.itemSize,
        layout = _ref6.layout,
        width = _ref6.width;
    // TODO Deprecate direction "horizontal"
    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
    var offset = startIndex * itemSize;
    var size = isHorizontal ? width : height;
    var numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize);
    return Math.max(0, Math.min(itemCount - 1, startIndex + numVisibleItems - 1 // -1 is because stop index is inclusive
    ));
  },
  initInstanceProps: function initInstanceProps(props) {// Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_ref7) {
    var itemSize = _ref7.itemSize;

    if (true) {
      if (typeof itemSize !== 'number') {
        throw Error('An invalid "itemSize" prop has been specified. ' + 'Value should be a number. ' + ("\"" + (itemSize === null ? 'null' : typeof itemSize) + "\" was specified."));
      }
    }
  }
});

// Pulled from react-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
function shallowDiffers(prev, next) {
  for (var attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }

  for (var _attribute in next) {
    if (prev[_attribute] !== next[_attribute]) {
      return true;
    }
  }

  return false;
}

// It knows to compare individual style props and ignore the wrapper object.
// See https://reactjs.org/docs/react-api.html#reactmemo

function areEqual(prevProps, nextProps) {
  var prevStyle = prevProps.style,
      prevRest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_5__["default"])(prevProps, ["style"]);

  var nextStyle = nextProps.style,
      nextRest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_5__["default"])(nextProps, ["style"]);

  return !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest);
}

// It knows to compare individual style props and ignore the wrapper object.
// See https://reactjs.org/docs/react-component.html#shouldcomponentupdate

function shouldComponentUpdate(nextProps, nextState) {
  return !areEqual(this.props, nextProps) || shallowDiffers(this.state, nextState);
}


//# sourceMappingURL=index.esm.js.map


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbWVtb2l6ZS1vbmUvZGlzdC9tZW1vaXplLW9uZS5lc20uanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXdpbmRvdy9kaXN0L2luZGV4LmVzbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLDBCQUEwQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHlFQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNuQzFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEQ7QUFDWTtBQUNnQjtBQUNqRDtBQUNnQjtBQUMrQzs7QUFFcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQXFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0ZBQWM7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0REFBNEQsZ0dBQXNCLENBQUMsZ0dBQXNCO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnR0FBc0IsQ0FBQyxnR0FBc0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywyREFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsNEJBQTRCLDJEQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQywyREFBVTtBQUMzQztBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOzs7QUFHWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdGQUF3RjtBQUN4RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwyQ0FBMkMsMkJBQTJCO0FBQ3RFLG1EQUFtRCxpQ0FBaUM7QUFDcEYsdUJBQXVCLDJEQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBLGFBQWEsMkRBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrRkFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPLEVBQUUsMkRBQWE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0dBQStHO0FBQy9HOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyR0FBMkc7QUFDM0c7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHLENBQUMsbURBQWE7QUFDakI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxJQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUEsSUFBSSxJQUFxQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHdGQUFjOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNERBQTRELGdHQUFzQixDQUFDLGdHQUFzQjtBQUN6RztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0dBQXNCLENBQUMsZ0dBQXNCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywyREFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLDRCQUE0QiwyREFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLDJFQUEyRTs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsMkRBQVU7QUFDM0M7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOzs7QUFHWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7OztBQUdYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDOztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHFDQUFxQyxxQkFBcUI7QUFDMUQscUJBQXFCLDJEQUFhO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0EsYUFBYSwyREFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtGQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU8sRUFBRSwyREFBYTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJHQUEyRztBQUMzRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUcsQ0FBQyxtREFBYTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxJQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsWUFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7QUFFNUI7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZGQUE2RjtBQUM3RjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUztBQUNULGtDQUFrQztBQUNsQyxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CLFNBQVM7QUFDVCwrQkFBK0I7QUFDL0IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHdEQUF3RDtBQUN4RCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckIsV0FBVztBQUNYLGtDQUFrQztBQUNsQyxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCx3REFBd0Q7QUFDeEQsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQix1R0FBNkI7O0FBRTlDO0FBQ0EsaUJBQWlCLHVHQUE2Qjs7QUFFOUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFNkc7QUFDN0ciLCJmaWxlIjoiLi9hc3NldHMvZGlzdC92ZW5kb3JzfmN1c3RvbWVyfmhvbWV+b3JkZXIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhcmVJbnB1dHNFcXVhbChuZXdJbnB1dHMsIGxhc3RJbnB1dHMpIHtcbiAgICBpZiAobmV3SW5wdXRzLmxlbmd0aCAhPT0gbGFzdElucHV0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0lucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobmV3SW5wdXRzW2ldICE9PSBsYXN0SW5wdXRzW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG1lbW9pemVPbmUocmVzdWx0Rm4sIGlzRXF1YWwpIHtcbiAgICBpZiAoaXNFcXVhbCA9PT0gdm9pZCAwKSB7IGlzRXF1YWwgPSBhcmVJbnB1dHNFcXVhbDsgfVxuICAgIHZhciBsYXN0VGhpcztcbiAgICB2YXIgbGFzdEFyZ3MgPSBbXTtcbiAgICB2YXIgbGFzdFJlc3VsdDtcbiAgICB2YXIgY2FsbGVkT25jZSA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIG1lbW9pemVkKCkge1xuICAgICAgICB2YXIgbmV3QXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbmV3QXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsZWRPbmNlICYmIGxhc3RUaGlzID09PSB0aGlzICYmIGlzRXF1YWwobmV3QXJncywgbGFzdEFyZ3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBsYXN0UmVzdWx0ID0gcmVzdWx0Rm4uYXBwbHkodGhpcywgbmV3QXJncyk7XG4gICAgICAgIGNhbGxlZE9uY2UgPSB0cnVlO1xuICAgICAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgICAgIGxhc3RBcmdzID0gbmV3QXJncztcbiAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiBtZW1vaXplZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZU9uZTtcbiIsImltcG9ydCBfZXh0ZW5kcyBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzJztcbmltcG9ydCBfaW5oZXJpdHNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlJztcbmltcG9ydCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZCc7XG5pbXBvcnQgbWVtb2l6ZU9uZSBmcm9tICdtZW1vaXplLW9uZSc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gJ0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UnO1xuXG4vLyBBbmltYXRpb24gZnJhbWUgYmFzZWQgaW1wbGVtZW50YXRpb24gb2Ygc2V0VGltZW91dC5cbi8vIEluc3BpcmVkIGJ5IEpvZSBMYW1iZXJ0LCBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qb2VsYW1iZXJ0LzEwMDIxMTYjZmlsZS1yZXF1ZXN0dGltZW91dC1qc1xudmFyIGhhc05hdGl2ZVBlcmZvcm1hbmNlTm93ID0gdHlwZW9mIHBlcmZvcm1hbmNlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ID09PSAnZnVuY3Rpb24nO1xudmFyIG5vdyA9IGhhc05hdGl2ZVBlcmZvcm1hbmNlTm93ID8gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7XG59IDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gRGF0ZS5ub3coKTtcbn07XG5mdW5jdGlvbiBjYW5jZWxUaW1lb3V0KHRpbWVvdXRJRCkge1xuICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aW1lb3V0SUQuaWQpO1xufVxuZnVuY3Rpb24gcmVxdWVzdFRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5KSB7XG4gIHZhciBzdGFydCA9IG5vdygpO1xuXG4gIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgaWYgKG5vdygpIC0gc3RhcnQgPj0gZGVsYXkpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwobnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVvdXRJRC5pZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICB9XG4gIH1cblxuICB2YXIgdGltZW91dElEID0ge1xuICAgIGlkOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljaylcbiAgfTtcbiAgcmV0dXJuIHRpbWVvdXRJRDtcbn1cblxudmFyIHNpemUgPSAtMTsgLy8gVGhpcyB1dGlsaXR5IGNvcGllZCBmcm9tIFwiZG9tLWhlbHBlcnNcIiBwYWNrYWdlLlxuXG5mdW5jdGlvbiBnZXRTY3JvbGxiYXJTaXplKHJlY2FsY3VsYXRlKSB7XG4gIGlmIChyZWNhbGN1bGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmVjYWxjdWxhdGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChzaXplID09PSAtMSB8fCByZWNhbGN1bGF0ZSkge1xuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgc3R5bGUgPSBkaXYuc3R5bGU7XG4gICAgc3R5bGUud2lkdGggPSAnNTBweCc7XG4gICAgc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgIHN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHNpemUgPSBkaXYub2Zmc2V0V2lkdGggLSBkaXYuY2xpZW50V2lkdGg7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkaXYpO1xuICB9XG5cbiAgcmV0dXJuIHNpemU7XG59XG52YXIgY2FjaGVkUlRMUmVzdWx0ID0gbnVsbDsgLy8gVFJJQ0tZIEFjY29yZGluZyB0byB0aGUgc3BlYywgc2Nyb2xsTGVmdCBzaG91bGQgYmUgbmVnYXRpdmUgZm9yIFJUTCBhbGlnbmVkIGVsZW1lbnRzLlxuLy8gQ2hyb21lIGRvZXMgbm90IHNlZW0gdG8gYWRoZXJlOyBpdHMgc2Nyb2xsTGVmdCB2YWx1ZXMgYXJlIHBvc2l0aXZlIChtZWFzdXJlZCByZWxhdGl2ZSB0byB0aGUgbGVmdCkuXG4vLyBTYWZhcmkncyBlbGFzdGljIGJvdW5jZSBtYWtlcyBkZXRlY3RpbmcgdGhpcyBldmVuIG1vcmUgY29tcGxpY2F0ZWQgd3J0IHBvdGVudGlhbCBmYWxzZSBwb3NpdGl2ZXMuXG4vLyBUaGUgc2FmZXN0IHdheSB0byBjaGVjayB0aGlzIGlzIHRvIGludGVudGlvbmFsbHkgc2V0IGEgbmVnYXRpdmUgb2Zmc2V0LFxuLy8gYW5kIHRoZW4gdmVyaWZ5IHRoYXQgdGhlIHN1YnNlcXVlbnQgXCJzY3JvbGxcIiBldmVudCBtYXRjaGVzIHRoZSBuZWdhdGl2ZSBvZmZzZXQuXG4vLyBJZiBpdCBkb2VzIG5vdCBtYXRjaCwgdGhlbiB3ZSBjYW4gYXNzdW1lIGEgbm9uLXN0YW5kYXJkIFJUTCBzY3JvbGwgaW1wbGVtZW50YXRpb24uXG5cbmZ1bmN0aW9uIGdldFJUTE9mZnNldFR5cGUocmVjYWxjdWxhdGUpIHtcbiAgaWYgKHJlY2FsY3VsYXRlID09PSB2b2lkIDApIHtcbiAgICByZWNhbGN1bGF0ZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGNhY2hlZFJUTFJlc3VsdCA9PT0gbnVsbCB8fCByZWNhbGN1bGF0ZSkge1xuICAgIHZhciBvdXRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBvdXRlclN0eWxlID0gb3V0ZXJEaXYuc3R5bGU7XG4gICAgb3V0ZXJTdHlsZS53aWR0aCA9ICc1MHB4JztcbiAgICBvdXRlclN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICBvdXRlclN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCc7XG4gICAgb3V0ZXJTdHlsZS5kaXJlY3Rpb24gPSAncnRsJztcbiAgICB2YXIgaW5uZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgaW5uZXJTdHlsZSA9IGlubmVyRGl2LnN0eWxlO1xuICAgIGlubmVyU3R5bGUud2lkdGggPSAnMTAwcHgnO1xuICAgIGlubmVyU3R5bGUuaGVpZ2h0ID0gJzEwMHB4JztcbiAgICBvdXRlckRpdi5hcHBlbmRDaGlsZChpbm5lckRpdik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlckRpdik7XG5cbiAgICBpZiAob3V0ZXJEaXYuc2Nyb2xsTGVmdCA+IDApIHtcbiAgICAgIGNhY2hlZFJUTFJlc3VsdCA9ICdwb3NpdGl2ZS1kZXNjZW5kaW5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0ZXJEaXYuc2Nyb2xsTGVmdCA9IDE7XG5cbiAgICAgIGlmIChvdXRlckRpdi5zY3JvbGxMZWZ0ID09PSAwKSB7XG4gICAgICAgIGNhY2hlZFJUTFJlc3VsdCA9ICduZWdhdGl2ZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWNoZWRSVExSZXN1bHQgPSAncG9zaXRpdmUtYXNjZW5kaW5nJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG91dGVyRGl2KTtcbiAgICByZXR1cm4gY2FjaGVkUlRMUmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlZFJUTFJlc3VsdDtcbn1cblxudmFyIElTX1NDUk9MTElOR19ERUJPVU5DRV9JTlRFUlZBTCA9IDE1MDtcblxudmFyIGRlZmF1bHRJdGVtS2V5ID0gZnVuY3Rpb24gZGVmYXVsdEl0ZW1LZXkoX3JlZikge1xuICB2YXIgY29sdW1uSW5kZXggPSBfcmVmLmNvbHVtbkluZGV4LFxuICAgICAgZGF0YSA9IF9yZWYuZGF0YSxcbiAgICAgIHJvd0luZGV4ID0gX3JlZi5yb3dJbmRleDtcbiAgcmV0dXJuIHJvd0luZGV4ICsgXCI6XCIgKyBjb2x1bW5JbmRleDtcbn07IC8vIEluIERFViBtb2RlLCB0aGlzIFNldCBoZWxwcyB1cyBvbmx5IGxvZyBhIHdhcm5pbmcgb25jZSBwZXIgY29tcG9uZW50IGluc3RhbmNlLlxuLy8gVGhpcyBhdm9pZHMgc3BhbW1pbmcgdGhlIGNvbnNvbGUgZXZlcnkgdGltZSBhIHJlbmRlciBoYXBwZW5zLlxuXG5cbnZhciBkZXZXYXJuaW5nc092ZXJzY2FuQ291bnQgPSBudWxsO1xudmFyIGRldldhcm5pbmdzT3ZlcnNjYW5Sb3dzQ29sdW1uc0NvdW50ID0gbnVsbDtcbnZhciBkZXZXYXJuaW5nc1RhZ05hbWUgPSBudWxsO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5XZWFrU2V0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGRldldhcm5pbmdzT3ZlcnNjYW5Db3VudCA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIG5ldyBXZWFrU2V0KCk7XG4gICAgZGV2V2FybmluZ3NPdmVyc2NhblJvd3NDb2x1bW5zQ291bnQgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBuZXcgV2Vha1NldCgpO1xuICAgIGRldldhcm5pbmdzVGFnTmFtZSA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIG5ldyBXZWFrU2V0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlR3JpZENvbXBvbmVudChfcmVmMikge1xuICB2YXIgX2NsYXNzLCBfdGVtcDtcblxuICB2YXIgZ2V0Q29sdW1uT2Zmc2V0ID0gX3JlZjIuZ2V0Q29sdW1uT2Zmc2V0LFxuICAgICAgZ2V0Q29sdW1uU3RhcnRJbmRleEZvck9mZnNldCA9IF9yZWYyLmdldENvbHVtblN0YXJ0SW5kZXhGb3JPZmZzZXQsXG4gICAgICBnZXRDb2x1bW5TdG9wSW5kZXhGb3JTdGFydEluZGV4ID0gX3JlZjIuZ2V0Q29sdW1uU3RvcEluZGV4Rm9yU3RhcnRJbmRleCxcbiAgICAgIGdldENvbHVtbldpZHRoID0gX3JlZjIuZ2V0Q29sdW1uV2lkdGgsXG4gICAgICBnZXRFc3RpbWF0ZWRUb3RhbEhlaWdodCA9IF9yZWYyLmdldEVzdGltYXRlZFRvdGFsSGVpZ2h0LFxuICAgICAgZ2V0RXN0aW1hdGVkVG90YWxXaWR0aCA9IF9yZWYyLmdldEVzdGltYXRlZFRvdGFsV2lkdGgsXG4gICAgICBnZXRPZmZzZXRGb3JDb2x1bW5BbmRBbGlnbm1lbnQgPSBfcmVmMi5nZXRPZmZzZXRGb3JDb2x1bW5BbmRBbGlnbm1lbnQsXG4gICAgICBnZXRPZmZzZXRGb3JSb3dBbmRBbGlnbm1lbnQgPSBfcmVmMi5nZXRPZmZzZXRGb3JSb3dBbmRBbGlnbm1lbnQsXG4gICAgICBnZXRSb3dIZWlnaHQgPSBfcmVmMi5nZXRSb3dIZWlnaHQsXG4gICAgICBnZXRSb3dPZmZzZXQgPSBfcmVmMi5nZXRSb3dPZmZzZXQsXG4gICAgICBnZXRSb3dTdGFydEluZGV4Rm9yT2Zmc2V0ID0gX3JlZjIuZ2V0Um93U3RhcnRJbmRleEZvck9mZnNldCxcbiAgICAgIGdldFJvd1N0b3BJbmRleEZvclN0YXJ0SW5kZXggPSBfcmVmMi5nZXRSb3dTdG9wSW5kZXhGb3JTdGFydEluZGV4LFxuICAgICAgaW5pdEluc3RhbmNlUHJvcHMgPSBfcmVmMi5pbml0SW5zdGFuY2VQcm9wcyxcbiAgICAgIHNob3VsZFJlc2V0U3R5bGVDYWNoZU9uSXRlbVNpemVDaGFuZ2UgPSBfcmVmMi5zaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlLFxuICAgICAgdmFsaWRhdGVQcm9wcyA9IF9yZWYyLnZhbGlkYXRlUHJvcHM7XG4gIHJldHVybiBfdGVtcCA9IF9jbGFzcyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9QdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzTG9vc2UoR3JpZCwgX1B1cmVDb21wb25lbnQpO1xuXG4gICAgLy8gQWx3YXlzIHVzZSBleHBsaWNpdCBjb25zdHJ1Y3RvciBmb3IgUmVhY3QgY29tcG9uZW50cy5cbiAgICAvLyBJdCBwcm9kdWNlcyBsZXNzIGNvZGUgYWZ0ZXIgdHJhbnNwaWxhdGlvbi4gKCMyNilcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvclxuICAgIGZ1bmN0aW9uIEdyaWQocHJvcHMpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX3RoaXMgPSBfUHVyZUNvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMuX2luc3RhbmNlUHJvcHMgPSBpbml0SW5zdGFuY2VQcm9wcyhfdGhpcy5wcm9wcywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSkpO1xuICAgICAgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgX3RoaXMuX291dGVyUmVmID0gdm9pZCAwO1xuICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgIGluc3RhbmNlOiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSxcbiAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgICBob3Jpem9udGFsU2Nyb2xsRGlyZWN0aW9uOiAnZm9yd2FyZCcsXG4gICAgICAgIHNjcm9sbExlZnQ6IHR5cGVvZiBfdGhpcy5wcm9wcy5pbml0aWFsU2Nyb2xsTGVmdCA9PT0gJ251bWJlcicgPyBfdGhpcy5wcm9wcy5pbml0aWFsU2Nyb2xsTGVmdCA6IDAsXG4gICAgICAgIHNjcm9sbFRvcDogdHlwZW9mIF90aGlzLnByb3BzLmluaXRpYWxTY3JvbGxUb3AgPT09ICdudW1iZXInID8gX3RoaXMucHJvcHMuaW5pdGlhbFNjcm9sbFRvcCA6IDAsXG4gICAgICAgIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZDogZmFsc2UsXG4gICAgICAgIHZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uOiAnZm9yd2FyZCdcbiAgICAgIH07XG4gICAgICBfdGhpcy5fY2FsbE9uSXRlbXNSZW5kZXJlZCA9IHZvaWQgMDtcbiAgICAgIF90aGlzLl9jYWxsT25JdGVtc1JlbmRlcmVkID0gbWVtb2l6ZU9uZShmdW5jdGlvbiAob3ZlcnNjYW5Db2x1bW5TdGFydEluZGV4LCBvdmVyc2NhbkNvbHVtblN0b3BJbmRleCwgb3ZlcnNjYW5Sb3dTdGFydEluZGV4LCBvdmVyc2NhblJvd1N0b3BJbmRleCwgdmlzaWJsZUNvbHVtblN0YXJ0SW5kZXgsIHZpc2libGVDb2x1bW5TdG9wSW5kZXgsIHZpc2libGVSb3dTdGFydEluZGV4LCB2aXNpYmxlUm93U3RvcEluZGV4KSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5wcm9wcy5vbkl0ZW1zUmVuZGVyZWQoe1xuICAgICAgICAgIG92ZXJzY2FuQ29sdW1uU3RhcnRJbmRleDogb3ZlcnNjYW5Db2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIG92ZXJzY2FuQ29sdW1uU3RvcEluZGV4OiBvdmVyc2NhbkNvbHVtblN0b3BJbmRleCxcbiAgICAgICAgICBvdmVyc2NhblJvd1N0YXJ0SW5kZXg6IG92ZXJzY2FuUm93U3RhcnRJbmRleCxcbiAgICAgICAgICBvdmVyc2NhblJvd1N0b3BJbmRleDogb3ZlcnNjYW5Sb3dTdG9wSW5kZXgsXG4gICAgICAgICAgdmlzaWJsZUNvbHVtblN0YXJ0SW5kZXg6IHZpc2libGVDb2x1bW5TdGFydEluZGV4LFxuICAgICAgICAgIHZpc2libGVDb2x1bW5TdG9wSW5kZXg6IHZpc2libGVDb2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgdmlzaWJsZVJvd1N0YXJ0SW5kZXg6IHZpc2libGVSb3dTdGFydEluZGV4LFxuICAgICAgICAgIHZpc2libGVSb3dTdG9wSW5kZXg6IHZpc2libGVSb3dTdG9wSW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIF90aGlzLl9jYWxsT25TY3JvbGwgPSB2b2lkIDA7XG4gICAgICBfdGhpcy5fY2FsbE9uU2Nyb2xsID0gbWVtb2l6ZU9uZShmdW5jdGlvbiAoc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wLCBob3Jpem9udGFsU2Nyb2xsRGlyZWN0aW9uLCB2ZXJ0aWNhbFNjcm9sbERpcmVjdGlvbiwgc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5wcm9wcy5vblNjcm9sbCh7XG4gICAgICAgICAgaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbjogaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbixcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICAgIHZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uOiB2ZXJ0aWNhbFNjcm9sbERpcmVjdGlvbixcbiAgICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ6IHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgX3RoaXMuX2dldEl0ZW1TdHlsZSA9IHZvaWQgMDtcblxuICAgICAgX3RoaXMuX2dldEl0ZW1TdHlsZSA9IGZ1bmN0aW9uIChyb3dJbmRleCwgY29sdW1uSW5kZXgpIHtcbiAgICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgICBjb2x1bW5XaWR0aCA9IF90aGlzJHByb3BzLmNvbHVtbldpZHRoLFxuICAgICAgICAgICAgZGlyZWN0aW9uID0gX3RoaXMkcHJvcHMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgcm93SGVpZ2h0ID0gX3RoaXMkcHJvcHMucm93SGVpZ2h0O1xuXG4gICAgICAgIHZhciBpdGVtU3R5bGVDYWNoZSA9IF90aGlzLl9nZXRJdGVtU3R5bGVDYWNoZShzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlICYmIGNvbHVtbldpZHRoLCBzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlICYmIGRpcmVjdGlvbiwgc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSAmJiByb3dIZWlnaHQpO1xuXG4gICAgICAgIHZhciBrZXkgPSByb3dJbmRleCArIFwiOlwiICsgY29sdW1uSW5kZXg7XG4gICAgICAgIHZhciBzdHlsZTtcblxuICAgICAgICBpZiAoaXRlbVN0eWxlQ2FjaGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHN0eWxlID0gaXRlbVN0eWxlQ2FjaGVba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgX29mZnNldCA9IGdldENvbHVtbk9mZnNldChfdGhpcy5wcm9wcywgY29sdW1uSW5kZXgsIF90aGlzLl9pbnN0YW5jZVByb3BzKTtcblxuICAgICAgICAgIHZhciBpc1J0bCA9IGRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gICAgICAgICAgaXRlbVN0eWxlQ2FjaGVba2V5XSA9IHN0eWxlID0ge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBpc1J0bCA/IHVuZGVmaW5lZCA6IF9vZmZzZXQsXG4gICAgICAgICAgICByaWdodDogaXNSdGwgPyBfb2Zmc2V0IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdG9wOiBnZXRSb3dPZmZzZXQoX3RoaXMucHJvcHMsIHJvd0luZGV4LCBfdGhpcy5faW5zdGFuY2VQcm9wcyksXG4gICAgICAgICAgICBoZWlnaHQ6IGdldFJvd0hlaWdodChfdGhpcy5wcm9wcywgcm93SW5kZXgsIF90aGlzLl9pbnN0YW5jZVByb3BzKSxcbiAgICAgICAgICAgIHdpZHRoOiBnZXRDb2x1bW5XaWR0aChfdGhpcy5wcm9wcywgY29sdW1uSW5kZXgsIF90aGlzLl9pbnN0YW5jZVByb3BzKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5fZ2V0SXRlbVN0eWxlQ2FjaGUgPSB2b2lkIDA7XG4gICAgICBfdGhpcy5fZ2V0SXRlbVN0eWxlQ2FjaGUgPSBtZW1vaXplT25lKGZ1bmN0aW9uIChfLCBfXywgX19fKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0pO1xuXG4gICAgICBfdGhpcy5fb25TY3JvbGwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF9ldmVudCRjdXJyZW50VGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICAgIGNsaWVudEhlaWdodCA9IF9ldmVudCRjdXJyZW50VGFyZ2V0LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoID0gX2V2ZW50JGN1cnJlbnRUYXJnZXQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0ID0gX2V2ZW50JGN1cnJlbnRUYXJnZXQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IF9ldmVudCRjdXJyZW50VGFyZ2V0LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodCA9IF9ldmVudCRjdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbFdpZHRoID0gX2V2ZW50JGN1cnJlbnRUYXJnZXQuc2Nyb2xsV2lkdGg7XG5cbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKHByZXZTdGF0ZSkge1xuICAgICAgICAgIGlmIChwcmV2U3RhdGUuc2Nyb2xsTGVmdCA9PT0gc2Nyb2xsTGVmdCAmJiBwcmV2U3RhdGUuc2Nyb2xsVG9wID09PSBzY3JvbGxUb3ApIHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBwb3NpdGlvbiBtYXkgaGF2ZSBiZWVuIHVwZGF0ZWQgYnkgY0RNL2NEVSxcbiAgICAgICAgICAgIC8vIEluIHdoaWNoIGNhc2Ugd2UgZG9uJ3QgbmVlZCB0byB0cmlnZ2VyIGFub3RoZXIgcmVuZGVyLFxuICAgICAgICAgICAgLy8gQW5kIHdlIGRvbid0IHdhbnQgdG8gdXBkYXRlIHN0YXRlLmlzU2Nyb2xsaW5nLlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IF90aGlzLnByb3BzLmRpcmVjdGlvbjsgLy8gVFJJQ0tZIEFjY29yZGluZyB0byB0aGUgc3BlYywgc2Nyb2xsTGVmdCBzaG91bGQgYmUgbmVnYXRpdmUgZm9yIFJUTCBhbGlnbmVkIGVsZW1lbnRzLlxuICAgICAgICAgIC8vIFRoaXMgaXMgbm90IHRoZSBjYXNlIGZvciBhbGwgYnJvd3NlcnMgdGhvdWdoIChlLmcuIENocm9tZSByZXBvcnRzIHZhbHVlcyBhcyBwb3NpdGl2ZSwgbWVhc3VyZWQgcmVsYXRpdmUgdG8gdGhlIGxlZnQpLlxuICAgICAgICAgIC8vIEl0J3MgYWxzbyBlYXNpZXIgZm9yIHRoaXMgY29tcG9uZW50IGlmIHdlIGNvbnZlcnQgb2Zmc2V0cyB0byB0aGUgc2FtZSBmb3JtYXQgYXMgdGhleSB3b3VsZCBiZSBpbiBmb3IgbHRyLlxuICAgICAgICAgIC8vIFNvIHRoZSBzaW1wbGVzdCBzb2x1dGlvbiBpcyB0byBkZXRlcm1pbmUgd2hpY2ggYnJvd3NlciBiZWhhdmlvciB3ZSdyZSBkZWFsaW5nIHdpdGgsIGFuZCBjb252ZXJ0IGJhc2VkIG9uIGl0LlxuXG4gICAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcblxuICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGdldFJUTE9mZnNldFR5cGUoKSkge1xuICAgICAgICAgICAgICBjYXNlICduZWdhdGl2ZSc6XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFNjcm9sbExlZnQgPSAtc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlICdwb3NpdGl2ZS1kZXNjZW5kaW5nJzpcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVkU2Nyb2xsTGVmdCA9IHNjcm9sbFdpZHRoIC0gY2xpZW50V2lkdGggLSBzY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gLy8gUHJldmVudCBTYWZhcmkncyBlbGFzdGljIHNjcm9sbGluZyBmcm9tIGNhdXNpbmcgdmlzdWFsIHNoYWtpbmcgd2hlbiBzY3JvbGxpbmcgcGFzdCBib3VuZHMuXG5cblxuICAgICAgICAgIGNhbGN1bGF0ZWRTY3JvbGxMZWZ0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oY2FsY3VsYXRlZFNjcm9sbExlZnQsIHNjcm9sbFdpZHRoIC0gY2xpZW50V2lkdGgpKTtcbiAgICAgICAgICB2YXIgY2FsY3VsYXRlZFNjcm9sbFRvcCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0IC0gY2xpZW50SGVpZ2h0KSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgICAgICAgaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbjogcHJldlN0YXRlLnNjcm9sbExlZnQgPCBzY3JvbGxMZWZ0ID8gJ2ZvcndhcmQnIDogJ2JhY2t3YXJkJyxcbiAgICAgICAgICAgIHNjcm9sbExlZnQ6IGNhbGN1bGF0ZWRTY3JvbGxMZWZ0LFxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBjYWxjdWxhdGVkU2Nyb2xsVG9wLFxuICAgICAgICAgICAgdmVydGljYWxTY3JvbGxEaXJlY3Rpb246IHByZXZTdGF0ZS5zY3JvbGxUb3AgPCBzY3JvbGxUb3AgPyAnZm9yd2FyZCcgOiAnYmFja3dhcmQnLFxuICAgICAgICAgICAgc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH0sIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nRGVib3VuY2VkKTtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzLl9vdXRlclJlZlNldHRlciA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgdmFyIG91dGVyUmVmID0gX3RoaXMucHJvcHMub3V0ZXJSZWY7XG4gICAgICAgIF90aGlzLl9vdXRlclJlZiA9IHJlZjtcblxuICAgICAgICBpZiAodHlwZW9mIG91dGVyUmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb3V0ZXJSZWYocmVmKTtcbiAgICAgICAgfSBlbHNlIGlmIChvdXRlclJlZiAhPSBudWxsICYmIHR5cGVvZiBvdXRlclJlZiA9PT0gJ29iamVjdCcgJiYgb3V0ZXJSZWYuaGFzT3duUHJvcGVydHkoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgIG91dGVyUmVmLmN1cnJlbnQgPSByZWY7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nRGVib3VuY2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICAgICAgICBjYW5jZWxUaW1lb3V0KF90aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkID0gcmVxdWVzdFRpbWVvdXQoX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmcsIElTX1NDUk9MTElOR19ERUJPVU5DRV9JTlRFUlZBTCk7XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5fcmVzZXRJc1Njcm9sbGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQgPSBudWxsO1xuXG4gICAgICAgIF90aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBpc1Njcm9sbGluZzogZmFsc2VcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIENsZWFyIHN0eWxlIGNhY2hlIGFmdGVyIHN0YXRlIHVwZGF0ZSBoYXMgYmVlbiBjb21taXR0ZWQuXG4gICAgICAgICAgLy8gVGhpcyB3YXkgd2UgZG9uJ3QgYnJlYWsgcHVyZSBzQ1UgZm9yIGl0ZW1zIHRoYXQgZG9uJ3QgdXNlIGlzU2Nyb2xsaW5nIHBhcmFtLlxuICAgICAgICAgIF90aGlzLl9nZXRJdGVtU3R5bGVDYWNoZSgtMSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIEdyaWQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzID0gZnVuY3Rpb24gZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICB2YWxpZGF0ZVNoYXJlZFByb3BzKG5leHRQcm9wcywgcHJldlN0YXRlKTtcbiAgICAgIHZhbGlkYXRlUHJvcHMobmV4dFByb3BzKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB2YXIgX3Byb3RvID0gR3JpZC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8uc2Nyb2xsVG8gPSBmdW5jdGlvbiBzY3JvbGxUbyhfcmVmMykge1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcmVmMy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcCA9IF9yZWYzLnNjcm9sbFRvcDtcblxuICAgICAgaWYgKHNjcm9sbExlZnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzY3JvbGxMZWZ0ID0gTWF0aC5tYXgoMCwgc2Nyb2xsTGVmdCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzY3JvbGxUb3AgPSBNYXRoLm1heCgwLCBzY3JvbGxUb3ApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uIChwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHNjcm9sbExlZnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNjcm9sbExlZnQgPSBwcmV2U3RhdGUuc2Nyb2xsTGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY3JvbGxUb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNjcm9sbFRvcCA9IHByZXZTdGF0ZS5zY3JvbGxUb3A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldlN0YXRlLnNjcm9sbExlZnQgPT09IHNjcm9sbExlZnQgJiYgcHJldlN0YXRlLnNjcm9sbFRvcCA9PT0gc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhvcml6b250YWxTY3JvbGxEaXJlY3Rpb246IHByZXZTdGF0ZS5zY3JvbGxMZWZ0IDwgc2Nyb2xsTGVmdCA/ICdmb3J3YXJkJyA6ICdiYWNrd2FyZCcsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ6IHRydWUsXG4gICAgICAgICAgdmVydGljYWxTY3JvbGxEaXJlY3Rpb246IHByZXZTdGF0ZS5zY3JvbGxUb3AgPCBzY3JvbGxUb3AgPyAnZm9yd2FyZCcgOiAnYmFja3dhcmQnXG4gICAgICAgIH07XG4gICAgICB9LCB0aGlzLl9yZXNldElzU2Nyb2xsaW5nRGVib3VuY2VkKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLnNjcm9sbFRvSXRlbSA9IGZ1bmN0aW9uIHNjcm9sbFRvSXRlbShfcmVmNCkge1xuICAgICAgdmFyIF9yZWY0JGFsaWduID0gX3JlZjQuYWxpZ24sXG4gICAgICAgICAgYWxpZ24gPSBfcmVmNCRhbGlnbiA9PT0gdm9pZCAwID8gJ2F1dG8nIDogX3JlZjQkYWxpZ24sXG4gICAgICAgICAgY29sdW1uSW5kZXggPSBfcmVmNC5jb2x1bW5JbmRleCxcbiAgICAgICAgICByb3dJbmRleCA9IF9yZWY0LnJvd0luZGV4O1xuICAgICAgdmFyIF90aGlzJHByb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY29sdW1uQ291bnQgPSBfdGhpcyRwcm9wczIuY29sdW1uQ291bnQsXG4gICAgICAgICAgaGVpZ2h0ID0gX3RoaXMkcHJvcHMyLmhlaWdodCxcbiAgICAgICAgICByb3dDb3VudCA9IF90aGlzJHByb3BzMi5yb3dDb3VudCxcbiAgICAgICAgICB3aWR0aCA9IF90aGlzJHByb3BzMi53aWR0aDtcbiAgICAgIHZhciBfdGhpcyRzdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgc2Nyb2xsTGVmdCA9IF90aGlzJHN0YXRlLnNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsVG9wID0gX3RoaXMkc3RhdGUuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHNjcm9sbGJhclNpemUgPSBnZXRTY3JvbGxiYXJTaXplKCk7XG5cbiAgICAgIGlmIChjb2x1bW5JbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbkluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oY29sdW1uSW5kZXgsIGNvbHVtbkNvdW50IC0gMSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAocm93SW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByb3dJbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHJvd0luZGV4LCByb3dDb3VudCAtIDEpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVzdGltYXRlZFRvdGFsSGVpZ2h0ID0gZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQodGhpcy5wcm9wcywgdGhpcy5faW5zdGFuY2VQcm9wcyk7XG4gICAgICB2YXIgZXN0aW1hdGVkVG90YWxXaWR0aCA9IGdldEVzdGltYXRlZFRvdGFsV2lkdGgodGhpcy5wcm9wcywgdGhpcy5faW5zdGFuY2VQcm9wcyk7IC8vIFRoZSBzY3JvbGxiYXIgc2l6ZSBzaG91bGQgYmUgY29uc2lkZXJlZCB3aGVuIHNjcm9sbGluZyBhbiBpdGVtIGludG8gdmlldyxcbiAgICAgIC8vIHRvIGVuc3VyZSBpdCdzIGZ1bGx5IHZpc2libGUuXG4gICAgICAvLyBCdXQgd2Ugb25seSBuZWVkIHRvIGFjY291bnQgZm9yIGl0cyBzaXplIHdoZW4gaXQncyBhY3R1YWxseSB2aXNpYmxlLlxuXG4gICAgICB2YXIgaG9yaXpvbnRhbFNjcm9sbGJhclNpemUgPSBlc3RpbWF0ZWRUb3RhbFdpZHRoID4gd2lkdGggPyBzY3JvbGxiYXJTaXplIDogMDtcbiAgICAgIHZhciB2ZXJ0aWNhbFNjcm9sbGJhclNpemUgPSBlc3RpbWF0ZWRUb3RhbEhlaWdodCA+IGhlaWdodCA/IHNjcm9sbGJhclNpemUgOiAwO1xuICAgICAgdGhpcy5zY3JvbGxUbyh7XG4gICAgICAgIHNjcm9sbExlZnQ6IGNvbHVtbkluZGV4ICE9PSB1bmRlZmluZWQgPyBnZXRPZmZzZXRGb3JDb2x1bW5BbmRBbGlnbm1lbnQodGhpcy5wcm9wcywgY29sdW1uSW5kZXgsIGFsaWduLCBzY3JvbGxMZWZ0LCB0aGlzLl9pbnN0YW5jZVByb3BzLCB2ZXJ0aWNhbFNjcm9sbGJhclNpemUpIDogc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsVG9wOiByb3dJbmRleCAhPT0gdW5kZWZpbmVkID8gZ2V0T2Zmc2V0Rm9yUm93QW5kQWxpZ25tZW50KHRoaXMucHJvcHMsIHJvd0luZGV4LCBhbGlnbiwgc2Nyb2xsVG9wLCB0aGlzLl9pbnN0YW5jZVByb3BzLCBob3Jpem9udGFsU2Nyb2xsYmFyU2l6ZSkgOiBzY3JvbGxUb3BcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8uY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGluaXRpYWxTY3JvbGxMZWZ0ID0gX3RoaXMkcHJvcHMzLmluaXRpYWxTY3JvbGxMZWZ0LFxuICAgICAgICAgIGluaXRpYWxTY3JvbGxUb3AgPSBfdGhpcyRwcm9wczMuaW5pdGlhbFNjcm9sbFRvcDtcblxuICAgICAgaWYgKHRoaXMuX291dGVyUmVmICE9IG51bGwpIHtcbiAgICAgICAgdmFyIG91dGVyUmVmID0gdGhpcy5fb3V0ZXJSZWY7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsU2Nyb2xsTGVmdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBvdXRlclJlZi5zY3JvbGxMZWZ0ID0gaW5pdGlhbFNjcm9sbExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxTY3JvbGxUb3AgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsVG9wID0gaW5pdGlhbFNjcm9sbFRvcDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9jYWxsUHJvcHNDYWxsYmFja3MoKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLnByb3BzLmRpcmVjdGlvbjtcbiAgICAgIHZhciBfdGhpcyRzdGF0ZTIgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIHNjcm9sbExlZnQgPSBfdGhpcyRzdGF0ZTIuc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3AgPSBfdGhpcyRzdGF0ZTIuc2Nyb2xsVG9wLFxuICAgICAgICAgIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCA9IF90aGlzJHN0YXRlMi5zY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ7XG5cbiAgICAgIGlmIChzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQgJiYgdGhpcy5fb3V0ZXJSZWYgIT0gbnVsbCkge1xuICAgICAgICAvLyBUUklDS1kgQWNjb3JkaW5nIHRvIHRoZSBzcGVjLCBzY3JvbGxMZWZ0IHNob3VsZCBiZSBuZWdhdGl2ZSBmb3IgUlRMIGFsaWduZWQgZWxlbWVudHMuXG4gICAgICAgIC8vIFRoaXMgaXMgbm90IHRoZSBjYXNlIGZvciBhbGwgYnJvd3NlcnMgdGhvdWdoIChlLmcuIENocm9tZSByZXBvcnRzIHZhbHVlcyBhcyBwb3NpdGl2ZSwgbWVhc3VyZWQgcmVsYXRpdmUgdG8gdGhlIGxlZnQpLlxuICAgICAgICAvLyBTbyB3ZSBuZWVkIHRvIGRldGVybWluZSB3aGljaCBicm93c2VyIGJlaGF2aW9yIHdlJ3JlIGRlYWxpbmcgd2l0aCwgYW5kIG1pbWljIGl0LlxuICAgICAgICB2YXIgb3V0ZXJSZWYgPSB0aGlzLl9vdXRlclJlZjtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgICAgICAgIHN3aXRjaCAoZ2V0UlRMT2Zmc2V0VHlwZSgpKSB7XG4gICAgICAgICAgICBjYXNlICduZWdhdGl2ZSc6XG4gICAgICAgICAgICAgIG91dGVyUmVmLnNjcm9sbExlZnQgPSAtc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Bvc2l0aXZlLWFzY2VuZGluZyc6XG4gICAgICAgICAgICAgIG91dGVyUmVmLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdmFyIGNsaWVudFdpZHRoID0gb3V0ZXJSZWYuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICBzY3JvbGxXaWR0aCA9IG91dGVyUmVmLnNjcm9sbFdpZHRoO1xuICAgICAgICAgICAgICBvdXRlclJlZi5zY3JvbGxMZWZ0ID0gc2Nyb2xsV2lkdGggLSBjbGllbnRXaWR0aCAtIHNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXRlclJlZi5zY3JvbGxMZWZ0ID0gTWF0aC5tYXgoMCwgc2Nyb2xsTGVmdCk7XG4gICAgICAgIH1cblxuICAgICAgICBvdXRlclJlZi5zY3JvbGxUb3AgPSBNYXRoLm1heCgwLCBzY3JvbGxUb3ApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jYWxsUHJvcHNDYWxsYmFja3MoKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5fcmVzZXRJc1Njcm9sbGluZ1RpbWVvdXRJZCAhPT0gbnVsbCkge1xuICAgICAgICBjYW5jZWxUaW1lb3V0KHRoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzNCA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfdGhpcyRwcm9wczQuY2hpbGRyZW4sXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3RoaXMkcHJvcHM0LmNsYXNzTmFtZSxcbiAgICAgICAgICBjb2x1bW5Db3VudCA9IF90aGlzJHByb3BzNC5jb2x1bW5Db3VudCxcbiAgICAgICAgICBkaXJlY3Rpb24gPSBfdGhpcyRwcm9wczQuZGlyZWN0aW9uLFxuICAgICAgICAgIGhlaWdodCA9IF90aGlzJHByb3BzNC5oZWlnaHQsXG4gICAgICAgICAgaW5uZXJSZWYgPSBfdGhpcyRwcm9wczQuaW5uZXJSZWYsXG4gICAgICAgICAgaW5uZXJFbGVtZW50VHlwZSA9IF90aGlzJHByb3BzNC5pbm5lckVsZW1lbnRUeXBlLFxuICAgICAgICAgIGlubmVyVGFnTmFtZSA9IF90aGlzJHByb3BzNC5pbm5lclRhZ05hbWUsXG4gICAgICAgICAgaXRlbURhdGEgPSBfdGhpcyRwcm9wczQuaXRlbURhdGEsXG4gICAgICAgICAgX3RoaXMkcHJvcHM0JGl0ZW1LZXkgPSBfdGhpcyRwcm9wczQuaXRlbUtleSxcbiAgICAgICAgICBpdGVtS2V5ID0gX3RoaXMkcHJvcHM0JGl0ZW1LZXkgPT09IHZvaWQgMCA/IGRlZmF1bHRJdGVtS2V5IDogX3RoaXMkcHJvcHM0JGl0ZW1LZXksXG4gICAgICAgICAgb3V0ZXJFbGVtZW50VHlwZSA9IF90aGlzJHByb3BzNC5vdXRlckVsZW1lbnRUeXBlLFxuICAgICAgICAgIG91dGVyVGFnTmFtZSA9IF90aGlzJHByb3BzNC5vdXRlclRhZ05hbWUsXG4gICAgICAgICAgcm93Q291bnQgPSBfdGhpcyRwcm9wczQucm93Q291bnQsXG4gICAgICAgICAgc3R5bGUgPSBfdGhpcyRwcm9wczQuc3R5bGUsXG4gICAgICAgICAgdXNlSXNTY3JvbGxpbmcgPSBfdGhpcyRwcm9wczQudXNlSXNTY3JvbGxpbmcsXG4gICAgICAgICAgd2lkdGggPSBfdGhpcyRwcm9wczQud2lkdGg7XG4gICAgICB2YXIgaXNTY3JvbGxpbmcgPSB0aGlzLnN0YXRlLmlzU2Nyb2xsaW5nO1xuXG4gICAgICB2YXIgX3RoaXMkX2dldEhvcml6b250YWxSID0gdGhpcy5fZ2V0SG9yaXpvbnRhbFJhbmdlVG9SZW5kZXIoKSxcbiAgICAgICAgICBjb2x1bW5TdGFydEluZGV4ID0gX3RoaXMkX2dldEhvcml6b250YWxSWzBdLFxuICAgICAgICAgIGNvbHVtblN0b3BJbmRleCA9IF90aGlzJF9nZXRIb3Jpem9udGFsUlsxXTtcblxuICAgICAgdmFyIF90aGlzJF9nZXRWZXJ0aWNhbFJhbiA9IHRoaXMuX2dldFZlcnRpY2FsUmFuZ2VUb1JlbmRlcigpLFxuICAgICAgICAgIHJvd1N0YXJ0SW5kZXggPSBfdGhpcyRfZ2V0VmVydGljYWxSYW5bMF0sXG4gICAgICAgICAgcm93U3RvcEluZGV4ID0gX3RoaXMkX2dldFZlcnRpY2FsUmFuWzFdO1xuXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcblxuICAgICAgaWYgKGNvbHVtbkNvdW50ID4gMCAmJiByb3dDb3VudCkge1xuICAgICAgICBmb3IgKHZhciBfcm93SW5kZXggPSByb3dTdGFydEluZGV4OyBfcm93SW5kZXggPD0gcm93U3RvcEluZGV4OyBfcm93SW5kZXgrKykge1xuICAgICAgICAgIGZvciAodmFyIF9jb2x1bW5JbmRleCA9IGNvbHVtblN0YXJ0SW5kZXg7IF9jb2x1bW5JbmRleCA8PSBjb2x1bW5TdG9wSW5kZXg7IF9jb2x1bW5JbmRleCsrKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKGNyZWF0ZUVsZW1lbnQoY2hpbGRyZW4sIHtcbiAgICAgICAgICAgICAgY29sdW1uSW5kZXg6IF9jb2x1bW5JbmRleCxcbiAgICAgICAgICAgICAgZGF0YTogaXRlbURhdGEsXG4gICAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB1c2VJc1Njcm9sbGluZyA/IGlzU2Nyb2xsaW5nIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXkoe1xuICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4OiBfY29sdW1uSW5kZXgsXG4gICAgICAgICAgICAgICAgZGF0YTogaXRlbURhdGEsXG4gICAgICAgICAgICAgICAgcm93SW5kZXg6IF9yb3dJbmRleFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgcm93SW5kZXg6IF9yb3dJbmRleCxcbiAgICAgICAgICAgICAgc3R5bGU6IHRoaXMuX2dldEl0ZW1TdHlsZShfcm93SW5kZXgsIF9jb2x1bW5JbmRleClcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gLy8gUmVhZCB0aGlzIHZhbHVlIEFGVEVSIGl0ZW1zIGhhdmUgYmVlbiBjcmVhdGVkLFxuICAgICAgLy8gU28gdGhlaXIgYWN0dWFsIHNpemVzIChpZiB2YXJpYWJsZSkgYXJlIHRha2VuIGludG8gY29uc2lkZXJhdGlvbi5cblxuXG4gICAgICB2YXIgZXN0aW1hdGVkVG90YWxIZWlnaHQgPSBnZXRFc3RpbWF0ZWRUb3RhbEhlaWdodCh0aGlzLnByb3BzLCB0aGlzLl9pbnN0YW5jZVByb3BzKTtcbiAgICAgIHZhciBlc3RpbWF0ZWRUb3RhbFdpZHRoID0gZ2V0RXN0aW1hdGVkVG90YWxXaWR0aCh0aGlzLnByb3BzLCB0aGlzLl9pbnN0YW5jZVByb3BzKTtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KG91dGVyRWxlbWVudFR5cGUgfHwgb3V0ZXJUYWdOYW1lIHx8ICdkaXYnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICBvblNjcm9sbDogdGhpcy5fb25TY3JvbGwsXG4gICAgICAgIHJlZjogdGhpcy5fb3V0ZXJSZWZTZXR0ZXIsXG4gICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7XG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICAgICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6ICd0b3VjaCcsXG4gICAgICAgICAgd2lsbENoYW5nZTogJ3RyYW5zZm9ybScsXG4gICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb25cbiAgICAgICAgfSwgc3R5bGUpXG4gICAgICB9LCBjcmVhdGVFbGVtZW50KGlubmVyRWxlbWVudFR5cGUgfHwgaW5uZXJUYWdOYW1lIHx8ICdkaXYnLCB7XG4gICAgICAgIGNoaWxkcmVuOiBpdGVtcyxcbiAgICAgICAgcmVmOiBpbm5lclJlZixcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBoZWlnaHQ6IGVzdGltYXRlZFRvdGFsSGVpZ2h0LFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IGlzU2Nyb2xsaW5nID8gJ25vbmUnIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHdpZHRoOiBlc3RpbWF0ZWRUb3RhbFdpZHRoXG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLl9jYWxsUHJvcHNDYWxsYmFja3MgPSBmdW5jdGlvbiBfY2FsbFByb3BzQ2FsbGJhY2tzKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzNSA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY29sdW1uQ291bnQgPSBfdGhpcyRwcm9wczUuY29sdW1uQ291bnQsXG4gICAgICAgICAgb25JdGVtc1JlbmRlcmVkID0gX3RoaXMkcHJvcHM1Lm9uSXRlbXNSZW5kZXJlZCxcbiAgICAgICAgICBvblNjcm9sbCA9IF90aGlzJHByb3BzNS5vblNjcm9sbCxcbiAgICAgICAgICByb3dDb3VudCA9IF90aGlzJHByb3BzNS5yb3dDb3VudDtcblxuICAgICAgaWYgKHR5cGVvZiBvbkl0ZW1zUmVuZGVyZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaWYgKGNvbHVtbkNvdW50ID4gMCAmJiByb3dDb3VudCA+IDApIHtcbiAgICAgICAgICB2YXIgX3RoaXMkX2dldEhvcml6b250YWxSMiA9IHRoaXMuX2dldEhvcml6b250YWxSYW5nZVRvUmVuZGVyKCksXG4gICAgICAgICAgICAgIF9vdmVyc2NhbkNvbHVtblN0YXJ0SW5kZXggPSBfdGhpcyRfZ2V0SG9yaXpvbnRhbFIyWzBdLFxuICAgICAgICAgICAgICBfb3ZlcnNjYW5Db2x1bW5TdG9wSW5kZXggPSBfdGhpcyRfZ2V0SG9yaXpvbnRhbFIyWzFdLFxuICAgICAgICAgICAgICBfdmlzaWJsZUNvbHVtblN0YXJ0SW5kZXggPSBfdGhpcyRfZ2V0SG9yaXpvbnRhbFIyWzJdLFxuICAgICAgICAgICAgICBfdmlzaWJsZUNvbHVtblN0b3BJbmRleCA9IF90aGlzJF9nZXRIb3Jpem9udGFsUjJbM107XG5cbiAgICAgICAgICB2YXIgX3RoaXMkX2dldFZlcnRpY2FsUmFuMiA9IHRoaXMuX2dldFZlcnRpY2FsUmFuZ2VUb1JlbmRlcigpLFxuICAgICAgICAgICAgICBfb3ZlcnNjYW5Sb3dTdGFydEluZGV4ID0gX3RoaXMkX2dldFZlcnRpY2FsUmFuMlswXSxcbiAgICAgICAgICAgICAgX292ZXJzY2FuUm93U3RvcEluZGV4ID0gX3RoaXMkX2dldFZlcnRpY2FsUmFuMlsxXSxcbiAgICAgICAgICAgICAgX3Zpc2libGVSb3dTdGFydEluZGV4ID0gX3RoaXMkX2dldFZlcnRpY2FsUmFuMlsyXSxcbiAgICAgICAgICAgICAgX3Zpc2libGVSb3dTdG9wSW5kZXggPSBfdGhpcyRfZ2V0VmVydGljYWxSYW4yWzNdO1xuXG4gICAgICAgICAgdGhpcy5fY2FsbE9uSXRlbXNSZW5kZXJlZChfb3ZlcnNjYW5Db2x1bW5TdGFydEluZGV4LCBfb3ZlcnNjYW5Db2x1bW5TdG9wSW5kZXgsIF9vdmVyc2NhblJvd1N0YXJ0SW5kZXgsIF9vdmVyc2NhblJvd1N0b3BJbmRleCwgX3Zpc2libGVDb2x1bW5TdGFydEluZGV4LCBfdmlzaWJsZUNvbHVtblN0b3BJbmRleCwgX3Zpc2libGVSb3dTdGFydEluZGV4LCBfdmlzaWJsZVJvd1N0b3BJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvblNjcm9sbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgX3RoaXMkc3RhdGUzID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIF9ob3Jpem9udGFsU2Nyb2xsRGlyZWN0aW9uID0gX3RoaXMkc3RhdGUzLmhvcml6b250YWxTY3JvbGxEaXJlY3Rpb24sXG4gICAgICAgICAgICBfc2Nyb2xsTGVmdCA9IF90aGlzJHN0YXRlMy5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgX3Njcm9sbFRvcCA9IF90aGlzJHN0YXRlMy5zY3JvbGxUb3AsXG4gICAgICAgICAgICBfc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkID0gX3RoaXMkc3RhdGUzLnNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCxcbiAgICAgICAgICAgIF92ZXJ0aWNhbFNjcm9sbERpcmVjdGlvbiA9IF90aGlzJHN0YXRlMy52ZXJ0aWNhbFNjcm9sbERpcmVjdGlvbjtcblxuICAgICAgICB0aGlzLl9jYWxsT25TY3JvbGwoX3Njcm9sbExlZnQsIF9zY3JvbGxUb3AsIF9ob3Jpem9udGFsU2Nyb2xsRGlyZWN0aW9uLCBfdmVydGljYWxTY3JvbGxEaXJlY3Rpb24sIF9zY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQpO1xuICAgICAgfVxuICAgIH07IC8vIExhemlseSBjcmVhdGUgYW5kIGNhY2hlIGl0ZW0gc3R5bGVzIHdoaWxlIHNjcm9sbGluZyxcbiAgICAvLyBTbyB0aGF0IHB1cmUgY29tcG9uZW50IHNDVSB3aWxsIHByZXZlbnQgcmUtcmVuZGVycy5cbiAgICAvLyBXZSBtYWludGFpbiB0aGlzIGNhY2hlLCBhbmQgcGFzcyBhIHN0eWxlIHByb3AgcmF0aGVyIHRoYW4gaW5kZXgsXG4gICAgLy8gU28gdGhhdCBMaXN0IGNhbiBjbGVhciBjYWNoZWQgc3R5bGVzIGFuZCBmb3JjZSBpdGVtIHJlLXJlbmRlciBpZiBuZWNlc3NhcnkuXG5cblxuICAgIF9wcm90by5fZ2V0SG9yaXpvbnRhbFJhbmdlVG9SZW5kZXIgPSBmdW5jdGlvbiBfZ2V0SG9yaXpvbnRhbFJhbmdlVG9SZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHM2ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjb2x1bW5Db3VudCA9IF90aGlzJHByb3BzNi5jb2x1bW5Db3VudCxcbiAgICAgICAgICBvdmVyc2NhbkNvbHVtbkNvdW50ID0gX3RoaXMkcHJvcHM2Lm92ZXJzY2FuQ29sdW1uQ291bnQsXG4gICAgICAgICAgb3ZlcnNjYW5Db2x1bW5zQ291bnQgPSBfdGhpcyRwcm9wczYub3ZlcnNjYW5Db2x1bW5zQ291bnQsXG4gICAgICAgICAgb3ZlcnNjYW5Db3VudCA9IF90aGlzJHByb3BzNi5vdmVyc2NhbkNvdW50LFxuICAgICAgICAgIHJvd0NvdW50ID0gX3RoaXMkcHJvcHM2LnJvd0NvdW50O1xuICAgICAgdmFyIF90aGlzJHN0YXRlNCA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbiA9IF90aGlzJHN0YXRlNC5ob3Jpem9udGFsU2Nyb2xsRGlyZWN0aW9uLFxuICAgICAgICAgIGlzU2Nyb2xsaW5nID0gX3RoaXMkc3RhdGU0LmlzU2Nyb2xsaW5nLFxuICAgICAgICAgIHNjcm9sbExlZnQgPSBfdGhpcyRzdGF0ZTQuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBvdmVyc2NhbkNvdW50UmVzb2x2ZWQgPSBvdmVyc2NhbkNvbHVtbkNvdW50IHx8IG92ZXJzY2FuQ29sdW1uc0NvdW50IHx8IG92ZXJzY2FuQ291bnQgfHwgMTtcblxuICAgICAgaWYgKGNvbHVtbkNvdW50ID09PSAwIHx8IHJvd0NvdW50ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbMCwgMCwgMCwgMF07XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGFydEluZGV4ID0gZ2V0Q29sdW1uU3RhcnRJbmRleEZvck9mZnNldCh0aGlzLnByb3BzLCBzY3JvbGxMZWZ0LCB0aGlzLl9pbnN0YW5jZVByb3BzKTtcbiAgICAgIHZhciBzdG9wSW5kZXggPSBnZXRDb2x1bW5TdG9wSW5kZXhGb3JTdGFydEluZGV4KHRoaXMucHJvcHMsIHN0YXJ0SW5kZXgsIHNjcm9sbExlZnQsIHRoaXMuX2luc3RhbmNlUHJvcHMpOyAvLyBPdmVyc2NhbiBieSBvbmUgaXRlbSBpbiBlYWNoIGRpcmVjdGlvbiBzbyB0aGF0IHRhYi9mb2N1cyB3b3Jrcy5cbiAgICAgIC8vIElmIHRoZXJlIGlzbid0IGF0IGxlYXN0IG9uZSBleHRyYSBpdGVtLCB0YWIgbG9vcHMgYmFjayBhcm91bmQuXG5cbiAgICAgIHZhciBvdmVyc2NhbkJhY2t3YXJkID0gIWlzU2Nyb2xsaW5nIHx8IGhvcml6b250YWxTY3JvbGxEaXJlY3Rpb24gPT09ICdiYWNrd2FyZCcgPyBNYXRoLm1heCgxLCBvdmVyc2NhbkNvdW50UmVzb2x2ZWQpIDogMTtcbiAgICAgIHZhciBvdmVyc2NhbkZvcndhcmQgPSAhaXNTY3JvbGxpbmcgfHwgaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gTWF0aC5tYXgoMSwgb3ZlcnNjYW5Db3VudFJlc29sdmVkKSA6IDE7XG4gICAgICByZXR1cm4gW01hdGgubWF4KDAsIHN0YXJ0SW5kZXggLSBvdmVyc2NhbkJhY2t3YXJkKSwgTWF0aC5tYXgoMCwgTWF0aC5taW4oY29sdW1uQ291bnQgLSAxLCBzdG9wSW5kZXggKyBvdmVyc2NhbkZvcndhcmQpKSwgc3RhcnRJbmRleCwgc3RvcEluZGV4XTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLl9nZXRWZXJ0aWNhbFJhbmdlVG9SZW5kZXIgPSBmdW5jdGlvbiBfZ2V0VmVydGljYWxSYW5nZVRvUmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzNyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY29sdW1uQ291bnQgPSBfdGhpcyRwcm9wczcuY29sdW1uQ291bnQsXG4gICAgICAgICAgb3ZlcnNjYW5Db3VudCA9IF90aGlzJHByb3BzNy5vdmVyc2NhbkNvdW50LFxuICAgICAgICAgIG92ZXJzY2FuUm93Q291bnQgPSBfdGhpcyRwcm9wczcub3ZlcnNjYW5Sb3dDb3VudCxcbiAgICAgICAgICBvdmVyc2NhblJvd3NDb3VudCA9IF90aGlzJHByb3BzNy5vdmVyc2NhblJvd3NDb3VudCxcbiAgICAgICAgICByb3dDb3VudCA9IF90aGlzJHByb3BzNy5yb3dDb3VudDtcbiAgICAgIHZhciBfdGhpcyRzdGF0ZTUgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIGlzU2Nyb2xsaW5nID0gX3RoaXMkc3RhdGU1LmlzU2Nyb2xsaW5nLFxuICAgICAgICAgIHZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uID0gX3RoaXMkc3RhdGU1LnZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uLFxuICAgICAgICAgIHNjcm9sbFRvcCA9IF90aGlzJHN0YXRlNS5zY3JvbGxUb3A7XG4gICAgICB2YXIgb3ZlcnNjYW5Db3VudFJlc29sdmVkID0gb3ZlcnNjYW5Sb3dDb3VudCB8fCBvdmVyc2NhblJvd3NDb3VudCB8fCBvdmVyc2NhbkNvdW50IHx8IDE7XG5cbiAgICAgIGlmIChjb2x1bW5Db3VudCA9PT0gMCB8fCByb3dDb3VudCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gWzAsIDAsIDAsIDBdO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhcnRJbmRleCA9IGdldFJvd1N0YXJ0SW5kZXhGb3JPZmZzZXQodGhpcy5wcm9wcywgc2Nyb2xsVG9wLCB0aGlzLl9pbnN0YW5jZVByb3BzKTtcbiAgICAgIHZhciBzdG9wSW5kZXggPSBnZXRSb3dTdG9wSW5kZXhGb3JTdGFydEluZGV4KHRoaXMucHJvcHMsIHN0YXJ0SW5kZXgsIHNjcm9sbFRvcCwgdGhpcy5faW5zdGFuY2VQcm9wcyk7IC8vIE92ZXJzY2FuIGJ5IG9uZSBpdGVtIGluIGVhY2ggZGlyZWN0aW9uIHNvIHRoYXQgdGFiL2ZvY3VzIHdvcmtzLlxuICAgICAgLy8gSWYgdGhlcmUgaXNuJ3QgYXQgbGVhc3Qgb25lIGV4dHJhIGl0ZW0sIHRhYiBsb29wcyBiYWNrIGFyb3VuZC5cblxuICAgICAgdmFyIG92ZXJzY2FuQmFja3dhcmQgPSAhaXNTY3JvbGxpbmcgfHwgdmVydGljYWxTY3JvbGxEaXJlY3Rpb24gPT09ICdiYWNrd2FyZCcgPyBNYXRoLm1heCgxLCBvdmVyc2NhbkNvdW50UmVzb2x2ZWQpIDogMTtcbiAgICAgIHZhciBvdmVyc2NhbkZvcndhcmQgPSAhaXNTY3JvbGxpbmcgfHwgdmVydGljYWxTY3JvbGxEaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IE1hdGgubWF4KDEsIG92ZXJzY2FuQ291bnRSZXNvbHZlZCkgOiAxO1xuICAgICAgcmV0dXJuIFtNYXRoLm1heCgwLCBzdGFydEluZGV4IC0gb3ZlcnNjYW5CYWNrd2FyZCksIE1hdGgubWF4KDAsIE1hdGgubWluKHJvd0NvdW50IC0gMSwgc3RvcEluZGV4ICsgb3ZlcnNjYW5Gb3J3YXJkKSksIHN0YXJ0SW5kZXgsIHN0b3BJbmRleF07XG4gICAgfTtcblxuICAgIHJldHVybiBHcmlkO1xuICB9KFB1cmVDb21wb25lbnQpLCBfY2xhc3MuZGVmYXVsdFByb3BzID0ge1xuICAgIGRpcmVjdGlvbjogJ2x0cicsXG4gICAgaXRlbURhdGE6IHVuZGVmaW5lZCxcbiAgICB1c2VJc1Njcm9sbGluZzogZmFsc2VcbiAgfSwgX3RlbXA7XG59XG5cbnZhciB2YWxpZGF0ZVNoYXJlZFByb3BzID0gZnVuY3Rpb24gdmFsaWRhdGVTaGFyZWRQcm9wcyhfcmVmNSwgX3JlZjYpIHtcbiAgdmFyIGNoaWxkcmVuID0gX3JlZjUuY2hpbGRyZW4sXG4gICAgICBkaXJlY3Rpb24gPSBfcmVmNS5kaXJlY3Rpb24sXG4gICAgICBoZWlnaHQgPSBfcmVmNS5oZWlnaHQsXG4gICAgICBpbm5lclRhZ05hbWUgPSBfcmVmNS5pbm5lclRhZ05hbWUsXG4gICAgICBvdXRlclRhZ05hbWUgPSBfcmVmNS5vdXRlclRhZ05hbWUsXG4gICAgICBvdmVyc2NhbkNvbHVtbnNDb3VudCA9IF9yZWY1Lm92ZXJzY2FuQ29sdW1uc0NvdW50LFxuICAgICAgb3ZlcnNjYW5Db3VudCA9IF9yZWY1Lm92ZXJzY2FuQ291bnQsXG4gICAgICBvdmVyc2NhblJvd3NDb3VudCA9IF9yZWY1Lm92ZXJzY2FuUm93c0NvdW50LFxuICAgICAgd2lkdGggPSBfcmVmNS53aWR0aDtcbiAgdmFyIGluc3RhbmNlID0gX3JlZjYuaW5zdGFuY2U7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIG92ZXJzY2FuQ291bnQgPT09ICdudW1iZXInKSB7XG4gICAgICBpZiAoZGV2V2FybmluZ3NPdmVyc2NhbkNvdW50ICYmICFkZXZXYXJuaW5nc092ZXJzY2FuQ291bnQuaGFzKGluc3RhbmNlKSkge1xuICAgICAgICBkZXZXYXJuaW5nc092ZXJzY2FuQ291bnQuYWRkKGluc3RhbmNlKTtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgb3ZlcnNjYW5Db3VudCBwcm9wIGhhcyBiZWVuIGRlcHJlY2F0ZWQuICcgKyAnUGxlYXNlIHVzZSB0aGUgb3ZlcnNjYW5Db2x1bW5Db3VudCBhbmQgb3ZlcnNjYW5Sb3dDb3VudCBwcm9wcyBpbnN0ZWFkLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3ZlcnNjYW5Db2x1bW5zQ291bnQgPT09ICdudW1iZXInIHx8IHR5cGVvZiBvdmVyc2NhblJvd3NDb3VudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlmIChkZXZXYXJuaW5nc092ZXJzY2FuUm93c0NvbHVtbnNDb3VudCAmJiAhZGV2V2FybmluZ3NPdmVyc2NhblJvd3NDb2x1bW5zQ291bnQuaGFzKGluc3RhbmNlKSkge1xuICAgICAgICBkZXZXYXJuaW5nc092ZXJzY2FuUm93c0NvbHVtbnNDb3VudC5hZGQoaW5zdGFuY2UpO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBvdmVyc2NhbkNvbHVtbnNDb3VudCBhbmQgb3ZlcnNjYW5Sb3dzQ291bnQgcHJvcHMgaGF2ZSBiZWVuIGRlcHJlY2F0ZWQuICcgKyAnUGxlYXNlIHVzZSB0aGUgb3ZlcnNjYW5Db2x1bW5Db3VudCBhbmQgb3ZlcnNjYW5Sb3dDb3VudCBwcm9wcyBpbnN0ZWFkLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbm5lclRhZ05hbWUgIT0gbnVsbCB8fCBvdXRlclRhZ05hbWUgIT0gbnVsbCkge1xuICAgICAgaWYgKGRldldhcm5pbmdzVGFnTmFtZSAmJiAhZGV2V2FybmluZ3NUYWdOYW1lLmhhcyhpbnN0YW5jZSkpIHtcbiAgICAgICAgZGV2V2FybmluZ3NUYWdOYW1lLmFkZChpbnN0YW5jZSk7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGlubmVyVGFnTmFtZSBhbmQgb3V0ZXJUYWdOYW1lIHByb3BzIGhhdmUgYmVlbiBkZXByZWNhdGVkLiAnICsgJ1BsZWFzZSB1c2UgdGhlIGlubmVyRWxlbWVudFR5cGUgYW5kIG91dGVyRWxlbWVudFR5cGUgcHJvcHMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0FuIGludmFsaWQgXCJjaGlsZHJlblwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ1ZhbHVlIHNob3VsZCBiZSBhIFJlYWN0IGNvbXBvbmVudC4gJyArIChcIlxcXCJcIiArIChjaGlsZHJlbiA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjaGlsZHJlbikgKyBcIlxcXCIgd2FzIHNwZWNpZmllZC5cIikpO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlICdsdHInOlxuICAgICAgY2FzZSAncnRsJzpcbiAgICAgICAgLy8gVmFsaWQgdmFsdWVzXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcImRpcmVjdGlvblwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ1ZhbHVlIHNob3VsZCBiZSBlaXRoZXIgXCJsdHJcIiBvciBcInJ0bFwiLiAnICsgKFwiXFxcIlwiICsgZGlyZWN0aW9uICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHdpZHRoICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgRXJyb3IoJ0FuIGludmFsaWQgXCJ3aWR0aFwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ0dyaWRzIG11c3Qgc3BlY2lmeSBhIG51bWJlciBmb3Igd2lkdGguICcgKyAoXCJcXFwiXCIgKyAod2lkdGggPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2Ygd2lkdGgpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGhlaWdodCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwiaGVpZ2h0XCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnR3JpZHMgbXVzdCBzcGVjaWZ5IGEgbnVtYmVyIGZvciBoZWlnaHQuICcgKyAoXCJcXFwiXCIgKyAoaGVpZ2h0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGhlaWdodCkgKyBcIlxcXCIgd2FzIHNwZWNpZmllZC5cIikpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIERFRkFVTFRfRVNUSU1BVEVEX0lURU1fU0laRSA9IDUwO1xuXG52YXIgZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQgPSBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRUb3RhbEhlaWdodChfcmVmLCBfcmVmMikge1xuICB2YXIgcm93Q291bnQgPSBfcmVmLnJvd0NvdW50O1xuICB2YXIgcm93TWV0YWRhdGFNYXAgPSBfcmVmMi5yb3dNZXRhZGF0YU1hcCxcbiAgICAgIGVzdGltYXRlZFJvd0hlaWdodCA9IF9yZWYyLmVzdGltYXRlZFJvd0hlaWdodCxcbiAgICAgIGxhc3RNZWFzdXJlZFJvd0luZGV4ID0gX3JlZjIubGFzdE1lYXN1cmVkUm93SW5kZXg7XG4gIHZhciB0b3RhbFNpemVPZk1lYXN1cmVkUm93cyA9IDA7IC8vIEVkZ2UgY2FzZSBjaGVjayBmb3Igd2hlbiB0aGUgbnVtYmVyIG9mIGl0ZW1zIGRlY3JlYXNlcyB3aGlsZSBhIHNjcm9sbCBpcyBpbiBwcm9ncmVzcy5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3Qtd2luZG93L3B1bGwvMTM4XG5cbiAgaWYgKGxhc3RNZWFzdXJlZFJvd0luZGV4ID49IHJvd0NvdW50KSB7XG4gICAgbGFzdE1lYXN1cmVkUm93SW5kZXggPSByb3dDb3VudCAtIDE7XG4gIH1cblxuICBpZiAobGFzdE1lYXN1cmVkUm93SW5kZXggPj0gMCkge1xuICAgIHZhciBpdGVtTWV0YWRhdGEgPSByb3dNZXRhZGF0YU1hcFtsYXN0TWVhc3VyZWRSb3dJbmRleF07XG4gICAgdG90YWxTaXplT2ZNZWFzdXJlZFJvd3MgPSBpdGVtTWV0YWRhdGEub2Zmc2V0ICsgaXRlbU1ldGFkYXRhLnNpemU7XG4gIH1cblxuICB2YXIgbnVtVW5tZWFzdXJlZEl0ZW1zID0gcm93Q291bnQgLSBsYXN0TWVhc3VyZWRSb3dJbmRleCAtIDE7XG4gIHZhciB0b3RhbFNpemVPZlVubWVhc3VyZWRJdGVtcyA9IG51bVVubWVhc3VyZWRJdGVtcyAqIGVzdGltYXRlZFJvd0hlaWdodDtcbiAgcmV0dXJuIHRvdGFsU2l6ZU9mTWVhc3VyZWRSb3dzICsgdG90YWxTaXplT2ZVbm1lYXN1cmVkSXRlbXM7XG59O1xuXG52YXIgZ2V0RXN0aW1hdGVkVG90YWxXaWR0aCA9IGZ1bmN0aW9uIGdldEVzdGltYXRlZFRvdGFsV2lkdGgoX3JlZjMsIF9yZWY0KSB7XG4gIHZhciBjb2x1bW5Db3VudCA9IF9yZWYzLmNvbHVtbkNvdW50O1xuICB2YXIgY29sdW1uTWV0YWRhdGFNYXAgPSBfcmVmNC5jb2x1bW5NZXRhZGF0YU1hcCxcbiAgICAgIGVzdGltYXRlZENvbHVtbldpZHRoID0gX3JlZjQuZXN0aW1hdGVkQ29sdW1uV2lkdGgsXG4gICAgICBsYXN0TWVhc3VyZWRDb2x1bW5JbmRleCA9IF9yZWY0Lmxhc3RNZWFzdXJlZENvbHVtbkluZGV4O1xuICB2YXIgdG90YWxTaXplT2ZNZWFzdXJlZFJvd3MgPSAwOyAvLyBFZGdlIGNhc2UgY2hlY2sgZm9yIHdoZW4gdGhlIG51bWJlciBvZiBpdGVtcyBkZWNyZWFzZXMgd2hpbGUgYSBzY3JvbGwgaXMgaW4gcHJvZ3Jlc3MuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9idmF1Z2huL3JlYWN0LXdpbmRvdy9wdWxsLzEzOFxuXG4gIGlmIChsYXN0TWVhc3VyZWRDb2x1bW5JbmRleCA+PSBjb2x1bW5Db3VudCkge1xuICAgIGxhc3RNZWFzdXJlZENvbHVtbkluZGV4ID0gY29sdW1uQ291bnQgLSAxO1xuICB9XG5cbiAgaWYgKGxhc3RNZWFzdXJlZENvbHVtbkluZGV4ID49IDApIHtcbiAgICB2YXIgaXRlbU1ldGFkYXRhID0gY29sdW1uTWV0YWRhdGFNYXBbbGFzdE1lYXN1cmVkQ29sdW1uSW5kZXhdO1xuICAgIHRvdGFsU2l6ZU9mTWVhc3VyZWRSb3dzID0gaXRlbU1ldGFkYXRhLm9mZnNldCArIGl0ZW1NZXRhZGF0YS5zaXplO1xuICB9XG5cbiAgdmFyIG51bVVubWVhc3VyZWRJdGVtcyA9IGNvbHVtbkNvdW50IC0gbGFzdE1lYXN1cmVkQ29sdW1uSW5kZXggLSAxO1xuICB2YXIgdG90YWxTaXplT2ZVbm1lYXN1cmVkSXRlbXMgPSBudW1Vbm1lYXN1cmVkSXRlbXMgKiBlc3RpbWF0ZWRDb2x1bW5XaWR0aDtcbiAgcmV0dXJuIHRvdGFsU2l6ZU9mTWVhc3VyZWRSb3dzICsgdG90YWxTaXplT2ZVbm1lYXN1cmVkSXRlbXM7XG59O1xuXG52YXIgZ2V0SXRlbU1ldGFkYXRhID0gZnVuY3Rpb24gZ2V0SXRlbU1ldGFkYXRhKGl0ZW1UeXBlLCBwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpIHtcbiAgdmFyIGl0ZW1NZXRhZGF0YU1hcCwgaXRlbVNpemUsIGxhc3RNZWFzdXJlZEluZGV4O1xuXG4gIGlmIChpdGVtVHlwZSA9PT0gJ2NvbHVtbicpIHtcbiAgICBpdGVtTWV0YWRhdGFNYXAgPSBpbnN0YW5jZVByb3BzLmNvbHVtbk1ldGFkYXRhTWFwO1xuICAgIGl0ZW1TaXplID0gcHJvcHMuY29sdW1uV2lkdGg7XG4gICAgbGFzdE1lYXN1cmVkSW5kZXggPSBpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZENvbHVtbkluZGV4O1xuICB9IGVsc2Uge1xuICAgIGl0ZW1NZXRhZGF0YU1hcCA9IGluc3RhbmNlUHJvcHMucm93TWV0YWRhdGFNYXA7XG4gICAgaXRlbVNpemUgPSBwcm9wcy5yb3dIZWlnaHQ7XG4gICAgbGFzdE1lYXN1cmVkSW5kZXggPSBpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZFJvd0luZGV4O1xuICB9XG5cbiAgaWYgKGluZGV4ID4gbGFzdE1lYXN1cmVkSW5kZXgpIHtcbiAgICB2YXIgb2Zmc2V0ID0gMDtcblxuICAgIGlmIChsYXN0TWVhc3VyZWRJbmRleCA+PSAwKSB7XG4gICAgICB2YXIgaXRlbU1ldGFkYXRhID0gaXRlbU1ldGFkYXRhTWFwW2xhc3RNZWFzdXJlZEluZGV4XTtcbiAgICAgIG9mZnNldCA9IGl0ZW1NZXRhZGF0YS5vZmZzZXQgKyBpdGVtTWV0YWRhdGEuc2l6ZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gbGFzdE1lYXN1cmVkSW5kZXggKyAxOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgIHZhciBzaXplID0gaXRlbVNpemUoaSk7XG4gICAgICBpdGVtTWV0YWRhdGFNYXBbaV0gPSB7XG4gICAgICAgIG9mZnNldDogb2Zmc2V0LFxuICAgICAgICBzaXplOiBzaXplXG4gICAgICB9O1xuICAgICAgb2Zmc2V0ICs9IHNpemU7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW1UeXBlID09PSAnY29sdW1uJykge1xuICAgICAgaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRDb2x1bW5JbmRleCA9IGluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZFJvd0luZGV4ID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGl0ZW1NZXRhZGF0YU1hcFtpbmRleF07XG59O1xuXG52YXIgZmluZE5lYXJlc3RJdGVtID0gZnVuY3Rpb24gZmluZE5lYXJlc3RJdGVtKGl0ZW1UeXBlLCBwcm9wcywgaW5zdGFuY2VQcm9wcywgb2Zmc2V0KSB7XG4gIHZhciBpdGVtTWV0YWRhdGFNYXAsIGxhc3RNZWFzdXJlZEluZGV4O1xuXG4gIGlmIChpdGVtVHlwZSA9PT0gJ2NvbHVtbicpIHtcbiAgICBpdGVtTWV0YWRhdGFNYXAgPSBpbnN0YW5jZVByb3BzLmNvbHVtbk1ldGFkYXRhTWFwO1xuICAgIGxhc3RNZWFzdXJlZEluZGV4ID0gaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRDb2x1bW5JbmRleDtcbiAgfSBlbHNlIHtcbiAgICBpdGVtTWV0YWRhdGFNYXAgPSBpbnN0YW5jZVByb3BzLnJvd01ldGFkYXRhTWFwO1xuICAgIGxhc3RNZWFzdXJlZEluZGV4ID0gaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRSb3dJbmRleDtcbiAgfVxuXG4gIHZhciBsYXN0TWVhc3VyZWRJdGVtT2Zmc2V0ID0gbGFzdE1lYXN1cmVkSW5kZXggPiAwID8gaXRlbU1ldGFkYXRhTWFwW2xhc3RNZWFzdXJlZEluZGV4XS5vZmZzZXQgOiAwO1xuXG4gIGlmIChsYXN0TWVhc3VyZWRJdGVtT2Zmc2V0ID49IG9mZnNldCkge1xuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgbWVhc3VyZWQgaXRlbXMgd2l0aGluIHRoaXMgcmFuZ2UganVzdCB1c2UgYSBiaW5hcnkgc2VhcmNoIGFzIGl0J3MgZmFzdGVyLlxuICAgIHJldHVybiBmaW5kTmVhcmVzdEl0ZW1CaW5hcnlTZWFyY2goaXRlbVR5cGUsIHByb3BzLCBpbnN0YW5jZVByb3BzLCBsYXN0TWVhc3VyZWRJbmRleCwgMCwgb2Zmc2V0KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiB3ZSBoYXZlbid0IHlldCBtZWFzdXJlZCB0aGlzIGhpZ2gsIGZhbGxiYWNrIHRvIGFuIGV4cG9uZW50aWFsIHNlYXJjaCB3aXRoIGFuIGlubmVyIGJpbmFyeSBzZWFyY2guXG4gICAgLy8gVGhlIGV4cG9uZW50aWFsIHNlYXJjaCBhdm9pZHMgcHJlLWNvbXB1dGluZyBzaXplcyBmb3IgdGhlIGZ1bGwgc2V0IG9mIGl0ZW1zIGFzIGEgYmluYXJ5IHNlYXJjaCB3b3VsZC5cbiAgICAvLyBUaGUgb3ZlcmFsbCBjb21wbGV4aXR5IGZvciB0aGlzIGFwcHJvYWNoIGlzIE8obG9nIG4pLlxuICAgIHJldHVybiBmaW5kTmVhcmVzdEl0ZW1FeHBvbmVudGlhbFNlYXJjaChpdGVtVHlwZSwgcHJvcHMsIGluc3RhbmNlUHJvcHMsIE1hdGgubWF4KDAsIGxhc3RNZWFzdXJlZEluZGV4KSwgb2Zmc2V0KTtcbiAgfVxufTtcblxudmFyIGZpbmROZWFyZXN0SXRlbUJpbmFyeVNlYXJjaCA9IGZ1bmN0aW9uIGZpbmROZWFyZXN0SXRlbUJpbmFyeVNlYXJjaChpdGVtVHlwZSwgcHJvcHMsIGluc3RhbmNlUHJvcHMsIGhpZ2gsIGxvdywgb2Zmc2V0KSB7XG4gIHdoaWxlIChsb3cgPD0gaGlnaCkge1xuICAgIHZhciBtaWRkbGUgPSBsb3cgKyBNYXRoLmZsb29yKChoaWdoIC0gbG93KSAvIDIpO1xuICAgIHZhciBjdXJyZW50T2Zmc2V0ID0gZ2V0SXRlbU1ldGFkYXRhKGl0ZW1UeXBlLCBwcm9wcywgbWlkZGxlLCBpbnN0YW5jZVByb3BzKS5vZmZzZXQ7XG5cbiAgICBpZiAoY3VycmVudE9mZnNldCA9PT0gb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gbWlkZGxlO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudE9mZnNldCA8IG9mZnNldCkge1xuICAgICAgbG93ID0gbWlkZGxlICsgMTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRPZmZzZXQgPiBvZmZzZXQpIHtcbiAgICAgIGhpZ2ggPSBtaWRkbGUgLSAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChsb3cgPiAwKSB7XG4gICAgcmV0dXJuIGxvdyAtIDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn07XG5cbnZhciBmaW5kTmVhcmVzdEl0ZW1FeHBvbmVudGlhbFNlYXJjaCA9IGZ1bmN0aW9uIGZpbmROZWFyZXN0SXRlbUV4cG9uZW50aWFsU2VhcmNoKGl0ZW1UeXBlLCBwcm9wcywgaW5zdGFuY2VQcm9wcywgaW5kZXgsIG9mZnNldCkge1xuICB2YXIgaXRlbUNvdW50ID0gaXRlbVR5cGUgPT09ICdjb2x1bW4nID8gcHJvcHMuY29sdW1uQ291bnQgOiBwcm9wcy5yb3dDb3VudDtcbiAgdmFyIGludGVydmFsID0gMTtcblxuICB3aGlsZSAoaW5kZXggPCBpdGVtQ291bnQgJiYgZ2V0SXRlbU1ldGFkYXRhKGl0ZW1UeXBlLCBwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpLm9mZnNldCA8IG9mZnNldCkge1xuICAgIGluZGV4ICs9IGludGVydmFsO1xuICAgIGludGVydmFsICo9IDI7XG4gIH1cblxuICByZXR1cm4gZmluZE5lYXJlc3RJdGVtQmluYXJ5U2VhcmNoKGl0ZW1UeXBlLCBwcm9wcywgaW5zdGFuY2VQcm9wcywgTWF0aC5taW4oaW5kZXgsIGl0ZW1Db3VudCAtIDEpLCBNYXRoLmZsb29yKGluZGV4IC8gMiksIG9mZnNldCk7XG59O1xuXG52YXIgZ2V0T2Zmc2V0Rm9ySW5kZXhBbmRBbGlnbm1lbnQgPSBmdW5jdGlvbiBnZXRPZmZzZXRGb3JJbmRleEFuZEFsaWdubWVudChpdGVtVHlwZSwgcHJvcHMsIGluZGV4LCBhbGlnbiwgc2Nyb2xsT2Zmc2V0LCBpbnN0YW5jZVByb3BzLCBzY3JvbGxiYXJTaXplKSB7XG4gIHZhciBzaXplID0gaXRlbVR5cGUgPT09ICdjb2x1bW4nID8gcHJvcHMud2lkdGggOiBwcm9wcy5oZWlnaHQ7XG4gIHZhciBpdGVtTWV0YWRhdGEgPSBnZXRJdGVtTWV0YWRhdGEoaXRlbVR5cGUsIHByb3BzLCBpbmRleCwgaW5zdGFuY2VQcm9wcyk7IC8vIEdldCBlc3RpbWF0ZWQgdG90YWwgc2l6ZSBhZnRlciBJdGVtTWV0YWRhdGEgaXMgY29tcHV0ZWQsXG4gIC8vIFRvIGVuc3VyZSBpdCByZWZsZWN0cyBhY3R1YWwgbWVhc3VyZW1lbnRzIGluc3RlYWQgb2YganVzdCBlc3RpbWF0ZXMuXG5cbiAgdmFyIGVzdGltYXRlZFRvdGFsU2l6ZSA9IGl0ZW1UeXBlID09PSAnY29sdW1uJyA/IGdldEVzdGltYXRlZFRvdGFsV2lkdGgocHJvcHMsIGluc3RhbmNlUHJvcHMpIDogZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQocHJvcHMsIGluc3RhbmNlUHJvcHMpO1xuICB2YXIgbWF4T2Zmc2V0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZXN0aW1hdGVkVG90YWxTaXplIC0gc2l6ZSwgaXRlbU1ldGFkYXRhLm9mZnNldCkpO1xuICB2YXIgbWluT2Zmc2V0ID0gTWF0aC5tYXgoMCwgaXRlbU1ldGFkYXRhLm9mZnNldCAtIHNpemUgKyBzY3JvbGxiYXJTaXplICsgaXRlbU1ldGFkYXRhLnNpemUpO1xuXG4gIGlmIChhbGlnbiA9PT0gJ3NtYXJ0Jykge1xuICAgIGlmIChzY3JvbGxPZmZzZXQgPj0gbWluT2Zmc2V0IC0gc2l6ZSAmJiBzY3JvbGxPZmZzZXQgPD0gbWF4T2Zmc2V0ICsgc2l6ZSkge1xuICAgICAgYWxpZ24gPSAnYXV0byc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsaWduID0gJ2NlbnRlcic7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoIChhbGlnbikge1xuICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgIHJldHVybiBtYXhPZmZzZXQ7XG5cbiAgICBjYXNlICdlbmQnOlxuICAgICAgcmV0dXJuIG1pbk9mZnNldDtcblxuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChtaW5PZmZzZXQgKyAobWF4T2Zmc2V0IC0gbWluT2Zmc2V0KSAvIDIpO1xuXG4gICAgY2FzZSAnYXV0byc6XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmIChzY3JvbGxPZmZzZXQgPj0gbWluT2Zmc2V0ICYmIHNjcm9sbE9mZnNldCA8PSBtYXhPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHNjcm9sbE9mZnNldDtcbiAgICAgIH0gZWxzZSBpZiAobWluT2Zmc2V0ID4gbWF4T2Zmc2V0KSB7XG4gICAgICAgIC8vIEJlY2F1c2Ugd2Ugb25seSB0YWtlIGludG8gYWNjb3VudCB0aGUgc2Nyb2xsYmFyIHNpemUgd2hlbiBjYWxjdWxhdGluZyBtaW5PZmZzZXRcbiAgICAgICAgLy8gdGhpcyB2YWx1ZSBjYW4gYmUgbGFyZ2VyIHRoYW4gbWF4T2Zmc2V0IHdoZW4gYXQgdGhlIGVuZCBvZiB0aGUgbGlzdFxuICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuICAgICAgfSBlbHNlIGlmIChzY3JvbGxPZmZzZXQgPCBtaW5PZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIG1pbk9mZnNldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtYXhPZmZzZXQ7XG4gICAgICB9XG5cbiAgfVxufTtcblxudmFyIFZhcmlhYmxlU2l6ZUdyaWQgPVxuLyojX19QVVJFX18qL1xuY3JlYXRlR3JpZENvbXBvbmVudCh7XG4gIGdldENvbHVtbk9mZnNldDogZnVuY3Rpb24gZ2V0Q29sdW1uT2Zmc2V0KHByb3BzLCBpbmRleCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHJldHVybiBnZXRJdGVtTWV0YWRhdGEoJ2NvbHVtbicsIHByb3BzLCBpbmRleCwgaW5zdGFuY2VQcm9wcykub2Zmc2V0O1xuICB9LFxuICBnZXRDb2x1bW5TdGFydEluZGV4Rm9yT2Zmc2V0OiBmdW5jdGlvbiBnZXRDb2x1bW5TdGFydEluZGV4Rm9yT2Zmc2V0KHByb3BzLCBzY3JvbGxMZWZ0LCBpbnN0YW5jZVByb3BzKSB7XG4gICAgcmV0dXJuIGZpbmROZWFyZXN0SXRlbSgnY29sdW1uJywgcHJvcHMsIGluc3RhbmNlUHJvcHMsIHNjcm9sbExlZnQpO1xuICB9LFxuICBnZXRDb2x1bW5TdG9wSW5kZXhGb3JTdGFydEluZGV4OiBmdW5jdGlvbiBnZXRDb2x1bW5TdG9wSW5kZXhGb3JTdGFydEluZGV4KHByb3BzLCBzdGFydEluZGV4LCBzY3JvbGxMZWZ0LCBpbnN0YW5jZVByb3BzKSB7XG4gICAgdmFyIGNvbHVtbkNvdW50ID0gcHJvcHMuY29sdW1uQ291bnQsXG4gICAgICAgIHdpZHRoID0gcHJvcHMud2lkdGg7XG4gICAgdmFyIGl0ZW1NZXRhZGF0YSA9IGdldEl0ZW1NZXRhZGF0YSgnY29sdW1uJywgcHJvcHMsIHN0YXJ0SW5kZXgsIGluc3RhbmNlUHJvcHMpO1xuICAgIHZhciBtYXhPZmZzZXQgPSBzY3JvbGxMZWZ0ICsgd2lkdGg7XG4gICAgdmFyIG9mZnNldCA9IGl0ZW1NZXRhZGF0YS5vZmZzZXQgKyBpdGVtTWV0YWRhdGEuc2l6ZTtcbiAgICB2YXIgc3RvcEluZGV4ID0gc3RhcnRJbmRleDtcblxuICAgIHdoaWxlIChzdG9wSW5kZXggPCBjb2x1bW5Db3VudCAtIDEgJiYgb2Zmc2V0IDwgbWF4T2Zmc2V0KSB7XG4gICAgICBzdG9wSW5kZXgrKztcbiAgICAgIG9mZnNldCArPSBnZXRJdGVtTWV0YWRhdGEoJ2NvbHVtbicsIHByb3BzLCBzdG9wSW5kZXgsIGluc3RhbmNlUHJvcHMpLnNpemU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0b3BJbmRleDtcbiAgfSxcbiAgZ2V0Q29sdW1uV2lkdGg6IGZ1bmN0aW9uIGdldENvbHVtbldpZHRoKHByb3BzLCBpbmRleCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHJldHVybiBpbnN0YW5jZVByb3BzLmNvbHVtbk1ldGFkYXRhTWFwW2luZGV4XS5zaXplO1xuICB9LFxuICBnZXRFc3RpbWF0ZWRUb3RhbEhlaWdodDogZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQsXG4gIGdldEVzdGltYXRlZFRvdGFsV2lkdGg6IGdldEVzdGltYXRlZFRvdGFsV2lkdGgsXG4gIGdldE9mZnNldEZvckNvbHVtbkFuZEFsaWdubWVudDogZnVuY3Rpb24gZ2V0T2Zmc2V0Rm9yQ29sdW1uQW5kQWxpZ25tZW50KHByb3BzLCBpbmRleCwgYWxpZ24sIHNjcm9sbE9mZnNldCwgaW5zdGFuY2VQcm9wcywgc2Nyb2xsYmFyU2l6ZSkge1xuICAgIHJldHVybiBnZXRPZmZzZXRGb3JJbmRleEFuZEFsaWdubWVudCgnY29sdW1uJywgcHJvcHMsIGluZGV4LCBhbGlnbiwgc2Nyb2xsT2Zmc2V0LCBpbnN0YW5jZVByb3BzLCBzY3JvbGxiYXJTaXplKTtcbiAgfSxcbiAgZ2V0T2Zmc2V0Rm9yUm93QW5kQWxpZ25tZW50OiBmdW5jdGlvbiBnZXRPZmZzZXRGb3JSb3dBbmRBbGlnbm1lbnQocHJvcHMsIGluZGV4LCBhbGlnbiwgc2Nyb2xsT2Zmc2V0LCBpbnN0YW5jZVByb3BzLCBzY3JvbGxiYXJTaXplKSB7XG4gICAgcmV0dXJuIGdldE9mZnNldEZvckluZGV4QW5kQWxpZ25tZW50KCdyb3cnLCBwcm9wcywgaW5kZXgsIGFsaWduLCBzY3JvbGxPZmZzZXQsIGluc3RhbmNlUHJvcHMsIHNjcm9sbGJhclNpemUpO1xuICB9LFxuICBnZXRSb3dPZmZzZXQ6IGZ1bmN0aW9uIGdldFJvd09mZnNldChwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpIHtcbiAgICByZXR1cm4gZ2V0SXRlbU1ldGFkYXRhKCdyb3cnLCBwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpLm9mZnNldDtcbiAgfSxcbiAgZ2V0Um93SGVpZ2h0OiBmdW5jdGlvbiBnZXRSb3dIZWlnaHQocHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlUHJvcHMucm93TWV0YWRhdGFNYXBbaW5kZXhdLnNpemU7XG4gIH0sXG4gIGdldFJvd1N0YXJ0SW5kZXhGb3JPZmZzZXQ6IGZ1bmN0aW9uIGdldFJvd1N0YXJ0SW5kZXhGb3JPZmZzZXQocHJvcHMsIHNjcm9sbFRvcCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHJldHVybiBmaW5kTmVhcmVzdEl0ZW0oJ3JvdycsIHByb3BzLCBpbnN0YW5jZVByb3BzLCBzY3JvbGxUb3ApO1xuICB9LFxuICBnZXRSb3dTdG9wSW5kZXhGb3JTdGFydEluZGV4OiBmdW5jdGlvbiBnZXRSb3dTdG9wSW5kZXhGb3JTdGFydEluZGV4KHByb3BzLCBzdGFydEluZGV4LCBzY3JvbGxUb3AsIGluc3RhbmNlUHJvcHMpIHtcbiAgICB2YXIgcm93Q291bnQgPSBwcm9wcy5yb3dDb3VudCxcbiAgICAgICAgaGVpZ2h0ID0gcHJvcHMuaGVpZ2h0O1xuICAgIHZhciBpdGVtTWV0YWRhdGEgPSBnZXRJdGVtTWV0YWRhdGEoJ3JvdycsIHByb3BzLCBzdGFydEluZGV4LCBpbnN0YW5jZVByb3BzKTtcbiAgICB2YXIgbWF4T2Zmc2V0ID0gc2Nyb2xsVG9wICsgaGVpZ2h0O1xuICAgIHZhciBvZmZzZXQgPSBpdGVtTWV0YWRhdGEub2Zmc2V0ICsgaXRlbU1ldGFkYXRhLnNpemU7XG4gICAgdmFyIHN0b3BJbmRleCA9IHN0YXJ0SW5kZXg7XG5cbiAgICB3aGlsZSAoc3RvcEluZGV4IDwgcm93Q291bnQgLSAxICYmIG9mZnNldCA8IG1heE9mZnNldCkge1xuICAgICAgc3RvcEluZGV4Kys7XG4gICAgICBvZmZzZXQgKz0gZ2V0SXRlbU1ldGFkYXRhKCdyb3cnLCBwcm9wcywgc3RvcEluZGV4LCBpbnN0YW5jZVByb3BzKS5zaXplO1xuICAgIH1cblxuICAgIHJldHVybiBzdG9wSW5kZXg7XG4gIH0sXG4gIGluaXRJbnN0YW5jZVByb3BzOiBmdW5jdGlvbiBpbml0SW5zdGFuY2VQcm9wcyhwcm9wcywgaW5zdGFuY2UpIHtcbiAgICB2YXIgX3JlZjUgPSBwcm9wcyxcbiAgICAgICAgZXN0aW1hdGVkQ29sdW1uV2lkdGggPSBfcmVmNS5lc3RpbWF0ZWRDb2x1bW5XaWR0aCxcbiAgICAgICAgZXN0aW1hdGVkUm93SGVpZ2h0ID0gX3JlZjUuZXN0aW1hdGVkUm93SGVpZ2h0O1xuICAgIHZhciBpbnN0YW5jZVByb3BzID0ge1xuICAgICAgY29sdW1uTWV0YWRhdGFNYXA6IHt9LFxuICAgICAgZXN0aW1hdGVkQ29sdW1uV2lkdGg6IGVzdGltYXRlZENvbHVtbldpZHRoIHx8IERFRkFVTFRfRVNUSU1BVEVEX0lURU1fU0laRSxcbiAgICAgIGVzdGltYXRlZFJvd0hlaWdodDogZXN0aW1hdGVkUm93SGVpZ2h0IHx8IERFRkFVTFRfRVNUSU1BVEVEX0lURU1fU0laRSxcbiAgICAgIGxhc3RNZWFzdXJlZENvbHVtbkluZGV4OiAtMSxcbiAgICAgIGxhc3RNZWFzdXJlZFJvd0luZGV4OiAtMSxcbiAgICAgIHJvd01ldGFkYXRhTWFwOiB7fVxuICAgIH07XG5cbiAgICBpbnN0YW5jZS5yZXNldEFmdGVyQ29sdW1uSW5kZXggPSBmdW5jdGlvbiAoY29sdW1uSW5kZXgsIHNob3VsZEZvcmNlVXBkYXRlKSB7XG4gICAgICBpZiAoc2hvdWxkRm9yY2VVcGRhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICBzaG91bGRGb3JjZVVwZGF0ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGluc3RhbmNlLnJlc2V0QWZ0ZXJJbmRpY2VzKHtcbiAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4LFxuICAgICAgICBzaG91bGRGb3JjZVVwZGF0ZTogc2hvdWxkRm9yY2VVcGRhdGVcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpbnN0YW5jZS5yZXNldEFmdGVyUm93SW5kZXggPSBmdW5jdGlvbiAocm93SW5kZXgsIHNob3VsZEZvcmNlVXBkYXRlKSB7XG4gICAgICBpZiAoc2hvdWxkRm9yY2VVcGRhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICBzaG91bGRGb3JjZVVwZGF0ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGluc3RhbmNlLnJlc2V0QWZ0ZXJJbmRpY2VzKHtcbiAgICAgICAgcm93SW5kZXg6IHJvd0luZGV4LFxuICAgICAgICBzaG91bGRGb3JjZVVwZGF0ZTogc2hvdWxkRm9yY2VVcGRhdGVcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpbnN0YW5jZS5yZXNldEFmdGVySW5kaWNlcyA9IGZ1bmN0aW9uIChfcmVmNikge1xuICAgICAgdmFyIGNvbHVtbkluZGV4ID0gX3JlZjYuY29sdW1uSW5kZXgsXG4gICAgICAgICAgcm93SW5kZXggPSBfcmVmNi5yb3dJbmRleCxcbiAgICAgICAgICBfcmVmNiRzaG91bGRGb3JjZVVwZGEgPSBfcmVmNi5zaG91bGRGb3JjZVVwZGF0ZSxcbiAgICAgICAgICBzaG91bGRGb3JjZVVwZGF0ZSA9IF9yZWY2JHNob3VsZEZvcmNlVXBkYSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWY2JHNob3VsZEZvcmNlVXBkYTtcblxuICAgICAgaWYgKHR5cGVvZiBjb2x1bW5JbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRDb2x1bW5JbmRleCA9IE1hdGgubWluKGluc3RhbmNlUHJvcHMubGFzdE1lYXN1cmVkQ29sdW1uSW5kZXgsIGNvbHVtbkluZGV4IC0gMSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygcm93SW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICAgIGluc3RhbmNlUHJvcHMubGFzdE1lYXN1cmVkUm93SW5kZXggPSBNYXRoLm1pbihpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZFJvd0luZGV4LCByb3dJbmRleCAtIDEpO1xuICAgICAgfSAvLyBXZSBjb3VsZCBwb3RlbnRpYWxseSBvcHRpbWl6ZSBmdXJ0aGVyIGJ5IG9ubHkgZXZpY3Rpbmcgc3R5bGVzIGFmdGVyIHRoaXMgaW5kZXgsXG4gICAgICAvLyBCdXQgc2luY2Ugc3R5bGVzIGFyZSBvbmx5IGNhY2hlZCB3aGlsZSBzY3JvbGxpbmcgaXMgaW4gcHJvZ3Jlc3MtXG4gICAgICAvLyBJdCBzZWVtcyBhbiB1bm5lY2Vzc2FyeSBvcHRpbWl6YXRpb24uXG4gICAgICAvLyBJdCdzIHVubGlrZWx5IHRoYXQgcmVzZXRBZnRlckluZGV4KCkgd2lsbCBiZSBjYWxsZWQgd2hpbGUgYSB1c2VyIGlzIHNjcm9sbGluZy5cblxuXG4gICAgICBpbnN0YW5jZS5fZ2V0SXRlbVN0eWxlQ2FjaGUoLTEpO1xuXG4gICAgICBpZiAoc2hvdWxkRm9yY2VVcGRhdGUpIHtcbiAgICAgICAgaW5zdGFuY2UuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGluc3RhbmNlUHJvcHM7XG4gIH0sXG4gIHNob3VsZFJlc2V0U3R5bGVDYWNoZU9uSXRlbVNpemVDaGFuZ2U6IGZhbHNlLFxuICB2YWxpZGF0ZVByb3BzOiBmdW5jdGlvbiB2YWxpZGF0ZVByb3BzKF9yZWY3KSB7XG4gICAgdmFyIGNvbHVtbldpZHRoID0gX3JlZjcuY29sdW1uV2lkdGgsXG4gICAgICAgIHJvd0hlaWdodCA9IF9yZWY3LnJvd0hlaWdodDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbHVtbldpZHRoICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwiY29sdW1uV2lkdGhcIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgYSBmdW5jdGlvbi4gJyArIChcIlxcXCJcIiArIChjb2x1bW5XaWR0aCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBjb2x1bW5XaWR0aCkgKyBcIlxcXCIgd2FzIHNwZWNpZmllZC5cIikpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygcm93SGVpZ2h0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwicm93SGVpZ2h0XCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnVmFsdWUgc2hvdWxkIGJlIGEgZnVuY3Rpb24uICcgKyAoXCJcXFwiXCIgKyAocm93SGVpZ2h0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHJvd0hlaWdodCkgKyBcIlxcXCIgd2FzIHNwZWNpZmllZC5cIikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbnZhciBJU19TQ1JPTExJTkdfREVCT1VOQ0VfSU5URVJWQUwkMSA9IDE1MDtcblxudmFyIGRlZmF1bHRJdGVtS2V5JDEgPSBmdW5jdGlvbiBkZWZhdWx0SXRlbUtleShpbmRleCwgZGF0YSkge1xuICByZXR1cm4gaW5kZXg7XG59OyAvLyBJbiBERVYgbW9kZSwgdGhpcyBTZXQgaGVscHMgdXMgb25seSBsb2cgYSB3YXJuaW5nIG9uY2UgcGVyIGNvbXBvbmVudCBpbnN0YW5jZS5cbi8vIFRoaXMgYXZvaWRzIHNwYW1taW5nIHRoZSBjb25zb2xlIGV2ZXJ5IHRpbWUgYSByZW5kZXIgaGFwcGVucy5cblxuXG52YXIgZGV2V2FybmluZ3NEaXJlY3Rpb24gPSBudWxsO1xudmFyIGRldldhcm5pbmdzVGFnTmFtZSQxID0gbnVsbDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuV2Vha1NldCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkZXZXYXJuaW5nc0RpcmVjdGlvbiA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIG5ldyBXZWFrU2V0KCk7XG4gICAgZGV2V2FybmluZ3NUYWdOYW1lJDEgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBuZXcgV2Vha1NldCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RDb21wb25lbnQoX3JlZikge1xuICB2YXIgX2NsYXNzLCBfdGVtcDtcblxuICB2YXIgZ2V0SXRlbU9mZnNldCA9IF9yZWYuZ2V0SXRlbU9mZnNldCxcbiAgICAgIGdldEVzdGltYXRlZFRvdGFsU2l6ZSA9IF9yZWYuZ2V0RXN0aW1hdGVkVG90YWxTaXplLFxuICAgICAgZ2V0SXRlbVNpemUgPSBfcmVmLmdldEl0ZW1TaXplLFxuICAgICAgZ2V0T2Zmc2V0Rm9ySW5kZXhBbmRBbGlnbm1lbnQgPSBfcmVmLmdldE9mZnNldEZvckluZGV4QW5kQWxpZ25tZW50LFxuICAgICAgZ2V0U3RhcnRJbmRleEZvck9mZnNldCA9IF9yZWYuZ2V0U3RhcnRJbmRleEZvck9mZnNldCxcbiAgICAgIGdldFN0b3BJbmRleEZvclN0YXJ0SW5kZXggPSBfcmVmLmdldFN0b3BJbmRleEZvclN0YXJ0SW5kZXgsXG4gICAgICBpbml0SW5zdGFuY2VQcm9wcyA9IF9yZWYuaW5pdEluc3RhbmNlUHJvcHMsXG4gICAgICBzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlID0gX3JlZi5zaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlLFxuICAgICAgdmFsaWRhdGVQcm9wcyA9IF9yZWYudmFsaWRhdGVQcm9wcztcbiAgcmV0dXJuIF90ZW1wID0gX2NsYXNzID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX1B1cmVDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHNMb29zZShMaXN0LCBfUHVyZUNvbXBvbmVudCk7XG5cbiAgICAvLyBBbHdheXMgdXNlIGV4cGxpY2l0IGNvbnN0cnVjdG9yIGZvciBSZWFjdCBjb21wb25lbnRzLlxuICAgIC8vIEl0IHByb2R1Y2VzIGxlc3MgY29kZSBhZnRlciB0cmFuc3BpbGF0aW9uLiAoIzI2KVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yXG4gICAgZnVuY3Rpb24gTGlzdChwcm9wcykge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfdGhpcyA9IF9QdXJlQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMpIHx8IHRoaXM7XG4gICAgICBfdGhpcy5faW5zdGFuY2VQcm9wcyA9IGluaXRJbnN0YW5jZVByb3BzKF90aGlzLnByb3BzLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSk7XG4gICAgICBfdGhpcy5fb3V0ZXJSZWYgPSB2b2lkIDA7XG4gICAgICBfdGhpcy5fcmVzZXRJc1Njcm9sbGluZ1RpbWVvdXRJZCA9IG51bGw7XG4gICAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgaW5zdGFuY2U6IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpLFxuICAgICAgICBpc1Njcm9sbGluZzogZmFsc2UsXG4gICAgICAgIHNjcm9sbERpcmVjdGlvbjogJ2ZvcndhcmQnLFxuICAgICAgICBzY3JvbGxPZmZzZXQ6IHR5cGVvZiBfdGhpcy5wcm9wcy5pbml0aWFsU2Nyb2xsT2Zmc2V0ID09PSAnbnVtYmVyJyA/IF90aGlzLnByb3BzLmluaXRpYWxTY3JvbGxPZmZzZXQgOiAwLFxuICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ6IGZhbHNlXG4gICAgICB9O1xuICAgICAgX3RoaXMuX2NhbGxPbkl0ZW1zUmVuZGVyZWQgPSB2b2lkIDA7XG4gICAgICBfdGhpcy5fY2FsbE9uSXRlbXNSZW5kZXJlZCA9IG1lbW9pemVPbmUoZnVuY3Rpb24gKG92ZXJzY2FuU3RhcnRJbmRleCwgb3ZlcnNjYW5TdG9wSW5kZXgsIHZpc2libGVTdGFydEluZGV4LCB2aXNpYmxlU3RvcEluZGV4KSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5wcm9wcy5vbkl0ZW1zUmVuZGVyZWQoe1xuICAgICAgICAgIG92ZXJzY2FuU3RhcnRJbmRleDogb3ZlcnNjYW5TdGFydEluZGV4LFxuICAgICAgICAgIG92ZXJzY2FuU3RvcEluZGV4OiBvdmVyc2NhblN0b3BJbmRleCxcbiAgICAgICAgICB2aXNpYmxlU3RhcnRJbmRleDogdmlzaWJsZVN0YXJ0SW5kZXgsXG4gICAgICAgICAgdmlzaWJsZVN0b3BJbmRleDogdmlzaWJsZVN0b3BJbmRleFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgX3RoaXMuX2NhbGxPblNjcm9sbCA9IHZvaWQgMDtcbiAgICAgIF90aGlzLl9jYWxsT25TY3JvbGwgPSBtZW1vaXplT25lKGZ1bmN0aW9uIChzY3JvbGxEaXJlY3Rpb24sIHNjcm9sbE9mZnNldCwgc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5wcm9wcy5vblNjcm9sbCh7XG4gICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uOiBzY3JvbGxEaXJlY3Rpb24sXG4gICAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxPZmZzZXQsXG4gICAgICAgICAgc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkOiBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIF90aGlzLl9nZXRJdGVtU3R5bGUgPSB2b2lkIDA7XG5cbiAgICAgIF90aGlzLl9nZXRJdGVtU3R5bGUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBfdGhpcyRwcm9wcy5kaXJlY3Rpb24sXG4gICAgICAgICAgICBpdGVtU2l6ZSA9IF90aGlzJHByb3BzLml0ZW1TaXplLFxuICAgICAgICAgICAgbGF5b3V0ID0gX3RoaXMkcHJvcHMubGF5b3V0O1xuXG4gICAgICAgIHZhciBpdGVtU3R5bGVDYWNoZSA9IF90aGlzLl9nZXRJdGVtU3R5bGVDYWNoZShzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlICYmIGl0ZW1TaXplLCBzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlICYmIGxheW91dCwgc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSAmJiBkaXJlY3Rpb24pO1xuXG4gICAgICAgIHZhciBzdHlsZTtcblxuICAgICAgICBpZiAoaXRlbVN0eWxlQ2FjaGUuaGFzT3duUHJvcGVydHkoaW5kZXgpKSB7XG4gICAgICAgICAgc3R5bGUgPSBpdGVtU3R5bGVDYWNoZVtpbmRleF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIF9vZmZzZXQgPSBnZXRJdGVtT2Zmc2V0KF90aGlzLnByb3BzLCBpbmRleCwgX3RoaXMuX2luc3RhbmNlUHJvcHMpO1xuXG4gICAgICAgICAgdmFyIHNpemUgPSBnZXRJdGVtU2l6ZShfdGhpcy5wcm9wcywgaW5kZXgsIF90aGlzLl9pbnN0YW5jZVByb3BzKTsgLy8gVE9ETyBEZXByZWNhdGUgZGlyZWN0aW9uIFwiaG9yaXpvbnRhbFwiXG5cbiAgICAgICAgICB2YXIgaXNIb3Jpem9udGFsID0gZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgfHwgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCc7XG4gICAgICAgICAgdmFyIGlzUnRsID0gZGlyZWN0aW9uID09PSAncnRsJztcbiAgICAgICAgICB2YXIgb2Zmc2V0SG9yaXpvbnRhbCA9IGlzSG9yaXpvbnRhbCA/IF9vZmZzZXQgOiAwO1xuICAgICAgICAgIGl0ZW1TdHlsZUNhY2hlW2luZGV4XSA9IHN0eWxlID0ge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiBpc1J0bCA/IHVuZGVmaW5lZCA6IG9mZnNldEhvcml6b250YWwsXG4gICAgICAgICAgICByaWdodDogaXNSdGwgPyBvZmZzZXRIb3Jpem9udGFsIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdG9wOiAhaXNIb3Jpem9udGFsID8gX29mZnNldCA6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6ICFpc0hvcml6b250YWwgPyBzaXplIDogJzEwMCUnLFxuICAgICAgICAgICAgd2lkdGg6IGlzSG9yaXpvbnRhbCA/IHNpemUgOiAnMTAwJSdcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuX2dldEl0ZW1TdHlsZUNhY2hlID0gdm9pZCAwO1xuICAgICAgX3RoaXMuX2dldEl0ZW1TdHlsZUNhY2hlID0gbWVtb2l6ZU9uZShmdW5jdGlvbiAoXywgX18sIF9fXykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9KTtcblxuICAgICAgX3RoaXMuX29uU2Nyb2xsSG9yaXpvbnRhbCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX2V2ZW50JGN1cnJlbnRUYXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICAgICAgY2xpZW50V2lkdGggPSBfZXZlbnQkY3VycmVudFRhcmdldC5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgIHNjcm9sbExlZnQgPSBfZXZlbnQkY3VycmVudFRhcmdldC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgc2Nyb2xsV2lkdGggPSBfZXZlbnQkY3VycmVudFRhcmdldC5zY3JvbGxXaWR0aDtcblxuICAgICAgICBfdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAocHJldlN0YXRlKSB7XG4gICAgICAgICAgaWYgKHByZXZTdGF0ZS5zY3JvbGxPZmZzZXQgPT09IHNjcm9sbExlZnQpIHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBwb3NpdGlvbiBtYXkgaGF2ZSBiZWVuIHVwZGF0ZWQgYnkgY0RNL2NEVSxcbiAgICAgICAgICAgIC8vIEluIHdoaWNoIGNhc2Ugd2UgZG9uJ3QgbmVlZCB0byB0cmlnZ2VyIGFub3RoZXIgcmVuZGVyLFxuICAgICAgICAgICAgLy8gQW5kIHdlIGRvbid0IHdhbnQgdG8gdXBkYXRlIHN0YXRlLmlzU2Nyb2xsaW5nLlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IF90aGlzLnByb3BzLmRpcmVjdGlvbjtcbiAgICAgICAgICB2YXIgc2Nyb2xsT2Zmc2V0ID0gc2Nyb2xsTGVmdDtcblxuICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgICAgICAgICAvLyBUUklDS1kgQWNjb3JkaW5nIHRvIHRoZSBzcGVjLCBzY3JvbGxMZWZ0IHNob3VsZCBiZSBuZWdhdGl2ZSBmb3IgUlRMIGFsaWduZWQgZWxlbWVudHMuXG4gICAgICAgICAgICAvLyBUaGlzIGlzIG5vdCB0aGUgY2FzZSBmb3IgYWxsIGJyb3dzZXJzIHRob3VnaCAoZS5nLiBDaHJvbWUgcmVwb3J0cyB2YWx1ZXMgYXMgcG9zaXRpdmUsIG1lYXN1cmVkIHJlbGF0aXZlIHRvIHRoZSBsZWZ0KS5cbiAgICAgICAgICAgIC8vIEl0J3MgYWxzbyBlYXNpZXIgZm9yIHRoaXMgY29tcG9uZW50IGlmIHdlIGNvbnZlcnQgb2Zmc2V0cyB0byB0aGUgc2FtZSBmb3JtYXQgYXMgdGhleSB3b3VsZCBiZSBpbiBmb3IgbHRyLlxuICAgICAgICAgICAgLy8gU28gdGhlIHNpbXBsZXN0IHNvbHV0aW9uIGlzIHRvIGRldGVybWluZSB3aGljaCBicm93c2VyIGJlaGF2aW9yIHdlJ3JlIGRlYWxpbmcgd2l0aCwgYW5kIGNvbnZlcnQgYmFzZWQgb24gaXQuXG4gICAgICAgICAgICBzd2l0Y2ggKGdldFJUTE9mZnNldFR5cGUoKSkge1xuICAgICAgICAgICAgICBjYXNlICduZWdhdGl2ZSc6XG4gICAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gLXNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAncG9zaXRpdmUtZGVzY2VuZGluZyc6XG4gICAgICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gc2Nyb2xsV2lkdGggLSBjbGllbnRXaWR0aCAtIHNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSAvLyBQcmV2ZW50IFNhZmFyaSdzIGVsYXN0aWMgc2Nyb2xsaW5nIGZyb20gY2F1c2luZyB2aXN1YWwgc2hha2luZyB3aGVuIHNjcm9sbGluZyBwYXN0IGJvdW5kcy5cblxuXG4gICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc2Nyb2xsT2Zmc2V0LCBzY3JvbGxXaWR0aCAtIGNsaWVudFdpZHRoKSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uOiBwcmV2U3RhdGUuc2Nyb2xsT2Zmc2V0IDwgc2Nyb2xsTGVmdCA/ICdmb3J3YXJkJyA6ICdiYWNrd2FyZCcsXG4gICAgICAgICAgICBzY3JvbGxPZmZzZXQ6IHNjcm9sbE9mZnNldCxcbiAgICAgICAgICAgIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZDogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9LCBfdGhpcy5fcmVzZXRJc1Njcm9sbGluZ0RlYm91bmNlZCk7XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5fb25TY3JvbGxWZXJ0aWNhbCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX2V2ZW50JGN1cnJlbnRUYXJnZXQyID0gZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICAgIGNsaWVudEhlaWdodCA9IF9ldmVudCRjdXJyZW50VGFyZ2V0Mi5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQgPSBfZXZlbnQkY3VycmVudFRhcmdldDIuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgc2Nyb2xsVG9wID0gX2V2ZW50JGN1cnJlbnRUYXJnZXQyLnNjcm9sbFRvcDtcblxuICAgICAgICBfdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAocHJldlN0YXRlKSB7XG4gICAgICAgICAgaWYgKHByZXZTdGF0ZS5zY3JvbGxPZmZzZXQgPT09IHNjcm9sbFRvcCkge1xuICAgICAgICAgICAgLy8gU2Nyb2xsIHBvc2l0aW9uIG1heSBoYXZlIGJlZW4gdXBkYXRlZCBieSBjRE0vY0RVLFxuICAgICAgICAgICAgLy8gSW4gd2hpY2ggY2FzZSB3ZSBkb24ndCBuZWVkIHRvIHRyaWdnZXIgYW5vdGhlciByZW5kZXIsXG4gICAgICAgICAgICAvLyBBbmQgd2UgZG9uJ3Qgd2FudCB0byB1cGRhdGUgc3RhdGUuaXNTY3JvbGxpbmcuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9IC8vIFByZXZlbnQgU2FmYXJpJ3MgZWxhc3RpYyBzY3JvbGxpbmcgZnJvbSBjYXVzaW5nIHZpc3VhbCBzaGFraW5nIHdoZW4gc2Nyb2xsaW5nIHBhc3QgYm91bmRzLlxuXG5cbiAgICAgICAgICB2YXIgc2Nyb2xsT2Zmc2V0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oc2Nyb2xsVG9wLCBzY3JvbGxIZWlnaHQgLSBjbGllbnRIZWlnaHQpKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHRydWUsXG4gICAgICAgICAgICBzY3JvbGxEaXJlY3Rpb246IHByZXZTdGF0ZS5zY3JvbGxPZmZzZXQgPCBzY3JvbGxPZmZzZXQgPyAnZm9yd2FyZCcgOiAnYmFja3dhcmQnLFxuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxPZmZzZXQsXG4gICAgICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ6IGZhbHNlXG4gICAgICAgICAgfTtcbiAgICAgICAgfSwgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdEZWJvdW5jZWQpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuX291dGVyUmVmU2V0dGVyID0gZnVuY3Rpb24gKHJlZikge1xuICAgICAgICB2YXIgb3V0ZXJSZWYgPSBfdGhpcy5wcm9wcy5vdXRlclJlZjtcbiAgICAgICAgX3RoaXMuX291dGVyUmVmID0gcmVmO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3V0ZXJSZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBvdXRlclJlZihyZWYpO1xuICAgICAgICB9IGVsc2UgaWYgKG91dGVyUmVmICE9IG51bGwgJiYgdHlwZW9mIG91dGVyUmVmID09PSAnb2JqZWN0JyAmJiBvdXRlclJlZi5oYXNPd25Qcm9wZXJ0eSgnY3VycmVudCcpKSB7XG4gICAgICAgICAgb3V0ZXJSZWYuY3VycmVudCA9IHJlZjtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdEZWJvdW5jZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfdGhpcy5fcmVzZXRJc1Njcm9sbGluZ1RpbWVvdXRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNhbmNlbFRpbWVvdXQoX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQgPSByZXF1ZXN0VGltZW91dChfdGhpcy5fcmVzZXRJc1Njcm9sbGluZywgSVNfU0NST0xMSU5HX0RFQk9VTkNFX0lOVEVSVkFMJDEpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkID0gbnVsbDtcblxuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBDbGVhciBzdHlsZSBjYWNoZSBhZnRlciBzdGF0ZSB1cGRhdGUgaGFzIGJlZW4gY29tbWl0dGVkLlxuICAgICAgICAgIC8vIFRoaXMgd2F5IHdlIGRvbid0IGJyZWFrIHB1cmUgc0NVIGZvciBpdGVtcyB0aGF0IGRvbid0IHVzZSBpc1Njcm9sbGluZyBwYXJhbS5cbiAgICAgICAgICBfdGhpcy5fZ2V0SXRlbVN0eWxlQ2FjaGUoLTEsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBMaXN0LmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9IGZ1bmN0aW9uIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgdmFsaWRhdGVTaGFyZWRQcm9wcyQxKG5leHRQcm9wcywgcHJldlN0YXRlKTtcbiAgICAgIHZhbGlkYXRlUHJvcHMobmV4dFByb3BzKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB2YXIgX3Byb3RvID0gTGlzdC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8uc2Nyb2xsVG8gPSBmdW5jdGlvbiBzY3JvbGxUbyhzY3JvbGxPZmZzZXQpIHtcbiAgICAgIHNjcm9sbE9mZnNldCA9IE1hdGgubWF4KDAsIHNjcm9sbE9mZnNldCk7XG4gICAgICB0aGlzLnNldFN0YXRlKGZ1bmN0aW9uIChwcmV2U3RhdGUpIHtcbiAgICAgICAgaWYgKHByZXZTdGF0ZS5zY3JvbGxPZmZzZXQgPT09IHNjcm9sbE9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzY3JvbGxEaXJlY3Rpb246IHByZXZTdGF0ZS5zY3JvbGxPZmZzZXQgPCBzY3JvbGxPZmZzZXQgPyAnZm9yd2FyZCcgOiAnYmFja3dhcmQnLFxuICAgICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfSwgdGhpcy5fcmVzZXRJc1Njcm9sbGluZ0RlYm91bmNlZCk7XG4gICAgfTtcblxuICAgIF9wcm90by5zY3JvbGxUb0l0ZW0gPSBmdW5jdGlvbiBzY3JvbGxUb0l0ZW0oaW5kZXgsIGFsaWduKSB7XG4gICAgICBpZiAoYWxpZ24gPT09IHZvaWQgMCkge1xuICAgICAgICBhbGlnbiA9ICdhdXRvJztcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZW1Db3VudCA9IHRoaXMucHJvcHMuaXRlbUNvdW50O1xuICAgICAgdmFyIHNjcm9sbE9mZnNldCA9IHRoaXMuc3RhdGUuc2Nyb2xsT2Zmc2V0O1xuICAgICAgaW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihpbmRleCwgaXRlbUNvdW50IC0gMSkpO1xuICAgICAgdGhpcy5zY3JvbGxUbyhnZXRPZmZzZXRGb3JJbmRleEFuZEFsaWdubWVudCh0aGlzLnByb3BzLCBpbmRleCwgYWxpZ24sIHNjcm9sbE9mZnNldCwgdGhpcy5faW5zdGFuY2VQcm9wcykpO1xuICAgIH07XG5cbiAgICBfcHJvdG8uY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGRpcmVjdGlvbiA9IF90aGlzJHByb3BzMi5kaXJlY3Rpb24sXG4gICAgICAgICAgaW5pdGlhbFNjcm9sbE9mZnNldCA9IF90aGlzJHByb3BzMi5pbml0aWFsU2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgIGxheW91dCA9IF90aGlzJHByb3BzMi5sYXlvdXQ7XG5cbiAgICAgIGlmICh0eXBlb2YgaW5pdGlhbFNjcm9sbE9mZnNldCA9PT0gJ251bWJlcicgJiYgdGhpcy5fb3V0ZXJSZWYgIT0gbnVsbCkge1xuICAgICAgICB2YXIgb3V0ZXJSZWYgPSB0aGlzLl9vdXRlclJlZjsgLy8gVE9ETyBEZXByZWNhdGUgZGlyZWN0aW9uIFwiaG9yaXpvbnRhbFwiXG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnIHx8IGxheW91dCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsTGVmdCA9IGluaXRpYWxTY3JvbGxPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsVG9wID0gaW5pdGlhbFNjcm9sbE9mZnNldDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9jYWxsUHJvcHNDYWxsYmFja3MoKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGRpcmVjdGlvbiA9IF90aGlzJHByb3BzMy5kaXJlY3Rpb24sXG4gICAgICAgICAgbGF5b3V0ID0gX3RoaXMkcHJvcHMzLmxheW91dDtcbiAgICAgIHZhciBfdGhpcyRzdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gX3RoaXMkc3RhdGUuc2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCA9IF90aGlzJHN0YXRlLnNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZDtcblxuICAgICAgaWYgKHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCAmJiB0aGlzLl9vdXRlclJlZiAhPSBudWxsKSB7XG4gICAgICAgIHZhciBvdXRlclJlZiA9IHRoaXMuX291dGVyUmVmOyAvLyBUT0RPIERlcHJlY2F0ZSBkaXJlY3Rpb24gXCJob3Jpem9udGFsXCJcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgfHwgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgICAgICAgICAgLy8gVFJJQ0tZIEFjY29yZGluZyB0byB0aGUgc3BlYywgc2Nyb2xsTGVmdCBzaG91bGQgYmUgbmVnYXRpdmUgZm9yIFJUTCBhbGlnbmVkIGVsZW1lbnRzLlxuICAgICAgICAgICAgLy8gVGhpcyBpcyBub3QgdGhlIGNhc2UgZm9yIGFsbCBicm93c2VycyB0aG91Z2ggKGUuZy4gQ2hyb21lIHJlcG9ydHMgdmFsdWVzIGFzIHBvc2l0aXZlLCBtZWFzdXJlZCByZWxhdGl2ZSB0byB0aGUgbGVmdCkuXG4gICAgICAgICAgICAvLyBTbyB3ZSBuZWVkIHRvIGRldGVybWluZSB3aGljaCBicm93c2VyIGJlaGF2aW9yIHdlJ3JlIGRlYWxpbmcgd2l0aCwgYW5kIG1pbWljIGl0LlxuICAgICAgICAgICAgc3dpdGNoIChnZXRSVExPZmZzZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgY2FzZSAnbmVnYXRpdmUnOlxuICAgICAgICAgICAgICAgIG91dGVyUmVmLnNjcm9sbExlZnQgPSAtc2Nyb2xsT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgJ3Bvc2l0aXZlLWFzY2VuZGluZyc6XG4gICAgICAgICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsTGVmdCA9IHNjcm9sbE9mZnNldDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHZhciBjbGllbnRXaWR0aCA9IG91dGVyUmVmLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxXaWR0aCA9IG91dGVyUmVmLnNjcm9sbFdpZHRoO1xuICAgICAgICAgICAgICAgIG91dGVyUmVmLnNjcm9sbExlZnQgPSBzY3JvbGxXaWR0aCAtIGNsaWVudFdpZHRoIC0gc2Nyb2xsT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRlclJlZi5zY3JvbGxMZWZ0ID0gc2Nyb2xsT2Zmc2V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdXRlclJlZi5zY3JvbGxUb3AgPSBzY3JvbGxPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2FsbFByb3BzQ2FsbGJhY2tzKCk7XG4gICAgfTtcblxuICAgIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICAgICAgY2FuY2VsVGltZW91dCh0aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczQgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3RoaXMkcHJvcHM0LmNoaWxkcmVuLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF90aGlzJHByb3BzNC5jbGFzc05hbWUsXG4gICAgICAgICAgZGlyZWN0aW9uID0gX3RoaXMkcHJvcHM0LmRpcmVjdGlvbixcbiAgICAgICAgICBoZWlnaHQgPSBfdGhpcyRwcm9wczQuaGVpZ2h0LFxuICAgICAgICAgIGlubmVyUmVmID0gX3RoaXMkcHJvcHM0LmlubmVyUmVmLFxuICAgICAgICAgIGlubmVyRWxlbWVudFR5cGUgPSBfdGhpcyRwcm9wczQuaW5uZXJFbGVtZW50VHlwZSxcbiAgICAgICAgICBpbm5lclRhZ05hbWUgPSBfdGhpcyRwcm9wczQuaW5uZXJUYWdOYW1lLFxuICAgICAgICAgIGl0ZW1Db3VudCA9IF90aGlzJHByb3BzNC5pdGVtQ291bnQsXG4gICAgICAgICAgaXRlbURhdGEgPSBfdGhpcyRwcm9wczQuaXRlbURhdGEsXG4gICAgICAgICAgX3RoaXMkcHJvcHM0JGl0ZW1LZXkgPSBfdGhpcyRwcm9wczQuaXRlbUtleSxcbiAgICAgICAgICBpdGVtS2V5ID0gX3RoaXMkcHJvcHM0JGl0ZW1LZXkgPT09IHZvaWQgMCA/IGRlZmF1bHRJdGVtS2V5JDEgOiBfdGhpcyRwcm9wczQkaXRlbUtleSxcbiAgICAgICAgICBsYXlvdXQgPSBfdGhpcyRwcm9wczQubGF5b3V0LFxuICAgICAgICAgIG91dGVyRWxlbWVudFR5cGUgPSBfdGhpcyRwcm9wczQub3V0ZXJFbGVtZW50VHlwZSxcbiAgICAgICAgICBvdXRlclRhZ05hbWUgPSBfdGhpcyRwcm9wczQub3V0ZXJUYWdOYW1lLFxuICAgICAgICAgIHN0eWxlID0gX3RoaXMkcHJvcHM0LnN0eWxlLFxuICAgICAgICAgIHVzZUlzU2Nyb2xsaW5nID0gX3RoaXMkcHJvcHM0LnVzZUlzU2Nyb2xsaW5nLFxuICAgICAgICAgIHdpZHRoID0gX3RoaXMkcHJvcHM0LndpZHRoO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gdGhpcy5zdGF0ZS5pc1Njcm9sbGluZzsgLy8gVE9ETyBEZXByZWNhdGUgZGlyZWN0aW9uIFwiaG9yaXpvbnRhbFwiXG5cbiAgICAgIHZhciBpc0hvcml6b250YWwgPSBkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyB8fCBsYXlvdXQgPT09ICdob3Jpem9udGFsJztcbiAgICAgIHZhciBvblNjcm9sbCA9IGlzSG9yaXpvbnRhbCA/IHRoaXMuX29uU2Nyb2xsSG9yaXpvbnRhbCA6IHRoaXMuX29uU2Nyb2xsVmVydGljYWw7XG5cbiAgICAgIHZhciBfdGhpcyRfZ2V0UmFuZ2VUb1JlbmQgPSB0aGlzLl9nZXRSYW5nZVRvUmVuZGVyKCksXG4gICAgICAgICAgc3RhcnRJbmRleCA9IF90aGlzJF9nZXRSYW5nZVRvUmVuZFswXSxcbiAgICAgICAgICBzdG9wSW5kZXggPSBfdGhpcyRfZ2V0UmFuZ2VUb1JlbmRbMV07XG5cbiAgICAgIHZhciBpdGVtcyA9IFtdO1xuXG4gICAgICBpZiAoaXRlbUNvdW50ID4gMCkge1xuICAgICAgICBmb3IgKHZhciBfaW5kZXggPSBzdGFydEluZGV4OyBfaW5kZXggPD0gc3RvcEluZGV4OyBfaW5kZXgrKykge1xuICAgICAgICAgIGl0ZW1zLnB1c2goY3JlYXRlRWxlbWVudChjaGlsZHJlbiwge1xuICAgICAgICAgICAgZGF0YTogaXRlbURhdGEsXG4gICAgICAgICAgICBrZXk6IGl0ZW1LZXkoX2luZGV4LCBpdGVtRGF0YSksXG4gICAgICAgICAgICBpbmRleDogX2luZGV4LFxuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHVzZUlzU2Nyb2xsaW5nID8gaXNTY3JvbGxpbmcgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdHlsZTogdGhpcy5fZ2V0SXRlbVN0eWxlKF9pbmRleClcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gUmVhZCB0aGlzIHZhbHVlIEFGVEVSIGl0ZW1zIGhhdmUgYmVlbiBjcmVhdGVkLFxuICAgICAgLy8gU28gdGhlaXIgYWN0dWFsIHNpemVzIChpZiB2YXJpYWJsZSkgYXJlIHRha2VuIGludG8gY29uc2lkZXJhdGlvbi5cblxuXG4gICAgICB2YXIgZXN0aW1hdGVkVG90YWxTaXplID0gZ2V0RXN0aW1hdGVkVG90YWxTaXplKHRoaXMucHJvcHMsIHRoaXMuX2luc3RhbmNlUHJvcHMpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQob3V0ZXJFbGVtZW50VHlwZSB8fCBvdXRlclRhZ05hbWUgfHwgJ2RpdicsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgIG9uU2Nyb2xsOiBvblNjcm9sbCxcbiAgICAgICAgcmVmOiB0aGlzLl9vdXRlclJlZlNldHRlcixcbiAgICAgICAgc3R5bGU6IF9leHRlbmRzKHtcbiAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgb3ZlcmZsb3c6ICdhdXRvJyxcbiAgICAgICAgICBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogJ3RvdWNoJyxcbiAgICAgICAgICB3aWxsQ2hhbmdlOiAndHJhbnNmb3JtJyxcbiAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgICAgICB9LCBzdHlsZSlcbiAgICAgIH0sIGNyZWF0ZUVsZW1lbnQoaW5uZXJFbGVtZW50VHlwZSB8fCBpbm5lclRhZ05hbWUgfHwgJ2RpdicsIHtcbiAgICAgICAgY2hpbGRyZW46IGl0ZW1zLFxuICAgICAgICByZWY6IGlubmVyUmVmLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGhlaWdodDogaXNIb3Jpem9udGFsID8gJzEwMCUnIDogZXN0aW1hdGVkVG90YWxTaXplLFxuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IGlzU2Nyb2xsaW5nID8gJ25vbmUnIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHdpZHRoOiBpc0hvcml6b250YWwgPyBlc3RpbWF0ZWRUb3RhbFNpemUgOiAnMTAwJSdcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBfcHJvdG8uX2NhbGxQcm9wc0NhbGxiYWNrcyA9IGZ1bmN0aW9uIF9jYWxsUHJvcHNDYWxsYmFja3MoKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25JdGVtc1JlbmRlcmVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBpdGVtQ291bnQgPSB0aGlzLnByb3BzLml0ZW1Db3VudDtcblxuICAgICAgICBpZiAoaXRlbUNvdW50ID4gMCkge1xuICAgICAgICAgIHZhciBfdGhpcyRfZ2V0UmFuZ2VUb1JlbmQyID0gdGhpcy5fZ2V0UmFuZ2VUb1JlbmRlcigpLFxuICAgICAgICAgICAgICBfb3ZlcnNjYW5TdGFydEluZGV4ID0gX3RoaXMkX2dldFJhbmdlVG9SZW5kMlswXSxcbiAgICAgICAgICAgICAgX292ZXJzY2FuU3RvcEluZGV4ID0gX3RoaXMkX2dldFJhbmdlVG9SZW5kMlsxXSxcbiAgICAgICAgICAgICAgX3Zpc2libGVTdGFydEluZGV4ID0gX3RoaXMkX2dldFJhbmdlVG9SZW5kMlsyXSxcbiAgICAgICAgICAgICAgX3Zpc2libGVTdG9wSW5kZXggPSBfdGhpcyRfZ2V0UmFuZ2VUb1JlbmQyWzNdO1xuXG4gICAgICAgICAgdGhpcy5fY2FsbE9uSXRlbXNSZW5kZXJlZChfb3ZlcnNjYW5TdGFydEluZGV4LCBfb3ZlcnNjYW5TdG9wSW5kZXgsIF92aXNpYmxlU3RhcnRJbmRleCwgX3Zpc2libGVTdG9wSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vblNjcm9sbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgX3RoaXMkc3RhdGUyID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIF9zY3JvbGxEaXJlY3Rpb24gPSBfdGhpcyRzdGF0ZTIuc2Nyb2xsRGlyZWN0aW9uLFxuICAgICAgICAgICAgX3Njcm9sbE9mZnNldCA9IF90aGlzJHN0YXRlMi5zY3JvbGxPZmZzZXQsXG4gICAgICAgICAgICBfc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkID0gX3RoaXMkc3RhdGUyLnNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZDtcblxuICAgICAgICB0aGlzLl9jYWxsT25TY3JvbGwoX3Njcm9sbERpcmVjdGlvbiwgX3Njcm9sbE9mZnNldCwgX3Njcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCk7XG4gICAgICB9XG4gICAgfTsgLy8gTGF6aWx5IGNyZWF0ZSBhbmQgY2FjaGUgaXRlbSBzdHlsZXMgd2hpbGUgc2Nyb2xsaW5nLFxuICAgIC8vIFNvIHRoYXQgcHVyZSBjb21wb25lbnQgc0NVIHdpbGwgcHJldmVudCByZS1yZW5kZXJzLlxuICAgIC8vIFdlIG1haW50YWluIHRoaXMgY2FjaGUsIGFuZCBwYXNzIGEgc3R5bGUgcHJvcCByYXRoZXIgdGhhbiBpbmRleCxcbiAgICAvLyBTbyB0aGF0IExpc3QgY2FuIGNsZWFyIGNhY2hlZCBzdHlsZXMgYW5kIGZvcmNlIGl0ZW0gcmUtcmVuZGVyIGlmIG5lY2Vzc2FyeS5cblxuXG4gICAgX3Byb3RvLl9nZXRSYW5nZVRvUmVuZGVyID0gZnVuY3Rpb24gX2dldFJhbmdlVG9SZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHM1ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBpdGVtQ291bnQgPSBfdGhpcyRwcm9wczUuaXRlbUNvdW50LFxuICAgICAgICAgIG92ZXJzY2FuQ291bnQgPSBfdGhpcyRwcm9wczUub3ZlcnNjYW5Db3VudDtcbiAgICAgIHZhciBfdGhpcyRzdGF0ZTMgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIGlzU2Nyb2xsaW5nID0gX3RoaXMkc3RhdGUzLmlzU2Nyb2xsaW5nLFxuICAgICAgICAgIHNjcm9sbERpcmVjdGlvbiA9IF90aGlzJHN0YXRlMy5zY3JvbGxEaXJlY3Rpb24sXG4gICAgICAgICAgc2Nyb2xsT2Zmc2V0ID0gX3RoaXMkc3RhdGUzLnNjcm9sbE9mZnNldDtcblxuICAgICAgaWYgKGl0ZW1Db3VudCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gWzAsIDAsIDAsIDBdO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhcnRJbmRleCA9IGdldFN0YXJ0SW5kZXhGb3JPZmZzZXQodGhpcy5wcm9wcywgc2Nyb2xsT2Zmc2V0LCB0aGlzLl9pbnN0YW5jZVByb3BzKTtcbiAgICAgIHZhciBzdG9wSW5kZXggPSBnZXRTdG9wSW5kZXhGb3JTdGFydEluZGV4KHRoaXMucHJvcHMsIHN0YXJ0SW5kZXgsIHNjcm9sbE9mZnNldCwgdGhpcy5faW5zdGFuY2VQcm9wcyk7IC8vIE92ZXJzY2FuIGJ5IG9uZSBpdGVtIGluIGVhY2ggZGlyZWN0aW9uIHNvIHRoYXQgdGFiL2ZvY3VzIHdvcmtzLlxuICAgICAgLy8gSWYgdGhlcmUgaXNuJ3QgYXQgbGVhc3Qgb25lIGV4dHJhIGl0ZW0sIHRhYiBsb29wcyBiYWNrIGFyb3VuZC5cblxuICAgICAgdmFyIG92ZXJzY2FuQmFja3dhcmQgPSAhaXNTY3JvbGxpbmcgfHwgc2Nyb2xsRGlyZWN0aW9uID09PSAnYmFja3dhcmQnID8gTWF0aC5tYXgoMSwgb3ZlcnNjYW5Db3VudCkgOiAxO1xuICAgICAgdmFyIG92ZXJzY2FuRm9yd2FyZCA9ICFpc1Njcm9sbGluZyB8fCBzY3JvbGxEaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IE1hdGgubWF4KDEsIG92ZXJzY2FuQ291bnQpIDogMTtcbiAgICAgIHJldHVybiBbTWF0aC5tYXgoMCwgc3RhcnRJbmRleCAtIG92ZXJzY2FuQmFja3dhcmQpLCBNYXRoLm1heCgwLCBNYXRoLm1pbihpdGVtQ291bnQgLSAxLCBzdG9wSW5kZXggKyBvdmVyc2NhbkZvcndhcmQpKSwgc3RhcnRJbmRleCwgc3RvcEluZGV4XTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIExpc3Q7XG4gIH0oUHVyZUNvbXBvbmVudCksIF9jbGFzcy5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZGlyZWN0aW9uOiAnbHRyJyxcbiAgICBpdGVtRGF0YTogdW5kZWZpbmVkLFxuICAgIGxheW91dDogJ3ZlcnRpY2FsJyxcbiAgICBvdmVyc2NhbkNvdW50OiAyLFxuICAgIHVzZUlzU2Nyb2xsaW5nOiBmYWxzZVxuICB9LCBfdGVtcDtcbn0gLy8gTk9URTogSSBjb25zaWRlcmVkIGZ1cnRoZXIgd3JhcHBpbmcgaW5kaXZpZHVhbCBpdGVtcyB3aXRoIGEgcHVyZSBMaXN0SXRlbSBjb21wb25lbnQuXG4vLyBUaGlzIHdvdWxkIGF2b2lkIGV2ZXIgY2FsbGluZyB0aGUgcmVuZGVyIGZ1bmN0aW9uIGZvciB0aGUgc2FtZSBpbmRleCBtb3JlIHRoYW4gb25jZSxcbi8vIEJ1dCBpdCB3b3VsZCBhbHNvIGFkZCB0aGUgb3ZlcmhlYWQgb2YgYSBsb3Qgb2YgY29tcG9uZW50cy9maWJlcnMuXG4vLyBJIGFzc3VtZSBwZW9wbGUgYWxyZWFkeSBkbyB0aGlzIChyZW5kZXIgZnVuY3Rpb24gcmV0dXJuaW5nIGEgY2xhc3MgY29tcG9uZW50KSxcbi8vIFNvIG15IGRvaW5nIGl0IHdvdWxkIGp1c3QgdW5uZWNlc3NhcmlseSBkb3VibGUgdGhlIHdyYXBwZXJzLlxuXG52YXIgdmFsaWRhdGVTaGFyZWRQcm9wcyQxID0gZnVuY3Rpb24gdmFsaWRhdGVTaGFyZWRQcm9wcyhfcmVmMiwgX3JlZjMpIHtcbiAgdmFyIGNoaWxkcmVuID0gX3JlZjIuY2hpbGRyZW4sXG4gICAgICBkaXJlY3Rpb24gPSBfcmVmMi5kaXJlY3Rpb24sXG4gICAgICBoZWlnaHQgPSBfcmVmMi5oZWlnaHQsXG4gICAgICBsYXlvdXQgPSBfcmVmMi5sYXlvdXQsXG4gICAgICBpbm5lclRhZ05hbWUgPSBfcmVmMi5pbm5lclRhZ05hbWUsXG4gICAgICBvdXRlclRhZ05hbWUgPSBfcmVmMi5vdXRlclRhZ05hbWUsXG4gICAgICB3aWR0aCA9IF9yZWYyLndpZHRoO1xuICB2YXIgaW5zdGFuY2UgPSBfcmVmMy5pbnN0YW5jZTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChpbm5lclRhZ05hbWUgIT0gbnVsbCB8fCBvdXRlclRhZ05hbWUgIT0gbnVsbCkge1xuICAgICAgaWYgKGRldldhcm5pbmdzVGFnTmFtZSQxICYmICFkZXZXYXJuaW5nc1RhZ05hbWUkMS5oYXMoaW5zdGFuY2UpKSB7XG4gICAgICAgIGRldldhcm5pbmdzVGFnTmFtZSQxLmFkZChpbnN0YW5jZSk7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGlubmVyVGFnTmFtZSBhbmQgb3V0ZXJUYWdOYW1lIHByb3BzIGhhdmUgYmVlbiBkZXByZWNhdGVkLiAnICsgJ1BsZWFzZSB1c2UgdGhlIGlubmVyRWxlbWVudFR5cGUgYW5kIG91dGVyRWxlbWVudFR5cGUgcHJvcHMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICB9IC8vIFRPRE8gRGVwcmVjYXRlIGRpcmVjdGlvbiBcImhvcml6b250YWxcIlxuXG5cbiAgICB2YXIgaXNIb3Jpem9udGFsID0gZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgfHwgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCc7XG5cbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSAnaG9yaXpvbnRhbCc6XG4gICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgIGlmIChkZXZXYXJuaW5nc0RpcmVjdGlvbiAmJiAhZGV2V2FybmluZ3NEaXJlY3Rpb24uaGFzKGluc3RhbmNlKSkge1xuICAgICAgICAgIGRldldhcm5pbmdzRGlyZWN0aW9uLmFkZChpbnN0YW5jZSk7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgZGlyZWN0aW9uIHByb3Agc2hvdWxkIGJlIGVpdGhlciBcImx0clwiIChkZWZhdWx0KSBvciBcInJ0bFwiLiAnICsgJ1BsZWFzZSB1c2UgdGhlIGxheW91dCBwcm9wIHRvIHNwZWNpZnkgXCJ2ZXJ0aWNhbFwiIChkZWZhdWx0KSBvciBcImhvcml6b250YWxcIiBvcmllbnRhdGlvbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdsdHInOlxuICAgICAgY2FzZSAncnRsJzpcbiAgICAgICAgLy8gVmFsaWQgdmFsdWVzXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcImRpcmVjdGlvblwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ1ZhbHVlIHNob3VsZCBiZSBlaXRoZXIgXCJsdHJcIiBvciBcInJ0bFwiLiAnICsgKFwiXFxcIlwiICsgZGlyZWN0aW9uICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGxheW91dCkge1xuICAgICAgY2FzZSAnaG9yaXpvbnRhbCc6XG4gICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgIC8vIFZhbGlkIHZhbHVlc1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0FuIGludmFsaWQgXCJsYXlvdXRcIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgZWl0aGVyIFwiaG9yaXpvbnRhbFwiIG9yIFwidmVydGljYWxcIi4gJyArIChcIlxcXCJcIiArIGxheW91dCArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwiY2hpbGRyZW5cIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgYSBSZWFjdCBjb21wb25lbnQuICcgKyAoXCJcXFwiXCIgKyAoY2hpbGRyZW4gPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY2hpbGRyZW4pICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICB9XG5cbiAgICBpZiAoaXNIb3Jpem9udGFsICYmIHR5cGVvZiB3aWR0aCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwid2lkdGhcIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdIb3Jpem9udGFsIGxpc3RzIG11c3Qgc3BlY2lmeSBhIG51bWJlciBmb3Igd2lkdGguICcgKyAoXCJcXFwiXCIgKyAod2lkdGggPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2Ygd2lkdGgpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwgJiYgdHlwZW9mIGhlaWdodCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwiaGVpZ2h0XCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnVmVydGljYWwgbGlzdHMgbXVzdCBzcGVjaWZ5IGEgbnVtYmVyIGZvciBoZWlnaHQuICcgKyAoXCJcXFwiXCIgKyAoaGVpZ2h0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGhlaWdodCkgKyBcIlxcXCIgd2FzIHNwZWNpZmllZC5cIikpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIERFRkFVTFRfRVNUSU1BVEVEX0lURU1fU0laRSQxID0gNTA7XG5cbnZhciBnZXRJdGVtTWV0YWRhdGEkMSA9IGZ1bmN0aW9uIGdldEl0ZW1NZXRhZGF0YShwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpIHtcbiAgdmFyIF9yZWYgPSBwcm9wcyxcbiAgICAgIGl0ZW1TaXplID0gX3JlZi5pdGVtU2l6ZTtcbiAgdmFyIGl0ZW1NZXRhZGF0YU1hcCA9IGluc3RhbmNlUHJvcHMuaXRlbU1ldGFkYXRhTWFwLFxuICAgICAgbGFzdE1lYXN1cmVkSW5kZXggPSBpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZEluZGV4O1xuXG4gIGlmIChpbmRleCA+IGxhc3RNZWFzdXJlZEluZGV4KSB7XG4gICAgdmFyIG9mZnNldCA9IDA7XG5cbiAgICBpZiAobGFzdE1lYXN1cmVkSW5kZXggPj0gMCkge1xuICAgICAgdmFyIGl0ZW1NZXRhZGF0YSA9IGl0ZW1NZXRhZGF0YU1hcFtsYXN0TWVhc3VyZWRJbmRleF07XG4gICAgICBvZmZzZXQgPSBpdGVtTWV0YWRhdGEub2Zmc2V0ICsgaXRlbU1ldGFkYXRhLnNpemU7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IGxhc3RNZWFzdXJlZEluZGV4ICsgMTsgaSA8PSBpbmRleDsgaSsrKSB7XG4gICAgICB2YXIgc2l6ZSA9IGl0ZW1TaXplKGkpO1xuICAgICAgaXRlbU1ldGFkYXRhTWFwW2ldID0ge1xuICAgICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgc2l6ZTogc2l6ZVxuICAgICAgfTtcbiAgICAgIG9mZnNldCArPSBzaXplO1xuICAgIH1cblxuICAgIGluc3RhbmNlUHJvcHMubGFzdE1lYXN1cmVkSW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIHJldHVybiBpdGVtTWV0YWRhdGFNYXBbaW5kZXhdO1xufTtcblxudmFyIGZpbmROZWFyZXN0SXRlbSQxID0gZnVuY3Rpb24gZmluZE5lYXJlc3RJdGVtKHByb3BzLCBpbnN0YW5jZVByb3BzLCBvZmZzZXQpIHtcbiAgdmFyIGl0ZW1NZXRhZGF0YU1hcCA9IGluc3RhbmNlUHJvcHMuaXRlbU1ldGFkYXRhTWFwLFxuICAgICAgbGFzdE1lYXN1cmVkSW5kZXggPSBpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZEluZGV4O1xuICB2YXIgbGFzdE1lYXN1cmVkSXRlbU9mZnNldCA9IGxhc3RNZWFzdXJlZEluZGV4ID4gMCA/IGl0ZW1NZXRhZGF0YU1hcFtsYXN0TWVhc3VyZWRJbmRleF0ub2Zmc2V0IDogMDtcblxuICBpZiAobGFzdE1lYXN1cmVkSXRlbU9mZnNldCA+PSBvZmZzZXQpIHtcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IG1lYXN1cmVkIGl0ZW1zIHdpdGhpbiB0aGlzIHJhbmdlIGp1c3QgdXNlIGEgYmluYXJ5IHNlYXJjaCBhcyBpdCdzIGZhc3Rlci5cbiAgICByZXR1cm4gZmluZE5lYXJlc3RJdGVtQmluYXJ5U2VhcmNoJDEocHJvcHMsIGluc3RhbmNlUHJvcHMsIGxhc3RNZWFzdXJlZEluZGV4LCAwLCBvZmZzZXQpO1xuICB9IGVsc2Uge1xuICAgIC8vIElmIHdlIGhhdmVuJ3QgeWV0IG1lYXN1cmVkIHRoaXMgaGlnaCwgZmFsbGJhY2sgdG8gYW4gZXhwb25lbnRpYWwgc2VhcmNoIHdpdGggYW4gaW5uZXIgYmluYXJ5IHNlYXJjaC5cbiAgICAvLyBUaGUgZXhwb25lbnRpYWwgc2VhcmNoIGF2b2lkcyBwcmUtY29tcHV0aW5nIHNpemVzIGZvciB0aGUgZnVsbCBzZXQgb2YgaXRlbXMgYXMgYSBiaW5hcnkgc2VhcmNoIHdvdWxkLlxuICAgIC8vIFRoZSBvdmVyYWxsIGNvbXBsZXhpdHkgZm9yIHRoaXMgYXBwcm9hY2ggaXMgTyhsb2cgbikuXG4gICAgcmV0dXJuIGZpbmROZWFyZXN0SXRlbUV4cG9uZW50aWFsU2VhcmNoJDEocHJvcHMsIGluc3RhbmNlUHJvcHMsIE1hdGgubWF4KDAsIGxhc3RNZWFzdXJlZEluZGV4KSwgb2Zmc2V0KTtcbiAgfVxufTtcblxudmFyIGZpbmROZWFyZXN0SXRlbUJpbmFyeVNlYXJjaCQxID0gZnVuY3Rpb24gZmluZE5lYXJlc3RJdGVtQmluYXJ5U2VhcmNoKHByb3BzLCBpbnN0YW5jZVByb3BzLCBoaWdoLCBsb3csIG9mZnNldCkge1xuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcbiAgICB2YXIgbWlkZGxlID0gbG93ICsgTWF0aC5mbG9vcigoaGlnaCAtIGxvdykgLyAyKTtcbiAgICB2YXIgY3VycmVudE9mZnNldCA9IGdldEl0ZW1NZXRhZGF0YSQxKHByb3BzLCBtaWRkbGUsIGluc3RhbmNlUHJvcHMpLm9mZnNldDtcblxuICAgIGlmIChjdXJyZW50T2Zmc2V0ID09PSBvZmZzZXQpIHtcbiAgICAgIHJldHVybiBtaWRkbGU7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50T2Zmc2V0IDwgb2Zmc2V0KSB7XG4gICAgICBsb3cgPSBtaWRkbGUgKyAxO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudE9mZnNldCA+IG9mZnNldCkge1xuICAgICAgaGlnaCA9IG1pZGRsZSAtIDE7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxvdyA+IDApIHtcbiAgICByZXR1cm4gbG93IC0gMTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufTtcblxudmFyIGZpbmROZWFyZXN0SXRlbUV4cG9uZW50aWFsU2VhcmNoJDEgPSBmdW5jdGlvbiBmaW5kTmVhcmVzdEl0ZW1FeHBvbmVudGlhbFNlYXJjaChwcm9wcywgaW5zdGFuY2VQcm9wcywgaW5kZXgsIG9mZnNldCkge1xuICB2YXIgaXRlbUNvdW50ID0gcHJvcHMuaXRlbUNvdW50O1xuICB2YXIgaW50ZXJ2YWwgPSAxO1xuXG4gIHdoaWxlIChpbmRleCA8IGl0ZW1Db3VudCAmJiBnZXRJdGVtTWV0YWRhdGEkMShwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpLm9mZnNldCA8IG9mZnNldCkge1xuICAgIGluZGV4ICs9IGludGVydmFsO1xuICAgIGludGVydmFsICo9IDI7XG4gIH1cblxuICByZXR1cm4gZmluZE5lYXJlc3RJdGVtQmluYXJ5U2VhcmNoJDEocHJvcHMsIGluc3RhbmNlUHJvcHMsIE1hdGgubWluKGluZGV4LCBpdGVtQ291bnQgLSAxKSwgTWF0aC5mbG9vcihpbmRleCAvIDIpLCBvZmZzZXQpO1xufTtcblxudmFyIGdldEVzdGltYXRlZFRvdGFsU2l6ZSA9IGZ1bmN0aW9uIGdldEVzdGltYXRlZFRvdGFsU2l6ZShfcmVmMiwgX3JlZjMpIHtcbiAgdmFyIGl0ZW1Db3VudCA9IF9yZWYyLml0ZW1Db3VudDtcbiAgdmFyIGl0ZW1NZXRhZGF0YU1hcCA9IF9yZWYzLml0ZW1NZXRhZGF0YU1hcCxcbiAgICAgIGVzdGltYXRlZEl0ZW1TaXplID0gX3JlZjMuZXN0aW1hdGVkSXRlbVNpemUsXG4gICAgICBsYXN0TWVhc3VyZWRJbmRleCA9IF9yZWYzLmxhc3RNZWFzdXJlZEluZGV4O1xuICB2YXIgdG90YWxTaXplT2ZNZWFzdXJlZEl0ZW1zID0gMDsgLy8gRWRnZSBjYXNlIGNoZWNrIGZvciB3aGVuIHRoZSBudW1iZXIgb2YgaXRlbXMgZGVjcmVhc2VzIHdoaWxlIGEgc2Nyb2xsIGlzIGluIHByb2dyZXNzLlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC13aW5kb3cvcHVsbC8xMzhcblxuICBpZiAobGFzdE1lYXN1cmVkSW5kZXggPj0gaXRlbUNvdW50KSB7XG4gICAgbGFzdE1lYXN1cmVkSW5kZXggPSBpdGVtQ291bnQgLSAxO1xuICB9XG5cbiAgaWYgKGxhc3RNZWFzdXJlZEluZGV4ID49IDApIHtcbiAgICB2YXIgaXRlbU1ldGFkYXRhID0gaXRlbU1ldGFkYXRhTWFwW2xhc3RNZWFzdXJlZEluZGV4XTtcbiAgICB0b3RhbFNpemVPZk1lYXN1cmVkSXRlbXMgPSBpdGVtTWV0YWRhdGEub2Zmc2V0ICsgaXRlbU1ldGFkYXRhLnNpemU7XG4gIH1cblxuICB2YXIgbnVtVW5tZWFzdXJlZEl0ZW1zID0gaXRlbUNvdW50IC0gbGFzdE1lYXN1cmVkSW5kZXggLSAxO1xuICB2YXIgdG90YWxTaXplT2ZVbm1lYXN1cmVkSXRlbXMgPSBudW1Vbm1lYXN1cmVkSXRlbXMgKiBlc3RpbWF0ZWRJdGVtU2l6ZTtcbiAgcmV0dXJuIHRvdGFsU2l6ZU9mTWVhc3VyZWRJdGVtcyArIHRvdGFsU2l6ZU9mVW5tZWFzdXJlZEl0ZW1zO1xufTtcblxudmFyIFZhcmlhYmxlU2l6ZUxpc3QgPVxuLyojX19QVVJFX18qL1xuY3JlYXRlTGlzdENvbXBvbmVudCh7XG4gIGdldEl0ZW1PZmZzZXQ6IGZ1bmN0aW9uIGdldEl0ZW1PZmZzZXQocHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKSB7XG4gICAgcmV0dXJuIGdldEl0ZW1NZXRhZGF0YSQxKHByb3BzLCBpbmRleCwgaW5zdGFuY2VQcm9wcykub2Zmc2V0O1xuICB9LFxuICBnZXRJdGVtU2l6ZTogZnVuY3Rpb24gZ2V0SXRlbVNpemUocHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlUHJvcHMuaXRlbU1ldGFkYXRhTWFwW2luZGV4XS5zaXplO1xuICB9LFxuICBnZXRFc3RpbWF0ZWRUb3RhbFNpemU6IGdldEVzdGltYXRlZFRvdGFsU2l6ZSxcbiAgZ2V0T2Zmc2V0Rm9ySW5kZXhBbmRBbGlnbm1lbnQ6IGZ1bmN0aW9uIGdldE9mZnNldEZvckluZGV4QW5kQWxpZ25tZW50KHByb3BzLCBpbmRleCwgYWxpZ24sIHNjcm9sbE9mZnNldCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHZhciBkaXJlY3Rpb24gPSBwcm9wcy5kaXJlY3Rpb24sXG4gICAgICAgIGhlaWdodCA9IHByb3BzLmhlaWdodCxcbiAgICAgICAgbGF5b3V0ID0gcHJvcHMubGF5b3V0LFxuICAgICAgICB3aWR0aCA9IHByb3BzLndpZHRoOyAvLyBUT0RPIERlcHJlY2F0ZSBkaXJlY3Rpb24gXCJob3Jpem9udGFsXCJcblxuICAgIHZhciBpc0hvcml6b250YWwgPSBkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyB8fCBsYXlvdXQgPT09ICdob3Jpem9udGFsJztcbiAgICB2YXIgc2l6ZSA9IGlzSG9yaXpvbnRhbCA/IHdpZHRoIDogaGVpZ2h0O1xuICAgIHZhciBpdGVtTWV0YWRhdGEgPSBnZXRJdGVtTWV0YWRhdGEkMShwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpOyAvLyBHZXQgZXN0aW1hdGVkIHRvdGFsIHNpemUgYWZ0ZXIgSXRlbU1ldGFkYXRhIGlzIGNvbXB1dGVkLFxuICAgIC8vIFRvIGVuc3VyZSBpdCByZWZsZWN0cyBhY3R1YWwgbWVhc3VyZW1lbnRzIGluc3RlYWQgb2YganVzdCBlc3RpbWF0ZXMuXG5cbiAgICB2YXIgZXN0aW1hdGVkVG90YWxTaXplID0gZ2V0RXN0aW1hdGVkVG90YWxTaXplKHByb3BzLCBpbnN0YW5jZVByb3BzKTtcbiAgICB2YXIgbWF4T2Zmc2V0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZXN0aW1hdGVkVG90YWxTaXplIC0gc2l6ZSwgaXRlbU1ldGFkYXRhLm9mZnNldCkpO1xuICAgIHZhciBtaW5PZmZzZXQgPSBNYXRoLm1heCgwLCBpdGVtTWV0YWRhdGEub2Zmc2V0IC0gc2l6ZSArIGl0ZW1NZXRhZGF0YS5zaXplKTtcblxuICAgIGlmIChhbGlnbiA9PT0gJ3NtYXJ0Jykge1xuICAgICAgaWYgKHNjcm9sbE9mZnNldCA+PSBtaW5PZmZzZXQgLSBzaXplICYmIHNjcm9sbE9mZnNldCA8PSBtYXhPZmZzZXQgKyBzaXplKSB7XG4gICAgICAgIGFsaWduID0gJ2F1dG8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxpZ24gPSAnY2VudGVyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2l0Y2ggKGFsaWduKSB7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgIHJldHVybiBtYXhPZmZzZXQ7XG5cbiAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG5cbiAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG1pbk9mZnNldCArIChtYXhPZmZzZXQgLSBtaW5PZmZzZXQpIC8gMik7XG5cbiAgICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHNjcm9sbE9mZnNldCA+PSBtaW5PZmZzZXQgJiYgc2Nyb2xsT2Zmc2V0IDw9IG1heE9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBzY3JvbGxPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsT2Zmc2V0IDwgbWluT2Zmc2V0KSB7XG4gICAgICAgICAgcmV0dXJuIG1pbk9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbWF4T2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICB9XG4gIH0sXG4gIGdldFN0YXJ0SW5kZXhGb3JPZmZzZXQ6IGZ1bmN0aW9uIGdldFN0YXJ0SW5kZXhGb3JPZmZzZXQocHJvcHMsIG9mZnNldCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHJldHVybiBmaW5kTmVhcmVzdEl0ZW0kMShwcm9wcywgaW5zdGFuY2VQcm9wcywgb2Zmc2V0KTtcbiAgfSxcbiAgZ2V0U3RvcEluZGV4Rm9yU3RhcnRJbmRleDogZnVuY3Rpb24gZ2V0U3RvcEluZGV4Rm9yU3RhcnRJbmRleChwcm9wcywgc3RhcnRJbmRleCwgc2Nyb2xsT2Zmc2V0LCBpbnN0YW5jZVByb3BzKSB7XG4gICAgdmFyIGRpcmVjdGlvbiA9IHByb3BzLmRpcmVjdGlvbixcbiAgICAgICAgaGVpZ2h0ID0gcHJvcHMuaGVpZ2h0LFxuICAgICAgICBpdGVtQ291bnQgPSBwcm9wcy5pdGVtQ291bnQsXG4gICAgICAgIGxheW91dCA9IHByb3BzLmxheW91dCxcbiAgICAgICAgd2lkdGggPSBwcm9wcy53aWR0aDsgLy8gVE9ETyBEZXByZWNhdGUgZGlyZWN0aW9uIFwiaG9yaXpvbnRhbFwiXG5cbiAgICB2YXIgaXNIb3Jpem9udGFsID0gZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgfHwgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCc7XG4gICAgdmFyIHNpemUgPSBpc0hvcml6b250YWwgPyB3aWR0aCA6IGhlaWdodDtcbiAgICB2YXIgaXRlbU1ldGFkYXRhID0gZ2V0SXRlbU1ldGFkYXRhJDEocHJvcHMsIHN0YXJ0SW5kZXgsIGluc3RhbmNlUHJvcHMpO1xuICAgIHZhciBtYXhPZmZzZXQgPSBzY3JvbGxPZmZzZXQgKyBzaXplO1xuICAgIHZhciBvZmZzZXQgPSBpdGVtTWV0YWRhdGEub2Zmc2V0ICsgaXRlbU1ldGFkYXRhLnNpemU7XG4gICAgdmFyIHN0b3BJbmRleCA9IHN0YXJ0SW5kZXg7XG5cbiAgICB3aGlsZSAoc3RvcEluZGV4IDwgaXRlbUNvdW50IC0gMSAmJiBvZmZzZXQgPCBtYXhPZmZzZXQpIHtcbiAgICAgIHN0b3BJbmRleCsrO1xuICAgICAgb2Zmc2V0ICs9IGdldEl0ZW1NZXRhZGF0YSQxKHByb3BzLCBzdG9wSW5kZXgsIGluc3RhbmNlUHJvcHMpLnNpemU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0b3BJbmRleDtcbiAgfSxcbiAgaW5pdEluc3RhbmNlUHJvcHM6IGZ1bmN0aW9uIGluaXRJbnN0YW5jZVByb3BzKHByb3BzLCBpbnN0YW5jZSkge1xuICAgIHZhciBfcmVmNCA9IHByb3BzLFxuICAgICAgICBlc3RpbWF0ZWRJdGVtU2l6ZSA9IF9yZWY0LmVzdGltYXRlZEl0ZW1TaXplO1xuICAgIHZhciBpbnN0YW5jZVByb3BzID0ge1xuICAgICAgaXRlbU1ldGFkYXRhTWFwOiB7fSxcbiAgICAgIGVzdGltYXRlZEl0ZW1TaXplOiBlc3RpbWF0ZWRJdGVtU2l6ZSB8fCBERUZBVUxUX0VTVElNQVRFRF9JVEVNX1NJWkUkMSxcbiAgICAgIGxhc3RNZWFzdXJlZEluZGV4OiAtMVxuICAgIH07XG5cbiAgICBpbnN0YW5jZS5yZXNldEFmdGVySW5kZXggPSBmdW5jdGlvbiAoaW5kZXgsIHNob3VsZEZvcmNlVXBkYXRlKSB7XG4gICAgICBpZiAoc2hvdWxkRm9yY2VVcGRhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICBzaG91bGRGb3JjZVVwZGF0ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGluc3RhbmNlUHJvcHMubGFzdE1lYXN1cmVkSW5kZXggPSBNYXRoLm1pbihpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZEluZGV4LCBpbmRleCAtIDEpOyAvLyBXZSBjb3VsZCBwb3RlbnRpYWxseSBvcHRpbWl6ZSBmdXJ0aGVyIGJ5IG9ubHkgZXZpY3Rpbmcgc3R5bGVzIGFmdGVyIHRoaXMgaW5kZXgsXG4gICAgICAvLyBCdXQgc2luY2Ugc3R5bGVzIGFyZSBvbmx5IGNhY2hlZCB3aGlsZSBzY3JvbGxpbmcgaXMgaW4gcHJvZ3Jlc3MtXG4gICAgICAvLyBJdCBzZWVtcyBhbiB1bm5lY2Vzc2FyeSBvcHRpbWl6YXRpb24uXG4gICAgICAvLyBJdCdzIHVubGlrZWx5IHRoYXQgcmVzZXRBZnRlckluZGV4KCkgd2lsbCBiZSBjYWxsZWQgd2hpbGUgYSB1c2VyIGlzIHNjcm9sbGluZy5cblxuICAgICAgaW5zdGFuY2UuX2dldEl0ZW1TdHlsZUNhY2hlKC0xKTtcblxuICAgICAgaWYgKHNob3VsZEZvcmNlVXBkYXRlKSB7XG4gICAgICAgIGluc3RhbmNlLmZvcmNlVXBkYXRlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBpbnN0YW5jZVByb3BzO1xuICB9LFxuICBzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlOiBmYWxzZSxcbiAgdmFsaWRhdGVQcm9wczogZnVuY3Rpb24gdmFsaWRhdGVQcm9wcyhfcmVmNSkge1xuICAgIHZhciBpdGVtU2l6ZSA9IF9yZWY1Lml0ZW1TaXplO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbVNpemUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0FuIGludmFsaWQgXCJpdGVtU2l6ZVwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ1ZhbHVlIHNob3VsZCBiZSBhIGZ1bmN0aW9uLiAnICsgKFwiXFxcIlwiICsgKGl0ZW1TaXplID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGl0ZW1TaXplKSArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxudmFyIEZpeGVkU2l6ZUdyaWQgPVxuLyojX19QVVJFX18qL1xuY3JlYXRlR3JpZENvbXBvbmVudCh7XG4gIGdldENvbHVtbk9mZnNldDogZnVuY3Rpb24gZ2V0Q29sdW1uT2Zmc2V0KF9yZWYsIGluZGV4KSB7XG4gICAgdmFyIGNvbHVtbldpZHRoID0gX3JlZi5jb2x1bW5XaWR0aDtcbiAgICByZXR1cm4gaW5kZXggKiBjb2x1bW5XaWR0aDtcbiAgfSxcbiAgZ2V0Q29sdW1uV2lkdGg6IGZ1bmN0aW9uIGdldENvbHVtbldpZHRoKF9yZWYyLCBpbmRleCkge1xuICAgIHZhciBjb2x1bW5XaWR0aCA9IF9yZWYyLmNvbHVtbldpZHRoO1xuICAgIHJldHVybiBjb2x1bW5XaWR0aDtcbiAgfSxcbiAgZ2V0Um93T2Zmc2V0OiBmdW5jdGlvbiBnZXRSb3dPZmZzZXQoX3JlZjMsIGluZGV4KSB7XG4gICAgdmFyIHJvd0hlaWdodCA9IF9yZWYzLnJvd0hlaWdodDtcbiAgICByZXR1cm4gaW5kZXggKiByb3dIZWlnaHQ7XG4gIH0sXG4gIGdldFJvd0hlaWdodDogZnVuY3Rpb24gZ2V0Um93SGVpZ2h0KF9yZWY0LCBpbmRleCkge1xuICAgIHZhciByb3dIZWlnaHQgPSBfcmVmNC5yb3dIZWlnaHQ7XG4gICAgcmV0dXJuIHJvd0hlaWdodDtcbiAgfSxcbiAgZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQ6IGZ1bmN0aW9uIGdldEVzdGltYXRlZFRvdGFsSGVpZ2h0KF9yZWY1KSB7XG4gICAgdmFyIHJvd0NvdW50ID0gX3JlZjUucm93Q291bnQsXG4gICAgICAgIHJvd0hlaWdodCA9IF9yZWY1LnJvd0hlaWdodDtcbiAgICByZXR1cm4gcm93SGVpZ2h0ICogcm93Q291bnQ7XG4gIH0sXG4gIGdldEVzdGltYXRlZFRvdGFsV2lkdGg6IGZ1bmN0aW9uIGdldEVzdGltYXRlZFRvdGFsV2lkdGgoX3JlZjYpIHtcbiAgICB2YXIgY29sdW1uQ291bnQgPSBfcmVmNi5jb2x1bW5Db3VudCxcbiAgICAgICAgY29sdW1uV2lkdGggPSBfcmVmNi5jb2x1bW5XaWR0aDtcbiAgICByZXR1cm4gY29sdW1uV2lkdGggKiBjb2x1bW5Db3VudDtcbiAgfSxcbiAgZ2V0T2Zmc2V0Rm9yQ29sdW1uQW5kQWxpZ25tZW50OiBmdW5jdGlvbiBnZXRPZmZzZXRGb3JDb2x1bW5BbmRBbGlnbm1lbnQoX3JlZjcsIGNvbHVtbkluZGV4LCBhbGlnbiwgc2Nyb2xsTGVmdCwgaW5zdGFuY2VQcm9wcywgc2Nyb2xsYmFyU2l6ZSkge1xuICAgIHZhciBjb2x1bW5Db3VudCA9IF9yZWY3LmNvbHVtbkNvdW50LFxuICAgICAgICBjb2x1bW5XaWR0aCA9IF9yZWY3LmNvbHVtbldpZHRoLFxuICAgICAgICB3aWR0aCA9IF9yZWY3LndpZHRoO1xuICAgIHZhciBsYXN0Q29sdW1uT2Zmc2V0ID0gTWF0aC5tYXgoMCwgY29sdW1uQ291bnQgKiBjb2x1bW5XaWR0aCAtIHdpZHRoKTtcbiAgICB2YXIgbWF4T2Zmc2V0ID0gTWF0aC5taW4obGFzdENvbHVtbk9mZnNldCwgY29sdW1uSW5kZXggKiBjb2x1bW5XaWR0aCk7XG4gICAgdmFyIG1pbk9mZnNldCA9IE1hdGgubWF4KDAsIGNvbHVtbkluZGV4ICogY29sdW1uV2lkdGggLSB3aWR0aCArIHNjcm9sbGJhclNpemUgKyBjb2x1bW5XaWR0aCk7XG5cbiAgICBpZiAoYWxpZ24gPT09ICdzbWFydCcpIHtcbiAgICAgIGlmIChzY3JvbGxMZWZ0ID49IG1pbk9mZnNldCAtIHdpZHRoICYmIHNjcm9sbExlZnQgPD0gbWF4T2Zmc2V0ICsgd2lkdGgpIHtcbiAgICAgICAgYWxpZ24gPSAnYXV0byc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGlnbiA9ICdjZW50ZXInO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgcmV0dXJuIG1heE9mZnNldDtcblxuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgcmV0dXJuIG1pbk9mZnNldDtcblxuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgLy8gXCJDZW50ZXJlZFwiIG9mZnNldCBpcyB1c3VhbGx5IHRoZSBhdmVyYWdlIG9mIHRoZSBtaW4gYW5kIG1heC5cbiAgICAgICAgLy8gQnV0IG5lYXIgdGhlIGVkZ2VzIG9mIHRoZSBsaXN0LCB0aGlzIGRvZXNuJ3QgaG9sZCB0cnVlLlxuICAgICAgICB2YXIgbWlkZGxlT2Zmc2V0ID0gTWF0aC5yb3VuZChtaW5PZmZzZXQgKyAobWF4T2Zmc2V0IC0gbWluT2Zmc2V0KSAvIDIpO1xuXG4gICAgICAgIGlmIChtaWRkbGVPZmZzZXQgPCBNYXRoLmNlaWwod2lkdGggLyAyKSkge1xuICAgICAgICAgIHJldHVybiAwOyAvLyBuZWFyIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgfSBlbHNlIGlmIChtaWRkbGVPZmZzZXQgPiBsYXN0Q29sdW1uT2Zmc2V0ICsgTWF0aC5mbG9vcih3aWR0aCAvIDIpKSB7XG4gICAgICAgICAgcmV0dXJuIGxhc3RDb2x1bW5PZmZzZXQ7IC8vIG5lYXIgdGhlIGVuZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBtaWRkbGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSAnYXV0byc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoc2Nyb2xsTGVmdCA+PSBtaW5PZmZzZXQgJiYgc2Nyb2xsTGVmdCA8PSBtYXhPZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gc2Nyb2xsTGVmdDtcbiAgICAgICAgfSBlbHNlIGlmIChtaW5PZmZzZXQgPiBtYXhPZmZzZXQpIHtcbiAgICAgICAgICAvLyBCZWNhdXNlIHdlIG9ubHkgdGFrZSBpbnRvIGFjY291bnQgdGhlIHNjcm9sbGJhciBzaXplIHdoZW4gY2FsY3VsYXRpbmcgbWluT2Zmc2V0XG4gICAgICAgICAgLy8gdGhpcyB2YWx1ZSBjYW4gYmUgbGFyZ2VyIHRoYW4gbWF4T2Zmc2V0IHdoZW4gYXQgdGhlIGVuZCBvZiB0aGUgbGlzdFxuICAgICAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsTGVmdCA8IG1pbk9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG1heE9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgfVxuICB9LFxuICBnZXRPZmZzZXRGb3JSb3dBbmRBbGlnbm1lbnQ6IGZ1bmN0aW9uIGdldE9mZnNldEZvclJvd0FuZEFsaWdubWVudChfcmVmOCwgcm93SW5kZXgsIGFsaWduLCBzY3JvbGxUb3AsIGluc3RhbmNlUHJvcHMsIHNjcm9sbGJhclNpemUpIHtcbiAgICB2YXIgcm93SGVpZ2h0ID0gX3JlZjgucm93SGVpZ2h0LFxuICAgICAgICBoZWlnaHQgPSBfcmVmOC5oZWlnaHQsXG4gICAgICAgIHJvd0NvdW50ID0gX3JlZjgucm93Q291bnQ7XG4gICAgdmFyIGxhc3RSb3dPZmZzZXQgPSBNYXRoLm1heCgwLCByb3dDb3VudCAqIHJvd0hlaWdodCAtIGhlaWdodCk7XG4gICAgdmFyIG1heE9mZnNldCA9IE1hdGgubWluKGxhc3RSb3dPZmZzZXQsIHJvd0luZGV4ICogcm93SGVpZ2h0KTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gTWF0aC5tYXgoMCwgcm93SW5kZXggKiByb3dIZWlnaHQgLSBoZWlnaHQgKyBzY3JvbGxiYXJTaXplICsgcm93SGVpZ2h0KTtcblxuICAgIGlmIChhbGlnbiA9PT0gJ3NtYXJ0Jykge1xuICAgICAgaWYgKHNjcm9sbFRvcCA+PSBtaW5PZmZzZXQgLSBoZWlnaHQgJiYgc2Nyb2xsVG9wIDw9IG1heE9mZnNldCArIGhlaWdodCkge1xuICAgICAgICBhbGlnbiA9ICdhdXRvJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsaWduID0gJ2NlbnRlcic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICByZXR1cm4gbWF4T2Zmc2V0O1xuXG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuXG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAvLyBcIkNlbnRlcmVkXCIgb2Zmc2V0IGlzIHVzdWFsbHkgdGhlIGF2ZXJhZ2Ugb2YgdGhlIG1pbiBhbmQgbWF4LlxuICAgICAgICAvLyBCdXQgbmVhciB0aGUgZWRnZXMgb2YgdGhlIGxpc3QsIHRoaXMgZG9lc24ndCBob2xkIHRydWUuXG4gICAgICAgIHZhciBtaWRkbGVPZmZzZXQgPSBNYXRoLnJvdW5kKG1pbk9mZnNldCArIChtYXhPZmZzZXQgLSBtaW5PZmZzZXQpIC8gMik7XG5cbiAgICAgICAgaWYgKG1pZGRsZU9mZnNldCA8IE1hdGguY2VpbChoZWlnaHQgLyAyKSkge1xuICAgICAgICAgIHJldHVybiAwOyAvLyBuZWFyIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgfSBlbHNlIGlmIChtaWRkbGVPZmZzZXQgPiBsYXN0Um93T2Zmc2V0ICsgTWF0aC5mbG9vcihoZWlnaHQgLyAyKSkge1xuICAgICAgICAgIHJldHVybiBsYXN0Um93T2Zmc2V0OyAvLyBuZWFyIHRoZSBlbmRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbWlkZGxlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSBtaW5PZmZzZXQgJiYgc2Nyb2xsVG9wIDw9IG1heE9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBzY3JvbGxUb3A7XG4gICAgICAgIH0gZWxzZSBpZiAobWluT2Zmc2V0ID4gbWF4T2Zmc2V0KSB7XG4gICAgICAgICAgLy8gQmVjYXVzZSB3ZSBvbmx5IHRha2UgaW50byBhY2NvdW50IHRoZSBzY3JvbGxiYXIgc2l6ZSB3aGVuIGNhbGN1bGF0aW5nIG1pbk9mZnNldFxuICAgICAgICAgIC8vIHRoaXMgdmFsdWUgY2FuIGJlIGxhcmdlciB0aGFuIG1heE9mZnNldCB3aGVuIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbFRvcCA8IG1pbk9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG1heE9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgfVxuICB9LFxuICBnZXRDb2x1bW5TdGFydEluZGV4Rm9yT2Zmc2V0OiBmdW5jdGlvbiBnZXRDb2x1bW5TdGFydEluZGV4Rm9yT2Zmc2V0KF9yZWY5LCBzY3JvbGxMZWZ0KSB7XG4gICAgdmFyIGNvbHVtbldpZHRoID0gX3JlZjkuY29sdW1uV2lkdGgsXG4gICAgICAgIGNvbHVtbkNvdW50ID0gX3JlZjkuY29sdW1uQ291bnQ7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGNvbHVtbkNvdW50IC0gMSwgTWF0aC5mbG9vcihzY3JvbGxMZWZ0IC8gY29sdW1uV2lkdGgpKSk7XG4gIH0sXG4gIGdldENvbHVtblN0b3BJbmRleEZvclN0YXJ0SW5kZXg6IGZ1bmN0aW9uIGdldENvbHVtblN0b3BJbmRleEZvclN0YXJ0SW5kZXgoX3JlZjEwLCBzdGFydEluZGV4LCBzY3JvbGxMZWZ0KSB7XG4gICAgdmFyIGNvbHVtbldpZHRoID0gX3JlZjEwLmNvbHVtbldpZHRoLFxuICAgICAgICBjb2x1bW5Db3VudCA9IF9yZWYxMC5jb2x1bW5Db3VudCxcbiAgICAgICAgd2lkdGggPSBfcmVmMTAud2lkdGg7XG4gICAgdmFyIGxlZnQgPSBzdGFydEluZGV4ICogY29sdW1uV2lkdGg7XG4gICAgdmFyIG51bVZpc2libGVDb2x1bW5zID0gTWF0aC5jZWlsKCh3aWR0aCArIHNjcm9sbExlZnQgLSBsZWZ0KSAvIGNvbHVtbldpZHRoKTtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oY29sdW1uQ291bnQgLSAxLCBzdGFydEluZGV4ICsgbnVtVmlzaWJsZUNvbHVtbnMgLSAxIC8vIC0xIGlzIGJlY2F1c2Ugc3RvcCBpbmRleCBpcyBpbmNsdXNpdmVcbiAgICApKTtcbiAgfSxcbiAgZ2V0Um93U3RhcnRJbmRleEZvck9mZnNldDogZnVuY3Rpb24gZ2V0Um93U3RhcnRJbmRleEZvck9mZnNldChfcmVmMTEsIHNjcm9sbFRvcCkge1xuICAgIHZhciByb3dIZWlnaHQgPSBfcmVmMTEucm93SGVpZ2h0LFxuICAgICAgICByb3dDb3VudCA9IF9yZWYxMS5yb3dDb3VudDtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4ocm93Q291bnQgLSAxLCBNYXRoLmZsb29yKHNjcm9sbFRvcCAvIHJvd0hlaWdodCkpKTtcbiAgfSxcbiAgZ2V0Um93U3RvcEluZGV4Rm9yU3RhcnRJbmRleDogZnVuY3Rpb24gZ2V0Um93U3RvcEluZGV4Rm9yU3RhcnRJbmRleChfcmVmMTIsIHN0YXJ0SW5kZXgsIHNjcm9sbFRvcCkge1xuICAgIHZhciByb3dIZWlnaHQgPSBfcmVmMTIucm93SGVpZ2h0LFxuICAgICAgICByb3dDb3VudCA9IF9yZWYxMi5yb3dDb3VudCxcbiAgICAgICAgaGVpZ2h0ID0gX3JlZjEyLmhlaWdodDtcbiAgICB2YXIgdG9wID0gc3RhcnRJbmRleCAqIHJvd0hlaWdodDtcbiAgICB2YXIgbnVtVmlzaWJsZVJvd3MgPSBNYXRoLmNlaWwoKGhlaWdodCArIHNjcm9sbFRvcCAtIHRvcCkgLyByb3dIZWlnaHQpO1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihyb3dDb3VudCAtIDEsIHN0YXJ0SW5kZXggKyBudW1WaXNpYmxlUm93cyAtIDEgLy8gLTEgaXMgYmVjYXVzZSBzdG9wIGluZGV4IGlzIGluY2x1c2l2ZVxuICAgICkpO1xuICB9LFxuICBpbml0SW5zdGFuY2VQcm9wczogZnVuY3Rpb24gaW5pdEluc3RhbmNlUHJvcHMocHJvcHMpIHsvLyBOb29wXG4gIH0sXG4gIHNob3VsZFJlc2V0U3R5bGVDYWNoZU9uSXRlbVNpemVDaGFuZ2U6IHRydWUsXG4gIHZhbGlkYXRlUHJvcHM6IGZ1bmN0aW9uIHZhbGlkYXRlUHJvcHMoX3JlZjEzKSB7XG4gICAgdmFyIGNvbHVtbldpZHRoID0gX3JlZjEzLmNvbHVtbldpZHRoLFxuICAgICAgICByb3dIZWlnaHQgPSBfcmVmMTMucm93SGVpZ2h0O1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgY29sdW1uV2lkdGggIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwiY29sdW1uV2lkdGhcIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgYSBudW1iZXIuICcgKyAoXCJcXFwiXCIgKyAoY29sdW1uV2lkdGggPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29sdW1uV2lkdGgpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiByb3dIZWlnaHQgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwicm93SGVpZ2h0XCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnVmFsdWUgc2hvdWxkIGJlIGEgbnVtYmVyLiAnICsgKFwiXFxcIlwiICsgKHJvd0hlaWdodCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiByb3dIZWlnaHQpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG52YXIgRml4ZWRTaXplTGlzdCA9XG4vKiNfX1BVUkVfXyovXG5jcmVhdGVMaXN0Q29tcG9uZW50KHtcbiAgZ2V0SXRlbU9mZnNldDogZnVuY3Rpb24gZ2V0SXRlbU9mZnNldChfcmVmLCBpbmRleCkge1xuICAgIHZhciBpdGVtU2l6ZSA9IF9yZWYuaXRlbVNpemU7XG4gICAgcmV0dXJuIGluZGV4ICogaXRlbVNpemU7XG4gIH0sXG4gIGdldEl0ZW1TaXplOiBmdW5jdGlvbiBnZXRJdGVtU2l6ZShfcmVmMiwgaW5kZXgpIHtcbiAgICB2YXIgaXRlbVNpemUgPSBfcmVmMi5pdGVtU2l6ZTtcbiAgICByZXR1cm4gaXRlbVNpemU7XG4gIH0sXG4gIGdldEVzdGltYXRlZFRvdGFsU2l6ZTogZnVuY3Rpb24gZ2V0RXN0aW1hdGVkVG90YWxTaXplKF9yZWYzKSB7XG4gICAgdmFyIGl0ZW1Db3VudCA9IF9yZWYzLml0ZW1Db3VudCxcbiAgICAgICAgaXRlbVNpemUgPSBfcmVmMy5pdGVtU2l6ZTtcbiAgICByZXR1cm4gaXRlbVNpemUgKiBpdGVtQ291bnQ7XG4gIH0sXG4gIGdldE9mZnNldEZvckluZGV4QW5kQWxpZ25tZW50OiBmdW5jdGlvbiBnZXRPZmZzZXRGb3JJbmRleEFuZEFsaWdubWVudChfcmVmNCwgaW5kZXgsIGFsaWduLCBzY3JvbGxPZmZzZXQpIHtcbiAgICB2YXIgZGlyZWN0aW9uID0gX3JlZjQuZGlyZWN0aW9uLFxuICAgICAgICBoZWlnaHQgPSBfcmVmNC5oZWlnaHQsXG4gICAgICAgIGl0ZW1Db3VudCA9IF9yZWY0Lml0ZW1Db3VudCxcbiAgICAgICAgaXRlbVNpemUgPSBfcmVmNC5pdGVtU2l6ZSxcbiAgICAgICAgbGF5b3V0ID0gX3JlZjQubGF5b3V0LFxuICAgICAgICB3aWR0aCA9IF9yZWY0LndpZHRoO1xuICAgIC8vIFRPRE8gRGVwcmVjYXRlIGRpcmVjdGlvbiBcImhvcml6b250YWxcIlxuICAgIHZhciBpc0hvcml6b250YWwgPSBkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyB8fCBsYXlvdXQgPT09ICdob3Jpem9udGFsJztcbiAgICB2YXIgc2l6ZSA9IGlzSG9yaXpvbnRhbCA/IHdpZHRoIDogaGVpZ2h0O1xuICAgIHZhciBsYXN0SXRlbU9mZnNldCA9IE1hdGgubWF4KDAsIGl0ZW1Db3VudCAqIGl0ZW1TaXplIC0gc2l6ZSk7XG4gICAgdmFyIG1heE9mZnNldCA9IE1hdGgubWluKGxhc3RJdGVtT2Zmc2V0LCBpbmRleCAqIGl0ZW1TaXplKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gTWF0aC5tYXgoMCwgaW5kZXggKiBpdGVtU2l6ZSAtIHNpemUgKyBpdGVtU2l6ZSk7XG5cbiAgICBpZiAoYWxpZ24gPT09ICdzbWFydCcpIHtcbiAgICAgIGlmIChzY3JvbGxPZmZzZXQgPj0gbWluT2Zmc2V0IC0gc2l6ZSAmJiBzY3JvbGxPZmZzZXQgPD0gbWF4T2Zmc2V0ICsgc2l6ZSkge1xuICAgICAgICBhbGlnbiA9ICdhdXRvJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsaWduID0gJ2NlbnRlcic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICByZXR1cm4gbWF4T2Zmc2V0O1xuXG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuXG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICB7XG4gICAgICAgICAgLy8gXCJDZW50ZXJlZFwiIG9mZnNldCBpcyB1c3VhbGx5IHRoZSBhdmVyYWdlIG9mIHRoZSBtaW4gYW5kIG1heC5cbiAgICAgICAgICAvLyBCdXQgbmVhciB0aGUgZWRnZXMgb2YgdGhlIGxpc3QsIHRoaXMgZG9lc24ndCBob2xkIHRydWUuXG4gICAgICAgICAgdmFyIG1pZGRsZU9mZnNldCA9IE1hdGgucm91bmQobWluT2Zmc2V0ICsgKG1heE9mZnNldCAtIG1pbk9mZnNldCkgLyAyKTtcblxuICAgICAgICAgIGlmIChtaWRkbGVPZmZzZXQgPCBNYXRoLmNlaWwoc2l6ZSAvIDIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDsgLy8gbmVhciB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgfSBlbHNlIGlmIChtaWRkbGVPZmZzZXQgPiBsYXN0SXRlbU9mZnNldCArIE1hdGguZmxvb3Ioc2l6ZSAvIDIpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFzdEl0ZW1PZmZzZXQ7IC8vIG5lYXIgdGhlIGVuZFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWlkZGxlT2Zmc2V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICBjYXNlICdhdXRvJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChzY3JvbGxPZmZzZXQgPj0gbWluT2Zmc2V0ICYmIHNjcm9sbE9mZnNldCA8PSBtYXhPZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gc2Nyb2xsT2Zmc2V0O1xuICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbE9mZnNldCA8IG1pbk9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG1heE9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgfVxuICB9LFxuICBnZXRTdGFydEluZGV4Rm9yT2Zmc2V0OiBmdW5jdGlvbiBnZXRTdGFydEluZGV4Rm9yT2Zmc2V0KF9yZWY1LCBvZmZzZXQpIHtcbiAgICB2YXIgaXRlbUNvdW50ID0gX3JlZjUuaXRlbUNvdW50LFxuICAgICAgICBpdGVtU2l6ZSA9IF9yZWY1Lml0ZW1TaXplO1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihpdGVtQ291bnQgLSAxLCBNYXRoLmZsb29yKG9mZnNldCAvIGl0ZW1TaXplKSkpO1xuICB9LFxuICBnZXRTdG9wSW5kZXhGb3JTdGFydEluZGV4OiBmdW5jdGlvbiBnZXRTdG9wSW5kZXhGb3JTdGFydEluZGV4KF9yZWY2LCBzdGFydEluZGV4LCBzY3JvbGxPZmZzZXQpIHtcbiAgICB2YXIgZGlyZWN0aW9uID0gX3JlZjYuZGlyZWN0aW9uLFxuICAgICAgICBoZWlnaHQgPSBfcmVmNi5oZWlnaHQsXG4gICAgICAgIGl0ZW1Db3VudCA9IF9yZWY2Lml0ZW1Db3VudCxcbiAgICAgICAgaXRlbVNpemUgPSBfcmVmNi5pdGVtU2l6ZSxcbiAgICAgICAgbGF5b3V0ID0gX3JlZjYubGF5b3V0LFxuICAgICAgICB3aWR0aCA9IF9yZWY2LndpZHRoO1xuICAgIC8vIFRPRE8gRGVwcmVjYXRlIGRpcmVjdGlvbiBcImhvcml6b250YWxcIlxuICAgIHZhciBpc0hvcml6b250YWwgPSBkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyB8fCBsYXlvdXQgPT09ICdob3Jpem9udGFsJztcbiAgICB2YXIgb2Zmc2V0ID0gc3RhcnRJbmRleCAqIGl0ZW1TaXplO1xuICAgIHZhciBzaXplID0gaXNIb3Jpem9udGFsID8gd2lkdGggOiBoZWlnaHQ7XG4gICAgdmFyIG51bVZpc2libGVJdGVtcyA9IE1hdGguY2VpbCgoc2l6ZSArIHNjcm9sbE9mZnNldCAtIG9mZnNldCkgLyBpdGVtU2l6ZSk7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGl0ZW1Db3VudCAtIDEsIHN0YXJ0SW5kZXggKyBudW1WaXNpYmxlSXRlbXMgLSAxIC8vIC0xIGlzIGJlY2F1c2Ugc3RvcCBpbmRleCBpcyBpbmNsdXNpdmVcbiAgICApKTtcbiAgfSxcbiAgaW5pdEluc3RhbmNlUHJvcHM6IGZ1bmN0aW9uIGluaXRJbnN0YW5jZVByb3BzKHByb3BzKSB7Ly8gTm9vcFxuICB9LFxuICBzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlOiB0cnVlLFxuICB2YWxpZGF0ZVByb3BzOiBmdW5jdGlvbiB2YWxpZGF0ZVByb3BzKF9yZWY3KSB7XG4gICAgdmFyIGl0ZW1TaXplID0gX3JlZjcuaXRlbVNpemU7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiBpdGVtU2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0FuIGludmFsaWQgXCJpdGVtU2l6ZVwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ1ZhbHVlIHNob3VsZCBiZSBhIG51bWJlci4gJyArIChcIlxcXCJcIiArIChpdGVtU2l6ZSA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBpdGVtU2l6ZSkgKyBcIlxcXCIgd2FzIHNwZWNpZmllZC5cIikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbi8vIFB1bGxlZCBmcm9tIHJlYWN0LWNvbXBhdFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BpdC9wcmVhY3QtY29tcGF0L2Jsb2IvN2M1ZGUwMGU3Yzg1ZTJmZmQwMTFiZjNhZjAyODk5YjYzZjY5OWQzYS9zcmMvaW5kZXguanMjTDM0OVxuZnVuY3Rpb24gc2hhbGxvd0RpZmZlcnMocHJldiwgbmV4dCkge1xuICBmb3IgKHZhciBhdHRyaWJ1dGUgaW4gcHJldikge1xuICAgIGlmICghKGF0dHJpYnV0ZSBpbiBuZXh0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgX2F0dHJpYnV0ZSBpbiBuZXh0KSB7XG4gICAgaWYgKHByZXZbX2F0dHJpYnV0ZV0gIT09IG5leHRbX2F0dHJpYnV0ZV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gSXQga25vd3MgdG8gY29tcGFyZSBpbmRpdmlkdWFsIHN0eWxlIHByb3BzIGFuZCBpZ25vcmUgdGhlIHdyYXBwZXIgb2JqZWN0LlxuLy8gU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdG1lbW9cblxuZnVuY3Rpb24gYXJlRXF1YWwocHJldlByb3BzLCBuZXh0UHJvcHMpIHtcbiAgdmFyIHByZXZTdHlsZSA9IHByZXZQcm9wcy5zdHlsZSxcbiAgICAgIHByZXZSZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UocHJldlByb3BzLCBbXCJzdHlsZVwiXSk7XG5cbiAgdmFyIG5leHRTdHlsZSA9IG5leHRQcm9wcy5zdHlsZSxcbiAgICAgIG5leHRSZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UobmV4dFByb3BzLCBbXCJzdHlsZVwiXSk7XG5cbiAgcmV0dXJuICFzaGFsbG93RGlmZmVycyhwcmV2U3R5bGUsIG5leHRTdHlsZSkgJiYgIXNoYWxsb3dEaWZmZXJzKHByZXZSZXN0LCBuZXh0UmVzdCk7XG59XG5cbi8vIEl0IGtub3dzIHRvIGNvbXBhcmUgaW5kaXZpZHVhbCBzdHlsZSBwcm9wcyBhbmQgaWdub3JlIHRoZSB3cmFwcGVyIG9iamVjdC5cbi8vIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtY29tcG9uZW50Lmh0bWwjc2hvdWxkY29tcG9uZW50dXBkYXRlXG5cbmZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICByZXR1cm4gIWFyZUVxdWFsKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHwgc2hhbGxvd0RpZmZlcnModGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbn1cblxuZXhwb3J0IHsgVmFyaWFibGVTaXplR3JpZCwgVmFyaWFibGVTaXplTGlzdCwgRml4ZWRTaXplR3JpZCwgRml4ZWRTaXplTGlzdCwgYXJlRXF1YWwsIHNob3VsZENvbXBvbmVudFVwZGF0ZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXNtLmpzLm1hcFxuIl0sInNvdXJjZVJvb3QiOiIifQ==