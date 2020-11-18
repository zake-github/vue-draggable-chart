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
                    left: 'center',
                    top: '10'
                },
                grid: {
                    top: 50,
                    left: 50,
                    right: 50,
                    bottom: 50
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left: 'center',
                    bottom: '20',
                    data: []
                },
                series: []
            });
        }
    }
};
</script>
