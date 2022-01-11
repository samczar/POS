(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~customer~home~order~sale-history"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvbWVtb2l6ZS1vbmUvZGlzdC9tZW1vaXplLW9uZS5lc20uanMiLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXdpbmRvdy9kaXN0L2luZGV4LmVzbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLDBCQUEwQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHlFQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNuQzFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEQ7QUFDWTtBQUNnQjtBQUNqRDtBQUNnQjtBQUMrQzs7QUFFcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQXFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0ZBQWM7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0REFBNEQsZ0dBQXNCLENBQUMsZ0dBQXNCO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnR0FBc0IsQ0FBQyxnR0FBc0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywyREFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsNEJBQTRCLDJEQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQywyREFBVTtBQUMzQztBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOzs7QUFHWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdGQUF3RjtBQUN4RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwyQ0FBMkMsMkJBQTJCO0FBQ3RFLG1EQUFtRCxpQ0FBaUM7QUFDcEYsdUJBQXVCLDJEQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBLGFBQWEsMkRBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrRkFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPLEVBQUUsMkRBQWE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0dBQStHO0FBQy9HOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyR0FBMkc7QUFDM0c7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHLENBQUMsbURBQWE7QUFDakI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxJQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUEsSUFBSSxJQUFxQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHdGQUFjOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNERBQTRELGdHQUFzQixDQUFDLGdHQUFzQjtBQUN6RztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0dBQXNCLENBQUMsZ0dBQXNCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywyREFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLDRCQUE0QiwyREFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLDJFQUEyRTs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsMkRBQVU7QUFDM0M7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOzs7QUFHWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7OztBQUdYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDOztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHFDQUFxQyxxQkFBcUI7QUFDMUQscUJBQXFCLDJEQUFhO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7OztBQUdBO0FBQ0EsYUFBYSwyREFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtGQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU8sRUFBRSwyREFBYTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJHQUEyRztBQUMzRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUcsQ0FBQyxtREFBYTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxJQUFxQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsWUFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7QUFFNUI7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZGQUE2RjtBQUM3RjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUztBQUNULGtDQUFrQztBQUNsQyxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CLFNBQVM7QUFDVCwrQkFBK0I7QUFDL0IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHdEQUF3RDtBQUN4RCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckIsV0FBVztBQUNYLGtDQUFrQztBQUNsQyxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCx3REFBd0Q7QUFDeEQsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLElBQXFDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQix1R0FBNkI7O0FBRTlDO0FBQ0EsaUJBQWlCLHVHQUE2Qjs7QUFFOUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFNkc7QUFDN0ciLCJmaWxlIjoiLi9hc3NldHMvZGlzdC92ZW5kb3JzfmN1c3RvbWVyfmhvbWV+b3JkZXJ+c2FsZS1oaXN0b3J5L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYXJlSW5wdXRzRXF1YWwobmV3SW5wdXRzLCBsYXN0SW5wdXRzKSB7XG4gICAgaWYgKG5ld0lucHV0cy5sZW5ndGggIT09IGxhc3RJbnB1dHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdJbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG5ld0lucHV0c1tpXSAhPT0gbGFzdElucHV0c1tpXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBtZW1vaXplT25lKHJlc3VsdEZuLCBpc0VxdWFsKSB7XG4gICAgaWYgKGlzRXF1YWwgPT09IHZvaWQgMCkgeyBpc0VxdWFsID0gYXJlSW5wdXRzRXF1YWw7IH1cbiAgICB2YXIgbGFzdFRoaXM7XG4gICAgdmFyIGxhc3RBcmdzID0gW107XG4gICAgdmFyIGxhc3RSZXN1bHQ7XG4gICAgdmFyIGNhbGxlZE9uY2UgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBtZW1vaXplZCgpIHtcbiAgICAgICAgdmFyIG5ld0FyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG5ld0FyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbGVkT25jZSAmJiBsYXN0VGhpcyA9PT0gdGhpcyAmJiBpc0VxdWFsKG5ld0FyZ3MsIGxhc3RBcmdzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFJlc3VsdCA9IHJlc3VsdEZuLmFwcGx5KHRoaXMsIG5ld0FyZ3MpO1xuICAgICAgICBjYWxsZWRPbmNlID0gdHJ1ZTtcbiAgICAgICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgICAgICBsYXN0QXJncyA9IG5ld0FyZ3M7XG4gICAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gbWVtb2l6ZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemVPbmU7XG4iLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcyc7XG5pbXBvcnQgX2luaGVyaXRzTG9vc2UgZnJvbSAnQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZSc7XG5pbXBvcnQgX2Fzc2VydFRoaXNJbml0aWFsaXplZCBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQnO1xuaW1wb3J0IG1lbW9pemVPbmUgZnJvbSAnbWVtb2l6ZS1vbmUnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSBmcm9tICdAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlJztcblxuLy8gQW5pbWF0aW9uIGZyYW1lIGJhc2VkIGltcGxlbWVudGF0aW9uIG9mIHNldFRpbWVvdXQuXG4vLyBJbnNwaXJlZCBieSBKb2UgTGFtYmVydCwgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vam9lbGFtYmVydC8xMDAyMTE2I2ZpbGUtcmVxdWVzdHRpbWVvdXQtanNcbnZhciBoYXNOYXRpdmVQZXJmb3JtYW5jZU5vdyA9IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHBlcmZvcm1hbmNlLm5vdyA9PT0gJ2Z1bmN0aW9uJztcbnZhciBub3cgPSBoYXNOYXRpdmVQZXJmb3JtYW5jZU5vdyA/IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xufSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIERhdGUubm93KCk7XG59O1xuZnVuY3Rpb24gY2FuY2VsVGltZW91dCh0aW1lb3V0SUQpIHtcbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGltZW91dElELmlkKTtcbn1cbmZ1bmN0aW9uIHJlcXVlc3RUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSkge1xuICB2YXIgc3RhcnQgPSBub3coKTtcblxuICBmdW5jdGlvbiB0aWNrKCkge1xuICAgIGlmIChub3coKSAtIHN0YXJ0ID49IGRlbGF5KSB7XG4gICAgICBjYWxsYmFjay5jYWxsKG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lb3V0SUQuaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHRpbWVvdXRJRCA9IHtcbiAgICBpZDogcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spXG4gIH07XG4gIHJldHVybiB0aW1lb3V0SUQ7XG59XG5cbnZhciBzaXplID0gLTE7IC8vIFRoaXMgdXRpbGl0eSBjb3BpZWQgZnJvbSBcImRvbS1oZWxwZXJzXCIgcGFja2FnZS5cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyU2l6ZShyZWNhbGN1bGF0ZSkge1xuICBpZiAocmVjYWxjdWxhdGUgPT09IHZvaWQgMCkge1xuICAgIHJlY2FsY3VsYXRlID0gZmFsc2U7XG4gIH1cblxuICBpZiAoc2l6ZSA9PT0gLTEgfHwgcmVjYWxjdWxhdGUpIHtcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIHN0eWxlID0gZGl2LnN0eWxlO1xuICAgIHN0eWxlLndpZHRoID0gJzUwcHgnO1xuICAgIHN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICBzdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBzaXplID0gZGl2Lm9mZnNldFdpZHRoIC0gZGl2LmNsaWVudFdpZHRoO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgfVxuXG4gIHJldHVybiBzaXplO1xufVxudmFyIGNhY2hlZFJUTFJlc3VsdCA9IG51bGw7IC8vIFRSSUNLWSBBY2NvcmRpbmcgdG8gdGhlIHNwZWMsIHNjcm9sbExlZnQgc2hvdWxkIGJlIG5lZ2F0aXZlIGZvciBSVEwgYWxpZ25lZCBlbGVtZW50cy5cbi8vIENocm9tZSBkb2VzIG5vdCBzZWVtIHRvIGFkaGVyZTsgaXRzIHNjcm9sbExlZnQgdmFsdWVzIGFyZSBwb3NpdGl2ZSAobWVhc3VyZWQgcmVsYXRpdmUgdG8gdGhlIGxlZnQpLlxuLy8gU2FmYXJpJ3MgZWxhc3RpYyBib3VuY2UgbWFrZXMgZGV0ZWN0aW5nIHRoaXMgZXZlbiBtb3JlIGNvbXBsaWNhdGVkIHdydCBwb3RlbnRpYWwgZmFsc2UgcG9zaXRpdmVzLlxuLy8gVGhlIHNhZmVzdCB3YXkgdG8gY2hlY2sgdGhpcyBpcyB0byBpbnRlbnRpb25hbGx5IHNldCBhIG5lZ2F0aXZlIG9mZnNldCxcbi8vIGFuZCB0aGVuIHZlcmlmeSB0aGF0IHRoZSBzdWJzZXF1ZW50IFwic2Nyb2xsXCIgZXZlbnQgbWF0Y2hlcyB0aGUgbmVnYXRpdmUgb2Zmc2V0LlxuLy8gSWYgaXQgZG9lcyBub3QgbWF0Y2gsIHRoZW4gd2UgY2FuIGFzc3VtZSBhIG5vbi1zdGFuZGFyZCBSVEwgc2Nyb2xsIGltcGxlbWVudGF0aW9uLlxuXG5mdW5jdGlvbiBnZXRSVExPZmZzZXRUeXBlKHJlY2FsY3VsYXRlKSB7XG4gIGlmIChyZWNhbGN1bGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmVjYWxjdWxhdGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChjYWNoZWRSVExSZXN1bHQgPT09IG51bGwgfHwgcmVjYWxjdWxhdGUpIHtcbiAgICB2YXIgb3V0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgb3V0ZXJTdHlsZSA9IG91dGVyRGl2LnN0eWxlO1xuICAgIG91dGVyU3R5bGUud2lkdGggPSAnNTBweCc7XG4gICAgb3V0ZXJTdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gICAgb3V0ZXJTdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnO1xuICAgIG91dGVyU3R5bGUuZGlyZWN0aW9uID0gJ3J0bCc7XG4gICAgdmFyIGlubmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGlubmVyU3R5bGUgPSBpbm5lckRpdi5zdHlsZTtcbiAgICBpbm5lclN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICBpbm5lclN0eWxlLmhlaWdodCA9ICcxMDBweCc7XG4gICAgb3V0ZXJEaXYuYXBwZW5kQ2hpbGQoaW5uZXJEaXYpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXJEaXYpO1xuXG4gICAgaWYgKG91dGVyRGl2LnNjcm9sbExlZnQgPiAwKSB7XG4gICAgICBjYWNoZWRSVExSZXN1bHQgPSAncG9zaXRpdmUtZGVzY2VuZGluZyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dGVyRGl2LnNjcm9sbExlZnQgPSAxO1xuXG4gICAgICBpZiAob3V0ZXJEaXYuc2Nyb2xsTGVmdCA9PT0gMCkge1xuICAgICAgICBjYWNoZWRSVExSZXN1bHQgPSAnbmVnYXRpdmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FjaGVkUlRMUmVzdWx0ID0gJ3Bvc2l0aXZlLWFzY2VuZGluZyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvdXRlckRpdik7XG4gICAgcmV0dXJuIGNhY2hlZFJUTFJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBjYWNoZWRSVExSZXN1bHQ7XG59XG5cbnZhciBJU19TQ1JPTExJTkdfREVCT1VOQ0VfSU5URVJWQUwgPSAxNTA7XG5cbnZhciBkZWZhdWx0SXRlbUtleSA9IGZ1bmN0aW9uIGRlZmF1bHRJdGVtS2V5KF9yZWYpIHtcbiAgdmFyIGNvbHVtbkluZGV4ID0gX3JlZi5jb2x1bW5JbmRleCxcbiAgICAgIGRhdGEgPSBfcmVmLmRhdGEsXG4gICAgICByb3dJbmRleCA9IF9yZWYucm93SW5kZXg7XG4gIHJldHVybiByb3dJbmRleCArIFwiOlwiICsgY29sdW1uSW5kZXg7XG59OyAvLyBJbiBERVYgbW9kZSwgdGhpcyBTZXQgaGVscHMgdXMgb25seSBsb2cgYSB3YXJuaW5nIG9uY2UgcGVyIGNvbXBvbmVudCBpbnN0YW5jZS5cbi8vIFRoaXMgYXZvaWRzIHNwYW1taW5nIHRoZSBjb25zb2xlIGV2ZXJ5IHRpbWUgYSByZW5kZXIgaGFwcGVucy5cblxuXG52YXIgZGV2V2FybmluZ3NPdmVyc2NhbkNvdW50ID0gbnVsbDtcbnZhciBkZXZXYXJuaW5nc092ZXJzY2FuUm93c0NvbHVtbnNDb3VudCA9IG51bGw7XG52YXIgZGV2V2FybmluZ3NUYWdOYW1lID0gbnVsbDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuV2Vha1NldCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkZXZXYXJuaW5nc092ZXJzY2FuQ291bnQgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBuZXcgV2Vha1NldCgpO1xuICAgIGRldldhcm5pbmdzT3ZlcnNjYW5Sb3dzQ29sdW1uc0NvdW50ID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgbmV3IFdlYWtTZXQoKTtcbiAgICBkZXZXYXJuaW5nc1RhZ05hbWUgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBuZXcgV2Vha1NldCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdyaWRDb21wb25lbnQoX3JlZjIpIHtcbiAgdmFyIF9jbGFzcywgX3RlbXA7XG5cbiAgdmFyIGdldENvbHVtbk9mZnNldCA9IF9yZWYyLmdldENvbHVtbk9mZnNldCxcbiAgICAgIGdldENvbHVtblN0YXJ0SW5kZXhGb3JPZmZzZXQgPSBfcmVmMi5nZXRDb2x1bW5TdGFydEluZGV4Rm9yT2Zmc2V0LFxuICAgICAgZ2V0Q29sdW1uU3RvcEluZGV4Rm9yU3RhcnRJbmRleCA9IF9yZWYyLmdldENvbHVtblN0b3BJbmRleEZvclN0YXJ0SW5kZXgsXG4gICAgICBnZXRDb2x1bW5XaWR0aCA9IF9yZWYyLmdldENvbHVtbldpZHRoLFxuICAgICAgZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQgPSBfcmVmMi5nZXRFc3RpbWF0ZWRUb3RhbEhlaWdodCxcbiAgICAgIGdldEVzdGltYXRlZFRvdGFsV2lkdGggPSBfcmVmMi5nZXRFc3RpbWF0ZWRUb3RhbFdpZHRoLFxuICAgICAgZ2V0T2Zmc2V0Rm9yQ29sdW1uQW5kQWxpZ25tZW50ID0gX3JlZjIuZ2V0T2Zmc2V0Rm9yQ29sdW1uQW5kQWxpZ25tZW50LFxuICAgICAgZ2V0T2Zmc2V0Rm9yUm93QW5kQWxpZ25tZW50ID0gX3JlZjIuZ2V0T2Zmc2V0Rm9yUm93QW5kQWxpZ25tZW50LFxuICAgICAgZ2V0Um93SGVpZ2h0ID0gX3JlZjIuZ2V0Um93SGVpZ2h0LFxuICAgICAgZ2V0Um93T2Zmc2V0ID0gX3JlZjIuZ2V0Um93T2Zmc2V0LFxuICAgICAgZ2V0Um93U3RhcnRJbmRleEZvck9mZnNldCA9IF9yZWYyLmdldFJvd1N0YXJ0SW5kZXhGb3JPZmZzZXQsXG4gICAgICBnZXRSb3dTdG9wSW5kZXhGb3JTdGFydEluZGV4ID0gX3JlZjIuZ2V0Um93U3RvcEluZGV4Rm9yU3RhcnRJbmRleCxcbiAgICAgIGluaXRJbnN0YW5jZVByb3BzID0gX3JlZjIuaW5pdEluc3RhbmNlUHJvcHMsXG4gICAgICBzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlID0gX3JlZjIuc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSxcbiAgICAgIHZhbGlkYXRlUHJvcHMgPSBfcmVmMi52YWxpZGF0ZVByb3BzO1xuICByZXR1cm4gX3RlbXAgPSBfY2xhc3MgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfUHVyZUNvbXBvbmVudCkge1xuICAgIF9pbmhlcml0c0xvb3NlKEdyaWQsIF9QdXJlQ29tcG9uZW50KTtcblxuICAgIC8vIEFsd2F5cyB1c2UgZXhwbGljaXQgY29uc3RydWN0b3IgZm9yIFJlYWN0IGNvbXBvbmVudHMuXG4gICAgLy8gSXQgcHJvZHVjZXMgbGVzcyBjb2RlIGFmdGVyIHRyYW5zcGlsYXRpb24uICgjMjYpXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY29uc3RydWN0b3JcbiAgICBmdW5jdGlvbiBHcmlkKHByb3BzKSB7XG4gICAgICB2YXIgX3RoaXM7XG5cbiAgICAgIF90aGlzID0gX1B1cmVDb21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcbiAgICAgIF90aGlzLl9pbnN0YW5jZVByb3BzID0gaW5pdEluc3RhbmNlUHJvcHMoX3RoaXMucHJvcHMsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpKTtcbiAgICAgIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkID0gbnVsbDtcbiAgICAgIF90aGlzLl9vdXRlclJlZiA9IHZvaWQgMDtcbiAgICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgICBpbnN0YW5jZTogX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSksXG4gICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZSxcbiAgICAgICAgaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbjogJ2ZvcndhcmQnLFxuICAgICAgICBzY3JvbGxMZWZ0OiB0eXBlb2YgX3RoaXMucHJvcHMuaW5pdGlhbFNjcm9sbExlZnQgPT09ICdudW1iZXInID8gX3RoaXMucHJvcHMuaW5pdGlhbFNjcm9sbExlZnQgOiAwLFxuICAgICAgICBzY3JvbGxUb3A6IHR5cGVvZiBfdGhpcy5wcm9wcy5pbml0aWFsU2Nyb2xsVG9wID09PSAnbnVtYmVyJyA/IF90aGlzLnByb3BzLmluaXRpYWxTY3JvbGxUb3AgOiAwLFxuICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ6IGZhbHNlLFxuICAgICAgICB2ZXJ0aWNhbFNjcm9sbERpcmVjdGlvbjogJ2ZvcndhcmQnXG4gICAgICB9O1xuICAgICAgX3RoaXMuX2NhbGxPbkl0ZW1zUmVuZGVyZWQgPSB2b2lkIDA7XG4gICAgICBfdGhpcy5fY2FsbE9uSXRlbXNSZW5kZXJlZCA9IG1lbW9pemVPbmUoZnVuY3Rpb24gKG92ZXJzY2FuQ29sdW1uU3RhcnRJbmRleCwgb3ZlcnNjYW5Db2x1bW5TdG9wSW5kZXgsIG92ZXJzY2FuUm93U3RhcnRJbmRleCwgb3ZlcnNjYW5Sb3dTdG9wSW5kZXgsIHZpc2libGVDb2x1bW5TdGFydEluZGV4LCB2aXNpYmxlQ29sdW1uU3RvcEluZGV4LCB2aXNpYmxlUm93U3RhcnRJbmRleCwgdmlzaWJsZVJvd1N0b3BJbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXMucHJvcHMub25JdGVtc1JlbmRlcmVkKHtcbiAgICAgICAgICBvdmVyc2NhbkNvbHVtblN0YXJ0SW5kZXg6IG92ZXJzY2FuQ29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICBvdmVyc2NhbkNvbHVtblN0b3BJbmRleDogb3ZlcnNjYW5Db2x1bW5TdG9wSW5kZXgsXG4gICAgICAgICAgb3ZlcnNjYW5Sb3dTdGFydEluZGV4OiBvdmVyc2NhblJvd1N0YXJ0SW5kZXgsXG4gICAgICAgICAgb3ZlcnNjYW5Sb3dTdG9wSW5kZXg6IG92ZXJzY2FuUm93U3RvcEluZGV4LFxuICAgICAgICAgIHZpc2libGVDb2x1bW5TdGFydEluZGV4OiB2aXNpYmxlQ29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICB2aXNpYmxlQ29sdW1uU3RvcEluZGV4OiB2aXNpYmxlQ29sdW1uU3RvcEluZGV4LFxuICAgICAgICAgIHZpc2libGVSb3dTdGFydEluZGV4OiB2aXNpYmxlUm93U3RhcnRJbmRleCxcbiAgICAgICAgICB2aXNpYmxlUm93U3RvcEluZGV4OiB2aXNpYmxlUm93U3RvcEluZGV4XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBfdGhpcy5fY2FsbE9uU2Nyb2xsID0gdm9pZCAwO1xuICAgICAgX3RoaXMuX2NhbGxPblNjcm9sbCA9IG1lbW9pemVPbmUoZnVuY3Rpb24gKHNjcm9sbExlZnQsIHNjcm9sbFRvcCwgaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbiwgdmVydGljYWxTY3JvbGxEaXJlY3Rpb24sIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCkge1xuICAgICAgICByZXR1cm4gX3RoaXMucHJvcHMub25TY3JvbGwoe1xuICAgICAgICAgIGhvcml6b250YWxTY3JvbGxEaXJlY3Rpb246IGhvcml6b250YWxTY3JvbGxEaXJlY3Rpb24sXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICB2ZXJ0aWNhbFNjcm9sbERpcmVjdGlvbjogdmVydGljYWxTY3JvbGxEaXJlY3Rpb24sXG4gICAgICAgICAgc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkOiBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIF90aGlzLl9nZXRJdGVtU3R5bGUgPSB2b2lkIDA7XG5cbiAgICAgIF90aGlzLl9nZXRJdGVtU3R5bGUgPSBmdW5jdGlvbiAocm93SW5kZXgsIGNvbHVtbkluZGV4KSB7XG4gICAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgICAgY29sdW1uV2lkdGggPSBfdGhpcyRwcm9wcy5jb2x1bW5XaWR0aCxcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IF90aGlzJHByb3BzLmRpcmVjdGlvbixcbiAgICAgICAgICAgIHJvd0hlaWdodCA9IF90aGlzJHByb3BzLnJvd0hlaWdodDtcblxuICAgICAgICB2YXIgaXRlbVN0eWxlQ2FjaGUgPSBfdGhpcy5fZ2V0SXRlbVN0eWxlQ2FjaGUoc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSAmJiBjb2x1bW5XaWR0aCwgc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSAmJiBkaXJlY3Rpb24sIHNob3VsZFJlc2V0U3R5bGVDYWNoZU9uSXRlbVNpemVDaGFuZ2UgJiYgcm93SGVpZ2h0KTtcblxuICAgICAgICB2YXIga2V5ID0gcm93SW5kZXggKyBcIjpcIiArIGNvbHVtbkluZGV4O1xuICAgICAgICB2YXIgc3R5bGU7XG5cbiAgICAgICAgaWYgKGl0ZW1TdHlsZUNhY2hlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBzdHlsZSA9IGl0ZW1TdHlsZUNhY2hlW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIF9vZmZzZXQgPSBnZXRDb2x1bW5PZmZzZXQoX3RoaXMucHJvcHMsIGNvbHVtbkluZGV4LCBfdGhpcy5faW5zdGFuY2VQcm9wcyk7XG5cbiAgICAgICAgICB2YXIgaXNSdGwgPSBkaXJlY3Rpb24gPT09ICdydGwnO1xuICAgICAgICAgIGl0ZW1TdHlsZUNhY2hlW2tleV0gPSBzdHlsZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogaXNSdGwgPyB1bmRlZmluZWQgOiBfb2Zmc2V0LFxuICAgICAgICAgICAgcmlnaHQ6IGlzUnRsID8gX29mZnNldCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRvcDogZ2V0Um93T2Zmc2V0KF90aGlzLnByb3BzLCByb3dJbmRleCwgX3RoaXMuX2luc3RhbmNlUHJvcHMpLFxuICAgICAgICAgICAgaGVpZ2h0OiBnZXRSb3dIZWlnaHQoX3RoaXMucHJvcHMsIHJvd0luZGV4LCBfdGhpcy5faW5zdGFuY2VQcm9wcyksXG4gICAgICAgICAgICB3aWR0aDogZ2V0Q29sdW1uV2lkdGgoX3RoaXMucHJvcHMsIGNvbHVtbkluZGV4LCBfdGhpcy5faW5zdGFuY2VQcm9wcylcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuX2dldEl0ZW1TdHlsZUNhY2hlID0gdm9pZCAwO1xuICAgICAgX3RoaXMuX2dldEl0ZW1TdHlsZUNhY2hlID0gbWVtb2l6ZU9uZShmdW5jdGlvbiAoXywgX18sIF9fXykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9KTtcblxuICAgICAgX3RoaXMuX29uU2Nyb2xsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBfZXZlbnQkY3VycmVudFRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgICAgICBjbGllbnRIZWlnaHQgPSBfZXZlbnQkY3VycmVudFRhcmdldC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBjbGllbnRXaWR0aCA9IF9ldmVudCRjdXJyZW50VGFyZ2V0LmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgc2Nyb2xsTGVmdCA9IF9ldmVudCRjdXJyZW50VGFyZ2V0LnNjcm9sbExlZnQsXG4gICAgICAgICAgICBzY3JvbGxUb3AgPSBfZXZlbnQkY3VycmVudFRhcmdldC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQgPSBfZXZlbnQkY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxXaWR0aCA9IF9ldmVudCRjdXJyZW50VGFyZ2V0LnNjcm9sbFdpZHRoO1xuXG4gICAgICAgIF90aGlzLnNldFN0YXRlKGZ1bmN0aW9uIChwcmV2U3RhdGUpIHtcbiAgICAgICAgICBpZiAocHJldlN0YXRlLnNjcm9sbExlZnQgPT09IHNjcm9sbExlZnQgJiYgcHJldlN0YXRlLnNjcm9sbFRvcCA9PT0gc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICAvLyBTY3JvbGwgcG9zaXRpb24gbWF5IGhhdmUgYmVlbiB1cGRhdGVkIGJ5IGNETS9jRFUsXG4gICAgICAgICAgICAvLyBJbiB3aGljaCBjYXNlIHdlIGRvbid0IG5lZWQgdG8gdHJpZ2dlciBhbm90aGVyIHJlbmRlcixcbiAgICAgICAgICAgIC8vIEFuZCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZSBzdGF0ZS5pc1Njcm9sbGluZy5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBfdGhpcy5wcm9wcy5kaXJlY3Rpb247IC8vIFRSSUNLWSBBY2NvcmRpbmcgdG8gdGhlIHNwZWMsIHNjcm9sbExlZnQgc2hvdWxkIGJlIG5lZ2F0aXZlIGZvciBSVEwgYWxpZ25lZCBlbGVtZW50cy5cbiAgICAgICAgICAvLyBUaGlzIGlzIG5vdCB0aGUgY2FzZSBmb3IgYWxsIGJyb3dzZXJzIHRob3VnaCAoZS5nLiBDaHJvbWUgcmVwb3J0cyB2YWx1ZXMgYXMgcG9zaXRpdmUsIG1lYXN1cmVkIHJlbGF0aXZlIHRvIHRoZSBsZWZ0KS5cbiAgICAgICAgICAvLyBJdCdzIGFsc28gZWFzaWVyIGZvciB0aGlzIGNvbXBvbmVudCBpZiB3ZSBjb252ZXJ0IG9mZnNldHMgdG8gdGhlIHNhbWUgZm9ybWF0IGFzIHRoZXkgd291bGQgYmUgaW4gZm9yIGx0ci5cbiAgICAgICAgICAvLyBTbyB0aGUgc2ltcGxlc3Qgc29sdXRpb24gaXMgdG8gZGV0ZXJtaW5lIHdoaWNoIGJyb3dzZXIgYmVoYXZpb3Igd2UncmUgZGVhbGluZyB3aXRoLCBhbmQgY29udmVydCBiYXNlZCBvbiBpdC5cblxuICAgICAgICAgIHZhciBjYWxjdWxhdGVkU2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgICAgICAgICAgc3dpdGNoIChnZXRSVExPZmZzZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgY2FzZSAnbmVnYXRpdmUnOlxuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRTY3JvbGxMZWZ0ID0gLXNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAncG9zaXRpdmUtZGVzY2VuZGluZyc6XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFNjcm9sbExlZnQgPSBzY3JvbGxXaWR0aCAtIGNsaWVudFdpZHRoIC0gc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IC8vIFByZXZlbnQgU2FmYXJpJ3MgZWxhc3RpYyBzY3JvbGxpbmcgZnJvbSBjYXVzaW5nIHZpc3VhbCBzaGFraW5nIHdoZW4gc2Nyb2xsaW5nIHBhc3QgYm91bmRzLlxuXG5cbiAgICAgICAgICBjYWxjdWxhdGVkU2Nyb2xsTGVmdCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGNhbGN1bGF0ZWRTY3JvbGxMZWZ0LCBzY3JvbGxXaWR0aCAtIGNsaWVudFdpZHRoKSk7XG4gICAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxUb3AgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihzY3JvbGxUb3AsIHNjcm9sbEhlaWdodCAtIGNsaWVudEhlaWdodCkpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGhvcml6b250YWxTY3JvbGxEaXJlY3Rpb246IHByZXZTdGF0ZS5zY3JvbGxMZWZ0IDwgc2Nyb2xsTGVmdCA/ICdmb3J3YXJkJyA6ICdiYWNrd2FyZCcsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBjYWxjdWxhdGVkU2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogY2FsY3VsYXRlZFNjcm9sbFRvcCxcbiAgICAgICAgICAgIHZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uOiBwcmV2U3RhdGUuc2Nyb2xsVG9wIDwgc2Nyb2xsVG9wID8gJ2ZvcndhcmQnIDogJ2JhY2t3YXJkJyxcbiAgICAgICAgICAgIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZDogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9LCBfdGhpcy5fcmVzZXRJc1Njcm9sbGluZ0RlYm91bmNlZCk7XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5fb3V0ZXJSZWZTZXR0ZXIgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgIHZhciBvdXRlclJlZiA9IF90aGlzLnByb3BzLm91dGVyUmVmO1xuICAgICAgICBfdGhpcy5fb3V0ZXJSZWYgPSByZWY7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvdXRlclJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG91dGVyUmVmKHJlZik7XG4gICAgICAgIH0gZWxzZSBpZiAob3V0ZXJSZWYgIT0gbnVsbCAmJiB0eXBlb2Ygb3V0ZXJSZWYgPT09ICdvYmplY3QnICYmIG91dGVyUmVmLmhhc093blByb3BlcnR5KCdjdXJyZW50JykpIHtcbiAgICAgICAgICBvdXRlclJlZi5jdXJyZW50ID0gcmVmO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5fcmVzZXRJc1Njcm9sbGluZ0RlYm91bmNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF90aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkICE9PSBudWxsKSB7XG4gICAgICAgICAgY2FuY2VsVGltZW91dChfdGhpcy5fcmVzZXRJc1Njcm9sbGluZ1RpbWVvdXRJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy5fcmVzZXRJc1Njcm9sbGluZ1RpbWVvdXRJZCA9IHJlcXVlc3RUaW1lb3V0KF90aGlzLl9yZXNldElzU2Nyb2xsaW5nLCBJU19TQ1JPTExJTkdfREVCT1VOQ0VfSU5URVJWQUwpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkID0gbnVsbDtcblxuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBDbGVhciBzdHlsZSBjYWNoZSBhZnRlciBzdGF0ZSB1cGRhdGUgaGFzIGJlZW4gY29tbWl0dGVkLlxuICAgICAgICAgIC8vIFRoaXMgd2F5IHdlIGRvbid0IGJyZWFrIHB1cmUgc0NVIGZvciBpdGVtcyB0aGF0IGRvbid0IHVzZSBpc1Njcm9sbGluZyBwYXJhbS5cbiAgICAgICAgICBfdGhpcy5fZ2V0SXRlbVN0eWxlQ2FjaGUoLTEpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBHcmlkLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9IGZ1bmN0aW9uIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgICAgdmFsaWRhdGVTaGFyZWRQcm9wcyhuZXh0UHJvcHMsIHByZXZTdGF0ZSk7XG4gICAgICB2YWxpZGF0ZVByb3BzKG5leHRQcm9wcyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgdmFyIF9wcm90byA9IEdyaWQucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvLnNjcm9sbFRvID0gZnVuY3Rpb24gc2Nyb2xsVG8oX3JlZjMpIHtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZjMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3AgPSBfcmVmMy5zY3JvbGxUb3A7XG5cbiAgICAgIGlmIChzY3JvbGxMZWZ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2Nyb2xsTGVmdCA9IE1hdGgubWF4KDAsIHNjcm9sbExlZnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2Nyb2xsVG9wID0gTWF0aC5tYXgoMCwgc2Nyb2xsVG9wKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAocHJldlN0YXRlKSB7XG4gICAgICAgIGlmIChzY3JvbGxMZWZ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gcHJldlN0YXRlLnNjcm9sbExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Nyb2xsVG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzY3JvbGxUb3AgPSBwcmV2U3RhdGUuc2Nyb2xsVG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZTdGF0ZS5zY3JvbGxMZWZ0ID09PSBzY3JvbGxMZWZ0ICYmIHByZXZTdGF0ZS5zY3JvbGxUb3AgPT09IHNjcm9sbFRvcCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBob3Jpem9udGFsU2Nyb2xsRGlyZWN0aW9uOiBwcmV2U3RhdGUuc2Nyb2xsTGVmdCA8IHNjcm9sbExlZnQgPyAnZm9yd2FyZCcgOiAnYmFja3dhcmQnLFxuICAgICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgICAgc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkOiB0cnVlLFxuICAgICAgICAgIHZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uOiBwcmV2U3RhdGUuc2Nyb2xsVG9wIDwgc2Nyb2xsVG9wID8gJ2ZvcndhcmQnIDogJ2JhY2t3YXJkJ1xuICAgICAgICB9O1xuICAgICAgfSwgdGhpcy5fcmVzZXRJc1Njcm9sbGluZ0RlYm91bmNlZCk7XG4gICAgfTtcblxuICAgIF9wcm90by5zY3JvbGxUb0l0ZW0gPSBmdW5jdGlvbiBzY3JvbGxUb0l0ZW0oX3JlZjQpIHtcbiAgICAgIHZhciBfcmVmNCRhbGlnbiA9IF9yZWY0LmFsaWduLFxuICAgICAgICAgIGFsaWduID0gX3JlZjQkYWxpZ24gPT09IHZvaWQgMCA/ICdhdXRvJyA6IF9yZWY0JGFsaWduLFxuICAgICAgICAgIGNvbHVtbkluZGV4ID0gX3JlZjQuY29sdW1uSW5kZXgsXG4gICAgICAgICAgcm93SW5kZXggPSBfcmVmNC5yb3dJbmRleDtcbiAgICAgIHZhciBfdGhpcyRwcm9wczIgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNvbHVtbkNvdW50ID0gX3RoaXMkcHJvcHMyLmNvbHVtbkNvdW50LFxuICAgICAgICAgIGhlaWdodCA9IF90aGlzJHByb3BzMi5oZWlnaHQsXG4gICAgICAgICAgcm93Q291bnQgPSBfdGhpcyRwcm9wczIucm93Q291bnQsXG4gICAgICAgICAgd2lkdGggPSBfdGhpcyRwcm9wczIud2lkdGg7XG4gICAgICB2YXIgX3RoaXMkc3RhdGUgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIHNjcm9sbExlZnQgPSBfdGhpcyRzdGF0ZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcCA9IF90aGlzJHN0YXRlLnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxiYXJTaXplID0gZ2V0U2Nyb2xsYmFyU2l6ZSgpO1xuXG4gICAgICBpZiAoY29sdW1uSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5JbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGNvbHVtbkluZGV4LCBjb2x1bW5Db3VudCAtIDEpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvd0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcm93SW5kZXggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihyb3dJbmRleCwgcm93Q291bnQgLSAxKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBlc3RpbWF0ZWRUb3RhbEhlaWdodCA9IGdldEVzdGltYXRlZFRvdGFsSGVpZ2h0KHRoaXMucHJvcHMsIHRoaXMuX2luc3RhbmNlUHJvcHMpO1xuICAgICAgdmFyIGVzdGltYXRlZFRvdGFsV2lkdGggPSBnZXRFc3RpbWF0ZWRUb3RhbFdpZHRoKHRoaXMucHJvcHMsIHRoaXMuX2luc3RhbmNlUHJvcHMpOyAvLyBUaGUgc2Nyb2xsYmFyIHNpemUgc2hvdWxkIGJlIGNvbnNpZGVyZWQgd2hlbiBzY3JvbGxpbmcgYW4gaXRlbSBpbnRvIHZpZXcsXG4gICAgICAvLyB0byBlbnN1cmUgaXQncyBmdWxseSB2aXNpYmxlLlxuICAgICAgLy8gQnV0IHdlIG9ubHkgbmVlZCB0byBhY2NvdW50IGZvciBpdHMgc2l6ZSB3aGVuIGl0J3MgYWN0dWFsbHkgdmlzaWJsZS5cblxuICAgICAgdmFyIGhvcml6b250YWxTY3JvbGxiYXJTaXplID0gZXN0aW1hdGVkVG90YWxXaWR0aCA+IHdpZHRoID8gc2Nyb2xsYmFyU2l6ZSA6IDA7XG4gICAgICB2YXIgdmVydGljYWxTY3JvbGxiYXJTaXplID0gZXN0aW1hdGVkVG90YWxIZWlnaHQgPiBoZWlnaHQgPyBzY3JvbGxiYXJTaXplIDogMDtcbiAgICAgIHRoaXMuc2Nyb2xsVG8oe1xuICAgICAgICBzY3JvbGxMZWZ0OiBjb2x1bW5JbmRleCAhPT0gdW5kZWZpbmVkID8gZ2V0T2Zmc2V0Rm9yQ29sdW1uQW5kQWxpZ25tZW50KHRoaXMucHJvcHMsIGNvbHVtbkluZGV4LCBhbGlnbiwgc2Nyb2xsTGVmdCwgdGhpcy5faW5zdGFuY2VQcm9wcywgdmVydGljYWxTY3JvbGxiYXJTaXplKSA6IHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFRvcDogcm93SW5kZXggIT09IHVuZGVmaW5lZCA/IGdldE9mZnNldEZvclJvd0FuZEFsaWdubWVudCh0aGlzLnByb3BzLCByb3dJbmRleCwgYWxpZ24sIHNjcm9sbFRvcCwgdGhpcy5faW5zdGFuY2VQcm9wcywgaG9yaXpvbnRhbFNjcm9sbGJhclNpemUpIDogc2Nyb2xsVG9wXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBpbml0aWFsU2Nyb2xsTGVmdCA9IF90aGlzJHByb3BzMy5pbml0aWFsU2Nyb2xsTGVmdCxcbiAgICAgICAgICBpbml0aWFsU2Nyb2xsVG9wID0gX3RoaXMkcHJvcHMzLmluaXRpYWxTY3JvbGxUb3A7XG5cbiAgICAgIGlmICh0aGlzLl9vdXRlclJlZiAhPSBudWxsKSB7XG4gICAgICAgIHZhciBvdXRlclJlZiA9IHRoaXMuX291dGVyUmVmO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbFNjcm9sbExlZnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsTGVmdCA9IGluaXRpYWxTY3JvbGxMZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsU2Nyb2xsVG9wID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG91dGVyUmVmLnNjcm9sbFRvcCA9IGluaXRpYWxTY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2FsbFByb3BzQ2FsbGJhY2tzKCk7XG4gICAgfTtcblxuICAgIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5wcm9wcy5kaXJlY3Rpb247XG4gICAgICB2YXIgX3RoaXMkc3RhdGUyID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gX3RoaXMkc3RhdGUyLnNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsVG9wID0gX3RoaXMkc3RhdGUyLnNjcm9sbFRvcCxcbiAgICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQgPSBfdGhpcyRzdGF0ZTIuc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkO1xuXG4gICAgICBpZiAoc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkICYmIHRoaXMuX291dGVyUmVmICE9IG51bGwpIHtcbiAgICAgICAgLy8gVFJJQ0tZIEFjY29yZGluZyB0byB0aGUgc3BlYywgc2Nyb2xsTGVmdCBzaG91bGQgYmUgbmVnYXRpdmUgZm9yIFJUTCBhbGlnbmVkIGVsZW1lbnRzLlxuICAgICAgICAvLyBUaGlzIGlzIG5vdCB0aGUgY2FzZSBmb3IgYWxsIGJyb3dzZXJzIHRob3VnaCAoZS5nLiBDaHJvbWUgcmVwb3J0cyB2YWx1ZXMgYXMgcG9zaXRpdmUsIG1lYXN1cmVkIHJlbGF0aXZlIHRvIHRoZSBsZWZ0KS5cbiAgICAgICAgLy8gU28gd2UgbmVlZCB0byBkZXRlcm1pbmUgd2hpY2ggYnJvd3NlciBiZWhhdmlvciB3ZSdyZSBkZWFsaW5nIHdpdGgsIGFuZCBtaW1pYyBpdC5cbiAgICAgICAgdmFyIG91dGVyUmVmID0gdGhpcy5fb3V0ZXJSZWY7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICBzd2l0Y2ggKGdldFJUTE9mZnNldFR5cGUoKSkge1xuICAgICAgICAgICAgY2FzZSAnbmVnYXRpdmUnOlxuICAgICAgICAgICAgICBvdXRlclJlZi5zY3JvbGxMZWZ0ID0gLXNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdwb3NpdGl2ZS1hc2NlbmRpbmcnOlxuICAgICAgICAgICAgICBvdXRlclJlZi5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHZhciBjbGllbnRXaWR0aCA9IG91dGVyUmVmLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgICAgICAgc2Nyb2xsV2lkdGggPSBvdXRlclJlZi5zY3JvbGxXaWR0aDtcbiAgICAgICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsTGVmdCA9IHNjcm9sbFdpZHRoIC0gY2xpZW50V2lkdGggLSBzY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsTGVmdCA9IE1hdGgubWF4KDAsIHNjcm9sbExlZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsVG9wID0gTWF0aC5tYXgoMCwgc2Nyb2xsVG9wKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2FsbFByb3BzQ2FsbGJhY2tzKCk7XG4gICAgfTtcblxuICAgIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICAgICAgY2FuY2VsVGltZW91dCh0aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczQgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3RoaXMkcHJvcHM0LmNoaWxkcmVuLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IF90aGlzJHByb3BzNC5jbGFzc05hbWUsXG4gICAgICAgICAgY29sdW1uQ291bnQgPSBfdGhpcyRwcm9wczQuY29sdW1uQ291bnQsXG4gICAgICAgICAgZGlyZWN0aW9uID0gX3RoaXMkcHJvcHM0LmRpcmVjdGlvbixcbiAgICAgICAgICBoZWlnaHQgPSBfdGhpcyRwcm9wczQuaGVpZ2h0LFxuICAgICAgICAgIGlubmVyUmVmID0gX3RoaXMkcHJvcHM0LmlubmVyUmVmLFxuICAgICAgICAgIGlubmVyRWxlbWVudFR5cGUgPSBfdGhpcyRwcm9wczQuaW5uZXJFbGVtZW50VHlwZSxcbiAgICAgICAgICBpbm5lclRhZ05hbWUgPSBfdGhpcyRwcm9wczQuaW5uZXJUYWdOYW1lLFxuICAgICAgICAgIGl0ZW1EYXRhID0gX3RoaXMkcHJvcHM0Lml0ZW1EYXRhLFxuICAgICAgICAgIF90aGlzJHByb3BzNCRpdGVtS2V5ID0gX3RoaXMkcHJvcHM0Lml0ZW1LZXksXG4gICAgICAgICAgaXRlbUtleSA9IF90aGlzJHByb3BzNCRpdGVtS2V5ID09PSB2b2lkIDAgPyBkZWZhdWx0SXRlbUtleSA6IF90aGlzJHByb3BzNCRpdGVtS2V5LFxuICAgICAgICAgIG91dGVyRWxlbWVudFR5cGUgPSBfdGhpcyRwcm9wczQub3V0ZXJFbGVtZW50VHlwZSxcbiAgICAgICAgICBvdXRlclRhZ05hbWUgPSBfdGhpcyRwcm9wczQub3V0ZXJUYWdOYW1lLFxuICAgICAgICAgIHJvd0NvdW50ID0gX3RoaXMkcHJvcHM0LnJvd0NvdW50LFxuICAgICAgICAgIHN0eWxlID0gX3RoaXMkcHJvcHM0LnN0eWxlLFxuICAgICAgICAgIHVzZUlzU2Nyb2xsaW5nID0gX3RoaXMkcHJvcHM0LnVzZUlzU2Nyb2xsaW5nLFxuICAgICAgICAgIHdpZHRoID0gX3RoaXMkcHJvcHM0LndpZHRoO1xuICAgICAgdmFyIGlzU2Nyb2xsaW5nID0gdGhpcy5zdGF0ZS5pc1Njcm9sbGluZztcblxuICAgICAgdmFyIF90aGlzJF9nZXRIb3Jpem9udGFsUiA9IHRoaXMuX2dldEhvcml6b250YWxSYW5nZVRvUmVuZGVyKCksXG4gICAgICAgICAgY29sdW1uU3RhcnRJbmRleCA9IF90aGlzJF9nZXRIb3Jpem9udGFsUlswXSxcbiAgICAgICAgICBjb2x1bW5TdG9wSW5kZXggPSBfdGhpcyRfZ2V0SG9yaXpvbnRhbFJbMV07XG5cbiAgICAgIHZhciBfdGhpcyRfZ2V0VmVydGljYWxSYW4gPSB0aGlzLl9nZXRWZXJ0aWNhbFJhbmdlVG9SZW5kZXIoKSxcbiAgICAgICAgICByb3dTdGFydEluZGV4ID0gX3RoaXMkX2dldFZlcnRpY2FsUmFuWzBdLFxuICAgICAgICAgIHJvd1N0b3BJbmRleCA9IF90aGlzJF9nZXRWZXJ0aWNhbFJhblsxXTtcblxuICAgICAgdmFyIGl0ZW1zID0gW107XG5cbiAgICAgIGlmIChjb2x1bW5Db3VudCA+IDAgJiYgcm93Q291bnQpIHtcbiAgICAgICAgZm9yICh2YXIgX3Jvd0luZGV4ID0gcm93U3RhcnRJbmRleDsgX3Jvd0luZGV4IDw9IHJvd1N0b3BJbmRleDsgX3Jvd0luZGV4KyspIHtcbiAgICAgICAgICBmb3IgKHZhciBfY29sdW1uSW5kZXggPSBjb2x1bW5TdGFydEluZGV4OyBfY29sdW1uSW5kZXggPD0gY29sdW1uU3RvcEluZGV4OyBfY29sdW1uSW5kZXgrKykge1xuICAgICAgICAgICAgaXRlbXMucHVzaChjcmVhdGVFbGVtZW50KGNoaWxkcmVuLCB7XG4gICAgICAgICAgICAgIGNvbHVtbkluZGV4OiBfY29sdW1uSW5kZXgsXG4gICAgICAgICAgICAgIGRhdGE6IGl0ZW1EYXRhLFxuICAgICAgICAgICAgICBpc1Njcm9sbGluZzogdXNlSXNTY3JvbGxpbmcgPyBpc1Njcm9sbGluZyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAga2V5OiBpdGVtS2V5KHtcbiAgICAgICAgICAgICAgICBjb2x1bW5JbmRleDogX2NvbHVtbkluZGV4LFxuICAgICAgICAgICAgICAgIGRhdGE6IGl0ZW1EYXRhLFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiBfcm93SW5kZXhcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHJvd0luZGV4OiBfcm93SW5kZXgsXG4gICAgICAgICAgICAgIHN0eWxlOiB0aGlzLl9nZXRJdGVtU3R5bGUoX3Jvd0luZGV4LCBfY29sdW1uSW5kZXgpXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IC8vIFJlYWQgdGhpcyB2YWx1ZSBBRlRFUiBpdGVtcyBoYXZlIGJlZW4gY3JlYXRlZCxcbiAgICAgIC8vIFNvIHRoZWlyIGFjdHVhbCBzaXplcyAoaWYgdmFyaWFibGUpIGFyZSB0YWtlbiBpbnRvIGNvbnNpZGVyYXRpb24uXG5cblxuICAgICAgdmFyIGVzdGltYXRlZFRvdGFsSGVpZ2h0ID0gZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQodGhpcy5wcm9wcywgdGhpcy5faW5zdGFuY2VQcm9wcyk7XG4gICAgICB2YXIgZXN0aW1hdGVkVG90YWxXaWR0aCA9IGdldEVzdGltYXRlZFRvdGFsV2lkdGgodGhpcy5wcm9wcywgdGhpcy5faW5zdGFuY2VQcm9wcyk7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChvdXRlckVsZW1lbnRUeXBlIHx8IG91dGVyVGFnTmFtZSB8fCAnZGl2Jywge1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgb25TY3JvbGw6IHRoaXMuX29uU2Nyb2xsLFxuICAgICAgICByZWY6IHRoaXMuX291dGVyUmVmU2V0dGVyLFxuICAgICAgICBzdHlsZTogX2V4dGVuZHMoe1xuICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICBvdmVyZmxvdzogJ2F1dG8nLFxuICAgICAgICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiAndG91Y2gnLFxuICAgICAgICAgIHdpbGxDaGFuZ2U6ICd0cmFuc2Zvcm0nLFxuICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uXG4gICAgICAgIH0sIHN0eWxlKVxuICAgICAgfSwgY3JlYXRlRWxlbWVudChpbm5lckVsZW1lbnRUeXBlIHx8IGlubmVyVGFnTmFtZSB8fCAnZGl2Jywge1xuICAgICAgICBjaGlsZHJlbjogaXRlbXMsXG4gICAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgaGVpZ2h0OiBlc3RpbWF0ZWRUb3RhbEhlaWdodCxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc1Njcm9sbGluZyA/ICdub25lJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB3aWR0aDogZXN0aW1hdGVkVG90YWxXaWR0aFxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIF9wcm90by5fY2FsbFByb3BzQ2FsbGJhY2tzID0gZnVuY3Rpb24gX2NhbGxQcm9wc0NhbGxiYWNrcygpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczUgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNvbHVtbkNvdW50ID0gX3RoaXMkcHJvcHM1LmNvbHVtbkNvdW50LFxuICAgICAgICAgIG9uSXRlbXNSZW5kZXJlZCA9IF90aGlzJHByb3BzNS5vbkl0ZW1zUmVuZGVyZWQsXG4gICAgICAgICAgb25TY3JvbGwgPSBfdGhpcyRwcm9wczUub25TY3JvbGwsXG4gICAgICAgICAgcm93Q291bnQgPSBfdGhpcyRwcm9wczUucm93Q291bnQ7XG5cbiAgICAgIGlmICh0eXBlb2Ygb25JdGVtc1JlbmRlcmVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChjb2x1bW5Db3VudCA+IDAgJiYgcm93Q291bnQgPiAwKSB7XG4gICAgICAgICAgdmFyIF90aGlzJF9nZXRIb3Jpem9udGFsUjIgPSB0aGlzLl9nZXRIb3Jpem9udGFsUmFuZ2VUb1JlbmRlcigpLFxuICAgICAgICAgICAgICBfb3ZlcnNjYW5Db2x1bW5TdGFydEluZGV4ID0gX3RoaXMkX2dldEhvcml6b250YWxSMlswXSxcbiAgICAgICAgICAgICAgX292ZXJzY2FuQ29sdW1uU3RvcEluZGV4ID0gX3RoaXMkX2dldEhvcml6b250YWxSMlsxXSxcbiAgICAgICAgICAgICAgX3Zpc2libGVDb2x1bW5TdGFydEluZGV4ID0gX3RoaXMkX2dldEhvcml6b250YWxSMlsyXSxcbiAgICAgICAgICAgICAgX3Zpc2libGVDb2x1bW5TdG9wSW5kZXggPSBfdGhpcyRfZ2V0SG9yaXpvbnRhbFIyWzNdO1xuXG4gICAgICAgICAgdmFyIF90aGlzJF9nZXRWZXJ0aWNhbFJhbjIgPSB0aGlzLl9nZXRWZXJ0aWNhbFJhbmdlVG9SZW5kZXIoKSxcbiAgICAgICAgICAgICAgX292ZXJzY2FuUm93U3RhcnRJbmRleCA9IF90aGlzJF9nZXRWZXJ0aWNhbFJhbjJbMF0sXG4gICAgICAgICAgICAgIF9vdmVyc2NhblJvd1N0b3BJbmRleCA9IF90aGlzJF9nZXRWZXJ0aWNhbFJhbjJbMV0sXG4gICAgICAgICAgICAgIF92aXNpYmxlUm93U3RhcnRJbmRleCA9IF90aGlzJF9nZXRWZXJ0aWNhbFJhbjJbMl0sXG4gICAgICAgICAgICAgIF92aXNpYmxlUm93U3RvcEluZGV4ID0gX3RoaXMkX2dldFZlcnRpY2FsUmFuMlszXTtcblxuICAgICAgICAgIHRoaXMuX2NhbGxPbkl0ZW1zUmVuZGVyZWQoX292ZXJzY2FuQ29sdW1uU3RhcnRJbmRleCwgX292ZXJzY2FuQ29sdW1uU3RvcEluZGV4LCBfb3ZlcnNjYW5Sb3dTdGFydEluZGV4LCBfb3ZlcnNjYW5Sb3dTdG9wSW5kZXgsIF92aXNpYmxlQ29sdW1uU3RhcnRJbmRleCwgX3Zpc2libGVDb2x1bW5TdG9wSW5kZXgsIF92aXNpYmxlUm93U3RhcnRJbmRleCwgX3Zpc2libGVSb3dTdG9wSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb25TY3JvbGwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIF90aGlzJHN0YXRlMyA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgICBfaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbiA9IF90aGlzJHN0YXRlMy5ob3Jpem9udGFsU2Nyb2xsRGlyZWN0aW9uLFxuICAgICAgICAgICAgX3Njcm9sbExlZnQgPSBfdGhpcyRzdGF0ZTMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIF9zY3JvbGxUb3AgPSBfdGhpcyRzdGF0ZTMuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgX3Njcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCA9IF90aGlzJHN0YXRlMy5zY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQsXG4gICAgICAgICAgICBfdmVydGljYWxTY3JvbGxEaXJlY3Rpb24gPSBfdGhpcyRzdGF0ZTMudmVydGljYWxTY3JvbGxEaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy5fY2FsbE9uU2Nyb2xsKF9zY3JvbGxMZWZ0LCBfc2Nyb2xsVG9wLCBfaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbiwgX3ZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uLCBfc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkKTtcbiAgICAgIH1cbiAgICB9OyAvLyBMYXppbHkgY3JlYXRlIGFuZCBjYWNoZSBpdGVtIHN0eWxlcyB3aGlsZSBzY3JvbGxpbmcsXG4gICAgLy8gU28gdGhhdCBwdXJlIGNvbXBvbmVudCBzQ1Ugd2lsbCBwcmV2ZW50IHJlLXJlbmRlcnMuXG4gICAgLy8gV2UgbWFpbnRhaW4gdGhpcyBjYWNoZSwgYW5kIHBhc3MgYSBzdHlsZSBwcm9wIHJhdGhlciB0aGFuIGluZGV4LFxuICAgIC8vIFNvIHRoYXQgTGlzdCBjYW4gY2xlYXIgY2FjaGVkIHN0eWxlcyBhbmQgZm9yY2UgaXRlbSByZS1yZW5kZXIgaWYgbmVjZXNzYXJ5LlxuXG5cbiAgICBfcHJvdG8uX2dldEhvcml6b250YWxSYW5nZVRvUmVuZGVyID0gZnVuY3Rpb24gX2dldEhvcml6b250YWxSYW5nZVRvUmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzNiA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY29sdW1uQ291bnQgPSBfdGhpcyRwcm9wczYuY29sdW1uQ291bnQsXG4gICAgICAgICAgb3ZlcnNjYW5Db2x1bW5Db3VudCA9IF90aGlzJHByb3BzNi5vdmVyc2NhbkNvbHVtbkNvdW50LFxuICAgICAgICAgIG92ZXJzY2FuQ29sdW1uc0NvdW50ID0gX3RoaXMkcHJvcHM2Lm92ZXJzY2FuQ29sdW1uc0NvdW50LFxuICAgICAgICAgIG92ZXJzY2FuQ291bnQgPSBfdGhpcyRwcm9wczYub3ZlcnNjYW5Db3VudCxcbiAgICAgICAgICByb3dDb3VudCA9IF90aGlzJHByb3BzNi5yb3dDb3VudDtcbiAgICAgIHZhciBfdGhpcyRzdGF0ZTQgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIGhvcml6b250YWxTY3JvbGxEaXJlY3Rpb24gPSBfdGhpcyRzdGF0ZTQuaG9yaXpvbnRhbFNjcm9sbERpcmVjdGlvbixcbiAgICAgICAgICBpc1Njcm9sbGluZyA9IF90aGlzJHN0YXRlNC5pc1Njcm9sbGluZyxcbiAgICAgICAgICBzY3JvbGxMZWZ0ID0gX3RoaXMkc3RhdGU0LnNjcm9sbExlZnQ7XG4gICAgICB2YXIgb3ZlcnNjYW5Db3VudFJlc29sdmVkID0gb3ZlcnNjYW5Db2x1bW5Db3VudCB8fCBvdmVyc2NhbkNvbHVtbnNDb3VudCB8fCBvdmVyc2NhbkNvdW50IHx8IDE7XG5cbiAgICAgIGlmIChjb2x1bW5Db3VudCA9PT0gMCB8fCByb3dDb3VudCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gWzAsIDAsIDAsIDBdO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhcnRJbmRleCA9IGdldENvbHVtblN0YXJ0SW5kZXhGb3JPZmZzZXQodGhpcy5wcm9wcywgc2Nyb2xsTGVmdCwgdGhpcy5faW5zdGFuY2VQcm9wcyk7XG4gICAgICB2YXIgc3RvcEluZGV4ID0gZ2V0Q29sdW1uU3RvcEluZGV4Rm9yU3RhcnRJbmRleCh0aGlzLnByb3BzLCBzdGFydEluZGV4LCBzY3JvbGxMZWZ0LCB0aGlzLl9pbnN0YW5jZVByb3BzKTsgLy8gT3ZlcnNjYW4gYnkgb25lIGl0ZW0gaW4gZWFjaCBkaXJlY3Rpb24gc28gdGhhdCB0YWIvZm9jdXMgd29ya3MuXG4gICAgICAvLyBJZiB0aGVyZSBpc24ndCBhdCBsZWFzdCBvbmUgZXh0cmEgaXRlbSwgdGFiIGxvb3BzIGJhY2sgYXJvdW5kLlxuXG4gICAgICB2YXIgb3ZlcnNjYW5CYWNrd2FyZCA9ICFpc1Njcm9sbGluZyB8fCBob3Jpem9udGFsU2Nyb2xsRGlyZWN0aW9uID09PSAnYmFja3dhcmQnID8gTWF0aC5tYXgoMSwgb3ZlcnNjYW5Db3VudFJlc29sdmVkKSA6IDE7XG4gICAgICB2YXIgb3ZlcnNjYW5Gb3J3YXJkID0gIWlzU2Nyb2xsaW5nIHx8IGhvcml6b250YWxTY3JvbGxEaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IE1hdGgubWF4KDEsIG92ZXJzY2FuQ291bnRSZXNvbHZlZCkgOiAxO1xuICAgICAgcmV0dXJuIFtNYXRoLm1heCgwLCBzdGFydEluZGV4IC0gb3ZlcnNjYW5CYWNrd2FyZCksIE1hdGgubWF4KDAsIE1hdGgubWluKGNvbHVtbkNvdW50IC0gMSwgc3RvcEluZGV4ICsgb3ZlcnNjYW5Gb3J3YXJkKSksIHN0YXJ0SW5kZXgsIHN0b3BJbmRleF07XG4gICAgfTtcblxuICAgIF9wcm90by5fZ2V0VmVydGljYWxSYW5nZVRvUmVuZGVyID0gZnVuY3Rpb24gX2dldFZlcnRpY2FsUmFuZ2VUb1JlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wczcgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIGNvbHVtbkNvdW50ID0gX3RoaXMkcHJvcHM3LmNvbHVtbkNvdW50LFxuICAgICAgICAgIG92ZXJzY2FuQ291bnQgPSBfdGhpcyRwcm9wczcub3ZlcnNjYW5Db3VudCxcbiAgICAgICAgICBvdmVyc2NhblJvd0NvdW50ID0gX3RoaXMkcHJvcHM3Lm92ZXJzY2FuUm93Q291bnQsXG4gICAgICAgICAgb3ZlcnNjYW5Sb3dzQ291bnQgPSBfdGhpcyRwcm9wczcub3ZlcnNjYW5Sb3dzQ291bnQsXG4gICAgICAgICAgcm93Q291bnQgPSBfdGhpcyRwcm9wczcucm93Q291bnQ7XG4gICAgICB2YXIgX3RoaXMkc3RhdGU1ID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBpc1Njcm9sbGluZyA9IF90aGlzJHN0YXRlNS5pc1Njcm9sbGluZyxcbiAgICAgICAgICB2ZXJ0aWNhbFNjcm9sbERpcmVjdGlvbiA9IF90aGlzJHN0YXRlNS52ZXJ0aWNhbFNjcm9sbERpcmVjdGlvbixcbiAgICAgICAgICBzY3JvbGxUb3AgPSBfdGhpcyRzdGF0ZTUuc2Nyb2xsVG9wO1xuICAgICAgdmFyIG92ZXJzY2FuQ291bnRSZXNvbHZlZCA9IG92ZXJzY2FuUm93Q291bnQgfHwgb3ZlcnNjYW5Sb3dzQ291bnQgfHwgb3ZlcnNjYW5Db3VudCB8fCAxO1xuXG4gICAgICBpZiAoY29sdW1uQ291bnQgPT09IDAgfHwgcm93Q291bnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFswLCAwLCAwLCAwXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXJ0SW5kZXggPSBnZXRSb3dTdGFydEluZGV4Rm9yT2Zmc2V0KHRoaXMucHJvcHMsIHNjcm9sbFRvcCwgdGhpcy5faW5zdGFuY2VQcm9wcyk7XG4gICAgICB2YXIgc3RvcEluZGV4ID0gZ2V0Um93U3RvcEluZGV4Rm9yU3RhcnRJbmRleCh0aGlzLnByb3BzLCBzdGFydEluZGV4LCBzY3JvbGxUb3AsIHRoaXMuX2luc3RhbmNlUHJvcHMpOyAvLyBPdmVyc2NhbiBieSBvbmUgaXRlbSBpbiBlYWNoIGRpcmVjdGlvbiBzbyB0aGF0IHRhYi9mb2N1cyB3b3Jrcy5cbiAgICAgIC8vIElmIHRoZXJlIGlzbid0IGF0IGxlYXN0IG9uZSBleHRyYSBpdGVtLCB0YWIgbG9vcHMgYmFjayBhcm91bmQuXG5cbiAgICAgIHZhciBvdmVyc2NhbkJhY2t3YXJkID0gIWlzU2Nyb2xsaW5nIHx8IHZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uID09PSAnYmFja3dhcmQnID8gTWF0aC5tYXgoMSwgb3ZlcnNjYW5Db3VudFJlc29sdmVkKSA6IDE7XG4gICAgICB2YXIgb3ZlcnNjYW5Gb3J3YXJkID0gIWlzU2Nyb2xsaW5nIHx8IHZlcnRpY2FsU2Nyb2xsRGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBNYXRoLm1heCgxLCBvdmVyc2NhbkNvdW50UmVzb2x2ZWQpIDogMTtcbiAgICAgIHJldHVybiBbTWF0aC5tYXgoMCwgc3RhcnRJbmRleCAtIG92ZXJzY2FuQmFja3dhcmQpLCBNYXRoLm1heCgwLCBNYXRoLm1pbihyb3dDb3VudCAtIDEsIHN0b3BJbmRleCArIG92ZXJzY2FuRm9yd2FyZCkpLCBzdGFydEluZGV4LCBzdG9wSW5kZXhdO1xuICAgIH07XG5cbiAgICByZXR1cm4gR3JpZDtcbiAgfShQdXJlQ29tcG9uZW50KSwgX2NsYXNzLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXJlY3Rpb246ICdsdHInLFxuICAgIGl0ZW1EYXRhOiB1bmRlZmluZWQsXG4gICAgdXNlSXNTY3JvbGxpbmc6IGZhbHNlXG4gIH0sIF90ZW1wO1xufVxuXG52YXIgdmFsaWRhdGVTaGFyZWRQcm9wcyA9IGZ1bmN0aW9uIHZhbGlkYXRlU2hhcmVkUHJvcHMoX3JlZjUsIF9yZWY2KSB7XG4gIHZhciBjaGlsZHJlbiA9IF9yZWY1LmNoaWxkcmVuLFxuICAgICAgZGlyZWN0aW9uID0gX3JlZjUuZGlyZWN0aW9uLFxuICAgICAgaGVpZ2h0ID0gX3JlZjUuaGVpZ2h0LFxuICAgICAgaW5uZXJUYWdOYW1lID0gX3JlZjUuaW5uZXJUYWdOYW1lLFxuICAgICAgb3V0ZXJUYWdOYW1lID0gX3JlZjUub3V0ZXJUYWdOYW1lLFxuICAgICAgb3ZlcnNjYW5Db2x1bW5zQ291bnQgPSBfcmVmNS5vdmVyc2NhbkNvbHVtbnNDb3VudCxcbiAgICAgIG92ZXJzY2FuQ291bnQgPSBfcmVmNS5vdmVyc2NhbkNvdW50LFxuICAgICAgb3ZlcnNjYW5Sb3dzQ291bnQgPSBfcmVmNS5vdmVyc2NhblJvd3NDb3VudCxcbiAgICAgIHdpZHRoID0gX3JlZjUud2lkdGg7XG4gIHZhciBpbnN0YW5jZSA9IF9yZWY2Lmluc3RhbmNlO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKHR5cGVvZiBvdmVyc2NhbkNvdW50ID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKGRldldhcm5pbmdzT3ZlcnNjYW5Db3VudCAmJiAhZGV2V2FybmluZ3NPdmVyc2NhbkNvdW50LmhhcyhpbnN0YW5jZSkpIHtcbiAgICAgICAgZGV2V2FybmluZ3NPdmVyc2NhbkNvdW50LmFkZChpbnN0YW5jZSk7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIG92ZXJzY2FuQ291bnQgcHJvcCBoYXMgYmVlbiBkZXByZWNhdGVkLiAnICsgJ1BsZWFzZSB1c2UgdGhlIG92ZXJzY2FuQ29sdW1uQ291bnQgYW5kIG92ZXJzY2FuUm93Q291bnQgcHJvcHMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG92ZXJzY2FuQ29sdW1uc0NvdW50ID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb3ZlcnNjYW5Sb3dzQ291bnQgPT09ICdudW1iZXInKSB7XG4gICAgICBpZiAoZGV2V2FybmluZ3NPdmVyc2NhblJvd3NDb2x1bW5zQ291bnQgJiYgIWRldldhcm5pbmdzT3ZlcnNjYW5Sb3dzQ29sdW1uc0NvdW50LmhhcyhpbnN0YW5jZSkpIHtcbiAgICAgICAgZGV2V2FybmluZ3NPdmVyc2NhblJvd3NDb2x1bW5zQ291bnQuYWRkKGluc3RhbmNlKTtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgb3ZlcnNjYW5Db2x1bW5zQ291bnQgYW5kIG92ZXJzY2FuUm93c0NvdW50IHByb3BzIGhhdmUgYmVlbiBkZXByZWNhdGVkLiAnICsgJ1BsZWFzZSB1c2UgdGhlIG92ZXJzY2FuQ29sdW1uQ291bnQgYW5kIG92ZXJzY2FuUm93Q291bnQgcHJvcHMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5uZXJUYWdOYW1lICE9IG51bGwgfHwgb3V0ZXJUYWdOYW1lICE9IG51bGwpIHtcbiAgICAgIGlmIChkZXZXYXJuaW5nc1RhZ05hbWUgJiYgIWRldldhcm5pbmdzVGFnTmFtZS5oYXMoaW5zdGFuY2UpKSB7XG4gICAgICAgIGRldldhcm5pbmdzVGFnTmFtZS5hZGQoaW5zdGFuY2UpO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBpbm5lclRhZ05hbWUgYW5kIG91dGVyVGFnTmFtZSBwcm9wcyBoYXZlIGJlZW4gZGVwcmVjYXRlZC4gJyArICdQbGVhc2UgdXNlIHRoZSBpbm5lckVsZW1lbnRUeXBlIGFuZCBvdXRlckVsZW1lbnRUeXBlIHByb3BzIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwiY2hpbGRyZW5cIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgYSBSZWFjdCBjb21wb25lbnQuICcgKyAoXCJcXFwiXCIgKyAoY2hpbGRyZW4gPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY2hpbGRyZW4pICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSAnbHRyJzpcbiAgICAgIGNhc2UgJ3J0bCc6XG4gICAgICAgIC8vIFZhbGlkIHZhbHVlc1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0FuIGludmFsaWQgXCJkaXJlY3Rpb25cIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgZWl0aGVyIFwibHRyXCIgb3IgXCJydGxcIi4gJyArIChcIlxcXCJcIiArIGRpcmVjdGlvbiArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB3aWR0aCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwid2lkdGhcIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdHcmlkcyBtdXN0IHNwZWNpZnkgYSBudW1iZXIgZm9yIHdpZHRoLiAnICsgKFwiXFxcIlwiICsgKHdpZHRoID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHdpZHRoKSArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBoZWlnaHQgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcImhlaWdodFwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ0dyaWRzIG11c3Qgc3BlY2lmeSBhIG51bWJlciBmb3IgaGVpZ2h0LiAnICsgKFwiXFxcIlwiICsgKGhlaWdodCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBoZWlnaHQpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX0VTVElNQVRFRF9JVEVNX1NJWkUgPSA1MDtcblxudmFyIGdldEVzdGltYXRlZFRvdGFsSGVpZ2h0ID0gZnVuY3Rpb24gZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQoX3JlZiwgX3JlZjIpIHtcbiAgdmFyIHJvd0NvdW50ID0gX3JlZi5yb3dDb3VudDtcbiAgdmFyIHJvd01ldGFkYXRhTWFwID0gX3JlZjIucm93TWV0YWRhdGFNYXAsXG4gICAgICBlc3RpbWF0ZWRSb3dIZWlnaHQgPSBfcmVmMi5lc3RpbWF0ZWRSb3dIZWlnaHQsXG4gICAgICBsYXN0TWVhc3VyZWRSb3dJbmRleCA9IF9yZWYyLmxhc3RNZWFzdXJlZFJvd0luZGV4O1xuICB2YXIgdG90YWxTaXplT2ZNZWFzdXJlZFJvd3MgPSAwOyAvLyBFZGdlIGNhc2UgY2hlY2sgZm9yIHdoZW4gdGhlIG51bWJlciBvZiBpdGVtcyBkZWNyZWFzZXMgd2hpbGUgYSBzY3JvbGwgaXMgaW4gcHJvZ3Jlc3MuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9idmF1Z2huL3JlYWN0LXdpbmRvdy9wdWxsLzEzOFxuXG4gIGlmIChsYXN0TWVhc3VyZWRSb3dJbmRleCA+PSByb3dDb3VudCkge1xuICAgIGxhc3RNZWFzdXJlZFJvd0luZGV4ID0gcm93Q291bnQgLSAxO1xuICB9XG5cbiAgaWYgKGxhc3RNZWFzdXJlZFJvd0luZGV4ID49IDApIHtcbiAgICB2YXIgaXRlbU1ldGFkYXRhID0gcm93TWV0YWRhdGFNYXBbbGFzdE1lYXN1cmVkUm93SW5kZXhdO1xuICAgIHRvdGFsU2l6ZU9mTWVhc3VyZWRSb3dzID0gaXRlbU1ldGFkYXRhLm9mZnNldCArIGl0ZW1NZXRhZGF0YS5zaXplO1xuICB9XG5cbiAgdmFyIG51bVVubWVhc3VyZWRJdGVtcyA9IHJvd0NvdW50IC0gbGFzdE1lYXN1cmVkUm93SW5kZXggLSAxO1xuICB2YXIgdG90YWxTaXplT2ZVbm1lYXN1cmVkSXRlbXMgPSBudW1Vbm1lYXN1cmVkSXRlbXMgKiBlc3RpbWF0ZWRSb3dIZWlnaHQ7XG4gIHJldHVybiB0b3RhbFNpemVPZk1lYXN1cmVkUm93cyArIHRvdGFsU2l6ZU9mVW5tZWFzdXJlZEl0ZW1zO1xufTtcblxudmFyIGdldEVzdGltYXRlZFRvdGFsV2lkdGggPSBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRUb3RhbFdpZHRoKF9yZWYzLCBfcmVmNCkge1xuICB2YXIgY29sdW1uQ291bnQgPSBfcmVmMy5jb2x1bW5Db3VudDtcbiAgdmFyIGNvbHVtbk1ldGFkYXRhTWFwID0gX3JlZjQuY29sdW1uTWV0YWRhdGFNYXAsXG4gICAgICBlc3RpbWF0ZWRDb2x1bW5XaWR0aCA9IF9yZWY0LmVzdGltYXRlZENvbHVtbldpZHRoLFxuICAgICAgbGFzdE1lYXN1cmVkQ29sdW1uSW5kZXggPSBfcmVmNC5sYXN0TWVhc3VyZWRDb2x1bW5JbmRleDtcbiAgdmFyIHRvdGFsU2l6ZU9mTWVhc3VyZWRSb3dzID0gMDsgLy8gRWRnZSBjYXNlIGNoZWNrIGZvciB3aGVuIHRoZSBudW1iZXIgb2YgaXRlbXMgZGVjcmVhc2VzIHdoaWxlIGEgc2Nyb2xsIGlzIGluIHByb2dyZXNzLlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC13aW5kb3cvcHVsbC8xMzhcblxuICBpZiAobGFzdE1lYXN1cmVkQ29sdW1uSW5kZXggPj0gY29sdW1uQ291bnQpIHtcbiAgICBsYXN0TWVhc3VyZWRDb2x1bW5JbmRleCA9IGNvbHVtbkNvdW50IC0gMTtcbiAgfVxuXG4gIGlmIChsYXN0TWVhc3VyZWRDb2x1bW5JbmRleCA+PSAwKSB7XG4gICAgdmFyIGl0ZW1NZXRhZGF0YSA9IGNvbHVtbk1ldGFkYXRhTWFwW2xhc3RNZWFzdXJlZENvbHVtbkluZGV4XTtcbiAgICB0b3RhbFNpemVPZk1lYXN1cmVkUm93cyA9IGl0ZW1NZXRhZGF0YS5vZmZzZXQgKyBpdGVtTWV0YWRhdGEuc2l6ZTtcbiAgfVxuXG4gIHZhciBudW1Vbm1lYXN1cmVkSXRlbXMgPSBjb2x1bW5Db3VudCAtIGxhc3RNZWFzdXJlZENvbHVtbkluZGV4IC0gMTtcbiAgdmFyIHRvdGFsU2l6ZU9mVW5tZWFzdXJlZEl0ZW1zID0gbnVtVW5tZWFzdXJlZEl0ZW1zICogZXN0aW1hdGVkQ29sdW1uV2lkdGg7XG4gIHJldHVybiB0b3RhbFNpemVPZk1lYXN1cmVkUm93cyArIHRvdGFsU2l6ZU9mVW5tZWFzdXJlZEl0ZW1zO1xufTtcblxudmFyIGdldEl0ZW1NZXRhZGF0YSA9IGZ1bmN0aW9uIGdldEl0ZW1NZXRhZGF0YShpdGVtVHlwZSwgcHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKSB7XG4gIHZhciBpdGVtTWV0YWRhdGFNYXAsIGl0ZW1TaXplLCBsYXN0TWVhc3VyZWRJbmRleDtcblxuICBpZiAoaXRlbVR5cGUgPT09ICdjb2x1bW4nKSB7XG4gICAgaXRlbU1ldGFkYXRhTWFwID0gaW5zdGFuY2VQcm9wcy5jb2x1bW5NZXRhZGF0YU1hcDtcbiAgICBpdGVtU2l6ZSA9IHByb3BzLmNvbHVtbldpZHRoO1xuICAgIGxhc3RNZWFzdXJlZEluZGV4ID0gaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRDb2x1bW5JbmRleDtcbiAgfSBlbHNlIHtcbiAgICBpdGVtTWV0YWRhdGFNYXAgPSBpbnN0YW5jZVByb3BzLnJvd01ldGFkYXRhTWFwO1xuICAgIGl0ZW1TaXplID0gcHJvcHMucm93SGVpZ2h0O1xuICAgIGxhc3RNZWFzdXJlZEluZGV4ID0gaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRSb3dJbmRleDtcbiAgfVxuXG4gIGlmIChpbmRleCA+IGxhc3RNZWFzdXJlZEluZGV4KSB7XG4gICAgdmFyIG9mZnNldCA9IDA7XG5cbiAgICBpZiAobGFzdE1lYXN1cmVkSW5kZXggPj0gMCkge1xuICAgICAgdmFyIGl0ZW1NZXRhZGF0YSA9IGl0ZW1NZXRhZGF0YU1hcFtsYXN0TWVhc3VyZWRJbmRleF07XG4gICAgICBvZmZzZXQgPSBpdGVtTWV0YWRhdGEub2Zmc2V0ICsgaXRlbU1ldGFkYXRhLnNpemU7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IGxhc3RNZWFzdXJlZEluZGV4ICsgMTsgaSA8PSBpbmRleDsgaSsrKSB7XG4gICAgICB2YXIgc2l6ZSA9IGl0ZW1TaXplKGkpO1xuICAgICAgaXRlbU1ldGFkYXRhTWFwW2ldID0ge1xuICAgICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgc2l6ZTogc2l6ZVxuICAgICAgfTtcbiAgICAgIG9mZnNldCArPSBzaXplO1xuICAgIH1cblxuICAgIGlmIChpdGVtVHlwZSA9PT0gJ2NvbHVtbicpIHtcbiAgICAgIGluc3RhbmNlUHJvcHMubGFzdE1lYXN1cmVkQ29sdW1uSW5kZXggPSBpbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRSb3dJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpdGVtTWV0YWRhdGFNYXBbaW5kZXhdO1xufTtcblxudmFyIGZpbmROZWFyZXN0SXRlbSA9IGZ1bmN0aW9uIGZpbmROZWFyZXN0SXRlbShpdGVtVHlwZSwgcHJvcHMsIGluc3RhbmNlUHJvcHMsIG9mZnNldCkge1xuICB2YXIgaXRlbU1ldGFkYXRhTWFwLCBsYXN0TWVhc3VyZWRJbmRleDtcblxuICBpZiAoaXRlbVR5cGUgPT09ICdjb2x1bW4nKSB7XG4gICAgaXRlbU1ldGFkYXRhTWFwID0gaW5zdGFuY2VQcm9wcy5jb2x1bW5NZXRhZGF0YU1hcDtcbiAgICBsYXN0TWVhc3VyZWRJbmRleCA9IGluc3RhbmNlUHJvcHMubGFzdE1lYXN1cmVkQ29sdW1uSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgaXRlbU1ldGFkYXRhTWFwID0gaW5zdGFuY2VQcm9wcy5yb3dNZXRhZGF0YU1hcDtcbiAgICBsYXN0TWVhc3VyZWRJbmRleCA9IGluc3RhbmNlUHJvcHMubGFzdE1lYXN1cmVkUm93SW5kZXg7XG4gIH1cblxuICB2YXIgbGFzdE1lYXN1cmVkSXRlbU9mZnNldCA9IGxhc3RNZWFzdXJlZEluZGV4ID4gMCA/IGl0ZW1NZXRhZGF0YU1hcFtsYXN0TWVhc3VyZWRJbmRleF0ub2Zmc2V0IDogMDtcblxuICBpZiAobGFzdE1lYXN1cmVkSXRlbU9mZnNldCA+PSBvZmZzZXQpIHtcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IG1lYXN1cmVkIGl0ZW1zIHdpdGhpbiB0aGlzIHJhbmdlIGp1c3QgdXNlIGEgYmluYXJ5IHNlYXJjaCBhcyBpdCdzIGZhc3Rlci5cbiAgICByZXR1cm4gZmluZE5lYXJlc3RJdGVtQmluYXJ5U2VhcmNoKGl0ZW1UeXBlLCBwcm9wcywgaW5zdGFuY2VQcm9wcywgbGFzdE1lYXN1cmVkSW5kZXgsIDAsIG9mZnNldCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgd2UgaGF2ZW4ndCB5ZXQgbWVhc3VyZWQgdGhpcyBoaWdoLCBmYWxsYmFjayB0byBhbiBleHBvbmVudGlhbCBzZWFyY2ggd2l0aCBhbiBpbm5lciBiaW5hcnkgc2VhcmNoLlxuICAgIC8vIFRoZSBleHBvbmVudGlhbCBzZWFyY2ggYXZvaWRzIHByZS1jb21wdXRpbmcgc2l6ZXMgZm9yIHRoZSBmdWxsIHNldCBvZiBpdGVtcyBhcyBhIGJpbmFyeSBzZWFyY2ggd291bGQuXG4gICAgLy8gVGhlIG92ZXJhbGwgY29tcGxleGl0eSBmb3IgdGhpcyBhcHByb2FjaCBpcyBPKGxvZyBuKS5cbiAgICByZXR1cm4gZmluZE5lYXJlc3RJdGVtRXhwb25lbnRpYWxTZWFyY2goaXRlbVR5cGUsIHByb3BzLCBpbnN0YW5jZVByb3BzLCBNYXRoLm1heCgwLCBsYXN0TWVhc3VyZWRJbmRleCksIG9mZnNldCk7XG4gIH1cbn07XG5cbnZhciBmaW5kTmVhcmVzdEl0ZW1CaW5hcnlTZWFyY2ggPSBmdW5jdGlvbiBmaW5kTmVhcmVzdEl0ZW1CaW5hcnlTZWFyY2goaXRlbVR5cGUsIHByb3BzLCBpbnN0YW5jZVByb3BzLCBoaWdoLCBsb3csIG9mZnNldCkge1xuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcbiAgICB2YXIgbWlkZGxlID0gbG93ICsgTWF0aC5mbG9vcigoaGlnaCAtIGxvdykgLyAyKTtcbiAgICB2YXIgY3VycmVudE9mZnNldCA9IGdldEl0ZW1NZXRhZGF0YShpdGVtVHlwZSwgcHJvcHMsIG1pZGRsZSwgaW5zdGFuY2VQcm9wcykub2Zmc2V0O1xuXG4gICAgaWYgKGN1cnJlbnRPZmZzZXQgPT09IG9mZnNldCkge1xuICAgICAgcmV0dXJuIG1pZGRsZTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRPZmZzZXQgPCBvZmZzZXQpIHtcbiAgICAgIGxvdyA9IG1pZGRsZSArIDE7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50T2Zmc2V0ID4gb2Zmc2V0KSB7XG4gICAgICBoaWdoID0gbWlkZGxlIC0gMTtcbiAgICB9XG4gIH1cblxuICBpZiAobG93ID4gMCkge1xuICAgIHJldHVybiBsb3cgLSAxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59O1xuXG52YXIgZmluZE5lYXJlc3RJdGVtRXhwb25lbnRpYWxTZWFyY2ggPSBmdW5jdGlvbiBmaW5kTmVhcmVzdEl0ZW1FeHBvbmVudGlhbFNlYXJjaChpdGVtVHlwZSwgcHJvcHMsIGluc3RhbmNlUHJvcHMsIGluZGV4LCBvZmZzZXQpIHtcbiAgdmFyIGl0ZW1Db3VudCA9IGl0ZW1UeXBlID09PSAnY29sdW1uJyA/IHByb3BzLmNvbHVtbkNvdW50IDogcHJvcHMucm93Q291bnQ7XG4gIHZhciBpbnRlcnZhbCA9IDE7XG5cbiAgd2hpbGUgKGluZGV4IDwgaXRlbUNvdW50ICYmIGdldEl0ZW1NZXRhZGF0YShpdGVtVHlwZSwgcHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKS5vZmZzZXQgPCBvZmZzZXQpIHtcbiAgICBpbmRleCArPSBpbnRlcnZhbDtcbiAgICBpbnRlcnZhbCAqPSAyO1xuICB9XG5cbiAgcmV0dXJuIGZpbmROZWFyZXN0SXRlbUJpbmFyeVNlYXJjaChpdGVtVHlwZSwgcHJvcHMsIGluc3RhbmNlUHJvcHMsIE1hdGgubWluKGluZGV4LCBpdGVtQ291bnQgLSAxKSwgTWF0aC5mbG9vcihpbmRleCAvIDIpLCBvZmZzZXQpO1xufTtcblxudmFyIGdldE9mZnNldEZvckluZGV4QW5kQWxpZ25tZW50ID0gZnVuY3Rpb24gZ2V0T2Zmc2V0Rm9ySW5kZXhBbmRBbGlnbm1lbnQoaXRlbVR5cGUsIHByb3BzLCBpbmRleCwgYWxpZ24sIHNjcm9sbE9mZnNldCwgaW5zdGFuY2VQcm9wcywgc2Nyb2xsYmFyU2l6ZSkge1xuICB2YXIgc2l6ZSA9IGl0ZW1UeXBlID09PSAnY29sdW1uJyA/IHByb3BzLndpZHRoIDogcHJvcHMuaGVpZ2h0O1xuICB2YXIgaXRlbU1ldGFkYXRhID0gZ2V0SXRlbU1ldGFkYXRhKGl0ZW1UeXBlLCBwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpOyAvLyBHZXQgZXN0aW1hdGVkIHRvdGFsIHNpemUgYWZ0ZXIgSXRlbU1ldGFkYXRhIGlzIGNvbXB1dGVkLFxuICAvLyBUbyBlbnN1cmUgaXQgcmVmbGVjdHMgYWN0dWFsIG1lYXN1cmVtZW50cyBpbnN0ZWFkIG9mIGp1c3QgZXN0aW1hdGVzLlxuXG4gIHZhciBlc3RpbWF0ZWRUb3RhbFNpemUgPSBpdGVtVHlwZSA9PT0gJ2NvbHVtbicgPyBnZXRFc3RpbWF0ZWRUb3RhbFdpZHRoKHByb3BzLCBpbnN0YW5jZVByb3BzKSA6IGdldEVzdGltYXRlZFRvdGFsSGVpZ2h0KHByb3BzLCBpbnN0YW5jZVByb3BzKTtcbiAgdmFyIG1heE9mZnNldCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGVzdGltYXRlZFRvdGFsU2l6ZSAtIHNpemUsIGl0ZW1NZXRhZGF0YS5vZmZzZXQpKTtcbiAgdmFyIG1pbk9mZnNldCA9IE1hdGgubWF4KDAsIGl0ZW1NZXRhZGF0YS5vZmZzZXQgLSBzaXplICsgc2Nyb2xsYmFyU2l6ZSArIGl0ZW1NZXRhZGF0YS5zaXplKTtcblxuICBpZiAoYWxpZ24gPT09ICdzbWFydCcpIHtcbiAgICBpZiAoc2Nyb2xsT2Zmc2V0ID49IG1pbk9mZnNldCAtIHNpemUgJiYgc2Nyb2xsT2Zmc2V0IDw9IG1heE9mZnNldCArIHNpemUpIHtcbiAgICAgIGFsaWduID0gJ2F1dG8nO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGlnbiA9ICdjZW50ZXInO1xuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAoYWxpZ24pIHtcbiAgICBjYXNlICdzdGFydCc6XG4gICAgICByZXR1cm4gbWF4T2Zmc2V0O1xuXG4gICAgY2FzZSAnZW5kJzpcbiAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG5cbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgcmV0dXJuIE1hdGgucm91bmQobWluT2Zmc2V0ICsgKG1heE9mZnNldCAtIG1pbk9mZnNldCkgLyAyKTtcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAoc2Nyb2xsT2Zmc2V0ID49IG1pbk9mZnNldCAmJiBzY3JvbGxPZmZzZXQgPD0gbWF4T2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBzY3JvbGxPZmZzZXQ7XG4gICAgICB9IGVsc2UgaWYgKG1pbk9mZnNldCA+IG1heE9mZnNldCkge1xuICAgICAgICAvLyBCZWNhdXNlIHdlIG9ubHkgdGFrZSBpbnRvIGFjY291bnQgdGhlIHNjcm9sbGJhciBzaXplIHdoZW4gY2FsY3VsYXRpbmcgbWluT2Zmc2V0XG4gICAgICAgIC8vIHRoaXMgdmFsdWUgY2FuIGJlIGxhcmdlciB0aGFuIG1heE9mZnNldCB3aGVuIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICAgICAgcmV0dXJuIG1pbk9mZnNldDtcbiAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsT2Zmc2V0IDwgbWluT2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWF4T2Zmc2V0O1xuICAgICAgfVxuXG4gIH1cbn07XG5cbnZhciBWYXJpYWJsZVNpemVHcmlkID1cbi8qI19fUFVSRV9fKi9cbmNyZWF0ZUdyaWRDb21wb25lbnQoe1xuICBnZXRDb2x1bW5PZmZzZXQ6IGZ1bmN0aW9uIGdldENvbHVtbk9mZnNldChwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpIHtcbiAgICByZXR1cm4gZ2V0SXRlbU1ldGFkYXRhKCdjb2x1bW4nLCBwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpLm9mZnNldDtcbiAgfSxcbiAgZ2V0Q29sdW1uU3RhcnRJbmRleEZvck9mZnNldDogZnVuY3Rpb24gZ2V0Q29sdW1uU3RhcnRJbmRleEZvck9mZnNldChwcm9wcywgc2Nyb2xsTGVmdCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHJldHVybiBmaW5kTmVhcmVzdEl0ZW0oJ2NvbHVtbicsIHByb3BzLCBpbnN0YW5jZVByb3BzLCBzY3JvbGxMZWZ0KTtcbiAgfSxcbiAgZ2V0Q29sdW1uU3RvcEluZGV4Rm9yU3RhcnRJbmRleDogZnVuY3Rpb24gZ2V0Q29sdW1uU3RvcEluZGV4Rm9yU3RhcnRJbmRleChwcm9wcywgc3RhcnRJbmRleCwgc2Nyb2xsTGVmdCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHZhciBjb2x1bW5Db3VudCA9IHByb3BzLmNvbHVtbkNvdW50LFxuICAgICAgICB3aWR0aCA9IHByb3BzLndpZHRoO1xuICAgIHZhciBpdGVtTWV0YWRhdGEgPSBnZXRJdGVtTWV0YWRhdGEoJ2NvbHVtbicsIHByb3BzLCBzdGFydEluZGV4LCBpbnN0YW5jZVByb3BzKTtcbiAgICB2YXIgbWF4T2Zmc2V0ID0gc2Nyb2xsTGVmdCArIHdpZHRoO1xuICAgIHZhciBvZmZzZXQgPSBpdGVtTWV0YWRhdGEub2Zmc2V0ICsgaXRlbU1ldGFkYXRhLnNpemU7XG4gICAgdmFyIHN0b3BJbmRleCA9IHN0YXJ0SW5kZXg7XG5cbiAgICB3aGlsZSAoc3RvcEluZGV4IDwgY29sdW1uQ291bnQgLSAxICYmIG9mZnNldCA8IG1heE9mZnNldCkge1xuICAgICAgc3RvcEluZGV4Kys7XG4gICAgICBvZmZzZXQgKz0gZ2V0SXRlbU1ldGFkYXRhKCdjb2x1bW4nLCBwcm9wcywgc3RvcEluZGV4LCBpbnN0YW5jZVByb3BzKS5zaXplO1xuICAgIH1cblxuICAgIHJldHVybiBzdG9wSW5kZXg7XG4gIH0sXG4gIGdldENvbHVtbldpZHRoOiBmdW5jdGlvbiBnZXRDb2x1bW5XaWR0aChwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2VQcm9wcy5jb2x1bW5NZXRhZGF0YU1hcFtpbmRleF0uc2l6ZTtcbiAgfSxcbiAgZ2V0RXN0aW1hdGVkVG90YWxIZWlnaHQ6IGdldEVzdGltYXRlZFRvdGFsSGVpZ2h0LFxuICBnZXRFc3RpbWF0ZWRUb3RhbFdpZHRoOiBnZXRFc3RpbWF0ZWRUb3RhbFdpZHRoLFxuICBnZXRPZmZzZXRGb3JDb2x1bW5BbmRBbGlnbm1lbnQ6IGZ1bmN0aW9uIGdldE9mZnNldEZvckNvbHVtbkFuZEFsaWdubWVudChwcm9wcywgaW5kZXgsIGFsaWduLCBzY3JvbGxPZmZzZXQsIGluc3RhbmNlUHJvcHMsIHNjcm9sbGJhclNpemUpIHtcbiAgICByZXR1cm4gZ2V0T2Zmc2V0Rm9ySW5kZXhBbmRBbGlnbm1lbnQoJ2NvbHVtbicsIHByb3BzLCBpbmRleCwgYWxpZ24sIHNjcm9sbE9mZnNldCwgaW5zdGFuY2VQcm9wcywgc2Nyb2xsYmFyU2l6ZSk7XG4gIH0sXG4gIGdldE9mZnNldEZvclJvd0FuZEFsaWdubWVudDogZnVuY3Rpb24gZ2V0T2Zmc2V0Rm9yUm93QW5kQWxpZ25tZW50KHByb3BzLCBpbmRleCwgYWxpZ24sIHNjcm9sbE9mZnNldCwgaW5zdGFuY2VQcm9wcywgc2Nyb2xsYmFyU2l6ZSkge1xuICAgIHJldHVybiBnZXRPZmZzZXRGb3JJbmRleEFuZEFsaWdubWVudCgncm93JywgcHJvcHMsIGluZGV4LCBhbGlnbiwgc2Nyb2xsT2Zmc2V0LCBpbnN0YW5jZVByb3BzLCBzY3JvbGxiYXJTaXplKTtcbiAgfSxcbiAgZ2V0Um93T2Zmc2V0OiBmdW5jdGlvbiBnZXRSb3dPZmZzZXQocHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKSB7XG4gICAgcmV0dXJuIGdldEl0ZW1NZXRhZGF0YSgncm93JywgcHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKS5vZmZzZXQ7XG4gIH0sXG4gIGdldFJvd0hlaWdodDogZnVuY3Rpb24gZ2V0Um93SGVpZ2h0KHByb3BzLCBpbmRleCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHJldHVybiBpbnN0YW5jZVByb3BzLnJvd01ldGFkYXRhTWFwW2luZGV4XS5zaXplO1xuICB9LFxuICBnZXRSb3dTdGFydEluZGV4Rm9yT2Zmc2V0OiBmdW5jdGlvbiBnZXRSb3dTdGFydEluZGV4Rm9yT2Zmc2V0KHByb3BzLCBzY3JvbGxUb3AsIGluc3RhbmNlUHJvcHMpIHtcbiAgICByZXR1cm4gZmluZE5lYXJlc3RJdGVtKCdyb3cnLCBwcm9wcywgaW5zdGFuY2VQcm9wcywgc2Nyb2xsVG9wKTtcbiAgfSxcbiAgZ2V0Um93U3RvcEluZGV4Rm9yU3RhcnRJbmRleDogZnVuY3Rpb24gZ2V0Um93U3RvcEluZGV4Rm9yU3RhcnRJbmRleChwcm9wcywgc3RhcnRJbmRleCwgc2Nyb2xsVG9wLCBpbnN0YW5jZVByb3BzKSB7XG4gICAgdmFyIHJvd0NvdW50ID0gcHJvcHMucm93Q291bnQsXG4gICAgICAgIGhlaWdodCA9IHByb3BzLmhlaWdodDtcbiAgICB2YXIgaXRlbU1ldGFkYXRhID0gZ2V0SXRlbU1ldGFkYXRhKCdyb3cnLCBwcm9wcywgc3RhcnRJbmRleCwgaW5zdGFuY2VQcm9wcyk7XG4gICAgdmFyIG1heE9mZnNldCA9IHNjcm9sbFRvcCArIGhlaWdodDtcbiAgICB2YXIgb2Zmc2V0ID0gaXRlbU1ldGFkYXRhLm9mZnNldCArIGl0ZW1NZXRhZGF0YS5zaXplO1xuICAgIHZhciBzdG9wSW5kZXggPSBzdGFydEluZGV4O1xuXG4gICAgd2hpbGUgKHN0b3BJbmRleCA8IHJvd0NvdW50IC0gMSAmJiBvZmZzZXQgPCBtYXhPZmZzZXQpIHtcbiAgICAgIHN0b3BJbmRleCsrO1xuICAgICAgb2Zmc2V0ICs9IGdldEl0ZW1NZXRhZGF0YSgncm93JywgcHJvcHMsIHN0b3BJbmRleCwgaW5zdGFuY2VQcm9wcykuc2l6ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RvcEluZGV4O1xuICB9LFxuICBpbml0SW5zdGFuY2VQcm9wczogZnVuY3Rpb24gaW5pdEluc3RhbmNlUHJvcHMocHJvcHMsIGluc3RhbmNlKSB7XG4gICAgdmFyIF9yZWY1ID0gcHJvcHMsXG4gICAgICAgIGVzdGltYXRlZENvbHVtbldpZHRoID0gX3JlZjUuZXN0aW1hdGVkQ29sdW1uV2lkdGgsXG4gICAgICAgIGVzdGltYXRlZFJvd0hlaWdodCA9IF9yZWY1LmVzdGltYXRlZFJvd0hlaWdodDtcbiAgICB2YXIgaW5zdGFuY2VQcm9wcyA9IHtcbiAgICAgIGNvbHVtbk1ldGFkYXRhTWFwOiB7fSxcbiAgICAgIGVzdGltYXRlZENvbHVtbldpZHRoOiBlc3RpbWF0ZWRDb2x1bW5XaWR0aCB8fCBERUZBVUxUX0VTVElNQVRFRF9JVEVNX1NJWkUsXG4gICAgICBlc3RpbWF0ZWRSb3dIZWlnaHQ6IGVzdGltYXRlZFJvd0hlaWdodCB8fCBERUZBVUxUX0VTVElNQVRFRF9JVEVNX1NJWkUsXG4gICAgICBsYXN0TWVhc3VyZWRDb2x1bW5JbmRleDogLTEsXG4gICAgICBsYXN0TWVhc3VyZWRSb3dJbmRleDogLTEsXG4gICAgICByb3dNZXRhZGF0YU1hcDoge31cbiAgICB9O1xuXG4gICAgaW5zdGFuY2UucmVzZXRBZnRlckNvbHVtbkluZGV4ID0gZnVuY3Rpb24gKGNvbHVtbkluZGV4LCBzaG91bGRGb3JjZVVwZGF0ZSkge1xuICAgICAgaWYgKHNob3VsZEZvcmNlVXBkYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgc2hvdWxkRm9yY2VVcGRhdGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpbnN0YW5jZS5yZXNldEFmdGVySW5kaWNlcyh7XG4gICAgICAgIGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleCxcbiAgICAgICAgc2hvdWxkRm9yY2VVcGRhdGU6IHNob3VsZEZvcmNlVXBkYXRlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaW5zdGFuY2UucmVzZXRBZnRlclJvd0luZGV4ID0gZnVuY3Rpb24gKHJvd0luZGV4LCBzaG91bGRGb3JjZVVwZGF0ZSkge1xuICAgICAgaWYgKHNob3VsZEZvcmNlVXBkYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgc2hvdWxkRm9yY2VVcGRhdGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpbnN0YW5jZS5yZXNldEFmdGVySW5kaWNlcyh7XG4gICAgICAgIHJvd0luZGV4OiByb3dJbmRleCxcbiAgICAgICAgc2hvdWxkRm9yY2VVcGRhdGU6IHNob3VsZEZvcmNlVXBkYXRlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaW5zdGFuY2UucmVzZXRBZnRlckluZGljZXMgPSBmdW5jdGlvbiAoX3JlZjYpIHtcbiAgICAgIHZhciBjb2x1bW5JbmRleCA9IF9yZWY2LmNvbHVtbkluZGV4LFxuICAgICAgICAgIHJvd0luZGV4ID0gX3JlZjYucm93SW5kZXgsXG4gICAgICAgICAgX3JlZjYkc2hvdWxkRm9yY2VVcGRhID0gX3JlZjYuc2hvdWxkRm9yY2VVcGRhdGUsXG4gICAgICAgICAgc2hvdWxkRm9yY2VVcGRhdGUgPSBfcmVmNiRzaG91bGRGb3JjZVVwZGEgPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmNiRzaG91bGRGb3JjZVVwZGE7XG5cbiAgICAgIGlmICh0eXBlb2YgY29sdW1uSW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICAgIGluc3RhbmNlUHJvcHMubGFzdE1lYXN1cmVkQ29sdW1uSW5kZXggPSBNYXRoLm1pbihpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZENvbHVtbkluZGV4LCBjb2x1bW5JbmRleCAtIDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHJvd0luZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgICBpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZFJvd0luZGV4ID0gTWF0aC5taW4oaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRSb3dJbmRleCwgcm93SW5kZXggLSAxKTtcbiAgICAgIH0gLy8gV2UgY291bGQgcG90ZW50aWFsbHkgb3B0aW1pemUgZnVydGhlciBieSBvbmx5IGV2aWN0aW5nIHN0eWxlcyBhZnRlciB0aGlzIGluZGV4LFxuICAgICAgLy8gQnV0IHNpbmNlIHN0eWxlcyBhcmUgb25seSBjYWNoZWQgd2hpbGUgc2Nyb2xsaW5nIGlzIGluIHByb2dyZXNzLVxuICAgICAgLy8gSXQgc2VlbXMgYW4gdW5uZWNlc3Nhcnkgb3B0aW1pemF0aW9uLlxuICAgICAgLy8gSXQncyB1bmxpa2VseSB0aGF0IHJlc2V0QWZ0ZXJJbmRleCgpIHdpbGwgYmUgY2FsbGVkIHdoaWxlIGEgdXNlciBpcyBzY3JvbGxpbmcuXG5cblxuICAgICAgaW5zdGFuY2UuX2dldEl0ZW1TdHlsZUNhY2hlKC0xKTtcblxuICAgICAgaWYgKHNob3VsZEZvcmNlVXBkYXRlKSB7XG4gICAgICAgIGluc3RhbmNlLmZvcmNlVXBkYXRlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBpbnN0YW5jZVByb3BzO1xuICB9LFxuICBzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlOiBmYWxzZSxcbiAgdmFsaWRhdGVQcm9wczogZnVuY3Rpb24gdmFsaWRhdGVQcm9wcyhfcmVmNykge1xuICAgIHZhciBjb2x1bW5XaWR0aCA9IF9yZWY3LmNvbHVtbldpZHRoLFxuICAgICAgICByb3dIZWlnaHQgPSBfcmVmNy5yb3dIZWlnaHQ7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiBjb2x1bW5XaWR0aCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcImNvbHVtbldpZHRoXCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnVmFsdWUgc2hvdWxkIGJlIGEgZnVuY3Rpb24uICcgKyAoXCJcXFwiXCIgKyAoY29sdW1uV2lkdGggPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29sdW1uV2lkdGgpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJvd0hlaWdodCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcInJvd0hlaWdodFwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ1ZhbHVlIHNob3VsZCBiZSBhIGZ1bmN0aW9uLiAnICsgKFwiXFxcIlwiICsgKHJvd0hlaWdodCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiByb3dIZWlnaHQpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG52YXIgSVNfU0NST0xMSU5HX0RFQk9VTkNFX0lOVEVSVkFMJDEgPSAxNTA7XG5cbnZhciBkZWZhdWx0SXRlbUtleSQxID0gZnVuY3Rpb24gZGVmYXVsdEl0ZW1LZXkoaW5kZXgsIGRhdGEpIHtcbiAgcmV0dXJuIGluZGV4O1xufTsgLy8gSW4gREVWIG1vZGUsIHRoaXMgU2V0IGhlbHBzIHVzIG9ubHkgbG9nIGEgd2FybmluZyBvbmNlIHBlciBjb21wb25lbnQgaW5zdGFuY2UuXG4vLyBUaGlzIGF2b2lkcyBzcGFtbWluZyB0aGUgY29uc29sZSBldmVyeSB0aW1lIGEgcmVuZGVyIGhhcHBlbnMuXG5cblxudmFyIGRldldhcm5pbmdzRGlyZWN0aW9uID0gbnVsbDtcbnZhciBkZXZXYXJuaW5nc1RhZ05hbWUkMSA9IG51bGw7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LldlYWtTZXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZGV2V2FybmluZ3NEaXJlY3Rpb24gPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBuZXcgV2Vha1NldCgpO1xuICAgIGRldldhcm5pbmdzVGFnTmFtZSQxID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgbmV3IFdlYWtTZXQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVMaXN0Q29tcG9uZW50KF9yZWYpIHtcbiAgdmFyIF9jbGFzcywgX3RlbXA7XG5cbiAgdmFyIGdldEl0ZW1PZmZzZXQgPSBfcmVmLmdldEl0ZW1PZmZzZXQsXG4gICAgICBnZXRFc3RpbWF0ZWRUb3RhbFNpemUgPSBfcmVmLmdldEVzdGltYXRlZFRvdGFsU2l6ZSxcbiAgICAgIGdldEl0ZW1TaXplID0gX3JlZi5nZXRJdGVtU2l6ZSxcbiAgICAgIGdldE9mZnNldEZvckluZGV4QW5kQWxpZ25tZW50ID0gX3JlZi5nZXRPZmZzZXRGb3JJbmRleEFuZEFsaWdubWVudCxcbiAgICAgIGdldFN0YXJ0SW5kZXhGb3JPZmZzZXQgPSBfcmVmLmdldFN0YXJ0SW5kZXhGb3JPZmZzZXQsXG4gICAgICBnZXRTdG9wSW5kZXhGb3JTdGFydEluZGV4ID0gX3JlZi5nZXRTdG9wSW5kZXhGb3JTdGFydEluZGV4LFxuICAgICAgaW5pdEluc3RhbmNlUHJvcHMgPSBfcmVmLmluaXRJbnN0YW5jZVByb3BzLFxuICAgICAgc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSA9IF9yZWYuc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSxcbiAgICAgIHZhbGlkYXRlUHJvcHMgPSBfcmVmLnZhbGlkYXRlUHJvcHM7XG4gIHJldHVybiBfdGVtcCA9IF9jbGFzcyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9QdXJlQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzTG9vc2UoTGlzdCwgX1B1cmVDb21wb25lbnQpO1xuXG4gICAgLy8gQWx3YXlzIHVzZSBleHBsaWNpdCBjb25zdHJ1Y3RvciBmb3IgUmVhY3QgY29tcG9uZW50cy5cbiAgICAvLyBJdCBwcm9kdWNlcyBsZXNzIGNvZGUgYWZ0ZXIgdHJhbnNwaWxhdGlvbi4gKCMyNilcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvclxuICAgIGZ1bmN0aW9uIExpc3QocHJvcHMpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX3RoaXMgPSBfUHVyZUNvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMuX2luc3RhbmNlUHJvcHMgPSBpbml0SW5zdGFuY2VQcm9wcyhfdGhpcy5wcm9wcywgX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSkpO1xuICAgICAgX3RoaXMuX291dGVyUmVmID0gdm9pZCAwO1xuICAgICAgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgIGluc3RhbmNlOiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKSxcbiAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgICBzY3JvbGxEaXJlY3Rpb246ICdmb3J3YXJkJyxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0OiB0eXBlb2YgX3RoaXMucHJvcHMuaW5pdGlhbFNjcm9sbE9mZnNldCA9PT0gJ251bWJlcicgPyBfdGhpcy5wcm9wcy5pbml0aWFsU2Nyb2xsT2Zmc2V0IDogMCxcbiAgICAgICAgc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIF90aGlzLl9jYWxsT25JdGVtc1JlbmRlcmVkID0gdm9pZCAwO1xuICAgICAgX3RoaXMuX2NhbGxPbkl0ZW1zUmVuZGVyZWQgPSBtZW1vaXplT25lKGZ1bmN0aW9uIChvdmVyc2NhblN0YXJ0SW5kZXgsIG92ZXJzY2FuU3RvcEluZGV4LCB2aXNpYmxlU3RhcnRJbmRleCwgdmlzaWJsZVN0b3BJbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXMucHJvcHMub25JdGVtc1JlbmRlcmVkKHtcbiAgICAgICAgICBvdmVyc2NhblN0YXJ0SW5kZXg6IG92ZXJzY2FuU3RhcnRJbmRleCxcbiAgICAgICAgICBvdmVyc2NhblN0b3BJbmRleDogb3ZlcnNjYW5TdG9wSW5kZXgsXG4gICAgICAgICAgdmlzaWJsZVN0YXJ0SW5kZXg6IHZpc2libGVTdGFydEluZGV4LFxuICAgICAgICAgIHZpc2libGVTdG9wSW5kZXg6IHZpc2libGVTdG9wSW5kZXhcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIF90aGlzLl9jYWxsT25TY3JvbGwgPSB2b2lkIDA7XG4gICAgICBfdGhpcy5fY2FsbE9uU2Nyb2xsID0gbWVtb2l6ZU9uZShmdW5jdGlvbiAoc2Nyb2xsRGlyZWN0aW9uLCBzY3JvbGxPZmZzZXQsIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCkge1xuICAgICAgICByZXR1cm4gX3RoaXMucHJvcHMub25TY3JvbGwoe1xuICAgICAgICAgIHNjcm9sbERpcmVjdGlvbjogc2Nyb2xsRGlyZWN0aW9uLFxuICAgICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgIHNjcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZDogc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBfdGhpcy5fZ2V0SXRlbVN0eWxlID0gdm9pZCAwO1xuXG4gICAgICBfdGhpcy5fZ2V0SXRlbVN0eWxlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgICAgZGlyZWN0aW9uID0gX3RoaXMkcHJvcHMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgaXRlbVNpemUgPSBfdGhpcyRwcm9wcy5pdGVtU2l6ZSxcbiAgICAgICAgICAgIGxheW91dCA9IF90aGlzJHByb3BzLmxheW91dDtcblxuICAgICAgICB2YXIgaXRlbVN0eWxlQ2FjaGUgPSBfdGhpcy5fZ2V0SXRlbVN0eWxlQ2FjaGUoc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSAmJiBpdGVtU2l6ZSwgc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZSAmJiBsYXlvdXQsIHNob3VsZFJlc2V0U3R5bGVDYWNoZU9uSXRlbVNpemVDaGFuZ2UgJiYgZGlyZWN0aW9uKTtcblxuICAgICAgICB2YXIgc3R5bGU7XG5cbiAgICAgICAgaWYgKGl0ZW1TdHlsZUNhY2hlLmhhc093blByb3BlcnR5KGluZGV4KSkge1xuICAgICAgICAgIHN0eWxlID0gaXRlbVN0eWxlQ2FjaGVbaW5kZXhdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBfb2Zmc2V0ID0gZ2V0SXRlbU9mZnNldChfdGhpcy5wcm9wcywgaW5kZXgsIF90aGlzLl9pbnN0YW5jZVByb3BzKTtcblxuICAgICAgICAgIHZhciBzaXplID0gZ2V0SXRlbVNpemUoX3RoaXMucHJvcHMsIGluZGV4LCBfdGhpcy5faW5zdGFuY2VQcm9wcyk7IC8vIFRPRE8gRGVwcmVjYXRlIGRpcmVjdGlvbiBcImhvcml6b250YWxcIlxuXG4gICAgICAgICAgdmFyIGlzSG9yaXpvbnRhbCA9IGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnIHx8IGxheW91dCA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgICAgIHZhciBpc1J0bCA9IGRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gICAgICAgICAgdmFyIG9mZnNldEhvcml6b250YWwgPSBpc0hvcml6b250YWwgPyBfb2Zmc2V0IDogMDtcbiAgICAgICAgICBpdGVtU3R5bGVDYWNoZVtpbmRleF0gPSBzdHlsZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogaXNSdGwgPyB1bmRlZmluZWQgOiBvZmZzZXRIb3Jpem9udGFsLFxuICAgICAgICAgICAgcmlnaHQ6IGlzUnRsID8gb2Zmc2V0SG9yaXpvbnRhbCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRvcDogIWlzSG9yaXpvbnRhbCA/IF9vZmZzZXQgOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAhaXNIb3Jpem9udGFsID8gc2l6ZSA6ICcxMDAlJyxcbiAgICAgICAgICAgIHdpZHRoOiBpc0hvcml6b250YWwgPyBzaXplIDogJzEwMCUnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzLl9nZXRJdGVtU3R5bGVDYWNoZSA9IHZvaWQgMDtcbiAgICAgIF90aGlzLl9nZXRJdGVtU3R5bGVDYWNoZSA9IG1lbW9pemVPbmUoZnVuY3Rpb24gKF8sIF9fLCBfX18pIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSk7XG5cbiAgICAgIF90aGlzLl9vblNjcm9sbEhvcml6b250YWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF9ldmVudCRjdXJyZW50VGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgICAgIGNsaWVudFdpZHRoID0gX2V2ZW50JGN1cnJlbnRUYXJnZXQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0ID0gX2V2ZW50JGN1cnJlbnRUYXJnZXQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIHNjcm9sbFdpZHRoID0gX2V2ZW50JGN1cnJlbnRUYXJnZXQuc2Nyb2xsV2lkdGg7XG5cbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKHByZXZTdGF0ZSkge1xuICAgICAgICAgIGlmIChwcmV2U3RhdGUuc2Nyb2xsT2Zmc2V0ID09PSBzY3JvbGxMZWZ0KSB7XG4gICAgICAgICAgICAvLyBTY3JvbGwgcG9zaXRpb24gbWF5IGhhdmUgYmVlbiB1cGRhdGVkIGJ5IGNETS9jRFUsXG4gICAgICAgICAgICAvLyBJbiB3aGljaCBjYXNlIHdlIGRvbid0IG5lZWQgdG8gdHJpZ2dlciBhbm90aGVyIHJlbmRlcixcbiAgICAgICAgICAgIC8vIEFuZCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZSBzdGF0ZS5pc1Njcm9sbGluZy5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBfdGhpcy5wcm9wcy5kaXJlY3Rpb247XG4gICAgICAgICAgdmFyIHNjcm9sbE9mZnNldCA9IHNjcm9sbExlZnQ7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgICAgICAgICAgLy8gVFJJQ0tZIEFjY29yZGluZyB0byB0aGUgc3BlYywgc2Nyb2xsTGVmdCBzaG91bGQgYmUgbmVnYXRpdmUgZm9yIFJUTCBhbGlnbmVkIGVsZW1lbnRzLlxuICAgICAgICAgICAgLy8gVGhpcyBpcyBub3QgdGhlIGNhc2UgZm9yIGFsbCBicm93c2VycyB0aG91Z2ggKGUuZy4gQ2hyb21lIHJlcG9ydHMgdmFsdWVzIGFzIHBvc2l0aXZlLCBtZWFzdXJlZCByZWxhdGl2ZSB0byB0aGUgbGVmdCkuXG4gICAgICAgICAgICAvLyBJdCdzIGFsc28gZWFzaWVyIGZvciB0aGlzIGNvbXBvbmVudCBpZiB3ZSBjb252ZXJ0IG9mZnNldHMgdG8gdGhlIHNhbWUgZm9ybWF0IGFzIHRoZXkgd291bGQgYmUgaW4gZm9yIGx0ci5cbiAgICAgICAgICAgIC8vIFNvIHRoZSBzaW1wbGVzdCBzb2x1dGlvbiBpcyB0byBkZXRlcm1pbmUgd2hpY2ggYnJvd3NlciBiZWhhdmlvciB3ZSdyZSBkZWFsaW5nIHdpdGgsIGFuZCBjb252ZXJ0IGJhc2VkIG9uIGl0LlxuICAgICAgICAgICAgc3dpdGNoIChnZXRSVExPZmZzZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgY2FzZSAnbmVnYXRpdmUnOlxuICAgICAgICAgICAgICAgIHNjcm9sbE9mZnNldCA9IC1zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgIGNhc2UgJ3Bvc2l0aXZlLWRlc2NlbmRpbmcnOlxuICAgICAgICAgICAgICAgIHNjcm9sbE9mZnNldCA9IHNjcm9sbFdpZHRoIC0gY2xpZW50V2lkdGggLSBzY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gLy8gUHJldmVudCBTYWZhcmkncyBlbGFzdGljIHNjcm9sbGluZyBmcm9tIGNhdXNpbmcgdmlzdWFsIHNoYWtpbmcgd2hlbiBzY3JvbGxpbmcgcGFzdCBib3VuZHMuXG5cblxuICAgICAgICAgIHNjcm9sbE9mZnNldCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHNjcm9sbE9mZnNldCwgc2Nyb2xsV2lkdGggLSBjbGllbnRXaWR0aCkpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHNjcm9sbERpcmVjdGlvbjogcHJldlN0YXRlLnNjcm9sbE9mZnNldCA8IHNjcm9sbExlZnQgPyAnZm9yd2FyZCcgOiAnYmFja3dhcmQnLFxuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxPZmZzZXQsXG4gICAgICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ6IGZhbHNlXG4gICAgICAgICAgfTtcbiAgICAgICAgfSwgX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdEZWJvdW5jZWQpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuX29uU2Nyb2xsVmVydGljYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF9ldmVudCRjdXJyZW50VGFyZ2V0MiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgICAgICBjbGllbnRIZWlnaHQgPSBfZXZlbnQkY3VycmVudFRhcmdldDIuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gX2V2ZW50JGN1cnJlbnRUYXJnZXQyLnNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IF9ldmVudCRjdXJyZW50VGFyZ2V0Mi5zY3JvbGxUb3A7XG5cbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKHByZXZTdGF0ZSkge1xuICAgICAgICAgIGlmIChwcmV2U3RhdGUuc2Nyb2xsT2Zmc2V0ID09PSBzY3JvbGxUb3ApIHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBwb3NpdGlvbiBtYXkgaGF2ZSBiZWVuIHVwZGF0ZWQgYnkgY0RNL2NEVSxcbiAgICAgICAgICAgIC8vIEluIHdoaWNoIGNhc2Ugd2UgZG9uJ3QgbmVlZCB0byB0cmlnZ2VyIGFub3RoZXIgcmVuZGVyLFxuICAgICAgICAgICAgLy8gQW5kIHdlIGRvbid0IHdhbnQgdG8gdXBkYXRlIHN0YXRlLmlzU2Nyb2xsaW5nLlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfSAvLyBQcmV2ZW50IFNhZmFyaSdzIGVsYXN0aWMgc2Nyb2xsaW5nIGZyb20gY2F1c2luZyB2aXN1YWwgc2hha2luZyB3aGVuIHNjcm9sbGluZyBwYXN0IGJvdW5kcy5cblxuXG4gICAgICAgICAgdmFyIHNjcm9sbE9mZnNldCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0IC0gY2xpZW50SGVpZ2h0KSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uOiBwcmV2U3RhdGUuc2Nyb2xsT2Zmc2V0IDwgc2Nyb2xsT2Zmc2V0ID8gJ2ZvcndhcmQnIDogJ2JhY2t3YXJkJyxcbiAgICAgICAgICAgIHNjcm9sbE9mZnNldDogc2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgICAgc2Nyb2xsVXBkYXRlV2FzUmVxdWVzdGVkOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH0sIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nRGVib3VuY2VkKTtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzLl9vdXRlclJlZlNldHRlciA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgdmFyIG91dGVyUmVmID0gX3RoaXMucHJvcHMub3V0ZXJSZWY7XG4gICAgICAgIF90aGlzLl9vdXRlclJlZiA9IHJlZjtcblxuICAgICAgICBpZiAodHlwZW9mIG91dGVyUmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgb3V0ZXJSZWYocmVmKTtcbiAgICAgICAgfSBlbHNlIGlmIChvdXRlclJlZiAhPSBudWxsICYmIHR5cGVvZiBvdXRlclJlZiA9PT0gJ29iamVjdCcgJiYgb3V0ZXJSZWYuaGFzT3duUHJvcGVydHkoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgIG91dGVyUmVmLmN1cnJlbnQgPSByZWY7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nRGVib3VuY2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmdUaW1lb3V0SWQgIT09IG51bGwpIHtcbiAgICAgICAgICBjYW5jZWxUaW1lb3V0KF90aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkID0gcmVxdWVzdFRpbWVvdXQoX3RoaXMuX3Jlc2V0SXNTY3JvbGxpbmcsIElTX1NDUk9MTElOR19ERUJPVU5DRV9JTlRFUlZBTCQxKTtcbiAgICAgIH07XG5cbiAgICAgIF90aGlzLl9yZXNldElzU2Nyb2xsaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5fcmVzZXRJc1Njcm9sbGluZ1RpbWVvdXRJZCA9IG51bGw7XG5cbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gQ2xlYXIgc3R5bGUgY2FjaGUgYWZ0ZXIgc3RhdGUgdXBkYXRlIGhhcyBiZWVuIGNvbW1pdHRlZC5cbiAgICAgICAgICAvLyBUaGlzIHdheSB3ZSBkb24ndCBicmVhayBwdXJlIHNDVSBmb3IgaXRlbXMgdGhhdCBkb24ndCB1c2UgaXNTY3JvbGxpbmcgcGFyYW0uXG4gICAgICAgICAgX3RoaXMuX2dldEl0ZW1TdHlsZUNhY2hlKC0xLCBudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgTGlzdC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPSBmdW5jdGlvbiBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgIHZhbGlkYXRlU2hhcmVkUHJvcHMkMShuZXh0UHJvcHMsIHByZXZTdGF0ZSk7XG4gICAgICB2YWxpZGF0ZVByb3BzKG5leHRQcm9wcyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgdmFyIF9wcm90byA9IExpc3QucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvLnNjcm9sbFRvID0gZnVuY3Rpb24gc2Nyb2xsVG8oc2Nyb2xsT2Zmc2V0KSB7XG4gICAgICBzY3JvbGxPZmZzZXQgPSBNYXRoLm1heCgwLCBzY3JvbGxPZmZzZXQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAocHJldlN0YXRlKSB7XG4gICAgICAgIGlmIChwcmV2U3RhdGUuc2Nyb2xsT2Zmc2V0ID09PSBzY3JvbGxPZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2Nyb2xsRGlyZWN0aW9uOiBwcmV2U3RhdGUuc2Nyb2xsT2Zmc2V0IDwgc2Nyb2xsT2Zmc2V0ID8gJ2ZvcndhcmQnIDogJ2JhY2t3YXJkJyxcbiAgICAgICAgICBzY3JvbGxPZmZzZXQ6IHNjcm9sbE9mZnNldCxcbiAgICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH0sIHRoaXMuX3Jlc2V0SXNTY3JvbGxpbmdEZWJvdW5jZWQpO1xuICAgIH07XG5cbiAgICBfcHJvdG8uc2Nyb2xsVG9JdGVtID0gZnVuY3Rpb24gc2Nyb2xsVG9JdGVtKGluZGV4LCBhbGlnbikge1xuICAgICAgaWYgKGFsaWduID09PSB2b2lkIDApIHtcbiAgICAgICAgYWxpZ24gPSAnYXV0byc7XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVtQ291bnQgPSB0aGlzLnByb3BzLml0ZW1Db3VudDtcbiAgICAgIHZhciBzY3JvbGxPZmZzZXQgPSB0aGlzLnN0YXRlLnNjcm9sbE9mZnNldDtcbiAgICAgIGluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oaW5kZXgsIGl0ZW1Db3VudCAtIDEpKTtcbiAgICAgIHRoaXMuc2Nyb2xsVG8oZ2V0T2Zmc2V0Rm9ySW5kZXhBbmRBbGlnbm1lbnQodGhpcy5wcm9wcywgaW5kZXgsIGFsaWduLCBzY3JvbGxPZmZzZXQsIHRoaXMuX2luc3RhbmNlUHJvcHMpKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBkaXJlY3Rpb24gPSBfdGhpcyRwcm9wczIuZGlyZWN0aW9uLFxuICAgICAgICAgIGluaXRpYWxTY3JvbGxPZmZzZXQgPSBfdGhpcyRwcm9wczIuaW5pdGlhbFNjcm9sbE9mZnNldCxcbiAgICAgICAgICBsYXlvdXQgPSBfdGhpcyRwcm9wczIubGF5b3V0O1xuXG4gICAgICBpZiAodHlwZW9mIGluaXRpYWxTY3JvbGxPZmZzZXQgPT09ICdudW1iZXInICYmIHRoaXMuX291dGVyUmVmICE9IG51bGwpIHtcbiAgICAgICAgdmFyIG91dGVyUmVmID0gdGhpcy5fb3V0ZXJSZWY7IC8vIFRPRE8gRGVwcmVjYXRlIGRpcmVjdGlvbiBcImhvcml6b250YWxcIlxuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyB8fCBsYXlvdXQgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgIG91dGVyUmVmLnNjcm9sbExlZnQgPSBpbml0aWFsU2Nyb2xsT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG91dGVyUmVmLnNjcm9sbFRvcCA9IGluaXRpYWxTY3JvbGxPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2FsbFByb3BzQ2FsbGJhY2tzKCk7XG4gICAgfTtcblxuICAgIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHMzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBkaXJlY3Rpb24gPSBfdGhpcyRwcm9wczMuZGlyZWN0aW9uLFxuICAgICAgICAgIGxheW91dCA9IF90aGlzJHByb3BzMy5sYXlvdXQ7XG4gICAgICB2YXIgX3RoaXMkc3RhdGUgPSB0aGlzLnN0YXRlLFxuICAgICAgICAgIHNjcm9sbE9mZnNldCA9IF90aGlzJHN0YXRlLnNjcm9sbE9mZnNldCxcbiAgICAgICAgICBzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQgPSBfdGhpcyRzdGF0ZS5zY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ7XG5cbiAgICAgIGlmIChzY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQgJiYgdGhpcy5fb3V0ZXJSZWYgIT0gbnVsbCkge1xuICAgICAgICB2YXIgb3V0ZXJSZWYgPSB0aGlzLl9vdXRlclJlZjsgLy8gVE9ETyBEZXByZWNhdGUgZGlyZWN0aW9uIFwiaG9yaXpvbnRhbFwiXG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnIHx8IGxheW91dCA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgIC8vIFRSSUNLWSBBY2NvcmRpbmcgdG8gdGhlIHNwZWMsIHNjcm9sbExlZnQgc2hvdWxkIGJlIG5lZ2F0aXZlIGZvciBSVEwgYWxpZ25lZCBlbGVtZW50cy5cbiAgICAgICAgICAgIC8vIFRoaXMgaXMgbm90IHRoZSBjYXNlIGZvciBhbGwgYnJvd3NlcnMgdGhvdWdoIChlLmcuIENocm9tZSByZXBvcnRzIHZhbHVlcyBhcyBwb3NpdGl2ZSwgbWVhc3VyZWQgcmVsYXRpdmUgdG8gdGhlIGxlZnQpLlxuICAgICAgICAgICAgLy8gU28gd2UgbmVlZCB0byBkZXRlcm1pbmUgd2hpY2ggYnJvd3NlciBiZWhhdmlvciB3ZSdyZSBkZWFsaW5nIHdpdGgsIGFuZCBtaW1pYyBpdC5cbiAgICAgICAgICAgIHN3aXRjaCAoZ2V0UlRMT2Zmc2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ25lZ2F0aXZlJzpcbiAgICAgICAgICAgICAgICBvdXRlclJlZi5zY3JvbGxMZWZ0ID0gLXNjcm9sbE9mZnNldDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlICdwb3NpdGl2ZS1hc2NlbmRpbmcnOlxuICAgICAgICAgICAgICAgIG91dGVyUmVmLnNjcm9sbExlZnQgPSBzY3JvbGxPZmZzZXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YXIgY2xpZW50V2lkdGggPSBvdXRlclJlZi5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsV2lkdGggPSBvdXRlclJlZi5zY3JvbGxXaWR0aDtcbiAgICAgICAgICAgICAgICBvdXRlclJlZi5zY3JvbGxMZWZ0ID0gc2Nyb2xsV2lkdGggLSBjbGllbnRXaWR0aCAtIHNjcm9sbE9mZnNldDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsTGVmdCA9IHNjcm9sbE9mZnNldDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0ZXJSZWYuc2Nyb2xsVG9wID0gc2Nyb2xsT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NhbGxQcm9wc0NhbGxiYWNrcygpO1xuICAgIH07XG5cbiAgICBfcHJvdG8uY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLl9yZXNldElzU2Nyb2xsaW5nVGltZW91dElkICE9PSBudWxsKSB7XG4gICAgICAgIGNhbmNlbFRpbWVvdXQodGhpcy5fcmVzZXRJc1Njcm9sbGluZ1RpbWVvdXRJZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMkcHJvcHM0ID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjaGlsZHJlbiA9IF90aGlzJHByb3BzNC5jaGlsZHJlbixcbiAgICAgICAgICBjbGFzc05hbWUgPSBfdGhpcyRwcm9wczQuY2xhc3NOYW1lLFxuICAgICAgICAgIGRpcmVjdGlvbiA9IF90aGlzJHByb3BzNC5kaXJlY3Rpb24sXG4gICAgICAgICAgaGVpZ2h0ID0gX3RoaXMkcHJvcHM0LmhlaWdodCxcbiAgICAgICAgICBpbm5lclJlZiA9IF90aGlzJHByb3BzNC5pbm5lclJlZixcbiAgICAgICAgICBpbm5lckVsZW1lbnRUeXBlID0gX3RoaXMkcHJvcHM0LmlubmVyRWxlbWVudFR5cGUsXG4gICAgICAgICAgaW5uZXJUYWdOYW1lID0gX3RoaXMkcHJvcHM0LmlubmVyVGFnTmFtZSxcbiAgICAgICAgICBpdGVtQ291bnQgPSBfdGhpcyRwcm9wczQuaXRlbUNvdW50LFxuICAgICAgICAgIGl0ZW1EYXRhID0gX3RoaXMkcHJvcHM0Lml0ZW1EYXRhLFxuICAgICAgICAgIF90aGlzJHByb3BzNCRpdGVtS2V5ID0gX3RoaXMkcHJvcHM0Lml0ZW1LZXksXG4gICAgICAgICAgaXRlbUtleSA9IF90aGlzJHByb3BzNCRpdGVtS2V5ID09PSB2b2lkIDAgPyBkZWZhdWx0SXRlbUtleSQxIDogX3RoaXMkcHJvcHM0JGl0ZW1LZXksXG4gICAgICAgICAgbGF5b3V0ID0gX3RoaXMkcHJvcHM0LmxheW91dCxcbiAgICAgICAgICBvdXRlckVsZW1lbnRUeXBlID0gX3RoaXMkcHJvcHM0Lm91dGVyRWxlbWVudFR5cGUsXG4gICAgICAgICAgb3V0ZXJUYWdOYW1lID0gX3RoaXMkcHJvcHM0Lm91dGVyVGFnTmFtZSxcbiAgICAgICAgICBzdHlsZSA9IF90aGlzJHByb3BzNC5zdHlsZSxcbiAgICAgICAgICB1c2VJc1Njcm9sbGluZyA9IF90aGlzJHByb3BzNC51c2VJc1Njcm9sbGluZyxcbiAgICAgICAgICB3aWR0aCA9IF90aGlzJHByb3BzNC53aWR0aDtcbiAgICAgIHZhciBpc1Njcm9sbGluZyA9IHRoaXMuc3RhdGUuaXNTY3JvbGxpbmc7IC8vIFRPRE8gRGVwcmVjYXRlIGRpcmVjdGlvbiBcImhvcml6b250YWxcIlxuXG4gICAgICB2YXIgaXNIb3Jpem9udGFsID0gZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgfHwgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCc7XG4gICAgICB2YXIgb25TY3JvbGwgPSBpc0hvcml6b250YWwgPyB0aGlzLl9vblNjcm9sbEhvcml6b250YWwgOiB0aGlzLl9vblNjcm9sbFZlcnRpY2FsO1xuXG4gICAgICB2YXIgX3RoaXMkX2dldFJhbmdlVG9SZW5kID0gdGhpcy5fZ2V0UmFuZ2VUb1JlbmRlcigpLFxuICAgICAgICAgIHN0YXJ0SW5kZXggPSBfdGhpcyRfZ2V0UmFuZ2VUb1JlbmRbMF0sXG4gICAgICAgICAgc3RvcEluZGV4ID0gX3RoaXMkX2dldFJhbmdlVG9SZW5kWzFdO1xuXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcblxuICAgICAgaWYgKGl0ZW1Db3VudCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgX2luZGV4ID0gc3RhcnRJbmRleDsgX2luZGV4IDw9IHN0b3BJbmRleDsgX2luZGV4KyspIHtcbiAgICAgICAgICBpdGVtcy5wdXNoKGNyZWF0ZUVsZW1lbnQoY2hpbGRyZW4sIHtcbiAgICAgICAgICAgIGRhdGE6IGl0ZW1EYXRhLFxuICAgICAgICAgICAga2V5OiBpdGVtS2V5KF9pbmRleCwgaXRlbURhdGEpLFxuICAgICAgICAgICAgaW5kZXg6IF9pbmRleCxcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB1c2VJc1Njcm9sbGluZyA/IGlzU2Nyb2xsaW5nIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3R5bGU6IHRoaXMuX2dldEl0ZW1TdHlsZShfaW5kZXgpXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9IC8vIFJlYWQgdGhpcyB2YWx1ZSBBRlRFUiBpdGVtcyBoYXZlIGJlZW4gY3JlYXRlZCxcbiAgICAgIC8vIFNvIHRoZWlyIGFjdHVhbCBzaXplcyAoaWYgdmFyaWFibGUpIGFyZSB0YWtlbiBpbnRvIGNvbnNpZGVyYXRpb24uXG5cblxuICAgICAgdmFyIGVzdGltYXRlZFRvdGFsU2l6ZSA9IGdldEVzdGltYXRlZFRvdGFsU2l6ZSh0aGlzLnByb3BzLCB0aGlzLl9pbnN0YW5jZVByb3BzKTtcbiAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KG91dGVyRWxlbWVudFR5cGUgfHwgb3V0ZXJUYWdOYW1lIHx8ICdkaXYnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICBvblNjcm9sbDogb25TY3JvbGwsXG4gICAgICAgIHJlZjogdGhpcy5fb3V0ZXJSZWZTZXR0ZXIsXG4gICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7XG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICAgICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6ICd0b3VjaCcsXG4gICAgICAgICAgd2lsbENoYW5nZTogJ3RyYW5zZm9ybScsXG4gICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb25cbiAgICAgICAgfSwgc3R5bGUpXG4gICAgICB9LCBjcmVhdGVFbGVtZW50KGlubmVyRWxlbWVudFR5cGUgfHwgaW5uZXJUYWdOYW1lIHx8ICdkaXYnLCB7XG4gICAgICAgIGNoaWxkcmVuOiBpdGVtcyxcbiAgICAgICAgcmVmOiBpbm5lclJlZixcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBoZWlnaHQ6IGlzSG9yaXpvbnRhbCA/ICcxMDAlJyA6IGVzdGltYXRlZFRvdGFsU2l6ZSxcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc1Njcm9sbGluZyA/ICdub25lJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB3aWR0aDogaXNIb3Jpem9udGFsID8gZXN0aW1hdGVkVG90YWxTaXplIDogJzEwMCUnXG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvLl9jYWxsUHJvcHNDYWxsYmFja3MgPSBmdW5jdGlvbiBfY2FsbFByb3BzQ2FsbGJhY2tzKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uSXRlbXNSZW5kZXJlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgaXRlbUNvdW50ID0gdGhpcy5wcm9wcy5pdGVtQ291bnQ7XG5cbiAgICAgICAgaWYgKGl0ZW1Db3VudCA+IDApIHtcbiAgICAgICAgICB2YXIgX3RoaXMkX2dldFJhbmdlVG9SZW5kMiA9IHRoaXMuX2dldFJhbmdlVG9SZW5kZXIoKSxcbiAgICAgICAgICAgICAgX292ZXJzY2FuU3RhcnRJbmRleCA9IF90aGlzJF9nZXRSYW5nZVRvUmVuZDJbMF0sXG4gICAgICAgICAgICAgIF9vdmVyc2NhblN0b3BJbmRleCA9IF90aGlzJF9nZXRSYW5nZVRvUmVuZDJbMV0sXG4gICAgICAgICAgICAgIF92aXNpYmxlU3RhcnRJbmRleCA9IF90aGlzJF9nZXRSYW5nZVRvUmVuZDJbMl0sXG4gICAgICAgICAgICAgIF92aXNpYmxlU3RvcEluZGV4ID0gX3RoaXMkX2dldFJhbmdlVG9SZW5kMlszXTtcblxuICAgICAgICAgIHRoaXMuX2NhbGxPbkl0ZW1zUmVuZGVyZWQoX292ZXJzY2FuU3RhcnRJbmRleCwgX292ZXJzY2FuU3RvcEluZGV4LCBfdmlzaWJsZVN0YXJ0SW5kZXgsIF92aXNpYmxlU3RvcEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25TY3JvbGwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIF90aGlzJHN0YXRlMiA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgICBfc2Nyb2xsRGlyZWN0aW9uID0gX3RoaXMkc3RhdGUyLnNjcm9sbERpcmVjdGlvbixcbiAgICAgICAgICAgIF9zY3JvbGxPZmZzZXQgPSBfdGhpcyRzdGF0ZTIuc2Nyb2xsT2Zmc2V0LFxuICAgICAgICAgICAgX3Njcm9sbFVwZGF0ZVdhc1JlcXVlc3RlZCA9IF90aGlzJHN0YXRlMi5zY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQ7XG5cbiAgICAgICAgdGhpcy5fY2FsbE9uU2Nyb2xsKF9zY3JvbGxEaXJlY3Rpb24sIF9zY3JvbGxPZmZzZXQsIF9zY3JvbGxVcGRhdGVXYXNSZXF1ZXN0ZWQpO1xuICAgICAgfVxuICAgIH07IC8vIExhemlseSBjcmVhdGUgYW5kIGNhY2hlIGl0ZW0gc3R5bGVzIHdoaWxlIHNjcm9sbGluZyxcbiAgICAvLyBTbyB0aGF0IHB1cmUgY29tcG9uZW50IHNDVSB3aWxsIHByZXZlbnQgcmUtcmVuZGVycy5cbiAgICAvLyBXZSBtYWludGFpbiB0aGlzIGNhY2hlLCBhbmQgcGFzcyBhIHN0eWxlIHByb3AgcmF0aGVyIHRoYW4gaW5kZXgsXG4gICAgLy8gU28gdGhhdCBMaXN0IGNhbiBjbGVhciBjYWNoZWQgc3R5bGVzIGFuZCBmb3JjZSBpdGVtIHJlLXJlbmRlciBpZiBuZWNlc3NhcnkuXG5cblxuICAgIF9wcm90by5fZ2V0UmFuZ2VUb1JlbmRlciA9IGZ1bmN0aW9uIF9nZXRSYW5nZVRvUmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzNSA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgaXRlbUNvdW50ID0gX3RoaXMkcHJvcHM1Lml0ZW1Db3VudCxcbiAgICAgICAgICBvdmVyc2NhbkNvdW50ID0gX3RoaXMkcHJvcHM1Lm92ZXJzY2FuQ291bnQ7XG4gICAgICB2YXIgX3RoaXMkc3RhdGUzID0gdGhpcy5zdGF0ZSxcbiAgICAgICAgICBpc1Njcm9sbGluZyA9IF90aGlzJHN0YXRlMy5pc1Njcm9sbGluZyxcbiAgICAgICAgICBzY3JvbGxEaXJlY3Rpb24gPSBfdGhpcyRzdGF0ZTMuc2Nyb2xsRGlyZWN0aW9uLFxuICAgICAgICAgIHNjcm9sbE9mZnNldCA9IF90aGlzJHN0YXRlMy5zY3JvbGxPZmZzZXQ7XG5cbiAgICAgIGlmIChpdGVtQ291bnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFswLCAwLCAwLCAwXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXJ0SW5kZXggPSBnZXRTdGFydEluZGV4Rm9yT2Zmc2V0KHRoaXMucHJvcHMsIHNjcm9sbE9mZnNldCwgdGhpcy5faW5zdGFuY2VQcm9wcyk7XG4gICAgICB2YXIgc3RvcEluZGV4ID0gZ2V0U3RvcEluZGV4Rm9yU3RhcnRJbmRleCh0aGlzLnByb3BzLCBzdGFydEluZGV4LCBzY3JvbGxPZmZzZXQsIHRoaXMuX2luc3RhbmNlUHJvcHMpOyAvLyBPdmVyc2NhbiBieSBvbmUgaXRlbSBpbiBlYWNoIGRpcmVjdGlvbiBzbyB0aGF0IHRhYi9mb2N1cyB3b3Jrcy5cbiAgICAgIC8vIElmIHRoZXJlIGlzbid0IGF0IGxlYXN0IG9uZSBleHRyYSBpdGVtLCB0YWIgbG9vcHMgYmFjayBhcm91bmQuXG5cbiAgICAgIHZhciBvdmVyc2NhbkJhY2t3YXJkID0gIWlzU2Nyb2xsaW5nIHx8IHNjcm9sbERpcmVjdGlvbiA9PT0gJ2JhY2t3YXJkJyA/IE1hdGgubWF4KDEsIG92ZXJzY2FuQ291bnQpIDogMTtcbiAgICAgIHZhciBvdmVyc2NhbkZvcndhcmQgPSAhaXNTY3JvbGxpbmcgfHwgc2Nyb2xsRGlyZWN0aW9uID09PSAnZm9yd2FyZCcgPyBNYXRoLm1heCgxLCBvdmVyc2NhbkNvdW50KSA6IDE7XG4gICAgICByZXR1cm4gW01hdGgubWF4KDAsIHN0YXJ0SW5kZXggLSBvdmVyc2NhbkJhY2t3YXJkKSwgTWF0aC5tYXgoMCwgTWF0aC5taW4oaXRlbUNvdW50IC0gMSwgc3RvcEluZGV4ICsgb3ZlcnNjYW5Gb3J3YXJkKSksIHN0YXJ0SW5kZXgsIHN0b3BJbmRleF07XG4gICAgfTtcblxuICAgIHJldHVybiBMaXN0O1xuICB9KFB1cmVDb21wb25lbnQpLCBfY2xhc3MuZGVmYXVsdFByb3BzID0ge1xuICAgIGRpcmVjdGlvbjogJ2x0cicsXG4gICAgaXRlbURhdGE6IHVuZGVmaW5lZCxcbiAgICBsYXlvdXQ6ICd2ZXJ0aWNhbCcsXG4gICAgb3ZlcnNjYW5Db3VudDogMixcbiAgICB1c2VJc1Njcm9sbGluZzogZmFsc2VcbiAgfSwgX3RlbXA7XG59IC8vIE5PVEU6IEkgY29uc2lkZXJlZCBmdXJ0aGVyIHdyYXBwaW5nIGluZGl2aWR1YWwgaXRlbXMgd2l0aCBhIHB1cmUgTGlzdEl0ZW0gY29tcG9uZW50LlxuLy8gVGhpcyB3b3VsZCBhdm9pZCBldmVyIGNhbGxpbmcgdGhlIHJlbmRlciBmdW5jdGlvbiBmb3IgdGhlIHNhbWUgaW5kZXggbW9yZSB0aGFuIG9uY2UsXG4vLyBCdXQgaXQgd291bGQgYWxzbyBhZGQgdGhlIG92ZXJoZWFkIG9mIGEgbG90IG9mIGNvbXBvbmVudHMvZmliZXJzLlxuLy8gSSBhc3N1bWUgcGVvcGxlIGFscmVhZHkgZG8gdGhpcyAocmVuZGVyIGZ1bmN0aW9uIHJldHVybmluZyBhIGNsYXNzIGNvbXBvbmVudCksXG4vLyBTbyBteSBkb2luZyBpdCB3b3VsZCBqdXN0IHVubmVjZXNzYXJpbHkgZG91YmxlIHRoZSB3cmFwcGVycy5cblxudmFyIHZhbGlkYXRlU2hhcmVkUHJvcHMkMSA9IGZ1bmN0aW9uIHZhbGlkYXRlU2hhcmVkUHJvcHMoX3JlZjIsIF9yZWYzKSB7XG4gIHZhciBjaGlsZHJlbiA9IF9yZWYyLmNoaWxkcmVuLFxuICAgICAgZGlyZWN0aW9uID0gX3JlZjIuZGlyZWN0aW9uLFxuICAgICAgaGVpZ2h0ID0gX3JlZjIuaGVpZ2h0LFxuICAgICAgbGF5b3V0ID0gX3JlZjIubGF5b3V0LFxuICAgICAgaW5uZXJUYWdOYW1lID0gX3JlZjIuaW5uZXJUYWdOYW1lLFxuICAgICAgb3V0ZXJUYWdOYW1lID0gX3JlZjIub3V0ZXJUYWdOYW1lLFxuICAgICAgd2lkdGggPSBfcmVmMi53aWR0aDtcbiAgdmFyIGluc3RhbmNlID0gX3JlZjMuaW5zdGFuY2U7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaW5uZXJUYWdOYW1lICE9IG51bGwgfHwgb3V0ZXJUYWdOYW1lICE9IG51bGwpIHtcbiAgICAgIGlmIChkZXZXYXJuaW5nc1RhZ05hbWUkMSAmJiAhZGV2V2FybmluZ3NUYWdOYW1lJDEuaGFzKGluc3RhbmNlKSkge1xuICAgICAgICBkZXZXYXJuaW5nc1RhZ05hbWUkMS5hZGQoaW5zdGFuY2UpO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBpbm5lclRhZ05hbWUgYW5kIG91dGVyVGFnTmFtZSBwcm9wcyBoYXZlIGJlZW4gZGVwcmVjYXRlZC4gJyArICdQbGVhc2UgdXNlIHRoZSBpbm5lckVsZW1lbnRUeXBlIGFuZCBvdXRlckVsZW1lbnRUeXBlIHByb3BzIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgfSAvLyBUT0RPIERlcHJlY2F0ZSBkaXJlY3Rpb24gXCJob3Jpem9udGFsXCJcblxuXG4gICAgdmFyIGlzSG9yaXpvbnRhbCA9IGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnIHx8IGxheW91dCA9PT0gJ2hvcml6b250YWwnO1xuXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgY2FzZSAndmVydGljYWwnOlxuICAgICAgICBpZiAoZGV2V2FybmluZ3NEaXJlY3Rpb24gJiYgIWRldldhcm5pbmdzRGlyZWN0aW9uLmhhcyhpbnN0YW5jZSkpIHtcbiAgICAgICAgICBkZXZXYXJuaW5nc0RpcmVjdGlvbi5hZGQoaW5zdGFuY2UpO1xuICAgICAgICAgIGNvbnNvbGUud2FybignVGhlIGRpcmVjdGlvbiBwcm9wIHNob3VsZCBiZSBlaXRoZXIgXCJsdHJcIiAoZGVmYXVsdCkgb3IgXCJydGxcIi4gJyArICdQbGVhc2UgdXNlIHRoZSBsYXlvdXQgcHJvcCB0byBzcGVjaWZ5IFwidmVydGljYWxcIiAoZGVmYXVsdCkgb3IgXCJob3Jpem9udGFsXCIgb3JpZW50YXRpb24uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbHRyJzpcbiAgICAgIGNhc2UgJ3J0bCc6XG4gICAgICAgIC8vIFZhbGlkIHZhbHVlc1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0FuIGludmFsaWQgXCJkaXJlY3Rpb25cIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgZWl0aGVyIFwibHRyXCIgb3IgXCJydGxcIi4gJyArIChcIlxcXCJcIiArIGRpcmVjdGlvbiArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgfVxuXG4gICAgc3dpdGNoIChsYXlvdXQpIHtcbiAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgY2FzZSAndmVydGljYWwnOlxuICAgICAgICAvLyBWYWxpZCB2YWx1ZXNcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwibGF5b3V0XCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnVmFsdWUgc2hvdWxkIGJlIGVpdGhlciBcImhvcml6b250YWxcIiBvciBcInZlcnRpY2FsXCIuICcgKyAoXCJcXFwiXCIgKyBsYXlvdXQgKyBcIlxcXCIgd2FzIHNwZWNpZmllZC5cIikpO1xuICAgIH1cblxuICAgIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcImNoaWxkcmVuXCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnVmFsdWUgc2hvdWxkIGJlIGEgUmVhY3QgY29tcG9uZW50LiAnICsgKFwiXFxcIlwiICsgKGNoaWxkcmVuID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGNoaWxkcmVuKSArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgfVxuXG4gICAgaWYgKGlzSG9yaXpvbnRhbCAmJiB0eXBlb2Ygd2lkdGggIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcIndpZHRoXCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnSG9yaXpvbnRhbCBsaXN0cyBtdXN0IHNwZWNpZnkgYSBudW1iZXIgZm9yIHdpZHRoLiAnICsgKFwiXFxcIlwiICsgKHdpZHRoID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHdpZHRoKSArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsICYmIHR5cGVvZiBoZWlnaHQgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcImhlaWdodFwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ1ZlcnRpY2FsIGxpc3RzIG11c3Qgc3BlY2lmeSBhIG51bWJlciBmb3IgaGVpZ2h0LiAnICsgKFwiXFxcIlwiICsgKGhlaWdodCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBoZWlnaHQpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX0VTVElNQVRFRF9JVEVNX1NJWkUkMSA9IDUwO1xuXG52YXIgZ2V0SXRlbU1ldGFkYXRhJDEgPSBmdW5jdGlvbiBnZXRJdGVtTWV0YWRhdGEocHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKSB7XG4gIHZhciBfcmVmID0gcHJvcHMsXG4gICAgICBpdGVtU2l6ZSA9IF9yZWYuaXRlbVNpemU7XG4gIHZhciBpdGVtTWV0YWRhdGFNYXAgPSBpbnN0YW5jZVByb3BzLml0ZW1NZXRhZGF0YU1hcCxcbiAgICAgIGxhc3RNZWFzdXJlZEluZGV4ID0gaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRJbmRleDtcblxuICBpZiAoaW5kZXggPiBsYXN0TWVhc3VyZWRJbmRleCkge1xuICAgIHZhciBvZmZzZXQgPSAwO1xuXG4gICAgaWYgKGxhc3RNZWFzdXJlZEluZGV4ID49IDApIHtcbiAgICAgIHZhciBpdGVtTWV0YWRhdGEgPSBpdGVtTWV0YWRhdGFNYXBbbGFzdE1lYXN1cmVkSW5kZXhdO1xuICAgICAgb2Zmc2V0ID0gaXRlbU1ldGFkYXRhLm9mZnNldCArIGl0ZW1NZXRhZGF0YS5zaXplO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSBsYXN0TWVhc3VyZWRJbmRleCArIDE7IGkgPD0gaW5kZXg7IGkrKykge1xuICAgICAgdmFyIHNpemUgPSBpdGVtU2l6ZShpKTtcbiAgICAgIGl0ZW1NZXRhZGF0YU1hcFtpXSA9IHtcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgIHNpemU6IHNpemVcbiAgICAgIH07XG4gICAgICBvZmZzZXQgKz0gc2l6ZTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZEluZGV4ID0gaW5kZXg7XG4gIH1cblxuICByZXR1cm4gaXRlbU1ldGFkYXRhTWFwW2luZGV4XTtcbn07XG5cbnZhciBmaW5kTmVhcmVzdEl0ZW0kMSA9IGZ1bmN0aW9uIGZpbmROZWFyZXN0SXRlbShwcm9wcywgaW5zdGFuY2VQcm9wcywgb2Zmc2V0KSB7XG4gIHZhciBpdGVtTWV0YWRhdGFNYXAgPSBpbnN0YW5jZVByb3BzLml0ZW1NZXRhZGF0YU1hcCxcbiAgICAgIGxhc3RNZWFzdXJlZEluZGV4ID0gaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRJbmRleDtcbiAgdmFyIGxhc3RNZWFzdXJlZEl0ZW1PZmZzZXQgPSBsYXN0TWVhc3VyZWRJbmRleCA+IDAgPyBpdGVtTWV0YWRhdGFNYXBbbGFzdE1lYXN1cmVkSW5kZXhdLm9mZnNldCA6IDA7XG5cbiAgaWYgKGxhc3RNZWFzdXJlZEl0ZW1PZmZzZXQgPj0gb2Zmc2V0KSB7XG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBtZWFzdXJlZCBpdGVtcyB3aXRoaW4gdGhpcyByYW5nZSBqdXN0IHVzZSBhIGJpbmFyeSBzZWFyY2ggYXMgaXQncyBmYXN0ZXIuXG4gICAgcmV0dXJuIGZpbmROZWFyZXN0SXRlbUJpbmFyeVNlYXJjaCQxKHByb3BzLCBpbnN0YW5jZVByb3BzLCBsYXN0TWVhc3VyZWRJbmRleCwgMCwgb2Zmc2V0KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiB3ZSBoYXZlbid0IHlldCBtZWFzdXJlZCB0aGlzIGhpZ2gsIGZhbGxiYWNrIHRvIGFuIGV4cG9uZW50aWFsIHNlYXJjaCB3aXRoIGFuIGlubmVyIGJpbmFyeSBzZWFyY2guXG4gICAgLy8gVGhlIGV4cG9uZW50aWFsIHNlYXJjaCBhdm9pZHMgcHJlLWNvbXB1dGluZyBzaXplcyBmb3IgdGhlIGZ1bGwgc2V0IG9mIGl0ZW1zIGFzIGEgYmluYXJ5IHNlYXJjaCB3b3VsZC5cbiAgICAvLyBUaGUgb3ZlcmFsbCBjb21wbGV4aXR5IGZvciB0aGlzIGFwcHJvYWNoIGlzIE8obG9nIG4pLlxuICAgIHJldHVybiBmaW5kTmVhcmVzdEl0ZW1FeHBvbmVudGlhbFNlYXJjaCQxKHByb3BzLCBpbnN0YW5jZVByb3BzLCBNYXRoLm1heCgwLCBsYXN0TWVhc3VyZWRJbmRleCksIG9mZnNldCk7XG4gIH1cbn07XG5cbnZhciBmaW5kTmVhcmVzdEl0ZW1CaW5hcnlTZWFyY2gkMSA9IGZ1bmN0aW9uIGZpbmROZWFyZXN0SXRlbUJpbmFyeVNlYXJjaChwcm9wcywgaW5zdGFuY2VQcm9wcywgaGlnaCwgbG93LCBvZmZzZXQpIHtcbiAgd2hpbGUgKGxvdyA8PSBoaWdoKSB7XG4gICAgdmFyIG1pZGRsZSA9IGxvdyArIE1hdGguZmxvb3IoKGhpZ2ggLSBsb3cpIC8gMik7XG4gICAgdmFyIGN1cnJlbnRPZmZzZXQgPSBnZXRJdGVtTWV0YWRhdGEkMShwcm9wcywgbWlkZGxlLCBpbnN0YW5jZVByb3BzKS5vZmZzZXQ7XG5cbiAgICBpZiAoY3VycmVudE9mZnNldCA9PT0gb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gbWlkZGxlO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudE9mZnNldCA8IG9mZnNldCkge1xuICAgICAgbG93ID0gbWlkZGxlICsgMTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRPZmZzZXQgPiBvZmZzZXQpIHtcbiAgICAgIGhpZ2ggPSBtaWRkbGUgLSAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChsb3cgPiAwKSB7XG4gICAgcmV0dXJuIGxvdyAtIDE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn07XG5cbnZhciBmaW5kTmVhcmVzdEl0ZW1FeHBvbmVudGlhbFNlYXJjaCQxID0gZnVuY3Rpb24gZmluZE5lYXJlc3RJdGVtRXhwb25lbnRpYWxTZWFyY2gocHJvcHMsIGluc3RhbmNlUHJvcHMsIGluZGV4LCBvZmZzZXQpIHtcbiAgdmFyIGl0ZW1Db3VudCA9IHByb3BzLml0ZW1Db3VudDtcbiAgdmFyIGludGVydmFsID0gMTtcblxuICB3aGlsZSAoaW5kZXggPCBpdGVtQ291bnQgJiYgZ2V0SXRlbU1ldGFkYXRhJDEocHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKS5vZmZzZXQgPCBvZmZzZXQpIHtcbiAgICBpbmRleCArPSBpbnRlcnZhbDtcbiAgICBpbnRlcnZhbCAqPSAyO1xuICB9XG5cbiAgcmV0dXJuIGZpbmROZWFyZXN0SXRlbUJpbmFyeVNlYXJjaCQxKHByb3BzLCBpbnN0YW5jZVByb3BzLCBNYXRoLm1pbihpbmRleCwgaXRlbUNvdW50IC0gMSksIE1hdGguZmxvb3IoaW5kZXggLyAyKSwgb2Zmc2V0KTtcbn07XG5cbnZhciBnZXRFc3RpbWF0ZWRUb3RhbFNpemUgPSBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRUb3RhbFNpemUoX3JlZjIsIF9yZWYzKSB7XG4gIHZhciBpdGVtQ291bnQgPSBfcmVmMi5pdGVtQ291bnQ7XG4gIHZhciBpdGVtTWV0YWRhdGFNYXAgPSBfcmVmMy5pdGVtTWV0YWRhdGFNYXAsXG4gICAgICBlc3RpbWF0ZWRJdGVtU2l6ZSA9IF9yZWYzLmVzdGltYXRlZEl0ZW1TaXplLFxuICAgICAgbGFzdE1lYXN1cmVkSW5kZXggPSBfcmVmMy5sYXN0TWVhc3VyZWRJbmRleDtcbiAgdmFyIHRvdGFsU2l6ZU9mTWVhc3VyZWRJdGVtcyA9IDA7IC8vIEVkZ2UgY2FzZSBjaGVjayBmb3Igd2hlbiB0aGUgbnVtYmVyIG9mIGl0ZW1zIGRlY3JlYXNlcyB3aGlsZSBhIHNjcm9sbCBpcyBpbiBwcm9ncmVzcy5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3Qtd2luZG93L3B1bGwvMTM4XG5cbiAgaWYgKGxhc3RNZWFzdXJlZEluZGV4ID49IGl0ZW1Db3VudCkge1xuICAgIGxhc3RNZWFzdXJlZEluZGV4ID0gaXRlbUNvdW50IC0gMTtcbiAgfVxuXG4gIGlmIChsYXN0TWVhc3VyZWRJbmRleCA+PSAwKSB7XG4gICAgdmFyIGl0ZW1NZXRhZGF0YSA9IGl0ZW1NZXRhZGF0YU1hcFtsYXN0TWVhc3VyZWRJbmRleF07XG4gICAgdG90YWxTaXplT2ZNZWFzdXJlZEl0ZW1zID0gaXRlbU1ldGFkYXRhLm9mZnNldCArIGl0ZW1NZXRhZGF0YS5zaXplO1xuICB9XG5cbiAgdmFyIG51bVVubWVhc3VyZWRJdGVtcyA9IGl0ZW1Db3VudCAtIGxhc3RNZWFzdXJlZEluZGV4IC0gMTtcbiAgdmFyIHRvdGFsU2l6ZU9mVW5tZWFzdXJlZEl0ZW1zID0gbnVtVW5tZWFzdXJlZEl0ZW1zICogZXN0aW1hdGVkSXRlbVNpemU7XG4gIHJldHVybiB0b3RhbFNpemVPZk1lYXN1cmVkSXRlbXMgKyB0b3RhbFNpemVPZlVubWVhc3VyZWRJdGVtcztcbn07XG5cbnZhciBWYXJpYWJsZVNpemVMaXN0ID1cbi8qI19fUFVSRV9fKi9cbmNyZWF0ZUxpc3RDb21wb25lbnQoe1xuICBnZXRJdGVtT2Zmc2V0OiBmdW5jdGlvbiBnZXRJdGVtT2Zmc2V0KHByb3BzLCBpbmRleCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHJldHVybiBnZXRJdGVtTWV0YWRhdGEkMShwcm9wcywgaW5kZXgsIGluc3RhbmNlUHJvcHMpLm9mZnNldDtcbiAgfSxcbiAgZ2V0SXRlbVNpemU6IGZ1bmN0aW9uIGdldEl0ZW1TaXplKHByb3BzLCBpbmRleCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHJldHVybiBpbnN0YW5jZVByb3BzLml0ZW1NZXRhZGF0YU1hcFtpbmRleF0uc2l6ZTtcbiAgfSxcbiAgZ2V0RXN0aW1hdGVkVG90YWxTaXplOiBnZXRFc3RpbWF0ZWRUb3RhbFNpemUsXG4gIGdldE9mZnNldEZvckluZGV4QW5kQWxpZ25tZW50OiBmdW5jdGlvbiBnZXRPZmZzZXRGb3JJbmRleEFuZEFsaWdubWVudChwcm9wcywgaW5kZXgsIGFsaWduLCBzY3JvbGxPZmZzZXQsIGluc3RhbmNlUHJvcHMpIHtcbiAgICB2YXIgZGlyZWN0aW9uID0gcHJvcHMuZGlyZWN0aW9uLFxuICAgICAgICBoZWlnaHQgPSBwcm9wcy5oZWlnaHQsXG4gICAgICAgIGxheW91dCA9IHByb3BzLmxheW91dCxcbiAgICAgICAgd2lkdGggPSBwcm9wcy53aWR0aDsgLy8gVE9ETyBEZXByZWNhdGUgZGlyZWN0aW9uIFwiaG9yaXpvbnRhbFwiXG5cbiAgICB2YXIgaXNIb3Jpem9udGFsID0gZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgfHwgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCc7XG4gICAgdmFyIHNpemUgPSBpc0hvcml6b250YWwgPyB3aWR0aCA6IGhlaWdodDtcbiAgICB2YXIgaXRlbU1ldGFkYXRhID0gZ2V0SXRlbU1ldGFkYXRhJDEocHJvcHMsIGluZGV4LCBpbnN0YW5jZVByb3BzKTsgLy8gR2V0IGVzdGltYXRlZCB0b3RhbCBzaXplIGFmdGVyIEl0ZW1NZXRhZGF0YSBpcyBjb21wdXRlZCxcbiAgICAvLyBUbyBlbnN1cmUgaXQgcmVmbGVjdHMgYWN0dWFsIG1lYXN1cmVtZW50cyBpbnN0ZWFkIG9mIGp1c3QgZXN0aW1hdGVzLlxuXG4gICAgdmFyIGVzdGltYXRlZFRvdGFsU2l6ZSA9IGdldEVzdGltYXRlZFRvdGFsU2l6ZShwcm9wcywgaW5zdGFuY2VQcm9wcyk7XG4gICAgdmFyIG1heE9mZnNldCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGVzdGltYXRlZFRvdGFsU2l6ZSAtIHNpemUsIGl0ZW1NZXRhZGF0YS5vZmZzZXQpKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gTWF0aC5tYXgoMCwgaXRlbU1ldGFkYXRhLm9mZnNldCAtIHNpemUgKyBpdGVtTWV0YWRhdGEuc2l6ZSk7XG5cbiAgICBpZiAoYWxpZ24gPT09ICdzbWFydCcpIHtcbiAgICAgIGlmIChzY3JvbGxPZmZzZXQgPj0gbWluT2Zmc2V0IC0gc2l6ZSAmJiBzY3JvbGxPZmZzZXQgPD0gbWF4T2Zmc2V0ICsgc2l6ZSkge1xuICAgICAgICBhbGlnbiA9ICdhdXRvJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsaWduID0gJ2NlbnRlcic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICByZXR1cm4gbWF4T2Zmc2V0O1xuXG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuXG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChtaW5PZmZzZXQgKyAobWF4T2Zmc2V0IC0gbWluT2Zmc2V0KSAvIDIpO1xuXG4gICAgICBjYXNlICdhdXRvJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChzY3JvbGxPZmZzZXQgPj0gbWluT2Zmc2V0ICYmIHNjcm9sbE9mZnNldCA8PSBtYXhPZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gc2Nyb2xsT2Zmc2V0O1xuICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbE9mZnNldCA8IG1pbk9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG1heE9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgfVxuICB9LFxuICBnZXRTdGFydEluZGV4Rm9yT2Zmc2V0OiBmdW5jdGlvbiBnZXRTdGFydEluZGV4Rm9yT2Zmc2V0KHByb3BzLCBvZmZzZXQsIGluc3RhbmNlUHJvcHMpIHtcbiAgICByZXR1cm4gZmluZE5lYXJlc3RJdGVtJDEocHJvcHMsIGluc3RhbmNlUHJvcHMsIG9mZnNldCk7XG4gIH0sXG4gIGdldFN0b3BJbmRleEZvclN0YXJ0SW5kZXg6IGZ1bmN0aW9uIGdldFN0b3BJbmRleEZvclN0YXJ0SW5kZXgocHJvcHMsIHN0YXJ0SW5kZXgsIHNjcm9sbE9mZnNldCwgaW5zdGFuY2VQcm9wcykge1xuICAgIHZhciBkaXJlY3Rpb24gPSBwcm9wcy5kaXJlY3Rpb24sXG4gICAgICAgIGhlaWdodCA9IHByb3BzLmhlaWdodCxcbiAgICAgICAgaXRlbUNvdW50ID0gcHJvcHMuaXRlbUNvdW50LFxuICAgICAgICBsYXlvdXQgPSBwcm9wcy5sYXlvdXQsXG4gICAgICAgIHdpZHRoID0gcHJvcHMud2lkdGg7IC8vIFRPRE8gRGVwcmVjYXRlIGRpcmVjdGlvbiBcImhvcml6b250YWxcIlxuXG4gICAgdmFyIGlzSG9yaXpvbnRhbCA9IGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnIHx8IGxheW91dCA9PT0gJ2hvcml6b250YWwnO1xuICAgIHZhciBzaXplID0gaXNIb3Jpem9udGFsID8gd2lkdGggOiBoZWlnaHQ7XG4gICAgdmFyIGl0ZW1NZXRhZGF0YSA9IGdldEl0ZW1NZXRhZGF0YSQxKHByb3BzLCBzdGFydEluZGV4LCBpbnN0YW5jZVByb3BzKTtcbiAgICB2YXIgbWF4T2Zmc2V0ID0gc2Nyb2xsT2Zmc2V0ICsgc2l6ZTtcbiAgICB2YXIgb2Zmc2V0ID0gaXRlbU1ldGFkYXRhLm9mZnNldCArIGl0ZW1NZXRhZGF0YS5zaXplO1xuICAgIHZhciBzdG9wSW5kZXggPSBzdGFydEluZGV4O1xuXG4gICAgd2hpbGUgKHN0b3BJbmRleCA8IGl0ZW1Db3VudCAtIDEgJiYgb2Zmc2V0IDwgbWF4T2Zmc2V0KSB7XG4gICAgICBzdG9wSW5kZXgrKztcbiAgICAgIG9mZnNldCArPSBnZXRJdGVtTWV0YWRhdGEkMShwcm9wcywgc3RvcEluZGV4LCBpbnN0YW5jZVByb3BzKS5zaXplO1xuICAgIH1cblxuICAgIHJldHVybiBzdG9wSW5kZXg7XG4gIH0sXG4gIGluaXRJbnN0YW5jZVByb3BzOiBmdW5jdGlvbiBpbml0SW5zdGFuY2VQcm9wcyhwcm9wcywgaW5zdGFuY2UpIHtcbiAgICB2YXIgX3JlZjQgPSBwcm9wcyxcbiAgICAgICAgZXN0aW1hdGVkSXRlbVNpemUgPSBfcmVmNC5lc3RpbWF0ZWRJdGVtU2l6ZTtcbiAgICB2YXIgaW5zdGFuY2VQcm9wcyA9IHtcbiAgICAgIGl0ZW1NZXRhZGF0YU1hcDoge30sXG4gICAgICBlc3RpbWF0ZWRJdGVtU2l6ZTogZXN0aW1hdGVkSXRlbVNpemUgfHwgREVGQVVMVF9FU1RJTUFURURfSVRFTV9TSVpFJDEsXG4gICAgICBsYXN0TWVhc3VyZWRJbmRleDogLTFcbiAgICB9O1xuXG4gICAgaW5zdGFuY2UucmVzZXRBZnRlckluZGV4ID0gZnVuY3Rpb24gKGluZGV4LCBzaG91bGRGb3JjZVVwZGF0ZSkge1xuICAgICAgaWYgKHNob3VsZEZvcmNlVXBkYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgc2hvdWxkRm9yY2VVcGRhdGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpbnN0YW5jZVByb3BzLmxhc3RNZWFzdXJlZEluZGV4ID0gTWF0aC5taW4oaW5zdGFuY2VQcm9wcy5sYXN0TWVhc3VyZWRJbmRleCwgaW5kZXggLSAxKTsgLy8gV2UgY291bGQgcG90ZW50aWFsbHkgb3B0aW1pemUgZnVydGhlciBieSBvbmx5IGV2aWN0aW5nIHN0eWxlcyBhZnRlciB0aGlzIGluZGV4LFxuICAgICAgLy8gQnV0IHNpbmNlIHN0eWxlcyBhcmUgb25seSBjYWNoZWQgd2hpbGUgc2Nyb2xsaW5nIGlzIGluIHByb2dyZXNzLVxuICAgICAgLy8gSXQgc2VlbXMgYW4gdW5uZWNlc3Nhcnkgb3B0aW1pemF0aW9uLlxuICAgICAgLy8gSXQncyB1bmxpa2VseSB0aGF0IHJlc2V0QWZ0ZXJJbmRleCgpIHdpbGwgYmUgY2FsbGVkIHdoaWxlIGEgdXNlciBpcyBzY3JvbGxpbmcuXG5cbiAgICAgIGluc3RhbmNlLl9nZXRJdGVtU3R5bGVDYWNoZSgtMSk7XG5cbiAgICAgIGlmIChzaG91bGRGb3JjZVVwZGF0ZSkge1xuICAgICAgICBpbnN0YW5jZS5mb3JjZVVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gaW5zdGFuY2VQcm9wcztcbiAgfSxcbiAgc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZTogZmFsc2UsXG4gIHZhbGlkYXRlUHJvcHM6IGZ1bmN0aW9uIHZhbGlkYXRlUHJvcHMoX3JlZjUpIHtcbiAgICB2YXIgaXRlbVNpemUgPSBfcmVmNS5pdGVtU2l6ZTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW1TaXplICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwiaXRlbVNpemVcIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgYSBmdW5jdGlvbi4gJyArIChcIlxcXCJcIiArIChpdGVtU2l6ZSA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBpdGVtU2l6ZSkgKyBcIlxcXCIgd2FzIHNwZWNpZmllZC5cIikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG5cbnZhciBGaXhlZFNpemVHcmlkID1cbi8qI19fUFVSRV9fKi9cbmNyZWF0ZUdyaWRDb21wb25lbnQoe1xuICBnZXRDb2x1bW5PZmZzZXQ6IGZ1bmN0aW9uIGdldENvbHVtbk9mZnNldChfcmVmLCBpbmRleCkge1xuICAgIHZhciBjb2x1bW5XaWR0aCA9IF9yZWYuY29sdW1uV2lkdGg7XG4gICAgcmV0dXJuIGluZGV4ICogY29sdW1uV2lkdGg7XG4gIH0sXG4gIGdldENvbHVtbldpZHRoOiBmdW5jdGlvbiBnZXRDb2x1bW5XaWR0aChfcmVmMiwgaW5kZXgpIHtcbiAgICB2YXIgY29sdW1uV2lkdGggPSBfcmVmMi5jb2x1bW5XaWR0aDtcbiAgICByZXR1cm4gY29sdW1uV2lkdGg7XG4gIH0sXG4gIGdldFJvd09mZnNldDogZnVuY3Rpb24gZ2V0Um93T2Zmc2V0KF9yZWYzLCBpbmRleCkge1xuICAgIHZhciByb3dIZWlnaHQgPSBfcmVmMy5yb3dIZWlnaHQ7XG4gICAgcmV0dXJuIGluZGV4ICogcm93SGVpZ2h0O1xuICB9LFxuICBnZXRSb3dIZWlnaHQ6IGZ1bmN0aW9uIGdldFJvd0hlaWdodChfcmVmNCwgaW5kZXgpIHtcbiAgICB2YXIgcm93SGVpZ2h0ID0gX3JlZjQucm93SGVpZ2h0O1xuICAgIHJldHVybiByb3dIZWlnaHQ7XG4gIH0sXG4gIGdldEVzdGltYXRlZFRvdGFsSGVpZ2h0OiBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRUb3RhbEhlaWdodChfcmVmNSkge1xuICAgIHZhciByb3dDb3VudCA9IF9yZWY1LnJvd0NvdW50LFxuICAgICAgICByb3dIZWlnaHQgPSBfcmVmNS5yb3dIZWlnaHQ7XG4gICAgcmV0dXJuIHJvd0hlaWdodCAqIHJvd0NvdW50O1xuICB9LFxuICBnZXRFc3RpbWF0ZWRUb3RhbFdpZHRoOiBmdW5jdGlvbiBnZXRFc3RpbWF0ZWRUb3RhbFdpZHRoKF9yZWY2KSB7XG4gICAgdmFyIGNvbHVtbkNvdW50ID0gX3JlZjYuY29sdW1uQ291bnQsXG4gICAgICAgIGNvbHVtbldpZHRoID0gX3JlZjYuY29sdW1uV2lkdGg7XG4gICAgcmV0dXJuIGNvbHVtbldpZHRoICogY29sdW1uQ291bnQ7XG4gIH0sXG4gIGdldE9mZnNldEZvckNvbHVtbkFuZEFsaWdubWVudDogZnVuY3Rpb24gZ2V0T2Zmc2V0Rm9yQ29sdW1uQW5kQWxpZ25tZW50KF9yZWY3LCBjb2x1bW5JbmRleCwgYWxpZ24sIHNjcm9sbExlZnQsIGluc3RhbmNlUHJvcHMsIHNjcm9sbGJhclNpemUpIHtcbiAgICB2YXIgY29sdW1uQ291bnQgPSBfcmVmNy5jb2x1bW5Db3VudCxcbiAgICAgICAgY29sdW1uV2lkdGggPSBfcmVmNy5jb2x1bW5XaWR0aCxcbiAgICAgICAgd2lkdGggPSBfcmVmNy53aWR0aDtcbiAgICB2YXIgbGFzdENvbHVtbk9mZnNldCA9IE1hdGgubWF4KDAsIGNvbHVtbkNvdW50ICogY29sdW1uV2lkdGggLSB3aWR0aCk7XG4gICAgdmFyIG1heE9mZnNldCA9IE1hdGgubWluKGxhc3RDb2x1bW5PZmZzZXQsIGNvbHVtbkluZGV4ICogY29sdW1uV2lkdGgpO1xuICAgIHZhciBtaW5PZmZzZXQgPSBNYXRoLm1heCgwLCBjb2x1bW5JbmRleCAqIGNvbHVtbldpZHRoIC0gd2lkdGggKyBzY3JvbGxiYXJTaXplICsgY29sdW1uV2lkdGgpO1xuXG4gICAgaWYgKGFsaWduID09PSAnc21hcnQnKSB7XG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSBtaW5PZmZzZXQgLSB3aWR0aCAmJiBzY3JvbGxMZWZ0IDw9IG1heE9mZnNldCArIHdpZHRoKSB7XG4gICAgICAgIGFsaWduID0gJ2F1dG8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxpZ24gPSAnY2VudGVyJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2l0Y2ggKGFsaWduKSB7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgIHJldHVybiBtYXhPZmZzZXQ7XG5cbiAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgIHJldHVybiBtaW5PZmZzZXQ7XG5cbiAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgIC8vIFwiQ2VudGVyZWRcIiBvZmZzZXQgaXMgdXN1YWxseSB0aGUgYXZlcmFnZSBvZiB0aGUgbWluIGFuZCBtYXguXG4gICAgICAgIC8vIEJ1dCBuZWFyIHRoZSBlZGdlcyBvZiB0aGUgbGlzdCwgdGhpcyBkb2Vzbid0IGhvbGQgdHJ1ZS5cbiAgICAgICAgdmFyIG1pZGRsZU9mZnNldCA9IE1hdGgucm91bmQobWluT2Zmc2V0ICsgKG1heE9mZnNldCAtIG1pbk9mZnNldCkgLyAyKTtcblxuICAgICAgICBpZiAobWlkZGxlT2Zmc2V0IDwgTWF0aC5jZWlsKHdpZHRoIC8gMikpIHtcbiAgICAgICAgICByZXR1cm4gMDsgLy8gbmVhciB0aGUgYmVnaW5uaW5nXG4gICAgICAgIH0gZWxzZSBpZiAobWlkZGxlT2Zmc2V0ID4gbGFzdENvbHVtbk9mZnNldCArIE1hdGguZmxvb3Iod2lkdGggLyAyKSkge1xuICAgICAgICAgIHJldHVybiBsYXN0Q29sdW1uT2Zmc2V0OyAvLyBuZWFyIHRoZSBlbmRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbWlkZGxlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHNjcm9sbExlZnQgPj0gbWluT2Zmc2V0ICYmIHNjcm9sbExlZnQgPD0gbWF4T2Zmc2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHNjcm9sbExlZnQ7XG4gICAgICAgIH0gZWxzZSBpZiAobWluT2Zmc2V0ID4gbWF4T2Zmc2V0KSB7XG4gICAgICAgICAgLy8gQmVjYXVzZSB3ZSBvbmx5IHRha2UgaW50byBhY2NvdW50IHRoZSBzY3JvbGxiYXIgc2l6ZSB3aGVuIGNhbGN1bGF0aW5nIG1pbk9mZnNldFxuICAgICAgICAgIC8vIHRoaXMgdmFsdWUgY2FuIGJlIGxhcmdlciB0aGFuIG1heE9mZnNldCB3aGVuIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3RcbiAgICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbExlZnQgPCBtaW5PZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBtYXhPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgIH1cbiAgfSxcbiAgZ2V0T2Zmc2V0Rm9yUm93QW5kQWxpZ25tZW50OiBmdW5jdGlvbiBnZXRPZmZzZXRGb3JSb3dBbmRBbGlnbm1lbnQoX3JlZjgsIHJvd0luZGV4LCBhbGlnbiwgc2Nyb2xsVG9wLCBpbnN0YW5jZVByb3BzLCBzY3JvbGxiYXJTaXplKSB7XG4gICAgdmFyIHJvd0hlaWdodCA9IF9yZWY4LnJvd0hlaWdodCxcbiAgICAgICAgaGVpZ2h0ID0gX3JlZjguaGVpZ2h0LFxuICAgICAgICByb3dDb3VudCA9IF9yZWY4LnJvd0NvdW50O1xuICAgIHZhciBsYXN0Um93T2Zmc2V0ID0gTWF0aC5tYXgoMCwgcm93Q291bnQgKiByb3dIZWlnaHQgLSBoZWlnaHQpO1xuICAgIHZhciBtYXhPZmZzZXQgPSBNYXRoLm1pbihsYXN0Um93T2Zmc2V0LCByb3dJbmRleCAqIHJvd0hlaWdodCk7XG4gICAgdmFyIG1pbk9mZnNldCA9IE1hdGgubWF4KDAsIHJvd0luZGV4ICogcm93SGVpZ2h0IC0gaGVpZ2h0ICsgc2Nyb2xsYmFyU2l6ZSArIHJvd0hlaWdodCk7XG5cbiAgICBpZiAoYWxpZ24gPT09ICdzbWFydCcpIHtcbiAgICAgIGlmIChzY3JvbGxUb3AgPj0gbWluT2Zmc2V0IC0gaGVpZ2h0ICYmIHNjcm9sbFRvcCA8PSBtYXhPZmZzZXQgKyBoZWlnaHQpIHtcbiAgICAgICAgYWxpZ24gPSAnYXV0byc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGlnbiA9ICdjZW50ZXInO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgcmV0dXJuIG1heE9mZnNldDtcblxuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgcmV0dXJuIG1pbk9mZnNldDtcblxuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgLy8gXCJDZW50ZXJlZFwiIG9mZnNldCBpcyB1c3VhbGx5IHRoZSBhdmVyYWdlIG9mIHRoZSBtaW4gYW5kIG1heC5cbiAgICAgICAgLy8gQnV0IG5lYXIgdGhlIGVkZ2VzIG9mIHRoZSBsaXN0LCB0aGlzIGRvZXNuJ3QgaG9sZCB0cnVlLlxuICAgICAgICB2YXIgbWlkZGxlT2Zmc2V0ID0gTWF0aC5yb3VuZChtaW5PZmZzZXQgKyAobWF4T2Zmc2V0IC0gbWluT2Zmc2V0KSAvIDIpO1xuXG4gICAgICAgIGlmIChtaWRkbGVPZmZzZXQgPCBNYXRoLmNlaWwoaGVpZ2h0IC8gMikpIHtcbiAgICAgICAgICByZXR1cm4gMDsgLy8gbmVhciB0aGUgYmVnaW5uaW5nXG4gICAgICAgIH0gZWxzZSBpZiAobWlkZGxlT2Zmc2V0ID4gbGFzdFJvd09mZnNldCArIE1hdGguZmxvb3IoaGVpZ2h0IC8gMikpIHtcbiAgICAgICAgICByZXR1cm4gbGFzdFJvd09mZnNldDsgLy8gbmVhciB0aGUgZW5kXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG1pZGRsZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlICdhdXRvJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPj0gbWluT2Zmc2V0ICYmIHNjcm9sbFRvcCA8PSBtYXhPZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gc2Nyb2xsVG9wO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbk9mZnNldCA+IG1heE9mZnNldCkge1xuICAgICAgICAgIC8vIEJlY2F1c2Ugd2Ugb25seSB0YWtlIGludG8gYWNjb3VudCB0aGUgc2Nyb2xsYmFyIHNpemUgd2hlbiBjYWxjdWxhdGluZyBtaW5PZmZzZXRcbiAgICAgICAgICAvLyB0aGlzIHZhbHVlIGNhbiBiZSBsYXJnZXIgdGhhbiBtYXhPZmZzZXQgd2hlbiBhdCB0aGUgZW5kIG9mIHRoZSBsaXN0XG4gICAgICAgICAgcmV0dXJuIG1pbk9mZnNldDtcbiAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxUb3AgPCBtaW5PZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBtYXhPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgIH1cbiAgfSxcbiAgZ2V0Q29sdW1uU3RhcnRJbmRleEZvck9mZnNldDogZnVuY3Rpb24gZ2V0Q29sdW1uU3RhcnRJbmRleEZvck9mZnNldChfcmVmOSwgc2Nyb2xsTGVmdCkge1xuICAgIHZhciBjb2x1bW5XaWR0aCA9IF9yZWY5LmNvbHVtbldpZHRoLFxuICAgICAgICBjb2x1bW5Db3VudCA9IF9yZWY5LmNvbHVtbkNvdW50O1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihjb2x1bW5Db3VudCAtIDEsIE1hdGguZmxvb3Ioc2Nyb2xsTGVmdCAvIGNvbHVtbldpZHRoKSkpO1xuICB9LFxuICBnZXRDb2x1bW5TdG9wSW5kZXhGb3JTdGFydEluZGV4OiBmdW5jdGlvbiBnZXRDb2x1bW5TdG9wSW5kZXhGb3JTdGFydEluZGV4KF9yZWYxMCwgc3RhcnRJbmRleCwgc2Nyb2xsTGVmdCkge1xuICAgIHZhciBjb2x1bW5XaWR0aCA9IF9yZWYxMC5jb2x1bW5XaWR0aCxcbiAgICAgICAgY29sdW1uQ291bnQgPSBfcmVmMTAuY29sdW1uQ291bnQsXG4gICAgICAgIHdpZHRoID0gX3JlZjEwLndpZHRoO1xuICAgIHZhciBsZWZ0ID0gc3RhcnRJbmRleCAqIGNvbHVtbldpZHRoO1xuICAgIHZhciBudW1WaXNpYmxlQ29sdW1ucyA9IE1hdGguY2VpbCgod2lkdGggKyBzY3JvbGxMZWZ0IC0gbGVmdCkgLyBjb2x1bW5XaWR0aCk7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGNvbHVtbkNvdW50IC0gMSwgc3RhcnRJbmRleCArIG51bVZpc2libGVDb2x1bW5zIC0gMSAvLyAtMSBpcyBiZWNhdXNlIHN0b3AgaW5kZXggaXMgaW5jbHVzaXZlXG4gICAgKSk7XG4gIH0sXG4gIGdldFJvd1N0YXJ0SW5kZXhGb3JPZmZzZXQ6IGZ1bmN0aW9uIGdldFJvd1N0YXJ0SW5kZXhGb3JPZmZzZXQoX3JlZjExLCBzY3JvbGxUb3ApIHtcbiAgICB2YXIgcm93SGVpZ2h0ID0gX3JlZjExLnJvd0hlaWdodCxcbiAgICAgICAgcm93Q291bnQgPSBfcmVmMTEucm93Q291bnQ7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKHJvd0NvdW50IC0gMSwgTWF0aC5mbG9vcihzY3JvbGxUb3AgLyByb3dIZWlnaHQpKSk7XG4gIH0sXG4gIGdldFJvd1N0b3BJbmRleEZvclN0YXJ0SW5kZXg6IGZ1bmN0aW9uIGdldFJvd1N0b3BJbmRleEZvclN0YXJ0SW5kZXgoX3JlZjEyLCBzdGFydEluZGV4LCBzY3JvbGxUb3ApIHtcbiAgICB2YXIgcm93SGVpZ2h0ID0gX3JlZjEyLnJvd0hlaWdodCxcbiAgICAgICAgcm93Q291bnQgPSBfcmVmMTIucm93Q291bnQsXG4gICAgICAgIGhlaWdodCA9IF9yZWYxMi5oZWlnaHQ7XG4gICAgdmFyIHRvcCA9IHN0YXJ0SW5kZXggKiByb3dIZWlnaHQ7XG4gICAgdmFyIG51bVZpc2libGVSb3dzID0gTWF0aC5jZWlsKChoZWlnaHQgKyBzY3JvbGxUb3AgLSB0b3ApIC8gcm93SGVpZ2h0KTtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4ocm93Q291bnQgLSAxLCBzdGFydEluZGV4ICsgbnVtVmlzaWJsZVJvd3MgLSAxIC8vIC0xIGlzIGJlY2F1c2Ugc3RvcCBpbmRleCBpcyBpbmNsdXNpdmVcbiAgICApKTtcbiAgfSxcbiAgaW5pdEluc3RhbmNlUHJvcHM6IGZ1bmN0aW9uIGluaXRJbnN0YW5jZVByb3BzKHByb3BzKSB7Ly8gTm9vcFxuICB9LFxuICBzaG91bGRSZXNldFN0eWxlQ2FjaGVPbkl0ZW1TaXplQ2hhbmdlOiB0cnVlLFxuICB2YWxpZGF0ZVByb3BzOiBmdW5jdGlvbiB2YWxpZGF0ZVByb3BzKF9yZWYxMykge1xuICAgIHZhciBjb2x1bW5XaWR0aCA9IF9yZWYxMy5jb2x1bW5XaWR0aCxcbiAgICAgICAgcm93SGVpZ2h0ID0gX3JlZjEzLnJvd0hlaWdodDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbHVtbldpZHRoICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcImNvbHVtbldpZHRoXCIgcHJvcCBoYXMgYmVlbiBzcGVjaWZpZWQuICcgKyAnVmFsdWUgc2hvdWxkIGJlIGEgbnVtYmVyLiAnICsgKFwiXFxcIlwiICsgKGNvbHVtbldpZHRoID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGNvbHVtbldpZHRoKSArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygcm93SGVpZ2h0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aHJvdyBFcnJvcignQW4gaW52YWxpZCBcInJvd0hlaWdodFwiIHByb3AgaGFzIGJlZW4gc3BlY2lmaWVkLiAnICsgJ1ZhbHVlIHNob3VsZCBiZSBhIG51bWJlci4gJyArIChcIlxcXCJcIiArIChyb3dIZWlnaHQgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2Ygcm93SGVpZ2h0KSArIFwiXFxcIiB3YXMgc3BlY2lmaWVkLlwiKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxudmFyIEZpeGVkU2l6ZUxpc3QgPVxuLyojX19QVVJFX18qL1xuY3JlYXRlTGlzdENvbXBvbmVudCh7XG4gIGdldEl0ZW1PZmZzZXQ6IGZ1bmN0aW9uIGdldEl0ZW1PZmZzZXQoX3JlZiwgaW5kZXgpIHtcbiAgICB2YXIgaXRlbVNpemUgPSBfcmVmLml0ZW1TaXplO1xuICAgIHJldHVybiBpbmRleCAqIGl0ZW1TaXplO1xuICB9LFxuICBnZXRJdGVtU2l6ZTogZnVuY3Rpb24gZ2V0SXRlbVNpemUoX3JlZjIsIGluZGV4KSB7XG4gICAgdmFyIGl0ZW1TaXplID0gX3JlZjIuaXRlbVNpemU7XG4gICAgcmV0dXJuIGl0ZW1TaXplO1xuICB9LFxuICBnZXRFc3RpbWF0ZWRUb3RhbFNpemU6IGZ1bmN0aW9uIGdldEVzdGltYXRlZFRvdGFsU2l6ZShfcmVmMykge1xuICAgIHZhciBpdGVtQ291bnQgPSBfcmVmMy5pdGVtQ291bnQsXG4gICAgICAgIGl0ZW1TaXplID0gX3JlZjMuaXRlbVNpemU7XG4gICAgcmV0dXJuIGl0ZW1TaXplICogaXRlbUNvdW50O1xuICB9LFxuICBnZXRPZmZzZXRGb3JJbmRleEFuZEFsaWdubWVudDogZnVuY3Rpb24gZ2V0T2Zmc2V0Rm9ySW5kZXhBbmRBbGlnbm1lbnQoX3JlZjQsIGluZGV4LCBhbGlnbiwgc2Nyb2xsT2Zmc2V0KSB7XG4gICAgdmFyIGRpcmVjdGlvbiA9IF9yZWY0LmRpcmVjdGlvbixcbiAgICAgICAgaGVpZ2h0ID0gX3JlZjQuaGVpZ2h0LFxuICAgICAgICBpdGVtQ291bnQgPSBfcmVmNC5pdGVtQ291bnQsXG4gICAgICAgIGl0ZW1TaXplID0gX3JlZjQuaXRlbVNpemUsXG4gICAgICAgIGxheW91dCA9IF9yZWY0LmxheW91dCxcbiAgICAgICAgd2lkdGggPSBfcmVmNC53aWR0aDtcbiAgICAvLyBUT0RPIERlcHJlY2F0ZSBkaXJlY3Rpb24gXCJob3Jpem9udGFsXCJcbiAgICB2YXIgaXNIb3Jpem9udGFsID0gZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgfHwgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCc7XG4gICAgdmFyIHNpemUgPSBpc0hvcml6b250YWwgPyB3aWR0aCA6IGhlaWdodDtcbiAgICB2YXIgbGFzdEl0ZW1PZmZzZXQgPSBNYXRoLm1heCgwLCBpdGVtQ291bnQgKiBpdGVtU2l6ZSAtIHNpemUpO1xuICAgIHZhciBtYXhPZmZzZXQgPSBNYXRoLm1pbihsYXN0SXRlbU9mZnNldCwgaW5kZXggKiBpdGVtU2l6ZSk7XG4gICAgdmFyIG1pbk9mZnNldCA9IE1hdGgubWF4KDAsIGluZGV4ICogaXRlbVNpemUgLSBzaXplICsgaXRlbVNpemUpO1xuXG4gICAgaWYgKGFsaWduID09PSAnc21hcnQnKSB7XG4gICAgICBpZiAoc2Nyb2xsT2Zmc2V0ID49IG1pbk9mZnNldCAtIHNpemUgJiYgc2Nyb2xsT2Zmc2V0IDw9IG1heE9mZnNldCArIHNpemUpIHtcbiAgICAgICAgYWxpZ24gPSAnYXV0byc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGlnbiA9ICdjZW50ZXInO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgcmV0dXJuIG1heE9mZnNldDtcblxuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgcmV0dXJuIG1pbk9mZnNldDtcblxuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAge1xuICAgICAgICAgIC8vIFwiQ2VudGVyZWRcIiBvZmZzZXQgaXMgdXN1YWxseSB0aGUgYXZlcmFnZSBvZiB0aGUgbWluIGFuZCBtYXguXG4gICAgICAgICAgLy8gQnV0IG5lYXIgdGhlIGVkZ2VzIG9mIHRoZSBsaXN0LCB0aGlzIGRvZXNuJ3QgaG9sZCB0cnVlLlxuICAgICAgICAgIHZhciBtaWRkbGVPZmZzZXQgPSBNYXRoLnJvdW5kKG1pbk9mZnNldCArIChtYXhPZmZzZXQgLSBtaW5PZmZzZXQpIC8gMik7XG5cbiAgICAgICAgICBpZiAobWlkZGxlT2Zmc2V0IDwgTWF0aC5jZWlsKHNpemUgLyAyKSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7IC8vIG5lYXIgdGhlIGJlZ2lubmluZ1xuICAgICAgICAgIH0gZWxzZSBpZiAobWlkZGxlT2Zmc2V0ID4gbGFzdEl0ZW1PZmZzZXQgKyBNYXRoLmZsb29yKHNpemUgLyAyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3RJdGVtT2Zmc2V0OyAvLyBuZWFyIHRoZSBlbmRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1pZGRsZU9mZnNldDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgY2FzZSAnYXV0byc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoc2Nyb2xsT2Zmc2V0ID49IG1pbk9mZnNldCAmJiBzY3JvbGxPZmZzZXQgPD0gbWF4T2Zmc2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHNjcm9sbE9mZnNldDtcbiAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxPZmZzZXQgPCBtaW5PZmZzZXQpIHtcbiAgICAgICAgICByZXR1cm4gbWluT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBtYXhPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgIH1cbiAgfSxcbiAgZ2V0U3RhcnRJbmRleEZvck9mZnNldDogZnVuY3Rpb24gZ2V0U3RhcnRJbmRleEZvck9mZnNldChfcmVmNSwgb2Zmc2V0KSB7XG4gICAgdmFyIGl0ZW1Db3VudCA9IF9yZWY1Lml0ZW1Db3VudCxcbiAgICAgICAgaXRlbVNpemUgPSBfcmVmNS5pdGVtU2l6ZTtcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oaXRlbUNvdW50IC0gMSwgTWF0aC5mbG9vcihvZmZzZXQgLyBpdGVtU2l6ZSkpKTtcbiAgfSxcbiAgZ2V0U3RvcEluZGV4Rm9yU3RhcnRJbmRleDogZnVuY3Rpb24gZ2V0U3RvcEluZGV4Rm9yU3RhcnRJbmRleChfcmVmNiwgc3RhcnRJbmRleCwgc2Nyb2xsT2Zmc2V0KSB7XG4gICAgdmFyIGRpcmVjdGlvbiA9IF9yZWY2LmRpcmVjdGlvbixcbiAgICAgICAgaGVpZ2h0ID0gX3JlZjYuaGVpZ2h0LFxuICAgICAgICBpdGVtQ291bnQgPSBfcmVmNi5pdGVtQ291bnQsXG4gICAgICAgIGl0ZW1TaXplID0gX3JlZjYuaXRlbVNpemUsXG4gICAgICAgIGxheW91dCA9IF9yZWY2LmxheW91dCxcbiAgICAgICAgd2lkdGggPSBfcmVmNi53aWR0aDtcbiAgICAvLyBUT0RPIERlcHJlY2F0ZSBkaXJlY3Rpb24gXCJob3Jpem9udGFsXCJcbiAgICB2YXIgaXNIb3Jpem9udGFsID0gZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgfHwgbGF5b3V0ID09PSAnaG9yaXpvbnRhbCc7XG4gICAgdmFyIG9mZnNldCA9IHN0YXJ0SW5kZXggKiBpdGVtU2l6ZTtcbiAgICB2YXIgc2l6ZSA9IGlzSG9yaXpvbnRhbCA/IHdpZHRoIDogaGVpZ2h0O1xuICAgIHZhciBudW1WaXNpYmxlSXRlbXMgPSBNYXRoLmNlaWwoKHNpemUgKyBzY3JvbGxPZmZzZXQgLSBvZmZzZXQpIC8gaXRlbVNpemUpO1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihpdGVtQ291bnQgLSAxLCBzdGFydEluZGV4ICsgbnVtVmlzaWJsZUl0ZW1zIC0gMSAvLyAtMSBpcyBiZWNhdXNlIHN0b3AgaW5kZXggaXMgaW5jbHVzaXZlXG4gICAgKSk7XG4gIH0sXG4gIGluaXRJbnN0YW5jZVByb3BzOiBmdW5jdGlvbiBpbml0SW5zdGFuY2VQcm9wcyhwcm9wcykgey8vIE5vb3BcbiAgfSxcbiAgc2hvdWxkUmVzZXRTdHlsZUNhY2hlT25JdGVtU2l6ZUNoYW5nZTogdHJ1ZSxcbiAgdmFsaWRhdGVQcm9wczogZnVuY3Rpb24gdmFsaWRhdGVQcm9wcyhfcmVmNykge1xuICAgIHZhciBpdGVtU2l6ZSA9IF9yZWY3Lml0ZW1TaXplO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbVNpemUgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBbiBpbnZhbGlkIFwiaXRlbVNpemVcIiBwcm9wIGhhcyBiZWVuIHNwZWNpZmllZC4gJyArICdWYWx1ZSBzaG91bGQgYmUgYSBudW1iZXIuICcgKyAoXCJcXFwiXCIgKyAoaXRlbVNpemUgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgaXRlbVNpemUpICsgXCJcXFwiIHdhcyBzcGVjaWZpZWQuXCIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBQdWxsZWQgZnJvbSByZWFjdC1jb21wYXRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvcHJlYWN0LWNvbXBhdC9ibG9iLzdjNWRlMDBlN2M4NWUyZmZkMDExYmYzYWYwMjg5OWI2M2Y2OTlkM2Evc3JjL2luZGV4LmpzI0wzNDlcbmZ1bmN0aW9uIHNoYWxsb3dEaWZmZXJzKHByZXYsIG5leHQpIHtcbiAgZm9yICh2YXIgYXR0cmlidXRlIGluIHByZXYpIHtcbiAgICBpZiAoIShhdHRyaWJ1dGUgaW4gbmV4dCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9hdHRyaWJ1dGUgaW4gbmV4dCkge1xuICAgIGlmIChwcmV2W19hdHRyaWJ1dGVdICE9PSBuZXh0W19hdHRyaWJ1dGVdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIEl0IGtub3dzIHRvIGNvbXBhcmUgaW5kaXZpZHVhbCBzdHlsZSBwcm9wcyBhbmQgaWdub3JlIHRoZSB3cmFwcGVyIG9iamVjdC5cbi8vIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RtZW1vXG5cbmZ1bmN0aW9uIGFyZUVxdWFsKHByZXZQcm9wcywgbmV4dFByb3BzKSB7XG4gIHZhciBwcmV2U3R5bGUgPSBwcmV2UHJvcHMuc3R5bGUsXG4gICAgICBwcmV2UmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHByZXZQcm9wcywgW1wic3R5bGVcIl0pO1xuXG4gIHZhciBuZXh0U3R5bGUgPSBuZXh0UHJvcHMuc3R5bGUsXG4gICAgICBuZXh0UmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKG5leHRQcm9wcywgW1wic3R5bGVcIl0pO1xuXG4gIHJldHVybiAhc2hhbGxvd0RpZmZlcnMocHJldlN0eWxlLCBuZXh0U3R5bGUpICYmICFzaGFsbG93RGlmZmVycyhwcmV2UmVzdCwgbmV4dFJlc3QpO1xufVxuXG4vLyBJdCBrbm93cyB0byBjb21wYXJlIGluZGl2aWR1YWwgc3R5bGUgcHJvcHMgYW5kIGlnbm9yZSB0aGUgd3JhcHBlciBvYmplY3QuXG4vLyBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWNvbXBvbmVudC5odG1sI3Nob3VsZGNvbXBvbmVudHVwZGF0ZVxuXG5mdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgcmV0dXJuICFhcmVFcXVhbCh0aGlzLnByb3BzLCBuZXh0UHJvcHMpIHx8IHNoYWxsb3dEaWZmZXJzKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG59XG5cbmV4cG9ydCB7IFZhcmlhYmxlU2l6ZUdyaWQsIFZhcmlhYmxlU2l6ZUxpc3QsIEZpeGVkU2l6ZUdyaWQsIEZpeGVkU2l6ZUxpc3QsIGFyZUVxdWFsLCBzaG91bGRDb21wb25lbnRVcGRhdGUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbS5qcy5tYXBcbiJdLCJzb3VyY2VSb290IjoiIn0=