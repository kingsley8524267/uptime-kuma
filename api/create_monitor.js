import { io } from "socket.io-client";

/**
 * @param socket
 * @param event
 * @param payload
 */
function emitAsync(socket, event, payload) {
    return new Promise((resolve, reject) => {
        socket.emit(event, payload, (resp) => {
            if (resp && resp.ok === false) {
                reject(new Error(resp.msg || "API error"));
            } else {
                resolve(resp);
            }
        });
    });
}

const socket = io("http://localhost:3001", {
    transports: [ "websocket" ], // 可以强制 websocket
});

socket.on("connect", async () => {
    console.log("Connected:", socket.id);

    const nodeIp = "34.146.221.155";

    await emitAsync(socket, "login",
        {
            username: "admin",
            password: "admin123",
        }
    );
    console.log("login success");
    console.log(`add ${nodeIp} http monitor`);
    await emitAsync(socket, "add", {
        "type": "http",
        "name": `${nodeIp}:80`,
        "parent": null,
        "url": `http://${nodeIp}`,
        "method": "GET",
        "ipFamily": null,
        "interval": 20,
        "humanReadableInterval": "20 seconds",
        "retryInterval": 20,
        "resendInterval": 0,
        "maxretries": 0,
        "notificationIDList": {},
        "ignoreTls": false,
        "upsideDown": false,
        "expiryNotification": false,
        "maxredirects": 10,
        "accepted_statuscodes": [
            "200-299"
        ],
        "dns_resolve_type": "A",
        "dns_resolve_server": "1.1.1.1",
        "docker_container": "",
        "docker_host": null,
        "proxyId": null,
        "mqttUsername": "",
        "mqttPassword": "",
        "mqttTopic": "",
        "mqttWebsocketPath": "",
        "mqttSuccessMessage": "",
        "mqttCheckType": "keyword",
        "authMethod": null,
        "oauth_auth_method": "client_secret_basic",
        "httpBodyEncoding": null,
        "kafkaProducerBrokers": [],
        "kafkaProducerSaslOptions": {
            "mechanism": "None"
        },
        "cacheBust": false,
        "kafkaProducerSsl": false,
        "kafkaProducerAllowAutoTopicCreation": false,
        "gamedigGivenPortOnly": true,
        "remote_browser": null,
        "rabbitmqNodes": [],
        "rabbitmqUsername": "",
        "rabbitmqPassword": "",
        "conditions": [],
        "ping_count": 3,
        "ping_numeric": true,
        "packetSize": 56,
        "ping_per_request_timeout": 2,
        "timeout": 16,
        "snmpVersion": "2c",
        "jsonPath": "$",
        "jsonPathOperator": "==",
        "psc": true
    });

    console.log(`add ${nodeIp} https monitor`);
    await emitAsync(socket, "add", {
        "type": "http",
        "name": `${nodeIp}:443`,
        "parent": null,
        "url": `https://${nodeIp}`,
        "method": "GET",
        "ipFamily": null,
        "interval": 20,
        "humanReadableInterval": "20 seconds",
        "retryInterval": 20,
        "resendInterval": 0,
        "maxretries": 0,
        "notificationIDList": {},
        "ignoreTls": true,
        "upsideDown": false,
        "expiryNotification": false,
        "maxredirects": 10,
        "accepted_statuscodes": [
            "200-299"
        ],
        "dns_resolve_type": "A",
        "dns_resolve_server": "1.1.1.1",
        "docker_container": "",
        "docker_host": null,
        "proxyId": null,
        "mqttUsername": "",
        "mqttPassword": "",
        "mqttTopic": "",
        "mqttWebsocketPath": "",
        "mqttSuccessMessage": "",
        "mqttCheckType": "keyword",
        "authMethod": null,
        "oauth_auth_method": "client_secret_basic",
        "httpBodyEncoding": null,
        "kafkaProducerBrokers": [],
        "kafkaProducerSaslOptions": {
            "mechanism": "None"
        },
        "cacheBust": false,
        "kafkaProducerSsl": false,
        "kafkaProducerAllowAutoTopicCreation": false,
        "gamedigGivenPortOnly": true,
        "remote_browser": null,
        "rabbitmqNodes": [],
        "rabbitmqUsername": "",
        "rabbitmqPassword": "",
        "conditions": [],
        "ping_count": 3,
        "ping_numeric": true,
        "packetSize": 56,
        "ping_per_request_timeout": 2,
        "timeout": 16,
        "snmpVersion": "2c",
        "jsonPath": "$",
        "jsonPathOperator": "==",
        "psc": true
    });
    console.log("finish");
    socket.close();
});

socket.on("connect_error", (err) => {
    console.error("Connect error:", err.message);
});
