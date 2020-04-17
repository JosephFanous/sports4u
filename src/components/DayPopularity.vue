<template>
<div class="chart">
</div>
</template>

<script>
import { getDayData } from '../util'
import { isValidDate } from '../../common/util'
import * as d3 from 'd3'

export default {
  name: 'DayPopularity',
  data: function() {
    return {
      isLoadingData: false,
      dataError: '',
      popularityByDay: null
    }
  },
  props: ['venueID'],
  methods: {
    getData() {
      this.isLoadingData = true
      this.dataError = ''

      getDayData(this.venueID)
        .then(data => {
          if (data.error) {
            this.dataError = data.error
            return
          }

          this.popularityByDay = data.popularityByDay
          this.createGraph()
        })
        .catch(err => {
          console.error(err)
          this.dataError = 'Could not fetch data.'
        })
        .finally(() => {
          this.isLoadingData = false
        })
    },
    createGraph() {
      const width = 400
      const height = 150
      const marginBottom = 20
      const chartWidth = width
      const chartHeight = height

      const colourScale = d3.scaleLinear()
        .domain([0, 1])
        .range(['#b4d1ff', '#3273dc']);

      const xScale = d3.scaleBand()
        .range([0, chartWidth])
        .domain(['Su', 'M', 'T', 'W', 'Th', 'F', 'S'])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .range([chartHeight - marginBottom, 0])
        .domain([0, 1]);

      const svg = d3.select('.chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const canvas = svg.append('g')
        // .attr('transform', `translate(${margin}, ${margin})`);

      // chart title
      // svg.append('text')
      //   .attr('x', margin + chartWidth / 2)
      //   .attr('y', margin)
      //   .attr('text-anchor', 'middle')
      //   .text('Sales by Year');

      // x-axis and label
      const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickSizeOuter(0)
        .tickSizeInner(0)
        .tickPadding(10)

      canvas.append('g')
        .attr('transform', `translate(0, ${height - marginBottom})`)
        .call(xAxis);

      // svg.append('text')
      //   .attr('x', width / 2)
      //   .attr('y', height - 10)
      //   .attr('text-anchor', 'middle')
      //   .style('fill', '#363636')
      //   .text('Day');

      // y-axis and label
      // canvas.append('g')
      //   .attr('transform', `translate(${margin}, 0)`)
      //   .call(d3.axisLeft(yScale));

      // svg.append('text')
      //   .attr('x', -margin + -(chartWidth / 2))
      //   .attr('y', margin)
      //   .attr('transform', 'rotate(-90)')
      //   .attr('text-anchor', 'middle')
      //   .text('Sales ($)');

      // the bar chart
      const bars = canvas.selectAll('rect')
        .data(['Su', 'M', 'T', 'W', 'Th', 'F', 'S'])
        .enter()
          .append('rect')
          .attr('x', (day) => xScale(day))
          .attr('y', (day) => height - marginBottom)
          .attr('height', 0)
          .attr('width', xScale.bandwidth())
          .attr('fill', (day) => colourScale(this.popularityByDay[day]))
          .on('mouseenter', function(source, index) {
                d3.select(this)
                  .transition()
                  .duration(200)
                  .attr('opacity', 0.7);
            })
          .on('mouseleave', function(source, index) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('opacity', 1.0);
            });

      bars.transition()
        .ease(d3.easeQuadInOut)
        .duration(600)
        .attr('y', (day) => yScale(this.popularityByDay[day]))
        .attr('height', (day) => height - marginBottom - yScale(this.popularityByDay[day]))
    }
  },
  mounted: function() {
    this.getData()
  }
}
</script>

<style scoped lang="scss"></style>


