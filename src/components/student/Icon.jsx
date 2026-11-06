/**
 * Icon - draws one icon from the hidden <SvgSprite />.
 *   <Icon name="i-bell" className="nav__icon" />
 * is the React version of:  <svg class="nav__icon"><use href="#i-bell"/></svg>
 */
export default function Icon({ name, className }) {
  return (
    <svg className={className}>
      <use href={`#${name}`} />
    </svg>
  );
}
