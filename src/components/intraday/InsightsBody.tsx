type Props = {
  text: string;
  illustrative?: string;
  account?: string;
  queue?: string;
  dateLabel?: string;
  timeZone?: string;
};

export default function InsightsBody({ text, illustrative, account, queue, dateLabel, timeZone }: Props) {
  return (
    <div className="intraday-insights wfm-note">
      {illustrative ? <p className="intraday-kicker">{illustrative}</p> : null}
      {account ? <p className="intraday-contextline">{account}</p> : null}
      {dateLabel ? (
        <p className="intraday-contextline">
          {dateLabel}
          {timeZone ? `. ${timeZone}` : ""}
        </p>
      ) : null}
      {queue ? <p className="intraday-contextline">{queue}</p> : null}
      <p className="intraday-insights__text">{text}</p>
    </div>
  );
}
