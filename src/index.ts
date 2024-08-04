import { type CreateIssueMutation } from "@linear/sdk";

export type CreateIssue = Parameters<CreateIssueMutation["fetch"]>[0];
