export interface RabbitAmqpBaseRequest<T = unknown> {
  type: string
  payload: T
  requestId: string
  timestamp: string
  exchange?: string
  routingKey?: string
}