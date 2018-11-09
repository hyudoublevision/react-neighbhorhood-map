import React, { Component} from 'react';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types'
import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['name']
class MapMenu extends Component {
       constructor(props) {
              super(props);
			  this.state = {
				  searchTerm: ' ',
				  
			  }
          this.searchUpdated = this.searchUpdated.bind(this)
	   }	   
		 

static propTypes = {
	 placeitems: PropTypes.array.isRequired
}



getPlaceItems(){
	
	let items=[];
	let jsx,filteredplaces;
	
	filteredplaces = this.props.placeitems.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    
	  
	filteredplaces.map((placeitem,index) =>
	{
	    items.push(<a key={index} href="" className="menu-item"><i class="fa fa-cutlery" aria-hidden="true"></i><span>{placeitem.name}</span></a>);
		
		
	});
	
	jsx = (
	     <Menu id={'slide'} className="menu-item" pageWrapId={'page-wrap'} outContainerId={'outer-container'} left>
		 <SearchInput className="search-input" onChange={this.searchUpdated} />
			 {items}
		 </Menu>
		 )
	return jsx;
}

searchUpdated (term) {
	this.setState({searchTerm: term})
	
}


  render () {
    return (

	    <div id="outer-container" style={{height: '100%'}}>
             
			 {this.getPlaceItems()}
	    
	     </div>
	 
    );
  }
  
  
}

export default MapMenu