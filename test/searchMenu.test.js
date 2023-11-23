const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const { expect } = require('chai');
const assert = chai.assert;

describe("Menu Search", function () {

    it("Should display menu information when searching with a valid menu name", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:8080/cs266_G14/dishes.php?res_id=1');

        const searchInput = await driver.wait(until.elementLocated(By.id('searchMenu')), 5000);
        await searchInput.sendKeys('Yorkshire Lamb Patties', Key.RETURN);


        const listItem = await driver.wait(until.elementLocated(By.xpath('//*[@id="popular2"]/div/div/div[1]/form/div[2]/h6/a')), 10000);
        await driver.wait(until.elementIsVisible(listItem), 5000);
        const textInsideElement = await listItem.getText();

        assert.equal(textInsideElement, 'Yorkshire Lamb Patties');
    } finally {
        await driver.quit();
    }
});

it("Should display all menu items containing the searched character", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:8080/cs266_G14/dishes.php?res_id=1');

        const searchInput = await driver.wait(until.elementLocated(By.id('searchMenu')), 5000);
        await searchInput.sendKeys('t', Key.RETURN);

        const menuItems = await driver.wait(until.elementsLocated(By.css('.food-item')), 10000);
        await driver.wait(until.elementIsVisible(menuItems[0]), 5000);
        
        const numberOfItems = menuItems.length;
        //console.log(numberOfItems);

        // Check if there are menu items displayed
        assert.isAbove(numberOfItems, 0, 'At least one menu item should be displayed');

        for (let i = 0; i < numberOfItems; i++) {

            const menuTitle = await menuItems[i].findElement(By.css('h6 a')).getText();
            const includesT = menuTitle.includes('t');
            
            expect(includesT).to.be.true;
        }
        
    } finally {
        await driver.quit();
    }
});



it("Should display message 'Please enter menu name' when click search without empty input", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/dishes.php?res_id=1');

      const searchInput = await driver.wait(until.elementLocated(By.id('searchMenu')), 5000);
      await searchInput.sendKeys('', Key.RETURN);

      const alert = await driver.wait(until.elementLocated(By.id('alertNotInput')), 5000);
      await driver.wait(until.elementIsVisible(alert), 5000);
      const textAlert = await alert.getText();
      

      assert.equal(textAlert, 'Please enter menu name');

    } finally {
      await driver.quit();
    }
});

it("Should display message 'Menu not found!!' when search with invalid menu name.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/dishes.php?res_id=1');

      const searchInput = await driver.wait(until.elementLocated(By.id('searchMenu')), 5000);
      await searchInput.sendKeys('Lobz', Key.RETURN);

      const alert = await driver.wait(until.elementLocated(By.id('alertNotFound')), 5000);
      await driver.wait(until.elementIsVisible(alert), 5000);
      const textAlert = await alert.getText();
      

      assert.equal(textAlert, 'Menu not found!!');

    } finally {
      await driver.quit();
    }
});

it("Should display message 'Menu not found!!' when search with character that are not part of all menu name.", async function () {
    this.timeout(10000000);

    let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get('http://localhost:8080/cs266_G14/dishes.php?res_id=1');

      const searchInput = await driver.wait(until.elementLocated(By.id('searchMenu')), 5000);
      await searchInput.sendKeys('x', Key.RETURN);

      const alert = await driver.wait(until.elementLocated(By.id('alertNotFound')), 5000);
      await driver.wait(until.elementIsVisible(alert), 5000);
      const textAlert = await alert.getText();
      

      assert.equal(textAlert, 'Menu not found!!');

    } finally {
      await driver.quit();
    }
});


});