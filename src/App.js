import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './AppComponents/MapContainer';
import MapMenuTest from './AppComponents/MapMenuTest';
import Yelp from './API/Yelp';

class App extends Component {
    state = {
		  placeArray:[
		  {
			  name: 'Chick-fil-a',
			  position: {
				  lat: 32.8943,
				  lng: -96.4704
			  },
			  iconurl: require("./AppComponents/image/chickfila.png"),
			  rating: '',
			  zipcode: 75087,
			  reviewCount: ''
		   },
		   
		  {
			  
			  name: "Carl's Jr",
			  position: {
				  lat: 32.9182,
				  lng: -96.4192
				  },
				  
			  iconurl: require("./AppComponents/image/carls.jpg"),
			  rating: '',
			  zipcode: 75087,
			  reviewCount: ''
			  
		   },
		   {
			   name: "Luby's",
			   position: {
			      lat: 32.9084,
				  lng: -96.4486
			   
			   },
			   iconurl: require("./AppComponents/image/lubys.jpg"),
			   rating: '',
			   zipcode: 75087,
			   reviewCount: ''
			},
			{
				
				name: "Buffalo Wild Wings",
				position: {
					lat: 32.9025,
					lng: -96.4547
					},
				iconurl: require("./AppComponents/image/buffalo.jpg"),
				rating: '',
				zipcode: 75087,
				reviewCount: ''
			},
			{
				name: "McDonald",
				position: {
					lat: 32.9637,
					lng: -96.4641
				},
				iconurl: require("./AppComponents/image/mcdonald.png"),
				rating: '',
				zipcode: 75087,
				reviewCount: ''
				
			}
			
		],
		query: '', 
		currentPlaceList: [],
		dataSuccess: true
		};
	


   componentDidMount() {
		
		this.getYelpData();
        
	}
	
	//Calling Yelp API
	getYelpData = () => {
		const newPlaceArr = [];
       const newPlaces = this.state.placeArray.map((place) => {
	  Yelp.search(place.name, place.zipcode,'best_match').then((businesses) => {
		         place.rating = businesses[0].rating;
				 place.reviewCount = businesses[0].reviewCount;
				 console.log(businesses[0]);
				 }).catch(() => this.setState({ dataSuccess: false }));
      return place;
    })
	//set currentPlaceList
    this.setState({ currentPlaceList: newPlaces });
	
}
	
	//Search and Filter
	filterQuery = (val) => {
		this.setState({query: val});
		this.filterPlaces(val);
		
}

    filterPlaces = (query) => {
		if(query.length === 0)
		{
			this.setState({currentPlaceList: this.state.placeArray});
			
		}
		else{
		 const filteredplaces = this.state.placeArray.filter((placeitem) => placeitem.name.toLowerCase().includes(query.toLowerCase()));
		 this.setState({ currentPlaceList: filteredplaces });
	     }
}
	
	
	setActiveMarker = (marker) => {
		document.querySelector(`[title="${marker}"]`).click();
		
	}
	
	
render() {
	return (
	<div className={'App'}>
	     <MapMenuTest placeitems={this.state.currentPlaceList} setActiveMarker={this.setActiveMarker} />
		   <div className="search-books-bar">
                       <div className="search-books-input-wrapper">
		                     <input aria-label='Search filter' type="text" placeholder="Search for fast food restaurant in Rockwall" value={this.state.query} onChange={(event) => this.filterQuery(event.target.value)} />
		                </div>
                     </div>
	     <MapContainer placeList={this.state.currentPlaceList} mapCenter={this.state.placeArray[0].position} activeMarker={this.state.activeMarker} yelpdataSuccess={this.state.dataSuccess} />
	</div>
	);
  }
}

export default App;

