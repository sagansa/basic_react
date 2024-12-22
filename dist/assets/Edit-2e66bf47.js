import{G as v,j as s,S as k}from"./app-b88091a6.js";import{A}from"./AuthenticatedLayout-59d1d766.js";import{I as o}from"./InputError-58e8dce4.js";import{I as x}from"./InputLabel-3747f456.js";import{P}from"./PrimaryButton-a8cb749d.js";import{T as C}from"./TextInput-68fa9e30.js";import{C as S}from"./Checkbox-19762a7c.js";import"./ApplicationLogo-744c78cf.js";import"./transition-aeca4684.js";function _({auth:u,role:n,permissions:i,rolePermissions:p}){const{data:l,setData:r,patch:h,processing:j,errors:d}=v({name:n.name,permissions:p}),g=i.reduce((e,t)=>{const[a,m]=t.name.split("_");return e[m]||(e[m]=[]),e[m].push(t),e},{}),f=e=>{e.preventDefault(),h(route("roles.update",n.id))},N=e=>{const t=l.permissions.includes(e)?l.permissions.filter(a=>a!==e):[...l.permissions,e];r("permissions",t)},c=e=>e?e.charAt(0).toUpperCase()+e.slice(1):"",b=e=>{const[t]=e.split("_");return c(t)},y=()=>{const e=i.map(a=>a.id);e.every(a=>l.permissions.includes(a))?r("permissions",[]):r("permissions",e)};return s.jsxs(A,{user:u.user,header:s.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200",children:"Edit Role"}),children:[s.jsx(k,{title:"Edit Role"}),s.jsx("div",{className:"py-12",children:s.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:s.jsx("div",{className:"overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg",children:s.jsx("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:s.jsxs("form",{onSubmit:f,children:[s.jsxs("div",{className:"mb-6",children:[s.jsx(x,{htmlFor:"name",value:"Name",className:"dark:text-gray-200"}),s.jsx(C,{id:"name",type:"text",name:"name",value:l.name,className:"block w-full mt-1 dark:bg-gray-900 dark:text-gray-100",onChange:e=>r("name",e.target.value)}),s.jsx(o,{message:d.name,className:"mt-2"})]}),s.jsxs("div",{className:"mb-6",children:[s.jsxs("div",{className:"flex items-center justify-between mb-4",children:[s.jsx(x,{value:"Permissions",className:"dark:text-gray-200"}),s.jsx("button",{type:"button",onClick:y,className:"text-sm text-blue-600 dark:text-blue-400 hover:underline",children:i.every(e=>l.permissions.includes(e.id))?"Unselect All":"Select All"})]}),Object.entries(g).map(([e,t])=>s.jsxs("div",{className:"mb-6",children:[s.jsx("h3",{className:"mb-3 text-lg font-medium text-gray-900 dark:text-gray-100",children:c(e)}),s.jsx("div",{className:"grid grid-cols-1 gap-4 pl-4 md:grid-cols-2 lg:grid-cols-4",children:t.map(a=>s.jsxs("label",{className:"flex items-center dark:text-gray-200",children:[s.jsx(S,{name:"permissions",value:a.id,checked:l.permissions.includes(a.id),onChange:()=>N(a.id)}),s.jsx("span",{className:"ml-2",children:b(a.name)})]},a.id))})]},e)),s.jsx(o,{message:d.permissions,className:"mt-2"})]}),s.jsx("div",{className:"flex items-center justify-end mt-4",children:s.jsx(P,{className:"ml-4",disabled:j,children:"Update Role"})})]})})})})})]})}export{_ as default};
