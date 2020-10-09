const requestBuilder = require("@commercetools/api-request-builder");
const clientCreate = require("@commercetools/sdk-client");
const middlewareAuth = require("@commercetools/sdk-middleware-auth");
const createMiddleware = require("@commercetools/sdk-middleware-http");
const clientQueue = require("@commercetools/sdk-middleware-queue");
const fetch = require("node-fetch");
("use strict");

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.projectKey = this.serverless.service.provider.environment.CTP_PROJECT_KEY;
    this.clientId = this.serverless.service.provider.environment.CTP_CLIENT_ID;
    this.clientSecret = this.serverless.service.provider.environment.CTP_CLIENT_SECRET;
    this.apiUrl = this.serverless.service.provider.environment.CTP_API_URL;
    this.authURL = this.serverless.service.provider.environment.CTP_AUTH_URL;
    this.scopes = this.serverless.service.provider.environment.CTP_SCOPES;
    this.deployType = this.serverless.service.provider.environment.CTP_DEPLOY_TYPE;
    this.postBody = this.serverless.service.provider.environment.CTP_POST_BODY;
    this.provider = this.serverless.service.provider.name;
    this.commands = {};
    this.hooks = {
      "deploy:finalize": this.afterDeploy.bind(this),
    };
  }

  async assembleLambdaARN(region) {
    const AWS = require("aws-sdk");
    const sts = new AWS.STS();
    const stsIdentity = await sts.getCallerIdentity({}).promise();
    const accountId = stsIdentity.Account;
    const functionNames = this.serverless.service.functions;
    const functionName = Object.values(functionNames)[0].name;
    const lambdaARN = `arn:aws:lambda:${region}:${accountId}:function:${functionName}`;
    this.serverless.cli.log("Lambda ARN: " + lambdaARN);
    let jsonPost = JSON.parse(this.postBody);
    jsonPost.destination.arn = lambdaARN;
    this.postBody = jsonPost;
  }

  async afterDeploy() {
    let service = null;
    const projectKey = this.projectKey;
    this.serverless.cli.log(
      "Function deployed. Creating commercetools integration based on yaml specifications for project: " +
        projectKey
    );
    const region = this.serverless.service.provider.region;
    this.serverless.cli.log("Creating: " + this.deployType);
    const authMiddleware = middlewareAuth.createAuthMiddlewareForClientCredentialsFlow(
      {
        host: this.authURL,
        projectKey: projectKey,
        credentials: {
          clientId: this.clientId,
          clientSecret: this.clientSecret,
        },
        fetch,
      }
    );
    const httpMiddleware = createMiddleware.createHttpMiddleware({
      host: this.apiUrl,
      fetch,
    });
    const queueMiddleware = clientQueue.createQueueMiddleware({
      concurrency: 5,
    });
    const client = clientCreate.createClient({
      middlewares: [authMiddleware, httpMiddleware, queueMiddleware],
    });
    if (this.deployType === "extension") {
      service = requestBuilder.createRequestBuilder({ projectKey }).extensions;
      if (this.provider === "aws") {
        await this.assembleLambdaARN(region);
      }
    }
    if (this.deployType === "subscription") {
      service = requestBuilder.createRequestBuilder({ projectKey })
        .subscriptions;
    }
    const url = service.build();
    const postRequest = {
      uri: url,
      method: "POST",
      body: this.postBody,
    };
    const result = await client.execute(postRequest);
    this.serverless.cli.log("result: " + JSON.stringify(result));
  }
}

module.exports = ServerlessPlugin;
