import { S3 } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentity } from "@aws-sdk/client-cognito-identity";

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = e.target[0].files[0];
  console.log("Uploading file", file);

  const region = import.meta.env.VITE_AWS_REGION;
  const client = new S3({
    region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentity({ region }),
      identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID,
    }),
  });

  console.log("Calling putObject");
  const response = await client.putObject({
    Bucket: import.meta.env.VITE_AWS_S3_BUCKET_NAME,
    Key: file.name,
    Body: new ReadableStream({
      pull(controller) {
        let counter = 0;
        const maxCount = 5;
        return new Promise((resolve) => {
          setTimeout(() => {
            if (counter < maxCount) {
              const chunk = `Data chunk ${counter + 1}`;
              controller.enqueue(chunk);
              counter++;
              resolve();
            } else {
              controller.close();
              resolve();
            }
          }, 1000);
        });
      },
    }),
  });

  console.log("Response", response);
  const responseElement = document.getElementById("response");
  responseElement.innerHTML = JSON.stringify(response, null, 2);

  return true;
});
