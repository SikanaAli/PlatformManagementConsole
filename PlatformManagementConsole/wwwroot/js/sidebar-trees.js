

let ResolverContainer = [{ "id": "resolver-p", "parent": "#", "text": "Resolvers" }]

let resolverTree = $('#resolvers').jstree({
    'core': {
        'data': ResolverContainer,
        themes: {
            icons: false
        }
    }

});

$("#resolvers").on("click",".jstree-anchor", (e) => {
    var data = resolverTree.jstree(true).get_node($(this));

    console.log(data)
})



$('#Nuclei').jstree({
    'core': {
        'data': [
            { "id": "ajson1", "parent": "#", "text": "Nuclei" },
        ],
        themes: {
            icons: false
        }
    }

});