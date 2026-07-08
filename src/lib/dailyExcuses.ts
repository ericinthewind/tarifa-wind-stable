import { getHolidayExcuse } from "./holidayExcuses";

const DAILY_EXCUSES = [
  "Doctor's orders: 10,000 steps on the board, zero on Slack.",
  "Team offsite — location: Atlantic, dress code: wetsuit.",
  "Deep work block. Depth: 12 metres offshore.",
  "Client call rescheduled due to strategic wind alignment.",
  "Laptop battery at 4% — kite battery at 100%.",
  "Mandatory wellness session. HR approved. Wind mandated.",
  "Working remotely. Very remotely. From the water.",
  "Quarterly review with Levante — feedback: send it.",
  "Out of office: pursuing professional development on a twin-tip.",
  "Calendar conflict resolved — the wind won.",
  "Sprint planning moved to the beach. Velocity: 25 kt.",
  "Investor update: strong tailwinds, bullish on sessions.",
  "Compliance training — comply with the forecast.",
  "1:1 with the ocean. Action items: jump, land, repeat.",
  "Blocked for focus time. Focus: not drowning.",
  "VPN unstable — kite connection excellent.",
  "All-hands cancelled. Hands on the bar instead.",
  "Taxes can wait. Thermals cannot.",
  "Stand-up meeting replaced by strap-in meeting.",
  "Performance review: exceeds expectations at 18 kt.",
  "Parent-teacher conference — teacher is Poniente.",
  "Dentist appointment? Floss the lines instead.",
  "Grocery run postponed. Running downwind instead.",
  "Passive income meeting — actively sending it.",
  "Meditation retreat — guided by gusts.",
  "Networking event at Los Lances. Business cards optional.",
  "Budget review — ROI on sunscreen is infinite.",
  "Legal counsel advised: seize the wind window.",
  "Flight delayed. Perfect — more kite time.",
  "Dry January? Wet and windy is better.",
  "Monday motivation: the forecast is your OKR.",
  "Tuesday sync — sync with the wind instead.",
  "Wednesday hump day — jump instead.",
  "Thursday pre-weekend — pre-send it.",
  "Friday energy — redirect to the strap.",
  "Saturday plans: already on the calendar.",
  "Sunday scaries cured by side-onshore.",
];

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export function getDailyExcuse(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(`${dateInput}T12:00:00`) : dateInput;
  return DAILY_EXCUSES[dayOfYear(date) % DAILY_EXCUSES.length];
}

export function getKiteExcuse(dateInput: string | Date): string {
  return getHolidayExcuse(dateInput) ?? getDailyExcuse(dateInput);
}
