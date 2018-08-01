const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')
const os = require('os')

let timeReported = 0

const secondsToHms = d => {
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor(d % 3600 % 60)

    const hDisplay = h > 0 ? h + "h" : ""
    const mDisplay = m > 0 ? m + "m" : ""
    const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
    return hDisplay + " " + mDisplay
}

const getUptime = () => secondsToHms(os.uptime())

console.log(
    chalk.blue(
      figlet.textSync('Tempo-CLI', { horizontalLayout: 'full' })
    )
)

console.log(chalk.yellow.bold(`You have worked for: ${getUptime()}`))

const prompt = () => {
  const question = {
    name: 'time',
    type: 'input',
    message: `Time remaining to book: ${secondsToHms(os.uptime() - timeReported)}`
  }

  inquirer.prompt(question).then(answer => {
    timeReported += Number(answer.time)

    if (os.uptime() > timeReported + 900) {
      // Time still needs to be reported
      prompt()
    } else { 
      console.log(chalk.yellow.bold('You have booked all of your time, congrats!'))
    }
  })
}

prompt()

