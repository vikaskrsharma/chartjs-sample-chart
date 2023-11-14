import {
    Chart,
    Colors,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    LineElement,
    Legend,
    Tooltip,
    Filler
} from 'chart.js'

Chart.register(
    Colors,
    LineController,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler
);
(async function () {

    const ctx = document.getElementById('acquisitions').getContext('2d');

    const priceTrend = [
        {
            "timestamp": 1679337000000,
            "price": 79100.000000
        },
        {
            "timestamp": 1679423400000,
            "price": 80600.000000
        },
        {
            "timestamp": 1679509800000,
            "price": 81100.000000
        },
        {
            "timestamp": 1679596200000,
            "price": 81100.000000
        },
        {
            "timestamp": 1679682600000,
            "price": 80100.000000
        },
        {
            "timestamp": 1679855400000,
            "price": 79100.000000
        },
        {
            "timestamp": 1679941800000,
            "price": 79100.000000
        },
        {
            "timestamp": 1680028200000,
            "price": 79100.000000
        },
        {
            "timestamp": 1680114600000,
            "price": 78600.000000
        },
        {
            "timestamp": 1680201000000,
            "price": 79850.000000
        },
        {
            "timestamp": 1680287400000,
            "price": 79850.000000
        },
        {
            "timestamp": 1680460200000,
            "price": 83100.000000
        },
        {
            "timestamp": 1680546600000,
            "price": 83850.000000
        },
    ];

    const priceTrendWithDate = priceTrend.map((price) => {
        let date = new Date(price.timestamp).toLocaleDateString('en-IN');
        return {
            ...price,
            date: date
        };
    });

    // Define a linear gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)'); // white at the top
    gradient.addColorStop(0, 'rgba(0, 178, 86, 1)');    // #00B25

    const chartData = {
        labels: priceTrendWithDate.map(row => row.date),
        datasets: [
            {
                label: '',
                data: priceTrendWithDate.map(row => row.price),
                borderColor: '#06963C',
                backgroundColor: gradient,
                fill: 'start',
            }
        ]
    };

    const options = {
        animation: false,
        plugins: {
            filler: {
                propagate: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: true,
                    autoSkip: true,
                    maxTicksLimit: 7
                }
            },
            y: {
                ticks: {
                    callback: value => `₹${value}`,
                },
                grid: {
                    display: false,
                }
            },
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            },
            decimation: {
                enabled: true,
            }
        }
    };

    new Chart(
        ctx,
        {
            type: 'line',
            options: options,
            data: chartData,
        }
    );
})();
