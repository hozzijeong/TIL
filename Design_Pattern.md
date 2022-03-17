## 아키텍쳐란?

> 아키텍처란 구조화 된 옷장과 비슷한 겁니다. 처음 개발 할 때에는 규칙없이 그냥 코드를 만들다 보면 덩치가 커지는 순간 불편함이 생기고 정리가 안 되는 시점이 생깁니다. 그러니 처음부터 특정한 규칙을 만들어서 개발을 하는게 좋다는 것을 알게 되고 규칙을 하나씩 만들어가며 개발을 하다보면 이것이 반복이 되어 하나의 특정 **패턴**이 만들어집니다. 이러한 패턴들을 모두가 이해하고 따를 수 있도록 하는 구조를 **아키텍쳐**라고 부릅니다.

**소프트웨어 관점에서 지속적으로 관리가 잘 되는 코드를 위해서는 좋은 아키텍처가 필요하다.**

## 프론트엔드 아키텍쳐

앞서 언급했던 아키텍쳐의 조건처럼 좋은 아키텍쳐란 좋은 구조를 의미한다. 좋은 구조의 조건은 **좋은 분류**이다.

### MVC 아키텍쳐

MVC(Model - View - Controller) 패턴은 사용자 인터페이스, 데이터 논리 제어를 구현하는데 널리 사용되는 디자인 패턴이다. MVC에 기반을 둔 패턴으로는 밑에서 다룰 MVVM,MVP,MVW가 있다.

MVC의 각 용어들은 아래와 같이 정의할 수 있다.

Model : 데이터와 비즈니스 로직 관리

-   앱이 포함해야 할 데이터 정의(데이터 주관 영역)
-   데이터 상태 변경시 뷰 또는 컨트롤러에 상태 전달

    View : 레이아웃과 화면을 처리

-   앱의 데이터 보여주는 방식 정의
-   HTML과 CSS로 만들어지는 결과물

    Controller : 명령을 모델과 뷰 부분으로 라우팅

-   Model의 데이터를 받아 화면에 그림 → 사용자 동작을 받아 Model 변경
-   Model과 View 중간 역할

> \*\*MVC가 나뉜 이유

1. 화면을 다루는 문제와 데이터를 다루는 문제의 성격이 다름
2. Model과 View 간의 의존관계를 최소화 해서 서로 독립적이게 운영하고 싶어서\*\*
    >

MVC 패턴은 복잡한 대규모 프로그램을 개발하면서 문제점이 드러난다. 다수의 View와 Model이 Controller를 통해 복잡하게 연결되기 때문에 Controller의 크기가 커지는 Massive ViewController이 되어비린다.

이는 View 혹은 Model의 수정시 테스트가 힘들고 파악이 어렵기 때문에 Side-Effect를 야기하는 문제점이 있다.

### MVVM 아키텍쳐

MVVM (Model - View - View Model) 을 구성하고 있는 디자인 패턴이다.

Model : 데이터와 비즈니스 로직 관리

-   앱이 포함해야 할 데이터 정의(데이터 주관 영역)
-   데이터 상태 변경시 뷰 또는 컨트롤러에 상태 전달

    View : 레이아웃과 화면을 처리

-   앱의 데이터 보여주는 방식 정의
-   HTML과 CSS로 만들어지는 결과물

    View Model : View를 표현하기 위해 만든 View를 위한 Model

-   화면에 표시할 데이터만 만들어서 프레임 워크에 전달

MVVM패턴은 Command 패턴과 Data Binding 두 가지 패턴을 사용하여 구현되었다. 두 패턴을 이용하여 View와 View Model 사이의 의존성을 없앴다. View Model 과 View는 1:n의 관계이다.

> Model이 변하면 View를 수정하고 View에서 이벤트를 받아서 Model를 변경한다는 Controller의 역할은 그대로 인데 이를 구현하는 방식이 jQuery와 같은 DOM 조작에서 **템플릿과 바인딩을 통한 선언적인 방법**으로 변하게 된다.

<aside>
💡 MVC → MVVM 으로 변환되면서 나타난 차이점
1. 컨트롤러의 반복적인 기능이 선언적인 방식으로 개선되었다.
2. Model과 View의 관점을 분리하려 하지 않고 하나의 템플릿으로 관리하려는 방식으로 발전했다. (기존에는 class나 id를 통해 간접적으로 HTML에 접근했다면, 이제는 직접적으로 접근한다.)

</aside>

### MVP아키텍쳐

MVP(Model - View - Presenter)을 구성하는 디자인 패턴이다. MVC에서 Controller 역할을 Presenter가 한다. MVC와의 차이점은 Model과 View가 서로 연결되어 있는 의존관계를 가지고 있지만, MVP는 Model과 View가 분리되어 오직 Persenter를 통해서 상태변화를 알려줄 수 있다.

이는 View와 비즈니스 로직이 분리되어 테스트가 용이해진다.

---

### Reference

[https://velog.io/@teo/프론트엔드에서-MV-아키텍쳐란-무엇인가요](https://velog.io/@teo/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-MV-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94)

[https://developer.mozilla.org/ko/docs/Glossary/MVC](https://developer.mozilla.org/ko/docs/Glossary/MVC)
