# 비동기프로그래밍

## 1. 동기 처리와 비동기 처리

앞서 실행 컨텍스트에서 알 수 있듯이, 실행 컨텍스트 스택에 컨텍스트들이 순서대로 쌓이고 빠져나가는 LIFO 형식으로 처리가 됩니다. 이것이 자바스크립트의 실행 원리입니다. 그리고 자바스크립트는 단 한 개의 실행 컨텍스트 스택을 갖습니다. 일처리를 스택에 쌓여있는 순서대로 처리가 된다는 것입니다. 즉, 싱글 스레드 방식으로 동작합니다.

싱글 스레드 방식으로 동작하기 때문에 만약에 앞에 있는 동작이 시간이 오래걸린다면, 그 다음 동작들은 그 시간만큼 지연되는 블로킹이 발생합니다. 이처럼 실행중인 태스크가 종료할 때까지 다음 태스크가 대기하는 방식을 **동기처리**라고 합니다. 동기처리는 실행 순서가 보장된다는 장점이 있지만, 앞선 태스크가 종료할 때까지 이후 태스크들이 블로킹되는 단점이 있습니다.

앞서 타이머에서 setTimeout 함수는 비동기 처리라고 언급한 적이 있습니다. setTimeout 함수와 같이 현재 실행중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식을 **비동기 처리** 라고 합니다. 비동기 처리는 동기처리의 장점과 단점이 서로 뒤바뀝니다.

비동기 처리를 수행하는 함수는 콜백 패턴을 사용합니다. 비동기 처리는 이벤트 루프와 태스크 큐와 깊은 관계가 있으며, **타이머함수인 setTimeout,setInterval, HTTP 요청, 이벤트 핸들러 등이 비동기 처리 방식으로 동작**합니다.

## 2. 이벤트 루프와 태스크 큐

자바스크립트는 싱글 스레드가 특징이라고 앞서 언급했지만, 브라우저에서 동작하는 것을 보면 싱글 스레드로 동작하지 않는 경우가 있습니다.

-   HTTP 요청을 통해 서버로부터 데이터를 가지고 오면서 렌더링
-   HTML 요소가 애니메이션 효과를 통해 움직이면서 이벤트 처리

위 2가지 말고도 여러가지 사례가 있습니다. 이처럼 싱글 스레드를 특징으로 하는 자바스크립트에게서 동시성을 지원하는 것은 **이벤트 루프**입니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be6dead3-d07f-4855-80ba-b331a1c39479/Untitled.png)

위 이미지는 이벤트 루프와 브라우저 환경을 나타내는 이미지입니다. 이미지에서 보면 알 수 있듯이 자바스크립트 엔진은 크게 2개 영역으로 구분됩니다.

-   콜 스택
    소스코드 평가 과정에서 생성된 실행 컨텍스트가 추가되고 제거되는 실행 컨텍스트 스택을 콜 스택 이라고 한다.
    함수를 호출하면 함수 실행 컨텍스트가 순차적으로 콜 스택에 푸시되어 실행된다. 자바스크립트 엔진은 한 개의 콜 스택만을 지원하기 때문에 최상위 실행 컨텍스트가 종료되어 콜 스택에서 제거되기 전까지는 어떤 태스크도 실행되지 않는다.
-   힙
    객체가 저장되는 메모리 공간이다. 실행 컨텍스트는 힙에서 객체를 참조한다. 메모리에 값을 저장하려면 그 크기를 알아야 하지만 객체는 크기가 정해져 있지 않기때문에 동적 할당 해야한다. 따라서 **힙은 구조화 되어있지 않다는 특징**이 있다.

자바스크립트 엔진은 단순히 태스크가 요청되면 콜 스택을 통해 요청된 작업을 순차적으로 실행할 뿐입니다. 비동기 처리에서 소스코드의 평가와 실행을 제외한 모든 처리는 브라우저 혹은 Node.js가 담당합니다.

예를들어 setTimeout 함수의 콜백 함수 평가와 실행은 자바스크립트 엔진이 담당하지만 호출 스케줄링을 위한 타이머 설정과 함수 등록은 브라우저 또는 Node.js가 담당합니다. 이를 위해 태스크 큐와 이벤트 루프를 제공합니다.

-   태스크 큐
    비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역.
-   이벤트 루프
    이벤트 루프는 콜 스택에 현재 실행중인 실행 컨텍스트가 있는지, 그리고 태스크 큐에 대기중인 함수가 있는지 반복해서 확인한다. 만약 콜스택이 비어있고, 태스크 큐에 대기중인 함수가 있다면 이벤트 루프는 순차적(FIFO)으로 태스크 큐에 있는 함수를 콜 스택으로 이동시킨다. 즉, 태스크 큐에 일시 보관된 함수는 비동기적으로 처리된다.

다음 코드를 통해 비동기 프로그래밍이 어떻게 작동하는지 확인해보겠습니다.

```jsx
let dateTime = Date.now();
function foo(timeOut) {
    console.log(`${timeOut ? "timeOut:" : ""}foo`, dateTime - Date.now());
}

function bar() {
    console.log("bar", dateTime - Date.now());
}

setTimeout(foo, 0, true); // 4: timeOut:foo -4800 ~ -5200
bar(); // 1: bar 0

function sleep(callback, delay) {
    const dateTimee = Date.now() + delay;

    while (Date.now() < dateTimee);

    callback();
}

sleep(foo, 4 * 1000); // 2: foo -4000
bar(); // 3: foo -4000
```

1. 전역 코드 평가
2. 실행 컨텍스트 콜 스택에 푸시
3. setTimeout 함수 호출 (setTimeout 함수 실행 컨텍스트 생성 후 실행중인 실행 컨텍스트가 됨)
   WebAPI인 타이머 함수도 함수이므로 함수 실행 컨텍스트를 생성
4. setTimeout 함수가 실행되고 콜백 함수를 호출 스케줄링하고 종료되어 콜 스택에서 팝됨.
   이때 타이머 설정과 타이머가 완료되면 콜백 함수를 태스크 큐에 푸시하는 것은 브라우저 역할
5. 브라우저가 수행하는 5-1과 자바스크립트 엔진이 수행하는 5-2는 병행 처리

    5-1. 브라우저는 **타이머를 설정하고 만료를 기다림**. 타이머가 만료되면 콜백 함수 foo가 태스크 큐에 푸시. **delay 시간 후 콜백함수 foo가 태스크 큐에 푸시되어 대기**. 지연시간 이후 콜 스택이 비워져야지 태스크 큐에서 호출이 되야 함수 실행 가능

    5-2. bar 함수가 호출되어 실행 컨텍스트가 되고 콜 스택에 푸시되어 실행중인 실행 컨텍스트가 됨. → sleep 함수가 실행되어 4000ms 간 대기했다가 콜백 함수가 실행 → 동시에 bar 함수가 실행 **이 3가지 함수가 실행 되기 전까지 setTimeout함수에 있는 콜백 함수는 태스크 큐에서 대기중**

6. 전역 코드 실행이 종료되고 전역 실행 컨텍스트가 콜 스택에서 팝됨. 즉, 콜 스택이 비워짐.
7. 이벤트 루프에 의해 콜 스택이 비워져 있음을 감지하고 태스크 큐에서 대기중인 콜백 함수를 이벤트 루프에 의해 콜 스택에 푸시. 콜백 함수 실행 컨텍스트가 생성되고 콜 스택에 푸시되어 실행중인 실행 컨텍스트가 됨. 이후 콜백 함수가 종료되고 콜 스택에서 팝됨.

이처럼 setTimeout의 콜백 함수는 태스크 큐에서 대기하다가 콜 스택이 비게되면 그때 콜 스택에 푸시되어 실행됩니다. 태스크 큐에 등록되지 않은 sleep 함수와 bar 함수가 실행된 이후에야 setTimeout 콜백 함수가 실행된것 처럼 **delay를 0ms 를 설정한다고 해도 일단 콜 스택이 비워져야 해당 콜백 함수가 실행되는 것을 알 수 있습니다**.

자바스크립트는 싱글 스레드 방식으로 동작합니다. 이때 싱글 스레드로 동작하는 것은 브라우저가 아니라 브라우저에 내장된 자바스크립트 엔진이라는 것을 알아야 합니다. 즉 **자바 스크립트 엔진은 싱글 스레드로 동작하지만 브라우저는 멀티 스레드로 동작합니다.**

\*\*브라우저에서 타이머가 만료되어 태스크 큐에 푸시를 한다고 해도 싱글 스레드로 동작하는 자바스크립트의 콜 스택이 비워져 있지 않는다면 해당 코드는 실행되지 않습니다