import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import './index.scss'

const Index = () => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const option = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }

    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)
      chart.setOption(option)
      window.addEventListener('resize', () => {
        chart.resize()
      })
    }
  }, [])
  return (
    <div className='dashboard' ref={chartRef}>
      Dashboard
    </div>
  )
}

export default Index
