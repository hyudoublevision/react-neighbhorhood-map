import React, { Component } from 'react';


class errorHandle extends Component{
           state = { hasError: false };
		  
		  
	  
	  
	  render() {
	        if(this.state.hasError)
			{
			   return (
			        <h1>Error with the application</h1>
				 )
			
			}
       }

}

export default errorHandle;	   








