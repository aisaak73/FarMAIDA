const express = require('express');
const router = express.Router();

const Presentaciones = new require('../../../../dao/presentaciones/presentaciones.model');
const presentacionModel = new Presentaciones();

//GET ALL
router.get('/all', async (req, res)=>{
    try{
        const rows = await presentacionModel.getAll();
        res.status(200).json({status:'ok', pacientes: rows});
    } catch (ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//GET ONE
router.get('/byid/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const row = await presentacionModel.getById(id);
        res.status(200).json({status:'ok', paciente: row});
    } catch (ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
});

//POST NEW
router.post('/new', async (req, res) => {
  const { PresentacionNombre, PresentacionDescripcion } = req.body;
  try{
  rslt = await presentacionModel.new(PresentacionNombre, PresentacionDescripcion);
  res.status(200).json(
    {
      status: 'ok',
      result: rslt
    });
  } catch(ex){
      console.log(ex);
      res.status(500).json({
        status: 'failed',
        result: {}
      });
  }
}); 

//PUT UPDATE
router.put('/update/:id', async (req, res)=>{
try{
  const { PresentacionNombre, PresentacionDescripcion } = req.body;
  const {id} = req.params;
  const result = await presentacionModel.updateOne(id, PresentacionNombre, PresentacionDescripcion);
  res.status(200).json({
    status:'ok', 
    result: result
});

}catch (ex){
  console.log(ex);
  res.status(500).json({status: 'failed'})
}
});

//DELETE 
router.delete('/delete/:id', async (req, res)=>{
  try{
    const {id} = req.params;
    const result = await presentacionModel.deleteOne(id);
    res.status(200).json({
      status:'ok', 
      result: result
  });
  
  }catch (ex){
    console.log(ex);
    res.status(500).json({status: 'failed'})
  }
  });



module.exports = router;