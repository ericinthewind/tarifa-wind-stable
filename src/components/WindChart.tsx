import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { WindSession } from "../lib/types";

type Props = {
  sessions: WindSession[];
};

export function WindChart({ sessions }: Props) {
  const data = sessions.slice(0, 10).map((session) => ({
    label: `${new Date(session.start).toLocaleDateString(undefined, { weekday: "short" })} ${session.startTime}`,
    wind: session.avgWindKt,
    gust: session.maxGustKt,
  }));

  return (
    <section className="chart-shell glass">
      <div className="section-head">
        <div>
          <p className="eyebrow">Wind timeline</p>
          <h2>Ride windows, not inbox windows</h2>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="empty-card">No ride-worthy blocks yet. The laptop wins this round. 💻</div>
      ) : (
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="wind" name="Wind kt" radius={[10, 10, 0, 0]} />
              <Bar dataKey="gust" name="Gust kt" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
