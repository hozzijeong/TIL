# 타이머

## 1. 호출 스케줄링

함수를 명시적으로 호출한다면 즉시 실행되지만, 일정 시간이 지난 뒤, 함수를 실행 하도록 예약 하기 위해 타이머 함수를 사용합니다. 이처럼, 함수의 호출 타이밍을 조절하는 것을 **호출 스케줄링** 이라고 합니다.

타이머 함수는 브라우저와 Node.js 환경에서 전역적으로 사용이 가능한 호스트 객체입니다. 자바 스크립트 엔진은 하나의 실행 컨텍스트 스택을 갖기 때문에 싱글 시레드로 동작합니다. 이러한 이유 때문에 **타이머 함수는 비동기 처리 방식으로 동작**하게 됩니다.

## 2. 타이머 함수

### 1. setTimeout / clearTimeout

```jsx
const timeoutId = setTimeout(func|code[,delay,param1,param2,...])
```

setTimeout 함수는 delay시간이 완료 된 후에 func를 호출하고, 3번째 인자 이후 부터는 func에 전달될 인수를 전달 받습니다. **setTimeout 함수는 delay 시간 이후 단 한번만 실행됩니다**. 또한 생성한 타이머를 식별할 수 있는 고유한 타이머 id를 반환합니다. 해당 id 는 브라우저 환경의 경우 숫자이고, Node.js 환경의 경우 객체입니다.

setTimeout 함수가 반환한 타이머 id를 사용해서 clearTimeout 함수의 인수로 전달하여 타이머를 취소할 수 있습니다.

### 2. setInterval/clearInterval

```jsx
const timeoutId = setInterval(func|code[,delay,param1,param2,...])
```

setInterval 함수는 delay 시간마다 반박되는 동작을 수행하는 타이머 함수입니다. 즉, 타이머 함수가 종료되기 전까지 콜백 함수가 반복 호출됩니다. setInterval 함수 역시 고유한 타이머 id를 반환하고, clearInterval 함수에 인수로 해당 타이머 id를 전달한다면 함수 호출 스케줄링을 취소할 수 있습니다.

```jsx
let count = 1;
const timerID = setInterval(() => {
    console.log(count);
    if (count++ === 5) clearInterval(timerID);
}, 1000);
```

## 3. 디바운스와 스로틀

[여기](https://github.com/hozzijeong/TIL/blob/master/JavaScript/Throttle%26Debounce.md)에 위 개념에 대한 약간의 설명이 있습니다.

```jsx
const $button = document.querySelector("button");
const $normal = document.querySelector(".normal-msg");
const $debounce = document.querySelector(".debounce-msg");
const $throttle = document.querySelector(".throttle-msg");
console.log($button);

const debounce = (callback, delay) => {
    let timerId;
    return (event) => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(callback, delay, event);
        // 이벤트 발생 ~ 일전 시간(delay) 사이에 발생한 타이머 함수를 전부 초기화.
    };
};

const throttle = (callback, delay) => {
    let timerId;
    return (event) => {
        if (timerId) return;
        timerId = setTimeout(
            () => {
                callback(event);
                timerId = null;
            },
            delay,
            event,
        ); // delay 이후에 callback함수 실행 후 timerId 초기화.
        // 즉 이벤트 핸들러가 실행되고 난 후, 일정 시간(delay) 사이에는 이벤트 발생을 무시합
    };
};

$button.addEventListener("click", function () {
    $normal.textContent = +$normal.textContent + 1;
});

$button.addEventListener(
    "click",
    debounce(() => {
        $debounce.textContent = +$debounce.textContent + 1;
    }, 500),
);

$button.addEventListener(
    "click",
    throttle(function () {
        $throttle.textContent = +$throttle.textContent + 1;
    }, 500),
);
```

### 1. 디바운스

짧은 시간 간격으로 발생하는 이벤트를 그룹화해서 마지막 한 번만이벤트 핸들러가 호출되도록 하는 기술입니다. 즉, 일정 시간 내에서 이벤트를 단 한번만 실행시킵니다. 이를 위해 debounce 함수가 반환한 함수는 **debounce 함수에 두번째 인수로 전달한 시간보다 짧은 간격으로 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정**합니다.

디바운스는 다음과 같이 이벤트가 연속해서 발생하다가 일정시간이 지났을 때 이벤트 핸들러가 한 번만 호출되는 경우에 사용이 됩니다.

-   resize 이벤트 처리
-   ajax요청하는 입력 필드 자동완성 UI 구현
-   버튼 중복 클릭 방지처리

### 2. 스로틀

짧은 시간 간격으로 이벤트가 연속으로 발생하더라도 일정 시간 간격으로 이벤트 핸들러가 최대 한 번만 호출되도록 하는 기술입니다. 즉, 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만드는 것입니다.

throttle 함수가 반환한 함수는 delay 시간이 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가, 해당 시간이 지났을 경우 이벤트가 발생하면 콜백 함수를 호출하고, 새로운 타이머를 재설정합니다. 즉, delay 시간 간격으로 콜백함수가 호출됩니다.

이처럼 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 일정 시간 간격으로 핸들러를 호출할 때 사용합니다.

-   scroll 이벤트 처리
-   무한 스크롤 UI 구현

디바운스와 스로틀의 경우 위 코드 보다는 실무에서 사용하는 Underscore나 Lodash 라이브러리에 있는 함수를 사용하는것이 좋습니다.
