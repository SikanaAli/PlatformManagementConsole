

let resolvers = [{ "id": "ajson1", "parent": "#", "text": "Resolvers" }]

$('#resolvers').jstree({
    'core': {
        'data': resolvers,
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