const puppeteer = require('puppeteer')
const perf = require('execution-time')()
const chalk = require('chalk')
const emoji = require('node-emoji')
require('dotenv').config()
const log = console.log

const SITE = process.env.SITE

perf.start()
log(`${emoji.find('truck').emoji} Loading daily text`)

puppeteer
  .launch()
  .then(async browser => {
    const page = await browser.newPage()
    await page.goto(SITE)

    const date = await page.$eval('header h2', el => el.textContent)
    const scripture = await page.$eval('.themeScrp', el => el.textContent)
    const comment = await page.$eval('.bodyTxt', el => el.textContent)

    await browser.close()

    log(chalk.green('\n' + date))
    log(scripture)
    log(comment)

    const execTime = perf.stop()
    const execSec = execTime.time / 1000
    log(`\n${emoji.find('sparkles').emoji} Finished in ${execSec.toFixed(2)}s`)
  })
  .catch(err => {
    log(err)
  })
