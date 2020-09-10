# Serverless commercetools Plugin
Serverless framework plugin that registers the deployed function as a commercetools API Extension or attaches it to a Subscription.

## Development

1. In your serverless lambda create a folder called .serverless_plugins. Place your plugin folder there for development.
2. Into your serverless.yaml place:
    `plugins:`
        `- serverless-commercetools-plugin`
3. Run `serverless deploy`.
