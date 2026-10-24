// Calcoli del preventivo. Funzioni pure: usate da index.html e da tools/test_calcoli.js.
(function (root) {
  const r2 = (x) => Math.round((x + Number.EPSILON) * 100) / 100;
  const num = (x) => (x === "" || x == null || isNaN(+x) ? null : +x);

  // Quantità: se è compilata almeno una misura (computo metrico) è il prodotto
  // parti × lunghezza × larghezza × altezza (le vuote valgono 1), altrimenti la quantità inserita.
  function quantita(riga) {
    const m = [riga.parti, riga.lun, riga.lar, riga.alt].map(num);
    if (m.every((x) => x === null)) return num(riga.qta) ?? 0;
    return r2(m.reduce((a, x) => a * (x ?? 1), 1));
  }

  // Importo riga: quantità × prezzo × (1 + variazione%) — la variazione copre ad es.
  // gli incrementi del prezzario per minime quantità (+80%, +60%...) o sconti di riga (negativi).
  function importoRiga(riga) {
    if (riga.tipo === "titolo") return 0;
    return r2(quantita(riga) * (num(riga.prezzo) ?? 0) * (1 + (num(riga.variazione) ?? 0) / 100));
  }

  function totali(prev) {
    const c = prev.condizioni || {};
    const lavori = r2(prev.righe.reduce((s, r) => s + importoRiga(r), 0));
    const sconto = r2(lavori * (num(c.sconto) ?? 0) / 100);
    const netto = r2(lavori - sconto);
    const sicurezza = r2(netto * (num(c.sicurezzaPerc) ?? 0) / 100 + (num(c.sicurezzaFissa) ?? 0));
    const altre = r2(num(c.altreSpese) ?? 0);
    const imponibile = r2(netto + sicurezza + altre);
    const iva = r2(imponibile * (num(c.iva) ?? 0) / 100);
    return { lavori, sconto, netto, sicurezza, altre, imponibile, iva, totale: r2(imponibile + iva) };
  }

  const api = { quantita, importoRiga, totali, r2 };
  if (typeof module !== "undefined") module.exports = api;
  else root.Calcoli = api;
})(this);
