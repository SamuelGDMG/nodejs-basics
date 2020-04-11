const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
    return response.status(200).json(repositories)

});

app.post("/repositories", (request, response) => {

    const {title, url, techs} = request.body;

    const id = uuid();

    const post = {
        title,
        url,
        techs,
        id : id,
        likes : 0
    }

    repositories.push(post);

    return response.status(200).json(post)

});

app.put("/repositories/:id", (request, response) => {
  
    const {title, url, techs} = request.body;
    const {id} = request.params;

    const editPostIndex = repositories.findIndex(repo => repo.id === id);

    if(editPostIndex < 0){
        return response.status(400).json({"Erro" : "Id não encontrado"});
    }


    const meuPost = repositories[editPostIndex]

    const newPostEdit = {
        title,
        url,
        techs,
        id,
        likes : meuPost.likes
    }

    repositories[editPostIndex] = newPostEdit;

    return response.status(200).json(newPostEdit)

});

app.delete("/repositories/:id", (request, response) => {
  
    const {id} = request.params;

    const editPostIndex = repositories.findIndex(repo => repo.id === id);

    if(editPostIndex < 0){
        return response.status(400).json({"Erro" : "Id não encontrado"});
    }

    repositories.splice(editPostIndex, 1);

    return response.status(204).json({"Msg" : "Sucesso"});

});

app.post("/repositories/:id/like", (request, response) => {

    const {id} = request.params;

    const editPostIndex = repositories.findIndex(repo => repo.id === id);

    if(editPostIndex < 0){
        return response.status(400).json({"Erro" : "Id não encontrado"});
    }

    const newObjLike = {
        ...repositories[editPostIndex],
        likes : repositories[editPostIndex].likes + 1
    }

    repositories[editPostIndex] = newObjLike;

    return response.status(200).json(newObjLike);

});

module.exports = app;
