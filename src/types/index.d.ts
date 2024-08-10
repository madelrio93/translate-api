declare namespace Type {
  export interface TranslateParams {
    text: string;
    target: string;
    source?: string;
  }

  export interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
}
