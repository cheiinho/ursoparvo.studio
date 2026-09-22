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
    <div className="intraday-insights">
      <dl className="pfacts">
        {account ? (
          <div>
            <dt>Account</dt>
            <dd>{account}</dd>
          </div>
        ) : null}
        {queue ? (
          <div>
            <dt>Queue</dt>
            <dd>{queue}</dd>
          </div>
        ) : null}
        {dateLabel ? (
          <div>
            <dt>Day</dt>
            <dd>
              {dateLabel}
              {timeZone ? `. ${timeZone}` : ""}
            </dd>
          </div>
        ) : null}
      </dl>
      <div className="intraday-insights__empty">
        {illustrative ? <p className="intraday-kicker">{illustrative}</p> : null}
        <p className="intraday-insights__text">{text}</p>
      </div>
    </div>
  );
}
