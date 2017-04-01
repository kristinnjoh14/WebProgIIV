import { GasprPage } from './app.po';

describe('gaspr App', function() {
  let page: GasprPage;

  beforeEach(() => {
    page = new GasprPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
