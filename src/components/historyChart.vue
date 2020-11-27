<template>
  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import currency from "../filters/filter.currency";
export default {
  name: "historyChart",
  extends: Doughnut,
  props: ["records"],
  watch: {
    records: {
      immediate: true,
      handler(records) {
        this.setChartData(records);
      }
    }
  },
  mounted() {
    this.setChartData(this.records);
  },
  methods: {
    setChartData(records) {
      const labels = records.map(record => record.description);
      const datasetData = records.map(record => record.amount);
      this.renderChart(
        {
          labels: labels,
          datasets: [
            {
              label: "# of Votes",
              data: datasetData,
              borderWidth: 2,
              backgroundColor: [
                "rgba(128, 0, 4, 0.9)",
                "rgba(174, 4, 200,0.9)",
                "rgba(61, 0, 87, 0.9)",
                "rgba(56, 136, 255, 0.9)",
                "rgba(56, 255, 159, 0.9)",
                "rgba(186, 214, 0, 0.9)",
                "rgba(120, 194, 0, 0.9)",
                "rgba(3, 194, 0, 0.9)",
                "rgba(0, 230, 119, 0.9)",
                "rgba(56, 255, 248, 0.9)",
                "rgba(99, 56, 255, 0.9)",
                "rgba(185, 56, 255, 0.9)",
                "rgba(255, 51, 58, 0.9)",
                "rgba(214, 96, 0, 0,9)",
                "rgba(255, 82, 51,0,9)",
                "rgba(194, 29, 0,0,9",
                "rgba(93, 114, 198,0,9)  ",
                "rgba(194, 61, 0,0,9)  ",
                "rgba(102, 255, 173,0,9)  ",
                "rgba(255, 102, 143,0,9)  ",
                "rgba(214, 146, 0,0,9)  ",
                "rgba(214, 189, 0,0,9)   "
              ]
            }
          ]
        },
        {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                const tooltipLabel =
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ];
                return currency(tooltipLabel);
              }
            }
          }
        }
      );
    }
  }
};
</script>

<style></style>
