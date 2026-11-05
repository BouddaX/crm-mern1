function Header({ total }) {
  return <header className="topbar"><a className="brand" href="/" aria-label="Northstar CRM home"><span className="brand-mark">N</span><span>northstar<span className="brand-light"> / crm</span></span></a><div className="topbar-meta"><span className="live-dot"/> Workspace <span className="topbar-divider">/</span> Clients</div><div className="topbar-count"><strong>{total}</strong> {total===1?"contact":"contacts"}</div></header>;
}
export default Header;
