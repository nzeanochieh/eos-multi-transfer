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
Object.defineProperty(exports, "__esModule", { value: true });
const eosjs_1 = require("eosjs");
const ual_ledger_1 = require("ual-ledger");
const ual_plainjs_renderer_1 = require("ual-plainjs-renderer");
const ual_scatter_1 = require("ual-scatter");
const MockAuthenticator_1 = require("./MockAuthenticator");
const demo_transaction_1 = __importDefault(require("./demo-transaction"));
let loggedInUser;
const exampleNet = {
    chainId: EXAMPLE_ENV.CHAIN_ID,
    rpcEndpoints: [{
            protocol: EXAMPLE_ENV.RPC_PROTOCOL,
            host: EXAMPLE_ENV.RPC_HOST,
            port: Number(EXAMPLE_ENV.RPC_PORT),
        }]
};
let balanceUpdateInterval;
const userCallback = (users) => __awaiter(void 0, void 0, void 0, function* () {
    loggedInUser = users[0];
    console.info('User Information:');
    console.info('Account Name:', yield loggedInUser.getAccountName());
    console.info('Chain Id:', yield loggedInUser.getChainId());
    balanceUpdateInterval = setInterval(updateBalance, 1000);
    const transferDiv = document.getElementById('div-transfer');
    transferDiv.style.display = 'block';
});
const ual = new ual_plainjs_renderer_1.UALJs(userCallback, [exampleNet], 'UAL Test', [
    new ual_scatter_1.Scatter([exampleNet], { appName: 'UAL Example' }),
    new ual_ledger_1.Ledger([exampleNet]),
    new MockAuthenticator_1.MockAuthenticator([exampleNet]),
], {
    containerElement: document.getElementById('ual-div')
});
const addLogoutButtonListener = () => {
    const logoutButton = document.getElementById('btn-logout');
    logoutButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        clearInterval(balanceUpdateInterval);
        const transferDiv = document.getElementById('div-transfer');
        transferDiv.style.display = 'none';
        ual.logoutUser();
    }));
};
const updateBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    const balanceTag = document.getElementById('p-transfer');
    try {
        const rpc = new eosjs_1.JsonRpc(`${EXAMPLE_ENV.RPC_PROTOCOL}://${EXAMPLE_ENV.RPC_HOST}:${EXAMPLE_ENV.RPC_PORT}`);
        const accountName = yield loggedInUser.getAccountName();
        const data = yield rpc.get_account(accountName);
        const { core_liquid_balance: balance } = data;
        balanceTag.innerHTML = `Account Liquid Balance: ${balance}`;
    }
    catch (e) {
        console.error(e);
        balanceTag.innerHTML = 'Unable to retrieve account balance at this time';
    }
});
const addTransferButtonEventListener = () => {
    const transferButton = document.getElementById('btn-transfer');
    transferButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        // Update our demo transaction to use the logged in user
        const userAccountName = yield loggedInUser.getAccountName();
        demo_transaction_1.default.actions[0].authorization[0].actor = userAccountName;
        demo_transaction_1.default.actions[0].data.from = userAccountName;
        loggedInUser.signTransaction(demo_transaction_1.default, { broadcast: true });
    }));
};
ual.init();
addTransferButtonEventListener();
addLogoutButtonListener();
