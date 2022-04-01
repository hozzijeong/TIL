# 이터러블

## 1. 이터레이션 프로토콜

ES6에서 도입된 이터레이션 프로토콜은 순회 가능한 데이터 컬렉션(자료구조)을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙입니다.

ES6 이전에 순회 가능한 데이터 컬렉션들은 통일된 규약 없이 각각 나름의 for문, for...in문 forEach 메서드 등 순회 방법이 있었는데 ES6에서는 이렇게 순회 가능한 데이터 컬렉션들을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 동일한 기능을 사용할 수 있도록 일원화 하였습니다.

이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있습니다.

<aside>
💡 **이터러블 프로토콜**
Symbol.iterator를 프로퍼티 키로 사용한 메서드를 구현하거나 상속받은 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환합니다. 이러한 규약을 이터러블 프로토콜이라고 하고, **이터러블 프로토콜을 준수한 객체를 이터러블** 이라고 합니다.  이터러블은 for...of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상입니다.

</aside>

<aside>
💡 **이터레이터 프로토콜**
이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터를 반환합니다. 이터레이터는 next 메서드를 소유하며, next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 **이터레이터 리절트 객체를 반환**합니다. 이러한 규약을 이터레이터 프로토콜이라고 하고, **이터레이터 프로토콜을 준수한 객체를 이터레이터**라고 합니다. 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 합니다.

</aside>

1. **이터러블**

    이터러블 프로토콜을 준수한 객체를 이터러블이라고 합니다. 즉, Symbol.iterator를 프로퍼티 키로 사용한 메서드를 구현하거나, 프로토타입 체인을 통해 상속받은 객체를 의미합니다.

    이터러블인지 확인하는 함수는 다음과 같습니다.

    ```jsx
    const isIterable = (v) => {
        return v !== null && typeof v[Symbol.iterator] === "function";
    };

    console.log(isIterable([])); // true
    console.log(isIterable("")); // true
    console.log(isIterable(new Map())); // true
    console.log(isIterable(new Set())); // true
    console.log(isIterable({})); // false
    ```

    하단 이미지는 Set.prototype의 프로퍼티들 입니다. 해당 값에 Symbol.iterator가 있는 것을 확인 할 수 있습니다. 위 코드에서 true를 반환한 객체들은 Set과 같이 Symbol.iterator 프로퍼티를 가지고 있는 객체들이고 이러한 객체들은 for...of 문 스프레드 문법, 디스트럭처링 할당의 대상으로 사용이 가능합니다.

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e6a85bb-972e-446c-b453-c8b20f1c2abe/Untitled.png)

    ```jsx
    const arr = [1, 2, 3];
    console.log(Symbol.iterator in arr); // true

    //for..of
    for (const ele of arr) {
        console.log(ele); // 1,2,3
    }

    // 스프레드 문법
    console.log([...arr]); // [1,2,3]

    // 배열 디스트럭처링 할당
    const [fir, ...rest] = arr;
    console.log(fir, ...rest); // 1 2 3
    ```

    이터러블 프로토콜을 준수하지 않은 객체는 이터러블이 아닙니다. 즉, 이터러블이 사용하는 문법/특징 등을 사용할 수 없습니다. 하지만, 21년 TC39 stage 4 단계에 제안되어 있 는 스프레드 프로퍼티 제안은 일반 객체에 스프레드 문법을 허용합니다

    ```jsx
    const obj = {
        a: 1,
        b: 2,
    };

    console.log({ ...obj }); // {a:1, b:2}
    ```

2. **이터레이터**

    이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환합니다. 그리고 이터레이터는 next 메서드를 갖습니다.

    이터레이터의 next 메서드는 이터러블의 각 요소를 순회하기 위한 포인터 역할을 합니다. next 메서드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는 **이터레이터 리절트 객체를 반환합니다.**

    ```jsx
    const arr = [1, 2, 3];

    const iterator = arr[Symbol.iterator]();

    console.log("next" in iterator); // true
    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: 1, done: false}
    console.log(iterator.next()); // {value: undefined, done: true}
    ```

    이터레이터 리절트 객체에서 value 프로퍼티는 현재 순회하는 이터러블의 값을 의미하고, done 은 순회 완료 여부를 의미합니다.

즉, **이터러블**은 프로퍼티로 **Symbol.iterator 메서드를 가지고 있는 객체**를 의미하고, **이터레이터**는 **Symbol.iterator 메서드를 실행시켰을 때 반환되는 객체**를 의미합니다. 그리고 그 객체는 next 메서드를 가지고 그 **next 메서드가 반환하는 객체** **이터레이터 리절트 객체** 입니다.

## 2. 빌트인 이터러블

JS는 이터레이션 프로토콜을 준수한 빌트인 이터러블을 제공합니다.

## 3. for...of 문

for...of 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당합니다. 형태는 아래와 같습니다.

```jsx
for(변수 선언문 of 이터러블){...}
```

for...of문은 for...in 문과 유사하지만, for...in 문은 객체 프로토타입 체인에 존재하는 프로퍼티 중 프로퍼티 어트리뷰트 `[[Enumerable]]`의 값이 true인 프로퍼티를 순회하며 열거하지만 for...of 문은 내부적으로 이터레이터의 next() 메서드를 호출하여 이터러블을 순회하면서 반환하는 이터레이터 리절트 객체의 value 값을 for...of 문의 변수에 할당합니다. done 의 값이 true라면 순회를 중단합니다.

for...of 문의 내부동작을 for 문으로 표현하면 아래와 같습니다.

```jsx
const iterable = [1, 2, 3];

const iterator = iterable[Symbol.iterator]();

for (;;) {
    const res = iterator.next();

    if (res.done) break;

    console.log(res.value);
}
```

## 4. 이터러블과 유사 배열 객체

유사 배열 객체란 배열처럼 인덱스로 프로퍼티 값에 접근하고 length 프로퍼티를 갖는 객체를 의미합니다. 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문을 통해 순회가 가능합니다. 유사 배열 객체는 Symbol.iterator 메서드가 없기 때문에 for...of 문 순회가 되지 않습니다.

하지만, arguments,NodeList,HTMLCollection 등은 유사 배열 객체이면서 이터러블 입니다. ES6 이전까지는 위 3가지 객체는 유사 배열 객체로 분류되었지만, ES6에 들어오면서 해당 객체에 Symbol.iterator 메서드를 구현하여 이터러블이 되었습니다. 즉, 위 3객체는 유사 배열 객체이면서 이터리블인 객체 입니다.

## 5. 이터레이션 프로토콜의 필요성

제일 첫 번째 장에서도 언급했지만, 다양한 데이터 컬렉션들은 각자의 순회 기능을 가지고 있었습니다. 데이터 컬렉션을 데이터 공급자, 다양한 생성자 함수들을 데이터 소비자라고 명명했을 때 각자의 공급자마다 순회 방식이 다르다고 했을 때 데이터 소비자들은 공급자의 순회 방식에 맞는 방법들을 모두 지원해야 합니다. 하지만 이러한 방식은 효율적이지 않습니다. 하지만 데이터 공급자가 이터러블 프로토콜을 준수하도록 규정한다면 데이터 소비자는 이터레이션 프로토콜만 지원하도록 구현하면 됩니다.

즉, 이터레이션 프로토콜은 데이터 소비자와 데이터 공급자를 연결하는 인터페이스 역할을 합니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9733d88b-c7ae-466c-bead-0d3fb32eddbe/Untitled.png)

## 6. 사용자 정의 이터러블

1. **사용자 정의 이터러블 구현**

    일반 객체도 이터레이션 프로토콜을 준수한다면 이터러블이 될 수 있습니다. 피보나치를 이터러블을 사용하여 구현해보겠습니다.

    ```jsx
    const fibonacci = {
        [Symbol.iterator]() {
            let [pre, cur] = [0, 1];
            const max = 10;
            return {
                next() {
                    [pre, cur] = [cur, pre + cur];
                    return {
                        value: cur,
                        done: cur >= max,
                    };
                },
            };
        },
    };

    for (const num of fibonacci) {
        console.log(num);
    }

    const arr = [...fibonacci];
    console.log(arr); // [1,2,3,5,8]

    const [fir, sec, ...rest] = fibonacci;
    console.log(fir, sec, ...rest); // 1 2 3 5 8
    ```

2. **이터러블을 생성하는 함수**

    위 코드에서는 객체가 10이라는 limit을 가지고 있기 때문에 max값 설정에 있어서 자유롭지 못합니다. 원하는 만큼의 수를 인수로 받아서 해당 문제를 해결할 수 있습니다.

    ```jsx
    const fibonacci = function (max) {
        let [pre, cur] = [0, 1];

        return {
            [Symbol.iterator]() {
                return {
                    next() {
                        [pre, cur] = [cur, pre + cur];
                        return {
                            value: cur,
                            done: cur >= max,
                        };
                    },
                };
            },
        };
    };

    for (const num of fibonacci(20)) {
        console.log(num);
    }

    const arr = [...fibonacci(20)];
    console.log(arr);

    const [fir, sec, ...rest] = fibonacci(20);
    console.log(fir, sec, ...rest);
    ```

3. **이터러블이면서 이터레이터인 객체를 생성하는 함수**

    fibonacci함수는 이터러블을 반환하지만 이터레이터를 생성하기 위해서는 이터러블의 Symbol.iterator 메서드를 호출해야 합니다. 이터러블이면서 이터레이터인 객체를 생성하면 위 과정을 생략할 수 있습니다.

    ```jsx
    {
    	[Symbol.iterator](){return this},
    	next(){
    		return { value:any , done:boolean}
    	}
    }
    ```

    앞선 함수를 이터러블이면서 이터레이터인 객체러 변환한다면 다음과 같습니다.

    ```jsx
    const fibonacci = function (max) {
        let [pre, cur] = [0, 1];

        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                [pre, cur] = [cur, pre + cur];
                return {
                    value: cur,
                    done: cur >= max,
                };
            },
        };
    };

    const iter = fibonacci(10);

    for (const num of iter) {
        console.log(num);
    }

    const iter2 = fibonacci(20);

    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    ```

4. **무한 이터러블과 지연 평가**

    무한 이터러블을 생성하는 함수를 정의 했을 때, 이를 통해 무한수열을 구 현할 수 있습니다.

    ```jsx
    const fibonacci = function () {
        let [pre, cur] = [0, 1];

        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                [pre, cur] = [cur, pre + cur];
                return {
                    value: cur,
                };
            },
        };
    };

    for (const num of fibonacci()) {
        if (num > 10000) break;
        console.log(num);
    }
    ```

    이터러블은 데이터 공급자 역할을 합니다. 배열이나 모든 문자열 등은 데이터를 메모리에 미리 확보한 다음에 데이터를 공급하지만, 위 코드는 **지연평가**를 통해 데이터를 생성합니다.

    <aside>
    💡 **지연평가**
    데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가 데이터가 필요한 시점이 되면 그 때 데이터를 생성하는 기법입니다. 즉, 평가 결과가 필요할 때까지 평가를 늦추는 기법입니다.

    </aside>

    위 코드는 무한 이터러블을 생성합니다. 하지만 위 코드에서 무한 이터러블은 for...of문이나 배열 디스트럭쳐링 할당 등이 실행되기 이전까지 데이터를 생성하지 않습니다. for...of 문의 경우 이터러블을 순회할 때 내부에서 이터레이터의 next 메서드를 호출할 때 데이터가 생성됩니다. 그 전까지 데이터는 생성되지 않습니다.

    이처럼 지연 평가를 사용하면 불필요한 데이터를 미리 생성하지 않고 필요한 데이터를 필요한 순간에 생성하므로 빠른 실행 속도와 불필요한 메모리를 소비하지 않고 무한도 표현할 수 있는 장점이 있습니다.
