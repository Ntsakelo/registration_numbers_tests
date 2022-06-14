describe("Test registration number factory function", function () {
  it("it should return the string 'CF 121 111' when the string matches the expression", function () {
    let registrations = regNumbers();
    registrations.getInput("CF 121 111");
    assert.equal("CF 121 111", registrations.getRegNum());
  });
  it("it should return the string 'CJ 444-555' when the string matches the expression", function () {
    let registrations = regNumbers();
    registrations.getInput("CJ 444-555");
    assert.equal("CJ 444-555", registrations.getRegNum());
  });
  it("it should return the string 'CY 123456' when the string matches the expression", function () {
    let registrations = regNumbers();
    registrations.getInput("CY 123456");
    assert.equal("CY 123456", registrations.getRegNum());
  });
  it("it should return the string 'CA 123-456' when the string matches the expression", function () {
    let registrations = regNumbers();
    registrations.getInput("CA 123-456");
    assert.equal("CA 123-456", registrations.getRegNum());
  });
  it("it should return an empty string when the string 'CK 191911' does not matches the expression", function () {
    let registrations = regNumbers();
    registrations.getInput("CK 191911");
    assert.equal("", registrations.getRegNum());
  });
  describe("Validating sucess and error messages", function () {
    it("should return the string 'The registration entered is invalid' when registration is invalid", function () {
      let registrations = regNumbers();
      registrations.getInput("CK 123 111");
      assert.equal(
        "The registration entered is invalid",
        registrations.validateMessage()
      );
    });
    it("should return the string 'Sucessfully added new registration' when registration is valid and does not exist already", function () {
      let registrations = regNumbers();
      registrations.getInput("CA 123 111");
      registrations.getTownName();

      assert.equal(
        "Sucessfully added a Cape town registration",
        registrations.validateMessage()
      );
    });
    it("should return the string 'The registration already exists' when registration exists already", function () {
      let registrations = regNumbers();
      registrations.getInput("CA 123 111");
      registrations.getInput("CA 123 111");

      assert.equal(
        "The registration CA 123 111 already exists",
        registrations.validateMessage()
      );
    });
  });
  describe("Filter registrations by towns", function () {
    it("should filter and return registrations from capetown", function () {
      let registrations = regNumbers();

      registrations.getInput("CA 123456");
      registrations.getInput("CJ 123-444");
      registrations.getInput("CY 555 456");
      registrations.getInput("CA 444-555");

      assert.deepEqual(
        ["CA 123456", "CA 444-555"],
        registrations.filterArr("capeTown")
      );
    });
    it("should filter and return registrations from bellville", function () {
      let registrations = regNumbers();

      registrations.getInput("CA 123456");
      registrations.getInput("CJ 123-444");
      registrations.getInput("CY 555 456");
      registrations.getInput("CA 444-555");

      assert.deepEqual(["CY 555 456"], registrations.filterArr("bellville"));
    });
    it("should filter and return registrations from paarl", function () {
      let registrations = regNumbers();

      registrations.getInput("CA 123456");
      registrations.getInput("CJ 123-444");
      registrations.getInput("CY 555 456");
      registrations.getInput("CA 444-555");

      assert.deepEqual(["CJ 123-444"], registrations.filterArr("paarl"));
    });
    it("should filter and return registrations from kuilsriver", function () {
      let registrations = regNumbers();

      registrations.getInput("CF 123-456");
      registrations.getInput("CF 111-444");
      registrations.getInput("CY 555 456");
      registrations.getInput("CA 444-555");

      assert.deepEqual(
        ["CF 123-456", "CF 111-444"],
        registrations.filterArr("kuilsriver")
      );
    });
  });
  describe("Check duplicates", function () {
    it("it should return false when a registration does not exists", function () {
      let registrations = regNumbers();

      registrations.getInput("CA 123-111");
      assert.equal(false, registrations.checkAvailable());
    });
    it("it should return true when a registration exists", function () {
      let registrations = regNumbers();

      registrations.getInput("CJ 123-111");
      registrations.getInput("CJ 123-111");
      assert.equal(true, registrations.checkAvailable());
    });
  });
});
