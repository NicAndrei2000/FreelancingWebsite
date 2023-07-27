import React, { PureComponent, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./TopTeam.module.css";
import axios from "axios";

function TopTeam() {
  const [team, setTeam] = useState(null);
  const [nrEchipe, setNrEchipe] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/echipe/primeleCinciEchipe")
      .then((res) => {
        setTeam(res.data.echipeWithPercentage);
        setNrEchipe(res.data.nrEchipe);
      })
      .catch((err) => console.log(err + "Greseala"));
  }, []);

  let data;
  // for(int i=0;i<team.length;i++)
  if (team != null && nrEchipe === 5) {
    data = [
      { name: team[0].numeEchipa, value: team[0].percentage },
      { name: team[1].numeEchipa, value: team[1].percentage },
      { name: team[2].numeEchipa, value: team[2].percentage },
      { name: team[3].numeEchipa, value: team[3].percentage },
      { name: team[4].numeEchipa, value: team[4].percentage },
    ];
  } else if (team != null && nrEchipe > 5) {
    const sumPercentage = Object.values(team).reduce(
      (acc, { percentage }) => acc + percentage,
      0
    );
    console.log("Mititei4");
    console.log(sumPercentage);
    data = [
      { name: team[0].numeEchipa, value: team[0].percentage },
      { name: team[1].numeEchipa, value: team[1].percentage },
      { name: team[2].numeEchipa, value: team[2].percentage },
      { name: team[3].numeEchipa, value: team[3].percentage },
      { name: team[4].numeEchipa, value: team[4].percentage },
      { name: "Others", value: 100 - sumPercentage },
    ];
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#008B8B",
    "#8040e0",
  ];
  const RADIAN = Math.PI / 180;
  //   const percent=null;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x} // x-coordinate for the text
        y={y} // y-coordinate for the text
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  return team !== null && nrEchipe >= 5 ? (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Percentage distribution of projects carried out by teams
      </h1>
      <PieChart width={1400} height={700}>
        <Pie
          data={data}
          cx={700}
          cy={340}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={250}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value) =>
            `${value} - ${(
              data.find((entry) => entry.name === value)?.value
            )?.toFixed(2)}%`
          }
          payload={data.map((entry, index) => ({
            value: entry.name,
            color: COLORS[index % COLORS.length],
          }))}
          wrapperStyle={{
            padding: "5px",
            background: "#f8f9ff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
          }}

        />
      </PieChart>
      <p className={styles.parag}>
        In the graph above the performance indicator for the 5 most active
        existing teams has been calculated. This percentage was calculated based
        on the number of projects completed by each team in relation to the
        total number of projects. In "Others" is represented the sum of projects
        completed by the other teams.
      </p>
    </div>
  ) : (
    <div className={styles.page}>
      <p>Unfortunately there are too few teams!</p>
    </div>
  );
}

export default TopTeam;
