const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const snekfetch = require('snekfetch')
const ora = require('ora')

const { Inquirer } = require('./lib/')

const BASE_URL = 'https://bee.fail'
const URL_REGEX = /^(http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

const log = (data) => console.log(chalk.green(data))

clear()

log(figlet.textSync('bee.fail', 'Doom'))
log(`v${require('./package.json').version}`)

const run = async () => {
  let { url, customURL } = await Inquirer.askURL()
  const spinner = ora('Generating URL').start()

  if (!URL_REGEX.test(url)) url = `https://${url}`
  if (!customURL) customURL = ''

  const { body } = await snekfetch.post(BASE_URL + '/short').send({ url, custom: customURL })

  if (!body.sucess) return spinner.fail(body.err)
  else return spinner.succeed(`URL generated successfully! ${BASE_URL}/${body.data.shorturl}`)
}

run()
