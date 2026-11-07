import { widgetById } from '../../data/dashboardConfig.js';
import { useStudentUI } from '../../context/StudentUIContext.jsx';
import { WIDGET_MAP } from './OverviewSections.jsx';
import Icon from './Icon.jsx';

export default function WidgetBoard() {
  const { prefs, visibleOrder, panelOpen, moveWidget } = useStudentUI();

  return (
    <div
      className={`sd-board sd-board--${prefs.layoutStyle}`}
      data-editing={panelOpen ? 'true' : 'false'}
    >
      {visibleOrder.map((id, index) => {
        const Widget = WIDGET_MAP[id];
        const meta = widgetById(id);
        if (!Widget) return null;
        return (
          <div
            key={id}
            className={`sd-board__cell sd-board__cell--${meta?.span || 'full'}`}
            style={{ '--sd-i': index }}
            draggable={panelOpen}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/widget', id);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              moveWidget(e.dataTransfer.getData('text/widget'), id);
            }}
          >
            {panelOpen && (
              <span className="sd-board__handle" aria-hidden="true">
                <Icon name="i-grip" className="sd-board__handle-icon" />
              </span>
            )}
            <Widget />
          </div>
        );
      })}
    </div>
  );
}
