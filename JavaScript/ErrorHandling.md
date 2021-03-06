# 에러처리

## 1. 에러 처리의 필요성

에러가 발생하지 않는 코드를 작성하는 것은 불가능합니다. 에러나 예외적인 상황에 제대로 대응을 하지 않는다면 프로그램은 강제 종료되고, 이는 클라이언트나 개발자에게 있어서 치명적인 상황을 야기할 수 있습니다. 따라서 항상 에러가 발생한다고 생각을 하고 어떠한 방식을 통해 에러에 대응하는 코드를 작성하는 것이 중요합니다.

## 2. try...catch...finally 문

에러 처리를 구 현하는 방법은 2가지가 있습니다.

-   예외적인 상황이 발생하면 반환하는 값을 연산자/조건문 등을 통해 확인해서 처리하는 방법
-   에러 처리 코드를 미리 등록해 두고 에러가 발생하면 에러 처리 코드로 점프하도록 하는 방법.

try...catch...finally 문은 2번째 방법입니다. 일반적으로 이 방법을 에러 처리라고 합니다. 해당 문은 아래와 같이 작성됩니다.

```jsx
try {
    // 실행할 코드(에러가 발생할 가능성이 있는 코드)
} catch (err) {
    // try 코드 블록에서 에러가 발생하면 이 코드 블록의 코드가 실행
    // err에는 try 코드 블록에서 발생한 Error 객체가 전달
} finally {
    // 에러 발생과 상관없이 실행되는 코드 블록. 반드시 한번 실행됨 (생략 가능하다)
}
```

try...catch...finally 문을 통해 에러를 처리한다면 프로그램이 강제 종료되지 않습니다.

## 3. Error 객체

Error 생성자 함수는 에러 객체를 생성합니다. 해당 생성자 함수에 에러를 상세히 설명하는 메세지를 인수로 전달할 수 있습니다.

```jsx
const error = new Error("404NOTFOUND");
```

Error 객체는 2개의 프로퍼티를 갖습니다.

-   message: Error 생성자 함수에 인수로 전달한 에러 메세지
-   stack: 에러를 발생시킨 콜 스택의 호출 정보를 나타내는 문자열(디버깅 목적으로 사용)

자바 스크립트는 7가지의 에러 객체를 생성할 수 있는 Error 생성자 함수를 제공합니다. 해당 에러 객체는 모두 Error.prototype을 상속받습니다.

| 생성자 함수    | 인스턴스                                                                       |
| -------------- | ------------------------------------------------------------------------------ |
| Error          | 일반적인 에러 객체                                                             |
| SyntaxError    | 문법에 맞지 않을때 발생하는 에러 객체                                          |
| ReferenceError | 참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체                         |
| TypeError      | 데이터 타입이 유효하지 않을때 발생하는 에러 객체                               |
| RangeError     | 숫자의 허용 범위를 벗어났을 때 발생하는 에러 객체                              |
| URIError       | encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체 |
| EvalError      | eval 함수에서 발생하는 에러 객체                                               |

## 4. throw 문

Error 생성자 함수로 에러 객체를 생성한다고 에러가 발생하는 것은 아닙니다. 즉, 에러 객체 생성과 에러 발생은 의미가 다릅니다.

```jsx
try {
    // 에러 객체를 생성한다고 에러가 발생하는 것은 아니다
    new Error("error");
} catch (err) {
    console.log(err);
}
```

에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 합니다.

```jsx
throw 표현식;
```

```jsx
try {
    // 에러 객체를 생성한다고 에러가 발생하는 것은 아니다
    throw new Error("error");
} catch (err) {
    console.log(err);
}
```

## 5. 에러의 전파

에러는 호출자 방향으로 전파됩니다.(콜 스택의 아래 방향으로 전파)

```jsx
const foo = () => {
    throw Error("error by foo"); // (4)
};

const bar = () => {
    foo(); // (3)
};

const baz = () => {
    bar(); // (2)
};

try {
    baz(); // (1)
} catch (err) {
    console.error(err);
}
/*
	Error: error by foo
	  at foo (Script snippet #1:2:11)
	  at bar (Script snippet #1:6:5)
	  at baz (Script snippet #1:10:5)
	  at Script snippet #1:14:5
*/
```

위에 주석처리된 부분을 본다면

-   snippet → baz → bar → foo 로 함수를 호출하고
-   foo → bar → baz → snippet 순서대로 throw한 에러가 전파되는 것을 알 수 있습니다.

이처럼 에러를 개치하지 않으면 호출자 방향으로 전파가 됩니다. throw된 에러를 캐치하여 적절히 대응하면 프로그램을 강제 종료 시키지 않고 코드의 실행 흐름을 복구할 수 있습니다. throw된 에러를 어디에서도 캐치하지 않으면 프로그램은 강제 종료됩니다.
