import {Global, Module} from '@nestjs/common';
import {PostModule} from "@lib/post";

@Global() // for access in all modules
@Module({
  imports: [PostModule],
  exports: [PostModule]
})
export class DomainsModule {}
