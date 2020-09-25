import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Pusher from 'pusher-js';
import axios from './axios.js';

function App() {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data);
    });
  }, []);

  React.useEffect(() => {
    var pusher = new Pusher('8357759f21065db0bc74', {
      cluster: 'eu',
    });

    var channel = pusher.subscribe('message');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

/*48 : 08*/
/*1:18:15*/

export default App;
