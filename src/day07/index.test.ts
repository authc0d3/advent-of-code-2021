import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 07", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("the minimum fuel consumption must be equal to 37", () => {
    expect(result && result[0]).toBe(37);
  });

  it("the minimum fuel consumption with accumulation must be equal to 168", () => {
    expect(result && result[1]).toBe(168);
  });
});
