const ObjectId  = require('mongodb').ObjectId;
const getDb = require('../mongodb');
let db = null;
class Presentaciones {
    collection = null;
  constructor() {
    getDb()
    .then( (database) => {
      db = database;
      this.collection = db.collection('Presentaciones');
      if (process.env.MIGRATE === 'true') {
          // Por si se ocupa algo
      }
    })
    .catch((err) => { console.error(err)});
  }

  async new ( PresentacionNombre, PresentacionDescripcion) {
    const newPresentacion = {
        PresentacionNombre,
        PresentacionDescripcion
    };
    const rslt = await this.collection.insertOne(newPresentacion);
    return rslt;
  }

  async getAll(){
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
      
  }

  async getById(id){
    const _id = new ObjectId(id);
    const filter = {_id};
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
    
    }

    async updateOne(id, PresentacionNombre, PresentacionDescripcion){
      const filter = {_id: new ObjectId(id)};
      const updateCmd = {
        '$set':{
          PresentacionNombre,
          PresentacionDescripcion
        }
      };
      return await this.collection.updateOne(filter, updateCmd);
  
    }

    async deleteOne(id){
  
    }
}

module.exports = Presentaciones;