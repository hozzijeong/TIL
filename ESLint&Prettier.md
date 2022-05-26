# ESLint&Prettier
JS뿐만 아니라 프로그래밍을 하다보면 문법에 맞지 않는 표현 혹은 통일되지 않은 코드 스타일로 코드 가독성을 좋게 하지 못하는 경우가 종종 있습니다. 그래서 작성하는 프로그램의 코드 스타일에 통일성을 주기 위한 도구가 ESLint와 Pretteir입니다.  

## ESLint

esLint는 JavaScript의 스타일 가이드를 따르지 않거나 문제가 있는 패턴을 찾고, 일관된 스타일로 작성하도록 도움을 줍니다. 코딩 컨벤션과 안티 패턴을 자동 검출하여 올바른 코딩 습관을 만들 수 있습니다. ESLint에는 많은 스타일 가이드가 존재하는데 대표적으로 [Airbnb Style Guide](https://github.com/airbnb/javascript)가 있습니다.

### ESLint 설치

1. `npm install eslint --save-dev` 를 입력해줍니다. VSCode를 사용(Node.js  12.22버전 이상 사용해야 합니다. 
2. 설치를 완료했을 경우 `npm init @eslint/config` config파일 설정을 해줍니다. 
    1. 위 코드 입력시 cmd창에 여러 질문이 나옵니다. 알맞은 질문을 찾아서 설정하면 됩니다. 

## Prettier

1. `npm i -D prettier` prettier 설치를 해줍니다. VSCode에서 확장 프로그램 설치가 필요합니다.
2. 프리티어 역시 config파일이 필요하기 때문에 `prettier.json`파일을 생성해줍니다.
    - 그리고 다음과 같이 작성해줍니다. (취향에 따라 원하시는대로 작성하셔도 됩니다.)
    
    ```tsx
    {
        "printWidth": 80,
        "tabWidth": 2,
        "useTabs": false,
        "semi": true,
        "singleQuote": true,
        "quoteProps": "as-needed",
        "trailingComma": "all",
        "bracketSpacing": true,
        "arrowParens": "always",
        "endOfLine": "lf"
    }
    ```
    

ESLint와 Prettier를 같이 사용하다 보면 중복되는 옵션에서 충돌이 발생할 수 있습니다. 이를 방지하기 위해서 다음과 같이 패키지 설정이 필요합니다. 

`npm i -D eslint-plugin-prettier eslint-config-prettier`

`eslint-plugin-prettier`는 Prettier를 ESLint처럼 동작시키고, `eslint-config-prettier`는 필요 없거나 prettier와 충돌하는 eslint rule들을 비활성화 시킵니다.

### 자동 포매팅

파일을 저장할때마다 자동 포매팅을 하기 위해 에디터 설정을 변경하였씁니다. `f1 → settings → editor.format`을 검색하면 

[]()

위와 같이 나오는데, Format On Save를 활성화 시켜주면 됩니다. 그러면 `.vscode`파일에 `settings.json`파일이 생겨나는데, 아래와 같이 설정해주면 자동 포매팅이 완성됩니다. 

```tsx
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

참조

[https://velog.io/@recordboy/ESLint-Prettier-적용하기#eslint-설치](https://velog.io/@recordboy/ESLint-Prettier-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0#eslint-%EC%84%A4%EC%B9%98)

[https://eslint.org/docs/user-guide/getting-started](https://eslint.org/docs/user-guide/getting-started)

[https://jinhyukoo.github.io/web/2021/06/21/프로젝트환경설정2.html](https://jinhyukoo.github.io/web/2021/06/21/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%952.html)