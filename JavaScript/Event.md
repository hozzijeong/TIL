# 이벤트

## 1. 이벤트 드리븐 프로그래밍

브라우저는 처리해야 할 특정 사건이 발생하면 이를 감지하여 이벤트를 발생시킵니다. 만약 애플리케이션이 특정 타입의 이벤트에 대해 함수를 호출하고 싶을 경우에 호출될 함수를 브라우저에 알려줍니다.

-   **이벤트 핸들러**: 특정 이벤트가 발생했을 때 전달되는 함수
-   **이벤트 핸들러 등록**: 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 행위

이처럼 이벤트와 그에 대응하는 함수(이벤트 핸들러)를 통해 사용자와 애플리케이션은 상호작용을 할 수 있습니다. 이와같이 프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 **이벤트 드리븐 프로그래밍**이라고 합니다.

## 2. 이벤트 타입

이벤트 타입은 이벤트 종류를 나타내는 문자열입니다. 아래 MDN 레퍼런스에서 이벤트 타입에 대한 설명을 자세히 볼 수 있습니다.

[이벤트 타입 By MDN](https://developer.mozilla.org/ko/docs/Web/Events#%ED%91%9C%EC%A4%80_%EC%9D%B4%EB%B2%A4%ED%8A%B8)

## 3. 이벤트 핸들러 등록

앞에서 언급했듯이 이벤트 핸들러는 이벤트가 발생했을때 실행되는 함수를 의미합니다. 그리고 이 함수를 이벤트가 발생하는 요소에 등록하는 방식에는 3가지가 존재합니다.

### 1. 이벤트 핸들러 어트리뷰트 방식

HTML 어트리뷰트 중에는 이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 있습니다. 즉, HTML 요소에 on접두사와 이벤트 타입을 통해 이벤트 핸들러를 할당하는 방식입니다.

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <button onclick="greet('Jeong')">클릭하세요</button>
    <script>
			function greet(name){
				console.log(`Hi, ${name}`
			}
		</script>
</body>
</html>
```

어트리뷰트 방식에서 주의할 점은 어트리뷰트 값으로 함수 참조가 아닌 함수 호출문 등의 문을 할당하는 것입니다. 하지만 여기서 단점이 함수 호출문을 할당한다면 해당 호출문의 결과가 이벤트 핸들러로 등록됩니다. 만약에 이벤트의 결과가 해당 함수의 결과라면 상관없지만, **함수가 아닌 값을 반환하는 함수 호출문을 핸들러로 등록한다면 이벤트 핸들러를 호출할 수 없습니다**.

위 예시에서는 함수 참조가 아닌 함수 호출문을 할당했습니다. 이때 **이벤트 핸들러 어트리뷰트 값은 사실 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미**합니다.

```jsx
function onclick(event) {
    greet("Jeong");
}
```

위와 같이 동작하는 이유는 **이벤트 핸들러에 인수를 전달하기 위해서** 입니다. 만약에 함수 참조를 할당하게 된다면 인수를 전달하기 곤란하게 됩니다.

결국 이벤트 핸들러 어트리뷰트 값으로 할당한 문자열은 암묵적으로 생성되는 이벤트 핸들러의 함수 몸체입니다. 따라서 **이벤트 핸들러 어트리뷰트 값으로 여러 개의 문을 할당**할 수 있습니다.

```jsx
<button onclick="greet('Jeong') console.log('Bello?')">클릭하세요</button>
```

하지만 이벤트 핸들러 어트리뷰트 방식은 사용하지 않는것이 좋습니다. HTML과 자바스크립트는 서로 관심사가 다르기 때문에 혼재하는 것보다 분리하는 것이 좋습니다. 하지만, React나 Vue 등의 CBD(Component Based Development)에서는 HTML과 자바스크립트를 한번에 묶어서 보기때문에 이벤트 핸들러 어트리뷰트 방식을 사용합니다.

### 2. 이벤트 핸들러 프로퍼티 방식

window 객체와 DOM 노드 객체는 이벤트에 대응하는 이벤트 핸들러 프로퍼티를 가지고 있습니다. 프로퍼티 키는 on 접두사 + 이벤트 타입으로 이루어져 있습니다.

```jsx
const $button = document.querySelector("button");
$button.onclick = function () {
    console.log("click");
};
/*
	$button : 이벤트 타깃
	onclick : 이벤트 타입
	function() : 이벤트 핸들러 (참조 할당 가능)
*/
```

이벤트 핸들러 프로퍼티 방식은 앞서 본 이벤트 핸들러 어트리뷰트 방식과 동일하다고 볼 수 있습니다. 두 방식 모두 한 개의 이벤트 핸들러만 바인딩 할 수 있다는 단점이 있지만, 프로퍼티 방식은 HTML과 자바스크립트가 섞에는 문제를 해결할 수 있습니다.

### 3. addEventListener 메서드 방식

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/32df58c9-9423-4046-ac98-cec744c22619/Untitled.png)

addEventListener 메서드 방식을 사용한 코드는 아래와 같습니다.

```jsx
const $button = document.querySelector("button");
$button.addEventListener("click", function () {
    console.log("click");
});
```

addEventListener 메서드 방식과 이벤트 핸들러 프로퍼티 방식은 서로 영향을 주지 않습니다. 즉 두 가지 방식으로 이벤트 핸들러를 등록한다면, 2개의 이벤트 핸들러가 모두 호출됩니다. 또한, addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있습니다. 이때 등록된 핸들러는 순서대로 호출됩니다.

```jsx
const $button = document.querySelector("button");
$button.addEventListener("click", function () {
    console.log("[1]button click");
});

$button.addEventListener("click", function () {
    console.log("[2]button click");
});
```

단, 등록된 이벤트 핸들러가 동일하다면 하나의 이벤트 핸들러만 등록됩니다.

## 4. 이벤트 핸들러 제거

addEventListener로 등록된 이벤트 핸들러를 제거하기 위해서는 removeEventListener 메서드를 사용해서 이벤트 핸들러를 제거할 수 있습니다. 제거하는 방식은 addEventListener에 전달했던 인수를 그대로 removeEventListener에 전달하는 것입니다. 만약에 **두 메서드에 전달된 인수가 같지 않다면 이벤트 핸들러가 제거되지 않습니다.**

또한, 두 메서드에 전달된 이벤트 핸들러는 동일한 함수여야 합니다. 즉, **무명함수를 이벤트 핸들러로 등록한 경우에는 제거할 수 없습니다.**

단, 기명 이벤트 핸들러 내부에서 removeEventListener 메서드를 호출하여 이벤트 핸드러를 제거하는 것은 가능합니다. 하지만 이 경우에는 해당 이벤트가 단 한번만 호출됩니다. 기명 함수가 아니라면 agruments.callee를 사용할 수 도 있습니다.

```jsx
const $button = document.querySelector("button");
$button.addEventListener("click", function foo() {
    console.log("[1]button click");
    $button.removeEventListener("click", foo);
});

$button.addEventListener("click", function () {
    console.log("[1]button click");
    $button.removeEventListener("click", arguments.callee);
});
```

하지만, arguments.callee는 코드 최적화를 방해하므로 strict mode 에서는 사용이 금지됩니다. 즉 그냥 변수나 자료구조에 저장해서 제거하는게 좋습니다.

addEventListener메서드를 사용하는 경우에는 removeEventListener를 사용하여 이벤트 핸들러를 제거하는 반면에, 프로퍼티 방식은 해당 이벤트 프로퍼티에 null을 할당하는 방식으로 이벤트 핸들러를 제거합니다.

## 5. 이벤트 객체

이벤트가 발생하면 이벤트에 관한 정보를 가지고 있는 객체가 동적으로 생성이 되고 이 객체는 이벤트 핸들러의 첫 번째 인수로 전달됩니다. 이를 **이벤트 객체**라고 합니다.

이벤트 객체를 전달받기 위해서는 매개변수를 명시적으로 선언해야 합니다. 변수 명은 이벤트 핸들러 어트리뷰트 방식을 제외하고는 상관 없습니다. **어트리뷰트 방식은** 앞에서도 언급했듯이 이벤트 핸들러 어트리뷰트 값은 암묵적으로 생성되는 이벤트 핸들러의 몸체이기 때문에 **변수를 event로 명시해야 합니다.** 만약에 event가 아니라 다른 값을 전달한다면 이벤트 객체를 사용할 수 없습니다.

### 1. 이벤트 객체의 상속구조

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc2f6a50-bcc6-4761-bccd-4ef2cd791e5d/Untitled.png)

이벤트 객체는 위와같은 상속 구조를 갖습니다. Event,UIEvent,MouseEvent는 모두 생성자 함수입니다. 이벤트가 발생하면 암묵적으로 생성되는 이벤트 객체도 생성자 함수에 의해 생성됩니다. 그리고 생성된 이벤트 객체는 생성자 함수와 더불어 생성되는 프로토타입으로 구성된 프로토타입 체인의 일원이 됩니다.

Event 인터페이스는 DOM 내에서 발생한 이벤트에 의해 생성되는 이벤트 객체를 나타냅니다. Event 인터페이스에는 모든 이벤트 객체의 공통 프로퍼티가 정의되어 있고, 하위 인터페이스에는 이벤트 타입에 따라 고유한 프로퍼티가 정의되어 있습니다. **(요소 노드와 같이 Node 자체에서 가지는 공통적인 프로퍼티가 있는 반면에 하위 노드들 input, button 등이 갖는 고유 프로퍼티가 있듯이, 이벤트 객체 역시 이와 마찬가지로 볼 수 있습니다)**

```jsx
const $button = document.querySelector("button");
const $text = document.querySelector("input[type=text]");
const $checkbox = document.querySelector("input[type=checkbox]");

window.onload = console.log;
$checkbox.onchange = console.log;
$text.onfocus = console.log;
$text.oninput = console.log;
$text.onkeyup = console.log;
$button.onclick = console.log;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/67facd13-fbbb-46cb-bf0d-8c3b167a0939/Untitled.png)

### 2. 이벤트 객체의 공통 프로퍼티

[이벤트 공통 프로퍼티 By MDN](https://developer.mozilla.org/ko/docs/Web/API/Event#%EC%86%8D%EC%84%B1)을 통해 확인할 수 있습니다.

## 6. 이벤트 전파

DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파됩니다. 이를 **이벤트 전파**라고 합니다.

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <ul id ='fruits'>
        <li id="apple">Apple</li>
        <li id="orange">Orange</li>
        <li id="grape">Grape</li>
    </ul>
    <script src="app.js"></script>
</body>
</html>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b00fadd8-2f2e-467a-83cf-69f708d91aff/Untitled.png)

ul의 자식 요소인 li를 클릭하면 클릭 이벤트가 발생합니다. 이때 생성된 이벤트 객체는 이벤트를 발생시킨 이벤트 타깃을 중심으로 DOM 트리를 통해 전파됩니다. 전파 단계는 3단계로 구분됩니다.

-   캡쳐링 단계 : 이벤트가 상위 요소에서 하위 요소 방향으로 전파
-   타겟 단계 : 이벤트가 이벤트 타깃에 도달
-   버블 단계 : 이벤트가 하위 요소에서 상위 요소 방향으로 전파

예를 들어 ul 요소에 이벤트 핸들러를 바인딩하고 자식 요소를 클릭해보면 아래와 같이 나옵니다.

```jsx
const $fruits = document.getElementById("fruits");

$fruits.addEventListener("click", function (e) {
    console.log(`이벤트 단계: ${e.eventPhase}`); // 3
    console.log(`이벤트 타깃: ${e.target}`); // object HTMLLIElement
    console.log(`Current 타깃: ${e.currentTarget}`); // object HTMLUListElement
});
```

li 요소를 클릭해서 클릭 이벤트 객체가 생성되고, li 요소가 이벤트 타겟이 됩니다. 이때 클릭 이벤트 객체는 window객체에서 부터 시작해서 li 요소 까지 전파되는데 이 과정이 캡처링 단계입니다. 그리고 이 이벤트 객체가 li 요소에 도달한 것이 타깃 단계, 다시 window 방향으로 전달되는 것이 버블 단계입니다.

이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트 핸들러는 캡쳐링 단계를 캐치할 수 없습니다. 하지만 addEventListener로 이벤트 핸들러를 등록했을 경우 3번째 인자에 true를 전달한다면 캡쳐링 단계의 이벤트를 선별적으로 캐치할 수 있습니다. 만약에 이벤트 타깃과 커런트 타깃이 같은 경우에 캡쳐링 단계의 경우 이벤트 타깃 단계에서 이벤트를 개치합니다. ( 두 번째 li에 이벤트 핸들러를 할당 후 두 번째 li를 클릭한 경우)

**이처럼 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있습니다.** 즉, DOM 트리를 통해 전파되는 이벤트는 이벤트 패스에 위치한 모든 DOM 요소에서 캐치할 수 있습니다. 대부분의 이벤트가 캡쳐링, 타깃, 버블링 단계를 지원하지만 버블링을 통해 전파되지 않는 이벤트가 있습니다.

-   포커스 이벤트 : focus/blur → focusin/focusout 으로 대체 가능
-   리소스 이벤트 : load/unload/abort/error
-   마우스 이벤트 : mouseenter/mouseleave → mouseover/mouseout 으로 대체 가능

## 7. 이벤트 위임

[다음 정리](https://github.com/hozzijeong/TIL/blob/master/JavaScript/Event_Bubble_Capture.md)를 통해 알수 있습니다.

```jsx
const $fruits = document.getElementById("fruits");
const $msg = document.querySelector(".msg");

function active({ target }) {
    [...$fruits.children].forEach(($fruit) => {
        $fruit.classList.toggle("active", $fruit === target);
        $msg.textContent = target.id;
    });
}

/**
 * toggle( String [, force] )
  하나의 인수만 있을 때: 클래스가 존재한다면 제거하고 false를 반환하며, 존재하지 않으면 클래스를 추가하고 true를 반환한다.
  두번째 인수가 있을 때: 두번째 인수가 true로 평가되면 지정한 클래스 값을 추가하고 false로 평가되면 제거한다.
 */

$fruits.addEventListener("click", active);
```

## 8. DOM 요소의 기본 동작 조작

### 1. DOM 요소의 기본 동작 중단

DOM 요소는 저마다 기본 동작이 있습니다. 예를 들어 a 요소를 클릭하면 href 어트리뷰트에 지정된 링크로 이동하고, checkbox 또는 radio 요소를 클릭하면 체크 또는 해제됩니다.

이벤트 객체의 preventDefault 메서드는 이러한 DOM 요소의 기본 동작을 중지시킵니다.

### 2. 이벤트 전파 방지

이벤트 객체의 stopPropagation 메서드는 이벤트 전파를 중지시킵니다.

```jsx
const $container = document.getElementById("container");
$container.addEventListener("click", function ({ target }) {
    if (!target.matches("#container > button")) return;
    target.style.color = "red";
});

document.querySelector(".btn2").addEventListener("click", function (e) {
    e.stopPropagation();
    e.target.style.color = "blue";
});
```

위 코드는 DOM 요소인 container 요소에 이벤트를 위임했습니다. 하지만 2번째 요소는 이벤트 전파를 막고 본연의 이벤트 핸들러를 전달했습니다. 이처럼 `stopPropagation` 메서드는 하위 DOM 요소의 이벤트를 개별적으로 처리하기 위해 이벤트 전파를 중단시킵니다.

## 9. 이벤트 핸들러 내부의 this

### 1. 이벤트 핸들러 어트리뷰트 방식

이벤트 핸들러 어트리뷰트 값으로 지정한 이벤트 핸들러는 일반 함수로 호출됩니다. 일반 함수로서 호출되는 함수 내부의 this는 전역객체를 가리킵니다. 따라서 handleClick 함수 내부의 this는 전역객체 window를 가리키게 됩니다. 단, 이벤트 핸들러를 호출할 때 인수로 전달한 this는 이벤트를 바인딩한 DOM 요소를 가리킵니다.

```jsx
<button onclick="clickHandler(this)"></button>
  <script>
      function clickHandler(btn){
          console.log(btn)
          console.log(this)
      }
  </script>
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/33d84771-df43-4280-b86c-9da0a43bdc8c/Untitled.png)

위 예제에서 clickHandler 함수에 전달한 this는 암묵적으로 생성된 이벤트 핸들러 내부의 this입니다. 즉, this는 이벤트를 바인딩한 DOM 요소를 가리킵니다. 이는 이벤트 핸들러 프로퍼티도 동일합니다.

### 2. 이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드 방식

이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드 방식의 이벤트 핸들러 내부의 this는 이벤트를 바인딩한 DOM 요소를 가리킵니다. 즉 내부의 this는 이벤트 객체의 currentTarget 프로퍼티와 동일합니다. 하지만 자체 this 바인딩을 하지 않는 화살표 함수로 이벤트 핸들러를 선언했을 경우 상위 스코프의 this를 가리킵니다.

```jsx
const $btn1 = document.querySelector(".btn1");
const $btn2 = document.querySelector(".btn2");

function clickHander(e) {
    console.log(this);
    console.log(e.currentTarget);
    console.log(this === e.currentTarget);

    ++this.textContent;
}

$btn1.addEventListener("click", clickHander);
$btn2.addEventListener("click", (e) => clickHander(e));
```

클래스에서 이벤트 핸들러를 바인딩하는 경우 this에 주의해야 합니다.

```jsx
class App {
    constructor() {
        this.$button = document.querySelector(".btn1");
        this.count = 0;

        this.$button.addEventListener("click", this.increase.bind(this));
    }

    increase() {
        console.log(this);
        this.$button.textContent = ++this.count;
    }

    increaseArrow = () => (this.$button.textContent = ++this.count);
}

new App();
```

앞에서 언급했듯이 이벤트 핸들러는 이벤트를 바인딩한 DOM 요소를 가리키기 때문에 button을 가리키게 됩니다. 따라서, 이벤트 핸들러 등록시 bind로 인스턴스를 전달하지 않는다면 에러가 발생합니다.

또는 클래스 필드에 할당한 화살표 함수를 이벤트 핸들러로 등록해 핸들러 내부의 this가 인스턴스를 가리키도록 할 수도 있습니다. 이때 **핸들러는 프로토타입 메서드가 아닌 인스턴스 메서드가 됩니다**.

## 10. 이벤트 핸들러에 인수 전달

함수에 인수를 전달하기 위해서는 함수를 호출할 때 전달해야 합니다. 핸들러 어트리뷰트 방식이 아닌 프로퍼티/addEventListener 메서드 방식은 핸들러를 브라우저가 호출하기 때문에 직접적으로 인수 전달이 되지 않습니다. 따라서

-   이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달
-   이벤트 핸들러를 반환하는 함수를 호출하면서 인수를 전달

위 2가지 방법으로 인수를 전달합니다.

```jsx
const MIN_USER_NAME_LENGTH = 5;
const $input = document.querySelector('input[type=text]');
const $msg = document.querySelector('.msg');
$input.addEventListener('change', function () {
  changeListener(MIN_USER_NAME_LENGTH);
});

const changeListener = (min) => {
  $msg.textContent =
    $input.value.length < min ? `이름은 ${min}자 이상으로 입력해주세요` : '';
};

--------------------------------------------------
const changeListener = (min) => (e) => {
    $msg.textContent =
      $input.value.length < min ? `이름은 ${min}자 이상으로 입력해주세요` : '';
  };
  $input.addEventListener('change', changeListener(MIN_USER_NAME_LENGTH));
```

화살표 함수는 결국에 함수를 반환합니다. 따라서 $input의 change에는 결국 changeListener함수가 반환하는 함수가 바인딩됩니다.

## 11. 커스텁 이벤트

### 1. 커스텀 이벤트 생성

이벤트 상속 구조에서 보았듯이 이벤트 객체는 다양한 이벤트 생성자 함수로 생성할 수 있습니다. 이벤트가 발생하면 암묵적으로 생성되는 이벤트 객체는 발생한 이벤트 종류에 따라 이벤트 타입이 결정되지만, 상위에 있는 생성자 함수들 (Event,UIEvent,MouseEvent) 같은 경우 임의의 이벤트 타입 지정이 가능합니다. 이처럼 생성된 이벤트를 **커스텀 이벤트**라고 합니다.

이벤트 생성자 함수의 첫 번째 인수로 이벤트 타입을 입력 받습니다. 이때 개발자가 원하는 이름의 이벤트 타입 지정이 가능합니다.

```jsx
const keyboardEvent = new KeyboardEvent("keyup");
console.log(keyboardEvent.type); //keyup

const customEvent = new CustomEvent("foo");
console.log(customEvent.type); //foo
console.log(customEvent.bubbles); // false
console.log(customEvent.cancelable); //false
console.log(customEvent);
```

생성된 커스텀 이벤트 객체는 버블링되지 않으며 preventDefeault 메서드로 취소할 수 없습니다. 즉 커스텀 이벤트 객체는 bubbles와 cancelable 프로퍼티 값이 false로 설정됩니다. 이때 해당 프로퍼티를 true로 설정하고 싶다면 두 번째 인수로 원하는 프로퍼티를 true로 갖는 객체를 전달함현 됩니다.

커스텀 이벤트는 이벤트 타입에 따라 가지는 이벤트 고유의 프로퍼티 값을 지정할 수 있습니다.

```jsx
// MouseEvent 생성자 함수로 click 이벤트 타입으 ㅣ커스텀 이벤트 객체 생성
const mouseEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    clientX: 50,
    clientY: 100,
    isTrusted: true,
});

console.log(mouseEvent.clientX, mouseEvent.clientY, mouseEvent.isTrusted); //50 100 false
```

이벤트 생성자 함수로 생성한 커스텀 이벤트는 isTrusted 프로퍼티가 언제나 false 입니다. 반대로 사용자 행위에 의해 발생한 이벤트 객체의 isTrusted 프로퍼티 값은 언제나 true 입니다.

### 2. 커스텀 이벤트 디스패치

생성된 커스텀 이벤트는 dispatchEvent 메서드로 디스패치 할 수 있습니다.

<aside>
💡 **디스패치**: 이벤트를 발생시키는 행위

</aside>

dispatchEvent 메서드에 이벤트 객체를 인수로 전달하면서 호출하면 인수로 전달한 이벤트 타입의 이벤트가 발생합니다.

일반적으로 이벤트 핸들러는 비동기처리 방식으로 동작하지만, dispatchEvent 메서드는 이벤트 핸들러를 동기 처리 방식으로 호출합니다. **다시 말해 dispatchEvent 메서드를 호출하면 커스텀 이벤트에 바인딩 된 이벤트 핸들러를 직접 호출하는 것과 같습니다.** 따라서 dispatchEvent 메서드로 이벤트를 디스패치 하기 전에 커스텀 이벤트를 처리할 이벤트 핸들러를 등록해야 합니다.

CustomEvent 생성자 함수를 사용하여 임의의 이벤트 타입을 지정/이벤트 객체를 생성하는 경우, 두 번째 인수로 이벤트와 함께 전달하고 싶은 정보를 담은 detail 프로퍼티를 포함하는 객체를 전달할 수 있습니다.

```jsx
const $btn = document.querySelector(".btn");
$btn.addEventListener("foo", (e) => {
    alert(e.detail.message);
});

const customEvent = new CustomEvent("foo", {
    detail: {
        message: "HELLO",
    },
});

$btn.dispatchEvent(customEvent);
```

임의의 이벤트 타입을 지정하여 커스텀 이벤트 객체를 생성한 경우 반드시 addEventListener 메서드 방식으로 이벤트 핸들러를 등록해야 합니다. 왜냐하면 해당 방식만이 기존에 존재하는 on+이벤트 타입 형식의 프로퍼티 형식으로 등록하지 않기 때문입니다.
