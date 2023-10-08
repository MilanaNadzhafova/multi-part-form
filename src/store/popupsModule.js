import router from "@/router";

export default {
  state: {
    dialogVisibleConfirmation: false,
    dialogVisibleContractSigned: false,
  },
  getters: {
    getDialogVisibleConfirmation: (state) => state.dialogVisibleConfirmation,
    getDialogVisibleContractSigned: (state) =>
      state.dialogVisibleContractSigned,
  },
  mutations: {
    showDialogVisibleConfirmation(state) {
      state.dialogVisibleConfirmation = true;
    },
    hideDialogVisibleConfirmation(state) {
      state.dialogVisibleConfirmation = false;
    },
    showDialogVisibleContractSigned(state) {
      state.dialogVisibleContractSigned = true;
    },
    hideDialogVisibleContractSigned(state) {
      state.dialogVisibleContractSigned = false;
    },
  },
};
