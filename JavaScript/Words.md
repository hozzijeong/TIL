**인스턴스**: 클래스에 의해 생성되어 메모리에 저장된 실체. 객체 지향 프로그래밍에서 객체는 클래스와 인스턴스를 포함한 개념임. 클래스는 인스턴스를 생성하기 위한 템플릿 역할을 함.

```jsx
const instance = new Class();
// 여기서 instance로 선언 된 변수의 실체를 의미.
```

**프로퍼티**: 객체를 구성하는 요소들. 프로퍼티는 `key` 값과 `value` 값으로 구성되어 있음.

```jsx
const object = {
    key: value, // 객체를 구성하는 이 값들이 프로퍼티 이다
};
```

**메서드:** 객체에 묶여 있는 함수를 의미. 즉, 프로퍼티가 함수형식이면 “메서드”라고 부른다.

```jsx
const circle = {
    radius: 3,
    getDiameter: function () {
        return 2 * this.radius;
    },
};
```

위 코드에서 `getDiameter`는 circle 객체에 있는 “메서드” 이다
