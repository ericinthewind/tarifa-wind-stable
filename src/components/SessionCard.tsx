import type { WindSession } from "../lib/types";

type Props = {
  session: WindSession;
};

export function SessionCard({ session }: Props) {
  return (
    <article className={`session-card ${session.quality.toLowerCase()}`}>
      <div className="session-top">
        <span className="pill">{session.emoji} {session.quality}</span>
        <span className="score">⭐ {session.score}</span>
      </div>
      <h3>{session.windArrow} {session.windLabel}</h3>
      <p className="time">{session.startTime}–{session.endTime} · {session.durationHours}h</p>
      <div className="session-grid">
        <span>💨 {session.avgWindKt} kt</span>
        <span>🌪️ {session.maxGustKt} kt</span>
        <span>🧭 {session.compass}</span>
        <span>🌊 {session.maxWaveM} m</span>
      </div>
    </article>
  );
}
