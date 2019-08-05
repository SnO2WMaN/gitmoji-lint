#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const { unemojify, emojify } = require('node-emoji')
const colors = require('colors/safe')
const emojis = require('./emojis')
const { readFileSync } = require('fs')

const options = commandLineArgs([
	{ name: 'message', alias: 'm', defaultValue: null, type: String },
	{ name: 'husky', alias: 'h', defaultValue: false, type: Boolean }
])

if (!options.husky && !options.message) {
	console.error(`🚨  ${colors.red('No Commit Message')}.`)
	process.exit(1)
}

const commitmsg = options.husky
	? readFileSync(process.env.HUSKY_GIT_PARAMS, { encoding: 'utf8' }).split(
			'\n'
	  )[0]
	: options.message

const unemojifyMsg = unemojify(commitmsg)
const type = commitmsg.charAt(0) === ':'

if (!/^:.*:/.test(unemojifyMsg)) {
	console.error(`🚨  ${colors.red(`"${commitmsg}"`)}`)
	console.error(`No emoji prefix.`)
	process.exit(1)
}

const emoji = /^:.*:/.exec(unemojifyMsg)[0]

if (!emojis.includes(emoji)) {
	console.error(`🚨  ${colors.red(`"${commitmsg}"`)}`)
	console.error(`${type ? emoji : emojify(emoji)} is not supported.`)
	process.exit(1)
}

if (unemojifyMsg.length === emoji.length) {
	console.error(`🚨  ${colors.red(`"${commitmsg}"`)}`)
	console.error(`Commit message must have a title.`)
	process.exit(1)
}

if (unemojifyMsg.charAt(emoji.length) != ' ') {
	console.error(`🚨  ${colors.red(`"${commitmsg}"`)}`)
	console.error(
		`The character after ${type ? emoji : emojify(emoji)} must be space.`
	)
	process.exit(1)
}

console.log(`🆗  "${colors.cyan(commitmsg)}"`)
