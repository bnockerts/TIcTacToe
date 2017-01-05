import Render from './HistoryRender.native.js';

export default function() {
  return Render.call(this, this.props, this.state);
}
