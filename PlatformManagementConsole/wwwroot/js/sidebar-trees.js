

let ResolverContainer = [{ "label": "Resolvers", "id": "resolver-p" }]
let childResolvers = []
const ResolverTreeOptions = {
    placeholder: "No Resolvers",
    contextmenu: [{
        label: "Details",
        action: (id,data) => {
            $.ajax({
                url: "http://" + location.host + "/Publish/"+id+"?msg=From Pmc",
                Method: "GET",
                success: (r) => {
                    console.log(r);
                }
            })
        }
    }]
}

const resolverTree = new VanillaTree("#resolvers", ResolverTreeOptions) 


ResolverContainer.forEach((row) => {
    resolverTree.add(row);
})


