# DFS

DFS(Depth First Search)는 깊이 우선 탐색으로, 루트 노드에서 시작해서 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방법입니다.

-   모든 노드를 탐색할 때 이 방법을 사용합니다.
-   자기 자신을 호출하는 순환 알고리즘(재귀 함수) 형태를 띄고 있습니다.
-   전위 순회를 포함한 다른 형태의 트리 순회는 모두 DFS의 한 종류입니다.
-   어떤 노드를 방문했는지 여부를 검사해야 합니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/75759801-64af-4673-971e-28f579fb2015/Untitled.png)

### DFS의 구현

-   순환 호출
-   명시적 스택 사용 : 스택을 사용하여 방문한 정점들을 스택에 저장했다가 다시 pop하여 작업합니다.
-   의사 코드
    ```jsx
    void srarch(Node root){
    	if(root===null) return
    	visit(root);
    	root.visited = true // 방문 노드 표시
    	// root 노드와 인접한 정점 모두 방문
    	for each(Node n in root.adjacent){
    		if(n.visited === false) search(n)
    	}
    }
    ```

### [프로그래머스] JS로 푸는 타겟 넘버

n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

```jsx
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
```

사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘벌르 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

DFS로 푸는 방법인 것은 알았지만, 아직 완벽하게 이해를 한 것이 아니라서 그런지 한 2시간 끄적이다가 답을 봐버렸다... 내가 생각했던 것들과 너무 달라서 약간 허무하긴 했지만 이게 내 현 주소인걸 어떡하나... 그냥 열심히 해야지

```jsx
function solution(numbers, target) {
    let answer = 0;
    function dfs(level, sum) {
        if (level === numbers.length) {
            if (sum === target) {
                answer++;
            }
            return;
        }
        dfs(level + 1, sum + numbers[level]);
        dfs(level + 1, sum - numbers[level]);
    }

    dfs(0, 0);
    return answer;
}
```

DFS에는 2가지 방법이 있는데 스택을 사용하여 구현하는 것과 위 처럼 재귀 함수를 사용하여 구현하는 것이다. 나는 스택을 사용해서 구현하려고 시도하다가 실패했고 (사실 뭔가 계속 나올것 같았다) 위 풀이 방식은 재귀함수를 이용해서 풀이한 것이다.

문제의 요구사항은 주어진 배열들의 부호를 바꿀 수 있다고 가정했을 때 배열의 합이 target과 값이 같은 경우의 수를 구하는 것이다. level이 0부터 시작해서 numbers의 길이와 같아졌다고 가정 했을 때, 해당 값의 합이 target의 수와 같은지 확인해 보면 되는 것이다.

+와 - 의 값을 재귀할때마다 분기하여서 전반적으로 값 계산이 가능하게끔 설정한다.

### 이진 트리 순회 (전위/중위/후위) 구현

```jsx
/**
 * 이진트리 순회(DFS)
 */
let answer = "";
function DFS(v) {
    if (v > 7) return;
    else {
        // 전위 순회 : answer += v + " ";
        DFS(v * 2);
        // 중위 순회 : answer += v + " ";
        DFS(v * 2 + 1);
        // 후위 순회 : answer += v + " ";
    }
}
DFS(n);
return answer;
```

전위,중위,후위 순회를 이해하기 위해서는 함수의 콜 스택에 대한 이해가 필요합니다. 함수의 콜 스택(실행 컨텍스트)는 [해당 링크](https://github.com/hozzijeong/TIL/blob/master/JavaScript/ExcutionContext.md)를 통해 자세한 설명을 볼 수 있습니다.

### 이진 트리 순회를 문제 [바둑이 승차]

**문제**

철수는 그의 바둑이들을 데리고 시장에 가려고 한다. 그런데 그의 트럭은 C킬로그램 넘게 태
울수가 없다. 철수는 C를 넘지 않으면서 그의 바둑이들을 가장 무겁게 태우고 싶다.
N마리의 바둑이와 각 바둑이의 무게 W가 주어지면, 철수가 트럭에 태울 수 있는 가장 무거운
무게를 구하는 프로그램을 작성하세요.

**입력**

첫 번째 줄에 자연수 C(1<=C<=100,000,000)와 N(1<=N<=30)이 주어집니다.
둘째 줄부터 N마리 바둑이의 무게가 주어진다.

**출력**

첫 번째 줄에 가장 무거운 무게를 출력한다.

**입력 예제**

259

[81,58,42,33,61]

**출력 예제**

41

코드1 (방문 여부에 따라 값을 더하거나 빼줌)

```jsx
const dfs = (lev, max) => {
    if (lev === weights.length) {
        if (max > capacity) return;
        else maxList.push(max);
    } else {
        dfs(lev + 1, max + weights[lev]);
        dfs(lev + 1, max);
    }
};
dfs(0, 0);
return Math.max(...maxList);
```

코드2 (checkList 사용)

```jsx
let maxList = [];
const check = new Array(weights.length).fill(0);
const dfs = (i) => {
    if (i === weights.length) {
        let sum = 0;
        for (let j = 0; j < check.length; j++) {
            if (check[j] === 1) sum += weights[j];
        }
        if (sum > capacity) return;
        if (sum > max) max = sum;
    } else {
        check[i] = 1;
        dfs(i + 1);
        check[i] = 0;
        dfs(i + 1);
    }
};
```
