QUnit.module('$');

QUnit.test('$() instanceof $', function() {
    ok($() instanceof $);
});
QUnit.test('$() instanceof Array', function() {
    ok($() instanceof Array);
});
QUnit.test('$() is empty', function() {
    ok($().length === 0);
});
QUnit.test('$(window)', function() {
    var w = $(window);
    ok(w instanceof $ && w.length === 1 && w[0] === window);
});
QUnit.test('$(document)', function() {
    var w = $(document);
    ok(w instanceof $ && w.length === 1 && w[0] === document);
});
/* look for a tag */
QUnit.test('$("html")', function() {
    var w = $("html");
    ok(w instanceof $ && w.length === 1 && w[0] === document.documentElement);
});
QUnit.test('$("body")', function() {
    var w = $("body");
    ok(w instanceof $ && w.length === 1 && w[0] === document.getElementsByTagName('body')[0]);
});
/* give a DOM element as a context */
QUnit.test('$("body", window)', function() {
    var w = $("body", window);
    ok(w instanceof $ && w.length === 0);
});
QUnit.test('$("body", document)', function() {
    var w = $("body", document);
    ok(w instanceof $ && w.length === 1 && w[0] === document.getElementsByTagName('body')[0]);
});
QUnit.test('$("body", document.documentElement)', function() {
    var w = $("body", document.documentElement);
    ok(w instanceof $ && w.length === 1 && w[0] === document.getElementsByTagName('body')[0]);
});
QUnit.test('$("body", document.body)', function() {
    var w = $("body", document.body);
    ok(w instanceof $ && w.length === 0);
});
/* give a tag name string as a context */
QUnit.test('$("body", "html")', function() {
    var w = $("body", "html");
    ok(w instanceof $ && w.length === 1 && w[0] === document.getElementsByTagName('body')[0]);
});
QUnit.test('$("body", "body")', function() {
    var w = $("body", "body");
    ok(w instanceof $ && w.length === 0);
});

/* create a fragment */
QUnit.test('$("<div/>")', function() {
    var m = $('<div/>');
    ok(m instanceof $ && m.length === 1 && m[0].outerHTML === '<div></div>');
});

QUnit.test('$($())', function() {
    var m = $($());
    ok(m instanceof $ && m.length === 0);
});
QUnit.test('$($(document))', function() {
    var m = $($(document));
    ok(m instanceof $ && m.length === 1 && m[0] === document);
});
QUnit.test('$([])', function() {
    var m = $([]);
    ok(m instanceof $ && m.length === 0);
});
QUnit.test('$([document])', function() {
    var m = $([document]);
    ok(m instanceof $ && m.length === 1 && m[0] === document);
});