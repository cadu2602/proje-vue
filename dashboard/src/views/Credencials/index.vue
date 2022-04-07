<template>
  <div>
    <div class="credencial bg-brand-main">
      <header-logged />
    </div>
    <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
      <h1 class="text-4xl font-black text-center text-gray-800">Credencials</h1>
      <p class="text-lg text-center text-gray-800 font-regular">
        Installation guide and generating your credentials
      </p>
    </div>
    <div class="flex justify-center w-full h-full">
      <div class="flex flex-col w-4/5 max-w-6xl py-10">
        <h1 class="text-3xl font-black text-brand-darkgray">
          Installation and configuration
        </h1>
        <p class="mt-10 text-lg text-gray-800 font-regular">
          This here is your api key
        </p>

        <div
          class="
            flex
            py-3
            pl-5
            pr-20
            mt-2
            rounded
            items-center
            bg-brand-gray-800
          "
        >
          <span>{{ store.User.currentUser.apiKey }}</span>
          <div class="flex ml-20 mr-5">
            <icon
              name="copy"
              :color="brandColors.graydark"
              size="24"
              class="cursor-pointer"
            />
            <icon
              name="loading"
              :color="brandColors.graydark"
              size="24"
              class="cursor-pointer ml-3"
            />
          </div>
        </div>
        <div>
          <p class="mt-5 text-lg text-gray-800 font-regular">
            Put the script below on your website to start getting feedback
          </p>
          <div class="py-3 pr-20 mt-2 rounded bg-brand-gray w-1/2 overflow-x-scroll">
            <pre> &lt;script src="https://cadu2602-proje-vue.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from "../../components/HeaderLogged";
import Icon from "../../components/Icon";
import useStore from "../../hooks/useStore";
import palette from "../../../palette";

export default {
  components: {
    HeaderLogged,
    Icon,
  },

  setup() {
    const store = useStore();

    return {
      store,
      brandColors: palette.brand,
    };
  },
};
</script>

<style scoped>
.credencial {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 112px;
}
</style>