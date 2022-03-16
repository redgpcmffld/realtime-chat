const { httpResponse } = require("../../utils");

class AccountController {
  constructor({ accountService }) {
    this.accountService = accountService;
  }

  joinAccount(req, res) {
    try {
      const { id, phone_number } = req.body;
      const account = this.accountService.joinAccount({ id, phone_number });
      return httpResponse.ok({ res, data: { account } });
    } catch (error) {
      return httpResponse.error({ res, error });
    }
  }
}

module.exports = { AccountController };
