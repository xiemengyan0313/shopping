var tplMy = require('../templates/my.string');
SPA.defineView('my', {
  html: tplMy,
  plugins: ['delegated'],
  bindActions: {
    'goto.login': function (e, data) {
      SPA.open('login');
    }
}
});
