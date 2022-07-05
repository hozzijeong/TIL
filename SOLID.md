# SOLID

SOLID 원칙이란 객체 지향 프로그래밍 및 설계에서 지향하는 프로그래밍 규칙입니다. 총 5가지로 이루어져 있으며 프로그래머가 시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때 이 원칙들을 함께 적용할 수 있습니다.

하지만 JS는 완전한 객체지향 언어는 아닙니다. JS는 함수형이면서 객체지향적인 성질을 동시에 지니고 있습니다. 최근 들어 React 등에서 함수형 프로그래밍을 지향하면서 class 기반의 코드를 거의 사용하지 않고 있습니다.(그렇다고 class가 아예 없어진 것은 아닙니다.) 함수형 프로그래밍을 지향한다고 해서 SOLID 원칙을 적용하지 못하는 것은 아니라고 생각합니다.

<aside>
💡 JavaScript Clean Code docs 나 TypeScript Clean Code docs에 이미 SOLID 원칙을 기준으로 한 코드 작성법이 나타와 있습니다.

</aside>

SOLID 원칙을 적용한 JavsScript/TypeScript 코드를 한번 보겠습니다.

---

## Single Response Principle (단일 책인 원칙)

<aside>
💡 함수(클래스)는 오직 하나의 책임을 가져야 한다. (하나의 변경 이유만을 가져야 한다. 같은 이유로 변경될 코드들은 모으고, 다른 이유로 변경될 코드들은 흩어라.

</aside>

너무 많은 기능이 한 함수에 있고 그 많은 기능 중 하나를 수정한다면, 같은 함수에 종속되어 있는 다른 함수 혹은 변수들에 어떤 영향을 줄지 모릅니다.

**Bad:**

```tsx
function emailClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Good:**

```tsx
function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

즉, 함수는 하나의 기능만을 수행하도록 하는 것입니다. 하나의 함수만을 사용하게 된다면 코드의 수정 및 에러 발생했을 때 처리하기 훨 씬 수월해집니다.

그 사이에서 함수의 [사이드 이펙트를 최대한 줄여봅니다](https://github.com/738/clean-code-typescript#%EC%82%AC%EC%9D%B4%EB%93%9C-%EC%9D%B4%ED%8E%99%ED%8A%B8%EB%A5%BC-%ED%94%BC%ED%95%98%EC%84%B8%EC%9A%94-%ED%8C%8C%ED%8A%B8-1). 또한 배열과 같은 변수를 사용할 때, 얕은 복사를 통해 원본 값이 변경되는 것을 최대한 방지합니다.

**Bad:**

```tsx
function addItemToCart(cart: CartItem[], item: Item): void {
  cart.push({ item, date: Date.now() });
}
```

**Good:**

```tsx
function addItemToCart(cart: CartItem[], item: Item): CartItem[] {
  return [...cart, { item, date: Date.now() }];
}
```

### 주의 사항

- 함수가 무엇을 하는지 명확한 함수 이름을 지어야 합니다.
- 각 함수는 단일 행동을 추상화 해야합니다.(하나의 개념만을 나타내야 합니다.)
- 무조건 기능을 분리한다고 SRP가 적용되는 것이 아닙니다. 각각의 용도에 병합이 순작용인 함수가 있고 분리가 순작용인 함수가 있습니다.

---

## Open/Closed Principle (개방-폐쇄 원칙)

<aside>
💡 소프트웨어 요소(클래스, 모듈, 함수 등)는 상속에 개방되어 있어야 하지만 수정에는 폐쇄되어 있어야 합니다.

</aside>

위 말이 의미하는 것은 **기존의 코드를 변경하지 않고 새로운 기능을 추가할 수 있도록 하는 것**입니다. 즉 기존 구성 요소를 쉽게 확장해서 재사용 할 수 있어야 한다는 의미입니다. OCP는 관리 가능하고 재사용 가능한 코드를 만드는 기반이 되고, OCP를 가능하게 하는 메커니즘은 추상화와 다형성입니다. OCP는 객체지향의 장점을 극대화하는 원리입니다.

개방-폐쇄 원칙의 적용 방법은 아래와 같습니다.

1. 변경(확장)될 것과 변하지 않을 것을 구분합니다.
2. 두 모듈이 만나는 지점에 인터페이스를 정의합니다.
3. 구현에 의존하기 보다 정의한 인터페이스에 의존하도록 합니다.
4. if문이나 switch 문을 사용하지 않습니다 → 여러 조건문이 걸리게 된다면 버그가 발생하기 쉽습니다.

함수형 프로그래밍에서 OCP를 잘 느낄수 있는 것은 map,filter,reduce와 같은 Method와 플러그인 혹은 middleware 개념입니다.

**Bad:**

```tsx
function getMutipledArray(array, option) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (option === "doubled") {
      result[i] = array[i] * 2; // 새로운 방식으로 만들기 위해서는 수정이 필요하다.
    }
    if (option === "tripled") {
      result[i] = array[i] * 3; // 옵션으로 분기는 가능하나
    }
    if (option === "half") {
      result[i] = array[i] / 2; // 새로운 기능을 추가하려면 함수 내에서 변경이 되어야 한다.
    }
  }
  return result;
}
```

**Good:**

```tsx
// option을 받는게 아니라 fn을 받아보자.
// 이제 새로운 array를 만든다는 매커니즘은 닫혀있으나 방식에 대해서는 열려있다.
function map(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = fn(array[i], i, array); // 내부 값을 외부로 전달하고 결과를 받아서 사용한다.
  }
  return result;
}

// 얼마든지 새로운 기능을 만들어도 map코드에는 영향이 없다.
const getDoubledArray = (array) => map(array, (x) => x * 2);
const getTripledArray = (array) => map(array, (x) => x * 3);
const getHalfArray = (array) => map(array, (x) => x / 2);
```

OCP가 적용되지 않은 코드를 보면 매개변수로 option을 받아 if문으로 변경한 것을 볼 수 있습니다. 하지만, Good 코드는 map이라는 공통된 함수(인터페이스)를 설정하고 매개변수로 함수를 받음으로써 용도에 따라 다양하게 사용이 가능하도록 하고 있습니다.

### 주의 사항

- 확장과 변경 모듈을 분리하는 과정에서 본인이 짜려는 의도에 맞게 크기 조절을 잘해야 합니다.
- 공통된 인터페이스(함수)는 가능하면 변경되면 안됩니다.
- 함수가 동작하는 행동에 따른 본질적인 정의를 통해 함수를 식별하고 작성해야 합니다.

---

## The Liskov Substitution Principle (리스코프 치환의 원칙)

<aside>
💡 “프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.” 계약에 의한 설계를 참고하라.

---

“만약 S가 T의 하위 타입이라면, T 타입의 객체는 S 타입의 객체로 대체될 수 있습니다. (예: S 타입 객체는 T 타입 객체로 치환될 수도 있습니다.) 이는 프로그램이 갖추어야할 속성(정확성, 수행되는 작업 등)을 변경하지 않아도 대체될 수 있습니다.”

</aside>

오… 뭔가 부모 클래스랑 자식 클래스를 바꿔도 오류가 발생하면 안된다… 부모랑 자식이 바뀌어도 결과는 같다. 뭐 이런 의미인 것 같습니다. (정의가 잘 이해가지 않습니다)

정사각형 - 직사각형 예시를 한번 받아보겠습니다 .수학적으로 정사각형은 직사각형입니다. 하지만 직사각형은 정사각형이 아닙니다.

즉 LSP는 상속을 받아 만든 하위타입의 제약 조건(가로와 세로 길이가 같아야 한다)들이 상위 타입에서 먼저 선언한 조건(가로와 세로의 길이가 달라도 됌)의 조건과 충돌이 일어나는 경우 유지 보수가 힘들어지기 때문에 만들어 진 것입니다. **계층간에 is-a 관계를 만족하더라도 하위 타입에서 가변성을 가지면서 상위 타입에서 정의한 조건과 일치하지 않으면 상속을 받지 말아야 합니다.**

이 원칙은 상속 기반이기 때문에 함수형 프로그래밍에 적용하기는 약간 힘들 수 있습니다. 하지만 원칙의 본질인 **먼저 선언된 조건들과 나중에 선언된 조건들의 충돌을 방지한다는 원칙**으로 본다면 다르게 접근할 수 있습니다.

---

## Interface Segregation Principle (인터페이스 분리의 원칙)

<aside>
💡 "클라이언트는 사용하지 않는 인터페이스에 의존하지 않는다”

</aside>

순수 함수, SRP와 비슷한 궤를 갖고 있습니다. 함수형 프로그램잉에 클래스를 가져온게 어불성설이긴 하지만, 한번에 하나의 인터페이스를 받는 함수형은 ISP를 위반하기 쉽지 않습니다.

**Bad:**

```tsx
interface SmartPrinter {
  print();
  fax();
  scan();
}

class AllInOnePrinter implements SmartPrinter {
  print() {
    // ...
  }

  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements SmartPrinter {
  print() {
    // ...
  }

  fax() {
    throw new Error("Fax not supported.");
  }

  scan() {
    throw new Error("Scan not supported.");
  }
}
```

**Good:**

```tsx
interface Printer {
  print();
}

interface Fax {
  fax();
}

interface Scanner {
  scan();
}

class AllInOnePrinter implements Printer, Fax, Scanner {
  print() {
    // ...
  }

  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements Printer {
  print() {
    // ...
  }
}
```

---

## Dependency inversion Principle (의존관계 역전 원칙)

<aside>
💡 1. 상위 레벨의 모듈은 하위 레벨의 모듈에 의존하지 않아야 합니다. 두 모듈은 모두 추상화에 의존해야 합니다.
2. 추상화는 세부사항에 의존하지 않아야 합니다. 세부사항은 추상화에 의존해야 합니다.

</aside>

우리는 DIP를 알기 전에 DI와 관련된 일에 대해 알아야 합니다.

<aside>
💡 **Dependency Injection (의존성 주입)**
DI란 의존관계를 외부에서 결정하고 주입하는 것을 의미합니다. 아래 세 가지 조건을 충족하는 작업을 의존관계 주입이라고 합니다.

- 클래스 모델이나 코드에는 런타임 시점의 의존관계가 드러나지 않는다. 그러기 위해서는 인터페이스만 의존하고 있어야 한다.
- 런타임 시점의 의존관계는 컨테이너나 팩토리 같은 제3의 존재가 결정한다.
- _의존관계는 사용할 오브젝트에 대한 레퍼런스를 외부에서 제공(주입)해줌으로써 만들어진다._
</aside>

함수형 프로그래밍이 적는 예시로 다음과 같은 좋은 예시가 있어서 공유합니다.

> React Component와 custom hook, axios API가 있다고 생각했을 때, React Component는 데이터를 얻기 원하고, custom hook은 component가 원하는 데이터를 가공하여 제공합니다(추상화). 그리고 axios API를 통해 서버로부터 데이터를 얻습니다.

이렇게 추상화된 레이어를 두는 이유는 컴포넌트 입장에서는 “데이터”가 필요한 것이지 “서버의 데이터”일 필요는 없습니다. 만약에 컴포넌트에서 직접적으로 axios를 호출했다가, 서버가 아닌 로컬에 있는 mock 데이터나 다른 데이터로 변경되었을 때 component의 코드를 아예 바꿔야 합니다.
즉, 구체적인 부분에 의존을 하면 안된다는 DIP 원칙에 어긋날 수 있는 설계입니다.
[https://velog.io/@teo/Javascript에서도-SOLID-원칙이-통할까#함수형-프로그래밍에서는요](https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C#%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%97%90%EC%84%9C%EB%8A%94%EC%9A%94)

>

---

객체지향 프로그래밍 설계를 할때 지켜지는 원칙을 함수형 프로그래밍에 적용하는 방식으로 설명한다고 해서 이해가 가지 않거나 할 수 있지만 사실 객체지향이니 함수형이니 모두 더 좋은 코드를 작성하기 위한 방법중 하나일 뿐이고, 한 개가 있으면 한개는 무조건 없어야 한다 그런 전제가 있는 것도 아닙니다. 객체 지향이 더 알맞을 때는 객체지향을 함수형 프로그램이이 더 알맞을 때는 함수형으로 코드를 작성하면 될 문제입니다. 이와 관련한 좋은 포스트 글이 있어서 여기에 공유 해봅니다.

---

### 참고 문헌:

[https://velog.io/@teo/Javascript에서도-SOLID-원칙이-통할까#객체지향의-원칙을-함수형에-적용을-해본다면](https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C#%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5%EC%9D%98-%EC%9B%90%EC%B9%99%EC%9D%84-%ED%95%A8%EC%88%98%ED%98%95%EC%97%90-%EC%A0%81%EC%9A%A9%EC%9D%84-%ED%95%B4%EB%B3%B8%EB%8B%A4%EB%A9%B4)

[https://www.xenonstack.com/blog/solid-principles-javascript](https://www.xenonstack.com/blog/solid-principles-javascript)

[https://mangsby.com/blog/programming/객체지향-5원칙-solid은-구시대의-유물인가/](https://mangsby.com/blog/programming/%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-5%EC%9B%90%EC%B9%99-solid%EC%9D%80-%EA%B5%AC%EC%8B%9C%EB%8C%80%EC%9D%98-%EC%9C%A0%EB%AC%BC%EC%9D%B8%EA%B0%80/)

[https://ko.wikipedia.org/wiki/SOLID*(객체*지향\_설계)](<https://ko.wikipedia.org/wiki/SOLID_(%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%EC%84%A4%EA%B3%84)>)

[https://github.com/labs42io/clean-code-typescript#solid](https://github.com/738/clean-code-typescript)

[nextree.co.kr/p6960/](http://nextree.co.kr/p6960/)

[https://tecoble.techcourse.co.kr/post/2021-04-27-dependency-injection/](https://tecoble.techcourse.co.kr/post/2021-04-27-dependency-injection/)
