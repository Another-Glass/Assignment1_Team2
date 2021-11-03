<div align="center">

# 원티드 백엔드 프리온보딩 1차 과제

  <img height="400" width="700" src="https://user-images.githubusercontent.com/59385491/139865333-05dabf0a-e283-4e51-94d9-8a42e6acbb7b.jpeg">

  <h2> 👨‍💻 원티드 프리온보딩 어나더글라스 팀입니다. </h2>

<p>6명의 안경잡이 개발자들의 시선과 관점이 담긴 과제입니다.</p>
<p>무던히 포기하지 않고 견디고 견뎠던 그 시간들이 변함없는 단 하나의 해답임을 믿습니다.</p>

</div>

<div align=center>

<img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
<img alt="Hits" src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FAnother-Glass%2FAssignment1_Team1%2Fblob%2Fdevelop%2FREADME.md&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false" />
<img alt="issues" src="https://img.shields.io/github/issues/Another-Glass/Assignment1_Team1" />

</div>

</br>
</br>
</br>
</br>
</br>
</br>

## 🎤 소개

이 레포지토리는 [원티드 프리온보딩 백엔드 코스](https://www.wanted.co.kr/events/pre_onboarding_course_4) 1차 과제를 위해 만들어졌습니다.

- 일정 : 2021년 11월 1일(월) 오후 11시 ~ 11월 3일(수) 오전 10시

<br>
<br>

<div align='center'>

## 🧑🏻‍💻 팀원 소개

|                       **팀장 어유선**                        |                       **팀원 김현길**                        |                       **팀원 이동훈**                        |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/32833404?v=4" height=200 width=200> | <img src="https://avatars.githubusercontent.com/u/48472537?v=4" height=200 width=200> | <img src="https://avatars.githubusercontent.com/u/68373235?v=4" height=200 width=200> |
| **blog**: [Makkiato](makkiato.tistory.com) </br> **github**: [Makkiato](https://github.com/Makkiato) | **blog**: [gusrlf14](https://velog.io/@gusrlf14) </br> **github**: [hyunghilkim](https://github.com/hyunghilkim) | **blog**: [dongjay00.log](https://velog.io/@dongjay00) </br> **github**: [dongjay00](https://github.com/dongjay00) |
| ![sprint1](https://img.shields.io/badge/wanted-sprint1-orange) | ![sprint1](https://img.shields.io/badge/wanted-sprint1-orange) | ![sprint1](https://img.shields.io/badge/wanted-sprint1-orange) |
|                        개발 환경 설정                        |                        개발 환경 설정                        |                        개발 환경 설정                        |
|                     테크리더, QA, devops                     |                             API                              |                              DB                              |
|                      [프로젝트 회고](makkiato.tistory.com)                       |                      [프로젝트 회고]()                       | [프로젝트 회고](https://velog.io/@dongjay00/%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EC%B2%AB%EB%B2%88%EC%A7%B8-%EA%B3%BC%EC%A0%9C-%ED%9A%8C%EA%B3%A0) |

</div>

<br>
<br>
<br>

## 📕 과제 내용

### 개발 요구사항

- 원티드 지원 과제 내용 포함
- 게시글 카테고리
- 게시글 검색
- 대댓글(1 depth)
  - 대댓글 pagination
- 게시글 읽힘 수
  - 같은 User가 게시글을 읽는 경우 count 수 증가하면 안 됨
- Rest API 설계
- Unit Test
- 1000만건 이상의 데이터를 넣고 성능테스트 진행 결과 필요

</br>
</br>

## 📕 과제 해결 방안

- Node.js, express, mongoDB, mongoose를 활용해서 게시판 CRUD API, 회원가입 로그인 API, 댓글 CRUD를 구현했습니다.
- 짧은 시간내에 효율적으로 완성을 하기위해 DB, API, QA 및 Devops로 업무를 분담하였습니다.  
- 앞으로 한달간의 일정을 위해 앞서가기보다는 함께가기로 했습니다. 
- Commit마다 함께 더 나은 코드를 위해 고민했습니다.
- 게시글과 댓글 대댓글을 함께 불러오는 과정에서 Promise로부터 여러개의 Promise로 나뉘는 logic을 발견하였습니다. 이렇게 나뉜 Promise가 다 처리되는 것을 기다리면서도, 무작정 chainning 하는 것은 지양하기위에 Promise의 Queue를 사용해보자 하는 아이디어가 나왔고, Array.push를 이용해 임시로 활용해보았습니다

</br>
</br>

## 🛠 실행 방법

- 레포지토리를 clone 받거나, 압축을 해제한 후 npm install을 통해 환경 셋팅을 진행합니다.
- npm start를 통해 서버를 구동합니다.
- src 폴더에 .env 파일을 설정해서, 환경변수를 설정합니다.

- <details><summary><b>.env 파일 설정 방법</b></summary>

  ```
  MONGO_URL="mongoURL"
  JWT_SECERT_KEY="wanted"
  ```

</details>

</br>
</br>

## 🗂 과제 확인 및 평가 API 명세서

- Postman을 활용하여 API 작동 테스트를 진행했습니다.
- 자세한 API 명세는 아래에서 확인 가능합니다.
- [🗂 API Description Link](https://github.com/Another-Glass/Assignment1_Team2/wiki)

</br>
</br>

## 😎 컨벤션 설정

- [👏🏻 협업을 위한 코드 컨벤션 설정하기](https://overcome-the-limits.tistory.com/entry/%ED%98%91%EC%97%85-%ED%98%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

- [👏🏻 Prettier, ESLint, Airbnb Style Guide로 코드 컨벤션 설정하기](https://overcome-the-limits.tistory.com/entry/%ED%98%91%EC%97%85-ESLint-Prettier-Airbnb-Style-Guide%EB%A1%9C-%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0?category=911197)

- [👏🏻 협업을 위한 git 커밋 컨벤션 설정하기](https://overcome-the-limits.tistory.com/entry/%ED%98%91%EC%97%85-%ED%98%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-%EA%B8%B0%EB%B3%B8%EC%A0%81%EC%9D%B8-git-%EC%BB%A4%EB%B0%8B%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0?category=911197)

- [👏🏻 협업을 위한 Git Flow 설정하기](https://overcome-the-limits.tistory.com/entry/%ED%98%91%EC%97%85-%ED%98%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-Git-Flow-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0?category=911197)

- [👏🏻 협업을 위한 Git 명령어 가이드](https://overcome-the-limits.tistory.com/entry/%ED%98%91%EC%97%85-%ED%98%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-Git-%EB%AA%85%EB%A0%B9%EC%96%B4-%EA%B0%80%EC%9D%B4%EB%93%9C?category=911197)

</br>
</br>

## 🛠 Dependencies

- "bcryptjs": "2.4.3" - https://www.npmjs.com/package/bcryptjs
- "dotenv": "^10.0.0" - https://www.npmjs.com/package/dotenv

- "express": "^4.17.1" - http://expressjs.com/

- "jsonwebtoken": "8.5.1" - https://www.npmjs.com/package/jsonwebtoken

- "mongoose": "^6.0.12" - https://www.npmjs.com/package/mongoose

</br>
</br>

## 🌲 File Tree

```

📦src
 ┣ 📂bin
 ┃ ┗ www
 ┣ 📂config
 ┃ ┣ db.js
 ┃ ┗ secretKey.js
 ┣ 📂controllers
 ┃ ┣ postController.js
 ┃ ┗ userController.js
 ┣ 📂global
 ┃ ┗ routes.js
 ┣ 📂lib
 ┃ ┣ encryption.js
 ┃ ┗ jwt.js
 ┣ 📂middlewares
 ┃ ┗ auth.js
 ┣ 📂models
 ┃ ┣ postModel.js
 ┃ ┗ userModel.js
 ┣ 📂routes
 ┃ ┣ globalRouter.js
 ┃ ┣ postRouter.js
 ┃ ┗ userRouter.js
 ┣ 📂service
 ┃ ┣ postService.js
 ┃ ┗ userService.js
 ┣ 📂utils
 ┃ ┣ 📂db
 ┃ ┃ ┣ auto-id-setter.js
 ┃ ┃ ┗ index.js
 ┃ ┣ responseMessage.js
 ┃ ┣ statusCode.js
 ┃ ┗ util.js
 ┣ 📂views
 ┃ ┣ error.jade
 ┃ ┣ index.jade
 ┃ ┗ layout.jade
 ┣ .babelrc
 ┣ .env
 ┣ .eslintrc.json
 ┣ .gitignore
 ┣ .prettierrc.json
 ┣ app.js
 ┣ package-lock.json
 ┗ package.json

```
