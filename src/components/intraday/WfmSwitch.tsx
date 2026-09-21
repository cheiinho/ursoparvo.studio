type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  describedBy?: string;
  labelledBy?: string;
};

export default function WfmSwitch({ checked, onChange, label, describedBy, labelledBy }: Props) {
  return (
    <button
      type="button"
      role="switch"
      className={`wfm-switch${checked ? " is-on" : ""}`}
      aria-checked={checked}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      onClick={() => onChange(!checked)}
    >
      <span className="wfm-switch__track" aria-hidden="true">
        <span className="wfm-switch__thumb" />
      </span>
      {labelledBy ? null : <span>{label}</span>}
    </button>
  );
}
