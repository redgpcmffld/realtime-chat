const { accountService } = require("../services");
const { AccountController } = require("./AccountController");

const accountController = new AccountController({ accountService });

module.exports = { accountController };
