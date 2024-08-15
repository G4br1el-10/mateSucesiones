document.getElementById('show-pictograph').addEventListener('change', function() {
    document.getElementById('pictograph').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('show-arithmetic').addEventListener('change', function() {
    document.getElementById('arithmetic').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('show-numeric').addEventListener('change', function() {
    document.getElementById('numeric').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('pictograph-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const shape = document.getElementById('shape').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    generatePictographs(shape, quantity);
});

document.getElementById('arithmetic-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const start = parseInt(document.getElementById('start').value, 10);
    const difference = parseInt(document.getElementById('difference').value, 10);
    const terms = parseInt(document.getElementById('terms').value, 10);
    displayArithmeticSequence(start, difference, terms);
});

document.getElementById('numeric-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const terms = parseInt(document.getElementById('terms').value, 10);
    const type = document.getElementById('type').value;
    displayNumericSequence(terms, type);
});

function generatePictographs(shape, quantity) {
    const container = document.getElementById('pictograph-content');
    container.innerHTML = '';
    let count = 1;
    let total = 0;

    while (total < quantity) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.flexWrap = 'wrap';
        
        for (let i = 0; i < count && total < quantity; i++) {
            let svg;
            switch (shape) {
                case 'circle':
                    svg = `<svg width="30" height="30"><circle cx="15" cy="15" r="15" fill="DarkSalmon" /></svg>`;
                    break;
                case 'square':
                    svg = `<svg width="30" height="30"><rect width="30" height="30" fill="Salmon" /></svg>`;
                    break;
                case 'triangle':
                    svg = `<svg width="30" height="30"><polygon points="15,0 30,30 0,30" fill="LightCoral" /></svg>`;
                    break;
                case 'rhombus':
                    svg = `<svg width="30" height="30"><polygon points="15,0 30,15 15,30 0,15" fill="IndianRed" /></svg>`;
                    break;
            }
            const svgElement = document.createElement('div');
            svgElement.innerHTML = svg;
            row.appendChild(svgElement);
            total++;
        }
        container.appendChild(row);
        count++;
    }
}

function displayArithmeticSequence(start, difference, terms) {
    const container = document.getElementById('arithmetic-content');
    container.innerHTML = '';
    let sequence = [];
    for (let i = 0; i < terms; i++) {
        sequence.push(start);
        start += difference;
    }
    container.innerHTML = sequence.join(', ');
}

function displayNumericSequence(terms, type) {
    const container = document.getElementById('numeric-content');
    const explanation = document.getElementById('numeric-explanation');
    container.innerHTML = '';
    let sequence = [];

    switch (type) {
        case 'squares':
            for (let i = 0; i < terms; i++) {
                sequence.push(Math.pow(i, 2));
            }
            explanation.innerHTML = 'La sucesión muestra los cuadrados de los números enteros comenzando desde 0.';
            break;
        case 'fibonacci':
            let a = 0, b = 1;
            sequence.push(a);
            for (let i = 1; i < terms; i++) {
                let next = a + b;
                sequence.push(next);
                a = b;
                b = next;
            }
            explanation.innerHTML = 'La sucesión Fibonacci es una serie en la que cada número es la suma de los dos anteriores, comenzando con 0 y 1.';
            break;
        case 'factorial':
            for (let i = 0; i < terms; i++) {
                sequence.push(factorial(i));
            }
            explanation.innerHTML = 'La sucesión factorial muestra el producto de todos los números enteros positivos hasta el número dado.';
            break;
    }
    container.innerHTML = sequence.join(', ');
}

function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}
