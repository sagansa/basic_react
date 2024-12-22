import{r as i,j as e,S as x,x as n}from"./app-b88091a6.js";import{A as h}from"./AuthenticatedLayout-59d1d766.js";import{T as m}from"./TextInput-68fa9e30.js";import{S as g}from"./SecondaryButton-aa43bef2.js";import"./ApplicationLogo-744c78cf.js";import"./transition-aeca4684.js";function k({auth:s,users:t}){const[a,d]=i.useState(""),l=r=>{d(r.target.value)},o=t.data.filter(r=>r.name.toLowerCase().includes(a.toLowerCase())||r.email.toLowerCase().includes(a.toLowerCase()));return e.jsxs(h,{user:s.user,header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200",children:"Users"}),children:[e.jsx(x,{title:"Users"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:e.jsx("div",{className:"overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:[e.jsx("div",{className:"flex items-center w-1/3 mb-6",children:e.jsx(m,{type:"text",name:"search",value:a,onChange:l,placeholder:"Search users...",className:"block w-full dark:bg-gray-900 dark:text-gray-100"})}),e.jsx("div",{className:"overflow-x-auto bg-white rounded shadow dark:bg-gray-800",children:e.jsxs("table",{className:"w-full whitespace-nowrap",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"font-bold text-left bg-gray-50 dark:bg-gray-700",children:[e.jsx("th",{className:"px-6 pt-5 pb-4 dark:text-gray-200",children:"Name"}),e.jsx("th",{className:"px-6 pt-5 pb-4 dark:text-gray-200",children:"Email"}),e.jsx("th",{className:"px-6 pt-5 pb-4 dark:text-gray-200",children:"Roles"}),e.jsx("th",{className:"px-6 pt-5 pb-4 dark:text-gray-200",children:"Created At"}),e.jsx("th",{className:"px-6 pt-5 pb-4 dark:text-gray-200",children:"Actions"})]})}),e.jsx("tbody",{children:o.map(r=>e.jsxs("tr",{className:"hover:bg-gray-50 focus-within:bg-gray-50 dark:hover:bg-gray-700 dark:focus-within:bg-gray-700",children:[e.jsx("td",{className:"px-6 py-4 border-t border-b border-gray-100 dark:border-gray-700",children:r.name}),e.jsx("td",{className:"px-6 py-4 border-t border-b border-gray-100 dark:border-gray-700",children:r.email}),e.jsx("td",{className:"px-6 py-4 border-t border-b border-gray-100 dark:border-gray-700",children:r.roles.map(c=>c.name).join(", ")}),e.jsx("td",{className:"px-6 py-4 border-t border-b border-gray-100 dark:border-gray-700",children:r.created_at}),e.jsx("td",{className:"px-6 py-4 border-t border-gray-200 dark:border-gray-700",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsx(n,{href:route("users.edit",r.id),children:e.jsx(g,{children:"Edit"})})})})]},r.id))})]})})]})})})})]})}export{k as default};
