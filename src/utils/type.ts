export interface UserRequest extends Request {
  user: {
    id: string
    username: string
  }
}
