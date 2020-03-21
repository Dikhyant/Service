import React from "react";

class SendMessage extends React.Component{
    state = {
        text: ""
    }
    
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.sendMessage(this.state.text);
        this.setState({
            text: ""
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div><textarea id="text" className="materialize-textarea" value={this.state.text} onChange={this.handleChange}></textarea></div>
                    <div><button className="btn waves-effect waves-light">Send<i className="material-icons right">send</i></button></div>
                </form>
            </div>
        )
    }
}

export default SendMessage;