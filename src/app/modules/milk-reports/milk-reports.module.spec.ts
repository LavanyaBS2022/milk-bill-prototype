import { MilkReportsModule } from './milk-reports.module';

describe('MilkReportsModule', () => {
  let milkReportsModule: MilkReportsModule;

  beforeEach(() => {
    milkReportsModule = new MilkReportsModule();
  });

  it('should create an instance', () => {
    expect(milkReportsModule).toBeTruthy();
  });
});
