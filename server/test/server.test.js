var expect = require('expect');
var request = require('supertest');

var {app} = require('./../server.js');
var {Todo} = require('./../models/todos.model.js');

// beforeEach((done) => {
// 	Todo.deleteMany().then(() => done()); // es6 return done();
// });
// describe('POST /todos', () => {
// 	it('should add new todos', (done) => {
// 		var text = "Todos from test";
// 		request(app)
// 			.post('/todos')
// 			.send({text})
// 			.expect(200)
// 			.expect((res) => {
// 				expect(res.body.text).toBe(text);
// 			})
// 			.end((err, res) => {
// 				if(err){
// 					return done(err);
// 				}
// 				Todo.find().then((todos) => {
// 					expect(todos.length).toBe(1);
// 					expect(todos[0].text).toBe(text);
// 					done();
// 				}).catch((e) => {
// 					done(e);
// 				}); 
// 			});
// 	});

// 	it('should not create todo with invalid body data', (done) => {
// 		request(app)
// 		.post('/todos')
// 		.send()
// 		.expect(400)
// 		.end((err, res) => {
// 			if(err){
// 				return done(err);
// 			}

// 			Todo.find().then((todos) => {
// 				expect(todos.length).toBe(0);
// 				done();
// 			}).catch((e) => done(e));
// 		});
// 	});
// });

describe('GET /todos', () => {
	it('should get more than 0', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			console.log(JSON.stringify(res.body, undefined, 2));
			expect(parseInt(res.body.todos.length)).toBeGreaterThan(0);
		})
		.end(done);
	});
});