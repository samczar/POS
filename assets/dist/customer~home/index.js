(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["customer~home"],{

/***/ "./src/js/actions/categories/index.js":
/*!********************************************!*\
  !*** ./src/js/actions/categories/index.js ***!
  \********************************************/
/*! exports provided: POS_CATEGORIES, setCategories, getAllCategories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_CATEGORIES", function() { return POS_CATEGORIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCategories", function() { return setCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCategories", function() { return getAllCategories; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../hash */ "./src/js/hash.js");




var POS_CATEGORIES = 'POS_CATEGORIES';
var setCategories = function setCategories(categories) {
  return {
    type: POS_CATEGORIES,
    categories: categories
  };
};
var getAllCategories = function getAllCategories() {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      isCategoryDataExists().then(function (result) {
        if (result.length <= 0) {
          AjAxGetAllCategoryWC().then(function (response) {
            if (response) {
              var categoryObj = {
                list: response,
                isFetching: 1
              };
              dispatch(setCategories(categoryObj));
            }
          });
        } else {
          var catObj = {
            list: result,
            isFetching: 1
          };
          dispatch(setCategories(catObj));
        }
      });
    }

    ;
  };
};

function AjAxGetAllCategoryWC() {
  var postData = {};
  return new Promise(function (resolve, reject) {
    document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].loading_categories_text;
    document.querySelector('#loader').style.display = 'block';
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_GET_ALL_CATEGORIES_ENDPOINT, postData).then(function (json) {
      document.querySelector('#loader').style.display = 'none';

      if (json) {
        _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_categories.bulkPut(json).then(function (rsult) {
          resolve(json);
        });
      }
    });
  });
}

function isCategoryDataExists() {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_categories').toArray().then(function (catData) {
    return catData;
  });
}

/***/ }),

/***/ "./src/js/actions/countries/index.js":
/*!*******************************************!*\
  !*** ./src/js/actions/countries/index.js ***!
  \*******************************************/
/*! exports provided: POS_COUNTRY, setCountries, getAllCountriesWC, getAllStatesWC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_COUNTRY", function() { return POS_COUNTRY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCountries", function() { return setCountries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllCountriesWC", function() { return getAllCountriesWC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllStatesWC", function() { return getAllStatesWC; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../hash */ "./src/js/hash.js");




var POS_COUNTRY = 'POS_COUNTRY';
var setCountries = function setCountries(countries) {
  return {
    type: POS_COUNTRY,
    countries: countries
  };
};
var getAllCountriesWC = function getAllCountriesWC() {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      AjAxGetCountries().then(function (response) {
        if (response) {
          var countyObj = {
            list: response,
            isFetching: 1
          };
          dispatch(setCountries(countyObj));
        }
      });
    }

    ;
  };
};

function AjAxGetCountries() {
  return new Promise(function (resolve, reject) {
    document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].loading_countries_text;
    document.querySelector('#loader').style.display = 'block';
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_GET_COUNTRIES_ENDPOINT, {}).then(function (json) {
      document.querySelector('#loader').style.display = 'none';

      if (json) {
        resolve(json);
      }
    });
  });
}

var getAllStatesWC = function getAllStatesWC(code, countries) {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      return AjAxGetStates(code).then(function (response) {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
    }

    ;
  };
};

function AjAxGetStates(code) {
  var postData = {
    country_code: code
  };
  return new Promise(function (resolve, reject) {
    document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].loading_states_text;
    document.querySelector('#loader').style.display = 'block';
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_GET_STATES_ENDPOINT, postData).then(function (json) {
      document.querySelector('#loader').style.display = 'none';

      if (json) {
        resolve(json.states);
      }
    });
  });
}

/***/ }),

/***/ "./src/js/actions/sale/index.js":
/*!**************************************!*\
  !*** ./src/js/actions/sale/index.js ***!
  \**************************************/
/*! exports provided: POS_SALE, setSale, getSaleHistoryWC, SaveSaleHistoryToDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POS_SALE", function() { return POS_SALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSale", function() { return setSale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSaleHistoryWC", function() { return getSaleHistoryWC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaveSaleHistoryToDB", function() { return SaveSaleHistoryToDB; });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../database */ "./src/js/database.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../translation */ "./src/js/translation.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../hash */ "./src/js/hash.js");




var POS_SALE = 'POS_SALE';
var setSale = function setSale(sale) {
  return {
    type: POS_SALE,
    sale: sale
  };
};
var getSaleHistoryWC = function getSaleHistoryWC() {
  return function (dispatch) {
    var user = apif_script.logged_in;

    if (user != "") {
      loadSaleHistory().then(function (result) {
        if (result.length <= 0) {
          AjAxGetSaleHistory().then(function (response) {
            if (response) {
              var saleObj = {
                list: response,
                isFetching: 1
              };
              dispatch(setSale(saleObj));
            }
          });
        } else {
          var sObj = {
            list: result,
            isFetching: 1
          };
          dispatch(setSale(sObj));
        }
      });
    }

    ;
  };
};

function AjAxGetSaleHistory() {
  return new Promise(function (resolve, reject) {
    document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_1__["translation"].loading_sale_text;
    document.querySelector('#loader').style.display = 'block';
    Object(_hash__WEBPACK_IMPORTED_MODULE_3__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_2__["default"].WK_GET_SALE_HISTORY_ENDPOINT, {}).then(function (json) {
      document.querySelector('#loader').style.display = 'none';

      if (json) {
        _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_sale').bulkPut(json).then(function (response) {
          resolve(json);
        });
      }
    });
  });
}

var SaveSaleHistoryToDB = function SaveSaleHistoryToDB(json) {
  return function (dispatch) {
    if (json) {
      return _database__WEBPACK_IMPORTED_MODULE_0__["default"].pos_sale.bulkPut(json).then(function (rsult) {
        return rsult;
      });
    }
  };
};

function loadSaleHistory() {
  return _database__WEBPACK_IMPORTED_MODULE_0__["default"].table('pos_sale').toArray().then(function (saleData) {
    return saleData;
  });
}

/***/ }),

/***/ "./src/js/components/body/menu/menu.jsx":
/*!**********************************************!*\
  !*** ./src/js/components/body/menu/menu.jsx ***!
  \**********************************************/
/*! exports provided: MENUS_FILTER, RESET_ACTION, ACTION, AUTHENTICATE_CART_RESET_REQUEST, ADD_MENUS_BEFORE_SETTINGS_FILTER, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENUS_FILTER", function() { return MENUS_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_ACTION", function() { return RESET_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION", function() { return ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTHENTICATE_CART_RESET_REQUEST", function() { return AUTHENTICATE_CART_RESET_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_MENUS_BEFORE_SETTINGS_FILTER", function() { return ADD_MENUS_BEFORE_SETTINGS_FILTER; });
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../database */ "./src/js/database.js");
/* harmony import */ var _actions_currency__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../actions/currency */ "./src/js/actions/currency/index.js");
/* harmony import */ var _actions_customers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../actions/customers */ "./src/js/actions/customers/index.js");
/* harmony import */ var _actions_orders__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../actions/orders */ "./src/js/actions/orders/index.js");
/* harmony import */ var _actions_tax__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../actions/tax */ "./src/js/actions/tax/index.js");
/* harmony import */ var _actions_invoice__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../actions/invoice */ "./src/js/actions/invoice/index.js");
/* harmony import */ var _actions_categories__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../actions/categories */ "./src/js/actions/categories/index.js");
/* harmony import */ var _actions_sale__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../actions/sale */ "./src/js/actions/sale/index.js");
/* harmony import */ var _actions_products__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../actions/products */ "./src/js/actions/products/index.js");
/* harmony import */ var _actions_cart__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../actions/cart */ "./src/js/actions/cart/index.js");
/* harmony import */ var _actions_currentcart__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../actions/currentcart */ "./src/js/actions/currentcart/index.js");
/* harmony import */ var _actions_discount__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../actions/discount */ "./src/js/actions/discount/index.js");
/* harmony import */ var _actions_coupon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../actions/coupon */ "./src/js/actions/coupon/index.js");
/* harmony import */ var _actions_hold__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../actions/hold */ "./src/js/actions/hold/index.js");
/* harmony import */ var _actions_countries__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../actions/countries */ "./src/js/actions/countries/index.js");
/* harmony import */ var _actions_authentication__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../actions/authentication */ "./src/js/actions/authentication/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../config */ "./src/js/config/index.js");
/* harmony import */ var _scss_menu_scss__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./scss/menu.scss */ "./src/js/components/body/menu/scss/menu.scss");
/* harmony import */ var _scss_menu_scss__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_scss_menu_scss__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../translation */ "./src/js/translation.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_31__);








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


























var MENUS_FILTER = 'wkwcpos_menus_list';
var RESET_ACTION = 'wkwcpos_reset_action';
var ACTION = 'wkwcpos_example_action';
var AUTHENTICATE_CART_RESET_REQUEST = 'wkwcpos_authenticate_cart_reset_request';
var ADD_MENUS_BEFORE_SETTINGS_FILTER = 'wkwcpos_add_menus_before_settings';

var Menu = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Menu, _Component);

  var _super = _createSuper(Menu);

  function Menu(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Menu);

    Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_30__["doAction"])(ACTION);
    _this = _super.call(this, props); // This binding is necessary to make `this` work in the callback

    _this.handleLiClick = _this.handleLiClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.getMenus = _this.getMenus.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Menu, [{
    key: "handleLiClick",
    value: function handleLiClick(event) {
      var _this2 = this;

      event.preventDefault();
      var dispatch = this.props.dispatch;
      var targetVal = jQuery(event.target).data('target');

      if (targetVal != undefined && targetVal == '#pos-reset') {
        jQuery('#loading-text').text(_translation__WEBPACK_IMPORTED_MODULE_29__["translation"].reloading_text);
        jQuery('#loader').show();
        _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_sale').clear().then(function (result) {
          _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_customers').clear().then(function (result) {
            _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_products').clear().then(function (result) {
              _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_categories').clear().then(function (result) {
                _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_remove_id').clear().then(function (result) {
                  _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_holds').clear().then(function (result) {
                    _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_coupon').clear().then(function (result) {
                      _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_discount').clear().then(function (result) {
                        _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_currency').clear().then(function (result) {
                          _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_cart').clear().then(function (result) {
                            _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_current_cart').clear().then(function (result) {
                              _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_temp').clear().then(function (result) {
                                _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_tax').clear().then(function (result) {
                                  _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_invoice').clear().then(function (result) {
                                    _database__WEBPACK_IMPORTED_MODULE_11__["default"].table('pos_orders').where('order_type').equals('online').delete().then(function (result) {
                                      Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_30__["doAction"])(RESET_ACTION, _database__WEBPACK_IMPORTED_MODULE_11__["default"], _this2.props);

                                      if (_this2.props.page.name == 'Home') {
                                        dispatch(Object(_actions_authentication__WEBPACK_IMPORTED_MODULE_26__["getSessionIDAuthentication"])()).then(function (res) {
                                          dispatch(Object(_actions_currency__WEBPACK_IMPORTED_MODULE_12__["getAllCurrencyWC"])());
                                          dispatch(Object(_actions_sale__WEBPACK_IMPORTED_MODULE_18__["getSaleHistoryWC"])());
                                          dispatch(Object(_actions_currentcart__WEBPACK_IMPORTED_MODULE_21__["getCurrentCart"])());
                                          dispatch(Object(_actions_categories__WEBPACK_IMPORTED_MODULE_17__["getAllCategories"])());
                                          dispatch(Object(_actions_orders__WEBPACK_IMPORTED_MODULE_14__["getAllOrdersWC"])());
                                          dispatch(Object(_actions_customers__WEBPACK_IMPORTED_MODULE_13__["getAllCustomersWC"])());
                                          dispatch(Object(_actions_tax__WEBPACK_IMPORTED_MODULE_15__["taxAccount"])());
                                          dispatch(Object(_actions_products__WEBPACK_IMPORTED_MODULE_19__["getAllProducts"])());
                                          dispatch(Object(_actions_discount__WEBPACK_IMPORTED_MODULE_22__["getAllDiscountWC"])());
                                          dispatch(Object(_actions_countries__WEBPACK_IMPORTED_MODULE_25__["getAllCountriesWC"])());
                                          dispatch(Object(_actions_coupon__WEBPACK_IMPORTED_MODULE_23__["getAllCouponWC"])());
                                          dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_20__["getAllCartProducts"])());
                                          dispatch(Object(_actions_hold__WEBPACK_IMPORTED_MODULE_24__["getAllHoldCartProducts"])());
                                          dispatch(Object(_actions_invoice__WEBPACK_IMPORTED_MODULE_16__["getInvoiceTemplate"])());
                                          jQuery('#loader').hide();
                                        });
                                      } else {
                                        _this2.props.history.push({
                                          pathname: _config__WEBPACK_IMPORTED_MODULE_27__["default"].HOME_URL + '/pos'
                                        });
                                      }
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }
    }
  }, {
    key: "getMenus",
    value: function getMenus() {
      var homeMenuClass = 'wkwcpos-menu-list';
      var customersMenuClass = 'wkwcpos-menu-list';
      var cashierMenuClass = 'wkwcpos-menu-list';
      var ordersMenuClass = 'wkwcpos-menu-list';
      var reportsMenuClass = 'wkwcpos-menu-list';

      if (this.props.page.name != undefined) {
        switch (this.props.page.name) {
          case 'Home':
          case 'Category':
            homeMenuClass += ' pos-active';
            break;

          case 'Customers':
            customersMenuClass += ' pos-active';
            break;

          case 'Cashier':
          case 'Cashier Drawer':
          case 'Cashier Today':
          case 'Cashier Sale':
            cashierMenuClass += ' pos-active';
            break;

          case 'Orders':
          case 'Hold Sale':
          case 'Offline Sale':
          case 'Order History':
            ordersMenuClass += ' pos-active';
            break;

          case 'Reports':
            reportsMenuClass += ' pos-active';
            break;
        }
      }

      var orders = _translation__WEBPACK_IMPORTED_MODULE_29__["translation"].orders;
      var cashier = _translation__WEBPACK_IMPORTED_MODULE_29__["translation"].cashier;
      var home = _translation__WEBPACK_IMPORTED_MODULE_29__["translation"].home;
      var customers = _translation__WEBPACK_IMPORTED_MODULE_29__["translation"].customers;
      var menus = [{
        to: _config__WEBPACK_IMPORTED_MODULE_27__["default"].HOME_URL + '/pos',
        classname: homeMenuClass,
        icon_classname: 'fa fa-home',
        text: home
      }, {
        to: _config__WEBPACK_IMPORTED_MODULE_27__["default"].HOME_URL + '/pos/customers',
        classname: customersMenuClass,
        icon_classname: 'fa fa-address-book',
        text: customers
      }, {
        to: _config__WEBPACK_IMPORTED_MODULE_27__["default"].HOME_URL + '/pos/cashier',
        classname: cashierMenuClass,
        icon_classname: 'fa fa-user',
        text: cashier
      }, {
        to: _config__WEBPACK_IMPORTED_MODULE_27__["default"].HOME_URL + '/pos/orders',
        classname: ordersMenuClass,
        icon_classname: 'fa fa-file',
        text: orders
      }, {
        to: _config__WEBPACK_IMPORTED_MODULE_27__["default"].HOME_URL + '/pos/reports',
        classname: reportsMenuClass,
        icon_classname: 'fa fa-tachometer',
        text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_31__["__"])('Reports', 'wc_pos')
      }];
      return Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_30__["applyFilters"])(MENUS_FILTER, menus, this, _config__WEBPACK_IMPORTED_MODULE_27__["default"]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var user = this.props.user;
      var logout_url = apif_script.logout_url;
      var reset = _translation__WEBPACK_IMPORTED_MODULE_29__["translation"].reset;
      var reset_cart = _translation__WEBPACK_IMPORTED_MODULE_29__["translation"].reset_cart;
      var cashier = _translation__WEBPACK_IMPORTED_MODULE_29__["translation"].cashier;
      var settings = _translation__WEBPACK_IMPORTED_MODULE_29__["translation"].settings;
      var profile_pic = '';

      if (user.profile_pic == '') {
        profile_pic = apif_script.assets + "/images/17241-200.png";
      } else {
        profile_pic = user.profile_pic;
      }

      var settingsMenuClass = 'wkwcpos-menu-list';
      var resetMenuClass = 'wkwcpos-menu-list';
      var logoutMenuClass = 'wkwcpos-menu-list';
      var menusListHTML = this.getMenus().map(function (menu) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("li", {
          key: menu.to
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["Link"], {
          className: menu.classname,
          to: menu.to
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", {
          className: menu.icon_classname
        }), menu.text));
      });

      if (this.props.page.name != undefined) {
        switch (this.props.page.name) {
          case 'Settings':
          case 'Account Settings':
          case 'Other Settings':
            settingsMenuClass += ' pos-active';
            break;
        }
      }

      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("aside", {
        className: "side-navigation"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("nav", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("ul", null, menusListHTML, Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_30__["applyFilters"])(ADD_MENUS_BEFORE_SETTINGS_FILTER, '', this), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["Link"], {
        className: settingsMenuClass,
        to: _config__WEBPACK_IMPORTED_MODULE_27__["default"].HOME_URL + '/pos/settings'
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", {
        className: "fa fa-wrench"
      }), settings)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["Link"], {
        className: resetMenuClass,
        "data-target": "#pos-reset",
        to: _config__WEBPACK_IMPORTED_MODULE_27__["default"].HOME_URL + '/pos',
        onClick: function onClick(e) {
          return _this3.handleLiClick(e);
        }
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", {
        className: "fa fa-undo reset-system",
        "data-target": "#pos-reset"
      }), reset)))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("nav", {
        className: "menu-cashier"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("ul", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("a", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("img", {
        alt: "pos cashier",
        src: profile_pic,
        srcSet: profile_pic,
        className: "avatar avatar-96 photo",
        height: "50",
        width: "50"
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", null, apif_script.logged_in.fname)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("a", {
        className: logoutMenuClass,
        href: logout_url
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", {
        className: "fa fa-sign-out"
      }), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_31__["__"])('Logout', 'wc_pos'))))));
    }
  }]);

  return Menu;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.cashier,
    current_cart: state.current_cart
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({
    dispatch: dispatch
  }, Object(redux__WEBPACK_IMPORTED_MODULE_9__["bindActionCreators"])({
    clearIndexDB: _actions_cart__WEBPACK_IMPORTED_MODULE_20__["clearIndexDB"],
    getAllCurrencyWC: _actions_currency__WEBPACK_IMPORTED_MODULE_12__["getAllCurrencyWC"],
    getAllCountriesWC: _actions_countries__WEBPACK_IMPORTED_MODULE_25__["getAllCountriesWC"],
    getCurrentCart: _actions_currentcart__WEBPACK_IMPORTED_MODULE_21__["getCurrentCart"],
    getAllCategories: _actions_categories__WEBPACK_IMPORTED_MODULE_17__["getAllCategories"],
    getAllCustomersWC: _actions_customers__WEBPACK_IMPORTED_MODULE_13__["getAllCustomersWC"],
    taxAccount: _actions_tax__WEBPACK_IMPORTED_MODULE_15__["taxAccount"],
    getAllProducts: _actions_products__WEBPACK_IMPORTED_MODULE_19__["getAllProducts"],
    getAllOrdersWC: _actions_orders__WEBPACK_IMPORTED_MODULE_14__["getAllOrdersWC"],
    getAllDiscountWC: _actions_discount__WEBPACK_IMPORTED_MODULE_22__["getAllDiscountWC"],
    getAllCouponWC: _actions_coupon__WEBPACK_IMPORTED_MODULE_23__["getAllCouponWC"],
    getSaleHistoryWC: _actions_sale__WEBPACK_IMPORTED_MODULE_18__["getSaleHistoryWC"],
    getAllCartProducts: _actions_cart__WEBPACK_IMPORTED_MODULE_20__["getAllCartProducts"],
    getAllHoldCartProducts: _actions_hold__WEBPACK_IMPORTED_MODULE_24__["getAllHoldCartProducts"]
  }, dispatch));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(Menu));

/***/ }),

/***/ "./src/js/components/body/menu/scss/menu.scss":
/*!****************************************************!*\
  !*** ./src/js/components/body/menu/scss/menu.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/js/components/body/tabs/cart/cart.jsx":
/*!***************************************************!*\
  !*** ./src/js/components/body/tabs/cart/cart.jsx ***!
  \***************************************************/
/*! exports provided: COUNTER_MODIFY_CART_ACTIONS, CART_IS_MODIFICATION_ALLOWED, UPDATE_KEY_VALUE_AND_QUANTITY, UPDATE_VIRTUAL_PRODUCT_DETAILS, AUTHENTICATE_CART_RESET_REQUEST, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COUNTER_MODIFY_CART_ACTIONS", function() { return COUNTER_MODIFY_CART_ACTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CART_IS_MODIFICATION_ALLOWED", function() { return CART_IS_MODIFICATION_ALLOWED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_KEY_VALUE_AND_QUANTITY", function() { return UPDATE_KEY_VALUE_AND_QUANTITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_VIRTUAL_PRODUCT_DETAILS", function() { return UPDATE_VIRTUAL_PRODUCT_DETAILS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTHENTICATE_CART_RESET_REQUEST", function() { return AUTHENTICATE_CART_RESET_REQUEST; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _products_list_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./products/list.jsx */ "./src/js/components/body/tabs/cart/products/list.jsx");
/* harmony import */ var _total_total_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./total/total.jsx */ "./src/js/components/body/tabs/cart/total/total.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _scss_cart_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./scss/cart.scss */ "./src/js/components/body/tabs/cart/scss/cart.scss");
/* harmony import */ var _scss_cart_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_scss_cart_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _actions_cart__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../actions/cart */ "./src/js/actions/cart/index.js");
/* harmony import */ var _translation_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../translation.js */ "./src/js/translation.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../config */ "./src/js/config/index.js");
/* harmony import */ var _actions_discount_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../actions/discount/index.js */ "./src/js/actions/discount/index.js");
/* harmony import */ var _actions_coupon_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../actions/coupon/index.js */ "./src/js/actions/coupon/index.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }














var COUNTER_MODIFY_CART_ACTIONS = 'wkwcpos_modify_cart_actions';
var CART_IS_MODIFICATION_ALLOWED = 'wkwcpos_cart_is_modification_allowed';
var UPDATE_KEY_VALUE_AND_QUANTITY = 'wkwcpos_update_key_value_and_quantity';
var UPDATE_VIRTUAL_PRODUCT_DETAILS = 'wkwcpos_update_virtual_product_details';
var AUTHENTICATE_CART_RESET_REQUEST = 'wkwcpos_authenticate_cart_reset_request';

var Cart = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Cart, _Component);

  var _super = _createSuper(Cart);

  function Cart(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Cart);

    _this = _super.call(this, props);
    _this.handleBarcodeLiClick = _this.handleBarcodeLiClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleCustomClick = _this.handleCustomClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Cart, [{
    key: "handleCustomClick",
    value: function handleCustomClick(event, action) {
      var dispatch = this.props.dispatch;
      var current_cart = this.props.current_cart;
      var tax = this.props.tax.list;

      if (action && action == 'cart') {
        {
          {
            Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__["applyFilters"])(AUTHENTICATE_CART_RESET_REQUEST, true, this.props, _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"]) && dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["clearIndexDB"])(current_cart)).then(function (res) {
              dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["getAllCartProducts"])());
              dispatch(Object(_actions_discount_index_js__WEBPACK_IMPORTED_MODULE_19__["getAllDiscountWC"])());
              dispatch(Object(_actions_coupon_index_js__WEBPACK_IMPORTED_MODULE_20__["getAllCouponWC"])());
            });
          }
        }
      } else {
        jQuery.confirm({
          title: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].add_product_add,
          content: '<div class= custom-product> <div class="form-group"><label>' + _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].add_product_name + '</label><input type="text" id="pro-name"  placeholder="' + _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].add_product_name + '" class="form-control" autofocus ></div><div class="form-group"><label>' + _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].add_product_price + '</label><input type="text" id="pro-price" placeholder="' + _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].add_product_price + '" class="form-control"></div></div>',
          buttons: {
            apply: {
              text: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].add_text,
              btnClass: 'btn-custom-product',
              action: function action() {
                var pro_name = this.$content.find('input#pro-name').val().trim();
                var pro_price = this.$content.find('input#pro-price').val().trim();

                if (pro_name.length < 3) {
                  jQuery.alert({
                    content: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].validate_product_name_len,
                    type: 'red'
                  });
                  return false;
                } else if (pro_price.length == '') {
                  jQuery.alert({
                    content: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].validate_product_price,
                    type: 'red'
                  });
                  return false;
                } else if (isNaN(pro_price.trim()) || parseFloat(pro_price) < 0) {
                  jQuery.alert({
                    content: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].validate_product_price,
                    type: 'red'
                  });
                  return false;
                } else {
                  var product_tax = 0;

                  if (apif_script.logged_in.tax_display_cart == 'excl') {
                    if (apif_script.logged_in.tax_type == 'yes') {
                      var tax_rate = 0;
                      jQuery.each(tax, function (i, val) {
                        if (val.rate) {
                          tax_rate = tax_rate + val.rate;
                        }
                      });
                      var real_price = pro_price * 100 / (100 + tax_rate);
                      product_tax = pro_price - real_price;
                      pro_price = real_price;
                    } else {
                      jQuery.each(tax, function (i, val) {
                        if (val.rate) {
                          product_tax = product_tax + pro_price * val.rate / 100;
                        }
                      });
                    }
                  } else {
                    if (apif_script.logged_in.tax_type != 'yes') {
                      jQuery.each(tax, function (i, val) {
                        if (val.rate) {
                          product_tax = product_tax + pro_price * val.rate / 100;
                        }
                      });
                      pro_price = parseFloat(parseFloat(pro_price) + parseFloat(product_tax));
                      product_tax = 0;
                    }
                  }

                  var virtual_product = {
                    product_name: pro_name,
                    product_price: pro_price,
                    product_tax: product_tax
                  };
                  virtual_product = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__["applyFilters"])(UPDATE_VIRTUAL_PRODUCT_DETAILS, virtual_product, this.props);
                  dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["addToCart"])(current_cart, virtual_product, false));
                }
              }
            },
            cancel: function cancel() {}
          }
        });
      }
    }
  }, {
    key: "handleBarcodeLiClick",
    value: function handleBarcodeLiClick(event) {
      var quantity = 1;
      var dispatch = this.props.dispatch;
      var current_cart = this.props.current_cart;
      var props = this.props;
      jQuery('#bar-code').val('');
      jQuery.confirm({
        title: _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].barcode_enter_text,
        content: '<div> <div class="form-group"><input autofocus type="text" id="bar-code" placeholder="' + _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"].barcode_enter_text + '" class="form-control"></div></div>',
        onContentReady: function onContentReady() {
          var self = this;
          jQuery("#bar-code").on('keyup', function (key) {
            if (key.which == 13) {
              var product = jQuery(this).val();
              var str = product.toString();
              var barcode_data = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__["applyFilters"])(UPDATE_KEY_VALUE_AND_QUANTITY, {
                key: str,
                qty: quantity
              }, props);
              str = barcode_data.key;
              quantity = barcode_data.qty;
              var byBarcode = '';

              if (str.startsWith("sku")) {
                byBarcode = 'sku';
                str = str.substring(3, str.length);
              } else {
                byBarcode = 'id';
                str = str.substring(2, str.length);
              }

              dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["addToCart"])(current_cart, str, byBarcode, [], '', quantity));
              jQuery(this).val('');
            }
          });
        },
        buttons: {
          cancel: function cancel() {}
        }
      });
      setTimeout(function () {
        jQuery('#bar-code').focus();
      }, 500);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var cart_products = '';
      var cart = Array.from(this.props.cart);
      var current_cart = this.props.current_cart;
      var customers = this.props.customers;
      var currency = this.props.currency;
      var custom_var = Array.from(currency.default);
      var currency_symbol = custom_var.map(function (element) {
        return element.symbol;
      });
      var customer_name = 'Select Customer';

      var customer_email = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__["__"])('No customer selected', 'wc_pos');

      var customer_image = 'http://www.gravatar.com/avatar/?d=identicon';
      var default_customer = customers.default.length > 0 ? customers.default[0] : '';

      if (default_customer) {
        customer_name = default_customer.username;
        customer_image = default_customer.avatar_url;
        customer_email = default_customer.email;
      }

      if (cart.length > 0) {
        var cart_products_filtered = cart.filter(function (element) {
          if (element.cart_id == current_cart) {
            if (element.cart.length > 0) {
              return element;
            }
          }
        }).map(function (elm) {
          return elm.cart;
        });

        if (cart_products_filtered.length > 0) {
          cart_products = cart_products_filtered[0].map(function (response, i) {
            return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_products_list_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
              key: i,
              currency_symbol: currency_symbol,
              current_cart: current_cart,
              cartProducts: response
            }, _this2.props));
          });
        }
      }

      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("section", {
        className: "pos-tabContent pos-cart",
        id: "pos-cart"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "cart-details"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "cart-table-head"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(react_router_dom__WEBPACK_IMPORTED_MODULE_16__["Link"], {
        className: "pos-customer-box",
        to: _config__WEBPACK_IMPORTED_MODULE_18__["default"].HOME_URL + '/pos/customers'
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("img", {
        width: "50px",
        src: customer_image,
        alt: customer_name
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "c-meta"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h4", null, customer_name), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h5", null, customer_email))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__["applyFilters"])(CART_IS_MODIFICATION_ALLOWED, false, this.props) ? Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_17__["applyFilters"])(COUNTER_MODIFY_CART_ACTIONS, '', this.props, _translation_js__WEBPACK_IMPORTED_MODULE_15__["translation"]) : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("button", {
        name: "add-product",
        type: "button",
        className: "add-product",
        onClick: this.handleCustomClick
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("i", {
        className: "fa fa-plus"
      }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(react_router_dom__WEBPACK_IMPORTED_MODULE_16__["Link"], {
        className: "wkwcpos-menu-list",
        "data-target": "#pos-cart-reset",
        to: _config__WEBPACK_IMPORTED_MODULE_18__["default"].HOME_URL + '/pos',
        onClick: function onClick(e) {
          return _this2.handleCustomClick(e, 'cart');
        }
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("i", {
        className: "fa fa-trash"
      }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("li", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("button", {
        name: "barcode-scan",
        type: "button",
        className: "barcode-scan",
        onClick: this.handleBarcodeLiClick
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("i", {
        className: "fa fa-barcode"
      })))))), cart_products_filtered != undefined && cart_products_filtered.length > 0 ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "cart-table"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("ul", null, cart_products)) : ''), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_total_total_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], this.props));
    }
  }]);

  return Cart;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    cart: state.cart.list,
    current_cart: state.current_cart,
    tax: state.tax,
    currency: state.currency,
    products: state.products,
    customers: state.customers,
    holdcart: state.hold.list
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStateToProps)(Cart));

/***/ }),

/***/ "./src/js/components/body/tabs/cart/products/list.jsx":
/*!************************************************************!*\
  !*** ./src/js/components/body/tabs/cart/products/list.jsx ***!
  \************************************************************/
/*! exports provided: SHOW_CART_PRODUCT_ACTIONS_FILTER, ADD_CLASS_TO_CART_TABLE, REMOVE_EDIT_FROM_CART_TABLE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_CART_PRODUCT_ACTIONS_FILTER", function() { return SHOW_CART_PRODUCT_ACTIONS_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_CLASS_TO_CART_TABLE", function() { return ADD_CLASS_TO_CART_TABLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_EDIT_FROM_CART_TABLE", function() { return REMOVE_EDIT_FROM_CART_TABLE; });
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
/* harmony import */ var _actions_cart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../actions/cart */ "./src/js/actions/cart/index.js");
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_html_parser__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../translation */ "./src/js/translation.js");
/* harmony import */ var _menu_menu_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../menu/menu.jsx */ "./src/js/components/body/menu/menu.jsx");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _currency_format__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../currency-format */ "./src/js/currency-format.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__);








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }











var SHOW_CART_PRODUCT_ACTIONS_FILTER = 'wkwcpos_show_cart_product_actions';
var ADD_CLASS_TO_CART_TABLE = 'wkwcpos_add_class_to_cart_table';
var REMOVE_EDIT_FROM_CART_TABLE = 'wkwcpos_remove_edit_from_cart_table';

var CartProduct = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(CartProduct, _Component);

  var _super = _createSuper(CartProduct);

  function CartProduct(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CartProduct);

    _this = _super.call(this, props); // This binding is necessary to make `this` work in the callback

    _this.HandleUpdate = _this.HandleUpdate.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.HandleRemove = _this.HandleRemove.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.HandleQuantityUpdate = _this.HandleQuantityUpdate.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.handleCloseQuantityPopup = _this.handleCloseQuantityPopup.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.HandleEditProductPrice = _this.HandleEditProductPrice.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.HandleProductPriceInput = _this.HandleProductPriceInput.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.HandleChangeProductPrice = _this.HandleChangeProductPrice.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.handleButtonClick = _this.handleButtonClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.state = {
      updateQuantityPopup: false,
      editProductPrice: false,
      quantityEntry: ''
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CartProduct, [{
    key: "handleCloseQuantityPopup",
    value: function handleCloseQuantityPopup() {
      this.setState({
        updateQuantityPopup: false
      });
    }
  }, {
    key: "handleButtonClick",
    value: function handleButtonClick(e, product_id, option, modifiedWeight, product_name) {
      var buttonPressed = jQuery(e.target).closest('.numeric-keypad-button').data("key");
      jQuery('.quantity-entry').css('border', 'none');
      var quantityEntry = this.state.quantityEntry.toString();

      if (buttonPressed != '' || buttonPressed != undefined) {
        if (buttonPressed === "ok" && quantityEntry > 0) {
          var dispatch = this.props.dispatch;
          var current_cart = this.props.current_cart;
          quantityEntry = parseInt(quantityEntry);

          if (option == 'false') {
            dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_10__["ModifyCart"])(1, current_cart, product_id, '', '', modifiedWeight, product_name, quantityEntry));
          } else {
            dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_10__["ModifyCart"])(1, current_cart, product_id, option.var_id, '', modifiedWeight, product_name, quantityEntry));
          }

          this.setState({
            updateQuantityPopup: false
          });
        } else if (buttonPressed === "C") {
          quantityEntry = '';
        } else if (buttonPressed === 'b') {
          if (quantityEntry.length > 1) {
            quantityEntry = quantityEntry.slice(0, -1);
          } else {
            quantityEntry = '';
          }
        } else if (!isNaN(buttonPressed)) {
          if (quantityEntry === '0') {
            quantityEntry = buttonPressed.toString();
          } else {
            quantityEntry = quantityEntry + buttonPressed.toString();
          }
        } else {
          jQuery('.quantity-entry').css('border', 'solid 1px red');
        }
      }

      this.setState({
        quantityEntry: quantityEntry
      });
    }
  }, {
    key: "HandleUpdate",
    value: function HandleUpdate(qty, product_id, option, modifiedWeight, product_name) {
      var dispatch = this.props.dispatch;
      var current_cart = this.props.current_cart;

      if (qty && product_id) {
        if (option == 'false') {
          dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_10__["ModifyCart"])(qty, current_cart, product_id, '', '', modifiedWeight, product_name));
        } else {
          dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_10__["ModifyCart"])(qty, current_cart, product_id, option.var_id, '', modifiedWeight, product_name));
        }

        this.setState({
          editProductPrice: false
        });
      }
    }
  }, {
    key: "HandleRemove",
    value: function HandleRemove(remove_id, modifiedWeight, product_name) {
      var dispatch = this.props.dispatch;
      var current_cart = this.props.current_cart;

      if (remove_id) {
        Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__["applyFilters"])(_menu_menu_jsx__WEBPACK_IMPORTED_MODULE_13__["AUTHENTICATE_CART_RESET_REQUEST"], true, this.props, _translation__WEBPACK_IMPORTED_MODULE_12__["translation"]) && dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_10__["RemoveCartProduct"])(current_cart, remove_id, modifiedWeight, product_name));
      }
    }
  }, {
    key: "HandleQuantityUpdate",
    value: function HandleQuantityUpdate(e, cartP) {
      if (e.which == 13) {
        if (e.target.value > 0) {
          this.HandleUpdate(e.target.value, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      } else if (e.which == 27) {
        this.setState({
          editProductPrice: false
        });
      }
    }
  }, {
    key: "HandleEditProductPrice",
    value: function HandleEditProductPrice() {
      this.setState(function (prevState) {
        return {
          editProductPrice: !prevState.editProductPrice
        };
      });
    }
  }, {
    key: "HandleProductPriceInput",
    value: function HandleProductPriceInput(e, product) {
      if (e.which == 13) {
        Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__["applyFilters"])(_menu_menu_jsx__WEBPACK_IMPORTED_MODULE_13__["AUTHENTICATE_CART_RESET_REQUEST"], true, this.props, _translation__WEBPACK_IMPORTED_MODULE_12__["translation"]) && this.HandleChangeProductPrice(product);
      } else if (e.which == 27) {
        this.setState({
          editProductPrice: false
        });
      }
    }
  }, {
    key: "HandleChangeProductPrice",
    value: function HandleChangeProductPrice(product) {
      var product_id = product.product_id;
      var option = product.options;
      var productPrice = product.special;
      var modifiedWeight = product.boughtWeight;
      var product_name = product.name;
      var dispatch = this.props.dispatch;
      var current_cart = this.props.current_cart;
      var editedProductPrice = parseFloat(document.querySelector('.edit-product-price-' + product_id).value);

      if (product_id && !isNaN(editedProductPrice) && editedProductPrice > 0 && editedProductPrice <= productPrice) {
        if (option == 'false') {
          dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_10__["ModifyCart"])(product.quantity, current_cart, product_id, '', editedProductPrice, modifiedWeight, product_name));
        } else {
          dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_10__["ModifyCart"])(product.quantity, current_cart, product_id, option.var_id, editedProductPrice, modifiedWeight, product_name));
        }

        this.setState({
          editProductPrice: false
        });
      } else {
        jQuery.alert('Enter a valid price.');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var cartP = this.props.cartProducts;
      var productPrice = cartP.special;
      var originalPrice = parseFloat(cartP.special * cartP.quantity).toFixed(2);

      if (typeof cartP.total === "string") {
        var priceTotal = parseFloat(cartP.total.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '')).toFixed(2);
      } else {
        var priceTotal = parseFloat(cartP.total).toFixed(2);
      }

      var editProductPrice = this.state.editProductPrice;
      var updateQuantityPopup = this.state.updateQuantityPopup;
      var clear_text = _translation__WEBPACK_IMPORTED_MODULE_12__["translation"].clear;
      var currency_code = this.props.currency_symbol;
      var itemDiscount = parseFloat(cartP.special * cartP.quantity - cartP.uf_total).toFixed(2);
      var bookingProduct = cartP.type == 'webkul_brs';
      var priceHtml = '';

      if (!bookingProduct && itemDiscount > 0) {
        priceHtml = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", null, " ", Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("del", null, " ", Object(_currency_format__WEBPACK_IMPORTED_MODULE_15__["wkwcpos_price"])(originalPrice, currency_code), " "), " ", Object(_currency_format__WEBPACK_IMPORTED_MODULE_15__["wkwcpos_price"])(priceTotal, currency_code), " ");
      } else {
        priceHtml = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", null, Object(_currency_format__WEBPACK_IMPORTED_MODULE_15__["wkwcpos_price"])(priceTotal, currency_code), " ");
      }

      var unit_text = _translation__WEBPACK_IMPORTED_MODULE_12__["translation"].unit_text;
      var updateQuantityPopupContent = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        class: "pos-quantity-popup-overlay",
        onClick: this.handleCloseQuantityPopup
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "pos-quantity-update-popup"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "pos-quantity-popup-header"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("input", {
        type: "number",
        className: "quantity-entry",
        value: this.state.quantityEntry
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-ok",
        className: "numeric-keypad-button key-ok",
        "data-key": "ok",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "OK")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "numeric-keypad-button-conatainer"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "numeric-keypad-button-row"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-one",
        className: "numeric-keypad-button key-one",
        "data-key": "1",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "1"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-two",
        className: "numeric-keypad-button key-two",
        "data-key": "2",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "2"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-three",
        className: "numeric-keypad-button key-three",
        "data-key": "3",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "3")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "numeric-keypad-button-row"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-four",
        className: "numeric-keypad-button key-four",
        "data-key": "4",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "4"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-five",
        className: "numeric-keypad-button key-five",
        "data-key": "5",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "5"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-six",
        className: "numeric-keypad-button key-six",
        "data-key": "6",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "6")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "numeric-keypad-button-row"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-seven",
        className: "numeric-keypad-button key-seven",
        "data-key": "7",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "7"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-eight",
        className: "numeric-keypad-button key-eight",
        "data-key": "8",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "8"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-nine",
        className: "numeric-keypad-button key-nine",
        "data-key": "9",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "9")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "numeric-keypad-button-row"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-back",
        className: "numeric-keypad-button key-back",
        "data-key": "b",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("span", {
        className: "fa fa-arrow-left"
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-decimal",
        className: "numeric-keypad-button key-decimal",
        "data-key": "0",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, "0"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("button", {
        type: "button",
        name: "key-delete",
        className: "numeric-keypad-button key-delete",
        "data-key": "C",
        onClick: function onClick(e) {
          return _this2.handleButtonClick(e, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }, clear_text)))));
      var row = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__["applyFilters"])(ADD_CLASS_TO_CART_TABLE, '', cartP);
      var edit = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("td", null, !bookingProduct && Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__["applyFilters"])(SHOW_CART_PRODUCT_ACTIONS_FILTER, true, this) ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("i", {
        className: "fa fa-minus-circle cursor",
        onClick: function onClick(e) {
          return _this2.HandleUpdate(-1, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }) : '', !bookingProduct ? 'x' : '', cartP.quantity, !bookingProduct ? '' : ' unit(s)', !bookingProduct && Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__["applyFilters"])(SHOW_CART_PRODUCT_ACTIONS_FILTER, true, this) ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("i", {
        className: "fa fa-plus-circle cursor",
        onClick: function onClick(e) {
          return _this2.HandleUpdate(1, cartP.product_id, cartP.options, cartP.boughtWeight, cartP.name);
        }
      }) : '', !bookingProduct && !updateQuantityPopup ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("i", {
        className: "fa fa-pencil cursor",
        onClick: function onClick(e) {
          return _this2.HandleQuantityUpdate();
        }
      }) : '', !bookingProduct && updateQuantityPopup ? updateQuantityPopupContent : '');
      edit = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__["applyFilters"])(REMOVE_EDIT_FROM_CART_TABLE, edit, cartP);
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("li", {
        className: row
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "full-wrapper grid-wrapper"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "half-wrapper",
        onClick: function onClick(e) {
          return _this2.HandleEditProductPrice();
        }
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        width: "10px",
        className: "item-wrap-icon"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("i", {
        className: "fa fa-chevron-right cursor"
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        width: "80%",
        className: "item-wrap"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("h4", null, react_html_parser__WEBPACK_IMPORTED_MODULE_11___default()(cartP.name)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "pos-item-discount"
      }, !bookingProduct && itemDiscount > 0 ? '-' + Object(_currency_format__WEBPACK_IMPORTED_MODULE_15__["wkwcpos_price"])(itemDiscount, currency_code) + ' ' + Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__["__"])('Discount', 'wc_pos') : ''), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "order-product-quantity"
      }, cartP.quantity, " ", unit_text))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "half-wrapper"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "item-wrap"
      }, priceHtml, react_html_parser__WEBPACK_IMPORTED_MODULE_11___default()(cartP.tax_label)), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_14__["applyFilters"])(SHOW_CART_PRODUCT_ACTIONS_FILTER, true, this) ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "item-wrap item-wrap-icon-left"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("i", {
        className: "fa fa-times-circle cursor",
        onClick: function onClick(e) {
          return _this2.HandleRemove(cartP.remove, cartP.boughtWeight, cartP.name);
        }
      })) : '')), !bookingProduct && editProductPrice ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "full-wrapper pos-extra-meta"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("label", {
        for: "quantity"
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__["__"])('Quantity', 'wc_pos')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("input", {
        id: "quantity",
        className: "edit-product-qty-" + cartP.product_id,
        max: productPrice,
        min: "1",
        type: "number",
        autoFocus: true,
        onKeyUp: function onKeyUp(e) {
          return _this2.HandleQuantityUpdate(e, cartP);
        }
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("p", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("label", {
        for: "price"
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__["__"])('Price ', 'wc_pos'), " ", Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("small", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_16__["__"])('(Per Product)', 'wc_pos'))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("input", {
        id: "price",
        className: "edit-product-price-" + cartP.product_id,
        max: productPrice,
        min: "0",
        type: "number",
        onKeyUp: function onKeyUp(e) {
          return _this2.HandleProductPriceInput(e, cartP);
        }
      }))) : '');
    }
  }]);

  return CartProduct;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

function mapDispatchToProps(dispatch) {
  return Object.assign({
    dispatch: dispatch
  }, Object(redux__WEBPACK_IMPORTED_MODULE_9__["bindActionCreators"])({
    ModifyCart: _actions_cart__WEBPACK_IMPORTED_MODULE_10__["ModifyCart"],
    RemoveCartProduct: _actions_cart__WEBPACK_IMPORTED_MODULE_10__["RemoveCartProduct"]
  }, dispatch));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapDispatchToProps)(CartProduct));

/***/ }),

/***/ "./src/js/components/body/tabs/cart/scss/cart.scss":
/*!*********************************************************!*\
  !*** ./src/js/components/body/tabs/cart/scss/cart.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/js/components/body/tabs/cart/total/total.jsx":
/*!**********************************************************!*\
  !*** ./src/js/components/body/tabs/cart/total/total.jsx ***!
  \**********************************************************/
/*! exports provided: MODIFY_CART_EXTRA_ACTION, ADD_ROW_AFTER_DISCOUNT_IN_CART_FILTER, CHANGE_IN_CART_TOTAL_FILTER, SHOW_APPLY_COUPON_FILTER, SHOW_CUSTOM_DISCOUNT_FILTER, SHOW_CART_CHECKOUT_ACTIONS_FILTER, REMOVE_COUPON_ELIGIBLE_FILTER, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODIFY_CART_EXTRA_ACTION", function() { return MODIFY_CART_EXTRA_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ROW_AFTER_DISCOUNT_IN_CART_FILTER", function() { return ADD_ROW_AFTER_DISCOUNT_IN_CART_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_IN_CART_TOTAL_FILTER", function() { return CHANGE_IN_CART_TOTAL_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_APPLY_COUPON_FILTER", function() { return SHOW_APPLY_COUPON_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_CUSTOM_DISCOUNT_FILTER", function() { return SHOW_CUSTOM_DISCOUNT_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_CART_CHECKOUT_ACTIONS_FILTER", function() { return SHOW_CART_CHECKOUT_ACTIONS_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_COUPON_ELIGIBLE_FILTER", function() { return REMOVE_COUPON_ELIGIBLE_FILTER; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_hold__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../actions/hold */ "./src/js/actions/hold/index.js");
/* harmony import */ var _actions_currentcart__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../actions/currentcart */ "./src/js/actions/currentcart/index.js");
/* harmony import */ var _actions_cart__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../actions/cart */ "./src/js/actions/cart/index.js");
/* harmony import */ var _actions_discount__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../actions/discount */ "./src/js/actions/discount/index.js");
/* harmony import */ var _actions_coupon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../actions/coupon */ "./src/js/actions/coupon/index.js");
/* harmony import */ var _actions_orders__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../actions/orders */ "./src/js/actions/orders/index.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../translation */ "./src/js/translation.js");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../database */ "./src/js/database.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../../../../../config */ "./src/js/config/index.js");
/* harmony import */ var _hash__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./../../../../../hash */ "./src/js/hash.js");
/* harmony import */ var _loader_loader_jsx__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../loader/loader.jsx */ "./src/js/components/loader/loader.jsx");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _menu_menu_jsx__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../menu/menu.jsx */ "./src/js/components/body/menu/menu.jsx");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _currency_format__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../../currency-format */ "./src/js/currency-format.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




















var MODIFY_CART_EXTRA_ACTION = 'wkwcpos_modify_cart_extra_action';
var ADD_ROW_AFTER_DISCOUNT_IN_CART_FILTER = 'wkwcpos_add_row_after_discount_in_cart';
var CHANGE_IN_CART_TOTAL_FILTER = 'wkwcpos_change_in_cart_total_filter';
var SHOW_APPLY_COUPON_FILTER = 'wkwcpos_show_apply_coupon_at_cart';
var SHOW_CUSTOM_DISCOUNT_FILTER = 'wkwcpos_show_custom_discount_on_cart';
var SHOW_CART_CHECKOUT_ACTIONS_FILTER = 'wkwcpos_show_cart_checkout_actions_cart';
var REMOVE_COUPON_ELIGIBLE_FILTER = 'wkwcpos_remove_coupon_eligible';

var CartTotal = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(CartTotal, _Component);

  var _super = _createSuper(CartTotal);

  function CartTotal(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, CartTotal);

    _this = _super.call(this, props);
    _this.state = {
      discount: {
        amount: '',
        type: 'percentage'
      }
    };
    _this.handlePayLiClick = _this.handlePayLiClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleHoldClick = _this.handleHoldClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleDiscountClick = _this.handleDiscountClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleDiscountType = _this.handleDiscountType.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleInputValue = _this.handleInputValue.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handlUpdateClick = _this.handlUpdateClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleDiscountClose = _this.handleDiscountClose.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleCouponLiClick = _this.handleCouponLiClick.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleRemoveCoupon = _this.handleRemoveCoupon.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(CartTotal, [{
    key: "handleRemoveCoupon",
    value: function handleRemoveCoupon(e) {
      var couponCode = jQuery(e.target).closest("span").data("remove");
      var dispatch = this.props.dispatch;
      var cart = this.props.cart;
      var cart_list = cart.list;
      var temp_code = cart_list[0] != undefined ? cart_list[0].cart_id : 0;

      if (couponCode) {
        dispatch(Object(_actions_coupon__WEBPACK_IMPORTED_MODULE_16__["RemoveCoupon"])(temp_code, couponCode));
        dispatch(Object(_actions_orders__WEBPACK_IMPORTED_MODULE_17__["getAllOrdersWC"])());
        jQuery.confirm({
          title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].success_text,
          content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].coupon_remove_notification,
          autoClose: 'cancelAction|3000',
          type: 'green',
          escapeKey: 'cancelAction',
          buttons: {
            cancelAction: {
              text: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].cancel_btn_text,
              btnClass: 'btn-green'
            }
          }
        });
      }
    }
  }, {
    key: "handlePayLiClick",
    value: function () {
      var _handlePayLiClick = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var cart, customers, total, dispatch, cart_list, _cart_list, cart_id, result, notValidProductsList, validProductsList, notValidProductNames, notValidProductNamesString;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cart = this.props.cart;
                customers = this.props.customers;
                total = cart.total;
                dispatch = this.props.dispatch;
                cart_list = cart.list.length > 0 ? cart.list[0].cart : [];

                if (!customers.default.length) {
                  _context.next = 26;
                  break;
                }

                if (!(cart_list.length > 0)) {
                  _context.next = 22;
                  break;
                }

                _cart_list = cart.list[0].cart;
                cart_id = cart.list[0].cart_id;

                if (!(apif_script.wk_pos_validate_product_at_pay == 1)) {
                  _context.next = 20;
                  break;
                }

                if (!window.navigator.onLine) {
                  _context.next = 18;
                  break;
                }

                result = dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["validateProductStock"])(_cart_list));
                _context.next = 14;
                return result.then(function (notValidProducts) {
                  return _cart_list.filter(function (cart_data) {
                    return notValidProducts.not_valid_products.includes(cart_data.product_id);
                  });
                });

              case 14:
                notValidProductsList = _context.sent;

                if (notValidProductsList != undefined && notValidProductsList.length > 0) {
                  e.preventDefault();
                  validProductsList = _cart_list.filter(function (cart_data) {
                    return !notValidProductsList.includes(cart_data);
                  });
                  notValidProductNames = [];
                  notValidProductsList.forEach(function (notValidProduct) {
                    notValidProductNames.push(notValidProduct.name);
                  });
                  notValidProductNamesString = notValidProductNames.join(', ');

                  if (notValidProductNames.lenth > 1) {
                    notValidProductNamesString = notValidProductNamesString + _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].are + _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].remove_not_valid_products;
                  } else {
                    notValidProductNamesString = notValidProductNamesString + _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].is + _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].remove_not_valid_products;
                  }

                  jQuery.confirm({
                    title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].warning_text,
                    content: notValidProductNamesString,
                    backgroundDismiss: function backgroundDismiss() {
                      return 'buttonName'; // the button will handle it
                    },
                    buttons: {
                      remove: {
                        btnClass: 'pos-btn-primary',
                        action: function action() {
                          dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["deleteNotValidProductsFromCart"])(validProductsList, cart_id));
                        }
                      },
                      close: {}
                    }
                  });
                }

                _context.next = 20;
                break;

              case 18:
                e.preventDefault();
                jQuery.alert('Cannot process orders with centralized inventory at offline mode');

              case 20:
                _context.next = 24;
                break;

              case 22:
                e.preventDefault();
                jQuery.confirm({
                  title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].warning_text,
                  content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].text_empty_cart,
                  backgroundDismiss: function backgroundDismiss() {
                    return 'buttonName'; // the button will handle it
                  }
                });

              case 24:
                _context.next = 28;
                break;

              case 26:
                e.preventDefault();
                jQuery.confirm({
                  title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].warning_text,
                  content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].empty_default_customer,
                  backgroundDismiss: function backgroundDismiss() {
                    return 'buttonName'; // the button will handle it
                  }
                });

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handlePayLiClick(_x) {
        return _handlePayLiClick.apply(this, arguments);
      }

      return handlePayLiClick;
    }()
  }, {
    key: "handleCouponLiClick",
    value: function handleCouponLiClick() {
      var dispatch = this.props.dispatch;
      var online = navigator.onLine;

      if (!online) {
        jQuery.confirm({
          title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].warning_text,
          content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].coupon_offline_notification,
          type: 'red',
          backgroundDismiss: function backgroundDismiss() {
            return 'buttonName'; // the button will handle it
          }
        });
        return;
      }

      var cart = this.props.cart;
      var cart_list = cart.list;
      var customers = this.props.customers;
      var taxes = this.props.tax;
      var coup_tax = 0;

      if (cart_list) {
        Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])(_menu_menu_jsx__WEBPACK_IMPORTED_MODULE_24__["AUTHENTICATE_CART_RESET_REQUEST"], true, this.props, _translation__WEBPACK_IMPORTED_MODULE_18__["translation"]) && jQuery.confirm({
          title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].coupon_code_enter_text,
          content: '<div> <div className="form-group"><input autofocus type="text" id="input-name" placeholder="' + _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].validated_text + '" className="form-control"></div></div>',
          buttons: {
            apply: {
              text: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].apply_coupon_text,
              btnClass: "add-coupon",
              action: function action() {
                var input = this.$content.find('input#input-name');

                if (!input.val().trim()) {
                  jQuery.alert({
                    content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].coupon_validate_text,
                    type: 'red'
                  });
                  return false;
                } else {
                  var coupon_code = input.val();

                  if (coupon_code) {
                    var postData = {
                      coupon_code: coupon_code,
                      customer: customers.default,
                      cart: cart_list
                    };
                    document.querySelector('#loading-text').innerHTML = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].applying_coupon_text;
                    document.querySelector('#loader').style.display = 'block';
                    Object(_hash__WEBPACK_IMPORTED_MODULE_21__["POSPostRequest"])(_config__WEBPACK_IMPORTED_MODULE_20__["default"].WK_CHECK_COUPON_ENDPOINT, postData).then(function (response) {
                      document.querySelector('#loader').style.display = 'none';

                      if (response.success != undefined) {
                        if (response.coupon) {
                          taxes = Object.values(taxes);
                          taxes.forEach(function (tax) {
                            if (response.coupon['type'] == 'fixed_cart') {
                              coup_tax = response.coupon['price'] - response.coupon['price'] * tax.rate / (tax.rate + 1);
                              coup_tax = response.coupon['price'] * tax.rate / 100;
                            }
                          });
                          response.coupon['coup_tax'] = coup_tax;
                          dispatch(Object(_actions_coupon__WEBPACK_IMPORTED_MODULE_16__["ApplyCoupon"])(response.coupon));
                        }
                      } else if (response.error != undefined || response.msg != undefined) {
                        jQuery.confirm({
                          title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].err_text,
                          content: response.error,
                          autoClose: 'cancelAction|3000',
                          type: 'red',
                          escapeKey: 'cancelAction',
                          buttons: {
                            cancelAction: {
                              text: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].cancel_btn_text,
                              btnClass: 'pos-btn-primary'
                            }
                          }
                        });
                      }
                    });
                  }
                }
              }
            },
            later: function later() {// do nothing.
            }
          }
        });
      } else {
        jQuery.confirm({
          title: "Notice",
          content: "First add the product in cart",
          buttons: {
            Close: {
              btnClass: "btn-global"
            }
          }
        });
      }
    }
  }, {
    key: "handleDiscountClose",
    value: function handleDiscountClose(e) {
      jQuery(e.target).closest(".pos-popover-content").removeClass("popup-visible");
    }
  }, {
    key: "handleHoldClick",
    value: function handleHoldClick(e) {
      e.preventDefault();
      var routeHref = e.target.getAttribute('href');
      var dispatch = this.props.dispatch;
      var history = this.props.history;
      var cart = this.props.cart;
      var current_cart = this.props.current_cart;
      var customers = this.props.customers;
      var cart_list = cart.list;
      var total = cart.total;
      var holdcart = this.props.holdcart.length;
      holdcart += 1;
      cart_list = cart_list.filter(function (obj) {
        return obj.cart_id == current_cart;
      });

      if (total.cart_total > 0 && current_cart == cart_list[0].cart_id) {
        jQuery.confirm({
          title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].order_note_text,
          content: '<div> <div class="form-group"><input autofocus type=text id=input-name placeholder= "' + _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].validated_text + '" className=form-control></div></div>',
          buttons: {
            orderNote: {
              text: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].order_note_text,
              btnClass: 'pos-btn-primary',
              action: function action() {
                var input = this.$content.find('input#input-name');

                if (!input.val().trim()) {
                  jQuery.alert({
                    content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].order_note_empty,
                    type: 'red'
                  });
                  return false;
                } else {
                  var fake_cart = current_cart + 1;
                  dispatch(Object(_actions_hold__WEBPACK_IMPORTED_MODULE_12__["addToHold"])(input.val().trim(), current_cart, cart_list[0].cart));
                  dispatch(Object(_actions_currentcart__WEBPACK_IMPORTED_MODULE_13__["updateCurrentCart"])(holdcart));
                  dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["ModifyHoldCart"])(holdcart));
                  customers.default = [];
                  _database__WEBPACK_IMPORTED_MODULE_19__["default"].table('pos_coupon').clear().then(function (result) {
                    dispatch(Object(_actions_coupon__WEBPACK_IMPORTED_MODULE_16__["getAllCouponWC"])());
                  });
                  history.push(routeHref);
                }
              }
            },
            later: function later() {// do nothing.
            }
          }
        });
      } else {
        jQuery.confirm({
          title: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].warning_text,
          content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].text_empty_cart,
          backgroundDismiss: function backgroundDismiss() {
            return 'buttonName'; // the button will handle it
          }
        });
      }

      return true;
    }
  }, {
    key: "handleDiscountClick",
    value: function handleDiscountClick(e) {
      e.preventDefault();

      if (Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])(SHOW_CUSTOM_DISCOUNT_FILTER, true, this)) {
        jQuery(".pos-popover-content").addClass("popup-visible");
      }
    }
  }, {
    key: "handleInputValue",
    value: function handleInputValue(e) {
      var input = e.target.value;
      var disc = this.state.discount;
      input = input.replace(/[^0-9.]/g, '');
      input = input.replace(/(\..*)\./g, '$1');
      this.setState({
        discount: {
          amount: input,
          type: disc.type
        }
      });
    }
  }, {
    key: "handlUpdateClick",
    value: function handlUpdateClick(action) {
      var dispatch = this.props.dispatch;
      var current_cart = this.props.current_cart;
      var taxes = this.props.tax;
      var disc = this.state.discount;
      var disc_tax = 0;
      var cart_total = this.props.cart.total.cart_subtotal;
      cart_total = parseFloat(cart_total);
      var amt = jQuery("input[name='disc']").val();

      if (action == 'add') {
        var decimal = /^[-+]?[0-9]+\.[0-9]+$/;
        var withoutDecimal = /^[-+]?[0-9]+$/;

        if (amt && amt.match(withoutDecimal) && parseFloat(amt) > 0 || amt.match(decimal) && parseFloat(amt) > 0) {
          taxes = Object.values(taxes);
          taxes.forEach(function (tax) {
            if (disc.type == 'fixed') {
              disc_tax = amt;
              disc_tax = amt * tax.rate / 100;
            }
          });
          this.setState({
            discount: {
              amount: amt,
              type: disc.type,
              tax: disc_tax
            }
          });
          dispatch(Object(_actions_discount__WEBPACK_IMPORTED_MODULE_15__["ModifyDiscount"])(action, {
            amount: amt,
            type: disc.type,
            tax: disc_tax
          }, current_cart));
          dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["getAllCartProducts"])());
          jQuery(".pos-popover-content").removeClass("popup-visible");
        } else {
          jQuery.alert({
            title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_25__["__"])('Error', 'wc_pos'),
            content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].validate_product_price,
            type: 'red'
          });
        }
      } else if (action == 'delete') {
        this.setState({
          discount: {
            amount: '',
            type: disc.type
          }
        });
        jQuery("input[name='disc']").val(0);
        dispatch(Object(_actions_discount__WEBPACK_IMPORTED_MODULE_15__["ModifyDiscount"])(action, '', current_cart));
        dispatch(Object(_actions_cart__WEBPACK_IMPORTED_MODULE_14__["getAllCartProducts"])());
        jQuery(".pos-popover-content").removeClass("popup-visible");
      }
    }
  }, {
    key: "handleDiscountType",
    value: function handleDiscountType(e) {
      var disc = this.state.discount;
      var data_icon = jQuery(e.target).closest("label").data("icon");
      jQuery(".pos-radio-select label").removeClass("default-selected");
      jQuery(e.target).closest("label").addClass("default-selected");
      jQuery(".pos-discount-result").removeClass("icon-left icon-right").addClass("icon-" + data_icon);

      if (data_icon == 'left') {
        this.setState({
          discount: {
            amount: disc.amount,
            type: 'percentage'
          }
        });
      } else if (data_icon == 'right') {
        this.setState({
          discount: {
            amount: disc.amount,
            type: 'fixed'
          }
        });
      } else {
        jQuery.alert({
          content: _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].drawer_validate_text,
          type: 'red'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var currency_position = 'L';
      var cart = this.props.cart;
      var cartContents = cart.list;
      var inlinePriceTotalDiscount = 0;

      if (cartContents.length > 0) {
        if (cartContents.length > 0 && cartContents[0] != undefined && cartContents[0].cart != undefined && cartContents[0].cart.length > 0) {
          cartContents[0].cart.forEach(function (cartProduct) {
            // const taxDiscount = ( cartProduct.quantity * cartProduct.originalTax ) - cartProduct.tax;
            var priceDiscount = cartProduct.quantity * cartProduct.special - cartProduct.quantity * cartProduct.uf; // inlinePriceTotalDiscount += taxDiscount + priceDiscount;

            inlinePriceTotalDiscount += priceDiscount;
          });
        }
      }

      inlinePriceTotalDiscount = parseFloat(inlinePriceTotalDiscount);
      var coupons = Array.from(this.props.coupons);
      var currency = Array.from(this.props.currency);
      var customers = this.props.customers;
      var disc = this.state.discount;
      var total = cart.total;

      var customer_name = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_25__["__"])('Select Customer', 'wc_pos');

      var coupon = coupons.map(function (coup) {
        return coup.coupon;
      });
      var currency_code = currency.map(function (sym) {
        return sym.symbol;
      });
      currency_code = currency_code[0];
      var subtotal = Object(_currency_format__WEBPACK_IMPORTED_MODULE_26__["wkwcpos_price"])(Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])('wkpos_changes_in_cart_total_using_custom_discount', total.cart_subtotal, cartContents), currency_code);
      var taxtotal = Object(_currency_format__WEBPACK_IMPORTED_MODULE_26__["wkwcpos_price"])(total.tax_total, currency_code);
      var totaldiscount = parseFloat(total.total_discount) + inlinePriceTotalDiscount;
      totaldiscount = Object(_currency_format__WEBPACK_IMPORTED_MODULE_26__["wkwcpos_price"])(totaldiscount, currency_code);
      var cart_total = Object(_currency_format__WEBPACK_IMPORTED_MODULE_26__["wkwcpos_price"])(parseFloat(Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])(CHANGE_IN_CART_TOTAL_FILTER, total.cart_total)), currency_code); // cart_total = wkwcpos_price(parseFloat(applyFilters('wkpos_changes_in_cart_total_using_custom_discount', total.cart_subtotal, cartContents)), currency_code);

      var default_customer = customers.default.length > 0 ? customers.default[0] : '';

      if (default_customer) {
        customer_name = default_customer.first_name;
      }

      var coupon_html = '';
      var coupon_row = coupon.map(function (vall, i) {
        var tempArr = [];
        jQuery.each(vall, function (i, val) {
          var vval = val;
          var price_formated = '';

          if (currency_position == 'L') {
            if (vval.type == 'percent') {
              price_formated = vval.price + '%';
            } else {
              price_formated = currency_code + vval.price;
            }
          } else {
            if (vval.type == 'percent') {
              price_formated = vval.price + '%';
            } else {
              price_formated = vval.price + currency_code;
            }
          }

          tempArr.push({
            code: vval.code,
            price: price_formated
          });
        });
        return tempArr;
      });

      if (coupon_row.length > 0) {
        var removeCouponEligible = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])(REMOVE_COUPON_ELIGIBLE_FILTER, true, this);
        coupon_html = coupon_row[0].map(function (coup, index) {
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", {
            className: "coupon-code",
            key: coup.code
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, coup.code, removeCouponEligible ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
            "data-remove": coup.code
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("i", {
            className: "fa fa-remove",
            onClick: _this2.handleRemoveCoupon
          })) : ''), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
            className: "action"
          }, coup.price));
        });
      }

      var coupon_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].coupon_text;
      var discount_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].discount_text;
      var tax_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].tax_text;
      var sub_total_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].sub_total_text;
      var grand_total_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].grand_total_text;
      var apply_coupon_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].apply_coupon_text;
      var hold_cart_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].hold_cart_text;
      var apply_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].apply_text;
      var delete_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].delete_text;
      var discount_title_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].discount_title_text;
      var pay_text = _translation__WEBPACK_IMPORTED_MODULE_18__["translation"].pay_text;

      if (total.cart_subtotal == undefined) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(_loader_loader_jsx__WEBPACK_IMPORTED_MODULE_22__["default"], null);
      }

      var cartExtra = Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])(MODIFY_CART_EXTRA_ACTION, [{
        id: 'cart-hold',
        link: 'orders/tab/hold',
        icon: 'fa fa-pause',
        text: hold_cart_text,
        event: this.handleHoldClick
      }, {
        id: 'pay-to-pos',
        link: 'pay',
        icon: 'fa-credit-card-alt',
        text: pay_text,
        event: this.handlePayLiClick
      }], cart);
      var cart_extra_section = cartExtra.map(function (value, index) {
        if (value.event) {
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["Link"], {
            key: index,
            id: value.id,
            onClick: function onClick(e) {
              return value.event(e);
            },
            to: _config__WEBPACK_IMPORTED_MODULE_20__["default"].HOME_URL + '/pos/' + value.link
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
            className: "fa " + value.icon
          }), value.text);
        } else {
          return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["Link"], {
            key: index,
            id: value.id,
            to: _config__WEBPACK_IMPORTED_MODULE_20__["default"].HOME_URL + '/pos/' + value.link
          }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
            className: "fa " + value.icon
          }), value.text);
        }
      });
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "grd-section"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-cart-bottom-section"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-popover-content"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("h1", {
        className: "pos-pop-header"
      }, discount_title_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", {
        className: "fa fa-close discount-closer",
        onClick: this.handleDiscountClose
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("hr", {
        className: "pos-hr"
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-radio-select"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("label", {
        className: "default-selected",
        "data-icon": "left",
        onClick: this.handleDiscountType
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("input", {
        name: "765",
        defaultValue: "true",
        type: "radio"
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", null, "%")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("label", {
        "data-icon": "right",
        onClick: this.handleDiscountType
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("input", {
        name: "765",
        defaultValue: "false",
        type: "radio"
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", null, currency_code))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-discount-result icon-left"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "disc-result-wrap"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("input", {
        name: "disc",
        defaultValue: disc.amount,
        onInput: this.handleInputValue,
        type: "number",
        min: "0",
        step: "0.01",
        autoFocus: true
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-sale-discount"
      }, currency_code), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-sale-percentage"
      }, "%")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "button-wrap"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("button", {
        name: "apply-discount",
        role: "button",
        className: "primary",
        type: "button",
        id: "apply-discount",
        onClick: function onClick(e) {
          return _this2.handlUpdateClick('add');
        }
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("i", {
        className: "fa fa-plus-circle"
      }), "\xA0", apply_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("button", {
        name: "remove-discount",
        role: "button",
        type: "button",
        className: "secondary",
        id: "remove-discount",
        onClick: function onClick(e) {
          return _this2.handlUpdateClick('delete');
        }
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("i", {
        className: "fa fa-trash"
      }), "\xA0", delete_text))))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])(SHOW_APPLY_COUPON_FILTER, true, this) ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "apply-coupon"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("button", {
        name: "add-coupon",
        type: "button",
        className: "add-coupon dashed",
        onClick: this.handleCouponLiClick
      }, apply_coupon_text)) : '', Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("table", {
        className: "pos-total"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tbody", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, sub_total_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
        id: "pos-sub-total"
      }, subtotal)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", {
        id: "pos-tax-total"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, tax_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, taxtotal)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("a", {
        href: "#",
        className: "apply-discount",
        onClick: this.handleDiscountClick
      }, discount_text)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
        id: "pos-discount"
      }, "-", Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("span", null, totaldiscount))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])(ADD_ROW_AFTER_DISCOUNT_IN_CART_FILTER, '', this.props), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", {
        className: "coupon-code-head"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
        colSpan: "2"
      }, coupon_text)), coupon_html ? coupon_html : Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", null), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("tr", {
        id: "grand-total"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", null, grand_total_text), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("td", {
        id: "postotal"
      }, cart_total)))), Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_23__["applyFilters"])(SHOW_CART_CHECKOUT_ACTIONS_FILTER, true, this) ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__["createElement"])("div", {
        className: "pos-cart-checkout"
      }, cart_extra_section) : '');
    }
  }]);

  return CartTotal;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    discount: state.discount.list,
    tax: state.tax.list,
    cart: state.cart,
    currency: state.currency.default,
    current_cart: state.current_cart,
    customers: state.customers,
    coupons: state.coupon.list
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({
    dispatch: dispatch
  }, Object(redux__WEBPACK_IMPORTED_MODULE_9__["bindActionCreators"])({
    addToHold: _actions_hold__WEBPACK_IMPORTED_MODULE_12__["addToHold"],
    updateCurrentCart: _actions_currentcart__WEBPACK_IMPORTED_MODULE_13__["updateCurrentCart"],
    getAllCouponWC: _actions_coupon__WEBPACK_IMPORTED_MODULE_16__["getAllCouponWC"],
    getAllCartProducts: _actions_cart__WEBPACK_IMPORTED_MODULE_14__["getAllCartProducts"],
    ModifyHoldCart: _actions_cart__WEBPACK_IMPORTED_MODULE_14__["ModifyHoldCart"],
    getAllOrdersWC: _actions_orders__WEBPACK_IMPORTED_MODULE_17__["getAllOrdersWC"],
    ModifyDiscount: _actions_discount__WEBPACK_IMPORTED_MODULE_15__["ModifyDiscount"],
    ApplyCoupon: _actions_coupon__WEBPACK_IMPORTED_MODULE_16__["ApplyCoupon"],
    RemoveCoupon: _actions_coupon__WEBPACK_IMPORTED_MODULE_16__["RemoveCoupon"]
  }, dispatch));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_11__["connect"])(mapStateToProps, mapDispatchToProps)(CartTotal));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvYWN0aW9ucy9jYXRlZ29yaWVzL2luZGV4LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL3NyYy9qcy9hY3Rpb25zL2NvdW50cmllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvYWN0aW9ucy9zYWxlL2luZGV4LmpzIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL3NyYy9qcy9jb21wb25lbnRzL2JvZHkvbWVudS9tZW51LmpzeCIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvY29tcG9uZW50cy9ib2R5L21lbnUvc2Nzcy9tZW51LnNjc3M/MGJhMCIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvY29tcG9uZW50cy9ib2R5L3RhYnMvY2FydC9jYXJ0LmpzeCIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvY29tcG9uZW50cy9ib2R5L3RhYnMvY2FydC9wcm9kdWN0cy9saXN0LmpzeCIsIndlYnBhY2s6Ly93Yy5bbW9kdWxlbmFtZV0vLi9zcmMvanMvY29tcG9uZW50cy9ib2R5L3RhYnMvY2FydC9zY3NzL2NhcnQuc2Nzcz8wNDBhIiwid2VicGFjazovL3djLlttb2R1bGVuYW1lXS8uL3NyYy9qcy9jb21wb25lbnRzL2JvZHkvdGFicy9jYXJ0L3RvdGFsL3RvdGFsLmpzeCJdLCJuYW1lcyI6WyJQT1NfQ0FURUdPUklFUyIsInNldENhdGVnb3JpZXMiLCJjYXRlZ29yaWVzIiwidHlwZSIsImdldEFsbENhdGVnb3JpZXMiLCJkaXNwYXRjaCIsInVzZXIiLCJhcGlmX3NjcmlwdCIsImxvZ2dlZF9pbiIsImlzQ2F0ZWdvcnlEYXRhRXhpc3RzIiwidGhlbiIsInJlc3VsdCIsImxlbmd0aCIsIkFqQXhHZXRBbGxDYXRlZ29yeVdDIiwicmVzcG9uc2UiLCJjYXRlZ29yeU9iaiIsImxpc3QiLCJpc0ZldGNoaW5nIiwiY2F0T2JqIiwicG9zdERhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVySFRNTCIsInRyYW5zbGF0aW9uIiwibG9hZGluZ19jYXRlZ29yaWVzX3RleHQiLCJzdHlsZSIsImRpc3BsYXkiLCJQT1NQb3N0UmVxdWVzdCIsIndrd2Nwb3NfdmFyaWFibGUiLCJXS19HRVRfQUxMX0NBVEVHT1JJRVNfRU5EUE9JTlQiLCJqc29uIiwiZGF0YWJhc2UiLCJwb3NfY2F0ZWdvcmllcyIsImJ1bGtQdXQiLCJyc3VsdCIsInRhYmxlIiwidG9BcnJheSIsImNhdERhdGEiLCJQT1NfQ09VTlRSWSIsInNldENvdW50cmllcyIsImNvdW50cmllcyIsImdldEFsbENvdW50cmllc1dDIiwiQWpBeEdldENvdW50cmllcyIsImNvdW50eU9iaiIsImxvYWRpbmdfY291bnRyaWVzX3RleHQiLCJXS19HRVRfQ09VTlRSSUVTX0VORFBPSU5UIiwiZ2V0QWxsU3RhdGVzV0MiLCJjb2RlIiwiQWpBeEdldFN0YXRlcyIsImNvdW50cnlfY29kZSIsImxvYWRpbmdfc3RhdGVzX3RleHQiLCJXS19HRVRfU1RBVEVTX0VORFBPSU5UIiwic3RhdGVzIiwiUE9TX1NBTEUiLCJzZXRTYWxlIiwic2FsZSIsImdldFNhbGVIaXN0b3J5V0MiLCJsb2FkU2FsZUhpc3RvcnkiLCJBakF4R2V0U2FsZUhpc3RvcnkiLCJzYWxlT2JqIiwic09iaiIsImxvYWRpbmdfc2FsZV90ZXh0IiwiV0tfR0VUX1NBTEVfSElTVE9SWV9FTkRQT0lOVCIsIlNhdmVTYWxlSGlzdG9yeVRvREIiLCJwb3Nfc2FsZSIsInNhbGVEYXRhIiwiTUVOVVNfRklMVEVSIiwiUkVTRVRfQUNUSU9OIiwiQUNUSU9OIiwiQVVUSEVOVElDQVRFX0NBUlRfUkVTRVRfUkVRVUVTVCIsIkFERF9NRU5VU19CRUZPUkVfU0VUVElOR1NfRklMVEVSIiwiTWVudSIsInByb3BzIiwiZG9BY3Rpb24iLCJoYW5kbGVMaUNsaWNrIiwiYmluZCIsImdldE1lbnVzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldFZhbCIsImpRdWVyeSIsInRhcmdldCIsImRhdGEiLCJ1bmRlZmluZWQiLCJ0ZXh0IiwicmVsb2FkaW5nX3RleHQiLCJzaG93IiwiY2xlYXIiLCJ3aGVyZSIsImVxdWFscyIsImRlbGV0ZSIsInBhZ2UiLCJuYW1lIiwiZ2V0U2Vzc2lvbklEQXV0aGVudGljYXRpb24iLCJyZXMiLCJnZXRBbGxDdXJyZW5jeVdDIiwiZ2V0Q3VycmVudENhcnQiLCJnZXRBbGxPcmRlcnNXQyIsImdldEFsbEN1c3RvbWVyc1dDIiwidGF4QWNjb3VudCIsImdldEFsbFByb2R1Y3RzIiwiZ2V0QWxsRGlzY291bnRXQyIsImdldEFsbENvdXBvbldDIiwiZ2V0QWxsQ2FydFByb2R1Y3RzIiwiZ2V0QWxsSG9sZENhcnRQcm9kdWN0cyIsImdldEludm9pY2VUZW1wbGF0ZSIsImhpZGUiLCJoaXN0b3J5IiwicHVzaCIsInBhdGhuYW1lIiwiSE9NRV9VUkwiLCJob21lTWVudUNsYXNzIiwiY3VzdG9tZXJzTWVudUNsYXNzIiwiY2FzaGllck1lbnVDbGFzcyIsIm9yZGVyc01lbnVDbGFzcyIsInJlcG9ydHNNZW51Q2xhc3MiLCJvcmRlcnMiLCJjYXNoaWVyIiwiaG9tZSIsImN1c3RvbWVycyIsIm1lbnVzIiwidG8iLCJjbGFzc25hbWUiLCJpY29uX2NsYXNzbmFtZSIsIl9fIiwiYXBwbHlGaWx0ZXJzIiwibG9nb3V0X3VybCIsInJlc2V0IiwicmVzZXRfY2FydCIsInNldHRpbmdzIiwicHJvZmlsZV9waWMiLCJhc3NldHMiLCJzZXR0aW5nc01lbnVDbGFzcyIsInJlc2V0TWVudUNsYXNzIiwibG9nb3V0TWVudUNsYXNzIiwibWVudXNMaXN0SFRNTCIsIm1hcCIsIm1lbnUiLCJlIiwiZm5hbWUiLCJDb21wb25lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImN1cnJlbnRfY2FydCIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIk9iamVjdCIsImFzc2lnbiIsImJpbmRBY3Rpb25DcmVhdG9ycyIsImNsZWFySW5kZXhEQiIsImNvbm5lY3QiLCJDT1VOVEVSX01PRElGWV9DQVJUX0FDVElPTlMiLCJDQVJUX0lTX01PRElGSUNBVElPTl9BTExPV0VEIiwiVVBEQVRFX0tFWV9WQUxVRV9BTkRfUVVBTlRJVFkiLCJVUERBVEVfVklSVFVBTF9QUk9EVUNUX0RFVEFJTFMiLCJDYXJ0IiwiaGFuZGxlQmFyY29kZUxpQ2xpY2siLCJoYW5kbGVDdXN0b21DbGljayIsImFjdGlvbiIsInRheCIsImNvbmZpcm0iLCJ0aXRsZSIsImFkZF9wcm9kdWN0X2FkZCIsImNvbnRlbnQiLCJhZGRfcHJvZHVjdF9uYW1lIiwiYWRkX3Byb2R1Y3RfcHJpY2UiLCJidXR0b25zIiwiYXBwbHkiLCJhZGRfdGV4dCIsImJ0bkNsYXNzIiwicHJvX25hbWUiLCIkY29udGVudCIsImZpbmQiLCJ2YWwiLCJ0cmltIiwicHJvX3ByaWNlIiwiYWxlcnQiLCJ2YWxpZGF0ZV9wcm9kdWN0X25hbWVfbGVuIiwidmFsaWRhdGVfcHJvZHVjdF9wcmljZSIsImlzTmFOIiwicGFyc2VGbG9hdCIsInByb2R1Y3RfdGF4IiwidGF4X2Rpc3BsYXlfY2FydCIsInRheF90eXBlIiwidGF4X3JhdGUiLCJlYWNoIiwiaSIsInJhdGUiLCJyZWFsX3ByaWNlIiwidmlydHVhbF9wcm9kdWN0IiwicHJvZHVjdF9uYW1lIiwicHJvZHVjdF9wcmljZSIsImFkZFRvQ2FydCIsImNhbmNlbCIsInF1YW50aXR5IiwiYmFyY29kZV9lbnRlcl90ZXh0Iiwib25Db250ZW50UmVhZHkiLCJzZWxmIiwib24iLCJrZXkiLCJ3aGljaCIsInByb2R1Y3QiLCJzdHIiLCJ0b1N0cmluZyIsImJhcmNvZGVfZGF0YSIsInF0eSIsImJ5QmFyY29kZSIsInN0YXJ0c1dpdGgiLCJzdWJzdHJpbmciLCJzZXRUaW1lb3V0IiwiZm9jdXMiLCJjYXJ0X3Byb2R1Y3RzIiwiY2FydCIsIkFycmF5IiwiZnJvbSIsImN1cnJlbmN5IiwiY3VzdG9tX3ZhciIsImRlZmF1bHQiLCJjdXJyZW5jeV9zeW1ib2wiLCJlbGVtZW50Iiwic3ltYm9sIiwiY3VzdG9tZXJfbmFtZSIsImN1c3RvbWVyX2VtYWlsIiwiY3VzdG9tZXJfaW1hZ2UiLCJkZWZhdWx0X2N1c3RvbWVyIiwidXNlcm5hbWUiLCJhdmF0YXJfdXJsIiwiZW1haWwiLCJjYXJ0X3Byb2R1Y3RzX2ZpbHRlcmVkIiwiZmlsdGVyIiwiY2FydF9pZCIsImVsbSIsInByb2R1Y3RzIiwiaG9sZGNhcnQiLCJob2xkIiwiU0hPV19DQVJUX1BST0RVQ1RfQUNUSU9OU19GSUxURVIiLCJBRERfQ0xBU1NfVE9fQ0FSVF9UQUJMRSIsIlJFTU9WRV9FRElUX0ZST01fQ0FSVF9UQUJMRSIsIkNhcnRQcm9kdWN0IiwiSGFuZGxlVXBkYXRlIiwiSGFuZGxlUmVtb3ZlIiwiSGFuZGxlUXVhbnRpdHlVcGRhdGUiLCJoYW5kbGVDbG9zZVF1YW50aXR5UG9wdXAiLCJIYW5kbGVFZGl0UHJvZHVjdFByaWNlIiwiSGFuZGxlUHJvZHVjdFByaWNlSW5wdXQiLCJIYW5kbGVDaGFuZ2VQcm9kdWN0UHJpY2UiLCJoYW5kbGVCdXR0b25DbGljayIsInVwZGF0ZVF1YW50aXR5UG9wdXAiLCJlZGl0UHJvZHVjdFByaWNlIiwicXVhbnRpdHlFbnRyeSIsInNldFN0YXRlIiwicHJvZHVjdF9pZCIsIm9wdGlvbiIsIm1vZGlmaWVkV2VpZ2h0IiwiYnV0dG9uUHJlc3NlZCIsImNsb3Nlc3QiLCJjc3MiLCJwYXJzZUludCIsIk1vZGlmeUNhcnQiLCJ2YXJfaWQiLCJzbGljZSIsInJlbW92ZV9pZCIsIlJlbW92ZUNhcnRQcm9kdWN0IiwiY2FydFAiLCJ2YWx1ZSIsIm9wdGlvbnMiLCJib3VnaHRXZWlnaHQiLCJwcmV2U3RhdGUiLCJwcm9kdWN0UHJpY2UiLCJzcGVjaWFsIiwiZWRpdGVkUHJvZHVjdFByaWNlIiwiY2FydFByb2R1Y3RzIiwib3JpZ2luYWxQcmljZSIsInRvRml4ZWQiLCJ0b3RhbCIsInByaWNlVG90YWwiLCJyZXBsYWNlIiwiY2xlYXJfdGV4dCIsImN1cnJlbmN5X2NvZGUiLCJpdGVtRGlzY291bnQiLCJ1Zl90b3RhbCIsImJvb2tpbmdQcm9kdWN0IiwicHJpY2VIdG1sIiwid2t3Y3Bvc19wcmljZSIsInVuaXRfdGV4dCIsInVwZGF0ZVF1YW50aXR5UG9wdXBDb250ZW50Iiwicm93IiwiZWRpdCIsIlJlYWN0SHRtbFBhcnNlciIsInRheF9sYWJlbCIsInJlbW92ZSIsIk1PRElGWV9DQVJUX0VYVFJBX0FDVElPTiIsIkFERF9ST1dfQUZURVJfRElTQ09VTlRfSU5fQ0FSVF9GSUxURVIiLCJDSEFOR0VfSU5fQ0FSVF9UT1RBTF9GSUxURVIiLCJTSE9XX0FQUExZX0NPVVBPTl9GSUxURVIiLCJTSE9XX0NVU1RPTV9ESVNDT1VOVF9GSUxURVIiLCJTSE9XX0NBUlRfQ0hFQ0tPVVRfQUNUSU9OU19GSUxURVIiLCJSRU1PVkVfQ09VUE9OX0VMSUdJQkxFX0ZJTFRFUiIsIkNhcnRUb3RhbCIsImRpc2NvdW50IiwiYW1vdW50IiwiaGFuZGxlUGF5TGlDbGljayIsImhhbmRsZUhvbGRDbGljayIsImhhbmRsZURpc2NvdW50Q2xpY2siLCJoYW5kbGVEaXNjb3VudFR5cGUiLCJoYW5kbGVJbnB1dFZhbHVlIiwiaGFuZGxVcGRhdGVDbGljayIsImhhbmRsZURpc2NvdW50Q2xvc2UiLCJoYW5kbGVDb3Vwb25MaUNsaWNrIiwiaGFuZGxlUmVtb3ZlQ291cG9uIiwiY291cG9uQ29kZSIsImNhcnRfbGlzdCIsInRlbXBfY29kZSIsIlJlbW92ZUNvdXBvbiIsInN1Y2Nlc3NfdGV4dCIsImNvdXBvbl9yZW1vdmVfbm90aWZpY2F0aW9uIiwiYXV0b0Nsb3NlIiwiZXNjYXBlS2V5IiwiY2FuY2VsQWN0aW9uIiwiY2FuY2VsX2J0bl90ZXh0Iiwid2tfcG9zX3ZhbGlkYXRlX3Byb2R1Y3RfYXRfcGF5Iiwid2luZG93IiwibmF2aWdhdG9yIiwib25MaW5lIiwidmFsaWRhdGVQcm9kdWN0U3RvY2siLCJub3RWYWxpZFByb2R1Y3RzIiwiY2FydF9kYXRhIiwibm90X3ZhbGlkX3Byb2R1Y3RzIiwiaW5jbHVkZXMiLCJub3RWYWxpZFByb2R1Y3RzTGlzdCIsInZhbGlkUHJvZHVjdHNMaXN0Iiwibm90VmFsaWRQcm9kdWN0TmFtZXMiLCJmb3JFYWNoIiwibm90VmFsaWRQcm9kdWN0Iiwibm90VmFsaWRQcm9kdWN0TmFtZXNTdHJpbmciLCJqb2luIiwibGVudGgiLCJhcmUiLCJyZW1vdmVfbm90X3ZhbGlkX3Byb2R1Y3RzIiwiaXMiLCJ3YXJuaW5nX3RleHQiLCJiYWNrZ3JvdW5kRGlzbWlzcyIsImRlbGV0ZU5vdFZhbGlkUHJvZHVjdHNGcm9tQ2FydCIsImNsb3NlIiwidGV4dF9lbXB0eV9jYXJ0IiwiZW1wdHlfZGVmYXVsdF9jdXN0b21lciIsIm9ubGluZSIsImNvdXBvbl9vZmZsaW5lX25vdGlmaWNhdGlvbiIsInRheGVzIiwiY291cF90YXgiLCJjb3Vwb25fY29kZV9lbnRlcl90ZXh0IiwidmFsaWRhdGVkX3RleHQiLCJhcHBseV9jb3Vwb25fdGV4dCIsImlucHV0IiwiY291cG9uX3ZhbGlkYXRlX3RleHQiLCJjb3Vwb25fY29kZSIsImN1c3RvbWVyIiwiYXBwbHlpbmdfY291cG9uX3RleHQiLCJXS19DSEVDS19DT1VQT05fRU5EUE9JTlQiLCJzdWNjZXNzIiwiY291cG9uIiwidmFsdWVzIiwiQXBwbHlDb3Vwb24iLCJlcnJvciIsIm1zZyIsImVycl90ZXh0IiwibGF0ZXIiLCJDbG9zZSIsInJlbW92ZUNsYXNzIiwicm91dGVIcmVmIiwiZ2V0QXR0cmlidXRlIiwib2JqIiwiY2FydF90b3RhbCIsIm9yZGVyX25vdGVfdGV4dCIsIm9yZGVyTm90ZSIsIm9yZGVyX25vdGVfZW1wdHkiLCJmYWtlX2NhcnQiLCJhZGRUb0hvbGQiLCJ1cGRhdGVDdXJyZW50Q2FydCIsIk1vZGlmeUhvbGRDYXJ0IiwiYWRkQ2xhc3MiLCJkaXNjIiwiZGlzY190YXgiLCJjYXJ0X3N1YnRvdGFsIiwiYW10IiwiZGVjaW1hbCIsIndpdGhvdXREZWNpbWFsIiwibWF0Y2giLCJNb2RpZnlEaXNjb3VudCIsImRhdGFfaWNvbiIsImRyYXdlcl92YWxpZGF0ZV90ZXh0IiwiY3VycmVuY3lfcG9zaXRpb24iLCJjYXJ0Q29udGVudHMiLCJpbmxpbmVQcmljZVRvdGFsRGlzY291bnQiLCJjYXJ0UHJvZHVjdCIsInByaWNlRGlzY291bnQiLCJ1ZiIsImNvdXBvbnMiLCJjb3VwIiwic3ltIiwic3VidG90YWwiLCJ0YXh0b3RhbCIsInRheF90b3RhbCIsInRvdGFsZGlzY291bnQiLCJ0b3RhbF9kaXNjb3VudCIsImZpcnN0X25hbWUiLCJjb3Vwb25faHRtbCIsImNvdXBvbl9yb3ciLCJ2YWxsIiwidGVtcEFyciIsInZ2YWwiLCJwcmljZV9mb3JtYXRlZCIsInByaWNlIiwicmVtb3ZlQ291cG9uRWxpZ2libGUiLCJpbmRleCIsImNvdXBvbl90ZXh0IiwiZGlzY291bnRfdGV4dCIsInRheF90ZXh0Iiwic3ViX3RvdGFsX3RleHQiLCJncmFuZF90b3RhbF90ZXh0IiwiaG9sZF9jYXJ0X3RleHQiLCJhcHBseV90ZXh0IiwiZGVsZXRlX3RleHQiLCJkaXNjb3VudF90aXRsZV90ZXh0IiwicGF5X3RleHQiLCJjYXJ0RXh0cmEiLCJpZCIsImxpbmsiLCJpY29uIiwiY2FydF9leHRyYV9zZWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sSUFBTUEsY0FBYyxHQUFHLGdCQUF2QjtBQUVBLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBRUMsVUFBRixFQUFrQjtBQUU3QyxTQUFPO0FBQ0xDLFFBQUksRUFBRUgsY0FERDtBQUVMRSxjQUFVLEVBQVZBO0FBRkssR0FBUDtBQUlELENBTk07QUFTQSxJQUFNRSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsU0FBTSxVQUFDQyxRQUFELEVBQWM7QUFFbEQsUUFBSUMsSUFBSSxHQUFHQyxXQUFXLENBQUNDLFNBQXZCOztBQUVBLFFBQUlGLElBQUksSUFBSSxFQUFaLEVBQWdCO0FBRWRHLDBCQUFvQixHQUFHQyxJQUF2QixDQUE2QixVQUFDQyxNQUFELEVBQVk7QUFFckMsWUFBSUEsTUFBTSxDQUFDQyxNQUFQLElBQWlCLENBQXJCLEVBQXlCO0FBRXZCQyw4QkFBb0IsR0FBR0gsSUFBdkIsQ0FBNkIsVUFBQ0ksUUFBRCxFQUFjO0FBRXpDLGdCQUFJQSxRQUFKLEVBQWU7QUFFYixrQkFBSUMsV0FBVyxHQUFHO0FBQ2hCQyxvQkFBSSxFQUFHRixRQURTO0FBRWhCRywwQkFBVSxFQUFHO0FBRkcsZUFBbEI7QUFLQVosc0JBQVEsQ0FBQ0osYUFBYSxDQUFDYyxXQUFELENBQWQsQ0FBUjtBQUVEO0FBRUYsV0FiRDtBQWVELFNBakJELE1BaUJPO0FBRUwsY0FBSUcsTUFBTSxHQUFHO0FBQ1hGLGdCQUFJLEVBQUdMLE1BREk7QUFFWE0sc0JBQVUsRUFBRztBQUZGLFdBQWI7QUFLQVosa0JBQVEsQ0FBQ0osYUFBYSxDQUFDaUIsTUFBRCxDQUFkLENBQVI7QUFFRDtBQUVKLE9BOUJEO0FBZ0NEOztBQUFBO0FBRUYsR0F4QytCO0FBQUEsQ0FBekI7O0FBMENQLFNBQVNMLG9CQUFULEdBQWdDO0FBRTlCLE1BQU1NLFFBQVEsR0FBRyxFQUFqQjtBQUVBLFNBQU8sSUFBSUMsT0FBSixDQUFhLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUV2Q0MsWUFBUSxDQUFDQyxhQUFULENBQXdCLGVBQXhCLEVBQTBDQyxTQUExQyxHQUFzREMsd0RBQVcsQ0FBQ0MsdUJBQWxFO0FBRUFKLFlBQVEsQ0FBQ0MsYUFBVCxDQUF3QixTQUF4QixFQUFvQ0ksS0FBcEMsQ0FBMENDLE9BQTFDLEdBQW9ELE9BQXBEO0FBRUFDLGdFQUFjLENBQUVDLCtDQUFnQixDQUFDQyw4QkFBbkIsRUFBbURiLFFBQW5ELENBQWQsQ0FBNEVULElBQTVFLENBQWlGLFVBQUN1QixJQUFELEVBQVU7QUFFekZWLGNBQVEsQ0FBQ0MsYUFBVCxDQUF3QixTQUF4QixFQUFvQ0ksS0FBcEMsQ0FBMENDLE9BQTFDLEdBQW9ELE1BQXBEOztBQUVBLFVBQUlJLElBQUosRUFBVztBQUVUQyx5REFBUSxDQUFDQyxjQUFULENBQXdCQyxPQUF4QixDQUFnQ0gsSUFBaEMsRUFBc0N2QixJQUF0QyxDQUEyQyxVQUFDMkIsS0FBRCxFQUFXO0FBRXBEaEIsaUJBQU8sQ0FBQ1ksSUFBRCxDQUFQO0FBRUQsU0FKRDtBQU1EO0FBRUYsS0FkRDtBQWdCRCxHQXRCTSxDQUFQO0FBd0JEOztBQUVELFNBQVN4QixvQkFBVCxHQUFnQztBQUU5QixTQUFPeUIsaURBQVEsQ0FBQ0ksS0FBVCxDQUFlLGdCQUFmLEVBQWlDQyxPQUFqQyxHQUEyQzdCLElBQTNDLENBQWlELFVBQUM4QixPQUFELEVBQWE7QUFFbkUsV0FBT0EsT0FBUDtBQUVELEdBSk0sQ0FBUDtBQU1ELEM7Ozs7Ozs7Ozs7OztBQ2pHRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLElBQU1DLFdBQVcsR0FBRyxhQUFwQjtBQUVBLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUVDLFNBQUYsRUFBaUI7QUFFM0MsU0FBTztBQUNMeEMsUUFBSSxFQUFFc0MsV0FERDtBQUVMRSxhQUFTLEVBQVRBO0FBRkssR0FBUDtBQUlELENBTk07QUFTQSxJQUFNQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CO0FBQUEsU0FBTSxVQUFDdkMsUUFBRCxFQUFjO0FBRW5ELFFBQUlDLElBQUksR0FBR0MsV0FBVyxDQUFDQyxTQUF2Qjs7QUFFQSxRQUFJRixJQUFJLElBQUksRUFBWixFQUFnQjtBQUVkdUMsc0JBQWdCLEdBQUduQyxJQUFuQixDQUF5QixVQUFDSSxRQUFELEVBQWM7QUFFckMsWUFBR0EsUUFBSCxFQUFhO0FBRVgsY0FBSWdDLFNBQVMsR0FBRztBQUNkOUIsZ0JBQUksRUFBR0YsUUFETztBQUVkRyxzQkFBVSxFQUFHO0FBRkMsV0FBaEI7QUFLQVosa0JBQVEsQ0FBQ3FDLFlBQVksQ0FBQ0ksU0FBRCxDQUFiLENBQVI7QUFFRDtBQUVGLE9BYkQ7QUFlRDs7QUFBQTtBQUVGLEdBdkJnQztBQUFBLENBQTFCOztBQXlCUCxTQUFTRCxnQkFBVCxHQUE0QjtBQUUxQixTQUFPLElBQUl6QixPQUFKLENBQWEsVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBRXZDQyxZQUFRLENBQUNDLGFBQVQsQ0FBd0IsZUFBeEIsRUFBMENDLFNBQTFDLEdBQXNEQyx3REFBVyxDQUFDcUIsc0JBQWxFO0FBRUF4QixZQUFRLENBQUNDLGFBQVQsQ0FBd0IsU0FBeEIsRUFBb0NJLEtBQXBDLENBQTBDQyxPQUExQyxHQUFvRCxPQUFwRDtBQUVBQyxnRUFBYyxDQUFFQywrQ0FBZ0IsQ0FBQ2lCLHlCQUFuQixFQUE4QyxFQUE5QyxDQUFkLENBQWlFdEMsSUFBakUsQ0FBc0UsVUFBQ3VCLElBQUQsRUFBVTtBQUU5RVYsY0FBUSxDQUFDQyxhQUFULENBQXdCLFNBQXhCLEVBQW9DSSxLQUFwQyxDQUEwQ0MsT0FBMUMsR0FBb0QsTUFBcEQ7O0FBRUEsVUFBSUksSUFBSixFQUFXO0FBRVRaLGVBQU8sQ0FBRVksSUFBRixDQUFQO0FBRUQ7QUFFRixLQVZEO0FBWUQsR0FsQk0sQ0FBUDtBQW9CRDs7QUFFTSxJQUFNZ0IsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDQyxJQUFELEVBQU1QLFNBQU47QUFBQSxTQUFvQixVQUFDdEMsUUFBRCxFQUFjO0FBRTlELFFBQUlDLElBQUksR0FBR0MsV0FBVyxDQUFDQyxTQUF2Qjs7QUFFQSxRQUFJRixJQUFJLElBQUksRUFBWixFQUFnQjtBQUVaLGFBQU82QyxhQUFhLENBQUNELElBQUQsQ0FBYixDQUFvQnhDLElBQXBCLENBQTBCLFVBQUNJLFFBQUQsRUFBYztBQUU3QyxZQUFHQSxRQUFILEVBQWE7QUFFWCxpQkFBT0EsUUFBUDtBQUVELFNBSkQsTUFJTztBQUVILGlCQUFPLEtBQVA7QUFDSDtBQUdGLE9BWk0sQ0FBUDtBQWVIOztBQUFBO0FBRUYsR0F2QjZCO0FBQUEsQ0FBdkI7O0FBeUJQLFNBQVNxQyxhQUFULENBQXVCRCxJQUF2QixFQUE2QjtBQUUzQixNQUFNL0IsUUFBUSxHQUFHO0FBQ2ZpQyxnQkFBWSxFQUFFRjtBQURDLEdBQWpCO0FBSUEsU0FBTyxJQUFJOUIsT0FBSixDQUFhLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUV2Q0MsWUFBUSxDQUFDQyxhQUFULENBQXdCLGVBQXhCLEVBQTBDQyxTQUExQyxHQUFzREMsd0RBQVcsQ0FBQzJCLG1CQUFsRTtBQUVBOUIsWUFBUSxDQUFDQyxhQUFULENBQXdCLFNBQXhCLEVBQW9DSSxLQUFwQyxDQUEwQ0MsT0FBMUMsR0FBb0QsT0FBcEQ7QUFFQUMsZ0VBQWMsQ0FBRUMsK0NBQWdCLENBQUN1QixzQkFBbkIsRUFBMkNuQyxRQUEzQyxDQUFkLENBQW9FVCxJQUFwRSxDQUF5RSxVQUFDdUIsSUFBRCxFQUFVO0FBRWpGVixjQUFRLENBQUNDLGFBQVQsQ0FBd0IsU0FBeEIsRUFBb0NJLEtBQXBDLENBQTBDQyxPQUExQyxHQUFvRCxNQUFwRDs7QUFFQSxVQUFJSSxJQUFKLEVBQVc7QUFFVFosZUFBTyxDQUFFWSxJQUFJLENBQUNzQixNQUFQLENBQVA7QUFFRDtBQUVGLEtBVkQ7QUFZRCxHQWxCTSxDQUFQO0FBb0JELEM7Ozs7Ozs7Ozs7OztBQ3BIRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLElBQU1DLFFBQVEsR0FBRyxVQUFqQjtBQUVBLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUVDLElBQUYsRUFBWTtBQUVqQyxTQUFPO0FBQ0x2RCxRQUFJLEVBQUVxRCxRQUREO0FBRUxFLFFBQUksRUFBSkE7QUFGSyxHQUFQO0FBSUQsQ0FOTTtBQVFBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxTQUFNLFVBQUN0RCxRQUFELEVBQWM7QUFFbEQsUUFBSUMsSUFBSSxHQUFHQyxXQUFXLENBQUNDLFNBQXZCOztBQUVBLFFBQUlGLElBQUksSUFBSSxFQUFaLEVBQWdCO0FBRWRzRCxxQkFBZSxHQUFHbEQsSUFBbEIsQ0FBd0IsVUFBQ0MsTUFBRCxFQUFZO0FBRWhDLFlBQUlBLE1BQU0sQ0FBQ0MsTUFBUCxJQUFpQixDQUFyQixFQUF5QjtBQUV2QmlELDRCQUFrQixHQUFHbkQsSUFBckIsQ0FBMkIsVUFBQ0ksUUFBRCxFQUFjO0FBRXZDLGdCQUFHQSxRQUFILEVBQWE7QUFFWCxrQkFBSWdELE9BQU8sR0FBRztBQUNaOUMsb0JBQUksRUFBR0YsUUFESztBQUVaRywwQkFBVSxFQUFHO0FBRkQsZUFBZDtBQUtBWixzQkFBUSxDQUFDb0QsT0FBTyxDQUFDSyxPQUFELENBQVIsQ0FBUjtBQUVEO0FBRUYsV0FiRDtBQWVELFNBakJELE1BaUJPO0FBRUwsY0FBSUMsSUFBSSxHQUFHO0FBQ1QvQyxnQkFBSSxFQUFHTCxNQURFO0FBRVRNLHNCQUFVLEVBQUc7QUFGSixXQUFYO0FBS0FaLGtCQUFRLENBQUNvRCxPQUFPLENBQUNNLElBQUQsQ0FBUixDQUFSO0FBRUQ7QUFFSixPQTlCRDtBQWdDRDs7QUFBQTtBQUVGLEdBeEMrQjtBQUFBLENBQXpCOztBQTBDUCxTQUFTRixrQkFBVCxHQUE4QjtBQUU1QixTQUFPLElBQUl6QyxPQUFKLENBQWEsVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBRXZDQyxZQUFRLENBQUNDLGFBQVQsQ0FBd0IsZUFBeEIsRUFBMENDLFNBQTFDLEdBQXNEQyx3REFBVyxDQUFDc0MsaUJBQWxFO0FBRUF6QyxZQUFRLENBQUNDLGFBQVQsQ0FBd0IsU0FBeEIsRUFBb0NJLEtBQXBDLENBQTBDQyxPQUExQyxHQUFvRCxPQUFwRDtBQUVBQyxnRUFBYyxDQUFFQywrQ0FBZ0IsQ0FBQ2tDLDRCQUFuQixFQUFpRCxFQUFqRCxDQUFkLENBQW9FdkQsSUFBcEUsQ0FBeUUsVUFBQ3VCLElBQUQsRUFBVTtBQUVqRlYsY0FBUSxDQUFDQyxhQUFULENBQXdCLFNBQXhCLEVBQW9DSSxLQUFwQyxDQUEwQ0MsT0FBMUMsR0FBb0QsTUFBcEQ7O0FBRUEsVUFBSUksSUFBSixFQUFXO0FBRVRDLHlEQUFRLENBQUNJLEtBQVQsQ0FBZSxVQUFmLEVBQTJCRixPQUEzQixDQUFtQ0gsSUFBbkMsRUFBeUN2QixJQUF6QyxDQUE4QyxVQUFDSSxRQUFELEVBQWM7QUFFeERPLGlCQUFPLENBQUVZLElBQUYsQ0FBUDtBQUVILFNBSkQ7QUFNRDtBQUVGLEtBZEQ7QUFnQkQsR0F0Qk0sQ0FBUDtBQXdCRDs7QUFFTSxJQUFNaUMsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDakMsSUFBRDtBQUFBLFNBQVUsVUFBQzVCLFFBQUQsRUFBYztBQUV2RCxRQUFJNEIsSUFBSixFQUFXO0FBRVAsYUFBT0MsaURBQVEsQ0FBQ2lDLFFBQVQsQ0FBa0IvQixPQUFsQixDQUEwQkgsSUFBMUIsRUFBZ0N2QixJQUFoQyxDQUFxQyxVQUFDMkIsS0FBRCxFQUFXO0FBRXJELGVBQU9BLEtBQVA7QUFFSCxPQUpRLENBQVA7QUFNSDtBQUVKLEdBWmtDO0FBQUEsQ0FBNUI7O0FBY1AsU0FBU3VCLGVBQVQsR0FBMkI7QUFFekIsU0FBTzFCLGlEQUFRLENBQUNJLEtBQVQsQ0FBZSxVQUFmLEVBQTJCQyxPQUEzQixHQUFxQzdCLElBQXJDLENBQTJDLFVBQUMwRCxRQUFELEVBQWM7QUFFOUQsV0FBT0EsUUFBUDtBQUVELEdBSk0sQ0FBUDtBQU1ELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzR0Q7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFTyxJQUFNQyxZQUFZLEdBQUcsb0JBQXJCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHLHNCQUFyQjtBQUNBLElBQU1DLE1BQU0sR0FBRyx3QkFBZjtBQUNBLElBQU1DLCtCQUErQixHQUFHLHlDQUF4QztBQUNBLElBQU1DLGdDQUFnQyxHQUFHLG1DQUF6Qzs7SUFFREMsSTs7Ozs7QUFFRixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUVmQyxzRUFBUSxDQUFFTCxNQUFGLENBQVI7QUFFQSw4QkFBTUksS0FBTixFQUplLENBTWY7O0FBQ0EsVUFBS0UsYUFBTCxHQUFxQixNQUFLQSxhQUFMLENBQW1CQyxJQUFuQiw0RkFBckI7QUFDQSxVQUFLQyxRQUFMLEdBQWdCLE1BQUtBLFFBQUwsQ0FBY0QsSUFBZCw0RkFBaEI7QUFSZTtBQVNsQjs7OztXQUVELHVCQUFjRSxLQUFkLEVBQXFCO0FBQUE7O0FBRWpCQSxXQUFLLENBQUNDLGNBQU47QUFDQSxVQUFRNUUsUUFBUixHQUFxQixLQUFLc0UsS0FBMUIsQ0FBUXRFLFFBQVI7QUFDQSxVQUFJNkUsU0FBUyxHQUFHQyxNQUFNLENBQUNILEtBQUssQ0FBQ0ksTUFBUCxDQUFOLENBQXFCQyxJQUFyQixDQUEwQixRQUExQixDQUFoQjs7QUFDQSxVQUFJSCxTQUFTLElBQUlJLFNBQWIsSUFBMEJKLFNBQVMsSUFBSSxZQUEzQyxFQUF5RDtBQUNyREMsY0FBTSxDQUFDLGVBQUQsQ0FBTixDQUF3QkksSUFBeEIsQ0FBNkI3RCx5REFBVyxDQUFDOEQsY0FBekM7QUFFQUwsY0FBTSxDQUFDLFNBQUQsQ0FBTixDQUFrQk0sSUFBbEI7QUFFQXZELDBEQUFRLENBQUNJLEtBQVQsQ0FBZSxVQUFmLEVBQTJCb0QsS0FBM0IsR0FBbUNoRixJQUFuQyxDQUF3QyxVQUFDQyxNQUFELEVBQVU7QUFFOUN1Qiw0REFBUSxDQUFDSSxLQUFULENBQWUsZUFBZixFQUFnQ29ELEtBQWhDLEdBQXdDaEYsSUFBeEMsQ0FBNkMsVUFBQ0MsTUFBRCxFQUFVO0FBRW5EdUIsOERBQVEsQ0FBQ0ksS0FBVCxDQUFlLGNBQWYsRUFBK0JvRCxLQUEvQixHQUF1Q2hGLElBQXZDLENBQTRDLFVBQUNDLE1BQUQsRUFBVTtBQUVsRHVCLGdFQUFRLENBQUNJLEtBQVQsQ0FBZSxnQkFBZixFQUFpQ29ELEtBQWpDLEdBQXlDaEYsSUFBekMsQ0FBOEMsVUFBQ0MsTUFBRCxFQUFVO0FBRXBEdUIsa0VBQVEsQ0FBQ0ksS0FBVCxDQUFlLGVBQWYsRUFBZ0NvRCxLQUFoQyxHQUF3Q2hGLElBQXhDLENBQTZDLFVBQUNDLE1BQUQsRUFBVTtBQUVuRHVCLG9FQUFRLENBQUNJLEtBQVQsQ0FBZSxXQUFmLEVBQTRCb0QsS0FBNUIsR0FBb0NoRixJQUFwQyxDQUF5QyxVQUFDQyxNQUFELEVBQVU7QUFFL0N1QixzRUFBUSxDQUFDSSxLQUFULENBQWUsWUFBZixFQUE2Qm9ELEtBQTdCLEdBQXFDaEYsSUFBckMsQ0FBMEMsVUFBQ0MsTUFBRCxFQUFVO0FBRWhEdUIsd0VBQVEsQ0FBQ0ksS0FBVCxDQUFlLGNBQWYsRUFBK0JvRCxLQUEvQixHQUF1Q2hGLElBQXZDLENBQTRDLFVBQUNDLE1BQUQsRUFBVTtBQUVsRHVCLDBFQUFRLENBQUNJLEtBQVQsQ0FBZSxjQUFmLEVBQStCb0QsS0FBL0IsR0FBdUNoRixJQUF2QyxDQUE0QyxVQUFDQyxNQUFELEVBQVU7QUFFbER1Qiw0RUFBUSxDQUFDSSxLQUFULENBQWUsVUFBZixFQUEyQm9ELEtBQTNCLEdBQW1DaEYsSUFBbkMsQ0FBd0MsVUFBQ0MsTUFBRCxFQUFVO0FBRTlDdUIsOEVBQVEsQ0FBQ0ksS0FBVCxDQUFlLGtCQUFmLEVBQW1Db0QsS0FBbkMsR0FBMkNoRixJQUEzQyxDQUFnRCxVQUFDQyxNQUFELEVBQVU7QUFFdER1QixnRkFBUSxDQUFDSSxLQUFULENBQWUsVUFBZixFQUEyQm9ELEtBQTNCLEdBQW1DaEYsSUFBbkMsQ0FBd0MsVUFBQ0MsTUFBRCxFQUFVO0FBRTlDdUIsa0ZBQVEsQ0FBQ0ksS0FBVCxDQUFlLFNBQWYsRUFBMEJvRCxLQUExQixHQUFrQ2hGLElBQWxDLENBQXVDLFVBQUNDLE1BQUQsRUFBVTtBQUM3Q3VCLG9GQUFRLENBQUNJLEtBQVQsQ0FBZSxhQUFmLEVBQThCb0QsS0FBOUIsR0FBc0NoRixJQUF0QyxDQUEyQyxVQUFDQyxNQUFELEVBQVU7QUFFakR1QixzRkFBUSxDQUFDSSxLQUFULENBQWUsWUFBZixFQUE2QnFELEtBQTdCLENBQW1DLFlBQW5DLEVBQWlEQyxNQUFqRCxDQUF3RCxRQUF4RCxFQUFrRUMsTUFBbEUsR0FBMkVuRixJQUEzRSxDQUFnRixVQUFDQyxNQUFELEVBQVU7QUFFdEZpRSx3R0FBUSxDQUFFTixZQUFGLEVBQWdCcEMsa0RBQWhCLEVBQTBCLE1BQUksQ0FBQ3lDLEtBQS9CLENBQVI7O0FBRUEsMENBQUksTUFBSSxDQUFDQSxLQUFMLENBQVdtQixJQUFYLENBQWdCQyxJQUFoQixJQUF3QixNQUE1QixFQUFxQztBQUVqQzFGLGdEQUFRLENBQUMyRiwyRkFBMEIsRUFBM0IsQ0FBUixDQUF1Q3RGLElBQXZDLENBQTZDLFVBQUN1RixHQUFELEVBQVM7QUFFbEQ1RixrREFBUSxDQUFDNkYsMkVBQWdCLEVBQWpCLENBQVI7QUFDQTdGLGtEQUFRLENBQUNzRCx1RUFBZ0IsRUFBakIsQ0FBUjtBQUNBdEQsa0RBQVEsQ0FBQzhGLDRFQUFjLEVBQWYsQ0FBUjtBQUNBOUYsa0RBQVEsQ0FBQ0QsNkVBQWdCLEVBQWpCLENBQVI7QUFDQUMsa0RBQVEsQ0FBQytGLHVFQUFjLEVBQWYsQ0FBUjtBQUNBL0Ysa0RBQVEsQ0FBQ2dHLDZFQUFpQixFQUFsQixDQUFSO0FBQ0FoRyxrREFBUSxDQUFDaUcsZ0VBQVUsRUFBWCxDQUFSO0FBQ0FqRyxrREFBUSxDQUFDa0cseUVBQWMsRUFBZixDQUFSO0FBQ0FsRyxrREFBUSxDQUFDbUcsMkVBQWdCLEVBQWpCLENBQVI7QUFDQW5HLGtEQUFRLENBQUN1Qyw2RUFBaUIsRUFBbEIsQ0FBUjtBQUNBdkMsa0RBQVEsQ0FBQ29HLHVFQUFjLEVBQWYsQ0FBUjtBQUNBcEcsa0RBQVEsQ0FBQ3FHLHlFQUFrQixFQUFuQixDQUFSO0FBQ0FyRyxrREFBUSxDQUFDc0csNkVBQXNCLEVBQXZCLENBQVI7QUFFQXRHLGtEQUFRLENBQUN1Ryw0RUFBa0IsRUFBbkIsQ0FBUjtBQUVBekIsZ0RBQU0sQ0FBQyxTQUFELENBQU4sQ0FBa0IwQixJQUFsQjtBQUVILHlDQXBCRDtBQXNCSCx1Q0F4QkQsTUF3Qk87QUFFSCw4Q0FBSSxDQUFDbEMsS0FBTCxDQUFXbUMsT0FBWCxDQUFtQkMsSUFBbkIsQ0FBeUI7QUFDckJDLGtEQUFRLEVBQUVqRixnREFBZ0IsQ0FBQ2tGLFFBQWpCLEdBQTRCO0FBRGpCLHlDQUF6QjtBQUlIO0FBRUoscUNBcENEO0FBcUNILG1DQXZDRDtBQXdDSCxpQ0F6Q0Q7QUEyQ0gsK0JBN0NEO0FBOENILDZCQWhERDtBQWlESCwyQkFuREQ7QUFvREgseUJBdEREO0FBdURILHVCQXpERDtBQTBESCxxQkE1REQ7QUE2REgsbUJBL0REO0FBZ0VILGlCQWxFRDtBQW1FSCxlQXJFRDtBQXNFSCxhQXhFRDtBQXlFSCxXQTNFRDtBQTRFSCxTQTlFRDtBQWdGSDtBQUVKOzs7V0FFRCxvQkFBVztBQUVQLFVBQUlDLGFBQWEsR0FBRyxtQkFBcEI7QUFDQSxVQUFJQyxrQkFBa0IsR0FBRyxtQkFBekI7QUFDQSxVQUFJQyxnQkFBZ0IsR0FBRyxtQkFBdkI7QUFDQSxVQUFJQyxlQUFlLEdBQUcsbUJBQXRCO0FBQ0EsVUFBSUMsZ0JBQWdCLEdBQUcsbUJBQXZCOztBQUVBLFVBQUksS0FBSzNDLEtBQUwsQ0FBV21CLElBQVgsQ0FBZ0JDLElBQWhCLElBQXdCVCxTQUE1QixFQUF3QztBQUVwQyxnQkFBUSxLQUFLWCxLQUFMLENBQVdtQixJQUFYLENBQWdCQyxJQUF4QjtBQUVJLGVBQUssTUFBTDtBQUNBLGVBQUssVUFBTDtBQUNJbUIseUJBQWEsSUFBSSxhQUFqQjtBQUNBOztBQUNKLGVBQUssV0FBTDtBQUNJQyw4QkFBa0IsSUFBSSxhQUF0QjtBQUNBOztBQUNKLGVBQUssU0FBTDtBQUNBLGVBQUssZ0JBQUw7QUFDQSxlQUFLLGVBQUw7QUFDQSxlQUFLLGNBQUw7QUFDSUMsNEJBQWdCLElBQUksYUFBcEI7QUFDQTs7QUFDSixlQUFLLFFBQUw7QUFDQSxlQUFLLFdBQUw7QUFDQSxlQUFLLGNBQUw7QUFDQSxlQUFLLGVBQUw7QUFDSUMsMkJBQWUsSUFBSSxhQUFuQjtBQUNBOztBQUNKLGVBQUssU0FBTDtBQUNJQyw0QkFBZ0IsSUFBSSxhQUFwQjtBQUNBO0FBdkJSO0FBMkJIOztBQUVELFVBQU1DLE1BQU0sR0FBRzdGLHlEQUFXLENBQUM2RixNQUEzQjtBQUNBLFVBQU1DLE9BQU8sR0FBRzlGLHlEQUFXLENBQUM4RixPQUE1QjtBQUNBLFVBQU1DLElBQUksR0FBRy9GLHlEQUFXLENBQUMrRixJQUF6QjtBQUNBLFVBQU1DLFNBQVMsR0FBR2hHLHlEQUFXLENBQUNnRyxTQUE5QjtBQUVBLFVBQU1DLEtBQUssR0FBRyxDQUNWO0FBQ0lDLFVBQUUsRUFBRTdGLGdEQUFnQixDQUFDa0YsUUFBakIsR0FBNEIsTUFEcEM7QUFFSVksaUJBQVMsRUFBRVgsYUFGZjtBQUdJWSxzQkFBYyxFQUFFLFlBSHBCO0FBSUl2QyxZQUFJLEVBQUVrQztBQUpWLE9BRFUsRUFPVjtBQUNJRyxVQUFFLEVBQUU3RixnREFBZ0IsQ0FBQ2tGLFFBQWpCLEdBQTRCLGdCQURwQztBQUVJWSxpQkFBUyxFQUFFVixrQkFGZjtBQUdJVyxzQkFBYyxFQUFFLG9CQUhwQjtBQUlJdkMsWUFBSSxFQUFFbUM7QUFKVixPQVBVLEVBYVY7QUFDSUUsVUFBRSxFQUFFN0YsZ0RBQWdCLENBQUNrRixRQUFqQixHQUE0QixjQURwQztBQUVJWSxpQkFBUyxFQUFFVCxnQkFGZjtBQUdJVSxzQkFBYyxFQUFFLFlBSHBCO0FBSUl2QyxZQUFJLEVBQUVpQztBQUpWLE9BYlUsRUFtQlY7QUFDSUksVUFBRSxFQUFFN0YsZ0RBQWdCLENBQUNrRixRQUFqQixHQUE0QixhQURwQztBQUVJWSxpQkFBUyxFQUFFUixlQUZmO0FBR0lTLHNCQUFjLEVBQUUsWUFIcEI7QUFJSXZDLFlBQUksRUFBRWdDO0FBSlYsT0FuQlUsRUF5QlY7QUFDSUssVUFBRSxFQUFFN0YsZ0RBQWdCLENBQUNrRixRQUFqQixHQUE0QixjQURwQztBQUVJWSxpQkFBUyxFQUFFUCxnQkFGZjtBQUdJUSxzQkFBYyxFQUFFLGtCQUhwQjtBQUlJdkMsWUFBSSxFQUFFd0MsMkRBQUUsQ0FBRSxTQUFGLEVBQWEsUUFBYjtBQUpaLE9BekJVLENBQWQ7QUFpQ0EsYUFBT0Msc0VBQVksQ0FBRTNELFlBQUYsRUFBZ0JzRCxLQUFoQixFQUF1QixJQUF2QixFQUE2QjVGLGdEQUE3QixDQUFuQjtBQUVIOzs7V0FFRCxrQkFBUztBQUFBOztBQUVMLFVBQUl6QixJQUFJLEdBQUcsS0FBS3FFLEtBQUwsQ0FBV3JFLElBQXRCO0FBQ0EsVUFBSTJILFVBQVUsR0FBRzFILFdBQVcsQ0FBQzBILFVBQTdCO0FBQ0EsVUFBSUMsS0FBSyxHQUFHeEcseURBQVcsQ0FBQ3dHLEtBQXhCO0FBQ0EsVUFBSUMsVUFBVSxHQUFHekcseURBQVcsQ0FBQ3lHLFVBQTdCO0FBQ0EsVUFBSVgsT0FBTyxHQUFHOUYseURBQVcsQ0FBQzhGLE9BQTFCO0FBQ0EsVUFBSVksUUFBUSxHQUFHMUcseURBQVcsQ0FBQzBHLFFBQTNCO0FBQ0EsVUFBSUMsV0FBVyxHQUFHLEVBQWxCOztBQUNBLFVBQUcvSCxJQUFJLENBQUMrSCxXQUFMLElBQW9CLEVBQXZCLEVBQTJCO0FBQ3ZCQSxtQkFBVyxHQUFHOUgsV0FBVyxDQUFDK0gsTUFBWixHQUFxQix1QkFBbkM7QUFDSCxPQUZELE1BR0k7QUFDQUQsbUJBQVcsR0FBRy9ILElBQUksQ0FBQytILFdBQW5CO0FBQ0g7O0FBQ0QsVUFBSUUsaUJBQWlCLEdBQUcsbUJBQXhCO0FBQ0EsVUFBSUMsY0FBYyxHQUFHLG1CQUFyQjtBQUNBLFVBQUlDLGVBQWUsR0FBRyxtQkFBdEI7QUFFQSxVQUFNQyxhQUFhLEdBQUcsS0FBSzNELFFBQUwsR0FBZ0I0RCxHQUFoQixDQUFxQixVQUFBQyxJQUFJLEVBQUk7QUFDL0MsZUFDSTtBQUFJLGFBQUcsRUFBRUEsSUFBSSxDQUFDaEI7QUFBZCxXQUNJLHlFQUFDLHNEQUFEO0FBQU0sbUJBQVMsRUFBRWdCLElBQUksQ0FBQ2YsU0FBdEI7QUFBaUMsWUFBRSxFQUFFZSxJQUFJLENBQUNoQjtBQUExQyxXQUE4QztBQUFNLG1CQUFTLEVBQUVnQixJQUFJLENBQUNkO0FBQXRCLFVBQTlDLEVBQTRGYyxJQUFJLENBQUNyRCxJQUFqRyxDQURKLENBREo7QUFLSCxPQU5xQixDQUF0Qjs7QUFRQSxVQUFJLEtBQUtaLEtBQUwsQ0FBV21CLElBQVgsQ0FBZ0JDLElBQWhCLElBQXdCVCxTQUE1QixFQUF3QztBQUVwQyxnQkFBUSxLQUFLWCxLQUFMLENBQVdtQixJQUFYLENBQWdCQyxJQUF4QjtBQUVJLGVBQUssVUFBTDtBQUNBLGVBQUssa0JBQUw7QUFDQSxlQUFLLGdCQUFMO0FBQ0l3Qyw2QkFBaUIsSUFBSSxhQUFyQjtBQUNBO0FBTlI7QUFVSDs7QUFDRCxhQUNJO0FBQU8saUJBQVMsRUFBQztBQUFqQixTQUNJLHNGQUNJLHFGQUNLRyxhQURMLEVBRUtWLHNFQUFZLENBQUV2RCxnQ0FBRixFQUFvQyxFQUFwQyxFQUF3QyxJQUF4QyxDQUZqQixFQUdJLHFGQUNJLHlFQUFDLHNEQUFEO0FBQU0saUJBQVMsRUFBRThELGlCQUFqQjtBQUFvQyxVQUFFLEVBQUV4RyxnREFBZ0IsQ0FBQ2tGLFFBQWpCLEdBQTRCO0FBQXBFLFNBQXFGO0FBQU0saUJBQVMsRUFBQztBQUFoQixRQUFyRixFQUE0SG1CLFFBQTVILENBREosQ0FISixFQU1JLHFGQUNJLHlFQUFDLHNEQUFEO0FBQU0saUJBQVMsRUFBRUksY0FBakI7QUFBaUMsdUJBQVksWUFBN0M7QUFBMEQsVUFBRSxFQUFFekcsZ0RBQWdCLENBQUNrRixRQUFqQixHQUE0QixNQUExRjtBQUFrRyxlQUFPLEVBQUcsaUJBQUM0QixDQUFEO0FBQUEsaUJBQU8sTUFBSSxDQUFDaEUsYUFBTCxDQUFtQmdFLENBQW5CLENBQVA7QUFBQTtBQUE1RyxTQUE0STtBQUFNLGlCQUFTLEVBQUMseUJBQWhCO0FBQTBDLHVCQUFZO0FBQXRELFFBQTVJLEVBQXdOWCxLQUF4TixDQURKLENBTkosQ0FESixDQURKLEVBYUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDSSxxRkFDSSxxRkFDSSxvRkFDSTtBQUFLLFdBQUcsRUFBQyxhQUFUO0FBQXVCLFdBQUcsRUFBRUcsV0FBNUI7QUFBeUMsY0FBTSxFQUFFQSxXQUFqRDtBQUE4RCxpQkFBUyxFQUFDLHdCQUF4RTtBQUFpRyxjQUFNLEVBQUMsSUFBeEc7QUFBNkcsYUFBSyxFQUFDO0FBQW5ILFFBREosQ0FESixFQUlJLHVGQUFROUgsV0FBVyxDQUFDQyxTQUFaLENBQXNCc0ksS0FBOUIsQ0FKSixDQURKLEVBT0kscUZBQ0k7QUFBRyxpQkFBUyxFQUFFTCxlQUFkO0FBQStCLFlBQUksRUFBRVI7QUFBckMsU0FBaUQ7QUFBTSxpQkFBUyxFQUFDO0FBQWhCLFFBQWpELEVBQTBGRiwyREFBRSxDQUFFLFFBQUYsRUFBWSxRQUFaLENBQTVGLENBREosQ0FQSixDQURKLENBYkosQ0FESjtBQTZCSDs7OztFQWpRY2dCLCtDOztBQXFRbkIsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFBQyxLQUFLO0FBQUEsU0FBSztBQUM5QjNJLFFBQUksRUFBQzJJLEtBQUssQ0FBQ3pCLE9BRG1CO0FBRTlCMEIsZ0JBQVksRUFBRUQsS0FBSyxDQUFDQztBQUZVLEdBQUw7QUFBQSxDQUE3Qjs7QUFLQSxTQUFTQyxrQkFBVCxDQUE0QjlJLFFBQTVCLEVBQXNDO0FBQ2xDLFNBQU8rSSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFFaEosWUFBUSxFQUFSQTtBQUFGLEdBQWQsRUFBNEJpSixnRUFBa0IsQ0FBQztBQUFFQyxnQkFBWSxFQUFaQSwyREFBRjtBQUFnQnJELG9CQUFnQixFQUFoQkEsbUVBQWhCO0FBQWlDdEQscUJBQWlCLEVBQWpCQSxxRUFBakM7QUFBb0R1RCxrQkFBYyxFQUFkQSxvRUFBcEQ7QUFBb0UvRixvQkFBZ0IsRUFBaEJBLHFFQUFwRTtBQUFzRmlHLHFCQUFpQixFQUFqQkEscUVBQXRGO0FBQXlHQyxjQUFVLEVBQVZBLHdEQUF6RztBQUFxSEMsa0JBQWMsRUFBZEEsaUVBQXJIO0FBQXFJSCxrQkFBYyxFQUFkQSwrREFBckk7QUFBcUpJLG9CQUFnQixFQUFoQkEsbUVBQXJKO0FBQXVLQyxrQkFBYyxFQUFkQSwrREFBdks7QUFBdUw5QyxvQkFBZ0IsRUFBaEJBLCtEQUF2TDtBQUF5TStDLHNCQUFrQixFQUFsQkEsaUVBQXpNO0FBQTZOQywwQkFBc0IsRUFBdEJBLHFFQUFzQkE7QUFBblAsR0FBRCxFQUF3UHRHLFFBQXhQLENBQTlDLENBQVA7QUFDSDs7QUFFY21KLDBIQUFPLENBQUVSLGVBQUYsRUFBbUJHLGtCQUFuQixDQUFQLENBQWdEekUsSUFBaEQsQ0FBZixFOzs7Ozs7Ozs7OztBQ2hUQSx1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTStFLDJCQUEyQixHQUFHLDZCQUFwQztBQUNBLElBQU1DLDRCQUE0QixHQUFHLHNDQUFyQztBQUNBLElBQU1DLDZCQUE2QixHQUFHLHVDQUF0QztBQUNBLElBQU1DLDhCQUE4QixHQUFHLHdDQUF2QztBQUNBLElBQU1wRiwrQkFBK0IsR0FBRyx5Q0FBeEM7O0lBRURxRixJOzs7OztBQUVGLGdCQUFZbEYsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNmLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS21GLG9CQUFMLEdBQTRCLE1BQUtBLG9CQUFMLENBQTBCaEYsSUFBMUIsNEZBQTVCO0FBQ0EsVUFBS2lGLGlCQUFMLEdBQXlCLE1BQUtBLGlCQUFMLENBQXVCakYsSUFBdkIsNEZBQXpCO0FBSGU7QUFJbEI7Ozs7V0FFRCwyQkFBa0JFLEtBQWxCLEVBQXlCZ0YsTUFBekIsRUFBZ0M7QUFDNUIsVUFBUTNKLFFBQVIsR0FBcUIsS0FBS3NFLEtBQTFCLENBQVF0RSxRQUFSO0FBQ0EsVUFBSTZJLFlBQVksR0FBRyxLQUFLdkUsS0FBTCxDQUFXdUUsWUFBOUI7QUFDQSxVQUFJZSxHQUFHLEdBQUcsS0FBS3RGLEtBQUwsQ0FBV3NGLEdBQVgsQ0FBZWpKLElBQXpCOztBQUNBLFVBQUlnSixNQUFNLElBQUlBLE1BQU0sSUFBSSxNQUF4QixFQUFpQztBQUM3QjtBQUNJO0FBQ0loQyxrRkFBWSxDQUFDeEQsK0JBQUQsRUFBa0MsSUFBbEMsRUFBd0MsS0FBS0csS0FBN0MsRUFBb0RqRCw0REFBcEQsQ0FBWixJQUVBckIsUUFBUSxDQUFDa0osbUVBQVksQ0FBQ0wsWUFBRCxDQUFiLENBQVIsQ0FBcUN4SSxJQUFyQyxDQUEyQyxVQUFDdUYsR0FBRCxFQUFTO0FBQ2hENUYsc0JBQVEsQ0FBQ3FHLHlFQUFrQixFQUFuQixDQUFSO0FBQ0FyRyxzQkFBUSxDQUFDbUcsb0ZBQWdCLEVBQWpCLENBQVI7QUFDQW5HLHNCQUFRLENBQUNvRyxnRkFBYyxFQUFmLENBQVI7QUFDSCxhQUpELENBRkE7QUFPSDtBQUNKO0FBQ0osT0FaRCxNQVlPO0FBQ0h0QixjQUFNLENBQUMrRSxPQUFQLENBQWU7QUFDWEMsZUFBSyxFQUFFekksNERBQVcsQ0FBQzBJLGVBRFI7QUFFWEMsaUJBQU8sRUFBQyxnRUFBOEQzSSw0REFBVyxDQUFDNEksZ0JBQTFFLEdBQTJGLHlEQUEzRixHQUFxSjVJLDREQUFXLENBQUM0SSxnQkFBakssR0FBa0wseUVBQWxMLEdBQTRQNUksNERBQVcsQ0FBQzZJLGlCQUF4USxHQUEwUix5REFBMVIsR0FBb1Y3SSw0REFBVyxDQUFDNkksaUJBQWhXLEdBQWtYLHFDQUYvVztBQUdYQyxpQkFBTyxFQUFFO0FBQ0xDLGlCQUFLLEVBQUc7QUFDSmxGLGtCQUFJLEVBQUU3RCw0REFBVyxDQUFDZ0osUUFEZDtBQUVKQyxzQkFBUSxFQUFFLG9CQUZOO0FBR0pYLG9CQUFNLEVBQUUsa0JBQVc7QUFDZixvQkFBSVksUUFBUSxHQUFHLEtBQUtDLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQixnQkFBbkIsRUFBcUNDLEdBQXJDLEdBQTJDQyxJQUEzQyxFQUFmO0FBQ0ksb0JBQUlDLFNBQVMsR0FBRyxLQUFLSixRQUFMLENBQWNDLElBQWQsQ0FBbUIsaUJBQW5CLEVBQXNDQyxHQUF0QyxHQUE0Q0MsSUFBNUMsRUFBaEI7O0FBRUEsb0JBQUdKLFFBQVEsQ0FBQ2hLLE1BQVQsR0FBa0IsQ0FBckIsRUFBdUI7QUFDdkJ1RSx3QkFBTSxDQUFDK0YsS0FBUCxDQUFhO0FBQ2JiLDJCQUFPLEVBQUUzSSw0REFBVyxDQUFDeUoseUJBRFI7QUFFYmhMLHdCQUFJLEVBQUU7QUFGTyxtQkFBYjtBQUlBLHlCQUFPLEtBQVA7QUFDSCxpQkFORyxNQU9DLElBQUk4SyxTQUFTLENBQUNySyxNQUFWLElBQW9CLEVBQXhCLEVBQTRCO0FBQ3pCdUUsd0JBQU0sQ0FBQytGLEtBQVAsQ0FBYTtBQUNUYiwyQkFBTyxFQUFFM0ksNERBQVcsQ0FBQzBKLHNCQURaO0FBRVRqTCx3QkFBSSxFQUFFO0FBRkcsbUJBQWI7QUFJQSx5QkFBTyxLQUFQO0FBQ0gsaUJBTkEsTUFPQSxJQUFHa0wsS0FBSyxDQUFDSixTQUFTLENBQUNELElBQVYsRUFBRCxDQUFMLElBQTJCTSxVQUFVLENBQUNMLFNBQUQsQ0FBVixHQUF3QixDQUF0RCxFQUF3RDtBQUN6RDlGLHdCQUFNLENBQUMrRixLQUFQLENBQWE7QUFDYmIsMkJBQU8sRUFBRTNJLDREQUFXLENBQUMwSixzQkFEUjtBQUViakwsd0JBQUksRUFBRTtBQUZPLG1CQUFiO0FBSUEseUJBQU8sS0FBUDtBQUNILGlCQU5JLE1BT0Q7QUFFQSxzQkFBSW9MLFdBQVcsR0FBRyxDQUFsQjs7QUFFQSxzQkFBR2hMLFdBQVcsQ0FBQ0MsU0FBWixDQUFzQmdMLGdCQUF0QixJQUEwQyxNQUE3QyxFQUFvRDtBQUVoRCx3QkFBR2pMLFdBQVcsQ0FBQ0MsU0FBWixDQUFzQmlMLFFBQXRCLElBQWtDLEtBQXJDLEVBQTJDO0FBRXZDLDBCQUFJQyxRQUFRLEdBQUcsQ0FBZjtBQUVBdkcsNEJBQU0sQ0FBQ3dHLElBQVAsQ0FBWTFCLEdBQVosRUFBaUIsVUFBQzJCLENBQUQsRUFBSWIsR0FBSixFQUFZO0FBRXpCLDRCQUFJQSxHQUFHLENBQUNjLElBQVIsRUFBYztBQUNWSCxrQ0FBUSxHQUFHQSxRQUFRLEdBQUdYLEdBQUcsQ0FBQ2MsSUFBMUI7QUFDSDtBQUVKLHVCQU5EO0FBUUEsMEJBQUlDLFVBQVUsR0FBTWIsU0FBUyxHQUFHLEdBQWIsSUFBcUIsTUFBTVMsUUFBM0IsQ0FBbkI7QUFFQUgsaUNBQVcsR0FBSU4sU0FBUyxHQUFHYSxVQUEzQjtBQUVBYiwrQkFBUyxHQUFHYSxVQUFaO0FBRUgscUJBbEJELE1Ba0JLO0FBRUQzRyw0QkFBTSxDQUFDd0csSUFBUCxDQUFZMUIsR0FBWixFQUFpQixVQUFDMkIsQ0FBRCxFQUFJYixHQUFKLEVBQVk7QUFFekIsNEJBQUlBLEdBQUcsQ0FBQ2MsSUFBUixFQUFjO0FBQ1ZOLHFDQUFXLEdBQUdBLFdBQVcsR0FBS04sU0FBUyxHQUFHRixHQUFHLENBQUNjLElBQWhCLEdBQXVCLEdBQXJEO0FBQ0g7QUFFSix1QkFORDtBQU9IO0FBRUosbUJBL0JELE1BK0JLO0FBRUQsd0JBQUd0TCxXQUFXLENBQUNDLFNBQVosQ0FBc0JpTCxRQUF0QixJQUFrQyxLQUFyQyxFQUEyQztBQUN2Q3RHLDRCQUFNLENBQUN3RyxJQUFQLENBQVkxQixHQUFaLEVBQWlCLFVBQUMyQixDQUFELEVBQUliLEdBQUosRUFBWTtBQUN6Qiw0QkFBSUEsR0FBRyxDQUFDYyxJQUFSLEVBQWM7QUFDVk4scUNBQVcsR0FBR0EsV0FBVyxHQUFLTixTQUFTLEdBQUdGLEdBQUcsQ0FBQ2MsSUFBaEIsR0FBdUIsR0FBckQ7QUFDSDtBQUNKLHVCQUpEO0FBS0FaLCtCQUFTLEdBQUdLLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDTCxTQUFELENBQVYsR0FBd0JLLFVBQVUsQ0FBQ0MsV0FBRCxDQUFuQyxDQUF0QjtBQUNBQSxpQ0FBVyxHQUFHLENBQWQ7QUFDSDtBQUNKOztBQUVELHNCQUFJUSxlQUFlLEdBQUc7QUFDbEJDLGdDQUFZLEVBQUNwQixRQURLO0FBRWxCcUIsaUNBQWEsRUFBQ2hCLFNBRkk7QUFHbEJNLCtCQUFXLEVBQUVBO0FBSEssbUJBQXRCO0FBS0FRLGlDQUFlLEdBQUcvRCxzRUFBWSxDQUFDNEIsOEJBQUQsRUFBaUNtQyxlQUFqQyxFQUFrRCxLQUFLcEgsS0FBdkQsQ0FBOUI7QUFDQXRFLDBCQUFRLENBQUU2TCxnRUFBUyxDQUFDaEQsWUFBRCxFQUFlNkMsZUFBZixFQUFnQyxLQUFoQyxDQUFYLENBQVI7QUFDSDtBQUNKO0FBcEZHLGFBREg7QUF1RkxJLGtCQUFNLEVBQUcsa0JBQVcsQ0FDbkI7QUF4Rkk7QUFIRSxTQUFmO0FBOEZIO0FBRUo7OztXQUVELDhCQUFxQm5ILEtBQXJCLEVBQTRCO0FBQ3hCLFVBQUlvSCxRQUFRLEdBQUcsQ0FBZjtBQUNBLFVBQ0kvTCxRQURKLEdBRUksS0FBS3NFLEtBRlQsQ0FDSXRFLFFBREo7QUFHQSxVQUFJNkksWUFBWSxHQUFHLEtBQUt2RSxLQUFMLENBQVd1RSxZQUE5QjtBQUNBLFVBQUl2RSxLQUFLLEdBQUcsS0FBS0EsS0FBakI7QUFHQVEsWUFBTSxDQUFDLFdBQUQsQ0FBTixDQUFvQjRGLEdBQXBCLENBQXdCLEVBQXhCO0FBRUE1RixZQUFNLENBQUMrRSxPQUFQLENBQWU7QUFDWEMsYUFBSyxFQUFFekksNERBQVcsQ0FBQzJLLGtCQURSO0FBRVhoQyxlQUFPLEVBQUUsMkZBQTJGM0ksNERBQVcsQ0FBQzJLLGtCQUF2RyxHQUE0SCxxQ0FGMUg7QUFHWEMsc0JBQWMsRUFBRSwwQkFBWTtBQUV4QixjQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUVBcEgsZ0JBQU0sQ0FBQyxXQUFELENBQU4sQ0FBb0JxSCxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxVQUFVQyxHQUFWLEVBQWU7QUFDM0MsZ0JBQUlBLEdBQUcsQ0FBQ0MsS0FBSixJQUFhLEVBQWpCLEVBQXFCO0FBRWpCLGtCQUFJQyxPQUFPLEdBQUd4SCxNQUFNLENBQUMsSUFBRCxDQUFOLENBQWE0RixHQUFiLEVBQWQ7QUFFQSxrQkFBSTZCLEdBQUcsR0FBR0QsT0FBTyxDQUFDRSxRQUFSLEVBQVY7QUFFQSxrQkFBSUMsWUFBWSxHQUFHOUUsc0VBQVksQ0FBQzJCLDZCQUFELEVBQWdDO0FBQzNEOEMsbUJBQUcsRUFBRUcsR0FEc0Q7QUFFM0RHLG1CQUFHLEVBQUVYO0FBRnNELGVBQWhDLEVBRzVCekgsS0FINEIsQ0FBL0I7QUFLQWlJLGlCQUFHLEdBQUdFLFlBQVksQ0FBQ0wsR0FBbkI7QUFFQUwsc0JBQVEsR0FBR1UsWUFBWSxDQUFDQyxHQUF4QjtBQUVBLGtCQUFJQyxTQUFTLEdBQUcsRUFBaEI7O0FBRUEsa0JBQUlKLEdBQUcsQ0FBQ0ssVUFBSixDQUFlLEtBQWYsQ0FBSixFQUEyQjtBQUN2QkQseUJBQVMsR0FBRyxLQUFaO0FBRUFKLG1CQUFHLEdBQUdBLEdBQUcsQ0FBQ00sU0FBSixDQUFjLENBQWQsRUFBaUJOLEdBQUcsQ0FBQ2hNLE1BQXJCLENBQU47QUFDSCxlQUpELE1BSU87QUFDSG9NLHlCQUFTLEdBQUcsSUFBWjtBQUNBSixtQkFBRyxHQUFHQSxHQUFHLENBQUNNLFNBQUosQ0FBYyxDQUFkLEVBQWlCTixHQUFHLENBQUNoTSxNQUFyQixDQUFOO0FBQ0g7O0FBRURQLHNCQUFRLENBQUM2TCxnRUFBUyxDQUFDaEQsWUFBRCxFQUFlMEQsR0FBZixFQUFvQkksU0FBcEIsRUFBK0IsRUFBL0IsRUFBbUMsRUFBbkMsRUFBdUNaLFFBQXZDLENBQVYsQ0FBUjtBQUVBakgsb0JBQU0sQ0FBQyxJQUFELENBQU4sQ0FBYTRGLEdBQWIsQ0FBaUIsRUFBakI7QUFFSDtBQUVKLFdBakNEO0FBbUNILFNBMUNVO0FBMkNYUCxlQUFPLEVBQUU7QUFDTDJCLGdCQUFNLEVBQUUsa0JBQVksQ0FFbkI7QUFISTtBQTNDRSxPQUFmO0FBaURBZ0IsZ0JBQVUsQ0FBQyxZQUFZO0FBQ25CaEksY0FBTSxDQUFDLFdBQUQsQ0FBTixDQUFvQmlJLEtBQXBCO0FBQ0gsT0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUlIOzs7V0FFRCxrQkFBUztBQUFBOztBQUNMLFVBQUlDLGFBQWEsR0FBRyxFQUFwQjtBQUNBLFVBQUlDLElBQUksR0FBR0MsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBSzdJLEtBQUwsQ0FBVzJJLElBQXRCLENBQVg7QUFDQSxVQUFJcEUsWUFBWSxHQUFHLEtBQUt2RSxLQUFMLENBQVd1RSxZQUE5QjtBQUNBLFVBQUl4QixTQUFTLEdBQUcsS0FBSy9DLEtBQUwsQ0FBVytDLFNBQTNCO0FBQ0EsVUFBSStGLFFBQVEsR0FBRyxLQUFLOUksS0FBTCxDQUFXOEksUUFBMUI7QUFDQSxVQUFJQyxVQUFVLEdBQUdILEtBQUssQ0FBQ0MsSUFBTixDQUFXQyxRQUFRLENBQUNFLE9BQXBCLENBQWpCO0FBQ0EsVUFBSUMsZUFBZSxHQUFHRixVQUFVLENBQUMvRSxHQUFYLENBQWdCLFVBQUNrRixPQUFELEVBQWE7QUFDL0MsZUFBT0EsT0FBTyxDQUFDQyxNQUFmO0FBQ0gsT0FGcUIsQ0FBdEI7QUFHQSxVQUFJQyxhQUFhLEdBQUcsaUJBQXBCOztBQUNBLFVBQUlDLGNBQWMsR0FBR2pHLDJEQUFFLENBQUMsc0JBQUQsRUFBeUIsUUFBekIsQ0FBdkI7O0FBQ0EsVUFBSWtHLGNBQWMsR0FBRyw2Q0FBckI7QUFDQSxVQUFJQyxnQkFBZ0IsR0FBSXhHLFNBQVMsQ0FBQ2lHLE9BQVYsQ0FBa0IvTSxNQUFsQixHQUEyQixDQUE1QixHQUFpQzhHLFNBQVMsQ0FBQ2lHLE9BQVYsQ0FBa0IsQ0FBbEIsQ0FBakMsR0FBd0QsRUFBL0U7O0FBQ0EsVUFBSU8sZ0JBQUosRUFBc0I7QUFDbEJILHFCQUFhLEdBQUdHLGdCQUFnQixDQUFDQyxRQUFqQztBQUNBRixzQkFBYyxHQUFHQyxnQkFBZ0IsQ0FBQ0UsVUFBbEM7QUFDQUosc0JBQWMsR0FBR0UsZ0JBQWdCLENBQUNHLEtBQWxDO0FBQ0g7O0FBQ0QsVUFBSWYsSUFBSSxDQUFDMU0sTUFBTCxHQUFjLENBQWxCLEVBQXNCO0FBQ2xCLFlBQUkwTixzQkFBc0IsR0FBR2hCLElBQUksQ0FBQ2lCLE1BQUwsQ0FBWSxVQUFDVixPQUFELEVBQWE7QUFDbEQsY0FBSUEsT0FBTyxDQUFDVyxPQUFSLElBQW1CdEYsWUFBdkIsRUFBc0M7QUFDbEMsZ0JBQUkyRSxPQUFPLENBQUNQLElBQVIsQ0FBYTFNLE1BQWIsR0FBc0IsQ0FBMUIsRUFBNkI7QUFDekIscUJBQU9pTixPQUFQO0FBQ0g7QUFDSjtBQUNKLFNBTjRCLEVBTTFCbEYsR0FOMEIsQ0FNdEIsVUFBQzhGLEdBQUQsRUFBUztBQUNaLGlCQUFPQSxHQUFHLENBQUNuQixJQUFYO0FBQ0gsU0FSNEIsQ0FBN0I7O0FBU0EsWUFBR2dCLHNCQUFzQixDQUFDMU4sTUFBdkIsR0FBZ0MsQ0FBbkMsRUFBdUM7QUFDbkN5TSx1QkFBYSxHQUFHaUIsc0JBQXNCLENBQUMsQ0FBRCxDQUF0QixDQUEwQjNGLEdBQTFCLENBQThCLFVBQUM3SCxRQUFELEVBQVc4SyxDQUFYLEVBQWlCO0FBQzNELG1CQUFPLHlFQUFDLDJEQUFEO0FBQWEsaUJBQUcsRUFBRUEsQ0FBbEI7QUFBcUIsNkJBQWUsRUFBRWdDLGVBQXRDO0FBQXVELDBCQUFZLEVBQUUxRSxZQUFyRTtBQUFtRiwwQkFBWSxFQUFFcEk7QUFBakcsZUFBK0csTUFBSSxDQUFDNkQsS0FBcEgsRUFBUDtBQUVILFdBSGUsQ0FBaEI7QUFJSDtBQUNKOztBQUNELGFBQ0k7QUFBUyxpQkFBUyxFQUFDLHlCQUFuQjtBQUE2QyxVQUFFLEVBQUM7QUFBaEQsU0FDSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0kseUVBQUMsc0RBQUQ7QUFBTSxpQkFBUyxFQUFDLGtCQUFoQjtBQUFtQyxVQUFFLEVBQUU1QyxnREFBZ0IsQ0FBQ2tGLFFBQWpCLEdBQTRCO0FBQW5FLFNBQ0k7QUFBSyxhQUFLLEVBQUMsTUFBWDtBQUFrQixXQUFHLEVBQUVnSCxjQUF2QjtBQUF1QyxXQUFHLEVBQUVGO0FBQTVDLFFBREosRUFFSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJLHFGQUFLQSxhQUFMLENBREosRUFFSSxxRkFBS0MsY0FBTCxDQUZKLENBRkosQ0FESixFQVFLaEcsc0VBQVksQ0FBQzBCLDRCQUFELEVBQStCLEtBQS9CLEVBQXNDLEtBQUsvRSxLQUEzQyxDQUFaLEdBRUdxRCxzRUFBWSxDQUFDeUIsMkJBQUQsRUFBOEIsRUFBOUIsRUFBa0MsS0FBSzlFLEtBQXZDLEVBQThDakQsNERBQTlDLENBRmYsR0FJRyx5RUFBQyw0Q0FBRCxDQUFPLFFBQVAsUUFDSSxxRkFDSSxxRkFDSTtBQUFRLFlBQUksRUFBQyxhQUFiO0FBQTJCLFlBQUksRUFBQyxRQUFoQztBQUF5QyxpQkFBUyxFQUFDLGFBQW5EO0FBQWlFLGVBQU8sRUFBRSxLQUFLcUk7QUFBL0UsU0FDSTtBQUFHLGlCQUFTLEVBQUM7QUFBYixRQURKLENBREosQ0FESixFQU1JLHFGQUNJLHlFQUFDLHNEQUFEO0FBQU0saUJBQVMsRUFBQyxtQkFBaEI7QUFBb0MsdUJBQVksaUJBQWhEO0FBQWtFLFVBQUUsRUFBRWhJLGdEQUFnQixDQUFDa0YsUUFBakIsR0FBNEIsTUFBbEc7QUFBMEcsZUFBTyxFQUFHLGlCQUFDNEIsQ0FBRDtBQUFBLGlCQUFPLE1BQUksQ0FBQ2tCLGlCQUFMLENBQXVCbEIsQ0FBdkIsRUFBMEIsTUFBMUIsQ0FBUDtBQUFBO0FBQXBILFNBQWdLO0FBQUcsaUJBQVMsRUFBQztBQUFiLFFBQWhLLENBREosQ0FOSixFQVNJLHFGQUNJO0FBQVEsWUFBSSxFQUFDLGNBQWI7QUFBNEIsWUFBSSxFQUFDLFFBQWpDO0FBQTBDLGlCQUFTLEVBQUMsY0FBcEQ7QUFBbUUsZUFBTyxFQUFFLEtBQUtpQjtBQUFqRixTQUNJO0FBQUcsaUJBQVMsRUFBQztBQUFiLFFBREosQ0FESixDQVRKLENBREosQ0FaUixDQURKLEVBaUNRd0Usc0JBQXNCLElBQUloSixTQUExQixJQUF1Q2dKLHNCQUFzQixDQUFDMU4sTUFBdkIsR0FBZ0MsQ0FBdkUsR0FDQTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJLHFGQUFLeU0sYUFBTCxDQURKLENBREEsR0FJRSxFQXJDVixDQURKLEVBeUNJLHlFQUFDLHlEQUFELEVBQWUsS0FBSzFJLEtBQXBCLENBekNKLENBREo7QUE2Q0g7Ozs7RUE5UWNvRSwrQzs7QUFpUm5CLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQUMsS0FBSztBQUFBLFNBQUs7QUFDOUJxRSxRQUFJLEVBQUNyRSxLQUFLLENBQUNxRSxJQUFOLENBQVd0TSxJQURjO0FBRTlCa0ksZ0JBQVksRUFBQ0QsS0FBSyxDQUFDQyxZQUZXO0FBRzlCZSxPQUFHLEVBQUNoQixLQUFLLENBQUNnQixHQUhvQjtBQUk5QndELFlBQVEsRUFBQ3hFLEtBQUssQ0FBQ3dFLFFBSmU7QUFLOUJpQixZQUFRLEVBQUV6RixLQUFLLENBQUN5RixRQUxjO0FBTTlCaEgsYUFBUyxFQUFFdUIsS0FBSyxDQUFDdkIsU0FOYTtBQU85QmlILFlBQVEsRUFBRTFGLEtBQUssQ0FBQzJGLElBQU4sQ0FBVzVOO0FBUFMsR0FBTDtBQUFBLENBQTdCOztBQVVld0ksMEhBQU8sQ0FBRVIsZUFBRixDQUFQLENBQTBCYSxJQUExQixDQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTWdGLGdDQUFnQyxHQUFHLG1DQUF6QztBQUNBLElBQU1DLHVCQUF1QixHQUFHLGlDQUFoQztBQUNBLElBQU1DLDJCQUEyQixHQUFHLHFDQUFwQzs7SUFFREMsVzs7Ozs7QUFFRix1QkFBWXJLLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFFZiw4QkFBTUEsS0FBTixFQUZlLENBSWY7O0FBQ0EsVUFBS3NLLFlBQUwsR0FBb0IsTUFBS0EsWUFBTCxDQUFrQm5LLElBQWxCLDRGQUFwQjtBQUNBLFVBQUtvSyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JwSyxJQUFsQiw0RkFBcEI7QUFDQSxVQUFLcUssb0JBQUwsR0FBNEIsTUFBS0Esb0JBQUwsQ0FBMEJySyxJQUExQiw0RkFBNUI7QUFDQSxVQUFLc0ssd0JBQUwsR0FBZ0MsTUFBS0Esd0JBQUwsQ0FBOEJ0SyxJQUE5Qiw0RkFBaEM7QUFDQSxVQUFLdUssc0JBQUwsR0FBOEIsTUFBS0Esc0JBQUwsQ0FBNEJ2SyxJQUE1Qiw0RkFBOUI7QUFDQSxVQUFLd0ssdUJBQUwsR0FBK0IsTUFBS0EsdUJBQUwsQ0FBNkJ4SyxJQUE3Qiw0RkFBL0I7QUFDQSxVQUFLeUssd0JBQUwsR0FBZ0MsTUFBS0Esd0JBQUwsQ0FBOEJ6SyxJQUE5Qiw0RkFBaEM7QUFDQSxVQUFLMEssaUJBQUwsR0FBeUIsTUFBS0EsaUJBQUwsQ0FBdUIxSyxJQUF2Qiw0RkFBekI7QUFDQSxVQUFLbUUsS0FBTCxHQUFhO0FBQ1R3Ryx5QkFBbUIsRUFBRSxLQURaO0FBRVRDLHNCQUFnQixFQUFFLEtBRlQ7QUFHVEMsbUJBQWEsRUFBRTtBQUhOLEtBQWI7QUFiZTtBQW1CbEI7Ozs7V0FFRCxvQ0FBMkI7QUFDdkIsV0FBS0MsUUFBTCxDQUFjO0FBQ1ZILDJCQUFtQixFQUFFO0FBRFgsT0FBZDtBQUdIOzs7V0FFRCwyQkFBa0I1RyxDQUFsQixFQUFxQmdILFVBQXJCLEVBQWlDQyxNQUFqQyxFQUF5Q0MsY0FBekMsRUFBeUQvRCxZQUF6RCxFQUF1RTtBQUVuRSxVQUFJZ0UsYUFBYSxHQUFHN0ssTUFBTSxDQUFDMEQsQ0FBQyxDQUFDekQsTUFBSCxDQUFOLENBQWlCNkssT0FBakIsQ0FBeUIsd0JBQXpCLEVBQW1ENUssSUFBbkQsQ0FBd0QsS0FBeEQsQ0FBcEI7QUFFQUYsWUFBTSxDQUFDLGlCQUFELENBQU4sQ0FBMEIrSyxHQUExQixDQUE4QixRQUE5QixFQUF3QyxNQUF4QztBQUVBLFVBQUlQLGFBQWEsR0FBRyxLQUFLMUcsS0FBTCxDQUFXMEcsYUFBWCxDQUF5QjlDLFFBQXpCLEVBQXBCOztBQUVBLFVBQUltRCxhQUFhLElBQUksRUFBakIsSUFBdUJBLGFBQWEsSUFBSTFLLFNBQTVDLEVBQXVEO0FBQ25ELFlBQUkwSyxhQUFhLEtBQUssSUFBbEIsSUFBMEJMLGFBQWEsR0FBRyxDQUE5QyxFQUFpRDtBQUM3QyxjQUFRdFAsUUFBUixHQUFxQixLQUFLc0UsS0FBMUIsQ0FBUXRFLFFBQVI7QUFDQSxjQUFJNkksWUFBWSxHQUFHLEtBQUt2RSxLQUFMLENBQVd1RSxZQUE5QjtBQUNBeUcsdUJBQWEsR0FBR1EsUUFBUSxDQUFDUixhQUFELENBQXhCOztBQUNBLGNBQUlHLE1BQU0sSUFBSSxPQUFkLEVBQXVCO0FBQ25CelAsb0JBQVEsQ0FBQytQLGlFQUFVLENBQUMsQ0FBRCxFQUFJbEgsWUFBSixFQUFrQjJHLFVBQWxCLEVBQThCLEVBQTlCLEVBQWtDLEVBQWxDLEVBQXNDRSxjQUF0QyxFQUFzRC9ELFlBQXRELEVBQW9FMkQsYUFBcEUsQ0FBWCxDQUFSO0FBQ0gsV0FGRCxNQUdLO0FBQ0R0UCxvQkFBUSxDQUFDK1AsaUVBQVUsQ0FBQyxDQUFELEVBQUlsSCxZQUFKLEVBQWtCMkcsVUFBbEIsRUFBOEJDLE1BQU0sQ0FBQ08sTUFBckMsRUFBNkMsRUFBN0MsRUFBaUROLGNBQWpELEVBQWlFL0QsWUFBakUsRUFBK0UyRCxhQUEvRSxDQUFYLENBQVI7QUFDSDs7QUFDRCxlQUFLQyxRQUFMLENBQWM7QUFDVkgsK0JBQW1CLEVBQUU7QUFEWCxXQUFkO0FBR0gsU0FiRCxNQWFPLElBQUlPLGFBQWEsS0FBSyxHQUF0QixFQUEyQjtBQUM5QkwsdUJBQWEsR0FBRyxFQUFoQjtBQUNILFNBRk0sTUFFQSxJQUFJSyxhQUFhLEtBQUssR0FBdEIsRUFBMkI7QUFFOUIsY0FBSUwsYUFBYSxDQUFDL08sTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUMxQitPLHlCQUFhLEdBQUdBLGFBQWEsQ0FBQ1csS0FBZCxDQUFvQixDQUFwQixFQUF1QixDQUFDLENBQXhCLENBQWhCO0FBQ0gsV0FGRCxNQUVPO0FBQ0hYLHlCQUFhLEdBQUcsRUFBaEI7QUFDSDtBQUVKLFNBUk0sTUFRQSxJQUFJLENBQUN0RSxLQUFLLENBQUMyRSxhQUFELENBQVYsRUFBMkI7QUFFOUIsY0FBSUwsYUFBYSxLQUFLLEdBQXRCLEVBQTJCO0FBQ3ZCQSx5QkFBYSxHQUFHSyxhQUFhLENBQUNuRCxRQUFkLEVBQWhCO0FBQ0gsV0FGRCxNQUVPO0FBQ0g4Qyx5QkFBYSxHQUFHQSxhQUFhLEdBQUdLLGFBQWEsQ0FBQ25ELFFBQWQsRUFBaEM7QUFDSDtBQUNKLFNBUE0sTUFPQTtBQUNIMUgsZ0JBQU0sQ0FBQyxpQkFBRCxDQUFOLENBQTBCK0ssR0FBMUIsQ0FBOEIsUUFBOUIsRUFBd0MsZUFBeEM7QUFDSDtBQUNKOztBQUVELFdBQUtOLFFBQUwsQ0FBYztBQUNWRCxxQkFBYSxFQUFFQTtBQURMLE9BQWQ7QUFJSDs7O1dBRUQsc0JBQWE1QyxHQUFiLEVBQWtCOEMsVUFBbEIsRUFBOEJDLE1BQTlCLEVBQXNDQyxjQUF0QyxFQUFzRC9ELFlBQXRELEVBQW9FO0FBRWhFLFVBQVEzTCxRQUFSLEdBQXFCLEtBQUtzRSxLQUExQixDQUFRdEUsUUFBUjtBQUNBLFVBQUk2SSxZQUFZLEdBQUcsS0FBS3ZFLEtBQUwsQ0FBV3VFLFlBQTlCOztBQUNBLFVBQUk2RCxHQUFHLElBQUk4QyxVQUFYLEVBQXVCO0FBQ25CLFlBQUlDLE1BQU0sSUFBSSxPQUFkLEVBQXVCO0FBQ25CelAsa0JBQVEsQ0FBQytQLGlFQUFVLENBQUNyRCxHQUFELEVBQU03RCxZQUFOLEVBQW9CMkcsVUFBcEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0NFLGNBQXhDLEVBQXdEL0QsWUFBeEQsQ0FBWCxDQUFSO0FBQ0gsU0FGRCxNQUdLO0FBQ0QzTCxrQkFBUSxDQUFDK1AsaUVBQVUsQ0FBQ3JELEdBQUQsRUFBTTdELFlBQU4sRUFBb0IyRyxVQUFwQixFQUFnQ0MsTUFBTSxDQUFDTyxNQUF2QyxFQUErQyxFQUEvQyxFQUFtRE4sY0FBbkQsRUFBbUUvRCxZQUFuRSxDQUFYLENBQVI7QUFDSDs7QUFDRCxhQUFLNEQsUUFBTCxDQUFjO0FBQ1ZGLDBCQUFnQixFQUFFO0FBRFIsU0FBZDtBQUdIO0FBQ0o7OztXQUVELHNCQUFhYSxTQUFiLEVBQXdCUixjQUF4QixFQUF3Qy9ELFlBQXhDLEVBQXNEO0FBQ2xELFVBQVEzTCxRQUFSLEdBQXFCLEtBQUtzRSxLQUExQixDQUFRdEUsUUFBUjtBQUNBLFVBQUk2SSxZQUFZLEdBQUcsS0FBS3ZFLEtBQUwsQ0FBV3VFLFlBQTlCOztBQUNBLFVBQUlxSCxTQUFKLEVBQWU7QUFDWHZJLDhFQUFZLENBQUN4RCwrRUFBRCxFQUFrQyxJQUFsQyxFQUF3QyxLQUFLRyxLQUE3QyxFQUFvRGpELHlEQUFwRCxDQUFaLElBQ0lyQixRQUFRLENBQUNtUSx3RUFBaUIsQ0FBQ3RILFlBQUQsRUFBZXFILFNBQWYsRUFBMEJSLGNBQTFCLEVBQTBDL0QsWUFBMUMsQ0FBbEIsQ0FEWjtBQUVIO0FBQ0o7OztXQUVELDhCQUFxQm5ELENBQXJCLEVBQXdCNEgsS0FBeEIsRUFBK0I7QUFDM0IsVUFBSTVILENBQUMsQ0FBQzZELEtBQUYsSUFBVyxFQUFmLEVBQW1CO0FBQ2YsWUFBSTdELENBQUMsQ0FBQ3pELE1BQUYsQ0FBU3NMLEtBQVQsR0FBaUIsQ0FBckIsRUFBd0I7QUFDcEIsZUFBS3pCLFlBQUwsQ0FBa0JwRyxDQUFDLENBQUN6RCxNQUFGLENBQVNzTCxLQUEzQixFQUFrQ0QsS0FBSyxDQUFDWixVQUF4QyxFQUFvRFksS0FBSyxDQUFDRSxPQUExRCxFQUFtRUYsS0FBSyxDQUFDRyxZQUF6RSxFQUF1RkgsS0FBSyxDQUFDMUssSUFBN0Y7QUFDSDtBQUNKLE9BSkQsTUFJTyxJQUFJOEMsQ0FBQyxDQUFDNkQsS0FBRixJQUFXLEVBQWYsRUFBbUI7QUFDdEIsYUFBS2tELFFBQUwsQ0FBYztBQUNWRiwwQkFBZ0IsRUFBRTtBQURSLFNBQWQ7QUFHSDtBQUVKOzs7V0FFRCxrQ0FBeUI7QUFDckIsV0FBS0UsUUFBTCxDQUFlLFVBQUFpQixTQUFTO0FBQUEsZUFBSztBQUN6Qm5CLDBCQUFnQixFQUFFLENBQUNtQixTQUFTLENBQUNuQjtBQURKLFNBQUw7QUFBQSxPQUF4QjtBQUdIOzs7V0FFRCxpQ0FBd0I3RyxDQUF4QixFQUEyQjhELE9BQTNCLEVBQW9DO0FBQ2hDLFVBQUk5RCxDQUFDLENBQUM2RCxLQUFGLElBQVcsRUFBZixFQUFtQjtBQUNmMUUsOEVBQVksQ0FBQ3hELCtFQUFELEVBQWtDLElBQWxDLEVBQXdDLEtBQUtHLEtBQTdDLEVBQW9EakQseURBQXBELENBQVosSUFDSSxLQUFLNk4sd0JBQUwsQ0FBOEI1QyxPQUE5QixDQURKO0FBRUgsT0FIRCxNQUdPLElBQUk5RCxDQUFDLENBQUM2RCxLQUFGLElBQVcsRUFBZixFQUFtQjtBQUN0QixhQUFLa0QsUUFBTCxDQUFjO0FBQ1ZGLDBCQUFnQixFQUFFO0FBRFIsU0FBZDtBQUdIO0FBQ0o7OztXQUVELGtDQUF5Qi9DLE9BQXpCLEVBQWtDO0FBQzlCLFVBQUlrRCxVQUFVLEdBQUdsRCxPQUFPLENBQUNrRCxVQUF6QjtBQUNBLFVBQUlDLE1BQU0sR0FBR25ELE9BQU8sQ0FBQ2dFLE9BQXJCO0FBQ0EsVUFBSUcsWUFBWSxHQUFHbkUsT0FBTyxDQUFDb0UsT0FBM0I7QUFDQSxVQUFJaEIsY0FBYyxHQUFHcEQsT0FBTyxDQUFDaUUsWUFBN0I7QUFDQSxVQUFJNUUsWUFBWSxHQUFHVyxPQUFPLENBQUM1RyxJQUEzQjtBQUNBLFVBQVExRixRQUFSLEdBQXFCLEtBQUtzRSxLQUExQixDQUFRdEUsUUFBUjtBQUNBLFVBQU02SSxZQUFZLEdBQUcsS0FBS3ZFLEtBQUwsQ0FBV3VFLFlBQWhDO0FBQ0EsVUFBTThILGtCQUFrQixHQUFHMUYsVUFBVSxDQUFDL0osUUFBUSxDQUFDQyxhQUFULENBQXVCLHlCQUF5QnFPLFVBQWhELEVBQTREYSxLQUE3RCxDQUFyQzs7QUFDQSxVQUFJYixVQUFVLElBQUksQ0FBQ3hFLEtBQUssQ0FBQzJGLGtCQUFELENBQXBCLElBQTRDQSxrQkFBa0IsR0FBRyxDQUFqRSxJQUFzRUEsa0JBQWtCLElBQUlGLFlBQWhHLEVBQThHO0FBQzFHLFlBQUloQixNQUFNLElBQUksT0FBZCxFQUF1QjtBQUNuQnpQLGtCQUFRLENBQUMrUCxpRUFBVSxDQUFDekQsT0FBTyxDQUFDUCxRQUFULEVBQW1CbEQsWUFBbkIsRUFBaUMyRyxVQUFqQyxFQUE2QyxFQUE3QyxFQUFpRG1CLGtCQUFqRCxFQUFxRWpCLGNBQXJFLEVBQXFGL0QsWUFBckYsQ0FBWCxDQUFSO0FBQ0gsU0FGRCxNQUdLO0FBQ0QzTCxrQkFBUSxDQUFDK1AsaUVBQVUsQ0FBQ3pELE9BQU8sQ0FBQ1AsUUFBVCxFQUFtQmxELFlBQW5CLEVBQWlDMkcsVUFBakMsRUFBNkNDLE1BQU0sQ0FBQ08sTUFBcEQsRUFBNERXLGtCQUE1RCxFQUFnRmpCLGNBQWhGLEVBQWdHL0QsWUFBaEcsQ0FBWCxDQUFSO0FBQ0g7O0FBQ0QsYUFBSzRELFFBQUwsQ0FBYztBQUNWRiwwQkFBZ0IsRUFBRTtBQURSLFNBQWQ7QUFHSCxPQVZELE1BVU87QUFDSHZLLGNBQU0sQ0FBQytGLEtBQVAsQ0FBYSxzQkFBYjtBQUNIO0FBQ0o7OztXQUVELGtCQUFTO0FBQUE7O0FBRUwsVUFBSXVGLEtBQUssR0FBRyxLQUFLOUwsS0FBTCxDQUFXc00sWUFBdkI7QUFDQSxVQUFNSCxZQUFZLEdBQUdMLEtBQUssQ0FBQ00sT0FBM0I7QUFDQSxVQUFNRyxhQUFhLEdBQUc1RixVQUFVLENBQUNtRixLQUFLLENBQUNNLE9BQU4sR0FBZ0JOLEtBQUssQ0FBQ3JFLFFBQXZCLENBQVYsQ0FBMkMrRSxPQUEzQyxDQUFtRCxDQUFuRCxDQUF0Qjs7QUFDQSxVQUFJLE9BQU9WLEtBQUssQ0FBQ1csS0FBYixLQUF1QixRQUEzQixFQUFxQztBQUNqQyxZQUFJQyxVQUFVLEdBQUcvRixVQUFVLENBQUNtRixLQUFLLENBQUNXLEtBQU4sQ0FBWUUsT0FBWixDQUFvQiwyQkFBcEIsRUFBaUQsRUFBakQsQ0FBRCxDQUFWLENBQWlFSCxPQUFqRSxDQUF5RSxDQUF6RSxDQUFqQjtBQUNILE9BRkQsTUFHSztBQUNELFlBQUlFLFVBQVUsR0FBRy9GLFVBQVUsQ0FBQ21GLEtBQUssQ0FBQ1csS0FBUCxDQUFWLENBQXdCRCxPQUF4QixDQUFnQyxDQUFoQyxDQUFqQjtBQUNIOztBQUNELFVBQU16QixnQkFBZ0IsR0FBRyxLQUFLekcsS0FBTCxDQUFXeUcsZ0JBQXBDO0FBQ0EsVUFBTUQsbUJBQW1CLEdBQUcsS0FBS3hHLEtBQUwsQ0FBV3dHLG1CQUF2QztBQUNBLFVBQUk4QixVQUFVLEdBQUc3UCx5REFBVyxDQUFDZ0UsS0FBN0I7QUFFQSxVQUFJOEwsYUFBYSxHQUFHLEtBQUs3TSxLQUFMLENBQVdpSixlQUEvQjtBQUNBLFVBQU02RCxZQUFZLEdBQUduRyxVQUFVLENBQUVtRixLQUFLLENBQUNNLE9BQU4sR0FBZ0JOLEtBQUssQ0FBQ3JFLFFBQXZCLEdBQW1DcUUsS0FBSyxDQUFDaUIsUUFBMUMsQ0FBVixDQUE4RFAsT0FBOUQsQ0FBc0UsQ0FBdEUsQ0FBckI7QUFDQSxVQUFNUSxjQUFjLEdBQUdsQixLQUFLLENBQUN0USxJQUFOLElBQWMsWUFBckM7QUFDQSxVQUFJeVIsU0FBUyxHQUFHLEVBQWhCOztBQUNBLFVBQUksQ0FBQ0QsY0FBRCxJQUFtQkYsWUFBWSxHQUFHLENBQXRDLEVBQXlDO0FBQ3JDRyxpQkFBUyxHQUFHLDRGQUFPLDJGQUFPQyx1RUFBYSxDQUFDWCxhQUFELEVBQWdCTSxhQUFoQixDQUFwQixNQUFQLE9BQW1FSyx1RUFBYSxDQUFDUixVQUFELEVBQWFHLGFBQWIsQ0FBaEYsTUFBWjtBQUNILE9BRkQsTUFFTztBQUNISSxpQkFBUyxHQUFHLHVGQUFPQyx1RUFBYSxDQUFDUixVQUFELEVBQWFHLGFBQWIsQ0FBcEIsTUFBWjtBQUNIOztBQUNELFVBQUlNLFNBQVMsR0FBR3BRLHlEQUFXLENBQUNvUSxTQUE1QjtBQUNBLFVBQU1DLDBCQUEwQixHQUM1QixzRkFDSTtBQUFLLGFBQUssRUFBQyw0QkFBWDtBQUF3QyxlQUFPLEVBQUUsS0FBSzNDO0FBQXRELFFBREosRUFFSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0k7QUFBTyxZQUFJLEVBQUMsUUFBWjtBQUFxQixpQkFBUyxFQUFDLGdCQUEvQjtBQUFnRCxhQUFLLEVBQUUsS0FBS25HLEtBQUwsQ0FBVzBHO0FBQWxFLFFBREosRUFFSTtBQUFRLFlBQUksRUFBQyxRQUFiO0FBQXNCLFlBQUksRUFBQyxRQUEzQjtBQUFvQyxpQkFBUyxFQUFDLDhCQUE5QztBQUE2RSxvQkFBUyxJQUF0RjtBQUEyRixlQUFPLEVBQUUsaUJBQUE5RyxDQUFDO0FBQUEsaUJBQUksTUFBSSxDQUFDMkcsaUJBQUwsQ0FBdUIzRyxDQUF2QixFQUEwQjRILEtBQUssQ0FBQ1osVUFBaEMsRUFBNENZLEtBQUssQ0FBQ0UsT0FBbEQsRUFBMkRGLEtBQUssQ0FBQ0csWUFBakUsRUFBK0VILEtBQUssQ0FBQzFLLElBQXJGLENBQUo7QUFBQTtBQUFyRyxjQUZKLENBREosRUFLSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0k7QUFBUSxZQUFJLEVBQUMsUUFBYjtBQUFzQixZQUFJLEVBQUMsU0FBM0I7QUFBcUMsaUJBQVMsRUFBQywrQkFBL0M7QUFBK0Usb0JBQVMsR0FBeEY7QUFBNEYsZUFBTyxFQUFFLGlCQUFBOEMsQ0FBQztBQUFBLGlCQUFJLE1BQUksQ0FBQzJHLGlCQUFMLENBQXVCM0csQ0FBdkIsRUFBMEI0SCxLQUFLLENBQUNaLFVBQWhDLEVBQTRDWSxLQUFLLENBQUNFLE9BQWxELEVBQTJERixLQUFLLENBQUNHLFlBQWpFLEVBQStFSCxLQUFLLENBQUMxSyxJQUFyRixDQUFKO0FBQUE7QUFBdEcsYUFESixFQUVJO0FBQVEsWUFBSSxFQUFDLFFBQWI7QUFBc0IsWUFBSSxFQUFDLFNBQTNCO0FBQXFDLGlCQUFTLEVBQUMsK0JBQS9DO0FBQStFLG9CQUFTLEdBQXhGO0FBQTRGLGVBQU8sRUFBRSxpQkFBQThDLENBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUMyRyxpQkFBTCxDQUF1QjNHLENBQXZCLEVBQTBCNEgsS0FBSyxDQUFDWixVQUFoQyxFQUE0Q1ksS0FBSyxDQUFDRSxPQUFsRCxFQUEyREYsS0FBSyxDQUFDRyxZQUFqRSxFQUErRUgsS0FBSyxDQUFDMUssSUFBckYsQ0FBSjtBQUFBO0FBQXRHLGFBRkosRUFHSTtBQUFRLFlBQUksRUFBQyxRQUFiO0FBQXNCLFlBQUksRUFBQyxXQUEzQjtBQUF1QyxpQkFBUyxFQUFDLGlDQUFqRDtBQUFtRixvQkFBUyxHQUE1RjtBQUFnRyxlQUFPLEVBQUUsaUJBQUE4QyxDQUFDO0FBQUEsaUJBQUksTUFBSSxDQUFDMkcsaUJBQUwsQ0FBdUIzRyxDQUF2QixFQUEwQjRILEtBQUssQ0FBQ1osVUFBaEMsRUFBNENZLEtBQUssQ0FBQ0UsT0FBbEQsRUFBMkRGLEtBQUssQ0FBQ0csWUFBakUsRUFBK0VILEtBQUssQ0FBQzFLLElBQXJGLENBQUo7QUFBQTtBQUExRyxhQUhKLENBREosRUFNSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQVEsWUFBSSxFQUFDLFFBQWI7QUFBc0IsWUFBSSxFQUFDLFVBQTNCO0FBQXNDLGlCQUFTLEVBQUMsZ0NBQWhEO0FBQWlGLG9CQUFTLEdBQTFGO0FBQThGLGVBQU8sRUFBRSxpQkFBQThDLENBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUMyRyxpQkFBTCxDQUF1QjNHLENBQXZCLEVBQTBCNEgsS0FBSyxDQUFDWixVQUFoQyxFQUE0Q1ksS0FBSyxDQUFDRSxPQUFsRCxFQUEyREYsS0FBSyxDQUFDRyxZQUFqRSxFQUErRUgsS0FBSyxDQUFDMUssSUFBckYsQ0FBSjtBQUFBO0FBQXhHLGFBREosRUFFSTtBQUFRLFlBQUksRUFBQyxRQUFiO0FBQXNCLFlBQUksRUFBQyxVQUEzQjtBQUFzQyxpQkFBUyxFQUFDLGdDQUFoRDtBQUFpRixvQkFBUyxHQUExRjtBQUE4RixlQUFPLEVBQUUsaUJBQUE4QyxDQUFDO0FBQUEsaUJBQUksTUFBSSxDQUFDMkcsaUJBQUwsQ0FBdUIzRyxDQUF2QixFQUEwQjRILEtBQUssQ0FBQ1osVUFBaEMsRUFBNENZLEtBQUssQ0FBQ0UsT0FBbEQsRUFBMkRGLEtBQUssQ0FBQ0csWUFBakUsRUFBK0VILEtBQUssQ0FBQzFLLElBQXJGLENBQUo7QUFBQTtBQUF4RyxhQUZKLEVBR0k7QUFBUSxZQUFJLEVBQUMsUUFBYjtBQUFzQixZQUFJLEVBQUMsU0FBM0I7QUFBcUMsaUJBQVMsRUFBQywrQkFBL0M7QUFBK0Usb0JBQVMsR0FBeEY7QUFBNEYsZUFBTyxFQUFFLGlCQUFBOEMsQ0FBQztBQUFBLGlCQUFJLE1BQUksQ0FBQzJHLGlCQUFMLENBQXVCM0csQ0FBdkIsRUFBMEI0SCxLQUFLLENBQUNaLFVBQWhDLEVBQTRDWSxLQUFLLENBQUNFLE9BQWxELEVBQTJERixLQUFLLENBQUNHLFlBQWpFLEVBQStFSCxLQUFLLENBQUMxSyxJQUFyRixDQUFKO0FBQUE7QUFBdEcsYUFISixDQU5KLEVBV0k7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDSTtBQUFRLFlBQUksRUFBQyxRQUFiO0FBQXNCLFlBQUksRUFBQyxXQUEzQjtBQUF1QyxpQkFBUyxFQUFDLGlDQUFqRDtBQUFtRixvQkFBUyxHQUE1RjtBQUFnRyxlQUFPLEVBQUUsaUJBQUE4QyxDQUFDO0FBQUEsaUJBQUksTUFBSSxDQUFDMkcsaUJBQUwsQ0FBdUIzRyxDQUF2QixFQUEwQjRILEtBQUssQ0FBQ1osVUFBaEMsRUFBNENZLEtBQUssQ0FBQ0UsT0FBbEQsRUFBMkRGLEtBQUssQ0FBQ0csWUFBakUsRUFBK0VILEtBQUssQ0FBQzFLLElBQXJGLENBQUo7QUFBQTtBQUExRyxhQURKLEVBRUk7QUFBUSxZQUFJLEVBQUMsUUFBYjtBQUFzQixZQUFJLEVBQUMsV0FBM0I7QUFBdUMsaUJBQVMsRUFBQyxpQ0FBakQ7QUFBbUYsb0JBQVMsR0FBNUY7QUFBZ0csZUFBTyxFQUFFLGlCQUFBOEMsQ0FBQztBQUFBLGlCQUFJLE1BQUksQ0FBQzJHLGlCQUFMLENBQXVCM0csQ0FBdkIsRUFBMEI0SCxLQUFLLENBQUNaLFVBQWhDLEVBQTRDWSxLQUFLLENBQUNFLE9BQWxELEVBQTJERixLQUFLLENBQUNHLFlBQWpFLEVBQStFSCxLQUFLLENBQUMxSyxJQUFyRixDQUFKO0FBQUE7QUFBMUcsYUFGSixFQUdJO0FBQVEsWUFBSSxFQUFDLFFBQWI7QUFBc0IsWUFBSSxFQUFDLFVBQTNCO0FBQXNDLGlCQUFTLEVBQUMsZ0NBQWhEO0FBQWlGLG9CQUFTLEdBQTFGO0FBQThGLGVBQU8sRUFBRSxpQkFBQThDLENBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUMyRyxpQkFBTCxDQUF1QjNHLENBQXZCLEVBQTBCNEgsS0FBSyxDQUFDWixVQUFoQyxFQUE0Q1ksS0FBSyxDQUFDRSxPQUFsRCxFQUEyREYsS0FBSyxDQUFDRyxZQUFqRSxFQUErRUgsS0FBSyxDQUFDMUssSUFBckYsQ0FBSjtBQUFBO0FBQXhHLGFBSEosQ0FYSixFQWlCSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQVEsWUFBSSxFQUFDLFFBQWI7QUFBc0IsWUFBSSxFQUFDLFVBQTNCO0FBQXNDLGlCQUFTLEVBQUMsZ0NBQWhEO0FBQWlGLG9CQUFTLEdBQTFGO0FBQThGLGVBQU8sRUFBRSxpQkFBQThDLENBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUMyRyxpQkFBTCxDQUF1QjNHLENBQXZCLEVBQTBCNEgsS0FBSyxDQUFDWixVQUFoQyxFQUE0Q1ksS0FBSyxDQUFDRSxPQUFsRCxFQUEyREYsS0FBSyxDQUFDRyxZQUFqRSxFQUErRUgsS0FBSyxDQUFDMUssSUFBckYsQ0FBSjtBQUFBO0FBQXhHLFNBQXdNO0FBQU0saUJBQVMsRUFBQztBQUFoQixRQUF4TSxDQURKLEVBRUk7QUFBUSxZQUFJLEVBQUMsUUFBYjtBQUFzQixZQUFJLEVBQUMsYUFBM0I7QUFBeUMsaUJBQVMsRUFBQyxtQ0FBbkQ7QUFBdUYsb0JBQVMsR0FBaEc7QUFBb0csZUFBTyxFQUFFLGlCQUFBOEMsQ0FBQztBQUFBLGlCQUFJLE1BQUksQ0FBQzJHLGlCQUFMLENBQXVCM0csQ0FBdkIsRUFBMEI0SCxLQUFLLENBQUNaLFVBQWhDLEVBQTRDWSxLQUFLLENBQUNFLE9BQWxELEVBQTJERixLQUFLLENBQUNHLFlBQWpFLEVBQStFSCxLQUFLLENBQUMxSyxJQUFyRixDQUFKO0FBQUE7QUFBOUcsYUFGSixFQUdJO0FBQVEsWUFBSSxFQUFDLFFBQWI7QUFBc0IsWUFBSSxFQUFDLFlBQTNCO0FBQXdDLGlCQUFTLEVBQUMsa0NBQWxEO0FBQXFGLG9CQUFTLEdBQTlGO0FBQWtHLGVBQU8sRUFBRSxpQkFBQThDLENBQUM7QUFBQSxpQkFBSSxNQUFJLENBQUMyRyxpQkFBTCxDQUF1QjNHLENBQXZCLEVBQTBCNEgsS0FBSyxDQUFDWixVQUFoQyxFQUE0Q1ksS0FBSyxDQUFDRSxPQUFsRCxFQUEyREYsS0FBSyxDQUFDRyxZQUFqRSxFQUErRUgsS0FBSyxDQUFDMUssSUFBckYsQ0FBSjtBQUFBO0FBQTVHLFNBQTZNd0wsVUFBN00sQ0FISixDQWpCSixDQUxKLENBRkosQ0FESjtBQWtDQSxVQUFJUyxHQUFHLEdBQUdoSyxzRUFBWSxDQUFDOEcsdUJBQUQsRUFBMEIsRUFBMUIsRUFBNkIyQixLQUE3QixDQUF0QjtBQUNBLFVBQUl3QixJQUFJLEdBQUcscUZBQ0YsQ0FBQ04sY0FBRCxJQUFtQjNKLHNFQUFZLENBQUM2RyxnQ0FBRCxFQUFtQyxJQUFuQyxFQUF5QyxJQUF6QyxDQUEvQixHQUFnRjtBQUFHLGlCQUFTLEVBQUMsMkJBQWI7QUFBeUMsZUFBTyxFQUFHLGlCQUFDaEcsQ0FBRDtBQUFBLGlCQUFPLE1BQUksQ0FBQ29HLFlBQUwsQ0FBa0IsQ0FBQyxDQUFuQixFQUFzQndCLEtBQUssQ0FBQ1osVUFBNUIsRUFBd0NZLEtBQUssQ0FBQ0UsT0FBOUMsRUFBdURGLEtBQUssQ0FBQ0csWUFBN0QsRUFBMkVILEtBQUssQ0FBQzFLLElBQWpGLENBQVA7QUFBQTtBQUFuRCxRQUFoRixHQUEwTyxFQUR4TyxFQUVGLENBQUM0TCxjQUFELEdBQWtCLEdBQWxCLEdBQXdCLEVBRnRCLEVBR0ZsQixLQUFLLENBQUNyRSxRQUhKLEVBSUYsQ0FBQ3VGLGNBQUQsR0FBa0IsRUFBbEIsR0FBdUIsVUFKckIsRUFLRixDQUFDQSxjQUFELElBQW1CM0osc0VBQVksQ0FBQzZHLGdDQUFELEVBQW1DLElBQW5DLEVBQXlDLElBQXpDLENBQS9CLEdBQWdGO0FBQUcsaUJBQVMsRUFBQywwQkFBYjtBQUF3QyxlQUFPLEVBQUcsaUJBQUNoRyxDQUFEO0FBQUEsaUJBQU8sTUFBSSxDQUFDb0csWUFBTCxDQUFrQixDQUFsQixFQUFxQndCLEtBQUssQ0FBQ1osVUFBM0IsRUFBdUNZLEtBQUssQ0FBQ0UsT0FBN0MsRUFBc0RGLEtBQUssQ0FBQ0csWUFBNUQsRUFBMEVILEtBQUssQ0FBQzFLLElBQWhGLENBQVA7QUFBQTtBQUFsRCxRQUFoRixHQUF3TyxFQUx0TyxFQU1GLENBQUM0TCxjQUFELElBQW1CLENBQUNsQyxtQkFBcEIsR0FBMEM7QUFBRyxpQkFBUyxFQUFDLHFCQUFiO0FBQW1DLGVBQU8sRUFBRyxpQkFBQzVHLENBQUQ7QUFBQSxpQkFBTyxNQUFJLENBQUNzRyxvQkFBTCxFQUFQO0FBQUE7QUFBN0MsUUFBMUMsR0FBbUksRUFOakksRUFPRixDQUFDd0MsY0FBRCxJQUFtQmxDLG1CQUFuQixHQUF5Q3NDLDBCQUF6QyxHQUFzRSxFQVBwRSxDQUFYO0FBU0FFLFVBQUksR0FBR2pLLHNFQUFZLENBQUMrRywyQkFBRCxFQUErQmtELElBQS9CLEVBQXFDeEIsS0FBckMsQ0FBbkI7QUFDQSxhQUFRO0FBQUksaUJBQVMsRUFBRXVCO0FBQWYsU0FDSjtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQUssaUJBQVMsRUFBQyxjQUFmO0FBQThCLGVBQU8sRUFBRyxpQkFBQ25KLENBQUQ7QUFBQSxpQkFBTyxNQUFJLENBQUN3RyxzQkFBTCxFQUFQO0FBQUE7QUFBeEMsU0FDSTtBQUFLLGFBQUssRUFBQyxNQUFYO0FBQWtCLGlCQUFTLEVBQUM7QUFBNUIsU0FDSTtBQUFHLGlCQUFTLEVBQUM7QUFBYixRQURKLENBREosRUFJSTtBQUFLLGFBQUssRUFBQyxLQUFYO0FBQWlCLGlCQUFTLEVBQUM7QUFBM0IsU0FDSSxxRkFBSzZDLHlEQUFlLENBQUN6QixLQUFLLENBQUMxSyxJQUFQLENBQXBCLENBREosRUFFSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNLLENBQUM0TCxjQUFELElBQW1CRixZQUFZLEdBQUcsQ0FBbEMsR0FBc0MsTUFDbkNJLHVFQUFhLENBQUNKLFlBQUQsRUFBZUQsYUFBZixDQURzQixHQUNVLEdBRFYsR0FDZ0J6SiwyREFBRSxDQUFDLFVBQUQsRUFBYSxRQUFiLENBRHhELEdBQ2lGLEVBRnRGLENBRkosRUFNSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUF5QzBJLEtBQUssQ0FBQ3JFLFFBQS9DLE9BQTBEMEYsU0FBMUQsQ0FOSixDQUpKLENBREosRUFjSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0tGLFNBREwsRUFFS00seURBQWUsQ0FBQ3pCLEtBQUssQ0FBQzBCLFNBQVAsQ0FGcEIsQ0FESixFQUtLbkssc0VBQVksQ0FBQzZHLGdDQUFELEVBQW1DLElBQW5DLEVBQXlDLElBQXpDLENBQVosR0FDRztBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUNJO0FBQUcsaUJBQVMsRUFBQywyQkFBYjtBQUF5QyxlQUFPLEVBQUcsaUJBQUNoRyxDQUFEO0FBQUEsaUJBQU8sTUFBSSxDQUFDcUcsWUFBTCxDQUFrQnVCLEtBQUssQ0FBQzJCLE1BQXhCLEVBQWdDM0IsS0FBSyxDQUFDRyxZQUF0QyxFQUFvREgsS0FBSyxDQUFDMUssSUFBMUQsQ0FBUDtBQUFBO0FBQW5ELFFBREosQ0FESCxHQUlLLEVBVFYsQ0FkSixDQURJLEVBMkJILENBQUM0TCxjQUFELElBQW1CakMsZ0JBQW5CLEdBQ0c7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDSSxvRkFDSTtBQUFPLFdBQUcsRUFBQztBQUFYLFNBQXdCM0gsMkRBQUUsQ0FBQyxVQUFELEVBQWEsUUFBYixDQUExQixDQURKLEVBRUk7QUFBTyxVQUFFLEVBQUMsVUFBVjtBQUFxQixpQkFBUyxFQUFFLHNCQUFzQjBJLEtBQUssQ0FBQ1osVUFBNUQ7QUFBd0UsV0FBRyxFQUFFaUIsWUFBN0U7QUFBMkYsV0FBRyxFQUFDLEdBQS9GO0FBQW1HLFlBQUksRUFBQyxRQUF4RztBQUFpSCxpQkFBUyxNQUExSDtBQUEySCxlQUFPLEVBQUUsaUJBQUNqSSxDQUFEO0FBQUEsaUJBQU8sTUFBSSxDQUFDc0csb0JBQUwsQ0FBMEJ0RyxDQUExQixFQUE2QjRILEtBQTdCLENBQVA7QUFBQTtBQUFwSSxRQUZKLENBREosRUFLSSxvRkFDSTtBQUFPLFdBQUcsRUFBQztBQUFYLFNBQXFCMUksMkRBQUUsQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUF2QixPQUE2Qyx3RkFBUUEsMkRBQUUsQ0FBQyxlQUFELEVBQWtCLFFBQWxCLENBQVYsQ0FBN0MsQ0FESixFQUVJO0FBQU8sVUFBRSxFQUFDLE9BQVY7QUFBa0IsaUJBQVMsRUFBRSx3QkFBd0IwSSxLQUFLLENBQUNaLFVBQTNEO0FBQXVFLFdBQUcsRUFBRWlCLFlBQTVFO0FBQTBGLFdBQUcsRUFBQyxHQUE5RjtBQUFrRyxZQUFJLEVBQUMsUUFBdkc7QUFBZ0gsZUFBTyxFQUFFLGlCQUFDakksQ0FBRDtBQUFBLGlCQUFPLE1BQUksQ0FBQ3lHLHVCQUFMLENBQTZCekcsQ0FBN0IsRUFBZ0M0SCxLQUFoQyxDQUFQO0FBQUE7QUFBekgsUUFGSixDQUxKLENBREgsR0FXSyxFQXRDRixDQUFSO0FBd0NIOzs7O0VBN1FxQjFILCtDOztBQWdSMUIsU0FBU0ksa0JBQVQsQ0FBNEI5SSxRQUE1QixFQUFzQztBQUNsQyxTQUFPK0ksTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBRWhKLFlBQVEsRUFBUkE7QUFBRixHQUFkLEVBQTRCaUosZ0VBQWtCLENBQUM7QUFBRThHLGNBQVUsRUFBVkEseURBQUY7QUFBY0kscUJBQWlCLEVBQWpCQSxnRUFBaUJBO0FBQS9CLEdBQUQsRUFBb0NuUSxRQUFwQyxDQUE5QyxDQUFQO0FBQ0g7O0FBRWNtSiwwSEFBTyxDQUFDTCxrQkFBRCxDQUFQLENBQTRCNkYsV0FBNUIsQ0FBZixFOzs7Ozs7Ozs7OztBQ2xTQSx1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1xRCx3QkFBd0IsR0FBRyxrQ0FBakM7QUFDQSxJQUFNQyxxQ0FBcUMsR0FBRyx3Q0FBOUM7QUFDQSxJQUFNQywyQkFBMkIsR0FBRyxxQ0FBcEM7QUFDQSxJQUFNQyx3QkFBd0IsR0FBRyxtQ0FBakM7QUFDQSxJQUFNQywyQkFBMkIsR0FBRyxzQ0FBcEM7QUFDQSxJQUFNQyxpQ0FBaUMsR0FBRyx5Q0FBMUM7QUFDQSxJQUFNQyw2QkFBNkIsR0FBRyxnQ0FBdEM7O0lBR0RDLFM7Ozs7O0FBRUYscUJBQVlqTyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBRWYsOEJBQU1BLEtBQU47QUFFQSxVQUFLc0UsS0FBTCxHQUFhO0FBQ1Q0SixjQUFRLEVBQUU7QUFDTkMsY0FBTSxFQUFFLEVBREY7QUFFTjNTLFlBQUksRUFBRTtBQUZBO0FBREQsS0FBYjtBQU9BLFVBQUs0UyxnQkFBTCxHQUF3QixNQUFLQSxnQkFBTCxDQUFzQmpPLElBQXRCLDRGQUF4QjtBQUNBLFVBQUtrTyxlQUFMLEdBQXVCLE1BQUtBLGVBQUwsQ0FBcUJsTyxJQUFyQiw0RkFBdkI7QUFDQSxVQUFLbU8sbUJBQUwsR0FBMkIsTUFBS0EsbUJBQUwsQ0FBeUJuTyxJQUF6Qiw0RkFBM0I7QUFDQSxVQUFLb08sa0JBQUwsR0FBMEIsTUFBS0Esa0JBQUwsQ0FBd0JwTyxJQUF4Qiw0RkFBMUI7QUFDQSxVQUFLcU8sZ0JBQUwsR0FBd0IsTUFBS0EsZ0JBQUwsQ0FBc0JyTyxJQUF0Qiw0RkFBeEI7QUFDQSxVQUFLc08sZ0JBQUwsR0FBd0IsTUFBS0EsZ0JBQUwsQ0FBc0J0TyxJQUF0Qiw0RkFBeEI7QUFDQSxVQUFLdU8sbUJBQUwsR0FBMkIsTUFBS0EsbUJBQUwsQ0FBeUJ2TyxJQUF6Qiw0RkFBM0I7QUFDQSxVQUFLd08sbUJBQUwsR0FBMkIsTUFBS0EsbUJBQUwsQ0FBeUJ4TyxJQUF6Qiw0RkFBM0I7QUFDQSxVQUFLeU8sa0JBQUwsR0FBMEIsTUFBS0Esa0JBQUwsQ0FBd0J6TyxJQUF4Qiw0RkFBMUI7QUFuQmU7QUFxQmxCOzs7O1dBRUQsNEJBQW1CK0QsQ0FBbkIsRUFBc0I7QUFFbEIsVUFBSTJLLFVBQVUsR0FBR3JPLE1BQU0sQ0FBQzBELENBQUMsQ0FBQ3pELE1BQUgsQ0FBTixDQUFpQjZLLE9BQWpCLENBQXlCLE1BQXpCLEVBQWlDNUssSUFBakMsQ0FBc0MsUUFBdEMsQ0FBakI7QUFDQSxVQUFRaEYsUUFBUixHQUFxQixLQUFLc0UsS0FBMUIsQ0FBUXRFLFFBQVI7QUFDQSxVQUFJaU4sSUFBSSxHQUFHLEtBQUszSSxLQUFMLENBQVcySSxJQUF0QjtBQUVBLFVBQUltRyxTQUFTLEdBQUduRyxJQUFJLENBQUN0TSxJQUFyQjtBQUNBLFVBQUkwUyxTQUFTLEdBQUdELFNBQVMsQ0FBQyxDQUFELENBQVQsSUFBZ0JuTyxTQUFoQixHQUE0Qm1PLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYWpGLE9BQXpDLEdBQW1ELENBQW5FOztBQUVBLFVBQUlnRixVQUFKLEVBQWdCO0FBRVpuVCxnQkFBUSxDQUFDc1QscUVBQVksQ0FBQ0QsU0FBRCxFQUFZRixVQUFaLENBQWIsQ0FBUjtBQUVBblQsZ0JBQVEsQ0FBQytGLHVFQUFjLEVBQWYsQ0FBUjtBQUVBakIsY0FBTSxDQUFDK0UsT0FBUCxDQUFlO0FBQ1hDLGVBQUssRUFBRXpJLHlEQUFXLENBQUNrUyxZQURSO0FBRVh2SixpQkFBTyxFQUFFM0kseURBQVcsQ0FBQ21TLDBCQUZWO0FBR1hDLG1CQUFTLEVBQUUsbUJBSEE7QUFJWDNULGNBQUksRUFBRSxPQUpLO0FBS1g0VCxtQkFBUyxFQUFFLGNBTEE7QUFNWHZKLGlCQUFPLEVBQUU7QUFDTHdKLHdCQUFZLEVBQUU7QUFDVnpPLGtCQUFJLEVBQUU3RCx5REFBVyxDQUFDdVMsZUFEUjtBQUVWdEosc0JBQVEsRUFBRTtBQUZBO0FBRFQ7QUFORSxTQUFmO0FBY0g7QUFFSjs7OzttSkFFRCxpQkFBdUI5QixDQUF2QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVV5RSxvQkFGVixHQUVpQixLQUFLM0ksS0FBTCxDQUFXMkksSUFGNUI7QUFJUTVGLHlCQUpSLEdBSW9CLEtBQUsvQyxLQUFMLENBQVcrQyxTQUovQjtBQU1VMEoscUJBTlYsR0FNa0I5RCxJQUFJLENBQUM4RCxLQU52QjtBQVFZL1Esd0JBUlosR0FReUIsS0FBS3NFLEtBUjlCLENBUVl0RSxRQVJaO0FBVVVvVCx5QkFWVixHQVVzQm5HLElBQUksQ0FBQ3RNLElBQUwsQ0FBVUosTUFBVixHQUFtQixDQUFuQixHQUF1QjBNLElBQUksQ0FBQ3RNLElBQUwsQ0FBVSxDQUFWLEVBQWFzTSxJQUFwQyxHQUEyQyxFQVZqRTs7QUFBQSxxQkFZUTVGLFNBQVMsQ0FBQ2lHLE9BQVYsQ0FBa0IvTSxNQVoxQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxzQkFjWTZTLFNBQVMsQ0FBQzdTLE1BQVYsR0FBbUIsQ0FkL0I7QUFBQTtBQUFBO0FBQUE7O0FBZ0JrQjZTLDBCQWhCbEIsR0FnQjhCbkcsSUFBSSxDQUFDdE0sSUFBTCxDQUFVLENBQVYsRUFBYXNNLElBaEIzQztBQWtCa0JrQix1QkFsQmxCLEdBa0I0QmxCLElBQUksQ0FBQ3RNLElBQUwsQ0FBVSxDQUFWLEVBQWF3TixPQWxCekM7O0FBQUEsc0JBb0JnQmpPLFdBQVcsQ0FBQzJULDhCQUFaLElBQThDLENBcEI5RDtBQUFBO0FBQUE7QUFBQTs7QUFBQSxxQkFzQm9CQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BdEJyQztBQUFBO0FBQUE7QUFBQTs7QUF3QndCMVQsc0JBeEJ4QixHQXdCaUNOLFFBQVEsQ0FBQ2lVLDJFQUFvQixDQUFDYixVQUFELENBQXJCLENBeEJ6QztBQUFBO0FBQUEsdUJBMEJ1RDlTLE1BQU0sQ0FBQ0QsSUFBUCxDQUFZLFVBQUM2VCxnQkFBRCxFQUFzQjtBQUVqRSx5QkFBT2QsVUFBUyxDQUFDbEYsTUFBVixDQUFpQixVQUFDaUcsU0FBRDtBQUFBLDJCQUFlRCxnQkFBZ0IsQ0FBQ0Usa0JBQWpCLENBQW9DQyxRQUFwQyxDQUE2Q0YsU0FBUyxDQUFDM0UsVUFBdkQsQ0FBZjtBQUFBLG1CQUFqQixDQUFQO0FBRUgsaUJBSmtDLENBMUJ2RDs7QUFBQTtBQTBCMEI4RSxvQ0ExQjFCOztBQWdDb0Isb0JBQUlBLG9CQUFvQixJQUFJclAsU0FBeEIsSUFBcUNxUCxvQkFBb0IsQ0FBQy9ULE1BQXJCLEdBQThCLENBQXZFLEVBQTBFO0FBRXRFaUksbUJBQUMsQ0FBQzVELGNBQUY7QUFFTTJQLG1DQUpnRSxHQUk1Q25CLFVBQVMsQ0FBQ2xGLE1BQVYsQ0FBaUIsVUFBQ2lHLFNBQUQ7QUFBQSwyQkFBZSxDQUFDRyxvQkFBb0IsQ0FBQ0QsUUFBckIsQ0FBOEJGLFNBQTlCLENBQWhCO0FBQUEsbUJBQWpCLENBSjRDO0FBTWxFSyxzQ0FOa0UsR0FNM0MsRUFOMkM7QUFRdEVGLHNDQUFvQixDQUFDRyxPQUFyQixDQUE2QixVQUFDQyxlQUFELEVBQXFCO0FBRTlDRix3Q0FBb0IsQ0FBQzlOLElBQXJCLENBQTBCZ08sZUFBZSxDQUFDaFAsSUFBMUM7QUFFSCxtQkFKRDtBQU1JaVAsNENBZGtFLEdBY3JDSCxvQkFBb0IsQ0FBQ0ksSUFBckIsQ0FBMEIsSUFBMUIsQ0FkcUM7O0FBZ0J0RSxzQkFBSUosb0JBQW9CLENBQUNLLEtBQXJCLEdBQTZCLENBQWpDLEVBQW9DO0FBQ2hDRiw4Q0FBMEIsR0FBR0EsMEJBQTBCLEdBQUd0VCx5REFBVyxDQUFDeVQsR0FBekMsR0FBK0N6VCx5REFBVyxDQUFDMFQseUJBQXhGO0FBQ0gsbUJBRkQsTUFFTztBQUNISiw4Q0FBMEIsR0FBR0EsMEJBQTBCLEdBQUd0VCx5REFBVyxDQUFDMlQsRUFBekMsR0FBOEMzVCx5REFBVyxDQUFDMFQseUJBQXZGO0FBRUg7O0FBRURqUSx3QkFBTSxDQUFDK0UsT0FBUCxDQUFlO0FBQ1hDLHlCQUFLLEVBQUV6SSx5REFBVyxDQUFDNFQsWUFEUjtBQUVYakwsMkJBQU8sRUFBRTJLLDBCQUZFO0FBR1hPLHFDQUFpQixFQUFFLDZCQUFZO0FBQzNCLDZCQUFPLFlBQVAsQ0FEMkIsQ0FDTjtBQUN4QixxQkFMVTtBQU1YL0ssMkJBQU8sRUFBRTtBQUNMNEgsNEJBQU0sRUFBRTtBQUNKekgsZ0NBQVEsRUFBRSxpQkFETjtBQUVKWCw4QkFBTSxFQUFFLGtCQUFZO0FBQ2hCM0osa0NBQVEsQ0FBQ21WLHFGQUE4QixDQUFDWixpQkFBRCxFQUFvQnBHLE9BQXBCLENBQS9CLENBQVI7QUFDSDtBQUpHLHVCQURIO0FBT0xpSCwyQkFBSyxFQUFFO0FBUEY7QUFORSxtQkFBZjtBQWlCSDs7QUF4RXJCO0FBQUE7O0FBQUE7QUEyRW9CNU0saUJBQUMsQ0FBQzVELGNBQUY7QUFDQUUsc0JBQU0sQ0FBQytGLEtBQVAsQ0FBYSxrRUFBYjs7QUE1RXBCO0FBQUE7QUFBQTs7QUFBQTtBQW1GWXJDLGlCQUFDLENBQUM1RCxjQUFGO0FBRUFFLHNCQUFNLENBQUMrRSxPQUFQLENBQWU7QUFDWEMsdUJBQUssRUFBRXpJLHlEQUFXLENBQUM0VCxZQURSO0FBRVhqTCx5QkFBTyxFQUFFM0kseURBQVcsQ0FBQ2dVLGVBRlY7QUFHWEgsbUNBQWlCLEVBQUUsNkJBQVk7QUFDM0IsMkJBQU8sWUFBUCxDQUQyQixDQUNOO0FBQ3hCO0FBTFUsaUJBQWY7O0FBckZaO0FBQUE7QUFBQTs7QUFBQTtBQStGUTFNLGlCQUFDLENBQUM1RCxjQUFGO0FBRUFFLHNCQUFNLENBQUMrRSxPQUFQLENBQWU7QUFDWEMsdUJBQUssRUFBRXpJLHlEQUFXLENBQUM0VCxZQURSO0FBRVhqTCx5QkFBTyxFQUFFM0kseURBQVcsQ0FBQ2lVLHNCQUZWO0FBR1hKLG1DQUFpQixFQUFFLDZCQUFZO0FBQzNCLDJCQUFPLFlBQVAsQ0FEMkIsQ0FDTjtBQUN4QjtBQUxVLGlCQUFmOztBQWpHUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7O1dBNkdBLCtCQUFzQjtBQUVsQixVQUFRbFYsUUFBUixHQUFxQixLQUFLc0UsS0FBMUIsQ0FBUXRFLFFBQVI7QUFFQSxVQUFJdVYsTUFBTSxHQUFHeEIsU0FBUyxDQUFDQyxNQUF2Qjs7QUFFQSxVQUFJLENBQUN1QixNQUFMLEVBQWE7QUFFVHpRLGNBQU0sQ0FBQytFLE9BQVAsQ0FBZTtBQUNYQyxlQUFLLEVBQUV6SSx5REFBVyxDQUFDNFQsWUFEUjtBQUVYakwsaUJBQU8sRUFBRTNJLHlEQUFXLENBQUNtVSwyQkFGVjtBQUdYMVYsY0FBSSxFQUFFLEtBSEs7QUFJWG9WLDJCQUFpQixFQUFFLDZCQUFZO0FBQzNCLG1CQUFPLFlBQVAsQ0FEMkIsQ0FDTjtBQUN4QjtBQU5VLFNBQWY7QUFTQTtBQUNIOztBQUVELFVBQUlqSSxJQUFJLEdBQUcsS0FBSzNJLEtBQUwsQ0FBVzJJLElBQXRCO0FBQ0EsVUFBSW1HLFNBQVMsR0FBR25HLElBQUksQ0FBQ3RNLElBQXJCO0FBQ0EsVUFBSTBHLFNBQVMsR0FBRyxLQUFLL0MsS0FBTCxDQUFXK0MsU0FBM0I7QUFDQSxVQUFJb08sS0FBSyxHQUFHLEtBQUtuUixLQUFMLENBQVdzRixHQUF2QjtBQUNBLFVBQUk4TCxRQUFRLEdBQUcsQ0FBZjs7QUFDQSxVQUFJdEMsU0FBSixFQUFlO0FBRVh6TCw4RUFBWSxDQUFDeEQsK0VBQUQsRUFBa0MsSUFBbEMsRUFBd0MsS0FBS0csS0FBN0MsRUFBb0RqRCx5REFBcEQsQ0FBWixJQUNJeUQsTUFBTSxDQUFDK0UsT0FBUCxDQUFlO0FBQ1hDLGVBQUssRUFBRXpJLHlEQUFXLENBQUNzVSxzQkFEUjtBQUVYM0wsaUJBQU8sRUFBRSxpR0FBaUczSSx5REFBVyxDQUFDdVUsY0FBN0csR0FBOEgseUNBRjVIO0FBR1h6TCxpQkFBTyxFQUFFO0FBQ0xDLGlCQUFLLEVBQUU7QUFFSGxGLGtCQUFJLEVBQUU3RCx5REFBVyxDQUFDd1UsaUJBRmY7QUFJSHZMLHNCQUFRLEVBQUUsWUFKUDtBQU1IWCxvQkFBTSxFQUFFLGtCQUFZO0FBRWhCLG9CQUFJbU0sS0FBSyxHQUFHLEtBQUt0TCxRQUFMLENBQWNDLElBQWQsQ0FBbUIsa0JBQW5CLENBQVo7O0FBRUEsb0JBQUksQ0FBQ3FMLEtBQUssQ0FBQ3BMLEdBQU4sR0FBWUMsSUFBWixFQUFMLEVBQXlCO0FBRXJCN0Ysd0JBQU0sQ0FBQytGLEtBQVAsQ0FBYTtBQUVUYiwyQkFBTyxFQUFFM0kseURBQVcsQ0FBQzBVLG9CQUZaO0FBSVRqVyx3QkFBSSxFQUFFO0FBSkcsbUJBQWI7QUFRQSx5QkFBTyxLQUFQO0FBRUgsaUJBWkQsTUFZTztBQUVILHNCQUFJa1csV0FBVyxHQUFHRixLQUFLLENBQUNwTCxHQUFOLEVBQWxCOztBQUVBLHNCQUFJc0wsV0FBSixFQUFpQjtBQUViLHdCQUFJbFYsUUFBUSxHQUFHO0FBQ1hrVixpQ0FBVyxFQUFFQSxXQURGO0FBRVhDLDhCQUFRLEVBQUU1TyxTQUFTLENBQUNpRyxPQUZUO0FBR1hMLDBCQUFJLEVBQUVtRztBQUhLLHFCQUFmO0FBTUFsUyw0QkFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDQyxTQUF4QyxHQUFvREMseURBQVcsQ0FBQzZVLG9CQUFoRTtBQUVBaFYsNEJBQVEsQ0FBQ0MsYUFBVCxDQUF1QixTQUF2QixFQUFrQ0ksS0FBbEMsQ0FBd0NDLE9BQXhDLEdBQWtELE9BQWxEO0FBRUFDLGlGQUFjLENBQUNDLGdEQUFnQixDQUFDeVUsd0JBQWxCLEVBQTRDclYsUUFBNUMsQ0FBZCxDQUFvRVQsSUFBcEUsQ0FBeUUsVUFBQ0ksUUFBRCxFQUFjO0FBRW5GUyw4QkFBUSxDQUFDQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDSSxLQUFsQyxDQUF3Q0MsT0FBeEMsR0FBa0QsTUFBbEQ7O0FBRUEsMEJBQUlmLFFBQVEsQ0FBQzJWLE9BQVQsSUFBb0JuUixTQUF4QixFQUFtQztBQUUvQiw0QkFBSXhFLFFBQVEsQ0FBQzRWLE1BQWIsRUFBcUI7QUFFakJaLCtCQUFLLEdBQUcxTSxNQUFNLENBQUN1TixNQUFQLENBQWNiLEtBQWQsQ0FBUjtBQUNBQSwrQkFBSyxDQUFDaEIsT0FBTixDQUFjLFVBQVU3SyxHQUFWLEVBQWU7QUFDekIsZ0NBQUluSixRQUFRLENBQUM0VixNQUFULENBQWdCLE1BQWhCLEtBQTJCLFlBQS9CLEVBQTZDO0FBQ3pDWCxzQ0FBUSxHQUFHalYsUUFBUSxDQUFDNFYsTUFBVCxDQUFnQixPQUFoQixJQUE2QjVWLFFBQVEsQ0FBQzRWLE1BQVQsQ0FBZ0IsT0FBaEIsSUFBMkJ6TSxHQUFHLENBQUM0QixJQUFoQyxJQUF5QzVCLEdBQUcsQ0FBQzRCLElBQUosR0FBVyxDQUFwRCxDQUF2QztBQUNBa0ssc0NBQVEsR0FBSWpWLFFBQVEsQ0FBQzRWLE1BQVQsQ0FBZ0IsT0FBaEIsSUFBMkJ6TSxHQUFHLENBQUM0QixJQUFoQyxHQUF3QyxHQUFuRDtBQUNIO0FBQ0osMkJBTEQ7QUFPQS9LLGtDQUFRLENBQUM0VixNQUFULENBQWdCLFVBQWhCLElBQThCWCxRQUE5QjtBQUNBMVYsa0NBQVEsQ0FBQ3VXLG9FQUFXLENBQUM5VixRQUFRLENBQUM0VixNQUFWLENBQVosQ0FBUjtBQUVIO0FBRUosdUJBakJELE1BaUJPLElBQUk1VixRQUFRLENBQUMrVixLQUFULElBQWtCdlIsU0FBbEIsSUFBK0J4RSxRQUFRLENBQUNnVyxHQUFULElBQWdCeFIsU0FBbkQsRUFBOEQ7QUFFakVILDhCQUFNLENBQUMrRSxPQUFQLENBQWU7QUFDWEMsK0JBQUssRUFBRXpJLHlEQUFXLENBQUNxVixRQURSO0FBRVgxTSxpQ0FBTyxFQUFFdkosUUFBUSxDQUFDK1YsS0FGUDtBQUdYL0MsbUNBQVMsRUFBRSxtQkFIQTtBQUlYM1QsOEJBQUksRUFBRSxLQUpLO0FBS1g0VCxtQ0FBUyxFQUFFLGNBTEE7QUFNWHZKLGlDQUFPLEVBQUU7QUFDTHdKLHdDQUFZLEVBQUU7QUFDVnpPLGtDQUFJLEVBQUU3RCx5REFBVyxDQUFDdVMsZUFEUjtBQUVWdEosc0NBQVEsRUFBRTtBQUZBO0FBRFQ7QUFORSx5QkFBZjtBQWFIO0FBRUoscUJBdENEO0FBd0NIO0FBRUo7QUFDSjtBQWpGRSxhQURGO0FBcUZMcU0saUJBQUssRUFBRSxpQkFBWSxDQUNmO0FBQ0g7QUF2Rkk7QUFIRSxTQUFmLENBREo7QUErRkgsT0FqR0QsTUFpR087QUFDSDdSLGNBQU0sQ0FBQytFLE9BQVAsQ0FBZTtBQUNYQyxlQUFLLEVBQUUsUUFESTtBQUVYRSxpQkFBTyxFQUFFLCtCQUZFO0FBR1hHLGlCQUFPLEVBQUU7QUFDTHlNLGlCQUFLLEVBQUU7QUFDSHRNLHNCQUFRLEVBQUU7QUFEUDtBQURGO0FBSEUsU0FBZjtBQVNIO0FBRUo7OztXQUVELDZCQUFvQjlCLENBQXBCLEVBQXVCO0FBQ25CMUQsWUFBTSxDQUFDMEQsQ0FBQyxDQUFDekQsTUFBSCxDQUFOLENBQWlCNkssT0FBakIsQ0FBeUIsc0JBQXpCLEVBQWlEaUgsV0FBakQsQ0FBNkQsZUFBN0Q7QUFDSDs7O1dBRUQseUJBQWdCck8sQ0FBaEIsRUFBbUI7QUFFZkEsT0FBQyxDQUFDNUQsY0FBRjtBQUVBLFVBQUlrUyxTQUFTLEdBQUd0TyxDQUFDLENBQUN6RCxNQUFGLENBQVNnUyxZQUFULENBQXNCLE1BQXRCLENBQWhCO0FBRUEsVUFBUS9XLFFBQVIsR0FBcUIsS0FBS3NFLEtBQTFCLENBQVF0RSxRQUFSO0FBRUEsVUFBSXlHLE9BQU8sR0FBRyxLQUFLbkMsS0FBTCxDQUFXbUMsT0FBekI7QUFFQSxVQUFJd0csSUFBSSxHQUFHLEtBQUszSSxLQUFMLENBQVcySSxJQUF0QjtBQUVBLFVBQUlwRSxZQUFZLEdBQUcsS0FBS3ZFLEtBQUwsQ0FBV3VFLFlBQTlCO0FBRUEsVUFBSXhCLFNBQVMsR0FBRyxLQUFLL0MsS0FBTCxDQUFXK0MsU0FBM0I7QUFFQSxVQUFJK0wsU0FBUyxHQUFHbkcsSUFBSSxDQUFDdE0sSUFBckI7QUFFQSxVQUFJb1EsS0FBSyxHQUFHOUQsSUFBSSxDQUFDOEQsS0FBakI7QUFFQSxVQUFJekMsUUFBUSxHQUFHLEtBQUtoSyxLQUFMLENBQVdnSyxRQUFYLENBQW9CL04sTUFBbkM7QUFFQStOLGNBQVEsSUFBSSxDQUFaO0FBRUE4RSxlQUFTLEdBQUdBLFNBQVMsQ0FBQ2xGLE1BQVYsQ0FBaUIsVUFBQzhJLEdBQUQsRUFBUztBQUNsQyxlQUFPQSxHQUFHLENBQUM3SSxPQUFKLElBQWV0RixZQUF0QjtBQUNILE9BRlcsQ0FBWjs7QUFJQSxVQUFJa0ksS0FBSyxDQUFDa0csVUFBTixHQUFtQixDQUFuQixJQUF3QnBPLFlBQVksSUFBSXVLLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYWpGLE9BQXpELEVBQWtFO0FBRTlEckosY0FBTSxDQUFDK0UsT0FBUCxDQUFlO0FBQ1hDLGVBQUssRUFBRXpJLHlEQUFXLENBQUM2VixlQURSO0FBRVhsTixpQkFBTyxFQUFFLDBGQUEwRjNJLHlEQUFXLENBQUN1VSxjQUF0RyxHQUF1SCx1Q0FGckg7QUFHWHpMLGlCQUFPLEVBQUU7QUFDTGdOLHFCQUFTLEVBQUU7QUFDUGpTLGtCQUFJLEVBQUU3RCx5REFBVyxDQUFDNlYsZUFEWDtBQUVQNU0sc0JBQVEsRUFBRSxpQkFGSDtBQUdQWCxvQkFBTSxFQUFFLGtCQUFZO0FBQ2hCLG9CQUFJbU0sS0FBSyxHQUFHLEtBQUt0TCxRQUFMLENBQWNDLElBQWQsQ0FBbUIsa0JBQW5CLENBQVo7O0FBQ0Esb0JBQUksQ0FBQ3FMLEtBQUssQ0FBQ3BMLEdBQU4sR0FBWUMsSUFBWixFQUFMLEVBQXlCO0FBRXJCN0Ysd0JBQU0sQ0FBQytGLEtBQVAsQ0FBYTtBQUNUYiwyQkFBTyxFQUFFM0kseURBQVcsQ0FBQytWLGdCQURaO0FBRVR0WCx3QkFBSSxFQUFFO0FBRkcsbUJBQWI7QUFJQSx5QkFBTyxLQUFQO0FBQ0gsaUJBUEQsTUFPTztBQUVILHNCQUFJdVgsU0FBUyxHQUFHeE8sWUFBWSxHQUFHLENBQS9CO0FBRUE3SSwwQkFBUSxDQUFDc1gsZ0VBQVMsQ0FBQ3hCLEtBQUssQ0FBQ3BMLEdBQU4sR0FBWUMsSUFBWixFQUFELEVBQXFCOUIsWUFBckIsRUFBbUN1SyxTQUFTLENBQUMsQ0FBRCxDQUFULENBQWFuRyxJQUFoRCxDQUFWLENBQVI7QUFFQWpOLDBCQUFRLENBQUN1WCwrRUFBaUIsQ0FBQ2pKLFFBQUQsQ0FBbEIsQ0FBUjtBQUVBdE8sMEJBQVEsQ0FBQ3dYLHFFQUFjLENBQUNsSixRQUFELENBQWYsQ0FBUjtBQUVBakgsMkJBQVMsQ0FBQ2lHLE9BQVYsR0FBb0IsRUFBcEI7QUFFQXpMLG9FQUFRLENBQUNJLEtBQVQsQ0FBZSxZQUFmLEVBQTZCb0QsS0FBN0IsR0FBcUNoRixJQUFyQyxDQUEwQyxVQUFDQyxNQUFELEVBQVk7QUFFbEROLDRCQUFRLENBQUNvRyx1RUFBYyxFQUFmLENBQVI7QUFDSCxtQkFIRDtBQUtBSyx5QkFBTyxDQUFDQyxJQUFSLENBQWFvUSxTQUFiO0FBRUg7QUFDSjtBQWhDTSxhQUROO0FBbUNMSCxpQkFBSyxFQUFFLGlCQUFZLENBQ2Y7QUFDSDtBQXJDSTtBQUhFLFNBQWY7QUE0Q0gsT0E5Q0QsTUE4Q087QUFFSDdSLGNBQU0sQ0FBQytFLE9BQVAsQ0FBZTtBQUNYQyxlQUFLLEVBQUV6SSx5REFBVyxDQUFDNFQsWUFEUjtBQUVYakwsaUJBQU8sRUFBRTNJLHlEQUFXLENBQUNnVSxlQUZWO0FBR1hILDJCQUFpQixFQUFFLDZCQUFZO0FBQzNCLG1CQUFPLFlBQVAsQ0FEMkIsQ0FDTjtBQUN4QjtBQUxVLFNBQWY7QUFPSDs7QUFFRCxhQUFPLElBQVA7QUFFSDs7O1dBRUQsNkJBQW9CMU0sQ0FBcEIsRUFBdUI7QUFFbkJBLE9BQUMsQ0FBQzVELGNBQUY7O0FBRUEsVUFBSStDLHNFQUFZLENBQUN5SywyQkFBRCxFQUE4QixJQUE5QixFQUFvQyxJQUFwQyxDQUFoQixFQUEyRDtBQUN2RHROLGNBQU0sQ0FBQyxzQkFBRCxDQUFOLENBQStCMlMsUUFBL0IsQ0FBd0MsZUFBeEM7QUFDSDtBQUVKOzs7V0FFRCwwQkFBaUJqUCxDQUFqQixFQUFvQjtBQUVoQixVQUFJc04sS0FBSyxHQUFHdE4sQ0FBQyxDQUFDekQsTUFBRixDQUFTc0wsS0FBckI7QUFDQSxVQUFJcUgsSUFBSSxHQUFHLEtBQUs5TyxLQUFMLENBQVc0SixRQUF0QjtBQUVBc0QsV0FBSyxHQUFHQSxLQUFLLENBQUM3RSxPQUFOLENBQWMsVUFBZCxFQUEwQixFQUExQixDQUFSO0FBQ0E2RSxXQUFLLEdBQUdBLEtBQUssQ0FBQzdFLE9BQU4sQ0FBYyxXQUFkLEVBQTJCLElBQTNCLENBQVI7QUFFQSxXQUFLMUIsUUFBTCxDQUFjO0FBQ1ZpRCxnQkFBUSxFQUFFO0FBQ05DLGdCQUFNLEVBQUVxRCxLQURGO0FBRU5oVyxjQUFJLEVBQUU0WCxJQUFJLENBQUM1WDtBQUZMO0FBREEsT0FBZDtBQU9IOzs7V0FFRCwwQkFBaUI2SixNQUFqQixFQUF5QjtBQUVyQixVQUFRM0osUUFBUixHQUFxQixLQUFLc0UsS0FBMUIsQ0FBUXRFLFFBQVI7QUFFQSxVQUFJNkksWUFBWSxHQUFHLEtBQUt2RSxLQUFMLENBQVd1RSxZQUE5QjtBQUVBLFVBQUk0TSxLQUFLLEdBQUcsS0FBS25SLEtBQUwsQ0FBV3NGLEdBQXZCO0FBRUEsVUFBSThOLElBQUksR0FBRyxLQUFLOU8sS0FBTCxDQUFXNEosUUFBdEI7QUFFQSxVQUFJbUYsUUFBUSxHQUFHLENBQWY7QUFFQSxVQUFJVixVQUFVLEdBQUcsS0FBSzNTLEtBQUwsQ0FBVzJJLElBQVgsQ0FBZ0I4RCxLQUFoQixDQUFzQjZHLGFBQXZDO0FBQ0FYLGdCQUFVLEdBQUdoTSxVQUFVLENBQUNnTSxVQUFELENBQXZCO0FBRUEsVUFBSVksR0FBRyxHQUFHL1MsTUFBTSxDQUFDLG9CQUFELENBQU4sQ0FBNkI0RixHQUE3QixFQUFWOztBQUVBLFVBQUlmLE1BQU0sSUFBSSxLQUFkLEVBQXFCO0FBRWpCLFlBQUltTyxPQUFPLEdBQUcsdUJBQWQ7QUFDQSxZQUFJQyxjQUFjLEdBQUcsZUFBckI7O0FBRUEsWUFBSUYsR0FBRyxJQUFLQSxHQUFHLENBQUNHLEtBQUosQ0FBVUQsY0FBVixLQUE2QjlNLFVBQVUsQ0FBQzRNLEdBQUQsQ0FBVixHQUFrQixDQUF2RCxJQUE4REEsR0FBRyxDQUFDRyxLQUFKLENBQVVGLE9BQVYsS0FBc0I3TSxVQUFVLENBQUM0TSxHQUFELENBQVYsR0FBa0IsQ0FBMUcsRUFBOEc7QUFFMUdwQyxlQUFLLEdBQUcxTSxNQUFNLENBQUN1TixNQUFQLENBQWNiLEtBQWQsQ0FBUjtBQUNBQSxlQUFLLENBQUNoQixPQUFOLENBQWMsVUFBVTdLLEdBQVYsRUFBZTtBQUN6QixnQkFBSThOLElBQUksQ0FBQzVYLElBQUwsSUFBYSxPQUFqQixFQUEwQjtBQUN0QjZYLHNCQUFRLEdBQUdFLEdBQVg7QUFDQUYsc0JBQVEsR0FBS0UsR0FBRyxHQUFHak8sR0FBRyxDQUFDNEIsSUFBWCxHQUFtQixHQUEvQjtBQUNIO0FBQ0osV0FMRDtBQU9BLGVBQUsrRCxRQUFMLENBQWM7QUFDVmlELG9CQUFRLEVBQUU7QUFDTkMsb0JBQU0sRUFBRW9GLEdBREY7QUFFTi9YLGtCQUFJLEVBQUU0WCxJQUFJLENBQUM1WCxJQUZMO0FBR044SixpQkFBRyxFQUFFK047QUFIQztBQURBLFdBQWQ7QUFPQTNYLGtCQUFRLENBQUNpWSx5RUFBYyxDQUFDdE8sTUFBRCxFQUFTO0FBQUU4SSxrQkFBTSxFQUFFb0YsR0FBVjtBQUFlL1gsZ0JBQUksRUFBRTRYLElBQUksQ0FBQzVYLElBQTFCO0FBQWdDOEosZUFBRyxFQUFFK047QUFBckMsV0FBVCxFQUEwRDlPLFlBQTFELENBQWYsQ0FBUjtBQUNBN0ksa0JBQVEsQ0FBQ3FHLHlFQUFrQixFQUFuQixDQUFSO0FBQ0F2QixnQkFBTSxDQUFDLHNCQUFELENBQU4sQ0FBK0IrUixXQUEvQixDQUEyQyxlQUEzQztBQUVILFNBckJELE1BcUJPO0FBRUgvUixnQkFBTSxDQUFDK0YsS0FBUCxDQUFhO0FBQ1RmLGlCQUFLLEVBQUVwQywyREFBRSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBREE7QUFFVHNDLG1CQUFPLEVBQUUzSSx5REFBVyxDQUFDMEosc0JBRlo7QUFHVGpMLGdCQUFJLEVBQUU7QUFIRyxXQUFiO0FBS0g7QUFFSixPQW5DRCxNQW1DTyxJQUFJNkosTUFBTSxJQUFJLFFBQWQsRUFBd0I7QUFFM0IsYUFBSzRGLFFBQUwsQ0FBYztBQUNWaUQsa0JBQVEsRUFBRTtBQUNOQyxrQkFBTSxFQUFFLEVBREY7QUFFTjNTLGdCQUFJLEVBQUU0WCxJQUFJLENBQUM1WDtBQUZMO0FBREEsU0FBZDtBQU9BZ0YsY0FBTSxDQUFDLG9CQUFELENBQU4sQ0FBNkI0RixHQUE3QixDQUFpQyxDQUFqQztBQUVBMUssZ0JBQVEsQ0FBQ2lZLHlFQUFjLENBQUN0TyxNQUFELEVBQVMsRUFBVCxFQUFhZCxZQUFiLENBQWYsQ0FBUjtBQUNBN0ksZ0JBQVEsQ0FBQ3FHLHlFQUFrQixFQUFuQixDQUFSO0FBQ0F2QixjQUFNLENBQUMsc0JBQUQsQ0FBTixDQUErQitSLFdBQS9CLENBQTJDLGVBQTNDO0FBRUg7QUFFSjs7O1dBRUQsNEJBQW1Cck8sQ0FBbkIsRUFBc0I7QUFFbEIsVUFBSWtQLElBQUksR0FBRyxLQUFLOU8sS0FBTCxDQUFXNEosUUFBdEI7QUFDQSxVQUFJMEYsU0FBUyxHQUFHcFQsTUFBTSxDQUFDMEQsQ0FBQyxDQUFDekQsTUFBSCxDQUFOLENBQWlCNkssT0FBakIsQ0FBeUIsT0FBekIsRUFBa0M1SyxJQUFsQyxDQUF1QyxNQUF2QyxDQUFoQjtBQUNBRixZQUFNLENBQUMseUJBQUQsQ0FBTixDQUFrQytSLFdBQWxDLENBQThDLGtCQUE5QztBQUNBL1IsWUFBTSxDQUFDMEQsQ0FBQyxDQUFDekQsTUFBSCxDQUFOLENBQWlCNkssT0FBakIsQ0FBeUIsT0FBekIsRUFBa0M2SCxRQUFsQyxDQUEyQyxrQkFBM0M7QUFDQTNTLFlBQU0sQ0FBQyxzQkFBRCxDQUFOLENBQStCK1IsV0FBL0IsQ0FBMkMsc0JBQTNDLEVBQW1FWSxRQUFuRSxDQUE0RSxVQUFVUyxTQUF0Rjs7QUFFQSxVQUFJQSxTQUFTLElBQUksTUFBakIsRUFBeUI7QUFFckIsYUFBSzNJLFFBQUwsQ0FBYztBQUNWaUQsa0JBQVEsRUFBRTtBQUNOQyxrQkFBTSxFQUFFaUYsSUFBSSxDQUFDakYsTUFEUDtBQUVOM1MsZ0JBQUksRUFBRTtBQUZBO0FBREEsU0FBZDtBQU9ILE9BVEQsTUFTTyxJQUFJb1ksU0FBUyxJQUFJLE9BQWpCLEVBQTBCO0FBRTdCLGFBQUszSSxRQUFMLENBQWM7QUFDVmlELGtCQUFRLEVBQUU7QUFDTkMsa0JBQU0sRUFBRWlGLElBQUksQ0FBQ2pGLE1BRFA7QUFFTjNTLGdCQUFJLEVBQUU7QUFGQTtBQURBLFNBQWQ7QUFPSCxPQVRNLE1BU0E7QUFFSGdGLGNBQU0sQ0FBQytGLEtBQVAsQ0FBYTtBQUVUYixpQkFBTyxFQUFFM0kseURBQVcsQ0FBQzhXLG9CQUZaO0FBSVRyWSxjQUFJLEVBQUU7QUFKRyxTQUFiO0FBT0g7QUFFSjs7O1dBRUQsa0JBQVM7QUFBQTs7QUFFTCxVQUFJc1ksaUJBQWlCLEdBQUcsR0FBeEI7QUFFQSxVQUFJbkwsSUFBSSxHQUFHLEtBQUszSSxLQUFMLENBQVcySSxJQUF0QjtBQUVBLFVBQUlvTCxZQUFZLEdBQUdwTCxJQUFJLENBQUN0TSxJQUF4QjtBQUVBLFVBQUkyWCx3QkFBd0IsR0FBRyxDQUEvQjs7QUFFQSxVQUFJRCxZQUFZLENBQUM5WCxNQUFiLEdBQXNCLENBQTFCLEVBQTZCO0FBRXpCLFlBQUk4WCxZQUFZLENBQUM5WCxNQUFiLEdBQXNCLENBQXRCLElBQTJCOFgsWUFBWSxDQUFDLENBQUQsQ0FBWixJQUFtQnBULFNBQTlDLElBQTJEb1QsWUFBWSxDQUFDLENBQUQsQ0FBWixDQUFnQnBMLElBQWhCLElBQXdCaEksU0FBbkYsSUFBZ0dvVCxZQUFZLENBQUMsQ0FBRCxDQUFaLENBQWdCcEwsSUFBaEIsQ0FBcUIxTSxNQUFyQixHQUE4QixDQUFsSSxFQUFxSTtBQUVqSThYLHNCQUFZLENBQUMsQ0FBRCxDQUFaLENBQWdCcEwsSUFBaEIsQ0FBcUJ3SCxPQUFyQixDQUE2QixVQUFDOEQsV0FBRCxFQUFpQjtBQUUxQztBQUNBLGdCQUFNQyxhQUFhLEdBQUlELFdBQVcsQ0FBQ3hNLFFBQVosR0FBdUJ3TSxXQUFXLENBQUM3SCxPQUFwQyxHQUFnRDZILFdBQVcsQ0FBQ3hNLFFBQVosR0FBdUJ3TSxXQUFXLENBQUNFLEVBQXpHLENBSDBDLENBSzFDOztBQUNBSCxvQ0FBd0IsSUFBSUUsYUFBNUI7QUFFSCxXQVJEO0FBVUg7QUFFSjs7QUFFREYsOEJBQXdCLEdBQUdyTixVQUFVLENBQUNxTix3QkFBRCxDQUFyQztBQUVBLFVBQUlJLE9BQU8sR0FBR3hMLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUs3SSxLQUFMLENBQVdvVSxPQUF0QixDQUFkO0FBRUEsVUFBSXRMLFFBQVEsR0FBR0YsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBSzdJLEtBQUwsQ0FBVzhJLFFBQXRCLENBQWY7QUFFQSxVQUFJL0YsU0FBUyxHQUFHLEtBQUsvQyxLQUFMLENBQVcrQyxTQUEzQjtBQUVBLFVBQUlxUSxJQUFJLEdBQUcsS0FBSzlPLEtBQUwsQ0FBVzRKLFFBQXRCO0FBRUEsVUFBSXpCLEtBQUssR0FBRzlELElBQUksQ0FBQzhELEtBQWpCOztBQUVBLFVBQUlyRCxhQUFhLEdBQUdoRywyREFBRSxDQUFDLGlCQUFELEVBQW9CLFFBQXBCLENBQXRCOztBQUVBLFVBQUkyTyxNQUFNLEdBQUdxQyxPQUFPLENBQUNwUSxHQUFSLENBQVksVUFBQ3FRLElBQUQsRUFBVTtBQUMvQixlQUFPQSxJQUFJLENBQUN0QyxNQUFaO0FBQ0gsT0FGWSxDQUFiO0FBSUEsVUFBSWxGLGFBQWEsR0FBRy9ELFFBQVEsQ0FBQzlFLEdBQVQsQ0FBYSxVQUFDc1EsR0FBRCxFQUFTO0FBQ3RDLGVBQU9BLEdBQUcsQ0FBQ25MLE1BQVg7QUFDSCxPQUZtQixDQUFwQjtBQUlBMEQsbUJBQWEsR0FBR0EsYUFBYSxDQUFDLENBQUQsQ0FBN0I7QUFFQSxVQUFJMEgsUUFBUSxHQUFHckgsdUVBQWEsQ0FBQzdKLHNFQUFZLENBQUMsbURBQUQsRUFBc0RvSixLQUFLLENBQUM2RyxhQUE1RCxFQUEyRVMsWUFBM0UsQ0FBYixFQUF1R2xILGFBQXZHLENBQTVCO0FBQ0EsVUFBSTJILFFBQVEsR0FBR3RILHVFQUFhLENBQUNULEtBQUssQ0FBQ2dJLFNBQVAsRUFBa0I1SCxhQUFsQixDQUE1QjtBQUNBLFVBQUk2SCxhQUFhLEdBQUcvTixVQUFVLENBQUM4RixLQUFLLENBQUNrSSxjQUFQLENBQVYsR0FBbUNYLHdCQUF2RDtBQUNBVSxtQkFBYSxHQUFHeEgsdUVBQWEsQ0FBQ3dILGFBQUQsRUFBZ0I3SCxhQUFoQixDQUE3QjtBQUNBLFVBQUk4RixVQUFVLEdBQUd6Rix1RUFBYSxDQUFDdkcsVUFBVSxDQUFDdEQsc0VBQVksQ0FBQ3VLLDJCQUFELEVBQThCbkIsS0FBSyxDQUFDa0csVUFBcEMsQ0FBYixDQUFYLEVBQTBFOUYsYUFBMUUsQ0FBOUIsQ0F4REssQ0F5REw7O0FBQ0EsVUFBSXRELGdCQUFnQixHQUFJeEcsU0FBUyxDQUFDaUcsT0FBVixDQUFrQi9NLE1BQWxCLEdBQTJCLENBQTVCLEdBQWlDOEcsU0FBUyxDQUFDaUcsT0FBVixDQUFrQixDQUFsQixDQUFqQyxHQUF3RCxFQUEvRTs7QUFDQSxVQUFJTyxnQkFBSixFQUFzQjtBQUNsQkgscUJBQWEsR0FBR0csZ0JBQWdCLENBQUNxTCxVQUFqQztBQUNIOztBQUNELFVBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLFVBQU1DLFVBQVUsR0FBRy9DLE1BQU0sQ0FBQy9OLEdBQVAsQ0FBVyxVQUFDK1EsSUFBRCxFQUFPOU4sQ0FBUCxFQUFhO0FBQ3ZDLFlBQUkrTixPQUFPLEdBQUcsRUFBZDtBQUNBeFUsY0FBTSxDQUFDd0csSUFBUCxDQUFZK04sSUFBWixFQUFrQixVQUFDOU4sQ0FBRCxFQUFJYixHQUFKLEVBQVk7QUFDMUIsY0FBSTZPLElBQUksR0FBRzdPLEdBQVg7QUFDQSxjQUFJOE8sY0FBYyxHQUFHLEVBQXJCOztBQUNBLGNBQUlwQixpQkFBaUIsSUFBSSxHQUF6QixFQUE4QjtBQUMxQixnQkFBSW1CLElBQUksQ0FBQ3paLElBQUwsSUFBYSxTQUFqQixFQUE0QjtBQUN4QjBaLDRCQUFjLEdBQUdELElBQUksQ0FBQ0UsS0FBTCxHQUFhLEdBQTlCO0FBQ0gsYUFGRCxNQUVPO0FBQ0hELDRCQUFjLEdBQUdySSxhQUFhLEdBQUdvSSxJQUFJLENBQUNFLEtBQXRDO0FBQ0g7QUFDSixXQU5ELE1BTU87QUFDSCxnQkFBSUYsSUFBSSxDQUFDelosSUFBTCxJQUFhLFNBQWpCLEVBQTRCO0FBQ3hCMFosNEJBQWMsR0FBR0QsSUFBSSxDQUFDRSxLQUFMLEdBQWEsR0FBOUI7QUFDSCxhQUZELE1BRU87QUFDSEQsNEJBQWMsR0FBR0QsSUFBSSxDQUFDRSxLQUFMLEdBQWF0SSxhQUE5QjtBQUNIO0FBQ0o7O0FBQ0RtSSxpQkFBTyxDQUFDNVMsSUFBUixDQUFhO0FBQUU3RCxnQkFBSSxFQUFFMFcsSUFBSSxDQUFDMVcsSUFBYjtBQUFtQjRXLGlCQUFLLEVBQUVEO0FBQTFCLFdBQWI7QUFDSCxTQWpCRDtBQWtCQSxlQUFPRixPQUFQO0FBQ0gsT0FyQmtCLENBQW5COztBQXVCQSxVQUFJRixVQUFVLENBQUM3WSxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLFlBQU1tWixvQkFBb0IsR0FBRy9SLHNFQUFZLENBQUMySyw2QkFBRCxFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxDQUF6QztBQUNBNkcsbUJBQVcsR0FBR0MsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjOVEsR0FBZCxDQUFrQixVQUFDcVEsSUFBRCxFQUFPZ0IsS0FBUCxFQUFpQjtBQUM3QyxpQkFDSTtBQUFJLHFCQUFTLEVBQUMsYUFBZDtBQUE0QixlQUFHLEVBQUVoQixJQUFJLENBQUM5VjtBQUF0QyxhQUNJLHFGQUNLOFYsSUFBSSxDQUFDOVYsSUFEVixFQUVLNlcsb0JBQW9CLEdBQ2pCO0FBQU0sMkJBQWFmLElBQUksQ0FBQzlWO0FBQXhCLGFBQThCO0FBQUcscUJBQVMsRUFBQyxjQUFiO0FBQTRCLG1CQUFPLEVBQUUsTUFBSSxDQUFDcVE7QUFBMUMsWUFBOUIsQ0FEaUIsR0FFZixFQUpWLENBREosRUFPSTtBQUFJLHFCQUFTLEVBQUM7QUFBZCxhQUF3QnlGLElBQUksQ0FBQ2MsS0FBN0IsQ0FQSixDQURKO0FBV0gsU0FaYSxDQUFkO0FBYUg7O0FBQ0QsVUFBSUcsV0FBVyxHQUFHdlkseURBQVcsQ0FBQ3VZLFdBQTlCO0FBQ0EsVUFBSUMsYUFBYSxHQUFHeFkseURBQVcsQ0FBQ3dZLGFBQWhDO0FBQ0EsVUFBSUMsUUFBUSxHQUFHelkseURBQVcsQ0FBQ3lZLFFBQTNCO0FBQ0EsVUFBSUMsY0FBYyxHQUFHMVkseURBQVcsQ0FBQzBZLGNBQWpDO0FBQ0EsVUFBSUMsZ0JBQWdCLEdBQUczWSx5REFBVyxDQUFDMlksZ0JBQW5DO0FBQ0EsVUFBSW5FLGlCQUFpQixHQUFHeFUseURBQVcsQ0FBQ3dVLGlCQUFwQztBQUNBLFVBQUlvRSxjQUFjLEdBQUc1WSx5REFBVyxDQUFDNFksY0FBakM7QUFDQSxVQUFJQyxVQUFVLEdBQUc3WSx5REFBVyxDQUFDNlksVUFBN0I7QUFDQSxVQUFJQyxXQUFXLEdBQUc5WSx5REFBVyxDQUFDOFksV0FBOUI7QUFDQSxVQUFJQyxtQkFBbUIsR0FBRy9ZLHlEQUFXLENBQUMrWSxtQkFBdEM7QUFDQSxVQUFJQyxRQUFRLEdBQUdoWix5REFBVyxDQUFDZ1osUUFBM0I7O0FBRUEsVUFBSXRKLEtBQUssQ0FBQzZHLGFBQU4sSUFBdUIzUyxTQUEzQixFQUFzQztBQUNsQyxlQUFPLHlFQUFDLDJEQUFELE9BQVA7QUFDSDs7QUFFRCxVQUFJcVYsU0FBUyxHQUFHM1Msc0VBQVksQ0FBQ3FLLHdCQUFELEVBQTJCLENBQ25EO0FBQUV1SSxVQUFFLEVBQUUsV0FBTjtBQUFtQkMsWUFBSSxFQUFFLGlCQUF6QjtBQUE0Q0MsWUFBSSxFQUFFLGFBQWxEO0FBQWlFdlYsWUFBSSxFQUFFK1UsY0FBdkU7QUFBdUZ0VixhQUFLLEVBQUUsS0FBS2dPO0FBQW5HLE9BRG1ELEVBRW5EO0FBQUU0SCxVQUFFLEVBQUUsWUFBTjtBQUFvQkMsWUFBSSxFQUFFLEtBQTFCO0FBQWlDQyxZQUFJLEVBQUUsb0JBQXZDO0FBQTZEdlYsWUFBSSxFQUFFbVYsUUFBbkU7QUFBNkUxVixhQUFLLEVBQUUsS0FBSytOO0FBQXpGLE9BRm1ELENBQTNCLEVBR3pCekYsSUFIeUIsQ0FBNUI7QUFLQSxVQUFNeU4sa0JBQWtCLEdBQUdKLFNBQVMsQ0FBQ2hTLEdBQVYsQ0FBYyxVQUFDK0gsS0FBRCxFQUFRc0osS0FBUixFQUFrQjtBQUV2RCxZQUFJdEosS0FBSyxDQUFDMUwsS0FBVixFQUFpQjtBQUViLGlCQUNJLHlFQUFDLHNEQUFEO0FBQ0ksZUFBRyxFQUFFZ1YsS0FEVDtBQUVJLGNBQUUsRUFBRXRKLEtBQUssQ0FBQ2tLLEVBRmQ7QUFHSSxtQkFBTyxFQUFFLGlCQUFDL1IsQ0FBRDtBQUFBLHFCQUFPNkgsS0FBSyxDQUFDMUwsS0FBTixDQUFZNkQsQ0FBWixDQUFQO0FBQUEsYUFIYjtBQUlJLGNBQUUsRUFBRTlHLGdEQUFnQixDQUFDa0YsUUFBakIsR0FBNEIsT0FBNUIsR0FBc0N5SixLQUFLLENBQUNtSztBQUpwRCxhQU1JO0FBQU0scUJBQVMsRUFBRSxRQUFRbkssS0FBSyxDQUFDb0s7QUFBL0IsWUFOSixFQU9LcEssS0FBSyxDQUFDbkwsSUFQWCxDQURKO0FBWUgsU0FkRCxNQWNPO0FBRUgsaUJBQ0kseUVBQUMsc0RBQUQ7QUFDSSxlQUFHLEVBQUV5VSxLQURUO0FBRUksY0FBRSxFQUFFdEosS0FBSyxDQUFDa0ssRUFGZDtBQUdJLGNBQUUsRUFBRTdZLGdEQUFnQixDQUFDa0YsUUFBakIsR0FBNEIsT0FBNUIsR0FBc0N5SixLQUFLLENBQUNtSztBQUhwRCxhQUtJO0FBQU0scUJBQVMsRUFBRSxRQUFRbkssS0FBSyxDQUFDb0s7QUFBL0IsWUFMSixFQU1LcEssS0FBSyxDQUFDbkwsSUFOWCxDQURKO0FBV0g7QUFFSixPQS9CMEIsQ0FBM0I7QUFpQ0EsYUFDSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUVJO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBRUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FFSTtBQUFJLGlCQUFTLEVBQUM7QUFBZCxTQUFnQ2tWLG1CQUFoQyxDQUZKLEVBSUk7QUFBTSxpQkFBUyxFQUFDLDZCQUFoQjtBQUE4QyxlQUFPLEVBQUUsS0FBS3BIO0FBQTVELFFBSkosRUFNSTtBQUFJLGlCQUFTLEVBQUM7QUFBZCxRQU5KLEVBUUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FFSTtBQUFPLGlCQUFTLEVBQUMsa0JBQWpCO0FBQW9DLHFCQUFVLE1BQTlDO0FBQXFELGVBQU8sRUFBRSxLQUFLSDtBQUFuRSxTQUNJO0FBQU8sWUFBSSxFQUFDLEtBQVo7QUFBa0Isb0JBQVksRUFBQyxNQUEvQjtBQUFzQyxZQUFJLEVBQUM7QUFBM0MsUUFESixFQUVJLDBGQUZKLENBRkosRUFPSTtBQUFPLHFCQUFVLE9BQWpCO0FBQXlCLGVBQU8sRUFBRSxLQUFLQTtBQUF2QyxTQUNJO0FBQU8sWUFBSSxFQUFDLEtBQVo7QUFBa0Isb0JBQVksRUFBQyxPQUEvQjtBQUF1QyxZQUFJLEVBQUM7QUFBNUMsUUFESixFQUVJLHNGQUFNMUIsYUFBTixDQUZKLENBUEosQ0FSSixFQXNCSTtBQUFLLGlCQUFTLEVBQUM7QUFBZixTQUVJO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0k7QUFBTyxZQUFJLEVBQUMsTUFBWjtBQUFtQixvQkFBWSxFQUFFdUcsSUFBSSxDQUFDakYsTUFBdEM7QUFBOEMsZUFBTyxFQUFFLEtBQUtLLGdCQUE1RDtBQUE4RSxZQUFJLEVBQUMsUUFBbkY7QUFBNEYsV0FBRyxFQUFDLEdBQWhHO0FBQW9HLFlBQUksRUFBQyxNQUF6RztBQUFnSCxpQkFBUztBQUF6SCxRQURKLEVBRUk7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FBb0MzQixhQUFwQyxDQUZKLEVBR0k7QUFBSyxpQkFBUyxFQUFDO0FBQWYsYUFISixDQUZKLEVBT0k7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDSTtBQUFRLFlBQUksRUFBQyxnQkFBYjtBQUE4QixZQUFJLEVBQUMsUUFBbkM7QUFBNEMsaUJBQVMsRUFBQyxTQUF0RDtBQUFnRSxZQUFJLEVBQUMsUUFBckU7QUFBOEUsVUFBRSxFQUFDLGdCQUFqRjtBQUFrRyxlQUFPLEVBQUcsaUJBQUMzSSxDQUFEO0FBQUEsaUJBQU8sTUFBSSxDQUFDdUssZ0JBQUwsQ0FBc0IsS0FBdEIsQ0FBUDtBQUFBO0FBQTVHLFNBQ0k7QUFBRyxpQkFBUyxFQUFDO0FBQWIsUUFESixVQUVXbUgsVUFGWCxDQURKLEVBS0k7QUFBUSxZQUFJLEVBQUMsaUJBQWI7QUFBK0IsWUFBSSxFQUFDLFFBQXBDO0FBQTZDLFlBQUksRUFBQyxRQUFsRDtBQUEyRCxpQkFBUyxFQUFDLFdBQXJFO0FBQWlGLFVBQUUsRUFBQyxpQkFBcEY7QUFBc0csZUFBTyxFQUFHLGlCQUFDMVIsQ0FBRDtBQUFBLGlCQUFPLE1BQUksQ0FBQ3VLLGdCQUFMLENBQXNCLFFBQXRCLENBQVA7QUFBQTtBQUFoSCxTQUNJO0FBQUcsaUJBQVMsRUFBQztBQUFiLFFBREosVUFFV29ILFdBRlgsQ0FMSixDQVBKLENBdEJKLENBRkosQ0FGSixFQWtEUXhTLHNFQUFZLENBQUN3Syx3QkFBRCxFQUEyQixJQUEzQixFQUFpQyxJQUFqQyxDQUFaLEdBQ0k7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FDSTtBQUFRLFlBQUksRUFBQyxZQUFiO0FBQTBCLFlBQUksRUFBQyxRQUEvQjtBQUF3QyxpQkFBUyxFQUFDLG1CQUFsRDtBQUFzRSxlQUFPLEVBQUUsS0FBS2M7QUFBcEYsU0FBMEc0QyxpQkFBMUcsQ0FESixDQURKLEdBSU0sRUF0RGQsRUEwREk7QUFBTyxpQkFBUyxFQUFDO0FBQWpCLFNBQ0ksd0ZBQ0kscUZBQ0kscUZBQUtrRSxjQUFMLENBREosRUFFSTtBQUFJLFVBQUUsRUFBQztBQUFQLFNBQXdCbEIsUUFBeEIsQ0FGSixDQURKLEVBS0k7QUFBSSxVQUFFLEVBQUM7QUFBUCxTQUNJLHFGQUFLaUIsUUFBTCxDQURKLEVBRUkscUZBQUtoQixRQUFMLENBRkosQ0FMSixFQVNJLHFGQUNJLHFGQUFJO0FBQUcsWUFBSSxFQUFDLEdBQVI7QUFBWSxpQkFBUyxFQUFDLGdCQUF0QjtBQUF1QyxlQUFPLEVBQUUsS0FBS2xHO0FBQXJELFNBQTJFaUgsYUFBM0UsQ0FBSixDQURKLEVBRUk7QUFBSSxVQUFFLEVBQUM7QUFBUCxjQUF1Qix1RkFBT2IsYUFBUCxDQUF2QixDQUZKLENBVEosRUFhS3JSLHNFQUFZLENBQUNzSyxxQ0FBRCxFQUF3QyxFQUF4QyxFQUE0QyxLQUFLM04sS0FBakQsQ0FiakIsRUFjSTtBQUFJLGlCQUFTLEVBQUM7QUFBZCxTQUNJO0FBQUksZUFBTyxFQUFDO0FBQVosU0FBaUJzVixXQUFqQixDQURKLENBZEosRUFpQktULFdBQVcsR0FBR0EsV0FBSCxHQUFpQixvRkFqQmpDLEVBa0JJO0FBQUksVUFBRSxFQUFDO0FBQVAsU0FDSSxxRkFBS2EsZ0JBQUwsQ0FESixFQUVJO0FBQUksVUFBRSxFQUFDO0FBQVAsU0FBbUIvQyxVQUFuQixDQUZKLENBbEJKLENBREosQ0ExREosRUFxRlF0UCxzRUFBWSxDQUFDMEssaUNBQUQsRUFBb0MsSUFBcEMsRUFBMEMsSUFBMUMsQ0FBWixHQUNJO0FBQUssaUJBQVMsRUFBQztBQUFmLFNBQ0txSSxrQkFETCxDQURKLEdBSU0sRUF6RmQsQ0FESjtBQWdHSDs7OztFQWp4Qm1CaFMsK0M7O0FBb3hCeEIsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFBQyxLQUFLO0FBQUEsU0FBSztBQUM5QjRKLFlBQVEsRUFBRTVKLEtBQUssQ0FBQzRKLFFBQU4sQ0FBZTdSLElBREs7QUFFOUJpSixPQUFHLEVBQUVoQixLQUFLLENBQUNnQixHQUFOLENBQVVqSixJQUZlO0FBRzlCc00sUUFBSSxFQUFFckUsS0FBSyxDQUFDcUUsSUFIa0I7QUFJOUJHLFlBQVEsRUFBRXhFLEtBQUssQ0FBQ3dFLFFBQU4sQ0FBZUUsT0FKSztBQUs5QnpFLGdCQUFZLEVBQUVELEtBQUssQ0FBQ0MsWUFMVTtBQU05QnhCLGFBQVMsRUFBRXVCLEtBQUssQ0FBQ3ZCLFNBTmE7QUFPOUJxUixXQUFPLEVBQUU5UCxLQUFLLENBQUN5TixNQUFOLENBQWExVjtBQVBRLEdBQUw7QUFBQSxDQUE3Qjs7QUFVQSxTQUFTbUksa0JBQVQsQ0FBNEI5SSxRQUE1QixFQUFzQztBQUNsQyxTQUFPK0ksTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBRWhKLFlBQVEsRUFBUkE7QUFBRixHQUFkLEVBQTRCaUosZ0VBQWtCLENBQUM7QUFBRXFPLGFBQVMsRUFBVEEsd0RBQUY7QUFBYUMscUJBQWlCLEVBQWpCQSx1RUFBYjtBQUFnQ25SLGtCQUFjLEVBQWRBLCtEQUFoQztBQUFnREMsc0JBQWtCLEVBQWxCQSxpRUFBaEQ7QUFBb0VtUixrQkFBYyxFQUFkQSw2REFBcEU7QUFBb0Z6UixrQkFBYyxFQUFkQSwrREFBcEY7QUFBb0drUyxrQkFBYyxFQUFkQSxpRUFBcEc7QUFBb0gxQixlQUFXLEVBQVhBLDREQUFwSDtBQUFpSWpELGdCQUFZLEVBQVpBLDZEQUFZQTtBQUE3SSxHQUFELEVBQWtKdFQsUUFBbEosQ0FBOUMsQ0FBUDtBQUNIOztBQUVjbUosMkhBQU8sQ0FBQ1IsZUFBRCxFQUFrQkcsa0JBQWxCLENBQVAsQ0FBNkN5SixTQUE3QyxDQUFmLEUiLCJmaWxlIjoiLi9hc3NldHMvZGlzdC9jdXN0b21lcn5ob21lL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFxyXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSAnLi8uLi8uLi9kYXRhYmFzZSc7XHJcbmltcG9ydCB7IHRyYW5zbGF0aW9uIH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgd2t3Y3Bvc192YXJpYWJsZSBmcm9tICcuLy4uLy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7IFBPU1Bvc3RSZXF1ZXN0IH0gZnJvbSAnLi8uLi8uLi9oYXNoJztcclxuXHJcbmV4cG9ydCBjb25zdCBQT1NfQ0FURUdPUklFUyA9ICdQT1NfQ0FURUdPUklFUyc7IFxyXG5cclxuZXhwb3J0IGNvbnN0IHNldENhdGVnb3JpZXMgPSAoIGNhdGVnb3JpZXMgKSA9PiB7XHJcbiBcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogUE9TX0NBVEVHT1JJRVMsXHJcbiAgICBjYXRlZ29yaWVzXHJcbiAgfVxyXG59O1xyXG5cclxuICBcclxuZXhwb3J0IGNvbnN0IGdldEFsbENhdGVnb3JpZXMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IHtcclxuXHJcbiAgbGV0IHVzZXIgPSBhcGlmX3NjcmlwdC5sb2dnZWRfaW47IFxyXG4gIFxyXG4gIGlmICh1c2VyICE9IFwiXCIpIHtcclxuICAgIFxyXG4gICAgaXNDYXRlZ29yeURhdGFFeGlzdHMoKS50aGVuKCAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIHJlc3VsdC5sZW5ndGggPD0gMCApIHtcclxuICAgICAgICBcclxuICAgICAgICAgIEFqQXhHZXRBbGxDYXRlZ29yeVdDKCkudGhlbiggKHJlc3BvbnNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiggcmVzcG9uc2UgKSB7XHJcblxyXG4gICAgICAgICAgICAgIGxldCBjYXRlZ29yeU9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGxpc3QgOiByZXNwb25zZSxcclxuICAgICAgICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxLFxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgZGlzcGF0Y2goc2V0Q2F0ZWdvcmllcyhjYXRlZ29yeU9iaikpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIGxldCBjYXRPYmogPSB7XHJcbiAgICAgICAgICAgIGxpc3QgOiByZXN1bHQsXHJcbiAgICAgICAgICAgIGlzRmV0Y2hpbmcgOiAxLFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRpc3BhdGNoKHNldENhdGVnb3JpZXMoY2F0T2JqKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICBcclxuICB9OyBcclxuXHJcbn1cclxuICBcclxuZnVuY3Rpb24gQWpBeEdldEFsbENhdGVnb3J5V0MoKSB7XHJcblxyXG4gIGNvbnN0IHBvc3REYXRhID0ge307XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGluZy10ZXh0JyApLmlubmVySFRNTCA9IHRyYW5zbGF0aW9uLmxvYWRpbmdfY2F0ZWdvcmllc190ZXh0O1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGVyJyApLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIFBPU1Bvc3RSZXF1ZXN0KCB3a3djcG9zX3ZhcmlhYmxlLldLX0dFVF9BTExfQ0FURUdPUklFU19FTkRQT0lOVCwgcG9zdERhdGEgKS50aGVuKChqc29uKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgaWYoIGpzb24gKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGRhdGFiYXNlLnBvc19jYXRlZ29yaWVzLmJ1bGtQdXQoanNvbikudGhlbigocnN1bHQpID0+IHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcmVzb2x2ZShqc29uKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9ICk7XHJcblxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gaXNDYXRlZ29yeURhdGFFeGlzdHMoKSB7XHJcbiAgXHJcbiAgcmV0dXJuIGRhdGFiYXNlLnRhYmxlKCdwb3NfY2F0ZWdvcmllcycpLnRvQXJyYXkoKS50aGVuKCAoY2F0RGF0YSkgPT4ge1xyXG4gICAgIFxyXG4gICAgcmV0dXJuIGNhdERhdGE7XHJcbiAgICBcclxuICB9KTtcclxuIFxyXG59XHJcbiIsImltcG9ydCBkYXRhYmFzZSBmcm9tICcuLi8uLi9kYXRhYmFzZSc7XHJcbmltcG9ydCB7IHRyYW5zbGF0aW9uIH0gZnJvbSBcIi4uLy4uL3RyYW5zbGF0aW9uXCI7XHJcbmltcG9ydCB3a3djcG9zX3ZhcmlhYmxlIGZyb20gJy4vLi4vLi4vY29uZmlnJztcclxuaW1wb3J0IHsgUE9TUG9zdFJlcXVlc3QgfSBmcm9tICcuLy4uLy4uL2hhc2gnO1xyXG4gXHJcbmV4cG9ydCBjb25zdCBQT1NfQ09VTlRSWSA9ICdQT1NfQ09VTlRSWSc7IFxyXG4gXHJcbmV4cG9ydCBjb25zdCBzZXRDb3VudHJpZXMgPSAoIGNvdW50cmllcyApID0+IHtcclxuIFxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBQT1NfQ09VTlRSWSxcclxuICAgIGNvdW50cmllc1xyXG4gIH1cclxufTtcclxuXHJcbiAgXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxDb3VudHJpZXNXQyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBsZXQgdXNlciA9IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbjsgXHJcbiAgXHJcbiAgaWYgKHVzZXIgIT0gXCJcIikge1xyXG5cclxuICAgIEFqQXhHZXRDb3VudHJpZXMoKS50aGVuKCAocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgIGlmKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgIGxldCBjb3VudHlPYmogPSB7XHJcbiAgICAgICAgICBsaXN0IDogcmVzcG9uc2UsXHJcbiAgICAgICAgICBpc0ZldGNoaW5nIDogMSxcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGlzcGF0Y2goc2V0Q291bnRyaWVzKGNvdW50eU9iaikpO1xyXG5cclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0pO1xyXG5cclxuICB9OyBcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFqQXhHZXRDb3VudHJpZXMoKSB7XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGluZy10ZXh0JyApLmlubmVySFRNTCA9IHRyYW5zbGF0aW9uLmxvYWRpbmdfY291bnRyaWVzX3RleHQ7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkZXInICkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgUE9TUG9zdFJlcXVlc3QoIHdrd2Nwb3NfdmFyaWFibGUuV0tfR0VUX0NPVU5UUklFU19FTkRQT0lOVCwge30gKS50aGVuKChqc29uKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgaWYoIGpzb24gKSB7XHJcblxyXG4gICAgICAgIHJlc29sdmUoIGpzb24gKTtcclxuXHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0gKTtcclxuXHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWxsU3RhdGVzV0MgPSAoY29kZSxjb3VudHJpZXMpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBsZXQgdXNlciA9IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbjsgXHJcbiAgXHJcbiAgaWYgKHVzZXIgIT0gXCJcIikge1xyXG4gIFxyXG4gICAgICByZXR1cm4gQWpBeEdldFN0YXRlcyhjb2RlKS50aGVuKCAocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgaWYocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgfSk7XHJcblxyXG4gICBcclxuICB9OyBcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFqQXhHZXRTdGF0ZXMoY29kZSkge1xyXG5cclxuICBjb25zdCBwb3N0RGF0YSA9IHtcclxuICAgIGNvdW50cnlfY29kZTogY29kZVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcjbG9hZGluZy10ZXh0JyApLmlubmVySFRNTCA9IHRyYW5zbGF0aW9uLmxvYWRpbmdfc3RhdGVzX3RleHQ7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkZXInICkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgUE9TUG9zdFJlcXVlc3QoIHdrd2Nwb3NfdmFyaWFibGUuV0tfR0VUX1NUQVRFU19FTkRQT0lOVCwgcG9zdERhdGEgKS50aGVuKChqc29uKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgaWYoIGpzb24gKSB7IFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgcmVzb2x2ZSgganNvbi5zdGF0ZXMgKTsgIFxyXG5cclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSApO1xyXG5cclxuICB9KTtcclxuXHJcbn0iLCJpbXBvcnQgZGF0YWJhc2UgZnJvbSAnLi8uLi8uLi9kYXRhYmFzZSc7XHJcbmltcG9ydCB7IHRyYW5zbGF0aW9uIH0gZnJvbSAnLi4vLi4vdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgd2t3Y3Bvc192YXJpYWJsZSBmcm9tICcuLy4uLy4uL2NvbmZpZyc7XHJcbmltcG9ydCB7IFBPU1Bvc3RSZXF1ZXN0IH0gZnJvbSAnLi8uLi8uLi9oYXNoJztcclxuXHJcbmV4cG9ydCBjb25zdCBQT1NfU0FMRSA9ICdQT1NfU0FMRSc7IFxyXG5cclxuZXhwb3J0IGNvbnN0IHNldFNhbGUgPSAoIHNhbGUgKSA9PiB7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBQT1NfU0FMRSxcclxuICAgIHNhbGVcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2FsZUhpc3RvcnlXQyA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xyXG5cclxuICBsZXQgdXNlciA9IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbjsgXHJcbiAgXHJcbiAgaWYgKHVzZXIgIT0gXCJcIikge1xyXG4gICAgXHJcbiAgICBsb2FkU2FsZUhpc3RvcnkoKS50aGVuKCAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgICBpZiggcmVzdWx0Lmxlbmd0aCA8PSAwICkgeyBcclxuXHJcbiAgICAgICAgICBBakF4R2V0U2FsZUhpc3RvcnkoKS50aGVuKCAocmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgIGxldCBzYWxlT2JqID0ge1xyXG4gICAgICAgICAgICAgICAgbGlzdCA6IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgICAgaXNGZXRjaGluZyA6IDEsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGRpc3BhdGNoKHNldFNhbGUoc2FsZU9iaikpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIGxldCBzT2JqID0ge1xyXG4gICAgICAgICAgICBsaXN0IDogcmVzdWx0LFxyXG4gICAgICAgICAgICBpc0ZldGNoaW5nIDogMSxcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkaXNwYXRjaChzZXRTYWxlKHNPYmopKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICB9OyBcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFqQXhHZXRTYWxlSGlzdG9yeSgpIHtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkaW5nLXRleHQnICkuaW5uZXJIVE1MID0gdHJhbnNsYXRpb24ubG9hZGluZ19zYWxlX3RleHQ7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJyNsb2FkZXInICkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgUE9TUG9zdFJlcXVlc3QoIHdrd2Nwb3NfdmFyaWFibGUuV0tfR0VUX1NBTEVfSElTVE9SWV9FTkRQT0lOVCwge30gKS50aGVuKChqc29uKSA9PiB7XHJcblxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnI2xvYWRlcicgKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgaWYoIGpzb24gKSB7XHJcbiAgXHJcbiAgICAgICAgZGF0YWJhc2UudGFibGUoJ3Bvc19zYWxlJykuYnVsa1B1dChqc29uKS50aGVuKChyZXNwb25zZSkgPT4geyBcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoIGpzb24gKTsgXHJcblxyXG4gICAgICAgIH0pOyBcclxuXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9ICk7XHJcblxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFNhdmVTYWxlSGlzdG9yeVRvREIgPSAoanNvbikgPT4gKGRpc3BhdGNoKSA9PiB7XHJcbiBcclxuICAgIGlmKCBqc29uICkge1xyXG5cclxuICAgICAgICByZXR1cm4gZGF0YWJhc2UucG9zX3NhbGUuYnVsa1B1dChqc29uKS50aGVuKChyc3VsdCkgPT4ge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICByZXR1cm4gcnN1bHQ7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkU2FsZUhpc3RvcnkoKSB7XHJcbiAgXHJcbiAgcmV0dXJuIGRhdGFiYXNlLnRhYmxlKCdwb3Nfc2FsZScpLnRvQXJyYXkoKS50aGVuKCAoc2FsZURhdGEpID0+IHtcclxuICAgICBcclxuICAgIHJldHVybiBzYWxlRGF0YTtcclxuICAgIFxyXG4gIH0pO1xyXG4gXHJcbn1cclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmltcG9ydCBkYXRhYmFzZSBmcm9tICcuLi8uLi8uLi9kYXRhYmFzZSc7XG5pbXBvcnQgeyBnZXRBbGxDdXJyZW5jeVdDIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9jdXJyZW5jeSdcbmltcG9ydCB7IGdldEFsbEN1c3RvbWVyc1dDIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9jdXN0b21lcnMnO1xuaW1wb3J0IHsgZ2V0QWxsT3JkZXJzV0MgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL29yZGVycyc7XG5pbXBvcnQgeyB0YXhBY2NvdW50IH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy90YXgnO1xuaW1wb3J0IHsgZ2V0SW52b2ljZVRlbXBsYXRlIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9pbnZvaWNlJztcbmltcG9ydCB7IGdldEFsbENhdGVnb3JpZXMgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL2NhdGVnb3JpZXMnO1xuaW1wb3J0IHsgZ2V0U2FsZUhpc3RvcnlXQyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvc2FsZSc7XG5pbXBvcnQgeyBnZXRBbGxQcm9kdWN0cyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvcHJvZHVjdHMnO1xuaW1wb3J0IHsgZ2V0QWxsQ2FydFByb2R1Y3RzLCBjbGVhckluZGV4REIgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL2NhcnQnO1xuaW1wb3J0IHsgZ2V0Q3VycmVudENhcnQgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL2N1cnJlbnRjYXJ0JztcbmltcG9ydCB7IGdldEFsbERpc2NvdW50V0MgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL2Rpc2NvdW50JztcbmltcG9ydCB7IGdldEFsbENvdXBvbldDIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9jb3Vwb24nO1xuaW1wb3J0IHsgZ2V0QWxsSG9sZENhcnRQcm9kdWN0cyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvaG9sZCc7XG5pbXBvcnQgeyBnZXRBbGxDb3VudHJpZXNXQyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvY291bnRyaWVzJztcbmltcG9ydCB7IGdldFNlc3Npb25JREF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9hdXRoZW50aWNhdGlvbic7XG5pbXBvcnQgd2t3Y3Bvc192YXJpYWJsZSBmcm9tICcuLi8uLi8uLi9jb25maWcnO1xuXG5pbXBvcnQgICcuL3Njc3MvbWVudS5zY3NzJztcbmltcG9ydCB7IHRyYW5zbGF0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgYXBwbHlGaWx0ZXJzLCBkb0FjdGlvbiB9IGZyb20gJ0B3b3JkcHJlc3MvaG9va3MnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAd29yZHByZXNzL2kxOG4nO1xuXG5leHBvcnQgY29uc3QgTUVOVVNfRklMVEVSID0gJ3drd2Nwb3NfbWVudXNfbGlzdCc7XG5leHBvcnQgY29uc3QgUkVTRVRfQUNUSU9OID0gJ3drd2Nwb3NfcmVzZXRfYWN0aW9uJztcbmV4cG9ydCBjb25zdCBBQ1RJT04gPSAnd2t3Y3Bvc19leGFtcGxlX2FjdGlvbic7XG5leHBvcnQgY29uc3QgQVVUSEVOVElDQVRFX0NBUlRfUkVTRVRfUkVRVUVTVCA9ICd3a3djcG9zX2F1dGhlbnRpY2F0ZV9jYXJ0X3Jlc2V0X3JlcXVlc3QnO1xuZXhwb3J0IGNvbnN0IEFERF9NRU5VU19CRUZPUkVfU0VUVElOR1NfRklMVEVSID0gJ3drd2Nwb3NfYWRkX21lbnVzX2JlZm9yZV9zZXR0aW5ncyc7XG5cbmNsYXNzIE1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcblxuICAgICAgICBkb0FjdGlvbiggQUNUSU9OICk7XG5cbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIC8vIFRoaXMgYmluZGluZyBpcyBuZWNlc3NhcnkgdG8gbWFrZSBgdGhpc2Agd29yayBpbiB0aGUgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5oYW5kbGVMaUNsaWNrID0gdGhpcy5oYW5kbGVMaUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZ2V0TWVudXMgPSB0aGlzLmdldE1lbnVzLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlTGlDbGljayhldmVudCkge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGxldCB0YXJnZXRWYWwgPSBqUXVlcnkoZXZlbnQudGFyZ2V0KS5kYXRhKCd0YXJnZXQnKTtcbiAgICAgICAgaWYgKHRhcmdldFZhbCAhPSB1bmRlZmluZWQgJiYgdGFyZ2V0VmFsID09ICcjcG9zLXJlc2V0Jykge1xuICAgICAgICAgICAgalF1ZXJ5KCcjbG9hZGluZy10ZXh0JykudGV4dCh0cmFuc2xhdGlvbi5yZWxvYWRpbmdfdGV4dCk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI2xvYWRlcicpLnNob3coKTtcblxuICAgICAgICAgICAgZGF0YWJhc2UudGFibGUoJ3Bvc19zYWxlJykuY2xlYXIoKS50aGVuKChyZXN1bHQpPT57XG5cbiAgICAgICAgICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX2N1c3RvbWVycycpLmNsZWFyKCkudGhlbigocmVzdWx0KT0+e1xuXG4gICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnRhYmxlKCdwb3NfcHJvZHVjdHMnKS5jbGVhcigpLnRoZW4oKHJlc3VsdCk9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2UudGFibGUoJ3Bvc19jYXRlZ29yaWVzJykuY2xlYXIoKS50aGVuKChyZXN1bHQpPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX3JlbW92ZV9pZCcpLmNsZWFyKCkudGhlbigocmVzdWx0KT0+e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnRhYmxlKCdwb3NfaG9sZHMnKS5jbGVhcigpLnRoZW4oKHJlc3VsdCk9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2UudGFibGUoJ3Bvc19jb3Vwb24nKS5jbGVhcigpLnRoZW4oKHJlc3VsdCk9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnRhYmxlKCdwb3NfZGlzY291bnQnKS5jbGVhcigpLnRoZW4oKHJlc3VsdCk9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX2N1cnJlbmN5JykuY2xlYXIoKS50aGVuKChyZXN1bHQpPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFiYXNlLnRhYmxlKCdwb3NfY2FydCcpLmNsZWFyKCkudGhlbigocmVzdWx0KT0+e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2UudGFibGUoJ3Bvc19jdXJyZW50X2NhcnQnKS5jbGVhcigpLnRoZW4oKHJlc3VsdCk9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX3RlbXAnKS5jbGVhcigpLnRoZW4oKHJlc3VsdCk9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2UudGFibGUoJ3Bvc190YXgnKS5jbGVhcigpLnRoZW4oKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX2ludm9pY2UnKS5jbGVhcigpLnRoZW4oKHJlc3VsdCk9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX29yZGVycycpLndoZXJlKCdvcmRlcl90eXBlJykuZXF1YWxzKCdvbmxpbmUnKS5kZWxldGUoKS50aGVuKChyZXN1bHQpPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvQWN0aW9uKCBSRVNFVF9BQ1RJT04sIGRhdGFiYXNlLCB0aGlzLnByb3BzICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLnByb3BzLnBhZ2UubmFtZSA9PSAnSG9tZScgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRTZXNzaW9uSURBdXRoZW50aWNhdGlvbigpKS50aGVuKCAocmVzKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0QWxsQ3VycmVuY3lXQygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0U2FsZUhpc3RvcnlXQygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0Q3VycmVudENhcnQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbENhdGVnb3JpZXMoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbE9yZGVyc1dDKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRBbGxDdXN0b21lcnNXQygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2godGF4QWNjb3VudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0QWxsUHJvZHVjdHMoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbERpc2NvdW50V0MoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbENvdW50cmllc1dDKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRBbGxDb3Vwb25XQygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZ2V0QWxsQ2FydFByb2R1Y3RzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRBbGxIb2xkQ2FydFByb2R1Y3RzKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGdldEludm9pY2VUZW1wbGF0ZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyNsb2FkZXInKS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaCgge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogd2t3Y3Bvc192YXJpYWJsZS5IT01FX1VSTCArICcvcG9zJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRNZW51cygpIHtcblxuICAgICAgICBsZXQgaG9tZU1lbnVDbGFzcyA9ICd3a3djcG9zLW1lbnUtbGlzdCc7XG4gICAgICAgIGxldCBjdXN0b21lcnNNZW51Q2xhc3MgPSAnd2t3Y3Bvcy1tZW51LWxpc3QnO1xuICAgICAgICBsZXQgY2FzaGllck1lbnVDbGFzcyA9ICd3a3djcG9zLW1lbnUtbGlzdCc7XG4gICAgICAgIGxldCBvcmRlcnNNZW51Q2xhc3MgPSAnd2t3Y3Bvcy1tZW51LWxpc3QnO1xuICAgICAgICBsZXQgcmVwb3J0c01lbnVDbGFzcyA9ICd3a3djcG9zLW1lbnUtbGlzdCc7XG5cbiAgICAgICAgaWYoIHRoaXMucHJvcHMucGFnZS5uYW1lICE9IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgc3dpdGNoKCB0aGlzLnByb3BzLnBhZ2UubmFtZSApIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0NhdGVnb3J5JzpcbiAgICAgICAgICAgICAgICAgICAgaG9tZU1lbnVDbGFzcyArPSAnIHBvcy1hY3RpdmUnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdDdXN0b21lcnMnOlxuICAgICAgICAgICAgICAgICAgICBjdXN0b21lcnNNZW51Q2xhc3MgKz0gJyBwb3MtYWN0aXZlJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQ2FzaGllcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnQ2FzaGllciBEcmF3ZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0Nhc2hpZXIgVG9kYXknOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0Nhc2hpZXIgU2FsZSc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2hpZXJNZW51Q2xhc3MgKz0gJyBwb3MtYWN0aXZlJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnT3JkZXJzJzpcbiAgICAgICAgICAgICAgICBjYXNlICdIb2xkIFNhbGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ09mZmxpbmUgU2FsZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnT3JkZXIgSGlzdG9yeSc6XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyc01lbnVDbGFzcyArPSAnIHBvcy1hY3RpdmUnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdSZXBvcnRzJzpcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0c01lbnVDbGFzcyArPSAnIHBvcy1hY3RpdmUnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcmRlcnMgPSB0cmFuc2xhdGlvbi5vcmRlcnM7XG4gICAgICAgIGNvbnN0IGNhc2hpZXIgPSB0cmFuc2xhdGlvbi5jYXNoaWVyO1xuICAgICAgICBjb25zdCBob21lID0gdHJhbnNsYXRpb24uaG9tZTtcbiAgICAgICAgY29uc3QgY3VzdG9tZXJzID0gdHJhbnNsYXRpb24uY3VzdG9tZXJzO1xuXG4gICAgICAgIGNvbnN0IG1lbnVzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRvOiB3a3djcG9zX3ZhcmlhYmxlLkhPTUVfVVJMICsgJy9wb3MnLFxuICAgICAgICAgICAgICAgIGNsYXNzbmFtZTogaG9tZU1lbnVDbGFzcyxcbiAgICAgICAgICAgICAgICBpY29uX2NsYXNzbmFtZTogJ2ZhIGZhLWhvbWUnLFxuICAgICAgICAgICAgICAgIHRleHQ6IGhvbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG86IHdrd2Nwb3NfdmFyaWFibGUuSE9NRV9VUkwgKyAnL3Bvcy9jdXN0b21lcnMnLFxuICAgICAgICAgICAgICAgIGNsYXNzbmFtZTogY3VzdG9tZXJzTWVudUNsYXNzLFxuICAgICAgICAgICAgICAgIGljb25fY2xhc3NuYW1lOiAnZmEgZmEtYWRkcmVzcy1ib29rJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBjdXN0b21lcnNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG86IHdrd2Nwb3NfdmFyaWFibGUuSE9NRV9VUkwgKyAnL3Bvcy9jYXNoaWVyJyxcbiAgICAgICAgICAgICAgICBjbGFzc25hbWU6IGNhc2hpZXJNZW51Q2xhc3MsXG4gICAgICAgICAgICAgICAgaWNvbl9jbGFzc25hbWU6ICdmYSBmYS11c2VyJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBjYXNoaWVyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRvOiB3a3djcG9zX3ZhcmlhYmxlLkhPTUVfVVJMICsgJy9wb3Mvb3JkZXJzJyxcbiAgICAgICAgICAgICAgICBjbGFzc25hbWU6IG9yZGVyc01lbnVDbGFzcyxcbiAgICAgICAgICAgICAgICBpY29uX2NsYXNzbmFtZTogJ2ZhIGZhLWZpbGUnLFxuICAgICAgICAgICAgICAgIHRleHQ6IG9yZGVyc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0bzogd2t3Y3Bvc192YXJpYWJsZS5IT01FX1VSTCArICcvcG9zL3JlcG9ydHMnLFxuICAgICAgICAgICAgICAgIGNsYXNzbmFtZTogcmVwb3J0c01lbnVDbGFzcyxcbiAgICAgICAgICAgICAgICBpY29uX2NsYXNzbmFtZTogJ2ZhIGZhLXRhY2hvbWV0ZXInLFxuICAgICAgICAgICAgICAgIHRleHQ6IF9fKCAnUmVwb3J0cycsICd3Y19wb3MnIClcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIGFwcGx5RmlsdGVycyggTUVOVVNfRklMVEVSLCBtZW51cywgdGhpcywgd2t3Y3Bvc192YXJpYWJsZSApO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGxldCB1c2VyID0gdGhpcy5wcm9wcy51c2VyO1xuICAgICAgICBsZXQgbG9nb3V0X3VybCA9IGFwaWZfc2NyaXB0LmxvZ291dF91cmw7XG4gICAgICAgIHZhciByZXNldCA9IHRyYW5zbGF0aW9uLnJlc2V0O1xuICAgICAgICB2YXIgcmVzZXRfY2FydCA9IHRyYW5zbGF0aW9uLnJlc2V0X2NhcnQ7XG4gICAgICAgIHZhciBjYXNoaWVyID0gdHJhbnNsYXRpb24uY2FzaGllcjtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gdHJhbnNsYXRpb24uc2V0dGluZ3M7XG4gICAgICAgIHZhciBwcm9maWxlX3BpYyA9ICcnO1xuICAgICAgICBpZih1c2VyLnByb2ZpbGVfcGljID09ICcnICl7XG4gICAgICAgICAgICBwcm9maWxlX3BpYyA9IGFwaWZfc2NyaXB0LmFzc2V0cyArIFwiL2ltYWdlcy8xNzI0MS0yMDAucG5nXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcHJvZmlsZV9waWMgPSB1c2VyLnByb2ZpbGVfcGljXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNldHRpbmdzTWVudUNsYXNzID0gJ3drd2Nwb3MtbWVudS1saXN0JztcbiAgICAgICAgbGV0IHJlc2V0TWVudUNsYXNzID0gJ3drd2Nwb3MtbWVudS1saXN0JztcbiAgICAgICAgbGV0IGxvZ291dE1lbnVDbGFzcyA9ICd3a3djcG9zLW1lbnUtbGlzdCc7XG5cbiAgICAgICAgY29uc3QgbWVudXNMaXN0SFRNTCA9IHRoaXMuZ2V0TWVudXMoKS5tYXAoIG1lbnUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkga2V5PXttZW51LnRvfT5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPXttZW51LmNsYXNzbmFtZX0gdG89e21lbnUudG99PjxzcGFuIGNsYXNzTmFtZT17bWVudS5pY29uX2NsYXNzbmFtZX0+PC9zcGFuPnttZW51LnRleHR9PC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApO1xuICAgICAgICB9ICk7XG5cbiAgICAgICAgaWYoIHRoaXMucHJvcHMucGFnZS5uYW1lICE9IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgc3dpdGNoKCB0aGlzLnByb3BzLnBhZ2UubmFtZSApIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1NldHRpbmdzJzpcbiAgICAgICAgICAgICAgICBjYXNlICdBY2NvdW50IFNldHRpbmdzJzpcbiAgICAgICAgICAgICAgICBjYXNlICdPdGhlciBTZXR0aW5ncyc6XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzTWVudUNsYXNzICs9ICcgcG9zLWFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGFzaWRlIGNsYXNzTmFtZT1cInNpZGUtbmF2aWdhdGlvblwiPlxuICAgICAgICAgICAgICAgIDxuYXY+XG4gICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHttZW51c0xpc3RIVE1MfVxuICAgICAgICAgICAgICAgICAgICAgICAge2FwcGx5RmlsdGVycyggQUREX01FTlVTX0JFRk9SRV9TRVRUSU5HU19GSUxURVIsICcnLCB0aGlzICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPXtzZXR0aW5nc01lbnVDbGFzc30gdG89e3drd2Nwb3NfdmFyaWFibGUuSE9NRV9VUkwgKyAnL3Bvcy9zZXR0aW5ncyd9PjxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLXdyZW5jaFwiPjwvc3Bhbj57c2V0dGluZ3N9PC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9e3Jlc2V0TWVudUNsYXNzfSBkYXRhLXRhcmdldD1cIiNwb3MtcmVzZXRcIiB0bz17d2t3Y3Bvc192YXJpYWJsZS5IT01FX1VSTCArICcvcG9zJ30gb25DbGljaz17KChlKSA9PiB0aGlzLmhhbmRsZUxpQ2xpY2soZSkpfSA+PHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtdW5kbyByZXNldC1zeXN0ZW1cIiBkYXRhLXRhcmdldD1cIiNwb3MtcmVzZXRcIiA+PC9zcGFuPntyZXNldH08L0xpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibWVudS1jYXNoaWVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBhbHQ9XCJwb3MgY2FzaGllclwiIHNyYz17cHJvZmlsZV9waWN9IHNyY1NldD17cHJvZmlsZV9waWN9IGNsYXNzTmFtZT1cImF2YXRhciBhdmF0YXItOTYgcGhvdG9cIiBoZWlnaHQ9XCI1MFwiIHdpZHRoPVwiNTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57IGFwaWZfc2NyaXB0LmxvZ2dlZF9pbi5mbmFtZSB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e2xvZ291dE1lbnVDbGFzc30gaHJlZj17bG9nb3V0X3VybH0+PHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtc2lnbi1vdXRcIj48L3NwYW4+e19fKCAnTG9nb3V0JywgJ3djX3BvcycgKX08L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgPC9hc2lkZT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKHtcbiAgICB1c2VyOnN0YXRlLmNhc2hpZXIsXG4gICAgY3VycmVudF9jYXJ0OiBzdGF0ZS5jdXJyZW50X2NhcnQsXG59KTtcblxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBkaXNwYXRjaCB9LCBiaW5kQWN0aW9uQ3JlYXRvcnMoeyBjbGVhckluZGV4REIsIGdldEFsbEN1cnJlbmN5V0MsZ2V0QWxsQ291bnRyaWVzV0MsIGdldEN1cnJlbnRDYXJ0LCBnZXRBbGxDYXRlZ29yaWVzLCBnZXRBbGxDdXN0b21lcnNXQywgdGF4QWNjb3VudCwgZ2V0QWxsUHJvZHVjdHMsIGdldEFsbE9yZGVyc1dDLCBnZXRBbGxEaXNjb3VudFdDLCBnZXRBbGxDb3Vwb25XQywgZ2V0U2FsZUhpc3RvcnlXQywgZ2V0QWxsQ2FydFByb2R1Y3RzLCBnZXRBbGxIb2xkQ2FydFByb2R1Y3RzIH0sIGRpc3BhdGNoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzICkgKE1lbnUpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgQ2FydFByb2R1Y3QgZnJvbSAnLi9wcm9kdWN0cy9saXN0LmpzeCc7XG5pbXBvcnQgQ2FydFRvdGFsIGZyb20gJy4vdG90YWwvdG90YWwuanN4JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcbmltcG9ydCAnLi9zY3NzL2NhcnQuc2Nzcyc7XG5pbXBvcnQgeyBhZGRUb0NhcnQsIGNsZWFySW5kZXhEQiwgZ2V0QWxsQ2FydFByb2R1Y3RzfSBmcm9tICcuLi8uLi8uLi8uLi9hY3Rpb25zL2NhcnQnO1xuaW1wb3J0IHsgdHJhbnNsYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi90cmFuc2xhdGlvbi5qcyc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBhcHBseUZpbHRlcnMgfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcbmltcG9ydCB3a3djcG9zX3ZhcmlhYmxlIGZyb20gJy4uLy4uLy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBnZXRBbGxEaXNjb3VudFdDIH0gZnJvbSAnLi4vLi4vLi4vLi4vYWN0aW9ucy9kaXNjb3VudC9pbmRleC5qcyc7XG5pbXBvcnQgeyBnZXRBbGxDb3Vwb25XQyB9IGZyb20gJy4uLy4uLy4uLy4uL2FjdGlvbnMvY291cG9uL2luZGV4LmpzJztcbmV4cG9ydCBjb25zdCBDT1VOVEVSX01PRElGWV9DQVJUX0FDVElPTlMgPSAnd2t3Y3Bvc19tb2RpZnlfY2FydF9hY3Rpb25zJztcbmV4cG9ydCBjb25zdCBDQVJUX0lTX01PRElGSUNBVElPTl9BTExPV0VEID0gJ3drd2Nwb3NfY2FydF9pc19tb2RpZmljYXRpb25fYWxsb3dlZCc7XG5leHBvcnQgY29uc3QgVVBEQVRFX0tFWV9WQUxVRV9BTkRfUVVBTlRJVFkgPSAnd2t3Y3Bvc191cGRhdGVfa2V5X3ZhbHVlX2FuZF9xdWFudGl0eSc7XG5leHBvcnQgY29uc3QgVVBEQVRFX1ZJUlRVQUxfUFJPRFVDVF9ERVRBSUxTID0gJ3drd2Nwb3NfdXBkYXRlX3ZpcnR1YWxfcHJvZHVjdF9kZXRhaWxzJ1xuZXhwb3J0IGNvbnN0IEFVVEhFTlRJQ0FURV9DQVJUX1JFU0VUX1JFUVVFU1QgPSAnd2t3Y3Bvc19hdXRoZW50aWNhdGVfY2FydF9yZXNldF9yZXF1ZXN0JztcblxuY2xhc3MgQ2FydCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQmFyY29kZUxpQ2xpY2sgPSB0aGlzLmhhbmRsZUJhcmNvZGVMaUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQ3VzdG9tQ2xpY2sgPSB0aGlzLmhhbmRsZUN1c3RvbUNsaWNrLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ3VzdG9tQ2xpY2soZXZlbnQsIGFjdGlvbil7XG4gICAgICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGxldCBjdXJyZW50X2NhcnQgPSB0aGlzLnByb3BzLmN1cnJlbnRfY2FydDtcbiAgICAgICAgbGV0IHRheCA9IHRoaXMucHJvcHMudGF4Lmxpc3Q7XG4gICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uID09ICdjYXJ0JyApIHtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5RmlsdGVycyhBVVRIRU5USUNBVEVfQ0FSVF9SRVNFVF9SRVFVRVNULCB0cnVlLCB0aGlzLnByb3BzLCB0cmFuc2xhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgJiZcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goY2xlYXJJbmRleERCKGN1cnJlbnRfY2FydCkpLnRoZW4oIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbENhcnRQcm9kdWN0cygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbERpc2NvdW50V0MoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRBbGxDb3Vwb25XQygpKTtcbiAgICAgICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeS5jb25maXJtKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdHJhbnNsYXRpb24uYWRkX3Byb2R1Y3RfYWRkLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6JzxkaXYgY2xhc3M9IGN1c3RvbS1wcm9kdWN0PiA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPjxsYWJlbD4nK3RyYW5zbGF0aW9uLmFkZF9wcm9kdWN0X25hbWUrJzwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwcm8tbmFtZVwiICBwbGFjZWhvbGRlcj1cIicrdHJhbnNsYXRpb24uYWRkX3Byb2R1Y3RfbmFtZSsnXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhdXRvZm9jdXMgPjwvZGl2PjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+PGxhYmVsPicrdHJhbnNsYXRpb24uYWRkX3Byb2R1Y3RfcHJpY2UrJzwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwcm8tcHJpY2VcIiBwbGFjZWhvbGRlcj1cIicrdHJhbnNsYXRpb24uYWRkX3Byb2R1Y3RfcHJpY2UrJ1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9kaXY+PC9kaXY+JyxcbiAgICAgICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5IDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRpb24uYWRkX3RleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5DbGFzczogJ2J0bi1jdXN0b20tcHJvZHVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9fbmFtZSA9IHRoaXMuJGNvbnRlbnQuZmluZCgnaW5wdXQjcHJvLW5hbWUnKS52YWwoKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9fcHJpY2UgPSB0aGlzLiRjb250ZW50LmZpbmQoJ2lucHV0I3Byby1wcmljZScpLnZhbCgpLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9fbmFtZS5sZW5ndGggPCAzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogdHJhbnNsYXRpb24udmFsaWRhdGVfcHJvZHVjdF9uYW1lX2xlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3JlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvX3ByaWNlLmxlbmd0aCA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi52YWxpZGF0ZV9wcm9kdWN0X3ByaWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaXNOYU4ocHJvX3ByaWNlLnRyaW0oKSkgfHwgcGFyc2VGbG9hdChwcm9fcHJpY2UpIDwgMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRyYW5zbGF0aW9uLnZhbGlkYXRlX3Byb2R1Y3RfcHJpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2R1Y3RfdGF4ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcGlmX3NjcmlwdC5sb2dnZWRfaW4udGF4X2Rpc3BsYXlfY2FydCA9PSAnZXhjbCcpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcGlmX3NjcmlwdC5sb2dnZWRfaW4udGF4X3R5cGUgPT0gJ3llcycpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRheF9yYXRlID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5lYWNoKHRheCwgKGksIHZhbCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwucmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGF4X3JhdGUgPSB0YXhfcmF0ZSArIHZhbC5yYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWxfcHJpY2UgID0gKChwcm9fcHJpY2UgKiAxMDApIC8gKDEwMCArIHRheF9yYXRlKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdGF4ID0gIHByb19wcmljZSAtIHJlYWxfcHJpY2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9fcHJpY2UgPSByZWFsX3ByaWNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5lYWNoKHRheCwgKGksIHZhbCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwucmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF90YXggPSBwcm9kdWN0X3RheCArICggcHJvX3ByaWNlICogdmFsLnJhdGUgLyAxMDAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFwaWZfc2NyaXB0LmxvZ2dlZF9pbi50YXhfdHlwZSAhPSAneWVzJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmVhY2godGF4LCAoaSwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwucmF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF90YXggPSBwcm9kdWN0X3RheCArICggcHJvX3ByaWNlICogdmFsLnJhdGUgLyAxMDAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb19wcmljZSA9IHBhcnNlRmxvYXQocGFyc2VGbG9hdChwcm9fcHJpY2UpICsgcGFyc2VGbG9hdChwcm9kdWN0X3RheCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdGF4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aXJ0dWFsX3Byb2R1Y3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X25hbWU6cHJvX25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3ByaWNlOnByb19wcmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdGF4OiBwcm9kdWN0X3RheCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlydHVhbF9wcm9kdWN0ID0gYXBwbHlGaWx0ZXJzKFVQREFURV9WSVJUVUFMX1BST0RVQ1RfREVUQUlMUywgdmlydHVhbF9wcm9kdWN0LCB0aGlzLnByb3BzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCggYWRkVG9DYXJ0KGN1cnJlbnRfY2FydCwgdmlydHVhbF9wcm9kdWN0LCBmYWxzZSkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGhhbmRsZUJhcmNvZGVMaUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHZhciBxdWFudGl0eSA9IDE7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGRpc3BhdGNoXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBsZXQgY3VycmVudF9jYXJ0ID0gdGhpcy5wcm9wcy5jdXJyZW50X2NhcnQ7XG4gICAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHNcblxuXG4gICAgICAgIGpRdWVyeSgnI2Jhci1jb2RlJykudmFsKCcnKTtcblxuICAgICAgICBqUXVlcnkuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogdHJhbnNsYXRpb24uYmFyY29kZV9lbnRlcl90ZXh0LFxuICAgICAgICAgICAgY29udGVudDogJzxkaXY+IDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+PGlucHV0IGF1dG9mb2N1cyB0eXBlPVwidGV4dFwiIGlkPVwiYmFyLWNvZGVcIiBwbGFjZWhvbGRlcj1cIicgKyB0cmFuc2xhdGlvbi5iYXJjb2RlX2VudGVyX3RleHQgKyAnXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L2Rpdj48L2Rpdj4nLFxuICAgICAgICAgICAgb25Db250ZW50UmVhZHk6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGpRdWVyeShcIiNiYXItY29kZVwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkud2hpY2ggPT0gMTMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y3QgPSBqUXVlcnkodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSBwcm9kdWN0LnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiYXJjb2RlX2RhdGEgPSBhcHBseUZpbHRlcnMoVVBEQVRFX0tFWV9WQUxVRV9BTkRfUVVBTlRJVFksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHN0cixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdHk6IHF1YW50aXR5XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBwcm9wcylcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gYmFyY29kZV9kYXRhLmtleVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFudGl0eSA9IGJhcmNvZGVfZGF0YS5xdHlcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ5QmFyY29kZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyLnN0YXJ0c1dpdGgoXCJza3VcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBieUJhcmNvZGUgPSAnc2t1J1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygzLCBzdHIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnlCYXJjb2RlID0gJ2lkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMiwgc3RyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGFkZFRvQ2FydChjdXJyZW50X2NhcnQsIHN0ciwgYnlCYXJjb2RlLCBbXSwgJycsIHF1YW50aXR5KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS52YWwoJycpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGpRdWVyeSgnI2Jhci1jb2RlJykuZm9jdXMoKTtcbiAgICAgICAgfSwgNTAwKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGNhcnRfcHJvZHVjdHMgPSAnJztcbiAgICAgICAgbGV0IGNhcnQgPSBBcnJheS5mcm9tKHRoaXMucHJvcHMuY2FydCk7XG4gICAgICAgIGxldCBjdXJyZW50X2NhcnQgPSB0aGlzLnByb3BzLmN1cnJlbnRfY2FydDtcbiAgICAgICAgdmFyIGN1c3RvbWVycyA9IHRoaXMucHJvcHMuY3VzdG9tZXJzO1xuICAgICAgICBsZXQgY3VycmVuY3kgPSB0aGlzLnByb3BzLmN1cnJlbmN5O1xuICAgICAgICB2YXIgY3VzdG9tX3ZhciA9IEFycmF5LmZyb20oY3VycmVuY3kuZGVmYXVsdCk7XG4gICAgICAgIHZhciBjdXJyZW5jeV9zeW1ib2wgPSBjdXN0b21fdmFyLm1hcCggKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnN5bWJvbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBjdXN0b21lcl9uYW1lID0gJ1NlbGVjdCBDdXN0b21lcic7XG4gICAgICAgIHZhciBjdXN0b21lcl9lbWFpbCA9IF9fKCdObyBjdXN0b21lciBzZWxlY3RlZCcsICd3Y19wb3MnKTtcbiAgICAgICAgdmFyIGN1c3RvbWVyX2ltYWdlID0gJ2h0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8/ZD1pZGVudGljb24nO1xuICAgICAgICB2YXIgZGVmYXVsdF9jdXN0b21lciA9IChjdXN0b21lcnMuZGVmYXVsdC5sZW5ndGggPiAwKSA/IGN1c3RvbWVycy5kZWZhdWx0WzBdIDogJyc7XG4gICAgICAgIGlmIChkZWZhdWx0X2N1c3RvbWVyKSB7XG4gICAgICAgICAgICBjdXN0b21lcl9uYW1lID0gZGVmYXVsdF9jdXN0b21lci51c2VybmFtZTtcbiAgICAgICAgICAgIGN1c3RvbWVyX2ltYWdlID0gZGVmYXVsdF9jdXN0b21lci5hdmF0YXJfdXJsO1xuICAgICAgICAgICAgY3VzdG9tZXJfZW1haWwgPSBkZWZhdWx0X2N1c3RvbWVyLmVtYWlsO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBjYXJ0Lmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICB2YXIgY2FydF9wcm9kdWN0c19maWx0ZXJlZCA9IGNhcnQuZmlsdGVyKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIGVsZW1lbnQuY2FydF9pZCA9PSBjdXJyZW50X2NhcnQgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBlbGVtZW50LmNhcnQubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5tYXAoKGVsbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbG0uY2FydDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoY2FydF9wcm9kdWN0c19maWx0ZXJlZC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGNhcnRfcHJvZHVjdHMgPSBjYXJ0X3Byb2R1Y3RzX2ZpbHRlcmVkWzBdLm1hcCgocmVzcG9uc2UsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuKDxDYXJ0UHJvZHVjdCBrZXk9e2l9IGN1cnJlbmN5X3N5bWJvbD17Y3VycmVuY3lfc3ltYm9sfSBjdXJyZW50X2NhcnQ9e2N1cnJlbnRfY2FydH0gY2FydFByb2R1Y3RzPXtyZXNwb25zZX0gey4uLnRoaXMucHJvcHN9PjwvQ2FydFByb2R1Y3Q+KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJwb3MtdGFiQ29udGVudCBwb3MtY2FydFwiIGlkPVwicG9zLWNhcnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcnQtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcnQtdGFibGUtaGVhZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwicG9zLWN1c3RvbWVyLWJveFwiIHRvPXt3a3djcG9zX3ZhcmlhYmxlLkhPTUVfVVJMICsgJy9wb3MvY3VzdG9tZXJzJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyB3aWR0aD1cIjUwcHhcIiBzcmM9e2N1c3RvbWVyX2ltYWdlfSBhbHQ9e2N1c3RvbWVyX25hbWV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjLW1ldGFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PntjdXN0b21lcl9uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNT57Y3VzdG9tZXJfZW1haWx9PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthcHBseUZpbHRlcnMoQ0FSVF9JU19NT0RJRklDQVRJT05fQUxMT1dFRCwgZmFsc2UsIHRoaXMucHJvcHMpXG4gICAgICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKENPVU5URVJfTU9ESUZZX0NBUlRfQUNUSU9OUywgJycsIHRoaXMucHJvcHMsIHRyYW5zbGF0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbmFtZT1cImFkZC1wcm9kdWN0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImFkZC1wcm9kdWN0XCIgb25DbGljaz17dGhpcy5oYW5kbGVDdXN0b21DbGlja30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXBsdXNcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cIndrd2Nwb3MtbWVudS1saXN0XCIgZGF0YS10YXJnZXQ9XCIjcG9zLWNhcnQtcmVzZXRcIiB0bz17d2t3Y3Bvc192YXJpYWJsZS5IT01FX1VSTCArICcvcG9zJ30gb25DbGljaz17KChlKSA9PiB0aGlzLmhhbmRsZUN1c3RvbUNsaWNrKGUsICdjYXJ0JykpfSA+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdHJhc2hcIj48L2k+PC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG5hbWU9XCJiYXJjb2RlLXNjYW5cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYmFyY29kZS1zY2FuXCIgb25DbGljaz17dGhpcy5oYW5kbGVCYXJjb2RlTGlDbGlja30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJhcmNvZGVcIiA+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FydF9wcm9kdWN0c19maWx0ZXJlZCAhPSB1bmRlZmluZWQgJiYgY2FydF9wcm9kdWN0c19maWx0ZXJlZC5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FydC10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD57Y2FydF9wcm9kdWN0c308L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Q2FydFRvdGFsIHsuLi50aGlzLnByb3BzfT48L0NhcnRUb3RhbD5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+ICh7XG4gICAgY2FydDpzdGF0ZS5jYXJ0Lmxpc3QsXG4gICAgY3VycmVudF9jYXJ0OnN0YXRlLmN1cnJlbnRfY2FydCxcbiAgICB0YXg6c3RhdGUudGF4LFxuICAgIGN1cnJlbmN5OnN0YXRlLmN1cnJlbmN5LFxuICAgIHByb2R1Y3RzOiBzdGF0ZS5wcm9kdWN0cyxcbiAgICBjdXN0b21lcnM6IHN0YXRlLmN1c3RvbWVycyxcbiAgICBob2xkY2FydDogc3RhdGUuaG9sZC5saXN0LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIG1hcFN0YXRlVG9Qcm9wcykoQ2FydCk7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IE1vZGlmeUNhcnQsIFJlbW92ZUNhcnRQcm9kdWN0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYWN0aW9ucy9jYXJ0JztcbmltcG9ydCBSZWFjdEh0bWxQYXJzZXIgZnJvbSAncmVhY3QtaHRtbC1wYXJzZXInO1xuaW1wb3J0IHsgdHJhbnNsYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBBVVRIRU5USUNBVEVfQ0FSVF9SRVNFVF9SRVFVRVNUIH0gZnJvbSAnLi4vLi4vLi4vbWVudS9tZW51LmpzeCc7XG5pbXBvcnQgeyBhcHBseUZpbHRlcnMgfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcbmltcG9ydCB7IHdrd2Nwb3NfcHJpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jdXJyZW5jeS1mb3JtYXQnO1xuaW1wb3J0IHsgX18gfSBmcm9tICdAd29yZHByZXNzL2kxOG4nO1xuZXhwb3J0IGNvbnN0IFNIT1dfQ0FSVF9QUk9EVUNUX0FDVElPTlNfRklMVEVSID0gJ3drd2Nwb3Nfc2hvd19jYXJ0X3Byb2R1Y3RfYWN0aW9ucyc7XG5leHBvcnQgY29uc3QgQUREX0NMQVNTX1RPX0NBUlRfVEFCTEUgPSAnd2t3Y3Bvc19hZGRfY2xhc3NfdG9fY2FydF90YWJsZSc7XG5leHBvcnQgY29uc3QgUkVNT1ZFX0VESVRfRlJPTV9DQVJUX1RBQkxFID0gJ3drd2Nwb3NfcmVtb3ZlX2VkaXRfZnJvbV9jYXJ0X3RhYmxlJztcblxuY2xhc3MgQ2FydFByb2R1Y3QgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcblxuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgLy8gVGhpcyBiaW5kaW5nIGlzIG5lY2Vzc2FyeSB0byBtYWtlIGB0aGlzYCB3b3JrIGluIHRoZSBjYWxsYmFja1xuICAgICAgICB0aGlzLkhhbmRsZVVwZGF0ZSA9IHRoaXMuSGFuZGxlVXBkYXRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuSGFuZGxlUmVtb3ZlID0gdGhpcy5IYW5kbGVSZW1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5IYW5kbGVRdWFudGl0eVVwZGF0ZSA9IHRoaXMuSGFuZGxlUXVhbnRpdHlVcGRhdGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVDbG9zZVF1YW50aXR5UG9wdXAgPSB0aGlzLmhhbmRsZUNsb3NlUXVhbnRpdHlQb3B1cC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLkhhbmRsZUVkaXRQcm9kdWN0UHJpY2UgPSB0aGlzLkhhbmRsZUVkaXRQcm9kdWN0UHJpY2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5IYW5kbGVQcm9kdWN0UHJpY2VJbnB1dCA9IHRoaXMuSGFuZGxlUHJvZHVjdFByaWNlSW5wdXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5IYW5kbGVDaGFuZ2VQcm9kdWN0UHJpY2UgPSB0aGlzLkhhbmRsZUNoYW5nZVByb2R1Y3RQcmljZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrID0gdGhpcy5oYW5kbGVCdXR0b25DbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdXBkYXRlUXVhbnRpdHlQb3B1cDogZmFsc2UsXG4gICAgICAgICAgICBlZGl0UHJvZHVjdFByaWNlOiBmYWxzZSxcbiAgICAgICAgICAgIHF1YW50aXR5RW50cnk6ICcnXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGhhbmRsZUNsb3NlUXVhbnRpdHlQb3B1cCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB1cGRhdGVRdWFudGl0eVBvcHVwOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQnV0dG9uQ2xpY2soZSwgcHJvZHVjdF9pZCwgb3B0aW9uLCBtb2RpZmllZFdlaWdodCwgcHJvZHVjdF9uYW1lKSB7XG5cbiAgICAgICAgdmFyIGJ1dHRvblByZXNzZWQgPSBqUXVlcnkoZS50YXJnZXQpLmNsb3Nlc3QoJy5udW1lcmljLWtleXBhZC1idXR0b24nKS5kYXRhKFwia2V5XCIpO1xuXG4gICAgICAgIGpRdWVyeSgnLnF1YW50aXR5LWVudHJ5JykuY3NzKCdib3JkZXInLCAnbm9uZScpO1xuXG4gICAgICAgIGxldCBxdWFudGl0eUVudHJ5ID0gdGhpcy5zdGF0ZS5xdWFudGl0eUVudHJ5LnRvU3RyaW5nKCk7XG5cbiAgICAgICAgaWYgKGJ1dHRvblByZXNzZWQgIT0gJycgfHwgYnV0dG9uUHJlc3NlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChidXR0b25QcmVzc2VkID09PSBcIm9rXCIgJiYgcXVhbnRpdHlFbnRyeSA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50X2NhcnQgPSB0aGlzLnByb3BzLmN1cnJlbnRfY2FydDtcbiAgICAgICAgICAgICAgICBxdWFudGl0eUVudHJ5ID0gcGFyc2VJbnQocXVhbnRpdHlFbnRyeSk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKE1vZGlmeUNhcnQoMSwgY3VycmVudF9jYXJ0LCBwcm9kdWN0X2lkLCAnJywgJycsIG1vZGlmaWVkV2VpZ2h0LCBwcm9kdWN0X25hbWUsIHF1YW50aXR5RW50cnkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKE1vZGlmeUNhcnQoMSwgY3VycmVudF9jYXJ0LCBwcm9kdWN0X2lkLCBvcHRpb24udmFyX2lkLCAnJywgbW9kaWZpZWRXZWlnaHQsIHByb2R1Y3RfbmFtZSwgcXVhbnRpdHlFbnRyeSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUXVhbnRpdHlQb3B1cDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJ1dHRvblByZXNzZWQgPT09IFwiQ1wiKSB7XG4gICAgICAgICAgICAgICAgcXVhbnRpdHlFbnRyeSA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChidXR0b25QcmVzc2VkID09PSAnYicpIHtcblxuICAgICAgICAgICAgICAgIGlmIChxdWFudGl0eUVudHJ5Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHlFbnRyeSA9IHF1YW50aXR5RW50cnkuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5RW50cnkgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKGJ1dHRvblByZXNzZWQpKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocXVhbnRpdHlFbnRyeSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1YW50aXR5RW50cnkgPSBidXR0b25QcmVzc2VkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRpdHlFbnRyeSA9IHF1YW50aXR5RW50cnkgKyBidXR0b25QcmVzc2VkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5xdWFudGl0eS1lbnRyeScpLmNzcygnYm9yZGVyJywgJ3NvbGlkIDFweCByZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVhbnRpdHlFbnRyeTogcXVhbnRpdHlFbnRyeVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgSGFuZGxlVXBkYXRlKHF0eSwgcHJvZHVjdF9pZCwgb3B0aW9uLCBtb2RpZmllZFdlaWdodCwgcHJvZHVjdF9uYW1lKSB7XG5cbiAgICAgICAgY29uc3QgeyBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgbGV0IGN1cnJlbnRfY2FydCA9IHRoaXMucHJvcHMuY3VycmVudF9jYXJ0O1xuICAgICAgICBpZiAocXR5ICYmIHByb2R1Y3RfaWQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24gPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKE1vZGlmeUNhcnQocXR5LCBjdXJyZW50X2NhcnQsIHByb2R1Y3RfaWQsICcnLCAnJywgbW9kaWZpZWRXZWlnaHQsIHByb2R1Y3RfbmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goTW9kaWZ5Q2FydChxdHksIGN1cnJlbnRfY2FydCwgcHJvZHVjdF9pZCwgb3B0aW9uLnZhcl9pZCwgJycsIG1vZGlmaWVkV2VpZ2h0LCBwcm9kdWN0X25hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVkaXRQcm9kdWN0UHJpY2U6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBIYW5kbGVSZW1vdmUocmVtb3ZlX2lkLCBtb2RpZmllZFdlaWdodCwgcHJvZHVjdF9uYW1lKSB7XG4gICAgICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGxldCBjdXJyZW50X2NhcnQgPSB0aGlzLnByb3BzLmN1cnJlbnRfY2FydDtcbiAgICAgICAgaWYgKHJlbW92ZV9pZCkge1xuICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKEFVVEhFTlRJQ0FURV9DQVJUX1JFU0VUX1JFUVVFU1QsIHRydWUsIHRoaXMucHJvcHMsIHRyYW5zbGF0aW9uKSAmJlxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKFJlbW92ZUNhcnRQcm9kdWN0KGN1cnJlbnRfY2FydCwgcmVtb3ZlX2lkLCBtb2RpZmllZFdlaWdodCwgcHJvZHVjdF9uYW1lKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBIYW5kbGVRdWFudGl0eVVwZGF0ZShlLCBjYXJ0UCkge1xuICAgICAgICBpZiAoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuSGFuZGxlVXBkYXRlKGUudGFyZ2V0LnZhbHVlLCBjYXJ0UC5wcm9kdWN0X2lkLCBjYXJ0UC5vcHRpb25zLCBjYXJ0UC5ib3VnaHRXZWlnaHQsIGNhcnRQLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT0gMjcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVkaXRQcm9kdWN0UHJpY2U6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIEhhbmRsZUVkaXRQcm9kdWN0UHJpY2UoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiAoe1xuICAgICAgICAgICAgZWRpdFByb2R1Y3RQcmljZTogIXByZXZTdGF0ZS5lZGl0UHJvZHVjdFByaWNlLFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgSGFuZGxlUHJvZHVjdFByaWNlSW5wdXQoZSwgcHJvZHVjdCkge1xuICAgICAgICBpZiAoZS53aGljaCA9PSAxMykge1xuICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKEFVVEhFTlRJQ0FURV9DQVJUX1JFU0VUX1JFUVVFU1QsIHRydWUsIHRoaXMucHJvcHMsIHRyYW5zbGF0aW9uKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuSGFuZGxlQ2hhbmdlUHJvZHVjdFByaWNlKHByb2R1Y3QpO1xuICAgICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT0gMjcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVkaXRQcm9kdWN0UHJpY2U6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBIYW5kbGVDaGFuZ2VQcm9kdWN0UHJpY2UocHJvZHVjdCkge1xuICAgICAgICBsZXQgcHJvZHVjdF9pZCA9IHByb2R1Y3QucHJvZHVjdF9pZDtcbiAgICAgICAgbGV0IG9wdGlvbiA9IHByb2R1Y3Qub3B0aW9ucztcbiAgICAgICAgbGV0IHByb2R1Y3RQcmljZSA9IHByb2R1Y3Quc3BlY2lhbDtcbiAgICAgICAgbGV0IG1vZGlmaWVkV2VpZ2h0ID0gcHJvZHVjdC5ib3VnaHRXZWlnaHQ7XG4gICAgICAgIGxldCBwcm9kdWN0X25hbWUgPSBwcm9kdWN0Lm5hbWU7XG4gICAgICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfY2FydCA9IHRoaXMucHJvcHMuY3VycmVudF9jYXJ0O1xuICAgICAgICBjb25zdCBlZGl0ZWRQcm9kdWN0UHJpY2UgPSBwYXJzZUZsb2F0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LXByb2R1Y3QtcHJpY2UtJyArIHByb2R1Y3RfaWQpLnZhbHVlKTtcbiAgICAgICAgaWYgKHByb2R1Y3RfaWQgJiYgIWlzTmFOKGVkaXRlZFByb2R1Y3RQcmljZSkgJiYgZWRpdGVkUHJvZHVjdFByaWNlID4gMCAmJiBlZGl0ZWRQcm9kdWN0UHJpY2UgPD0gcHJvZHVjdFByaWNlKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uID09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChNb2RpZnlDYXJ0KHByb2R1Y3QucXVhbnRpdHksIGN1cnJlbnRfY2FydCwgcHJvZHVjdF9pZCwgJycsIGVkaXRlZFByb2R1Y3RQcmljZSwgbW9kaWZpZWRXZWlnaHQsIHByb2R1Y3RfbmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goTW9kaWZ5Q2FydChwcm9kdWN0LnF1YW50aXR5LCBjdXJyZW50X2NhcnQsIHByb2R1Y3RfaWQsIG9wdGlvbi52YXJfaWQsIGVkaXRlZFByb2R1Y3RQcmljZSwgbW9kaWZpZWRXZWlnaHQsIHByb2R1Y3RfbmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZWRpdFByb2R1Y3RQcmljZTogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeS5hbGVydCgnRW50ZXIgYSB2YWxpZCBwcmljZS4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBsZXQgY2FydFAgPSB0aGlzLnByb3BzLmNhcnRQcm9kdWN0cztcbiAgICAgICAgY29uc3QgcHJvZHVjdFByaWNlID0gY2FydFAuc3BlY2lhbDtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxQcmljZSA9IHBhcnNlRmxvYXQoY2FydFAuc3BlY2lhbCAqIGNhcnRQLnF1YW50aXR5KS50b0ZpeGVkKDIpO1xuICAgICAgICBpZiAodHlwZW9mIGNhcnRQLnRvdGFsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgcHJpY2VUb3RhbCA9IHBhcnNlRmxvYXQoY2FydFAudG90YWwucmVwbGFjZSgvWyZcXC9cXFxcIywrKCkkfiUnXCI6Kj88Pnt9XS9nLCAnJykpLnRvRml4ZWQoMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJpY2VUb3RhbCA9IHBhcnNlRmxvYXQoY2FydFAudG90YWwpLnRvRml4ZWQoMik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWRpdFByb2R1Y3RQcmljZSA9IHRoaXMuc3RhdGUuZWRpdFByb2R1Y3RQcmljZTtcbiAgICAgICAgY29uc3QgdXBkYXRlUXVhbnRpdHlQb3B1cCA9IHRoaXMuc3RhdGUudXBkYXRlUXVhbnRpdHlQb3B1cDtcbiAgICAgICAgdmFyIGNsZWFyX3RleHQgPSB0cmFuc2xhdGlvbi5jbGVhcjtcblxuICAgICAgICBsZXQgY3VycmVuY3lfY29kZSA9IHRoaXMucHJvcHMuY3VycmVuY3lfc3ltYm9sO1xuICAgICAgICBjb25zdCBpdGVtRGlzY291bnQgPSBwYXJzZUZsb2F0KChjYXJ0UC5zcGVjaWFsICogY2FydFAucXVhbnRpdHkpIC0gY2FydFAudWZfdG90YWwpLnRvRml4ZWQoMik7XG4gICAgICAgIGNvbnN0IGJvb2tpbmdQcm9kdWN0ID0gY2FydFAudHlwZSA9PSAnd2Via3VsX2Jycyc7XG4gICAgICAgIGxldCBwcmljZUh0bWwgPSAnJztcbiAgICAgICAgaWYgKCFib29raW5nUHJvZHVjdCAmJiBpdGVtRGlzY291bnQgPiAwKSB7XG4gICAgICAgICAgICBwcmljZUh0bWwgPSA8c3Bhbj4gPGRlbD4ge3drd2Nwb3NfcHJpY2Uob3JpZ2luYWxQcmljZSwgY3VycmVuY3lfY29kZSl9IDwvZGVsPiB7d2t3Y3Bvc19wcmljZShwcmljZVRvdGFsLCBjdXJyZW5jeV9jb2RlKX0gPC9zcGFuPjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByaWNlSHRtbCA9IDxzcGFuPnt3a3djcG9zX3ByaWNlKHByaWNlVG90YWwsIGN1cnJlbmN5X2NvZGUpfSA8L3NwYW4+O1xuICAgICAgICB9XG4gICAgICAgIHZhciB1bml0X3RleHQgPSB0cmFuc2xhdGlvbi51bml0X3RleHQ7XG4gICAgICAgIGNvbnN0IHVwZGF0ZVF1YW50aXR5UG9wdXBDb250ZW50ID1cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBvcy1xdWFudGl0eS1wb3B1cC1vdmVybGF5XCIgb25DbGljaz17dGhpcy5oYW5kbGVDbG9zZVF1YW50aXR5UG9wdXB9PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zLXF1YW50aXR5LXVwZGF0ZS1wb3B1cFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1xdWFudGl0eS1wb3B1cC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3NOYW1lPVwicXVhbnRpdHktZW50cnlcIiB2YWx1ZT17dGhpcy5zdGF0ZS5xdWFudGl0eUVudHJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImtleS1va1wiIGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbiBrZXktb2tcIiBkYXRhLWtleT1cIm9rXCIgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrKGUsIGNhcnRQLnByb2R1Y3RfaWQsIGNhcnRQLm9wdGlvbnMsIGNhcnRQLmJvdWdodFdlaWdodCwgY2FydFAubmFtZSl9Pk9LPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbi1jb25hdGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbi1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuYW1lPVwia2V5LW9uZVwiIGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbiBrZXktb25lXCIgZGF0YS1rZXk9XCIxXCIgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrKGUsIGNhcnRQLnByb2R1Y3RfaWQsIGNhcnRQLm9wdGlvbnMsIGNhcnRQLmJvdWdodFdlaWdodCwgY2FydFAubmFtZSl9PjE8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuYW1lPVwia2V5LXR3b1wiIGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbiBrZXktdHdvXCIgZGF0YS1rZXk9XCIyXCIgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrKGUsIGNhcnRQLnByb2R1Y3RfaWQsIGNhcnRQLm9wdGlvbnMsIGNhcnRQLmJvdWdodFdlaWdodCwgY2FydFAubmFtZSl9PjI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuYW1lPVwia2V5LXRocmVlXCIgY2xhc3NOYW1lPVwibnVtZXJpYy1rZXlwYWQtYnV0dG9uIGtleS10aHJlZVwiIGRhdGEta2V5PVwiM1wiIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVCdXR0b25DbGljayhlLCBjYXJ0UC5wcm9kdWN0X2lkLCBjYXJ0UC5vcHRpb25zLCBjYXJ0UC5ib3VnaHRXZWlnaHQsIGNhcnRQLm5hbWUpfT4zPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibnVtZXJpYy1rZXlwYWQtYnV0dG9uLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJrZXktZm91clwiIGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbiBrZXktZm91clwiIGRhdGEta2V5PVwiNFwiIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVCdXR0b25DbGljayhlLCBjYXJ0UC5wcm9kdWN0X2lkLCBjYXJ0UC5vcHRpb25zLCBjYXJ0UC5ib3VnaHRXZWlnaHQsIGNhcnRQLm5hbWUpfT40PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImtleS1maXZlXCIgY2xhc3NOYW1lPVwibnVtZXJpYy1rZXlwYWQtYnV0dG9uIGtleS1maXZlXCIgZGF0YS1rZXk9XCI1XCIgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrKGUsIGNhcnRQLnByb2R1Y3RfaWQsIGNhcnRQLm9wdGlvbnMsIGNhcnRQLmJvdWdodFdlaWdodCwgY2FydFAubmFtZSl9PjU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuYW1lPVwia2V5LXNpeFwiIGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbiBrZXktc2l4XCIgZGF0YS1rZXk9XCI2XCIgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrKGUsIGNhcnRQLnByb2R1Y3RfaWQsIGNhcnRQLm9wdGlvbnMsIGNhcnRQLmJvdWdodFdlaWdodCwgY2FydFAubmFtZSl9PjY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJudW1lcmljLWtleXBhZC1idXR0b24tcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImtleS1zZXZlblwiIGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbiBrZXktc2V2ZW5cIiBkYXRhLWtleT1cIjdcIiBvbkNsaWNrPXtlID0+IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2soZSwgY2FydFAucHJvZHVjdF9pZCwgY2FydFAub3B0aW9ucywgY2FydFAuYm91Z2h0V2VpZ2h0LCBjYXJ0UC5uYW1lKX0+NzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJrZXktZWlnaHRcIiBjbGFzc05hbWU9XCJudW1lcmljLWtleXBhZC1idXR0b24ga2V5LWVpZ2h0XCIgZGF0YS1rZXk9XCI4XCIgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrKGUsIGNhcnRQLnByb2R1Y3RfaWQsIGNhcnRQLm9wdGlvbnMsIGNhcnRQLmJvdWdodFdlaWdodCwgY2FydFAubmFtZSl9Pjg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuYW1lPVwia2V5LW5pbmVcIiBjbGFzc05hbWU9XCJudW1lcmljLWtleXBhZC1idXR0b24ga2V5LW5pbmVcIiBkYXRhLWtleT1cIjlcIiBvbkNsaWNrPXtlID0+IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2soZSwgY2FydFAucHJvZHVjdF9pZCwgY2FydFAub3B0aW9ucywgY2FydFAuYm91Z2h0V2VpZ2h0LCBjYXJ0UC5uYW1lKX0+OTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibnVtZXJpYy1rZXlwYWQtYnV0dG9uLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJrZXktYmFja1wiIGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbiBrZXktYmFja1wiIGRhdGEta2V5PVwiYlwiIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVCdXR0b25DbGljayhlLCBjYXJ0UC5wcm9kdWN0X2lkLCBjYXJ0UC5vcHRpb25zLCBjYXJ0UC5ib3VnaHRXZWlnaHQsIGNhcnRQLm5hbWUpfT48c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1hcnJvdy1sZWZ0XCI+PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJrZXktZGVjaW1hbFwiIGNsYXNzTmFtZT1cIm51bWVyaWMta2V5cGFkLWJ1dHRvbiBrZXktZGVjaW1hbFwiIGRhdGEta2V5PVwiMFwiIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVCdXR0b25DbGljayhlLCBjYXJ0UC5wcm9kdWN0X2lkLCBjYXJ0UC5vcHRpb25zLCBjYXJ0UC5ib3VnaHRXZWlnaHQsIGNhcnRQLm5hbWUpfT4wPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImtleS1kZWxldGVcIiBjbGFzc05hbWU9XCJudW1lcmljLWtleXBhZC1idXR0b24ga2V5LWRlbGV0ZVwiIGRhdGEta2V5PVwiQ1wiIG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVCdXR0b25DbGljayhlLCBjYXJ0UC5wcm9kdWN0X2lkLCBjYXJ0UC5vcHRpb25zLCBjYXJ0UC5ib3VnaHRXZWlnaHQsIGNhcnRQLm5hbWUpfT57Y2xlYXJfdGV4dH08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+O1xuICAgICAgICBsZXQgcm93ID0gYXBwbHlGaWx0ZXJzKEFERF9DTEFTU19UT19DQVJUX1RBQkxFICwnJyxjYXJ0UCk7XG4gICAgICAgIGxldCBlZGl0ID0gPHRkPlxuICAgICAgICAgICAgICAgIHshYm9va2luZ1Byb2R1Y3QgJiYgYXBwbHlGaWx0ZXJzKFNIT1dfQ0FSVF9QUk9EVUNUX0FDVElPTlNfRklMVEVSLCB0cnVlLCB0aGlzKSA/IDxpIGNsYXNzTmFtZT1cImZhIGZhLW1pbnVzLWNpcmNsZSBjdXJzb3JcIiBvbkNsaWNrPXsoKGUpID0+IHRoaXMuSGFuZGxlVXBkYXRlKC0xLCBjYXJ0UC5wcm9kdWN0X2lkLCBjYXJ0UC5vcHRpb25zLCBjYXJ0UC5ib3VnaHRXZWlnaHQsIGNhcnRQLm5hbWUpKX0+PC9pPiA6ICcnfVxuICAgICAgICAgICAgICAgIHshYm9va2luZ1Byb2R1Y3QgPyAneCcgOiAnJ31cbiAgICAgICAgICAgICAgICB7Y2FydFAucXVhbnRpdHl9XG4gICAgICAgICAgICAgICAgeyFib29raW5nUHJvZHVjdCA/ICcnIDogJyB1bml0KHMpJ31cbiAgICAgICAgICAgICAgICB7IWJvb2tpbmdQcm9kdWN0ICYmIGFwcGx5RmlsdGVycyhTSE9XX0NBUlRfUFJPRFVDVF9BQ1RJT05TX0ZJTFRFUiwgdHJ1ZSwgdGhpcykgPyA8aSBjbGFzc05hbWU9XCJmYSBmYS1wbHVzLWNpcmNsZSBjdXJzb3JcIiBvbkNsaWNrPXsoKGUpID0+IHRoaXMuSGFuZGxlVXBkYXRlKDEsIGNhcnRQLnByb2R1Y3RfaWQsIGNhcnRQLm9wdGlvbnMsIGNhcnRQLmJvdWdodFdlaWdodCwgY2FydFAubmFtZSkpfT48L2k+IDogJyd9XG4gICAgICAgICAgICAgICAgeyFib29raW5nUHJvZHVjdCAmJiAhdXBkYXRlUXVhbnRpdHlQb3B1cCA/IDxpIGNsYXNzTmFtZT1cImZhIGZhLXBlbmNpbCBjdXJzb3JcIiBvbkNsaWNrPXsoKGUpID0+IHRoaXMuSGFuZGxlUXVhbnRpdHlVcGRhdGUoKSl9PjwvaT4gOiAnJ31cbiAgICAgICAgICAgICAgICB7IWJvb2tpbmdQcm9kdWN0ICYmIHVwZGF0ZVF1YW50aXR5UG9wdXAgPyB1cGRhdGVRdWFudGl0eVBvcHVwQ29udGVudCA6ICcnfVxuICAgICAgICA8L3RkPjtcbiAgICAgICAgZWRpdCA9IGFwcGx5RmlsdGVycyhSRU1PVkVfRURJVF9GUk9NX0NBUlRfVEFCTEUgLCBlZGl0ICxjYXJ0UCk7XG4gICAgICAgIHJldHVybiAoPGxpIGNsYXNzTmFtZT17cm93fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVsbC13cmFwcGVyIGdyaWQtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGFsZi13cmFwcGVyXCIgb25DbGljaz17KChlKSA9PiB0aGlzLkhhbmRsZUVkaXRQcm9kdWN0UHJpY2UoKSl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHdpZHRoPVwiMTBweFwiIGNsYXNzTmFtZT1cIml0ZW0td3JhcC1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0IGN1cnNvclwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgd2lkdGg9XCI4MCVcIiBjbGFzc05hbWU9XCJpdGVtLXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57UmVhY3RIdG1sUGFyc2VyKGNhcnRQLm5hbWUpfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1pdGVtLWRpc2NvdW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFib29raW5nUHJvZHVjdCAmJiBpdGVtRGlzY291bnQgPiAwID8gJy0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2t3Y3Bvc19wcmljZShpdGVtRGlzY291bnQsIGN1cnJlbmN5X2NvZGUpICsgJyAnICsgX18oJ0Rpc2NvdW50JywgJ3djX3BvcycpIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3JkZXItcHJvZHVjdC1xdWFudGl0eVwiPntjYXJ0UC5xdWFudGl0eX0ge3VuaXRfdGV4dH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoYWxmLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtLXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcmljZUh0bWx9XG4gICAgICAgICAgICAgICAgICAgICAgICB7UmVhY3RIdG1sUGFyc2VyKGNhcnRQLnRheF9sYWJlbCl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7YXBwbHlGaWx0ZXJzKFNIT1dfQ0FSVF9QUk9EVUNUX0FDVElPTlNfRklMVEVSLCB0cnVlLCB0aGlzKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW0td3JhcCBpdGVtLXdyYXAtaWNvbi1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXMtY2lyY2xlIGN1cnNvclwiIG9uQ2xpY2s9eygoZSkgPT4gdGhpcy5IYW5kbGVSZW1vdmUoY2FydFAucmVtb3ZlLCBjYXJ0UC5ib3VnaHRXZWlnaHQsIGNhcnRQLm5hbWUpKX0+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcnfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7IWJvb2tpbmdQcm9kdWN0ICYmIGVkaXRQcm9kdWN0UHJpY2UgP1xuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVsbC13cmFwcGVyIHBvcy1leHRyYS1tZXRhXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInF1YW50aXR5XCIgPntfXygnUXVhbnRpdHknLCAnd2NfcG9zJyl9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInF1YW50aXR5XCIgY2xhc3NOYW1lPXtcImVkaXQtcHJvZHVjdC1xdHktXCIgKyBjYXJ0UC5wcm9kdWN0X2lkfSBtYXg9e3Byb2R1Y3RQcmljZX0gbWluPVwiMVwiIHR5cGU9XCJudW1iZXJcIiBhdXRvRm9jdXMgb25LZXlVcD17KGUpID0+IHRoaXMuSGFuZGxlUXVhbnRpdHlVcGRhdGUoZSwgY2FydFApfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByaWNlXCIgPntfXygnUHJpY2UgJywgJ3djX3BvcycpfSA8c21hbGw+e19fKCcoUGVyIFByb2R1Y3QpJywgJ3djX3BvcycpfTwvc21hbGw+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInByaWNlXCIgY2xhc3NOYW1lPXtcImVkaXQtcHJvZHVjdC1wcmljZS1cIiArIGNhcnRQLnByb2R1Y3RfaWR9IG1heD17cHJvZHVjdFByaWNlfSBtaW49XCIwXCIgdHlwZT1cIm51bWJlclwiIG9uS2V5VXA9eyhlKSA9PiB0aGlzLkhhbmRsZVByb2R1Y3RQcmljZUlucHV0KGUsIGNhcnRQKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDogJyd9XG4gICAgICAgIDwvbGk+KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgZGlzcGF0Y2ggfSwgYmluZEFjdGlvbkNyZWF0b3JzKHsgTW9kaWZ5Q2FydCwgUmVtb3ZlQ2FydFByb2R1Y3QgfSwgZGlzcGF0Y2gpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBEaXNwYXRjaFRvUHJvcHMpKENhcnRQcm9kdWN0KTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgYWRkVG9Ib2xkIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYWN0aW9ucy9ob2xkJztcbmltcG9ydCB7IHVwZGF0ZUN1cnJlbnRDYXJ0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYWN0aW9ucy9jdXJyZW50Y2FydCc7XG5pbXBvcnQgeyBNb2RpZnlIb2xkQ2FydCwgZ2V0QWxsQ2FydFByb2R1Y3RzLCB2YWxpZGF0ZVByb2R1Y3RTdG9jaywgZGVsZXRlTm90VmFsaWRQcm9kdWN0c0Zyb21DYXJ0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYWN0aW9ucy9jYXJ0JztcbmltcG9ydCB7IE1vZGlmeURpc2NvdW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYWN0aW9ucy9kaXNjb3VudCc7XG5pbXBvcnQgeyBBcHBseUNvdXBvbiwgUmVtb3ZlQ291cG9uLCBnZXRBbGxDb3Vwb25XQyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2FjdGlvbnMvY291cG9uJztcbmltcG9ydCB7IGdldEFsbE9yZGVyc1dDIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vYWN0aW9ucy9vcmRlcnMnO1xuaW1wb3J0IHsgdHJhbnNsYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90cmFuc2xhdGlvbic7XG5pbXBvcnQgZGF0YWJhc2UgZnJvbSAnLi4vLi4vLi4vLi4vLi4vZGF0YWJhc2UnO1xuaW1wb3J0IHdrd2Nwb3NfdmFyaWFibGUgZnJvbSAnLi8uLi8uLi8uLi8uLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgUE9TUG9zdFJlcXVlc3QgfSBmcm9tICcuLy4uLy4uLy4uLy4uLy4uL2hhc2gnO1xuaW1wb3J0IExvYWRlciBmcm9tICcuLi8uLi8uLi8uLi9sb2FkZXIvbG9hZGVyLmpzeCc7XG5pbXBvcnQgeyBhcHBseUZpbHRlcnMgfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcbmltcG9ydCB7IEFVVEhFTlRJQ0FURV9DQVJUX1JFU0VUX1JFUVVFU1QgfSBmcm9tICcuLi8uLi8uLi9tZW51L21lbnUuanN4JztcbmltcG9ydCB7IF9fIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcbmltcG9ydCB7IHdrd2Nwb3NfcHJpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jdXJyZW5jeS1mb3JtYXQnO1xuZXhwb3J0IGNvbnN0IE1PRElGWV9DQVJUX0VYVFJBX0FDVElPTiA9ICd3a3djcG9zX21vZGlmeV9jYXJ0X2V4dHJhX2FjdGlvbic7XG5leHBvcnQgY29uc3QgQUREX1JPV19BRlRFUl9ESVNDT1VOVF9JTl9DQVJUX0ZJTFRFUiA9ICd3a3djcG9zX2FkZF9yb3dfYWZ0ZXJfZGlzY291bnRfaW5fY2FydCc7XG5leHBvcnQgY29uc3QgQ0hBTkdFX0lOX0NBUlRfVE9UQUxfRklMVEVSID0gJ3drd2Nwb3NfY2hhbmdlX2luX2NhcnRfdG90YWxfZmlsdGVyJztcbmV4cG9ydCBjb25zdCBTSE9XX0FQUExZX0NPVVBPTl9GSUxURVIgPSAnd2t3Y3Bvc19zaG93X2FwcGx5X2NvdXBvbl9hdF9jYXJ0JztcbmV4cG9ydCBjb25zdCBTSE9XX0NVU1RPTV9ESVNDT1VOVF9GSUxURVIgPSAnd2t3Y3Bvc19zaG93X2N1c3RvbV9kaXNjb3VudF9vbl9jYXJ0JztcbmV4cG9ydCBjb25zdCBTSE9XX0NBUlRfQ0hFQ0tPVVRfQUNUSU9OU19GSUxURVIgPSAnd2t3Y3Bvc19zaG93X2NhcnRfY2hlY2tvdXRfYWN0aW9uc19jYXJ0JztcbmV4cG9ydCBjb25zdCBSRU1PVkVfQ09VUE9OX0VMSUdJQkxFX0ZJTFRFUiA9ICd3a3djcG9zX3JlbW92ZV9jb3Vwb25fZWxpZ2libGUnO1xuXG5cbmNsYXNzIENhcnRUb3RhbCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuXG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGlzY291bnQ6IHtcbiAgICAgICAgICAgICAgICBhbW91bnQ6ICcnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwZXJjZW50YWdlJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlUGF5TGlDbGljayA9IHRoaXMuaGFuZGxlUGF5TGlDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZUhvbGRDbGljayA9IHRoaXMuaGFuZGxlSG9sZENsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlRGlzY291bnRDbGljayA9IHRoaXMuaGFuZGxlRGlzY291bnRDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZURpc2NvdW50VHlwZSA9IHRoaXMuaGFuZGxlRGlzY291bnRUeXBlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXRWYWx1ZSA9IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsVXBkYXRlQ2xpY2sgPSB0aGlzLmhhbmRsVXBkYXRlQ2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEaXNjb3VudENsb3NlID0gdGhpcy5oYW5kbGVEaXNjb3VudENsb3NlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlQ291cG9uTGlDbGljayA9IHRoaXMuaGFuZGxlQ291cG9uTGlDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVJlbW92ZUNvdXBvbiA9IHRoaXMuaGFuZGxlUmVtb3ZlQ291cG9uLmJpbmQodGhpcyk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVSZW1vdmVDb3Vwb24oZSkge1xuXG4gICAgICAgIHZhciBjb3Vwb25Db2RlID0galF1ZXJ5KGUudGFyZ2V0KS5jbG9zZXN0KFwic3BhblwiKS5kYXRhKFwicmVtb3ZlXCIpO1xuICAgICAgICBjb25zdCB7IGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICB2YXIgY2FydCA9IHRoaXMucHJvcHMuY2FydDtcblxuICAgICAgICB2YXIgY2FydF9saXN0ID0gY2FydC5saXN0O1xuICAgICAgICB2YXIgdGVtcF9jb2RlID0gY2FydF9saXN0WzBdICE9IHVuZGVmaW5lZCA/IGNhcnRfbGlzdFswXS5jYXJ0X2lkIDogMDtcblxuICAgICAgICBpZiAoY291cG9uQ29kZSkge1xuXG4gICAgICAgICAgICBkaXNwYXRjaChSZW1vdmVDb3Vwb24odGVtcF9jb2RlLCBjb3Vwb25Db2RlKSk7XG5cbiAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbE9yZGVyc1dDKCkpO1xuXG4gICAgICAgICAgICBqUXVlcnkuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zbGF0aW9uLnN1Y2Nlc3NfdGV4dCxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi5jb3Vwb25fcmVtb3ZlX25vdGlmaWNhdGlvbixcbiAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6ICdjYW5jZWxBY3Rpb258MzAwMCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dyZWVuJyxcbiAgICAgICAgICAgICAgICBlc2NhcGVLZXk6ICdjYW5jZWxBY3Rpb24nLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbi5jYW5jZWxfYnRuX3RleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5DbGFzczogJ2J0bi1ncmVlbicsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGVQYXlMaUNsaWNrKGUpIHtcblxuICAgICAgICBjb25zdCBjYXJ0ID0gdGhpcy5wcm9wcy5jYXJ0O1xuXG4gICAgICAgIHZhciBjdXN0b21lcnMgPSB0aGlzLnByb3BzLmN1c3RvbWVycztcblxuICAgICAgICBjb25zdCB0b3RhbCA9IGNhcnQudG90YWw7XG5cbiAgICAgICAgY29uc3QgeyBkaXNwYXRjaCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBjb25zdCBjYXJ0X2xpc3QgPSBjYXJ0Lmxpc3QubGVuZ3RoID4gMCA/IGNhcnQubGlzdFswXS5jYXJ0IDogW107XG5cbiAgICAgICAgaWYgKGN1c3RvbWVycy5kZWZhdWx0Lmxlbmd0aCkge1xuXG4gICAgICAgICAgICBpZiAoY2FydF9saXN0Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcnRfbGlzdCA9IGNhcnQubGlzdFswXS5jYXJ0O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FydF9pZCA9IGNhcnQubGlzdFswXS5jYXJ0X2lkO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFwaWZfc2NyaXB0LndrX3Bvc192YWxpZGF0ZV9wcm9kdWN0X2F0X3BheSA9PSAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3Iub25MaW5lKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBkaXNwYXRjaCh2YWxpZGF0ZVByb2R1Y3RTdG9jayhjYXJ0X2xpc3QpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm90VmFsaWRQcm9kdWN0c0xpc3QgPSBhd2FpdCByZXN1bHQudGhlbigobm90VmFsaWRQcm9kdWN0cykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcnRfbGlzdC5maWx0ZXIoKGNhcnRfZGF0YSkgPT4gbm90VmFsaWRQcm9kdWN0cy5ub3RfdmFsaWRfcHJvZHVjdHMuaW5jbHVkZXMoY2FydF9kYXRhLnByb2R1Y3RfaWQpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub3RWYWxpZFByb2R1Y3RzTGlzdCAhPSB1bmRlZmluZWQgJiYgbm90VmFsaWRQcm9kdWN0c0xpc3QubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsaWRQcm9kdWN0c0xpc3QgPSBjYXJ0X2xpc3QuZmlsdGVyKChjYXJ0X2RhdGEpID0+ICFub3RWYWxpZFByb2R1Y3RzTGlzdC5pbmNsdWRlcyhjYXJ0X2RhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub3RWYWxpZFByb2R1Y3ROYW1lcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90VmFsaWRQcm9kdWN0c0xpc3QuZm9yRWFjaCgobm90VmFsaWRQcm9kdWN0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90VmFsaWRQcm9kdWN0TmFtZXMucHVzaChub3RWYWxpZFByb2R1Y3QubmFtZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vdFZhbGlkUHJvZHVjdE5hbWVzU3RyaW5nID0gbm90VmFsaWRQcm9kdWN0TmFtZXMuam9pbignLCAnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub3RWYWxpZFByb2R1Y3ROYW1lcy5sZW50aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90VmFsaWRQcm9kdWN0TmFtZXNTdHJpbmcgPSBub3RWYWxpZFByb2R1Y3ROYW1lc1N0cmluZyArIHRyYW5zbGF0aW9uLmFyZSArIHRyYW5zbGF0aW9uLnJlbW92ZV9ub3RfdmFsaWRfcHJvZHVjdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90VmFsaWRQcm9kdWN0TmFtZXNTdHJpbmcgPSBub3RWYWxpZFByb2R1Y3ROYW1lc1N0cmluZyArIHRyYW5zbGF0aW9uLmlzICsgdHJhbnNsYXRpb24ucmVtb3ZlX25vdF92YWxpZF9wcm9kdWN0cztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zbGF0aW9uLndhcm5pbmdfdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogbm90VmFsaWRQcm9kdWN0TmFtZXNTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2J1dHRvbk5hbWUnOyAvLyB0aGUgYnV0dG9uIHdpbGwgaGFuZGxlIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkNsYXNzOiAncG9zLWJ0bi1wcmltYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goZGVsZXRlTm90VmFsaWRQcm9kdWN0c0Zyb21DYXJ0KHZhbGlkUHJvZHVjdHNMaXN0LCBjYXJ0X2lkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmFsZXJ0KCdDYW5ub3QgcHJvY2VzcyBvcmRlcnMgd2l0aCBjZW50cmFsaXplZCBpbnZlbnRvcnkgYXQgb2ZmbGluZSBtb2RlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGpRdWVyeS5jb25maXJtKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zbGF0aW9uLndhcm5pbmdfdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdHJhbnNsYXRpb24udGV4dF9lbXB0eV9jYXJ0LFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kRGlzbWlzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdidXR0b25OYW1lJzsgLy8gdGhlIGJ1dHRvbiB3aWxsIGhhbmRsZSBpdFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGpRdWVyeS5jb25maXJtKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdHJhbnNsYXRpb24ud2FybmluZ190ZXh0LFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRyYW5zbGF0aW9uLmVtcHR5X2RlZmF1bHRfY3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdidXR0b25OYW1lJzsgLy8gdGhlIGJ1dHRvbiB3aWxsIGhhbmRsZSBpdFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBoYW5kbGVDb3Vwb25MaUNsaWNrKCkge1xuXG4gICAgICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgdmFyIG9ubGluZSA9IG5hdmlnYXRvci5vbkxpbmU7XG5cbiAgICAgICAgaWYgKCFvbmxpbmUpIHtcblxuICAgICAgICAgICAgalF1ZXJ5LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFuc2xhdGlvbi53YXJuaW5nX3RleHQsXG4gICAgICAgICAgICAgICAgY29udGVudDogdHJhbnNsYXRpb24uY291cG9uX29mZmxpbmVfbm90aWZpY2F0aW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdyZWQnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmREaXNtaXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYnV0dG9uTmFtZSc7IC8vIHRoZSBidXR0b24gd2lsbCBoYW5kbGUgaXRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjYXJ0ID0gdGhpcy5wcm9wcy5jYXJ0O1xuICAgICAgICBsZXQgY2FydF9saXN0ID0gY2FydC5saXN0O1xuICAgICAgICB2YXIgY3VzdG9tZXJzID0gdGhpcy5wcm9wcy5jdXN0b21lcnM7XG4gICAgICAgIHZhciB0YXhlcyA9IHRoaXMucHJvcHMudGF4O1xuICAgICAgICB2YXIgY291cF90YXggPSAwO1xuICAgICAgICBpZiAoY2FydF9saXN0KSB7XG5cbiAgICAgICAgICAgIGFwcGx5RmlsdGVycyhBVVRIRU5USUNBVEVfQ0FSVF9SRVNFVF9SRVFVRVNULCB0cnVlLCB0aGlzLnByb3BzLCB0cmFuc2xhdGlvbikgJiZcbiAgICAgICAgICAgICAgICBqUXVlcnkuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFuc2xhdGlvbi5jb3Vwb25fY29kZV9lbnRlcl90ZXh0LFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnPGRpdj4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+PGlucHV0IGF1dG9mb2N1cyB0eXBlPVwidGV4dFwiIGlkPVwiaW5wdXQtbmFtZVwiIHBsYWNlaG9sZGVyPVwiJyArIHRyYW5zbGF0aW9uLnZhbGlkYXRlZF90ZXh0ICsgJ1wiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiPjwvZGl2PjwvZGl2PicsXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbi5hcHBseV9jb3Vwb25fdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkNsYXNzOiBcImFkZC1jb3Vwb25cIixcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMuJGNvbnRlbnQuZmluZCgnaW5wdXQjaW5wdXQtbmFtZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5wdXQudmFsKCkudHJpbSgpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5hbGVydCh7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi5jb3Vwb25fdmFsaWRhdGVfdGV4dCxcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyZWQnXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdXBvbl9jb2RlID0gaW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3Vwb25fY29kZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3REYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3Vwb25fY29kZTogY291cG9uX2NvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyOiBjdXN0b21lcnMuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FydDogY2FydF9saXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkaW5nLXRleHQnKS5pbm5lckhUTUwgPSB0cmFuc2xhdGlvbi5hcHBseWluZ19jb3Vwb25fdGV4dDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXInKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBPU1Bvc3RSZXF1ZXN0KHdrd2Nwb3NfdmFyaWFibGUuV0tfQ0hFQ0tfQ09VUE9OX0VORFBPSU5ULCBwb3N0RGF0YSkudGhlbigocmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNvdXBvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGF4ZXMgPSBPYmplY3QudmFsdWVzKHRheGVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRheGVzLmZvckVhY2goZnVuY3Rpb24gKHRheCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY291cG9uWyd0eXBlJ10gPT0gJ2ZpeGVkX2NhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VwX3RheCA9IHJlc3BvbnNlLmNvdXBvblsncHJpY2UnXSAtICgocmVzcG9uc2UuY291cG9uWydwcmljZSddICogdGF4LnJhdGUpIC8gKHRheC5yYXRlICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291cF90YXggPSAocmVzcG9uc2UuY291cG9uWydwcmljZSddICogdGF4LnJhdGUpIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5jb3Vwb25bJ2NvdXBfdGF4J10gPSBjb3VwX3RheDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChBcHBseUNvdXBvbihyZXNwb25zZS5jb3Vwb24pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuZXJyb3IgIT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLm1zZyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFuc2xhdGlvbi5lcnJfdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiByZXNwb25zZS5lcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6ICdjYW5jZWxBY3Rpb258MzAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3JlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlS2V5OiAnY2FuY2VsQWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbEFjdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRpb24uY2FuY2VsX2J0bl90ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuQ2xhc3M6ICdwb3MtYnRuLXByaW1hcnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBqUXVlcnkuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiTm90aWNlXCIsXG4gICAgICAgICAgICAgICAgY29udGVudDogXCJGaXJzdCBhZGQgdGhlIHByb2R1Y3QgaW4gY2FydFwiLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgQ2xvc2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkNsYXNzOiBcImJ0bi1nbG9iYWxcIixcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBoYW5kbGVEaXNjb3VudENsb3NlKGUpIHtcbiAgICAgICAgalF1ZXJ5KGUudGFyZ2V0KS5jbG9zZXN0KFwiLnBvcy1wb3BvdmVyLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoXCJwb3B1cC12aXNpYmxlXCIpO1xuICAgIH1cblxuICAgIGhhbmRsZUhvbGRDbGljayhlKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCByb3V0ZUhyZWYgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblxuICAgICAgICBjb25zdCB7IGRpc3BhdGNoIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGxldCBoaXN0b3J5ID0gdGhpcy5wcm9wcy5oaXN0b3J5O1xuXG4gICAgICAgIGxldCBjYXJ0ID0gdGhpcy5wcm9wcy5jYXJ0O1xuXG4gICAgICAgIGxldCBjdXJyZW50X2NhcnQgPSB0aGlzLnByb3BzLmN1cnJlbnRfY2FydDtcblxuICAgICAgICBsZXQgY3VzdG9tZXJzID0gdGhpcy5wcm9wcy5jdXN0b21lcnM7XG5cbiAgICAgICAgbGV0IGNhcnRfbGlzdCA9IGNhcnQubGlzdDtcblxuICAgICAgICBsZXQgdG90YWwgPSBjYXJ0LnRvdGFsO1xuXG4gICAgICAgIGxldCBob2xkY2FydCA9IHRoaXMucHJvcHMuaG9sZGNhcnQubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgaG9sZGNhcnQgKz0gMTtcblxuICAgICAgICBjYXJ0X2xpc3QgPSBjYXJ0X2xpc3QuZmlsdGVyKChvYmopID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvYmouY2FydF9pZCA9PSBjdXJyZW50X2NhcnQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0b3RhbC5jYXJ0X3RvdGFsID4gMCAmJiBjdXJyZW50X2NhcnQgPT0gY2FydF9saXN0WzBdLmNhcnRfaWQpIHtcblxuICAgICAgICAgICAgalF1ZXJ5LmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFuc2xhdGlvbi5vcmRlcl9ub3RlX3RleHQsXG4gICAgICAgICAgICAgICAgY29udGVudDogJzxkaXY+IDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+PGlucHV0IGF1dG9mb2N1cyB0eXBlPXRleHQgaWQ9aW5wdXQtbmFtZSBwbGFjZWhvbGRlcj0gXCInICsgdHJhbnNsYXRpb24udmFsaWRhdGVkX3RleHQgKyAnXCIgY2xhc3NOYW1lPWZvcm0tY29udHJvbD48L2Rpdj48L2Rpdj4nLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJOb3RlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbi5vcmRlcl9ub3RlX3RleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5DbGFzczogJ3Bvcy1idG4tcHJpbWFyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLiRjb250ZW50LmZpbmQoJ2lucHV0I2lucHV0LW5hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlucHV0LnZhbCgpLnRyaW0oKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeS5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi5vcmRlcl9ub3RlX2VtcHR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3JlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmYWtlX2NhcnQgPSBjdXJyZW50X2NhcnQgKyAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGFkZFRvSG9sZChpbnB1dC52YWwoKS50cmltKCksIGN1cnJlbnRfY2FydCwgY2FydF9saXN0WzBdLmNhcnQpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaCh1cGRhdGVDdXJyZW50Q2FydChob2xkY2FydCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKE1vZGlmeUhvbGRDYXJ0KGhvbGRjYXJ0KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzLmRlZmF1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZS50YWJsZSgncG9zX2NvdXBvbicpLmNsZWFyKCkudGhlbigocmVzdWx0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKGdldEFsbENvdXBvbldDKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2gocm91dGVIcmVmKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBqUXVlcnkuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zbGF0aW9uLndhcm5pbmdfdGV4dCxcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi50ZXh0X2VtcHR5X2NhcnQsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZERpc21pc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdidXR0b25OYW1lJzsgLy8gdGhlIGJ1dHRvbiB3aWxsIGhhbmRsZSBpdFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlRGlzY291bnRDbGljayhlKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmIChhcHBseUZpbHRlcnMoU0hPV19DVVNUT01fRElTQ09VTlRfRklMVEVSLCB0cnVlLCB0aGlzKSkge1xuICAgICAgICAgICAgalF1ZXJ5KFwiLnBvcy1wb3BvdmVyLWNvbnRlbnRcIikuYWRkQ2xhc3MoXCJwb3B1cC12aXNpYmxlXCIpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBoYW5kbGVJbnB1dFZhbHVlKGUpIHtcblxuICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgdmFyIGRpc2MgPSB0aGlzLnN0YXRlLmRpc2NvdW50O1xuXG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW14wLTkuXS9nLCAnJyk7XG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvKFxcLi4qKVxcLi9nLCAnJDEnKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRpc2NvdW50OiB7XG4gICAgICAgICAgICAgICAgYW1vdW50OiBpbnB1dCxcbiAgICAgICAgICAgICAgICB0eXBlOiBkaXNjLnR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBoYW5kbFVwZGF0ZUNsaWNrKGFjdGlvbikge1xuXG4gICAgICAgIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgdmFyIGN1cnJlbnRfY2FydCA9IHRoaXMucHJvcHMuY3VycmVudF9jYXJ0O1xuXG4gICAgICAgIHZhciB0YXhlcyA9IHRoaXMucHJvcHMudGF4O1xuXG4gICAgICAgIHZhciBkaXNjID0gdGhpcy5zdGF0ZS5kaXNjb3VudDtcblxuICAgICAgICB2YXIgZGlzY190YXggPSAwO1xuXG4gICAgICAgIGxldCBjYXJ0X3RvdGFsID0gdGhpcy5wcm9wcy5jYXJ0LnRvdGFsLmNhcnRfc3VidG90YWw7XG4gICAgICAgIGNhcnRfdG90YWwgPSBwYXJzZUZsb2F0KGNhcnRfdG90YWwpO1xuXG4gICAgICAgIHZhciBhbXQgPSBqUXVlcnkoXCJpbnB1dFtuYW1lPSdkaXNjJ11cIikudmFsKCk7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PSAnYWRkJykge1xuXG4gICAgICAgICAgICB2YXIgZGVjaW1hbCA9IC9eWy0rXT9bMC05XStcXC5bMC05XSskLztcbiAgICAgICAgICAgIHZhciB3aXRob3V0RGVjaW1hbCA9IC9eWy0rXT9bMC05XSskLztcblxuICAgICAgICAgICAgaWYgKGFtdCAmJiAoYW10Lm1hdGNoKHdpdGhvdXREZWNpbWFsKSAmJiBwYXJzZUZsb2F0KGFtdCkgPiAwKSB8fCAoYW10Lm1hdGNoKGRlY2ltYWwpICYmIHBhcnNlRmxvYXQoYW10KSA+IDApKSB7XG5cbiAgICAgICAgICAgICAgICB0YXhlcyA9IE9iamVjdC52YWx1ZXModGF4ZXMpO1xuICAgICAgICAgICAgICAgIHRheGVzLmZvckVhY2goZnVuY3Rpb24gKHRheCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYy50eXBlID09ICdmaXhlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NfdGF4ID0gYW10O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzY190YXggPSAoKGFtdCAqIHRheC5yYXRlKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBkaXNjb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBkaXNjLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXg6IGRpc2NfdGF4XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChNb2RpZnlEaXNjb3VudChhY3Rpb24sIHsgYW1vdW50OiBhbXQsIHR5cGU6IGRpc2MudHlwZSwgdGF4OiBkaXNjX3RheCB9LCBjdXJyZW50X2NhcnQpKTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChnZXRBbGxDYXJ0UHJvZHVjdHMoKSk7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KFwiLnBvcy1wb3BvdmVyLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoXCJwb3B1cC12aXNpYmxlXCIpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgalF1ZXJ5LmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9fKCdFcnJvcicsICd3Y19wb3MnKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdHJhbnNsYXRpb24udmFsaWRhdGVfcHJvZHVjdF9wcmljZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3JlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSAnZGVsZXRlJykge1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkaXNjb3VudDoge1xuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBkaXNjLnR5cGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgalF1ZXJ5KFwiaW5wdXRbbmFtZT0nZGlzYyddXCIpLnZhbCgwKTtcblxuICAgICAgICAgICAgZGlzcGF0Y2goTW9kaWZ5RGlzY291bnQoYWN0aW9uLCAnJywgY3VycmVudF9jYXJ0KSk7XG4gICAgICAgICAgICBkaXNwYXRjaChnZXRBbGxDYXJ0UHJvZHVjdHMoKSk7XG4gICAgICAgICAgICBqUXVlcnkoXCIucG9zLXBvcG92ZXItY29udGVudFwiKS5yZW1vdmVDbGFzcyhcInBvcHVwLXZpc2libGVcIik7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaGFuZGxlRGlzY291bnRUeXBlKGUpIHtcblxuICAgICAgICB2YXIgZGlzYyA9IHRoaXMuc3RhdGUuZGlzY291bnQ7XG4gICAgICAgIHZhciBkYXRhX2ljb24gPSBqUXVlcnkoZS50YXJnZXQpLmNsb3Nlc3QoXCJsYWJlbFwiKS5kYXRhKFwiaWNvblwiKTtcbiAgICAgICAgalF1ZXJ5KFwiLnBvcy1yYWRpby1zZWxlY3QgbGFiZWxcIikucmVtb3ZlQ2xhc3MoXCJkZWZhdWx0LXNlbGVjdGVkXCIpO1xuICAgICAgICBqUXVlcnkoZS50YXJnZXQpLmNsb3Nlc3QoXCJsYWJlbFwiKS5hZGRDbGFzcyhcImRlZmF1bHQtc2VsZWN0ZWRcIik7XG4gICAgICAgIGpRdWVyeShcIi5wb3MtZGlzY291bnQtcmVzdWx0XCIpLnJlbW92ZUNsYXNzKFwiaWNvbi1sZWZ0IGljb24tcmlnaHRcIikuYWRkQ2xhc3MoXCJpY29uLVwiICsgZGF0YV9pY29uKTtcblxuICAgICAgICBpZiAoZGF0YV9pY29uID09ICdsZWZ0Jykge1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkaXNjb3VudDoge1xuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGRpc2MuYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGVyY2VudGFnZScsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhX2ljb24gPT0gJ3JpZ2h0Jykge1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBkaXNjb3VudDoge1xuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGRpc2MuYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGpRdWVyeS5hbGVydCh7XG5cbiAgICAgICAgICAgICAgICBjb250ZW50OiB0cmFuc2xhdGlvbi5kcmF3ZXJfdmFsaWRhdGVfdGV4dCxcblxuICAgICAgICAgICAgICAgIHR5cGU6ICdyZWQnXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIGN1cnJlbmN5X3Bvc2l0aW9uID0gJ0wnO1xuXG4gICAgICAgIHZhciBjYXJ0ID0gdGhpcy5wcm9wcy5jYXJ0O1xuXG4gICAgICAgIHZhciBjYXJ0Q29udGVudHMgPSBjYXJ0Lmxpc3Q7XG5cbiAgICAgICAgdmFyIGlubGluZVByaWNlVG90YWxEaXNjb3VudCA9IDA7XG5cbiAgICAgICAgaWYgKGNhcnRDb250ZW50cy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGlmIChjYXJ0Q29udGVudHMubGVuZ3RoID4gMCAmJiBjYXJ0Q29udGVudHNbMF0gIT0gdW5kZWZpbmVkICYmIGNhcnRDb250ZW50c1swXS5jYXJ0ICE9IHVuZGVmaW5lZCAmJiBjYXJ0Q29udGVudHNbMF0uY2FydC5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBjYXJ0Q29udGVudHNbMF0uY2FydC5mb3JFYWNoKChjYXJ0UHJvZHVjdCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRheERpc2NvdW50ID0gKCBjYXJ0UHJvZHVjdC5xdWFudGl0eSAqIGNhcnRQcm9kdWN0Lm9yaWdpbmFsVGF4ICkgLSBjYXJ0UHJvZHVjdC50YXg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlRGlzY291bnQgPSAoY2FydFByb2R1Y3QucXVhbnRpdHkgKiBjYXJ0UHJvZHVjdC5zcGVjaWFsKSAtIChjYXJ0UHJvZHVjdC5xdWFudGl0eSAqIGNhcnRQcm9kdWN0LnVmKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbmxpbmVQcmljZVRvdGFsRGlzY291bnQgKz0gdGF4RGlzY291bnQgKyBwcmljZURpc2NvdW50O1xuICAgICAgICAgICAgICAgICAgICBpbmxpbmVQcmljZVRvdGFsRGlzY291bnQgKz0gcHJpY2VEaXNjb3VudDtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlubGluZVByaWNlVG90YWxEaXNjb3VudCA9IHBhcnNlRmxvYXQoaW5saW5lUHJpY2VUb3RhbERpc2NvdW50KTtcblxuICAgICAgICB2YXIgY291cG9ucyA9IEFycmF5LmZyb20odGhpcy5wcm9wcy5jb3Vwb25zKTtcblxuICAgICAgICB2YXIgY3VycmVuY3kgPSBBcnJheS5mcm9tKHRoaXMucHJvcHMuY3VycmVuY3kpO1xuXG4gICAgICAgIHZhciBjdXN0b21lcnMgPSB0aGlzLnByb3BzLmN1c3RvbWVycztcblxuICAgICAgICB2YXIgZGlzYyA9IHRoaXMuc3RhdGUuZGlzY291bnQ7XG5cbiAgICAgICAgdmFyIHRvdGFsID0gY2FydC50b3RhbDtcblxuICAgICAgICB2YXIgY3VzdG9tZXJfbmFtZSA9IF9fKCdTZWxlY3QgQ3VzdG9tZXInLCAnd2NfcG9zJyk7XG5cbiAgICAgICAgdmFyIGNvdXBvbiA9IGNvdXBvbnMubWFwKChjb3VwKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY291cC5jb3Vwb247XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjdXJyZW5jeV9jb2RlID0gY3VycmVuY3kubWFwKChzeW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzeW0uc3ltYm9sO1xuICAgICAgICB9KTtcblxuICAgICAgICBjdXJyZW5jeV9jb2RlID0gY3VycmVuY3lfY29kZVswXTtcblxuICAgICAgICB2YXIgc3VidG90YWwgPSB3a3djcG9zX3ByaWNlKGFwcGx5RmlsdGVycygnd2twb3NfY2hhbmdlc19pbl9jYXJ0X3RvdGFsX3VzaW5nX2N1c3RvbV9kaXNjb3VudCcsIHRvdGFsLmNhcnRfc3VidG90YWwsIGNhcnRDb250ZW50cyksIGN1cnJlbmN5X2NvZGUpO1xuICAgICAgICB2YXIgdGF4dG90YWwgPSB3a3djcG9zX3ByaWNlKHRvdGFsLnRheF90b3RhbCwgY3VycmVuY3lfY29kZSk7XG4gICAgICAgIHZhciB0b3RhbGRpc2NvdW50ID0gcGFyc2VGbG9hdCh0b3RhbC50b3RhbF9kaXNjb3VudCkgKyBpbmxpbmVQcmljZVRvdGFsRGlzY291bnQ7XG4gICAgICAgIHRvdGFsZGlzY291bnQgPSB3a3djcG9zX3ByaWNlKHRvdGFsZGlzY291bnQsIGN1cnJlbmN5X2NvZGUpO1xuICAgICAgICB2YXIgY2FydF90b3RhbCA9IHdrd2Nwb3NfcHJpY2UocGFyc2VGbG9hdChhcHBseUZpbHRlcnMoQ0hBTkdFX0lOX0NBUlRfVE9UQUxfRklMVEVSLCB0b3RhbC5jYXJ0X3RvdGFsKSksIGN1cnJlbmN5X2NvZGUpO1xuICAgICAgICAvLyBjYXJ0X3RvdGFsID0gd2t3Y3Bvc19wcmljZShwYXJzZUZsb2F0KGFwcGx5RmlsdGVycygnd2twb3NfY2hhbmdlc19pbl9jYXJ0X3RvdGFsX3VzaW5nX2N1c3RvbV9kaXNjb3VudCcsIHRvdGFsLmNhcnRfc3VidG90YWwsIGNhcnRDb250ZW50cykpLCBjdXJyZW5jeV9jb2RlKTtcbiAgICAgICAgdmFyIGRlZmF1bHRfY3VzdG9tZXIgPSAoY3VzdG9tZXJzLmRlZmF1bHQubGVuZ3RoID4gMCkgPyBjdXN0b21lcnMuZGVmYXVsdFswXSA6ICcnO1xuICAgICAgICBpZiAoZGVmYXVsdF9jdXN0b21lcikge1xuICAgICAgICAgICAgY3VzdG9tZXJfbmFtZSA9IGRlZmF1bHRfY3VzdG9tZXIuZmlyc3RfbmFtZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY291cG9uX2h0bWwgPSAnJztcbiAgICAgICAgY29uc3QgY291cG9uX3JvdyA9IGNvdXBvbi5tYXAoKHZhbGwsIGkpID0+IHtcbiAgICAgICAgICAgIHZhciB0ZW1wQXJyID0gW107XG4gICAgICAgICAgICBqUXVlcnkuZWFjaCh2YWxsLCAoaSwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZ2YWwgPSB2YWw7XG4gICAgICAgICAgICAgICAgdmFyIHByaWNlX2Zvcm1hdGVkID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbmN5X3Bvc2l0aW9uID09ICdMJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodnZhbC50eXBlID09ICdwZXJjZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VfZm9ybWF0ZWQgPSB2dmFsLnByaWNlICsgJyUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VfZm9ybWF0ZWQgPSBjdXJyZW5jeV9jb2RlICsgdnZhbC5wcmljZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2dmFsLnR5cGUgPT0gJ3BlcmNlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZV9mb3JtYXRlZCA9IHZ2YWwucHJpY2UgKyAnJSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZV9mb3JtYXRlZCA9IHZ2YWwucHJpY2UgKyBjdXJyZW5jeV9jb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRlbXBBcnIucHVzaCh7IGNvZGU6IHZ2YWwuY29kZSwgcHJpY2U6IHByaWNlX2Zvcm1hdGVkIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGVtcEFycjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNvdXBvbl9yb3cubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlQ291cG9uRWxpZ2libGUgPSBhcHBseUZpbHRlcnMoUkVNT1ZFX0NPVVBPTl9FTElHSUJMRV9GSUxURVIsIHRydWUsIHRoaXMpO1xuICAgICAgICAgICAgY291cG9uX2h0bWwgPSBjb3Vwb25fcm93WzBdLm1hcCgoY291cCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiY291cG9uLWNvZGVcIiBrZXk9e2NvdXAuY29kZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvdXAuY29kZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVtb3ZlQ291cG9uRWxpZ2libGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXJlbW92ZT17Y291cC5jb2RlfT48aSBjbGFzc05hbWU9XCJmYSBmYS1yZW1vdmVcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVJlbW92ZUNvdXBvbn0+PC9pPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiYWN0aW9uXCI+e2NvdXAucHJpY2V9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvdXBvbl90ZXh0ID0gdHJhbnNsYXRpb24uY291cG9uX3RleHQ7XG4gICAgICAgIHZhciBkaXNjb3VudF90ZXh0ID0gdHJhbnNsYXRpb24uZGlzY291bnRfdGV4dDtcbiAgICAgICAgdmFyIHRheF90ZXh0ID0gdHJhbnNsYXRpb24udGF4X3RleHQ7XG4gICAgICAgIHZhciBzdWJfdG90YWxfdGV4dCA9IHRyYW5zbGF0aW9uLnN1Yl90b3RhbF90ZXh0O1xuICAgICAgICB2YXIgZ3JhbmRfdG90YWxfdGV4dCA9IHRyYW5zbGF0aW9uLmdyYW5kX3RvdGFsX3RleHQ7XG4gICAgICAgIHZhciBhcHBseV9jb3Vwb25fdGV4dCA9IHRyYW5zbGF0aW9uLmFwcGx5X2NvdXBvbl90ZXh0O1xuICAgICAgICB2YXIgaG9sZF9jYXJ0X3RleHQgPSB0cmFuc2xhdGlvbi5ob2xkX2NhcnRfdGV4dDtcbiAgICAgICAgdmFyIGFwcGx5X3RleHQgPSB0cmFuc2xhdGlvbi5hcHBseV90ZXh0O1xuICAgICAgICB2YXIgZGVsZXRlX3RleHQgPSB0cmFuc2xhdGlvbi5kZWxldGVfdGV4dDtcbiAgICAgICAgdmFyIGRpc2NvdW50X3RpdGxlX3RleHQgPSB0cmFuc2xhdGlvbi5kaXNjb3VudF90aXRsZV90ZXh0O1xuICAgICAgICB2YXIgcGF5X3RleHQgPSB0cmFuc2xhdGlvbi5wYXlfdGV4dDtcblxuICAgICAgICBpZiAodG90YWwuY2FydF9zdWJ0b3RhbCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyPjwvTG9hZGVyPjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYXJ0RXh0cmEgPSBhcHBseUZpbHRlcnMoTU9ESUZZX0NBUlRfRVhUUkFfQUNUSU9OLCBbXG4gICAgICAgICAgICB7IGlkOiAnY2FydC1ob2xkJywgbGluazogJ29yZGVycy90YWIvaG9sZCcsIGljb246ICdmYSBmYS1wYXVzZScsIHRleHQ6IGhvbGRfY2FydF90ZXh0LCBldmVudDogdGhpcy5oYW5kbGVIb2xkQ2xpY2sgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdwYXktdG8tcG9zJywgbGluazogJ3BheScsIGljb246ICdmYS1jcmVkaXQtY2FyZC1hbHQnLCB0ZXh0OiBwYXlfdGV4dCwgZXZlbnQ6IHRoaXMuaGFuZGxlUGF5TGlDbGljayB9LFxuICAgICAgICBdLCBjYXJ0KTtcblxuICAgICAgICBjb25zdCBjYXJ0X2V4dHJhX3NlY3Rpb24gPSBjYXJ0RXh0cmEubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgaWYgKHZhbHVlLmV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt2YWx1ZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB2YWx1ZS5ldmVudChlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRvPXt3a3djcG9zX3ZhcmlhYmxlLkhPTUVfVVJMICsgJy9wb3MvJyArIHZhbHVlLmxpbmt9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17XCJmYSBcIiArIHZhbHVlLmljb259Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZS50ZXh0fVxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e3ZhbHVlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgdG89e3drd2Nwb3NfdmFyaWFibGUuSE9NRV9VUkwgKyAnL3Bvcy8nICsgdmFsdWUubGlua31cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtcImZhIFwiICsgdmFsdWUuaWNvbn0+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlLnRleHR9XG4gICAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JkLXNlY3Rpb25cIj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zLWNhcnQtYm90dG9tLXNlY3Rpb25cIj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1wb3BvdmVyLWNvbnRlbnRcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInBvcy1wb3AtaGVhZGVyXCI+e2Rpc2NvdW50X3RpdGxlX3RleHR9PC9oMT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmEgZmEtY2xvc2UgZGlzY291bnQtY2xvc2VyXCIgb25DbGljaz17dGhpcy5oYW5kbGVEaXNjb3VudENsb3NlfT48L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxociBjbGFzc05hbWU9XCJwb3MtaHJcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1yYWRpby1zZWxlY3RcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJkZWZhdWx0LXNlbGVjdGVkXCIgZGF0YS1pY29uPVwibGVmdFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGlzY291bnRUeXBlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCI3NjVcIiBkZWZhdWx0VmFsdWU9XCJ0cnVlXCIgdHlwZT1cInJhZGlvXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4lPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLWljb249XCJyaWdodFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGlzY291bnRUeXBlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCI3NjVcIiBkZWZhdWx0VmFsdWU9XCJmYWxzZVwiIHR5cGU9XCJyYWRpb1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e2N1cnJlbmN5X2NvZGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zLWRpc2NvdW50LXJlc3VsdCBpY29uLWxlZnRcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzYy1yZXN1bHQtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cImRpc2NcIiBkZWZhdWx0VmFsdWU9e2Rpc2MuYW1vdW50fSBvbklucHV0PXt0aGlzLmhhbmRsZUlucHV0VmFsdWV9IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgc3RlcD1cIjAuMDFcIiBhdXRvRm9jdXMgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3Mtc2FsZS1kaXNjb3VudFwiPntjdXJyZW5jeV9jb2RlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1zYWxlLXBlcmNlbnRhZ2VcIj4lPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24td3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG5hbWU9XCJhcHBseS1kaXNjb3VudFwiIHJvbGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJwcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIGlkPVwiYXBwbHktZGlzY291bnRcIiBvbkNsaWNrPXsoKGUpID0+IHRoaXMuaGFuZGxVcGRhdGVDbGljaygnYWRkJykpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXBsdXMtY2lyY2xlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7e2FwcGx5X3RleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG5hbWU9XCJyZW1vdmUtZGlzY291bnRcIiByb2xlPVwiYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInNlY29uZGFyeVwiIGlkPVwicmVtb3ZlLWRpc2NvdW50XCIgb25DbGljaz17KChlKSA9PiB0aGlzLmhhbmRsVXBkYXRlQ2xpY2soJ2RlbGV0ZScpKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS10cmFzaFwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwO3tkZWxldGVfdGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUZpbHRlcnMoU0hPV19BUFBMWV9DT1VQT05fRklMVEVSLCB0cnVlLCB0aGlzKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcGx5LWNvdXBvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbmFtZT1cImFkZC1jb3Vwb25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYWRkLWNvdXBvbiBkYXNoZWRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNvdXBvbkxpQ2xpY2t9PnthcHBseV9jb3Vwb25fdGV4dH08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInBvcy10b3RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntzdWJfdG90YWxfdGV4dH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBpZD0ncG9zLXN1Yi10b3RhbCc+e3N1YnRvdGFsfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGlkPSdwb3MtdGF4LXRvdGFsJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3RheF90ZXh0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt0YXh0b3RhbH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJhcHBseS1kaXNjb3VudFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGlzY291bnRDbGlja30+e2Rpc2NvdW50X3RleHR9PC9hPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGlkPVwicG9zLWRpc2NvdW50XCI+LTxzcGFuPnt0b3RhbGRpc2NvdW50fTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthcHBseUZpbHRlcnMoQUREX1JPV19BRlRFUl9ESVNDT1VOVF9JTl9DQVJUX0ZJTFRFUiwgJycsIHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImNvdXBvbi1jb2RlLWhlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sU3Bhbj1cIjJcIj57Y291cG9uX3RleHR9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y291cG9uX2h0bWwgPyBjb3Vwb25faHRtbCA6IDx0cj48L3RyPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBpZD1cImdyYW5kLXRvdGFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntncmFuZF90b3RhbF90ZXh0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGlkPVwicG9zdG90YWxcIj57Y2FydF90b3RhbH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUZpbHRlcnMoU0hPV19DQVJUX0NIRUNLT1VUX0FDVElPTlNfRklMVEVSLCB0cnVlLCB0aGlzKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcy1jYXJ0LWNoZWNrb3V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NhcnRfZXh0cmFfc2VjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+ICh7XG4gICAgZGlzY291bnQ6IHN0YXRlLmRpc2NvdW50Lmxpc3QsXG4gICAgdGF4OiBzdGF0ZS50YXgubGlzdCxcbiAgICBjYXJ0OiBzdGF0ZS5jYXJ0LFxuICAgIGN1cnJlbmN5OiBzdGF0ZS5jdXJyZW5jeS5kZWZhdWx0LFxuICAgIGN1cnJlbnRfY2FydDogc3RhdGUuY3VycmVudF9jYXJ0LFxuICAgIGN1c3RvbWVyczogc3RhdGUuY3VzdG9tZXJzLFxuICAgIGNvdXBvbnM6IHN0YXRlLmNvdXBvbi5saXN0XG59KTtcblxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBkaXNwYXRjaCB9LCBiaW5kQWN0aW9uQ3JlYXRvcnMoeyBhZGRUb0hvbGQsIHVwZGF0ZUN1cnJlbnRDYXJ0LCBnZXRBbGxDb3Vwb25XQywgZ2V0QWxsQ2FydFByb2R1Y3RzLCBNb2RpZnlIb2xkQ2FydCwgZ2V0QWxsT3JkZXJzV0MsIE1vZGlmeURpc2NvdW50LCBBcHBseUNvdXBvbiwgUmVtb3ZlQ291cG9uIH0sIGRpc3BhdGNoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKENhcnRUb3RhbCk7XG4iXSwic291cmNlUm9vdCI6IiJ9