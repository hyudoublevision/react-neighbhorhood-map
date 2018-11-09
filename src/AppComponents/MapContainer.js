import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';




export class MapContainer extends Component {
   state = {
	     showingInfoWindow: false, 
		 activeMarker: {}, 
		 selectedPlace: {},
		 mapCenter: {}, 
		 bounds: {}
		 
	   
}
   componentDidMount()
   {
       this.setState({mapCenter: this.props.mapCenter})
	   const bd = new this.props.google.maps.LatLngBounds();
	   for(var i = 0; i < this.props.placeList.length; i++)
	   {
		   bd.extend(this.props.placeList[i].position);
	   }
	   this.setState({bounds: bd})
   }
   
   //onMapClicked method
   onMapClicked = (props) => {
	   if(this.state.showingInfoWindow) {
		   this.setState({
		       showingInfoWindow: false,
			   activeMarker: null
		   });
	   }
	   
     };
   
   //filter markers based on placeList
   onMarkerClick = (props, marker, e) => {
	   const place = this.props.placeList.filter((place) => place.name === props.name )
	   this.setState({
		   showingInfoWindow: true,
		   activeMarker: marker,
		   selectedPlace: place[0]
		   
		  
		   
	   });
	   
	   
   }
   //close the inforwindow
      onInfoWindowClose = () => {
		   
		  this.setState({
			  activeMarker: {},
			  showingInfoWindow: false
		  });
		  
	}
   
   render()
   {
	   const {google} = this.props;
	   const maps = google.maps;
	   const style = {
		   width: '100%',
		   height: '100%',
		   position: 'relative'
	   }
	  return(
	   <div>
        <Map google={this.props.google} 
		     style={style}
		     initialCenter={this.state.mapCenter}
			 bounds={this.state.bounds}
		     zoom={22}
			onClick={this.onMapClicked}
			>
			{this.props.placeList.map((place,i) =>
			         
              <Marker key={i} onClick={this.onMarkerClick} title={place.name} name={place.name} position={{lat: place.position.lat, lng: place.position.lng}} icon={{url: place.iconurl}} animation={this.state.activeMarker.name === place.name &&this.props.google.maps.Animation.DROP}/>
			)}
			<InfoWindow marker={this.state.activeMarker} onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
				{this.props.yelpdataSuccess ? (
			       <div aria-label="InfoWindow marker">
						 <h2 tableIndex="0">{this.state.selectedPlace.name}</h2>
						 <h3 tableIndex="0">Rating: {this.state.selectedPlace.rating}</h3>
						 <h3 tableIndex="0">Review Count: {this.state.selectedPlace.reviewCount}</h3>
						 
			       </div>
				) : 
				(  
				   <div aria-label="InfoWindow marker">
				     <h2 tableIndex="0">{this.state.selectedPlace.name}</h2>
					 <p>Getting Yelp Data error</p>
				   </div>
				 )}
			</InfoWindow>
    	 </Map>
		</div>
       )
   }

}


MapContainer.propTypes ={
	 placeList: PropTypes.array.isRequired,
	 
}




export default GoogleApiWrapper({
      apiKey: 'AIzaSyCK-N8HUvo42aU5P2fiV4n-4OHXRkAdRqg'
	})(MapContainer);