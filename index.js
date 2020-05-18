const chalk = require('chalk');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://bauti:asd123@clusterbautitp-bp5ff.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });



client.connect(err => {
  if (err == null || err == undefined) {
    console.log(chalk.green('connected and performing task'));

    const database = client.db('desafio2db');
    const collectionInventors = database.collection('inventors');

    runCrud(collectionInventors);

    } else {
    console.log(chalk.red('error in connection, code:' + err.code))
  } 
});

async function runCrud(collectionInventors){

      const inventor = {first: 'Leonardo', last: 'Da Vinci', year:1452};

      await insertInventor(collectionInventors, inventor).then(()=> {
        console.log(chalk.green('Finished inserting inventor'));
    })
     .catch((error)=>{
        console.log(chalk.red('Failed when inserting inventor' + error));
      });
      
      await showInventors(collectionInventors) .then(()=> {
        console.log(chalk.green('Finished showing inventors'));
      })

      .catch((error)=>{
        console.log(chalk.red('Failed when showing investors' + error));
      });


      await updateInventor(collectionInventors, inventor, {$set:{death: 1519}}).then(()=> {
        console.log(chalk.green('Finished updating inventor'));
    })
      
      .catch((error)=>{
        console.log(chalk.red('Failed when updating inventor' + error));
      });
    
    
      await deleteInventor(collectionInventors, {first: 'Leonardo', year: 1452}).then(()=> {
         console.log(chalk.green('Finished deleting inventor'));
    })
    
    .catch((error)=>{
        console.log(chalk.red('Failed when deleting inventor' + error));
      });

      client.close();
      console.log(chalk.blue('Closing connection, bye'));
}
   

function showInventors(collection) {

    return new Promise((resolve) => {
        resolve(collection.find().toArray((err, result) => {
            console.log(result);
        }));
    });
    
}

function insertInventor(collection, newInventor) {
    return new Promise((resolve) => {
        resolve(collection.insertOne(newInventor));
    });
    
}

function updateInventor(collection,inventor, update) {
    return new Promise((resolve) => {
        resolve(collection.updateOne(inventor, update));
    });
}



 function deleteInventor(collection, inventor) {

    return new Promise((resolve) => {
        resolve(collection.deleteOne(inventor));
    });
    
}


function populateInventors(){
    const database = client.db('desafio2db');
    const collectionInventors = database.collection('inventors');
    collectionInventors.insertMany([
        { first: 'Albert', last: 'Einstein', year: 1879 },
        { first: 'Isaac', last: 'Newton', year: 1643 },
        { first: 'Galileo', last: 'Galilei', year: 1564 },
        { first: 'Marie', last: 'Curie', year: 1867 },
        { first: 'Johannes', last: 'Kepler', year: 1571 },
        { first: 'Nicolaus', last: 'Copernicus', year: 1473 },
        { first: 'Max', last: 'Planck', year: 1858 }
    ]);
}

