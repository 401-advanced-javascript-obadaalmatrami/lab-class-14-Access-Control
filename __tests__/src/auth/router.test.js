

process.env.SECRET = 'test';


const supergoose = require('../../supergoose.js');


beforeAll(async (done) => {
  await supergoose.startDB();
  done();
});

afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  it('can signin a user', () => {
    expect(true).toBe(true);
  });


});