export default function NotFound({ $app }) {
  this.$element = document.createElement('div');
  this.$element.className = 'NotFound';

  this.render = () => {
    this.$element.innerHTML = `<span>404 Not Found</span>`;
  };

  this.init = () => {
    while ($app.firstChild) $app.removeChild($app.firstChild);
    $app.appendChild(this.$element);

    this.render();
  };
}
