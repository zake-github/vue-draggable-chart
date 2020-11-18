<template>
<div class="wrapper">
  <div class="content">
    <div class="row" v-for="(row, index) in config" :key="index" :style="{ heigth: `${row.height}px`}">
      <div class="chart-item" v-for="(item, idx) in row.children" :key="idx" :style="{width: `${item.widthPer}%`}" :id="`chart_id_${item.type}${index}${idx}`">
        <component :is="`${item.chartType}`" :id="`chart${item.type}${index}${idx}`" :title="item.title" :optionsData="item.optionsData" :width="`${item.width}px`" :height="`${row.height}px`"></component>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BarChart from './Charts/BarChart';
import BarChart3 from './Charts/BarChart3';
import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import * as $utils from '@/utils';
import { getPie, getLine, getBar, getData} from './Charts/data.js';
export default {
    components: {PieChart, BarChart, LineChart, BarChart3},
    data () {
        return {
            config: undefined
        };
    },
    mounted () {
        this.init();
    },
    methods: {
        async getData (item, index, idx) {
            let data = await getData(item.type, item.chartType, item.dataSource);
            let config = $utils.deepClone(this.config);
            item.optionsData = data;
            config[index].children[idx] = item;
            this.config = config;
        },
        getSize () {
            this.$nextTick(() => {
                this.config = this.config.reduce((list, row, index) => {
                    row.children = row.children.reduce((children, item, idx) => {
                        const width = document.getElementById(`chart_id_${item.type}${index}${idx}`).clientWidth;
                        item.width = width;
                        children.push(item);
                        return children;
                    }, []);
                    list.push(row);
                    return list;
                }, []);
            });
        },
        init () {
            const id = this.$route.params.id;
            if (!id) return;
            const res = JSON.parse(sessionStorage.getItem(`config${id}`));
            this.config = res;
            res.map((v, index) => {
                v.children.map((item, idx) => {
                    this.getData({...item}, index, idx);
                });
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  .content {
    .row {
      display: flex;
      min-width: 600px;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      .chart-item {
        margin: 5px;
        border: 1px solid #e3f4ff;
        min-width: 300px;
        min-height: 400px;
      }
    }
  }
}
</style>
