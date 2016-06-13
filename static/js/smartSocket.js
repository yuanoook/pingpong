+function(window){
  /*
  用法：var socket = new smartSocket('ws://localhost/ws');
  很大部分工作都是为了保证数据畅通
  特别是断开连接和重新连接的时候保证数据不会丢失
  */

  window.smartSocket = smartSocket;

  function smartSocket(url,reconnect_timespan) {
    //这里的 url 配置和服务器端的配置是相对应的，服务器端是用的 http 服务和 websocket 服务共享端口的模式
    var url = this.url = url||('ws://' + location.host);
    var socket;
    var me = this;

    var connect_tasks = [];
    var tasks = [];
    var message_listeners = [];

    init();

    this.send = function (data) {
      data = typeof data == 'string' ? data : JSON.stringify(data);
      if (socket.readyState == 1) {
        socket.send(data);
      } else {
        tasks.push(data);
      }
    }
    this.sendOnConnected = function(data) {
      data = typeof data == 'string' ? data : JSON.stringify(data);
      if (socket.readyState == 1) {
        socket.send(data);
      }
      connect_tasks.push(data);
    }
    this.addMessageListener = function (func) {
      message_listeners.push( func );
    }

    function init(){
      socket = me.socket = new WebSocket( me.url );

      socket.addEventListener('message', function (event) {
        var data = event.data;
        data = typeof data == 'string' ? JSON.parse(data) : data;
        message_listeners.forEach(function(listener){
          listener( data );
        });
      });
      socket.addEventListener('open', function () {
        window.dispatchEvent(new CustomEvent('websocket:open',{socket:socket,smartSocket:me}));
        while( tasks.length ){
          socket.send( tasks.pop() );
        }
        for( i in connect_tasks ){
          socket.send( connect_tasks[i] );
        }
      });
      socket.addEventListener('close', function () {
        window.dispatchEvent(new CustomEvent('websocket:close',{socket:socket,smartSocket:me}));
        setTimeout(init, reconnect_timespan||1000);
      });
    }
  };
}(window);
