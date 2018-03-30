# ExtJS-ActivityMonitor
Activity user tracking for ExtJS application

*This repo is a fork of https://github.com/arthurakay/ExtJS-Activity-Monitor, which is no more maintained*

### Changelog

### 1.1

- fork of https://github.com/arthurakay/ExtJS-Activity-Monitor
- the monitor object is now passed to callbacks isActive() and isInactive() : it allows to restart monitor after reaching inactivity limit.  
Example : 
```js
Ext.ux.ActivityMonitor.init({
	isInactive: (monitor) => {
		console.log("User is inactive, should disconnect);
		// then we restart the monitor for further inactivity tracking
		monitor.start();
	}
});
Ext.ux.ActivityMonitor.start();
``` 