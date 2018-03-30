import React, { Component } from 'react';
import Aux from '../../hoc/Auxz';
import Produit from './Produit/Produit';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from "firebase";


class Produits extends Component {

  state ={
    open:false,
    commandePasse: false
  }

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleCommandePasse = () => {
    this.setState({
      commandePasse: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      commandePasse: false
    });
  };

  vibrate = () => {
    window.navigator.vibrate(5);
  }

  removeProdsFromDatabase = () => {
    this.props.listeProduits.forEach(
      produits => {
        if(produits.isAdded === true){
          firebase.database().ref('produits/' + produits.id).remove()
        }
      }
    );
    this.handleCommandePasse();
   
  }

  render() {
    let btnPasserCommande;
    let lesProduits = null;
    if (this.props.produits.length > 0){
      lesProduits = this.props.produits.map((e)=>{
        let produitToFixed = e.prix;
        produitToFixed = +produitToFixed;
        produitToFixed = produitToFixed.toFixed(2);
        return <Produit
          key={e.id}
          nomProduit={e.nomProduit}
          tps={e.tps}
          tvq={e.tvq}
          total={e.prixTotal}
          leprix={produitToFixed}
          clicked={()=> {
            this.props.deleteProduit(e.id, e.nomProduit);
            this.handleClick();
            this.vibrate();
          }} />
      })
      btnPasserCommande = <div style={{textAlign:"center",margin:"30px 0"}}><RaisedButton primary label="Passer la commande" onClick={()=>{
        this.props.resetAll();
        this.removeProdsFromDatabase();
        
      }
        
      } /></div>;
    }


    return (
      <Aux>
        {lesProduits}
        {btnPasserCommande}
        <div style={{textAlign:"center"}}>
          <Snackbar
            open={this.state.open}
            message="Le produit a été supprimé 😡"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={this.state.commandePasse}
            message="Votre épicerie est maintenant terminée 😂"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </Aux>
    );
  }

}

const mapStateToProps = state => {
  return {
    produits: state.produits.produits,
    listeProduits : state.listeProduits.listeProduits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduit: (id,nomProduit) => dispatch({type: actionTypes.DELETEPRODUIT, prodID: id, nomProduit: nomProduit}),
    resetAll: () => dispatch({type: actionTypes.RESETALL})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Produits);
