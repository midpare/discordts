"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rules = void 0;
class Rules {
    constructor() {
        this.기본 = [
            '타인의 닉네임과 비슷한 닉네임으로 혼동을 주는 행위 금지'
        ];
        this.채팅 = [
            '채널 유형에 맞지 않는 채팅 금지',
            '심한 욕설과 성드립, 패드립 금지',
            '도배 금지'
        ];
        this.음성 = [
            '고의로 다른 사람들이 불쾌해할 수도 있는 소리 금지\n예) 바람 소리, 신음 소리 등'
        ];
        this.관리자 = [
            '처벌 시 처벌 내용 반드시 작성',
            '권력 남용시 처벌'
        ];
    }
}
exports.Rules = Rules;
