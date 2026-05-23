const botao = document.getElementById("botao_formulario");

botao.addEventListener("click", function() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let numero = document.getElementById("numero").value;

    let mensagem = document.getElementById("mensagem");

    if(nome === ""){
        alert("Digite seu nome");
    }else if(email === ""){
        alert("Digite seu email");
    }else if (numero === ""){
        alert("Digite seu número");
    } else {
        alert(`Formulário enviado com sucesso, ${nome}!`);
        console.log(`Dados: ${nome}, ${email}, ${numero}`);

        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("numero").value = "";
    }
});