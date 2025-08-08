// rankingLocal.js

/* const STORAGE_KEY = 'ranking_local_acessos';

export function registrarAcessoGeral(id, nome, tipo, img) {
  const acessos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  if (!acessos[id]) {
    acessos[id] = { id, nome, tipo, acessos: 0, img: img || "" };
  }
  acessos[id].acessos += 1;
  if (img) acessos[id].img = img; // sempre atualiza imagem, se fornecida
  localStorage.setItem(STORAGE_KEY, JSON.stringify(acessos));
  renderizarTopGeral(); // atualiza o painel na hora
}

export function renderizarTopGeral() {
  const ul = document.getElementById("lista-top-geral");
  if (!ul) return;

  const acessos = Object.values(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {});
  acessos.sort((a, b) => b.acessos - a.acessos);

  ul.innerHTML = "";
  acessos.slice(0, 10).forEach(item => {
    let icon = "✨";
    if (item.tipo === "painel" && item.img) {
      icon = `<img src="${item.img}" style="width:24px; height:24px; object-fit:cover; border-radius:4px; margin-right:5px; box-shadow:0 1px 4px #0002;" alt="">`;
    } else if (item.tipo === "sistema") icon = "🌐";
    else if (item.tipo === "anydesk") icon = "💻";
    else if (item.tipo === "infra") icon = "🔒";
    ul.innerHTML += `<li>${icon} <b>${item.nome}</b> <small>${item.tipo}</small> <span>(${item.acessos})</span></li>`;
  });
}
 */