const CursoPeriodo = (x, y) => {
    if (x == "Sistemas de Informação" && y == 1) return { PrimeiroPeriodo: [
        { Disciplina: 'Introdução à Administração', ch: 60 },
        { Disciplina: 'Programação Funcional', ch: 60 },
        { Disciplina: 'Vetores e Geometria Analítica', ch: 60 },
        { Disciplina: 'Cálculo A', ch: 60 },
        { Disciplina: 'Seminários em Computação', ch: 30 }
    ]};
    if (x == "Sistemas de Informação" && y == 2) return { SegundoPeriodo: [
        { Disciplina: 'Cálculo B', ch: 60 },
        { Disciplina: 'Fundamentos Elementares da Matemática', ch: 60 },
        { Disciplina: 'Programação Imperativa', ch: 60 },
        { Disciplina: 'OSM', ch: 60 },
        { Disciplina: 'Informática, Ética e Sociedade', ch: 60 }
    ]};
    return undefined;
}

const Nome = () => {
    const ExecutarNome = document.getElementById("Nome").value;
    document.getElementById("output").innerHTML = `Olá, ${ExecutarNome}.`;
}

const ExecutarCurso = () => {
    const curso = document.getElementById("SistemasDeInformação").value;
    const periodo = document.getElementById("Período").value;
    const resultado = CursoPeriodo(curso, periodo);
    document.getElementById("output").innerHTML = JSON.stringify(resultado);
}

const Limpar = () => {
    document.getElementById("output").innerHTML = "";
}

function selecionarCurso(cursoSelecionado) {
    var cursos = document.querySelectorAll('.curso');
    cursos.forEach(function (curso) {
        curso.style.display = 'none';
    });
    document.getElementById(cursoSelecionado).style.display = 'block';
    document.getElementById('curso-nav').style.display = 'none';
}

function selecionarPeriodo(periodoSelecionado) {
    var periodos = document.querySelectorAll('.periodo');
    periodos.forEach(function (periodo) {
        periodo.style.display = 'none';
    });
    document.getElementById(periodoSelecionado).style.display = 'block';
    document.getElementById('periodo-nav').style.display = 'none';
}
