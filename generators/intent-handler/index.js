'use strict';
const GeneratorBase = require('../generator_base');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends GeneratorBase {
  // eslint-disable-next-line no-useless-constructor
  constructor (args, opts) {
    super(args, opts);
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.green('Abbott - Intent Handler') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'handlerName',
        message: 'What is intent handler name? (This name will be used on target filename)',
        default: 'my-intent-handler'
      },
      {
        type: 'input',
        name: 'handlerIntentActionName',
        message: 'What is your intent action name which i should associate with this handler?',
        default: 'com.mybot.myActionName'
      }
    ];

    return Promise.resolve()
      .then(() => this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }));
  }

  writing () {
    let destPath = this.destinationPath('intentHandlers');

    if (!this.fs.exists(destPath)) {
      mkdirp.sync(destPath);
    }

    this.fs.copyTpl(
      this.templatePath('_intent-handler.js'),
      this.destinationPath(`intentHandlers/${this.props.handlerName}.js`),
      {
        props: this.props
      }
    );
  }
};
