import './App.scss'

const metrics = [
  { label: 'Active workspaces', value: '1,284', delta: '+6.3% vs last week' },
  { label: 'Monthly recurring', value: '$84.2k', delta: '+12.4% QoQ' },
  { label: 'Deployment success', value: '99.98%', delta: 'Zero rollbacks this week' },
]

const pillars = [
  {
    eyebrow: 'Collaboration',
    title: 'Shared views & AI assist',
    body: 'Guide customer teams with curated dashboards, saved prompts, and proactive AI responses.',
  },
  {
    eyebrow: 'Security',
    title: 'SAML & audit-ready logs',
    body: 'Enforce SSO, trace every admin action, and export weekly audit snapshots automatically.',
  },
  {
    eyebrow: 'Billing',
    title: 'Usage-based SaaS controls',
    body: 'Meter events, send renewal nudges, and ship promo upgrades without touching code.',
  },
]

const updates = [
  {
    title: 'SaaS tenancy hardened',
    meta: 'Isolated secrets per workspace and scoped tokens for integrations.',
  },
  {
    title: 'Real-time alerts',
    meta: 'Ops webhooks now support throttling, retry policies, and digest rollups.',
  },
  {
    title: 'Design refresh',
    meta: 'Surface-level navigation now matches the new brand system and dark theme.',
  },
]

function App() {
  return (
    <div className="app">
      <div className="app__frame">
        <header className="app__header">
          <div className="brand">
            <div className="brand__mark">Siwi</div>
            <div>
              <p className="brand__title">Siwi dashboard</p>
              <p className="brand__subtitle">Customer-ready SaaS workspace</p>
            </div>
          </div>
          <div className="app__badges">
            <span className="pill pill--success">Live</span>
            <span className="pill pill--accent">SaaS ready</span>
          </div>
        </header>

        <main className="layout">
          <section className="panel hero">
            <div>
              <p className="pill pill--accent">New multi-tenant release</p>
              <h1 className="hero__title">Ship the SaaS workspace your users expect.</h1>
              <p className="hero__lede">
                Bring the recent changes from GitHub live with guardrails: hardened multi-tenancy, usage
                metering, and on-call visibility baked in.
              </p>
              <div className="hero__actions">
                <button className="button button--primary">Review deployment</button>
                <button className="button">View change log</button>
              </div>
              <ul className="hero__list">
                <li>
                  <span>✓</span> Conflict-safe release path wired to GitHub and staging smoke tests.
                </li>
                <li>
                  <span>✓</span> Role-aware workspace switching for customer success and engineering.
                </li>
                <li>
                  <span>✓</span> Live billing checks to keep SaaS metering aligned with pricing.
                </li>
              </ul>
            </div>

            <div className="hero__stats">
              {metrics.map((metric) => (
                <article className="stat" key={metric.label}>
                  <p className="stat__label">{metric.label}</p>
                  <p className="stat__value">{metric.value}</p>
                  <p className="stat__delta">{metric.delta}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid">
            {pillars.map((pillar) => (
              <article className="card" key={pillar.title}>
                <p className="card__eyebrow">{pillar.eyebrow}</p>
                <h2 className="card__title">{pillar.title}</h2>
                <p className="card__body">{pillar.body}</p>
              </article>
            ))}
          </section>

          <section className="panel updates">
            <div className="updates__header">
              <h2 className="updates__title">Latest updates</h2>
              <span className="pill">GitHub sync enabled</span>
            </div>
            <ol className="timeline">
              {updates.map((item) => (
                <li className="timeline__item" key={item.title}>
                  <span className="timeline__badge" aria-hidden />
                  <p className="timeline__title">{item.title}</p>
                  <p className="timeline__meta">{item.meta}</p>
                </li>
              ))}
            </ol>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
