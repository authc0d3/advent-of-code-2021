import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 02", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result.length).toBe(2);
  });

  it("first value should be equal to 150", () => {
    expect(result[0]).toBe(150);
  });

  it("second value should be equal 900", () => {
    expect(result[1]).toBe(900);
  });
});
