import React from "react";

class ShowMessages extends React.Component{
    render(){
        const messages = this.props.messages.map(message=>{
            if(message.senderId===this.props.userId)
                return (
                    <div key={message.id} className="right-align ">
                        <span className="cyan accent-2">{message.text}</span>
                    </div>
                )
            else{
                return(
                    <div key={message.id} className="left-align ">
                        <span className="lime accent-1">{message.text}</span>
                    </div>
                )
            }
        })
        return(
            <div>
                {messages}
            </div>
        )
    }
}

export default ShowMessages;