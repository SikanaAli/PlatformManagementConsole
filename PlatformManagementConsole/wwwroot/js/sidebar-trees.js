

let ResolverParent = { "label": "Smart Soft Devices", "id": "resolver-p" }

const ResolverTreeOptions = {
    placeholder: "No Resolvers",
    contextmenu: [{
        label: "Details",
        action: (id,data) => {
            $.ajax({
                url: "api/Publish/"+id+"?msg=From Pmc",
                Method: "GET",
                success: (r) => {
                    console.log(r);
                }
            })
        }
    }]
}

const resolverTree = new VanillaTree("#resolvers", ResolverTreeOptions) 
resolverTree.add(ResolverParent)

const resolverFunc = (childResolvers) => {
    
    if (childResolvers.length !== 0) {
        childResolvers.forEach((row) => {
            resolverTree.add(row);
        })
    }
}

resolverFunc([]);
    


