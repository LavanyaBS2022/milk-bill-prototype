import { MilkModule } from './milk.module';

describe('MilkModule', () => {
  let milkModule: MilkModule;

  beforeEach(() => {
    milkModule = new MilkModule();
  });

  it('should create an instance', () => {
    expect(milkModule).toBeTruthy();
  });
});
