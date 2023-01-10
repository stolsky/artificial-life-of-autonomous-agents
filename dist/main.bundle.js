(()=>{"use strict";const e=(e,t)=>{let i=null;if("string"==typeof e){if(i=document.createElement(e),i instanceof HTMLUnknownElement)return null;"string"==typeof t&&t.length>0&&t.split(" ").forEach((e=>i.classList.add(e)))}return i};let t=null,i=null;const s=()=>{t.classList.remove("Visible")},n=()=>(t=e("div","Tooltip"),i=e("p","Text"),t.appendChild(i),t),o=(e,t)=>{const i=new PIXI.Point(e.x,e.y),s=new PIXI.Point(t.x,t.y),{x:n,y:o}=i.add(s);return{x:n,y:o}},a=e=>Math.atan2(e.y,e.x),r=e=>new PIXI.Point(e.x,e.y).magnitude(),l=(e,t)=>{let i=new PIXI.Point(e.x,e.y);const s=i.magnitudeSquared();s>t*t&&(i=i.multiplyScalar(1/Math.sqrt(s)).multiplyScalar(t));const{x:n,y:o}=i;return{x:n,y:o}},c=(e,t)=>{if(0===e.x&&0===e.y)return{x:0,y:0};const i=new PIXI.Point(e.x,e.y),{x:s,y:n}=i.normalize().multiplyScalar(t);return{x:s,y:n}},p=(e,t)=>{const i=new PIXI.Point(e.x,e.y),{x:s,y:n}=i.subtract(new PIXI.Point(t.x,t.y));return{x:s,y:n}},h=e=>PIXI.utils.hex2rgb(e).map((e=>255*e)).join(","),u=e=>Math.round(e),d=e=>e<10?"0":"",m=(e,t,i)=>Math.max(Math.min(e,i),t),g=e=>{if(0===e)return 0;let t=u(.25*e+10);return t>30&&(t=30),t};let y=null;const x=()=>{if(!(y instanceof Function))throw new Error("Random number generator not initiated")};let f=[];const A=(e="")=>{let t=`${e}`;0===t.length&&(t=`${Math.random()}`);const i=(e=>{let t=1779033703^e.length;for(let i=0;i<e.length;i+=1)t=Math.imul(t^e.charCodeAt(i),3432918353),t=t<<13|t>>>19;return()=>(t=Math.imul(t^t>>>16,2246822507),t=Math.imul(t^t>>>13,3266489909),t^=t>>>16,t>>>0)})(t);var s,n,o,a;s=i(),n=i(),o=i(),a=i(),y=()=>{const e=n<<9;let t=5*s;return t=9*(t<<7|t>>>25),a^=n,n^=o^=s,s^=a,o^=e,a=a<<11|a>>>21,(t>>>0)/4294967296}};A();const T=(e=null,t=null)=>{x();const i=y();return Number.isFinite(e)&&Number.isFinite(t)?e+i*(t-e):i},w=class{static MIN=0;static MAX=1e5;#e;#t;#i;#s=()=>{this.#i<this.#e&&(this.#i=this.#e)};#n=()=>{this.#i>this.#t&&(this.#i=this.#t)};constructor({min:e,now:t,max:i}={}){this.#e=w.MIN,this.#i=w.MAX,this.#t=w.MAX,Object.seal(this),this.minimum=e,this.maximum=i,this.current=t}get current(){return this.#i}set current(e){Number.isFinite(e)&&(this.#i=u(e),this.#n(),this.#s())}get maximum(){return this.#t}set maximum(e){Number.isFinite(e)&&e>this.#e&&e<=w.MAX&&(this.#t=u(e),this.#n())}get minimum(){return this.#e}set minimum(e){Number.isFinite(e)&&e<this.#t&&e>=w.MIN&&(this.#e=u(e),this.#s())}mutate(e=1){const t=(this.#t-this.#e)/2,i=((e,t)=>(0===f.length&&(f=(()=>{x();const e=y(),t=y(),i=Math.sqrt(-2*Math.log(e)),s=2*Math.PI*t;return[i*Math.cos(s),i*Math.sin(s)]})()),(e||0)+f.pop()*(t||1)))(t,e);return{min:this.#e,now:this.#i+t-i,max:this.#t}}},b=w,v=new class{constructor(){this.World={width:3e3,height:2e3},this.Entities={Anorganic:{index:0,symbol:Symbol("Anorganic"),name:"Anorganic",color:16640002,quantity:100},Organic:{index:1,symbol:Symbol("Organic"),name:"Organic",color:16748571,quantity:0},Autotroph:{index:2,symbol:Symbol("Autotroph"),name:"Autotroph",color:522629,quantity:1},Heterotroph:{index:3,symbol:Symbol("Heterotroph"),name:"Heterotroph",color:16711930,quantity:0},Mixotroph:{index:4,symbol:Symbol("Mixotroph"),name:"Mixotroph",color:16539137,quantity:0}},this.mutationRate=5,this.seed="ALoAA",this.speedMultiplier=new b({min:.125,now:2,max:1024}),this.Values={Min:{AgentMass:0,Decomposition:0,Energy:0,Food:0,ResourceMass:0},Max:{AgentMass:100,Decomposition:1e3,Energy:1e3,Food:100,ResourceMass:100}}}assign(){Object.freeze(this),Object.freeze(this.World),Object.freeze(this.Entities),Object.values(this.Entities).forEach((e=>Object.freeze(e))),Object.freeze(this.speedMultiplier),Object.freeze(this.Values),Object.freeze(this.Values.Min),Object.freeze(this.Values.Max)}},E=(...e)=>{const t=/^\w+$/,i={};return Array.isArray(e)&&e.forEach((e=>{if(!t.test(`${e}`))throw Error(`${e} contains a character that is not allowed.`);i[`${e}`]=Symbol(`${e}`)})),i.has=e=>Object.values(i).includes(e),Object.freeze({...i})},R=class{static Type=E("NONE","ANORGANIC","ORGANIC","AUTOTROPH","MIXOTROPH","HETEROTROPH");constructor({x:e,y:t}){this.type=R.Type.NONE,this.position=Number.isFinite(e)&&Number.isFinite(t)?{x:e,y:t}:{x:0,y:0},this.velocity={x:0,y:0},this.genes={},this.target=null,this.threat=null,this.activity=null,this.pixelSize=0,this.graphics=null,this.color=null,Object.seal(this)}calculateDistanceFromCurrentPosition(e){let t={...this.velocity};return t=c(t,e),o(t,this.position)}mutate(){const e=[];return Object.values(this.genes).forEach((t=>{"Speed"!==t.id&&"Food"!==t.id||e.push(t.mutate())})),e}},I=R,O=E("NONE","BAR","TRAIT","ABILITY","AGENT","RESOURCE"),M=e=>"string"==typeof e&&e.length>0,C=(e,t={})=>{if(O.has(e.constructor.ClassType)){const{id:i,name:s,description:n}=t;e.id=M(i)?i:"",e.name=M(s)?s:"",e.description=M(n)?n:""}},F=(e,t=!1)=>{let i=13421772;return e===I.Type.ANORGANIC?i=v.Entities.Anorganic.color:e===I.Type.ORGANIC?i=v.Entities.Organic.color:e===I.Type.AUTOTROPH?i=v.Entities.Autotroph.color:e===I.Type.HETEROTROPH?i=v.Entities.Heterotroph.color:e===I.Type.MIXOTROPH&&(i=v.Entities.Mixotroph.color),t&&(i=h(i)),i},S=(n,o,a)=>{const r=e("button",n);return o instanceof Function&&r.addEventListener("pointerdown",o),"string"==typeof a&&a.length>0&&(c=a,(l=r)instanceof HTMLElement&&(l.addEventListener("pointerenter",(()=>((e,s)=>{i.textContent=s,t.classList.add("Visible");const n=t.getBoundingClientRect();let o=e.x+e.width,a=e.y+e.height;o+n.width>window.innerWidth&&(o=o-n.width-e.width),a+n.height>window.innerHeight&&(a=a-n.height-e.height),t.style.left=`${o}px`,t.style.top=`${a}px`})(l.getBoundingClientRect(),c))),l.addEventListener("pointerleave",s))),r;var l,c};let P=!0;const N="Active",D=e=>{e instanceof HTMLElement&&!e.classList.contains(N)&&((e=>{e.classList.add(N)})(e),(e=>{[...e.parentNode.children].filter((t=>t!==e)).forEach((e=>(e=>e.classList.remove(N))(e)))})(e))},H=t=>{const i=e("span");i.textContent=t;const s=e("span");s.textContent="Value";const n=e("p","ContentHeader");return n.append(i,s),{header:n,content:e("div","Content")}},V=(t,i)=>{const s=e("span","Key");s.textContent=i.name;const n=e("span","Value");n.id=i.id,n.textContent=i.getValue(),t.append(s,n)},B=e("p","Name"),z=e("span");z.textContent="Type:";const W=e("span"),L=e("p","Type");L.append(z,W);const X=H("Bar"),j=H("Trait"),q=e("div","Panel Observer");q.append(B,L,X.header,X.content,j.header,j.content);const $=S("Icon icon-target",(()=>{D($),D(q)}),"Show Individual Information"),k=()=>$,G=()=>q,U=new class{#o=1;#a=0;#r=1;#l=[];#c=[];get timePassed(){return this.#a}set timePassed(e){Number.isFinite(e)&&(this.#a=e)}get speedFactor(){return this.#r}set speedFactor(e){Number.isFinite(e)&&e<=v.speedMultiplier.maximum&&e>=v.speedMultiplier.minimum&&(this.#r=e)}get worldZoom(){return this.#o}set worldZoom(e){Number.isFinite(e)&&e>0&&(this.#o=e)}addEntity(e){const t=e.constructor.ClassType;t===O.RESOURCE?this.#l.push(e):t===O.AGENT&&this.#c.push(e)}getAgents(){return this.#c}getEntities(){return[...this.#l,...this.#c]}getResources(){return this.#l}},Y=U,Z=e=>new class{#p=!1;#h=null;#u=null;#d=0;#m=0;#g=0;#y=0;#x=0;#f=0;#A=e=>{const{width:t,height:i}=v.World,s=this.#h.getBoundingClientRect();this.#x=s.width-t*Y.worldZoom,this.#f=s.height-i*Y.worldZoom,this.#g=e.clientX-this.#d-this.#u.stage.position.x,this.#y=e.clientY-this.#m-this.#u.stage.position.y,this.#x<0&&this.#f<0?(this.#h.style.cursor="grab",this.#p=!0):(this.#x>0&&(this.#u.stage.position.x=(this.#u.renderer.width-this.#u.stage.width)/2),this.#f>0&&(this.#u.stage.pivot.y=(this.#u.renderer.height-this.#u.stage.height)/2))};#T=e=>{if(this.#p){let t=e.clientX-this.#d-this.#g;t>0?t=0:t<this.#x&&(t=this.#x),this.#u.stage.position.x=t;let i=e.clientY-this.#m-this.#y;i>0?i=0:i<this.#f&&(i=this.#f),this.#u.stage.position.y=i,this.#u.ticker.started||this.#u.render()}};#w=()=>{this.#p&&(this.#p=!1,this.#h.style.cursor="default")};constructor(e){if(e instanceof PIXI.Application){this.#u=e,this.#h=e.view,this.#h.addEventListener("pointerdown",this.#A),this.#h.addEventListener("pointermove",this.#T),this.#h.addEventListener("pointerup",this.#w);const t=this.#h.getBoundingClientRect();this.#d=t.x,this.#m=t.y}}}(e),_=class{static#b=.2;#h;#v;#E=()=>{const e=Y.worldZoom+_.#b;Y.worldZoom=e,this.#v.x=e,this.#v.y=e};#R=()=>{const{width:e,height:t}=v.World;if(e>this.#h.width||t>this.#h.height){const e=Y.worldZoom-_.#b;Y.worldZoom=e,this.#v.x=e,this.#v.y=e}};constructor(e){e instanceof PIXI.Application&&(this.#v=e.stage.scale,this.#h=e.view,this.#h.addEventListener("wheel",(t=>{t.deltaY>0?this.#R():this.#E(),e.ticker.started||e.render()})))}};let K=new PIXI.Application;const J={element:null,graphic:null},Q=e=>{if(e instanceof I){const t=new PIXI.Graphics;t.interactive=!0,t.cursor="pointer",t.on("pointerdown",(i=>{var s,n;J.element===e?(J.element=null,J.graphic=null,K.stage.pivot.x=0,K.stage.pivot.y=0,K.stage.position.x=i.clientX,K.stage.position.y=i.clientY,W.textContent="",X.content.textContent="",j.content.textContent=""):(J.element=e,J.graphic=t,s=J.element.type,n=J.element.genes,D($),D(q),W.textContent=s.description,W.style.color=`rgb(${F(s,!0)}`,X.content.textContent="",j.content.textContent="",Object.values(n).forEach((e=>{e.constructor.ClassType===O.BAR?V(X.content,e):e.constructor.ClassType===O.TRAIT&&V(j.content,e)})))})),e.draw(t),K.stage.addChild(t)}};let ee=null,te=null,ie=null;const se="rgba(38, 217, 255, 0.5)";let ne=null,oe=1001;let ae=null;const re=(e,t)=>e.filter((e=>e.type===t)).reduce(((e,t)=>{const{Mass:i,Stomach:s,Rectum:n}=t.genes;let o=e+i.getValue();return t.constructor.ClassType===O.AGENT&&(o=o+s.getValue()+n.getValue()),o}),0);let le=1001;const ce=class{static ClassType=O.BAR;static RATE_DEFAULT=1;#I=!1;#O;#M;constructor({id:e="Bar",name:t,description:i,value:s,rate:n}={}){C(this,{id:e,name:t,description:i}),this.#O=new b(s),this.#M=new b(n||{min:0,now:ce.RATE_DEFAULT,max:ce.RATE_DEFAULT}),Object.freeze(this)}increase(e){Number.isFinite(e)&&(this.#O.current=this.#O.current+e*this.#M.current,this.#I=!0)}decrease(e){if(Number.isFinite(e)){let t=this.#M.maximum-this.#M.current;0===t&&(t=ce.RATE_DEFAULT),this.#O.current=this.#O.current-e*t,this.#I=!0}}empty(){this.#O.current=0}getValue(){return this.#O.current}hasChanged(){const e=this.#I;return this.#I=!1,e}isEmpty(){return this.#O.current===this.#O.minimum}isFull(){return this.#O.current===this.#O.maximum}},pe=ce,he=class{static ClassType=O.TRAIT;#O;constructor({id:e="Trait",name:t,description:i,value:s={}}={}){C(this,{id:e,name:t,description:i}),this.#O=new b(s),Object.freeze(this)}getValue(){return this.#O.current}mutate(){return new he({id:this.id,name:this.name,description:this.description,value:this.#O.mutate()})}},ue=he,de=(e,t)=>{const i={id:e,value:t.default},s={};return t.classType===O.BAR?s[`${e}`]=new pe(i):t.classType===O.TRAIT&&(s[`${e}`]=new ue(i)),s},me=e=>{const t={};return Array.isArray(e)&&e.forEach((e=>{if(O.has(e.constructor.ClassType)){const{id:i}=e;M(i)&&(t[`${i}`]=e)}})),t},ge=(e,t,i=!1)=>{let s={...e};return Object.keys(t).forEach((n=>{const o=t[`${n}`];(!i||i&&Object.hasOwn(o,"self"))&&o&&!Object.hasOwn(e,n)&&(O.has(o.classType)&&Object.hasOwn(o,"default")&&(s={...s,...de(n,o)},Object.hasOwn(o,"warn")&&console.warn(`Using default "${n}"!`)),console.error(`Requirement "${n}" is missing!`))})),s},ye=class extends I{static ClassType=O.AGENT;static Requirements=Object.freeze({Mass:{classType:O.TRAIT,default:{min:0,now:50,max:100}},Food:{classType:O.TRAIT,default:{min:0,now:0,max:100}}});static#C=e=>{let t=I.Type.MIXOTROPH;return e<=30?t=I.Type.AUTOTROPH:e>=70&&(t=I.Type.HETEROTROPH),t};constructor({x:e,y:t}){super({x:e,y:t})}addProperties(...e){this.genes=ge(me(e),ye.Requirements),this.pixelSize=g(this.genes.Mass.getValue()),this.type=ye.#C(this.genes.Food.getValue()),this.color=F(this.type)}draw(e=null){null===this.graphics&&(this.graphics=e),this.graphics.lineStyle(2,this.color,1),this.graphics.beginFill(),this.graphics.drawEllipse(-this.pixelSize,0,this.pixelSize,this.pixelSize/2),this.graphics.endFill(),this.graphics.lineStyle(0),this.graphics.beginFill(this.color,1);const t=Math.ceil(this.pixelSize/10);this.graphics.drawCircle(2*-t,0,t),this.graphics.endFill()}render(){let e=!1;this.genes.Mass.hasChanged()&&(this.pixelSize=g(this.genes.Mass.getValue()),e=!0),e&&this.draw(),this.graphics.x=this.position.x,this.graphics.y=this.position.y,this.graphics.rotation=a(this.velocity)}update(){const e=this.genes.Vision.use(this.type);if(null===this.target&&null!==e&&(this.target=e),!this.genes.Digestion.use()){let e=null;null!==this.target?(t=this.position,i=this.target.position,0===Math.floor(r(p(t,i)))?this.genes.Ingestion.use(this.target)&&(this.target=null):e=this.genes.SeekAndArrive.use(this.target)):e=this.genes.Wander.use(),this.genes.Motion.use(e)}var t,i;this.genes.Growth.use()}},xe=ye,fe=class extends I{static ClassType=O.RESOURCE;static Requirements=Object.freeze({Mass:{classType:O.BAR,default:{min:0,now:50,max:100}},Decomposition:{classType:O.BAR,default:{min:0,now:0,max:100}}});static#F=e=>e>0?I.Type.ORGANIC:I.Type.ANORGANIC;constructor({x:e,y:t}){super({x:e,y:t})}addProperties(...e){this.genes=ge(me(e),fe.Requirements),this.pixelSize=g(this.genes.Mass.getValue()),this.type=fe.#F(this.genes.Decomposition.getValue()),this.color=F(this.type)}draw(e){null===this.graphics&&(this.graphics=e),this.graphics.clear(),this.graphics.lineStyle(2,this.color,1),this.graphics.beginFill();const t=this.pixelSize/2;this.type===I.Type.ANORGANIC?this.graphics.drawRect(this.position.x-t,this.position.y-t,this.pixelSize,this.pixelSize):this.type===I.Type.ORGANIC&&this.graphics.drawRoundedRect(this.position.x-t,this.position.y-t,this.pixelSize,this.pixelSize,10),this.graphics.endFill()}getDecompositionDegree(){return this.genes.Decomposition.getValue()}render(){let e=!1;this.genes.Mass.hasChanged()&&(this.pixelSize=g(this.genes.Mass.getValue()),e=!0),this.genes.Decomposition.hasChanged()&&this.genes.Decomposition.isEmpty()&&(this.type=fe.#F(this.genes.Decomposition.getValue()),this.color=F(this.type),e=!0),e&&this.draw()}update(){this.genes?.Decay?.use()}},Ae=fe,Te=class{static ClassType=O.ABILITY;constructor(e,t,i){C(this,{id:e,name:t,description:i})}setParent(e){this.parent=O.has(e?.constructor?.ClassType)?e:null}},we=class extends Te{static#S=(e,t)=>{const i=I.Type,s=t.constructor.ClassType;return e===i.AUTOTROPH&&t.type===i.ANORGANIC||e===i.HETEROTROPH&&s===O.AGENT||e===i.MIXOTROPH&&(s===O.AGENT||t.type===i.ORGANIC)};static Requirements=Object.freeze({Food:{classType:O.TRAIT},Energy:{classType:O.BAR},Stomach:{classType:O.BAR}});#P;constructor(...e){super("Ingestion"),this.#P=ge(me(e),we.Requirements,!0)}use(e){let t=!0;if(we.#S(this.parent.type,e)){const i=this.parent.genes.Stomach,s=this.parent.genes.Energy;if(!i.isFull()){const n=e.genes.Mass;n.isEmpty()||(n.decrease(1),i.increase(1),s.decrease(1),t=!1)}}return t}},be=we,ve=class extends Te{static checkCollisionWithBoundary(e){const{width:t,height:i}=v.World,{position:s,velocity:n,pixelSize:o}=e;s.x>t-o?(s.x=t-o,n.x=-1*n.x):s.x<o?(s.x=o,n.x=-1*n.x):s.y>i-o?(s.y=i-o,n.y=-1*n.y):s.y<o&&(s.y=o,n.y=-1*n.y)}static Requirements=Object.freeze({Energy:{classType:O.BAR},Speed:{classType:O.TRAIT},Agility:{classType:O.TRAIT}});#N={x:0,y:0};constructor(){super("Motion")}use(e){if(null!==e){const t=this.parent.genes.Energy,i=this.parent.genes.Speed.getValue();this.#N=o(this.#N,e),this.parent.velocity=o(this.parent.velocity,this.#N),this.parent.velocity=l(this.parent.velocity,i),this.parent.position=o(this.parent.position,this.parent.velocity),this.#N=((e,t)=>{const i=new PIXI.Point(e.x,e.y),{x:s,y:n}=i.multiplyScalar(0);return{x:s,y:n}})(this.#N),t.decrease(1),ve.checkCollisionWithBoundary(this.parent)}}},Ee=ve,Re=class extends Te{static Requirements=Object.freeze({Vision:{classType:O.ABILITY},Motion:{classType:O.ABILITY}});constructor(){super("SeekAndArrive")}use(e){const t=this.parent.genes.Speed.getValue(),i=this.parent.genes.Agility.getValue(),s=this.parent.genes.VisionWidth.getValue();let n=p(e.position,this.parent.position)||{x:0,y:0};const o=r(n);let a=t;return o<s&&(a=((e,t,i,s,n)=>{const o=(e-0)/(i-0)*(n-0)+0;return 0<n?m(o,0,n):m(o,n,0)})(o,0,s,0,t)),n=c(n,a),n=p(n,this.parent.velocity),l(n,i)}},Ie=class extends Te{static Requirements=Object.freeze({VisionDistance:{classType:O.TRAIT},VisionWidth:{classType:O.TRAIT}});static#D=e=>{const t=I.Type;let i=null;return e===t.AUTOTROPH?i=Y.getResources().filter((e=>e.type===t.ANORGANIC)):e===t.MIXOTROPH?i=Y.getEntities():e===t.HETEROTROPH&&(i=[...Y.getAgents(),...Y.getResources().filter((e=>e.type===t.ORGANIC))]),i};constructor(){super("Vision")}use(e){const t=Ie.#D(e);let i=null;if(Array.isArray(t)){const e=this.parent.genes.VisionWidth.getValue(),s=this.parent.genes.VisionDistance.getValue(),n=this.parent.calculateDistanceFromCurrentPosition(s);let o=e;t.forEach((t=>{const s=r(p(n,t.position));s<o&&s<e&&(i=t,o=s)}))}return i}},Oe=Ie,Me=class extends Te{static Requirements=Object.freeze({Motion:{classType:O.ABILITY},WanderDistance:{classType:O.TRAIT,self:!0,default:{min:0,now:75,max:150}},WanderWidth:{classType:O.TRAIT,self:!0,default:{min:0,now:50,max:100}}});#P;#H=.5*Math.PI;constructor(...e){super("Wander"),this.#P=ge(me(e),Me.Requirements,!0)}use(){const e=this.parent.genes.Agility.getValue();let t=this.parent.calculateDistanceFromCurrentPosition(this.#P.WanderDistance.getValue());const i=this.#H+a(this.parent.velocity),s=this.#P.WanderWidth.getValue()*Math.cos(i),n=this.#P.WanderWidth.getValue()*Math.sin(i);t=o(t,{x:s,y:n}),this.#H=this.#H+T(-e,e);const r=p(t,this.parent.position);return c(r,e)}},Ce=Me,Fe=class extends Te{static Requirements=Object.freeze({Energy:{classType:O.BAR},Mass:{classType:O.BAR},Stomach:{classType:O.BAR}});constructor(){super("Growth")}use(){const{Energy:e,Mass:t,Stomach:i}=this.parent.genes;i.isEmpty()||e.isEmpty()||t.isFull()||(t.increase(1),i.decrease(1),e.decrease(1))}},Se=class extends Te{static Requirements=Object.freeze({Decomposition:{classType:O.BAR}});constructor(){super("Decay")}use(){const e=this.parent.genes.Decomposition;e.isEmpty()||e.decrease(1)}},Pe=class extends Te{static Id=Symbol("Digestion");static Requirements=Object.freeze({Food:{classType:O.TRAIT},Energy:{classType:O.BAR},Stomach:{classType:O.BAR},Rectum:{classType:O.BAR}});constructor(){super("Digestion")}use(){const e=this.parent.genes.Stomach,t=this.parent.genes.Energy,i=this.parent.genes.Rectum;return!(!e.isFull()||t.isFull()||i.isFull()||(e.decrease(1),i.increase(1),t.increase(2),0))}},{width:Ne,height:De}=v.World,He=(e={},t=0)=>{let{x:i,y:s}=e;return(!Number.isFinite(i)||i<0)&&(i=T(t,Ne-2*t)),(!Number.isFinite(s)||s<0)&&(s=T(t,De-2*t)),{x:i,y:s}},Ve=(e,t,i)=>{let s=t;return s||(s=i),s.forEach((t=>{t.constructor.ClassType===O.ABILITY&&t.setParent(e)})),s},Be=(e,t=[])=>(t.forEach((t=>{const i=e.findIndex((e=>e.id===t.id));-1!==i?e.splice(i,1,t):e.push(t)})),e),{Min:ze,Max:We}=v.Values,Le=We.AgentMass/2,Xe=g(Le),je=g(We.ResourceMass),qe=(e={},t=[])=>{const i=[new pe({id:"Mass",name:"Mass",value:{min:ze.ResourceMass,now:We.ResourceMass,max:We.ResourceMass}}),new pe({id:"Decomposition",name:"Decomposition",value:{min:ze.Decomposition,now:ze.Decomposition,max:We.Decomposition}})];return((e,t)=>{const i=new Ae(He(e,je));return i.addProperties(...Ve(i,t)),i})(e,Be(i,t))},$e=(e={},t=[])=>{const i=[new pe({id:"Mass",name:"Mass",value:{min:ze.AgentMass,now:Le,max:We.AgentMass}}),new ue({id:"Food",name:"Food",value:{min:ze.Food,now:ze.Food,max:We.Food}}),new pe({id:"Energy",name:"Energy",value:{min:ze.Energy,now:We.Energy,max:We.Energy}}),new ue({id:"Speed",name:"Speed",value:{min:0,now:5,max:10}}),new ue({id:"Agility",name:"Agility",value:{min:0,now:1,max:1}}),new Ee,new Ce(new ue({id:"WanderDistance",name:"Wander Distance",value:{min:0,now:75,max:150}}),new ue({id:"WanderWidth",name:"Wander Width",value:{min:0,now:50,max:100}})),new ue({id:"VisionDistance",name:"Vision Distance",value:{min:0,now:150,max:300}}),new ue({id:"VisionWidth",name:"Vision Width",value:{min:0,now:100,max:200}}),new Oe,new Re,new pe({id:"Stomach",name:"Stomach",value:{min:0,now:0,max:100}}),new be,new pe({id:"Rectum",name:"Rectum",value:{min:0,now:0,max:100}}),new Pe,new Fe];return((e,t)=>{const i=new xe(He(e,Xe));return i.addProperties(...Ve(i,t)),i})(e,Be(i,t))},ke=e=>{let t=null;return e===v.Entities.Anorganic.symbol?t=qe():e===v.Entities.Organic.symbol?t=qe([new pe({id:"Decomposition",name:"Decomposition",value:{min:ze.Decomposition,now:We.Decomposition,max:We.Decomposition}}),new Se]):e===v.Entities.Autotroph.symbol?t=$e():e===v.Entities.Heterotroph.symbol?t=$e([new ue({id:"Food",name:"Food",value:{min:ze.Food,now:We.Food,max:We.Food}})]):e===v.Entities.Mixotroph.symbol&&(t=$e([new ue({id:"Food",name:"Food",value:{min:ze.Food,now:u(We.Food/2),max:We.Food}})])),t},{Min:Ge,Max:Ue}=v.Values,Ye=({genes:e=[],mass:t=0,position:i={}})=>(e.push(new pe({id:"Mass",name:"Mass",value:{min:Ge.AgentMass,now:t,max:Ue.AgentMass}})),$e(i,e)),Ze=e=>{const t=[],i=[];e.forEach(((e,s)=>{e.update();const{Energy:n,Mass:o,Rectum:a}=e.genes;let r=!1,l=null;var c,p;o.isEmpty()&&(r=!0),e.constructor.ClassType===O.AGENT&&(n&&n.isEmpty()?(c=o,p=e.position,l={mass:c.getValue(),decomposition:Ue.Decomposition,position:{...p}},r=!0):a&&a.isFull()?l=((e,t)=>{const i={};return i.mass=e.getValue(),i.decomposition=Ue.Decomposition/2,i.position={x:t.x,y:t.y},e.empty(),i})(a,e.position):o.isFull()&&((e=>{const t=[];for(let i=0;i<2;i+=1)t.push(Ye({genes:100*T()<v.mutationRate?e.mutate():[],mass:e.genes.Mass.getValue()/2,position:e.position}));return t})(e).forEach((e=>t.push(e))),r=!0)),l&&t.push((e=>{const{mass:t,decomposition:i,position:s}=e;return qe(s,[new pe({id:"Mass",name:"Mass",value:{min:Ge.Mass,now:t,max:t}}),new pe({id:"Decomposition",name:"Decomposition",value:{min:Ge.Decomposition,now:i,max:i}}),new Se])})(l)),r&&i.push({index:s,entity:e})})),t.forEach((e=>{Y.addEntity(e),Q(e)})),i.forEach((t=>{e.splice(t.index,1).pop(),(e=>{if(e instanceof I){const{graphics:t}=e;t instanceof PIXI.Graphics&&(t.clear(),K.stage.removeChild(t))}})(t.entity)}))},_e=e=>e.forEach((e=>e.render())),Ke=e=>{(e=>{if(oe>1e3){const e=(ne.data.labels.at(-1)||0)+1;ne.data.labels.push(e),ne.data.datasets[v.Entities.Anorganic.index].data.push(Y.getResources().filter((e=>e.type===I.Type.ANORGANIC)).length),ne.data.datasets[v.Entities.Organic.index].data.push(Y.getResources().filter((e=>e.type===I.Type.ORGANIC)).length),ne.data.datasets[v.Entities.Autotroph.index].data.push(Y.getAgents().filter((e=>e.type===I.Type.AUTOTROPH)).length),ne.data.datasets[v.Entities.Heterotroph.index].data.push(Y.getAgents().filter((e=>e.type===I.Type.HETEROTROPH)).length),ne.data.datasets[v.Entities.Mixotroph.index].data.push(Y.getAgents().filter((e=>e.type===I.Type.MIXOTROPH)).length),ne.data.labels.length>100&&(ne.data.labels.shift(),ne.data.datasets.forEach((e=>{e.data.shift()}))),ne.update("none"),oe=0}oe+=e})(e),(e=>{if(le>1e3){const{ANORGANIC:e,ORGANIC:t,AUTOTROPH:i,HETEROTROPH:s,MIXOTROPH:n}=I.Type,o=Y.getResources(),a=Y.getAgents(),r=re(o,e),l=re(o,t),c=re(a,i),p=re(a,s),h=re(a,n),u=[r+l+c+p+h,r,l,c,p,h];ae.data.datasets[0].data=u.map((e=>e)),ae.update("none"),le=0}le+=e})(e);const{element:t}=J;var i;t&&(i=t.genes,q.classList.contains("Active")&&Object.values(i).forEach((e=>{e.constructor.ClassType===O.BAR&&(document.getElementById(e.id).textContent=e.getValue())})))},Je=()=>{let e=0;var t;t=t=>{const i=Y.speedFactor;if(i<1&&e<1/i)e+=1;else{const i=(e=>{const t=Y.speedFactor*e;return Y.timePassed=Y.timePassed+t,(()=>{const e=(e=>{const t=e/1e3,i=`${d(t%60)}${(t%60).toFixed(2)}`,s=t/60,n=`${d(s%60)}${Math.floor(s%60)}`,o=s/60;return`${d(o%24)}${Math.floor(o%24)}:${n}:${i}`})(Y.timePassed);ie.textContent=e})(Y.timePassed),t})(t),s=Y.getResources(),n=Y.getAgents();for(let e=0;e<Y.speedFactor;e+=1)Ze(s),Ze(n);_e(s),_e(n),Ke(i),e=0}},K instanceof PIXI.Application&&t instanceof Function&&K.ticker.add((()=>{t(K.ticker.deltaMS),J.element&&J.element.constructor.ClassType===O.AGENT&&(K.stage.pivot.x=J.graphic.position.x,K.stage.pivot.y=J.graphic.position.y,K.stage.position.x=K.renderer.width/2,K.stage.position.y=K.renderer.height/2)}))},Qe=()=>{var t;document.addEventListener("contextmenu",(e=>{e.stopPropagation(),e.preventDefault()})),(t=ee)instanceof HTMLDivElement&&(K=new PIXI.Application({resizeTo:t,autoResize:!0,resolution:devicePixelRatio,autoStart:!1}),t.appendChild(K.view),Z(K),new _(K)),A(v.seed),Object.values(v.Entities).forEach((e=>{for(let t=0;t<e.quantity;t+=1){const t=ke(e.symbol,e.defaults);Y.addEntity(t),Q(t)}}));const i=te;(t=>{const i=e("p","Title");i.textContent="Number of entities";const s=e("canvas"),n=e("div");n.append(i,s),t.append(n);const o=[{label:v.Entities.Anorganic.name,data:[],borderColor:`rgb(${h(v.Entities.Anorganic.color)})`,fill:!1,pointStyle:!1},{label:v.Entities.Organic.name,data:[],borderColor:`rgb(${h(v.Entities.Organic.color)})`,fill:!1,pointStyle:!1},{label:v.Entities.Autotroph.name,data:[],borderColor:`rgb(${h(v.Entities.Autotroph.color)})`,fill:!1,pointStyle:!1},{label:v.Entities.Heterotroph.name,data:[],borderColor:`rgb(${h(v.Entities.Heterotroph.color)})`,fill:!1,pointStyle:!1},{label:v.Entities.Mixotroph.name,data:[],borderColor:`rgb(${h(v.Entities.Mixotroph.color)})`,fill:!1,pointStyle:!1}];ne=new Chart(s,{type:"line",data:{labels:[],datasets:o},options:{responsive:!0,scales:{x:{grid:{color:e=>0!==e.tick.label&&e.tick.label%10==0?se:null,display:!0,drawOnChartArea:!0,drawTicks:!1,lineWidth:.5,ticks:{display:!1}},ticks:{display:!1}},y:{grid:{color:se,display:!0,drawOnChartArea:!0,drawTicks:!1,lineWidth:.5},ticks:{display:!1}}},plugins:{tooltip:{displayColors:!1},legend:{display:!1}}}})})(i),(t=>{const i=e("p","Title");i.textContent="Masses of entities";const s=e("canvas"),n=e("div");n.append(i,s),t.append(n);const{Anorganic:o,Organic:a,Autotroph:r,Heterotroph:l,Mixotroph:c}=v.Entities,p=[{label:"Total Mass",value:0},{label:o.name,value:0},{label:a.name,value:0},{label:r.name,value:0},{label:l.name,value:0},{label:c.name,value:0}],u=["#FFFFFF",`rgb(${h(o.color)})`,`rgb(${h(a.color)})`,`rgb(${h(r.color)})`,`rgb(${h(l.color)})`,`rgb(${h(c.color)})`],d={labels:p.map((e=>e.label)),datasets:[{label:null,data:p.map((e=>e.value)),backgroundColor:u}]};ae=new Chart(s,{type:"bar",data:d,options:{scales:{x:{display:!1},y:{grid:{color:se,display:!0,drawOnChartArea:!0,drawTicks:!1,lineWidth:.5},ticks:{display:!1}}},plugins:{tooltip:{displayColors:!1},legend:{display:!1}}}})})(i),Je()},et=e("div","Page Configuration Maximize"),tt=[{title:"world size",input:[{label:"width",type:"number",max:1e4,placeholder:"3000"},{label:"height",type:"number",max:1e4,placeholder:"2000"}]},{title:"number of entities",input:[{label:"anorganic resource",type:"number",max:1e3,placeholder:"100"},{label:"organic resource",type:"number",max:1e3,placeholder:"0"},{label:"autotroph agent",type:"number",max:1e3,placeholder:"10"},{label:"heterotroph agent",type:"number",max:1e3,placeholder:"0"},{label:"mixotroph agent",type:"number",max:1e3,placeholder:"0"}]},{title:"mutation",input:[{label:"frequency",type:"number",max:100,placeholder:"5",info:"0-100%"}]},{title:"pseudo random number generator",input:[{label:"seed",type:"string",max:32,placeholder:"ALoAA"}]}],it=e("h1","Title");it.textContent="ALoAA";const st=e("h2","Subtitle");st.textContent="Artificial Life of Autonomous Agents";const nt=e("p","Description");["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur varius lorem, sit amet sodales nisl ornare id. Aenean vulputate nisi neque, vitae porta arcu interdum non. Integer vitae metus fringilla, aliquam massa id, semper dolor.","Suspendisse placerat ex ac ligula bibendum, ac aliquam nulla egestas. Nunc euismod nisi quis."].forEach((t=>{const i=e("span");i.textContent=t,nt.appendChild(i)}));const ot=e("div","Welcome");ot.append(it,st,nt);const at=S("Icon Reset icon-spinner11",(()=>tt.forEach((e=>e.input.forEach((e=>{document.getElementById(e.label).value="",P=!0}))))),"reset to default values"),rt=S("Icon icon-checkmark",(()=>{P&&(v.World.width=Number.parseInt(document.getElementById("width").value,10)||3e3,v.World.height=Number.parseInt(document.getElementById("height").value,10)||2e3,v.Entities.Anorganic.quantity=Number.parseInt(document.getElementById("anorganic resource").value,10)||100,v.Entities.Organic.quantity=Number.parseInt(document.getElementById("organic resource").value,10)||0,v.Entities.Autotroph.quantity=Number.parseInt(document.getElementById("autotroph agent").value,10)||10,v.Entities.Heterotroph.quantity=Number.parseInt(document.getElementById("heterotroph agent").value,10)||0,v.Entities.Mixotroph.quantity=Number.parseInt(document.getElementById("mixotroph agent").value,10)||0,v.mutationRate=Number.parseInt(document.getElementById("frequency").value,10)||1,v.seed=document.getElementById("seed").value||"ALoAA",v.assign(),t.remove(),t=null,et.remove(),(()=>{let t=!0;const i=e("p","StartSimulationHint");i.textContent='To start the simulation click the "Play" button.',ee=e("div","Renderer Sci-Fi-Border"),ee.appendChild(i);const s=e("span","SpeedFactor");s.textContent=Y.speedFactor;const o=()=>{s.textContent=Y.speedFactor},a=S("Icon icon-backward2",(()=>{Y.speedFactor=Y.speedFactor/v.speedMultiplier.current,o()}),"Slow Down Simulation"),r=S("Icon icon-forward3",(()=>{Y.speedFactor=Y.speedFactor*v.speedMultiplier.current,o()}),"Speed Up Simulation");ie=e("span","TimePassed"),ie.textContent="00:00:00.00";let l=null;const c=S("Icon Play icon-play3 PulseEffect",(()=>{t&&(t=!1,i.classList.add("Hidden"),c.classList.remove("PulseEffect")),c.style.display="none",l.style.display="block",K instanceof PIXI.Application&&!K.ticker.started&&K.start()}),"Run Simulation");l=S("Icon icon-pause2",(()=>{l.style.display="none",c.style.display="block",K instanceof PIXI.Application&&K.stop()}),"Pause Simulation"),l.style.display="none";const p=e("div","Controls Sci-Fi-Border");p.append(a,c,l,r,s,ie);const h=e("div","LeftContainer");h.append(ee,p),te=e("div","Panel Charts Active");const u=G(),d=e("div","Panel"),m=S("Icon Active icon-stats-bars",(()=>{D(m),D(te)}),"Show Charts"),g=k(),y=S("Icon icon-info",(()=>{D(y),D(d)}),"Show Individual Information"),x=e("div","Menu Sci-Fi-Border");x.append(m,g,y);const f=e("div","PanelGroup Sci-Fi-Border");f.append(te,u,d);const A=e("div","RightContainer");A.append(x,f);const T=e("div","Page Simulation Maximize");T.append(h,A,n()),document.body.appendChild(T)})(),Qe())}),"confirm configuration"),lt=e("div","InputPanel");tt.forEach((t=>{const i=e("h3","Title");i.textContent=t.title;const s=e("div","InputGroup");s.appendChild(i),t.input.forEach((t=>s.append((({label:t,type:i,pattern:s,max:n,placeholder:o})=>{const a=e("label");a.textContent=t,a.setAttribute("for",t.trim());const r=e("input");r.id=t.trim(),r.setAttribute("type","text"),"number"===i?(r.setAttribute("inputmode","numeric"),r.setAttribute("pattern","[0-9]*"),r.addEventListener("input",(()=>{r.value>n&&(r.value=n),r.value<0&&(r.value=0),P=r.validity.valid}))):"string"===i&&(r.setAttribute("pattern","[A-Za-z0-9_]*"),r.setAttribute("maxlength",n),r.addEventListener("input",(()=>{P=r.validity.valid}))),s&&M(s)&&r.setAttribute("pattern",s),o&&M(o)&&r.setAttribute("placeholder",o);const l=e("div");return l.append(a,r),l})(t)))),lt.appendChild(s)}));const ct=e("div","Content Sci-Fi-Border");ct.append(ot,lt);const pt=e("div","Controls Sci-Fi-Border");pt.append(at,rt);const ht=e("div","LeftContainer");ht.append(ct,pt),et.append(ht,n()),document.body.appendChild(et)})();