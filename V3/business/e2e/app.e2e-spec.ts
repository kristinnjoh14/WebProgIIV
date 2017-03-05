import { BusinessPage } from './app.po';

describe('business App', function() {
  let page: BusinessPage;

  beforeEach(() => {
    page = new BusinessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
