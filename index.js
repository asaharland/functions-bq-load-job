'use strict';

const {Storage} = require('@google-cloud/storage');
const {BigQuery} = require('@google-cloud/bigquery');

// Instantiates a client
const storage = new Storage();
const bigquery = new BigQuery();

/**
 * Creates a BigQuery load job to load a file from Cloud Storage and write the data into BigQuery.
 *
 * @param {object} data The event payload.
 * @param {object} context The event metadata.
 */
exports.loadFile = (data, context) => {
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
        .load(storage.bucket(data.bucket).file(data.name), jobMetadata)
        .catch(err => {
            console.error('ERROR:', err);
        });

    console.log(`Loading from gs://${data.bucket}/${data.name} into ${datasetId}.${tableId}`);
};
