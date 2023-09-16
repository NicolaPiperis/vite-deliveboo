<script>
import { store } from '../store';
import Braintree from '../components/Braintree.vue';


export default {
    name: 'Payment',
    components: {
        Braintree
    },
    data() {
        return {
            store,

        }
    },
    computed: {
        priceTotal() {
            return this.store.cart.reduce((acc, dish) => {
                return acc + (dish.price * dish.quantity);
            }, 0);
            
        }
    },
    // methods: {

    //     confirmPayment() {
    //         this.$emit('', {

    //         });
    //     },


    //     getBraintree() {


    //         var gateway = new braintree.BraintreeGateway({
    //             environment: braintree.Environment.Sandbox,
    //             merchantId: '95dqr4b9sk8hvw6h',
    //             publicKey: 'mhfn7bd29dvj2774',
    //             privateKey: '395dbfc136c8baddbf06dcc4f54427fc'
    //         });

    //         return gateway;
    //     },

    //     getToken() {
    //         gateway.clientToken.generate({}, function (err, response) {
    //             if (err) {
    //                 console.error(err);
    //                 return;
    //             }

    //             var clientToken = response.clientToken;

    //         });

    //     },


    //     goToPay() {
    //         var form = document.querySelector('#payment-form');

    //         gateway.dropin.create({
    //             authorization: this.clientToken,
    //             container: '#dropin-container'
    //         }, function (err, instance) {
    //             if (err) {
    //                 console.error(err);
    //                 return;
    //             }

    //             form.addEventListener('submit', function (event) {
    //                 event.preventDefault();

    //                 instance.requestPaymentMethod(function (err, payload) {
    //                     if (err) {
    //                         console.error(err);
    //                         return;
    //                     }

    //                 });
    //             });
    //         });

    //     },


    //     createTransaction() {
    //         document.getElementById('pay-button').addEventListener('click', function () {
    //             gateway.client.create({
    //                 authorization: 'IL_TUO_CLIENT_TOKEN'
    //             }, function (clientErr, clientInstance) {
    //                 if (clientErr) {
    //                     console.error(clientErr);
    //                     return;
    //                 }


    //                 clientInstance.request({
    //                     endpoint: 'payment_methods/credit_cards',
    //                     method: 'post',
    //                     data: {
    //                         creditCard: {
    //                             number: '',
    //                             expirationDate: '',
    //                         }
    //                     }
    //                 }, function (requestErr, response) {
    //                     if (requestErr) {
    //                         console.error(requestErr);
    //                         return;
    //                     }


    //                     console.log(response);
    //                 });
    //             });
    //         });

    //     }

    // }
}


</script>

<template>

    <div class="d-flex">

        <div class="ordine col-7">

            <h1>Completa con i tuoi dati</h1>

            <form action="#" method="POST">

                <h3>Riepilogo ordine</h3>
                <div class="riepilogo">
                    <ul v-for="details in store.cart" :key="details.id">
                        <li>
                            
                            <!-- <label for="details.quantity">Quantità:</label> -->
                            <input type="text" id="details.quantity" name="amount" readonly="readonly" disabled :value="details.quantity"><br><br> <hr>

                            <label for="dish_name"></label>
                            <input type="text" id="dish_name" name="dish_name" readonly="readonly" disabled :value="details.name"><br><br>
 

                            <label for="dish_price"></label>
                            <input type="text" id="dish_price" name="dish_price" readonly="readonly" disabled :value="details.price"><br><br>

                            <label for="dish_id"></label>
                            <input type="text" id="dish_id" name="dish_id" readonly="readonly" disabled :value="details.id"><br><br>
                            
                        </li>
                    </ul>
    
                    <hr>
    
                    <label for="details.total_price"></label>
                    <input type="text" id="details.total_price" name="details.total_price" readonly="readonly" disabled :value="priceTotal.toFixed(2)"><br><br>

                </div>

                <label for="customers_name">Nome:</label>
                <input type="text" id="customers_name" name="customers_name" required><br><br>
                
                <label for="customers_adress">Indirizzo di Consegna:</label>
                <textarea id="customers_adress" name="customers_adress" required></textarea><br><br>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>

                <label for="phone_number">Numero di Telefono:</label>
                <input type="tel" id="phone_number" name="phone_number" required><br><br>

                <hr>

                <!-- Campo di pagamento -->
                <!-- <label for="pagamento">Metodo di Pagamento:</label>
                <select id="pagamento" name="pagamento" required>
                    <option value="carta">Carta di Credito</option>
                    <option value="paypal">PayPal</option>
                </select><br><br> -->

                <!-- Campo per i dati della carta di credito -->
                <!-- <label for="carta-credito">Numero della Carta di Credito:</label>
                <input type="text" id="carta-credito" name="carta-credito" class="credit-card" placeholder="XXXX-XXXX-XXXX-XXXX" required><br><br> -->

                <!-- Campo per la data di scadenza -->
                <!-- <label for="scadenza">Data di Scadenza:</label>
                <input type="text" id="scadenza" name="scadenza" class="credit-card" placeholder="MM/AA" required><br><br> -->

                <!-- Campo per il codice di sicurezza (CVV) -->
                <!-- <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" class="credit-card" placeholder="CVV" required><br><br> -->

                <input type="submit" value="Invia Ordine"> 

            </form>

            <div class="container-riepilogo ">
                
                <h3>Riepilogo ordine</h3>
                <div class="riepilogo">
                    <ul v-for="details in store.cart" :key="details.id">
                        <li>
                            <span class="quantity-style">{{ details.quantity }} </span>
                            <span>{{ details.name }} </span>
                            <span class="price-style">{{ details.price }} &euro;</span>
                        </li>
                    </ul>
    
                    <hr>
                    <div class="total-price-style">
                        <span >
                            Prezzo Totale : 
                        </span>
                        <span class="price-style">
                            {{ priceTotal.toFixed(2) }} &euro;
                        </span>
                    </div>
    
                    
                </div>
                
                <!-- <router-link :to="{ 
                    name: 'DishesShow',
                    params: { id: store.cart[0].user_id }
                }">
                    <div class="btn btn-danger font-weight-bold text-center mt-3">
                        Torna indietro
                    </div>
                </router-link> -->
            </div>
        </div>


    </div>

    
<!-- 
    <div id="dropin-container"></div>
    <button id="submit-button">Conferma pagamento</button> -->

    <Braintree/>
    
</template>

<style scoped lang="scss">

    .ordine {

    margin-top: 20px;
    padding: 20px;
    text-align: center; /* Per centrare il contenuto orizzontalmente */

    }

    /* Stile per l'elemento h1 */
    h1 {
    font-size: 24px; /* Imposta la dimensione desiderata */
    margin-bottom: 20px; /* Spazio tra l'h1 e il form */
    font-weight: bold;
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

    ul li span {
    margin-right: 10px; /* Aggiunge uno spazio di 10px a destra di ciascun <span> */
    }

    .container-riepilogo{
        margin-top: 130px;
        // position: fixed;
        // right: 600px;

        h3 {
        font-size: 24px;
        margin-bottom: 10px;
        text-align: center;
        font-weight: bold;
        }
    }

    .riepilogo {
    background-color: #f9f9f9;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: left;



        ul {
        list-style: none;
        padding: 0;
    
            li {
                margin-bottom: 5px;
                display: flex;
            
                    span {
                    margin-right: 10px;
                    font-weight: bold;
                }
                .quantity-style{
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: inline-block;
                    text-align: center;
                    background-color: black;
                    color: white;
                    font-weight: bold;

                }
                
            }
            
        }
        
        .price-style{
            text-align: right;
            flex-grow: 1;
        }
        .total-price-style{
            font-weight: bold;
            display: flex;
        }

    }

</style>