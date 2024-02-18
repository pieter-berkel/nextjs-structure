import { ZodError, z } from "zod";

export type MaybePromise<TType> = Promise<TType> | TType;

type AnyInput = z.AnyZodObject | z.ZodNever;

type Def<TInput extends AnyInput> = {
  input: TInput;
};

type AnyDef = Def<AnyInput>;

type Builder<TDef extends AnyDef> = {
  _def: TDef;
  input<TInput extends AnyInput>(input: TInput): Builder<{ input: TInput }>;
  action: <AOutput>(
    action: (params: { input: z.infer<TDef["input"]> }) => AOutput
  ) => (data?: z.infer<TDef["input"]>) => AOutput;
};

type ErrorCode = "INVALID_INPUT";

class ActionError extends Error {
  code: string;
  data?: ZodError["issues"];
  constructor({
    code,
    message,
    data,
  }: {
    code: ErrorCode;
    message?: string;
    data?: ZodError["issues"];
  }) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export const builder = <TInput extends AnyInput = z.ZodNever>(
  initDef?: Partial<AnyDef>
): Builder<{ input: TInput }> => {
  const _def: AnyDef = {
    input: z.never(),
    ...initDef,
  };

  return {
    _def,
    input: (input) => builder({ ..._def, input }),
    action: (action) => (data) => {
      if (!_def.input) {
        return action({ input: z.never() });
      }

      const res = _def.input.safeParse(data);

      if (!res.success) {
        throw new ActionError({
          code: "INVALID_INPUT",
          message: res.error.message,
          data: res.error.issues,
        });
      }

      return action({ input: res.data });
    },
  };
};
