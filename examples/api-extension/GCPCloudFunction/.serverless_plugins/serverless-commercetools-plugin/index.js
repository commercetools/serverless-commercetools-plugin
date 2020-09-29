const requestBuilder = require("@commercetools/api-request-builder");
const clientCreate = require("@commercetools/sdk-client");
const middlewareAuth = require("@commercetools/sdk-middleware-auth");
const createMiddleware = require("@commercetools/sdk-middleware-http");
const clientQueue = require("@commercetools/sdk-middleware-queue");
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
    this.commands = {};
    this.hooks = {
      "deploy:finalize": this.afterDeploy.bind(this),
    };
  }

  async afterDeploy() {
    console.log("23423423");
    /* let service = null;
    const projectKey = this.projectKey;
    this.serverless.cli.log(
      "Function deployed. Creating commercetools integration based on yaml specifications for project: " +
        projectKey
    );
    this.serverless.cli.log("Creating: " + this.deployType);
    const authMiddleware = middlewareAuth.createAuthMiddlewareForClientCredentialsFlow(
      {
        host: this.authURL,
        projectKey: projectKey,
        credentials: {
          clientId: this.clientId,
          clientSecret: this.clientSecret,
        },
      }
    );
    const httpMiddleware = createMiddleware.createHttpMiddleware({
      host: this.apiUrl,
    });
    const queueMiddleware = clientQueue.createQueueMiddleware({
      concurrency: 5,
    });
    const client = clientCreate.createClient({
      middlewares: [authMiddleware, httpMiddleware, queueMiddleware],
    });
    if (this.deployType === "extension") {
      service = requestBuilder.createRequestBuilder({ projectKey }).extensions;
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
    this.serverless.cli.log("result: " + JSON.stringify(result)); */
  }
}

module.exports = ServerlessPlugin;
