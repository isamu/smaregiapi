"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var apiUtils = _interopRequireWildcard(require("./apiUtils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SmaregiApi = /*#__PURE__*/function () {
  function SmaregiApi(config) {
    _classCallCheck(this, SmaregiApi);

    this.stacks = [];
    this.scopes = config.scopes;
    this.access_token = null;
    this.contractId = config.contractId;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    apiUtils.updateHost(config.hostName || "api.smaregi.dev");
    apiUtils.updateAuthHost(config.authHostName || "id.smaregi.dev");
  }

  _createClass(SmaregiApi, [{
    key: "initApi",
    value: function initApi(name) {
      this.stacks = [name];
      return this;
    }
  }, {
    key: "stackParam",
    value: function stackParam(params) {
      this.stacks = this.stacks.concat(params);
    } // api base

  }, {
    key: "coupons",
    value: function coupons() {
      this.initApi("coupons");
      return this;
    }
  }, {
    key: "stores",
    value: function stores() {
      this.initApi("stores");
      return this;
    }
  }, {
    key: "products",
    value: function products() {
      this.initApi("products");
      return this;
    }
  }, {
    key: "categories",
    value: function categories() {
      this.initapi("categories");
      return this;
    } // coupons

  }, {
    key: "id",
    value: function id(value) {
      this.stackParam([value]);
      return this;
    }
  }, {
    key: "type",
    value: function type(value) {
      this.stackParam(["type", value]);
      return this;
    } // api calld

  }, {
    key: "get",
    value: function get() {
      return this.stacks.join("/");
    }
  }, {
    key: "list",
    value: function () {
      var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var path, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = this.stacks.join("/");
                _context.next = 3;
                return apiUtils.get_func(this.contractId, path, this.access_token, {});

              case 3:
                json = _context.sent;
                return _context.abrupt("return", json);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function list() {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        var path, json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                path = this.stacks.join("/");
                _context3.next = 3;
                return apiUtils.patch_func(this.contractId, path, this.access_token, data);

              case 3:
                json = _context3.sent;
                return _context3.abrupt("return", json);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update(_x) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function _delete() {}
  }, {
    key: "auth",
    value: function () {
      var _auth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var body;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return apiUtils.authentication(this.clientId, this.clientSecret, this.contractId, this.scopes);

              case 2:
                body = _context4.sent;
                this.access_token = body.access_token;

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function auth() {
        return _auth.apply(this, arguments);
      }

      return auth;
    }()
  }]);

  return SmaregiApi;
}();

var _default = SmaregiApi;
exports["default"] = _default;