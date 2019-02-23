'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/core/styles');

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Outputs = function (_React$Component) {
    _inherits(Outputs, _React$Component);

    function Outputs(props) {
        _classCallCheck(this, Outputs);

        var _this = _possibleConstructorReturn(this, (Outputs.__proto__ || Object.getPrototypeOf(Outputs)).call(this, props));

        var result = props.result,
            classes = props.classes,
            msg = props.msg;

        _this.list = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = msg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                _this.list.push(_react2.default.createElement(_TextField2.default, {
                    key: i,
                    id: i,
                    label: i,
                    defaultValue: result[i],
                    className: classes.textField,
                    margin: 'normal',
                    variant: 'outlined',
                    InputProps: {
                        readOnly: true
                    }
                }));
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

        return _this;
    }

    _createClass(Outputs, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                result = _props.result,
                msg = _props.msg,
                classes = _props.classes;

            this.list = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = msg[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var i = _step2.value;

                    this.list.push(_react2.default.createElement(_TextField2.default, {
                        key: i,
                        id: i,
                        label: i,
                        value: result[i],
                        className: classes.textField,
                        margin: 'normal',
                        variant: 'outlined',
                        InputProps: {
                            readOnly: true
                        }
                    }));
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

            return _react2.default.createElement(
                'form',
                { className: classes.container, noValidate: true, autoComplete: 'off' },
                this.list
            );
        }
    }]);

    return Outputs;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles)(Outputs);