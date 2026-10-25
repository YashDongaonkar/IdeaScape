import { Link } from 'react-router'

const Home = () => {
  return (
    <main className="home-page">
      <nav className="home-nav">
        <Link to="/" className="home-brand">
          IdeaScape<span>.</span>
        </Link>

        <div className="home-nav-actions">
          <Link to="/login" className="home-login-link">
            Log in
          </Link>
          <Link to="/signup" className="home-signup-link">
            Get started
          </Link>
        </div>
      </nav>

      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">
            YOUR MIND, WITH ROOM TO WANDER
          </p>

          <h1>
            Big ideas start
            <br />
            with a little <span>space.</span>
          </h1>

          <p className="home-description">
            A thought in the shower. A project for someday.
            A spark you don't want to lose. Give every idea
            a place to land, grow, and become something real.
          </p>

          <div className="home-hero-actions">
            <Link to="/signup" className="home-primary-button">
              Start parking ideas <span aria-hidden="true">→</span>
            </Link>

            <Link to="/login" className="home-secondary-link">
              Already have an account?
            </Link>
          </div>
        </div>

        <div className="home-visual" aria-label="A preview of colorful idea notes">
          <div className="home-sticky-note home-note-yellow">
            <span className="home-note-label">SOMEDAY</span>
            <h2>Learn to make pasta from scratch</h2>
            <p>Fresh basil. Too much parmesan.</p>
          </div>

          <div className="home-sticky-note home-note-pink">
            <span className="home-note-label">A SPARK</span>
            <h2>A tiny bookstore with a reading nook</h2>
            <p>What if it had a resident cat?</p>
          </div>

          <div className="home-sticky-note home-note-blue">
            <span className="home-note-label">IN PROGRESS</span>
            <h2>Build something of my own</h2>
            <div className="home-fake-checklist">
              <span>✓ Collect ideas</span>
              <span>✓ Make a plan</span>
              <span>○ Take the first step</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <span>A landscape of possibilities.</span>
        <span>Made for the ideas that won't sit still.</span>
      </footer>
    </main>
  )
}

export default Home