# 투포인터

투포인터 알고리즘(슬라이딩 윈도우)이란 **1차원 배열이 있고, 이 배열에서 각자 다른 원소를 가리키고 있는 2개의 포인터를 조작해가면서 원하는 것을 얻는 형태를 의미**합니다. 다음과 같은 문제가 있다고 가정 해봅시다.

N칸의 1차원 배열이 있을 때, 부분 배열 중 그 원소의 합이 M이 되는 경우의 수를 구하시오. 라는 문제입니다.

2중 반복문을 통해서 쉽게 값을 구 할 수 있지만, 그렇게 한다면 시간복잡도가 O(n^2)이 되면서 효율성 테스트에서 탈락할 수 도 있습니다. 투 포인터로 문제를 해결하면 다음과 같이 해결할 수 있습니다.

-   start와 end 포인터 2개를 준비
-   start = end = 0 이며 항상 start <= end를 만족
-   2개의 포인터는 현재 부분 배열의 시작과 끝을 가리키는 역할

start = end 일 경우 아무것도 포함하지 않는 부분 배열을 의미합니다. 다음 과정을 start < N인 동안 반복합니다.

1. 현재 부분합이 M이상이거나 end = N 이면 start++

2. 그렇지 않닿면 end++

3. 현재 부분합이 M과 같다면 결과값++

해당 문제와 같은 유형의 문제가 프로그래머스에 있어서 가져왔습니다.

---

<aside>
💡 **[코딩테스트 연습 - 숫자의 표현](https://programmers.co.kr/learn/courses/30/lessons/12924)**
Finn은 요즘 수학공부에 빠져 있습니다. 수학 공부를 하던 Finn은 자연수 n을 연속한 자연수들로 표현 하는 방법이 여러개라는 사실을 알게 되었습니다. 예를들어 15는 다음과 같이 4가지로 표현 할 수 있습니다.
1 + 2 + 3 + 4 + 5 = 15

4 + 5 + 6 = 15

7 + 8 = 15

15 = 15

자연수 n이 매개변수로 주어질 때, 연속된 자연수들로 n을 표현하는 방법의 수를 return하는 solution를 완성해주세요.

</aside>

```jsx
function solution(n) {
    let answer = 0;
    let lt = 0; // start
    let sum = 0;
    for (let rt = 1; rt <= n; rt++) {
        sum += rt; // end
        if (sum === n) answer++;
        while (sum > n) {
            // rt와 lt 사이의 부분 합이 타겟 값보다 크다면, 그만큼 lt를 이동시키면서 부분합이 n보다 작을때 까지 반복해줍니다.
            sum -= lt++;
            if (sum === n) answer++;
        }
    }
    return answer;
}
```

"1 ~ 15의 값이 주어졌을 때, 부분 집합의 합이 15를 만족하는 경우의 수를 구하시오"로 해석할 수 있는 문제입니다.

이에 lt는 start, rt는 end로 두고 해당 풀이를 진행했습니다.

---

투포인터 개념 참조: [github.com](https://github.com/WooVictory/Ready-For-Tech-Interview/blob/master/Algorithm/%ED%88%AC%ED%8F%AC%EC%9D%B8%ED%84%B0%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98.md)
