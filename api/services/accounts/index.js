const { accountDao } = require("../../models");
const { AccountService } = require("./AccountService");

const accountService = new AccountService({ accountDao });

module.exports = { accountService };
