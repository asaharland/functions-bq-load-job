'use strict';

// [START functions_load_file_setup]
const Storage = require('@google-cloud/storage');
const BigQuery = require('@google-cloud/bigquery');

// Instantiates a client
const storage = Storage();
const bigquery = new BigQuery();
// [END functions_load_file_setup]

// [START functions_load_file_setup]
/**
 * Creates a BigQuery load job to load a file from Cloud Storage and write the data into BigQuery.
 *
 * @param {object} event The Cloud Functions event.
 * @param {object} event.data A Google Cloud Storage File object.
 * @param {function} callback The callback function.
 */
exports.loadFile = (event, callback) => {
  const file = event.data;

  const datasetId = 'finance';
  const tableId = 'transactions';

  const jobMetadata = {
    skipLeadingRows: 1,
    writeDisposition: 'WRITE_APPEND'
  };

  // Loads data from a Google Cloud Storage file into the table
  bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(storage.bucket(file.bucket).file(file.name), jobMetadata)
    .catch(err => {
      console.error('ERROR:', err);
    });

  callback();
};
// [END functions_load_file_setup]
