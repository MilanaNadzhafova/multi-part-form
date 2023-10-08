<template>
    <div class="steps step-two">

        <div class="steps__form">
            <div class="steps__wrapper-items">

                <div class="steps__item">
                    <span class="txt-standart">Сумма займа:</span>
                    <span class="txt-standart bold-text">{{ dataInfo.sumLoan }} ₽</span>
                </div>

                <div class="steps__item">
                    <span class="txt-standart">Дата возврата:</span>
                    <span class="txt-standart bold-text">{{ dataInfo.dateReturn }} ₽</span>
                </div>

                <div class="steps__item">
                    <span class="txt-standart">Плата за заём:</span>
                    <span class="txt-standart bold-text">{{ dataInfo.loanFee }} ₽</span>
                </div>

                <div class="steps__item">
                    <span class="txt-standart">Ставка:</span>
                    <span class="txt-standart bold-text">{{ dataInfo.bid }} %</span>
                </div>

                <div class="steps__item">
                    <span class="txt-standart">ПСК:</span>
                    <span class="txt-standart bold-text">{{ dataInfo.PSK }} ₽</span>
                </div>

            </div>
            <div class="steps__wrapper-button">
                <button @click.prevent="sendAgree" class="my-button">Подписать договор</button>
            </div>
        </div>
        <popup-contract-signed />
    </div>
</template>

<script>
import { formMixin } from "@/assets/mixins/formMixin";
import { mapMutations, mapActions } from "vuex";
import PopupContractSigned from "@/components/popups/PopupContractSigned.vue";
export default {
    name: "step3",
    data() {
        return {
            //    я здесь создала тестовые данные, их также нужно выводить после получения от сервера, как полагаю, но пока так
            dataInfo: {
                sumLoan: "23 000",
                dateReturn: "25 500",
                loanFee: "300",
                bid: "0,9",
                PSK: "30.04.2020"
            }
        };
    },
    mixins: [formMixin],
    components: { PopupContractSigned },
    methods: {
        ...mapActions(["agreeSigning"]),
        async sendAgree() {
            try {
                await this.agreeSigning();
                this.showDialogVisibleContractSigned;
                localStorage.removeItem("formData_step1");
                localStorage.removeItem("formData_step2")

            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapMutations(["showDialogVisibleConfirmation", "showDialogVisibleContractSigned"]),
    },


};

</script>


<style lang="scss" scoped>
@import "./steps.scss";
</style>