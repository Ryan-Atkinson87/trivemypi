//import CpuStatsGraph from "./cpuStatsGraph";
import PiStatsTable from "./PiStatsTable";
import './PiStats.css';



function PiStats() {

  

  return (
    <div className="PiStats">
        <h1>Welcome to the Pi Stats page</h1>
        <PiStatsTable />
        {/*<CpuStatsGraph />*/}
    </div>
  );
}

export default PiStats;