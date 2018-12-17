import { Bar, mixins } from 'vue-chartjs'

const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data: () => ({
      color: this.options
  }),
  props: ['options', 'colors'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
      console.log('From Bar', this.options);

    this.renderChart(this.chartData,this.options,{ responsive: true, maintainAspectRatio: false});
    // this.$data._chart.datasets[0]['colors'] = this.colors
    // Overriding some variables
    // this.renderChart({
    //   datasets: [
    //       {
    //           backgroundColor: this.colors,
    //           color: this.colors,
    //           borderWidth: 0,
    //       }
    //   ]},
    // )

  }
}
