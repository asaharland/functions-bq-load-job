'use strict';

const fs = require(`fs`);
const path = require(`path`);
const proxyquire = require(`proxyquire`).noCallThru();
const sinon = require(`sinon`);
const test = require(`ava`);

const filename = `sample.csv`;

function getSample () {
  const filePath = path.join(__dirname, `../${filename}`);
  const file = {
    createReadStream: () => fs.createReadStream(filePath, { encoding: `utf8` })
  };
  const bucket = {
    file: sinon.stub().returns(file)
  };
  const storage = {
    bucket: sinon.stub().returns(bucket)
  };
  const StorageMock = sinon.stub().returns(storage);

  return {
    program: proxyquire(`../`, {
      '@google-cloud/storage': StorageMock
    }),
    mocks: {
      Storage: StorageMock,
      storage: storage,
      bucket: bucket,
      file: file
    }
  };
}

test.serial(`Fails without a bucket`, (t) => {
  const expectedMsg = `Bucket not provided. Make sure you have a "bucket" property in your request`;

  t.throws(
    () => getSample().program.loadFile({ data: { name: `file` } }),
    Error,
    expectedMsg
  );
});

test.serial(`Fails without a file`, (t) => {
  const expectedMsg = `Filename not provided. Make sure you have a "file" property in your request`;

  t.throws(
    () => getSample().program.loadFile({ data: { bucket: `bucket` } }),
    Error,
    expectedMsg
  );
});
