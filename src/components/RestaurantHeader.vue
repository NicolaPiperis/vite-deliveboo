<script>

import { store } from '../store';

export default {
    name: 'RestaurantHeader',
    props: {
        restaurant: {
            type: Object
        }
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        handleImageError(event) {
            event.target.src = store.errorImageURL;
        }
    }
}
</script>

<template>
    <div class="my-container">
   
        <div class="container-img">
            <img :src="store.imageURL + store.restaurantSelected.img" class="card-img"
                :alt="store.restaurantSelected.restaurant_name">
            <div class="text-restaurant">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-12">
                            <h5 class="card-title text-dark">{{ store.restaurantSelected.restaurant_name }}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <p class="card-text text-bg-success rounded-5 p-2 text-light">{{ store.restaurantSelected.email }}</p>
                        </div>
                        <div class="col-4">
                            <p class="card-text text-bg-success rounded-5 p-2 text-light"><small>{{ store.restaurantSelected.address }}</small></p>
                        </div>
                        <div class="col-4">
                            <p class="card-text text-bg-success rounded-5 p-2 text-light"><small>{{ store.restaurantSelected.phone_number }}</small></p>
                        </div>
                    </div>
                
                </div>
            
            </div>
        </div>
    </div>  
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
.my-container{
    margin-bottom: 100px;
    .container-img{
        width: 100vw;
        height: 300px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .text-restaurant {
    width: 50%;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 100%);
    color: gray;
    text-align: center;
    background-color: white;
    border-radius: 2px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); 

            h5{
                font-size: 30px;
                font-weight: bold;
            }
            p{
                font-size: 15px;
                color: white;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); 
            }

        }
    }
}
</style>
