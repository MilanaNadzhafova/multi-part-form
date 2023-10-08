<template>
    <v-dialog v-model="$store.getters.getDialogVisibleConfirmation" class="popup" max-width="350px">
        <v-card class="popup__card">
            <v-card-title class="popup__title">
                Подтверждение удаленной идентификации
            </v-card-title>
            <v-card-text>
                <span class="txt-standart">Мы отправили SMS с кодом на ваш номер телефона</span>
                <div class="popup__input wrapper-input">
                    <label for="code" class="title-input">Код</label>
                    <input id="code" v-model="formData.code" type="text" class="input-standart"
                        placeholder="Введите код из смс"
                        :class="{ 'validation-error': !validateField('code') && formData.code != '' || errorCode }"
                        @input="validateField('code')" />
                    <span v-if="!validateField('code') && formData.code != '' || errorCode" class="txt-15"><span
                            class="txt-error">Некорректные
                            данные.</span>
                        Код неверный,
                        укажите правильный код.</span>
                </div>
                <button class="my-button" :disabled="!validateField('code')" @click="confirmCode">Подтвердить
                    код</button>
                <div class="popup_timer" v-if="countdown > 0">
                    <a href="#" @click="resendCode" :class="{ 'disabled': isDisabled }">Отправить код еще раз</a>
                    <span>{{ countdown }} секунд</span>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { formMixin } from "@/assets/mixins/formMixin"
import { mapMutations, mapActions } from "vuex";


export default {
    name: "PopupInformationConfirmation",
    mixins: [formMixin],
    data() {
        return {
            formData: {
                code: "",
            },
            countdown: 60, // Начальное значение таймера в секундах
            isDisabled: false, // Флаг, указывающий, выключена ли ссылка
            timerInterval: null,
            errorCode: false
        }
    },
    computed: {
        ...mapMutations(["hideDialogVisibleConfirmation"]),

    },
    props: {
        numberPhone: {
            require: true,
        }
    },
    methods: {
        ...mapActions(["sendCodeOnPhone"]),

        async confirmCode() {
            //тут вообще делаем как будто запрос, но пока он в режиме примера, поэтому как будто все прошло успешно

            this.$emit('confirmCode');
            this.hideDialogVisibleConfirmation;
            this.errorCode = false;
            await this.goToNextPage(2);
            // try {
            //     const response = await this.confirmCode();
            //     if (response.data.success) {
            //         // Успешный ответ, выполнить переход на другую страницу
            //         this.$emit('confirmCode');
            //         this.hideDialogVisibleConfirmation;
            //         this.errorCode = false;
            //         await this.goToNextPage(2);

            //     } else {
            //         this.errorCode = true;
            //     }
            // } catch (error) {
            //     // Обработка ошибки при отправке запроса
            //     console.error(error);
            // }
        },
        updateTimer() {
            this.countdown--;

            if (this.countdown <= 0) {
                clearInterval(this.timer); // Остановить интервал
                this.countdown = 60; // Начать заново с 60 секунд
                this.isDisabled = false;
            }
        },
        async resendCode() {
            if (!this.isDisabled) {
                //тут делаем как будто запрос на повторную отправку кода
                await this.sendCodeOnPhone(this.numberPhone)
                this.isDisabled = true;
                this.timer = setInterval(this.updateTimer, 1000);
            }
        },
    },
    created() {
        // Запустить таймер при создании компонента
        this.timer = setInterval(this.updateTimer, 1000);
        this.isDisabled = true; // Делаем ссылку недоступной при старте
    },
    beforeDestroy() {
        // Очистить интервал перед уничтожением компонента
        clearInterval(this.timer);
    },
}
</script>

<style lang="scss" scoped>
@import "./popupStyles.scss";
</style>