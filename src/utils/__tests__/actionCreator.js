import actionCreator from '../actionCreator';

describe('actionCreator', () => {
  it('should create action with type and payload', () => {
    const TYPE = 'test_type';
    const payload = { test: 'test' };
    const action = actionCreator(TYPE)(payload);

    expect(action.type).toEqual(TYPE);
    expect(action.payload).toEqual(payload);
  });
});
