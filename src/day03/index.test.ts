import { main } from "./index";

const TEST_FILE = "test.txt";

describe("day 03", () => {
  const result = main(TEST_FILE);

  it("should return an array with length equals to 2", () => {
    expect(result.length).toBe(2);
  });

  it("the energy should be equal to 198", () => {
    expect(result[0]).toBe(198);
  });

  it("the life support rating should be equal to 230", () => {
    expect(result[1]).toBe(230);
  });
});
