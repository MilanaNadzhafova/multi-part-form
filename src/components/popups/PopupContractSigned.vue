<template>
    <v-dialog v-model="$store.getters.getDialogVisibleContractSigned" class="popup" max-width="450px">
        <v-card class="popup__card">

            <v-card-text>
                <div class="popup__body">
                    <img :src="require('@/assets/img/icons/check.gif')" alt="check-ok">
                    <span class="txt-standart">Договор подписан.</span>
                    <span class="txt-standart">Ожидайте поступление денежных средств.</span>
                </div>


                <button class="my-button" @click="$store.commit('hideDialogVisibleContractSigned')">Ок</button>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "PopupContractSigned",
}
</script>

<style lang="scss" scoped>
@import "./popupStyles.scss";
</style>