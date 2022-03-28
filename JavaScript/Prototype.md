## 프로토타입

자바 스크립트의 상속 및 객체 지향을 설명하는데 빠질 수 없는 자바 스크립트의 근간을 이루고 있는 중요한 개념입니다. 자바스크립트는 객체 지향 언어이며 원시타입을 제외한 나머지 값들은 모두 객체입니다. 그렇다면 객체 지향이란 무엇인지 아래에서 한번 보겠습다.

## 1 객체 지향

객체지향 프로그래밍이란 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 의미합니다. 여기서 **객체는 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조**입니다.

객체 지향 프로그래밍은 객체의 상태를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어서 생각합니다. 객체의 상태 데이터를 **프로퍼티**, 동작을 **메서드** 라고 부릅니다.

각 객체는 독립적인 부품으로 볼 수 있지만, 다른 객체와의 관계를 가질 수 있습니다. 다른 객체와 메세지를 주고받거나 데이터 처리가 가능하며 다른 프로퍼티나 메서드를 상속받아 사용하기도 합니다.

## 2 상속과 프로토타입

상속이란 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 사용할 수 있는 것을 의미합니다. 자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거합니다. 아래 예시를 한번 보겠습니다.

```jsx
function Circle(radius) {
    this.radius = radius;
    this.getArea = function () {
        return Math.PI * this.radius ** 2;
    };
}

const c1 = new Circle(1);
const c2 = new Circle(2);

console.log(c1.getArea === c2.getArea); // false
console.log(c1.getArea(), c2.getArea());
```

같은 생성자 함수를 통해서 메서드를 인스턴스를 생성하고 거기에 맞춰 프로퍼티와 메서드를 가졌는데, 같은 생성자 함수로 생성되었다고 해도 각각이 가지고 있는 메서드의 값은 다릅니다. 또한, 메서드의 식은 같은데 인스턴스에 Circle의 메서드를 여러번 중복해서 소유하게 됩니다. 위 코드에서는 인스턴스가 2개뿐이라 상관이 없지만 만약에 1억개라면 불필요한 메모리 낭비가 발생합니다.

하지만 프로토타입을 이용한 상속을 구현한다면

```jsx
function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
};

const c1 = new Circle(1);
const c2 = new Circle(2);

console.log(c1.getArea === c2.getArea); // true
console.log(c1.getArea(), c2.getArea());
```

다음과 같이 구현이 됩니다. 인스턴스끼리 메서드 비교를 했을 때 그 값이 같고 계산 결과 또한 같습니다. 1번째 코드와 2번째 코드의 메서드 상황을 그림으로 표현하면 아래와 같습니다

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9405214e-2d24-461b-99cf-45f2337568ae/Untitled.png)

상속은 코드의 재사용이란 관점에서 유용한 개념입니다. 생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현하면 인스턴스들은 별도의 구현 없이 상위 객체의 자산을 공유하여 사용할 수 있습니다.

## 3 프로토타입 객체

프로토타입 객체란 상속을 구현하기위해 사용됩니다. 프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티를 제공합니다. 프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티를 자유롭게 사용할 수 있습니다.

모든 객체는 [[Prototype]] 이라는 내부 슬롯을 가지고 이 슬롯의 값은 프로토타입의 참조입니다. [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정되는데 이는 객체 생성 방식에 따라 프로토타입이 결정되고, [[Prototype]] 슬롯에 저장되는 것을 알 수 있습니다.

모든 객체는 하나의 프로토타입을 갖습니다. 그리고 모든 프로토타입은 생성자 함수와 연결되어 있습니다. 즉, 객체와 프로토타입과 생성자 함수는 다음과 같이 연결되어있음을 알 수 있습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5eab3090-7938-4ad1-9de0-b5b3fbeff185/Untitled.png)

[[Prototype]] 내부에 직접 접근할 수는 없지만 `__proto __` 접근자 프로퍼티를 통해 간접적으로 접근 할 수 있습니다. 프로토타입은 constructor를 통해 생성자 함수에 접근이 가능하고, 생성자함수는 prototype 프로퍼티를 통해 프로토타입에 접근이 가능합니다.

1. **`__proto__`접근자 프로퍼티**

    모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입에 간접적으로 접근이 가능합니다.

    - **`__proto__`는 접근자 프로퍼티다**
        **`__proto__`**는 getter/setter함수라고 부르는 접근자 함수를 통해 프로토타입을 취득하거나 할당합니다. **`__proto__`**를 통해 프로토타입에 접근하면 내부적으로 getter 함수가 호출되고 **`__proto__`**에 새로운 값을 할당하면 setter 함수가 호출됩니다.
    - **`__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.**
        **`__proto__`** 접근자 프로퍼티는 객체가 직접 소유하는 것이 아니라 Object.prototype의 프로퍼티입니다. 즉 상속을 통해 **`__proto__`**접근자 프로퍼티를 사용할 수 있습니다.
    - **`__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유**
        **`__proto__`**를 통해 프로토타입에 접근하는 이유는 상호참조에 의해 프로토타입 체인이 생성되는것을 방지하기 위해서 입니다. 아래 예시를 보면 알 수 있습니다.
        ```jsx
        const parent = {};
        const child = {};

        child.__proto__ = parent;
        parent.__proto__ = child; // Uncaught TypeError: Cyclic __proto__ value
        ```
        만약에 서로가 서로의 프로토타입이 되려고 한다면 비정상적인 프로토타입 체인이 생성되기 때문에 에러를 발생시킵니다. 왜냐하면, 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 하기 때문입니다. 하지만 순환 참조 하는 형식으로 프로토타입 체인이 이루어 진다면 **프로토타입 체인 종점이 존재하지 않기 때문에 프로퍼티 검색에서 무한 루프에 빠지게 됩니다.** 따라서 무조건적으로 프로토타입 교체를 할 수 없도록 `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있습니다.  

    - **`__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는것은 권장하지 않는다**
        코드 내에서 `__proto__`접근자 프로퍼티를 직접 사용하는 것을 권장하지 않는데, 이는 모든 객체가 `__proto__`접근자 프로퍼티를 사용할 수 있는것이 아니기 때문입니다. 직접 상속을 통해 `Object.prototype`을 상속받지 않는 객체를 생성하는 경우는 `__proto__`접근자 프로퍼티 사용이 제한됩니다.
        따라서 `__proto__` 대신 프로토타입의 참조를 얻고 싶은 경우에는 `Object.getPrototypeOf` 메서드를 사용하고 교체하고 싶은 겨웅에는 `Object.setPrototypeOf` 메서드 사용을 권장합니다. 위 2개 메서드는 `get / set Object.prototype.__proto__` 의 내용과일치합니다.

    1. **함수 객체의 prototype 프로퍼티**

        함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킵니다. 따라서 생성자 함수로서 호출할 수 없는 함수 non-constructor 인 화살표 함수와 축약 메서드의 경우 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않습니다.

        생성자 함수로 호출하기 위해 정의하지 않은 일반 함수도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않은 일반함수의 prototype 프로퍼티는 아무 의미가 없습니다.

        모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킵니다. 하지만 이들 프로퍼티를 사용하는 주체가 각기 다릅니다.

        | 구분 | 소유 | 값  | 사용 주체 | 사용 목적 |
        | ---- | ---- | --- | --------- | --------- |

        | **proto**  
        접근자 프로퍼티 | 모든 객체 | 프로토타입의 참조 | 모든 객체 | 자신의 프로토타입에 접근 또는 교체하기 위해 사용 |
        | prototype
        프로퍼티 | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 인스턴스의 프로토타입을 할당하기 위해 사용 |

        예시로 생성자 함수로 객체 생성 후, `__proto__` 접근자 프로퍼티와 prototype 프로퍼티로 프로토타입 객체에 접근하면 아래와 같이 나옵니다.

        ```jsx
        function Person(name) {
            this.name = name;
        }

        const me = new Person("Jeong");

        console.log(Person.prototype === me.__proto__); // true
        ```

        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2e34b947-6eff-470f-8873-f07b161851d3/Untitled.png)

    2. **프로토타입의 constructor 프로퍼티와 생성자 함수**

        모든 프로토타입은 constructor 프로퍼티를 갖습니다. 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있느 생성자 함수를 가리킵니다. 이 프로퍼티는 함수 객체가 생성될 때 이루어집니다.

        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2201af2-a11f-49ce-9bee-c5e0af3dba2f/Untitled.png)

        위 그림에서 Person 생성자 함수는 me 객체를 생성했습니다. 이 때 이 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결됩니다. me 객체에는 constructor 가 없지만 상위 객체인 `Person.prototype`에는 constructor가 있기 때문에 이 프로퍼티를 상속받아 사용할 수 있습니다.

## 4 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

위 그림에서 본 것과 같이 생성자 함수에 의해 생겨난 인스턴스는 생성자 함수의 prototype의 constructor 프로퍼티에 의해 생성자 함수와 연결이 됩니다. 리터럴 표기법과 같이 생성자 함수를 통해서가 아닌 객체 생성 방식도 존재합니다.

리터럴 표기법에 의해 생성된 객체도 프로토타입이 존재하지만, 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없습니다.

```jsx
const obj = {};

console.log(obj.constructor === Object); // true
```

obj 객체를 리털러 방식으로 생성하였을 때, Object의 생성자 함수와 같다고 표기가 됩니다. 그렇다면 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수로 생성되는가에 대한 의문은 ECMAScript 사양을 통해 알 수 있습니다.

<aside>
❓ **Object 생성자 함수**

Object 생성자 함수에 인수를 전달하지 않거나 undefined 또는 null을 인수로 전달하면서 호출하면 내부적으로 추상 연산 `OrdinaryObjectCreate`를 호출하여 `Object.prototype`을 프로토타입으로 갖는 빈 객체를 생성합니다.

</aside>

객체 리터럴이 평가될 때는 추상연산 `OrdinaryObjectCreate`를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하게 정의되어있습니다. 이처럼 생성자 함수 호출과 리터럴 평가는 빈 객체를 생성하는 점에서 동일하지만 new.target의 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 차이가 존재합니다. 따라서 **객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아닙니다.**

함수 객체의 경우 생성자를 통해 만들어진 객체와 리터럴의 차이가 더 명확한데, Function 생성자 함수를 호출하여 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인것 처럼 스코프를 생성하여 클로저도 만들지 않습니다. 따라서 함수 선언문과 함수 표현식을 평가하여 생성한 함수 객체는 Function 생성자 함수가 아닙니다.

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요합니다. 따라서 리터럴 표기법에 의해 성성된 객체도 가상정인 생성자 함수를 가지며 프로토타입은 생성자 함수와 같이 생겨납니다. 즉, **프로토타입과 생성자 함수는 언제나 쌍으로 존재합니다.**

리터럴 표기법에 의해 생성된 객체는 생성자 함수를 통해 생성된 객체는 아니지만 큰 틀에서 봤을때 결국에는 객체로서 동일한 특성을 가지기 때문에 본질적인 면에서 큰 차이는 존재하지 않습니다.

## 5 프로토타입의 생성 시점

프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됩니다. 생성자 함수는 사용자 정의 생성자 함수와 JavaScript 빌트인 생성자 함수로 구분이 가능합니다. 두 생성자 함수의 관점으로 프로토타입 생성 시점을 살펴보겠습니다.

1. **사용자 정의 생성자 함수와 프로토타입 생성 시점**

    내부 메서드 [[Construct]]를 갖는 함수객체는 new 연산자와 함께 생성자 함수로서 호출할 수 있습니다. **constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성이 됩니다.**

    함수 선언문은 런타임 이전에 평가 될 때 먼저 실행되기 때문에 선언문에서 평가과 동시에 프로토타입도 생성이 됩니다. 이때 생성된 프로토타입은 오직 constructor 프로퍼티만을 갖는 객체입니다. 프로토타입도 객체이기 때문에 자신만의 프로토타입을 갖게 됩니다. 생성된 프로토타입의 프로토타입은 Object.prototype입니다.

    이처럼 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입이 생성되며, 프로토타입의 프로토타입은 Object.prototype 입니다.

2. **빌트인 생성자 함수와 프로토타입 생성 시점**

    빌트인 생성자 함수 역시 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성됩니다. 그리고 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성됩니다. 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩됩니다.

    이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재합니다. 이후 **생성자 함수 혹은 리터럴 방식으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당되며 이로써 객체는 프로토타입을 상속 받습니다**.

## 6 객체 생성 방식과 프로토타입의 결정

객체는 다양한 방식으로 생성될 수 있고 세부적인 객체 생성 방식의 차이는 있으나 추상연산 `OrdinaryObjectCreate`에 의해 생성된다는 공통점이 있습니다.

추상연산에 의해 생성되는 객체의 순서는 아래와 같습니다.

1. 생성할 객체의 프로토타입을 인수로 전달 받는다.
2. 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달 할 수 있다
3. 빈 객체를 생성 후, 객체에 추가할 프로퍼티 목록이 인수로 전달된 경우 해당 프로퍼티를 객체에 추가한다.
4. 인수로 잔달받은 프로토타입을 자신이 생성한 객체의 [[prototype]] 내부 슬롯에 할당한다
5. 생성한 객체를 반환한다.

즉, 프로토타입은 추상연산에 전달되는 인수에 의해 결정됩니다. 이 인수는 객체가 생성되는 시점에 생성 방식에 의해 결정됩니다. 아래 내용은 객체 생성 방식에 따른 프로토타입의 특징에 대한 설명입니다.

1. **객체 리터럴에 의해 생성된 객체의 프로토타입**

    객체 리터럴을 통해 객체를 생성할 때 추상연산에 전달되는프로토타입은 Object.prototype입니다. 즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype입니다. Object.prototype을 상속받기 때문에 Object.prototype의 프로퍼티들을 자유롭게 사용이 가능합니다.

2. **Object 생성자 함수에 의해 생성된 객체의 프로토타입**

    Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성됩니다. 또한 객체 리터럴과 마찬가지로 추상 연산이 호출됩니다. 이때 추상 연산에 전달되는 인수는 Object.prototype입니다. (맞습니다 객체 리터럴과 같습니다.)

    객체 리터럴과의 차이는 프로퍼티를 추가하는 방식에 있습니다. 객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만, Object 생성자 함수 방식은 빈 객체를 생성한 이후 프로퍼티를 추가해야 합니다.

3. **생성자 함수에 의해 생성된 객체의 프로토타입**

    new 연산자를 통해 인스턴스를 생성하면 다른 객체 생성 방식과 같이 추상 연산이 호출됩니다. 이때 전달되는 인수는 생성자 함수의 prototype 프로퍼티에 바인딩 되어있는 객체입니다. 즉 인스턴스의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩 되어있는 객체입니다.

    표준 빌트인 객체 Object를 통해 생성된 프로토타입은 다양한 메서드들을 가지고 있지만, 생성자 함수와 더불어 생성된 prototype의 프로퍼티는 constructor 뿐입니다. 따라서 여기에 원하는 프로퍼티를 추가/삭제 할 수 있습니다.

    **하지만 결국에 Person.prototype 역시 Object.prototype을 상속 받았다는 점. 즉 인스턴스 역시 Object에 있는 메서드들을 상속받아 사용이 가능합니다.**

    ```jsx
    function Person(name) {
        this.name = name;
    }

    const me = new Person("Jeong");

    console.log(Person.hasOwnProperty("name"), me.hasOwnProperty("name")); //true true
    ```

## 7 프로토타입 체인

JS는 객체의 프로퍼티/메서드에 접근하려고 할 때 객체에 접근하려는 프로퍼티가 없다면 내부 슬롯의 참조를 따라 부모 프로토타입의 프로퍼티를 순차적으로 검색합니다. 이를 **프로토타입 체인**이라고 합니다. 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘 입니다.

프로토타입 체인의 최상위 객체는 언제나 Object.prototype입니다. 이를 프로토타입 체인의 종점이라고 합니다. Object.prototype의 내부 슬롯의 값은 null 입니다. 부모의 프로토타입 객체를 모두 검색했을때도 프로퍼티/메서드가 존재하지 않는다면 undefined를 반환합니다.

<aside>
💡 프로토타입 체인 VS 스코프 체인
프로퍼티/메서드의 검색은 프로토타입 체인에서 검색이 이루어 집니다. 반면에 프로퍼티가 아닌 식별자는 스코프체인에서 검색을 합니다. 
즉, **프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘이고, 스코프 체인은 식별자 검색을 위한 메커니즘 입니다.**

</aside>

```jsx
me.hasOwnProperty("name");
```

위 예제는 스코프 체인에서 me 식별자 검색을 합니다. me 식별자를 검색한 다음 프로토타입 체인을 통해 hasOwnProperty 메서드를 검색합니다. 이와 같이 **스코프 체인과 프로토타입 체인은 연관없이 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는데 사용**됩니다.

## 8 오버라이딩과 프로퍼티 섀도잉

<aside>
💡 **오버라이딩과 오버로딩**
오버라이딩: 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식.
오버로딩: 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식. JS에서는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현 가능

</aside>

프로토타입이 소유한 프로퍼티를 프로토타입 프로퍼티. 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 합니다. 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면, 프로토타입 체인을 따라 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 **인스턴스 프로퍼티에 추가됩니다**. 이때 인스턴스 메서드는 같은 이름의 프로토타입 메서드를 오버라이딩 했고, 프로토타입 메서드는 가려지게 됩니다. 이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 **프로퍼티 섀도잉** 이라고 합니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6dc18877-9414-4cbf-9d3b-ae90a6e17c1a/Untitled.png)

프러파티를 삭제하는 경우 역시 마찬가지 입니다. 인스턴스의 프로퍼티를 삭제한다고 해서 같은 이름의 프로토타입 프로퍼티가 삭제되지 않습니다. 하위 객체를 통해 프로토타입의 프로퍼티를 삭제하는 것은 불가능합니다. 즉 하위 객체에 대해 get은 허용하지만 set은 허용하지 않습니다. 프로토타입 프로퍼티를 삭제하기 위해서는 프로토타입에 직접 접근해야 합니다.

## 9 프로토타입의 교체

프로토타입은 임의의 객체로 변경이 가능합니다. 이는 부모 객체의 프로토타입을 동적으로 변경할 수 있음을 의미합니다. **이러한 특성을 이용해서 상속 관계를 동적으로 변경할 수 있습니다**. 프로토타입은 생성자 함수 또느 인스턴스에 의해 변경이 가능합니다.

1. **생성자 함수에 의한 프로토타입 교체**

    ```jsx
    const Person = (function () {
        function Person(name) {
            this.name = name;
        }
        console.log(Person.constructor); // Function : 프로토타입 교체 전

        // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체...①
        Person.prototype = {
            sayHello() {
                console.log(`Hi, My name is ${name}`);
            },
        };

        return Person;
    })();

    const me = new Person("me");

    me.sayHello(); // Hi, My name is
    console.log(me.constructor); // Object : 프로토타입 교체 후
    ```

    ①에서 Person.prototype에 객체 리터럴을 할당했습니다. 이는 Person 생성자 함수가 생성할 객체의 프로토타입을 객체 리터럴로 교체한 것 입니다. 교체된 그림은 아래와 같습니다.

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea6f9272-15e4-4f4f-bf42-5d73cf84fdde/Untitled.png)

    교체된 프로토타입에는 constructor 프로퍼티가 존재하지 않습니다. 교체된 프로토타입이 객체 리터럴이기 때문에 객체 리터럴의 프로토타입을 생성할 때 암묵적으로 추가된 프로퍼티입니다. 따라서 me객체의 생성자 함수 프로퍼티를 검색해보면 Person이 아닌 Object가 나오게 됩니다.

    이와같이 프로토타입 교체가 이루어진다면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴됩니다. 파괴된 constructor 프로퍼티와 생성자 함수의 연결을 유지하는 방법은 아래와 같습니다.

    ```jsx
    const Person = (function () {
        function Person(name) {
            this.name = name;
        }

        Person.prototype = {
            constructor: Person,
            sayHello() {
                console.log(`Hi, My name is ${this.name}`);
            },
        };

        return Person;
    })();

    const me = new Person("Jeong");

    me.sayHello();
    console.log(me);
    console.log(me.constructor === Person);
    console.log(me.constructor === Object);
    ```

2. **인스턴스에 의한 프로토타입 교체**

    프로토타입은 생성자 함수의 prototype 프로퍼티 뿐 아니라 인스턴스의 **proto **접근자 프로퍼티를 통해 접근할 수 있습니다. 따라서 이를 통해서 프로토타입의 프로퍼티 교체가 가능합니다.

    생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩 하는 것은 **미래에 생성할 인스턴스의 프로토타입을 교체**하는 것입니다. 하지만 **proto**접근자를 통해 프로토타입을 교체하는 것은 생성된 객체의 프로토타입을 교체하는 것입니다.

    ```jsx
    function Person(name) {
        this.name = name
    }

    const me = new Person("Jeong")

    const parent = {
        sayHello() {
            console.log(`Hi, My name is ${this.name}`)
        }
    }
    ① me 객체의 프로토타입을 parent객체로 교체
    Object.setPrototypeOf(me, parent)

    me.sayHello()
    ```

    ①에서 me 객체의 프로토타입을 parent 객체로 교체했습니다. 이를 표현하면 아래와 같습니다.

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/15674806-c112-4c7a-b2ee-cfa351d20fd1/Untitled.png)

    이전에서 봤듯이 교체된 프로토타입에는 constructor가 존재하지 않습니다. 따라서 프로토타입의 constructor 프로퍼티로 me객체의 생성자 함수를 검색한다면 Object가 나오게 됩니다.

    생성자 함수에 의한 프로토타입 교체와 인스턴스에 의한 프로토타입 교체는 큰 차이가 없어보이지만 미묘한 차이가 있습니다. 그것은 **생성자 함수의 prototype 프로퍼티가 교체된 프로퍼티를 가리키는지에 대한 유무입니다. 생성자 함수는 true이고 인스턴스는 false입니다.**

    파괴된 연결을 다시 살리기 위해서는 교체되는 프로토타입 객체의 프로퍼티에 constructor 프로퍼티를 추가하는 방법이 있습니다.

    ```jsx
    const parent = {
        constructor: Object, // 원하는 생성자 함수 연결
        function() {},
    };
    ```

    프로토타입 교체를 직접 하는 것은 꽤나 번거롭고 직접 하는 것을 추천하지 않습니다. 상속 관계를 인위적으로 설정하기 위해서는 직접 상속을 하거나 클래스를 통해 상속을 구현할 수 있습니다.

## 10 instanceof 연산자

instanceof 연산자는 이항 연산자로 좌변에 객체를 가리키는 식별자 우변에 생성자 함수를 가리키는 식별자를 피식별자로 받습니다. 우변의 피연산자가 함수가 아닌 경우 `TypeError`가 발생합니다.

```jsx
object instanceof function // 생성자 함수
```

instanceof 연산자는 우변의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true 아니면 false를 반환합니다.

```jsx
function Person(name) {
    this.name = name;
}

const me = new Person("Jeong");

console.log(me instanceof Person); //true
console.log(me instanceof Object); //true

const parent = {};

Object.setPrototypeOf(me, parent);

console.log(Person.prototype === parent); //false
console.log(parent.constructor === Person); // false

console.log(me instanceof Person); // false
console.log(me instanceof Object); // true

Person.prototype = parent;

console.log(me instanceof Person); //true
console.log(me instanceof Object); //true
```

위 코드처럼 instanceof 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 **생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인하는 연산자입니다.**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4618ff45-8f7a-418b-987d-7986f21f58c9/Untitled.png)

생성자 함수에 의해 프로토타입이 교체되어 constructor 프로퍼티와 생성자 함수간의 연결이 파괴되어도 생성자 함수의 prototype 프로퍼티와 프로토타입간의 연결은 파괴되지 않으므로 instanceof는 아무런 영향을 받지 않습니다. 반면에, 인스턴스를 활용한 프로토타입 교체는 끊기게 됩니다.

## 11 직접 상속

1. **Object.create에 의한 직접 상속**

    Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성합니다. 해당 메서드 역시 추상 연산을 통해 객체를 생성합니다.

    해당 메서드의 첫 번째 매개변수는 생성할 객체의 프로토타입으로 지정할 객체를 전달하고 두 번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이루어진 객체를 전달합니다. 두 번째 인수는 생략이 가능합니다.

    Object.create 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성합니다. 즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것입니다. 해당 메서드의 장점은 아래와 같습니다.

    - new 연산자 없이도 객체 생성이 가능하다
    - 프로토타입을 지정하면서 객체 생성이 가능하다
    - 객체 리터럴에 의해 생성된 객체도 상속 받을 수 있다.

    하지만 ESLint 에서는 Object.prototype의 빌트인 메서드르 객체가 직접 호출하는 것을 권하지 않습니다. 왜냐하면 Object.create 메서드를 통해 프로토타입 체인의 종점에 위치하는 객체를 생성 할 수 있기 때문입니다. 프로토타입 종점에 위치하는 객체는 Object.prototype 빌트인 메서드 사용이 제한됩니다.

    따라서 Object.prototype의 빌트인 메서드는 call 을 이용해서 간접적으로 호출하는 것이 좋습니다.

    ```jsx
    const obj = Object.create(null);
    obj.a = 1;

    console.log(obj.hasOwnProperty("a")); // Error

    console.log(Object.prototype.hasOwnProperty.call(obj, "a")); // true
    ```

2. **객체 리터럴 내부에서 **proto**에 의한 직접 상속**

    Object.create 메서드를 통해 구현한 직접 상속은 여러 장점이 있지만, 두 번째 인자로 프로토타입을 정의하는 것은 쉬지 않습니다.

    ES6에서는 객체 리터럴 내부에서 **proto** 접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있습니다.

    ```jsx
    const myProto = { x: 10 };

    const obj = {
        y: 20,
        __proto__: myProto,
    };

    console.log(obj.x, obj.y); // 10,20
    console.log(Object.getPrototypeOf(obi) === myProto); // true
    ```

## 12 정적 프로퍼티/메서드

정적 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출하 수 있는 프로퍼티/메서드를 의미합니다. 정적 프로퍼티/메서드는 인스턴스로 참조/호출할 수 없습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e58be391-a50b-4195-a500-c70dcdd69458/Untitled.png)

인스턴스는 자신의 프로토타입 체인에 속한 객체의 프로퍼티/메서드에 접근이 가능하지만, 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 프로퍼티/메서드가 아니기 때문에 인스턴스로 접근할 수 없습니다.

만약에 인스턴스/프로토타입 메서드 내에서 this를 사용하지 않는다면 그 메서드는 정적 메서드로 변경할 수 있습니다. 인스턴스가 호출한 프로퍼티/메서드에서 this는 인스턴스를 가리킵니다. 하지만 **메서드 내에서 인스턴스를 참조할 필요가 없다면 정적 메서드로 변경(`생성자.메서드`)하여도 동작합니다.** [MDN](https://developer.mozilla.org/ko/)과 같은 문서를 보면 정적 프로퍼티/메서드와 프로토타입 프로퍼티/메서드를 구분하여 소개하고 있습니다.
