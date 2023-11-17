const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

describe("Menu Search", function () {

  it("Should display menu information when searching with a valid menu name", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/Online-Food-Ordering-System-in-PHP-main/dishes.php?res_id=1');

      await driver.sleep(3000)
      
      const searchInput = By.id('searchMenu');

      await driver.wait(until.elementIsVisible(driver.findElement(searchInput)), 2000);
      
      const menuName = "Lobster Thermidor";
      await searchInput.sendKeys(menuName);

      await searchInput.sendKeys(Key.RETURN);

      await driver.wait(until.titleIs('Search Menu: '+ menuName), 2000);

      const menuInfoElement = await driver.findElement(By.id("menuList"));
      const displayMenuName = await menuInfoElement.getText();

      assert.equal(displayMenuName, menuName);

    } finally {
      await driver.quit();
    }
  });

  it("When type some character, all menu information in the database containing that character will be displayed", async function () {

    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/Online-Food-Ordering-System-in-PHP-main/dishes.php?res_id=1');

      await driver.sleep(3000)
      
      const searchInput = By.id('searchMenu');

      await driver.wait(until.elementIsVisible(driver.findElement(searchInput)), 2000);
      
      const menuName = "T";
      await searchInput.sendKeys(menuName);

      await searchInput.sendKeys(Key.RETURN);

      await driver.wait(until.titleIs('Search Menu: '+ menuName), 2000);

      const menuInfoElement = await driver.findElement(By.id("menuList"));
      const displayMenuName = await menuInfoElement.getText();

      assert.equal(displayMenuName, menuName);

    } finally {
      await driver.quit();
    }
  });

  //invalid case
  it("Should not display menu information when searching with a invalid menu name", async function () {

    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/Online-Food-Ordering-System-in-PHP-main/dishes.php?res_id=1');

      await driver.sleep(3000)
      
      const searchInput = By.id('searchMenu');

      await driver.wait(until.elementIsVisible(driver.findElement(searchInput)), 2000);
      
      await driver.wait(until.titleIs('Search Menu: '+ invalidMenu), 2000);

      const invalidMenuName = "Fish and Chips";

        await searchInput.sendKeys(invalidMenuName);
        await searchInput.sendKeys(Key.RETURN);

        await driver.sleep(3000);

        const menuInfoElement = await driver.findElement(By.id("menuList"));
        const isMenuInfoElementDisplay = await menuInfoElement.isDisplayed();
        assert.isFalse(isMenuInfoElementDisplay, 'Menu information element should not be present for an invalid menu');

    } finally {
      await driver.quit();
    }
  });

  it("Should not display menu information when searching with some characters are not available in all menu information", async function () {

    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/Online-Food-Ordering-System-in-PHP-main/dishes.php?res_id=1');

      await driver.sleep(3000)
      
      const searchInput = By.id('searchMenu');

      await driver.wait(until.elementIsVisible(driver.findElement(searchInput)), 2000);
      
      await driver.wait(until.titleIs('Search Menu: '+ invalidMenu), 2000);

      const invalidMenuName = "Lobz";

        await searchInput.sendKeys(invalidMenuName);
        await searchInput.sendKeys(Key.RETURN);

        await driver.sleep(3000);

        const menuInfoElement = await driver.findElement(By.id("menuList"));
        const isMenuInfoElementDisplay = await menuInfoElement.isDisplayed();
        assert.isFalse(isMenuInfoElementDisplay, 'Menu information element should not be present for an invalid menu');

    } finally {
      await driver.quit();
    }
  });
  
  it("Should display 'Please enter menu name' message when the user does not type anything in the search box and presses search", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:8080/Online-Food-Ordering-System-in-PHP-main/dishes.php?res_id=1');

        await driver.sleep(3000);

        const searchInput = By.id('searchMenu');
        const searchButton = By.id('searchButton');

        await driver.wait(until.elementIsVisible(driver.findElement(searchInput)), 2000);

        await driver.findElement(searchButton).click();

        await driver.sleep(2000);

        const errorMessageElement = await driver.findElement(By.id('errorMessage'));

        const isErrorMessageDisplayed = await errorMessageElement.isDisplayed();
        
        assert.isTrue(isErrorMessageDisplayed, 'Please enter menu name');


    } finally {
        await driver.quit();
    }
});


  

});
