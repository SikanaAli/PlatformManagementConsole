$(document).ready(() => {


    $.ajax({
        url: "/api/Mqtt/Initialize",
        method: "POST",
        error: (response) => {
            iziToast.show({
                theme: 'light',
                message: "Error Orcurred trying to initalize MQTT",
                title:"MQTT",
                backgroundColor: 'orange',
                icon: "fi-xnluxl-network"
            })
        }
    })
})