### **1 스코프란?**

scope(유효범위)를 의미한다. 즉, 식별자가 유효한 공간을 말하는 것이다. 간단한 예시로 global 변수와 local 변수를 들 수 있다.

```jsx
const x = "global";

function foo() {
    const x = "local";
    console.log(x);
}

foo(); // local

console.log(x); //lobal
```

위 결과를 통해 알 수 있는 것은 코드 블록 내에서 식별자는 '유일'하면 된다는 것이다. 전역변수 관점에서 x 라는 변수는 global을 나타내고 있고, foo 함수 내에서는 local을 나타내고 있다. 즉 스코프는 식별자가 유효한 범위를 의미한다. 또한 JS 엔진에서 console을 실행시킬 때 어떤 식별자를 사용할지 결정하는데, JS 엔진은 스코프를 기준(규칙)으로 식별자를 검색한다. 단, 해당 스코프 내에서 식별자는 유일해야 한다.

```jsx
function foo() {
    var x = 1;
    //var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
    // 아래 변수 선언문은 JS 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
    var x = 2;
    console.log(x); //2
}
foo();

function bar() {
    let x = 1;
    // let이나 const 키워드로 선언된 변수는 스코프 내 중복 허용이 되지 않는다.

    let x = 2; // error occure
}

bar();
```

### 2 스코프의 종류

"전역 스코프 / 지역 스코프"

전역 스코프 : 코드의 가장 바깥 부분, 코드 내 어디서든 참조가 가능하다

지역 스코프 : 지정된 코드 블록(함수,조건문 등) 내에서 참조가 가능하다

### 3 스코프 체인

스코프에도 순서가 존재한다. 이를 통해 참조 순서가 달라지는데 다음 구조를 통해 알 수 있다.

전역 스코프 ( x : global x , y : global y, outer : <function object>)

outer 스코프 ( z : outer's local z , inner : <function object>)

inner 스코프 ( x : 'inner's local x')

전역 > outer > inner의 순서로 이루어져 있다. JS 엔진에서 변수를 참조할 때 해당 스코프 체인을 통해 변수를 참조하는 스코프에서 시작해서 상위 스코프로 검색을 진행한다. 마치 상속의 개념과 비슷하다. inner 스코프에서는 전역 스코프, outer 스코프의 변수를 참조할 수 있지만, 전역 스코프에서는 inner 스코프의 변수를 참조할 수 없는 것처럼 말이다. 이는 변수뿐만 아니라 같은 식별자인 함수에서도 동일하게 적용된다.

### 4 함수 레벨 스코프

지역은 함수 몸체로 선언이 되고 지역은 지역 스코프를 만든다. 이는 코드 블록이 아닌 함수를 통해 지역 스코프가 생성된다는 의미이다. JS 가 아닌 대부분의 언어들은 코드 블록에서도 스코프가 생겨나지만, var로 선언된 식별자의 경우에는 함수의 코드 블록만을 지역 스코프로 인정한다. 이러한 특성을 **함수 레벨 스코프**라 한다

```jsx
var x = 1;

if (true) {
    /*
		var 키워드로 선언된 식별자들은 함수의 코드 블록 만을 지역 스코프로 인정한다.
		따라서, var로 선언된 함수가 아닌 코드 블록들은 전역변수이다.
		이는 아래와 같이 예기치 못한 오류를 발생시킨다. 
	*/
    var x = 10;
}

console.log(x); // 10
```

### 5 렉시컬 스코프

```jsx
var x = 1;

function foo() {
    var x = 10;
    bar();
}

function bar() {
    console.log(x);
}

foo(); // 1
bar(); // 1
```

위 함수 결과는 함수의 상위 스코프가 무엇인지에 따라 값이 달라진다.

1. 함수를 어디에서 **호출** 하였는가
2. 함수를 어디에서 **정의** 하였는가

프로그래밍 언어는 일반적으로 이 두 가지 방식 중 한 가지 방식으로 함수의 상위 스코프를 결정한다. 첫 번째 방식은 동적 스코프라고 한다. 함수의 호출 위치에 따라 상위 스코프가 결정되기 때문이다. 두 번째 방식은 렉시컬 스코프 (정적 스코프) 라고 한다. 함수의 호출 위치가 아니라, 함수가 정의되는 순간에 상위 스코프를 결정하는 방식이다. JS 를 비롯한 대부분의 프로그래밍 언어는 렉시컬 스코프를 따른다.

렉시컬 스코프는 함수가 어디서 호출 위치에 상관 없이 함수가 정의된 순간에 상위 스코프를 정하고, 해당 함수를 참조할 때마다 기억된 상위 스코프를 사용한다.
