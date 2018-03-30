import * as actionTypes from '../actions/actionTypes';


const initialState = {
  listeProduits: []
}

const listeProduits = (state = initialState, action) => {

  switch (action.type) {


    case actionTypes.DELETEPRODUITSFROMDATASUCC:

    const updatedArray3 = state.listeProduits.filter(produit => produit.id !== action.leId);
    return{
      ...state,
      listeProduits: updatedArray3
    }

    case actionTypes.LISTEADDPRODUIT:

    const newProduitListe = {
      id: action.id,
      nom: action.nomProduit
    }

    return {
      ...state,
      listeProduits: state.listeProduits.concat(newProduitListe)
    }

    // case actionTypes.LISTEDELETEPRODUIT:

    // const updatedArray2 = state.listeProduits.filter(produit => produit.id !== action.prodID);
    // return {
    //   ...state,
    //   listeProduits: updatedArray2
    // }

    case actionTypes.ADDPRODUITSTODATA:
    return{
      ...state,
      listeProduits: action.listeProduits
    }

    

    default:
    return state;

  }

};

export default listeProduits;
