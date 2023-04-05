const AccessControl = require('role-acl');
const ac = new AccessControl();

ac.grant('agent').condition({Fn: 'EQUALS', args: {'requester': '$.owner'}}).execute('update')
   .on('agent', ['name', 'location', 'telephone', 'email', 'avatarURL', 'password', 'passwordSalt' ]);

ac.grant('admin').execute('read').on('agent');
ac.grant('admin').execute('read').on('agents');
ac.grant('admin').execute('update').on('agent');
ac.grant('admin').condition({Fn: 'NOT_EQUALS', args: {'requester': '$.owner'}}).execute('delete').on('agent');

exports.readAll = (requester) =>
   ac.can(requester.role).execute('read').sync().on('agents');

exports.read = (requester, data) => 
   ac.can(requester.role).context({requester: requester.sub, owner: data.ID}).execute('read').sync().on('agent');

exports.update = (requester, data) => 
   ac.can(requester.role).context({requester: requester.sub, owner: data.ID}).execute('update').sync().on('agent');

exports.delete = (requester, data) =>
   ac.can(requester.role).context({requester: requester.sub, owner: data.ID}).execute('delete').sync().on('agent');