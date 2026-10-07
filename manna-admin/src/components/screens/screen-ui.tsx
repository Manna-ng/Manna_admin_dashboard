'use client';
import { Search, SlidersHorizontal, Download, Plus, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

export function ScreenHeader({ title, description, action, badge }: { title: string; description: string; action?: ReactNode; badge?: string }) {
  return <div className="screen-heading"><div><div className="screen-title-row"><h1>{title}</h1>{badge && <span className="demo-label">{badge}</span>}</div><p>{description}</p></div>{action}</div>;
}
export function ScreenToolbar({ search = 'Search...', filter = 'All', onSearch, onFilter, children }: { search?: string; filter?: string; onSearch?: (value: string) => void; onFilter?: (value: string) => void; children?: ReactNode }) {
  return <div className="screen-toolbar"><label className="screen-search"><Search size={17}/><input placeholder={search} onChange={e => onSearch?.(e.target.value)} /></label>{onFilter && <label className="screen-filter"><SlidersHorizontal size={15}/><select defaultValue={filter} onChange={e => onFilter(e.target.value)}><option>{filter}</option><option>All</option><option>Pending</option><option>Completed</option><option>Cancelled</option><option>Failed</option></select><ChevronDown size={13}/></label>}{children}</div>;
}
export function ActionButton({ children, secondary = false, onClick }: { children: ReactNode; secondary?: boolean; onClick?: () => void }) {
  return <button className={secondary ? 'screen-button secondary' : 'screen-button'} onClick={onClick}>{children}</button>;
}
export function ExportButton() { return <ActionButton secondary><Download size={15}/>Export</ActionButton>; }
export function AddButton({ label, onClick }: { label: string; onClick?: () => void }) { return <ActionButton onClick={onClick}><Plus size={15}/>{label}</ActionButton>; }
export function StatCard({ label, value, note }: { label: string; value: string; note: string }) { return <div className="screen-stat"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>; }
export function StatusPill({ status }: { status: string }) { return <span className={`screen-status ${status.toLowerCase().replaceAll(' ','-')}`}>{status}</span>; }
export function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) { return <tr><td colSpan={colSpan}><div className="table-empty">{text}</div></td></tr>; }
