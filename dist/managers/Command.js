"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(options) {
        var _a, _b;
        Object.assign(this, options);
        this.name = options.name;
        this.category = options.category;
        this.usage = (_a = options.usage) !== null && _a !== void 0 ? _a : options.name;
        this.description = options.description;
        this.default_member_permissions = (_b = options.default_member_permissions) === null || _b === void 0 ? void 0 : _b.toString();
        this.execute = options.execute;
    }
}
exports.Command = Command;
