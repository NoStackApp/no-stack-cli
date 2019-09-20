"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequired = (paramName) => {
    throw new Error(`param ${paramName} is required for this creation`);
};
