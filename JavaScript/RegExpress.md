## RegExpress

정규 표현식, 또는 정규식은 문자열에서 특정 문자 조합을 찾기 위한 패턴입니다. 흔히 비밀번호 조합, 이메일 형식, 전화번호 형식 등 특정 형태가 정해져 있는 문자열 검사를 할 때 사용하면 유용합니다.

JS에서 정규표현식은 객체 리터럴 형식이나 생성자 함수를 통해 선언이 가능합니다.

```jsx
const regExpLiteral = /pattern/flag
const regExpFunc = new RegExp(pattern,flag)
```

### 정규표현식 사용 기호

[Groups and ranges](https://www.notion.so/225ed2e324e446c288cce5d3b65a5adf)

위 사용기호들을 통해 정규표현식 패턴을 선언할 수 있고, 해당 기호에 맞춰서 문자열 검사가 가능합니다. 정규표현식에 내장되어 있는 메서드는 아래와 같습니다.

---

정규표현식 테스트 사이트: [https://regexr.com/5ml92](https://regexr.com/5ml92)

정규표현식 시험 사이트: [https://regexone.com/](https://regexone.com/)

참조

-   [https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions#%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D_%EB%A7%8C%EB%93%A4%EA%B8%B0)
-   https://github.com/dream-ellie/regex
