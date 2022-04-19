# 프로미스

비동기 처리를 위한 패턴으로 콜백 함수를 사용했었습니다. 콜백 함수는 다양한 안티 패턴들을 발생 시키는데, 그러한 패턴들을 보완하기 위해 나온 기능이 프로미스입니다. 프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하고 비동기 처리 시점을 명확하게 표현할 수 있는 장점이 있습니다.

## 1. 비동기 처리를 위한 콜백 패턴의 단점

### 1. 콜백 헬

```jsx
let jsonData = {};
const get = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    let obj = {};
    xhr.onload = () => {
        if (xhr.status === 200) {
            obj = JSON.parse(xhr.response);
            jsonData = JSON.parse(xhr.response);
        } else {
            console.log(xhr.status, xhr.statusText);
        }
    };
    return obj;
};
const data = get("https://jsonplaceholder.typicode.com/posts/1");
console.log(data, jsonData); // {} {}
```

get 함수는 비동기 함수입니다. 비동기 함수로 호출하면, **함수 내부의 비동기로 동작하는 코드가 완료되지 않았다고 해도 기다리지 않고 즉시 종료됩니다.** 즉, 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료됩니다. 따라서 비동기로 동작하는 코드의 처리 결과를 외부로 반환하거나 상위 스코프 변수에 할당을 기대할 수 없습니다. (get 함수가 종료된 이후 xhr처리가 완료되어서 get이 반환하는 객체가 빈 객체를 반환함.)

위 코드에서 상위 스코프에 있는 변수 jsonData에 xhr의 결과값을 할당했지만, 그 결과는 최초 할당했던 값과 다르지 않습니다. 이는 실행 컨텍스트 관점에서 보면 알 수 있습니다. onload에 바인딩 된 이벤트 핸들러는 즉시 실행되지 않습니다. **태스크 큐에 대기하고 있다가 콜 스택이 비워지면 그 때 실행**이 됩니다. 따라서 **jsonData를 찍는 순간은 서버의 응답 결과를 할당하기 전에 호출되어 기존에 있던 빈 객체가 출력됩니다.**

이처럼 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당할 수도 없습니다. 따라서 비동기 함수 처리결과에 대한 후속 처리는 비동기 함수 내부에서 수행해야 합니다. 이에 따라 비동기 함수의 범용성을 위해 비동기 처리 결과에 대한 후속 처리를 콜백 함수로 전달하는 것이 일반적입니다.

**콜벡 헬**이란 콜백 함수를 통해 후속 처리를 수행하는 비동기 함수가 해당 콜백 함수의 결과를 가지고 또 다른 콜백 처리를 통해 비동기 함수를 호출할 때 나타나는 문제점으로 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상을 의미합니다. 즉, id → detail → detail_id 등의 여러 개의 API를 검색할 때 해당 값들을 파라미터로 넘겨주면서 계속해서 콜백 함수를 호출할 때 나타나는 것이 콜백 헬입니다.

### 2. 에러 처리의 한계

콜백 패턴의 또 다른 문제점은 에러 처리가 곤란하다는 점입니다.

```jsx
try {
    setTimeout(() => {
        throw new Error("error");
    }, 1000);
} catch (e) {
    console.error(e);
}
```

try 블록에서 1초뒤에 에러가 생성되지만 error 구문에서 해당 에러가 캐치되지 않습니다. setTimeout 함수의 콜백 함수가 실행될 때 setTimeout함수는 이미 콜 스택에서 제거된 상태입니다. 이것은 setTimeout 함수의 콜백 함수를 호출한 것이 setTimeout 함수가 아니라는 것을 의미합니다. setTimeout 함수의 콜백 함수의 호출자가 setTimeout 함수라면 콜 스택의 현재 실행중인 실행 컨텍스트가 콜백 함수의 실행 컨텍스트일 때 현재 실행중인 실행 컨텍스트의 하위 실행 컨텍스트가 setTimeout 함수여야 합니다. 즉 위에서 언급했듯이, **setTimeout 함수가 콜 스택에 존재할 때, 콜백함수가 실행되어야지 try...catch 블록에서 에러가 캐치**됩니다.

에러는 호출자 방향으로 전파됩니다. 즉 콜 스택의 아래 방향으로 전파됩니다. 하지만 setTimeout 함수의 콜백 함수를 호출한 것은 setTimeout 함수가 아니기 때문에 setTimeout 함수와 콜백함수가 발생시킨 에러는 catch 블록에서 잡히지 않습니다.

## 2. 프로미스의 생성

Promise 생성자 함수를 new 연산자와 함께 호출하면 프로미스를 생성합니다. (객체) Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는데, 이 콜백 함수는 resolve와 reject 함수를 인수로 전달받습니다.

```jsx
const promiseGet = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error("Error: ", xhr.status));
            }
        };
    });
};
const data = promiseGet("https://jsonplaceholder.typicode.com/posts/1");
console.log(data); //Promise
```

Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행하고, 처리가 어떻게 진행되는지 나타내는 상태 정보를 갖습니다. 즉, 프로미스는 **비동기 처리 상태와 처리 결과를 관리하는 객체**입니다.

| 프로미스의 상태 정보 | 의미                                  | 상태 변경 조건                   | 결과      |
| -------------------- | ------------------------------------- | -------------------------------- | --------- |
| pending              | 비동기 처리가 아직 수행되지 않은 상태 | 프로미스가 생성된 직후 기본 상태 | undefined |
| fulfilled            | 비동기 처리가 수행된 상태(성공)       | resolve(value) 함수 호출         | value     |
| rejected             | 비동기 처리가 수행된 상태(실패)       | reject(error) 함수 호출          | error     |

위와 같이 **프로미스의 상태는 resolve 또는 reject 함수를 호출하는 것으로 결정**됩니다.

fulfilled 혹은 rejected 된 상태(비동기 처리가 수행된 상태)를 settled 상태라고 합니다. 한번 settled 상태가 되면 더는 다른 상태로 변화할 수 없습니다.

## 3. 프로미스의 후속 처리 메서드

프로미스가 settled 상태가 된다면 그 이후에 무슨 행동을 할 것인지 처리를 해야합니다. **프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달할 콜백 함수가 선택적으로 호출**됩니다. 모든 후속 처리 메서드는 프로미스를 반환하며, 비동기로 동작합니다. 후속 처리 메서드는 다음과 같습니다.

-   Promise.prototype.then
    then 메서드는 두 개의 콜백 함수를 인수로 전달받습니다.
    -   첫 번째 콜백 함수는 fulfilled 상태가 되면 호출됩니다. 이때 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달 받습니다.
    -   두 번째 콜백 함수는 rejected 상태가 되면 호출됩니다. 이때 콜백 함수는 프로미스의 에러를 인수로 전달 받습니다.
    즉, 첫 번째 콜백 함수는 비동기 처리가 성공했을 때 호출되는 성공 처리 콜백 함수이며, 두 번째 콜백 함수는 비동기 처리가 실패했을 때 호출되는 실패 처리 콜백 함수입니다.
    **then 메서드는 언제나 프로미스를 반환**합니다. 만약 then 메서드의 콜백함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고, 콜백 함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 resolve 또는 reject 하여 프로미스를 생성해 반환합니다.
-   Promise.prototype.catch
    catch 메서드는 한 개의 콜백 함수를 인수로 전달받습니다. catch 메서드의 콜백 함수는 프로미스가 rejected상태인 경우만 호출됩니다. catch 메서드는 then과 동일하게 동작합니다. 따라서 언제나 프로미스를 반환합니다.
-   Promise.prototype.finally
    finally 메서드는 한 개의 콜백 함수를 인수로 전달받습니다. finally 메서드의 콜백 함수는 프로미스의 결과에 상관없이 무조건 한 번 호출됩니다. 따라서 finally 메서드는 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용합니다. finally 역시 프로미스를 반환합니다.
    ```jsx
    const promiseGet = (url) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.send();
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(new Error("Error: ", xhr.status));
                }
            };
        });
    };
    const data = promiseGet("https://jsonplaceholder.typicode.com/posts/1");
    data.then((val) => console.log(val))
        .catch((e) => console.error(e))
        .finally(() => console.log("Bye"));
    ```

## 4. 프로미스의 에러 처리

프로미스의 후속 처리에서 보았듯이 then의 두 번째 콜백 함수 사용, catch 메서드 사용 등을 통해 에러처리를 할 수 있습니다.

-   then 메서드
    -   첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못함
    -   코드가 복잡해져서 가독성이 좋지 않음
-   catch 메서드
    -   then 메서드 호출 이후 호출했을 경우 비동기 처리에서 발생한 에러 뿐만 아니라 then 내부에서 발생한 에러까지 캐치 가능
    -   가독성 높음

위와 같은 특징으로 인해 프로미스의 에러처리는 catch 메서드를 사용하는 것을 권장하고 있습니다.

## 5. 프로미스 체이닝

```jsx
const URL = "https://jsonplaceholder.typicode.com";
promiseGet(`${URL}/posts/1`)
    .then(({ userId }) => promiseGet(`${URL}/users/${userId}`))
    .then((userInfo) => console.log(userInfo))
    .catch((e) => console.error(e));
```

위 코드에서 then → then → catch 형식으로 .을 통해 프로미스 메서드를 호출하여 후속 처리 하는 것을 프로미스 체이닝이라고 합니다. then,catch,finally 메서드 모두 프로미스 객체를 반환하기 때문에 가능한 기능입니다.

프로미스 체이닝을 사용하면, 비동기 처리결과를 인수로 전달받아 처리하므로, 콜백 패턴에서 발생했던 것 만큼 콜백 헬이 발생하지는 않습니다. 하지만 그렇다고 콜백함수를 사용하지 않는 것은 아닙니다. 이후에 async/await을 사용한다면 프로미스 후속 처리 메서드를 사용하지 않고 동기 처리 처럼 프로미스 처리 결과 반환이 가능합니다.

## 6. 프로미스의 정적 메서드

### 1. Promise.resolve/Promise.reject

두 메서드는 이미 존재하는 값을 래핑하여 프로미슬르 생성하기 위해 사용합니다.

```jsx
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); //[1,2,3]

const rejectedPromise = Promise.reject(new Error("Error"));
rejectedPRomise.catch(console.log); // Error:Error
```

### 2. Promise.all

Promise.all 메서드는 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용됩니다.

```jsx
const data1 = () =>
    new Promise((resolve) => setTimeout(() => resolve(1), 3000));
const data2 = () =>
    new Promise((resolve) => setTimeout(() => resolve(2), 2000));
const data3 = () =>
    new Promise((resolve) => setTimeout(() => resolve(3), 1000));
const res = [];

data1()
    .then((data) => {
        res.push(data);
        return data2();
    })
    .then((data) => {
        res.push(data);
        return data3();
    })
    .then((data) => {
        res.push(data);
        console.log(res); // 약 6초 소요
    })
    .catch((e) => console.error(e));

Promise.all([data1(), data2(), data3()]).then(console.log); // 약 3초 소요
```

위 예제는 세 개의 비동기 처리를 순차적으로 처리합니다. 하지만, 세 개의 비동기 처리는 서로 의존하지 않고 개별적으로 수행됩니다. 즉, 앞선 비동기 처리 결과를 다음 비동기 처리에 적용하지 않습니다. 따라서 위 경우는 비동기 처리를 순차적으로 진행시킬 필요가 없습니다.

Promise.all 메서드는 인수로 프로미스를 요소로 갖는배열 등의 이터러블을 인수로 전달받습니다. 그리고 **전달 받은 프로미스가 모두 fulfilled 상태가 되면 모든 처리 결과를 배열에 저장해 새로운 프로미스를 반환**합니다.

해당 메서드는 순차적으로 실행되는 것이 아니라 병렬적으로 처리를 하기 때문에 3000ms 보다 조금 더 소요됩니다. 만약에 첫 번째 프로미스가 가장 늦게 fulfilled 상태가 되어도 인수로 전달받은 배열의 순서대로 resolve 하는 새로운 프로미스를 반환합니다. 즉 순서가 보장됩니다.

Promise.all 메서드는 인수로 전달 바은 배열의 프로미스가 하나라도 rejected 상태가 되면 **나머지 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료**됩니다.

### 3. Promise.allSettled

Promise.allSettled 메서드는 프로미스를 요소로 갖는 이터러블을 인수로 받습니다. 그리고 전달받은 프로미스가 모두 settled 상태가 되면 처리 결과를 배열로 반환합니다.

```jsx
Promise.allSettled([
    new Promise((resolve) => setTimeout(() => resolve(1), 2000)),
    new Promise((_, rejected) =>
        setTimeout(() => rejected(new Error("error"), 1000)),
    ),
]).then(console.log);
```

프로미스 처리 결과를 나타내는 객체는 다음과 같습니다.

-   프로미사가 fulfilled 상태인 경우 비동기 처리 상태를 나타내는 status 프로퍼티와 처리 결과를 나타내는 value 프로퍼티를 갖는다.
-   프로미스가 rejected 상태인 경우 비동기 처리 상태를 나타내는 status 프로퍼티와 에러를 나타내는 reason 프로퍼티를 갖는다.

## 7. 마이크로태스크 큐

```jsx
setTimeout(() => console.log(1), 0);

Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));
// 2->3->1 순서로 출력
```

프로미스의 후속 처리 메서드도 비동기로 동작하므로 1→2→3 순으로 출력될 것처럼 보이지만 사실은 그렇지 않습니다. 왜냐하면 **프로미스의 후속 처리 메서드의 콜백함수는 태스크 큐가 아닌 마이크로태스크 큐에 저장되기 때문입니다.**

마이크로태스크 큐는 태스크 큐와 별도의 큐입니다. 마이크로태스크 큐에는 프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장되고, 그 외의 비동기 함수의 콜백 함수 혹은 이벤트 핸들러는 태스크 큐에 저장됩니다.

두 큐의 역할은 비슷하지만 **마이크로태스크 큐는 태스크 큐보다 우선순위가 높습니다**. 즉 마이크로태스크 큐에 대기하고있는 함수가 콜 스택에 먼저 호출되어 실행됩니다.

## 8. fetch

fetch 함수는 XMLHttpRequest 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API입니다. fetch 함수는 XMLHttpRequest 객체보다 사용법이 간단하고 프로미스를 지원하기 때문에 비동기 처리르 위한 콜백 패턴의 단점에서 자유롭습니다.

```jsx
const promise = fecth(url [,options])
```

**fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환합니다.**

```jsx
fetch(`${JSONURL}/todos/1`).then((res) => console.log(res));
```

Response.prototype 에는 Response 객체에 포함되어 있는 HTTP 응답 몸체를 위한 다양한 메서드를 제공합니다. Response.prototype.json 메서드에는 Response 객체에서 HTTP 응답 몸체를 취득하여 역직렬화 되어있습니다.

fetch 함수에 첫 번째 인수로 HTTP 요청을 전송할 URL과 두 번째 인수로 HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체를 전달합니다.

```jsx
const request = {
    get(url) {
        return fetch(url);
    },
    post(url, payload) {
        return fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
        });
    },
    patch(url, payload) {
        return fetch(url, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
        });
    },
    delete(url) {
        return fetch(url, { method: "DELETE" });
    },
};
```

fetch 함수에 대한 더 자세한 내용은 MDN의 ‘[Using Fetch](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)’ 페이지를 참고하면 좋습니다.
