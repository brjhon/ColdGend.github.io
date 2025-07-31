// ranking.js
import { doc, setDoc, updateDoc, getDocs, collection, increment } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Função para registrar acesso no top geral
export async function registrarAcessoGeral(db, id, nome, tipo) {
  const ref = doc(db, "acessos_gerais", id);
  try {
    await updateDoc(ref, { acessos: increment(1) });
  } catch (e) {
    await setDoc(ref, { nome, tipo, acessos: 1 });
  }
}

export async function renderizarTopGeral(db) {
  const top = await obterTopGeral(db, 5);
  const ul = document.getElementById("lista-top-geral");
  if (!ul) return; // proteção extra!
  ul.innerHTML = "";
  top.forEach(item => {
    let icon = "✨";
    if (item.tipo === "sistema") icon = "🌐";
    else if (item.tipo === "anydesk") icon = "💻";
    else if (item.tipo === "infra") icon = "🔒";
    else if (item.tipo === "painel") icon = "⚡";
    ul.innerHTML += `<li>${icon} <b>${item.nome}</b> <small>${item.tipo}</small> <span>(${item.acessos})</span></li>`;
  });
}

// Função para buscar os mais acessados
export async function obterTopGeral(db, n = 5) {
  const querySnapshot = await getDocs(collection(db, "acessos_gerais"));
  const lista = [];
  querySnapshot.forEach(doc => {
    lista.push({ id: doc.id, ...doc.data() });
  });
  lista.sort((a, b) => b.acessos - a.acessos);
  return lista.slice(0, n);
}
