## 배열

## 1 배열이란?

배열이란 여러개의 값을 순차적으로 나열한 자료구조 입니다. JS는 배열을 다루기 위한 유용한 메서드를 제공합니다. 배열이 가지고 있는 값들을 **요소(element)** 라고 하고, 그 요소들의 배열에서의 위치를 **인덱스(index)**라고 합니다.

JS에서는 배열이라는 타입이 존재하지 않습니다. **JS에서 배열은 객체 타입**입니다.

배열의 선언 방식은 아래와 같습니다.

-   배열 리터럴
-   Array 생성자 함수
-   Array.of
-   Array.from

배열의 생성자 함수는 Array이고 배열의 프로토타입 객체는 Array.prototype입니다. Array.prototype은 배열을 위한 빌트인 메서드를 제공합니다.

배열은 객체지만 일반 객체와 구분되는 특징이 있습니다.

| 구분            | 객체        | 배열                 |
| --------------- | ----------- | -------------------- |
| 구조            | key : value | [ele,ele...] / index |
| 값의 참조       | key 값      | 인덱스               |
| 값의 순서       | x           | o                    |
| length 프로퍼티 | x           | o                    |

배열의 장점은 순처적으로 요소 접근이 가능하고 역순으로 요소 접근도 가능합니다. 또한 특정 위치부터 순차적 요서 접근도 가능합니다. 위와 같은 특성은 배열이 인덱스와 length 프로퍼티를 갖기 때문에 가능합니다.

## 2 자바스크립트 배열은 배열이 아니다

자료구조에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 의미합니다. 즉, 배열의 요소들은 하나의 데이터 타입으로 통일되어 있으며 연속적으로 인접해 있어야 합니다. 이러한 배열을 **밀집 배열**이라고 합니다.

밀집 배열이 가지는 특징들 때문에 단 한번의 연산으로 임의의 요소에 접근 할 수 있고 이는 매우 효율적입니다. 하지만 배열 요소를 삽입하거나 삭제하는 경우 연속적으로 인접해 있어야 한다는 특징을 유지하기 위해 요소를 이동시켜야 하는 단점도 존재합니다.

하지만 JS에서 배열은 밀집 배열이 아닙니다. JS의 배열 요소들은 데이터 타입이 같지 않아도 되고 배열의 요소가 연속적으로 이어지지 않아도 되는 **희소 배열**입니다. 따라서 JS의 배열은 엄밀히 배열이라고 말하기 보다는 **일반적인 배열의 동작을 흉내낸 특수 객체**라고 할 수 있습니다.

일반적인 배열과 JS 배열의 장단점은 아래와 같습니다.

-   일반적인 배열은 요소에 빠르게 접근할 수 있지만, 요소의 검색/삽입/삭제 동작 수행은 효율적이지 않습니다.
-   JS배열은 해시테이블로 구현된 객체여서 인덱스로 요소에 접근하는 경우 일반 배열보다 비효율적이지만, 특정 요소르 검색하거나 요소 삽입/삭제는 일반 배열보다 더 효율적입니다.

## 3 length 프로퍼티와 희소 배열

length 프로퍼티는 배열 요소의 개수를 나타내는 프로퍼티입니다. 빈 배열인 경우 0을 반환하고 아닌경우 가장 큰 인덱스 + 1의 값을 반환합니다.

length 프로퍼티 값은 배열에 요소를 추가하거나 삭제할 경우 자동으로 갱신됩니다. 또한 임의의 숫자 값을 명시적으로 할당도 가능합니다. 현재 length 프로퍼티 값보다 작은 숫자를 할당한다면 배열의 길이는 해당 숫자 만큼 줄어들게 됩니다. 반대의 경우, length 프로퍼티 값은 변경되지만 실제 배열의 길이가 늘어나지 않습니다.

```jsx
const arr = [1, 2, 3];
console.log(arr.length); // 3

arr.push(4);
console.log(arr.length); // 4

arr.pop();
console.log(arr.length); // 3

arr.length = 1;
console.log(arr); //[1]

arr.length = 3;
console.log(arr.length); // 3
console.log(arr); //[1,empty*2]
```

마지막 empty는 아무것도 없음을 의미합니다. 이 요소를 위해 메모리를 할당하지도 빈 요소를 생성하지도 않습니다.

JS에서는 문법적으로 희소 배열을 허용하지만 희소배열을 사용하는 것을 권하지는 않습니다.즉, **배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선**입니다.

## 4 배열 생성

1. **배열 리터럴**

    객체와 마찬가지로 배열 역시 리터럴로 생성 할 수 있습니다.

    ```jsx
    const arr = [1, 2, 3];
    const sparseArr = [1, , 3];
    ```

    대괄호를 사용해서 범위를 지정하고 안에 쉼표를 통해 요소를 구분합니다. 배열의 요소를 생략한다면 희소 배열이 됩니다.

2. **Array 생성자 함수**

    Object와 같이 Array 생성자 함수를 토앻 배열 생성이 가능합니다. 단, 절단되는 인수의 개수에 따라 다르게 동작하므로 주의가 필요합니다.

    ```jsx
    // 전달된 인수가 1개 & 숫자인 경우 : length 프로퍼티 값이 인수인 배열 생성
    const arr = new Array(10);

    console.log(arr.length, arr); // 10,[empty*10]

    // 전달된 인수가 없는 경우 : 빈 배열 생성
    new Array(); // []

    // 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 : 인수를 요소로 갖는 배열 생성
    new Array(1, 2, 3); // [1,2,3]
    new Array({}); // [{}]
    ```

    Array 생성자 함수는 new 연산자와 함께 호출하지 않고 일반 함수로써 호출해도 원래의 기능과 동일하게 동작합니다. 이는 Array 생성자 함수 내부에서 new.target을 확인하기 때문입니다.

3. **Array.of 메서드**

    ES6에 도입된 메서드로, 전달된 인수를 요소로 갖는 배열을 생성합니다. 생성자 함수와 다르게 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성합니다.

    ```jsx
    Array.of(1); //[1]
    Array.of(1, 2, 3); // [1,2,3]
    Array.of("String"); //['String']
    ```

4. **Array.from 메서드**

    ES6에 도입된 메서드로 유사배열객체와 이터러블 객체를 인수로 전달받아 배열로 변환 → 반환하는 메서드입니다.

    ```jsx
    Array.from({length:2,0 : 'a',1:'b'} // ['a','b']
    Array.from('Hello') // ['H','e','l','l','o']
    ```

    해당 메서드를 사용하면 두 번째 인수로 전달한 콜백함수 값을 통해 요소를 채울 수 있습니다. Array.from 메서드는 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출하고 콜백 함수의 반환값으로 구성된 배열을 반환합니다.

    ```jsx
    Array.from({ length: 3 }); // [undefined,undefined,undefined]
    Array.from({ length: 3 }); // (_,i)=>i) // [0,1,2]
    ```

    <aside>
    💡 유사 배열 객체와 이터러블 객체
    **유사 배열 객체**는 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 의미합니다. 유사 배열 객체는 for 문을 통해 순회할 수 있습니다. 
    **이터러블 객체**는 Symbol.iterator 메서드를 구현하여 for...of 문으로 순회할 수 있으며 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 있는 객체를 의미합니다.

    </aside>

## 배열의 메서드

배열의 다양한 메서드와 자세한 설명은 MDN 문서를 통해 더욱 자세히 볼 수 있습니다.

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)