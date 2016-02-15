'use strict';

//chat
  //ChatBox
    //Message
  //UserBox
    //User
      //online status
  //InputBox
var Chat = React.createClass({
  getInitialState: function(){
    return { userData: [], messageData: [] };
  },
  loadMessagesFromServer: function(){
    console.log("get");
    $.ajax({
      url: this.props.messageURL,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({messageData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.messageURL, status, err.toString());
      }.bind(this)
    });
  },
  // loadUsersFromServer: function(){
  //   $.ajax({
  //     url: this.props.userURL
  //   });
  // },
  handleMessageSubmit: function(message){
    var messages = this.state.messageData;

    message.id = Date.now();
    var newMessages = messages.concat([message]);
    this.setState({messageData: newMessages});
    $.ajax({
      url: this.props.messageURL,
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function(data){
        this.setState({messageData: data});
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({messageData: messages});
        console.error(this.props.messageURL, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer(), 2000);
  },
  render: function(){
    return (
      <div className='chatbox'>
        <ChatBox messageData={this.state.messageData}/>
        <UserList />
        <FormBox onMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
});
var ChatBox = React.createClass({
  render: function(){
    var messageNode = this.props.messageData.map(function(message){
      return(
        <Message user={message.user} key={message.id} text={message.text}>
        </Message>
      );
    });
    return(
      <div className='chatbox__messages'>
        {messageNode}
      </div>
    );
  }
});
////ChatBox components
var Message = React.createClass({
  render: function(){
    return(
    <div className='chatbox__messages__user-message'>
      <div className='chatbox__messages__user-message--text'>
        <p className='name'> {this.props.user} </p>
        <p className='message-text'> {this.props.text}</p>
      </div>
    </div>
    );
  }
});
////

  
var UserList = React.createClass({
  render: function(){
    return(
      <div className='chatbox__user-list'>
        <h1> User List </h1>
        <User user='Angelina Morris'/>
        <User user='Jacob Smith' />
      </div>
    );
  }
});
////UserBox components

var User = React.createClass({

  getInitialState: function(){
    return({userStatus: 0});
  },  
  render: function(){
    var userStatusClass = 'chatbox__user'
    switch(this.state.userStatus){
    case 0: 
      userStatusClass += '--active';
      break;
    case 1: 
      userStatusClass += '--busy';
      break;
    case 2:
      userStatusClass += '--away';
      break;
    }
    return(
      <div className={userStatusClass}>
      <p> {this.props.user} </p>
      </div>
    );
  }
});
////
var FormBox = React.createClass({
  getInitialState: function(){
    return({text: ''});
  },
  handleMessageChange: function(e){
    this.setState({text: e.target.value});
  },
  handleSumbit: function(e){
    e.preventDefault();
    var text = this.state.text.trim();
    if(!text){
      return;
    }
    this.props.onMessageSubmit({user: 'Jered', text: text});
    this.setState({text: ''});
  },
  render: function(){
    return(
      <div className='FormBox'>
        <form onSubmit={this.handleSumbit}>
          <input 
        type='text'  
        placeholder='Enter your message here:' 
        value={this.state.text} 
        onChange={this.handleMessageChange}
      />
        </form>
      </div>
    );
  }
});
////FormBox components

/*var FormInput = React.createClass({


  render: function(){
    return(
      
    );  
  }  
});*/

////

ReactDOM.render(
  <Chat messageURL='api/messages'/>,
  document.getElementById('content')
);