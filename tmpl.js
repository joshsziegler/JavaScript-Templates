/*
 * JavaScript Templates
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Inspired by John Resig's JavaScript Micro-Templating:
 * http://ejohn.org/blog/javascript-micro-templating/
 */

;(function () {
  'use strict'
  var tmpl = function (template_name, data) {
    let template = tmpl.templates[template_name];
    if(template === undefined){
      console.error("No template found with the name " + template_name);
      return "";
    }
    let f = new Function(tmpl.arg + ',tmpl',
        'var _e=tmpl.encode' +
        tmpl.helper +
        ",_s='" +
        template.replace(tmpl.regexp, tmpl.func) +
        "';return _s;"
      )
    return f(data, tmpl)
  }
  tmpl.templates = {}
  tmpl.regexp = /(?:\{\{\{([\s\S]+?)\}\}\})|(?:\{\{([\s\S]+?)\}\})|(\{%)|(%\})/g
  tmpl.func = function (s, p1, p2, p3, p4) {
    if (p1) {
      // Raw / unescaped {{{ prop }}}
      return "'+(" + p1 + "==null?'':" + p1 + ")+'"
    }
    if (p2) {
      // interpolation / escaped {{ prop }}
        return "'+_e(" + p2 + ")+'"
    }
    if (p3) {
      // evaluation start tag: {%
      return "';"
    }
    if (p4) {
      // evaluation end tag: %}
      return "_s+='"
    }
  }
  tmpl.encReg = /[<>&"'\x00]/g 
  tmpl.encMap = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;'
  }
  tmpl.encode = function (s) {
    return (s == null ? '' : '' + s).replace(tmpl.encReg, function (c) {
      return tmpl.encMap[c] || ''
    })
  }
  tmpl.arg = 'o'
  tmpl.helper =
    ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
    ',include=function(s,d){_s+=tmpl(s,d);}'
  window.tmpl = tmpl;
})();