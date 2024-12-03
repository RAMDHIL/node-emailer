import express from "express";
import  nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;
const transporter = nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    auth: {
        user:"fadhilramdhon@gmail.com",
        pass:process.env.APPLICATION_PASSWORD
    },
    secure: true
})

app.use(express.json())

app.post('/text-mail',(req, res) => {
    const { to,subject,text} = req.body;

    const mailData = {
        from: "fadhilramdhon@gmail.com",
        to:to,
        subject:subject,
        text:text,
        html:"<b>hello test!</b>"
    }
    transporter.sendMail(mailData, (err,info) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json({
            message:"mail send",
            messageId:info.messageId
        })
    })
    
})


app.listen(port,() => {
    console.log('server runing in port 3000...')
})