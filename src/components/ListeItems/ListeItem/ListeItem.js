import React from 'react';
import {ListItem} from 'material-ui/List';
import DeleteItem from 'material-ui/svg-icons/content/delete-sweep';

const listeItem = (props) => (
    <ListItem primaryText={props.primaryText} rightIcon={<DeleteItem style={{color:"#ff4081",fill:"currentColor"}} />} onClick={props.click} />
);

export default listeItem;
