import React from "react";
import ReactECharts from "echarts-for-react";

const Chart = ({ data}: any) => {
  const alcohol : (string|number)[] = [];
  const malicAcid : (string|number)[] = [];
  const Hue : (string|number)[] = [];
  const colorIntensity : (string|number)[] = [];

  data.forEach((item : string) => {
    const val = item.split(",");

    alcohol.push(val[1]);
    malicAcid.push(val[2]);
    colorIntensity.push(val[10]);
    Hue.push(val[11]);
  });


  // getting values of alcohol and malic acids corresponding to each class

  const class1MalicAcid = malicAcid.slice(0, 59);
  const class2MalicAcid = malicAcid.slice(59, 130);
  const class3MalicAcid = malicAcid.slice(130);

  const class1Alcohol = alcohol.slice(0, 59);
  const class2Alcohol = alcohol.slice(59, 130);
  const class3Alcohol = alcohol.slice(130);
  

  // getting average of all 3 class of malic acids and alcohol by adding and then dividing it by number of specimens belonging to that class and later pushing it into the array for plotting

  const class1Malicaverage : (string|number)[] = [];
  class1MalicAcid.forEach((item : any) => class1Malicaverage.push(+item));
  const Averageclass1Malic = (class1Malicaverage.reduce((a : any, b : any) => a + b, 0) / 59).toFixed(2);

  const class2Malicaverage : (string|number)[] = [];
  class2MalicAcid.forEach((item : any) => class2Malicaverage.push(+item));
  const Averageclass2Malic = (class2Malicaverage.reduce((a: any, b : any) => a + b, 0) / 71).toFixed(2);

  const class3Malicaverage : (string|number)[] = [];
  class3MalicAcid.forEach((item : any) => class3Malicaverage.push(+item));
  const Averageclass3Malic = (class3Malicaverage.reduce((a : any, b : any) => a + b, 0) / 48).toFixed(2);


  const class1Alcoholaverage : (string|number)[] = [];
  class1Alcohol.forEach((item : any) => class1Alcoholaverage.push(+item));
  const Averageclass1Alcohol = (class1Alcoholaverage.reduce((a : any, b : any) => a + b, 0) / 59).toFixed(2);

  const class2Alcoholaverage : (string|number)[] = [];
  class2Alcohol.forEach((item : any) => class2Alcoholaverage.push(+item));
  const Averageclass2Alcohol = (class2Alcoholaverage.reduce((a: any, b : any) => a + b, 0) / 71).toFixed(2);

  const class3Alcoholaverage : (string|number)[] = [];
  class3Alcohol.forEach((item : any) => class3Alcoholaverage.push(+item));
  const Averageclass3Alcohol = (class3Alcoholaverage.reduce((a : any, b : any) => a + b, 0) / 48).toFixed(2);

  // for (var i = 0; i <= 59; i++) {
  //   malicAcid[i] = Average1;
  // }
  // for (var j = 60; j <= 130; j++) {
  //   malicAcid[j] = Average2;
  // }
  // for (var k = 130; k < malicAcid.length; k++) {
  //   malicAcid[k] = Average3;
  // }

  // data to be passed to the echarts components for bar chart


  const barChartOptions = {
    xAxis: {
      type: "category",
      name: "alcohol",
      data: [Averageclass1Alcohol,Averageclass2Alcohol,Averageclass3Alcohol],
    },
    yAxis: {
      type: "value",
      name: "class average of malic acid",
    },
    series: [
      {
        data: [Averageclass1Malic,Averageclass2Malic,Averageclass3Malic],
        type: "bar",
        showBackground: true,
        smooth: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
    color: "#fc8452",
    tooltip: {
      trigger: "axis",
    },
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
        smooth: true,
      },
    ],
    color: "#fc8452",
    tooltip: {
      trigger: "axis",
    }
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
