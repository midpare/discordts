"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
class SlashCommand {
    constructor(options) {
        this.name = options.name;
        this.aliases = options.aliases;
        this.description = options.description;
        this.nameLocalizations = options.nameLocalizations;
        this.descriptionLocalizations = options.descriptionLocalizations;
        this.defaultMemberPermissions = options.defaultMemberPermissions;
        this.type = options.type;
        this.options = options.options;
        this.execute = options.execute;
    }
}
exports.SlashCommand = SlashCommand;
