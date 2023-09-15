<script>
import { store } from '../store';


export default {
    name: 'Payment',
    data() {
        return {
            store,

        }
    },
    methods: {
        // Conferma pagamento dal carrello
        confirmPayment() {
            this.$emit('', {

            });
        },

        // API Braintree
        getBraintree() {
            // const braintree = require('braintree');  --> Inserito nell'index

            var gateway = new braintree.BraintreeGateway({
                environment: braintree.Environment.Sandbox,
                merchantId: '95dqr4b9sk8hvw6h',
                publicKey: 'mhfn7bd29dvj2774',
                privateKey: '395dbfc136c8baddbf06dcc4f54427fc'
            });

            return gateway;
        },

        // Genera token
        getToken() {
            gateway.clientToken.generate({}, function (err, response) {
                if (err) {
                    console.error(err);
                    return;
                }

                var clientToken = response.clientToken;
                // Utilizza clientToken nel frontend
            });

        },

        // Modulo di pagamento
        goToPay() {
            var form = document.querySelector('#payment-form');

            gateway.dropin.create({
                authorization: this.clientToken,
                container: '#dropin-container'
            }, function (err, instance) {
                if (err) {
                    console.error(err);
                    return;
                }

                form.addEventListener('submit', function (event) {
                    event.preventDefault();

                    instance.requestPaymentMethod(function (err, payload) {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        // Invia payload al server per l'elaborazione del pagamento
                    });
                });
            });

        },

        // Crea transazione
        createTransaction() {
            document.getElementById('pay-button').addEventListener('click', function () {
                gateway.client.create({
                    authorization: 'IL_TUO_CLIENT_TOKEN'
                }, function (clientErr, clientInstance) {
                    if (clientErr) {
                        console.error(clientErr);
                        return;
                    }

                    // Crea la transazione
                    clientInstance.request({
                        endpoint: 'payment_methods/credit_cards',
                        method: 'post',
                        data: {
                            creditCard: {
                                number: '',
                                expirationDate: '',
                            }
                        }
                    }, function (requestErr, response) {
                        if (requestErr) {
                            console.error(requestErr);
                            return;
                        }

                        // Gestisci la risposta della transazione
                        console.log(response);
                    });
                });
            });

        }

    }
}


</script>

<template>

    <div class="container">

        <h1>Completa l'ordine</h1>

        <form action="#" method="POST">
            <label for="customers_namecustomers_adress">Nome:</label>
            <input type="text" id="customers_namecustomers_adress" name="customers_namecustomers_adress" required><br><br>
            
            <label for="customers_adress">Indirizzo di Consegna:</label>
            <textarea id="customers_adress" name="customers_adress" required></textarea><br><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>

            <label for="phone_number">Numero di Telefono:</label>
            <input type="tel" id="phone_number" name="phone_number" required><br><br>

            <hr>

            <!-- Campo di pagamento -->
            <label for="pagamento">Metodo di Pagamento:</label>
            <select id="pagamento" name="pagamento" required>
                <option value="carta">Carta di Credito</option>
                <option value="paypal">PayPal</option>
            </select><br><br>

            <!-- Campo per i dati della carta di credito -->
            <label for="carta-credito">Numero della Carta di Credito:</label>
            <input type="text" id="carta-credito" name="carta-credito" class="credit-card" placeholder="XXXX-XXXX-XXXX-XXXX" required><br><br>

            <!-- Campo per la data di scadenza -->
            <label for="scadenza">Data di Scadenza:</label>
            <input type="text" id="scadenza" name="scadenza" class="credit-card" placeholder="MM/AA" required><br><br>

            <!-- Campo per il codice di sicurezza (CVV) -->
            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" class="credit-card" placeholder="CVV" required><br><br>

            <input type="submit" value="Invia Ordine">

        </form>

    </div>

    

    <div id="dropin-container"></div>
    <button id="submit-button">Conferma pagamento</button>
    
</template>

<style scoped>

    .container {
    width: 600px;
    margin-top: 20px;
    padding: 20px;
    text-align: center; /* Per centrare il contenuto orizzontalmente */

    }

    /* Stile per l'elemento h1 */
    h1 {
    font-size: 24px; /* Imposta la dimensione desiderata */
    margin-bottom: 20px; /* Spazio tra l'h1 e il form */
    }

        /* Stile generale del form */
    form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* Stile per le etichette dei campi */
    label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    }

    /* Stile per gli input e il textarea */
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
    }

    /* Stile per il pulsante di invio */
    input[type="submit"] {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    }

    input[type="submit"]:hover {
    background-color: #0056b3;
    }

    /* Stile per il campo "Metodo di Pagamento" */
    label[for="pagamento"] {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    }

    select#pagamento {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
    }

    /* Personalizza lo stile delle opzioni nel select */
    select#pagamento option {
    font-size: 16px;
    }

    /* Aggiungi spaziatura tra il campo "Metodo di Pagamento" e il campo della carta di credito */
    select#pagamento + label {
    margin-top: 20px;
    }



/* .button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
} */
</style>