/**
 * Overview widget catalogue.
 * Order + visibility are student-customizable; ids must stay stable for localStorage.
 */
export const WIDGETS = [
  { id: 'welcome', label: 'Welcome Banner', span: 'full' },
  { id: 'featured', label: 'Featured Event', span: 'full' },
  { id: 'stats', label: 'Stats Overview', span: 'full' },
  { id: 'upcoming', label: 'Upcoming Events', span: 'half' },
  { id: 'tasks', label: 'My Tasks', span: 'half' },
  { id: 'progress', label: 'My Progress', span: 'half' },
  { id: 'calendar', label: 'Calendar', span: 'half' },
  { id: 'deadlines', label: 'Upcoming Deadlines', span: 'half' },
  { id: 'spotlight', label: 'AI Spotlight', span: 'half' },
  { id: 'activity', label: 'Current Activity', span: 'half' },
  { id: 'notifications', label: 'Notifications', span: 'half' },
];

export const LAYOUT_STYLES = [
  { id: 'default', label: 'Default', hint: 'Balanced cards and spacing' },
  { id: 'compact', label: 'Compact', hint: 'Tighter padding, denser grid' },
  { id: 'minimal', label: 'Minimal', hint: 'More air, quieter borders' },
];

export const APPEARANCES = [
  { id: 'balanced', label: 'Balanced', hint: 'Purple + green, CampusCode default' },
  { id: 'purple', label: 'Purple accent', hint: 'Deep purple for active states' },
  { id: 'green', label: 'Green accent', hint: 'Arena green for highlights' },
];

export const DEFAULT_PREFS = {
  order: WIDGETS.map((w) => w.id),
  hidden: [],
  layoutStyle: 'default',
  appearance: 'balanced',
};

export function widgetById(id) {
  return WIDGETS.find((w) => w.id === id);
}
