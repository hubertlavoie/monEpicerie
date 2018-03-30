import React, { Component } from 'react';
import Aux from '../../hoc/Auxz';
import Produit from './Produit/Produit';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import Snackbar from 'material-ui/Snackbar';

class Produits extends Component {

  state ={
    open:false
  }

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  vibrate = () => {
    window.navigator.vibrate(5);
  }

  render() {

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
            this.props.deleteProduit(e.id);
            this.handleClick();
            this.vibrate();
          }} />
      })
    }

    return (
      <Aux>
        {lesProduits}
        <div style={{textAlign:"center"}}>
          <Snackbar
            open={this.state.open}
            message="Le produit a été supprimé 😡"
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
    produits: state.produits.produits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProduit: (id) => dispatch({type: actionTypes.DELETEPRODUIT, prodID: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Produits);
