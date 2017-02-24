const users = [
  {
    "Id" : 109659033,
    "BoardId" : 125392207,
    "FullName" : "John Smith",
    "UserName" : "john@smith.com",
    "Board": {
      "Id": 125392207,
      "Title": "Board title 1"
    }
  },
  {
    "Id" : 109659033,
    "BoardId" : 123759946,
    "FullName" : "John Smith",
    "UserName" : "john@smith.com",
    "Board": {
      "Id": 123759946,
      "Title": "Board title 2"
    }
  }
];

const user = {
  "Id" : 109659033,
  "FullName" : "John Smith",
  "UserName" : "john@smith.com",
  "Boards": [
    {
      "Id": 125392207,
      "Title": "Board title 1"
    },
    {
      "Id": 123759946,
      "Title": "Board title 2"
    }
  ]
};

const findUsers = {
  populate: function() {
    return this;
  },
  exec: function(callback) {
    callback(null, users);
  }
};

exports.users = users;
exports.user = user;
exports.findUsers = findUsers;
