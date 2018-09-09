# Google Cloud Functions Cloud Storage To BigQuery Load Job

This code triggers a BigQuery load job when a file is written to a Google Cloud Storage bucket.

View the [source code][code].

[code]: index.js

## Deploy and Test

1. Follow the [Cloud Functions quickstart guide][quickstart] to setup Cloud
Functions for your project.

1. Clone this repository:

        git clone 

1. Create a Cloud Storage Bucket:

        gsutil mb gs://BUCKET_NAME

    * Replace `BUCKET_NAME` with the name of your Cloud Storage Bucket.

1. Deploy the "loadFile" function with an HTTP trigger:

        gcloud functions deploy loadFile --trigger-resource gs://BUCKET_NAME --trigger-event google.storage.object.finalize

1. Create a BigQuery dataset with a table with the following schema:

        user_id:STRING,amount:FLOAT

1. Upload 'transactions.csv', located in the root of this repo, to your bucket:

        gsutil cp transactions.csv gs://BUCKET_NAME

    * Replace `YOUR_BUCKET_NAME` with the name of your Cloud Storage Bucket.

1. Query the BigQuery table to check that you can see that the data has been inserted successfully.

