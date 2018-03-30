# ExtJS-ActivityMonitor

Ext.ux.ActivityMonitor() is a utility class intended for use with ExtJS 4.x., 5.x, 6.x

ActivityMonitor() watches the browser's BODY element for mouse movement and keystrokes - a realistic way to judge if the user is actively viewing your web application.

*This repo is a fork of https://github.com/arthurakay/ExtJS-Activity-Monitor, which is no more maintained*

### Changelog

### 1.1 30/03/2018

- fork of https://github.com/arthurakay/ExtJS-Activity-Monitor
- the monitor object is now passed to callbacks isActive() and isInactive() : it allows to restart monitor after reaching inactivity limit.  
Example : 
```js
Ext.ux.ActivityMonitor.init({
	isInactive: (monitor) => {
		console.log("User is inactive, should disconnect");
		// then we restart the monitor for further inactivity tracking
		monitor.start();
	}
});
Ext.ux.ActivityMonitor.start();
``` 