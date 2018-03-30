import * as actionTypes from '../actions/actionTypes';

const initialState = {
  produits: []
}

const produits = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.ADDPRODUIT:

      const newProduit = {
        id: Math.random(),
        nomProduit: action.produitData.nomProduit,
        prixTotal: action.produitData.prixTotal,
        tps: action.produitData.tps,
        tvq: action.produitData.tvq,
        prix: action.produitData.prix
      }

      return {
         ...state,
         produits: state.produits.concat(newProduit)
      }

    case actionTypes.DELETEPRODUIT:

      const updatedArray = state.produits.filter(produit => produit.id !== action.prodID);
      return {
        ...state,
        produits: updatedArray
      }

    default:
    return state;

  }

};

export default produits;
