import { S3 } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentity } from "@aws-sdk/client-cognito-identity";

const getHTMLElement = (title, content) => {
  const element = document.createElement("div");
  element.style.margin = "30px";

  const titleDiv = document.createElement("div");
  titleDiv.innerHTML = title;
  const contentDiv = document.createElement("textarea");
  contentDiv.rows = 20;
  contentDiv.cols = 50;
  contentDiv.innerHTML = content;

  element.appendChild(titleDiv);
  element.appendChild(contentDiv);

  return element;
};

const component = async () => {
  const region = import.meta.env.VITE_AWS_REGION;
  const client = new S3({
    region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentity({ region }),
      identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID,
    }),
  });
  const response = await client.putObject({
    Bucket: import.meta.env.VITE_AWS_S3_BUCKET_NAME,
    Key: "foo",
    Body: "bar",
  });
  return getHTMLElement("Data returned:", JSON.stringify(response, null, 2));
};

(async () => {
  document.body.appendChild(await component());
})();
