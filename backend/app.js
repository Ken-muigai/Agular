const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('./database/mongoose');

const List = require('./database/models/list')
const Tasks = require('./database/models/task')



app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
    next()
}
)


/* 
URL
routes for the lists
should go to http://localhost:3000/lists
*/

app.get('/lists', (req,res) =>{
    List.find({}).then(lists =>{
        res.send(lists)
    }).catch((err)=>{console.log(err)})
})

app.post('/lists', (req,res) => {
    ( new List({"title":req.body.title})).save().then((lists) =>{
        res.send(lists)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/lists/:listId', (req,res) => {
    List.find({_id:req.params.listId}).then((lists) =>{
        res.send(lists)
    }).catch((err) =>{
        console.log(err)
    })
})

app.patch("/lists/:listId", (req, res) =>{
    List.findByIdAndUpdate({_id:req.params.listId}, {$set:req.body}).then((lists) =>{
        res.send(lists)
    }).catch((err) =>{
        console.log(err)
    })
})  


app.delete("/lists/:listId",(req,res) =>{

    const deletedtasks = (list) =>{
        Tasks.deleteMany({_listId:list._id}).then(() =>{
            list
        }).catch(err =>{
            console.log(err)
        })
    }
    const list = List.findByIdAndDelete(req.params.listId).then((lists) =>{
        res.send(deletedtasks(lists))
        }).catch((err) =>{
            console.log(err)
        })
    res.status(200).send(list)
})

/*
URL
routes for the tasks
should have http://localhost:3000/lists/listId/tasks
each list has an associative task to it
*/


app.post('/lists/:listId/tasks', (req,res) => {
    ( new Tasks({"title":req.body.title, "_listId":req.params.listId})).save().then((tasks) =>{
        res.send(tasks)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/lists/:listId/tasks', (req,res) =>{
    Tasks.find({_listId:req.params.listId}).then(tasks =>{
        res.send(tasks)
    }).catch((err)=>{console.log(err)})
})


app.get('/lists/:listId/tasks/:taskId', (req,res) => {
    Tasks.findOne({ _listId:req.params.listId, _id: req.params.taskId}).then((tasks)=>{
        res.send(tasks)
    }).catch(err =>{
        console.log(err)
    })
})

app.patch("/lists/:listId/tasks/:taskId", (req,res) =>{
    Tasks.findOneAndUpdate({_listId: req.params.listId, _id: req.params.taskId}, {$set: req.body}).then((tasks) =>{
        res.status(200).send(tasks)
    }).catch(err =>{
        console.log(err)
    })
})


app.delete("/lists/:listId/tasks/:taskId", (req,res) =>{
    Tasks.findOneAndDelete({_listId:req.params.listId, _id:req.params.taskId})
    .then((tasks) =>{
        res.send(tasks)
    })
    .catch(err =>{
        console.log(err)
    })
})




app.listen(3000, ()=>{console.log('the express app is runninng smoothly on port 3000')})