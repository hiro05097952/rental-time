const socket = require('socket.io');
const htmlEncode = require('js-htmlencode');

const db = require('../model/pool');

function findNowRoom(client) {
  return Object.keys(client.rooms).find((item) => item !== client.id);
}

module.exports = function socketStart(server) {
  const io = socket.listen(server);
  io.on('connection', (client) => {
    // console.log(`socket 用戶連接 ${client.id}`);

    // join room in initial
    client.on('joinRoom', async (room) => {
      try {
        // console.log(room);
        const nowRoom = findNowRoom(client);
        if (nowRoom) {
          client.leave(nowRoom);
        }

        client.join(room, () => {
          io.sockets.in(room).emit('message', {
            type: 'notice',
            content: '已有新人加入聊天室！',
          });
        });
      } catch (err) {
        client.emit('message', {
          type: 'notice',
          content: '加入聊天室失敗',
        });
      }
    });

    // webRTC
    client.on('peerconnectSignaling', (item) => {
      // console.log('接收資料：', item);
      const nowRoom = findNowRoom(client);
      if (nowRoom) {
        client.to(nowRoom).emit('peerconnectSignaling', item);
      } else {
        client.emit('message', {
          type: 'notice',
          content: '視訊傳送失敗，請重新整理網頁',
        });
      }
    });

    // chat
    client.on('message', ({ content, userId, createTime }) => {
      const nowRoom = findNowRoom(client);
      if (nowRoom) {
        io.sockets.in(nowRoom).emit('message', {
          type: 'message',
          content: htmlEncode.htmlEncode(content).trim().replace(/\n/g, '<br />'),
          userId,
          createTime,
        });
      } else {
        client.emit('message', {
          type: 'notice',
          content: '尚未加入房間，請重新整理',
        });
      }
    });

    client.on('mail', async ({ userId, content, toUserId }) => {
      await db.query('INSERT INTO mail SET ?', {
        content,
        toUserId,
        fromUserId: userId,
      });
    });

    client.on('disconnect', () => {
      // console.log(`socket 用戶離開 ${client.id}`);
      const nowRoom = findNowRoom(client);
      if (nowRoom) {
        io.sockets.in(nowRoom).emit('message', {
          type: 'notice',
          content: '對方已離開聊天室',
        });
      }
    });
  });
};
