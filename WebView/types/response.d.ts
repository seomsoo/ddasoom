interface SignInResponseDto {
  userId: UserId;
  name: Name;
  token: Token;
}

interface GetPanicInfoDto {
  panicId: number;
  startDate: string;
  duration: number;
  address: string;
}
