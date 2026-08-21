"use client";

import type { OptionCopy } from "@/content/project-flow/types";

type OptionCardProps = {
  option: OptionCopy;
  selected: boolean;
  multiple?: boolean;
  name: string;
  onChange: (id: string, checked: boolean) => void;
};

export function OptionCard({ option, selected, multiple = false, name, onChange }: OptionCardProps) {
  return (
    <label className={`option${selected ? " option--selected" : ""}`}>
      <input
        type={multiple ? "checkbox" : "radio"}
        name={name}
        value={option.id}
        checked={selected}
        onChange={(event) => onChange(option.id, event.target.checked)}
      />
      <span className="option__body">
        <span className="option__title type-corpo">{option.label}</span>
        {option.description ? (
          <span className="option__description type-corpo text-secondary">
            {option.description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

type OptionListProps = {
  legend: string;
  describedBy?: string;
  children: React.ReactNode;
};

export function OptionList({ legend, describedBy, children }: OptionListProps) {
  return (
    <fieldset className="option-list" aria-describedby={describedBy}>
      <legend className="sr-only">{legend}</legend>
      {children}
    </fieldset>
  );
}

type SingleSelectProps = {
  name: string;
  legend: string;
  describedBy?: string;
  options: OptionCopy[];
  value: string | null | undefined;
  onChange: (id: string) => void;
};

export function SingleSelect({
  name,
  legend,
  describedBy,
  options,
  value,
  onChange,
}: SingleSelectProps) {
  return (
    <OptionList legend={legend} describedBy={describedBy}>
      {options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          name={name}
          selected={value === option.id}
          onChange={(id) => onChange(id)}
        />
      ))}
    </OptionList>
  );
}

type MultiSelectProps = {
  name: string;
  legend: string;
  describedBy?: string;
  options: OptionCopy[];
  value: readonly string[];
  onChange: (next: string[]) => void;
};

export function MultiSelect({
  name,
  legend,
  describedBy,
  options,
  value,
  onChange,
}: MultiSelectProps) {
  const selected = new Set(value);

  function toggle(id: string, checked: boolean) {
    const next = new Set(selected);
    if (checked) next.add(id);
    else next.delete(id);
    onChange(options.map((option) => option.id).filter((item) => next.has(item)));
  }

  return (
    <OptionList legend={legend} describedBy={describedBy}>
      {options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          name={name}
          multiple
          selected={selected.has(option.id)}
          onChange={toggle}
        />
      ))}
    </OptionList>
  );
}

type GroupedMultiSelectProps = {
  name: string;
  legend: string;
  describedBy?: string;
  groups: { id: string; label: string; options: OptionCopy[] }[];
  value: readonly string[];
  onChange: (next: string[]) => void;
};

export function GroupedMultiSelect({
  name,
  legend,
  describedBy,
  groups,
  value,
  onChange,
}: GroupedMultiSelectProps) {
  const selected = new Set(value);
  const allOptions = groups.flatMap((group) => group.options);

  function toggle(id: string, checked: boolean) {
    const next = new Set(selected);
    if (checked) next.add(id);
    else next.delete(id);
    onChange(allOptions.map((option) => option.id).filter((item) => next.has(item)));
  }

  return (
    <div className="option-groups">
      {groups.map((group) => (
        <fieldset key={group.id} className="option-group" aria-describedby={describedBy}>
          <legend className="option-group__title type-nota">{group.label}</legend>
          {group.options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              name={name}
              multiple
              selected={selected.has(option.id)}
              onChange={toggle}
            />
          ))}
        </fieldset>
      ))}
      <span className="sr-only">{legend}</span>
    </div>
  );
}

export function BudgetSelector(props: SingleSelectProps) {
  return <SingleSelect {...props} />;
}

export function SpecialistSelector(props: MultiSelectProps) {
  return <MultiSelect {...props} />;
}
