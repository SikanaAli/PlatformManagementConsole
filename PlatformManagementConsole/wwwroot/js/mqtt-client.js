$(document).ready(() => {
    setTimeout(() => {
        $.ajax({
            url: "http://"+location.host + "/Home/Mqtt",
            method: "GET",
            success: (response) => {
                console.log(response)
            },
            error: (response) => {
                console.log(response.statusText)
            }

        })
    }, 3000)
    
})