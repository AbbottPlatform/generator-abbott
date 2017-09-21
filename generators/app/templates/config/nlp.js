const nlp = {};

<% if (settings.answers.nlpProvider) { -%>
nlp.<%= settings.answers.nlpProvider %> = <%- JSON.stringify(settings.config.nlp[settings.answers.nlpProvider]) %>;
<% } -%>
    
module.exports = nlp;