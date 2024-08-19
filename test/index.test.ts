import { assert, expect, test, describe } from "vitest";
import { IssueBuilder, Issue } from "./../src/index";

const teamId = "team";

const issues: Issue[] = [
  {
    autoTaskName: "1",
    repeatOptions: { type: "daily" },
    teamId,
  },
  {
    autoTaskName: "2",
    repeatOptions: { type: "weekly", day: "Sunday" },
    teamId,
  },
  {
    autoTaskName: "3",
    repeatOptions: { type: "monthly", day: 4 },
    teamId,
  },
];

const moreIssues: Issue[] = [
  {
    autoTaskName: "4",
    repeatOptions: { type: "daily" },
    teamId,
  },
  {
    autoTaskName: "5",
    repeatOptions: { type: "weekly", day: "Sunday" },
    teamId,
  },
  {
    autoTaskName: "6",
    repeatOptions: { type: "monthly", day: 4 },
    teamId,
  },
];

describe("IssueBuilder", () => {
  test("build() returns valid JSON", () => {
    const builder = new IssueBuilder(...issues);
    const expected = JSON.stringify({ issues });
    assert.equal(expected, builder.build());
  });
  test("addIssues() works", () => {
    const builder = new IssueBuilder(...issues);
    builder.addIssues(...moreIssues);
    assert(builder.issues.find((issue) => issue.autoTaskName === "4"));
  });
  test("addIssues() throws error if autoTaskName already exists", () => {
    const builder = new IssueBuilder(...issues);
    expect(() =>
      builder.addIssues({
        autoTaskName: "2",
        repeatOptions: { type: "weekly", day: "Sunday" },
        teamId,
      })
    ).toThrowError(
      "Cannot add issue because existing issue already exists with autoTaskName:"
    );
  });
  test("merge() works", () => {
    const builder1 = new IssueBuilder(...issues);
    const builder2 = new IssueBuilder(...moreIssues);
    builder1.merge(builder2);
    assert(builder1.issues.find((issue) => issue.autoTaskName === "4"));
  });
});
