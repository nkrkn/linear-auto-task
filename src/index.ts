import { type CreateIssueMutation } from "@linear/sdk";

/**
 * Configures how often to repeat creation of a task.
 * @property type - one of ["daily", "weekly", "monthly"]
 * @property day - If `type` is "weekly", will be a day of the week to repeat the task. If `type` is "monthly", will be a day of the month. Note: day can be any number and does not account for different number of days depending on the month.
 */
type RepeatOptions =
  | {
      // Task will be created every day
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

/**
 * Linear Issue with extra properties to configure task repitition.
 * @see {@link CreateIssueMutation} for options
 * @property autoTaskName - must be unique, used in title for issues
 * @property repeatOptions {@link RepeatOptions}
 */
export type Issue = Parameters<CreateIssueMutation["fetch"]>[0] & {
  /** must be unique, used in title for issuesd */
  autoTaskName: string;
  /** @see {@link RepeatOptions} */
  repeatOptions: RepeatOptions;
};

type ErrorType = "MERGE_ERROR" | "INVALID_ISSUE" | "UNKNOWN";

/**
 * Not currently used.
 */
export class LinearAutoTaskError extends Error {
  constructor(type: ErrorType, message?: string) {
    super(message);
  }
  type: ErrorType;
}

/**
 * Class for grouping and storing issues/tasks.
 */
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
    this._validateUniqueAutoTaskNames(...issues);
    this.issues.push(...issues);
  }

  merge(...issueBuilders: IssueBuilder[]) {
    for (let builder of issueBuilders) {
      const issues = builder.issues;
      this.addIssues(...issues);
    }
  }

  /** Returns issues as a string in JSON format meant to be consumes by {@link https://github.com/nkrkn/linear-auto-task-action GitHub action }. */
  build(): string {
    return JSON.stringify({
      issues: this.issues,
    });
  }
}
