const puppeteer = require("puppeteer");
const shell = require("inquirer");

const choices = [
  { value: "ARS", name: "Argentine peso" },
  { value: "AUD", name: "Australian Dollar" },
  { value: "BRL", name: "Brazilian real" },
  { value: "GBP", name: "British pound" },
  { value: "CAD", name: "Canadian dollar" },
  { value: "CLP", name: "Chilean peso" },
  { value: "CNY", name: "Chinese yuan" },
  { value: "COP", name: "Colombian peso" },
  { value: "EUR", name: "Euro" },
  { value: "JPY", name: "Japanese yen" },
  { value: "PYG", name: "Paraguayan guaraní" },
  { value: "USD", name: "United States dollar" },
  { value: "UYU", name: "Uruguayan peso" },
];

const getUrl = ({ from, to }) => {
  return encodeURI(`https://www.google.com/search?q=${from} to ${to}`);
};

const run = async ({ from, to }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(getUrl({ from, to }));
  const data = await page.evaluate(() => {
    return {
      from: Number(
        document.querySelector(".ZEB7Fb.vk_gy.vk_sh.Hg3mWc").value
      ).toFixed(2),
      to: Number(
        document.querySelector(".a61j6.vk_gy.vk_sh.Hg3mWc").value
      ).toFixed(2),
    };
  });
  browser.close();
  console.log(`${data.from} ${from} is equal to ${data.to} ${to}`);
};

shell
  .prompt({
    name: "from",
    message: "What is the initial currency?",
    type: "list",
    choices: choices,
  })
  .then(({ from }) => {
    shell
      .prompt({
        name: "to",
        message: "What is the final currency?",
        type: "list",
        choices: choices.filter((c) => c.value !== from),
      })
      .then(({ to }) => run({ from, to }));
  });
