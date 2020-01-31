$(document).ready(() => {
    $("#msg-format").change((e) => {

        let card = $("#card")
        if (card.hasClass("card")) {
            card.removeClass("card")
            card.addClass("card-horizontal")
        }

            //messageStyle($(e.target).val())
    })

    /**
     * 
     * @param {Number} num
     */
    const messageStyle = (num)=> {

    }

    $("#msg-title").keyup((e) => {
        $('#card-title').text($(e.target).val())
    })
    $("#msg-body").keyup((e) => {
        $('#card-body').children('p').text($(e.target).val())
    })




    // Add the following code if you want the name of the file appear on select
    $(".custom-file-input").on("change", function () {
        let fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);

        let file = document.getElementById("customFile").files[0]
        console.log(file)
        let filereader = new FileReader()
        filereader.readAsDataURL(file);
        filereader.onload = (e) => {

            console.log(e.target);
            $("#msg-image-view").children("img").attr("src", e.target.result);
        }
        
    });
})