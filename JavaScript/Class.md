25. 클래스

### 25.1 클래스의 문법적 설탕

클래스는 함수이다. ES6에 도입하면서 프로토타입 기반의 객체지향 모델을 폐지하고 새로운 모델을 제공하는 것은 아니다. 그렇다고 프로토타입 기반의 객체지향 모델과 동일하게 동작하지는 않는다. 클래스는 생성자 함수보다 엄격하며, 생성자 함수에서는 제공하지 않는 기능들도 제공한다.

1. new 연산자와 함께 호출해야 한다
2. 상속을 지원하는 extends와 super를 지원하지만, 생성자 함수는 지원하지 않는다.
3. 호이스팅이 발생하지 않는 것처럼 보이지만, 발생한다.
4. 클래스 내에는 암묵적으로 strict mode가 지정되어 실행되며 해제할 수 없다.
5. 클래스의 생성자, 프로토타입 메서드, 정적 메서드는 [[Enumerable]]가 false로 열거할 수 없다.

### 25.2 클래스의 정의

클래스는 class 키워드를 사용하여 정의한다. 주로 파스칼 케이스를 사용해서 정의 하는 것이 일반적이다.

```jsx
class Person {}
const Person = class {};
const Person = class MyClass {};
```

앞에서도 언급 했듯이 클래스는 함수 즉 일급 객체이다. 그러므로 일급 객체가 가지고 있는 특성들을 가지고 있다.

클래스의 몸체에는 총 3가지 타입의 메서드 정의가 가능한데 **생성자**, **프로토타입**, **정적 메서드** 이다.

```jsx
class MyClass {
    constructor(name) {
        this.name = name;
    } //생성자

    sayHi() {
        console.log(`Hi My name is ${this.name}`);
    } //프로토타입 메서드

    static sayHello() {
        console.log("Hello");
    } // 정적 메서드
}

const myClass = new MyClass("Jeong");

console.log(myClass.name);
myClass.sayHi();
MyClass.sayHello();
```

### 25.3 클래스 호이스팅

클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 소스 코드 평가 과정에서 평가되어 객체를 생성한다. 이때 생성된 객체는 constructor 이다. 여기서 생성된 constructor는 프로토타입도 더불어 생성된다. **단, 클래스는 정의 이전에 참조할 수 없다**

```jsx
const Person = "";

{
    console.log(Person); // 호이스팅이 발생하지 않는다면 ''이 출력되어야 한다.
    //ReferenceError: Cannot access 'Person' before initialization

    class Person {}
}
```

클래스 선언문도 변수 선언, 함수 선언과 같이 호이스팅이 발생하지만, let,const 키워드로 선언한 변수처럼 호이스팅 된다. 따라서, 선언문 이전에 일시적 사각지대에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 보인다.

**var,let,const,function,function\*,class로 선언된 변수들은 모두 호이스팅 되는데, 모든 선언문은 런타임 이전에 평가되기 때문이다.**

### 25.4 인스턴스 생성

클래스는 생성자 함수이며, new 키워드와 함께 인스턴스를 생성한다.

```jsx
const Person = class MyClass {};

const me = new Person();

console.log(MyClass); // MyClass is not defined

const you = new MyClass(); // MyClass is not defined
```

클래스 표현식으로 정의된 클래스의 경우 클래스를 가리키는 식별자를 사용하지 않고 기명 클래스로 표현식의 클래스 이름을 사용해서 인스턴스를 생성하면 에러가 발생한다. 즉, MyClass를 가리키는 식별자 Person을 통해 선언했는데, 해당 식별자를 사용하지 않고 직접 접근이 안된다는 의미이다.

### 25.5 메서드

1. **constructor**

    인스턴스를 생성하고 초기화 하기 위한 메서드이다. 해당 메서드의 이름을 변경할 수 없다.

    ```jsx
    console.dir(People);
    ```

    ```json
    class People
    	length: 1
    	name: "People"
    	prototype:
    		constructor: class People
    		[[Prototype]]: Object
    	arguments: (...)
    	caller: (...)
    	[[FunctionLocation]]: VM790:3
    	[[Prototype]]: ƒ ()
    	[[Scopes]]: Scopes[2]
    ```

    모든 함수가 가리키는 프로토타입의 생성자가 class People 본인 자신이다. 이는 클래스가 인스턴스를 생성하는 생성자 함수라는 것을 의미한다. 즉, new 연산자와 함께 클래스를 호출하면, 클래스는 인스턴스를 생성한다.

    생성자를 통해 정의한 프로퍼티가 인스턴스 프로퍼티가 지정되는 것을 알 수 있다. 즉 생성자의 this는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킨다.

    하지만, 클래스가 평가되어 생성된 함수 객체나 클래스가 생성한 인스턴스 어디에도 constructor 메서드가 보이지 않는다. 이는 클래스 몸체에 정의한 constructor는 단순한 메서드가 아님을 알 수 있다.

    constructor는 메서드로 해석되는 것이 아니라 클래스가 평가되어 생성한 함수 객체 코드의 일부가 된다. 즉 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성된다.

    <aside>
    💡 **클래스의 constcurtor와 프로토타입의 constructor 프로퍼티**
    두 개의 이름이 같아서 혼동하기 쉽지만, 직접적인 관련은 없다. 프로토타입의 constructor 프로퍼티는 모든 프로토타입이 가지고 있는 프로퍼티이며, 생성자 함수를 가리킨다.

    </aside>

    constructor 는 생성자 함수와 유사하지만 몇 가지 차이점이 존재한다.

    1. constructor는 클래스 내에 최대 한 개만 존재할 수 있다
    2. constructor는 생략 가능하다 → 빈 객체가 암묵적으로 정의된다.
    3. 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.
    4. 인스턴스를 생성할 때 값을 받아 인스턴스 프로퍼티를 초기화 하고 싶다면 constructor에 매개변수를 받고 이 값을 this에 할당한다면 해당 값으로 초기화가 가능하다.

    이처럼 constructor 내에서는 인스턴스 생성과 동시에 인스턴스 프로퍼티 추가를 통해 초기화가 가능하다. **즉, 인스턴스 초기화를 위해서는 constructor를 생략해서는 안된다.**

    constructor는 별도의 반환문을 가지지 않는데, 이는 암묵적으로 this를 반환하기 때문이다. 만약에 this가 아닌 다른 객체를 반환한다면, 인스턴스가 반환되지 못하고 해당 객체가 반환된다.

    하지만 명시적으로 **원시값을 반환하면 해당 값은 무시되고 this가 반환**된다.

2. **프로토타입 메서드**

    생성자 함수에 프로토타입 메서드를 추가하기 위해서는 명시적으로 프로토타입에 메서드를 추가해야 한다. 하지만, **클래스 몸체에서 정의한 메서드는 prototype 프로퍼티에 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.**

    또한, 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다.

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7b234b3b-63a7-4f8e-8bbf-8f4117413b59/Untitled.png)

    위 그림과 같이 클래스 몸체에서 정의한 메서드는 인스턴스의 프로토타입에 존재하는 프로토타입 메서드가 된다. 인스턴스는 프로토타입 메서드를 상속받아서 사용 가능하다.

    결국 클래스는 인스턴스를 생성하는 생성자 함수라고 할 수 있다. **즉 클래스는 프로토타입 기반의 객체 생성 메커니즘이다.**

3. **정적 메서드**

    정적 메서드는 인스턴스를 사용하지 않아도 호출할 수 있는 메서드를 의미한다.

    ```jsx
    function Person(name) {
        this.name = name;
    }

    Person.Hi = function () {
        console.log("Hi");
    };

    Person.Hi();
    ```

    클래서에서는 메서드에 static을 붙이면 정적 메서드가 되고 아래와 같은 프로토타입 체인을 가지게 된다. 즉, 클래스에 바인딩 된 메서드가 된다.

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4483c06d-eccd-4ecf-980d-32db7e9dd69d/Untitled.png)

    클래스는 함수 객체로 평가되어서 고유의 프로퍼티/메서드를 소유할 수 있다. 또한, 클래스는 정의가 평가된 시점에 객체가 되므로 인스턴스 없이도 메서드 호출이 가능하다.

    정적 메서드는 인스턴스로 호출할 수 없는데, 이는 정적 메서드가 바인딩 된 클래스가 인스턴스의 프로토타입 체인에 존재하지 않기 때문이다. 바로 직전 2개 그림을 비교해보면 알 수 있다.

4. **정적 메서드와 프로토타입 메서드의 차이**

    - 정적 메서드와 프로토타입 메서드는 자신이 속해있는 프로토타입 체인이 다르다
    - 정적 메서드는 클래스로 호출하고, 프로토타입 메서드는 인스턴스로 호출한다.
    - 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

    정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수를 전역함수로 정의하지 않고 메서드로 구조화할 때 유용하다 (ex Number,Math,JSON 등등)

5. **클래서에서 정의한 메서드의 특징**
    - function 키워드를 생략한 메서드 축약 표현을 사용한다 ( this가 생겨버리기 때문)
    - 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
    - 암묵적으로 strict mode를 실행한다.
    - 프로퍼티 열거가 불가능하다 ( [[Enumberable]]이 false )
    - 내부 메서드 [[Construct]]를 갖지 않는 non-constructor 함수이다. (new와 함께 호출 불가능)

### 25.6 클래스의 인스턴스 생성 과정

클래스의 인스턴스는 생성자 함수와 같이 new 연산자와 함께 선언하기 때문에, 해당 과정은 생성자 함수의 인스턴스 생성과 비슷하다. 앞에서도 언급했지만, 클래스 인스턴스는 new 연산자 없이 생성이 불가능 하다.

1. **인스턴스 생성과 this바인딩**: constructor 내부 코드가 실행되기 전에 빈 객체가 생성 된다. 이 때 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다. 그리고 앞에서 생성된 빈 객체는 this에 바인딩 된다. 즉 constructor의 this는 인스턴스를 가리킨다.
2. **인스턴스 초기화**: constructor의 내부코드가 실행되며 this에 바인딩 되어있는 인스턴스를 초기화 시킨다. constructor가 존재하지 않으면 이 과정도 생략된다.
3. **인스턴스 반환 :** 바인딩 된 this를 암묵적으로 반환한다.

### 25.7 프로퍼티

1. 인스턴스 프로퍼티

    인스턴스 프로퍼티는 constructor 내부에서 정의해야 한다

    앞에서도 언급했듯이, 인스턴스는 this에 바인딩 되어있다. 즉, 인스턴스의 프로퍼티를 정의할 때 this를 통해서 인스턴스 프로퍼티를 추가하면 된다.

    constructor 내부에서 this에 추가한 프로퍼티는 클래스가 생성한 인스턴스의 프로퍼티가 된다. **ES6의 클래스에는 접근 제한자가 존재하지 않기 때문에 인스턴스 프로퍼티는 언제나 public 하다.**

2. 접근자 프로퍼티

    자체적인 값을 가지기보다는 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티이다 (getter/setter 함수)

    클래스에도 해당 사용이 가능한데, 표현은 아래와 같다.

    ```jsx
    class Person {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        get FullName() {
            return `${firstName} ${LastName}`;
        }

        set FullName(name) {
            [this.firstName, this.lastName] = name.split(" ");
        }
    }
    ```

    getter 앞에는 get 키워드를 setter 앞에는 set 키워드를 사용해 정의한다.

    getter와 setter 이름은 인스턴스 프로퍼티처럼 사용된다. 즉, getter는 프로퍼티처럼 참조하는 형식으로 사용되고, setter는 프로퍼티처럼 할당하는 형식으로 사용된다.

    getter는 무엇인가를 반환해야만 하고, setter는 매개변수가 필수로 존재해야 한다. 클래스의 메서드는 기본적으로 프로토타입 메서드가 된다. 따라서 클래스의 접근자 프로퍼티 또한 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 된다.

3. 클래스 필드 정의 제안

    **클래스필드(or 멤버)** : 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티

    기존에 JS 클래스 필드내에서는 this를 사용하지 않고 프로퍼티 수정이 되지 않았다. 하지만 최신 브라우저와 최신 Node.js(12이상) 에서는 클래스 필드를 클래스 몸체에서 정의할 수 있다.

    ```jsx
    class Person{
        name = "Lee"
    }

    const me = new Person()
    me.name = "Jeong"
    me.height = 179
    console.log(me)

    ---------------------------------------------------------------------------------
    /*
    	 Person {name: 'Jeong', height: 179}
    	 height: 179
    	 name: "Jeong"
    	 [[Prototype]]: Object
    */
    ```

    위처럼 클래스 몸체에 클래스 필드를 정의하는 경우, 몇 가지 특징이 있다.

    - this를 통해서 클래스 필드를 바인딩 해서는 안된다. (this는 constructor와 메서드 내에서만 유효하다.)
    - 클래스 필드를 참조하는 경우에는 this를 반드시 사용해야 한다.

    ```jsx
    class Person {
        name = "Lee";

        constructor() {
            console.log(name); // Error
        }
    }

    new Person();
    ```

    - 클래스 필드에 초기값을 할당하지 않으면 undefiend를 갖게 된다.
    - 클래스 필드를 초기화할 필요가 있다면 constructor 내부에서 초기화 해야 한다.
        ↑ 위와 같은 이유로 클래스 필드를 초기화할 필요가 있따면 constructor 밖에서 클래스 필드를 정의할 필요가 없다. 즉, 클래스 필드를 초기화 하려면 어차피 constructor에서 초기화를 해야하기 때문에, 중복 코드를 작성하는 셈이 된다.
    - 함수는 일급객체 이므로 함수를 클래스 필드에 할당할 수 있다. 따라서 클래스 필드를 통해 메서드를 저으이할 수 있다. 하지만, 할당된 함수는 클래스 프로토타입 메서드가 아닌 인스턴스 메서드가 된다. 이는 그닥 권장하는 방법은 아니다.

    클래스 필드 정의 제안(위에서 다룬 내용)으로 인스턴스 프로퍼티를 정의하는 방식은 2가지가 되었다.

    1. 인스턴스 생성 시 외부값을 통해 클래스 필드 초기화가 필요한 경우: constructor에서 정의
    2. 클래스 필드 초기화가 필요 없는 경우: constructor와 클래스 필드 정의 둘 다 사용 가능

4. private 필드 정의 제안

JS는 완벽한 캡슐화를 지원하지 않는다. 또한 클래스의 인스턴스 프로퍼티는 언제나 public 하다. 하지만 최신 브라우저 (Chrome 74 이상) || 최신 Node.js(12 이상) 에서 private 필드를 정의할 수 있는 사항이 제안되었다. 아래 코드를 보면 알 수 있지만, private 필드를 참조할때는 `#` 을 붙여준다.

```jsx
class Person {
    #attribute = "";
    constructor(name, attribute) {
        this.name = "name";
        this.#attribute = attribute;
    }

    get UserInfo() {
        return { name: this.name, attribute: this.attribute };
    }
}

const me = new Person("Jeong");
console.log(me.#attribute);
/*
Uncaught SyntaxError: Private field '#attribute' must be declared in an enclosing class
*/
```

위 처럼 private로 선언된 클래스 필드는 클래스 내부에서만 참조가 가능하다. 하지만, 접근자 프로퍼티를 사용한다면 private한 클래스 필드에 접근이 가능하다.

```jsx
class Person {
    #attribute = "";
    constructor(name, attribute) {
        this.name = "name";
        this.#attribute = attribute;
    }

    get UserInfo() {
        return { name: this.name, attribute: this.#attribute };
    }
}

const me = new Person("Jeong", "zerg");
console.log(me.UserInfo);
```

\*private 필드는 반드시 클래스 몸체에 정의해야 한다. constructor에 정의하면 에러가 발생한다.

1. static 필드 정의 제안

    static 키워드를 사용해서 정적 메서드를 정의할 수 있었지만, static 키워드를 사용하여 정적 필드를 정의할 수는 없었다. 하지만, 최신 부라우저와 최신 Node.js에서 (각 Chrome 72 버전 12 이상) static public/private필드가 구현되었다.

    ```jsx
    class MyMath {
        static PI = 22 / 7;
        static #num = 10;

        static increment() {
            return ++MyMath.#num;
        }
    }
    ```
