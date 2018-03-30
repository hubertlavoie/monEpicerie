import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import './Toolbar.css';
import IconButton from 'material-ui/IconButton';
import ActionClear from 'material-ui/svg-icons/content/clear';
import ListeItems from '../ListeItems/ListeItems';


class laToolbar extends Component {

  state = {open: false};

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {

    const totalPrix = this.props.produits.reduce((total,produit) => {
      return total + (+produit.prixTotal)
    }, 0);

    return (
      <div>
      <Toolbar style={{paddingRight:"0px"}}>
        <ToolbarGroup firstChild={true}>
          <RaisedButton label="Liste d'épicerie" primary={true} onClick={this.handleToggle}/>
        </ToolbarGroup>
        <ToolbarGroup>
          <p className="totalPrice"> <i><strong>{totalPrix.toFixed(2)}</strong> $</i></p>
        </ToolbarGroup>
      </Toolbar>

      <Drawer
        docked={false}
        width={350}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})}
      >
        <div className="listeDepicerie">
          <IconButton tooltip="Fermer" style={{float:"right",marginRight:"5px"}} onClick={this.handleClose}>
            <ActionClear />
          </IconButton>
        <h4 className="listeDepicerie--title">Liste d'épicerie</h4>
        <ListeItems></ListeItems>
        </div>
      </Drawer>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    produits: state.produits.produits
  };
};

export default connect(mapStateToProps)(laToolbar);
