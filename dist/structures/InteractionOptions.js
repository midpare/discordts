"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionOption = void 0;
class InteractionOption {
    constructor(option) {
        this.ids = option.ids;
        this.guildId = option.guildId;
        this.cmd = option.cmd;
        this.customIds = option.customIds;
        this.messages = option.messages;
        this.data = option.data;
    }
    static getNext(options, target) {
        let i;
        for (i in target) {
            let data = target[i];
            if (i == 'data') {
                let j;
                for (j in target.data) {
                    options.data[j] = target.data[j];
                }
            }
            else if (data) {
                options[i] = data;
            }
        }
        const newOptions = new InteractionOption(options);
        return newOptions;
    }
}
exports.InteractionOption = InteractionOption;
