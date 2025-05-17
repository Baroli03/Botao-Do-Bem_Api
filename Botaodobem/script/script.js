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
        document.body.classList.remove("maldito")
        document.body.classList.add("divino")
    } else {
        btn.classList.remove("cormorant-unicase-light")
        btn.classList.add("creepster-regular")
        h1.classList.remove("cormorant-unicase-light")
        h1.classList.add("creepster-regular")
        document.body.classList.remove("divino")
        document.body.classList.add("maldito")
    }
    btn.textContent = ligado ? "BEM" : "MAL";
    btn.style.color = ligado ? "black" : "red";
    document.body.style.backgroundColor = ligado ?  "white" : "black";
    modeToggle.style.color = ligado ? "black" : "red";

  
}
)