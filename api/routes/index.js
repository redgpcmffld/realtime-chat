const { Router } = require("express");
const { AccountRoutes } = require("./AccountRoutes");
const { accountController } = require("../controllers");

const router = Router();
new AccountRoutes({ router, accountController });

module.exports = { router };
