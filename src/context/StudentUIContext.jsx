import { createContext, useContext } from 'react';
import useDashboardPrefs from '../hooks/useDashboardPrefs.js';
import useEventStore from '../hooks/useEventStore.js';
import { getCurrentUser } from '../utils/auth.js';

const StudentUIContext = createContext(null);

export function StudentUIProvider({ children }) {
  const prefsApi = useDashboardPrefs();
  const eventsApi = useEventStore();
  const user = getCurrentUser();

  return (
    <StudentUIContext.Provider value={{ user, ...prefsApi, ...eventsApi }}>
      {children}
    </StudentUIContext.Provider>
  );
}

export function useStudentUI() {
  const value = useContext(StudentUIContext);
  if (!value) {
    throw new Error('useStudentUI must be used inside StudentUIProvider');
  }
  return value;
}
