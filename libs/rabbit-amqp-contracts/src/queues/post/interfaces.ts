export interface CreatePostRequest {
  title: string
  message: string
  authorId: string
}

export interface PostResponse {
  id: string

  title: string

  message: string

  authorId: string

  createdAt: string

  updatedAt: string
}