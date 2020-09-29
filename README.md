# Serverless commercetools Plugin

Serverless framework plugin that registers the deployed function as a commercetools API Extension or attaches it to a Subscription.

## Configuration and Deploy for AWS and GCP

1.  At the bottom of your function's serverless.yaml place:
    `plugins:`
    `- serverless-commercetools-plugin`

    Plugin install method 1 - Install it as a regular [npm module ](https://www.npmjs.com/package/serverless-commercetools-plugin) and reference it in plugins section of your serverless.yml shown above. Or use the serverless plugin install command [serverless plugin install --name pluginName](https://www.serverless.com/framework/docs/providers/aws/cli-reference/plugin-install/).

    Plugin install method 2 - In your serverless function create a folder called .serverless_plugins. Place the serverless-commercetools-plugin folder into .serverless_plugins with dependencies installed.

2.  In your serverless.yaml under the service, directly below region, add environment vars for your commercetools client.

    Example:

             region: us-east-2
                       environment:
                            CTP_PROJECT_KEY: "your_key"
                            CTP_CLIENT_SECRET: "your_secret"
                            CTP_CLIENT_ID: "your_clientid"
                            CTP_AUTH_URL: "your_authurl"
                            CTP_API_URL: "your_apiUrl"
                            CTP_SCOPES: "your_scopes"

3)  In your severlerless.yaml add environment vars for the deploy type ("extension" or "subscription") and your body configuration for the [Subscription](https://docs.commercetools.com/http-api-projects-subscriptions) or [Extension](https://docs.commercetools.com/http-api-projects-api-extensions).

Example 1. Extensions:

                               CTP_DEPLOY_TYPE: "extension"
                               CTP_POST_BODY: '{
                                    "destination": {
                                      "type": "AWSLambda",
                                      "accessKey": "your_key",
                                      "accessSecret": "your_secret"
                                   },
                                   "triggers": [{
                                     "resourceTypeId": "cart",
                                     "actions": ["Create", "Update"]
                                   }]
                               }'

Note: The Lambda ARN is smartly assembled by the plugin. Thus you do not need to add it explicitly to the post body.

For Google Cloud Platform function deploys simple set the CTP_POST_BODY to use the HTTP destination as outlined in the commercetools API Extension documentation.

Example 2. Subscriptions:

                           CTP_DEPLOY_TYPE: "subscription"
                           CTP_POST_BODY: '{
                                  "destination": {
                                    "type": "SQS",
                                    "queueUrl": "<url_to_your_queue>",
                                 "accessKey": "<your_key>",
                                 "accessSecret": "<your_secret>",
                                 "region": "<your_region>"
                                  },
                                 "messages": [
                                 {
                                     "resourceTypeId": "order"
                                 }
                                 ]
                            }'

4. Run `serverless deploy`.

## Development

In your serverless function create a folder called .serverless_plugins. Place your plugin folder there for development.
