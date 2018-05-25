webpackJsonp([1],{

/***/ 1953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_media_common__ = __webpack_require__(195);



var PickerFacade = /** @class */ (function () {
    function PickerFacade(pickerType, config, pickerConfig) {
        var _this = this;
        this.onStartListeners = [];
        this.onDragListeners = [];
        this.handleUploadsStart = function (event) {
            var files = event.files;
            var states = files.map(function (file) {
                var state = _this.stateManager.newState(file, 'uploading');
                _this.stateManager.updateState(state.id, state);
                return state;
            });
            _this.onStartListeners.forEach(function (cb) { return cb.call(cb, states); });
        };
        this.handleUploadStatusUpdate = function (event) {
            var file = event.file, progress = event.progress;
            var tempId = _this.generateTempId(file.id);
            var currentState = _this.stateManager.getState(tempId);
            var currentStatus = (currentState && currentState.status) || 'unknown';
            _this.stateManager.updateState(tempId, {
                status: currentStatus === 'unknown' || currentStatus === 'preview'
                    ? 'uploading'
                    : currentStatus,
                progress: progress && progress.portion,
            });
        };
        this.handleUploadProcessing = function (event) {
            var file = event.file;
            var tempId = _this.generateTempId(file.id);
            _this.stateManager.updateState(tempId, {
                status: 'processing',
                publicId: file.publicId,
            });
        };
        this.handleUploadError = function (_a) {
            var error = _a.error;
            if (!error || !error.fileId) {
                var err = new Error("Media: unknown upload-error received from Media Picker: " + (error &&
                    error.name));
                _this.errorReporter.captureException(err);
                return;
            }
            var tempId = _this.generateTempId(error.fileId);
            _this.stateManager.updateState(tempId, {
                id: tempId,
                status: 'error',
                error: error && { description: error.description, name: error.name },
            });
        };
        this.handleUploadEnd = function (event) {
            var file = event.file;
            var tempId = _this.generateTempId(file.id);
            _this.stateManager.updateState(tempId, {
                progress: 1,
                ready: true,
                status: 'ready',
                publicId: file.publicId,
            });
        };
        this.handleUploadPreviewUpdate = function (event) {
            var file = event.file, preview = event.preview;
            var tempId = _this.generateTempId(file.id);
            var updatedState = {
                status: 'preview',
                thumbnail: preview,
                preview: true,
            };
            // Add timestamp to image file names on paste @see ED-3584
            if (_this.pickerType === 'clipboard' && Object(__WEBPACK_IMPORTED_MODULE_1__utils__["t" /* isImage */])(file.type)) {
                updatedState.fileName = Object(__WEBPACK_IMPORTED_MODULE_2__utils_media_common__["a" /* appendTimestamp */])(file.name, file.creationDate);
            }
            _this.stateManager.updateState(tempId, updatedState);
        };
        this.handleDragEnter = function () {
            _this.onDragListeners.forEach(function (cb) { return cb.call(cb, 'enter'); });
        };
        this.handleDragLeave = function () {
            _this.onDragListeners.forEach(function (cb) { return cb.call(cb, 'leave'); });
        };
        this.pickerType = pickerType;
        this.errorReporter = config.errorReporter;
        this.stateManager = config.stateManager;
        var picker;
        if (pickerType === 'customMediaPicker') {
            picker = this.picker = pickerConfig;
        }
        else {
            picker = this.picker = Object(__WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["e" /* MediaPicker */])(pickerType, config.context, pickerConfig);
        }
        picker.on('uploads-start', this.handleUploadsStart);
        picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
        picker.on('upload-processing', this.handleUploadProcessing);
        picker.on('upload-status-update', this.handleUploadStatusUpdate);
        picker.on('upload-error', this.handleUploadError);
        picker.on('upload-end', this.handleUploadEnd);
        if (picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["d" /* Dropzone */]) {
            picker.on('drag-enter', this.handleDragEnter);
            picker.on('drag-leave', this.handleDragLeave);
        }
        if (picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["d" /* Dropzone */] || picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["c" /* Clipboard */]) {
            picker.activate();
        }
    }
    Object.defineProperty(PickerFacade.prototype, "type", {
        get: function () {
            return this.pickerType;
        },
        enumerable: true,
        configurable: true
    });
    PickerFacade.prototype.destroy = function () {
        var picker = this.picker;
        if (!picker) {
            return;
        }
        picker.removeAllListeners('uploads-start');
        picker.removeAllListeners('upload-preview-update');
        picker.removeAllListeners('upload-status-update');
        picker.removeAllListeners('upload-processing');
        picker.removeAllListeners('upload-error');
        picker.removeAllListeners('upload-end');
        if (picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["d" /* Dropzone */]) {
            picker.removeAllListeners('drag-enter');
            picker.removeAllListeners('drag-leave');
        }
        this.onStartListeners = [];
        this.onDragListeners = [];
        try {
            if (picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["d" /* Dropzone */] || picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["c" /* Clipboard */]) {
                picker.deactivate();
            }
            if (picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["f" /* Popup */] || picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["b" /* Browser */]) {
                picker.teardown();
            }
        }
        catch (ex) {
            this.errorReporter.captureException(ex);
        }
    };
    PickerFacade.prototype.setUploadParams = function (params) {
        this.picker.setUploadParams(params);
    };
    PickerFacade.prototype.onClose = function (cb) {
        var picker = this.picker;
        if (picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["f" /* Popup */]) {
            picker.on('closed', cb);
            return function () { return picker.off('closed', cb); };
        }
        return function () { };
    };
    PickerFacade.prototype.activate = function () {
        var picker = this.picker;
        if (picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["d" /* Dropzone */] || picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["c" /* Clipboard */]) {
            picker.activate();
        }
    };
    PickerFacade.prototype.deactivate = function () {
        var picker = this.picker;
        if (picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["d" /* Dropzone */] || picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["c" /* Clipboard */]) {
            picker.deactivate();
        }
    };
    PickerFacade.prototype.show = function () {
        if (this.picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["f" /* Popup */]) {
            try {
                this.picker.show();
            }
            catch (ex) {
                this.errorReporter.captureException(ex);
            }
        }
        else if (this.picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["b" /* Browser */]) {
            this.picker.browse();
        }
    };
    PickerFacade.prototype.hide = function () {
        if (this.picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["f" /* Popup */]) {
            this.picker.hide();
        }
    };
    PickerFacade.prototype.cancel = function (tempId) {
        if (this.picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["f" /* Popup */]) {
            var state = this.stateManager.getState(tempId);
            if (!state || state.status === 'cancelled') {
                return;
            }
            try {
                this.picker.cancel(tempId);
            }
            catch (e) {
                // We're deliberately consuming a known Media Picker exception, as it seems that
                // the picker has problems cancelling uploads before the popup picker has been shown
                // TODO: remove after fixing https://jira.atlassian.com/browse/FIL-4161
                if (!/((popupIframe|cancelUpload).*?undefined)|(undefined.*?(popupIframe|cancelUpload))/.test("" + e)) {
                    throw e;
                }
            }
            this.stateManager.updateState(tempId, {
                id: tempId,
                status: 'cancelled',
            });
        }
    };
    PickerFacade.prototype.upload = function (url, fileName) {
        if (this.picker instanceof __WEBPACK_IMPORTED_MODULE_0__atlaskit_media_picker__["a" /* BinaryUploader */]) {
            this.picker.upload(url, fileName);
        }
    };
    PickerFacade.prototype.onNewMedia = function (cb) {
        this.onStartListeners.push(cb);
    };
    PickerFacade.prototype.onDrag = function (cb) {
        this.onDragListeners.push(cb);
    };
    PickerFacade.prototype.generateTempId = function (id) {
        return "temporary:" + id;
    };
    return PickerFacade;
}());
/* harmony default export */ __webpack_exports__["default"] = (PickerFacade);
//# sourceMappingURL=picker-facade.js.map

/***/ })

});