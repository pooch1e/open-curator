const { extractData } = require('../app/lib/utils/extractData');

describe('init unit test', () => {
  it('runs test file', () => {
    console.log('hello from test');
  });
});

describe('extract data should return object from api with correct keys and values', () => {
  it('should return empty array when passed empty array of objects', () => {
    const test : any[] = [];
    const actual = extractData(test);
    expect(actual).toEqual([]);
  });
  it('should return an array of objects that contain a key of id and value of a number', () => {
    const test = [{ id: 12345 }, { id: 47281 }];
    const actual = extractData(test);
    expect(actual).toEqual([{ id: 12345 }, { id: 47281 }]);
  });
});
