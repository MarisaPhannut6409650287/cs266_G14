const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const { alertIsPresent } = require('selenium-webdriver/lib/until');
const assert = chai.assert;


describe("Alert status", function () {

  it("Should display alert when status changed ", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      // Assuming there's a login page with username and password fields
      await driver.get('http://localhost:8080/cs266_G14/login.php');

      const usernameField = await driver.findElement(By.name('username'));
      const passwordField = await driver.findElement(By.name('password'));
      const loginButton = await driver.findElement(By.id('buttn'));

      await usernameField.sendKeys('username');
      await passwordField.sendKeys('user1234');

      await loginButton.click();

      await driver.get('http://localhost:8080/cs266_G14/index.php');

      const myOrdersLink = await driver.findElement(By.id('myOrders'));
      await myOrdersLink.click();

      alertIsPresent();

      assert(alertIsPresent(),true);
    

    } finally {
      await driver.quit();
    }
  });

  it("If status change should display alert with alert message same current status", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      // Assuming there's a login page with username and password fields
      await driver.get('http://localhost:8080/cs266_G14/login.php');

      const usernameField = await driver.findElement(By.name('username'));
      const passwordField = await driver.findElement(By.name('password'));
      const loginButton = await driver.findElement(By.id('buttn'));

      await usernameField.sendKeys('username');
      await passwordField.sendKeys('user1234');

      await loginButton.click();

      await driver.get('http://localhost:8080/cs266_G14/index.php');

      const myOrdersLink = await driver.findElement(By.id('myOrders'));
      await myOrdersLink.click();

      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();

      await alert.dismiss();

      const statusElement = await driver.findElement(By.id('statusButtn'));
      const statusText = await statusElement.getText();

      assert.equal(alertText, statusText);
    

    } finally {
      await driver.quit();
    }
  });

  it("Should not display alert when status not changed", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      // Assuming there's a login page with username and password fields
      await driver.get('http://localhost:8080/cs266_G14/login.php');

      const usernameField = await driver.findElement(By.name('username'));
      const passwordField = await driver.findElement(By.name('password'));
      const loginButton = await driver.findElement(By.id('buttn'));

      await usernameField.sendKeys('username2');
      await passwordField.sendKeys('user1234');

      await loginButton.click();

      await driver.get('http://localhost:8080/cs266_G14/index.php');

      const myOrdersLink = await driver.findElement(By.id('myOrders'));
      await myOrdersLink.click();

      alertIsPresent();
      const statusElement = await driver.findElement(By.id('statusButtn'));
      const statusText = await statusElement.getText();

      if (statusText === "Dispatch") {
        
      assert(alertIsPresent(),false);
      
      }

    } finally {
      await driver.quit();
    }
  });

});

