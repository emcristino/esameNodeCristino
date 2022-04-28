Il progetto in questione aggiunge un utente, mediante un form, ad una lista presente in "users". 
I dati vengono inseriti all'interno del file "Users.JSON". 

Obiettivo iniziale non raggiunto:  far registrare un utente ed aggiungerlo dinamicamente alla lista

Anzichè utilizzare un db, ho sostituito all'interno della funzione che restituiva i dati del db, una funzione del filesystem che legge i dati
all'interno di un semplice file json.

Ho gestito la request all'invio del form utilizzando il modulo body parser che mi ha permesso di manipolare meglio l'oggetto request. 
Una funzione che gestisce l'invio scrive poi i dati nel json.


*COME USARLO

Cliccando "registrazione" presente nel menù si dovrà immettere un: 
- id;
- Nome;
- username;
- Email.

Una volta inviato il modulo, tramite una richiesta, i dati inseriti nel form verranno aggiunti in "Users".