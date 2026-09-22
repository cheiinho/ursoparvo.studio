import { dataset } from "@/content/intraday/dataset";
import DataTable from "./DataTable";
import ForecastChart from "./ForecastChart";
import ProductChrome, { PRODUCT_PLACES } from "./ProductChrome";

type Props = {
  product: string;
  reconstruction: string;
  illustrative: string;
  forecast: string;
  contacts: string;
  time: string;
  summary: string;
  chartTitle: string;
};

export default function ForecastBoard({
  product,
  reconstruction,
  illustrative,
  forecast,
  contacts,
  time,
  summary,
  chartTitle,
}: Props) {
  const points = dataset.quarters.map((quarter) => ({ time: quarter.time, value: quarter.previous }));
  const total = points.reduce((sum, point) => sum + (point.value ?? 0), 0);

  return (
    <div className="intraday-ui wfm">
      <p className="intraday-recon">{reconstruction}</p>
      <ProductChrome
        product={product}
        section="Forecast"
        context={dataset.account}
        rail={PRODUCT_PLACES.map((item) => ({ ...item, current: item.id === "forecast" }))}
      >
        <header className="wfm-pagehead">
          <div>
            <p className="wfm-title">Forecast</p>
            <p className="wfm-meta">
              {chartTitle} {illustrative}. {dataset.timeZone}
            </p>
          </div>
          <div className="wfm-scope" aria-hidden="true">
            <span className="wfm-scope__date">{dataset.dateLabel}</span>
            <span className="is-on">Today</span>
            <span>Week</span>
          </div>
          <div className="wfm-queues">
            <span className="is-on">{dataset.queue}</span>
            <span>{dataset.contrastQueue}</span>
          </div>
        </header>
        <div className="wfm-forecast">
          <div className="wfm-toolbar">
            <div className="wfm-series" aria-hidden="true">
              <span className="is-on">Contact volume offered</span>
              <span>Handle time</span>
              <span>Staff</span>
            </div>
            <div className="wfm-metric" aria-hidden="true">
              <p>{forecast}</p>
              <p>
                <strong>{total.toLocaleString("en-GB")}</strong>
                <span>{contacts}</span>
              </p>
            </div>
          </div>
          <ForecastChart
            patternId="plan-board"
            axis={points.map((point) => point.time)}
            series={[{ id: "previous", label: forecast, style: "solid", weight: "strong", points }]}
            tone="paper"
            yLabel={contacts}
          />
          <DataTable
            caption={summary}
            columns={[time, forecast]}
            rows={dataset.quarters.map((quarter) => [quarter.time, String(quarter.previous)])}
          />
        </div>
      </ProductChrome>
    </div>
  );
}
