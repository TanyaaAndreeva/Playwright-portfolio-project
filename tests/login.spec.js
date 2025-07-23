import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});



test('TC2: Add product to basket', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

test('TC3: Remove product from basket', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(0);
});

test('TC4: Sort products by price: High to Low', async ({ page }) => {
 
  await page.waitForSelector('.inventory_item');


  await page.click('//*[@id="header_container"]/div[2]/div/span');

  await page.selectOption('[data-test="product-sort-container"]', { value: 'hilo' });


  await page.waitForTimeout(1000);

  
  const prices = await page.$$eval('.inventory_item_price', els =>
    els.map(el => parseFloat(el.textContent.replace('$', '')))
  );

  console.log('Prices after sorting:', prices);

  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
  }
});
test('TC5: Sort products by price: Low to High', async ({ page }) => {
 
  await page.waitForSelector('.inventory_item');


  await page.click('//*[@id="header_container"]/div[2]/div/span');

  await page.selectOption('[data-test="product-sort-container"]', { value: 'lohi' });


  await page.waitForTimeout(1000);

  
  const prices = await page.$$eval('.inventory_item_price', els =>
    els.map(el => parseFloat(el.textContent.replace('$', '')))
  );

  console.log('Prices after sorting:', prices);

  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
  }
});
test('TC6: Sort products alphabetically: A to Z', async ({ page }) => {
 
  await page.waitForSelector('.inventory_item');

  await page.click('//*[@id="header_container"]/div[2]/div/span');

  await page.selectOption('[data-test="product-sort-container"]', { value: 'az' });


  await page.waitForTimeout(1000);

    const productNames = await page.$$eval('.inventory_item_name', elements =>
    elements.map(el => el.textContent.trim())
  );

  const sortedNames = [...productNames].sort();
  expect(productNames).toEqual(sortedNames);
});
test('TC7: Sort products alphabetically: Z to A', async ({ page }) => {
 
  await page.waitForSelector('.inventory_item');

  await page.click('//*[@id="header_container"]/div[2]/div/span');

  await page.selectOption('[data-test="product-sort-container"]', { value: 'za' });

  await page.waitForTimeout(1000);

   
  const productNames = await page.$$eval('.inventory_item_name', elements =>
    elements.map(el => el.textContent.trim())
  );

  const sortedNamesDesc = [...productNames].sort().reverse();
  expect(productNames).toEqual(sortedNamesDesc);
});

test('TC8: Complete checkout process', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'Tanya');
  await page.fill('[data-test="lastName"]', 'Andreeva');
  await page.fill('[data-test="postalCode"]', 'JE2 3ZY');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
test('TC9: Checkout fails when required fields are missing', async({page})=>{
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', '');
   await page.fill('[data-test="lastName"]', 'Andreeva');
  await page.fill('[data-test="postalCode"]', 'JE2 3ZY');
  await page.click('[data-test="continue"]');

  const errormsg= page.locator('[data-test="error"]');

  await expect(errormsg).toContainText("Error: First Name is required") ;

});

test('TC10: Logout from the system', async ({ page }) => {
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('TC11: Login fails with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'invalid_user');
  await page.fill('[data-test="password"]', 'wrong_password');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

test('TC12: Login fails with SQL code', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', '=');
  await page.fill('[data-test="password"]', '=');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('TC13: Login fails with locked out user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'locked_out_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});

test('TC14: Login fails with no user information', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', '');
  await page.fill('[data-test="password"]', '');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
});
test('TC15: Cart persist after page refresh', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

  await page.reload();

  await expect(page.locator('[class="shopping_cart_badge"]')).toHaveCount(1);

});
test('TC16: Remove one item after adding two to shopping cart', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('//*[@id="add-to-cart-sauce-labs-bike-light"]');

  await expect(page.locator('[class="shopping_cart_badge"]')).toHaveText('2');

  await page.click('//a[@class="shopping_cart_link"]');

  await page.click('[id="remove-sauce-labs-backpack"]');

  const products = await page.$$('.cart_item');

  await page.pause();
  expect(products.length).toBe(1);

});
test('TC17: Shoping cart remeber choise after logout', async({ page })=> {

  await page.click('[id="add-to-cart-sauce-labs-bolt-t-shirt"]');

  await page.click('[id="react-burger-menu-btn"]');
  await page.click('[id="logout_sidebar_link"]');
 
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[class="shopping_cart_badge"]')).toHaveText('1');


});