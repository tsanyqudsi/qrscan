import address from './address';

let graphqlFunction = {
    graphqlFetchAll: function (query, callback) {
        fetch(address + ':3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: {}
            })
        })
        .then(r => r.json())
        .then(function(data) {
            if(callback)
                return callback(data.data);
        });
    },

    graphqlFetchOne: function (query, variable, callback) {
        fetch(address + ':3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: variable
            })
        })
        .then(r => r.json())
        .then(function(data) {
            if(callback)
                return callback(data.data);
        });
    },

    graphqlMutation: function (query, variables, callback) {
        fetch(address + ':3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: variables
            })
        }).then(r => r.json())
        .then(function(data) {
            if(callback)
                return callback(data);
        });
    },
}

export default graphqlFunction;