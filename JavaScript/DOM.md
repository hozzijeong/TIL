# DOM

브라우저 렌더링 과정에서 생성된 DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API. 즉, 프로퍼티와 메서드를 제공하는 트리 자료구조 입니다.

## 1. 노드

1. HTML요소와 노드 객체

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e5b648f9-e8e5-458d-bf5b-22b365f52040/Untitled.png)

    HTML 요소는 문서를 구성하는 개별적인 요소를 의미합니다. HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 노드 객체로 변환이 되고, HTML요소의 어트리뷰트는 어트리뷰트 노드로 HTML요소의 텍스트 콘텐츠는 텍스트 노드로 변환됩니다.

    HTML 문서는 HTML 요소들의 집합으로 이루어지며 HTML 요소는 중첩관계를 갖습니다. 이때 HTML 요소 간에는 중첩 관계에 의해 계층적인 부자 관계가 형성이 됩니다. 이러한 HTML 요소간의 부자관계를 반영해서 HTML 요소를 객체화한 노드 객체들을 트리 자료구조로 구성합니다. 그리고 **노드 객체들로 구성된 트리 자료구조를 DOM이라고 합니다**.

2. 노드 객체의 타입

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <link rel="stylesheet" href="style.css" />
            <title>Document</title>
        </head>
        <body>
            <ul>
                <li id="apple">Apple</li>
                <li id="banana">Banana</li>
                <li id="orange">Orange</li>
            </ul>
            <script src="app.js"></script>
        </body>
    </html>
    ```

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/64a680bc-d62a-4876-973f-03c0f28ff623/Untitled.png)

    위 코드에 그려진 DOM을 트리로 나타내면 다음과 같이 표현할 수 있습니다. 위에서 보이는 것 처럼 노드는 총 12개의 노드 타입이 있는데 중요한 4가지만 먼저 다뤄보려고 합니다.

    - 문서노드
        DOM 최상위에 존재하는 루트노드로써 document 객체를 가리킵니다. document객체는 전역 객체 window의 document 프로퍼티에 바인딩되어 있습니다. 따라서 문서노드는 document 혹은 window.document로 참조할 수 있습니다. 또한 HTML 문서당 document 객체는 유일합니다. 즉, 문서노드는 루트 노드이고 DOM 트리의 시작점이라고 할 수 있습니다.
    - 요소노드
        HTML 요소를 가리키는 객체로 HTML 요소간의 중첩에 의해 부자관계를 가지고 이를 구조화합니다.
    - 어트리뷰트노드
        HTML 요소의 어트리뷰트를 가리키는 객체로 어트리뷰트 노드는 어트리뷰트가 지정된 HTML 요소의 요소 노드와 연결되어 있습니다. 어트리뷰트 노드는 요소 노드의 부모 노드와 연결되어 있지 않고 요소 노도와 연결되어 있습니다. 따라서 어트리뷰트 노드에 접근하기 위해서는 요소노드의 접근이 우선되어야 합니다.
    - 텍스트노드
        HTML 요소의 텍스트를 가리키는 객체로 요소 노드가 문서의 구조를 표현한다면 텍스트 노드는 문서의 정보를 표현한다고 할 수 있습니다. 요소 노드의 자식 노드이며 자식이 없는 리프 노드 입니다. 즉 DOM의 최종단 입니다.

    1. 노드 객체의 상속구조

        DOM을 구성하는 노드 객체는 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 호스트 객체 입니다. 하지만 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖습니다. 노드 객체의 상속 구조는 다음과 같습니다.

        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/30f17a4b-b645-450e-b204-e72b09d07e2b/Untitled.png)

        위 그림에서 볼 수 있듯이 노드 객체는 Object, EventTarget, Node 객체를 무조건 상속받고 노드 객체의 특성에 따라 상속받는 Element가 각각 다릅니다. (**이는 후에 TypeScript에서 Event 타입 혹은 이벤트를 받는 객체 타입을 설정할때 사용이 됩니다.)**

        요소노드는 Element를 상속받고, HMTLElement 태그와 종류별로 세분화된 인터페이스를 상속받습니다. 이를 프로토타입 관점에서 바라보았을 때 input 요소를 파싱한 객체는 다음과 같이 나타날 수 있습니다.

        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f0caf53f-e0d7-4296-b88e-93594372a5c3/Untitled.png)

        배열이 객체인 동시에 배열인 것처럼 input 요소 노드 객체도 다음과 같은 특성을 갖는 객체이며 다양한 기능들을 상속을 통해 제공받습니다.

        | input 요소 노드 객체의 특성                                               | 프로토타입을 제공하는 객체 |
        | ------------------------------------------------------------------------- | -------------------------- |
        | 객체                                                                      | Object                     |
        | 이벤트를 발생시키는 객체                                                  | EventTarget                |
        | 트리 자료구조의 노드 객체                                                 | Node                       |
        | 브라우저가 렌더링 할 수 있는 웹 문서(HTML,XML,SVG)의 요소를 표현하는 객체 | Element                    |
        | 웹 문서의 요소 중에서 HTML 요소를 표현하는 객체                           | HTMLElement                |
        | HTML 요소 중에서 input 요소를 표현하는 객체                               | HTMLInputElement           |

        노드 객체의 상속구조는 개발자 도구 Elements 패널 우측의 Properties에서 확인 가능합니다.

        노드 객체에는 노드 객체의 종류,타입에 상관없이 공통적으로 갖는 기능이 있는 반면에 노드 타입에 따라 갖는 고유 기능들도 있습니다. 노드 객체의 공통된 기능일 수록 프로토타입 체인 상위에 위치하고 고유 기능일 수록 하위에 프로토타입 체인을 구축하여 프로퍼티와 메서드를 제공하는 상속 구조를 갖습니다.

        **DOM은 HTML 문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공합니다. 이 DOM API를 통해 HTML의 구조나 내용 또는 스타일을 동적으로 조작할 수 있습니다.**

        이번 쳅터를 보면서 DOM API가 어떻게 접근이 이루어지고 어느 부분에서 기능이 실행되는 지에 대한 원리 등을 바라보는 관점이 향상되면 좋을 것 같습니다.

    ## 2. 요소 노드 취득

    HTML의 구조나 내용 등을 동적으로 조작하기 위해서는 우선적으로 요소 노드를 취득해야 합니다. 어트리뷰트 노드 혹은 텍스트 노드 모두 요소 노드로 부터 파생되기 때문입니다. 따라서 DOM은 요소를 취득할 수 있는 다양한 메서드를 제공합니다.

    1. id를 이용한 요소 노드 취득

        ```jsx
        const $elem = document.getElementById("banana");
        $elem.style.color = "red";
        ```

        `Document.prototype.getElementById` 메서드는 인수로 전달한 id 어트리뷰트값을 갖는 하나의 요소노드를 탐색하여 반환합니다. id 값은 HTML 문서 내에 유일한 값이어야 하며, 여러 개를 설정해도 에러는 발생하지 않습니다. 하지만 해당 아이디로 위 메서드를 실행한다면 첫 번째 요소 노드만 반환됩니다.

        만약에 해당 id가 존재하지 않을 경우 null을 반환합니다. 또한 선언한 id 값은 동일한 이름의 전역변수가 암묵적으로 선언되고 해당 노드 객체를 할당하게 됩니다. 하지만 id 값과 동일한 이름의 변수를 재할당 할 수 는 없습니다.

    2. 태그 이름을 이용한 요소 노드 취득

        `Document.prototype/Element.prototype.getElementByTagName` 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소들을 탐색하여 반환합니다.

        ```jsx
        const $elems = document.getElementsByTagName("li");
        console.log($elems);
        [...$elems].forEach((elem) => {
            elem.style.color = "red";
        });
        ```

        \*HTMLCollection은 유사 배열 객체이면서 이터러블 입니다.

        - 해당 메서드는 HTMLCollection 객체를 반환합니다.
        - 요소가 존재하지 않는 경우 빈 HTMLCollection 객체를 반환합니다.
        - HTML 문서의 모든 요소 노드를 취득하려면 인수로 `*`을 전달하면 됩니다.

    3. class를 이용한 요소 노드 취득

        `Document.prototype/Element.prototype.getElementByClassName` 메서드는 인수로 전달한 class 어트리뷰트 값을 갖는 모든 요소 노드들을 탐색하여 반환합니다.

        ```jsx
        const $elems = document.getElementsByClassName("fruit");
        console.log($elems);
        [...$elems].forEach((elem) => {
            elem.style.color = "red";
        });

        const $apple = document.getElementsByClassName("fruit apple");
        $apple.style.color = "blue";
        ```

        - 인수로 전달할 class 값은 공백으로 구분하여 여러 개의 class를 지정할 수 있습니다.
        - 해당 메서드는 HTMLCollection을 반환합니다.
        - 반환 값이 존재하지 않는다면 빈 HTMLCollection 객체를 반환합니다.

    4. CSS 선택자를 이용한 요소노드 취득

        `Document.prototype/Element.prototype.quertSelector` 메서드는 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소노드를 탐색하여 반환합니다. 본 메서드는 다음과 같은 특징이 있습니다.

        ```jsx
        const $elems = document.querySelectorAll("ul > li");
        console.log($elems);
        [...$elems].forEach((elem) => {
            elem.style.color = "red";
        });

        const $banana = document.querySelector("#banana");
        $banana.style.color = "blue";
        ```

        - 인수를 만족시키는 요소 노드가 여러개인 경우 첫 번째 요소 노드만 반환합니다.
        - 인수를 만족시키는 요소 노드가 존재하지 않는경우 null을 반환합니다.
        - 인수로 전달한 선택자가 문법에 맞지 않는 경우 DOMException 에러가 발생합니다.

        `Document.prototype/Element.prototype.quertSelectorAll` 메서드는 인수를 만족시키는 모든 요소 노드를 NodeList 객체로 반환합니다.

        - 인수를 만족시키는 요소가 없는 경우 빈 NodeList객체를 반환합니다
        - 인수로 전달한 선택자가 문법에 맞지 않는 경우 DOMException 에러가 발생합니다.
        - HTML 문서의 모든 요소 노드를 취득하려면 인수로 `*`을 전달하면 됩니다.

        CSS 선택자 문법을 사용하는 메서드는 getElementBy\*\*\* 메서드보다 속도적인 측면에서 다소 느립니다. 하지만 해당 문법은 좀 더 구체적인 조건으로 요소 노드를 취득할 수 있고 일관된 방식으로 요소 노드를 취득할 수 있다는 장점이 있습니다.

        **따라서, id 가 있는 요소 노드를 취득하는 경우에는 getElementById 메서드를 그 외에는 CSS 선택자 메서드를 사용하는 것을 추천합니다.**

    5. 특정 요소 노드를 취득할 수 있는 지 확인

        `Element.prototype.matches` 메서드는 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인합니다.

        ```jsx
        const $apple = document.querySelector(".apple");
        console.log($apple.matches("#fruits > li.apple")); // true
        console.log($apple.matches("#fruits > li.banana")); // false
        ```

    6. HTMLCollection과 NodeList

        DOM 컬렉션 객체인 HTMLCollection과 NodeList는 DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체입니다. 두 객체는 모두 유사 배열 객체이면서 이터러블입니다.

        두 컬렉션 객체의 중요한 특징은 노드 객체의 상태 변화를 실시간으로 반영하는 **살아있는 객체**라는 것입니다. HTMLCollection 은 언제나 live로 동작하지만 NodeList는 부분적으로만 live로 동작하는 특징이 있습니다.

        ### HTMLCollection

        getElementByTag/ClassName 메서드가 반환하는 **HTMLCollection은 노드 객체의 상태를 실시간으로 반영하는 살아있는 DOM 컬렉션 객체**입니다. 아래 코드를 한번 보겠습니다.

        ```html
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <link rel="stylesheet" href="style.css" />
                <title>Document</title>
            </head>
            <body>
                <ul id="fruits">
                    <li class="red">Apple</li>
                    <li class="red">Banana</li>
                    <li class="red">Orange</li>
                </ul>
                <script src="app.js"></script>
            </body>
        </html>
        ```

        ```jsx
        const $elems = document.getElementsByClassName("red");
        console.log($elems); //HTMLCollection(3) [li.red, li.red, li.red]
        for (const elem of $elems) {
            elem.className = "blue";
        }

        console.log($elems); //HTMLCollection [li.red]
        ```

        아마 우리가 바랬던 변화는 모든 red 라는 클래스 명을 가진 요소 노드들의 클래스가 blue로 변경되는 것을 바랬을 것입니다. 하지만, HTMLCollection은 살아있는 DOM 컬렉션 객체이기 때문에 그렇지 않습니다.

        - 첫 번째 반복문에서 Apple 텍스트 노드를 갖는 요소의 클래스가 blue가 되어버렸을 때 그 다음 Banana 요소가 첫 번째로 이동하게 됩니다.
        - 두 번째로 blue가 되어야 할 요소 노드는 Banana요소가 첫 번째로 이동함에 따라 오랜지 요소로 이동하게 됩니다.
        - 마지막에는 $elems는 false로 평가되어서 마지막 값은 변경되지 않고 반복문은 종료됩니다.

        HTMLCollection은 객체를 for 문으로 순회하면서 노드 객체의 상태를 변경해야 할 때 주의해야 합니다. 이러한 단점은 아래와 같은 방법으로 회피할 수 있습니다.

        - for 문을 역방향으로 순회
        - while 문을 사용하여 HTMLCollcetion 객체에 노드 객체가 남아있지 않을 때까지 무한 반복
        - **HTMLCollcetion을 사용하지 않는다.**

        ### NodeList

        HTMLCollection 객체의 부작용 해결을 위해 querySellectorAll 메서드를 사용하는 방법도 있습니다. 해당 메서드로 반환된 NodeList는 상태변경을 반영하지 않는 객체입니다.

        ```html
        const $elems = document.querySelectorAll(".red"); console.log($elems);
        //NodeList(3) [li.red, li.red, li.red] for (const elem of $elems) {
        elem.className = "blue"; } console.log($elems); //NodeList(3) [li.blue,
        li.blue, li.blue]
        ```

        NodeList 객체가 실시간으로 상태를 반영하는 경우는 **childNodes 프로퍼티가 반환하는 NodeList객체인 경우입니다.**

        HTMLCollcetion이나 NodeList 객체는 예상과 다르게 동작하는 경우가 많기 때문에 **두 객체를 배열로 변경해서 사용하는 것을 권장하고 있습니다.** 유사 배열 객체를 변경하는 방법은 스프레드 문법이나 Array.from 메서드를 통해서 변경할 수 있습니다.

        <aside>
        💡 **Document.prototype/Element.prototype.method()를 갖는 메서드들 공통점**
        해당 메서드는 document 관점에서 실행하는 것과 element 관점에서 실행하는 것이 존재합니다. document는 전역적으로 해당 클래스를 갖는 요소 노드를 검색하는 반면에 element는 해당 요소 노드의 자손 노드 중에서 일치하는 값을 검색 후 반환합니다.

        </aside>

    ## 3. 노드 탐색

    요소 노드를 취득한 다음, 해당 노드를 기점으로 DOM 트리의 노드를 옴ㄹ겨다니며 노드를 탐색해야 할 때가 있습니다.

    ```html
    <ul id="fruits">
        <li class="apple">Apple</li>
        <li class="banana">Banana</li>
        <li class="orange">Orange</li>
    </ul>
    ```

    위 코드에서 ul은 3개의 자식을 갖습니다. 이때 #fruits 요소 노드를 기점으로 자식 노드를 탐색하거나 부모노드를 탐색할 수 있습니다. 요소 노드를 기점으로 주변 노드들을 탐색하는 프로퍼티가 존재하지만, **모든 노트 탐색 프로퍼티는 접근자 프로퍼티 입니다. 만약에 값을 할당한다면 쿨하게 무시합니다.**

    1. 공백 텍스트 노드

        HTML 요소 사이의 스페이스, 탭, 개행 등의 공백 문자를 공백 텍스트 노드라고 합니다. DOM 생성시 해당 노드도 함께 생성이 되는데 **노드를 탐색할 때 공백 텍스트 노드에 주의해야 합니다.**

        공백 텍스트 노드를 제거하면 되지만 가독성이 상당히 떨어져서 권장하지는 않습니다.

        ```html
        <ul id="fruits">
            <li class="apple">Apple</li>
            <li class="banana">Banana</li>
            <li class="orange">Orange</li>
        </ul>
        ```

    2. 자식 노드 탐색

        자식 노드를 탐색하기 위해서는 아래의 노드 탐색 프로퍼티를 사용합니다.

        | 프로퍼티                    | 설명                                                                                             |
        | --------------------------- | ------------------------------------------------------------------------------------------------ |
        | Node.prototype.childNoes    | 자식 노드들을 모두 탐색하여 NodeList에 담하 반환. 해당 NodeList에넌 텍스트 노드도 포함되어 있다. |
        | Element.prototype.children  | 자식 노들을 모두 탐색하여 HTMLCollection에 반환. 텍스트 노드가 포함되어 있지 않다.               |
        | Node.prototype.firstChild   | 첫 번째 자식 노드 반환. 요소노드 혹은 텍스트 노드이다.                                           |
        | Node.prototype.lastChild    | 마지막 자식 노드 반환. 요소노드 혹은 텍스트 노드이다.                                            |
        | Element.prototype.childNoes | 첫 번째 자식 노드 반환. 요소노드만 반환한다.                                                     |
        | Element.prototype.childNoes | 마지막 자식 노드 반환. 요소노드만 반환한다.                                                      |

    3. 자식 노드 존재 확인

        자식 노드의 존재 확인을 위해서는 Node.prototype.hasChildNodes 메서드를 사용합니다. 해당 메서드는 불리언 값을 반환합니다. 단, 요소 노드 뿐만 아니라 텍스트 노드도 포함하여 반환합니다. 요소 노드만을 확인하고 싶다면 `children.length` 혹은 `Element.prototype.childElementCount` 프로퍼티를 사용합니다.

        ```jsx
        const $fruits = document.getElementById("fruits");
        console.log($fruits.hasChildNodes());

        console.log(!!$fruits.children.length);
        console.log(!!$fruits.childElementCount);
        ```

    4. 요소 노드의 텍스트 노드 탐색

        요소 노드의 텍스트 노드는 요소 노드의 자식노드 입니다. 따라서 firstChild 메서드를 통해 확인할 수 있습니다.

        ```jsx
        const $fruits = document.getElementById("fruits");
        console.log($fruits.firstChild); // #text
        ```

    5. 부모 노드 탐색

        부모 노드 탐색은 `Node.prototype.parentNode` 프로퍼티를 사용합니다.

        ```jsx
        const $fruits = document.getElementById("fruits");
        console.log($fruits.parentNode); // body
        ```

    6. 형제 노드 탐색

        부모 노드가 같은 형제 노드를 탐색하려면 노드 탐색 프로퍼티를 사용합니다. 단, 어트리뷰트 노드는 부모 노드가 같은 형제 노드가 아니어서 반환하지 않고 **텍스트 노드 혹은 요소 노드만을 반환**합니다.

        | 프로퍼티                                 | 설명                                                                          |
        | ---------------------------------------- | ----------------------------------------------------------------------------- |
        | Node.prototype.previousSibling           | 자신의 이전 노드를 탐색하여 반환합니다. 텍스트 노드와 요소 노드를 반환합니다. |
        | Node.prototype.nextSibling               | 자신의 다음 노드를 탐색하여 반환합니다. 텍스트 노드와 요소 노드를 반환합니다. |
        | Element.prototype.previousElementSibling | 자신의 이전 노드를 탐색하여 반환합니다. 요소 노드만을 반환합니다.             |
        | Element.prototype.nextElementSibling     | 자신의 다음 노드를 탐색하여 반환합니다. 요소 노드만을 반환합니다.             |

## 4. 노드 정보 취득

노드 객체에 대한 정보를 취득하려면 다음과 같은 노드 정보 프로퍼티를 사용합니다.

| 프로퍼티                | 설명                              |
| ----------------------- | --------------------------------- |
| Node.prototype.nodeType | 노드 타입을 나타내는 상수를 반환. |

-   Node.ELEMENT_NODE: 요소노드, 1 반환
-   Node.TEXT_NODE: 텍스트 노드, 3 반환
-   Node.DOCUMENT_NODE: 문서노드, 9반환 |
    | Node.prototype.nodeType | 노드의 이름을 문자열로 반환.
-   요소노드: 대뭄ㄴ자 문자열로 태그 이름 반환
-   텍스트 노드: “#text” 반환
-   문서노드: “#document” 반환 |

## 5. 요소 노드의 텍스트 조작

1. nodeValue

    노드 객체의 nodeValue 프로퍼티를 참조하면 노드 객체의 값(텍스트 노드의 텍스트)을 반환합니다. 텍스트 노드가 아닌 노드에서 nodeValue 프로퍼티를 참조할 경우 null을 반환합니다.

    nodeValue에 값을 할당하면 기존에 있던 값을 할당한 값으로 변경이 가능한다 다음과 같은 순서 처리가 필요합니다.

    1. 텍스트를 변경할 요소 노드 취득 후 해당 노드의 텍스트 노드 탐색.(firstChild 프로퍼티 사용)
    2. 탐색한 노드의 nodeValue 프로퍼티를 사용하여 텍스트 노드의 값 변경

    ```jsx
    const $apple = document.querySelector(".apple");
    console.log($apple.firstChild.nodeValue);
    const textNode = $apple.firstChild;
    textNode.nodeValue = "Apple";
    console.log($apple.firstChild.nodeValue);
    ```

2. textContent

    요소 노드의 textContent 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내의 텍스트를 모두 반환합니다 이때 HTML 마크업은 무시됩니다.

    nodeValue 프로퍼티를 참조하여도 프로퍼티 취득이 가능하지만, 텍스트 노드가 아닌 노드의 경우 null을 반환하고 nodeValue 프로퍼티를 참조할때만 텍스트를 반환합니다. 이는 textContent 프로퍼티보다 코드가 더 복잡해 집니다.

    ```jsx
    const $foo = document.getElementById("foo");
    console.log($foo.textContent); // Hello World

    console.log($foo.nodeValue); //null
    console.log($foo.firstChild.nodeValue); // Hello
    console.log($foo.lastChild.firstChild.nodeValue); // World
    ```

    요소 노드의 textContent 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가됩니다. 이때 HTML 마크업은 파싱되지 않습니다.

    textContent와 유사한 동작을 하는 innerText 프로퍼티가 있지만 해당 프로퍼티는 다음과 같은 이유로 사용하지 않는것을 권장합니다.

    - innerText는 CSS에 순종적이어서 CSS에 의해 표시되지 않는 요소 노드의 텍스트를 반환하지 않는다. 이는 **텍스트 조작 혹은 취득에 있어서 오류를 발생시킬 수 있다.**
    - CSS를 고려하는 과정이 추가되어서 textContent 보다 속도가 느리다.

## 6. DOM 조작

DOM 조작이란 새로운 노드를 생성하여 기존의 DOM에 추가,삭제,교체를 의미합니다. 이때 리플로우와 리페인트가 발생하게 되어 성능에 영향을 주게 되는데, 리플로우와 리페인트가 최소화 되도록 조작하여야 합니다.

1. innerHMTL

    `Element.prototype.innerHTML` 메서드는 setter/getter 모두 존재하는 프로퍼티로써 요소 노드의 HTML 마크업을 취득하거나 변경합니다.

    ```jsx
    const $foo = document.getElementById("foo");
    console.log($foo.innerHTML); //Hello <span>World</span>
    ```

    innerHTML 프로퍼티에 문자열을 할당하면 기존에 존재하던 자식 노드들이 초기화 되고 해당 문자열로 대체됩니다. textContent 프로퍼티와의 차이는 innerHTML은 HTML 마크업을 수용하여 DOM에 반영된다는 것입니다.

    요소 노드의 innerHTML 프로퍼티에 할당한 HTML 마크업 문자열은 렌더링 엔진에 의해 파싱되어 요소 노드의 자식으로 DOM에 반영됩니다. 이때, 입력받은 데이터를 그대로 innerHTML에 할당하는 것은 [크로스 사이트 스크립팅(XXS)](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8C%85) 공격에 취약하므로 권장하는 사항은 아닙니다.

    <aside>
    💡 HTML  새니티제이션
    HTML 새니티제이션은 사용자로부터 입력받은 데이터에 의해 발생할 수 있는 XXS 공격을 예방하기 위해 잠재적 위험을 제거하는 기능을 의미합니다. 직접 구현할 수 있지만, DOMPurify 라이브러리 사용을 권장합니다.

    ```jsx
    DOMPurify.sanitize();
    ```

    </aside>

    innerHTML은 DOM 조작이 간단하고 직관적이라는 장점이 있 지만 XXS 공격에 취약하고, 프로퍼티에 새로운 값을 할당할 때 기존의 코드를 초기화 시키고 새로운 노드를 생성하여 DOM에 반영한다는 단점이 있습니다. 이는, **기존 노드에 적용되어 있던 값들, 이벤트들이 모두 초기화 된다는 것을 의미**하며 효율적이지 못한 방법입니다. 또한 새로운 요소를 삽입할 때 위치를 지정할 수 없다는 단점 역시 존재합니다.

2. insertAdjacentHTML

    `Element.prototype.insertAdjacentHTML(position,DOMString)` 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입합니다.

    insertAdjacentHTML 메서드의 두 번째 인수로전달한 HTML 마크업 문자열을 파싱하고 그 결과를 첫 번째 인수에 삽입하여 DOM에 반영합니다. 첫 번째 인수는 총 4가지 종류가 존재합니다.

    - beforebegin : 요소 노드의 시작 태그 앞
    - afterbegin : 요소 노드의 시작 태그 뒤
    - beforeend : 요소 노드의 종료 태그 앞
    - afterend : 요소 노드의 종료 태그 뒤

    ```html
    <body>
        <!-- beforebegin -->
        <div id="foo">
            <!-- afterbegin -->
            text
            <!-- beforeend -->
        </div>
        <!-- afterend -->
        <script src="app.js"></script>
    </body>
    ```

    ```jsx
    function init() {
        const $foo = document.getElementById("foo");
        $foo.insertAdjacentHTML("beforebegin", "<p>beforebegin</p>");
        $foo.insertAdjacentHTML("afterbegin", "<p>afterbegin</p>");
        $foo.insertAdjacentHTML("beforeend", "<p>beforeend</p>");
        $foo.insertAdjacentHTML("afterend", "<p>afterend</p>");
    }
    ```

    insertAdjacentHTML 메서드는 기존 요소에 영향을 주지 않고 요소를 추가하므로 innerHTML 프로퍼티보다 효율적이고 빠릅니다. 하지만 해당 메서드 역시 HTML 마크업 문자열을 파싱하므로 XXS 공격에 취약하다는 점은 동일합니다.

3. 노드 생성과 추가

    DOM은 노드를 직접 CRUD 메서드를 제공하고 있습니다.

    - **요소 노드 생성**
        `Document.prototype.creatElement(tagName)` 메서드는 요소 노드를 생성하여 반환합니다. 인수에는 태그 이름을 나타내는 문자열을 전달합니다.
        ```jsx
        const $li = document.createElement("li");
        ```
        이렇게 요소 노드를 생성했다 뿐이지 아직 DOM과 연결하지 않았습니다. 이렇게 생성된 요소를 이후에 DOM과 연결하는 작업을 해주어야 합니다.
    - **텍스트 노드 생성**
        `Document.prototype.creatTetxtNode(text)` 메서드는 텍스트 노드를 생성하여 반환합니다. 인수에는 텍스트 노드의 값으로 사용할 문자열을 전달합니다.
        ```jsx
        const textNode = document.createText("banana");
        ```
    - **텍스트 노드를 요소 노드의 자식으로 추가**
        `Node.prototype.appendChild(childNode)` 메서드는 매개변수를 메서드를 호출한 노드의 마지막 자식 노드로 추가합니다.
        ```jsx
        $li.appendChild(textNode);
        ```
        만약에 요소 노드에 자식 노드가 *하나도 없는 경우*에는 텍스트 노드를 추가해서 자식 노드로 추가하는 것보다 textContent 프로퍼티를 사용하는 편이 더 간편할 수 있습니다.
    - **요소 노드를 DOM에 추가**
        마찬가지로 `Node.prototype.appendChild(childNode)` 메서드를 사용하여 부모 요소 노드로 삼고 싶은 DOM의 요소 노드로 해당 메서드를 호출합니다. 이 과정에서 새로운 요소 노드가 DOM에 추가됩니다. 이 때 한 번의 리플로우와 리페인트가 실행됩니다.

4. 복수의 노드 생성과 추가

    만약에 여러개의 요소 노드를 생성하여 DOM에 3번 추가한다면 리페인트와 리플로우가 3번 일어나게 됩니다. 이는 성능 저하를 야기합니다.

    이러한 비효율적인 문제를 해결하기 위해 컨테이너 요소를 생성하고 생성한 요소 노드들을 컨테이너에 추가하고 마지막에 컨테이너를 DOM에 있는 요소 노드에 추가하면 DOM은 단 한 번만 변경됩니다. 하지만 이 방법 역시 불필요한 컨테이너 요소를 생성하기 때문에 추천하는 방법은 아닙니다.

    불필요한 요소 노드를 생성하지 않고 한 번만 DOM을 변경시키는 방법은 `DocumentFragment` 노드를 통해 해결할 수 있습니다. `DocumentFragment`노드는 부모 노드가 없어서 기존 DOM과는 별도로 존재한다는 특징이 있습니다. `DocumentFragment` 노드는 자식 노드들의 부모 노드로서 별도의 서브 DOM을 구성하여 기존 DOM에 추가하기 위한 용도로 사용됩니다. 약간 독립적인 DOM 느낌입니다. 다음 예제를 보겠습니다.

    ```jsx
    const $fruits = document.getElementById("fruits");

    const $fragment = document.createDocumentFragment();
    ["Apple", "Banana", "Orange"].forEach((x) => {
        const $li = document.createElement("li");
        $li.textContent = x.toLowerCase();
        $li.className = x;

        $fragment.appendChild($li);
    });
    $fruits.appendChild($fragment);
    ```

    여러 개의 요소 노드를 DOM에 추가하는 경우 DocumentFragment 노드를 사용하는것이 더욱 효율적인 방법입니다.

5. 노드 삽입
    - **마지막 노드로 추가**
        `Node.prototype.appendChild` 메서드를 호출한 요소 노드의 마지막 자식 노드로 전달한 인수가 추가됩니다.
    - **지정한 위치에 노드 삽입**
        `Node.prototype.insertBefore(newNode, childNode)` 메서드는 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입합니다.
        ```jsx
        const $li = document.createElement("li");
        $li.appendChild(document.createTextNode("grage"));
        $fruits.insertBefore($li, $fruits.lastChild);
        ```
        두 번째 인수로 전달받은 노드는 반드시 insertBefore 메서드를 호출한 노드의 자식 노드여야 합니다. 그렇지 않으면 DOMException 에러가 발생합니다. 만약에 두 번째 인수가 null 이라면 appendChild 메서드처럼 동작합니다. (제일 마지막에 요소 노드 추가)
6. 노드 이동

    이미 존재하는 노드를 appendChild 혹은 insertBefore 메서드를 이용하여 DOM에 다시 추가한다면 현재 위치에 있는 해당 노드를 제거하고, 새로운 위치에 노드를 추가합니다. 즉, 노드의 위치만 바뀌게 됩니다.

7. 노드 복사

    `Node.prototype.cloneNode([deep:true | false])` 메서드는 노드의 사본을 생성하여 반환합니다. 매겨 변수에 true를 전달하면 자손 노드가 포함된 깊은 복사가 이루어지고 false를 전달하거나 생략한다면 해당 노드만 복사가 됩니다.

8. 노드 교체

    `Node.prototype.replaceChild(newChild,oldChild)` 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체합니다. 인수로 전달되는 oldChild는 메서드를 호출하는 노드의 자식노드여야 합니다. 해당 메서드가 호출되고 난 다음에 oldChild는 DOM에서 삭제됩니다.

9. 노드 삭제

    `Node.prototype.removeChild(child)` 메서드는 child 매개변수에 인수로 전달한 노드를 DOM 에서 삭제합니다. 전달한 노드는 메서드를 호출한 노드의 자식 노드여야 합니다.

## 7. 어트리뷰트

1. 어트리뷰트 노드와 attribute 프로퍼티

    HTML 요소는 여러개의 속성을 가질 수 있습니다. HTML 어트리뷰트는 다음과 같은 형식으로 값을 갖습니다 (input 요소 예시)

    ```jsx
    <input id="user" type="text" value="hozzi" />
    ```

    어트리뷰트는 HTML 요소에 따라 지정할 수 있는 값들이 각각 다릅니다. HTML 문서가 파싱될 때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결됩니다. 이때 HTML 어트리뷰트당 하나의 어트리뷰트 노드가 생성됩니다. 즉, 위 예시에서 3개의 HTML 어트리뷰트가 생성되었으므로 3개의 어트리뷰트 노드가 생성됩니다.

    이때 모든 어트리뷰트 노드의 참조는 유사배열 객체이자 이터러블인 NamedNodeMap 객체에 담겨 요소 노드의 attribute 프로퍼티에 저장됩니다.

    따라서 요소 노드의 모든 어트리뷰트 노드는 요소 노드의 `Element.prototype.attributes` 프로퍼티로 취득할수 있습니다. 해당 프로퍼티는 getter만 존재하며 요소 노드의 모든 어트릴뷰트가 담긴 NamedNodeMap 객체를 반환합니다.

    ```jsx
    const $user = document.getElementById("user");
    const attrs = $user.attributes;
    [...attrs].forEach((x) => console.log(x.value));
    ```

2. HTML 어트리뷰트 조작

    앞선 attributes 프로퍼티는 getter만 존재하므로 값을 변경하기에 좋은 프로퍼티는 아닙니다.

    하지만, `Element.prototype.getAttribute(attrName)/setAttribute(attrName,attrValue)`메서드를 사용하면 attributes 프로퍼티를 통하지 않고 요쇼 노드에서 메서드를 통해 값을 취득하거나 변경할 수 있습니다.

    ```jsx
    const $user = document.getElementById("user");
    const inputVal = $user.getAttribute("value");
    console.log(inputVal); // hozzi

    $user.setAttribute("value", "changeVal");
    console.log($user.getAttribute("value")); // changeVal
    ```

    특정 HTML 어트리뷰트 존재를 확인하기 위해서는 `Element.prototype.hasAttribute(attrName)` 메서드를 사용하고 삭제하기 위해서는 `Element.prototype.removeAttribute(attrName)` 메서드를 사용합니다.

    ```jsx
    const $user = document.getElementById("user");
    console.log($user.getAttribute("value")); //hozzi

    if ($user.getAttribute("value")) $user.removeAttribute("value");

    console.log($user.getAttribute("value")); //null
    ```

3. HTML 어트리뷰트 vs DOM 프로퍼티

    요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티가 존재합니다. 이 DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있습니다. HTML 어트리뷰트는 DOM 프로퍼티에 attribute에 어트리뷰트 노드의 값들을 NamedNodeMap 객체로 가지고 있는 반면에 DOM 프로퍼티도 해당 값들을 초기값으로 갖는 프로퍼티들을 갖습니다.

    DOM 프로퍼티는 setter/getter가 모두 존재하여 참조와 변경이 가능합니다.

    ```jsx
    const $user = document.getElementById("user");
    console.log($user.value); // hozzi
    $user.value = "foo";
    console.log($user.value); // foo
    ```

    이처럼 HTML 어트리뷰트는 DOM에서 중복 관리되는 것처럼 보입니다.

    1. 요소 노드의 attributes 프로퍼티에서 관리하는 어트리뷰트 노드
    2. HTML 어트리뷰트에 대응하는 요소 노드의 프로퍼티(DOM 프로퍼티)

    얼핏 보면 비슷해 보이지만 HTML 어트리뷰트의 역할을 보면 그렇지 않습니다. **HTML 어트리뷰트의 역할은 HTML 요소의 초기 상태를 지정하는 것입니다. 즉 HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미하며 이는 변하지 않습니다.**

    최초 렌더링시 요소 노드에 할당된 프로퍼티 값과 HTML 어트리뷰트 값은 동일합니다. 하지만 렌더링 이후 사용자에 의해 value 값이 변경된다면 상황이 달라집니다.

    요소 노드는 상태를 가지고 있습니다. 그리고 그 상태는 사용자가 최근에 입력한 **최신 상태**와 제일 처음에 입력되어 있는 초기 상태 입니다. **초기 상태**를 관리하지 않았을 경우 웹 페이지를 처음 표시하거나 새로고침할 초기 상태를 표시할 수 없습니다.

    즉, 요소의 **최신 상태는 DOM 프로퍼티**가 요소의 **초기 상태는 어트리뷰트 노드**가 관리한다고 볼 수 있습니다.

    - 어트리뷰트 노드
        앞에서 언급했지만 HTML 요소의 초기 상태는 어트리뷰트 노드에서 관리합니다. 해당 값은 사용자가 입력해도 변하지 않고 요소의 초기 상태를 유지합니다.
        앞에서 언급한 getAttribute/setAttribute 메서드는 어트리뷰트의 초기 값을 취득/변경하는 메서드입니다.
        ```jsx
        const $user = document.getElementById("user");
        console.log($user.getAttribute("value"), $user.value); // hozzi hozzi
        $user.value = "foo";
        console.log($user.getAttribute("value"), $user.value); // hozzi foo
        $user.setAttribute("value", "changeVal");
        console.log($user.getAttribute("value"), $user.value); // changeVal foo
        ```
    - DOM 프로퍼티
        DOM 프로퍼티 역시 앞에서 언급했지만 사용자의 입력에 의한 상태 변화에 반응하여 최신 상태를 유지합니다. 해당 프로퍼티의 값을 동적으로 변경한다고 해도 getAttribute 메서드로 얻는 초기 값은 변하지 않고 유지됩니다.
        하지만, 모든 DOM 프로퍼티가 사용자의 입력에 의해 변경된 최신 상태를 관리하는 것은 아닙니다. id 어트리뷰트와 같이 사용자의 입력과 상관 없는 어트리뷰트는 id 프로퍼티 값이 변하면 id 어트리뷰트 값도 같이 변화가 됩니다. 즉 **사용자의 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티만 최신 상태 값을 관리합니다.** 그 외의 입력에 의한 상태 변화는 항상 동일한 값으로 연동됩니다. \*\*\*\*
        ```jsx
        const $user = document.getElementById("user");
        console.log($user.getAttribute("id"), $user.id); // user user
        $user.id = "foo";
        console.log($user.getAttribute("id"), $user.id); // foo foo
        ```
    - HTML 어트리뷰트와 DOM 프로퍼티의 대응 관계
        대부분 HTML 어트리뷰트와 DOM 프로퍼티는 1:1로 대응합니다. 단 다음과 같은 경우는 항상 1:1로 대응하지 않고, 키가 일치하는 것도 아닙니다.
        - id 어트리뷰트와 id 프로퍼티는 1:1 대응이며 값으로 연동
        - input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 대응 하지만 value 어트리뷰트는 초기 상태를 value 프로퍼티는 최싱 상태를 갖는다
        - class 어트리뷰트는 className,classList 프로퍼티와 대응
        - for 어트리뷰트는 htmlFor 프로퍼티와 1:1 대응
        - td 요소의 colspan 어트리뷰트는 대응하는 프로퍼티 존재 x
        - textContent 프로퍼티는 대응하는 어트리뷰트 존재 x
        - 어트리뷰트 이름은 대소문자를 구별하지 않지만 대응하는 프로퍼티 키는 카멜 케이스를 따름. (maxlength → maxLength)
    - DOM 프로퍼티 값의 타입
        getAttribute 메서드로 취득한 어트리뷰트 값은 언제나 문자열입니다. 하지만 DOM 프로퍼티로 취득한 최신 상태 값은 문자열이 아닐 수 있습니다. 예시로 checkbox의 checked 어트리뷰트와 프로퍼티의 차이가 있습니다. (문자열 vs 불리언)

4. data 어트리뷰트와 dataset 프로퍼티

    data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 JS 간에 데이터를 교환할 수 있습니다. data 어트리뷰트는 data- 접두사 다음에 이름을 붙여서 사용합니다.

    data 어트리뷰트 값은 HTMLElement.dataset 프로퍼티로 취득할 수 있습니다. dataset 프로퍼티는 HTML 요소의 모든 data 어트리뷰트의 정보를 제공하는 DOMStringMap 객체를 반환합니다. 해당 객체는 data-접두사 다음에 붙인 이름을 카멜 케이스로 변환한 프로퍼티 키를 갖습니다. 이 프로퍼티로 data 어트리뷰트의 값을 취득/변경할 수 있습니다.

    ```jsx
    const users = [...document.querySelector(".users").children];
    const user = users.find((user) => user.dataset.userId === "1234");
    console.log(user.dataset); // DOMStringMap {userId: '1234', role: 'admin'}
    user.dataset.role = "subscriber";
    console.log(user.dataset); // DOMStringMap {userId: '1234', role: 'subscriber'}
    ```

    또한 존재하지 않는 이름으로 키를 사용하여 dataset 프로퍼티에 값을 할당하면 data 어트리뷰트에 해당 값이 추가됩니다.

## 8. 스타일

1. 인라인 스타일 조작

    `HTMLElement.prototype.style` 프로퍼티는 setter/getter가 모두 존재하는 프로퍼티로 요소 노드의 인라인 스타일을 취득/변경 할 수 있습니다.

    style 프로퍼티를 참조하면 CSSStyleDeclaration 타입의 객체를 반환합니다. 해당 객체는 CSS 프로퍼티에 대응하는 프로퍼티를 가지고 있으며 이 프로퍼티에 값을 할당하면 인라인 스타일로 CSS 프로퍼티가 HTML 요소에 추가되거나 변경됩니다.

    CSS 프로퍼티는 케밥 케이스 (background-color)를 따르지만 CSSStyleDeclaration 객체는 카멜 케이스를 따릅니다 (backgroundColor)

2. 클래스 조작

    클래스 선택자를 사용하여 HTML 요소의 스타일을 변경할 수도 있습니다. 이때 class 어트리뷰트에 대응하는 DOM 프로퍼티는 앞에서도 봤듯이 className 혹은 classsList 입니다.

    - className
        `Element.prototype.className` 프로퍼티는 setter/getter 모두 존재하는 접근자 프로퍼티로 HTML 요소의 class 어트리뷰트 값을 취득하거나 변경합니다.
        요소 노드의 className 프로퍼티를 참조하면 class 어트리뷰트 값을 문자열로 반환하고, 해당 프로퍼티에 문자열을 할당하면 class 어트리뷰트에 할당한 문자열로 변경됩니다.
        해당 프로퍼티는 문자열만을 반환하기 때문에 공백으로 구분된 여러 개의 클래스를 반환하는 경우 다루는데 불편함이 있습니다.
    - classList
        `Element.prototype.classList` 프로퍼티는 class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환합니다. 해당 객체는 유사 배열이면서 이터러블 입니다. 또한 다음과 같은 메서드들을 제공합니다.
        - `add(...className)`
            인수로 전달한 1개 이상의 문자열을 class 어트리뷰트 값으로 추가
        - `remove(...className)`
            1개 이상의 문자열과 일치하는 클래스를 삭제. 만약에 일치하는 것이 없다면 무시
        - `item(index)`
            index에 해당하는 클래스를 반환
        - `contains(className)`
            인수로 전달한 문자열과 일치하는 클래스가 있는지 불리언 값으로 반환
        - `replace(oldClassName,newClassName)`
            첫번째 인수로 전달한 문자열을 두 번째 인수로 전달한 문자열로 변경
        - `toogle(className[,force])`
            인수로 전달한 문자열과 일치하는 클래스가 존재하면 제거하고 존재하지 않으면 추가.

3. 요소에 적용되어 있는 CSS 스타일 참조

    style 프로퍼티는 인라인 스타일만 반환합니다. 따라서 클래스를 적용한 스타일이나 상속을 통해 암묵적으로 적용된 스타일은 style 프로퍼티로 참조할 수 없습니다. HTML 요소에 적용되어 있는 모든 CSS 스타일을 참조해야 할 경우에는 `getComputedStyle` 메서드를 사용합니다.

    `window.getComputedStyle(element[,pseudo])` 메서드는 첫 번째 인수로 전달한 요소 노드에 적용되어 있는 평가된 스타일을 `CSSStyleDeclaration`객체에 담아 반환합니다.

    해당 메서드의 두 번째 인수로 :after :before와 같은 의사요소를 지정하는 문자열을 전달할 수 있습니다. 의사 요소가 아닌 일반 요소의 경우 두 번째는생략합니다.

    <aside>
    💡 평가된 스타일
    요소 노드에 적용되어 있는 모든 스타일. 즉 링크 스타일, 임베딩 스타일, 인라인 스타일, JS에서 적용한 스타일, 상속된 스타일 등 모든 스타일이 조합되어 최종적으로 적용된 스타일을 의미한다.

    </aside>

## 9. DOM 표준

HTML과 DOM 표준은 2개의 업체에서 공통된 표준을 만들었지만 어느순간 부터 다른 결과물이 나타나기 시작했습니다. 하지만 최근에 주류 브라우저 주도 하에 WHATWG의 단일 표준으로 통일했습니다.

DOM은 다음과 같은 4개의 레벨이 있습니다.

| 레벨        | URL                                     |
| ----------- | --------------------------------------- |
| DOM Level 1 | https://www.w3.org/TR/REC-DOM-Level-1/  |
| DOM Level 2 | https://www.w3.org/TR/DOM-Level-2-Core/ |
| DOM Level 3 | https://www.w3.org/TR/DOM-Level-3-Core/ |
| DOM Level 4 | https://dom.spec.whatwg.org             |
