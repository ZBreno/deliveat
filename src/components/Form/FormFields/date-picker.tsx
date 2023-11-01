import {
  Datepicker,
  DatepickerProps,
  I18nConfig,
  NativeDateService,
} from "@ui-kitten/components";
import React from "react";
import { Control, useController } from "react-hook-form";

import FieldWrapper from "./FieldWrapper";

interface Props extends DatepickerProps {
  name?: string;
  control: Control<any>;
  label?: string;
  caption?: string;
}

const i18n: I18nConfig = {
  dayNames: {
    short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    long: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
  },
  monthNames: {
    short: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    long: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  },
};

const localeDateService = new NativeDateService("pt", { i18n });

export default function DatePickerField({
  name,
  control,
  label,
  caption,
  min,
  ...rest
}: Props) {
  const { field, fieldState } = useController({ name, control });
  const { max } = rest;

  let date = field.value;

  // adiciona informações sobre timezone (T03:00:00.000Z) se não houver
  if (date) {
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(date)) {
      date = `${date}T03:00:00.000Z`;
    }

    date = new Date(date);
  }

  min ??= new Date("1900-01-01");

  const visibleDate = max ?? new Date();

  return (
    <FieldWrapper label={label} caption={caption} fieldState={fieldState}>
      {({ status }) => (
        <>
          <Datepicker
            status={status}
            date={date}
            onSelect={(nextDate) => {
              field.onChange(nextDate.toJSON());
            }}
            initialVisibleDate={visibleDate}
            min={min}
            max={visibleDate}
            dateService={localeDateService}
            {...rest}
          />
        </>
      )}
    </FieldWrapper>
  );
}
