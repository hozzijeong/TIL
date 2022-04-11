### 1 this 키워드

객체는 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나의 논리 단위로 묶은 자료구조다. 메서드를 사용할 때 자신이 속한 객체 상태 즉, 프로퍼티를 참조하고 변경할 수 있어야 하는데, 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.

객체로 선언한 변수를 메서드 내부에서 재귀적으로 참조할 수 있지만, 생성자 함수의 경우에 해당 인스턴스 값을 모르는 경우에는 처리하기 어려울 뿐더러, 해당 방식은 일반적인 방식도 아니다. **따라서 JS 에서는 this라는 식별자를 제공한다**

**this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기참조 변수다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.**

this 는 JS 엔진에 의해 암묵적으로 생성되며 arguments와 함께 함수 내부로 전달된다. **단, this가 가리키는 값은 함수 호출 방식에 의해 동적으로 결정된다.**

<aside>
💡 **this 바인딩**
바인딩이란 식별자와 값을 연결하는 과정을 의미한다. this 바인딩은 this와 this가 가리킬 객체를 바인딩 하는 것이다

</aside>

this는 어디서든 참조가 가능하지만, 주 용도가 객체의 프로퍼티나 메서드를 참조하기 위해 만들어진 것이므로 객체의 메서드 내부 혹은 생성자 함수에서만 의미가 있다. strict mode가 적용된 일반 함수 내부의 this는 undefined가 반환된다.

### 2 함수 호출 방식과 this 바인딩

앞에서도 언급했듯이 함수 호출 방식에 따라 동적으로 결정된다.

<aside>
💡 **렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.**
함수의 상위 스코프를 결정하는 방식인 레시컬 스코프는 함수 정의가 평가되어 객체가 생성되는 시점에 상위 스코프를 결정한다. 반면에 this 바인딩은 함수 호출 시점에 결정된다. 즉 **렉시컬 스코프는 함수의 정위 위치에 따라 상위 스코프가 결정**되고, t**his 바인딩은 함수의 호출 시점에 따라 this가 정의**된다.

</aside>

위에서도 언급했듯이 호출 시점에 따라 this 바인딩이 달라지는데, 함수 호출 방식에는 4가지 방식이 있다. 각각의 호출 방식에 따라 this 바인딩의 차이점을 보자

1. **일반함수 호출**

    기본적으로 전역 객체(window)가 바인딩된다. 다만 this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기참조 변수이므로 일반함수에서 this는 의미 없다. 따라서 strict mode 에서는 undefined가 바인딩 된다.

    콜백함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체 (window)가 바인딩 된다. **어떤 함수라도 일반 함수로 호출한다면 this에 전역객체가 바인딩 된다.**

    하지만, 보조 함수의 this와 메서드 내의 this가 다른 것은 메서드 동작에 있어서 치명적이다. 서로 다른 것을 참조하는 객체를 가지고 같은 용도로 사용하려 하기 때문이다. 따라서 콜백 함수의 this 바인딩과 메서드의 this 바인딩을 일치시키기 위해서 **ES6 에서는 화살표 함수를 사용하거나, Function.prototype.call/bind/apply 등 this 를 명시적으로 바인딩 할 수 있는 메서드들을 제공한다**

2. **메서드 호출**

    메서드는 `객체_이름.메서드_이름` 의 형식으로 호출된다. 여기서 주의할 점은 메서드 내부의 this는 메서드를 **소유한 객체가 아닌** 메서드를 **호출한 객체에 바인딩** 된다는 것이다.

    ```jsx
    const person = {
        name: "Lee",
        getName() {
            return this.name;
        },
    };

    const anotherPerson = {
        name: "Jeong",
    };

    anotherPerson.getName = person.getName;

    const getName = anotherPerson.getName;

    //앞에서도 언급했듯이 일반함수 호출은 this에 window를 바인딩 한다. 즉 window.name을 호출하는 것이다.
    console.log(anotherPerson.getName(), person.getName(), getName()); // Lee Jeong ''
    ```

    위 코드를 본다면 메서드 내부의 this는 프로퍼티 메서드를 가리키고 있는 객체와는 관계 없어 메서드를 호출한 객체에 바인딩 된다. 즉, person 객체의 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 **독립적으로 존재하는 별도의 객체다.**

    이는 프로토타입 메서드 내부에서 사용된 this도 똑같이 적용된다.

    ```jsx
    function Person(name) {
        this.name = name;
    }

    Person.prototype.getName = function () {
        return this.name;
    };

    const me = new Person("Jeong");

    Person.prototype.name = "Kim";

    console.log(me.getName(), Person.prototype.getName()); // Jeong Kim
    ```

    생성자 함수를 통해 생성된 인스턴스 me가 가리키는 name은 생성자에서 선언한 Jeong 이며, Person.prototype 객체가 가지고 있는 name 은 Kim 이다.

3. **생성자 함수 호출**

    생성자 함수 내부의 this에는 생성자 함수가 (앞으로) 생성할 인스턴스가 바인딩된다.

    ```jsx
    function Circle(radius) {
        this.radius = radius;
        this.getDiameter = function () {
            return this.radius * 2;
        };
    }

    const c1 = new Circle(5);
    const c2 = new Circle(10);
    const c3 = Circle.getDiameter;
    console.log(c1.getDiameter(), c2.getDiameter(), c3); // 10 20 undefined
    ```

    일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다. 만약 new 연산자 없이 함수를 호출한다면 일반 함수로 동작한다

4. **Function.prototype.apply/call/bind 메서드에 의한 간접 호출**

    apply,call,bind 메서드는 Function.prototype 메서드이다. 즉 모든 함수가 상속받아 사용 가능한 메서드이다.

    apply와 call 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

    ```jsx
    /*
    	@param thisArg - this로 사용할 객체
    	@param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
    	@returns 호출된 함수의 반환값
    */
    Function.prototype.apply(thisArg[,argsArray])
    /*
    	주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
    	@param thisArg - this로 사용할 객체
    	@param arg1,arg2, ... - 함수에게 전달할 인수 리스트
    	@returns 호출된 함수의 반환값
    */
    Function.prototype.call (thisArg[,arg1[,arg2[,...]]])
    ```

    ```jsx
    function getThisBinding() {
        return this;
    }

    const thisArg = { a: 1 };

    console.log(getThisBinding.apply(thisArg), getThisBinding.call(thisArg));
    ```

    **apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다.** apply와 call 메서드는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다. apply와 call 메서드는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작한다. 아래 예제를 다시 한번 보자

    ```jsx
    function getThisBinding() {
        console.log(arguments);
        return this;
    }

    const thisArg = { a: 1 };

    console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
    console.log(getThisBinding.call(thisArg, 1, 2, 3));
    /*
    	Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]0: 11: 22: 3callee: ƒ getThisBinding()length: 3Symbol(Symbol.iterator): ƒ values()[[Prototype]]: Object
    	{a:1}
    */
    ```

    apply 메서드는 호출할 함수의 인수를 배열로 묶어서 전달하지만, call 메서드는 쉼표를 통해 리스트 형식으로 전달한다. 인수 전달 방식을 제외하고 함수를 호출하는 기능은 똑같이 동작한다.

    apply와 call 메서드의 대표적 용도는 arguments 객체와 같은 유사배열 객체에 배열 메서드를 사용하는 경우이다. arguments 객체는 배열이 아니기 때문에 Array.prototype 메서드를 사용할 수 없지만 apply와 call을 사용한다면 가능하다.

    ```jsx
    function convertArgsToArray() {
        console.log(arguments); //

        const arr = Array.prototype.slice.call(arguments);
        console.log(arr); // [1,2,3]

        return arr;
    }

    convertArgsToArray(1, 2, 3);
    ```

    bind 메서드는 apply, call 메서드와 달리 함수를 호출하지 않고 this로 사용할 객체만 전달한다.

    ```jsx
    function getThisBinding() {
        return this;
    }

    const thisArg = { a: 1 };

    console.log(getThisBinding.bind(thisArg)); // getThisBinding
    console.log(getThisBinding.bind(thisArg)()); //{a:1}
    ```

    bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

    ```jsx
    const person = {
        name: "Jeong",
        foo(callback) {
            setTimeout(callback, 100);
        },
    };

    person.foo(function () {
        console.log(this.name); // ' '
    });
    // 일반함수로 호출된  콜백함수의 this는 전역객체를 바인딩하기 때문에 아무것도 의도한 대로 this.name이 반환되지 않는다.
    ```

    ```jsx
    const person = {
        name: "Jeong",
        foo(callback) {
            setTimeout(callback.bind(this), 100);
        },
    };

    person.foo(function () {
        console.log(this.name); // Jeong
    });
    ```

    첫 번째 코드의 문제는 내부 함수의 this와 콜백의 this가 같지 않아서 발생한 문제이다. bind를 통해 this를 일치시켜서 해당 문제를 해결할 수 있다.

    - bind 메서드는 ES6부터 도입된 메서드입니다. 따라서 ES6 이전에는 call과 apply를 통해서 bind를 구현했었는데 이를 한번 구현해보려 합니다.
      ES6 버전

    ```jsx
    Function.prototype.newBind = function (target, ...args) {
        if (typeof this !== "function") throw new Error("함수가 아닙니다.");
        const that = this;
        return function (...rest) {
            return that.call(target, ...args, ...rest);
        };
    };

    const obj = function (...rest) {
        for (const v of rest) {
            this[v] = v;
        }
        return this;
    };
    const person = {
        name: "Jeong",
        age: 23,
    };
    console.log(obj.newBind(person, "나이", "직업")());
    ```

    ES5 버전

    ```jsx
    Function.prototype.newBind = function (target) {
        if (typeof this !== "function") throw new Error("함수가 아닙니다");
        var args = Array.prototype.slice.call(arguments);
        var that = this;
        return function () {
            var rest = Array.prototype.slice.call(arguments);
            return that.apply(target, args.concat(rest));
        };
    };

    var obj = function () {
        var rest = Array.prototype.slice.call(arguments);
        for (let i = 1; i < rest.length; i++) {
            this[rest[i]] = rest[i];
        }
        return this;
    };
    var person = {
        name: "Jeong",
        age: 23,
    };
    console.log(obj.newBind(person, "나이", "직업")());
    ```
