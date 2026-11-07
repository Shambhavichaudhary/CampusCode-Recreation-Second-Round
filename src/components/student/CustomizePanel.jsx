import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon.jsx';
import { useStudentUI } from '../../context/StudentUIContext.jsx';
import { APPEARANCES, LAYOUT_STYLES, WIDGETS, widgetById } from '../../data/dashboardConfig.js';

export default function CustomizePanel() {
  const {
    panelOpen, closePanel, save, reset, draft, updateDraft, moveWidget, toggleHidden,
  } = useStudentUI();
  const [tab, setTab] = useState('layout');
  const [dragId, setDragId] = useState(null);
  const reduceMotion = useReducedMotion();
  const slide = reduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 0.61, 0.36, 1] };

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          <motion.button
            type="button"
            className="sd-drawer__scrim"
            aria-label="Close customize panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={slide}
            onClick={() => closePanel(false)}
          />
          <motion.aside
            className="sd-drawer"
            initial={reduceMotion ? false : { x: 28, opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { x: 28, opacity: 0 }}
            transition={slide}
            aria-label="Customize dashboard"
          >
            <header className="sd-drawer__head">
              <div>
                <h2>Customize Dashboard</h2>
                <p>Theme, layout and widgets apply immediately and stay saved to this account.</p>
              </div>
              <button type="button" className="sd-icon-plain" onClick={() => closePanel(false)} aria-label="Close">
                <Icon name="i-x" className="sd-icon-plain__svg" />
              </button>
            </header>

            <div className="sd-tabs" role="tablist">
              <button type="button" role="tab" aria-selected={tab === 'layout'} className={tab === 'layout' ? 'is-on' : ''} onClick={() => setTab('layout')}>Layout</button>
              <button type="button" role="tab" aria-selected={tab === 'appearance'} className={tab === 'appearance' ? 'is-on' : ''} onClick={() => setTab('appearance')}>Appearance</button>
            </div>

            {tab === 'layout' ? (
              <div className="sd-drawer__body">
                <h3>Manage sections</h3>
                <p className="sd-drawer__hint">Drag the handle to reorder. Toggle to show or hide.</p>
                <ul className="sd-widget-list">
                  {draft.order.map((id) => {
                    const widget = widgetById(id);
                    const on = !draft.hidden.includes(id);
                    return (
                      <li
                        key={id}
                        className={`sd-widget-row${dragId === id ? ' is-dragging' : ''}`}
                        draggable
                        onDragStart={() => setDragId(id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => moveWidget(dragId, id)}
                        onDragEnd={() => setDragId(null)}
                      >
                        <span className="sd-widget-row__grip" aria-hidden="true">
                          <Icon name="i-grip" className="sd-widget-row__grip-icon" />
                        </span>
                        <span>{widget?.label || id}</span>
                        <button
                          type="button"
                          className={`sd-switch${on ? ' is-on' : ''}`}
                          aria-pressed={on}
                          aria-label={`${on ? 'Hide' : 'Show'} ${widget?.label}`}
                          onClick={() => toggleHidden(id)}
                        />
                      </li>
                    );
                  })}
                </ul>

                <h3>Layout style</h3>
                <div className="sd-style-grid">
                  {LAYOUT_STYLES.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      className={`sd-style-card${draft.layoutStyle === style.id ? ' is-on' : ''}`}
                      onClick={() => updateDraft({ layoutStyle: style.id })}
                    >
                      <span className={`sd-style-card__preview sd-style-card__preview--${style.id}`} />
                      <strong>{style.label}</strong>
                      <small>{style.hint}</small>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="sd-drawer__body">
                <h3>Brand accents</h3>
                <p className="sd-drawer__hint">Only CampusCode colours — black, white, deep purple and arena green.</p>
                <div className="sd-appear-list">
                  {APPEARANCES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`sd-appear${draft.appearance === item.id ? ' is-on' : ''}`}
                      onClick={() => updateDraft({ appearance: item.id })}
                    >
                      <span className={`sd-appear__swatch sd-appear__swatch--${item.id}`} />
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.hint}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <footer className="sd-drawer__foot">
              <button type="button" className="sd-ghost-btn" onClick={reset}>Reset to Default</button>
              <button type="button" className="sd-ghost-btn" onClick={() => closePanel(true)}>Cancel</button>
              <button type="button" className="sd-solid-btn" onClick={save}>
                <Icon name="i-check" className="sd-solid-btn__icon" />
                Apply
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export { WIDGETS };
