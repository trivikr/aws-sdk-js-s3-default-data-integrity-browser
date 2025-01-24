# aws-sdk-js-s3-default-data-integrity-browser

Attempting a minimal repro for https://github.com/aws/aws-sdk-js-v3/issues/6818

## Setup

- Clone this repo
- Copy `.env.temp` to `.env` and fill in the values
  - [Create a Amazon Cognito Identity pool for testing][cognito-identity-pool], where the role should have write access to S3 bucket.
  - The S3 Bucket should have [CORS][cors] enabled.
    - AllowedHeaders should be `*`.
    - AllowedMethods should be the methods being tested.
    - AllowedOrigins should be `http://localhost:5173`, or where the Vite test server is running.
- Run `npm install --no-package-lock`

## Run

Run `node --run start`

This will open a browser window, and provide an option to upload a file to the S3 bucket.
The putObject call succeeds if SDK versions are `<3.729.0`, and hangs if SDK versions are `>=3.729.0`.

[cors]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enabling-cors-examples.html
[cognito-identity-pool]: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-browser.html#getting-started-browser-create-identity-pool
