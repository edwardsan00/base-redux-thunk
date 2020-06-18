export const Status = {
  NEW: "NEW",
  LOADING: "LOADING",
  READY: "READY",
  SAVING: "SAVING",
  SAVE: "SAVE",
  DELETE: "DELETE",
  ERROR: "ERROR",
  CANCEL: "CANCEL",
} as const;
 
export type StatusKey = keyof typeof Status
export type StatusValue = typeof Status[StatusKey]


export function typedAction<T extends string>(type: T): { type: T }

export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P }

export function typedAction(type: string, payload?: any) {
  return { type, payload }
}