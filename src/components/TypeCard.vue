<script>
export default {
    name: 'TypeCard',
    props: {
        detailsType: Object
    },
    methods: {
        emit(event) {
            let payload = {
                id: this.detailsType.id,
                isSelected: event.target.checked // Verifica lo stato della checkbox
            };
            // Emettiamo l'evento con il nuovo payload
            this.$emit('type-selection', payload);
        }
    }
}
</script>

<template>
    <div class="card">
        <div>
            {{ detailsType.type_name }}
        </div>
        <div>
            IMMAGINE TIPOLOGIA
        </div>
        <input type="checkbox" @change="emit">
        <!-- Usiamo @change invece di @click per garantire che venga rilevato ogni cambiamento dello stato -->
    </div>
</template>

<style lang="scss" scoped>
.card {
    display: inline-block;
    width: calc(100% / 4 - 10px);
    border: 2px solid greenyellow;
    margin: 10px;

    div {
        margin: 3px;
    }
}
</style>
