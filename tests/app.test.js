const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app)
            .get('/')
            .then(resp => {
                expect(resp.statusCode).toBe(200)
                expect(resp.json).toBe('Hello World!')
                done()
            })
            .catch(e => {
                done()
            });
    });
});

// function sum (a, b) {
//     return a + b;
// }

// describe('Tests of a calculator functionality', () => {
//     test('sum two numbers', () => {
//         const result = sum(1, 5)

//         expect(6).toEqual(result)
//     });


// });

// describe('Tests of a calculator functionality', () => {
//     it('Should sum two numbers', () => {

//     });

//     it('Should div two numbers', () => {

//     });
// });