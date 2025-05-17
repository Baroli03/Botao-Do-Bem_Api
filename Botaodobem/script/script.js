const btn = document.getElementById("button-mode");
const modeToggle = document.getElementById("mode-toggle")
const h1 = document.getElementById("h1")
let ligado = true

btn.addEventListener("click", () =>{
    ligado = !ligado;

    if (ligado) {
        btn.classList.remove("creepster-regular")
        btn.classList.add("cormorant-unicase-light")
        h1.classList.remove("creepster-regular")
        h1.classList.add("cormorant-unicase-light")
    } else {
        btn.classList.remove("cormorant-unicase-light")
        btn.classList.add("creepster-regular")
        h1.classList.remove("cormorant-unicase-light")
        h1.classList.add("creepster-regular")
    }
    btn.textContent = ligado ? "BEM" : "MAL";
    btn.style.color = ligado ? "black" : "white";
    btn.style.backgroundColor = ligado ? "green" : "red";
    document.body.style.backgroundColor = ligado ?  "white" : "black";
    modeToggle.style.color = ligado ? "black" : "white";

  
}
)