## useEffect

-   useEffect는 함수형 컴포넌트를 지향하는 React에서 제공하는 hooks중 하나로, 해당 컴포넌트의 side-effect를 다룰때 사용이 됩니다. 여기서 의미하는 side-effect는 함수가 동작하면서 함수 외부에 존재하는 값이나 변화하는 상태를 의미합니다. 아래 코드 예시를 한번 봅시다.

    ```jsx
    function UserProfile({ name }) {
        const message = `${name}님 환영합니다!`; //함수 반환 값 생성

        // Bad!
        document.title = `${name}의 개인정보`; //함수 외부와 상호작용하는 Side-effect 코드
        return <div>{message}</div>;
    }
    ```

    오직 `userProfile`만을 반환하는 함수인데 `document`의 `title` 도 같이 변환을 해야하는 경우가 있습니다. name 값의 변화에 따라 공통적으로 처리되는 부분이 있다면 한 함수에서 처리하는게 효과적이지만, message만을 반환하는 함수에 외부 함수의 상태를 변경하는 것은 썩 유쾌한 일이 아닙니다. 따라서 React에서는 다음과 같은 방식을 권장합니다.

    ```jsx
    function UserProfile({ name }) {
        const message = `${name}님 환영합니다!`; //함수 반환 값 생성

        useEffect(() => {
            document.title = `${name}의 개인정보`;
        }, [name]);
        return <div>{message}</div>;
    }
    ```

    이와 같이 useEffect hooks를 활용해서 name에 변화가 있지 않으면 안에 있는 콜백함수는 실행되지 않게끔 설정할 수 있습니다.

    참조:https://dmitripavlutin.com/react-useeffect-explanation/#1-useeffect-is-for-side-effects
