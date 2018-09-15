//Fazendo todos os requires que serão utilizados - Selenium (npm install selenium-webdriver) e fs que é nativo.
const webdriver = require("selenium-webdriver");
const fs = require("fs");

//função assíncrona
(async () => {
  //Inicializando o Selenium e esperando ser resolvido para comerçarmos a utilizar o chrome driver
  console.log("Inicializando Aplicação... Aguardando Selenium Server.");
  await new Promise(resolve => setTimeout(resolve, 3000));
  //Instanciando o webdriver + settando o driver do chrome
  const webdriver = require("selenium-webdriver");
  const chrome_1 = require("selenium-webdriver/chrome");
  const builder = await new webdriver.Builder();
  const options = new chrome_1.Options();
  const host = process.env.SELENIUM_HOST || "localhost";
  const port = process.env.SELENIUM_PORT || "4444";
  const driver = builder
    .forBrowser("chrome")
    //para pegar do DOCKER
    .usingServer(`http://${host}:${port}/wd/hub`)
    .setChromeOptions(options)
    .build();
  //Navegando para o facebook - Inserindo Email + Senha
  await driver.get("https://www.facebook.com/");
  await driver.findElement(webdriver.By.id("email")).sendKeys("email");
  await driver.findElement(webdriver.By.id("pass")).sendKeys("senha");
  await driver.findElement(webdriver.By.id("u_0_2")).click();
  //Aguardando facebook logar para os próximos passos.
  await driver.sleep(5000);
  await driver.findElement(webdriver.By.tagName("body")).click();
  await driver.sleep(5000);
  //Indo para o perfil
  await driver.findElement(webdriver.By.className("_2s25 _606w")).click();
  await driver.sleep(5000);
  //Escrevendo um post e enviando
  await driver
    .findElement(webdriver.By.className("notranslate _5rpu"))
    .sendKeys("Hello World - Postagem automatizada");
  await driver
    .findElement(
      webdriver.By.className(
        "_1mf7 _4r1q _4jy0 _4jy3 _4jy1 _51sy selected _42ft "
      )
    )
    .click();

  //Após postagem, tiramos um print da página.
  await driver.sleep(5000);
  const image = await driver.takeScreenshot();
  fs.writeFileSync("out.png", image, "base64");

  //Aqui é o comando para pesquisar pessoas... {
  //await driver.findElement(webdriver.By.name("q")).sendKeys("teste");
  //await driver.findElement(webdriver.By.className("_42ft _4jy0 _4w98 _4jy3 _517h _51sy _4w97")).click();
  // }

  await driver.quit();
})();
