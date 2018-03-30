import React, { Component } from 'react';
import Commande from '../../components/Commande/Commande';
import Produits from '../../components/Produits/Produits';
import Toolbar from '../../components/Toolbar/Toolbar';


class Epicerie extends Component {

  render() {
    return (
      <div>
        <Toolbar></Toolbar>
        <div style={{textAlign:"center"}}><Commande /></div>
        <div style={{maxWidth:"600px",margin:"0 auto"}}><Produits /></div>
      </div>
    );
  }

}

export default Epicerie;
