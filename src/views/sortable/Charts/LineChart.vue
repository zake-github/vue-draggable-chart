<template>
  <div :id="id" :class="className" :style="{height:'100%',width:'100%'}" />
</template>

<script>
import echarts from 'echarts';
import resize from './mixins/resize';

export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        id: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '200px'
        },
        height: {
            type: String,
            default: '200px'
        },
        title: {
            type: String,
            default: ''
        },
        optionsData: {
            type: Object,
            default: () => { return {}; }
        }
    },
    watch: {
        optionsData (val) {
            const option = this.chart.getOption();
            option.xAxis[0].data = this.optionsData.xAxisData;
            option.legend[0].data = this.optionsData.legendData;
            option.series = this.optionsData.series;
            this.chart.setOption(option);
        }
    },
    data () {
        return {
            chart: null
        };
    },
    mounted () {
        this.initChart();
        console.log(this.optionsData);
    },
    beforeDestroy () {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart () {
            this.chart = echarts.init(document.getElementById(this.id));
            this.chart.setOption({
                title: {
                    text: this.title,
                    textStyle: {
                        color: '#909399'
                    },
                    left: '40',
                    top: '10'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: []
            });
        }
    }
};
</script>
