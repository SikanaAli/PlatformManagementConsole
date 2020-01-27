if (location.href.includes("BuildForm")) {

    let parentDiv = document.getElementById("form-view");
    const formViewMutaion = new MutationObserver((e) => {

        if (parentDiv.hasChildNodes()) {
            $("#send-form-btn").removeAttr("disabled", "disabled")
        } else {
            $("#send-form-btn").attr("disabled", "disabled")
        }
    })
    formViewMutaion.observe(parentDiv, { childList: true, subtree: true })


    const innputType = ['text', 'email',]

    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };


    $("#send-form-btn").click((e) => {

        //$("#form-view .form-group").children().each((i, el) => {
        //    console.log(el.nodeName, $(el).attr("type"))
        //})

        const jsonToSend = [];
        e.preventDefault();
        $("#form-view .form-group").each((i, e) => {
            let childNodesLength = e.childNodes.length;
            let childNodes;
            let childNodeObj = {}

            if (childNodesLength === 1) {
                childNodes = e.childNodes;
                childNodeObj.Name = "Title"
                childNodeObj.Title = childNodes[0].textContent
                jsonToSend.push(childNodeObj)

            } else {

                childNodeObj = {}
                childNodes = e.childNodes

                childNodes.forEach((node, i) => {

                    switch (node.nodeName) {
                        case "LABEL":
                            childNodeObj.Lable = node.textContent
                            break;
                        case "INPUT":
                            childNodeObj.Name = $(node).attr("name")
                            childNodeObj.DataType = $(node).attr("type")
                            childNodeObj.InputType = "Entry"
                            childNodeObj.Required = $(node).attr("required") ? true : false;
                            break;
                        case "TEXTAREA":

                            childNodeObj.Name = $(node).attr("name")
                            childNodeObj.InputType = "Editor"
                            childNodeObj.Required = $(node).attr("required") ? true : false;
                            break;
                        case "SELECT":
                            childNodeObj.Name = $(node).attr("name")
                            childNodeObj.InputType = "Select"
                            childNodeObj.Options = []
                            for (var i = 0; i < $(node)[0].options.length; i++) {
                                childNodeObj.Options.push($(node)[0].options[i].label)
                            }
                            break;
                        case "DIV":
                            if ($(node).children("label :input").attr("type") == "radio" || "RADIO") {
                                console.log("NODE => ", node)
                                childNodeObj.Name = $(node).children("label").children(":input").attr("name")
                                childNodeObj.InputType = "RadioButton"
                                if (childNodeObj.hasOwnProperty("Options")) {
                                    childNodeObj.Options.push($(node).children("label").children(":input").val())
                                } else {
                                    childNodeObj.Options = []
                                    childNodeObj.Options.push($(node).children("label").children(":input").val())
                                }
                            } else if ($(node).children("div lable :input").attr("type") == "checkbox" || "CHECKBOX") {
                                childNodeObj.Name = $(node).children(" div lable :input").attr("name")
                                childNodeObj.InputType = "CheckBox"
                                if (childNodeObj.hasOwnProperty("Options")) {
                                    childNodeObj.Options.push($(node).children("label").children(":input").val())
                                } else {
                                    childNodeObj.Options = []
                                    childNodeObj.Options.push($(node).children("label").children(":input").val())
                                }
                            }
                            break;
                        case "RADIO":
                            break;
                    }


                })
                jsonToSend.push(childNodeObj);
            }



        })

        console.log(jsonToSend)
    })
}
