<img width="80%" src="https://user-images.githubusercontent.com/50974359/187170256-5c796bfb-5d57-49e7-9245-4b2af294f784.gif"/>

## SPA란?

Single Page Application. 줄여서 SPA라고 하는 개념은 웹 사이트의 전체 페이지를 하나의 페이지에 담아 동적으로 화면을 바꿔가며 표현하는 것입니다. 이벤트를 발생시키거나 url이 변경되었을 때 최초로 로드된 JS 파일에 의해 브라우저 템플릿만 교체되는 방식입니다.
위 영상에서처럼 브라우저 주소가 바뀔 때 새로고침이 되지 않고, 페이지만 교체가 되는데 이것을 SPA라고 합니다.

## Vanilla JS에서 SPA 라우팅?

SPA 라우팅을 하기 위해서는 DOM 객체를 사용합니다. 그중에서도 history api를 통해 SPA 라우팅을 구현할 수 있습니다.

```
history.pushState(e.target.dataset.link, null, e.target.href);

```

history.pushState를 사용하면 url을 변경할 수 있습니다. [MDN에 있는 설명](https://developer.mozilla.org/ko/docs/Web/API/History/pushState)을 보면 자세히 볼 수 있습니다.
해당 함수로 라우터를 구현하고, navBar에 있는 값에 따라 해당 값을 따라갈 수 있도록 설정할 수 있습니다.

## 폴더 구조

```tree
javascript
 ┣ utility
 ┃ ┣ navigate.js
 ┃ ┗ validation.js
 ┣ views
 ┃ ┣ App.js
 ┃ ┣ Home.js
 ┃ ┣ NotFound.js
 ┃ ┗ Settings.js
 ┗ index.js
```

## HTML 파일

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Single Page App</title>
  </head>
  <body>
    <nav class="nav">
      <a href="/" class="nav_item" data-link="Home">Home</a>
      <a href="/settings" class="nav_item" data-link="Setting">Settings</a>
    </nav>
    <div id="root"></div>
    <script type="module" src="./src/javascript/index.js"></script>
  </body>
</html>
```

navbar만 설정하고 root div에 컴포넌트들을 추가하는 기능을 구현하겠습니다.
파일의 렌더링 순서는 다음과 같습니다.
html load -> index.js 파일 실행 -> app.js 파일 실행 (route에 맞춰 파일 변경)
App.js 파일에서 모든 router 파일과 render가 실행됩니다.

## Router 구현하기

```javascript
// App.js
...
const routes = [
    { path: '/', view: homePage, title: 'Home' },
    { path: '/settings', view: settings, title: 'Settings' },
  ];

this.render = () => {
  const results = routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
      };
    });

  let match = results.find((route) => route.result !== null);

  };

...
```

router로 사용할 path들을 담은 배열 routes를 선언한 뒤, render가 실행될 때마다 현재 위치의 pathname과 일치하는 객체를 배열로 저장했습니다.

1. 현재 경로와 일치하지 않는다면 match === null 이 되고 그렇지 않으면 match 되는 regExp 결과를 반환하게 됩니다.
2. route와 result가 저장된 배열에서 result가 null이 아닌 객체를 검색합니다.

## 이벤트 구현하기

제일 처음 DOM이 Load 되고 난 다음에 다음 이벤트들을 add해줍니다.

```javascript
window.addEventListener("popstate", () => {
  this.render();
});

window.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      const BASE_URL = "http://127.0.0.1:5500";
      const targetURL = e.target.href.replace(BASE_URL, "");
      navigate(targetURL, e.target.dataset.link);
    }
  });

  this.render();
});
window.addEventListener("historychange", ({ detail }) => {
  const { to, isReplace, state } = detail;
  if (isReplace || to === location.pathname)
    history.replaceState(state, "", to);
  else history.pushState(state, "", to);

  this.render();
});
```

navBar에 있는 attrs를 사용하여 target에 접근한 뒤 (이벤트 버블링) navigate 함수를 실행해 줍니다.
historychange라는 customEvent를 생성해서, history가 변경될 때마다 (navigate 함수가 실행될 때마다) history.pushState가 아닌 replace를 통해 중복되는 stack을 방지해 줍니다.
그리고 뒤로 가기 클릭 시, [popState를](https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event) 통해 뒤로 가기 클릭 시 변화되는 페이지가 렌더링 될 수 있도록 합니다.

## View 설정

View는 일단 페이지 렌더링 될 수 있게끔 설정만 해두었습니다. View의 구조는 다음과 같습니다.

```javascript
//Home.js

export default function Home({ $app, initialState }) {
  // 페이지에 들어갈 state를 설정해 각각 페이지를 띄우는 함수
  this.state = initialState;
  this.$element = document.createElement("div");
  this.$element.className = "Home";

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
```

인자로 부모 컴포넌트와 초깃값을 넘겨받습니다. 그리고 현재 페이지에서 렌더링 할 element를 선언한 뒤, render 시 변경될 template를 변화시킵니다. 값이 변화될 때는 state에 변화되는 값을 할당하고 다시 render 시킵니다.
init의 경우, 현재 사용되고 있는 부모 컴포넌트를 초기화 시킨 뒤 render를 실행합니다.

## 렌더링

```javascript
//App.js
this.render = () =>{
...
    let match = results.find((route) => route.result !== null);

   if (!match) notFound.init();
   else match.route.view.init();
}
```

이전에 router에서 find를 통해 match된 값 중에 조건에 일치하는 값에 대해 다음과 같은 동작을 실행합니다.

1. match를 찾을 수 없다면 notFound를 실행합니다.
2. matach를 찾을 수 있다면 해당 객체의 view에 해당하는 컴포넌트를 실행합니다.

## 고민한 점

서버 포트는 live server를 사용했습니다. 그 때문인지 모르겠지만, 직접 url을 입력했을 경우 파일을 읽어 올 수 없어서 404 Not Found 페이지를 띄우지는 못했습니다. live server의 문제인가 싶어서 여러 가지 설정을 변경해 봤지만, 원하는 답을 얻지는 못했습니다.
404 not Found가 나타나는 것 자체가 존재하지 않는 url이라는 것인데, link를 통해 들어갔을 때는 해당 url이 잘 적용되지만, 그렇지 않은 경우에는 아예 실행이 되지 않습니다.
url을 직접 검색을 했을 때는, '/'에서 파생되어서 렌더링 되는 것이 아니라 '/sfafsadf'의 파일을 불러오기 때문에 애초에 redirect가 되지 않아서 어느 파일에서 접근을 해야 할지 혼란이 왔습니다.
해당 이슈에 대해서는 차후에 한번 해결해야 할 것 같습니다.

---

참조
https://nukw0n-dev.tistory.com/34
https://www.youtube.com/watch?v=6BozpmSjk-Y&t=1009s
