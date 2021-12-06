import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 04", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("the winner points should be equals to 4512", () => {
    expect(result && result[0]).toBe(4512);
  });

  it("the last winner points should be equals to 1924", () => {
    expect(result && result[1]).toBe(1924);
  });
});
