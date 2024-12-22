import{r as i,j as e,S as x,x as t}from"./app-b88091a6.js";import{A as n}from"./AuthenticatedLayout-59d1d766.js";import{P as o}from"./PrimaryButton-a8cb749d.js";import{S as h}from"./SecondaryButton-aa43bef2.js";import{T as m}from"./TextInput-68fa9e30.js";import"./ApplicationLogo-744c78cf.js";import"./transition-aeca4684.js";function N({auth:d,subjects:a}){const[s,l]=i.useState(""),c=r=>{l(r.target.value)};return a.filter(r=>r.name.toLowerCase().includes(s.toLowerCase())),e.jsxs(n,{user:d.user,header:e.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200",children:"Subjects"}),children:[e.jsx(x,{title:"Subjects"}),e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8",children:e.jsx("div",{className:"p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg",children:e.jsxs("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:[e.jsxs("div",{className:"flex justify-between mb-6",children:[e.jsx("div",{className:"flex items-center w-1/3",children:e.jsx(m,{type:"text",name:"search",value:s,onChange:c,placeholder:"Search subjects...",className:"block w-full dark:bg-gray-900 dark:text-gray-100"})}),e.jsx(t,{href:route("subjects.create"),children:e.jsxs(o,{children:[e.jsx("span",{className:"mr-2",children:"+"}),"Create Subject"]})})]}),e.jsx("div",{className:"overflow-x-auto bg-white rounded shadow dark:bg-gray-800",children:e.jsxs("table",{className:"w-full whitespace-nowrap",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"font-bold text-left bg-gray-50 dark:bg-gray-700",children:[e.jsx("th",{className:"px-6 pt-5 pb-4 dark:text-gray-200",children:"Name"}),e.jsx("th",{className:"px-6 pt-5 pb-4 dark:text-gray-200",children:"Actions"})]})}),e.jsx("tbody",{children:a.map(r=>e.jsxs("tr",{className:"hover:bg-gray-50 focus-within:bg-gray-50 dark:hover:bg-gray-700 dark:focus-within:bg-gray-700",children:[e.jsx("td",{className:"px-6 py-4 border-t border-gray-200 dark:border-gray-700",children:r.name}),e.jsx("td",{className:"px-6 py-4 border-t border-gray-200 dark:border-gray-700",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsx(t,{href:route("subjects.edit",r.id),children:e.jsx(h,{children:"Edit"})})})})]},r.id))})]})})]})})})})]})}export{N as default};
