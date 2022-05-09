export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities);
}

async function get(entityType, entityId) {
    const entities = await query(entityType);
    // console.log('entities:',entities);
    return entities.find(entity => entity._id === entityId);
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
    .then(entities => {
        entities.push(newEntity);
        _save(entityType, entities)
        return newEntity;
    })
}

function postMany(entityType, newEntities) {
    return query(entityType)
    .then(entities => {
        entities.push(...newEntities);
        _save(entityType, entities)
        return entities;
    })
}

function put(entityType, updatedEntity) {
    
    return query(entityType)
    .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity.id);
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity;
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity.id === entityId);
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
    }
    
    function _save(entityType, entities) {
        localStorage.setItem(entityType, JSON.stringify(entities))
    }

function _makeId(length = 8) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}




// my function


// function removeNote(entityType, entityId) {
//     return query(entityType)
//         .then(entities => {
//             const idx = entities.findIndex(entity => entity.info.id === entityId);
//             entities.splice(idx, 1)
//             _save(entityType, entities)
//         })
// }

// function postNote(entityType, newEntity) {
//     return query(entityType)
//         .then(entities => {
//             entities.push(newEntity);
//             _save(entityType, entities)
//             return newEntity;
//         })
// }
