"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivilWar = void 0;
class CivilWar {
    constructor() {
        this.teams = [[], []];
    }
    setTeam(members) {
        for (let i = 0; i < members.length; i += 2) {
            this.teams[0].push(members[i]);
            members[i + 1] ? this.teams[1].push(members[i + 1]) : null;
        }
    }
    setChannel(channel) {
        this.channel = channel;
    }
    clear() {
        this.teams = [[], []];
    }
    isEmpty() {
        return this.teams[0].length < 1 && this.teams[1].length < 1;
    }
}
exports.CivilWar = CivilWar;
