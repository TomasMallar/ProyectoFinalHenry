const emailAllUsersHandler = async (req, res) => {
    const { subject, text } = req.body;
    const users = await User.findAll();
    const emails = users.map((user) => user.mail);
    const mailOptions = {
        from: 'the.chocolate.hub@outlook.com',
        to: emails,
        subject: subject,
        text: text,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send('Emails sent successfully');
};
module.exports = { emailAllUsersHandler };
