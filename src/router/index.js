import Vue from "vue";
import VueRouter from "vue-router";
import StepOne from "@/components/form_steps/steps/StepOne";
import StepTwo from "@/components/form_steps/steps/StepTwo";
import StepThree from "@/components/form_steps/steps/StepThree";
import GeneralShape from "@/components/form_steps/GeneralShape";
import store from "@/store"; // Импортируйте Vuex хранилище
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "GeneralShape",
    component: GeneralShape,
    redirect: { name: "Step1" },
    children: [
      {
        path: "step-one",
        name: "Step1",
        component: StepOne,
        // Используйте именованный вид с именем "step1"
        // Это имя будет использоваться в router-view в GeneralShape.vue
        props: { viewName: "step1" },
      },
      {
        path: "step-two",
        name: "Step2",
        component: StepTwo,
        props: { viewName: "step2" },
      },
      {
        path: "step-three",
        name: "Step3",
        component: StepThree,
        props: { viewName: "step3" },
      },
    ],
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Динамически определяем `totalSteps` на основе количества дочерних маршрутов
  const totalSteps = router.options.routes.find(
    (route) => route.name === "GeneralShape"
  ).children.length;
  console.log("cheldren", totalSteps);
  // Определите, какой шаг соответствует текущему маршруту
  const stepMap = {};
  router.options.routes
    .find((route) => route.name === "GeneralShape")
    .children.forEach((childRoute, index) => {
      stepMap[childRoute.name] = index + 1;
    });
  console.log("stepMap", stepMap);
  const currentStep = stepMap[to.name];
  console.log("currentStep", currentStep);

  if (currentStep) {
    // Обновляем текущий шаг и `totalSteps` через Vuex хранилище
    store.commit("setCurrentStep", currentStep);
    store.commit("setTotalSteps", totalSteps);
  }
  next();
});

export default router;
