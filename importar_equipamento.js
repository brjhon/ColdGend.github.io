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

        // 🔹 Importar CFTV
        for (const item of dados.cftv || []) {
          if (!existentes.includes(item.ip)) {
            const novo = {
              setor: item.setor,
              andar: item.andar,
              tipo: item.tipo,
              camera: item.modelo,
              sala: item.sala_tecnica,
              ip: item.ip,
              status: "inativa"
            };
            await addDoc(acessosRemotosCollection, novo);
            inseridos++;
          }
        }

        // 🔸 Importar Controle de Acesso
        for (const item of dados.controle_acesso || []) {
          if (!existentes.includes(item.ip)) {
            const novo = {
              setor: item.setor,
              andar: item.andar,
              tipo: item.tipo,
              camera: "Controle de Acesso",
              sala: item.sala_tecnica,
              ip: item.ip,
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
