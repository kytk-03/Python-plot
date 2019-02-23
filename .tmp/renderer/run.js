'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _output = require('./output');

var _output2 = _interopRequireDefault(_output);

var _reactPlotly = require('react-plotly.js');

var _reactPlotly2 = _interopRequireDefault(_reactPlotly);

var _electron = require('electron');

var _pythonShell = require('python-shell');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Run = function (_Component) {
    _inherits(Run, _Component);

    function Run(props) {
        _classCallCheck(this, Run);

        var _this = _possibleConstructorReturn(this, (Run.__proto__ || Object.getPrototypeOf(Run)).call(this, props));

        try {
            _fs2.default.statSync(".path");
        } catch (error) {
            _this.pythonpath = _electron.remote.dialog.showOpenDialog({ title: "Please select the Python interpreter.", properties: ['openFile'], filters: [{ name: "", "extensions": ["exe"] }] });
            _fs2.default.writeFileSync("./.path", _this.pythonpath, { encoding: "utf-8" });
        }
        _this.pythonPath = _fs2.default.readFileSync("./.path", { encoding: "utf-8" });
        _this.folderPath = _fs2.default.readFileSync(".experiment", { encoding: "utf-8" }).replace(/\r?\n/g, '');
        _this.title = _this.folderPath.split(_path2.default.sep);
        _this.title = _this.title[_this.title.length - 1];
        _this.setting = _fs2.default.readFileSync(_this.folderPath + "/setting.txt", { encoding: "utf-8" }).split('\n');
        _this.inputs = _this.setting[0].trim().split(',').map(function (item) {
            return item.trim();
        });
        _this.state = { defaults: {}, outputs: {} };
        _this.defaults = [];
        try {
            _fs2.default.statSync(_this.folderPath + "/.defaults");
            var defaults = _fs2.default.readFileSync(_this.folderPath + "/.defaults", { encoding: "utf-8" });
            _this.defaults = JSON.parse(defaults);
        } catch (error) {
            console.log(error);
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _this.inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                if (_this.defaults[i]) {
                    _this.state.defaults[i] = _this.defaults[i];
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        _this.outputs = _this.setting[1].trim().split(',').map(function (item) {
            return item.trim();
        });
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = _this.outputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _i = _step2.value;

                _this.state.outputs[_i] = 0;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        _this.graphs = _this.setting[2].trim().split(',').map(function (item) {
            return item.trim();
        });
        _this.list = [];
        _this.state.revision = 0;
        _this.state.layout = {};
        _this.state.end = true;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = _this.graphs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _i2 = _step3.value;

                _this.state.layout[_i2] = { title: _i2, datarevision: 0, width: 620, height: 440 };
                _this.state[_i2] = {
                    x: [],
                    y: [],
                    mode: 'lines+points',
                    marker: { color: 'blue' },
                    name: _i2
                };

                _this.list.push(_react2.default.createElement(_reactPlotly2.default, {
                    key: _i2,
                    data: [_this.state[_i2]],
                    layout: _this.state.layout[_i2],
                    revision: _this.state.revision
                }));
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        _this.updateGraph = _this.updateGraph.bind(_this);
        return _this;
    }

    _createClass(Run, [{
        key: 'updateGraph',
        value: function updateGraph(message) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.graphs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var i = _step4.value;

                    this.state[i].x.push(message[i.split('/').map(function (item) {
                        return item.trim();
                    })[0]]);
                    this.state[i].y.push(message[i.split('/').map(function (item) {
                        return item.trim();
                    })[1]]);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'start_measurement',
        value: function start_measurement(json) {
            var _this2 = this;

            this.setState({ end: false });
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.graphs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var i = _step5.value;

                    this.state[i].x = [];
                    this.state[i].y = [];
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            var options = {
                pythonPath: this.pythonPath,
                pythonOptions: ['-u'],
                mode: 'json'
            };

            this.pyshell = new _pythonShell.PythonShell(this.folderPath + "/measurement.py", options);
            this.pyshell.send(json);

            this.pyshell.on('message', function (message) {
                _this2.setState({ outputs: message });
                _this2.updateGraph(message);
                _this2.setState({ revision: _this2.state.revision + 1 });
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = _this2.graphs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var i = _step6.value;

                        _this2.state.layout[i].datarevision = _this2.state.revision + 1;
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }
            });

            this.pyshell.end(function (err, code, signal) {
                _this2.setState({ end: true });
                if (err) {
                    _electron.remote.dialog.showErrorBox("Error", err.stack);
                };
                console.log('The exit code was: ' + code);
                console.log('The exit signal was: ' + signal);
                console.log('finished');
                console.log('finished');
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.pyshell.terminate();
        }
    }, {
        key: 'render',
        value: function render() {
            this.list = [];
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.graphs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var i = _step7.value;

                    this.list.push(_react2.default.createElement(_reactPlotly2.default, {
                        key: i,
                        data: [this.state[i]],
                        layout: this.state.layout[i],
                        revision: this.state.revision
                    }));
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_header2.default, { title: this.title }),
                _react2.default.createElement(
                    'div',
                    { style: { display: "flex", justifyContent: 'center' } },
                    _react2.default.createElement(_input2.default, { key: 'inputs', msg: this.inputs, defaultvalue: this.state.defaults, end: this.state.end, folder: this.folderPath, start_measurement: this.start_measurement.bind(this), stop: this.stop.bind(this) })
                ),
                _react2.default.createElement(
                    'div',
                    { style: { display: "flex", justifyContent: 'center' } },
                    _react2.default.createElement(_output2.default, { msg: this.outputs, result: this.state["outputs"] })
                ),
                this.list
            );
        }
    }]);

    return Run;
}(_react.Component);

exports.default = Run;