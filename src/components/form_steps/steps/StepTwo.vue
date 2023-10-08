<template>
    <div class="steps step-two">
        <form class="steps__form">
            <div class="steps__wrapper-inputs">

                <div class="steps__column">
                    <input v-model="formData.passportSeries" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('passportSeries') }" placeholder="Серия паспорта*" />
                    <span v-if="shouldShowError('passportSeries')" class="txt-error txt-standart">Введите корректную cерию
                        паспорта</span>
                </div>



                <div class="steps__column">
                    <input v-model="formData.passportNumber" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('passportNumber') }" placeholder="Номер паспорта*" />
                    <span v-if="shouldShowError('passportNumber')" class="txt-error txt-standart">Введите корректный номер
                        паспорта</span>
                </div>


                <div class="steps__column">
                    <input v-model="formData.phoneNumber" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('phoneNumber') }" placeholder="Номер телефона*" />
                    <span v-if="shouldShowError('phoneNumber')" class="txt-error txt-standart">Введите корректный номер
                        телефона</span>
                </div>

            </div>
            <div class="steps__wrapper-button">
                <button @click.prevent="confirmCode" class="my-button">Далее</button>
            </div>
        </form>
        <popup-information-confirmation @confirmCode="submitStepTwo" :numberPhone="formData.phoneNumber" />
    </div>
</template>

<script>
import { formMixin } from "@/assets/mixins/formMixin";
import { mapMutations, mapActions } from "vuex";
import PopupInformationConfirmation from "@/components/popups/PopupInformationConfirmation.vue";
export default {
    name: "step2",
    data() {
        return {
            formData: {
                passportSeries: null,
                passportNumber: null,
                phoneNumber: null,
            },
            formSubmitted: false,
            initialFormData: null, // Здесь храните начальное состояние формы
            formChanged: false, // Флаг для отслеживания изменений в форме

        };
    },
    components: { PopupInformationConfirmation },
    mixins: [formMixin],

    methods: {

        ...mapActions(["sendCodeOnPhone"]),

        async submitStepTwo() {
            // Проверка валидности всей формы перед отправкой
            this.formSubmitted = true;
            if (!this.isFormValid) return;

            // Сохранение данных формы в localStorage
            localStorage.setItem("formData_step2", JSON.stringify(this.formData));

            // Проверка на изменение формы
            if (!this.formChanged) {
                await this.goToNextPage(2); // Переход на следующий шаг
            } else {
                await this.submitFormData(2); // Отправка данных формы
            }

            // Очистка formSubmitted после успешной отправки
            this.formSubmitted = false;
        },
        async confirmCode() {
            await this.sendCodeOnPhone(this.formData.phoneNumber)
            if (this.isFormValid && this.formChanged) { this.showDialogVisibleConfirmation; }
            else this.goToNextPage(2)
        }
    },
    computed: {
        ...mapMutations(["showDialogVisibleConfirmation"]),
        isFormValid() {
            // Проверка валидности всей формы
            return (
                this.validateField('passportSeries') &&
                this.validateField('passportNumber') &&
                this.validateField('phoneNumber')
            )
        },
    },
    created() {
        // Попытка получить весь объект formData из Local Storage при создании компонента
        const savedFormData = JSON.parse(localStorage.getItem("formData_step2"));
        if (savedFormData) {
            this.formData = savedFormData; // Присваивание значений из Local Storage
            this.initialFormData = { ...savedFormData }; // Сохранение начального состояния формы

        }
    },
    watch: {
        formData: {
            handler(newValue) {

                this.formChanged = JSON.stringify(newValue) !== JSON.stringify(this.initialFormData);
            },
            deep: true,
        },
    },
};

</script>


<style lang="scss" scoped>
@import "./steps.scss";
</style>