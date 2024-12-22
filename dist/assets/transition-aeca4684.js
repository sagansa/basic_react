import{r as i,U as E,t as ae}from"./app-b88091a6.js";var Re=Object.defineProperty,Ae=(e,t,n)=>t in e?Re(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Q=(e,t,n)=>(Ae(e,typeof t!="symbol"?t+"":t,n),n);let Pe=class{constructor(){Q(this,"current",this.detect()),Q(this,"handoffState","pending"),Q(this,"currentId",0)}set(t){this.current!==t&&(this.handoffState="pending",this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}handoff(){this.handoffState==="pending"&&(this.handoffState="complete")}get isHandoffComplete(){return this.handoffState==="complete"}},I=new Pe;function ke(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function q(){let e=[],t={addEventListener(n,r,l,s){return n.addEventListener(r,l,s),t.add(()=>n.removeEventListener(r,l,s))},requestAnimationFrame(...n){let r=requestAnimationFrame(...n);return t.add(()=>cancelAnimationFrame(r))},nextFrame(...n){return t.requestAnimationFrame(()=>t.requestAnimationFrame(...n))},setTimeout(...n){let r=setTimeout(...n);return t.add(()=>clearTimeout(r))},microTask(...n){let r={current:!0};return ke(()=>{r.current&&n[0]()}),t.add(()=>{r.current=!1})},style(n,r,l){let s=n.style.getPropertyValue(r);return Object.assign(n.style,{[r]:l}),this.add(()=>{Object.assign(n.style,{[r]:s})})},group(n){let r=q();return n(r),this.add(()=>r.dispose())},add(n){return e.includes(n)||e.push(n),()=>{let r=e.indexOf(n);if(r>=0)for(let l of e.splice(r,1))l()}},dispose(){for(let n of e.splice(0))n()}};return t}function fe(){let[e]=i.useState(q);return i.useEffect(()=>()=>e.dispose(),[e]),e}let O=(e,t)=>{I.isServer?i.useEffect(e,t):i.useLayoutEffect(e,t)};function de(e){let t=i.useRef(e);return O(()=>{t.current=e},[e]),t}let $=function(e){let t=de(e);return E.useCallback((...n)=>t.current(...n),[t])};function J(...e){return Array.from(new Set(e.flatMap(t=>typeof t=="string"?t.split(" "):[]))).filter(Boolean).join(" ")}function D(e,t,...n){if(e in t){let l=t[e];return typeof l=="function"?l(...n):l}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(l=>`"${l}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,D),r}var pe=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(pe||{}),T=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(T||{});function me(){let e=xe();return i.useCallback(t=>Ne({mergeRefs:e,...t}),[e])}function Ne({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:l,visible:s=!0,name:u,mergeRefs:a}){a=a??He;let o=he(t,e);if(s)return M(o,n,r,u,a);let p=l??0;if(p&2){let{static:f=!1,...h}=o;if(f)return M(h,n,r,u,a)}if(p&1){let{unmount:f=!0,...h}=o;return D(f?0:1,{0(){return null},1(){return M({...h,hidden:!0,style:{display:"none"}},n,r,u,a)}})}return M(o,n,r,u,a)}function M(e,t={},n,r,l){let{as:s=n,children:u,refName:a="ref",...o}=X(e,["unmount","static"]),p=e.ref!==void 0?{[a]:e.ref}:{},f=typeof u=="function"?u(t):u;"className"in o&&o.className&&typeof o.className=="function"&&(o.className=o.className(t)),o["aria-labelledby"]&&o["aria-labelledby"]===o.id&&(o["aria-labelledby"]=void 0);let h={};if(t){let g=!1,d=[];for(let[c,v]of Object.entries(t))typeof v=="boolean"&&(g=!0),v===!0&&d.push(c.replace(/([A-Z])/g,m=>`-${m.toLowerCase()}`));if(g){h["data-headlessui-state"]=d.join(" ");for(let c of d)h[`data-${c}`]=""}}if(s===i.Fragment&&(Object.keys(R(o)).length>0||Object.keys(R(h)).length>0))if(!i.isValidElement(f)||Array.isArray(f)&&f.length>1){if(Object.keys(R(o)).length>0)throw new Error(['Passing props on "Fragment"!',"",`The current component <${r} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(R(o)).concat(Object.keys(R(h))).map(g=>`  - ${g}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(g=>`  - ${g}`).join(`
`)].join(`
`))}else{let g=f.props,d=g==null?void 0:g.className,c=typeof d=="function"?(...C)=>J(d(...C),o.className):J(d,o.className),v=c?{className:c}:{},m=he(f.props,R(X(o,["ref"])));for(let C in h)C in m&&delete h[C];return i.cloneElement(f,Object.assign({},m,h,p,{ref:l(Le(f),p.ref)},v))}return i.createElement(s,Object.assign({},X(o,["ref"]),s!==i.Fragment&&p,s!==i.Fragment&&h),f)}function xe(){let e=i.useRef([]),t=i.useCallback(n=>{for(let r of e.current)r!=null&&(typeof r=="function"?r(n):r.current=n)},[]);return(...n)=>{if(!n.every(r=>r==null))return e.current=n,t}}function He(...e){return e.every(t=>t==null)?void 0:t=>{for(let n of e)n!=null&&(typeof n=="function"?n(t):n.current=t)}}function he(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},n={};for(let r of e)for(let l in r)l.startsWith("on")&&typeof r[l]=="function"?(n[l]!=null||(n[l]=[]),n[l].push(r[l])):t[l]=r[l];if(t.disabled||t["aria-disabled"])for(let r in n)/^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r)&&(n[r]=[l=>{var s;return(s=l==null?void 0:l.preventDefault)==null?void 0:s.call(l)}]);for(let r in n)Object.assign(t,{[r](l,...s){let u=n[r];for(let a of u){if((l instanceof Event||(l==null?void 0:l.nativeEvent)instanceof Event)&&l.defaultPrevented)return;a(l,...s)}}});return t}function ee(e){var t;return Object.assign(i.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function R(e){let t=Object.assign({},e);for(let n in t)t[n]===void 0&&delete t[n];return t}function X(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}function Le(e){return E.version.split(".")[0]>="19"?e.props.ref:e.ref}let ve=Symbol();function nt(e,t=!0){return Object.assign(e,{[ve]:t})}function ge(...e){let t=i.useRef(e);i.useEffect(()=>{t.current=e},[e]);let n=$(r=>{for(let l of t.current)l!=null&&(typeof l=="function"?l(r):l.current=r)});return e.every(r=>r==null||(r==null?void 0:r[ve]))?void 0:n}function Ue(e=0){let[t,n]=i.useState(e),r=i.useCallback(o=>n(o),[t]),l=i.useCallback(o=>n(p=>p|o),[t]),s=i.useCallback(o=>(t&o)===o,[t]),u=i.useCallback(o=>n(p=>p&~o),[n]),a=i.useCallback(o=>n(p=>p^o),[n]);return{flags:t,setFlag:r,addFlag:l,hasFlag:s,removeFlag:u,toggleFlag:a}}var ue,ce;typeof process<"u"&&typeof globalThis<"u"&&typeof Element<"u"&&((ue=process==null?void 0:process.env)==null?void 0:ue.NODE_ENV)==="test"&&typeof((ce=Element==null?void 0:Element.prototype)==null?void 0:ce.getAnimations)>"u"&&(Element.prototype.getAnimations=function(){return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.","Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.","","Example usage:","```js","import { mockAnimationsApi } from 'jsdom-testing-mocks'","mockAnimationsApi()","```"].join(`
`)),[]});var Me=(e=>(e[e.None=0]="None",e[e.Closed=1]="Closed",e[e.Enter=2]="Enter",e[e.Leave=4]="Leave",e))(Me||{});function Ie(e){let t={};for(let n in e)e[n]===!0&&(t[`data-${n}`]="");return t}function qe(e,t,n,r){let[l,s]=i.useState(n),{hasFlag:u,addFlag:a,removeFlag:o}=Ue(e&&l?3:0),p=i.useRef(!1),f=i.useRef(!1),h=fe();return O(()=>{var g;if(e){if(n&&s(!0),!t){n&&a(3);return}return(g=r==null?void 0:r.start)==null||g.call(r,n),De(t,{inFlight:p,prepare(){f.current?f.current=!1:f.current=p.current,p.current=!0,!f.current&&(n?(a(3),o(4)):(a(4),o(2)))},run(){f.current?n?(o(3),a(4)):(o(4),a(3)):n?o(1):a(1)},done(){var d;f.current&&typeof t.getAnimations=="function"&&t.getAnimations().length>0||(p.current=!1,o(7),n||s(!1),(d=r==null?void 0:r.end)==null||d.call(r,n))}})}},[e,n,t,h]),e?[l,{closed:u(1),enter:u(2),leave:u(4),transition:u(2)||u(4)}]:[n,{closed:void 0,enter:void 0,leave:void 0,transition:void 0}]}function De(e,{prepare:t,run:n,done:r,inFlight:l}){let s=q();return ze(e,{prepare:t,inFlight:l}),s.nextFrame(()=>{n(),s.requestAnimationFrame(()=>{s.add(Ve(e,r))})}),s.dispose}function Ve(e,t){var n,r;let l=q();if(!e)return l.dispose;let s=!1;l.add(()=>{s=!0});let u=(r=(n=e.getAnimations)==null?void 0:n.call(e).filter(a=>a instanceof CSSTransition))!=null?r:[];return u.length===0?(t(),l.dispose):(Promise.allSettled(u.map(a=>a.finished)).then(()=>{s||t()}),l.dispose)}function ze(e,{inFlight:t,prepare:n}){if(t!=null&&t.current){n();return}let r=e.style.transition;e.style.transition="none",n(),e.offsetHeight,e.style.transition=r}let V=i.createContext(null);V.displayName="OpenClosedContext";var A=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(A||{});function ye(){return i.useContext(V)}function Ke({value:e,children:t}){return E.createElement(V.Provider,{value:e},t)}function rt({children:e}){return E.createElement(V.Provider,{value:null},e)}function Be(){let e=typeof document>"u";return"useSyncExternalStore"in ae?(t=>t.useSyncExternalStore)(ae)(()=>()=>{},()=>!1,()=>!e):!1}function be(){let e=Be(),[t,n]=i.useState(I.isHandoffComplete);return t&&I.isHandoffComplete===!1&&n(!1),i.useEffect(()=>{t!==!0&&n(!0)},[t]),i.useEffect(()=>I.handoff(),[]),e?!1:t}function We(){let e=i.useRef(!1);return O(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function Ee(e){var t;return!!(e.enter||e.enterFrom||e.enterTo||e.leave||e.leaveFrom||e.leaveTo)||((t=e.as)!=null?t:Fe)!==i.Fragment||E.Children.count(e.children)===1}let z=i.createContext(null);z.displayName="TransitionContext";var Ye=(e=>(e.Visible="visible",e.Hidden="hidden",e))(Ye||{});function Ze(){let e=i.useContext(z);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Ge(){let e=i.useContext(K);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let K=i.createContext(null);K.displayName="NestingContext";function B(e){return"children"in e?B(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function Ce(e,t){let n=de(e),r=i.useRef([]),l=We(),s=fe(),u=$((d,c=T.Hidden)=>{let v=r.current.findIndex(({el:m})=>m===d);v!==-1&&(D(c,{[T.Unmount](){r.current.splice(v,1)},[T.Hidden](){r.current[v].state="hidden"}}),s.microTask(()=>{var m;!B(r)&&l.current&&((m=n.current)==null||m.call(n))}))}),a=$(d=>{let c=r.current.find(({el:v})=>v===d);return c?c.state!=="visible"&&(c.state="visible"):r.current.push({el:d,state:"visible"}),()=>u(d,T.Unmount)}),o=i.useRef([]),p=i.useRef(Promise.resolve()),f=i.useRef({enter:[],leave:[]}),h=$((d,c,v)=>{o.current.splice(0),t&&(t.chains.current[c]=t.chains.current[c].filter(([m])=>m!==d)),t==null||t.chains.current[c].push([d,new Promise(m=>{o.current.push(m)})]),t==null||t.chains.current[c].push([d,new Promise(m=>{Promise.all(f.current[c].map(([C,P])=>P)).then(()=>m())})]),c==="enter"?p.current=p.current.then(()=>t==null?void 0:t.wait.current).then(()=>v(c)):v(c)}),g=$((d,c,v)=>{Promise.all(f.current[c].splice(0).map(([m,C])=>C)).then(()=>{var m;(m=o.current.shift())==null||m()}).then(()=>v(c))});return i.useMemo(()=>({children:r,register:a,unregister:u,onStart:h,onStop:g,wait:p,chains:f}),[a,u,r,h,g,f,p])}let Fe=i.Fragment,$e=pe.RenderStrategy;function Qe(e,t){var n,r;let{transition:l=!0,beforeEnter:s,afterEnter:u,beforeLeave:a,afterLeave:o,enter:p,enterFrom:f,enterTo:h,entered:g,leave:d,leaveFrom:c,leaveTo:v,...m}=e,[C,P]=i.useState(null),y=i.useRef(null),w=Ee(e),j=ge(...w?[y,t,P]:t===null?[]:[t]),te=(n=m.unmount)==null||n?T.Unmount:T.Hidden,{show:F,appear:ne,initial:re}=Ze(),[S,W]=i.useState(F?"visible":"hidden"),le=Ge(),{register:x,unregister:H}=le;O(()=>x(y),[x,y]),O(()=>{if(te===T.Hidden&&y.current){if(F&&S!=="visible"){W("visible");return}return D(S,{hidden:()=>H(y),visible:()=>x(y)})}},[S,y,x,H,F,te]);let Y=be();O(()=>{if(w&&Y&&S==="visible"&&y.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[y,S,Y,w]);let Se=re&&!ne,ie=ne&&F&&re,Z=i.useRef(!1),L=Ce(()=>{Z.current||(W("hidden"),H(y))},le),oe=$(G=>{Z.current=!0;let U=G?"enter":"leave";L.onStart(y,U,N=>{N==="enter"?s==null||s():N==="leave"&&(a==null||a())})}),se=$(G=>{let U=G?"enter":"leave";Z.current=!1,L.onStop(y,U,N=>{N==="enter"?u==null||u():N==="leave"&&(o==null||o())}),U==="leave"&&!B(L)&&(W("hidden"),H(y))});i.useEffect(()=>{w&&l||(oe(F),se(F))},[F,w,l]);let Te=(()=>!(!l||!w||!Y||Se))(),[,b]=qe(Te,C,F,{start:oe,end:se}),Oe=R({ref:j,className:((r=J(m.className,ie&&p,ie&&f,b.enter&&p,b.enter&&b.closed&&f,b.enter&&!b.closed&&h,b.leave&&d,b.leave&&!b.closed&&c,b.leave&&b.closed&&v,!b.transition&&F&&g))==null?void 0:r.trim())||void 0,...Ie(b)}),k=0;S==="visible"&&(k|=A.Open),S==="hidden"&&(k|=A.Closed),b.enter&&(k|=A.Opening),b.leave&&(k|=A.Closing);let je=me();return E.createElement(K.Provider,{value:L},E.createElement(Ke,{value:k},je({ourProps:Oe,theirProps:m,defaultTag:Fe,features:$e,visible:S==="visible",name:"Transition.Child"})))}function Xe(e,t){let{show:n,appear:r=!1,unmount:l=!0,...s}=e,u=i.useRef(null),a=Ee(e),o=ge(...a?[u,t]:t===null?[]:[t]);be();let p=ye();if(n===void 0&&p!==null&&(n=(p&A.Open)===A.Open),n===void 0)throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[f,h]=i.useState(n?"visible":"hidden"),g=Ce(()=>{n||h("hidden")}),[d,c]=i.useState(!0),v=i.useRef([n]);O(()=>{d!==!1&&v.current[v.current.length-1]!==n&&(v.current.push(n),c(!1))},[v,n]);let m=i.useMemo(()=>({show:n,appear:r,initial:d}),[n,r,d]);O(()=>{n?h("visible"):!B(g)&&u.current!==null&&h("hidden")},[n,g]);let C={unmount:l},P=$(()=>{var j;d&&c(!1),(j=e.beforeEnter)==null||j.call(e)}),y=$(()=>{var j;d&&c(!1),(j=e.beforeLeave)==null||j.call(e)}),w=me();return E.createElement(K.Provider,{value:g},E.createElement(z.Provider,{value:m},w({ourProps:{...C,as:i.Fragment,children:E.createElement(we,{ref:o,...C,...s,beforeEnter:P,beforeLeave:y})},theirProps:{},defaultTag:i.Fragment,features:$e,visible:f==="visible",name:"Transition"})))}function Je(e,t){let n=i.useContext(z)!==null,r=ye()!==null;return E.createElement(E.Fragment,null,!n&&r?E.createElement(_,{ref:t,...e}):E.createElement(we,{ref:t,...e}))}let _=ee(Xe),we=ee(Qe),_e=ee(Je),lt=Object.assign(_,{Child:_e,Root:_});export{_e as F,ee as K,me as L,pe as O,nt as T,q as a,de as b,ye as c,rt as d,We as f,A as i,be as l,O as n,$ as o,fe as p,I as s,ke as t,D as u,ge as y,lt as z};
