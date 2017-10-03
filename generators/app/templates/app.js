const env = require('node-env-file');
env(__dirname + '/.env');

const AbbottFramework = require('@abbott-platform/abbott-framework').AbbottFramework;

var abbottConfig = {
  botName: '<%= props.appNameId %>',
  botFirendlyName: '<%= settings.answers.botFriendlyName %>',
  port: process.env.PORT || 3000,
  platforms: require('./config/platforms'),
  nlp: require('./config/nlp')
};
  
const abbottFramework = new AbbottFramework(abbottConfig);

abbottFramework.start();

console.log('Abbott Framework Initialized!');