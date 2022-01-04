"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const glob_1 = require("glob");
const util_1 = require("util");
const ms_1 = __importDefault(require("ms"));
const globPromise = (0, util_1.promisify)(glob_1.glob);
module.exports = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const intervalFiles = yield globPromise(`${__dirname}/../interval/**/*{.ts,.js}`);
        intervalFiles.forEach((value) => {
            const file = require(value);
            try {
                if (file.immediate)
                    file.execute();
                setInterval(file.execute, (0, ms_1.default)(file.interval));
            }
            catch (error) {
                console.error(error);
            }
        });
    });
};
