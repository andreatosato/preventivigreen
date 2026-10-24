# preventivigreen

Applicazione statica per comporre preventivi dal prezziario Assoverde 2025.
Aprire `index.html` oppure servire la cartella con un server HTTP statico.
Non sono richieste dipendenze o compilazione.

- L’interfaccia si adatta al mobile: le voci del computo diventano schede con
  campi e pulsanti accessibili al tocco.
- Il menu ☰ permette di passare fra preventivo, consultazione del prezziario
  (con ricerca, filtro per capitolo e paginazione) e impostazioni aziendali.
- Le schede prodotto mostrano la descrizione integrale. Il dataset non contiene
  fotografie: con **Foto…** si può caricare una foto JPEG, PNG o WebP fino a
  1 MB, oppure associare un URL HTTPS. In assenza di foto, o se l’immagine
  non è raggiungibile, viene mostrato un segnaposto esplicito.
- Azienda, bozza e foto vengono salvate nel `localStorage` del browser:
  non sono sincronizzate fra dispositivi e si perdono cancellando i dati del
  sito. Se lo storage non è disponibile o è pieno, viene mostrato un avviso.
  Gli URL delle foto esterne comportano richieste al sito indicato.
- I dati aziendali si configurano nella pagina dedicata e sono mantenuti
  creando o aprendo un preventivo. Le foto sono separate dai file preventivo.
- Cliente, numero, data, oggetto, cantiere e condizioni del documento si
  compilano nel dialogo di esportazione, per JSON, Word e stampa/PDF.
  Annullando il dialogo le modifiche a questi campi vengono scartate.
  Il file JSON conserva la bozza e i dati aziendali per archivio; aprendolo
  vengono utilizzate le impostazioni aziendali correnti del browser.

Il repository non include comandi di lint, build o test automatici.
