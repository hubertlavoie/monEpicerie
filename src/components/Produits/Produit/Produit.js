import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import './Produit.css';

const Produit = (props) => (
  <div className="Produit">
    <FloatingActionButton className="deleteButton" mini={true} secondary={true} onClick={props.clicked}>
      <DeleteSweep />
    </FloatingActionButton>
    <h3>{props.nomProduit}</h3>
    <h5>Prix: {props.leprix}$ &nbsp; Tps: {props.tps}$ &nbsp; Tvq: {props.tvq}$ &nbsp; Total: {props.total}$</h5>
  </div>
);

export default Produit;
