import { type CreateIssueMutation } from "@linear/sdk";

export type Linear_CreateIssueInput = Parameters<CreateIssueMutation["fetch"]>[0];

type ErrorType = "MERGE_ERROR" | "INVALID_ISSUE" | "UNKNOWN"

interface LinearAutoTaskError extends Error {
  type: ErrorType
}

export class IssueBuilder {
  issues: Linear_CreateIssueInput[] = []

  constructor(...issues: Linear_CreateIssueInput[]) {
  }

  addIssues(...issues: Linear_CreateIssueInput[]) {}
  
  merge(...issueBuilders: IssueBuilder[]) {}

  toString(): string {
    return ""
  }
}
