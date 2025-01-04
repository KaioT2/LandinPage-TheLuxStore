const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;
      const value = chart.data.datasets[0].data[0];

      ctx.restore();
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#333';

      const text = `${value}%`;
      const x = width / 2;
      const y = height / 2;
      ctx.fillText(text, x, y);
      ctx.save();
    },
  };

  Chart.register(centerTextPlugin);

  function createChart(canvasId, value, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Progresso', 'Faltante'],
        datasets: [{
          label: 'Progresso',
          data: [value, 100 - value],
          backgroundColor: [color, '#f0f0f0'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
      },
    });
  }

  const backendData = [
    { canvasId: 'doughnutChart1', value: 80, color: '#ff592f' },
    { canvasId: 'doughnutChart2', value: 60, color: '#4caf50' },
    { canvasId: 'doughnutChart3', value: 45, color: '#2196f3' },
  ];

  backendData.forEach(({ canvasId, value, color }) => {
    createChart(canvasId, value, color);
  });