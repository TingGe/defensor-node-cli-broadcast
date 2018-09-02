/**
 * 用 nodemailer API 发送邮件
 * @author TingGe<505253293@163.com>
 */

const config = require("./mailConfig.json");
exports = module.exports = function(
  recipient = { mail: "", name: "" },
  subject = "",
  text = "",
  attachments = [],
  callback = function() {}
) {
  const nodeMailer = require("nodemailer");
  const smtpTransport = require("nodemailer-smtp-transport");
  /** 1. 创建 */
  let transporter = nodeMailer.createTransport(smtpTransport(config));

  /** 2. 邮件信息 */
  let defaultOptions = {
    from: config.auth.user,
    to: recipient.mail,
    subject,
    text: `Hello ${recipient.name}:
    ${text}`,
    // html: "<p> 这是一封用 nodejs 的 nodemailer 发送的测试邮件。</p>",
    attachments
  };

  /** 3. 发送邮件 */
  transporter.send = defaultOptions => {
    transporter.sendMail(defaultOptions, callback);
    return;
  };
  transporter.send(defaultOptions);
};
