/*eslint-disable */
'use strict';

require('./tasks/base.js');

//tasks
<% each(modules, function(attrs, module) { %><% if(attrs.tasks) { %>require('./tasks/<%= module %>')();<% } else { %>//<%= module %> is not task based<% } %>
<% }); %>
//core tasks
require('./tasks/core')();
require('./tasks/serve')();

/*eslint-enable */
