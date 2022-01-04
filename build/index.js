"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./contexts/client");
client_1.client.start();
setTimeout(() => {
    console.log(client_1.client);
}, 2000);
