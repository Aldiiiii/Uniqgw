const bcrypt = require("bcryptjs");

function hashing(password) {
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);

  return (password = hash);
}

module.exports = hashing;
