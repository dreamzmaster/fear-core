/*eslint-disable */
'use strict';

require('./tasks/base.js');

<% if(build) { %>require('./tasks/<%= 'build' %>')();<% } %>
<% if(dev) { %>require('./tasks/<%= 'dev' %>')();<% } %>
<% if(aut) { %>require('./tasks/<%= 'aut' %>')();<% } %>
require('./tasks/core')();
require('./tasks/serve')();

/*eslint-enable */
