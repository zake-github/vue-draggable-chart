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
            // const option = this.chart.getOption(this.option);
            this.option = Object.assign(this.option, val);
            this.chart.setOption(this.option);
        }
    },
    data () {
        return {
            chart: undefined,
            option: undefined
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
            const option = {
                title: {
                    text: this.title,
                    textStyle: {
                        color: '#909399'
                    },
                    left: '40',
                    top: '10'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: {
                },
                dataset: {},
                series: []
            };
            this.option = option;
            this.chart.setOption(option);
        }
    }
};
</script>
