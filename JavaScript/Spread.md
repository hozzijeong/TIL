# 스프레드 문법

ES6에 도입된 스프레드 문법은 하나로 뭉쳐있는 여러가지 값들의 집합을 펼쳐서 개별적인 값 목록으로 만듭니다. 단, 스프레드 문법의 대상은 for...of 문으로 순회 가능한 이터러블에 한정됩니다.

```jsx
console.log(...[1, 2, 3]); // 1 2 3
console.log("Hello"); // H e l l o
```

위 예제에서 알 수 있듯이 ...[1,2,3]은 1 2 3 이란 목록을 만들지 값을 반환하지 않습니다. 즉 스프레드 문법의 결과는 값이 아닙니다. 따라서 변수에 할당도 불가능합니다. 따라서 스프레드 문법은 다음과 같은 경우에만 사용 가능합니다.

-   함수 호출문의 인수 목록
-   배열 리터럴의 요소 목록
-   객체 리터럴의 프로퍼티 목록

## 1. 함수 호출문의 인수 목록에서 사용하는 경우

ES5 까지는 함수 호출문에 값을 전달하기 위해서는 apply 혹은 call 메서드를 사용해서 값을 전달했습니다. 하지만 스프레드 문법을 사용한다면 다음과 같이 해결할 수 있습니다.

```jsx
const arr = [1, 2, 3];

const max = Math.max(arr); // NaN
//Math.max에는 인자를 배열 형태가 아닌 , , ,의 목록 형태로 받기 때문에 배열이 들어갈 수 없습니다.
// 따라서 ES5까지는 다음과 같이 문제를 해결했습니다.
const max = Math.max.apply(null, arr); // 3

// 하지만 스프레드 문법을 사용하면 다음과 같이 사용할 수 있습니다.
const max = Math.max(...arr); // 3
```

`...args` 의 형태가 Rest 파라미터와 헷갈릴 수 있지만, Rest 파라미터는 함수의 전달된 인수들의 목록을 배열로 전달받기 위해 사용하는 개념이고 그에 반해 스프레드 문법은 여러 개의 값이 뭉쳐있는 이터러블을 펼쳐서 개별적인 값의 목록으로 만드는 것입니다. 즉 서로 반대의 개념입니다.

## 2. 배열 리터럴 내부에서 사용하는 경우

스프레드 문법을 사용해서 이전까지 배열의 배열 리터럴 사용과 다른 예시를 비교 해봅시다.

1. concat

    ```jsx
    const arr = [1,2].concat([3,4]) // [1,2,3,4]
    [...[1,2],...[3,4] // 1,2,3,4
    ```

2. splice

    ```jsx
    const arr1 = [1, 4];
    const arr2 = [2, 3];
    arr1.splice(1, 0, arr2); // [1,[2,3],4]

    Array.prototype.splice.apply(arr1, [1, 0].concat(arr2)); // [1,2,3,4]

    // 스프레드 사용
    arr1.splice(1, 0, ...arr2); // [1,2,3,4]
    ```

3. 배열 복사

    배열 복사에는 slice 메서드를 사용합니다.

    ```jsx
    const arr = [1, 2];
    const copy = arr.slice(); // [1,2]
    console.log(copy === arr); //false

    // 스프레드 사용
    const arr = [1, 2];
    const copy = [...arr]; // [1,2]
    console.log(copy === arr); //false
    ```

4. 이터러블 배열 복사

    이터러블을 복사하기 위해서는 apply 혹은 call 메서드를 사용해서 slice 메서드를 호출해야 했습니다.

    ```jsx
    //*arguments는 이터러블이다.

    function sum() {
        const args = Array.prototype.slice.call(arguments);

        return args.reduce((pre, cur) => pre + cur, 0);
    }

    console.log(sum(1, 2, 3)); // 6

    //  스프레드 사용
    function sum() {
        return [...arguments].reduce((pre, cur) => pre + cur, 0);
    }

    console.log(sum(1, 2, 3)); // 6

    // Rest 파라미터
    const sum = (...args) => args.reduce((pre, cur) => pre + cur, 0);
    console.log(sum(1, 2, 3)); // 6
    ```

## 3. 객체 리터럴 내부에서 사용하는 경우

앞서 이터러블에 대해 얘기하면서 객체 리터럴의 프로퍼티 목록에도 스프레드 문법을 사용할 수 있다고 언급한 적 있습니다. 즉, 스프레드 문법은 이터러블에만 해당되지만, 스프레드 프로퍼티 제안은 일반 객체를 대상으로 스프레드 문법 사용을 허용합니다.

```jsx
const obj = { x: 1, y: 2 };
const copy = { ...obj };
console.log(copy, obj === copy); // {x: 1, y: 2} false

const merge = { ...obj, a: 3, b: 4 };

console.log(merge); //{x: 1, y: 2, a: 3, b: 4}
```

스프레드 프로퍼티가 제안되기 전에는 Object.assign 메서드를 사용해서 객체 병합 및 프로퍼티 변경을 했었습니다.

```jsx
const merged = Object.assign({}, { x: 1, y: 2 }, { y: 10, z: 3 });
console.log(merged); //{x: 1, y: 10, z: 3}

const changed = Object.assign({}, { x: 1, y: 2 }, { y: 10 });
console.log(changed); //{x: 1, y: 10}

const added = Object.assign({}, { x: 1, y: 2 }, { z: 3 });
console.log(added); //{x: 1, y: 2, z: 3}

// 스프레드 프로퍼티
const merged = { ...{ x: 1, y: 2 }, ...{ y: 10, z: 3 } };
console.log(merged); //{x: 1, y: 10, z: 3}

const changed = { ...{ x: 1, y: 2 }, y: 10 };
console.log(changed); //{x: 1, y: 10}

const added = { ...{ x: 1, y: 2 }, ...{ z: 3 } };
console.log(added); //{x: 1, y: 2, z: 3}
```
