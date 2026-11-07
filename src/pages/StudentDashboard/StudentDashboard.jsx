import usePageStyles from '../../hooks/usePageStyles.js';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import studentCss from '../../styles/pages/student-dashboard.css?inline';
import WidgetBoard from '../../components/student/WidgetBoard.jsx';

export default function StudentDashboard() {
  useDocumentTitle('CampusCode — Student Overview');
  usePageStyles([studentCss]);

  return (
    <main className="content sd-content">
      <WidgetBoard />
    </main>
  );
}
