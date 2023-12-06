const { Builder, By, until } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

describe("Review Restaurant Feature", function () {

  it("TC01: If user login and submits a review, displayed review must show the username used for login.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/login.php');

      const usernameField = await driver.findElement(By.name('username'));
      const passwordField = await driver.findElement(By.name('password'));
      const loginButton = await driver.findElement(By.id('buttn'));

      const username = "super_z";

      await usernameField.sendKeys(username);
      await passwordField.sendKeys('user1234');

      await loginButton.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/index.php'), 5000);

      const restaurantLink = await driver.findElement(By.id('res'));
      await restaurantLink.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/restaurants.php'), 5000);

      const reviewLink = await driver.findElement(By.id('commentButton2'));
      await reviewLink.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/viewCommentRes.php?res_id=2'), 5000);

      const dropdown = await driver.wait(until.elementLocated(By.id('inputGroupSelect01')), 5000);
      const dropdownOption = await driver.wait(until.elementLocated(By.css('option[value="Service"]')), 5000);

      const detailField = await driver.findElement(By.name('detail'));
      await detailField.sendKeys('so fast');

      const send = await driver.findElement(By.id('commentButtn'));
      send.click();

      const displayUser = await driver.findElement(By.id('user'));
      const text = await displayUser.getText();

      assert.equal(text, username);
    } finally {
      await driver.quit();
    }
  });

  it("TC02: If user not login and submits a review, displayed review must show the username is 'Anonymous'.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/restaurants.php');

      const reviewLink = await driver.findElement(By.id('commentButton3'));
      await reviewLink.click();

      await driver.wait(until.urlIs('http://localhost:8080/cs266_G14/viewCommentRes.php?res_id=3'), 5000);

      const dropdown = await driver.wait(until.elementLocated(By.id('inputGroupSelect01')), 5000);
      const dropdownOption = await driver.wait(until.elementLocated(By.css('option[value="Food"]')), 5000);

      const detailField = await driver.findElement(By.name('detail'));
      await detailField.sendKeys('delicious!!!');

      const send = await driver.findElement(By.id('commentButtn'));
      send.click();

      const displayUser = await driver.findElement(By.id('user'));
      const text = await displayUser.getText();

      assert.equal(text, 'Anonymous');
    } finally {
      await driver.quit();
    }
  });
  it("TC03: If not have review, system should not display review.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/viewCommentRes.php?res_id=4');
      
      const count = await driver.findElement(By.id('count'));
      const countText = await count.getText();
      const countValue = parseInt(countText);

      const reviewItems = await driver.findElements(By.id('displayComment'));
      const numItems = reviewItems.length;

      if (countValue === 0) {
        const displayComments = await driver.findElements(By.id('displayComment'));
        assert.equal(displayComments.length, 0, 'No displayComment elements should be found when count is zero');
      }

    } finally {
      await driver.quit();
    }
  });

  it("TC04: If have multi review, system should calculate average from point of user and count of review correct.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/viewCommentRes.php?res_id=1');
      const num = await driver.findElement(By.id('avgPoint'));
      const avgText = await num.getText();
      const avgValue = parseFloat(avgText);

      const count = await driver.findElement(By.id('count'));
      const countText = await count.getText();
      const countValue = parseInt(countText);

      const reviewItems = await driver.findElements(By.id('displayComment'));
      const numItems = reviewItems.length;

      let sumOfPoints = 0;

      for (const reviewItem of reviewItems) {
          const pointElement = await reviewItem.findElement(By.id('pointUser'));
          const pointText = await pointElement.getText();
          const point = parseFloat(pointText);
    
          sumOfPoints += point;
      }
      const average = sumOfPoints/countValue;
      const roundedAverage = parseFloat(average.toFixed(1));
      assert.equal(roundedAverage, avgValue);

    } finally {
      await driver.quit();
    }
  });
  
});
