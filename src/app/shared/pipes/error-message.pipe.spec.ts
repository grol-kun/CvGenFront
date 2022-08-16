import { ErrorMessagePipe } from './error-message.pipe';

describe('Pipe: ErrorMessagee', () => {
  it('create an instance', () => {
    let pipe = new ErrorMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
