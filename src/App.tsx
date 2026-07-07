import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Coffee, Github, Moon, Sailboat, Star, Sun, Waves, Wind } from "lucide-react";
import type { Forecast, WindSession } from "./lib/types";
import { formatGeneratedAt } from "./lib/date";
import { sampleForecast } from "./lib/sampleForecast";
import { SessionCard } from "./components/SessionCard";
import { StatCard } from "./components/StatCard";
import { WeeklyCalendar } from "./components/WeeklyCalendar";
import { WindChart } from "./components/WindChart";

export default function App() {
  const [forecast, setForecast] = useState<Forecast>(sampleForecast);
  const [usingSample, setUsingSample] = useState<boolean>(true);

  useEffect(() => {
    fetch("./forecast.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("forecast.json not generated yet");
        return res.json() as Promise<Forecast>;
      })
      .then((data) => {
        setForecast(data);
        setUsingSample(false);
      })
      .catch(() => {
        setForecast(sampleForecast);
        setUsingSample(true);
      });
  }, []);

  const sessions: WindSession[] = forecast.sessions || [];
  const bestScore: string | number = sessions.length ? Math.max(...sessions.map((s: WindSession) => s.score)) : "—";
  const windHours = sessions.reduce((sum: number, session: WindSession) => sum + session.durationHours, 0).toFixed(0);
  const nextRide = sessions[0]
    ? `${new Date(sessions[0].start).toLocaleDateString(undefined, { weekday: "short" })} ${sessions[0].startTime}`
    : "wait & work";
  const maxWave = sessions.length ? `${Math.max(...sessions.map((s: WindSession) => s.maxWaveM)).toFixed(1)} m` : "—";
  const topSessions = useMemo<WindSession[]>(() => sessions.slice(0, 6), [sessions]);

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="brand"><span>🌬️</span> Tarifa Wind</div>
          <div className="nav-actions">
            <a href="./tarifa-wind.ics"><CalendarDays size={16} /> iCal</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="badge"><Sailboat size={16} /> For nomads who negotiate with Levante</div>
            <h1>Wind first.<br />Meetings second.</h1>
            <p>
              The smart calendar that blocks Tarifa ride sessions before your calendar gets attacked by Zoom links.
              Check the wind, chase the good windows, then squeeze work into the calm bits like a responsible adult-ish person.
            </p>
            <div className="hero-buttons">
              <a className="primary" href="./tarifa-wind.ics"><CalendarDays size={18} /> Subscribe to calendar</a>
              <a className="secondary" href="./forecast.json"><Wind size={18} /> View data</a>
            </div>
            {usingSample && (
              <p className="notice">Showing sample data. Run the GitHub Action once to generate live forecast data.</p>
            )}
          </div>

          <div className="hero-card glass">
            <div className="weather-orb"><Wind size={54} /></div>
            <h2>{sessions[0] ? `${sessions[0].emoji} Next: ${sessions[0].windLabel}` : "Forecast loading"}</h2>
            <p>{sessions[0] ? `${sessions[0].startTime}–${sessions[0].endTime} · ${sessions[0].avgWindKt} kt · score ${sessions[0].score}` : "Run the workflow to generate forecast.json."}</p>
            <div className="micro">
              <span><Coffee size={16} /> meetings in gaps</span>
              <span><Waves size={16} /> waves checked</span>
              <span><Moon size={16} /> dark-mode friendly</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <StatCard icon={<Wind />} label="ride sessions" value={sessions.length} />
        <StatCard icon={<Star />} label="best score" value={bestScore} />
        <StatCard icon={<Sun />} label="wind hours" value={windHours} />
        <StatCard icon={<Waves />} label="max wave" value={maxWave} />
      </section>

      <WeeklyCalendar sessions={sessions} />

      <section className="cards-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Best sessions</p>
            <h2>The forecast says: maybe cancel politely</h2>
          </div>
          <div className="next-ride">Next ride: {nextRide}</div>
        </div>
        <div className="session-list">
          {topSessions.length ? topSessions.map((session: WindSession) => (
            <SessionCard key={session.id} session={session} />
          )) : (
            <div className="glass empty-card">No session found yet. Today’s official sport: coffee and emails. ☕</div>
          )}
        </div>
      </section>

      <WindChart sessions={sessions} />

      <footer>
        Updated {formatGeneratedAt(forecast.generatedAt)} · {forecast.spot} · Profile: {forecast.profile}
      </footer>
    </main>
  );
}
