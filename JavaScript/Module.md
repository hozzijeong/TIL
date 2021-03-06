# 모듈

## 1. 모듈의 일반적 의미

<aside>
💡 **모듈(module)**: 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 의미

</aside>

일반적으로 모듈은 기능을 기준으로 파일 단위로 분리합니다. 이때, 모듈이 성립하기 위해서는 자신만의 파일 스코프(모듈 스코프)를 가질 수 있어야 합니다.

자신만의 파일 스코프를 갖는 모듈의 자산은 기본적으로 캡슐화되어 다른 모듈에서 접근할 수 없습니다. 즉, 모든 모듈은 개별적 존재로서 애플리케이션과 분리되어 존재합니다.

하지만 모든 모듈이 분리되어 존재된다면 모듈 존재의 이유가 없습니다. 따라서 **모듈은 공개가 필요한 자산에 한정하여 명시적을 선택적 공개가 가능하고 이를 export 라고 합니다.**

공개된 모듈의 자산은 다른 모듈에서 재사용 가능하며, **모듈 사용자는 모듈이 공개한 자산 중 일부 또는 전체를 선택해 자신의 스코프 내로 불러들여 재사용할 수 있습니다. 이를 import 라고 합니다.**

앞서 말했듯이 모듈은 기능별로 분리되어 개별적인 파일로 작성됩니다. 따라서 코드의 단위를 명확히 분리하여 애플리케이션을 구성할 수 있고 재사용성이 좋아서 개별 효율성과 유지보수성을 높일 수 있습니다.

## 2. 자바스크립트와 모듈

자바스크립트는 모듈이 성립하기 위해 필요한 파일 스코프와 import,export를 지원하지 않습니다. 클라이언트 사이드 자바스크립트는 script 태그를 사용하여 외부의 자바스크립트 파일을 로드할 수 있지만 파일마다 독립적인 파일 스코프를 갖지 않습니다.

즉, 자바스크립트 파일을 여러 개의 파일로 분리하여 script 태그로 로드해도 분리된 자바스크립트 파일들은 결국 하나의 자바스크립트 파일 내에 있는것 처럼 동작합니다. 다시말해 **모든 자바스크립트 파일은 하나의 전역을 공유합니다.** 이와 같은 특징은 전역 변수가 중복되는 등의 문제가 발생할 수 있어서 모듈을 구현할 수 없습니다

이와같은 문제를 해결하기 위해 제안된 것이 CommonJs와 AMD입니다. 자바스크립트 런타임 환경인 Node.js는 모듈 시스템의 사실상 표준인 CommonJS를 채택했고 100% 같지는 않지만 기본적으로 CommonJS 사양을 따르고 있습니다. 즉 모듈 시스템을 지원합니다. Node.js 환경에서는 파일별로 독립적인 파일 스코프를 갖습니다.

## 3. ES6 모듈(ESM)

ES6에서는 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능을 추가헀습니다. IE를 제외한 대부분의 브라우저에서 ES6 모듈 사용이 가능합니다. 사용법은 아래와 같습니다.

```jsx
<script type="module" src="app.mjs"></script>
```

script 태그에 `type="module"`어트리뷰트를 추가하면 됩니다. 파일 확장자는 ESM을 명시하기 위해 `.mjs` 확장자를 붙이는 것을 권장합니다. ESM에서는 클래스와 마찬가지로 기본적으로 strict mode가 적용됩니다.

### 1. 모듈 스코프

ESM은 독자적인 모듈 스코프를 갖습니다. ESM이 아닌 다른 자바스크립트 파일은 script 태그로 분리해서 로드해도 독자적인 모듈 스코프를 갖지 않습니다.

```jsx
// foo.js
var x = 'foo'
//bar.js
var x = 'bar'

<script src="foo.js"></script>
<script src="bar.js"></script>
```

앞에서 언급했던 것과 같이 하나의 전역을 공유하는 자바스크립트 파일은 foo.js 에서 선언한 변수 x와 bar.js 에서 선언한 변수 x 가 중복선언 되면서 변수 x의 값이 덮어씌워 집니다.

반면에 ESM을 사용하면 위와 같은 에러가 발생하지 않습니다.

-   독자적인 모듈 스코프 제공으로 var 키워드로 선언한 변수는 전역 변수도 아니고 window 프로퍼티도 아님
-   모듈 내에서 선언한 식별자는 모듈 외부에서 참조할 수 없음. (모듈이 다르기 때문)

### 2. export 키워드

모듈은 독자적인 스코프를 갖기 때문에 모듈 내부에서 선언한 식별자를 외부에 공개하여 다른 모듈들이 재사용할 수 있게 하려면 export 키워드를 사용합니다.

-   export 키워드는 선언문 앞에 사용합니다. 모든 식별자를 export 할 수 있습니다.
-   export할 대상을 하나의 객체로 구성하여 한번에 export 할 수 있습니다.

```jsx
const pi = Math.PI;
function square(x) {
    return x * x;
}
class MyClass {
    constructor(name) {
        this.name = name;
    }
}
export { pi, square };
```

### 3. import 키워드

다른 모듈에서 export한 식별자를 자신의 모듈 스코프 내부로 로드하기 위해서는 import 키워드를 사용합니다. 다른 모듈이 export 한 식별자 이름으로 import 해야하며, ESM의 경우 **파일 확장자를 생략할 수 없습니다.**

```jsx
import { pi, square } from "./xxx.mjs";

consnole.log(pi, square(3));
```

-   -   as 변수명 형태로 한번에 import 할 수 있습니다. 변수명 객체에 프로퍼티로 import 됩니다.
-   export 한 식별자 이름을 변경하여 import 할 수도 있습니다.
-   모듈에서 하나의 값만 export 한다면 defualt 키워드를 사용할 수 있습니다. default 키워드 사용시 기본적으로 이름 없이 하나의 값을 export 합니다.
    -   default 키워드를 사용하는 경우 var,let,const 키워드를 사용할 수 없습니다.
    -   default 키워드와 함께 export한 모듈은 {}없이 임의의 이름으로 import 합니다.

```jsx
import * as lib from "./lib.mjs";
import { pi as PI, square as sq } from "./lib.mjs";

export default function square() {}
import square from "./lib.mjs";
```
