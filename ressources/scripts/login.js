if (sessionStorage.getItem("username")) resetProfile();

document.getElementById("login-form").addEventListener("submit", ev => {
    ev.preventDefault();

    if (!localStorage.getItem("terms")) {
        return showInfo("Vous devez accepter les <a href='/terms' target='_blank'>conditions d'utilisations</a> pour continuer.", () => {
            localStorage.setItem("terms", true);
            document.getElementById("login-form").dispatchEvent(ev);
        });
    }

    const username = document.getElementById("username").value;

    axios.post("/api/profile", { username }).then(res => {
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("id", res.data.id);
        document.location.href = "/";
    }, err => {
        showError(err?.response?.data || "Erreur inattendue");
    });
});