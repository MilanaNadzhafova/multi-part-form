<template>
    <div class="general-shape">
        <div class="container">
            <div class="general-shape__wraper-form">
                <div class="general-shape__row">
                    <button @click="previousStepRoute" class="general-shape__go-back">&#60;</button>
                    <h3 class="subtitle-section">{{ headers[currentStep - 1] }}</h3>
                </div>
                <div class="general-shape__wrapper-progress">
                    <div class="general-shape__progress-bar">
                        <div class="general-shape__progress-indicator" :style="{ width: progressBarWidth }"></div>
                    </div>
                    <div class="current-step txt-standart">Шаг {{ getCurrentStep }} из {{ getTotalSteps }}</div>
                </div>
                <router-view :name="viewName"></router-view>



            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "generalShape",
    data() {
        return {
            currentStep: 1, // Текущий шаг, начиная с 1
            totalSteps: 0, // Общее количество шагов (будет динамически определено)
            headers: ["Личные данные", "Паспорт", "Условия"]
        }
    },
    computed: {
        ...mapGetters(["getCurrentStep", "getTotalSteps"]),
        canGoBack() {
            // Проверка, можно ли вернуться на предыдущий шаг
            return this.getCurrentStep !== 1;
        },

        progressBarWidth() {
            // Рассчитываем ширину прогрессбара на основе текущего шага и общего количества шагов
            let width = (this.getCurrentStep) / this.getTotalSteps * 100 + "%"
            return width;
        },
        viewName() {
            // Имя именованного вида будет передаваться через props из маршрута
            return this.$route.params.viewName;
        },
    },
    methods: {
        previousStepRoute() {
            if (!this.canGoBack) return;
            this.$router.push({ name: `Step${this.getCurrentStep - 1}` })
        },

    },

}
</script>

<style lang="scss" scoped>
@import"./GeneralShape.scss";
</style>