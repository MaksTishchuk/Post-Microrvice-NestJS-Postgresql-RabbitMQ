import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {GqlExecutionContext} from "@nestjs/graphql";

export const GraphqlCurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const reqCtx = GqlExecutionContext.create(context)
  return reqCtx.getContext().req.user
})