export interface IAuthUseCases {
  getJiraToken(userId: string): Promise<string>;
}
