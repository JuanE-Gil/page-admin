import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
    {
      name: "Domingo",
      Anuncios: 4000,
      Comiciones: 2400,
      Donaciones: 2400,
    },
    {
      name: "Lunes",
      Anuncios: 3000,
      Comiciones: 1398,
      Donaciones: 2210,
    },
    {
      name: "Martes",
      Anuncios: 2000,
      Comiciones: 9800,
      Donaciones: 2290,
    },
    {
      name: "Miercoles",
      Anuncios: 2780,
      Comiciones: 3908,
      Donaciones: 2000,
    },
    {
      name: "Jueves",
      Anuncios: 1890,
      Comiciones: 4800,
      Donaciones: 2181,
    },
    {
      name: "Viernes",
      Anuncios: 2390,
      Comiciones: 3800,
      Donaciones: 2500,
    },
    {
      name: "Sabado",
      Anuncios: 3490,
      Comiciones: 4300,
      Donaciones: 2100,
    },
  ];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Análisis de ingresos</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Comiciones" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="Donaciones" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="Anuncios" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
