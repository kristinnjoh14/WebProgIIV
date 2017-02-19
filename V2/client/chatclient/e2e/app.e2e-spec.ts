import { ChatclientPage } from './app.po';

describe('chatclient App', function() {
  let page: ChatclientPage;

  beforeEach(() => {
    page = new ChatclientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
