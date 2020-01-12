//MQTT 

//MQTT TOPICS
const MQTT_TOPICS = {
    RESOLVER_WILD: "RESOLVER/#",
    RESOLVER_INIT: "RESOLVER/INIT"
}

//Inititalize MQTT


//MQTT EVENT HANDLERS



//Create Mqtt Client
let m_client;

const ConnectMqtt = (data) => {
    console.log(data)
    data = JSON.parse(data)
    m_client = new Paho.MQTT.Client(data.host, Number(data.port),"", "web_" + parseInt(Math.random() * 100, 10));
    console.dir(m_client)
    m_client.connect({
        
        onSuccess: onSuccess,
        onFailure: onFailure,
        onConnectionLost: onConnectionLost
    })

   
    m_client.subscribe(MQTT_TOPICS.RESOLVER_INIT, {
        qos: 0,
        onFailure: subscription_failed(),
        timeout:10
    })

    
}

const onSuccess = (response) => {
    console.log("s => " + response)
    m_client.subscribe(MQTT_TOPICS.RESOLVER_INIT, {
        qos: 1,
        onFailure: subscription_failed,
        timeout: 10
    })

    let msg = new Paho.MQTT.Message("0")
    msg.destinationName = MQTT_TOPICS.RESOLVER_INIT;

    m_client.send(msg)
}

const onFailure = (response) => {
    console.log("CONNECTION => " + response)
}

const onConnectionLost = (response) => {
    console.log("onConnectionLost => " + response)
}

const subscription_failed = (response) => {
    console.log("subscription_failed => " + response)
}



////MQTT Options
//const MQTT_OPT = {
//    onSuccess: onSuccess(),
//    onFailure: onFailure()

//}


