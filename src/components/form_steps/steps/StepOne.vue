<template>
    <div class="steps step-one">
        <form @submit.prevent="submitStepOne" class="steps__form">
            <div class="steps__wrapper-inputs">
                <div class="steps__column">
                    <input v-model="formData.lastName" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('lastName') }" placeholder="Фамилия*" />
                    <span v-if="shouldShowError('lastName')" class="txt-error txt-standart">Введите фамилию</span>
                </div>


                <div class="steps__column">
                    <input v-model="formData.firstName" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('firstName') }" placeholder="Имя*" />
                    <span v-if="shouldShowError('firstName')" class="txt-error txt-standart">Введите имя</span>
                </div>


                <div class="steps__column">
                    <input v-model="formData.middleName" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('middleName') }" placeholder="Отчество*" />
                    <span v-if="shouldShowError('middleName')" class="txt-error txt-standart">Введите отчество</span>
                </div>


                <div class="steps__column">
                    <input v-model="formData.birthDate" type="date" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('birthDate') }" placeholder="Дата рождения*" />
                    <span v-if="shouldShowError('birthDate')" class="txt-error txt-standart">Введите дату рождения</span>
                </div>


                <div class="steps__column">
                    <input v-model="formData.birthCountry" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('birthCountry') }"
                        placeholder="Страна места рождения*" />
                    <span v-if="shouldShowError('birthCountry')" class="txt-error txt-standart">Введите страну места
                        рождения</span>

                </div>

                <div class="steps__column">
                    <input v-model="formData.email" class="steps__input input-standart txt-standart"
                        :class="{ 'validation-error': shouldShowError('email') }" placeholder="E-mail" />
                    <span v-if="shouldShowError('email')" class="txt-error txt-standart">Введите корректный email</span>
                </div>

            </div>
            <!-- Добавьте остальные поля формы с валидацией -->
            <div class="wrapper-checkbox">
                <input type="checkbox" class="custom-checkbox" id="myCheckbox" v-model="formData.agreeCheck">
                <label for="myCheckbox" class="custom-checkbox__label"><span class="txt-standart">Даю согласие на <a
                            class="link" href="#">&nbsp;обработку
                            личных
                            данных&nbsp;</a> и подписание документов в электронном виде</span></label>
            </div>
            <div class="steps__wrapper-button">
                <button type="submit" :disabled="!formData.agreeCheck" class="txt-standart my-button">Продолжить</button>
            </div>

        </form>
    </div>
</template>

<script>
import { formMixin } from "@/assets/mixins/formMixin"
import { mapActions } from "vuex";

export default {
    name: "step1",
    data() {
        return {
            formData: {
                lastName: '',
                firstName: '',
                middleName: '',
                birthDate: '',
                birthCountry: '',
                email: '',
                agreeCheck: false,
            },
            formSubmitted: false,
            formChanged: false, // Флаг для отслеживания изменений в форме
            initialFormData: null, // Здесь храните начальное состояние формы
        };
    },
    mixins: [formMixin],

    methods: {

        async submitStepOne() {
            // Проверка валидности всей формы перед отправкой
            this.formSubmitted = true;
            if (!this.isFormValid) return;

            // Сохранение данных формы в localStorage
            localStorage.setItem("formData_step1", JSON.stringify(this.formData));

            // Проверка на изменение формы
            if (!this.formChanged) {
                await this.goToNextPage(1); // Переход на следующий шаг
            } else {
                await this.submitFormData(1); // Отправка данных формы
            }

            // Очистка formSubmitted после успешной отправки
            this.formSubmitted = false;
        },



    },
    computed: {
        isFormValid() {
            // Проверка валидности всей формы
            return (
                this.validateField('lastName') &&
                this.validateField('firstName') &&
                this.validateField('middleName') &&
                this.validateField('birthDate') &&
                this.validateField('birthCountry')
            )
        },
    },
    created() {
        // Попытка получить весь объект formData из Local Storage при создании компонента
        const savedFormData = JSON.parse(localStorage.getItem("formData_step1"));
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