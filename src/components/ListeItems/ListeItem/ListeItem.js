import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import DeleteItem from 'material-ui/svg-icons/content/delete-sweep';

class listeItem extends Component {
    render() { 
        let styleSelected;
        this.props.selected ? styleSelected = {textDecoration:"line-through"} : styleSelected = {} ;
        
        return ( 
            <ListItem primaryText={this.props.primaryText} style={styleSelected} rightIcon={<DeleteItem style={{color:"#ff4081",fill:"currentColor"}} />} onClick={this.props.click} />
         )
    }
}
 
export default listeItem;
