# Throttle과 Debounce

`input` 입력창에 단어가 변환 될 때마다 API를 호출해서 빠르게 처리를 하는 기능이 있다고 가정을 해봅시다. 이 기능은 검색 이라는 클릭 이벤트를 발생시키지 않고 키보드 이벤트를 통해서 API를 호출합니다. 하지만 이 기능에서 한가지 문제가 있습니다. 검색 API가 유료라는 점과 키보드 이벤트에서 값의 변화를 알아차리는데는 버튼 하나하나마다 API 검색이 들어간다는 점 입니다. 즉 불필요한 리소스가 낭비되고 있습니다. 또 다른 예시로 스크롤을 내리는 이벤트를 발생시킬때 마다 콜백 함수가 실행된다고 가정을 해봅시다. 그리고 그 콜백 함수가 큰 리소스를 잡아먹는 작업이라고 가정 했을 때, 스크롤을 쭉 내린다면 사용자 경험이 그닥 좋지 못한 결과를 도출하게 됩니다.

이와 같이 불필요한 리소스 낭비를 방지하기 위해 Throttle과 Debounce라는 이벤트 제어 방식이 도입됩니다. 이 두 가지 방법은 DOM 이벤트를 기반으로 실행하는 JS를 성능상의 이유로 제어하는 방법입니다. 두 기술의 사용 사례는 아래와 같습니다.

-   사용자가 창 크기 조정을 멈출 때까지 기다렸다가 `resizing event` 사용하기 위해
-   사용자가 키보드 입력을 중지(예: 검색창) 할 때까지 ajax 이벤트를 발생시키지 않기 위해
-   페이지의 스크롤 위치를 측정하고 최대 50ms 마다 응답하기를 바랄 경우에
-   앱에서 요소를 드래그 할 때 좋은 성능을 보장하기 위해

하지만 Throttle과 Debounce는 차이점이 존재합니다.

## **Throttle**

Throttle은 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 기술입니다. 특성 자체가 실행 횟수에 제한을 두는 것이기 때문에 일반적으로 성능 문제에 많이 사용됩니다. 앞서 예시를 들었든 스크롤 이벤트를 설정 할 때, 일정 주기를 설정해서 그 때에 한번만 실행될 수 있도록 제한을 거는 것입니다.

### 무한 스크롤링 페이지

[CodePen Embed - Infinite scrolling throttled](https://codepen.io/jaehee/embed/GPqyGj?height=748&theme-id=19458&slug-hash=GPqyGj&default-tab=result&user=jaehee&pen-title=Infinite%20scrolling%20throttled&name=cp_embed_5)

## **Debounce**

Debounce는 이벤트를 그룹화하여 일정 시간동안의 발생했던 이벤트 중 마지막(혹은 처음)만 발생시키는 기술입니다. 앞에서 언급했던 예시로 input에서 keyboard 이벤트만 존재한다고 가정했을때 검색창에 “JavaScript”를 검색하면 Ajax에서 ‘J’,’Ja’,’Jav’...’JavaScript’를 모두 검색 요청하게 됩니다. 마지막 검색을 제외하고는 정말 불필요한 이벤트 처리입니다. 따라서, 특정 시간을 두어 해당 시간동안에 발생하는 이벤트들을 그룹화하여 하나로 통일하는 기술이 Debounce입니다.

### Ajax 요청이있는 자동 완성 양식의 키 누르기 예제

[CodePen Embed - Debouncing keystrokes Example](https://codepen.io/jaehee/embed/JwKMGw?height=300&theme-id=19458&slug-hash=JwKMGw&default-tab=result&user=jaehee&pen-title=Debouncing%20keystrokes%20Example&name=cp_embed_4)

<aside>
⏺️ Throttle과 Debounce의 차이점

디바운싱과 스로틀의 가장 큰 차이점은 스로틀은 적어도 X 밀리 초마다 정기적으로 기능 실행을 보장한다는 것입니다.

Debounce 는 아무리 많은 이벤트가 발생해도 모두 무시하고 특정 시간사이에 어떤 이벤트도 발생하지 않았을 때 딱 한번만 마지막 이벤트를 발생시키는 기법입니다.

따라서 5ms 가 지나기전에 계속 이벤트가 발생할 경우 콜백에 반응하는 이벤트는 발생하지 않고 계속 무시됩니다.

</aside>

---

참조

[https://webclub.tistory.com/607](https://webclub.tistory.com/607)

[https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa](https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa)
