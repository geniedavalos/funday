const Employee = require('mongoose').model('Employee');
const Company = require('mongoose').model('Company');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
  /**
   * Receives and validates login requests
   * @param {Request} req Request instance
   * @param {Response} res Response instance
   */
  login: (req, res) => {
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
  newCompanyRegister: (req, res) => {
    const name = req.body.name;
    Company.create({name: name})
      .then(async newCompany => {
        let owner;
        req.body.owner.isManager = true;
        req.body.owner.password = await bcrypt.hash(req.body.owner.password, 10);
        try {
          owner = await Employee.create(req.body.owner);
        } catch (err) {
          Company.deleteOne(newCompany);
          res.json(err);
        }
        newCompany.owner = owner;
        Company.findByIdAndUpdate(newCompany._id, newCompany)
          .then(async data => {
            console.log(data);
            const login = await completeLogin(req, res, owner);
            login.data['createdCompany'] = data;
            res.json(login);
          })
          .catch(err => {
            console.log(err);
            res.json(err);
          })

      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },
  joinCompanyRegister: async (req, res) => {
    console.log(req.params.id, req.body);
    try {
      const company = await Company.findById(req.params.id);
      console.log("Got company:",company);
      bcrypt.hash(req.body.password, 10)
        .then(hashed => {
          req.body.password = hashed;
          console.log(req.body);
          Employee.create(req.body)
            .then(newEmployee => {
              console.log("New employee created:", newEmployee);
              Company.findByIdAndUpdate(req.params.id, {$push : { employees : newEmployee}})
                .then(async data => {
                  console.log("Joined company:", data);
                  const login = await completeLogin(req, res, newEmployee);
                  login.data['joinedCompany'] = data;
                  res.json(login);
                })
                .catch(err => {
                  console.log(err);
                  res.json(err);
                })
            })
            .catch(err => {
              console.log(err);
              res.json(err);
            });
        })
        .catch(err => {
          console.log(err);
          res.json(err);
        })
    }
    catch (err) {
      res.json(err)
    }
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
  const token = jwt.sign({id: employee._id}, req.app.get('secretKey'), { expiresIn: '1m' });
  employee = employee.toObject();
  delete employee.password;
  return {status: 'success', message: 'Logged in', data: { employee: employee, token: token }};
}
