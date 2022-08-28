"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../managers/Command");
const Utils_1 = require("../structures/Utils");
function default_1(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const CommandsFiles = new Array();
        Utils_1.Utils.getPath(CommandsFiles, __dirname + '/../commands');
        //Wait for bot to login
        client.on('ready', () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            let commands = new Array();
            for (const path of CommandsFiles) {
                const file = (yield Promise.resolve().then(() => __importStar(require(path)))).default;
                if (!(file instanceof Command_1.Command))
                    continue;
                const { aliases, category, usage, execute } = file, command = __rest(file, ["aliases", "category", "usage", "execute"]);
                client.commands.set(file.name, file);
                commands.push(command);
            }
            const rest = new discord_js_1.REST().setToken((_a = client.token) !== null && _a !== void 0 ? _a : '');
            rest.put(discord_js_1.Routes.applicationCommands((_c = (_b = client.user) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : ''), { body: commands })
                .then(commands => {
                if (commands instanceof Array)
                    console.log(`Successfully set up ${commands.length} commands!`);
            })
                .catch(console.error);
        }));
    });
}
exports.default = default_1;
