## 이벤트 버블링과 캡쳐링 그리고 위임

## 이벤트 버블링

```jsx
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

위 코드는 다음과 같은 순서로 실행이 됩니다.

1. `<p>`에 할당된 `onclick` 핸들러가 동작합니다.
2. 바깥의 `<div>`에 할당된 핸들러가 동작합니다.
3. 그 바깥의 `<form>`에 할당된 핸들러가 동작합니다.
4. `document` 객체를 만날 때까지, 각 요소에 할당된 `onclick` 핸들러가 동작합니다.

위와 같은 흐름을 이벤트 버블링이라고 합니다. 마치 이벤트가 올라가는게 거품과 같다는 의미에서 붙여진 이름입니다.

<aside>
⏺️ `focus`와 같은 몇몇 이벤트를 제외하고 거의 모든 이벤트들은 버블링이 존재합니다.

</aside>

### event.target

부모 요소의 이벤트 핸들러는 이벤트가 정확하게 어디서 발생하는지 알 수 있습니다. 그리고 그 지점을 타겟 요소라고 부르고 event.target으로 접근이 가능합니다.

단, `event.target` 과 `this(event.currentTarget)`는 서로 의미하는 바가 다릅니다.

-   `event.target`은 실제 이벤트가 시작된 ‘타깃’ 요소입니다. 버블링이 진행되어도 변하지 않습니다.
-   `this`는 ‘현재’ 요소로, 현재 실행 중인 핸들러가 할당된 요소를 참조합니다.

만약에 위에 코드에서 `p`를 클릭했다면, `this`는 `form`이 되고, `event.target`은 `p`가 됩니다.

### 버블링 중단하기

이벤트 버블링은 타깃 이벤트에서 시작해서 `<html>` 요소를 거쳐 `document` 객체를 만날 때까지 각 노드에서 모두 발생합니다. 몇몇 이벤트는 `window` 객체까지 거슬러 올라가기도 합니다. 이 때도 모든 핸들러가 호출됩니다.

그런데 핸들러에게 이벤트를 완전히 처리하고 난 후 버블링을 중단하도록 명령할 수도 있습니다.

이벤트 객체의 메서드인 `event.stopPropagation()`를 사용하면 됩니다.

아래 예시에서 `<button>`을 클릭해도 `body.onclick`은 동작하지 않습니다.

```jsx
<body onclick="alert(`버블링은 여기까지 도달하지 못합니다.`)">
    <button onclick="event.stopPropagation()">클릭해 주세요.</button>
</body>
```

## 이벤트 캡쳐링

이벤트에는 버블링 뿐만 아니라 캡쳐링이라는 단계도 존재합니다. 이벤트의 프로세스는 아래 그림으로 설명할 수 있습니다.

![https://ko.javascript.info/article/bubbling-and-capturing/eventflow.svg](https://ko.javascript.info/article/bubbling-and-capturing/eventflow.svg)

1. 캡쳐링: 이벤트가 하위 요소로 전파되는 단계
2. 타겟팅: 이벤트가 실제 요소에 전달되는 단계
3. 버블링: 이벤트가 상위 요소로 전달되는 단계

위 단계를 통해서 이벤트 핸들러가 호출됩니다. 보통 캡쳐링을 관리하는 핸들러는 존재하지 않지만, `addEventListener(event,handler,{capture:true})` 를 추가할 때 와 같이 파라미터를 설정해 주면 됩니다.

```jsx
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`캡쳐링: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`버블링: ${elem.tagName}`));
  }
</script>
```

이 예시는 문서 내 요소 '전체’에 핸들러를 할당해서 어떤 핸들러가 동작하는지를 보여줍니다.

`<p>`를 클릭하면 다음과 같은 순서로 이벤트가 전달됩니다.

1. `HTML` → `BODY` → `FORM` → `DIV` (캡처링 단계, 첫 번째 리스너)
2. `P` (타깃 단계, 캡쳐링과 버블링 둘 다에 리스너를 설정했기 때문에 두 번 호출됩니다.)
3. `DIV` → `FORM` → `BODY` → `HTML` (버블링 단계, 두 번째 리스너)

`event.eventPhase` 프로퍼티를 이용하면 현재 발생 중인 이벤트 흐름의 단계를 알 수 있습니다. 반환되는 정숫값에 따라 이벤트 흐름의 현재 실행 단계를 구분할 수 있죠. 하지만 핸들러를 통해 흐름 단계를 알 수 있기 때문에 이 프로퍼티는 자주 사용되지 않습니다.

<aside>
⏺️ **핸들러를 제거할 때 `removeEventListener`가 같은 단계에 있어야 합니다.**
`addEventListener(..., true)`로 핸들러를 할당해 줬다면, 핸들러를 지울때, 
`removeEventListener(..., true)`를 사용해 지워야 합니다. 같은 단계에 있어야 핸들러가 지워집니다.

</aside>

<aside>
⏺️ **같은 요소와 같은 단계에 설정한 리스너는 설정한 순서대로 동작합니다.**
특정 요소에 `addEventListener`를 사용해 한 단계에 이벤트 핸들러를 여러개 설정했다면 이 핸들러들은 설정한 순서대로 동작합니다.

`elem.addEventListener("click", e => alert(1)); // 첫 번째로 트리거됩니다. elem.addEventListener("click", e => alert(2));`

</aside>

## 이벤트 위임

위에서 캡쳐링과 버블링의 개념에 대해 알았다면 이벤트 위임이 가능합니다.

한 개의 div 안에 유사한 기능을 수행하는 100개의 button 이 존재한다고 가정을 했을 때, 각 버튼마다 click 이벤트 리스너를 작성을 해야 합니다. 하지만 이러한 과정은 상당히 비효율 적이고 권장하는 방식이 아닙니다.

이러한 비효율 적인 방식을 해결하는 패턴이 이벤트 위임입니다. 공통의 조상에 이벤트 핸들러를 할당하고, 해당 핸들러에서 버블링이 일어날 때 해당 기능을 수행하도록 코드를 작성하는 것입니다.

아래는 이벤트 위임을 활용해서 버튼 기능을 구현한 코드입니다.

```jsx
<div id="menu">
  <button data-action="save">저장하기</button>
  <button data-action="load">불러오기</button>
  <button data-action="search">검색하기</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('저장하기');
    }

    load() {
      alert('불러오기');
    }

    search() {
      alert('검색하기');
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    };
  }

  new Menu(menu);
</script>
```

이벤트 위임은 다음과 같은 순서로 동작합니다.

1. 컨테이너에 하나의 핸들러를 할당합니다.
2. 핸들러의 `event.target`을 사용해 이벤트가 발생한 요소가 어디인지 알아냅니다.
3. 원하는 요소에서 이벤트가 발생했다고 확인되면 이벤트를 핸들링합니다.

이벤트 위임의 장점은 다음과 같습니다.

-   많은 핸들러를 할당하지 않아도 되기 때문에 초기화가 단순해지고 메모리가 절약됩니다.
-   요소를 추가하거나 제거할 때 해당 요소에 할당된 핸들러를 추가하거나 제거할 필요가 없기 때문에 코드가 짧아집니다.
-   `innerHTML`이나 유사한 기능을 하는 스크립트로 요소 덩어리를 더하거나 뺄 수 있기 때문에 DOM 수정이 쉬워집니다.

단점은 다음과 같습니다.

-   이벤트 위임을 사용하려면 이벤트가 반드시 버블링 되어야 합니다. 하지만 몇몇 이벤트는 버블링 되지 않습니다. 그리고 낮은 레벨에 할당한 핸들러엔 `event.stopPropagation()`를 쓸 수 없습니다.
-   컨테이너 수준에 할당된 핸들러가 응답할 필요가 있는 이벤트이든 아니든 상관없이 모든 하위 컨테이너에서 발생하는 이벤트에 응답해야 하므로 CPU 작업 부하가 늘어날 수 있습니다. 그런데 이런 부하는 무시할만한 수준이므로 실제로는 잘 고려하지 않습니다.

과제 1

```jsx
<!DOCTYPE HTML>
<html>

<head>
  <link rel="stylesheet" href="messages.css">
  <meta charset="utf-8">
</head>

<body>

  <div id="container">
    <div class="pane">
      <h3>Horse</h3>
      <p>The horse is one of two extant subspecies of Equus ferus. It is an odd-toed ungulate mammal belonging to the taxonomic family Equidae. The horse has evolved over the past 45 to 55 million years from a small multi-toed creature, Eohippus, into the large, single-toed animal of today.</p>
      <button class="remove-button">[x]</button>
    </div>
    <div class="pane">
      <h3>Donkey</h3>
      <p>The donkey or ass (Equus africanus asinus) is a domesticated member of the horse family, Equidae. The wild ancestor of the donkey is the African wild ass, E. africanus. The donkey has been used as a working animal for at least 5000 years.</p>
      <button class="remove-button">[x]</button>
    </div>
    <div class="pane">
      <h3>Cat</h3>
      <p>The domestic cat (Latin: Felis catus) is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines. Cats are often valued by humans for companionship and for their ability to hunt vermin.
      </p>
      <button class="remove-button">[x]</button>
    </div>
  </div>

  <script>
    document.addEventListener('click',function(e){
      if(e.target.className === "remove-button"){
	       const pane = e.target.closest('.pane')

				pane.remove()
      }
    })

  </script>

</body>
</html>
```

과제 2

```jsx
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>

  <ul class="tree" id="tree">
    <li>Animals
      <ul>
        <li>Mammals
          <ul>
            <li>Cows</li>
            <li>Donkeys</li>
            <li>Dogs</li>
            <li>Tigers</li>
          </ul>
        </li>
        <li>Other
          <ul>
            <li>Snakes</li>
            <li>Birds</li>
            <li>Lizards</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>Fishes
      <ul>
        <li>Aquarium
          <ul>
            <li>Guppy</li>
            <li>Angelfish</li>
          </ul>
        </li>
        <li>Sea
          <ul>
            <li>Sea trout</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
   <script>
    const tree = document.getElementById('tree')
    tree.addEventListener('click',function(e){
      if(e.target.children.length === 0) return

      const ul = e.target.children[0]

      ul.hidden = !ul.hidden
    })
   </script>
</body>
</html>
```

과제 3

```jsx
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <style>
    table {
       border-collapse: collapse;
     }
     th, td {
       border: 1px solid black;
       padding: 4px;
     }
     th {
       cursor: pointer;
     }
     th:hover {
       background: yellow;
     }
  </style>
</head>

<body>

  <table id="grid">
    <thead>
      <tr>
        <th data-type="number">Age</th>
        <th data-type="string">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>5</td>
        <td>John</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Pete</td>
      </tr>
      <tr>
        <td>12</td>
        <td>Ann</td>
      </tr>
      <tr>
        <td>9</td>
        <td>Eugene</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Ilya</td>
      </tr>
    </tbody>
  </table>

  <script>
    const grid = document.getElementById('grid')
    grid.addEventListener('click',function(e){
      const {type} = e.target.dataset
      const a = sorting(type,this.children[1])

      this.children[1] = removeNodeChild(this.children[1])
      a.forEach(x => this.children[1].append(x))

    })

    function sorting(type,ele){
      const a = Array.prototype.slice.call(ele.children)
      if(type === "string"){
        return a.sort((x,y) => {
          return  x.children[1].innerText > y.children[1].innerText ? 1 : -1
          })
      }else if(type ==="number"){
          return a.sort((x,y) => {
            return x.children[0].innerText - y.children[0].innerText})
      }
    }

    function removeNodeChild(ele){
      while(ele.firstChild) ele.removeChild(ele.firstChild)
      return ele
    }
  </script>

</body>
</html>
```

참고 자료:

[https://ko.javascript.info/event-delegation](https://ko.javascript.info/event-delegation)

[https://ko.javascript.info/bubbling-and-capturing](https://ko.javascript.info/bubbling-and-capturing)
