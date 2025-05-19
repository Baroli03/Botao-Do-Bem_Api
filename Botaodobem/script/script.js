const btn = document.getElementById("button-mode");
const modeToggle = document.getElementById("mode-toggle")
const h1 = document.getElementById("h1")
let ligado = true

btn.addEventListener("click", () =>{
    ligado = !ligado;
    // Divino
    document.body.classList.toggle("divino")
    btn.classList.toggle("cormorant-unicase-light")
    h1.classList.toggle("cormorant-unicase-light")

    // Maldito
    document.body.classList.toggle("maldito")
    h1.classList.toggle("creepster-regular")
    btn.classList.toggle("creepster-regular")

    
    btn.textContent = ligado ? "BEM" : "MAL";
    btn.style.color = ligado ? "black" : "red";
    document.body.style.backgroundColor = ligado ?  "white" : "black";
    modeToggle.style.color = ligado ? "black" : "red";

  
}
)