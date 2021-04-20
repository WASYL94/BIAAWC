const express = require('express')
const path = require('path')
const config = require('config')
const app = express()

const Database = require('./storage/db')
const FeedParser = require('./utils/feedparser')
const MailSender = require('./utils/mailsender')
const MailBuilder = require('./utils/mailbuilder')
const MailController = require('./controllers/mailController')
const RssController = require('./controllers/rssController')

const db = new Database()
db.connect(config.db)

const feedParser = new FeedParser()
const mailSender = new MailSender()
const mailBuilder = new MailBuilder()

const mailCtrl = new MailController(db, feedParser, mailBuilder, mailSender)
const rssCtrl = new RssController(db)

app.use(express.static(path.join(__dirname, '../public')));

app.get('/',function(req,res){
    res.status(200).sendFile('/index.html')
})

app.post('/api/v1/rss', async (req,res) =>{
    try{
        await rssCtrl.store(req.body)
        res.sendStatus(200)
    }catch (e){
        console.error(e.message)
        res.sendStatus(500)
    }
})

app.get('/api/v1/rss', async (req,res) =>{
    try{
        let content = await rssCtrl.retrive(req.query.mail)
        res.send(content)
    }catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
})

app.get('/api/v1/mail', async (req,res) => {
    try{
        let content = await mailCtrl.previewMail(req.query.email) 
        res.send(content)
    }catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

app.post('/api/v1/mail', async (req,res) => {
    try{
        await mailCtrl.sendMail(req.query.email)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

module.exports = app