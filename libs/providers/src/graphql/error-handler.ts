import {GraphQLError} from "graphql";
import {Logger} from "@nestjs/common";

export const graphqlErrorHandler = (error: GraphQLError) => {
  Logger.warn(error)
  if ('response' in error.extensions) {
    const { message, ...response } = error.extensions['response'] as { message: string, response: Object }
    return {
      message,
      extensions: {
        timestamp: new Date().toISOString(),
        ...response
      }
    }
  }
  return error
}