# commercetools Serverless Plugin

[commercetools's](https://commercetools.com/) plugin for the [Serverless Framework](https://serverless.com) allows you to seamlessly integrate your serverless functions with commercetools' extensibility options.

## Contents

- [Features](#features)
- [Install](#install)
- [Configuration](#configuration)
  - [API Extension](#api-extension)
  - [Subscription](#subscription)
- [Usage](#usage)
- [Help](#help)
- [Development](#development)
- [License](#license)

## Features

- Attach a newly deployed serverless function as a commercetools' API extension.
- Create a new serverless function to process events from a commercetools' subscription.
- Supports AWS and GCP

## Install

```sh
npm i --save-dev serverless-commercetools-plugin
# or
yarn add --dev serverless-commercetools-plugin
```

Add the following plugin to your `serverless.yml`:

```yaml
plugins:
  - serverless-commercetools-plugin
```

With the [serverless CLI](https://www.serverless.com/framework/docs/providers/aws/cli-reference/plugin-install/)

```sh
serverless plugin install --name serverless-commercetools-plugin
```

## Configuration

Add your commercetools' project settings to the serverless.yaml file. Add these values under the provider section:

```yaml
provider:
  environment:
    CTP_PROJECT_KEY: "your_key"
    CTP_CLIENT_SECRET: "your_secret"
    CTP_CLIENT_ID: "your_clientid"
    CTP_AUTH_URL: "your_authurl"
    CTP_API_URL: "your_apiUrl"
    CTP_SCOPES: "your_scopes"
```

### API Extension

Add environment vars for the deploy type ("extension") and your body configuration for the [Extension](https://docs.commercetools.com/http-api-projects-api-extensions).

```yaml
    CTP_DEPLOY_TYPE: "extension"
    CTP_POST_BODY: '{
        "destination": {
          "type": "AWSLambda",
          "accessKey": "your_aws_key",
          "accessSecret": "your_aws_secret"
        },
        "triggers": [{
          "resourceTypeId": "cart",
          "actions": ["Create", "Update"]
        }]
    }'
```

_Note: The Lambda ARN is determined by the plugin. You do not need to include it in the configuration._

Note: Please note that you can set a key on extensions and subscriptions. The key prevents the same extension or subscription from being deployed twice from CI/CD and manually deploys. One can modify the code from this Opensource repo to customize your deploys for setup in CI/CD and multiply runs.

_For Google Cloud Platform functions set the CTP_POST_BODY to use the HTTP destination as outlined in the [commercetools API Extension documentation.](https://docs.commercetools.com/api/projects/api-extensions#http-destination)_

### Subscription

Add environment vars for the deploy type ("subscription") and your body configuration for the [Subscription](https://docs.commercetools.com/http-api-projects-subscriptions).

```yaml
    CTP_DEPLOY_TYPE: "subscription"
    CTP_POST_BODY: '{
        "destination": {
          "type": "AWSLambda",
          "accessKey": "your_aws_key",
          "accessSecret": "your_aws_secret"
        },
        "triggers": [{
          "resourceTypeId": "cart",
          "actions": ["Create", "Update"]
        }]
    }'
```

## Usage

To build your cloud resources and configure the commercetools' project run:

```sh
serverless deploy
```

To remove all cloud resources and commercetools' configuration run:

```sh
serverless remove
```

## Help

If you have any issues, please don't hesitate to:

- Use the [documentation](https://docs.commercetools.com).
- Open an issue in GitHub.

When opening a new issue, please provide as much information as possible including:

- Plugin version
- node version
- cloud environment
- A reproducible code example

The GitHub issues are intended for bug reports and feature requests specifically related to the serverless plugin.

## Development

Create a local serverless function or copy the code from the examples folder. Add the plugin code to a folder named .serverless_plugins at the root of your serverless project.

## License

Released as-is under the MIT license. See LICENSE for details.
