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
    <div id="dropin-container"></div>
    <button id="submit-button">Conferma pagamento</button>
</template>

<style scoped>
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