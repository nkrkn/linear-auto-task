import { type CreateIssueMutation } from "@linear/sdk";
import { getAllTimezones } from "countries-and-timezones"

type RepeatOptions = {
  type: "daily"
} | {
  type: "day_of_the_week"
  day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
} | {
  type: "day_of_the_month"
  day: number
}

type TimeZone = keyof ReturnType<typeof getAllTimezones>

export type Issue = Parameters<CreateIssueMutation["fetch"]>[0] & {
  autoTaskName: string;
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

  addIssues(...issues: Issue[]) {
  }

  merge(...issueBuilders: IssueBuilder[]) {

  }

  build(): string {
    return JSON.stringify({
      issues: this.issues
    })
  }
}