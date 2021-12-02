import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 02", () => {
  it("should return an array with length equals to 2", async () => {
    const result = await main(TEST_FILE);
    expect(result.length).toBe(2);
  });

  it("first value should be equal to 150", async () => {
    const result = await main(TEST_FILE);
    expect(result[0]).toBe(150);
  });

  it("second value should be equal 900", async () => {
    const result = await main(TEST_FILE);
    expect(result[1]).toBe(900);
  });
});
