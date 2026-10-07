'use client';
import { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, Flag, MessageSquareText, Send, Store, UserRound, X } from 'lucide-react';
import { ScreenHeader, ScreenToolbar, StatCard, StatusPill } from './screen-ui';

const feedback = [
  { id:'FDB-021', from:'Customer', name:'Ada Okafor', type:'Complaint', category:'Order issue', subject:'Missing item in MN-1041', channel:'In-app support', status:'Open', priority:'High', date:'1 Oct 2026', detail:'Customer says one 5kg bag of potatoes was missing from the delivered order and is requesting a refund for the missing item.', order:'MN-1041' },
  { id:'FDB-020', from:'Vendor', name:'Fresh Roots', type:'Suggestion', category:'Payouts', subject:'Show payout release time', channel:'Vendor portal', status:'Open', priority:'Normal', date:'30 Sep 2026', detail:'Vendor suggests showing the exact automatic payout release time for each completed order.', order:'—' },
  { id:'FDB-019', from:'Customer', name:'Samuel Bello', type:'Complaint', category:'Delivery', subject:'Delivery arrived later than expected', channel:'WhatsApp Business', status:'In progress', priority:'Normal', date:'29 Sep 2026', detail:'Customer reported a late delivery. Delivery record should be checked before deciding whether compensation is appropriate.', order:'MN-1038' },
  { id:'FDB-018', from:'Vendor', name:'Green Basket Foods', type:'Suggestion', category:'Products', subject:'Bulk pricing for frequent buyers', channel:'Vendor portal', status:'Resolved', priority:'Low', date:'28 Sep 2026', detail:'Vendor suggests allowing vendors to configure bulk pricing for selected products in a future release.', order:'—' },
  { id:'FDB-017', from:'Customer', name:'Chioma Nwosu', type:'Complaint', category:'Vendor quality', subject:'Tomatoes arrived damaged', channel:'Email', status:'Resolved', priority:'Normal', date:'27 Sep 2026', detail:'Customer reported damaged tomatoes and received a partial refund after the vendor responsibility was confirmed.', order:'MN-1027' },
];

export function FeedbackScreen(){
  const [q,setQ]=useState(''); const [f,setF]=useState('All'); const [selected,setSelected]=useState<typeof feedback[number]|null>(null);
  const rows=useMemo(()=>feedback.filter(x=>(f==='All'||x.status===f||x.type===f||x.from===f)&&Object.values(x).join(' ').toLowerCase().includes(q.toLowerCase())),[q,f]);
  return <div className="screen-page">
    <ScreenHeader title="Suggestions & complaints" description="Review feedback submitted by customers and vendors through approved Manna support channels." action={<button className="screen-button"><MessageSquareText size={15}/>Approved channels</button>}/>
    <div className="screen-stats four"><StatCard label="Open" value="2" note="Need admin attention"/><StatCard label="Complaints" value="3" note="Customer issues"/><StatCard label="Suggestions" value="2" note="Product and marketplace ideas"/><StatCard label="High priority" value="1" note="Requires prompt response"/></div>
    <section className="panel screen-panel">
      <ScreenToolbar search="Search feedback, person or order..." onSearch={setQ} filter={f} onFilter={setF}/>
      <div className="screen-table-wrap"><table className="screen-table"><thead><tr><th>Feedback</th><th>From</th><th>Type</th><th>Category</th><th>Channel</th><th>Priority</th><th>Status</th><th>Date</th><th/></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><strong>{x.subject}</strong><span className="table-subtext">{x.id}{x.order!=='—'?' · '+x.order:''}</span></td><td>{x.name}</td><td><span className={`feedback-type ${x.type.toLowerCase()}`}>{x.type}</span></td><td>{x.category}</td><td className="muted">{x.channel}</td><td><span className={`priority ${x.priority.toLowerCase()}`}>{x.priority}</span></td><td><StatusPill status={x.status}/></td><td className="muted">{x.date}</td><td><button className="row-action" onClick={()=>setSelected(x)}><Eye size={14}/>Review</button></td></tr>)}</tbody></table></div>
      <div className="feedback-note"><MessageSquareText size={15}/><span>Only feedback received through approved channels should enter this queue. Order-linked complaints can also affect payout eligibility.</span></div>
    </section>
    {selected&&<FeedbackDetail item={selected} onClose={()=>setSelected(null)}/>} 
  </div>
}

function FeedbackDetail({item,onClose}:{item:typeof feedback[number];onClose:()=>void}){
  const [done,setDone]=useState(false);
  return <div className="screen-overlay" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><aside className="screen-drawer" role="dialog" aria-modal="true">
    <div className="drawer-header"><div><span className="eyebrow">Feedback · {item.id}</span><h2>{item.subject}</h2></div><button className="icon-button" onClick={onClose}><X size={20}/></button></div>
    <div className="order-detail-status"><span className={`feedback-type ${item.type.toLowerCase()}`}>{item.type}</span><StatusPill status={done?'Resolved':item.status}/><span>{item.priority} priority</span></div>
    <div className="screen-drawer-section"><h3>Submitted by</h3><div className="drawer-person"><span className="person-avatar">{item.from==='Vendor'?<Store size={16}/>:<UserRound size={16}/>}</span><div><strong>{item.name}</strong><small>{item.from} · {item.channel} · {item.date}</small></div></div></div>
    <div className="screen-drawer-section"><h3>Feedback</h3><p className="drawer-copy">{item.detail}</p>{item.order!=='—'&&<div className="linked-record"><strong>Linked order</strong><span>{item.order}</span></div>}</div>
    <div className="screen-drawer-section"><h3>Admin response</h3><textarea className="feedback-response" placeholder="Write a response or internal note..."/><div className="feedback-response-hint"><Flag size={13}/> For complaints, document the finding before closing the case.</div></div>
    <div className="drawer-actions"><button className="secondary-action" onClick={onClose}>Close</button>{!done&&<><button className="secondary-action" onClick={()=>setDone(true)}><Send size={14}/>Respond</button><button className="primary-action" onClick={()=>setDone(true)}><CheckCircle2 size={14}/>Mark resolved</button></>}</div>
  </aside></div>
}
