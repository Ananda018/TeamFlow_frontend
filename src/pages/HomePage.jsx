import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="welcome">
      <p className="eyebrow">Welcome to TeamFlow</p>
      <h1>
        A place for your team
        <br />
        to work together.
      </h1>
      <p className="intro">
        Your workspace is taking shape. Check the connection status to make sure
        everything is ready.
      </p>
      <Link className="button" to="/status">
        Check system status <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
