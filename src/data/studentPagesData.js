export const GUIDE_SECTIONS = [
  {
    id: 'start',
    title: 'Getting started',
    body: 'Your student workspace is where CampusCode events, certificates and AI tools live. Start on Overview, then register for live events from Events. Joined records appear in My Events.',
  },
  {
    id: 'events',
    title: 'Events & registration',
    body: 'Open Events to browse the catalogue. Register from a card to generate a registration id and team label. Wishlist an event if you are not ready to join. Paid events may ask for an invite code on Unstop — enter it when you join on the portal.',
  },
  {
    id: 'ai',
    title: 'AI tools',
    body: 'HackMate AI helps you frame a team brief. IdeaCheck AI scores a concept against CampusCode constraints. RuleBot AI answers workspace rules from this guide. These tools run in the browser with mock analysis — they do not call an external model.',
  },
  {
    id: 'certs',
    title: 'Certificates & digital card',
    body: 'Completed events you joined can issue a participation certificate. Download or print from Certificates. Your Digital Card is a local identity strip for check-in — it uses the name on this account.',
  },
  {
    id: 'comms',
    title: 'Official communication',
    body: 'Announcements from CampusCode appear under Official Communication. Important notices stay pinned at the top. Notifications are a shorter activity feed for the same account.',
  },
];

export const OFFICIAL_NOTES = [
  {
    id: 'n1',
    important: true,
    title: 'ReBuild ’26 round schedule',
    date: '7 Nov 2026',
    body: 'Round 2 is for shortlisted Round 1 submissions only. Keep your team name identical across Unstop, the portal and every file you submit.',
  },
  {
    id: 'n2',
    important: true,
    title: 'Invite codes for paid events',
    date: '6 Nov 2026',
    body: 'Students who paid on Unstop receive an invite code. Enter it when you join the event on CampusCode so your seat is marked paid.',
  },
  {
    id: 'n3',
    important: false,
    title: 'Sunday 8 Nov is free',
    date: '5 Nov 2026',
    body: 'Diwali rest day. No submissions or office hours. The portal stays open for browsing.',
  },
  {
    id: 'n4',
    important: false,
    title: 'Certificate window',
    date: '4 Nov 2026',
    body: 'Participation certificates for completed quizzes appear on the Certificates page after the event is marked completed on your account.',
  },
];

export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'nf1',
    title: 'ReBuild ’26 is live',
    body: 'Round work can be submitted until 10 PM on the listed day.',
    time: 'Today',
    unread: true,
  },
  {
    id: 'nf2',
    title: 'Quiz result recorded',
    body: 'FirstCommit Quiz is marked completed on this account.',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 'nf3',
    title: 'Digital card ready',
    body: 'Your identity card is available under Digital Card.',
    time: 'This week',
    unread: false,
  },
];

export const HELP_TOPICS = [
  {
    q: 'How do I reset dashboard appearance?',
    a: 'Open Customize Dashboard from the sidebar. Choose Reset to Default, or Cancel to restore the snapshot from when you opened the panel.',
  },
  {
    q: 'Where are my joined events?',
    a: 'My Events lists every event this account registered for, with registration id and team name.',
  },
  {
    q: 'Do the AI tools send my data somewhere?',
    a: 'No. HackMate, IdeaCheck and RuleBot run locally in this demo and keep the last session in your browser only.',
  },
];

export const RULEBOT_ANSWERS = [
  {
    match: /team|group/,
    text: 'ReBuild ’26 is individual. You still pick a team name for tracking and must use the same name on Unstop, the portal and submissions.',
  },
  {
    match: /invite|paid|unstop|code/,
    text: 'Paid events (₹50 on Unstop) send an invite code. Enter that code when you join the event on CampusCode.',
  },
  {
    match: /round|rebuild|deadline/,
    text: 'Round 1: Friday 6 Nov, morning to 10 PM. Round 2: Saturday 7 Nov for shortlisted work only. Sunday 8 Nov is free.',
  },
  {
    match: /certificat/,
    text: 'Participation certificates are listed under Certificates for events this account has marked completed. Winner and internship awards are announced separately.',
  },
];
