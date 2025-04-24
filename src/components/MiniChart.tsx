import React, { useRef, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler } from 'chart.js';
import { ChartData, PriceChange } from '../types';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler);

interface MiniChartProps {
  data: ChartData;
  priceChange7d: PriceChange;
}

const MiniChart: React.FC<MiniChartProps> = ({ data, priceChange7d }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Determine chart color based on price change
    const lineColor = priceChange7d.direction === 'up' ? '#16c784' : '#ea3943';
    const gradientColor = priceChange7d.direction === 'up' ? 'rgba(22, 199, 132, 0.1)' : 'rgba(234, 57, 67, 0.1)';
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 80);
    gradient.addColorStop(0, gradientColor);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    // Create and configure chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.datasets[0].data,
          borderColor: lineColor,
          borderWidth: 2,
          fill: true,
          backgroundColor: gradient,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,
            grid: {
              display: false
            }
          },
          y: {
            display: false,
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        elements: {
          point: {
            radius: 0
          }
        },
        animation: {
          duration: 0
        }
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, priceChange7d.direction]);

  return (
    <div className="w-full max-w-[160px] h-[60px]">
      <canvas ref={chartRef} height="60"></canvas>
    </div>
  );
};

export default MiniChart;