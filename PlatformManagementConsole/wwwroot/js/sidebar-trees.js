

let resolverContainer = [{ "id": "resolver-p", "parent": "#", "text": "Resolvers" }]

let resolvers = $('#resolvers').jstree({
    'core': {
        'data': resolverContainer,
        themes: {
            icons: false
        }
    }

});


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