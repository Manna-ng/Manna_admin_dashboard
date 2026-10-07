'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, Bike, ChevronDown, ClipboardList, CreditCard, LayoutDashboard, LifeBuoy, Menu, Moon, Package, Search, Settings, ShieldCheck, ShoppingBag, Store, Sun, TrendingUp, Truck, Users, X, CircleAlert, ChartNoAxesCombined, Wallet, RotateCcw, MessageSquareText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { categories, Detail, money, Period, previews, snapshots } from '@/lib/demo-data';
import { VendorsPage } from '@/components/vendors';
import { ComingSoon } from '@/components/screens/coming-soon';
import { CustomersScreen } from '@/components/screens/customers';
import { OrdersScreen } from '@/components/screens/orders';
import { DeliveriesScreen } from '@/components/screens/deliveries';
import { PayoutsScreen } from '@/components/screens/payouts';
import { DisputesScreen } from '@/components/screens/disputes';
import { ReportsScreen } from '@/components/screens/reports';
import { SettingsScreen } from '@/components/screens/settings';
import { HelpScreen } from '@/components/screens/help';
import { FeedbackScreen } from '@/components/screens/feedback';

const navigation: { label: Detail | 'Dashboard'; icon: LucideIcon }[] = [
  { label: 'Dashboard', icon: LayoutDashboard }, { label: 'Vendors', icon: Store },
  { label: 'Riders', icon: Bike }, { label: 'Products', icon: Package },
  { label: 'Orders', icon: ClipboardList }, { label: 'Deliveries', icon: Truck },
  { label: 'Payouts', icon: CreditCard }, { label: 'Disputes', icon: CircleAlert },
  { label: 'Feedback', icon: MessageSquareText }, { label: 'Customers', icon: Users }, { label: 'Reports', icon: ChartNoAxesCombined },
];

function Brand() {
  // Display the supplied logo directly from the wireframe, without redrawing it.
  return <span className="brand" role="img" aria-label="Manna"><img src="/wireframe.png" alt="" width="1440" height="1024" /></span>;
}

function Metric({ label, value, icon: Icon, note, onClick }: { label: string; value: string; icon: LucideIcon; note: string; onClick?: () => void }) {
  const contents = <><span className="metric-label"><Icon size={16} aria-hidden="true" />{label}</span><strong>{value}</strong><span className="metric-note">{note}</span></>;
  return onClick ? <button className="metric panel text-left" onClick={onClick}>{contents}</button> : <div className="metric panel">{contents}</div>;
}

function SalesChart({ sales: weights, total }: { sales: number[]; total: number }) {
  const sum = weights.reduce((acc, value) => acc + value, 0);
  const sales = weights.map(value => value / sum * total / 1000);
  const [point, setPoint] = useState<number | null>(null);
  const path = (ratio: number) => sales.map((y, i) => `${52 + i * 61},${235 - y * ratio / 1400 * 210}`).join(' ');
  return <div className="sales-chart">
    <svg viewBox="0 0 775 285" role="img" aria-label="Marketplace sales and Manna commission, in thousands of naira. Each point represents a period within the selected month.">
      {[0, 350, 700, 1050, 1400].map(value => <g key={value}><line x1="52" x2="723" y1={235-value/1400*210} y2={235-value/1400*210} className="gridline" /><text x="40" y={240-value/1400*210} textAnchor="end">{value.toLocaleString()}</text></g>)}
      {sales.map((_, i) => <g key={i}><line x1={52+i*61} x2={52+i*61} y1="25" y2="235" className="gridline" /><text x={52+i*61} y="263" textAnchor="middle">{i+1}</text></g>)}
      <polyline points={path(1)} fill="none" stroke="var(--green)" strokeWidth="2" />
      <polyline points={path(0.1)} fill="none" stroke="var(--teal)" strokeWidth="2" />
      {sales.map((value,i) => <g key={i}><circle cx={52+i*61} cy={235-value/1400*210} r="3.8" fill="var(--panel)" stroke="var(--green)" /><circle cx={52+i*61} cy={235-value*0.1/1400*210} r="3.8" fill="var(--panel)" stroke="var(--teal)" /></g>)}
    </svg>
    <div className="chart-point-controls" aria-label="Inspect chart values">{sales.map((value,i) => <button key={i} onMouseEnter={()=>setPoint(i)} onMouseLeave={()=>setPoint(null)} onFocus={()=>setPoint(i)} onBlur={()=>setPoint(null)} onClick={()=>setPoint(i)} aria-label={`Period ${i+1}: sales ${money(Math.round(value*1000))}, commission ${money(Math.round(value*100))}`} />)}</div>
    {point !== null && <div className="chart-tooltip" role="status"><strong>Period {point+1}</strong><span>Sales {money(Math.round(sales[point]*1000))}</span><span>Commission {money(Math.round(sales[point]*100))}</span></div>}
    <span className="chart-axis-label">Period within month · values in ₦ thousands</span>
  </div>;
}

function DetailDialog({ detail, onClose }: { detail: Detail; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = dialogRef.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  const rows = previews[detail];
  return <dialog ref={dialogRef} className="detail-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="dialog-heading"><div><span className="eyebrow">UI preview · sample records</span><h2 id="dialog-title">{detail}</h2></div><button className="icon-button" aria-label="Close preview" onClick={onClose}><X size={21} /></button></div>
    {rows ? <div className="preview-list">{rows.map(row => <article key={row.name}><div><h3>{row.name}</h3><p>{row.description}</p></div><span className={`status ${row.status.toLowerCase().replaceAll(' ','-')}`}>{row.status}</span></article>)}</div> : <p className="preview-message">{detail === 'Help' ? 'This first version uses sample data. Choose a reporting month, inspect the charts, or open the marketplace sections to review their sample records.' : detail === 'Settings' ? 'Service areas, commission rates, delivery pricing and admin permissions will be configured here in the next implementation phase.' : 'Detailed sales, commissions, vendor performance and delivery reports will be built here in the next implementation phase.'}</p>}
    <p className="dialog-note">Preview only. No live accounts, approvals, deliveries or payouts are changed.</p>
    <button className="primary-button" onClick={onClose}>Back to dashboard</button>
  </dialog>;
}

export function Dashboard() {
  const [period, setPeriod] = useState<Period>('This month');
  const [detail, setDetail] = useState<Detail | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [profile, setProfile] = useState(false);
  const [activePage, setActivePage] = useState<'Dashboard' | 'Vendors' | 'Riders' | 'Products' | 'Orders' | 'Deliveries' | 'Payouts' | 'Disputes' | 'Customers' | 'Feedback' | 'Reports' | 'Settings' | 'Help'>('Dashboard');
  const snapshot = snapshots[period];
  const searchItems = navigation.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
  const open = (label: Detail | 'Dashboard') => {
    setMobileMenu(false); setSearch(''); setProfile(false); setNotifications(false); setDetail(null);
    if (label === 'Vendor approvals' || label === 'Rider approvals' || label === 'Failed payouts') { setDetail(label); return; }
    setActivePage(label as typeof activePage);
  };
  return <div className={`app-shell ${dark ? 'dark' : ''}`}>
    <a href="#main" className="skip-link">Skip to dashboard</a>
    {mobileMenu && <button className="sidebar-backdrop" onClick={()=>setMobileMenu(false)} aria-label="Close navigation" />}
    <aside className={`sidebar ${mobileMenu ? 'is-open' : ''}`} aria-label="Main navigation">
      <div className="brand-row"><Brand /><button className="icon-button mobile-only" onClick={()=>setMobileMenu(false)} aria-label="Close navigation"><X size={20} /></button></div>
      <span className="sidebar-label">MENU</span>
      <nav>{navigation.map(({label, icon: Icon}) => <button key={label} className={`nav-item ${label === activePage ? 'selected' : ''}`} aria-current={label === activePage ? 'page' : undefined} onClick={()=>open(label)}><Icon size={18} aria-hidden="true" /><span>{label}</span></button>)}</nav>
      <div className="sidebar-tools"><span className="sidebar-label">TOOLS</span><button className="nav-item" onClick={()=>open('Help')}><LifeBuoy size={18} />Help</button><button className="nav-item" onClick={()=>open('Settings')}><Settings size={18} />Settings</button></div>
      <div className="sidebar-profile"><span className="avatar">SP</span><div><strong>Stephen Phillips</strong><span>ADMIN</span></div></div>
    </aside>

    <div className="workspace">
      <header className="topbar">
        <button className="icon-button mobile-only" onClick={()=>setMobileMenu(true)} aria-label="Open navigation"><Menu size={23} /></button>
        <div className="search-wrapper"><Search size={20} aria-hidden="true" /><input aria-label="Search dashboard sections" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=> {if(e.key==='Escape')setSearch(''); if(e.key==='Enter' && searchItems[0])open(searchItems[0].label);}} />{search && <div className="search-results">{searchItems.length ? searchItems.map(({label,icon:Icon}) => <button key={label} onClick={()=>open(label)}><Icon size={16}/>{label}</button>) : <p>No matching sections</p>}</div>}</div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={()=>setDark(!dark)} aria-label={dark?'Use light theme':'Use dark theme'} aria-pressed={dark}>{dark ? <Moon size={18}/> : <Sun size={18}/>}</button>
          <div className="popover-anchor"><button className="icon-button notification-button" aria-label="Notifications: 3 categories need review" aria-expanded={notifications} onClick={()=> {setNotifications(!notifications);setProfile(false);}}><Bell size={21}/><span className="notification-dot" /></button>{notifications && <div className="header-popover"><h3>Needs review</h3><button onClick={()=>open('Vendor approvals')}>2 vendor applications</button><button onClick={()=>open('Rider approvals')}>2 rider applications</button><button onClick={()=>open('Failed payouts')}>2 failed payouts</button></div>}</div>
          <span className="header-date">Sep 30, 2026</span>
          <div className="popover-anchor"><button className="profile-button" onClick={()=> {setProfile(!profile);setNotifications(false);}} aria-expanded={profile}><span className="avatar small">SP</span><span>Stephen Phillips</span><ChevronDown size={14}/></button>{profile && <div className="header-popover"><h3>Stephen Phillips</h3><p>Admin · UI preview</p><button onClick={()=>open('Settings')}>Admin settings</button></div>}</div>
        </div>
      </header>

      <main id="main">
        {activePage === 'Vendors' ? <VendorsPage /> : activePage === 'Riders' ? <ComingSoon type="Riders" /> : activePage === 'Products' ? <ComingSoon type="Products" /> : activePage === 'Customers' ? <CustomersScreen /> : activePage === 'Orders' ? <OrdersScreen /> : activePage === 'Deliveries' ? <DeliveriesScreen /> : activePage === 'Payouts' ? <PayoutsScreen /> : activePage === 'Disputes' ? <DisputesScreen /> : activePage === 'Feedback' ? <FeedbackScreen /> : activePage === 'Reports' ? <ReportsScreen /> : activePage === 'Settings' ? <SettingsScreen /> : activePage === 'Help' ? <HelpScreen /> : <>
        <div className="page-heading"><div><h1>Dashboard</h1><span className="demo-label">Sample data</span></div><label className="period-select"><span className="sr-only">Reporting period</span><select value={period} onChange={e=>setPeriod(e.target.value as Period)}><option>This month</option><option>Last month</option></select><ChevronDown size={16} aria-hidden="true" /></label></div>
        <section className="metrics-grid" aria-label="Marketplace summary">
          <Metric label="Total customers" value={snapshot.customers.toLocaleString()} icon={Users} note="Registered customer accounts" onClick={()=>open('Customers')}/>
          <Metric label="Total vendors" value={snapshot.vendors.toLocaleString()} icon={Store} note="Approved vendor accounts" onClick={()=>open('Vendors')}/>
          <Metric label="Completed orders" value={snapshot.orders.toLocaleString()} icon={ShoppingBag} note="Delivered in selected month" onClick={()=>open('Orders')}/>
          <Metric label="Marketplace sales (GMV)" value={money(snapshot.gmv)} icon={TrendingUp} note="Completed item sales, before commission"/>
          <Metric label="Manna earnings" value={money(snapshot.earnings)} icon={Wallet} note="Commission · before operating costs"/>
          <Metric label="Vendor payouts owed" value={money(snapshot.owed)} icon={CreditCard} note="Pending and held vendor balances" onClick={()=>open('Payouts')}/>
          <Metric label="Refunded orders" value={String(snapshot.refunds)} icon={RotateCcw} note="Refunds recorded in selected month" onClick={()=>open('Disputes')}/>
        </section>

        <section className="panel sales-panel" aria-labelledby="sales-title"><div className="panel-heading"><h2 id="sales-title">Marketplace Sales</h2><span className="secondary-text">{period === 'This month' ? 'September 2026' : 'August 2026'}</span></div><div className="sales-layout"><SalesChart sales={snapshot.sales} total={snapshot.gmv}/><div className="chart-legend"><span><i style={{background:'var(--green)'}}/>Marketplace sales</span><span><i style={{background:'var(--teal)'}}/>Manna commission</span><p>Completed item sales.<br/>Delivery fees excluded.</p></div></div></section>

        <div className="breakdown-grid">
          <section className="panel categories-panel" aria-labelledby="category-title"><h2 id="category-title">Sales by Category</h2><div className="category-layout"><ul className="category-list">{categories.map(category=><li key={category.name}><span><i style={{background:category.color}}/>{category.name}</span><strong>{category.share}%</strong></li>)}</ul><div className="donut" role="img" aria-label={categories.map(c=>`${c.name} ${c.share}%`).join(', ')}><div><strong>100%</strong><span>Item sales</span></div></div></div></section>
          <section className="panel states-panel" aria-labelledby="states-title"><h2 id="states-title">Sales by States</h2><div className="state-row"><span><i className="state-dot"/>Lagos</span><strong>100%</strong></div><div className="state-progress"><span /></div><p className="secondary-text">Of completed marketplace item sales</p>{['Ogun','Oyo','Abuja'].map(state=><div className="state-row muted" key={state}><span>{state}</span><span>—</span></div>)}<p className="state-note">No completed sales in this sample period.</p></section>
        </div>

        <section className="panel attention-panel" aria-labelledby="attention-title"><div className="panel-heading"><h2 id="attention-title">Needs Review</h2><span className="secondary-text">Applications & payment exceptions</span></div><div className="attention-grid">{([{title:'Vendor approvals',icon:Store,description:'Applications awaiting review'}, {title:'Rider approvals',icon:ShieldCheck,description:'Applications awaiting review'}, {title:'Failed payouts',icon:CircleAlert,description:'Automatic transfers need attention'}] as const).map(({title,icon:Icon,description})=><button key={title} className="attention-item" onClick={()=>open(title)}><span className={`attention-icon ${title==='Failed payouts'?'warning':''}`}><Icon size={21}/></span><span><strong>{title}</strong><small>{description}</small></span><b>2</b></button>)}</div></section>
        </>}
      </main>
      <footer>UI preview · Sample figures for design review</footer>
    </div>
    {detail && <DetailDialog detail={detail} onClose={()=>setDetail(null)}/>}
  </div>;
}
