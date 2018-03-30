import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import './Commande.css';
import * as actionTypes from '../../store/actions/actionTypes';
import AutoComplete from 'material-ui/AutoComplete';
import logo from '../../assets/images/monEpicerie.png';
import Toggle from 'material-ui/Toggle';
// import * as actions from '../../store/actions/index';

const TAXES = {
  tps: 5,
  tvq: 9.975
}

class Commande extends Component {

  state = {
    nomProduit: "",
    montantInitial: "",
    montantFinal: null,
    totalTPS: null,
    totalTVQ: null,
    open: false,    
    isDeleted: false,
    toggle: false
  }

  componentDidMount() {
    window.addEventListener("keypress", this.keyPressedProduits);
  }

  keyPressedProduits=(event)=>{
    if (event.keyCode === 13 && this.state.montantInitial !== ""){
      this.props.addProduit(this.state.nomProduit,this.state.montantFinal,this.state.totalTPS,this.state.totalTVQ,this.state.montantInitial);
      this.props.verifyIfInList(this.state.nom);
      this.resetProd(event);
      this.handleClick();
    }
  }

  calculerTaxes = (event,onEnter) => {
    this.setState({montantInitial: event.target.value});
    let calculTPS;
    let calculTVQ;
    if(this.state.toggle){
       calculTPS = 0;
       calculTVQ = 0;
    } else {
       calculTPS = +event.target.value * TAXES.tps / 100;
       calculTVQ = (+event.target.value) * TAXES.tvq / 100;
    }
    
    this.setState({totalTPS: calculTPS.toFixed(2)});
    this.setState({totalTVQ: calculTVQ.toFixed(2)});
    this.setState({montantFinal: ((+event.target.value) + calculTVQ + calculTPS).toFixed(2)})
  }

  creationDuProduit = (event) =>{
      this.setState({nomProduit: event.toLowerCase()});
  }

  resetProd = (event) => {
    this.setState({
      montantInitial: "",
      totalTPS: null,
      totalTVQ: null,
      montantFinal: null,
      nomProduit: ""
    });
    window.navigator.vibrate(5);
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

  noTaxToggle = () => {
    let toggle = !this.state.toggle;
    this.setState({toggle: toggle});
    if(this.state.montantInitial !== ""){
      this.setState({montantInitial: ""});
    }
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {

    // let montantInitial = this.state.montantInitial ? this.state.montantInitial + "$" : null;
    // let tps = this.state.montantInitial !== "" ? this.state.totalTPS + "$" : null;
    // let tvq = this.state.montantInitial !== "" ? this.state.totalTVQ + "$" : null;
    // let montantFinal = this.state.montantInitial !== "" ? (+this.state.montantInitial + +this.state.totalTPS + +this.state.totalTVQ).toFixed(2) + "$" : null;

    let btnDisabled = true;
    this.state.montantInitial ? btnDisabled = false : btnDisabled = true;

    // let showTaxes = null;
    // if (this.state.montantInitial !== "" && !this.state.toggle){
    //   showTaxes = (
    //   <div className="showTaxes">
    //   <p><strong>Avant taxes</strong> : {montantInitial}</p>
    //   <p><strong>TPS</strong> : {tps}</p>
    //   <p><strong>TVQ</strong> : {tvq}</p>
    //   <p><strong>Total</strong> : {montantFinal}</p>
    //   </div>)
    // }

    let lesProduitsDeLaListe = this.props.listeProduits.map(x=>{

    if(x.isAdded !== true){
      return this.capitalizeFirstLetter(x.nom)
    } else {
      return null
    }
    });

    let isDisabled = true;
    this.state.nomProduit !== "" ? isDisabled = false : isDisabled = true;

    return (

      <div style={{marginTop:"40px"}}>
        <h2><img src={logo} alt="Mon épicerie"/></h2>

        <div className="nouveauProduit">
          <AutoComplete
            hintText="Nom du produit"
            floatingLabelText="Nom du produit"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={lesProduitsDeLaListe}
            onUpdateInput={this.creationDuProduit}
            searchText={this.state.nomProduit}
            maxSearchResults={5}
          />
          <div style={{margin:"0px 0px 5px 25px",position:"relative",top:"20px"}}>
          <Toggle
            label="Cliquez si produit sans taxes"
            labelPosition="right"
            className="toggleInput"
            onToggle={this.noTaxToggle}
          />
          </div>
          <TextField
            hintText="Montant avant/hors taxes"
            floatingLabelText="Montant avant/hors taxes"
            type="number"
            disabled={isDisabled}
            className="prixtaxe"
            onChange={this.calculerTaxes}
            value={this.state.montantInitial}
          />
          {/* <br/>
          {showTaxes} */}
        </div>

        <FloatingActionButton
          style={{margin:"20px 0"}}
          disabled={btnDisabled}
          onClick={
            (e) => {
            this.props.addProduit(this.state.nomProduit,this.state.montantFinal,this.state.totalTPS,this.state.totalTVQ,this.state.montantInitial);
            this.props.verifyIfInList(this.state.nomProduit);
            this.resetProd(e);
            this.handleClick();
            }
          }>
          <ContentAdd />
        </FloatingActionButton>

        <Snackbar
          open={this.state.open}
          message="Votre produit a été ajouté 👍"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />

      </div>
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
    addProduit: (nom,prixTotal,tps,tvq,leprix) => dispatch({type: actionTypes.ADDPRODUIT, produitData: {nomProduit: nom, prixTotal: prixTotal, tps: tps, tvq: tvq, prix: leprix}}),
    verifyIfInList: (lnom) => dispatch({type: actionTypes.VERIFYIFINLIST, nom: lnom}) 
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Commande);
