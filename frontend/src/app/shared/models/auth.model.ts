/** Response received after successful login or registration. */
export interface IAuthResponse {
  token: string;
  username: string;
  userId: number;
}
