<script>

export default {
    name: 'Footer',
    components: {
    },
    data() {
        return {
        };
    },
}

</script>

<template>
    <div id="footer-container">
        <img id="wave" src="../assets/img/svg-0.svg" alt="wave">
        <!-- Upper Footer -->
        <section id="upper-footer">

            <!-- voucher column -->
            <ul id="voucher-column">
                <h4>VOUCHER</h4>
                <img id="footer-coupon" src="../assets/img/Logo-Bianco-DeliveBoo.png" alt="footer-coupon">
                <p>Just Use The Code</p>
                <p class="yellow" id="coupon-code">FIRSTORDER</p>
                <p>At Checkout</p>
            </ul>

            <!-- navigate column -->
            <ul id="navigate-column">
                <h4>NAVIGATE</h4>
                <li><router-link to="/">Home</router-link></li>
                <li><a href="#">Cart</a></li>
            </ul>

            <!-- opening column -->
            <ul id="opening-column">
                <h4>ORARI LAVORATIVI</h4>
                <li>Tutti i giorni <span class="yellow">24h su 24</span></li>
            </ul>

            <!-- information column -->
            <ul id="information-column">
                <h4>INFORMATION</h4>
                <li><a href="#">My Account</a></li>
                <li><a href="#">Terms Of Service</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <img class="download-badge" src="../assets/img/app-store-badge.png" alt="app-store-badge">
                <img class="download-badge" src="../assets/img/play-store-badge.png" alt="play-store-badge">
            </ul>

        </section>

        <!-- Bottom Footer -->
        <section id="bottom-footer">
            <img id="logo-footer" src="../assets/img/Logo-Bianco-DeliveBoo.png" alt="logo-footer">
            <h3 class="yellow">Stay In The Loop</h3>
            <p>Sign up to receive up to date news and offers directly in your inbox:</p>
            <input type="email" id="sign-up-mailbox" placeholder="you@email.com">
            <button class="red-button" id="subscribe-button">SUBSCRIBE</button>
            <div id="socials-container">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-linkedin-in"></i>
                <i class="fa-solid fa-rss"></i>
                <i class="fa-regular fa-envelope"></i>
            </div>
            <p id="copyright"><span class="yellow"><i class="fa-regular fa-copyright"></i> Copyright 2023 | Deliveboo by
                </span>TEAM 1<span class="yellow">| All Right Reserved | Powered by </span>Laravel + Vue</p>
        </section>
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';
@use "../styles/partials/mixins.scss" as *;

#footer-container {
    background-image: url(../assets/img/footer-background-scaled.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    padding: 150px 12% 250px;
    position: relative;

    #wave {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }


    /* Upper Footer */

    #upper-footer {
        @include my-flex-row;
        justify-content: space-between;
        margin-top: 150px;

        ul {
            list-style: none;
            color: white;
            @include my-flex-column;
            gap: 20px;
            font-size: 18px;
            font-weight: bold;

            h4 {
                margin-bottom: 20px;
                font-size: 25px;

            }

            a {
                text-decoration: none;
                color: white;
            }

            a:hover {
                color: rgba(252, 220, 49, 255);
            }

            router-link:hover {
                color: rgba(252, 220, 49, 255);
            }

            a.yellow {
                color: rgba(252, 220, 49, 255);
            }

            a.yellow:hover {
                color: white;
            }

            .download-badge {
                width: 150px;
                border: 2px solid white;
                border-radius: 8px;
                margin-bottom: -10px;
            }
        }

        #voucher-column {
            @include my-flex-column;
            align-items: center;

            #footer-coupon {
                width: 200px;
            }

            p {
                font-size: 18px;
                margin-bottom: -20px;
            }

            #coupon-code {
                font-size: 22px;
            }
        }

        #navigate-column {
            @include my-flex-column;
            align-items: center;
        }

        #opening-column {
            @include my-flex-column;
            align-items: center;
            gap: 12px;
        }

        #information-column {
            @include my-flex-column;
            align-items: center;
        }
    }

    /* Bottom Footer */
    #bottom-footer {
        @include my-flex-column;
        align-items: center;
        margin-top: 100px;

        #logo-footer {
            height: 80px;
            margin-bottom: 50px;
        }

        h3 {
            font-size: 45px;
        }

        p:first-of-type {
            margin: 20px 0;
            color: white;
        }

        #sign-up-mailbox {
            width: 40%;
            padding: 11px 30px;
            border-radius: 20px;
            text-decoration: none;
            font-size: 16px;
        }

        #subscribe-button {
            width: 40%;
            margin: 20px 0 30px;
            color: white;
        }

        #socials-container {
            @include my-flex-row;
            gap: 30px;
            font-size: 20px;
            color: white;
            margin-bottom: 20px;
        }

        #copyright {
            font-size: 13px;
            color: white;
        }
    }

}
</style>