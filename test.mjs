import 'should';
import jsdom from 'jsdom';
import { describe, it } from 'mocha';

describe('canUseDOM', function () {
    it('should return false in nodejs environment', async () => {
        const module = await import('./index.mjs');

        const canUseDOM = module.default;

        canUseDOM.should.be.false;
    });

    it('should return true in browser', async () => {
        const { JSDOM } = jsdom;
        const { window } = new JSDOM('<!doctype html><html><body></body></html>');

        global.document = window.document;
        global.window = window;

        const module = await import('./index.mjs');

        const canUseDOM = module.default;

        canUseDOM.should.be.true;
    });
});
