import test from 'ava'
import { promisify } from 'util'
import { execFile } from 'child_process'

const cli = promisify(execFile)

test('Correct commit msg (emoji ver)', async t => {
	await cli('node', ['./index.js', '-m', '🎨 commitmsg'])
	t.pass()
})

test('Correct commit msg (text ver)', async t => {
	await cli('node', ['./index.js', '-m', ':art: commitmsg'])
	t.pass()
})

test('Correct commit msg (env ver)', async t => {
	process.env.HUSKY_GIT_PARAMS = '🎨 commitmsg'
	await cli('node', ['./index.js', '-e', 'HUSKY_GIT_PARAMS'])
	t.pass()
	delete process.env.HUSKY_GIT_PARAMS
})

test('Incorrect commit msg (no message)', async t => {
	await t.throwsAsync(async () => await cli('node', ['./index.js']))
})

test('Incorrect commit msg (no emoji prefix)', async t => {
	await t.throwsAsync(
		async () => await cli('node', ['./index.js', '-m', 'commitmsg'])
	)
})

test('Incorrect commit msg (not supported emoji prefix)', async t => {
	await t.throwsAsync(
		async () => await cli('node', ['./index.js', '-m', '🔫 commitmsg'])
	)
})

test('Incorrect commit msg (no title only prefix emoji)', async t => {
	await t.throwsAsync(async () => await cli('node', ['./index.js', '-m', '🎨']))
})

test('Incorrect commit msg (no space after prefix emoji)', async t => {
	await t.throwsAsync(
		async () => await cli('node', ['./index.js', '-m', '🎨commitmsg'])
	)
})
