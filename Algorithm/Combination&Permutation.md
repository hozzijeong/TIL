# 순열과 조합

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/44d1e256-8c43-40c2-a5f7-7f27d540ea81/Untitled.png)

## 조합

서로 다른 n개의 물건에서 순서를 생각하지 않고 r개를 선택할 때, 조합의 수를 기호로 nCr과같이 나타내고 이를 조합이라고 합니다.

조합의 특징은 순서를 생각하지 않는다는 것인데, 아래 예시를 보겠습니다.

```jsx
Input: [1, 2, 3, 4];
Output: [
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 4],
    [2, 3, 4],
];
```

4C3은 4개 중 3개씩 선택했을 때 나올 수 있는 모든 조합을 의미합니다. 이때 조합의 순서는 상관 없습니다. 즉 `[1,2,3]` 은 `[3,2,1]`과 순서가 달라도 하나의 조합으로 취급한다는 의미입니다.

주어진 배열에서 하나의 고정된 요소를 두고 뒤에 있는 요소들의 조합을 반환하고 그 값을 합치는 형식으로 코드 진행이 이루어집니다.

<aside>
💡 **수도코드 ([1,2,3,4] 중 3가지를 선택하는 조합)**
시작:
  1을 고정하고 → 나머지 2,3,4 중에서 2개씩 조합을 구한다
  2를 고정하고 → 나머지 3,4 중에서 2개씩 조합을 구한다
  3을 고정하고 → 나머지 4 중에서 2개씩 조합을 구한다
  4를 고정하고 → 나머지 [] 중에서 2개씩 조합을 구한다
종료:

</aside>

위 수도코드의 사이에서 1을 고정했을 때 2,3,4 중에서 2개씩 조합을 구하는 식은 배열 [2,3,4] 중 2가지를 선택하는 조합의 식과 동일하므로 재귀함수를 통해 간단하게 구현할 수 있습니다.

위 수도코드를 JS 코드로 구현하면 아래와 같습니다.

```jsx
function getCombination(arr, selectNum) {
    const result = [];
    if (selectNum === 1) return arr.map((el) => [el]); // 1개를 선택하는 것이라면 그대로 반환
    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1); // 현재 값 이후에 있는 값들
        const combinations = getCombination(rest, selectNum - 1); // 고정된 값 제외하고 나머지 값들의 조합을 반환, 따라서 원하는 값도 -1이 됨
        const attached = combinations.map((el) => [fixed, ...el]); // 고정된 값
        result.push(...attached);
    });
    return result;
}

console.log(getCombination([1, 2, 3, 4], 3));
```

## 순열

서로 다른 n개의 물건 중에서 r개를 택하여 한 줄로 배열하는 것을 n개의 물건에서 r개 택하는 순열이라 하고, 이 순열의 수를 기호로 nPr와 같이 나타냅니다.

순열은 조합과 접근 방식이 유사합니다. 하지만 조합과의 가장 큰 차이점은 **순서가 중요하다는 것**입니다. 즉 조합에서는 `[1,2,3] = [3,2,1]` 이었다면 순열에서는 각각 독립적인 배열로 취급합니다.

```jsx
Input: [1, 2, 3, 4];
Output: [
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 2],
    [1, 3, 4],
    [1, 4, 2],
    [1, 4, 3],
    [2, 1, 3],
    [2, 1, 4],
    [2, 3, 1],
    [2, 3, 4],
    [2, 4, 1],
    [2, 4, 3],
    [3, 1, 2],
    [3, 1, 4],
    [3, 2, 1],
    [3, 2, 4],
    [3, 4, 1],
    [3, 4, 2],
    [4, 1, 2],
    [4, 1, 3],
    [4, 2, 1],
    [4, 2, 3],
    [4, 3, 1],
    [4, 3, 2],
];
```

<aside>
💡 **수도코드([1,2,3,4] 중 3개를 선택할 때)**
1을 고정 → 2,3,4 중 2개를 선택 ⇒ 2를 고정 → 3,4 중 2개를 선택, 3을 고정 → 2,4 중...
2를 고정 → 1,3,4 중 2개를 선택
3을 고정 → 1,2,4 중 2개를 선택
4를 고정 → 1,2,3 중 2개를 선택

</aside>

위와 경우를 계속해서 반복해서 순열을 구할 수 있습니다. 이를 JS로 표현하면 다음과 같습니다.

```jsx
function getCombination(arr, selectNum) {
    const result = [];
    if (selectNum === 1) return arr.map((el) => [el]);
    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]; // 현재 값 이후에 있는 값들
        console.log(rest);
        const combinations = getCombination(rest, selectNum - 1); // 고정된 값 제외하고 나머지 값들의 조합을 반환, 따라서 원하는 값도 -1이 됨
        const attached = combinations.map((el) => [fixed, ...el]); // 고정된 값
        result.push(...attached);
    });
    return result;
}

console.log(getCombination([1, 2, 3, 4], 3));
```

기본적인 형태는 같지만 rest 변수를 구하는 식에서 조합은 **fixed 이후의 값들의 조합만을 생각했다면 순열은 fixed를 제외한 값들의 조합을 생각한다는 차이점**이 있습니다.

참고 : [https://velog.io/@devjade/JavaScript로-순열과-조합-알고리즘-구현하기](https://velog.io/@devjade/JavaScript%EB%A1%9C-%EC%88%9C%EC%97%B4%EA%B3%BC-%EC%A1%B0%ED%95%A9-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
