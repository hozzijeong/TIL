# 제너레이터와 async/await

## 1. 제너레이터란?

제너레이터의 특징은 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수입니다. 일반 함수와의 차이는 다음과 같습니다.

-   제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
    일반 함수를 호출하면 제어권이 함수에게 넘어가고 함수 코드를 일괄 실행합니다. 제너레이터 함수는 ㅎ마수 실행을 함수 호출자가 제어할 수 있습니다. 다시 말해 함수 호출자를 통해 함수를 일시 중지/재개 할 수 있습니다. 이는 **함수의 제어권을 함수가 독점하는 것이 아니라 함수 호출자에게 양도(yield)할 수 있다는 것을 의미**합니다.
-   제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
    일반 함수를 호출하면 매개변수를 통해 함수 외부에서 값을 받고 함수 코드를 일괄 실행하여 결과값을 함수 외부로 반환합니다. 즉, 함수가 실행되고 있는 도중에는 함수 외부에서 내부로 값을 전달하여 함수 상태를 변경할 수 없습니다. 하지만 제너레이터는 함수 호출자와 양방향으로 함수의 상태를 주고받을 수 있습니다. **제너레이터 함수는 함수 호출자에게 상태를 전달할 수 있고 함수 호출자로부터 상태를 전달받을 수도 있습니다.**
-   제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
    **제너레이터 함수는 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 이터레이터인 제너레이터 객체를 반환합니다.**

## 2. 제너레이터 함수의 정의

제너레이터 함수는 `function*` 키워드로 선언합니다. 그리고 하나 이상의 `yield`표현식을 포함합니다. 이것을 제외하면 일반 함수를 정의하는 방법과 같습니다.

```jsx
// 함수 선언
function* getDecFunc() {
    yield 1;
}
// 함수 표현
const getExpFunc = function* () {
    yield 1;
};
// 메서드
const obj = {
    *getObjMethod() {
        yield 1;
    },
};
// 클래스 메서드
class Myclass {
    *getClsMethod() {
        yield 1;
    }
}
```

애스터리스크(\*)의 위치는 function 키워드와 함수 이름 사이면 어디든지 상관 없지만, 일관성을 유지하기 위해 function 키워드 바로 뒤에 붙이는 것을 권합니다.

-   제너레이터 함수는 함수로 정의할 수 없습니다.
-   제너레이터 함수는 new 연산자와 함께 생성자 함수로 호출할 수 없습니다.

## 3. 제너레이터 객체

제너레이터 함수는 제너레이터 객체를 생성합니다. 제너레이터 객체는 이터러블이면서 이터레이터 입니다. 즉, 제너레이터 객체는 Symbol.iterator 메서드를 상속받는 이터러블 이면서 value,done 프로퍼티를 갖는 이터레이터 객체를 반환하는 next 메서드를 소유하는 이터레이터 입니다. 제너레이터 객체는 이미 이터레이터이기 때문에 Symbol.iterator 메서드를 통해 이터레이터를 별도로 생성할 필요가 없습니다.

제너레이터 객체는 이터레이터에는 없는 return 과 throw 메서드를 갖습니다.

-   next 메서드를 호출하면 제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고, yield된 값을 value 프로퍼티 값으로 false를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환합니다.
-   return 메서드를 호출하면 인수로 전달받은 값을 value 프로퍼티 값으로, true를 done 프로퍼티값으로 갖는 이터레이터 리절트 객체를 반환합니다.
-   throw 메서드를 호출하면 인수로 전달받은 에러를 발생시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환합니다.

```jsx
// 함수 선언
function* genFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (e) {
        console.error(e);
    }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.return("End!")); // {value: 'End!', done: true}
console.log(generator.throw("Error!")); // {value: undefined, done: true}
```

## 4. 제너레이터의 일시 중지와 재개

제너레이터는 yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있습니다. 제너레이터 함수는 호출자에게 제어권을 양도하여 필요한 시점에 함수 실행을 재개합니다.

제너레이터 함수는 함수를 실행시키는 것이 아니라 제너레이터 객체를 반환한다고 했습니다. 하지만 함수를 아예 실행시키지 않는 것이 아니라 yield 표현식 까지만 실행합니다. **yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환합니다.**

```jsx
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.next()); // {value: 2, done: false}
console.log(generator.next()); // {value: 3, done: false}
console.log(generator.next()); // {value: undefined, done: true}
```

앞서 말했듯이 yield 표현식 가지 실행되고 함수가 일시중지 됩니다. 이때 함수 제어권이 호출자(위 코드에서는 변수 `generator`로 양도됩니다.) 이후 필요한 시점에 호출자가 다시 next 메서드를 호출하면 일시중지된 부분부터 함수가 재개 되어 다음 yield 표현식까지 실행되고 다시 중지됩니다.

이때 next 메서드는 value/done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환합니다. value에는 yield된 값이 할당되고 done에는 제너레이터가 끝까지 실행되었는지를 나타내는 불리언 값이 할당됩니다.

제너레이터 객체의 next 메서드에는 인수를 전달할 수 있습니다. **제너레이터 객체의 next 메서드에 전달한 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당**됩니다. yield 표현식을 할당받는 변수에 yield 표현식의 평가 결과가 할당되지 않는 것에 주의해야 합니다.

```jsx
function* genFunc() {
    /*
    첫 next 메서드 호출 시 yield 표현식까지 실행되고 일시 중지
    이때 yield된 값은 next 메서드가 반환하는 value에 할당
    x 프로퍼티에는 아무것도 할당되지 않음
    */
    const x = yield 1;
    console.log(x); // 1번째 next를 호출했을 때 아무것도 찍히지 않음.
    /*
    두 번째 next 호출때 전달받은 10은 x에 할당됨. 즉 const x = yield 1; 식은 두 번째 next 호출때 완료됨
    */
    const y = yield x + 10;
    /*
    세 번째 next 호출때 전달받은 인수 20이 y에 할당됨. 
    const y = yield (x+10);는 세 번째 next 호출에서야 완료됨
    세 번째 호출하면 더 이상의 yield가 존재하지 않아 함수가 끝까지 실행됨
    제너레이터 함수의 반환값 x+y는 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당됨.
    일반적으로 제너레이터의 반환값은 의미가 없음.
    return 은 종료의 의미로만 사용
    */
    return x + y;
}

const generator = genFunc(0);

let res = generator.next();
console.log(res); // 1

res = generator.next(10);
console.log(res); // 20

res = generator.next(20);
console.log(res); // 30
```

함수 호출자는 next 메서드를 통해 yield 표현식까지 함수를 실행시켜 제너레이터 객체가 관리하는 상태를 꺼내올 수 있고, 인수를 전달해서 객체 상테를 밀어 넣을 수도 있습니다. 이러한 제너레이터의 특성을 활용하면 비동기처리를 동기 처리처럼 구현할 수 있습니다.

## 5. 제너레이터 활용

### 1. 이터러블의 구현

제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간단히 이터러블을 구현할 수 있습니다.

```jsx
const infiniteFibonacci = (function* () {
    let [pre, cur] = [0, 1];

    while (true) {
        [pre, cur] = [cur, pre + cur];
        yield cur;
    }
})();

for (const num of infiniteFibonacci) {
    if (num > 10000) break;
    console.log(num);
}
```

### 2. 비동기 처리

제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있습니다. 이러한 특성을 활용하면 then/catch/finally 없이 비동기 처리 결과를 반환하도록 구현할 수 있습니다.

```jsx
const async = (generatorFunc) => {
    const generator = generatorFunc(); // 2

    const onResolved = (arg) => {
        const result = generator.next(arg); // 5

        return result.done
            ? result.value // 9
            : result.value.then((res) => onResolved(res)); // 7
    };
    return onResolved; // 3
};

async(function* fetchTodo() {
    // 1
    const url = "";

    const response = yield fetch(url); // 6
    const todo = yield response.json(); // 8
    console.log(todo);
})(); // 4
```

위 예제는 다음과 같이 동작합니다.

1. (1)이 발생하면 인수로 전달받은 제너레이터 함수를 호출하여 제너레이터 객체를 생성하고(2) onResolved 함수를 반환(3) 합니다. onResolved 함수는 상위 스코프의 generator 변수를 기억하는 클로저입니다. async 함수가 반환한 함수를 즉시 호출(4) 하여 (2)에서 생성한 제너레이터 객체의 next 메서드를 호출(5) 합니다.
2. next 메서드가 호출되면(5) 첫 번째 yield문(6) 까지 실행됩니다. 아직 제너레이터 함수가 끝까지 실행되지 않았다면 onResolved 함수에 첫 번째 yield된 함수가 반환한 프로미스가 reseolve된 Response 객체를 인수로 전달하며 재귀호출(7) 합니다.
3. onResolved 함수에 인수로 전달된 Response 객체를 next 메서드에 인수로 전달하면서 next 메서드를 두 번째로 호출(5) 합니다. 이 때 제너레이터 함수 fetchTodo의 두 번째의 yield 문(8)까지 실행됩니다.
4. 아직 제너레이터 함수가 끝까지 실행되지 않았다면 response.json 메서드가 반환한 프로미스가 resolve 한 todo 객체를 onResolved 함수에 인수로 전달하면서 재귀 호출(7) 합니다.
5. todo 객체를 next 메서드에 인수로 전달하면서 next 메서드를 세 번째로 호출(5) 합니다. 제너레이터 ㅎ마수에 todo 변수(8)에 할당되고 제너레이터 함수가 끝까지 실행됩니다.
6. 제너레이터 함수가 끝까지 실행된다면 undefiend를 반환하고(9) 처리를 종료합니다.

### 6. async/await

async/await은 제너레이터 보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 구현할 수 있는 기능입니다.

async/await는 프로미스를 기반으로 동작합니다. async/await를 사용하면 후속 처리할 필요 없이 동기 처리처럼 프로미스를 사용할 수 있습니다.

### 1. async 함수

await 키워드는 반드시 async 함수 내부에서 사용해야 합니다. async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환합니다. async 함수가 명시적으로 프로미스를 반환하지 않더라도 async ㅎ마수는 암묵적으로 반환값을 resolve하는 프로미스를 반환합니다.

```jsx
async function foo(n) {
    return n;
}
const bar = async function (n) {
    return n;
};
const baz = async (n) => n;
const obj = {
    async foo(n) {
        return n;
    },
};
class MyClass {
    async bar(n) {
        return n;
    }
}
```

**\*인스턴스를 반환하는 클래스의 constructor 메서드는 프로미스를 반환해야 하는 async 메서드가 될 수 없습니다.**

### 2. await 키워드

await 키워드는 프로미스 상태가 settled 상태가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환합니다. await 키워드는 반드시 프로미스 앞에서 사용해야 합니다.

```jsx
const getGithubUserName = async (id) => {
    const res = await fetch("");
    const { name } = await res.json();
    console.log(name);
};
```

fetch 함수가 수행한 HTTP 요청에 대한 서버의 응답이 도착해서 fetch 함수가 반환한 프로미스가 settled 상태가 될 때까지 res는 대기하게 됩니다. 이후 **프로미스가 settled 상태가 되면 프로미스가 resolve한 처리 결과가 res 변수에 할당됩니다.**

모든 프로미스에 await 키워드를 사용하는 것보다, 프로미스 처리에 있어 순서가 보장되어야 하는 경우에 await키워드를 사용한다면 더욱 좋습니다.

### 3. 에러 처리

비동기 처리를 위한 콜백 패턴의 단점 중 가장 심각한 것은 에러처리가 곤란하다는 것입니다. 에러는 콜 스택의 아래방향(실행중인 실행 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파됩니다. 하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 try...catch 문을 사용할 수 없습니다.

하지만, async/await에서 에러 처리는 try...catch문을 사용할 수 있습니다.

```jsx
const foo = async () => {
    try {
        const url = "";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
};
```

위 예제는 HTTP 통신에서 발생한 네트워크 에러 뿐만 아니라 try 코드 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있습니다.

**async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject 하는 프로미스를 반환합니다.** 따라서 async 함수를 호출하고 Promise.prototype.catch 후속 메서드를 사용해 에러를 캐치할 수 있습니다.
