<template>
    <div>
        <form method="POST" ref="orderForm"
        @submit.prevent="submitOrder">

            <div class="riepilogo_form">
                <h3>Riepilogo ordine</h3>

                <hr>

                <label for="total_price"></label>
                <input type="text" id="total_price" name="total_price" readonly="readonly" disabled
                    :value="priceTotal.toFixed(2)">
                <br><br>
            </div>

            <div class="container-riepilogo">
                <h3>Riepilogo ordine</h3>
                <div class="riepilogo">
                    <ul v-for="details in store.cart" :key="details.id">
                        <li>
                            <span class="quantity-style">{{ details.quantity }}</span>
                            <span>{{ details.name }} </span>
                            <span class="price-style">{{ details.price }} &euro;</span>
                        </li>
                    </ul>

                    <hr>
                    <div class="total-price-style">
                        <span>Prezzo Totale: </span>
                        <span class="price-style">{{ priceTotal.toFixed(2) }} &euro;</span>
                    </div>
                </div>
            </div>

            <label for="customers_name">Nome:</label>
            <input type="text" id="customers_name" name="customer_name" required v-model="this.customer_name"><br><br>

            <label for="customers_adress">Indirizzo di Consegna:</label>
            <textarea id="customers_adress" name="customer_adress" required v-model="this.customer_adress"></textarea><br><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required  v-model="this.email"><br><br>

            <label for="phone_number">Numero di Telefono:</label>
            <input type="tel" id="phone_number" name="phone_number" required v-model="this.phone_number"><br><br>

            <Braintree />
    
        </form>
    </div>
    <button @click="debug()">debug</button>
</template>

  
<script>
import { mapState } from 'vuex';
import { store } from '../store';
import axios from 'axios';

import Braintree from '../components/Braintree.vue';

export default {
    name: 'Payment',
    components: {
        Braintree
    },
    data() {
        return {
            store,
            customer_name: '',
            customer_adress: '',
            email: '',
            phone_number: '',
            errorMessage: '',

        };
    },
    methods: {
        submitOrder() {

            const formData = {
                customer_name: this.customer_name,
                customer_adress: this.customer_adress,
                email: this.email,
                phone_number: this.phone_number, 
                total_price: this.priceTotal.toFixed(2),

                dishes: this.store.cart.map((dish) => ({
                    dish_id: dish.id,
                    amount: dish.quantity,
                 })),
            };
            console.log(formData);
            axios.post('http://localhost:8000/api/v1/orders', formData)
                .then(response => {
                    console.log('risposta axios', response.data);
                    console.log('risposta axios', response.data.order);
                    console.log('risposta axios', response.data.order.customer_name);
                    console.log('risposta axios', response.data.order.customer_adress);
                    console.log('risposta axios', response.data.order.email);
                    console.log('risposta axios', response.data.order.phone_number);
                    console.log('risposta axios', response.data.order.total_price);
                    console.log('risposta axios', response.data.order.dishes);
                    store.order = response.data.order
                    console.log('dati salvati', store.order)

                    this.$refs.orderForm.reset();
                    this.store.cart = [];
                    sessionStorage.removeItem('cart');

                    this.$router.push({
                        name: 'Confirm',
                        params: { orderData: response.data.order }
                    });
                })

                .catch(error => {
                    console.log(error);

                });
        }
    },
    computed: {
        ...mapState(['store']),
        priceTotal() {
            return this.store.cart.reduce((acc, dish) => {
                return acc + (dish.price * dish.quantity);
            }, 0);
        }
    },
    created() {
        // Carica il carrello salvato da sessionStorage all'avvio del componente
        const savedCart = sessionStorage.getItem('cart');
        if (savedCart) {
            try {
                this.store.cart = JSON.parse(savedCart);
            } catch (e) {
                console.error('Failed to load cart from sessionStorage:', e);
            }
        }
    }
}

</script>

<style scoped lang="scss">
/* Stile per l'elemento h1 */
h1 {
    font-size: 24px;
    /* Imposta la dimensione desiderata */
    margin-bottom: 20px;
    /* Spazio tra l'h1 e il form */
    font-weight: bold;
}

/* Stile generale del form */
form {
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
select#pagamento+label {
    margin-top: 20px;
}

ul li span {
    margin-right: 10px;
    /* Aggiunge uno spazio di 10px a destra di ciascun <span> */
}

.container-riepilogo {
    margin-top: 30px;
}

    .riepilogo_form {
        display: none;
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

            .quantity-style {
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

    .price-style {
        text-align: right;
        flex-grow: 1;
    }

    .total-price-style {
        font-weight: bold;
        display: flex;
    }
}
</style>

