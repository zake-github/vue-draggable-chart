<template>
  <div class="wrapper">
    <!-- 顶部 fix dom  chart配置-->
    <div class="sort-wrapper">
      <div>
        <div class="trigger-wrapper" @click="triggerElements = !triggerElements"><i class="el-icon-s-fold"></i></div>
        <div class="btn-wrapper">
          <el-button @click="preview">预览</el-button>
        </div>
        <!-- chart组件库dom -->
        <transition name="el-zoom-in-top">
          <div class="sort-content" v-show="triggerElements">
            <transition-group style="display: flex;">
              <draggable
                :list="rowList3"
                class="element-wrapper"
                key="containerWrapper"
                :disabled="isDrag"
                :group="{ name: 'container', pull: 'clone', put: false}"
              >
                <div
                  v-for="(row, index) in rowList3"
                  :key="`elementItem${index}`"
                  :id="row.type"
                  class="element-item"
                >
                  {{row.title}}
                </div>
              </draggable>
              <draggable
                v-model="rowList2"
                class="element-wrapper"
                key="elementWrapper"
                id="elementWrapper"
                :disabled="isDrag"
                :move="addElement"
                animation="300"
                :group="{ name: 'elementItem', pull: 'clone', put: false}"
              >
                  <div
                    v-for="(row, index) in rowList2"
                    :key="`elementItem${index}`"
                    :id="row.type"
                    class="element-item"
                  >
                    <img :src="bgList[row.chartType]" width="100%" height="100%"/>
                  </div>
              </draggable>
            </transition-group>
          </div>
        </transition>
      </div>
    </div>
    <!-- content -->
    <div>
      <div>
        <div style="height: 50px"></div>
        <transition name="el-zoom-in-top">
          <div style="height: 110px" v-show="triggerElements"></div>
        </transition>
      </div>
      <!-- 行drag -->
      <transition-group>
        <draggable
          v-model="rowList"
          :group="{ name: 'container'}"
          class="content-wrapper"
          id="contentWrapper"
          key="contentWrapper"
          :disabled="isDrag"
          animation="300"
          handle=".handle"
          @add="addRow"
        >
          <!-- 行 -->
            <div
              v-for="(row, index) in rowList"
              :key="`contentContainer${index}`"
              class="content-container"
              :style="{height: `${row.height}px`}"
              :ref="`contentContainer${index}`"
            >
              <i class="el-icon-s-unfold handle"></i>
              <i @click.stop="delContent(index, null)" class="content-container-close el-icon-circle-close"></i>
              <div
                @mousedown.stop="moveContainer($event, index)"
                @mouseenter="isDragContainer = true"
                @mouseout="isDragContainer = false"
                class="content-container-move"
                ></div>
              <!-- chart drag -->
              <draggable
                v-model="row.children"
                :group="{ name: 'elementItem'}"
                class="content-row"
                :id="`contentRow${index}`"
                :key="`contentRow${index}`"
                :disabled="isDrag"
                animation="300"
                :move="addElementItem"
                @add="addElementItem1"
                @remove="addElementItem1"
              >
                  <div
                    v-for="(item, idx) in row.children"
                    @click="handleItem(item)"
                    :key="`contentItem${index}${idx}`"
                    :id="`contentItem${index}${idx}`"
                    class="content-item"
                    :style="{width: `${item.width}px`, 'min-width': `${minItemWidth}px`}"
                  >
                    <!-- :style="{width: `${row.widths[idx] - (row.widths[idx - 1] || 0)}px`}" -->
                    <!-- :style="{width: `calc(${item.width}% - 10px)`}" -->
                    <!-- <component
                      :is="item.component"
                      :id="`contentItem${index}${idx}`"
                      :option="item.option"
                      :width='`${item.width}px`'
                      :title="item.title"
                      :key="`${item.width}`"
                      :height="`${row.height - 10}px`"
                      ></component> -->
                    <img :src="bgList[item.chartType]" width="100%" height="100%"/>
                    <i @click.stop="delContent(index, idx)" class="content-item-close el-icon-circle-close"></i>
                    <div v-if="idx !== row.children.length - 1"
                      @mouseenter="isDragItem = true"
                      @mouseout="isDragItem = false"
                      @mousedown.stop="moveContentItem($event, index, idx)"
                      class="content-item-move"
                    ></div>
                    <!-- <i class="item-handle el-icon-rank"></i> -->
                  </div>
              </draggable>
            </div>
        </draggable>
      </transition-group>
    </div>
    <!-- moving 背景板 -->
    <div class="bg" v-show="isMove" id="bg" tabindex="0" contenteditable="true" :style="{cursor: this.movingItem ? 'ew-resize' : 'ns-resize'}"></div>
    <el-drawer
      :title="itemConfig.title"
      :visible.sync="drawer"
      :show-close="true"
      :with-header="false"
      size="500px"
      :before-close="handleClose">
      <!-- chart参数配置（数据源、格式） -->
      <div class="config-wrapper" ref="configWrapper" v-if="itemConfig.type">
        <div class="title">图形设置</div>
        <el-form class="config-content">
          <el-form-item label="图形标题" label-width="70px">
            <el-input v-model="itemConfig.title" style="width: calc(100% - 100)">
            </el-input>
          </el-form-item>
          <el-form-item label="数据源" label-width="70px">
            <el-select v-model="itemConfig.dataSource" style="width: calc(100% - 100)">
              <el-option v-for="i in charts[itemConfig.type][itemConfig.chartType]" :label="i.label" :value="i.id" :key="`__${i.id}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图形示例" label-width="70px">
            <div class="imgDemo-wrapper">
              <div v-for="(i, j) in charts[itemConfig.type].bgItem" :key="j">
                <img :src="i.example" alt="" width="100%" height="100%">
                <el-radio v-model="itemConfig.chartType" :label="i.id">{{i.label}}</el-radio>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import * as $utils from '@/utils';
import tools from './tools.js'; // 常量 包含示例图 示例图对应的的数据源等
const minItemWidth = 300; // 每个chart最小宽度
const minHeight = 400; // 每行最小高度
const maxRowCount = 3; // 每行chart最大数量
const marginCount = 3; // chart左右外边距尺寸 计算chart宽度及宽度占比
export default {
    components: {
        draggable
    },
    data () {
        return {
            rowList3: [ // 图表示例ku
                {
                    type: 'container',
                    title: '添加一行',
                    height: minHeight,
                    children: []
                }
            ],
            rowList2: [ // 图表示例库
                {
                    title: '饼图',
                    type: 'pie',
                    width: minItemWidth,
                    optionsData: undefined,
                    dataSource: 0,
                    chartType: 'PieChart'
                },
                {
                    title: '柱状图',
                    type: 'bar',
                    width: minItemWidth,
                    optionsData: undefined,
                    dataSource: 0,
                    chartType: 'BarChart'
                },
                {
                    title: '折线图',
                    type: 'line',
                    width: minItemWidth,
                    optionsData: undefined,
                    dataSource: 0,
                    chartType: 'LineChart'
                }
            ],
            // 当前自定义图表数据
            rowList: [],
            movingContainer: false, // 行高拖动状态
            movingItem: false, // 行内chart拖动状态
            itemConfig: { // chart配置项
                title: undefined, // 图表名称
                type: undefined, // 图表类型
                width: minItemWidth, // 图表宽度
                dataSource: undefined, // chart数据源
                chartType: undefined // chart UI类型
            },
            drawer: false, // chart配置抽屉visible
            triggerElements: true, // chart库visible
            isDragItem: false, // 行内chart（chart宽度）拖动条enter/out 控制drag的disable 兼容firefox 点击拖动条后控制遮罩层显示 遮罩层未自动获取焦点 各种focus问题及触发drag的start
            isDragContainer: false, // 行（行高）拖动条enter/out 控制drag的disable
            rowIndex: undefined, // 行内chart进入拖动状态 记录行下标 拖动结束
            id: 1,
            minItemWidth,
            ...Object.freeze(tools)
        };
    },
    computed: {
        isMove () { // 拖动改变行高或者chart宽度状态(行尾(下方) 或 chart尾(右方) 拖动条点击触发) 显示背景防触发hover foucs等
            return this.movingContainer || this.movingItem;
        },
        isDrag () {
            // 禁用drag (行尾(下方) 或 chart尾(右方) 拖动条hover触发提前把drag禁用
            // 兼容firefox firefox下点击拖动条时点击事件触发函数内部再去改变状态显示遮罩层
            // 页面dom未blur 仍会触发drag事件 遮罩层失效)
            return this.isDragContainer || this.isDragItem;
        }
    },
    mounted () {
        document.onmouseup = this.moveContainerEnd; // 全局监听移除拖动中状态 mouseup后还原 moving状态控制 遮罩层控制状态等的数据

        const onselectstart = document.onselectstart; // 全局选中默认操作保存
        const ondrop = document.ondrop; // 全局拖动默认操作保存

        document.onselectstart = function (event) { // 全局取消选中状态
            event.returnValue = false;
        };
        // 判断 firefox 浏览器
        const userAgent = navigator.userAgent.indexOf('Firefox') > -1;
        if (userAgent) {
            document.body.ondrop = function (event) {
                event.preventDefault();

                event.stopPropagation(); // 阻止冒泡 firefox下text是文本会打开新标签页
            };
        }

        const resizeHandler = $utils.debounce(() => {
            this.resizeAll();
        }, 100);
        window.addEventListener('resize', resizeHandler);

        this.$once('hook:beforeDestroy', () => {
            document.onselectstart = onselectstart; // 还原默认操作(选中)
            document.body.ondrop = ondrop;// 还原默认操作(拖动)
            document.onmouseup = null;
            window.removeEventListener('resize', resizeHandler);
        });
    },
    methods: {
        preview () { // 预览
            const rowList = this.calcAllChartItemWidth(); // 计算所有chart对应宽度占比(搂底用 窗口缩小可能导致百分比失真 chart宽度改变(默认计算、自定义拖动改变操作触发后会计算))
            sessionStorage.setItem(`config${++this.id}`, JSON.stringify(rowList));
            let routeData = this.$router.resolve({
                name: 'vueDraggerContent',
                params: {id: this.id}
            });
            window.open(routeData.href, '_blank');
        },
        handleItem (item) { // 单个chart配置项抽屉
            this.itemConfig = item;
            this.drawer = true;
        },
        handleClose () { // 抽屉关闭
            this.drawer = false;
        },
        delContent (index, idx) { // 删除元素（一行或者一个chart）
            if (idx !== null) {
                this.rowList[index].children.splice(idx, 1);
                this.initChartItemWidth(index);
            } else {
                this.rowList.splice(index, 1);
            }
        },
        moveContainer ($evt, index) { // 调整行高
            this.movingContainer = true; // 遮罩层控制显示
            const rowList = $utils.deepClone(this.rowList); // 备份自定义数据
            let movingDistance = 0; // 垂直方向移动距离
            const startY = $evt.pageY; // 点击触发点Y方向位置
            const height = this.rowList[index].height; // 触发行初始高度
            document.onmousemove = ($event) => {
                movingDistance = $event.pageY - startY; // 计算垂直方向移动距离
                rowList[index].height = height + movingDistance > minHeight - 1 ? height + movingDistance : minHeight; // 判断高度不小于最小高度 更新高度数据
                this.$nextTick(() => {
                    this.rowList = rowList; // 设置数据触发视图更新
                });
            };
        },
        moveContentItem ($evt, index, idx) { // 调整chart宽度
            this.movingItem = true; // 遮罩层控制显示
            this.rowIndex = index; // 记录当前触发操作的行对应数据下标 操作结束后 根据宽度的绝对值像素 计算百分占比
            let rowList = $utils.deepClone(this.rowList); // 备份自定义数据
            let rowchildren = $utils.deepClone(this.rowList[index].children); // 备份当前行自定义数据
            let movingDistance = 0; // 水平方向移动距离
            const startX = $evt.pageX; // 点击触发点X方向位置
            const widthStart = rowchildren[idx].width; // 触发chart初始宽度
            const widthStartNext = rowchildren[idx + 1].width; // 触发chart下一个chart初始宽度
            document.onmousemove = ($event) => {
                movingDistance = $event.pageX - startX; // 计算水平方向移动距离
                let widthNow = widthStart + movingDistance; // chart当前计算后宽度
                let widthNowNext = widthStartNext - movingDistance; // 触发chart下一个chart当前计算后宽度
                if (widthNow >= minItemWidth && widthNowNext >= minItemWidth) { // 判断是否处于限制宽度范围内(不能小于最小宽度 不能大于总宽度减去剩余chart每个宽度为最小宽度时剩余的宽度)
                    rowchildren[idx].width = widthNow;
                    rowchildren[idx + 1].width = widthNowNext;
                } else {
                    return; // 不再限制宽度范围内直接返回
                }
                rowList[index].children = rowchildren; // 更新备份数据
                this.$nextTick(() => {
                    this.rowList = rowList; // 更新数据 触发视图更新
                });
            };
        },
        moveContainerEnd () { // 移除moving状态 释放全局onmousemove
            if (this.movingItem && this.rowIndex > -1) { // 行内chart 拖动改变宽度后计算当前行内各chart宽度占比
                const row = $utils.deepClone(this.rowList[this.rowIndex]);
                this.rowList[this.rowIndex] = this.calcChartItemWidth(row, this.rowIndex);
            }
            this.movingItem = false; // 遮罩层隐藏
            this.isDragItem = false; // 解除drag禁用
            this.movingContainer = false; // 遮罩层隐藏
            this.isDragContainer = false; // 解除drag禁用
            document.onmousemove = null; // 释放全局事件
        },
        resizeAll () {
            // window resize 重新调整尺寸 window resize
            // 根据当前行自适应调整后绝对宽度及chart宽度占比计算chart绝对宽度 若计算后宽度小于最小宽度 取最小宽度 此时宽度与宽度百分比不对应(窗口缩小时)
            const rowList = $utils.deepClone(this.rowList);
            this.rowList = rowList.reduce((rowList, row, index) => {
                if (row.children && row.children.length) {
                    row.children = row.children.reduce((children, v) => {
                        const rowWidth = document.getElementById(`contentRow${index}`).clientWidth;
                        const width = Math.floor(v.widthPer * rowWidth) / 100 - marginCount;
                        children.push({...v, width: width > minItemWidth ? width : minItemWidth});
                        return children;
                    }, []);
                }
                rowList.push(row);
                return rowList;
            }, []);
        },
        initChartItemWidth (index) { // 行内chart添加或移除 （行之间元素移动 元素库clone元素 行内删除chart）重新计算行内chart宽度 均分
            let rowList = $utils.deepClone(this.rowList);
            const row = $utils.deepClone(rowList[index]);
            const rowWidth = document.getElementById(`contentRow${index}`).clientWidth;
            const len = row.children.length;
            rowList[index].children.map((item) => {
                item.width = Math.floor((rowWidth / len).toFixed(2) * 100) / 100 - marginCount;
                item.widthPer = ((item.width + marginCount) / rowWidth).toFixed(2) * 100;
            });
            this.rowList = rowList;
        },
        calcChartItemWidth (row, index) { // 单行数据计算 （行数据， 行排序下标）
            if (row.children && row.children.length) {
                row.children = row.children.reduce((children, v, idx) => {
                    const rowWidth = document.getElementById(`contentRow${index}`).clientWidth;
                    const itemWidth = document.getElementById(`contentItem${index}${idx}`).clientWidth;
                    // 窗口缩小时百分比计算扣宽度小于最小宽度 取最小宽度导致百分比失真 数据提交时重新计算百分比 取页面浏览器计算后宽度计算百分比
                    children.push({...v, widthPer: ((itemWidth + marginCount) / rowWidth).toFixed(2) * 100});
                    return children;
                }, []);
            }
            return row;
        },
        calcAllChartItemWidth () { // 根据行内chart 宽度计算 每个chart宽度占比 计算所有行数据
            const rowList = $utils.deepClone(this.rowList);
            return rowList.reduce((rowList, row, index) => {
                const rowPer = this.calcChartItemWidth(row, index);
                rowList.push(rowPer);
                return rowList;
            }, []);
        },
        addElementItem1 (e, originalEvent) { // 行之间元素移动 元素库clone元素 重新计算行内chart宽度 均分
            if (this.isMove) return;
            if (e.from.id === e.to.id) return;
            if (e.from.id === 'elementWrapper') { // 从元素库clone
                this.rowList = $utils.deepClone(this.rowList);
                this.$nextTick(() => {
                    this.initChartItemWidth(e.to.id.slice(10));
                });
            } else {
                this.$nextTick(() => { // chart在不同行之间移动 移出行 移入行 重新计算
                    this.initChartItemWidth(e.to.id.slice(10));
                    this.initChartItemWidth(e.from.id.slice(10));
                });
            }
        },
        addRow (e) { // 行drag add事件 clone添加数据 drag库默认复用数据 改变元素库数据状态 拷贝生成新数据 防重复引用数据污染
            if (this.isMove) return;
            this.rowList = $utils.deepClone(this.rowList);
        },
        addElementItem (e, originalEvent) { // 行内chart的drag组件move事件 拦截行内chart超出最大数量后不再允许添加
            if (this.isMove) return;
            return !(e.relatedContext.list.length >= maxRowCount && e.to.id !== e.from.id);
        },
        addElement (e, originalEvent) { // drag库的move事件 行内chart超出最大数量后不再允许添加
            if (this.isMove) return false;
            return !(e.to.className === 'content-row' && e.relatedContext.list.length >= maxRowCount);
        }
    }
};
</script>
<style lang="scss" scoped>

  .wrapper {
    position: relative;
    min-width: 1000px;
  }

  .sort-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .sort-content {
      width: 100%;
      height: 110px;
      padding: 20px 50px;
    }

    .trigger-wrapper {
      height: 50px;
      width: 50px;
      text-align: right;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background: rgba(0,0,0,0.025);
      }

      .el-icon-s-fold {
        font-size: 16px;
      }
    }

    .element-wrapper {
      display: flex;

      .element-container {
        height: 100px;
        border: 1px solid #ebeef5;
        margin: 0 5px 5px 5px;
      }

      .element-row {
        display: flex;
        box-sizing: border-box;
      }

      .element-item {
        width: 200px;
        margin: 5px;
        height: 100px;
        box-sizing: border-box;
        border: 1px solid #ebeef5;
      }
    }
  }

  .content-wrapper {
      border: 1px solid #ebeef5;
      background-color: #f5f7fa;
      min-width: 800px;
      min-height: 600px;
      padding: 20px 20px 100px 20px;

      .content-container {
        min-height: 400px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border: 1px solid #ebeef5;
        background-color: #fafafa;
        position: relative;
        padding: 0 32px;

        .handle {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-8px);
        }

        .content-container-move {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 10px;

          &:hover {
            cursor: ns-resize;
            border-top: 1px dotted #ebeef5;
          }
        }

        .content-container-close {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-8px);

          &:hover {
            color: #5cb6ff;
          }
        }
      }

      .content-row {
        display: flex;
        height: 100%;
        position: relative;
      }

      .content-item {
        height: calc(100% - 10px);
        display: flex;
        flex-wrap: wrap;
        margin: 5px;
        border: 1px solid #ebeef5;
        position: relative;

        &:hover {
          .content-item-close {
            display: block;
          }
        }

        .content-item-close {
          position: absolute;
          right: 8px;
          top: 8px;
          display: none;

          &:hover {
            color: #5cb6ff;
          }
        }

        .item-handle {
          position: absolute;
          bottom: 16px;
          right: 16px;
        }
      }

      .content-item-move {
          position: absolute;
          top: 5%;
          right: -10px;
          height: 90%;
          width: 6px;
          margin: 0 2px;

          &:hover {
            cursor: ew-resize;
          }
        }
    }

  .config-wrapper {
    box-sizing: border-box;
    width: 20%;
    min-width: 500px;

    .title{
      padding: 15px 20px;
      text-align: left;
      border-bottom: 1px solid #ebeef5;
    }

    .config-content {
      padding: 20px;

      .imgDemo-wrapper {
        display: flex;

        &>div {
          width: 200px;
          height: 100px;
        }
      }
    }
  }

  .btn-wrapper {
    position: absolute;
    top: 9px;
    right: 50px;
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

</style>
