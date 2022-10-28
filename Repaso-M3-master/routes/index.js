'use strict';

var express = require('express');
var router = express.Router();

router.use(express.json());

var tareas = [];
// escriban sus rutas aca
// sientanse libres de dividir entre archivos si lo necesitan

router.get('/users', (req, res)=>{
    res.json(tareas)
})

router.post('/users', (req, res)=>{
    //la persona puede venir por body o query
    //si viene por body
    if(req.body.person){
        if(typeof req.body.person !== 'string') return res.sendStatus(401)
        tareas.push(req.body.person)
        return res.status(201).json({encargado: req.body.person})
    } else {
        tareas.push(req.query.person)
        return res.status(201).json({encargado: req.query.person})        
    }
})

router.put('/users', (req, res)=>{
    //si viene por body
    const {person, lastName} = req.body
    var index = tareas.indexOf(person)
    if(index === -1) return res.sendStatus(404)
    if(lastName){
        tareas[index] += ' ' + lastName
        return res.status(201).json({fullName: tareas[index]})
    } else{ //si viene por query
        tareas[index] += ' ' + req.query.lastName
        return res.status(201).json({fullName: tareas[index]})
    }
})

router.delete('/users', (req, res)=>{
    const {person} = req.body
    let encontrado = false
    if(person){
        for (let i = 0; i < tareas.length; i++) {
            if(tareas[i].includes(person)){
                tareas.splice(i,1)
                encontrado = true
            }
        }
        encontrado ? res.sendStatus(200) : res.sendStatus(404)
    } else {
        for (let i = 0; i < tareas.length; i++) {
            if(tareas[i].includes(req.query.person)){
                tareas.splice(i,1)
                encontrado = true
            }
        }
        encontrado ? res.sendStatus(200) : res.sendStatus(404)
    }
})

router.post('/users/task', (req, res)=>{
    for (let i = 0; i < tareas.length; i++) {
        let obj = {
            encargado: tareas[i],
            completada: false,
            tarea: ``
        }
        tareas[i] = obj
    }
    res.json(tareas)
})

router.get('/users/task', (req, res)=>{
    res.json(tareas)
})

router.get('/users/:person/task', (req, res)=>{
    const { person } = req.params;
    var arr = [];
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].encargado === person) {
            arr.push(tareas[i].tarea);
        }
    }
    res.json(arr);
})

router.post("/users/:person/task", (req, res) => {
    // me mandan task por body
    // agregar una tarea a la persona del params, sin completar
    // responder con 201
    // si la persona no esta en mi arreglo -> 404
    // {encargado: 'toni', completada: false, tarea: ''}

    const { person } = req.params;
    const { task } = req.body;

    var encontrado = tareas.find(t => t.encargado === person);
    if (encontrado) {
        tareas.push({ encargado: person, completada: false, tarea: task });
        res.sendStatus(201);
    } else {
        res.sendStatus(404);
    }
});

router.put('/users/:person/task', (req, res) => {
    // si la persona no esta -> 401
    // person por params
    // index por query
    // task por body
    // modifico la tarea del objeto del indice recibido y devuelvo status 200

    const { person } = req.params;
    const { index } = req.query;
    const { task } = req.body;

    var encontrado = tareas.find((t) => t.encargado === person);
    if (encontrado) {
        tareas[index].tarea = task;
        return res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
})

router.get('/complete/tasks', (req, res) => {
    // buscar tareas completas y devolverlas en un array
    // si no hay ninguna -> 404 y string (copiar) "ninguna tarea completada"

    var arr = tareas.filter(t => t.completada === true);
    if (!arr.length) return res.status(404).json("ninguna tarea completada");
    res.json(arr);
})

router.post("/complete/tasks", (req, res) => {
    // verifica que el indice de la tarea recibida exista, si no existe responde con un 404
    // recibe el indice de una tarea y si esta se encuentra sin completar (false), la pasa a 
    // completada(true), responde con un 200 si el cambio fue eitoso

    const { id } = req.body;
    !tareas[id] ? res.sendStatus(404) : tareas[id].completada = true;
    if (tareas[id]) res.sendStatus(200);
});

router.delete('/delete/tasks', (req, res) => {
    let id = req.body.id ? req.body.id : req.query.id
    if (!tareas[id]) {
        return res.sendStatus(404);
    }
    tareas.splice(id, 1);
    res.sendStatus(200);
});


module.exports = {
    router, 
    tareas
};