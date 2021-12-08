import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 05", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("the dangerous points should be equals to 5", () => {
    expect(result && result[0]).toBe(5);
  });

  it("the total dangerous points should be equals to 12", () => {
    expect(result && result[1]).toBe(12);
  });
});
