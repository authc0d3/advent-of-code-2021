import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 01", () => {
  it("should return an array with length equals to 2", async () => {
    const result = await main(TEST_FILE);
    expect(result.length).toBe(2);
  });

  it("first value should be equal to 7", async () => {
    const result = await main(TEST_FILE);
    expect(result[0]).toBe(7);
  });

  it("second value should be equal 5", async () => {
    const result = await main(TEST_FILE);
    expect(result[1]).toBe(5);
  });
});
