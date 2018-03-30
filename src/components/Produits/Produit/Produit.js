import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import './Produit.css';

class Produit extends Component {

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    
    return (
      <div className="Produit">
        <FloatingActionButton className="deleteButton" mini={true} secondary={true} onClick={this.props.clicked}>
          <DeleteSweep />
        </FloatingActionButton>
        <h3>{this.capitalizeFirstLetter(this.props.nomProduit)}</h3>
        <h5>Prix: {this.props.leprix}$ &nbsp; Tps: {this.props.tps}$ &nbsp; Tvq: {this.props.tvq}$ &nbsp; Total: {this.props.total}$</h5>
      </div>
    )

  }

  
}

export default Produit;
