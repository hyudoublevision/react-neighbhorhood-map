import React, { Component} from 'react';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types'



class MapMenuTest extends Component {
       constructor(props) {
              super(props);
		  
	   }	   
		 

static propTypes = {
	 placeitems: PropTypes.array.isRequired
}


//Populate place List 
getPlaceItems(){
	
	let items=[];
	let jsx;
	  
	this.props.placeitems.map((placeitem,index) =>
	{
	    items.push(<a key={index} arial-label="menu place item" tabIndex='0' onClick={() => this.props.setActiveMarker(placeitem.name)} className="menu-item"><i className="fa fa-cutlery" aria-hidden="true"></i><span>{placeitem.name}</span></a>);
		
		
	});
	
	jsx = (
	     <Menu id={'slide'} className="menu-item" pageWrapId={'page-wrap'} outContainerId={'outer-container'} left>
		 
			 {items}
		 </Menu>
		 )
	return jsx;
}

  render () {
    return (

	    <div id="outer-container" style={{height: '100%'}}>
             
			 {this.getPlaceItems()}
	    
	     </div>
	 
    );
  }
  
  
}

export default MapMenuTest