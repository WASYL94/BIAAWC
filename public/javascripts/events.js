const DB = require('../../src/storage/db')
const db = new DB()
const config = require('config')


const inputRss = document.getElementById("url")
const btnAdd = document.getElementById("button-add")
const lsOutput = document.getElementById("lsOutput")
const saveBtn = document.getElementById("savebtn")
// const previewBtn = document.getElementById("previewbtn")
// const sendBtn = document.getElementById("sendbtn")
const email = document.getElementById('e-mail')
const rssKey = "rss"

btnAdd.onclick = function() {
    const value = inputRss.value
    if(!value){
        alert('Wprowadź url nim klikniesz "Dodaj"!')
        return
    } else {
        localStorage.setItem(rssKey, value)
        const key= localStorage.key(rssKey)
        const rssKey = localStorage.getItem(key)  
        lsOutput.innerHTML+=`<div class = "lsOutput">${value} </div>`
}

saveBtn.onclick = async function() {
const emailValue = email.value;
email.readOnly = true
urlsy = [];
const urlsToSend = document.querySelectorAll('.lsOutput');
urlsToSend.forEach((item) => {
    urlsy.push(item.innerHTML)
})
const rssesKey = localStorage.key(rssKey);
const urlAwait = await localStorage.setItem(rssKey, urlsy)
const rsses = localStorage.getItem(rssesKey);



const content = {
    'email' : emailValue,
    'feed' : rsses
}

JSON.stringify(content)
console.log(content)

/*
await db.insert(config.name, content)
return content
*/

}
}