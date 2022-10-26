const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
const {sumArray, pluck} = require('../utils.js')
const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );

    it('responds with the sum of 5 and 6', () =>
      agent.post('/sum')
        .send({a: 5, b: 6})
        .then((res) => {
          expect(res.body.result).toEqual(11);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('funcion sumArray', () =>{
    const arr = [1,2,3,4]
    it('Si la suma de dos num del array es igual a num devolver true', ()=>{
      expect(sumArray(arr, 5)).toBe(true)
    })
    it('Si no encuentra la suma devuelve false', ()=>{
      expect(sumArray(arr, 30)).toBeFalsy()
    })
    it('Si no es un array muestra error', ()=>{
      expect(()=>sumArray(1, 30)).toThrow(TypeError)
    })
    it('Que no sume el mismo numero', ()=>{
      expect(sumArray(arr, 2)).toBe(false)
    })
  })

  describe('POST /sumArray', () => {
    it('responds with 400', () => agent.post('/sumArray').expect(400));
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    it('Es true si los numero del array se suman', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
  });

  describe('POST /numString', () => {
    
    it('Responder con 200', () => agent.post('/numString').send({word: 'hola'}).expect(200))

    it('Si enviamos hola devuelve un 4', () =>
      agent.post('/numString')
        .send({word: 'hola'})
        .then((res) => {
          expect(res.body.result).toBe(4);
      }));

      it('Si enviamos hola devuelve un 6', () =>
      agent.post('/numString')
        .send({word: 'martin'})
        .then((res) => {
          expect(res.body.result).toBe(6);
      }));

      it('Responde con 400 si el string es un numero', () =>
      agent.post('/numString').send({word: 1}).expect(400));

      it('Responde con 400 si el string es vacio', () =>
      agent.post('/numString').send({word: ''}).expect(400));
  });

  describe('function pluck', () => {
    const arr = [{nombre: 'leo', apellido: 'lopez'},{nombre: 'fer', apellido: 'gomez'}]
    it('Retorna un array con los nombres', ()=>{
      expect(pluck(arr,'nombre')).toEqual(['leo','fer'])
    })
  })

  describe('POST pluck', () => {
    const arr = [{nombre: 'leo', apellido: 'lopez'},{nombre: 'fer', apellido: 'gomez'}]
    it('Devuelve los nombre del array enviado', ()=>{
      agent.post('/pluck')
      .send({array: arr, prop: 'nombre'})
      .then((res)=>{
        expect(res.body.result).toEqual(['leo','fer'])
      })
    })
  })


});

