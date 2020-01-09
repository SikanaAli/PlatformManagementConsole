// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var s_client = new signalR.HubConnectionBuilder().withUrl("/pmc").build();

s_client.start().then(function () {
    console.log("Connected to SignalR")
    InvokeMqtt();
}).catch(function (err) {
    return console.error(err.toString());
    });

s_client.on("MqttData", (data) => {
   

    //data = JSON.parse(data)
    
    console.log(data)
    
})