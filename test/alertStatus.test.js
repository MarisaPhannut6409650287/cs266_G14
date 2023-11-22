const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

describe("Alert status", function () {

  it("Should display alert when status changed", async function () {
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

});




describe("Menu Search", function () {

    it("Should display menu information when searching with a valid menu name", async function () {
        this.timeout(10000000);

        let driver = await new Builder().forBrowser('chrome').build();

        try {
        await driver.get('http://localhost:8080/cs266_G14/dishes.php?res_id=1');

        // Wait for the search input to be visible
        const searchInput = await driver.wait(until.elementLocated(By.id('searchMenu')), 5000);
        await searchInput.sendKeys('Yorkshire Lamb Patties', Key.RETURN);
   

        // Wait for the search button to be clickable
        const searchButton = await driver.wait(until.elementLocated(By.id('searchButton')), 5000);
        await searchButton.click();
        await driver.sleep(10000);

        const listItem = await driver.wait(until.elementLocated(By.xpath('//*[@id="popular2"]/div/div/div[1]/form/div[2]/h6/a')), 10000);
        await driver.wait(until.elementIsVisible(listItem), 5000);
        const textInsideElement = await listItem.getText();

        assert.equal(textInsideElement, 'Yorkshire Lamb Patties');

    } finally {
        await driver.quit();
    }
});

it("Should display message 'Please enter menu name' when click search without empty input", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/dishes.php?res_id=1');

      const searchButton = await driver.wait(until.elementLocated(By.id('searchButton')), 5000);
      await searchButton.click();
      await driver.sleep(10000);

      const alert = await driver.wait(until.elementLocated(By.id('alertNotInput')), 10000);
      await driver.wait(until.elementIsVisible(alert), 5000);
      const textAlert = await alert.getText();
      

      assert.equal(textAlert, 'Please enter menu name');

    } finally {
      await driver.quit();
    }
  });


});
