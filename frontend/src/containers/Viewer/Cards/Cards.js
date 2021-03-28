import React, { Component } from 'react';

import Card from '../../Card/Card';
import axios_mongo from '../../../axios-mongoose';
import classes from './Cards.module.css';

class Cards extends Component{
    state = {
        cards: [],
        services: [],
        code: '',
        interval: ''
    }

    componentDidMount(){
        axios_mongo.get('/service/service')
            .then(res => {
                this.setState({ services: res.data });
                this.generateCode();
            }).catch(error => {
                console.error(error);
            });

        // Interval code adapted from https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
        this.setState({interval: setInterval(() => this.generateCode(), 10000)});
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }
    
    generateCode() {
        axios_mongo.get('/service/code/generate').then(res => {
            this.setState({ code: res.data.codeList });
            
            let service_data = [...this.state.services];

            for (let index = 0; index < service_data.length; index++) {
                service_data[index] = {
                    ...service_data[index],
                    code: res.data.codeList[index]
                }
            }
            this.setState({ services: service_data });
        }).catch(err => console.log(err));
    }



    
    
    render(){
        let cards = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        
        cards = this.state.services.map(service => {
            return(
                    <Card 
                    key={service.id}
                    name={service.name} 
                    code={service.code} 
                    mail={service.mail}
                    username={service.username}
                    />
            );
        });
        
        return(
            <div>
                <section className={classes.Cards}>
                    {cards}
                </section>
            </div>
        );
    }
}

export default Cards;