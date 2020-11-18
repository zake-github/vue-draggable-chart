// 所有示例图
const BarChart = require('./assets/BarChart.png');
const BarChart1 = require('./assets/BarChart1.png');
const BarChart3 = require('./assets/BarChart3.png');
const PieChart = require('./assets/PieChart.png');
const LineChart = require('./assets/LineChart.png');
// 所有示例图集合
const bgList = {
    BarChart,
    BarChart1,
    BarChart3,
    PieChart,
    LineChart
};

const barDemo = [
    {
        label: '柱状图示例1',
        id: 'BarChart',
        example: BarChart
    },
    {
        label: '柱状图示例2',
        id: 'BarChart1',
        example: BarChart1
    },
    {
        label: '柱状图示例3',
        id: 'BarChart3',
        example: BarChart3
    }
]; // chart示例图
// 各chart数据源选项 (与barDemo id 对应 id与真实chart组件对应)
const BarChartData = [
    {
        label: 'BarChart数据源1',
        id: 0
    },
    {
        label: 'BarChart数据源2',
        id: 1
    },
    {
        label: 'BarChart数据源3',
        id: 2
    }
];
const BarChart1Data = [
    {
        label: 'BarChart1数据源1',
        id: 0
    },
    {
        label: 'BarChart1数据源2',
        id: 1
    },
    {
        label: 'BarChart1数据源3',
        id: 2
    }
];
const BarChart3Data = [
    {
        label: 'BarChart3数据源1',
        id: 0
    },
    {
        label: 'BarChart3数据源2',
        id: 1
    },
    {
        label: 'BarChart3数据源3',
        id: 2
    }
];

const pieDemo = [
    {
        label: '饼图示例1',
        id: 'PieChart',
        example: PieChart
    }
]; // chart示例图
const PieChartData = [
    {
        label: '数据源pie1',
        id: 0
    },
    {
        label: '数据源pie2',
        id: 1
    },
    {
        label: '数据源pie3',
        id: 2
    }
];

const lineDemo = [
    {
        label: '折线图示例1',
        id: 'LineChart',
        example: LineChart
    }
]; // chart示例图
const LineChartData = [
    {
        label: '数据源line1',
        id: 0
    },
    {
        label: '数据源line2',
        id: 1
    },
    {
        label: '数据源line3',
        id: 2
    }
];
export default {
    charts: {
        bar: {
            bgItem: barDemo,
            BarChart: BarChartData,
            BarChart1: BarChart1Data,
            BarChart3: BarChart3Data
        },
        pie: {
            bgItem: pieDemo,
            PieChart: PieChartData
        },
        line: {
            bgItem: lineDemo,
            LineChart: LineChartData
        }
    },
    bgList
};
