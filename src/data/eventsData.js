// Long description of the ReBuild '26 hackathon (shown on the Events page).
const REBUILD_DESCRIPTION =
  "ReBuild '26 is an individual dashboard-recreation hackathon by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal, and every submission. Round 1 (Friday, 6 Nov, morning to 10 PM): Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM. Round 2 (Saturday, 7 Nov, top performers from Round 1 only): Build a complete new UI in CampusCode's vibe. Frontend only, mock data is fine. No presentation round. Prizes: Winner certificate + CampusCode internship with ₹15,000 stipend, runner-up certificate, and participation certificates for all. Sunday, 8 Nov (Diwali) is free. This is a paid event (₹50 on Unstop). Paid students receive an invite code — enter it when you join this event on the portal.";

/**
 * EVENTS - the three cards on the Events page.
 *   type    : "hackathon" | "quiz"   (used by the filter buttons)
 *   banner  : which banner design to draw
 *   status  : badge in the top-right of the id row ("LIVE" / "COMPLETED")
 *   circle  : letters in the round badge; dark = black badge instead of green
 *   kind    : small line under the title (only quizzes have it)
 *   facts   : three [label, value] pairs
 *   action  : "joined" -> "✓ Joined" box, "register" -> black "Register for quiz" button
 */
export const EVENTS = [
  {
    type: 'hackathon', banner: 'rebuild',
    id: 'e2798ce3-a1b5-4806-9147-4d9f10c52ef1', status: 'LIVE',
    circle: 'RE', title: "ReBuild '26", firstDesc: true,
    description: REBUILD_DESCRIPTION,
    facts: [['Mode', '—'], ['Team size', 'Individual'], ['Start', 'Nov 06, 2026']],
    action: 'joined',
  },
  {
    type: 'quiz', banner: 'quiz',
    id: '20864c76-4792-4b09-a2e9-ff6764bf20d6', status: 'COMPLETED',
    circle: 'FQ', title: "FirstCommit '26 Quiz Competition 2.0", kind: 'QUIZ · SOLO · TIMED',
    description: 'This is the reattempt quiz those who missed',
    facts: [['Mode', '—'], ['Format', 'Solo'], ['Start', '—']],
    action: 'register',
  },
  {
    type: 'quiz', banner: 'quiz',
    id: '80299fc1-3e30-466f-a146-fd45c77c84be', status: 'COMPLETED',
    circle: 'FQ', dark: true, title: "FirstCommit '26 Quiz Competition", kind: 'QUIZ · SOLO · TIMED',
    description: 'The quiz features 50 questions across technology, AI, and engineering — 42 multiple-choice questions and 8 true/false questions — to be completed in 30 minutes on Sunday, 1 November 2026. It is conducted online on the CampusCode platform, and every participant gets a single attempt.',
    facts: [['Mode', '—'], ['Format', 'Solo'], ['Start', '—']],
    action: 'joined',
  },
];

/** MY_EVENTS - the two cards on the My Events page. */
export const MY_EVENTS = [
  {
    banner: 'rebuild', registration: '779d5af0-34d2-445d-b84e-60b659999d35',
    circle: 'RE', title: "ReBuild '26", team: 'Bugsy', teamIsName: true,
  },
  {
    banner: 'quiz', registration: '1cab5eb1-b276-417f-b213-507f981f32d0',
    circle: 'FQ', dark: true, start: true, title: "FirstCommit '26 Quiz Competition", team: 'NOT ASSIGNED',
  },
];
