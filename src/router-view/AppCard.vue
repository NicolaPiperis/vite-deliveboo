<script>
import axios from 'axios';
import TypeCard from '../components/TypeCard.vue';
import UserCard from '../components/UserCard.vue';

const apiURL = 'http://localhost:8000/api/v1';

export default {
    name: 'Card',
    components: {
        TypeCard,
        UserCard
    },
    data: function () {
        return {
            types: [],
            pivotTypeUserData: [],
            matchingUserIds: [],
            selectedTypes: [],
            userIdsByType: {}
        }
    },
    methods: {
        handleTypeSelection(payload) {
            const { id, isSelected } = payload;

            let currentUserIds = this.pivotTypeUserData
                .filter(pivot => pivot.type_id === id)
                .map(pivot => pivot.user_id);

            if (isSelected) {
                this.selectedTypes.push(id);
                this.userIdsByType[id] = new Set(currentUserIds);
            } else {
                this.selectedTypes = this.selectedTypes.filter(type => type !== id);
                delete this.userIdsByType[id];
            }

            this.findMatchingUsers();
        },
        findMatchingUsers() {
            let intersection = [...(this.userIdsByType[this.selectedTypes[0]] || [])];
            for (let i = 1; i < this.selectedTypes.length; i++) {
                intersection = intersection.filter(id => this.userIdsByType[this.selectedTypes[i]].has(id));
            }

            axios.post(apiURL + '/restaurants/', { data: intersection })
                .then(response => {
                    this.matchingUserIds = response.data.users;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        axios.get(apiURL + '/home')
            .then(response => {
                this.types = response.data.types;
                this.pivotTypeUserData = response.data.pivotData;
            })
            .catch(error => {
                console.log(error);
            });
    },
}
</script>

<template>
    <h3>Questa e' la HOMEPAGE</h3>

    <div>
        <TypeCard v-for="(t, idxType) in types" :key="idxType" :detailsType="t" @type-selection="handleTypeSelection" />
    </div>
    <div>
        <UserCard v-for="(match, idxMatch) in matchingUserIds" :key="idxMatch" :detailsUser="match" />
    </div>
</template>

<style lang="scss" scoped>
h3 {
    text-align: center;
}
</style>