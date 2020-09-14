# Serverless commercetools Plugin
Serverless framework plugin that registers the deployed function as a commercetools API Extension or attaches it to a Subscription.

## Development

1. In your serverless lambda create a folder called .serverless_plugins. Place your plugin folder there for development.
2. At the bottom of your function's serverless.yaml place:
    `plugins:`
        `- serverless-commercetools-plugin`
3.  In your serverless.yaml under the service, directly below region, add environment vars for your commercetools client.  

     Example:    
             ```  region: us-east-2
                       environment:
                            CTP_PROJECT_KEY: "your_key"
                            CTP_CLIENT_SECRET: "your_secret"
                            CTP_CLIENT_ID: "your_clientid"
                            CTP_AUTH_URL: "your_authurl"
                            CTP_API_URL: "your_apiUrl"
                            CTP_SCOPES: "your_scopes"```
                            
4. In your severlerless.yaml add the deploy type ("extension" or "subscription") and your body configuration for the [Subscriptions]( https://docs.commercetools.com/http-api-projects-subscriptions) or [Extensions]( https://docs.commercetools.com/http-api-projects-api-extensions).

 
 
 Example 1. Extensions:
                            ```CTP_DEPLOY_TYPE: "extension"
                               CTP_POST_BODY: '{
                                    "destination": {
                                    "type": "AWSLambda",
                                   "arn": "arn:aws:lambda:us-east-1:12345678:function:awsmainlambda-dev-hello",
                                   "accessKey": "your_key",
                                   "accessSecret": "your_secret"
                                   },
                                   "triggers": [{
                                   "resourceTypeId": "cart",
                                   "actions": ["Create", "Update"]
                                   }]
                               }'``` 
                            
                            
 Example 2. Subscriptions:
                       ```CTP_DEPLOY_TYPE: "subscription"
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
                            }'``` 
                            
5. Run `serverless deploy`.



