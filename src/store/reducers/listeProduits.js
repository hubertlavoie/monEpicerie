import * as actionTypes from '../actions/actionTypes';


const initialState = {
  listeProduits: []
}

const listeProduits = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.RESETALL:

    let removeProductAdded = state.listeProduits.filter(produits=> produits.isAdded !== true)

    return{
      ...state,
      listeProduits: removeProductAdded
    }

    case actionTypes.VERIFYIFINLIST:

    let arrayIsInList = state.listeProduits.map(produits => {
      if(produits.nom === action.nom){
        return {
          ...produits,
          isAdded: true
        }
      }else{
        return {...produits}
      }

    })

    return{
      ...state,
      listeProduits: arrayIsInList
    }

    
    case actionTypes.DELETEPRODUIT:

    let arrayWithProduitDeleted = state.listeProduits.map(produits => {
      if(produits.nom === action.nomProduit){
          return{
            ...produits,
            isAdded: false
          }
      }else{
          return{
            ...produits
          }
      }
    })

    return {
      ...state,
      listeProduits: arrayWithProduitDeleted
    }


    case actionTypes.DELETEPRODUITSFROMDATASUCC:

    const updatedArray3 = state.listeProduits.filter(produit => produit.id !== action.leId);
    return{
      ...state,
      listeProduits: updatedArray3
    }

    case actionTypes.LISTEADDPRODUIT:

    const newProduitListe = {
      id: action.id,
      nom: (action.nomProduit).toLowerCase(),
      idAdded: false
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
