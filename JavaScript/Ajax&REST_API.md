# Ajax & REST API

## 1. Ajax란?

<aside>
💡 **Ajax**: 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식.

</aside>

![전통적인 웹페이지의 생명 주기](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0a924e2d-ef44-41e0-bde8-b645e966155d/Untitled.png)

전통적인 웹페이지의 생명 주기

![Ajax](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ef61891-304a-43b8-a065-669e554f37e1/Untitled.png)

Ajax

Ajax 사용 전 웹페이지 방식

-   화면이 전환되었을 때, 변경할 필요 없는 부분까지 포함된 HTML을 서버로부터 매번 전송받기 때문에 불필요한 데이터 통신 발생.
-   변경할 필요 없는 부분까지 처음부터 렌더링하기 때문에 화면 전환시 순간적으로 깜빡이는 현상 발생
-   클라이언트-서버간 통신은 동기적으로 발생하기 때문에 서버로부터 응답이 없을때 블로킹 발생

Ajax 사용시 장점

-   변경 부분을 갱신하는데 필요한 데이터만 서버로부터 전송받아 불필요한 통신이 발생하지 않음.
-   변경이 필요없는 부분을 렌더링하지 않아도 되기 때문에 화면 깜빡임 현상이 없음
-   클라이언트-서버간 통신이 비동기적으로 발생하기 때문에 블로킹 현상이 발생하지 않음.

## 2. JSON

<aside>
💡 **JSON** : 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포멧. 자바스크립트에 종속되지 않은 언어 독립형 데이터 포멧으로 대부분 언어에서 사용이 가능하다.

</aside>

### 1. JSON 표기방식

JSON은 자바스크립트 객체 리터럴과 유사하게 key - value로 구성된 순수 텍스트입니다.

```jsx
{
	"name":"jeong",
	"age":23,
	"gender":"male"
}
```

JSON의 키는 반드시 큰따옴표로 묶어야 합니다. 값 역시 리터럴 표기법을 그대로 사용할 수 있지만, 문자열은 큰따옴표로 묶어야 합니다.

### 2. JSON.stringify

JSON.stringify 메서드는 객체를 JSON 포멧의 문자열로 변환합니다. 이를 **직렬화**라고 합니다. JSON.stringify 메서드는 객체 뿐만 아니라 배열도 JSON 포멧의 문자열로 변환합니다. 따라서 배열 자체를 비교할 때, 해당 메서드를 통해 배열을 문자열로 변환해서 동등 비교를 하곤 합니다.

### 3. JSON.parse

JSON.parse 메서드는 JSON 포멧의 문자열을 객체로 변환합니다. 서버로부터 전달받은 JSON 데이터는 문자열이기 때문이 이 문자열을 객체로 변환해서 사용하기 위해서는 JSON포멧의 문자열을 객체화 하는 것입니다. 이를 **역직렬화**라고 합니다. 이 메서드 역시 배열이 JSON 포멧의 문자알려 변환되어 있는 경우 문자열을 배열 객체로 변환합니다.

## 3. XMLHttpRequest

자바스크립트를 사용하여 HTTP 요청을 전송하기 위해서는 XMLHttpRequest 객체를 사용합니다. Web API인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공합니다.

### 1. XMLHttpRequest 객체 생성

XMLHttpRequest 객체는 XMLHttpRequest 생성자 함수를 호출하여 생성합니다. XMLHttpRequest 객체는 브라우저 환경에서만 정상적으로 실행됩니다. (브라우저에서 제공하는 Web API이기 떄문)

```jsx
const xhr = new XMLHttpRequest();
```

### 2.XMLHttpRequest 객체의 프로퍼티와 메서드

[MDN문서](https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest)에 해당 객체의 프로퍼티와 메서드에 관한 설명이 나와 있습니다.

### 3. HTTP 요청 전송

HTTP 요청을 전송하는 경우 다음 순서를 따릅니다.

1. XMLHttpRequest.prototype.open메서드로 HTTP 요청을 초기화 한다.
2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정한다.
3. XMLHttpRequest.prototype.send 메서드를 통해 HTTP 요청을 보낸다.

```jsx
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open("GET", "/users");

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.sendRequestHeader("content-type", "application/json");

// HTTP 요청 전송
xhr.send();
```

1. XMLHttpRequest.prototype.open

    open 메서드는 서버에 전송할 HTTP 요청을 초기화 합니다.

    ```jsx
    xhr.open(method,url[,async])
    ```

    | 매개변수 | 설명                   |
    | -------- | ---------------------- |
    | method   | HTTP 요청 메서드       |
    | url      | HTTP 요청을 전송할 URL |
    | async    | 비동기 요청 여부       |

    HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법입니다. 총 5가지가 있습니다.

    | HTTP 요청 메서드 | 종류           | 목적                  | 페이로드 |
    | ---------------- | -------------- | --------------------- | -------- |
    | GET              | index/retrieve | 모든/특정 리소스 취득 | X        |
    | POST             | create         | 리소스 생성           | O        |
    | PUT              | replace        | 리소스 전체 교체      | O        |
    | PATCH            | modify         | 리소스 일부 수정      | O        |
    | DELETE           | delete         | 모든/특정 리소스 삭제 | X        |

    **\*페이로드** : 사용에 있어서 전송되는 데이터

2. XMLHttpRequest.prototype.send

    send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송합니다. 기본적으로 서버로 전송하는 데이터는 GET,POST 요청 메서드에 따라 전송 방식에 차이가 있습니다.

    - GET: 데이터를 URL의 일부분인 쿼리 문자열로 서버에 전송
    - POST: 데이터(페이로드)를 통해 몸체에 담아 전송

    POST 형식으로 데이터를 전송할 때 데이터(페이로드)를 인수로 전달하는데, 이 데이터가 객체인 경우 JSON.stringify 메서드를 통해 직렬화 후 전달해야 합니다.

    GET 형식의 경우 send 메서드에 페이로드로 전달할 인수는 무시되고 요청 몸체는 null로 설정됩니다.

3. XMLHttpRequest.prototype.setRequestHeader

    setRequestHeader 메서드는 특정 HTTP 요청의 헤더 값을 설정합니다. setRequestHeader 메서드는 반드시 open 메서드를 호출한 이후에 호출해야 합니다.

    - Content-type
        요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보를 표현
        | MIME 타입   | 서브타입                             |
        | ----------- | ------------------------------------ |
        | text        | ~/plain, ~/html, ~/css, ~/javascript |
        | application | ~/json, ~/x-www-form-urlencode       |
        | multipart   | ~/formed-data                        |
        \*’~’은 MIME 타입을 나타냄
    - Accept
        HTTP 클라이언트가 서버에 요청할 떄 서버가 응답할 데이터 타입을 Accept 헤더를 통해 지정할 수 있습니다. 만약 accept 헤더를 설정하지 않으면 send 메서드가 호출될 때 accept 헤더가 */*으로 전송됩니다.

### 4. HTTP 응답처리

서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 합니다. XMLHttpRequest 객체가 가지는 이벤트 핸들러 프로퍼티 중 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티 값이 변경된 경우 발생하는 readystatechange 이벤트를 캐치하여 HTTP 응답을 처리할 수 있습니다.

send 메서드를 통해 HTTP 요청을 서버에 전송하면 서버는 응답을 반환합니다. 하지만 응답이 언제 클라이언트에 도달하는지 알 수 없으므로 readystatechange 이벤트를 통해 HTTP 요청의 현재 상태를 확인해봐야 합니다.

서버에 응답이 완료되면 응답 상태인 status 프로퍼티 값이 200인지 확인하여 정상 처리와 에러 처리를 구분합니다. 정상적으로 도착했다면 response 프로퍼티에서 서버가 전송한 데이터를 취득합니다.

readystatechange 이벤트 대신 load 이벤트를 캐치해도 좋습니다. load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생합니다.

# 44. REST API

REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍쳐이고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미합니다.

## 1. REST API의 구성

REST API는 아래 표의 행들로 구성되어 있습니다. REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있습니다.

## 2. REST API 설계 원칙

REST에서 가장 중요한 기본 원칙은 두 가지 입니다.

-   URI는 리소스를 표현하는데 집중한다.
    리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용합니다.
-   행위에 대한 정의는 HTTP 요청 메서드를 통해 한다.
    5가지 HTTP 요청 메서드를 사용하여 CRUD를 구현합니다.
