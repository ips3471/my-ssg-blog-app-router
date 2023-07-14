---
date: '2023-07-13'
description: 데이터를 서버로부터 가져올 때는 적절한 상황에 맞게 직렬 또는 병렬 방식을 선택하여 데이터를 가져오는 것이 중요합니다.
tags:
  - perallel
  - serial
  - waterfall
  - event-loop
  - synchronous
  - asynchronous
title: 데이터를 가져올 때 직렬과 병렬 방식의 차이점
---

|       방식       | 실행흐름 |  처리순서  | 처리시간 | 데이터 간 의존성 |
| :--------------: | :------: | :--------: | :------: | :--------------: |
| 직렬(sequential) |   동기   |   순차적   |   길다   |      보장됨      |
|  병렬(parallel)  |  비동기  | 동시다발적 |   짧다   |  보장되지 않음   |

> ![Sequential vs Parallel](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fsequential-parallel-data-fetching.png&w=1920&q=75&dpl=dpl_4w5XmDcbLe4C4AG5VJAoeG8dxqAU)

**직렬 방식**은 순차적인 처리를 보장하므로 요청 간의 의존성이나 자원 공유가 필요한 경우에 유용하다. **병렬 방식**은 여러 작업을 동시에 처리하여 작업 시간을 단축시킬 수 있지만, 작업 간의 의존성과 자원 관리에 주의해야 한다. 따라서 적절한 상황에 맞게 직렬 또는 병렬 방식을 선택하여 데이터를 가져오는 것이 중요하다.
