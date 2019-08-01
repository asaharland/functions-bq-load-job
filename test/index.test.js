const assert = require('assert');
const uuid = require('uuid');
const utils = require('@google-cloud/nodejs-repo-tools');

const { loadFile } = require('..');

beforeEach(utils.stubConsole);
afterEach(utils.restoreConsole);

it('loadFile: should print uploaded message', async() => {
    // Initialize mocks
    const filename = uuid.v4();
    const data = {
        name: filename,
        bucket: "cf-load-bucket",
        resourceState: 'exists',
        metageneration: '1',
    };

    await loadFile(data);

    assert.strictEqual(
        console.log.calledWith(`Loading from gs://cf-load-bucket/${filename} into finance.transactions`),
        true
    );
});