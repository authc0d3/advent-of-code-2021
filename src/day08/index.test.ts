import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 08", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("the total know segment configurations should be equal to 26", () => {
    expect(result && result[0]).toBe(26);
  });

  it("the sum of all display values should be equal to 61229", () => {
    expect(result && result[1]).toBe(61229);
  });
});
