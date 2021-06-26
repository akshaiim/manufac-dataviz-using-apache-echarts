import React from "react";
import ReactECharts from "echarts-for-react";

const Chart = ({ data }) => {
  const alcohol = [];
  const malicAcid = [];
  const Hue = [];
  const colorIntensity = [];

  data.forEach((item) => {
    const val = item.split(",");

    alcohol.push(val[1]);
    malicAcid.push(val[2]);
    colorIntensity.push(val[10]);
    Hue.push(val[11]);
  });

  const class1MalicAcid = malicAcid.slice(0, 59);
  const class2MalicAcid = malicAcid.slice(59, 130);
  const class3MalicAcid = malicAcid.slice(130);

  // getting average of all 3 class of malic acids by adding and then dividing it by number of values belonging to that class and later pushing it into the array for plotting

  const class1average = [];
  class1MalicAcid.forEach((item) => class1average.push(+item));
  const Average1 = (class1average.reduce((a, b) => a + b, 0) / 59).toFixed(2);

  const class2average = [];
  class2MalicAcid.forEach((item) => class2average.push(+item));
  const Average2 = (class2average.reduce((a, b) => a + b, 0) / 71).toFixed(2);

  const class3average = [];
  class3MalicAcid.forEach((item) => class3average.push(+item));
  const Average3 = (class3average.reduce((a, b) => a + b, 0) / 48).toFixed(2);

  for (var i = 0; i <= 59; i++) {
    malicAcid[i] = Average1;
  }
  for (var j = 60; j <= 130; j++) {
    malicAcid[j] = Average2;
  }
  for (var k = 130; k < malicAcid.length; k++) {
    malicAcid[k] = Average3;
  }

  // data to be passed to the echarts components for bar chart

  const barChartOptions = {
    xAxis: {
      type: "category",
      name: "alcohol",
      data: alcohol,
    },
    yAxis: {
      type: "value",
      name: "class average of malic acid",
    },
    series: [
      {
        data: malicAcid,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
    color: "#fc8452",
  };

  // converting data in to the required format for the plotting of scattered plot chart

  const scatterPlotData = [];

  for (var n = 0; n < Hue.length; n++) {
    scatterPlotData.push([colorIntensity[n], Hue[n]]);
  }

  const scatteredPlotOptions = {
    xAxis: { name: "Color intensity" },
    yAxis: { name: "Hue" },
    series: [
      {
        symbolSize: 13,
        data: scatterPlotData,

        type: "scatter",
      },
    ],
    color: "#fc8452",
  };

  return (
    <>
      <ReactECharts option={barChartOptions} />
      <h4>Bar Chart b/w alcohol and class average of malic acid</h4>

      <ReactECharts option={scatteredPlotOptions} />
      <h4>scattered plot b/w color Intensity and hue</h4>
    </>
  );
};

export default Chart;


// Class,Alcohol,Malic acid,Ash,Alcalinity of ash,Magnesium.Total phenols,Flavanoids,Nonflavanoid phenols,Proanthocyanins,Color intensity,Hue,OD280/OD315 of diluted wines,Proline
