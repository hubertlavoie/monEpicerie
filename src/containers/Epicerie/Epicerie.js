import React, { Component } from 'react';
import Commande from '../../components/Commande/Commande';
import Produits from '../../components/Produits/Produits';


class Epicerie extends Component {

  render() {
    return (
      <div>
        
        <div style={{textAlign:"center"}}><Commande /></div>
        <div style={{maxWidth:"600px",margin:"0 auto"}}><Produits /></div>
      </div>
    );
  }

}

export default Epicerie;
