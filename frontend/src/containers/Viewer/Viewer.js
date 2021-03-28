import React, { Component } from 'react';
import Cards from './Cards/Cards';

class Viewer extends Component{
    render(){
        return(
            <div className='Viewer'>
                <Cards user={this.props.userInfo} />
            </div>
        );
    }
}

export default Viewer;