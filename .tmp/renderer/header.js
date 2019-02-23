'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    root: {
        flexGrow: 1
    }
};

function Header(props) {
    var classes = props.classes,
        title = props.title;

    return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
            _AppBar2.default,
            { position: 'static' },
            _react2.default.createElement(
                _Toolbar2.default,
                null,
                _react2.default.createElement(
                    _Typography2.default,
                    { variant: 'title', color: 'inherit' },
                    title
                )
            )
        )
    );
}

Header.propTypes = {
    classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(Header);