const Task = require('../models').Task;

module.exports = {
  index:function(req,res){
    Task.findAll().then((tasks)=>{
      res.render('tasks/index',{tasks:req.user.tasks});
    })
  },
  show : function (req,res){
    Task.findByPk(req.params.id,{
      include:[
          'user',
          'categories'
      ]
    }).then((task)=>{
      res.render('tasks/show',{task});
    })
  },
  edit:function(req,res){
    Task.findByPk(req.params.id).then((task)=>{
      res.render('tasks/edit',{task:task});
    })
  },
  create: function(req,res){
    Task.create({
      description :req.body.description,
      userId: req.user.id
    }).then(result=>{
      res.json(result)
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
  },
  update: function (req,res){
    let task = Task.findByPk(req.params.id).then(task=>{
      task.description = req.body.description;
      task.save().then(()=>{
        let categoriesIds = req.body.categories.split(",");
        task.addCategories(categoriesIds).then(()=>{
          res.redirect('/tasks/'+req.params.id)
        })
      })
    })
  },
  new: function(req,res){
    res.render('tasks/new');
  },
  destroy: function(req,res){
    Task.destroy({
      where:{
        id: req.params.id
      }
    }).then(function(response){
      res.redirect('/tasks')
    })
  }

};
