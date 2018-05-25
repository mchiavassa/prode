webpackJsonp([0],{

/***/ 1952:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorView", function() { return EditorView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__atlaskit_media_editor__ = __webpack_require__(1965);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar__ = __webpack_require__(1995);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__phrases__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__styles__ = __webpack_require__(2011);








var DEFAULT_WIDTH = 845;
var DEFAULT_HEIGHT = 530;
var TRANSPARENT_COLOR = { red: 0, green: 0, blue: 0, alpha: 0 };
// Properties' names in the local storage
var propertyColor = 'media-editor-color';
var propertyTool = 'media-editor-tool';
var propertyLineWidth = 'media-editor-line-width';
var EditorView = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](EditorView, _super);
    function EditorView(props) {
        var _this = _super.call(this, props) || this;
        _this.onLoad = function (url, loadParameters) {
            _this.loadParameters = loadParameters;
        };
        _this.onError = function (error) {
            _this.props.onError(__WEBPACK_IMPORTED_MODULE_5__phrases__["c" /* couldNotLoadEditor */]);
        };
        _this.onSave = function () {
            var imageGetter = _this.loadParameters.imageGetter;
            var image = imageGetter();
            if (image.isExported && image.content) {
                _this.props.onSave(image.content);
            }
            else {
                _this.props.onError(__WEBPACK_IMPORTED_MODULE_5__phrases__["e" /* couldNotSaveImage */]);
            }
        };
        _this.state = {
            dimensions: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
            color: { red: 0xbf, green: 0x26, blue: 0x00 },
            lineWidth: 10,
            tool: 'arrow',
        };
        return _this;
    }
    EditorView.prototype.componentDidMount = function () {
        var rect = this.rootDiv.getBoundingClientRect();
        var dimensions = {
            width: rect.width || DEFAULT_WIDTH,
            height: rect.height || DEFAULT_HEIGHT,
        };
        this.setState({ dimensions: dimensions });
        this.loadProperties();
    };
    EditorView.prototype.componentWillUnmount = function () {
        this.saveProperties();
    };
    EditorView.prototype.render = function () {
        var _this = this;
        var refHandler = function (div) {
            _this.rootDiv = div;
        };
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__styles__["a" /* EditorContainer */], { innerRef: refHandler },
            this.renderEditor(),
            this.renderToolbar()));
    };
    EditorView.prototype.renderEditor = function () {
        var _this = this;
        var onError = function (url, error) { return _this.onError(error); };
        var onShapeParametersChanged = function (_a) {
            var color = _a.color, lineWidth = _a.lineWidth;
            _this.setState({ color: color, lineWidth: lineWidth });
        };
        var imageUrl = this.props.imageUrl;
        var _a = this.state, dimensions = _a.dimensions, color = _a.color, lineWidth = _a.lineWidth, tool = _a.tool;
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__atlaskit_media_editor__["a" /* MediaEditor */], { imageUrl: imageUrl, dimensions: dimensions, backgroundColor: TRANSPARENT_COLOR, shapeParameters: { color: color, lineWidth: lineWidth, addShadow: true }, tool: tool, onLoad: this.onLoad, onError: onError, onShapeParametersChanged: onShapeParametersChanged }));
    };
    EditorView.prototype.renderToolbar = function () {
        var _this = this;
        var _a = this.state, tool = _a.tool, color = _a.color, lineWidth = _a.lineWidth;
        var onToolChanged = function (tool) { return _this.setState({ tool: tool }); };
        var onColorChanged = function (color) { return _this.setState({ color: color }); };
        var onLineWidthChanged = function (lineWidth) {
            return _this.setState({ lineWidth: lineWidth });
        };
        var onCancel = function () { return _this.props.onCancel(); };
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar__["a" /* Toolbar */], { tool: tool, color: color, lineWidth: lineWidth, onToolChanged: onToolChanged, onColorChanged: onColorChanged, onLineWidthChanged: onLineWidthChanged, onSave: this.onSave, onCancel: onCancel }));
    };
    // Using local storage to save and load shape properties
    EditorView.prototype.saveProperties = function () {
        var _a = this.state, tool = _a.tool, color = _a.color, lineWidth = _a.lineWidth;
        try {
            localStorage.setItem(propertyColor, JSON.stringify(color));
            localStorage.setItem(propertyTool, tool);
            localStorage.setItem(propertyLineWidth, lineWidth.toString());
        }
        catch (error) {
            // tslint:disable-next-line:no-console
            console.warn("Failed to save properties for MediaEditor: " + color + " " + tool + " " + lineWidth);
        }
    };
    EditorView.prototype.loadProperties = function () {
        var color = localStorage.getItem(propertyColor);
        if (color) {
            try {
                this.setState({
                    color: JSON.parse(color),
                });
            }
            catch (error) {
                // tslint:disable-next-line:no-console
                console.warn("Failed to parse color property for MediaEditor: " + color);
            }
        }
        var tool = localStorage.getItem(propertyTool);
        if (tool && isTool(tool)) {
            this.setState({
                tool: tool,
            });
        }
        var lineWidth = localStorage.getItem(propertyLineWidth);
        if (lineWidth) {
            this.setState({
                lineWidth: parseInt(lineWidth, 10),
            });
        }
    };
    return EditorView;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

function isTool(value) {
    return __WEBPACK_IMPORTED_MODULE_4__toolbar_toolbar__["b" /* tools */].some(function (tool) { return tool === value; });
}
/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["b" /* connect */])(function (_a) {
    var editorData = _a.editorData;
    return ({
        imageUrl: editorData ? editorData.imageUrl || '' : '',
    });
})(EditorView));
//# sourceMappingURL=editorView.js.map

/***/ }),

/***/ 1954:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signal; });
var Signal = /** @class */ (function () {
    function Signal() {
    }
    // Call this method to emit event
    Signal.prototype.emit = function (data) {
        if (this.handler) {
            this.handler(data);
        }
    };
    // The following methods are used by the engine. Do not call them
    Signal.prototype.listen = function (handler) {
        this.handler = handler;
    };
    Signal.prototype.reset = function () {
        this.handler = null;
    };
    return Signal;
}());

//# sourceMappingURL=signal.js.map

/***/ }),

/***/ 1955:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return colorSame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return colorWithAlphaSame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return dimensionsSame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getUtf32Codes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getUtf32CodeUnits; });
/* harmony export (immutable) */ __webpack_exports__["a"] = adjustSize;
var colorSame = function (a, b) {
    return a.red === b.red && a.green === b.green && a.blue === b.blue;
};
var colorWithAlphaSame = function (a, b) {
    return (a.red === b.red &&
        a.green === b.green &&
        a.blue === b.blue &&
        a.alpha === b.alpha);
};
var dimensionsSame = function (a, b) {
    return a.width === b.width && a.height === b.height;
};
// The editor core consumes and operates with UTF-32 strings.
// JavaScript uses UTF-16 encoding for string.
// The following two functions are necessary to get UTF-32 code units (numeric codes or as strings) from a JS string.
//
// In UTF-16 a code unit is two bytes.
// When we call String.charCodeAt() we get a UTF-16 code unit. String.length returns the number of UTF-16 code units.
//
// Most of the characters we use are encoded with one UTF-16 code unit and we translate it to UTF-32 easily: the code is the same.
// For example the letter 'a' is represented with the code 0x0061. The corresponding UTF-32 code is 0x00000061.
//
// Unfortunately there are characters that are represented with two UTF-16 code units.
// Their Unicode values are in the range 0x10000-0x10FFFF.
// In UTF-16 they are represented as surrogate pairs:
//   the first UTF-16 code unit is in range 0xD800-0xDBFF and is called a high surrogate;
//   the second UTF-16 code unit is in range 0xDC00-0xDFFF and is called a low surrogate.
//
// No character can be encoded with one UTF-16 code unit in the range 0xD800-0xDBFF. If we get such a code unit
// then it's always a high surrogate and to get the whole character we need the next UTF-16 code unit which is the low surrogate.
//
// To form a surrogate pair (according to UTF-16 encoding) we need:
// 1) Subtract 0x010000 from the Unicode code. The result will be in range 0-0xFFFFF, i.e. will contain 20 bits.
// 2) Get the top ten bits, add 0xD800. The result will be the high surrogate pair.
// 3) Get the low ten bits, add 0xDC00. The result will be the low surrogate pair.
//
// To get back (to get the UTF-32 code) we revert the operations:
// 1) top_ten_bits = high_surrogate - 0xD800
// 2) low_ten_bits = low_surrogate - 0xDC00
// 3) To shift ten bits left we multiply by 0x400, thus the result is
//
//    result = top_ten_bits * 0x400 + low_ten_bits + 0x10000 =
//           = (high_surrogate - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000
//
// More info:
// https://mathiasbynens.be/notes/javascript-encoding
// https://en.wikipedia.org/wiki/UTF-16
// Gets UTF-32 codes of a given string
var getUtf32Codes = function (text) {
    return splitText(text, function (code) { return code; }, function (high, low) { return (high - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000; });
};
// Splits a string to strings each of them is one Unicode character.
// We can't just split to UTF-16 code units because of surrogate pairs. For example,
// '\uD834\uDF06' is one Unicode character and should be represented as '\uD834\uDF06' or '\u{1D306}',
// but not ['\uD834', '\uDF06'].
var getUtf32CodeUnits = function (text) {
    return splitText(text, function (code) { return String.fromCharCode(code); }, function (high, low) { return String.fromCharCode(high, low); });
};
function splitText(text, charCodeHandler, surrogatePairHandler) {
    var result = [];
    for (var i = 0; i < text.length; ++i) {
        var current = text.charCodeAt(i);
        if (current >= 0xd800 && current <= 0xdbff && i < text.length - 1) {
            // high surrogate
            var next = text.charCodeAt(i + 1);
            ++i;
            if (next >= 0xdc00 && next <= 0xdfff) {
                // low surrogate
                result.push(surrogatePairHandler(current, next));
            }
            else {
                // the string is broken
                result.push(charCodeHandler(current), charCodeHandler(next));
            }
        }
        else {
            result.push(charCodeHandler(current));
        }
    }
    return result;
}
// The function adjusts the size of the 'elements' to the requiredSize.
// It can create some elements, or delete some. It uses the fuctions creator, deleter for this.
function adjustSize(elements, requiredSize, creator, deleter) {
    var currentSize = elements.length;
    if (currentSize > requiredSize) {
        // We need to delete some elements
        var deleteStartIndex = requiredSize;
        elements.splice(deleteStartIndex).forEach(deleter);
    }
    else if (currentSize < requiredSize) {
        // We need to add some elements
        var numToAdd = requiredSize - currentSize;
        for (var i = 0; i < numToAdd; ++i) {
            elements.push(creator());
        }
    }
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 1956:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EditorContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return OutputArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DrawingCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SupplementaryCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HiddenTextArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return HiddenTextHelperDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return ToolbarContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return ToolbarButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return LineWidthBackCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return LineWidthFrontCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return ToolIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__);



var EditorContainer = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_1 || (templateObject_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var OutputArea = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_2 || (templateObject_2 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  overflow: hidden;\n"], ["\n  position: absolute;\n  overflow: hidden;\n"])));
var DrawingCanvas = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].canvas(templateObject_3 || (templateObject_3 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  left: 0;\n  top: 0;\n"], ["\n  position: absolute;\n  left: 0;\n  top: 0;\n"])));
var SupplementaryCanvas = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].canvas(templateObject_4 || (templateObject_4 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  display: none;\n  left: 0;\n  top: 0;\n"], ["\n  position: absolute;\n  display: none;\n  left: 0;\n  top: 0;\n"])));
// TODO Check with transparent canvas, because DefaultKeyboardInput makes the text area visible to get focus.
// https://jira.atlassian.com/browse/FIL-4059
var HiddenTextArea = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].textarea(templateObject_5 || (templateObject_5 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  display: block;\n  visibility: hidden; /* display:none won't allow to get the keyboard focus */\n  left: 0;\n  top: 0;\n  width: 0;\n  height: 0;\n  overflow: hidden;\n  resize: none;\n  opacity: 0;\n"], ["\n  position: absolute;\n  display: block;\n  visibility: hidden; /* display:none won't allow to get the keyboard focus */\n  left: 0;\n  top: 0;\n  width: 0;\n  height: 0;\n  overflow: hidden;\n  resize: none;\n  opacity: 0;\n"])));
var HiddenTextHelperDiv = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_6 || (templateObject_6 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  display: block;\n  visibility: hidden; /* display:none won't allow us to call getClientBoundingRect() for children */\n  left: 0;\n  top: 0;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  white-space: pre; /* to preserve multiple whitespace characters and not to break lines */\n"], ["\n  position: absolute;\n  display: block;\n  visibility: hidden; /* display:none won't allow us to call getClientBoundingRect() for children */\n  left: 0;\n  top: 0;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  white-space: pre; /* to preserve multiple whitespace characters and not to break lines */\n"])));
var ToolbarContainer = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_7 || (templateObject_7 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  width: 32px;\n  height: 392px;\n  background-color: ", ";\n  border-radius: 4px;\n  padding: 8px;\n"], ["\n  width: 32px;\n  height: 392px;\n  background-color: ", ";\n  border-radius: 4px;\n  padding: 8px;\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN600A"]);
var ToolbarButton = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_8 || (templateObject_8 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  background-color: ", ";\n  border-radius: 4px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  background-color: ",
    ";\n  border-radius: 4px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), function (props) {
    return props.selected ? __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN90"] : 'transparent';
}, __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN90"]);
var ColorSquare = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_9 || (templateObject_9 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  width: 20px;\n  height: 20px;\n  margin: 4px;\n  background-color: ", ";\n  border-radius: 4px;\n  border-width: 2px;\n  border-color: ", ";\n  border-style: solid;\n"], ["\n  width: 20px;\n  height: 20px;\n  margin: 4px;\n  background-color: ", ";\n  border-radius: 4px;\n  border-width: 2px;\n  border-color: ", ";\n  border-style: solid;\n"])), function (props) { return props.color || 'transparent'; }, __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN50A"]);
var LineWidthBackCircle = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_10 || (templateObject_10 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin: 6px;\n  background-color: ", ";\n  border-radius: 10px;\n"], ["\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin: 6px;\n  background-color: ", ";\n  border-radius: 10px;\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN200"]);
var LineWidthFrontCircle = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_11 || (templateObject_11 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius: 50%;\n  margin: ", ";\n"], ["\n  width: ",
    ";\n  height: ",
    ";\n  background-color: ", ";\n  border-radius: 50%;\n  margin: ",
    ";\n"])), function (props) {
    return props.width ? props.width + "px" : '0';
}, function (props) {
    return props.width ? props.width + "px" : '0';
}, __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN40"], function (props) {
    return props.width ? 10 - props.width / 2 + "px" : '0';
});
var ToolIcon = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_12 || (templateObject_12 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  width: 20px;\n  height: 20px;\n  margin: 4px;\n  color: ", ";\n"], ["\n  width: 20px;\n  height: 20px;\n  margin: 4px;\n  color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN40"]);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=styled.js.map

/***/ }),

/***/ 1957:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FontInfo; });
// Provides font info for different font sizes. Caches the values calculated for different font sizes
// Font size is in pixels.
var FontInfo = /** @class */ (function () {
    function FontInfo(textHelperDiv) {
        this.textHelperDiv = textHelperDiv;
        this.cache = {};
    }
    FontInfo.prototype.getFontMetrics = function (fontSize) {
        var storedValue = this.cache[fontSize];
        if (storedValue) {
            return storedValue;
        }
        else {
            // There is no metrics in the cache. We calculate it and place to the cache.
            var metrics = this.calculateFontMetrics(fontSize);
            this.cache[fontSize] = metrics;
            return metrics;
        }
    };
    // CSS style for the font that we use to render text
    FontInfo.getFontStyle = function (fontSize) {
        return "bold " + fontSize + "px Helvetica, Arial, Sans-Serif";
    };
    FontInfo.prototype.calculateFontMetrics = function (fontSize) {
        // We'll create a temporary span and read its height
        var span = document.createElement('span');
        span.style.font = FontInfo.getFontStyle(fontSize);
        span.innerText = 'Aq'; // the actual text doesn't matter, it should be non-empty
        this.textHelperDiv.appendChild(span);
        var rect = span.getBoundingClientRect();
        this.textHelperDiv.removeChild(span);
        // As there is no API to get font metrics we measure the span height and make calculations.
        // The coefficients were adjusted manually to get a nice looking result.
        var lineHeightCoefficient = 1.1;
        var descentCoefficient = 0.15;
        var lineHeight = Math.round(lineHeightCoefficient * ((rect && rect.height) || fontSize));
        var descent = Math.round(descentCoefficient * lineHeight);
        return { lineHeight: lineHeight, descent: descent };
    };
    return FontInfo;
}());

//# sourceMappingURL=fontInfo.js.map

/***/ }),

/***/ 1958:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenericButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles__ = __webpack_require__(1959);




var GenericButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](GenericButton, _super);
    function GenericButton(props) {
        var _this = _super.call(this, props) || this;
        _this.getContainerClass = function (isClicked, isActive) {
            if (isClicked) {
                return __WEBPACK_IMPORTED_MODULE_2__styles__["b" /* ButtonClicked */];
            }
            else if (isActive) {
                return __WEBPACK_IMPORTED_MODULE_2__styles__["a" /* ButtonActive */];
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_2__styles__["c" /* ButtonNormal */];
            }
        };
        _this.onMouseDown = function (event) {
            if (event.button === 0) {
                _this.setState({ isClicked: true });
            }
        };
        _this.onMouseUp = function (event) {
            if (event.button === 0) {
                _this.setState({ isClicked: false });
                _this.props.onClick();
            }
        };
        _this.onMouseLeave = function () {
            if (_this.state.isClicked) {
                _this.setState({ isClicked: false });
            }
        };
        _this.state = { isClicked: false };
        return _this;
    }
    GenericButton.prototype.render = function () {
        var isActive = this.props.isActive;
        var isClicked = this.state.isClicked;
        var Container = this.getContainerClass(isClicked, isActive); // tslint:disable-line:variable-name
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](Container, { onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp, onMouseLeave: this.onMouseLeave }, this.props.children));
    };
    return GenericButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=genericButton.js.map

/***/ }),

/***/ 1959:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ButtonNormal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ButtonClicked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return OptionsIconWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ColorSample; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__);
// tslint:disable:variable-name



var transparent = 'rgba(0, 0, 0, 0)';
var buttonHoverBackgroundColor = 'rgba(255, 255, 255, 0.15)';
var buttonClickedBackgroundColor = 'rgba(76, 154, 255, 0.25)';
var optionsColorNormal = 'rgba(255, 255, 255, 0.6)';
var optionsColorActive = 'rgba(66, 82, 110, 0.6)';
var colorSampleOutlineColor = 'rgba(255, 255, 255, 0.5)';
var ButtonBase = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_1 || (templateObject_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  cursor: pointer;\n  position: relative; /* for the child OptionsAreaBase which uses absolute positioning */\n  background-color: ", ";\n  color: ", ";\n  width: 40px;\n  height: 32px;\n  border-radius: 4px;\n  margin-left: 2px;\n  margin-right: 2px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"], ["\n  cursor: pointer;\n  position: relative; /* for the child OptionsAreaBase which uses absolute positioning */\n  background-color: ", ";\n  color: ", ";\n  width: 40px;\n  height: 32px;\n  border-radius: 4px;\n  margin-left: 2px;\n  margin-right: 2px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])), transparent, __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN0"]);
var ButtonNormal = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(ButtonBase)(templateObject_2 || (templateObject_2 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"], ["\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"])), buttonHoverBackgroundColor, __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN0"]);
var ButtonClicked = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(ButtonBase)(templateObject_3 || (templateObject_3 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  background-color: ", ";\n  color: ", ";\n"], ["\n  background-color: ", ";\n  color: ", ";\n"])), buttonClickedBackgroundColor, __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorB50"]);
var ButtonActive = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(ButtonBase)(templateObject_4 || (templateObject_4 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  background-color: ", ";\n  color: ", ";\n"], ["\n  background-color: ", ";\n  color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN0"], __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN500"]);
var OptionsIconWrapper = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_5 || (templateObject_5 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  right: -7px;\n  bottom: -10px;\n\n  color: ", ";\n"], ["\n  position: absolute;\n  right: -7px;\n  bottom: -10px;\n\n  color: ",
    ";\n"])), function (_a) {
    var isActive = _a.isActive;
    return isActive ? optionsColorActive : optionsColorNormal;
});
var ColorSample = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_6 || (templateObject_6 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  width: 18px;\n  height: 18px;\n  border-radius: 3px;\n  border-style: solid;\n  border-width: 1px;\n  border-color: ", ";\n"], ["\n  width: 18px;\n  height: 18px;\n  border-radius: 3px;\n  border-style: solid;\n  border-width: 1px;\n  border-color: ", ";\n"])), colorSampleOutlineColor);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=styles.js.map

/***/ }),

/***/ 1960:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaServicesArrowIcon = function MediaServicesArrowIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M10.527 11.078l-.842-1.867c-.588-1.305-1.456-1.269-1.942.07l-3.69 10.153c-.164.45.067.676.513.514l10.148-3.692c1.339-.488 1.37-1.357.07-1.944l-1.856-.837c.393-.37.79-.756 1.19-1.156 3.861-3.864 6.448-7.54 5.776-8.213-.672-.672-4.347 1.916-8.209 5.78-.4.4-.787.799-1.158 1.192z" fill="currentColor"/></svg>' }, props));
};
exports.default = MediaServicesArrowIcon;

/***/ }),

/***/ 1961:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaServicesBrushIcon = function MediaServicesBrushIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M6.486 13.728c-1.593 1.599-.248 3.24-2.364 5.674-.955 1.098 3.932.763 6.354-1.668 1.027-1.03.737-2.534-.364-3.64-1.102-1.106-2.6-1.397-3.626-.366zm13.471-9.685c-.537-.548-6.733 4.25-8.503 6.058-.878.897-1.171 1.378-1.44 1.738-.118.156.037.204.107.241.348.184.842.507 1.156.828.315.321.665.815.84 1.161.036.071.083.23.236.11.352-.275.823-.574 1.701-1.472 1.77-1.807 6.44-8.115 5.903-8.664z" fill="currentColor"/></svg>' }, props));
};
exports.default = MediaServicesBrushIcon;

/***/ }),

/***/ 1962:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaServicesLineIcon = function MediaServicesLineIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M4.36 17.904L17.904 4.36a1.228 1.228 0 1 1 1.736 1.736L6.096 19.64a1.228 1.228 0 1 1-1.736-1.736z" fill="currentColor"/></svg>' }, props));
};
exports.default = MediaServicesLineIcon;

/***/ }),

/***/ 1963:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionsIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_button_option__ = __webpack_require__(1998);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_button_option___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_button_option__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles__ = __webpack_require__(1959);





// Small triangle in the right bottom corner of the buttons for color and line width
var OptionsIcon = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](OptionsIcon, _super);
    function OptionsIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OptionsIcon.prototype.render = function () {
        var isActive = this.props.isActive;
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__styles__["e" /* OptionsIconWrapper */], { isActive: isActive },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_button_option___default.a, { label: "options" })));
    };
    return OptionsIcon;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=optionsIcon.js.map

/***/ }),

/***/ 1964:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PopupBase */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LineWidthPopupContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorPopupContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__);
// tslint:disable:variable-name



var PopupBase = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_1 || (templateObject_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  pointer-events: auto;\n  border-radius: 4px;\n  display: flex;\n  flex-wrap: wrap;\n  bottom: 48px;\n  padding: 4px;\n  background-color: ", ";\n"], ["\n  position: absolute;\n  pointer-events: auto;\n  border-radius: 4px;\n  display: flex;\n  flex-wrap: wrap;\n  bottom: 48px;\n  padding: 4px;\n  background-color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN0"]);
var LineWidthPopupContainer = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(PopupBase)(templateObject_2 || (templateObject_2 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  right: 270px;\n  width: 160px;\n  padding: 9px;\n"], ["\n  right: 270px;\n  width: 160px;\n  padding: 9px;\n"])));
var ColorPopupContainer = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(PopupBase)(templateObject_3 || (templateObject_3 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  width: 192px;\n  right: 226px;\n  padding: 8px;\n"], ["\n  width: 192px;\n  right: 226px;\n  padding: 8px;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=popupStyles.js.map

/***/ }),

/***/ 1965:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__react_mediaEditor__ = __webpack_require__(1966);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__react_mediaEditor__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__react_toolbar__ = __webpack_require__(1993);
/* unused harmony namespace reexport */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1966:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaEditor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styled__ = __webpack_require__(1956);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_engine__ = __webpack_require__(1967);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(1955);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_components_drawingArea__ = __webpack_require__(1986);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__engine_components_imageProvider__ = __webpack_require__(1987);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_components_mouseInput__ = __webpack_require__(1988);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__engine_components_toolbar__ = __webpack_require__(1989);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__engine_components_keyboardInput__ = __webpack_require__(1990);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__engine_components_imageReceiver__ = __webpack_require__(1991);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__engine_components_shapeDeleter__ = __webpack_require__(1992);












var defaultTextDirection = 'ltr';
var MediaEditor = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](MediaEditor, _super);
    function MediaEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOutputAreaInnerRef = function (outputArea) {
            _this.outputArea = outputArea;
        };
        _this.handleSupplementaryCanvasInnerRef = function (canvas) {
            _this.supplementaryCanvas = canvas;
        };
        _this.handleHiddenTextAreaInnerRef = function (textArea) {
            _this.hiddenTextArea = textArea;
        };
        _this.handleHiddenTextHelperDivInnerRef = function (div) {
            _this.hiddenTextHelperDiv = div;
        };
        _this.handleDrawingCanvasInnerRef = function (canvas) {
            _this.canvas = canvas;
        };
        _this.isUnmounted = false;
        return _this;
    }
    MediaEditor.prototype.componentDidMount = function () {
        this.loadEngine();
    };
    MediaEditor.prototype.componentDidUpdate = function (prevProps) {
        if (!this.engine) {
            return;
        }
        var currProps = this.props;
        if (currProps.imageUrl !== prevProps.imageUrl) {
            this.unloadEngine();
            this.loadEngine();
        }
        if (!Object(__WEBPACK_IMPORTED_MODULE_4__util__["d" /* dimensionsSame */])(currProps.dimensions, prevProps.dimensions) ||
            currProps.screenScaleFactor !== prevProps.screenScaleFactor) {
            this.drawingArea.setSize(MediaEditor.toOutputSize(currProps));
        }
        if (!Object(__WEBPACK_IMPORTED_MODULE_4__util__["c" /* colorWithAlphaSame */])(currProps.backgroundColor, prevProps.backgroundColor)) {
            // TODO inform the core about the new background color
            // https://jira.atlassian.com/browse/FIL-3996
        }
        var _a = currProps.shapeParameters, currColor = _a.color, currLineWidth = _a.lineWidth, currAddShadow = _a.addShadow;
        var _b = prevProps.shapeParameters, prevColor = _b.color, prevLineWidth = _b.lineWidth, prevAddShadow = _b.addShadow;
        if (!Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* colorSame */])(currColor, prevColor)) {
            this.toolbar.setColor(currColor);
        }
        if (currLineWidth !== prevLineWidth) {
            this.toolbar.setLineWidth(currLineWidth);
        }
        if (currAddShadow !== prevAddShadow) {
            this.toolbar.setAddShadow(currAddShadow);
        }
        if (currProps.tool !== prevProps.tool) {
            this.toolbar.setTool(currProps.tool);
        }
    };
    MediaEditor.prototype.componentWillUnmount = function () {
        this.isUnmounted = true;
        this.unloadEngine();
    };
    MediaEditor.prototype.render = function () {
        var dimensions = this.props.dimensions;
        var width = dimensions.width + "px";
        var height = dimensions.height + "px";
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["c" /* EditorContainer */], { style: { width: width, height: height } },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["h" /* OutputArea */], { innerRef: this.handleOutputAreaInnerRef, style: { width: width, height: height } },
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["i" /* SupplementaryCanvas */], { innerRef: this.handleSupplementaryCanvasInnerRef }),
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["d" /* HiddenTextArea */], { autoComplete: 'off', innerRef: this.handleHiddenTextAreaInnerRef }),
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["e" /* HiddenTextHelperDiv */], { innerRef: this.handleHiddenTextHelperDivInnerRef }),
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["b" /* DrawingCanvas */], { innerRef: this.handleDrawingCanvasInnerRef, style: { width: width, height: height } }))));
    };
    MediaEditor.prototype.loadEngine = function () {
        var _this = this;
        var imageUrl = this.props.imageUrl;
        __WEBPACK_IMPORTED_MODULE_6__engine_components_imageProvider__["a" /* DefaultImageProvider */].create(function () { return Object(__WEBPACK_IMPORTED_MODULE_6__engine_components_imageProvider__["b" /* urlImageLoader */])(imageUrl); }, this.supplementaryCanvas)
            .then(function (imageProvider) {
            // We must not create the engine if the component was unmounted or if the image was changed
            if (_this.isUnmounted || imageUrl !== _this.props.imageUrl) {
                return;
            }
            // Creating components for the engine
            var outputSize = MediaEditor.toOutputSize(_this.props);
            var backgroundColor = _this.props.backgroundColor;
            _this.drawingArea = new __WEBPACK_IMPORTED_MODULE_5__engine_components_drawingArea__["a" /* DefaultDrawingArea */](_this.canvas, outputSize, backgroundColor);
            var mouseInput = new __WEBPACK_IMPORTED_MODULE_7__engine_components_mouseInput__["a" /* DefaultMouseInput */](_this.outputArea);
            _this.toolbar = new __WEBPACK_IMPORTED_MODULE_8__engine_components_toolbar__["a" /* DefaultToolbar */](function (params) {
                return _this.props.onShapeParametersChanged(params);
            });
            var keyboardInput = new __WEBPACK_IMPORTED_MODULE_9__engine_components_keyboardInput__["a" /* DefaultKeyboardInput */](_this.hiddenTextArea, _this.supplementaryCanvas, _this.hiddenTextHelperDiv);
            var imageReceiver = new __WEBPACK_IMPORTED_MODULE_10__engine_components_imageReceiver__["a" /* DefaultImageReceiver */](_this.supplementaryCanvas);
            var shapeDeleter = new __WEBPACK_IMPORTED_MODULE_11__engine_components_shapeDeleter__["a" /* DefaultShapeDeleter */](_this.hiddenTextArea);
            // Creating the engine
            var _a = _this.props, shapeParameters = _a.shapeParameters, initialTool = _a.tool;
            var textDirection = window.getComputedStyle(_this.outputArea)
                .direction || defaultTextDirection;
            var config = {
                // tslint:disable-next-line:no-console
                onCoreError: function (message) {
                    // tslint:disable-next-line
                    console.error(message);
                },
                shapeParameters: shapeParameters,
                initialTool: initialTool,
                textDirection: textDirection,
                drawingArea: _this.drawingArea,
                imageProvider: imageProvider,
                mouseInput: mouseInput,
                toolbar: _this.toolbar,
                keyboardInput: keyboardInput,
                imageReceiver: imageReceiver,
                shapeDeleter: shapeDeleter,
            };
            _this.engine = new __WEBPACK_IMPORTED_MODULE_3__engine_engine__["a" /* Engine */](config);
            var loadParameters = {
                imageGetter: function (format) { return _this.engine.getBase64Image(format); },
            };
            _this.props.onLoad(imageUrl, loadParameters);
        })
            .catch(function (error) { return _this.props.onError(imageUrl, error); });
    };
    MediaEditor.prototype.unloadEngine = function () {
        if (this.engine) {
            this.engine.unload();
            delete this.engine;
        }
    };
    MediaEditor.toOutputSize = function (props) {
        var dimensions = props.dimensions;
        var screenScaleFactor = props.screenScaleFactor || MediaEditor.screenScaleFactor;
        return {
            width: dimensions.width * screenScaleFactor,
            height: dimensions.height * screenScaleFactor,
            screenScaleFactor: screenScaleFactor,
        };
    };
    Object.defineProperty(MediaEditor, "screenScaleFactor", {
        get: function () {
            return window.devicePixelRatio || 1;
        },
        enumerable: true,
        configurable: true
    });
    return MediaEditor;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

/* unused harmony default export */ var _unused_webpack_default_export = (MediaEditor);
//# sourceMappingURL=mediaEditor.js.map

/***/ }),

/***/ 1967:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Engine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_binaries_mediaEditor__ = __webpack_require__(1968);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_binaries_mediaEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__core_binaries_mediaEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resourceManager__ = __webpack_require__(1973);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_bitmapExporter__ = __webpack_require__(1974);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_bitmaps_bitmapProvider__ = __webpack_require__(1975);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_typesetter_browserTypesetter__ = __webpack_require__(1978);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_contextHolder__ = __webpack_require__(1984);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_timerFactory__ = __webpack_require__(1985);








var defaultFormat = 'image/png';
var maxColorChannel = 255;
var Engine = /** @class */ (function () {
    function Engine(config) {
        this.config = config;
        this.resourceManager = new __WEBPACK_IMPORTED_MODULE_2__resourceManager__["a" /* ResourceManager */]();
        try {
            this.addComponentsToResourceManager();
            this.createNativeCore();
            this.subscribeToComponentsSignals();
        }
        catch (error) {
            this.resourceManager.releaseAll();
            throw error;
        }
    }
    Engine.prototype.unload = function () {
        this.resourceManager.releaseAll();
    };
    Engine.prototype.getBase64Image = function (format) {
        try {
            if (!this.ve.exportImage()) {
                return { isExported: false, error: this.ve.failureReason };
            }
            else {
                var image = this.bitmapExporter.getBase64Image(format || defaultFormat);
                return { isExported: true, content: image };
            }
        }
        catch (error) {
            return { isExported: false, error: error.message };
        }
    };
    Engine.prototype.addComponentsToResourceManager = function () {
        var _this = this;
        var _a = this.config, di = _a.drawingArea, ip = _a.imageProvider, mi = _a.mouseInput, tb = _a.toolbar, ki = _a.keyboardInput, ir = _a.imageReceiver, sd = _a.shapeDeleter;
        [di, ip, mi, tb, ki, ir, sd].forEach(function (component) {
            return _this.resourceManager.add(component);
        });
    };
    Engine.prototype.subscribeToComponentsSignals = function () {
        var _this = this;
        var _a = this.config, drawingArea = _a.drawingArea, mouseInput = _a.mouseInput, toolbar = _a.toolbar, keyboardInput = _a.keyboardInput, shapeDeleter = _a.shapeDeleter;
        drawingArea.resize.listen(function (size) {
            _this.veCall('resize', function (ve) { return ve.resize(size); });
        });
        mouseInput.click.listen(function (pos) {
            return _this.veCall('click', function (ve) { return ve.clickOnce(pos); });
        });
        mouseInput.dragStart.listen(function (pos) {
            return _this.veCall('drag start', function (ve) { return ve.dragStart(pos); });
        });
        mouseInput.dragMove.listen(function (pos) {
            return _this.veCall('drag move', function (ve) { return ve.dragMove(pos); });
        });
        mouseInput.dragEnd.listen(function (pos) {
            return _this.veCall('drag end', function (ve) { return ve.dragEnd(pos); });
        });
        mouseInput.dragLost.listen(function () {
            return _this.veCall('drag lost', function (ve) { return ve.dragLost(); });
        });
        toolbar.addShadowChanged.listen(function () {
            // TODO Inform the core about this change
            // https://jira.atlassian.com/browse/FIL-3997
        });
        toolbar.colorChanged.listen(function (color) {
            return _this.veCall('update color', function (ve) { return ve.setColor(color); });
        });
        toolbar.lineWidthChanged.listen(function (lineWidth) {
            return _this.veCall('update line width', function (ve) { return ve.setLineWidth(lineWidth); });
        });
        toolbar.toolChanged.listen(function (tool) {
            return _this.veCall('update tool', function (ve) { return ve.setTool(_this.toVeTool(tool)); });
        });
        keyboardInput.characterPressed.listen(function (code) {
            return _this.veCall('add character', function (ve) { return ve.addCharacter(code); });
        });
        keyboardInput.inputCommand.listen(function (command) {
            return _this.veCall('input command', function (ve) {
                var textCommand = _this.toTextCommand(command);
                return ve.textCommand(textCommand);
            });
        });
        shapeDeleter.deleteShape.listen(function () {
            return _this.veCall('delete shape', function (ve) { return ve.deleteShape(); });
        });
    };
    Engine.prototype.createNativeCore = function () {
        this.module = __WEBPACK_IMPORTED_MODULE_1__core_binaries_mediaEditor__["createModule"]();
        this.initModule();
        this.createVeEngine();
    };
    Engine.prototype.initModule = function () {
        var _this = this;
        var _a = this.config, drawingArea = _a.drawingArea, toolbar = _a.toolbar, keyboardInput = _a.keyboardInput, imageReceiver = _a.imageReceiver, shapeDeleter = _a.shapeDeleter;
        var contextHolder = new __WEBPACK_IMPORTED_MODULE_6__core_contextHolder__["a" /* ContextHolder */](drawingArea);
        this.resourceManager.add(contextHolder);
        contextHolder.contextLost.listen(function () {
            _this.veCall('context lost notification', function (ve) { return ve.contextLost(); });
        });
        contextHolder.contextRestored.listen(function (outputSize) {
            _this.veCall('context restored notification', function (ve) {
                return ve.contextRestored(outputSize);
            });
        });
        var gl = contextHolder.gl;
        this.module.setContext(gl);
        var bitmapProvider = new __WEBPACK_IMPORTED_MODULE_4__core_bitmaps_bitmapProvider__["a" /* BitmapProvider */](this.config.imageProvider, gl);
        this.resourceManager.add(bitmapProvider);
        this.module.bitmapProvider = bitmapProvider;
        this.module.handleShapeParametersChanged = function (red, green, blue, lineWidth, addShadow) {
            toolbar.updateByCore({
                color: { red: red, green: green, blue: blue },
                lineWidth: lineWidth,
                addShadow: addShadow,
            });
        };
        this.module.handleTextInputStarted = function () {
            keyboardInput.startInput();
        };
        this.module.handleTextInputEnded = function () {
            keyboardInput.endInput();
        };
        var typesetter = new __WEBPACK_IMPORTED_MODULE_5__core_typesetter_browserTypesetter__["a" /* BrowserTypesetter */](__WEBPACK_IMPORTED_MODULE_0_tslib__["__assign"]({ 
            // TODO: Media migration - TypeScript error - startInput not expected
            gl: gl, module: this.module }, keyboardInput));
        this.resourceManager.add(typesetter);
        this.module.browserTypesetter = typesetter;
        var timerFactory = new __WEBPACK_IMPORTED_MODULE_7__core_timerFactory__["a" /* TimerFactory */](function (id) { return _this.passTimerTick(id); });
        this.resourceManager.add(timerFactory);
        this.module.timerFactory = timerFactory;
        this.bitmapExporter = new __WEBPACK_IMPORTED_MODULE_3__core_bitmapExporter__["a" /* BitmapExporter */](imageReceiver.supplementaryCanvas, this.module);
        this.module.bitmapExporter = this.bitmapExporter;
        this.module.handleScrollChanged = function () { };
        this.module.handleUndoRedoStateChanged = function () { };
        this.module.handleDeleteShapeStateChanged = function (canDelete) {
            if (canDelete) {
                shapeDeleter.deleteEnabled();
            }
            else {
                shapeDeleter.deleteDisabled();
            }
        };
    };
    Engine.prototype.createVeEngine = function () {
        var _this = this;
        var _a = this.config, shapeParameters = _a.shapeParameters, drawingArea = _a.drawingArea, imageProvider = _a.imageProvider;
        var backImage = imageProvider.backImage, backImageUuid = imageProvider.backImageUuid;
        var initialParameters = {
            shapeColor: shapeParameters.color,
            lineWidth: shapeParameters.lineWidth,
            addShadow: shapeParameters.addShadow,
            tool: this.toVeTool(this.config.initialTool),
            windowSize: drawingArea.outputSize,
            backgroundColor: __WEBPACK_IMPORTED_MODULE_0_tslib__["__assign"]({ alpha: maxColorChannel }, drawingArea.backgroundColor),
            backBitmapUuid: backImageUuid,
            backBitmapSize: { width: backImage.width, height: backImage.height },
            baseTextDirection: this.toTextDirection(this.config.textDirection),
        };
        this.ve = new this.module.VeEngine();
        this.resourceManager.addCustom(function () {
            _this.ve.delete();
        });
        if (!this.ve.create(initialParameters)) {
            throw new Error("The engine was not created. Error: " + this.ve.failureReason);
        }
        this.veCall('render', function (ve) { return ve.render(); });
    };
    Engine.prototype.veCall = function (description, method) {
        if (!method(this.ve)) {
            this.config.onCoreError("Could not perform '" + description + "'. Reason: '" + this.ve.failureReason + "'");
        }
    };
    Engine.prototype.toVeTool = function (tool) {
        var _a = this.module.VeTool, Arrow = _a.Arrow, Blur = _a.Blur, Line = _a.Line, Brush = _a.Brush, Oval = _a.Oval, Rectangle = _a.Rectangle, Text = _a.Text;
        var nativeTools = {
            arrow: Arrow,
            blur: Blur,
            line: Line,
            brush: Brush,
            oval: Oval,
            rectangle: Rectangle,
            text: Text,
            default: Arrow,
        };
        return nativeTools[tool] || nativeTools['default'];
    };
    Engine.prototype.toTextCommand = function (inputCommand) {
        var _a = this.module.VeTextInputCommand, CompleteInput = _a.CompleteInput, NewLine = _a.NewLine, Backspace = _a.Backspace, Delete = _a.Delete, MoveCursorLeft = _a.MoveCursorLeft, MoveCursorRight = _a.MoveCursorRight, MoveCursorUp = _a.MoveCursorUp, MoveCursorDown = _a.MoveCursorDown;
        var commands = {
            complete: CompleteInput,
            newline: NewLine,
            backspace: Backspace,
            delete: Delete,
            left: MoveCursorLeft,
            right: MoveCursorRight,
            up: MoveCursorUp,
            down: MoveCursorDown,
        };
        return commands[inputCommand];
    };
    Engine.prototype.toTextDirection = function (direction) {
        var _a = this.module.VeTextDirection, RightToLeft = _a.RightToLeft, LeftToRight = _a.LeftToRight;
        return direction === 'rtl' ? RightToLeft : LeftToRight;
    };
    Engine.prototype.passTimerTick = function (id) {
        this.veCall('pass timer tick', function (ve) { return ve.timerTick(id); });
    };
    return Engine;
}());

//# sourceMappingURL=engine.js.map

/***/ }),

/***/ 1968:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer) {/* eslint-disable */
var Module = function(Module) {
  Module = Module || {};

var Module=typeof Module!=="undefined"?Module:{};var Module={ENVIRONMENT:"WEB",setContext:(function(context){GLctx=Module.ctx=context}),handleScrollChanged:null,handleShapeParametersChanged:null,bitmapProvider:null,bitmapExporter:null,browserTypesetter:null,timerFactory:null,handleTextInputStarted:null,handleTextInputEnded:null,handleUndoRedoStateChanged:null,handleDeleteShapeStateChanged:null};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}Module["arguments"]=[];Module["thisProgram"]="./this.program";Module["quit"]=(function(status,toThrow){throw toThrow});Module["preRun"]=[];Module["postRun"]=[];var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}else{throw new Error("Module['ENVIRONMENT'] value is not valid. must be one of: WEB|WORKER|NODE|SHELL.")}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){var ret;ret=tryParseAsDataURI(filename);if(!ret){filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename)}return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}Module["arguments"]=process["argv"].slice(2);process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));process["on"]("unhandledRejection",(function(reason,p){process["exit"](1)}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){Module["read"]=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)}}Module["readBinary"]=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=(function(status,toThrow){quit(status)})}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function shell_read(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)};if(typeof arguments!="undefined"){Module["arguments"]=arguments}Module["setWindowTitle"]=(function(title){document.title=title})}Module["print"]=typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null;Module["printErr"]=typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||Module["print"];Module.print=Module["print"];Module.printErr=Module["printErr"];for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var STACK_ALIGN=16;function staticAlloc(size){assert(!staticSealed);var ret=STATICTOP;STATICTOP=STATICTOP+size+15&-16;return ret}function dynamicAlloc(size){assert(DYNAMICTOP_PTR);var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=ret+size+15&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}function alignMemory(size,factor){if(!factor)factor=STACK_ALIGN;var ret=size=Math.ceil(size/factor)*factor;return ret}function getNativeTypeSize(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return 4}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;Module.printErr(text)}}var functionPointers=new Array(0);var funcWrappers={};function dynCall(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}var GLOBAL_BASE=8;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}var JSfuncs={"stackSave":(function(){stackSave()}),"stackRestore":(function(){stackRestore()}),"arrayToC":(function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};function ccall(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){stackRestore(stack)}return ret}function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}var ALLOC_STATIC=2;var ALLOC_NONE=4;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:staticAlloc,stackAlloc,staticAlloc,dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var stop;ptr=ret;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return UTF8ToString(ptr)}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function UTF32ToString(ptr){var i=0;var str="";while(1){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)return str;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}}function demangle(func){return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}var WASM_PAGE_SIZE=65536;var ASMJS_PAGE_SIZE=16777216;var MIN_TOTAL_MEMORY=16777216;function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}return x}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBuffer(buf){Module["buffer"]=buffer=buf}function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}if(!Module["reallocBuffer"])Module["reallocBuffer"]=(function(size){var ret;try{if(ArrayBuffer.transfer){ret=ArrayBuffer.transfer(buffer,size)}else{var oldHEAP8=HEAP8;ret=new ArrayBuffer(size);var temp=new Int8Array(ret);temp.set(oldHEAP8)}}catch(e){return false}var success=_emscripten_replace_memory(ret);if(!success)return false;return ret});function enlargeMemory(){var PAGE_MULTIPLE=Module["usingWasm"]?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE;var LIMIT=2147483648-PAGE_MULTIPLE;if(HEAP32[DYNAMICTOP_PTR>>2]>LIMIT){return false}var OLD_TOTAL_MEMORY=TOTAL_MEMORY;TOTAL_MEMORY=Math.max(TOTAL_MEMORY,MIN_TOTAL_MEMORY);while(TOTAL_MEMORY<HEAP32[DYNAMICTOP_PTR>>2]){if(TOTAL_MEMORY<=536870912){TOTAL_MEMORY=alignUp(2*TOTAL_MEMORY,PAGE_MULTIPLE)}else{TOTAL_MEMORY=Math.min(alignUp((3*TOTAL_MEMORY+2147483648)/4,PAGE_MULTIPLE),LIMIT)}}var replacement=Module["reallocBuffer"](TOTAL_MEMORY);if(!replacement||replacement.byteLength!=TOTAL_MEMORY){TOTAL_MEMORY=OLD_TOTAL_MEMORY;return false}updateGlobalBuffer(replacement);updateGlobalBufferViews();return true}var byteLength;try{byteLength=Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,"byteLength").get);byteLength(new ArrayBuffer(4))}catch(e){byteLength=(function(buffer){return buffer.byteLength})}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(TOTAL_MEMORY<TOTAL_STACK)Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{{buffer=new ArrayBuffer(TOTAL_MEMORY)}Module["buffer"]=buffer}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_max=Math.max;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var memoryInitializer=null;var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}var ASM_CONSTS=[(function($0,$1){return Module.bitmapExporter.prepare($0,$1)}),(function($0,$1,$2,$3,$4,$5){Module.bitmapExporter.putImagePart($0,$1,$2,$3,$4,$5)}),(function(){Module.bitmapProvider.handleContextLost()}),(function(){Module.bitmapProvider.handleContextRestored()}),(function($0){return Module.bitmapProvider.getBitmapIndex(Pointer_stringify($0))}),(function($0){return Module.bitmapProvider.getBitmapWidth($0)}),(function($0){return Module.bitmapProvider.getBitmapHeight($0)}),(function($0){return Module.bitmapProvider.getNumberOfFragments($0)}),(function($0,$1){return Module.bitmapProvider.queryFragmentCoordinates($0,$1)}),(function(){return Module.bitmapProvider.getX()}),(function(){return Module.bitmapProvider.getY()}),(function(){return Module.bitmapProvider.getWidth()}),(function(){return Module.bitmapProvider.getHeight()}),(function(){return Module.bitmapProvider.getUTopLeft()}),(function(){return Module.bitmapProvider.getVTopLeft()}),(function(){return Module.bitmapProvider.getUBottomRight()}),(function(){return Module.bitmapProvider.getVBottomRight()}),(function($0,$1){return Module.bitmapProvider.bind($0,$1)}),(function(){Module.browserTypesetter.handleContextLost()}),(function(){Module.browserTypesetter.handleContextRestored()}),(function(){return Module.timerFactory.createTimer()}),(function($0){Module.timerFactory.stopTimer($0)}),(function($0,$1){Module.timerFactory.startTimer($0,$1)}),(function($0){Module.browserTypesetter.deleteTypeset($0)}),(function(){return Module.browserTypesetter.createTypeset()}),(function($0,$1,$2,$3,$4,$5){var typeset=Module.browserTypesetter.getTypeset($0);if(!typeset){return false}return typeset.update(UTF32ToString($1),$2,$3===0?"ltr":"rtl",$4,$5)}),(function($0){return Module.browserTypesetter.getTypeset($0).getFragmentCount()}),(function($0,$1){return Module.browserTypesetter.getTypeset($0).getXBase($1)}),(function($0,$1){return Module.browserTypesetter.getTypeset($0).getYBase($1)}),(function($0,$1){return Module.browserTypesetter.getTypeset($0).getXOpposite($1)}),(function($0,$1){return Module.browserTypesetter.getTypeset($0).getYOpposite($1)}),(function($0){return Module.browserTypesetter.getTypeset($0).getLineHeight()}),(function($0){return Module.browserTypesetter.getTypeset($0).getDescent()}),(function($0,$1,$2){var typeset=Module.browserTypesetter.getTypeset($0);if(!typeset){return false}if($2){return typeset.bindStroke($1)}else{return typeset.bindNormal($1)}}),(function($0,$1,$2,$3,$4,$5){Module.handleScrollChanged($0,$1,$2,$3,$4,$5)}),(function(){Module.handleDeleteShapeStateChanged(false)}),(function(){Module.handleDeleteShapeStateChanged(true)}),(function($0,$1){Module.handleUndoRedoStateChanged($0,$1)}),(function(){Module.handleTextInputEnded()}),(function(){Module.handleTextInputStarted()}),(function($0,$1,$2,$3,$4){Module.handleShapeParametersChanged($0,$1,$2,$3,$4)})];function _emscripten_asm_const_iiiiiii(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5)}function _emscripten_asm_const_i(code){return ASM_CONSTS[code]()}function _emscripten_asm_const_ii(code,a0){return ASM_CONSTS[code](a0)}function _emscripten_asm_const_iiddidd(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5)}function _emscripten_asm_const_iiiiii(code,a0,a1,a2,a3,a4){return ASM_CONSTS[code](a0,a1,a2,a3,a4)}function _emscripten_asm_const_iii(code,a0,a1){return ASM_CONSTS[code](a0,a1)}function _emscripten_asm_const_d(code){return ASM_CONSTS[code]()}function _emscripten_asm_const_dii(code,a0,a1){return ASM_CONSTS[code](a0,a1)}function _emscripten_asm_const_iiii(code,a0,a1,a2){return ASM_CONSTS[code](a0,a1,a2)}STATIC_BASE=GLOBAL_BASE;STATICTOP=STATIC_BASE+47280;__ATINIT__.push({func:(function(){__GLOBAL__sub_I_bindings_cpp()})},{func:(function(){__GLOBAL__sub_I_bind_cpp()})});memoryInitializer="data:application/octet-stream;base64,5CsAAOQsAAAMLAAA0CwAAAgAAAAAAAAADCwAAPosAACICwAAAAAAAAwsAAAMLgAACAAAAAAAAAAMLAAAry0AAIgLAAAAAAAADCwAAKouAAAIAAAAAAAAAAwsAABLLgAAiAsAAAAAAAAMLAAARS8AAAgAAAAAAAAADCwAAOguAACICwAAAAAAAAwsAADfLwAACAAAAAAAAAAMLAAAgi8AAIgLAAAAAAAADCwAAIUwAAAIAAAAAAAAAAwsAAAiMAAAiAsAAAAAAAAMLAAAJDEAAPAAAAAAAAAADCwAAMcwAACICwAAAAAAAOQrAAA2MQAADCwAAKUxAAAIAQAAAAAAAOQrAAC9MQAADCwAAEQyAAAwAQAAAAAAAAwsAAAoMgAAoAsAAAAAAADkKwAAUjIAAAwsAAD9MgAACAEAAAAAAAAMLAAAGDMAAAgBAAAAAAAADCwAACszAAAIAQAAAAAAAAwsAABBMwAACAEAAAAAAAAMLAAAWzMAAIgBAAAAAAAA5CsAAHAzAAAMLAAAtTMAAIgLAAAAAAAADCwAAEk0AACICwAAAAAAAAwsAADdNAAAiAsAAAAAAAAMLAAAbTUAAIgLAAAAAAAADCwAACA2AACICwAAAAAAAAwsAACkNgAAiAEAAAAAAAAMLAAAKTcAAIgLAAAAAAAADCwAAKs3AACIAQAAAAAAAAwsAADfNwAAiAEAAAAAAAAMLAAA8zcAAIgBAAAAAAAADCwAAAw4AACIAQAAAAAAAAwsAABUOAAAUAIAAAAAAADkKwAAcDgAAAwsAABrPQAAUAIAAAAAAAAMLAAArzgAAIgLAAAAAAAAsCwAAA45AAAAAAAAAgAAAAgBAAACAAAAmAIAAAAEAADkKwAAIDkAAAwsAADcOQAAiAsAAAAAAAAMLAAAbjoAAIgLAAAAAAAADCwAAPw6AACICwAAAAAAAAwsAACLOwAAiAsAAAAAAAAMLAAAGTwAAIgLAAAAAAAADCwAAKY8AACICwAAAAAAAAwsAACdPQAAUAIAAAAAAAAMLAAAiUMAAFACAAAAAAAADCwAAOg9AACICwAAAAAAAAwsAAB8PgAAiAsAAAAAAACwLAAA3j4AAAAAAAACAAAACAEAAAIAAACYAgAAAAQAAAwsAAArPwAAiAsAAAAAAAAMLAAA0D8AAIADAAAAAAAADCwAAJY/AAAIAQAAAAAAAAwsAAAmQAAAiAsAAAAAAAAMLAAAy0AAALADAAAAAAAADCwAAJFAAAAIAQAAAAAAAAwsAAAdQQAAiAsAAAAAAAAMLAAAy0EAAOADAAAAAAAADCwAAIRBAAAIAQAAAAAAAAwsAAAaQgAAiAsAAAAAAAAMLAAAr0IAAIgLAAAAAAAADCwAAMFEAABABAAAAAAAAAwsAADPQwAAiAsAAAAAAAAMLAAAXkQAAIgLAAAAAAAA5CsAANVEAAAMLAAAIEUAAIgLAAAAAAAADCwAAL1FAACICwAAAAAAAAwsAABYRgAAiAsAAAAAAAAMLAAA+UYAAIgLAAAAAAAADCwAAJlHAACICwAAAAAAAAwsAAC+SgAAUAIAAAAAAAAMLAAAaEkAAIgLAAAAAAAADCwAAB5KAADQBAAAAAAAAOQrAADVSQAA5CsAAJxKAACwLAAABksAAAAAAAACAAAA+AQAAAIAAAAABQAAAgQAAOQrAAApSwAA5CsAABNLAAAMLAAAXksAANAEAAAAAAAA5CsAADdLAAAMLAAA4EsAADgFAAAAAAAA5CsAALlLAADkKwAATUwAAAwsAACoTAAAWAUAAAAAAADkKwAAgUwAAOQrAAAlTQAADCwAAJBNAADQBAAAAAAAAOQrAABpTQAADCwAABxOAACICwAAAAAAAAwsAACQTwAAiAsAAAAAAAAMLAAA6k8AAKgFAAAAAAAADCwAAPlPAAC4BQAAAAAAAOQrAAAPUAAA5CsAAJNQAAAMLAAAqVAAANgFAAAAAAAA5CsAAMpQAAAMLAAA5VAAAPAFAAAAAAAAsCwAAP9QAAAAAAAAAgAAANgFAAACAAAAEAYAAAIEAADkKwAAHlEAALAsAABhUgAAAAAAAAIAAAA4BgAAAgAAAEAGAAACBAAA5CsAAJ9SAADkKwAAfVIAAOQrAAC8UgAA5CsAANFSAAAMLAAA71IAAEAGAAAAAAAAsCwAAClhAAAAAAAAAgAAAKgGAAACAAAAQAYAAAIEAACwLAAA+WAAAAAAAAABAAAAoAYAAAIEAADkKwAAFGEAAOQrAABGYQAADCwAAA17AADABgAAAAAAAOQrAAAjewAADCwAAFp7AAC4BQAAAAAAALAsAAB3ewAAAAAAAAIAAAD4BgAAAgAAAEAGAAACBAAA5CsAAJd7AAAMLAAA7HsAAIgLAAAAAAAADCwAAFN8AAAgBwAAAAAAAOQrAABtfAAADCwAACl+AAA4BwAAAAAAAAwsAABNfgAASAcAAAAAAADkKwAAZX4AAAwsAAATfwAAaAcAAAAAAADkKwAAf34AAOQrAAC/fwAADCwAAGCAAADQBAAAAAAAAOQrAAAcgAAADCwAAAmBAACICwAAAAAAAAwsAACkgQAAiAsAAAAAAAAMLAAARIIAAIgLAAAAAAAADCwAAOeCAACICwAAAAAAAAwsAADwhAAAiAsAAAAAAAAMLAAA74UAAOgHAAAAAAAA5CsAAPuFAAAMLAAAbIYAAIgLAAAAAAAADCwAAPGGAACICwAAAAAAALAsAAD+iQAAAAAAAAEAAAAoCAAAAAAAAOQrAAA9igAAeCwAAGOKAAAAAAAAQAgAAOQrAAB1igAAlCwAAIaKAADkKwAAnooAAOQrAAC3igAA5CsAAMuKAACULAAA2YoAAOQrAADtigAAeCwAABCLAAABAAAAQAgAAJQsAAAoiwAA5CsAAD2LAADkKwAASosAAAwsAADfiwAAwAUAAAAAAAAMLAAAcZAAAFgGAAAAAAAADCwAAGSOAACICwAAAAAAAAwsAAD4jgAAUAYAAAAAAAAMLAAApI8AAIgLAAAAAAAADCwAAACQAABIBgAAAAAAAAwsAAB4kQAAIAkAAAAAAAAMLAAAs5AAAIgLAAAAAAAADCwAAJORAABABgAAAAAAAAwsAADMkgAAaAkAAAAAAAAMLAAAA5IAAIgLAAAAAAAADCwAALGSAABgCQAAAAAAAOQrAAC/kgAA5CsAAOKSAAAMLAAAJ5MAAIAJAAAAAAAA5CsAADeTAAAMLAAAe5YAAIgLAAAAAAAADCwAAIyXAACoCQAAAAAAAOQrAACilwAADCwAAL6XAADACQAAAAAAAOQrAADVlwAADCwAAIiYAADQBAAAAAAAAOQrAAAjmAAADCwAAFSZAADQBAAAAAAAAOQrAADwmAAADCwAAB+aAADQBAAAAAAAAOQrAAC8mQAADCwAAN6aAADQBAAAAAAAAOQrAACHmgAADCwAAJ+bAADQBAAAAAAAAOQrAABGmwAADCwAAHicAADQBAAAAAAAAOQrAAAHnAAADCwAABSdAADQBAAAAAAAAOQrAADgnAAADCwAALCdAADQBAAAAAAAAOQrAAB8nQAADCwAAK2eAACICwAAAAAAAAwsAAALoAAAiAsAAAAAAAAMLAAApaAAAIgLAAAAAAAADCwAAEGhAACICwAAAAAAAAwsAACroQAAIAcAAAAAAAAMLAAAlaIAAIgLAAAAAAAA5CsAAIemAADkKwAAxqYAAOQrAAAEpwAA5CsAAEqnAADkKwAAh6cAAOQrAACmpwAA5CsAAMWnAADkKwAA5KcAAOQrAAADqAAA5CsAACKoAADkKwAAQagAAOQrAAB+qAAA5CsAAJ2oAACwLAAAsKgAAAAAAAABAAAAKAgAAAAAAACwLAAA76gAAAAAAAABAAAAKAgAAAAAAADkKwAADbMAALAsAAAmswAAAAAAAAEAAACACwAAAAAAAOQrAADYswAADCwAADi0AAC4CwAAAAAAAAwsAADlswAAyAsAAAAAAADkKwAABrQAAAwsAAATtAAAqAsAAAAAAAAMLAAAKbUAAKALAAAAAAAADCwAADm1AADgCwAAAAAAAAwsAAButQAAuAsAAAAAAAAMLAAASrUAAAAMAAAAAAAADCwAAJC1AAC4CwAAAAAAAFwsAAC4tQAAXCwAALq1AABcLAAAvbUAAFwsAAC/tQAAXCwAAMG1AABcLAAAw7UAAFwsAADFtQAAXCwAAIxlAABcLAAAx7UAAFwsAADJtQAAXCwAAMu1AABcLAAAzbUAAFwsAADPtQAAXCwAANG1AAAMLAAA07UAALgLAAAAAAAADCwAAPS1AACoCwAAAAAAAAAAAAAQAAAAAQAAAAIAAAABAAAAAQAAAAIAAAACAAAAAAAAAAgAAAADAAAABAAAAAEAAAABAAAAAQAAAAEAAAAAAAAAIAAAAAUAAAAGAAAABwAAAAEAAAAIAAAAAAAAADAAAAAJAAAACgAAAAMAAAADAAAABAAAAAQAAAAAAAAAQAAAAAUAAAALAAAADAAAAAIAAAANAAAAAAAAAFAAAAAOAAAADwAAAAUAAAAFAAAABgAAAAYAAAAAAAAAYAAAAAUAAAAQAAAAEQAAAAMAAAASAAAAAAAAAHAAAAATAAAAFAAAAAcAAAAHAAAACAAAAAgAAAAAAAAAgAAAAAUAAAAVAAAAFgAAAAQAAAAXAAAAAAAAAJAAAAAYAAAAGQAAAAkAAAAJAAAACgAAAAoAAAAAAAAAoAAAAAUAAAAaAAAAGwAAAAUAAAAcAAAAAAAAALAAAAAdAAAAHgAAAAsAAAALAAAADAAAAAwAAAAAAAAAwAAAAAUAAAAfAAAAIAAAAAYAAAAhAAAAAAAAANAAAAAiAAAAIwAAAA0AAAAOAAAADQAAACQAAAAlAAAAJgAAAA8AAAAOAAAAEAAAAA8AAAAQAAAAAQAAABEAAAASAAAAAAAAAOAAAAAFAAAAJwAAACgAAAAHAAAAKQAAAAAAAADwAAAAKgAAACsAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAD4AAAALAAAAC0AAAATAAAAFAAAAAAAAAAIAQAALgAAAC8AAAABAAAAAQAAAAAAAAAQAQAAMAAAADEAAAAVAAAAAAAAACABAAAyAAAAMwAAABEAAAAAAAAAMAEAADQAAAA1AAAAAQAAAAAAAAA4AQAANgAAADcAAAAWAAAAFwAAAAAAAABIAQAAOAAAADkAAAAYAAAAGQAAAAAAAABYAQAAOgAAADsAAAAaAAAAGwAAAAAAAABoAQAAPAAAAD0AAAAcAAAAHQAAAAAAAAB4AQAAPgAAAD8AAAASAAAAHgAAAB8AAABAAAAAEwAAABQAAAAgAAAAIQAAAAIAAAAiAAAAIwAAAAAAAACIAQAAQQAAAEIAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAACQAQAABQAAAEMAAABEAAAACAAAAEUAAAAAAAAAoAEAAAUAAABGAAAARwAAAAkAAABIAAAAAAAAALABAAAFAAAASQAAAEoAAAAKAAAASwAAAAAAAADAAQAABQAAAEwAAABNAAAACwAAAE4AAAAAAAAA0AEAAAUAAABPAAAAUAAAAAwAAABRAAAAAAAAAOABAABSAAAAUwAAABUAAAAkAAAAJQAAAFQAAAAWAAAAFwAAACYAAAAnAAAAAwAAACgAAAApAAAAAAAAAPABAAAFAAAAVQAAAFYAAAANAAAAVwAAAAAAAAAAAgAAWAAAAFkAAAAYAAAAKgAAACsAAABaAAAAGQAAABoAAAAsAAAALQAAAAQAAAAuAAAALwAAAAAAAAAQAgAAWwAAAFwAAAAbAAAAMAAAADEAAABdAAAAHAAAAB0AAAAyAAAAMwAAAAUAAAA0AAAANQAAAAAAAAAgAgAAXgAAAF8AAAAeAAAANgAAADcAAABgAAAAHwAAACAAAAA4AAAAOQAAAAYAAAA6AAAAOwAAAAAAAAAwAgAAYQAAAGIAAAAhAAAAPAAAAD0AAABjAAAAIgAAACMAAAA+AAAAPwAAAAcAAABAAAAAQQAAAAAAAABAAgAAZAAAAGUAAABCAAAAQwAAAAEAAAACAAAAAwAAAAQAAAABAAAABQAAAAYAAAAHAAAACAAAAAkAAAACAAAAAAAAAFgCAABkAAAAZgAAAEQAAABFAAAACgAAAAsAAAAMAAAADQAAAAMAAAAOAAAADwAAABAAAAARAAAAEgAAAAQAAAAAAAAAaAIAAAUAAABnAAAAaAAAAA4AAABpAAAAAAAAAHgCAABqAAAAawAAAEYAAABHAAAAAAAAAKACAAAFAAAAbAAAAG0AAAAPAAAAbgAAAAAAAACwAgAABQAAAG8AAABwAAAAEAAAAHEAAAAAAAAAwAIAAAUAAAByAAAAcwAAABEAAAB0AAAAAAAAANACAAAFAAAAdQAAAHYAAAASAAAAdwAAAAAAAADgAgAABQAAAHgAAAB5AAAAEwAAAHoAAAAAAAAA8AIAAAUAAAB7AAAAfAAAABQAAAB9AAAAAAAAAAADAABkAAAAfgAAAEgAAABJAAAAEwAAABQAAAAVAAAAFgAAAAUAAAAXAAAAGAAAABkAAAAaAAAAGwAAAAYAAAAAAAAAEAMAAH8AAACAAAAASgAAAEsAAAAcAAAAHQAAAB4AAAAfAAAABwAAACAAAAAhAAAAIgAAACMAAAAkAAAACAAAAAAAAAAgAwAABQAAAIEAAACCAAAAFQAAAIMAAAAAAAAAMAMAAAUAAACEAAAAhQAAABYAAACGAAAAAAAAAEADAACHAAAAiAAAAEwAAABNAAAAAAAAAGADAAAFAAAAiQAAAIoAAAAXAAAAiwAAAAAAAABwAwAAjAAAAI0AAABOAAAATwAAAAAAAACAAwAAjAAAAI4AAABOAAAATwAAAAAAAACQAwAABQAAAI8AAACQAAAAGAAAAJEAAAAAAAAAoAMAAJIAAACTAAAAUAAAAFEAAAAAAAAAsAMAAJIAAACUAAAAUAAAAFEAAAAAAAAAwAMAAAUAAACVAAAAlgAAABkAAACXAAAAAAAAANADAACYAAAAmQAAAFIAAABTAAAAAAAAAOADAACYAAAAmgAAAFIAAABTAAAAAAAAAPADAAAFAAAAmwAAAJwAAAAaAAAAnQAAAAAAAAAABAAABQAAAJ4AAACfAAAAGwAAAKAAAAAAAAAAEAQAAKEAAACiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAABAAAAVAAAADIAAAAcAAAAowAAAB0AAACkAAAAMwAAAB4AAAA0AAAAHwAAACAAAAAAAAAAIAQAAAUAAAClAAAApgAAACEAAACnAAAAAAAAADAEAAAFAAAAqAAAAKkAAAAiAAAAqgAAAAAAAABIBAAABQAAAKsAAACsAAAAIwAAAK0AAAAAAAAAUAIAAGQAAACuAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAABYBAAABQAAAK8AAACwAAAAJAAAALEAAAAAAAAAaAQAAAUAAACyAAAAswAAACUAAAC0AAAAAAAAAHgEAAAFAAAAtQAAALYAAAAmAAAAtwAAAAAAAACIBAAABQAAALgAAAC5AAAAJwAAALoAAAAAAAAAQAQAALsAAAC8AAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAmAQAAL0AAAC+AAAAVQAAAFYAAAAlAAAAJgAAACcAAAAoAAAACQAAACkAAAAqAAAAKwAAACwAAAAtAAAACgAAAAAAAACoBAAABQAAAL8AAADAAAAAKAAAAMEAAAAAAAAAuAQAAMIAAADDAAAANQAAAFcAAADEAAAAxQAAAMYAAAApAAAANgAAAAAAAADYBAAAxwAAAMgAAAA3AAAAOAAAACoAAAABAAAAOQAAAAEAAAACAAAAWAAAADoAAAABAAAAAgAAACsAAAAsAAAALQAAAC4AAAA7AAAALwAAADAAAAA8AAAAPQAAAD4AAAAxAAAAMgAAADMAAAA/AAAAQAAAADQAAABBAAAAQgAAAFkAAABDAAAANQAAAEQAAABFAAAARgAAAFoAAAD8////2AQAAMkAAADKAAAAWwAAAAAAAAAIBQAAywAAAMwAAABHAAAAXAAAAM0AAADOAAAAzwAAADYAAABIAAAAAAAAACAFAADQAAAA0QAAAEkAAABdAAAA0gAAANMAAABeAAAANwAAAEoAAAAAAAAAQAUAANQAAADVAAAASwAAAF8AAADWAAAA1wAAAAEAAAA4AAAATAAAAAAAAABgBQAAywAAANgAAABNAAAAYAAAANkAAADaAAAA2wAAADkAAABOAAAAAAAAAHgFAAAFAAAA3AAAAN0AAAA6AAAA3gAAAAAAAAAABQAA3wAAAOAAAAABAAAAAAAAAPgEAADhAAAA4gAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAAAAIgFAAAFAAAA4wAAAOQAAAA7AAAA5QAAAAAAAACYBQAA5gAAAOcAAABPAAAAUAAAAFEAAAACAAAAAgAAAAMAAABSAAAAAQAAAAAAAACoBQAA6AAAAOkAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAC4BQAA6AAAAOoAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAwAUAAOsAAADsAAAAAQAAAAEAAAABAAAAAQAAAAAAAADIBQAA7QAAAO4AAADvAAAAAAAAANgFAADwAAAA8QAAAAEAAAAAAAAA4AUAAPIAAADzAAAA9AAAAFMAAAD1AAAA9gAAAPcAAABUAAAAVQAAAPz////gBQAA+AAAAPkAAAD6AAAAVgAAAFcAAAAAAAAA8AUAAPsAAAD8AAAAAQAAAAEAAAABAAAAAQAAAPz////wBQAA/QAAAP4AAAABAAAAAQAAAAEAAAAAAAAAEAYAAP8AAAAAAQAAAQAAAAEAAAABAAAAAAAAABgGAAABAQAAAgEAAFgAAABZAAAAWgAAAAMBAAALAAAA/P///xgGAAAEAQAABQEAAAYBAAAMAAAAAAAAAEAGAAAHAQAACAEAAAEAAAABAAAAAAAAADgGAAAJAQAACgEAAAEAAAABAAAAAQAAAAAAAABIBgAACwEAAAwBAAABAAAAAQAAAAEAAAAAAAAAUAYAAA0BAAAOAQAAAQAAAAEAAAAAAAAAWAYAAAcBAAAPAQAAAQAAAAEAAAABAAAAYQAAAAAAAABoBgAAEAEAABEBAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAABhAAAAYgAAABIBAAANAAAA/P///2gGAAATAQAAFAEAABUBAAAOAAAAAAAAAIgGAAAWAQAAAAAAAKgGAAAXAQAAGAEAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAD8AAIA/AAAAAAAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAD8AAIA/AACAPwAAgD8AAIA/AAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAA/AAAAALAGAAAZAQAAGgEAAAEAAAAbAQAAAAAAAMAGAAAcAQAAHQEAAAEAAAABAAAAAAAAAMgGAADoAAAAHgEAAGMAAABkAAAAZQAAAAMAAAAEAAAABQAAAAAAAADYBgAAHwEAACABAABmAAAAZwAAAGgAAABiAAAAYwAAAGQAAABlAAAAZgAAAGcAAAAhAQAADwAAAPz////YBgAAIgEAACMBAAAkAQAAEAAAAAAAAAAABwAABQAAACUBAAAmAQAAPAAAACcBAAAAAAAAEAcAACgBAAApAQAAaQAAAGoAAAAGAAAABwAAAAgAAAAJAAAACgAAAAIAAAADAAAAPQAAAGgAAAABAAAAaQAAAGsAAAA+AAAACwAAAAwAAABqAAAADQAAAGsAAAAOAAAADwAAAGwAAABtAAAABAAAAG4AAABvAAAABQAAAAEAAAAQAAAAEQAAABIAAAATAAAAEQAAAGwAAAAUAAAABgAAAAIAAAAHAAAAAwAAABIAAAA/AAAAcAAAABUAAAABAAAACAAAAAkAAAABAAAABAAAAAIAAAABAAAABQAAAAYAAAAKAAAAcQAAAAEAAAALAAAAAAAAACAHAAAqAQAAKwEAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAD4BgAALAEAAC0BAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAKAcAAC4BAAAvAQAAAQAAAAIAAAABAAAAAgAAADABAABAAAAAFgAAAG0AAAAuAAAAAAAAAFAHAAAxAQAAMgEAAG4AAAByAAAAMwEAADQBAAAHAAAAQQAAAG8AAAAAAAAAcAcAAMsAAAA1AQAAcAAAAHMAAAA2AQAANwEAADgBAABCAAAAcQAAAAAAAACIBwAABQAAADkBAAA6AQAAQwAAADsBAAAAAAAAmAcAAAUAAAA8AQAAPQEAAEQAAAA+AQAAAAAAAKgHAAAFAAAAPwEAAEABAABFAAAAQQEAAAAAAAC4BwAABQAAAEIBAABDAQAARgAAAEQBAAAAAAAAOAcAAEUBAABGAQAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAAAAEgHAABFAQAARwEAAAEAAAABAAAAAAAAAMgHAAAFAAAASAEAAEkBAABHAAAASgEAAAAAAADYBwAASwEAAEwBAAByAAAAcwAAAHQAAAB1AAAAFwAAABgAAAB0AAAAGQAAABoAAAAbAAAAdQAAAHYAAAB3AAAAAAAAAOgHAABNAQAATgEAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAA8AcAAAUAAABPAQAAUAEAAEgAAABRAQAAAAAAAAAIAAAFAAAAUgEAAFMBAABJAAAAVAEAAEAMAAAwCAAAcAwAAEAMAAAwCAAASAgAAEAMAAAwCAAAeAwAAEAMAAAwCAAAUAgAAEAMAAAwCAAAkAwAAEAMAAAwCAAAUAgAAJAMAABADAAAMAgAAFgIAABADAAAMAgAAGAIAABADAAAMAgAAGgMAABADAAAMAgAAGgIAABADAAAMAgAAEAMAAAwCAAAcAgAADAIAAAAAAAAoAgAAFUBAABWAQAAEwAAABwAAAAdAAAAdgAAAAAAAACwCAAAVwEAAFgBAABZAQAAFAAAAB4AAABhAAAAAAAAAMAIAAAFAAAAWgEAAFsBAABKAAAAXAEAAAAAAADQCAAADQEAAF0BAAB4AAAAeQAAAAAAAADgCAAABQAAAF4BAABfAQAASwAAAGABAAAAAAAA8AgAAGEBAABiAQAAegAAAHsAAAB8AAAAAAAAAAAJAAAHAQAAYwEAAGQBAAAVAAAAAQAAAHcAAAAAAAAAEAkAAAUAAABlAQAAZgEAAEwAAABnAQAAAAAAADAJAABoAQAAaQEAAAgAAAAAAAAAQAkAAAUAAABqAQAAawEAAE0AAABsAQAAAAAAAFAJAABtAQAAbgEAAG8BAABwAQAAcQEAAAAAAABgCQAAcgEAAHMBAAABAAAAAQAAAAEAAAAAAAAAaAkAAHQBAAB1AQAAAQAAAAAAAABwCQAAdgEAAHcBAAB9AAAAfgAAAH8AAACAAAAABAAAAAAAAACACQAAeAEAAHkBAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAACICQAABQAAAHoBAAB7AQAATgAAAHwBAAAAAAAAmAkAAH0BAAB+AQAAHwAAAAAAAACoCQAAfQEAAH8BAAABAAAAAAAAALAJAACAAQAAgQEAAHgAAAAAAAAAyAkAAMsAAACCAQAAgQAAAHkAAACDAQAAhAEAAIUBAABPAAAAggAAAAAAAADgCQAAywAAAIYBAACDAAAAegAAAIcBAACIAQAAiQEAAFAAAACEAAAAAAAAAPgJAADLAAAAigEAAIUAAAB7AAAAiwEAAIwBAACNAQAAUQAAAIYAAAAAAAAAEAoAAMsAAACOAQAAhwAAAHwAAACPAQAAkAEAAJEBAABSAAAAiAAAAAAAAAAoCgAAywAAAJIBAACJAAAAfQAAAJMBAACUAQAAlQEAAFMAAACKAAAAAAAAAEAKAADLAAAAlgEAAIsAAAB+AAAAlwEAAJgBAACZAQAAVAAAAIwAAAAAAAAAWAoAAMsAAACaAQAAjQAAAH8AAACbAQAAnAEAAJ0BAABVAAAAjgAAAAAAAABwCgAAywAAAJ4BAACPAAAAgAAAAJ8BAACgAQAAoQEAAFYAAACQAAAAAAAAAIgKAAAFAAAAogEAAKMBAABXAAAApAEAAAAAAACYCgAABQAAAKUBAACmAQAAWAAAAKcBAAAAAAAAIAkAAAcBAACoAQAAAQAAAAEAAAABAAAAdwAAAAAAAACoCgAABQAAAKkBAACqAQAAWQAAAKsBAAAAAAAAuAoAAAUAAACsAQAArQEAAFoAAACuAQAAAAAAAMgKAACvAQAAsAEAAJEAAACSAAAAIAAAACEAAAAiAAAAIwAAACQAAAAMAAAADQAAAFsAAACBAAAAAgAAAIIAAACTAAAAXAAAACUAAAAmAAAAgwAAACcAAACEAAAAKAAAACkAAACFAAAAhgAAAA4AAACHAAAAiAAAAA8AAAACAAAAKgAAACsAAAAsAAAALQAAABYAAACUAAAALgAAABAAAAAJAAAAEQAAAAoAAAAXAAAAXQAAAIkAAAAvAAAAAgAAABIAAAATAAAAAwAAAAsAAAAEAAAAAgAAAAwAAAANAAAAFAAAAIoAAAACAAAAFQAAAAAAAADYCgAABQAAALEBAACyAQAAXgAAALMBAAAAAAAAwAkAAIABAAC0AQAAAQAAAGwoAAAFAAAAAAAAAAAAAACVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAGQAAAKC4AAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAMAAAAFAAAABwAAAAsAAAANAAAAEQAAABMAAAAXAAAAHQAAAB8AAAAlAAAAKQAAACsAAAAvAAAANQAAADsAAAA9AAAAQwAAAEcAAABJAAAATwAAAFMAAABZAAAAYQAAAGUAAABnAAAAawAAAG0AAABxAAAAfwAAAIMAAACJAAAAiwAAAJUAAACXAAAAnQAAAKMAAACnAAAArQAAALMAAAC1AAAAvwAAAMEAAADFAAAAxwAAANMAAAABAAAACwAAAA0AAAARAAAAEwAAABcAAAAdAAAAHwAAACUAAAApAAAAKwAAAC8AAAA1AAAAOwAAAD0AAABDAAAARwAAAEkAAABPAAAAUwAAAFkAAABhAAAAZQAAAGcAAABrAAAAbQAAAHEAAAB5AAAAfwAAAIMAAACJAAAAiwAAAI8AAACVAAAAlwAAAJ0AAACjAAAApwAAAKkAAACtAAAAswAAALUAAAC7AAAAvwAAAMEAAADFAAAAxwAAANEAAAACAAAAAAAAAKgLAAC1AQAAtgEAALcBAAC4AQAAGwAAAAMAAAAWAAAADgAAAAAAAADQCwAAtQEAALkBAAC3AQAAuAEAABsAAAAEAAAAFwAAAA8AAAAAAAAA4AsAALoBAAC7AQAAlgAAAAAAAADwCwAAugEAALwBAACWAAAAAAAAACAMAAC1AQAAvQEAALcBAAC4AQAAHAAAAAAAAAAQDAAAtQEAAL4BAAC3AQAAuAEAAB0AAAAAAAAAoAwAALUBAAC/AQAAtwEAALgBAAAeAAAAAAAAALAMAAC1AQAAwAEAALcBAAC4AQAAGwAAAAUAAAAYAAAAEAAAAE4ydmUxMkNyZWF0ZWRBcnJvd0UATjJ2ZTE0SUNyZWF0ZWRPYmplY3RFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTBBcnJvd01vZGVsRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTEwQXJyb3dNb2RlbEVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlOUJsdXJNb2RlbEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTlCbHVyTW9kZWxFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOMnZlMTFDcmVhdGVkQmx1ckUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTEwQnJ1c2hNb2RlbEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTEwQnJ1c2hNb2RlbEVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE4ydmUxMkNyZWF0ZWRCcnVzaEUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTlMaW5lTW9kZWxFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmU5TGluZU1vZGVsRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATjJ2ZTExQ3JlYXRlZExpbmVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmU5T3ZhbE1vZGVsRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlOU92YWxNb2RlbEVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE4ydmUxMUNyZWF0ZWRPdmFsRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMTRSZWN0YW5nbGVNb2RlbEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTE0UmVjdGFuZ2xlTW9kZWxFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOMnZlMTZDcmVhdGVkUmVjdGFuZ2xlRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlOVRleHRNb2RlbEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTlUZXh0TW9kZWxFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOMnZlMTBFZGl0ZWRUZXh0RQBOMnZlMTFJRWRpdGVkVGV4dEUAQWRkUmVtb3ZlQ29tbWFuZEJhc2U6OkFkZFRvU2NlbmUAVGhlIG1vZGVsIGlzIG51bGxwdHIAQWRkUmVtb3ZlQ29tbWFuZEJhc2U6OlJlbW92ZUZyb21TY2VuZQBOMnZlMTZDb21wb3NpdGVDb21tYW5kRQBOMnZlOElDb21tYW5kRQBIaXN0b3J5OjpBZGQAQXR0ZW1wdCB0byBhZGQgYSBudWxscHRyIGNvbW1hbmQAQXR0ZW1wdCB0byBhZGQgYSBjb21tYW5kIGR1cmluZyBVbmRvKCkvUmVkbygpAE5TdDNfXzIxN2JhZF9mdW5jdGlvbl9jYWxsRQBOMnZlN0hpc3RvcnlFAE4ydmU4SUhpc3RvcnlFAEhpc3Rvcnk6OlVuZG8AQXR0ZW1wdCB0byBwZXJmb3JtIFVuZG8oKSB3aGVuIGFub3RoZXIgdW5kby9yZWRvIGlzIGluIHByb2dyZXNzAEhpc3Rvcnk6OlJlZG8AQXR0ZW1wdCB0byBwZXJmb3JtIFJlZG8oKSB3aGVuIGFub3RoZXIgdW5kby9yZWRvIGlzIGluIHByb2dyZXNzAE4ydmUxOU1vZGVsQ2hhbmdlZENvbW1hbmRFAE4ydmUxMU1vdmVDb21tYW5kRQBOMnZlMTRSZW9yZGVyQ29tbWFuZEUATjJ2ZTE4VGV4dENoYW5nZWRDb21tYW5kRQBOMnZlMTNTZWxlY3RlZEJydXNoRQBOMnZlMTVJU2VsZWN0ZWRPYmplY3RFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUxMlNlbGVjdGVkVGV4dEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTEyU2VsZWN0ZWRUZXh0RU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTE3U2VsZWN0ZWRSZWN0YW5nbGVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmUxN1NlbGVjdGVkUmVjdGFuZ2xlRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTEyU2VsZWN0ZWRPdmFsRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTJTZWxlY3RlZE92YWxFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMTNTZWxlY3RlZEJydXNoRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTNTZWxlY3RlZEJydXNoRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTIwU2VsZWN0ZWRMaW5lYXJPYmplY3RJTlMxXzEwQXJyb3dNb2RlbEVMaDFFTGgyRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmUyMFNlbGVjdGVkTGluZWFyT2JqZWN0SU5TMV8xMEFycm93TW9kZWxFTGgxRUxoMkVFRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzRfRUVOU185YWxsb2NhdG9ySVM0X0VFRUUATjJ2ZTIwU2VsZWN0ZWRMaW5lYXJPYmplY3RJTlNfMTBBcnJvd01vZGVsRUxoMUVMaDJFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTIwU2VsZWN0ZWRMaW5lYXJPYmplY3RJTlMxXzlMaW5lTW9kZWxFTGgxRUxoMkVFRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMjBTZWxlY3RlZExpbmVhck9iamVjdElOUzFfOUxpbmVNb2RlbEVMaDFFTGgyRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTNF9FRU5TXzlhbGxvY2F0b3JJUzRfRUVFRQBOMnZlMjBTZWxlY3RlZExpbmVhck9iamVjdElOU185TGluZU1vZGVsRUxoMUVMaDJFRUUATjJ2ZTEyU2VsZWN0ZWRPdmFsRQBOMnZlMTdTZWxlY3RlZFJlY3RhbmdsZUUATjJ2ZTEyU2VsZWN0ZWRUZXh0RQBDYW1lcmFNb3ZlSW5wdXRTdGF0ZTo6T25lQ2xpY2sAQ2FtZXJhTW92ZUlucHV0U3RhdGUATjJ2ZTIwQ2FtZXJhTW92ZUlucHV0U3RhdGVFAE4ydmUxMUlJbnB1dFN0YXRlRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMTBBZGRDb21tYW5kRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTBBZGRDb21tYW5kRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATjJ2ZTEwQWRkQ29tbWFuZEUATjJ2ZTIwQWRkUmVtb3ZlQ29tbWFuZEJhc2VFAENyZWF0ZVdpdGhEcmFnSW5wdXRTdGF0ZTo6RHJhZ1N0YXJ0AFRoZSB0b29sIAAgY2FuJ3QgYmUgY3JlYXRlZCB3aXRoIGRyYWdnaW5nAENhbid0IGNyZWF0ZSBhIG5ldyBzY2VuZSBvYmplY3QATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTE2Q3JlYXRlZFJlY3RhbmdsZUVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTE2Q3JlYXRlZFJlY3RhbmdsZUVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUxMUNyZWF0ZWRPdmFsRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTFDcmVhdGVkT3ZhbEVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUxMkNyZWF0ZWRCcnVzaEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTEyQ3JlYXRlZEJydXNoRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTEyQ3JlYXRlZEFycm93RUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTJDcmVhdGVkQXJyb3dFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMTFDcmVhdGVkQmx1ckVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTExQ3JlYXRlZEJsdXJFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMTFDcmVhdGVkTGluZUVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTExQ3JlYXRlZExpbmVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBDcmVhdGVXaXRoRHJhZ0lucHV0U3RhdGU6Ok9uZUNsaWNrAEludmFsaWQgY2FsbCB0byBPbmVDbGljaygpIGluIHRoaXMgc3RhdGUAQ3JlYXRlV2l0aERyYWdJbnB1dFN0YXRlAE4ydmUyNENyZWF0ZVdpdGhEcmFnSW5wdXRTdGF0ZUUARGVmYXVsdElucHV0U3RhdGUATjJ2ZTE3RGVmYXVsdElucHV0U3RhdGVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUxNkNvbXBvc2l0ZUNvbW1hbmRFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmUxNkNvbXBvc2l0ZUNvbW1hbmRFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMTNSZW1vdmVDb21tYW5kRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTNSZW1vdmVDb21tYW5kRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATjJ2ZTEzUmVtb3ZlQ29tbWFuZEUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTIyQ2hhbmdlSGFzU2hhZG93Q29tbWFuZEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTIyQ2hhbmdlSGFzU2hhZG93Q29tbWFuZEVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE4ydmUyMUNoYW5nZVByb3BlcnR5Q29tbWFuZEliTU5TXzE1SVNlbGVjdGVkT2JqZWN0RUZ2YkVFRQBOMnZlMjJDaGFuZ2VIYXNTaGFkb3dDb21tYW5kRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMjJDaGFuZ2VUaGlja25lc3NDb21tYW5kRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMjJDaGFuZ2VUaGlja25lc3NDb21tYW5kRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATjJ2ZTIxQ2hhbmdlUHJvcGVydHlDb21tYW5kSWZNTlNfMTVJU2VsZWN0ZWRPYmplY3RFRnZmRUVFAE4ydmUyMkNoYW5nZVRoaWNrbmVzc0NvbW1hbmRFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUxOENoYW5nZUNvbG9yQ29tbWFuZEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTE4Q2hhbmdlQ29sb3JDb21tYW5kRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATjJ2ZTIxQ2hhbmdlUHJvcGVydHlDb21tYW5kSU5TXzVDb2xvckVNTlNfMTVJU2VsZWN0ZWRPYmplY3RFRnZSS1MxX0VFRQBOMnZlMThDaGFuZ2VDb2xvckNvbW1hbmRFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUxOU1vZGVsQ2hhbmdlZENvbW1hbmRFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmUxOU1vZGVsQ2hhbmdlZENvbW1hbmRFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMTFNb3ZlQ29tbWFuZEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTExTW92ZUNvbW1hbmRFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBTZWxlY3RlZElucHV0U3RhdGU6OlN0YXJ0TW92ZQBOb3RoaW5nIHRvIG1vdmUAU2VsZWN0ZWRJbnB1dFN0YXRlOjpPbmVDbGljawBUaGUgb2JqZWN0IHdhcyBub3Qgc2VsZWN0ZWQAU2VsZWN0ZWRJbnB1dFN0YXRlAE4ydmUxOFNlbGVjdGVkSW5wdXRTdGF0ZUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTEwRWRpdGVkVGV4dEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTEwRWRpdGVkVGV4dEVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUxNFJlb3JkZXJDb21tYW5kRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTRSZW9yZGVyQ29tbWFuZEVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE4ydmUxMlN0YXRlQ29udGV4dEUATjJ2ZTEzSVN0YXRlQ29udGV4dEUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTIwQ2FtZXJhTW92ZUlucHV0U3RhdGVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmUyMENhbWVyYU1vdmVJbnB1dFN0YXRlRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTE4VGV4dEVkaXRJbnB1dFN0YXRlRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMThUZXh0RWRpdElucHV0U3RhdGVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMThTZWxlY3RlZElucHV0U3RhdGVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmUxOFNlbGVjdGVkSW5wdXRTdGF0ZUVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUyNENyZWF0ZVdpdGhEcmFnSW5wdXRTdGF0ZUVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTI0Q3JlYXRlV2l0aERyYWdJbnB1dFN0YXRlRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTE3RGVmYXVsdElucHV0U3RhdGVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmUxN0RlZmF1bHRJbnB1dFN0YXRlRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUAU3RhdGVDb250ZXh0Ojp2YWxpZABzY2VuZV8gaXMgbnVsbHB0cgBlbmdpbmVfIGlzIG51bGxwdHIAdXVpZF9nZW5lcmF0b3JfIGlzIG51bGxwdHIAdGltZXJfZmFjdG9yeV8gaXMgbnVsbHB0cgBlZGl0b3JfY2FsbGJhY2tzXyBpcyBudWxscHRyAGRlZmF1bHRfc3RhdGVfIGlzIG51bGxwdHIAY3JlYXRlX3dpdGhfZHJhZ19zdGF0ZV8gaXMgbnVsbHB0cgBzZWxlY3RlZF9zdGF0ZV8gaXMgbnVsbHB0cgB0ZXh0X2VkaXRfc3RhdGVfIGlzIG51bGxwdHIAY2FtZXJhX21vdmVfc3RhdGVfIGlzIG51bGxwdHIAVGV4dEVkaXRJbnB1dFN0YXRlAEV4aXQATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTE4VGV4dENoYW5nZWRDb21tYW5kRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMThUZXh0Q2hhbmdlZENvbW1hbmRFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBFbnRlcgBaTjJ2ZTE4VGV4dEVkaXRJbnB1dFN0YXRlMTlTdGFydEN1cnNvckJsaW5raW5nRVJOU18xM0lTdGF0ZUNvbnRleHRFRTMkXzAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4ydmUxOFRleHRFZGl0SW5wdXRTdGF0ZTE5U3RhcnRDdXJzb3JCbGlua2luZ0VSTlMyXzEzSVN0YXRlQ29udGV4dEVFMyRfME5TXzlhbGxvY2F0b3JJUzZfRUVGdnZFRUUATlN0M19fMjEwX19mdW5jdGlvbjZfX2Jhc2VJRnZ2RUVFAE4ydmUxOFRleHRFZGl0SW5wdXRTdGF0ZUUARWRpdG9yOjpTd2l0Y2gAQXR0ZW1wdCB0byBzZXQgYSBudWxscHRyIHN0YXRlAE4ydmU2RWRpdG9yRQBOMnZlMTRJU3RhdGVTd2l0Y2hlckUATjJ2ZTdJRWRpdG9yRQBaTjJ2ZTZFZGl0b3IxN1N1YnNjcmliZVRvRXZlbnRzRXZFMyRfMwBOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjJ2ZTZFZGl0b3IxN1N1YnNjcmliZVRvRXZlbnRzRXZFMyRfM05TXzlhbGxvY2F0b3JJUzRfRUVGdnZFRUUAWk4ydmU2RWRpdG9yMTdTdWJzY3JpYmVUb0V2ZW50c0V2RTMkXzIATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4ydmU2RWRpdG9yMTdTdWJzY3JpYmVUb0V2ZW50c0V2RTMkXzJOU185YWxsb2NhdG9ySVM0X0VFRnZSS05TMl8xME91dHB1dFNpemVFRUVFAE5TdDNfXzIxMF9fZnVuY3Rpb242X19iYXNlSUZ2UktOMnZlMTBPdXRwdXRTaXplRUVFRQBaTjJ2ZTZFZGl0b3IxN1N1YnNjcmliZVRvRXZlbnRzRXZFMyRfMQBOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjJ2ZTZFZGl0b3IxN1N1YnNjcmliZVRvRXZlbnRzRXZFMyRfMU5TXzlhbGxvY2F0b3JJUzRfRUVGdlJLTlMyXzlUZXh0TW9kZWxFUmJSTlMyXzlSZWN0YW5nbGVFRUVFAE5TdDNfXzIxMF9fZnVuY3Rpb242X19iYXNlSUZ2UktOMnZlOVRleHRNb2RlbEVSYlJOUzJfOVJlY3RhbmdsZUVFRUUAWk4ydmU2RWRpdG9yMTdTdWJzY3JpYmVUb0V2ZW50c0V2RTMkXzAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4ydmU2RWRpdG9yMTdTdWJzY3JpYmVUb0V2ZW50c0V2RTMkXzBOU185YWxsb2NhdG9ySVM0X0VFRnZ2RUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmUxNUVkaXRvckNhbGxiYWNrc0VFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTE1RWRpdG9yQ2FsbGJhY2tzRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUARWRpdG9yOjp2YWxpZABSZW5kZXJpbmcgZW5naW5lIGlzIG51bGxwdHIAU2NlbmUgaXMgbnVsbHB0cgBVVUlEIGdlbmVyYXRvciBpcyBudWxscHRyAEVkaXRvciBjYWxsYmFja3MgaXMgbnVsbHB0cgBNZWFzdXJlcyBhcmUgbm90IHZhbGlkAENvbnRleHQgaXMgbm90IHZhbGlkAENyZWF0ZUVkaXRvcgBUaGUgZWRpdG9yIGlzIG51bGxwdHIgb3Igbm90IHZhbGlkAENhbid0IGluaXRpYWxpemUgdGhlIGVkaXRvcgBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlNkVkaXRvckVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTZFZGl0b3JFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOMnZlOE1lYXN1cmVzRQBOMnZlMTRJU3RhdGVNZWFzdXJlc0UATjJ2ZTlJTWVhc3VyZXNFAE1lYXN1cmVzOjp2YWxpZABvdXRwdXRfc2l6ZV8gaXMgbm90IHZhbGlkAGZyYW1lX3JlY3RfIGlzIGVtcHR5AE1lYXN1cmVzOjpTZXRGcmFtZVJlY3QAQ2FuJ3Qgc2V0IGFuIGVtcHR5IGZyYW1lIHJlY3QATjJ2ZTE0SUltYWdlUmVjZWl2ZXJFAE4ydmU2b3BlbmdsMThEZWZhdWx0RnJhbWVCdWZmZXJFAE4ydmU2b3BlbmdsMTJJRnJhbWVCdWZmZXJFAE4ydmU2b3BlbmdsMTFGcmFtZUJ1ZmZlckUATjJ2ZTZvcGVuZ2wxNklPZmZzY3JlZW5CdWZmZXJFAE4ydmU2b3BlbmdsOElUZXh0dXJlRQBGcmFtZUJ1ZmZlcjo6Q3JlYXRlRnJhbWVCdWZmZXIAQXR0ZW1wdCB0byBjcmVhdGUgYSBmcmFtZWJ1ZmZlciB3aXRoIHplcm8gZGltZW5zaW9ucwBUaGUgY3JlYXRlZCBmcmFtZWJ1ZmZlciBpcyBpbmNvbXBsZXRlLiBTdGF0dXM6IABTaXplOiAAIHggAE9wZW5HTEJ1ZmZlcnM6OnZhbGlkAGVudmlyb25tZW50XyBpcyBudWxscHRyAGRlZmF1bHRfYnVmZmVyXyBpcyBudWxscHRyIG9yIG5vdCB2YWxpZABiYWNrX2J1ZmZlcl8gaXMgbnVsbHB0ciBvciBub3QgdmFsaWQAaGl0X2J1ZmZlcl8gaXMgbnVsbHB0ciBvciBub3QgdmFsaWQATjJ2ZTZvcGVuZ2wxM09wZW5HTEJ1ZmZlcnNFAE4ydmU2b3BlbmdsMTlJQ29udGV4dExvc3NIYW5kbGVyRQBOMnZlNm9wZW5nbDE0SU9wZW5HTEJ1ZmZlcnNFAE4ydmU2b3BlbmdsN0lCaXRtYXBFAE4ydmU2b3BlbmdsMTVJQml0bWFwRnJhZ21lbnRFAE4ydmU2b3BlbmdsMTVJQml0bWFwUHJvdmlkZXJFAAp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbjsKdW5pZm9ybSBtYXQ0IHZpZXdfbW9kZWw7CgphdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjsKYXR0cmlidXRlIHZlYzIgdGV4dHVyZV9jb29yZDsKCnZhcnlpbmcgdmVjMiBvdXRfdGV4dHVyZV9jb29yZDsKdmFyeWluZyB2ZWM0IG91dF9zY3JlZW5fY29vcmQ7Cgp2b2lkIG1haW4odm9pZCkKewogICAgb3V0X3RleHR1cmVfY29vcmQgPSB0ZXh0dXJlX2Nvb3JkOwoKICAgIHZlYzQgcG9zID0gdmVjNChwb3NpdGlvbiwgMC4wLCAxLjApOwogICAgb3V0X3NjcmVlbl9jb29yZCA9IHZpZXdfbW9kZWwgKiBwb3M7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb24gKiB2aWV3X21vZGVsICogcG9zOwp9CgAKI2lmbmRlZiBHTF9FUwojZGVmaW5lIGhpZ2hwCiNkZWZpbmUgbWVkaXVtcAojZGVmaW5lIGxvd3AKI2VuZGlmCgp1bmlmb3JtIHNhbXBsZXIyRCBzYW1wbGVyOwp1bmlmb3JtIG1lZGl1bXAgZmxvYXQgYmx1cl9zaXplOyAgICAvLyB0aGUgc2l6ZSBvZiB0aGUgYmx1ciBzcXVhcmUsIGluIHNjcmVlbiBjb29yZGluYXRlcwp1bmlmb3JtIG1lZGl1bXAgdmVjMiB3aW5kb3dfc2l6ZTsgICAvLyB0aGUgc2l6ZSBvZiB0aGUgb3V0cHV0IHdpbmRvdwp1bmlmb3JtIG1lZGl1bXAgdmVjMiBkaXI7ICAgICAgICAgICAvLyB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvZmZzZXQgKDEuMCwgMC4wKSAtIGhvcml6b250YWwsICgwLjAsIDEuMCkgLSB2ZXJ0aWNhbAoKdmFyeWluZyBtZWRpdW1wIHZlYzIgb3V0X3RleHR1cmVfY29vcmQ7CnZhcnlpbmcgbWVkaXVtcCB2ZWM0IG91dF9zY3JlZW5fY29vcmQ7Cgp2b2lkIG1haW4odm9pZCkKewogICAgLy8gRGV0ZWN0IHRoZSBzdGFydGluZyBwb2ludCBpbiBzY3JlZW4gY29vcmRpbmF0ZXMgZm9yIHRoZSBibHVyIHNxdWFyZQogICAgbWVkaXVtcCBmbG9hdCByb3VuZGVkX2JsdXJfc2l6ZSA9IGZsb29yKGJsdXJfc2l6ZSArIDAuNSk7CiAgICBtZWRpdW1wIGZsb2F0IHhfc3RhcnQgPSBmbG9vcihvdXRfc2NyZWVuX2Nvb3JkLnggLyByb3VuZGVkX2JsdXJfc2l6ZSkgKiByb3VuZGVkX2JsdXJfc2l6ZTsKICAgIG1lZGl1bXAgZmxvYXQgeV9zdGFydCA9IGZsb29yKG91dF9zY3JlZW5fY29vcmQueSAvIHJvdW5kZWRfYmx1cl9zaXplKSAqIHJvdW5kZWRfYmx1cl9zaXplOwoKICAgIC8vIEluaXRpYWxseSBubyBjb2xvcgogICAgbWVkaXVtcCB2ZWM0IGNvbG9yID0gdmVjNCgwLjAsIDAuMCwgMC4wLCAwLjApOwoKICAgIC8vIFNpZ25zIGZvciBibHVyIGRpcmVjdGlvbnMKICAgIG1lZGl1bXAgZmxvYXQgc3ggPSBzaWduKGRpci54KTsKICAgIG1lZGl1bXAgZmxvYXQgc3kgPSBzaWduKGRpci55KTsKCiAgICAvLyBTdGVwcyBpbiB0ZXh0dXJlIGNvb3JkaW5hdGVzLCBmb3IgdGV4dHVyZSBsb29rdXAKICAgIG1lZGl1bXAgZmxvYXQgeF90ZXhfc3RlcCA9IDEuMCAvIHdpbmRvd19zaXplLng7CiAgICBtZWRpdW1wIGZsb2F0IHlfdGV4X3N0ZXAgPSAxLjAgLyB3aW5kb3dfc2l6ZS55OwoKICAgIC8qCiAgICAgKiBTdGFydCBwb3NpdGlvbnMgaW4gdGV4dHVyZSBjb29yZGluYXRlczoKICAgICAqICAtIGlmIHRoaXMgaXMgYmx1ciBkaXJlY3Rpb24gLSBzdGFydCBvZiB0aGUgYmx1ciBzcXVhcmUsCiAgICAgKiAgLSBpZiB0aGlzIGlzIG5vdCBibHVyIGRpcmVjdGlvbiAtIHRleHR1cmUgY29vcmRpbmF0ZSBmb3IgdGhpcyBwb2ludAogICAgICovCiAgICBtZWRpdW1wIGZsb2F0IHhfdGV4X3N0YXJ0ID0gc3ggKiB4X3N0YXJ0ICogeF90ZXhfc3RlcCArICgxLjAgLSBzeCkgKiBvdXRfdGV4dHVyZV9jb29yZC54OwogICAgbWVkaXVtcCBmbG9hdCB5X3RleF9zdGFydCA9IHN5ICogeV9zdGFydCAqIHlfdGV4X3N0ZXAgKyAoMS4wIC0gc3kpICogb3V0X3RleHR1cmVfY29vcmQueTsKCiAgICBmb3IgKG1lZGl1bXAgZmxvYXQgaSA9IDAuMDsgaSA8IDQwLjA7IGkrKykgeyAgLy8gdGhlIHVwcGVyIGxpbWl0IG11c3QgYmUgY29uc3RhbnQKICAgICAgICBpZiAoaSA8IHJvdW5kZWRfYmx1cl9zaXplKSB7CiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50IG9uIHRoZSB0ZXh0dXJlCiAgICAgICAgICAgIG1lZGl1bXAgdmVjMiB0ZXggPSB2ZWMyKHhfdGV4X3N0YXJ0ICsgaSAqIHhfdGV4X3N0ZXAgKiBzeCwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeV90ZXhfc3RhcnQgKyBpICogeV90ZXhfc3RlcCAqIHN5KTsKCiAgICAgICAgICAgIC8vIEFjY3VtdWxhdGUgdGhlIGNvbG9yCiAgICAgICAgICAgIGNvbG9yICs9IHRleHR1cmUyRChzYW1wbGVyLCB0ZXgpOwogICAgICAgIH0KICAgIH0KCiAgICBnbF9GcmFnQ29sb3IgPSBjb2xvciAvIHJvdW5kZWRfYmx1cl9zaXplOwp9CgB2aWV3X21vZGVsAGJsdXJfc2l6ZQBkaXIAd2luZG93X3NpemUACnVuaWZvcm0gbWF0NCBwdm07CgphdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjsKYXR0cmlidXRlIGZsb2F0IGFscGhhOwoKdmFyeWluZyBmbG9hdCBvdXRfYWxwaGE7Cgp2b2lkIG1haW4odm9pZCkKewogICAgb3V0X2FscGhhID0gYWxwaGE7CgogICAgdmVjNCBwb3MgPSB2ZWM0KHBvc2l0aW9uLCAwLjAsIDEuMCk7CiAgICBnbF9Qb3NpdGlvbiA9IHB2bSAqIHBvczsKfQoACnVuaWZvcm0gbWF0NCBwdm07CnVuaWZvcm0gdmVjMiBwMDsKdW5pZm9ybSB2ZWMyIHAxOwp1bmlmb3JtIHZlYzIgcDI7CnVuaWZvcm0gdmVjMiBwMzsKdW5pZm9ybSBmbG9hdCBhYV9vZmZzZXQ7CnVuaWZvcm0gZmxvYXQgc3RhcnRfdGhpY2tuZXNzOwp1bmlmb3JtIGZsb2F0IGVuZF90aGlja25lc3M7CgphdHRyaWJ1dGUgZmxvYXQgdDsKYXR0cmlidXRlIGZsb2F0IG5vcm1hbF9kaXJlY3Rpb247CmF0dHJpYnV0ZSBmbG9hdCBoYXNfYWE7Cgp2YXJ5aW5nIGZsb2F0IG91dF9hbHBoYTsKCnZvaWQgbWFpbih2b2lkKQp7CiAgICBvdXRfYWxwaGEgPSAxLjAgLSBzaWduKGhhc19hYSk7CgogICAgZmxvYXQgdHQgPSB0ICogdDsKICAgIGZsb2F0IHR0dCA9IHR0ICogdDsKICAgIGZsb2F0IGl0ID0gMS4wIC0gdDsKICAgIGZsb2F0IGl0aXQgPSBpdCAqIGl0OwogICAgZmxvYXQgaXRpdGl0ID0gaXRpdCAqIGl0OwoKICAgIHZlYzIgcCA9IGl0aXRpdCAqIHAwICsgMy4wICogaXRpdCAqIHQgKiBwMSArIDMuMCAqIGl0ICogdHQgKiBwMiArIHR0dCAqIHAzOwogICAgdmVjMiB0YW5nZW50ID0gMy4wICogaXRpdCAqIChwMSAtIHAwKSArIDYuMCAqIGl0ICogdCAqIChwMiAtIHAxKSArIDMuMCAqIHR0ICogKHAzIC0gcDIpOwogICAgdmVjMiBub3JtYWwgPSBub3JtYWxpemUodmVjMigtdGFuZ2VudC55LCB0YW5nZW50LngpKTsKICAgIGZsb2F0IHRoaWNrbmVzcyA9IG1peChzdGFydF90aGlja25lc3MsIGVuZF90aGlja25lc3MsIHQpOwoKICAgIHZlYzQgcG9zID0gdmVjNChwICsgbm9ybWFsICogbm9ybWFsX2RpcmVjdGlvbiAqICh0aGlja25lc3MgLyAyLjAgKyBzaWduKGhhc19hYSkgKiBhYV9vZmZzZXQpLCAwLjAsIDEuMCk7CiAgICBnbF9Qb3NpdGlvbiA9IHB2bSAqIHBvczsKfQoAcDMAT3BlbkdMUHJvZ3JhbXM6OnZhbGlkAFByb2dyYW0gIwAgaXMgbm90IHZhbGlkAE4ydmU2b3BlbmdsMTJSb3VuZFByb2dyYW1FAE4ydmU2b3BlbmdsN1Byb2dyYW1FAE4ydmU2b3BlbmdsMTRPcGVuR0xQcm9ncmFtc0UATjJ2ZTZvcGVuZ2wxNUlPcGVuR0xQcm9ncmFtc0UAUHJvZ3JhbTo6TGlua1Byb2dyYW0AQ2FuJ3QgY3JlYXRlIHByb2dyYW0AQ2FuJ3QgbGluayBwcm9ncmFtOiAACnVuaWZvcm0gbWF0NCBwdm07CnVuaWZvcm0gdmVjMiBwMDsKdW5pZm9ybSB2ZWMyIHAxOwp1bmlmb3JtIHZlYzIgcDI7CnVuaWZvcm0gZmxvYXQgYWFfb2Zmc2V0Owp1bmlmb3JtIGZsb2F0IHN0YXJ0X3RoaWNrbmVzczsKdW5pZm9ybSBmbG9hdCBlbmRfdGhpY2tuZXNzOwoKYXR0cmlidXRlIGZsb2F0IHQ7CmF0dHJpYnV0ZSBmbG9hdCBub3JtYWxfZGlyZWN0aW9uOwphdHRyaWJ1dGUgZmxvYXQgaGFzX2FhOwoKdmFyeWluZyBmbG9hdCBvdXRfYWxwaGE7Cgp2b2lkIG1haW4odm9pZCkKewogICAgb3V0X2FscGhhID0gMS4wIC0gc2lnbihoYXNfYWEpOwoKICAgIGZsb2F0IHR0ID0gdCAqIHQ7CiAgICBmbG9hdCBpdCA9IDEuMCAtIHQ7CiAgICBmbG9hdCBpdGl0ID0gaXQgKiBpdDsKCiAgICB2ZWMyIHAgPSBpdGl0ICogcDAgKyAyLjAgKiB0ICogaXQgKiBwMSArIHR0ICogcDI7CiAgICB2ZWMyIHRhbmdlbnQgPSBpdCAqIChwMSAtIHAwKSArIHQgKiAocDIgLSBwMSk7CiAgICB2ZWMyIG5vcm1hbCA9IG5vcm1hbGl6ZSh2ZWMyKC10YW5nZW50LnksIHRhbmdlbnQueCkpOwogICAgZmxvYXQgdGhpY2tuZXNzID0gbWl4KHN0YXJ0X3RoaWNrbmVzcywgZW5kX3RoaWNrbmVzcywgdCk7CgogICAgdmVjNCBwb3MgPSB2ZWM0KHAgKyBub3JtYWwgKiBub3JtYWxfZGlyZWN0aW9uICogKHRoaWNrbmVzcyAvIDIuMCArIHNpZ24oaGFzX2FhKSAqIGFhX29mZnNldCksIDAuMCwgMS4wKTsKICAgIGdsX1Bvc2l0aW9uID0gcHZtICogcG9zOwp9CgAKI2lmbmRlZiBHTF9FUwojZGVmaW5lIGhpZ2hwCiNkZWZpbmUgbWVkaXVtcAojZGVmaW5lIGxvd3AKI2VuZGlmCgp1bmlmb3JtIG1lZGl1bXAgdmVjNCBjb2xvcjsKCnZhcnlpbmcgbWVkaXVtcCBmbG9hdCBvdXRfYWxwaGE7Cgp2b2lkIG1haW4odm9pZCkKewogICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvci54eXosIGNvbG9yLncgKiBvdXRfYWxwaGEpOwp9CgBwMABwMQBwMgBzdGFydF90aGlja25lc3MAZW5kX3RoaWNrbmVzcwB0AG5vcm1hbF9kaXJlY3Rpb24AaGFzX2FhAAojaWZuZGVmIEdMX0VTCiNkZWZpbmUgaGlnaHAKI2RlZmluZSBtZWRpdW1wCiNkZWZpbmUgbG93cAojZW5kaWYKCnVuaWZvcm0gbWF0NCBwdm07CgphdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjsKCnZhcnlpbmcgdmVjMiBvdXRfcG9zaXRpb247Cgp2b2lkIG1haW4odm9pZCkKewogICAgb3V0X3Bvc2l0aW9uID0gcG9zaXRpb247CgogICAgdmVjNCBwb3MgPSB2ZWM0KHBvc2l0aW9uLCAwLjAsIDEuMCk7CiAgICBnbF9Qb3NpdGlvbiA9IHB2bSAqIHBvczsKfQoACiNpZm5kZWYgR0xfRVMKI2RlZmluZSBoaWdocAojZGVmaW5lIG1lZGl1bXAKI2RlZmluZSBsb3dwCiNlbmRpZgoKdW5pZm9ybSBtZWRpdW1wIGZsb2F0IGFhX29mZnNldDsKdW5pZm9ybSBtZWRpdW1wIGZsb2F0IHJhZGl1czsKdW5pZm9ybSBtZWRpdW1wIHZlYzQgY29sb3I7CnVuaWZvcm0gbWVkaXVtcCB2ZWMyIGNlbnRlcjsKCnZhcnlpbmcgbWVkaXVtcCB2ZWMyIG91dF9wb3NpdGlvbjsKCnZvaWQgbWFpbih2b2lkKQp7CiAgICBtZWRpdW1wIGZsb2F0IGRpc3QgPSBkaXN0YW5jZShjZW50ZXIsIG91dF9wb3NpdGlvbik7CiAgICBtZWRpdW1wIGZsb2F0IGlubmVyX3JhZGl1cyA9IHJhZGl1czsKICAgIG1lZGl1bXAgZmxvYXQgb3V0ZXJfcmFkaXVzID0gcmFkaXVzICsgYWFfb2Zmc2V0OwoKICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sb3IueHl6LCBjbGFtcCgoZGlzdCAtIG91dGVyX3JhZGl1cykgLyAoaW5uZXJfcmFkaXVzIC0gb3V0ZXJfcmFkaXVzKSwgMC4wLCAxLjApICogY29sb3Iudyk7Cn0KAGFhX29mZnNldAByYWRpdXMAY2VudGVyAAp1bmlmb3JtIG1hdDQgcHJvamVjdGlvbjsKdW5pZm9ybSBmbG9hdCBvZmZzZXQ7CgphdHRyaWJ1dGUgdmVjMiBwb3NpdGlvbjsKYXR0cmlidXRlIHZlYzIgb2Zmc2V0X2RpcjsKCnZhcnlpbmcgdmVjMiBvdXRfcG9zOwoKdm9pZCBtYWluKHZvaWQpCnsKICAgIHZlYzIgcG9zaXRpb25fd2l0aF9vZmZzZXQgPSBwb3NpdGlvbiArIG9mZnNldF9kaXIgKiBvZmZzZXQ7CiAgICBvdXRfcG9zID0gcG9zaXRpb25fd2l0aF9vZmZzZXQ7CgogICAgdmVjNCBwb3MgPSB2ZWM0KHBvc2l0aW9uX3dpdGhfb2Zmc2V0LCAwLjAsIDEuMCk7CiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb24gKiBwb3M7Cn0KAAojaWZuZGVmIEdMX0VTCiNkZWZpbmUgaGlnaHAKI2RlZmluZSBtZWRpdW1wCiNkZWZpbmUgbG93cAojZW5kaWYKCnVuaWZvcm0gbWVkaXVtcCB2ZWMyIG9yaWdpbjsKdW5pZm9ybSBtZWRpdW1wIGZsb2F0IGRhc2hfc2l6ZTsKdW5pZm9ybSBtZWRpdW1wIGZsb2F0IGRhc2hfc3RlcDsKCnZhcnlpbmcgbWVkaXVtcCB2ZWMyIG91dF9wb3M7Cgp2b2lkIG1haW4odm9pZCkKewogICAgbWVkaXVtcCBmbG9hdCB0ID0gbW9kKChvdXRfcG9zLnggLSBvcmlnaW4ueCkgKyAob3JpZ2luLnkgLSBvdXRfcG9zLnkpICsgZGFzaF9zdGVwICsgMC41LAogICAgICAgICAgICAgICAgICAgICAgICAgIDIuMCAqIGRhc2hfc2l6ZSk7CgogICAgbWVkaXVtcCBmbG9hdCBrID0gY2xhbXAoc2lnbihkYXNoX3NpemUgLSB0KSwgMC4wLCAxLjApOwogICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChrLCBrLCBrLCAxLjApOwp9CgBwcm9qZWN0aW9uAG9mZnNldABvcmlnaW4AZGFzaF9zaXplAGRhc2hfc3RlcABvZmZzZXRfZGlyAFNoYWRlcjo6Q29tcGlsZVNoYWRlcgBDYW4ndCBjcmVhdGUgc2hhZGVyAENhbid0IGNvbXBpbGUgc2hhZGVyOiAACiNpZm5kZWYgR0xfRVMKI2RlZmluZSBoaWdocAojZGVmaW5lIG1lZGl1bXAKI2RlZmluZSBsb3dwCiNlbmRpZgoKdW5pZm9ybSBzYW1wbGVyMkQgc2FtcGxlcjsKdW5pZm9ybSBtZWRpdW1wIHZlYzQgY29sb3I7Cgp2YXJ5aW5nIG1lZGl1bXAgdmVjMiBvdXRfdGV4dHVyZV9jb29yZDsKCnZvaWQgbWFpbih2b2lkKQp7CiAgICBtZWRpdW1wIGZsb2F0IGFscGhhID0gdGV4dHVyZTJEKHNhbXBsZXIsIG91dF90ZXh0dXJlX2Nvb3JkKS5hOwogICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvci5yZ2IsIGNvbG9yLmEgKiBhbHBoYSk7Cn0KAGNvbG9yAAp1bmlmb3JtIG1hdDQgcHZtOwoKYXR0cmlidXRlIHZlYzIgcG9zaXRpb247CmF0dHJpYnV0ZSB2ZWMyIHRleHR1cmVfY29vcmQ7Cgp2YXJ5aW5nIHZlYzIgb3V0X3RleHR1cmVfY29vcmQ7Cgp2b2lkIG1haW4odm9pZCkKewogICAgb3V0X3RleHR1cmVfY29vcmQgPSB0ZXh0dXJlX2Nvb3JkOwoKICAgIHZlYzQgcG9zID0gdmVjNChwb3NpdGlvbiwgMC4wLCAxLjApOwogICAgZ2xfUG9zaXRpb24gPSBwdm0gKiBwb3M7Cn0KAAojaWZuZGVmIEdMX0VTCiNkZWZpbmUgaGlnaHAKI2RlZmluZSBtZWRpdW1wCiNkZWZpbmUgbG93cAojZW5kaWYKCnVuaWZvcm0gc2FtcGxlcjJEIHNhbXBsZXI7Cgp2YXJ5aW5nIG1lZGl1bXAgdmVjMiBvdXRfdGV4dHVyZV9jb29yZDsKCnZvaWQgbWFpbih2b2lkKQp7CiAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQoc2FtcGxlciwgb3V0X3RleHR1cmVfY29vcmQpOwp9CgBwdm0AcG9zaXRpb24AdGV4dHVyZV9jb29yZABBcnJvd1JlbmRlcmVyOjp2YWxpZABBcnJvd1JlbmRlcmVyOjpEcmF3QXJyb3cAQ2FuJ3Qgc2V0IHVwIHRoZSBpbmRleCBidWZmZXIAQ2FuJ3QgcHJlcGFyZSBwb2ludCBmb3IgYW4gYXJyb3cAQXJyb3dSZW5kZXJlcjo6UHJlcGFyZVBvaW50cwBDYW4ndCBzZXR1cCB2ZXJ0aWNlcwAnYnVmZmVyIGRhdGEnAFZibzo6SXNPawBBdCBzdGVwIAAgZXJyb3I6IAAnYmluZCBidWZmZXInAB4fFRITCgsIAgMEDhEQGRgbIQECBwgEBQ4NFBMJCg8QGhkWFSAfGxwhIgMCAQAFBB4fICMiIRITFBcWFRgZGh0cGwsKCQYHCBEODQwPEEFycm93UmVuZGVyZXI6OkRyYXdBcnJvd0hpdERyYWZ0AENhbid0IHNldCB1cCB0aGUgaGl0IGluZGV4IGJ1ZmZlcgBDYW4ndCBwcmVwYXJlIGhpdCBwb2ludHMAAAECAwQFBkJpdG1hcFJlbmRlcmVyOjp2YWxpZABiaXRtYXBfcHJvdmlkZXJfIGlzIG51bGxwdHIAQml0bWFwUmVuZGVyZXI6OkRyYXdCaXRtYXAAVGhlIGJpdG1hcCAAIGlzIG5vdCBmb3VuZABDYW4ndCByZW5kZXIgYW4gaW1hZ2Ugd2l0aCB6ZXJvIGRpbWVuc2lvbnMAQ2FuJ3QgcmVuZGVyIGEgYml0bWFwIHdpdGggemVybyBkaW1lbnNpb25zAEEgZnJhZ21lbnQgb2YgdGhlIGJpdG1hcCAAIGlzIHVuZXhwZWN0ZWRseSBudWxscHRyAEJpdG1hcFJlbmRlcmVyOjpSZW5kZXJGcmFnbWVudABGYWlsZWQgdG8gc2V0IGEgdmVydGV4IGJ1ZmZlcgBDYW4ndCBiaW5kIHRoZSBmcmFnbWVudCB0ZXh0dXJlAEJsdXJSZW5kZXJlcjo6dmFsaWQAQmx1clJlbmRlcmVyOjpQcmVwYXJlQnVmZmVyAEJsdXJSZW5kZXJlcjo6RHJhd0JsdXIAQnJ1c2hSZW5kZXJlcjo6dmFsaWQAcHJvZ3JhbXNfIGlzIG51bGxwdHIAQnJ1c2hSZW5kZXJlcjo6RHJhd0JydXNoAENhbid0IGZpbmQgb3IgY3JlYXRlIEJlemllclNlZ21lbnRzIG9iamVjdABCcnVzaFJlbmRlcmVyOjpSZW5kZXJSb3VuZGVkUGFydABCcnVzaFJlbmRlcmVyOjpSZW5kZXIAQnJ1c2hSZW5kZXJlcjo6RmluZFNlZ21lbnRzAENhbid0IGluc2VydCBCcnVzaFNlZ21lbnRzIG9iamVjdCBmb3IgAEJydXNoUmVuZGVyZXI6OkRyYXdCcnVzaEhpdERyYWZ0AER1cGxpY2F0b3I6OnZhbGlkAER1cGxpY2F0b3I6OkR1cGxpY2F0ZQBDYW4ndCBzZXR1cCBWQk9zAEZyYW1lUmVjdFJlbmRlcmVyOjp2YWxpZABGcmFtZVJlY3RSZW5kZXJlcjo6RHJhd0ZyYW1lUmVjdABMaW5lUmVuZGVyZXI6OnZhbGlkAExpbmVSZW5kZXJlcjo6RHJhd0xpbmUAAAECAwQFBgcIAAkGAQoHC0xpbmVSZW5kZXJlcjo6RHJhd0xpbmVIaXREcmFmdABNYXJrZXJSZW5kZXJlcjo6dmFsaWQATWFya2VyUmVuZGVyZXI6OkRyYXdNYXJrZXIATWFya2VyUmVuZGVyZXI6OkRyYXdNYXJrZXJIaXREcmFmdABDYW4ndCBzZXR1cCBoaXQgdmVydGV4IGJ1ZmZlcgBPdmFsUmVuZGVyZXI6OnZhbGlkAE92YWxSZW5kZXJlcjo6RHJhd092YWwAT3ZhbFJlbmRlcmVyOjpEcmF3T3ZhbEhpdERyYWZ0AFJlY3RhbmdsZVJlbmRlcmVyOjp2YWxpZABSZWN0YW5nbGVSZW5kZXJlcjo6RHJhd1JlY3RhbmdsZQBDYW4ndCBzZXR1cCB0aGUgdmVydGV4IGJ1ZmZlcgBDYW4ndCBzZXR1cCB0aGUgaW5kZXggYnVmZmVyAAIRAA8DEwcCBQAIBAcMBQoJDQwRCg8OEgADBAEGCAkFDQoLDg8TEhBSZWN0YW5nbGVSZW5kZXJlcjo6RHJhd1JlY3RhbmdsZUhpdERyYWZ0AAABAgMEBQYHAAFSZW5kZXJlcnM6OnZhbGlkAGFycm93X3JlbmRlcmVyIGlzIG5vdCB2YWxpZABiaXRtYXBfcmVuZGVyZXIgaXMgbm90IHZhbGlkAGJsdXJfcmVuZGVyZXIgaXMgbm90IHZhbGlkAGJydXNoX3JlbmRlcmVyIGlzIG5vdCB2YWxpZABkdXBsaWNhdG9yIGlzIG5vdCB2YWxpZABmcmFtZV9yZWN0X3JlbmRlcmVyIGlzIG5vdCB2YWxpZABsaW5lX3JlbmRlcmVyIGlzIG5vdCB2YWxpZABtYXJrZXJfcmVuZGVyZXIgaXMgbm90IHZhbGlkAHNlbGVjdGlvbl9mcmFtZV9yZW5kZXJlciBpcyBub3QgdmFsaWQAb3ZhbF9yZW5kZXJlciBpcyBub3QgdmFsaWQAcmVjdGFuZ2xlX3JlbmRlcmVyIGlzIG5vdCB2YWxpZABTZWxlY3Rpb25GcmFtZVJlbmRlcmVyOjp2YWxpZABwcm9nc18gaXMgbnVsbHB0cgBTZWxlY3Rpb25GcmFtZVJlbmRlcmVyOjpEcmF3U2VsZWN0aW9uRnJhbWUAVGV4dEN1cnNvclBvc2l0aW9uczo6R2V0Q3Vyc29yTGVmdABUaGUgY3VycmVudCBwb3NpdGlvbiAAIGV4Y2VlZHMgdGhlIHRvdGFsIGNvdW50IG9mIGN1cnNvciBjb29yZGluYXRlcyAAVGV4dEN1cnNvclBvc2l0aW9uczo6R2V0Q3Vyc29yVXBPckRvd24AVGV4dFJlbmRlcmVyOjpEcmF3VGV4dABDYW4ndCBnZXQgdGhlIHR5cGVzZXQgZm9yIHRoZSBtb2RlbCAAQ2FuJ3Qgc2V0dXAgaW5kZXggYnVmZmVyAFRleHRSZW5kZXJlcjo6UmVuZGVyRnJhZ21lbnRzAFRoZSB0ZXh0IGZyYWdtZW50IGlzIHVuZXhwZWN0ZWRseSBudWxscHRyAFRleHRSZW5kZXJlcjo6UmVuZGVyRnJhZ21lbnQAQ2FuJ3Qgc2V0dXAgdmVydGV4IGJ1ZmZlcgBUZXh0UmVuZGVyZXI6OkRyYXdUZXh0SGl0RHJhZnQAVGV4dFJlbmRlcmVyOjpSZW5kZXJIaXRGcmFnbWVudABDYW4ndCBzZXQgdmVydGV4IGJ1ZmZlciBmb3IgdGhlIGhpdCBkcmFmdABUZXh0UmVuZGVyZXI6OkRyYXdDdXJzb3IAQ2FuJ3QgZ2V0IHR5cGVzZXQgZm9yIHRoZSBtb2RlbCAAVGhlIHBvc2l0aW9uIAAgZXhjZWVkcyB0aGUgbnVtYmVyIG9mIHBvc2l0aW9ucyAAQ2FuJ3QgcmVuZGVyIGN1cnNvcgBUZXh0UmVuZGVyZXI6OlJlbmRlckN1cnNvcldpdGhDb2xvcgBUZXh0UmVuZGVyZXI6OkdldEJvdW5kaW5nUmVjdGFuZ2xlAFRleHRSZW5kZXJlcjo6TW92ZUN1cnNvcgBUZXh0UmVuZGVyZXI6OkZpbmRDdXJzb3JQb3NpdGlvbkZvclBvaW50AFR5cGVzZXRDYWNoZTo6Q3JlYXRlVHlwZXNldABDYW4ndCBjcmVhdGUgYSB0eXBlc2V0IGZvciB0aGUgbW9kZWwgAFJlbmRlcmluZ1NjZW5hcmlvOjp2YWxpZAByZW5kZXJlcnNfIGlzIG51bGxwdHIAUmVuZGVyaW5nU2NlbmFyaW86OlJlbmRlck1vZGVsAFVuZXhwZWN0ZWQgbW9kZWwgdHlwZQBOMnZlNm9wZW5nbDhCbGVuZGluZ0UATjJ2ZTZvcGVuZ2w5SUJsZW5kaW5nRQBCbGVuZGluZzo6dmFsaWQAZW52XyBpcyBudWxscHRyAE4ydmU2b3BlbmdsMTRFeHBvcnRNZWFzdXJlc0UATjJ2ZTZvcGVuZ2wxN09wZW5HTEVudmlyb25tZW50RQBOMnZlNm9wZW5nbDE4SU9wZW5HTEVudmlyb25tZW50RQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlNm9wZW5nbDExRW1wdHlPcGVuR0xFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmU2b3BlbmdsMTFFbXB0eU9wZW5HTEVOU18xNGRlZmF1bHRfZGVsZXRlSVMzX0VFTlNfOWFsbG9jYXRvcklTM19FRUVFAE4ydmU2b3BlbmdsMTFFbXB0eU9wZW5HTEUATjJ2ZTZvcGVuZ2w3SU9wZW5HTEUAT3BlbkdMRW52aXJvbm1lbnQ6OnZhbGlkAGdsXyBvciByZWFsX2dsXyBpcyBudWxscHRyAGVtcHR5X2dsXyBpcyBudWxscHRyAE9wZW5HTFJlbmRlcmluZ0VuZ2luZTo6SGl0VGVzdABUaGUgaGl0IGJ1ZmZlciBpcyBub3QgY29uc2lzdGVudABPcGVuR0xSZW5kZXJpbmdFbmdpbmU6OkV4cG9ydEltYWdlAGJsZW5kaW5nIGlzIG5vdCB2YWxpZABPcGVuR0xSZW5kZXJpbmdFbmdpbmU6OkV4cG9ydE9uZUltYWdlUGFydABDb3B5aW5nIGltYWdlIHBhcnQuIExlZnQ6IAAsIHRvcDogACwgd2lkdGg6IAAsIGhlaWdodDogAEltYWdlIHJlY2VpdmVyIGhhc24ndCBwcm92aWRlZCBhIGJ1ZmZlciBmb3IgdGhlIGltYWdlIHBhcnQAT3BlbkdMUmVuZGVyaW5nRW5naW5lAEluc3VmZmljaWVudCBidWZmZXIAT3BlbkdMUmVuZGVyaW5nRW5naW5lOjpSZW5kZXIATjJ2ZTZvcGVuZ2wyMU9wZW5HTFJlbmRlcmluZ0VuZ2luZUUATjJ2ZTE2SVJlbmRlcmluZ0VuZ2luZUUATjJ2ZTE4SUN1cnNvclBvc2l0aW9uaW5nRQBaTjJ2ZTZvcGVuZ2wyMU9wZW5HTFJlbmRlcmluZ0VuZ2luZTIzU3Vic2NyaWJlVG9PcGVuR0xFdmVudHNFdkUzJF8xAE9wZW5HTFJlbmRlcmluZ0VuZ2luZTo6Q29udGV4dFJlc3RvcmVkAENvbnRleHQgbG9zcyBoYW5kbGVyICMAIGNvdWxkbid0IHJlY292ZXIATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4ydmU2b3BlbmdsMjFPcGVuR0xSZW5kZXJpbmdFbmdpbmUyM1N1YnNjcmliZVRvT3BlbkdMRXZlbnRzRXZFMyRfMU5TXzlhbGxvY2F0b3JJUzVfRUVGdlJLTlMzXzIzRGVmYXVsdEJ1ZmZlclBhcmFtZXRlcnNFUktOUzJfMTBPdXRwdXRTaXplRVJiRUVFAE5TdDNfXzIxMF9fZnVuY3Rpb242X19iYXNlSUZ2UktOMnZlNm9wZW5nbDIzRGVmYXVsdEJ1ZmZlclBhcmFtZXRlcnNFUktOUzJfMTBPdXRwdXRTaXplRVJiRUVFAFpOMnZlNm9wZW5nbDIxT3BlbkdMUmVuZGVyaW5nRW5naW5lMjNTdWJzY3JpYmVUb09wZW5HTEV2ZW50c0V2RTMkXzAATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk4ydmU2b3BlbmdsMjFPcGVuR0xSZW5kZXJpbmdFbmdpbmUyM1N1YnNjcmliZVRvT3BlbkdMRXZlbnRzRXZFMyRfME5TXzlhbGxvY2F0b3JJUzVfRUVGdnZFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjJ2ZTZvcGVuZ2w5UmVuZGVyZXJzRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlNm9wZW5nbDlSZW5kZXJlcnNFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTM19FRU5TXzlhbGxvY2F0b3JJUzNfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlNm9wZW5nbDE0T3BlbkdMUHJvZ3JhbXNFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmU2b3BlbmdsMTRPcGVuR0xQcm9ncmFtc0VOU18xNGRlZmF1bHRfZGVsZXRlSVMzX0VFTlNfOWFsbG9jYXRvcklTM19FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmU2b3BlbmdsMTNPcGVuR0xCdWZmZXJzRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlNm9wZW5nbDEzT3BlbkdMQnVmZmVyc0VOU18xNGRlZmF1bHRfZGVsZXRlSVMzX0VFTlNfOWFsbG9jYXRvcklTM19FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmU2b3BlbmdsMTdPcGVuR0xFbnZpcm9ubWVudEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTZvcGVuZ2wxN09wZW5HTEVudmlyb25tZW50RU5TXzE0ZGVmYXVsdF9kZWxldGVJUzNfRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAT3BlbkdMUmVuZGVyaW5nRW5naW5lOjp2YWxpZABnbCBpcyBudWxscHRyAGVudl8gaXMgbnVsbHB0ciBvciBub3QgdmFsaWQAYnVmZmVyc18gaXMgbnVsbHB0ciBvciBub3QgdmFsaWQAcHJvZ3JhbXNfIGlzIG51bGxwdHIgb3Igbm90IHZhbGlkAFNvbWUgcmVuZGVyZXJzIGFyZSBub3QgdmFsaWQAZnVsbF9zY2VuYXJpb18gaXMgbnVsbHB0ciBvciBub3QgdmFsaWQAb2Zmc2NyZWVuX3NjZW5hcmlvXyBpcyBudWxscHRyIG9yIG5vdCB2YWxpZABzaG9ydF9zY2VuYXJpb18gaXMgbnVsbHB0ciBvciBub3QgdmFsaWQAQ3JlYXRlT3BlbkdMUmVuZGVyaW5nRW5naW5lAEVuZ2luZSBpcyBudWxscHRyIG9yIG5vdCB2YWxpZABOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlNm9wZW5nbDIxT3BlbkdMUmVuZGVyaW5nRW5naW5lRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlNm9wZW5nbDIxT3BlbkdMUmVuZGVyaW5nRW5naW5lRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzNfRUVOU185YWxsb2NhdG9ySVMzX0VFRUUAU2NlbmU6OlJlY2FsY3VsYXRlRnJhbWVSZWN0AFRoZSBtb2RlbCAAIHdhcyBpZ25vcmVkIHdoZW4gcmVjYWxjdWxhdGluZyB0aGUgZnJhbWUgcmVjdABTY2VuZTo6UmVtb3ZlAENhbid0IGVyYXNlIHRoZSBtb2RlbCAALCBpdCB3YXMgbm90IGZvdW5kAE4ydmU1U2NlbmVFAE4ydmU2SVNjZW5lRQBTY2VuZTo6Q3JlYXRlU2NlbmUAQ2FuJ3QgY3JlYXRlIGJhY2sgaW1hZ2UAQ2FuJ3QgY3JlYXRlIHNjZW5lAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmU1U2NlbmVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE4ydmU1U2NlbmVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlOMnZlMTBJbWFnZU1vZGVsRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBOMnZlMTBJbWFnZU1vZGVsRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUAVmVDb2xvcgByZWQAZ3JlZW4AYmx1ZQBWZUNvbG9yV2l0aEFscGhhAGFscGhhAFZlUG9pbnQAeAB5AFZlU2l6ZQB3aWR0aABoZWlnaHQAVmVXaW5kb3dTaXplAHNjcmVlblNjYWxlRmFjdG9yAFZlVG9vbABMaW5lAEJsdXIAQXJyb3cAQnJ1c2gAT3ZhbABSZWN0YW5nbGUAVGV4dABNb3ZlAFZlVGV4dERpcmVjdGlvbgBMZWZ0VG9SaWdodABSaWdodFRvTGVmdABWZVRleHRJbnB1dENvbW1hbmQAQ29tcGxldGVJbnB1dABOZXdMaW5lAEJhY2tzcGFjZQBEZWxldGUATW92ZUN1cnNvckxlZnQATW92ZUN1cnNvclJpZ2h0AE1vdmVDdXJzb3JVcABNb3ZlQ3Vyc29yRG93bgBWZUluaXRpYWxQYXJhbWV0ZXJzAHNoYXBlQ29sb3IAbGluZVdpZHRoAGFkZFNoYWRvdwB0b29sAHdpbmRvd1NpemUAYmFja2dyb3VuZENvbG9yAGJhY2tCaXRtYXBVdWlkAGJhY2tCaXRtYXBTaXplAGJhc2VUZXh0RGlyZWN0aW9uAFZlRW5naW5lAGNyZWF0ZQBzZXRUb29sAHNldExpbmVXaWR0aABzZXRDb2xvcgBzZXRIb3Jpem9udGFsUG9zaXRpb24Ac2V0VmVydGljYWxQb3NpdGlvbgBjbGlja09uY2UAZHJhZ1N0YXJ0AGRyYWdNb3ZlAGRyYWdFbmQAZHJhZ0xvc3QAYWRkQ2hhcmFjdGVyAHRleHRDb21tYW5kAGV4cG9ydEltYWdlAGNvbnRleHRMb3N0AGNvbnRleHRSZXN0b3JlZAB0aW1lclRpY2sAZGVsZXRlU2hhcGUAZmFpbHVyZVJlYXNvbgBOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRQBOU3QzX18yMjFfX2Jhc2ljX3N0cmluZ19jb21tb25JTGIxRUVFAFBONG1lanM4VmVFbmdpbmVFAE40bWVqczhWZUVuZ2luZUUATjJ2ZTE2VGV4dElucHV0Q29tbWFuZEUATjRtZWpzNVBvaW50RQBpaWlmAGlpaWlmAE40bWVqczEwV2luZG93U2l6ZUUATjRtZWpzNUNvbG9yRQBOMnZlNFRvb2xFAGlpaQBpaWlpAE40bWVqczE3SW5pdGlhbFBhcmFtZXRlcnNFAHZpAHYAaWkAUEtONG1lanM4VmVFbmdpbmVFAHZpaWkATjJ2ZTEzVGV4dERpcmVjdGlvbkUATjRtZWpzNFNpemVFAE40bWVqczE0Q29sb3JXaXRoQWxwaGFFAGkAdmlpZgBmaWkAeyBNb2R1bGUuYml0bWFwRXhwb3J0ZXIucHV0SW1hZ2VQYXJ0KCQwLCAkMSwgJDIsICQzLCAkNCwgJDUpOyB9AHsgcmV0dXJuIE1vZHVsZS5iaXRtYXBFeHBvcnRlci5wcmVwYXJlKCQwLCAkMSk7IH0ATjRtZWpzMTRCaXRtYXBFeHBvcnRlckUAeyByZXR1cm4gTW9kdWxlLmJpdG1hcFByb3ZpZGVyLmdldEJpdG1hcEluZGV4KFBvaW50ZXJfc3RyaW5naWZ5KCQwKSk7IH0AeyByZXR1cm4gTW9kdWxlLmJpdG1hcFByb3ZpZGVyLmdldE51bWJlck9mRnJhZ21lbnRzKCQwKTsgfQB7IHJldHVybiBNb2R1bGUuYml0bWFwUHJvdmlkZXIucXVlcnlGcmFnbWVudENvb3JkaW5hdGVzKCQwLCAkMSk7IH0AeyByZXR1cm4gTW9kdWxlLmJpdG1hcFByb3ZpZGVyLmdldFgoKTsgfQB7IHJldHVybiBNb2R1bGUuYml0bWFwUHJvdmlkZXIuZ2V0WSgpOyB9AHsgcmV0dXJuIE1vZHVsZS5iaXRtYXBQcm92aWRlci5nZXRXaWR0aCgpOyB9AHsgcmV0dXJuIE1vZHVsZS5iaXRtYXBQcm92aWRlci5nZXRIZWlnaHQoKTsgfQB7IHJldHVybiBNb2R1bGUuYml0bWFwUHJvdmlkZXIuZ2V0VVRvcExlZnQoKTsgfQB7IHJldHVybiBNb2R1bGUuYml0bWFwUHJvdmlkZXIuZ2V0VlRvcExlZnQoKTsgfQB7IHJldHVybiBNb2R1bGUuYml0bWFwUHJvdmlkZXIuZ2V0VUJvdHRvbVJpZ2h0KCk7IH0AeyByZXR1cm4gTW9kdWxlLmJpdG1hcFByb3ZpZGVyLmdldFZCb3R0b21SaWdodCgpOyB9AE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU40bWVqczE0Qml0bWFwRnJhZ21lbnRFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE40bWVqczE0Qml0bWFwRnJhZ21lbnRFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQB7IHJldHVybiBNb2R1bGUuYml0bWFwUHJvdmlkZXIuYmluZCgkMCwgJDEpOyB9AE40bWVqczE0Qml0bWFwRnJhZ21lbnRFAHsgcmV0dXJuIE1vZHVsZS5iaXRtYXBQcm92aWRlci5nZXRCaXRtYXBXaWR0aCgkMCk7IH0AeyByZXR1cm4gTW9kdWxlLmJpdG1hcFByb3ZpZGVyLmdldEJpdG1hcEhlaWdodCgkMCk7IH0ATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjRtZWpzNkJpdG1hcEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjRtZWpzNkJpdG1hcEVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE40bWVqczZCaXRtYXBFAHsgTW9kdWxlLmJpdG1hcFByb3ZpZGVyLmhhbmRsZUNvbnRleHRSZXN0b3JlZCgpOyB9AHsgTW9kdWxlLmJpdG1hcFByb3ZpZGVyLmhhbmRsZUNvbnRleHRMb3N0KCk7IH0ATjRtZWpzMTRCaXRtYXBQcm92aWRlckUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjRtZWpzN1R5cGVzZXRFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE40bWVqczdUeXBlc2V0RU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUAeyBNb2R1bGUuYnJvd3NlclR5cGVzZXR0ZXIuaGFuZGxlQ29udGV4dFJlc3RvcmVkKCk7IH0AeyBNb2R1bGUuYnJvd3NlclR5cGVzZXR0ZXIuaGFuZGxlQ29udGV4dExvc3QoKTsgfQBONG1lanMxN0Jyb3dzZXJUeXBlc2V0dGVyRQBOMnZlNm9wZW5nbDExSVR5cGVzZXR0ZXJFAHsgcmV0dXJuIE1vZHVsZS50aW1lckZhY3RvcnkuY3JlYXRlVGltZXIoKTsgfQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONG1lanM1VGltZXJFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE40bWVqczVUaW1lckVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAHsgTW9kdWxlLnRpbWVyRmFjdG9yeS5zdG9wVGltZXIoJDApOyB9AHsgTW9kdWxlLnRpbWVyRmFjdG9yeS5zdGFydFRpbWVyKCQwLCAkMSk7IH0ATjRtZWpzNVRpbWVyRQBOMnZlNklUaW1lckUATjRtZWpzMTJUaW1lckZhY3RvcnlFAE4ydmUxM0lUaW1lckZhY3RvcnlFAHsgTW9kdWxlLmJyb3dzZXJUeXBlc2V0dGVyLmRlbGV0ZVR5cGVzZXQoJDApOyB9AE40bWVqczdUeXBlc2V0RQBOMnZlNm9wZW5nbDhJVHlwZXNldEUAeyByZXR1cm4gTW9kdWxlLmJyb3dzZXJUeXBlc2V0dGVyLmNyZWF0ZVR5cGVzZXQoKTsgfQB7IHZhciB0eXBlc2V0ID0gTW9kdWxlLmJyb3dzZXJUeXBlc2V0dGVyLmdldFR5cGVzZXQoJDApOyBpZiAoIXR5cGVzZXQpIHsgcmV0dXJuIGZhbHNlOyB9IHJldHVybiB0eXBlc2V0LnVwZGF0ZShVVEYzMlRvU3RyaW5nKCQxKSwgJDIsICgkMyA9PT0gMCkgPyAnbHRyJyA6ICdydGwnLCAkNCwgJDUpOyB9AHsgcmV0dXJuIE1vZHVsZS5icm93c2VyVHlwZXNldHRlci5nZXRUeXBlc2V0KCQwKS5nZXRMaW5lSGVpZ2h0KCk7IH0AeyByZXR1cm4gTW9kdWxlLmJyb3dzZXJUeXBlc2V0dGVyLmdldFR5cGVzZXQoJDApLmdldERlc2NlbnQoKTsgfQB7IHJldHVybiBNb2R1bGUuYnJvd3NlclR5cGVzZXR0ZXIuZ2V0VHlwZXNldCgkMCkuZ2V0RnJhZ21lbnRDb3VudCgpOyB9AHsgcmV0dXJuIE1vZHVsZS5icm93c2VyVHlwZXNldHRlci5nZXRUeXBlc2V0KCQwKS5nZXRYQmFzZSgkMSk7IH0AeyByZXR1cm4gTW9kdWxlLmJyb3dzZXJUeXBlc2V0dGVyLmdldFR5cGVzZXQoJDApLmdldFlCYXNlKCQxKTsgfQB7IHJldHVybiBNb2R1bGUuYnJvd3NlclR5cGVzZXR0ZXIuZ2V0VHlwZXNldCgkMCkuZ2V0WE9wcG9zaXRlKCQxKTsgfQB7IHJldHVybiBNb2R1bGUuYnJvd3NlclR5cGVzZXR0ZXIuZ2V0VHlwZXNldCgkMCkuZ2V0WU9wcG9zaXRlKCQxKTsgfQBhbGxvY2F0b3I8VD46OmFsbG9jYXRlKHNpemVfdCBuKSAnbicgZXhjZWVkcyBtYXhpbXVtIHN1cHBvcnRlZCBzaXplAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU40bWVqczEyVGV4dEZyYWdtZW50RUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBONG1lanMxMlRleHRGcmFnbWVudEVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAHsgdmFyIHR5cGVzZXQgPSBNb2R1bGUuYnJvd3NlclR5cGVzZXR0ZXIuZ2V0VHlwZXNldCgkMCk7IGlmICghdHlwZXNldCkgeyByZXR1cm4gZmFsc2U7IH0gaWYgKCQyKSB7IHJldHVybiB0eXBlc2V0LmJpbmRTdHJva2UoJDEpOyB9IGVsc2UgeyByZXR1cm4gdHlwZXNldC5iaW5kTm9ybWFsKCQxKTsgfSB9AE40bWVqczEyVGV4dEZyYWdtZW50RQBOMnZlNm9wZW5nbDEzSVRleHRGcmFnbWVudEUATjRtZWpzMTNVdWlkR2VuZXJhdG9yRQBOMnZlMTRJVXVpZEdlbmVyYXRvckUAeyBNb2R1bGUuaGFuZGxlU2Nyb2xsQ2hhbmdlZCgkMCwgJDEsICQyLCAkMywgJDQsICQ1KTsgfQBaTjRtZWpzOFZlRW5naW5lMjZTdWJzY3JpYmVUb0VkaXRvckNhbGxiYWNrc0V2RTMkXzcAeyBNb2R1bGUuaGFuZGxlRGVsZXRlU2hhcGVTdGF0ZUNoYW5nZWQoZmFsc2UpOyB9AE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpONG1lanM4VmVFbmdpbmUyNlN1YnNjcmliZVRvRWRpdG9yQ2FsbGJhY2tzRXZFMyRfN05TXzlhbGxvY2F0b3JJUzRfRUVGdnZFRUUAWk40bWVqczhWZUVuZ2luZTI2U3Vic2NyaWJlVG9FZGl0b3JDYWxsYmFja3NFdkUzJF82AHsgTW9kdWxlLmhhbmRsZURlbGV0ZVNoYXBlU3RhdGVDaGFuZ2VkKHRydWUpOyB9AE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpONG1lanM4VmVFbmdpbmUyNlN1YnNjcmliZVRvRWRpdG9yQ2FsbGJhY2tzRXZFMyRfNk5TXzlhbGxvY2F0b3JJUzRfRUVGdnZFRUUAWk40bWVqczhWZUVuZ2luZTI2U3Vic2NyaWJlVG9FZGl0b3JDYWxsYmFja3NFdkUzJF81AHsgTW9kdWxlLmhhbmRsZVVuZG9SZWRvU3RhdGVDaGFuZ2VkKCQwLCAkMSk7IH0ATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk40bWVqczhWZUVuZ2luZTI2U3Vic2NyaWJlVG9FZGl0b3JDYWxsYmFja3NFdkUzJF81TlNfOWFsbG9jYXRvcklTNF9FRUZ2dkVFRQBaTjRtZWpzOFZlRW5naW5lMjZTdWJzY3JpYmVUb0VkaXRvckNhbGxiYWNrc0V2RTMkXzQAeyBNb2R1bGUuaGFuZGxlVGV4dElucHV0RW5kZWQoKTsgfQBOU3QzX18yMTBfX2Z1bmN0aW9uNl9fZnVuY0laTjRtZWpzOFZlRW5naW5lMjZTdWJzY3JpYmVUb0VkaXRvckNhbGxiYWNrc0V2RTMkXzROU185YWxsb2NhdG9ySVM0X0VFRnZ2RUVFAFpONG1lanM4VmVFbmdpbmUyNlN1YnNjcmliZVRvRWRpdG9yQ2FsbGJhY2tzRXZFMyRfMwB7IE1vZHVsZS5oYW5kbGVUZXh0SW5wdXRTdGFydGVkKCk7IH0ATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk40bWVqczhWZUVuZ2luZTI2U3Vic2NyaWJlVG9FZGl0b3JDYWxsYmFja3NFdkUzJF8zTlNfOWFsbG9jYXRvcklTNF9FRUZ2dkVFRQBaTjRtZWpzOFZlRW5naW5lMjZTdWJzY3JpYmVUb0VkaXRvckNhbGxiYWNrc0V2RTMkXzIAeyBNb2R1bGUuaGFuZGxlU2hhcGVQYXJhbWV0ZXJzQ2hhbmdlZCgkMCwgJDEsICQyLCAkMywgJDQpOyB9AE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpONG1lanM4VmVFbmdpbmUyNlN1YnNjcmliZVRvRWRpdG9yQ2FsbGJhY2tzRXZFMyRfMk5TXzlhbGxvY2F0b3JJUzRfRUVGdnZFRUUAWk40bWVqczhWZUVuZ2luZTI2U3Vic2NyaWJlVG9FZGl0b3JDYWxsYmFja3NFdkUzJF8xAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpONG1lanM4VmVFbmdpbmUyNlN1YnNjcmliZVRvRWRpdG9yQ2FsbGJhY2tzRXZFMyRfMU5TXzlhbGxvY2F0b3JJUzRfRUVGdnZFRUUAWk40bWVqczhWZUVuZ2luZTI2U3Vic2NyaWJlVG9FZGl0b3JDYWxsYmFja3NFdkUzJF8wAE5TdDNfXzIxMF9fZnVuY3Rpb242X19mdW5jSVpONG1lanM4VmVFbmdpbmUyNlN1YnNjcmliZVRvRWRpdG9yQ2FsbGJhY2tzRXZFMyRfME5TXzlhbGxvY2F0b3JJUzRfRUVGdnZFRUUAQ2FuJ3QgY3JlYXRlIHRoZSBlZGl0b3IuIFJlc3VsdDogAFRoZSBjcmVhdGVkIGVkaXRvciBpcyBudWxscHRyAFRoZSBjcmVhdGVkIHRpbWVyIGZhY3RvcnkgaXMgbnVsbHB0cgBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONG1lanMxMlRpbWVyRmFjdG9yeUVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjRtZWpzMTJUaW1lckZhY3RvcnlFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTMl9FRU5TXzlhbGxvY2F0b3JJUzJfRUVFRQBUaGUgY3JlYXRlZCBPcGVuR0wgaW1wbGVtZW50YXRpb24gaXMgbnVsbHB0cgBUaGUgY3JlYXRlZCBiaXRtYXAgcHJvdmlkZXIgaXMgbnVsbHB0cgBUaGUgY3JlYXRlZCB0eXBlc2V0dGVyIGlzIG51bGxwdHIAQ2FuJ3QgY3JlYXRlIHJlbmRlcmluZyBlbmdpbmUuIFJlc3VsdDogAFRoZSBjcmVhdGVkIHJlbmRlcmluZyBlbmdpbmUgaXMgbnVsbHB0cgBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONG1lanMxN0Jyb3dzZXJUeXBlc2V0dGVyRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBONG1lanMxN0Jyb3dzZXJUeXBlc2V0dGVyRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzJfRUVOU185YWxsb2NhdG9ySVMyX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjRtZWpzMTRCaXRtYXBQcm92aWRlckVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjRtZWpzMTRCaXRtYXBQcm92aWRlckVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU4ydmU2b3BlbmdsMTRTdGFuZGFyZE9wZW5HTEVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjJ2ZTZvcGVuZ2wxNFN0YW5kYXJkT3BlbkdMRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzNfRUVOU185YWxsb2NhdG9ySVMzX0VFRUUATjJ2ZTZvcGVuZ2wxNFN0YW5kYXJkT3BlbkdMRQBDYW4ndCBjcmVhdGUgdGhlIHNjZW5lLiBSZXN1bHQ6IABUaGUgY3JlYXRlZCBzY2VuZSBpcyBudWxscHRyAFRoZSBjcmVhdGVkIFVVSUQgZ2VuZXJhdG9yIGlzIG51bGxwdHIAVGhlIFVVSUQgZ2VuZXJhdG9yIGNyZWF0ZWQgdHdvIGVxdWFsIFVVSURzOiAnACcgYW5kICcAJwBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONG1lanMxM1V1aWRHZW5lcmF0b3JFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE40bWVqczEzVXVpZEdlbmVyYXRvckVOU18xNGRlZmF1bHRfZGVsZXRlSVMyX0VFTlNfOWFsbG9jYXRvcklTMl9FRUVFAHJlbmRlcgBUaGUgZWRpdG9yIGlzIG51bGxwdHIARXJyb3IgW3Jlc3VsdCAAXSBvY2N1cnJlZCB3aGVuIHBlcmZvcm1pbmcgdGhlIGFjdGlvbiAnAHNldCB0b29sAHNldCBsaW5lIHdpZHRoAHNldCBzaGFwZSBjb2xvcgByZXNpemUAcmVzY2FsZQBzZXQgeCBwb3NpdGlvbgBzZXQgeSBwb3NpdGlvbgBvbmUgY2xpY2sAZHJhZyBzdGFydABkcmFnIG1vdmUAZHJhZyBlbmQAZHJhZyBsb3N0AGFkZCBjaGFyYWN0ZXIAdGV4dCBpbnB1dCBjb21tYW5kAHVuZG8AcmVkbwBkZWxldGUgc2hhcGUAQ2FuJ3QgZXhwb3J0IHRoZSBpbWFnZS4gUmVzdWx0OiAAZ2xfIGlzIG51bGxwdHIAVGhlIGNvbnRleHQgaXMgbm90IHJlc3RvcmVkAFRpbWVyIGZhY3RvcnkgaXMgbnVsbHB0cgB2b2lkAGJvb2wAc3RkOjpzdHJpbmcAc3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4Ac3RkOjp3c3RyaW5nAGVtc2NyaXB0ZW46OnZhbABlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGxvbmcgZG91YmxlPgBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0llRUUAZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZG91YmxlPgBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lkRUUAZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZmxvYXQ+AE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWZFRQBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ltRUUAZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4ATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbEVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWpFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lpRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJdEVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXNFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0loRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJYUVFAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+AE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWNFRQBOMTBlbXNjcmlwdGVuM3ZhbEUATlN0M19fMjEyYmFzaWNfc3RyaW5nSXdOU18xMWNoYXJfdHJhaXRzSXdFRU5TXzlhbGxvY2F0b3JJd0VFRUUATlN0M19fMjEyYmFzaWNfc3RyaW5nSWhOU18xMWNoYXJfdHJhaXRzSWhFRU5TXzlhbGxvY2F0b3JJaEVFRUUAZG91YmxlAGZsb2F0AHVuc2lnbmVkIGxvbmcAbG9uZwB1bnNpZ25lZCBpbnQAaW50AHVuc2lnbmVkIHNob3J0AHNob3J0AHVuc2lnbmVkIGNoYXIAc2lnbmVkIGNoYXIAY2hhcgBUISIZDQECAxFLHAwQBAsdEh4naG5vcHFiIAUGDxMUFRoIFgcoJBcYCQoOGx8lI4OCfSYqKzw9Pj9DR0pNWFlaW1xdXl9gYWNkZWZnaWprbHJzdHl6e3wASWxsZWdhbCBieXRlIHNlcXVlbmNlAERvbWFpbiBlcnJvcgBSZXN1bHQgbm90IHJlcHJlc2VudGFibGUATm90IGEgdHR5AFBlcm1pc3Npb24gZGVuaWVkAE9wZXJhdGlvbiBub3QgcGVybWl0dGVkAE5vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnkATm8gc3VjaCBwcm9jZXNzAEZpbGUgZXhpc3RzAFZhbHVlIHRvbyBsYXJnZSBmb3IgZGF0YSB0eXBlAE5vIHNwYWNlIGxlZnQgb24gZGV2aWNlAE91dCBvZiBtZW1vcnkAUmVzb3VyY2UgYnVzeQBJbnRlcnJ1cHRlZCBzeXN0ZW0gY2FsbABSZXNvdXJjZSB0ZW1wb3JhcmlseSB1bmF2YWlsYWJsZQBJbnZhbGlkIHNlZWsAQ3Jvc3MtZGV2aWNlIGxpbmsAUmVhZC1vbmx5IGZpbGUgc3lzdGVtAERpcmVjdG9yeSBub3QgZW1wdHkAQ29ubmVjdGlvbiByZXNldCBieSBwZWVyAE9wZXJhdGlvbiB0aW1lZCBvdXQAQ29ubmVjdGlvbiByZWZ1c2VkAEhvc3QgaXMgZG93bgBIb3N0IGlzIHVucmVhY2hhYmxlAEFkZHJlc3MgaW4gdXNlAEJyb2tlbiBwaXBlAEkvTyBlcnJvcgBObyBzdWNoIGRldmljZSBvciBhZGRyZXNzAEJsb2NrIGRldmljZSByZXF1aXJlZABObyBzdWNoIGRldmljZQBOb3QgYSBkaXJlY3RvcnkASXMgYSBkaXJlY3RvcnkAVGV4dCBmaWxlIGJ1c3kARXhlYyBmb3JtYXQgZXJyb3IASW52YWxpZCBhcmd1bWVudABBcmd1bWVudCBsaXN0IHRvbyBsb25nAFN5bWJvbGljIGxpbmsgbG9vcABGaWxlbmFtZSB0b28gbG9uZwBUb28gbWFueSBvcGVuIGZpbGVzIGluIHN5c3RlbQBObyBmaWxlIGRlc2NyaXB0b3JzIGF2YWlsYWJsZQBCYWQgZmlsZSBkZXNjcmlwdG9yAE5vIGNoaWxkIHByb2Nlc3MAQmFkIGFkZHJlc3MARmlsZSB0b28gbGFyZ2UAVG9vIG1hbnkgbGlua3MATm8gbG9ja3MgYXZhaWxhYmxlAFJlc291cmNlIGRlYWRsb2NrIHdvdWxkIG9jY3VyAFN0YXRlIG5vdCByZWNvdmVyYWJsZQBQcmV2aW91cyBvd25lciBkaWVkAE9wZXJhdGlvbiBjYW5jZWxlZABGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQATm8gbWVzc2FnZSBvZiBkZXNpcmVkIHR5cGUASWRlbnRpZmllciByZW1vdmVkAERldmljZSBub3QgYSBzdHJlYW0ATm8gZGF0YSBhdmFpbGFibGUARGV2aWNlIHRpbWVvdXQAT3V0IG9mIHN0cmVhbXMgcmVzb3VyY2VzAExpbmsgaGFzIGJlZW4gc2V2ZXJlZABQcm90b2NvbCBlcnJvcgBCYWQgbWVzc2FnZQBGaWxlIGRlc2NyaXB0b3IgaW4gYmFkIHN0YXRlAE5vdCBhIHNvY2tldABEZXN0aW5hdGlvbiBhZGRyZXNzIHJlcXVpcmVkAE1lc3NhZ2UgdG9vIGxhcmdlAFByb3RvY29sIHdyb25nIHR5cGUgZm9yIHNvY2tldABQcm90b2NvbCBub3QgYXZhaWxhYmxlAFByb3RvY29sIG5vdCBzdXBwb3J0ZWQAU29ja2V0IHR5cGUgbm90IHN1cHBvcnRlZABOb3Qgc3VwcG9ydGVkAFByb3RvY29sIGZhbWlseSBub3Qgc3VwcG9ydGVkAEFkZHJlc3MgZmFtaWx5IG5vdCBzdXBwb3J0ZWQgYnkgcHJvdG9jb2wAQWRkcmVzcyBub3QgYXZhaWxhYmxlAE5ldHdvcmsgaXMgZG93bgBOZXR3b3JrIHVucmVhY2hhYmxlAENvbm5lY3Rpb24gcmVzZXQgYnkgbmV0d29yawBDb25uZWN0aW9uIGFib3J0ZWQATm8gYnVmZmVyIHNwYWNlIGF2YWlsYWJsZQBTb2NrZXQgaXMgY29ubmVjdGVkAFNvY2tldCBub3QgY29ubmVjdGVkAENhbm5vdCBzZW5kIGFmdGVyIHNvY2tldCBzaHV0ZG93bgBPcGVyYXRpb24gYWxyZWFkeSBpbiBwcm9ncmVzcwBPcGVyYXRpb24gaW4gcHJvZ3Jlc3MAU3RhbGUgZmlsZSBoYW5kbGUAUmVtb3RlIEkvTyBlcnJvcgBRdW90YSBleGNlZWRlZABObyBtZWRpdW0gZm91bmQAV3JvbmcgbWVkaXVtIHR5cGUATm8gZXJyb3IgaW5mb3JtYXRpb24AABEACgAREREAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAEQAPChEREQMKBwABEwkLCwAACQYLAAALAAYRAAAAERERAAAAAAAAAAAAAAAAAAAAAAsAAAAAAAAAABEACgoREREACgAAAgAJCwAAAAkACwAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAwAAAAACQwAAAAAAAwAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAADQAAAAQNAAAAAAkOAAAAAAAOAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAA8AAAAADwAAAAAJEAAAAAAAEAAAEAAAEgAAABISEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAEhISAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAAAAAAACgAAAAAKAAAAAAkLAAAAAAALAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAADAAAAAAJDAAAAAAADAAADAAALSsgICAwWDB4AChudWxsKQAtMFgrMFggMFgtMHgrMHggMHgAaW5mAElORgBuYW4ATkFOADAxMjM0NTY3ODlBQkNERUYuAE5TdDNfXzIxNF9fc2hhcmVkX2NvdW50RQBOU3QzX18yMTlfX3NoYXJlZF93ZWFrX2NvdW50RQAlZAB0ZXJtaW5hdGluZyB3aXRoICVzIGV4Y2VwdGlvbiBvZiB0eXBlICVzOiAlcwB0ZXJtaW5hdGluZyB3aXRoICVzIGV4Y2VwdGlvbiBvZiB0eXBlICVzAHRlcm1pbmF0aW5nIHdpdGggJXMgZm9yZWlnbiBleGNlcHRpb24AdGVybWluYXRpbmcAdW5jYXVnaHQAU3Q5ZXhjZXB0aW9uAE4xMF9fY3h4YWJpdjExNl9fc2hpbV90eXBlX2luZm9FAFN0OXR5cGVfaW5mbwBOMTBfX2N4eGFiaXYxMjBfX3NpX2NsYXNzX3R5cGVfaW5mb0UATjEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm9FAHB0aHJlYWRfb25jZSBmYWlsdXJlIGluIF9fY3hhX2dldF9nbG9iYWxzX2Zhc3QoKQBjYW5ub3QgY3JlYXRlIHB0aHJlYWQga2V5IGZvciBfX2N4YV9nZXRfZ2xvYmFscygpAGNhbm5vdCB6ZXJvIG91dCB0aHJlYWQgdmFsdWUgZm9yIF9fY3hhX2dldF9nbG9iYWxzKCkAdGVybWluYXRlX2hhbmRsZXIgdW5leHBlY3RlZGx5IHJldHVybmVkAHN0ZDo6ZXhjZXB0aW9uAFN0MTFsb2dpY19lcnJvcgBTdDEybGVuZ3RoX2Vycm9yAE4xMF9fY3h4YWJpdjExOV9fcG9pbnRlcl90eXBlX2luZm9FAE4xMF9fY3h4YWJpdjExN19fcGJhc2VfdHlwZV9pbmZvRQBOMTBfX2N4eGFiaXYxMjNfX2Z1bmRhbWVudGFsX3R5cGVfaW5mb0UAdgBEbgBiAGMAaABhAHMAaQBqAGwAbQBmAGQATjEwX19jeHhhYml2MTE2X19lbnVtX3R5cGVfaW5mb0UATjEwX19jeHhhYml2MTIxX192bWlfY2xhc3NfdHlwZV9pbmZvRQ==";var tempDoublePtr=STATICTOP;STATICTOP+=16;function ___cxa_allocate_exception(size){return _malloc(size)}function __ZSt18uncaught_exceptionv(){return!!__ZSt18uncaught_exceptionv.uncaught_exception}var EXCEPTIONS={last:0,caught:[],infos:{},deAdjust:(function(adjusted){if(!adjusted||EXCEPTIONS.infos[adjusted])return adjusted;for(var ptr in EXCEPTIONS.infos){var info=EXCEPTIONS.infos[ptr];if(info.adjusted===adjusted){return ptr}}return adjusted}),addRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount++}),decRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];assert(info.refcount>0);info.refcount--;if(info.refcount===0&&!info.rethrown){if(info.destructor){Module["dynCall_vi"](info.destructor,ptr)}delete EXCEPTIONS.infos[ptr];___cxa_free_exception(ptr)}}),clearRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount=0})};function ___cxa_begin_catch(ptr){var info=EXCEPTIONS.infos[ptr];if(info&&!info.caught){info.caught=true;__ZSt18uncaught_exceptionv.uncaught_exception--}if(info)info.rethrown=false;EXCEPTIONS.caught.push(ptr);EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(ptr));return ptr}function ___cxa_pure_virtual(){ABORT=true;throw"Pure virtual function called!"}function ___resumeException(ptr){if(!EXCEPTIONS.last){EXCEPTIONS.last=ptr}throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."}function ___cxa_find_matching_catch(){var thrown=EXCEPTIONS.last;if(!thrown){return(setTempRet0(0),0)|0}var info=EXCEPTIONS.infos[thrown];var throwntype=info.type;if(!throwntype){return(setTempRet0(0),thrown)|0}var typeArray=Array.prototype.slice.call(arguments);var pointer=Module["___cxa_is_pointer_type"](throwntype);if(!___cxa_find_matching_catch.buffer)___cxa_find_matching_catch.buffer=_malloc(4);HEAP32[___cxa_find_matching_catch.buffer>>2]=thrown;thrown=___cxa_find_matching_catch.buffer;for(var i=0;i<typeArray.length;i++){if(typeArray[i]&&Module["___cxa_can_catch"](typeArray[i],throwntype,thrown)){thrown=HEAP32[thrown>>2];info.adjusted=thrown;return(setTempRet0(typeArray[i]),thrown)|0}}thrown=HEAP32[thrown>>2];return(setTempRet0(throwntype),thrown)|0}function ___cxa_throw(ptr,type,destructor){EXCEPTIONS.infos[ptr]={ptr:ptr,adjusted:ptr,type:type,destructor:destructor,refcount:0,caught:false,rethrown:false};EXCEPTIONS.last=ptr;if(!("uncaught_exception"in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv.uncaught_exception=1}else{__ZSt18uncaught_exceptionv.uncaught_exception++}throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."}function ___gxx_personality_v0(){}var SYSCALLS={varargs:0,get:(function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret}),getStr:(function(){var ret=Pointer_stringify(SYSCALLS.get());return ret}),get64:(function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low}),getZero:(function(){assert(SYSCALLS.get()===0)})};function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function flush_NO_FILESYSTEM(){var fflush=Module["_fflush"];if(fflush)fflush(0);var printChar=___syscall146.printChar;if(!printChar)return;var buffers=___syscall146.buffers;if(buffers[1].length)printChar(1,10);if(buffers[2].length)printChar(2,10)}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffers){___syscall146.buffers=[null,[],[]];___syscall146.printChar=(function(stream,curr){var buffer=___syscall146.buffers[stream];assert(buffer);if(curr===0||curr===10){(stream===1?Module["print"]:Module["printErr"])(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}})}for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){___syscall146.printChar(stream,HEAPU8[ptr+j])}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_STATIC);var structRegistrations={};function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr)}}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2])}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return"_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return"_"+name}else{return name}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return(new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n"))(body)}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,(function(message){this.name=errorName;this.message=message;var stack=(new Error(message)).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"")}}));errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=(function(){if(this.message===undefined){return this.name}else{return this.name+": "+this.message}});return errorClass}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach((function(type){typeDependencies[type]=dependentTypes}));function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach((function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push((function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}}))}}));if(0===unregisteredTypes.length){onComplete(typeConverters)}}function __embind_finalize_value_object(structType){var reg=structRegistrations[structType];delete structRegistrations[structType];var rawConstructor=reg.rawConstructor;var rawDestructor=reg.rawDestructor;var fieldRecords=reg.fields;var fieldTypes=fieldRecords.map((function(field){return field.getterReturnType})).concat(fieldRecords.map((function(field){return field.setterArgumentType})));whenDependentTypesAreResolved([structType],fieldTypes,(function(fieldTypes){var fields={};fieldRecords.forEach((function(field,i){var fieldName=field.fieldName;var getterReturnType=fieldTypes[i];var getter=field.getter;var getterContext=field.getterContext;var setterArgumentType=fieldTypes[i+fieldRecords.length];var setter=field.setter;var setterContext=field.setterContext;fields[fieldName]={read:(function(ptr){return getterReturnType["fromWireType"](getter(getterContext,ptr))}),write:(function(ptr,o){var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,o));runDestructors(destructors)})}}));return[{name:reg.name,"fromWireType":(function(ptr){var rv={};for(var i in fields){rv[i]=fields[i].read(ptr)}rawDestructor(ptr);return rv}),"toWireType":(function(destructors,o){for(var fieldName in fields){if(!(fieldName in o)){throw new TypeError("Missing field")}}var ptr=rawConstructor();for(fieldName in fields){fields[fieldName].write(ptr,o[fieldName])}if(destructors!==null){destructors.push(rawDestructor,ptr)}return ptr}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:rawDestructor}]}))}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size)}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]]}return ret}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}function registerType(rawType,registeredInstance,options){options=options||{};if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance")}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer')}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError("Cannot register type '"+name+"' twice")}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach((function(cb){cb()}))}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":(function(wt){return!!wt}),"toWireType":(function(destructors,o){return o?trueValue:falseValue}),"argPackAdvance":8,"readValueFromPointer":(function(pointer){var heap;if(size===1){heap=HEAP8}else if(size===2){heap=HEAP16}else if(size===4){heap=HEAP32}else{throw new TypeError("Unknown boolean type size: "+name)}return this["fromWireType"](heap[pointer>>shift])}),destructorFunction:null})}function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false}if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass}return leftClass===rightClass&&left===right}function shallowCopyInternalPointer(o){return{count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType}}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted")}function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else{var clone=Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}});clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}}function runDestructor(handle){var $$=handle.$$;if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr)}else{$$.ptrType.registeredClass.rawDestructor($$.ptr)}}function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}this.$$.count.value-=1;var toDelete=0===this.$$.count.value;if(toDelete){runDestructor(this)}if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined}}function ClassHandle_isDeleted(){return!this.$$.ptr}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]()}}function ClassHandle_deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes)}this.$$.deleteScheduled=true;return this}function init_ClassHandle(){ClassHandle.prototype["isAliasOf"]=ClassHandle_isAliasOf;ClassHandle.prototype["clone"]=ClassHandle_clone;ClassHandle.prototype["delete"]=ClassHandle_delete;ClassHandle.prototype["isDeleted"]=ClassHandle_isDeleted;ClassHandle.prototype["deleteLater"]=ClassHandle_deleteLater}function ClassHandle(){}var registeredPointers={};function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=(function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!")}return proto[methodName].overloadTable[arguments.length].apply(this,arguments)});proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice")}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!")}Module[name].overloadTable[numArguments]=value}else{Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments}}}function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[]}function upcastPointer(ptr,ptrClass,desiredClass){while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError("Expected null or instance of "+desiredClass.name+", got an instance of "+ptrClass.name)}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass}return ptr}function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name)}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name)}if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr)}return ptr}else{return 0}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name)}var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal")}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{throwBindingError("Cannot convert argument of type "+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+" to parameter type "+this.name)}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,__emval_register((function(){clonedHandle["delete"]()})));if(destructors!==null){destructors.push(this.rawDestructor,ptr)}}break;default:throwBindingError("Unsupporting sharing policy")}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError("null is not a valid "+this.name)}return 0}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name)}if(!handle.$$.ptr){throwBindingError("Cannot pass deleted object as a pointer of type "+this.name)}if(handle.$$.ptrType.isConst){throwBindingError("Cannot convert argument of type "+handle.$$.ptrType.name+" to parameter type "+this.name)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function RegisteredPointer_getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr)}return ptr}function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr)}}function RegisteredPointer_deleteObject(handle){if(handle!==null){handle["delete"]()}}function downcastPointer(ptr,ptrClass,desiredClass){if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null}return desiredClass.downcast(rv)}function getInheritedInstanceCount(){return Object.keys(registeredInstances).length}function getLiveInheritedInstances(){var rv=[];for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k])}}return rv}function setDelayFunction(fn){delayFunction=fn;if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes)}}function init_embind(){Module["getInheritedInstanceCount"]=getInheritedInstanceCount;Module["getLiveInheritedInstances"]=getLiveInheritedInstances;Module["flushPendingDeletes"]=flushPendingDeletes;Module["setDelayFunction"]=setDelayFunction}var registeredInstances={};function getBasestPointer(class_,ptr){if(ptr===undefined){throwBindingError("ptr should not be undefined")}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass}return ptr}function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]}function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType")}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified")}record.count={value:1};return Object.create(prototype,{$$:{value:record}})}function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else{var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr})}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType}else{toType=registeredPointerRecord.pointerType}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;RegisteredPointer.prototype["argPackAdvance"]=8;RegisteredPointer.prototype["readValueFromPointer"]=simpleReadValueFromPointer;RegisteredPointer.prototype["deleteObject"]=RegisteredPointer_deleteObject;RegisteredPointer.prototype["fromWireType"]=RegisteredPointer_fromWireType}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null}else{this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null}}else{this["toWireType"]=genericPointerToWireType}}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol")}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}}function embind__requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(dynCall){var args=[];for(var i=1;i<signature.length;++i){args.push("a"+i)}var name="dynCall_"+signature+"_"+rawFunction;var body="return function "+name+"("+args.join(", ")+") {\n";body+="    return dynCall(rawFunction"+(args.length?", ":"")+args.join(", ")+");\n";body+="};\n";return(new Function("dynCall","rawFunction",body))(dynCall,rawFunction)}var fp;if(Module["FUNCTION_TABLE_"+signature]!==undefined){fp=Module["FUNCTION_TABLE_"+signature][rawFunction]}else if(typeof FUNCTION_TABLE!=="undefined"){fp=FUNCTION_TABLE[rawFunction]}else{var dc=Module["asm"]["dynCall_"+signature];if(dc===undefined){dc=Module["asm"]["dynCall_"+signature.replace(/f/g,"d")];if(dc===undefined){throwBindingError("No dynCall invoker for signature: "+signature)}}fp=makeDynCaller(dc)}if(typeof fp!=="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction)}return fp}var UnboundTypeError=undefined;function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv}function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){name=readLatin1String(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);if(upcast){upcast=embind__requireFunction(upcastSignature,upcast)}if(downcast){downcast=embind__requireFunction(downcastSignature,downcast)}rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,(function(){throwUnboundTypeError("Cannot construct "+name+" due to unbound types",[baseClassRawType])}));whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],(function(base){base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype}else{basePrototype=ClassHandle.prototype}var constructor=createNamedFunction(legalFunctionName,(function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name)}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor")}var body=registeredClass.constructor_body[arguments.length];if(undefined===body){throw new BindingError("Tried to invoke ctor of "+name+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(registeredClass.constructor_body).toString()+") parameters instead!")}return body.apply(this,arguments)}));var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return[referenceConverter,pointerConverter,constPointerConverter]}))}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i])}return array}function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],(function(classType){classType=classType[0];var humanName="constructor "+classType.name;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[]}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError("Cannot register multiple constructors with identical number of parameters ("+(argCount-1)+") for class '"+classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!")}classType.registeredClass.constructor_body[argCount-1]=function unboundTypeHandler(){throwUnboundTypeError("Cannot construct "+classType.name+" due to unbound types",rawArgTypes)};whenDependentTypesAreResolved([],rawArgTypes,(function(argTypes){classType.registeredClass.constructor_body[argCount-1]=function constructor_body(){if(arguments.length!==argCount-1){throwBindingError(humanName+" called with "+arguments.length+" arguments, expected "+(argCount-1))}var destructors=[];var args=new Array(argCount);args[0]=rawConstructor;for(var i=1;i<argCount;++i){args[i]=argTypes[i]["toWireType"](destructors,arguments[i-1])}var ptr=invoker.apply(null,args);runDestructors(destructors);return argTypes[0]["fromWireType"](ptr)};return[]}));return[]}))}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",(function(){}));dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break}}var returns=argTypes[0].name!=="void";var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired"}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";if(needsDestructorStack){invokerFnBody+="var destructors = [];\n"}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n"}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2])}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired}invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n"}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction)}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n"}else{}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction}function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],(function(classType){classType=classType[0];var humanName=classType.name+"."+methodName;if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName)}function unboundTypesHandler(){throwUnboundTypeError("Cannot call "+humanName+" due to unbound types",rawArgTypes)}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler}else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler}whenDependentTypesAreResolved([],rawArgTypes,(function(argTypes){var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction}else{proto[methodName].overloadTable[argCount-2]=memberFunction}return[]}));return[]}))}function validateThis(this_,classType,humanName){if(!(this_ instanceof Object)){throwBindingError(humanName+' with invalid "this": '+this_)}if(!(this_ instanceof classType.registeredClass.constructor)){throwBindingError(humanName+' incompatible with "this" of type '+this_.constructor.name)}if(!this_.$$.ptr){throwBindingError("cannot call emscripten binding method "+humanName+" on deleted object")}return upcastPointer(this_.$$.ptr,this_.$$.ptrType.registeredClass,classType.registeredClass)}function __embind_register_class_property(classType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){fieldName=readLatin1String(fieldName);getter=embind__requireFunction(getterSignature,getter);whenDependentTypesAreResolved([],[classType],(function(classType){classType=classType[0];var humanName=classType.name+"."+fieldName;var desc={get:(function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType])}),enumerable:true,configurable:true};if(setter){desc.set=(function(){throwUnboundTypeError("Cannot access "+humanName+" due to unbound types",[getterReturnType,setterArgumentType])})}else{desc.set=(function(v){throwBindingError(humanName+" is a read-only property")})}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);whenDependentTypesAreResolved([],setter?[getterReturnType,setterArgumentType]:[getterReturnType],(function(types){var getterReturnType=types[0];var desc={get:(function(){var ptr=validateThis(this,classType,humanName+" getter");return getterReturnType["fromWireType"](getter(getterContext,ptr))}),enumerable:true};if(setter){setter=embind__requireFunction(setterSignature,setter);var setterArgumentType=types[1];desc.set=(function(v){var ptr=validateThis(this,classType,humanName+" setter");var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,v));runDestructors(destructors)})}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);return[]}));return[]}))}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle)}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count}}return count}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i]}}return null}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval}function __emval_register(value){switch(value){case undefined:{return 1};case null:{return 2};case true:{return 3};case false:{return 4};default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle}}}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":(function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv}),"toWireType":(function(destructors,value){return __emval_register(value)}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null})}function enumReadValueFromPointer(name,shift,signed){switch(shift){case 0:return(function(pointer){var heap=signed?HEAP8:HEAPU8;return this["fromWireType"](heap[pointer])});case 1:return(function(pointer){var heap=signed?HEAP16:HEAPU16;return this["fromWireType"](heap[pointer>>1])});case 2:return(function(pointer){var heap=signed?HEAP32:HEAPU32;return this["fromWireType"](heap[pointer>>2])});default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_enum(rawType,name,size,isSigned){var shift=getShiftFromSize(size);name=readLatin1String(name);function ctor(){}ctor.values={};registerType(rawType,{name:name,constructor:ctor,"fromWireType":(function(c){return this.constructor.values[c]}),"toWireType":(function(destructors,c){return c.value}),"argPackAdvance":8,"readValueFromPointer":enumReadValueFromPointer(name,shift,isSigned),destructorFunction:null});exposePublicSymbol(name,ctor)}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType))}return impl}function __embind_register_enum_value(rawEnumType,name,enumValue){var enumType=requireRegisteredType(rawEnumType,"enum");name=readLatin1String(name);var Enum=enumType.constructor;var Value=Object.create(enumType.constructor.prototype,{value:{value:enumValue},constructor:{value:createNamedFunction(enumType.name+"_"+name,(function(){}))}});Enum.values[enumValue]=Value;Enum[name]=Value}function _embind_repr(v){if(v===null){return"null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else{return""+v}}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return(function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])});case 3:return(function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])});default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":(function(value){return value}),"toWireType":(function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}return value}),"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null})}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){return HEAPU8[pointer]};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1]};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2]};default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295}var shift=getShiftFromSize(size);var fromWireType=(function(value){return value});if(minRange===0){var bitshift=32-8*size;fromWireType=(function(value){return value<<bitshift>>>bitshift})}var isUnsignedType=name.indexOf("unsigned")!=-1;registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":(function(destructors,value){if(typeof value!=="number"&&typeof value!=="boolean"){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name)}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+", "+maxRange+"]!")}return isUnsignedType?value>>>0:value|0}),"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null})}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(heap["buffer"],data,size)}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true})}function __embind_register_std_string(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":(function(value){var length=HEAPU32[value>>2];var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i])}_free(value);return a.join("")}),"toWireType":(function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value)}function getTAElement(ta,index){return ta[index]}function getStringElement(string,index){return string.charCodeAt(index)}var getElement;if(value instanceof Uint8Array){getElement=getTAElement}else if(value instanceof Uint8ClampedArray){getElement=getTAElement}else if(value instanceof Int8Array){getElement=getTAElement}else if(typeof value==="string"){getElement=getStringElement}else{throwBindingError("Cannot pass non-string to std::string")}var length=value.length;var ptr=_malloc(4+length);HEAPU32[ptr>>2]=length;for(var i=0;i<length;++i){var charCode=getElement(value,i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+4+i]=charCode}if(destructors!==null){destructors.push(_free,ptr)}return ptr}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:(function(ptr){_free(ptr)})})}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var getHeap,shift;if(charSize===2){getHeap=(function(){return HEAPU16});shift=1}else if(charSize===4){getHeap=(function(){return HEAPU32});shift=2}registerType(rawType,{name:name,"fromWireType":(function(value){var HEAP=getHeap();var length=HEAPU32[value>>2];var a=new Array(length);var start=value+4>>shift;for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAP[start+i])}_free(value);return a.join("")}),"toWireType":(function(destructors,value){var HEAP=getHeap();var length=value.length;var ptr=_malloc(4+length*charSize);HEAPU32[ptr>>2]=length;var start=ptr+4>>shift;for(var i=0;i<length;++i){HEAP[start+i]=value.charCodeAt(i)}if(destructors!==null){destructors.push(_free,ptr)}return ptr}),"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:(function(ptr){_free(ptr)})})}function __embind_register_value_object(rawType,name,constructorSignature,rawConstructor,destructorSignature,rawDestructor){structRegistrations[rawType]={name:readLatin1String(name),rawConstructor:embind__requireFunction(constructorSignature,rawConstructor),rawDestructor:embind__requireFunction(destructorSignature,rawDestructor),fields:[]}}function __embind_register_value_object_field(structType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){structRegistrations[structType].fields.push({fieldName:readLatin1String(fieldName),getterReturnType:getterReturnType,getter:embind__requireFunction(getterSignature,getter),getterContext:getterContext,setterArgumentType:setterArgumentType,setter:embind__requireFunction(setterSignature,setter),setterContext:setterContext})}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":(function(){return undefined}),"toWireType":(function(destructors,o){return undefined})})}function _abort(){Module["abort"]()}var GL={counter:1,lastError:0,buffers:[],mappedBuffers:{},programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],contexts:[],currentContext:null,offscreenCanvases:{},timerQueriesEXT:[],byteSizeByTypeRoot:5120,byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],programInfos:{},stringCache:{},tempFixedLengthArray:[],packAlignment:4,unpackAlignment:4,init:(function(){GL.miniTempBuffer=new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);for(var i=0;i<GL.MINI_TEMP_BUFFER_SIZE;i++){GL.miniTempBufferViews[i]=GL.miniTempBuffer.subarray(0,i+1)}for(var i=0;i<32;i++){GL.tempFixedLengthArray.push(new Array(i))}}),recordError:function recordError(errorCode){if(!GL.lastError){GL.lastError=errorCode}},getNewId:(function(table){var ret=GL.counter++;for(var i=table.length;i<ret;i++){table[i]=null}return ret}),MINI_TEMP_BUFFER_SIZE:256,miniTempBuffer:null,miniTempBufferViews:[0],getSource:(function(shader,count,string,length){var source="";for(var i=0;i<count;++i){var frag;if(length){var len=HEAP32[length+i*4>>2];if(len<0){frag=Pointer_stringify(HEAP32[string+i*4>>2])}else{frag=Pointer_stringify(HEAP32[string+i*4>>2],len)}}else{frag=Pointer_stringify(HEAP32[string+i*4>>2])}source+=frag}return source}),createContext:(function(canvas,webGLContextAttributes){if(typeof webGLContextAttributes["majorVersion"]==="undefined"&&typeof webGLContextAttributes["minorVersion"]==="undefined"){webGLContextAttributes["majorVersion"]=1;webGLContextAttributes["minorVersion"]=0}var ctx;var errorInfo="?";function onContextCreationError(event){errorInfo=event.statusMessage||errorInfo}try{canvas.addEventListener("webglcontextcreationerror",onContextCreationError,false);try{if(webGLContextAttributes["majorVersion"]==1&&webGLContextAttributes["minorVersion"]==0){ctx=canvas.getContext("webgl",webGLContextAttributes)||canvas.getContext("experimental-webgl",webGLContextAttributes)}else if(webGLContextAttributes["majorVersion"]==2&&webGLContextAttributes["minorVersion"]==0){ctx=canvas.getContext("webgl2",webGLContextAttributes)}else{throw"Unsupported WebGL context version "+majorVersion+"."+minorVersion+"!"}}finally{canvas.removeEventListener("webglcontextcreationerror",onContextCreationError,false)}if(!ctx)throw":("}catch(e){Module.print("Could not create canvas: "+[errorInfo,e,JSON.stringify(webGLContextAttributes)]);return 0}if(!ctx)return 0;var context=GL.registerContext(ctx,webGLContextAttributes);return context}),registerContext:(function(ctx,webGLContextAttributes){var handle=GL.getNewId(GL.contexts);var context={handle:handle,attributes:webGLContextAttributes,version:webGLContextAttributes["majorVersion"],GLctx:ctx};if(ctx.canvas)ctx.canvas.GLctxObject=context;GL.contexts[handle]=context;if(typeof webGLContextAttributes["enableExtensionsByDefault"]==="undefined"||webGLContextAttributes["enableExtensionsByDefault"]){GL.initExtensions(context)}return handle}),makeContextCurrent:(function(contextHandle){var context=GL.contexts[contextHandle];if(!context)return false;GLctx=Module.ctx=context.GLctx;GL.currentContext=context;return true}),getContext:(function(contextHandle){return GL.contexts[contextHandle]}),deleteContext:(function(contextHandle){if(GL.currentContext===GL.contexts[contextHandle])GL.currentContext=null;if(typeof JSEvents==="object")JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);if(GL.contexts[contextHandle]&&GL.contexts[contextHandle].GLctx.canvas)GL.contexts[contextHandle].GLctx.canvas.GLctxObject=undefined;GL.contexts[contextHandle]=null}),initExtensions:(function(context){if(!context)context=GL.currentContext;if(context.initExtensionsDone)return;context.initExtensionsDone=true;var GLctx=context.GLctx;context.maxVertexAttribs=GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);if(context.version<2){var instancedArraysExt=GLctx.getExtension("ANGLE_instanced_arrays");if(instancedArraysExt){GLctx["vertexAttribDivisor"]=(function(index,divisor){instancedArraysExt["vertexAttribDivisorANGLE"](index,divisor)});GLctx["drawArraysInstanced"]=(function(mode,first,count,primcount){instancedArraysExt["drawArraysInstancedANGLE"](mode,first,count,primcount)});GLctx["drawElementsInstanced"]=(function(mode,count,type,indices,primcount){instancedArraysExt["drawElementsInstancedANGLE"](mode,count,type,indices,primcount)})}var vaoExt=GLctx.getExtension("OES_vertex_array_object");if(vaoExt){GLctx["createVertexArray"]=(function(){return vaoExt["createVertexArrayOES"]()});GLctx["deleteVertexArray"]=(function(vao){vaoExt["deleteVertexArrayOES"](vao)});GLctx["bindVertexArray"]=(function(vao){vaoExt["bindVertexArrayOES"](vao)});GLctx["isVertexArray"]=(function(vao){return vaoExt["isVertexArrayOES"](vao)})}var drawBuffersExt=GLctx.getExtension("WEBGL_draw_buffers");if(drawBuffersExt){GLctx["drawBuffers"]=(function(n,bufs){drawBuffersExt["drawBuffersWEBGL"](n,bufs)})}}GLctx.disjointTimerQueryExt=GLctx.getExtension("EXT_disjoint_timer_query");var automaticallyEnabledExtensions=["OES_texture_float","OES_texture_half_float","OES_standard_derivatives","OES_vertex_array_object","WEBGL_compressed_texture_s3tc","WEBGL_depth_texture","OES_element_index_uint","EXT_texture_filter_anisotropic","ANGLE_instanced_arrays","OES_texture_float_linear","OES_texture_half_float_linear","WEBGL_compressed_texture_atc","WEBKIT_WEBGL_compressed_texture_pvrtc","WEBGL_compressed_texture_pvrtc","EXT_color_buffer_half_float","WEBGL_color_buffer_float","EXT_frag_depth","EXT_sRGB","WEBGL_draw_buffers","WEBGL_shared_resources","EXT_shader_texture_lod","EXT_color_buffer_float"];var exts=GLctx.getSupportedExtensions();if(exts&&exts.length>0){GLctx.getSupportedExtensions().forEach((function(ext){if(automaticallyEnabledExtensions.indexOf(ext)!=-1){GLctx.getExtension(ext)}}))}}),populateUniformTable:(function(program){var p=GL.programs[program];GL.programInfos[program]={uniforms:{},maxUniformLength:0,maxAttributeLength:-1,maxUniformBlockNameLength:-1};var ptable=GL.programInfos[program];var utable=ptable.uniforms;var numUniforms=GLctx.getProgramParameter(p,GLctx.ACTIVE_UNIFORMS);for(var i=0;i<numUniforms;++i){var u=GLctx.getActiveUniform(p,i);var name=u.name;ptable.maxUniformLength=Math.max(ptable.maxUniformLength,name.length+1);if(name.indexOf("]",name.length-1)!==-1){var ls=name.lastIndexOf("[");name=name.slice(0,ls)}var loc=GLctx.getUniformLocation(p,name);if(loc!=null){var id=GL.getNewId(GL.uniforms);utable[name]=[u.size,id];GL.uniforms[id]=loc;for(var j=1;j<u.size;++j){var n=name+"["+j+"]";loc=GLctx.getUniformLocation(p,n);id=GL.getNewId(GL.uniforms);GL.uniforms[id]=loc}}}})};function _glAttachShader(program,shader){GLctx.attachShader(GL.programs[program],GL.shaders[shader])}function _glBindBuffer(target,buffer){var bufferObj=buffer?GL.buffers[buffer]:null;GLctx.bindBuffer(target,bufferObj)}function _glBindFramebuffer(target,framebuffer){GLctx.bindFramebuffer(target,framebuffer?GL.framebuffers[framebuffer]:null)}function _glBindRenderbuffer(target,renderbuffer){GLctx.bindRenderbuffer(target,renderbuffer?GL.renderbuffers[renderbuffer]:null)}function _glBindTexture(target,texture){GLctx.bindTexture(target,texture?GL.textures[texture]:null)}function _glBlendFuncSeparate(x0,x1,x2,x3){GLctx["blendFuncSeparate"](x0,x1,x2,x3)}function _glBufferData(target,size,data,usage){if(!data){GLctx.bufferData(target,size,usage)}else{GLctx.bufferData(target,HEAPU8.subarray(data,data+size),usage)}}function _glCheckFramebufferStatus(x0){return GLctx["checkFramebufferStatus"](x0)}function _glClear(x0){GLctx["clear"](x0)}function _glClearColor(x0,x1,x2,x3){GLctx["clearColor"](x0,x1,x2,x3)}function _glCompileShader(shader){GLctx.compileShader(GL.shaders[shader])}function _glCreateProgram(){var id=GL.getNewId(GL.programs);var program=GLctx.createProgram();program.name=id;GL.programs[id]=program;return id}function _glCreateShader(shaderType){var id=GL.getNewId(GL.shaders);GL.shaders[id]=GLctx.createShader(shaderType);return id}function _glDeleteBuffers(n,buffers){for(var i=0;i<n;i++){var id=HEAP32[buffers+i*4>>2];var buffer=GL.buffers[id];if(!buffer)continue;GLctx.deleteBuffer(buffer);buffer.name=0;GL.buffers[id]=null;if(id==GL.currArrayBuffer)GL.currArrayBuffer=0;if(id==GL.currElementArrayBuffer)GL.currElementArrayBuffer=0}}function _glDeleteFramebuffers(n,framebuffers){for(var i=0;i<n;++i){var id=HEAP32[framebuffers+i*4>>2];var framebuffer=GL.framebuffers[id];if(!framebuffer)continue;GLctx.deleteFramebuffer(framebuffer);framebuffer.name=0;GL.framebuffers[id]=null}}function _glDeleteProgram(id){if(!id)return;var program=GL.programs[id];if(!program){GL.recordError(1281);return}GLctx.deleteProgram(program);program.name=0;GL.programs[id]=null;GL.programInfos[id]=null}function _glDeleteRenderbuffers(n,renderbuffers){for(var i=0;i<n;i++){var id=HEAP32[renderbuffers+i*4>>2];var renderbuffer=GL.renderbuffers[id];if(!renderbuffer)continue;GLctx.deleteRenderbuffer(renderbuffer);renderbuffer.name=0;GL.renderbuffers[id]=null}}function _glDeleteShader(id){if(!id)return;var shader=GL.shaders[id];if(!shader){GL.recordError(1281);return}GLctx.deleteShader(shader);GL.shaders[id]=null}function _glDeleteTextures(n,textures){for(var i=0;i<n;i++){var id=HEAP32[textures+i*4>>2];var texture=GL.textures[id];if(!texture)continue;GLctx.deleteTexture(texture);texture.name=0;GL.textures[id]=null}}function _glDetachShader(program,shader){GLctx.detachShader(GL.programs[program],GL.shaders[shader])}function _glDisable(x0){GLctx["disable"](x0)}function _glDisableVertexAttribArray(index){GLctx.disableVertexAttribArray(index)}function _glDrawElements(mode,count,type,indices){GLctx.drawElements(mode,count,type,indices)}function _glEnable(x0){GLctx["enable"](x0)}function _glEnableVertexAttribArray(index){GLctx.enableVertexAttribArray(index)}function _glFramebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer){GLctx.framebufferRenderbuffer(target,attachment,renderbuffertarget,GL.renderbuffers[renderbuffer])}function _glFramebufferTexture2D(target,attachment,textarget,texture,level){GLctx.framebufferTexture2D(target,attachment,textarget,GL.textures[texture],level)}function _glGenBuffers(n,buffers){for(var i=0;i<n;i++){var buffer=GLctx.createBuffer();if(!buffer){GL.recordError(1282);while(i<n)HEAP32[buffers+i++*4>>2]=0;return}var id=GL.getNewId(GL.buffers);buffer.name=id;GL.buffers[id]=buffer;HEAP32[buffers+i*4>>2]=id}}function _glGenFramebuffers(n,ids){for(var i=0;i<n;++i){var framebuffer=GLctx.createFramebuffer();if(!framebuffer){GL.recordError(1282);while(i<n)HEAP32[ids+i++*4>>2]=0;return}var id=GL.getNewId(GL.framebuffers);framebuffer.name=id;GL.framebuffers[id]=framebuffer;HEAP32[ids+i*4>>2]=id}}function _glGenRenderbuffers(n,renderbuffers){for(var i=0;i<n;i++){var renderbuffer=GLctx.createRenderbuffer();if(!renderbuffer){GL.recordError(1282);while(i<n)HEAP32[renderbuffers+i++*4>>2]=0;return}var id=GL.getNewId(GL.renderbuffers);renderbuffer.name=id;GL.renderbuffers[id]=renderbuffer;HEAP32[renderbuffers+i*4>>2]=id}}function _glGenTextures(n,textures){for(var i=0;i<n;i++){var texture=GLctx.createTexture();if(!texture){GL.recordError(1282);while(i<n)HEAP32[textures+i++*4>>2]=0;return}var id=GL.getNewId(GL.textures);texture.name=id;GL.textures[id]=texture;HEAP32[textures+i*4>>2]=id}}function _glGetAttribLocation(program,name){program=GL.programs[program];name=Pointer_stringify(name);return GLctx.getAttribLocation(program,name)}function _glGetError(){if(GL.lastError){var error=GL.lastError;GL.lastError=0;return error}else{return GLctx.getError()}}function emscriptenWebGLGet(name_,p,type){if(!p){GL.recordError(1281);return}var ret=undefined;switch(name_){case 36346:ret=1;break;case 36344:if(type!=="Integer"&&type!=="Integer64"){GL.recordError(1280)}return;case 36345:ret=0;break;case 34466:var formats=GLctx.getParameter(34467);ret=formats.length;break}if(ret===undefined){var result=GLctx.getParameter(name_);switch(typeof result){case"number":ret=result;break;case"boolean":ret=result?1:0;break;case"string":GL.recordError(1280);return;case"object":if(result===null){switch(name_){case 34964:case 35725:case 34965:case 36006:case 36007:case 32873:case 34068:{ret=0;break};default:{GL.recordError(1280);return}}}else if(result instanceof Float32Array||result instanceof Uint32Array||result instanceof Int32Array||result instanceof Array){for(var i=0;i<result.length;++i){switch(type){case"Integer":HEAP32[p+i*4>>2]=result[i];break;case"Float":HEAPF32[p+i*4>>2]=result[i];break;case"Boolean":HEAP8[p+i>>0]=result[i]?1:0;break;default:throw"internal glGet error, bad type: "+type}}return}else if(result instanceof WebGLBuffer||result instanceof WebGLProgram||result instanceof WebGLFramebuffer||result instanceof WebGLRenderbuffer||result instanceof WebGLTexture){ret=result.name|0}else{GL.recordError(1280);return}break;default:GL.recordError(1280);return}}switch(type){case"Integer64":tempI64=[ret>>>0,(tempDouble=ret,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[p>>2]=tempI64[0],HEAP32[p+4>>2]=tempI64[1];break;case"Integer":HEAP32[p>>2]=ret;break;case"Float":HEAPF32[p>>2]=ret;break;case"Boolean":HEAP8[p>>0]=ret?1:0;break;default:throw"internal glGet error, bad type: "+type}}function _glGetIntegerv(name_,p){emscriptenWebGLGet(name_,p,"Integer")}function _glGetProgramInfoLog(program,maxLength,length,infoLog){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";if(maxLength>0&&infoLog){var numBytesWrittenExclNull=stringToUTF8(log,infoLog,maxLength);if(length)HEAP32[length>>2]=numBytesWrittenExclNull}else{if(length)HEAP32[length>>2]=0}}function _glGetProgramiv(program,pname,p){if(!p){GL.recordError(1281);return}if(program>=GL.counter){GL.recordError(1281);return}var ptable=GL.programInfos[program];if(!ptable){GL.recordError(1282);return}if(pname==35716){var log=GLctx.getProgramInfoLog(GL.programs[program]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1}else if(pname==35719){HEAP32[p>>2]=ptable.maxUniformLength}else if(pname==35722){if(ptable.maxAttributeLength==-1){program=GL.programs[program];var numAttribs=GLctx.getProgramParameter(program,GLctx.ACTIVE_ATTRIBUTES);ptable.maxAttributeLength=0;for(var i=0;i<numAttribs;++i){var activeAttrib=GLctx.getActiveAttrib(program,i);ptable.maxAttributeLength=Math.max(ptable.maxAttributeLength,activeAttrib.name.length+1)}}HEAP32[p>>2]=ptable.maxAttributeLength}else if(pname==35381){if(ptable.maxUniformBlockNameLength==-1){program=GL.programs[program];var numBlocks=GLctx.getProgramParameter(program,GLctx.ACTIVE_UNIFORM_BLOCKS);ptable.maxUniformBlockNameLength=0;for(var i=0;i<numBlocks;++i){var activeBlockName=GLctx.getActiveUniformBlockName(program,i);ptable.maxUniformBlockNameLength=Math.max(ptable.maxUniformBlockNameLength,activeBlockName.length+1)}}HEAP32[p>>2]=ptable.maxUniformBlockNameLength}else{HEAP32[p>>2]=GLctx.getProgramParameter(GL.programs[program],pname)}}function _glGetShaderInfoLog(shader,maxLength,length,infoLog){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";if(maxLength>0&&infoLog){var numBytesWrittenExclNull=stringToUTF8(log,infoLog,maxLength);if(length)HEAP32[length>>2]=numBytesWrittenExclNull}else{if(length)HEAP32[length>>2]=0}}function _glGetShaderiv(shader,pname,p){if(!p){GL.recordError(1281);return}if(pname==35716){var log=GLctx.getShaderInfoLog(GL.shaders[shader]);if(log===null)log="(unknown error)";HEAP32[p>>2]=log.length+1}else if(pname==35720){var source=GLctx.getShaderSource(GL.shaders[shader]);var sourceLength=source===null||source.length==0?0:source.length+1;HEAP32[p>>2]=sourceLength}else{HEAP32[p>>2]=GLctx.getShaderParameter(GL.shaders[shader],pname)}}function _glGetUniformLocation(program,name){name=Pointer_stringify(name);var arrayOffset=0;if(name.indexOf("]",name.length-1)!==-1){var ls=name.lastIndexOf("[");var arrayIndex=name.slice(ls+1,-1);if(arrayIndex.length>0){arrayOffset=parseInt(arrayIndex);if(arrayOffset<0){return-1}}name=name.slice(0,ls)}var ptable=GL.programInfos[program];if(!ptable){return-1}var utable=ptable.uniforms;var uniformInfo=utable[name];if(uniformInfo&&arrayOffset<uniformInfo[0]){return uniformInfo[1]+arrayOffset}else{return-1}}function _glIsEnabled(x0){return GLctx["isEnabled"](x0)}function _glLinkProgram(program){GLctx.linkProgram(GL.programs[program]);GL.programInfos[program]=null;GL.populateUniformTable(program)}function _glPixelStorei(pname,param){if(pname==3333){GL.packAlignment=param}else if(pname==3317){GL.unpackAlignment=param}GLctx.pixelStorei(pname,param)}function emscriptenWebGLComputeImageSize(width,height,sizePerPixel,alignment){function roundedToNextMultipleOf(x,y){return Math.floor((x+y-1)/y)*y}var plainRowSize=width*sizePerPixel;var alignedRowSize=roundedToNextMultipleOf(plainRowSize,alignment);return height<=0?0:(height-1)*alignedRowSize+plainRowSize}function emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat){var sizePerPixel;var numChannels;switch(format){case 6406:case 6409:case 6402:numChannels=1;break;case 6410:numChannels=2;break;case 6407:case 35904:numChannels=3;break;case 6408:case 35906:numChannels=4;break;default:GL.recordError(1280);return null}switch(type){case 5121:sizePerPixel=numChannels*1;break;case 5123:case 36193:sizePerPixel=numChannels*2;break;case 5125:case 5126:sizePerPixel=numChannels*4;break;case 34042:sizePerPixel=4;break;case 33635:case 32819:case 32820:sizePerPixel=2;break;default:GL.recordError(1280);return null}var bytes=emscriptenWebGLComputeImageSize(width,height,sizePerPixel,GL.unpackAlignment);switch(type){case 5121:return HEAPU8.subarray(pixels,pixels+bytes);case 5126:return HEAPF32.subarray(pixels>>2,pixels+bytes>>2);case 5125:case 34042:return HEAPU32.subarray(pixels>>2,pixels+bytes>>2);case 5123:case 33635:case 32819:case 32820:case 36193:return HEAPU16.subarray(pixels>>1,pixels+bytes>>1);default:GL.recordError(1280);return null}}function _glReadPixels(x,y,width,height,format,type,pixels){var pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,format);if(!pixelData){GL.recordError(1280);return}GLctx.readPixels(x,y,width,height,format,type,pixelData)}function _glRenderbufferStorage(x0,x1,x2,x3){GLctx["renderbufferStorage"](x0,x1,x2,x3)}function _glShaderSource(shader,count,string,length){var source=GL.getSource(shader,count,string,length);GLctx.shaderSource(GL.shaders[shader],source)}function _glTexImage2D(target,level,internalFormat,width,height,border,format,type,pixels){var pixelData=null;if(pixels)pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,internalFormat);GLctx.texImage2D(target,level,internalFormat,width,height,border,format,type,pixelData)}function _glTexParameteri(x0,x1,x2){GLctx["texParameteri"](x0,x1,x2)}function _glTexSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels){var pixelData=null;if(pixels)pixelData=emscriptenWebGLGetTexPixelData(type,format,width,height,pixels,0);GLctx.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixelData)}function _glUniform1f(location,v0){GLctx.uniform1f(GL.uniforms[location],v0)}function _glUniform2fv(location,count,value){var view;if(2*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[2*count-1];for(var i=0;i<2*count;i+=2){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2]}}else{view=HEAPF32.subarray(value>>2,value+count*8>>2)}GLctx.uniform2fv(GL.uniforms[location],view)}function _glUniform4fv(location,count,value){var view;if(4*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[4*count-1];for(var i=0;i<4*count;i+=4){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2]}}else{view=HEAPF32.subarray(value>>2,value+count*16>>2)}GLctx.uniform4fv(GL.uniforms[location],view)}function _glUniformMatrix4fv(location,count,transpose,value){var view;if(16*count<=GL.MINI_TEMP_BUFFER_SIZE){view=GL.miniTempBufferViews[16*count-1];for(var i=0;i<16*count;i+=16){view[i]=HEAPF32[value+4*i>>2];view[i+1]=HEAPF32[value+(4*i+4)>>2];view[i+2]=HEAPF32[value+(4*i+8)>>2];view[i+3]=HEAPF32[value+(4*i+12)>>2];view[i+4]=HEAPF32[value+(4*i+16)>>2];view[i+5]=HEAPF32[value+(4*i+20)>>2];view[i+6]=HEAPF32[value+(4*i+24)>>2];view[i+7]=HEAPF32[value+(4*i+28)>>2];view[i+8]=HEAPF32[value+(4*i+32)>>2];view[i+9]=HEAPF32[value+(4*i+36)>>2];view[i+10]=HEAPF32[value+(4*i+40)>>2];view[i+11]=HEAPF32[value+(4*i+44)>>2];view[i+12]=HEAPF32[value+(4*i+48)>>2];view[i+13]=HEAPF32[value+(4*i+52)>>2];view[i+14]=HEAPF32[value+(4*i+56)>>2];view[i+15]=HEAPF32[value+(4*i+60)>>2]}}else{view=HEAPF32.subarray(value>>2,value+count*64>>2)}GLctx.uniformMatrix4fv(GL.uniforms[location],!!transpose,view)}function _glUseProgram(program){GLctx.useProgram(program?GL.programs[program]:null)}function _glVertexAttribPointer(index,size,type,normalized,stride,ptr){GLctx.vertexAttribPointer(index,size,type,!!normalized,stride,ptr)}function _glViewport(x0,x1,x2,x3){GLctx["viewport"](x0,x1,x2,x3)}var _llvm_fabs_f32=Math_abs;var _llvm_pow_f32=Math_pow;function _llvm_trap(){abort("trap!")}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}var PTHREAD_SPECIFIC={};function _pthread_getspecific(key){return PTHREAD_SPECIFIC[key]||0}var PTHREAD_SPECIFIC_NEXT_KEY=1;var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _pthread_key_create(key,destructor){if(key==0){return ERRNO_CODES.EINVAL}HEAP32[key>>2]=PTHREAD_SPECIFIC_NEXT_KEY;PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY]=0;PTHREAD_SPECIFIC_NEXT_KEY++;return 0}function _pthread_once(ptr,func){if(!_pthread_once.seen)_pthread_once.seen={};if(ptr in _pthread_once.seen)return;Module["dynCall_v"](func);_pthread_once.seen[ptr]=1}function _pthread_setspecific(key,value){if(!(key in PTHREAD_SPECIFIC)){return ERRNO_CODES.EINVAL}PTHREAD_SPECIFIC[key]=value;return 0}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}function _uuid_generate(out){var uuid=null;if(ENVIRONMENT_IS_NODE){try{var rb=function() {return ''};uuid=rb(16)}catch(e){}}else if(ENVIRONMENT_IS_WEB&&typeof window.crypto!=="undefined"&&typeof window.crypto.getRandomValues!=="undefined"){uuid=new Uint8Array(16);window.crypto.getRandomValues(uuid)}if(!uuid){uuid=new Array(16);var d=(new Date).getTime();for(var i=0;i<16;i++){var r=(d+Math.random()*256)%256|0;d=d/256|0;uuid[i]=r}}uuid[6]=uuid[6]&15|64;uuid[8]=uuid[8]&127|128;writeArrayToMemory(uuid,out)}function _uuid_unparse(uu,out,upper){var i=0;var uuid="xxxx-xx-xx-xx-xxxxxx".replace(/[x]/g,(function(c){var r=upper?HEAPU8[uu+i>>0].toString(16).toUpperCase():HEAPU8[uu+i>>0].toString(16);r=r.length===1?"0"+r:r;i++;return r}));stringToUTF8(uuid,out,37)}function _uuid_unparse_lower(uu,out){_uuid_unparse(uu,out)}InternalError=Module["InternalError"]=extendError(Error,"InternalError");embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");init_ClassHandle();init_RegisteredPointer();init_embind();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");init_emval();var GLctx;GL.init();DYNAMICTOP_PTR=staticAlloc(4);STACK_BASE=STACKTOP=alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:(function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output});function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}function invoke_di(index,a1){try{return Module["dynCall_di"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_dii(index,a1,a2){try{return Module["dynCall_dii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_i(index){try{return Module["dynCall_i"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iid(index,a1,a2){try{return Module["dynCall_iid"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iii(index,a1,a2){try{return Module["dynCall_iii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiid(index,a1,a2,a3){try{return Module["dynCall_iiid"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiiid(index,a1,a2,a3,a4){try{return Module["dynCall_iiiid"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiiidii(index,a1,a2,a3,a4,a5,a6){try{return Module["dynCall_iiiidii"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiiii(index,a1,a2,a3,a4){try{return Module["dynCall_iiiii"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6){try{return Module["dynCall_iiiiiii"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_v(index){try{Module["dynCall_v"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vi(index,a1){try{Module["dynCall_vi"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vid(index,a1,a2){try{Module["dynCall_vid"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vidddd(index,a1,a2,a3,a4,a5){try{Module["dynCall_vidddd"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vii(index,a1,a2){try{Module["dynCall_vii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viid(index,a1,a2,a3){try{Module["dynCall_viid"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viidii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viidii"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viii(index,a1,a2,a3){try{Module["dynCall_viii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiii(index,a1,a2,a3,a4){try{Module["dynCall_viiii"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiiii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiiiidi(index,a1,a2,a3,a4,a5,a6,a7){try{Module["dynCall_viiiiidi"](index,a1,a2,a3,a4,a5,a6,a7)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7){try{Module["dynCall_viiiiiii"](index,a1,a2,a3,a4,a5,a6,a7)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8){try{Module["dynCall_viiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){try{Module["dynCall_viiiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity,"byteLength":byteLength};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"invoke_di":invoke_di,"invoke_dii":invoke_dii,"invoke_i":invoke_i,"invoke_ii":invoke_ii,"invoke_iid":invoke_iid,"invoke_iii":invoke_iii,"invoke_iiid":invoke_iiid,"invoke_iiii":invoke_iiii,"invoke_iiiid":invoke_iiiid,"invoke_iiiidii":invoke_iiiidii,"invoke_iiiii":invoke_iiiii,"invoke_iiiiiii":invoke_iiiiiii,"invoke_v":invoke_v,"invoke_vi":invoke_vi,"invoke_vid":invoke_vid,"invoke_vidddd":invoke_vidddd,"invoke_vii":invoke_vii,"invoke_viid":invoke_viid,"invoke_viidii":invoke_viidii,"invoke_viii":invoke_viii,"invoke_viiii":invoke_viiii,"invoke_viiiii":invoke_viiiii,"invoke_viiiiidi":invoke_viiiiidi,"invoke_viiiiii":invoke_viiiiii,"invoke_viiiiiii":invoke_viiiiiii,"invoke_viiiiiiii":invoke_viiiiiiii,"invoke_viiiiiiiiii":invoke_viiiiiiiiii,"ClassHandle":ClassHandle,"ClassHandle_clone":ClassHandle_clone,"ClassHandle_delete":ClassHandle_delete,"ClassHandle_deleteLater":ClassHandle_deleteLater,"ClassHandle_isAliasOf":ClassHandle_isAliasOf,"ClassHandle_isDeleted":ClassHandle_isDeleted,"RegisteredClass":RegisteredClass,"RegisteredPointer":RegisteredPointer,"RegisteredPointer_deleteObject":RegisteredPointer_deleteObject,"RegisteredPointer_destructor":RegisteredPointer_destructor,"RegisteredPointer_fromWireType":RegisteredPointer_fromWireType,"RegisteredPointer_getPointee":RegisteredPointer_getPointee,"__ZSt18uncaught_exceptionv":__ZSt18uncaught_exceptionv,"___cxa_allocate_exception":___cxa_allocate_exception,"___cxa_begin_catch":___cxa_begin_catch,"___cxa_find_matching_catch":___cxa_find_matching_catch,"___cxa_pure_virtual":___cxa_pure_virtual,"___cxa_throw":___cxa_throw,"___gxx_personality_v0":___gxx_personality_v0,"___resumeException":___resumeException,"___setErrNo":___setErrNo,"___syscall140":___syscall140,"___syscall146":___syscall146,"___syscall6":___syscall6,"__embind_finalize_value_object":__embind_finalize_value_object,"__embind_register_bool":__embind_register_bool,"__embind_register_class":__embind_register_class,"__embind_register_class_constructor":__embind_register_class_constructor,"__embind_register_class_function":__embind_register_class_function,"__embind_register_class_property":__embind_register_class_property,"__embind_register_emval":__embind_register_emval,"__embind_register_enum":__embind_register_enum,"__embind_register_enum_value":__embind_register_enum_value,"__embind_register_float":__embind_register_float,"__embind_register_integer":__embind_register_integer,"__embind_register_memory_view":__embind_register_memory_view,"__embind_register_std_string":__embind_register_std_string,"__embind_register_std_wstring":__embind_register_std_wstring,"__embind_register_value_object":__embind_register_value_object,"__embind_register_value_object_field":__embind_register_value_object_field,"__embind_register_void":__embind_register_void,"__emval_decref":__emval_decref,"__emval_register":__emval_register,"_abort":_abort,"_embind_repr":_embind_repr,"_emscripten_asm_const_d":_emscripten_asm_const_d,"_emscripten_asm_const_dii":_emscripten_asm_const_dii,"_emscripten_asm_const_i":_emscripten_asm_const_i,"_emscripten_asm_const_ii":_emscripten_asm_const_ii,"_emscripten_asm_const_iiddidd":_emscripten_asm_const_iiddidd,"_emscripten_asm_const_iii":_emscripten_asm_const_iii,"_emscripten_asm_const_iiii":_emscripten_asm_const_iiii,"_emscripten_asm_const_iiiiii":_emscripten_asm_const_iiiiii,"_emscripten_asm_const_iiiiiii":_emscripten_asm_const_iiiiiii,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_glAttachShader":_glAttachShader,"_glBindBuffer":_glBindBuffer,"_glBindFramebuffer":_glBindFramebuffer,"_glBindRenderbuffer":_glBindRenderbuffer,"_glBindTexture":_glBindTexture,"_glBlendFuncSeparate":_glBlendFuncSeparate,"_glBufferData":_glBufferData,"_glCheckFramebufferStatus":_glCheckFramebufferStatus,"_glClear":_glClear,"_glClearColor":_glClearColor,"_glCompileShader":_glCompileShader,"_glCreateProgram":_glCreateProgram,"_glCreateShader":_glCreateShader,"_glDeleteBuffers":_glDeleteBuffers,"_glDeleteFramebuffers":_glDeleteFramebuffers,"_glDeleteProgram":_glDeleteProgram,"_glDeleteRenderbuffers":_glDeleteRenderbuffers,"_glDeleteShader":_glDeleteShader,"_glDeleteTextures":_glDeleteTextures,"_glDetachShader":_glDetachShader,"_glDisable":_glDisable,"_glDisableVertexAttribArray":_glDisableVertexAttribArray,"_glDrawElements":_glDrawElements,"_glEnable":_glEnable,"_glEnableVertexAttribArray":_glEnableVertexAttribArray,"_glFramebufferRenderbuffer":_glFramebufferRenderbuffer,"_glFramebufferTexture2D":_glFramebufferTexture2D,"_glGenBuffers":_glGenBuffers,"_glGenFramebuffers":_glGenFramebuffers,"_glGenRenderbuffers":_glGenRenderbuffers,"_glGenTextures":_glGenTextures,"_glGetAttribLocation":_glGetAttribLocation,"_glGetError":_glGetError,"_glGetIntegerv":_glGetIntegerv,"_glGetProgramInfoLog":_glGetProgramInfoLog,"_glGetProgramiv":_glGetProgramiv,"_glGetShaderInfoLog":_glGetShaderInfoLog,"_glGetShaderiv":_glGetShaderiv,"_glGetUniformLocation":_glGetUniformLocation,"_glIsEnabled":_glIsEnabled,"_glLinkProgram":_glLinkProgram,"_glPixelStorei":_glPixelStorei,"_glReadPixels":_glReadPixels,"_glRenderbufferStorage":_glRenderbufferStorage,"_glShaderSource":_glShaderSource,"_glTexImage2D":_glTexImage2D,"_glTexParameteri":_glTexParameteri,"_glTexSubImage2D":_glTexSubImage2D,"_glUniform1f":_glUniform1f,"_glUniform2fv":_glUniform2fv,"_glUniform4fv":_glUniform4fv,"_glUniformMatrix4fv":_glUniformMatrix4fv,"_glUseProgram":_glUseProgram,"_glVertexAttribPointer":_glVertexAttribPointer,"_glViewport":_glViewport,"_llvm_fabs_f32":_llvm_fabs_f32,"_llvm_pow_f32":_llvm_pow_f32,"_llvm_trap":_llvm_trap,"_pthread_getspecific":_pthread_getspecific,"_pthread_key_create":_pthread_key_create,"_pthread_once":_pthread_once,"_pthread_setspecific":_pthread_setspecific,"_uuid_generate":_uuid_generate,"_uuid_unparse":_uuid_unparse,"_uuid_unparse_lower":_uuid_unparse_lower,"constNoSmartPtrRawPointerToWireType":constNoSmartPtrRawPointerToWireType,"count_emval_handles":count_emval_handles,"craftInvokerFunction":craftInvokerFunction,"createNamedFunction":createNamedFunction,"downcastPointer":downcastPointer,"embind__requireFunction":embind__requireFunction,"embind_init_charCodes":embind_init_charCodes,"emscriptenWebGLComputeImageSize":emscriptenWebGLComputeImageSize,"emscriptenWebGLGet":emscriptenWebGLGet,"emscriptenWebGLGetTexPixelData":emscriptenWebGLGetTexPixelData,"ensureOverloadTable":ensureOverloadTable,"enumReadValueFromPointer":enumReadValueFromPointer,"exposePublicSymbol":exposePublicSymbol,"extendError":extendError,"floatReadValueFromPointer":floatReadValueFromPointer,"flushPendingDeletes":flushPendingDeletes,"flush_NO_FILESYSTEM":flush_NO_FILESYSTEM,"genericPointerToWireType":genericPointerToWireType,"getBasestPointer":getBasestPointer,"getInheritedInstance":getInheritedInstance,"getInheritedInstanceCount":getInheritedInstanceCount,"getLiveInheritedInstances":getLiveInheritedInstances,"getShiftFromSize":getShiftFromSize,"getTypeName":getTypeName,"get_first_emval":get_first_emval,"heap32VectorToArray":heap32VectorToArray,"init_ClassHandle":init_ClassHandle,"init_RegisteredPointer":init_RegisteredPointer,"init_embind":init_embind,"init_emval":init_emval,"integerReadValueFromPointer":integerReadValueFromPointer,"makeClassHandle":makeClassHandle,"makeLegalFunctionName":makeLegalFunctionName,"new_":new_,"nonConstNoSmartPtrRawPointerToWireType":nonConstNoSmartPtrRawPointerToWireType,"readLatin1String":readLatin1String,"registerType":registerType,"replacePublicSymbol":replacePublicSymbol,"requireRegisteredType":requireRegisteredType,"runDestructor":runDestructor,"runDestructors":runDestructors,"setDelayFunction":setDelayFunction,"shallowCopyInternalPointer":shallowCopyInternalPointer,"simpleReadValueFromPointer":simpleReadValueFromPointer,"throwBindingError":throwBindingError,"throwInstanceAlreadyDeleted":throwInstanceAlreadyDeleted,"throwInternalError":throwInternalError,"throwUnboundTypeError":throwUnboundTypeError,"upcastPointer":upcastPointer,"validateThis":validateThis,"whenDependentTypesAreResolved":whenDependentTypesAreResolved,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"cttz_i8":cttz_i8};// EMSCRIPTEN_START_ASM
var asm=(/** @suppress {uselessCode} */ function(global,env,buffer) {
"almost asm";var a=global.Int8Array;var b=new a(buffer);var c=global.Int16Array;var d=new c(buffer);var e=global.Int32Array;var f=new e(buffer);var g=global.Uint8Array;var h=new g(buffer);var i=global.Uint16Array;var j=new i(buffer);var k=global.Uint32Array;var l=new k(buffer);var m=global.Float32Array;var n=new m(buffer);var o=global.Float64Array;var p=new o(buffer);var q=global.byteLength;var r=env.DYNAMICTOP_PTR|0;var s=env.tempDoublePtr|0;var t=env.ABORT|0;var u=env.STACKTOP|0;var v=env.STACK_MAX|0;var w=env.cttz_i8|0;var x=0;var y=0;var z=0;var A=0;var B=global.NaN,C=global.Infinity;var D=0,E=0,F=0,G=0,H=0.0;var I=0;var J=global.Math.floor;var K=global.Math.abs;var L=global.Math.sqrt;var M=global.Math.pow;var N=global.Math.cos;var O=global.Math.sin;var P=global.Math.tan;var Q=global.Math.acos;var R=global.Math.asin;var S=global.Math.atan;var T=global.Math.atan2;var U=global.Math.exp;var V=global.Math.log;var W=global.Math.ceil;var X=global.Math.imul;var Y=global.Math.min;var Z=global.Math.max;var _=global.Math.clz32;var $=env.abort;var aa=env.assert;var ba=env.enlargeMemory;var ca=env.getTotalMemory;var da=env.abortOnCannotGrowMemory;var ea=env.invoke_di;var fa=env.invoke_dii;var ga=env.invoke_i;var ha=env.invoke_ii;var ia=env.invoke_iid;var ja=env.invoke_iii;var ka=env.invoke_iiid;var la=env.invoke_iiii;var ma=env.invoke_iiiid;var na=env.invoke_iiiidii;var oa=env.invoke_iiiii;var pa=env.invoke_iiiiiii;var qa=env.invoke_v;var ra=env.invoke_vi;var sa=env.invoke_vid;var ta=env.invoke_vidddd;var ua=env.invoke_vii;var va=env.invoke_viid;var wa=env.invoke_viidii;var xa=env.invoke_viii;var ya=env.invoke_viiii;var za=env.invoke_viiiii;var Aa=env.invoke_viiiiidi;var Ba=env.invoke_viiiiii;var Ca=env.invoke_viiiiiii;var Da=env.invoke_viiiiiiii;var Ea=env.invoke_viiiiiiiiii;var Fa=env.ClassHandle;var Ga=env.ClassHandle_clone;var Ha=env.ClassHandle_delete;var Ia=env.ClassHandle_deleteLater;var Ja=env.ClassHandle_isAliasOf;var Ka=env.ClassHandle_isDeleted;var La=env.RegisteredClass;var Ma=env.RegisteredPointer;var Na=env.RegisteredPointer_deleteObject;var Oa=env.RegisteredPointer_destructor;var Pa=env.RegisteredPointer_fromWireType;var Qa=env.RegisteredPointer_getPointee;var Ra=env.__ZSt18uncaught_exceptionv;var Sa=env.___cxa_allocate_exception;var Ta=env.___cxa_begin_catch;var Ua=env.___cxa_find_matching_catch;var Va=env.___cxa_pure_virtual;var Wa=env.___cxa_throw;var Xa=env.___gxx_personality_v0;var Ya=env.___resumeException;var Za=env.___setErrNo;var _a=env.___syscall140;var $a=env.___syscall146;var ab=env.___syscall6;var bb=env.__embind_finalize_value_object;var cb=env.__embind_register_bool;var db=env.__embind_register_class;var eb=env.__embind_register_class_constructor;var fb=env.__embind_register_class_function;var gb=env.__embind_register_class_property;var hb=env.__embind_register_emval;var ib=env.__embind_register_enum;var jb=env.__embind_register_enum_value;var kb=env.__embind_register_float;var lb=env.__embind_register_integer;var mb=env.__embind_register_memory_view;var nb=env.__embind_register_std_string;var ob=env.__embind_register_std_wstring;var pb=env.__embind_register_value_object;var qb=env.__embind_register_value_object_field;var rb=env.__embind_register_void;var sb=env.__emval_decref;var tb=env.__emval_register;var ub=env._abort;var vb=env._embind_repr;var wb=env._emscripten_asm_const_d;var xb=env._emscripten_asm_const_dii;var yb=env._emscripten_asm_const_i;var zb=env._emscripten_asm_const_ii;var Ab=env._emscripten_asm_const_iiddidd;var Bb=env._emscripten_asm_const_iii;var Cb=env._emscripten_asm_const_iiii;var Db=env._emscripten_asm_const_iiiiii;var Eb=env._emscripten_asm_const_iiiiiii;var Fb=env._emscripten_memcpy_big;var Gb=env._glAttachShader;var Hb=env._glBindBuffer;var Ib=env._glBindFramebuffer;var Jb=env._glBindRenderbuffer;var Kb=env._glBindTexture;var Lb=env._glBlendFuncSeparate;var Mb=env._glBufferData;var Nb=env._glCheckFramebufferStatus;var Ob=env._glClear;var Pb=env._glClearColor;var Qb=env._glCompileShader;var Rb=env._glCreateProgram;var Sb=env._glCreateShader;var Tb=env._glDeleteBuffers;var Ub=env._glDeleteFramebuffers;var Vb=env._glDeleteProgram;var Wb=env._glDeleteRenderbuffers;var Xb=env._glDeleteShader;var Yb=env._glDeleteTextures;var Zb=env._glDetachShader;var _b=env._glDisable;var $b=env._glDisableVertexAttribArray;var ac=env._glDrawElements;var bc=env._glEnable;var cc=env._glEnableVertexAttribArray;var dc=env._glFramebufferRenderbuffer;var ec=env._glFramebufferTexture2D;var fc=env._glGenBuffers;var gc=env._glGenFramebuffers;var hc=env._glGenRenderbuffers;var ic=env._glGenTextures;var jc=env._glGetAttribLocation;var kc=env._glGetError;var lc=env._glGetIntegerv;var mc=env._glGetProgramInfoLog;var nc=env._glGetProgramiv;var oc=env._glGetShaderInfoLog;var pc=env._glGetShaderiv;var qc=env._glGetUniformLocation;var rc=env._glIsEnabled;var sc=env._glLinkProgram;var tc=env._glPixelStorei;var uc=env._glReadPixels;var vc=env._glRenderbufferStorage;var wc=env._glShaderSource;var xc=env._glTexImage2D;var yc=env._glTexParameteri;var zc=env._glTexSubImage2D;var Ac=env._glUniform1f;var Bc=env._glUniform2fv;var Cc=env._glUniform4fv;var Dc=env._glUniformMatrix4fv;var Ec=env._glUseProgram;var Fc=env._glVertexAttribPointer;var Gc=env._glViewport;var Hc=env._llvm_fabs_f32;var Ic=env._llvm_pow_f32;var Jc=env._llvm_trap;var Kc=env._pthread_getspecific;var Lc=env._pthread_key_create;var Mc=env._pthread_once;var Nc=env._pthread_setspecific;var Oc=env._uuid_generate;var Pc=env._uuid_unparse;var Qc=env._uuid_unparse_lower;var Rc=env.constNoSmartPtrRawPointerToWireType;var Sc=env.count_emval_handles;var Tc=env.craftInvokerFunction;var Uc=env.createNamedFunction;var Vc=env.downcastPointer;var Wc=env.embind__requireFunction;var Xc=env.embind_init_charCodes;var Yc=env.emscriptenWebGLComputeImageSize;var Zc=env.emscriptenWebGLGet;var _c=env.emscriptenWebGLGetTexPixelData;var $c=env.ensureOverloadTable;var ad=env.enumReadValueFromPointer;var bd=env.exposePublicSymbol;var cd=env.extendError;var dd=env.floatReadValueFromPointer;var ed=env.flushPendingDeletes;var fd=env.flush_NO_FILESYSTEM;var gd=env.genericPointerToWireType;var hd=env.getBasestPointer;var id=env.getInheritedInstance;var jd=env.getInheritedInstanceCount;var kd=env.getLiveInheritedInstances;var ld=env.getShiftFromSize;var md=env.getTypeName;var nd=env.get_first_emval;var od=env.heap32VectorToArray;var pd=env.init_ClassHandle;var qd=env.init_RegisteredPointer;var rd=env.init_embind;var sd=env.init_emval;var td=env.integerReadValueFromPointer;var ud=env.makeClassHandle;var vd=env.makeLegalFunctionName;var wd=env.new_;var xd=env.nonConstNoSmartPtrRawPointerToWireType;var yd=env.readLatin1String;var zd=env.registerType;var Ad=env.replacePublicSymbol;var Bd=env.requireRegisteredType;var Cd=env.runDestructor;var Dd=env.runDestructors;var Ed=env.setDelayFunction;var Fd=env.shallowCopyInternalPointer;var Gd=env.simpleReadValueFromPointer;var Hd=env.throwBindingError;var Id=env.throwInstanceAlreadyDeleted;var Jd=env.throwInternalError;var Kd=env.throwUnboundTypeError;var Ld=env.upcastPointer;var Md=env.validateThis;var Nd=env.whenDependentTypesAreResolved;var Od=0.0;function Pd(newBuffer){if(q(newBuffer)&16777215||q(newBuffer)<=16777215||q(newBuffer)>2147483648)return false;b=new a(newBuffer);d=new c(newBuffer);f=new e(newBuffer);h=new g(newBuffer);j=new i(newBuffer);l=new k(newBuffer);n=new m(newBuffer);p=new o(newBuffer);buffer=newBuffer;return true}
// EMSCRIPTEN_START_FUNCS
function pe(a){a=a|0;var b=0;b=u;u=u+a|0;u=u+15&-16;return b|0}function qe(){return u|0}function re(a){a=a|0;u=a}function se(a,b){a=a|0;b=b|0;u=a;v=b}function te(a,b){a=a|0;b=b|0;if(!x){x=a;y=b}}function ue(a){a=a|0;I=a}function ve(){return I|0}function we(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;xe(a);f[a>>2]=3272;ye(a+4|0,b,c,d,d);return}function xe(a){a=a|0;f[a>>2]=3304;return}function ye(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Je(a,b,4);b=a+16|0;f[b>>2]=f[c>>2];f[b+4>>2]=f[c+4>>2];f[b+8>>2]=f[c+8>>2];b=d;d=f[b+4>>2]|0;c=a+28|0;f[c>>2]=f[b>>2];f[c+4>>2]=d;c=e;d=f[c+4>>2]|0;e=a+36|0;f[e>>2]=f[c>>2];f[e+4>>2]=d;return}function ze(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=f[d+4>>2]|0;b=a+40|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;return}function Ae(a){a=a|0;return Sv(a+32|0,a+40|0)|0}function Be(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(44,47264)|0;if(!c)c=0;else Ce(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];De(a,c,d);u=g;return}function Ce(a,b){a=a|0;b=b|0;Ke(a,b);a=a+16|0;b=b+16|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];f[a+12>>2]=f[b+12>>2];f[a+16>>2]=f[b+16>>2];f[a+20>>2]=f[b+20>>2];f[a+24>>2]=f[b+24>>2];return}function De(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3336;f[c+12>>2]=b;f[a+4>>2]=c;return}function Ee(a){a=a|0;f[a>>2]=3272;Le(a+4|0);He(a);return}function Fe(a){a=a|0;Ee(a);$Y(a);return}function Ge(a){a=a|0;return a+4|0}function He(a){a=a|0;return}function Ie(a){a=a|0;Jc()}function Je(a,b,c){a=a|0;b=b|0;c=c|0;iZ(a,b);f[a+12>>2]=c;return}function Ke(a,b){a=a|0;b=b|0;iZ(a,b);f[a+12>>2]=f[b+12>>2];return}function Le(a){a=a|0;jZ(a);return}function Me(a){a=a|0;NY(a);$Y(a);return}function Ne(a){a=a|0;a=f[a+12>>2]|0;if(a|0){Le(a);$Y(a)}return}function Oe(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==11609?a+12|0:0)|0}function Pe(a){a=a|0;$Y(a);return}function Qe(a){a=a|0;f[a>>2]=3364;Le(a+4|0);He(a);return}function Re(a){a=a|0;Qe(a);$Y(a);return}function Se(a){a=a|0;return a+4|0}function Te(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;Uv(d,a+36|0,b);b=a+20|0;f[b>>2]=f[d>>2];f[b+4>>2]=f[d+4>>2];f[b+8>>2]=f[d+8>>2];f[b+12>>2]=f[d+12>>2];u=c;return}function Ue(a){a=a|0;return (Xv(a+20|0)|0)^1|0}function Ve(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(32,47264)|0;if(!c)c=0;else We(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];Xe(a,c,d);u=g;return}function We(a,b){a=a|0;b=b|0;Ke(a,b);a=a+16|0;b=b+16|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];f[a+12>>2]=f[b+12>>2];return}function Xe(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3396;f[c+12>>2]=b;f[a+4>>2]=c;return}function Ye(a){a=a|0;NY(a);$Y(a);return}function Ze(a){a=a|0;a=f[a+12>>2]|0;if(a|0){Le(a);$Y(a)}return}function _e(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==11653?a+12|0:0)|0}function $e(a){a=a|0;$Y(a);return}function af(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=u;u=u+16|0;e=d;xe(a);f[a>>2]=3364;Uv(e,c,c);bf(a+4|0,b,e);e=c;b=f[e+4>>2]|0;c=a+36|0;f[c>>2]=f[e>>2];f[c+4>>2]=b;u=d;return}function bf(a,b,c){a=a|0;b=b|0;c=c|0;Je(a,b,2);b=a+16|0;f[b>>2]=f[c>>2];f[b+4>>2]=f[c+4>>2];f[b+8>>2]=f[c+8>>2];f[b+12>>2]=f[c+12>>2];return}function cf(a){a=a|0;f[a>>2]=3424;lf(a+4|0);He(a);return}function df(a){a=a|0;cf(a);$Y(a);return}function ef(a){a=a|0;return a+4|0}function ff(a,b){a=a|0;b=b|0;var c=0,d=0;c=a+36|0;d=f[c>>2]|0;if((d|0)==(f[a+40>>2]|0))vf(a+32|0,b);else{a=b;b=f[a+4>>2]|0;f[d>>2]=f[a>>2];f[d+4>>2]=b;f[c>>2]=(f[c>>2]|0)+8}return}function gf(a){a=a|0;return 1}function hf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(44,47264)|0;if(!c)c=0;else jf(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];kf(a,c,d);u=g;return}function jf(a,b){a=a|0;b=b|0;var c=0,d=0;Ke(a,b);c=a+16|0;d=b+16|0;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];f[c+8>>2]=f[d+8>>2];rf(a+28|0,b+28|0);f[a+40>>2]=f[b+40>>2];return}function kf(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3456;f[c+12>>2]=b;f[a+4>>2]=c;return}function lf(a){a=a|0;mf(a+28|0);Le(a);return}function mf(a){a=a|0;var b=0,c=0,d=0;c=f[a>>2]|0;if(c|0){a=a+4|0;b=f[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-8|0;f[a>>2]=d;b=d}$Y(c)}return}function nf(a){a=a|0;NY(a);$Y(a);return}function of(a){a=a|0;a=f[a+12>>2]|0;if(a|0){lf(a);$Y(a)}return}function pf(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==11807?a+12|0:0)|0}function qf(a){a=a|0;$Y(a);return}function rf(a,b){a=a|0;b=b|0;var c=0,d=0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;c=b+4|0;d=(f[c>>2]|0)-(f[b>>2]|0)>>3;if(d|0){sf(a,d);tf(a,f[b>>2]|0,f[c>>2]|0,d)}return}function sf(a,b){a=a|0;b=b|0;var c=0;if((uf(a)|0)>>>0<b>>>0)MY(a);if(b>>>0>536870911){b=Sa(8)|0;eZ(b,38407);f[b>>2]=11336;Wa(b|0,3056,442)}else{c=XY(b<<3)|0;f[a+4>>2]=c;f[a>>2]=c;f[a+8>>2]=c+(b<<3);return}}function tf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=a+4|0;a=c-b|0;if((a|0)>0){K_(f[d>>2]|0,b|0,a|0)|0;f[d>>2]=(f[d>>2]|0)+(a>>>3<<3)}return}function uf(a){a=a|0;return 536870911}function vf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;c=h;d=a+4|0;e=((f[d>>2]|0)-(f[a>>2]|0)>>3)+1|0;g=uf(a)|0;if(g>>>0<e>>>0)MY(a);else{i=f[a>>2]|0;k=(f[a+8>>2]|0)-i|0;j=k>>2;wf(c,k>>3>>>0<g>>>1>>>0?(j>>>0<e>>>0?e:j):g,(f[d>>2]|0)-i>>3,a+8|0);g=c+8|0;d=f[b+4>>2]|0;e=f[g>>2]|0;f[e>>2]=f[b>>2];f[e+4>>2]=d;f[g>>2]=(f[g>>2]|0)+8;xf(a,c);yf(c);u=h;return}}function wf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>536870911){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<3)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<3)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<3);return}function xf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[a>>2]|0;h=a+4|0;g=b+4|0;e=(f[h>>2]|0)-d|0;c=(f[g>>2]|0)+(0-(e>>3)<<3)|0;f[g>>2]=c;if((e|0)>0){K_(c|0,d|0,e|0)|0;d=g;c=f[g>>2]|0}else d=g;g=f[a>>2]|0;f[a>>2]=c;f[d>>2]=g;g=b+8|0;e=f[h>>2]|0;f[h>>2]=f[g>>2];f[g>>2]=e;g=a+8|0;h=b+12|0;a=f[g>>2]|0;f[g>>2]=f[h>>2];f[h>>2]=a;f[b>>2]=f[d>>2];return}function yf(a){a=a|0;var b=0,c=0,d=0,e=0;b=f[a+4>>2]|0;c=a+8|0;d=f[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-8|0;f[c>>2]=e;d=e}a=f[a>>2]|0;if(a|0)$Y(a);return}function zf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var g=0,h=0,i=0,j=0,k=0;g=u;u=u+32|0;h=g+8|0;i=g;xe(a);f[a>>2]=3424;k=d;j=f[k+4>>2]|0;d=i;f[d>>2]=f[k>>2];f[d+4>>2]=j;f[h>>2]=0;f[h+4>>2]=0;f[h+8>>2]=0;sf(h,1);Af(h,i,i+8|0,1);Bf(a+4|0,b,c,h,e);mf(h);u=g;return}function Af(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0;a=a+4|0;while(1){if((b|0)==(c|0))break;g=b;e=f[g+4>>2]|0;d=f[a>>2]|0;f[d>>2]=f[g>>2];f[d+4>>2]=e;f[a>>2]=(f[a>>2]|0)+8;b=b+8|0}return}function Bf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;Je(a,b,5);b=a+16|0;f[b>>2]=f[c>>2];f[b+4>>2]=f[c+4>>2];f[b+8>>2]=f[c+8>>2];rf(a+28|0,d);n[a+40>>2]=e;return}function Cf(a){a=a|0;f[a>>2]=3484;Le(a+4|0);He(a);return}function Df(a){a=a|0;Cf(a);$Y(a);return}function Ef(a){a=a|0;return a+4|0}function Ff(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=f[d+4>>2]|0;b=a+40|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;return}function Gf(a){a=a|0;return 1}function Hf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(44,47264)|0;if(!c)c=0;else If(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];Jf(a,c,d);u=g;return}function If(a,b){a=a|0;b=b|0;Ke(a,b);a=a+16|0;b=b+16|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];f[a+12>>2]=f[b+12>>2];f[a+16>>2]=f[b+16>>2];f[a+20>>2]=f[b+20>>2];f[a+24>>2]=f[b+24>>2];return}function Jf(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3516;f[c+12>>2]=b;f[a+4>>2]=c;return}function Kf(a){a=a|0;NY(a);$Y(a);return}function Lf(a){a=a|0;a=f[a+12>>2]|0;if(a|0){Le(a);$Y(a)}return}function Mf(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==11966?a+12|0:0)|0}function Nf(a){a=a|0;$Y(a);return}function Of(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;xe(a);f[a>>2]=3484;Pf(a+4|0,b,c,d,d);return}function Pf(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Je(a,b,3);b=a+16|0;f[b>>2]=f[c>>2];f[b+4>>2]=f[c+4>>2];f[b+8>>2]=f[c+8>>2];b=d;d=f[b+4>>2]|0;c=a+28|0;f[c>>2]=f[b>>2];f[c+4>>2]=d;c=e;d=f[c+4>>2]|0;e=a+36|0;f[e>>2]=f[c>>2];f[e+4>>2]=d;return}function Qf(a){a=a|0;f[a>>2]=3544;Le(a+4|0);He(a);return}function Rf(a){a=a|0;Qf(a);$Y(a);return}function Sf(a){a=a|0;return a+4|0}function Tf(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0.0,g=0,h=0;c=u;u=u+16|0;h=c;g=a+48|0;e=+K(+(+n[b>>2]-+n[g>>2]));d=+K(+(+n[b+4>>2]-+n[a+52>>2]));zv(h,g,b);g=f[h+4>>2]|0;b=a+32|0;f[b>>2]=f[h>>2];f[b+4>>2]=g;n[a+40>>2]=e/1.4142135381698608;n[a+44>>2]=d/1.4142135381698608;u=c;return}function Uf(a){a=a|0;return 1}function Vf(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(44,47264)|0;if(!c)c=0;else Wf(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];Xf(a,c,d);u=g;return}function Wf(a,b){a=a|0;b=b|0;Ke(a,b);a=a+16|0;b=b+16|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];f[a+12>>2]=f[b+12>>2];f[a+16>>2]=f[b+16>>2];f[a+20>>2]=f[b+20>>2];f[a+24>>2]=f[b+24>>2];return}function Xf(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3576;f[c+12>>2]=b;f[a+4>>2]=c;return}function Yf(a){a=a|0;NY(a);$Y(a);return}function Zf(a){a=a|0;a=f[a+12>>2]|0;if(a|0){Le(a);$Y(a)}return}function _f(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==12120?a+12|0:0)|0}function $f(a){a=a|0;$Y(a);return}function ag(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;xe(a);f[a>>2]=3544;bg(a+4|0,b,c,d,0.0,0.0);b=d;c=f[b+4>>2]|0;d=a+48|0;f[d>>2]=f[b>>2];f[d+4>>2]=c;return}function bg(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;g=+g;Je(a,b,6);b=a+16|0;f[b>>2]=f[c>>2];f[b+4>>2]=f[c+4>>2];f[b+8>>2]=f[c+8>>2];b=d;c=f[b+4>>2]|0;d=a+28|0;f[d>>2]=f[b>>2];f[d+4>>2]=c;n[a+36>>2]=e;n[a+40>>2]=g;return}function cg(a){a=a|0;f[a>>2]=3604;Le(a+4|0);He(a);return}function dg(a){a=a|0;cg(a);$Y(a);return}function eg(a){a=a|0;return a+4|0}function fg(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;Uv(d,a+48|0,b);b=a+32|0;f[b>>2]=f[d>>2];f[b+4>>2]=f[d+4>>2];f[b+8>>2]=f[d+8>>2];f[b+12>>2]=f[d+12>>2];u=c;return}function gg(a){a=a|0;return 1}function hg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(44,47264)|0;if(!c)c=0;else ig(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];jg(a,c,d);u=g;return}function ig(a,b){a=a|0;b=b|0;Ke(a,b);a=a+16|0;b=b+16|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];f[a+12>>2]=f[b+12>>2];f[a+16>>2]=f[b+16>>2];f[a+20>>2]=f[b+20>>2];f[a+24>>2]=f[b+24>>2];return}function jg(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3636;f[c+12>>2]=b;f[a+4>>2]=c;return}function kg(a){a=a|0;NY(a);$Y(a);return}function lg(a){a=a|0;a=f[a+12>>2]|0;if(a|0){Le(a);$Y(a)}return}function mg(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==12274?a+12|0:0)|0}function ng(a){a=a|0;$Y(a);return}function og(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0;e=u;u=u+16|0;g=e;xe(a);f[a>>2]=3604;Uv(g,d,d);pg(a+4|0,b,c,g);b=d;c=f[b+4>>2]|0;d=a+48|0;f[d>>2]=f[b>>2];f[d+4>>2]=c;u=e;return}function pg(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Je(a,b,8);b=a+16|0;f[b>>2]=f[c>>2];f[b+4>>2]=f[c+4>>2];f[b+8>>2]=f[c+8>>2];c=a+28|0;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];f[c+8>>2]=f[d+8>>2];f[c+12>>2]=f[d+12>>2];return}function qg(a){a=a|0;f[a>>2]=3664;Ig(a+4|0);Ug(a);return}function rg(a){a=a|0;qg(a);$Y(a);return}function sg(a){a=a|0;return (b[a+56>>0]|0)!=0|0}function tg(a){a=a|0;return a+4|0}function ug(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+16|0;d=c+4|0;e=c;g=Qg(a)|0;f[e>>2]=g;f[d>>2]=f[e>>2];Sg(a+32|0,d,b)|0;ee[f[(f[a>>2]|0)+36>>2]&255](a,(f[a+60>>2]|0)+1|0);u=c;return}function vg(a){a=a|0;ee[f[(f[a>>2]|0)+16>>2]&255](a,10);return}function wg(a){a=a|0;var c=0,d=0,e=0,g=0;e=a+32|0;g=Qg(a)|0;c=(b[a+40+3>>0]|0)<0;if(c)d=f[e>>2]|0;else d=e;if((g|0)!=(d|0)){if(c)c=f[e>>2]|0;else c=e;Rg(e,g+-4-c>>2,1)|0;ee[f[(f[a>>2]|0)+36>>2]&255](a,(f[a+60>>2]|0)+-1|0)}return}function xg(a){a=a|0;var c=0,d=0,e=0,g=0,h=0,i=0;h=a+32|0;e=Qg(a)|0;i=e;c=b[a+40+3>>0]|0;g=c<<24>>24<0;if(g){d=f[h>>2]|0;a=f[a+36>>2]|0}else{d=h;a=c&255}if((e|0)!=(d+(a<<2)|0)){if(g)a=f[h>>2]|0;else a=h;Rg(h,i-a>>2,1)|0}return}function yg(a){a=a|0;return f[a+60>>2]|0}function zg(a,c){a=a|0;c=c|0;var d=0;d=b[a+40+3>>0]|0;if(d<<24>>24<0)d=f[a+36>>2]|0;else d=d&255;f[a+60>>2]=d>>>0<c>>>0?d:c;return}function Ag(a){a=a|0;return (b[a+57>>0]|0)!=0|0}function Bg(a,c){a=a|0;c=c|0;b[a+57>>0]=c&1;return}function Cg(a,c){a=a|0;c=c|0;a=a+20|0;b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;return}function Dg(a,b){a=a|0;b=+b;n[a+24>>2]=b;return}function Eg(a,c){a=a|0;c=c|0;b[a+28>>0]=c&1;return}function Fg(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(52,47264)|0;if(!c)c=0;else Gg(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];Hg(a,c,d);u=g;return}function Gg(a,b){a=a|0;b=b|0;var c=0,d=0;Ke(a,b);c=a+16|0;d=b+16|0;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];f[c+8>>2]=f[d+8>>2];Og(a+28|0,b+28|0);a=a+40|0;b=b+40|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];return}function Hg(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3736;f[c+12>>2]=b;f[a+4>>2]=c;return}function Ig(a){a=a|0;Jg(a+28|0);Le(a);return}function Jg(a){a=a|0;if((b[a+8+3>>0]|0)<0)$Y(f[a>>2]|0);return}function Kg(a){a=a|0;NY(a);$Y(a);return}function Lg(a){a=a|0;a=f[a+12>>2]|0;if(a|0){Ig(a);$Y(a)}return}function Mg(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==12445?a+12|0:0)|0}function Ng(a){a=a|0;$Y(a);return}function Og(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;i=j;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;if((b[c+8+3>>0]|0)<0){g=f[c>>2]|0;h=f[c+4>>2]|0;if(h>>>0>1073741807)gZ(a);do if(h>>>0>=2){c=h+4&-4;if(c>>>0>1073741823){j=Sa(8)|0;eZ(j,38407);f[j>>2]=11336;Wa(j|0,3056,442)}else{e=XY(c<<2)|0;f[a>>2]=e;f[a+8>>2]=c|-2147483648;f[a+4>>2]=h;a=e;break}}else b[a+8+3>>0]=h;while(0);d=a;e=h;c=g;while(1){if(!e)break;Pg(d,c);d=d+4|0;e=e+-1|0;c=c+4|0}f[i>>2]=0;Pg(a+(h<<2)|0,i)}else{f[a>>2]=f[c>>2];f[a+4>>2]=f[c+4>>2];f[a+8>>2]=f[c+8>>2]}u=j;return}function Pg(a,b){a=a|0;b=b|0;f[a>>2]=f[b>>2];return}function Qg(a){a=a|0;var c=0,d=0;c=a+32|0;d=b[a+40+3>>0]|0;if(d<<24>>24<0){d=f[a+36>>2]|0;c=f[c>>2]|0}else d=d&255;a=f[a+60>>2]|0;return c+((d>>>0<a>>>0?d:a)<<2)|0}function Rg(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;m=u;u=u+16|0;k=m;l=a+8+3|0;e=b[l>>0]|0;g=e<<24>>24<0;if(g)i=f[a+4>>2]|0;else i=e&255;if(i>>>0<c>>>0)hZ(a);if(d|0){if(g)j=f[a>>2]|0;else j=a;g=i-c|0;h=g>>>0<d>>>0?g:d;d=g-h|0;a:do if(d|0){g=j+(c<<2)|0;e=g+(h<<2)|0;if((h|0)>0)while(1){if(!d)break a;Pg(g,e);g=g+4|0;d=d+-1|0;e=e+4|0}if((h|0)<0){g=g+(d<<2)|0;c=d;e=e+(d<<2)|0;while(1){if(!c)break a;n=g+-4|0;d=e+-4|0;Pg(n,d);g=n;c=c+-1|0;e=d}}}while(0);e=i-h|0;if((b[l>>0]|0)<0)f[a+4>>2]=e;else b[l>>0]=e;f[k>>2]=0;Pg(j+(e<<2)|0,k)}u=m;return a|0}function Sg(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;n=u;u=u+16|0;j=n;l=n+4|0;f[j>>2]=d;d=a+8|0;k=d+3|0;e=b[k>>0]|0;g=e<<24>>24<0;if(g){c=(f[c>>2]|0)-(f[a>>2]|0)|0;d=(f[d>>2]&2147483647)+-1|0;h=f[a+4>>2]|0}else{c=(f[c>>2]|0)-a|0;d=1;h=e&255}i=c>>2;a:do if((d|0)!=(h|0)){if(g)c=f[a>>2]|0;else c=a;d=h-i|0;if(d){g=c+(i<<2)+4+(d<<2)|0;e=c+(h<<2)|0;while(1){if(!d)break a;p=g+-4|0;o=e+-4|0;Pg(p,o);g=p;d=d+-1|0;e=o}}}else{Tg(a,h,1,h,i,0,1);c=f[a>>2]|0}while(0);Pg(c+(i<<2)|0,j);d=h+1|0;f[l>>2]=0;Pg(c+(d<<2)|0,l);if((b[k>>0]|0)>=0){p=d&255;b[k>>0]=p;if(p<<24>>24<0)m=16}else{f[a+4>>2]=d;m=16}if((m|0)==16)a=f[a>>2]|0;u=n;return a+(i<<2)|0}function Tg(a,c,d,e,g,h,i){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0;if((1073741807-c|0)>>>0<d>>>0)gZ(a);o=a+8|0;if((b[o+3>>0]|0)<0)n=f[a>>2]|0;else n=a;if(c>>>0<536870887){d=d+c|0;m=c<<1;d=d>>>0<m>>>0?m:d;d=d>>>0<2?2:d+4&-4;if(d>>>0>1073741823){o=Sa(8)|0;eZ(o,38407);f[o>>2]=11336;Wa(o|0,3056,442)}else l=d}else l=1073741807;m=XY(l<<2)|0;a:do if(g|0){d=m;j=g;k=n;while(1){if(!j)break a;Pg(d,k);d=d+4|0;j=j+-1|0;k=k+4|0}}while(0);j=e-h-g|0;b:do if(j|0){k=m+(g<<2)+(i<<2)|0;d=n+(g<<2)+(h<<2)|0;while(1){if(!j)break b;Pg(k,d);k=k+4|0;j=j+-1|0;d=d+4|0}}while(0);if((c|0)!=1)$Y(n);f[a>>2]=m;f[o>>2]=l|-2147483648;return}function Ug(a){a=a|0;return}function Vg(a,c,d){a=a|0;c=c|0;d=d|0;Wg(a);f[a>>2]=3664;Gg(a+4|0,c);b[a+56>>0]=d&1;b[a+57>>0]=1;f[a+60>>2]=0;return}function Wg(a){a=a|0;f[a>>2]=3764;return}function Xg(a){a=a|0;Jc()}function Yg(a,b){a=a|0;b=b|0;f[a>>2]=f[b>>2];b=f[b+4>>2]|0;f[a+4>>2]=b;if(b|0)SY(b);return}function Zg(a,b){a=a|0;b=b|0;if(!(f[a>>2]|0))_g(12617,12650);else ee[f[(f[b>>2]|0)+32>>2]&255](b,a);return}function _g(a,b){a=a|0;b=b|0;return}function $g(a,b){a=a|0;b=b|0;var c=0,d=0;d=u;u=u+16|0;c=d;a=f[a>>2]|0;if(!a)_g(12671,12650);else{he[f[(f[b>>2]|0)+36>>2]&63](c,b,a);ah(c)}u=d;return}function ah(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function bh(a){a=a|0;f[a>>2]=3836;gh(a+4|0);hh(a);return}function ch(a){a=a|0;bh(a);$Y(a);return}function dh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0;i=u;u=u+16|0;e=i;g=a+4|0;h=e+4|0;a=f[a+8>>2]|0;while(1){d=a;if((f[g>>2]|0)==(d|0))break;a=d+-8|0;c=f[a>>2]|0;f[e>>2]=c;d=f[d+-4>>2]|0;f[h>>2]=d;if(d){SY(d);c=f[e>>2]|0}if(c|0)ee[f[(f[c>>2]|0)+8>>2]&255](c,b);fh(e)}u=i;return}function eh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0;i=u;u=u+16|0;e=i;g=a+8|0;h=e+4|0;d=f[a+4>>2]|0;while(1){if((d|0)==(f[g>>2]|0))break;a=f[d>>2]|0;f[e>>2]=a;c=f[d+4>>2]|0;f[h>>2]=c;if(c){SY(c);a=f[e>>2]|0}if(a|0)ee[f[(f[a>>2]|0)+12>>2]&255](a,b);fh(e);d=d+8|0}u=i;return}function fh(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function gh(a){a=a|0;var b=0,c=0,d=0;b=f[a>>2]|0;if(b|0){c=a+4|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;fh(d)}$Y(f[a>>2]|0)}return}function hh(a){a=a|0;return}function ih(a,b){a=a|0;b=b|0;jh(a);f[a>>2]=3836;kh(a+4|0,b);return}function jh(a){a=a|0;f[a>>2]=3860;return}function kh(a,b){a=a|0;b=b|0;var c=0,d=0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;c=b+4|0;d=(f[c>>2]|0)-(f[b>>2]|0)>>3;if(d|0){lh(a,d);mh(a,f[b>>2]|0,f[c>>2]|0,d)}return}function lh(a,b){a=a|0;b=b|0;var c=0;if((nh(a)|0)>>>0<b>>>0)MY(a);if(b>>>0>536870911){b=Sa(8)|0;eZ(b,38407);f[b>>2]=11336;Wa(b|0,3056,442)}else{c=XY(b<<3)|0;f[a+4>>2]=c;f[a>>2]=c;f[a+8>>2]=c+(b<<3);return}}function mh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;d=a+4|0;while(1){if((b|0)==(c|0))break;e=f[d>>2]|0;f[e>>2]=f[b>>2];a=f[b+4>>2]|0;f[e+4>>2]=a;if(a|0)SY(a);f[d>>2]=(f[d>>2]|0)+8;b=b+8|0}return}function nh(a){a=a|0;return 536870911}function oh(a){a=a|0;Jc()}function ph(a){a=a|0;f[a>>2]=3884;Bh(a+24|0);gh(a+4|0);Ch(a);return}function qh(a){a=a|0;ph(a);$Y(a);return}function rh(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=u;u=u+16|0;g=m+12|0;e=m+8|0;i=m+4|0;j=m;do if(!(f[c>>2]|0))_g(12748,12761);else{if(b[a+20>>0]|0){_g(12748,12794);break}k=a+4|0;l=a+8|0;d=f[l>>2]|0;h=f[a+16>>2]|0;if((h|0)!=(d|0)){f[i>>2]=h;f[j>>2]=d;f[e>>2]=f[i>>2];f[g>>2]=f[j>>2];sh(k,e,g)|0;d=f[l>>2]|0}if((d|0)==(f[a+12>>2]|0)){th(k,c);d=f[l>>2]|0}else{f[d>>2]=f[c>>2];e=f[c+4>>2]|0;f[d+4>>2]=e;if(e){SY(e);d=f[l>>2]|0}d=d+8|0;f[l>>2]=d}f[a+16>>2]=d;uh(a+24|0)}while(0);u=m;return}function sh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;j=u;u=u+16|0;h=j;i=f[a>>2]|0;g=f[b>>2]|0;i=i+(g-i>>3<<3)|0;b=f[c>>2]|0;a:do if((b|0)!=(g|0)){e=a+4|0;c=f[e>>2]|0;a=h+4|0;d=i;b=i+(b-g>>3<<3)|0;while(1){if((b|0)==(c|0))break;g=f[b>>2]|0;l=b+4|0;k=f[l>>2]|0;f[b>>2]=0;f[l>>2]=0;f[h>>2]=f[d>>2];f[d>>2]=g;g=d+4|0;f[a>>2]=f[g>>2];f[g>>2]=k;fh(h);d=d+8|0;b=b+8|0}while(1){b=f[e>>2]|0;if((b|0)==(d|0))break a;l=b+-8|0;f[e>>2]=l;fh(l)}}while(0);u=j;return i|0}function th(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;g=h;c=a+4|0;d=((f[c>>2]|0)-(f[a>>2]|0)>>3)+1|0;e=nh(a)|0;if(e>>>0<d>>>0)MY(a);i=f[a>>2]|0;k=(f[a+8>>2]|0)-i|0;j=k>>2;yh(g,k>>3>>>0<e>>>1>>>0?(j>>>0<d>>>0?d:j):e,(f[c>>2]|0)-i>>3,a+8|0);e=g+8|0;c=f[e>>2]|0;f[c>>2]=f[b>>2];d=f[b+4>>2]|0;f[c+4>>2]=d;if(d){SY(d);c=f[e>>2]|0}f[e>>2]=c+8;zh(a,g);Ah(g);u=h;return}function uh(a){a=a|0;if(f[a+16>>2]|0)vh(a);return}function vh(a){a=a|0;a=f[a+16>>2]|0;if(!a){a=Sa(4)|0;f[a>>2]=0;wh(a);Wa(a|0,288,50)}else{be[f[(f[a>>2]|0)+24>>2]&511](a);return}}function wh(a){a=a|0;f[a>>2]=3904;return}function xh(a){a=a|0;$Y(a);return}function yh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>536870911){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<3)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<3)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<3);return}function zh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;d=f[a>>2]|0;e=a+4|0;g=b+4|0;c=f[e>>2]|0;while(1){if((c|0)==(d|0))break;j=f[g>>2]|0;h=c+-8|0;f[j+-8>>2]=f[h>>2];i=c+-4|0;f[j+-4>>2]=f[i>>2];f[h>>2]=0;f[i>>2]=0;f[g>>2]=(f[g>>2]|0)+-8;c=h}h=f[a>>2]|0;f[a>>2]=f[g>>2];f[g>>2]=h;h=b+8|0;j=f[e>>2]|0;f[e>>2]=f[h>>2];f[h>>2]=j;h=a+8|0;j=b+12|0;i=f[h>>2]|0;f[h>>2]=f[j>>2];f[j>>2]=i;f[b>>2]=f[g>>2];return}function Ah(a){a=a|0;var b=0,c=0,d=0;b=f[a+4>>2]|0;c=a+8|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;fh(d)}a=f[a>>2]|0;if(a|0)$Y(a);return}function Bh(a){a=a|0;Dh(a);return}function Ch(a){a=a|0;return}function Dh(a){a=a|0;var b=0;b=f[a+16>>2]|0;if((a|0)!=(b|0)){if(b|0)be[f[(f[b>>2]|0)+20>>2]&511](b)}else be[f[(f[b>>2]|0)+16>>2]&511](b);return}function Eh(a){a=a|0;var c=0;Fh(a);f[a>>2]=3884;c=a+4|0;f[c>>2]=0;f[c+4>>2]=0;f[c+8>>2]=0;f[c+12>>2]=0;b[c+16>>0]=0;Gh(a+24|0);return}function Fh(a){a=a|0;f[a>>2]=3924;return}function Gh(a){a=a|0;f[a+16>>2]=0;return}function Hh(a){a=a|0;Jc()}function Ih(a){a=a|0;return (f[a+16>>2]|0)!=(f[a+4>>2]|0)|0}function Jh(a){a=a|0;return (f[a+16>>2]|0)!=(f[a+8>>2]|0)|0}function Kh(a,c){a=a|0;c=c|0;var d=0,e=0,g=0;do if(Ih(a)|0){d=a+20|0;if(!(b[d>>0]|0)){b[d>>0]=1;g=a+16|0;e=(f[g>>2]|0)+-8|0;f[g>>2]=e;e=f[e>>2]|0;ee[f[(f[e>>2]|0)+8>>2]&255](e,c);uh(a+24|0);b[d>>0]=0;break}else{_g(12897,12911);break}}while(0);return}function Lh(a,c){a=a|0;c=c|0;var d=0,e=0,g=0;do if(Jh(a)|0){d=a+20|0;if(!(b[d>>0]|0)){b[d>>0]=1;e=a+16|0;g=f[f[e>>2]>>2]|0;ee[f[(f[g>>2]|0)+12>>2]&255](g,c);f[e>>2]=(f[e>>2]|0)+8;uh(a+24|0);b[d>>0]=0;break}else{_g(12975,12989);break}}while(0);return}function Mh(a){a=a|0;f[a>>2]=3944;ah(a+12|0);ah(a+4|0);hh(a);return}function Nh(a){a=a|0;Mh(a);$Y(a);return}function Oh(a,b){a=a|0;b=b|0;a=a+4|0;if(f[a>>2]|0)ee[f[(f[b>>2]|0)+48>>2]&255](b,a);return}function Ph(a,b){a=a|0;b=b|0;a=a+12|0;if(f[a>>2]|0)ee[f[(f[b>>2]|0)+48>>2]&255](b,a);return}function Qh(a,b,c){a=a|0;b=b|0;c=c|0;jh(a);f[a>>2]=3944;f[a+4>>2]=f[b>>2];b=f[b+4>>2]|0;f[a+8>>2]=b;if(b|0)SY(b);f[a+12>>2]=f[c>>2];b=f[c+4>>2]|0;f[a+16>>2]=b;if(b|0)SY(b);return}function Rh(a){a=a|0;f[a>>2]=3968;jZ(a+4|0);hh(a);return}function Sh(a){a=a|0;Rh(a);$Y(a);return}function Th(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;Pv(d,-1.0,a+16|0);Vh(a,b,d);u=c;return}function Uh(a,b){a=a|0;b=b|0;Vh(a,b,a+16|0);return}function Vh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0;h=u;u=u+32|0;d=h+16|0;e=h+8|0;g=h;he[f[(f[b>>2]|0)+28>>2]&63](d,b,a+4|0);a=f[d>>2]|0;if(a|0){Ei(e,a);a=f[e>>2]|0;if(a|0){ee[f[(f[a>>2]|0)+12>>2]&255](a,0);a=f[e>>2]|0;ee[f[(f[a>>2]|0)+16>>2]&255](a,c);c=f[e>>2]|0;be[f[(f[c>>2]|0)+20>>2]&511](c);c=f[(f[b>>2]|0)+48>>2]|0;a=f[e>>2]|0;ee[f[(f[a>>2]|0)+48>>2]&255](g,a);ee[c&255](b,g);ah(g)}Wh(e)}ah(d);u=h;return}function Wh(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Xh(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;jh(a);f[a>>2]=3968;iZ(a+4|0,b);d=c;b=f[d+4>>2]|0;c=a+16|0;f[c>>2]=f[d>>2];f[c+4>>2]=b;return}function Yh(a){a=a|0;f[a>>2]=3992;jZ(a+4|0);hh(a);return}function Zh(a){a=a|0;Yh(a);$Y(a);return}function _h(a,b){a=a|0;b=b|0;he[f[(f[b>>2]|0)+44>>2]&63](b,a+4|0,d[a+16>>1]|0);return}function $h(a,b){a=a|0;b=b|0;he[f[(f[b>>2]|0)+44>>2]&63](b,a+4|0,d[a+18>>1]|0);return}function ai(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;jh(a);f[a>>2]=3992;iZ(a+4|0,b);d[a+16>>1]=c;d[a+18>>1]=e;return}function bi(a){a=a|0;f[a>>2]=4016;Jg(a+28|0);Jg(a+16|0);jZ(a+4|0);hh(a);return}function ci(a){a=a|0;bi(a);$Y(a);return}function di(a,b){a=a|0;b=b|0;fi(a,b,a+16|0);return}function ei(a,b){a=a|0;b=b|0;fi(a,b,a+28|0);return}function fi(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+32|0;g=j+24|0;h=j+16|0;i=j+8|0;e=j;he[f[(f[b>>2]|0)+28>>2]&63](h,b,a+4|0);d=f[h>>2]|0;if(d|0?(f[d+12>>2]|0)==7:0){a=YY(52,47264)|0;if(!a)a=0;else Gg(a,d);f[e>>2]=0;f[g>>2]=f[e>>2];gi(i,a,g);a=f[i>>2]|0;if(a|0){hi(a+28|0,c)|0;a=f[(f[b>>2]|0)+48>>2]|0;f[g>>2]=f[i>>2];d=f[i+4>>2]|0;f[g+4>>2]=d;if(d|0)SY(d);ee[a&255](b,g);ah(g)}ii(i)}ah(h);u=j;return}function gi(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3736;f[c+12>>2]=b;f[a+4>>2]=c;return}function hi(a,c){a=a|0;c=c|0;var d=0,e=0;if((a|0)!=(c|0)){d=b[c+8+3>>0]|0;e=d<<24>>24<0;ji(a,e?f[c>>2]|0:c,e?f[c+4>>2]|0:d&255)|0}return a|0}function ii(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function ji(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;l=u;u=u+16|0;j=l;e=a+8|0;k=e+3|0;h=b[k>>0]|0;i=h<<24>>24<0;if(i)g=(f[e>>2]&2147483647)+-1|0;else g=1;do if(g>>>0>=d>>>0){if(i)i=f[a>>2]|0;else i=a;a:do if(i>>>0>=c>>>0){if(i>>>0>c>>>0){g=i+(d<<2)|0;h=d;e=c+(d<<2)|0;while(1){if(!h)break a;m=g+-4|0;c=e+-4|0;Pg(m,c);g=m;h=h+-1|0;e=c}}}else{g=i;h=d;e=c;while(1){if(!h)break a;Pg(g,e);g=g+4|0;h=h+-1|0;e=e+4|0}}while(0);f[j>>2]=0;Pg(i+(d<<2)|0,j);if((b[k>>0]|0)<0){f[a+4>>2]=d;break}else{b[k>>0]=d;break}}else{if(i)e=f[a+4>>2]|0;else e=h&255;ki(a,g,d-g|0,e,0,e,d,c)}while(0);u=l;return a|0}function ki(a,c,d,e,g,h,i,j){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=u;u=u+16|0;q=r;if((1073741806-c|0)>>>0<d>>>0)gZ(a);o=a+8|0;if((b[o+3>>0]|0)<0)p=f[a>>2]|0;else p=a;if(c>>>0<536870887){d=d+c|0;n=c<<1;d=d>>>0<n>>>0?n:d;d=d>>>0<2?2:d+4&-4;if(d>>>0>1073741823){r=Sa(8)|0;eZ(r,38407);f[r>>2]=11336;Wa(r|0,3056,442)}}else d=1073741807;n=XY(d<<2)|0;a:do if(g|0){k=n;l=g;m=p;while(1){if(!l)break a;Pg(k,m);k=k+4|0;l=l+-1|0;m=m+4|0}}while(0);b:do if(i|0){k=n+(g<<2)|0;l=i;while(1){if(!l)break b;Pg(k,j);k=k+4|0;l=l+-1|0;j=j+4|0}}while(0);m=e-h|0;j=m-g|0;c:do if(j|0){l=n+(g<<2)+(i<<2)|0;k=j;j=p+(g<<2)+(h<<2)|0;while(1){if(!k)break c;Pg(l,j);l=l+4|0;k=k+-1|0;j=j+4|0}}while(0);if((c|0)!=1)$Y(p);f[a>>2]=n;f[o>>2]=d|-2147483648;i=m+i|0;f[a+4>>2]=i;f[q>>2]=0;Pg(n+(i<<2)|0,q);u=r;return}function li(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;jh(a);f[a>>2]=4016;iZ(a+4|0,b);Og(a+16|0,c);Og(a+28|0,d);return}function mi(a){a=a|0;f[a>>2]=4040;lf(a+4|0);Ai(a);return}function ni(a){a=a|0;mi(a);$Y(a);return}function oi(a){a=a|0;return a+4|0}function pi(a,b){a=a|0;b=b|0;return}function qi(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=f[d+4>>2]|0;b=a+48|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;return}function ri(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0;e=u;u=u+16|0;b=e;c=f[a+36>>2]|0;d=a+48|0;a=f[a+32>>2]|0;while(1){if((a|0)==(c|0))break;Nv(b,a,d);i=b;h=f[i+4>>2]|0;g=a;f[g>>2]=f[i>>2];f[g+4>>2]=h;a=a+8|0}zi(b,0.0,0.0);g=b;h=f[g+4>>2]|0;i=d;f[i>>2]=f[g>>2];f[i+4>>2]=h;u=e;return}function si(a){a=a|0;return a+48|0}function ti(a){a=a|0;return 1}function ui(a,b){a=a|0;b=b|0;b=b+20|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];return}function vi(a,c){a=a|0;c=c|0;a=a+20|0;b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;return}function wi(a,b){a=a|0;b=+b;n[a+24>>2]=b;return}function xi(a,c){a=a|0;c=c|0;b[a+28>>0]=c&1;return}function yi(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(44,47264)|0;if(!c)c=0;else jf(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];kf(a,c,d);u=g;return}function zi(a,b,c){a=a|0;b=+b;c=+c;n[a>>2]=b;n[a+4>>2]=c;return}function Ai(a){a=a|0;return}function Bi(a,b){a=a|0;b=b|0;Ci(a);f[a>>2]=4040;jf(a+4|0,b);zi(a+48|0,0.0,0.0);return}function Ci(a){a=a|0;f[a>>2]=4100;return}function Di(a){a=a|0;Jc()}function Ei(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0;i=u;u=u+32|0;d=i+16|0;e=i+8|0;g=i;f[a>>2]=0;h=a+4|0;f[h>>2]=0;switch(f[b+12>>2]|0){case 3:{c=YY(80,47264)|0;if(!c)c=0;else Fi(c,b);f[g>>2]=0;f[d>>2]=f[g>>2];Gi(e,c,d);g=f[e>>2]|0;f[e>>2]=f[a>>2];f[a>>2]=g;a=e+4|0;g=f[a>>2]|0;f[a>>2]=f[h>>2];f[h>>2]=g;Wh(e);break}case 4:{c=YY(80,47264)|0;if(!c)c=0;else Hi(c,b);f[g>>2]=0;f[d>>2]=f[g>>2];Ii(e,c,d);g=f[e>>2]|0;f[e>>2]=f[a>>2];f[a>>2]=g;a=e+4|0;g=f[a>>2]|0;f[a>>2]=f[h>>2];f[h>>2]=g;Wh(e);break}case 5:{c=YY(56,47264)|0;if(!c)c=0;else Bi(c,b);f[g>>2]=0;f[d>>2]=f[g>>2];Ji(e,c,d);g=f[e>>2]|0;f[e>>2]=f[a>>2];f[a>>2]=g;a=e+4|0;g=f[a>>2]|0;f[a>>2]=f[h>>2];f[h>>2]=g;Wh(e);break}case 6:{c=YY(80,47264)|0;if(!c)c=0;else qk(c,b);f[g>>2]=0;f[d>>2]=f[g>>2];Ki(e,c,d);g=f[e>>2]|0;f[e>>2]=f[a>>2];f[a>>2]=g;a=e+4|0;g=f[a>>2]|0;f[a>>2]=f[h>>2];f[h>>2]=g;Wh(e);break}case 8:{c=YY(88,47264)|0;if(!c)c=0;else Mk(c,b);f[g>>2]=0;f[d>>2]=f[g>>2];Li(e,c,d);g=f[e>>2]|0;f[e>>2]=f[a>>2];f[a>>2]=g;a=e+4|0;g=f[a>>2]|0;f[a>>2]=f[h>>2];f[h>>2]=g;Wh(e);break}case 7:{c=YY(64,47264)|0;if(!c)c=0;else _k(c,b);f[g>>2]=0;f[d>>2]=f[g>>2];Mi(e,c,d);g=f[e>>2]|0;f[e>>2]=f[a>>2];f[a>>2]=g;a=e+4|0;g=f[a>>2]|0;f[a>>2]=f[h>>2];f[h>>2]=g;Wh(e);break}default:{}}u=i;return}function Fi(a,b){a=a|0;b=b|0;Ci(a);f[a>>2]=4388;If(a+4|0,b);fj(a+48|0);fj(a+56|0);b=a+64|0;f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;f[b+12>>2]=0;return}function Gi(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4360;f[c+12>>2]=b;f[a+4>>2]=c;return}function Hi(a,b){a=a|0;b=b|0;Ci(a);f[a>>2]=4300;Ce(a+4|0,b);fj(a+48|0);fj(a+56|0);b=a+64|0;f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;f[b+12>>2]=0;return}function Ii(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4272;f[c+12>>2]=b;f[a+4>>2]=c;return}function Ji(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4244;f[c+12>>2]=b;f[a+4>>2]=c;return}function Ki(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4216;f[c+12>>2]=b;f[a+4>>2]=c;return}function Li(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4188;f[c+12>>2]=b;f[a+4>>2]=c;return}function Mi(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4160;f[c+12>>2]=b;f[a+4>>2]=c;return}function Ni(a){a=a|0;NY(a);$Y(a);return}function Oi(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Pi(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==13191?a+12|0:0)|0}function Qi(a){a=a|0;$Y(a);return}function Ri(a){a=a|0;NY(a);$Y(a);return}function Si(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Ti(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==13334?a+12|0:0)|0}function Ui(a){a=a|0;$Y(a);return}function Vi(a){a=a|0;NY(a);$Y(a);return}function Wi(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Xi(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==13487?a+12|0:0)|0}function Yi(a){a=a|0;$Y(a);return}function Zi(a){a=a|0;NY(a);$Y(a);return}function _i(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function $i(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==13630?a+12|0:0)|0}function aj(a){a=a|0;$Y(a);return}function bj(a){a=a|0;NY(a);$Y(a);return}function cj(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function dj(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==13775?a+12|0:0)|0}function ej(a){a=a|0;$Y(a);return}function fj(a){a=a|0;n[a>>2]=0.0;n[a+4>>2]=0.0;return}function gj(a){a=a|0;f[a>>2]=4300;Le(a+4|0);Ai(a);return}function hj(a){a=a|0;gj(a);$Y(a);return}function ij(a){a=a|0;return a+4|0}function jj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;switch(b<<24>>24){case 1:{b=a+32|0;c=140;g=0;h=4;break}case 2:{b=a+40|0;c=141;g=0;h=4;break}default:{d=449;e=0;c=139;b=0}}if((h|0)==4){e=f[b+4>>2]|0;d=a+56|0;f[d>>2]=f[b>>2];f[d+4>>2]=e;d=0;e=0;b=g}f[a+64>>2]=c;f[a+68>>2]=b;f[a+72>>2]=d;f[a+76>>2]=e;return}function kj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=f[a+64>>2]|0;d=f[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=f[(f[d>>2]|0)+c>>2]|0;ee[c&255](d,b)}return}function lj(a){a=a|0;var b=0,c=0,d=0;b=f[a+72>>2]|0;c=f[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=f[(f[c>>2]|0)+b>>2]|0;be[b&511](c)}a=a+64|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;return}function mj(a){a=a|0;return a+48|0}function nj(a){a=a|0;return 1}function oj(a,b){a=a|0;b=b|0;b=b+20|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];return}function pj(a,c){a=a|0;c=c|0;a=a+20|0;b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;return}function qj(a,b){a=a|0;b=+b;n[a+24>>2]=b;return}function rj(a,c){a=a|0;c=c|0;b[a+28>>0]=c&1;return}function sj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;h=u;u=u+32|0;d=h+16|0;e=h+8|0;g=h;c=YY(44,47264)|0;if(!c)c=0;else Ce(c,b+4|0);f[g>>2]=0;f[d>>2]=f[g>>2];tj(e,c,d);f[a>>2]=f[e>>2];g=e+4|0;f[a+4>>2]=f[g>>2];f[e>>2]=0;f[g>>2]=0;uj(e);u=h;return}function tj(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3336;f[c+12>>2]=b;f[a+4>>2]=c;return}function uj(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function vj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;Nv(e,a+56|0,b);d=f[e+4>>2]|0;b=a+40|0;f[b>>2]=f[e>>2];f[b+4>>2]=d;u=c;return}function wj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;Nv(e,a+56|0,b);d=f[e+4>>2]|0;b=a+32|0;f[b>>2]=f[e>>2];f[b+4>>2]=d;u=c;return}function xj(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=f[d+4>>2]|0;b=a+48|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;return}function yj(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0;b=u;u=u+16|0;d=b;c=a+32|0;e=a+48|0;Nv(d,c,e);h=d;g=f[h+4>>2]|0;f[c>>2]=f[h>>2];f[c+4>>2]=g;c=a+40|0;Nv(d,c,e);g=d;a=f[g+4>>2]|0;f[c>>2]=f[g>>2];f[c+4>>2]=a;zi(d,0.0,0.0);c=f[d+4>>2]|0;a=e;f[a>>2]=f[d>>2];f[a+4>>2]=c;u=b;return}function zj(a){a=a|0;NY(a);$Y(a);return}function Aj(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Bj(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==14042?a+12|0:0)|0}function Cj(a){a=a|0;$Y(a);return}function Dj(a){a=a|0;f[a>>2]=4388;Le(a+4|0);Ai(a);return}function Ej(a){a=a|0;Dj(a);$Y(a);return}function Fj(a){a=a|0;return a+4|0}function Gj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;switch(b<<24>>24){case 1:{b=a+32|0;c=143;g=0;h=4;break}case 2:{b=a+40|0;c=144;g=0;h=4;break}default:{d=450;e=0;c=142;b=0}}if((h|0)==4){e=f[b+4>>2]|0;d=a+56|0;f[d>>2]=f[b>>2];f[d+4>>2]=e;d=0;e=0;b=g}f[a+64>>2]=c;f[a+68>>2]=b;f[a+72>>2]=d;f[a+76>>2]=e;return}function Hj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=f[a+64>>2]|0;d=f[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=f[(f[d>>2]|0)+c>>2]|0;ee[c&255](d,b)}return}function Ij(a){a=a|0;var b=0,c=0,d=0;b=f[a+72>>2]|0;c=f[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=f[(f[c>>2]|0)+b>>2]|0;be[b&511](c)}a=a+64|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;return}function Jj(a){a=a|0;return a+48|0}function Kj(a){a=a|0;return 1}function Lj(a,b){a=a|0;b=b|0;b=b+20|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];return}function Mj(a,c){a=a|0;c=c|0;a=a+20|0;b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;return}function Nj(a,b){a=a|0;b=+b;n[a+24>>2]=b;return}function Oj(a,c){a=a|0;c=c|0;b[a+28>>0]=c&1;return}function Pj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;h=u;u=u+32|0;d=h+16|0;e=h+8|0;g=h;c=YY(44,47264)|0;if(!c)c=0;else If(c,b+4|0);f[g>>2]=0;f[d>>2]=f[g>>2];Qj(e,c,d);f[a>>2]=f[e>>2];g=e+4|0;f[a+4>>2]=f[g>>2];f[e>>2]=0;f[g>>2]=0;Rj(e);u=h;return}function Qj(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=3516;f[c+12>>2]=b;f[a+4>>2]=c;return}function Rj(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Sj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;Nv(e,a+56|0,b);d=f[e+4>>2]|0;b=a+40|0;f[b>>2]=f[e>>2];f[b+4>>2]=d;u=c;return}function Tj(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;e=c;Nv(e,a+56|0,b);d=f[e+4>>2]|0;b=a+32|0;f[b>>2]=f[e>>2];f[b+4>>2]=d;u=c;return}function Uj(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=f[d+4>>2]|0;b=a+48|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;return}function Vj(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0;b=u;u=u+16|0;d=b;c=a+32|0;e=a+48|0;Nv(d,c,e);h=d;g=f[h+4>>2]|0;f[c>>2]=f[h>>2];f[c+4>>2]=g;c=a+40|0;Nv(d,c,e);g=d;a=f[g+4>>2]|0;f[c>>2]=f[g>>2];f[c+4>>2]=a;zi(d,0.0,0.0);c=f[d+4>>2]|0;a=e;f[a>>2]=f[d>>2];f[a+4>>2]=c;u=b;return}function Wj(a){a=a|0;f[a>>2]=4448;Le(a+4|0);Ai(a);return}function Xj(a){a=a|0;Wj(a);$Y(a);return}function Yj(a){a=a|0;return a+4|0}function Zj(a,b){a=a|0;b=b|0;var c=0.0;switch(b<<24>>24){case 1:{f[a+64>>2]=145;f[a+68>>2]=0;f[a+72>>2]=451;f[a+76>>2]=0;c=+jk(a);n[a+56>>2]=c;c=+kk(a);n[a+60>>2]=c;break}case 2:{f[a+64>>2]=145;f[a+68>>2]=0;f[a+72>>2]=451;f[a+76>>2]=0;c=+kk(a);n[a+56>>2]=c;c=+jk(a);n[a+60>>2]=c;break}case 3:{f[a+64>>2]=146;f[a+68>>2]=0;f[a+72>>2]=451;f[a+76>>2]=0;c=+mk(a);n[a+56>>2]=c;c=+nk(a);n[a+60>>2]=c;break}case 4:{f[a+64>>2]=146;f[a+68>>2]=0;f[a+72>>2]=451;f[a+76>>2]=0;c=+nk(a);n[a+56>>2]=c;c=+mk(a);n[a+60>>2]=c;break}default:{f[a+64>>2]=147;f[a+68>>2]=0;f[a+72>>2]=452;f[a+76>>2]=0}}return}function _j(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=f[a+64>>2]|0;d=f[a+68>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=f[(f[d>>2]|0)+c>>2]|0;ee[c&255](d,b)}return}function $j(a){a=a|0;var b=0,c=0,d=0;b=f[a+72>>2]|0;c=f[a+76>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=f[(f[c>>2]|0)+b>>2]|0;be[b&511](c)}a=a+64|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;return}function ak(a){a=a|0;return a+48|0}function bk(a){a=a|0;return 1}function ck(a,b){a=a|0;b=b|0;b=b+20|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];return}function dk(a,c){a=a|0;c=c|0;a=a+20|0;b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;return}function ek(a,b){a=a|0;b=+b;n[a+24>>2]=b;return}function fk(a,c){a=a|0;c=c|0;b[a+28>>0]=c&1;return}function gk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(44,47264)|0;if(!c)c=0;else Wf(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];Xf(a,c,d);u=g;return}function hk(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0,g=0,h=0.0,i=0.0;c=u;u=u+16|0;g=c;h=+n[a+60>>2]+ +n[b+4>>2];i=+n[a+56>>2];d=+K(+(i-h))*.5;b=a+32|0;zi(g,+n[b>>2],(i+h)*.5);e=f[g+4>>2]|0;f[b>>2]=f[g>>2];f[b+4>>2]=e;n[a+44>>2]=d;u=c;return}function ik(a){a=a|0;return}function jk(a){a=a|0;return +(+n[a+36>>2]-+n[a+44>>2])}function kk(a){a=a|0;return +(+n[a+36>>2]+ +n[a+44>>2])}function lk(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0,g=0,h=0.0,i=0.0;c=u;u=u+16|0;g=c;h=+n[a+60>>2]+ +n[b>>2];i=+n[a+56>>2];d=+K(+(i-h))*.5;zi(g,(i+h)*.5,+n[a+36>>2]);e=f[g+4>>2]|0;b=a+32|0;f[b>>2]=f[g>>2];f[b+4>>2]=e;n[a+40>>2]=d;u=c;return}function mk(a){a=a|0;return +(+n[a+32>>2]+ +n[a+40>>2])}function nk(a){a=a|0;return +(+n[a+32>>2]-+n[a+40>>2])}function ok(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=f[d+4>>2]|0;b=a+48|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;return}function pk(a){a=a|0;var b=0,c=0,d=0,e=0,g=0;b=u;u=u+16|0;d=b;c=a+32|0;a=a+48|0;Nv(d,c,a);g=d;e=f[g+4>>2]|0;f[c>>2]=f[g>>2];f[c+4>>2]=e;zi(d,0.0,0.0);c=f[d+4>>2]|0;f[a>>2]=f[d>>2];f[a+4>>2]=c;u=b;return}function qk(a,b){a=a|0;b=b|0;Ci(a);f[a>>2]=4448;Wf(a+4|0,b);fj(a+48|0);b=a+64|0;f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;f[b+12>>2]=0;return}function rk(a){a=a|0;f[a>>2]=4508;Le(a+4|0);Ai(a);return}function sk(a){a=a|0;rk(a);$Y(a);return}function tk(a){a=a|0;return a+4|0}function uk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;h=j;i=a+32|0;c=a+72|0;f[c>>2]=148;d=a+76|0;f[d>>2]=0;e=a+80|0;f[e>>2]=453;g=a+84|0;f[g>>2]=0;switch(b<<24>>24){case 1:{zi(h,+Gk(i),+Hk(i));e=h;g=f[e+4>>2]|0;b=a+56|0;f[b>>2]=f[e>>2];f[b+4>>2]=g;zi(h,+Ik(i),+Jk(i));b=h;h=f[b+4>>2]|0;i=a+64|0;f[i>>2]=f[b>>2];f[i+4>>2]=h;break}case 2:{zi(h,+Ik(i),+Hk(i));e=h;g=f[e+4>>2]|0;b=a+56|0;f[b>>2]=f[e>>2];f[b+4>>2]=g;zi(h,+Gk(i),+Jk(i));b=h;h=f[b+4>>2]|0;i=a+64|0;f[i>>2]=f[b>>2];f[i+4>>2]=h;break}case 3:{zi(h,+Gk(i),+Jk(i));e=h;g=f[e+4>>2]|0;b=a+56|0;f[b>>2]=f[e>>2];f[b+4>>2]=g;zi(h,+Ik(i),+Hk(i));b=h;h=f[b+4>>2]|0;i=a+64|0;f[i>>2]=f[b>>2];f[i+4>>2]=h;break}case 4:{zi(h,+Ik(i),+Jk(i));e=h;g=f[e+4>>2]|0;b=a+56|0;f[b>>2]=f[e>>2];f[b+4>>2]=g;zi(h,+Gk(i),+Hk(i));b=h;h=f[b+4>>2]|0;i=a+64|0;f[i>>2]=f[b>>2];f[i+4>>2]=h;break}default:{f[c>>2]=149;f[d>>2]=0;f[e>>2]=454;f[g>>2]=0}}u=j;return}function vk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=f[a+72>>2]|0;d=f[a+76>>2]|0;e=d&1;if((c|0)!=0|(d|0)!=0&(e|c|0)!=0){d=a+(d>>1)|0;if(e)c=f[(f[d>>2]|0)+c>>2]|0;ee[c&255](d,b)}return}function wk(a){a=a|0;var b=0,c=0,d=0;b=f[a+80>>2]|0;c=f[a+84>>2]|0;d=c&1;if((b|0)!=0|(c|0)!=0&(d|b|0)!=0){c=a+(c>>1)|0;if(d)b=f[(f[c>>2]|0)+b>>2]|0;be[b&511](c)}a=a+72|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;return}function xk(a){a=a|0;return a+48|0}function yk(a){a=a|0;return 1}function zk(a,b){a=a|0;b=b|0;b=b+20|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];return}function Ak(a,c){a=a|0;c=c|0;a=a+20|0;b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;return}function Bk(a,b){a=a|0;b=+b;n[a+24>>2]=b;return}function Ck(a,c){a=a|0;c=c|0;b[a+28>>0]=c&1;return}function Dk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(44,47264)|0;if(!c)c=0;else ig(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];jg(a,c,d);u=g;return}function Ek(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+8|0;e=c;Nv(e,a+64|0,b);Uv(d,a+56|0,e);b=a+32|0;f[b>>2]=f[d>>2];f[b+4>>2]=f[d+4>>2];f[b+8>>2]=f[d+8>>2];f[b+12>>2]=f[d+12>>2];u=c;return}function Fk(a){a=a|0;return}function Gk(a){a=a|0;return +(+n[a+8>>2])}function Hk(a){a=a|0;return +(+n[a+4>>2])}function Ik(a){a=a|0;return +(+n[a>>2])}function Jk(a){a=a|0;return +(+n[a+12>>2])}function Kk(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=f[d+4>>2]|0;b=a+48|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;return}function Lk(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0.0;b=u;u=u+48|0;i=b+40|0;h=b+32|0;d=b;g=b+24|0;e=b+16|0;c=a+32|0;j=+Ik(c);zi(i,j,+Hk(c));j=+Gk(c);zi(h,j,+Jk(c));a=a+48|0;Nv(g,i,a);Nv(e,h,a);Uv(d,g,e);f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];f[c+8>>2]=f[d+8>>2];f[c+12>>2]=f[d+12>>2];zi(d,0.0,0.0);c=f[d+4>>2]|0;f[a>>2]=f[d>>2];f[a+4>>2]=c;u=b;return}function Mk(a,b){a=a|0;b=b|0;Ci(a);f[a>>2]=4508;ig(a+4|0,b);fj(a+48|0);fj(a+56|0);fj(a+64|0);b=a+72|0;f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;f[b+12>>2]=0;return}function Nk(a){a=a|0;f[a>>2]=4568;Ig(a+4|0);Ai(a);return}function Ok(a){a=a|0;Nk(a);$Y(a);return}function Pk(a){a=a|0;return a+4|0}function Qk(a,b){a=a|0;b=b|0;return}function Rk(a,b){a=a|0;b=b|0;var c=0,d=0;d=b;c=f[d+4>>2]|0;b=a+56|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;return}function Sk(a){a=a|0;var b=0,c=0,d=0,e=0,g=0;b=u;u=u+16|0;d=b;c=a+48|0;a=a+56|0;Nv(d,c,a);g=d;e=f[g+4>>2]|0;f[c>>2]=f[g>>2];f[c+4>>2]=e;zi(d,0.0,0.0);c=f[d+4>>2]|0;f[a>>2]=f[d>>2];f[a+4>>2]=c;u=b;return}function Tk(a){a=a|0;return a+56|0}function Uk(a){a=a|0;return 1}function Vk(a,b){a=a|0;b=b|0;b=b+20|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];return}function Wk(a,c){a=a|0;c=c|0;a=a+20|0;b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;return}function Xk(a,b){a=a|0;b=+b;n[a+24>>2]=b;return}function Yk(a,c){a=a|0;c=c|0;b[a+28>>0]=c&1;return}function Zk(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=u;u=u+16|0;d=g+4|0;e=g;c=YY(52,47264)|0;if(!c)c=0;else Gg(c,b+4|0);f[e>>2]=0;f[d>>2]=f[e>>2];Hg(a,c,d);u=g;return}function _k(a,b){a=a|0;b=b|0;Ci(a);f[a>>2]=4568;Gg(a+4|0,b);fj(a+56|0);return}function $k(a){a=a|0;return}function al(a){a=a|0;$k(a);$Y(a);return}function bl(a,b){a=a|0;b=b|0;pl(14399,18895);return}function cl(a,b){a=a|0;b=b|0;pl(14399,18735);return}function dl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0;a=u;u=u+16|0;e=a;_g(14368,15657);g=f[(f[c>>2]|0)+8>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[g&255](c,b);ol(e,10);u=a;return d[e>>1]|0}function el(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0.0,i=0,j=0,k=0;g=u;u=u+16|0;c=g;b=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;k=Td[f[(f[b>>2]|0)+32>>2]&255](b)|0;i=f[k+4>>2]|0;j=a+4|0;f[j>>2]=f[k>>2];f[j+4>>2]=i;j=e;i=f[j+4>>2]|0;e=a+12|0;f[e>>2]=f[j>>2];f[e+4>>2]=i;h=+Qd[f[(f[b>>2]|0)+20>>2]&7](b);n[a+20>>2]=h;ol(c,0);u=g;return d[c>>1]|0}function fl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0;g=u;u=u+16|0;c=g;b=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;ge[f[(f[b>>2]|0)+36>>2]&1](b,a+4|0,+n[a+20>>2],a+12|0,e);ol(c,0);u=g;return d[c>>1]|0}function gl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0;h=u;u=u+16|0;g=h;i=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;ge[f[(f[i>>2]|0)+36>>2]&1](i,a+4|0,+n[a+20>>2],a+12|0,e);a=f[(f[c>>2]|0)+8>>2]|0;e=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[a&255](c,e);ol(g,0);u=h;return d[g>>1]|0}function hl(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0;e=u;u=u+16|0;a=e;g=f[(f[c>>2]|0)+8>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[g&255](c,b);ol(a,0);u=e;return d[a>>1]|0}function il(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function jl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function kl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function ll(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function ml(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function nl(a,b,c){a=a|0;b=b|0;c=c|0;b=u;u=u+16|0;c=b;ol(c,1);u=b;return d[c>>1]|0}function ol(a,b){a=a|0;b=b|0;d[a>>1]=b;return}function pl(a,b){a=a|0;b=b|0;return}function ql(a){a=a|0;$k(a);$Y(a);return}function rl(a,b){a=a|0;b=b|0;pl(15698,18895);return}function sl(a,b){a=a|0;b=b|0;var c=0;a=u;u=u+16|0;c=a;pl(15698,18735);b=Td[f[(f[b>>2]|0)+60>>2]&255](b)|0;f[c>>2]=f[b>>2];f[b>>2]=0;b=b+4|0;f[c+4>>2]=f[b>>2];f[b>>2]=0;Rl(c);u=a;return}function tl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0;a=u;u=u+16|0;e=a;_g(15622,15657);g=f[(f[c>>2]|0)+8>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[g&255](c,b);ol(e,10);u=a;return d[e>>1]|0}function ul(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0.0,j=0.0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0;s=u;u=u+80|0;o=s+56|0;k=s+48|0;l=s+40|0;q=s+64|0;g=s+28|0;r=s+16|0;h=s+8|0;p=s;m=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;ee[f[(f[b>>2]|0)+68>>2]&255](g,b);a=Td[f[(f[b>>2]|0)+44>>2]&255](b)|0;ee[f[(f[a>>2]|0)+8>>2]&255](r,a);he[f[(f[m>>2]|0)+24>>2]&63](h,m,e);i=+Qd[f[(f[m>>2]|0)+20>>2]&7](m);m=(Td[f[(f[m>>2]|0)+16>>2]&255](m)|0)+8|0;j=+n[m>>2];f[p>>2]=0;m=p+4|0;f[m>>2]=0;switch(Td[f[(f[b>>2]|0)+92>>2]&255](b)|0){case 0:{a=YY(48,47264)|0;if(!a)a=0;else Of(a,r,g,h);f[l>>2]=0;f[o>>2]=f[l>>2];Ql(k,a,o);h=f[k>>2]|0;f[k>>2]=f[p>>2];f[p>>2]=h;h=k+4|0;l=f[h>>2]|0;f[h>>2]=f[m>>2];f[m>>2]=l;Rl(k);break}case 1:{a=YY(44,47264)|0;if(!a)a=0;else af(a,r,h);f[l>>2]=0;f[o>>2]=f[l>>2];Sl(k,a,o);h=f[k>>2]|0;f[k>>2]=f[p>>2];f[p>>2]=h;h=k+4|0;l=f[h>>2]|0;f[h>>2]=f[m>>2];f[m>>2]=l;Rl(k);break}case 2:{a=YY(48,47264)|0;if(!a)a=0;else we(a,r,g,h);f[l>>2]=0;f[o>>2]=f[l>>2];Tl(k,a,o);h=f[k>>2]|0;f[k>>2]=f[p>>2];f[p>>2]=h;h=k+4|0;l=f[h>>2]|0;f[h>>2]=f[m>>2];f[m>>2]=l;Rl(k);break}case 3:{a=YY(48,47264)|0;if(!a)a=0;else zf(a,r,g,h,i/j);f[l>>2]=0;f[o>>2]=f[l>>2];Ul(k,a,o);h=f[k>>2]|0;f[k>>2]=f[p>>2];f[p>>2]=h;h=k+4|0;l=f[h>>2]|0;f[h>>2]=f[m>>2];f[m>>2]=l;Rl(k);break}case 4:{a=YY(56,47264)|0;if(!a)a=0;else ag(a,r,g,h);f[l>>2]=0;f[o>>2]=f[l>>2];Vl(k,a,o);h=f[k>>2]|0;f[k>>2]=f[p>>2];f[p>>2]=h;h=k+4|0;l=f[h>>2]|0;f[h>>2]=f[m>>2];f[m>>2]=l;Rl(k);break}case 5:{a=YY(56,47264)|0;if(!a)a=0;else og(a,r,g,h);f[l>>2]=0;f[o>>2]=f[l>>2];Wl(k,a,o);h=f[k>>2]|0;f[k>>2]=f[p>>2];f[p>>2]=h;h=k+4|0;l=f[h>>2]|0;f[h>>2]=f[m>>2];f[m>>2]=l;Rl(k);break}default:Xl(14652,14688,Td[f[(f[b>>2]|0)+92>>2]&255](b)|0,14698)}if(!(f[p>>2]|0)){_g(14652,14730);m=f[(f[c>>2]|0)+8>>2]|0;o=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[m&255](c,o);ol(q,22)}else{e=Td[f[(f[b>>2]|0)+60>>2]&255](b)|0;g=f[p>>2]|0;f[o>>2]=g;h=o+4|0;a=f[m>>2]|0;f[h>>2]=a;if(a|0)SY(a);f[o>>2]=f[e>>2];f[e>>2]=g;m=e+4|0;f[h>>2]=f[m>>2];f[m>>2]=a;Rl(o);ol(q,0)}Rl(p);jZ(r);u=s;return d[q>>1]|0}function vl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0;h=u;u=u+16|0;a=h+8|0;c=h;g=Td[f[(f[b>>2]|0)+60>>2]&255](b)|0;if(f[g>>2]|0){b=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;he[f[(f[b>>2]|0)+24>>2]&63](c,b,e);e=f[g>>2]|0;ee[f[(f[e>>2]|0)+12>>2]&255](e,c)}ol(a,0);u=h;return d[a>>1]|0}function wl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;m=u;u=u+48|0;i=m+32|0;j=m+40|0;g=m+24|0;k=m+16|0;l=m+8|0;h=m;a=Td[f[(f[b>>2]|0)+60>>2]&255](b)|0;if(f[a>>2]|0?(n=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0,he[f[(f[n>>2]|0)+24>>2]&63](g,n,e),e=f[a>>2]|0,ee[f[(f[e>>2]|0)+12>>2]&255](e,g),e=f[a>>2]|0,Td[f[(f[e>>2]|0)+16>>2]&255](e)|0):0){n=f[a>>2]|0;ee[f[(f[n>>2]|0)+20>>2]&255](k,n);if(f[k>>2]|0){a=Td[f[(f[b>>2]|0)+28>>2]&255](b)|0;ee[f[(f[a>>2]|0)+32>>2]&255](a,k);a=YY(12,47264)|0;if(!a)a=0;else El(a,k);f[h>>2]=0;f[i>>2]=f[h>>2];Fl(l,a,i);a=Td[f[(f[b>>2]|0)+52>>2]&255](b)|0;g=f[(f[a>>2]|0)+8>>2]|0;f[i>>2]=f[l>>2];e=f[l+4>>2]|0;f[i+4>>2]=e;if(e|0)SY(e);ee[g&255](a,i);fh(i);Gl(l)}ah(k)}l=f[(f[c>>2]|0)+8>>2]|0;n=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[l&255](c,n);ol(j,0);u=m;return d[j>>1]|0}function xl(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0,h=0,i=0,j=0;i=u;u=u+16|0;a=i+8|0;e=i;g=Td[f[(f[b>>2]|0)+60>>2]&255](b)|0;h=f[g>>2]|0;if(h|0?Td[f[(f[h>>2]|0)+16>>2]&255](h)|0:0){h=Td[f[(f[b>>2]|0)+28>>2]&255](b)|0;j=f[(f[h>>2]|0)+32>>2]|0;g=f[g>>2]|0;ee[f[(f[g>>2]|0)+20>>2]&255](e,g);ee[j&255](h,e);ah(e)}h=f[(f[c>>2]|0)+8>>2]|0;j=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[h&255](c,j);ol(a,0);u=i;return d[a>>1]|0}function yl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function zl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Al(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Bl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Cl(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Dl(a,b,c){a=a|0;b=b|0;c=c|0;b=u;u=u+16|0;c=b;ol(c,1);u=b;return d[c>>1]|0}function El(a,b){a=a|0;b=b|0;jh(a);Yg(a+4|0,b);f[a>>2]=4792;return}function Fl(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4764;f[c+12>>2]=b;f[a+4>>2]=c;return}function Gl(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Hl(a){a=a|0;NY(a);$Y(a);return}function Il(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Jl(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==14467?a+12|0:0)|0}function Kl(a){a=a|0;$Y(a);return}function Ll(a){a=a|0;Pl(a+4|0);hh(a);return}function Ml(a){a=a|0;Ll(a);$Y(a);return}function Nl(a,b){a=a|0;b=b|0;$g(a+4|0,b);return}function Ol(a,b){a=a|0;b=b|0;Zg(a+4|0,b);return}function Pl(a){a=a|0;ah(a);return}function Ql(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4956;f[c+12>>2]=b;f[a+4>>2]=c;return}function Rl(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Sl(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4928;f[c+12>>2]=b;f[a+4>>2]=c;return}function Tl(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4900;f[c+12>>2]=b;f[a+4>>2]=c;return}function Ul(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4872;f[c+12>>2]=b;f[a+4>>2]=c;return}function Vl(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4844;f[c+12>>2]=b;f[a+4>>2]=c;return}function Wl(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=4816;f[c+12>>2]=b;f[a+4>>2]=c;return}function Xl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return}function Yl(a){a=a|0;NY(a);$Y(a);return}function Zl(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function _l(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==14762?a+12|0:0)|0}function $l(a){a=a|0;$Y(a);return}function am(a){a=a|0;NY(a);$Y(a);return}function bm(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function cm(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==14913?a+12|0:0)|0}function dm(a){a=a|0;$Y(a);return}function em(a){a=a|0;NY(a);$Y(a);return}function fm(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function gm(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==15054?a+12|0:0)|0}function hm(a){a=a|0;$Y(a);return}function im(a){a=a|0;NY(a);$Y(a);return}function jm(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function km(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==15197?a+12|0:0)|0}function lm(a){a=a|0;$Y(a);return}function mm(a){a=a|0;NY(a);$Y(a);return}function nm(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function om(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==15340?a+12|0:0)|0}function pm(a){a=a|0;$Y(a);return}function qm(a){a=a|0;NY(a);$Y(a);return}function rm(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function sm(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==15481?a+12|0:0)|0}function tm(a){a=a|0;$Y(a);return}function um(a){a=a|0;$k(a);$Y(a);return}function vm(a,b){a=a|0;b=b|0;pl(15755,18895);b=Td[f[(f[b>>2]|0)+32>>2]&255](b)|0;be[f[(f[b>>2]|0)+24>>2]&511](b);return}function wm(a,b){a=a|0;b=b|0;pl(15755,18735);return}function xm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0;k=u;u=u+32|0;h=k+20|0;i=k+8|0;j=k;he[f[(f[b>>2]|0)+64>>2]&63](i,b,e);a=f[i>>2]|0;f[j>>2]=a;g=f[i+4>>2]|0;f[j+4>>2]=g;if(g){SY(g);a=f[j>>2]|0}if((a|0)!=0?Mm(f[a+12>>2]|0)|0:0){g=f[(f[c>>2]|0)+8>>2]|0;e=Td[f[(f[b>>2]|0)+16>>2]&255](b)|0;ee[g&255](c,e);ol(h,1e3)}else l=7;do if((l|0)==7){if((Td[f[(f[b>>2]|0)+92>>2]&255](b)|0)==6?Vd[f[(f[b>>2]|0)+104>>2]&127](b,e)|0:0){e=f[(f[c>>2]|0)+8>>2]|0;l=Td[f[(f[b>>2]|0)+20>>2]&255](b)|0;ee[e&255](c,l);ol(h,0);break}ol(h,1)}while(0);ah(j);Jm(i);u=k;return d[h>>1]|0}function ym(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0;j=u;u=u+32|0;g=j+20|0;h=j+8|0;i=j;he[f[(f[b>>2]|0)+64>>2]&63](h,b,e);f[i>>2]=f[h>>2];a=f[h+4>>2]|0;f[i+4>>2]=a;if(a|0)SY(a);do if((Td[f[(f[b>>2]|0)+92>>2]&255](b)|0)!=7){a=f[i>>2]|0;if(a|0?Km(f[a+12>>2]|0)|0:0){e=f[(f[c>>2]|0)+8>>2]|0;b=Td[f[(f[b>>2]|0)+16>>2]&255](b)|0;ee[e&255](c,b);ol(g,1e3);break}if(Lm(Td[f[(f[b>>2]|0)+92>>2]&255](b)|0)|0){e=f[(f[c>>2]|0)+8>>2]|0;b=Td[f[(f[b>>2]|0)+12>>2]&255](b)|0;ee[e&255](c,b);ol(g,1e3);break}else{ol(g,1);break}}else{e=f[(f[c>>2]|0)+8>>2]|0;b=Td[f[(f[b>>2]|0)+24>>2]&255](b)|0;ee[e&255](c,b);ol(g,1e3)}while(0);ah(i);Jm(h);u=j;return d[g>>1]|0}function zm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Am(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Bm(a,b,c){a=a|0;b=b|0;c=c|0;b=u;u=u+16|0;c=b;ol(c,1);u=b;return d[c>>1]|0}function Cm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0;e=u;u=u+16|0;a=e+8|0;g=e;Im(g,.5,.5);if(Vd[f[(f[b>>2]|0)+104>>2]&127](b,g)|0){h=f[(f[c>>2]|0)+8>>2]|0;g=Td[f[(f[b>>2]|0)+20>>2]&255](b)|0;ee[h&255](c,g);ol(a,1e3)}else ol(a,10);u=e;return d[a>>1]|0}function Dm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Em(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Fm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Gm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Hm(a,b,c){a=a|0;b=b|0;c=c|0;b=u;u=u+16|0;c=b;ol(c,1);u=b;return d[c>>1]|0}function Im(a,b,c){a=a|0;b=+b;c=+c;n[a>>2]=b;n[a+4>>2]=c;return}function Jm(a){a=a|0;ah(a);return}function Km(a){a=a|0;return Mm(a)|0}function Lm(a){a=a|0;return (a&-2|0)!=6|0}function Mm(a){a=a|0;return a>>>0>2|0}function Nm(a){a=a|0;f[a>>2]=5052;ah(a+28|0);$k(a);return}function Om(a){a=a|0;Nm(a);$Y(a);return}function Pm(a,c){a=a|0;c=c|0;pl(17270,18895);b[a+4>>0]=0;c=Td[f[(f[c>>2]|0)+56>>2]&255](c)|0;uh((f[c>>2]|0)+120|0);return}function Qm(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c;pl(17270,18735);be[f[(f[b>>2]|0)+80>>2]&511](b);e=a+28|0;f[d>>2]=f[e>>2];f[e>>2]=0;a=a+32|0;f[d+4>>2]=f[a>>2];f[a>>2]=0;ah(d);b=Td[f[(f[b>>2]|0)+56>>2]&255](b)|0;uh((f[b>>2]|0)+144|0);u=c;return}function Rm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0;k=u;u=u+32|0;h=k+20|0;i=k+8|0;j=k;he[f[(f[b>>2]|0)+64>>2]&63](i,b,e);e=f[i>>2]|0;f[j>>2]=e;a=f[i+4>>2]|0;f[j+4>>2]=a;if(!a){g=j;a=e}else{SY(a);g=j;a=f[j>>2]|0}do if((a|0)!=0?Mm(f[a+12>>2]|0)|0:0){a=f[g>>2]|0;if((((f[a+12>>2]|0)==7?Vd[f[(f[b>>2]|0)+84>>2]&127](b,a)|0:0)?(e=Td[f[(f[b>>2]|0)+72>>2]&255](b)|0,((f[e+4>>2]|0)-(f[e>>2]|0)|0)==8):0)?Vd[f[(f[b>>2]|0)+108>>2]&127](b,f[j>>2]|0)|0:0){g=f[(f[c>>2]|0)+8>>2]|0;b=Td[f[(f[b>>2]|0)+20>>2]&255](b)|0;ee[g&255](c,b);ol(h,1e3);break}be[f[(f[b>>2]|0)+80>>2]&511](b);if(Vd[f[(f[b>>2]|0)+76>>2]&127](b,f[g>>2]|0)|0){ol(h,0);break}else{_g(17213,17242);g=f[(f[c>>2]|0)+8>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[g&255](c,b);ol(h,10);break}}else l=6;while(0);if((l|0)==6){g=f[(f[c>>2]|0)+8>>2]|0;l=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[g&255](c,l);ol(h,0)}ah(j);Jm(i);u=k;return d[h>>1]|0}function Sm(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=u;u=u+32|0;k=o+20|0;l=o+8|0;m=o;he[f[(f[c>>2]|0)+64>>2]&63](l,c,g);i=f[l>>2]|0;f[m>>2]=i;h=f[l+4>>2]|0;f[m+4>>2]=h;if(!h)j=m;else{SY(h);j=m;i=f[m>>2]|0}h=b[l+8>>0]|0;a:do if((i|0)!=0?Mm(f[i+12>>2]|0)|0:0){do if(!(h<<24>>24)){i=Km(f[(f[j>>2]|0)+12>>2]|0)|0;h=Vd[f[(f[c>>2]|0)+84>>2]&127](c,f[j>>2]|0)|0;if(!i){if(h)break;a=f[(f[e>>2]|0)+8>>2]|0;g=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;ee[a&255](e,g);ol(k,1e3);break a}if(!h?(be[f[(f[c>>2]|0)+80>>2]&511](c),!(Vd[f[(f[c>>2]|0)+76>>2]&127](c,f[j>>2]|0)|0)):0){a=f[(f[e>>2]|0)+8>>2]|0;g=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;ee[a&255](e,g);ol(k,10);break a}else{h=0;n=17}}else{i=Td[f[(f[c>>2]|0)+72>>2]&255](c)|0;if(((f[i+4>>2]|0)-(f[i>>2]|0)|0)!=8?(be[f[(f[c>>2]|0)+80>>2]&511](c),!(Vd[f[(f[c>>2]|0)+76>>2]&127](c,f[j>>2]|0)|0)):0){a=f[(f[e>>2]|0)+8>>2]|0;g=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;ee[a&255](e,g);ol(k,10);break a}else n=17}while(0);if((n|0)==17){g=(Oo(a,c,h,g)|0)&1;b[a+4>>0]=g}ol(k,0)}else n=6;while(0);if((n|0)==6){g=f[(f[e>>2]|0)+8>>2]|0;n=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;ee[g&255](e,n);ol(k,1e3)}ah(m);Jm(l);u=o;return d[k>>1]|0}function Tm(a,c,e,f){a=a|0;c=c|0;e=e|0;f=f|0;var g=0;g=u;u=u+16|0;e=g;if(b[a+4>>0]|0)Lo(a,c,f);ol(e,0);u=g;return d[e>>1]|0}function Um(a,c,e,f){a=a|0;c=c|0;e=e|0;f=f|0;var g=0;g=u;u=u+16|0;e=g;if(b[a+4>>0]|0){Lo(a,c,f);uo(a,c)}ol(e,0);u=g;return d[e>>1]|0}function Vm(a,c,e){a=a|0;c=c|0;e=e|0;var f=0;f=u;u=u+16|0;e=f;if(b[a+4>>0]|0)uo(a,c);ol(e,0);u=f;return d[e>>1]|0}function Wm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Xm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Ym(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0;l=u;u=u+48|0;h=l+36|0;i=l+24|0;j=l+16|0;k=l;an(i);a=Td[f[(f[c>>2]|0)+72>>2]&255](c)|0;e=f[a+4>>2]|0;a=f[a>>2]|0;while(1){if((a|0)==(e|0))break;m=f[a>>2]|0;ee[f[(f[m>>2]|0)+32>>2]&255](k,m);b[j>>0]=b[k>>0]|0;b[j+1>>0]=b[k+1>>0]|0;b[j+2>>0]=b[k+2>>0]|0;m=f[a>>2]|0;ee[f[(f[m>>2]|0)+36>>2]&255](m,g);m=f[a>>2]|0;eo(i,Td[f[(f[m>>2]|0)+8>>2]&255](m)|0,j,g);a=a+8|0}be[f[(f[c>>2]|0)+88>>2]&511](c);m=Td[f[(f[c>>2]|0)+52>>2]&255](c)|0;g=f[(f[m>>2]|0)+8>>2]|0;cn(j,i);ee[g&255](m,j);fh(j);ol(h,0);dn(i);u=l;return d[h>>1]|0}function Zm(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0.0,o=0;l=u;u=u+48|0;g=l+40|0;h=l+28|0;i=l+24|0;j=l+16|0;k=l;an(h);a=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;m=+On(a,+((Nn(e)|0)>>>0));n[i>>2]=m;a=Td[f[(f[b>>2]|0)+72>>2]&255](b)|0;c=f[a+4>>2]|0;e=k+4|0;a=f[a>>2]|0;while(1){if((a|0)==(c|0))break;o=f[a>>2]|0;ee[f[(f[o>>2]|0)+32>>2]&255](k,o);f[j>>2]=f[e>>2];o=f[a>>2]|0;ce[f[(f[o>>2]|0)+40>>2]&7](o,+n[i>>2]);o=f[a>>2]|0;Pn(h,Td[f[(f[o>>2]|0)+8>>2]&255](o)|0,j,i);a=a+8|0}be[f[(f[b>>2]|0)+88>>2]&511](b);o=Td[f[(f[b>>2]|0)+52>>2]&255](b)|0;b=f[(f[o>>2]|0)+8>>2]|0;cn(j,h);ee[b&255](o,j);fh(j);ol(g,0);dn(h);u=l;return d[g>>1]|0}function _m(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0;m=u;u=u+48|0;h=m+36|0;i=m+38|0;j=m+24|0;k=m+16|0;l=m;b[i>>0]=g&1;an(j);a=Td[f[(f[c>>2]|0)+72>>2]&255](c)|0;e=f[a+4>>2]|0;g=l+8|0;a=f[a>>2]|0;while(1){if((a|0)==(e|0))break;n=f[a>>2]|0;ee[f[(f[n>>2]|0)+32>>2]&255](l,n);b[k>>0]=b[g>>0]|0;n=f[a>>2]|0;ee[f[(f[n>>2]|0)+44>>2]&255](n,(b[i>>0]|0)!=0);n=f[a>>2]|0;xn(j,Td[f[(f[n>>2]|0)+8>>2]&255](n)|0,k,i);a=a+8|0}be[f[(f[c>>2]|0)+88>>2]&511](c);n=Td[f[(f[c>>2]|0)+52>>2]&255](c)|0;c=f[(f[n>>2]|0)+8>>2]|0;cn(k,j);ee[c&255](n,k);fh(k);ol(h,0);dn(j);u=m;return d[h>>1]|0}function $m(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;k=u;u=u+32|0;g=k+20|0;h=k+8|0;i=k;an(h);j=Td[f[(f[b>>2]|0)+28>>2]&255](b)|0;a=Td[f[(f[b>>2]|0)+72>>2]&255](b)|0;e=f[a+4>>2]|0;a=f[a>>2]|0;while(1){if((a|0)==(e|0))break;m=f[(f[j>>2]|0)+36>>2]|0;l=f[a>>2]|0;l=Td[f[(f[l>>2]|0)+8>>2]&255](l)|0;he[m&63](i,j,l);if(f[i>>2]|0)bn(h,i);ah(i);a=a+8|0}l=Td[f[(f[b>>2]|0)+52>>2]&255](b)|0;m=f[(f[l>>2]|0)+8>>2]|0;cn(i,h);ee[m&255](l,i);fh(i);l=f[(f[c>>2]|0)+8>>2]|0;m=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[l&255](c,m);ol(g,0);dn(h);u=k;return d[g>>1]|0}function an(a){a=a|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;return}function bn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;h=u;u=u+32|0;e=h+16|0;g=h+8|0;d=h;c=YY(12,47264)|0;if(!c)c=0;else ln(c,b);f[d>>2]=0;f[e>>2]=f[d>>2];mn(g,c,e);c=f[g>>2]|0;if(c|0){f[e>>2]=c;d=e+4|0;c=f[g+4>>2]|0;f[d>>2]=c;if(c|0)SY(c);c=a+4|0;b=f[c>>2]|0;if(b>>>0<(f[a+8>>2]|0)>>>0){f[b>>2]=f[e>>2];f[b+4>>2]=f[d>>2];f[e>>2]=0;f[d>>2]=0;f[c>>2]=b+8}else nn(a,e);fh(e)}on(g);u=h;return}function cn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0;i=u;u=u+32|0;e=i+16|0;g=i+8|0;h=i;c=f[b>>2]|0;d=f[b+4>>2]|0;do if((c|0)==(d|0)){f[a>>2]=0;f[a+4>>2]=0}else{if((d-c|0)==8){f[a>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+4>>2]=c;if(!c)break;SY(c);break}c=YY(16,47264)|0;if(!c)c=0;else ih(c,b);f[h>>2]=0;f[e>>2]=f[h>>2];en(g,c,e);f[a>>2]=f[g>>2];h=g+4|0;f[a+4>>2]=f[h>>2];f[g>>2]=0;f[h>>2]=0;fn(g)}while(0);u=i;return}function dn(a){a=a|0;gh(a);return}function en(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5120;f[c+12>>2]=b;f[a+4>>2]=c;return}function fn(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function gn(a){a=a|0;NY(a);$Y(a);return}function hn(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function jn(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==15798?a+12|0:0)|0}function kn(a){a=a|0;$Y(a);return}function ln(a,b){a=a|0;b=b|0;jh(a);Yg(a+4|0,b);f[a>>2]=5176;return}function mn(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5148;f[c+12>>2]=b;f[a+4>>2]=c;return}function nn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;c=h;d=a+4|0;e=((f[d>>2]|0)-(f[a>>2]|0)>>3)+1|0;g=nh(a)|0;if(g>>>0<e>>>0)MY(a);else{i=f[a>>2]|0;k=(f[a+8>>2]|0)-i|0;j=k>>2;yh(c,k>>3>>>0<g>>>1>>>0?(j>>>0<e>>>0?e:j):g,(f[d>>2]|0)-i>>3,a+8|0);g=c+8|0;e=f[g>>2]|0;f[e>>2]=f[b>>2];d=b+4|0;f[e+4>>2]=f[d>>2];f[b>>2]=0;f[d>>2]=0;f[g>>2]=e+8;zh(a,c);Ah(c);u=h;return}}function on(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function pn(a){a=a|0;NY(a);$Y(a);return}function qn(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function rn(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==15949?a+12|0:0)|0}function sn(a){a=a|0;$Y(a);return}function tn(a){a=a|0;Pl(a+4|0);hh(a);return}function un(a){a=a|0;tn(a);$Y(a);return}function vn(a,b){a=a|0;b=b|0;Zg(a+4|0,b);return}function wn(a,b){a=a|0;b=b|0;$g(a+4|0,b);return}function xn(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0;k=u;u=u+32|0;i=k+16|0;j=k+8|0;h=k;g=YY(28,47264)|0;if(!g)g=0;else yn(g,c,(b[d>>0]|0)!=0,(b[e>>0]|0)!=0);f[h>>2]=0;f[i>>2]=f[h>>2];zn(j,g,i);g=f[j>>2]|0;if(g|0){f[i>>2]=g;d=i+4|0;g=f[j+4>>2]|0;f[d>>2]=g;if(g|0)SY(g);g=a+4|0;c=f[g>>2]|0;if(c>>>0<(f[a+8>>2]|0)>>>0){f[c>>2]=f[i>>2];f[c+4>>2]=f[d>>2];f[i>>2]=0;f[d>>2]=0;f[g>>2]=c+8}else nn(a,i);fh(i)}An(j);u=k;return}function yn(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0;g=u;u=u+32|0;h=g+8|0;j=g+17|0;i=g+16|0;k=g;b[j>>0]=d&1;b[i>>0]=e&1;f[k>>2]=44;f[k+4>>2]=1;f[h>>2]=f[k>>2];f[h+4>>2]=f[k+4>>2];Fn(a,c,j,i,h);f[a>>2]=5228;u=g;return}function zn(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5200;f[c+12>>2]=b;f[a+4>>2]=c;return}function An(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Bn(a){a=a|0;NY(a);$Y(a);return}function Cn(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Dn(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==16115?a+12|0:0)|0}function En(a){a=a|0;$Y(a);return}function Fn(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0;h=f[g>>2]|0;g=f[g+4>>2]|0;jh(a);f[a>>2]=5252;iZ(a+4|0,c);b[a+16>>0]=b[d>>0]|0;b[a+17>>0]=b[e>>0]|0;f[a+20>>2]=h;f[a+24>>2]=g;return}function Gn(a){a=a|0;f[a>>2]=5252;jZ(a+4|0);hh(a);return}function Hn(a){a=a|0;Gn(a);$Y(a);return}function In(a,b){a=a|0;b=b|0;Kn(a,b,a+16|0);return}function Jn(a,b){a=a|0;b=b|0;Kn(a,b,a+17|0);return}function Kn(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0;j=u;u=u+16|0;h=j+8|0;i=j;Ln(h,a,c);g=f[h>>2]|0;if(g|0){e=f[a+20>>2]|0;k=f[a+24>>2]|0;a=g+(k>>1)|0;if(k&1)e=f[(f[a>>2]|0)+e>>2]|0;ee[e&255](a,(b[d>>0]|0)!=0);k=f[(f[c>>2]|0)+48>>2]|0;d=f[h>>2]|0;ee[f[(f[d>>2]|0)+48>>2]&255](i,d);ee[k&255](c,i);ah(i)}Wh(h);u=j;return}function Ln(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;he[f[(f[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=f[d>>2]|0;if(!b){f[a>>2]=0;f[a+4>>2]=0}else Ei(a,b);ah(d);u=e;return}function Mn(a){a=a|0;Gn(a);$Y(a);return}function Nn(a){a=a|0;return f[a>>2]|0}function On(a,b){a=a|0;b=+b;var c=0;c=(Td[f[(f[a>>2]|0)+16>>2]&255](a)|0)+8|0;b=+n[c>>2]*b;return +(b/+Qd[f[(f[a>>2]|0)+20>>2]&7](a))}function Pn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;j=u;u=u+32|0;h=j+16|0;i=j+8|0;g=j;e=YY(32,47264)|0;if(!e)e=0;else Qn(e,b,+n[c>>2],+n[d>>2]);f[g>>2]=0;f[h>>2]=f[g>>2];Rn(i,e,h);e=f[i>>2]|0;if(e|0){f[h>>2]=e;c=h+4|0;e=f[i+4>>2]|0;f[c>>2]=e;if(e|0)SY(e);e=a+4|0;b=f[e>>2]|0;if(b>>>0<(f[a+8>>2]|0)>>>0){f[b>>2]=f[h>>2];f[b+4>>2]=f[c>>2];f[h>>2]=0;f[c>>2]=0;f[e>>2]=b+8}else nn(a,h);fh(h)}Sn(i);u=j;return}function Qn(a,b,c,d){a=a|0;b=b|0;c=+c;d=+d;var e=0,g=0,h=0,i=0,j=0;e=u;u=u+32|0;g=e+16|0;i=e+12|0;h=e+8|0;j=e;n[i>>2]=c;n[h>>2]=d;f[j>>2]=40;f[j+4>>2]=1;f[g>>2]=f[j>>2];f[g+4>>2]=f[j+4>>2];Xn(a,b,i,h,g);f[a>>2]=5304;u=e;return}function Rn(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5276;f[c+12>>2]=b;f[a+4>>2]=c;return}function Sn(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Tn(a){a=a|0;NY(a);$Y(a);return}function Un(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Vn(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==16366?a+12|0:0)|0}function Wn(a){a=a|0;$Y(a);return}function Xn(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0;g=f[e>>2]|0;e=f[e+4>>2]|0;jh(a);f[a>>2]=5328;iZ(a+4|0,b);f[a+16>>2]=f[c>>2];f[a+20>>2]=f[d>>2];f[a+24>>2]=g;f[a+28>>2]=e;return}function Yn(a){a=a|0;f[a>>2]=5328;jZ(a+4|0);hh(a);return}function Zn(a){a=a|0;Yn(a);$Y(a);return}function _n(a,b){a=a|0;b=b|0;ao(a,b,a+16|0);return}function $n(a,b){a=a|0;b=b|0;ao(a,b,a+20|0);return}function ao(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;i=u;u=u+16|0;g=i+8|0;h=i;bo(g,a,b);e=f[g>>2]|0;if(e|0){d=f[a+24>>2]|0;j=f[a+28>>2]|0;a=e+(j>>1)|0;if(j&1)d=f[(f[a>>2]|0)+d>>2]|0;ce[d&7](a,+n[c>>2]);j=f[(f[b>>2]|0)+48>>2]|0;c=f[g>>2]|0;ee[f[(f[c>>2]|0)+48>>2]&255](h,c);ee[j&255](b,h);ah(h)}Wh(g);u=i;return}function bo(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;he[f[(f[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=f[d>>2]|0;if(!b){f[a>>2]=0;f[a+4>>2]=0}else Ei(a,b);ah(d);u=e;return}function co(a){a=a|0;Yn(a);$Y(a);return}function eo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;j=u;u=u+32|0;h=j+16|0;i=j+8|0;g=j;e=YY(32,47264)|0;if(!e)e=0;else fo(e,b,c,d);f[g>>2]=0;f[h>>2]=f[g>>2];go(i,e,h);e=f[i>>2]|0;if(e|0){f[h>>2]=e;c=h+4|0;e=f[i+4>>2]|0;f[c>>2]=e;if(e|0)SY(e);e=a+4|0;b=f[e>>2]|0;if(b>>>0<(f[a+8>>2]|0)>>>0){f[b>>2]=f[h>>2];f[b+4>>2]=f[c>>2];f[h>>2]=0;f[c>>2]=0;f[e>>2]=b+8}else nn(a,h);fh(h)}ho(i);u=j;return}function fo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0;e=u;u=u+16|0;g=e+8|0;h=e;f[h>>2]=36;f[h+4>>2]=1;f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];mo(a,b,c,d,g);f[a>>2]=5380;u=e;return}function go(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5352;f[c+12>>2]=b;f[a+4>>2]=c;return}function ho(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function io(a){a=a|0;NY(a);$Y(a);return}function jo(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function ko(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==16617?a+12|0:0)|0}function lo(a){a=a|0;$Y(a);return}function mo(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0;h=f[g>>2]|0;g=f[g+4>>2]|0;jh(a);f[a>>2]=5404;iZ(a+4|0,c);c=a+16|0;b[c>>0]=b[d>>0]|0;b[c+1>>0]=b[d+1>>0]|0;b[c+2>>0]=b[d+2>>0]|0;d=a+19|0;b[d>>0]=b[e>>0]|0;b[d+1>>0]=b[e+1>>0]|0;b[d+2>>0]=b[e+2>>0]|0;f[a+24>>2]=h;f[a+28>>2]=g;return}function no(a){a=a|0;f[a>>2]=5404;jZ(a+4|0);hh(a);return}function oo(a){a=a|0;no(a);$Y(a);return}function po(a,b){a=a|0;b=b|0;ro(a,b,a+16|0);return}function qo(a,b){a=a|0;b=b|0;ro(a,b,a+19|0);return}function ro(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;i=u;u=u+16|0;g=i+8|0;h=i;so(g,a,b);e=f[g>>2]|0;if(e|0){d=f[a+24>>2]|0;j=f[a+28>>2]|0;a=e+(j>>1)|0;if(j&1)d=f[(f[a>>2]|0)+d>>2]|0;ee[d&255](a,c);j=f[(f[b>>2]|0)+48>>2]|0;c=f[g>>2]|0;ee[f[(f[c>>2]|0)+48>>2]&255](h,c);ee[j&255](b,h);ah(h)}Wh(g);u=i;return}function so(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;he[f[(f[c>>2]|0)+28>>2]&63](d,c,b+4|0);b=f[d>>2]|0;if(!b){f[a>>2]=0;f[a+4>>2]=0}else Ei(a,b);ah(d);u=e;return}function to(a){a=a|0;no(a);$Y(a);return}function uo(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0;h=u;u=u+32|0;d=h+8|0;e=h;b[a+4>>0]=0;g=Td[f[(f[c>>2]|0)+72>>2]&255](c)|0;if((f[g>>2]|0)!=(f[g+4>>2]|0)){an(d);if(!(b[a+16>>0]|0))vo(a,g,d);else wo(a,f[f[g>>2]>>2]|0,d);be[f[(f[c>>2]|0)+88>>2]&511](c);g=Td[f[(f[c>>2]|0)+52>>2]&255](c)|0;c=f[(f[g>>2]|0)+8>>2]|0;cn(e,d);ee[c&255](g,e);fh(e);dn(d)}u=h;return}function vo(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=f[b+4>>2]|0;d=a+20|0;a=f[b>>2]|0;while(1){if((a|0)==(e|0))break;b=f[a>>2]|0;be[f[(f[b>>2]|0)+20>>2]&511](b);b=f[a>>2]|0;Eo(c,Td[f[(f[b>>2]|0)+8>>2]&255](b)|0,d);a=a+8|0}return}function wo(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0;d=u;u=u+16|0;e=d;be[f[(f[b>>2]|0)+20>>2]&511](b);g=a+28|0;ee[f[(f[b>>2]|0)+48>>2]&255](e,b);xo(c,g,e);ah(e);f[e>>2]=f[g>>2];f[g>>2]=0;c=a+32|0;f[e+4>>2]=f[c>>2];f[c>>2]=0;ah(e);u=d;return}function xo(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;i=u;u=u+32|0;g=i+16|0;h=i+8|0;e=i;d=YY(20,47264)|0;if(!d)d=0;else Qh(d,b,c);f[e>>2]=0;f[g>>2]=f[e>>2];yo(h,d,g);d=f[h>>2]|0;if(d|0){f[g>>2]=d;c=g+4|0;d=f[h+4>>2]|0;f[c>>2]=d;if(d|0)SY(d);d=a+4|0;b=f[d>>2]|0;if(b>>>0<(f[a+8>>2]|0)>>>0){f[b>>2]=f[g>>2];f[b+4>>2]=f[c>>2];f[g>>2]=0;f[c>>2]=0;f[d>>2]=b+8}else nn(a,g);fh(g)}zo(h);u=i;return}function yo(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5428;f[c+12>>2]=b;f[a+4>>2]=c;return}function zo(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Ao(a){a=a|0;NY(a);$Y(a);return}function Bo(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Co(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==16869?a+12|0:0)|0}function Do(a){a=a|0;$Y(a);return}function Eo(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;i=u;u=u+32|0;g=i+16|0;h=i+8|0;e=i;d=YY(24,47264)|0;if(!d)d=0;else Xh(d,b,c);f[e>>2]=0;f[g>>2]=f[e>>2];Fo(h,d,g);d=f[h>>2]|0;if(d|0){f[g>>2]=d;c=g+4|0;d=f[h+4>>2]|0;f[c>>2]=d;if(d|0)SY(d);d=a+4|0;b=f[d>>2]|0;if(b>>>0<(f[a+8>>2]|0)>>>0){f[b>>2]=f[g>>2];f[b+4>>2]=f[c>>2];f[g>>2]=0;f[c>>2]=0;f[d>>2]=b+8}else nn(a,g);fh(g)}Go(h);u=i;return}function Fo(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5456;f[c+12>>2]=b;f[a+4>>2]=c;return}function Go(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Ho(a){a=a|0;NY(a);$Y(a);return}function Io(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Jo(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==17026?a+12|0:0)|0}function Ko(a){a=a|0;$Y(a);return}function Lo(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0;g=u;u=u+16|0;i=g+8|0;h=g;e=Td[f[(f[c>>2]|0)+72>>2]&255](c)|0;c=Td[f[(f[c>>2]|0)+36>>2]&255](c)|0;he[f[(f[c>>2]|0)+24>>2]&63](i,c,d);Ov(h,i,a+8|0);d=f[h+4>>2]|0;c=a+20|0;f[c>>2]=f[h>>2];f[c+4>>2]=d;c=f[e>>2]|0;do if((c|0)!=(f[e+4>>2]|0))if(!(b[a+16>>0]|0)){Mo(a,e);break}else{No(a,f[c>>2]|0);break}while(0);u=g;return}function Mo(a,b){a=a|0;b=b|0;var c=0,d=0;d=f[b+4>>2]|0;c=a+20|0;a=f[b>>2]|0;while(1){if((a|0)==(d|0))break;b=f[a>>2]|0;ee[f[(f[b>>2]|0)+16>>2]&255](b,c);a=a+8|0}return}function No(a,b){a=a|0;b=b|0;ee[f[(f[b>>2]|0)+16>>2]&255](b,a+20|0);return}function Oo(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0;k=u;u=u+16|0;i=k;j=k+8|0;g=Td[f[(f[c>>2]|0)+72>>2]&255](c)|0;h=g+4|0;a:do if((f[g>>2]|0)==(f[h>>2]|0)){_g(17167,17197);c=0}else{b[a+4>>0]=1;l=Td[f[(f[c>>2]|0)+36>>2]&255](c)|0;he[f[(f[l>>2]|0)+24>>2]&63](i,l,e);l=i;e=f[l+4>>2]|0;c=a+8|0;f[c>>2]=f[l>>2];f[c+4>>2]=e;b[a+16>>0]=d;c=f[g>>2]|0;if(d<<24>>24){h=f[c>>2]|0;ee[f[(f[h>>2]|0)+12>>2]&255](h,d);c=f[c>>2]|0;ee[f[(f[c>>2]|0)+48>>2]&255](j,c);c=a+28|0;d=f[j>>2]|0;h=j+4|0;l=f[h>>2]|0;f[j>>2]=0;f[h>>2]=0;f[i>>2]=f[c>>2];f[c>>2]=d;c=a+32|0;f[i+4>>2]=f[c>>2];f[c>>2]=l;ah(i);ah(j);c=1;break}e=f[h>>2]|0;while(1){if((c|0)==(e|0)){c=1;break a}l=f[c>>2]|0;ee[f[(f[l>>2]|0)+12>>2]&255](l,0);c=c+8|0}}while(0);u=k;return c|0}function Po(a){a=a|0;f[a>>2]=5484;qp(a+124|0);Rp(a+112|0);Rl(a+104|0);Sp(a+96|0);Sp(a+88|0);Sp(a+80|0);Sp(a+72|0);Sp(a+64|0);Tp(a+36|0);Up(a+28|0);Vp(a+20|0);Wp(a+12|0);Xp(a+4|0);Yp(a);return}function Qo(a){a=a|0;Po(a);$Y(a);return}function Ro(a){a=a|0;return a+64|0}function So(a){a=a|0;return a+72|0}function To(a){a=a|0;return a+80|0}function Uo(a){a=a|0;return a+88|0}function Vo(a){a=a|0;return a+96|0}function Wo(a){a=a|0;return f[a+4>>2]|0}function Xo(a){a=a|0;return f[a+12>>2]|0}function Yo(a){a=a|0;return f[a+44>>2]|0}function Zo(a){a=a|0;return f[a+48>>2]|0}function _o(a){a=a|0;return f[a+20>>2]|0}function $o(a){a=a|0;return f[a+28>>2]|0}function ap(a){a=a|0;return f[a+52>>2]|0}function bp(a){a=a|0;return a+36|0}function cp(a){a=a|0;return a+104|0}function dp(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0;e=u;u=u+16|0;g=e;h=f[c+12>>2]|0;he[f[(f[h>>2]|0)+32>>2]&63](g,h,d);d=f[c+4>>2]|0;he[f[(f[d>>2]|0)+24>>2]&63](a,d,g);b[a+8>>0]=b[g+4>>0]|0;u=e;return}function ep(a,c){a=a|0;c=c|0;var d=0,e=0.0,g=0;d=c+48|0;g=f[d>>2]|0;c=f[c+44>>2]|0;e=+On(c,+((Nn(g)|0)>>>0));Qp(a,g+4|0,e,(b[(f[d>>2]|0)+7>>0]|0)!=0);return}function fp(a){a=a|0;return a+112|0}function gp(a,c){a=a|0;c=c|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0;l=u;u=u+48|0;h=l;k=l+40|0;i=l+24|0;j=l+16|0;g=l+8|0;if(Vd[f[(f[a>>2]|0)+84>>2]&127](a,c)|0)e=1;else{Ei(k,c);if(!(f[k>>2]|0))e=0;else{if(zp(f[c+12>>2]|0)|0?(e=f[a+4>>2]|0,he[f[(f[e>>2]|0)+40>>2]&63](i,e,c),b[i>>0]|0):0){e=YY(20,47264)|0;if(!e)e=0;else ai(e,c,d[i+2>>1]|0,d[i+4>>1]|0);f[g>>2]=0;f[h>>2]=f[g>>2];Ap(j,e,h);e=f[a+52>>2]|0;c=f[(f[e>>2]|0)+8>>2]|0;f[h>>2]=f[j>>2];g=f[j+4>>2]|0;f[h+4>>2]=g;if(g|0)SY(g);ee[c&255](e,h);fh(h);Bp(j)}j=f[k>>2]|0;if(Td[f[(f[j>>2]|0)+28>>2]&255](j)|0){j=f[k>>2]|0;ee[f[(f[j>>2]|0)+32>>2]&255](i,j);Cp(h,a,i);i=f[h+4>>2]|0;j=f[a+48>>2]|0;f[j>>2]=f[h>>2];f[j+4>>2]=i;uh(f[a+36>>2]|0)}g=a+116|0;e=f[g>>2]|0;if((e|0)==(f[a+120>>2]|0))Dp(a+112|0,k);else{f[e>>2]=f[k>>2];c=f[k+4>>2]|0;f[e+4>>2]=c;if(c){SY(c);e=f[g>>2]|0}f[g>>2]=e+8}e=f[a+12>>2]|0;be[f[(f[e>>2]|0)+24>>2]&511](e);e=1}Wh(k)}u=l;return e|0}function hp(a){a=a|0;var b=0,c=0,d=0;b=f[a+112>>2]|0;c=a+116|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;Wh(d)}d=f[a+12>>2]|0;be[f[(f[d>>2]|0)+24>>2]&511](d);return}function ip(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;g=u;u=u+16|0;d=g;h=f[a+112>>2]|0;e=a+116|0;c=f[e>>2]|0;f[d>>2]=b;a=h;while(1){if((a|0)==(c|0)){a=c;break}if(xp(d,a)|0)break;a=a+8|0}u=g;return (a|0)!=(f[e>>2]|0)|0}function jp(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0;e=u;u=u+16|0;b=e;c=f[a+116>>2]|0;d=a+4|0;a=f[a+112>>2]|0;while(1){if((a|0)==(c|0))break;g=f[d>>2]|0;h=f[(f[g>>2]|0)+48>>2]|0;i=f[a>>2]|0;ee[f[(f[i>>2]|0)+48>>2]&255](b,i);ee[h&255](g,b);ah(b);a=a+8|0}u=e;return}function kp(a){a=a|0;return f[a+56>>2]|0}function lp(a,b){a=a|0;b=b|0;var c=0,e=0;e=u;u=u+16|0;c=e;f[a+56>>2]=b;ol(c,0);u=e;return d[c>>1]|0}function mp(a){a=a|0;return a+124|0}function np(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+112|0;k=p+104|0;l=p+92|0;m=p+88|0;n=p+76|0;i=p+64|0;j=p+56|0;o=p;h=f[a+20>>2]|0;ee[f[(f[h>>2]|0)+8>>2]&255](n,h);ee[f[(f[a>>2]|0)+68>>2]&255](i,a);h=f[a+44>>2]|0;he[f[(f[h>>2]|0)+24>>2]&63](j,h,c);f[l>>2]=0;f[l+4>>2]=0;f[l+8>>2]=0;h=0;c=46632;while(1){if(vp(f[c>>2]|0,0)|0)break;h=h+1|0;c=c+4|0}if(h>>>0>1073741807)gZ(l);do if(h>>>0>=2){c=h+4&-4;if(c>>>0>1073741823){p=Sa(8)|0;eZ(p,38407);f[p>>2]=11336;Wa(p|0,3056,442)}else{g=XY(c<<2)|0;f[l>>2]=g;f[l+8>>2]=c|-2147483648;f[l+4>>2]=h;c=g;break}}else{b[l+8+3>>0]=h;c=l}while(0);d=c;e=h;g=46632;while(1){if(!e)break;Pg(d,g);d=d+4|0;e=e+-1|0;g=g+4|0}f[k>>2]=0;Pg(c+(h<<2)|0,k);wp(o,n,i,l,f[a+60>>2]|0,j);Jg(l);d=a+124|0;c=YY(64,47264)|0;if(!c)c=0;else Vg(c,o,1);f[m>>2]=0;f[k>>2]=f[m>>2];pp(l,c,k);i=f[l>>2]|0;f[l>>2]=f[d>>2];f[d>>2]=i;i=l+4|0;m=a+128|0;j=f[i>>2]|0;f[i>>2]=f[m>>2];f[m>>2]=j;qp(l);m=f[a+4>>2]|0;l=f[(f[m>>2]|0)+32>>2]|0;a=f[d>>2]|0;ee[f[(f[a>>2]|0)+60>>2]&255](k,a);ee[l&255](m,k);ah(k);m=(f[d>>2]|0)!=0;Ig(o);jZ(n);u=p;return m|0}function op(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0;i=u;u=u+32|0;d=i+16|0;e=i+8|0;g=i;h=a+124|0;c=YY(64,47264)|0;if(!c)c=0;else Vg(c,b,0);f[g>>2]=0;f[d>>2]=f[g>>2];pp(e,c,d);d=f[e>>2]|0;f[e>>2]=f[h>>2];f[h>>2]=d;d=e+4|0;g=a+128|0;a=f[d>>2]|0;f[d>>2]=f[g>>2];f[g>>2]=a;qp(e);u=i;return (f[h>>2]|0)!=0|0}function pp(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5604;f[c+12>>2]=b;f[a+4>>2]=c;return}function qp(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function rp(a){a=a|0;NY(a);$Y(a);return}function sp(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function tp(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==17315?a+12|0:0)|0}function up(a){a=a|0;$Y(a);return}function vp(a,b){a=a|0;b=b|0;return (a|0)==(b|0)|0}function wp(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;Je(a,b,7);b=a+16|0;f[b>>2]=f[c>>2];f[b+4>>2]=f[c+4>>2];f[b+8>>2]=f[c+8>>2];Og(a+28|0,d);f[a+40>>2]=e;d=g;e=f[d+4>>2]|0;g=a+44|0;f[g>>2]=f[d>>2];f[g+4>>2]=e;return}function xp(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;h=f[c>>2]|0;h=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;d=f[a>>2]|0;c=b[h+11>>0]|0;e=c<<24>>24<0;c=c&255;g=e?f[h+4>>2]|0:c;i=b[d+11>>0]|0;a=i<<24>>24<0;a:do if((g|0)==((a?f[d+4>>2]|0:i&255)|0)){d=a?f[d>>2]|0:d;if(e){c=(yp(f[h>>2]|0,d,g)|0)==0;break}a=h;while(1){if(!c){c=1;break a}if((b[a>>0]|0)!=(b[d>>0]|0)){c=0;break a}d=d+1|0;a=a+1|0;c=c+-1|0}}else c=0;while(0);return c|0}function yp(a,b,c){a=a|0;b=b|0;c=c|0;if(!c)a=0;else a=EY(a,b,c)|0;return a|0}function zp(a){a=a|0;return Mm(a)|0}function Ap(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5632;f[c+12>>2]=b;f[a+4>>2]=c;return}function Bp(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Cp(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0;e=u;u=u+16|0;g=e+8|0;i=e+4|0;h=e;Jp(i,+Ip(f[c+44>>2]|0,+n[d+4>>2]));f[h>>2]=f[i>>2];c=(b[d+8>>0]|0)!=0;f[g>>2]=f[h>>2];Kp(a,g,d,c);u=e;return}function Dp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;g=h;c=a+4|0;d=((f[c>>2]|0)-(f[a>>2]|0)>>3)+1|0;e=Ep(a)|0;if(e>>>0<d>>>0)MY(a);i=f[a>>2]|0;k=(f[a+8>>2]|0)-i|0;j=k>>2;Fp(g,k>>3>>>0<e>>>1>>>0?(j>>>0<d>>>0?d:j):e,(f[c>>2]|0)-i>>3,a+8|0);e=g+8|0;c=f[e>>2]|0;f[c>>2]=f[b>>2];d=f[b+4>>2]|0;f[c+4>>2]=d;if(d){SY(d);c=f[e>>2]|0}f[e>>2]=c+8;Gp(a,g);Hp(g);u=h;return}function Ep(a){a=a|0;return 536870911}function Fp(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>536870911){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<3)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<3)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<3);return}function Gp(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;d=f[a>>2]|0;e=a+4|0;g=b+4|0;c=f[e>>2]|0;while(1){if((c|0)==(d|0))break;j=f[g>>2]|0;h=c+-8|0;f[j+-8>>2]=f[h>>2];i=c+-4|0;f[j+-4>>2]=f[i>>2];f[h>>2]=0;f[i>>2]=0;f[g>>2]=(f[g>>2]|0)+-8;c=h}h=f[a>>2]|0;f[a>>2]=f[g>>2];f[g>>2]=h;h=b+8|0;j=f[e>>2]|0;f[e>>2]=f[h>>2];f[h>>2]=j;h=a+8|0;j=b+12|0;i=f[h>>2]|0;f[h>>2]=f[j>>2];f[j>>2]=i;f[b>>2]=f[g>>2];return}function Hp(a){a=a|0;var b=0,c=0,d=0;b=f[a+4>>2]|0;c=a+8|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;Wh(d)}a=f[a>>2]|0;if(a|0)$Y(a);return}function Ip(a,b){a=a|0;b=+b;b=+Qd[f[(f[a>>2]|0)+20>>2]&7](a)*b;a=(Td[f[(f[a>>2]|0)+16>>2]&255](a)|0)+8|0;return +(b/+n[a>>2])}function Jp(a,b){a=a|0;b=+b;var c=0;c=Lp(b)|0;f[a>>2]=c;return}function Kp(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;f[a>>2]=f[c>>2];c=a+4|0;b[c>>0]=b[d>>0]|0;b[c+1>>0]=b[d+1>>0]|0;b[c+2>>0]=b[d+2>>0]|0;b[a+7>>0]=e&1;return}function Lp(a){a=+a;var b=0;if(!(a<=4.0))if(!(a>=12.0))b=~~(a*2.0+2.0)>>>0>>>2<<1;else b=12;else b=4;return b|0}function Mp(a){a=a|0;NY(a);$Y(a);return}function Np(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Op(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==17454?a+12|0:0)|0}function Pp(a){a=a|0;$Y(a);return}function Qp(a,c,d,e){a=a|0;c=c|0;d=+d;e=e|0;b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;n[a+4>>2]=d;b[a+8>>0]=e&1;return}function Rp(a){a=a|0;var b=0,c=0,d=0;b=f[a>>2]|0;if(b|0){c=a+4|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;Wh(d)}$Y(f[a>>2]|0)}return}function Sp(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Tp(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Up(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Vp(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Wp(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Xp(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Yp(a){a=a|0;return}function Zp(a,b,c,d,e,g,h,i,j,k,l){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=u;u=u+32|0;q=s+20|0;m=s+16|0;n=s+12|0;o=s+8|0;p=s+4|0;r=s;_p(a);f[a>>2]=5484;f[a+4>>2]=f[b>>2];b=f[b+4>>2]|0;f[a+8>>2]=b;if(b|0)SY(b);f[a+12>>2]=f[c>>2];b=f[c+4>>2]|0;f[a+16>>2]=b;if(b|0)SY(b);f[a+20>>2]=f[d>>2];b=f[d+4>>2]|0;f[a+24>>2]=b;if(b|0)SY(b);f[a+28>>2]=f[e>>2];b=f[e+4>>2]|0;f[a+32>>2]=b;if(b|0)SY(b);f[a+36>>2]=f[g>>2];b=f[g+4>>2]|0;f[a+40>>2]=b;if(b|0)SY(b);f[a+44>>2]=h;f[a+48>>2]=i;f[a+52>>2]=j;f[a+56>>2]=k;f[a+60>>2]=l;b=YY(4,47264)|0;if(!b)b=0;else{f[b>>2]=0;$p(b)}f[m>>2]=0;f[q>>2]=f[m>>2];aq(a+64|0,b,q);b=YY(4,47264)|0;if(!b)b=0;else{f[b>>2]=0;bq(b)}f[n>>2]=0;f[q>>2]=f[n>>2];cq(a+72|0,b,q);e=a+80|0;b=YY(36,47264)|0;if(!b)b=0;else{c=b;d=c+36|0;do{f[c>>2]=0;c=c+4|0}while((c|0)<(d|0));dq(b)}f[o>>2]=0;f[q>>2]=f[o>>2];eq(e,b,q);b=YY(32,47264)|0;if(!b)b=0;else{f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;f[b+12>>2]=0;f[b+16>>2]=0;f[b+20>>2]=0;f[b+24>>2]=0;f[b+28>>2]=0;fq(b)}f[p>>2]=0;f[q>>2]=f[p>>2];gq(a+88|0,b,q);b=YY(24,47264)|0;if(!b)b=0;else{f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;f[b+12>>2]=0;f[b+16>>2]=0;f[b+20>>2]=0;hq(b)}f[r>>2]=0;f[q>>2]=f[r>>2];iq(a+96|0,b,q);r=a+104|0;f[r>>2]=0;f[r+4>>2]=0;f[r+8>>2]=0;f[r+12>>2]=0;f[r+16>>2]=0;f[r+20>>2]=0;f[r+24>>2]=0;u=s;return}function _p(a){a=a|0;f[a>>2]=5868;return}function $p(a){a=a|0;nq(a);f[a>>2]=4984;return}function aq(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5840;f[c+12>>2]=b;f[a+4>>2]=c;return}function bq(a){a=a|0;nq(a);f[a>>2]=4696;return}function cq(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5812;f[c+12>>2]=b;f[a+4>>2]=c;return}function dq(a){a=a|0;nq(a);f[a>>2]=5052;fj(a+8|0);fj(a+20|0);f[a+28>>2]=0;f[a+32>>2]=0;return}function eq(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5784;f[c+12>>2]=b;f[a+4>>2]=c;return}function fq(a){a=a|0;var b=0;nq(a);f[a>>2]=5988;f[a+4>>2]=0;f[a+8>>2]=0;uq(a+12|0);b=a+20|0;f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;a=0;while(1){if((a|0)==3)break;f[b+(a<<2)>>2]=0;a=a+1|0}return}function gq(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5756;f[c+12>>2]=b;f[a+4>>2]=c;return}function hq(a){a=a|0;nq(a);f[a>>2]=4628;fj(a+4|0);oq(a+12|0);return}function iq(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=5660;f[c+12>>2]=b;f[a+4>>2]=c;return}function jq(a){a=a|0;NY(a);$Y(a);return}function kq(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function lq(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==17642?a+12|0:0)|0}function mq(a){a=a|0;$Y(a);return}function nq(a){a=a|0;f[a>>2]=5688;return}function oq(a){a=a|0;n[a>>2]=0.0;n[a+4>>2]=0.0;return}function pq(a){a=a|0;Jc()}function qq(a){a=a|0;NY(a);$Y(a);return}function rq(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function sq(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==17801?a+12|0:0)|0}function tq(a){a=a|0;$Y(a);return}function uq(a){a=a|0;b[a>>0]=0;f[a+4>>2]=0;return}function vq(a){a=a|0;NY(a);$Y(a);return}function wq(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function xq(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==17956?a+12|0:0)|0}function yq(a){a=a|0;$Y(a);return}function zq(a){a=a|0;NY(a);$Y(a);return}function Aq(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Bq(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==18111?a+12|0:0)|0}function Cq(a){a=a|0;$Y(a);return}function Dq(a){a=a|0;NY(a);$Y(a);return}function Eq(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Fq(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==18278?a+12|0:0)|0}function Gq(a){a=a|0;$Y(a);return}function Hq(a){a=a|0;Jc()}function Iq(a){a=a|0;do if(f[a+4>>2]|0){if(!(f[a+12>>2]|0)){_g(18431,18469);a=0;break}if(!(f[a+20>>2]|0)){_g(18431,18488);a=0;break}if(!(f[a+28>>2]|0)){_g(18431,18515);a=0;break}if(!(f[a+36>>2]|0)){_g(18431,18541);a=0;break}if(!(f[a+64>>2]|0)){_g(18431,18570);a=0;break}if(!(f[a+72>>2]|0)){_g(18431,18596);a=0;break}if(!(f[a+80>>2]|0)){_g(18431,18631);a=0;break}if(!(f[a+88>>2]|0)){_g(18431,18658);a=0;break}if(!(f[a+96>>2]|0)){_g(18431,18686);a=0}else a=1}else{_g(18431,18451);a=0}while(0);return a|0}function Jq(a){a=a|0;f[a>>2]=5988;Jg(a+20|0);rr(a+4|0);$k(a);return}function Kq(a){a=a|0;Jq(a);$Y(a);return}function Lq(a,b){a=a|0;b=b|0;var c=0;pl(18716,18895);c=Td[f[(f[b>>2]|0)+56>>2]&255](b)|0;uh((f[c>>2]|0)+72|0);cr(a+12|0);sr(a,b);b=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;b=f[b>>2]|0;hi(a+20|0,(Td[f[(f[b>>2]|0)+12>>2]&255](b)|0)+28|0)|0;return}function Mq(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c;pl(18716,18735);dr(a);e=Td[f[(f[b>>2]|0)+56>>2]&255](b)|0;uh((f[e>>2]|0)+96|0);er(a,b);b=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;f[d>>2]=f[b>>2];f[b>>2]=0;b=b+4|0;f[d+4>>2]=f[b>>2];f[b>>2]=0;qp(d);u=c;return}function Nq(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0.0;x=u;u=u+48|0;q=x+44|0;r=x+32|0;s=x+24|0;t=x+8|0;v=x;m=Td[f[(f[c>>2]|0)+36>>2]&255](c)|0;o=Td[f[(f[c>>2]|0)+100>>2]&255](c)|0;o=f[o>>2]|0;p=Td[f[(f[c>>2]|0)+32>>2]&255](c)|0;he[f[(f[c>>2]|0)+64>>2]&63](r,c,g);f[s>>2]=f[r>>2];i=f[r+4>>2]|0;f[s+4>>2]=i;if(i|0)SY(i);iZ(t,Td[f[(f[o>>2]|0)+12>>2]&255](o)|0);i=f[s>>2]|0;a:do if((i|0)!=0?(h=b[i+11>>0]|0,k=h<<24>>24<0,h=h&255,l=k?f[i+4>>2]|0:h,y=b[t+11>>0]|0,j=y<<24>>24<0,(l|0)==((j?f[t+4>>2]|0:y&255)|0)):0){j=j?f[t>>2]|0:t;b:do if(k){if(yp(f[i>>2]|0,j,l)|0){w=11;break a}}else while(1){if(!h)break b;if((b[i>>0]|0)!=(b[j>>0]|0)){w=11;break a}j=j+1|0;i=i+1|0;h=h+-1|0}while(0);y=(Td[f[(f[m>>2]|0)+16>>2]&255](m)|0)+8|0;z=+n[y>>2];y=Td[f[(f[o>>2]|0)+32>>2]&255](o)|0;he[f[(f[m>>2]|0)+24>>2]&63](v,m,g);e=f[(f[p>>2]|0)+12>>2]|0;g=Td[f[(f[o>>2]|0)+12>>2]&255](o)|0;y=Zd[e&3](p,v,g,z,y,a+12|0)|0;ee[f[(f[o>>2]|0)+36>>2]&255](o,y);br(a,c);ol(q,0)}else w=11;while(0);if((w|0)==11){w=f[(f[e>>2]|0)+8>>2]|0;y=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;ee[w&255](e,y);ol(q,0)}jZ(t);ah(s);Jm(r);u=x;return d[q>>1]|0}function Oq(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Pq(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Qq(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;c=u;u=u+16|0;e=c;ol(e,1);u=c;return d[e>>1]|0}function Rq(a,b,c){a=a|0;b=b|0;c=c|0;b=u;u=u+16|0;c=b;ol(c,1);u=b;return d[c>>1]|0}function Sq(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0;g=u;u=u+16|0;c=g+8|0;h=g;j=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;i=f[j>>2]|0;ee[f[(f[i>>2]|0)+16>>2]&255](i,e);e=Td[f[(f[b>>2]|0)+28>>2]&255](b)|0;i=f[(f[e>>2]|0)+48>>2]|0;j=f[j>>2]|0;ee[f[(f[j>>2]|0)+60>>2]&255](h,j);ee[i&255](e,h);ah(h);br(a,b);cr(a+12|0);ol(c,0);u=g;return d[c>>1]|0}function Tq(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0;k=u;u=u+16|0;h=k+8|0;i=k;g=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;ol(h,0);switch(e|0){case 0:{a=f[(f[c>>2]|0)+8>>2]|0;i=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[a&255](c,i);break}case 1:{j=f[g>>2]|0;be[f[(f[j>>2]|0)+20>>2]&511](j);j=8;break}case 2:{j=f[g>>2]|0;be[f[(f[j>>2]|0)+24>>2]&511](j);j=8;break}case 3:{j=f[g>>2]|0;be[f[(f[j>>2]|0)+28>>2]&511](j);j=8;break}case 6:case 5:case 4:case 7:{ar(a,b,e);br(a,b);break}default:{ol(i,1);d[h>>1]=d[i>>1]|0}}if((j|0)==8){j=Td[f[(f[b>>2]|0)+28>>2]&255](b)|0;e=f[(f[j>>2]|0)+48>>2]|0;c=f[g>>2]|0;ee[f[(f[c>>2]|0)+60>>2]&255](i,c);ee[e&255](j,i);ah(i);br(a,b);cr(a+12|0)}u=k;return d[h>>1]|0}function Uq(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0;a=u;u=u+16|0;c=a+8|0;g=a;h=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;i=f[h>>2]|0;i=Td[f[(f[i>>2]|0)+12>>2]&255](i)|0;j=f[h>>2]|0;_q(j,Td[f[(f[b>>2]|0)+52>>2]&255](b)|0,i+16|0,e);i=f[h>>2]|0;ee[f[(f[i>>2]|0)+48>>2]&255](i,e);e=Td[f[(f[b>>2]|0)+28>>2]&255](b)|0;b=f[(f[e>>2]|0)+48>>2]|0;h=f[h>>2]|0;ee[f[(f[h>>2]|0)+60>>2]&255](g,h);ee[b&255](e,g);ah(g);ol(c,0);u=a;return d[c>>1]|0}function Vq(a,b,c,e){a=a|0;b=b|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0.0,l=0;a=u;u=u+16|0;c=a+12|0;i=a+8|0;g=a;h=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;j=f[h>>2]|0;j=Td[f[(f[j>>2]|0)+12>>2]&255](j)|0;l=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;k=+On(l,+((Nn(e)|0)>>>0));n[i>>2]=k;e=f[h>>2]|0;Zq(e,Td[f[(f[b>>2]|0)+52>>2]&255](b)|0,j+20|0,i);e=f[h>>2]|0;ce[f[(f[e>>2]|0)+52>>2]&7](e,+n[i>>2]);e=Td[f[(f[b>>2]|0)+28>>2]&255](b)|0;b=f[(f[e>>2]|0)+48>>2]|0;h=f[h>>2]|0;ee[f[(f[h>>2]|0)+60>>2]&255](g,h);ee[b&255](e,g);ah(g);ol(c,0);u=a;return d[c>>1]|0}function Wq(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0;a=u;u=u+16|0;e=a+8|0;j=a+10|0;h=a;b[j>>0]=g&1;i=Td[f[(f[c>>2]|0)+100>>2]&255](c)|0;g=f[i>>2]|0;g=Td[f[(f[g>>2]|0)+12>>2]&255](g)|0;k=f[i>>2]|0;Yq(k,Td[f[(f[c>>2]|0)+52>>2]&255](c)|0,g+24|0,j);g=f[i>>2]|0;ee[f[(f[g>>2]|0)+56>>2]&255](g,(b[j>>0]|0)!=0);g=Td[f[(f[c>>2]|0)+28>>2]&255](c)|0;c=f[(f[g>>2]|0)+48>>2]|0;i=f[i>>2]|0;ee[f[(f[i>>2]|0)+60>>2]&255](h,i);ee[c&255](g,h);ah(h);ol(e,0);u=a;return d[e>>1]|0}function Xq(a,b,c){a=a|0;b=b|0;c=c|0;b=u;u=u+16|0;c=b;ol(c,1);u=b;return d[c>>1]|0}function Yq(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0;i=u;u=u+32|0;g=i+8|0;h=i;if(!(Td[f[(f[a>>2]|0)+8>>2]&255](a)|0)?(b[d>>0]|0)!=(b[e>>0]|0):0){an(g);xn(g,Td[f[(f[a>>2]|0)+12>>2]&255](a)|0,d,e);e=f[(f[c>>2]|0)+8>>2]|0;cn(h,g);ee[e&255](c,h);fh(h);dn(g)}u=i;return}function Zq(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0;h=u;u=u+32|0;e=h+8|0;g=h;if(!(Td[f[(f[a>>2]|0)+8>>2]&255](a)|0)?!(+n[c>>2]==+n[d>>2]):0){an(e);Pn(e,Td[f[(f[a>>2]|0)+12>>2]&255](a)|0,c,d);d=f[(f[b>>2]|0)+8>>2]|0;cn(g,e);ee[d&255](b,g);fh(g);dn(e)}u=h;return}function _q(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0;h=u;u=u+32|0;e=h+8|0;g=h;if(!(Td[f[(f[a>>2]|0)+8>>2]&255](a)|0)?!($q(c,d)|0):0){an(e);eo(e,Td[f[(f[a>>2]|0)+12>>2]&255](a)|0,c,d);d=f[(f[b>>2]|0)+8>>2]|0;cn(g,e);ee[d&255](b,g);fh(g);dn(e)}u=h;return}function $q(a,c){a=a|0;c=c|0;if((b[a>>0]|0)==(b[c>>0]|0)?(b[a+1>>0]|0)==(b[c+1>>0]|0):0)a=(b[a+2>>0]|0)==(b[c+2>>0]|0);else a=0;return a|0}function ar(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0.0,h=0,i=0;h=Td[f[(f[b>>2]|0)+32>>2]&255](b)|0;d=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;d=f[d>>2]|0;e=Td[f[(f[d>>2]|0)+32>>2]&255](d)|0;i=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;i=(Td[f[(f[i>>2]|0)+16>>2]&255](i)|0)+8|0;g=+n[i>>2];i=f[(f[h>>2]|0)+8>>2]|0;b=Td[f[(f[d>>2]|0)+12>>2]&255](d)|0;c=Zd[i&3](h,c,b,g,e,a+12|0)|0;ee[f[(f[d>>2]|0)+36>>2]&255](d,c);return}function br(a,b){a=a|0;b=b|0;a=f[a+4>>2]|0;if(a|0)be[f[(f[a>>2]|0)+12>>2]&511](a);b=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;b=f[b>>2]|0;ee[f[(f[b>>2]|0)+44>>2]&255](b,1);return}function cr(a){a=a|0;b[a>>0]=0;return}function dr(a){a=a|0;var b=0,c=0,d=0,e=0;e=u;u=u+16|0;b=e;c=a+4|0;d=f[c>>2]|0;if(d|0){be[f[(f[d>>2]|0)+16>>2]&511](d);f[b>>2]=f[c>>2];f[c>>2]=0;d=a+8|0;f[b+4>>2]=f[d>>2];f[d>>2]=0;rr(b)}u=e;return}function er(a,b){a=a|0;b=b|0;var c=0;c=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;c=f[c>>2]|0;if(Td[f[(f[c>>2]|0)+8>>2]&255](c)|0)fr(0,b);else gr(a,b);return}function fr(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;i=u;u=u+32|0;d=i+8|0;e=i+16|0;g=i;h=Td[f[(f[c>>2]|0)+100>>2]&255](c)|0;a=f[h>>2]|0;a=Td[f[(f[a>>2]|0)+12>>2]&255](a)|0;j=b[a+36+3>>0]|0;if(!((j<<24>>24<0?f[a+32>>2]|0:j&255)|0)){j=Td[f[(f[c>>2]|0)+28>>2]&255](c)|0;he[f[(f[j>>2]|0)+36>>2]&63](d,j,a);ah(d)}else{an(e);j=f[h>>2]|0;ee[f[(f[j>>2]|0)+60>>2]&255](g,j);qr(e,g);ah(g);j=Td[f[(f[c>>2]|0)+52>>2]&255](c)|0;c=f[(f[j>>2]|0)+8>>2]|0;cn(g,e);ee[c&255](j,g);fh(g);dn(e)}u=i;return}function gr(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;n=u;u=u+48|0;l=n+40|0;m=n+24|0;d=n+8|0;h=n+16|0;e=n;k=Td[f[(f[c>>2]|0)+100>>2]&255](c)|0;k=f[k>>2]|0;k=Td[f[(f[k>>2]|0)+12>>2]&255](k)|0;j=k+28|0;an(m);g=b[k+36+3>>0]|0;i=g<<24>>24<0;g=i?f[k+32>>2]|0:g&255;a:do if(!g){j=Td[f[(f[c>>2]|0)+28>>2]&255](c)|0;he[f[(f[j>>2]|0)+36>>2]&63](d,j,k);ah(d);d=YY(52,47264)|0;if(!d)d=0;else Gg(d,k);f[e>>2]=0;f[l>>2]=f[e>>2];gi(h,d,l);d=f[h>>2]|0;if(d|0){hi(d+28|0,a+20|0)|0;hr(m,h)}ii(h)}else{h=a+20|0;e=b[a+28+3>>0]|0;d=e<<24>>24<0;b:do if((g|0)==((d?f[a+24>>2]|0:e&255)|0)){e=d?f[h>>2]|0:h;d=i?f[j>>2]|0:j;while(1){if(!g)break a;if(ir(f[d>>2]|0,f[e>>2]|0)|0)break b;if(ir(f[e>>2]|0,f[d>>2]|0)|0)break b;g=g+-1|0;e=e+4|0;d=d+4|0}}while(0);jr(m,k,h,j)}while(0);cn(l,m);if(f[l>>2]|0){c=Td[f[(f[c>>2]|0)+52>>2]&255](c)|0;ee[f[(f[c>>2]|0)+8>>2]&255](c,l)}fh(l);dn(m);u=n;return}function hr(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0;i=u;u=u+32|0;g=i+24|0;h=i+16|0;c=i;d=i+8|0;e=YY(12,47264)|0;if(!e){f[d>>2]=0;f[g>>2]=f[d>>2];mn(h,0,g)}else{f[c>>2]=f[b>>2];b=f[b+4>>2]|0;f[c+4>>2]=b;if(b|0)SY(b);ln(e,c);f[d>>2]=0;f[g>>2]=f[d>>2];mn(h,e,g);ah(c)}b=f[h>>2]|0;if(b|0){f[g>>2]=b;d=g+4|0;b=f[h+4>>2]|0;f[d>>2]=b;if(b|0)SY(b);b=a+4|0;c=f[b>>2]|0;if(c>>>0<(f[a+8>>2]|0)>>>0){f[c>>2]=f[g>>2];f[c+4>>2]=f[d>>2];f[g>>2]=0;f[d>>2]=0;f[b>>2]=c+8}else nn(a,g);fh(g)}on(h);u=i;return}function ir(a,b){a=a|0;b=b|0;return a>>>0<b>>>0|0}function jr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;j=u;u=u+32|0;h=j+16|0;i=j+8|0;g=j;e=YY(40,47264)|0;if(!e)e=0;else li(e,b,c,d);f[g>>2]=0;f[h>>2]=f[g>>2];kr(i,e,h);e=f[i>>2]|0;if(e|0){f[h>>2]=e;c=h+4|0;e=f[i+4>>2]|0;f[c>>2]=e;if(e|0)SY(e);e=a+4|0;b=f[e>>2]|0;if(b>>>0<(f[a+8>>2]|0)>>>0){f[b>>2]=f[h>>2];f[b+4>>2]=f[c>>2];f[h>>2]=0;f[c>>2]=0;f[e>>2]=b+8}else nn(a,h);fh(h)}lr(i);u=j;return}function kr(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=6056;f[c+12>>2]=b;f[a+4>>2]=c;return}function lr(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function mr(a){a=a|0;NY(a);$Y(a);return}function nr(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function or(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==18740?a+12|0:0)|0}function pr(a){a=a|0;$Y(a);return}function qr(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;h=u;u=u+32|0;e=h+16|0;g=h+8|0;d=h;c=YY(12,47264)|0;if(!c)c=0;else El(c,b);f[d>>2]=0;f[e>>2]=f[d>>2];Fl(g,c,e);c=f[g>>2]|0;if(c|0){f[e>>2]=c;d=e+4|0;c=f[g+4>>2]|0;f[d>>2]=c;if(c|0)SY(c);c=a+4|0;b=f[c>>2]|0;if(b>>>0<(f[a+8>>2]|0)>>>0){f[b>>2]=f[e>>2];f[b+4>>2]=f[d>>2];f[e>>2]=0;f[d>>2]=0;f[c>>2]=b+8}else nn(a,e);fh(e)}Gl(g);u=h;return}function rr(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function sr(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+96|0;i=p+80|0;m=p+72|0;n=p+64|0;o=p+48|0;j=p+40|0;k=p;l=p+24|0;c=Td[f[(f[b>>2]|0)+56>>2]&255](b)|0;f[m>>2]=f[c>>2];d=m+4|0;c=f[c+4>>2]|0;f[d>>2]=c;if(c|0)TY(c);g=Td[f[(f[b>>2]|0)+100>>2]&255](b)|0;e=f[g>>2]|0;f[n>>2]=e;g=f[g+4>>2]|0;f[n+4>>2]=g;h=(g|0)==0;if(!h)TY(g);f[o>>2]=f[m>>2];c=f[d>>2]|0;f[o+4>>2]=c;if(c|0)TY(c);f[o+8>>2]=e;f[o+12>>2]=g;if(!h)TY(g);c=Td[f[(f[b>>2]|0)+48>>2]&255](b)|0;b=f[(f[c>>2]|0)+8>>2]|0;tr(l,o);ur(k,l);ie[b&31](j,c,600,k);c=a+4|0;b=f[j>>2]|0;g=j+4|0;h=f[g>>2]|0;f[j>>2]=0;f[g>>2]=0;f[i>>2]=f[c>>2];f[c>>2]=b;b=a+8|0;f[i+4>>2]=f[b>>2];f[b>>2]=h;rr(i);rr(j);Dh(k);vr(l);c=f[c>>2]|0;if(c|0)be[f[(f[c>>2]|0)+8>>2]&511](c);vr(o);wr(n);xr(m);u=p;return}function tr(a,b){a=a|0;b=b|0;var c=0;f[a>>2]=f[b>>2];c=f[b+4>>2]|0;f[a+4>>2]=c;if(c|0)TY(c);f[a+8>>2]=f[b+8>>2];b=f[b+12>>2]|0;f[a+12>>2]=b;if(b|0)TY(b);return}function ur(a,b){a=a|0;b=b|0;var c=0;a=a+16|0;f[a>>2]=0;c=XY(20)|0;f[c>>2]=6084;yr(c+4|0,b);f[a>>2]=c;return}function vr(a){a=a|0;wr(a+8|0);xr(a);return}function wr(a){a=a|0;a=f[a+4>>2]|0;if(a|0)VY(a);return}function xr(a){a=a|0;a=f[a+4>>2]|0;if(a|0)VY(a);return}function yr(a,b){a=a|0;b=b|0;var c=0;f[a>>2]=f[b>>2];c=b+4|0;f[a+4>>2]=f[c>>2];f[b>>2]=0;f[c>>2]=0;c=b+8|0;f[a+8>>2]=f[c>>2];b=b+12|0;f[a+12>>2]=f[b>>2];f[c>>2]=0;f[b>>2]=0;return}function zr(a){a=a|0;f[a>>2]=6084;Mr(a+4|0);return}function Ar(a){a=a|0;zr(a);$Y(a);return}function Br(a){a=a|0;var b=0;b=XY(20)|0;f[b>>2]=6084;tr(b+4|0,a+4|0);return b|0}function Cr(a,b){a=a|0;b=b|0;f[b>>2]=6084;tr(b+4|0,a+4|0);return}function Dr(a){a=a|0;Mr(a+4|0);return}function Er(a){a=a|0;Mr(a+4|0);$Y(a);return}function Fr(a){a=a|0;Ir(a+4|0);return}function Gr(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==18901?a+4|0:0)|0}function Hr(a){a=a|0;return 1224}function Ir(a){a=a|0;Jr(a);return}function Jr(a){a=a|0;var b=0,c=0,d=0,e=0,g=0;e=u;u=u+16|0;c=e+8|0;d=e;Kr(c,a+8|0);b=f[c>>2]|0;if(b|0){b=Td[f[(f[b>>2]|0)+40>>2]&255](b)|0;g=f[c>>2]|0;ee[f[(f[g>>2]|0)+44>>2]&255](g,b^1);Lr(d,a);a=f[d>>2]|0;if(a|0)uh(a+24|0);Tp(d)}qp(c);u=e;return}function Kr(a,b){a=a|0;b=b|0;var c=0,d=0;f[a>>2]=0;c=a+4|0;f[c>>2]=0;d=f[b+4>>2]|0;if(d){d=WY(d)|0;f[c>>2]=d;if(d|0)f[a>>2]=f[b>>2]}else f[c>>2]=0;return}function Lr(a,b){a=a|0;b=b|0;var c=0,d=0;f[a>>2]=0;c=a+4|0;f[c>>2]=0;d=f[b+4>>2]|0;if(d){d=WY(d)|0;f[c>>2]=d;if(d|0)f[a>>2]=f[b>>2]}else f[c>>2]=0;return}function Mr(a){a=a|0;vr(a);return}function Nr(a){a=a|0;var b=0;f[a>>2]=6128;b=a+4|0;f[b>>2]=6288;Ps(a);Po(a+304|0);Sp(a+296|0);ph(a+248|0);Qs(a+40|0);Tp(a+32|0);Vp(a+24|0);Xp(a+16|0);Wp(a+8|0);Rs(b);Ss(a);return}function Or(a){a=a|0;Nr(a);$Y(a);return}function Pr(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0;g=f[a+8>>2]|0;h=f[(f[g>>2]|0)+16>>2]|0;e=f[a+16>>2]|0;b=a+304|0;d=cp(b)|0;c=fp(b)|0;b=mp(b)|0;return $d[h&3](g,a+40|0,e,d,c,b)|0}function Qr(a){a=a|0;return (f[a+32>>2]|0)+24|0}function Rr(a,b){a=a|0;b=b|0;var c=0,e=0,g=0;e=u;u=u+16|0;c=e;if(Ns(b)|0){qv(a+40|0,b);g=f[a+8>>2]|0;b=Vd[f[(f[g>>2]|0)+28>>2]&127](g,b)|0;Bs(a);d[c>>1]=b;a=b}else{ol(c,21);a=d[c>>1]|0}u=e;return a|0}function Sr(a,b,c){a=a|0;b=b|0;c=+c;var e=0,f=0;f=u;u=u+16|0;e=f;if(!(c<=0.0)){rv(a+40|0,b,c);Bs(a);ol(e,0)}else ol(e,21);u=f;return d[e>>1]|0}function Tr(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;dv(a+40|0);Bs(a);ol(b,0);u=c;return d[b>>1]|0}function Ur(a){a=a|0;var b=0.0,c=0;c=a+40|0;a=Ls(c)|0;b=+Ms(c);return +(b/+n[a+8>>2])}function Vr(a,b,c){a=a|0;b=b|0;c=+c;var e=0,f=0,g=0,h=0;f=u;u=u+16|0;e=f;if(!(c<=0.0)){h=a+40|0;g=(Ls(h)|0)+8|0;sv(h,b,+n[g>>2]*c);Bs(a);ol(e,0)}else ol(e,21);u=f;return d[e>>1]|0}function Wr(a,b){a=a|0;b=b|0;nv(a,b+40|0);return}function Xr(a){a=a|0;return (f[a+32>>2]|0)+48|0}function Yr(a,c){a=a|0;c=+c;var e=0,g=0,h=0;g=u;u=u+16|0;e=g;h=a+32|0;b[(f[h>>2]|0)+168>>0]=0;ov(a+40|0,c);b[(f[h>>2]|0)+168>>0]=1;Bs(a);ol(e,0);u=g;return d[e>>1]|0}function Zr(a,c){a=a|0;c=+c;var e=0,g=0,h=0;g=u;u=u+16|0;e=g;h=a+32|0;b[(f[h>>2]|0)+168>>0]=0;pv(a+40|0,c);b[(f[h>>2]|0)+168>>0]=1;Bs(a);ol(e,0);u=g;return d[e>>1]|0}function _r(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;f[e>>2]=16;f[e+4>>2]=1;f[d>>2]=f[e>>2];f[d+4>>2]=f[e+4>>2];b=Ks(a,d,b)|0;Bs(a);u=c;return b|0}function $r(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;f[e>>2]=20;f[e+4>>2]=1;f[d>>2]=f[e>>2];f[d+4>>2]=f[e+4>>2];b=Ks(a,d,b)|0;Bs(a);u=c;return b|0}function as(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;f[e>>2]=24;f[e+4>>2]=1;f[d>>2]=f[e>>2];f[d+4>>2]=f[e+4>>2];b=Ks(a,d,b)|0;Bs(a);u=c;return b|0}function bs(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+16|0;d=c+8|0;e=c;f[e>>2]=28;f[e+4>>2]=1;f[d>>2]=f[e>>2];f[d+4>>2]=f[e+4>>2];b=Ks(a,d,b)|0;Bs(a);u=c;return b|0}function cs(a){a=a|0;var b=0,c=0,d=0;c=u;u=u+16|0;b=c+8|0;d=c;f[d>>2]=32;f[d+4>>2]=1;f[b>>2]=f[d>>2];f[b+4>>2]=f[d+4>>2];b=As(a,b)|0;Bs(a);u=c;return b|0}function ds(a,b){a=a|0;b=b|0;var c=0,e=0,g=0,h=0,i=0;i=u;u=u+32|0;c=i+16|0;e=i+24|0;g=i+8|0;h=i;f[g>>2]=b;if(b>>>0<32){ol(e,21);c=d[e>>1]|0}else{f[h>>2]=36;f[h+4>>2]=1;f[c>>2]=f[h>>2];f[c+4>>2]=f[h+4>>2];c=Js(a,c,g)|0;Bs(a);d[e>>1]=c}u=i;return c|0}function es(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;f[d>>2]=b;f[g>>2]=40;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=Is(a,e,d)|0;Bs(a);u=c;return b|0}function fs(a){a=a|0;return (f[a+32>>2]|0)+72|0}function gs(a){a=a|0;return (f[a+32>>2]|0)+96|0}function hs(a){a=a|0;return a+240|0}function is(a,c){a=a|0;c=c|0;var e=0,g=0,h=0,i=0,j=0;g=u;u=u+32|0;h=g+8|0;e=g+16|0;i=g;j=a+244|0;b[j>>0]=b[c>>0]|0;b[j+1>>0]=b[c+1>>0]|0;b[j+2>>0]=b[c+2>>0]|0;f[i>>2]=44;f[i+4>>2]=1;f[h>>2]=f[i>>2];f[h+4>>2]=f[i+4>>2];c=Hs(a,h,c)|0;d[e>>1]=c;if(!((Cs(e)|0)<<16>>16))Bs(a);u=g;return d[e>>1]|0}function js(a,b){a=a|0;b=b|0;var c=0,e=0,g=0,h=0;e=u;u=u+32|0;g=e+8|0;c=e+16|0;h=e;f[a+240>>2]=f[b>>2];f[h>>2]=48;f[h+4>>2]=1;f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];b=Gs(a,g,b)|0;d[c>>1]=b;if(!((Cs(c)|0)<<16>>16))Bs(a);u=e;return d[c>>1]|0}function ks(a,c){a=a|0;c=c|0;var e=0,g=0,h=0,i=0,j=0;g=u;u=u+32|0;i=g+8|0;e=g+16|0;h=g+18|0;j=g;c=c&1;b[h>>0]=c;b[a+247>>0]=c;f[j>>2]=52;f[j+4>>2]=1;f[i>>2]=f[j>>2];f[i+4>>2]=f[j+4>>2];c=Fs(a,i,h)|0;d[e>>1]=c;if(!((Cs(e)|0)<<16>>16))Bs(a);u=g;return d[e>>1]|0}function ls(a){a=a|0;return f[a+32>>2]|0}function ms(a){a=a|0;return kp(a+304|0)|0}function ns(a,b){a=a|0;b=b|0;return lp(a+304|0,b)|0}function os(a){a=a|0;var b=0,c=0,e=0;e=u;u=u+16|0;b=e;c=a+248|0;if(Ih(c)|0){Es(a);Kh(c,f[a+16>>2]|0);Bs(a);ol(b,0)}else ol(b,1);u=e;return d[b>>1]|0}function ps(a){a=a|0;var b=0,c=0,e=0;e=u;u=u+16|0;b=e;c=a+248|0;if(Jh(c)|0){Es(a);Lh(c,f[a+16>>2]|0);Bs(a);ol(b,0)}else ol(b,1);u=e;return d[b>>1]|0}function qs(a,c){a=a|0;c=c|0;var d=0;c=c+248|0;d=(Ih(c)|0)&1;b[a>>0]=d;c=(Jh(c)|0)&1;b[a+1>>0]=c;return}function rs(a){a=a|0;return Ds(a+248|0)|0}function ss(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;g=f[a+8>>2]|0;h=f[(f[g>>2]|0)+20>>2]|0;e=f[a+16>>2]|0;c=a+304|0;d=fp(c)|0;c=mp(c)|0;return $d[h&3](g,a+40|0,e,b,d,c)|0}function ts(a){a=a|0;return (f[a+32>>2]|0)+120|0}function us(a){a=a|0;return (f[a+32>>2]|0)+144|0}function vs(a){a=a|0;var b=0,c=0,d=0;c=u;u=u+16|0;b=c+8|0;d=c;f[d>>2]=56;f[d+4>>2]=1;f[b>>2]=f[d>>2];f[b+4>>2]=f[d+4>>2];b=As(a,b)|0;Bs(a);u=c;return b|0}function ws(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0;i=u;u=u+16|0;g=i;c=f[b>>2]|0;if(!c)_g(19160,19175);else{h=a+296|0;d=f[h>>2]|0;if(!d)d=c;else{ee[f[(f[d>>2]|0)+12>>2]&255](d,a+304|0);d=f[b>>2]|0}f[g>>2]=d;e=g+4|0;c=f[b+4>>2]|0;f[e>>2]=c;if(c|0)SY(c);f[g>>2]=f[h>>2];f[h>>2]=d;b=a+300|0;f[e>>2]=f[b>>2];f[b>>2]=c;Sp(g);h=f[h>>2]|0;ee[f[(f[h>>2]|0)+8>>2]&255](h,a+304|0)}u=i;return}function xs(a){a=a|0;Nr(a+-4|0);return}function ys(a){a=a|0;Or(a+-4|0);return}function zs(a,b){a=a|0;b=b|0;ws(a+-4|0,b);return}function As(a,b){a=a|0;b=b|0;var c=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+16|0;n=p;o=p+2|0;m=f[b>>2]|0;l=f[b+4>>2]|0;j=a+296|0;k=l>>1;c=(f[j>>2]|0)+k|0;l=(l&1|0)!=0;if(l){h=m;b=f[(f[c>>2]|0)+m>>2]|0}else{b=m;h=b}i=a+304|0;g=a+4|0;e=10;b=Xd[b&63](c,i,g)|0;while(1){d[o>>1]=b;if((Cs(o)|0)<<16>>16!=1e3){a=11;break}if(!e){a=7;break}b=(f[j>>2]|0)+k|0;if(l)a=f[(f[b>>2]|0)+m>>2]|0;else a=h;e=e+-1|0;b=Xd[a&63](b,i,g)|0}if((a|0)==7){ol(n,23);b=d[n>>1]|0}else if((a|0)==11){b=d[o>>1]|0;d[n>>1]=b}u=p;return b|0}function Bs(a){a=a|0;uh((f[a+32>>2]|0)+24|0);return}function Cs(a){a=a|0;return d[a>>1]|0}function Ds(a){a=a|0;return a+24|0}function Es(a){a=a|0;var b=0,c=0,d=0;b=a+304|0;c=Ro(b)|0;if((f[a+296>>2]|0)!=(f[c>>2]|0)){d=f[(f[a>>2]|0)+148>>2]|0;c=Ro(b)|0;ee[d&255](a,c)}return}function Fs(a,c,e){a=a|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=u;u=u+16|0;p=r;q=r+2|0;o=f[c>>2]|0;k=f[c+4>>2]|0;m=a+296|0;n=k>>1;g=(f[m>>2]|0)+n|0;k=(k&1|0)!=0;if(k){j=o;c=f[(f[g>>2]|0)+o>>2]|0}else{c=o;j=c}l=a+304|0;i=a+4|0;h=10;c=_d[c&63](g,l,i,(b[e>>0]|0)!=0)|0;while(1){d[q>>1]=c;if((Cs(q)|0)<<16>>16!=1e3){a=11;break}if(!h){a=7;break}c=(f[m>>2]|0)+n|0;if(k)a=f[(f[c>>2]|0)+o>>2]|0;else a=j;h=h+-1|0;c=_d[a&63](c,l,i,(b[e>>0]|0)!=0)|0}if((a|0)==7){ol(p,23);c=d[p>>1]|0}else if((a|0)==11){c=d[q>>1]|0;d[p>>1]=c}u=r;return c|0}function Gs(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=u;u=u+16|0;n=s+8|0;q=s+14|0;r=s+12|0;g=s+4|0;p=s;o=f[b>>2]|0;j=f[b+4>>2]|0;l=a+296|0;m=j>>1;b=(f[l>>2]|0)+m|0;j=(j&1|0)!=0;if(j){i=o;e=f[(f[b>>2]|0)+o>>2]|0}else{e=o;i=e}k=a+304|0;h=a+4|0;f[g>>2]=f[c>>2];f[n>>2]=f[g>>2];g=10;b=_d[e&63](b,k,h,n)|0;while(1){d[r>>1]=b;if((Cs(r)|0)<<16>>16!=1e3){a=11;break}if(!g){a=7;break}b=(f[l>>2]|0)+m|0;if(j)a=f[(f[b>>2]|0)+o>>2]|0;else a=i;f[p>>2]=f[c>>2];f[n>>2]=f[p>>2];g=g+-1|0;b=_d[a&63](b,k,h,n)|0}if((a|0)==7){ol(q,23);b=d[q>>1]|0}else if((a|0)==11){b=d[r>>1]|0;d[q>>1]=b}u=s;return b|0}function Hs(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+16|0;o=q;p=q+2|0;n=f[b>>2]|0;j=f[b+4>>2]|0;l=a+296|0;m=j>>1;e=(f[l>>2]|0)+m|0;j=(j&1|0)!=0;if(j){i=n;b=f[(f[e>>2]|0)+n>>2]|0}else{b=n;i=b}k=a+304|0;h=a+4|0;g=10;b=_d[b&63](e,k,h,c)|0;while(1){d[p>>1]=b;if((Cs(p)|0)<<16>>16!=1e3){a=11;break}if(!g){a=7;break}b=(f[l>>2]|0)+m|0;if(j)a=f[(f[b>>2]|0)+n>>2]|0;else a=i;g=g+-1|0;b=_d[a&63](b,k,h,c)|0}if((a|0)==7){ol(o,23);b=d[o>>1]|0}else if((a|0)==11){b=d[p>>1]|0;d[o>>1]=b}u=q;return b|0}function Is(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+16|0;o=q;p=q+2|0;n=f[b>>2]|0;j=f[b+4>>2]|0;l=a+296|0;m=j>>1;e=(f[l>>2]|0)+m|0;j=(j&1|0)!=0;if(j){i=n;b=f[(f[e>>2]|0)+n>>2]|0}else{b=n;i=b}k=a+304|0;h=a+4|0;g=10;b=_d[b&63](e,k,h,f[c>>2]|0)|0;while(1){d[p>>1]=b;if((Cs(p)|0)<<16>>16!=1e3){a=11;break}if(!g){a=7;break}b=(f[l>>2]|0)+m|0;if(j)a=f[(f[b>>2]|0)+n>>2]|0;else a=i;g=g+-1|0;b=_d[a&63](b,k,h,f[c>>2]|0)|0}if((a|0)==7){ol(o,23);b=d[o>>1]|0}else if((a|0)==11){b=d[p>>1]|0;d[o>>1]=b}u=q;return b|0}function Js(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+16|0;o=q;p=q+2|0;n=f[b>>2]|0;j=f[b+4>>2]|0;l=a+296|0;m=j>>1;e=(f[l>>2]|0)+m|0;j=(j&1|0)!=0;if(j){i=n;b=f[(f[e>>2]|0)+n>>2]|0}else{b=n;i=b}k=a+304|0;h=a+4|0;g=10;b=_d[b&63](e,k,h,f[c>>2]|0)|0;while(1){d[p>>1]=b;if((Cs(p)|0)<<16>>16!=1e3){a=11;break}if(!g){a=7;break}b=(f[l>>2]|0)+m|0;if(j)a=f[(f[b>>2]|0)+n>>2]|0;else a=i;g=g+-1|0;b=_d[a&63](b,k,h,f[c>>2]|0)|0}if((a|0)==7){ol(o,23);b=d[o>>1]|0}else if((a|0)==11){b=d[p>>1]|0;d[o>>1]=b}u=q;return b|0}function Ks(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+16|0;o=q;p=q+2|0;n=f[b>>2]|0;j=f[b+4>>2]|0;l=a+296|0;m=j>>1;e=(f[l>>2]|0)+m|0;j=(j&1|0)!=0;if(j){i=n;b=f[(f[e>>2]|0)+n>>2]|0}else{b=n;i=b}k=a+304|0;h=a+4|0;g=10;b=_d[b&63](e,k,h,c)|0;while(1){d[p>>1]=b;if((Cs(p)|0)<<16>>16!=1e3){a=11;break}if(!g){a=7;break}b=(f[l>>2]|0)+m|0;if(j)a=f[(f[b>>2]|0)+n>>2]|0;else a=i;g=g+-1|0;b=_d[a&63](b,k,h,c)|0}if((a|0)==7){ol(o,23);b=d[o>>1]|0}else if((a|0)==11){b=d[p>>1]|0;d[o>>1]=b}u=q;return b|0}function Ls(a){a=a|0;return a+32|0}function Ms(a){a=a|0;return +(+n[a+60>>2])}function Ns(a){a=a|0;var b=0;if(((f[a>>2]|0)!=0?(f[a+4>>2]|0)!=0:0)?(b=a+8|0,!(Os(+n[b>>2],0.0,9.99999993922529e-09)|0)):0)a=+n[b>>2]>0.0;else a=0;return a|0}function Os(a,b,c){a=+a;b=+b;c=+c;return +K(+(a-b))<c|0}function Ps(a){a=a|0;var b=0,c=0;b=a+16|0;c=f[b>>2]|0;if(c|0){Vs(Td[f[(f[c>>2]|0)+52>>2]&255](c)|0);c=f[b>>2]|0;Ws(Td[f[(f[c>>2]|0)+56>>2]&255](c)|0)}b=f[a+8>>2]|0;if(b|0)Xs(Td[f[(f[b>>2]|0)+36>>2]&255](b)|0);Vs(Ys(a+40|0)|0);return}function Qs(a){a=a|0;f[a>>2]=6716;Bh(a+8|0);Us(a);return}function Rs(a){a=a|0;return}function Ss(a){a=a|0;return}function Ts(a){a=a|0;Ta(a|0)|0;WZ()}function Us(a){a=a|0;return}function Vs(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;f[c+16>>2]=0;ht(a,c)|0;Dh(c);u=b;return}function Ws(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;f[c+16>>2]=0;ct(a,c)|0;dt(c);u=b;return}function Xs(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;f[c+16>>2]=0;Zs(a,c)|0;_s(c);u=b;return}function Ys(a){a=a|0;return a+8|0}function Zs(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+32|0;d=c;$s(d,b);at(d,a);_s(d);u=c;return a|0}function _s(a){a=a|0;var b=0;b=f[a+16>>2]|0;if((a|0)!=(b|0)){if(b|0)be[f[(f[b>>2]|0)+20>>2]&511](b)}else be[f[(f[b>>2]|0)+16>>2]&511](b);return}function $s(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=f[c>>2]|0;do if(d)if((b|0)==(d|0)){d=bt(a)|0;f[a+16>>2]=d;c=f[c>>2]|0;ee[f[(f[c>>2]|0)+12>>2]&255](c,d);break}else{d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;f[a+16>>2]=d;break}else f[a+16>>2]=0;while(0);return}function at(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;d=j;do if((b|0)!=(a|0)){h=a+16|0;e=f[h>>2]|0;g=e;i=b+16|0;if((e|0)==(a|0)){c=f[i>>2]|0;if((c|0)==(b|0)){b=bt(d)|0;d=f[h>>2]|0;ee[f[(f[d>>2]|0)+12>>2]&255](d,b);d=f[h>>2]|0;be[f[(f[d>>2]|0)+16>>2]&511](d);f[h>>2]=0;d=f[i>>2]|0;a=f[(f[d>>2]|0)+12>>2]|0;g=bt(e)|0;ee[a&255](d,g);g=f[i>>2]|0;be[f[(f[g>>2]|0)+16>>2]&511](g);f[i>>2]=0;g=bt(e)|0;f[h>>2]=g;g=f[(f[b>>2]|0)+12>>2]|0;h=bt(c)|0;ee[g&255](b,h);be[f[(f[b>>2]|0)+16>>2]&511](b);h=bt(c)|0;f[i>>2]=h;break}else{g=f[(f[e>>2]|0)+12>>2]|0;i=bt(b)|0;ee[g&255](e,i);i=f[h>>2]|0;be[f[(f[i>>2]|0)+16>>2]&511](i);i=b+16|0;f[h>>2]=f[i>>2];h=bt(b)|0;f[i>>2]=h;break}}else{c=f[i>>2]|0;if((b|0)==(c|0)){g=f[(f[c>>2]|0)+12>>2]|0;b=bt(a)|0;ee[g&255](c,b);b=f[i>>2]|0;be[f[(f[b>>2]|0)+16>>2]&511](b);f[i>>2]=f[h>>2];i=bt(a)|0;f[h>>2]=i;break}else{f[h>>2]=c;f[i>>2]=g;break}}}while(0);u=j;return}function bt(a){a=a|0;return a|0}function ct(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+32|0;d=c;et(d,b);ft(d,a);dt(d);u=c;return a|0}function dt(a){a=a|0;var b=0;b=f[a+16>>2]|0;if((a|0)!=(b|0)){if(b|0)be[f[(f[b>>2]|0)+20>>2]&511](b)}else be[f[(f[b>>2]|0)+16>>2]&511](b);return}function et(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=f[c>>2]|0;do if(d)if((b|0)==(d|0)){d=gt(a)|0;f[a+16>>2]=d;c=f[c>>2]|0;ee[f[(f[c>>2]|0)+12>>2]&255](c,d);break}else{d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;f[a+16>>2]=d;break}else f[a+16>>2]=0;while(0);return}function ft(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;d=j;do if((b|0)!=(a|0)){h=a+16|0;e=f[h>>2]|0;g=e;i=b+16|0;if((e|0)==(a|0)){c=f[i>>2]|0;if((c|0)==(b|0)){b=gt(d)|0;d=f[h>>2]|0;ee[f[(f[d>>2]|0)+12>>2]&255](d,b);d=f[h>>2]|0;be[f[(f[d>>2]|0)+16>>2]&511](d);f[h>>2]=0;d=f[i>>2]|0;a=f[(f[d>>2]|0)+12>>2]|0;g=gt(e)|0;ee[a&255](d,g);g=f[i>>2]|0;be[f[(f[g>>2]|0)+16>>2]&511](g);f[i>>2]=0;g=gt(e)|0;f[h>>2]=g;g=f[(f[b>>2]|0)+12>>2]|0;h=gt(c)|0;ee[g&255](b,h);be[f[(f[b>>2]|0)+16>>2]&511](b);h=gt(c)|0;f[i>>2]=h;break}else{g=f[(f[e>>2]|0)+12>>2]|0;i=gt(b)|0;ee[g&255](e,i);i=f[h>>2]|0;be[f[(f[i>>2]|0)+16>>2]&511](i);i=b+16|0;f[h>>2]=f[i>>2];h=gt(b)|0;f[i>>2]=h;break}}else{c=f[i>>2]|0;if((b|0)==(c|0)){g=f[(f[c>>2]|0)+12>>2]|0;b=gt(a)|0;ee[g&255](c,b);b=f[i>>2]|0;be[f[(f[b>>2]|0)+16>>2]&511](b);f[i>>2]=f[h>>2];i=gt(a)|0;f[h>>2]=i;break}else{f[h>>2]=c;f[i>>2]=g;break}}}while(0);u=j;return}function gt(a){a=a|0;return a|0}function ht(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+32|0;d=c;it(d,b);jt(d,a);Dh(d);u=c;return a|0}function it(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=f[c>>2]|0;do if(d)if((b|0)==(d|0)){d=kt(a)|0;f[a+16>>2]=d;c=f[c>>2]|0;ee[f[(f[c>>2]|0)+12>>2]&255](c,d);break}else{d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;f[a+16>>2]=d;break}else f[a+16>>2]=0;while(0);return}function jt(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;d=j;do if((b|0)!=(a|0)){h=a+16|0;e=f[h>>2]|0;g=e;i=b+16|0;if((e|0)==(a|0)){c=f[i>>2]|0;if((c|0)==(b|0)){b=kt(d)|0;d=f[h>>2]|0;ee[f[(f[d>>2]|0)+12>>2]&255](d,b);d=f[h>>2]|0;be[f[(f[d>>2]|0)+16>>2]&511](d);f[h>>2]=0;d=f[i>>2]|0;a=f[(f[d>>2]|0)+12>>2]|0;g=kt(e)|0;ee[a&255](d,g);g=f[i>>2]|0;be[f[(f[g>>2]|0)+16>>2]&511](g);f[i>>2]=0;g=kt(e)|0;f[h>>2]=g;g=f[(f[b>>2]|0)+12>>2]|0;h=kt(c)|0;ee[g&255](b,h);be[f[(f[b>>2]|0)+16>>2]&511](b);h=kt(c)|0;f[i>>2]=h;break}else{g=f[(f[e>>2]|0)+12>>2]|0;i=kt(b)|0;ee[g&255](e,i);i=f[h>>2]|0;be[f[(f[i>>2]|0)+16>>2]&511](i);i=b+16|0;f[h>>2]=f[i>>2];h=kt(b)|0;f[i>>2]=h;break}}else{c=f[i>>2]|0;if((b|0)==(c|0)){g=f[(f[c>>2]|0)+12>>2]|0;b=kt(a)|0;ee[g&255](c,b);b=f[i>>2]|0;be[f[(f[b>>2]|0)+16>>2]&511](b);f[i>>2]=f[h>>2];i=kt(a)|0;f[h>>2]=i;break}else{f[h>>2]=c;f[i>>2]=g;break}}}while(0);u=j;return}function kt(a){a=a|0;return a|0}function lt(a,b,c,d,e,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0;o=u;u=u+32|0;n=o+8|0;l=o;mt(a);k=a+4|0;nt(k);f[a>>2]=6128;f[k>>2]=6288;f[a+8>>2]=f[b>>2];k=f[b+4>>2]|0;f[a+12>>2]=k;if(k|0)SY(k);f[a+16>>2]=f[c>>2];k=f[c+4>>2]|0;f[a+20>>2]=k;if(k|0)SY(k);f[a+24>>2]=f[d>>2];k=f[d+4>>2]|0;f[a+28>>2]=k;if(k|0)SY(k);m=a+32|0;k=YY(176,47264)|0;if(!k)k=0;else ot(k);f[l>>2]=0;f[n>>2]=f[l>>2];pt(m,k,n);k=a+40|0;l=f[c>>2]|0;if(!l)qt(n);else{l=Td[f[(f[l>>2]|0)+8>>2]&255](l)|0;f[n>>2]=f[l>>2];f[n+4>>2]=f[l+4>>2];f[n+8>>2]=f[l+8>>2];f[n+12>>2]=f[l+12>>2]}av(k,g,n);g=a+240|0;l=h;n=f[l+4>>2]|0;h=g;f[h>>2]=f[l>>2];f[h+4>>2]=n;h=a+248|0;Eh(h);f[a+296>>2]=0;f[a+300>>2]=0;Zp(a+304|0,c,b,d,e,m,k,g,h,i,j);rt(a);u=o;return}function mt(a){a=a|0;f[a>>2]=6532;return}function nt(a){a=a|0;f[a>>2]=6512;return}function ot(a){a=a|0;Gh(a);Gh(a+24|0);Gh(a+48|0);Gh(a+72|0);Gh(a+96|0);Gh(a+120|0);Gh(a+144|0);b[a+168>>0]=1;return}function pt(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=6484;f[c+12>>2]=b;f[a+4>>2]=c;return}function qt(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;d=b+8|0;c=b;zi(d,0.0,0.0);zi(c,0.0,0.0);Uv(a,d,c);u=b;return}function rt(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;n=u;u=u+128|0;i=n+112|0;b=n+72|0;d=n+108|0;e=n+48|0;g=n+104|0;j=n+24|0;k=n+100|0;l=n;m=n+96|0;h=a+16|0;c=f[h>>2]|0;if(c|0){c=Td[f[(f[c>>2]|0)+52>>2]&255](c)|0;f[d>>2]=a;f[i>>2]=f[d>>2];st(b,i);tt(c,b);Dh(b);h=f[h>>2]|0;h=Td[f[(f[h>>2]|0)+56>>2]&255](h)|0;f[g>>2]=a;f[i>>2]=f[g>>2];ut(e,i);vt(h,e);dt(e)}b=f[a+8>>2]|0;if(b|0){h=Td[f[(f[b>>2]|0)+36>>2]&255](b)|0;f[k>>2]=a;f[i>>2]=f[k>>2];wt(j,i);xt(h,j);_s(j)}k=Ys(a+40|0)|0;f[m>>2]=a;f[i>>2]=f[m>>2];yt(l,i);tt(k,l);Dh(l);u=n;return}function st(a,b){a=a|0;b=b|0;f[a>>2]=6440;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function tt(a,b){a=a|0;b=b|0;ht(a,b)|0;return}function ut(a,b){a=a|0;b=b|0;f[a>>2]=6396;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function vt(a,b){a=a|0;b=b|0;ct(a,b)|0;return}function wt(a,b){a=a|0;b=b|0;f[a>>2]=6352;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function xt(a,b){a=a|0;b=b|0;Zs(a,b)|0;return}function yt(a,b){a=a|0;b=b|0;f[a>>2]=6308;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function zt(a){a=a|0;return}function At(a){a=a|0;$Y(a);return}function Bt(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=6308;f[b+4>>2]=f[a+4>>2];return b|0}function Ct(a,b){a=a|0;b=b|0;f[b>>2]=6308;f[b+4>>2]=f[a+4>>2];return}function Dt(a){a=a|0;return}function Et(a){a=a|0;$Y(a);return}function Ft(a){a=a|0;It(a+4|0);return}function Gt(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==19255?a+4|0:0)|0}function Ht(a){a=a|0;return 1304}function It(a){a=a|0;Jt(a);return}function Jt(a){a=a|0;Kt(f[a>>2]|0);return}function Kt(a){a=a|0;var c=0;c=f[a+8>>2]|0;be[f[(f[c>>2]|0)+24>>2]&511](c);a=f[a+32>>2]|0;if(b[a+168>>0]|0)uh(a+48|0);return}function Lt(a){a=a|0;return}function Mt(a){a=a|0;$Y(a);return}function Nt(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=6352;f[b+4>>2]=f[a+4>>2];return b|0}function Ot(a,b){a=a|0;b=b|0;f[b>>2]=6352;f[b+4>>2]=f[a+4>>2];return}function Pt(a){a=a|0;return}function Qt(a){a=a|0;$Y(a);return}function Rt(a,b){a=a|0;b=b|0;Ut(a+4|0,b);return}function St(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==19385?a+4|0:0)|0}function Tt(a){a=a|0;return 1328}function Ut(a,b){a=a|0;b=b|0;Vt(a,b);return}function Vt(a,b){a=a|0;b=b|0;Wt(f[a>>2]|0,b);return}function Wt(a,b){a=a|0;b=b|0;qv(a+40|0,b);Bs(a);return}function Xt(a){a=a|0;return}function Yt(a){a=a|0;$Y(a);return}function Zt(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=6396;f[b+4>>2]=f[a+4>>2];return b|0}function _t(a,b){a=a|0;b=b|0;f[b>>2]=6396;f[b+4>>2]=f[a+4>>2];return}function $t(a){a=a|0;return}function au(a){a=a|0;$Y(a);return}function bu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;eu(a+4|0,b,c,d);return}function cu(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==19585?a+4|0:0)|0}function du(a){a=a|0;return 1360}function eu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;fu(a,b,c,d);return}function fu(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0;a=f[a>>2]|0;g=f[a+8>>2]|0;if(g|0){e=(_d[f[(f[g>>2]|0)+40>>2]&63](g,c,a+40|0,e)|0)&1;b[d>>0]=e}return}function gu(a){a=a|0;$Y(a);return}function hu(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=6440;f[b+4>>2]=f[a+4>>2];return b|0}function iu(a,b){a=a|0;b=b|0;f[b>>2]=6440;f[b+4>>2]=f[a+4>>2];return}function ju(a){a=a|0;return}function ku(a){a=a|0;$Y(a);return}function lu(a){a=a|0;ou(a+4|0);return}function mu(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==19817?a+4|0:0)|0}function nu(a){a=a|0;return 1392}function ou(a){a=a|0;pu(a);return}function pu(a){a=a|0;qu(f[a>>2]|0);return}function qu(a){a=a|0;var b=0,c=0,d=0;b=f[a+8>>2]|0;be[f[(f[b>>2]|0)+24>>2]&511](b);b=a+40|0;d=ru(b)|0;a=a+16|0;c=f[a>>2]|0;if(Wv(d,Td[f[(f[c>>2]|0)+8>>2]&255](c)|0)|0){d=f[a>>2]|0;mv(b,Td[f[(f[d>>2]|0)+8>>2]&255](d)|0)}return}function ru(a){a=a|0;return a+44|0}function su(a){a=a|0;Bh(a+144|0);Bh(a+120|0);Bh(a+96|0);Bh(a+72|0);Bh(a+48|0);Bh(a+24|0);Bh(a);return}function tu(a){a=a|0;NY(a);$Y(a);return}function uu(a){a=a|0;a=f[a+12>>2]|0;if(a|0){su(a);$Y(a)}return}function vu(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==19947?a+12|0:0)|0}function wu(a){a=a|0;$Y(a);return}function xu(a){a=a|0;Jc()}function yu(a){a=a|0;Jc()}function zu(a){a=a|0;do if(f[a+8>>2]|0){if(!(f[a+16>>2]|0)){_g(20096,20138);a=0;break}if(!(f[a+24>>2]|0)){_g(20096,20155);a=0;break}if(!(f[a+32>>2]|0)){_g(20096,20181);a=0;break}if(!(lv(a+40|0)|0)){_g(20096,20209);a=0;break}if(Iq(a+304|0)|0)a=1;else{_g(20096,20232);a=0}}else{_g(20096,20110);a=0}while(0);return a|0}function Au(a){a=a|0;var b=0,c=0;c=f[(f[a>>2]|0)+148>>2]|0;b=Ro(a+304|0)|0;ee[c&255](a,b);return (f[a+296>>2]|0)!=0|0}function Bu(a,b,c,d,e,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+32|0;l=p+16|0;n=p+8|0;m=p;if((((f[b>>2]|0)!=0?(f[c>>2]|0)!=0:0)?(f[d>>2]|0)!=0:0)?(f[e>>2]|0)!=0:0){k=YY(440,47264)|0;if(!k)k=0;else lt(k,b,c,d,e,g,h,i,j);f[m>>2]=0;f[l>>2]=f[m>>2];Cu(n,k,l);k=f[n>>2]|0;do if((k|0)!=0?zu(k)|0:0){if(!(Au(f[n>>2]|0)|0)){_g(20253,20301);ol(a,10);f[a+4>>2]=0;f[a+8>>2]=0;break}ol(a,0);f[a+4>>2]=f[n>>2];k=f[n+4>>2]|0;f[a+8>>2]=k;if(k|0)SY(k)}else o=10;while(0);if((o|0)==10){_g(20253,20266);ol(a,22);f[a+4>>2]=0;f[a+8>>2]=0}Du(n)}else{ol(a,20);f[a+4>>2]=0;f[a+8>>2]=0}u=p;return}function Cu(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=6688;f[c+12>>2]=b;f[a+4>>2]=c;return}function Du(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Eu(a){a=a|0;NY(a);$Y(a);return}function Fu(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function Gu(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==20329?a+12|0:0)|0}function Hu(a){a=a|0;$Y(a);return}function Iu(a){a=a|0;Qs(a);$Y(a);return}function Ju(a){a=a|0;return a+72|0}function Ku(a){a=a|0;return a+136|0}function Lu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+n[b+60>>2];zi(a,+n[b+64>>2]+ +n[c>>2]*+((f[b+32>>2]|0)>>>0)/d,+n[b+68>>2]+(1.0-+n[c+4>>2])*+((f[b+36>>2]|0)>>>0)/d);return}function Mu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+n[b+60>>2];Im(a,(+n[c>>2]-+n[b+64>>2])*d/+((f[b+32>>2]|0)>>>0),1.0-d*(+n[c+4>>2]-+n[b+68>>2])/+((f[b+36>>2]|0)>>>0));return}function Nu(a){a=a|0;return a+64|0}function Ou(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=d|0;e=e|0;var g=0.0,h=0.0,i=0.0,j=0.0,k=0.0;g=+((f[a+36>>2]|0)>>>0);k=+n[b+4>>2];j=1.0-+n[d+4>>2];i=1.0-+n[e+4>>2];h=+n[a+60>>2];n[a+64>>2]=+n[b>>2]+(+n[d>>2]/c-+n[e>>2]/h)*+((f[a+32>>2]|0)>>>0);n[a+68>>2]=k+(j/c-i/h)*g;Pu(a);Qu(a);return}function Pu(a){a=a|0;var b=0,c=0,d=0,e=0,f=0,g=0.0,h=0;f=u;u=u+16|0;d=f;Su(d,a);e=a+44|0;g=+Tu(e);b=!(g<=+Tu(d));g=+Uu(e);c=!(g<=+Uu(d));if(b){g=+Ik(d);h=g<+Ik(e);g=+Gk(d);b=g>+Gk(e);if(h)Wu(a,e,0);if(b)Xu(a,e,d)}else Vu(a,e,d);if(c){g=+Jk(d);h=g>+Jk(e);g=+Hk(d);b=g<+Hk(e);if(h)Zu(a,e,d);if(b)_u(a,e,0)}else Yu(a,e,d);u=f;return}function Qu(a){a=a|0;Ru(a);uh(a+8|0);return}function Ru(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0.0;g=u;u=u+192|0;b=g+128|0;c=g+64|0;d=g;Jv(b,+((f[a+32>>2]|0)>>>0),+((f[a+36>>2]|0)>>>0));e=a+72|0;h=b;i=e+64|0;do{f[e>>2]=f[h>>2];e=e+4|0;h=h+4|0}while((e|0)<(i|0));j=+n[a+60>>2];Lv(c,j,j);Kv(d,-+n[a+64>>2],-+n[a+68>>2]);Gv(b,c,d);e=a+136|0;h=b;i=e+64|0;do{f[e>>2]=f[h>>2];e=e+4|0;h=h+4|0}while((e|0)<(i|0));u=g;return}function Su(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0.0,h=0,i=0.0;c=u;u=u+16|0;e=c+8|0;d=c;g=+n[b+60>>2];i=+((f[b+32>>2]|0)>>>0)/g;g=+((f[b+36>>2]|0)>>>0)/g;h=b+64|0;b=b+68|0;zi(e,+n[h>>2],+n[b>>2]);zi(d,i+ +n[h>>2],g+ +n[b>>2]);Uv(a,e,d);u=c;return}function Tu(a){a=a|0;return +(+n[a+8>>2]-+n[a>>2])}function Uu(a){a=a|0;return +(+n[a+12>>2]-+n[a+4>>2])}
function Vu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0.0,f=0;d=u;u=u+16|0;f=d;$u(f,b);e=+n[f>>2];e=e-+Tu(c)*.5;n[a+64>>2]=e;u=d;return}function Wu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+Ik(b);n[a+64>>2]=d;return}function Xu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+Gk(b);d=d-+Tu(c);n[a+64>>2]=d;return}function Yu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0.0,f=0;d=u;u=u+16|0;f=d;$u(f,b);e=+n[f+4>>2];e=e-+Uu(c)*.5;n[a+68>>2]=e;u=d;return}function Zu(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+Jk(b);d=d-+Uu(c);n[a+68>>2]=d;return}function _u(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0;d=+Hk(b);n[a+68>>2]=d;return}function $u(a,b){a=a|0;b=b|0;zi(a,(+n[b>>2]+ +n[b+8>>2])*.5,(+n[b+4>>2]+ +n[b+12>>2])*.5);return}function av(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;bv(a);f[a>>2]=6716;Gh(a+8|0);d=a+32|0;f[d>>2]=f[b>>2];f[d+4>>2]=f[b+4>>2];f[d+8>>2]=f[b+8>>2];d=a+44|0;f[d>>2]=f[c>>2];f[d+4>>2]=f[c+4>>2];f[d+8>>2]=f[c+8>>2];f[d+12>>2]=f[c+12>>2];n[a+60>>2]=1.0;fj(a+64|0);Fv(a+72|0);Fv(a+136|0);if(Ns(b)|0)cv(a);return}function bv(a){a=a|0;iv(a);f[a>>2]=6764;return}function cv(a){a=a|0;dv(a);return}function dv(a){a=a|0;ev(a);fv(a);Qu(a);return}function ev(a){a=a|0;var b=0,c=0.0,d=0.0,e=0;b=a+40|0;c=+((f[a+32>>2]|0)>>>0)/+n[b>>2]+-20.0;e=a+44|0;c=c/+Tu(e);d=+((f[a+36>>2]|0)>>>0)/+n[b>>2]+-10.0;d=d/+Uu(e);c=+gv(a,d<c?d:c,1.0);n[a+60>>2]=c*+n[b>>2];return}function fv(a){a=a|0;var b=0,c=0.0,d=0,e=0.0;b=u;u=u+16|0;d=b;$u(d,a+44|0);e=+n[a+60>>2];c=+((f[a+36>>2]|0)>>>0)/e;n[a+64>>2]=+n[d>>2]-+((f[a+32>>2]|0)>>>0)/e*.5;n[a+68>>2]=+n[d+4>>2]-c*.5;u=b;return}function gv(a,b,c){a=a|0;b=+b;c=+c;var d=0.0;d=+hv(a);b=d>b?d:b;return +(b>c?c:b)}function hv(a){a=a|0;var b=0.0,c=0.0,d=0;d=a+44|0;b=100.0/+Tu(d);a=a+40|0;b=b*+n[a>>2];c=100.0/+Uu(d);c=c*+n[a>>2];return +(c<b?c:b)}function iv(a){a=a|0;f[a>>2]=6812;return}function jv(a){a=a|0;Jc()}function kv(a){a=a|0;Jc()}function lv(a){a=a|0;if(Ns(a+32|0)|0)if(Xv(a+44|0)|0){_g(20511,20553);a=0}else a=1;else{_g(20511,20527);a=0}return a|0}function mv(a,b){a=a|0;b=b|0;var c=0;if(Xv(b)|0)_g(20574,20597);else{c=a+44|0;f[c>>2]=f[b>>2];f[c+4>>2]=f[b+4>>2];f[c+8>>2]=f[b+8>>2];f[c+12>>2]=f[b+12>>2];Pu(a);Qu(a)}return}function nv(a,c){a=a|0;c=c|0;var d=0.0,e=0.0,f=0.0,g=0.0,h=0.0,i=0.0,j=0,k=0,l=0,m=0;m=u;u=u+16|0;k=m;Su(k,c);c=c+44|0;d=+Tu(c);g=+Uu(c);e=+Tu(k);h=+Uu(k);l=d>e;j=g>h;if(l){f=+Ik(k);i=e/d;f=(f-+Ik(c))/(d-e)}else{i=0.0;f=0.0}if(j){d=+Jk(c);e=h/g;d=(d-+Jk(k))/(g-h)}else{e=0.0;d=0.0}b[a>>0]=l&1;n[a+4>>2]=f;n[a+8>>2]=i;b[a+12>>0]=j&1;n[a+16>>2]=d;n[a+20>>2]=e;u=m;return}function ov(a,b){a=a|0;b=+b;var c=0,d=0.0,e=0.0,f=0,g=0;f=u;u=u+16|0;g=f;Su(g,a);c=a+44|0;d=+Tu(c);e=+Tu(g);if(!(d<=e)){e=(d-e)*b+ +Ik(c);n[a+64>>2]=e;Pu(a);Qu(a)}u=f;return}function pv(a,b){a=a|0;b=+b;var c=0,d=0,e=0.0,f=0.0,g=0,h=0.0;g=u;u=u+16|0;c=g;Su(c,a);d=a+44|0;e=+Uu(d);f=+Uu(c);if(!(e<=f)){h=+Jk(d);f=h-+Uu(c)-(e-f)*b;n[a+68>>2]=f;Pu(a);Qu(a)}u=g;return}function qv(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0,g=0,h=0,i=0,j=0,k=0;j=u;u=u+32|0;i=j+16|0;c=j;if(Ns(b)|0){Su(c,a);$u(i,c);e=b+8|0;h=a+32|0;g=a+40|0;k=Os(+n[e>>2],+n[g>>2],9.99999993922529e-09)|0;c=a+60|0;d=+n[c>>2];if(!k){d=d*(+n[e>>2]/+n[g>>2]);n[c>>2]=d}d=d*2.0;n[a+64>>2]=+n[i>>2]-+((f[b>>2]|0)>>>0)/d;n[a+68>>2]=+n[i+4>>2]-+((f[b+4>>2]|0)>>>0)/d;f[h>>2]=f[b>>2];f[h+4>>2]=f[b+4>>2];f[h+8>>2]=f[b+8>>2];Pu(a);Qu(a)}u=j;return}function rv(a,b,c){a=a|0;b=b|0;c=+c;if(!(c<=0.0))sv(a,b,+n[a+60>>2]*c);return}function sv(a,b,c){a=a|0;b=b|0;c=+c;var d=0.0,e=0;if(!(c<=0.0)){e=a+60|0;d=+n[e>>2];c=+gv(a,c,+tv(a));n[e>>2]=c;uv(a,d,c,b);Pu(a);Qu(a)}return}function tv(a){a=a|0;return +(+n[a+40>>2]*4.0)}function uv(a,b,c,d){a=a|0;b=+b;c=+c;d=d|0;var e=0;c=(c-b)/(b*c);e=a+64|0;n[e>>2]=+n[e>>2]+c*+n[d>>2]*+((f[a+32>>2]|0)>>>0);e=a+68|0;n[e>>2]=+n[e>>2]+c*(1.0-+n[d+4>>2])*+((f[a+36>>2]|0)>>>0);return}function vv(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;d=+n[a>>2]-+n[b>>2];c=+n[a+4>>2]-+n[b+4>>2];return +(d*d+c*c)}function wv(a){a=a|0;var b=0.0,c=0.0;c=+n[a>>2];b=+n[a+4>>2];return +(c*c+b*b)}function xv(a,b){a=a|0;b=b|0;return +(+L(+(+vv(a,b))))}function yv(a){a=a|0;return +(+L(+(+wv(a))))}function zv(a,b,c){a=a|0;b=b|0;c=c|0;zi(a,(+n[b>>2]+ +n[c>>2])*.5,(+n[b+4>>2]+ +n[c+4>>2])*.5);return}function Av(a,b){a=a|0;b=b|0;return +(+n[a>>2]*+n[b>>2]+ +n[a+4>>2]*+n[b+4>>2])}function Bv(a,b){a=a|0;b=b|0;var c=0.0;c=+yv(b);zi(a,+n[b>>2]/c,+n[b+4>>2]/c);return}function Cv(a,b){a=a|0;b=b|0;zi(a,-+n[b+4>>2],+n[b>>2]);return}function Dv(a,b){a=a|0;b=b|0;zi(a,-+n[b>>2],-+n[b+4>>2]);return}function Ev(a,b,c){a=+a;b=+b;c=+c;var d=0,e=0,g=0;e=(n[s>>2]=b,f[s>>2]|0);d=(n[s>>2]=c,f[s>>2]|0);g=b>c;b=(f[s>>2]=g?d:e,+n[s>>2]);c=(f[s>>2]=g?e:d,+n[s>>2]);return +(b>a?b:c<a?c:a)}function Fv(a){a=a|0;var b=0;b=a+64|0;do{f[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function Gv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0.0,g=0,h=0,i=0,j=0;Fv(a);d=0;while(1){if((d|0)==4)break;else g=0;while(1){if((g|0)==4)break;h=Hv(d,g)|0;e=0;f=0.0;while(1){if((e|0)==4)break;j=Hv(d,e)|0;i=Hv(e,g)|0;e=e+1|0;f=f+ +n[b+(j<<2)>>2]*+n[c+(i<<2)>>2]}n[a+(h<<2)>>2]=f;g=g+1|0}d=d+1|0}return}function Hv(a,b){a=a|0;b=b|0;return (b<<2)+a|0}function Iv(a){a=a|0;Fv(a);n[a>>2]=1.0;n[a+20>>2]=1.0;n[a+40>>2]=1.0;n[a+60>>2]=1.0;return}function Jv(a,b,c){a=a|0;b=+b;c=+c;Fv(a);n[a>>2]=2.0/b;n[a+20>>2]=2.0/c;n[a+40>>2]=1.0;n[a+60>>2]=1.0;n[a+48>>2]=-1.0;n[a+52>>2]=-1.0;return}function Kv(a,b,c){a=a|0;b=+b;c=+c;Fv(a);n[a>>2]=1.0;n[a+20>>2]=1.0;n[a+40>>2]=1.0;n[a+60>>2]=1.0;n[a+48>>2]=b;n[a+52>>2]=c;return}function Lv(a,b,c){a=a|0;b=+b;c=+c;Fv(a);n[a>>2]=b;n[a+20>>2]=c;n[a+40>>2]=1.0;n[a+60>>2]=1.0;return}function Mv(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0.0;Fv(a);e=+N(+b);b=+O(+b);n[a>>2]=e;n[a+4>>2]=b;n[a+16>>2]=-b;n[a+20>>2]=e;e=1.0-e;n[a+48>>2]=e*c+b*d+1.0;n[a+52>>2]=e*d-b*c+1.0;n[a+40>>2]=1.0;n[a+60>>2]=1.0;return}function Nv(a,b,c){a=a|0;b=b|0;c=c|0;zi(a,+n[b>>2]+ +n[c>>2],+n[b+4>>2]+ +n[c+4>>2]);return}function Ov(a,b,c){a=a|0;b=b|0;c=c|0;zi(a,+n[b>>2]-+n[c>>2],+n[b+4>>2]-+n[c+4>>2]);return}function Pv(a,b,c){a=a|0;b=+b;c=c|0;zi(a,+n[c>>2]*b,+n[c+4>>2]*b);return}function Qv(a,b,c){a=a|0;b=b|0;c=+c;zi(a,+n[b>>2]*c,+n[b+4>>2]*c);return}function Rv(a,b){a=a|0;b=b|0;if(Os(+n[a>>2],+n[b>>2],9.99999993922529e-09)|0)a=Os(+n[a+4>>2],+n[b+4>>2],9.99999993922529e-09)|0;else a=0;return a|0}function Sv(a,b){a=a|0;b=b|0;return (Rv(a,b)|0)^1|0}function Tv(a){a=a|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;return}function Uv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;f[a>>2]=f[(+n[c>>2]<+n[b>>2]?c:b)>>2];d=b+4|0;e=c+4|0;f[a+4>>2]=f[(+n[e>>2]<+n[d>>2]?e:d)>>2];f[a+8>>2]=f[(+n[b>>2]<+n[c>>2]?c:b)>>2];f[a+12>>2]=f[(+n[d>>2]<+n[e>>2]?e:d)>>2];return}function Vv(a,b){a=a|0;b=b|0;if((Os(+n[a>>2],+n[b>>2],9.99999993922529e-09)|0?Os(+n[a+8>>2],+n[b+8>>2],9.99999993922529e-09)|0:0)?Os(+n[a+4>>2],+n[b+4>>2],9.99999993922529e-09)|0:0)a=Os(+n[a+12>>2],+n[b+12>>2],9.99999993922529e-09)|0;else a=0;return a|0}function Wv(a,b){a=a|0;b=b|0;return (Vv(a,b)|0)^1|0}function Xv(a){a=a|0;if(Os(+n[a>>2],+n[a+8>>2],9.99999993922529e-09)|0)a=1;else a=Os(+n[a+4>>2],+n[a+12>>2],9.99999993922529e-09)|0;return a|0}function Yv(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0;d=u;u=u+16|0;f=d+8|0;e=d;zi(f,+n[b>>2]-c,+n[b+4>>2]-c);zi(e,+n[b+8>>2]+c,+n[b+12>>2]+c);Uv(a,f,e);u=d;return}function Zv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0.0,h=0.0,i=0.0,j=0.0;d=u;u=u+16|0;f=d+8|0;e=d;h=+n[c>>2];g=+n[b>>2];j=+n[c+4>>2];i=+n[b+4>>2];zi(f,h<g?h:g,j<i?j:i);i=+n[b+8>>2];j=+n[c+8>>2];g=+n[b+12>>2];h=+n[c+12>>2];zi(e,i<j?j:i,g<h?h:g);Uv(a,f,e);u=d;return}function _v(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0;d=u;u=u+16|0;f=d+8|0;e=d;j=+Ik(c);i=+Gk(c);h=+Hk(c);g=+Jk(c);k=+Ev(+n[b>>2],j,i);zi(f,k,+Ev(+n[b+4>>2],h,g));i=+Ev(+n[b+8>>2],j,i);zi(e,i,+Ev(+n[b+12>>2],h,g));Uv(a,f,e);u=d;return}function $v(a,b){a=a|0;b=b|0;if((+n[b>>2]>=+n[a>>2]?+n[b+4>>2]>=+n[a+4>>2]:0)?+n[b+8>>2]<=+n[a+8>>2]:0)a=+n[b+12>>2]<=+n[a+12>>2];else a=0;return a|0}function aw(a){a=a|0;return}function bw(a){a=a|0;f[a>>2]=6852;return}function cw(a){a=a|0;Jc()}function dw(a){a=a|0;f[a>>2]=6884;gw(a+4|0);hw(a);return}function ew(a){a=a|0;dw(a);$Y(a);return}function fw(a){a=a|0;var b=0;b=f[a+4>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;he[f[(f[b>>2]|0)+24>>2]&63](b,36160,f[a+12>>2]|0);he[f[(f[b>>2]|0)+28>>2]&63](b,36161,f[a+16>>2]|0);return}function gw(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function hw(a){a=a|0;return}function iw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;jw(a);f[a>>2]=6884;f[a+4>>2]=f[b>>2];b=f[b+4>>2]|0;f[a+8>>2]=b;if(b|0)SY(b);f[a+12>>2]=c;f[a+16>>2]=d;return}function jw(a){a=a|0;f[a>>2]=6904;return}function kw(a){a=a|0;Jc()}function lw(a){a=a|0;return (f[a+4>>2]|0)!=0|0}function mw(a){a=a|0;var b=0;f[a>>2]=6924;f[a+4>>2]=6968;b=a+8|0;if(f[b>>2]|0)Aw(a);gw(b);Bw(a);return}function nw(a){a=a|0;mw(a);$Y(a);return}function ow(a){a=a|0;var b=0;b=f[a+8>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;he[f[(f[b>>2]|0)+24>>2]&63](b,36160,f[a+24>>2]|0);he[f[(f[b>>2]|0)+28>>2]&63](b,36161,f[a+32>>2]|0);return}function pw(a){a=a|0;return (b[a+46>>0]|0)!=0|0}function qw(a){a=a|0;b[a+46>>0]=1;return}function rw(a){a=a|0;b[a+46>>0]=0;return}function sw(a){a=a|0;var b=0;b=f[a+8>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;he[f[(f[b>>2]|0)+32>>2]&63](b,3553,f[a+40>>2]|0);return}function tw(a){a=a|0;return f[a+16>>2]|0}function uw(a){a=a|0;return f[a+20>>2]|0}function vw(a){a=a|0;mw(a+-4|0);return}function ww(a){a=a|0;nw(a+-4|0);return}function xw(a){a=a|0;sw(a+-4|0);return}function yw(a){a=a|0;return tw(a+-4|0)|0}function zw(a){a=a|0;return uw(a+-4|0)|0}function Aw(a){a=a|0;var c=0,d=0,e=0,g=0;c=a+44|0;if(b[c>>0]|0){e=f[a+8>>2]|0;ee[f[(f[e>>2]|0)+40>>2]&255](e,f[a+40>>2]|0)}d=a+36|0;if(b[d>>0]|0){e=f[a+8>>2]|0;ee[f[(f[e>>2]|0)+32>>2]&255](e,f[a+32>>2]|0)}e=a+28|0;if(b[e>>0]|0){g=f[a+8>>2]|0;ee[f[(f[g>>2]|0)+24>>2]&255](g,f[a+24>>2]|0)}b[c>>0]=0;b[d>>0]=0;b[e>>0]=0;b[a+45>>0]=0;return}function Bw(a){a=a|0;Cw(a+4|0);hw(a);return}function Cw(a){a=a|0;return}function Dw(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0;Ew(a);f[a>>2]=6924;f[a+4>>2]=6968;i=a+8|0;h=f[c>>2]|0;f[i>>2]=h;c=f[c+4>>2]|0;f[a+12>>2]=c;if(c){SY(c);h=f[i>>2]|0}f[a+16>>2]=e;f[a+20>>2]=g;f[a+24>>2]=0;b[a+28>>0]=0;f[a+32>>2]=0;b[a+36>>0]=0;i=a+40|0;f[i>>2]=0;d[i+4>>1]=0;b[i+6>>0]=0;if(!((h|0)==0|(e|0)==0|(g|0)==0))Fw(a);return}function Ew(a){a=a|0;var b=0;jw(a);b=a+4|0;Hw(b);f[a>>2]=6996;f[b>>2]=7028;return}function Fw(a){a=a|0;var c=0,d=0,e=0,g=0,h=0,i=0;c=a+16|0;do if((f[c>>2]|0)!=0?(d=a+20|0,(f[d>>2]|0)!=0):0){e=f[a+8>>2]|0;e=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;h=a+32|0;he[f[(f[e>>2]|0)+132>>2]&63](e,1,h);b[a+36>>0]=1;he[f[(f[e>>2]|0)+28>>2]&63](e,36161,f[h>>2]|0);je[f[(f[e>>2]|0)+188>>2]&31](e,36161,32854,f[c>>2]|0,f[d>>2]|0);i=a+24|0;he[f[(f[e>>2]|0)+128>>2]&63](e,1,i);b[a+28>>0]=1;he[f[(f[e>>2]|0)+24>>2]&63](e,36160,f[i>>2]|0);je[f[(f[e>>2]|0)+116>>2]&31](e,36160,36064,36161,f[h>>2]|0);h=a+40|0;he[f[(f[e>>2]|0)+136>>2]&63](e,1,h);b[a+44>>0]=1;he[f[(f[e>>2]|0)+32>>2]&63](e,3553,f[h>>2]|0);ie[f[(f[e>>2]|0)+200>>2]&31](e,3553,10241,9729);ie[f[(f[e>>2]|0)+200>>2]&31](e,3553,10240,9729);ie[f[(f[e>>2]|0)+200>>2]&31](e,3553,10242,33071);ie[f[(f[e>>2]|0)+200>>2]&31](e,3553,10243,33071);oe[f[(f[e>>2]|0)+196>>2]&7](e,3553,0,6408,f[c>>2]|0,f[d>>2]|0,0,6408,5121,0);le[f[(f[e>>2]|0)+120>>2]&7](e,36160,36064,3553,f[h>>2]|0,0);e=Vd[f[(f[e>>2]|0)+44>>2]&127](e,36160)|0;if((e|0)==36053){b[a+45>>0]=1;b[a+46>>0]=0;break}else{Gw(20788,20872,e,20920,f[c>>2]|0,20927,f[d>>2]|0);break}}else g=3;while(0);if((g|0)==3)_g(20788,20819);return}function Gw(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return}function Hw(a){a=a|0;f[a>>2]=7056;return}function Iw(a){a=a|0;Jc()}function Jw(a){a=a|0;Bw(a+-4|0);return}function Kw(a){a=a|0;Iw(a+-4|0);return}function Lw(a){a=a|0;Jc()}function Mw(a,b,c){a=a|0;b=b|0;c=c|0;Aw(a);f[a+16>>2]=b;f[a+20>>2]=c;Fw(a);return}function Nw(a){a=a|0;return (b[a+45>>0]|0)!=0|0}function Ow(a){a=a|0;var b=0,c=0,d=0;f[a>>2]=7084;c=a+4|0;f[c>>2]=7120;d=a+24|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0)be[f[(f[b>>2]|0)+4>>2]&511](b);d=a+20|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0)be[f[(f[b>>2]|0)+4>>2]&511](b);d=a+16|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0)be[f[(f[b>>2]|0)+4>>2]&511](b);gw(a+8|0);$w(c);ax(a);return}function Pw(a){a=a|0;Ow(a);$Y(a);return}function Qw(a){a=a|0;return f[a+16>>2]|0}function Rw(a){a=a|0;return f[a+20>>2]|0}function Sw(a){a=a|0;return f[a+24>>2]|0}function Tw(a){a=a|0;var b=0,c=0;c=a+16|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0)be[f[(f[b>>2]|0)+4>>2]&511](b);c=a+20|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0)be[f[(f[b>>2]|0)+4>>2]&511](b);c=a+24|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0)be[f[(f[b>>2]|0)+4>>2]&511](b);return}function Uw(a,b,c){a=a|0;b=b|0;c=c|0;Zw(a,b);return _w(a)|0}function Vw(a){a=a|0;Ow(a+-4|0);return}function Ww(a){a=a|0;Pw(a+-4|0);return}function Xw(a){a=a|0;Tw(a+-4|0);return}function Yw(a,b,c){a=a|0;b=b|0;c=c|0;return Uw(a+-4|0,b,0)|0}function Zw(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=YY(20,47264)|0;if(!c)c=0;else iw(c,a+8|0,f[b+8>>2]|0,f[b+12>>2]|0);e=a+16|0;d=f[e>>2]|0;f[e>>2]=c;if(d|0)be[f[(f[d>>2]|0)+4>>2]&511](d);c=YY(48,47264)|0;if(!c)c=0;else Dw(c,a+8|0,f[b>>2]|0,f[b+4>>2]|0);e=a+20|0;d=f[e>>2]|0;f[e>>2]=c;if(d|0)be[f[(f[d>>2]|0)+4>>2]&511](d);c=YY(48,47264)|0;if(!c)d=0;else{Dw(c,a+8|0,f[b>>2]|0,f[b+4>>2]|0);d=c}e=a+24|0;c=f[e>>2]|0;f[e>>2]=d;if(c|0)be[f[(f[c>>2]|0)+4>>2]&511](c);return}function _w(a){a=a|0;var b=0;do if(!(f[a+8>>2]|0)){_g(20931,20952);b=0}else{b=f[a+16>>2]|0;if(b|0?lw(b)|0:0){b=f[a+20>>2]|0;if(b|0?Nw(b)|0:0){b=f[a+24>>2]|0;if(b|0?Nw(b)|0:0){b=1;break}_g(20931,21053);b=0;break}_g(20931,21016);b=0;break}_g(20931,20976);b=0}while(0);return b|0}function $w(a){a=a|0;return}function ax(a){a=a|0;return}function bx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;cx(a);d=a+4|0;dx(d);f[a>>2]=7084;f[d>>2]=7120;f[a+8>>2]=f[b>>2];b=f[b+4>>2]|0;f[a+12>>2]=b;if(b|0)SY(b);f[a+16>>2]=0;f[a+20>>2]=0;f[a+24>>2]=0;Zw(a,c);return}function cx(a){a=a|0;f[a>>2]=7168;return}function dx(a){a=a|0;f[a>>2]=7144;return}function ex(a){a=a|0;Jc()}function fx(a){a=a|0;Jc()}function gx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=a+20|0;Mw(f[d>>2]|0,b,c);a=a+24|0;Mw(f[a>>2]|0,b,c);if(Nw(f[d>>2]|0)|0)a=Nw(f[a>>2]|0)|0;else a=0;return a|0}function hx(a){a=a|0;f[a>>2]=7196;return}function ix(a){a=a|0;var b=0,c=0,d=0;b=f[a>>2]|0;if(b|0){c=a+4|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;kx(d)}$Y(f[a>>2]|0)}return}function jx(a){a=a|0;return}function kx(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function lx(a){a=a|0;return 536870911}function mx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>536870911){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<3)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<3)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<3);return}function nx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;d=f[a>>2]|0;e=a+4|0;g=b+4|0;c=f[e>>2]|0;while(1){if((c|0)==(d|0))break;j=f[g>>2]|0;h=c+-8|0;f[j+-8>>2]=f[h>>2];i=c+-4|0;f[j+-4>>2]=f[i>>2];f[h>>2]=0;f[i>>2]=0;f[g>>2]=(f[g>>2]|0)+-8;c=h}h=f[a>>2]|0;f[a>>2]=f[g>>2];f[g>>2]=h;h=b+8|0;j=f[e>>2]|0;f[e>>2]=f[h>>2];f[h>>2]=j;h=a+8|0;j=b+12|0;i=f[h>>2]|0;f[h>>2]=f[j>>2];f[j>>2]=i;f[b>>2]=f[g>>2];return}function ox(a){a=a|0;var b=0,c=0,d=0;b=f[a+4>>2]|0;c=a+8|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;kx(d)}a=f[a>>2]|0;if(a|0)$Y(a);return}function px(a){a=a|0;Jc()}function qx(a){a=a|0;return}function rx(a){a=a|0;f[a>>2]=7224;return}function sx(a){a=a|0;Jc()}function tx(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;m=xx(a+12|0,c)|0;n=f[a+4>>2]|0;a:do if(n){o=n+-1|0;p=(o&n|0)==0;if(!p)if(m>>>0<n>>>0)l=m;else l=(m>>>0)%(n>>>0)|0;else l=o&m;a=f[(f[a>>2]|0)+(l<<2)>>2]|0;if(a){j=c+11|0;k=c+4|0;b:while(1){a=f[a>>2]|0;if(!a){a=0;break a}d=f[a+4>>2]|0;if((d|0)!=(m|0)){if(!p){if(d>>>0>=n>>>0)d=(d>>>0)%(n>>>0)|0}else d=d&o;if((d|0)==(l|0))continue;else{a=0;break}}e=a+8|0;d=b[e+11>>0]|0;h=d<<24>>24<0;d=d&255;i=h?f[a+12>>2]|0:d;q=b[j>>0]|0;g=q<<24>>24<0;if((i|0)!=((g?f[k>>2]|0:q&255)|0))continue;g=g?f[c>>2]|0:c;if(h)if(!(yp(f[e>>2]|0,g,i)|0))break;else continue;while(1){if(!d)break a;if((b[e>>0]|0)!=(b[g>>0]|0))continue b;g=g+1|0;e=e+1|0;d=d+-1|0}}}else a=0}else a=0;while(0);return a|0}function ux(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function vx(a,b,c){a=a|0;b=b|0;c=c|0;return}function wx(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0.0,i=0.0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;B=u;u=u+32|0;A=B+4|0;t=B;v=B+16|0;f[t>>2]=c;z=xx(a+12|0,c)|0;x=a+4|0;j=f[x>>2]|0;y=(j|0)==0;a:do if(!y){o=j+-1|0;p=(o&j|0)==0;if(!p)if(z>>>0<j>>>0)q=z;else q=(z>>>0)%(j>>>0)|0;else q=o&z;d=f[(f[a>>2]|0)+(q<<2)>>2]|0;if(!d){d=q;w=22}else{r=c+11|0;s=c+4|0;b:while(1){d=f[d>>2]|0;if(!d){d=q;w=22;break a}e=f[d+4>>2]|0;if((e|0)!=(z|0)){if(!p){if(e>>>0>=j>>>0)e=(e>>>0)%(j>>>0)|0}else e=e&o;if((e|0)!=(q|0)){d=q;w=22;break a}}g=d+8|0;e=b[g+11>>0]|0;l=e<<24>>24<0;e=e&255;m=l?f[d+12>>2]|0:e;C=b[r>>0]|0;k=C<<24>>24<0;if((m|0)!=((k?f[s>>2]|0:C&255)|0))continue;k=k?f[c>>2]|0:c;if(l)if(!(yp(f[g>>2]|0,k,m)|0))break;else continue;while(1){if(!e)break a;if((b[g>>0]|0)!=(b[k>>0]|0))continue b;k=k+1|0;g=g+1|0;e=e+-1|0}}}}else{d=0;w=22}while(0);if((w|0)==22){yx(A,a,z,47252,t,v);k=a+12|0;h=+(((f[k>>2]|0)+1|0)>>>0);i=+n[a+16>>2];do if(y|i*+(j>>>0)<h){d=j<<1|(j>>>0<3|(j+-1&j|0)!=0)&1;e=~~+W(+(h/i))>>>0;zx(a,d>>>0<e>>>0?e:d);d=f[x>>2]|0;e=d+-1|0;if(!(e&d)){j=d;d=e&z;break}if(z>>>0<d>>>0){j=d;d=z}else{j=d;d=(z>>>0)%(d>>>0)|0}}while(0);e=f[(f[a>>2]|0)+(d<<2)>>2]|0;if(!e){g=a+8|0;f[f[A>>2]>>2]=f[g>>2];f[g>>2]=f[A>>2];f[(f[a>>2]|0)+(d<<2)>>2]=g;g=f[A>>2]|0;d=f[g>>2]|0;if(!d)d=A;else{d=f[d+4>>2]|0;e=j+-1|0;if(e&j){if(d>>>0>=j>>>0)d=(d>>>0)%(j>>>0)|0}else d=d&e;f[(f[a>>2]|0)+(d<<2)>>2]=g;d=A}}else{f[f[A>>2]>>2]=f[e>>2];f[e>>2]=f[A>>2];d=A}C=f[d>>2]|0;f[k>>2]=(f[k>>2]|0)+1;f[d>>2]=0;d=C}u=B;return d+20|0}function xx(a,c){a=a|0;c=c|0;var d=0,e=0;a=u;u=u+16|0;d=b[c+11>>0]|0;e=d<<24>>24<0;c=Cx(a,e?f[c>>2]|0:c,e?f[c+4>>2]|0:d&255)|0;u=a;return c|0}function yx(a,c,d,e,g,h){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;e=XY(28)|0;f[a>>2]=e;f[a+4>>2]=c+8;h=a+8|0;b[h>>0]=0;iZ(e+8|0,f[g>>2]|0);f[e+20>>2]=0;f[e+24>>2]=0;b[h>>0]=1;h=f[a>>2]|0;f[h+4>>2]=d;f[h>>2]=0;return}function zx(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=IY(b)|0}else b=2;d=f[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+W(+(+((f[a+12>>2]|0)>>>0)/+n[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(_(c+-1|0)|0);else c=IY(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)Bx(a,b)}}else Bx(a,b);return}function Ax(a){a=a|0;ux(a+12|0);jZ(a);return}function Bx(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;e=a+4|0;a:do if(c){if(c>>>0>1073741823){a=Sa(8)|0;eZ(a,38407);f[a>>2]=11336;Wa(a|0,3056,442)}t=XY(c<<2)|0;d=f[a>>2]|0;f[a>>2]=t;if(d|0)$Y(d);f[e>>2]=c;d=0;while(1){if((d|0)==(c|0))break;f[(f[a>>2]|0)+(d<<2)>>2]=0;d=d+1|0}g=a+8|0;d=f[g>>2]|0;if(d|0){e=f[d+4>>2]|0;s=c+-1|0;t=(s&c|0)==0;if(!t){if(e>>>0>=c>>>0)e=(e>>>0)%(c>>>0)|0}else e=e&s;f[(f[a>>2]|0)+(e<<2)>>2]=g;while(1){r=d;b:while(1)while(1){d=f[r>>2]|0;if(!d)break a;g=f[d+4>>2]|0;if(!t){if(g>>>0>=c>>>0)g=(g>>>0)%(c>>>0)|0}else g=g&s;if((g|0)==(e|0)){r=d;continue b}h=(f[a>>2]|0)+(g<<2)|0;if(!(f[h>>2]|0))break b;n=d+8|0;o=n+11|0;p=d+12|0;q=d;c:while(1){h=f[q>>2]|0;if(!h){i=36;break}j=h+8|0;i=b[o>>0]|0;l=i<<24>>24<0;i=i&255;m=l?f[p>>2]|0:i;u=b[j+11>>0]|0;k=u<<24>>24<0;if((m|0)!=((k?f[h+12>>2]|0:u&255)|0)){i=36;break}j=k?f[j>>2]|0:j;if(l){if(yp(f[n>>2]|0,j,m)|0){i=33;break}q=f[q>>2]|0;continue}else k=n;while(1){if(!i){q=h;continue c}if((b[k>>0]|0)!=(b[j>>0]|0)){i=35;break c}j=j+1|0;k=k+1|0;i=i+-1|0}}if((i|0)==33)h=f[q>>2]|0;f[r>>2]=h;f[q>>2]=f[f[(f[a>>2]|0)+(g<<2)>>2]>>2];f[f[(f[a>>2]|0)+(g<<2)>>2]>>2]=d}f[h>>2]=r;e=g}}}else{d=f[a>>2]|0;f[a>>2]=0;if(d|0)$Y(d);f[e>>2]=0}while(0);return}function Cx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,i=0;e=~c;e=(e>>>0>4294967292?e:-4)+c+4&-4;f=b+e|0;d=c;a=c;while(1){if(d>>>0<=3)break;i=X(h[b>>0]|h[b+1>>0]<<8|h[b+2>>0]<<16|h[b+3>>0]<<24,1540483477)|0;d=d+-4|0;b=b+4|0;a=(X(i>>>24^i,1540483477)|0)^(X(a,1540483477)|0)}switch(c-e|0){case 3:{a=(h[f+2>>0]|0)<<16^a;g=6;break}case 2:{g=6;break}case 1:{g=7;break}default:{}}if((g|0)==6){a=(h[f+1>>0]|0)<<8^a;g=7}if((g|0)==7)a=X(a^(h[f>>0]|0),1540483477)|0;i=X(a>>>13^a,1540483477)|0;return i>>>15^i|0}function Dx(a){a=a|0;var b=0,c=0,d=0;c=a+12|0;if(f[c>>2]|0){d=a+8|0;Ex(a,f[d>>2]|0);f[d>>2]=0;d=f[a+4>>2]|0;b=0;while(1){if((b|0)==(d|0))break;f[(f[a>>2]|0)+(b<<2)>>2]=0;b=b+1|0}f[c>>2]=0}return}function Ex(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=f[b>>2]|0;Ax(b+8|0);$Y(b);b=a}return}function Fx(a){a=a|0;Gx(a);return}function Gx(a){a=a|0;var b=0;Ex(a,f[a+8>>2]|0);b=f[a>>2]|0;f[a>>2]=0;if(b|0)$Y(b);return}function Hx(a){a=a|0;dx(a);f[a>>2]=7248;return}function Ix(a){a=a|0;Jc()}function Jx(a,b){a=a|0;b=b|0;return}function Kx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Ly(d,b,21261,35633);Ly(e,b,21625,35632);Cy(a,b,d,e);Ny(e);Ny(d);Lx(a+48|0,f[a>>2]|0,b,27607);Lx(a+64|0,f[a>>2]|0,b,23635);Mx(a+80|0,f[a>>2]|0,b,23646);Nx(a+96|0,f[a>>2]|0,b,23656);Nx(a+112|0,f[a>>2]|0,b,23660);Ox(a+128|0,f[a>>2]|0,b,28496);Ox(a+144|0,f[a>>2]|0,b,28505);u=c;return}function Lx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Qx(a,b,c,d);return}function Mx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Qx(a,b,c,d);return}function Nx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Qx(a,b,c,d);return}function Ox(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a>>2]=b;f[a+4>>2]=f[c>>2];b=f[c+4>>2]|0;f[a+8>>2]=b;if(b|0)SY(b);f[a+12>>2]=d;return}function Px(a){a=a|0;gw(a+4|0);return}function Qx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a>>2]=b;f[a+4>>2]=f[c>>2];b=f[c+4>>2]|0;f[a+8>>2]=b;if(b|0)SY(b);f[a+12>>2]=d;return}function Rx(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Ly(d,b,23672,35633);Ly(e,b,25750,35632);Cy(a,b,d,e);Ny(e);Ny(d);Lx(a+48|0,f[a>>2]|0,b,28492);Sx(a+64|0,f[a>>2]|0,b,28032);Ox(a+80|0,f[a>>2]|0,b,28496);Tx(a+96|0,f[a>>2]|0,b,34680);u=c;return}function Sx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Qx(a,b,c,d);return}function Tx(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a>>2]=b;f[a+4>>2]=f[c>>2];b=f[c+4>>2]|0;f[a+8>>2]=b;if(b|0)SY(b);f[a+12>>2]=d;return}function Ux(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Ly(d,b,23882,35633);Ly(e,b,25750,35632);Cy(a,b,d,e);Ny(e);Ny(d);Lx(a+48|0,f[a>>2]|0,b,28492);Nx(a+64|0,f[a>>2]|0,b,25957);Nx(a+80|0,f[a>>2]|0,b,25960);Nx(a+96|0,f[a>>2]|0,b,25963);Nx(a+112|0,f[a>>2]|0,b,24776);Mx(a+128|0,f[a>>2]|0,b,26796);Mx(a+144|0,f[a>>2]|0,b,25966);Mx(a+160|0,f[a>>2]|0,b,25982);Sx(a+176|0,f[a>>2]|0,b,28032);Tx(a+192|0,f[a>>2]|0,b,25996);Tx(a+208|0,f[a>>2]|0,b,25998);Tx(a+224|0,f[a>>2]|0,b,26015);u=c;return}function Vx(a){a=a|0;var b=0,c=0,d=0;f[a>>2]=7280;c=a+4|0;f[c>>2]=7336;d=a+44|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){sy(b);$Y(b)}d=a+40|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){ry(b);$Y(b)}d=a+36|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){qy(b);$Y(b)}d=a+32|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){py(b);$Y(b)}d=a+28|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){oy(b);$Y(b)}d=a+24|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){ny(b);$Y(b)}d=a+20|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){my(b);$Y(b)}d=a+16|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){ly(b);$Y(b)}gw(a+8|0);$w(c);yy(a);return}function Wx(a){a=a|0;Vx(a);$Y(a);return}function Xx(a){a=a|0;return f[a+16>>2]|0}function Yx(a){a=a|0;return f[a+20>>2]|0}function Zx(a){a=a|0;return f[a+24>>2]|0}function _x(a){a=a|0;return f[a+28>>2]|0}function $x(a){a=a|0;return f[a+32>>2]|0}function ay(a){a=a|0;return f[a+36>>2]|0}function by(a){a=a|0;return f[a+40>>2]|0}function cy(a){a=a|0;return f[a+44>>2]|0}function dy(a){a=a|0;xy(a);return}function ey(a,b,c){a=a|0;b=b|0;c=c|0;jy(a);return ky(a)|0}function fy(a){a=a|0;Vx(a+-4|0);return}function gy(a){a=a|0;Wx(a+-4|0);return}function hy(a){a=a|0;dy(a+-4|0);return}function iy(a,b,c){a=a|0;b=b|0;c=c|0;return ey(a+-4|0,0,0)|0}function jy(a){a=a|0;var b=0,c=0,d=0;b=YY(96,47264)|0;if(!b)b=0;else Uy(b,a+8|0);d=a+16|0;c=f[d>>2]|0;f[d>>2]=b;if(c|0){ly(c);$Y(c)}b=YY(160,47264)|0;if(!b)b=0;else Kx(b,a+8|0);d=a+20|0;c=f[d>>2]|0;f[d>>2]=b;if(c|0){my(c);$Y(c)}b=YY(112,47264)|0;if(!b)b=0;else Rx(b,a+8|0);d=a+24|0;c=f[d>>2]|0;f[d>>2]=b;if(c|0){ny(c);$Y(c)}b=YY(148,47264)|0;if(!b)b=0;else Jy(b,a+8|0);d=a+28|0;c=f[d>>2]|0;f[d>>2]=b;if(c|0){oy(c);$Y(c)}b=YY(224,47264)|0;if(!b)b=0;else Iy(b,a+8|0);d=a+32|0;c=f[d>>2]|0;f[d>>2]=b;if(c|0){py(c);$Y(c)}b=YY(160,47264)|0;if(!b)b=0;else Ky(b,a+8|0);d=a+36|0;c=f[d>>2]|0;f[d>>2]=b;if(c|0){qy(c);$Y(c)}b=YY(240,47264)|0;if(!b)b=0;else Ux(b,a+8|0);d=a+40|0;c=f[d>>2]|0;f[d>>2]=b;if(c|0){ry(c);$Y(c)}b=YY(112,47264)|0;if(!b)b=0;else Ty(b,a+8|0);d=a+44|0;c=f[d>>2]|0;f[d>>2]=b;if(c|0){sy(c);$Y(c)}return}function ky(a){a=a|0;var b=0,c=0,d=0,e=0;e=u;u=u+32|0;c=e;if(!(f[a+8>>2]|0)){_g(24779,31562);a=0}else{f[c>>2]=f[a+16>>2];f[c+4>>2]=f[a+20>>2];f[c+8>>2]=f[a+24>>2];b=f[a+28>>2]|0;f[c+12>>2]=(b|0)==0?0:b+4|0;f[c+16>>2]=f[a+32>>2];f[c+20>>2]=f[a+36>>2];f[c+24>>2]=f[a+40>>2];f[c+28>>2]=f[a+44>>2];a=0;while(1){if((a|0)>=8){a=1;break}b=f[c+(a<<2)>>2]|0;if(!b){d=8;break}if(!(Gy(b)|0)){d=8;break}a=a+1|0}if((d|0)==8){Xl(24779,24801,a,24811);a=0}}u=e;return a|0}function ly(a){a=a|0;ty(a+80|0);ty(a+64|0);Px(a+48|0);Fy(a);return}function my(a){a=a|0;ty(a+144|0);ty(a+128|0);Px(a+112|0);Px(a+96|0);Px(a+80|0);Px(a+64|0);Px(a+48|0);Fy(a);return}function ny(a){a=a|0;uy(a+96|0);ty(a+80|0);Px(a+64|0);Px(a+48|0);Fy(a);return}function oy(a){a=a|0;f[a>>2]=7360;ty(a+132|0);Px(a+116|0);Px(a+100|0);Px(a+84|0);Px(a+68|0);Px(a+52|0);Fy(a+4|0);return}function py(a){a=a|0;uy(a+208|0);uy(a+192|0);uy(a+176|0);Px(a+160|0);Px(a+144|0);Px(a+128|0);Px(a+112|0);Px(a+96|0);Px(a+80|0);Px(a+64|0);Px(a+48|0);Fy(a);return}function qy(a){a=a|0;ty(a+144|0);ty(a+128|0);Px(a+112|0);Px(a+96|0);Px(a+80|0);Px(a+64|0);Px(a+48|0);Fy(a);return}function ry(a){a=a|0;uy(a+224|0);uy(a+208|0);uy(a+192|0);Px(a+176|0);Px(a+160|0);Px(a+144|0);Px(a+128|0);Px(a+112|0);Px(a+96|0);Px(a+80|0);Px(a+64|0);Px(a+48|0);Fy(a);return}function sy(a){a=a|0;ty(a+96|0);ty(a+80|0);Px(a+64|0);Px(a+48|0);Fy(a);return}function ty(a){a=a|0;gw(a+4|0);return}function uy(a){a=a|0;gw(a+4|0);return}function vy(a){a=a|0;wy(a+132|0);return}function wy(a){a=a|0;var b=0;b=f[a+4>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;a=Xd[f[(f[b>>2]|0)+140>>2]&63](b,f[a>>2]|0,f[a+12>>2]|0)|0;ee[f[(f[b>>2]|0)+100>>2]&255](b,a);return}function xy(a){a=a|0;var b=0,c=0;c=a+16|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0){ly(b);$Y(b)}c=a+20|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0){my(b);$Y(b)}c=a+24|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0){ny(b);$Y(b)}c=a+28|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0){oy(b);$Y(b)}c=a+32|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0){py(b);$Y(b)}c=a+36|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0){qy(b);$Y(b)}c=a+40|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0){ry(b);$Y(b)}c=a+44|0;b=f[c>>2]|0;f[c>>2]=0;if(b|0){sy(b);$Y(b)}return}function yy(a){a=a|0;return}function zy(a,b){a=a|0;b=b|0;var c=0,d=0;Ay(a);d=a+4|0;dx(d);f[a>>2]=7280;f[d>>2]=7336;d=a+8|0;c=f[b>>2]|0;f[d>>2]=c;b=f[b+4>>2]|0;f[a+12>>2]=b;if(b){SY(b);c=f[d>>2]|0}d=a+16|0;f[d>>2]=0;f[d+4>>2]=0;f[d+8>>2]=0;f[d+12>>2]=0;f[d+16>>2]=0;f[d+20>>2]=0;f[d+24>>2]=0;f[d+28>>2]=0;if(c|0)jy(a);return}function Ay(a){a=a|0;f[a>>2]=7372;return}function By(a){a=a|0;Jc()}function Cy(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0;f[a>>2]=0;h=a+4|0;f[h>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+8>>2]=c;if(c|0)SY(c);g=a+12|0;Py(g,d);c=a+28|0;Py(c,e);b[a+44>>0]=0;if((f[h>>2]|0?Ry(g)|0:0)?Ry(c)|0:0)Dy(a);return}function Dy(a){a=a|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;i=u;u=u+272|0;d=i;g=i+8|0;h=f[a+4>>2]|0;h=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;c=Td[f[(f[h>>2]|0)+60>>2]&255](h)|0;f[a>>2]=c;if(c){k=f[(f[h>>2]|0)+16>>2]|0;e=a+12|0;l=Sy(e)|0;he[k&63](h,c,l);l=f[(f[h>>2]|0)+16>>2]|0;k=f[a>>2]|0;c=a+28|0;j=Sy(c)|0;he[l&63](h,k,j);ee[f[(f[h>>2]|0)+176>>2]&255](h,f[a>>2]|0);ie[f[(f[h>>2]|0)+156>>2]&31](h,f[a>>2]|0,35714,d);if(!(f[d>>2]|0)){l=f[(f[h>>2]|0)+92>>2]|0;k=f[a>>2]|0;j=Sy(e)|0;he[l&63](h,k,j);j=f[(f[h>>2]|0)+92>>2]|0;k=f[a>>2]|0;l=Sy(c)|0;he[j&63](h,k,l);je[f[(f[h>>2]|0)+152>>2]&31](h,f[a>>2]|0,256,0,g);Ey(24932,24974,g)}else b[a+44>>0]=1}else _g(24932,24953);u=i;return}function Ey(a,b,c){a=a|0;b=b|0;c=c|0;return}function Fy(a){a=a|0;var c=0,d=0,e=0,g=0,h=0;if(!(b[a+44>>0]|0))c=a;else{e=a+4|0;c=f[e>>2]|0;c=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;h=f[(f[c>>2]|0)+92>>2]|0;d=f[a>>2]|0;g=Sy(a+12|0)|0;he[h&63](c,d,g);e=f[e>>2]|0;e=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;g=f[(f[e>>2]|0)+92>>2]|0;d=f[a>>2]|0;c=Sy(a+28|0)|0;he[g&63](e,d,c);c=a}c=f[c>>2]|0;if(c|0){h=f[a+4>>2]|0;ee[f[(f[h>>2]|0)+28>>2]&255](h,c)}Ny(a+28|0);Ny(a+12|0);gw(a+4|0);return}function Gy(a){a=a|0;return (b[a+44>>0]|0)!=0|0}function Hy(a){a=a|0;var b=0;b=f[a+4>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;ee[f[(f[b>>2]|0)+224>>2]&255](b,f[a>>2]|0);return}function Iy(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Ly(d,b,24995,35633);Ly(e,b,25750,35632);Cy(a,b,d,e);Ny(e);Ny(d);Lx(a+48|0,f[a>>2]|0,b,28492);Nx(a+64|0,f[a>>2]|0,b,25957);Nx(a+80|0,f[a>>2]|0,b,25960);Nx(a+96|0,f[a>>2]|0,b,25963);Mx(a+112|0,f[a>>2]|0,b,26796);Mx(a+128|0,f[a>>2]|0,b,25966);Mx(a+144|0,f[a>>2]|0,b,25982);Sx(a+160|0,f[a>>2]|0,b,28032);Tx(a+176|0,f[a>>2]|0,b,25996);Tx(a+192|0,f[a>>2]|0,b,25998);Tx(a+208|0,f[a>>2]|0,b,26015);u=c;return}function Jy(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;g=c;d=a+4|0;Ly(e,b,26022,35633);Ly(g,b,26282,35632);Cy(d,b,e,g);Ny(g);Ny(e);f[a>>2]=7360;Lx(a+52|0,f[d>>2]|0,b,28492);Mx(a+68|0,f[d>>2]|0,b,26796);Mx(a+84|0,f[d>>2]|0,b,26806);Sx(a+100|0,f[d>>2]|0,b,28032);Nx(a+116|0,f[d>>2]|0,b,26813);Ox(a+132|0,f[d>>2]|0,b,28496);u=c;return}function Ky(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Ly(d,b,26820,35633);Ly(e,b,27156,35632);Cy(a,b,d,e);Ny(e);Ny(d);Lx(a+48|0,f[a>>2]|0,b,27607);Mx(a+64|0,f[a>>2]|0,b,27618);Nx(a+80|0,f[a>>2]|0,b,27625);Mx(a+96|0,f[a>>2]|0,b,27632);Mx(a+112|0,f[a>>2]|0,b,27642);Ox(a+128|0,f[a>>2]|0,b,28496);Ox(a+144|0,f[a>>2]|0,b,27652);u=c;return}function Ly(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0;g=f[c>>2]|0;f[a>>2]=g;c=f[c+4>>2]|0;f[a+4>>2]=c;if(c){SY(c);g=f[a>>2]|0}f[a+8>>2]=0;b[a+12>>0]=0;if(!((d|0)==0|(g|0)==0))My(a,d,e);return}function My(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;j=u;u=u+272|0;g=j;h=j+4|0;i=j+8|0;f[g>>2]=c;e=f[a>>2]|0;e=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;c=Vd[f[(f[e>>2]|0)+64>>2]&127](e,d)|0;d=a+8|0;f[d>>2]=c;if(c){je[f[(f[e>>2]|0)+192>>2]&31](e,c,1,g,0);ee[f[(f[e>>2]|0)+56>>2]&255](e,f[d>>2]|0);ie[f[(f[e>>2]|0)+164>>2]&31](e,f[d>>2]|0,35713,h);if(!(f[h>>2]|0)){je[f[(f[e>>2]|0)+160>>2]&31](e,f[d>>2]|0,256,0,i);Ey(27663,27705,i)}else b[a+12>>0]=1}else _g(27663,27685);u=j;return}function Ny(a){a=a|0;Oy(a);gw(a);return}function Oy(a){a=a|0;var b=0,c=0;b=f[a+8>>2]|0;if(b|0?(c=f[a>>2]|0,c|0):0)ee[f[(f[c>>2]|0)+36>>2]&255](c,b);return}function Py(a,b){a=a|0;b=b|0;f[a>>2]=0;f[a+4>>2]=0;Qy(a,b);return}function Qy(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;d=u;u=u+16|0;e=d;h=c+8|0;f[a+8>>2]=f[h>>2];f[h>>2]=0;h=c+12|0;b[a+12>>0]=b[h>>0]|0;b[h>>0]=0;h=f[c>>2]|0;i=c+4|0;g=f[i>>2]|0;f[c>>2]=0;f[i>>2]=0;f[e>>2]=f[a>>2];f[a>>2]=h;c=a+4|0;f[e+4>>2]=f[c>>2];f[c>>2]=g;gw(e);u=d;return}function Ry(a){a=a|0;return (b[a+12>>0]|0)!=0|0}function Sy(a){a=a|0;return f[a+8>>2]|0}function Ty(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Ly(d,b,28038,35633);Ly(e,b,27728,35632);Cy(a,b,d,e);Ny(e);Ny(d);Lx(a+48|0,f[a>>2]|0,b,28492);Sx(a+64|0,f[a>>2]|0,b,28032);Ox(a+80|0,f[a>>2]|0,b,28496);Ox(a+96|0,f[a>>2]|0,b,28505);u=c;return}function Uy(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=u;u=u+32|0;d=c+16|0;e=c;Ly(d,b,28038,35633);Ly(e,b,28278,35632);Cy(a,b,d,e);Ny(e);Ny(d);Lx(a+48|0,f[a>>2]|0,b,28492);Ox(a+64|0,f[a>>2]|0,b,28496);Ox(a+80|0,f[a>>2]|0,b,28505);u=c;return}function Vy(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);Wy(a+16|0,b);Wy(a+32|0,b);Xy(a+48|0,b);Xy(a+64|0,b);return}function Wy(a,c){a=a|0;c=c|0;var d=0;d=f[c>>2]|0;f[a>>2]=d;c=f[c+4>>2]|0;f[a+4>>2]=c;if(c){SY(c);d=f[a>>2]|0}b[a+14>>0]=0;if(d|0)cz(a);return}function Xy(a,c){a=a|0;c=c|0;var d=0;d=f[c>>2]|0;f[a>>2]=d;c=f[c+4>>2]|0;f[a+4>>2]=c;if(c){SY(c);d=f[a>>2]|0}b[a+14>>0]=0;if(d|0)bz(a);return}function Yy(a){a=a|0;var b=0;if(f[a>>2]|0?az(a)|0:0){b=f[a>>2]|0;ee[f[(f[b>>2]|0)+20>>2]&255](b,f[a+8>>2]|0)}gw(a);return}function Zy(a){a=a|0;var b=0;if(f[a>>2]|0?$y(a)|0:0){b=f[a>>2]|0;ee[f[(f[b>>2]|0)+20>>2]&255](b,f[a+8>>2]|0)}gw(a);return}function _y(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function $y(a){a=a|0;var b=0;b=d[a+12>>1]|0;a=f[a>>2]|0;return b<<16>>16==(Td[f[(f[a>>2]|0)+12>>2]&255](a)|0)<<16>>16|0}function az(a){a=a|0;var b=0;b=d[a+12>>1]|0;a=f[a>>2]|0;return b<<16>>16==(Td[f[(f[a>>2]|0)+12>>2]&255](a)|0)<<16>>16|0}function bz(a){a=a|0;var b=0;b=f[a>>2]|0;b=Td[f[(f[b>>2]|0)+12>>2]&255](b)|0;d[a+12>>1]=b;b=f[a>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;he[f[(f[b>>2]|0)+124>>2]&63](b,1,a+8|0);return}function cz(a){a=a|0;var b=0;b=f[a>>2]|0;b=Td[f[(f[b>>2]|0)+12>>2]&255](b)|0;d[a+12>>1]=b;b=f[a>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;he[f[(f[b>>2]|0)+124>>2]&63](b,1,a+8|0);return}function dz(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(28519,30550);a=0}else a=1;else{_g(28519,31562);a=0}return a|0}function ez(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var f=0.0,g=0.0;e=e*.699999988079071;n[a>>2]=e/6.0;n[a+4>>2]=e*1.5;n[a+8>>2]=e*2.5;n[a+12>>2]=e/5.0;f=e*6.099999904632568;n[a+16>>2]=f;n[a+20>>2]=e*1.2999999523162842;n[a+24>>2]=e/3.0;n[a+28>>2]=e*.25;g=+xv(c,d);f=e*8.0+f;e=g/f;if(e>1.0){e=+M(+e,.30000001192092896);f=g/e}n[a+36>>2]=e;n[a+32>>2]=f;return}function fz(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0.0,k=0.0,l=0,m=0,o=0,p=0,q=0,r=0;r=u;u=u+304|0;l=r+256|0;m=r+192|0;o=r+128|0;p=r+64|0;q=r;h=d+28|0;i=d+36|0;if(Rv(h,i)|0)a=0;else{ez(l,0,h,i,+n[d+20>>2]);j=+n[l+36>>2];k=+gz(c,j);hz(m);do if(iz(a)|0){if(!(jz(a,l,k,m)|0)){_g(28540,28595);a=0;break}kz(o,h,i,j,e);je[f[(f[g>>2]|0)+8>>2]&31](g,770,771,1,1);if(b[d+24>>0]|0){Kv(q,0.0,-1.0);Gv(p,q,o);lz(a,7412,p,c,k,m)}mz(p,d+16|0);lz(a,p,o,c,k,m);a=1}else{_g(28540,28565);a=0}while(0)}u=r;return a|0}function gz(a,b){a=a|0;b=+b;b=1.0/+Qd[f[(f[a>>2]|0)+20>>2]&7](a)/b;return +(b<.20000000298023224?.20000000298023224:b)}function hz(a){a=a|0;fj(a);fj(a+8|0);fj(a+16|0);fj(a+24|0);fj(a+32|0);fj(a+40|0);return}function iz(a){a=a|0;var c=0,d=0,e=0,f=0,g=0;g=u;u=u+80|0;f=g;a=a+16|0;if(Hz(a)|0)a=1;else{c=f;d=28734;e=c+78|0;do{b[c>>0]=b[d>>0]|0;c=c+1|0;d=d+1|0}while((c|0)<(e|0));a=Iz(a,78,f,35044)|0}u=g;return a|0}function jz(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0.0,ha=0.0;r=u;u=u+912|0;fa=r+856|0;K=r+848|0;v=r+840|0;E=r+832|0;F=r+824|0;w=r+816|0;C=r+904|0;q=r+896|0;D=r+888|0;e=r+872|0;g=r+864|0;U=r+760|0;B=r+704|0;j=r+696|0;k=r+688|0;X=r+680|0;Y=r+672|0;S=r+664|0;T=r+656|0;V=r+648|0;W=r+640|0;Q=r+632|0;R=r+624|0;A=r+568|0;l=r+560|0;m=r+552|0;O=r+544|0;N=r+536|0;J=r+528|0;I=r+520|0;M=r+512|0;L=r+504|0;H=r+496|0;G=r+488|0;t=r+432|0;s=r;ca=b+32|0;ba=b+16|0;ga=+n[ca>>2]-+n[ba>>2];ha=+n[b>>2];aa=b+4|0;zi(fa,-(ga*ha)/(+n[aa>>2]-ha),0.0);zi(K,ga,+n[aa>>2]);xz(v,K);p=b+8|0;zi(E,+n[K>>2]-+n[b+20>>2],+n[K+4>>2]+ +n[p>>2]);xz(F,E);o=b+12|0;ga=+n[o>>2];zi(w,+n[ca>>2]+ +n[ba>>2]*ga/(+n[aa>>2]+ +n[p>>2]-ga),0.0);zv(C,fa,K);xz(q,C);zv(D,K,E);xz(r+880|0,D);zv(e,E,w);xz(g,e);yz(U,C,q,fa,+n[b>>2],c);q=U;p=f[q>>2]|0;q=f[q+4>>2]|0;aa=U+16|0;ba=f[aa>>2]|0;aa=f[aa+4>>2]|0;ca=U+24|0;da=f[ca>>2]|0;ca=f[ca+4>>2]|0;_=U+32|0;$=f[_>>2]|0;_=f[_+4>>2]|0;U=U+40|0;P=f[U>>2]|0;U=f[U+4>>2]|0;h=b+28|0;zz(B,C,D,K,+n[h>>2],c);C=B;i=f[C+4>>2]|0;y=j;f[y>>2]=f[C>>2];f[y+4>>2]=i;xz(k,j);y=B+16|0;i=f[y+4>>2]|0;C=X;f[C>>2]=f[y>>2];f[C+4>>2]=i;C=B+24|0;i=f[C+4>>2]|0;y=Y;f[y>>2]=f[C>>2];f[y+4>>2]=i;xz(S,X);xz(T,Y);y=B+32|0;i=f[y+4>>2]|0;C=V;f[C>>2]=f[y>>2];f[C+4>>2]=i;B=B+40|0;C=f[B+4>>2]|0;i=W;f[i>>2]=f[B>>2];f[i+4>>2]=C;xz(Q,V);xz(R,W);i=b+24|0;yz(A,D,e,E,+n[i>>2],c);D=A;C=f[D+4>>2]|0;B=l;f[B>>2]=f[D>>2];f[B+4>>2]=C;xz(m,l);B=A+16|0;C=f[B+4>>2]|0;D=O;f[D>>2]=f[B>>2];f[D+4>>2]=C;D=A+24|0;C=f[D+4>>2]|0;B=N;f[B>>2]=f[D>>2];f[B+4>>2]=C;xz(J,O);xz(I,N);B=A+32|0;C=f[B+4>>2]|0;D=M;f[D>>2]=f[B>>2];f[D+4>>2]=C;A=A+40|0;D=f[A+4>>2]|0;C=L;f[C>>2]=f[A>>2];f[C+4>>2]=D;xz(H,M);xz(G,L);yz(t,e,g,w,+n[o>>2],c);g=t;e=f[g>>2]|0;g=f[g+4>>2]|0;C=t+16|0;D=f[C>>2]|0;C=f[C+4>>2]|0;A=t+24|0;B=f[A>>2]|0;A=f[A+4>>2]|0;y=t+32|0;z=f[y>>2]|0;y=f[y+4>>2]|0;t=t+40|0;x=f[t>>2]|0;t=f[t+4>>2]|0;ea=f[fa+4>>2]|0;Z=s;f[Z>>2]=f[fa>>2];f[Z+4>>2]=ea;n[s+8>>2]=0.0;Z=s+12|0;f[Z>>2]=da;f[Z+4>>2]=ca;n[s+20>>2]=0.0;Z=s+24|0;f[Z>>2]=ba;f[Z+4>>2]=aa;n[s+32>>2]=1.0;Z=s+36|0;f[Z>>2]=p;f[Z+4>>2]=q;n[s+44>>2]=1.0;Z=s+48|0;f[Z>>2]=$;f[Z+4>>2]=_;n[s+56>>2]=1.0;Z=s+60|0;f[Z>>2]=P;f[Z+4>>2]=U;n[s+68>>2]=0.0;Z=j;U=f[Z+4>>2]|0;P=s+72|0;f[P>>2]=f[Z>>2];f[P+4>>2]=U;n[s+80>>2]=0.0;P=f[Y+4>>2]|0;U=s+84|0;f[U>>2]=f[Y>>2];f[U+4>>2]=P;n[s+92>>2]=0.0;U=f[X+4>>2]|0;P=s+96|0;f[P>>2]=f[X>>2];f[P+4>>2]=U;n[s+104>>2]=1.0;P=f[W+4>>2]|0;U=s+108|0;f[U>>2]=f[W>>2];f[U+4>>2]=P;n[s+116>>2]=0.0;U=f[V+4>>2]|0;P=s+120|0;f[P>>2]=f[V>>2];f[P+4>>2]=U;n[s+128>>2]=1.0;P=f[K+4>>2]|0;U=s+132|0;f[U>>2]=f[K>>2];f[U+4>>2]=P;n[s+140>>2]=1.0;U=k;P=f[U+4>>2]|0;K=s+144|0;f[K>>2]=f[U>>2];f[K+4>>2]=P;n[s+152>>2]=0.0;K=f[T+4>>2]|0;P=s+156|0;f[P>>2]=f[T>>2];f[P+4>>2]=K;n[s+164>>2]=0.0;P=f[S+4>>2]|0;K=s+168|0;f[K>>2]=f[S>>2];f[K+4>>2]=P;n[s+176>>2]=1.0;K=f[R+4>>2]|0;P=s+180|0;f[P>>2]=f[R>>2];f[P+4>>2]=K;n[s+188>>2]=0.0;P=f[Q+4>>2]|0;K=s+192|0;f[K>>2]=f[Q>>2];f[K+4>>2]=P;n[s+200>>2]=1.0;K=f[v+4>>2]|0;P=s+204|0;f[P>>2]=f[v>>2];f[P+4>>2]=K;n[s+212>>2]=1.0;P=l;K=f[P+4>>2]|0;v=s+216|0;f[v>>2]=f[P>>2];f[v+4>>2]=K;n[s+224>>2]=1.0;v=f[O+4>>2]|0;K=s+228|0;f[K>>2]=f[O>>2];f[K+4>>2]=v;n[s+236>>2]=1.0;K=f[N+4>>2]|0;v=s+240|0;f[v>>2]=f[N>>2];f[v+4>>2]=K;n[s+248>>2]=0.0;v=f[M+4>>2]|0;K=s+252|0;f[K>>2]=f[M>>2];f[K+4>>2]=v;n[s+260>>2]=1.0;K=f[L+4>>2]|0;v=s+264|0;f[v>>2]=f[L>>2];f[v+4>>2]=K;n[s+272>>2]=0.0;v=f[E+4>>2]|0;K=s+276|0;f[K>>2]=f[E>>2];f[K+4>>2]=v;n[s+284>>2]=0.0;K=m;v=f[K+4>>2]|0;E=s+288|0;f[E>>2]=f[K>>2];f[E+4>>2]=v;n[s+296>>2]=1.0;E=f[J+4>>2]|0;v=s+300|0;f[v>>2]=f[J>>2];f[v+4>>2]=E;n[s+308>>2]=1.0;v=f[I+4>>2]|0;E=s+312|0;f[E>>2]=f[I>>2];f[E+4>>2]=v;n[s+320>>2]=0.0;E=f[H+4>>2]|0;v=s+324|0;f[v>>2]=f[H>>2];f[v+4>>2]=E;n[s+332>>2]=1.0;v=f[G+4>>2]|0;E=s+336|0;f[E>>2]=f[G>>2];f[E+4>>2]=v;n[s+344>>2]=0.0;E=f[F+4>>2]|0;v=s+348|0;f[v>>2]=f[F>>2];f[v+4>>2]=E;n[s+356>>2]=0.0;v=s+360|0;f[v>>2]=e;f[v+4>>2]=g;n[s+368>>2]=1.0;v=s+372|0;f[v>>2]=D;f[v+4>>2]=C;n[s+380>>2]=1.0;v=s+384|0;f[v>>2]=B;f[v+4>>2]=A;n[s+392>>2]=0.0;v=s+396|0;f[v>>2]=z;f[v+4>>2]=y;n[s+404>>2]=1.0;v=s+408|0;f[v>>2]=x;f[v+4>>2]=t;n[s+416>>2]=0.0;v=f[w+4>>2]|0;t=s+420|0;f[t>>2]=f[w>>2];f[t+4>>2]=v;n[s+428>>2]=0.0;if(Az(a+48|0,432,s,35044)|0){fa=d;f[fa>>2]=p;f[fa+4>>2]=q;fa=d+8|0;f[fa>>2]=e;f[fa+4>>2]=g;e=l;fa=f[e+4>>2]|0;ea=d+16|0;f[ea>>2]=f[e>>2];f[ea+4>>2]=fa;ea=m;fa=f[ea+4>>2]|0;e=d+32|0;f[e>>2]=f[ea>>2];f[e+4>>2]=fa;e=j;fa=f[e+4>>2]|0;ea=d+24|0;f[ea>>2]=f[e>>2];f[ea+4>>2]=fa;ea=k;fa=f[ea+4>>2]|0;e=d+40|0;f[e>>2]=f[ea>>2];f[e+4>>2]=fa;f[d+48>>2]=f[b>>2];f[d+52>>2]=f[o>>2];f[d+56>>2]=f[i>>2];f[d+60>>2]=f[h>>2];e=1}else{_g(28628,28657);e=0}u=r;return e|0}function kz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var f=0.0,g=0.0,h=0,i=0,j=0,k=0,l=0,m=0,o=0;o=u;u=u+272|0;i=o+256|0;j=o+192|0;k=o+128|0;l=o+64|0;m=o;zi(i,-1.0,-1.0);g=+n[c>>2]-+n[b>>2];h=b+4|0;f=+n[c+4>>2]-+n[h>>2];if(Os(g,0.0,9.99999993922529e-09)|0){c=Os(f,0.0,9.99999993922529e-09)|0;f=c?0.0:f>0.0?1.570796251296997:-1.570796251296997}else f=+T(+f,+g);Kv(k,+n[b>>2]+ +n[e>>2]+ +n[i>>2],+n[h>>2]+ +n[e+4>>2]+ +n[i+4>>2]);Mv(l,f,0.0,0.0);Gv(j,k,l);Lv(m,d,d);Gv(a,j,m);u=o;return}function lz(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0;h=u;u=u+128|0;j=h+64|0;l=h;i=f[a>>2]|0;i=Td[f[(f[i>>2]|0)+8>>2]&255](i)|0;a=a+8|0;k=f[a>>2]|0;k=Td[f[(f[k>>2]|0)+16>>2]&255](k)|0;a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+20>>2]&255](a)|0;m=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;Gv(l,m,Td[f[(f[d>>2]|0)+12>>2]&255](d)|0);Gv(j,l,c);Hy(k);nz(k+48|0,j);oz(k+64|0,b);pz(k+80|0,12,0);qz(k+96|0,12,8);je[f[(f[i>>2]|0)+104>>2]&31](i,6,18,5121,0);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,18);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,22);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,26);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,30);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,34);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,38);rz(k);Hy(a+4|0);nz(a+52|0,j);j=a+68|0;sz(j,e);c=a+84|0;sz(c,+n[g+48>>2]);oz(a+100|0,b);d=a+116|0;tz(d,g);pz(a+132|0,12,0);je[f[(f[i>>2]|0)+104>>2]&31](i,6,6,5121,42);sz(c,+n[g+52>>2]);tz(d,g+8|0);je[f[(f[i>>2]|0)+104>>2]&31](i,6,6,5121,48);sz(c,+n[g+56>>2]);tz(d,g+16|0);je[f[(f[i>>2]|0)+104>>2]&31](i,6,6,5121,54);tz(d,g+32|0);je[f[(f[i>>2]|0)+104>>2]&31](i,6,6,5121,60);sz(j,-e);sz(c,+n[g+60>>2]);tz(d,g+24|0);je[f[(f[i>>2]|0)+104>>2]&31](i,6,6,5121,66);tz(d,g+40|0);je[f[(f[i>>2]|0)+104>>2]&31](i,6,6,5121,72);be[f[f[a>>2]>>2]&511](a);u=h;return}function mz(a,b){a=a|0;b=b|0;n[a>>2]=+(h[b>>0]|0)/255.0;n[a+4>>2]=+(h[b+1>>0]|0)/255.0;n[a+8>>2]=+(h[b+2>>0]|0)/255.0;n[a+12>>2]=1.0;return}function nz(a,b){a=a|0;b=b|0;var c=0,d=0;c=uz(a)|0;a=f[a+4>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;d=f[(f[a>>2]|0)+220>>2]|0;b=wz(b)|0;je[d&31](a,c,1,0,b);return}function oz(a,b){a=a|0;b=b|0;var c=0;c=uz(a)|0;a=f[a+4>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;ie[f[(f[a>>2]|0)+216>>2]&31](a,c,1,b);return}function pz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=f[a+4>>2]|0;d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;a=Xd[f[(f[d>>2]|0)+140>>2]&63](d,f[a>>2]|0,f[a+12>>2]|0)|0;ee[f[(f[d>>2]|0)+112>>2]&255](d,a);me[f[(f[d>>2]|0)+228>>2]&3](d,a,2,5126,0,b,0+c|0);return}function qz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=f[a+4>>2]|0;d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;a=Xd[f[(f[d>>2]|0)+140>>2]&63](d,f[a>>2]|0,f[a+12>>2]|0)|0;ee[f[(f[d>>2]|0)+112>>2]&255](d,a);me[f[(f[d>>2]|0)+228>>2]&3](d,a,1,5126,0,b,0+c|0);return}function rz(a){a=a|0;wy(a+80|0);vz(a+96|0);return}function sz(a,b){a=a|0;b=+b;var c=0;c=uz(a)|0;a=f[a+4>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;fe[f[(f[a>>2]|0)+208>>2]&7](a,c,b);return}function tz(a,b){a=a|0;b=b|0;var c=0;c=uz(a)|0;a=f[a+4>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;ie[f[(f[a>>2]|0)+212>>2]&31](a,c,1,b);return}function uz(a){a=a|0;var b=0;b=f[a+4>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;return Xd[f[(f[b>>2]|0)+168>>2]&63](b,f[a>>2]|0,f[a+12>>2]|0)|0}function vz(a){a=a|0;var b=0;b=f[a+4>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;a=Xd[f[(f[b>>2]|0)+140>>2]&63](b,f[a>>2]|0,f[a+12>>2]|0)|0;ee[f[(f[b>>2]|0)+100>>2]&255](b,a);return}function wz(a){a=a|0;return a|0}function xz(a,b){a=a|0;b=b|0;zi(a,+n[b>>2],-+n[b+4>>2]);return}function yz(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;g=+g;var h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0;h=u;u=u+48|0;k=h+32|0;j=h+24|0;q=h+16|0;r=h+8|0;i=h;Ez(a);Fz(k,b,d,c);Fz(j,c,d,b);p=b+4|0;l=k+4|0;zi(q,+n[b>>2]+ +n[k>>2]*e,+n[p>>2]+ +n[l>>2]*e);m=c+4|0;d=j+4|0;zi(r,+n[c>>2]+ +n[j>>2]*e,+n[m>>2]+ +n[d>>2]*e);Gz(i,q,k,r,j);r=i;q=f[r+4>>2]|0;o=a;f[o>>2]=f[r>>2];f[o+4>>2]=q;zi(i,+n[b>>2]-+n[k>>2]*g,+n[p>>2]-+n[l>>2]*g);p=i;o=f[p+4>>2]|0;b=a+8|0;f[b>>2]=f[p>>2];f[b+4>>2]=o;zi(i,+n[c>>2]-+n[j>>2]*g,+n[m>>2]-+n[d>>2]*g);m=i;c=f[m+4>>2]|0;b=a+48|0;f[b>>2]=f[m>>2];f[b+4>>2]=c;b=a+4|0;zi(i,+n[a>>2]-+n[k>>2]*e,+n[b>>2]-+n[l>>2]*e);c=i;m=f[c+4>>2]|0;o=a+16|0;f[o>>2]=f[c>>2];f[o+4>>2]=m;zi(i,+n[a>>2]-+n[j>>2]*e,+n[b>>2]-+n[d>>2]*e);o=i;m=f[o+4>>2]|0;c=a+32|0;f[c>>2]=f[o>>2];f[c+4>>2]=m;g=e+g;zi(i,+n[a>>2]-g*+n[k>>2],+n[b>>2]-g*+n[l>>2]);l=i;k=f[l+4>>2]|0;c=a+24|0;f[c>>2]=f[l>>2];f[c+4>>2]=k;zi(i,+n[a>>2]-g*+n[j>>2],+n[b>>2]-g*+n[d>>2]);b=i;c=f[b+4>>2]|0;d=a+40|0;f[d>>2]=f[b>>2];f[d+4>>2]=c;u=h;return}function zz(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;g=+g;var h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0;h=u;u=u+48|0;k=h+32|0;j=h+24|0;q=h+16|0;r=h+8|0;i=h;Ez(a);Fz(k,b,d,c);Fz(j,c,d,b);p=b+4|0;l=k+4|0;zi(q,+n[b>>2]+ +n[k>>2]*e,+n[p>>2]+ +n[l>>2]*e);m=c+4|0;d=j+4|0;zi(r,+n[c>>2]+ +n[j>>2]*e,+n[m>>2]+ +n[d>>2]*e);Gz(i,q,k,r,j);r=i;q=f[r+4>>2]|0;o=a;f[o>>2]=f[r>>2];f[o+4>>2]=q;zi(i,+n[b>>2]+ +n[k>>2]*g,+n[p>>2]+ +n[l>>2]*g);p=i;o=f[p+4>>2]|0;b=a+8|0;f[b>>2]=f[p>>2];f[b+4>>2]=o;zi(i,+n[c>>2]+ +n[j>>2]*g,+n[m>>2]+ +n[d>>2]*g);m=i;c=f[m+4>>2]|0;b=a+48|0;f[b>>2]=f[m>>2];f[b+4>>2]=c;b=a+4|0;zi(i,+n[a>>2]-+n[k>>2]*e,+n[b>>2]-+n[l>>2]*e);c=i;m=f[c+4>>2]|0;o=a+16|0;f[o>>2]=f[c>>2];f[o+4>>2]=m;zi(i,+n[a>>2]-+n[j>>2]*e,+n[b>>2]-+n[d>>2]*e);o=i;m=f[o+4>>2]|0;c=a+32|0;f[c>>2]=f[o>>2];f[c+4>>2]=m;g=e-g;zi(i,+n[a>>2]-g*+n[k>>2],+n[b>>2]-g*+n[l>>2]);l=i;k=f[l+4>>2]|0;c=a+24|0;f[c>>2]=f[l>>2];f[c+4>>2]=k;zi(i,+n[a>>2]-g*+n[j>>2],+n[b>>2]-g*+n[d>>2]);b=i;c=f[b+4>>2]|0;d=a+40|0;f[d>>2]=f[b>>2];f[d+4>>2]=c;u=h;return}function Az(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0;if(f[a>>2]|0){if(!(az(a)|0))bz(a);if(Bz(a)|0){g=f[a>>2]|0;g=Td[f[(f[g>>2]|0)+8>>2]&255](g)|0;je[f[(f[g>>2]|0)+40>>2]&31](g,34962,c,d,e);e=Cz(a,28678)|0;b[a+14>>0]=e&1;a=e}else a=0}else a=0;return a|0}function Bz(a){a=a|0;var b=0;b=f[a>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;he[f[(f[b>>2]|0)+20>>2]&63](b,34962,f[a+8>>2]|0);return Cz(a,28720)|0}function Cz(a,b){a=a|0;b=b|0;var c=0,d=0;c=f[a>>2]|0;c=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;c=Td[f[(f[c>>2]|0)+144>>2]&255](c)|0;d=1;while(1){if(!c)break;Dz(28692,28702,b,28711,c);d=f[a>>2]|0;d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;c=Td[f[(f[d>>2]|0)+144>>2]&255](d)|0;d=0}return d|0}function Dz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function Ez(a){a=a|0;fj(a);fj(a+8|0);fj(a+16|0);fj(a+24|0);fj(a+32|0);fj(a+40|0);fj(a+48|0);return}function Fz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0;g=u;u=u+32|0;i=g+16|0;h=g+8|0;e=g;Ov(i,c,b);Cv(h,i);Bv(a,h);Ov(h,d,b);if(+Av(a,h)<0.0){Dv(e,a);h=f[e+4>>2]|0;i=a;f[i>>2]=f[e>>2];f[i+4>>2]=h}u=g;return}function Gz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;j=+n[c>>2];k=+n[c+4>>2];g=j*+n[b>>2]+k*+n[b+4>>2];h=+n[e>>2];l=+n[e+4>>2];i=h*+n[d>>2]+l*+n[d+4>>2];f=j*l-k*h;zi(a,(g*l-k*i)/f,(j*i-h*g)/f);return}function Hz(a){a=a|0;if(((f[a>>2]|0)!=0?(b[a+14>>0]|0)!=0:0)?$y(a)|0:0)a=Jz(a)|0;else a=0;return a|0}function Iz(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0;if(f[a>>2]|0){if(!($y(a)|0))cz(a);if(Jz(a)|0){g=f[a>>2]|0;g=Td[f[(f[g>>2]|0)+8>>2]&255](g)|0;je[f[(f[g>>2]|0)+40>>2]&31](g,34963,c,d,e);e=Kz(a,28678)|0;b[a+14>>0]=e&1;a=e}else a=0}else a=0;return a|0}function Jz(a){a=a|0;var b=0;b=f[a>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;he[f[(f[b>>2]|0)+20>>2]&63](b,34963,f[a+8>>2]|0);return Kz(a,28720)|0}function Kz(a,b){a=a|0;b=b|0;var c=0,d=0;c=f[a>>2]|0;c=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;c=Td[f[(f[c>>2]|0)+144>>2]&255](c)|0;d=1;while(1){if(!c)break;Dz(28692,28702,b,28711,c);d=f[a>>2]|0;d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;c=Td[f[(f[d>>2]|0)+144>>2]&255](d)|0;d=0}return d|0}function Lz(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,k=0,l=0,m=0,o=0,p=0,q=0;q=u;u=u+240|0;k=q+192|0;l=q+128|0;m=q+232|0;o=q+64|0;p=q;h=d+28|0;i=d+36|0;if(Rv(h,i)|0)a=0;else{ez(k,0,h,i,+n[d+20>>2]);do if(Mz(a)|0)if(Nz(a,k)|0){kz(l,h,i,+n[k+36>>2],e);f[o>>2]=j[g>>1]|j[g+2>>1]<<16;b[o+4>>0]=0;uF(m,o);k=f[a+8>>2]|0;k=Td[f[(f[k>>2]|0)+16>>2]&255](k)|0;Hy(k);g=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;Gv(p,g,Td[f[(f[c>>2]|0)+12>>2]&255](c)|0);Gv(o,p,l);nz(k+48|0,o);Oz(o,m);oz(k+64|0,o);pz(k+80|0,12,0);qz(k+96|0,12,8);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,6,7,5121,0);rz(k);a=1;break}else{_g(28812,28879);a=0;break}else{_g(28812,28845);a=0}while(0)}u=q;return a|0}function Mz(a){a=a|0;var c=0,d=0;d=u;u=u+16|0;c=d;a=a+32|0;if(Hz(a)|0)a=1;else{b[c>>0]=b[28904]|0;b[c+1>>0]=b[28905]|0;b[c+2>>0]=b[28906]|0;b[c+3>>0]=b[28907]|0;b[c+4>>0]=b[28908]|0;b[c+5>>0]=b[28909]|0;b[c+6>>0]=b[28910]|0;a=Iz(a,7,c,35044)|0}u=d;return a|0}function Nz(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0.0,p=0,q=0,r=0;c=u;u=u+144|0;j=c+136|0;i=c+128|0;k=c+120|0;h=c+112|0;l=c+104|0;g=c+96|0;m=c+88|0;d=c;r=b+32|0;q=b+16|0;o=+n[r>>2]-+n[q>>2];zi(j,0.0,+n[b>>2]);xz(i,j);p=b+4|0;zi(k,o,+n[p>>2]);xz(h,k);e=b+8|0;zi(l,+n[k>>2]-+n[b+20>>2],+n[k+4>>2]+ +n[e>>2]);xz(g,l);o=+n[b+12>>2];zi(m,+n[r>>2]+ +n[q>>2]*o/(+n[p>>2]+ +n[e>>2]-o),0.0);e=f[m+4>>2]|0;b=d;f[b>>2]=f[m>>2];f[b+4>>2]=e;n[d+8>>2]=1.0;b=f[l+4>>2]|0;e=d+12|0;f[e>>2]=f[l>>2];f[e+4>>2]=b;n[d+20>>2]=1.0;e=f[k+4>>2]|0;b=d+24|0;f[b>>2]=f[k>>2];f[b+4>>2]=e;n[d+32>>2]=1.0;b=f[j+4>>2]|0;e=d+36|0;f[e>>2]=f[j>>2];f[e+4>>2]=b;n[d+44>>2]=1.0;e=f[i+4>>2]|0;b=d+48|0;f[b>>2]=f[i>>2];f[b+4>>2]=e;n[d+56>>2]=1.0;b=f[h+4>>2]|0;e=d+60|0;f[e>>2]=f[h>>2];f[e+4>>2]=b;n[d+68>>2]=1.0;e=f[g+4>>2]|0;b=d+72|0;f[b>>2]=f[g>>2];f[b+4>>2]=e;n[d+80>>2]=1.0;b=Az(a+64|0,84,d,35044)|0;u=c;return b|0}function Oz(a,b){a=a|0;b=b|0;Pz(a,+(h[b>>0]|0)/255.0,+(h[b+1>>0]|0)/255.0,+(h[b+2>>0]|0)/255.0,+(h[b+3>>0]|0)/255.0);return}function Pz(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;b=+Qz(b);n[a>>2]=b;c=+Qz(c);n[a+4>>2]=c;d=+Qz(d);n[a+8>>2]=d;e=+Qz(e);n[a+12>>2]=e;return}function Qz(a){a=+a;return +(a<0.0?0.0:a>1.0?1.0:a)}function Rz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;f[a>>2]=f[b>>2];e=f[b+4>>2]|0;f[a+4>>2]=e;if(e|0)SY(e);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);f[a+16>>2]=f[d>>2];c=f[d+4>>2]|0;f[a+20>>2]=c;if(c|0)SY(c);Xy(a+24|0,b);Wy(a+40|0,b);return}function Sz(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function Tz(a){a=a|0;do if(f[a>>2]|0){if(!(f[a+8>>2]|0)){_g(28911,30550);a=0;break}if(!(f[a+16>>2]|0)){_g(28911,28933);a=0}else a=1}else{_g(28911,31562);a=0}while(0);return a|0}function Uz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;n=u;u=u+256|0;m=n+240|0;e=n+224|0;g=n+144|0;l=n+160|0;h=n+80|0;i=n+16|0;j=n;k=c+16|0;o=f[a+16>>2]|0;he[f[(f[o>>2]|0)+16>>2]&63](m,o,k);c=c+28|0;f[e>>2]=f[c>>2];f[e+4>>2]=f[c+4>>2];f[e+8>>2]=f[c+8>>2];f[e+12>>2]=f[c+12>>2];do if(!(f[m>>2]|0)){iZ(g,k);Vz(28961,28988,g,29e3);jZ(g);b=0}else{if(!(Os(+Tu(e),0.0,9.99999993922529e-09)|0)?!(Os(+Uu(e),0.0,9.99999993922529e-09)|0):0){o=f[m>>2]|0;if(Td[f[(f[o>>2]|0)+8>>2]&255](o)|0?(o=f[m>>2]|0,Td[f[(f[o>>2]|0)+12>>2]&255](o)|0):0){o=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;Gv(h,o,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);Wz(i,0,f[m>>2]|0,e);Gv(l,h,i);a:do if(Xz(a)|0){je[f[(f[d>>2]|0)+8>>2]&31](d,770,771,1,1);b=f[m>>2]|0;b=Td[f[(f[b>>2]|0)+16>>2]&255](b)|0;c=f[b+4>>2]|0;b=f[b>>2]|0;while(1){if((b|0)==(c|0)){b=1;break a}d=f[b>>2]|0;if(!d){iZ(j,k);Vz(28961,29100,j,29126);jZ(j)}else Yz(a,d,l);b=b+8|0}}else{_g(28961,30815);b=0}while(0);break}_g(28961,29057);b=0;break}_g(28961,29014);b=0}while(0);ux(m);u=n;return b|0}function Vz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return}function Wz(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0,g=0.0,h=0,i=0;i=u;u=u+128|0;b=i+64|0;h=i;g=+Ik(d);Kv(a,g,+Jk(d));g=+Tu(d);g=g/+((Td[f[(f[c>>2]|0)+8>>2]&255](c)|0)>>>0);e=+Uu(d);e=e/+((Td[f[(f[c>>2]|0)+12>>2]&255](c)|0)>>>0);if(!(Os(g,1.0,9.99999993922529e-09)|0?Os(e,1.0,9.99999993922529e-09)|0:0)){Lv(h,g,e);Gv(b,a,h);c=a+64|0;do{f[a>>2]=f[b>>2];a=a+4|0;b=b+4|0}while((a|0)<(c|0))}u=i;return}function Xz(a){a=a|0;var b=0,c=0;b=u;u=u+16|0;c=b;f[c>>2]=50462976;a=Iz(a+40|0,4,c,35044)|0;u=b;return a|0}function Yz(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,o=0.0,p=0;e=u;u=u+64|0;d=e;p=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;l=+(f[p>>2]|0);o=-+(f[p+4>>2]|0);j=l+ +(f[p+8>>2]|0);i=o-+(f[p+12>>2]|0);k=+n[p+16>>2];m=+n[p+20>>2];h=+n[p+24>>2];g=+n[p+28>>2];zi(d,l,o);zi(d+8|0,k,m);zi(d+16|0,j,o);zi(d+24|0,h,m);zi(d+32|0,l,i);zi(d+40|0,k,g);zi(d+48|0,j,i);zi(d+56|0,h,g);do if(Az(a+24|0,64,d,35044)|0){d=f[a+8>>2]|0;d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;Hy(d);if(Td[f[(f[b>>2]|0)+12>>2]&255](b)|0){nz(d+48|0,c);pz(d+64|0,16,0);pz(d+80|0,16,8);p=f[a>>2]|0;p=Td[f[(f[p>>2]|0)+8>>2]&255](p)|0;je[f[(f[p>>2]|0)+104>>2]&31](p,5,4,5121,0);Zz(d);break}else{_g(29151,29212);break}}else _g(29151,29182);while(0);u=e;return}function Zz(a){a=a|0;wy(a+64|0);wy(a+80|0);return}function _z(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);Wy(a+16|0,b);Xy(a+32|0,b);return}function $z(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(29244,30550);a=0}else a=1;else{_g(29244,31562);a=0}return a|0}function aA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0.0;j=u;u=u+112|0;e=j+88|0;g=j+72|0;h=j+8|0;i=j;if(bA(a)|0){zi(g,0.0,0.0);k=Td[f[(f[b>>2]|0)+16>>2]&255](b)|0;l=+((f[k>>2]|0)>>>0);k=(Td[f[(f[b>>2]|0)+16>>2]&255](b)|0)+4|0;zi(h,l,+((f[k>>2]|0)>>>0));Uv(e,g,h);zi(h,0.0,0.0);zi(i,1.0,1.0);Uv(g,h,i);if(cA(a,e,g)|0){Iv(h);zi(i,1.0,0.0);dA(a,h,i,b,c,d);a=1}else{_g(29264,30941);a=0}}else{_g(29264,30815);a=0}u=j;return a|0}function bA(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+16|0;if(Hz(a)|0)a=1;else{f[b>>2]=50462976;a=Iz(a,4,b,35044)|0}u=c;return a|0}function cA(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0.0;d=u;u=u+64|0;e=d;f=+Ik(b);zi(e,f,+Jk(b));f=+Ik(c);zi(e+8|0,f,+Jk(c));f=+Ik(b);zi(e+16|0,f,+Hk(b));f=+Ik(c);zi(e+24|0,f,+Hk(c));f=+Gk(b);zi(e+32|0,f,+Jk(b));f=+Gk(c);zi(e+40|0,f,+Jk(c));f=+Gk(b);zi(e+48|0,f,+Hk(b));f=+Gk(c);zi(e+56|0,f,+Hk(c));c=Az(a+32|0,64,e,35044)|0;u=d;return c|0}function dA(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0.0,l=0.0;h=u;u=u+16|0;j=h;i=f[a+8>>2]|0;i=Td[f[(f[i>>2]|0)+12>>2]&255](i)|0;Hy(i);be[f[(f[e>>2]|0)+8>>2]&511](e);k=+eA(0,d);e=Td[f[(f[d>>2]|0)+16>>2]&255](d)|0;l=+((f[e>>2]|0)>>>0);e=(Td[f[(f[d>>2]|0)+16>>2]&255](d)|0)+4|0;zi(j,l,+((f[e>>2]|0)>>>0));nz(i+48|0,Td[f[(f[d>>2]|0)+8>>2]&255](d)|0);nz(i+64|0,b);sz(i+80|0,k);tz(i+96|0,c);tz(i+112|0,j);pz(i+128|0,16,0);pz(i+144|0,16,8);je[f[(f[g>>2]|0)+8>>2]&31](g,1,0,1,0);g=f[a>>2]|0;g=Td[f[(f[g>>2]|0)+8>>2]&255](g)|0;je[f[(f[g>>2]|0)+104>>2]&31](g,5,4,5121,0);fA(i);u=h;return}function eA(a,b){a=a|0;b=b|0;var c=0.0;c=+Qd[f[(f[b>>2]|0)+20>>2]&7](b)*10.0;c=c<4.0?4.0:c;return +(c>40.0?40.0:c)}function fA(a){a=a|0;wy(a+128|0);wy(a+144|0);return}function gA(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0;k=u;u=u+48|0;h=k+24|0;i=k+8|0;j=k;_v(h,c+16|0,e);do if(Xv(h)|0)a=1;else{if(!(bA(a)|0)){_g(29292,30815);a=0;break}hA(i,0,b,h);if(cA(a,h,i)|0){zi(j,0.0,1.0);dA(a,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0,j,b,d,g);a=1}else{_g(29292,30941);a=0}}while(0);u=k;return a|0}function hA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0.0;b=u;u=u+32|0;i=b+24|0;h=b+16|0;g=b+8|0;e=b;j=f[(f[c>>2]|0)+28>>2]|0;k=+Ik(d);zi(h,k,+Hk(d));he[j&63](i,c,h);j=f[(f[c>>2]|0)+28>>2]|0;k=+Gk(d);zi(g,k,+Jk(d));he[j&63](h,c,g);zi(g,+n[i>>2],1.0-+n[i+4>>2]);zi(e,+n[h>>2],1.0-+n[h+4>>2]);Uv(a,g,e);u=b;return}function iA(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);d=a+16|0;f[d>>2]=0;f[d+4>>2]=0;f[d+8>>2]=0;f[d+12>>2]=0;n[a+32>>2]=1.0;Wy(a+36|0,b);Xy(a+52|0,b);Wy(a+68|0,b);Xy(a+84|0,b);return}function jA(a){a=a|0;kA(a);return}function kA(a){a=a|0;var b=0;lA(a,f[a+8>>2]|0);b=f[a>>2]|0;f[a>>2]=0;if(b|0)$Y(b);return}function lA(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=f[b>>2]|0;mA(b+8|0);$Y(b);b=a}return}function mA(a){a=a|0;nA(a+12|0);jZ(a);return}function nA(a){a=a|0;oA(a);return}function oA(a){a=a|0;var b=0,c=0,d=0;c=f[a>>2]|0;if(c|0){a=a+4|0;b=f[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-28|0;f[a>>2]=d;b=d}$Y(c)}return}function pA(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(29315,29336);a=0}else a=1;else{_g(29315,31562);a=0}return a|0}function qA(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0;l=u;u=u+192|0;i=l+128|0;j=l+64|0;k=l;h=rA(a,d)|0;if(!h){_g(29357,29382);h=0}else{h=h+20|0;dB(h,d);h=sA(h)|0;je[f[(f[g>>2]|0)+8>>2]&31](g,770,771,1,1);Kv(i,+n[e>>2],+n[e+4>>2]);if(b[d+24>>0]|0){Kv(k,0.0,-1.0);Gv(j,k,i);tA(a,d,h,c,j,7428)|0}mz(j,d+16|0);h=tA(a,d,h,c,i,j)|0}u=l;return h|0}function rA(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0.0,i=0.0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;D=u;u=u+128|0;y=D+104|0;C=D+64|0;A=D+12|0;B=D;z=a+16|0;x=QA(z,c)|0;d=x;if(!x){cB(C);iZ(A,c);RA(A+12|0,C);x=xx(a+28|0,A)|0;t=a+20|0;j=f[t>>2]|0;v=(j|0)==0;a:do if(!v){o=j+-1|0;p=(o&j|0)==0;if(!p)if(x>>>0<j>>>0)q=x;else q=(x>>>0)%(j>>>0)|0;else q=o&x;d=f[(f[z>>2]|0)+(q<<2)>>2]|0;if(!d){d=q;w=23}else{r=A+11|0;s=A+4|0;b:while(1){d=f[d>>2]|0;if(!d){d=q;w=23;break a}e=f[d+4>>2]|0;if((e|0)!=(x|0)){if(!p){if(e>>>0>=j>>>0)e=(e>>>0)%(j>>>0)|0}else e=e&o;if((e|0)!=(q|0)){d=q;w=23;break a}}g=d+8|0;e=b[g+11>>0]|0;l=e<<24>>24<0;e=e&255;m=l?f[d+12>>2]|0:e;E=b[r>>0]|0;k=E<<24>>24<0;if((m|0)!=((k?f[s>>2]|0:E&255)|0))continue;k=k?f[A>>2]|0:A;if(l)if(!(yp(f[g>>2]|0,k,m)|0)){e=1;break}else continue;while(1){if(!e){e=1;break a}if((b[g>>0]|0)!=(b[k>>0]|0))continue b;k=k+1|0;g=g+1|0;e=e+-1|0}}}}else{d=0;w=23}while(0);if((w|0)==23){SA(y,z,x,A);k=a+28|0;h=+(((f[k>>2]|0)+1|0)>>>0);i=+n[a+32>>2];do if(v|i*+(j>>>0)<h){d=j<<1|(j>>>0<3|(j+-1&j|0)!=0)&1;e=~~+W(+(h/i))>>>0;TA(z,d>>>0<e>>>0?e:d);d=f[t>>2]|0;e=d+-1|0;if(!(e&d)){j=d;d=e&x;break}if(x>>>0<d>>>0){j=d;d=x}else{j=d;d=(x>>>0)%(d>>>0)|0}}while(0);e=f[(f[z>>2]|0)+(d<<2)>>2]|0;if(!e){g=a+24|0;f[f[y>>2]>>2]=f[g>>2];f[g>>2]=f[y>>2];f[(f[z>>2]|0)+(d<<2)>>2]=g;g=f[y>>2]|0;d=f[g>>2]|0;if(!d)d=y;else{d=f[d+4>>2]|0;e=j+-1|0;if(e&j){if(d>>>0>=j>>>0)d=(d>>>0)%(j>>>0)|0}else d=d&e;f[(f[z>>2]|0)+(d<<2)>>2]=g;d=y}}else{f[f[y>>2]>>2]=f[e>>2];f[e>>2]=f[y>>2];d=y}E=f[d>>2]|0;f[k>>2]=(f[k>>2]|0)+1;f[d>>2]=0;e=0;d=E}UA(A);if(e){iZ(B,c);vx(29480,29508,B);jZ(B);d=0}nA(C)}u=D;return d|0}function sA(a){a=a|0;return a|0}function tA(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0;k=u;u=u+48|0;h=k+36|0;i=k+32|0;j=k;if((f[b+28>>2]|0)==(f[b+32>>2]|0))a=0;else if(uA(a,b,c,d,e,g,1,h,i)|0){vA(j,b,c);wA(a,j,j+8|0,+n[h>>2],d,e,g)|0;wA(a,j+16|0,j+24|0,+n[i>>2],d,e,g)|0;a=1}else a=0;u=k;return a|0}function uA(a,b,c,d,e,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0.0,l=0.0,m=0.0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0;v=u;u=u+144|0;t=v+72|0;r=v+8|0;s=v;b=b+20|0;f[i>>2]=f[b>>2];f[j>>2]=f[b>>2];p=c+4|0;do if((f[c>>2]|0)==(f[p>>2]|0))b=0;else{if(!(AA(a)|0)){_g(29458,30815);b=0;break}if(!(BA(a)|0)){_g(29458,30941);b=0;break}q=f[a>>2]|0;q=Td[f[(f[q>>2]|0)+8>>2]&255](q)|0;k=+gz(d,1.0);o=f[a+8>>2]|0;o=Td[f[(f[o>>2]|0)+24>>2]&255](o)|0;Hy(o);a=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;Gv(r,a,Td[f[(f[d>>2]|0)+12>>2]&255](d)|0);Gv(t,r,e);nz(o+48|0,t);sz(o+112|0,k);oz(o+160|0,g);qz(o+176|0,12,0);qz(o+192|0,12,4);qz(o+208|0,12,8);m=+n[b>>2];m=h?m:k+m;b=f[c>>2]|0;k=+n[b+24>>2];n[i>>2]=k*m;a=o+64|0;d=o+80|0;e=o+96|0;g=o+128|0;c=o+144|0;while(1){if((b|0)==(f[p>>2]|0))break;x=b;w=f[x+4>>2]|0;i=t;f[i>>2]=f[x>>2];f[i+4>>2]=w;i=b+8|0;w=f[i+4>>2]|0;x=r;f[x>>2]=f[i>>2];f[x+4>>2]=w;x=b+16|0;w=f[x+4>>2]|0;i=s;f[i>>2]=f[x>>2];f[i+4>>2]=w;tz(a,t);tz(d,r);tz(e,s);if((b|0)==((f[p>>2]|0)+-28|0))l=k;else l=+n[b+24>>2];sz(g,m*k);sz(c,m*l);je[f[(f[q>>2]|0)+104>>2]&31](q,5,34,5121,0);if(h){je[f[(f[q>>2]|0)+104>>2]&31](q,5,34,5121,34);je[f[(f[q>>2]|0)+104>>2]&31](q,5,34,5121,68)}k=l;b=b+28|0}n[j>>2]=m*k;CA(o);b=1}while(0);u=v;return b|0}function vA(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+16|0;d=h;e=h+8|0;zA(a);g=f[c>>2]|0;c=f[c+4>>2]|0;if((g|0)==(c|0)){e=f[b+28>>2]|0;c=e;b=f[c+4>>2]|0;g=a;f[g>>2]=f[c>>2];f[g+4>>2]=b;g=f[e+4>>2]|0;b=a+16|0;f[b>>2]=f[e>>2];f[b+4>>2]=g;zi(d,1.0,0.0);b=d;g=f[b+4>>2]|0;e=a+8|0;f[e>>2]=f[b>>2];f[e+4>>2]=g;zi(d,-1.0,0.0);e=f[d+4>>2]|0;g=a+24|0;f[g>>2]=f[d>>2];f[g+4>>2]=e}else{i=g;k=f[i+4>>2]|0;b=a;f[b>>2]=f[i>>2];f[b+4>>2]=k;b=c+-12|0;k=b;i=f[k+4>>2]|0;j=a+16|0;f[j>>2]=f[k>>2];f[j+4>>2]=i;Ov(e,g,g+8|0);Bv(d,e);j=d;i=f[j+4>>2]|0;g=a+8|0;f[g>>2]=f[j>>2];f[g+4>>2]=i;Ov(e,b,c+-20|0);Bv(d,e);e=f[d+4>>2]|0;g=a+24|0;f[g>>2]=f[d>>2];f[g+4>>2]=e}u=h;return}function wA(a,b,c,d,e,g,h){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;g=g|0;h=h|0;var i=0.0,j=0,k=0,l=0,m=0;m=u;u=u+144|0;j=m+128|0;k=m+64|0;l=m;if(xA(a)|0){d=d*.5;i=+gz(e,1.0);Cv(j,c);if(yA(a,b,j,c,d+i)|0){j=f[a+8>>2]|0;j=Td[f[(f[j>>2]|0)+20>>2]&255](j)|0;Hy(j+4|0);c=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;Gv(l,c,Td[f[(f[e>>2]|0)+12>>2]&255](e)|0);Gv(k,l,g);nz(j+52|0,k);sz(j+68|0,i);sz(j+84|0,d);oz(j+100|0,h);tz(j+116|0,b);pz(j+132|0,12,0);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);be[f[f[j>>2]>>2]&511](j);a=1}else{_g(29425,30941);a=0}}else{_g(29425,30815);a=0}u=m;return a|0}function xA(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+68|0;if(Hz(a)|0)a=1;else{f[b>>2]=50462976;a=Iz(a,4,b,35044)|0}u=c;return a|0}function yA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;g=u;u=u+96|0;l=g+72|0;k=g+64|0;j=g+56|0;i=g+48|0;h=g;m=g+80|0;Qv(k,c,e);Nv(l,b,k);Nv(i,c,d);Qv(j,i,e);Nv(k,b,j);Qv(i,c,e);Ov(j,b,i);Ov(m,d,c);Qv(h,m,e);Nv(i,b,h);d=l;c=f[d+4>>2]|0;b=h;f[b>>2]=f[d>>2];f[b+4>>2]=c;n[h+8>>2]=1.0;b=k;c=f[b+4>>2]|0;d=h+12|0;f[d>>2]=f[b>>2];f[d+4>>2]=c;n[h+20>>2]=1.0;d=j;c=f[d+4>>2]|0;b=h+24|0;f[b>>2]=f[d>>2];f[b+4>>2]=c;n[h+32>>2]=1.0;b=i;c=f[b+4>>2]|0;d=h+36|0;f[d>>2]=f[b>>2];f[d+4>>2]=c;n[h+44>>2]=1.0;d=Az(a+84|0,48,h,35044)|0;u=g;return d|0}function zA(a){a=a|0;fj(a);fj(a+8|0);fj(a+16|0);fj(a+24|0);return}function AA(a){a=a|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;l=u;u=u+16|0;j=l;k=l+12|0;g=a+36|0;if(Hz(g)|0)a=1;else{f[j>>2]=0;h=j+4|0;f[h>>2]=0;f[j+8>>2]=0;i=j+8|0;e=0;while(1){if((e|0)>=17){e=0;break}d=e<<2;a=d&255;b[k>>0]=a;c=f[h>>2]|0;if(c>>>0<(f[i>>2]|0)>>>0){b[c>>0]=a;c=(f[h>>2]|0)+1|0;f[h>>2]=c}else{KA(j,k);c=f[h>>2]|0}a=(d|2)&255;b[k>>0]=a;if(c>>>0<(f[i>>2]|0)>>>0){b[c>>0]=a;f[h>>2]=(f[h>>2]|0)+1}else KA(j,k);e=e+1|0}while(1){if((e|0)>=17){e=0;break}d=e<<2;a=d&255;b[k>>0]=a;c=f[h>>2]|0;if(c>>>0<(f[i>>2]|0)>>>0){b[c>>0]=a;c=(f[h>>2]|0)+1|0;f[h>>2]=c}else{KA(j,k);c=f[h>>2]|0}a=(d|1)&255;b[k>>0]=a;if(c>>>0<(f[i>>2]|0)>>>0){b[c>>0]=a;f[h>>2]=(f[h>>2]|0)+1}else KA(j,k);e=e+1|0}while(1){if((e|0)>=17)break;d=e<<2;a=(d|2)&255;b[k>>0]=a;c=f[h>>2]|0;if(c>>>0<(f[i>>2]|0)>>>0){b[c>>0]=a;c=(f[h>>2]|0)+1|0;f[h>>2]=c}else{KA(j,k);c=f[h>>2]|0}a=(d|3)&255;b[k>>0]=a;if(c>>>0<(f[i>>2]|0)>>>0){b[c>>0]=a;f[h>>2]=(f[h>>2]|0)+1}else KA(j,k);e=e+1|0}a=f[j>>2]|0;a=Iz(g,(f[h>>2]|0)-a|0,a,35044)|0;LA(j)}u=l;return a|0}function BA(a){a=a|0;var b=0.0,c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0;r=u;u=u+32|0;p=r+12|0;q=r;j=a+52|0;if(DA(j)|0)a=1;else{f[p>>2]=0;k=p+4|0;f[k>>2]=0;f[p+8>>2]=0;l=q+4|0;m=q+8|0;o=p+8|0;c=q+4|0;d=q+8|0;e=q+4|0;g=q+8|0;h=q+4|0;i=q+8|0;b=0.0;while(1){if(!(b<=1.03125))break;n[q>>2]=b;n[l>>2]=1.0;n[m>>2]=0.0;a=f[k>>2]|0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[q>>2];f[a+4>>2]=f[q+4>>2];f[a+8>>2]=f[q+8>>2];a=(f[k>>2]|0)+12|0;f[k>>2]=a}else{EA(p,q);a=f[k>>2]|0}n[q>>2]=b;n[c>>2]=1.0;n[d>>2]=1.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[q>>2];f[a+4>>2]=f[q+4>>2];f[a+8>>2]=f[q+8>>2];a=(f[k>>2]|0)+12|0;f[k>>2]=a}else{EA(p,q);a=f[k>>2]|0}n[q>>2]=b;n[e>>2]=-1.0;n[g>>2]=0.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[q>>2];f[a+4>>2]=f[q+4>>2];f[a+8>>2]=f[q+8>>2];a=(f[k>>2]|0)+12|0;f[k>>2]=a}else{EA(p,q);a=f[k>>2]|0}n[q>>2]=b;n[h>>2]=-1.0;n[i>>2]=1.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[q>>2];f[a+4>>2]=f[q+4>>2];f[a+8>>2]=f[q+8>>2];f[k>>2]=(f[k>>2]|0)+12}else EA(p,q);b=b+.0625}a=f[p>>2]|0;a=Az(j,(f[k>>2]|0)-a|0,a,35044)|0;FA(p)}u=r;return a|0}function CA(a){a=a|0;vz(a+176|0);vz(a+192|0);vz(a+208|0);return}function DA(a){a=a|0;if(((f[a>>2]|0)!=0?(b[a+14>>0]|0)!=0:0)?az(a)|0:0)a=Bz(a)|0;else a=0;return a|0}function EA(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;c=h;d=a+4|0;e=(((f[d>>2]|0)-(f[a>>2]|0)|0)/12|0)+1|0;g=GA(a)|0;if(g>>>0<e>>>0)MY(a);else{i=f[a>>2]|0;k=((f[a+8>>2]|0)-i|0)/12|0;j=k<<1;HA(c,k>>>0<g>>>1>>>0?(j>>>0<e>>>0?e:j):g,((f[d>>2]|0)-i|0)/12|0,a+8|0);g=c+8|0;e=f[g>>2]|0;f[e>>2]=f[b>>2];f[e+4>>2]=f[b+4>>2];f[e+8>>2]=f[b+8>>2];f[g>>2]=(f[g>>2]|0)+12;IA(a,c);JA(c);u=h;return}}function FA(a){a=a|0;var b=0,c=0,d=0;c=f[a>>2]|0;if(c|0){a=a+4|0;b=f[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-12|0;f[a>>2]=d;b=d}$Y(c)}return}function GA(a){a=a|0;return 357913941}function HA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>357913941){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b*12|0)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c*12|0)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b*12|0);return}function IA(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[a>>2]|0;h=a+4|0;g=b+4|0;e=(f[h>>2]|0)-d|0;c=(f[g>>2]|0)+(((e|0)/-12|0)*12|0)|0;f[g>>2]=c;if((e|0)>0){K_(c|0,d|0,e|0)|0;d=g;c=f[g>>2]|0}else d=g;g=f[a>>2]|0;f[a>>2]=c;f[d>>2]=g;g=b+8|0;e=f[h>>2]|0;f[h>>2]=f[g>>2];f[g>>2]=e;g=a+8|0;h=b+12|0;a=f[g>>2]|0;f[g>>2]=f[h>>2];f[h>>2]=a;f[b>>2]=f[d>>2];return}function JA(a){a=a|0;var b=0,c=0,d=0,e=0;b=f[a+4>>2]|0;c=a+8|0;d=f[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-12|0;f[c>>2]=e;d=e}a=f[a>>2]|0;if(a|0)$Y(a);return}function KA(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;i=u;u=u+32|0;d=i;e=a+4|0;g=(f[e>>2]|0)-(f[a>>2]|0)+1|0;h=MA(a)|0;if(h>>>0<g>>>0)MY(a);else{j=f[a>>2]|0;l=(f[a+8>>2]|0)-j|0;k=l<<1;NA(d,l>>>0<h>>>1>>>0?(k>>>0<g>>>0?g:k):h,(f[e>>2]|0)-j|0,a+8|0);h=d+8|0;b[f[h>>2]>>0]=b[c>>0]|0;f[h>>2]=(f[h>>2]|0)+1;OA(a,d);PA(d);u=i;return}}function LA(a){a=a|0;var b=0,c=0,d=0;c=f[a>>2]|0;if(c|0){a=a+4|0;b=f[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-1|0;f[a>>2]=d;b=d}$Y(c)}return}function MA(a){a=a|0;return 2147483647}function NA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;if(!b)d=0;else d=XY(b)|0;f[a>>2]=d;c=d+c|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+b;return}function OA(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[a>>2]|0;h=a+4|0;g=b+4|0;e=(f[h>>2]|0)-d|0;c=(f[g>>2]|0)+(0-e)|0;f[g>>2]=c;if((e|0)>0){K_(c|0,d|0,e|0)|0;d=g;c=f[g>>2]|0}else d=g;g=f[a>>2]|0;f[a>>2]=c;f[d>>2]=g;g=b+8|0;e=f[h>>2]|0;f[h>>2]=f[g>>2];f[g>>2]=e;g=a+8|0;h=b+12|0;a=f[g>>2]|0;f[g>>2]=f[h>>2];f[h>>2]=a;f[b>>2]=f[d>>2];return}function PA(a){a=a|0;var b=0,c=0,d=0,e=0;b=f[a+4>>2]|0;c=a+8|0;d=f[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-1|0;f[c>>2]=e;d=e}$Y(f[a>>2]|0);return}function QA(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;m=xx(a+12|0,c)|0;n=f[a+4>>2]|0;a:do if(n){o=n+-1|0;p=(o&n|0)==0;if(!p)if(m>>>0<n>>>0)l=m;else l=(m>>>0)%(n>>>0)|0;else l=o&m;a=f[(f[a>>2]|0)+(l<<2)>>2]|0;if(a){j=c+11|0;k=c+4|0;b:while(1){a=f[a>>2]|0;if(!a){a=0;break a}d=f[a+4>>2]|0;if((d|0)!=(m|0)){if(!p){if(d>>>0>=n>>>0)d=(d>>>0)%(n>>>0)|0}else d=d&o;if((d|0)==(l|0))continue;else{a=0;break}}e=a+8|0;d=b[e+11>>0]|0;h=d<<24>>24<0;d=d&255;i=h?f[a+12>>2]|0:d;q=b[j>>0]|0;g=q<<24>>24<0;if((i|0)!=((g?f[k>>2]|0:q&255)|0))continue;g=g?f[c>>2]|0:c;if(h)if(!(yp(f[e>>2]|0,g,i)|0))break;else continue;while(1){if(!d)break a;if((b[e>>0]|0)!=(b[g>>0]|0))continue b;g=g+1|0;e=e+1|0;d=d+-1|0}}}else a=0}else a=0;while(0);return a|0}function RA(a,b){a=a|0;b=b|0;XA(a,b);a=a+12|0;b=b+12|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];f[a+12>>2]=f[b+12>>2];f[a+16>>2]=f[b+16>>2];f[a+20>>2]=f[b+20>>2];f[a+24>>2]=f[b+24>>2];return}function SA(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0;h=XY(60)|0;f[a>>2]=h;f[a+4>>2]=c+8;g=a+8|0;b[g>>0]=0;c=h+8|0;f[c>>2]=f[e>>2];f[c+4>>2]=f[e+4>>2];f[c+8>>2]=f[e+8>>2];c=0;while(1){if((c|0)==3)break;f[e+(c<<2)>>2]=0;c=c+1|0}WA(h+20|0,e+12|0);b[g>>0]=1;h=f[a>>2]|0;f[h+4>>2]=d;f[h>>2]=0;return}function TA(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=IY(b)|0}else b=2;d=f[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+W(+(+((f[a+12>>2]|0)>>>0)/+n[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(_(c+-1|0)|0);else c=IY(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)VA(a,b)}}else VA(a,b);return}function UA(a){a=a|0;nA(a+12|0);jZ(a);return}function VA(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;e=a+4|0;a:do if(c){if(c>>>0>1073741823){a=Sa(8)|0;eZ(a,38407);f[a>>2]=11336;Wa(a|0,3056,442)}t=XY(c<<2)|0;d=f[a>>2]|0;f[a>>2]=t;if(d|0)$Y(d);f[e>>2]=c;d=0;while(1){if((d|0)==(c|0))break;f[(f[a>>2]|0)+(d<<2)>>2]=0;d=d+1|0}g=a+8|0;d=f[g>>2]|0;if(d|0){e=f[d+4>>2]|0;s=c+-1|0;t=(s&c|0)==0;if(!t){if(e>>>0>=c>>>0)e=(e>>>0)%(c>>>0)|0}else e=e&s;f[(f[a>>2]|0)+(e<<2)>>2]=g;while(1){r=d;b:while(1)while(1){d=f[r>>2]|0;if(!d)break a;g=f[d+4>>2]|0;if(!t){if(g>>>0>=c>>>0)g=(g>>>0)%(c>>>0)|0}else g=g&s;if((g|0)==(e|0)){r=d;continue b}h=(f[a>>2]|0)+(g<<2)|0;if(!(f[h>>2]|0))break b;n=d+8|0;o=n+11|0;p=d+12|0;q=d;c:while(1){h=f[q>>2]|0;if(!h){i=36;break}j=h+8|0;i=b[o>>0]|0;l=i<<24>>24<0;i=i&255;m=l?f[p>>2]|0:i;u=b[j+11>>0]|0;k=u<<24>>24<0;if((m|0)!=((k?f[h+12>>2]|0:u&255)|0)){i=36;break}j=k?f[j>>2]|0:j;if(l){if(yp(f[n>>2]|0,j,m)|0){i=33;break}q=f[q>>2]|0;continue}else k=n;while(1){if(!i){q=h;continue c}if((b[k>>0]|0)!=(b[j>>0]|0)){i=35;break c}j=j+1|0;k=k+1|0;i=i+-1|0}}if((i|0)==33)h=f[q>>2]|0;f[r>>2]=h;f[q>>2]=f[f[(f[a>>2]|0)+(g<<2)>>2]>>2];f[f[(f[a>>2]|0)+(g<<2)>>2]>>2]=d}f[h>>2]=r;e=g}}}else{d=f[a>>2]|0;f[a>>2]=0;if(d|0)$Y(d);f[e>>2]=0}while(0);return}function WA(a,b){a=a|0;b=b|0;var c=0,d=0;f[a>>2]=0;d=a+4|0;f[d>>2]=0;f[a+8>>2]=0;f[a>>2]=f[b>>2];c=b+4|0;f[d>>2]=f[c>>2];d=b+8|0;f[a+8>>2]=f[d>>2];f[d>>2]=0;f[c>>2]=0;f[b>>2]=0;a=a+12|0;b=b+12|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=f[b+8>>2];f[a+12>>2]=f[b+12>>2];f[a+16>>2]=f[b+16>>2];f[a+20>>2]=f[b+20>>2];f[a+24>>2]=f[b+24>>2];return}function XA(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;c=b+4|0;e=(f[c>>2]|0)-(f[b>>2]|0)|0;d=(e|0)/28|0;if(e|0){YA(a,d);ZA(a,f[b>>2]|0,f[c>>2]|0,d)}return}function YA(a,b){a=a|0;b=b|0;var c=0;if((_A(a)|0)>>>0<b>>>0)MY(a);if(b>>>0>153391689){b=Sa(8)|0;eZ(b,38407);f[b>>2]=11336;Wa(b|0,3056,442)}else{c=XY(b*28|0)|0;f[a+4>>2]=c;f[a>>2]=c;f[a+8>>2]=c+(b*28|0);return}}function ZA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=a+4|0;a=c-b|0;if((a|0)>0){K_(f[d>>2]|0,b|0,a|0)|0;f[d>>2]=(f[d>>2]|0)+(((a>>>0)/28|0)*28|0)}return}function _A(a){a=a|0;return 153391689}function $A(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,k=0,l=0,m=0;m=u;u=u+96|0;h=m+80|0;i=m+16|0;k=m;l=rA(a,d)|0;if(!l){_g(29547,29382);a=0}else{l=sA(l+20|0)|0;f[i>>2]=j[g>>1]|j[g+2>>1]<<16;b[i+4>>0]=0;uF(h,i);Kv(i,+n[e>>2],+n[e+4>>2]);Oz(k,h);a=aB(a,d,l,c,i,k)|0}u=m;return a|0}function aB(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0;k=u;u=u+48|0;h=k+36|0;i=k+32|0;j=k;if((f[b+28>>2]|0)==(f[b+32>>2]|0))a=0;else if(uA(a,b,c,d,e,g,0,h,i)|0){vA(j,b,c);bB(a,j,j+8|0,+n[h>>2],d,e,g)|0;bB(a,j+16|0,j+24|0,+n[i>>2],d,e,g)|0;a=1}else a=0;u=k;return a|0}function bB(a,b,c,d,e,g,h){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0;l=u;u=u+144|0;i=l+128|0;j=l+64|0;k=l;if(xA(a)|0){d=d*.5+ +gz(e,1.0);Cv(i,c);if(yA(a,b,i,c,d)|0){i=f[a+8>>2]|0;i=Td[f[(f[i>>2]|0)+16>>2]&255](i)|0;Hy(i);c=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;Gv(k,c,Td[f[(f[e>>2]|0)+12>>2]&255](e)|0);Gv(j,k,g);nz(i+48|0,j);oz(i+64|0,h);pz(i+80|0,12,0);qz(i+96|0,12,8);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);rz(i);a=1}else{_g(29425,30941);a=0}}else{_g(29425,30815);a=0}u=l;return a|0}function cB(a){a=a|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;fj(a+16|0);fj(a+24|0);fj(a+32|0);return}function dB(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;i=b+28|0;c=f[i>>2]|0;if((f[b+32>>2]|0)-c>>3>>>0>=3){h=a+16|0;j=Sv(c,h)|0;d=f[a>>2]|0;e=a+4|0;c=f[e>>2]|0;if(!j){if((d|0)==(c|0))g=7}else{while(1){if((c|0)==(d|0))break;j=c+-28|0;f[e>>2]=j;c=j}f[a+12>>2]=0;i=f[i>>2]|0;j=f[i+4>>2]|0;g=h;f[g>>2]=f[i>>2];f[g+4>>2]=j;g=7}if((g|0)==7)eB(a,b);if(f[a+12>>2]|0)fB(a,b)}return}function eB(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0.0,j=0,k=0,l=0;g=u;u=u+32|0;c=g;j=g+16|0;l=g+12|0;k=g+8|0;d=b+28|0;f[l>>2]=(f[d>>2]|0)+8;h=b+32|0;f[k>>2]=f[h>>2];e=a+16|0;i=+n[b+40>>2];f[j>>2]=f[l>>2];f[c>>2]=f[k>>2];b=gB(j,c,e,i)|0;if((b|0)!=(f[h>>2]|0)){zv(c,e,b);l=c;k=f[l+4>>2]|0;j=a+24|0;f[j>>2]=f[l>>2];f[j+4>>2]=k;j=b;k=f[j+4>>2]|0;l=a+32|0;f[l>>2]=f[j>>2];f[l+4>>2]=k;f[a+12>>2]=b-(f[d>>2]|0)>>3}u=g;return}function fB(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0.0,p=0,q=0,r=0,s=0,t=0;q=u;u=u+32|0;h=q+28|0;g=q+24|0;r=q+20|0;e=q+16|0;j=q;k=q+12|0;l=q+8|0;m=b+40|0;o=+n[m>>2];p=b+28|0;i=a+12|0;f[r>>2]=(f[p>>2]|0)+(f[i>>2]<<3)+8;c=b+32|0;f[e>>2]=f[c>>2];d=a+32|0;f[g>>2]=f[r>>2];f[h>>2]=f[e>>2];e=a+24|0;b=gB(g,h,d,o)|0;while(1){if((b|0)==(f[c>>2]|0))break;zv(j,d,b);hB(a,e,d,j,+n[m>>2]);s=b;r=f[s+4>>2]|0;t=d;f[t>>2]=f[s>>2];f[t+4>>2]=r;t=j;r=f[t+4>>2]|0;s=e;f[s>>2]=f[t>>2];f[s+4>>2]=r;s=f[p>>2]|0;r=b-s>>3;f[i>>2]=r;f[k>>2]=s+(r<<3)+8;f[l>>2]=f[c>>2];f[g>>2]=f[k>>2];f[h>>2]=f[l>>2];b=gB(g,h,d,o)|0}u=q;return}function gB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0,g=0,h=0;h=u;u=u+16|0;g=h;e=h+8|0;n[e>>2]=25.0;if(!(Os(d,0.0,9.99999993922529e-09)|0))n[e>>2]=25.0/(d*d);a=f[a>>2]|0;b=f[b>>2]|0;f[g>>2]=e;f[g+4>>2]=c;while(1){if((a|0)==(b|0)){a=b;break}if(pB(g,a)|0)break;a=a+8|0}u=h;return a|0}function hB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;var g=0,h=0,i=0,j=0,k=0;i=u;u=u+32|0;h=i;e=+jB(+iB(b,d),e);g=a+4|0;k=b;b=f[k+4>>2]|0;j=h;f[j>>2]=f[k>>2];f[j+4>>2]=b;j=c;b=f[j+4>>2]|0;c=h+8|0;f[c>>2]=f[j>>2];f[c+4>>2]=b;c=d;d=f[c+4>>2]|0;b=h+16|0;f[b>>2]=f[c>>2];f[b+4>>2]=d;n[h+24>>2]=e;b=f[g>>2]|0;if(b>>>0<(f[a+8>>2]|0)>>>0){f[b>>2]=f[h>>2];f[b+4>>2]=f[h+4>>2];f[b+8>>2]=f[h+8>>2];f[b+12>>2]=f[h+12>>2];f[b+16>>2]=f[h+16>>2];f[b+20>>2]=f[h+20>>2];f[b+24>>2]=f[h+24>>2];c=(f[g>>2]|0)+28|0;f[g>>2]=c;b=c}else{kB(a,h);c=f[g>>2]|0;b=c}if(((b-(f[a>>2]|0)|0)/28|0)>>>0>2){e=+lB(c+-84|0,c+-56|0,c+-28|0);n[c+-32>>2]=e}u=i;return}function iB(a,b){a=a|0;b=b|0;return +(+xv(a,b))}function jB(a,b){a=+a;b=+b;var c=0;if(Os(a,0.0,9.99999993922529e-09)|0)a=1.5;else{a=15.0/a;c=Os(b,0.0,9.99999993922529e-09)|0;a=c?a:a/b;a=a<.699999988079071?.699999988079071:a;a=a>1.5?1.5:a}return +a}function kB(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;c=h;d=a+4|0;e=(((f[d>>2]|0)-(f[a>>2]|0)|0)/28|0)+1|0;g=_A(a)|0;if(g>>>0<e>>>0)MY(a);else{i=f[a>>2]|0;k=((f[a+8>>2]|0)-i|0)/28|0;j=k<<1;mB(c,k>>>0<g>>>1>>>0?(j>>>0<e>>>0?e:j):g,((f[d>>2]|0)-i|0)/28|0,a+8|0);g=c+8|0;e=f[g>>2]|0;f[e>>2]=f[b>>2];f[e+4>>2]=f[b+4>>2];f[e+8>>2]=f[b+8>>2];f[e+12>>2]=f[b+12>>2];f[e+16>>2]=f[b+16>>2];f[e+20>>2]=f[b+20>>2];f[e+24>>2]=f[b+24>>2];f[g>>2]=e+28;nB(a,c);oB(c);u=h;return}}function lB(a,b,c){a=a|0;b=b|0;c=c|0;return +((+n[c+24>>2]+(+n[a+24>>2]*1.5+ +n[b+24>>2]*1.2999999523162842))/3.799999952316284)}function mB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>153391689){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b*28|0)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c*28|0)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b*28|0);return}function nB(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[a>>2]|0;h=a+4|0;g=b+4|0;e=(f[h>>2]|0)-d|0;c=(f[g>>2]|0)+(((e|0)/-28|0)*28|0)|0;f[g>>2]=c;if((e|0)>0){K_(c|0,d|0,e|0)|0;d=g;c=f[g>>2]|0}else d=g;g=f[a>>2]|0;f[a>>2]=c;f[d>>2]=g;g=b+8|0;e=f[h>>2]|0;f[h>>2]=f[g>>2];f[g>>2]=e;g=a+8|0;h=b+12|0;a=f[g>>2]|0;f[g>>2]=f[h>>2];f[h>>2]=a;f[b>>2]=f[d>>2];return}function oB(a){a=a|0;var b=0,c=0,d=0,e=0;b=f[a+4>>2]|0;c=a+8|0;d=f[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-28|0;f[c>>2]=e;d=e}a=f[a>>2]|0;if(a|0)$Y(a);return}function pB(a,b){a=a|0;b=b|0;var c=0.0;c=+vv(f[a+4>>2]|0,b);return c>+n[f[a>>2]>>2]|0}function qB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);Xy(a+16|0,b);Wy(a+32|0,b);return}function rB(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(29580,30550);a=0}else a=1;else{_g(29580,31562);a=0}return a|0}function sB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=f[a+8>>2]|0;e=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;be[f[(f[b>>2]|0)+8>>2]&511](b);be[f[(f[c>>2]|0)+8>>2]&511](c);Hy(e);be[f[(f[d>>2]|0)+12>>2]&511](d);if(tB(a)|0){nz(e+48|0,7444);pz(e+64|0,16,0);pz(e+80|0,16,8);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);Zz(e);a=1}else{_g(29598,29620);a=0}return a|0}function tB(a){a=a|0;if(uB(a)|0)a=vB(a)|0;else a=0;return a|0}function uB(a){a=a|0;var b=0,c=0;c=u;u=u+64|0;b=c;a=a+16|0;if(DA(a)|0)a=1;else{zi(b,-1.0,1.0);zi(b+8|0,0.0,1.0);zi(b+16|0,-1.0,-1.0);zi(b+24|0,0.0,0.0);zi(b+32|0,1.0,1.0);zi(b+40|0,1.0,1.0);zi(b+48|0,1.0,-1.0);zi(b+56|0,1.0,0.0);a=Az(a,64,b,35044)|0}u=c;return a|0}function vB(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+32|0;if(Hz(a)|0)a=1;else{f[b>>2]=50462976;a=Iz(a,4,b,35044)|0}u=c;return a|0}function wB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);Xy(a+16|0,b);Wy(a+32|0,b);return}function xB(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(29637,30550);a=0}else a=1;else{_g(29637,31562);a=0}return a|0}function yB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0.0;e=u;u=u+32|0;j=e+24|0;i=e+16|0;h=e+8|0;g=e;k=f[(f[b>>2]|0)+28>>2]|0;l=+Ik(c);zi(i,l,+Hk(c));he[k&63](j,b,i);k=f[(f[b>>2]|0)+28>>2]|0;l=+Gk(c);zi(h,l,+Jk(c));he[k&63](i,b,h);je[f[(f[d>>2]|0)+8>>2]&31](d,770,771,1,1);zB(h,j,b);zB(g,i,b);d=AB(a,h,g,b)|0;u=e;return d|0}function zB(a,b,c){a=a|0;b=b|0;c=c|0;c=Td[f[(f[c>>2]|0)+16>>2]&255](c)|0;zi(a,+n[b>>2]*+((f[c>>2]|0)>>>0),(1.0-+n[b+4>>2])*+((f[c+4>>2]|0)>>>0));return}function AB(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0.0,i=0.0,j=0.0,k=0,l=0.0,m=0,o=0.0;if((b[46624]|0)==0?u_(46624)|0:0)Pz(46636,0.0,0.0,0.0,.20000000298023224);a:do if(BB(a)|0){k=f[a+8>>2]|0;k=Td[f[(f[k>>2]|0)+16>>2]&255](k)|0;Hy(k);nz(k+48|0,Td[f[(f[e>>2]|0)+8>>2]&255](e)|0);oz(k+64|0,46636);l=+n[c>>2];i=+n[c+4>>2];j=+n[d>>2];h=+n[d+4>>2];d=(Td[f[(f[e>>2]|0)+16>>2]&255](e)|0)+8|0;d=~~+N_(+(+n[d>>2]));e=k+80|0;g=k+96|0;c=0;while(1){if((c|0)>=(d|0)){c=1;break a}o=+(c|0);CB(a,l-o,i-o,j+o,h+o)|0;pz(e,12,0);qz(g,12,8);m=f[a>>2]|0;m=Td[f[(f[m>>2]|0)+8>>2]&255](m)|0;je[f[(f[m>>2]|0)+104>>2]&31](m,2,4,5121,0);rz(k);c=c+1|0}}else{_g(29662,30815);c=0}while(0);return c|0}function BB(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+32|0;if(Hz(a)|0)a=1;else{f[b>>2]=50462976;a=Iz(a,4,b,35044)|0}u=c;return a|0}function CB(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;var f=0,g=0,h=0.0;f=u;u=u+48|0;g=f;h=b+-.5;c=c+-.5;zi(g,h,c);n[g+8>>2]=1.0;b=e+.5;zi(g+12|0,h,b);n[g+20>>2]=1.0;e=d+.5;zi(g+24|0,e,b);n[g+32>>2]=1.0;zi(g+36|0,e,c);n[g+44>>2]=1.0;a=Az(a+16|0,48,g,35044)|0;u=f;return a|0}function DB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);Wy(a+16|0,b);Xy(a+32|0,b);Wy(a+48|0,b);Xy(a+64|0,b);return}function EB(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(29695,30550);a=0}else a=1;else{_g(29695,31562);a=0}return a|0}function FB(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0.0,i=0.0,j=0,k=0,l=0,m=0,o=0.0,p=0,q=0,r=0,s=0,t=0,v=0;s=u;u=u+224|0;j=s+8|0;k=s;p=s+208|0;q=s+144|0;r=s+80|0;l=s+16|0;if(GB(a)|0){m=d+28|0;t=f[m+4>>2]|0;v=j;f[v>>2]=f[m>>2];f[v+4>>2]=t;v=d+36|0;t=f[v+4>>2]|0;m=k;f[m>>2]=f[v>>2];f[m+4>>2]=t;m=b[d+24>>0]|0;o=+n[d+20>>2]*.5;d=d+16|0;b[p>>0]=b[d>>0]|0;b[p+1>>0]=b[d+1>>0]|0;b[p+2>>0]=b[d+2>>0]|0;i=+HB(0,j,k)*.5;IB(q,0,j,k,e);h=+gz(c,1.0);if(JB(a,i,o,h)|0){je[f[(f[g>>2]|0)+8>>2]&31](g,770,771,1,1);if(m<<24>>24){Kv(l,0.0,-1.0);Gv(r,l,q);KB(a,c,r,i,o,7508,h)}mz(r,p);KB(a,c,q,i,o,r,h);d=1}else{_g(29715,30941);d=0}}else{_g(29715,30815);d=0}u=s;return d|0}function GB(a){a=a|0;var c=0,d=0,e=0,f=0,g=0;g=u;u=u+16|0;f=g;a=a+16|0;if(Hz(a)|0)a=1;else{c=f;d=29738;e=c+16|0;do{b[c>>0]=b[d>>0]|0;c=c+1|0;d=d+1|0}while((c|0)<(e|0));a=Iz(a,16,f,35044)|0}u=g;return a|0}function HB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0;e=+n[b>>2]-+n[c>>2];d=+n[b+4>>2]-+n[c+4>>2];return +(+L(+(e*e+d*d)))}function IB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0,m=0,o=0,p=0,q=0,r=0;r=u;u=u+272|0;l=r+256|0;m=r+192|0;o=r+128|0;p=r+64|0;q=r;zi(l,-1.0,-1.0);j=+n[c>>2];k=+n[d>>2];b=!(j<=k);i=b?k:j;k=b?j:k;j=+n[(b?c:d)+4>>2];f=+n[(b?d:c)+4>>2];d=Os(i,k,9.99999993922529e-09)|0;b=Os(f,j,9.99999993922529e-09)|0;do if(!d)if(b){g=f;h=(i+k)*.5;f=0.0;break}else{g=(j+f)*.5;h=(i+k)*.5;f=+T(+(j-f),+(k-i));break}else{g=b?f:(j+f)*.5;h=i;f=b?0.0:1.570796251296997}while(0);Kv(o,+n[l>>2]+ +n[e>>2],+n[l+4>>2]+ +n[e+4>>2]);Kv(p,h,g);Gv(m,o,p);Mv(q,f,0.0,0.0);Gv(a,m,q);u=r;return}function JB(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0,f=0,g=0.0,h=0.0,i=0.0;e=u;u=u+144|0;f=e;h=c+d;g=b+c+d;i=-b;zi(f,i,h);n[f+8>>2]=0.0;zi(f+12|0,b,h);n[f+20>>2]=0.0;zi(f+24|0,i,c);n[f+32>>2]=1.0;zi(f+36|0,b,c);n[f+44>>2]=1.0;d=-c;zi(f+48|0,i,d);n[f+56>>2]=1.0;zi(f+60|0,b,d);n[f+68>>2]=1.0;d=-h;zi(f+72|0,i,d);n[f+80>>2]=0.0;zi(f+84|0,b,d);n[f+92>>2]=0.0;c=-g;zi(f+96|0,c,h);n[f+104>>2]=0.0;zi(f+108|0,c,d);n[f+116>>2]=0.0;zi(f+120|0,g,h);n[f+128>>2]=0.0;zi(f+132|0,g,d);n[f+140>>2]=0.0;a=Az(a+32|0,144,f,35044)|0;u=e;return a|0}function KB(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=+d;e=+e;f=f|0;g=+g;LB(a,b,c,f);MB(a,b,c,d,e,g,f);return}function LB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;e=u;u=u+128|0;h=e+64|0;i=e;g=f[a+8>>2]|0;g=Td[f[(f[g>>2]|0)+16>>2]&255](g)|0;Hy(g);j=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;Gv(i,j,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);Gv(h,i,c);nz(g+48|0,h);oz(g+64|0,d);pz(g+80|0,12,0);qz(g+96|0,12,8);d=f[a>>2]|0;d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;je[f[(f[d>>2]|0)+104>>2]&31](d,5,8,5121,0);rz(g);u=e;return}function MB(a,b,c,d,e,g,h){a=a|0;b=b|0;c=c|0;d=+d;e=+e;g=+g;h=h|0;var i=0,j=0,k=0,l=0,m=0;i=u;u=u+128|0;k=i+64|0;l=i;j=f[a+8>>2]|0;j=Td[f[(f[j>>2]|0)+20>>2]&255](j)|0;Hy(j+4|0);m=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;Gv(l,m,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);Gv(k,l,c);nz(j+52|0,k);sz(j+68|0,g);sz(j+84|0,e);oz(j+100|0,h);pz(j+132|0,12,0);h=j+116|0;zi(k,-d,0.0);tz(h,k);c=f[a>>2]|0;c=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;je[f[(f[c>>2]|0)+104>>2]&31](c,5,4,5121,8);zi(k,d,0.0);tz(h,k);h=f[a>>2]|0;h=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;je[f[(f[h>>2]|0)+104>>2]&31](h,5,4,5121,12);be[f[f[j>>2]>>2]&511](j);u=i;return}function NB(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,k=0,l=0,m=0,o=0,p=0,q=0.0,r=0.0,s=0,t=0,v=0;p=u;u=u+224|0;i=p+8|0;k=p;l=p+208|0;m=p+144|0;o=p+80|0;h=p+16|0;if(OB(a)|0){s=d+28|0;t=f[s+4>>2]|0;v=i;f[v>>2]=f[s>>2];f[v+4>>2]=t;v=d+36|0;t=f[v+4>>2]|0;s=k;f[s>>2]=f[v>>2];f[s+4>>2]=t;f[m>>2]=j[g>>1]|j[g+2>>1]<<16;b[m+4>>0]=0;uF(l,m);IB(m,0,i,k,e);q=+n[d+20>>2]*.5;r=+HB(0,i,k)*.5;if(PB(a,r,q,+gz(c,1.0))|0){v=f[a+8>>2]|0;v=Td[f[(f[v>>2]|0)+16>>2]&255](v)|0;Hy(v);t=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;Gv(h,t,Td[f[(f[c>>2]|0)+12>>2]&255](c)|0);Gv(o,h,m);nz(v+48|0,o);Oz(o,l);oz(v+64|0,o);pz(v+80|0,12,0);qz(v+96|0,12,8);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);rz(v);a=1}else{_g(29754,30941);a=0}}else{_g(29754,30815);a=0}u=p;return a|0}function OB(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+48|0;if(Hz(a)|0)a=1;else{f[b>>2]=50462976;a=Iz(a,4,b,35044)|0}u=c;return a|0}function PB(a,b,c,d){a=a|0;b=+b;c=+c;d=+d;var e=0,f=0;e=u;u=u+48|0;f=e;d=c+d;c=b+c;b=-c;zi(f,b,d);n[f+8>>2]=1.0;zi(f+12|0,c,d);n[f+20>>2]=1.0;d=-d;zi(f+24|0,b,d);n[f+32>>2]=1.0;zi(f+36|0,c,d);n[f+44>>2]=1.0;a=Az(a+64|0,48,f,35044)|0;u=e;return a|0}function QB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);Wy(a+16|0,a);Xy(a+32|0,b);Xy(a+48|0,b);return}function RB(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(29785,30550);a=0}else a=1;else{_g(29785,31562);a=0}return a|0}function SB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var g=0.0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;l=u;u=u+208|0;h=l;i=l+136|0;j=l+72|0;k=l+8|0;if(TB(a)|0){g=+gz(b,1.0);d=+UB(0,d,b);n=c;m=f[n+4>>2]|0;c=h;f[c>>2]=f[n>>2];f[c+4>>2]=m;if(VB(a,h,g+d)|0){Kv(i,0.0,-+WB(0,b));n=f[a+8>>2]|0;n=Td[f[(f[n>>2]|0)+20>>2]&255](n)|0;a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;Hy(n+4|0);je[f[(f[e>>2]|0)+8>>2]&31](e,770,771,1,1);e=n+52|0;m=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;Gv(k,m,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);Gv(j,k,i);nz(e,j);sz(n+68|0,g);sz(n+84|0,d);k=n+100|0;oz(k,7524);tz(n+116|0,h);m=n+132|0;pz(m,8,0);je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);be[f[f[n>>2]>>2]&511](n);i=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;Gv(j,i,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);nz(e,j);oz(k,7540);pz(m,8,0);je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);be[f[f[n>>2]>>2]&511](n);a=1}else{_g(29807,30941);a=0}}else{_g(29807,30815);a=0}u=l;return a|0}function TB(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+16|0;if(Hz(a)|0)a=1;else{f[b>>2]=50462976;a=Iz(a,4,b,35044)|0}u=c;return a|0}function UB(a,b,c){a=a|0;b=+b;c=c|0;if(+Ip(c,b)<5.0)b=+On(c,5.0);return +b}function VB(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0;d=u;u=u+32|0;e=d;f=+n[b>>2];h=+n[b+4>>2];g=f-c;i=h+c;zi(e,g,i);f=f+c;zi(e+8|0,f,i);c=h-c;zi(e+16|0,g,c);zi(e+24|0,f,c);b=Az(a+32|0,32,e,35044)|0;u=d;return b|0}function WB(a,b){a=a|0;b=b|0;return +(+On(b,1.0))}function XB(a,c,d,e,g,h){a=a|0;c=c|0;d=d|0;e=+e;g=g|0;h=h|0;var i=0,k=0,l=0,m=0,n=0.0;m=u;u=u+80|0;i=m+72|0;k=m;l=m+8|0;if(TB(a)|0){n=+gz(c,1.0);e=+UB(0,e,c);f[k>>2]=j[g>>1]|j[g+2>>1]<<16;b[k+4>>0]=h;uF(i,k);g=f[d+4>>2]|0;h=k;f[h>>2]=f[d>>2];f[h+4>>2]=g;if(YB(a,k,n+e)|0){k=f[a+8>>2]|0;k=Td[f[(f[k>>2]|0)+16>>2]&255](k)|0;Hy(k);h=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;Gv(l,h,Td[f[(f[c>>2]|0)+12>>2]&255](c)|0);nz(k+48|0,l);Oz(l,i);oz(k+64|0,l);pz(k+80|0,12,0);qz(k+96|0,12,8);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);rz(k);a=1}else{_g(29834,29869);a=0}}else{_g(29834,30815);a=0}u=m;return a|0}function YB(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0;d=u;u=u+48|0;e=d;f=+n[b>>2];h=+n[b+4>>2];g=f-c;i=h+c;zi(e,g,i);n[e+8>>2]=1.0;f=f+c;zi(e+12|0,f,i);n[e+20>>2]=1.0;c=h-c;zi(e+24|0,g,c);n[e+32>>2]=1.0;zi(e+36|0,f,c);n[e+44>>2]=1.0;b=Az(a+48|0,48,e,35044)|0;u=d;return b|0}function ZB(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);Wy(a+16|0,b);Xy(a+32|0,b);return}function _B(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(29899,30550);a=0}else a=1;else{_g(29899,31562);a=0}return a|0}function $B(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0;k=u;u=u+192|0;h=k+128|0;i=k+64|0;j=k;do if(aC(a)|0){if(!(bC(a)|0)){_g(29919,30941);a=0;break}Kv(h,+n[e>>2],+n[e+4>>2]);je[f[(f[g>>2]|0)+8>>2]&31](g,770,771,1,1);if(b[d+24>>0]|0){Kv(j,0.0,-1.0);Gv(i,j,h);cC(a,c,d,7556,i,0)}mz(i,d+16|0);cC(a,c,d,i,h,0);a=1}else{_g(29919,30815);a=0}while(0);u=k;return a|0}function aC(a){a=a|0;var b=0,c=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;n=u;u=u+16|0;l=n;m=n+12|0;i=a+16|0;if(Hz(i)|0)a=1;else{f[l>>2]=0;j=l+4|0;f[j>>2]=0;f[l+8>>2]=0;k=l+8|0;h=0;while(1){if((h|0)>=151)break;g=h<<2;a=g&65535;d[m>>1]=a;b=f[j>>2]|0;c=f[k>>2]|0;if(b>>>0<c>>>0){d[b>>1]=a;e=b+2|0;f[j>>2]=e;b=c}else{mC(l,m);e=f[j>>2]|0;b=f[k>>2]|0}a=(g|2)&65535;d[m>>1]=a;if(e>>>0<b>>>0){d[e>>1]=a;f[j>>2]=e+2}else mC(l,m);h=h+1|0}h=0;while(1){if((h|0)>=151)break;g=h<<2;a=g&65535;d[m>>1]=a;b=f[j>>2]|0;c=f[k>>2]|0;if(b>>>0<c>>>0){d[b>>1]=a;e=b+2|0;f[j>>2]=e;b=c}else{mC(l,m);e=f[j>>2]|0;b=f[k>>2]|0}a=(g|1)&65535;d[m>>1]=a;if(e>>>0<b>>>0){d[e>>1]=a;f[j>>2]=e+2}else mC(l,m);h=h+1|0}h=0;while(1){if((h|0)>=151)break;g=h<<2;a=(g|2)&65535;d[m>>1]=a;b=f[j>>2]|0;c=f[k>>2]|0;if(b>>>0<c>>>0){d[b>>1]=a;e=b+2|0;f[j>>2]=e;b=c}else{mC(l,m);e=f[j>>2]|0;b=f[k>>2]|0}a=(g|3)&65535;d[m>>1]=a;if(e>>>0<b>>>0){d[e>>1]=a;f[j>>2]=e+2}else mC(l,m);h=h+1|0}a=f[l>>2]|0;a=Iz(i,(f[j>>2]|0)-a|0,a,35044)|0;nC(l)}u=n;return a|0}function bC(a){a=a|0;var b=0,c=0.0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0;s=u;u=u+32|0;r=s+12|0;p=s;q=a+32|0;if(DA(q)|0)a=1;else{f[r>>2]=0;m=r+4|0;f[m>>2]=0;f[r+8>>2]=0;k=p+4|0;l=p+8|0;o=r+8|0;d=p+4|0;e=p+8|0;g=p+4|0;h=p+8|0;i=p+4|0;j=p+8|0;b=0;c=0.0;while(1){if((b|0)>=150)break;n[p>>2]=c;n[k>>2]=1.0;n[l>>2]=0.0;a=f[m>>2]|0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];a=(f[m>>2]|0)+12|0;f[m>>2]=a}else{gC(r,p);a=f[m>>2]|0}n[p>>2]=c;n[d>>2]=1.0;n[e>>2]=1.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];a=(f[m>>2]|0)+12|0;f[m>>2]=a}else{gC(r,p);a=f[m>>2]|0}n[p>>2]=c;n[g>>2]=-1.0;n[h>>2]=0.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];a=(f[m>>2]|0)+12|0;f[m>>2]=a}else{gC(r,p);a=f[m>>2]|0}n[p>>2]=c;n[i>>2]=-1.0;n[j>>2]=1.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];f[m>>2]=(f[m>>2]|0)+12}else gC(r,p);b=b+1|0;c=c+.006666666828095913}n[p>>2]=1.0;n[p+4>>2]=1.0;n[p+8>>2]=0.0;a=f[m>>2]|0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];a=(f[m>>2]|0)+12|0;f[m>>2]=a}else{gC(r,p);a=f[m>>2]|0}n[p>>2]=1.0;n[p+4>>2]=1.0;n[p+8>>2]=1.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];a=(f[m>>2]|0)+12|0;f[m>>2]=a}else{gC(r,p);a=f[m>>2]|0}n[p>>2]=1.0;n[p+4>>2]=-1.0;n[p+8>>2]=0.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];a=(f[m>>2]|0)+12|0;f[m>>2]=a}else{gC(r,p);a=f[m>>2]|0}n[p>>2]=1.0;n[p+4>>2]=-1.0;n[p+8>>2]=1.0;if(a>>>0<(f[o>>2]|0)>>>0){f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];a=(f[m>>2]|0)+12|0;f[m>>2]=a}else{gC(r,p);a=f[m>>2]|0}p=f[r>>2]|0;a=Az(q,a-p|0,p,35044)|0;hC(r)}u=s;return a|0}function cC(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0;g=u;u=u+128|0;i=g+64|0;j=g;h=f[a>>2]|0;h=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;a=f[a+8>>2]|0;a=Td[f[(f[a>>2]|0)+32>>2]&255](a)|0;Hy(a);k=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;Gv(j,k,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);Gv(i,j,e);nz(a+48|0,i);sz(a+128|0,+gz(b,1.0));e=c+20|0;sz(a+144|0,+n[e>>2]);sz(a+160|0,+n[e>>2]);oz(a+176|0,d);qz(a+192|0,12,0);qz(a+208|0,12,4);qz(a+224|0,12,8);dC(i,c);tz(a+64|0,i);tz(a+112|0,i+8|0);d=a+80|0;tz(d,i+16|0);e=a+96|0;tz(e,i+24|0);je[f[(f[h>>2]|0)+104>>2]&31](h,5,302,5123,0);je[f[(f[h>>2]|0)+104>>2]&31](h,5,302,5123,1208);je[f[(f[h>>2]|0)+104>>2]&31](h,5,302,5123,604);tz(d,i+32|0);tz(e,i+40|0);je[f[(f[h>>2]|0)+104>>2]&31](h,5,302,5123,0);je[f[(f[h>>2]|0)+104>>2]&31](h,5,302,5123,1208);je[f[(f[h>>2]|0)+104>>2]&31](h,5,302,5123,604);eC(a);u=g;return}function dC(a,b){a=a|0;b=b|0;var c=0.0,d=0.0,e=0.0,g=0.0,h=0.0,i=0.0,j=0,k=0,l=0.0,m=0.0,o=0,p=0,q=0;o=u;u=u+16|0;j=o;fC(a);c=+n[b+36>>2];d=+n[b+40>>2];k=b+28|0;l=+n[k>>2];m=l-c;i=c+l;b=b+32|0;e=+n[b>>2];g=e-d;h=d+e;c=c<1.0?1.0:c;d=d<1.0?1.0:d;if(!(c>=d)){zi(j,l,g);q=j;p=f[q+4>>2]|0;b=a;f[b>>2]=f[q>>2];f[b+4>>2]=p;zi(j,+n[k>>2],h);b=j;p=f[b+4>>2]|0;q=a+8|0;f[q>>2]=f[b>>2];f[q+4>>2]=p;m=c*1.3333333730697632;zi(j,+n[k>>2]-m,g);q=j;p=f[q+4>>2]|0;b=a+16|0;f[b>>2]=f[q>>2];f[b+4>>2]=p;zi(j,+n[k>>2]-m,h);b=j;p=f[b+4>>2]|0;q=a+24|0;f[q>>2]=f[b>>2];f[q+4>>2]=p;zi(j,m+ +n[k>>2],g);q=j;p=f[q+4>>2]|0;b=a+32|0;f[b>>2]=f[q>>2];f[b+4>>2]=p;zi(j,m+ +n[k>>2],h);b=j;j=f[b+4>>2]|0;k=a+40|0;f[k>>2]=f[b>>2];f[k+4>>2]=j}else{zi(j,m,e);q=j;p=f[q+4>>2]|0;k=a;f[k>>2]=f[q>>2];f[k+4>>2]=p;zi(j,i,+n[b>>2]);k=j;p=f[k+4>>2]|0;q=a+8|0;f[q>>2]=f[k>>2];f[q+4>>2]=p;l=d*1.3333333730697632;zi(j,m,l+ +n[b>>2]);q=j;p=f[q+4>>2]|0;k=a+16|0;f[k>>2]=f[q>>2];f[k+4>>2]=p;zi(j,i,l+ +n[b>>2]);k=j;p=f[k+4>>2]|0;q=a+24|0;f[q>>2]=f[k>>2];f[q+4>>2]=p;zi(j,m,+n[b>>2]-l);q=j;p=f[q+4>>2]|0;k=a+32|0;f[k>>2]=f[q>>2];f[k+4>>2]=p;zi(j,i,+n[b>>2]-l);k=j;p=f[k+4>>2]|0;q=a+40|0;f[q>>2]=f[k>>2];f[q+4>>2]=p}u=o;return}function eC(a){a=a|0;vz(a+192|0);vz(a+208|0);vz(a+224|0);return}function fC(a){a=a|0;fj(a);fj(a+8|0);fj(a+16|0);fj(a+24|0);fj(a+32|0);fj(a+40|0);return}function gC(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;c=h;d=a+4|0;e=(((f[d>>2]|0)-(f[a>>2]|0)|0)/12|0)+1|0;g=iC(a)|0;if(g>>>0<e>>>0)MY(a);else{i=f[a>>2]|0;k=((f[a+8>>2]|0)-i|0)/12|0;j=k<<1;jC(c,k>>>0<g>>>1>>>0?(j>>>0<e>>>0?e:j):g,((f[d>>2]|0)-i|0)/12|0,a+8|0);g=c+8|0;e=f[g>>2]|0;f[e>>2]=f[b>>2];f[e+4>>2]=f[b+4>>2];f[e+8>>2]=f[b+8>>2];f[g>>2]=(f[g>>2]|0)+12;kC(a,c);lC(c);u=h;return}}function hC(a){a=a|0;var b=0,c=0,d=0;c=f[a>>2]|0;if(c|0){a=a+4|0;b=f[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-12|0;f[a>>2]=d;b=d}$Y(c)}return}function iC(a){a=a|0;return 357913941}function jC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>357913941){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b*12|0)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c*12|0)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b*12|0);return}function kC(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[a>>2]|0;h=a+4|0;g=b+4|0;e=(f[h>>2]|0)-d|0;c=(f[g>>2]|0)+(((e|0)/-12|0)*12|0)|0;f[g>>2]=c;if((e|0)>0){K_(c|0,d|0,e|0)|0;d=g;c=f[g>>2]|0}else d=g;g=f[a>>2]|0;f[a>>2]=c;f[d>>2]=g;g=b+8|0;e=f[h>>2]|0;f[h>>2]=f[g>>2];f[g>>2]=e;g=a+8|0;h=b+12|0;a=f[g>>2]|0;f[g>>2]=f[h>>2];f[h>>2]=a;f[b>>2]=f[d>>2];return}function lC(a){a=a|0;var b=0,c=0,d=0,e=0;b=f[a+4>>2]|0;c=a+8|0;d=f[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-12|0;f[c>>2]=e;d=e}a=f[a>>2]|0;if(a|0)$Y(a);return}function mC(a,b){a=a|0;b=b|0;var c=0,e=0,g=0,h=0,i=0,j=0,k=0;i=u;u=u+32|0;c=i;e=a+4|0;g=((f[e>>2]|0)-(f[a>>2]|0)>>1)+1|0;h=oC(a)|0;if(h>>>0<g>>>0)MY(a);else{j=f[a>>2]|0;k=(f[a+8>>2]|0)-j|0;pC(c,k>>1>>>0<h>>>1>>>0?(k>>>0<g>>>0?g:k):h,(f[e>>2]|0)-j>>1,a+8|0);h=c+8|0;g=f[h>>2]|0;d[g>>1]=d[b>>1]|0;f[h>>2]=g+2;qC(a,c);rC(c);u=i;return}}function nC(a){a=a|0;var b=0,c=0,d=0;c=f[a>>2]|0;if(c|0){a=a+4|0;b=f[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-2|0;f[a>>2]=d;b=d}$Y(c)}return}function oC(a){a=a|0;return 2147483647}function pC(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if((b|0)<0){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<1)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<1)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<1);return}function qC(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[a>>2]|0;h=a+4|0;g=b+4|0;e=(f[h>>2]|0)-d|0;c=(f[g>>2]|0)+(0-(e>>1)<<1)|0;f[g>>2]=c;if((e|0)>0){K_(c|0,d|0,e|0)|0;d=g;c=f[g>>2]|0}else d=g;g=f[a>>2]|0;f[a>>2]=c;f[d>>2]=g;g=b+8|0;e=f[h>>2]|0;f[h>>2]=f[g>>2];f[g>>2]=e;g=a+8|0;h=b+12|0;a=f[g>>2]|0;f[g>>2]=f[h>>2];f[h>>2]=a;f[b>>2]=f[d>>2];return}function rC(a){a=a|0;var b=0,c=0,d=0,e=0;b=f[a+4>>2]|0;c=a+8|0;d=f[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-2|0;f[c>>2]=e;d=e}a=f[a>>2]|0;if(a|0)$Y(a);return}function sC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=u;u=u+64|0;f=g;do if(aC(a)|0)if(bC(a)|0){Kv(f,+n[d>>2],+n[d+4>>2]);tC(a,b,c,f,e);a=1;break}else{_g(29942,30941);a=0;break}else{_g(29942,30815);a=0}while(0);u=g;return a|0}function tC(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,k=0,l=0,m=0;h=u;u=u+128|0;l=h+64|0;k=h;i=f[a>>2]|0;i=Td[f[(f[i>>2]|0)+8>>2]&255](i)|0;a=f[a+8>>2]|0;a=Td[f[(f[a>>2]|0)+32>>2]&255](a)|0;Hy(a);m=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;Gv(k,m,Td[f[(f[c>>2]|0)+12>>2]&255](c)|0);Gv(l,k,e);nz(a+48|0,l);sz(a+128|0,0.0);e=d+20|0;sz(a+144|0,+n[e>>2]);sz(a+160|0,+n[e>>2]);f[k>>2]=j[g>>1]|j[g+2>>1]<<16;b[k+4>>0]=0;uF(l,k);Oz(k,l);oz(a+176|0,k);qz(a+192|0,12,0);qz(a+208|0,12,4);qz(a+224|0,12,8);dC(k,d);tz(a+64|0,k);tz(a+112|0,k+8|0);e=a+80|0;tz(e,k+16|0);g=a+96|0;tz(g,k+24|0);je[f[(f[i>>2]|0)+104>>2]&31](i,5,302,5123,0);tz(e,k+32|0);tz(g,k+40|0);je[f[(f[i>>2]|0)+104>>2]&31](i,5,302,5123,0);eC(a);u=h;return}function uC(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=f[b>>2];b=f[b+4>>2]|0;f[a+4>>2]=b;if(b|0)SY(b);f[a+8>>2]=f[c>>2];b=f[c+4>>2]|0;f[a+12>>2]=b;if(b|0)SY(b);Xy(a+16|0,a);Wy(a+32|0,a);return}function vC(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(29973,30550);a=0}else a=1;else{_g(29973,31562);a=0}return a|0}function wC(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0.0,i=0,j=0,k=0,l=0,m=0,o=0;o=u;u=u+192|0;j=o+128|0;k=o+64|0;l=o;m=d+28|0;h=+n[d+20>>2]*.5;i=d+16|0;Kv(j,+n[e>>2],+n[e+4>>2]);do if(xC(a,m,h)|0){if(!(yC(a)|0)){_g(29998,30061);a=0;break}je[f[(f[g>>2]|0)+8>>2]&31](g,770,771,1,1);if(b[d+24>>0]|0){Kv(l,0.0,-1.0);Gv(k,l,j);zC(a,c,m,h,k,7572)|0}mz(k,i);zC(a,c,m,h,j,k)|0;a=1}else{_g(29998,30031);a=0}while(0);u=o;return a|0}function xC(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,o=0.0,p=0.0,q=0.0;d=u;u=u+240|0;e=d;o=+Ik(b);h=+Hk(b);g=+Gk(b);k=+Jk(b);j=+Tu(b)*.5;j=j<c?j:c;m=+Uu(b)*.5;m=m<c?m:c;zi(e,o,h);n[e+8>>2]=1.0;p=o-c;f=h-c;zi(e+12|0,p,f);n[e+20>>2]=1.0;q=o+j;i=h+m;zi(e+24|0,q,i);n[e+32>>2]=1.0;zi(e+36|0,o,f);n[e+44>>2]=1.0;zi(e+48|0,p,h);n[e+56>>2]=1.0;zi(e+60|0,o,k);n[e+68>>2]=1.0;l=k+c;zi(e+72|0,p,l);n[e+80>>2]=1.0;m=k-m;zi(e+84|0,q,m);n[e+92>>2]=1.0;zi(e+96|0,p,k);n[e+104>>2]=1.0;zi(e+108|0,o,l);n[e+116>>2]=1.0;zi(e+120|0,g,k);n[e+128>>2]=1.0;c=g+c;zi(e+132|0,c,l);n[e+140>>2]=1.0;j=g-j;zi(e+144|0,j,m);n[e+152>>2]=1.0;zi(e+156|0,g,l);n[e+164>>2]=1.0;zi(e+168|0,c,k);n[e+176>>2]=1.0;zi(e+180|0,g,h);n[e+188>>2]=1.0;zi(e+192|0,c,f);n[e+200>>2]=1.0;zi(e+204|0,j,i);n[e+212>>2]=1.0;zi(e+216|0,c,h);n[e+224>>2]=1.0;zi(e+228|0,g,f);n[e+236>>2]=1.0;b=Az(a+16|0,240,e,35044)|0;u=d;return b|0}function yC(a){a=a|0;var c=0,d=0,e=0,f=0,g=0;e=u;u=u+48|0;c=e;d=c;f=30090;g=d+40|0;do{b[d>>0]=b[f>>0]|0;d=d+1|0;f=f+1|0}while((d|0)<(g|0));g=Iz(a+32|0,40,c,35044)|0;u=e;return g|0}function zC(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;g=g|0;var h=0,i=0,j=0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0,q=0;h=u;u=u+128|0;p=h+64|0;j=h;i=f[a>>2]|0;i=Td[f[(f[i>>2]|0)+8>>2]&255](i)|0;q=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;Gv(j,q,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);Gv(p,j,e);o=+gz(b,1.0);n=+Ik(c);k=+Hk(c);l=+Gk(c);m=+Jk(c);e=a+8|0;c=f[e>>2]|0;c=Td[f[(f[c>>2]|0)+16>>2]&255](c)|0;Hy(c);nz(c+48|0,p);oz(c+64|0,g);pz(c+80|0,12,0);qz(c+96|0,12,8);je[f[(f[i>>2]|0)+104>>2]&31](i,5,6,5121,0);je[f[(f[i>>2]|0)+104>>2]&31](i,5,6,5121,6);je[f[(f[i>>2]|0)+104>>2]&31](i,5,6,5121,12);je[f[(f[i>>2]|0)+104>>2]&31](i,5,6,5121,18);rz(c);e=f[e>>2]|0;e=Td[f[(f[e>>2]|0)+20>>2]&255](e)|0;Hy(e+4|0);nz(e+52|0,p);sz(e+68|0,o);sz(e+84|0,d-o*.5);oz(e+100|0,g);pz(e+132|0,12,0);g=e+116|0;zi(j,n,k);tz(g,j);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,24);zi(j,n,m);tz(g,j);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,28);zi(j,l,m);tz(g,j);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,32);zi(j,l,k);tz(g,j);je[f[(f[i>>2]|0)+104>>2]&31](i,5,4,5121,36);be[f[f[e>>2]>>2]&511](e);u=h;return 1}function AC(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,k=0.0;i=u;u=u+32|0;e=i+16|0;h=i;k=+n[d+20>>2]*.5;f[h>>2]=j[g>>1]|j[g+2>>1]<<16;b[h+4>>0]=0;uF(e,h);do if(BC(a,d+28|0,k)|0)if(CC(a)|0){Oz(h,e);DC(a,c,0,0.0,h)|0;e=1;break}else{_g(30130,30061);e=0;break}else{_g(30130,30031);e=0}while(0);u=i;return e|0}function BC(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;d=u;u=u+96|0;e=d;h=+Ik(b);f=+Hk(b);j=+Gk(b);i=+Jk(b);l=h-c;g=f-c;zi(e,l,g);n[e+8>>2]=1.0;h=h+c;f=f+c;zi(e+12|0,h,f);n[e+20>>2]=1.0;k=i+c;zi(e+24|0,l,k);n[e+32>>2]=1.0;i=i-c;zi(e+36|0,h,i);n[e+44>>2]=1.0;h=j+c;zi(e+48|0,h,k);n[e+56>>2]=1.0;c=j-c;zi(e+60|0,c,i);n[e+68>>2]=1.0;zi(e+72|0,h,g);n[e+80>>2]=1.0;zi(e+84|0,c,f);n[e+92>>2]=1.0;b=Az(a+16|0,96,e,35044)|0;u=d;return b|0}function CC(a){a=a|0;var c=0,d=0,e=0,f=0,g=0;e=u;u=u+16|0;c=e;d=c;f=30171;g=d+10|0;do{b[d>>0]=b[f>>0]|0;d=d+1|0;f=f+1|0}while((d|0)<(g|0));g=Iz(a+32|0,10,c,35044)|0;u=e;return g|0}function DC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;var g=0,h=0,i=0;c=u;u=u+64|0;h=c;g=f[a+8>>2]|0;g=Td[f[(f[g>>2]|0)+16>>2]&255](g)|0;Hy(g);i=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;Gv(h,i,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);nz(g+48|0,h);oz(g+64|0,e);pz(g+80|0,12,0);qz(g+96|0,12,8);e=f[a>>2]|0;e=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;je[f[(f[e>>2]|0)+104>>2]&31](e,5,10,5121,0);rz(g);u=c;return 1}function EC(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Vy(a,b,c);Rz(a+80|0,b,c,d);_z(a+136|0,b,c);iA(a+184|0,b,c);qB(a+284|0,b,c);wB(a+332|0,b,c);DB(a+380|0,b,c);QB(a+460|0,b,c);ZC(a+524|0,b,c);ZB(a+572|0,b,c);pD(a+620|0,b,c,e);uC(a+696|0,b,c);return}function FC(a){a=a|0;Yy(a+60|0);Zy(a+44|0);QC(a+16|0);_y(a+8|0);gw(a);return}function GC(a){a=a|0;Yy(a+32|0);Zy(a+16|0);_y(a+8|0);gw(a);return}function HC(a){a=a|0;Yy(a+32|0);Zy(a+16|0);_y(a+8|0);gw(a);return}function IC(a){a=a|0;Yy(a+48|0);Yy(a+32|0);Zy(a+16|0);_y(a+8|0);gw(a);return}function JC(a){a=a|0;Yy(a+64|0);Zy(a+48|0);Yy(a+32|0);Zy(a+16|0);_y(a+8|0);gw(a);return}function KC(a){a=a|0;Zy(a+32|0);Yy(a+16|0);_y(a+8|0);gw(a);return}function LC(a){a=a|0;Zy(a+32|0);Yy(a+16|0);_y(a+8|0);gw(a);return}function MC(a){a=a|0;Yy(a+84|0);Zy(a+68|0);Yy(a+52|0);Zy(a+36|0);jA(a+16|0);_y(a+8|0);gw(a);return}function NC(a){a=a|0;Yy(a+32|0);Zy(a+16|0);_y(a+8|0);gw(a);return}function OC(a){a=a|0;Zy(a+40|0);Yy(a+24|0);Sz(a+16|0);_y(a+8|0);gw(a);return}function PC(a){a=a|0;Yy(a+64|0);Yy(a+48|0);Zy(a+32|0);Zy(a+16|0);_y(a+8|0);gw(a);return}function QC(a){a=a|0;RC(a+20|0);SC(a);return}function RC(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function SC(a){a=a|0;TC(a);return}function TC(a){a=a|0;var b=0;UC(a,f[a+8>>2]|0);b=f[a>>2]|0;f[a>>2]=0;if(b|0)$Y(b);return}function UC(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=f[b>>2]|0;VC(b+8|0);$Y(b);b=a}return}function VC(a){a=a|0;WC(a+12|0);jZ(a);return}function WC(a){a=a|0;XC(a+20|0);Jg(a);return}function XC(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function YC(a){a=a|0;do if(dz(a)|0){if(!(Tz(a+80|0)|0)){_g(30181,30226);a=0;break}if(!($z(a+136|0)|0)){_g(30181,30255);a=0;break}if(!(pA(a+184|0)|0)){_g(30181,30282);a=0;break}if(!(rB(a+284|0)|0)){_g(30181,30310);a=0;break}if(!(xB(a+332|0)|0)){_g(30181,30334);a=0;break}if(!(EB(a+380|0)|0)){_g(30181,30367);a=0;break}if(!(RB(a+460|0)|0)){_g(30181,30394);a=0;break}if(!(_C(a+524|0)|0)){_g(30181,30423);a=0;break}if(!(_B(a+572|0)|0)){_g(30181,30461);a=0;break}if(vC(a+696|0)|0)a=1;else{_g(30181,30488);a=0}}else{_g(30181,30198);a=0}while(0);return a|0}function ZC(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;f[a>>2]=f[b>>2];d=f[b+4>>2]|0;f[a+4>>2]=d;if(d|0)SY(d);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);Wy(a+16|0,b);Xy(a+32|0,b);return}function _C(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(30520,30550);a=0}else a=1;else{_g(30520,31562);a=0}return a|0}function $C(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0.0,k=0.0;i=u;u=u+32|0;e=i+8|0;g=i;if(aD(a)|0){bD(e,b,c,d);a:do if(cD(a,e)|0){h=f[a>>2]|0;h=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;a=f[a+8>>2]|0;a=Td[f[(f[a>>2]|0)+28>>2]&255](a)|0;Hy(a);c=(Td[f[(f[d>>2]|0)+16>>2]&255](d)|0)+8|0;j=+N_(+(+n[c>>2]*4.0));nz(a+48|0,Td[f[(f[d>>2]|0)+8>>2]&255](d)|0);k=+Ik(e);zi(g,k,+Jk(e));tz(a+80|0,g);sz(a+96|0,j);sz(a+112|0,0.0);pz(a+128|0,16,0);pz(a+144|0,16,8);c=(Td[f[(f[d>>2]|0)+16>>2]&255](d)|0)+8|0;c=~~+N_(+(+n[c>>2]));a=a+64|0;b=0;while(1){if((b|0)>=(c|0)){b=1;break a}sz(a,+(b|0));je[f[(f[h>>2]|0)+104>>2]&31](h,2,4,5121,0);b=b+1|0}}else{_g(30568,30941);b=0}while(0)}else{_g(30568,30815);b=0}u=i;return b|0}function aD(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+16|0;if(Hz(a)|0)a=1;else{f[b>>2]=50462976;a=Iz(a,4,b,35044)|0}u=c;return a|0}function bD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0.0,l=0.0,m=0.0;e=u;u=u+32|0;j=e+24|0;i=e+16|0;h=e+8|0;g=e;l=+n[c>>2];k=+n[c+4>>2];c=f[(f[d>>2]|0)+28>>2]|0;m=l+ +Ik(b);zi(i,m,k+ +Hk(b));he[c&63](j,d,i);c=f[(f[d>>2]|0)+28>>2]|0;l=l+ +Gk(b);zi(h,l,k+ +Jk(b));he[c&63](i,d,h);dD(h,j,d);dD(g,i,d);Uv(a,h,g);u=e;return}function cD(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0;c=u;u=u+64|0;d=c;h=+Ik(b);e=+Hk(b);f=+Gk(b);g=+Jk(b);zi(d,h,e);zi(d+8|0,1.0,1.0);zi(d+16|0,h,g);zi(d+24|0,1.0,-1.0);zi(d+32|0,f,g);zi(d+40|0,-1.0,-1.0);zi(d+48|0,f,e);zi(d+56|0,-1.0,1.0);b=Az(a+32|0,64,d,35044)|0;u=c;return b|0}function dD(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0;e=Td[f[(f[c>>2]|0)+16>>2]&255](c)|0;e=f[e>>2]|0;c=(Td[f[(f[c>>2]|0)+16>>2]&255](c)|0)+4|0;c=f[c>>2]|0;d=+N_(+(+n[b>>2]*+(e>>>0)))+.5;zi(a,d,+N_(+((1.0-+n[b+4>>2])*+(c>>>0)))+.5);return}function eD(a,b,c){a=a|0;b=b|0;c=c|0;return fD(a,b,c,-1)|0}function fD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0;i=a+8|0;g=f[i>>2]|0;e=(f[a+12>>2]|0)-g>>3;if(e>>>0>b>>>0){h=f[g+(b<<3)+4>>2]|0;e=hD(i,f[g+(b<<3)>>2]|0,h,d,b)|0;if((e|0)==(b|0)){a=X(f[a>>2]|0,d)|0;b=iD(i,((c|0)==1?a:0-a|0)+h|0,0-d|0,b)|0}else b=e}else gD(30611,30646,b,30668,e);return b|0}function gD(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function hD(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;k=f[a>>2]|0;m=(f[a+4>>2]|0)-k>>3;l=(d|0)==0;i=0;a=0;j=0;while(1){if((j|0)==(m|0))break;g=(f[k+(j<<3)>>2]|0)-b|0;h=(g|0)>-1?g:0-g|0;if((f[k+(j<<3)+4>>2]|0)==(c|0)){g=l|(X(g,d)|0)>0;n=g&((h|0)<(a|0)|i^1);g=i|g;a=n?h:a;e=n?j:e}else g=i;i=g;j=j+1|0}return e|0}function iD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;i=f[a>>2]|0;j=(f[a+4>>2]|0)-i>>3;e=0;h=0;a=0;while(1){if((h|0)==(j|0))break;do if((f[i+(h<<3)+4>>2]|0)==(b|0)){g=f[i+(h<<3)>>2]|0;if(e?(X(g-a|0,c)|0)<=0:0){e=1;break}e=1;d=h;a=g}while(0);h=h+1|0}return d|0}function jD(a,b,c){a=a|0;b=b|0;c=c|0;return fD(a,b,c,1)|0}function kD(a,b,c){a=a|0;b=b|0;c=c|0;return lD(a,b,1,c)|0}function lD(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0;i=a+8|0;h=f[i>>2]|0;g=(f[a+12>>2]|0)-h>>3;if(g>>>0>c>>>0){if(!(b[e>>0]|0)){g=f[h+(c<<3)>>2]|0;b[e>>0]=1;f[e+4>>2]=g;e=g}else e=f[e+4>>2]|0;c=hD(i,e,(X(f[a>>2]|0,d)|0)+(f[h+(c<<3)+4>>2]|0)|0,0,c)|0}else gD(30716,30646,c,30668,g);return c|0}function mD(a,b,c){a=a|0;b=b|0;c=c|0;return lD(a,b,-1,c)|0}function nD(a,b){a=a|0;b=b|0;var c=0,d=0.0,e=0,g=0,h=0.0,i=0,j=0;g=f[a+8>>2]|0;a=f[a+12>>2]|0;a:do if((g|0)==(a|0))a=0;else{e=a-g>>3;c=1;a=0;d=+oD(g,b);while(1){if(c>>>0>=e>>>0)break a;h=+oD(g+(c<<3)|0,b);i=h<d;j=i?c:a;c=c+1|0;a=j;d=i?h:d}}while(0);return a|0}function oD(a,b){a=a|0;b=b|0;var c=0.0,d=0.0;d=+(f[a>>2]|0)-+n[b>>2];c=+(f[a+4>>2]|0)-+n[b+4>>2];return +(d*d+c*c)}function pD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;f[a>>2]=f[b>>2];e=f[b+4>>2]|0;f[a+4>>2]=e;if(e|0)SY(e);f[a+8>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+12>>2]=c;if(c|0)SY(c);KD(a+16|0,d);Wy(a+44|0,b);Xy(a+60|0,b);return}function qD(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0.0;l=u;u=u+192|0;i=l+128|0;j=l+64|0;k=l;h=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;Gv(i,h,Td[f[(f[a>>2]|0)+12>>2]&255](a)|0);a=i;h=e+64|0;do{f[e>>2]=f[a>>2];e=e+4|0;a=a+4|0}while((e|0)<(h|0));Nv(i,b,c);m=+N_(+(+n[i>>2]));Kv(j,m,+N_(+(+n[i+4>>2])));e=g;a=j;h=e+64|0;do{f[e>>2]=f[a>>2];e=e+4|0;a=a+4|0}while((e|0)<(h|0));if(!(Os(d,1.0,9.99999993922529e-09)|0)){m=1.0/d;Lv(k,m,m);Gv(j,g,k);e=g;a=j;h=e+64|0;do{f[e>>2]=f[a>>2];e=e+4|0;a=a+4|0}while((e|0)<(h|0))}u=l;return}function rD(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0;r=u;u=u+384|0;q=r+368|0;h=r+288|0;m=r+304|0;o=r+224|0;p=r+160|0;i=r+144|0;j=r+128|0;k=r+64|0;l=r;s=(Td[f[(f[c>>2]|0)+16>>2]&255](c)|0)+8|0;LD(q,a+16|0,d,+n[s>>2]);do if(!(f[q>>2]|0)){iZ(h,d);vx(30755,30778,h);jZ(h);c=0}else{if(!(sD(a)|0)){_g(30755,30815);c=0;break}Fv(m);Fv(o);s=f[q>>2]|0;qD(c,d+44|0,e,+Qd[f[(f[s>>2]|0)+24>>2]&7](s),m,o);Gv(p,m,o);mz(i,d+16|0);tD(j,i);c=f[q>>2]|0;c=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;e=f[a+8>>2]|0;e=Td[f[(f[e>>2]|0)+36>>2]&255](e)|0;Hy(e);je[f[(f[g>>2]|0)+8>>2]&31](g,770,771,1,1);if(b[d+24>>0]|0){Kv(l,0.0,-1.0);Gv(k,l,o);Gv(l,m,k);uD(a,l,7588,0,c,1,e)|0;uD(a,p,j,0,c,1,e)|0}c=uD(a,p,i,0,c,0,e)|0}while(0);XC(q);u=r;return c|0}function sD(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;a=a+44|0;if(Hz(a)|0)a=1;else{f[b>>2]=50462976;a=Iz(a,4,b,35044)|0}u=c;return a|0}function tD(a,b){a=a|0;b=b|0;if(+n[b>>2]*.30000001192092896+ +n[b+4>>2]*.5899999737739563+ +n[b+8>>2]*.10999999940395355>.75)Pz(a,0.0,0.0,0.0,1.0);else Pz(a,1.0,1.0,1.0,1.0);return}function uD(a,b,c,d,e,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;var i=0;nz(h+48|0,b);oz(h+64|0,c);i=f[e+4>>2]|0;b=1;d=f[e>>2]|0;while(1){if((d|0)==(i|0))break;c=f[d>>2]|0;if(!c)_g(30840,30870);else b=b&(vD(a,c,g,h)|0);d=d+8|0}return b|0}function vD(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0;h=u;u=u+48|0;g=h;he[f[(f[c>>2]|0)+8>>2]&63](g,c,d);do if(b[g>>0]|0)if(wD(a,g)|0){pz(e+80|0,16,0);pz(e+96|0,16,8);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);xD(e);a=1;break}else{_g(30912,30941);a=0;break}else a=0;while(0);u=h;return a|0}function wD(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0,i=0.0,j=0.0,k=0.0,l=0.0;c=u;u=u+64|0;d=c;j=+N_(+(+n[b+4>>2]));l=+N_(+(+n[b+8>>2]));h=+N_(+(+n[b+12>>2]));g=+N_(+(+n[b+16>>2]));i=+n[b+20>>2];k=+n[b+24>>2];f=+n[b+28>>2];e=+n[b+32>>2];zi(d,j,l);zi(d+8|0,i,k);zi(d+16|0,h,l);zi(d+24|0,f,k);zi(d+32|0,j,g);zi(d+40|0,i,e);zi(d+48|0,h,g);zi(d+56|0,f,e);b=Az(a+60|0,64,d,35044)|0;u=c;return b|0}function xD(a){a=a|0;wy(a+80|0);wy(a+96|0);return}function yD(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,k=0,l=0,m=0,o=0,p=0,q=0;p=u;u=u+224|0;o=p+208|0;i=p+128|0;k=p+144|0;l=p+64|0;m=p+216|0;h=p;q=(Td[f[(f[c>>2]|0)+16>>2]&255](c)|0)+8|0;LD(o,a+16|0,d,+n[q>>2]);do if(f[o>>2]|0)if(sD(a)|0){Fv(k);Fv(l);q=f[o>>2]|0;qD(c,d+44|0,e,+Qd[f[(f[q>>2]|0)+24>>2]&7](q),k,l);f[h>>2]=j[g>>1]|j[g+2>>1]<<16;b[h+4>>0]=0;uF(m,h);q=f[a+8>>2]|0;q=Td[f[(f[q>>2]|0)+16>>2]&255](q)|0;Hy(q);Gv(h,k,l);nz(q+48|0,h);Oz(h,m);oz(q+64|0,h);m=f[o>>2]|0;a=zD(a,Td[f[(f[m>>2]|0)+12>>2]&255](m)|0,q)|0;break}else{_g(30755,30815);a=0;break}else{iZ(i,d);vx(30967,30778,i);jZ(i);a=0}while(0);XC(o);u=p;return a|0}function zD(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=f[b+4>>2]|0;d=1;b=f[b>>2]|0;while(1){if((b|0)==(e|0))break;d=d&(AD(a,b,c)|0);b=b+16|0}return d|0}function AD(a,b,c){a=a|0;b=b|0;c=c|0;if(BD(a,b)|0){pz(c+80|0,12,0);qz(c+96|0,12,8);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);rz(c);a=1}else{_g(30998,31030);a=0}return a|0}function BD(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,f=0.0,g=0.0,h=0.0;c=u;u=u+48|0;d=c;g=+n[b>>2];h=+n[b+4>>2];f=+n[b+8>>2];e=+n[b+12>>2];zi(d,g,h);n[d+8>>2]=1.0;zi(d+12|0,f,h);n[d+20>>2]=1.0;zi(d+24|0,g,e);n[d+32>>2]=1.0;zi(d+36|0,f,e);n[d+44>>2]=1.0;b=Az(a+60|0,48,d,35044)|0;u=c;return b|0}function CD(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0.0,m=0,o=0,p=0,q=0,r=0,s=0.0,t=0.0,v=0.0,w=0;r=u;u=u+80|0;q=r+72|0;h=r+40|0;m=r+56|0;o=r+24|0;p=r+16|0;j=r+8|0;k=r;g=(Td[f[(f[b>>2]|0)+16>>2]&255](b)|0)+8|0;l=+n[g>>2];LD(q,a+16|0,c,l);g=f[q>>2]|0;do if(!g){iZ(h,c);vx(31072,31097,h);jZ(h);g=0}else{g=Td[f[(f[g>>2]|0)+20>>2]&255](g)|0;h=g+8|0;i=(f[g+12>>2]|0)-(f[h>>2]|0)>>3;if(i>>>0<=d>>>0){gD(31072,31130,d,31144,i);g=0;break}if(!(sD(a)|0)){_g(31072,30815);g=0;break}mz(m,c+16|0);tD(o,m);je[f[(f[e>>2]|0)+8>>2]&31](e,770,771,1,1);e=f[a+8>>2]|0;e=Td[f[(f[e>>2]|0)+16>>2]&255](e)|0;Hy(e);nz(e+48|0,Td[f[(f[b>>2]|0)+8>>2]&255](b)|0);w=f[q>>2]|0;v=+Qd[f[(f[w>>2]|0)+24>>2]&7](w);w=f[g>>2]|0;i=f[g+4>>2]|0;s=+Qd[f[(f[b>>2]|0)+20>>2]&7](b);t=+N_(+(+(w|0)/v*s));s=+N_(+(+(i|0)/v*s));l=+N_(+l);i=f[h>>2]|0;zi(p,+n[c+44>>2]+ +(f[i+(d<<3)>>2]|0)/v,+n[c+48>>2]+ +(f[i+(d<<3)+4>>2]|0)/v);he[f[(f[b>>2]|0)+28>>2]&63](k,b,p);DD(j,b,k);ED(a,e,o,j,l*3.0,t,s)|0;if(ED(a,e,m,j,l,t,s)|0)g=1;else{_g(31072,31178);g=0}}while(0);XC(q);u=r;return g|0}function DD(a,b,c){a=a|0;b=b|0;c=c|0;var d=0.0,e=0.0,g=0;e=+n[c>>2];g=Td[f[(f[b>>2]|0)+16>>2]&255](b)|0;e=e*+((f[g>>2]|0)>>>0);d=1.0-+n[c+4>>2];c=(Td[f[(f[b>>2]|0)+16>>2]&255](b)|0)+4|0;zi(a,e,d*+((f[c>>2]|0)>>>0));return}function ED(a,b,c,d,e,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;g=+g;h=+h;oz(b+64|0,c);if(FD(a,d,e,g,h)|0){pz(b+80|0,12,0);qz(b+96|0,12,8);a=f[a>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;je[f[(f[a>>2]|0)+104>>2]&31](a,5,4,5121,0);rz(b);a=1}else{_g(31198,30941);a=0}return a|0}function FD(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=+e;var f=0,g=0,h=0.0,i=0.0,j=0.0;f=u;u=u+48|0;g=f;j=c*.5;i=+N_(+(+n[b>>2]-j));h=+N_(+(i+c));j=+N_(+(+n[b+4>>2]-e-j));e=+N_(+(j+d+c));zi(g,i,j);n[g+8>>2]=1.0;zi(g+12|0,h,j);n[g+20>>2]=1.0;zi(g+24|0,i,e);n[g+32>>2]=1.0;zi(g+36|0,h,e);n[g+44>>2]=1.0;b=Az(a+60|0,48,g,35044)|0;u=f;return b|0}function GD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0.0,m=0.0,o=0.0,p=0.0,q=0.0;k=u;u=u+64|0;j=k+48|0;e=k+16|0;g=k+32|0;h=k+8|0;i=k;c=(Td[f[(f[c>>2]|0)+16>>2]&255](c)|0)+8|0;LD(j,a+16|0,b,+n[c>>2]);a=f[j>>2]|0;if(!a){iZ(e,b);vx(31234,30778,e);jZ(e);a=0}else{a=Td[f[(f[a>>2]|0)+16>>2]&255](a)|0;e=f[j>>2]|0;m=+Qd[f[(f[e>>2]|0)+24>>2]&7](e);p=+n[b+44>>2];q=+n[b+48>>2];o=p+ +n[a>>2]/m;l=q+ +n[a+4>>2]/m;p=p+ +n[a+8>>2]/m;m=q+ +n[a+12>>2]/m;zi(h,(p<o?p:o)+-15.0,(m<l?m:l)+-7.0);zi(i,(o<p?p:o)+15.0,(l<m?m:l)+7.0);Uv(g,h,i);f[d>>2]=f[g>>2];f[d+4>>2]=f[g+4>>2];f[d+8>>2]=f[g+8>>2];f[d+12>>2]=f[g+12>>2];a=1}XC(j);u=k;return a|0}function HD(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;g=g|0;var h=0,i=0,j=0;j=u;u=u+32|0;i=j+16|0;h=j;LD(i,a+16|0,c,d);a=f[i>>2]|0;a:do if(!a){iZ(h,c);vx(31269,30778,h);jZ(h)}else switch(b|0){case 7:{e=mD(Td[f[(f[a>>2]|0)+20>>2]&255](a)|0,e,g)|0;break a}case 6:{e=kD(Td[f[(f[a>>2]|0)+20>>2]&255](a)|0,e,g)|0;break a}case 4:{e=eD(Td[f[(f[a>>2]|0)+20>>2]&255](a)|0,e,f[c+40>>2]|0)|0;cr(g);break a}case 5:{e=jD(Td[f[(f[a>>2]|0)+20>>2]&255](a)|0,e,f[c+40>>2]|0)|0;cr(g);break a}default:break a}while(0);XC(i);u=j;return e|0}function ID(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;g=g|0;var h=0,i=0,j=0,k=0;k=u;u=u+32|0;j=k+24|0;h=k;i=k+16|0;LD(j,a+16|0,c,d);if(!(f[j>>2]|0)){iZ(h,c);vx(31294,30778,h);jZ(h)}else{cr(g);e=f[j>>2]|0;e=Td[f[(f[e>>2]|0)+20>>2]&255](e)|0;JD(i,b,c,f[j>>2]|0);e=nD(e,i)|0}XC(j);u=k;return e|0}function JD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0;e=+Qd[f[(f[d>>2]|0)+24>>2]&7](d);Ov(a,b,c+44|0);n[a>>2]=e*+n[a>>2];d=a+4|0;n[d>>2]=e*+n[d>>2];return}function KD(a,b){a=a|0;b=b|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;n[a+16>>2]=1.0;f[a+20>>2]=f[b>>2];b=f[b+4>>2]|0;f[a+24>>2]=b;if(b|0)SY(b);return}function LD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0,g=0,h=0,i=0,j=0,k=0;k=u;u=u+32|0;g=k+16|0;h=k+8|0;i=k;f[a>>2]=0;j=a+4|0;f[j>>2]=0;if(!(MD(b,c,d,a)|0)){f[h>>2]=f[a>>2];e=f[j>>2]|0;f[h+4>>2]=e;if(e|0)SY(e);ND(i,b,c,d,h);e=f[i>>2]|0;b=i+4|0;c=f[b>>2]|0;f[i>>2]=0;f[b>>2]=0;f[g>>2]=f[a>>2];f[a>>2]=e;f[g+4>>2]=f[j>>2];f[j>>2]=c;XC(g);XC(i);XC(h)}u=k;return}function MD(a,b,c,d){a=a|0;b=b|0;c=+c;d=d|0;var e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;i=j;g=VD(a,b)|0;if(!g)a=0;else{h=f[g+40>>2]|0;f[i>>2]=h;a=i+4|0;e=f[g+44>>2]|0;f[a>>2]=e;if(e|0)SY(e);f[i>>2]=f[d>>2];f[d>>2]=h;d=d+4|0;f[a>>2]=f[d>>2];f[d>>2]=e;XC(i);a=WD(b,c,g+20|0)|0}u=j;return a|0}function ND(a,b,c,e,g){a=a|0;b=b|0;c=c|0;e=+e;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0;l=u;u=u+48|0;i=l;k=l+12|0;j=OD(+n[c+20>>2])|0;m=f[b+20>>2]|0;h=c+28|0;ke[f[(f[m>>2]|0)+16>>2]&1](a,m,h,f[c+40>>2]|0,j,e,g);if(!(f[a>>2]|0)){iZ(i,c);vx(31335,31363,i);jZ(i)}else{Og(k,h);d[k+12>>1]=j;n[k+16>>2]=e;f[k+20>>2]=f[a>>2];a=f[a+4>>2]|0;f[k+24>>2]=a;if(a|0)SY(a);QD(PD(b,c)|0,k)|0;WC(k)}u=l;return}function OD(a){a=+a;var b=0;b=~~+N_(+(a*4.0))&65535;b=(b&65535)>4?b:4;return ((b&65535)<160?b:160)|0}function PD(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0.0,i=0.0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;B=u;u=u+32|0;A=B+4|0;t=B;v=B+16|0;f[t>>2]=c;z=xx(a+12|0,c)|0;x=a+4|0;j=f[x>>2]|0;y=(j|0)==0;a:do if(!y){o=j+-1|0;p=(o&j|0)==0;if(!p)if(z>>>0<j>>>0)q=z;else q=(z>>>0)%(j>>>0)|0;else q=o&z;d=f[(f[a>>2]|0)+(q<<2)>>2]|0;if(!d){d=q;w=22}else{r=c+11|0;s=c+4|0;b:while(1){d=f[d>>2]|0;if(!d){d=q;w=22;break a}e=f[d+4>>2]|0;if((e|0)!=(z|0)){if(!p){if(e>>>0>=j>>>0)e=(e>>>0)%(j>>>0)|0}else e=e&o;if((e|0)!=(q|0)){d=q;w=22;break a}}g=d+8|0;e=b[g+11>>0]|0;l=e<<24>>24<0;e=e&255;m=l?f[d+12>>2]|0:e;C=b[r>>0]|0;k=C<<24>>24<0;if((m|0)!=((k?f[s>>2]|0:C&255)|0))continue;k=k?f[c>>2]|0:c;if(l)if(!(yp(f[g>>2]|0,k,m)|0))break;else continue;while(1){if(!e)break a;if((b[g>>0]|0)!=(b[k>>0]|0))continue b;k=k+1|0;g=g+1|0;e=e+-1|0}}}}else{d=0;w=22}while(0);if((w|0)==22){RD(A,a,z,47253,t,v);k=a+12|0;h=+(((f[k>>2]|0)+1|0)>>>0);i=+n[a+16>>2];do if(y|i*+(j>>>0)<h){d=j<<1|(j>>>0<3|(j+-1&j|0)!=0)&1;e=~~+W(+(h/i))>>>0;SD(a,d>>>0<e>>>0?e:d);d=f[x>>2]|0;e=d+-1|0;if(!(e&d)){j=d;d=e&z;break}if(z>>>0<d>>>0){j=d;d=z}else{j=d;d=(z>>>0)%(d>>>0)|0}}while(0);e=f[(f[a>>2]|0)+(d<<2)>>2]|0;if(!e){g=a+8|0;f[f[A>>2]>>2]=f[g>>2];f[g>>2]=f[A>>2];f[(f[a>>2]|0)+(d<<2)>>2]=g;g=f[A>>2]|0;d=f[g>>2]|0;if(!d)d=A;else{d=f[d+4>>2]|0;e=j+-1|0;if(e&j){if(d>>>0>=j>>>0)d=(d>>>0)%(j>>>0)|0}else d=d&e;f[(f[a>>2]|0)+(d<<2)>>2]=g;d=A}}else{f[f[A>>2]>>2]=f[e>>2];f[e>>2]=f[A>>2];d=A}C=f[d>>2]|0;f[k>>2]=(f[k>>2]|0)+1;f[d>>2]=0;d=C}u=B;return d+20|0}function QD(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;h=u;u=u+16|0;g=h;hi(a,b)|0;e=b+12|0;d=f[e+4>>2]|0;c=a+12|0;f[c>>2]=f[e>>2];f[c+4>>2]=d;c=a+20|0;d=f[b+20>>2]|0;f[g>>2]=d;e=g+4|0;b=f[b+24>>2]|0;f[e>>2]=b;if(b|0)SY(b);f[g>>2]=f[c>>2];f[c>>2]=d;d=a+24|0;f[e>>2]=f[d>>2];f[d>>2]=b;XC(g);u=h;return a|0}function RD(a,c,d,e,g,h){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;e=XY(48)|0;f[a>>2]=e;f[a+4>>2]=c+8;h=a+8|0;b[h>>0]=0;iZ(e+8|0,f[g>>2]|0);g=e+20|0;f[g>>2]=0;f[g+4>>2]=0;f[g+8>>2]=0;f[g+12>>2]=0;f[g+16>>2]=0;f[g+20>>2]=0;f[g+24>>2]=0;UD(g);b[h>>0]=1;h=f[a>>2]|0;f[h+4>>2]=d;f[h>>2]=0;return}function SD(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=IY(b)|0}else b=2;d=f[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+W(+(+((f[a+12>>2]|0)>>>0)/+n[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(_(c+-1|0)|0);else c=IY(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)TD(a,b)}}else TD(a,b);return}
function TD(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;e=a+4|0;a:do if(c){if(c>>>0>1073741823){a=Sa(8)|0;eZ(a,38407);f[a>>2]=11336;Wa(a|0,3056,442)}t=XY(c<<2)|0;d=f[a>>2]|0;f[a>>2]=t;if(d|0)$Y(d);f[e>>2]=c;d=0;while(1){if((d|0)==(c|0))break;f[(f[a>>2]|0)+(d<<2)>>2]=0;d=d+1|0}g=a+8|0;d=f[g>>2]|0;if(d|0){e=f[d+4>>2]|0;s=c+-1|0;t=(s&c|0)==0;if(!t){if(e>>>0>=c>>>0)e=(e>>>0)%(c>>>0)|0}else e=e&s;f[(f[a>>2]|0)+(e<<2)>>2]=g;while(1){r=d;b:while(1)while(1){d=f[r>>2]|0;if(!d)break a;g=f[d+4>>2]|0;if(!t){if(g>>>0>=c>>>0)g=(g>>>0)%(c>>>0)|0}else g=g&s;if((g|0)==(e|0)){r=d;continue b}h=(f[a>>2]|0)+(g<<2)|0;if(!(f[h>>2]|0))break b;n=d+8|0;o=n+11|0;p=d+12|0;q=d;c:while(1){h=f[q>>2]|0;if(!h){i=36;break}j=h+8|0;i=b[o>>0]|0;l=i<<24>>24<0;i=i&255;m=l?f[p>>2]|0:i;u=b[j+11>>0]|0;k=u<<24>>24<0;if((m|0)!=((k?f[h+12>>2]|0:u&255)|0)){i=36;break}j=k?f[j>>2]|0:j;if(l){if(yp(f[n>>2]|0,j,m)|0){i=33;break}q=f[q>>2]|0;continue}else k=n;while(1){if(!i){q=h;continue c}if((b[k>>0]|0)!=(b[j>>0]|0)){i=35;break c}j=j+1|0;k=k+1|0;i=i+-1|0}}if((i|0)==33)h=f[q>>2]|0;f[r>>2]=h;f[q>>2]=f[f[(f[a>>2]|0)+(g<<2)>>2]>>2];f[f[(f[a>>2]|0)+(g<<2)>>2]>>2]=d}f[h>>2]=r;e=g}}}else{d=f[a>>2]|0;f[a>>2]=0;if(d|0)$Y(d);f[e>>2]=0}while(0);return}function UD(a){a=a|0;var b=0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;b=0;while(1){if((b|0)==3)break;f[a+(b<<2)>>2]=0;b=b+1|0}f[a+20>>2]=0;f[a+24>>2]=0;return}function VD(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;m=xx(a+12|0,c)|0;n=f[a+4>>2]|0;a:do if(n){o=n+-1|0;p=(o&n|0)==0;if(!p)if(m>>>0<n>>>0)l=m;else l=(m>>>0)%(n>>>0)|0;else l=o&m;a=f[(f[a>>2]|0)+(l<<2)>>2]|0;if(a){j=c+11|0;k=c+4|0;b:while(1){a=f[a>>2]|0;if(!a){a=0;break a}d=f[a+4>>2]|0;if((d|0)!=(m|0)){if(!p){if(d>>>0>=n>>>0)d=(d>>>0)%(n>>>0)|0}else d=d&o;if((d|0)==(l|0))continue;else{a=0;break}}e=a+8|0;d=b[e+11>>0]|0;h=d<<24>>24<0;d=d&255;i=h?f[a+12>>2]|0:d;q=b[j>>0]|0;g=q<<24>>24<0;if((i|0)!=((g?f[k>>2]|0:q&255)|0))continue;g=g?f[c>>2]|0:c;if(h)if(!(yp(f[e>>2]|0,g,i)|0))break;else continue;while(1){if(!d)break a;if((b[e>>0]|0)!=(b[g>>0]|0))continue b;g=g+1|0;e=e+1|0;d=d+-1|0}}}else a=0}else a=0;while(0);return a|0}function WD(a,c,e){a=a|0;c=+c;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0;l=OD(+n[a+20>>2])|0;a:do if((f[e+20>>2]|0)!=0?(j=a+28|0,g=b[e+8+3>>0]|0,k=g<<24>>24<0,g=k?f[e+4>>2]|0:g&255,h=b[a+36+3>>0]|0,i=h<<24>>24<0,(g|0)==((i?f[a+32>>2]|0:h&255)|0)):0){h=g;g=i?f[j>>2]|0:j;a=k?f[e>>2]|0:e;while(1){if(!h)break;if(ir(f[a>>2]|0,f[g>>2]|0)|0){a=0;break a}if(ir(f[g>>2]|0,f[a>>2]|0)|0){a=0;break a}h=h+-1|0;g=g+4|0;a=a+4|0}if(Os(+n[e+16>>2],c,9.99999993922529e-09)|0)a=(d[e+12>>1]|0)==l<<16>>16;else a=0}else a=0;while(0);return a|0}function XD(a,b,c){a=a|0;b=b|0;c=c|0;cE(a,b,c);return}function YD(a){a=a|0;return dE(a)|0}function ZD(a,b,c,d,e,g,h,i,j,k,l,m){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0;n=u;u=u+16|0;o=n;p=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;f[o>>2]=f[p>>2];f[o+4>>2]=f[p+4>>2];f[o+8>>2]=f[p+8>>2];f[o+12>>2]=f[p+12>>2];be[f[(f[l>>2]|0)+8>>2]&511](l);lE(a,i);mE(a,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0,c,j);yE(a,Td[f[(f[b>>2]|0)+16>>2]&255](b)|0,c,j,d,o,l,m);ZE(a,o,c,j);vE(a,Td[f[(f[b>>2]|0)+20>>2]&255](b)|0,c,j,h);be[f[(f[k>>2]|0)+8>>2]&511](k);LE(a,k,l,j);AE(a,e,c,j);JE(a,d,c,j);KE(a,g,c,j);u=n;return}function _D(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;be[f[(f[e>>2]|0)+8>>2]&511](e);lE(a,46660);ME(a,Td[f[(f[b>>2]|0)+20>>2]&255](b)|0,c,3,d);return}function $D(a,b,c){a=a|0;b=b|0;c=c|0;cE(a,b,c);return}function aE(a){a=a|0;return dE(a)|0}function bE(a,b,c,d,e,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;var i=0,j=0;i=u;u=u+16|0;j=i;be[f[(f[g>>2]|0)+8>>2]&511](g);lE(a,d);mE(a,Td[f[(f[b>>2]|0)+12>>2]&255](b)|0,c,e);d=Td[f[(f[b>>2]|0)+16>>2]&255](b)|0;f[j>>2]=0;f[j+4>>2]=0;yE(a,d,c,e,j,Td[f[(f[b>>2]|0)+8>>2]&255](b)|0,g,h);Rl(j);mE(a,Td[f[(f[b>>2]|0)+20>>2]&255](b)|0,c,e);u=i;return}function cE(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=f[b>>2];b=f[b+4>>2]|0;f[a+4>>2]=b;if(b|0)SY(b);f[a+8>>2]=f[c>>2];b=f[c+4>>2]|0;f[a+12>>2]=b;if(b|0)SY(b);return}function dE(a){a=a|0;if(f[a>>2]|0)if(!(f[a+8>>2]|0)){_g(31401,31562);a=0}else a=1;else{_g(31401,31426);a=0}return a|0}function eE(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0.0,j=0.0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;F=u;u=u+16|0;e=F;B=a+16|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;n[B>>2]=1.0;z=f[c+4>>2]|0;A=a+12|0;C=a+4|0;E=a+12|0;D=a+8|0;y=f[c>>2]|0;while(1){if((y|0)==(z|0))break;c=f[y>>2]|0;a:do if(c|0){v=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;x=xx(A,v)|0;k=f[C>>2]|0;w=(k|0)==0;b:do if(!w){q=k+-1|0;r=(q&k|0)==0;if(!r)if(x>>>0<k>>>0)c=x;else c=(x>>>0)%(k>>>0)|0;else c=q&x;g=f[(f[a>>2]|0)+(c<<2)>>2]|0;if(g){s=v+11|0;t=v+4|0;c:while(1){g=f[g>>2]|0;if(!g)break b;h=f[g+4>>2]|0;if((h|0)!=(x|0)){if(!r){if(h>>>0>=k>>>0)h=(h>>>0)%(k>>>0)|0}else h=h&q;if((h|0)!=(c|0))break b}l=g+8|0;h=b[l+11>>0]|0;o=h<<24>>24<0;h=h&255;p=o?f[g+12>>2]|0:h;G=b[s>>0]|0;m=G<<24>>24<0;if((p|0)!=((m?f[t>>2]|0:G&255)|0))continue;m=m?f[v>>2]|0:v;if(o)if(!(yp(f[l>>2]|0,m,p)|0))break a;else continue;while(1){if(!h)break a;if((b[l>>0]|0)!=(b[m>>0]|0))continue c;m=m+1|0;l=l+1|0;h=h+-1|0}}}}else c=0;while(0);fE(e,a,x,v);i=+(((f[E>>2]|0)+1|0)>>>0);j=+n[B>>2];do if(w|j*+(k>>>0)<i){c=k<<1|(k>>>0<3|(k+-1&k|0)!=0)&1;g=~~+W(+(i/j))>>>0;gE(a,c>>>0<g>>>0?g:c);c=f[C>>2]|0;g=c+-1|0;if(!(g&c)){k=c;c=g&x;break}if(x>>>0<c>>>0){k=c;c=x}else{k=c;c=(x>>>0)%(c>>>0)|0}}while(0);g=f[(f[a>>2]|0)+(c<<2)>>2]|0;if(!g){f[f[e>>2]>>2]=f[D>>2];f[D>>2]=f[e>>2];f[(f[a>>2]|0)+(c<<2)>>2]=D;h=f[e>>2]|0;c=f[h>>2]|0;if(c|0){c=f[c+4>>2]|0;g=k+-1|0;if(g&k){if(c>>>0>=k>>>0)c=(c>>>0)%(k>>>0)|0}else c=c&g;f[(f[a>>2]|0)+(c<<2)>>2]=h}}else{f[f[e>>2]>>2]=f[g>>2];f[g>>2]=f[e>>2]}f[E>>2]=(f[E>>2]|0)+1}while(0);y=y+8|0}c=f[d>>2]|0;d:do if(c|0){v=Td[f[(f[c>>2]|0)+12>>2]&255](c)|0;x=xx(A,v)|0;k=f[C>>2]|0;w=(k|0)==0;e:do if(!w){q=k+-1|0;r=(q&k|0)==0;if(!r)if(x>>>0<k>>>0)c=x;else c=(x>>>0)%(k>>>0)|0;else c=q&x;g=f[(f[a>>2]|0)+(c<<2)>>2]|0;if(g){s=v+11|0;t=v+4|0;f:while(1){g=f[g>>2]|0;if(!g)break e;h=f[g+4>>2]|0;if((h|0)!=(x|0)){if(!r){if(h>>>0>=k>>>0)h=(h>>>0)%(k>>>0)|0}else h=h&q;if((h|0)!=(c|0))break e}l=g+8|0;h=b[l+11>>0]|0;o=h<<24>>24<0;h=h&255;p=o?f[g+12>>2]|0:h;G=b[s>>0]|0;m=G<<24>>24<0;if((p|0)!=((m?f[t>>2]|0:G&255)|0))continue;m=m?f[v>>2]|0:v;if(o)if(!(yp(f[l>>2]|0,m,p)|0))break d;else continue;while(1){if(!h)break d;if((b[l>>0]|0)!=(b[m>>0]|0))continue f;m=m+1|0;l=l+1|0;h=h+-1|0}}}}else c=0;while(0);fE(e,a,x,v);j=+(((f[E>>2]|0)+1|0)>>>0);i=+n[B>>2];do if(w|i*+(k>>>0)<j){c=k<<1|(k>>>0<3|(k+-1&k|0)!=0)&1;g=~~+W(+(j/i))>>>0;gE(a,c>>>0<g>>>0?g:c);c=f[C>>2]|0;g=c+-1|0;if(!(g&c)){k=c;c=g&x;break}if(x>>>0<c>>>0){k=c;c=x}else{k=c;c=(x>>>0)%(c>>>0)|0}}while(0);g=f[(f[a>>2]|0)+(c<<2)>>2]|0;if(!g){f[f[e>>2]>>2]=f[D>>2];f[D>>2]=f[e>>2];f[(f[a>>2]|0)+(c<<2)>>2]=D;h=f[e>>2]|0;c=f[h>>2]|0;if(c){c=f[c+4>>2]|0;g=k+-1|0;if(g&k){if(c>>>0>=k>>>0)c=(c>>>0)%(k>>>0)|0}else c=c&g;f[(f[a>>2]|0)+(c<<2)>>2]=h}}else{f[f[e>>2]>>2]=f[g>>2];f[g>>2]=f[e>>2]}f[E>>2]=(f[E>>2]|0)+1;f[e>>2]=0}while(0);u=F;return}function fE(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0;g=XY(20)|0;f[a>>2]=g;f[a+4>>2]=c+8;c=a+8|0;b[c>>0]=0;iZ(g+8|0,e);b[c>>0]=1;f[g+4>>2]=d;f[g>>2]=0;return}function gE(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=IY(b)|0}else b=2;d=f[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+W(+(+((f[a+12>>2]|0)>>>0)/+n[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(_(c+-1|0)|0);else c=IY(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)kE(a,b)}}else kE(a,b);return}function hE(a){a=a|0;iE(a);return}function iE(a){a=a|0;var b=0;jE(a,f[a+8>>2]|0);b=f[a>>2]|0;f[a>>2]=0;if(b|0)$Y(b);return}function jE(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=f[b>>2]|0;jZ(b+8|0);$Y(b);b=a}return}function kE(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;e=a+4|0;a:do if(c){if(c>>>0>1073741823){a=Sa(8)|0;eZ(a,38407);f[a>>2]=11336;Wa(a|0,3056,442)}t=XY(c<<2)|0;d=f[a>>2]|0;f[a>>2]=t;if(d|0)$Y(d);f[e>>2]=c;d=0;while(1){if((d|0)==(c|0))break;f[(f[a>>2]|0)+(d<<2)>>2]=0;d=d+1|0}g=a+8|0;d=f[g>>2]|0;if(d|0){e=f[d+4>>2]|0;s=c+-1|0;t=(s&c|0)==0;if(!t){if(e>>>0>=c>>>0)e=(e>>>0)%(c>>>0)|0}else e=e&s;f[(f[a>>2]|0)+(e<<2)>>2]=g;while(1){r=d;b:while(1)while(1){d=f[r>>2]|0;if(!d)break a;g=f[d+4>>2]|0;if(!t){if(g>>>0>=c>>>0)g=(g>>>0)%(c>>>0)|0}else g=g&s;if((g|0)==(e|0)){r=d;continue b}h=(f[a>>2]|0)+(g<<2)|0;if(!(f[h>>2]|0))break b;n=d+8|0;o=n+11|0;p=d+12|0;q=d;c:while(1){h=f[q>>2]|0;if(!h){i=36;break}j=h+8|0;i=b[o>>0]|0;l=i<<24>>24<0;i=i&255;m=l?f[p>>2]|0:i;u=b[j+11>>0]|0;k=u<<24>>24<0;if((m|0)!=((k?f[h+12>>2]|0:u&255)|0)){i=36;break}j=k?f[j>>2]|0:j;if(l){if(yp(f[n>>2]|0,j,m)|0){i=33;break}q=f[q>>2]|0;continue}else k=n;while(1){if(!i){q=h;continue c}if((b[k>>0]|0)!=(b[j>>0]|0)){i=35;break c}j=j+1|0;k=k+1|0;i=i+-1|0}}if((i|0)==33)h=f[q>>2]|0;f[r>>2]=h;f[q>>2]=f[f[(f[a>>2]|0)+(g<<2)>>2]>>2];f[f[(f[a>>2]|0)+(g<<2)>>2]>>2]=d}f[h>>2]=r;e=g}}}else{d=f[a>>2]|0;f[a>>2]=0;if(d|0)$Y(d);f[e>>2]=0}while(0);return}function lE(a,b){a=a|0;b=b|0;a=f[a+8>>2]|0;a=Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;de[f[(f[a>>2]|0)+52>>2]&3](a,+n[b>>2],+n[b+4>>2],+n[b+8>>2],+n[b+12>>2]);ee[f[(f[a>>2]|0)+48>>2]&255](a,16384);return}function mE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0;g=f[b+4>>2]|0;b=f[b>>2]|0;while(1){if((b|0)==(g|0))break;e=f[b>>2]|0;if(e|0)nE(a,e,c,d,46652);b=b+8|0}return}function nE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;switch(f[b+12>>2]|0){case 4:{oE(a,b,c,d,e);break}case 5:{pE(a,b,c,d,e);break}case 1:{qE(a,b,c,d);break}case 3:{rE(a,b,c,d,e);break}case 6:{sE(a,b,c,d,e);break}case 7:{tE(a,b,c,d,e);break}case 8:{uE(a,b,c,d,e);break}default:_g(31448,31479)}return}function oE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;fz(f[a>>2]|0,c,b,e,d)|0;return}function pE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;qA((f[a>>2]|0)+184|0,c,b,e,d)|0;return}function qE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Uz((f[a>>2]|0)+80|0,c,b,d)|0;return}function rE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;FB((f[a>>2]|0)+380|0,c,b,e,d)|0;return}function sE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;$B((f[a>>2]|0)+572|0,c,b,e,d)|0;return}function tE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;rD((f[a>>2]|0)+620|0,c,b,e,d)|0;return}function uE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;wC((f[a>>2]|0)+696|0,c,b,e,d)|0;return}function vE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0;h=f[b+4>>2]|0;b=f[b>>2]|0;while(1){if((b|0)==(h|0))break;g=f[b>>2]|0;if(g|0?!(wE(e,g)|0):0)nE(a,f[b>>2]|0,c,d,46652);b=b+8|0}return}function wE(a,b){a=a|0;b=b|0;return (xE(a,b)|0)!=0|0}function xE(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;m=xx(a+12|0,c)|0;n=f[a+4>>2]|0;a:do if(n){o=n+-1|0;p=(o&n|0)==0;if(!p)if(m>>>0<n>>>0)l=m;else l=(m>>>0)%(n>>>0)|0;else l=o&m;a=f[(f[a>>2]|0)+(l<<2)>>2]|0;if(a){j=c+11|0;k=c+4|0;b:while(1){a=f[a>>2]|0;if(!a){a=0;break a}d=f[a+4>>2]|0;if((m|0)!=(d|0)){if(!p){if(d>>>0>=n>>>0)d=(d>>>0)%(n>>>0)|0}else d=d&o;if((d|0)==(l|0))continue;else{a=0;break}}e=a+8|0;d=b[e+11>>0]|0;h=d<<24>>24<0;d=d&255;i=h?f[a+12>>2]|0:d;q=b[j>>0]|0;g=q<<24>>24<0;if((i|0)!=((g?f[k>>2]|0:q&255)|0))continue;g=g?f[c>>2]|0:c;if(h)if(!(yp(f[e>>2]|0,g,i)|0))break;else continue;while(1){if(!d)break a;if((b[e>>0]|0)!=(b[g>>0]|0))continue b;g=g+1|0;e=e+1|0;d=d+-1|0}}}else a=0}else a=0;while(0);return a|0}function yE(a,b,c,d,e,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0;j=f[e>>2]|0;if(!j)l=0;else{l=(Td[f[(f[j>>2]|0)+8>>2]&255](j)|0)+12|0;l=(f[l>>2]|0)==2}j=b+4|0;if(l|(f[b>>2]|0)!=(f[j>>2]|0)){be[f[(f[i>>2]|0)+8>>2]&511](i);lE(a,46660);aA((f[a>>2]|0)+136|0,c,h+4|0,d)|0;be[f[(f[h>>2]|0)+8>>2]&511](h);k=f[j>>2]|0;j=f[b>>2]|0;while(1){if((j|0)==(k|0))break;h=f[j>>2]|0;if(h|0)zE(a,h,c,d,i,g);j=j+8|0}if(l){e=f[e>>2]|0;zE(a,Td[f[(f[e>>2]|0)+8>>2]&255](e)|0,c,d,i,g)}}return}function zE(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;gA((f[a>>2]|0)+136|0,c,b,e+4|0,g,d)|0;return}function AE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0;g=f[b+4>>2]|0;b=f[b>>2]|0;while(1){if((b|0)==(g|0))break;e=f[b>>2]|0;if(e|0){e=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;h=f[b>>2]|0;nE(a,e,c,d,Td[f[(f[h>>2]|0)+24>>2]&255](h)|0);h=f[b>>2]|0;h=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;e=f[b>>2]|0;BE(a,h,c,d,Td[f[(f[e>>2]|0)+24>>2]&255](e)|0)}b=b+8|0}return}function BE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;switch(f[b+12>>2]|0){case 4:{CE(a,b,c,d,e);break}case 5:{DE(a,b,c,0,e);break}case 3:{EE(a,b,c,d,e);break}case 6:{FE(a,b,c,d,e);break}case 8:{GE(a,b,c,d,e);break}case 7:{HE(a,b,c,0,e);break}default:{}}return}function CE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0.0,i=0;g=u;u=u+16|0;i=g;a=(f[a>>2]|0)+460|0;h=+n[b+20>>2];Nv(i,b+28|0,e);SB(a,c,i,h,d)|0;Nv(i,b+36|0,e);SB(a,c,i,h,d)|0;u=g;return}function DE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0;g=u;u=u+16|0;d=g;IE(d,b,c);if(!(Xv(d)|0))$C((f[a>>2]|0)+524|0,d,e,c)|0;u=g;return}function EE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0.0,i=0;g=u;u=u+16|0;i=g;a=(f[a>>2]|0)+460|0;h=+n[b+20>>2];Nv(i,b+28|0,e);SB(a,c,i,h,d)|0;Nv(i,b+36|0,e);SB(a,c,i,h,d)|0;u=g;return}function FE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0.0,i=0,j=0,k=0,l=0,m=0,o=0,p=0;g=u;u=u+48|0;o=g+40|0;m=g+32|0;l=g+24|0;k=g+16|0;i=g+8|0;j=g;a=(f[a>>2]|0)+460|0;h=+n[b+20>>2];p=b+40|0;zi(o,0.0,+n[p>>2]);zi(m,0.0,-+n[p>>2]);p=b+36|0;zi(l,-+n[p>>2],0.0);zi(k,+n[p>>2],0.0);b=b+28|0;Nv(j,b,o);Nv(i,j,e);SB(a,c,i,h,d)|0;Nv(j,b,m);Nv(i,j,e);SB(a,c,i,h,d)|0;Nv(j,b,l);Nv(i,j,e);SB(a,c,i,h,d)|0;Nv(j,b,k);Nv(i,j,e);SB(a,c,i,h,d)|0;u=g;return}function GE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0.0,i=0,j=0,k=0,l=0,m=0,o=0,p=0.0;g=u;u=u+48|0;m=g+32|0;l=g+24|0;k=g+16|0;j=g+8|0;i=g;a=(f[a>>2]|0)+460|0;o=b+28|0;h=+n[b+20>>2];p=+Ik(o);zi(m,p,+Jk(o));p=+Gk(o);zi(l,p,+Jk(o));p=+Ik(o);zi(k,p,+Hk(o));p=+Gk(o);zi(j,p,+Hk(o));Nv(i,m,e);SB(a,c,i,h,d)|0;Nv(i,l,e);SB(a,c,i,h,d)|0;Nv(i,k,e);SB(a,c,i,h,d)|0;Nv(i,j,e);SB(a,c,i,h,d)|0;u=g;return}function HE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0;g=u;u=u+16|0;d=g;Tv(d);if(GD((f[a>>2]|0)+620|0,b,c,d)|0)$C((f[a>>2]|0)+524|0,d,e,c)|0;u=g;return}function IE(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=u;u=u+16|0;e=d;jJ(e,b);Yv(a,e,+On(c,3.0));u=d;return}function JE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=f[b>>2]|0;if(e|0?(e=(Td[f[(f[e>>2]|0)+8>>2]&255](e)|0)+12|0,(f[e>>2]|0)!=2):0){e=f[b>>2]|0;nE(a,Td[f[(f[e>>2]|0)+8>>2]&255](e)|0,c,d,46652)}return}function KE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0;e=f[b>>2]|0;if(e|0?(g=Td[f[(f[e>>2]|0)+12>>2]&255](e)|0,nE(a,g,c,d,46652),HE(a,g,c,0,46652),e=f[b>>2]|0,Td[f[(f[e>>2]|0)+40>>2]&255](e)|0):0){a=(f[a>>2]|0)+620|0;e=f[b>>2]|0;CD(a,c,g,Td[f[(f[e>>2]|0)+32>>2]&255](e)|0,d)|0}return}function LE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;sB((f[a>>2]|0)+284|0,b,c+4|0,d)|0;return}function ME(a,c,e,g,h){a=a|0;c=c|0;e=e|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=u;u=u+16|0;m=q+8|0;n=q;o=c+4|0;p=m+2|0;l=n+4|0;k=f[c>>2]|0;while(1){if((k|0)==(f[o>>2]|0))break;b[m>>0]=g;d[p>>1]=(k-(f[c>>2]|0)|0)>>>3;i=f[k>>2]|0;f[n>>2]=i;j=f[k+4>>2]|0;f[l>>2]=j;if(j){SY(j);i=f[n>>2]|0}if(i|0?(NE(a,i,e,m),wE(h,f[n>>2]|0)|0):0)OE(a,f[n>>2]|0,e,m);ah(n);k=k+8|0}u=q;return}function NE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;switch(f[b+12>>2]|0){case 4:{TE(a,b,c,d);break}case 5:{UE(a,b,c,d);break}case 3:{VE(a,b,c,d);break}case 6:{WE(a,b,c,d);break}case 7:{XE(a,b,c,d);break}case 8:{YE(a,b,c,d);break}default:{}}return}function OE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;switch(f[b+12>>2]|0){case 4:{PE(a,b,c,d);break}case 3:{QE(a,b,c,d);break}case 6:{RE(a,b,c,d);break}case 8:{SE(a,b,c,d);break}default:{}}return}function PE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0;a=(f[a>>2]|0)+460|0;e=+n[b+20>>2];XB(a,c,b+28|0,e,d,1)|0;XB(a,c,b+36|0,e,d,2)|0;return}function QE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0.0;a=(f[a>>2]|0)+460|0;e=+n[b+20>>2];XB(a,c,b+28|0,e,d,1)|0;XB(a,c,b+36|0,e,d,2)|0;return}function RE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0.0,h=0,i=0,j=0,k=0,l=0,m=0;e=u;u=u+48|0;l=e+32|0;k=e+24|0;j=e+16|0;i=e+8|0;h=e;a=(f[a>>2]|0)+460|0;g=+n[b+20>>2];m=b+40|0;zi(l,0.0,+n[m>>2]);zi(k,0.0,-+n[m>>2]);m=b+36|0;zi(j,-+n[m>>2],0.0);zi(i,+n[m>>2],0.0);b=b+28|0;Nv(h,b,l);XB(a,c,h,g,d,1)|0;Nv(h,b,k);XB(a,c,h,g,d,2)|0;Nv(h,b,j);XB(a,c,h,g,d,3)|0;Nv(h,b,i);XB(a,c,h,g,d,4)|0;u=e;return}function SE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0.0,h=0,i=0,j=0,k=0,l=0,m=0.0;e=u;u=u+32|0;k=e+24|0;j=e+16|0;i=e+8|0;h=e;a=(f[a>>2]|0)+460|0;l=b+28|0;g=+n[b+20>>2];m=+Ik(l);zi(k,m,+Jk(l));m=+Gk(l);zi(j,m,+Jk(l));m=+Ik(l);zi(i,m,+Hk(l));m=+Gk(l);zi(h,m,+Hk(l));XB(a,c,k,g,d,1)|0;XB(a,c,j,g,d,2)|0;XB(a,c,i,g,d,3)|0;XB(a,c,h,g,d,4)|0;u=e;return}function TE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Lz(f[a>>2]|0,c,b,46652,d)|0;return}function UE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;$A((f[a>>2]|0)+184|0,c,b,46652,d)|0;return}function VE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;NB((f[a>>2]|0)+380|0,c,b,46652,d)|0;return}function WE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;sC((f[a>>2]|0)+572|0,c,b,46652,d)|0;return}function XE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;yD((f[a>>2]|0)+620|0,c,b,46652,d)|0;return}function YE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;AC((f[a>>2]|0)+696|0,c,b,46652,d)|0;return}function ZE(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;yB((f[a>>2]|0)+332|0,c,b,d)|0;return}function _E(a,b,c){a=a|0;b=b|0;c=c|0;cE(a,b,c);return}function $E(a){a=a|0;return dE(a)|0}function aF(a,b,c,d,e,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;be[f[(f[h>>2]|0)+8>>2]&511](h);LE(a,h,i,g);AE(a,d,b,g);JE(a,c,b,g);KE(a,e,b,g);return}function bF(a){a=a|0;f[a>>2]=7612;fF(a);gw(a+4|0);gF(a);return}function cF(a){a=a|0;bF(a);$Y(a);return}function dF(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0;h=f[a+4>>2]|0;if(h|0){i=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;h=a+13|0;if(!(b[h>>0]|0)){ee[f[(f[i>>2]|0)+108>>2]&255](i,3042);b[h>>0]=1}h=a+14|0;if(!(b[h>>0]|0)){he[f[(f[i>>2]|0)+148>>2]&63](i,32969,a+16|0);he[f[(f[i>>2]|0)+148>>2]&63](i,32968,a+20|0);he[f[(f[i>>2]|0)+148>>2]&63](i,32971,a+24|0);he[f[(f[i>>2]|0)+148>>2]&63](i,32970,a+28|0);b[h>>0]=1}je[f[(f[i>>2]|0)+36>>2]&31](i,c,d,e,g)}return}function eF(a){a=a|0;var c=0,d=0;c=f[a+4>>2]|0;if(c|0?(d=a+13|0,b[d>>0]|0):0){c=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;ee[f[(f[c>>2]|0)+96>>2]&255](c,3042);b[d>>0]=0}return}function fF(a){a=a|0;var c=0,d=0,e=0,g=0;g=a+4|0;c=f[g>>2]|0;if(c|0){e=b[a+12>>0]|0;do if((b[a+13>>0]|0)!=e<<24>>24){c=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;d=f[c>>2]|0;if(!(e<<24>>24)){ee[f[d+96>>2]&255](c,3042);break}else{ee[f[d+108>>2]&255](c,3042);break}}while(0);c=a+14|0;if(b[c>>0]|0){g=f[g>>2]|0;g=Td[f[(f[g>>2]|0)+8>>2]&255](g)|0;je[f[(f[g>>2]|0)+36>>2]&31](g,f[a+16>>2]|0,f[a+20>>2]|0,f[a+24>>2]|0,f[a+28>>2]|0);b[c>>0]=0}}return}function gF(a){a=a|0;return}function hF(a,c){a=a|0;c=c|0;iF(a);f[a>>2]=7612;f[a+4>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+8>>2]=c;if(c|0)SY(c);b[a+12>>0]=0;b[a+13>>0]=0;b[a+14>>0]=0;jF(a);return}function iF(a){a=a|0;f[a>>2]=7636;return}function jF(a){a=a|0;var c=0;c=f[a+4>>2]|0;if(c|0){c=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;c=(Vd[f[(f[c>>2]|0)+172>>2]&127](c,3042)|0)<<24>>24==1&1;b[a+12>>0]=c;b[a+13>>0]=c}return}function kF(a){a=a|0;Jc()}function lF(a){a=a|0;if(!(f[a+4>>2]|0)){_g(31546,31562);a=0}else a=1;return a|0}function mF(a){a=a|0;Us(a);$Y(a);return}function nF(a){a=a|0;return a+4|0}function oF(a){a=a|0;return a+68|0}function pF(a){a=a|0;return a+132|0}function qF(a){a=a|0;return 1.0}function rF(a,b,c){a=a|0;b=b|0;c=c|0;zi(a,+n[b+144>>2]+ +n[c>>2]*+((f[b+132>>2]|0)>>>0),+n[b+148>>2]+(1.0-+n[c+4>>2])*+((f[b+136>>2]|0)>>>0));return}function sF(a,b,c){a=a|0;b=b|0;c=c|0;Im(a,(+n[c>>2]-+n[b+144>>2])/+((f[b+132>>2]|0)>>>0),1.0-(+n[c+4>>2]-+n[b+148>>2])/+((f[b+136>>2]|0)>>>0));return}function tF(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0.0;j=u;u=u+64|0;h=j;iv(a);f[a>>2]=7660;e=a+4|0;Fv(e);i=a+68|0;Fv(i);g=a+132|0;b=Td[f[(f[b>>2]|0)+16>>2]&255](b)|0;f[g>>2]=f[b>>2];f[g+4>>2]=f[b+4>>2];f[g+8>>2]=f[b+8>>2];Jv(h,+((f[g>>2]|0)>>>0),+((f[a+136>>2]|0)>>>0));b=e;e=h;g=b+64|0;do{f[b>>2]=f[e>>2];b=b+4|0;e=e+4|0}while((b|0)<(g|0));e=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;k=+(f[d>>2]|0);k=+N_(+(+Ik(e)))+k;b=a+144|0;n[b>>2]=k;k=+N_(+(+Jk(e)));k=k-+(((f[d+4>>2]|0)+(f[d+12>>2]|0)|0)>>>0);n[a+148>>2]=k;Kv(h,-+n[b>>2],-k);b=i;e=h;g=b+64|0;do{f[b>>2]=f[e>>2];b=b+4|0;e=e+4|0}while((b|0)<(g|0));u=j;return}function uF(a,c){a=a|0;c=c|0;var e=0;vF(a);b[a>>0]=b[c>>0]|0;e=d[c+2>>1]|0;b[a+1>>0]=(e&65535)>>>8;b[a+2>>0]=e;b[a+3>>0]=b[c+4>>0]|0;return}function vF(a){a=a|0;wF(a,0,0,0,0);return}function wF(a,c,d,e,f){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;b[a>>0]=c;b[a+1>>0]=d;b[a+2>>0]=e;b[a+3>>0]=f;return}function xF(a,c){a=a|0;c=c|0;var e=0,f=0;e=b[c>>0]|0;if((e&255)>3)yF(a);else{f=((h[c+1>>0]|0)<<8|(h[c+2>>0]|0))&65535;c=b[c+3>>0]|0;b[a>>0]=e;d[a+2>>1]=f;b[a+4>>0]=c}return}function yF(a){a=a|0;b[a>>0]=0;d[a+2>>1]=0;b[a+4>>0]=0;return}function zF(a){a=a|0;var b=0;f[a>>2]=7700;b=a+4|0;f[b>>2]=7760;QF(a+24|0);QF(a+16|0);QF(a+8|0);$w(b);RF(a);return}function AF(a){a=a|0;zF(a);$Y(a);return}function BF(a){a=a|0;return f[a+8>>2]|0}function CF(a){a=a|0;return d[a+32>>1]|0}function DF(a){a=a|0;var b=0,c=0;c=u;u=u+16|0;b=c;f[b>>2]=0;a=f[a+8>>2]|0;he[f[(f[a>>2]|0)+148>>2]&63](a,3379,b);a=f[b>>2]|0;if(a>>>0<64){f[b>>2]=64;a=64}u=c;return a|0}function EF(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;f[d>>2]=b;b=f[a+8>>2]|0;he[f[(f[b>>2]|0)+68>>2]&63](b,1,d);u=c;return}function FF(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;f[d>>2]=b;b=f[a+8>>2]|0;he[f[(f[b>>2]|0)+72>>2]&63](b,1,d);u=c;return}function GF(a,b){a=a|0;b=b|0;a=f[a+8>>2]|0;ee[f[(f[a>>2]|0)+76>>2]&255](a,b);return}function HF(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;f[d>>2]=b;b=f[a+8>>2]|0;he[f[(f[b>>2]|0)+80>>2]&63](b,1,d);u=c;return}function IF(a,b){a=a|0;b=b|0;a=f[a+8>>2]|0;ee[f[(f[a>>2]|0)+84>>2]&255](a,b);return}function JF(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;f[d>>2]=b;b=f[a+8>>2]|0;he[f[(f[b>>2]|0)+88>>2]&63](b,1,d);u=c;return}function KF(a){a=a|0;var b=0,c=0,e=0,g=0,h=0,i=0;i=u;u=u+16|0;b=i;e=a+32|0;d[e>>1]=(d[e>>1]|0)+1<<16>>16;e=a+8|0;g=f[a+24>>2]|0;f[b>>2]=g;h=b+4|0;c=f[a+28>>2]|0;f[h>>2]=c;if(c|0)SY(c);f[b>>2]=f[e>>2];f[e>>2]=g;g=a+12|0;f[h>>2]=f[g>>2];f[g>>2]=c;QF(b);u=i;return}function LF(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,g=0,h=0,i=0;i=u;u=u+16|0;e=i;g=a+32|0;d[g>>1]=(d[g>>1]|0)+1<<16>>16;g=a+8|0;h=f[a+16>>2]|0;f[e>>2]=h;b=e+4|0;c=f[a+20>>2]|0;f[b>>2]=c;if(c|0)SY(c);f[e>>2]=f[g>>2];f[g>>2]=h;a=a+12|0;f[b>>2]=f[a>>2];f[a>>2]=c;QF(e);u=i;return 1}function MF(a){a=a|0;zF(a+-4|0);return}function NF(a){a=a|0;AF(a+-4|0);return}function OF(a){a=a|0;KF(a+-4|0);return}function PF(a,b,c){a=a|0;b=b|0;c=c|0;LF(a+-4|0,0,0)|0;return 1}function QF(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function RF(a){a=a|0;return}function SF(a,b){a=a|0;b=b|0;var c=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;h=j+4|0;i=j;TF(a);c=a+4|0;dx(c);f[a>>2]=7700;f[c>>2]=7760;f[a+8>>2]=f[b>>2];c=b+4|0;e=f[c>>2]|0;f[a+12>>2]=e;if(e|0)SY(e);f[a+16>>2]=f[b>>2];b=f[c>>2]|0;f[a+20>>2]=b;if(b|0)SY(b);g=a+24|0;b=YY(56,47264)|0;if(!b)b=0;else{c=b;e=c+56|0;do{f[c>>2]=0;c=c+4|0}while((c|0)<(e|0));UF(b)}f[i>>2]=0;f[h>>2]=f[i>>2];VF(g,b,h);d[a+32>>1]=0;u=j;return}function TF(a){a=a|0;f[a>>2]=8300;return}function UF(a){a=a|0;_F(a);f[a>>2]=7812;Gh(a+8|0);$F(a+32|0);return}function VF(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=7784;f[c+12>>2]=b;f[a+4>>2]=c;return}function WF(a){a=a|0;NY(a);$Y(a);return}function XF(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function YF(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==31672?a+12|0:0)|0}function ZF(a){a=a|0;$Y(a);return}function _F(a){a=a|0;f[a>>2]=8056;return}function $F(a){a=a|0;f[a+16>>2]=0;return}function aG(a){a=a|0;f[a>>2]=7812;fH(a+32|0);Bh(a+8|0);gH(a);return}function bG(a){a=a|0;aG(a);$Y(a);return}function cG(a){a=a|0;return a+8|0}function dG(a){a=a|0;return a+32|0}function eG(a,b,c){a=a|0;b=b|0;c=c|0;return}function fG(a,b,c){a=a|0;b=b|0;c=c|0;return}function gG(a,b,c){a=a|0;b=b|0;c=c|0;return}function hG(a,b,c){a=a|0;b=b|0;c=c|0;return}function iG(a,b,c){a=a|0;b=b|0;c=c|0;return}function jG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function kG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function lG(a,b){a=a|0;b=b|0;return 36061}function mG(a,b){a=a|0;b=b|0;return}function nG(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;return}function oG(a,b){a=a|0;b=b|0;return}function pG(a){a=a|0;return 0}function qG(a,b){a=a|0;b=b|0;return 0}function rG(a,b,c){a=a|0;b=b|0;c=c|0;return}function sG(a,b,c){a=a|0;b=b|0;c=c|0;return}function tG(a,b){a=a|0;b=b|0;return}function uG(a,b,c){a=a|0;b=b|0;c=c|0;return}function vG(a,b){a=a|0;b=b|0;return}function wG(a,b,c){a=a|0;b=b|0;c=c|0;return}function xG(a,b,c){a=a|0;b=b|0;c=c|0;return}function yG(a,b){a=a|0;b=b|0;return}function zG(a,b){a=a|0;b=b|0;return}function AG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function BG(a,b){a=a|0;b=b|0;return}function CG(a,b){a=a|0;b=b|0;return}function DG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function EG(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return}function FG(a,b,c){a=a|0;b=b|0;c=c|0;return}function GG(a,b,c){a=a|0;b=b|0;c=c|0;return}function HG(a,b,c){a=a|0;b=b|0;c=c|0;return}function IG(a,b,c){a=a|0;b=b|0;c=c|0;return}function JG(a,b,c){a=a|0;b=b|0;c=c|0;return 0}function KG(a){a=a|0;return 0}function LG(a,b,c){a=a|0;b=b|0;c=c|0;return}function MG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function NG(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return}function OG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function PG(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return}function QG(a,b,c){a=a|0;b=b|0;c=c|0;return 0}function RG(a,b){a=a|0;b=b|0;return 0}function SG(a,b){a=a|0;b=b|0;return}function TG(a,b,c){a=a|0;b=b|0;c=c|0;return}function UG(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return}function VG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function WG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function XG(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;return}function YG(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return}function ZG(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;return}function _G(a,b,c){a=a|0;b=b|0;c=+c;return}function $G(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return}function aH(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return}function bH(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function cH(a,b){a=a|0;b=b|0;return}function dH(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return}function eH(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return}function fH(a){a=a|0;hH(a);return}function gH(a){a=a|0;return}function hH(a){a=a|0;var b=0;b=f[a+16>>2]|0;if((a|0)!=(b|0)){if(b|0)be[f[(f[b>>2]|0)+20>>2]&511](b)}else be[f[(f[b>>2]|0)+16>>2]&511](b);return}function iH(a){a=a|0;Jc()}function jH(a){a=a|0;Jc()}function kH(a){a=a|0;if((f[a+8>>2]|0)!=0?(f[a+16>>2]|0)!=0:0)if(!(f[a+24>>2]|0)){_g(31874,31926);a=1}else a=1;else{_g(31874,31899);a=0}return a|0}function lH(a){a=a|0;var b=0,c=0,d=0;f[a>>2]=8352;c=a+4|0;if(f[c>>2]|0)DH(a);EH(a+88|0);FH(a+76|0);d=a+52|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){GH(b);$Y(b)}d=a+48|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){GH(b);$Y(b)}d=a+44|0;b=f[d>>2]|0;f[d>>2]=0;if(b|0){GH(b);$Y(b)}HH(a+36|0);IH(a+28|0);JH(a+20|0);KH(a+12|0);QF(c);LH(a);return}function mH(a){a=a|0;lH(a);$Y(a);return}function nH(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;g=g|0;return HD((f[a+36>>2]|0)+620|0,b,c,d,e,g)|0}function oH(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;g=g|0;return ID((f[a+36>>2]|0)+620|0,b,c,d,e,g)|0}function pH(a,c,e,g,h,i){a=a|0;c=c|0;e=e|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;q=u;u=u+64|0;n=q+56|0;o=q+24|0;p=q;if(!(b[a+72>>0]|0))ol(n,30);else{f[p>>2]=f[a+12>>2];j=f[a+16>>2]|0;f[p+4>>2]=j;if(j|0)SY(j);hF(o,p);gw(p);if(lF(o)|0){j=a+20|0;k=f[j>>2]|0;k=Td[f[(f[k>>2]|0)+8>>2]&255](k)|0;l=f[j>>2]|0;l=Td[f[(f[l>>2]|0)+12>>2]&255](l)|0;m=f[j>>2]|0;m=Td[f[(f[m>>2]|0)+16>>2]&255](m)|0;r=l+4|0;s=Td[f[(f[r>>2]|0)+12>>2]&255](r)|0;r=Td[f[(f[r>>2]|0)+16>>2]&255](r)|0;wH(a,k,s,r);wH(a,l,s,r);wH(a,m,s,r);eE(p,h,i);if(CH(a,g)|0)aF(f[a+52>>2]|0,c,g,h,i,o,k,l);else{s=a+44|0;ZD(f[s>>2]|0,e,c,g,h,i,p,a+56|0,o,k,l,m);eF(o);_D(f[s>>2]|0,e,c,p,m);be[f[(f[l>>2]|0)+16>>2]&511](l);be[f[(f[m>>2]|0)+16>>2]&511](m)}s=f[j>>2]|0;s=Td[f[(f[s>>2]|0)+8>>2]&255](s)|0;be[f[(f[s>>2]|0)+8>>2]&511](s);ol(n,0);hE(p)}else{_g(32267,32046);ol(n,22)}bF(o)}u=q;return d[n>>1]|0}function qH(a,c,e,g,h,i){a=a|0;c=c|0;e=e|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;n=u;u=u+64|0;k=n+56|0;l=n+24|0;m=n;if(!(b[a+72>>0]|0))ol(k,30);else{f[m>>2]=f[a+12>>2];j=f[a+16>>2]|0;f[m+4>>2]=j;if(j|0)SY(j);hF(l,m);gw(m);if(lF(l)|0){j=a+20|0;o=f[j>>2]|0;o=Td[f[(f[o>>2]|0)+12>>2]&255](o)|0;j=f[j>>2]|0;j=Td[f[(f[j>>2]|0)+16>>2]&255](j)|0;p=o+4|0;q=Td[f[(f[p>>2]|0)+12>>2]&255](p)|0;p=Td[f[(f[p>>2]|0)+16>>2]&255](p)|0;wH(a,o,q,p);wH(a,j,q,p);g=xH(a,c,e,l,g)|0;be[f[(f[o>>2]|0)+20>>2]&511](o);eF(l);eE(m,h,i);_D(f[a+44>>2]|0,e,c,m,j);be[f[(f[j>>2]|0)+16>>2]&511](j);d[k>>1]=g;hE(m)}else{_g(32011,32046);ol(k,22)}bF(l)}u=n;return d[k>>1]|0}function rH(a){a=a|0;if(b[a+72>>0]|0){a=f[a+20>>2]|0;a=Td[f[(f[a>>2]|0)+12>>2]&255](a)|0;be[f[(f[a>>2]|0)+20>>2]&511](a)}return}function sH(a,c){a=a|0;c=c|0;var e=0,g=0;g=u;u=u+16|0;e=g;do if(b[a+72>>0]|0)if(Ns(c)|0){c=gx(f[a+20>>2]|0,f[c>>2]|0,f[c+4>>2]|0)|0;ol(e,c?0:10);break}else{ol(e,21);break}else ol(e,30);while(0);u=g;return d[e>>1]|0}function tH(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0.0;j=u;u=u+16|0;i=j+4|0;g=j;do if(!(b[c+72>>0]|0))yF(a);else{h=f[c+12>>2]|0;h=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;e=c+20|0;c=f[e>>2]|0;c=Td[f[(f[c>>2]|0)+16>>2]&255](c)|0;e=f[e>>2]|0;e=Td[f[(f[e>>2]|0)+8>>2]&255](e)|0;if(!(Td[f[(f[c>>2]|0)+12>>2]&255](c)|0)){_g(31947,31978);yF(a);break}m=+n[d>>2];l=c+4|0;k=~~+N_(+(m*+((Td[f[(f[l>>2]|0)+12>>2]&255](l)|0)>>>0)));m=1.0-+n[d+4>>2];d=~~+N_(+(m*+((Td[f[(f[l>>2]|0)+16>>2]&255](l)|0)>>>0)));be[f[(f[c>>2]|0)+8>>2]&511](c);vF(i);he[f[(f[h>>2]|0)+148>>2]&63](h,3333,g);he[f[(f[h>>2]|0)+180>>2]&63](h,3333,4);ne[f[(f[h>>2]|0)+184>>2]&3](h,k,d,1,1,6408,5121,i);c=f[g>>2]|0;if((c|0)!=4)he[f[(f[h>>2]|0)+180>>2]&63](h,3333,c);be[f[(f[e>>2]|0)+8>>2]&511](e);xF(a,i)}while(0);u=j;return}function uH(a){a=a|0;return a+88|0}function vH(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return GD((f[a+36>>2]|0)+620|0,b,c,d)|0}function wH(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;be[f[(f[b>>2]|0)+8>>2]&511](b);b=f[a+12>>2]|0;b=Td[f[(f[b>>2]|0)+8>>2]&255](b)|0;je[f[(f[b>>2]|0)+232>>2]&31](b,0,0,c,d);return}function xH(a,b,c,e,g){a=a|0;b=b|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0;A=u;u=u+32|0;t=A+20|0;y=A+16|0;z=A;m=f[a+12>>2]|0;m=Td[f[(f[m>>2]|0)+8>>2]&255](m)|0;n=Td[f[(f[b>>2]|0)+16>>2]&255](b)|0;n=f[n>>2]|0;o=(Td[f[(f[b>>2]|0)+16>>2]&255](b)|0)+4|0;o=f[o>>2]|0;s=Td[f[(f[c>>2]|0)+8>>2]&255](c)|0;p=~~+N_(+(+Ik(s)));q=~~+N_(+(+Hk(s)));r=~~+N_(+(+Gk(s)));s=~~+N_(+(+Jk(s)));if(Xd[f[(f[g>>2]|0)+8>>2]&63](g,r-p|0,s-q|0)|0){he[f[(f[m>>2]|0)+148>>2]&63](m,3333,y);he[f[(f[m>>2]|0)+180>>2]&63](m,3333,4);v=z+4|0;w=z+8|0;x=z+12|0;h=1;l=p;while(1){if(!((l|0)<(r|0)&h))break;j=r-l|0;j=(j|0)<(n|0)?j:n;k=l-p|0;i=q;h=1;while(1){if(!((i|0)<(s|0)&h))break;h=s-i|0;f[z>>2]=k;f[v>>2]=i-q;f[w>>2]=j;f[x>>2]=(h|0)<(o|0)?h:o;i=i+o|0;h=yH(a,b,c,e,z,g)|0}l=l+n|0}he[f[(f[m>>2]|0)+180>>2]&63](m,3333,f[y>>2]|0);ol(t,h?0:10)}else ol(t,10);u=A;return d[t>>1]|0}function yH(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0;i=u;u=u+16|0;h=i;zH(32068,32110,f[e>>2]|0,32137,f[e+4>>2]|0,32145,f[e+8>>2]|0,32155,f[e+12>>2]|0);he[f[(f[g>>2]|0)+12>>2]&63](h,g,e);if(!(f[h>>2]|0)){_g(32068,32166);a=0}else{AH(a,b,c,d,e);a=BH(a,e,h)|0;he[f[(f[g>>2]|0)+16>>2]&63](g,e,h);ee[f[(f[g>>2]|0)+20>>2]&255](g,h)}u=i;return a|0}function zH(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;return}function AH(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0;g=u;u=u+176|0;i=g+152|0;h=g;Pz(i,1.0,1.0,1.0,0.0);tF(h,b,c,e);j=f[a+48>>2]|0;e=a+20|0;b=f[e>>2]|0;b=Td[f[(f[b>>2]|0)+12>>2]&255](b)|0;e=f[e>>2]|0;bE(j,c,h,i,d,b,Td[f[(f[e>>2]|0)+16>>2]&255](e)|0);Us(h);u=g;return}function BH(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;h=f[a+12>>2]|0;h=Td[f[(f[h>>2]|0)+8>>2]&255](h)|0;i=b+8|0;g=c+4|0;a:do if((f[g>>2]|0)>>>0<f[i>>2]<<2>>>0){_g(32225,32247);a=0}else{e=b+12|0;d=0;a=f[c>>2]|0;while(1){b=f[e>>2]|0;if(b>>>0<=d>>>0){a=1;break a}ne[f[(f[h>>2]|0)+184>>2]&3](h,0,b+~d|0,f[i>>2]|0,1,6408,5121,a);d=d+1|0;a=a+(f[g>>2]|0)|0}}while(0);return a|0}function CH(a,b){a=a|0;b=b|0;b=f[b>>2]|0;if(!b)b=1;else{b=(Td[f[(f[b>>2]|0)+8>>2]&255](b)|0)+12|0;b=(f[b>>2]|0)!=2}a=f[a+20>>2]|0;a=Td[f[(f[a>>2]|0)+12>>2]&255](a)|0;return b&(Td[f[(f[a>>2]|0)+12>>2]&255](a)|0)|0}function DH(a){a=a|0;var b=0;a=a+4|0;b=f[a>>2]|0;Vs(Td[f[(f[b>>2]|0)+8>>2]&255](b)|0);a=f[a>>2]|0;NH(Td[f[(f[a>>2]|0)+12>>2]&255](a)|0);return}function EH(a){a=a|0;_s(a);return}function FH(a){a=a|0;var b=0,c=0,d=0;b=f[a>>2]|0;if(b|0){c=a+4|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;MH(d)}$Y(f[a>>2]|0)}return}function GH(a){a=a|0;gw(a+8|0);HH(a);return}function HH(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function IH(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function JH(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function KH(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function LH(a){a=a|0;return}function MH(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function NH(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;f[c+16>>2]=0;OH(a,c)|0;hH(c);u=b;return}function OH(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+32|0;d=c;PH(d,b);QH(d,a);hH(d);u=c;return a|0}function PH(a,b){a=a|0;b=b|0;var c=0,d=0;c=b+16|0;d=f[c>>2]|0;do if(d)if((b|0)==(d|0)){d=RH(a)|0;f[a+16>>2]=d;c=f[c>>2]|0;ee[f[(f[c>>2]|0)+12>>2]&255](c,d);break}else{d=Td[f[(f[d>>2]|0)+8>>2]&255](d)|0;f[a+16>>2]=d;break}else f[a+16>>2]=0;while(0);return}function QH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;d=j;do if((b|0)!=(a|0)){h=a+16|0;e=f[h>>2]|0;g=e;i=b+16|0;if((e|0)==(a|0)){c=f[i>>2]|0;if((c|0)==(b|0)){b=RH(d)|0;d=f[h>>2]|0;ee[f[(f[d>>2]|0)+12>>2]&255](d,b);d=f[h>>2]|0;be[f[(f[d>>2]|0)+16>>2]&511](d);f[h>>2]=0;d=f[i>>2]|0;a=f[(f[d>>2]|0)+12>>2]|0;g=RH(e)|0;ee[a&255](d,g);g=f[i>>2]|0;be[f[(f[g>>2]|0)+16>>2]&511](g);f[i>>2]=0;g=RH(e)|0;f[h>>2]=g;g=f[(f[b>>2]|0)+12>>2]|0;h=RH(c)|0;ee[g&255](b,h);be[f[(f[b>>2]|0)+16>>2]&511](b);h=RH(c)|0;f[i>>2]=h;break}else{g=f[(f[e>>2]|0)+12>>2]|0;i=RH(b)|0;ee[g&255](e,i);i=f[h>>2]|0;be[f[(f[i>>2]|0)+16>>2]&511](i);i=b+16|0;f[h>>2]=f[i>>2];h=RH(b)|0;f[i>>2]=h;break}}else{c=f[i>>2]|0;if((b|0)==(c|0)){g=f[(f[c>>2]|0)+12>>2]|0;b=RH(a)|0;ee[g&255](c,b);b=f[i>>2]|0;be[f[(f[b>>2]|0)+16>>2]&511](b);f[i>>2]=f[h>>2];i=RH(a)|0;f[h>>2]=i;break}else{f[h>>2]=c;f[i>>2]=g;break}}}while(0);u=j;return}function RH(a){a=a|0;return a|0}function SH(a,c,d,e,g,h){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;G=u;u=u+64|0;F=G+48|0;q=G+40|0;r=G+32|0;l=G+24|0;m=G+16|0;o=G+8|0;p=G;TH(a);f[a>>2]=8352;k=a+4|0;f[k>>2]=f[c>>2];c=f[c+4>>2]|0;f[a+8>>2]=c;if(c|0)SY(c);v=a+12|0;w=a+16|0;y=a+20|0;A=a+24|0;D=a+28|0;E=a+32|0;x=a+36|0;n=a+40|0;s=a+44|0;t=a+48|0;z=a+52|0;c=a+56|0;i=v;j=i+44|0;do{f[i>>2]=0;i=i+4|0}while((i|0)<(j|0));UH(c,g);b[a+72>>0]=1;B=a+76|0;f[B>>2]=0;C=a+80|0;f[C>>2]=0;f[a+84>>2]=0;VH(a+88|0);if(f[k>>2]|0){c=YY(36,47264)|0;if(!c)c=0;else SF(c,k);f[r>>2]=0;f[F>>2]=f[r>>2];WH(q,c,F);k=f[q>>2]|0;f[q>>2]=f[v>>2];f[v>>2]=k;k=q+4|0;c=f[k>>2]|0;f[k>>2]=f[w>>2];f[w>>2]=c;KH(q);c=f[v>>2]|0;if(c|0?kH(c)|0:0){i=f[v>>2]|0;f[F>>2]=(i|0)==0?0:i+4|0;i=F+4|0;c=f[w>>2]|0;f[i>>2]=c;if(c|0)SY(c);c=f[C>>2]|0;g=a+84|0;if(c>>>0<(f[g>>2]|0)>>>0){f[c>>2]=f[F>>2];f[c+4>>2]=f[i>>2];f[F>>2]=0;f[i>>2]=0;f[C>>2]=c+8}else XH(B,F);MH(F);c=f[h>>2]|0;if(c|0){i=f[(f[c>>2]|0)+20>>2]|0;f[F>>2]=f[v>>2];j=f[w>>2]|0;f[F+4>>2]=j;if(j|0)SY(j);ee[i&255](c,F);gw(F);f[F>>2]=f[h>>2];i=F+4|0;c=f[h+4>>2]|0;f[i>>2]=c;if(c|0)SY(c);c=f[C>>2]|0;if(c>>>0<(f[g>>2]|0)>>>0){f[c>>2]=f[F>>2];f[c+4>>2]=f[i>>2];f[F>>2]=0;f[i>>2]=0;f[C>>2]=c+8}else XH(B,F);MH(F)}c=f[d>>2]|0;if(c|0){i=f[(f[c>>2]|0)+20>>2]|0;f[F>>2]=f[v>>2];j=f[w>>2]|0;f[F+4>>2]=j;if(j|0)SY(j);ee[i&255](c,F);gw(F);f[F>>2]=f[d>>2];i=F+4|0;c=f[d+4>>2]|0;f[i>>2]=c;if(c|0)SY(c);c=f[C>>2]|0;if(c>>>0<(f[g>>2]|0)>>>0){f[c>>2]=f[F>>2];f[c+4>>2]=f[i>>2];f[F>>2]=0;f[i>>2]=0;f[C>>2]=c+8}else XH(B,F);MH(F)}c=YY(28,47264)|0;if(!c){i=0;c=0}else{f[l>>2]=f[v>>2];i=f[w>>2]|0;f[l+4>>2]=i;if(i|0)SY(i);bx(c,l,e);i=1}f[r>>2]=0;f[F>>2]=f[r>>2];YH(q,c,F);k=f[q>>2]|0;f[q>>2]=f[y>>2];f[y>>2]=k;k=q+4|0;e=f[k>>2]|0;f[k>>2]=f[A>>2];f[A>>2]=e;JH(q);if(i)gw(l);j=YY(48,47264)|0;if(!j){i=0;c=0}else{f[m>>2]=f[v>>2];c=f[w>>2]|0;f[m+4>>2]=c;if(c|0)SY(c);zy(j,m);i=1;c=j}f[r>>2]=0;f[F>>2]=f[r>>2];ZH(q,c,F);e=f[q>>2]|0;f[q>>2]=f[D>>2];f[D>>2]=e;e=q+4|0;l=f[e>>2]|0;f[e>>2]=f[E>>2];f[E>>2]=l;IH(q);if(i)gw(m);c=YY(744,47264)|0;if(!c){i=0;c=0}else{f[o>>2]=f[v>>2];i=f[w>>2]|0;f[o+4>>2]=i;if(i|0)SY(i);f[p>>2]=f[D>>2];i=f[E>>2]|0;f[p+4>>2]=i;if(i|0)SY(i);EC(c,o,p,d,h);i=1}f[r>>2]=0;f[F>>2]=f[r>>2];_H(q,c,F);h=f[q>>2]|0;f[q>>2]=f[x>>2];f[x>>2]=h;h=q+4|0;r=f[h>>2]|0;f[h>>2]=f[n>>2];f[n>>2]=r;HH(q);if(i){_y(p);gw(o)}i=YY(16,47264)|0;if(!i){c=f[s>>2]|0;f[s>>2]=0;if(c|0){GH(c);$Y(c)}}else{f[F>>2]=f[v>>2];c=f[w>>2]|0;f[F+4>>2]=c;if(c|0)SY(c);XD(i,x,F);c=f[s>>2]|0;f[s>>2]=i;if(c|0){GH(c);$Y(c)}gw(F)}i=YY(16,47264)|0;if(!i){c=f[t>>2]|0;f[t>>2]=0;if(c|0){GH(c);$Y(c)}}else{f[F>>2]=f[v>>2];c=f[w>>2]|0;f[F+4>>2]=c;if(c|0)SY(c);$D(i,x,F);c=f[t>>2]|0;f[t>>2]=i;if(c|0){GH(c);$Y(c)}gw(F)}i=YY(16,47264)|0;do if(!i){c=f[z>>2]|0;f[z>>2]=0;if(!c)break;GH(c);$Y(c)}else{f[F>>2]=f[v>>2];c=f[w>>2]|0;f[F+4>>2]=c;if(c|0)SY(c);_E(i,x,F);c=f[z>>2]|0;f[z>>2]=i;if(c|0){GH(c);$Y(c)}gw(F)}while(0);i=f[y>>2]|0;f[F>>2]=(i|0)==0?0:i+4|0;i=F+4|0;c=f[A>>2]|0;f[i>>2]=c;if(c|0)SY(c);c=f[C>>2]|0;if(c>>>0<(f[g>>2]|0)>>>0){f[c>>2]=f[F>>2];f[c+4>>2]=f[i>>2];f[F>>2]=0;f[i>>2]=0;f[C>>2]=c+8}else XH(B,F);MH(F);i=f[D>>2]|0;f[F>>2]=(i|0)==0?0:i+4|0;i=F+4|0;c=f[E>>2]|0;f[i>>2]=c;if(c|0)SY(c);c=f[C>>2]|0;if(c>>>0<(f[g>>2]|0)>>>0){f[c>>2]=f[F>>2];f[c+4>>2]=f[i>>2];f[F>>2]=0;f[i>>2]=0;f[C>>2]=c+8}else XH(B,F);MH(F);$H(a)}}u=G;return}function TH(a){a=a|0;YI(a);f[a>>2]=8604;return}function UH(a,b){a=a|0;b=b|0;n[a>>2]=+(h[b>>0]|0)/255.0;n[a+4>>2]=+(h[b+1>>0]|0)/255.0;n[a+8>>2]=+(h[b+2>>0]|0)/255.0;n[a+12>>2]=+(h[b+3>>0]|0)/255.0;return}function VH(a){a=a|0;f[a+16>>2]=0;return}function WH(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=8576;f[c+12>>2]=b;f[a+4>>2]=c;return}function XH(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;c=h;d=a+4|0;e=((f[d>>2]|0)-(f[a>>2]|0)>>3)+1|0;g=QI(a)|0;if(g>>>0<e>>>0)MY(a);else{i=f[a>>2]|0;k=(f[a+8>>2]|0)-i|0;j=k>>2;RI(c,k>>3>>>0<g>>>1>>>0?(j>>>0<e>>>0?e:j):g,(f[d>>2]|0)-i>>3,a+8|0);g=c+8|0;e=f[g>>2]|0;f[e>>2]=f[b>>2];d=b+4|0;f[e+4>>2]=f[d>>2];f[b>>2]=0;f[d>>2]=0;f[g>>2]=e+8;SI(a,c);TI(c);u=h;return}}function YH(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=8548;f[c+12>>2]=b;f[a+4>>2]=c;return}function ZH(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=8520;f[c+12>>2]=b;f[a+4>>2]=c;return}function _H(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=8492;f[c+12>>2]=b;f[a+4>>2]=c;return}function $H(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0;b=u;u=u+64|0;e=b+56|0;h=b+24|0;j=b+52|0;c=b;g=b+48|0;d=a+4|0;i=f[d>>2]|0;i=Td[f[(f[i>>2]|0)+8>>2]&255](i)|0;f[j>>2]=a;f[e>>2]=f[j>>2];aI(h,e);tt(i,h);Dh(h);d=f[d>>2]|0;d=Td[f[(f[d>>2]|0)+12>>2]&255](d)|0;f[g>>2]=a;f[e>>2]=f[g>>2];bI(c,e);cI(d,c);hH(c);u=b;return}function aI(a,b){a=a|0;b=b|0;f[a>>2]=8448;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function bI(a,b){a=a|0;b=b|0;f[a>>2]=8404;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function cI(a,b){a=a|0;b=b|0;OH(a,b)|0;return}function dI(a){a=a|0;return}function eI(a){a=a|0;$Y(a);return}function fI(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=8404;f[b+4>>2]=f[a+4>>2];return b|0}function gI(a,b){a=a|0;b=b|0;f[b>>2]=8404;f[b+4>>2]=f[a+4>>2];return}function hI(a){a=a|0;return}function iI(a){a=a|0;$Y(a);return}function jI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;mI(a+4|0,b,c,d);return}function kI(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==32383?a+4|0:0)|0}function lI(a){a=a|0;return 1888}function mI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;nI(a,b,c,d);return}function nI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;oI(f[a>>2]|0,b,c,d);return}function oI(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0;b[e>>0]=1;i=a+72|0;if(!(b[i>>0]|0)){j=a+76|0;k=a+80|0;h=0;while(1){g=f[j>>2]|0;if(h>>>0>=(f[k>>2]|0)-g>>3>>>0)break;g=f[g+(h<<3)>>2]|0;if(g|0?!(Xd[f[(f[g>>2]|0)+12>>2]&63](g,c,d)|0):0){Xl(32451,32490,h,32513);b[e>>0]=0}h=h+1|0}k=b[e>>0]|0;b[i>>0]=k;if(k<<24>>24)pI(a+88|0,d)}return}function pI(a,b){a=a|0;b=b|0;if(f[a+16>>2]|0)qI(a,b);return}function qI(a,b){a=a|0;b=b|0;a=f[a+16>>2]|0;if(!a){b=Sa(4)|0;f[b>>2]=0;wh(b);Wa(b|0,288,50)}else{ee[f[(f[a>>2]|0)+24>>2]&255](a,b);return}}function rI(a){a=a|0;$Y(a);return}function sI(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=8448;f[b+4>>2]=f[a+4>>2];return b|0}function tI(a,b){a=a|0;b=b|0;f[b>>2]=8448;f[b+4>>2]=f[a+4>>2];return}function uI(a){a=a|0;return}function vI(a){a=a|0;$Y(a);return}function wI(a){a=a|0;zI(a+4|0);return}function xI(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==32796?a+4|0:0)|0}function yI(a){a=a|0;return 1920}function zI(a){a=a|0;AI(a);return}function AI(a){a=a|0;BI(f[a>>2]|0);return}function BI(a){a=a|0;var c=0,d=0;c=a+72|0;a:do if(b[c>>0]|0){b[c>>0]=0;d=f[a+80>>2]|0;c=f[a+76>>2]|0;while(1){if((c|0)==(d|0))break a;a=f[c>>2]|0;if(a|0)be[f[(f[a>>2]|0)+8>>2]&511](a);c=c+8|0}}while(0);return}function CI(a){a=a|0;DI(a+696|0);FC(a+620|0);GC(a+572|0);HC(a+524|0);IC(a+460|0);JC(a+380|0);KC(a+332|0);LC(a+284|0);MC(a+184|0);NC(a+136|0);OC(a+80|0);PC(a);return}function DI(a){a=a|0;Zy(a+32|0);Yy(a+16|0);_y(a+8|0);gw(a);return}function EI(a){a=a|0;NY(a);$Y(a);return}function FI(a){a=a|0;a=f[a+12>>2]|0;if(a|0){CI(a);$Y(a)}return}function GI(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==32984?a+12|0:0)|0}function HI(a){a=a|0;$Y(a);return}function II(a){a=a|0;NY(a);$Y(a);return}function JI(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function KI(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==33133?a+12|0:0)|0}function LI(a){a=a|0;$Y(a);return}function MI(a){a=a|0;NY(a);$Y(a);return}function NI(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function OI(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==33294?a+12|0:0)|0}function PI(a){a=a|0;$Y(a);return}function QI(a){a=a|0;return 536870911}function RI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>536870911){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<3)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<3)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<3);return}function SI(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;d=f[a>>2]|0;e=a+4|0;g=b+4|0;c=f[e>>2]|0;while(1){if((c|0)==(d|0))break;j=f[g>>2]|0;h=c+-8|0;f[j+-8>>2]=f[h>>2];i=c+-4|0;f[j+-4>>2]=f[i>>2];f[h>>2]=0;f[i>>2]=0;f[g>>2]=(f[g>>2]|0)+-8;c=h}h=f[a>>2]|0;f[a>>2]=f[g>>2];f[g>>2]=h;h=b+8|0;j=f[e>>2]|0;f[e>>2]=f[h>>2];f[h>>2]=j;h=a+8|0;j=b+12|0;i=f[h>>2]|0;f[h>>2]=f[j>>2];f[j>>2]=i;f[b>>2]=f[g>>2];return}function TI(a){a=a|0;var b=0,c=0,d=0;b=f[a+4>>2]|0;c=a+8|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;MH(d)}a=f[a>>2]|0;if(a|0)$Y(a);return}function UI(a){a=a|0;NY(a);$Y(a);return}function VI(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function WI(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==33453?a+12|0:0)|0}function XI(a){a=a|0;$Y(a);return}function YI(a){a=a|0;f[a>>2]=8656;return}function ZI(a){a=a|0;Jc()}function _I(a){a=a|0;Jc()}function $I(a){a=a|0;var b=0;do if(!(f[a+4>>2]|0)){_g(33620,33649);b=0}else{b=f[a+12>>2]|0;if(b|0?kH(b)|0:0){b=f[a+20>>2]|0;if(b|0?_w(b)|0:0){b=f[a+28>>2]|0;if(b|0?ky(b)|0:0){b=f[a+36>>2]|0;if(b|0?YC(b)|0:0){b=f[a+44>>2]|0;if(b|0?YD(b)|0:0){b=f[a+48>>2]|0;if(b|0?aE(b)|0:0){b=f[a+52>>2]|0;if(b|0?$E(b)|0:0){b=1;break}_g(33620,33871);b=0;break}_g(33620,33827);b=0;break}_g(33620,33788);b=0;break}_g(33620,33759);b=0;break}_g(33620,33725);b=0;break}_g(33620,33692);b=0;break}_g(33620,33663);b=0}while(0);return b|0}function aJ(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0;l=u;u=u+32|0;i=l+16|0;k=l+8|0;j=l;if(((f[b>>2]|0)!=0?(f[c>>2]|0)!=0:0)?(f[g>>2]|0)!=0:0){h=YY(112,47264)|0;if(!h)h=0;else SH(h,b,c,d,e,g);f[j>>2]=0;f[i>>2]=f[j>>2];bJ(k,h,i);h=f[k>>2]|0;if((h|0)!=0?$I(h)|0:0){ol(a,0);f[a+4>>2]=f[k>>2];h=f[k+4>>2]|0;f[a+8>>2]=h;if(h|0)SY(h)}else{_g(33911,33939);ol(a,22);f[a+4>>2]=0;f[a+8>>2]=0}cJ(k)}else{ol(a,20);f[a+4>>2]=0;f[a+8>>2]=0}u=l;return}function bJ(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=8680;f[c+12>>2]=b;f[a+4>>2]=c;return}function cJ(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function dJ(a){a=a|0;NY(a);$Y(a);return}function eJ(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function fJ(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==33970?a+12|0:0)|0}function gJ(a){a=a|0;$Y(a);return}function hJ(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0.0,x=0.0,y=0.0;t=u;u=u+128|0;d=t+104|0;k=t+96|0;l=t+88|0;m=t+80|0;o=t+72|0;p=t+64|0;q=t+56|0;r=t+40|0;s=t+24|0;e=t+16|0;g=t+8|0;h=t;i=c+28|0;j=c+36|0;if(Rv(i,j)|0){zi(d,0.0,0.0);zi(k,0.0,0.0);Uv(a,d,k)}else{x=+xv(i,j);v=c+20|0;y=+n[v>>2]*.699999988079071;x=x/(y*14.100000381469727);w=+M(+x,.30000001192092896);x=x>1.0?w:x;w=y*3.5*x;x=y*6.099999904632568*x;Ov(l,i,j);Cv(d,l);Bv(m,d);Bv(o,l);Qv(k,o,x);Nv(d,j,k);Qv(q,m,w);Nv(p,d,q);Qv(k,o,x);Nv(d,j,k);Qv(r,m,w);Ov(q,d,r);f[r>>2]=f[p>>2];f[r+4>>2]=f[q>>2];f[r+8>>2]=f[i>>2];f[r+12>>2]=f[j>>2];f[s>>2]=f[p+4>>2];f[s+4>>2]=f[q+4>>2];f[s+8>>2]=f[c+32>>2];f[s+12>>2]=f[c+40>>2];b[d>>0]=b[k>>0]|0;iJ(e,r,r+16|0,d);b[d>>0]=b[k>>0]|0;iJ(g,s,s+16|0,d);zi(k,+n[f[e>>2]>>2],+n[f[g>>2]>>2]);zi(h,+n[f[e+4>>2]>>2],+n[f[g+4>>2]>>2]);Uv(d,k,h);Yv(a,d,+n[v>>2]*.5)}u=t;return}function iJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0.0,h=0,i=0.0,j=0.0,k=0;d=b;f[a>>2]=d;k=a+4|0;f[k>>2]=d;a:do if((b|0)!=(c|0)?(h=b+4|0,e=h,(h|0)!=(c|0)):0){f[(+n[h>>2]<+n[b>>2]?a:k)>>2]=e;while(1){b=e+4|0;if((b|0)==(c|0))break a;d=e+8|0;e=d;if((d|0)==(c|0))break;g=+n[d>>2];i=+n[b>>2];j=+n[f[a>>2]>>2];if(g<i){if(g<j)f[a>>2]=e;if(i<+n[f[k>>2]>>2])continue;f[k>>2]=b;continue}else{if(i<j)f[a>>2]=b;if(g<+n[f[k>>2]>>2])continue;f[k>>2]=e;continue}}g=+n[b>>2];if(!(g<+n[f[a>>2]>>2]))if(g<+n[f[k>>2]>>2])break;else a=k;f[a>>2]=b}while(0);return}function jJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,g=0.0,h=0.0,i=0.0,j=0,k=0,l=0,m=0,o=0,p=0.0,q=0.0;o=u;u=u+32|0;j=o+16|0;k=o+8|0;l=o;c=f[b+28>>2]|0;m=f[b+32>>2]|0;if((c|0)==(m|0)){zi(j,0.0,0.0);zi(k,0.0,0.0);Uv(a,j,k)}else{i=+n[c>>2];g=+n[c+4>>2];e=g;h=i;while(1){d=c+8|0;if((d|0)==(m|0))break;p=+n[d>>2];q=+n[c+12>>2];e=q>e?q:e;g=q<g?q:g;h=p>h?p:h;i=p<i?p:i;c=d}zi(k,i,g);zi(l,h,e);Uv(j,k,l);Yv(a,j,+n[b+20>>2]*1.5*.5)}u=o;return}function kJ(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;Uv(d,b+28|0,b+36|0);Yv(a,d,+n[b+20>>2]*.5);u=c;return}function lJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0,g=0.0,h=0.0,i=0.0,j=0.0;c=u;u=u+32|0;d=c+16|0;f=c+8|0;e=c;j=+n[b+28>>2];h=+n[b+32>>2];i=+n[b+36>>2];g=+n[b+40>>2];zi(f,j-i,h-g);zi(e,j+i,h+g);Uv(d,f,e);Yv(a,d,+n[b+20>>2]*.5);u=c;return}function mJ(a,b){a=a|0;b=b|0;Yv(a,b+28|0,+n[b+20>>2]*.5);return}function nJ(a){a=a|0;f[a>>2]=8708;VJ(a+104|0);Bh(a+80|0);WJ(a+64|0);WJ(a+52|0);WJ(a+40|0);XJ(a);return}function oJ(a){a=a|0;nJ(a);$Y(a);return}function pJ(a){a=a|0;return a+8|0}function qJ(a){a=a|0;return a+40|0}function rJ(a){a=a|0;return a+52|0}function sJ(a){a=a|0;return a+64|0}function tJ(a,c,e){a=a|0;c=c|0;e=e|0;var g=0;g=b[e>>0]|0;if(!(g<<24>>24)){f[a>>2]=0;f[a+4>>2]=0}else{g=TJ(c,g)|0;UJ(a,g,d[e+2>>1]|0)}return}function uJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0;g=u;u=u+16|0;e=g;f[e>>2]=0;d=e+4|0;f[d>>2]=0;if((!(SJ(b+64|0,c,e)|0)?!(SJ(b+52|0,c,e)|0):0)?!(SJ(b+40|0,c,e)|0):0){f[a>>2]=0;d=a+4|0}else{f[a>>2]=f[e>>2];f[a+4>>2]=f[d>>2];f[e>>2]=0}f[d>>2]=0;ah(e);u=g;return}function vJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=f[b>>2]|0;if(c|0?(d=CJ(a,f[c+12>>2]|0)|0,!(RJ(d,c)|0)):0){e=d+4|0;c=f[e>>2]|0;if((c|0)==(f[d+8>>2]|0))EJ(d,b);else{f[c>>2]=f[b>>2];b=f[b+4>>2]|0;f[c+4>>2]=b;if(b){SY(b);c=f[e>>2]|0}f[e>>2]=c+8}FJ(a);uh(a+80|0)}return}function wJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;f[a>>2]=0;f[a+4>>2]=0;if(!(QJ(b+64|0,c,a)|0)?!(QJ(b+52|0,c,a)|0):0){iZ(d,c);Vz(34231,34245,d,34268);jZ(d)}else{FJ(b);uh(b+80|0)}u=e;return}function xJ(a,c,e){a=a|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=u;u=u+32|0;m=r+20|0;l=r+16|0;k=r+12|0;n=r+8|0;o=r+4|0;p=r;q=c+64|0;g=DJ(q,e)|0;i=g;j=c+68|0;h=f[j>>2]|0;if((g|0)!=(h|0)){e=(i-(f[q>>2]|0)|0)>>>3&65535;if((g|0)==(h+-8|0)){g=e;h=0}else{g=g+8|0;if((g|0)!=(h|0)){f[n>>2]=i;f[o>>2]=g;f[p>>2]=h;f[k>>2]=f[n>>2];f[l>>2]=f[o>>2];f[m>>2]=f[p>>2];PJ(k,l,m)|0}uh(c+80|0);g=(((f[j>>2]|0)-(f[q>>2]|0)|0)>>>3)+65535&65535;h=1}}else{g=0;h=0;e=0}b[a>>0]=h;d[a+2>>1]=e;d[a+4>>1]=g;u=r;return}function yJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=u;u=u+32|0;j=r+28|0;i=r+24|0;h=r+20|0;m=r+12|0;n=r+4|0;o=r;p=r+16|0;d=r+8|0;c=c&65535;e=a+64|0;g=a+68|0;if((f[g>>2]|0)-(f[e>>2]|0)>>3>>>0>c>>>0?(k=DJ(e,b)|0,l=k,(k|0)!=(f[g>>2]|0)):0){c=(f[e>>2]|0)+(c<<3)|0;e=c;if(k>>>0>=c>>>0){if(c>>>0<k>>>0){f[m>>2]=e;f[n>>2]=l;f[o>>2]=k+8;f[h>>2]=f[m>>2];f[i>>2]=f[n>>2];f[j>>2]=f[o>>2];c=PJ(h,i,j)|0;q=7}}else{f[m>>2]=l;f[n>>2]=k+8;f[o>>2]=c+8;f[h>>2]=f[m>>2];f[i>>2]=f[n>>2];f[j>>2]=f[o>>2];c=PJ(h,i,j)|0;d=p;q=7}if((q|0)==7)f[d>>2]=c;uh(a+80|0)}u=r;return}function zJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0;i=u;u=u+16|0;h=i;c=f[b>>2]|0;if(c|0){d=CJ(a,f[c+12>>2]|0)|0;c=DJ(d,c)|0;e=d+4|0;do if((c|0)==(f[e>>2]|0)){if((c|0)==(f[d+8>>2]|0)){EJ(d,b);break}f[c>>2]=f[b>>2];d=f[b+4>>2]|0;f[c+4>>2]=d;if(d){SY(d);c=f[e>>2]|0}f[e>>2]=c+8}else{e=f[b>>2]|0;f[h>>2]=e;g=h+4|0;d=f[b+4>>2]|0;f[g>>2]=d;if(d|0)SY(d);f[h>>2]=f[c>>2];f[c>>2]=e;b=c+4|0;f[g>>2]=f[b>>2];f[b>>2]=d;ah(h)}while(0);FJ(a);uh(a+80|0)}u=i;return}function AJ(a){a=a|0;return a+80|0}function BJ(a){a=a|0;return a+104|0}function CJ(a,b){a=a|0;b=b|0;switch(b|0){case 1:{a=a+40|0;break}case 2:{a=a+52|0;break}default:a=a+64|0}return a|0}function DJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;e=u;u=u+16|0;d=e;g=f[a>>2]|0;c=f[a+4>>2]|0;f[d>>2]=b;a=g;while(1){if((a|0)==(c|0)){a=c;break}if(OJ(d,a)|0)break;a=a+8|0}u=e;return a|0}function EJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;g=h;c=a+4|0;d=((f[c>>2]|0)-(f[a>>2]|0)>>3)+1|0;e=KJ(a)|0;if(e>>>0<d>>>0)MY(a);i=f[a>>2]|0;k=(f[a+8>>2]|0)-i|0;j=k>>2;LJ(g,k>>3>>>0<e>>>1>>>0?(j>>>0<d>>>0?d:j):e,(f[c>>2]|0)-i>>3,a+8|0);e=g+8|0;c=f[e>>2]|0;f[c>>2]=f[b>>2];d=f[b+4>>2]|0;f[c+4>>2]=d;if(d){SY(d);c=f[e>>2]|0}f[e>>2]=c+8;MJ(a,g);NJ(g);u=h;return}function FJ(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;l=u;u=u+64|0;e=l+48|0;g=l+32|0;h=l+16|0;i=l;j=a+24|0;f[e>>2]=f[j>>2];f[e+4>>2]=f[j+4>>2];f[e+8>>2]=f[j+8>>2];f[e+12>>2]=f[j+12>>2];k=f[a+68>>2]|0;d=f[a+64>>2]|0;while(1){if((d|0)==(k|0))break;if(f[d>>2]|0){Tv(g);b=f[d>>2]|0;switch(f[b+12>>2]|0){case 3:{kJ(h,b);f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];f[g+8>>2]=f[h+8>>2];f[g+12>>2]=f[h+12>>2];c=14;break}case 4:{hJ(h,b);f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];f[g+8>>2]=f[h+8>>2];f[g+12>>2]=f[h+12>>2];c=14;break}case 5:{jJ(h,b);f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];f[g+8>>2]=f[h+8>>2];f[g+12>>2]=f[h+12>>2];c=14;break}case 6:{lJ(h,b);f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];f[g+8>>2]=f[h+8>>2];f[g+12>>2]=f[h+12>>2];c=14;break}case 8:{mJ(h,b);f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];f[g+8>>2]=f[h+8>>2];f[g+12>>2]=f[h+12>>2];c=14;break}case 7:{if(GJ(a,b,g)|0)c=14;else{b=f[d>>2]|0;c=13}break}default:c=13}if((c|0)==13){iZ(i,b);HJ(34145,34173,i,34184);jZ(i)}else if((c|0)==14?(0,!($v(j,g)|0)):0){Yv(h,g,5.0);f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];f[g+8>>2]=f[h+8>>2];f[g+12>>2]=f[h+12>>2];Zv(h,e,g);f[e>>2]=f[h>>2];f[e+4>>2]=f[h+4>>2];f[e+8>>2]=f[h+8>>2];f[e+12>>2]=f[h+12>>2]}}d=d+8|0}k=a+8|0;f[k>>2]=f[e>>2];f[k+4>>2]=f[e+4>>2];f[k+8>>2]=f[e+8>>2];f[k+12>>2]=f[e+12>>2];u=l;return}function GJ(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0;g=u;u=u+32|0;h=g+16|0;e=g;b[h>>0]=0;Tv(e);IJ(a+104|0,c,h,e);if(!(b[h>>0]|0))a=0;else{f[d>>2]=f[e>>2];f[d+4>>2]=f[e+4>>2];f[d+8>>2]=f[e+8>>2];f[d+12>>2]=f[e+12>>2];a=1}u=g;return a|0}function HJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return}function IJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(f[a+16>>2]|0)JJ(a,b,c,d);return}function JJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=f[a+16>>2]|0;if(!a){d=Sa(4)|0;f[d>>2]=0;wh(d);Wa(d|0,288,50)}else{ie[f[(f[a>>2]|0)+24>>2]&31](a,b,c,d);return}}function KJ(a){a=a|0;return 536870911}function LJ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>536870911){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<3)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<3)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<3);return}function MJ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;d=f[a>>2]|0;e=a+4|0;g=b+4|0;c=f[e>>2]|0;while(1){if((c|0)==(d|0))break;j=f[g>>2]|0;h=c+-8|0;f[j+-8>>2]=f[h>>2];i=c+-4|0;f[j+-4>>2]=f[i>>2];f[h>>2]=0;f[i>>2]=0;f[g>>2]=(f[g>>2]|0)+-8;c=h}h=f[a>>2]|0;f[a>>2]=f[g>>2];f[g>>2]=h;h=b+8|0;j=f[e>>2]|0;f[e>>2]=f[h>>2];f[h>>2]=j;h=a+8|0;j=b+12|0;i=f[h>>2]|0;f[h>>2]=f[j>>2];f[j>>2]=i;f[b>>2]=f[g>>2];return}function NJ(a){a=a|0;var b=0,c=0,d=0;b=f[a+4>>2]|0;c=a+8|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;ah(d)}a=f[a>>2]|0;if(a|0)$Y(a);return}function OJ(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;h=f[c>>2]|0;d=f[a>>2]|0;c=b[h+11>>0]|0;g=c<<24>>24<0;c=c&255;e=g?f[h+4>>2]|0:c;i=b[d+11>>0]|0;a=i<<24>>24<0;a:do if((e|0)==((a?f[d+4>>2]|0:i&255)|0)){d=a?f[d>>2]|0:d;if(g){c=(yp(f[h>>2]|0,d,e)|0)==0;break}a=h;while(1){if(!c){c=1;break a}if((b[a>>0]|0)!=(b[d>>0]|0)){c=0;break a}d=d+1|0;a=a+1|0;c=c+-1|0}}else c=0;while(0);return c|0}function PJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;m=u;u=u+16|0;l=m;i=f[c>>2]|0;g=f[a>>2]|0;d=l;e=b;a:while(1){f[d>>2]=f[e>>2];h=f[b>>2]|0;e=f[l>>2]|0;do{j=f[g>>2]|0;f[g>>2]=f[e>>2];f[e>>2]=j;j=g+4|0;d=e+4|0;k=f[j>>2]|0;f[j>>2]=f[d>>2];f[d>>2]=k;g=g+8|0;e=e+8|0;d=(g|0)==(h|0);if((e|0)==(i|0))break a}while(!d);f[a>>2]=h;f[l>>2]=e;g=h;d=b;e=l}f[a>>2]=g;f[l>>2]=i;if(!d){d=l;e=b;while(1){f[d>>2]=f[e>>2];h=f[c>>2]|0;e=f[b>>2]|0;d=f[l>>2]|0;i=f[a>>2]|0;while(1){n=f[i>>2]|0;f[i>>2]=f[d>>2];f[d>>2]=n;n=i+4|0;j=d+4|0;k=f[n>>2]|0;f[n>>2]=f[j>>2];f[j>>2]=k;i=i+8|0;d=d+8|0;j=(i|0)==(e|0);if((d|0)==(h|0)){k=10;break}if(j){k=7;break}}if((k|0)==7){f[a>>2]=e;f[l>>2]=d;d=b;e=l;continue}else if((k|0)==10){f[a>>2]=i;f[l>>2]=h;if(j)break;else{d=l;e=b;continue}}}}u=m;return g|0}function QJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;i=u;u=u+16|0;h=i;e=DJ(a,b)|0;g=a+4|0;a:do if((e|0)==(f[g>>2]|0))b=0;else{a=f[e>>2]|0;f[h>>2]=a;d=h+4|0;b=f[e+4>>2]|0;f[d>>2]=b;if(b|0)SY(b);f[h>>2]=f[c>>2];f[c>>2]=a;c=c+4|0;f[d>>2]=f[c>>2];f[c>>2]=b;ah(h);d=f[g>>2]|0;c=h+4|0;a=e;while(1){b=a+8|0;if((b|0)==(d|0))break;e=f[b>>2]|0;k=a+12|0;j=f[k>>2]|0;f[b>>2]=0;f[k>>2]=0;f[h>>2]=f[a>>2];f[a>>2]=e;e=a+4|0;f[c>>2]=f[e>>2];f[e>>2]=j;ah(h);a=b}while(1){b=f[g>>2]|0;if((b|0)==(a|0)){b=1;break a}k=b+-8|0;f[g>>2]=k;ah(k)}}while(0);u=i;return b|0}function RJ(a,b){a=a|0;b=b|0;b=DJ(a,b)|0;return (b|0)!=(f[a+4>>2]|0)|0}function SJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0;g=u;u=u+16|0;e=g;b=DJ(a,b)|0;if((b|0)==(f[a+4>>2]|0))b=0;else{a=f[b>>2]|0;f[e>>2]=a;d=e+4|0;b=f[b+4>>2]|0;f[d>>2]=b;if(b|0)SY(b);f[e>>2]=f[c>>2];f[c>>2]=a;c=c+4|0;f[d>>2]=f[c>>2];f[c>>2]=b;ah(e);b=1}u=g;return b|0}function TJ(a,b){a=a|0;b=b|0;switch(b<<24>>24){case 1:{a=a+40|0;break}case 2:{a=a+52|0;break}default:a=a+64|0}return a|0}function UJ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=c&65535;e=f[b>>2]|0;c=e;if((f[b+4>>2]|0)-e>>3>>>0>d>>>0){f[a>>2]=f[c+(d<<3)>>2];c=f[c+(d<<3)+4>>2]|0;f[a+4>>2]=c;if(c|0)SY(c)}else{f[a>>2]=0;f[a+4>>2]=0}return}function VJ(a){a=a|0;dt(a);return}function WJ(a){a=a|0;var b=0,c=0,d=0;b=f[a>>2]|0;if(b|0){c=a+4|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;ah(d)}$Y(f[a>>2]|0)}return}function XJ(a){a=a|0;return}function YJ(a,c){a=a|0;c=c|0;var d=0,e=0,g=0;ZJ(a);f[a>>2]=8708;b[a+4>>0]=0;Tv(a+8|0);Tv(a+24|0);d=a+80|0;e=a+40|0;g=e+36|0;do{f[e>>2]=0;e=e+4|0}while((e|0)<(g|0));Gh(d);_J(a+104|0);if(f[c>>2]|0)$J(a,c);return}function ZJ(a){a=a|0;f[a>>2]=8776;return}function _J(a){a=a|0;f[a+16>>2]=0;return}function $J(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;g=j;h=(f[c>>2]|0)+28|0;i=a+24|0;f[i>>2]=f[h>>2];f[i+4>>2]=f[h+4>>2];f[i+8>>2]=f[h+8>>2];f[i+12>>2]=f[h+12>>2];L_(a+8|0,h|0,16)|0;h=f[c>>2]|0;f[g>>2]=h;i=g+4|0;c=f[c+4>>2]|0;f[i>>2]=c;if(c|0)SY(c);d=a+44|0;e=f[d>>2]|0;if(e>>>0<(f[a+48>>2]|0)>>>0){f[e>>2]=h;f[e+4>>2]=c;f[g>>2]=0;f[i>>2]=0;f[d>>2]=e+8}else aK(a+40|0,g);ah(g);b[a+4>>0]=1;u=j;return}function aK(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;c=h;d=a+4|0;e=((f[d>>2]|0)-(f[a>>2]|0)>>3)+1|0;g=KJ(a)|0;if(g>>>0<e>>>0)MY(a);else{i=f[a>>2]|0;k=(f[a+8>>2]|0)-i|0;j=k>>2;LJ(c,k>>3>>>0<g>>>1>>>0?(j>>>0<e>>>0?e:j):g,(f[d>>2]|0)-i>>3,a+8|0);g=c+8|0;e=f[g>>2]|0;f[e>>2]=f[b>>2];d=b+4|0;f[e+4>>2]=f[d>>2];f[b>>2]=0;f[d>>2]=0;f[g>>2]=e+8;MJ(a,c);NJ(c);u=h;return}}function bK(a){a=a|0;Jc()}function cK(a){a=a|0;return (b[a+4>>0]|0)!=0|0}function dK(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=u;u=u+80|0;i=o+64|0;l=o+52|0;g=o+32|0;m=o+24|0;h=o+48|0;n=o+8|0;j=o;k=o+16|0;ee[f[(f[e>>2]|0)+8>>2]&255](l,e);zi(i,0.0,0.0);zi(m,+(c>>>0),+(d>>>0));Uv(g,i,m);c=YY(44,47264)|0;if(!c)c=0;else eK(c,l,b,g);f[h>>2]=0;f[i>>2]=f[h>>2];fK(m,c,i);h=f[m>>2]|0;c=h;if(!h){_g(34312,34331);ol(a,22);f[a+4>>2]=0;f[a+8>>2]=0}else{d=YY(128,47264)|0;if(!d){f[k>>2]=0;f[i>>2]=f[k>>2];gK(n,0,i)}else{f[j>>2]=c;c=f[m+4>>2]|0;f[j+4>>2]=c;if(c|0)SY(c);YJ(d,j);f[k>>2]=0;f[i>>2]=f[k>>2];gK(n,d,i);hK(j)}c=f[n>>2]|0;if((c|0)!=0?cK(c)|0:0){ol(a,0);f[a+4>>2]=f[n>>2];c=f[n+4>>2]|0;f[a+8>>2]=c;if(c|0)SY(c)}else{_g(34312,34355);ol(a,22);f[a+4>>2]=0;f[a+8>>2]=0}iK(n)}jK(m);jZ(l);u=o;return}function eK(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Je(a,b,1);iZ(a+16|0,c);c=a+28|0;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];f[c+8>>2]=f[d+8>>2];f[c+12>>2]=f[d+12>>2];return}function fK(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=8872;f[c+12>>2]=b;f[a+4>>2]=c;return}function gK(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=8844;f[c+12>>2]=b;f[a+4>>2]=c;return}function hK(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function iK(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function jK(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function kK(a){a=a|0;NY(a);$Y(a);return}function lK(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function mK(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==34374?a+12|0:0)|0}function nK(a){a=a|0;$Y(a);return}function oK(a){a=a|0;jZ(a+16|0);Le(a);return}function pK(a){a=a|0;NY(a);$Y(a);return}function qK(a){a=a|0;a=f[a+12>>2]|0;if(a|0){oK(a);$Y(a)}return}function rK(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==34501?a+12|0:0)|0}function sK(a){a=a|0;$Y(a);return}function tK(){uK();return}function uK(){vK(0);return}function vK(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;a=u;u=u+16|0;b=a+8|0;g=a;wK(b,34640);xK(xK(xK(b,34648,0)|0,34652,1)|0,34658,2)|0;yK(b);zK(b,34663);AK(AK(AK(AK(b,34648,0)|0,34652,1)|0,34658,2)|0,34680,3)|0;BK(b);CK(b,34686);DK(DK(b,34694,0)|0,34696,4)|0;EK(b);FK(b,34698);GK(GK(b,34705,0)|0,34711,4)|0;HK(b);IK(b,34718);KK(JK(JK(b,34705,0)|0,34711,4)|0,34731,8)|0;LK(b);MK(b,34749);NK(NK(NK(NK(NK(NK(NK(NK(b,34756,0)|0,34761,1)|0,34766,2)|0,34772,3)|0,34778,4)|0,34783,5)|0,34793,6)|0,34798,7)|0;OK(b,34803);PK(PK(b,34819,0)|0,34831,1)|0;QK(b,34843);RK(RK(RK(RK(RK(RK(RK(RK(b,34862,0)|0,34876,1)|0,34884,2)|0,34894,3)|0,34901,4)|0,34916,5)|0,34932,6)|0,34945,7)|0;SK(b,34960);$K(_K(ZK(YK(XK(WK(VK(UK(TK(b,34980,0)|0,34991,4)|0,35001,6)|0,35011,8)|0,35016,12)|0,35027,24)|0,35043,28)|0,35058,40)|0,35073,48)|0;aL(b);bL();h=cL()|0;d=dL()|0;m=eL()|0;l=fL()|0;k=gL()|0;j=hL()|0;i=iL()|0;e=jL()|0;c=jL()|0;db(m|0,l|0,k|0,j|0,i|0,151,e|0,h|0,c|0,d|0,35091,kL()|0,455);d=eL()|0;c=nL(b)|0;h=oL(b)|0;eb(d|0,c|0,h|0,iL()|0,152,1);f[b>>2]=95;f[b+4>>2]=0;h=eL()|0;c=rL(g)|0;d=sL(g)|0;e=tL()|0;fb(h|0,35100,c|0,d|0,e|0,31,uL(b)|0,0);f[b>>2]=153;f[b+4>>2]=0;e=eL()|0;d=wL(g)|0;c=xL(g)|0;h=yL()|0;fb(e|0,41721,d|0,c|0,h|0,96,zL(b)|0,0);f[b>>2]=97;f[b+4>>2]=0;h=eL()|0;c=BL(g)|0;d=CL(g)|0;e=tL()|0;fb(h|0,35107,c|0,d|0,e|0,32,DL(b)|0,0);f[b>>2]=98;f[b+4>>2]=0;e=eL()|0;d=FL(g)|0;c=GL(g)|0;h=tL()|0;fb(e|0,35115,d|0,c|0,h|0,33,HL(b)|0,0);f[b>>2]=99;f[b+4>>2]=0;h=eL()|0;c=JL(g)|0;d=KL(g)|0;e=tL()|0;fb(h|0,35128,c|0,d|0,e|0,34,LL(b)|0,0);f[b>>2]=100;f[b+4>>2]=0;e=eL()|0;d=NL(g)|0;c=OL(g)|0;h=tL()|0;fb(e|0,41845,d|0,c|0,h|0,35,PL(b)|0,0);f[b>>2]=3;f[b+4>>2]=0;h=eL()|0;c=RL(g)|0;d=SL(g)|0;e=TL()|0;fb(h|0,41852,c|0,d|0,e|0,1,UL(b)|0,0);f[b>>2]=3;f[b+4>>2]=0;e=eL()|0;d=WL(g)|0;c=XL(g)|0;h=YL()|0;fb(e|0,35137,d|0,c|0,h|0,4,ZL(b)|0,0);f[b>>2]=4;f[b+4>>2]=0;h=eL()|0;c=WL(g)|0;d=XL(g)|0;e=YL()|0;fb(h|0,35159,c|0,d|0,e|0,4,ZL(b)|0,0);f[b>>2]=101;f[b+4>>2]=0;e=eL()|0;d=$L(g)|0;c=aM(g)|0;h=tL()|0;fb(e|0,35179,d|0,c|0,h|0,36,bM(b)|0,0);f[b>>2]=102;f[b+4>>2]=0;h=eL()|0;c=$L(g)|0;d=aM(g)|0;e=tL()|0;fb(h|0,35189,c|0,d|0,e|0,36,bM(b)|0,0);f[b>>2]=103;f[b+4>>2]=0;e=eL()|0;d=$L(g)|0;c=aM(g)|0;h=tL()|0;fb(e|0,35199,d|0,c|0,h|0,36,bM(b)|0,0);f[b>>2]=104;f[b+4>>2]=0;h=eL()|0;c=$L(g)|0;d=aM(g)|0;e=tL()|0;fb(h|0,35208,c|0,d|0,e|0,36,bM(b)|0,0);f[b>>2]=154;f[b+4>>2]=0;e=eL()|0;d=wL(g)|0;c=xL(g)|0;h=yL()|0;fb(e|0,35216,d|0,c|0,h|0,96,zL(b)|0,0);f[b>>2]=105;f[b+4>>2]=0;h=eL()|0;c=dM(g)|0;d=eM(g)|0;e=tL()|0;fb(h|0,35225,c|0,d|0,e|0,37,fM(b)|0,0);f[b>>2]=106;f[b+4>>2]=0;e=eL()|0;d=hM(g)|0;c=iM(g)|0;h=tL()|0;fb(e|0,35238,d|0,c|0,h|0,38,jM(b)|0,0);f[b>>2]=155;f[b+4>>2]=0;h=eL()|0;c=wL(g)|0;d=xL(g)|0;e=yL()|0;fb(h|0,35250,c|0,d|0,e|0,96,zL(b)|0,0);f[b>>2]=156;f[b+4>>2]=0;e=eL()|0;d=wL(g)|0;c=xL(g)|0;h=yL()|0;fb(e|0,35262,d|0,c|0,h|0,96,zL(b)|0,0);f[b>>2]=107;f[b+4>>2]=0;h=eL()|0;c=NL(g)|0;d=OL(g)|0;e=tL()|0;fb(h|0,35274,c|0,d|0,e|0,35,PL(b)|0,0);f[b>>2]=108;f[b+4>>2]=0;e=eL()|0;d=lM(g)|0;c=mM(g)|0;h=tL()|0;fb(e|0,35290,d|0,c|0,h|0,39,nM(b)|0,0);f[b>>2]=157;f[b+4>>2]=0;h=eL()|0;c=wL(g)|0;d=xL(g)|0;e=yL()|0;fb(h|0,41973,c|0,d|0,e|0,96,zL(b)|0,0);f[b>>2]=158;f[b+4>>2]=0;e=eL()|0;d=wL(g)|0;c=xL(g)|0;h=yL()|0;fb(e|0,41978,d|0,c|0,h|0,96,zL(b)|0,0);f[b>>2]=159;f[b+4>>2]=0;h=eL()|0;c=wL(g)|0;d=xL(g)|0;e=yL()|0;fb(h|0,35300,c|0,d|0,e|0,96,zL(b)|0,0);e=eL()|0;d=pM()|0;c=yL()|0;f[g>>2]=150;f[g+4>>2]=0;f[b>>2]=f[g>>2];f[b+4>>2]=f[g+4>>2];gb(e|0,35312,d|0,c|0,109,rM(b)|0,0,0,0,0);u=a;return}function wK(a,b){a=a|0;b=b|0;var c=0;fO(a);c=$N()|0;a=gO()|0;pb(c|0,b|0,a|0,2,kL()|0,456);return}function xK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=$N()|0;j=PO()|0;i=yL()|0;h=YO(e)|0;g=PO()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,110,h|0,g|0,c|0,48,YO(e)|0);u=d;return a|0}function yK(a){a=a|0;bb($N()|0);$M(a);return}function zK(a,b){a=a|0;b=b|0;var c=0;fO(a);c=wN()|0;a=gO()|0;pb(c|0,b|0,a|0,3,kL()|0,457);return}function AK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=wN()|0;j=PO()|0;i=yL()|0;h=QO(e)|0;g=PO()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,111,h|0,g|0,c|0,49,QO(e)|0);u=d;return a|0}function BK(a){a=a|0;bb(wN()|0);$M(a);return}function CK(a,b){a=a|0;b=b|0;var c=0;fO(a);c=IO()|0;a=gO()|0;pb(c|0,b|0,a|0,4,kL()|0,458);return}function DK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=IO()|0;j=nO()|0;i=oO()|0;h=KO(e)|0;g=nO()|0;c=qO()|0;qb(k|0,b|0,j|0,i|0,1,h|0,g|0,c|0,3,KO(e)|0);u=d;return a|0}function EK(a){a=a|0;bb(IO()|0);$M(a);return}function FK(a,b){a=a|0;b=b|0;var c=0;fO(a);c=jN()|0;a=gO()|0;pb(c|0,b|0,a|0,5,kL()|0,459);return}function GK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=jN()|0;j=vO()|0;i=yL()|0;h=DO(e)|0;g=vO()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,112,h|0,g|0,c|0,50,DO(e)|0);u=d;return a|0}function HK(a){a=a|0;bb(jN()|0);$M(a);return}function IK(a,b){a=a|0;b=b|0;var c=0;fO(a);c=DN()|0;a=gO()|0;pb(c|0,b|0,a|0,6,kL()|0,460);return}function JK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=DN()|0;j=vO()|0;i=yL()|0;h=wO(e)|0;g=vO()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,113,h|0,g|0,c|0,51,wO(e)|0);u=d;return a|0}function KK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=DN()|0;j=nO()|0;i=oO()|0;h=pO(e)|0;g=nO()|0;c=qO()|0;qb(k|0,b|0,j|0,i|0,2,h|0,g|0,c|0,4,pO(e)|0);u=d;return a|0}function LK(a){a=a|0;bb(DN()|0);$M(a);return}function MK(a,b){a=a|0;b=b|0;ib(JN()|0,b|0,4,1);return}function NK(a,b,c){a=a|0;b=b|0;c=c|0;jb(JN()|0,b|0,c|0);return a|0}function OK(a,b){a=a|0;b=b|0;ib(bN()|0,b|0,4,1);return}function PK(a,b,c){a=a|0;b=b|0;c=c|0;jb(bN()|0,b|0,c|0);return a|0}function QK(a,b){a=a|0;b=b|0;ib(lO()|0,b|0,4,1);return}function RK(a,b,c){a=a|0;b=b|0;c=c|0;jb(lO()|0,b|0,c|0);return a|0}function SK(a,b){a=a|0;b=b|0;var c=0;fO(a);c=_M()|0;a=gO()|0;pb(c|0,b|0,a|0,7,kL()|0,461);return}function TK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=$N()|0;i=yL()|0;h=aO(e)|0;g=$N()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,114,h|0,g|0,c|0,52,aO(e)|0);u=d;return a|0}function UK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=VN()|0;i=yL()|0;h=WN(e)|0;g=VN()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,115,h|0,g|0,c|0,53,WN(e)|0);u=d;return a|0}function VK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=PN()|0;i=yL()|0;h=QN(e)|0;g=PN()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,116,h|0,g|0,c|0,54,QN(e)|0);u=d;return a|0}function WK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=JN()|0;i=yL()|0;h=KN(e)|0;g=JN()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,117,h|0,g|0,c|0,55,KN(e)|0);u=d;return a|0}function XK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=DN()|0;i=yL()|0;h=EN(e)|0;g=DN()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,118,h|0,g|0,c|0,56,EN(e)|0);u=d;return a|0}function YK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=wN()|0;i=yL()|0;h=xN(e)|0;g=wN()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,119,h|0,g|0,c|0,57,xN(e)|0);u=d;return a|0}function ZK(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=pM()|0;i=yL()|0;h=qN(e)|0;g=pM()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,120,h|0,g|0,c|0,58,qN(e)|0);u=d;return a|0}function _K(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=jN()|0;i=yL()|0;h=kN(e)|0;g=jN()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,121,h|0,g|0,c|0,59,kN(e)|0);u=d;return a|0}function $K(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;d=u;u=u+16|0;e=d;f[e>>2]=c;k=_M()|0;j=bN()|0;i=yL()|0;h=cN(e)|0;g=bN()|0;c=dN()|0;qb(k|0,b|0,j|0,i|0,122,h|0,g|0,c|0,60,cN(e)|0);u=d;return a|0}function aL(a){a=a|0;bb(_M()|0);$M(a);return}function bL(){return}function cL(){return 0}function dL(){return 0}function eL(){return ZM()|0}function fL(){return YM()|0}function gL(){return XM()|0}function hL(){return 0}function iL(){return 35597}function jL(){return 35595}function kL(){return 35592}function lL(a){a=a|0;return WM(a)|0}function mL(a){a=a|0;if(a|0){TR(a);$Y(a)}return}function nL(a){a=a|0;return 1}function oL(a){a=a|0;return VM()|0}function pL(a){a=a|0;return UM(Sd[a&7]()|0)|0}function qL(){var a=0;a=XY(36)|0;SR(a);return a|0}function rL(a){a=a|0;return 3}function sL(a){a=a|0;return TM()|0}function tL(){return 35560}function uL(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function vL(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=SM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function wL(a){a=a|0;return 2}function xL(a){a=a|0;return RM()|0}function yL(){return 35556}function zL(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function AL(a,b){a=a|0;b=b|0;var c=0,d=0;d=wM(b)|0;b=f[a>>2]|0;c=f[a+4>>2]|0;a=d+(c>>1)|0;if(c&1)b=f[(f[a>>2]|0)+b>>2]|0;return yM(Td[b&255](a)|0)|0}function BL(a){a=a|0;return 3}function CL(a){a=a|0;return QM()|0}function DL(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function EL(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=PM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function FL(a){a=a|0;return 3}function GL(a){a=a|0;return OM()|0}function HL(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function IL(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=NM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function JL(a){a=a|0;return 3}function KL(a){a=a|0;return MM()|0}function LL(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function ML(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=LM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function NL(a){a=a|0;return 3}function OL(a){a=a|0;return KM()|0}function PL(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function QL(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=JM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function RL(a){a=a|0;return 4}function SL(a){a=a|0;return IM()|0}function TL(){return 35505}function UL(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function VL(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;var e=0,g=0;g=wM(b)|0;b=f[a>>2]|0;e=f[a+4>>2]|0;a=g+(e>>1)|0;if(e&1)b=f[(f[a>>2]|0)+b>>2]|0;g=EM(c)|0;d=+GM(d);return yM(Wd[b&7](a,g,d)|0)|0}function WL(a){a=a|0;return 3}function XL(a){a=a|0;return HM()|0}function YL(){return 35500}function ZL(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function _L(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;c=+GM(c);return yM(Ud[b&7](a,c)|0)|0}function $L(a){a=a|0;return 3}function aM(a){a=a|0;return FM()|0}function bM(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function cM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=EM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function dM(a){a=a|0;return 3}function eM(a){a=a|0;return DM()|0}function fM(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function gM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=CM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function hM(a){a=a|0;return 3}function iM(a){a=a|0;return BM()|0}function jM(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function kM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=AM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function lM(a){a=a|0;return 3}function mM(a){a=a|0;return zM()|0}function nM(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function oM(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=wM(b)|0;b=f[a>>2]|0;d=f[a+4>>2]|0;a=e+(d>>1)|0;if(d&1)b=f[(f[a>>2]|0)+b>>2]|0;e=xM(c)|0;return yM(Vd[b&127](a,e)|0)|0}function pM(){return vM()|0}function qM(a,b){a=a|0;b=b|0;iZ(a,b);return}function rM(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;c=b;d=f[a+4>>2]|0;f[c>>2]=f[a>>2];f[c+4>>2]=d;a=uM(c)|0;u=b;return a|0}function sM(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;e=u;u=u+16|0;d=e;c=f[a>>2]|0;g=f[a+4>>2]|0;a=b+(g>>1)|0;if(g&1)c=f[(f[a>>2]|0)+c>>2]|0;ee[c&255](d,a);g=tM(d)|0;jZ(d);u=e;return g|0}function tM(a){a=a|0;var c=0,d=0,e=0,g=0,h=0;c=b[a+11>>0]|0;h=c<<24>>24<0;if(h){e=f[a+4>>2]|0;g=QX(e+4|0)|0;c=c&255;d=e}else{d=c&255;g=QX(d+4|0)|0;c=d;e=f[a+4>>2]|0}f[g>>2]=d;K_(g+4|0,(h?f[a>>2]|0:a)|0,(h?e:c)|0)|0;return g|0}function uM(a){a=a|0;var b=0,c=0;b=XY(8)|0;c=f[a+4>>2]|0;f[b>>2]=f[a>>2];f[b+4>>2]=c;return b|0}function vM(){return 2064}function wM(a){a=a|0;return a|0}function xM(a){a=a|0;return a|0}function yM(a){a=a|0;return a|0}function zM(){return 8892}function AM(a){a=a|0;return a|0}function BM(){return 8904}function CM(a){a=a|0;return a|0}function DM(){return 8916}function EM(a){a=a|0;return a|0}function FM(){return 8928}function GM(a){a=+a;return +a}function HM(){return 8940}function IM(){return 8952}function JM(a){a=a|0;return a|0}function KM(){return 8968}function LM(a){a=a|0;return a|0}function MM(){return 8980}function NM(a){a=a|0;return a|0}function OM(){return 8992}function PM(a){a=a|0;return a|0}function QM(){return 9004}function RM(){return 9016}function SM(a){a=a|0;return a|0}function TM(){return 9024}function UM(a){a=a|0;return a|0}function VM(){return 9036}function WM(a){a=a|0;return 2112}function XM(){return 2168}function YM(){return 2096}function ZM(){return 2112}function _M(){return aN()|0}function $M(a){a=a|0;return}function aN(){return 2160}function bN(){return iN()|0}function cN(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function dN(){return 35619}function eN(a,b){a=a|0;b=b|0;return hN(f[b+(f[a>>2]|0)>>2]|0)|0}function fN(a,b,c){a=a|0;b=b|0;c=c|0;c=gN(c)|0;f[b+(f[a>>2]|0)>>2]=c;return}function gN(a){a=a|0;return a|0}function hN(a){a=a|0;return a|0}function iN(){return 2184}function jN(){return pN()|0}function kN(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function lN(a,b){a=a|0;b=b|0;return oN(b+(f[a>>2]|0)|0)|0}function mN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=nN(c)|0;d=f[e+4>>2]|0;c=b+(f[a>>2]|0)|0;f[c>>2]=f[e>>2];f[c+4>>2]=d;return}function nN(a){a=a|0;return a|0}function oN(a){a=a|0;var b=0,c=0,d=0;b=XY(8)|0;d=a;c=f[d+4>>2]|0;a=b;f[a>>2]=f[d>>2];f[a+4>>2]=c;return b|0}function pN(){return 2192}function qN(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function rN(a,b){a=a|0;b=b|0;return tM(b+(f[a>>2]|0)|0)|0}function sN(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0;h=u;u=u+16|0;e=h+12|0;g=h;tN(g,d);a=c+(f[a>>2]|0)|0;c=a+11|0;if((b[c>>0]|0)<0){d=f[a>>2]|0;b[e>>0]=0;uN(d,e);f[a+4>>2]=0}else{b[e>>0]=0;uN(a,e);b[c>>0]=0}nZ(a,0);f[a>>2]=f[g>>2];f[a+4>>2]=f[g+4>>2];f[a+8>>2]=f[g+8>>2];a=0;while(1){if((a|0)==3)break;f[g+(a<<2)>>2]=0;a=a+1|0}jZ(g);u=h;return}function tN(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;g=u;u=u+16|0;d=g;e=f[c>>2]|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;if(e>>>0>4294967279)gZ(a);if(e>>>0<11)b[a+11>>0]=e;else{i=e+16&-16;h=XY(i)|0;f[a>>2]=h;f[a+8>>2]=i|-2147483648;f[a+4>>2]=e;a=h}vN(a,c+4|0,e)|0;b[d>>0]=0;uN(a+e|0,d);u=g;return}function uN(a,c){a=a|0;c=c|0;b[a>>0]=b[c>>0]|0;return}function vN(a,b,c){a=a|0;b=b|0;c=c|0;if(c|0)K_(a|0,b|0,c|0)|0;return a|0}function wN(){return CN()|0}function xN(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function yN(a,b){a=a|0;b=b|0;return BN(b+(f[a>>2]|0)|0)|0}function zN(a,c,d){a=a|0;c=c|0;d=d|0;var e=0;e=AN(d)|0;d=c+(f[a>>2]|0)|0;c=h[e>>0]|h[e+1>>0]<<8|h[e+2>>0]<<16|h[e+3>>0]<<24;b[d>>0]=c;b[d+1>>0]=c>>8;b[d+2>>0]=c>>16;b[d+3>>0]=c>>24;return}function AN(a){a=a|0;return a|0}function BN(a){a=a|0;var c=0;c=XY(4)|0;a=h[a>>0]|h[a+1>>0]<<8|h[a+2>>0]<<16|h[a+3>>0]<<24;b[c>>0]=a;b[c+1>>0]=a>>8;b[c+2>>0]=a>>16;b[c+3>>0]=a>>24;return c|0}function CN(){return 2200}function DN(){return IN()|0}function EN(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function FN(a,b){a=a|0;b=b|0;return HN(b+(f[a>>2]|0)|0)|0}function GN(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=JM(c)|0;c=b+(f[a>>2]|0)|0;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];f[c+8>>2]=f[d+8>>2];return}function HN(a){a=a|0;var b=0;b=XY(12)|0;f[b>>2]=f[a>>2];f[b+4>>2]=f[a+4>>2];f[b+8>>2]=f[a+8>>2];return b|0}function IN(){return 2136}function JN(){return ON()|0}function KN(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function LN(a,b){a=a|0;b=b|0;return NN(f[b+(f[a>>2]|0)>>2]|0)|0}function MN(a,b,c){a=a|0;b=b|0;c=c|0;c=PM(c)|0;f[b+(f[a>>2]|0)>>2]=c;return}function NN(a){a=a|0;return a|0}function ON(){return 2152}function PN(){return UN()|0}function QN(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function RN(a,c){a=a|0;c=c|0;return yM((b[c+(f[a>>2]|0)>>0]|0)!=0)|0}function SN(a,c,d){a=a|0;c=c|0;d=d|0;d=TN(d)|0;b[c+(f[a>>2]|0)>>0]=d&1;return}function TN(a){a=a|0;return a|0}function UN(){return 3136}function VN(){return _N()|0}function WN(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function XN(a,b){a=a|0;b=b|0;return ZN(b+(f[a>>2]|0)|0)|0}function YN(a,b,c){a=a|0;b=b|0;c=c|0;c=NM(c)|0;d[b+(f[a>>2]|0)>>1]=c;return}function ZN(a){a=a|0;return d[a>>1]|0}function _N(){return 3176}function $N(){return eO()|0}function aO(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function bO(a,b){a=a|0;b=b|0;return dO(b+(f[a>>2]|0)|0)|0}function cO(a,c,d){a=a|0;c=c|0;d=d|0;var e=0;e=LM(d)|0;d=c+(f[a>>2]|0)|0;b[d>>0]=b[e>>0]|0;b[d+1>>0]=b[e+1>>0]|0;b[d+2>>0]=b[e+2>>0]|0;return}function dO(a){a=a|0;var c=0;c=XY(3)|0;b[c>>0]=b[a>>0]|0;b[c+1>>0]=b[a+1>>0]|0;b[c+2>>0]=b[a+2>>0]|0;return c|0}function eO(){return 2144}function fO(a){a=a|0;return}function gO(){return 35682}function hO(){var a=0,b=0,c=0;a=XY(52)|0;b=a;c=b+52|0;do{f[b>>2]=0;b=b+4|0}while((b|0)<(c|0));kO(a);return a|0}function iO(a){a=a|0;if(a|0){jO(a);$Y(a)}return}function jO(a){a=a|0;jZ(a+28|0);return}function kO(a){a=a|0;var b=0;b=a+28|0;f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;a=0;while(1){if((a|0)==3)break;f[b+(a<<2)>>2]=0;a=a+1|0}return}function lO(){return mO()|0}function mO(){return 2120}function nO(){return uO()|0}function oO(){return 35689}function pO(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function qO(){return 35684}function rO(a,b){a=a|0;b=b|0;return +(+tO(b+(f[a>>2]|0)|0))}function sO(a,b,c){a=a|0;b=b|0;c=+c;c=+GM(c);n[b+(f[a>>2]|0)>>2]=c;return}function tO(a){a=a|0;return +(+n[a>>2])}function uO(){return 3216}function vO(){return AO()|0}function wO(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function xO(a,b){a=a|0;b=b|0;return zO(b+(f[a>>2]|0)|0)|0}function yO(a,b,c){a=a|0;b=b|0;c=c|0;c=CM(c)|0;f[b+(f[a>>2]|0)>>2]=c;return}function zO(a){a=a|0;return f[a>>2]|0}function AO(){return 3192}function BO(){var a=0;a=XY(12)|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;return a|0}function CO(a){a=a|0;if(a|0)$Y(a);return}function DO(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function EO(a,b){a=a|0;b=b|0;return zO(b+(f[a>>2]|0)|0)|0}function FO(a,b,c){a=a|0;b=b|0;c=c|0;c=CM(c)|0;f[b+(f[a>>2]|0)>>2]=c;return}function GO(){var a=0,b=0;a=XY(8)|0;b=a;f[b>>2]=0;f[b+4>>2]=0;return a|0}function HO(a){a=a|0;if(a|0)$Y(a);return}function IO(){return JO()|0}function JO(){return 2128}function KO(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function LO(a,b){a=a|0;b=b|0;return +(+tO(b+(f[a>>2]|0)|0))}function MO(a,b,c){a=a|0;b=b|0;c=+c;c=+GM(c);n[b+(f[a>>2]|0)>>2]=c;return}function NO(){var a=0,b=0;a=XY(8)|0;b=a;f[b>>2]=0;f[b+4>>2]=0;return a|0}function OO(a){a=a|0;if(a|0)$Y(a);return}function PO(){return VO()|0}function QO(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function RO(a,b){a=a|0;b=b|0;return UO(b+(f[a>>2]|0)|0)|0}function SO(a,c,d){a=a|0;c=c|0;d=d|0;d=TO(d)|0;b[c+(f[a>>2]|0)>>0]=d;return}function TO(a){a=a|0;return a|0}function UO(a){a=a|0;return b[a>>0]|0}function VO(){return 3152}function WO(){var a=0;a=XY(4)|0;f[a>>2]=0;return a|0}function XO(a){a=a|0;if(a|0)$Y(a);return}function YO(a){a=a|0;var b=0;b=XY(4)|0;f[b>>2]=f[a>>2];return b|0}function ZO(a,b){a=a|0;b=b|0;return UO(b+(f[a>>2]|0)|0)|0}function _O(a,c,d){a=a|0;c=c|0;d=d|0;d=TO(d)|0;b[c+(f[a>>2]|0)>>0]=d;return}function $O(){var a=0;a=XY(3)|0;d[a>>1]=0;b[a+2>>0]=0;return a|0}function aP(a){a=a|0;if(a|0)$Y(a);return}function bP(a){a=a|0;var b=0,c=0;f[a>>2]=9048;c=a+4|0;b=f[c>>2]|0;f[c>>2]=0;bZ(b);aw(a);return}function cP(a){a=a|0;bP(a);$Y(a);return}function dP(a,b,c){a=a|0;b=b|0;c=c|0;return (Bb(0,b|0,c|0)|0)!=0|0}function eP(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;f[d>>2]=0;if(iP(b,hP(0,c,d)|0)|0){f[a>>2]=f[b+4>>2];b=f[d>>2]|0}else{f[a>>2]=0;b=0}f[a+4>>2]=b;u=e;return}function fP(a,b,c){a=a|0;b=b|0;c=c|0;a=f[b+12>>2]|0;Eb(1,f[b>>2]|0,f[b+4>>2]|0,f[b+8>>2]|0,a|0,f[c>>2]|0,X(f[c+4>>2]|0,a)|0)|0;return}function gP(a,b){a=a|0;b=b|0;return}function hP(a,b,c){a=a|0;b=b|0;c=c|0;a=f[b+8>>2]<<2;f[c>>2]=a;return X(f[b+12>>2]|0,a)|0}function iP(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=a+8|0;if((f[c>>2]|0)>>>0<b>>>0){e=_Y(b,47264)|0;a=a+4|0;d=f[a>>2]|0;f[a>>2]=e;bZ(d);a=(f[a>>2]|0)==0;f[c>>2]=a?0:b;a=a^1}else a=1;return a|0}function jP(a){a=a|0;bw(a);f[a>>2]=9048;f[a+4>>2]=0;f[a+8>>2]=0;return}function kP(a){a=a|0;f[a>>2]=9080;Fx(a+4|0);$w(a);return}function lP(a){a=a|0;kP(a);$Y(a);return}function mP(a){a=a|0;Dx(a+4|0);yb(2)|0;return}function nP(a,b,c){a=a|0;b=b|0;c=c|0;yb(3)|0;return 1}function oP(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;h=j+8|0;i=j;b=b+4|0;d=tx(b,c)|0;if(d){f[a>>2]=f[d+20>>2];b=f[d+24>>2]|0;f[a+4>>2]=b;if(b|0)SY(b)}else{pP(i,0,c);if(!(f[i>>2]|0)){f[a>>2]=0;b=a+4|0}else{d=wx(b,c)|0;c=f[i>>2]|0;f[h>>2]=c;e=h+4|0;b=i+4|0;g=f[b>>2]|0;f[e>>2]=g;if(g|0)SY(g);f[h>>2]=f[d>>2];f[d>>2]=c;c=d+4|0;f[e>>2]=f[c>>2];f[c>>2]=g;ux(h);f[a>>2]=f[i>>2];f[a+4>>2]=f[b>>2];f[i>>2]=0}f[b>>2]=0;ux(i)}u=j;return}function pP(a,c,d){a=a|0;c=c|0;d=d|0;c=zb(4,((b[d+11>>0]|0)<0?f[d>>2]|0:d)|0)|0;if((c|0)==-1){f[a>>2]=0;f[a+4>>2]=0}else qP(a,c);return}function qP(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;h=u;u=u+32|0;d=h+16|0;g=h+8|0;e=h;c=YY(24,47264)|0;if(!c)c=0;else{f[c>>2]=0;f[c+4>>2]=0;f[c+8>>2]=0;f[c+12>>2]=0;f[c+16>>2]=0;f[c+20>>2]=0;rP(c)}f[e>>2]=0;f[d>>2]=f[e>>2];sP(g,c,d);c=f[g>>2]|0;do if(c)if(tP(c,b)|0){f[a>>2]=f[g>>2];c=g+4|0;f[a+4>>2]=f[c>>2];f[g>>2]=0;break}else{f[a>>2]=0;c=a+4|0;break}else{f[a>>2]=0;c=a+4|0}while(0);f[c>>2]=0;uP(g);u=h;return}function rP(a){a=a|0;hx(a);f[a>>2]=9192;f[a+12>>2]=0;f[a+16>>2]=0;f[a+20>>2]=0;return}function sP(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=9164;f[c+12>>2]=b;f[a+4>>2]=c;return}function tP(a,b){a=a|0;b=b|0;if(vP(a,b)|0)a=wP(a,b)|0;else a=0;return a|0}function uP(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function vP(a,b){a=a|0;b=b|0;var c=0;c=zb(5,b|0)|0;b=zb(6,b|0)|0;if((b|c|0)<0)b=0;else{f[a+4>>2]=c;f[a+8>>2]=b;b=1}return b|0}function wP(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;l=u;u=u+16|0;h=l;i=zb(7,b|0)|0;a:do if((i|0)<1)a=0;else{j=a+16|0;k=a+20|0;e=a+12|0;g=h+4|0;d=0;while(1){if((d|0)>=(i|0)){a=1;break a}xP(h,b,d);c=f[h>>2]|0;if(!c)break;a=f[j>>2]|0;if((a|0)==(f[k>>2]|0))yP(e,h);else{f[a>>2]=c;c=f[g>>2]|0;f[a+4>>2]=c;if(c){SY(c);a=f[j>>2]|0}f[j>>2]=a+8}kx(h);d=d+1|0}kx(h);a=0}while(0);u=l;return a|0}function xP(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;i=u;u=u+32|0;e=i+16|0;h=i+8|0;g=i;d=YY(44,47264)|0;if(!d)d=0;else zP(d,b,c);f[g>>2]=0;f[e>>2]=f[g>>2];AP(h,d,e);d=f[h>>2]|0;do if(d)if(BP(d)|0){f[a>>2]=f[h>>2];d=h+4|0;f[a+4>>2]=f[d>>2];f[h>>2]=0;break}else{f[a>>2]=0;d=a+4|0;break}else{f[a>>2]=0;d=a+4|0}while(0);f[d>>2]=0;CP(h);u=i;return}function yP(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;h=u;u=u+32|0;g=h;c=a+4|0;d=((f[c>>2]|0)-(f[a>>2]|0)>>3)+1|0;e=lx(a)|0;if(e>>>0<d>>>0)MY(a);i=f[a>>2]|0;k=(f[a+8>>2]|0)-i|0;j=k>>2;mx(g,k>>3>>>0<e>>>1>>>0?(j>>>0<d>>>0?d:j):e,(f[c>>2]|0)-i>>3,a+8|0);e=g+8|0;c=f[e>>2]|0;f[c>>2]=f[b>>2];d=f[b+4>>2]|0;f[c+4>>2]=d;if(d){SY(d);c=f[e>>2]|0}f[e>>2]=c+8;nx(a,g);ox(g);u=h;return}function zP(a,b,c){a=a|0;b=b|0;c=c|0;rx(a);f[a>>2]=9140;f[a+4>>2]=b;f[a+8>>2]=c;return}function AP(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=9112;f[c+12>>2]=b;f[a+4>>2]=c;return}function BP(a){a=a|0;var b=0.0,c=0;if(!(Bb(8,f[a+4>>2]|0,f[a+8>>2]|0)|0))a=0;else{c=yb(9)|0;f[a+12>>2]=c;c=yb(10)|0;f[a+16>>2]=c;c=yb(11)|0;f[a+20>>2]=c;c=yb(12)|0;f[a+24>>2]=c;b=+wb(13);n[a+28>>2]=b;b=+wb(14);n[a+32>>2]=b;b=+wb(15);n[a+36>>2]=b;b=+wb(16);n[a+40>>2]=b;a=1}return a|0}function CP(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function DP(a){a=a|0;NY(a);$Y(a);return}function EP(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function FP(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==36402?a+12|0:0)|0}function GP(a){a=a|0;$Y(a);return}function HP(a){a=a|0;qx(a);$Y(a);return}function IP(a){a=a|0;return a+12|0}function JP(a){a=a|0;return (Bb(17,f[a+4>>2]|0,f[a+8>>2]|0)|0)!=0|0}function KP(a){a=a|0;NY(a);$Y(a);return}function LP(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function MP(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==36731?a+12|0:0)|0}function NP(a){a=a|0;$Y(a);return}function OP(a){a=a|0;f[a>>2]=9192;ix(a+12|0);jx(a);return}function PP(a){a=a|0;OP(a);$Y(a);return}function QP(a){a=a|0;return f[a+4>>2]|0}function RP(a){a=a|0;return f[a+8>>2]|0}function SP(a){a=a|0;return a+12|0}function TP(a){a=a|0;$w(a);$Y(a);return}function UP(a){a=a|0;yb(18)|0;return}function VP(a,b,c){a=a|0;b=b|0;c=c|0;yb(19)|0;return 1}function WP(a,b,c,d,e,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=+g;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=u;u=u+32|0;k=o+24|0;m=o+16|0;i=o+8|0;n=o;f[n>>2]=0;l=n+4|0;f[l>>2]=0;b=f[h>>2]|0;j=b;if(!b){b=YY(76,47264)|0;if(!b)b=0;else $Q(b);f[i>>2]=0;f[k>>2]=f[i>>2];ZP(m,b,k);h=f[m>>2]|0;f[m>>2]=f[n>>2];f[n>>2]=h;h=m+4|0;k=f[h>>2]|0;f[h>>2]=f[l>>2];f[l>>2]=k;YP(m)}else{f[m>>2]=j;i=m+4|0;b=f[h+4>>2]|0;f[i>>2]=b;if(b|0)SY(b);f[m>>2]=0;f[i>>2]=0;f[k>>2]=0;f[n>>2]=j;f[k+4>>2]=0;f[l>>2]=b;YP(k);YP(m)}e=~~+N_(+(+(e&65535)*g))&65535;eR(f[n>>2]|0,c,d,e);_P(f[n>>2]|0,g);f[a>>2]=f[n>>2];f[a+4>>2]=f[l>>2];f[n>>2]=0;f[l>>2]=0;YP(n);u=o;return}function XP(a,b){a=a|0;b=b|0;return}function YP(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function ZP(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=9252;f[c+12>>2]=b;f[a+4>>2]=c;return}function _P(a,b){a=a|0;b=+b;n[a+68>>2]=b;return}function $P(a){a=a|0;NY(a);$Y(a);return}function aQ(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function bQ(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==37001?a+12|0:0)|0}function cQ(a){a=a|0;$Y(a);return}function dQ(a){a=a|0;f[a>>2]=9280;DQ(a+8|0);EQ(a);return}function eQ(a){a=a|0;dQ(a);$Y(a);return}function fQ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0;l=u;u=u+32|0;j=l+16|0;h=l+12|0;k=l;i=l+8|0;g=yb(20)|0;f[h>>2]=g;e=YY(40,47264)|0;if(!e)e=0;else gQ(e,g,c,d);f[i>>2]=0;f[j>>2]=f[i>>2];hQ(k,e,j);if(!(f[k>>2]|0)){f[a>>2]=0;e=a+4|0}else{c=iQ(b+8|0,h)|0;d=f[k>>2]|0;f[j>>2]=d;g=j+4|0;e=k+4|0;b=f[e>>2]|0;f[g>>2]=b;if(b|0)TY(b);f[j>>2]=f[c>>2];f[c>>2]=d;i=c+4|0;f[g>>2]=f[i>>2];f[i>>2]=b;jQ(j);f[a>>2]=f[k>>2];f[a+4>>2]=f[e>>2];f[k>>2]=0}f[e>>2]=0;kQ(k);u=l;return}function gQ(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;tQ(a);f[a>>2]=9328;f[a+4>>2]=c;f[a+8>>2]=d;b[a+12>>0]=0;it(a+16|0,e);return}function hQ(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=9300;f[c+12>>2]=b;f[a+4>>2]=c;return}function iQ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0.0,g=0.0,h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0;s=u;u=u+32|0;r=s+4|0;k=s;l=s+16|0;f[k>>2]=b;q=f[b>>2]|0;o=a+4|0;h=f[o>>2]|0;p=(h|0)==0;a:do if(!p){j=h+-1|0;d=(j&h|0)==0;if(!d)if(q>>>0<h>>>0)i=q;else i=(q>>>0)%(h>>>0)|0;else i=j&q;b=f[(f[a>>2]|0)+(i<<2)>>2]|0;if(!b){b=i;m=15}else do{b=f[b>>2]|0;if(!b){b=i;m=15;break a}c=f[b+4>>2]|0;if((c|0)!=(q|0)){if(!d){if(c>>>0>=h>>>0)c=(c>>>0)%(h>>>0)|0}else c=c&j;if((c|0)!=(i|0)){b=i;m=15;break a}}}while((f[b+8>>2]|0)!=(q|0))}else{b=0;m=15}while(0);if((m|0)==15){lQ(r,a,q,47254,k,l);i=a+12|0;e=+(((f[i>>2]|0)+1|0)>>>0);g=+n[a+16>>2];do if(p|g*+(h>>>0)<e){b=h<<1|(h>>>0<3|(h+-1&h|0)!=0)&1;c=~~+W(+(e/g))>>>0;mQ(a,b>>>0<c>>>0?c:b);b=f[o>>2]|0;c=b+-1|0;if(!(c&b)){h=b;b=c&q;break}if(q>>>0<b>>>0){h=b;b=q}else{h=b;b=(q>>>0)%(b>>>0)|0}}while(0);c=f[(f[a>>2]|0)+(b<<2)>>2]|0;if(!c){d=a+8|0;f[f[r>>2]>>2]=f[d>>2];f[d>>2]=f[r>>2];f[(f[a>>2]|0)+(b<<2)>>2]=d;d=f[r>>2]|0;b=f[d>>2]|0;if(!b)b=r;else{b=f[b+4>>2]|0;c=h+-1|0;if(c&h){if(b>>>0>=h>>>0)b=(b>>>0)%(h>>>0)|0}else b=b&c;f[(f[a>>2]|0)+(b<<2)>>2]=d;b=r}}else{f[f[r>>2]>>2]=f[c>>2];f[c>>2]=f[r>>2];b=r}r=f[b>>2]|0;f[i>>2]=(f[i>>2]|0)+1;f[b>>2]=0;b=r}u=s;return b+12|0}function jQ(a){a=a|0;a=f[a+4>>2]|0;if(a|0)VY(a);return}function kQ(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function lQ(a,c,d,e,g,h){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;h=XY(20)|0;f[a>>2]=h;f[a+4>>2]=c+8;f[h+8>>2]=f[f[g>>2]>>2];f[h+12>>2]=0;f[h+16>>2]=0;b[a+8>>0]=1;h=f[a>>2]|0;f[h+4>>2]=d;f[h>>2]=0;return}function mQ(a,b){a=a|0;b=b|0;var c=0,d=0;if((b|0)!=1){if(b+-1&b)b=IY(b)|0}else b=2;d=f[a+4>>2]|0;if(b>>>0<=d>>>0){if(b>>>0<d>>>0){c=~~+W(+(+((f[a+12>>2]|0)>>>0)/+n[a+16>>2]))>>>0;if(d>>>0>2&(d+-1&d|0)==0)c=1<<32-(_(c+-1|0)|0);else c=IY(c)|0;b=b>>>0<c>>>0?c:b;if(b>>>0<d>>>0)oQ(a,b)}}else oQ(a,b);return}function nQ(a){a=a|0;jQ(a+4|0);return}function oQ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;d=a+4|0;a:do if(b){if(b>>>0>1073741823){a=Sa(8)|0;eZ(a,38407);f[a>>2]=11336;Wa(a|0,3056,442)}l=XY(b<<2)|0;c=f[a>>2]|0;f[a>>2]=l;if(c|0)$Y(c);f[d>>2]=b;c=0;while(1){if((c|0)==(b|0))break;f[(f[a>>2]|0)+(c<<2)>>2]=0;c=c+1|0}e=a+8|0;c=f[e>>2]|0;if(c|0){d=f[c+4>>2]|0;k=b+-1|0;l=(k&b|0)==0;if(!l){if(d>>>0>=b>>>0)d=(d>>>0)%(b>>>0)|0}else d=d&k;f[(f[a>>2]|0)+(d<<2)>>2]=e;while(1){j=c;b:while(1)while(1){c=f[j>>2]|0;if(!c)break a;e=f[c+4>>2]|0;if(!l){if(e>>>0>=b>>>0)e=(e>>>0)%(b>>>0)|0}else e=e&k;if((e|0)==(d|0)){j=c;continue b}g=(f[a>>2]|0)+(e<<2)|0;if(!(f[g>>2]|0))break b;h=c+8|0;g=c;while(1){i=f[g>>2]|0;if(!i)break;if((f[h>>2]|0)==(f[i+8>>2]|0))g=i;else break}f[j>>2]=i;f[g>>2]=f[f[(f[a>>2]|0)+(e<<2)>>2]>>2];f[f[(f[a>>2]|0)+(e<<2)>>2]>>2]=c}f[g>>2]=j;d=e}}}else{c=f[a>>2]|0;f[a>>2]=0;if(c|0)$Y(c);f[d>>2]=0}while(0);return}function pQ(a){a=a|0;NY(a);$Y(a);return}function qQ(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function rQ(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==37339?a+12|0:0)|0}function sQ(a){a=a|0;$Y(a);return}function tQ(a){a=a|0;f[a>>2]=9356;return}function uQ(a){a=a|0;return}function vQ(a){a=a|0;f[a>>2]=9328;if(b[a+12>>0]|0)AQ(a);Dh(a+16|0);uQ(a);return}function wQ(a){a=a|0;vQ(a);$Y(a);return}function xQ(a){a=a|0;if(!(b[a+12>>0]|0))BQ(a);return}function yQ(a){a=a|0;if(b[a+12>>0]|0)AQ(a);BQ(a);return}function zQ(a){a=a|0;if(b[a+12>>0]|0)AQ(a);return}function AQ(a){a=a|0;zb(21,f[a+4>>2]|0)|0;b[a+12>>0]=0;return}function BQ(a){a=a|0;Bb(22,f[a+4>>2]|0,f[a+8>>2]|0)|0;b[a+12>>0]=1;return}function CQ(a){a=a|0;Jc()}function DQ(a){a=a|0;FQ(a);return}function EQ(a){a=a|0;return}function FQ(a){a=a|0;var b=0;GQ(a,f[a+8>>2]|0);b=f[a>>2]|0;f[a>>2]=0;if(b|0)$Y(b);return}function GQ(a,b){a=a|0;b=b|0;while(1){if(!b)break;a=f[b>>2]|0;nQ(b+8|0);$Y(b);b=a}return}function HQ(a){a=a|0;var b=0;IQ(a);f[a>>2]=9280;b=a+4|0;f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;f[b+12>>2]=0;f[b+16>>2]=0;n[a+24>>2]=1.0;return}function IQ(a){a=a|0;f[a>>2]=9384;return}function JQ(a){a=a|0;Jc()}function KQ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;d=u;u=u+16|0;e=d;c=d+8|0;f[e>>2]=b;a=LQ(a+8|0,e)|0;if(a|0){MQ(c,a+12|0);a=f[c>>2]|0;if(a|0)NQ(a);kQ(c)}u=d;return}function LQ(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[b>>2]|0;e=f[a+4>>2]|0;a:do if(e){g=e+-1|0;h=(g&e|0)==0;if(!h)if(d>>>0<e>>>0)c=d;else c=(d>>>0)%(e>>>0)|0;else c=g&d;b=f[(f[a>>2]|0)+(c<<2)>>2]|0;if(b)while(1){b=f[b>>2]|0;if(!b){b=0;break a}a=f[b+4>>2]|0;if((a|0)==(d|0))if((f[b+8>>2]|0)==(d|0))break;else continue;if(!h){if(a>>>0>=e>>>0)a=(a>>>0)%(e>>>0)|0}else a=a&g;if((a|0)!=(c|0)){b=0;break}}else b=0}else b=0;while(0);return b|0}function MQ(a,b){a=a|0;b=b|0;var c=0,d=0;f[a>>2]=0;c=a+4|0;f[c>>2]=0;d=f[b+4>>2]|0;if(d){d=WY(d)|0;f[c>>2]=d;if(d|0)f[a>>2]=f[b>>2]}else f[c>>2]=0;return}function NQ(a){a=a|0;if(f[a+32>>2]|0)vh(a+16|0);return}function OQ(a){a=a|0;f[a>>2]=9404;zb(23,f[a+72>>2]|0)|0;VQ(a+48|0);WQ(a+16|0);XQ(a+4|0);YQ(a);return}function PQ(a){a=a|0;OQ(a);$Y(a);return}function QQ(a){a=a|0;return a+4|0}function RQ(a){a=a|0;return a+16|0}function SQ(a){a=a|0;return a+28|0}function TQ(a){a=a|0;return a+48|0}function UQ(a){a=a|0;return +(+n[a+68>>2])}function VQ(a){a=a|0;_Q(a+8|0);return}function WQ(a){a=a|0;var b=0,c=0,d=0;c=f[a>>2]|0;if(c|0){a=a+4|0;b=f[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-16|0;f[a>>2]=d;b=d}$Y(c)}return}function XQ(a){a=a|0;var b=0,c=0,d=0;b=f[a>>2]|0;if(b|0){c=a+4|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;ZQ(d)}$Y(f[a>>2]|0)}return}function YQ(a){a=a|0;return}function ZQ(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function _Q(a){a=a|0;var b=0,c=0,d=0;c=f[a>>2]|0;if(c|0){a=a+4|0;b=f[a>>2]|0;while(1){if((b|0)==(c|0))break;d=b+-8|0;f[a>>2]=d;b=d}$Y(c)}return}function $Q(a){a=a|0;var c=0;aR(a);f[a>>2]=9404;c=a+4|0;f[c>>2]=0;f[c+4>>2]=0;f[c+8>>2]=0;f[c+12>>2]=0;f[c+16>>2]=0;f[c+20>>2]=0;bR(a+28|0);b[a+44>>0]=0;cR(a+48|0);n[a+68>>2]=1.0;c=yb(24)|0;f[a+72>>2]=c;return}function aR(a){a=a|0;f[a>>2]=9440;return}function bR(a){a=a|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;return}function cR(a){a=a|0;f[a+8>>2]=0;f[a+12>>2]=0;f[a+16>>2]=0;return}function dR(a){a=a|0;Jc()}function eR(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0;g=c+8+3|0;i=b[g>>0]|0;h=c+4|0;fR(a,i<<24>>24<0?f[h>>2]|0:i&255);g=b[g>>0]|0;i=g<<24>>24<0;if(Eb(25,f[a+72>>2]|0,(i?f[c>>2]|0:c)|0,(i?f[h>>2]|0:g&255)|0,d|0,e&65535|0,f[a+56>>2]|0)|0){gR(a);hR(a)}return}function fR(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;i=u;u=u+16|0;h=i;d=f[a+4>>2]|0;e=a+8|0;while(1){g=f[e>>2]|0;if((g|0)==(d|0))break;g=g+-8|0;f[e>>2]=g;ZQ(g)}d=f[a+16>>2]|0;e=a+20|0;g=f[e>>2]|0;while(1){if((g|0)==(d|0))break;j=g+-16|0;f[e>>2]=j;g=j}bR(h);j=a+28|0;f[j>>2]=f[h>>2];f[j+4>>2]=f[h+4>>2];f[j+8>>2]=f[h+8>>2];f[j+12>>2]=f[h+12>>2];b[a+44>>0]=0;f[a+48>>2]=0;f[a+52>>2]=0;FR(a+56|0,c+1|0);u=i;return}function gR(a){a=a|0;var b=0,c=0.0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0;x=u;u=u+32|0;g=x+24|0;h=x+20|0;p=x+16|0;q=x+12|0;r=x+8|0;s=x+4|0;t=x;v=a+72|0;w=zb(26,f[v>>2]|0)|0;i=a+4|0;j=a+8|0;k=a+12|0;l=a+20|0;m=a+24|0;o=a+16|0;e=0;while(1){if((e|0)>=(w|0))break;c=+xb(27,f[v>>2]|0,e|0);n[p>>2]=c;c=+xb(28,f[v>>2]|0,e|0);n[q>>2]=c;c=+xb(29,f[v>>2]|0,e|0);n[r>>2]=c;c=+xb(30,f[v>>2]|0,e|0);n[s>>2]=c;b=YY(28,47264)|0;if(!b)b=0;else iR(b,f[v>>2]|0,e,+n[p>>2],+n[q>>2],+n[r>>2],c);f[t>>2]=b;d=f[j>>2]|0;if(d>>>0<(f[k>>2]|0)>>>0){f[h>>2]=0;f[g>>2]=f[h>>2];jR(d,b,g);f[j>>2]=(f[j>>2]|0)+8}else kR(i,t);b=f[l>>2]|0;if(b>>>0<(f[m>>2]|0)>>>0){lR(b,+n[p>>2],+n[q>>2],+n[r>>2],+n[s>>2]);f[l>>2]=(f[l>>2]|0)+16}else mR(o,p,q,r,s);nR(a,+n[p>>2],+n[q>>2],+n[r>>2],+n[s>>2]);e=e+1|0}u=x;return}function hR(a){a=a|0;var b=0,c=0;b=a+72|0;c=zb(31,f[b>>2]|0)|0;f[a+48>>2]=c;b=zb(32,f[b>>2]|0)|0;f[a+52>>2]=b;return}function iR(a,b,c,d,e,g,h){a=a|0;b=b|0;c=c|0;d=+d;e=+e;g=+g;h=+h;AR(a);f[a>>2]=9504;f[a+4>>2]=b;f[a+8>>2]=c;n[a+12>>2]=d;n[a+16>>2]=e;n[a+20>>2]=g;n[a+24>>2]=h;return}function jR(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=9476;f[c+12>>2]=b;f[a+4>>2]=c;return}function kR(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;j=u;u=u+32|0;c=j+24|0;e=j+20|0;g=j;h=a+4|0;i=((f[h>>2]|0)-(f[a>>2]|0)>>3)+1|0;d=sR(a)|0;if(d>>>0<i>>>0)MY(a);else{k=f[a>>2]|0;m=(f[a+8>>2]|0)-k|0;l=m>>2;tR(g,m>>3>>>0<d>>>1>>>0?(l>>>0<i>>>0?i:l):d,(f[h>>2]|0)-k>>3,a+8|0);i=g+8|0;d=f[i>>2]|0;h=f[b>>2]|0;f[e>>2]=0;f[c>>2]=f[e>>2];jR(d,h,c);f[i>>2]=(f[i>>2]|0)+8;uR(a,g);vR(g);u=j;return}}function lR(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;n[a>>2]=b;n[a+4>>2]=c;n[a+8>>2]=d;n[a+12>>2]=e;return}function mR(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,o=0;k=u;u=u+32|0;i=k;j=a+4|0;g=((f[j>>2]|0)-(f[a>>2]|0)>>4)+1|0;h=oR(a)|0;if(h>>>0<g>>>0)MY(a);else{l=f[a>>2]|0;o=(f[a+8>>2]|0)-l|0;m=o>>3;pR(i,o>>4>>>0<h>>>1>>>0?(m>>>0<g>>>0?g:m):h,(f[j>>2]|0)-l>>4,a+8|0);j=i+8|0;lR(f[j>>2]|0,+n[b>>2],+n[c>>2],+n[d>>2],+n[e>>2]);f[j>>2]=(f[j>>2]|0)+16;qR(a,i);rR(i);u=k;return}}function nR(a,c,d,e,g){a=a|0;c=+c;d=+d;e=+e;g=+g;var h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0.0;m=u;u=u+16|0;j=m+12|0;h=m+8|0;o=m+4|0;i=m;n[j>>2]=c;n[h>>2]=d;n[o>>2]=e;n[i>>2]=g;k=f[(e<c?o:j)>>2]|0;l=f[(g<d?i:h)>>2]|0;j=f[(c<e?o:j)>>2]|0;h=f[(d<g?i:h)>>2]|0;i=a+44|0;c=(f[s>>2]=k,+n[s>>2]);e=(f[s>>2]=l,+n[s>>2]);d=(f[s>>2]=j,+n[s>>2]);g=(f[s>>2]=h,+n[s>>2]);if(!(b[i>>0]|0)){f[a+28>>2]=k;f[a+32>>2]=l;f[a+36>>2]=j;f[a+40>>2]=h;b[i>>0]=1}else{o=a+28|0;p=+n[o>>2];n[o>>2]=p>c?c:p;o=a+32|0;c=+n[o>>2];n[o>>2]=c>e?e:c;o=a+36|0;e=+n[o>>2];n[o>>2]=e<d?d:e;o=a+40|0;d=+n[o>>2];n[o>>2]=d<g?g:d}u=m;return}function oR(a){a=a|0;return 268435455}function pR(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>268435455){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<4)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<4)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<4);return}function qR(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[a>>2]|0;h=a+4|0;g=b+4|0;e=(f[h>>2]|0)-d|0;c=(f[g>>2]|0)+(0-(e>>4)<<4)|0;f[g>>2]=c;if((e|0)>0){K_(c|0,d|0,e|0)|0;d=g;c=f[g>>2]|0}else d=g;g=f[a>>2]|0;f[a>>2]=c;f[d>>2]=g;g=b+8|0;e=f[h>>2]|0;f[h>>2]=f[g>>2];f[g>>2]=e;g=a+8|0;h=b+12|0;a=f[g>>2]|0;f[g>>2]=f[h>>2];f[h>>2]=a;f[b>>2]=f[d>>2];return}function rR(a){a=a|0;var b=0,c=0,d=0,e=0;b=f[a+4>>2]|0;c=a+8|0;d=f[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-16|0;f[c>>2]=e;d=e}a=f[a>>2]|0;if(a|0)$Y(a);return}function sR(a){a=a|0;return 536870911}function tR(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>536870911){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<3)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<3)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<3);return}function uR(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0;d=f[a>>2]|0;e=a+4|0;g=b+4|0;c=f[e>>2]|0;while(1){if((c|0)==(d|0))break;j=f[g>>2]|0;h=c+-8|0;f[j+-8>>2]=f[h>>2];i=c+-4|0;f[j+-4>>2]=f[i>>2];f[h>>2]=0;f[i>>2]=0;f[g>>2]=(f[g>>2]|0)+-8;c=h}h=f[a>>2]|0;f[a>>2]=f[g>>2];f[g>>2]=h;h=b+8|0;j=f[e>>2]|0;f[e>>2]=f[h>>2];f[h>>2]=j;h=a+8|0;j=b+12|0;i=f[h>>2]|0;f[h>>2]=f[j>>2];f[j>>2]=i;f[b>>2]=f[g>>2];return}function vR(a){a=a|0;var b=0,c=0,d=0;b=f[a+4>>2]|0;c=a+8|0;while(1){d=f[c>>2]|0;if((d|0)==(b|0))break;d=d+-8|0;f[c>>2]=d;ZQ(d)}a=f[a>>2]|0;if(a|0)$Y(a);return}function wR(a){a=a|0;NY(a);$Y(a);return}function xR(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function yR(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==38475?a+12|0:0)|0}function zR(a){a=a|0;$Y(a);return}function AR(a){a=a|0;f[a>>2]=9524;return}function BR(a){a=a|0;return}function CR(a){a=a|0;BR(a);$Y(a);return}function DR(a,c,d){a=a|0;c=c|0;d=d|0;if(!(Cb(33,f[c+4>>2]|0,f[c+8>>2]|0,(d|0)!=0|0)|0)){b[a>>0]=0;bR(a+4|0);bR(a+20|0)}else{b[a>>0]=1;lR(a+4|0,+n[c+12>>2],+n[c+16>>2],+n[c+20>>2],+n[c+24>>2]);lR(a+20|0,0.0,1.0,1.0,0.0)}return}function ER(a){a=a|0;Jc()}function FR(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;g=a+4|0;c=f[g>>2]|0;e=f[a>>2]|0;d=c-e>>3;a:do if(d>>>0>=b>>>0){if(d>>>0>b>>>0){a=e+(b<<3)|0;while(1){if((c|0)==(a|0))break a;e=c+-8|0;f[g>>2]=e;c=e}}}else GR(a,b-d|0);while(0);return}function GR(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0;i=u;u=u+32|0;e=i;g=a+8|0;h=a+4|0;c=f[h>>2]|0;do if((f[g>>2]|0)-c>>3>>>0<b>>>0){c=(c-(f[a>>2]|0)>>3)+b|0;d=IR(a)|0;if(d>>>0<c>>>0)MY(a);else{j=f[a>>2]|0;k=(f[g>>2]|0)-j|0;g=k>>2;JR(e,k>>3>>>0<d>>>1>>>0?(g>>>0<c>>>0?c:g):d,(f[h>>2]|0)-j>>3,a+8|0);KR(e,b);LR(a,e);MR(e);break}}else HR(a,b);while(0);u=i;return}function HR(a,b){a=a|0;b=b|0;var c=0;c=a+4|0;a=b;b=f[c>>2]|0;do{NR(b);b=(f[c>>2]|0)+8|0;f[c>>2]=b;a=a+-1|0}while((a|0)!=0);return}function IR(a){a=a|0;return 536870911}function JR(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;f[a+12>>2]=0;f[a+16>>2]=d;do if(b)if(b>>>0>536870911){c=Sa(8)|0;eZ(c,38407);f[c>>2]=11336;Wa(c|0,3056,442)}else{d=XY(b<<3)|0;break}else d=0;while(0);f[a>>2]=d;c=d+(c<<3)|0;f[a+8>>2]=c;f[a+4>>2]=c;f[a+12>>2]=d+(b<<3);return}function KR(a,b){a=a|0;b=b|0;var c=0;c=a+8|0;a=b;b=f[c>>2]|0;do{NR(b);b=(f[c>>2]|0)+8|0;f[c>>2]=b;a=a+-1|0}while((a|0)!=0);return}function LR(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;d=f[a>>2]|0;h=a+4|0;g=b+4|0;e=(f[h>>2]|0)-d|0;c=(f[g>>2]|0)+(0-(e>>3)<<3)|0;f[g>>2]=c;if((e|0)>0){K_(c|0,d|0,e|0)|0;d=g;c=f[g>>2]|0}else d=g;g=f[a>>2]|0;f[a>>2]=c;f[d>>2]=g;g=b+8|0;e=f[h>>2]|0;f[h>>2]=f[g>>2];f[g>>2]=e;g=a+8|0;h=b+12|0;a=f[g>>2]|0;f[g>>2]=f[h>>2];f[h>>2]=a;f[b>>2]=f[d>>2];return}function MR(a){a=a|0;var b=0,c=0,d=0,e=0;b=f[a+4>>2]|0;c=a+8|0;d=f[c>>2]|0;while(1){if((d|0)==(b|0))break;e=d+-8|0;f[c>>2]=e;d=e}a=f[a>>2]|0;if(a|0)$Y(a);return}function NR(a){a=a|0;f[a>>2]=0;f[a+4>>2]=0;return}function OR(a){a=a|0;return}function PR(a){a=a|0;OR(a);$Y(a);return}function QR(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;h=u;u=u+64|0;d=h+56|0;g=h+40|0;e=h;Oc(g|0);Qc(g|0,e|0);f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;g=RR(e)|0;if(g>>>0>4294967279)gZ(a);if(g>>>0<11){b[a+11>>0]=g;c=a}else{i=g+16&-16;c=XY(i)|0;f[a>>2]=c;f[a+8>>2]=i|-2147483648;f[a+4>>2]=g}vN(c,e,g)|0;b[d>>0]=0;uN(c+g|0,d);u=h;return}function RR(a){a=a|0;return YX(a)|0}function SR(a){a=a|0;var b=0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;b=0;while(1){if((b|0)==3)break;f[a+(b<<2)>>2]=0;b=b+1|0}a=a+12|0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;f[a+12>>2]=0;f[a+16>>2]=0;f[a+20>>2]=0;return}function TR(a){a=a|0;UR(a);VR(a+28|0);WR(a+20|0);QF(a+12|0);jZ(a);return}function UR(a){a=a|0;var b=0;a=a+20|0;b=f[a>>2]|0;if(b|0){Vs(Td[f[(f[b>>2]|0)+12>>2]&255](b)|0);b=f[a>>2]|0;Vs(Td[f[(f[b>>2]|0)+40>>2]&255](b)|0);b=f[a>>2]|0;Vs(Td[f[(f[b>>2]|0)+104>>2]&255](b)|0)}return}function VR(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function WR(a){a=a|0;a=f[a+4>>2]|0;if(a|0)UY(a);return}function XR(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;l=u;u=u+48|0;g=l+32|0;k=l+24|0;j=l+16|0;i=l+8|0;h=l;YR(k,a);c=f[k>>2]|0;if(!c)b=0;else{ZR(j,a,b,c);if(!(f[j>>2]|0))b=0;else{_R(i,a,b);if((f[i>>2]|0)!=0?($R(h,a),e=a+28|0,d=f[h>>2]|0,m=h+4|0,c=f[m>>2]|0,f[h>>2]=0,f[m>>2]=0,f[g>>2]=f[e>>2],f[e>>2]=d,d=a+32|0,f[g+4>>2]=f[d>>2],f[d>>2]=c,VR(g),VR(h),(f[e>>2]|0)!=0):0){aS(h,a,b,k,j,i);m=f[h>>2]|0;b=m;if(!m)b=0;else{c=a+20|0;f[g>>2]=b;d=g+4|0;e=f[h+4>>2]|0;f[d>>2]=e;if(e|0)SY(e);f[g>>2]=f[c>>2];f[c>>2]=b;b=a+24|0;f[d>>2]=f[b>>2];f[b>>2]=e;WR(g);bS(a);cS(a);b=1}WR(h)}else b=0;Wp(i)}Xp(j)}Vp(k);u=l;return b|0}function YR(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0;t=u;u=u+96|0;k=t+84|0;p=t+72|0;e=t+80|0;q=t+60|0;r=t+48|0;l=t+36|0;m=t+24|0;n=t+12|0;o=t;d=YY(4,47264)|0;if(!d)d=0;else{f[d>>2]=0;HV(d)}f[e>>2]=0;f[k>>2]=f[e>>2];IV(p,d,k);d=f[p>>2]|0;if(!d){oZ(c,41478)|0;f[a>>2]=0;f[a+4>>2]=0}else{ee[f[(f[d>>2]|0)+8>>2]&255](q,d);d=f[p>>2]|0;ee[f[(f[d>>2]|0)+8>>2]&255](r,d);d=b[q+11>>0]|0;g=d<<24>>24<0;d=d&255;h=g?f[q+4>>2]|0:d;i=r+11|0;v=b[i>>0]|0;e=v<<24>>24<0;j=r+4|0;a:do if((h|0)==((e?f[j>>2]|0:v&255)|0)){e=e?f[r>>2]|0:r;b:do if(g){if(yp(f[q>>2]|0,e,h)|0){s=27;break a}}else{g=q;while(1){if(!d)break b;if((b[g>>0]|0)!=(b[e>>0]|0)){s=27;break a}e=e+1|0;g=g+1|0;d=d+-1|0}}while(0);JV(o,41516,q);e=tZ(o,41562)|0;f[n>>2]=f[e>>2];f[n+4>>2]=f[e+4>>2];f[n+8>>2]=f[e+8>>2];d=0;while(1){if((d|0)==3)break;f[e+(d<<2)>>2]=0;d=d+1|0}e=b[i>>0]|0;d=e<<24>>24<0;e=sZ(n,d?f[r>>2]|0:r,d?f[j>>2]|0:e&255)|0;f[m>>2]=f[e>>2];f[m+4>>2]=f[e+4>>2];f[m+8>>2]=f[e+8>>2];d=0;while(1){if((d|0)==3)break;f[e+(d<<2)>>2]=0;d=d+1|0}e=tZ(m,41570)|0;f[l>>2]=f[e>>2];f[l+4>>2]=f[e+4>>2];f[l+8>>2]=f[e+8>>2];d=0;while(1){if((d|0)==3)break;f[e+(d<<2)>>2]=0;d=d+1|0}d=c+11|0;if((b[d>>0]|0)<0){v=f[c>>2]|0;b[k>>0]=0;uN(v,k);f[c+4>>2]=0}else{b[k>>0]=0;uN(c,k);b[d>>0]=0}nZ(c,0);f[c>>2]=f[l>>2];f[c+4>>2]=f[l+4>>2];f[c+8>>2]=f[l+8>>2];d=0;while(1){if((d|0)==3)break;f[l+(d<<2)>>2]=0;d=d+1|0}jZ(l);jZ(m);jZ(n);jZ(o);f[a>>2]=0;d=a+4|0}else s=27;while(0);if((s|0)==27){f[a>>2]=f[p>>2];d=p+4|0;f[a+4>>2]=f[d>>2];f[p>>2]=0}f[d>>2]=0;jZ(r);jZ(q)}Vp(p);u=t;return}function ZR(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0;m=u;u=u+48|0;i=m+38|0;l=m+24|0;j=m+12|0;k=m;h=m+36|0;dK(l,e+28|0,f[e+40>>2]|0,f[e+44>>2]|0,g);do if(UT(l)|0){e=f[l+4>>2]|0;if(!e){oZ(c,41449)|0;f[a>>2]=0;f[a+4>>2]=0;break}f[a>>2]=e;e=f[l+8>>2]|0;f[a+4>>2]=e;if(e|0)SY(e)}else{d[h>>1]=d[l>>1]|0;d[i>>1]=d[h>>1]|0;VT(k,i);g=vZ(k,0,41416)|0;f[j>>2]=f[g>>2];f[j+4>>2]=f[g+4>>2];f[j+8>>2]=f[g+8>>2];e=0;while(1){if((e|0)==3)break;f[g+(e<<2)>>2]=0;e=e+1|0}e=c+11|0;if((b[e>>0]|0)<0){h=f[c>>2]|0;b[i>>0]=0;uN(h,i);f[c+4>>2]=0}else{b[i>>0]=0;uN(c,i);b[e>>0]=0}nZ(c,0);f[c>>2]=f[j>>2];f[c+4>>2]=f[j+4>>2];f[c+8>>2]=f[j+8>>2];e=0;while(1){if((e|0)==3)break;f[j+(e<<2)>>2]=0;e=e+1|0}jZ(j);jZ(k);f[a>>2]=0;f[a+4>>2]=0}while(0);GV(l);u=m;return}function _R(a,c,e){a=a|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=u;u=u+96|0;n=t+64|0;q=t+48|0;r=t+40|0;j=t+60|0;m=t+56|0;s=t+24|0;o=t+12|0;p=t;k=t+80|0;l=c+12|0;g=YY(56,47264)|0;if(!g)g=0;else{h=g;i=h+56|0;do{f[h>>2]=0;h=h+4|0}while((h|0)<(i|0));dU(g)}f[r>>2]=0;f[n>>2]=f[r>>2];eU(q,g,n);g=f[q>>2]|0;f[q>>2]=f[l>>2];f[l>>2]=g;g=q+4|0;i=c+16|0;h=f[g>>2]|0;f[g>>2]=f[i>>2];f[i>>2]=h;QF(q);if(!(f[l>>2]|0)){oZ(c,40720)|0;f[a>>2]=0;f[a+4>>2]=0}else{g=YY(24,47264)|0;if(!g)g=0;else{f[g>>2]=0;f[g+4>>2]=0;f[g+8>>2]=0;f[g+12>>2]=0;f[g+16>>2]=0;f[g+20>>2]=0;fU(g)}f[j>>2]=0;f[n>>2]=f[j>>2];gU(q,g,n);if(!(f[q>>2]|0)){oZ(c,40765)|0;f[a>>2]=0;f[a+4>>2]=0}else{g=YY(4,47264)|0;if(!g)g=0;else{f[g>>2]=0;hU(g)}f[m>>2]=0;f[n>>2]=f[m>>2];iU(r,g,n);if(!(f[r>>2]|0)){oZ(c,40804)|0;f[a>>2]=0;f[a+4>>2]=0}else{jU(n,e+12|0);kU(o,e+24|0);aJ(s,l,q,n,o,r);do if(UT(s)|0){g=f[s+4>>2]|0;if(!g){oZ(c,40878)|0;f[a>>2]=0;f[a+4>>2]=0;break}f[a>>2]=g;g=f[s+8>>2]|0;f[a+4>>2]=g;if(g|0)SY(g)}else{d[k>>1]=d[s>>1]|0;d[n>>1]=d[k>>1]|0;VT(p,n);h=vZ(p,0,40838)|0;f[o>>2]=f[h>>2];f[o+4>>2]=f[h+4>>2];f[o+8>>2]=f[h+8>>2];g=0;while(1){if((g|0)==3)break;f[h+(g<<2)>>2]=0;g=g+1|0}g=c+11|0;if((b[g>>0]|0)<0){m=f[c>>2]|0;b[n>>0]=0;uN(m,n);f[c+4>>2]=0}else{b[n>>0]=0;uN(c,n);b[g>>0]=0}nZ(c,0);f[c>>2]=f[o>>2];f[c+4>>2]=f[o+4>>2];f[c+8>>2]=f[o+8>>2];g=0;while(1){if((g|0)==3)break;f[o+(g<<2)>>2]=0;g=g+1|0}jZ(o);jZ(p);f[a>>2]=0;f[a+4>>2]=0}while(0);lU(s)}RC(r)}Sz(q)}u=t;return}function $R(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0,h=0;h=u;u=u+32|0;d=h+16|0;g=h+8|0;e=h;c=YY(28,47264)|0;if(!c)c=0;else HQ(c);f[e>>2]=0;f[d>>2]=f[e>>2];_T(g,c,d);c=f[g>>2]|0;if(!c){oZ(b,40536)|0;f[a>>2]=0;c=a+4|0}else{f[a>>2]=c;c=g+4|0;f[a+4>>2]=f[c>>2];f[g>>2]=0}f[c>>2]=0;VR(g);u=h;return}function aS(a,c,e,g,h,i){a=a|0;c=c|0;e=e|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+64|0;l=p+40|0;o=p+24|0;m=p+12|0;n=p;k=p+48|0;f[l>>2]=f[c+28>>2];j=f[c+32>>2]|0;f[l+4>>2]=j;if(j|0)SY(j);ST(m,e+12|0);TT(n,e);Bu(o,i,h,g,l,m,n,f[e+8>>2]|0,f[e+48>>2]|0);Up(l);do if(UT(o)|0){j=f[o+4>>2]|0;if(!j){oZ(c,40506)|0;f[a>>2]=0;f[a+4>>2]=0;break}f[a>>2]=j;j=f[o+8>>2]|0;f[a+4>>2]=j;if(j|0)SY(j)}else{d[k>>1]=d[o>>1]|0;d[l>>1]=d[k>>1]|0;VT(n,l);e=vZ(n,0,40472)|0;f[m>>2]=f[e>>2];f[m+4>>2]=f[e+4>>2];f[m+8>>2]=f[e+8>>2];j=0;while(1){if((j|0)==3)break;f[e+(j<<2)>>2]=0;j=j+1|0}j=c+11|0;if((b[j>>0]|0)<0){k=f[c>>2]|0;b[l>>0]=0;uN(k,l);f[c+4>>2]=0}else{b[l>>0]=0;uN(c,l);b[j>>0]=0}nZ(c,0);f[c>>2]=f[m>>2];f[c+4>>2]=f[m+4>>2];f[c+8>>2]=f[m+8>>2];j=0;while(1){if((j|0)==3)break;f[m+(j<<2)>>2]=0;j=j+1|0}jZ(m);jZ(n);f[a>>2]=0;f[a+4>>2]=0}while(0);WT(o);u=p;return}function bS(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0;w=u;u=u+240|0;b=w+224|0;c=w+168|0;n=w+220|0;o=w+144|0;p=w+216|0;q=w+120|0;r=w+212|0;s=w+96|0;t=w+208|0;v=w+72|0;d=w+204|0;e=w+48|0;g=w+200|0;h=w+24|0;i=w+196|0;j=w;k=w+192|0;l=a+20|0;m=f[l>>2]|0;if(m|0){m=Td[f[(f[m>>2]|0)+12>>2]&255](m)|0;f[n>>2]=a;f[b>>2]=f[n>>2];dS(c,b);tt(m,c);Dh(c);n=f[l>>2]|0;n=Td[f[(f[n>>2]|0)+40>>2]&255](n)|0;f[p>>2]=a;f[b>>2]=f[p>>2];eS(o,b);tt(n,o);Dh(o);p=f[l>>2]|0;p=Td[f[(f[p>>2]|0)+104>>2]&255](p)|0;f[r>>2]=a;f[b>>2]=f[r>>2];fS(q,b);tt(p,q);Dh(q);r=f[l>>2]|0;r=Td[f[(f[r>>2]|0)+80>>2]&255](r)|0;f[t>>2]=a;f[b>>2]=f[t>>2];gS(s,b);tt(r,s);Dh(s);t=f[l>>2]|0;t=Td[f[(f[t>>2]|0)+84>>2]&255](t)|0;f[d>>2]=a;f[b>>2]=f[d>>2];hS(v,b);tt(t,v);Dh(v);v=f[l>>2]|0;v=Td[f[(f[v>>2]|0)+128>>2]&255](v)|0;f[g>>2]=a;f[b>>2]=f[g>>2];iS(e,b);tt(v,e);Dh(e);v=f[l>>2]|0;v=Td[f[(f[v>>2]|0)+136>>2]&255](v)|0;f[i>>2]=a;f[b>>2]=f[i>>2];jS(h,b);tt(v,h);Dh(h);v=f[l>>2]|0;v=Td[f[(f[v>>2]|0)+140>>2]&255](v)|0;f[k>>2]=a;f[b>>2]=f[k>>2];kS(j,b);tt(v,j);Dh(j)}u=w;return}function cS(a){a=a|0;var b=0,c=0;b=u;u=u+32|0;c=b;a=f[a+20>>2]|0;ee[f[(f[a>>2]|0)+36>>2]&255](c,a);Ab(34,h[c>>0]|0|0,+(+n[c+4>>2]),+(+n[c+8>>2]),h[c+12>>0]|0|0,+(+n[c+16>>2]),+(+n[c+20>>2]))|0;u=b;return}function dS(a,b){a=a|0;b=b|0;f[a>>2]=9872;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function eS(a,b){a=a|0;b=b|0;f[a>>2]=9828;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function fS(a,b){a=a|0;b=b|0;f[a>>2]=9784;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function gS(a,b){a=a|0;b=b|0;f[a>>2]=9740;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function hS(a,b){a=a|0;b=b|0;f[a>>2]=9696;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function iS(a,b){a=a|0;b=b|0;f[a>>2]=9652;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function jS(a,b){a=a|0;b=b|0;f[a>>2]=9608;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function kS(a,b){a=a|0;b=b|0;f[a>>2]=9564;f[a+4>>2]=f[b>>2];f[a+16>>2]=a;return}function lS(a){a=a|0;$Y(a);return}function mS(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=9564;f[b+4>>2]=f[a+4>>2];return b|0}function nS(a,b){a=a|0;b=b|0;f[b>>2]=9564;f[b+4>>2]=f[a+4>>2];return}function oS(a){a=a|0;return}function pS(a){a=a|0;$Y(a);return}function qS(a){a=a|0;tS(a+4|0);return}function rS(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==38947?a+4|0:0)|0}function sS(a){a=a|0;return 2520}function tS(a){a=a|0;uS(a);return}function uS(a){a=a|0;vS(0);return}function vS(a){a=a|0;yb(35)|0;return}function wS(a){a=a|0;$Y(a);return}function xS(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=9608;f[b+4>>2]=f[a+4>>2];return b|0}function yS(a,b){a=a|0;b=b|0;f[b>>2]=9608;f[b+4>>2]=f[a+4>>2];return}function zS(a){a=a|0;return}function AS(a){a=a|0;$Y(a);return}function BS(a){a=a|0;ES(a+4|0);return}function CS(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==39152?a+4|0:0)|0}function DS(a){a=a|0;return 2544}function ES(a){a=a|0;FS(a);return}function FS(a){a=a|0;GS(0);return}function GS(a){a=a|0;yb(36)|0;return}function HS(a){a=a|0;$Y(a);return}
function IS(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=9652;f[b+4>>2]=f[a+4>>2];return b|0}function JS(a,b){a=a|0;b=b|0;f[b>>2]=9652;f[b+4>>2]=f[a+4>>2];return}function KS(a){a=a|0;return}function LS(a){a=a|0;$Y(a);return}function MS(a){a=a|0;PS(a+4|0);return}function NS(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==39356?a+4|0:0)|0}function OS(a){a=a|0;return 2568}function PS(a){a=a|0;QS(a);return}function QS(a){a=a|0;RS(f[a>>2]|0);return}function RS(a){a=a|0;var b=0,c=0;b=u;u=u+16|0;c=b;a=f[a+20>>2]|0;ee[f[(f[a>>2]|0)+124>>2]&255](c,a);Bb(37,h[c>>0]|0|0,h[c+1>>0]|0|0)|0;u=b;return}function SS(a){a=a|0;$Y(a);return}function TS(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=9696;f[b+4>>2]=f[a+4>>2];return b|0}function US(a,b){a=a|0;b=b|0;f[b>>2]=9696;f[b+4>>2]=f[a+4>>2];return}function VS(a){a=a|0;return}function WS(a){a=a|0;$Y(a);return}function XS(a){a=a|0;_S(a+4|0);return}function YS(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==39559?a+4|0:0)|0}function ZS(a){a=a|0;return 2592}function _S(a){a=a|0;$S(a);return}function $S(a){a=a|0;aT(0);return}function aT(a){a=a|0;yb(38)|0;return}function bT(a){a=a|0;$Y(a);return}function cT(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=9740;f[b+4>>2]=f[a+4>>2];return b|0}function dT(a,b){a=a|0;b=b|0;f[b>>2]=9740;f[b+4>>2]=f[a+4>>2];return}function eT(a){a=a|0;return}function fT(a){a=a|0;$Y(a);return}function gT(a){a=a|0;jT(a+4|0);return}function hT(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==39750?a+4|0:0)|0}function iT(a){a=a|0;return 2616}function jT(a){a=a|0;kT(a);return}function kT(a){a=a|0;lT(0);return}function lT(a){a=a|0;yb(39)|0;return}function mT(a){a=a|0;$Y(a);return}function nT(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=9784;f[b+4>>2]=f[a+4>>2];return b|0}function oT(a,b){a=a|0;b=b|0;f[b>>2]=9784;f[b+4>>2]=f[a+4>>2];return}function pT(a){a=a|0;return}function qT(a){a=a|0;$Y(a);return}function rT(a){a=a|0;uT(a+4|0);return}function sT(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==39943?a+4|0:0)|0}function tT(a){a=a|0;return 2640}function uT(a){a=a|0;vT(a);return}function vT(a){a=a|0;wT(f[a>>2]|0);return}function wT(a){a=a|0;var b=0,c=0,d=0,e=0;a=f[a+20>>2]|0;a=Td[f[(f[a>>2]|0)+88>>2]&255](a)|0;e=h[a+4>>0]|0;d=h[a+5>>0]|0;c=h[a+6>>0]|0;b=Nn(a)|0;Db(40,e|0,d|0,c|0,b|0,h[a+7>>0]|0|0)|0;return}function xT(a){a=a|0;$Y(a);return}function yT(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=9828;f[b+4>>2]=f[a+4>>2];return b|0}function zT(a,b){a=a|0;b=b|0;f[b>>2]=9828;f[b+4>>2]=f[a+4>>2];return}function AT(a){a=a|0;return}function BT(a){a=a|0;$Y(a);return}function CT(a){a=a|0;FT(a+4|0);return}function DT(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==40160?a+4|0:0)|0}function ET(a){a=a|0;return 2664}function FT(a){a=a|0;GT(a);return}function GT(a){a=a|0;cS(f[a>>2]|0);return}function HT(a){a=a|0;$Y(a);return}function IT(a){a=a|0;var b=0;b=XY(8)|0;f[b>>2]=9872;f[b+4>>2]=f[a+4>>2];return b|0}function JT(a,b){a=a|0;b=b|0;f[b>>2]=9872;f[b+4>>2]=f[a+4>>2];return}function KT(a){a=a|0;return}function LT(a){a=a|0;$Y(a);return}function MT(a){a=a|0;PT(a+4|0);return}function NT(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==40316?a+4|0:0)|0}function OT(a){a=a|0;return 2688}function PT(a){a=a|0;QT(a);return}function QT(a){a=a|0;RT(f[a>>2]|0);return}function RT(a){a=a|0;a=f[a+20>>2]|0;Td[f[(f[a>>2]|0)+8>>2]&255](a)|0;return}function ST(a,b){a=a|0;b=b|0;ZT(a,f[b>>2]|0,f[b+4>>2]|0,+n[b+8>>2]);return}function TT(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0;d=u;u=u+16|0;g=d+4|0;h=d;e=d+8|0;Jp(h,+(j[c+4>>1]|0));XT(e,c);c=(b[c+6>>0]|0)!=0;f[g>>2]=f[h>>2];Kp(a,g,e,c);u=d;return}function UT(a){a=a|0;return (j[a>>1]|0)<2|0}function VT(a,b){a=a|0;b=b|0;wZ(a,(Cs(b)|0)&65535);return}function WT(a){a=a|0;WR(a+4|0);return}function XT(a,c){a=a|0;c=c|0;YT(a,b[c>>0]|0,b[c+1>>0]|0,b[c+2>>0]|0);return}function YT(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;b[a>>0]=c;b[a+1>>0]=d;b[a+2>>0]=e;return}function ZT(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;f[a>>2]=b;f[a+4>>2]=c;n[a+8>>2]=d;return}function _T(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=9916;f[c+12>>2]=b;f[a+4>>2]=c;return}function $T(a){a=a|0;NY(a);$Y(a);return}function aU(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function bU(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==40573?a+12|0:0)|0}function cU(a){a=a|0;$Y(a);return}function dU(a){a=a|0;_F(a);f[a>>2]=10060;Gh(a+8|0);$F(a+32|0);return}function eU(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=10032;f[c+12>>2]=b;f[a+4>>2]=c;return}function fU(a){a=a|0;var b=0;Hx(a);f[a>>2]=9080;b=a+4|0;f[b>>2]=0;f[b+4>>2]=0;f[b+8>>2]=0;f[b+12>>2]=0;n[a+20>>2]=1.0;return}function gU(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=10004;f[c+12>>2]=b;f[a+4>>2]=c;return}function hU(a){a=a|0;rU(a);f[a>>2]=9220;return}function iU(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=9944;f[c+12>>2]=b;f[a+4>>2]=c;return}function jU(a,b){a=a|0;b=b|0;f[a>>2]=f[b>>2];f[a+4>>2]=f[b+4>>2];f[a+8>>2]=0;f[a+12>>2]=0;return}function kU(a,c){a=a|0;c=c|0;mU(a,b[c>>0]|0,b[c+1>>0]|0,b[c+2>>0]|0,b[c+3>>0]|0);return}function lU(a){a=a|0;Wp(a+4|0);return}function mU(a,c,d,e,f){a=a|0;c=c|0;d=d|0;e=e|0;f=f|0;b[a>>0]=c;b[a+1>>0]=d;b[a+2>>0]=e;b[a+3>>0]=f;return}function nU(a){a=a|0;NY(a);$Y(a);return}function oU(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function pU(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==40918?a+12|0:0)|0}function qU(a){a=a|0;$Y(a);return}function rU(a){a=a|0;dx(a);f[a>>2]=9972;return}function sU(a){a=a|0;Jc()}function tU(a){a=a|0;NY(a);$Y(a);return}function uU(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function vU(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==41075?a+12|0:0)|0}function wU(a){a=a|0;$Y(a);return}function xU(a){a=a|0;NY(a);$Y(a);return}function yU(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function zU(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==41226?a+12|0:0)|0}function AU(a){a=a|0;$Y(a);return}function BU(a){a=a|0;f[a>>2]=10060;fH(a+32|0);Bh(a+8|0);gH(a);return}function CU(a){a=a|0;BU(a);$Y(a);return}function DU(a){a=a|0;return a+8|0}function EU(a){a=a|0;return a+32|0}function FU(a,b,c){a=a|0;b=b|0;c=c|0;Gb(b|0,c|0);return}function GU(a,b,c){a=a|0;b=b|0;c=c|0;Hb(b|0,c|0);return}function HU(a,b,c){a=a|0;b=b|0;c=c|0;Ib(b|0,c|0);return}function IU(a,b,c){a=a|0;b=b|0;c=c|0;Jb(b|0,c|0);return}function JU(a,b,c){a=a|0;b=b|0;c=c|0;Kb(b|0,c|0);return}function KU(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Lb(b|0,c|0,d|0,e|0);return}function LU(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Mb(b|0,c|0,d|0,e|0);return}function MU(a,b){a=a|0;b=b|0;return Nb(b|0)|0}function NU(a,b){a=a|0;b=b|0;Ob(b|0);return}function OU(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;Pb(+b,+c,+d,+e);return}function PU(a,b){a=a|0;b=b|0;Qb(b|0);return}function QU(a){a=a|0;return Rb()|0}function RU(a,b){a=a|0;b=b|0;return Sb(b|0)|0}function SU(a,b,c){a=a|0;b=b|0;c=c|0;Tb(b|0,c|0);return}function TU(a,b,c){a=a|0;b=b|0;c=c|0;Ub(b|0,c|0);return}function UU(a,b){a=a|0;b=b|0;Vb(b|0);return}function VU(a,b,c){a=a|0;b=b|0;c=c|0;Wb(b|0,c|0);return}function WU(a,b){a=a|0;b=b|0;Xb(b|0);return}function XU(a,b,c){a=a|0;b=b|0;c=c|0;Yb(b|0,c|0);return}function YU(a,b,c){a=a|0;b=b|0;c=c|0;Zb(b|0,c|0);return}function ZU(a,b){a=a|0;b=b|0;_b(b|0);return}function _U(a,b){a=a|0;b=b|0;$b(b|0);return}function $U(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ac(b|0,c|0,d|0,e|0);return}function aV(a,b){a=a|0;b=b|0;bc(b|0);return}function bV(a,b){a=a|0;b=b|0;cc(b|0);return}function cV(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;dc(b|0,c|0,d|0,e|0);return}function dV(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ec(b|0,c|0,d|0,e|0,f|0);return}function eV(a,b,c){a=a|0;b=b|0;c=c|0;fc(b|0,c|0);return}function fV(a,b,c){a=a|0;b=b|0;c=c|0;gc(b|0,c|0);return}function gV(a,b,c){a=a|0;b=b|0;c=c|0;hc(b|0,c|0);return}function hV(a,b,c){a=a|0;b=b|0;c=c|0;ic(b|0,c|0);return}function iV(a,b,c){a=a|0;b=b|0;c=c|0;return jc(b|0,c|0)|0}function jV(a){a=a|0;return kc()|0}function kV(a,b,c){a=a|0;b=b|0;c=c|0;lc(b|0,c|0);return}function lV(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;mc(b|0,c|0,d|0,e|0);return}function mV(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;nc(b|0,c|0,d|0);return}function nV(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;oc(b|0,c|0,d|0,e|0);return}function oV(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;pc(b|0,c|0,d|0);return}function pV(a,b,c){a=a|0;b=b|0;c=c|0;return qc(b|0,c|0)|0}function qV(a,b){a=a|0;b=b|0;return rc(b|0)|0}function rV(a,b){a=a|0;b=b|0;sc(b|0);return}function sV(a,b,c){a=a|0;b=b|0;c=c|0;tc(b|0,c|0);return}function tV(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;uc(b|0,c|0,d|0,e|0,f|0,g|0,h|0);return}function uV(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;vc(b|0,c|0,d|0,e|0);return}function vV(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;wc(b|0,c|0,d|0,e|0);return}function wV(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;xc(b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0);return}function xV(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;yc(b|0,c|0,d|0);return}function yV(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;zc(b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0);return}function zV(a,b,c){a=a|0;b=b|0;c=+c;Ac(b|0,+c);return}function AV(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Bc(b|0,c|0,d|0);return}function BV(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Cc(b|0,c|0,d|0);return}function CV(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Dc(b|0,c|0,d|0,e|0);return}function DV(a,b){a=a|0;b=b|0;Ec(b|0);return}function EV(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Fc(b|0,c|0,d|0,e|0,f|0,g|0);return}function FV(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Gc(b|0,c|0,d|0,e|0);return}function GV(a){a=a|0;Xp(a+4|0);return}function HV(a){a=a|0;OV(a);f[a>>2]=9544;return}function IV(a,b,c){a=a|0;b=b|0;c=c|0;f[a>>2]=b;c=XY(16)|0;f[c+4>>2]=0;f[c+8>>2]=0;f[c>>2]=10304;f[c+12>>2]=b;f[a+4>>2]=c;return}function JV(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0;k=u;u=u+16|0;j=k;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;e=0;while(1){if((e|0)==3)break;f[a+(e<<2)>>2]=0;e=e+1|0}h=RR(c)|0;i=d+11|0;g=b[i>>0]|0;g=g<<24>>24<0?f[d+4>>2]|0:g&255;e=g+h|0;if(e>>>0>4294967279)gZ(a);if(e>>>0<11){b[a+11>>0]=h;e=a}else{l=e+16&-16;e=XY(l)|0;f[a>>2]=e;f[a+8>>2]=l|-2147483648;f[a+4>>2]=h}vN(e,c,h)|0;b[j>>0]=0;uN(e+h|0,j);sZ(a,(b[i>>0]|0)<0?f[d>>2]|0:d,g)|0;u=k;return}function KV(a){a=a|0;NY(a);$Y(a);return}function LV(a){a=a|0;a=f[a+12>>2]|0;if(a|0)be[f[(f[a>>2]|0)+4>>2]&511](a);return}function MV(a,b){a=a|0;b=b|0;return ((f[b+4>>2]|0)==41572?a+12|0:0)|0}function NV(a){a=a|0;$Y(a);return}function OV(a){a=a|0;f[a>>2]=10332;return}function PV(a){a=a|0;Jc()}function QV(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;c=b+8|0;d=b;f[d>>2]=8;f[d+4>>2]=1;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];a=RV(a,c,41721)|0;u=b;return a|0}function RV(a,c,e){a=a|0;c=c|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=u;u=u+80|0;l=s+76|0;k=s+74|0;m=s+60|0;n=s+48|0;o=s+36|0;p=s+24|0;q=s+12|0;r=s;j=s+72|0;i=f[c>>2]|0;g=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{h=c+(g>>1)|0;if(!(g&1))c=i;else c=f[(f[h>>2]|0)+i>>2]|0;i=Td[c&255](h)|0;d[k>>1]=i;if(UT(k)|0)c=1;else{f[q>>2]=0;f[q+4>>2]=0;f[q+8>>2]=0;g=RR(41750)|0;if(g>>>0>4294967279)gZ(q);if(g>>>0<11){b[q+11>>0]=g;c=q}else{i=g+16&-16;c=XY(i)|0;f[q>>2]=c;f[q+8>>2]=i|-2147483648;f[q+4>>2]=g}vN(c,41750,g)|0;b[l>>0]=0;uN(c+g|0,l);d[j>>1]=d[k>>1]|0;d[l>>1]=d[j>>1]|0;VT(r,l);g=b[r+11>>0]|0;c=g<<24>>24<0;g=sZ(q,c?f[r>>2]|0:r,c?f[r+4>>2]|0:g&255)|0;f[p>>2]=f[g>>2];f[p+4>>2]=f[g+4>>2];f[p+8>>2]=f[g+8>>2];c=0;while(1){if((c|0)==3)break;f[g+(c<<2)>>2]=0;c=c+1|0}g=tZ(p,41765)|0;f[o>>2]=f[g>>2];f[o+4>>2]=f[g+4>>2];f[o+8>>2]=f[g+8>>2];c=0;while(1){if((c|0)==3)break;f[g+(c<<2)>>2]=0;c=c+1|0}g=tZ(o,e|0?e:47255)|0;f[n>>2]=f[g>>2];f[n+4>>2]=f[g+4>>2];f[n+8>>2]=f[g+8>>2];c=0;while(1){if((c|0)==3)break;f[g+(c<<2)>>2]=0;c=c+1|0}g=tZ(n,41570)|0;f[m>>2]=f[g>>2];f[m+4>>2]=f[g+4>>2];f[m+8>>2]=f[g+8>>2];c=0;while(1){if((c|0)==3)break;f[g+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[l>>0]=0;uN(e,l);f[a+4>>2]=0}else{b[l>>0]=0;uN(a,l);b[c>>0]=0}nZ(a,0);f[a>>2]=f[m>>2];f[a+4>>2]=f[m+4>>2];f[a+8>>2]=f[m+8>>2];c=0;while(1){if((c|0)==3)break;f[m+(c<<2)>>2]=0;c=c+1|0}jZ(m);jZ(n);jZ(o);jZ(p);jZ(r);jZ(q);c=0}}u=s;return c|0}function SV(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;f[d>>2]=b;f[g>>2]=112;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=TV(a,e,41805,d)|0;u=c;return b|0}function TV(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=u;u=u+80|0;m=t+76|0;l=t+74|0;o=t+60|0;p=t+48|0;q=t+36|0;r=t+24|0;s=t+12|0;n=t;k=t+72|0;j=f[c>>2]|0;h=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{i=c+(h>>1)|0;if(!(h&1))c=j;else c=f[(f[i>>2]|0)+j>>2]|0;g=Vd[c&127](i,f[g>>2]|0)|0;d[l>>1]=g;if(UT(l)|0)c=1;else{f[s>>2]=0;f[s+4>>2]=0;f[s+8>>2]=0;h=RR(41750)|0;if(h>>>0>4294967279)gZ(s);if(h>>>0<11){b[s+11>>0]=h;c=s}else{g=h+16&-16;c=XY(g)|0;f[s>>2]=c;f[s+8>>2]=g|-2147483648;f[s+4>>2]=h}vN(c,41750,h)|0;b[m>>0]=0;uN(c+h|0,m);d[k>>1]=d[l>>1]|0;d[m>>1]=d[k>>1]|0;VT(n,m);h=b[n+11>>0]|0;c=h<<24>>24<0;h=sZ(s,c?f[n>>2]|0:n,c?f[n+4>>2]|0:h&255)|0;f[r>>2]=f[h>>2];f[r+4>>2]=f[h+4>>2];f[r+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(r,41765)|0;f[q>>2]=f[h>>2];f[q+4>>2]=f[h+4>>2];f[q+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(q,e|0?e:47255)|0;f[p>>2]=f[h>>2];f[p+4>>2]=f[h+4>>2];f[p+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(p,41570)|0;f[o>>2]=f[h>>2];f[o+4>>2]=f[h+4>>2];f[o+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[m>>0]=0;uN(e,m);f[a+4>>2]=0}else{b[m>>0]=0;uN(a,m);b[c>>0]=0}nZ(a,0);f[a>>2]=f[o>>2];f[a+4>>2]=f[o+4>>2];f[a+8>>2]=f[o+8>>2];c=0;while(1){if((c|0)==3)break;f[o+(c<<2)>>2]=0;c=c+1|0}jZ(o);jZ(p);jZ(q);jZ(r);jZ(n);jZ(s);c=0}}u=t;return c|0}function UV(a,b){a=a|0;b=b|0;var c=0,e=0,g=0,h=0;c=u;u=u+32|0;g=c+8|0;e=c+16|0;h=c;d[e>>1]=b;f[h>>2]=96;f[h+4>>2]=1;f[g>>2]=f[h>>2];f[g+4>>2]=f[h+4>>2];b=VV(a,g,41814,e)|0;u=c;return b|0}function VV(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0;w=u;u=u+96|0;o=w+76|0;n=w+82|0;l=w+72|0;r=w+60|0;s=w+48|0;t=w+36|0;v=w+24|0;p=w+12|0;q=w;m=w+80|0;k=f[c>>2]|0;h=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{i=c+(h>>1)|0;if(!(h&1))c=k;else c=f[(f[i>>2]|0)+k>>2]|0;Jp(l,+(j[g>>1]|0));f[o>>2]=f[l>>2];l=Vd[c&127](i,o)|0;d[n>>1]=l;if(UT(n)|0)c=1;else{f[p>>2]=0;f[p+4>>2]=0;f[p+8>>2]=0;h=RR(41750)|0;if(h>>>0>4294967279)gZ(p);if(h>>>0<11){b[p+11>>0]=h;c=p}else{l=h+16&-16;c=XY(l)|0;f[p>>2]=c;f[p+8>>2]=l|-2147483648;f[p+4>>2]=h}vN(c,41750,h)|0;b[o>>0]=0;uN(c+h|0,o);d[m>>1]=d[n>>1]|0;d[o>>1]=d[m>>1]|0;VT(q,o);h=b[q+11>>0]|0;c=h<<24>>24<0;h=sZ(p,c?f[q>>2]|0:q,c?f[q+4>>2]|0:h&255)|0;f[v>>2]=f[h>>2];f[v+4>>2]=f[h+4>>2];f[v+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(v,41765)|0;f[t>>2]=f[h>>2];f[t+4>>2]=f[h+4>>2];f[t+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(t,e|0?e:47255)|0;f[s>>2]=f[h>>2];f[s+4>>2]=f[h+4>>2];f[s+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(s,41570)|0;f[r>>2]=f[h>>2];f[r+4>>2]=f[h+4>>2];f[r+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[o>>0]=0;uN(e,o);f[a+4>>2]=0}else{b[o>>0]=0;uN(a,o);b[c>>0]=0}nZ(a,0);f[a>>2]=f[r>>2];f[a+4>>2]=f[r+4>>2];f[a+8>>2]=f[r+8>>2];c=0;while(1){if((c|0)==3)break;f[r+(c<<2)>>2]=0;c=c+1|0}jZ(r);jZ(s);jZ(t);jZ(v);jZ(q);jZ(p);c=0}}u=w;return c|0}function WV(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+8|0;d=c+16|0;g=c;XT(d,b);f[g>>2]=92;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=XV(a,e,41829,d)|0;u=c;return b|0}function XV(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=u;u=u+80|0;m=t+76|0;l=t+74|0;o=t+60|0;p=t+48|0;q=t+36|0;r=t+24|0;s=t+12|0;n=t;k=t+72|0;j=f[c>>2]|0;h=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{i=c+(h>>1)|0;if(!(h&1))c=j;else c=f[(f[i>>2]|0)+j>>2]|0;g=Vd[c&127](i,g)|0;d[l>>1]=g;if(UT(l)|0)c=1;else{f[s>>2]=0;f[s+4>>2]=0;f[s+8>>2]=0;h=RR(41750)|0;if(h>>>0>4294967279)gZ(s);if(h>>>0<11){b[s+11>>0]=h;c=s}else{g=h+16&-16;c=XY(g)|0;f[s>>2]=c;f[s+8>>2]=g|-2147483648;f[s+4>>2]=h}vN(c,41750,h)|0;b[m>>0]=0;uN(c+h|0,m);d[k>>1]=d[l>>1]|0;d[m>>1]=d[k>>1]|0;VT(n,m);h=b[n+11>>0]|0;c=h<<24>>24<0;h=sZ(s,c?f[n>>2]|0:n,c?f[n+4>>2]|0:h&255)|0;f[r>>2]=f[h>>2];f[r+4>>2]=f[h+4>>2];f[r+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(r,41765)|0;f[q>>2]=f[h>>2];f[q+4>>2]=f[h+4>>2];f[q+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(q,e|0?e:47255)|0;f[p>>2]=f[h>>2];f[p+4>>2]=f[h+4>>2];f[p+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(p,41570)|0;f[o>>2]=f[h>>2];f[o+4>>2]=f[h+4>>2];f[o+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[m>>0]=0;uN(e,m);f[a+4>>2]=0}else{b[m>>0]=0;uN(a,m);b[c>>0]=0}nZ(a,0);f[a>>2]=f[o>>2];f[a+4>>2]=f[o+4>>2];f[a+8>>2]=f[o+8>>2];c=0;while(1){if((c|0)==3)break;f[o+(c<<2)>>2]=0;c=c+1|0}jZ(o);jZ(p);jZ(q);jZ(r);jZ(n);jZ(s);c=0}}u=t;return c|0}function YV(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+24|0;d=c+8|0;g=c;ST(d,b);f[g>>2]=16;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=ZV(a,e,41845,d)|0;u=c;return b|0}function ZV(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=u;u=u+80|0;m=t+76|0;l=t+74|0;o=t+60|0;p=t+48|0;q=t+36|0;r=t+24|0;s=t+12|0;n=t;k=t+72|0;j=f[c>>2]|0;h=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{i=c+(h>>1)|0;if(!(h&1))c=j;else c=f[(f[i>>2]|0)+j>>2]|0;g=Vd[c&127](i,g)|0;d[l>>1]=g;if(UT(l)|0)c=1;else{f[s>>2]=0;f[s+4>>2]=0;f[s+8>>2]=0;h=RR(41750)|0;if(h>>>0>4294967279)gZ(s);if(h>>>0<11){b[s+11>>0]=h;c=s}else{g=h+16&-16;c=XY(g)|0;f[s>>2]=c;f[s+8>>2]=g|-2147483648;f[s+4>>2]=h}vN(c,41750,h)|0;b[m>>0]=0;uN(c+h|0,m);d[k>>1]=d[l>>1]|0;d[m>>1]=d[k>>1]|0;VT(n,m);h=b[n+11>>0]|0;c=h<<24>>24<0;h=sZ(s,c?f[n>>2]|0:n,c?f[n+4>>2]|0:h&255)|0;f[r>>2]=f[h>>2];f[r+4>>2]=f[h+4>>2];f[r+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(r,41765)|0;f[q>>2]=f[h>>2];f[q+4>>2]=f[h+4>>2];f[q+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(q,e|0?e:47255)|0;f[p>>2]=f[h>>2];f[p+4>>2]=f[h+4>>2];f[p+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(p,41570)|0;f[o>>2]=f[h>>2];f[o+4>>2]=f[h+4>>2];f[o+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[m>>0]=0;uN(e,m);f[a+4>>2]=0}else{b[m>>0]=0;uN(a,m);b[c>>0]=0}nZ(a,0);f[a>>2]=f[o>>2];f[a+4>>2]=f[o+4>>2];f[a+8>>2]=f[o+8>>2];c=0;while(1){if((c|0)==3)break;f[o+(c<<2)>>2]=0;c=c+1|0}jZ(o);jZ(p);jZ(q);jZ(r);jZ(n);jZ(s);c=0}}u=t;return c|0}function _V(a,b,c){a=a|0;b=b|0;c=+c;var d=0,e=0,g=0,h=0,i=0;d=u;u=u+32|0;h=d+24|0;e=d+8|0;g=d+16|0;i=d;n[e>>2]=c;$V(g,b);f[i>>2]=20;f[i+4>>2]=1;f[h>>2]=f[i>>2];f[h+4>>2]=f[i+4>>2];b=aW(a,h,41852,g,e)|0;u=d;return b|0}function $V(a,b){a=a|0;b=b|0;Im(a,+n[b>>2],+n[b+4>>2]);return}function aW(a,c,e,g,h){a=a|0;c=c|0;e=e|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0;w=u;u=u+80|0;o=w+76|0;m=w+74|0;r=w+60|0;s=w+48|0;t=w+36|0;v=w+24|0;p=w+12|0;q=w;l=w+72|0;k=f[c>>2]|0;i=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{j=c+(i>>1)|0;if(!(i&1))c=k;else c=f[(f[j>>2]|0)+k>>2]|0;h=Wd[c&7](j,g,+n[h>>2])|0;d[m>>1]=h;if(UT(m)|0)c=1;else{f[p>>2]=0;f[p+4>>2]=0;f[p+8>>2]=0;i=RR(41750)|0;if(i>>>0>4294967279)gZ(p);if(i>>>0<11){b[p+11>>0]=i;c=p}else{h=i+16&-16;c=XY(h)|0;f[p>>2]=c;f[p+8>>2]=h|-2147483648;f[p+4>>2]=i}vN(c,41750,i)|0;b[o>>0]=0;uN(c+i|0,o);d[l>>1]=d[m>>1]|0;d[o>>1]=d[l>>1]|0;VT(q,o);i=b[q+11>>0]|0;c=i<<24>>24<0;i=sZ(p,c?f[q>>2]|0:q,c?f[q+4>>2]|0:i&255)|0;f[v>>2]=f[i>>2];f[v+4>>2]=f[i+4>>2];f[v+8>>2]=f[i+8>>2];c=0;while(1){if((c|0)==3)break;f[i+(c<<2)>>2]=0;c=c+1|0}i=tZ(v,41765)|0;f[t>>2]=f[i>>2];f[t+4>>2]=f[i+4>>2];f[t+8>>2]=f[i+8>>2];c=0;while(1){if((c|0)==3)break;f[i+(c<<2)>>2]=0;c=c+1|0}i=tZ(t,e|0?e:47255)|0;f[s>>2]=f[i>>2];f[s+4>>2]=f[i+4>>2];f[s+8>>2]=f[i+8>>2];c=0;while(1){if((c|0)==3)break;f[i+(c<<2)>>2]=0;c=c+1|0}i=tZ(s,41570)|0;f[r>>2]=f[i>>2];f[r+4>>2]=f[i+4>>2];f[r+8>>2]=f[i+8>>2];c=0;while(1){if((c|0)==3)break;f[i+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[o>>0]=0;uN(e,o);f[a+4>>2]=0}else{b[o>>0]=0;uN(a,o);b[c>>0]=0}nZ(a,0);f[a>>2]=f[r>>2];f[a+4>>2]=f[r+4>>2];f[a+8>>2]=f[r+8>>2];c=0;while(1){if((c|0)==3)break;f[r+(c<<2)>>2]=0;c=c+1|0}jZ(r);jZ(s);jZ(t);jZ(v);jZ(q);jZ(p);c=0}}u=w;return c|0}function bW(a,b){a=a|0;b=+b;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;n[d>>2]=b;f[g>>2]=44;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];a=cW(a,e,41860,d)|0;u=c;return a|0}function cW(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0;v=u;u=u+80|0;m=v+76|0;l=v+74|0;p=v+60|0;q=v+48|0;r=v+36|0;s=v+24|0;t=v+12|0;o=v;k=v+72|0;j=f[c>>2]|0;h=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{i=c+(h>>1)|0;if(!(h&1))c=j;else c=f[(f[i>>2]|0)+j>>2]|0;g=Ud[c&7](i,+n[g>>2])|0;d[l>>1]=g;if(UT(l)|0)c=1;else{f[t>>2]=0;f[t+4>>2]=0;f[t+8>>2]=0;h=RR(41750)|0;if(h>>>0>4294967279)gZ(t);if(h>>>0<11){b[t+11>>0]=h;c=t}else{g=h+16&-16;c=XY(g)|0;f[t>>2]=c;f[t+8>>2]=g|-2147483648;f[t+4>>2]=h}vN(c,41750,h)|0;b[m>>0]=0;uN(c+h|0,m);d[k>>1]=d[l>>1]|0;d[m>>1]=d[k>>1]|0;VT(o,m);h=b[o+11>>0]|0;c=h<<24>>24<0;h=sZ(t,c?f[o>>2]|0:o,c?f[o+4>>2]|0:h&255)|0;f[s>>2]=f[h>>2];f[s+4>>2]=f[h+4>>2];f[s+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(s,41765)|0;f[r>>2]=f[h>>2];f[r+4>>2]=f[h+4>>2];f[r+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(r,e|0?e:47255)|0;f[q>>2]=f[h>>2];f[q+4>>2]=f[h+4>>2];f[q+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(q,41570)|0;f[p>>2]=f[h>>2];f[p+4>>2]=f[h+4>>2];f[p+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[m>>0]=0;uN(e,m);f[a+4>>2]=0}else{b[m>>0]=0;uN(a,m);b[c>>0]=0}nZ(a,0);f[a>>2]=f[p>>2];f[a+4>>2]=f[p+4>>2];f[a+8>>2]=f[p+8>>2];c=0;while(1){if((c|0)==3)break;f[p+(c<<2)>>2]=0;c=c+1|0}jZ(p);jZ(q);jZ(r);jZ(s);jZ(o);jZ(t);c=0}}u=v;return c|0}function dW(a,b){a=a|0;b=+b;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;n[d>>2]=b;f[g>>2]=48;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];a=cW(a,e,41875,d)|0;u=c;return a|0}function eW(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;$V(d,b);f[g>>2]=52;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=fW(a,e,41890,d)|0;u=c;return b|0}function fW(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=u;u=u+80|0;m=t+76|0;l=t+74|0;o=t+60|0;p=t+48|0;q=t+36|0;r=t+24|0;s=t+12|0;n=t;k=t+72|0;j=f[c>>2]|0;h=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{i=c+(h>>1)|0;if(!(h&1))c=j;else c=f[(f[i>>2]|0)+j>>2]|0;g=Vd[c&127](i,g)|0;d[l>>1]=g;if(UT(l)|0)c=1;else{f[s>>2]=0;f[s+4>>2]=0;f[s+8>>2]=0;h=RR(41750)|0;if(h>>>0>4294967279)gZ(s);if(h>>>0<11){b[s+11>>0]=h;c=s}else{g=h+16&-16;c=XY(g)|0;f[s>>2]=c;f[s+8>>2]=g|-2147483648;f[s+4>>2]=h}vN(c,41750,h)|0;b[m>>0]=0;uN(c+h|0,m);d[k>>1]=d[l>>1]|0;d[m>>1]=d[k>>1]|0;VT(n,m);h=b[n+11>>0]|0;c=h<<24>>24<0;h=sZ(s,c?f[n>>2]|0:n,c?f[n+4>>2]|0:h&255)|0;f[r>>2]=f[h>>2];f[r+4>>2]=f[h+4>>2];f[r+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(r,41765)|0;f[q>>2]=f[h>>2];f[q+4>>2]=f[h+4>>2];f[q+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(q,e|0?e:47255)|0;f[p>>2]=f[h>>2];f[p+4>>2]=f[h+4>>2];f[p+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(p,41570)|0;f[o>>2]=f[h>>2];f[o+4>>2]=f[h+4>>2];f[o+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[m>>0]=0;uN(e,m);f[a+4>>2]=0}else{b[m>>0]=0;uN(a,m);b[c>>0]=0}nZ(a,0);f[a>>2]=f[o>>2];f[a+4>>2]=f[o+4>>2];f[a+8>>2]=f[o+8>>2];c=0;while(1){if((c|0)==3)break;f[o+(c<<2)>>2]=0;c=c+1|0}jZ(o);jZ(p);jZ(q);jZ(r);jZ(n);jZ(s);c=0}}u=t;return c|0}function gW(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;$V(d,b);f[g>>2]=56;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=fW(a,e,41900,d)|0;u=c;return b|0}function hW(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;$V(d,b);f[g>>2]=60;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=fW(a,e,41911,d)|0;u=c;return b|0}function iW(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;$V(d,b);f[g>>2]=64;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=fW(a,e,41921,d)|0;u=c;return b|0}function jW(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;c=b+8|0;d=b;f[d>>2]=68;f[d+4>>2]=1;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];a=RV(a,c,41930)|0;u=b;return a|0}function kW(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;f[d>>2]=b;f[g>>2]=72;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=lW(a,e,41940,d)|0;u=c;return b|0}function lW(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=u;u=u+80|0;m=t+76|0;l=t+74|0;o=t+60|0;p=t+48|0;q=t+36|0;r=t+24|0;s=t+12|0;n=t;k=t+72|0;j=f[c>>2]|0;h=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{i=c+(h>>1)|0;if(!(h&1))c=j;else c=f[(f[i>>2]|0)+j>>2]|0;g=Vd[c&127](i,f[g>>2]|0)|0;d[l>>1]=g;if(UT(l)|0)c=1;else{f[s>>2]=0;f[s+4>>2]=0;f[s+8>>2]=0;h=RR(41750)|0;if(h>>>0>4294967279)gZ(s);if(h>>>0<11){b[s+11>>0]=h;c=s}else{g=h+16&-16;c=XY(g)|0;f[s>>2]=c;f[s+8>>2]=g|-2147483648;f[s+4>>2]=h}vN(c,41750,h)|0;b[m>>0]=0;uN(c+h|0,m);d[k>>1]=d[l>>1]|0;d[m>>1]=d[k>>1]|0;VT(n,m);h=b[n+11>>0]|0;c=h<<24>>24<0;h=sZ(s,c?f[n>>2]|0:n,c?f[n+4>>2]|0:h&255)|0;f[r>>2]=f[h>>2];f[r+4>>2]=f[h+4>>2];f[r+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(r,41765)|0;f[q>>2]=f[h>>2];f[q+4>>2]=f[h+4>>2];f[q+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(q,e|0?e:47255)|0;f[p>>2]=f[h>>2];f[p+4>>2]=f[h+4>>2];f[p+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(p,41570)|0;f[o>>2]=f[h>>2];f[o+4>>2]=f[h+4>>2];f[o+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[m>>0]=0;uN(e,m);f[a+4>>2]=0}else{b[m>>0]=0;uN(a,m);b[c>>0]=0}nZ(a,0);f[a>>2]=f[o>>2];f[a+4>>2]=f[o+4>>2];f[a+8>>2]=f[o+8>>2];c=0;while(1){if((c|0)==3)break;f[o+(c<<2)>>2]=0;c=c+1|0}jZ(o);jZ(p);jZ(q);jZ(r);jZ(n);jZ(s);c=0}}u=t;return c|0}function mW(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,g=0;c=u;u=u+32|0;e=c+16|0;d=c+8|0;g=c;f[d>>2]=b;f[g>>2]=76;f[g+4>>2]=1;f[e>>2]=f[g>>2];f[e+4>>2]=f[g+4>>2];b=nW(a,e,41954,d)|0;u=c;return b|0}function nW(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=u;u=u+80|0;m=t+76|0;l=t+74|0;o=t+60|0;p=t+48|0;q=t+36|0;r=t+24|0;s=t+12|0;n=t;k=t+72|0;j=f[c>>2]|0;h=f[c+4>>2]|0;c=f[a+20>>2]|0;if(!c){oZ(a,41728)|0;c=0}else{i=c+(h>>1)|0;if(!(h&1))c=j;else c=f[(f[i>>2]|0)+j>>2]|0;g=Vd[c&127](i,f[g>>2]|0)|0;d[l>>1]=g;if(UT(l)|0)c=1;else{f[s>>2]=0;f[s+4>>2]=0;f[s+8>>2]=0;h=RR(41750)|0;if(h>>>0>4294967279)gZ(s);if(h>>>0<11){b[s+11>>0]=h;c=s}else{g=h+16&-16;c=XY(g)|0;f[s>>2]=c;f[s+8>>2]=g|-2147483648;f[s+4>>2]=h}vN(c,41750,h)|0;b[m>>0]=0;uN(c+h|0,m);d[k>>1]=d[l>>1]|0;d[m>>1]=d[k>>1]|0;VT(n,m);h=b[n+11>>0]|0;c=h<<24>>24<0;h=sZ(s,c?f[n>>2]|0:n,c?f[n+4>>2]|0:h&255)|0;f[r>>2]=f[h>>2];f[r+4>>2]=f[h+4>>2];f[r+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(r,41765)|0;f[q>>2]=f[h>>2];f[q+4>>2]=f[h+4>>2];f[q+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(q,e|0?e:47255)|0;f[p>>2]=f[h>>2];f[p+4>>2]=f[h+4>>2];f[p+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}h=tZ(p,41570)|0;f[o>>2]=f[h>>2];f[o+4>>2]=f[h+4>>2];f[o+8>>2]=f[h+8>>2];c=0;while(1){if((c|0)==3)break;f[h+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){e=f[a>>2]|0;b[m>>0]=0;uN(e,m);f[a+4>>2]=0}else{b[m>>0]=0;uN(a,m);b[c>>0]=0}nZ(a,0);f[a>>2]=f[o>>2];f[a+4>>2]=f[o+4>>2];f[a+8>>2]=f[o+8>>2];c=0;while(1){if((c|0)==3)break;f[o+(c<<2)>>2]=0;c=c+1|0}jZ(o);jZ(p);jZ(q);jZ(r);jZ(n);jZ(s);c=0}}u=t;return c|0}function oW(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;c=b+8|0;d=b;f[d>>2]=116;f[d+4>>2]=1;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];a=RV(a,c,41973)|0;u=b;return a|0}function pW(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;c=b+8|0;d=b;f[d>>2]=120;f[d+4>>2]=1;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];a=RV(a,c,41978)|0;u=b;return a|0}function qW(a){a=a|0;var b=0,c=0,d=0;b=u;u=u+16|0;c=b+8|0;d=b;f[d>>2]=144;f[d+4>>2]=1;f[c>>2]=f[d>>2];f[c+4>>2]=f[d+4>>2];a=RV(a,c,41983)|0;u=b;return a|0}function rW(a){a=a|0;var c=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;l=u;u=u+48|0;h=l+40|0;k=l+24|0;c=l+38|0;i=l+12|0;j=l;e=l+36|0;g=a+20|0;if(!(f[g>>2]|0)){oZ(a,41728)|0;c=0}else{jP(k);g=f[g>>2]|0;g=Vd[f[(f[g>>2]|0)+132>>2]&127](g,k)|0;d[c>>1]=g;if(UT(c)|0)c=1;else{d[e>>1]=d[c>>1]|0;d[h>>1]=d[e>>1]|0;VT(j,h);e=vZ(j,0,41996)|0;f[i>>2]=f[e>>2];f[i+4>>2]=f[e+4>>2];f[i+8>>2]=f[e+8>>2];c=0;while(1){if((c|0)==3)break;f[e+(c<<2)>>2]=0;c=c+1|0}c=a+11|0;if((b[c>>0]|0)<0){g=f[a>>2]|0;b[h>>0]=0;uN(g,h);f[a+4>>2]=0}else{b[h>>0]=0;uN(a,h);b[c>>0]=0}nZ(a,0);f[a>>2]=f[i>>2];f[a+4>>2]=f[i+4>>2];f[a+8>>2]=f[i+8>>2];c=0;while(1){if((c|0)==3)break;f[i+(c<<2)>>2]=0;c=c+1|0}jZ(i);jZ(j);c=0}bP(k)}u=l;return c|0}function sW(a){a=a|0;var b=0;b=f[a+12>>2]|0;if(!b){oZ(a,42029)|0;a=0}else{uh(Td[f[(f[b>>2]|0)+8>>2]&255](b)|0);a=1}return a|0}function tW(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;i=u;u=u+48|0;d=i+32|0;e=i+16|0;g=i;h=f[a+12>>2]|0;if(!h){oZ(a,42029)|0;a=0}else{h=Td[f[(f[h>>2]|0)+12>>2]&255](h)|0;b[d>>0]=1;jU(e,c);ST(g,c);uW(h,e,g,d);if(!(b[d>>0]|0)){oZ(a,42044)|0;a=0}else a=1}u=i;return a|0}function uW(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(f[a+16>>2]|0)vW(a,b,c,d);return}function vW(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;a=f[a+16>>2]|0;if(!a){d=Sa(4)|0;f[d>>2]=0;wh(d);Wa(d|0,288,50)}else{ie[f[(f[a>>2]|0)+24>>2]&31](a,b,c,d);return}}function wW(a,b){a=a|0;b=b|0;var c=0;c=f[a+28>>2]|0;if(!c){oZ(a,42072)|0;a=0}else{KQ(c,b);a=1}return a|0}function xW(){yW();return}function yW(){zW(0);return}function zW(a){a=a|0;rb(AW()|0,42097);cb(PN()|0,42102,1,1,0);BW();CW();DW();EW();FW();GW();HW();IW();JW();KW();LW();nb(pM()|0,42107);nb(MW()|0,42119);ob(NW()|0,4,42152);hb(OW()|0,42165);PW();QW(42181);RW(42218);SW(42257);TW(42288);UW(42328);VW(42357);WW();XW();QW(42395);RW(42427);SW(42460);TW(42493);UW(42527);VW(42560);YW();ZW();_W();return}function AW(){return OX()|0}function BW(){lb(MX()|0,43406,1,-128,127);return}function CW(){lb(KX()|0,43394,1,-128,127);return}function DW(){lb(PO()|0,43380,1,0,255);return}function EW(){lb(IX()|0,43374,2,-32768,32767);return}function FW(){lb(VN()|0,43359,2,0,65535);return}function GW(){lb(GX()|0,43355,4,-2147483648,2147483647);return}function HW(){lb(vO()|0,43342,4,0,-1);return}function IW(){lb(EX()|0,43337,4,-2147483648,2147483647);return}function JW(){lb(CX()|0,43323,4,0,-1);return}function KW(){kb(nO()|0,43317,4);return}function LW(){kb(AX()|0,43310,8);return}function MW(){return zX()|0}function NW(){return yX()|0}function OW(){return xX()|0}function PW(){mb(vX()|0,0,43104);return}function QW(a){a=a|0;mb(tX()|0,0,a|0);return}function RW(a){a=a|0;mb(rX()|0,1,a|0);return}function SW(a){a=a|0;mb(pX()|0,2,a|0);return}function TW(a){a=a|0;mb(nX()|0,3,a|0);return}function UW(a){a=a|0;mb(lX()|0,4,a|0);return}function VW(a){a=a|0;mb(jX()|0,5,a|0);return}function WW(){mb(hX()|0,4,42857);return}function XW(){mb(fX()|0,5,42787);return}function YW(){mb(dX()|0,6,42725);return}function ZW(){mb(bX()|0,7,42662);return}function _W(){mb($W()|0,7,42594);return}function $W(){return aX()|0}function aX(){return 2792}function bX(){return cX()|0}function cX(){return 2800}function dX(){return eX()|0}function eX(){return 2808}function fX(){return gX()|0}function gX(){return 2816}function hX(){return iX()|0}function iX(){return 2824}function jX(){return kX()|0}function kX(){return 2832}function lX(){return mX()|0}function mX(){return 2840}function nX(){return oX()|0}function oX(){return 2848}function pX(){return qX()|0}function qX(){return 2856}function rX(){return sX()|0}function sX(){return 2864}function tX(){return uX()|0}function uX(){return 2872}function vX(){return wX()|0}function wX(){return 2880}function xX(){return 2888}function yX(){return 2896}function zX(){return 2920}function AX(){return BX()|0}function BX(){return 3224}function CX(){return DX()|0}function DX(){return 3208}function EX(){return FX()|0}function FX(){return 3200}function GX(){return HX()|0}function HX(){return 3184}function IX(){return JX()|0}function JX(){return 3168}function KX(){return LX()|0}function LX(){return 3160}function MX(){return NX()|0}function NX(){return 3144}function OX(){return 3120}function PX(a){a=a|0;return FY(f[a+4>>2]|0)|0}function QX(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0;x=u;u=u+16|0;o=x;do if(a>>>0<245){l=a>>>0<11?16:a+11&-8;a=l>>>3;n=f[11669]|0;c=n>>>a;if(c&3|0){b=(c&1^1)+a|0;a=46716+(b<<1<<2)|0;c=a+8|0;d=f[c>>2]|0;e=d+8|0;g=f[e>>2]|0;if((g|0)==(a|0))f[11669]=n&~(1<<b);else{f[g+12>>2]=a;f[c>>2]=g}w=b<<3;f[d+4>>2]=w|3;w=d+w+4|0;f[w>>2]=f[w>>2]|1;w=e;u=x;return w|0}m=f[11671]|0;if(l>>>0>m>>>0){if(c|0){b=2<<a;b=c<<a&(b|0-b);b=(b&0-b)+-1|0;i=b>>>12&16;b=b>>>i;c=b>>>5&8;b=b>>>c;g=b>>>2&4;b=b>>>g;a=b>>>1&2;b=b>>>a;d=b>>>1&1;d=(c|i|g|a|d)+(b>>>d)|0;b=46716+(d<<1<<2)|0;a=b+8|0;g=f[a>>2]|0;i=g+8|0;c=f[i>>2]|0;if((c|0)==(b|0)){a=n&~(1<<d);f[11669]=a}else{f[c+12>>2]=b;f[a>>2]=c;a=n}w=d<<3;h=w-l|0;f[g+4>>2]=l|3;e=g+l|0;f[e+4>>2]=h|1;f[g+w>>2]=h;if(m|0){d=f[11674]|0;b=m>>>3;c=46716+(b<<1<<2)|0;b=1<<b;if(!(a&b)){f[11669]=a|b;b=c;a=c+8|0}else{a=c+8|0;b=f[a>>2]|0}f[a>>2]=d;f[b+12>>2]=d;f[d+8>>2]=b;f[d+12>>2]=c}f[11671]=h;f[11674]=e;w=i;u=x;return w|0}j=f[11670]|0;if(j){c=(j&0-j)+-1|0;i=c>>>12&16;c=c>>>i;h=c>>>5&8;c=c>>>h;k=c>>>2&4;c=c>>>k;d=c>>>1&2;c=c>>>d;a=c>>>1&1;a=f[46980+((h|i|k|d|a)+(c>>>a)<<2)>>2]|0;c=(f[a+4>>2]&-8)-l|0;d=f[a+16+(((f[a+16>>2]|0)==0&1)<<2)>>2]|0;if(!d){k=a;h=c}else{do{i=(f[d+4>>2]&-8)-l|0;k=i>>>0<c>>>0;c=k?i:c;a=k?d:a;d=f[d+16+(((f[d+16>>2]|0)==0&1)<<2)>>2]|0}while((d|0)!=0);k=a;h=c}i=k+l|0;if(i>>>0>k>>>0){e=f[k+24>>2]|0;b=f[k+12>>2]|0;do if((b|0)==(k|0)){a=k+20|0;b=f[a>>2]|0;if(!b){a=k+16|0;b=f[a>>2]|0;if(!b){c=0;break}}while(1){c=b+20|0;d=f[c>>2]|0;if(d|0){b=d;a=c;continue}c=b+16|0;d=f[c>>2]|0;if(!d)break;else{b=d;a=c}}f[a>>2]=0;c=b}else{c=f[k+8>>2]|0;f[c+12>>2]=b;f[b+8>>2]=c;c=b}while(0);do if(e|0){b=f[k+28>>2]|0;a=46980+(b<<2)|0;if((k|0)==(f[a>>2]|0)){f[a>>2]=c;if(!c){f[11670]=j&~(1<<b);break}}else{f[e+16+(((f[e+16>>2]|0)!=(k|0)&1)<<2)>>2]=c;if(!c)break}f[c+24>>2]=e;b=f[k+16>>2]|0;if(b|0){f[c+16>>2]=b;f[b+24>>2]=c}b=f[k+20>>2]|0;if(b|0){f[c+20>>2]=b;f[b+24>>2]=c}}while(0);if(h>>>0<16){w=h+l|0;f[k+4>>2]=w|3;w=k+w+4|0;f[w>>2]=f[w>>2]|1}else{f[k+4>>2]=l|3;f[i+4>>2]=h|1;f[i+h>>2]=h;if(m|0){d=f[11674]|0;b=m>>>3;c=46716+(b<<1<<2)|0;b=1<<b;if(!(n&b)){f[11669]=n|b;b=c;a=c+8|0}else{a=c+8|0;b=f[a>>2]|0}f[a>>2]=d;f[b+12>>2]=d;f[d+8>>2]=b;f[d+12>>2]=c}f[11671]=h;f[11674]=i}w=k+8|0;u=x;return w|0}else m=l}else m=l}else m=l}else if(a>>>0<=4294967231){a=a+11|0;l=a&-8;k=f[11670]|0;if(k){d=0-l|0;a=a>>>8;if(a)if(l>>>0>16777215)j=31;else{n=(a+1048320|0)>>>16&8;v=a<<n;m=(v+520192|0)>>>16&4;v=v<<m;j=(v+245760|0)>>>16&2;j=14-(m|n|j)+(v<<j>>>15)|0;j=l>>>(j+7|0)&1|j<<1}else j=0;c=f[46980+(j<<2)>>2]|0;a:do if(!c){c=0;a=0;v=57}else{a=0;i=c;h=l<<((j|0)==31?0:25-(j>>>1)|0);c=0;while(1){e=(f[i+4>>2]&-8)-l|0;if(e>>>0<d>>>0)if(!e){d=0;c=i;a=i;v=61;break a}else{a=i;d=e}e=f[i+20>>2]|0;i=f[i+16+(h>>>31<<2)>>2]|0;c=(e|0)==0|(e|0)==(i|0)?c:e;e=(i|0)==0;if(e){v=57;break}else h=h<<((e^1)&1)}}while(0);if((v|0)==57){if((c|0)==0&(a|0)==0){a=2<<j;a=k&(a|0-a);if(!a){m=l;break}n=(a&0-a)+-1|0;i=n>>>12&16;n=n>>>i;h=n>>>5&8;n=n>>>h;j=n>>>2&4;n=n>>>j;m=n>>>1&2;n=n>>>m;c=n>>>1&1;a=0;c=f[46980+((h|i|j|m|c)+(n>>>c)<<2)>>2]|0}if(!c){i=a;h=d}else v=61}if((v|0)==61)while(1){v=0;m=(f[c+4>>2]&-8)-l|0;n=m>>>0<d>>>0;d=n?m:d;a=n?c:a;c=f[c+16+(((f[c+16>>2]|0)==0&1)<<2)>>2]|0;if(!c){i=a;h=d;break}else v=61}if((i|0)!=0?h>>>0<((f[11671]|0)-l|0)>>>0:0){g=i+l|0;if(g>>>0<=i>>>0){w=0;u=x;return w|0}e=f[i+24>>2]|0;b=f[i+12>>2]|0;do if((b|0)==(i|0)){a=i+20|0;b=f[a>>2]|0;if(!b){a=i+16|0;b=f[a>>2]|0;if(!b){b=0;break}}while(1){c=b+20|0;d=f[c>>2]|0;if(d|0){b=d;a=c;continue}c=b+16|0;d=f[c>>2]|0;if(!d)break;else{b=d;a=c}}f[a>>2]=0}else{w=f[i+8>>2]|0;f[w+12>>2]=b;f[b+8>>2]=w}while(0);do if(e){a=f[i+28>>2]|0;c=46980+(a<<2)|0;if((i|0)==(f[c>>2]|0)){f[c>>2]=b;if(!b){d=k&~(1<<a);f[11670]=d;break}}else{f[e+16+(((f[e+16>>2]|0)!=(i|0)&1)<<2)>>2]=b;if(!b){d=k;break}}f[b+24>>2]=e;a=f[i+16>>2]|0;if(a|0){f[b+16>>2]=a;f[a+24>>2]=b}a=f[i+20>>2]|0;if(a){f[b+20>>2]=a;f[a+24>>2]=b;d=k}else d=k}else d=k;while(0);do if(h>>>0>=16){f[i+4>>2]=l|3;f[g+4>>2]=h|1;f[g+h>>2]=h;b=h>>>3;if(h>>>0<256){c=46716+(b<<1<<2)|0;a=f[11669]|0;b=1<<b;if(!(a&b)){f[11669]=a|b;b=c;a=c+8|0}else{a=c+8|0;b=f[a>>2]|0}f[a>>2]=g;f[b+12>>2]=g;f[g+8>>2]=b;f[g+12>>2]=c;break}b=h>>>8;if(b)if(h>>>0>16777215)b=31;else{v=(b+1048320|0)>>>16&8;w=b<<v;t=(w+520192|0)>>>16&4;w=w<<t;b=(w+245760|0)>>>16&2;b=14-(t|v|b)+(w<<b>>>15)|0;b=h>>>(b+7|0)&1|b<<1}else b=0;c=46980+(b<<2)|0;f[g+28>>2]=b;a=g+16|0;f[a+4>>2]=0;f[a>>2]=0;a=1<<b;if(!(d&a)){f[11670]=d|a;f[c>>2]=g;f[g+24>>2]=c;f[g+12>>2]=g;f[g+8>>2]=g;break}a=h<<((b|0)==31?0:25-(b>>>1)|0);c=f[c>>2]|0;while(1){if((f[c+4>>2]&-8|0)==(h|0)){v=97;break}d=c+16+(a>>>31<<2)|0;b=f[d>>2]|0;if(!b){v=96;break}else{a=a<<1;c=b}}if((v|0)==96){f[d>>2]=g;f[g+24>>2]=c;f[g+12>>2]=g;f[g+8>>2]=g;break}else if((v|0)==97){v=c+8|0;w=f[v>>2]|0;f[w+12>>2]=g;f[v>>2]=g;f[g+8>>2]=w;f[g+12>>2]=c;f[g+24>>2]=0;break}}else{w=h+l|0;f[i+4>>2]=w|3;w=i+w+4|0;f[w>>2]=f[w>>2]|1}while(0);w=i+8|0;u=x;return w|0}else m=l}else m=l}else m=-1;while(0);c=f[11671]|0;if(c>>>0>=m>>>0){b=c-m|0;a=f[11674]|0;if(b>>>0>15){w=a+m|0;f[11674]=w;f[11671]=b;f[w+4>>2]=b|1;f[a+c>>2]=b;f[a+4>>2]=m|3}else{f[11671]=0;f[11674]=0;f[a+4>>2]=c|3;w=a+c+4|0;f[w>>2]=f[w>>2]|1}w=a+8|0;u=x;return w|0}i=f[11672]|0;if(i>>>0>m>>>0){t=i-m|0;f[11672]=t;w=f[11675]|0;v=w+m|0;f[11675]=v;f[v+4>>2]=t|1;f[w+4>>2]=m|3;w=w+8|0;u=x;return w|0}if(!(f[11787]|0)){f[11789]=4096;f[11788]=4096;f[11790]=-1;f[11791]=-1;f[11792]=0;f[11780]=0;f[11787]=o&-16^1431655768;a=4096}else a=f[11789]|0;j=m+48|0;k=m+47|0;h=a+k|0;e=0-a|0;l=h&e;if(l>>>0<=m>>>0){w=0;u=x;return w|0}a=f[11779]|0;if(a|0?(n=f[11777]|0,o=n+l|0,o>>>0<=n>>>0|o>>>0>a>>>0):0){w=0;u=x;return w|0}b:do if(!(f[11780]&4)){c=f[11675]|0;c:do if(c){d=47124;while(1){a=f[d>>2]|0;if(a>>>0<=c>>>0?(r=d+4|0,(a+(f[r>>2]|0)|0)>>>0>c>>>0):0)break;a=f[d+8>>2]|0;if(!a){v=118;break c}else d=a}b=h-i&e;if(b>>>0<2147483647){a=O_(b|0)|0;if((a|0)==((f[d>>2]|0)+(f[r>>2]|0)|0)){if((a|0)!=(-1|0)){h=b;g=a;v=135;break b}}else{d=a;v=126}}else b=0}else v=118;while(0);do if((v|0)==118){c=O_(0)|0;if((c|0)!=(-1|0)?(b=c,p=f[11788]|0,q=p+-1|0,b=((q&b|0)==0?0:(q+b&0-p)-b|0)+l|0,p=f[11777]|0,q=b+p|0,b>>>0>m>>>0&b>>>0<2147483647):0){r=f[11779]|0;if(r|0?q>>>0<=p>>>0|q>>>0>r>>>0:0){b=0;break}a=O_(b|0)|0;if((a|0)==(c|0)){h=b;g=c;v=135;break b}else{d=a;v=126}}else b=0}while(0);do if((v|0)==126){c=0-b|0;if(!(j>>>0>b>>>0&(b>>>0<2147483647&(d|0)!=(-1|0))))if((d|0)==(-1|0)){b=0;break}else{h=b;g=d;v=135;break b}a=f[11789]|0;a=k-b+a&0-a;if(a>>>0>=2147483647){h=b;g=d;v=135;break b}if((O_(a|0)|0)==(-1|0)){O_(c|0)|0;b=0;break}else{h=a+b|0;g=d;v=135;break b}}while(0);f[11780]=f[11780]|4;v=133}else{b=0;v=133}while(0);if(((v|0)==133?l>>>0<2147483647:0)?(g=O_(l|0)|0,r=O_(0)|0,s=r-g|0,t=s>>>0>(m+40|0)>>>0,!((g|0)==(-1|0)|t^1|g>>>0<r>>>0&((g|0)!=(-1|0)&(r|0)!=(-1|0))^1)):0){h=t?s:b;v=135}if((v|0)==135){b=(f[11777]|0)+h|0;f[11777]=b;if(b>>>0>(f[11778]|0)>>>0)f[11778]=b;j=f[11675]|0;do if(j){b=47124;while(1){a=f[b>>2]|0;c=b+4|0;d=f[c>>2]|0;if((g|0)==(a+d|0)){v=143;break}e=f[b+8>>2]|0;if(!e)break;else b=e}if(((v|0)==143?(f[b+12>>2]&8|0)==0:0)?g>>>0>j>>>0&a>>>0<=j>>>0:0){f[c>>2]=d+h;w=(f[11672]|0)+h|0;t=j+8|0;t=(t&7|0)==0?0:0-t&7;v=j+t|0;t=w-t|0;f[11675]=v;f[11672]=t;f[v+4>>2]=t|1;f[j+w+4>>2]=40;f[11676]=f[11791];break}if(g>>>0<(f[11673]|0)>>>0)f[11673]=g;a=g+h|0;b=47124;while(1){if((f[b>>2]|0)==(a|0)){v=151;break}b=f[b+8>>2]|0;if(!b){a=47124;break}}if((v|0)==151)if(!(f[b+12>>2]&8)){f[b>>2]=g;l=b+4|0;f[l>>2]=(f[l>>2]|0)+h;l=g+8|0;l=g+((l&7|0)==0?0:0-l&7)|0;b=a+8|0;b=a+((b&7|0)==0?0:0-b&7)|0;k=l+m|0;i=b-l-m|0;f[l+4>>2]=m|3;do if((j|0)!=(b|0)){if((f[11674]|0)==(b|0)){w=(f[11671]|0)+i|0;f[11671]=w;f[11674]=k;f[k+4>>2]=w|1;f[k+w>>2]=w;break}a=f[b+4>>2]|0;if((a&3|0)==1){h=a&-8;d=a>>>3;d:do if(a>>>0<256){a=f[b+8>>2]|0;c=f[b+12>>2]|0;if((c|0)==(a|0)){f[11669]=f[11669]&~(1<<d);break}else{f[a+12>>2]=c;f[c+8>>2]=a;break}}else{g=f[b+24>>2]|0;a=f[b+12>>2]|0;do if((a|0)==(b|0)){d=b+16|0;c=d+4|0;a=f[c>>2]|0;if(!a){a=f[d>>2]|0;if(!a){a=0;break}else c=d}while(1){d=a+20|0;e=f[d>>2]|0;if(e|0){a=e;c=d;continue}d=a+16|0;e=f[d>>2]|0;if(!e)break;else{a=e;c=d}}f[c>>2]=0}else{w=f[b+8>>2]|0;f[w+12>>2]=a;f[a+8>>2]=w}while(0);if(!g)break;c=f[b+28>>2]|0;d=46980+(c<<2)|0;do if((f[d>>2]|0)!=(b|0)){f[g+16+(((f[g+16>>2]|0)!=(b|0)&1)<<2)>>2]=a;if(!a)break d}else{f[d>>2]=a;if(a|0)break;f[11670]=f[11670]&~(1<<c);break d}while(0);f[a+24>>2]=g;c=b+16|0;d=f[c>>2]|0;if(d|0){f[a+16>>2]=d;f[d+24>>2]=a}c=f[c+4>>2]|0;if(!c)break;f[a+20>>2]=c;f[c+24>>2]=a}while(0);b=b+h|0;e=h+i|0}else e=i;b=b+4|0;f[b>>2]=f[b>>2]&-2;f[k+4>>2]=e|1;f[k+e>>2]=e;b=e>>>3;if(e>>>0<256){c=46716+(b<<1<<2)|0;a=f[11669]|0;b=1<<b;if(!(a&b)){f[11669]=a|b;b=c;a=c+8|0}else{a=c+8|0;b=f[a>>2]|0}f[a>>2]=k;f[b+12>>2]=k;f[k+8>>2]=b;f[k+12>>2]=c;break}b=e>>>8;do if(!b)b=0;else{if(e>>>0>16777215){b=31;break}v=(b+1048320|0)>>>16&8;w=b<<v;t=(w+520192|0)>>>16&4;w=w<<t;b=(w+245760|0)>>>16&2;b=14-(t|v|b)+(w<<b>>>15)|0;b=e>>>(b+7|0)&1|b<<1}while(0);d=46980+(b<<2)|0;f[k+28>>2]=b;a=k+16|0;f[a+4>>2]=0;f[a>>2]=0;a=f[11670]|0;c=1<<b;if(!(a&c)){f[11670]=a|c;f[d>>2]=k;f[k+24>>2]=d;f[k+12>>2]=k;f[k+8>>2]=k;break}a=e<<((b|0)==31?0:25-(b>>>1)|0);c=f[d>>2]|0;while(1){if((f[c+4>>2]&-8|0)==(e|0)){v=192;break}d=c+16+(a>>>31<<2)|0;b=f[d>>2]|0;if(!b){v=191;break}else{a=a<<1;c=b}}if((v|0)==191){f[d>>2]=k;f[k+24>>2]=c;f[k+12>>2]=k;f[k+8>>2]=k;break}else if((v|0)==192){v=c+8|0;w=f[v>>2]|0;f[w+12>>2]=k;f[v>>2]=k;f[k+8>>2]=w;f[k+12>>2]=c;f[k+24>>2]=0;break}}else{w=(f[11672]|0)+i|0;f[11672]=w;f[11675]=k;f[k+4>>2]=w|1}while(0);w=l+8|0;u=x;return w|0}else a=47124;while(1){b=f[a>>2]|0;if(b>>>0<=j>>>0?(w=b+(f[a+4>>2]|0)|0,w>>>0>j>>>0):0)break;a=f[a+8>>2]|0}e=w+-47|0;a=e+8|0;a=e+((a&7|0)==0?0:0-a&7)|0;e=j+16|0;a=a>>>0<e>>>0?j:a;b=a+8|0;c=h+-40|0;t=g+8|0;t=(t&7|0)==0?0:0-t&7;v=g+t|0;t=c-t|0;f[11675]=v;f[11672]=t;f[v+4>>2]=t|1;f[g+c+4>>2]=40;f[11676]=f[11791];c=a+4|0;f[c>>2]=27;f[b>>2]=f[11781];f[b+4>>2]=f[11782];f[b+8>>2]=f[11783];f[b+12>>2]=f[11784];f[11781]=g;f[11782]=h;f[11784]=0;f[11783]=b;b=a+24|0;do{v=b;b=b+4|0;f[b>>2]=7}while((v+8|0)>>>0<w>>>0);if((a|0)!=(j|0)){g=a-j|0;f[c>>2]=f[c>>2]&-2;f[j+4>>2]=g|1;f[a>>2]=g;b=g>>>3;if(g>>>0<256){c=46716+(b<<1<<2)|0;a=f[11669]|0;b=1<<b;if(!(a&b)){f[11669]=a|b;b=c;a=c+8|0}else{a=c+8|0;b=f[a>>2]|0}f[a>>2]=j;f[b+12>>2]=j;f[j+8>>2]=b;f[j+12>>2]=c;break}b=g>>>8;if(b)if(g>>>0>16777215)c=31;else{v=(b+1048320|0)>>>16&8;w=b<<v;t=(w+520192|0)>>>16&4;w=w<<t;c=(w+245760|0)>>>16&2;c=14-(t|v|c)+(w<<c>>>15)|0;c=g>>>(c+7|0)&1|c<<1}else c=0;d=46980+(c<<2)|0;f[j+28>>2]=c;f[j+20>>2]=0;f[e>>2]=0;b=f[11670]|0;a=1<<c;if(!(b&a)){f[11670]=b|a;f[d>>2]=j;f[j+24>>2]=d;f[j+12>>2]=j;f[j+8>>2]=j;break}a=g<<((c|0)==31?0:25-(c>>>1)|0);c=f[d>>2]|0;while(1){if((f[c+4>>2]&-8|0)==(g|0)){v=213;break}d=c+16+(a>>>31<<2)|0;b=f[d>>2]|0;if(!b){v=212;break}else{a=a<<1;c=b}}if((v|0)==212){f[d>>2]=j;f[j+24>>2]=c;f[j+12>>2]=j;f[j+8>>2]=j;break}else if((v|0)==213){v=c+8|0;w=f[v>>2]|0;f[w+12>>2]=j;f[v>>2]=j;f[j+8>>2]=w;f[j+12>>2]=c;f[j+24>>2]=0;break}}}else{w=f[11673]|0;if((w|0)==0|g>>>0<w>>>0)f[11673]=g;f[11781]=g;f[11782]=h;f[11784]=0;f[11678]=f[11787];f[11677]=-1;f[11682]=46716;f[11681]=46716;f[11684]=46724;f[11683]=46724;f[11686]=46732;f[11685]=46732;f[11688]=46740;f[11687]=46740;f[11690]=46748;f[11689]=46748;f[11692]=46756;f[11691]=46756;f[11694]=46764;f[11693]=46764;f[11696]=46772;f[11695]=46772;f[11698]=46780;f[11697]=46780;f[11700]=46788;f[11699]=46788;f[11702]=46796;f[11701]=46796;f[11704]=46804;f[11703]=46804;f[11706]=46812;f[11705]=46812;f[11708]=46820;f[11707]=46820;f[11710]=46828;f[11709]=46828;f[11712]=46836;f[11711]=46836;f[11714]=46844;f[11713]=46844;f[11716]=46852;f[11715]=46852;f[11718]=46860;f[11717]=46860;f[11720]=46868;f[11719]=46868;f[11722]=46876;f[11721]=46876;f[11724]=46884;f[11723]=46884;f[11726]=46892;f[11725]=46892;f[11728]=46900;f[11727]=46900;f[11730]=46908;f[11729]=46908;f[11732]=46916;f[11731]=46916;f[11734]=46924;f[11733]=46924;f[11736]=46932;f[11735]=46932;f[11738]=46940;f[11737]=46940;f[11740]=46948;f[11739]=46948;f[11742]=46956;f[11741]=46956;f[11744]=46964;f[11743]=46964;w=h+-40|0;t=g+8|0;t=(t&7|0)==0?0:0-t&7;v=g+t|0;t=w-t|0;f[11675]=v;f[11672]=t;f[v+4>>2]=t|1;f[g+w+4>>2]=40;f[11676]=f[11791]}while(0);b=f[11672]|0;if(b>>>0>m>>>0){t=b-m|0;f[11672]=t;w=f[11675]|0;v=w+m|0;f[11675]=v;f[v+4>>2]=t|1;f[w+4>>2]=m|3;w=w+8|0;u=x;return w|0}}w=VX()|0;f[w>>2]=12;w=0;u=x;return w|0}function RX(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0;if(!a)return;c=a+-8|0;e=f[11673]|0;a=f[a+-4>>2]|0;b=a&-8;j=c+b|0;do if(!(a&1)){d=f[c>>2]|0;if(!(a&3))return;h=c+(0-d)|0;g=d+b|0;if(h>>>0<e>>>0)return;if((f[11674]|0)==(h|0)){a=j+4|0;b=f[a>>2]|0;if((b&3|0)!=3){i=h;b=g;break}f[11671]=g;f[a>>2]=b&-2;f[h+4>>2]=g|1;f[h+g>>2]=g;return}c=d>>>3;if(d>>>0<256){a=f[h+8>>2]|0;b=f[h+12>>2]|0;if((b|0)==(a|0)){f[11669]=f[11669]&~(1<<c);i=h;b=g;break}else{f[a+12>>2]=b;f[b+8>>2]=a;i=h;b=g;break}}e=f[h+24>>2]|0;a=f[h+12>>2]|0;do if((a|0)==(h|0)){c=h+16|0;b=c+4|0;a=f[b>>2]|0;if(!a){a=f[c>>2]|0;if(!a){a=0;break}else b=c}while(1){c=a+20|0;d=f[c>>2]|0;if(d|0){a=d;b=c;continue}c=a+16|0;d=f[c>>2]|0;if(!d)break;else{a=d;b=c}}f[b>>2]=0}else{i=f[h+8>>2]|0;f[i+12>>2]=a;f[a+8>>2]=i}while(0);if(e){b=f[h+28>>2]|0;c=46980+(b<<2)|0;if((f[c>>2]|0)==(h|0)){f[c>>2]=a;if(!a){f[11670]=f[11670]&~(1<<b);i=h;b=g;break}}else{f[e+16+(((f[e+16>>2]|0)!=(h|0)&1)<<2)>>2]=a;if(!a){i=h;b=g;break}}f[a+24>>2]=e;b=h+16|0;c=f[b>>2]|0;if(c|0){f[a+16>>2]=c;f[c+24>>2]=a}b=f[b+4>>2]|0;if(b){f[a+20>>2]=b;f[b+24>>2]=a;i=h;b=g}else{i=h;b=g}}else{i=h;b=g}}else{i=c;h=c}while(0);if(h>>>0>=j>>>0)return;a=j+4|0;d=f[a>>2]|0;if(!(d&1))return;if(!(d&2)){if((f[11675]|0)==(j|0)){j=(f[11672]|0)+b|0;f[11672]=j;f[11675]=i;f[i+4>>2]=j|1;if((i|0)!=(f[11674]|0))return;f[11674]=0;f[11671]=0;return}if((f[11674]|0)==(j|0)){j=(f[11671]|0)+b|0;f[11671]=j;f[11674]=h;f[i+4>>2]=j|1;f[h+j>>2]=j;return}e=(d&-8)+b|0;c=d>>>3;do if(d>>>0<256){b=f[j+8>>2]|0;a=f[j+12>>2]|0;if((a|0)==(b|0)){f[11669]=f[11669]&~(1<<c);break}else{f[b+12>>2]=a;f[a+8>>2]=b;break}}else{g=f[j+24>>2]|0;a=f[j+12>>2]|0;do if((a|0)==(j|0)){c=j+16|0;b=c+4|0;a=f[b>>2]|0;if(!a){a=f[c>>2]|0;if(!a){c=0;break}else b=c}while(1){c=a+20|0;d=f[c>>2]|0;if(d|0){a=d;b=c;continue}c=a+16|0;d=f[c>>2]|0;if(!d)break;else{a=d;b=c}}f[b>>2]=0;c=a}else{c=f[j+8>>2]|0;f[c+12>>2]=a;f[a+8>>2]=c;c=a}while(0);if(g|0){a=f[j+28>>2]|0;b=46980+(a<<2)|0;if((f[b>>2]|0)==(j|0)){f[b>>2]=c;if(!c){f[11670]=f[11670]&~(1<<a);break}}else{f[g+16+(((f[g+16>>2]|0)!=(j|0)&1)<<2)>>2]=c;if(!c)break}f[c+24>>2]=g;a=j+16|0;b=f[a>>2]|0;if(b|0){f[c+16>>2]=b;f[b+24>>2]=c}a=f[a+4>>2]|0;if(a|0){f[c+20>>2]=a;f[a+24>>2]=c}}}while(0);f[i+4>>2]=e|1;f[h+e>>2]=e;if((i|0)==(f[11674]|0)){f[11671]=e;return}}else{f[a>>2]=d&-2;f[i+4>>2]=b|1;f[h+b>>2]=b;e=b}a=e>>>3;if(e>>>0<256){c=46716+(a<<1<<2)|0;b=f[11669]|0;a=1<<a;if(!(b&a)){f[11669]=b|a;a=c;b=c+8|0}else{b=c+8|0;a=f[b>>2]|0}f[b>>2]=i;f[a+12>>2]=i;f[i+8>>2]=a;f[i+12>>2]=c;return}a=e>>>8;if(a)if(e>>>0>16777215)a=31;else{h=(a+1048320|0)>>>16&8;j=a<<h;g=(j+520192|0)>>>16&4;j=j<<g;a=(j+245760|0)>>>16&2;a=14-(g|h|a)+(j<<a>>>15)|0;a=e>>>(a+7|0)&1|a<<1}else a=0;d=46980+(a<<2)|0;f[i+28>>2]=a;f[i+20>>2]=0;f[i+16>>2]=0;b=f[11670]|0;c=1<<a;do if(b&c){b=e<<((a|0)==31?0:25-(a>>>1)|0);c=f[d>>2]|0;while(1){if((f[c+4>>2]&-8|0)==(e|0)){a=73;break}d=c+16+(b>>>31<<2)|0;a=f[d>>2]|0;if(!a){a=72;break}else{b=b<<1;c=a}}if((a|0)==72){f[d>>2]=i;f[i+24>>2]=c;f[i+12>>2]=i;f[i+8>>2]=i;break}else if((a|0)==73){h=c+8|0;j=f[h>>2]|0;f[j+12>>2]=i;f[h>>2]=i;f[i+8>>2]=j;f[i+12>>2]=c;f[i+24>>2]=0;break}}else{f[11670]=b|c;f[d>>2]=i;f[i+24>>2]=d;f[i+12>>2]=i;f[i+8>>2]=i}while(0);j=(f[11677]|0)+-1|0;f[11677]=j;if(!j)a=47132;else return;while(1){a=f[a>>2]|0;if(!a)break;else a=a+8|0}f[11677]=-1;return}function SX(a){a=a|0;var b=0,c=0;b=u;u=u+16|0;c=b;a=WX(f[a+60>>2]|0)|0;f[c>>2]=a;a=UX(ab(6,c|0)|0)|0;u=b;return a|0}function TX(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0;e=u;u=u+32|0;g=e;d=e+20|0;f[g>>2]=f[a+60>>2];f[g+4>>2]=0;f[g+8>>2]=b;f[g+12>>2]=d;f[g+16>>2]=c;if((UX(_a(140,g|0)|0)|0)<0){f[d>>2]=-1;a=-1}else a=f[d>>2]|0;u=e;return a|0}function UX(a){a=a|0;var b=0;if(a>>>0>4294963200){b=VX()|0;f[b>>2]=0-a;a=-1}return a|0}function VX(){return 47172}function WX(a){a=a|0;return a|0}function XX(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;m=u;u=u+48|0;k=m+16|0;g=m;e=m+32|0;i=a+28|0;d=f[i>>2]|0;f[e>>2]=d;j=a+20|0;d=(f[j>>2]|0)-d|0;f[e+4>>2]=d;f[e+8>>2]=b;f[e+12>>2]=c;d=d+c|0;h=a+60|0;f[g>>2]=f[h>>2];f[g+4>>2]=e;f[g+8>>2]=2;g=UX($a(146,g|0)|0)|0;a:do if((d|0)!=(g|0)){b=2;while(1){if((g|0)<0)break;d=d-g|0;o=f[e+4>>2]|0;n=g>>>0>o>>>0;e=n?e+8|0:e;b=b+(n<<31>>31)|0;o=g-(n?o:0)|0;f[e>>2]=(f[e>>2]|0)+o;n=e+4|0;f[n>>2]=(f[n>>2]|0)-o;f[k>>2]=f[h>>2];f[k+4>>2]=e;f[k+8>>2]=b;g=UX($a(146,k|0)|0)|0;if((d|0)==(g|0)){l=3;break a}}f[a+16>>2]=0;f[i>>2]=0;f[j>>2]=0;f[a>>2]=f[a>>2]|32;if((b|0)==2)c=0;else c=c-(f[e+4>>2]|0)|0}else l=3;while(0);if((l|0)==3){o=f[a+44>>2]|0;f[a+16>>2]=o+(f[a+48>>2]|0);f[i>>2]=o;f[j>>2]=o}u=m;return c|0}function YX(a){a=a|0;var c=0,d=0,e=0;e=a;a:do if(!(e&3))d=4;else{c=e;while(1){if(!(b[a>>0]|0)){a=c;break a}a=a+1|0;c=a;if(!(c&3)){d=4;break}}}while(0);if((d|0)==4){while(1){c=f[a>>2]|0;if(!((c&-2139062144^-2139062144)&c+-16843009))a=a+4|0;else break}if((c&255)<<24>>24)do a=a+1|0;while((b[a>>0]|0)!=0)}return a-e|0}function ZX(a,c){a=a|0;c=c|0;var d=0,e=0;e=0;while(1){if((h[43411+e>>0]|0)==(a|0)){a=2;break}d=e+1|0;if((d|0)==87){d=43499;e=87;a=5;break}else e=d}if((a|0)==2)if(!e)d=43499;else{d=43499;a=5}if((a|0)==5)while(1){do{a=d;d=d+1|0}while((b[a>>0]|0)!=0);e=e+-1|0;if(!e)break;else a=5}return _X(d,f[c+20>>2]|0)|0}function _X(a,b){a=a|0;b=b|0;return $X(a,b)|0}function $X(a,b){a=a|0;b=b|0;if(!b)b=0;else b=aY(f[b>>2]|0,f[b+4>>2]|0,a)|0;return (b|0?b:a)|0}function aY(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=(f[a>>2]|0)+1794895138|0;h=bY(f[a+8>>2]|0,o)|0;e=bY(f[a+12>>2]|0,o)|0;g=bY(f[a+16>>2]|0,o)|0;a:do if((h>>>0<c>>>2>>>0?(n=c-(h<<2)|0,e>>>0<n>>>0&g>>>0<n>>>0):0)?((g|e)&3|0)==0:0){n=e>>>2;m=g>>>2;l=0;while(1){j=h>>>1;k=l+j|0;i=k<<1;g=i+n|0;e=bY(f[a+(g<<2)>>2]|0,o)|0;g=bY(f[a+(g+1<<2)>>2]|0,o)|0;if(!(g>>>0<c>>>0&e>>>0<(c-g|0)>>>0)){e=0;break a}if(b[a+(g+e)>>0]|0){e=0;break a}e=cY(d,a+g|0)|0;if(!e)break;e=(e|0)<0;if((h|0)==1){e=0;break a}else{l=e?l:k;h=e?j:h-j|0}}e=i+m|0;g=bY(f[a+(e<<2)>>2]|0,o)|0;e=bY(f[a+(e+1<<2)>>2]|0,o)|0;if(e>>>0<c>>>0&g>>>0<(c-e|0)>>>0)e=(b[a+(e+g)>>0]|0)==0?a+e|0:0;else e=0}else e=0;while(0);return e|0}function bY(a,b){a=a|0;b=b|0;var c=0;c=J_(a|0)|0;return ((b|0)==0?a:c)|0}function cY(a,c){a=a|0;c=c|0;var d=0,e=0;d=b[a>>0]|0;e=b[c>>0]|0;if(d<<24>>24==0?1:d<<24>>24!=e<<24>>24)a=e;else{do{a=a+1|0;c=c+1|0;d=b[a>>0]|0;e=b[c>>0]|0}while(!(d<<24>>24==0?1:d<<24>>24!=e<<24>>24));a=e}return (d&255)-(a&255)|0}function dY(a){a=a|0;var b=0;b=(eY()|0)+188|0;return ZX(a,f[b>>2]|0)|0}function eY(){return fY()|0}function fY(){return 10472}function gY(a,b){a=+a;b=b|0;var c=0,d=0,e=0;p[s>>3]=a;c=f[s>>2]|0;d=f[s+4>>2]|0;e=H_(c|0,d|0,52)|0;switch(e&2047){case 0:{if(a!=0.0){a=+gY(a*18446744073709551616.0,b);c=(f[b>>2]|0)+-64|0}else c=0;f[b>>2]=c;break}case 2047:break;default:{f[b>>2]=(e&2047)+-1022;f[s>>2]=c;f[s+4>>2]=d&-2146435073|1071644672;a=+p[s>>3]}}return +a}function hY(a,b){a=+a;b=b|0;return +(+gY(a,b))}function iY(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0;h=c&255;e=(d|0)!=0;a:do if(e&(a&3|0)!=0){g=c&255;while(1){if((b[a>>0]|0)==g<<24>>24){i=6;break a}a=a+1|0;d=d+-1|0;e=(d|0)!=0;if(!(e&(a&3|0)!=0)){i=5;break}}}else i=5;while(0);if((i|0)==5)if(e)i=6;else d=0;b:do if((i|0)==6){g=c&255;if((b[a>>0]|0)!=g<<24>>24){e=X(h,16843009)|0;c:do if(d>>>0>3)while(1){h=f[a>>2]^e;if((h&-2139062144^-2139062144)&h+-16843009|0)break;a=a+4|0;d=d+-4|0;if(d>>>0<=3){i=11;break c}}else i=11;while(0);if((i|0)==11)if(!d){d=0;break}while(1){if((b[a>>0]|0)==g<<24>>24)break b;a=a+1|0;d=d+-1|0;if(!d){d=0;break}}}}while(0);return (d|0?a:0)|0}function jY(a,b){a=a|0;b=b|0;if(!a)a=0;else a=kY(a,b,0)|0;return a|0}function kY(a,c,d){a=a|0;c=c|0;d=d|0;do if(a){if(c>>>0<128){b[a>>0]=c;a=1;break}d=(lY()|0)+188|0;if(!(f[f[d>>2]>>2]|0))if((c&-128|0)==57216){b[a>>0]=c;a=1;break}else{a=VX()|0;f[a>>2]=84;a=-1;break}if(c>>>0<2048){b[a>>0]=c>>>6|192;b[a+1>>0]=c&63|128;a=2;break}if(c>>>0<55296|(c&-8192|0)==57344){b[a>>0]=c>>>12|224;b[a+1>>0]=c>>>6&63|128;b[a+2>>0]=c&63|128;a=3;break}if((c+-65536|0)>>>0<1048576){b[a>>0]=c>>>18|240;b[a+1>>0]=c>>>12&63|128;b[a+2>>0]=c>>>6&63|128;b[a+3>>0]=c&63|128;a=4;break}else{a=VX()|0;f[a>>2]=84;a=-1;break}}else a=1;while(0);return a|0}function lY(){return fY()|0}function mY(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0;e=u;u=u+16|0;g=e;f[g>>2]=d;d=nY(a,b,c,g)|0;u=e;return d|0}function nY(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=u;u=u+128|0;g=m+124|0;l=m;h=l;i=10716;j=h+124|0;do{f[h>>2]=f[i>>2];h=h+4|0;i=i+4|0}while((h|0)<(j|0));if((c+-1|0)>>>0>2147483646)if(!c){a=g;c=1;k=4}else{c=VX()|0;f[c>>2]=75;c=-1}else k=4;if((k|0)==4){k=-2-a|0;k=c>>>0>k>>>0?k:c;f[l+48>>2]=k;g=l+20|0;f[g>>2]=a;f[l+44>>2]=a;c=a+k|0;a=l+16|0;f[a>>2]=c;f[l+28>>2]=c;c=oY(l,d,e)|0;if(k){l=f[g>>2]|0;b[l+(((l|0)==(f[a>>2]|0))<<31>>31)>>0]=0}}u=m;return c|0}function oY(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=u;u=u+224|0;m=r+120|0;o=r+80|0;p=r;q=r+136|0;e=o;g=e+40|0;do{f[e>>2]=0;e=e+4|0}while((e|0)<(g|0));f[m>>2]=f[d>>2];if((pY(0,c,m,p,o)|0)<0)d=-1;else{if((f[a+76>>2]|0)>-1)n=qY(a)|0;else n=0;d=f[a>>2]|0;l=d&32;if((b[a+74>>0]|0)<1)f[a>>2]=d&-33;e=a+48|0;if(!(f[e>>2]|0)){g=a+44|0;h=f[g>>2]|0;f[g>>2]=q;i=a+28|0;f[i>>2]=q;j=a+20|0;f[j>>2]=q;f[e>>2]=80;k=a+16|0;f[k>>2]=q+80;d=pY(a,c,m,p,o)|0;if(h){Xd[f[a+36>>2]&63](a,0,0)|0;d=(f[j>>2]|0)==0?-1:d;f[g>>2]=h;f[e>>2]=0;f[k>>2]=0;f[i>>2]=0;f[j>>2]=0}}else d=pY(a,c,m,p,o)|0;e=f[a>>2]|0;f[a>>2]=e|l;if(n|0)rY(a);d=(e&32|0)==0?d:-1}u=r;return d|0}function pY(a,c,e,g,h){a=a|0;c=c|0;e=e|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;G=u;u=u+64|0;C=G+16|0;D=G;A=G+24|0;E=G+8|0;F=G+20|0;f[C>>2]=c;x=(a|0)!=0;y=A+40|0;z=y;A=A+39|0;B=E+4|0;j=0;i=0;n=0;a:while(1){do if((i|0)>-1)if((j|0)>(2147483647-i|0)){i=VX()|0;f[i>>2]=75;i=-1;break}else{i=j+i|0;break}while(0);j=b[c>>0]|0;if(!(j<<24>>24)){w=86;break}else k=c;b:while(1){switch(j<<24>>24){case 37:{j=k;w=9;break b}case 0:{j=k;break b}default:{}}v=k+1|0;f[C>>2]=v;j=b[v>>0]|0;k=v}c:do if((w|0)==9)while(1){w=0;if((b[k+1>>0]|0)!=37)break c;j=j+1|0;k=k+2|0;f[C>>2]=k;if((b[k>>0]|0)==37)w=9;else break}while(0);j=j-c|0;if(x)sY(a,c,j);if(j|0){c=k;continue}l=k+1|0;j=(b[l>>0]|0)+-48|0;if(j>>>0<10){v=(b[k+2>>0]|0)==36;s=v?j:-1;n=v?1:n;l=v?k+3|0:l}else s=-1;f[C>>2]=l;j=b[l>>0]|0;v=(j<<24>>24)+-32|0;if(v>>>0>31|(1<<v&75913|0)==0)k=0;else{k=0;do{k=1<<(j<<24>>24)+-32|k;l=l+1|0;f[C>>2]=l;j=b[l>>0]|0;v=(j<<24>>24)+-32|0}while(!(v>>>0>31|(1<<v&75913|0)==0))}if(j<<24>>24==42){m=l+1|0;j=(b[m>>0]|0)+-48|0;if(j>>>0<10?(b[l+2>>0]|0)==36:0){f[h+(j<<2)>>2]=10;j=f[g+((b[m>>0]|0)+-48<<3)>>2]|0;n=1;l=l+3|0}else{if(n|0){i=-1;break}if(x){n=(f[e>>2]|0)+(4-1)&~(4-1);j=f[n>>2]|0;f[e>>2]=n+4;n=0;l=m}else{j=0;n=0;l=m}}f[C>>2]=l;t=(j|0)<0;j=t?0-j|0:j;t=t?k|8192:k}else{j=tY(C)|0;if((j|0)<0){i=-1;break}t=k;l=f[C>>2]|0}do if((b[l>>0]|0)==46){if((b[l+1>>0]|0)!=42){f[C>>2]=l+1;k=tY(C)|0;l=f[C>>2]|0;break}m=l+2|0;k=(b[m>>0]|0)+-48|0;if(k>>>0<10?(b[l+3>>0]|0)==36:0){f[h+(k<<2)>>2]=10;k=f[g+((b[m>>0]|0)+-48<<3)>>2]|0;l=l+4|0;f[C>>2]=l;break}if(n|0){i=-1;break a}if(x){v=(f[e>>2]|0)+(4-1)&~(4-1);k=f[v>>2]|0;f[e>>2]=v+4}else k=0;f[C>>2]=m;l=m}else k=-1;while(0);r=0;while(1){if(((b[l>>0]|0)+-65|0)>>>0>57){i=-1;break a}v=l+1|0;f[C>>2]=v;m=b[(b[l>>0]|0)+-65+(45303+(r*58|0))>>0]|0;o=m&255;if((o+-1|0)>>>0<8){r=o;l=v}else break}if(!(m<<24>>24)){i=-1;break}q=(s|0)>-1;do if(m<<24>>24==19)if(q){i=-1;break a}else w=48;else{if(q){f[h+(s<<2)>>2]=o;q=g+(s<<3)|0;s=f[q+4>>2]|0;w=D;f[w>>2]=f[q>>2];f[w+4>>2]=s;w=48;break}if(!x){i=0;break a}uY(D,o,e)}while(0);if((w|0)==48?(w=0,!x):0){j=0;c=v;continue}l=b[l>>0]|0;l=(r|0)!=0&(l&15|0)==3?l&-33:l;s=t&-65537;t=(t&8192|0)==0?t:s;d:do switch(l|0){case 110:switch((r&255)<<24>>24){case 0:{f[f[D>>2]>>2]=i;j=0;c=v;continue a}case 1:{f[f[D>>2]>>2]=i;j=0;c=v;continue a}case 2:{j=f[D>>2]|0;f[j>>2]=i;f[j+4>>2]=((i|0)<0)<<31>>31;j=0;c=v;continue a}case 3:{d[f[D>>2]>>1]=i;j=0;c=v;continue a}case 4:{b[f[D>>2]>>0]=i;j=0;c=v;continue a}case 6:{f[f[D>>2]>>2]=i;j=0;c=v;continue a}case 7:{j=f[D>>2]|0;f[j>>2]=i;f[j+4>>2]=((i|0)<0)<<31>>31;j=0;c=v;continue a}default:{j=0;c=v;continue a}}case 112:{l=120;k=k>>>0>8?k:8;c=t|8;w=60;break}case 88:case 120:{c=t;w=60;break}case 111:{l=D;c=f[l>>2]|0;l=f[l+4>>2]|0;q=wY(c,l,y)|0;r=z-q|0;m=0;o=45767;k=(t&8|0)==0|(k|0)>(r|0)?k:r+1|0;r=t;w=66;break}case 105:case 100:{l=D;c=f[l>>2]|0;l=f[l+4>>2]|0;if((l|0)<0){c=C_(0,0,c|0,l|0)|0;l=I;m=D;f[m>>2]=c;f[m+4>>2]=l;m=1;o=45767;w=65;break d}else{m=(t&2049|0)!=0&1;o=(t&2048|0)==0?((t&1|0)==0?45767:45769):45768;w=65;break d}}case 117:{l=D;m=0;o=45767;c=f[l>>2]|0;l=f[l+4>>2]|0;w=65;break}case 99:{b[A>>0]=f[D>>2];c=A;m=0;o=45767;q=y;l=1;k=s;break}case 109:{l=VX()|0;l=dY(f[l>>2]|0)|0;w=70;break}case 115:{l=f[D>>2]|0;l=l|0?l:45777;w=70;break}case 67:{f[E>>2]=f[D>>2];f[B>>2]=0;f[D>>2]=E;q=-1;l=E;w=74;break}case 83:{c=f[D>>2]|0;if(!k){yY(a,32,j,0,t);c=0;w=83}else{q=k;l=c;w=74}break}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{j=zY(a,+p[D>>3],j,k,t,l)|0;c=v;continue a}default:{m=0;o=45767;q=y;l=k;k=t}}while(0);e:do if((w|0)==60){t=D;s=f[t>>2]|0;t=f[t+4>>2]|0;q=vY(s,t,y,l&32)|0;o=(c&8|0)==0|(s|0)==0&(t|0)==0;m=o?0:2;o=o?45767:45767+(l>>4)|0;r=c;c=s;l=t;w=66}else if((w|0)==65){q=xY(c,l,y)|0;r=t;w=66}else if((w|0)==70){w=0;t=iY(l,0,k)|0;r=(t|0)==0;c=l;m=0;o=45767;q=r?l+k|0:t;l=r?k:t-l|0;k=s}else if((w|0)==74){w=0;o=l;c=0;k=0;while(1){m=f[o>>2]|0;if(!m)break;k=jY(F,m)|0;if((k|0)<0|k>>>0>(q-c|0)>>>0)break;c=k+c|0;if(q>>>0>c>>>0)o=o+4|0;else break}if((k|0)<0){i=-1;break a}yY(a,32,j,c,t);if(!c){c=0;w=83}else{m=0;while(1){k=f[l>>2]|0;if(!k){w=83;break e}k=jY(F,k)|0;m=k+m|0;if((m|0)>(c|0)){w=83;break e}sY(a,F,k);if(m>>>0>=c>>>0){w=83;break}else l=l+4|0}}}while(0);if((w|0)==66){w=0;l=(c|0)!=0|(l|0)!=0;t=(k|0)!=0|l;l=z-q+((l^1)&1)|0;c=t?q:y;q=y;l=t?((k|0)>(l|0)?k:l):k;k=(k|0)>-1?r&-65537:r}else if((w|0)==83){w=0;yY(a,32,j,c,t^8192);j=(j|0)>(c|0)?j:c;c=v;continue}s=q-c|0;r=(l|0)<(s|0)?s:l;t=r+m|0;j=(j|0)<(t|0)?t:j;yY(a,32,j,t,k);sY(a,o,m);yY(a,48,j,t,k^65536);yY(a,48,r,s,0);sY(a,c,s);yY(a,32,j,t,k^8192);c=v}f:do if((w|0)==86)if(!a)if(n){i=1;while(1){c=f[h+(i<<2)>>2]|0;if(!c)break;uY(g+(i<<3)|0,c,e);c=i+1|0;if((i|0)<9)i=c;else{i=c;break}}if((i|0)<10)while(1){if(f[h+(i<<2)>>2]|0){i=-1;break f}if((i|0)<9)i=i+1|0;else{i=1;break}}else i=1}else i=0;while(0);u=G;return i|0}function qY(a){a=a|0;return 0}function rY(a){a=a|0;return}function sY(a,b,c){a=a|0;b=b|0;c=c|0;if(!(f[a>>2]&32))BY(b,c,a)|0;return}function tY(a){a=a|0;var c=0,d=0,e=0;d=f[a>>2]|0;e=(b[d>>0]|0)+-48|0;if(e>>>0<10){c=0;do{c=e+(c*10|0)|0;d=d+1|0;f[a>>2]=d;e=(b[d>>0]|0)+-48|0}while(e>>>0<10)}else c=0;return c|0}function uY(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0.0;a:do if(b>>>0<=20)do switch(b|0){case 9:{d=(f[c>>2]|0)+(4-1)&~(4-1);b=f[d>>2]|0;f[c>>2]=d+4;f[a>>2]=b;break a}case 10:{d=(f[c>>2]|0)+(4-1)&~(4-1);b=f[d>>2]|0;f[c>>2]=d+4;d=a;f[d>>2]=b;f[d+4>>2]=((b|0)<0)<<31>>31;break a}case 11:{d=(f[c>>2]|0)+(4-1)&~(4-1);b=f[d>>2]|0;f[c>>2]=d+4;d=a;f[d>>2]=b;f[d+4>>2]=0;break a}case 12:{d=(f[c>>2]|0)+(8-1)&~(8-1);b=d;e=f[b>>2]|0;b=f[b+4>>2]|0;f[c>>2]=d+8;d=a;f[d>>2]=e;f[d+4>>2]=b;break a}case 13:{e=(f[c>>2]|0)+(4-1)&~(4-1);d=f[e>>2]|0;f[c>>2]=e+4;d=(d&65535)<<16>>16;e=a;f[e>>2]=d;f[e+4>>2]=((d|0)<0)<<31>>31;break a}case 14:{e=(f[c>>2]|0)+(4-1)&~(4-1);d=f[e>>2]|0;f[c>>2]=e+4;e=a;f[e>>2]=d&65535;f[e+4>>2]=0;break a}case 15:{e=(f[c>>2]|0)+(4-1)&~(4-1);d=f[e>>2]|0;f[c>>2]=e+4;d=(d&255)<<24>>24;e=a;f[e>>2]=d;f[e+4>>2]=((d|0)<0)<<31>>31;break a}case 16:{e=(f[c>>2]|0)+(4-1)&~(4-1);d=f[e>>2]|0;f[c>>2]=e+4;e=a;f[e>>2]=d&255;f[e+4>>2]=0;break a}case 17:{e=(f[c>>2]|0)+(8-1)&~(8-1);g=+p[e>>3];f[c>>2]=e+8;p[a>>3]=g;break a}case 18:{e=(f[c>>2]|0)+(8-1)&~(8-1);g=+p[e>>3];f[c>>2]=e+8;p[a>>3]=g;break a}default:break a}while(0);while(0);return}function vY(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;if(!((a|0)==0&(c|0)==0))do{d=d+-1|0;b[d>>0]=h[45819+(a&15)>>0]|0|e;a=H_(a|0,c|0,4)|0;c=I}while(!((a|0)==0&(c|0)==0));return d|0}function wY(a,c,d){a=a|0;c=c|0;d=d|0;if(!((a|0)==0&(c|0)==0))do{d=d+-1|0;b[d>>0]=a&7|48;a=H_(a|0,c|0,3)|0;c=I}while(!((a|0)==0&(c|0)==0));return d|0}function xY(a,c,d){a=a|0;c=c|0;d=d|0;var e=0;if(c>>>0>0|(c|0)==0&a>>>0>4294967295){while(1){e=G_(a|0,c|0,10,0)|0;d=d+-1|0;b[d>>0]=e&255|48;e=a;a=F_(a|0,c|0,10,0)|0;if(!(c>>>0>9|(c|0)==9&e>>>0>4294967295))break;else c=I}c=a}else c=a;if(c)while(1){d=d+-1|0;b[d>>0]=(c>>>0)%10|0|48;if(c>>>0<10)break;else c=(c>>>0)/10|0}return d|0}function yY(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=u;u=u+256|0;f=g;if((c|0)>(d|0)&(e&73728|0)==0){e=c-d|0;M_(f|0,b|0,(e>>>0<256?e:256)|0)|0;if(e>>>0>255){b=c-d|0;do{sY(a,f,256);e=e+-256|0}while(e>>>0>255);e=b&255}sY(a,f,e)}u=g;return}function zY(a,c,d,e,g,i){a=a|0;c=+c;d=d|0;e=e|0;g=g|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;G=u;u=u+560|0;l=G+8|0;t=G;F=G+524|0;E=F;m=G+512|0;f[t>>2]=0;D=m+12|0;AY(c)|0;if((I|0)<0){c=-c;B=1;A=45784}else{B=(g&2049|0)!=0&1;A=(g&2048|0)==0?((g&1|0)==0?45785:45790):45787}AY(c)|0;do if(0==0&(I&2146435072|0)==2146435072){F=(i&32|0)!=0;j=B+3|0;yY(a,32,d,j,g&-65537);sY(a,A,B);sY(a,c!=c|0.0!=0.0?(F?45811:45815):F?45803:45807,3);yY(a,32,d,j,g^8192)}else{q=+hY(c,t)*2.0;j=q!=0.0;if(j)f[t>>2]=(f[t>>2]|0)+-1;w=i|32;if((w|0)==97){o=i&32;r=(o|0)==0?A:A+9|0;p=B|2;j=12-e|0;do if(!(e>>>0>11|(j|0)==0)){c=8.0;do{j=j+-1|0;c=c*16.0}while((j|0)!=0);if((b[r>>0]|0)==45){c=-(c+(-q-c));break}else{c=q+c-c;break}}else c=q;while(0);k=f[t>>2]|0;j=(k|0)<0?0-k|0:k;j=xY(j,((j|0)<0)<<31>>31,D)|0;if((j|0)==(D|0)){j=m+11|0;b[j>>0]=48}b[j+-1>>0]=(k>>31&2)+43;n=j+-2|0;b[n>>0]=i+15;l=(e|0)<1;m=(g&8|0)==0;j=F;do{C=~~c;k=j+1|0;b[j>>0]=o|h[45819+C>>0];c=(c-+(C|0))*16.0;if((k-E|0)==1?!(m&(l&c==0.0)):0){b[k>>0]=46;j=j+2|0}else j=k}while(c!=0.0);if((e|0)!=0?(-2-E+j|0)<(e|0):0){k=j-E|0;j=e+2|0}else{j=j-E|0;k=j}D=D-n|0;E=D+p+j|0;yY(a,32,d,E,g);sY(a,r,p);yY(a,48,d,E,g^65536);sY(a,F,k);yY(a,48,j-k|0,0,0);sY(a,n,D);yY(a,32,d,E,g^8192);j=E;break}k=(e|0)<0?6:e;if(j){j=(f[t>>2]|0)+-28|0;f[t>>2]=j;c=q*268435456.0}else{c=q;j=f[t>>2]|0}C=(j|0)<0?l:l+288|0;l=C;do{y=~~c>>>0;f[l>>2]=y;l=l+4|0;c=(c-+(y>>>0))*1.0e9}while(c!=0.0);if((j|0)>0){m=C;o=l;while(1){n=(j|0)<29?j:29;j=o+-4|0;if(j>>>0>=m>>>0){l=0;do{x=I_(f[j>>2]|0,0,n|0)|0;x=B_(x|0,I|0,l|0,0)|0;y=I;v=G_(x|0,y|0,1e9,0)|0;f[j>>2]=v;l=F_(x|0,y|0,1e9,0)|0;j=j+-4|0}while(j>>>0>=m>>>0);if(l){m=m+-4|0;f[m>>2]=l}}l=o;while(1){if(l>>>0<=m>>>0)break;j=l+-4|0;if(!(f[j>>2]|0))l=j;else break}j=(f[t>>2]|0)-n|0;f[t>>2]=j;if((j|0)>0)o=l;else break}}else m=C;if((j|0)<0){e=((k+25|0)/9|0)+1|0;s=(w|0)==102;do{r=0-j|0;r=(r|0)<9?r:9;if(m>>>0<l>>>0){n=(1<<r)+-1|0;o=1e9>>>r;p=0;j=m;do{y=f[j>>2]|0;f[j>>2]=(y>>>r)+p;p=X(y&n,o)|0;j=j+4|0}while(j>>>0<l>>>0);j=(f[m>>2]|0)==0?m+4|0:m;if(!p){m=j;j=l}else{f[l>>2]=p;m=j;j=l+4|0}}else{m=(f[m>>2]|0)==0?m+4|0:m;j=l}l=s?C:m;l=(j-l>>2|0)>(e|0)?l+(e<<2)|0:j;j=(f[t>>2]|0)+r|0;f[t>>2]=j}while((j|0)<0);j=m;e=l}else{j=m;e=l}y=C;if(j>>>0<e>>>0){l=(y-j>>2)*9|0;n=f[j>>2]|0;if(n>>>0>=10){m=10;do{m=m*10|0;l=l+1|0}while(n>>>0>=m>>>0)}}else l=0;s=(w|0)==103;v=(k|0)!=0;m=k-((w|0)!=102?l:0)+((v&s)<<31>>31)|0;if((m|0)<(((e-y>>2)*9|0)+-9|0)){m=m+9216|0;r=C+4+(((m|0)/9|0)+-1024<<2)|0;m=(m|0)%9|0;if((m|0)<8){n=10;while(1){n=n*10|0;if((m|0)<7)m=m+1|0;else break}}else n=10;o=f[r>>2]|0;p=(o>>>0)%(n>>>0)|0;m=(r+4|0)==(e|0);if(!(m&(p|0)==0)){q=(((o>>>0)/(n>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;x=(n|0)/2|0;c=p>>>0<x>>>0?.5:m&(p|0)==(x|0)?1.0:1.5;if(B){x=(b[A>>0]|0)==45;c=x?-c:c;q=x?-q:q}m=o-p|0;f[r>>2]=m;if(q+c!=q){x=m+n|0;f[r>>2]=x;if(x>>>0>999999999){l=r;while(1){m=l+-4|0;f[l>>2]=0;if(m>>>0<j>>>0){j=j+-4|0;f[j>>2]=0}x=(f[m>>2]|0)+1|0;f[m>>2]=x;if(x>>>0>999999999)l=m;else break}}else m=r;l=(y-j>>2)*9|0;o=f[j>>2]|0;if(o>>>0>=10){n=10;do{n=n*10|0;l=l+1|0}while(o>>>0>=n>>>0)}}else m=r}else m=r;m=m+4|0;m=e>>>0>m>>>0?m:e;x=j}else{m=e;x=j}w=m;while(1){if(w>>>0<=x>>>0){t=0;break}j=w+-4|0;if(!(f[j>>2]|0))w=j;else{t=1;break}}e=0-l|0;do if(s){j=k+((v^1)&1)|0;if((j|0)>(l|0)&(l|0)>-5){n=i+-1|0;k=j+-1-l|0}else{n=i+-2|0;k=j+-1|0}j=g&8;if(!j){if(t?(z=f[w+-4>>2]|0,(z|0)!=0):0)if(!((z>>>0)%10|0)){m=0;j=10;do{j=j*10|0;m=m+1|0}while(!((z>>>0)%(j>>>0)|0|0))}else m=0;else m=9;j=((w-y>>2)*9|0)+-9|0;if((n|32|0)==102){r=j-m|0;r=(r|0)>0?r:0;k=(k|0)<(r|0)?k:r;r=0;break}else{r=j+l-m|0;r=(r|0)>0?r:0;k=(k|0)<(r|0)?k:r;r=0;break}}else r=j}else{n=i;r=g&8}while(0);s=k|r;o=(s|0)!=0&1;p=(n|32|0)==102;if(p){v=0;j=(l|0)>0?l:0}else{j=(l|0)<0?e:l;j=xY(j,((j|0)<0)<<31>>31,D)|0;m=D;if((m-j|0)<2)do{j=j+-1|0;b[j>>0]=48}while((m-j|0)<2);b[j+-1>>0]=(l>>31&2)+43;j=j+-2|0;b[j>>0]=n;v=j;j=m-j|0}j=B+1+k+o+j|0;yY(a,32,d,j,g);sY(a,A,B);yY(a,48,d,j,g^65536);if(p){n=x>>>0>C>>>0?C:x;r=F+9|0;o=r;p=F+8|0;m=n;do{l=xY(f[m>>2]|0,0,r)|0;if((m|0)==(n|0)){if((l|0)==(r|0)){b[p>>0]=48;l=p}}else if(l>>>0>F>>>0){M_(F|0,48,l-E|0)|0;do l=l+-1|0;while(l>>>0>F>>>0)}sY(a,l,o-l|0);m=m+4|0}while(m>>>0<=C>>>0);if(s|0)sY(a,45835,1);if(m>>>0<w>>>0&(k|0)>0)while(1){l=xY(f[m>>2]|0,0,r)|0;if(l>>>0>F>>>0){M_(F|0,48,l-E|0)|0;do l=l+-1|0;while(l>>>0>F>>>0)}sY(a,l,(k|0)<9?k:9);m=m+4|0;l=k+-9|0;if(!(m>>>0<w>>>0&(k|0)>9)){k=l;break}else k=l}yY(a,48,k+9|0,9,0)}else{s=t?w:x+4|0;if((k|0)>-1){t=F+9|0;r=(r|0)==0;e=t;o=0-E|0;p=F+8|0;n=x;do{l=xY(f[n>>2]|0,0,t)|0;if((l|0)==(t|0)){b[p>>0]=48;l=p}do if((n|0)==(x|0)){m=l+1|0;sY(a,l,1);if(r&(k|0)<1){l=m;break}sY(a,45835,1);l=m}else{if(l>>>0<=F>>>0)break;M_(F|0,48,l+o|0)|0;do l=l+-1|0;while(l>>>0>F>>>0)}while(0);E=e-l|0;sY(a,l,(k|0)>(E|0)?E:k);k=k-E|0;n=n+4|0}while(n>>>0<s>>>0&(k|0)>-1)}yY(a,48,k+18|0,18,0);sY(a,v,D-v|0)}yY(a,32,d,j,g^8192)}while(0);u=G;return ((j|0)<(d|0)?d:j)|0}function AY(a){a=+a;var b=0;p[s>>3]=a;b=f[s>>2]|0;I=f[s+4>>2]|0;return b|0}function BY(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;e=d+16|0;g=f[e>>2]|0;if(!g)if(!(CY(d)|0)){g=f[e>>2]|0;h=5}else e=0;else h=5;a:do if((h|0)==5){j=d+20|0;i=f[j>>2]|0;e=i;if((g-i|0)>>>0<c>>>0){e=Xd[f[d+36>>2]&63](d,a,c)|0;break}b:do if((b[d+75>>0]|0)>-1){i=c;while(1){if(!i){h=0;g=a;break b}g=i+-1|0;if((b[a+g>>0]|0)==10)break;else i=g}e=Xd[f[d+36>>2]&63](d,a,i)|0;if(e>>>0<i>>>0)break a;h=i;g=a+i|0;c=c-i|0;e=f[j>>2]|0}else{h=0;g=a}while(0);K_(e|0,g|0,c|0)|0;f[j>>2]=(f[j>>2]|0)+c;e=h+c|0}while(0);return e|0}function CY(a){a=a|0;var c=0,d=0;c=a+74|0;d=b[c>>0]|0;b[c>>0]=d+255|d;c=f[a>>2]|0;if(!(c&8)){f[a+8>>2]=0;f[a+4>>2]=0;d=f[a+44>>2]|0;f[a+28>>2]=d;f[a+20>>2]=d;f[a+16>>2]=d+(f[a+48>>2]|0);a=0}else{f[a>>2]=c|32;a=-1}return a|0}function DY(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=a+20|0;e=f[d>>2]|0;a=(f[a+16>>2]|0)-e|0;a=a>>>0>c>>>0?c:a;K_(e|0,b|0,a|0)|0;f[d>>2]=(f[d>>2]|0)+a;return c|0}function EY(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,f=0;a:do if(!d)a=0;else{while(1){e=b[a>>0]|0;f=b[c>>0]|0;if(e<<24>>24!=f<<24>>24)break;d=d+-1|0;if(!d){a=0;break a}else{a=a+1|0;c=c+1|0}}a=(e&255)-(f&255)|0}while(0);return a|0}function FY(a){a=a|0;var b=0,c=0;c=(YX(a)|0)+1|0;b=QX(c)|0;if(!b)b=0;else K_(b|0,a|0,c|0)|0;return b|0}function GY(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,i=0,j=0,k=0,l=0;l=u;u=u+16|0;j=l;k=c&255;b[j>>0]=k;e=a+16|0;g=f[e>>2]|0;if(!g)if(!(CY(a)|0)){g=f[e>>2]|0;i=4}else d=-1;else i=4;do if((i|0)==4){i=a+20|0;e=f[i>>2]|0;if(e>>>0<g>>>0?(d=c&255,(d|0)!=(b[a+75>>0]|0)):0){f[i>>2]=e+1;b[e>>0]=k;break}if((Xd[f[a+36>>2]&63](a,j,1)|0)==1)d=h[j>>0]|0;else d=-1}while(0);u=l;return d|0}function HY(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;if((f[c+76>>2]|0)>=0?(qY(c)|0)!=0:0){e=a&255;d=a&255;if((d|0)!=(b[c+75>>0]|0)?(i=c+20|0,j=f[i>>2]|0,j>>>0<(f[c+16>>2]|0)>>>0):0){f[i>>2]=j+1;b[j>>0]=e}else d=GY(c,a)|0;rY(c)}else k=3;do if((k|0)==3){e=a&255;d=a&255;if((d|0)!=(b[c+75>>0]|0)?(g=c+20|0,h=f[g>>2]|0,h>>>0<(f[c+16>>2]|0)>>>0):0){f[g>>2]=h+1;b[h>>0]=e;break}d=GY(c,a)|0}while(0);return d|0}function IY(a){a=a|0;var b=0,c=0,d=0,e=0,g=0,h=0,i=0,j=0,k=0,l=0;k=u;u=u+16|0;b=k;i=k+8|0;c=k+4|0;f[i>>2]=a;do if(a>>>0>=212){h=(a>>>0)/210|0;e=h*210|0;f[c>>2]=a-e;a=0;g=(JY(11032,11224,c,b)|0)-11032>>2;b=e;a:while(1){e=(f[11032+(g<<2)>>2]|0)+b|0;b=5;while(1){if(b>>>0>=47){d=211;j=8;break}c=f[10840+(b<<2)>>2]|0;d=(e>>>0)/(c>>>0)|0;if(d>>>0<c>>>0){j=106;break a}if((e|0)==(X(d,c)|0))break;else b=b+1|0}b:do if((j|0)==8){c:while(1){j=0;b=(e>>>0)/(d>>>0)|0;do if(b>>>0>=d>>>0)if((e|0)!=(X(b,d)|0)){b=d+10|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0)if((e|0)!=(X(c,b)|0)){b=d+12|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0)if((e|0)!=(X(c,b)|0)){b=d+16|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0)if((e|0)!=(X(c,b)|0)){b=d+18|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0)if((e|0)!=(X(c,b)|0)){b=d+22|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0)if((e|0)!=(X(c,b)|0)){b=d+28|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0>=b>>>0)if((e|0)==(X(c,b)|0))c=9;else{b=d+30|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+36|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+40|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+42|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+46|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+52|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+58|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+60|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+66|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+70|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+72|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+78|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+82|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+88|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+96|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+100|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+102|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+106|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+108|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+112|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+120|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+126|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+130|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+136|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+138|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+142|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+148|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+150|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+156|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+162|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+166|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+168|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+172|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+178|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+180|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+186|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+190|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+192|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+196|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+198|0;c=(e>>>0)/(b>>>0)|0;if(c>>>0<b>>>0){c=1;a=e;break}if((e|0)==(X(c,b)|0)){c=9;break}b=d+208|0;c=(e>>>0)/(b>>>0)|0;l=c>>>0<b>>>0;c=(e|0)==(X(c,b)|0);b=l|c?b:d+210|0;c=l?1:c?9:0;a=l?e:a}else{c=1;a=e}}else c=9;else{c=1;a=e}}else c=9;else{c=1;a=e}}else c=9;else{c=1;a=e}}else c=9;else{c=1;a=e}}else c=9;else{c=1;a=e}}else{b=d;c=9}else{b=d;c=1;a=e}while(0);switch(c&15){case 9:break b;case 0:{d=b;j=8;break}default:break c}}if(c){j=107;break a}}while(0);l=g+1|0;e=(l|0)==48;b=h+(e&1)|0;h=b;g=e?0:l;b=b*210|0}if((j|0)==106){f[i>>2]=e;a=e;break}else if((j|0)==107){f[i>>2]=e;break}}else{a=JY(10840,11032,i,b)|0;a=f[a>>2]|0}while(0);u=k;return a|0}function JY(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0;e=f[c>>2]|0;d=a;c=b-a>>2;while(1){if(!c)break;b=(c|0)/2|0;g=d+(b<<2)|0;a=(f[g>>2]|0)>>>0<e>>>0;d=a?g+4|0:d;c=a?c+-1-b|0:b}return d|0}function KY(a){a=a|0;return a&255|0}function LY(a,b,c){a=a|0;b=b|0;c=c|0;if(b|0)M_(a|0,(KY(c)|0)&255|0,b|0)|0;return a|0}function MY(a){a=a|0;ub()}function NY(a){a=a|0;return}function OY(a){a=a|0;PY(a+4|0);return}function PY(a){a=a|0;f[a>>2]=(f[a>>2]|0)+1;return}function QY(a){a=a|0;if((RY(a+4|0)|0)==-1){be[f[(f[a>>2]|0)+8>>2]&511](a);a=1}else a=0;return a|0}function RY(a){a=a|0;var b=0;b=f[a>>2]|0;f[a>>2]=b+-1;return b+-1|0}function SY(a){a=a|0;OY(a);return}function TY(a){a=a|0;PY(a+8|0);return}function UY(a){a=a|0;if(QY(a)|0)VY(a);return}function VY(a){a=a|0;var b=0;b=a+8|0;if(!((f[b>>2]|0)!=0?(RY(b)|0)!=-1:0))be[f[(f[a>>2]|0)+16>>2]&511](a);return}function WY(a){a=a|0;var b=0,c=0,d=0;c=a+4|0;b=f[c>>2]|0;while(1){if((b|0)==-1){a=0;break}d=f[c>>2]|0;if((d|0)==(b|0))f[c>>2]=b+1;if((d|0)==(b|0))break;b=d}return a|0}function XY(a){a=a|0;var b=0;b=(a|0)==0?1:a;while(1){a=QX(b)|0;if(a|0)break;a=x_()|0;if(!a){a=0;break}ae[a&3]()}return a|0}function YY(a,b){a=a|0;b=b|0;return XY(a)|0}function ZY(a){a=a|0;return XY(a)|0}function _Y(a,b){a=a|0;b=b|0;return ZY(a)|0}function $Y(a){a=a|0;RX(a);return}function aZ(a,b){a=a|0;b=b|0;$Y(a);return}function bZ(a){a=a|0;$Y(a);return}function cZ(a,b){a=a|0;b=b|0;var c=0,d=0;d=YX(b)|0;c=XY(d+13|0)|0;f[c>>2]=d;f[c+4>>2]=d;f[c+8>>2]=0;c=dZ(c)|0;K_(c|0,b|0,d+1|0)|0;f[a>>2]=c;return}function dZ(a){a=a|0;return a+12|0}function eZ(a,b){a=a|0;b=b|0;f[a>>2]=11316;cZ(a+4|0,b);return}function fZ(a){a=a|0;return 1}function gZ(a){a=a|0;ub()}function hZ(a){a=a|0;ub()}function iZ(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0;g=u;u=u+16|0;d=g;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;if((b[c+11>>0]|0)<0){e=f[c>>2]|0;c=f[c+4>>2]|0;if(c>>>0>4294967279)gZ(a);if(c>>>0<11)b[a+11>>0]=c;else{i=c+16&-16;h=XY(i)|0;f[a>>2]=h;f[a+8>>2]=i|-2147483648;f[a+4>>2]=c;a=h}vN(a,e,c)|0;b[d>>0]=0;uN(a+c|0,d)}else{f[a>>2]=f[c>>2];f[a+4>>2]=f[c+4>>2];f[a+8>>2]=f[c+8>>2]}u=g;return}function jZ(a){a=a|0;if((b[a+11>>0]|0)<0)$Y(f[a>>2]|0);return}function kZ(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0;k=u;u=u+16|0;i=k;j=a+11|0;e=b[j>>0]|0;g=e<<24>>24<0;if(g)h=(f[a+8>>2]&2147483647)+-1|0;else h=10;do if(h>>>0>=d>>>0){if(g)e=f[a>>2]|0;else e=a;lZ(e,c,d)|0;b[i>>0]=0;uN(e+d|0,i);if((b[j>>0]|0)<0){f[a+4>>2]=d;break}else{b[j>>0]=d;break}}else{if(g)e=f[a+4>>2]|0;else e=e&255;mZ(a,h,d-h|0,e,0,e,d,c)}while(0);u=k;return a|0}function lZ(a,b,c){a=a|0;b=b|0;c=c|0;if(c|0)L_(a|0,b|0,c|0)|0;return a|0}function mZ(a,c,d,e,g,h,i,j){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0;o=u;u=u+16|0;n=o;if((-18-c|0)>>>0<d>>>0)gZ(a);if((b[a+11>>0]|0)<0)m=f[a>>2]|0;else m=a;if(c>>>0<2147483623){k=d+c|0;l=c<<1;k=k>>>0<l>>>0?l:k;k=k>>>0<11?11:k+16&-16}else k=-17;l=XY(k)|0;if(g|0)vN(l,m,g)|0;if(i|0)vN(l+g|0,j,i)|0;d=e-h|0;e=d-g|0;if(e|0)vN(l+g+i|0,m+g+h|0,e)|0;if((c|0)!=10)$Y(m);f[a>>2]=l;f[a+8>>2]=k|-2147483648;i=d+i|0;f[a+4>>2]=i;b[n>>0]=0;uN(l+i|0,n);u=o;return}function nZ(a,c){a=a|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0,k=0;if(c>>>0>4294967279)gZ(a);j=a+11|0;g=b[j>>0]|0;h=g<<24>>24<0;if(h){k=f[a+4>>2]|0;d=(f[a+8>>2]&2147483647)+-1|0}else{k=g&255;d=10}i=k>>>0>c>>>0?k:c;c=i>>>0<11;i=c?10:(i+16&-16)+-1|0;do if((i|0)!=(d|0)){do if(c){c=f[a>>2]|0;if(h){g=0;d=c;e=a;h=13}else{vN(a,c,(g&255)+1|0)|0;$Y(c);h=16}}else{d=i+1|0;e=XY(d)|0;if(h){g=1;d=f[a>>2]|0;h=13;break}else{vN(e,a,(g&255)+1|0)|0;c=a+4|0;h=15;break}}while(0);if((h|0)==13){c=a+4|0;vN(e,d,(f[c>>2]|0)+1|0)|0;$Y(d);if(g){d=i+1|0;h=15}else h=16}if((h|0)==15){f[a+8>>2]=d|-2147483648;f[c>>2]=k;f[a>>2]=e;break}else if((h|0)==16){b[j>>0]=k;break}}while(0);return}function oZ(a,b){a=a|0;b=b|0;return kZ(a,b,RR(b)|0)|0}function pZ(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;g=j;h=a+11|0;e=b[h>>0]|0;i=e<<24>>24<0;if(i)e=f[a+4>>2]|0;else e=e&255;do if(e>>>0>=c>>>0)if(i){i=(f[a>>2]|0)+c|0;b[g>>0]=0;uN(i,g);f[a+4>>2]=c;break}else{b[g>>0]=0;uN(a+c|0,g);b[h>>0]=c;break}else qZ(a,c-e|0,d)|0;while(0);u=j;return}function qZ(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0;k=u;u=u+16|0;i=k;if(c|0){j=a+11|0;e=b[j>>0]|0;if(e<<24>>24<0){h=f[a+4>>2]|0;g=(f[a+8>>2]&2147483647)+-1|0}else{h=e&255;g=10}if((g-h|0)>>>0<c>>>0){rZ(a,g,c-g+h|0,h,h,0,0);e=b[j>>0]|0}if(e<<24>>24<0)g=f[a>>2]|0;else g=a;LY(g+h|0,c,d)|0;e=h+c|0;if((b[j>>0]|0)<0)f[a+4>>2]=e;else b[j>>0]=e;b[i>>0]=0;uN(g+e|0,i)}u=k;return a|0}function rZ(a,c,d,e,g,h,i){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0;if((-17-c|0)>>>0<d>>>0)gZ(a);if((b[a+11>>0]|0)<0)l=f[a>>2]|0;else l=a;if(c>>>0<2147483623){j=d+c|0;k=c<<1;j=j>>>0<k>>>0?k:j;j=j>>>0<11?11:j+16&-16}else j=-17;k=XY(j)|0;if(g|0)vN(k,l,g)|0;d=e-h-g|0;if(d|0)vN(k+g+i|0,l+g+h|0,d)|0;if((c|0)!=10)$Y(l);f[a>>2]=k;f[a+8>>2]=j|-2147483648;return}function sZ(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0,k=0;k=u;u=u+16|0;i=k;j=a+11|0;e=b[j>>0]|0;g=e<<24>>24<0;if(g){h=f[a+4>>2]|0;e=(f[a+8>>2]&2147483647)+-1|0}else{h=e&255;e=10}if((e-h|0)>>>0>=d>>>0){if(d|0){if(g)g=f[a>>2]|0;else g=a;vN(g+h|0,c,d)|0;e=h+d|0;if((b[j>>0]|0)<0)f[a+4>>2]=e;else b[j>>0]=e;b[i>>0]=0;uN(g+e|0,i)}}else mZ(a,e,d-e+h|0,h,h,0,d,c);u=k;return a|0}function tZ(a,b){a=a|0;b=b|0;return sZ(a,b,RR(b)|0)|0}function uZ(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=u;u=u+16|0;k=m;l=a+11|0;g=b[l>>0]|0;h=g<<24>>24<0;if(h)j=f[a+4>>2]|0;else j=g&255;if(j>>>0<c>>>0)hZ(a);if(h)g=(f[a+8>>2]&2147483647)+-1|0;else g=10;if((g-j|0)>>>0>=e>>>0){if(e|0){if(h)i=f[a>>2]|0;else i=a;g=j-c|0;h=i+c|0;if(g){lZ(h+e|0,h,g)|0;d=h>>>0<=d>>>0&(i+j|0)>>>0>d>>>0?d+e|0:d}lZ(h,d,e)|0;d=j+e|0;if((b[l>>0]|0)<0)f[a+4>>2]=d;else b[l>>0]=d;b[k>>0]=0;uN(i+d|0,k)}}else mZ(a,g,j+e-g|0,j,c,0,e,d);u=m;return a|0}function vZ(a,b,c){a=a|0;b=b|0;c=c|0;return uZ(a,b,c,RR(c)|0)|0}function wZ(a,b){a=a|0;b=b|0;var c=0,d=0;c=u;u=u+16|0;d=c;xZ(d);yZ(a,d,b);jZ(d);u=c;return}function xZ(a){a=a|0;var c=0;f[a>>2]=0;f[a+4>>2]=0;f[a+8>>2]=0;c=0;while(1){if((c|0)==3)break;f[a+(c<<2)>>2]=0;c=c+1|0}if((b[a+11>>0]|0)<0)c=(f[a+8>>2]&2147483647)+-1|0;else c=10;pZ(a,c,0);return}function yZ(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0,j=0;j=u;u=u+16|0;i=j;h=c+11|0;g=b[h>>0]|0;if(g<<24>>24<0)e=f[c+4>>2]|0;else e=g&255;while(1){if(g<<24>>24<0)g=f[c>>2]|0;else g=c;f[i>>2]=d;g=mY(g,e+1|0,45892,i)|0;if((g|0)>-1)if(g>>>0>e>>>0)e=g;else break;else e=e<<1|1;pZ(c,e,0);g=b[h>>0]|0}pZ(c,g,0);f[a>>2]=f[c>>2];f[a+4>>2]=f[c+4>>2];f[a+8>>2]=f[c+8>>2];e=0;while(1){if((e|0)==3)break;f[c+(e<<2)>>2]=0;e=e+1|0}u=j;return}function zZ(){var a=0,b=0,c=0,d=0,e=0,g=0,h=0,i=0;e=u;u=u+48|0;h=e+32|0;c=e+24|0;i=e+16|0;g=e;e=e+36|0;a=AZ()|0;if(a|0?(d=f[a>>2]|0,d|0):0){a=d+48|0;b=f[a>>2]|0;a=f[a+4>>2]|0;if(!((b&-256|0)==1126902528&(a|0)==1129074247)){f[c>>2]=46031;BZ(45981,c)}if((b|0)==1126902529&(a|0)==1129074247)a=f[d+44>>2]|0;else a=d+80|0;f[e>>2]=a;d=f[d>>2]|0;a=f[d+4>>2]|0;if(Xd[f[(f[744]|0)+16>>2]&63](2976,d,e)|0){i=f[e>>2]|0;i=Td[f[(f[i>>2]|0)+8>>2]&255](i)|0;f[g>>2]=46031;f[g+4>>2]=a;f[g+8>>2]=i;BZ(45895,g)}else{f[i>>2]=46031;f[i+4>>2]=a;BZ(45940,i)}}BZ(46019,h)}function AZ(){var a=0,b=0;a=u;u=u+16|0;if(!(Mc(47240,3)|0)){b=Kc(f[11811]|0)|0;u=a;return b|0}else BZ(46170,a);return 0}function BZ(a,b){a=a|0;b=b|0;var c=0;c=u;u=u+16|0;f[c>>2]=b;b=f[2586]|0;oY(b,a,c)|0;HY(10,b)|0;ub()}function CZ(a){a=a|0;return}function DZ(a){a=a|0;CZ(a);$Y(a);return}function EZ(a){a=a|0;return}function FZ(a){a=a|0;return}function GZ(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0;h=u;u=u+64|0;e=h;if(!(KZ(a,b,0)|0))if((b|0)!=0?(g=OZ(b,3e3,2984,0)|0,(g|0)!=0):0){b=e+4|0;d=b+52|0;do{f[b>>2]=0;b=b+4|0}while((b|0)<(d|0));f[e>>2]=g;f[e+8>>2]=a;f[e+12>>2]=-1;f[e+48>>2]=1;ie[f[(f[g>>2]|0)+28>>2]&31](g,e,f[c>>2]|0,1);if((f[e+24>>2]|0)==1){f[c>>2]=f[e+16>>2];b=1}else b=0}else b=0;else b=1;u=h;return b|0}function HZ(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;if(KZ(a,f[b+8>>2]|0,g)|0)NZ(0,b,c,d,e);return}function IZ(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0;do if(!(KZ(a,f[c+8>>2]|0,g)|0)){if(KZ(a,f[c>>2]|0,g)|0){if((f[c+16>>2]|0)!=(d|0)?(h=c+20|0,(f[h>>2]|0)!=(d|0)):0){f[c+32>>2]=e;f[h>>2]=d;g=c+40|0;f[g>>2]=(f[g>>2]|0)+1;if((f[c+36>>2]|0)==1?(f[c+24>>2]|0)==2:0)b[c+54>>0]=1;f[c+44>>2]=4;break}if((e|0)==1)f[c+32>>2]=1}}else MZ(0,c,d,e);while(0);return}function JZ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(KZ(a,f[b+8>>2]|0,0)|0)LZ(0,b,c,d);return}function KZ(a,b,c){a=a|0;b=b|0;c=c|0;return (a|0)==(b|0)|0}function LZ(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0;a=c+16|0;g=f[a>>2]|0;do if(g){if((g|0)!=(d|0)){e=c+36|0;f[e>>2]=(f[e>>2]|0)+1;f[c+24>>2]=2;b[c+54>>0]=1;break}a=c+24|0;if((f[a>>2]|0)==2)f[a>>2]=e}else{f[a>>2]=d;f[c+24>>2]=e;f[c+36>>2]=1}while(0);return}function MZ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;if((f[b+4>>2]|0)==(c|0)?(e=b+28|0,(f[e>>2]|0)!=1):0)f[e>>2]=d;return}function NZ(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;b[c+53>>0]=1;do if((f[c+4>>2]|0)==(e|0)){b[c+52>>0]=1;a=c+16|0;e=f[a>>2]|0;if(!e){f[a>>2]=d;f[c+24>>2]=g;f[c+36>>2]=1;if(!((g|0)==1?(f[c+48>>2]|0)==1:0))break;b[c+54>>0]=1;break}if((e|0)!=(d|0)){g=c+36|0;f[g>>2]=(f[g>>2]|0)+1;b[c+54>>0]=1;break}e=c+24|0;a=f[e>>2]|0;if((a|0)==2){f[e>>2]=g;a=g}if((a|0)==1?(f[c+48>>2]|0)==1:0)b[c+54>>0]=1}while(0);return}function OZ(a,c,e,g){a=a|0;c=c|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;p=u;u=u+64|0;n=p;m=f[a>>2]|0;o=a+(f[m+-8>>2]|0)|0;m=f[m+-4>>2]|0;f[n>>2]=e;f[n+4>>2]=a;f[n+8>>2]=c;f[n+12>>2]=g;a=n+16|0;c=n+20|0;g=n+24|0;h=n+28|0;i=n+32|0;j=n+40|0;k=a;l=k+36|0;do{f[k>>2]=0;k=k+4|0}while((k|0)<(l|0));d[a+36>>1]=0;b[a+38>>0]=0;a:do if(KZ(m,e,0)|0){f[n+48>>2]=1;le[f[(f[m>>2]|0)+20>>2]&7](m,n,o,o,1,0);a=(f[g>>2]|0)==1?o:0}else{je[f[(f[m>>2]|0)+24>>2]&31](m,n,o,1,0);switch(f[n+36>>2]|0){case 0:{a=(f[j>>2]|0)==1&(f[h>>2]|0)==1&(f[i>>2]|0)==1?f[c>>2]|0:0;break a}case 1:break;default:{a=0;break a}}if((f[g>>2]|0)!=1?!((f[j>>2]|0)==0&(f[h>>2]|0)==1&(f[i>>2]|0)==1):0){a=0;break}a=f[a>>2]|0}while(0);u=p;return a|0}function PZ(a){a=a|0;CZ(a);$Y(a);return}function QZ(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;if(KZ(a,f[b+8>>2]|0,g)|0)NZ(0,b,c,d,e);else{a=f[a+8>>2]|0;le[f[(f[a>>2]|0)+20>>2]&7](a,b,c,d,e,g)}return}function RZ(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0;do if(!(KZ(a,f[c+8>>2]|0,g)|0)){if(!(KZ(a,f[c>>2]|0,g)|0)){j=f[a+8>>2]|0;je[f[(f[j>>2]|0)+24>>2]&31](j,c,d,e,g);break}if((f[c+16>>2]|0)!=(d|0)?(h=c+20|0,(f[h>>2]|0)!=(d|0)):0){f[c+32>>2]=e;i=c+44|0;if((f[i>>2]|0)==4)break;e=c+52|0;b[e>>0]=0;k=c+53|0;b[k>>0]=0;a=f[a+8>>2]|0;le[f[(f[a>>2]|0)+20>>2]&7](a,c,d,d,1,g);if(b[k>>0]|0)if(!(b[e>>0]|0)){e=3;j=11}else e=3;else{e=4;j=11}if((j|0)==11){f[h>>2]=d;k=c+40|0;f[k>>2]=(f[k>>2]|0)+1;if((f[c+36>>2]|0)==1?(f[c+24>>2]|0)==2:0)b[c+54>>0]=1}f[i>>2]=e;break}if((e|0)==1)f[c+32>>2]=1}else MZ(0,c,d,e);while(0);return}function SZ(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if(KZ(a,f[b+8>>2]|0,0)|0)LZ(0,b,c,d);else{a=f[a+8>>2]|0;ie[f[(f[a>>2]|0)+28>>2]&31](a,b,c,d)}return}function TZ(a){a=a|0;return}function UZ(){var a=0;a=u;u=u+16|0;if(!(Lc(47244,462)|0)){u=a;return}else BZ(46219,a)}function VZ(a){a=a|0;var b=0;b=u;u=u+16|0;RX(a);if(!(Nc(f[11811]|0,0)|0)){u=b;return}else BZ(46269,b)}function WZ(){var a=0,b=0;a=AZ()|0;if((a|0?(b=f[a>>2]|0,b|0):0)?(a=b+48|0,(f[a>>2]&-256|0)==1126902528?(f[a+4>>2]|0)==1129074247:0):0)XZ(f[b+12>>2]|0);XZ(YZ()|0)}function XZ(a){a=a|0;var b=0;b=u;u=u+16|0;ae[a&3]();BZ(46322,b)}function YZ(){var a=0;a=f[2806]|0;f[2806]=a+0;return a|0}function ZZ(a){a=a|0;return}function _Z(a){a=a|0;return 46362}function $Z(a){a=a|0;f[a>>2]=11316;d_(a+4|0);return}function a_(a){a=a|0;$Z(a);$Y(a);return}function b_(a){a=a|0;return c_(a+4|0)|0}function c_(a){a=a|0;return f[a>>2]|0}function d_(a){a=a|0;var b=0,c=0;if(fZ(a)|0?(b=e_(f[a>>2]|0)|0,c=b+8|0,a=f[c>>2]|0,f[c>>2]=a+-1,(a+-1|0)<0):0)$Y(b);return}function e_(a){a=a|0;return a+-12|0}function f_(a){a=a|0;$Z(a);$Y(a);return}function g_(a){a=a|0;CZ(a);$Y(a);return}function h_(a,b,c){a=a|0;b=b|0;c=c|0;return KZ(a,b,0)|0}function i_(a){a=a|0;CZ(a);$Y(a);return}function j_(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,g=0,h=0,i=0,j=0;j=u;u=u+64|0;h=j;f[c>>2]=f[f[c>>2]>>2];if(!(k_(a,b,0)|0))if(((b|0)!=0?(d=OZ(b,3e3,3088,0)|0,(d|0)!=0):0)?(f[d+8>>2]&~f[a+8>>2]|0)==0:0){a=a+12|0;b=d+12|0;if(!(KZ(f[a>>2]|0,f[b>>2]|0,0)|0)?!(KZ(f[a>>2]|0,3120,0)|0):0){a=f[a>>2]|0;if((((a|0)!=0?(g=OZ(a,3e3,2984,0)|0,(g|0)!=0):0)?(e=f[b>>2]|0,(e|0)!=0):0)?(i=OZ(e,3e3,2984,0)|0,(i|0)!=0):0){a=h+4|0;b=a+52|0;do{f[a>>2]=0;a=a+4|0}while((a|0)<(b|0));f[h>>2]=i;f[h+8>>2]=g;f[h+12>>2]=-1;f[h+48>>2]=1;ie[f[(f[i>>2]|0)+28>>2]&31](i,h,f[c>>2]|0,1);if((f[h+24>>2]|0)==1){f[c>>2]=f[h+16>>2];a=1}else a=0}else a=0}else a=1}else a=0;else a=1;u=j;return a|0}function k_(a,b,c){a=a|0;b=b|0;c=c|0;if(KZ(a,b,0)|0)a=1;else a=KZ(b,3128,0)|0;return a|0}function l_(a){a=a|0;CZ(a);$Y(a);return}function m_(a,b,c){a=a|0;b=b|0;c=c|0;return KZ(a,b,0)|0}function n_(a){a=a|0;CZ(a);$Y(a);return}function o_(a,c,d,e,g,h){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;if(KZ(a,f[c+8>>2]|0,h)|0)NZ(0,c,d,e,g);else{p=c+52|0;i=b[p>>0]|0;j=c+53|0;k=b[j>>0]|0;o=f[a+12>>2]|0;l=a+16+(o<<3)|0;b[p>>0]=0;b[j>>0]=0;s_(a+16|0,c,d,e,g,h);a:do if((o|0)>1){m=c+24|0;n=a+8|0;o=c+54|0;a=a+24|0;do{if(b[o>>0]|0)break a;if(!(b[p>>0]|0)){if(b[j>>0]|0?(f[n>>2]&1|0)==0:0)break a}else{if((f[m>>2]|0)==1)break a;if(!(f[n>>2]&2))break a}b[p>>0]=0;b[j>>0]=0;s_(a,c,d,e,g,h);a=a+8|0}while(a>>>0<l>>>0)}while(0);b[p>>0]=i;b[j>>0]=k}return}function p_(a,c,d,e,g){a=a|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;a:do if(!(KZ(a,f[c+8>>2]|0,g)|0)){if(!(KZ(a,f[c>>2]|0,g)|0)){q=f[a+12>>2]|0;k=a+16+(q<<3)|0;t_(a+16|0,c,d,e,g);h=a+24|0;if((q|0)<=1)break;a=f[a+8>>2]|0;if((a&2|0)==0?(j=c+36|0,(f[j>>2]|0)!=1):0){if(!(a&1)){a=c+54|0;while(1){if(b[a>>0]|0)break a;if((f[j>>2]|0)==1)break a;t_(h,c,d,e,g);h=h+8|0;if(h>>>0>=k>>>0)break a}}a=c+24|0;i=c+54|0;while(1){if(b[i>>0]|0)break a;if((f[j>>2]|0)==1?(f[a>>2]|0)==1:0)break a;t_(h,c,d,e,g);h=h+8|0;if(h>>>0>=k>>>0)break a}}a=c+54|0;while(1){if(b[a>>0]|0)break a;t_(h,c,d,e,g);h=h+8|0;if(h>>>0>=k>>>0)break a}}if((f[c+16>>2]|0)!=(d|0)?(q=c+20|0,(f[q>>2]|0)!=(d|0)):0){f[c+32>>2]=e;p=c+44|0;if((f[p>>2]|0)==4)break;k=a+16+(f[a+12>>2]<<3)|0;e=c+52|0;l=c+53|0;n=c+54|0;m=a+8|0;o=c+24|0;h=0;i=a+16|0;j=0;b:while(1){if(i>>>0>=k>>>0){a=18;break}b[e>>0]=0;b[l>>0]=0;s_(i,c,d,d,1,g);if(b[n>>0]|0){a=18;break}do if(b[l>>0]|0){if(!(b[e>>0]|0))if(!(f[m>>2]&1)){h=1;a=18;break b}else{h=1;a=j;break}if((f[o>>2]|0)==1){a=23;break b}if(!(f[m>>2]&2)){a=23;break b}else{h=1;a=1}}else a=j;while(0);i=i+8|0;j=a}do if((a|0)==18){if((!j?(f[q>>2]=d,d=c+40|0,f[d>>2]=(f[d>>2]|0)+1,(f[c+36>>2]|0)==1):0)?(f[o>>2]|0)==2:0){b[n>>0]=1;if(h){a=23;break}else{h=4;break}}if(h)a=23;else h=4}while(0);if((a|0)==23)h=3;f[p>>2]=h;break}if((e|0)==1)f[c+32>>2]=1}else MZ(0,c,d,e);while(0);return}function q_(a,c,d,e){a=a|0;c=c|0;d=d|0;e=e|0;var g=0,h=0;a:do if(!(KZ(a,f[c+8>>2]|0,0)|0)){h=f[a+12>>2]|0;g=a+16+(h<<3)|0;r_(a+16|0,c,d,e);if((h|0)>1){h=c+54|0;a=a+24|0;do{r_(a,c,d,e);if(b[h>>0]|0)break a;a=a+8|0}while(a>>>0<g>>>0)}}else LZ(0,c,d,e);while(0);return}function r_(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0;g=f[a+4>>2]|0;e=g>>8;if(g&1)e=f[(f[c>>2]|0)+e>>2]|0;a=f[a>>2]|0;ie[f[(f[a>>2]|0)+28>>2]&31](a,b,c+e|0,g&2|0?d:2);return}function s_(a,b,c,d,e,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;g=g|0;var h=0,i=0;i=f[a+4>>2]|0;h=i>>8;if(i&1)h=f[(f[d>>2]|0)+h>>2]|0;a=f[a>>2]|0;le[f[(f[a>>2]|0)+20>>2]&7](a,b,c,d+h|0,i&2|0?e:2,g);return}function t_(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0;h=f[a+4>>2]|0;g=h>>8;if(h&1)g=f[(f[c>>2]|0)+g>>2]|0;a=f[a>>2]|0;je[f[(f[a>>2]|0)+24>>2]&31](a,b,c+g|0,h&2|0?d:2,e);return}function u_(a){a=a|0;if((b[a>>0]|0)==1)a=0;else{b[a>>0]=1;a=1}return a|0}function v_(a){a=a|0;return}function w_(a){a=a|0;return}function x_(){var a=0;a=f[11812]|0;f[11812]=a+0;return a|0}function y_(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=u;u=u+16|0;d=e;f[d>>2]=f[c>>2];a=Xd[f[(f[a>>2]|0)+16>>2]&63](a,b,d)|0;if(a)f[c>>2]=f[d>>2];u=e;return a&1|0}function z_(a){a=a|0;if(!a)a=0;else a=(OZ(a,3e3,3088,0)|0)!=0&1;return a|0}function A_(){}function B_(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return (I=b+d+(c>>>0<a>>>0|0)>>>0,c|0)|0}function C_(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (I=d,a-c>>>0|0)|0}function D_(a){a=a|0;var c=0;c=b[w+(a&255)>>0]|0;if((c|0)<8)return c|0;c=b[w+(a>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=b[w+(a>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (b[w+(a>>>24)>>0]|0)+24|0}function E_(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;l=a;j=b;k=j;h=c;n=d;i=n;if(!k){g=(e|0)!=0;if(!i){if(g){f[e>>2]=(l>>>0)%(h>>>0);f[e+4>>2]=0}n=0;e=(l>>>0)/(h>>>0)>>>0;return (I=n,e)|0}else{if(!g){n=0;e=0;return (I=n,e)|0}f[e>>2]=a|0;f[e+4>>2]=b&0;n=0;e=0;return (I=n,e)|0}}g=(i|0)==0;do if(h){if(!g){g=(_(i|0)|0)-(_(k|0)|0)|0;if(g>>>0<=31){m=g+1|0;i=31-g|0;b=g-31>>31;h=m;a=l>>>(m>>>0)&b|k<<i;b=k>>>(m>>>0)&b;g=0;i=l<<i;break}if(!e){n=0;e=0;return (I=n,e)|0}f[e>>2]=a|0;f[e+4>>2]=j|b&0;n=0;e=0;return (I=n,e)|0}g=h-1|0;if(g&h|0){i=(_(h|0)|0)+33-(_(k|0)|0)|0;p=64-i|0;m=32-i|0;j=m>>31;o=i-32|0;b=o>>31;h=i;a=m-1>>31&k>>>(o>>>0)|(k<<m|l>>>(i>>>0))&b;b=b&k>>>(i>>>0);g=l<<p&j;i=(k<<p|l>>>(o>>>0))&j|l<<m&i-33>>31;break}if(e|0){f[e>>2]=g&l;f[e+4>>2]=0}if((h|0)==1){o=j|b&0;p=a|0|0;return (I=o,p)|0}else{p=D_(h|0)|0;o=k>>>(p>>>0)|0;p=k<<32-p|l>>>(p>>>0)|0;return (I=o,p)|0}}else{if(g){if(e|0){f[e>>2]=(k>>>0)%(h>>>0);f[e+4>>2]=0}o=0;p=(k>>>0)/(h>>>0)>>>0;return (I=o,p)|0}if(!l){if(e|0){f[e>>2]=0;f[e+4>>2]=(k>>>0)%(i>>>0)}o=0;p=(k>>>0)/(i>>>0)>>>0;return (I=o,p)|0}g=i-1|0;if(!(g&i)){if(e|0){f[e>>2]=a|0;f[e+4>>2]=g&k|b&0}o=0;p=k>>>((D_(i|0)|0)>>>0);return (I=o,p)|0}g=(_(i|0)|0)-(_(k|0)|0)|0;if(g>>>0<=30){b=g+1|0;i=31-g|0;h=b;a=k<<i|l>>>(b>>>0);b=k>>>(b>>>0);g=0;i=l<<i;break}if(!e){o=0;p=0;return (I=o,p)|0}f[e>>2]=a|0;f[e+4>>2]=j|b&0;o=0;p=0;return (I=o,p)|0}while(0);if(!h){k=i;j=0;i=0}else{m=c|0|0;l=n|d&0;k=B_(m|0,l|0,-1,-1)|0;c=I;j=i;i=0;do{d=j;j=g>>>31|j<<1;g=i|g<<1;d=a<<1|d>>>31|0;n=a>>>31|b<<1|0;C_(k|0,c|0,d|0,n|0)|0;p=I;o=p>>31|((p|0)<0?-1:0)<<1;i=o&1;a=C_(d|0,n|0,o&m|0,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&l|0)|0;b=I;h=h-1|0}while((h|0)!=0);k=j;j=0}h=0;if(e|0){f[e>>2]=a;f[e+4>>2]=b}o=(g|0)>>>31|(k|h)<<1|(h<<1|g>>>31)&0|j;p=(g<<1|0>>>31)&-2|i;return (I=o,p)|0}function F_(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return E_(a,b,c,d,0)|0}function G_(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,g=0;g=u;u=u+16|0;e=g|0;E_(a,b,c,d,e)|0;u=g;return (I=f[e+4>>2]|0,f[e>>2]|0)|0}function H_(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){I=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}I=0;return b>>>c-32|0}function I_(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){I=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}I=a<<c-32;return 0}function J_(a){a=a|0;return (a&255)<<24|(a>>8&255)<<16|(a>>16&255)<<8|a>>>24|0}function K_(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0;if((d|0)>=8192)return Fb(a|0,c|0,d|0)|0;h=a|0;g=a+d|0;if((a&3)==(c&3)){while(a&3){if(!d)return h|0;b[a>>0]=b[c>>0]|0;a=a+1|0;c=c+1|0;d=d-1|0}d=g&-4|0;e=d-64|0;while((a|0)<=(e|0)){f[a>>2]=f[c>>2];f[a+4>>2]=f[c+4>>2];f[a+8>>2]=f[c+8>>2];f[a+12>>2]=f[c+12>>2];f[a+16>>2]=f[c+16>>2];f[a+20>>2]=f[c+20>>2];f[a+24>>2]=f[c+24>>2];f[a+28>>2]=f[c+28>>2];f[a+32>>2]=f[c+32>>2];f[a+36>>2]=f[c+36>>2];f[a+40>>2]=f[c+40>>2];f[a+44>>2]=f[c+44>>2];f[a+48>>2]=f[c+48>>2];f[a+52>>2]=f[c+52>>2];f[a+56>>2]=f[c+56>>2];f[a+60>>2]=f[c+60>>2];a=a+64|0;c=c+64|0}while((a|0)<(d|0)){f[a>>2]=f[c>>2];a=a+4|0;c=c+4|0}}else{d=g-4|0;while((a|0)<(d|0)){b[a>>0]=b[c>>0]|0;b[a+1>>0]=b[c+1>>0]|0;b[a+2>>0]=b[c+2>>0]|0;b[a+3>>0]=b[c+3>>0]|0;a=a+4|0;c=c+4|0}}while((a|0)<(g|0)){b[a>>0]=b[c>>0]|0;a=a+1|0;c=c+1|0}return h|0}function L_(a,c,d){a=a|0;c=c|0;d=d|0;var e=0;if((c|0)<(a|0)&(a|0)<(c+d|0)){e=a;c=c+d|0;a=a+d|0;while((d|0)>0){a=a-1|0;c=c-1|0;d=d-1|0;b[a>>0]=b[c>>0]|0}a=e}else K_(a,c,d)|0;return a|0}function M_(a,c,d){a=a|0;c=c|0;d=d|0;var e=0,g=0,h=0,i=0;h=a+d|0;c=c&255;if((d|0)>=67){while(a&3){b[a>>0]=c;a=a+1|0}e=h&-4|0;g=e-64|0;i=c|c<<8|c<<16|c<<24;while((a|0)<=(g|0)){f[a>>2]=i;f[a+4>>2]=i;f[a+8>>2]=i;f[a+12>>2]=i;f[a+16>>2]=i;f[a+20>>2]=i;f[a+24>>2]=i;f[a+28>>2]=i;f[a+32>>2]=i;f[a+36>>2]=i;f[a+40>>2]=i;f[a+44>>2]=i;f[a+48>>2]=i;f[a+52>>2]=i;f[a+56>>2]=i;f[a+60>>2]=i;a=a+64|0}while((a|0)<(e|0)){f[a>>2]=i;a=a+4|0}}while((a|0)<(h|0)){b[a>>0]=c;a=a+1|0}return h-d|0}function N_(a){a=+a;return a>=0.0?+J(a+.5):+W(a-.5)}function O_(a){a=a|0;var b=0,c=0;c=a+15&-16|0;b=f[r>>2]|0;a=b+c|0;if((c|0)>0&(a|0)<(b|0)|(a|0)<0){da()|0;Za(12);return -1}f[r>>2]=a;if((a|0)>(ca()|0)?(ba()|0)==0:0){f[r>>2]=b;Za(12);return -1}return b|0}function P_(a,b){a=a|0;b=b|0;return +Qd[a&7](b|0)}function Q_(a,b,c){a=a|0;b=b|0;c=c|0;return +Rd[a&3](b|0,c|0)}function R_(a){a=a|0;return Sd[a&7]()|0}function S_(a,b){a=a|0;b=b|0;return Td[a&255](b|0)|0}function T_(a,b,c){a=a|0;b=b|0;c=+c;return Ud[a&7](b|0,+c)|0}function U_(a,b,c){a=a|0;b=b|0;c=c|0;return Vd[a&127](b|0,c|0)|0}function V_(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;return Wd[a&7](b|0,c|0,+d)|0}function W_(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Xd[a&63](b|0,c|0,d|0)|0}function X_(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;return Yd[a&1](b|0,c|0,d|0,+e)|0}function Y_(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;f=f|0;g=g|0;return Zd[a&3](b|0,c|0,d|0,+e,f|0,g|0)|0}function Z_(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return _d[a&63](b|0,c|0,d|0,e|0)|0}function __(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return $d[a&3](b|0,c|0,d|0,e|0,f|0,g|0)|0}function $_(a){a=a|0;ae[a&3]()}function a$(a,b){a=a|0;b=b|0;be[a&511](b|0)}function b$(a,b,c){a=a|0;b=b|0;c=+c;ce[a&7](b|0,+c)}function c$(a,b,c,d,e,f){a=a|0;b=b|0;c=+c;d=+d;e=+e;f=+f;de[a&3](b|0,+c,+d,+e,+f)}function d$(a,b,c){a=a|0;b=b|0;c=c|0;ee[a&255](b|0,c|0)}function e$(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;fe[a&7](b|0,c|0,+d)}function f$(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;ge[a&1](b|0,c|0,+d,e|0,f|0)}function g$(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;he[a&63](b|0,c|0,d|0)}function h$(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ie[a&31](b|0,c|0,d|0,e|0)}function i$(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;je[a&31](b|0,c|0,d|0,e|0,f|0)}function j$(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;h=h|0;ke[a&1](b|0,c|0,d|0,e|0,f|0,+g,h|0)}function k$(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;le[a&7](b|0,c|0,d|0,e|0,f|0,g|0)}function l$(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;me[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0)}function m$(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;ne[a&3](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)}function n$(a,b,c,d,e,f,g,h,i,j,k){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;oe[a&7](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0,k|0)}function o$(a){a=a|0;$(0);return 0.0}function p$(a,b){a=a|0;b=b|0;$(1);return 0.0}function q$(){$(2);return 0}function r$(a){a=a|0;$(3);return 0}function s$(a,b){a=a|0;b=+b;$(4);return 0}function t$(a,b){a=a|0;b=b|0;$(5);return 0}function u$(a,b,c){a=a|0;b=b|0;c=+c;$(6);return 0}function v$(a,b,c){a=a|0;b=b|0;c=c|0;$(7);return 0}function w$(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;$(8);return 0}function x$(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=e|0;f=f|0;$(9);return 0}function y$(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;$(10);return 0}function z$(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;$(11);return 0}function A$(){$(12)}function B$(){Va()}function C$(a){a=a|0;$(13)}function D$(a,b){a=a|0;b=+b;$(14)}function E$(a,b,c,d,e){a=a|0;b=+b;c=+c;d=+d;e=+e;$(15)}function F$(a,b){a=a|0;b=b|0;$(16)}function G$(a,b,c){a=a|0;b=b|0;c=+c;$(17)}function H$(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=d|0;e=e|0;$(18)}function I$(a,b,c){a=a|0;b=b|0;c=c|0;$(19)}function J$(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;$(20)}function K$(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;$(21)}function L$(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;g=g|0;$(22)}function M$(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;$(23)}function N$(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;$(24)}function O$(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;$(25)}function P$(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;$(26)}

// EMSCRIPTEN_END_FUNCS
var Qd=[o$,Ur,Ms,qF,UQ,o$,o$,o$];var Rd=[p$,LO,rO,p$];var Sd=[q$,qL,$O,WO,NO,GO,BO,hO];var Td=[r$,Ge,Ae,Se,Ue,ef,gf,Ef,Gf,Sf,Uf,eg,gg,sg,tg,yg,Ag,_Z,oi,si,ti,ij,mj,nj,Fj,Jj,Kj,Yj,ak,bk,tk,xk,yk,Pk,Tk,Uk,Ro,So,To,Uo,Vo,Wo,Xo,Yo,Zo,_o,$o,ap,bp,cp,fp,kp,mp,Br,Hr,Pr,Qr,Tr,Xr,cs,fs,gs,hs,ls,ms,os,ps,rs,ts,us,vs,Bt,Ht,Nt,Tt,Zt,du,hu,nu,Ju,Ku,Ls,Nu,pw,tw,uw,yw,zw,Qw,Rw,Sw,Xx,Yx,Zx,_x,$x,ay,by,cy,nF,oF,pF,BF,CF,DF,cG,dG,pG,KG,uH,fI,lI,sI,yI,pJ,qJ,rJ,sJ,AJ,BJ,IP,JP,QP,RP,SP,QQ,RQ,SQ,TQ,mS,sS,xS,DS,IS,OS,TS,ZS,cT,iT,nT,tT,yT,ET,IT,OT,DU,EU,QU,jV,SX,b_,lL,pL,QV,jW,rW,sW,oW,pW,qW,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$,r$];var Ud=[s$,Yr,Zr,bW,dW,s$,s$,s$];var Vd=[t$,Oe,_e,pf,Mf,_f,mg,Mg,Pi,Ti,Xi,$i,dj,Bj,Jl,_l,cm,gm,km,om,sm,jn,rn,Dn,Vn,ko,Co,Jo,gp,ip,lp,np,op,tp,Op,lq,sq,xq,Bq,Fq,or,Gr,Rr,_r,$r,as,bs,ds,es,is,js,ks,ns,ss,Gt,St,cu,mu,vu,Gu,YF,lG,qG,RG,sH,kI,xI,GI,KI,OI,WI,fJ,mK,rK,FP,MP,bQ,rQ,yR,rS,CS,NS,YS,hT,sT,DT,NT,bU,pU,vU,zU,MU,RU,qV,MV,XR,AL,SV,UV,WV,YV,eW,gW,hW,iW,kW,mW,tW,wW,sM,ZO,RO,EO,xO,bO,XN,RN,LN,FN,yN,rN,lN,eN,t$,t$,t$,t$,t$];var Wd=[u$,Sr,Vr,_V,_L,u$,u$,u$];var Xd=[v$,hl,nl,xl,Dl,Bm,Hm,Vm,$m,Rq,Xq,Uw,Yw,ey,iy,LF,PF,JG,QG,dP,nP,VP,iV,pV,XX,TX,DY,GZ,h_,j_,m_,vL,EL,IL,ML,QL,cM,gM,kM,oM,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$,v$];var Yd=[w$,VL];var Zd=[x$,nH,oH,x$];var _d=[y$,dl,el,fl,gl,il,jl,kl,ll,ml,tl,ul,vl,wl,yl,zl,Al,Bl,Cl,xm,ym,zm,Am,Cm,Dm,Em,Fm,Gm,Rm,Sm,Tm,Um,Wm,Xm,Ym,Zm,_m,Nq,Oq,Pq,Qq,Sq,Tq,Uq,Vq,Wq,vH,y$,y$,y$,y$,y$,y$,y$,y$,y$,y$,y$,y$,y$,y$,y$,y$,y$];var $d=[z$,pH,qH,z$];var ae=[A$,B$,zZ,UZ];var be=[C$,Ee,Fe,He,Ie,NY,Me,Ne,Pe,Qe,Re,Ye,Ze,$e,cf,df,nf,of,qf,Cf,Df,Kf,Lf,Nf,Qf,Rf,Yf,Zf,$f,cg,dg,kg,lg,ng,qg,rg,vg,wg,xg,Kg,Lg,Ng,Ug,Xg,bh,ch,hh,oh,ph,qh,ZZ,xh,Ch,Hh,Mh,Nh,Rh,Sh,Yh,Zh,bi,ci,mi,ni,ri,Ai,Di,Ni,Oi,Qi,Ri,Si,Ui,Vi,Wi,Yi,Zi,_i,aj,bj,cj,ej,gj,hj,lj,zj,Aj,Cj,Dj,Ej,Ij,Wj,Xj,$j,rk,sk,wk,Nk,Ok,Sk,$k,al,ql,Hl,Il,Kl,Ll,Ml,Yl,Zl,$l,am,bm,dm,em,fm,hm,im,jm,lm,mm,nm,pm,qm,rm,tm,um,Nm,Om,gn,hn,kn,pn,qn,sn,tn,un,Bn,Cn,En,Gn,Hn,Mn,Tn,Un,Wn,Yn,Zn,co,io,jo,lo,no,oo,to,Ao,Bo,Do,Ho,Io,Ko,Po,Qo,hp,jp,rp,sp,up,Mp,Np,Pp,jq,kq,mq,pq,qq,rq,tq,vq,wq,yq,zq,Aq,Cq,Dq,Eq,Gq,Yp,Hq,Jq,Kq,mr,nr,pr,zr,Ar,Dr,Er,Fr,Nr,Or,xs,ys,zt,At,Dt,Et,Ft,Lt,Mt,Pt,Qt,Xt,Yt,$t,au,gu,ju,ku,lu,tu,uu,wu,Rs,xu,Ss,yu,Eu,Fu,Hu,Qs,Iu,Us,jv,kv,aw,cw,dw,ew,fw,hw,kw,mw,nw,ow,qw,rw,sw,vw,ww,xw,Bw,Iw,Jw,Kw,Cw,Lw,Ow,Pw,Tw,Vw,Ww,Xw,$w,ex,ax,fx,jx,px,qx,sx,Ix,Vx,Wx,dy,fy,gy,hy,vy,yy,By,bF,cF,eF,gF,kF,mF,zF,AF,KF,MF,NF,OF,WF,XF,ZF,aG,bG,gH,iH,RF,jH,lH,mH,rH,dI,eI,hI,iI,rI,uI,vI,wI,EI,FI,HI,II,JI,LI,MI,NI,PI,UI,VI,XI,LH,ZI,_I,dJ,eJ,gJ,nJ,oJ,XJ,bK,kK,lK,nK,pK,qK,sK,bP,cP,kP,lP,mP,DP,EP,GP,HP,KP,LP,NP,OP,PP,TP,UP,$P,aQ,cQ,dQ,eQ,pQ,qQ,sQ,vQ,wQ,xQ,yQ,zQ,uQ,CQ,EQ,JQ,OQ,PQ,YQ,dR,wR,xR,zR,BR,CR,ER,OR,PR,lS,oS,pS,qS,wS,zS,AS,BS,HS,KS,LS,MS,SS,VS,WS,XS,bT,eT,fT,gT,mT,pT,qT,rT,xT,AT,BT,CT,HT,KT,LT,MT,$T,aU,cU,nU,oU,qU,sU,tU,uU,wU,xU,yU,AU,BU,CU,KV,LV,NV,PV,CZ,DZ,EZ,FZ,PZ,$Z,a_,f_,g_,i_,l_,n_,yj,Vj,ik,pk,Fk,Lk,mL,aP,XO,OO,HO,CO,iO,VZ,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$,C$];var ce=[D$,Dg,wi,qj,Nj,ek,Bk,Xk];var de=[E$,nG,OU,E$];var ee=[F$,ze,Be,Te,Ve,ff,hf,Ff,Hf,Tf,Vf,fg,hg,ug,zg,Bg,Cg,Eg,Fg,dh,eh,rh,Oh,Ph,Th,Uh,_h,$h,di,ei,pi,qi,ui,vi,xi,yi,jj,kj,oj,pj,rj,sj,Gj,Hj,Lj,Mj,Oj,Pj,Zj,_j,ck,dk,fk,gk,uk,vk,zk,Ak,Ck,Dk,Qk,Rk,Vk,Wk,Yk,Zk,bl,cl,rl,sl,Nl,Ol,vm,wm,Pm,Qm,vn,wn,In,Jn,_n,$n,po,qo,ep,Lq,Mq,Cr,Wr,qs,ws,zs,Ct,Ot,Rt,_t,iu,Jx,EF,FF,GF,HF,IF,JF,mG,oG,tG,vG,yG,zG,BG,CG,SG,cH,gI,tI,vJ,zJ,gP,XP,QR,nS,yS,JS,US,dT,oT,zT,JT,NU,PU,UU,WU,ZU,_U,aV,bV,rV,DV,xj,wj,vj,Uj,Tj,Sj,hk,lk,ok,Ek,Kk,qM,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$,F$];var fe=[G$,_G,zV,MO,sO,G$,G$,G$];var ge=[H$,Ou];var he=[I$,dp,Lu,Mu,rF,sF,eG,fG,gG,hG,iG,rG,sG,uG,wG,xG,FG,GG,HG,IG,LG,TG,tH,tJ,uJ,wJ,xJ,yJ,eP,fP,oP,DR,FU,GU,HU,IU,JU,SU,TU,VU,XU,YU,eV,fV,gV,hV,kV,sV,_O,SO,FO,yO,cO,YN,SN,MN,GN,zN,sN,mN,fN,I$,I$,I$];var ie=[J$,bu,NG,PG,YG,$G,aH,jI,fQ,mV,oV,xV,AV,BV,JZ,SZ,q_,J$,J$,J$,J$,J$,J$,J$,J$,J$,J$,J$,J$,J$,J$,J$];var je=[K$,dF,jG,kG,AG,DG,MG,OG,VG,WG,bH,eH,KU,LU,$U,cV,lV,nV,uV,vV,CV,FV,IZ,RZ,p_,K$,K$,K$,K$,K$,K$,K$];var ke=[L$,WP];var le=[M$,EG,dV,HZ,QZ,o_,M$,M$];var me=[N$,dH,EV,N$];var ne=[O$,UG,tV,O$];var oe=[P$,XG,ZG,wV,yV,P$,P$,P$];return{__GLOBAL__sub_I_bind_cpp:xW,__GLOBAL__sub_I_bindings_cpp:tK,___cxa_can_catch:y_,___cxa_is_pointer_type:z_,___getTypeName:PX,___udivdi3:F_,___uremdi3:G_,_bitshift64Lshr:H_,_bitshift64Shl:I_,_emscripten_replace_memory:Pd,_free:RX,_i64Add:B_,_i64Subtract:C_,_llvm_bswap_i32:J_,_malloc:QX,_memcpy:K_,_memmove:L_,_memset:M_,_roundf:N_,_sbrk:O_,dynCall_di:P_,dynCall_dii:Q_,dynCall_i:R_,dynCall_ii:S_,dynCall_iid:T_,dynCall_iii:U_,dynCall_iiid:V_,dynCall_iiii:W_,dynCall_iiiid:X_,dynCall_iiiidii:Y_,dynCall_iiiii:Z_,dynCall_iiiiiii:__,dynCall_v:$_,dynCall_vi:a$,dynCall_vid:b$,dynCall_vidddd:c$,dynCall_vii:d$,dynCall_viid:e$,dynCall_viidii:f$,dynCall_viii:g$,dynCall_viiii:h$,dynCall_viiiii:i$,dynCall_viiiiidi:j$,dynCall_viiiiii:k$,dynCall_viiiiiii:l$,dynCall_viiiiiiii:m$,dynCall_viiiiiiiiii:n$,establishStackSpace:se,getTempRet0:ve,runPostSets:A_,setTempRet0:ue,setThrew:te,stackAlloc:pe,stackRestore:re,stackSave:qe}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var __GLOBAL__sub_I_bind_cpp=Module["__GLOBAL__sub_I_bind_cpp"]=asm["__GLOBAL__sub_I_bind_cpp"];var __GLOBAL__sub_I_bindings_cpp=Module["__GLOBAL__sub_I_bindings_cpp"]=asm["__GLOBAL__sub_I_bindings_cpp"];var ___cxa_can_catch=Module["___cxa_can_catch"]=asm["___cxa_can_catch"];var ___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=asm["___cxa_is_pointer_type"];var ___getTypeName=Module["___getTypeName"]=asm["___getTypeName"];var ___udivdi3=Module["___udivdi3"]=asm["___udivdi3"];var ___uremdi3=Module["___uremdi3"]=asm["___uremdi3"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _emscripten_replace_memory=Module["_emscripten_replace_memory"]=asm["_emscripten_replace_memory"];var _free=Module["_free"]=asm["_free"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _llvm_bswap_i32=Module["_llvm_bswap_i32"]=asm["_llvm_bswap_i32"];var _malloc=Module["_malloc"]=asm["_malloc"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var _memmove=Module["_memmove"]=asm["_memmove"];var _memset=Module["_memset"]=asm["_memset"];var _roundf=Module["_roundf"]=asm["_roundf"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var establishStackSpace=Module["establishStackSpace"]=asm["establishStackSpace"];var getTempRet0=Module["getTempRet0"]=asm["getTempRet0"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var setTempRet0=Module["setTempRet0"]=asm["setTempRet0"];var setThrew=Module["setThrew"]=asm["setThrew"];var stackAlloc=Module["stackAlloc"]=asm["stackAlloc"];var stackRestore=Module["stackRestore"]=asm["stackRestore"];var stackSave=Module["stackSave"]=asm["stackSave"];var dynCall_di=Module["dynCall_di"]=asm["dynCall_di"];var dynCall_dii=Module["dynCall_dii"]=asm["dynCall_dii"];var dynCall_i=Module["dynCall_i"]=asm["dynCall_i"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_iid=Module["dynCall_iid"]=asm["dynCall_iid"];var dynCall_iii=Module["dynCall_iii"]=asm["dynCall_iii"];var dynCall_iiid=Module["dynCall_iiid"]=asm["dynCall_iiid"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];var dynCall_iiiid=Module["dynCall_iiiid"]=asm["dynCall_iiiid"];var dynCall_iiiidii=Module["dynCall_iiiidii"]=asm["dynCall_iiiidii"];var dynCall_iiiii=Module["dynCall_iiiii"]=asm["dynCall_iiiii"];var dynCall_iiiiiii=Module["dynCall_iiiiiii"]=asm["dynCall_iiiiiii"];var dynCall_v=Module["dynCall_v"]=asm["dynCall_v"];var dynCall_vi=Module["dynCall_vi"]=asm["dynCall_vi"];var dynCall_vid=Module["dynCall_vid"]=asm["dynCall_vid"];var dynCall_vidddd=Module["dynCall_vidddd"]=asm["dynCall_vidddd"];var dynCall_vii=Module["dynCall_vii"]=asm["dynCall_vii"];var dynCall_viid=Module["dynCall_viid"]=asm["dynCall_viid"];var dynCall_viidii=Module["dynCall_viidii"]=asm["dynCall_viidii"];var dynCall_viii=Module["dynCall_viii"]=asm["dynCall_viii"];var dynCall_viiii=Module["dynCall_viiii"]=asm["dynCall_viiii"];var dynCall_viiiii=Module["dynCall_viiiii"]=asm["dynCall_viiiii"];var dynCall_viiiiidi=Module["dynCall_viiiiidi"]=asm["dynCall_viiiiidi"];var dynCall_viiiiii=Module["dynCall_viiiiii"]=asm["dynCall_viiiiii"];var dynCall_viiiiiii=Module["dynCall_viiiiiii"]=asm["dynCall_viiiiiii"];var dynCall_viiiiiiii=Module["dynCall_viiiiiiii"]=asm["dynCall_viiiiiiii"];var dynCall_viiiiiiiiii=Module["dynCall_viiiiiiiiii"]=asm["dynCall_viiiiiiiiii"];Module["asm"]=asm;if(memoryInitializer){if(!isDataURI(memoryInitializer)){if(typeof Module["locateFile"]==="function"){memoryInitializer=Module["locateFile"](memoryInitializer)}else if(Module["memoryInitializerPrefixURL"]){memoryInitializer=Module["memoryInitializerPrefixURL"]+memoryInitializer}}if(ENVIRONMENT_IS_NODE||ENVIRONMENT_IS_SHELL){var data=Module["readBinary"](memoryInitializer);HEAPU8.set(data,GLOBAL_BASE)}else{addRunDependency("memory initializer");var applyMemoryInitializer=(function(data){if(data.byteLength)data=new Uint8Array(data);HEAPU8.set(data,GLOBAL_BASE);if(Module["memoryInitializerRequest"])delete Module["memoryInitializerRequest"].response;removeRunDependency("memory initializer")});function doBrowserLoad(){Module["readAsync"](memoryInitializer,applyMemoryInitializer,(function(){throw"could not load memory initializer "+memoryInitializer}))}var memoryInitializerBytes=tryParseAsDataURI(memoryInitializer);if(memoryInitializerBytes){applyMemoryInitializer(memoryInitializerBytes.buffer)}else if(Module["memoryInitializerRequest"]){function useRequest(){var request=Module["memoryInitializerRequest"];var response=request.response;if(request.status!==200&&request.status!==0){var data=tryParseAsDataURI(Module["memoryInitializerRequestURL"]);if(data){response=data.buffer}else{console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: "+request.status+", retrying "+memoryInitializer);doBrowserLoad();return}}applyMemoryInitializer(response)}if(Module["memoryInitializerRequest"].response){setTimeout(useRequest,0)}else{Module["memoryInitializerRequest"].addEventListener("load",useRequest)}}else{doBrowserLoad()}}}Module["then"]=(function(func){if(Module["calledRun"]){func(Module)}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=(function(){if(old)old();func(Module)})}return Module});function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};function run(args){args=args||Module["arguments"];if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]&&status===0){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["exit"](status)}Module["quit"](status,new ExitStatus(status))}Module["exit"]=exit;function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}Module["noExitRuntime"]=true;run()






  return Module;
};
if (true)
  module.exports = Module;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return Module; });
else if (typeof exports === 'object')
  exports["Module"] = Module;
module.exports = {createModule: function () { return Module(null); }};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49), __webpack_require__(1969).Buffer))

/***/ }),

/***/ 1969:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(1970)
var ieee754 = __webpack_require__(1971)
var isArray = __webpack_require__(1972)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ }),

/***/ 1970:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 1971:
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 1972:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 1973:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceManager; });
var ResourceManager = /** @class */ (function () {
    function ResourceManager() {
        this.releaseFunctions = [];
    }
    ResourceManager.prototype.add = function (resource) {
        this.releaseFunctions.push(function () {
            resource.unload();
        });
    };
    ResourceManager.prototype.addCustom = function (releaseFunction) {
        this.releaseFunctions.push(releaseFunction);
    };
    ResourceManager.prototype.releaseAll = function () {
        this.releaseFunctions.reverse();
        this.releaseFunctions.forEach(function (fn) { return fn(); });
        this.releaseFunctions = [];
    };
    return ResourceManager;
}());

//# sourceMappingURL=resourceManager.js.map

/***/ }),

/***/ 1974:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BitmapExporter; });
// Responsible for receiving the image
var BitmapExporter = /** @class */ (function () {
    function BitmapExporter(supplementaryCanvas, module) {
        this.supplementaryCanvas = supplementaryCanvas;
        this.module = module;
    }
    BitmapExporter.prototype.prepare = function (imageWidth, imageHeight) {
        if (imageWidth <= 0 || imageHeight <= 0) {
            return false;
        }
        this.supplementaryCanvas.width = imageWidth;
        this.supplementaryCanvas.height = imageHeight;
        return (this.supplementaryCanvas.width === imageWidth &&
            this.supplementaryCanvas.height === imageHeight);
    };
    // Puts the part of the image to the canvas.
    // The array is allocated in Emscripten heap. The core is responsible for releasing it.
    // buffer is the offset in the 8-bit Emscripten heap, bufferLength is the length of the buffer in bytes.
    // The image format is RGBA, no extra conversion necessary to place it to the canvas.
    BitmapExporter.prototype.putImagePart = function (left, top, width, height, buffer, bufferLength) {
        var context = this.supplementaryCanvas.getContext('2d');
        if (context) {
            var array = new Uint8ClampedArray(this.module.HEAPU8.buffer, buffer, bufferLength);
            var imageData = context.createImageData(width, height); // new ImageData() doesn't work in IE11
            imageData.data.set(array);
            context.putImageData(imageData, left, top);
        }
    };
    BitmapExporter.prototype.getBase64Image = function (format) {
        return this.supplementaryCanvas.toDataURL(format);
    };
    return BitmapExporter;
}());

//# sourceMappingURL=bitmapExporter.js.map

/***/ }),

/***/ 1975:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BitmapProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bitmap__ = __webpack_require__(1976);

// Now this class supports only one image
var BitmapProvider = /** @class */ (function () {
    function BitmapProvider(imageProvider, gl) {
        this.imageProvider = imageProvider;
        this.gl = gl;
        this.createBitmap();
    }
    BitmapProvider.prototype.unload = function () {
        this.destroyBitmap(false);
    };
    BitmapProvider.prototype.handleContextLost = function () {
        this.destroyBitmap(true);
    };
    BitmapProvider.prototype.handleContextRestored = function () {
        this.createBitmap();
    };
    BitmapProvider.prototype.createBitmap = function () {
        var _a = this.imageProvider, backImage = _a.backImage, supplementaryCanvas = _a.supplementaryCanvas;
        this.bitmap = new __WEBPACK_IMPORTED_MODULE_0__bitmap__["a" /* Bitmap */](backImage, this.gl, supplementaryCanvas);
    };
    BitmapProvider.prototype.destroyBitmap = function (contextLost) {
        if (this.bitmap) {
            this.bitmap.unload(contextLost);
        }
    };
    // Gets the index of the bitmap specified by its UUID. Later a bitmap will be referenced with its index.
    // Once an index assigned to the bitmap, it cannot change during the lifetime of the bitmap provider.
    // In case of failure returns -1, 0 is a valid value.
    BitmapProvider.prototype.getBitmapIndex = function (uuid) {
        if (uuid !== this.imageProvider.backImageUuid) {
            return -1;
        }
        return 0;
    };
    // Gets the bitmap dimensions
    BitmapProvider.prototype.getBitmapWidth = function (bitmapIndex) {
        return this.bitmap ? this.bitmap.size.width : 0;
    };
    BitmapProvider.prototype.getBitmapHeight = function (bitmapIndex) {
        return this.bitmap ? this.bitmap.size.height : 0;
    };
    BitmapProvider.prototype.getNumberOfFragments = function (bitmapIndex) {
        return this.bitmap ? this.bitmap.numberOfFragments : 0;
    };
    BitmapProvider.prototype.queryFragmentCoordinates = function (bitmapIndex, fragmentIndex) {
        if (!this.bitmap) {
            return false;
        }
        var position = this.bitmap.getFragmentPosition(fragmentIndex);
        if (position) {
            this.fragmentPosition = position;
            return true;
        }
        else {
            this.fragmentPosition = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                uTopLeft: 0,
                vTopLeft: 0,
                uBottomRight: 0,
                vBottomRight: 0,
            };
            return false;
        }
    };
    BitmapProvider.prototype.getX = function () {
        return this.fragmentPosition.x;
    };
    BitmapProvider.prototype.getY = function () {
        return this.fragmentPosition.y;
    };
    BitmapProvider.prototype.getWidth = function () {
        return this.fragmentPosition.width;
    };
    BitmapProvider.prototype.getHeight = function () {
        return this.fragmentPosition.height;
    };
    BitmapProvider.prototype.getUTopLeft = function () {
        return this.fragmentPosition.uTopLeft;
    };
    BitmapProvider.prototype.getVTopLeft = function () {
        return this.fragmentPosition.vTopLeft;
    };
    BitmapProvider.prototype.getUBottomRight = function () {
        return this.fragmentPosition.uBottomRight;
    };
    BitmapProvider.prototype.getVBottomRight = function () {
        return this.fragmentPosition.vBottomRight;
    };
    BitmapProvider.prototype.bind = function (bitmapIndex, fragmentIndex) {
        if (!this.bitmap) {
            return false;
        }
        return this.bitmap.bindFragment(fragmentIndex);
    };
    return BitmapProvider;
}());

//# sourceMappingURL=bitmapProvider.js.map

/***/ }),

/***/ 1976:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bitmap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bitmapFragment__ = __webpack_require__(1977);

// Holds a bitmap from the bitmap provider. Each bitmap consists of several fragments (textures)
var Bitmap = /** @class */ (function () {
    function Bitmap(img, gl, supplementaryCanvas) {
        this.size = { width: img.width, height: img.height };
        var maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.fragments = this.splitToFragments(img, gl, supplementaryCanvas, maxSize);
    }
    Bitmap.prototype.unload = function (contextLost) {
        this.fragments.forEach(function (fragment) { return fragment.unload(contextLost); });
    };
    Object.defineProperty(Bitmap.prototype, "numberOfFragments", {
        get: function () {
            return this.fragments.length;
        },
        enumerable: true,
        configurable: true
    });
    Bitmap.prototype.getFragmentPosition = function (fragmentIndex) {
        return this.applyToFragment(fragmentIndex, function (fragment) { return fragment.position; }, null);
    };
    Bitmap.prototype.bindFragment = function (fragmentIndex) {
        return this.applyToFragment(fragmentIndex, function (fragment) { return fragment.bind(); }, false);
    };
    // Generic method to perform an action on a fragment specified by the index
    // If no fragment is found, the 'notFound' value is returned
    Bitmap.prototype.applyToFragment = function (fragmentIndex, action, notFound) {
        if (fragmentIndex < 0 || fragmentIndex >= this.fragments.length) {
            return notFound;
        }
        return action(this.fragments[fragmentIndex]);
    };
    Bitmap.prototype.splitToFragments = function (img, gl, supplementaryCanvas, maxSize) {
        var fragments = [];
        var _a = this.size, width = _a.width, height = _a.height;
        for (var x = 0; x < width; x += maxSize) {
            for (var y = 0; y < height; y += maxSize) {
                var xMax = Math.min(x + maxSize, width);
                var yMax = Math.min(y + maxSize, height);
                var fragmentWidth = xMax - x;
                var fragmentHeight = yMax - y;
                var fragment = new __WEBPACK_IMPORTED_MODULE_0__bitmapFragment__["a" /* BitmapFragment */](gl, x, y, fragmentWidth, fragmentHeight, img, supplementaryCanvas);
                fragments.push(fragment);
            }
        }
        return fragments;
    };
    return Bitmap;
}());

//# sourceMappingURL=bitmap.js.map

/***/ }),

/***/ 1977:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BitmapFragment; });
// One piece of a bitmap. Holds one texture.
var BitmapFragment = /** @class */ (function () {
    function BitmapFragment(gl, x, y, width, height, image, supplementaryCanvas) {
        this.gl = gl;
        this.position = {
            x: x,
            y: y,
            width: width,
            height: height,
            uTopLeft: 0.0,
            vTopLeft: 0.0,
            uBottomRight: 1.0,
            vBottomRight: 1.0,
        };
        this.texture = this.createTexture(image, supplementaryCanvas);
    }
    BitmapFragment.prototype.unload = function (contextLost) {
        if (!contextLost) {
            this.gl.deleteTexture(this.texture);
        }
    };
    BitmapFragment.prototype.bind = function () {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        return true;
    };
    BitmapFragment.prototype.createTexture = function (image, supplementaryCanvas) {
        var _a = this.position, width = _a.width, height = _a.height, x = _a.x, y = _a.y;
        // Draw the fragment on the supplementary canvas
        supplementaryCanvas.width = width;
        supplementaryCanvas.height = height;
        var context = supplementaryCanvas.getContext('2d');
        context.drawImage(image, x, y, width, height, 0, 0, width, height);
        // Create the texture
        var gl = this.gl;
        var texture = gl.createTexture();
        if (!texture) {
            throw new Error('Could not create a texture');
        }
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, supplementaryCanvas);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    };
    return BitmapFragment;
}());

//# sourceMappingURL=bitmapFragment.js.map

/***/ }),

/***/ 1978:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowserTypesetter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__typeset__ = __webpack_require__(1979);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fontInfo__ = __webpack_require__(1957);



// The core needs typesets to render text.
// This class is responsible for storing and providing typesets.
var BrowserTypesetter = /** @class */ (function () {
    function BrowserTypesetter(config) {
        this.config = config;
        this.typesets = [];
        this.fontInfo = new __WEBPACK_IMPORTED_MODULE_2__fontInfo__["a" /* FontInfo */](this.config.textHelperDiv);
    }
    BrowserTypesetter.prototype.unload = function () {
        this.typesets.forEach(function (typeset) { return typeset.unload(); });
    };
    // Creates a new typeset, returns its index.
    // The newly created typeset must exist until it is explicitly deleted with deleteTypeset() regardless context loss.
    BrowserTypesetter.prototype.createTypeset = function () {
        var typeset = new __WEBPACK_IMPORTED_MODULE_1__typeset__["a" /* Typeset */](__WEBPACK_IMPORTED_MODULE_0_tslib__["__assign"]({}, this.config, { fontInfo: this.fontInfo }));
        return this.typesets.push(typeset) - 1;
    };
    BrowserTypesetter.prototype.deleteTypeset = function (index) {
        this.typesets[index].unload();
    };
    BrowserTypesetter.prototype.getTypeset = function (index) {
        return this.typesets[index];
    };
    BrowserTypesetter.prototype.handleContextLost = function () {
        this.typesets.forEach(function (typeset) { return typeset.contextLost(); });
    };
    BrowserTypesetter.prototype.handleContextRestored = function () {
        this.typesets.forEach(function (typeset) { return typeset.contextRestored(); });
    };
    return BrowserTypesetter;
}());

//# sourceMappingURL=browserTypesetter.js.map

/***/ }),

/***/ 1979:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Typeset; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paragraph__ = __webpack_require__(1980);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1955);


// Each text model stored in the core has a corresponding typeset.
// When a model is changed, the core calls 'update()'.
//
// Paragraphs are separated with the character '\n'. Currently each paragraph is one line.
//
// A typeset must provide text fragments and cursor positions.
//
// A fragment consists of:
//   - two alpha textures: one for the text per se and one for the stroke (outline); they should be bound when requested;
//   - position of the text fragment assuming that the text origin is in (0, 0).
//
// For the text containing N characters the typeset must produce N + 1 cursor positions. Each of them is a point with two values x and y.
// Line height and descent are used to render the cursor. Cursor positions for subsequent lines must have y coordinates that differ
// exactly in line height.
var Typeset = /** @class */ (function () {
    function Typeset(config) {
        this.config = config;
        this.isContextLost = false;
        // We store paragraphs of text and update them when necessary.
        // Fragments are owned by paragraphs, paragraphs are responsible for their lifetime,
        // here we store fragments only to implement Core.TypesetInterop conveniently.
        this.paragraphs = [];
        this.fragments = [];
    }
    Typeset.prototype.unload = function () {
        // might be called multiple times
        this.destroy();
    };
    Typeset.prototype.contextLost = function () {
        this.isContextLost = true;
        this.destroy();
    };
    Typeset.prototype.contextRestored = function () {
        this.isContextLost = false;
    };
    // Updates the typeset with the new text. Passes the following arguments:
    //   text - the text to typeset
    //   textLength - the length of the text line (in UTF-32 code units)
    //   direction - text direction: 'ltr' or 'rtl'
    //   fontSize - font size in pixels
    //   cursorArray - array to be filled in with cursor data, the memory is pre-allocated in Emscripten heap
    //                 for  2 * (textLength + 1)  32-bit integers (x and y coordinates for cursor positions)
    //
    // Returns true if the update was successful
    // If the result is false, the core will not call the other functions from Core.TypesetInterop.
    Typeset.prototype.update = function (text, textLength, direction, fontSize, cursorArray) {
        if (this.isContextLost) {
            // sanity check because we manipulate textures during update
            return false;
        }
        this.fontMetrics = this.config.fontInfo.getFontMetrics(fontSize);
        return (this.updateParagraphs(text, direction, fontSize) &&
            this.collectParagraphData(cursorArray, textLength + 1));
    };
    // After update is completed successfully, the following functions are available:
    Typeset.prototype.getFragmentCount = function () {
        return this.fragments.length;
    };
    Typeset.prototype.bindNormal = function (fragmentIndex) {
        return this.bindFragmentTexture(fragmentIndex, function (fragment) {
            return fragment.bindNormal();
        });
    };
    Typeset.prototype.bindStroke = function (fragmentIndex) {
        return this.bindFragmentTexture(fragmentIndex, function (fragment) {
            return fragment.bindStroke();
        });
    };
    Typeset.prototype.getXBase = function (fragmentIndex) {
        return this.getFragmentCoordinate(fragmentIndex, function (pos) { return pos.xbase; });
    };
    Typeset.prototype.getYBase = function (fragmentIndex) {
        return this.getFragmentCoordinate(fragmentIndex, function (pos, yline) { return pos.ybase + yline; });
    };
    Typeset.prototype.getXOpposite = function (fragmentIndex) {
        return this.getFragmentCoordinate(fragmentIndex, function (pos) { return pos.xopposite; });
    };
    Typeset.prototype.getYOpposite = function (fragmentIndex) {
        return this.getFragmentCoordinate(fragmentIndex, function (pos, yline) { return pos.yopposite + yline; });
    };
    Typeset.prototype.getLineHeight = function () {
        return this.fontMetrics.lineHeight;
    };
    Typeset.prototype.getDescent = function () {
        return this.fontMetrics.descent;
    };
    Typeset.prototype.destroy = function () {
        var _this = this;
        // We should not release fragments explicitly because fragments are owned by paragraphs and released when we release paragraphs,
        // fragments are stored here only for convenience.
        this.fragments = [];
        this.paragraphs.forEach(function (par) { return par.unload(_this.isContextLost); });
        this.paragraphs = [];
    };
    Typeset.prototype.bindFragmentTexture = function (index, bindMethod) {
        return bindMethod(this.fragments[index].fragment);
    };
    Typeset.prototype.getFragmentCoordinate = function (index, getter) {
        var _a = this.fragments[index], fragment = _a.fragment, yline = _a.yline;
        return getter(fragment.position, yline);
    };
    Typeset.prototype.updateParagraphs = function (text, direction, fontSize) {
        var _this = this;
        // Paragraphs are separated by '\n'. Currently one paragraph contains one line
        var paragraphTexts = text.split('\n');
        // We don't recreate, we reuse paragraphs.
        // So we need the same number of paragraphs as the number of texts that we got in paragraphTexts array.
        Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* adjustSize */])(this.paragraphs, paragraphTexts.length, function () {
            return new __WEBPACK_IMPORTED_MODULE_0__paragraph__["a" /* Paragraph */](_this.config);
        }, function (paragraph) {
            // paragraphs contain textures and must be released explicitly
            paragraph.unload(_this.isContextLost);
        });
        // Update each paragraph. The lengths of this.paragraphs and paragraphTexts are the same
        return this.paragraphs.every(function (paragraph, index) {
            return paragraph.update(paragraphTexts[index], direction, fontSize);
        });
    };
    Typeset.prototype.collectParagraphData = function (cursorArray, cursorPosCount) {
        // Since every paragraph is successfully updated, we need to collect fragments and cursor positions
        return (this.collectFragments() &&
            this.collectCursorPositions(cursorArray, cursorPosCount));
    };
    Typeset.prototype.collectFragments = function () {
        var _this = this;
        // For fragments we will record each fragment and the y coordinate of the line
        // (currently one paragraph contains only one line).
        this.fragments = []; // we don't own fragments (paragraphs do), so we don't need to delete textures explicitly
        var lineHeight = this.fontMetrics.lineHeight;
        this.paragraphs.forEach(function (par, parIndex) {
            var yline = -parIndex * lineHeight;
            par.textFragments.forEach(function (fragment) {
                _this.fragments.push({ fragment: fragment, yline: yline });
            });
        });
        return true;
    };
    Typeset.prototype.collectCursorPositions = function (cursorArray, cursorPosCount) {
        // For cheaper interoperation the core preallocates the array in Emscripten memory heap.
        // 'cursorArray' is the offset in this 32-bit heap.
        // We must populate this array with the values from paragraphs.
        //
        // This array contains (cursorPosCount * 2) 32-bit numbers. For each cursor position it should store
        // firstly x and then y coordinate.
        // For example, if we have 3 cursor positions (12, -5), (16, -11), (22, -11) the core expects the array:
        // [12, -5, 16, -11, 22, -11]
        // which contains 6 elements
        var count = 2 * cursorPosCount; // number of elements in the array
        var heapBase = this.config.module.HEAP32.buffer;
        var array = new Int32Array(heapBase, cursorArray, count);
        var index = 0;
        var lineHeight = this.fontMetrics.lineHeight;
        this.paragraphs.forEach(function (par, parIndex) {
            var yline = Math.round(-parIndex * lineHeight);
            par.textCursorPositions.forEach(function (x) {
                if (index < count - 1) {
                    // We must check the limits for not to destroy heap data
                    array[index] = Math.round(x);
                    array[index + 1] = yline;
                }
                index += 2;
            });
        });
        return true;
    };
    return Typeset;
}());

//# sourceMappingURL=typeset.js.map

/***/ }),

/***/ 1980:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Paragraph; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontInfo__ = __webpack_require__(1957);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__textRenderer__ = __webpack_require__(1981);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cursorPositions__ = __webpack_require__(1983);




// Holds fragments and cursor positions for one paragraph.
// Each fragment has two textures and the position. The paragraph is responsible for releasing the fragment textures.
// The position of the fragment is in the coordinates where the paragraph starts at (0, 0).
// Currently a paragraph can contain only one line, thus we store only x positions of the cursors.
var Paragraph = /** @class */ (function () {
    // if a text contains N UTF-32 code units, we should have N + 1 cursor positions
    function Paragraph(config) {
        this.config = config;
        this.text = '';
        this.direction = 'ltr';
        this.fontSize = 0;
        this.isValid = false; // indicates whether fragments or cursor positions were created for the last update
        this.fragments = []; // text fragments
        this.cursorPositions = []; // x coordinates of the cursor positions
    }
    Paragraph.prototype.unload = function (isContextLost) {
        this.destroy(isContextLost);
    };
    Object.defineProperty(Paragraph.prototype, "textFragments", {
        get: function () {
            return this.fragments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "textCursorPositions", {
        get: function () {
            return this.cursorPositions;
        },
        enumerable: true,
        configurable: true
    });
    Paragraph.prototype.update = function (text, direction, fontSize) {
        if (text === this.text &&
            direction === this.direction &&
            fontSize === this.fontSize &&
            this.isValid) {
            // The paragraph is up to date.
            // No need to recreate fragments or calculate cursor positions.
            return true;
        }
        this.text = text;
        this.direction = direction;
        this.fontSize = fontSize;
        this.destroy(false); // 'false' because we receive update() only when the context is valid
        this.cursorPositions = [];
        this.isValid = this.createFragments() && this.calculateCursorPositions();
        return this.isValid;
    };
    Paragraph.prototype.destroy = function (isContextLost) {
        this.fragments.forEach(function (fragment) { return fragment.unload(isContextLost); });
    };
    Paragraph.prototype.createFragments = function () {
        this.fragments = [];
        var _a = this, text = _a.text, direction = _a.direction, fontSize = _a.fontSize;
        return Object(__WEBPACK_IMPORTED_MODULE_2__textRenderer__["a" /* renderText */])(this.fragments, __WEBPACK_IMPORTED_MODULE_0_tslib__["__assign"]({ text: text,
            direction: direction,
            fontSize: fontSize }, this.config));
    };
    Paragraph.prototype.calculateCursorPositions = function () {
        var _a = this, text = _a.text, direction = _a.direction, fontSize = _a.fontSize;
        var textHelperDiv = this.config.textHelperDiv;
        // We create a helper div, set its font and direction to the required and call getCursorPositions()
        var rootDiv = document.createElement('div');
        textHelperDiv.appendChild(rootDiv);
        rootDiv.style.font = __WEBPACK_IMPORTED_MODULE_1__fontInfo__["a" /* FontInfo */].getFontStyle(fontSize);
        rootDiv.style.direction = direction;
        this.cursorPositions = Object(__WEBPACK_IMPORTED_MODULE_3__cursorPositions__["a" /* getCursorPositions */])(text, direction, rootDiv);
        textHelperDiv.removeChild(rootDiv);
        return true;
    };
    return Paragraph;
}());

//# sourceMappingURL=paragraph.js.map

/***/ }),

/***/ 1981:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return renderText; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fragment__ = __webpack_require__(1982);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fontInfo__ = __webpack_require__(1957);


// Renders one line of the text. Pushes new fragments to the 'fragments' array
var renderText = function (fragments, config) {
    var direction = config.direction, canvas = config.supplementaryCanvas, gl = config.gl;
    var measures = measureText(config);
    if (!measures) {
        return false;
    }
    setCanvasSize(canvas, measures);
    var previousDirection = setCanvasDir(canvas, direction);
    var normalTextures = generateTextures(config, measures, renderNormalText);
    var strokeTextures = generateTextures(config, measures, renderStroke);
    canvas.dir = previousDirection; // restore text direction
    // We need to check the generated textures. Their amount must be the same and all of them must be valid
    var generationCompleted = normalTextures.length === strokeTextures.length &&
        normalTextures.every(function (tex) { return !!tex.texture; }) &&
        strokeTextures.every(function (tex) { return !!tex.texture; });
    if (!generationCompleted) {
        // An unexpected error occured. We should delete all the textures and return false
        deleteTextures(gl, normalTextures);
        deleteTextures(gl, strokeTextures);
        return false;
    }
    // Combine the generated textures for the normal text and stroke. They have the same positions
    normalTextures.forEach(function (generatedNormal, index) {
        var generatedStroke = strokeTextures[index];
        var normal = generatedNormal.texture;
        var stroke = generatedStroke.texture;
        var position = generatedNormal.position;
        if (normal && stroke) {
            fragments.push(new __WEBPACK_IMPORTED_MODULE_0__fragment__["a" /* Fragment */](gl, normal, stroke, position));
        }
    });
    return true;
};
// Gets measures of the text that should be rendered
var measureText = function (config) {
    var text = config.text, direction = config.direction, fontSize = config.fontSize, fontInfo = config.fontInfo, supplementaryCanvas = config.supplementaryCanvas;
    // We will use '2d' context of the canvas to measure the text
    var context = supplementaryCanvas.getContext('2d');
    if (!context) {
        return null;
    }
    // Firstly we will detect the "pure" width and height of the text, without any offsets.
    var fontMetrics = fontInfo.getFontMetrics(fontSize);
    context.font = __WEBPACK_IMPORTED_MODULE_1__fontInfo__["a" /* FontInfo */].getFontStyle(fontSize);
    var pureWidth = context.measureText(text).width;
    var pureHeight = fontMetrics.lineHeight;
    // "Pure" width and height are rough values, estimations.
    // If we apply them directly, we can have our rendered text clipped. Thus we will add some offset.
    // Offset value was adjusted manually.
    // Also "pure" width and height don't consider stroke thickness, we need to add it as well.
    var strokeThickness = getStrokeThickness(fontSize);
    var offset = Math.round(Math.min(fontSize / 2, 5)) + strokeThickness;
    var width = Math.round(offset + pureWidth + offset);
    var height = Math.round(offset + pureHeight + offset);
    // If the direction is right-to-left, the text starts at the rightmost position
    var x = Math.round(direction === 'rtl' ? width - offset : offset);
    var y = Math.round(height - offset); // y on canvas context is measured from the top
    return { width: width, height: height, x: x, y: y, yoffset: offset, descent: fontMetrics.descent };
};
// Gets the thickness of the stroke depending on the font size.
// The numbers were adjusted manually.
var getStrokeThickness = function (fontSize) {
    return Math.round(Math.max(fontSize / 12, 2));
};
var setCanvasSize = function (canvas, measures) {
    canvas.width = measures.width;
    canvas.height = measures.height;
};
// Sets canvas diretion, returns the previous direction
var setCanvasDir = function (canvas, textDirection) {
    var previousDirection = canvas.dir;
    canvas.dir = textDirection;
    return previousDirection;
};
// Renders the text on the canvas and gets textures containing the rendered text.
// Rendering the normal text and stroke differs only in the text rendering. You should pass this function
// in the 'renderer' parameter.
//
// Also note that we need alpha textures as the result, where pixel 0 is transparent, 255 - opaque.
// Thus we will render white text on the black canvas. Then when we can copy any channel (R, G, or B) to the result texture.
var generateTextures = function (config, measures, renderer) {
    var text = config.text, fontSize = config.fontSize, gl = config.gl, canvas = config.supplementaryCanvas;
    var context = canvas.getContext('2d');
    if (!context) {
        return [];
    }
    clearCanvas(context, canvas);
    context.font = __WEBPACK_IMPORTED_MODULE_1__fontInfo__["a" /* FontInfo */].getFontStyle(fontSize);
    context.textBaseline = 'bottom';
    renderer(text, context, measures, getStrokeThickness(fontSize));
    return sliceCanvasToTextures(context, gl, measures);
};
var renderNormalText = function (text, context, measures) {
    context.fillStyle = '#FFFFFF';
    context.fillText(text, measures.x, measures.y);
};
var renderStroke = function (text, context, measures, strokeThickness) {
    context.lineJoin = 'round';
    context.strokeStyle = '#FFFFFF';
    // The stroke consists of two parts: the inner and outer, both are rendered with equal thickness: context.lineWidth / 2 each.
    // We need the outer stroke rendered with strokeThickness, thus we need to set context.lineWidth to (2 * strokeThickness).
    context.lineWidth = 2 * strokeThickness;
    context.strokeText(text, measures.x, measures.y);
};
var clearCanvas = function (context, canvas) {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
};
// Produces multiple alpha textures from the canvas with the rendered text.
// Slices the canvas horizontally.
var sliceCanvasToTextures = function (context, gl, measures) {
    var result = [];
    var maxTextureSize = gl.MAX_TEXTURE_SIZE;
    // We include descent to the offset because we used context.textBaseline = 'bottom' for rendering
    // but for the fragment y = 0 at the base line.
    var yoffset = measures.yoffset + measures.descent;
    for (var x = 0; x < measures.width; x += maxTextureSize) {
        var xend = Math.min(x + maxTextureSize, measures.width);
        result.push({
            texture: createTexture(context, gl, x, xend, measures.height),
            position: {
                xbase: x - measures.x,
                ybase: -yoffset,
                xopposite: xend - measures.x,
                yopposite: measures.height - yoffset,
            },
        });
    }
    return result;
};
var createTexture = function (context, gl, xstart, xend, height) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // These parameters are required for non-power-of-two textures (according to WebGL spec)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    var previousAlignment = gl.getParameter(gl.UNPACK_ALIGNMENT);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    var width = xend - xstart;
    var bufferLength = width * height;
    var buffer = new Uint8Array(bufferLength);
    // Copy the region from canvas
    var canvasData = context.getImageData(xstart, 0, width, height);
    for (var i = 0; i < canvasData.data.length; i += 4) {
        buffer[i / 4] = canvasData.data[i]; // we take the R channel
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, width, height, 0, gl.ALPHA, gl.UNSIGNED_BYTE, buffer);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, previousAlignment);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
};
var deleteTextures = function (gl, textures) {
    textures.forEach(function (gen) {
        if (gen.texture) {
            gl.deleteTexture(gen.texture);
        }
    });
};
//# sourceMappingURL=textRenderer.js.map

/***/ }),

/***/ 1982:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Fragment; });
// Part of a text. Contains two alpha textures:
//   - normal for the text itself,
//   - stroke for the outline.
//
// A fragment owns its textures: when it is unloaded it must release its textures.
var Fragment = /** @class */ (function () {
    function Fragment(gl, normal, stroke, position) {
        this.gl = gl;
        this.normal = normal;
        this.stroke = stroke;
        this.position = position;
    }
    Fragment.prototype.unload = function (isContextLost) {
        if (!isContextLost) {
            var gl = this.gl;
            gl.deleteTexture(this.normal);
            gl.deleteTexture(this.stroke);
        }
    };
    Fragment.prototype.bindNormal = function () {
        return this.bindTexture(this.normal);
    };
    Fragment.prototype.bindStroke = function () {
        return this.bindTexture(this.stroke);
    };
    Fragment.prototype.bindTexture = function (texture) {
        if (!texture) {
            return false;
        }
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return true;
    };
    return Fragment;
}());

//# sourceMappingURL=fragment.js.map

/***/ }),

/***/ 1983:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCursorPositions; });
/* unused harmony export isWhiteSpace */
/* unused harmony export isClose */
/* unused harmony export getDirection */
/* unused harmony export getGroupStartIndices */
/* unused harmony export getGroupXMinMax */
/* unused harmony export createSpansForCharacters */
/* unused harmony export createSpansForGroups */
/* unused harmony export calculateTotalLength */
/* unused harmony export putInternalPositions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1955);

// Tolerance to compare values for equality. It's for screen units, we don't need high precision
var screenUnitsTolerance = 1;
// Gets x coordinates of cursors for one line.
// For a text containing N characters (UTF-32 code units) we must produce N + 1 cursor positions.
//
// Note: textHelperDiv must already have font and direction with which the text is rendered
var getCursorPositions = function (text, direction, textHelperDiv) {
    if (text.length === 0) {
        return [0];
    }
    // We need a root span where we will put other spans
    var rootSpan = document.createElement('span');
    textHelperDiv.appendChild(rootSpan);
    var cursors = detectCursorPositions(Object(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* getUtf32CodeUnits */])(text), direction, rootSpan);
    textHelperDiv.removeChild(rootSpan);
    return cursors;
};
// In short:
//
// 1) We extract groups from the text. A group is a single whitespace character or an array of characters that have same direction.
//    We loop through the text in the logical order (how it is stored in memory).
// 2) When we will assign positions at the next step, it's better (for consistency) to loop through the groups in their visual order
//    (how they are displayed on the screen).
//    So we reorder the groups. We don't mess any data because each group holds the start index in the original text.
// 3) For each group we assign a cursor position at the beginning of the group and inside it.
// 4) We assign the last cursor position.
var detectCursorPositions = function (text, direction, rootSpan) {
    var cursorCount = text.length + 1;
    var cursors = initCursorsArray(cursorCount); // initial cursors array with zeros
    var groups = getGroups(text, direction, rootSpan);
    var totalLength = calculateTotalLength(groups);
    // Reorder groups so that they are ordered left-to-right like they appear on the screen
    groups.sort(function (a, b) { return a.xmin - b.xmin; });
    // We're ready to find the cursor positions.
    // For each group we'll put the start position:
    //   - for a 'ltr' group it's the leftmost position
    //   - for a 'rtl' group it's the rightmost position.
    // Then we set the internal positions inside a group.
    //
    // Finally we set the last cursor position.
    if (direction === 'rtl') {
        groups.forEach(function (group) {
            cursors[group.startIndex] = group.xmax;
            setInternalCursorPositions(group, rootSpan, cursors);
        });
        // The text direction is 'rtl', so the text ends at the leftmost position
        cursors[cursorCount - 1] = -totalLength;
    }
    else {
        groups.forEach(function (group) {
            cursors[group.startIndex] = group.xmin;
            setInternalCursorPositions(group, rootSpan, cursors);
        });
        // The text direction is 'ltr', so the text ends at the rightmost position
        cursors[cursorCount - 1] = totalLength;
    }
    return cursors;
};
// Gets the array for cursor position filled with zeros
var initCursorsArray = function (length, value) {
    if (value === void 0) { value = 0; }
    return Array.apply(null, { length: length }).map(function () { return value; });
};
// Extracting groups from the text
var getGroups = function (text, baseDirection, rootSpan) {
    // We extract groups in several steps:
    // 1) We detect groups of text that are either a single whitespace or have the same direction.
    // 2) We calculate start index for each group.
    // 3) We determine xmin and xmax for each group by putting a group into a span.
    var baseGroups = extractBaseGroups(text, baseDirection, rootSpan);
    var startIndices = getGroupStartIndices(baseGroups);
    var groupXMinMax = getGroupXMinMax(baseGroups, baseDirection, rootSpan);
    // Then we combine the results and return the groups
    return baseGroups.map(function (baseGroup, index) {
        var text = baseGroup.text;
        var direction = baseGroup.direction || baseDirection;
        var startIndex = startIndices[index];
        var _a = groupXMinMax[index], xmin = _a.xmin, xmax = _a.xmax;
        return { text: text, direction: direction, startIndex: startIndex, xmin: xmin, xmax: xmax };
    });
};
var extractBaseGroups = function (text, direction, rootSpan) {
    // We create a temporary span where we will put spans containig every character.
    var parentSpan = document.createElement('span');
    parentSpan.style.direction = direction;
    rootSpan.appendChild(parentSpan);
    var spans = createSpansForCharacters(text, parentSpan);
    var result = [];
    // Data for the group being extracted
    var currentText = [];
    var currentDirection;
    text.forEach(function (character, index) {
        if (isWhiteSpace(character)) {
            // The current character is a whitespace. It forms one group.
            // If we were extracting a group before, we put it to the result.
            if (currentText.length !== 0) {
                result.push({ text: currentText, direction: currentDirection });
                currentText = [];
                currentDirection = undefined;
            }
            // One whitespace forms a group
            result.push({ text: [character], direction: undefined });
        }
        else {
            // The character is not a whitespace
            if (currentText.length === 0) {
                // We only start to extract a group
                currentText.push(character);
            }
            else {
                // We determine direction based on the previous character
                var dir = getDirection(index, spans);
                // If we could not detect direction (currently we are at the second character of a group),
                // or it is different than the current, we will start a new group
                if (!dir || (currentDirection && currentDirection !== dir)) {
                    result.push({ text: currentText, direction: currentDirection }); // put previous to the result
                    currentText = [character]; // start a new group
                }
                else {
                    // we continue pushing characters into the current group
                    currentText.push(character);
                }
                currentDirection = dir;
            }
        }
    });
    // If we were extracting a group before, we put it to the result
    if (currentText.length !== 0) {
        result.push({ text: currentText, direction: currentDirection });
    }
    rootSpan.removeChild(parentSpan);
    return result;
};
var isWhiteSpace = function (codeUnit) {
    return codeUnit === ' ' || codeUnit === '\t'; // currently we don't support tabs, but they can be added
};
// Determines if two values are close
var isClose = function (x1, x2) {
    return Math.abs(x1 - x2) < screenUnitsTolerance;
};
// Gets the direction based on the previous character
var getDirection = function (index, spans) {
    if (index <= 0 || index >= spans.length) {
        return undefined;
    }
    var previousRect = spans[index - 1].getBoundingClientRect();
    var currentRect = spans[index].getBoundingClientRect();
    if (isClose(previousRect.right, currentRect.left)) {
        //  | previous || current |
        return 'ltr';
    }
    else if (isClose(previousRect.left, currentRect.right)) {
        //  | current || previous |
        return 'rtl';
    }
    else {
        return undefined;
    }
};
var getGroupStartIndices = function (baseGroups) {
    var index = 0;
    return baseGroups.map(function (group) {
        var groupIndex = index;
        index += group.text.length;
        return groupIndex;
    });
};
var getGroupXMinMax = function (baseGroups, direction, rootSpan) {
    // We create a temporary span where we will put spans for every group to get their xmin, xmax
    var parentSpan = document.createElement('span');
    parentSpan.style.direction = direction;
    rootSpan.appendChild(parentSpan);
    // Wrap each group into a span
    var spans = createSpansForGroups(baseGroups, parentSpan);
    // Get x origin of the line. Currently we have spans for each group inside parentSpan
    // For 'rtl' direction the line starts at the rightmost position,
    // for 'ltr' direction the line starts at the leftmost position.
    var parentSpanRect = parentSpan.getBoundingClientRect();
    var xorigin = direction === 'rtl' ? parentSpanRect.right : parentSpanRect.left;
    var groupXMinMax = spans.map(function (span) {
        var rect = span.getBoundingClientRect();
        return {
            xmin: rect.left - xorigin,
            xmax: rect.right - xorigin,
        };
    });
    rootSpan.removeChild(parentSpan);
    return groupXMinMax;
};
// Wrap each character into a span
var createSpansForCharacters = function (text, parent) {
    return text.map(function (character) {
        var span = document.createElement('span');
        span.innerText = character;
        parent.appendChild(span);
        return span;
    });
};
// Wrap each group into a span
var createSpansForGroups = function (baseGroups, parent) {
    return baseGroups.map(function (group) {
        var span = document.createElement('span');
        span.innerText = group.text.join('');
        parent.appendChild(span);
        return span;
    });
};
// Gets the total length of all groups. Sums the lengths of all groups
var calculateTotalLength = function (groups) {
    return groups
        .map(function (group) { return group.xmax - group.xmin; })
        .reduce(function (prev, curr) { return prev + curr; }, 0);
};
// Setting cursor positions inside a group
var setInternalCursorPositions = function (group, rootSpan, cursors) {
    if (group.text.length < 2) {
        // No internal cursor positions, nothing to do
        return;
    }
    // To detect cursor positions inside a group we'll need additional span
    var span = document.createElement('span');
    span.style.direction = group.direction;
    rootSpan.appendChild(span);
    if (group.direction === 'rtl') {
        putInternalPositions(group.text, span, cursors, group.startIndex, function (spanWidth) { return group.xmax - spanWidth; }, // for 'rtl' groups we calculate from the right side
        function (// for 'rtl' groups we calculate from the right side
            pos) { return Math.max(pos, group.xmin); });
    }
    else {
        putInternalPositions(group.text, span, cursors, group.startIndex, function (spanWidth) { return group.xmin + spanWidth; }, // for 'ltr' groups we calculate from the left side
        function (// for 'ltr' groups we calculate from the left side
            pos) { return Math.min(pos, group.xmax); });
    }
    rootSpan.removeChild(span);
};
// Records internal cursor positions of a group into the cursors array.
// Uses a helper span. At every step adds a new character to the helper span.
// Calls posCalculator to get the cursor position based on the span width,
// then posLimiter to adjust the calculated cursor positions to the borders of the group.
//
// To understand the function better, let's look at the simple example. Let our group is 'lwqi', starts from x = 15.
// Let 'l' is 10 pixels wide, 'w' - 14, 'q' - 12
// Let our posCalculator function just return the (span width + group.xmin), i.e. (span width + 15)
//
// Step (i)    Span content       Span width          Calculated cursor position
// -----------------------------------------------------------------------------
//    1            l                 10                       25
//    2            lw                24                       39
//    3            lwq               36                       51
//
//
// Group starts from x = 15
//
//   |   l   |     w     |   q   |  i  |
//           25          39      51          - calculated values
var putInternalPositions = function (text, span, cursors, startIndex, posCalculator, posLimiter) {
    for (var i = 1; i < text.length; ++i) {
        span.innerText = text.slice(0, i).join('');
        var rect = span.getBoundingClientRect();
        var pos = posCalculator(rect.right - rect.left);
        cursors[startIndex + i] = posLimiter(pos);
    }
};
//# sourceMappingURL=cursorPositions.js.map

/***/ }),

/***/ 1984:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContextHolder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signal__ = __webpack_require__(1954);

var ContextHolder = /** @class */ (function () {
    function ContextHolder(drawingArea) {
        var _this = this;
        this.contextLost = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.contextRestored = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.contextLostListener = function (event) {
            return _this.contextLost.emit({});
        };
        this.canvas = drawingArea.canvas;
        this.gl = ContextHolder.getContext(this.canvas);
        this.contextRestoredListener = function (event) {
            _this.contextRestored.emit(drawingArea.outputSize);
        };
        this.canvas.addEventListener('webglcontextlost', this.contextLostListener);
        this.canvas.addEventListener('webglcontextrestored', this.contextRestoredListener);
    }
    ContextHolder.prototype.unload = function () {
        this.canvas.removeEventListener('webglcontextlost', this.contextLostListener);
        this.canvas.removeEventListener('webglcontextrestored', this.contextRestoredListener);
    };
    ContextHolder.getContext = function (canvas) {
        return (canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl'));
    };
    return ContextHolder;
}());

//# sourceMappingURL=contextHolder.js.map

/***/ }),

/***/ 1985:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerFactory; });
// Active timer that starts when constructed. To stop it call unload()
var ActiveTimer = /** @class */ (function () {
    function ActiveTimer(callback, msecInterval, starter, stopper) {
        this.stopper = stopper;
        this.handle = starter(callback, msecInterval);
    }
    ActiveTimer.prototype.unload = function () {
        if (this.handle !== 0) {
            this.stopper(this.handle);
            this.handle = 0;
        }
    };
    return ActiveTimer;
}());
// Responsible for providing timers for the core.
//
// The core creates a timer with createTimer() and receives the id.
// Then it may call startTimer() and stopTimer() on the same id many times.
var TimerFactory = /** @class */ (function () {
    function TimerFactory(onTick, timerStarter, timerStopper) {
        this.onTick = onTick;
        this.timerStarter = timerStarter;
        this.timerStopper = timerStopper;
        this.lastId = 0;
        this.activeTimers = {};
    }
    TimerFactory.prototype.unload = function () {
        for (var id in this.activeTimers) {
            this.activeTimers[id].unload();
        }
    };
    TimerFactory.prototype.createTimer = function () {
        return this.lastId++;
    };
    TimerFactory.prototype.startTimer = function (id, msecInterval) {
        var _this = this;
        // If the timer with this id already running, we must stop it
        this.unloadTimer(id);
        this.activeTimers[id] = new ActiveTimer(function () {
            _this.onTick(id);
        }, msecInterval, this.timerStarter || TimerFactory.defaultStarter, this.timerStopper || TimerFactory.defaultStopper);
    };
    TimerFactory.prototype.stopTimer = function (id) {
        this.unloadTimer(id);
        delete this.activeTimers[id];
    };
    TimerFactory.prototype.unloadTimer = function (id) {
        var current = this.activeTimers[id];
        if (current) {
            current.unload();
        }
    };
    TimerFactory.defaultStarter = function (callback, msecInterval) {
        return setInterval(callback, msecInterval);
    };
    TimerFactory.defaultStopper = function (handle) {
        clearInterval(handle);
    };
    return TimerFactory;
}());

//# sourceMappingURL=timerFactory.js.map

/***/ }),

/***/ 1986:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultDrawingArea; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signal__ = __webpack_require__(1954);

var DefaultDrawingArea = /** @class */ (function () {
    function DefaultDrawingArea(canvas, size, backgroundColor) {
        this.canvas = canvas;
        this.size = size;
        this.backgroundColor = backgroundColor;
        this.resize = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.setCanvasSize();
    }
    Object.defineProperty(DefaultDrawingArea.prototype, "outputSize", {
        get: function () {
            return this.size;
        },
        enumerable: true,
        configurable: true
    });
    DefaultDrawingArea.prototype.unload = function () { };
    DefaultDrawingArea.prototype.setSize = function (size) {
        this.size = size;
        this.setCanvasSize();
        this.resize.emit(size);
    };
    DefaultDrawingArea.prototype.setCanvasSize = function () {
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
    };
    return DefaultDrawingArea;
}());

//# sourceMappingURL=drawingArea.js.map

/***/ }),

/***/ 1987:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return urlImageLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultImageProvider; });
throw new Error("Cannot find module \"@atlaskit/media-core\"");

var urlImageLoader = function (url) {
    return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        // For more details: https://webglfundamentals.org/webgl/lessons/webgl-cors-permission.html
        if (Object(__WEBPACK_IMPORTED_MODULE_0__atlaskit_media_core__["isImageRemote"])(url)) {
            img.crossOrigin = '';
        }
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject(new Error("Can't load image with url: " + url));
        };
        img.src = url;
    });
};
var DefaultImageProvider = /** @class */ (function () {
    function DefaultImageProvider(backImage, supplementaryCanvas) {
        this.backImage = backImage;
        this.supplementaryCanvas = supplementaryCanvas;
    }
    DefaultImageProvider.create = function (imageLoader, supplementaryCanvas) {
        return imageLoader().then(function (img) { return new DefaultImageProvider(img, supplementaryCanvas); });
    };
    Object.defineProperty(DefaultImageProvider.prototype, "backImageUuid", {
        get: function () {
            return 'default';
        },
        enumerable: true,
        configurable: true
    });
    DefaultImageProvider.prototype.unload = function () { };
    return DefaultImageProvider;
}());

//# sourceMappingURL=imageProvider.js.map

/***/ }),

/***/ 1988:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultMouseInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signal__ = __webpack_require__(1954);

var DefaultMouseInput = /** @class */ (function () {
    function DefaultMouseInput(inputArea, positionCalculator) {
        var _this = this;
        this.inputArea = inputArea;
        this.click = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.dragStart = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.dragMove = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.dragEnd = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.dragLost = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.mouseDownListener = function (event) {
            return _this.mouseDown(event);
        };
        this.mouseMoveListener = function (event) {
            return _this.mouseMove(event);
        };
        this.mouseUpListener = function (event) { return _this.mouseUp(event); };
        this.mouseLostListener = function () { return _this.mouseLost(); };
        this.getPosition =
            positionCalculator || (function (event) { return _this.defaultPositionCalculator(event); });
        this.isDragging = false;
        this.isCapturingInput = false;
        this.inputArea.addEventListener('mousedown', this.mouseDownListener);
    }
    DefaultMouseInput.prototype.unload = function () {
        this.inputArea.removeEventListener('mousedown', this.mouseDownListener);
        this.interruptInputIfNecessary();
    };
    DefaultMouseInput.prototype.mouseDown = function (event) {
        if (event.button === 0) {
            // We stop propagation of the event to prevent stealing focus from the hidden textarea if there is text input.
            // Otherwise we may notice strange behavior in Firefox: when you input text and click outside the text to stop input
            // the new input is started from the position where you clicked.
            // This happens because the textarea loses the focus, the text input component reports about completed input
            // and then the new click starts new text input.
            event.stopPropagation();
            event.preventDefault();
            this.isCapturingInput = true;
            this.isDragging = false;
            this.initialPosition = this.getPosition(event);
            // We subscribe to window (not inputArea) events to get mouse input even when the mouse leaves the element
            this.subscribeToWindowEvents();
        }
    };
    DefaultMouseInput.prototype.mouseMove = function (event) {
        if (this.isCapturingInput) {
            if (!this.isDragging) {
                this.dragStart.emit(this.initialPosition);
                this.isDragging = true;
            }
            this.dragMove.emit(this.getPosition(event));
        }
    };
    DefaultMouseInput.prototype.mouseUp = function (event) {
        if (event.button === 0 && this.isCapturingInput) {
            this.unsubscribeFromWindowEvents();
            this.isCapturingInput = false;
            if (this.isDragging) {
                this.dragEnd.emit(this.getPosition(event));
                this.isDragging = false;
            }
            else {
                this.click.emit(this.initialPosition);
            }
        }
    };
    DefaultMouseInput.prototype.mouseLost = function () {
        this.interruptInputIfNecessary();
    };
    DefaultMouseInput.prototype.interruptInputIfNecessary = function () {
        if (this.isCapturingInput) {
            this.unsubscribeFromWindowEvents();
            this.isCapturingInput = false;
            if (this.isDragging) {
                this.dragLost.emit({});
            }
        }
    };
    DefaultMouseInput.prototype.subscribeToWindowEvents = function () {
        window.addEventListener('mousemove', this.mouseMoveListener);
        window.addEventListener('mouseup', this.mouseUpListener);
        window.addEventListener('blur', this.mouseLostListener);
    };
    DefaultMouseInput.prototype.unsubscribeFromWindowEvents = function () {
        window.removeEventListener('mousemove', this.mouseMoveListener);
        window.removeEventListener('mouseup', this.mouseUpListener);
        window.removeEventListener('blur', this.mouseLostListener);
    };
    DefaultMouseInput.prototype.defaultPositionCalculator = function (event) {
        var rect = this.inputArea.getBoundingClientRect();
        var x = event.pageX - rect.left - window.pageXOffset;
        var y = event.pageY - rect.top - window.pageYOffset;
        return {
            x: x / rect.width,
            y: y / rect.height,
        };
    };
    return DefaultMouseInput;
}());

//# sourceMappingURL=mouseInput.js.map

/***/ }),

/***/ 1989:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultToolbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signal__ = __webpack_require__(1954);

var DefaultToolbar = /** @class */ (function () {
    function DefaultToolbar(onUpdateByCore) {
        this.onUpdateByCore = onUpdateByCore;
        this.colorChanged = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.lineWidthChanged = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.addShadowChanged = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.toolChanged = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
    }
    DefaultToolbar.prototype.unload = function () { };
    DefaultToolbar.prototype.updateByCore = function (parameters) {
        this.onUpdateByCore(parameters);
    };
    DefaultToolbar.prototype.setColor = function (color) {
        this.colorChanged.emit(color);
    };
    DefaultToolbar.prototype.setLineWidth = function (lineWidth) {
        this.lineWidthChanged.emit(lineWidth);
    };
    DefaultToolbar.prototype.setAddShadow = function (addShadow) {
        this.addShadowChanged.emit(addShadow);
    };
    DefaultToolbar.prototype.setTool = function (tool) {
        this.toolChanged.emit(tool);
    };
    return DefaultToolbar;
}());

//# sourceMappingURL=toolbar.js.map

/***/ }),

/***/ 1990:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultKeyboardInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signal__ = __webpack_require__(1954);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1955);


// Conversion of special key codes to input commands
var inputCommands = {
    27: 'complete',
    8: 'backspace',
    13: 'newline',
    46: 'delete',
    40: 'down',
    38: 'up',
    37: 'left',
    39: 'right',
};
// The default implementation of KeyboardInput interface.
// Accepts a hidden text area which will receive text input.
// The hidden text area should have 'hidden' visibility, but not 'display: none'.
var DefaultKeyboardInput = /** @class */ (function () {
    function DefaultKeyboardInput(hTextArea, supplementaryCanvas, textHelperDiv) {
        var _this = this;
        this.hTextArea = hTextArea;
        this.supplementaryCanvas = supplementaryCanvas;
        this.textHelperDiv = textHelperDiv;
        this.characterPressed = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.inputCommand = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.inputListener = function () { return _this.input(); };
        this.compositionStartListener = function () { return _this.compositionStart(); };
        this.compositionEndListener = function () { return _this.compositionEnd(); };
        this.keyUpListener = function () { return _this.keyUp(); };
        this.keyDownListener = function (event) {
            return _this.keyDown(event);
        };
        this.blurListener = function () { return _this.blur(); };
        this.isInputActive = false;
        this.isComposing = false;
        this.readCompositionResultOnKeyUp = false;
        this.subscribeToTextAreaEvents();
    }
    DefaultKeyboardInput.prototype.unload = function () {
        this.unsubscribeFromTextAreaEvents();
    };
    DefaultKeyboardInput.prototype.startInput = function () {
        // Called by the core when it is ready to accept text input
        this.isInputActive = true;
        this.hTextArea.style.visibility = 'visible';
        this.acquireFocus();
    };
    DefaultKeyboardInput.prototype.endInput = function () {
        // Called by the core when it no longer needs text input
        this.isInputActive = false;
        this.isComposing = false;
        this.readCompositionResultOnKeyUp = false;
        this.hTextArea.style.visibility = 'hidden';
    };
    DefaultKeyboardInput.prototype.subscribeToTextAreaEvents = function () {
        var hTextArea = this.hTextArea;
        hTextArea.addEventListener('input', this.inputListener);
        hTextArea.addEventListener('compositionstart', this.compositionStartListener);
        hTextArea.addEventListener('compositionend', this.compositionEndListener);
        hTextArea.addEventListener('keyup', this.keyUpListener);
        hTextArea.addEventListener('keydown', this.keyDownListener);
        hTextArea.addEventListener('blur', this.blurListener);
    };
    DefaultKeyboardInput.prototype.unsubscribeFromTextAreaEvents = function () {
        var hTextArea = this.hTextArea;
        hTextArea.removeEventListener('input', this.inputListener);
        hTextArea.removeEventListener('compositionstart', this.compositionStartListener);
        hTextArea.removeEventListener('compositionend', this.compositionEndListener);
        hTextArea.removeEventListener('keyup', this.keyUpListener);
        hTextArea.removeEventListener('keydown', this.keyDownListener);
        hTextArea.removeEventListener('blur', this.blurListener);
    };
    DefaultKeyboardInput.prototype.input = function () {
        // Composition starts when the IME panel (for Chinese, Japanese, etc.) appears.
        // In this case the input is necessary for this panel to choose the correct hieroglyph, not for us.
        // We should read characters only when there is no composition.
        if (!this.isComposing) {
            this.passText();
        }
    };
    DefaultKeyboardInput.prototype.compositionStart = function () {
        // We will get this notification when the IME panel (for Chinese, Japanese, etc.) appears.
        // At this point there is no input for us to pass to the core.
        this.isComposing = true;
        this.readCompositionResultOnKeyUp = false;
    };
    DefaultKeyboardInput.prototype.compositionEnd = function () {
        // We get this notification when the IME panel disappears
        this.isComposing = false;
        // In Safari at this point the value of the hidden text area contains the original text, not composed.
        // Thus we'll catch the updated text in keyup. For that we set readCompositionResultOnKeyUp to true.
        // All tested browsers fire keyup after compositionend.
        this.readCompositionResultOnKeyUp = true;
    };
    DefaultKeyboardInput.prototype.keyUp = function () {
        // The only purpose of listening to this event is to get the composition result
        if (this.readCompositionResultOnKeyUp) {
            this.passText();
            this.readCompositionResultOnKeyUp = false;
        }
    };
    DefaultKeyboardInput.prototype.keyDown = function (event) {
        var command = inputCommands[event.which || event.keyCode];
        if (command) {
            event.stopPropagation();
            event.preventDefault();
            this.inputCommand.emit(command);
        }
    };
    DefaultKeyboardInput.prototype.blur = function () {
        if (this.isInputActive) {
            // If our text area is blurred, we try to restore the focus.
            // If we can't do this, we inform the core that the input has been completed (this.acquireFocus() does this).
            this.acquireFocus();
        }
    };
    DefaultKeyboardInput.prototype.acquireFocus = function () {
        this.hTextArea.focus();
        // If we can't get the focus we inform the core that the input is complete.
        // The core will call endInput() automatically
        if (document.activeElement !== this.hTextArea) {
            this.inputCommand.emit('complete');
        }
    };
    DefaultKeyboardInput.prototype.passText = function () {
        var _this = this;
        var text = this.hTextArea.value;
        if (text) {
            Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* getUtf32Codes */])(text).forEach(function (code) { return _this.characterPressed.emit(code); });
            this.hTextArea.value = '';
        }
    };
    return DefaultKeyboardInput;
}());

//# sourceMappingURL=keyboardInput.js.map

/***/ }),

/***/ 1991:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultImageReceiver; });
var DefaultImageReceiver = /** @class */ (function () {
    function DefaultImageReceiver(supplementaryCanvas) {
        this.supplementaryCanvas = supplementaryCanvas;
    }
    DefaultImageReceiver.prototype.unload = function () { };
    return DefaultImageReceiver;
}());

//# sourceMappingURL=imageReceiver.js.map

/***/ }),

/***/ 1992:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultShapeDeleter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signal__ = __webpack_require__(1954);

// The default implementation of ShapeDeleter interface.
// Accepts a hidden text area that receives text input when activated.
// When "delete" or "backspace" is pressed, it emits the deleteShape signal
var DefaultShapeDeleter = /** @class */ (function () {
    function DefaultShapeDeleter(hTextArea) {
        var _this = this;
        this.hTextArea = hTextArea;
        this.deleteShape = new __WEBPACK_IMPORTED_MODULE_0__signal__["a" /* Signal */]();
        this.keyDownListener = function (event) {
            return _this.keyDown(event);
        };
        this.isDeleteEnabled = false;
        this.hTextArea.addEventListener('keydown', this.keyDownListener);
    }
    DefaultShapeDeleter.prototype.unload = function () {
        this.hTextArea.removeEventListener('keydown', this.keyDownListener);
    };
    DefaultShapeDeleter.prototype.deleteEnabled = function () {
        this.hTextArea.style.visibility = 'visible';
        this.hTextArea.focus();
        this.isDeleteEnabled = true;
    };
    DefaultShapeDeleter.prototype.deleteDisabled = function () {
        this.hTextArea.style.visibility = 'hidden';
        this.hTextArea.value = '';
        this.isDeleteEnabled = false;
    };
    DefaultShapeDeleter.prototype.keyDown = function (event) {
        if (!this.isDeleteEnabled) {
            return;
        }
        var isDeletePressed = event.key === 'Delete' || event.which === 46;
        var isBackspacePressed = event.key === 'Backspace' || event.which === 8;
        if (isDeletePressed || isBackspacePressed) {
            this.deleteShape.emit({});
        }
    };
    return DefaultShapeDeleter;
}());

//# sourceMappingURL=shapeDeleter.js.map

/***/ }),

/***/ 1993:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Toolbar */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styled__ = __webpack_require__(1956);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__toolbarButtons__ = __webpack_require__(1994);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(1955);





var red = { red: 250, green: 61, blue: 17 };
var green = { red: 65, green: 224, blue: 138 };
var yellow = { red: 249, green: 182, blue: 0 };
var blue = { red: 34, green: 98, blue: 255 };
var Toolbar = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](Toolbar, _super);
    function Toolbar(props) {
        return _super.call(this, props) || this;
    }
    Toolbar.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["l" /* ToolbarContainer */], null,
            this.createColorButton(red),
            this.createColorButton(green),
            this.createColorButton(yellow),
            this.createColorButton(blue),
            this.createLineWidthButton(8),
            this.createLineWidthButton(10),
            this.createLineWidthButton(12),
            this.createToolButton('brush'),
            this.createToolButton('arrow'),
            this.createToolButton('line'),
            this.createToolButton('text')));
    };
    Toolbar.prototype.createColorButton = function (color) {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__toolbarButtons__["a" /* ColorButton */], { color: color, selected: Object(__WEBPACK_IMPORTED_MODULE_4__util__["b" /* colorSame */])(this.props.color, color), 
            // tslint:disable-next-line:jsx-no-lambda
            onClick: function () { return _this.props.onColorChanged(color); } }));
    };
    Toolbar.prototype.createLineWidthButton = function (lineWidth) {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__toolbarButtons__["b" /* LineWidthButton */], { lineWidth: lineWidth, selected: this.props.lineWidth === lineWidth, 
            // tslint:disable-next-line:jsx-no-lambda
            onClick: function () { return _this.props.onLineWidthChanged(lineWidth); } }));
    };
    Toolbar.prototype.createToolButton = function (tool) {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__toolbarButtons__["c" /* ToolButton */], { tool: tool, selected: this.props.tool === tool, 
            // tslint:disable-next-line:jsx-no-lambda
            onClick: function () { return _this.props.onToolChanged(tool); } }));
    };
    return Toolbar;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=toolbar.js.map

/***/ }),

/***/ 1994:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LineWidthButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ToolButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styled__ = __webpack_require__(1956);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__atlaskit_icon_glyph_media_services_arrow__ = __webpack_require__(1960);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__atlaskit_icon_glyph_media_services_arrow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__atlaskit_icon_glyph_media_services_arrow__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__atlaskit_icon_glyph_media_services_brush__ = __webpack_require__(1961);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__atlaskit_icon_glyph_media_services_brush___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__atlaskit_icon_glyph_media_services_brush__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__atlaskit_icon_glyph_media_services_line__ = __webpack_require__(1962);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__atlaskit_icon_glyph_media_services_line___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__atlaskit_icon_glyph_media_services_line__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__atlaskit_icon_glyph_media_services_text__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__atlaskit_icon_glyph_media_services_text___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__atlaskit_icon_glyph_media_services_text__);







var ColorButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ColorButton, _super);
    function ColorButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorButton.prototype.render = function () {
        var _a = this.props.color, red = _a.red, green = _a.green, blue = _a.blue;
        var buttonColor = "rgb(" + red + ", " + green + ", " + blue + ")";
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["k" /* ToolbarButton */], { selected: this.props.selected, onClick: this.props.onClick },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["a" /* ColorSquare */], { color: buttonColor })));
    };
    return ColorButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

var LineWidthButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](LineWidthButton, _super);
    function LineWidthButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthButton.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["k" /* ToolbarButton */], { selected: this.props.selected, onClick: this.props.onClick },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["f" /* LineWidthBackCircle */], null,
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["g" /* LineWidthFrontCircle */], { width: this.props.lineWidth }))));
    };
    return LineWidthButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

var ToolButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ToolButton, _super);
    function ToolButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolButton.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["k" /* ToolbarButton */], { selected: this.props.selected, onClick: this.props.onClick },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__styled__["j" /* ToolIcon */], null, this.createIcon())));
    };
    ToolButton.prototype.createIcon = function () {
        var tool = this.props.tool;
        var size = 'medium';
        switch (tool) {
            case 'arrow':
                return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__atlaskit_icon_glyph_media_services_arrow___default.a, { label: tool, size: size });
            case 'line':
                return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__atlaskit_icon_glyph_media_services_line___default.a, { label: tool, size: size });
            case 'brush':
                return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__atlaskit_icon_glyph_media_services_brush___default.a, { label: tool, size: size });
            case 'text':
                return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__atlaskit_icon_glyph_media_services_text___default.a, { label: tool, size: size });
            default:
                return null;
        }
    };
    return ToolButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=toolbarButtons.js.map

/***/ }),

/***/ 1995:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tools; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toolbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buttons_lineWidthButton__ = __webpack_require__(1996);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buttons_colorButton__ = __webpack_require__(1999);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buttons_toolButton__ = __webpack_require__(2000);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__popups_lineWidthPopup__ = __webpack_require__(2004);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__popups_colorPopup__ = __webpack_require__(2007);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles__ = __webpack_require__(2010);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__phrases__ = __webpack_require__(256);










var tools = [
    'arrow',
    'rectangle',
    'oval',
    'line',
    'text',
    'blur',
    'brush',
];
var Toolbar = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](Toolbar, _super);
    function Toolbar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { popup: 'none' };
        return _this;
    }
    Toolbar.prototype.render = function () {
        var _this = this;
        var color = this.props.color;
        var onColorButtonClick = function () { return _this.showOrHidePopup('color'); };
        var onLineWidthButtonClick = function () { return _this.showOrHidePopup('lineWidth'); };
        var isColorButtonActive = this.state.popup === 'color';
        var isLineWidthButtonActive = this.state.popup === 'lineWidth';
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__styles__["d" /* ToolbarContainer */], null,
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__styles__["a" /* CenterButtons */], null,
                this.renderToolButtons(),
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__buttons_lineWidthButton__["a" /* LineWidthButton */], { isActive: isLineWidthButtonActive, onClick: onLineWidthButtonClick }),
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__buttons_colorButton__["a" /* ColorButton */], { color: color, isActive: isColorButtonActive, onClick: onColorButtonClick })),
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__styles__["c" /* RightButtons */], null,
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__styles__["b" /* RightButton */], { appearance: "primary", theme: "dark", onClick: this.props.onSave }, __WEBPACK_IMPORTED_MODULE_8__phrases__["b" /* buttonSave */]),
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__styles__["b" /* RightButton */], { appearance: "subtle", onClick: this.props.onCancel, theme: "dark" }, __WEBPACK_IMPORTED_MODULE_8__phrases__["a" /* buttonCancel */])),
            this.renderPopup()));
    };
    Toolbar.prototype.renderToolButtons = function () {
        var _a = this.props, activeTool = _a.tool, onToolChanged = _a.onToolChanged;
        var onToolClick = function (tool) { return onToolChanged(tool); };
        return tools.map(function (tool) { return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__buttons_toolButton__["a" /* ToolButton */], { key: tool, tool: tool, activeTool: activeTool, onToolClick: onToolClick })); });
    };
    Toolbar.prototype.showOrHidePopup = function (target) {
        if (this.state.popup === target) {
            this.setState({ popup: 'none' });
        }
        else {
            this.setState({ popup: target });
        }
    };
    Toolbar.prototype.renderPopup = function () {
        var _this = this;
        var _a = this.props, color = _a.color, lineWidth = _a.lineWidth, onColorChanged = _a.onColorChanged, onLineWidthChanged = _a.onLineWidthChanged;
        var popup = this.state.popup;
        if (popup === 'color') {
            var onPickColor = function (color) {
                onColorChanged(color);
                _this.setState({ popup: 'none' });
            };
            return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6__popups_colorPopup__["a" /* ColorPopup */], { onPickColor: onPickColor, color: color });
        }
        if (popup === 'lineWidth') {
            var onLineWidthClick = function (lineWidth) {
                onLineWidthChanged(lineWidth);
                _this.setState({ popup: 'none' });
            };
            return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__popups_lineWidthPopup__["a" /* LineWidthPopup */], { onLineWidthClick: onLineWidthClick, lineWidth: lineWidth }));
        }
        return null;
    };
    return Toolbar;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=toolbar.js.map

/***/ }),

/***/ 1996:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineWidthButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_line_thickness__ = __webpack_require__(1997);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_line_thickness___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_line_thickness__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__genericButton__ = __webpack_require__(1958);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__optionsIcon__ = __webpack_require__(1963);






var LineWidthButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](LineWidthButton, _super);
    function LineWidthButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthButton.prototype.render = function () {
        var _a = this.props, isActive = _a.isActive, onClick = _a.onClick;
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__genericButton__["a" /* GenericButton */], { isActive: isActive, onClick: onClick },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_line_thickness___default.a, { label: "line width" }),
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__optionsIcon__["a" /* OptionsIcon */], { isActive: isActive })));
    };
    return LineWidthButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=lineWidthButton.js.map

/***/ }),

/***/ 1997:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaServicesLineThicknessIcon = function MediaServicesLineThicknessIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M4 4.495C4 4.222 4.226 4 4.496 4h15.008c.274 0 .496.216.496.495v2.01a.498.498 0 0 1-.496.495H4.496A.492.492 0 0 1 4 6.505v-2.01zm0 8.01c0-.279.226-.505.496-.505h15.008c.274 0 .496.214.496.505v.99a.503.503 0 0 1-.496.505H4.496A.493.493 0 0 1 4 13.495v-.99zm0 6.747c0-.139.102-.252.251-.252H19.75c.138 0 .251.107.251.252v.496a.245.245 0 0 1-.251.252H4.25a.248.248 0 0 1-.25-.252v-.496z" fill="currentColor"/></svg>' }, props));
};
exports.default = MediaServicesLineThicknessIcon;

/***/ }),

/***/ 1998:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaServicesButtonOptionIcon = function MediaServicesButtonOptionIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M13.29 10.234l-3.059 3.059c-.391.392-.264.71.285.71h2.988a.492.492 0 0 0 .496-.497v-2.988c0-.334-.118-.509-.299-.509-.116 0-.259.072-.411.225z" fill="currentColor" fill-rule="evenodd"/></svg>' }, props));
};
exports.default = MediaServicesButtonOptionIcon;

/***/ }),

/***/ 1999:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__genericButton__ = __webpack_require__(1958);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__optionsIcon__ = __webpack_require__(1963);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__styles__ = __webpack_require__(1959);






var ColorButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ColorButton, _super);
    function ColorButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorButton.prototype.render = function () {
        var _a = this.props, color = _a.color, isActive = _a.isActive, onClick = _a.onClick;
        var red = color.red, green = color.green, blue = color.blue;
        var style = { backgroundColor: "rgb(" + red + ", " + green + ", " + blue + ")" };
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__genericButton__["a" /* GenericButton */], { isActive: isActive, onClick: onClick },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__styles__["d" /* ColorSample */], { style: style }),
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__optionsIcon__["a" /* OptionsIcon */], { isActive: isActive })));
    };
    return ColorButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=colorButton.js.map

/***/ }),

/***/ 2000:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_arrow__ = __webpack_require__(1960);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_arrow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_arrow__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__atlaskit_icon_glyph_media_services_brush__ = __webpack_require__(1961);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__atlaskit_icon_glyph_media_services_brush___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__atlaskit_icon_glyph_media_services_brush__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__atlaskit_icon_glyph_media_services_line__ = __webpack_require__(1962);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__atlaskit_icon_glyph_media_services_line___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__atlaskit_icon_glyph_media_services_line__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__atlaskit_icon_glyph_media_services_blur__ = __webpack_require__(2001);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__atlaskit_icon_glyph_media_services_blur___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__atlaskit_icon_glyph_media_services_blur__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__atlaskit_icon_glyph_media_services_oval__ = __webpack_require__(2002);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__atlaskit_icon_glyph_media_services_oval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__atlaskit_icon_glyph_media_services_oval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__atlaskit_icon_glyph_media_services_rectangle__ = __webpack_require__(2003);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__atlaskit_icon_glyph_media_services_rectangle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__atlaskit_icon_glyph_media_services_rectangle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__atlaskit_icon_glyph_media_services_text__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__atlaskit_icon_glyph_media_services_text___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__atlaskit_icon_glyph_media_services_text__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__genericButton__ = __webpack_require__(1958);











var toolIcons = {
    line: __WEBPACK_IMPORTED_MODULE_4__atlaskit_icon_glyph_media_services_line___default.a,
    blur: __WEBPACK_IMPORTED_MODULE_5__atlaskit_icon_glyph_media_services_blur___default.a,
    arrow: __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_media_services_arrow___default.a,
    brush: __WEBPACK_IMPORTED_MODULE_3__atlaskit_icon_glyph_media_services_brush___default.a,
    oval: __WEBPACK_IMPORTED_MODULE_6__atlaskit_icon_glyph_media_services_oval___default.a,
    rectangle: __WEBPACK_IMPORTED_MODULE_7__atlaskit_icon_glyph_media_services_rectangle___default.a,
    text: __WEBPACK_IMPORTED_MODULE_8__atlaskit_icon_glyph_media_services_text___default.a,
};
var ToolButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ToolButton, _super);
    function ToolButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolButton.prototype.render = function () {
        var _a = this.props, tool = _a.tool, activeTool = _a.activeTool, onToolClick = _a.onToolClick;
        var Icon = toolIcons[tool]; // tslint:disable-line:variable-name
        var isActive = tool === activeTool;
        var onClick = function () {
            onToolClick(tool);
        };
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_9__genericButton__["a" /* GenericButton */], { isActive: isActive, onClick: onClick },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](Icon, { label: tool, size: "medium" })));
    };
    return ToolButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=toolButton.js.map

/***/ }),

/***/ 2001:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaServicesBlurIcon = function MediaServicesBlurIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor"><path d="M4.889 4H12v8H4V4.889C4 4.398 4.398 4 4.889 4z"/><path d="M4 12h8v8H4.889A.889.889 0 0 1 4 19.111V12z" opacity=".4"/><path d="M12 4h7.111c.491 0 .889.398.889.889V12h-8V4z" opacity=".55"/><path d="M12 12h8v7.111a.889.889 0 0 1-.889.889H12v-8z" opacity=".75"/></g></svg>' }, props));
};
exports.default = MediaServicesBlurIcon;

/***/ }),

/***/ 2002:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaServicesOvalIcon = function MediaServicesOvalIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M12 20c-4.943 0-9-3.55-9-8s4.057-8 9-8 9 3.55 9 8-4.057 8-9 8zm0-2c3.893 0 7-2.718 7-6s-3.107-6-7-6-7 2.718-7 6 3.107 6 7 6z" fill="currentColor"/></svg>' }, props));
};
exports.default = MediaServicesOvalIcon;

/***/ }),

/***/ 2003:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaServicesRectangleIcon = function MediaServicesRectangleIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M5 6v12h14V6H5zm0-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="currentColor"/></svg>' }, props));
};
exports.default = MediaServicesRectangleIcon;

/***/ }),

/***/ 2004:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineWidthPopup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popupStyles__ = __webpack_require__(1964);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lineWidthButton__ = __webpack_require__(2005);





var LineWidthPopup = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](LineWidthPopup, _super);
    function LineWidthPopup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthPopup.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__popupStyles__["b" /* LineWidthPopupContainer */], null, this.buttons());
    };
    LineWidthPopup.prototype.buttons = function () {
        var _a = this.props, onLineWidthClick = _a.onLineWidthClick, currentLineWidth = _a.lineWidth;
        var lineWidths = [4, 6, 8, 10, 12];
        return lineWidths.map(function (lineWidth) { return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__lineWidthButton__["a" /* LineWidthButton */], { key: "" + lineWidth, lineWidth: lineWidth, currentLineWidth: currentLineWidth, onLineWidthClick: onLineWidthClick })); });
    };
    return LineWidthPopup;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=lineWidthPopup.js.map

/***/ }),

/***/ 2005:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineWidthButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lineWidthButtonStyles__ = __webpack_require__(2006);




var LineWidthButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](LineWidthButton, _super);
    function LineWidthButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthButton.prototype.render = function () {
        var _a = this.props, lineWidth = _a.lineWidth, currentLineWidth = _a.currentLineWidth, onLineWidthClick = _a.onLineWidthClick;
        var onClick = function () { return onLineWidthClick(lineWidth); };
        var isSelected = lineWidth === currentLineWidth;
        var BackArea = isSelected ? __WEBPACK_IMPORTED_MODULE_2__lineWidthButtonStyles__["b" /* BackAreaSelected */] : __WEBPACK_IMPORTED_MODULE_2__lineWidthButtonStyles__["a" /* BackAreaNormal */]; // tslint:disable-line:variable-name
        var FrontArea = isSelected ? __WEBPACK_IMPORTED_MODULE_2__lineWidthButtonStyles__["e" /* FrontAreaSelected */] : __WEBPACK_IMPORTED_MODULE_2__lineWidthButtonStyles__["d" /* FrontAreaNormal */]; // tslint:disable-line:variable-name
        var style = {
            width: lineWidth * 2 + "px",
            height: lineWidth * 2 + "px",
            borderRadius: lineWidth + "px",
        };
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__lineWidthButtonStyles__["c" /* Container */], { onClick: onClick },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__lineWidthButtonStyles__["f" /* HoverArea */], null,
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__lineWidthButtonStyles__["g" /* MainArea */], null,
                    __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](BackArea, null,
                        __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](FrontArea, { style: style }))))));
    };
    return LineWidthButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=lineWidthButton.js.map

/***/ }),

/***/ 2006:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return HoverArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return MainArea; });
/* unused harmony export BackAreaBase */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackAreaNormal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BackAreaSelected; });
/* unused harmony export FrontAreaBase */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FrontAreaNormal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FrontAreaSelected; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__);
// tslint:disable:variable-name



var Container = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_1 || (templateObject_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: relative;\n  width: 32px;\n  height: 32px;\n"], ["\n  position: relative;\n  width: 32px;\n  height: 32px;\n"])));
var HoverArea = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_2 || (templateObject_2 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  margin: 1px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  margin: 1px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN50"]);
var MainArea = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_3 || (templateObject_3 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  border-radius: 13px;\n  margin: 2px;\n  background-color: ", ";\n"], ["\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  border-radius: 13px;\n  margin: 2px;\n  background-color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN0"]);
var BackAreaBase = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_4 || (templateObject_4 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  width: 24px;\n  height: 24px;\n  border-radius: 12px;\n  margin: 1px;\n"], ["\n  position: absolute;\n  width: 24px;\n  height: 24px;\n  border-radius: 12px;\n  margin: 1px;\n"])));
var BackAreaNormal = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(BackAreaBase)(templateObject_5 || (templateObject_5 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN30"]);
var BackAreaSelected = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(BackAreaBase)(templateObject_6 || (templateObject_6 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorB50"]);
var FrontAreaBase = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_7 || (templateObject_7 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"], ["\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"])));
var FrontAreaNormal = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(FrontAreaBase)(templateObject_8 || (templateObject_8 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN500"]);
var FrontAreaSelected = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(FrontAreaBase)(templateObject_9 || (templateObject_9 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorB400"]);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=lineWidthButtonStyles.js.map

/***/ }),

/***/ 2007:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorPopup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__colorButton__ = __webpack_require__(2008);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popupStyles__ = __webpack_require__(1964);





var colors = [
    { red: 0x17, green: 0x2b, blue: 0x4d },
    { red: 0x00, green: 0x49, blue: 0xb0 },
    { red: 0x00, green: 0x66, blue: 0x44 },
    { red: 0xff, green: 0x8b, blue: 0x00 },
    { red: 0xbf, green: 0x26, blue: 0x00 },
    { red: 0x40, green: 0x32, blue: 0x94 },
    { red: 0x97, green: 0xa0, blue: 0xaf },
    { red: 0x26, green: 0x84, blue: 0xff },
    { red: 0x57, green: 0xd9, blue: 0xa3 },
    { red: 0xff, green: 0xe3, blue: 0x80 },
    { red: 0xff, green: 0x8f, blue: 0x73 },
    { red: 0x87, green: 0x77, blue: 0xd9 },
];
var ColorPopup = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ColorPopup, _super);
    function ColorPopup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorPopup.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__popupStyles__["a" /* ColorPopupContainer */], null, this.renderButtons());
    };
    ColorPopup.prototype.renderButtons = function () {
        var _a = this.props, onPickColor = _a.onPickColor, currentColor = _a.color;
        return colors.map(function (color, index) { return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__colorButton__["a" /* ColorButton */], { key: "" + index, color: color, currentColor: currentColor, onClick: onPickColor })); });
    };
    return ColorPopup;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=colorPopup.js.map

/***/ }),

/***/ 2008:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_check__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_check__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__colorButtonStyles__ = __webpack_require__(2009);





var ColorButton = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["__extends"](ColorButton, _super);
    function ColorButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorButton.prototype.render = function () {
        var _a = this.props, color = _a.color, onColorClick = _a.onClick;
        var red = color.red, green = color.green, blue = color.blue;
        var onClick = function () { return onColorClick(color); };
        var style = {
            backgroundColor: "rgb(" + red + ", " + green + ", " + blue + ")",
        };
        return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__colorButtonStyles__["c" /* Container */], { onClick: onClick },
            __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__colorButtonStyles__["d" /* HoverArea */], null,
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__colorButtonStyles__["e" /* MainArea */], null,
                    __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__colorButtonStyles__["b" /* ColorSample */], { style: style }, this.checkMark())))));
    };
    ColorButton.prototype.checkMark = function () {
        var _a = this.props, color = _a.color, currentColor = _a.currentColor;
        if (color.red === currentColor.red &&
            color.green === currentColor.green &&
            color.blue === currentColor.blue) {
            return (__WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__colorButtonStyles__["a" /* CheckArea */], null,
                __WEBPACK_IMPORTED_MODULE_1_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__atlaskit_icon_glyph_check___default.a, { label: "check", size: "medium" })));
        }
        return null;
    };
    return ColorButton;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]));

//# sourceMappingURL=colorButton.js.map

/***/ }),

/***/ 2009:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HoverArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MainArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ColorSample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckArea; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__);
// tslint:disable:variable-name



var Container = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_1 || (templateObject_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: relative;\n  width: 32px;\n  height: 32px;\n"], ["\n  position: relative;\n  width: 32px;\n  height: 32px;\n"])));
var HoverArea = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_2 || (templateObject_2 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  margin: 1px;\n  border-radius: 4px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  position: absolute;\n  width: 30px;\n  height: 30px;\n  margin: 1px;\n  border-radius: 4px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN50"]);
var MainArea = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_3 || (templateObject_3 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  margin: 2px;\n  border-radius: 2px;\n  background-color: ", ";\n"], ["\n  position: absolute;\n  width: 26px;\n  height: 26px;\n  margin: 2px;\n  border-radius: 2px;\n  background-color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN0"]);
var ColorSample = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_4 || (templateObject_4 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  width: 24px;\n  height: 24px;\n  margin: 1px;\n  border-radius: 2px;\n"], ["\n  position: absolute;\n  width: 24px;\n  height: 24px;\n  margin: 1px;\n  border-radius: 2px;\n"])));
var CheckArea = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_5 || (templateObject_5 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  color: ", ";\n"], ["\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  color: ", ";\n"])), __WEBPACK_IMPORTED_MODULE_2__atlaskit_util_shared_styles__["akColorN0"]);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=colorButtonStyles.js.map

/***/ }),

/***/ 2010:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ToolbarContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CenterButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RightButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RightButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_components__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__atlaskit_button__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__atlaskit_util_shared_styles__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__atlaskit_util_shared_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__atlaskit_util_shared_styles__);
// tslint:disable:variable-name




var transparent = 'rgba(0, 0, 0, 0)';
var ToolbarContainer = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_1 || (templateObject_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n  position: absolute;\n  pointer-events: none;\n  width: 100%;\n  bottom: 0;\n  height: 64px;\n  background: linear-gradient(to top, ", ", ", ");\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n  position: absolute;\n  pointer-events: none;\n  width: 100%;\n  bottom: 0;\n  height: 64px;\n  background: linear-gradient(to top, ", ", ", ");\n"])), __WEBPACK_IMPORTED_MODULE_3__atlaskit_util_shared_styles__["akColorN700A"], transparent);
var CenterButtons = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_2 || (templateObject_2 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  pointer-events: auto;\n  height: 48px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"], ["\n  pointer-events: auto;\n  height: 48px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"])));
var RightButtons = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_3 || (templateObject_3 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: absolute;\n  pointer-events: auto;\n  right: 16px;\n  height: 48px;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  position: absolute;\n  pointer-events: auto;\n  right: 16px;\n  height: 48px;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var RightButton = Object(__WEBPACK_IMPORTED_MODULE_1_styled_components__["default"])(__WEBPACK_IMPORTED_MODULE_2__atlaskit_button__["default"])(templateObject_4 || (templateObject_4 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  margin-left: 4px;\n"], ["\n  margin-left: 4px;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=styles.js.map

/***/ }),

/***/ 2011:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_components__ = __webpack_require__(2);


var EditorContainer = __WEBPACK_IMPORTED_MODULE_1_styled_components__["default"].div(templateObject_1 || (templateObject_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["__makeTemplateObject"](["\n  position: relative;\n  width: 100%;\n  height: 100%;\n"], ["\n  position: relative;\n  width: 100%;\n  height: 100%;\n"])));
var templateObject_1;
//# sourceMappingURL=styles.js.map

/***/ })

});