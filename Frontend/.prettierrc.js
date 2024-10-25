module.exports = {
  printWidth: 120, // 한 줄의 최대 너비 설정 (120자)
  tabWidth: 2, // 탭을 스페이스 2칸으로 설정
  singleQuote: true, // 문자열에 single quote 사용
  semicolons: true, // 코드 끝에 세미콜론을 항상 추가
  bracketSameLine: true, // JSX의 닫는 괄호를 동일한 줄에 배치
  bracketLine: false, // 닫는 괄호를 별도의 줄에 배치 (잘못된 설정; 올바른 옵션은 Prettier에서 사용되지 않음)
  endOfLine: 'auto', // OS에 따라 줄 바꿈 형식을 자동으로 설정
  trailingComma: 'all', // 여러 줄로 구성된 구문에서 항상 쉼표 추가
  arrowParens: 'avoid', // 화살표 함수에서 매개변수가 하나일 때 괄호 생략
};
