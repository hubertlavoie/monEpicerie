import * as actionTypes from './actionTypes';
import axios from '../../axios-produits.js';
import * as firebase from "firebase";

export const addListeProduitSuccess = (id, nom) => {
  return {
    type: actionTypes.LISTEADDPRODUIT, id:id, nomProduit: nom
  };
};

export const addListeProduitFail = (error) => {
  return {
    type:actionTypes.LISTEADDPRODUITFAIL,
    error: error
  };
};

export const addListeProduit = (nom) => {

  let leNouveauId = '_' + Math.random().toString(36).substr(2, 15)+Math.random().toString(36).substr(2, 15);

  return dispatch => {
    
    firebase.database().ref('produits/' + leNouveauId).set({
      isAdded: false,
      nom: nom.toLowerCase()
      
    }).then ( response => {
        dispatch(addListeProduitSuccess(leNouveauId, nom));
    }).catch ( error => {
      dispatch(addListeProduitFail(error));
    });

  }
};



export const addProduitsFromData = (listeProduits) => {
  return {
    type:actionTypes.ADDPRODUITSTODATA,
    listeProduits: listeProduits
  }
};

export const addProduitsFromDataError = (error) => {
  return {
    type:actionTypes.ADDPRODUITSTODATAERROR,
    error: error
  }
};

export const dispatchProduits = () => {

  return dispatch => {
    
    axios.get('/produits.json')
    .then(res=>{
      const listeProduits = [];
      for (let key in res.data){
        listeProduits.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(addProduitsFromData(listeProduits));
    })
    .catch(err=>{
      dispatch(addProduitsFromDataError(err));
    });
  };

};

export const deleteProduitsFromDataSuccess = (id) => {
  
  return{
    type: actionTypes.DELETEPRODUITSFROMDATASUCC,
    leId: id
  }
};

export const deleteProduitsFromData = (id) => {

  return dispatch => {

    firebase.database().ref('produits/' + id).remove().then((response) => {
      
      dispatch(deleteProduitsFromDataSuccess(id));

  }, (error) => {
    // error callback
  });
  }
};
