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


    $(".export_html").click((e) => {

        //$(".preview").children(".form-group").each((i, el) => {
        //    el.childNodes.forEach((node, key, parent) => {
        //        if ($(node).hasClass("isTable")) {
        //            console.log("Table found")
        //        }
        //        if (node.nodeName === 'UL') {
        //            node.childNodes.forEach((node) => {
        //                console.log($(node).html().toString())
        //                if ($(node).html().toString().includes("select")) {
        //                    console.log("SELE")
        //                    console.log($(node))
        //                } else if ($(node).html().toString().includes("input")) {
        //                    console.log("IN")
        //                    console.log($(node))
        //                }
        //            })
        //        }
        //        console.log(node.nodeName)
        //    })
        //})

        const jsonToSend = [];
        e.preventDefault();
        $(".preview .form-group").each((i, e) => {
            let childNodesLength = e.childNodes.length;
            let childNodes;
            let childNodeObj = {}

            
               
                

            

                childNodeObj = {}
                childNodes = e.childNodes

                childNodes.forEach((node, i) => {
                    let switchValue = node.nodeName
                    switch (switchValue) {
                        case "H3":
                            childNodeObj.Name = "Title"
                            childNodeObj.Label = childNodes[0].textContent
                            childNodeObj.InputType = "Label"
                            
                            break;
                        case "UL":
                            childNodeObj.Name = "listgroup"
                            childNodeObj.InputType = "Table"
                            childNodeObj.RowArray = [];
                            node.childNodes.forEach((child, key, parent) => {
                                if ($(child).html().toString().includes("select")) {
                                    let tempChild = $(child).children("select");
                                    let opts = []
                                    for (var i = 0; i < tempChild[0].options.length; i++) {
                                        opts.push(tempChild[0].options[i].label);
                                    }
                                    console.log()
                                    childNodeObj.RowArray.push({ Lable: $(child)[0].childNodes[0].textContent, Options: opts })
                                } else {
                                    childNodeObj.RowArray.push({ Label: child.textContent })
                                }
                            })
                            break;
                        case "SPAN":
                            childNodeObj.Name = $(node).attr("data");
                            childNodeObj.Lable = $(node).find(".title1").text();
                            childNodeObj.SubLabel = $(node).find(".title2").text();
                            childNodeObj.LableArray = []    

                            $(node).find("table th").each((index, el) => {
                                childNodeObj.LableArray.push(el.textContent)
                            })
                            childNodeObj.Range = Number($(node).find(".title2").attr("colspan")) - 1;
                            break
                        case "LABEL":
                            childNodeObj.Label = node.textContent
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
                            


                                let opt = []
                            for (var i = 0; i < $(node)[0].options.length; i++) {
                                opt.push($(node)[0].options[i].label)
                            }
                            childNodeObj.Options = opt
                            break;
                        case "DIV":
                            if ($(node).hasClass("isTable")) {
                                switchValue = 'TABLE';
                            }
                            if ($(node).children("label").children(":input").attr("type") == "radio" || "RADIO") {
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



        })
        console.log(jsonToSend)
        //$.ajax({
        //    method: "POST",
        //    url: "/api/Mqtt/SendForm",
        //    contentType: "application/json; UTF8",
        //    data: JSON.stringify(jsonToSend),
        //    success: (response) => {
        //        iziToast.show({
        //            title: "Form Submition",
        //            message: response.responsePhrase
        //        })
        //    },
        //    error: (response) => {
        //        iziToast.show({
        //            title: "Form Submition",
        //            message: "Error"
        //        })
        //    }
        //})
       
    })
}
