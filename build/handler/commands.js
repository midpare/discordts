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
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const mainCommandFiles = yield globPromise(`${__dirname}/../commands/mainCommands/**/*{.ts,.js}`);
    mainCommandFiles.forEach((value) => __awaiter(void 0, void 0, void 0, function* () {
        const file = require(value);
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
            console.log(error);
        }
    }));
    const subCommandFiles = yield globPromise(`${__dirname}/../commands/subCommands/**/*{.ts,.js}`);
    subCommandFiles.forEach((value) => {
        var _a, _b;
        const file = require(value);
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
            console.log(error);
        }
    });
});
