"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUser = void 0;
const universal_authenticator_library_1 = require("universal-authenticator-library");
const signatureResponse = {
    wasBroadcast: true,
    transactionId: 'Mock transaction Id'
};
class MockUser extends universal_authenticator_library_1.User {
    constructor(accountName, chains) {
        super();
        this.accountName = '';
        this.chains = [];
        this.accountName = accountName;
        this.chains = chains;
    }
    getKeys() {
        return Promise.resolve([]);
    }
    signTransaction(transaction, config) {
        console.info('Requested signature config', config);
        console.info('Requested signature for', transaction);
        return Promise.resolve(signatureResponse);
    }
    getAccountName() {
        return Promise.resolve(this.accountName);
    }
    getChainId() {
        return Promise.resolve(this.chains[0].chainId);
    }
    signArbitrary(publicKey, data, helpText) {
        return new Promise((resolve, reject) => {
            reject(new universal_authenticator_library_1.UALError('Not implemented', universal_authenticator_library_1.UALErrorType.Signing, null, 'Mock User'));
        });
    }
    verifyKeyOwnership(_) {
        return new Promise((resolve) => {
            resolve(true);
        });
    }
}
exports.MockUser = MockUser;
