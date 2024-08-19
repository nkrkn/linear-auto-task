import { type CreateIssueMutation } from "@linear/sdk";

type RepeatOptions =
  | {
      type: "daily";
    }
  | {
      type: "weekly";
      day:
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday";
    }
  | {
      type: "monthly";
      day: number;
    };

export type Issue = Parameters<CreateIssueMutation["fetch"]>[0] & {
  autoTaskName: string;
  repeatOptions: RepeatOptions;
};

type ErrorType = "MERGE_ERROR" | "INVALID_ISSUE" | "UNKNOWN";

export class LinearAutoTaskError extends Error {
  constructor(type: ErrorType, message?: string) {
    super();
  }
  type: ErrorType;
}

export class IssueBuilder {
  issues: Issue[] = [];

  constructor(...issues: Issue[]) {
    this.addIssues(...issues);
  }

  _validateUniqueAutoTaskNames(...issues: Issue[]) {
    const set = new Set(this.issues.map((issue) => issue.autoTaskName));
    for (let issue of issues) {
      if (set.has(issue.autoTaskName)) {
        throw new LinearAutoTaskError(
          "INVALID_ISSUE",
          `Cannot add issue because existing issue already exists with autoTaskName: ${issue.autoTaskName}`
        );
      }
    }
  }

  addIssues(...issues: Issue[]) {
    this._validateUniqueAutoTaskNames();
    this.issues.push(...issues);
  }

  merge(...issueBuilders: IssueBuilder[]) {
    for (let builder of issueBuilders) {
      const issues = builder.issues;
      this.addIssues(...issues);
    }
  }

  build(): string {
    return JSON.stringify({
      issues: this.issues,
    });
  }
}
