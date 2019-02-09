#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')
const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

module.exports = {
  askURL () {
    const questions = [
      {
        name: 'url',
        type: 'input',
        message: 'Enter the URL you want to shorten:',
        validate (value) {
          if (URL_REGEX.test(value)) return true
          else return 'Please give me a valid URL.'
        }
      },
      {
        name: 'customURL',
        type: 'input',
        message: 'Custom Short URL (leave empty for random):'
      }
    ]
    return inquirer.prompt(questions)
  }
}
