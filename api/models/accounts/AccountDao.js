const { BaseDao } = require("../../utils");

// TODO: use query builder!
class AccountDao extends BaseDao {
  constructor() {
    super();
  }

  joinAccount() {
    return "🎉 Congratuation joined 🎉";
  }
}

module.exports = { AccountDao };
