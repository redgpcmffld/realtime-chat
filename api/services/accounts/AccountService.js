class AccountService {
  constructor({ accountDao }) {
    this.accountDao = accountDao;
  }

  joinAccount({ id, phone_number }) {
    try {
      if (!id || !phone_number) {
        const badRequestException = new Error(
          "id and phone_number is required"
        );
        badRequestException.code = 400;
        throw badRequestException;
      }
      return this.accountDao.joinAccount();
    } catch (error) {
      // TODO: use logger
      throw error;
    }
  }
}

module.exports = {
  AccountService,
};
