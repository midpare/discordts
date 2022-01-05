"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const mainCommandFiles = yield globPromise(`${__dirname}/../commands/mainCommands/**/*{.ts,.js}`);
    mainCommandFiles.forEach((value) => __awaiter(void 0, void 0, void 0, function* () {
        const file = (yield Promise.resolve().then(() => __importStar(require(value)))).default;
        if (client.mainCommands.get(file.name))
            throw `command name duplicate! command path: ${value}, command name: ${file.name}`;
        try {
            client.mainCommands.set(file.name, file);
            if (file.aliases) {
                file.aliases.forEach((element) => {
                    if (client.mainAliases.get(element))
                        throw `command name duplicate! command path: ${value}, command aliases: ${element}`;
                    client.mainAliases.set(element, file);
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }));
    const subCommandFiles = yield globPromise(`${__dirname}/../commands/subCommands/**/*{.ts,.js}`);
    subCommandFiles.forEach((value) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const file = (yield Promise.resolve().then(() => __importStar(require(value)))).default;
        const commands = new Map();
        const aliases = new Map();
        if (!file.category)
            throw `there is no category in subCommands command path: ${value}`;
        commands.set(file.name, file);
        try {
            if (client.subCommands.get(file.category)) {
                if ((_a = client.subCommands.get(file.category)) === null || _a === void 0 ? void 0 : _a.get(file.name))
                    throw `subcommand name duplicate! subcommand path: ${value}, subcommand category: ${file.category}, subcommand name: ${file.name}`;
                (_b = client.subCommands.get(file.category)) === null || _b === void 0 ? void 0 : _b.set(file.name, file);
            }
            else {
                client.subCommands.set(file.category, commands);
            }
            if (file.aliases) {
                file.aliases.forEach((element) => {
                    var _a, _b;
                    aliases.set(element, file);
                    if (client.subAliases.get(file.category)) {
                        if ((_a = client.subCommands.get(file.category)) === null || _a === void 0 ? void 0 : _a.get(element))
                            throw `subcommand name duplicate! subcommand path: ${value}, subcommand cateogory: ${file.category}, subcommand name: ${element}`;
                        (_b = client.subAliases.get(file.category)) === null || _b === void 0 ? void 0 : _b.set(element, file);
                    }
                    else {
                        client.subAliases.set(file.category, aliases);
                    }
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }));
});
