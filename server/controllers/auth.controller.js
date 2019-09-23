const Employee = require('mongoose').model('Employee');

module.exports = {
  login(req, res) {
    console.log('Logging in', req.body);
    const { email, password } = req.body;

    Employee.findOne({ email })
      .then(employee => {
        return Employee.validatePassword(password, user.password)
          .then(isValid => {
            if(!isValid) {
              throw new Error();
            }
            completeLogin(req, res, employee)
          })
          .catch(err => {
            console.log(err);
            res.json(err);
          });
      })
  },
  register(req, res) {
    console.log('Registration:',req.body);
    Employee.create(req.body)
      .then(employee => {
        console.log('New employee:', employee);
        completeLogin(req, res, employee);
      })
      .catch(err => {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        res.json(errors);
      });
  },
  logout(req, res) {
    console.log('Logging out!');
  }
}
function completeLogin(request, response, employee) {
  console.log('completing login', employee);
  employee = employee.toObject();

  delete employee.password;

  request.session.user = employee;

  response.cookie('userID', employee._id);
  response.cookie('expiration', Date.now() + 86400 * 1000);

  response.json(employee);
}
