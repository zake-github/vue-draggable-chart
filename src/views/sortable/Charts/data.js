const month = new Date().getMonth();
const months = Array.from({length: 13}).reduce((list, v, i) => {
    const j = month - i > 0 ? month - i : month - i + 12;
    list.push(j + '月');
    return list;
}, []);
const data = {
    pie: {
        PieChart: [
            {
                legendData: ['应用类故障'],
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '45%'],
                        labelLine: {
                            // show: false
                        },
                        data: [
                            {
                                name: '应用类故障',
                                value: 11
                            }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            {
                legendData: ['网络类故障', '应用类故障'],
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '45%'],
                        labelLine: {
                            // show: false
                        },
                        data: [
                            {
                                name: '网络类故障',
                                value: 1
                            },
                            {
                                name: '应用类故障',
                                value: 17
                            }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            {
                legendData: ['计划性维护', '第三方服务商原因'],
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '45%'],
                        labelLine: {
                            // show: false
                        },
                        data: [
                            {
                                name: '计划性维护',
                                value: 2
                            },
                            {
                                name: '第三方服务商原因',
                                value: 2
                            }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        ]
    },
    line: {
        LineChart: [
            {
                xAxisData: months,
                legendData: ['尊者', '行者', '网点管家'],
                series: [
                    {
                        'name': '尊者',
                        'stack': '尊者',
                        'symbol': 'rect',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [100, 100, 99.76, 88, 92, 100, 86, 95, 100, 86.7, 100, 100, 90]
                    },
                    {
                        'name': '行者',
                        'stack': '行者',
                        'symbol': 'diamond',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [100, 86, 95, 100, 86.7, 100, 100, 90, 100, 100, 99.76, 88, 92]
                    },
                    {
                        'name': '网点管家',
                        'stack': '网点管家',
                        'symbol': 'triangle',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [100, 99.35, 99.28, 100, 86, 95, 100, 86.7, 100, 100, 90, 100]
                    }
                ]
            },
            {
                xAxisData: months,
                legendData: ['异常总次数', '系统故障', '计划性维护'],
                series: [
                    {'name': '异常总次数',
                        'stack': '异常总次数',
                        'symbol': 'rect',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [0, 11, 11, 8, 0, 0, 6, 1, 3, 0, 2, 0, 4]
                    },
                    {'name': '系统故障',
                        'stack': '系统故障',
                        'symbol': 'diamond',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [0, 9, 11, 0, 6, 1, 3, 0, 11, 8, 2, 0, 4]
                    },
                    {
                        'name': '计划性维护',
                        'stack': '计划性维护',
                        'symbol': 'triangle',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [0, 2, 0, 11, 8, 0, 0, 6, 1, 3, 2, 0, 4]
                    }
                ]
            },
            {
                xAxisData: months,
                legendData: ['尊者', '行者', '网点管家'],
                series: [
                    {
                        'name': '尊者',
                        'stack': '尊者',
                        'symbol': 'rect',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [100, 100, 99.76, 98, 98.5, 100, 99, 90, 100, 89, 93, 84, 99]
                    },
                    {
                        'name': '行者',
                        'stack': '行者',
                        'symbol': 'diamond',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [93, 100, 99.81, 96, 100, 89, 93, 84, 100, 99.76, 98, 98.5, 100]
                    },
                    {
                        'name': '网点管家',
                        'stack': '网点管家',
                        'symbol': 'triangle',
                        'symbolSize': 12,
                        'type': 'line',
                        'data': [98, 99.35, 92.28, 100, 92.28, 89, 93, 84, 100, 99.76, 100, 93, 96]
                    }
                ]
            }
        ]
    },
    bar: {
        BarChart: [
            {
                xAxisData: months,
                series: [10, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 330, 220]
            },
            {
                xAxisData: months,
                series: [600, 100, 500, 450, 350, 550, 450, 600, 100, 500, 450, 350, 550, 450]
            },
            {
                xAxisData: months,
                series: [30, 20, 40, 45, 48, 50, 55, 20, 40, 45, 48, 50, 55]
            }
        ],
        BarChart3: [
            {
                dataset: {
                    dimensions: ['product', '2015', '2016', '2017'],
                    source: [
                        {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                        {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                        {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                        {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                    ]
                },
                series: [
                    {type: 'bar'},
                    {type: 'bar'},
                    {type: 'bar'}
                ]
            }
        ]
    }
};
export function getPie (chartType, type) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.pie[chartType][type]);
        }, 500);
    });
}
export function getLine (chartType, type) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.line[chartType][type]);
        }, 500);
    });
}
export function getBar (chartType, type) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.bar[chartType][type]);
        }, 500);
    });
}
export function getData (type, chartType, dataSource) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data[type][chartType][dataSource]);
        }, 500);
    });
}
