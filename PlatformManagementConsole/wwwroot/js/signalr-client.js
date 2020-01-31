// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let s_client = new signalR.HubConnectionBuilder().withUrl("/pmc").build();
iziToast.settings({
    theme: 'normalToast'
})


// SignalR Events
s_client.start().then(function () {
    console.log("Connected to SignalR")
    s_client.invoke("RefreshResolvers");
    s_client.invoke("RefreshFormsList");
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
    console.log("Resolvers",resolver)
    let tempResolvers = []
    resolver.forEach((row) => {

        let { text, id } = row


        tempResolvers.push({
            label: text,
            id,
            parent: "resolver-p"
        });
    });
    $("ul .vtree-subtree").remove()
    tempResolvers.forEach((item) => {
        resolverTree.add(item)
    })
    
})

s_client.on("RefreshResolver", (id) => {
    console.log(id)
    //let tempResolvers = []
    //resolvers.forEach((row) => {
        
    //    let { text, id } = row

        
    //    tempResolvers.push({
    //        label: text,
    //        id,
    //        parent: "resolver-p"
    //    });
    //});
    //$("ul .vtree-subtree").remove()

    //tempResolvers

    //resolverFunc(tempResolvers);
    resolverTree.remove(id)

});

let FormHtml = []

s_client.on("RefreshFormsList", (Forms) => {
    FormHtml = [];
    let FormIndex = 0;
    console.log(Forms);

    let formList = $(".list-group")
    formList.empty();
    Forms.forEach((form) => {
        let listItem = `<li class="list-group-item " data-id="${FormIndex}">${form.title} <i class="fi-xnsuxl-network-solid"></i> </li>`
        FormHtml.push(`${form.html}`)
        formList.prepend(listItem);
        FormIndex++;
    })
    $(".list-group-item").click(function (e) {

        $(this).parent().find(".list-group-item").css("background-image", "linear-gradient(to right,rgb(255,255,255),rgba(255,255,255))")
        $(this).css("background-image", "linear-gradient(to right,rgba(153,255,153,0.2),rgba(102,127,255,0.2))");
        $("#form-view").empty();
        $("#form-view").html(FormHtml[Number($(this).attr("data-id"))])

    })
})

s_client.on("MqttConnected", (result) => {
    iziToast.success({
        title: 'MQTT',
        message: result,
    })
})

s_client.on("MqttDisconnected", (result) => {
    iziToast.error({
        title: 'MQTT',
        message: result,
    })
})


//Click Events

$("#reload-resolvers").click(() => {
    s_client.invoke("RefreshResolvers");

    
})

