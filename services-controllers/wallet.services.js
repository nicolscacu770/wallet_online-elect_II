const fs = require('fs');
const data = fs.readFileSync('data.json');
let datos = JSON.parse(data);

module.exports = {
    findAll : async(req,res) => {
        try {
            return res.status(200).json({"state": true, "data": datos});
        } catch (error) {
            return res.status(500).json({"state": false, "error": error});
        }
    },

    findById : (req,res) => {
        const {id} = req.params;
        try {
            const [movement] = datos.movimientos.filter( element => element.id == id );

            if(movement){
                return res.status(200).json({"state": true, "data": movement});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        } catch (error) {
            return res.status(500).json({"state": false, "error": error});
        }
        
    },

    save : async(req,res) => {
        console.log(req.body);
        let dateAct = new Date();
        const dia = dateAct.getDate();
        const mes = dateAct.getMonth() + 1;
        const año = dateAct.getFullYear();
        const hora = dateAct.getHours();
        const minutos = dateAct.getMinutes();
        const segundos = dateAct.getSeconds();

        const fechaHoy = `${dia}/${mes}/${año}`
        const horaActual = `${hora}:${minutos}:${segundos}`;
            
        const {id, name, description, type, value} = req.body
        const data = {"id": id, "nombre": name, "descripcion": description, "tipo": type, "valor": value, "fecha": fechaHoy, "hora": horaActual}

        try {
            datos.movimientos.push(data);
            let datosJSON = JSON.stringify(datos);
            fs.writeFileSync('data.json', datosJSON);
            
            return res.status(200).json({"state": true, "data":data});
        } catch (error) {
            return res.status(500).json({"state": false, "error": "no available :v"});
        }
    },

    update : async(req,res) => {
        const {id} = req.params;
        let dateAct = new Date();
        let founded;

        const fechaHoy = `${dateAct.getDate()}/${dateAct.getMonth()}/${dateAct.getFullYear()}`
        const horaActual = `${dateAct.getHours()}:${dateAct.getMinutes()}:${dateAct.getSeconds()}`;
           
        const { name, type, value} = req.body
        const data = {"id": id, "nombre": name, "tipo": type, "valor": value, "fecha": fechaHoy, "hora": horaActual}

        try {
            for (let pos = 0; pos < datos.movimientos.length; pos++) {
                if(datos.movimientos[pos].id == id){
                    datos.movimientos[pos] = data; 
                    founded = true;
                }
            }

            if(founded){
                let datosJSON = JSON.stringify(datos);
                fs.writeFileSync('data.json', datosJSON);
                return res.status(200).json({"state": true, "msg": "elemento actualizado correctamente", "data": data});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        } catch (error) {
            return res.status(500).json({"state": false, "error": "no available :v"});
        }
    },

    deletear : async(req,res) => {
        const {id} = req.params;
        let founded;
        try{
            for (let pos = 0; pos < datos.movimientos.length; pos++) {
                if(datos.movimientos[pos].id == id){
                    datos.movimientos.splice(pos, 1);
                    founded = true;
                }
            }

            if(founded){
                let datosJSON = JSON.stringify(datos);
                fs.writeFileSync('data.json', datosJSON);
                return res.status(200).json({"state": 200, "msg": "elemento eliminado correctamente"});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        }catch(error){
            return res.status(500).json({"state": false, "error": "no available :v"});
        }
    }
}