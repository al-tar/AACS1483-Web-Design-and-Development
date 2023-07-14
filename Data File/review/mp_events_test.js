const { chromium } = require('playwright');
const { expect } = require('chai');

async function runTest() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Load the HTML file
  await page.goto('mp_events.html');

  // Verify the page title
  const pageTitle = await page.title();
  expect(pageTitle).to.equal('Mobile Panini Events Calendar');

  // Verify the presence of the header, footer, and article elements
  const header = await page.$('header');
  const footer = await page.$('footer');
  const article = await page.$('article');
  expect(header).to.exist;
  expect(footer).to.exist;
  expect(article).to.exist;

  // Verify the presence of specific elements within the article
  const articleTitle = await article.$eval('h1', (el) => el.innerText);
  expect(articleTitle).to.equal('Where Are We This Week?');

  // Verify the presence of navigation links within the header
  const navLinks = await header.$$('nav a');
  expect(navLinks.length).to.equal(4);
  const navLinkTexts = await Promise.all(navLinks.map((link) => link.innerText()));
  expect(navLinkTexts).to.deep.equal(['Home', 'Menu', 'Events', 'Catering']);

  // Verify the presence of specific event details within the article
  const eventDetails = await article.$$('div');
  expect(eventDetails.length).to.equal(7);

  // Verify the presence of the footer text
  const footerText = await footer.innerText();
  expect(footerText).to.include('Mobile Panini');

  // Additional assertions and verifications can be added as needed

  await browser.close();
}

runTest();
