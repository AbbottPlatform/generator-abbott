'use strict';
const GeneratorBase = require('../generator_base');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends GeneratorBase {
  constructor (args, opts) {
    super(args, opts);

    this.props = { };
    this.settings = {};
    this.settings.answers = { };

    /*eslint-disable */
    
    this.settings.config = { };

    this.settings.config.nlp = { };

    this.settings.config.nlp.apiai = {
      token: '[YOUR_API.AI_DEVELOPER_TOKEN]'
    };

    this.settings.config.platforms = { };

    this.settings.config.platforms.abbott = {};

    this.settings.config.platforms.gactions = {
      projectId: '[ACTIONS_GOOGLE_PROJECT_ID]'
    };

       
    this.settings.config.platforms.gchats = {
      verify_token: '[YOUR_ABBOTT_VERIFY_TOKEN]',
      chats_regex: '[GOOGLE_CHATS_REGEX]'
    };

    this.settings.config.platforms.slack = {
      clientId: '[YOUR_SLACK_CLIENT_ID]',
      clientSecret: '[YOUR_SLACK_CLIENT_SECRET]'
    };

    this.settings.config.platforms.facebook = {
      access_token: '[YOUR_FACEBOOK_ACCESS_TOKEN]',
      verify_token: '[YOUR_FACEBOOK_VERIFY_TOKEN]',
      app_secret: '[YOUR_FACEBOOK_APP_SECRET]',
      validate_requests: true // Refuse any requests that don't come from FB on your receive webhook
    };

    /* eslint-enable */
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.green('abbott') + ' generator!'
    ));

    const licenses = [
      {name: 'No License (Copyrighted)', value: 'nolicense'},
      {name: 'Unlicense', value: 'unlicense'},
      {name: 'MIT', value: 'MIT'},
      {name: 'Internet Systems Consortium (ISC) License', value: 'ISC'},
      {name: 'Apache 2.0', value: 'Apache-2.0'},
      {name: 'Mozilla Public License 2.0', value: 'MPL-2.0'},
      {name: 'BSD 2-Clause (FreeBSD) License', value: 'BSD-2-Clause-FreeBSD'},
      {name: 'BSD 3-Clause (NewBSD) License', value: 'BSD-3-Clause'},
      {name: 'GNU AGPL 3.0', value: 'AGPL-3.0'},
      {name: 'GNU GPL 3.0', value: 'GPL-3.0'},
      {name: 'GNU LGPL 3.0', value: 'LGPL-3.0'}
    ];

    const availableNlpProviders = [
      {name: 'Google - API.AI', value: 'apiai'}
    ];

    const availableChatPlatforms = [
      {name: 'Abbott', value: 'abbott'},
      {name: 'Actions on Google (Google Home, Google Assistant, etc.)', value: 'gactions'},
      {name: 'Google Hangouts Chat', value: 'gchats'},
      {name: 'Slack', value: 'slack'},
      {name: 'Facebook Messenger', value: 'facebook'}
    ];

    const prompts = [
      {
        type: 'input',
        name: 'appNameId',
        message: 'What is your project name id?',
        default: 'my-basic-abbott-app',
        store: true
      },
      {
        type: 'input',
        name: 'appDescription',
        message: 'Give me a short description of your project!',
        default: 'This is just a basic and simple BOT app.',
        store: true
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'What is your name?',
        default: 'Barbara Abbott',
        store: true
      },
      {
        type: 'list',
        name: 'projectLicence',
        message: 'Which license do you want to use?',
        default: null,
        when: !this.props.projectLicence || licenses.find(x => x.value === this.props.projectLicence) === undefined,
        choices: licenses,
        store: true
      }
    ];

    const projectSettingsPrompts = [
      {
        type: 'input',
        name: 'botFriendlyName',
        message: 'Give a cool and easy name to your BOT! (This name will be seen by the people that will interact with your BOT)',
        default: 'My BOT',
        store: true
      },
      {
        type: 'list',
        name: 'nlpProvider',
        message: 'Which nlp provider do you want to use?',
        default: 'apiai',
        when: !this.settings.nlpProvider || availableNlpProviders.find(x => x.value === this.settings.nlpProvider) === undefined,
        choices: availableNlpProviders,
        store: true
      },
      {
        type: 'checkbox',
        name: 'chatPlatforms',
        message: 'Which chat platform do you want to use?',
        default: ['abbott'],
        when: !this.settings.chatPlatforms || availableChatPlatforms.find(x => x.value === this.settings.chatPlatforms) === undefined,
        choices: availableChatPlatforms,
        store: true
      }
    ];

    return Promise.resolve()
      .then(() => this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }))
      .then(() => {
        this.log('');
        this.log('App Settings:');
        this.log('');

        return this.prompt(projectSettingsPrompts).then(answers => {
          // To access props later use this.props.someAnswer;
          this.settings.answers = answers;
          return answers;
        }).then(() => {
          if ((!this.settings.answers) || (this.settings.answers.length <= 0)) {
            return Promise.resolve();
          }

          let platformPromises = [];

          this.log('');
          this.log('App Platform Settings:');
          this.log('');

          /*eslint-disable */
          this.settings.answers.chatPlatforms.forEach(item => {
            let promptsPlatformSettings = this._createPlatformSettingsPrompts(item);

            if ((promptsPlatformSettings) && (promptsPlatformSettings.length > 0)) {
              platformPromises.push(
                () => {
                  return new Promise((resolve, reject) => {
                    this.log('');
                    this.log(`Settings for ${item}:`);
                    this.log('');

                    this.prompt(promptsPlatformSettings).then(platAnswers => {
                      // To access props later use this.props.someAnswer;
                      for (var key in platAnswers) {
                        if (platAnswers.hasOwnProperty(key)) {
                          let key_name = key.replace('_platform_', '').replace(`_${item}_`, '');
                          this.settings.config.platforms[item][key_name] = platAnswers[key];
                        }
                      }
                    })
                      .then(resolve)
                      .catch(reject);
                  });
                }
              );
            }
          });
          /* eslint-enable */

          return this._createPromiseChain(platformPromises);
        });
      });
  }

  _createPlatformSettingsPrompts (platformKey) {
    let platformSettings = [];

    if (platformKey in this.settings.config.platforms) {
      for (var key in this.settings.config.platforms[platformKey]) {
        if (Object.prototype.hasOwnProperty.call(this.settings.config.platforms[platformKey], key)) {
          platformSettings.push({
            type: 'input',
            name: `_platform__${platformKey}_${key}`,
            message: `${key}:`,
            default: this.settings.config.platforms[platformKey][key],
            store: true
          });
        }
      }
    }

    return platformSettings;
  }

  writing () {
    this.fs.copyTpl(
      [
        this.templatePath() + '/**',
        this.templatePath() + '/**/.*'
      ],
      this.destinationPath(), {
        props: this.props,
        settings: this.settings
      }
    );
  }

  install () {
    this.npmInstall();
  }
};
