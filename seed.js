const db = require('./models');

const users_list = [
  {
    firstName: 'john',
    lastName: 'smith',
    address:'10-c sanson road lahug cc',
    phoneNumber: 555631923,
    email: 'johnsmith@mail.com'
  },
  {
    firstName: 'charlie',
    lastName: 'day',
    address:'10-b sanson road lahug cc',
    phoneNumber: 555631456,
    email: 'charliedayh@mail.com'
  },
  {
    firstName: 'bob',
    lastName: 'marley',
    address:'201 jamica st jamaica',
    phoneNumber: 5556319998,
    email: 'bobmarley@mail.com'
  },
  {
    firstName: 'jim',
    lastName: 'morrison',
    address:'101 united st united states',
    phoneNumber: 5556310000,
    email: 'jimmorrison@mail.com'
  },
  {
    firstName: 'lauryn',
    lastName: 'hill',
    address:'10 riker st jamaica',
    phoneNumber: 5556314567,
    email: 'laurynhill@mail.com'
  },
];

// !remove all the records that match {} ALL records 
db.User.deleteMany({}, function(err, users) {
  if(err) {
    console.log('error occured', err);
  } else {
    console.log('removed all users');

    // !create new record on the array user list
    db.User.create(users_list, function(err, users){
      if (err) { return console.log('err', err); }
      console.log("created", users.length, "users");
      process.exit();
    });
  }
});
