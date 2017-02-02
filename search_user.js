const fs = require('fs');

var users = JSON.parse(fs.readFileSync('users.json'));

module.exports = {
  getUsers: function() {
    return users;
  },
  searchUsers: function(query) {
    var results = [];

    users.forEach(function(user) {
      if (searchFirstName(query, user) || searchLastName(query, user)) {
        results.push(user);
      }
    });
    return results;
  },
};

function searchFirstName(input, user) {
  return user.firstname.toLowerCase().includes(input.toLowerCase());
}

function searchLastName(input, user) {
  return user.lastname.toLowerCase().includes(input.toLowerCase());
}