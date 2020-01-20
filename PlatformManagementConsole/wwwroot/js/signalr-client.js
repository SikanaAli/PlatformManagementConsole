// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let s_client = new signalR.HubConnectionBuilder().withUrl("/pmc").build();
let toast = new Toasty();

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
s_client.on("Undefined", (data) => {
    console.log(data)
});


s_client.on("AddResolver", (resolver) => {
    resolvers.push(resolvers[0])
})

s_client.on("RefreshResolver", (resolvers) => {

    let tempResolvers = []
    resolvers.forEach((row) => {
        console.log(row)
        let { text, id } = row

        console.log(text)
        tempResolvers.push({
            label: `${text}`,
            id,
            parent:"resolver-p"
        });
    })

    $("ul .vtree-subtree").remove()
    childResolvers = tempResolvers;
    tempResolvers.forEach((resolver) => {
        console.log("R => ",resolver)
        resolverTree.add(resolver)
    })
   
    
})

s_client.on("MqttConnected", (result) => {
    toast.success(result);
})

s_client.on("MqttDisconnected", (result) => {
    console.log(result);
})


//Click Events

$("#reload-resolvers").click(() => {
    s_client.invoke("RefreshResolvers");

    
})

