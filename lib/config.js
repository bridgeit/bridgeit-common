var config = {};

//Overall environment settings are stored under config.env
config.env = {};
config.env.prod = (process.env.NODE_ENV === 'production') ? 'production' : null;

var LOCAL_HOST = 'localhost';
var DEV_HOST = 'dev.voyent.cloud';
var PROD_HOST = 'api.voyent.cloud';

config.env.host = DEV_HOST;
if (process.env.VOYENT_HOST) {
    config.env.host = process.env.VOYENT_HOST;
}

if (process.env.DOCKER_LOCAL) {
    config.env.docker = {
        db: 'db:27017',
        cloud: 'cloud:8080',
        event: 'event:55050',
        auth: 'auth:55010',
        locate: 'locate:55020',
        storage: 'storage:55030',
        query: 'query:55110',
        mailbox: 'mailbox:55120',
        action: 'action:55130',
        push: 'push:55140',
        pushio: 'push:55145',
        msgs: 'msgs:1883',
        doc: 'docs:55080',
        scheduling: 'scheduling:55087',
        broadcast: 'broadcast:50087',
        eventhub: 'eventhub:55200',
        device: 'device:55160',
        process: 'process:55300',
        scope: 'scope:55400',
        notify: 'notify:8080',
        activity: 'activity:55500',
        vsa: 'vsa:55510'
    };
}

//Check for the env variable RUNTIME_ENV.  Default to using Docker
//containers but also support localhost, dev, and prod.
process.env.RUNTIME_ENV = process.env.RUNTIME_ENV || 'container';
if (process.env.RUNTIME_ENV === 'localhost') {

    config.env.hosts = {
        db: 'localhost:27017',
        cloud: 'localhost:8080',
        event: 'localhost:55050',
        auth: 'localhost:55010',
        locate: 'localhost:55020',
        storage: 'localhost:55030',
        query: 'localhost:55110',
        mailbox: 'localhost:55120',
        action: 'localhost:55130',
        push: 'localhost:55140',
        pushio: 'localhost:55145',
        msgs: 'localhost:1883',
        doc: 'localhost:55080',
        scheduling: 'localhost:55087',
        broadcast: 'localhost:50087',
        eventhub: 'localhost:55200',
        device: 'localhost:55160',
        process: 'localhost:55300',
        scope: 'localhost:55400',
        notify: 'localhost:8080',
        activity: 'localhost:55500',
        vsa: 'vsa:55510'
    };
} else if (process.env.RUNTIME_ENV === 'container') {

    config.env.hosts = {
        db: 'db:27017',
        cloud: 'cloud:8080',
        event: 'event:55050',
        auth: 'auth:55010',
        locate: 'locate:55020',
        storage: 'storage:55030',
        query: 'query:55110',
        mailbox: 'mailbox:55120',
        action: 'action:55130',
        push: 'push:55140',
        pushio: 'push:55145',
        msgs: 'msgs:1883',
        doc: 'docs:55080',
        scheduling: 'scheduling:55087',
        broadcast: 'broadcast:50087',
        eventhub: 'eventhub:55200',
        device: 'device:55160',
        process: 'process:55300',
        scope: 'scope:55400',
        notify: 'notify:8080',
        activity: 'activity:55500',
        vsa: 'vsa:55510'
    };
} else if (process.env.RUNTIME_ENV === 'dev') {

    config.env.hosts = {
        db: 'db1:27017',
        cloud: 'cloud1:8080',
        event: 'event1:55050',
        auth: 'auth1:55010',
        locate: 'locate1:55020',
        storage: 'storage1:55030',
        query: 'query1:55110',
        mailbox: 'mailbox1:55120',
        action: 'action1:55130',
        push: 'notify1:55140',
        pushio: 'notify1:55145',
        msgs: 'message1:1883',
        doc: 'docs1:55080',
        scheduling: 'scheduling1:55087',
        broadcast: 'broadcast1:50087',
        eventhub: 'eventhub1:55200',
        device: 'device1:55160',
        process: 'process1:55300',
        scope: 'scope1:55400',
        notify: 'notify1:8080',
        activity: 'activity1:55500',
        vsa: 'vsa:55510'
    };
} else if (process.env.RUNTIME_ENV === 'prod') {

    config.env.hosts = {
        db: 'db1:27017',
        cloud: 'cloud1:8080',
        event: 'event1:55050',
        auth: 'auth1:55010',
        locate: 'locate1:55020',
        storage: 'storage1:55030',
        query: 'query1:55110',
        mailbox: 'mailbox1:55120',
        action: 'action1:55130',
        push: 'notify1:55140',
        pushio: 'notify1:55145',
        msgs: 'message1:1883',
        doc: 'docs1:55080',
        scheduling: 'scheduling1:55087',
        broadcast: 'broadcast1:50087',
        eventhub: 'eventhub1:55200',
        device: 'device1:55160',
        process: 'process1:55300',
        scope: 'scope1:55400',
        notify: 'notify1:8080',
        activity: 'activity1:55500',
        vsa: 'vsa:55510'
    };
}

//Communication between services on either the dev or prod environments should use
//this proxy as the host instead.
config.env.proxyHost = 'web1';

//Everything related to this specific service.  Many of these should be overridden in the
//service's own specific config.js file.
config.service = {};
config.service.namespace = 'voyent';
config.service.name = 'defaultServiceName';
config.service.scheme = 'http';
config.service.host = config.env.host;
config.service.port = 55555;
config.service.resourcePort = config.env.host === LOCAL_HOST ? config.service.port : '';
config.service.referrer = config.service.scheme + '://' + config.service.host;
config.service.path = '/' + config.service.name;
config.service.server = 'Service description not provided';
config.service.desc = config.service.server;
config.service.version = '1.0.0';
config.service.tokensEnabled = false;

//With the service proxy enabled, all requests go to the proxy first for process (e.g. authentication)
//and then proxied to the appropriate service.
config.proxy = {};
config.proxy.enabled = true;
config.proxy.scheme = 'http';
config.proxy.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.host;
config.proxy.port = config.env.host === LOCAL_HOST ? ':55010' : '';
config.proxy.url = config.proxy.scheme + '://' + config.proxy.host + config.proxy.port;

//Information for communicating with the Notification service.
config.notify = {};
config.notify.scheme = 'http';
config.notify.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.notify.port = config.env.host === LOCAL_HOST ? ':8080' : '';
config.notify.path = '/notify';
config.notify.url = config.notify.scheme + '://' + config.notify.host + config.notify.port + config.notify.path;
config.notify.referrer = config.notify.scheme + '://' + config.notify.host + config.notify.port + '/' + config.service.name;

//Information for communicating with the MongoDB service.
config.database = {};
config.database.scheme = 'mongodb';
config.database.host = 'db';
config.database.port = 27017;

//TODO: database.path and database.url should likely be removed give we know make connections
//to databases using our own strategy based on account name rather than service.
config.database.path = config.service.name;
config.database.url = config.database.scheme + '://' + config.database.host + ':' + config.database.port + '/' + config.database.path;

config.database.clientExpiry = 1800000;
config.database.sharedConnections = false;

//Information for communicating with the Event service.
config.event = {};
config.event.scheme = 'http';
config.event.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.event.port = config.env.host === LOCAL_HOST ? ':55050' : '';
config.event.path = '/event';
config.event.url = config.event.scheme + '://' + config.event.host + config.event.port + config.event.path;
config.event.enabled = config.env.prod ? true : false;


//Information for communicating with the Docs service.
config.doc = {};
config.doc.scheme = 'http';
config.doc.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.doc.port = config.env.host === LOCAL_HOST ? ':55080' : '';
config.doc.path = '/docs';
config.doc.url = config.doc.scheme + '://' + config.doc.host + config.doc.port + config.doc.path;

//Information for communicating with the Scheduling service.
config.scheduling = {};
config.scheduling.scheme = 'http';
config.scheduling.host = config.scheduling.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.scheduling.port = config.scheduling.host === LOCAL_HOST ? ':55087' : '';
config.scheduling.path = '/scheduling';
config.scheduling.url = config.scheduling.scheme + '://' + config.scheduling.host + config.scheduling.port + config.scheduling.path;

//Information for communicating with the Broadcast service.
config.broadcast = {};
config.broadcast.scheme = 'http';
config.broadcast.host = config.broadcast.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.broadcast.port = config.broadcast.host === LOCAL_HOST ? ':50087' : '';
config.broadcast.path = '/broadcast';
config.broadcast.url = config.broadcast.scheme + '://' + config.broadcast.host + config.broadcast.port + config.broadcast.path;

//Information for communicating with the Activity service.
config.activity = {};
config.activity.scheme = 'http';
config.activity.host = config.activity.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.activity.port = config.activity.host === LOCAL_HOST ? ':55500' : '';
config.activity.path = '/activity';
config.activity.url = config.activity.scheme + '://' + config.activity.host + config.activity.port + config.activity.path;

//Information for communicating with the Integration service.
config.integration = {};
config.integration.scheme = 'http';
config.integration.host = config.activity.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.integration.port = config.activity.host === LOCAL_HOST ? ':55550' : '';
config.integration.path = '/integration';
config.integration.url = config.integration.scheme + '://' + config.integration.host +
    config.integration.port + config.integration.path;

//Information for communicating with the Docs service.

//Information for communicating with the Docs service.
config.auth = {};
config.auth.scheme = 'http';
config.auth.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.auth.port = config.env.host === LOCAL_HOST ? ':55010' : '';
config.auth.path = '/auth';
config.auth.url = config.auth.scheme + '://' + config.auth.host + config.auth.port + config.auth.path;

//Information for communicating with the Locate service.
config.locate = {};
config.locate.scheme = 'http';
config.locate.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.locate.port = config.env.host === LOCAL_HOST ? ':55020' : '';
config.locate.path = '/locate';
config.locate.url = config.locate.scheme + '://' + config.locate.host + config.locate.port + config.locate.path;

//Information for communicating with the Mailbox service.
config.mailbox = {};
config.mailbox.scheme = 'http';
config.mailbox.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.mailbox.port = config.env.host === LOCAL_HOST ? ':55120' : '';
config.mailbox.path = '/mailbox';
config.mailbox.url = config.mailbox.scheme + '://' + config.mailbox.host + config.mailbox.port + config.mailbox.path;

//Information for communicating with the Storage service.
config.storage = {};
config.storage.scheme = 'http';
config.storage.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.storage.port = config.env.host === LOCAL_HOST ? ':55030' : '';
config.storage.path = '/storage';
config.storage.url = config.storage.scheme + '://' + config.storage.host + config.storage.port + config.storage.path;

//Information for communicating with the Context service.
config.context = {};
config.context.scheme = 'http';
config.context.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.context.port = config.env.host === LOCAL_HOST ? ':55060' : '';
config.context.path = '/context';
config.context.url = config.context.scheme + '://' + config.context.host + config.context.port + config.context.path;

//Information for communicating with the Query service.
config.query = {};
config.query.scheme = 'http';
config.query.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.query.port = config.env.host === LOCAL_HOST ? ':55110' : '';
config.query.path = '/query';
config.query.url = config.query.scheme + '://' + config.query.host + config.query.port + config.query.path;

//Information for communicating with the Push service.
config.push = {};
config.push.scheme = 'http';
config.push.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.push.port = config.env.host === LOCAL_HOST ? ':55140' : '';
config.push.path = '/push';
config.push.url = config.push.scheme + '://' + config.push.host + config.push.port + config.push.path;

config.pushio = {};
config.pushio.scheme = 'http';
config.pushio.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.pushio.port = config.env.host === LOCAL_HOST ? ':55145' : '';
config.pushio.path = '/pushio';
config.pushio.url = config.pushio.scheme + '://' + config.pushio.host + config.pushio.port + config.pushio.path;

//Information for communicating with the Cloud Notification service.
config.cloud = {};
config.cloud.scheme = 'http';
config.cloud.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.cloud.port = config.env.host === LOCAL_HOST ? ':8080' : '';
config.cloud.path = '/cloud';
config.cloud.url = config.cloud.scheme + '://' + config.cloud.host + config.cloud.port + config.cloud.path;

//Information for communicating with the EventHub service.
config.eventhub = {};
config.eventhub.scheme = 'http';
config.eventhub.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.eventhub.port = config.env.host === LOCAL_HOST ? ':55200' : '';
config.eventhub.path = '/eventhub';
config.eventhub.url = config.eventhub.scheme + '://' + config.eventhub.host + config.eventhub.port + config.eventhub.path;

//Information for communicating with the Process service.
config.process = {};
config.process.scheme = 'http';
config.process.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.process.port = config.env.host === LOCAL_HOST ? ':55300' : '';
config.process.path = '/process';
config.process.url = config.process.scheme + '://' + config.process.host + config.process.port + config.process.path;

//Information for communicating with the Scope service.
config.scope = {};
config.scope.scheme = 'http';
config.scope.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.scope.port = config.env.host === LOCAL_HOST ? ':55400' : '';
config.scope.path = '/scope';
config.scope.url = config.scope.scheme + '://' + config.scope.host + config.scope.port + config.scope.path;

//Configuration defaults for the Messaging service.
config.messages = {};
config.messages.host = 'message1';

//Information for communicating with the Device service
config.device = {};
config.device.scheme = 'http';
config.device.host = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.device.port = config.env.host === LOCAL_HOST ? ':55160' : '';
config.device.path = '/bewhere';
config.device.url = config.device.scheme + '://' + config.device.host + config.device.port + config.device.path;


//Messaging via MQTT using ActiveMQ
config.messages.scheme = 'tcp';
config.messages.port = '1883';

//Messaging using AWS
config.messages.showPolling = false;

//Message client that doesn't broadcast, saves directly to database
// config.messages.scheme = 'log';
// config.messages.port = '0';

config.debugLoggerSettings = {
    level: 'debug',
    collection: 'debug',
    capSize: 100000,      // 100000 records per account
    fixedRealm: 'audit'
};

config.auditLoggerSettings = {
    level: 'info',
    collection: 'audit',
    capSize: 300000,     // 300000 records per Account
    fixedRealm: 'audit'
};

config.userAccountValidationTimeoutDefault = 604800; // 1 week in seconds

// Configuration defaults for Action Service
config.action = {};
config.action.scheme = 'http';
config.action.host   = config.env.host === LOCAL_HOST ? LOCAL_HOST : config.env.proxyHost;
config.action.port = config.env.host === LOCAL_HOST ? ':55130' : '';
config.action.path = '/action';
config.action.url = config.action.scheme + '://' + config.action.host + config.action.port + config.action.path;

//Configuration defaults for the CRUD related features.
config.crud = {};
config.crud.defaultLimit = 100;

//Configuration defaults for the Tools related features.
config.tools = {};
config.tools.compressPermissionHeaders = false;

//Default CORS settings.
config.cors = {};
//config.cors.path = '/\.*/';
config.cors.origin = '*';
config.cors.methods = 'GET, POST, DELETE, PUT';
config.cors.headers = 'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, If-Unmodified-Since, X-File-Name, Cache-Control, Origin, X-HTTP-Method-Override, Accept, Authorization, X-Pingother, If-Match, If-None-Match ';

//Default logging settings.
config.logging = {};
config.logging.logName = "defaultLogger";
config.logging.logFile = __dirname + '/' + config.service.name + '.log';
config.logging.logLevel = process.env.VOYENT_SERVICE_LOG_LEVEL || 'debug';
config.logging.fallbackLogDB = 'security_logging';
config.logging.defaults = {
    logName: config.logging.logName,
    logFile: config.logging.logFile,
    logLevel: config.logging.logLevel
};

// Default resource metadata block per resource. Allow all owner access, but no one else
config.service.defaultPermissionsMetadata = {
    owner: 'unchanged',
    rights: {
        owner: ["r", "u", "d", "x", "pr", "pu"],
        realm: ["r"],
        roles: {
            accountOwner: ["r", "u", "d", "x", "pr", "pu"],
            regionAdmin: ["r", "u", "d", "x"],
            alertAdmin: ["r", "u", "d", "x"],
            defaultUser: ["r", "x"]
        }
    }
};

config.services = {};
config.services.permissions = {};
config.services.permissions.permissionPrefix = 'services';
config.services.permissions.createVerb = 'create';


config.aws = {
    queues: {
        messageRetention: "43200",  //12 hours
        messagesToProcess: "1",
        visibilityTimeout: "180",   //3 mins
        pollingInterval: "20"
    },
    retry:{
        baseVisibilityTimeout: 30,
        maxVisibilityTimeout: 600,
    },
    dlq:{
        maxReceiveCount: "10",
        messageRetention: "1209600" //Max is 14 days
    }
};

/**
 * Assemble a full resource permission string from parts provided by the service
 * @param service name of the service
 * @param resource name of the resource
 * @param verb the action for which a permission is required (eg., 'create', 'read', 'edit', 'delete')
 */
function assemblePermission (service, resource, verb) {
    if (!verb) {
        verb = 'create';
    }
    return config.services.permissions.permissionPrefix + '.' +
        service + '.' + verb + '.' + resource;
}
config.assemblePermission = assemblePermission;

// This represents a passcode being valid for 30 days.
config.alertPasscodeValidityPeriod = 30;

// This is the default auth access_token expiry time in ms
config.defaultAccessTokenExpiry = 3600 * 1000;

//Export the config object so that services can use it and override as required.
module.exports = config;


//Configuration settings that rely on being calculated from other values should
//be added to this function.  Whenever one or more configuration values are updated,
//this function should be called to ensure all the values are properly re-evaluated.
//While this is not terribly elegant or efficient, it is fairly simple, compatible with
//what we have and retains the high degree of readability for all the settings.  Since
//the configuration typically only gets modified once when the service is first started
//up, the impact is minimal.  Settings that rely on the config.env properties should
//not be recalculated or they cannot be overridden.
function reconfigure() {

    config.service.path = '/' + config.service.name;
    config.service.resourcePort = config.env.host === LOCAL_HOST ? config.service.port : '';

    config.proxy.url = config.proxy.scheme + '://' + config.proxy.host + config.proxy.port;

    config.notify.url = config.notify.scheme + '://' + config.notify.host + config.notify.port + config.notify.path;
    config.notify.referrer = config.notify.scheme + '://' + config.notify.host + config.notify.port + '/' + config.service.name;

    config.database.path = config.service.name;
    config.database.url = config.database.scheme + '://' + config.database.host + ':' + config.database.port + '/' + config.database.path;

    config.auth.url = config.auth.scheme + '://' + config.auth.host + config.auth.port + config.auth.path;

    config.doc.url = config.doc.scheme + '://' + config.doc.host + config.doc.port + config.doc.path;

    config.scheduling.url = config.scheduling.scheme + '://' + config.scheduling.host + config.scheduling.port + config.scheduling.path;

    config.broadcast.url = config.broadcast.scheme + '://' + config.broadcast.host + config.broadcast.port + config.broadcast.path;

    config.locate.url = config.locate.scheme + '://' + config.locate.host + config.locate.port + config.locate.path;

    config.context.url = config.context.scheme + '://' + config.context.host + config.context.port + config.context.path;

    config.query.url = config.query.scheme + '://' + config.query.host + config.query.port + config.query.path;

    config.action.url = config.action.scheme + '://' + config.action.host + config.action.port + config.action.path;

    config.event.url = config.event.scheme + '://' + config.event.host + config.event.port + config.event.path;

    config.eventhub.url = config.eventhub.scheme + '://' + config.eventhub.host + config.eventhub.port + config.eventhub.path;

    config.process.url = config.process.scheme + '://' + config.process.host + config.process.port + config.process.path;

    config.scope.url = config.scope.scheme + '://' + config.scope.host + config.scope.port + config.scope.path;

    config.activity.url = config.activity.scheme + '://' + config.activity.host + config.activity.port + config.activity.path;

    config.logging.defaults = {
        logName: config.logging.logName,
        logFile: config.logging.logFile,
        logLevel: config.logging.logLevel
    };

}
module.exports.reconfigure = reconfigure;
