# Symbol

## 1. 심벌이란?

자바스크립트에는 문자열,숫자,불리언,undefined,null,객체 이렇게 6가지의 타입이 존재합니다. 그리고 ES6에서 새로 도입된 7번째 타입이 이번에 알아 볼 Symbol(심벌)입니다.

심벌은 변경 불가능한 원시 타입의 값입니다. 심벌은 다른 데이터 타입과는 다르게 같은 데이터 타입에서 절대로 중복되지 않는 유일한 값입니다. 따라서 충돌없는 프로퍼티 키 값을 만들때 주로 사용됩니다.

## 2. 심벌 값의 생성

1. **Symbol 함수**

    심벌 값은 Symbol 함수를 호출하여 생성합니다. 다른 6개의 원시값은 리터럴 형식으로 값 생성이 가능하지만 심벌은 Symbol함수를 호출하여 생성합니다. 생성된 심벌 값은 **외부로 노출되지 않아 확인할 수 없고 다른 값과 절대 중복이 되지 않습니다.**

    ```jsx
    const mySymbol = Symbol();

    console.log(typeof mySymbol); //symbol
    console.log(mySymbol); // Symbol()
    ```

    심벌은 다른 타입과는 다르게 new 연산자와 함께 호출하지 않습니다.

    ```jsx
    new Symbol(); // TypeError: Symbol is not a  constructor
    ```

    Symbol 함수는 선택적으로 문자열을 인수로 전달할 수 있습니다. 여기서 전달한 문자열은 해당 심벌에 대한 설명의 용도로 사용이 됩니다. 즉, 같은 설명이 들어간 심벌이라도 생성된 심벌의 값은 각자 다른 값을 가집니다.

    ```jsx
    const mySymbol1 = Symbol("des");
    const mySymbol2 = Symbol("des");

    console.log(mySymbol2 === mySymbol); //false
    ```

    심벌 값도 문자열,숫자,불리언과 같이 객체처럼 접근하려 하면 암묵적으로 래퍼 객체를 생성합니다.

    ```jsx
    const mySymbol = Symbol("mySymbol");

    console.log(mySymbol.description); // mySymbol
    console.log(mySymbol.toString()); // Symbol(mySymbol)
    ```

    심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않지만, 불리언 타입만은 변경이 됩니다. 이는 조건문 등에서 해당 심볼의 존재 확인이 가능합니다.

    ```jsx
    const mySymbol = Symbol("mySymbol");

    console.log(mySymbol + ""); // TypeError
    console.log(+mySymbol); // TypeError
    console.log(!!mySymbol); // true
    ```

2. **Symbol.for/Symbol.keyFor 메서드**

    Symbol.for 메서드는 인수로 전달받은 문자열을 키로 하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌을 검색합니다.

    - 검색에 성공하면 검색된 심벌 값을 반환한다.
    - 검색에 실패하면, 전달받은 인수를 키로 하는 새로운 심벌을 생성 후, 전역 심벌 레지스트리저장 한 후 해당 심벌 값을 반환합니다.

    ```jsx
    const s1 = Symbol.for("mySymbol");
    const s2 = Symbol.for("mySymbol");

    console.log(s1 === s2); // true
    ```

    Symbol함수는 호출될 때마다 유일무이한 값을 생성하지만, 심벌 레지스트리에 값을 저장하지 않기 때문에 관리되지 않습니다. 하지만 Symbol.for 메서드를 사용하면 애플리케이션 전역에서 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유할 수 있습니다.

    Symbol.keyFor 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있습니다.

    ```jsx
    const s1 = Symbol.for("mySymbol");
    Symbol.keyFor(s1); // mySymbol

    // Symbol함수로 호출한 심벌은 심벌 레지스트리에 등록되어 관리되지 않습니다.
    const s2 = Symbol("foo");
    Symbol.keyFor(s2); // undefined
    ```

## 3. 심벌과 상수

상,하,좌,우를 나타내는 상수를 정의한다고 가정해봅시다.

```jsx
const Direction = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
};
const myDirection = Direction.UP;
if (myDirection === Direction.UP) console.log("up");
```

위 코드에서 방향을 나타내는 객체는 객체의 키 값이 중요한거지 일반 값에는 큰 의미가 없습니다. 하지만 값을 나타내는 1,2,3,4의 값이 모종의 이유로 변경이 될 수 있고 만약에 그렇다면 프로그램 전체에 좋지 못한 영향을 끼치게 됩니다. 이런 문제는 심벌을 사용해서 해결할 수 있습니다.

```jsx
const Direction = {
    UP: Symbol("UP"),
    DOWN: Symbol("DOWN"),
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT"),
};
const myDirection = Direction.UP;
if (myDirection === Direction.UP) console.log("up");
```

<aside>
💡 **enum
enum**은 명명된 숫자 상수의 집합으로 열거형이라고 부릅니다. JS는 enum을 지원하지 않지만 TypeScript에서는 enum을 지원하고 있습니다. JS에서는 Object.freeze 메서드와 심벌값을 통해 enum을 흉내내었습니다.

```jsx
const Direction = Object.freeze({
    UP: Symbol("UP"),
    DOWN: Symbol("DOWN"),
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT"),
});

const myDirection = Direction.UP;
if (myDirection === Direction.UP) console.log("up");
```

</aside>

## 4.심벌과 프로퍼티 키

객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열 또는 심벌 값으로 만들 수 있으며, 동적으로 생성 할 수 있습니다. 심벌 값을 프로퍼티 키로 사용하려면 프로퍼티 키로 사용할 심벌 값에 대괄호를 사용해야 합니다. 프로퍼티에 접근할 때도 대괄호를 사용해야 합니다.

```jsx
const obj = {
    [Symbol.for("mySymbol")]: 1,
};

obj[Symbol.for("mySymbol")]; //1
```

**심벌 값은 유일무이한 값이므로 심벌 값으로 프로퍼티 키를 만들면 프로퍼티 키와 절대 충돌하지 않습니다.** 이러한 방법은 기존 키와 충돌하지 않고, 미래에 추가될 키와도 충돌하지 않습니다.

## 5. 심벌과 프로퍼티 은닉 \*\*\*\*

심벌 값을 프로퍼티키로 사용하여 생성한 프로퍼티는 for...in 문이나 Object.keys 등의 메서드로 찾을 수 없습니다. 이처럼 심벌을 사용하면 외부에 노출할 필요 없는 프로퍼티를 은닉할 수 있습니다. 하지만 ES6에 도입된 `Object.getOwnPropertySymbols` 메서드를 사용하면 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티를 찾을 수 있습니다.

```jsx
const obj = {
    [Symbol("obj")]: 1,
};

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(obj)]

const symbolKey = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey]);
```

## 6. 심벌과 표준 빌트인 객체 확장

일반적으로 표준 빌트인 객체에 새로운 사용자 정의 메서드를 추가하는 것을 권하지는 않습니다. 미래에 추가할 메서드와 이름이 중복 될 수 있기 때문에 문제가 생길 수 있습니다.

하지만 중복될 가능성이 없는 심벌 값으로 프로퍼티 키를 생성하여 빌트인 객체를 확장한다면 위와 같은 문제가 생길 가능성은 없습니다.

```jsx
Array.prototype[Symbol.for("sum")] = function () {
    return this.reduce((acc, cur) => acc + cur, 0);
};

console.log([1, 2, 3][Symbol.for("sum")]()); // 6
```

## 7. Well-known Symbol

JS가 기본으로 제공하는 빌트인 심벌 값이 있습니다. 이 값은 Symbol 함수의 프로퍼티에 할당되어 있습니다. 이 값을 **Well-known Symbol** 이라고 부르며 JS 엔진 내부 알고리즘에 사용됩니다.

예를 들어 Array,String,Map ... 등과 같이 for...of 문으로 순회 가능한 빌트인 이터러블은 Well-knwon Symbol인 Symbol.iterator를 키로 갖는 메서드를 가지며 해당 메서드를 호출하면 이터레이터를 반환하도록 규정되어 있습니다.

만약 빌트인 이터러블이 아닌 일반 객체를 이터러블처럼 동작하도록 구현하기 위해서는 이터레이션 프로토콜을 따르면 됩니다. 이처럼 **심벌은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성한 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해 도입되었습니다**
