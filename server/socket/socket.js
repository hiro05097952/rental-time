const socket = require('socket.io');
const jwt = require('jsonwebtoken');

function findNowRoom(client) {
  return Object.keys(client.rooms).find((item) => item !== client.id);
}

module.exports = function socketStart(server) {
  const io = socket.listen(server);
  io.on('connection', (client) => {
    console.log(`socket 用戶連接 ${client.id}`);

    // join room in initial
    client.on('joinRoom', async (token) => {
      try {
        // console.log(room);
        const nowRoom = findNowRoom(client);
        if (nowRoom) {
          client.leave(nowRoom);
        }
        const decodeJWT = jwt.verify(token, 'reantal_time_chat');

        client.join(decodeJWT.room, () => {
          io.sockets.in(decodeJWT.room).emit('roomBroadcast', {
            success: true,
            message: '已有新人加入聊天室！',
          });
        });
      } catch (err) {
        client.emit('roomBroadcast', {
          success: false,
          message: '加入聊天室失敗',
        });
      }
    });

    // webRTC
    client.on('peerconnectSignaling', (message) => {
      // console.log('接收資料：', message);
      const nowRoom = findNowRoom(client);
      client.to(nowRoom).emit('peerconnectSignaling', message);
    });

    // chat
    client.on('message', (message) => {
      const nowRoom = findNowRoom(client);
      if (nowRoom) {
        client.to(nowRoom).emit('message', message);
      } else {
        client.emit('message', {
          success: false,
          message: '尚未加入房間',
        });
      }
    });

    // client.on('finish', () => {
    //   const nowRoom = findNowRoom(client);
    //   if (nowRoom) {
    //     client.leave(nowRoom);
    //   }
    // });

    client.on('disconnect', () => {
      console.log(`socket 用戶離開 ${client.id}`);
    });
  });
};
