# ExtJS-ActivityMonitor

Ext.ux.ActivityMonitor() is a utility class intended for use with ExtJS 4.x., 5.x, 6.x

ActivityMonitor() watches the browser's BODY element for mouse movement and keystrokes - a realistic way to judge if the user is actively viewing your web application.

*This repo is a fork of https://github.com/arthurakay/ExtJS-Activity-Monitor, which is no more maintained*

This component is used in Arhia applications and we aim to maintain it.

### Usage  

```js
Ext.ux.ActivityMonitor.init({ verbose : true });
Ext.ux.ActivityMonitor.start();
```

Configs:

  - verbose (Boolean): Whether or not the ActivityMonitor() should output messages to the JavaScript console.
  - interval (Integer): How often (in millseconds) the monitorUI() method is executed after calling start()
  - maxInactive (Integer): The longest amount of time to consider the user "active" without regestering new mouse movement or keystrokes
  - isActive (Function): Called each time monitorUI() detects the user is currently active (defaults to Ext.emptyFn)
  - isInactive (Funtion): Called when monitorUI() detects the user is inactive (defaults to Ext.emptyFn)

### Changelog

### 1.1

- initial fork
- the monitor object is now passed to callbacks `isActive()` and `isInactive()` : it's convenient to restart monitor after reaching inactivity limit.  
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
