class UserService {
  //db = [];

  constructor() {
    //seed
    this.db = [
      {
        id: 1,
        name: "John",
        country: "Switzerland"
      },
      {
        id: 2,
        name: "Mary",
        country: "Spain"
      },
      {
        id: 3,
        name: "Rose",
        country: "Australia"
      },
      {
        id: 4,
        name: "Luigi",
        country: "Italy"
      }
    ];
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      resolve(this.db);
    });
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      let users = this.db.filter(x => x.id == id);
      if (users && users.length) {
        resolve(users[0]);
      } else {
        reject(new Error("Could not find user with id " + id)); // Throw an error which can be caught by API
      }
    });
  }

  getUserByCountry(country) {
    return new Promise((resolve, reject) => {
      let users = this.db.filter(x => x.country == country);
      if (users && users.length) {
        resolve(users);
      } else {
        reject(new Error("Could not find users with country " + country)); // Throw an error which can be caught by API
      }
    });
  }

  addUser(user) {
    return new Promise((resolve, reject) => {
      this.db.push(user);
      resolve(user.id);
    });
  }
}

module.exports = UserService;