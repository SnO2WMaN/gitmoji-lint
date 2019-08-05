const emojis = [
	':art:',
	':newspaper:',
	':pencil:',
	':memo:',
	':zap:',
	':fire:',
	':books:',
	':bug:',
	':ambulance:',
	':penguin:',
	':apple:',
	':checkered_flag:',
	':robot:',
	':green_ale:',
	':tractor:',
	':recycle:',
	':white_check_mark:',
	':microscope:',
	':green_heart:',
	':lock:',
	':arrow_up:',
	':arrow_down:',
	':fast_forward:',
	':rewind:',
	':rotating_light:',
	':lipstick:',
	':wheelchair:',
	':globe_with_meridians:',
	':construction:',
	':gem:',
	':bookmark:',
	':tada:',
	':loud_sound:',
	':mute:',
	':sparkles:',
	':speech_balloon:',
	':bulb:',
	':construction_worker:',
	':chart_with_upwards_trend:',
	':ribbon:',
	':rocket:',
	':heavy_minus_sign:',
	':heavy_plus_sign:',
	':wrench:',
	':hankey:',
	':leaves:',
	':bank:',
	':whale:',
	':twisted_rightwards_arrows:',
	':pushpin:',
	':busts_in_silhouette:',
	':children_crossing:',
	':building_construction:',
	':iphone:',
	':clown_face:',
	':ok_hand:',
	':boom:',
	':bento:',
	':pencil2:',
	':package:',
	':alien:',
	':truck:',
	':age_facing_up:',
	':busts_in_silhouette:',
	':card_file_box:',
	':loud_sound:',
	':mute:',
	':egg:',
	':see_no_evil:',
	':camera_flash:',
	':alembic:',
	':mag:',
	':wheel_of_dharma:',
	':label:'
]

const { unemojify } = require('node-emoji')
const colors = require('colors/safe')

if (!process.argv[2]) {
	console.error(`🚨  ${colors.red('No Commit Message')}.`)
	return false
}

const commitmsg = process.argv[2]
const unemojifyMsg = unemojify(commitmsg)

if (!/^:.*:/.test(unemojifyMsg)) {
	console.error(`🚨  ${colors.magenta(commitmsg)}`)
	console.error(`No emoji prefix.`)
	return false
}

const emoji = /^:.*:/.exec(unemojifyMsg)[0]

if (!emojis.includes(emoji)) {
	console.error(`🚨  ${colors.cyan(commitmsg)}`)
	console.error(`${emoji} is not supported.`)
	return false
}
console.log(`🆗  ${colors.cyan(commitmsg)}`)
