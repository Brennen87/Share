import config from './config';

class WebSocketInstance {
  constructor() {
    this.socketRef = null;
    this.autoReconnect = true;
    this.callbacks = {};
  }

  connect(chatID) {
    const path = `${config.socketURL}/chat/${chatID}/`;
    this.socketRef = new WebSocket(path);

    this.socketRef.onopen = () => {
      this.autoReconnect = true;
      console.log('WebSocket open:', chatID);
    };

    this.socketRef.onmessage = e => {
      this.onMessage(e.data);
    };

    this.socketRef.onerror = e => {
      console.warn(e.message);
    };

    this.socketRef.onclose = () => {
      this.autoReconnect && this.connect(chatID);
    };
  }

  disconnect() {
    this.autoReconnect = false;
    this.socketRef && this.socketRef.close();
    this.socketRef = null;
  }

  isOpen() {
    return this.socketRef && this.socketRef.readyState === 1;
  }

  send(data) {
    try {
      this.socketRef.send(JSON.stringify(data));
    } catch (err) {
      console.error(err.message);
    }
  }

  onMessage = data => {
    const parsedData = JSON.parse(data);
    if (Object.keys(this.callbacks).includes(parsedData.command)) {
      this.callbacks[parsedData.command](parsedData);
    }
  };

  addCallbacks(commands) {
    commands.forEach(command => {
      this.callbacks[command.type] = command.callback;
    });
  }
}

export default WebSocketInstance;
