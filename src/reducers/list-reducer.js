import { lists as defaultLists } from '../normalized-state';
import set from 'lodash/fp/set';

const listsReducer = (lists = defaultLists, action) => {
  if (action.type === 'CARD_CREATE') {
    const { cardId, listId } = action.payload;

    // la version authentique du code
    const entities = { ...lists.entities } // on fait une copie des entités (pour que ce soit un objet différent pour React)
    entities[listId] = {  // on s'occupe de cette liste là (id) en particulier
      ...entities[listId], // on copie tout ce qu'il y a dans cette liste
      cards: entities[listId].cards.concat(cardId) // on ajoute une carte à la liste id (que l'on a copiée) avec le nouvel id de la carte qui vient du payload
    }
    return {
      ...lists, // on copie toutes les listes
      entities, // et on retourne l'objet entities que l'on vient de copier et amender d'une carte
    }

    // with lodash -> simplifier le code 
    //const cards = lists.entities[listId].cards.concat(cardId);
    //return set(['entities', listId, 'cards'], cards, lists);

  }
  return lists;
};

export default listsReducer;
