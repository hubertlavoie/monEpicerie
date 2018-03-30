import React, { Component } from 'react';
import Commande from '../../components/Commande/Commande';
import Produits from '../../components/Produits/Produits';
import Aux from '../../hoc/Auxz';

class Epicerie extends Component {

  render() {
    return (
      <Aux>
        <div style={{textAlign:"center"}}><Commande /></div>
        <div style={{maxWidth:"600px",margin:"0 auto"}}><Produits /></div>
      </Aux>
    );
  }

}

export default Epicerie;
