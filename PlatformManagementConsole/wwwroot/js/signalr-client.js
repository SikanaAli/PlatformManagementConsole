// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var s_client = new signalR.HubConnectionBuilder().withUrl("/pmc").build();


// SignalR Events
s_client.start().then(function () {
    console.log("Connected to SignalR")
    
}).catch(function (err) {
    return console.error(err.toString());
    });

s_client.on("MqttData", (data) => {
   

    //data = JSON.parse(data)
    
    console.dir(data)
    
})

s_client.on("AddResolver", (resolver) => {
    resolvers.push(resolvers[0])
                
})

s_client.on("RefreshResolver", (resolvers) => {

    resolvers.forEach((row, i) => {
        let child = { id: row.id, parent: "resolver-p", text: row.text }

        
        ResolverContainer.push(child);
    })


   


    
})


//Click Events

$("#reload-resolvers").click(() => {
    s_client.invoke("RefreshResolvers");

    
})

