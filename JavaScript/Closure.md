# 클로저

“클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다”

### 1. 렉시컬 스코프

스코프의 실체는 실행 컨텍스트의 렉시컬 환경. 따라서, 실행 컨텍스트의 렉시컬 환경에서 참조하는 외부 렉시컬 환경을 통해 상위 렉시컬 환경과 연결을 한다. 이것이 스코프 체인이다. 여기서 **상위 스코프를 참조할 때에는 선언한 함수 정의가 평가되는 시점에서 상위 스코프 참조가 일어나기 때문에, 함수의 호출 위치 보다 함수의 정의 위치가 더 중요**해 진다. 이것이 렉시컬 스코프이다.

### 2. 함수 객체의 내부 슬롯[[Environment]]

그렇다면 호출된 함수가 상위 스코프를 참조할 때 어디에 저장된 값으로 해당 값을 참조할 수 있을까? 바로 함수 정의 평가가 이루어 질 때 상위 스코프에 대해 함수 객체 내부 슬롯 [[Environment]]에 참조를 저장한다. (저장되는 시점은, 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 저장한다)

만약에 상위 스코프가 실행을 종료해도, 함수 객체 내부에는 계속해서 상위 스코프를 참조하고 있기 때문에 해당 값을 참조할 수 있다. 이것이 **함수 정의 위치에 따라 상위 스코프를 참조하는 렉시컬 스코프의 실체이다**

### 3. 클로저와 렉시컬환경

```jsx
const x = 1;

function outer() {
    const x = 10;
    const inner = function () {
        console.log(x);
    };
    return inner;
}

const innerFunc = outer();
innerFunc();
```

outer함수를 호출하고 outer 함수는 실행 컨텍스트에서 제거된다. 하지만 inner 함수에서 참조하는 x 값은 outer 함수에서 선언한 x 값을 반환한다. **외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저 라고 부른다.**

outer 함수의 실행은 종료되었지만 outer 함수의 렉시컬 환경은 inner 함수의 Environment에 의해 참조되고 있고, inner함수는 innerFunc()에 의해 참조되고 있기 때문에 가비지 컬렉션의 대상이 되지 않는다. 즉, 누군가가 참조하고 있다면 함부로 메모리를 해제하지 않는다.

상위 스코프를 참조하는 중첩 함수를 클로저라고 부른다면, 이론적으로 모든 자바스크립트 함수는 클로저가 된다. 전역 함수여도 window 객체를 참조하기 때문이다. 하지만, 모든 함수를 클로저라고 하지는 않는다. 클로저로 정의하는 데에는 일반적으로 2가지 조건을 전제로 한다.

1. 중첩 함수가 상위 스코프의 식별자를 참조하고 있는가
2. 중첩 함수가 외부 함수보다 더 오래 유지되고 있는가

클로저에 의해 참조되는 상위 스코프 변수를 “자유 변수” 라고 부른다. 이를 의역하면 “자유 변수에 묶여있는 함수”라고 할 수 있다.

### 4. 클로저의 활용

클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다 (상태 관리를 위함)

```jsx
let num = 1;

const increase = function () {
    let num = 0;

    return ++num;
};

console.log(increase()); //1
console.log(increase()); //1
console.log(increase()); //1
```

전역 변수로 num을 선언 했을 때에는 increase 함수를 호출하기 전까지 값의 은닉성이 보장되어야 하고, 지역 변수로 선언했을 때는 함수를 호출했을 때 초기화가 되면 안된다. 하지만 전역,지역 변수 2가지 모두 실험을 해봐도 두 조건을 만족시킬 수 없다.

하지만 즉시 실행 함수를 통해 num의 ++된 값을 반환하는 익명 함수를 작성한다면 그 결과는 달라지게 된다.

```jsx
const increase = (function () {
    let num = 0;
    const result = function () {
        return ++num;
    };
    console.log(result);
    return result;
})();

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```

위 코드가 실행되면 즉시 실행 함수가 호출되고 즉시 실행 함수가 반환한 함수가 increase 변수에 할당 된다. 할당 된 함수(result)는 자신이 정의된 위치의 상위 레벨의 스코프를 참조하는 클로저이다.

즉시 실행 함수는 소멸되지만, result의 상위 스코프인 increase의 렉시컬 환경을 기억하고 있다. 즉, 자유 변수 num에 접근하고 num의 상태를 관리할 수 있는 것은 increase 함수 밖에 없는 것이다.

### 5. 캡슐화와 정보 은닉

캡슐화란 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 의미한다. 캡슐화는 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라고 한다.

JS가 아닌 다른 언어에서는 public,private,protected 등의 접근 제한자를 통해 공개범위를 설정할 수 있다. 하지만 JS에는 그러한 기능이 존재하지 않는다. 다만, 클로저를 이용한다면 어느정도 은닉을 구현할 수는 있다

```jsx
const Person - (function(){
	let _age = 0;

	function Person(name,age){
		this.name = name;
		_age = age
	}

	Person.prototype.sayHi = function(){
		console.log(`Hi my name is ${this.name}. I am ${_age} years old`);
	}

	return Person
}());

const me = new Person ("lee",30)
me.sayHi();
console.log(me.name,me._age) // Lee,undefined

```

위 코드를 보면 Person 객체 안에서가 아닌 외부에서 \_age 호출이 되지 않는 것을 볼 수 있다. 즉 은닉화가 이루어진 것 처럼 보인다. 하지만, 새로운 Person객체를 생성하고, 거기에 매개변수로 새로운 값을 넣었을 때 기존에 있던 \_age의 값이 유지되지 않는다. 완벽한 은닉화가 이루어지지 않는다는 것이다.

인스턴스 메서드를 사용하면 자유 변수를 통해 은닉화를 흉내 낼 수 있지만, prototype 메서드를 사용한다면 이마저도 불가능 하다. 하지만, 최근에 private 필드 정의하는 새로운 사양이 제시 되었다.
