var Knex  = require('knex');
var query_in_progress=false;
Knex.knex = Knex.initialize({
  client: 'pg',
  connection: {
    host      : '127.0.0.1',
     user     : 'postgres',// your connection config
   password : 'postgres',
  database : 'quote_temp',
  }
});

knex = require('knex').knex;
/* a=knex('quotes').select().then(function(a){console.log(a)}); */
module.exports= {
  db: knex,
  insert_quote: function insert_quote(project,quote,by_name)
  {
    knex('quotes').returning('id').insert({project: project , quote: quote , by_name: by_name}).then(function(a){a.commit});
  },
  get_projects: 
    function get_projects(){
     var project_names=[];
     knex('projects').select('name').then(function(a){ 
       project_names.push(a);
     })
  }
};

