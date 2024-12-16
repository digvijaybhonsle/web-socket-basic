import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null); // Initialize socket with null
  const inputRef = useRef(); // Initialize useRef

  function sendMessage() {
    if (!socket) {
      return;
    }
    const message = inputRef.current.value; // Use the ref correctly
    //@ts-ignore
    socket.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data);
    };

    return () => {
      ws.close(); 
    };
  }, []);

  return (
    <div>
      <input type="text" placeholder="message.." ref={inputRef} /> {/* Attach ref to input */}
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
