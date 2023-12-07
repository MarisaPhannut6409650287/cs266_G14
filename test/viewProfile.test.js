const { Builder, By, until } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

describe("View Personal Information Feature", function () {

  it("TC01: When user login, system should show 'My Profile' for view personal information in top menu bar.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/login.php');

      const usernameField = await driver.findElement(By.name('username'));
      const passwordField = await driver.findElement(By.name('password'));
      const loginButton = await driver.findElement(By.id('buttn'));

      const username = "helloWorld";

      await usernameField.sendKeys(username);
      await passwordField.sendKeys('user1234');

      await loginButton.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/index.php'), 5000);

      const profileLink = await driver.findElement(By.id('myProfile'));
      const display =await profileLink.isDisplayed();

      assert.isTrue(display);

    } finally {
      await driver.quit();
    }
  });

  it("TC02: When user login, system should show username same login used.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/login.php');

      const usernameField = await driver.findElement(By.name('username'));
      const passwordField = await driver.findElement(By.name('password'));
      const loginButton = await driver.findElement(By.id('buttn'));

      const username = "helloWorld";

      await usernameField.sendKeys(username);
      await passwordField.sendKeys('user1234');

      await loginButton.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/index.php'), 5000);

      const profileLink = await driver.findElement(By.id('myProfile'));
      await profileLink.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/profile.php'), 5000);
      
      const user = await driver.wait(until.elementLocated(By.id('userN')), 5000);
      const text = await user.getText();

      assert.equal(text, username);

    } finally {
      await driver.quit();
    }
  });

  it("TC03: When user login and click 'My Profile' at top menu bar, should show firstname, surname, email, phone and address as registered.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/login.php');

      const usernameField = await driver.findElement(By.name('username'));
      const passwordField = await driver.findElement(By.name('password'));
      const loginButton = await driver.findElement(By.id('buttn'));

      const username = "helloWorld";
      const firsname = "John";
      const lastname = "Doe";
      const email = "user@hotmail.com";
      const phone = "0897654536";
      const address = "dcon";

      await usernameField.sendKeys(username);
      await passwordField.sendKeys('user1234');

      await loginButton.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/index.php'), 5000);

      const profileLink = await driver.findElement(By.id('myProfile'));
      await profileLink.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/profile.php'), 5000);
      
      const fisrt = await driver.wait(until.elementLocated(By.id('first')), 5000);
      const firstText = await fisrt.getText();
      assert.equal(firsname,firstText);

      const last = await driver.wait(until.elementLocated(By.id('last')), 5000);
      const lastText = await last.getText();
      assert.equal(lastname,lastText);

      const em = await driver.wait(until.elementLocated(By.id('email')), 5000);
      const emText = await em.getText();
      assert.equal(email, emText);

      const ph = await driver.wait(until.elementLocated(By.id('phone')), 5000);
      const phText = await ph.getText();
      assert.equal(phone, phText);

      const ad = await driver.wait(until.elementLocated(By.id('address')), 5000);
      const adText = await ad.getText();
      assert.equal(address, adText);


    } finally {
      await driver.quit();
    }
  });

  it("TC04: When user not login, should not show 'My Profile' at top menu bar.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/index.php');

      const profileLink = await driver.findElement(By.id('myProfile'));
      const isDisplayed = await profileLink.isDisplayed();
      assert.isFalse(isDisplayed);
    
      
    }catch (error) {

        if (error.name === 'NoSuchElementError') {
            console.log("Element with id 'myProfile' not found. Test passed.");
            return; 
        }

        throw error;

    } finally {

      await driver.quit();
    }
  });

  
});