const mongoose = require("mongoose");

const Product = mongoose.model('Product');

module.exports = {

    /*
    request = requisição que estamos fazendo ao servidor (dando F5, acessando uma URL, etc),
    contém todos os detalhes e informações possíveis da requisição, parametros, corpo, cabeçalho, usuário, autenticação, IP.

    response = resposta que vamos dar para a requisição, possui todas as informações para devolver uma resposta para o usuário.
    */     
   
    async index(request, response){       
       const {page = 1} = request.query;
       const products = await Product.paginate({},{page,limit:10});

       return response.json(products);
    },

    async store(request,response){
        const product = await Product.create(request.body);

        return response.json(product);
    },

    async show(request,response){
        const product = await Product.findById(request.params.id);

        return response.json(product);
    },

    async update(request,response){
        const product = await Product.findByIdAndUpdate(request.params.id,request.body,{new:true});

        return response.json(product);
    },

    async delete(request,response){
        await Product.findByIdAndRemove(request.params.id);
        return response.send();
    }
}