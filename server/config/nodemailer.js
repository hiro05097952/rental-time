const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.gmailUser,
    pass: process.env.gmailPass,
  },
});

function sendSignUpEmail(user) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: `'Rental Time' ${user.email}`,
      to: user.email,
      subject: '驗證您的 Rental Time 電子郵件',
      html: `<div>
      <p>${user.name} 您好：</p>
      
      <p>請點選以下連結驗證您的電子郵件地址。</p>
      
      <p><a href="${user.url}" target="_blank" >${user.url}</a></p>
      
      <p>如果您並未要求驗證這個地址，可以忽略這封電子郵件。</p>
      
      <p>感謝您！</p>
      
      您的 Rental Time 小組</dvi>`,
    }).then(() => {
      resolve();
    }).catch((err) => {
      reject(err.response);
    });
  });
}

function sendForgotPasswordEmail(user) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: `'Rental Time' ${user.email}`,
      to: user.email,
      subject: '密碼重置請求',
      html: `<div>
      <p>${user.name} 您好：</p>
      
      <p>要重新設定您的密碼，請點一下以下的連結。您將會連到一個網頁，讓您設定新的密碼。</p>
      
      <p>如果您並未嘗試重新設定密碼，請不必擔心，可略過這封電郵。 在您點選連結設定密碼前，您的密碼不會改變。</p>

      <button style="background: teal;border: none;padding: 5px 15px;border-radius: 5px;">
        <a href="${user.url}" style=" text-decoration: none;color: white;font-size: 14px;">變更密碼</a>
      </button>
      
      <p>**提醒您：若此信件在垃圾信件匣，請將信件移至收件匣，更變密碼連結才可使用。**</p>
      
      <p>感謝您！</p>
      
      您的 Rental Time 小組</dvi>`,
    }).then(() => {
      resolve();
    }).catch((err) => {
      reject(err.response);
    });
  });
}

function sendChatEmail(data) {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: `'Rental Time' ${data.email}`,
      to: data.email,
      subject: '密碼重置請求',
      html: `<div>
      <p>${data.name} 您好：</p>
      
      <p>您的販物「${data.title}」已開始進行，點選以下按鈕進入聊天室。</p>
      
      <button style="background: teal;border: none;padding: 5px 15px;border-radius: 5px;">
        <a href="${data.url}" style=" text-decoration: none;color: white;font-size: 14px;">
          變更密碼
        </a>
      </button>
      
      <p>感謝您！</p>
      
      您的 Rental Time 小組</dvi>`,
    }).then(() => {
      resolve();
    }).catch((err) => {
      reject(err.response);
    });
  });
}

module.exports = {
  sendSignUpEmail,
  sendForgotPasswordEmail,
  sendChatEmail,
};
