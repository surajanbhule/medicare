import { ProductTitlePipe } from './product-title.pipe';

describe('ProductTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new ProductTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
