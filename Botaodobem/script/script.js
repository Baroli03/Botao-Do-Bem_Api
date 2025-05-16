const btn = document.getElementById("Botao");
let ligado = true

btn.addEventListener("click", () =>{
    ligado = !ligado;
    btn.textContent = ligado ? "BEM" : "MAL";
    btn.style.backgroundColor = ligado ? "green" : "red";
    document.body.style.backgroundColor = ligado ?  "white" : "black";
    btn.style.color = "white";
}
)