(()=>{"use strict";var e,r,t,a,o,f={},c={};function n(e){var r=c[e];if(void 0!==r)return r.exports;var t=c[e]={exports:{}};return f[e].call(t.exports,t,t.exports,n),t.exports}n.m=f,e=[],n.O=(r,t,a,o)=>{if(!t){var f=1/0;for(b=0;b<e.length;b++){t=e[b][0],a=e[b][1],o=e[b][2];for(var c=!0,d=0;d<t.length;d++)(!1&o||f>=o)&&Object.keys(n.O).every((e=>n.O[e](t[d])))?t.splice(d--,1):(c=!1,o<f&&(f=o));if(c){e.splice(b--,1);var i=a();void 0!==i&&(r=i)}}return r}o=o||0;for(var b=e.length;b>0&&e[b-1][2]>o;b--)e[b]=e[b-1];e[b]=[t,a,o]},n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,n.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);n.r(o);var f={};r=r||[null,t({}),t([]),t(t)];for(var c=2&a&&e;"object"==typeof c&&!~r.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((r=>f[r]=()=>e[r]));return f.default=()=>e,n.d(o,f),o},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((r,t)=>(n.f[t](e,r),r)),[])),n.u=e=>"assets/js/"+({5:"15a9f43e",38:"3aaaf183",52:"a696f7ee",53:"935f2afb",85:"1f391b9e",139:"113b292f",150:"bcc941c1",165:"ba8da68c",195:"c4f5d8e4",206:"f8409a7e",277:"64dbc07d",278:"09141484",368:"a94703ab",414:"393be207",417:"405f4d7e",427:"7c9da8e9",518:"a7bd4aaa",539:"1781dfa9",623:"86512ec7",661:"5e95c892",817:"14eb3368",918:"17896441",937:"6a0ffbcd",984:"e5c6c814"}[e]||e)+"."+{5:"8cc8e59d",38:"41c5e587",52:"3506f04e",53:"d6e575ca",85:"3c891b64",137:"94b3bbe6",139:"285404e9",150:"4e8e89c8",165:"6adf1af1",195:"83531989",206:"27a05fac",277:"797afe54",278:"7e5984f3",368:"71bd3966",414:"5c7fe04c",417:"1c9d036c",427:"8fcdc01c",518:"a344bd21",539:"a2605ee2",623:"40d35b4c",661:"4712338e",669:"480e2867",817:"77ee484f",868:"66234d00",918:"f635ab2a",937:"a5f66db6",984:"321c0527"}[e]+".js",n.miniCssF=e=>{},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),a={},o="aws-bedrock-mongodb-atlas-workshop:",n.l=(e,r,t,f)=>{if(a[e])a[e].push(r);else{var c,d;if(void 0!==t)for(var i=document.getElementsByTagName("script"),b=0;b<i.length;b++){var s=i[b];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==o+t){c=s;break}}c||(d=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.setAttribute("data-webpack",o+t),c.src=e),a[e]=[r];var l=(r,t)=>{c.onerror=c.onload=null,clearTimeout(u);var o=a[e];if(delete a[e],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((e=>e(t))),r)return r(t)},u=setTimeout(l.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=l.bind(null,c.onerror),c.onload=l.bind(null,c.onload),d&&document.head.appendChild(c)}},n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/atlas-bedrock-crime-story-demo/",n.gca=function(e){return e={17896441:"918","15a9f43e":"5","3aaaf183":"38",a696f7ee:"52","935f2afb":"53","1f391b9e":"85","113b292f":"139",bcc941c1:"150",ba8da68c:"165",c4f5d8e4:"195",f8409a7e:"206","64dbc07d":"277","09141484":"278",a94703ab:"368","393be207":"414","405f4d7e":"417","7c9da8e9":"427",a7bd4aaa:"518","1781dfa9":"539","86512ec7":"623","5e95c892":"661","14eb3368":"817","6a0ffbcd":"937",e5c6c814:"984"}[e]||e,n.p+n.u(e)},(()=>{var e={303:0,532:0};n.f.j=(r,t)=>{var a=n.o(e,r)?e[r]:void 0;if(0!==a)if(a)t.push(a[2]);else if(/^(303|532)$/.test(r))e[r]=0;else{var o=new Promise(((t,o)=>a=e[r]=[t,o]));t.push(a[2]=o);var f=n.p+n.u(r),c=new Error;n.l(f,(t=>{if(n.o(e,r)&&(0!==(a=e[r])&&(e[r]=void 0),a)){var o=t&&("load"===t.type?"missing":t.type),f=t&&t.target&&t.target.src;c.message="Loading chunk "+r+" failed.\n("+o+": "+f+")",c.name="ChunkLoadError",c.type=o,c.request=f,a[1](c)}}),"chunk-"+r,r)}},n.O.j=r=>0===e[r];var r=(r,t)=>{var a,o,f=t[0],c=t[1],d=t[2],i=0;if(f.some((r=>0!==e[r]))){for(a in c)n.o(c,a)&&(n.m[a]=c[a]);if(d)var b=d(n)}for(r&&r(t);i<f.length;i++)o=f[i],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(b)},t=self.webpackChunkaws_bedrock_mongodb_atlas_workshop=self.webpackChunkaws_bedrock_mongodb_atlas_workshop||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();