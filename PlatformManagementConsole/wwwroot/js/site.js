
let parentDiv = document.getElementById("form-view");
const formViewMutaion = new MutationObserver((e) => {
    
    if (parentDiv.hasChildNodes()) {
        $("#send-form-btn").removeAttr("disabled", "disabled")
    } else {
        $("#send-form-btn").attr("disabled", "disabled")
    }
})
formViewMutaion.observe(parentDiv,{ childList: true, subtree: true })


const innputType = ['text', 'email',]
const jsonToSend = []
$("#send-form-btn").click((e) => {
    e.preventDefault();
    $("#form-view .form-group").each((i, e) => {
        let childNodesLength = e.childNodes.length
        switch (childNodesLength) {
            case 1:
                let childNode = e.childNodes
                childNode = {
                    Name: 'Title',
                    Lable: childNode[0].textContent,
                    innputType:"Label"
                }

                jsonToSend.push(childNode);
                break;
            default:
                break;
        }
        console.log(e.childNodes)
    })

    console.log(jsonToSend)
})
