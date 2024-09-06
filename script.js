let x, y, z, w, v, u, n, o, p, q, r, s, t;
let errorCounts = {
  asinError: 0,
  acosError: 0,
  sqrtError: 0,
  divisionError: 0,
  logError: 0
};
const maxCycles = 1000;

document.getElementById('btn-process').addEventListener('click', function() {
    console.log("Botón presionado"); 
    evaluateEquation();
});

function evaluateEquation() {
    console.log("Iniciando evaluación"); 
    errorCounts = {
        asinError: 0,
        acosError: 0,
        sqrtError: 0,
        divisionError: 0,
        logError: 0
    };

    for (let count = 0; count < maxCycles; count++) {
        x = generateRandomValue();
        y = generateRandomValue();
        z = generateRandomValue();
        w = generateRandomValue();
        v = generateRandomValue();
        u = generateRandomValue();
        n = generateRandomValue();
        o = generateRandomValue();
        p = generateRandomValue();
        q = generateRandomValue();
        r = generateRandomValue();
        s = generateRandomValue();
        t = generateRandomValue();
        
        computeYWithErrors(x, y, z, w, v, u, n, o, p, q, r, s, t);
    }

    renderResults(errorCounts);
}

function computeYWithErrors(x, y, z, w, v, u, n, o, p, q, r, s, t) {
    try {
        if (x + Math.sqrt(y) <= 0) errorCounts.logError++;
        const firstTerm = Math.log(x + Math.sqrt(y));

        if (z / Math.sqrt(w) < -1 || z / Math.sqrt(w) > 1) errorCounts.asinError++;
        const secondTerm = Math.asin(z / Math.sqrt(w));

        if (v / u < -1 || v / u > 1) errorCounts.acosError++;
        const thirdTerm = Math.acos(v / u);

        if (n < -1 || n > 1) errorCounts.asinError++;
        const fourthTerm = Math.asin(n);

        if (o < -1 || o > 1) errorCounts.acosError++;
        const fifthTerm = Math.acos(o);

        if (p * q <= 0) errorCounts.logError++;
        const sixthTerm = Math.log(p * q);

        if (r - Math.acos(s / t) < 0) errorCounts.sqrtError++;
        const seventhTerm = Math.sqrt(r - Math.acos(s / t));

        if (sixthTerm === 0) errorCounts.divisionError++;

        const numerator = firstTerm + secondTerm + thirdTerm;
        const denominator = (fourthTerm + fifthTerm) / sixthTerm;

        if (denominator === 0) errorCounts.divisionError++;

        if (u === 0) errorCounts.divisionError++;

        if (t === 0) errorCounts.divisionError++;

        const Y = numerator / denominator + seventhTerm;
        return { Y, errorCounts };
    } catch (err) {
        console.error("Error en el cálculo de la ecuación: ", err);
        return { Y: null, errorCounts };
    }
}

function generateRandomValue() {
    return Math.random() * 2 - 1;
}

function renderResults(errorCounts) {
    console.log("Renderizando resultados"); // Verificar si esta función se llama
    const resultsTable = document.getElementById('table-results');

    const totalErrors = errorCounts.asinError + errorCounts.acosError + errorCounts.sqrtError + errorCounts.divisionError + errorCounts.logError;

    const asinPercentage = ((errorCounts.asinError / maxCycles) * 100).toFixed(2);
    const acosPercentage = ((errorCounts.acosError / maxCycles) * 100).toFixed(2);
    const sqrtPercentage = ((errorCounts.sqrtError / maxCycles) * 100).toFixed(2);
    const divisionPercentage = ((errorCounts.divisionError / maxCycles) * 100).toFixed(2);
    const logPercentage = ((errorCounts.logError / maxCycles) * 100).toFixed(2);

    resultsTable.innerHTML = `
        <tr>
            <th>Total de errores de arcoseno</th><td>${errorCounts.asinError}</td><td>${asinPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de arcocoseno</th><td>${errorCounts.acosError}</td><td>${acosPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de raíz cuadrada</th><td>${errorCounts.sqrtError}</td><td>${sqrtPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de división</th><td>${errorCounts.divisionError}</td><td>${divisionPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de logaritmo natural</th><td>${errorCounts.logError}</td><td>${logPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores</th><td>${totalErrors}</td><td></td>
        </tr>
    `;

    drawErrorChart(errorCounts);
}

function drawErrorChart(errorCounts) {
    console.log("Intentando dibujar el gráfico"); // Verificar si se alcanza esta función
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(function() {
        const chartData = google.visualization.arrayToDataTable([
            ['Tipo de Error', 'Cantidad'],
            ['Arcoseno', errorCounts.asinError],
            ['Arcocoseno', errorCounts.acosError],
            ['Raíz Cuadrada', errorCounts.sqrtError],
            ['División', errorCounts.divisionError],
            ['Logaritmo Natural', errorCounts.logError]
        ]);

        const chartOptions = {
            title: 'Distribución de Errores',
            is3D: true,
            pieHole: 0.4
        };

        const errorChart = new google.visualization.PieChart(document.getElementById('chart'));
        errorChart.draw(chartData, chartOptions);
    });
}
