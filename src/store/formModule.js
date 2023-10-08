import router from "@/router";

export default {
  state: {
    currentStep: 1, // Текущий шаг, начиная с 1
    totalSteps: 0, // Общее количество шагов (будет динамически определено)
  },
  getters: {
    getCurrentStep: (state) => state.currentStep,
    getTotalSteps: (state) => state.totalSteps,
  },
  mutations: {
    setCurrentStep(state, step) {
      state.currentStep = step;
    },
    setTotalSteps(state, totalSteps) {
      state.totalSteps = totalSteps;
    },
  },
  actions: {
    nextPage({ commit }, pageNumber) {
      const page = `Step${pageNumber + 1}`;
      router.push({ name: page });
    },

    submitForm({ commit, dispatch }, dataInfo) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer 12345",
      };
      const data = { ...dataInfo.formData };
      dispatch("nextPage", dataInfo.page);
      console.log("send on server data");
      // Отправить запрос на бэкенд
      //   return axios
      //     .post("/backend-url", data, { headers })
      //     .then((response) => {
      //       if (response.data.success) {
      //         // Перейти на следующий шаг после успешной отправки данных
      //           resolve(response.data);
      //         this.$router.push(`/step${dataInfo.page + 1}`);
      //       } else {
      //         // Обработка ошибки
      //         alert(response.data.error);
      //       }
      //     })
      //     .catch((error) => {
      //       // Обработка ошибки
      //       console.error(error);
      //     });
    },
    confirmCode({ commit }, code) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer 12345",
      };
      console.log("send on server data");
      // Отправить запрос на бэкенд
      //   return axios
      //     .post("/backend-url", code, { headers })
      //     .then((response) => {
      //       if (response.data.success) {
      //           resolve(response.data);
      //       } else {
      //         // Обработка ошибки
      //         alert(response.data.error);
      //       }
      //     })
      //     .catch((error) => {
      //       // Обработка ошибки
      //       console.error(error);
      //     });
    },

    sendCodeOnPhone({ commit }, phoneNumber) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer 12345",
      };
      console.log("send on server data");
      // Отправить запрос на бэкенд
      //   return axios
      //     .post("/backend-url", phoneNumber, { headers })
      //     .then((response) => {
      //       if (response.data.success) {
      //           resolve(response.data);
      //       } else {
      //         // Обработка ошибки
      //         alert(response.data.error);
      //       }
      //     })
      //     .catch((error) => {
      //       // Обработка ошибки
      //       console.error(error);
      //     });
    },
    agreeSigning({ commit }) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer 12345",
      };
      console.log("send on server");
      // Отправить запрос на бэкенд
      //   return axios
      //     .post("/backend-url", { headers })
      //     .then((response) => {
      //       if (response.data.success) {
      //           resolve(response.data);
      //       } else {
      //         // Обработка ошибки
      //         alert(response.data.error);
      //       }
      //     })
      //     .catch((error) => {
      //       // Обработка ошибки
      //       console.error(error);
      //     });
    },
  },
};
