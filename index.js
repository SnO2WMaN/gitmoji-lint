#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const { unemojify, emojify } = require('node-emoji')
const colors = require('colors/safe')
const emojis = require('./emojis')

const options = commandLineArgs([{ name: 'message', alias: 'm', type: String }])

if (!options.message) {
	console.error(`🚨  ${colors.red('No Commit Message')}.`)
	process.exit(1)
}

const commitmsg = options.message
const unemojifyMsg = unemojify(commitmsg)
const type = commitmsg.charAt(0) === ':'

if (!/^:.*:/.test(unemojifyMsg)) {
	console.error(`🚨  "${colors.magenta(commitmsg)}"`)
	console.error(`No emoji prefix.`)
	process.exit(1)
}

const emoji = /^:.*:/.exec(unemojifyMsg)[0]

if (!emojis.includes(emoji)) {
	console.error(`🚨  "${colors.cyan(commitmsg)}"`)
	console.error(`${type ? emoji : emojify(emoji)} is not supported.`)
	process.exit(1)
}

if (unemojifyMsg.length === emoji.length) {
	console.error(`🚨  "${colors.cyan(commitmsg)}"`)
	console.error(`Commit message must have a title.`)
	process.exit(1)
}

if (unemojifyMsg.charAt(emoji.length) != ' ') {
	console.error(`🚨  "${colors.cyan(commitmsg)}"`)
	console.error(
		`The character after ${type ? emoji : emojify(emoji)} must be space.`
	)
	process.exit(1)
}

console.log(`🆗  "${colors.cyan(commitmsg)}"`)
