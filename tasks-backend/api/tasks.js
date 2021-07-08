const moment = require('moment')

module.exports = app => {
    const getTask = (req, res, next) => {
        const date = req.query.date ? req.query.date
            : moment().format('YYYY-MM-DD 23:59:59')

        app.db('tasks')
            .where({userId: req.user.id})
            .where('dateEstimate', '<=', date)
            .orderBy('dateEstimate')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json(err))

    }

    const save = (req, res) => {
        if(!req.body.desc.trim()){
            return res.status(400).send('A descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(200).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({id: req.params.id, userId: req.user.id})
            .del()
            .then(rowsDeleted =>{
                if(rowsDeleted > 0)
                    res.status(204).send()
                else
                    res.status(400).send(`Não foi encontrado a task com o id ${req.params.id}.`)
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTasksDateDone = (req, res, dateDone) => {
        app.db('tasks')
            .where({id: req.params.id, userId: req.user.id})
            .update({dateDone})
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTasks = (req, res) => {
        app.db('tasks')
            .where({id: req.params.id, userId: req.user.id})
            .first()
            .then(task => {
                if(!task)
                    res.status(400).send(`Task com o id ${req.params.id} não foi encontrada.`)
                else{
                    const dateDone = task.dateDone ? null : new Date()
                    updateTasksDateDone(req,res,dateDone)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    return {getTask, save, remove,toggleTasks}
}