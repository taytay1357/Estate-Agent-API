const AccessControl = require('role-acl');
const ac = new AccessControl();


ac.grant('agent').condition({Fn: 'EQUALS', args: {'requester': '$.owner'}}).execute('update')
   .on('property', ['name', 'price', 'address', 'bedrooms', 'bathrooms', 'description','imageURL']);

ac.grant('agent').execute('create').on('property', ['name', 'price', 'address', 'bedrooms', 'bathrooms', 'description','imageURL']);

ac.grant('admin').execute('read').on('property');
ac.grant('admin').execute('read').on('properties');
ac.grant('admin').execute('update').on('property');
ac.grant('agent').condition({Fn: 'EQUALS', args: {'requester': '$.owner'}}).execute('delete').on('property');


exports.create = (requester) =>
   ac.can(requester.role).execute('create').sync().on('property');

exports.update = (requester, data) => 
   ac.can(requester.role).context({requester:requester.sub, owner:data.ID}).execute('update').sync().on('property');

exports.delete = (requester, data) =>
   ac.can(requester.role).context({requester:requester.sub, owner:data.ID}).execute('delete').sync().on('property')