import { useStore } from 'vuex';
import { computed } from 'vue';
const PermissionGuard = (permission) => {
  return (to, from, next) => {
    const store = useStore(); // Access the Vuex store
    console.log("Store",store);
    const hasPermission = computed(() => store.getters[`roles/${permission}`]);
    console.log('Has Permission:', hasPermission);
    // Check if the permission is granted
    if (hasPermission) {
      if (hasPermission) {
        next(); 
      } else {
        next({ name: 'Unauthorized' }); 
      }
    } else {
      console.error('Permission is undefined.');
      next({ name: 'Unauthorized' }); // Redirect if permission is undefined
    }
  };
};
export default PermissionGuard;