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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAuthenticator = void 0;
const universal_authenticator_library_1 = require("universal-authenticator-library");
const MockUser_1 = require("./MockUser");
class MockAuthenticator extends universal_authenticator_library_1.Authenticator {
    constructor(chains) {
        super(chains);
        this.loading = true;
    }
    getOnboardingLink() {
        return 'https://localhost';
    }
    getStyle() {
        return {
            /* tslint:disable */
            icon: '',
            /* tslint:enable */
            textColor: 'white',
            background: 'blue',
            text: 'Mock Auths'
        };
    }
    shouldRender() {
        return true;
    }
    shouldAutoLogin() {
        return false;
    }
    login(accountName) {
        alert('Mock Login Authenticator Triggered');
        console.info('Attempted login with ', accountName);
        // Simulate login delay response
        // return new Promise<[MockUser]>((resolve) => {
        //   setTimeout(() => {
        //     resolve([new MockUser(accountName || '', this.chains)])
        //   }, 4000)
        // })
        // return Promise.reject(new UALError('it broke', UALErrorType.Login, null, 'Mock Authenticator'))
        // Login without a delay response
        return Promise.resolve([new MockUser_1.MockUser(accountName || '', this.chains)]);
    }
    shouldRequestAccountName() {
        return Promise.resolve(true);
    }
    logout() {
        console.info('Logging out');
        return Promise.resolve();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = false;
        });
    }
    isLoading() {
        return this.loading;
    }
    isErrored() {
        return false;
    }
    getError() {
        return new universal_authenticator_library_1.UALError('Initialization Error', universal_authenticator_library_1.UALErrorType.Initialization, null, 'this guy');
    }
    reset() {
        console.info('resetting mock authenticator');
    }
    requiresGetKeyConfirmation() {
        return false;
    }
    getName() {
        return 'authenticator';
    }
}
exports.MockAuthenticator = MockAuthenticator;
