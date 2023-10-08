export const formMixin = {
  methods: {
    shouldShowError(fieldName) {
      // Проверка, должна ли показываться ошибка для данного поля
      return this.formSubmitted && !this.validateField(fieldName);
    },
    validateField(fieldName) {
      const value = this.formData[fieldName];
      if (fieldName === "passportSeries" || fieldName === "code") {
        // Проверка серии паспорта (4 цифры, например, "1234") и кода также
        return /^\d{4}$/.test(value);
      } else if (
        // Проверка серии паспорта (6 цифр, например, "123456")
        fieldName === "passportNumber"
      ) {
        return /^\d{6}$/.test(value);
      } else if (fieldName === "phoneNumber") {
        // Проверка номера телефона (цифры и, возможно, другие символы)
        return /^[\d-+() ]+$/.test(value);
      } else if (fieldName === "email") {
        // Проверка email (если не пустой)
        return !value || /^\S+@\S+\.\S+$/.test(value);
      } else {
        // Общая проверка для остальных полей
        return !!value.trim();
      }
    },
    async goToNextPage(pageNumber) {
      try {
        await this.$store.dispatch("nextPage", pageNumber);
      } catch (error) {
        console.error(error);
      }
    },

    async submitFormData(pageNumber) {
      try {
        await this.$store.dispatch("submitForm", {
          formData: this.formData,
          page: pageNumber,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
