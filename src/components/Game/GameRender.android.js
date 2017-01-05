import Render from './GameRender.native.js';

export default function() {
  return Render.call(this, this.props, this.state);
}
