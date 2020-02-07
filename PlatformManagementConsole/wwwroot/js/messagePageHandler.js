$(document).ready(() => {
    let card = document.getElementById("card");

    $("#msg-format").change((e) => {

        let $card = $("#card")

        if ($(e.target).val() == 0 & ($card.hasClass("card-horizontal") || $card.hasClass("card-no-img"))) {

            $card.removeClass();
            $card.find("#msg-image-view").removeAttr("hidden")
            $card.addClass("card")

        } else if ($(e.target).val() == 1 & ($card.hasClass("card") || $card.hasClass("card-no-img"))) {
            console.log("A => ", $card.has(" "))

            $card.removeClass()
            $card.find("#msg-image-view").removeAttr("hidden")
            $card.addClass("card-horizontal")
        } else {
            $card.removeClass()
            $card.find("#msg-image-view").attr("hidden","hidden")
            
            $card.addClass("card-no-img")
        }

            
    })

    /**
     * 
     * @param {Number} num
     */
    const messageStyle = (num)=> {

    }
    $
    $("#msg-link-title").keyup((e) => {
        $('#link-title').text($(e.target).val())
    })
    $("#msg-title").keyup((e) => {
        $('#card-title').text($(e.target).val())
    })
    $("#msg-body").keyup((e) => {
        $('#card-body').children('p').text($(e.target).val())
    })

    $("#msgLinkSelect").change((e) => {
        console.log($(e.target).val())
        if ($(e.target).val() == 0) {
            let select = '<lable>Forms</lable><select name="selectedForm" class="form-control">'
            let selectOptions = '';
            FormsAll.forEach((form) => {
                selectOptions += `<option value="${form.id}">${form.title}</option>`
            });
            select + selectOptions + "</select>"
            console.log(select)
            
            $("#selectedLinkType").html(select);
        }
        if ($(e.target).val() == 1) {
            let input = '<lable>Link</lable><input type="text" name="link" class="form-control"/>'
            $("#selectedLinkType").html(input);
        }
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