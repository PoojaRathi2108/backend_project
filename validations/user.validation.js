const { body, validationResult } = require('express-validator');

const userValidationRules = () => [
  body('firstname').isAlphanumeric().withMessage('First name must be alphanumeric'),
  body('lastname').isAlphanumeric().withMessage('Last name must be alphanumeric'),
  body('email').isEmail().withMessage('Invalid email'),
  body('contact_number').isMobilePhone().withMessage('Invalid contact number'),
  body('postcode').isNumeric().withMessage('Postcode must be numeric'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { userValidationRules, validate };
