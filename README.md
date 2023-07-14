pages to app router 마이그레이션 과정

기존프로젝트에 적용해야 할 주요 변경사항은 다음과 같다.

|         feature         | description                                                                                                       | figure                                                                                                                                                                   |
| :---------------------: | :---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|    Safely Colocation    | Only the content returned by page.js or route.js is sent to the client.                                           | ![Safe colocation by default](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=1920&q=75&dpl=dpl_4w5XmDcbLe4C4AG5VJAoeG8dxqAU) |
| Data fetching functions | ~~`getServerSideProps`~~ ~~`getStaticProps`~~ ~~`getInitialProps`~~ <br> `async` and `await` in Server Components |

## file convention
