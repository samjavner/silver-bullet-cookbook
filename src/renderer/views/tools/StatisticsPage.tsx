import * as React from "react";
import { Statistics } from "../../core/tools/statistics";

export const StatisticsPage: React.FunctionComponent<
    Statistics
> = statistics => (
    <div>
        <button className="button" onClick={statistics.roll}>
            {statistics.dieFace}
        </button>
    </div>
);

export default StatisticsPage;
