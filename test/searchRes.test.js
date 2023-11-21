const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

describe("Menu Search", function () {

it("Should display menu information when searching with a valid menu name", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/Online-Food-Ordering-System-in-PHP-main/dishes.php?res_id=1');

      // Wait for the search input to be visible
      const searchInput = await driver.wait(until.elementLocated(By.name('search')), 5000);
      await searchInput.sendKeys('Yorkshire Lamb Patties', Key.RETURN);

      // Wait for the search button to be clickable
      const searchButton = await driver.wait(until.elementLocated(By.id('searchButton')), 5000);
      await searchButton.click();
      await driver.sleep(10000);
      // Wait for the menu information element to be visible
      const menuInfoElement = await driver.wait(until.elementLocated(By.id('menuList')), 5000);
      const displayMenuName = await menuInfoElement.getText();

      assert.equal(displayMenuName, 'Yorkshire Lamb Patties');
    } finally {
      await driver.quit();
    }
  });


});
