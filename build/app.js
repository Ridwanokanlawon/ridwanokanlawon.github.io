"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _debug = _interopRequireDefault(require("debug"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("./config/db"));

var _user = _interopRequireDefault(require("./routes/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
var port = process.env.PORT || 5000;
var debug = (0, _debug["default"])('http');
(0, _db["default"])();
app.get('/api/v1', function (req, res) {
  res.json({
    message: 'Welcome to Auto-Mart API'
  });
});
app.use('/api/v1', _user["default"]);
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;