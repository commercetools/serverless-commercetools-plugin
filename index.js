"use strict";

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      welcome: {
        usage: "Helps you start your first Serverless plugin",
        lifecycleEvents: ["hello", "world"],
        options: {
          message: {
            usage:
              "Specify the message you want to deploy " +
              "(e.g. \"--message 'My Message'\" or \"-m 'My Message'\")",
            required: true,
            shortcut: "m",
          },
        },
      },
    };

    this.hooks = {
      "before:welcome:hello": this.beforeWelcome.bind(this),
      "welcome:hello": this.welcomeUser.bind(this),
      "welcome:world": this.displayHelloMessage.bind(this),
      "after:welcome:world": this.afterHelloWorld.bind(this),
      "aws:deploy:finalize:cleanup": this.afterDeploy.bind(this),
    };
  }

  beforeWelcome() {
    this.serverless.cli.log("Hello from Serverless!");
  }

  welcomeUser() {
    this.serverless.cli.log("Your message:");
  }

  displayHelloMessage() {
    this.serverless.cli.log(`${this.options.message}`);
  }

  afterHelloWorld() {
    this.serverless.cli.log("Please come again!");
  }

  beforeDeploy() {
    console.log("in before deploy");
    this.serverless.cli.log("Before deploy.");
  }

  afterDeploy() {
    console.log(
      "CLIENT_ID: ",
      this.serverless.service.provider.environment.CTP_PROJECT_KEY
    );

    this.serverless.cli.log(
      "Creating commercetools subcription based on yaml specifications."
    );
  }
}

module.exports = ServerlessPlugin;
