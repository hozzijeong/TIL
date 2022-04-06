# 디스트럭처링 할당(구조 분해 할당)

디스트럭처링 할당 (구조 분해 할당)은 구조화된 배열과 같은 이터러블 혹은 객체를 비구조화 하여 1개 이상의 변수에 개별적으로 할당하는 것을 의미합니다. 이터러블,객체 등에서 필요한 값만을 추출하여 변수에 할당할 때 유용합니다.

## 1. 배열 디스트럭처링 할당

배열 디스트럭처링 할당은 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당합니다. 이때 **배열 디스트럭처링 할당의 대상(할당문의 우변)은 이터러블이어야 하며, 할당 기준은 배열의 인덱스**입니다.

```jsx
const arr = [1, 2, 3];

const [one, tow, three] = arr;
console.log(one, two, three); // 1 2 3
// 배열 디스트럭처링 할당 변수를 배열 리터럴 형태로 선언한다.
// 할당의 기준은 인덱스이기 때문에 배열 요소의 개수가 이터러블 요소 개수와 같을 필요는 없다.
const [fir, sec, , , , , sev] = [1, 2, 3, 4, 5];
console.log(fir, sec, sev); // 1 2 undefined

// 배열 디스트럭처링 할당에 기본값 설정이 가능하다.
// 기본값 보다 할당값이 우선이다
const [a, b, c = 3, d] = [1, 2, 4, 3];
console.log(a, b, c, d); // 1 2 4 3

//배열 디스트럭처링 할당을 위한 변수에 Rest 파라미터 사용이 가능하다.
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [2,3]
```

## 2. 객체 디스트럭처링 할당

객체 디스트럭처링 할당 역시 배열과 유사하게 할당이 됩니다. 다만, 배열의 할당 기준은 인덱스이지만 객체의 할당 기준은 **프로퍼티 키** 입니다. 또한 배열은 할당 변수를 배열 리터럴로 받지만 객체 디스트럵처링 할당은 객체 리터럴로 받습니다. 또한 객체 디스트럭처링 할당을 할 때 우변은 객체를 할당합니다.

```jsx
const obj = {a:1,b:2}
const {a,b} = obj
console.log(a,b)

//객체 리터럴 형태로 선언한 변수들을 다른 변수로 받기 위해서는 다음과 같이 할 수 있다.
const {a:c,b:d} = obj
console.log(c,d) // 1 2

// 객체 디스트럭처링 할당을 위해 변수에 기본값 설정이 가능하다
const {a,b,c=3} = obj
console.log(obj // 1 2 3
```

객체 디스트럭처링 할당은 프로퍼티 키로 필요한 프로퍼티 값만 추출하여 변수에 할당하는데 유용합니다. 또한 객체 인수를 전달받는 매개변수에도 사용할 수 있습니다.

```jsx
const todo = {
    id: 1,
    content: "HTML",
    completed: true,
};

const { id } = todo;
console.log(id);

function printTodo({ content, completed }) {
    console.log(`할일: ${content} ${completed ? "완료" : "실패"}`);
}

printTodo(todo); // 할일: HTML 완료
```

배열의 요소가 객체인 경우에는 배열과 객체 디스트럭처링 할당이 가능합니다.

```jsx
const todos = [
    { id: 1, content: "HTML", completed: true },
    { id: 2, content: "CSS", completed: true },
    { id: 3, content: "JavaScript", completed: false },
];

const [, { id }] = todos;
console.log(id); // 2

// 중첩 객체의 경우는 다음과 같이 사용됩니다.
const user = {
    name: "Jeong",
    address: {
        city: "suwon",
    },
};

const {
    address: { city },
} = user;
console.log(city); // suwon
```
