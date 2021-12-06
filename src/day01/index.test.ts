import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 01", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", async () => {
    expect(result.length).toBe(2);
  });

  it("first value should be equal to 7", () => {
    expect(result[0]).toBe(7);
  });

  it("second value should be equal 5", () => {
    expect(result[1]).toBe(5);
  });
});
