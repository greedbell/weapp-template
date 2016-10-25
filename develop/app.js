'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _weappPromise = require('././weapp_modules/weapp-promise/index.js');

var _weappPromise2 = _interopRequireDefault(_weappPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    this.globalData = 'I am global data';
  }

  (0, _createClass3.default)(_class, [{
    key: 'onLaunch',
    value: function onLaunch() {
      // Do something initial when launch.
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // Do something when show.
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      // Do something when hide.
    }
  }]);
  return _class;
}(); /**
      * Created by Bell on 16/10/18.
      */

exports.default = _class;