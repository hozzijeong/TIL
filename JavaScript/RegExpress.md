## RegExpress

정규 표현식, 또는 정규식은 “**일정한 규칙(패턴)을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어**”입니다 정규표현식은 패턴과 플래그로 구성되며, 패턴은 일정한 규칙을 표현하기 위해 사용되고 플래그는 검색 방식을 설정하기 위해 사용됩니다. 흔히 비밀번호 조합, 이메일 형식, 전화번호 형식 등 특정 형태가 정해져 있는 문자열 검사를 할 때 사용하면 유용합니다.

JS에서 정규표현식은 객체 리터럴 형식이나 생성자 함수를 통해 선언이 가능합니다.

```jsx
const regExpLiteral = /pattern/flag // / /는 정규표현식의 시작,끝을 나타내는 기호
const regExpFunc = new RegExp(pattern,flag)
```

### 정규표현식 사용 기호

**Groups and Ranges**

| '|' | 또는 |
| () | 그룹 |
| [] | 문자셋, 괄호안의 어떤 문자든 |
| [^] | 부정 문자셋, 괄호안의 어떤 문자가 아닐 때 |
| (?:) | 찾지만 기억(그룹화)하지는 않음 |

**Quantifiers**

| ? | 있거나 없거나 (zero or one) |
| \* | 없거나 많거나 (zero or more) |
| + | 하나 또는 많이 (one or more) |
| {n} | n번 반복 |
| {min,} | 최소 |
| {min,max} | 최소,최대 |

**Boundary-type**

| \b | 단어 경계 |
| \B | 단어 경계가 아님 |
| ^ | 문장의 시작 |
| $ | 문장의 끝 |

**Character classes**

| \ | 특수 문자가 아닌 문자 |
| . | 어떤 글자 (줄바꿈 문자 제외) |
| \d | digit 숫자 |
| \D | digit 숫자 아님 |
| \w | word 문자(알파벳,숫자,언더스코어) |
| \W | word 문자 아님 |
| \s | space 공백 |
| \S | space 공백 아님 |

### 정규표현식 플래그

정규표현식은 총 6개의 플래그가 있지만 자주 사용하는 3개만 언급하겠습니다.

| 플래그 | 의미        | 설명                                                              |
| ------ | ----------- | ----------------------------------------------------------------- |
| i      | Ignore case | 대소문자를 구별하지 않고 패턴 검색합니다.                         |
| g      | Global      | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색합니다. |
| m      | Multi line  | 문자열의 행이 바뀌더라도 패턴 검색을 계속합니다.                  |

### 정규표현식 메서드

위 사용기호들을 통해 정규표현식 패턴을 선언할 수 있고, 해당 기호에 맞춰서 문자열 검사가 가능합니다. 정규표현식에 내장되어 있는 메서드는 아래와 같습니다.

| 메서드               | 설명                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| exec()               | 문자열에서 일치하는 부분을 탐색합니다. 일치 정보를 나타내는 배열, 또는 일치가 없는 경우 null을 반환합니다. |
| test()               | 문자열에 일치하는 부분이 있는지 확인합니다. true 또는 false를 반환합니다.                                  |
| match()              | 캡처 그룹을 포함해서 모든 일치를 담은 배열을 반환합니다. 일치가 없으면 null을 반환합니다.                  |
| matchAll() (en-US)   | 캡처 그룹을 포함해서 모든 일치를 담은 반복기를 반환합니다.                                                 |
| search()             | 문자열에서 일치하는 부분을 탐색합니다. 일치하는 부분의 인덱스, 또는 일치가 없는 경우 -1을 반환합니다.      |
| replace()            | 문자열에서 일치하는 부분을 탐색하고, 그 부분을 대체 문자열로 바꿉니다.                                     |
| replaceAll() (en-US) | 문자열에서 일치하는 부분을 모두 탐색하고, 모두 대체 문자열로 바꿉니다.                                     |
| split()              | 정규 표현식 또는 문자열 리터럴을 사용해서 문자열을 부분 문자열의 배열로 나눕니다.                          |

위의 사용 기호, 플래그, 메서드등을 사용해서 자주 사용되는 정규표현식 패턴을 알아보려고 합니다.

1. 문자열 검색

    정규표현식의 패턴에 문자 또는 문자열을 지정하면 검색 대상 문자열에서 패턴으로 지정한 문자열/문자를 검색합니다. 생성한 정규 표현식을 위에서 언급한 정규표현식 메서드와 함께 조합해서 원하는 방향으로 문자열을 검색할 수 있습니다.

    ```jsx
    const target = "Is this all there is?";

    const regExp = /is/;

    regExp.test(target); //true

    target.match(regExp); // {"is",index: 5, input: "Is this all there is?", length: 1 }

    // 대소문자 구분하지 않고 찾기 위해서는 g플래그를 이용하면 됩니다.
    const regExp = /is/i;

    target.match(regExp); //{"Is",index: 0, input: "Is this all there is?", length: 1 }

    // 검색 대상에서 해당 패턴과 일치하는 모든 문자열을 찾기 위해서는 g플래그를 사용하면 됩니다.
    const regExp = /is/gi;

    target.match(regExp);
    ```

2. 임의의 문자열 검색

    정규식 패턴 안에서 `.`은 문자 한 개를 의미합니다. 문자의 내용은 상관 없습니다. 다음 예제는 3자리 문자열을 검색하는 패턴입니다.

    ```jsx
    const target = "Is this all there is?";

    const regExp = /.../g;

    target.match(regExp); // ['Is ', 'thi', 's a', 'll ', 'the', 're ', 'is?']
    ```

3. 반복 검색

    `{m,n}`은 앞선 패턴이 최소 m번 최대 n번 반복되는 문자열을 의미합니다. 콤마뒤에 공백이 있으면 정상 동작하지 않습니다.

    ```jsx
    const target = "A AA B BB Aa Bb AAA";

    const regExp = /A{1,2}/g;

    target.match(regExp); // ['A', 'AA', 'A', 'AA', 'A']

    // {n}dms n번 반복되는 문자열을 의미합니다. {n}은 {n,n}과 같습니다.

    const regExp = /A{1,2}/g;

    target.match(regExp); // ['AA','AA']

    // {n,}는 최소 n번 이상 반복되는 문자열을 의미합니다.
    const regExp = /A{2,}/g;

    target.match(regExp); // ['AA','AAA']

    // + 는 앞선 패턴이 최소 한번 이상 반복되는 문자열을 의미합니다. {1,}와 같습니다.

    const regExp = /A+/g;

    target.match(regExp); // ['A', 'AA', 'A', 'AAA']

    // ?는 앞선 패턴이 최대 한번 이상 반복되는 문자열을 의미합니다. {0,1}과 같습니다.
    const target = "color colour";

    const regExp = /colou?r/g;

    target.match(regExp); //['color', 'colour']
    ```

4. OR 검색

    정규식 패턴 안에서 `|`은 or의 의미를 갖습니다.

    ```jsx
    const target = "A AA B BB Aa Bb AAA";

    const regExp = /A|B/g;

    target.match(regExp); // ['A', 'A', 'A', 'B', 'B', 'B', 'A', 'B', 'A', 'A', 'A']

    // 분해되지 않은 단어 레벨로 검색하기 위해서는 +를 함께 사용합니다.

    const regExp = /A+|B+/g;

    target.match(regExp); // ['A', 'AA', 'B', 'BB', 'A', 'B', 'AAA']
    ```

    위 예제는 패턴을 or로 한 번 이상 반복하는 것인데 이를 간단히 표현하면 다음과 같습니다. `[]`내의 문자는 or로 동작합니다. 그 뒤에 +를 사용하면 앞선 패턴을 한 번이상 반복하게 됩니다.

    ```jsx
    const target = "A AA B BB Aa Bb AAA";

    const regExp = /[AB]+/g;

    target.match(regExp); // ['A', 'AA', 'B', 'BB', 'A', 'B', 'AAA']

    // []내에서 범위를 지정하려면 -를 사용하면 됩니다. 다음 예제는 대문자 알파벳을 검색합니다.
    const target = "A AA B BB ZZ Aa Bb";

    const regExp = /[A-Z]+/g;

    target.match(regExp); //['A', 'AA', 'B', 'BB', 'ZZ', 'A', 'B']

    //대소문자 구분하지 않는 방법은 아래와 같습니다.
    const regExp = /[a-zA-Z]+/g;

    target.match(regExp); //['A', 'AA', 'B', 'BB', 'ZZ', 'Aa', 'Bb']
    ```

5. NOT 검색

    `[...]`내의 `^`은 not의 의미를 갖습니다. `[^0-9]`는 숫자를 제외한 모든 문자를 의미합니다.

6. 시작 위치로 검색

    `[...]`밖의 `^`은 문자열의 시작을 의미합니다.

    ```jsx
    const target = "https://loniz.co.kr";

    const regExp = /^https?:/;

    regExp.test(target); // true
    ```

7. 마지막 위치로 검색

    $는 문자열의 마지막을 의미합니다.

    ```jsx
    const target = "https://loniz.co.kr";

    const regExp = /com$/;

    regExp.test(target); // false
    ```

---

정규표현식 테스트 사이트: [https://regexr.com/5ml92](https://regexr.com/5ml92)

정규표현식 시험 사이트: [https://regexone.com/](https://regexone.com/)

참조

-   [https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions#%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D_%EB%A7%8C%EB%93%A4%EA%B8%B0)
-   https://github.com/dream-ellie/regex
