'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('@material-ui/core/styles');

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
    return {
        container: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        },
        dense: {
            marginTop: 16
        },
        menu: {
            width: 200
        }
    };
};

var Inputs = function (_React$Component) {
    _inherits(Inputs, _React$Component);

    function Inputs(props) {
        _classCallCheck(this, Inputs);

        var _this = _possibleConstructorReturn(this, (Inputs.__proto__ || Object.getPrototypeOf(Inputs)).call(this, props));

        var _this$props = _this.props,
            classes = _this$props.classes,
            msg = _this$props.msg,
            defaultvalue = _this$props.defaultvalue;

        _this.list = [];
        _this.state = {};
        _this.state["run"] = _this.props.end;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function _loop() {
                var input = _step.value;

                _this.state[input] = defaultvalue[input];
                _this.list.push(_react2.default.createElement(_TextField2.default, {
                    key: input,
                    required: true,
                    id: input,
                    label: input,
                    defaultValue: _this.state[input],
                    className: classes.textField,
                    margin: 'normal',
                    variant: 'filled',
                    onChange: function onChange(event) {
                        return _this.onChangeInputs(event, input);
                    }
                }));
            };

            for (var _iterator = msg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _loop();
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

        _this.clickHandler = _this.clickHandler.bind(_this);
        _this.stopHandler = _this.stopHandler.bind(_this);
        return _this;
    }

    _createClass(Inputs, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ run: nextProps.end });
        }
    }, {
        key: 'clickHandler',
        value: function clickHandler() {
            this.props.start_measurement(this.state);
            this.setState({ run: false });
        }
    }, {
        key: 'stopHandler',
        value: function stopHandler() {
            this.props.stop(this.state);
            this.setState({ run: true });
        }
    }, {
        key: 'onChangeInputs',
        value: function onChangeInputs(event, input) {
            var state = Object.assign({}, this.state);
            state[input] = event.target.value;
            delete state.run;
            this.setState(_defineProperty({}, input, event.target.value));
            _fs2.default.writeFileSync(this.props.folder + "/.defaults", JSON.stringify(state), { encoding: "utf-8" });
        }
    }, {
        key: 'render',
        value: function render() {
            var classes = this.props.classes;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: { display: "flex", justifyContent: 'center' } },
                    _react2.default.createElement(
                        'form',
                        { className: classes.container, noValidate: true, autoComplete: 'on' },
                        this.list
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { display: "flex", justifyContent: 'center' } },
                    _react2.default.createElement(
                        _Button2.default,
                        { size: 'large', style: { background: "dodgerblue", color: "white", marginLeft: "20px", marginRight: "20px" }, onClick: this.clickHandler, disabled: !this.state["run"] },
                        'START'
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        { size: 'large', style: { background: "orangered", color: "white", marginLeft: "20px" }, onClick: this.stopHandler, disabled: this.state["run"] },
                        'STOP'
                    )
                )
            );
        }
    }]);

    return Inputs;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles)(Inputs);