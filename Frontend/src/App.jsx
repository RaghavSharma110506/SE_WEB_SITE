import { useEffect, useMemo, useState } from "react";
import UploadBox from "./components/UploadBox";
import { authService } from "./services/authService";
import { uploadDeliverable } from "./services/uploadService";
import { isAllowedUploadFile } from "./services/uploadValidation";
import { versionService } from "./services/versionService";
import "./App.css";

const pathToView = { "/": "home", "/software-grid": "workspace", "/deliverables": "deliverables", "/team": "team", "/planning-v1": "planning-v1", "/planning-v2": "planning-v2", "/mid-sem": "midsem", "/later-work": "later", "/versions": "versions", "/admin/login": "admin-login", "/admin": "admin" };
const viewToPath = Object.fromEntries(Object.entries(pathToView).map(([path, view]) => [view, path]));

const people = [
  ["DG", "Disha Goyal", "Team lead"], ["RS", "Raghav Sharma", "Developer"], ["KS", "Kashish Singhal", "UX & research"], ["AN", "Anvi", "Documentation"],
];
const deliverables = [
  { id: "grid", type: "Workspace", title: "Software grid", description: "The tools and technologies supporting StepUp.", state: "Available" },
  { id: "plan", type: "Planning", title: "Planning V1", description: "Our first direction, goals and implementation outline.", state: "In review" },
  { id: "midsem", type: "Presentation", title: "Mid-sem update", description: "A snapshot of learning, progress and next steps.", state: "Coming soon" },
];
const technologies = [
  ["01", "Interface", "React", "Vite", "JavaScript", "CSS"], ["02", "Services", "API layer", "Authentication", "File uploads"], ["03", "Data", "MySQL", "Aiven", "SQL"], ["04", "Workflow", "GitHub", "VS Code", "Deployment"],
];

function App() {
  const [view, setView] = useState(() => pathToView[window.location.pathname] || "home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [period, setPeriod] = useState("Today");
  const [filter, setFilter] = useState("All");
  const [checkins, setCheckins] = useState(0);
  const [notice, setNotice] = useState("");
  const metrics = { Today: [8426, 84], Week: [51680, 89], Month: [184200, 76] };
  const [baseSteps, baseProgress] = metrics[period];
  const steps = baseSteps + checkins * 250;
  const progress = Math.min(100, Math.round(baseProgress + checkins * 2.5));
  const visibleDeliverables = useMemo(() => filter === "All" ? deliverables : deliverables.filter((item) => item.type === filter), [filter]);
  const navigate = (next) => { const path = viewToPath[next] || "/"; window.history.pushState({}, "", path); setView(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => { if (!notice) return undefined; const timer = setTimeout(() => setNotice(""), 2600); return () => clearTimeout(timer); }, [notice]);
  useEffect(() => { const onPopState = () => setView(pathToView[window.location.pathname] || "home"); window.addEventListener("popstate", onPopState); return () => window.removeEventListener("popstate", onPopState); }, []);

  return <div className="app-shell">
    <header className="site-header"><div className="site-nav">
      <button className="logo" onClick={() => navigate("home")} aria-label="StepUp home"><span>S</span><b>step<span>up</span></b></button>
      <nav className={menuOpen ? "nav-menu open" : "nav-menu"} aria-label="Main navigation">
        <button className={view === "home" ? "active" : ""} onClick={() => navigate("home")}>Home</button>
        <button className={view === "workspace" ? "active" : ""} onClick={() => navigate("workspace")}>Software Grid</button>
        <button className={view === "deliverables" ? "active" : ""} onClick={() => navigate("deliverables")}>Deliverables</button>
        <button className={view === "team" ? "active" : ""} onClick={() => navigate("team")}>Team</button>
        <button className={view === "versions" ? "active" : ""} onClick={() => navigate("versions")}>Versions</button>
        <button className="nav-status" onClick={() => navigate("admin-login")}><i /> Instructor area</button>
      </nav>
      <button className={menuOpen ? "menu-toggle open" : "menu-toggle"} onClick={() => setMenuOpen((open) => !open)} aria-label="Open menu" aria-expanded={menuOpen}><i /><i /></button>
    </div></header>

    {notice && <div className="toast" role="status">{notice}</div>}
    {view === "home" ? <HomeView
      period={period} setPeriod={(nextPeriod) => { setPeriod(nextPeriod); setCheckins(0); }} steps={steps} progress={progress} checkins={checkins}
      onCheckin={() => { setCheckins((count) => count + 1); setNotice("Walk added to today's rhythm."); }}
      onExplore={() => scrollTo("project")} onWorkspace={() => navigate("workspace")} onFilter={setFilter}
      filter={filter} deliverables={visibleDeliverables} onOpen={(item) => navigate(item.id === "grid" ? "workspace" : item.id === "plan" ? "planning-v1" : "midsem")}
    /> : view === "workspace" ? <WorkspaceView onBack={() => navigate("home")} /> : view === "team" ? <TeamView onBack={() => navigate("home")} /> : view === "deliverables" ? <DeliverablesView filter={filter} onFilter={setFilter} deliverables={visibleDeliverables} onBack={() => navigate("home")} onOpen={(item) => navigate(item.id === "grid" ? "workspace" : item.id === "plan" ? "planning-v1" : item.id === "planning-v2" ? "planning-v2" : item.id === "later" ? "later" : "midsem")} /> : view === "admin-login" ? <AdminLogin onBack={() => navigate("home")} onSuccess={() => navigate("admin")} /> : view === "admin" ? <><AdminView onBack={() => navigate("home")} onLogin={() => navigate("admin-login")} onPublished={(title) => setNotice(`${title} was published and added to the version history.`)} /><AccountSettings /></> : <DeliverableView view={view} onBack={() => navigate("home")} onNavigate={navigate} />}

    <footer className="site-footer"><div><button className="logo footer-logo" onClick={() => navigate("home")}><span>S</span><b>step<span>up</span></b></button><p>Building a kinder rhythm for everyday movement.</p></div><div className="footer-nav"><button onClick={() => navigate("workspace")}>Software Grid</button><button onClick={() => navigate("deliverables")}>Deliverables</button><button onClick={() => navigate("team")}>Team</button><button onClick={() => navigate("versions")}>Versions</button><button onClick={() => navigate("admin-login")}>Instructor</button></div><small>2026 StepUp team</small></footer>
  </div>;
}

function HomeView({ period, setPeriod, steps, progress, checkins, onCheckin, onExplore, onWorkspace, filter, onFilter, deliverables, onOpen }) {
  return <main>
    <section className="hero"><div className="hero-grid">
      <div className="hero-copy"><p className="kicker"><i /> Student project / in motion</p><h1>Every bit of<br /><em>movement matters.</em></h1><p className="lede">StepUp is a gentle activity companion that makes progress visible, manageable and worth returning to.</p><div className="hero-actions"><button className="button button-primary" onClick={onExplore}>Discover StepUp <span>&darr;</span></button><button className="button button-text" onClick={onWorkspace}>View workspace <span>&rarr;</span></button></div><div className="impact-row"><div><b>04</b><span>team members</span></div><div><b>01</b><span>shared purpose</span></div><div><b>100%</b><span>curiosity</span></div></div></div>
      <div className="activity-card"><div className="card-top"><div><span className="mini-kicker">YOUR RHYTHM</span><b>StepUp today</b></div><span className="live"><i /> LIVE</span></div><div className="period-switch">{Object.keys({ Today: 1, Week: 1, Month: 1 }).map((item) => <button key={item} className={period === item ? "selected" : ""} onClick={() => setPeriod(item)}>{item}</button>)}</div><div className="step-visual"><div className="ring" style={{ "--amount": `${progress * 3.6}deg` }}><div><strong>{steps.toLocaleString()}</strong><span>steps</span></div></div><div className="ring-label"><span>Daily goal</span><b>{progress}%</b><small>{Math.max(0, 10000 - steps).toLocaleString()} to go</small></div></div><div className="activity-track"><div><span>Movement</span><b>{progress}%</b></div><i><span style={{ width: `${progress}%` }} /></i></div><button className="checkin" onClick={onCheckin}>{checkins ? "Another mindful walk +250" : "Log a mindful walk +250"}<span>+</span></button></div>
    </div></section>

    <section id="project" className="content-section project"><div className="section-intro"><div><p className="kicker">01 / our idea</p><h2>A better relationship<br /><em>with movement.</em></h2></div><p>We are designing a space that values consistency over comparison, turning everyday activity into a calm and achievable practice.</p></div><div className="idea-grid"><article className="idea-main"><span>STEPUP / PURPOSE</span><div className="idea-symbol">&nearr;</div><h3>Progress can feel<br />personal, not pressured.</h3><p>Small actions add up. StepUp helps users see that momentum in a clear, encouraging way.</p><div><i>Activity</i><i>Wellbeing</i><i>Habits</i></div></article>{[["01", "Notice", "See activity as it happens, without the noise."], ["02", "Encourage", "Find an honest reason to come back tomorrow."], ["03", "Grow", "Build a rhythm that fits real life." ]].map(([n, title, text]) => <article className="idea-card" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p><b>&nearr;</b></article>)}</div></section>

    <section id="progress" className="progress-section"><div className="progress-layout"><div><p className="kicker">Project pulse</p><h2>Moving forward,<br /><em>with intention.</em></h2><p>From research to prototype, each milestone gives the team a little more clarity on what StepUp should become.</p></div><div className="milestones"><div className="milestone active"><span>01</span><div><b>Research</b><small>Understanding motivation and movement</small></div><i>Complete</i></div><div className="milestone active"><span>02</span><div><b>Experience design</b><small>Turning insights into a focused interface</small></div><i>In progress</i></div><div className="milestone"><span>03</span><div><b>Prototype</b><small>Testing the flow and refining details</small></div><i>Next</i></div></div></div></section>

    <section id="journal" className="content-section journal home-resource-preview"><div className="section-intro"><div><p className="kicker">02 / project journal</p><h2>Work that tells<br /><em>the whole story.</em></h2></div><p>Everything the team is learning, making and refining belongs in one easy-to-follow place.</p></div><div className="journal-toolbar"><p><strong>{deliverables.length}</strong> project resources</p><div>{["All", "Workspace", "Planning", "Presentation"].map((item) => <button key={item} onClick={() => onFilter(item)} className={filter === item ? "selected" : ""}>{item}</button>)}</div></div><div className="deliverable-list">{deliverables.map((item, index) => <article key={item.id}><span className="item-number">0{index + 1}</span><div><small>{item.type}</small><h3>{item.title}</h3><p>{item.description}</p></div><span className={`availability ${item.state === "Available" ? "available" : ""}`}><i />{item.state}</span><button onClick={() => onOpen(item)} aria-label={`Open ${item.title}`}>&rarr;</button></article>)}</div></section>

    <section id="team" className="team-section home-team-preview"><div className="team-heading"><p className="kicker">03 / the team</p><h2>Four perspectives.<br /><em>One steady pace.</em></h2></div><div className="people-grid">{people.map(([initials, name, role], index) => <article key={name}><div><span>0{index + 1}</span><i>&nearr;</i></div><b className="person-mark">{initials}</b><h3>{name}</h3><p>{role}</p></article>)}</div></section>
  </main>;
}

function WorkspaceView({ onBack }) {
  return <main className="workspace"><section className="workspace-hero"><button className="back-link" onClick={onBack}>&larr; Back to home</button><p className="kicker">PROJECT WORKSPACE / 01</p><h1>The tools behind<br /><em>StepUp.</em></h1><p>A tidy, shared view of the technology and workflow that turn our ideas into a usable product.</p></section><section className="tech-section"><div className="tech-summary"><span>04</span><p>Focused areas that give the project a strong foundation and a clear route from idea to release.</p></div><div className="tech-grid">{technologies.map(([number, title, ...items]) => <article key={title}><div><span>{number}</span><b>&nearr;</b></div><h2>{title}</h2><div className="pills">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section></main>;
}

function DeliverablesView({ filter, onFilter, deliverables, onBack, onOpen }) {
  return <main className="record-page"><section className="record-hero"><button className="back-link" onClick={onBack}>&larr; Back to home</button><p className="kicker">PROJECT LIBRARY</p><h1>Every piece of work,<br /><em>in its own place.</em></h1><p>Browse the project deliverables below. Each opens as a dedicated page and stays available as the project progresses.</p></section><section className="deliverables-page"><div className="journal-toolbar"><p><strong>{deliverables.length}</strong> resources shown</p><div>{["All", "Workspace", "Planning", "Presentation"].map((item) => <button key={item} onClick={() => onFilter(item)} className={filter === item ? "selected" : ""}>{item}</button>)}</div></div><div className="deliverable-list">{deliverables.map((item, index) => <article key={item.id}><span className="item-number">0{index + 1}</span><div><small>{item.type}</small><h3>{item.title}</h3><p>{item.description}</p></div><span className={`availability ${item.state === "Available" ? "available" : ""}`}><i />{item.state}</span><button onClick={() => onOpen(item)} aria-label={`Open ${item.title}`}>&rarr;</button></article>)}</div><div className="future-links"><button onClick={() => onOpen({ id: "planning-v2" })}>Planning V2</button><button onClick={() => onOpen({ id: "midsem" })}>Mid-sem presentation</button><button onClick={() => onOpen({ id: "later" })}>Later work</button></div></section></main>;
}

function TeamView({ onBack }) {
  return <main className="record-page"><section className="record-hero"><button className="back-link" onClick={onBack}>&larr; Back to home</button><p className="kicker">THE STEPUP TEAM</p><h1>People who make<br /><em>every step count.</em></h1><p>Four team members working across research, experience design, development and documentation.</p></section><section className="team-page"><div className="people-grid">{people.map(([initials, name, role], index) => <article key={name}><div><span>0{index + 1}</span><i>&nearr;</i></div><b className="person-mark">{initials}</b><h3>{name}</h3><p>{role}</p><small>StepUp project team</small></article>)}</div><article className="team-note"><span>HOW WE WORK</span><h2>Different roles, one shared responsibility.</h2><p>Each member contributes to the planning, review and evolution of StepUp, while keeping the project records clear and accessible.</p></article></section></main>;
}

function DeliverableView({ view, onBack, onNavigate }) {
  const [remoteVersions, setRemoteVersions] = useState([]);
  useEffect(() => { let active = true; versionService.list().then((items) => { if (active) setRemoteVersions(items); }).catch(() => {}); return () => { active = false; }; }, []);
  const pages = {
    "planning-v1": { eyebrow: "PLANNING / VERSION 1", title: "Planning V1", description: "The original project direction, including the problem, proposed experience and the work plan for StepUp.", status: "Published", version: "1.0", action: "View planning file" },
    "planning-v2": { eyebrow: "PLANNING / VERSION 2", title: "Planning V2", description: "A reserved space for future changes. This page will preserve the original planning version while making the updates easy to trace.", status: "Not published", version: "2.0", action: "Awaiting update" },
    midsem: { eyebrow: "DELIVERABLE / MID-SEM", title: "Mid-sem presentation", description: "A dedicated page for the team's mid-semester progress, presentation file and supporting details.", status: "Coming soon", version: "1.0", action: "Awaiting presentation" },
    later: { eyebrow: "DELIVERABLE / LATER WORK", title: "Later work", description: "Future submissions will be added as separate records without replacing any earlier project material.", status: "Reserved", version: "—", action: "No file yet" },
    versions: { eyebrow: "PROJECT HISTORY", title: "Every version stays visible.", description: "StepUp keeps an accessible record of what changed, when it changed and how each deliverable connects to the wider project.", status: "Version history", version: "01", action: "Open Planning V1" },
  };
  const page = pages[view] || pages["planning-v1"];
  return <main className="record-page"><section className="record-hero"><button className="back-link" onClick={onBack}>&larr; Back to home</button><p className="kicker">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.description}</p></section><section className="record-content"><article className="file-card"><div className="file-mark">{view === "midsem" ? "PPT" : view === "versions" ? "V1" : "DOC"}</div><div><small>{page.status}</small><h2>{view === "versions" ? "Planning V1" : page.title}</h2><p>{view === "versions" ? "Initial planning submission, retained as a permanent project record." : "The published file will appear here after the instructor uploads it through the protected admin workflow."}</p></div><button className="button button-primary" onClick={() => view === "versions" ? onNavigate("planning-v1") : undefined}>{page.action} <span>&rarr;</span></button></article><div className="record-meta"><div><span>VERSION</span><b>{page.version}</b></div><div><span>DATE</span><b>To be added</b></div><div><span>AUTHORS</span><b>StepUp Team</b></div><div><span>WHAT CHANGED</span><b>{view === "planning-v1" ? "Initial planning submission" : "To be added"}</b></div><div><span>RELATED COMMIT</span><b>To be linked</b></div><div><span>RELATED DEPLOYMENT</span><b>To be linked</b></div></div>{view === "versions" && <><article className="history-note"><span>VERSION RECORD</span><h2>Planning V1</h2><p>Initial planning submission. Future versions will be recorded here with their date, authors, change summary and deployment link.</p></article>{remoteVersions.length > 0 && <div className="remote-versions">{remoteVersions.map((item) => <article key={item.id}><b>{item.title} / {item.version}</b><span>{item.changeSummary}</span><small>{item.author}</small></article>)}</div>}</>}<div className="record-links"><button onClick={() => onNavigate("planning-v1")}>Planning V1</button><button onClick={() => onNavigate("planning-v2")}>Planning V2</button><button onClick={() => onNavigate("midsem")}>Mid-sem</button><button onClick={() => onNavigate("later")}>Later work</button></div></section></main>;
}

function AdminLogin({ onBack, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try { const session = await authService.login(email, password); authService.saveSession(session); onSuccess(); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  };
  return <main className="admin-page"><section className="record-hero"><button className="back-link" onClick={onBack}>&larr; Back to public site</button><p className="kicker">INSTRUCTOR / ADMIN</p><h1>Secure project publishing.</h1><p>Sign in with the email address and password for your existing StepUp account. Credentials are never stored in the frontend source.</p></section><form className="login-card" onSubmit={login}><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="username" /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"} <span>&rarr;</span></button></form></main>;
}

function AccountSettings() {
  const savedUser = authService.getUser();
  const [name, setName] = useState(savedUser?.name || "");
  const [email, setEmail] = useState(savedUser?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const save = async (event) => {
    event.preventDefault(); setMessage(""); setLoading(true);
    try {
      const session = await authService.updateAccount({ name, email, currentPassword, newPassword });
      authService.saveSession(session); setCurrentPassword(""); setNewPassword(""); setMessage("Account details updated.");
    } catch (requestError) { setMessage(requestError.message); }
    finally { setLoading(false); }
  };
  return <section className="account-settings"><div><p className="kicker">ACCOUNT SETTINGS</p><h2>Update your sign-in details.</h2><p>Use any valid email address. Confirm your current password before changing your email or password.</p></div><form className="login-card" onSubmit={save}><label>Name<input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label><label>Current password<input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" /></label><label>New password <small>(leave blank to keep current)</small><input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength="8" autoComplete="new-password" /></label>{message && <p className={message === "Account details updated." ? "publish-success" : "form-error"} role="status">{message}</p>}<button className="button button-primary" disabled={loading}>{loading ? "Saving..." : "Save account"} <span>&rarr;</span></button></form></section>;
}

function AdminView({ onBack, onLogin, onPublished }) {
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ title: "", type: "planning", version: "", date: "", authors: "Disha Goyal, Raghav Sharma, Kashish Singhal, Anvi", summary: "", changeSummary: "", commitUrl: "", deploymentUrl: "" });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("draft");
  const [message, setMessage] = useState("");
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const validate = () => {
    const next = {};
    ["title", "type", "version", "date", "authors", "summary", "changeSummary"].forEach((key) => { if (!form[key].trim()) next[key] = "Required"; });
    const validFiles = files.filter(isAllowedUploadFile);
    if (!validFiles.length) next.files = "Add at least one valid PPT, PDF or image file before publishing.";
    setErrors(next); return !Object.keys(next).length;
  };
  const publish = async (event) => {
    event.preventDefault();
    if (stage === "uploading" || stage === "published") return;
    if (!authService.getToken()) { setMessage("Your admin session is unavailable. Please sign in again."); onLogin(); return; }
    const isValid = validate();
    if (!isValid) { setMessage("Complete every required field and add at least one valid file before publishing."); return; }
    setStage("uploading"); setMessage(""); setProgress(0);
    try {
      const response = await uploadDeliverable({ ...form, authors: JSON.stringify(form.authors.split(",").map((name) => name.trim()).filter(Boolean)), files, status: "published" }, authService.getToken(), setProgress);
      setStage("published"); setMessage(response.message || "Deliverable published successfully."); onPublished(form.title);
    } catch (requestError) { setStage("draft"); setMessage(requestError.message); }
  };
  return <main className="admin-page"><section className="record-hero"><button className="back-link" onClick={onBack}>&larr; Back to public site</button><p className="kicker">INSTRUCTOR / ADMIN</p><h1>Publish project work.</h1><p>Upload the deliverable, enter its traceable metadata, preview the record and then publish it through the protected API.</p></section><form className="admin-grid" onSubmit={publish}><article className="upload-panel"><p className="kicker">01 / upload</p><h2>Choose deliverable files</h2><UploadBox files={files} onFilesChange={setFiles} disabled={stage === "uploading"} />{errors.files && <p className="form-error">{errors.files}</p>}{stage === "uploading" && <div className="upload-progress"><span>Uploading {progress}%</span><i><b style={{ width: `${progress}%` }} /></i></div>}</article><article className="metadata-panel"><p className="kicker">02 / metadata</p><h2>Version details</h2><label>Title<input value={form.title} onChange={(event) => update("title", event.target.value)} />{errors.title && <small>{errors.title}</small>}</label><div><label>Type<select value={form.type} onChange={(event) => update("type", event.target.value)}><option value="planning">Planning</option><option value="software-grid">Software Grid</option><option value="mid-sem">Mid-sem</option><option value="later-work">Later work</option></select></label><label>Version<input value={form.version} onChange={(event) => update("version", event.target.value)} placeholder="v1" />{errors.version && <small>{errors.version}</small>}</label></div><div><label>Date<input type="date" value={form.date} onChange={(event) => update("date", event.target.value)} />{errors.date && <small>{errors.date}</small>}</label><label>Authors<input value={form.authors} onChange={(event) => update("authors", event.target.value)} />{errors.authors && <small>{errors.authors}</small>}</label></div><label>Summary<textarea value={form.summary} onChange={(event) => update("summary", event.target.value)} />{errors.summary && <small>{errors.summary}</small>}</label><label>What changed<textarea value={form.changeSummary} onChange={(event) => update("changeSummary", event.target.value)} />{errors.changeSummary && <small>{errors.changeSummary}</small>}</label><div><label>Related commit<input type="url" value={form.commitUrl} onChange={(event) => update("commitUrl", event.target.value)} placeholder="https://..." /></label><label>Related deployment<input type="url" value={form.deploymentUrl} onChange={(event) => update("deploymentUrl", event.target.value)} placeholder="https://..." /></label></div></article><article className="publish-panel"><p className="kicker">03 / {stage}</p><h2>Draft &rarr; Preview &rarr; Publish</h2><p>Publishing only completes when the backend stores the deliverable and creates its version record. Existing versions are never overwritten.</p>{message && <p className={stage === "published" ? "publish-success" : "form-error"} role="status">{message}</p>}<button type="submit" className="button button-primary" disabled={stage === "uploading" || stage === "published"}>{stage === "published" ? "Published" : stage === "uploading" ? "Uploading..." : "Publish version"} <span>&rarr;</span></button></article></form></main>;
}

export default App;
