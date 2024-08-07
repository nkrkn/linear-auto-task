import { type CreateIssueMutation } from "@linear/sdk";

type RepeatOptions = {}
type TimeZone = {}

export type Issue = Parameters<CreateIssueMutation["fetch"]>[0] & {
  autoTaskId: string;
  repeatOptions: RepeatOptions;
  timezone: TimeZone;
};

type ErrorType = "MERGE_ERROR" | "INVALID_ISSUE" | "UNKNOWN"

interface LinearAutoTaskError extends Error {
  type: ErrorType
}

export class IssueBuilder {
  issues: Issue[] = []

  constructor(...issues: Issue[]) {
  }

  addIssues(...issues: Issue[]) {}
  
  merge(...issueBuilders: IssueBuilder[]) {}

  build(): string {
    return JSON.stringify({
      issues: this.issues
    })
  }
}