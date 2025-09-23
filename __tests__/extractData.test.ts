import { extractData } from '@/app/lib/utils/extractData';

describe('init unit test', () => {
  it('runs test file', () => {
    console.log('hello from test');
  });
});

describe('extract data should return object from api with correct keys and values', () => {
  it('should return empty object when passed empty array of objects', () => {
    const test = [{}];
    const actual = extractData(test);
    expect(actual).toEqual({});
  });
});
