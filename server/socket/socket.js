function findNowRoom(client) {
  return Object.keys(client.rooms).find((item) => item !== client.id);
}

module.exports = function socket(io) {
  io.on('connection', (client) => {
    console.log(`socket 用戶連接 ${client.id}`);

    client.on('joinRoom', (room) => {
      // console.log(room);
      const nowRoom = findNowRoom(client);
      if (nowRoom) {
        client.leave(nowRoom);
      }
      client.join(room, () => {
        io.sockets.in(room).emit('roomBroadcast', '已有新人加入聊天室！');
      });
    });

    client.on('peerconnectSignaling', (message) => {
      // console.log('接收資料：', message);
      const nowRoom = findNowRoom(client);
      client.to(nowRoom).emit('peerconnectSignaling', message);
    });

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

    client.on('disconnect', () => {
      console.log(`socket 用戶離開 ${client.id}`);
    });
  });
};
