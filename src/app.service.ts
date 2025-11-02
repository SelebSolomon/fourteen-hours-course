import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private DevConfigService: DevConfigService,
    @Inject('CONFIG')
    private config: { port: string },
  ) {}
  getHello(): string {
    return `Hello World! i am learning next js and type script ${this.DevConfigService.getDBHOST()}, ${this.config.port}`;
  }
}
