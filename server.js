
const express = require('express')
const {
  db,
  Tasks
} = require('./db.js')

const app = express()

app.use('/app',express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/todos', async (req, res) => {
  let newItem = await Tasks.create({
    name: req.body.name,
    description: req.body.description
    // done: req.body.done
  })

  res.send(newItem)
})

app.get('/todos',async (req, res) => {
//   let whereClause = {}

//   if (req.query.done) {
//     whereClause.done = req.query.done === 'true'
//   }

//   let tasks = await Tasks.findAll({
//     where: whereClause
//   })

    let tasks = await Tasks.findAll({
        attributes: ['id','name','description']
    })
  res.send(tasks)
})


app.delete('/todos/:id',async (req,res)=>{
  let items = await Tasks.destroy({
    where: {
      id: req.params.id
    }
  })
  res.send({message: 'Todo has been removed successfully!'})

  // res.redirect('/todos')

  // res.send(items)

  // const todo = await Tasks.findById(req.params.id);
  //   try {
  //       await todo.destroy();
  //       res.send({message: 'Todo has been removed successfully!'})
  //   } catch (err) {
  //       res.send(400, err)
  //   }  
})


db.sync()
  .then(() => {
    app.listen(8765, () => {
      console.log('Server started')
    })
  })