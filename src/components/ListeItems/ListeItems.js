import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Aux from '../../hoc/Auxz';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import ListeItem from './ListeItem/ListeItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './ListeItems.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as actions from '../../store/actions/index';

class ListeItems extends Component {

  state={
    nouveauProduit: ""
  }

  resetNouveauProduit = () => {
    this.setState({nouveauProduit: ""});
      window.navigator.vibrate(5);
  }

  setNouveauProduit = (event) => {
    this.setState({nouveauProduit: event.target.value});

  }

  keyPressed = (event) => {
    if (event.keyCode === 13 && this.state.nouveauProduit !== ""){
      this.props.addProduit(this.state.nouveauProduit);
      this.resetNouveauProduit();
    }
  }

  componentDidMount() {
    window.addEventListener("keypress", this.keyPressed);
    this.props.onDispatchProduits();
  }

  vibrate = () => {
    window.navigator.vibrate(5);
  }

  render() {
    let btnDisabled = true;
    if(this.state.nouveauProduit !== ""){
      btnDisabled = false;
    }

    let lesItems = this.props.listeProduits.map(x=>{
      return <ListeItem primaryText={x.nom} key={x.id} click={() => {
        this.props.deleteProduit(x.id);
        this.vibrate();
      }} />
    })

    return (
      <Aux>
        <div className="ajouterProduit">
        <TextField
          hintText="Nouveau produit" className="ajouterProduitInput" floatingLabelText="Nouveau produit" type="text" onChange={this.setNouveauProduit} value={this.state.nouveauProduit} style={{width:"100%"}}
        /><br/>
        <FloatingActionButton
          style={{margin:"20px 0"}}
          disabled={btnDisabled}
           mini={true}
           onClick={() => {
             this.props.addProduit(this.state.nouveauProduit);
             this.resetNouveauProduit();
           }}
          >
          <ContentAdd />
        </FloatingActionButton>
        </div>

        <List>
          {lesItems}
        </List>
      </Aux>
    );
  }

}
const mapStateToProps = state => {
  return {
    listeProduits: state.listeProduits.listeProduits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProduit: (nom) => dispatch(actions.addListeProduit(nom)),
    onDispatchProduits: () => dispatch(actions.dispatchProduits()),
    deleteProduit: (id) => dispatch(actions.deleteProduitsFromData(id))
    // addProduit: (nom) => dispatch({type: actionTypes.LISTEADDPRODUIT, nomProduit: nom}),
    // deleteProduit: (id) => dispatch({type: actionTypes.LISTEDELETEPRODUIT, prodID: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListeItems);
