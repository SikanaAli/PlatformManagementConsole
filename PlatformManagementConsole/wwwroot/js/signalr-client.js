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
    s_client.invoke("GetSessions");
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

        let { text, id, isOnline } = row

        //console.log(isOnline);
        tempResolvers.push({
            label: text,
            id,
            isOnline,
            parent: "resolver-p"
        });
    });
    $("ul .vtree-subtree").remove()
    tempResolvers.forEach((item) => {
        
        if (item.isOnline == true) {
            delete (item.isOnline)
            resolverTree.add(item)

            let leaf = `[data-vtree-id="${item.id}"]`
            console.log(leaf);
            $(leaf).children("a").append("<i class='fa fa-circle isOnline pl-2'></i>")
        } else {
            delete (item.isOnline)
            resolverTree.add(item)
            let leaf = `[data-vtree-id="${item.id}"]`
            console.log(leaf);
            $(leaf).children("a").append("<i class='fa fa-circle isOffline pl-2'></i>")
        }
        
    })
    
})

s_client.on("ssdStatus", (data) => {
    console.log(data)
    data = JSON.parse(data)

    if (data.hasOwnProperty("isOnline") && data.isOnline) {
        let leaf = `[data-vtree-id="${data.id}"]`
        $(leaf).children("a").children("i").removeClass("isOffline");
        $(leaf).children("a").children("i").addClass("isOnline");
    } else {
        let leaf = `[data-vtree-id="${data.id}"]`
        $(leaf).children("a").children("i").removeClass("isOnline");
        $(leaf).children("a").children("i").addClass("isOffline");
    }


});

let FormHtml = []
let FormsOptions = ''

s_client.on("RefreshFormsList", (Forms) => {
    FormHtml = [];
    let FormIndex = 0;
    console.log(Forms);

    if (Forms.length != 0) {
        let formList = $(".list-group")
        formList.empty();
        Forms.forEach((form) => {
            let listItem = `<li class="list-group-item " data-id="${FormIndex}">${form.title} <i class="fi-xnsuxl-network-solid"></i> </li>`
            FormHtml.push(`${form.html}`)
            FormsOptions += '<option value="' + form.id + '">' + form.title + '</option>'
            formList.prepend(listItem);
            FormIndex++;
        })
        $(".list-group-item").click(function (e) {

            $(this).parent().find(".list-group-item").css("background-image", "linear-gradient(to right,rgb(255,255,255),rgba(255,255,255))")
            $(this).css("background-image", "linear-gradient(to right,rgba(153,255,153,0.2),rgba(102,127,255,0.2))");
            $("#form-view").empty();
            $("#form-view").html(FormHtml[Number($(this).attr("data-id"))])

        })
    }
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
//Session
let Sessions = '';
s_client.on("Sessions", (result) => {
    result.forEach((item, index) => {
        Sessions+= `<option value="${item.session_name}">${item.session_name}</option>`;
    })
})

s_client.on("SessionAdded", (result) => {
    iziToast.success({
        title: "Event Session",
        message: result
    })
})

//Click Events

$("#reload-resolvers").click(() => {
    s_client.invoke("RefreshResolvers");

    
})

