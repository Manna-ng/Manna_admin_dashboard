'use client';
import { Mail, Phone, UserRound } from 'lucide-react';
import { ScreenHeader, ScreenToolbar, StatCard, StatusPill, ExportButton } from './screen-ui';
import { useMemo, useState } from 'react';

const customers = [
  ['CUS-1001','Ada Okafor','ada.okafor@example.com','0803 456 7890','Yaba','8','₦184,500','Active','02 Sep 2026'],
  ['CUS-1002','Samuel Bello','samuel.bello@example.com','0806 221 0987','Maryland','3','₦72,000','Active','04 Sep 2026'],
  ['CUS-1003','Chioma Nwosu','chioma.nwosu@example.com','0812 440 3312','Ikeja','11','₦265,800','Active','06 Sep 2026'],
  ['CUS-1004','Daniel Adeyemi','daniel.adeyemi@example.com','0705 331 4402','Lekki','1','₦19,500','Active','12 Sep 2026'],
  ['CUS-1005','Mariam Yusuf','mariam.yusuf@example.com','0814 990 1201','Surulere','6','₦126,300','Active','15 Sep 2026'],
  ['CUS-1006','Tobi Williams','tobi.williams@example.com','0901 554 2288','Gbagada','0','₦0','Inactive','20 Sep 2026'],
  ['CUS-1007','Femi Balogun','femi.balogun@example.com','0802 778 1190','Ogijo','4','₦91,700','Active','21 Sep 2026'],
  ['CUS-1008','Grace Eze','grace.eze@example.com','0810 230 4418','Ajah','7','₦158,200','Active','25 Sep 2026'],
];
export function CustomersScreen() {
 const [q,setQ]=useState(''); const [filter,setFilter]=useState('All');
 const rows=useMemo(()=>customers.filter(c=>(filter==='All'||c[7]===filter)&&c.slice(0,7).join(' ').toLowerCase().includes(q.toLowerCase())),[q,filter]);
 return <div className="screen-page"><ScreenHeader title="Customers" description="Every customer account registered on Manna — the people purchasing from vendors." action={<ExportButton/>}/>
 <div className="screen-stats four"><StatCard label="Total customers" value="1,200" note="Registered accounts"/><StatCard label="Active customers" value="1,146" note="95.5% of accounts"/><StatCard label="Customers with orders" value="876" note="73% have purchased"/><StatCard label="New this month" value="120" note="September registrations"/></div>
 <section className="panel screen-panel"><ScreenToolbar search="Search name, email or customer ID..." onSearch={setQ} filter={filter} onFilter={setFilter}><ExportButton/></ScreenToolbar>
 <div className="screen-table-wrap"><table className="screen-table"><thead><tr><th>Customer</th><th>Contact</th><th>Location</th><th>Orders</th><th>Total spend</th><th>Status</th><th>Joined</th></tr></thead><tbody>{rows.map(c=><tr key={c[0]}><td><div className="person-cell"><span className="person-avatar"><UserRound size={15}/></span><div><strong>{c[1]}</strong><small>{c[0]}</small></div></div></td><td><div className="contact-stack"><span><Mail size={12}/>{c[2]}</span><span><Phone size={12}/>{c[3]}</span></div></td><td>{c[4]}</td><td>{c[5]}</td><td><strong>{c[6]}</strong></td><td><StatusPill status={c[7]}/></td><td className="muted">{c[8]}</td></tr>)}</tbody></table></div><div className="screen-table-footer">Showing {rows.length} of {customers.length} customers <span>Page 1 of 1</span></div></section></div>;
}
