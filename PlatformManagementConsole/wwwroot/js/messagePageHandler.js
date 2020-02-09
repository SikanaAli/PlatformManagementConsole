$(document).ready(() => {
    let card = document.getElementById("card");

    $("#msg-format").change((e) => {

        let $card = $("#card")

        if ($(e.target).val() == 1 & ($card.hasClass("card-horizontal") || $card.hasClass("card-no-img"))) {

            $card.removeClass();
            $card.find("#msg-image-view").removeAttr("hidden")
            $card.addClass("card")

        } else if ($(e.target).val() == 2 & ($card.hasClass("card") || $card.hasClass("card-no-img"))) {
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
            let select = '<lable>Forms</lable><select name="selectedForm" class="form-control link">' + FormsOptions +'</select>'
            
            
             
            console.log(select)
            
            $("#selectedLinkType").html(select);
        }
        if ($(e.target).val() == 1) {
            let input = '<lable>Link</lable><input type="text" name="link" class="form-control link"/>'
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

    

    $("#save-msg").click((e) => {
        let msghtmlGettter = new Promise((resolve) => {
            $("#msg-preview *").removeAttr('id');

            resolve($("#msg-preview").html())
        })
        msghtmlGettter.then(msgHtml => {
            let msgObj = {}
            let msgFormart = $("#msg-format").val()
            let linktype = $("#msgLinkSelect").val()

            msgObj.Type = msgFormart;
            msgObj.LinkType = linktype;
            msgObj.LinkTitle = $("#msg-link-title").val()
            msgObj.Link = $(".link").val();
            msgObj.ExpiryDate = $("#msg-expiry").val()
            msgObj.Content = $("#msg-body").val()
            msgObj.Title = $("#msg-title").val()
            msgObj.Html = msgHtml;

            if ((msgFormart == 1) || (msgFormart == 2)) {
                msgObj.Image = $(".card-img-top").attr('src').split(',')[1];
            }

            console.log(msgObj);
        })
        

    })
})