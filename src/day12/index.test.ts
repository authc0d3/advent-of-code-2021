import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 12", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result?.length).toBe(2);
  });

  it("total valid paths should be equal to 19", () => {
    expect(result && result[0]).toBe(19);
  });

  it("total valid paths with extra rules should be equal to 103", () => {
    expect(result && result[1]).toBe(103);
  });
});
