"use client";

import * as React from "react";
import { format,parseISO, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Flex, MyError, Text, useForms } from "lumia-ui";
import { generateUniqueRandomString } from "@/lib/randomKey";
export interface DatePickerProps {
  label: string;
  formProvider?: boolean;
  value: string;
  onValueChange: (param?: Date) => void;
  validations?: ((...args: unknown[]) => void)[];
  onValidationFail?: () => void;
}
export const DatePickerInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  DatePickerProps
> =
(props: DatePickerProps) => {
  const {
    label,
    formProvider = true,
    value,
    onValueChange,
    validations,
    onValidationFail,
  } = props;
  // const [value, setDate] = React.useState<Date>();
  const { addError, removeError } = useForms(formProvider) ?? {};
  const [errMsg, setErrMsg] = React.useState<string | null>(null);
  const key = generateUniqueRandomString(10);
  React.useEffect(() => {
    removeError && removeError(key);
  }, [value]);

  React.useEffect(() => {
    setErrMsg(null);
    if (validations && validations.length > 0) {
      for (let i = 0; i < validations.length; i++) {
        const fn = validations[i].bind(this, value);
        try {
          fn();
        } catch (ex: unknown) {
          onValidationFail && onValidationFail();
          if (onValidationFail && addError) {
            addError(key);
          }
          let err: MyError;
          if (ex instanceof MyError) {
            err = ex as MyError;
            setErrMsg(err.message);
          } else {
            err = ex as Error;
            setErrMsg(label + " " + err.message);
          }
          break;
        }
      }
    }
  }, [value, validations, label]);
  return (
    <Flex direction="column">
      <Text type="caption">{label}</Text>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={parseISO(value)}
            onSelect={onValueChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errMsg && <Text type="error">{errMsg}</Text>}
    </Flex>
  );
};

