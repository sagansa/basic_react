import{G as x,j as t,S as g}from"./app-b88091a6.js";import{A as h}from"./AuthenticatedLayout-59d1d766.js";import f from"./AdminForm-d8c7a6c0.js";import j from"./UserForm-f2e377c5.js";import"./ApplicationLogo-744c78cf.js";import"./transition-aeca4684.js";import"./InputError-58e8dce4.js";import"./InputLabel-3747f456.js";import"./PrimaryButton-a8cb749d.js";import"./TextInput-68fa9e30.js";import"./SelectInput-c737731a.js";import"./DangerButton-aea1cf9b.js";function D({auth:r,reward:e,subjects:m}){const{data:s,setData:o,put:n,processing:a,errors:i}=x({id:e.id,user:e.user,grades:e.grade,total_reward_amount:e.total_reward_amount,total_payment:e.total_payment||0,status:e.status||"unpaid"}),d=p=>{p.preventDefault(),n(route("rewards.update",e.id),{preserveScroll:!0,onSuccess:()=>{},onError:c=>{console.error("Update failed:",c)}})},l=r.user.roles.includes("admin")||r.user.roles.includes("super-admin"),u=()=>l?t.jsx(f,{data:s,setData:o,errors:i,processing:a,submit:d}):t.jsx(j,{data:s,setData:o,errors:i,processing:a,submit:d,subjects:m});return t.jsxs(h,{user:r.user,header:t.jsx("h2",{className:"text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200",children:"Edit Reward"}),children:[t.jsx(g,{title:"Edit Reward"}),t.jsx("div",{className:"py-12",children:t.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:t.jsx("div",{className:"overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg",children:t.jsx("div",{className:"p-6 text-gray-900 dark:text-gray-100",children:u()})})})})]})}export{D as default};