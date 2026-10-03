import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="detail">
      <p className="msg">404 — there's nothing here.</p>
      <Link className="back" to="/">← Back to list</Link>
    </section>
  );
}
