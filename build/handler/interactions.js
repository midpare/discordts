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
const glob_1 = require("glob");
const util_1 = require("util");
const globPromise = (0, util_1.promisify)(glob_1.glob);
module.exports = function (client) {
    return __awaiter(this, void 0, void 0, function* () {
        const interactionFiles = yield globPromise(`${__dirname}/../interactions/**/*{.ts,.js}`);
        interactionFiles.forEach((value) => {
            const file = require(value);
            try {
                client.interactions.set(file.name, file);
            }
            catch (error) {
                console.error(error);
            }
        });
    });
};
