<script lang="ts" setup>
const store = useAuthStore();
const isLoadingStore = useIsyLoadingStore();
const router = useRouter();
const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  store.clear();
  await router.push("/login");
  isLoadingStore.set(false);
};
</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full w-full relative">
    <NuxtLink class="mb-10 block" to="/"
      ><NuxtImg class="mx-auto" src="/logo.svg" alt="logo" width="140px" />
    </NuxtLink>
    <button
      @click="logout"
      class="absolute top-2 right-5 transition-colors hover:text-primary"
    >
      <Icon name="line-md:log-out" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>

<style></style>
