class AccountRoutes {
  constructor({ router, accountController }) {
    this.accountController = accountController;
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/join",
      this.accountController.joinAccount.bind(this.accountController)
    );
  }
}

module.exports = { AccountRoutes };
