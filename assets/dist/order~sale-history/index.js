(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["order~sale-history"],{

/***/ "./node_modules/@babel/runtime/helpers/readOnlyError.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/readOnlyError.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

module.exports = _readOnlyError;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./src/js/components/body/tabs/order/history/short/short.jsx":
/*!*******************************************************************!*\
  !*** ./src/js/components/body/tabs/order/history/short/short.jsx ***!
  \*******************************************************************/
/*! exports provided: ADD_CUSTOM_ORDER_DATA_BELOW_DATE, MODIFY_ORDER_DETAILS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_CUSTOM_ORDER_DATA_BELOW_DATE", function() { return ADD_CUSTOM_ORDER_DATA_BELOW_DATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODIFY_ORDER_DETAILS", function() { return MODIFY_ORDER_DETAILS; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../translation */ "./src/js/translation.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__);







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }







var ADD_CUSTOM_ORDER_DATA_BELOW_DATE = 'wkwcpos_add_custom_order_data_below_date';
var MODIFY_ORDER_DETAILS = "wkwc_modify_order_detials";

var OrderShort = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(OrderShort, _Component);

  var _super = _createSuper(OrderShort);

  function OrderShort(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OrderShort);

    return _super.call(this, props);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OrderShort, [{
    key: "render",
    value: function render() {
      var order = this.props.order;
      var date = new Date(order.order_date).toDateString();
      date = date.split(' ').slice(0, 4).join(' ');
      order = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_10__["applyFilters"])(MODIFY_ORDER_DETAILS, order);
      var order_heading_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].order_heading_text;
      var customDataArr = [];
      var customData = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_10__["applyFilters"])(ADD_CUSTOM_ORDER_DATA_BELOW_DATE, '', order);

      if (order.custom_data && order.custom_data.length > 0) {
        customDataArr = order.custom_data.map(function (data, i) {
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("p", {
            key: i
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("strong", null, data.label, ": "), data.value);
        });
      }

      order.order_id = order.order_id.toString();
      var orderId = order.order_id.replace("#", '');
      var customerName = order.billing.fname !== undefined ? order.billing.fname + ' ' + order.billing.lname : order.billing.first_name + ' ' + order.billing.last_name;
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", {
        className: "pos-order-short"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", {
        className: "pos-order-section"
      }, order.offline_id ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("h3", null, order_heading_text, " ", "#".concat(order.order_id)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("p", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])('Offline ID ', 'wc_pos') + order.offline_id)) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("h3", null, order_heading_text, " #", orderId)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", {
        className: "pos-order-extra-wrapper"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("h5", null, customerName), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("h5", null, date)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("p", null, customData)), customDataArr.length > 0 ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", {
        className: "order-extra-data"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("h3", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__["__"])('Extra Data', 'wc_pos')), customData) : '');
    }
  }]);

  return OrderShort;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    orders: state.orders.list,
    printers: state.printers,
    invoice: state.invoice
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({
    dispatch: dispatch
  }, Object(redux__WEBPACK_IMPORTED_MODULE_8__["bindActionCreators"])({}, dispatch));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(OrderShort));

/***/ }),

/***/ "./src/js/components/body/tabs/order/offline/list/list.jsx":
/*!*****************************************************************!*\
  !*** ./src/js/components/body/tabs/order/offline/list/list.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _currency_format__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../currency-format */ "./src/js/currency-format.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var OrderList = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(OrderList, _Component);

  var _super = _createSuper(OrderList);

  function OrderList(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OrderList);

    _this = _super.call(this, props);
    _this.state = {
      order: ''
    }; // This binding is necessary to make `this` work in the callback

    _this.handleClick = _this.handleClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OrderList, [{
    key: "handleClick",
    value: function handleClick(event) {
      var orders = this.props.orders;
      var order_id = jQuery(event.target).closest("li").attr("id");
      var order = orders.filter(function (obj) {
        return order_id == obj.id;
      });

      if (order) {
        this.props.onSelectOrder(order);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var order = this.props.order;
      var currency = order.currency;
      var currency_code = currency.symbol;
      var date = new Date(order.order_date).toDateString();
      date = date.split(' ').slice(0, 4).join(' ');
      var cart_total = Object(_currency_format__WEBPACK_IMPORTED_MODULE_9__["wkwcpos_price"])(parseFloat(order.order_html), currency_code);
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("li", {
        id: order.order_id,
        onClick: function onClick(e) {
          return _this2.handleClick(e);
        }
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", null, order.order_id), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("i", {
        className: "fa fa-calender"
      }), date), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", null, cart_total));
    }
  }]);

  return OrderList;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    orders: state.orders.list
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps)(OrderList));

/***/ }),

/***/ "./src/js/components/body/tabs/order/offline/offline.jsx":
/*!***************************************************************!*\
  !*** ./src/js/components/body/tabs/order/offline/offline.jsx ***!
  \***************************************************************/
/*! exports provided: AFTER_CREATING_ORDER_ACTION, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AFTER_CREATING_ORDER_ACTION", function() { return AFTER_CREATING_ORDER_ACTION; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _list_list_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./list/list.jsx */ "./src/js/components/body/tabs/order/offline/list/list.jsx");
/* harmony import */ var _history_short_short_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../history/short/short.jsx */ "./src/js/components/body/tabs/order/history/short/short.jsx");
/* harmony import */ var _summary_summary_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./summary/summary.jsx */ "./src/js/components/body/tabs/order/offline/summary/summary.jsx");
/* harmony import */ var _actions_orders__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../actions/orders */ "./src/js/actions/orders/index.js");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../database */ "./src/js/database.js");
/* harmony import */ var _translation_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../translation.js */ "./src/js/translation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../../../../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./../../../../../hash */ "./src/js/hash.js");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-window */ "./node_modules/react-window/dist/index.esm.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_20__);








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }















var AFTER_CREATING_ORDER_ACTION = 'wkwcpos_action_after_creating_order';

var OfflineSale = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(OfflineSale, _Component);

  var _super = _createSuper(OfflineSale);

  function OfflineSale(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, OfflineSale);

    _this = _super.call(this, props);
    _this.state = {
      first: '',
      orders: '',
      s: ''
    };
    _this.handleChange = _this.handleChange.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.setSearch = _this.setSearch.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.syncAllOrders = _this.syncAllOrders.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.syncOfflineOrders = _this.syncOfflineOrders.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(OfflineSale, [{
    key: "setSearch",
    value: function setSearch(e) {
      var fakeorders = Array.from(this.props.orders);
      var first = this.state.first;
      var orderData = this.state.orders;

      if (e.target.value) {
        orderData = fakeorders.filter(function (order) {
          if (order.order_type == 'offline' && (order.order_id.toString().indexOf(e.target.value) != -1 || order.email.toString().indexOf(e.target.value) != -1)) {
            return order;
          }
        });
      }

      this.setState({
        first: first,
        orders: orderData,
        s: e.target.value
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(firstOrder) {
      this.setState({
        first: firstOrder
      });
    }
  }, {
    key: "syncAllOrders",
    value: function syncAllOrders() {
      var dispatch = this.props.dispatch;

      if (navigator.onLine) {
        var fakeorders = Array.from(this.props.orders);
        var orderData = fakeorders.filter(function (order) {
          if (order.order_type == 'offline') {
            return order;
          }
        });

        if (orderData.length > 0) {
          var result = this.syncOfflineOrders(orderData).then(function (orders) {
            if (orders) {
              dispatch(Object(_actions_orders__WEBPACK_IMPORTED_MODULE_13__["getAllOrdersWC"])());
              jQuery.confirm({
                title: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].success_text,
                content: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].sync_success_text,
                backgroundDismiss: function backgroundDismiss() {
                  return 'buttonName'; // the button will handle it
                }
              });
            }
          });
        } else {
          jQuery.confirm({
            title: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].warning_text,
            content: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].no_sync_orders,
            backgroundDismiss: function backgroundDismiss() {
              return 'buttonName'; // the button will handle it
            }
          });
        }
      } else {
        jQuery.confirm({
          title: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].warning_text,
          content: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].error_sync_orders,
          backgroundDismiss: function backgroundDismiss() {
            return 'buttonName'; // the button will handle it
          }
        });
        return;
      }
    }
  }, {
    key: "syncOfflineOrders",
    value: function syncOfflineOrders(pos_orders) {
      var postData = {
        orders: JSON.stringify(pos_orders)
      };
      return new Promise(function (resolve, reject) {
        document.querySelector('#loading-text').innerHTML = _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].sync_process_text;
        document.querySelector('#loader').style.display = 'block';
        Object(_hash__WEBPACK_IMPORTED_MODULE_17__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_16__["default"].WK_CREATE_OFFLINE_ORDER_ENDPOINT, postData).then(function (json) {
          document.querySelector('#loader').style.display = 'none';

          if (json.length > 0) {
            Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_20__["doAction"])(AFTER_CREATING_ORDER_ACTION, json, _database__WEBPACK_IMPORTED_MODULE_14__["default"]);
            var ids = json.map(function (j) {
              return j.fake_id;
            });
            var final_orders = json.map(function (j) {
              delete j.fake_id;
              return j;
            });
            _database__WEBPACK_IMPORTED_MODULE_14__["default"].pos_orders.bulkDelete(ids).then(function (res) {
              _database__WEBPACK_IMPORTED_MODULE_14__["default"].pos_orders.bulkPut(final_orders).then(function (rsult) {
                resolve(json);
              });
            });
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.s) {
        var orders = this.state.orders;
      } else {
        var horders = Array.from(this.props.orders);
        horders.sort(function (a, b) {
          return a.order_id < b.order_id ? 1 : b.order_id < a.order_id ? -1 : 0;
        });
        var orders = horders.filter(function (order) {
          if (order.order_id.toString().indexOf("#") > -1) {
            return order;
          }
        });
      }

      if (this.state.first) {
        var defaultOrder = this.state.first;
      } else {
        var defaultOrder = orders.filter(function (def, i) {
          if (i == 0) {
            return def;
          }
        });
      }

      var order_short = defaultOrder.map(function (ord, i) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_history_short_short_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], {
          key: i,
          order: ord
        });
      });
      var order_summary = defaultOrder.map(function (sum, i) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_summary_summary_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], {
          key: i,
          order: sum
        });
      });
      var sync_orders = _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].sync_orders;
      var search_order_text = _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].search_order_text;
      var error_no_category_order = _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].error_no_category_order;
      var listProducts = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", {
        className: "no-order-result"
      }, error_no_category_order);
      var empty_offline_orders_list = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", {
        className: "no-result"
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_19__["__"])("We didn't find any results", 'wc_pos'));

      var Row = function Row(_ref) {
        var index = _ref.index,
            style = _ref.style;
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
          className: index % 2 ? "wkwcpos-list-item-even" : "wkwcpos-list-item-odd",
          style: style
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_list_list_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
          key: orders[index].order_id,
          onSelectOrder: _this2.handleChange,
          order: orders[index],
          style: style
        }));
      };

      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "pos-order-list"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "pos-order-search"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", {
        className: "fa fa-search"
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("input", {
        type: "search",
        name: "pos-order-search",
        id: "pos-order-search",
        placeholder: search_order_text,
        onChange: this.setSearch,
        autoComplete: "off"
      })), orders.length < 1 ? empty_offline_orders_list : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(react_window__WEBPACK_IMPORTED_MODULE_18__["FixedSizeList"], {
        className: "wkwcpos-list dropdownlist-order",
        height: 500,
        itemCount: orders.length,
        itemSize: 60
      }, Row)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        id: "order-main-summary"
      }, orders.length < 1 ? listProducts : order_short, orders.length < 1 ? '' : order_summary));
    }
  }]);

  return OfflineSale;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    orders: state.orders.list,
    sorder: state.orders.sorder
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({
    dispatch: dispatch
  }, Object(redux__WEBPACK_IMPORTED_MODULE_9__["bindActionCreators"])({
    getAllOrdersWC: _actions_orders__WEBPACK_IMPORTED_MODULE_13__["getAllOrdersWC"]
  }, dispatch));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(OfflineSale));

/***/ }),

/***/ "./src/js/components/body/tabs/order/offline/summary/summary.jsx":
/*!***********************************************************************!*\
  !*** ./src/js/components/body/tabs/order/offline/summary/summary.jsx ***!
  \***********************************************************************/
/*! exports provided: ADD_DATA_AFTER_TAX_IN_SUMMARY, MODIFY_ORDER_DETAILS, ADD_DATA_AFTER_TAX_IN_RECEIPT_CUSTOM, ADD_DATA_AFTER_TAX_IN_RECEIPT, wkwcpos_change_pos_total, WANT_TO_PRINT_RECIEPT, CHANGE_LISTING_OF_PRODUCTS, PERFORM_ACTION_AFTER_INVOICE_PRINT, UPDATE_POS_ORDER_SUB_TOTAL, ADD_DATA_AFTER_BALANCE_IN_RECEIPT, ADD_AFTER_PRINT_INVOICE_BUTTON_FILTER, CHANGE_IN_ORDER, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_DATA_AFTER_TAX_IN_SUMMARY", function() { return ADD_DATA_AFTER_TAX_IN_SUMMARY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODIFY_ORDER_DETAILS", function() { return MODIFY_ORDER_DETAILS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_DATA_AFTER_TAX_IN_RECEIPT_CUSTOM", function() { return ADD_DATA_AFTER_TAX_IN_RECEIPT_CUSTOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_DATA_AFTER_TAX_IN_RECEIPT", function() { return ADD_DATA_AFTER_TAX_IN_RECEIPT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wkwcpos_change_pos_total", function() { return wkwcpos_change_pos_total; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WANT_TO_PRINT_RECIEPT", function() { return WANT_TO_PRINT_RECIEPT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_LISTING_OF_PRODUCTS", function() { return CHANGE_LISTING_OF_PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERFORM_ACTION_AFTER_INVOICE_PRINT", function() { return PERFORM_ACTION_AFTER_INVOICE_PRINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_POS_ORDER_SUB_TOTAL", function() { return UPDATE_POS_ORDER_SUB_TOTAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_DATA_AFTER_BALANCE_IN_RECEIPT", function() { return ADD_DATA_AFTER_BALANCE_IN_RECEIPT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_AFTER_PRINT_INVOICE_BUTTON_FILTER", function() { return ADD_AFTER_PRINT_INVOICE_BUTTON_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_IN_ORDER", function() { return CHANGE_IN_ORDER; });
/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ "./node_modules/@babel/runtime/helpers/readOnlyError.js");
/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../translation */ "./src/js/translation.js");
/* harmony import */ var _currency_format__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../currency-format */ "./src/js/currency-format.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_html_parser__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }










var ADD_DATA_AFTER_TAX_IN_SUMMARY = 'wkwc_add_data_after_tax_in_summary';
var MODIFY_ORDER_DETAILS = "wkwc_modify_order_detials";
var ADD_DATA_AFTER_TAX_IN_RECEIPT_CUSTOM = 'wkwcpos_add_data_after_tax_in_receipt_custom';
var ADD_DATA_AFTER_TAX_IN_RECEIPT = 'wkwc_add_data_after_tax_in_receipt';
var wkwcpos_change_pos_total = 'wkwcpos_change_pos_total';
var WANT_TO_PRINT_RECIEPT = 'wkwcpos_want_to_print_reciept';
var CHANGE_LISTING_OF_PRODUCTS = 'wkwcpos_change_listing_of_products';
var PERFORM_ACTION_AFTER_INVOICE_PRINT = "wkwcpos_perform_action_after_invoice_print";
var UPDATE_POS_ORDER_SUB_TOTAL = 'wkwcpos_change_pos_sub_total';
var ADD_DATA_AFTER_BALANCE_IN_RECEIPT = 'wkwc_add_data_after_balance_in_receipt';
var ADD_AFTER_PRINT_INVOICE_BUTTON_FILTER = 'wkwcpos_add_after_print_invoice_button';
var CHANGE_IN_ORDER = 'wkwcpos_change_in_orders';

var OrderSummary = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(OrderSummary, _Component);

  var _super = _createSuper(OrderSummary);

  function OrderSummary(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, OrderSummary);

    _this = _super.call(this, props);
    _this.state = {
      order: ''
    };
    _this.handlePrintClick = _this.handlePrintClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.GetHtml = _this.GetHtml.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.getInvoice = _this.getInvoice.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.setupInvoiceSize = _this.setupInvoiceSize.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.openPrintWindow = _this.openPrintWindow.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["doAction"])(CHANGE_IN_ORDER, _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(OrderSummary, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newOrder) {
      this.setState({
        order: newOrder
      });
    }
  }, {
    key: "getInvoice",
    value: function getInvoice() {
      var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var logo_invoice = '${logo_invoice}';
      var outlet_name = '${outlet_name}';
      var order_id = '${order_id}';
      var order_date = '${order_date}';
      var customer_fname = '${customer_fname}';
      var customer_lname = '${customer_lname}';
      var outlet_address = '${outlet_address}';
      var outlet_city = '${outlet_city}';
      var outlet_state = '${outlet_state}';
      var outlet_country = '${outlet_country}';
      var outlet_postcode = '${outlet_postcode}';
      var pos_user_phone = '${pos_user_phone}';
      var pos_user_email = '${pos_user_email}';
      var pro_name = '${pro_name}';
      var pro_quantity = '${pro_quantity}';
      var pro_unit_price = '${pro_unit_price}';
      var pro_total = '${pro_total}';
      var sub_total = '${sub_total}';
      var tax_title = '${tax_title}';
      var order_tax = '${order_tax}';
      var coupon_name = '${coupon_name}';
      var coupon_amount = '${coupon_amount}';
      var order_discount = '${order_discount}';
      var order_total = '${order_total}';
      var cashpay_amount = '${cashpay_amount}';
      var other_payment_text = '${other_payment_text}';
      var otherpay_amount = '${otherpay_amount}';
      var order_change = '${order_change}';
      var cashier_name = '${cashier_name}';
      logo_invoice = apif_script.logged_in.logo_invoice;

      if (apif_script.logged_in.outlet_data) {
        var outlet = apif_script.logged_in.outlet_data;
        outlet_name = outlet.outlet_name;
        outlet_address = outlet.outlet_address;
        outlet_city = outlet.outlet_city;
        outlet_state = outlet.outlet_state;
        outlet_country = outlet.outlet_country;
        outlet_postcode = outlet.outlet_postcode;
      }

      if (apif_script.logged_in.pos_user_phone) {
        pos_user_phone = apif_script.logged_in.pos_user_phone;
      }

      if (order) {
        if (order.order_type == 'online') {
          order_id = '#' + order.order_id;
          order_date = order.order_date;
          customer_fname = order.billing.fname;
          customer_lname = order.billing.lname;
          sub_total = order.cart_subtotal;
          order_discount = order.discount;
          order_total = order.order_html;
          cashpay_amount = order.cashPay > 0 ? order.cashPay_html : 'N/A';
          otherpay_amount = order.cardPay > 0 ? order.cardPay_html : 'N/A';
          other_payment_text = order.cardPay > 0 ? order.payment_title : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Other Payments', 'wc_pos');
          order_change = order.balance;
          pro_name = '';
          pro_unit_price = '';
          pro_quantity = '';
          pro_total = '';
          var tbl_data = '';
          order.products.forEach(function (pro, i) {
            tbl_data += "<tr>\n                        <td class=\"wkwcpos-invoice-editable\">".concat(pro.product_name);

            if (pro.product_meta_data) {
              tbl_data += "<br><p>".concat(Object.keys(pro.product_meta_data)) + "-" + "".concat(Object.values(pro.product_meta_data), "</p>");
            }

            tbl_data += "</td >\n                        <td class=\"wkwcpos-invoice-editable\">".concat(pro.product_unit_price, "</td>\n                        <td class=\"wkwcpos-invoice-editable\">").concat(pro.qty, "</td>\n                        <td class=\"wkwcpos-invoice-editable\">").concat(pro.product_total_price, "</td>\n                    </tr>");
          });
          var order_tax_lines = order.tax_lines;
          tax_title = '';
          order_tax = '';

          if (order_tax_lines.length > 0) {
            order_tax_lines.forEach(function (tax) {
              tax_title += "<p>".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Tax', 'wc_pos'), "(").concat(tax.title, ")</p>");
              order_tax += "<p>".concat(tax.total, "</p>");
            });
          }

          var customAfterTax = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(ADD_DATA_AFTER_TAX_IN_RECEIPT_CUSTOM, '', order);

          if (customAfterTax) {
            order.coupons = customAfterTax;
          }

          var coupons = order.coupons;
          coupon_name = '';
          coupon_amount = '';
          Object.keys(coupons).forEach(function (i, val) {
            coupon_name += "<p>".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Coupon', 'wc_pos'), "(").concat(i, ")</p>");

            if (coupons[i]) {
              coupon_amount += "<p>".concat(coupons[i], "</p>");
            }
          });
        } else if (order.order_type == 'offline') {
          var currency = order.currency;
          var currency_code = currency.symbol;
          order_id = order.order_id;
          var date = new Date(order.order_date).toDateString();
          date = date.split(' ').slice(0, 4).join(' ');
          order_date = date;
          customer_fname = order.billing.first_name;
          customer_lname = order.billing.last_name;
          sub_total = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(order.cart_subtotal, currency_code);
          var discount = order.discount;

          if (Object.keys(discount).length > 0) {
            if (discount.type == 'fixed') {
              var totaldiscount = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(-parseFloat(discount.amount), currency_code);
            } else {
              var totaldiscount = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(-parseFloat(discount.amount * order.cart_subtotal / 100), currency_code);
            }
          } else {
            var totaldiscount = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(0), currency_code);
          }

          order_discount = totaldiscount;
          order_total = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(order.order_html), currency_code);
          cashpay_amount = order.cashPay > 0 ? Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(order.cashPay), currency_code) : 'N/A';
          otherpay_amount = order.cardPay > 0 ? Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(order.cardPay), currency_code) : 'N/A';
          other_payment_text = order.cardPay > 0 ? order.payment_title : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Other Payments', 'wc_pos');
          var balance = order.tendered - order.order_html;
          order_change = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(balance), currency_code);
          pro_name = '';
          pro_unit_price = '';
          pro_quantity = '';
          pro_total = '';
          var productInlineDiscount = [];
          order.products.forEach(function (pro, i) {
            if (pro.uf < pro.special) {
              productInlineDiscount.push({
                slug: pro.slug,
                discount: (pro.special - pro.uf) * pro.quantity
              });
            }

            pro_name += "<p>".concat(pro.name, "</p>");
            pro_unit_price += "<p>".concat(Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(pro.uf, currency_code), "</p>");
            pro_quantity += "<p>".concat(pro.quantity, "</p>");
            pro_total += "<p>".concat(Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(pro.uf_total, currency_code), "</p>");

            if (pro.product_meta_data) {
              pro_name += "<p>".concat(Object.keys(pro.product_meta_data), "</p>");
              pro_unit_price += '<br />';
              pro_quantity += '<br />';
              pro_total += '<br />';
            }

            if (pro.product_meta_data) {
              pro_name += "<p>".concat(Object.values(pro.product_meta_data), "</p>");
              pro_unit_price += '<br />';
              pro_quantity += '<br />';
              pro_total += '<br />';
            }
          });
          var _order_tax_lines = order.tax_lines;

          if (_order_tax_lines.length == undefined) {
            Object.keys(_order_tax_lines).map(function (key) {
              _order_tax_lines[key].id = Number(key);
              return [_order_tax_lines[key]];
            }), _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()("order_tax_lines");
            _order_tax_lines[0], _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()("order_tax_lines");
          }

          tax_title = '';
          order_tax = '';

          if (_order_tax_lines.length > 0) {
            _order_tax_lines.forEach(function (tax) {
              tax_title += "<p>".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Tax', 'wc_pos'), "(").concat(tax.label, ")</p>");
              order_tax += "<p>".concat(Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(tax.rate * order.cart_subtotal / 100), currency_code), "</p>");
            });
          }

          coupon_name = '';
          coupon_amount = '';

          if (order.coupons && order.coupons.length > 0) {
            order.coupons.forEach(function (coupon) {
              coupon_name += "<p>".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Coupon', 'wc_pos'), "(").concat(coupon.code, ")</p>");
              coupon_amount += "<p>".concat(Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(coupon.price, currency_code), "</p>");
            });
          }

          if (productInlineDiscount && productInlineDiscount.length > 0) {
            productInlineDiscount.forEach(function (product) {
              coupon_name += "<p>".concat(Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Coupon', 'wc_pos'), "(").concat(product.slug, ")</p>");
              coupon_amount += "<p>".concat(Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(product.discount, currency_code), "</p>");
            });
          }
        }
      }

      if (apif_script.logged_in.pos_user) {
        pos_user_email = apif_script.logged_in.pos_user.data.user_email;
        cashier_name = apif_script.logged_in.pos_user.data.display_name;
      }

      var invoiceData = '';

      if (this.props.invoice && this.props.invoice != "0") {
        invoiceData = this.props.invoice;
      } else {
        invoiceData = "\n\n                <style>\n                    .wkwcpos-invoice-wrapper {\n                        padding: 10px;\n                        background-color: #fff;\n                        border-radius: 2px;\n                        grid-area: second;\n                    }\n                    .wkwcpos-invoice-wrapper * {\n                        padding: 0;\n                        margin: 0;\n                    }\n                    .wkwcpos-invoice-wrapper .invoice-header, .wkwcpos-invoice-wrapper .invoice-footer .footer-details {\n                        text-align: center;\n                    }\n                    .wkwcpos-invoice-wrapper .invoice-header img {\n                        width: 50px;\n                        margin: 10px 0;\n                    }\n                    .wkwcpos-invoice-wrapper .invoice-details {\n                        width: 100%;\n                        display: inline-block;\n                    }\n                    .wkwcpos-invoice-wrapper .order-details, .wkwcpos-invoice-wrapper .outlet-details {\n                        width: 50%;\n                    }\n                    .wkwcpos-invoice-wrapper .invoice-details .order-details {\n                        float: left;\n                    }\n                    .wkwcpos-invoice-wrapper .invoice-details .outlet-details {\n                        float: right;\n                        text-align: right;\n                    }\n                    .wkwcpos-invoice-wrapper .product-details {\n                        margin: 15px 0;\n                    }\n                    .wkwcpos-invoice-wrapper .product-details table {\n                        border-collapse: collapse;\n                        width: 100%;\n                        text-align: center;\n                    }\n                    .wkwcpos-invoice-wrapper .product-details table th, .wkwcpos-invoice-wrapper .product-details table td {\n                        padding: 3px 0;\n                    }\n                    .wkwcpos-invoice-wrapper .product-details table th, .wkwcpos-invoice-wrapper .product-details table td p {\n                        padding: 3px 0;\n                    }\n                    .wkwcpos-invoice-wrapper .product-details table thead, .wkwcpos-invoice-wrapper .product-details table tbody:nth-of-type(1) {\n                        border-style: dashed;\n                        border-width: 3px 0 3px;\n                        border-color: #ddd;\n                    }\n                    .wkwcpos-invoice-wrapper .product-details table tbody:nth-of-type(3) {\n                        border-style: dashed;\n                        border-width: 0 0 3px;\n                        border-color: #ddd;\n                    }\n                    .wkwcpos-invoice-wrapper .product-details table tbody:nth-of-type(2) tr:last-child td:nth-last-of-type(1), .wkwcpos-invoice-wrapper .product-details table tbody:nth-of-type(2) tr:last-child td:nth-last-of-type(2) {\n                        border-style: dashed;\n                        border-width: 0 0 3px;\n                        border-color: #ddd;\n                    }\n                    .wkwcpos-invoice-wrapper hr {\n                        width: 35%;\n                        margin: 10px auto 7px;\n                        border-style: dashed;\n                        border-width: 3px 0;\n                        border-top-color: #ddd;\n                        border-bottom-color: #fafafa;\n                    }\n\n\n                </style>\n\n                <div class=\"wkwcpos-invoice-wrapper\">\n\n                    <div class=\"invoice-header wkwcpos-invoice-editable\">\n                        <p class=\"wkwcpos-invoice-editable\">Tax Invoice/Bill of Supply</p>\n                        <img src=\"".concat(logo_invoice, "\" class=\"wkwcpos-invoice-editable\" />\n                        <h3 class=\"wkwcpos-invoice-editable\">").concat(outlet_name, "</h3>\n                    </div>\n\n                    <div class=\"invoice-details\">\n                        <div class=\"order-details\">\n                            <p class=\"wkwcpos-invoice-editable\">Order - ").concat(order_id, "</p>\n                            <p class=\"wkwcpos-invoice-editable\">Date : ").concat(order_date, "</p>\n                            <p class=\"wkwcpos-invoice-editable\">Customer : ").concat(customer_fname, " ").concat(customer_lname, "</p>\n                        </div>\n                        <div class=\"outlet-details\">\n                            <p class=\"wkwcpos-invoice-editable\">").concat(outlet_address, "</p>\n                            <p class=\"wkwcpos-invoice-editable\">").concat(outlet_city, " ").concat(outlet_state, "</p>\n                            <p class=\"wkwcpos-invoice-editable\">Tel No: ").concat(pos_user_phone, "</p>\n                        </div>\n                    </div>\n\n                    <div class=\"product-details\">\n                        <table>\n                            <thead>\n                                <tr>\n                                    <th class=\"wkwcpos-invoice-editable\">Product Name</th>\n                                    <th class=\"wkwcpos-invoice-editable\">Unit Price</th>\n                                    <th class=\"wkwcpos-invoice-editable\">Quantity</th>\n                                    <th class=\"wkwcpos-invoice-editable\">Total Price</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                ").concat(tbl_data, "\n                            </tbody>\n                            <tbody>\n                                <tr>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\">SubTotal</td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(sub_total, "</td>\n                                </tr>\n                                <tr>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(tax_title, "</td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(order_tax, "</td>\n                                </tr>\n                                <tr>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\">Discount</td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(order_discount, "</td>\n                                </tr>\n                                <tr>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(coupon_name, "</td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(coupon_amount, "</td>\n                                </tr>\n                            </tbody>\n                            <tbody>\n                                <tr>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\">Total</td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(order_total, "</td>\n                                </tr>\n                                <tr>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\">Cash Payment</td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(cashpay_amount, "</td>\n                                </tr>\n                                <tr>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(other_payment_text, "</td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(otherpay_amount, "</td>\n                                </tr>\n                                <tr>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\"></td>\n                                    <td class=\"wkwcpos-invoice-editable\">Change</td>\n                                    <td class=\"wkwcpos-invoice-editable\">").concat(order_change, "</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <div class=\"invoice-footer\">\n                        <p class=\"wkwcpos-invoice-editable\">Cashier: ").concat(cashier_name, "</p>\n                        <div class=\"footer-details\">\n                            <p class=\"wkwcpos-invoice-editable\">").concat(outlet_name, "</p>\n                            <p class=\"wkwcpos-invoice-editable\">Tel No: ").concat(pos_user_phone, "</p>\n                            <p class=\"wkwcpos-invoice-editable\">Email: ").concat(pos_user_email, "</p>\n                            <hr class=\"wkwcpos-invoice-editable\" />\n                            <p class=\"wkwcpos-invoice-editable\">Have a nice day</p>\n                        </div>\n                    </div>\n                </div>");
      }

      invoiceData = eval('`' + invoiceData + '`');
      return react_html_parser__WEBPACK_IMPORTED_MODULE_15___default()(invoiceData);
    }
  }, {
    key: "handlePrintClick",
    value: function handlePrintClick(e, order_id) {
      var order = this.props.order;

      if (order.order_id == order_id) {
        // var invoiceHtml = this.GetHtml(order);
        var invoiceHtml = this.getInvoice(order);
        var styles = this.setupInvoiceSize();
        react_dom__WEBPACK_IMPORTED_MODULE_13___default.a.unmountComponentAtNode(document.getElementById('invoice-body'));
        react_dom__WEBPACK_IMPORTED_MODULE_13___default.a.render(invoiceHtml, document.getElementById('invoice-body'));
        this.openPrintWindow(jQuery("#invoice-print").html(), styles);
      }
    }
  }, {
    key: "openPrintWindow",
    value: function openPrintWindow(printContents, style) {
      var order = this.props.order;
      Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["doAction"])(PERFORM_ACTION_AFTER_INVOICE_PRINT, order);

      if (Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(WANT_TO_PRINT_RECIEPT, true, order)) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          var printWindow = window.open("", "PRINT", "height=400,width=600"); // printWindow.document.write("<link media='all' href='" + apif_script.assets + "/css/min/invoice.min.css?ver=1.0.7' type='text/css' rel='stylesheet'>");

          printWindow.document.write("<html><head><title></title>" + style);
          printWindow.document.write("</head><body>");
          printWindow.document.write(printContents);
          printWindow.document.write("</body></html>");
          printWindow.document.close(); // necessary for IE >= 10

          printWindow.focus(); // necessary for IE >= 10*-/

          printWindow.addEventListener("load", function () {
            setTimeout(function () {
              printWindow.print();
            }, 500);
          }, true);
        } else {
          var frame1 = document.createElement('iframe');
          frame1.name = "frame1";
          document.body.appendChild(frame1);
          var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
          frameDoc.document.open();
          frameDoc.document.write("<html><head><title></title>" + style);
          frameDoc.document.write("</head><body>");
          frameDoc.document.write(printContents);
          frameDoc.document.write("</body></html>");
          frameDoc.document.close(); // necessary for IE >= 10

          setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
          }, 100);
        }
      }

      return true;
    }
  }, {
    key: "setupInvoiceSize",
    value: function setupInvoiceSize() {
      var printer = this.props.printers;
      var sprinter = printer.default;
      var style_rules = [];

      if (sprinter) {
        switch (sprinter) {
          case 'a3':
            style_rules.push(" @page { size: A3;margin: 20mm;} ");
            var style = '<style type="text/css">' + style_rules.join("\n") + "</style>";
            break;

          case 'a4':
            style_rules.push(" @page { size: A4;margin: 20mm; } ");
            var style = '<style type="text/css">' + style_rules.join("\n") + "</style>";
            break;

          case 'a5':
            style_rules.push(" @page { size: A5; margin: 10mm;} ");
            var style = '<style type="text/css">' + style_rules.join("\n") + "</style>";
            break;

          case 'a6':
            style_rules.push(" @page { size: A6; margin: 10mm;} ");
            var style = '<style type="text/css">' + style_rules.join("\n") + "</style>";
            break;

          case 'T88V':
            style_rules.push(" @page {size: 58mm 120mm; }  ");
            var style = '<style type="text/css">' + '.invoice-head, .invoice-body, .invoice-footer{ width:70mm;}' + style_rules.join("\n") + "</style>";
            jQuery(".invoice-head, .invoice-body, .invoice-footer").css("font-size", "12px;");
            break;

          default:
            break;
        }

        return style;
      }
    }
  }, {
    key: "GetHtml",
    value: function GetHtml(order) {
      var paymentMode = order.payment_title;
      var cashPay_text = '';
      var cardPay_text = '';
      var cash_payment_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].cash_text;

      if (order.cashPay > 0) {
        cashPay_text = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, cash_payment_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
          dangerouslySetInnerHTML: {
            __html: order.cashPay_html
          }
        }));
      }

      if (order.cardPay > 0) {
        cardPay_text = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, paymentMode), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
          dangerouslySetInnerHTML: {
            __html: order.cardPay_html
          }
        }));
      }

      var products = Array.from(order.products);
      var order_tax_lines = order.tax_lines;

      if (order_tax_lines.length > 0) {
        var oTax = order_tax_lines.map(function (tax) {
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", {
            key: tax.id
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, "\xA0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, "\xA0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
            className: "sub-total"
          }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Tax', 'wc_pos'), "(", tax.title, ")"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
            dangerouslySetInnerHTML: {
              __html: tax.total
            }
          }));
        });
      } else {
        var oTax = '';
      }

      var coupons = order.coupons;

      if (coupons) {
        var coupon_html = [];
        jQuery.each(coupons, function (i, coupon) {
          coupon_html.push(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", {
            key: i
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, "\xA0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, "\xA0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
            className: "sub-total"
          }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('Coupon', 'wc_pos'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", null, "(", i, ")")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
            className: "coupon-amt"
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
            dangerouslySetInnerHTML: {
              __html: coupon
            }
          }))));
        });
      } else {
        var coupon_html = '';
      }

      var orderproducts = products.map(function (pro, i) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", {
          className: "border_bottom",
          key: i
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
          className: "product-name"
        }, pro.product_name, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("br", null), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("p", {
          className: "order-product-meta-heading"
        }, pro.product_meta_data ? Object.keys(pro.product_meta_data) : ""), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("p", {
          className: "order-product-meta"
        }, " ", pro.product_meta_data ? Object.values(pro.product_meta_data) : "")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
          className: "product-quantity"
        }, pro.qty), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
          className: "product-unit-price"
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
          dangerouslySetInnerHTML: {
            __html: pro.product_unit_price
          }
        })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
          className: "product-total-price"
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
          dangerouslySetInnerHTML: {
            __html: pro.product_total_price
          }
        })));
      });
      orderproducts = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(CHANGE_LISTING_OF_PRODUCTS, orderproducts, products);
      var customData = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(ADD_CUSTOM_ORDER_DATA_BELOW_DATE, '', order);
      var order_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].order_text;
      var date_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].date;
      var subtotal_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].subtotal_text;
      var total_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].total_text;
      var discount_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].discount_text;
      var balance_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].balance_text;
      var refund_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].refund_text;
      var customer_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].customer_text;
      var orderRefund = order.total_refund ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", {
        className: "order-balance"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, refund_text, " "), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", null, react_html_parser__WEBPACK_IMPORTED_MODULE_15___default()(order.currency), react_html_parser__WEBPACK_IMPORTED_MODULE_15___default()(order.total_refund)))) : '';
      var customAfterTax = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(ADD_DATA_AFTER_TAX_IN_RECEIPT, '', order);
      var customAfterBalance = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(ADD_DATA_AFTER_BALANCE_IN_RECEIPT, '', order);
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-order-short"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-order-sect"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("p", null, order_text, " - #", order.order_id), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("p", {
        className: "date"
      }, date_text, ": ", order.order_date)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-sumarry-customer"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("p", {
        className: "customer-name"
      }, customer_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("p", {
        className: "customer-name"
      }, order.billing.fname, " ", order.billing.lname), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("p", {
        className: "custom-data"
      }, customData))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-sale-summary"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "sale-summary-products"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("table", {
        className: "order-product-wrap"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("thead", {
        className: "border_bottom"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("th", {
        className: "product-name"
      }, _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].product_name_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("th", {
        className: "product-quantity"
      }, _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].quantity_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("th", {
        className: "product-unit-price"
      }, _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].unit_price_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("th", {
        className: "product-total-price"
      }, _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].total_price_text))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tbody", null, orderproducts, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, "\xA0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, "\xA0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
        className: "sub-total"
      }, subtotal_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
        dangerouslySetInnerHTML: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(UPDATE_POS_ORDER_SUB_TOTAL, {
          __html: order.cart_subtotal
        }, order)
      })), oTax, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, "\xA0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, "\xA0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
        className: "sub-total"
      }, discount_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
        dangerouslySetInnerHTML: {
          __html: order.discount
        }
      })), coupon_html, customAfterTax))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "sale-summary-calculate-total"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, total_text, " "), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
        dangerouslySetInnerHTML: Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(wkwcpos_change_pos_total, {
          __html: order.order_html
        }, order)
      })), cashPay_text, cardPay_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", {
        className: "order-balance"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, balance_text, " "), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
        dangerouslySetInnerHTML: {
          __html: order.balance
        }
      }))), orderRefund, customAfterBalance)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var unit_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].unit_text;
      var tax_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].tax_text;
      var order_summary = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].order_summary;
      var subtotal_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].subtotal_text;
      var total_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].total_text;
      var discount_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].discount_text;
      var balance_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].balance_text;
      var cash_payment_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].cash_text;
      var card_payment_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].card_text;
      var printInvoice_text = _translation__WEBPACK_IMPORTED_MODULE_9__["translation"].printInvoice_text;

      if (this.state.order) {
        var order = this.state.order;
        order = order.order;
      } else {
        var order = this.props.order;
      }

      var paymentMode = order.payment_title;
      var currency = order.currency;
      var currency_code = currency.symbol;
      var currency_position = 'L';
      var discount = order.discount;
      var order_tax_lines = order.tax_lines;

      if (order_tax_lines.length == undefined) {
        order_tax_lines = Object.keys(order_tax_lines).map(function (key) {
          order_tax_lines[key].id = Number(key);
          return [order_tax_lines[key]];
        });
        order_tax_lines = order_tax_lines[0];
      }

      if (order_tax_lines.length > 0) {
        var oTax = order_tax_lines.map(function (tax) {
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", {
            key: tax.id
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, tax_text, "(", tax.label, ")"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", null, Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(tax.rate * order.cart_subtotal / 100), currency_code)));
        });
      } else {
        var oTax = '';
      }

      var products = order.products;
      var orderproducts = products.map(function (pro, i) {
        var product_total = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(pro.uf_total, currency_code);
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", {
          key: i
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
          className: "order-product-wrap"
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, pro.name), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("strong", null, pro.product_meta_data ? Object.keys(pro.product_meta_data) : ""), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("p", {
          className: "order-product-meta"
        }, " ", pro.product_meta_data ? Object.values(pro.product_meta_data) : ""), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
          className: "order-product-quantity"
        }, pro.quantity, " ", unit_text)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
          dangerouslySetInnerHTML: {
            __html: product_total
          }
        }));
      });
      var balance = order.tendered - order.order_html;
      var subtotal = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(order.cart_subtotal, currency_code);
      var balance = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(balance), currency_code);

      if (Object.keys(discount).length > 0) {
        if (discount.type == 'fixed') {
          var totaldiscount = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(discount.amount), currency_code);
        } else {
          // var totaldiscount = parseFloat(discount.amount).toFixed(2) + '%';
          var totaldiscount = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(discount.amount * order.cart_subtotal / 100), currency_code);
        }
      } else {
        var totaldiscount = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(0), currency_code);
      }

      var cart_total = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(order.order_html), currency_code);
      var cashPay = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(order.cashPay), currency_code);
      var cardPay = Object(_currency_format__WEBPACK_IMPORTED_MODULE_10__["wkwcpos_price"])(parseFloat(order.cardPay), currency_code);
      var customAfterTax = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(ADD_DATA_AFTER_TAX_IN_SUMMARY, '', order);
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-sale-summary"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "sale-summary-products"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", null, orderproducts)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-sale-summary-total"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", {
        className: "sale-summary-subtotal"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, subtotal_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
        dangerouslySetInnerHTML: {
          __html: subtotal
        }
      })), oTax, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, discount_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", null, totaldiscount)), customAfterTax), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", {
        className: "sale-summary-total"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, total_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
        dangerouslySetInnerHTML: {
          __html: cart_total
        }
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, order.cashPay > 0 ? cash_payment_text : ""), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", null, order.cashPay > 0 ? cashPay : "")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, order.cardPay > 0 ? paymentMode : ""), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", null, order.cardPay > 0 ? cardPay : ""))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", {
        className: "order-balance"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, balance_text, " "), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
        dangerouslySetInnerHTML: {
          __html: balance
        }
      }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-order-invoice"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("button", {
        type: "button",
        className: "print-invoice primary",
        onClick: function onClick(e) {
          return _this2.handlePrintClick(e, order.order_id);
        }
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("i", {
        className: "fa fa-print"
      }), "\xA0", printInvoice_text)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-order-return",
        id: "pos-order-return",
        "data-orderid": order.order_id
      }), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_11__["applyFilters"])(ADD_AFTER_PRINT_INVOICE_BUTTON_FILTER, '', order)));
    }
  }]);

  return OrderSummary;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    printers: state.printers,
    invoice: state.invoice
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({
    dispatch: dispatch
  }, Object(redux__WEBPACK_IMPORTED_MODULE_16__["bindActionCreators"])({}, dispatch));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_14__["connect"])(mapStateToProps, mapDispatchToProps)(OrderSummary));

/***/ }),

/***/ "./src/js/currency-format.js":
/*!***********************************!*\
  !*** ./src/js/currency-format.js ***!
  \***********************************/
/*! exports provided: wkwcpos_price */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wkwcpos_price", function() { return wkwcpos_price; });
// The library's settings configuration object. Contains default parameters for
// currency and number formatting
var settings = {
  currency: {
    symbol: "$",
    // default currency symbol is '$'
    format: "%s%v",
    // controls output: %s = symbol, %v = value (can be object, see docs)
    decimal: ".",
    // decimal point separator
    thousand: ",",
    // thousands separator
    precision: 2,
    // decimal places
    grouping: 3 // digit grouping (not implemented yet)

  },
  number: {
    precision: 0,
    // default precision on numbers is 0
    grouping: 3,
    // digit grouping (not implemented yet)
    thousand: ",",
    decimal: "."
  }
}; // Store reference to possibly-available ECMAScript 5 methods for later

var nativeMap = Array.prototype.map,
    nativeIsArray = Array.isArray,
    toString = Object.prototype.toString;
/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, "$", 2, ",", ".", "%s%v")
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 * Second param can be an object matching `settings.currency` which is the easiest way.
 *
 * To do: tidy up the parameters
 */

function formatMoney(number, symbol, precision, thousand, decimal, format) {
  // Resursively format arrays:
  if (isArray(number)) {
    return map(number, function (val) {
      return formatMoney(val, symbol, precision, thousand, decimal, format);
    });
  } // Clean up number:


  number = unformat(number); // Build options object from second param (if object) or all params, extending defaults:

  var opts = defaults(isObject(symbol) ? symbol : {
    symbol: symbol,
    precision: precision,
    thousand: thousand,
    decimal: decimal,
    format: format
  }, settings.currency),
      // Check format (returns object with pos, neg and zero):
  formats = checkCurrencyFormat(opts.format),
      // Choose which format to use for this value:
  useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero; // Return with currency symbol added:

  return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
}

;
/**
 * Tests whether supplied parameter is a string
 * from underscore.js, delegates to ECMA5's native Array.isArray
 */

function isArray(obj) {
  return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
}
/**
 * Check and normalise the value of precision (must be positive integer)
 */


function checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val) ? base : val;
}
/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
 * problems for accounting- and finance-related software.
 */


var toFixed = function toFixed(value, precision) {
  precision = checkPrecision(precision, settings.number.precision);
  var power = Math.pow(10, precision); // Multiply up by precision, round accurately, then divide and use native toFixed():

  return (Math.round(unformat(value) * power) / power).toFixed(precision);
};
/**
 * Tests whether supplied parameter is a string
 * from underscore.js
 */


function isString(obj) {
  return !!(obj === '' || obj && obj.charCodeAt && obj.substr);
}
/**
 * Tests whether supplied parameter is a true object
 */


function isObject(obj) {
  return obj && toString.call(obj) === '[object Object]';
}
/**
 * Extends an object with a defaults object, similar to underscore's _.defaults
 *
 * Used for abstracting parameter handling from API methods
 */


function defaults(object, defs) {
  var key;
  object = object || {};
  defs = defs || {}; // Iterate over object non-prototype properties:

  for (key in defs) {
    if (defs.hasOwnProperty(key)) {
      // Replace values with defaults only if undefined (allow empty/zero values):
      if (object[key] == null) object[key] = defs[key];
    }
  }

  return object;
}
/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 * 2nd parameter `precision` can be an object matching `settings.number`
 */


var formatNumber = function formatNumber(number, precision, thousand, decimal) {
  // Resursively format arrays:
  if (isArray(number)) {
    return map(number, function (val) {
      return formatNumber(val, precision, thousand, decimal);
    });
  } // Clean up number:


  number = unformat(number); // Build options object from second param (if object) or all params, extending defaults:

  var opts = defaults(isObject(precision) ? precision : {
    precision: precision,
    thousand: thousand,
    decimal: decimal
  }, settings.number),
      // Clean up precision
  usePrecision = checkPrecision(opts.precision),
      // Do some calc:
  negative = number < 0 ? "-" : "",
      base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
      mod = base.length > 3 ? base.length % 3 : 0; // Format the number:

  return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
};
/**
 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
 * Alias: `accounting.parse(string)`
 *
 * Decimal must be included in the regular expression to match floats (defaults to
 * accounting.settings.number.decimal), so if the number uses a non-standard decimal
 * separator, provide it as the second argument.
 *
 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
 *
 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
 */


var unformat = function unformat(value, decimal) {
  // Recursively unformat arrays:
  if (isArray(value)) {
    return map(value, function (val) {
      return unformat(val, decimal);
    });
  } // Fails silently (need decent errors):


  value = value || 0; // Return the value as-is if it's already a number:

  if (typeof value === "number") return value; // Default decimal point comes from settings, but could be set to eg. "," in opts:

  decimal = decimal || settings.number.decimal; // Build regex to strip out everything except digits, decimal point and minus sign:

  var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
      unformatted = parseFloat(("" + value).replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
  .replace(regex, '') // strip out any cruft
  .replace(decimal, '.') // make sure decimal point is standard
  ); // This will fail silently which may cause trouble, let's wait and see:

  return !isNaN(unformatted) ? unformatted : 0;
};
/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values (or a function returning
 * either a string or object)
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 */


function checkCurrencyFormat(format) {
  var defaults = settings.currency.format; // Allow function as format parameter (should return string or object):

  if (typeof format === "function") format = format(); // Format can be a string, in which case `value` ("%v") must be present:

  if (isString(format) && format.match("%v")) {
    // Create and return positive, negative and zero formats:
    return {
      pos: format,
      neg: format.replace("-", "").replace("%v", "-%v"),
      zero: format
    }; // If no format, or object is missing valid positive value, use defaults:
  } else if (!format || !format.pos || !format.pos.match("%v")) {
    // If defaults is a string, casts it to an object for faster checking next time:
    return !isString(defaults) ? defaults : settings.currency.format = {
      pos: defaults,
      neg: defaults.replace("%v", "-%v"),
      zero: defaults
    };
  } // Otherwise, assume format was fine:


  return format;
}

var wkwcpos_price = function wkwcpos_price(price) {
  var currencySymbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return formatMoney(price, {
    symbol: currencySymbol ? currencySymbol : apif_script.currency_format_symbol,
    decimal: apif_script.currency_format_decimal_sep,
    thousand: apif_script.currency_format_thousand_sep,
    precision: apif_script.currency_format_num_decimals,
    format: apif_script.currency_format
  });
};

/***/ }),

/***/ 2:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9yZWFkT25seUVycm9yLmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL3NyYy9qcy9jb21wb25lbnRzL2JvZHkvdGFicy9vcmRlci9oaXN0b3J5L3Nob3J0L3Nob3J0LmpzeCIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvY29tcG9uZW50cy9ib2R5L3RhYnMvb3JkZXIvb2ZmbGluZS9saXN0L2xpc3QuanN4Iiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL3NyYy9qcy9jb21wb25lbnRzL2JvZHkvdGFicy9vcmRlci9vZmZsaW5lL29mZmxpbmUuanN4Iiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL3NyYy9qcy9jb21wb25lbnRzL2JvZHkvdGFicy9vcmRlci9vZmZsaW5lL3N1bW1hcnkvc3VtbWFyeS5qc3giLCJ3ZWJwYWNrOi8vd2MuW21vZHVsZW5hbWVdLy4vc3JjL2pzL2N1cnJlbmN5LWZvcm1hdC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vcmVhZGFibGUtc3RyZWFtIChpZ25vcmVkKSJdLCJuYW1lcyI6WyJBRERfQ1VTVE9NX09SREVSX0RBVEFfQkVMT1dfREFURSIsIk1PRElGWV9PUkRFUl9ERVRBSUxTIiwiT3JkZXJTaG9ydCIsInByb3BzIiwib3JkZXIiLCJkYXRlIiwiRGF0ZSIsIm9yZGVyX2RhdGUiLCJ0b0RhdGVTdHJpbmciLCJzcGxpdCIsInNsaWNlIiwiam9pbiIsImFwcGx5RmlsdGVycyIsIm9yZGVyX2hlYWRpbmdfdGV4dCIsInRyYW5zbGF0aW9uIiwiY3VzdG9tRGF0YUFyciIsImN1c3RvbURhdGEiLCJjdXN0b21fZGF0YSIsImxlbmd0aCIsIm1hcCIsImRhdGEiLCJpIiwibGFiZWwiLCJ2YWx1ZSIsIm9yZGVyX2lkIiwidG9TdHJpbmciLCJvcmRlcklkIiwicmVwbGFjZSIsImN1c3RvbWVyTmFtZSIsImJpbGxpbmciLCJmbmFtZSIsInVuZGVmaW5lZCIsImxuYW1lIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsIm9mZmxpbmVfaWQiLCJfXyIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwib3JkZXJzIiwibGlzdCIsInByaW50ZXJzIiwiaW52b2ljZSIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImRpc3BhdGNoIiwiT2JqZWN0IiwiYXNzaWduIiwiYmluZEFjdGlvbkNyZWF0b3JzIiwiY29ubmVjdCIsIk9yZGVyTGlzdCIsImhhbmRsZUNsaWNrIiwiYmluZCIsImV2ZW50IiwialF1ZXJ5IiwidGFyZ2V0IiwiY2xvc2VzdCIsImF0dHIiLCJmaWx0ZXIiLCJvYmoiLCJpZCIsIm9uU2VsZWN0T3JkZXIiLCJjdXJyZW5jeSIsImN1cnJlbmN5X2NvZGUiLCJzeW1ib2wiLCJjYXJ0X3RvdGFsIiwid2t3Y3Bvc19wcmljZSIsInBhcnNlRmxvYXQiLCJvcmRlcl9odG1sIiwiZSIsIkFGVEVSX0NSRUFUSU5HX09SREVSX0FDVElPTiIsIk9mZmxpbmVTYWxlIiwiZmlyc3QiLCJzIiwiaGFuZGxlQ2hhbmdlIiwic2V0U2VhcmNoIiwic3luY0FsbE9yZGVycyIsInN5bmNPZmZsaW5lT3JkZXJzIiwiZmFrZW9yZGVycyIsIkFycmF5IiwiZnJvbSIsIm9yZGVyRGF0YSIsIm9yZGVyX3R5cGUiLCJpbmRleE9mIiwiZW1haWwiLCJzZXRTdGF0ZSIsImZpcnN0T3JkZXIiLCJuYXZpZ2F0b3IiLCJvbkxpbmUiLCJyZXN1bHQiLCJ0aGVuIiwiZ2V0QWxsT3JkZXJzV0MiLCJjb25maXJtIiwidGl0bGUiLCJzdWNjZXNzX3RleHQiLCJjb250ZW50Iiwic3luY19zdWNjZXNzX3RleHQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsIndhcm5pbmdfdGV4dCIsIm5vX3N5bmNfb3JkZXJzIiwiZXJyb3Jfc3luY19vcmRlcnMiLCJwb3Nfb3JkZXJzIiwicG9zdERhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJzeW5jX3Byb2Nlc3NfdGV4dCIsInN0eWxlIiwiZGlzcGxheSIsIlBPU1Bvc3RSZXF1ZXN0Iiwid2t3Y3Bvc192YXJpYWJsZSIsIldLX0NSRUFURV9PRkZMSU5FX09SREVSX0VORFBPSU5UIiwianNvbiIsImRvQWN0aW9uIiwiZGF0YWJhc2UiLCJpZHMiLCJqIiwiZmFrZV9pZCIsImZpbmFsX29yZGVycyIsImJ1bGtEZWxldGUiLCJyZXMiLCJidWxrUHV0IiwicnN1bHQiLCJob3JkZXJzIiwic29ydCIsImEiLCJiIiwiZGVmYXVsdE9yZGVyIiwiZGVmIiwib3JkZXJfc2hvcnQiLCJvcmQiLCJvcmRlcl9zdW1tYXJ5Iiwic3VtIiwic3luY19vcmRlcnMiLCJzZWFyY2hfb3JkZXJfdGV4dCIsImVycm9yX25vX2NhdGVnb3J5X29yZGVyIiwibGlzdFByb2R1Y3RzIiwiZW1wdHlfb2ZmbGluZV9vcmRlcnNfbGlzdCIsIlJvdyIsImluZGV4Iiwic29yZGVyIiwiQUREX0RBVEFfQUZURVJfVEFYX0lOX1NVTU1BUlkiLCJBRERfREFUQV9BRlRFUl9UQVhfSU5fUkVDRUlQVF9DVVNUT00iLCJBRERfREFUQV9BRlRFUl9UQVhfSU5fUkVDRUlQVCIsIndrd2Nwb3NfY2hhbmdlX3Bvc190b3RhbCIsIldBTlRfVE9fUFJJTlRfUkVDSUVQVCIsIkNIQU5HRV9MSVNUSU5HX09GX1BST0RVQ1RTIiwiUEVSRk9STV9BQ1RJT05fQUZURVJfSU5WT0lDRV9QUklOVCIsIlVQREFURV9QT1NfT1JERVJfU1VCX1RPVEFMIiwiQUREX0RBVEFfQUZURVJfQkFMQU5DRV9JTl9SRUNFSVBUIiwiQUREX0FGVEVSX1BSSU5UX0lOVk9JQ0VfQlVUVE9OX0ZJTFRFUiIsIkNIQU5HRV9JTl9PUkRFUiIsIk9yZGVyU3VtbWFyeSIsImhhbmRsZVByaW50Q2xpY2siLCJHZXRIdG1sIiwiZ2V0SW52b2ljZSIsInNldHVwSW52b2ljZVNpemUiLCJvcGVuUHJpbnRXaW5kb3ciLCJuZXdPcmRlciIsImxvZ29faW52b2ljZSIsIm91dGxldF9uYW1lIiwiY3VzdG9tZXJfZm5hbWUiLCJjdXN0b21lcl9sbmFtZSIsIm91dGxldF9hZGRyZXNzIiwib3V0bGV0X2NpdHkiLCJvdXRsZXRfc3RhdGUiLCJvdXRsZXRfY291bnRyeSIsIm91dGxldF9wb3N0Y29kZSIsInBvc191c2VyX3Bob25lIiwicG9zX3VzZXJfZW1haWwiLCJwcm9fbmFtZSIsInByb19xdWFudGl0eSIsInByb191bml0X3ByaWNlIiwicHJvX3RvdGFsIiwic3ViX3RvdGFsIiwidGF4X3RpdGxlIiwib3JkZXJfdGF4IiwiY291cG9uX25hbWUiLCJjb3Vwb25fYW1vdW50Iiwib3JkZXJfZGlzY291bnQiLCJvcmRlcl90b3RhbCIsImNhc2hwYXlfYW1vdW50Iiwib3RoZXJfcGF5bWVudF90ZXh0Iiwib3RoZXJwYXlfYW1vdW50Iiwib3JkZXJfY2hhbmdlIiwiY2FzaGllcl9uYW1lIiwiYXBpZl9zY3JpcHQiLCJsb2dnZWRfaW4iLCJvdXRsZXRfZGF0YSIsIm91dGxldCIsImNhcnRfc3VidG90YWwiLCJkaXNjb3VudCIsImNhc2hQYXkiLCJjYXNoUGF5X2h0bWwiLCJjYXJkUGF5IiwiY2FyZFBheV9odG1sIiwicGF5bWVudF90aXRsZSIsImJhbGFuY2UiLCJ0YmxfZGF0YSIsInByb2R1Y3RzIiwiZm9yRWFjaCIsInBybyIsInByb2R1Y3RfbmFtZSIsInByb2R1Y3RfbWV0YV9kYXRhIiwia2V5cyIsInZhbHVlcyIsInByb2R1Y3RfdW5pdF9wcmljZSIsInF0eSIsInByb2R1Y3RfdG90YWxfcHJpY2UiLCJvcmRlcl90YXhfbGluZXMiLCJ0YXhfbGluZXMiLCJ0YXgiLCJ0b3RhbCIsImN1c3RvbUFmdGVyVGF4IiwiY291cG9ucyIsInZhbCIsInR5cGUiLCJ0b3RhbGRpc2NvdW50IiwiYW1vdW50IiwidGVuZGVyZWQiLCJwcm9kdWN0SW5saW5lRGlzY291bnQiLCJ1ZiIsInNwZWNpYWwiLCJwdXNoIiwic2x1ZyIsInF1YW50aXR5IiwibmFtZSIsInVmX3RvdGFsIiwia2V5IiwiTnVtYmVyIiwicmF0ZSIsImNvdXBvbiIsImNvZGUiLCJwcmljZSIsInByb2R1Y3QiLCJwb3NfdXNlciIsInVzZXJfZW1haWwiLCJkaXNwbGF5X25hbWUiLCJpbnZvaWNlRGF0YSIsImV2YWwiLCJSZWFjdEh0bWxQYXJzZXIiLCJpbnZvaWNlSHRtbCIsInN0eWxlcyIsIlJlYWN0RE9NIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIiwiaHRtbCIsInByaW50Q29udGVudHMiLCJ0ZXN0IiwidXNlckFnZW50IiwicHJpbnRXaW5kb3ciLCJ3aW5kb3ciLCJvcGVuIiwid3JpdGUiLCJjbG9zZSIsImZvY3VzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJwcmludCIsImZyYW1lMSIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJmcmFtZURvYyIsImNvbnRlbnRXaW5kb3ciLCJjb250ZW50RG9jdW1lbnQiLCJmcmFtZXMiLCJyZW1vdmVDaGlsZCIsInByaW50ZXIiLCJzcHJpbnRlciIsImRlZmF1bHQiLCJzdHlsZV9ydWxlcyIsImNzcyIsInBheW1lbnRNb2RlIiwiY2FzaFBheV90ZXh0IiwiY2FyZFBheV90ZXh0IiwiY2FzaF9wYXltZW50X3RleHQiLCJjYXNoX3RleHQiLCJfX2h0bWwiLCJvVGF4IiwiY291cG9uX2h0bWwiLCJlYWNoIiwib3JkZXJwcm9kdWN0cyIsIm9yZGVyX3RleHQiLCJkYXRlX3RleHQiLCJzdWJ0b3RhbF90ZXh0IiwidG90YWxfdGV4dCIsImRpc2NvdW50X3RleHQiLCJiYWxhbmNlX3RleHQiLCJyZWZ1bmRfdGV4dCIsImN1c3RvbWVyX3RleHQiLCJvcmRlclJlZnVuZCIsInRvdGFsX3JlZnVuZCIsImN1c3RvbUFmdGVyQmFsYW5jZSIsInByb2R1Y3RfbmFtZV90ZXh0IiwicXVhbnRpdHlfdGV4dCIsInVuaXRfcHJpY2VfdGV4dCIsInRvdGFsX3ByaWNlX3RleHQiLCJ1bml0X3RleHQiLCJ0YXhfdGV4dCIsImNhcmRfcGF5bWVudF90ZXh0IiwiY2FyZF90ZXh0IiwicHJpbnRJbnZvaWNlX3RleHQiLCJjdXJyZW5jeV9wb3NpdGlvbiIsInByb2R1Y3RfdG90YWwiLCJzdWJ0b3RhbCIsInNldHRpbmdzIiwiZm9ybWF0IiwiZGVjaW1hbCIsInRob3VzYW5kIiwicHJlY2lzaW9uIiwiZ3JvdXBpbmciLCJudW1iZXIiLCJuYXRpdmVNYXAiLCJwcm90b3R5cGUiLCJuYXRpdmVJc0FycmF5IiwiaXNBcnJheSIsImZvcm1hdE1vbmV5IiwidW5mb3JtYXQiLCJvcHRzIiwiZGVmYXVsdHMiLCJpc09iamVjdCIsImZvcm1hdHMiLCJjaGVja0N1cnJlbmN5Rm9ybWF0IiwidXNlRm9ybWF0IiwicG9zIiwibmVnIiwiemVybyIsImZvcm1hdE51bWJlciIsIk1hdGgiLCJhYnMiLCJjaGVja1ByZWNpc2lvbiIsImNhbGwiLCJiYXNlIiwicm91bmQiLCJpc05hTiIsInRvRml4ZWQiLCJwb3dlciIsInBvdyIsImlzU3RyaW5nIiwiY2hhckNvZGVBdCIsInN1YnN0ciIsIm9iamVjdCIsImRlZnMiLCJoYXNPd25Qcm9wZXJ0eSIsInVzZVByZWNpc2lvbiIsIm5lZ2F0aXZlIiwicGFyc2VJbnQiLCJtb2QiLCJyZWdleCIsIlJlZ0V4cCIsInVuZm9ybWF0dGVkIiwibWF0Y2giLCJjdXJyZW5jeVN5bWJvbCIsImN1cnJlbmN5X2Zvcm1hdF9zeW1ib2wiLCJjdXJyZW5jeV9mb3JtYXRfZGVjaW1hbF9zZXAiLCJjdXJyZW5jeV9mb3JtYXRfdGhvdXNhbmRfc2VwIiwiY3VycmVuY3lfZm9ybWF0X251bV9kZWNpbWFscyIsImN1cnJlbmN5X2Zvcm1hdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFULENBQWxCO0FBT0gsQ0FSTSxDOzs7Ozs7Ozs7OztBQzlQUCxlIiwiZmlsZSI6Ii4vYXNzZXRzL2Rpc3Qvb3JkZXJ+c2FsZS1oaXN0b3J5L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX3JlYWRPbmx5RXJyb3IobmFtZSkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiXFxcIlwiICsgbmFtZSArIFwiXFxcIiBpcyByZWFkLW9ubHlcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3JlYWRPbmx5RXJyb3I7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyB0cmFuc2xhdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGFwcGx5RmlsdGVycyB9IGZyb20gJ0B3b3JkcHJlc3MvaG9va3MnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAd29yZHByZXNzL2kxOG4nO1xuZXhwb3J0IGNvbnN0IEFERF9DVVNUT01fT1JERVJfREFUQV9CRUxPV19EQVRFID0gJ3drd2Nwb3NfYWRkX2N1c3RvbV9vcmRlcl9kYXRhX2JlbG93X2RhdGUnO1xuZXhwb3J0IGNvbnN0IE1PRElGWV9PUkRFUl9ERVRBSUxTID0gXCJ3a3djX21vZGlmeV9vcmRlcl9kZXRpYWxzXCJcblxuY2xhc3MgT3JkZXJTaG9ydCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgb3JkZXIgPSB0aGlzLnByb3BzLm9yZGVyO1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG9yZGVyLm9yZGVyX2RhdGUpLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICBkYXRlID0gZGF0ZS5zcGxpdCgnICcpLnNsaWNlKDAsIDQpLmpvaW4oJyAnKTtcbiAgICAgICAgb3JkZXIgPSBhcHBseUZpbHRlcnMoTU9ESUZZX09SREVSX0RFVEFJTFMsIG9yZGVyKTtcbiAgICAgICAgdmFyIG9yZGVyX2hlYWRpbmdfdGV4dCA9IHRyYW5zbGF0aW9uLm9yZGVyX2hlYWRpbmdfdGV4dDtcbiAgICAgICAgbGV0IGN1c3RvbURhdGFBcnIgPSBbXTtcbiAgICAgICAgbGV0IGN1c3RvbURhdGEgPSBhcHBseUZpbHRlcnMoQUREX0NVU1RPTV9PUkRFUl9EQVRBX0JFTE9XX0RBVEUsICcnLCBvcmRlcik7XG4gICAgICAgIGlmIChvcmRlci5jdXN0b21fZGF0YSAmJiBvcmRlci5jdXN0b21fZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjdXN0b21EYXRhQXJyID0gb3JkZXIuY3VzdG9tX2RhdGEubWFwKChkYXRhLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPHAga2V5PXtpfT48c3Ryb25nPntkYXRhLmxhYmVsfTogPC9zdHJvbmc+e2RhdGEudmFsdWV9PC9wPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvcmRlci5vcmRlcl9pZCA9IG9yZGVyLm9yZGVyX2lkLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBvcmRlcklkID0gb3JkZXIub3JkZXJfaWQucmVwbGFjZShcIiNcIiwgJycpO1xuICAgICAgICBjb25zdCBjdXN0b21lck5hbWUgPSBvcmRlci5iaWxsaW5nLmZuYW1lICE9PSB1bmRlZmluZWQgPyBvcmRlci5iaWxsaW5nLmZuYW1lICsgJyAnICsgb3JkZXIuYmlsbGluZy5sbmFtZSA6IG9yZGVyLmJpbGxpbmcuZmlyc3RfbmFtZSArICcgJyArIG9yZGVyLmJpbGxpbmcubGFzdF9uYW1lXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1vcmRlci1zaG9ydFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zLW9yZGVyLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXIub2ZmbGluZV9pZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPntvcmRlcl9oZWFkaW5nX3RleHR9IHtgIyR7b3JkZXIub3JkZXJfaWR9YH08L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57X18oJ09mZmxpbmUgSUQgJywgJ3djX3BvcycpICsgb3JkZXIub2ZmbGluZV9pZH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz57b3JkZXJfaGVhZGluZ190ZXh0fSAje29yZGVySWR9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1vcmRlci1leHRyYS13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2N1c3RvbWVyTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2RhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2g1PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHA+e2N1c3RvbURhdGF9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tRGF0YUFyci5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXItZXh0cmEtZGF0YVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz57X18oJ0V4dHJhIERhdGEnLCAnd2NfcG9zJyl9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y3VzdG9tRGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiAoe1xuICAgIG9yZGVyczogc3RhdGUub3JkZXJzLmxpc3QsXG4gICAgcHJpbnRlcnM6IHN0YXRlLnByaW50ZXJzLFxuICAgIGludm9pY2U6IHN0YXRlLmludm9pY2Vcbn0pO1xuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IGRpc3BhdGNoIH0sIGJpbmRBY3Rpb25DcmVhdG9ycyh7fSwgZGlzcGF0Y2gpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoT3JkZXJTaG9ydCk7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JzsgXG5pbXBvcnQgeyB3a3djcG9zX3ByaWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vY3VycmVuY3ktZm9ybWF0JztcblxuY2xhc3MgT3JkZXJMaXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIFxuICAgICAgICBzdXBlcihwcm9wcyk7IFxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgb3JkZXIgOiAnJ1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgYmluZGluZyBpcyBuZWNlc3NhcnkgdG8gbWFrZSBgdGhpc2Agd29yayBpbiB0aGUgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIH1cblxuICAgXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICBcbiAgICAgICAgbGV0IG9yZGVycyA9IHRoaXMucHJvcHMub3JkZXJzO1xuICAgICAgICBcbiAgICAgICAgbGV0IG9yZGVyX2lkID0galF1ZXJ5KGV2ZW50LnRhcmdldCkuY2xvc2VzdChcImxpXCIpLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBvcmRlciA9IG9yZGVycy5maWx0ZXIoIG9iaiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3JkZXJfaWQgPT0gb2JqLmlkO1xuICAgICAgICB9ICk7XG4gICAgXG4gICAgICAgIGlmKCBvcmRlciApIHtcblxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdE9yZGVyKG9yZGVyKTtcblxuICAgICAgICB9XG4gICAgICAgICAgXG4gICAgfVxuXG4gICAgcmVuZGVyKCkgeyBcblxuICAgICAgICAgICAgbGV0IG9yZGVyID0gdGhpcy5wcm9wcy5vcmRlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGN1cnJlbmN5ID0gb3JkZXIuY3VycmVuY3k7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjdXJyZW5jeV9jb2RlID0gY3VycmVuY3kuc3ltYm9sO1xuXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG9yZGVyLm9yZGVyX2RhdGUpLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5zcGxpdCgnICcpLnNsaWNlKDAsIDQpLmpvaW4oJyAnKTtcblxuICAgICAgICAgICAgdmFyIGNhcnRfdG90YWwgPSB3a3djcG9zX3ByaWNlKHBhcnNlRmxvYXQob3JkZXIub3JkZXJfaHRtbCksIGN1cnJlbmN5X2NvZGUpO1xuXG4gICAgICAgICAgICByZXR1cm4oXG5cbiAgICAgICAgICAgICAgICA8bGkgaWQ9e29yZGVyLm9yZGVyX2lkfSBvbkNsaWNrPXsoKGUpID0+IHRoaXMuaGFuZGxlQ2xpY2soZSkpfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e29yZGVyLm9yZGVyX2lkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtY2FsZW5kZXJcIj48L2k+e2RhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Y2FydF90b3RhbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9saT4gICBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIFxuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKHsgXG4gICAgb3JkZXJzOnN0YXRlLm9yZGVycy5saXN0LCBcbn0pO1xuIFxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggbWFwU3RhdGVUb1Byb3BzICkoT3JkZXJMaXN0KTtcbiAiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBPcmRlckxpc3QgZnJvbSAnLi9saXN0L2xpc3QuanN4JztcbmltcG9ydCBPcmRlclNob3J0IGZyb20gJy4vLi4vaGlzdG9yeS9zaG9ydC9zaG9ydC5qc3gnO1xuaW1wb3J0IE9yZGVyU3VtbWFyeSBmcm9tICcuL3N1bW1hcnkvc3VtbWFyeS5qc3gnO1xuaW1wb3J0IHsgZ2V0QWxsT3JkZXJzV0MgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9hY3Rpb25zL29yZGVycyc7XG5pbXBvcnQgZGF0YWJhc2UgZnJvbSAnLi4vLi4vLi4vLi4vLi4vZGF0YWJhc2UnO1xuaW1wb3J0IHsgdHJhbnNsYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90cmFuc2xhdGlvbi5qcyc7XG5pbXBvcnQgd2t3Y3Bvc192YXJpYWJsZSBmcm9tICcuLy4uLy4uLy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBQT1NQb3N0UmVxdWVzdCB9IGZyb20gJy4vLi4vLi4vLi4vLi4vLi4vaGFzaCc7XG5pbXBvcnQgeyBGaXhlZFNpemVMaXN0IGFzIExpc3QgfSBmcm9tIFwicmVhY3Qtd2luZG93XCI7XG5pbXBvcnQgeyBfXyB9IGZyb20gJ0B3b3JkcHJlc3MvaTE4bic7XG5pbXBvcnQgeyBkb0FjdGlvbiB9IGZyb20gJ0B3b3JkcHJlc3MvaG9va3MnO1xuZXhwb3J0IGNvbnN0IEFGVEVSX0NSRUFUSU5HX09SREVSX0FDVElPTiA9ICd3a3djcG9zX2FjdGlvbl9hZnRlcl9jcmVhdGluZ19vcmRlcic7XG5cbmNsYXNzIE9mZmxpbmVTYWxlIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZmlyc3QgOiAnJyxcbiAgICAgICAgICAgIG9yZGVycyA6ICcnLFxuICAgICAgICAgICAgcyA6ICcnXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0U2VhcmNoID0gdGhpcy5zZXRTZWFyY2guYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zeW5jQWxsT3JkZXJzID0gdGhpcy5zeW5jQWxsT3JkZXJzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3luY09mZmxpbmVPcmRlcnMgPSB0aGlzLnN5bmNPZmZsaW5lT3JkZXJzLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc2V0U2VhcmNoKGUpIHtcblxuICAgICAgICB2YXIgZmFrZW9yZGVycyA9IEFycmF5LmZyb20odGhpcy5wcm9wcy5vcmRlcnMpO1xuICAgICAgICBsZXQgZmlyc3QgPSB0aGlzLnN0YXRlLmZpcnN0O1xuICAgICAgICB2YXIgb3JkZXJEYXRhID0gdGhpcy5zdGF0ZS5vcmRlcnM7XG4gICAgICAgIGlmKCBlLnRhcmdldC52YWx1ZSApIHtcbiAgICAgICAgICAgIG9yZGVyRGF0YSA9IGZha2VvcmRlcnMuZmlsdGVyKCAob3JkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiggb3JkZXIub3JkZXJfdHlwZSA9PSAnb2ZmbGluZScgJiYgKCBvcmRlci5vcmRlcl9pZC50b1N0cmluZygpLmluZGV4T2YoZS50YXJnZXQudmFsdWUpICE9IC0xIHx8IG9yZGVyLmVtYWlsLnRvU3RyaW5nKCkuaW5kZXhPZihlLnRhcmdldC52YWx1ZSkgIT0gLTEgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yZGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZmlyc3QgOiBmaXJzdCxcbiAgICAgICAgICAgIG9yZGVycyA6IG9yZGVyRGF0YSxcbiAgICAgICAgICAgIHMgOiBlLnRhcmdldC52YWx1ZVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZShmaXJzdE9yZGVyKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoIHsgZmlyc3Q6IGZpcnN0T3JkZXIgfSApO1xuICAgIH1cblxuICAgIHN5bmNBbGxPcmRlcnMoKSB7XG5cbiAgICAgICAgY29uc3Qge2Rpc3BhdGNofSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmKCBuYXZpZ2F0b3Iub25MaW5lICkge1xuICAgICAgICAgICAgdmFyIGZha2VvcmRlcnMgPSBBcnJheS5mcm9tKHRoaXMucHJvcHMub3JkZXJzKTtcbiAgICAgICAgICAgIHZhciBvcmRlckRhdGEgPSBmYWtlb3JkZXJzLmZpbHRlciggKG9yZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIG9yZGVyLm9yZGVyX3R5cGUgPT0gJ29mZmxpbmUnICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JkZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKCBvcmRlckRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnN5bmNPZmZsaW5lT3JkZXJzKG9yZGVyRGF0YSkudGhlbigob3JkZXJzKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZiggb3JkZXJzICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0QWxsT3JkZXJzV0MoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zbGF0aW9uLnN1Y2Nlc3NfdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi5zeW5jX3N1Y2Nlc3NfdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kRGlzbWlzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdidXR0b25OYW1lJzsgLy8gdGhlIGJ1dHRvbiB3aWxsIGhhbmRsZSBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBqUXVlcnkuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFuc2xhdGlvbi53YXJuaW5nX3RleHQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRyYW5zbGF0aW9uLm5vX3N5bmNfb3JkZXJzLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kRGlzbWlzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYnV0dG9uTmFtZSc7IC8vIHRoZSBidXR0b24gd2lsbCBoYW5kbGUgaXRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBqUXVlcnkuY29uZmlybSh7XG5cdFx0XHRcdHRpdGxlOiB0cmFuc2xhdGlvbi53YXJuaW5nX3RleHQsXG5cdFx0XHRcdGNvbnRlbnQ6IHRyYW5zbGF0aW9uLmVycm9yX3N5bmNfb3JkZXJzLFxuXHRcdFx0XHRiYWNrZ3JvdW5kRGlzbWlzczogZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRyZXR1cm4gJ2J1dHRvbk5hbWUnOyAvLyB0aGUgYnV0dG9uIHdpbGwgaGFuZGxlIGl0XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3luY09mZmxpbmVPcmRlcnMgKHBvc19vcmRlcnMpIHtcblxuICAgICAgICBjb25zdCBwb3N0RGF0YSA9IHtcbiAgICAgICAgICAgIG9yZGVyczogSlNPTi5zdHJpbmdpZnkoIHBvc19vcmRlcnMgKVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRpbmctdGV4dCcgKS5pbm5lckhUTUwgPSB0cmFuc2xhdGlvbi5zeW5jX3Byb2Nlc3NfdGV4dDtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkZXInICkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgIFBPU1Bvc3RSZXF1ZXN0KCB3a3djcG9zX3ZhcmlhYmxlLldLX0NSRUFURV9PRkZMSU5FX09SREVSX0VORFBPSU5ULCBwb3N0RGF0YSApLnRoZW4oKGpzb24pID0+IHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGVyJyApLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICBpZigganNvbi5sZW5ndGggPiAwICkge1xuXG4gICAgICAgICAgICAgICAgICAgIGRvQWN0aW9uKCBBRlRFUl9DUkVBVElOR19PUkRFUl9BQ1RJT04sIGpzb24sIGRhdGFiYXNlICk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkcyA9IGpzb24ubWFwKCAoaikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gai5mYWtlX2lkO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbF9vcmRlcnMgPSBqc29uLm1hcCggKGopID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGouZmFrZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBqO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnBvc19vcmRlcnMuYnVsa0RlbGV0ZShpZHMpLnRoZW4oKHJlcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZS5wb3Nfb3JkZXJzLmJ1bGtQdXQoZmluYWxfb3JkZXJzKS50aGVuKChyc3VsdCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShqc29uKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSApO1xuXG4gICAgICAgIH0gKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICAgICAgaWYoIHRoaXMuc3RhdGUucyApIHtcblxuICAgICAgICAgICAgICAgIHZhciBvcmRlcnMgPSB0aGlzLnN0YXRlLm9yZGVycztcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxldCBob3JkZXJzID0gQXJyYXkuZnJvbSh0aGlzLnByb3BzLm9yZGVycyk7XG5cbiAgICAgICAgICAgICAgICBob3JkZXJzLnNvcnQoKGEsYikgPT4gKGEub3JkZXJfaWQgPCBiLm9yZGVyX2lkKSA/IDEgOiAoKGIub3JkZXJfaWQgPCBhLm9yZGVyX2lkKSA/IC0xIDogMCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG9yZGVycyA9IGhvcmRlcnMuZmlsdGVyKCAob3JkZXIpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiggb3JkZXIub3JkZXJfaWQudG9TdHJpbmcoKS5pbmRleE9mKFwiI1wiKSA+IC0xICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JkZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggdGhpcy5zdGF0ZS5maXJzdCApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdE9yZGVyID0gdGhpcy5zdGF0ZS5maXJzdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRPcmRlciA9IG9yZGVycy5maWx0ZXIoKGRlZixpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBpPT0wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBvcmRlcl9zaG9ydCA9IGRlZmF1bHRPcmRlci5tYXAoIChvcmQsaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8T3JkZXJTaG9ydCBrZXk9e2l9IG9yZGVyPXtvcmR9PjwvT3JkZXJTaG9ydD5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBvcmRlcl9zdW1tYXJ5ID0gZGVmYXVsdE9yZGVyLm1hcCgoc3VtLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxPcmRlclN1bW1hcnkga2V5PXtpfSBvcmRlcj17c3VtfT48L09yZGVyU3VtbWFyeT5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc3luY19vcmRlcnMgPSB0cmFuc2xhdGlvbi5zeW5jX29yZGVycztcbiAgICAgICAgICAgIHZhciBzZWFyY2hfb3JkZXJfdGV4dCA9IHRyYW5zbGF0aW9uLnNlYXJjaF9vcmRlcl90ZXh0O1xuICAgICAgICAgICAgdmFyIGVycm9yX25vX2NhdGVnb3J5X29yZGVyID0gdHJhbnNsYXRpb24uZXJyb3Jfbm9fY2F0ZWdvcnlfb3JkZXI7XG5cbiAgICAgICAgICAgIHZhciBsaXN0UHJvZHVjdHMgPSA8c3BhbiBjbGFzc05hbWU9XCJuby1vcmRlci1yZXN1bHRcIj57IGVycm9yX25vX2NhdGVnb3J5X29yZGVyIH08L3NwYW4+XG5cbiAgICAgICAgICAgIGNvbnN0IGVtcHR5X29mZmxpbmVfb3JkZXJzX2xpc3QgPSA8c3BhbiBjbGFzc05hbWU9XCJuby1yZXN1bHRcIj57X18oXCJXZSBkaWRuJ3QgZmluZCBhbnkgcmVzdWx0c1wiLCAnd2NfcG9zJyApfTwvc3Bhbj47XG5cbiAgICAgICAgICAgIGNvbnN0IFJvdyA9ICh7IGluZGV4LCBzdHlsZSB9KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2luZGV4ICUgMiA/IFwid2t3Y3Bvcy1saXN0LWl0ZW0tZXZlblwiIDogXCJ3a3djcG9zLWxpc3QtaXRlbS1vZGRcIn0gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgPE9yZGVyTGlzdCBrZXk9e29yZGVyc1tpbmRleF0ub3JkZXJfaWR9IG9uU2VsZWN0T3JkZXI9e3RoaXMuaGFuZGxlQ2hhbmdlfSBvcmRlcj17b3JkZXJzW2luZGV4XX0gc3R5bGU9e3N0eWxlfT48L09yZGVyTGlzdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1vcmRlci1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJwb3Mtc3luYy1vcmRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN5bmMtb3JkZXJzXCIgaWQ9XCJzeW5jLW9yZGVyc1wiIG9uQ2xpY2s9e3RoaXMuc3luY0FsbE9yZGVyc30+e3N5bmNfb3JkZXJzfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3Mtb3JkZXItc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInBvcy1vcmRlci1zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cInBvcy1vcmRlci1zZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17c2VhcmNoX29yZGVyX3RleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnNldFNlYXJjaH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJzLmxlbmd0aCA8IDEgPyBlbXB0eV9vZmZsaW5lX29yZGVyc19saXN0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3a3djcG9zLWxpc3QgZHJvcGRvd25saXN0LW9yZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXs1MDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Db3VudD17b3JkZXJzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVNpemU9ezYwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1Jvd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJvcmRlci1tYWluLXN1bW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgb3JkZXJzLmxlbmd0aCA8IDEgPyBsaXN0UHJvZHVjdHMgOiBvcmRlcl9zaG9ydCB9XG4gICAgICAgICAgICAgICAgICAgICAgICB7IG9yZGVycy5sZW5ndGggPCAxID8gJycgOiBvcmRlcl9zdW1tYXJ5IH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKHtcbiAgICBvcmRlcnM6c3RhdGUub3JkZXJzLmxpc3QsXG4gICAgc29yZGVyOnN0YXRlLm9yZGVycy5zb3JkZXIsXG59KTtcblxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oIHsgZGlzcGF0Y2ggfSwgYmluZEFjdGlvbkNyZWF0b3JzKCB7IGdldEFsbE9yZGVyc1dDIH0sIGRpc3BhdGNoICkgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggbWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMgKShPZmZsaW5lU2FsZSk7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdHJhbnNsYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyB3a3djcG9zX3ByaWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vY3VycmVuY3ktZm9ybWF0JztcbmltcG9ydCB7IGFwcGx5RmlsdGVycywgZG9BY3Rpb24gfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBSZWFjdEh0bWxQYXJzZXIgZnJvbSAncmVhY3QtaHRtbC1wYXJzZXInO1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuZXhwb3J0IGNvbnN0IEFERF9EQVRBX0FGVEVSX1RBWF9JTl9TVU1NQVJZID0gJ3drd2NfYWRkX2RhdGFfYWZ0ZXJfdGF4X2luX3N1bW1hcnknO1xuZXhwb3J0IGNvbnN0IE1PRElGWV9PUkRFUl9ERVRBSUxTID0gXCJ3a3djX21vZGlmeV9vcmRlcl9kZXRpYWxzXCI7XG5leHBvcnQgY29uc3QgQUREX0RBVEFfQUZURVJfVEFYX0lOX1JFQ0VJUFRfQ1VTVE9NID0gJ3drd2Nwb3NfYWRkX2RhdGFfYWZ0ZXJfdGF4X2luX3JlY2VpcHRfY3VzdG9tJztcbmV4cG9ydCBjb25zdCBBRERfREFUQV9BRlRFUl9UQVhfSU5fUkVDRUlQVCA9ICd3a3djX2FkZF9kYXRhX2FmdGVyX3RheF9pbl9yZWNlaXB0JztcbmV4cG9ydCBjb25zdCB3a3djcG9zX2NoYW5nZV9wb3NfdG90YWwgPSAnd2t3Y3Bvc19jaGFuZ2VfcG9zX3RvdGFsJztcbmV4cG9ydCBjb25zdCBXQU5UX1RPX1BSSU5UX1JFQ0lFUFQgPSAnd2t3Y3Bvc193YW50X3RvX3ByaW50X3JlY2llcHQnO1xuZXhwb3J0IGNvbnN0IENIQU5HRV9MSVNUSU5HX09GX1BST0RVQ1RTID0gJ3drd2Nwb3NfY2hhbmdlX2xpc3Rpbmdfb2ZfcHJvZHVjdHMnO1xuZXhwb3J0IGNvbnN0IFBFUkZPUk1fQUNUSU9OX0FGVEVSX0lOVk9JQ0VfUFJJTlQgPSBcIndrd2Nwb3NfcGVyZm9ybV9hY3Rpb25fYWZ0ZXJfaW52b2ljZV9wcmludFwiO1xuZXhwb3J0IGNvbnN0IFVQREFURV9QT1NfT1JERVJfU1VCX1RPVEFMID0gJ3drd2Nwb3NfY2hhbmdlX3Bvc19zdWJfdG90YWwnO1xuZXhwb3J0IGNvbnN0IEFERF9EQVRBX0FGVEVSX0JBTEFOQ0VfSU5fUkVDRUlQVCA9ICd3a3djX2FkZF9kYXRhX2FmdGVyX2JhbGFuY2VfaW5fcmVjZWlwdCc7XG5leHBvcnQgY29uc3QgQUREX0FGVEVSX1BSSU5UX0lOVk9JQ0VfQlVUVE9OX0ZJTFRFUiA9ICd3a3djcG9zX2FkZF9hZnRlcl9wcmludF9pbnZvaWNlX2J1dHRvbic7XG5leHBvcnQgY29uc3QgQ0hBTkdFX0lOX09SREVSID0gJ3drd2Nwb3NfY2hhbmdlX2luX29yZGVycyc7XG5cbmNsYXNzIE9yZGVyU3VtbWFyeSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBvcmRlciA6ICcnLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlUHJpbnRDbGljayA9IHRoaXMuaGFuZGxlUHJpbnRDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLkdldEh0bWwgPSB0aGlzLkdldEh0bWwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5nZXRJbnZvaWNlID0gdGhpcy5nZXRJbnZvaWNlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0dXBJbnZvaWNlU2l6ZSA9IHRoaXMuc2V0dXBJbnZvaWNlU2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9wZW5QcmludFdpbmRvdyA9IHRoaXMub3BlblByaW50V2luZG93LmJpbmQodGhpcyk7XG4gICAgICAgIGRvQWN0aW9uKENIQU5HRV9JTl9PUkRFUiwgdGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdPcmRlcikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIG9yZGVyOiBuZXdPcmRlclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRJbnZvaWNlKG9yZGVyID0gJycpIHtcblxuICAgICAgICBsZXQgbG9nb19pbnZvaWNlID0gJyR7bG9nb19pbnZvaWNlfSc7XG4gICAgICAgIGxldCBvdXRsZXRfbmFtZSA9ICcke291dGxldF9uYW1lfSc7XG4gICAgICAgIGxldCBvcmRlcl9pZCA9ICcke29yZGVyX2lkfSc7XG4gICAgICAgIGxldCBvcmRlcl9kYXRlID0gJyR7b3JkZXJfZGF0ZX0nO1xuICAgICAgICBsZXQgY3VzdG9tZXJfZm5hbWUgPSAnJHtjdXN0b21lcl9mbmFtZX0nO1xuICAgICAgICBsZXQgY3VzdG9tZXJfbG5hbWUgPSAnJHtjdXN0b21lcl9sbmFtZX0nO1xuICAgICAgICBsZXQgb3V0bGV0X2FkZHJlc3MgPSAnJHtvdXRsZXRfYWRkcmVzc30nO1xuICAgICAgICBsZXQgb3V0bGV0X2NpdHkgPSAnJHtvdXRsZXRfY2l0eX0nO1xuICAgICAgICBsZXQgb3V0bGV0X3N0YXRlID0gJyR7b3V0bGV0X3N0YXRlfSc7XG4gICAgICAgIGxldCBvdXRsZXRfY291bnRyeSA9ICcke291dGxldF9jb3VudHJ5fSc7XG4gICAgICAgIGxldCBvdXRsZXRfcG9zdGNvZGUgPSAnJHtvdXRsZXRfcG9zdGNvZGV9JztcbiAgICAgICAgbGV0IHBvc191c2VyX3Bob25lID0gJyR7cG9zX3VzZXJfcGhvbmV9JztcbiAgICAgICAgbGV0IHBvc191c2VyX2VtYWlsID0gJyR7cG9zX3VzZXJfZW1haWx9JztcblxuICAgICAgICBsZXQgcHJvX25hbWUgPSAnJHtwcm9fbmFtZX0nO1xuICAgICAgICBsZXQgcHJvX3F1YW50aXR5ID0gJyR7cHJvX3F1YW50aXR5fSc7XG4gICAgICAgIGxldCBwcm9fdW5pdF9wcmljZSA9ICcke3Byb191bml0X3ByaWNlfSc7XG4gICAgICAgIGxldCBwcm9fdG90YWwgPSAnJHtwcm9fdG90YWx9JztcblxuICAgICAgICBsZXQgc3ViX3RvdGFsID0gJyR7c3ViX3RvdGFsfSc7XG4gICAgICAgIGxldCB0YXhfdGl0bGUgPSAnJHt0YXhfdGl0bGV9JztcbiAgICAgICAgbGV0IG9yZGVyX3RheCA9ICcke29yZGVyX3RheH0nO1xuICAgICAgICBsZXQgY291cG9uX25hbWUgPSAnJHtjb3Vwb25fbmFtZX0nO1xuICAgICAgICBsZXQgY291cG9uX2Ftb3VudCA9ICcke2NvdXBvbl9hbW91bnR9JztcbiAgICAgICAgbGV0IG9yZGVyX2Rpc2NvdW50ID0gJyR7b3JkZXJfZGlzY291bnR9JztcbiAgICAgICAgbGV0IG9yZGVyX3RvdGFsID0gJyR7b3JkZXJfdG90YWx9JztcbiAgICAgICAgbGV0IGNhc2hwYXlfYW1vdW50ID0gJyR7Y2FzaHBheV9hbW91bnR9JztcbiAgICAgICAgbGV0IG90aGVyX3BheW1lbnRfdGV4dCA9ICcke290aGVyX3BheW1lbnRfdGV4dH0nO1xuICAgICAgICBsZXQgb3RoZXJwYXlfYW1vdW50ID0gJyR7b3RoZXJwYXlfYW1vdW50fSc7XG4gICAgICAgIGxldCBvcmRlcl9jaGFuZ2UgPSAnJHtvcmRlcl9jaGFuZ2V9JztcblxuICAgICAgICBsZXQgY2FzaGllcl9uYW1lID0gJyR7Y2FzaGllcl9uYW1lfSc7XG5cbiAgICAgICAgbG9nb19pbnZvaWNlID0gYXBpZl9zY3JpcHQubG9nZ2VkX2luLmxvZ29faW52b2ljZTtcblxuICAgICAgICBpZiAoYXBpZl9zY3JpcHQubG9nZ2VkX2luLm91dGxldF9kYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBvdXRsZXQgPSBhcGlmX3NjcmlwdC5sb2dnZWRfaW4ub3V0bGV0X2RhdGE7XG4gICAgICAgICAgICBvdXRsZXRfbmFtZSA9IG91dGxldC5vdXRsZXRfbmFtZTtcbiAgICAgICAgICAgIG91dGxldF9hZGRyZXNzID0gb3V0bGV0Lm91dGxldF9hZGRyZXNzO1xuICAgICAgICAgICAgb3V0bGV0X2NpdHkgPSBvdXRsZXQub3V0bGV0X2NpdHk7XG4gICAgICAgICAgICBvdXRsZXRfc3RhdGUgPSBvdXRsZXQub3V0bGV0X3N0YXRlO1xuICAgICAgICAgICAgb3V0bGV0X2NvdW50cnkgPSBvdXRsZXQub3V0bGV0X2NvdW50cnk7XG4gICAgICAgICAgICBvdXRsZXRfcG9zdGNvZGUgPSBvdXRsZXQub3V0bGV0X3Bvc3Rjb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFwaWZfc2NyaXB0LmxvZ2dlZF9pbi5wb3NfdXNlcl9waG9uZSkge1xuICAgICAgICAgICAgcG9zX3VzZXJfcGhvbmUgPSBhcGlmX3NjcmlwdC5sb2dnZWRfaW4ucG9zX3VzZXJfcGhvbmU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JkZXIpIHtcbiAgICAgICAgICAgIGlmIChvcmRlci5vcmRlcl90eXBlID09ICdvbmxpbmUnKSB7XG4gICAgICAgICAgICAgICAgb3JkZXJfaWQgPSAnIycgKyBvcmRlci5vcmRlcl9pZDtcbiAgICAgICAgICAgICAgICBvcmRlcl9kYXRlID0gb3JkZXIub3JkZXJfZGF0ZTtcbiAgICAgICAgICAgICAgICBjdXN0b21lcl9mbmFtZSA9IG9yZGVyLmJpbGxpbmcuZm5hbWU7XG4gICAgICAgICAgICAgICAgY3VzdG9tZXJfbG5hbWUgPSBvcmRlci5iaWxsaW5nLmxuYW1lO1xuICAgICAgICAgICAgICAgIHN1Yl90b3RhbCA9IG9yZGVyLmNhcnRfc3VidG90YWw7XG4gICAgICAgICAgICAgICAgb3JkZXJfZGlzY291bnQgPSBvcmRlci5kaXNjb3VudDtcbiAgICAgICAgICAgICAgICBvcmRlcl90b3RhbCA9IG9yZGVyLm9yZGVyX2h0bWw7XG4gICAgICAgICAgICAgICAgY2FzaHBheV9hbW91bnQgPSBvcmRlci5jYXNoUGF5ID4gMCA/IG9yZGVyLmNhc2hQYXlfaHRtbCA6ICdOL0EnO1xuICAgICAgICAgICAgICAgIG90aGVycGF5X2Ftb3VudCA9IG9yZGVyLmNhcmRQYXkgPiAwID8gb3JkZXIuY2FyZFBheV9odG1sIDogJ04vQSc7XG4gICAgICAgICAgICAgICAgb3RoZXJfcGF5bWVudF90ZXh0ID0gb3JkZXIuY2FyZFBheSA+IDAgPyBvcmRlci5wYXltZW50X3RpdGxlIDogX18oJ090aGVyIFBheW1lbnRzJywgJ3djX3BvcycpO1xuICAgICAgICAgICAgICAgIG9yZGVyX2NoYW5nZSA9IG9yZGVyLmJhbGFuY2U7XG5cbiAgICAgICAgICAgICAgICBwcm9fbmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgIHByb191bml0X3ByaWNlID0gJyc7XG4gICAgICAgICAgICAgICAgcHJvX3F1YW50aXR5ID0gJyc7XG4gICAgICAgICAgICAgICAgcHJvX3RvdGFsID0gJyc7XG4gICAgICAgICAgICAgICAgdmFyIHRibF9kYXRhID0gJyc7XG4gICAgICAgICAgICAgICAgb3JkZXIucHJvZHVjdHMuZm9yRWFjaCgocHJvLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRibF9kYXRhICs9IGA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke3Byby5wcm9kdWN0X25hbWV9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm8ucHJvZHVjdF9tZXRhX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YmxfZGF0YSArPSBgPGJyPjxwPiR7T2JqZWN0LmtleXMocHJvLnByb2R1Y3RfbWV0YV9kYXRhKX1gK2AtYCtgJHtPYmplY3QudmFsdWVzKHByby5wcm9kdWN0X21ldGFfZGF0YSl9PC9wPmA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRibF9kYXRhICs9IGA8L3RkID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPiR7cHJvLnByb2R1Y3RfdW5pdF9wcmljZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+JHtwcm8ucXR5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke3Byby5wcm9kdWN0X3RvdGFsX3ByaWNlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+YDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyX3RheF9saW5lcyA9IG9yZGVyLnRheF9saW5lcztcblxuICAgICAgICAgICAgICAgIHRheF90aXRsZSA9ICcnO1xuICAgICAgICAgICAgICAgIG9yZGVyX3RheCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyX3RheF9saW5lcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgb3JkZXJfdGF4X2xpbmVzLmZvckVhY2goKHRheCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGF4X3RpdGxlICs9IGA8cD4ke19fKCdUYXgnLCAnd2NfcG9zJyl9KCR7dGF4LnRpdGxlfSk8L3A+YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyX3RheCArPSBgPHA+JHt0YXgudG90YWx9PC9wPmA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjdXN0b21BZnRlclRheCA9IGFwcGx5RmlsdGVycyhBRERfREFUQV9BRlRFUl9UQVhfSU5fUkVDRUlQVF9DVVNUT00sICcnLCBvcmRlcik7XG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbUFmdGVyVGF4KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgb3JkZXIuY291cG9ucyA9IGN1c3RvbUFmdGVyVGF4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdXBvbnMgPSBvcmRlci5jb3Vwb25zO1xuXG5cblxuXG4gICAgICAgICAgICAgICAgY291cG9uX25hbWUgPSAnJztcbiAgICAgICAgICAgICAgICBjb3Vwb25fYW1vdW50ID0gJyc7XG5cbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb3Vwb25zKS5mb3JFYWNoKChpLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY291cG9uX25hbWUgKz0gYDxwPiR7X18oJ0NvdXBvbicsICd3Y19wb3MnKX0oJHtpfSk8L3A+YDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdXBvbnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbl9hbW91bnQgKz0gYDxwPiR7Y291cG9uc1tpXX08L3A+YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3JkZXIub3JkZXJfdHlwZSA9PSAnb2ZmbGluZScpIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVuY3kgPSBvcmRlci5jdXJyZW5jeTtcblxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW5jeV9jb2RlID0gY3VycmVuY3kuc3ltYm9sO1xuICAgICAgICAgICAgICAgIG9yZGVyX2lkID0gb3JkZXIub3JkZXJfaWQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG9yZGVyLm9yZGVyX2RhdGUpLnRvRGF0ZVN0cmluZygpO1xuICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlLnNwbGl0KCcgJykuc2xpY2UoMCwgNCkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIG9yZGVyX2RhdGUgPSBkYXRlO1xuXG4gICAgICAgICAgICAgICAgY3VzdG9tZXJfZm5hbWUgPSBvcmRlci5iaWxsaW5nLmZpcnN0X25hbWU7XG4gICAgICAgICAgICAgICAgY3VzdG9tZXJfbG5hbWUgPSBvcmRlci5iaWxsaW5nLmxhc3RfbmFtZTtcbiAgICAgICAgICAgICAgICBzdWJfdG90YWwgPSB3a3djcG9zX3ByaWNlKG9yZGVyLmNhcnRfc3VidG90YWwsIGN1cnJlbmN5X2NvZGUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRpc2NvdW50ID0gb3JkZXIuZGlzY291bnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoZGlzY291bnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2NvdW50LnR5cGUgPT0gJ2ZpeGVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvdGFsZGlzY291bnQgPSB3a3djcG9zX3ByaWNlKC1wYXJzZUZsb2F0KGRpc2NvdW50LmFtb3VudCksIGN1cnJlbmN5X2NvZGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvdGFsZGlzY291bnQgPSB3a3djcG9zX3ByaWNlKC1wYXJzZUZsb2F0KGRpc2NvdW50LmFtb3VudCAqIG9yZGVyLmNhcnRfc3VidG90YWwgLyAxMDApLCBjdXJyZW5jeV9jb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbGRpc2NvdW50ID0gd2t3Y3Bvc19wcmljZShwYXJzZUZsb2F0KDApLCBjdXJyZW5jeV9jb2RlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvcmRlcl9kaXNjb3VudCA9IHRvdGFsZGlzY291bnQ7XG4gICAgICAgICAgICAgICAgb3JkZXJfdG90YWwgPSB3a3djcG9zX3ByaWNlKHBhcnNlRmxvYXQob3JkZXIub3JkZXJfaHRtbCksIGN1cnJlbmN5X2NvZGUpO1xuICAgICAgICAgICAgICAgIGNhc2hwYXlfYW1vdW50ID0gb3JkZXIuY2FzaFBheSA+IDAgPyB3a3djcG9zX3ByaWNlKHBhcnNlRmxvYXQob3JkZXIuY2FzaFBheSksIGN1cnJlbmN5X2NvZGUpIDogJ04vQSc7XG4gICAgICAgICAgICAgICAgb3RoZXJwYXlfYW1vdW50ID0gb3JkZXIuY2FyZFBheSA+IDAgPyB3a3djcG9zX3ByaWNlKHBhcnNlRmxvYXQob3JkZXIuY2FyZFBheSksIGN1cnJlbmN5X2NvZGUpIDogJ04vQSc7XG4gICAgICAgICAgICAgICAgb3RoZXJfcGF5bWVudF90ZXh0ID0gb3JkZXIuY2FyZFBheSA+IDAgPyBvcmRlci5wYXltZW50X3RpdGxlIDogX18oJ090aGVyIFBheW1lbnRzJywgJ3djX3BvcycpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGJhbGFuY2UgPSBvcmRlci50ZW5kZXJlZCAtIG9yZGVyLm9yZGVyX2h0bWw7XG4gICAgICAgICAgICAgICAgb3JkZXJfY2hhbmdlID0gd2t3Y3Bvc19wcmljZShwYXJzZUZsb2F0KGJhbGFuY2UpLCBjdXJyZW5jeV9jb2RlKTtcblxuICAgICAgICAgICAgICAgIHByb19uYW1lID0gJyc7XG4gICAgICAgICAgICAgICAgcHJvX3VuaXRfcHJpY2UgPSAnJztcbiAgICAgICAgICAgICAgICBwcm9fcXVhbnRpdHkgPSAnJztcbiAgICAgICAgICAgICAgICBwcm9fdG90YWwgPSAnJztcblxuICAgICAgICAgICAgICAgIGxldCBwcm9kdWN0SW5saW5lRGlzY291bnQgPSBbXTtcblxuICAgICAgICAgICAgICAgIG9yZGVyLnByb2R1Y3RzLmZvckVhY2goKHBybywgaSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm8udWYgPCBwcm8uc3BlY2lhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElubGluZURpc2NvdW50LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsdWc6IHByby5zbHVnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NvdW50OiAocHJvLnNwZWNpYWwgLSBwcm8udWYpICogcHJvLnF1YW50aXR5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByb19uYW1lICs9IGA8cD4ke3Byby5uYW1lfTwvcD5gO1xuICAgICAgICAgICAgICAgICAgICBwcm9fdW5pdF9wcmljZSArPSBgPHA+JHt3a3djcG9zX3ByaWNlKHByby51ZiwgY3VycmVuY3lfY29kZSl9PC9wPmA7XG4gICAgICAgICAgICAgICAgICAgIHByb19xdWFudGl0eSArPSBgPHA+JHtwcm8ucXVhbnRpdHl9PC9wPmA7XG4gICAgICAgICAgICAgICAgICAgIHByb190b3RhbCArPSBgPHA+JHt3a3djcG9zX3ByaWNlKHByby51Zl90b3RhbCwgY3VycmVuY3lfY29kZSl9PC9wPmA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByby5wcm9kdWN0X21ldGFfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvX25hbWUgKz0gYDxwPiR7T2JqZWN0LmtleXMocHJvLnByb2R1Y3RfbWV0YV9kYXRhKX08L3A+YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb191bml0X3ByaWNlICs9ICc8YnIgLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvX3F1YW50aXR5ICs9ICc8YnIgLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvX3RvdGFsICs9ICc8YnIgLz4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm8ucHJvZHVjdF9tZXRhX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb19uYW1lICs9IGA8cD4ke09iamVjdC52YWx1ZXMocHJvLnByb2R1Y3RfbWV0YV9kYXRhKX08L3A+YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb191bml0X3ByaWNlICs9ICc8YnIgLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvX3F1YW50aXR5ICs9ICc8YnIgLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvX3RvdGFsICs9ICc8YnIgLz4nO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG9yZGVyX3RheF9saW5lcyA9IG9yZGVyLnRheF9saW5lcztcblxuICAgICAgICAgICAgICAgIGlmIChvcmRlcl90YXhfbGluZXMubGVuZ3RoID09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyX3RheF9saW5lcyA9IE9iamVjdC5rZXlzKG9yZGVyX3RheF9saW5lcykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyX3RheF9saW5lc1trZXldLmlkID0gTnVtYmVyKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW29yZGVyX3RheF9saW5lc1trZXldXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyX3RheF9saW5lcyA9IG9yZGVyX3RheF9saW5lc1swXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0YXhfdGl0bGUgPSAnJztcbiAgICAgICAgICAgICAgICBvcmRlcl90YXggPSAnJztcblxuICAgICAgICAgICAgICAgIGlmIChvcmRlcl90YXhfbGluZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcmRlcl90YXhfbGluZXMuZm9yRWFjaCgodGF4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXhfdGl0bGUgKz0gYDxwPiR7X18oJ1RheCcsICd3Y19wb3MnKX0oJHt0YXgubGFiZWx9KTwvcD5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJfdGF4ICs9IGA8cD4ke3drd2Nwb3NfcHJpY2UocGFyc2VGbG9hdCh0YXgucmF0ZSAqIG9yZGVyLmNhcnRfc3VidG90YWwgLyAxMDApLCBjdXJyZW5jeV9jb2RlKX08L3A+YDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY291cG9uX25hbWUgPSAnJztcbiAgICAgICAgICAgICAgICBjb3Vwb25fYW1vdW50ID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZiAob3JkZXIuY291cG9ucyAmJiBvcmRlci5jb3Vwb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIuY291cG9ucy5mb3JFYWNoKChjb3Vwb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbl9uYW1lICs9IGA8cD4ke19fKCdDb3Vwb24nLCAnd2NfcG9zJyl9KCR7Y291cG9uLmNvZGV9KTwvcD5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291cG9uX2Ftb3VudCArPSBgPHA+JHt3a3djcG9zX3ByaWNlKGNvdXBvbi5wcmljZSwgY3VycmVuY3lfY29kZSl9PC9wPmA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0SW5saW5lRGlzY291bnQgJiYgcHJvZHVjdElubGluZURpc2NvdW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElubGluZURpc2NvdW50LmZvckVhY2goKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbl9uYW1lICs9IGA8cD4ke19fKCdDb3Vwb24nLCAnd2NfcG9zJyl9KCR7cHJvZHVjdC5zbHVnfSk8L3A+YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXBvbl9hbW91bnQgKz0gYDxwPiR7d2t3Y3Bvc19wcmljZShwcm9kdWN0LmRpc2NvdW50LCBjdXJyZW5jeV9jb2RlKX08L3A+YDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXBpZl9zY3JpcHQubG9nZ2VkX2luLnBvc191c2VyKSB7XG4gICAgICAgICAgICBwb3NfdXNlcl9lbWFpbCA9IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbi5wb3NfdXNlci5kYXRhLnVzZXJfZW1haWw7XG4gICAgICAgICAgICBjYXNoaWVyX25hbWUgPSBhcGlmX3NjcmlwdC5sb2dnZWRfaW4ucG9zX3VzZXIuZGF0YS5kaXNwbGF5X25hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW52b2ljZURhdGEgPSAnJztcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbnZvaWNlICYmIHRoaXMucHJvcHMuaW52b2ljZSAhPSBcIjBcIikge1xuICAgICAgICAgICAgaW52b2ljZURhdGEgPSB0aGlzLnByb3BzLmludm9pY2U7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGludm9pY2VEYXRhID0gYFxuXG4gICAgICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgICAgICAud2t3Y3Bvcy1pbnZvaWNlLXdyYXBwZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLWFyZWE6IHNlY29uZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAud2t3Y3Bvcy1pbnZvaWNlLXdyYXBwZXIgKiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAuaW52b2ljZS1oZWFkZXIsIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAuaW52b2ljZS1mb290ZXIgLmZvb3Rlci1kZXRhaWxzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAud2t3Y3Bvcy1pbnZvaWNlLXdyYXBwZXIgLmludm9pY2UtaGVhZGVyIGltZyB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMTBweCAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAuaW52b2ljZS1kZXRhaWxzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAub3JkZXItZGV0YWlscywgLndrd2Nwb3MtaW52b2ljZS13cmFwcGVyIC5vdXRsZXQtZGV0YWlscyB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAuaW52b2ljZS1kZXRhaWxzIC5vcmRlci1kZXRhaWxzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAuaW52b2ljZS1kZXRhaWxzIC5vdXRsZXQtZGV0YWlscyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAud2t3Y3Bvcy1pbnZvaWNlLXdyYXBwZXIgLnByb2R1Y3QtZGV0YWlscyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDE1cHggMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAud2t3Y3Bvcy1pbnZvaWNlLXdyYXBwZXIgLnByb2R1Y3QtZGV0YWlscyB0YWJsZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLndrd2Nwb3MtaW52b2ljZS13cmFwcGVyIC5wcm9kdWN0LWRldGFpbHMgdGFibGUgdGgsIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAucHJvZHVjdC1kZXRhaWxzIHRhYmxlIHRkIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDNweCAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAucHJvZHVjdC1kZXRhaWxzIHRhYmxlIHRoLCAud2t3Y3Bvcy1pbnZvaWNlLXdyYXBwZXIgLnByb2R1Y3QtZGV0YWlscyB0YWJsZSB0ZCBwIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDNweCAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAucHJvZHVjdC1kZXRhaWxzIHRhYmxlIHRoZWFkLCAud2t3Y3Bvcy1pbnZvaWNlLXdyYXBwZXIgLnByb2R1Y3QtZGV0YWlscyB0YWJsZSB0Ym9keTpudGgtb2YtdHlwZSgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItc3R5bGU6IGRhc2hlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci13aWR0aDogM3B4IDAgM3B4O1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjZGRkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAucHJvZHVjdC1kZXRhaWxzIHRhYmxlIHRib2R5Om50aC1vZi10eXBlKDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1zdHlsZTogZGFzaGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAwIDAgM3B4O1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjZGRkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciAucHJvZHVjdC1kZXRhaWxzIHRhYmxlIHRib2R5Om50aC1vZi10eXBlKDIpIHRyOmxhc3QtY2hpbGQgdGQ6bnRoLWxhc3Qtb2YtdHlwZSgxKSwgLndrd2Nwb3MtaW52b2ljZS13cmFwcGVyIC5wcm9kdWN0LWRldGFpbHMgdGFibGUgdGJvZHk6bnRoLW9mLXR5cGUoMikgdHI6bGFzdC1jaGlsZCB0ZDpudGgtbGFzdC1vZi10eXBlKDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1zdHlsZTogZGFzaGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAwIDAgM3B4O1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjZGRkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC53a3djcG9zLWludm9pY2Utd3JhcHBlciBociB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzUlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAxMHB4IGF1dG8gN3B4O1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXN0eWxlOiBkYXNoZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItd2lkdGg6IDNweCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogI2RkZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICNmYWZhZmE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgPC9zdHlsZT5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3a3djcG9zLWludm9pY2Utd3JhcHBlclwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnZvaWNlLWhlYWRlciB3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+VGF4IEludm9pY2UvQmlsbCBvZiBTdXBwbHk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7bG9nb19pbnZvaWNlfVwiIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPiR7b3V0bGV0X25hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImludm9pY2UtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9yZGVyLWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPk9yZGVyIC0gJHtvcmRlcl9pZH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5EYXRlIDogJHtvcmRlcl9kYXRlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPkN1c3RvbWVyIDogJHtjdXN0b21lcl9mbmFtZX0gJHtjdXN0b21lcl9sbmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRsZXQtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+JHtvdXRsZXRfYWRkcmVzc308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke291dGxldF9jaXR5fSAke291dGxldF9zdGF0ZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5UZWwgTm86ICR7cG9zX3VzZXJfcGhvbmV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWRldGFpbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPlByb2R1Y3QgTmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5Vbml0IFByaWNlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPlF1YW50aXR5PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPlRvdGFsIFByaWNlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHt0YmxfZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5TdWJUb3RhbDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke3N1Yl90b3RhbH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPiR7dGF4X3RpdGxlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke29yZGVyX3RheH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPkRpc2NvdW50PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPiR7b3JkZXJfZGlzY291bnR9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke2NvdXBvbl9uYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke2NvdXBvbl9hbW91bnR9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5Ub3RhbDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke29yZGVyX3RvdGFsfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+Q2FzaCBQYXltZW50PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPiR7Y2FzaHBheV9hbW91bnR9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj4ke290aGVyX3BheW1lbnRfdGV4dH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+JHtvdGhlcnBheV9hbW91bnR9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5DaGFuZ2U8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+JHtvcmRlcl9jaGFuZ2V9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImludm9pY2UtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiPkNhc2hpZXI6ICR7Y2FzaGllcl9uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+JHtvdXRsZXRfbmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5UZWwgTm86ICR7cG9zX3VzZXJfcGhvbmV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwid2t3Y3Bvcy1pbnZvaWNlLWVkaXRhYmxlXCI+RW1haWw6ICR7cG9zX3VzZXJfZW1haWx9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxociBjbGFzcz1cIndrd2Nwb3MtaW52b2ljZS1lZGl0YWJsZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ3a3djcG9zLWludm9pY2UtZWRpdGFibGVcIj5IYXZlIGEgbmljZSBkYXk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGludm9pY2VEYXRhID0gZXZhbCgnYCcgKyBpbnZvaWNlRGF0YSArICdgJyk7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0SHRtbFBhcnNlcihpbnZvaWNlRGF0YSk7XG4gICAgfVxuXG4gICAgaGFuZGxlUHJpbnRDbGljayhlLCBvcmRlcl9pZCkge1xuXG4gICAgICAgIHZhciBvcmRlciA9IHRoaXMucHJvcHMub3JkZXI7XG5cbiAgICAgICAgaWYgKG9yZGVyLm9yZGVyX2lkID09IG9yZGVyX2lkKSB7XG5cbiAgICAgICAgICAgIC8vIHZhciBpbnZvaWNlSHRtbCA9IHRoaXMuR2V0SHRtbChvcmRlcik7XG4gICAgICAgICAgICB2YXIgaW52b2ljZUh0bWwgPSB0aGlzLmdldEludm9pY2Uob3JkZXIpO1xuXG4gICAgICAgICAgICB2YXIgc3R5bGVzID0gdGhpcy5zZXR1cEludm9pY2VTaXplKCk7XG5cbiAgICAgICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludm9pY2UtYm9keScpKTtcblxuICAgICAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgICAgIGludm9pY2VIdG1sLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnZvaWNlLWJvZHknKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5vcGVuUHJpbnRXaW5kb3coalF1ZXJ5KFwiI2ludm9pY2UtcHJpbnRcIikuaHRtbCgpLCBzdHlsZXMpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9wZW5QcmludFdpbmRvdyhwcmludENvbnRlbnRzLCBzdHlsZSkge1xuXG4gICAgICAgIHZhciBvcmRlciA9IHRoaXMucHJvcHMub3JkZXI7XG5cbiAgICAgICAgZG9BY3Rpb24oUEVSRk9STV9BQ1RJT05fQUZURVJfSU5WT0lDRV9QUklOVCwgb3JkZXIpO1xuXG4gICAgICAgIGlmIChhcHBseUZpbHRlcnMoV0FOVF9UT19QUklOVF9SRUNJRVBULCB0cnVlLCBvcmRlcikpIHtcblxuICAgICAgICAgICAgaWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHByaW50V2luZG93ID0gd2luZG93Lm9wZW4oXCJcIiwgXCJQUklOVFwiLCBcImhlaWdodD00MDAsd2lkdGg9NjAwXCIpO1xuICAgICAgICAgICAgICAgIC8vIHByaW50V2luZG93LmRvY3VtZW50LndyaXRlKFwiPGxpbmsgbWVkaWE9J2FsbCcgaHJlZj0nXCIgKyBhcGlmX3NjcmlwdC5hc3NldHMgKyBcIi9jc3MvbWluL2ludm9pY2UubWluLmNzcz92ZXI9MS4wLjcnIHR5cGU9J3RleHQvY3NzJyByZWw9J3N0eWxlc2hlZXQnPlwiKTtcbiAgICAgICAgICAgICAgICBwcmludFdpbmRvdy5kb2N1bWVudC53cml0ZShcIjxodG1sPjxoZWFkPjx0aXRsZT48L3RpdGxlPlwiICsgc3R5bGUpO1xuXG4gICAgICAgICAgICAgICAgcHJpbnRXaW5kb3cuZG9jdW1lbnQud3JpdGUoXCI8L2hlYWQ+PGJvZHk+XCIpO1xuICAgICAgICAgICAgICAgIHByaW50V2luZG93LmRvY3VtZW50LndyaXRlKHByaW50Q29udGVudHMpO1xuICAgICAgICAgICAgICAgIHByaW50V2luZG93LmRvY3VtZW50LndyaXRlKFwiPC9ib2R5PjwvaHRtbD5cIik7XG4gICAgICAgICAgICAgICAgcHJpbnRXaW5kb3cuZG9jdW1lbnQuY2xvc2UoKTsgLy8gbmVjZXNzYXJ5IGZvciBJRSA+PSAxMFxuICAgICAgICAgICAgICAgIHByaW50V2luZG93LmZvY3VzKCk7IC8vIG5lY2Vzc2FyeSBmb3IgSUUgPj0gMTAqLS9cblxuICAgICAgICAgICAgICAgIHByaW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50V2luZG93LnByaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZnJhbWUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cbiAgICAgICAgICAgICAgICBmcmFtZTEubmFtZSA9IFwiZnJhbWUxXCI7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZyYW1lMSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZnJhbWVEb2MgPSBmcmFtZTEuY29udGVudFdpbmRvdyA/IGZyYW1lMS5jb250ZW50V2luZG93IDogZnJhbWUxLmNvbnRlbnREb2N1bWVudC5kb2N1bWVudCA/IGZyYW1lMS5jb250ZW50RG9jdW1lbnQuZG9jdW1lbnQgOiBmcmFtZTEuY29udGVudERvY3VtZW50O1xuXG4gICAgICAgICAgICAgICAgZnJhbWVEb2MuZG9jdW1lbnQub3BlbigpO1xuXG4gICAgICAgICAgICAgICAgZnJhbWVEb2MuZG9jdW1lbnQud3JpdGUoXCI8aHRtbD48aGVhZD48dGl0bGU+PC90aXRsZT5cIiArIHN0eWxlKTtcblxuICAgICAgICAgICAgICAgIGZyYW1lRG9jLmRvY3VtZW50LndyaXRlKFwiPC9oZWFkPjxib2R5PlwiKTtcblxuICAgICAgICAgICAgICAgIGZyYW1lRG9jLmRvY3VtZW50LndyaXRlKHByaW50Q29udGVudHMpO1xuXG4gICAgICAgICAgICAgICAgZnJhbWVEb2MuZG9jdW1lbnQud3JpdGUoXCI8L2JvZHk+PC9odG1sPlwiKTtcblxuICAgICAgICAgICAgICAgIGZyYW1lRG9jLmRvY3VtZW50LmNsb3NlKCk7IC8vIG5lY2Vzc2FyeSBmb3IgSUUgPj0gMTBcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5mcmFtZXNbXCJmcmFtZTFcIl0uZm9jdXMoKTtcblxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuZnJhbWVzW1wiZnJhbWUxXCJdLnByaW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmcmFtZTEpO1xuXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXR1cEludm9pY2VTaXplKCkge1xuXG4gICAgICAgIHZhciBwcmludGVyID0gdGhpcy5wcm9wcy5wcmludGVycztcblxuICAgICAgICB2YXIgc3ByaW50ZXIgPSBwcmludGVyLmRlZmF1bHQ7XG5cbiAgICAgICAgdmFyIHN0eWxlX3J1bGVzID0gW107XG5cbiAgICAgICAgaWYgKHNwcmludGVyKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoc3ByaW50ZXIpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2EzJzpcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVfcnVsZXMucHVzaChcIiBAcGFnZSB7IHNpemU6IEEzO21hcmdpbjogMjBtbTt9IFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4nICsgc3R5bGVfcnVsZXMuam9pbihcIlxcblwiKSArIFwiPC9zdHlsZT5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdhNCc6XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlX3J1bGVzLnB1c2goXCIgQHBhZ2UgeyBzaXplOiBBNDttYXJnaW46IDIwbW07IH0gXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSAnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPicgKyBzdHlsZV9ydWxlcy5qb2luKFwiXFxuXCIpICsgXCI8L3N0eWxlPlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2E1JzpcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVfcnVsZXMucHVzaChcIiBAcGFnZSB7IHNpemU6IEE1OyBtYXJnaW46IDEwbW07fSBcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9ICc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+JyArIHN0eWxlX3J1bGVzLmpvaW4oXCJcXG5cIikgKyBcIjwvc3R5bGU+XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnYTYnOlxuICAgICAgICAgICAgICAgICAgICBzdHlsZV9ydWxlcy5wdXNoKFwiIEBwYWdlIHsgc2l6ZTogQTY7IG1hcmdpbjogMTBtbTt9IFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4nICsgc3R5bGVfcnVsZXMuam9pbihcIlxcblwiKSArIFwiPC9zdHlsZT5cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdUODhWJzpcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVfcnVsZXMucHVzaChcIiBAcGFnZSB7c2l6ZTogNThtbSAxMjBtbTsgfSAgXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSAnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPicgKyAnLmludm9pY2UtaGVhZCwgLmludm9pY2UtYm9keSwgLmludm9pY2UtZm9vdGVyeyB3aWR0aDo3MG1tO30nICsgc3R5bGVfcnVsZXMuam9pbihcIlxcblwiKSArIFwiPC9zdHlsZT5cIjtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmludm9pY2UtaGVhZCwgLmludm9pY2UtYm9keSwgLmludm9pY2UtZm9vdGVyXCIpLmNzcyhcImZvbnQtc2l6ZVwiLCBcIjEycHg7XCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIEdldEh0bWwob3JkZXIpIHtcblxuICAgICAgICB2YXIgcGF5bWVudE1vZGUgPSBvcmRlci5wYXltZW50X3RpdGxlO1xuXG4gICAgICAgIHZhciBjYXNoUGF5X3RleHQgPSAnJztcblxuICAgICAgICB2YXIgY2FyZFBheV90ZXh0ID0gJyc7XG5cbiAgICAgICAgdmFyIGNhc2hfcGF5bWVudF90ZXh0ID0gdHJhbnNsYXRpb24uY2FzaF90ZXh0O1xuXG4gICAgICAgIGlmIChvcmRlci5jYXNoUGF5ID4gMCkge1xuXG4gICAgICAgICAgICBjYXNoUGF5X3RleHQgPSA8bGk+PGg0PntjYXNoX3BheW1lbnRfdGV4dH08L2g0PjxzcGFuIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogb3JkZXIuY2FzaFBheV9odG1sIH19Pjwvc3Bhbj48L2xpPjtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9yZGVyLmNhcmRQYXkgPiAwKSB7XG5cbiAgICAgICAgICAgIGNhcmRQYXlfdGV4dCA9IDxsaT48aDQ+e3BheW1lbnRNb2RlfTwvaDQ+PHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBvcmRlci5jYXJkUGF5X2h0bWwgfX0+PC9zcGFuPjwvbGk+O1xuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvZHVjdHMgPSBBcnJheS5mcm9tKG9yZGVyLnByb2R1Y3RzKTtcblxuICAgICAgICB2YXIgb3JkZXJfdGF4X2xpbmVzID0gb3JkZXIudGF4X2xpbmVzO1xuXG4gICAgICAgIGlmIChvcmRlcl90YXhfbGluZXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICB2YXIgb1RheCA9IG9yZGVyX3RheF9saW5lcy5tYXAoKHRheCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIDx0ciBrZXk9e3RheC5pZH0+PHRkPiZuYnNwOzwvdGQ+PHRkPiZuYnNwOzwvdGQ+PHRkIGNsYXNzTmFtZT1cInN1Yi10b3RhbFwiPntfXygnVGF4JywgJ3djX3BvcycpfSh7dGF4LnRpdGxlfSk8L3RkPjx0ZCBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRheC50b3RhbCB9fT48L3RkPjwvdHI+O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdmFyIG9UYXggPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb3Vwb25zID0gb3JkZXIuY291cG9ucztcblxuICAgICAgICBpZiAoY291cG9ucykge1xuXG4gICAgICAgICAgICB2YXIgY291cG9uX2h0bWwgPSBbXTtcblxuICAgICAgICAgICAgalF1ZXJ5LmVhY2goY291cG9ucywgKGksIGNvdXBvbikgPT4ge1xuXG4gICAgICAgICAgICAgICAgY291cG9uX2h0bWwucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwic3ViLXRvdGFsXCI+e19fKCdDb3Vwb24nLCAnd2NfcG9zJyl9PHNwYW4+KHtpfSk8L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjb3Vwb24tYW10XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBjb3Vwb24gfX0+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdmFyIGNvdXBvbl9odG1sID0gJyc7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcmRlcnByb2R1Y3RzID0gcHJvZHVjdHMubWFwKChwcm8sIGkpID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJib3JkZXJfYm90dG9tXCIga2V5PXtpfSA+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwcm9kdWN0LW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm8ucHJvZHVjdF9uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJvcmRlci1wcm9kdWN0LW1ldGEtaGVhZGluZ1wiPntwcm8ucHJvZHVjdF9tZXRhX2RhdGEgPyBPYmplY3Qua2V5cyhwcm8ucHJvZHVjdF9tZXRhX2RhdGEpIDogXCJcIn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJvcmRlci1wcm9kdWN0LW1ldGFcIj4ge3Byby5wcm9kdWN0X21ldGFfZGF0YSA/IE9iamVjdC52YWx1ZXMocHJvLnByb2R1Y3RfbWV0YV9kYXRhKSA6IFwiXCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHJvZHVjdC1xdWFudGl0eVwiPntwcm8ucXR5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwcm9kdWN0LXVuaXQtcHJpY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogcHJvLnByb2R1Y3RfdW5pdF9wcmljZSB9fT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwcm9kdWN0LXRvdGFsLXByaWNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHByby5wcm9kdWN0X3RvdGFsX3ByaWNlIH19Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgICApXG4gICAgICAgIH0pO1xuICAgICAgICBvcmRlcnByb2R1Y3RzID0gYXBwbHlGaWx0ZXJzKENIQU5HRV9MSVNUSU5HX09GX1BST0RVQ1RTLCBvcmRlcnByb2R1Y3RzLCBwcm9kdWN0cyk7XG4gICAgICAgIHZhciBjdXN0b21EYXRhID0gYXBwbHlGaWx0ZXJzKEFERF9DVVNUT01fT1JERVJfREFUQV9CRUxPV19EQVRFLCAnJywgb3JkZXIpO1xuICAgICAgICB2YXIgb3JkZXJfdGV4dCA9IHRyYW5zbGF0aW9uLm9yZGVyX3RleHQ7XG4gICAgICAgIHZhciBkYXRlX3RleHQgPSB0cmFuc2xhdGlvbi5kYXRlO1xuICAgICAgICB2YXIgc3VidG90YWxfdGV4dCA9IHRyYW5zbGF0aW9uLnN1YnRvdGFsX3RleHQ7XG4gICAgICAgIHZhciB0b3RhbF90ZXh0ID0gdHJhbnNsYXRpb24udG90YWxfdGV4dDtcbiAgICAgICAgdmFyIGRpc2NvdW50X3RleHQgPSB0cmFuc2xhdGlvbi5kaXNjb3VudF90ZXh0O1xuICAgICAgICB2YXIgYmFsYW5jZV90ZXh0ID0gdHJhbnNsYXRpb24uYmFsYW5jZV90ZXh0O1xuICAgICAgICB2YXIgcmVmdW5kX3RleHQgPSB0cmFuc2xhdGlvbi5yZWZ1bmRfdGV4dDtcbiAgICAgICAgdmFyIGN1c3RvbWVyX3RleHQgPSB0cmFuc2xhdGlvbi5jdXN0b21lcl90ZXh0O1xuICAgICAgICBsZXQgb3JkZXJSZWZ1bmQgPSBvcmRlci50b3RhbF9yZWZ1bmQgP1xuXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwib3JkZXItYmFsYW5jZVwiPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGg0PntyZWZ1bmRfdGV4dH0gPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e1JlYWN0SHRtbFBhcnNlcihvcmRlci5jdXJyZW5jeSl9e1JlYWN0SHRtbFBhcnNlcihvcmRlci50b3RhbF9yZWZ1bmQpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICA8L3VsPiA6ICcnO1xuXG4gICAgICAgIHZhciBjdXN0b21BZnRlclRheCA9IGFwcGx5RmlsdGVycyhBRERfREFUQV9BRlRFUl9UQVhfSU5fUkVDRUlQVCwgJycsIG9yZGVyKTtcblxuICAgICAgICB2YXIgY3VzdG9tQWZ0ZXJCYWxhbmNlID0gYXBwbHlGaWx0ZXJzKEFERF9EQVRBX0FGVEVSX0JBTEFOQ0VfSU5fUkVDRUlQVCwgJycsIG9yZGVyKTtcblxuICAgICAgICByZXR1cm4gKDxkaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zLW9yZGVyLXNob3J0XCI+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1vcmRlci1zZWN0XCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPHA+e29yZGVyX3RleHR9IC0gI3tvcmRlci5vcmRlcl9pZH08L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGF0ZVwiPntkYXRlX3RleHR9OiB7b3JkZXIub3JkZXJfZGF0ZX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3Mtc3VtYXJyeS1jdXN0b21lclwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjdXN0b21lci1uYW1lXCI+e2N1c3RvbWVyX3RleHR9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjdXN0b21lci1uYW1lXCI+e29yZGVyLmJpbGxpbmcuZm5hbWV9IHtvcmRlci5iaWxsaW5nLmxuYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiY3VzdG9tLWRhdGFcIj57Y3VzdG9tRGF0YX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1zYWxlLXN1bW1hcnlcIj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2FsZS1zdW1tYXJ5LXByb2R1Y3RzXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm9yZGVyLXByb2R1Y3Qtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkIGNsYXNzTmFtZT1cImJvcmRlcl9ib3R0b21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwcm9kdWN0LW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2xhdGlvbi5wcm9kdWN0X25hbWVfdGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInByb2R1Y3QtcXVhbnRpdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2xhdGlvbi5xdWFudGl0eV90ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHJvZHVjdC11bml0LXByaWNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNsYXRpb24udW5pdF9wcmljZV90ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHJvZHVjdC10b3RhbC1wcmljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zbGF0aW9uLnRvdGFsX3ByaWNlX3RleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge29yZGVycHJvZHVjdHN9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInN1Yi10b3RhbFwiPntzdWJ0b3RhbF90ZXh0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBkYW5nZXJvdXNseVNldElubmVySFRNTD17YXBwbHlGaWx0ZXJzKFVQREFURV9QT1NfT1JERVJfU1VCX1RPVEFMLCB7IF9faHRtbDogb3JkZXIuY2FydF9zdWJ0b3RhbCB9LCBvcmRlcil9PjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b1RheH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+Jm5ic3A7PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInN1Yi10b3RhbFwiPntkaXNjb3VudF90ZXh0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IG9yZGVyLmRpc2NvdW50IH19PjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y291cG9uX2h0bWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2N1c3RvbUFmdGVyVGF4fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2FsZS1zdW1tYXJ5LWNhbGN1bGF0ZS10b3RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pnt0b3RhbF90ZXh0fSA8L2g0PjxzcGFuIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXthcHBseUZpbHRlcnMod2t3Y3Bvc19jaGFuZ2VfcG9zX3RvdGFsLCB7IF9faHRtbDogb3JkZXIub3JkZXJfaHRtbCB9LCBvcmRlcil9Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2FzaFBheV90ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAge2NhcmRQYXlfdGV4dH1cblxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwib3JkZXItYmFsYW5jZVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PntiYWxhbmNlX3RleHR9IDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBvcmRlci5iYWxhbmNlIH19Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgICAgICB7b3JkZXJSZWZ1bmR9XG4gICAgICAgICAgICAgICAgICAgIHtjdXN0b21BZnRlckJhbGFuY2V9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+KTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICAgICAgdmFyIHVuaXRfdGV4dCA9IHRyYW5zbGF0aW9uLnVuaXRfdGV4dDtcbiAgICAgICAgICAgIHZhciB0YXhfdGV4dCA9IHRyYW5zbGF0aW9uLnRheF90ZXh0O1xuICAgICAgICAgICAgdmFyIG9yZGVyX3N1bW1hcnkgPSB0cmFuc2xhdGlvbi5vcmRlcl9zdW1tYXJ5O1xuICAgICAgICAgICAgdmFyIHN1YnRvdGFsX3RleHQgPSB0cmFuc2xhdGlvbi5zdWJ0b3RhbF90ZXh0O1xuICAgICAgICAgICAgdmFyIHRvdGFsX3RleHQgPSB0cmFuc2xhdGlvbi50b3RhbF90ZXh0O1xuICAgICAgICAgICAgdmFyIGRpc2NvdW50X3RleHQgPSB0cmFuc2xhdGlvbi5kaXNjb3VudF90ZXh0O1xuICAgICAgICAgICAgdmFyIGJhbGFuY2VfdGV4dCA9IHRyYW5zbGF0aW9uLmJhbGFuY2VfdGV4dDtcbiAgICAgICAgICAgIHZhciBjYXNoX3BheW1lbnRfdGV4dCA9IHRyYW5zbGF0aW9uLmNhc2hfdGV4dDtcbiAgICAgICAgICAgIHZhciBjYXJkX3BheW1lbnRfdGV4dCA9IHRyYW5zbGF0aW9uLmNhcmRfdGV4dDtcbiAgICAgICAgICAgIHZhciBwcmludEludm9pY2VfdGV4dCA9IHRyYW5zbGF0aW9uLnByaW50SW52b2ljZV90ZXh0O1xuXG4gICAgICAgICAgICBpZiggdGhpcy5zdGF0ZS5vcmRlcikge1xuXG4gICAgICAgICAgICAgICAgdmFyIG9yZGVyID0gdGhpcy5zdGF0ZS5vcmRlcjtcblxuICAgICAgICAgICAgICAgIG9yZGVyID0gb3JkZXIub3JkZXI7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgb3JkZXIgPSB0aGlzLnByb3BzLm9yZGVyO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwYXltZW50TW9kZSA9IG9yZGVyLnBheW1lbnRfdGl0bGU7XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW5jeSA9IG9yZGVyLmN1cnJlbmN5O1xuXG4gICAgICAgICAgICBsZXQgY3VycmVuY3lfY29kZSA9IGN1cnJlbmN5LnN5bWJvbDtcblxuICAgICAgICAgICAgdmFyIGN1cnJlbmN5X3Bvc2l0aW9uID0gJ0wnO1xuXG4gICAgICAgICAgICB2YXIgZGlzY291bnQgPSBvcmRlci5kaXNjb3VudDtcblxuICAgICAgICAgICAgdmFyIG9yZGVyX3RheF9saW5lcyA9IG9yZGVyLnRheF9saW5lcztcblxuICAgICAgICAgICAgaWYoIG9yZGVyX3RheF9saW5lcy5sZW5ndGggPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICAgICAgb3JkZXJfdGF4X2xpbmVzID0gT2JqZWN0LmtleXMob3JkZXJfdGF4X2xpbmVzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyX3RheF9saW5lc1trZXldLmlkID0gTnVtYmVyKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbb3JkZXJfdGF4X2xpbmVzW2tleV1dO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9yZGVyX3RheF9saW5lcyA9IG9yZGVyX3RheF9saW5lc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIG9yZGVyX3RheF9saW5lcy5sZW5ndGggPiAwICkge1xuXG4gICAgICAgICAgICAgICAgdmFyIG9UYXggPSBvcmRlcl90YXhfbGluZXMubWFwKCAodGF4KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e3RheC5pZH0+PGg0Pnt0YXhfdGV4dH0oe3RheC5sYWJlbH0pPC9oND48c3Bhbj57d2t3Y3Bvc19wcmljZShwYXJzZUZsb2F0KHRheC5yYXRlICogb3JkZXIuY2FydF9zdWJ0b3RhbCAvIDEwMCksIGN1cnJlbmN5X2NvZGUpfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIG9UYXggPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHByb2R1Y3RzID0gb3JkZXIucHJvZHVjdHM7XG5cblxuICAgICAgICAgICAgY29uc3Qgb3JkZXJwcm9kdWN0cyA9IHByb2R1Y3RzLm1hcCggKHBybywgaSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RfdG90YWwgPSB3a3djcG9zX3ByaWNlKHByby51Zl90b3RhbCwgY3VycmVuY3lfY29kZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4oXG5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9yZGVyLXByb2R1Y3Qtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND57cHJvLm5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPntwcm8ucHJvZHVjdF9tZXRhX2RhdGEgPyBPYmplY3Qua2V5cyhwcm8ucHJvZHVjdF9tZXRhX2RhdGEpIDogXCJcIn08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJvcmRlci1wcm9kdWN0LW1ldGFcIj4ge3Byby5wcm9kdWN0X21ldGFfZGF0YSA/IE9iamVjdC52YWx1ZXMocHJvLnByb2R1Y3RfbWV0YV9kYXRhKSA6IFwiXCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm9yZGVyLXByb2R1Y3QtcXVhbnRpdHlcIj57cHJvLnF1YW50aXR5fSB7dW5pdF90ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6IHByb2R1Y3RfdG90YWwgfX0+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIGJhbGFuY2UgPSAgb3JkZXIudGVuZGVyZWQgLSBvcmRlci5vcmRlcl9odG1sIDtcblxuICAgICAgICAgICAgdmFyIHN1YnRvdGFsID0gd2t3Y3Bvc19wcmljZShvcmRlci5jYXJ0X3N1YnRvdGFsLCBjdXJyZW5jeV9jb2RlKTtcblxuICAgICAgICAgICAgdmFyIGJhbGFuY2UgPSB3a3djcG9zX3ByaWNlKHBhcnNlRmxvYXQoIGJhbGFuY2UgKSwgY3VycmVuY3lfY29kZSk7XG5cbiAgICAgICAgICAgIGlmKCBPYmplY3Qua2V5cyhkaXNjb3VudCkubGVuZ3RoID4gMCAgKSB7XG5cbiAgICAgICAgICAgICAgICBpZihkaXNjb3VudC50eXBlID09ICdmaXhlZCcgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdGFsZGlzY291bnQgPSB3a3djcG9zX3ByaWNlKHBhcnNlRmxvYXQoZGlzY291bnQuYW1vdW50KSwgY3VycmVuY3lfY29kZSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciB0b3RhbGRpc2NvdW50ID0gcGFyc2VGbG9hdChkaXNjb3VudC5hbW91bnQpLnRvRml4ZWQoMikgKyAnJSc7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbGRpc2NvdW50ID0gd2t3Y3Bvc19wcmljZShwYXJzZUZsb2F0KGRpc2NvdW50LmFtb3VudCAqIG9yZGVyLmNhcnRfc3VidG90YWwgLyAxMDApLCBjdXJyZW5jeV9jb2RlKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHZhciB0b3RhbGRpc2NvdW50ID0gd2t3Y3Bvc19wcmljZShwYXJzZUZsb2F0KDApLCBjdXJyZW5jeV9jb2RlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2FydF90b3RhbCA9IHdrd2Nwb3NfcHJpY2UocGFyc2VGbG9hdChvcmRlci5vcmRlcl9odG1sKSwgY3VycmVuY3lfY29kZSk7XG5cbiAgICAgICAgICAgIHZhciBjYXNoUGF5ID0gd2t3Y3Bvc19wcmljZShwYXJzZUZsb2F0KG9yZGVyLmNhc2hQYXkpLCBjdXJyZW5jeV9jb2RlKTtcblxuICAgICAgICAgICAgdmFyIGNhcmRQYXkgPSB3a3djcG9zX3ByaWNlKHBhcnNlRmxvYXQob3JkZXIuY2FyZFBheSksIGN1cnJlbmN5X2NvZGUpO1xuICAgICAgICAgICAgdmFyIGN1c3RvbUFmdGVyVGF4ID0gYXBwbHlGaWx0ZXJzKEFERF9EQVRBX0FGVEVSX1RBWF9JTl9TVU1NQVJZLCAnJywgb3JkZXIpO1xuXG4gICAgICAgIHJldHVybiAoXG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zLXNhbGUtc3VtbWFyeVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2FsZS1zdW1tYXJ5LXByb2R1Y3RzXCI+XG4gICAgICAgICAgICAgICAgICAgIDx1bD57b3JkZXJwcm9kdWN0c308L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zLXNhbGUtc3VtbWFyeS10b3RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic2FsZS1zdW1tYXJ5LXN1YnRvdGFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PntzdWJ0b3RhbF90ZXh0fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdWJ0b3RhbCB9fT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAge29UYXh9XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PntkaXNjb3VudF90ZXh0fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3RvdGFsZGlzY291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjdXN0b21BZnRlclRheH1cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNhbGUtc3VtbWFyeS10b3RhbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND57dG90YWxfdGV4dH08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogY2FydF90b3RhbCB9fT48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND57b3JkZXIuY2FzaFBheSA+IDAgPyBjYXNoX3BheW1lbnRfdGV4dCA6IFwiXCJ9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57b3JkZXIuY2FzaFBheSA+IDAgPyBjYXNoUGF5IDogXCJcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND57b3JkZXIuY2FyZFBheSA+IDAgPyBwYXltZW50TW9kZSA6IFwiXCJ9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57b3JkZXIuY2FyZFBheSA+IDAgPyBjYXJkUGF5IDogXCJcIn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJvcmRlci1iYWxhbmNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PntiYWxhbmNlX3RleHR9IDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBiYWxhbmNlIH19Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zLW9yZGVyLWludm9pY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInByaW50LWludm9pY2UgcHJpbWFyeVwiIG9uQ2xpY2s9eygoZSkgPT4gdGhpcy5oYW5kbGVQcmludENsaWNrKGUsIG9yZGVyLm9yZGVyX2lkKSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXByaW50XCI+PC9pPiZuYnNwO3twcmludEludm9pY2VfdGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3Mtb3JkZXItcmV0dXJuXCIgaWQ9XCJwb3Mtb3JkZXItcmV0dXJuXCIgZGF0YS1vcmRlcmlkPXtvcmRlci5vcmRlcl9pZH0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHthcHBseUZpbHRlcnMoQUREX0FGVEVSX1BSSU5UX0lOVk9JQ0VfQlVUVE9OX0ZJTFRFUiwgJycsIG9yZGVyKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuXG4gICAgfVxufVxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKHtcbiAgICBwcmludGVyczogc3RhdGUucHJpbnRlcnMsXG4gICAgaW52b2ljZTogc3RhdGUuaW52b2ljZVxufSk7XG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IGRpc3BhdGNoIH0sIGJpbmRBY3Rpb25DcmVhdG9ycyh7fSwgZGlzcGF0Y2gpKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKE9yZGVyU3VtbWFyeSk7XG4iLCIvLyBUaGUgbGlicmFyeSdzIHNldHRpbmdzIGNvbmZpZ3VyYXRpb24gb2JqZWN0LiBDb250YWlucyBkZWZhdWx0IHBhcmFtZXRlcnMgZm9yXG4vLyBjdXJyZW5jeSBhbmQgbnVtYmVyIGZvcm1hdHRpbmdcbmNvbnN0IHNldHRpbmdzID0ge1xuICAgIGN1cnJlbmN5OiB7XG4gICAgICAgIHN5bWJvbCA6IFwiJFwiLFx0XHQvLyBkZWZhdWx0IGN1cnJlbmN5IHN5bWJvbCBpcyAnJCdcbiAgICAgICAgZm9ybWF0IDogXCIlcyV2XCIsXHQvLyBjb250cm9scyBvdXRwdXQ6ICVzID0gc3ltYm9sLCAldiA9IHZhbHVlIChjYW4gYmUgb2JqZWN0LCBzZWUgZG9jcylcbiAgICAgICAgZGVjaW1hbCA6IFwiLlwiLFx0XHQvLyBkZWNpbWFsIHBvaW50IHNlcGFyYXRvclxuICAgICAgICB0aG91c2FuZCA6IFwiLFwiLFx0XHQvLyB0aG91c2FuZHMgc2VwYXJhdG9yXG4gICAgICAgIHByZWNpc2lvbiA6IDIsXHRcdC8vIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgIGdyb3VwaW5nIDogM1x0XHQvLyBkaWdpdCBncm91cGluZyAobm90IGltcGxlbWVudGVkIHlldClcbiAgICB9LFxuICAgIG51bWJlcjoge1xuICAgICAgICBwcmVjaXNpb24gOiAwLFx0XHQvLyBkZWZhdWx0IHByZWNpc2lvbiBvbiBudW1iZXJzIGlzIDBcbiAgICAgICAgZ3JvdXBpbmcgOiAzLFx0XHQvLyBkaWdpdCBncm91cGluZyAobm90IGltcGxlbWVudGVkIHlldClcbiAgICAgICAgdGhvdXNhbmQgOiBcIixcIixcbiAgICAgICAgZGVjaW1hbCA6IFwiLlwiXG4gICAgfVxufTtcblxuLy8gU3RvcmUgcmVmZXJlbmNlIHRvIHBvc3NpYmx5LWF2YWlsYWJsZSBFQ01BU2NyaXB0IDUgbWV0aG9kcyBmb3IgbGF0ZXJcbnZhciBuYXRpdmVNYXAgPSBBcnJheS5wcm90b3R5cGUubWFwLFxubmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG50b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRm9ybWF0IGEgbnVtYmVyIGludG8gY3VycmVuY3lcbiAqXG4gKiBVc2FnZTogYWNjb3VudGluZy5mb3JtYXRNb25leShudW1iZXIsIHN5bWJvbCwgcHJlY2lzaW9uLCB0aG91c2FuZHNTZXAsIGRlY2ltYWxTZXAsIGZvcm1hdClcbiAqIGRlZmF1bHRzOiAoMCwgXCIkXCIsIDIsIFwiLFwiLCBcIi5cIiwgXCIlcyV2XCIpXG4gKlxuICogTG9jYWxpc2UgYnkgb3ZlcnJpZGluZyB0aGUgc3ltYm9sLCBwcmVjaXNpb24sIHRob3VzYW5kIC8gZGVjaW1hbCBzZXBhcmF0b3JzIGFuZCBmb3JtYXRcbiAqIFNlY29uZCBwYXJhbSBjYW4gYmUgYW4gb2JqZWN0IG1hdGNoaW5nIGBzZXR0aW5ncy5jdXJyZW5jeWAgd2hpY2ggaXMgdGhlIGVhc2llc3Qgd2F5LlxuICpcbiAqIFRvIGRvOiB0aWR5IHVwIHRoZSBwYXJhbWV0ZXJzXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdE1vbmV5KG51bWJlciwgc3ltYm9sLCBwcmVjaXNpb24sIHRob3VzYW5kLCBkZWNpbWFsLCBmb3JtYXQpIHtcbiAgICAvLyBSZXN1cnNpdmVseSBmb3JtYXQgYXJyYXlzOlxuICAgIGlmIChpc0FycmF5KG51bWJlcikpIHtcbiAgICAgICAgcmV0dXJuIG1hcChudW1iZXIsIGZ1bmN0aW9uKHZhbCl7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0TW9uZXkodmFsLCBzeW1ib2wsIHByZWNpc2lvbiwgdGhvdXNhbmQsIGRlY2ltYWwsIGZvcm1hdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENsZWFuIHVwIG51bWJlcjpcbiAgICBudW1iZXIgPSB1bmZvcm1hdChudW1iZXIpO1xuXG4gICAgLy8gQnVpbGQgb3B0aW9ucyBvYmplY3QgZnJvbSBzZWNvbmQgcGFyYW0gKGlmIG9iamVjdCkgb3IgYWxsIHBhcmFtcywgZXh0ZW5kaW5nIGRlZmF1bHRzOlxuICAgIHZhciBvcHRzID0gZGVmYXVsdHMoXG4gICAgICAgICAgICAoaXNPYmplY3Qoc3ltYm9sKSA/IHN5bWJvbCA6IHtcbiAgICAgICAgICAgICAgICBzeW1ib2wgOiBzeW1ib2wsXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uIDogcHJlY2lzaW9uLFxuICAgICAgICAgICAgICAgIHRob3VzYW5kIDogdGhvdXNhbmQsXG4gICAgICAgICAgICAgICAgZGVjaW1hbCA6IGRlY2ltYWwsXG4gICAgICAgICAgICAgICAgZm9ybWF0IDogZm9ybWF0XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHNldHRpbmdzLmN1cnJlbmN5XG4gICAgICAgICksXG5cbiAgICAgICAgLy8gQ2hlY2sgZm9ybWF0IChyZXR1cm5zIG9iamVjdCB3aXRoIHBvcywgbmVnIGFuZCB6ZXJvKTpcbiAgICAgICAgZm9ybWF0cyA9IGNoZWNrQ3VycmVuY3lGb3JtYXQob3B0cy5mb3JtYXQpLFxuXG4gICAgICAgIC8vIENob29zZSB3aGljaCBmb3JtYXQgdG8gdXNlIGZvciB0aGlzIHZhbHVlOlxuICAgICAgICB1c2VGb3JtYXQgPSBudW1iZXIgPiAwID8gZm9ybWF0cy5wb3MgOiBudW1iZXIgPCAwID8gZm9ybWF0cy5uZWcgOiBmb3JtYXRzLnplcm87XG5cbiAgICAvLyBSZXR1cm4gd2l0aCBjdXJyZW5jeSBzeW1ib2wgYWRkZWQ6XG4gICAgcmV0dXJuIHVzZUZvcm1hdC5yZXBsYWNlKCclcycsIG9wdHMuc3ltYm9sKS5yZXBsYWNlKCcldicsIGZvcm1hdE51bWJlcihNYXRoLmFicyhudW1iZXIpLCBjaGVja1ByZWNpc2lvbihvcHRzLnByZWNpc2lvbiksIG9wdHMudGhvdXNhbmQsIG9wdHMuZGVjaW1hbCkpO1xufTtcblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIHN1cHBsaWVkIHBhcmFtZXRlciBpcyBhIHN0cmluZ1xuICogZnJvbSB1bmRlcnNjb3JlLmpzLCBkZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICovXG5mdW5jdGlvbiBpc0FycmF5KG9iaikge1xuICAgIHJldHVybiBuYXRpdmVJc0FycmF5ID8gbmF0aXZlSXNBcnJheShvYmopIDogdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIENoZWNrIGFuZCBub3JtYWxpc2UgdGhlIHZhbHVlIG9mIHByZWNpc2lvbiAobXVzdCBiZSBwb3NpdGl2ZSBpbnRlZ2VyKVxuICovXG5mdW5jdGlvbiBjaGVja1ByZWNpc2lvbih2YWwsIGJhc2UpIHtcbiAgICB2YWwgPSBNYXRoLnJvdW5kKE1hdGguYWJzKHZhbCkpO1xuICAgIHJldHVybiBpc05hTih2YWwpPyBiYXNlIDogdmFsO1xufVxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRvRml4ZWQoKSB0aGF0IHRyZWF0cyBmbG9hdHMgbW9yZSBsaWtlIGRlY2ltYWxzXG4gKlxuICogRml4ZXMgYmluYXJ5IHJvdW5kaW5nIGlzc3VlcyAoZWcuICgwLjYxNSkudG9GaXhlZCgyKSA9PT0gXCIwLjYxXCIpIHRoYXQgcHJlc2VudFxuICogcHJvYmxlbXMgZm9yIGFjY291bnRpbmctIGFuZCBmaW5hbmNlLXJlbGF0ZWQgc29mdHdhcmUuXG4gKi9cbnZhciB0b0ZpeGVkID0gZnVuY3Rpb24odmFsdWUsIHByZWNpc2lvbikge1xuICAgIHByZWNpc2lvbiA9IGNoZWNrUHJlY2lzaW9uKHByZWNpc2lvbiwgc2V0dGluZ3MubnVtYmVyLnByZWNpc2lvbik7XG4gICAgdmFyIHBvd2VyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbik7XG5cbiAgICAvLyBNdWx0aXBseSB1cCBieSBwcmVjaXNpb24sIHJvdW5kIGFjY3VyYXRlbHksIHRoZW4gZGl2aWRlIGFuZCB1c2UgbmF0aXZlIHRvRml4ZWQoKTpcbiAgICByZXR1cm4gKE1hdGgucm91bmQodW5mb3JtYXQodmFsdWUpICogcG93ZXIpIC8gcG93ZXIpLnRvRml4ZWQocHJlY2lzaW9uKTtcbn07XG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBzdXBwbGllZCBwYXJhbWV0ZXIgaXMgYSBzdHJpbmdcbiAqIGZyb20gdW5kZXJzY29yZS5qc1xuICovXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gISEob2JqID09PSAnJyB8fCAob2JqICYmIG9iai5jaGFyQ29kZUF0ICYmIG9iai5zdWJzdHIpKTtcbn1cblxuLyoqXG4gKiBUZXN0cyB3aGV0aGVyIHN1cHBsaWVkIHBhcmFtZXRlciBpcyBhIHRydWUgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuLyoqXG4gKiBFeHRlbmRzIGFuIG9iamVjdCB3aXRoIGEgZGVmYXVsdHMgb2JqZWN0LCBzaW1pbGFyIHRvIHVuZGVyc2NvcmUncyBfLmRlZmF1bHRzXG4gKlxuICogVXNlZCBmb3IgYWJzdHJhY3RpbmcgcGFyYW1ldGVyIGhhbmRsaW5nIGZyb20gQVBJIG1ldGhvZHNcbiAqL1xuZnVuY3Rpb24gZGVmYXVsdHMob2JqZWN0LCBkZWZzKSB7XG4gICAgdmFyIGtleTtcbiAgICBvYmplY3QgPSBvYmplY3QgfHwge307XG4gICAgZGVmcyA9IGRlZnMgfHwge307XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBub24tcHJvdG90eXBlIHByb3BlcnRpZXM6XG4gICAgZm9yIChrZXkgaW4gZGVmcykge1xuICAgICAgICBpZiAoZGVmcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIHZhbHVlcyB3aXRoIGRlZmF1bHRzIG9ubHkgaWYgdW5kZWZpbmVkIChhbGxvdyBlbXB0eS96ZXJvIHZhbHVlcyk6XG4gICAgICAgICAgICBpZiAob2JqZWN0W2tleV0gPT0gbnVsbCkgb2JqZWN0W2tleV0gPSBkZWZzW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYSBudW1iZXIsIHdpdGggY29tbWEtc2VwYXJhdGVkIHRob3VzYW5kcyBhbmQgY3VzdG9tIHByZWNpc2lvbi9kZWNpbWFsIHBsYWNlc1xuICogQWxpYXM6IGBhY2NvdW50aW5nLmZvcm1hdCgpYFxuICpcbiAqIExvY2FsaXNlIGJ5IG92ZXJyaWRpbmcgdGhlIHByZWNpc2lvbiBhbmQgdGhvdXNhbmQgLyBkZWNpbWFsIHNlcGFyYXRvcnNcbiAqIDJuZCBwYXJhbWV0ZXIgYHByZWNpc2lvbmAgY2FuIGJlIGFuIG9iamVjdCBtYXRjaGluZyBgc2V0dGluZ3MubnVtYmVyYFxuICovXG52YXIgZm9ybWF0TnVtYmVyID0gZnVuY3Rpb24obnVtYmVyLCBwcmVjaXNpb24sIHRob3VzYW5kLCBkZWNpbWFsKSB7XG4gICAgLy8gUmVzdXJzaXZlbHkgZm9ybWF0IGFycmF5czpcbiAgICBpZiAoaXNBcnJheShudW1iZXIpKSB7XG4gICAgICAgIHJldHVybiBtYXAobnVtYmVyLCBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXROdW1iZXIodmFsLCBwcmVjaXNpb24sIHRob3VzYW5kLCBkZWNpbWFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgbnVtYmVyOlxuICAgIG51bWJlciA9IHVuZm9ybWF0KG51bWJlcik7XG5cbiAgICAvLyBCdWlsZCBvcHRpb25zIG9iamVjdCBmcm9tIHNlY29uZCBwYXJhbSAoaWYgb2JqZWN0KSBvciBhbGwgcGFyYW1zLCBleHRlbmRpbmcgZGVmYXVsdHM6XG4gICAgdmFyIG9wdHMgPSBkZWZhdWx0cyhcbiAgICAgICAgICAgIChpc09iamVjdChwcmVjaXNpb24pID8gcHJlY2lzaW9uIDoge1xuICAgICAgICAgICAgICAgIHByZWNpc2lvbiA6IHByZWNpc2lvbixcbiAgICAgICAgICAgICAgICB0aG91c2FuZCA6IHRob3VzYW5kLFxuICAgICAgICAgICAgICAgIGRlY2ltYWwgOiBkZWNpbWFsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHNldHRpbmdzLm51bWJlclxuICAgICAgICApLFxuXG4gICAgICAgIC8vIENsZWFuIHVwIHByZWNpc2lvblxuICAgICAgICB1c2VQcmVjaXNpb24gPSBjaGVja1ByZWNpc2lvbihvcHRzLnByZWNpc2lvbiksXG5cbiAgICAgICAgLy8gRG8gc29tZSBjYWxjOlxuICAgICAgICBuZWdhdGl2ZSA9IG51bWJlciA8IDAgPyBcIi1cIiA6IFwiXCIsXG4gICAgICAgIGJhc2UgPSBwYXJzZUludCh0b0ZpeGVkKE1hdGguYWJzKG51bWJlciB8fCAwKSwgdXNlUHJlY2lzaW9uKSwgMTApICsgXCJcIixcbiAgICAgICAgbW9kID0gYmFzZS5sZW5ndGggPiAzID8gYmFzZS5sZW5ndGggJSAzIDogMDtcblxuICAgIC8vIEZvcm1hdCB0aGUgbnVtYmVyOlxuICAgIHJldHVybiBuZWdhdGl2ZSArIChtb2QgPyBiYXNlLnN1YnN0cigwLCBtb2QpICsgb3B0cy50aG91c2FuZCA6IFwiXCIpICsgYmFzZS5zdWJzdHIobW9kKS5yZXBsYWNlKC8oXFxkezN9KSg/PVxcZCkvZywgXCIkMVwiICsgb3B0cy50aG91c2FuZCkgKyAodXNlUHJlY2lzaW9uID8gb3B0cy5kZWNpbWFsICsgdG9GaXhlZChNYXRoLmFicyhudW1iZXIpLCB1c2VQcmVjaXNpb24pLnNwbGl0KCcuJylbMV0gOiBcIlwiKTtcbn07XG5cbi8qKlxuICogVGFrZXMgYSBzdHJpbmcvYXJyYXkgb2Ygc3RyaW5ncywgcmVtb3ZlcyBhbGwgZm9ybWF0dGluZy9jcnVmdCBhbmQgcmV0dXJucyB0aGUgcmF3IGZsb2F0IHZhbHVlXG4gKiBBbGlhczogYGFjY291bnRpbmcucGFyc2Uoc3RyaW5nKWBcbiAqXG4gKiBEZWNpbWFsIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBmbG9hdHMgKGRlZmF1bHRzIHRvXG4gKiBhY2NvdW50aW5nLnNldHRpbmdzLm51bWJlci5kZWNpbWFsKSwgc28gaWYgdGhlIG51bWJlciB1c2VzIGEgbm9uLXN0YW5kYXJkIGRlY2ltYWxcbiAqIHNlcGFyYXRvciwgcHJvdmlkZSBpdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICpcbiAqIEFsc28gbWF0Y2hlcyBicmFja2V0ZWQgbmVnYXRpdmVzIChlZy4gXCIkICgxLjk5KVwiID0+IC0xLjk5KVxuICpcbiAqIERvZXNuJ3QgdGhyb3cgYW55IGVycm9ycyAoYE5hTmBzIGJlY29tZSAwKSBidXQgdGhpcyBtYXkgY2hhbmdlIGluIGZ1dHVyZVxuICovXG52YXIgdW5mb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSwgZGVjaW1hbCkge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IHVuZm9ybWF0IGFycmF5czpcbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcCh2YWx1ZSwgZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5mb3JtYXQodmFsLCBkZWNpbWFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRmFpbHMgc2lsZW50bHkgKG5lZWQgZGVjZW50IGVycm9ycyk6XG4gICAgdmFsdWUgPSB2YWx1ZSB8fCAwO1xuXG4gICAgLy8gUmV0dXJuIHRoZSB2YWx1ZSBhcy1pcyBpZiBpdCdzIGFscmVhZHkgYSBudW1iZXI6XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHZhbHVlO1xuXG4gICAgLy8gRGVmYXVsdCBkZWNpbWFsIHBvaW50IGNvbWVzIGZyb20gc2V0dGluZ3MsIGJ1dCBjb3VsZCBiZSBzZXQgdG8gZWcuIFwiLFwiIGluIG9wdHM6XG4gICAgZGVjaW1hbCA9IGRlY2ltYWwgfHwgc2V0dGluZ3MubnVtYmVyLmRlY2ltYWw7XG5cbiAgICAgICAgLy8gQnVpbGQgcmVnZXggdG8gc3RyaXAgb3V0IGV2ZXJ5dGhpbmcgZXhjZXB0IGRpZ2l0cywgZGVjaW1hbCBwb2ludCBhbmQgbWludXMgc2lnbjpcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiW14wLTktXCIgKyBkZWNpbWFsICsgXCJdXCIsIFtcImdcIl0pLFxuICAgICAgICB1bmZvcm1hdHRlZCA9IHBhcnNlRmxvYXQoXG4gICAgICAgICAgICAoXCJcIiArIHZhbHVlKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcKCguKilcXCkvLCBcIi0kMVwiKSAvLyByZXBsYWNlIGJyYWNrZXRlZCB2YWx1ZXMgd2l0aCBuZWdhdGl2ZXNcbiAgICAgICAgICAgIC5yZXBsYWNlKHJlZ2V4LCAnJykgICAgICAgICAvLyBzdHJpcCBvdXQgYW55IGNydWZ0XG4gICAgICAgICAgICAucmVwbGFjZShkZWNpbWFsLCAnLicpICAgICAgLy8gbWFrZSBzdXJlIGRlY2ltYWwgcG9pbnQgaXMgc3RhbmRhcmRcbiAgICAgICAgKTtcblxuICAgIC8vIFRoaXMgd2lsbCBmYWlsIHNpbGVudGx5IHdoaWNoIG1heSBjYXVzZSB0cm91YmxlLCBsZXQncyB3YWl0IGFuZCBzZWU6XG4gICAgcmV0dXJuICFpc05hTih1bmZvcm1hdHRlZCkgPyB1bmZvcm1hdHRlZCA6IDA7XG59O1xuXG4vKipcbiAqIFBhcnNlcyBhIGZvcm1hdCBzdHJpbmcgb3Igb2JqZWN0IGFuZCByZXR1cm5zIGZvcm1hdCBvYmogZm9yIHVzZSBpbiByZW5kZXJpbmdcbiAqXG4gKiBgZm9ybWF0YCBpcyBlaXRoZXIgYSBzdHJpbmcgd2l0aCB0aGUgZGVmYXVsdCAocG9zaXRpdmUpIGZvcm1hdCwgb3Igb2JqZWN0XG4gKiBjb250YWluaW5nIGBwb3NgIChyZXF1aXJlZCksIGBuZWdgIGFuZCBgemVyb2AgdmFsdWVzIChvciBhIGZ1bmN0aW9uIHJldHVybmluZ1xuICogZWl0aGVyIGEgc3RyaW5nIG9yIG9iamVjdClcbiAqXG4gKiBFaXRoZXIgc3RyaW5nIG9yIGZvcm1hdC5wb3MgbXVzdCBjb250YWluIFwiJXZcIiAodmFsdWUpIHRvIGJlIHZhbGlkXG4gKi9cbmZ1bmN0aW9uIGNoZWNrQ3VycmVuY3lGb3JtYXQoZm9ybWF0KSB7XG4gICAgdmFyIGRlZmF1bHRzID0gc2V0dGluZ3MuY3VycmVuY3kuZm9ybWF0O1xuXG4gICAgLy8gQWxsb3cgZnVuY3Rpb24gYXMgZm9ybWF0IHBhcmFtZXRlciAoc2hvdWxkIHJldHVybiBzdHJpbmcgb3Igb2JqZWN0KTpcbiAgICBpZiAoIHR5cGVvZiBmb3JtYXQgPT09IFwiZnVuY3Rpb25cIiApIGZvcm1hdCA9IGZvcm1hdCgpO1xuXG4gICAgLy8gRm9ybWF0IGNhbiBiZSBhIHN0cmluZywgaW4gd2hpY2ggY2FzZSBgdmFsdWVgIChcIiV2XCIpIG11c3QgYmUgcHJlc2VudDpcbiAgICBpZiAoIGlzU3RyaW5nKCBmb3JtYXQgKSAmJiBmb3JtYXQubWF0Y2goXCIldlwiKSApIHtcblxuICAgICAgICAvLyBDcmVhdGUgYW5kIHJldHVybiBwb3NpdGl2ZSwgbmVnYXRpdmUgYW5kIHplcm8gZm9ybWF0czpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvcyA6IGZvcm1hdCxcbiAgICAgICAgICAgIG5lZyA6IGZvcm1hdC5yZXBsYWNlKFwiLVwiLCBcIlwiKS5yZXBsYWNlKFwiJXZcIiwgXCItJXZcIiksXG4gICAgICAgICAgICB6ZXJvIDogZm9ybWF0XG4gICAgICAgIH07XG5cbiAgICAvLyBJZiBubyBmb3JtYXQsIG9yIG9iamVjdCBpcyBtaXNzaW5nIHZhbGlkIHBvc2l0aXZlIHZhbHVlLCB1c2UgZGVmYXVsdHM6XG4gICAgfSBlbHNlIGlmICggIWZvcm1hdCB8fCAhZm9ybWF0LnBvcyB8fCAhZm9ybWF0LnBvcy5tYXRjaChcIiV2XCIpICkge1xuXG4gICAgICAgIC8vIElmIGRlZmF1bHRzIGlzIGEgc3RyaW5nLCBjYXN0cyBpdCB0byBhbiBvYmplY3QgZm9yIGZhc3RlciBjaGVja2luZyBuZXh0IHRpbWU6XG4gICAgICAgIHJldHVybiAoICFpc1N0cmluZyggZGVmYXVsdHMgKSApID8gZGVmYXVsdHMgOiBzZXR0aW5ncy5jdXJyZW5jeS5mb3JtYXQgPSB7XG4gICAgICAgICAgICBwb3MgOiBkZWZhdWx0cyxcbiAgICAgICAgICAgIG5lZyA6IGRlZmF1bHRzLnJlcGxhY2UoXCIldlwiLCBcIi0ldlwiKSxcbiAgICAgICAgICAgIHplcm8gOiBkZWZhdWx0c1xuICAgICAgICB9O1xuXG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSwgYXNzdW1lIGZvcm1hdCB3YXMgZmluZTpcbiAgICByZXR1cm4gZm9ybWF0O1xufVxuXG5leHBvcnQgY29uc3Qgd2t3Y3Bvc19wcmljZSA9ICggcHJpY2UsIGN1cnJlbmN5U3ltYm9sID0gJycgKSA9PiB7XG4gICAgcmV0dXJuIGZvcm1hdE1vbmV5KCBwcmljZSwge1xuICAgICAgICBzeW1ib2w6ICAgIGN1cnJlbmN5U3ltYm9sID8gY3VycmVuY3lTeW1ib2wgOiBhcGlmX3NjcmlwdC5jdXJyZW5jeV9mb3JtYXRfc3ltYm9sLFxuICAgICAgICBkZWNpbWFsOiAgIGFwaWZfc2NyaXB0LmN1cnJlbmN5X2Zvcm1hdF9kZWNpbWFsX3NlcCxcbiAgICAgICAgdGhvdXNhbmQ6ICBhcGlmX3NjcmlwdC5jdXJyZW5jeV9mb3JtYXRfdGhvdXNhbmRfc2VwLFxuICAgICAgICBwcmVjaXNpb246IGFwaWZfc2NyaXB0LmN1cnJlbmN5X2Zvcm1hdF9udW1fZGVjaW1hbHMsXG4gICAgICAgIGZvcm1hdDogICAgYXBpZl9zY3JpcHQuY3VycmVuY3lfZm9ybWF0XG4gICAgfSApO1xufVxuXG4iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9