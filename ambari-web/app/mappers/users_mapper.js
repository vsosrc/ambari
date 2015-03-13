/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = require('app');

App.usersMapper = App.QuickDataMapper.create({
  model : App.User,
  config : {
    id : 'Users.user_name',
    user_name : 'Users.user_name',
    is_ldap: 'Users.ldap_user',
    admin: 'Users.admin',
    permissions: 'permissions'
  },
  map: function (json) {
    var self = this;
    json.items.forEach(function (item) {
      var result= [];
      if(!App.User.find().someProperty("userName", item.Users.user_name)) {
        item.permissions = [];
        if (!!Em.get(item.privileges, 'items.length')) {
          item.permissions = item.privileges.items.mapProperty('PrivilegeInfo.permission_name');
        }
        item.Users.admin = self.isAdmin(item.permissions);
        result.push(self.parseIt(item, self.config));
        App.store.loadMany(self.get('model'), result);
      }
    });
  },

  /**
   * Check if user is admin.
   * @param {Array} permissionList
   * @return {Boolean}
   **/
  isAdmin: function(permissionList) {
    return permissionList.indexOf('AMBARI.ADMIN') > -1 || permissionList.indexOf('CLUSTER.OPERATE') > -1;
  }
});
