// Long description of the ReBuild '26 hackathon (shown on the Events page).
const REBUILD_DESCRIPTION =
  "ReBuild '26 is an individual dashboard-recreation hackathon by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal, and every submission. Round 1 (Friday, 6 Nov, morning to 10 PM): Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM. Round 2 (Saturday, 7 Nov, top performers from Round 1 only): Build a complete new UI in CampusCode's vibe. Frontend only, mock data is fine. No presentation round. Prizes: Winner certificate + CampusCode internship with ₹15,000 stipend, runner-up certificate, and participation certificates for all. Sunday, 8 Nov (Diwali) is free. This is a paid event (₹50 on Unstop). Paid students receive an invite code — enter it when you join this event on the portal.";

/**
 * EVENTS - catalogue for Events + Overview + My Events.
 * Original three records keep their ids, titles, descriptions and join state.
 * Extra mock events exist only so category filters have something to show.
 */
export const EVENTS = [
  {
    type: 'hackathon',
    category: 'Hackathon',
    banner: 'rebuild',
    id: 'e2798ce3-a1b5-4806-9147-4d9f10c52ef1',
    status: 'LIVE',
    timing: 'upcoming',
    circle: 'RE',
    title: "ReBuild '26",
    firstDesc: true,
    description: REBUILD_DESCRIPTION,
    short: 'Individual dashboard-recreation hackathon. Recreate the CampusCode user flow, then ship a new UI.',
    location: 'CampusCode Portal',
    date: 'Nov 06, 2026',
    dateIso: '2026-11-06',
    facts: [['Mode', '—'], ['Team size', 'Individual'], ['Start', 'Nov 06, 2026']],
    action: 'joined',
  },
  {
    type: 'quiz',
    category: 'Quiz',
    banner: 'quiz',
    id: '20864c76-4792-4b09-a2e9-ff6764bf20d6',
    status: 'COMPLETED',
    timing: 'past',
    circle: 'FQ',
    title: "FirstCommit '26 Quiz Competition 2.0",
    kind: 'QUIZ · SOLO · TIMED',
    description: 'This is the reattempt quiz those who missed',
    short: 'Reattempt quiz for anyone who missed the first FirstCommit sitting.',
    location: 'Online',
    date: '—',
    dateIso: null,
    facts: [['Mode', '—'], ['Format', 'Solo'], ['Start', '—']],
    action: 'register',
  },
  {
    type: 'quiz',
    category: 'Quiz',
    banner: 'quiz',
    id: '80299fc1-3e30-466f-a146-fd45c77c84be',
    status: 'COMPLETED',
    timing: 'past',
    circle: 'FQ',
    dark: true,
    title: "FirstCommit '26 Quiz Competition",
    kind: 'QUIZ · SOLO · TIMED',
    description: 'The quiz features 50 questions across technology, AI, and engineering — 42 multiple-choice questions and 8 true/false questions — to be completed in 30 minutes on Sunday, 1 November 2026. It is conducted online on the CampusCode platform, and every participant gets a single attempt.',
    short: '50 questions on tech, AI and engineering. One attempt, 30 minutes, online.',
    location: 'Online',
    date: 'Nov 01, 2026',
    dateIso: '2026-11-01',
    facts: [['Mode', '—'], ['Format', 'Solo'], ['Start', '—']],
    action: 'joined',
  },
  {
    type: 'workshop',
    category: 'Workshop',
    banner: 'workshop',
    id: 'cc-workshop-build-night',
    status: 'UPCOMING',
    timing: 'upcoming',
    circle: 'BN',
    title: 'CampusCode Build Night',
    description: 'A hands-on evening workshop for shipping a small product slice with CampusCode mentors. Bring a laptop. Certificates for attendees who finish the build checklist.',
    short: 'Hands-on evening workshop. Ship a small product slice with mentors.',
    location: 'GGSIPU',
    date: 'Nov 14, 2026',
    dateIso: '2026-11-14',
    facts: [['Mode', 'In person'], ['Format', 'Workshop'], ['Start', 'Nov 14, 2026']],
    action: 'register',
  },
  {
    type: 'meetup',
    category: 'Meetup',
    banner: 'meetup',
    id: 'cc-meetup-arena',
    status: 'UPCOMING',
    timing: 'upcoming',
    circle: 'AR',
    dark: true,
    title: 'Arena Orientation Meetup',
    description: 'Meet the CampusCode community, learn how hackathon rounds work, and pick up the Student Guide in person. Open to every registered student.',
    short: 'Community meetup covering arena rounds, teams and the student guide.',
    location: 'GGSIPU',
    date: 'Nov 18, 2026',
    dateIso: '2026-11-18',
    facts: [['Mode', 'In person'], ['Format', 'Meetup'], ['Start', 'Nov 18, 2026']],
    action: 'register',
  },
];

/** Original My Events rows — registration ids and team names must not change. */
export const MY_EVENT_SEED = [
  {
    eventId: 'e2798ce3-a1b5-4806-9147-4d9f10c52ef1',
    registration: '779d5af0-34d2-445d-b84e-60b659999d35',
    team: 'Bugsy',
    teamIsName: true,
  },
  {
    eventId: '80299fc1-3e30-466f-a146-fd45c77c84be',
    registration: '1cab5eb1-b276-417f-b213-507f981f32d0',
    team: 'NOT ASSIGNED',
    start: true,
  },
];

/** @deprecated kept so older imports still resolve; prefer MY_EVENT_SEED + EVENTS */
export const MY_EVENTS = MY_EVENT_SEED.map((row) => {
  const event = EVENTS.find((item) => item.id === row.eventId);
  return { ...event, ...row, banner: event.banner, circle: event.circle, title: event.title, dark: event.dark };
});
