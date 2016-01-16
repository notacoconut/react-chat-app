'use strict';

//chat
  //ChatBox
    //Message
  //UserBox
    //User
      //online status
  //InputBox
var Chat = React.createClass({
  render: function(){
    return (
      <div className='chatbox'>
        <ChatBox />
        <UserList />
        <FormBox />
      </div>
    );
  }
});
var ChatBox = React.createClass({
  render: function(){
    return(
      <div className='chatbox__messages'>
        <Message />
        <Message />
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
        <p className='name'> Jered </p>
        <p className='message-text'> Hello, world. This is my chat. </p>
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
        <div className='chatbox__user--active'>
          <p>Jack Thomson</p>
        </div>
        <div className='chatbox__user--busy'>
          <p>Angelina Jolie</p>
        </div>
      </div>
    );
  }
});
////UserBox components

////
var FormBox = React.createClass({
  render: function(){
    return(
      <div className='FormBox'>
        <form>
          <input type='text'  placeholder='Enter your message here:'/>
        </form>
      </div>
    );
  }
});
////InputBox components

////

ReactDOM.render(
  <Chat />,
  document.getElementById('content')
);