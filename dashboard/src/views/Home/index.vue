<template>
<div>
  <home-header 
    @create-account="handleCreateAccount"
    @login="handleLogin"
  
  />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">Feedbacker © 2022</p>
  </div>
</div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import HomeHeader from "./HomeHeader.vue";
import Contact from "./Contact.vue";
import useModal from "../../hooks/useModal"

export default {
  components: { HomeHeader, Contact },
  setup() {
    const router = useRouter()
    const modal = useModal()


    onMounted(() =>{
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({name: 'Feedbacks'})
      }
    })



    function handleLogin() {
      modal.open({
        component: 'ModalLogin'
      })
    }

    function handleCreateAccount() {
      modal.open({
        component: 'ModalCreateAccount'
      })

    }

    return {
      handleLogin,
      handleCreateAccount,
    };
  },
};
</script>

