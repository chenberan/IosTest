OHA API README

The directory is recommanded to be located at the directory of "oha_api/", if not, 
the directory must be set in oha_config.js file(oha_config.api_path)
**File description:

oha_api.js: oha_api javascript file, jQuery API library file must be included first
oha_api_style.css: style file for oha_api
oha_timer.js: A jQuery plug-in for a countdown timer
oha_uart_terminal.js: A jQuery plug-in  terminal API for UART debugging, developer can
	use it to debug UART function
oha_uart_terminal.css: Style file for oha_uart_terminal.js


**OHA API dedicated function
	oha_api.DevPlugIn()==> OHA Device plug in call back function
		User can override the function with following example:
		oha_api.DevPlugIn=function() {
			// Function code here..
		}

	oha_api.DevPlugOut()==> OHA Device plug out call back function
		User can override the function with following example:
		oha_api.DevPlugOut=function() {
			// Function code here..
		}
===================================================================================
**OHA API command
oha_api.runOhaCmd($cmd) ==> RUN OHA API command
	-$cmd: The command string described in OHA html spec.
oha_api.showToast($msg) ==> Show a view of little message for the UI
	-$msg: The message string for showing
oha_api.setToastPos($percentage)==> Set the position for the toast message
	-$percentage: The percentage from the top position, for example: 90 is
	set the toast position on the 90% of height of the UI display window.
oha_api.setUiAlpha($alpha)==> Set the transparency of the UI. 
	-$alpha: The percentage of transparency, 0~1 is valid, 
		for example. 0.3 is 30% transparency, 1 is solid view(No transparency).
oha_api.cookieRead($key, $default)==> Read the cookie data for specified key.
	cookie is a data with string type, used to keep the value for next time
	usage.
	-$key: Key string for the cookie
	-$default: Default value for the cookie, if the cookie is not written yet, 
		the value return for the command will be $default.
oha_api.cookieWrite($key, $cookieData)==>Write the cookie data for specified key.
	cookie is a data with string type, used to keep the value for next time
	usage.
	-$key: Key string for the cookie
	-$cookieData: The cookie data for writing.
oha_api.cookieRemove($key)==> Remove the cookie data.
	$key: Key string for the cookie
	
oha_api.cookieRemoveAll() ==> Remove all the cookie data for the UI

===================================================================================
**OHA Timer: JQuery plug-in OHA Timer API (Back counting)
1. conductor
	Syntax: $timerObject=jQuery("$selector").oha_timer([$config])
		-$selector: The selector for the timer, it is suggested to be a "div"
		-$config: Optional, a javascript object to config the timer options, the properties is list as below
			- maxTime: Set the max time in unit of "min".
			- minTime: Set the min time in unit of "min".
			- setTime: Set the current timer value in unit of "sec".
			- stepTime: Default increase/decrease timer settings step in unit of "sec".
			- timeup:The call back function for event of timer up.
		return $timerOject: A timer oject which is returned to provide control function for the timer
			

2. timer object function:
	setMax($max): Set the max value for the timer in unit of "sec"
		-$max: Max. value in unit of "sec"
		
	setMin($min): Set the min value for the timer in unit of "sec"
		-$min: Min. value in unit of "sec"

	setTime($time): Set the time in unit of "sec"
		-$time: Curring setting time value in unit of "sec"

	incTime($timeStep): Increase timer setting value with $timeStep, if setting value exceeds
		max value, setting value will not increase.
		-$timeStep: Time step in unit of "sec"
	decTime($timeStep): Decrease timer setting value with $timeStep, if the rest time is less
		then $timeStep, setting value will not decrease.
		-$timeStep: Time step in unit of "sec"
	getRemainTime(): Get the remain time of timer in unit of "sec"
		-Return: The remain time of the timer in unit of sec.
	play(): Play/Resume the timer counting
	pause(): Pause the timer counting
	stop(): Stop the timer counting, the timer will be reset to setting time

===================================================================================
**OHA UART Debug Terminal: JQuery plug-in for UART debug terminal
1. conductor
	Syntax: $terminalObject=jQuery("$selector").oUartTerm([$config])
		-$selector: The selector for the timer, it is suggested to be a "div"
		-$config: Optional, a javascript object to config the timer options, the properties is list as below
			- baudRate: Set the max time in unit of "min".
			- enable: Set the min time in unit of "min".
			- mode: Set the current timer value in unit of "sec".
			- sendHex: Default increase/decrease timer settings step in unit of "sec".
			- maxLine:The call back function for event of timer up.
		return $terminalObject: A terminal oject which is returned to provide control function for the timer

2. terminalObject function:
	devPlugIn(): Send the OHA device plugin event to the oUART terminal for UI response
		
	devPlugOut(): Send the OHA device plugout event to the oUART terminal for UI response

	showRx($recvList): send the received HEX byte string array for the debug terminal to show
		-$recvList: the HEX string array to show, 
			for example, {"00", "11", "22", "33", "44", "55", "66", "77"
			"88", "99", "AA", "BB", "CC", "DD", "EE", "FF"
			}
