# Set과 Map

## 1. Set

set 객체는 중복되지 않는 유일한 값들의 집합입니다. 아래 표는 배열과의 차이점 입니다.

| 구분                                | 배열 | Set 객체 |
| ----------------------------------- | ---- | -------- |
| 동일한 값을 중복해서 포함할 수 있다 | O    | X        |
| 요소 순서에 의미가 있다             | O    | X        |
| 인덱스로 요소에 접근할 수 있다      | O    | X        |

Set 객체의 특성은 수학의 집합 개념가 비슷합니다. 즉 수학적 집합을 구현하기 위한 자료구조 입니다. Set을 통해 집합 계산을 구현할 수 있습니다.

1. **Set 객체의 생성**

    Set 객체는 Set 생성자 함수를 통해 생성이 되며, Set 생성자 함수에 인수를 전달하지 않으면 빈 Set 객체가 생성됩니다.

    ```jsx
    const set = new Set();
    console.log(set); // Set(0){}
    ```

    Set 생성자 함수는 이터러블을 인수로 전달받아 Set 객체로 생성합니다. 이때 **이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않습니다**.

    ```jsx
    const set = new Set([1, 1, 1, 2, 3]);
    console.log(set); // Set(3){1,2,3}
    ```

2. **요소 개수 확인**

    Set 객체의 요소 개수를 확인할 때는 Set.prototype.size 메서드를 사용합니다.

    ```jsx
    const { size } = new Set([1, 2, 3, 3]);
    console.log(size); // 3

    // size 프로퍼티는 getter만 존재하는 접근자 프로퍼티이기 때문에 Set 객체 요소를 변경할 수 없다.
    set.size = 10;
    console.log(size); // 3
    ```

3. **요소 추가**

    Set 객체의 요소를 추가할 때는 Set.prototype.add 메서드를 사용합니다.

    ```jsx
    const set = new Set();
    set.add(1);
    console.log(set); // Set(1){1}

    // add 메서드는 새로운 요소가 추가될 때 새로운 Set을 반환한다. 따라서 연속적으로 값 추가가 가능하다.
    set.add(2).add(3).add(4);
    console.log(set); // Set(4){1,2,3,4}

    // Set은 중복을 허락하지 않기때문에, 추가되는 요소 중 중복된 값이 있다면 그 값은 무시가 된다.
    set.add(1).add(1).add(5);
    console.log(set); // Set(5){1,2,3,4,5}
    ```

    일치 비교 연산자 `===`를 사용하면 `NaN` 과 `NaN`은 다르다고 평가합니다. 하지만 Set에서는 값을 평가할 때 두 값을 같다고 평가하여 추가하지 않습니다.

    ```jsx
    const set = new Set();

    console.log(NaN === NaN); // false
    set.add(NaN).add(NaN);
    console.log(set); // Set(1){NaN}
    ```

4. **요소 존재 여부 확인**

    Set 객체에 특정 요소 확인은 Set.prototype.has 메서드를 사용합니다. has 메서드는 특정요소의 존재를 불리언 값으로 반환합니다.

    ```jsx
    const set = new Set([1, 2, 3]);

    console.log(set.has(2), set.has(4)); // true false
    ```

5. **요소 삭제**

    Set 객체의 요소를 삭제할 때는 Set.prototype.delete메서드를 사용합니다.

    ```jsx
    const set = new Set([1, 2, 3]);
    set.delete(2);
    console.log(set); // Set(2){1,3}

    //만약 삭제하려는 요소가 존재하지 않으면 값을 무시한다.
    set.delete(4);
    console.log(set); // Set(2){1,3}
    ```

    delete 메서드는 삭제 성공 여부를 나타내는 불리언 값을 반환합니다.

6. **요소 일괄 삭제**

    Set 객체의 요소를 일괄 삭제할 때는 Set.prototype.clear 메서드를 사용합니다. clear 메서드는 언제나 undefined를 반환합니다.

    ```jsx
    const set = new Set([1, 2, 3]);
    set.clear();
    console.log(set); // Set(0){}
    ```

7. **요소 순회**

    Set 객체의 요소 순회는 Set.prototype.forEach문을 사용합니다. forEach문은 Array의 forEach문과 유사하게 콜백 함수와 객체를 인수를 전달 받습니다. 콜백함수에 전달되는 인수의 순서는 다음과 같습니다.

    1. 현재 순회 중인 요소 값
    2. 현재 순회 중인 요소 값
    3. 현재 순회 중인 Set 객체

    Array에서 두 번째 인수는 현재 순회 중인 요소의 인덱스 위치를 나타내지만, Set 객체의 경우 순서가 없고, 기존 forEach 메서드와 형태를 통일을 위해서 넣은 값입니다.

    ```jsx
    const set = new Set([1, 2, 3]);
    set.forEach((x, y, cur) => console.log(x, y, cur));
    ```

    Set 객체는 이터러블이기 때문에 for...of 문과 스프레드 문법, 배열 디스트럭처링의 대상이 될 수 있습니다.

    Set 객체는 요소 순서를 갖지 않지만, Set 객체를 순회하는 순서는 요소가 추가된 순서를 따릅니다. 이는 다른 이터러블의 순회와 호환성을 유지하기 위함입니다.

8. **집합 연산**

    집합 연산을 수행하는 프로토타입 메서드를 구현하면 다음과 같습니다

    - 교집합
        ```jsx
        Set.prototype.interection = function(set){
            const result = new Set()

            for(const value of set){
                if(this.has(value)) result.add(value)
            }

            return result
        }

        Set.prototype.interection = function(set){
        	return new Set([...this].filter(x => set.has(x))
        }

        const setA = new Set([1,2,3])
        const setB = new Set([3,4,5])

        console.log(setA.interection(setB))
        console.log(setB.interection(setA))
        ```
    - 합집합
        ```jsx
        Set.prototype.union = function (set) {
            const result = new Set(this);
            for (const value of set) result.add(value);

            return result;
        };

        Set.prototype.union = function (set) {
            return new Set([...this, ...set]);
        };

        const setA = new Set([1, 2, 3, 4]);
        const setB = new Set([2, 3, 6, 7]);

        console.log(setA.union(setB)); // 1,2,3,4,6,7
        ```
    - 차집합
        ```jsx
        Set.prototype.difference = function (set) {
            const result = new Set(this);

            for (const value of set) {
                if (result.has(value)) result.delete(value);
            }

            return result;
        };

        Set.prototype.difference = function (set) {
            return new Set([...this].filter((x) => !set.has(x)));
        };

        const setA = new Set([1, 2, 3, 4, 5, 6, 7]);
        const setB = new Set([8, 2, 3, 4, 5, 6, 7]);
        console.log(setA.difference(setB));
        ```
    - 부분 집합과 상위 조합
        ```jsx
        Set.prototype.inSuperset = function (subset) {
            for (const value of subset) {
                if (!this.has(value)) return false;
            }

            return true;
        };

        Set.prototype.inSuperset = function (subset) {
            return [...subset].every((x) => [...this].includes(x));
        };

        const setA = new Set([1, 2, 3, 4, 5, 6, 7]);
        const setB = new Set([8, 2, 3, 4, 5, 6, 7]);
        console.log(setA.inSuperset(setB));
        ```

## 2. Map

Map 객체는 키와 쌍으로 이루어진 컬렉션 입니다. Map 객체와 객체의 차이는 아래와 같습니다.

| 구분                   | 객체                    | Map 객체              |
| ---------------------- | ----------------------- | --------------------- |
| 키로 사용할 수 있는 값 | 문자열 또는 신벌 값     | 객체를 포함한 모든 값 |
| 이터러블               | X                       | O                     |
| 요소 개수 확인         | Object.keys(obj).length | map.size              |

1. **Map** **객체의 생성**

    Map 객체는 Map 생성자 함수로 생성합니다. 생성자 함수에 인수를 전달하지 않으면 빈 Map 객체가 생성됩니다.

    ```jsx
    const map = new Map();
    console.log(map); // Map(0) {}
    ```

    Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체로 생성합니다. 이때 **이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 합니다**.

    ```jsx
    const map1 = new Map([
        ["key", "val"],
        ["key2", "val"],
        ["key", "val"],
    ]);
    console.log(map1); // Map(2) {'key' => 'val3', 'key2' => 'val'}
    ```

    또한 Map 객체에 전달되는 이터러블 값 중에 중복된 키 값이 존재한다면 해당 값을 덮어씌워 중복된 키 가 존재하지 않습니다.

2. **요소 개수 확인**

    Map 객체의 요소 개수를 확인할 때는 Map.prototype.size 메서드를 사용합니다.

    ```jsx
    const { size } = new Map([
        ["key", "val"],
        ["key2", "val"],
        ["key", "val"],
    ]);
    console.log(size); // 2

    // size 프로퍼티는 getter만 존재하는 접근자 프로퍼티이기 때문에 Set 객체 요소를 변경할 수 없다.
    ```

3. **요소 추가**

    Map 객체에 요소를 추가할 때는 Map.prototype.set 메서드를 사용합니다.

    ```jsx
    const map = new Map();

    map.set("key3", "val3").set("key4", "val4");
    console.log(map);
    ```

    set 메서드는 새로운 Map 객체를 반환하기 때문에 set 메서드를 연속해서 호출할 수 있습니다. 앞서 언급했듯이 Map 객체의 키 값은 중복되지 않기 때문에 set 메서드를 통해 같은 키 값을 등록한다면 해당 값은 덮어씌워 집니다.

    또한 Set 객체와 같이 Map 객체에서도 `NaN`은 서로 같은 값으로 평가하여 `NaN` 값을 가지는 키는 한 개밖에 존재할 수 없습니다.

    Map 객체는 키 타입에 제한이 없다는 점이 기존 객체와 가장 큰 차이점 입니다.

    ```jsx
    const a = { name: "Jeong" };
    const b = { name: "Jeong" };

    const map = new Map();

    map.set(a, "suwon").set(b, "ansan");

    console.log(map); // Map(2) {{…} => 'suwon', {…} => 'ansan'}
    ```

4. **요소 취득**

    Map 객체에 요소를 취득할 때는 Map.prototype.get 메서드를 사용합니다. get 메서드의 인수로 키를 전달하면 해당 키를 갖는 값을 반환합니다. Map 객체에 요소가 존재하지 않으면 undefined를 반환합니다.

    ```jsx
    const a = { name: "Jeong" };
    const b = { name: "Jeong" };

    const map = new Map();

    map.set(a, "suwon").set(b, "ansan");

    console.log(map.get(a), map.get("key")); // suwon undefined
    ```

5. **요소 존재 여부 확인**

    Map 객체에 요소를 확인 할 때는 Map.prototype.has 메서드를 사용합니다. has 메서드는 특정 요소의 존재 여부를 나타내는 불리언 값을 반환합니다.

    ```jsx
    const a = { name: "Jeong" };
    const b = { name: "Jeong" };

    const map = new Map();

    map.set(a, "suwon").set(b, "ansan");

    console.log(map.has(a), map.has("key")); // true false
    ```

6. **요소 삭제**

    Map 객체에 요소를 삭제 할 때는 Map.prototype.delete메서드를 사용합니다. delete 메서드는 특정 요소의 삭제 여부를 나타내는 불리언 값을 반환합니다. 존재하지 않는 키를 인수로 전달한다면 그 값을 무시합니다.

    ```jsx
    const a = { name: "Jeong" };
    const b = { name: "Jeong" };
    const c = {};
    const map = new Map();

    map.set(a, "suwon").set(b, "ansan");

    map.delete(a);
    map.delete(c);
    console.log(map); // Map(1) {{…} => 'ansan'}
    ```

7. **요소 일괄 삭제**

    Map 객체의 요소를 일괄 삭제할 때는 Map.prototype.clear 메서드를 사용합니다. clear 메서드는 언제나 undefined를 반환합니다.

    ```jsx
    const a = { name: "Jeong" };
    const b = { name: "Jeong" };

    const map = new Map();

    map.set(a, "suwon").set(b, "ansan");

    map.clear();
    console.log(map);
    ```

8. **요소 순회**

    Map 객체의 요소 순회는 Map.prototype.forEach문을 사용합니다. forEach문은 Array의 forEach문과 유사하게 콜백 함수와 객체를 인수를 전달 받습니다. 콜백함수에 전달되는 인수의 순서는 다음과 같습니다.

    1. 현재 순회 중인 요소 값
    2. 현재 순회 중인 요소 키
    3. 현재 순회 중인 Map 객체

    ```jsx
    const a = { name: "Jeong" };
    const b = { name: "Jeong" };

    const map = new Map();

    map.set(a, "suwon").set(b, "ansan");

    map.forEach((val, key, cur) => console.log(val, key, cur));

    /*
    	suwon {name: 'Jeong'} Map(2) {{…} => 'suwon', {…} => 'ansan'}
      ansan {name: 'Jeong'} Map(2) {{…} => 'suwon', {…} => 'ansan'}
    */
    ```

    Map 객체는 이터러블이기 때문에 for...of 문, 스프레드 문법, 배열 디스트럭처링 할당의 대상이 됩니다. 또한 Map 객체는 이터레이터인 객체를 반환하는 메서드를 제공합니다.

    | Map 메서드            | 설명                                                                          |
    | --------------------- | ----------------------------------------------------------------------------- |
    | Map.prototype.keys    | 요소키를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체 반환             |
    | Map.prototype.values  | 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환           |
    | Map.prototype.entries | 요소키와 요소 값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |
