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
        <content-loader
          v-if="store.Global.isLoading || state.isLoading"
          class="rounded"
          width="600px"
          height="50px"
        />

        <div
          v-else
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
          <span v-if="state.hasError"> Error loading apikey</span>

          <span v-else>{{ store.User.currentUser.apiKey }}</span>
          <div class="flex ml-20 mr-5" v-if="!state.hasError">
            <icon
              name="copy"
              :color="props.brandColors.graydark"
              size="24"
              class="cursor-pointer"
            />
            <icon
              name="loading"
              :color="props.brandColors.graydark"
              size="24"
              class="cursor-pointer ml-3"
            />
          </div>
        </div>
        <div>
          <p class="mt-5 text-lg text-gray-800 font-regular">
            Put the script below on your website to start getting feedback
          </p>

          <content-loader
            v-if="store.Global.isLoading || state.isLoading"
            class="rounded"
            width="600px"
            height="50px"
          />
          <div
            v-else
            class="
              py-3
              pr-20
              mt-2
              rounded
              bg-brand-gray
              w-1/2
              overflow-x-scroll
            "
          >
            <span v-if="state.hasError"> Error loading script</span>
            <pre v-else>&lt;script src="https://cadu2602-proje-vue.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import HeaderLogged from "../../components/HeaderLogged";
import ContentLoader from "../../components/ComponentLoader";
import Icon from "../../components/Icon";
import useStore from "../../hooks/useStore";
import palette from "../../../palette";
import services from "../../services";
import { setApiKey } from "../../store/user";

const props = defineProps({
  brandColors: {
    default: "grayDark",
    type: String,
  },
});

const store = useStore();
const state = reactive({
  hasError: false,
  isLoading: false,
});

watch(
  () => store.Global.isLoading,
  () => {
    if (!store.User.currentUser.apiKey) {
      handleError(true);
    }
  }
);

function handleError(error) {
  state.isLoading = false;
  state.hasErrors = !!error;
}

async function handleGenerateApikey() {
  try {
    state.isLoading = true;
    const { data } = await services.users.generateApikey();
    setApiKey(data.apiKey);
    state.isLoading = false;
  } catch (error) {
    handleError(error);
  }
}
</script>

<style scoped>
.credencial {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 112px;
}
</style>