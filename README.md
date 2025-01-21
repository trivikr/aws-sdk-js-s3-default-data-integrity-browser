# aws-sdk-js-s3-default-data-integrity-browser

Attempting a minimal repro for https://github.com/aws/aws-sdk-js-v3/issues/6818

## Setup

- Clone this repo
- Copy `.env.temp` to `.env` and fill in the values
  - [Create a Amazon Cognito Identity pool for testing][cognito-identity-pool], where the role should have write access to S3 bucket.
  - The S3 Bucket should have [CORS][cors] enabled.
- Run `npm install`

## Run

Run `node --run start`

This will open a browser window with the response from AWS service in textarea.

[cors]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enabling-cors-examples.html
[cognito-identity-pool]: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-browser.html#getting-started-browser-create-identity-pool
