parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"4qQK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.figurePoints=void 0,exports.figurePoints=[[{x:-1,y:0},{x:0,y:0},{x:-1,y:-1},{x:0,y:-1}],[{x:0,y:2},{x:0,y:1},{x:0,y:0},{x:0,y:-1}],[{x:-1,y:0},{x:0,y:0},{x:0,y:-1},{x:1,y:-1}],[{x:1,y:0},{x:0,y:0},{x:0,y:-1},{x:-1,y:-1}],[{x:-1,y:-1},{x:0,y:-1},{x:0,y:0},{x:1,y:-1}],[{x:-1,y:1},{x:-1,y:0},{x:-1,y:-1},{x:0,y:-1}],[{x:-1,y:-1},{x:0,y:-1},{x:0,y:0},{x:0,y:1}]];
},{}],"Tl5U":[function(require,module,exports) {
"use strict";function t(t,e,n){var o=t.x-e.x,r=t.y-e.y;return{x:Math.round(Math.cos(n)*o-Math.sin(n)*r+e.x),y:Math.round(Math.sin(n)*o+Math.cos(n)*r+e.y)}}function e(t,e,n){for(var o=0,r=t;o<r.length;o++){var s=r[o];s.x+=e,s.y+=n}}function n(t,e){return t.some(function(t){return e.some(function(e){return t.x===e.x&&t.y===e.y})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.isIntersected=exports.changePoints=exports.rotatePoint=void 0,exports.rotatePoint=t,exports.changePoints=e,exports.isIntersected=n;
},{}],"i4X1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.rotateBricks=exports.isBricksInInvalidPosition=exports.removeHorizontalLines=void 0;var e=require("./point-math");function r(r,t,n){for(var o=0,i=[],s=0,u=r;o<=n;){var a=u.filter(function(e){return e.y==o});if(a.length===t){var c=(u=u.filter(function(e){return e.y!==o})).filter(function(e){return e.y>o});e.changePoints(c,0,-1),i.push.apply(i,a),s++}else o++}return{changedPoints:u,removedPoints:i,numberOfRemovedLines:s}}function t(r,t,n){return r.some(function(o){return o.x<0||o.x>=n||o.y<0||e.isIntersected(r,t)})}function n(r,t,n){return r.map(function(r){var o=e.rotatePoint(r,t,n),i=o.x,s=o.y;return r.x=i,r.y=s,r})}exports.removeHorizontalLines=r,exports.isBricksInInvalidPosition=t,exports.rotateBricks=n;
},{"./point-math":"Tl5U"}],"qLEy":[function(require,module,exports) {
"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(r){for(var e,t=1,n=arguments.length;t<n;t++)for(var o in e=arguments[t])Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.generateRandomFigure=void 0;var e=require("./figure-points"),t=require("./brick-math");function n(r){return r[Math.floor(Math.random()*r.length)]}function o(){return n(e.figurePoints).map(function(e){return r({},e)})}var a=["red","green","blue","yellow"];function i(){return n(a)}function u(r,e){var n=o(),a=i();t.rotateBricks(n,{x:0,y:0},90*Math.round(4*Math.random())%360*Math.PI/180);for(var u=0,c=n;u<c.length;u++){c[u].color=a}return{center:{x:Math.round(r/2),y:e},color:a,bricks:n}}exports.generateRandomFigure=u;
},{"./figure-points":"4qQK","./brick-math":"i4X1"}],"18ix":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getResults=exports.saveResult=void 0;var e="leaderboard",t=10;function r(r){var o=s();o.push(r);var u=o.sort(function(e,t){return t-e}).slice(0,t);localStorage.setItem(e,JSON.stringify(u))}function s(){return JSON.parse(localStorage.getItem(e)||"[]").sort(function(e,t){return t-e})}exports.saveResult=r,exports.getResults=s;
},{}],"zWgV":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var n,r=1,t=arguments.length;r<t;r++)for(var i in n=arguments[r])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearGame=exports.initGame=exports.copyBricks=void 0;var n,r,t,i,o,c,a,s=require("./figure-generator"),u=require("./point-math"),l=require("./brick-math"),d=require("../menu"),m=require("../leaderboard/leaderboard"),f=-90*Math.PI/180,v=10,h=20,k=200,y=6,g=0,p=document.querySelector("main"),b=document.querySelector("#game-screen");function x(){var e=b.content.cloneNode(!0);p.innerHTML="",p.appendChild(e),o=document.querySelector("[data-board]"),c=document.querySelector("[data-next-figure]"),a=document.querySelector("[data-score]")}function P(e){return e/v*100}function I(e){return e/h*100}function q(n){return n.map(function(n){return e({},n)})}function E(e){for(var n=0,r=e;n<r.length;n++){var t=r[n];t.htmlElement.style.left=P(t.x)+"%",t.htmlElement.style.bottom=I(t.y)+"%"}}function B(e){u.changePoints(e.bricks,e.center.x,e.center.y);for(var n=0,r=e.bricks;n<r.length;n++){var t=r[n],i=P(t.x),c=I(t.y);t.htmlElement=C(i,c,e.color),o.appendChild(t.htmlElement)}}function S(){c.innerHTML="";for(var e=0,n=r.bricks;e<n.length;e++){var t=n[e],i=C((t.x+y/2)/y*100,(t.y+y/2)/y*100,r.color);c.appendChild(i)}}function C(e,n,r){var t=document.createElement("div");return t.className="brick",t.style.left=e+"%",t.style.bottom=n+"%",t.style.backgroundColor=r,t}function L(e){switch(e){case 0:return 0;case 1:return 40;case 2:return 100;case 3:return 300;case 4:return 1200}}function M(){a.innerText=g.toString()}function O(){if(n){var e=q(n.bricks);if(u.changePoints(e,0,-1),l.isBricksInInvalidPosition(e,i,v)){i.push.apply(i,n.bricks);for(var t=l.removeHorizontalLines(i,v,h),c=(t.changedPoints,t.removedPoints),a=t.numberOfRemovedLines,d=0,m=c;d<m.length;d++){var f=m[d],k=i.indexOf(f);i.splice(k,1),o.removeChild(f.htmlElement)}B(n=r),r=s.generateRandomFigure(v,h),S(),g+=L(a),M(),u.isIntersected(i,n.bricks)&&R()}else n.center.y-=1,u.changePoints(n.bricks,0,-1);E(i),E(n.bricks)}}function G(e){if(n){if("a"===e.key){var r=q(n.bricks);if(u.changePoints(r,-1,0),l.isBricksInInvalidPosition(r,i,v))return;n.center.x-=1,u.changePoints(n.bricks,-1,0)}if("d"===e.key){r=q(n.bricks);if(u.changePoints(r,1,0),l.isBricksInInvalidPosition(r,i,v))return;n.center.x+=1,u.changePoints(n.bricks,1,0)}if(" "===e.key){r=q(n.bricks);if(l.rotateBricks(r,n.center,f),l.isBricksInInvalidPosition(r,i,v))return;n.bricks=r}"s"===e.key&&O(),27===e.keyCode&&confirm("Exit to main menu?")&&(_(),d.initMenu())}}function R(){m.saveResult(g),_(),alert("Game over!\nScore: "+g),d.initMenu()}function w(){i=[],x(),g=0,M(),B(n=s.generateRandomFigure(v,h)),r=s.generateRandomFigure(v,h),S(),t=setInterval(O,k),document.addEventListener("keydown",G)}function _(){document.removeEventListener("keydown",G),clearInterval(t)}exports.copyBricks=q,exports.initGame=w,exports.clearGame=_;
},{"./figure-generator":"qLEy","./point-math":"Tl5U","./brick-math":"i4X1","../menu":"XyKh","../leaderboard/leaderboard":"18ix"}],"Hyco":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearLeaderboard=exports.initLeaderboard=void 0;var e,r,t=require("../menu"),n=require("./leaderboard"),o=document.querySelector("main"),d=document.querySelector("#leaderboard-screen");function a(){var t=d.content.cloneNode(!0);o.innerHTML="",o.appendChild(t),e=document.querySelector("[data-leaderboard-list]"),(r=document.querySelector("[data-back]")).addEventListener("click",u),i()}function i(){for(var r=0,t=n.getResults();r<t.length;r++){var o=t[r],d=document.createElement("div");d.innerText=o.toString(),e.appendChild(d)}}function c(){r.removeEventListener("click",u)}function u(){c(),t.initMenu()}exports.initLeaderboard=a,exports.clearLeaderboard=c;
},{"../menu":"XyKh","./leaderboard":"18ix"}],"XyKh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearMenu=exports.initMenu=void 0;var e,n,r=require("../game"),t=require("../leaderboard"),o=document.querySelector("main"),i=document.querySelector("#menu-screen");function c(){var r=i.content.cloneNode(!0);o.innerHTML="",o.appendChild(r),e=document.querySelector("[data-start-new-game]"),n=document.querySelector("[data-open-leaderboard]"),e.addEventListener("click",d),n.addEventListener("click",u)}function a(){e.removeEventListener("click",d),n.removeEventListener("click",u)}function d(){a(),r.initGame()}function u(){a(),t.initLeaderboard()}exports.initMenu=c,exports.clearMenu=a;
},{"../game":"zWgV","../leaderboard":"Hyco"}],"7QCb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./menu");e.initMenu();
},{"./menu":"XyKh"}]},{},["7QCb"], null)