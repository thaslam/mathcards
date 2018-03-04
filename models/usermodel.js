function UserModel() {
  this.getUsers = function() {
    return [
      {users: [
        {name: "Tommy", pic: "/img/coffee-maker.png", id: 1},
        {name: "Danny", pic: "/img/dog.png", id: 2},
        {name: "Lindsey", pic: "/img/person-8.png", id: 3}
      ]},
      {users: [
        {name: "James", pic: "/img/clown-1.png", id: 4},
        {name: "Will", pic: "/img/person-3.png", id: 5},
        {name: "Tommy", pic: "/img/dog.png", id: 6}
      ]},
      {users: [
        {name: "Mark", pic: "/img/fries.png", id: 7},
        {name: "Karen", pic: "/img/person-9.png", id: 8},
        {name: "Ben", pic: "/img/person-7.png", id: 9}
      ]}
    ];
  }
  this.getUserById = function(id) {
    if (!id) return;
    var groups = this.getUsers();
    if (!groups) return;
    for (var i=0; i<groups.length; i++) {
      for (var j=0; j<groups[i].users.length; j++) {
        if (groups[i].users[j].id == id) return groups[i].users[j];
      }
    }
  }
}

module.exports = new UserModel();