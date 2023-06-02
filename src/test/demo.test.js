const add1 = (a, b) => a + b;

test('Index add fun', () => {
    const ret = add1(1, 2);
    expect(ret).toBe(3);
});