module.exports = {
  extends: [
    'next', // Next.js와 관련된 기본 ESLint 규칙
    'plugin:@typescript-eslint/recommended', // TypeScript에 대한 기본 권장 설정
    'plugin:import/recommended', // import 관련 권장 설정
    'prettier', // Prettier와 충돌하는 규칙 비활성화
  ],
  plugins: [
    '@typescript-eslint', // TypeScript용 ESLint 플러그인
    'simple-import-sort', // import/export 정렬 플러그인
    'prettier', // Prettier 포맷팅 관련 규칙
  ],
  rules: {
    'import/no-unresolved': 'off', // 경로 관련 규칙 비활성화
    '@typescript-eslint/no-require-imports': 'off',
    'import/default': 'off', // import 규칙 중 기본 내보내기 오류 비활성화
    'simple-import-sort/imports': 'warn', // import 구문을 알파벳 순서로 정렬 (경고)
    'simple-import-sort/exports': 'error', // export 구문을 알파벳 순서로 정렬 (에러)
    'react/no-unescaped-entities': 'off', // JSX에서 escape되지 않은 문자열 에러 비활성화
    '@next/next/no-page-custom-font': 'off', // Next.js에서 커스텀 폰트 사용 허용
    'react/self-closing-comp': [
      'error',
      {
        component: true, // 컴포넌트에서 빈 태그를 self-closing으로 설정
        html: true, // HTML 태그에서도 빈 태그를 self-closing으로 설정
      },
    ],
    // 'react/jsx-first-prop-new-line': 'error', // JSX 첫 번째 속성을 새 줄에 배치 (에러)
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline', // 배열에서 항상 쉼표 사용 (줄바꿈 시)
        objects: 'always-multiline', // 객체에서 항상 쉼표 사용 (줄바꿈 시)
        imports: 'never', // import 구문에서는 끝에 쉼표 사용 안 함
        exports: 'never', // export 구문에서는 끝에 쉼표 사용 안 함
        functions: 'always-multiline', // 함수 인자에서도 줄바꿈 시 쉼표 사용을 허용
      },
    ],
    indent: ['error', 2], // 들여쓰기를 2칸으로 설정 (에러)
    quotes: ['error', 'single'], // 문자열을 single quote로 설정 (에러)
    'eol-last': 'error', // 파일 끝에 줄바꿈이 필요함 (에러)
    semi: ['error', 'always'], // 세미콜론을 항상 사용 (에러)
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all', // 사용되지 않은 모든 변수에 대해 경고
        args: 'none', // 함수 인자 중 사용되지 않은 것은 무시
        ignoreRestSiblings: false, // 나머지 속성 중 사용되지 않은 것은 에러로 표시
      },
    ],
    'comma-spacing': ['error', { before: false, after: true }], // 쉼표 앞뒤의 간격을 제어 (에러)
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json', // tsconfig 파일 경로 설정
      },
    },
  },
};
