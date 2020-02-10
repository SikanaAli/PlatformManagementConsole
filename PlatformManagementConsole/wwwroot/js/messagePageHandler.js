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
        if ($(e.target).val() == 1) {
            let select = '<lable>Forms</lable><select name="selectedForm" class="form-control link">' + FormsOptions +'</select>'
            
            
             
            console.log(select)
            
            $("#selectedLinkType").html(select);
        }
        if ($(e.target).val() == 2) {
            let input = '<lable>Link</lable><input type="text" name="link" class="form-control link"/>'
            $("#selectedLinkType").html(input);
        }
    })



    // Add the following code if you want the name of the file appear on select
    $(".custom-file-input").on("change", function () {
        let fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);

        let file = document.getElementById("customFile").files[0]

        let filereader = new FileReader()
        filereader.readAsDataURL(file);
        filereader.onload = (e) => {

           
            $("#msg-image-view").children("img").attr("src", e.target.result);
        }
        
    });

    

    $("#save-msg").click((e) => {
        let msghtmlGettter = new Promise((resolve) => {
            let msgClone = $("#msg-preview").clone();
            msgClone.find('*').removeAttr('id')

            resolve(msgClone.html())
        })
        let msgObj = {}
        msghtmlGettter.then(msgHtml => {
            
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

            
        }).finally(() => {
            $.ajax({
                url: "/api/Forms/AddMessage",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(msgObj),
                success: (res) => {
                    iziToast.success({
                        title: 'Message',
                        message: "Message Saved",
                    })
                },
                error: (err) => {
                    iziToast.error({
                        title: 'Message',
                        message: "An error occured while saving message",
                    })
                    console.log(err)
                }
            })
        })
        

    })
    let msgView = document.getElementById("msg-view")

    const msgViewObserver = new MutationObserver(function () {
        if (msgView.hasChildNodes) {
            console.log("Removed attr")
            $("#send-message").removeAttr("disabled")
        } else {
            $("#send-message").attr("disabled","disabled")
        }
    })

    msgViewObserver.observe(msgView, { childList: true, subtree: true })

    $("#send-message").click((e) => {
        if ($("#msg-view").html() != '') {
            let msg = { reff: $("#msg-list").find(".selected-msg").attr("data-reff") }
            let loadingModel = document.getElementById("loading-modal-container")
                $("#loading-modal").modal("show")
            $("#loading-modal").unbind();
            lottie.loadAnimation({
                container: loadingModel, // the dom element that will contain the animation
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '/animations/loading.json' // the path to the animation json
            });
            $.ajax({
                url: "/api/mqtt/send/message",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(msg),
                success: (res) => {
                    $("#loading-modal").modal("hide")
                    iziToast.success({
                        title: 'Message',
                        message: "Message Sent",
                    })
                },
                error: (err) => {
                    $("#loading-modal").modal("hide")
                    iziToast.error({
                        title: 'Message',
                        message: "An error occured while sending message",
                    })
                    console.log(err)
                }
            })
            //setTimeout(() => {
            //    $("#loading-modal").modal("hide")
            //    lottie.destroy()
            //},10000)

            console.log(msg)
        }
    })


    $("#msg-list-search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#msg-list li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

})