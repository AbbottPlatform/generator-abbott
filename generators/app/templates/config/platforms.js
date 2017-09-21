const platforms = {};

<% if ((settings.answers.chatPlatforms) && (settings.answers.chatPlatforms.length > 0)) { -%>
<% settings.answers.chatPlatforms.forEach((chatKey) => { -%>
platforms.<%= chatKey %> = <%- JSON.stringify(settings.config.platforms[chatKey]) %>;
<%= %>
<% }); -%>
<% } -%>
module.exports = platforms;