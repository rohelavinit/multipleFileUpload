import React from 'react';

export default class MultiFileSelect extends React.Component{
    constructor(){
        super();
        this.state={id:''}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
    
         this.setState({
             [id]: value
         });
    
        console.log(id)
        console.log(value)
    }

    render(){
        return(
            <div>
                <input id="file" type="file" onChange={this.handleChange} required multiple />
            </div>
        );
    }
}