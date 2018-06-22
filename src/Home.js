import React from 'react';
import axios from 'axios'
import MultiFileSelect from './MultiFileSelect';
import './home.css'

export default class Home extends React.Component{
    constructor(){
        super();
        this.state = {action:'BUTTON',file: '',imagePreviewUrl: ''};
        this.form = this.form.bind(this);
        this.view = this.view.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
        this.createProgram = this.createProgram.bind(this);
        this.multiFileSelect = this.multiFileSelect.bind(this);
    }

    form(){
        this.setState({action:'FORM'});
    }

    view(){
        this.setState({action:'VIEW'});
    }

    imageUpload(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
    }

    createProgram(event){
        var programReq = {
            programName: document.getElementById('programName').value, 
            programDesc: document.getElementById('programDesc').value,
            imageUrl:    this.state.imagePreviewUrl
          }
        axios.post('program-request', programReq)
        .then((response) => {     
        console.log("success");
        })
        .catch(error => {
            console.log(error);
        })
    }

    multiFileSelect(){
        this.setState({action:'MultiFileSelect'})
    }

    render(){
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        switch(this.state.action){
            case "BUTTON" :
            return(
                <div>
                    <div>
                        <button onClick={this.form}>FORM</button><br/><br/>
                    </div>
                    <div>
                        <button onClick={this.view}>VIEW</button><br/><br/>
                    </div>
                    <div>
                        <button onClick={this.multiFileSelect}>MULTI FILE SELECT</button><br/><br/>
                    </div>
                </div>
            );
            case "FORM" :
            return(
                <div>
                    FORM<br/><br/>
                    <input placeholder='Enter Program Name' type='string' id='programName'/><br/><br/>
                    <input placeholder='Enter Program Description' type='string' id='programDesc'/><br/><br/>
                    <input className="fileInput" 
                        type="file" 
                        onChange={(e)=>this.imageUpload(e)} /><br/><br/>
                    <div className="imgPreview">
                        {imagePreview}
                    </div><br/><br/>
                    <button onClick={this.createProgram}>Submit</button>
                </div>
            );
            case "VIEW" :
            return(
                <div>
                    VIEW
                </div>
            );
            case "MultiFileSelect" :
            return(
                <div>
                    <MultiFileSelect />
                </div>
            );
        }
    }
}