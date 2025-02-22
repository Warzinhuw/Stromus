const ArtistaRepository = require("../services/ArtistaService");

module.exports = {
    /* Perceba que o objeto response, do sequelize, 
       é recebido aqui. Importante para responder a 
       requisição de forma assíncrona. 
    */
    listAll: function (req, res) {
        //Blocking operation (Não fazer)
        //return ItemPatrimonioRepository.all()
        // console.log(ItemPatrimonioRepository.all());
        res.statusCode = 200; // Status HTTP para OK;
        ArtistaRepository.getAllArtistas().then(
            artistas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(artistas));
            }            
        )
    },

    // handler para adcionar novo artista no banco
    add: function (req, res) {

        ArtistaRepository.addNewArtista(
            req.body
        ).then((status) => {
            res.statusCode = 201; // Status HTTP para created;
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(status));
        }).catch(error => {
            console.error(error);
            res.statusCode = 500; //Status HTTP para erro interno
            res.set("Content-Type", "application/text");
            res.send(error.message);
        });
    },

    // handler para recuperar um artista por patrimonio
    get: function (req, res) {
        const artistaId = req.params.artistaId;
        ArtistaRepository.getArtistaById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            artistaId).then((artista) => {
                if(artista){
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(artista));                    
                } else{
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({status: `Não foi possível encontrar o artista para ${artistaId}.`});
                }                
            });
    },

    // handler para remover um item pelo seu código de patrimonio
    remove: function (req, res) {
        ArtistaRepository.removeArtistaById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.artistaId).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
        );
    }
}