// var casper = require('casper').create();
var token;

casper.start('http://localhost:3000', function () {
  this.echo('google sign in page');
  this.echo(this.getCurrentUrl()); 
  this.echo('\n');
  this.fill('form[action="https://accounts.google.com/ServiceLoginAuth"]', {
    Email: 'walkertestemail@gmail.com',
    Passwd: 'testPass32'
  }, true);
});

casper.then(function () {
  this.echo('google permission page');
  this.echo(this.getCurrentUrl());
  this.echo('\n');
  this.waitWhileSelector('button[onclick="return lso.approveButtonAction();"]:disabled', function () {
    this.click('button[onclick="return lso.approveButtonAction();"]');
  });
});


casper.then(function () {
  this.echo('auth callback page');
  this.echo(this.getCurrentUrl());
  this.echo('\n');
  token = this.fetchText('body').split(': ')[1];
  this.echo('accessToken: ' + token);
  this.echo('\n');
  this.open('http://localhost:3000/calendars?accessToken='+token, {
    method: 'get'
  });
});

casper.then(function () {
  this.echo('the calendars list');
  this.echo(this.getCurrentUrl());
  this.echo('\n');
  var calendarList = this.fetchText('body');
  this.echo(calendarList);
  calendarList = JSON.parse(calendarList);
  this.echo('\n');
  this.open('http://localhost:3000/calendars/'+ calendarList[0].id +'/events?accessToken='+token, {
    method: 'get'
  });
});

casper.then(function () {
  this.echo('the events list');
  this.echo(this.getCurrentUrl());
  this.echo('\n');
  var eventList = this.fetchText('body');
  this.echo(eventList);
  this.echo('\n');
  this.echo('Retrieved events and calendars successfully');
});

casper.run();

