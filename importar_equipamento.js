import { getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";


document.getElementById("btnImportarEquipamentos").addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function (event) {
      try {
        const dados = JSON.parse(event.target.result);
        const snapshot = await getDocs(acessosRemotosCollection);
        const existentes = snapshot.docs.map(doc => doc.data().ip);

        let inseridos = 0;
        for (const item of dados) {
          if (!existentes.includes(item.IP)) {
            const novo = {
              setor: item.Setor,
              andar: item.Andar,
              tipo: item.Tipo,
              camera: item["Câmera"],
              sala: item["Sala Técnica"],
              ip: item.IP,
              status: "inativa"
            };
            await addDoc(acessosRemotosCollection, novo);
            inseridos++;
          }
        }

        alert(`Importação concluída. ${inseridos} item(ns) adicionados.`);
        await carregarAcessosRemotos();
      } catch (e) {
        alert("Erro ao importar arquivo.");
        console.error(e);
      }
    };
    reader.readAsText(file);
  });

  input.click();
});
