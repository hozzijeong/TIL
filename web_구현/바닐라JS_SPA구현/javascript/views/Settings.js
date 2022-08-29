export default function Settings({ $app, initialState }) {
  this.state = initialState;
  this.$element = document.createElement('div');
  this.$element.className = 'Post';

  this.setState = (content) => {
    this.state = content;
    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `<span>Hello ${this.state}</span>`;
  };

  this.init = () => {
    while ($app.firstChild) $app.removeChild($app.firstChild);
    $app.appendChild(this.$element);

    this.render();
  };
}
