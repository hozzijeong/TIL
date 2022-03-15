### 1 일급 객체

다음과 같은 조건을 일급 객체 라고 한다

1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체, 배열)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

JS 함수는 위 조건을 모두 만족함으로 일급 객체이다. 함수가 일급 객체라는 것은 객체와 동일하게 사용할 수 있따는 의미이다. 하지만 함수가 일반 객체와 차이점이 존재하는데, 그것은 바로 함수 고유의 프로퍼티를 소유하는 것 이다.

### 2 함수 객체의 프로퍼티

함수는 객체이기 때문에 프로퍼티를 가질 수 있다.

아래 함수의 프로퍼티를 console 창에 찍어보았다.

```jsx
function squares(number) {
    return number ** 2;
}

console.log(Object.getOwnPropertyDescriptors(squares));

/*
	arguments: {value: null, writable: false, enumerable: false, configurable: false}
	caller: {value: null, writable: false, enumerable: false, configurable: false}
	length: {value: 1, writable: false, enumerable: false, configurable: true}
	name: {value: 'squares', writable: false, enumerable: false, configurable: true}
	prototype: {value: {…}, writable: true, enumerable: false, configurable: false}
	[[Prototype]]: Object
*/
```

`getOwnPropertyDescriptors`를 통해 반환된 값들이 일반 객체는 가지지 않고 함수가 가지는 고유의 프로퍼티들이다.

1.  arguments 프로퍼티

    arguments 프로퍼티 값은 arguments 객체이다. arguments 객체는 함수 호출시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역변수처럼 사용된다. 즉, **함수 내부에서만 사용이 가능하다.**

    함수를 정의할 때 선언한 매개변수는 함수 몸체 내부에서 변수와 동일하게 취급된다. 즉 함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 선언되고 undefined로 초기화 된 이후 인수가 할당된다.

    선언된 매개변수보다 인수를 적게 전달했을 경우 인수가 전달되지 않은 매개변수는 undefined로 초기화 된 상태를 유지하고, 초과되었을 경우 무시된다.

    arguments 객체는 인수를 프로퍼티 값으로 소유하며, 프로퍼티 키는 인수의 순서를 나타낸다. arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다. arguments 객체는 배열 형태로 인자 정보를 담고 있지만 실제 배열이 아닌 유사배열 객체로 배열 메서드를 사용할 수 없다. 따라서 Rest 파라미터를 사용해서 위 문제를 해결한다.

    ES6 이전에는 Rest 파라미터가 없기 때문에, arguments 개념에 대해서 알고있는것은 좋다.

2.  caller 프로퍼티

    ECMAScript 사양에 포함되지 않은 비표준 프로퍼티이다.

3.  length 프로퍼티

    함수를 정의할 때 선언한 매개변수의 개수를 가리키는 프로퍼티이다. arguments 객체의 length 프로퍼티는 인자의 개수를 가리키고 함수 객체의 length 프로퍼티는 매개변수의 개수를 가리킨다.

    ```jsx
    function squares(number) {
        console.log(arguments.length);
        return number ** 2;
    }

    console.log(squares.length, squares(1, 2, 3));

    /*
    	3
    	1 1
    */
    ```

    squares에 있는 매개변수는 1개 뿐이어서 1을 반환하고, arguments에서 입력된 인자의 개수는 3개이기 때문에 3을 반환하였다. 함수에서 요구하는 매개변수를 알맞게 입력하였다면 arguments.length와 function.length의 길이는 같을 것이다.

4.  name 프로퍼티

    함수 객체의 name 프로퍼티는 함수 이름을 나타낸다. ES6 이전까지는 비표준이었따가 ES6부터 정식 표준이 되었따. 따라서 ES5와 ES6에서 동작이 다르므로 주의해야 한다. ES5에서 name 프로퍼티는 빈 문자열을 값으로 갖지만 ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다.

5.  ** proto** 접근자 프로퍼티

    모든 객체는 [[prototype]] 이라는 내부 슬롯을 갖는다. 해당 슬롯은 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다. 해당 프로퍼티는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다. 직접접근은 되지 않고 간접 적근 방법을 제공하는 경우에 한하여 접근할 수 있다.

    ```jsx
    const obj = { a: 1 };

    console.log(obj.__proto__ === Object.prototype); // true

    console.log(obj.hasOwnProperty("a")); // true
    console.log(obj.hasOwnProperty("__proto__")); // false
    ```

    <aside>
    💡 `hasOwnProperty` 메서드
    인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티키인 경우에 true 상속받은 프로토타입의 프로퍼티 키인 경우 false 반환

    </aside>

6.  prototype 프로퍼티

    prototype 프로퍼티는 생성자 함수로 호출할 수 있는 객체. 즉 onsturcor 만이 소유하는 프로퍼티이다.

    ```jsx
    console.log(function () {}.hasOwnProperty("prototype")); // true
    console.log((() => {}).hasOwnProperty("prototype")); // false
    console.log({}.hasOwnProperty("prototype")); // false
    ```

    prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.
