$(document).ready(() => {


    $.ajax({
        url: "/api/Mqtt/Initialize",
        method: "POST",
        error: (response) => {
            iziToast.show({
                theme: 'light',
                class: 'normal-toast',
                message: "Error Orcurred trying to initalize MQTT",
                title:"MQTT",
                
                icon: "fi-xnluxl-network"
            })
        }
    })
})