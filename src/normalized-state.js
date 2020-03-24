import {schema, normalize} from 'normalizr'
import defaultState from './default-state'


const user = new schema.Entity('users')
const card = new schema.Entity('cards', {assignedTo: user})
const list = new schema.Entity('lists', {
        cards : [card]
})

// je te donne l'array d'objets lists et renvoie moi un array list selon le schema ci-dessus
const normalizedLists = normalize(defaultState.lists, [list])
const normalizedUsers = normalize(defaultState.users, [user])


// Ma liste est normalisée j'en prends les entités lists
export const lists = {
    entities: normalizedLists.entities.lists,
    ids: normalizedLists.result // l'array des ids après la normalization  (comme Steve nous a montré dans runkit => normalizr renvoie l'objetc modifié + un array d'ids des éléments modifiés)
}

export const users = {
    entities: normalizedUsers.entities.users,
    ids: normalizedUsers.result,
};


// idem + haut
export const cards = {
    entities: normalizedUsers.entities.cards,
    ids: Object.keys(normalizedLists.entities.cards)
}

export default {user, lists, cards}