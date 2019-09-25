const Employee = require('mongoose').model('Employee');
const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * Receives and validates login requests
   * @param {Request} req Request instance
   * @param {Response} res Response instance
   */
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
  /**
   * Receives and validates registration requests
   * @param {Request} req Request instance
   * @param {Response} res Response instance
   */
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
  /**
   * TODO: Performs JWT logout
   * @param {Request} req Request instance
   * @param {Response} res Response instance
   */
  logout(req, res) {
    console.log('Logging out!');
  }
}
/**
 * Performs login operations after successful validation, generating JWT token
 * @param {Request} req Client request instance
 * @param {Response} res Server response instance
 * @param {Employee} employee Employee instance
 */
function completeLogin(req, res, employee) {
  console.log('completing login', employee);
  const token = jwt.sign({id: employee._id}, req.app.get('secretKey'), { expiresIn: '1h' });
  employee = employee.toObject();
  delete employee.password;
  res.json({status: 'success', message: 'Logged in', data: { employee: employee, token: token }});
}
