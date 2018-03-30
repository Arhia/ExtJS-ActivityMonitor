/**
 * @class Ext.ux.ActivityMonitor
 * @version 1.1
 * @example
 *   Ext.ux.ActivityMonitor.init({ verbose : true });
 *   Ext.ux.ActivityMonitor.start();
 **/
Ext.define('Ext.ux.ActivityMonitor', {
    singleton: true,
    ui: null,
    runner: null,
    task: null,
    lastActive: null,
    ready: false,
    /** (Boolean): Whether or not the ActivityMonitor() should output messages to the JavaScript console. */
    verbose: false,
    /** interval (Integer): How often (in milliseconds) the monitorUI() method is executed after calling start() */
    interval: (1000 * 60 * 1), // 1 minute
    /** maxInactive (Integer): The longest amount of time to consider the user "active" without regestering new mouse movement or keystrokes */
    maxInactive: (1000 * 60 * 5), // 5 minutes
    /**
     * isActive (Function): Called each time monitorUI() detects the user is currently active (defaults to Ext.emptyFn)
     * the monitor is passed (this) as first argument
     */
    isActive: Ext.emptyFn,
    /**
     * isInactive (Funtion): Called when monitorUI() detects the user is inactive (defaults to Ext.emptyFn)
     * the monitor is passed (this) as first argument
     */
    isInactive: Ext.emptyFn,
    init: function(config) {
        if (!config) { config = {}; }

        Ext.apply(this, config, {
            runner: new Ext.util.TaskRunner(),
            ui: Ext.getBody(),
            task: {
                run: this.monitorUI,
                interval: config.interval || this.interval,
                scope: this
            }
        });

        this.ready = true;
    },

    isReady: function() {
        return this.ready;
    },

    start: function() {
        if (!this.isReady()) {
            this.log('Please run ActivityMonitor.init()');
            return false;
        }

        this.ui.on('mousemove', this.captureActivity, this);
        this.ui.on('keydown', this.captureActivity, this);

        this.lastActive = new Date();
        this.log('ActivityMonitor has been started.');

        this.runner.start(this.task);
    },

    stop: function() {
        if (!this.isReady()) {
            this.log('Please run ActivityMonitor.init()');
            return false;
        }

        this.runner.stop(this.task);
        this.lastActive = null;

        this.ui.un('mousemove', this.captureActivity);
        this.ui.un('keydown', this.captureActivity);

        this.log('ActivityMonitor has been stopped.');
    },

    captureActivity: function(eventObj, el, eventOptions) {
        this.lastActive = new Date();
    },

    monitorUI: function() {
        var now = new Date();
        var inactive = (now - this.lastActive);

        if (inactive >= this.maxInactive) {
            this.log('MAXIMUM INACTIVE TIME HAS BEEN REACHED');
            this.stop(); //remove event listeners

            this.isInactive(this);
        }
        else {
            this.log('CURRENTLY INACTIVE FOR ' + inactive + ' (ms)');
            this.isActive(this);
        }
    },

    log: function(msg) {
        if (this.verbose) {
            window.console.log(msg);
        }
    }

});
