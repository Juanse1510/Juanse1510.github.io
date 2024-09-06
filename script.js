let a, b, c, d, e, f, g, h, i, j, k, l, m;
let errorCounts = {
  arcsinErrors: 0,
  arccosErrors: 0,
  sqrtErrors: 0,
  divisionErrors: 0,
  logErrors: 0
};
const maxIterations = 1000;

document.getElementById('process-btn').addEventListener('click', function() {
    startProcessing();
});

function startProcessing() {
    errorCounts = {
        arcsinErrors: 0,
        arccosErrors: 0,
        sqrtErrors: 0,
        divisionErrors: 0,
        logErrors: 0
    };

    for (let i = 0; i < maxIterations; i++) {
        a = generateRandomValue();
        b = generateRandomValue();
        c = generateRandomValue();
        d = generateRandomValue();
        e = generateRandomValue();
        f = generateRandomValue();
        g = generateRandomValue();
        h = generateRandomValue();
        i = generateRandomValue();
        j = generateRandomValue();
        k = generateRandomValue();
        l = generateRandomValue();
        m = generateRandomValue();
        
        processErrors(a, b, c, d, e, f, g, h, i, j, k, l, m);
    }

    displayErrorResults(errorCounts);
}

function processErrors(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    try {
        if (a + Math.sqrt(b) <= 0) errorCounts.logErrors++;
        const term1 = Math.log(a + Math.sqrt(b));

        if (c / Math.sqrt(d) < -1 || c / Math.sqrt(d) > 1) errorCounts.arcsinErrors++;
        const term2 = Math.asin(c / Math.sqrt(d));

        if (e / f < -1 || e / f > 1) errorCounts.arccosErrors++;
        const term3 = Math.acos(e / f);

        if (g < -1 || g > 1) errorCounts.arcsinErrors++;
        const term4 = Math.asin(g);

        if (h < -1 || h > 1) errorCounts.arccosErrors++;
        const term5 = Math.acos(h);

        if (i * j <= 0) errorCounts.logErrors++;
        const term6 = Math.log(i * j);

        if (k - Math.acos(l / m) < 0) errorCounts.sqrtErrors++;
        const term7 = Math.sqrt(k - Math.acos(l / m));

        if (term6 === 0) errorCounts.divisionErrors++;

        const numerator = term1 + term2 + term3;
        const denominator = (term4 + term5) / term6;

        if (denominator === 0) errorCounts.divisionErrors++;

        if (f === 0) errorCounts.divisionErrors++;

        if (m === 0) errorCounts.divisionErrors++;

        const resultY = numerator / denominator + term7;
        return { resultY, errorCounts };
    } catch (error) {
        console.error("Error en el cálculo: ", error);
        return { resultY: null, errorCounts };
    }
}

function generateRandomValue() {
    return Math.random() * 2 - 1;
}

function displayErrorResults(errorCounts) {
    const resultsTable = document.getElementById('results-table');

    const totalErrors = errorCounts.arcsinErrors + errorCounts.arccosErrors + errorCounts.sqrtErrors + errorCounts.divisionErrors + errorCounts.logErrors;

    const arcsinPercentage = ((errorCounts.arcsinErrors / maxIterations) * 100).toFixed(2);
    const arccosPercentage = ((errorCounts.arccosErrors / maxIterations) * 100).toFixed(2);
    const sqrtPercentage = ((errorCounts.sqrtErrors / maxIterations) * 100).toFixed(2);
    const divisionPercentage = ((errorCounts.divisionErrors / maxIterations) * 100).toFixed(2);
    const logPercentage = ((errorCounts.logErrors / maxIterations) * 100).toFixed(2);

    resultsTable.innerHTML = `
        <tr>
            <th>Total de errores de arcoseno</th><td>${errorCounts.arcsinErrors}</td><td>${arcsinPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de arcocoseno</th><td>${errorCounts.arccosErrors}</td><td>${arccosPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de raíz cuadrada</th><td>${errorCounts.sqrtErrors}</td><td>${sqrtPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de división</th><td>${errorCounts.divisionErrors}</td><td>${divisionPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de logaritmo natural</th><td>${errorCounts.logErrors}</td><td>${logPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores</th><td>${totalErrors}</td><td></td>
        </tr>
    `;

    drawErrorChart(errorCounts);
}

function drawErrorChart(errorCounts) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {
        var chartData = google.visualization.arrayToDataTable([
            ['Tipo de Error', 'Cantidad'],
            ['Arcoseno', errorCounts.arcsinErrors],
            ['Arcocoseno', errorCounts.arccosErrors],
            ['Raíz Cuadrada', errorCounts.sqrtErrors],
            ['División', errorCounts.divisionErrors],
            ['Logaritmo Natural', errorCounts.logErrors]
        ]);

        var chartOptions = {
            title: 'Distribución de Errores',
            is3D: true,
            pieHole: 0.4
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart'));
        chart.draw(chartData, chartOptions);
    });
}

        const errorChart = new google.visualization.PieChart(document.getElementById('chart'));
        errorChart.draw(chartData, chartOptions);
    });
}
