

let ResolverContainer = [{ "id": "resolver-p", "lable": "Resolvers" }]

const ResolverTreeOptions = {
    placeholder: "No Resolvers",
    context: [{
        lable: "Details",
        action: (id) => {
            console.log(id)
        }
    }]
}

const resolverTree = new VanillaTree("#resolvers", ResolverTreeOptions) 


ResolverContainer.forEach((row) => {
    resolverTree.add(row);
})


