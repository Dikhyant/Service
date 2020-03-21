import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import SendMessage from "./components/sendMessage";
import ShowMessages from "./components/showMessages";

class App extends React.Component{
  state = {
    currentRoomId: "e7b1e390-86a2-4754-ada0-87010091bea8",
    userId: "service",
    messages: []
  }

  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:577ea3fe-ac62-451e-b8f1-f2be66efb4d6',
      userId: this.state.userId,
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/577ea3fe-ac62-451e-b8f1-f2be66efb4d6/token' })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        currentUser.subscribeToRoomMultipart({
          roomId: this.state.currentRoomId,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages , { id: message.id , senderId: message.senderId , text: message.parts[0].payload.content}]
              });
              console.log("received message", message)
            },
            onUserJoined: user => {
              this.user = user;
            }
          },
        })
        console.log('Successful connection', currentUser);
      })
      .catch(err => {
        console.log('Error on connection', err)
      })

    
  }

  sendMessage = (text) =>{
    this.currentUser.sendSimpleMessage({
      roomId: this.state.currentRoomId,
      text: text,
    })
    .then(messageId => {
      console.log(`Added message `)
    })
    .catch(err => {
      console.log(`Error adding message `)
    })
  }

  render(){
    return (
      <div className="App container">
        <ShowMessages messages={this.state.messages} userId={this.state.userId} />
        <SendMessage sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
