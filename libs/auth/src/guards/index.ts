import {JwtGuard} from "@lib/auth/guards/jwt.guard";
import {GraphqlAuthGuard} from "@lib/auth/guards/graphql-auth.guard";

export const GUARDS = [JwtGuard, GraphqlAuthGuard]