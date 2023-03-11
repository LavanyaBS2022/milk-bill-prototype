import { ChillingCenterModule } from './chilling-center.module';

describe('ChillingCenterModule', () => {
  let chillingCenterModule: ChillingCenterModule;

  beforeEach(() => {
    chillingCenterModule = new ChillingCenterModule();
  });

  it('should create an instance', () => {
    expect(chillingCenterModule).toBeTruthy();
  });
});
