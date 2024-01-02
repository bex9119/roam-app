import secretManager from "@google-cloud/secret-manager";
const secrets = new secretManager.SecretManagerServiceClient();

async function getSecret(name) {
  const [version] = await secrets.accessSecretVersion({
    name: `projects/501120160148/secrets/${name}/versions/latest`,
  });

  const payload = version.payload?.data?.toString();
  return payload;
}

module.exports = {
  getSecret,
};
