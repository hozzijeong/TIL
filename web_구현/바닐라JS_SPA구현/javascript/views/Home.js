export default function Home({ $app, initialState }) {
  // 페이지에 들어갈 state를 설정해 각각 페이지를 띄우는 함수
  this.state = initialState;
  this.$element = document.createElement('div');
  this.$element.className = 'Home';

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
