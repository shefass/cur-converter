import { validate } from "../logic/functions";

test('validate user input, it must be valid number, returns true if bad input', () => {
  expect(validate(5)).toBe(false);
  expect(validate(5.54125)).toBe(false);
  expect(validate(-5)).toBe(true);
  expect(validate(-5.47)).toBe(true);
  expect(validate("-")).toBe(true);
  expect(validate("a")).toBe(true);
  expect(validate("5")).toBe(false);
  expect(validate("5.54.125")).toBe(true);
});