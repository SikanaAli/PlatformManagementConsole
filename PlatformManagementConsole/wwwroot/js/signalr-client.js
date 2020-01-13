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
    
    console.dir(data)
    
})

s_client.on("RefreshResolvers", (data) => {

    

    let { name, guid } = data[0];

    let child = new Object();
    child.id = guid;
    child.parent = "resolver-p";
    child.text = name;
    
    


    resolverContainer.push(child);

    console.log("child", resolverContainer)

    
    resolvers.jstree("destroy");
    //$('#resolvers').jstree({
    //    'core': {
    //        'data': resolverContainer,
    //        themes: {
    //            icons: false
    //        }
    //    }
    //});
    
})

const RefreshResolver = () => {
    s_client.invoke("RequestRefreshResolvers").catch(function (err) {
        return console.dir(err);
    });
}


$("#refresh-resolver").click((e) => {
    console.log("Clicked");
    RefreshResolver();
})