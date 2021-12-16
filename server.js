const express = require('express')
const app = new express()
const db = require('better-sqlite3')('tictactoe.db')

app.use(express.static("public"))
app.use(express.json())




app.get('/games',(req,res) => {
    const query = db.prepare("SELECT * FROM WinLose")
    const WinLose = query.all()
    res.json({
        
    })
})

app.post("/update",(req,res) => {
    const {Player1Wins, Player2Wins, Player2Losses, Player1Losses} = req.body
    const query = db.prepare("UPDATE WinLose SET Player1Wins = ?, Player2Wins = ?, Player2Losses = ?, Player1Losses = ? WHERE id = 1")
    const result = query.run(Player1Wins, Player2Wins, Player2Losses,Player1Losses)
    console.log(`update ${result.changes} id(s)`)
    res.json({
        didUpdate: result.changes > 0 ? true : false,
    })
})

app.listen(3000,() => {
    console.log("server started")
})


