/*eslint-disable */
'use strict';

require('./tasks/base.js');

//tasks
<% each(modules, function(attrs, module) { %><% if(attrs.tasks && attrs.install) { %>require('./tasks/<%= module %>')();<% } else { %>//<%= module %> has not been installed<% } %>
<% }); %>
//core tasks
require('./tasks/core')();
require('./tasks/serve')();

/*eslint-enable */
